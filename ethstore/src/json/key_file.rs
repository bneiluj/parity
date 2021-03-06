// Copyright 2015, 2016 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

use std::io::{Read, Write};
use serde::{Deserialize, Deserializer, Error};
use serde::de::{Visitor, MapVisitor};
use serde_json;
use super::{Uuid, Version, Crypto, H160};

#[derive(Debug, PartialEq, Serialize)]
pub struct KeyFile {
	pub id: Uuid,
	pub version: Version,
	pub crypto: Crypto,
	pub address: H160,
	pub name: Option<String>,
	pub meta: Option<String>,
}

enum KeyFileField {
	Id,
	Version,
	Crypto,
	Address,
	Name,
	Meta,
}

impl Deserialize for KeyFileField {
	fn deserialize<D>(deserializer: &mut D) -> Result<KeyFileField, D::Error>
		where D: Deserializer
	{
		deserializer.deserialize(KeyFileFieldVisitor)
	}
}

struct KeyFileFieldVisitor;

impl Visitor for KeyFileFieldVisitor {
	type Value = KeyFileField;

	fn visit_str<E>(&mut self, value: &str) -> Result<Self::Value, E>
		where E: Error
	{
		match value {
			"id" => Ok(KeyFileField::Id),
			"version" => Ok(KeyFileField::Version),
			"crypto" => Ok(KeyFileField::Crypto),
			"Crypto" => Ok(KeyFileField::Crypto),
			"address" => Ok(KeyFileField::Address),
			"name" => Ok(KeyFileField::Name),
			"meta" => Ok(KeyFileField::Meta),
			_ => Err(Error::custom(format!("Unknown field: '{}'", value))),
		}
	}
}

impl Deserialize for KeyFile {
	fn deserialize<D>(deserializer: &mut D) -> Result<KeyFile, D::Error>
		where D: Deserializer
	{
		static FIELDS: &'static [&'static str] = &["id", "version", "crypto", "Crypto", "address"];
		deserializer.deserialize_struct("KeyFile", FIELDS, KeyFileVisitor)
	}
}

struct KeyFileVisitor;

impl Visitor for KeyFileVisitor {
	type Value = KeyFile;

	fn visit_map<V>(&mut self, mut visitor: V) -> Result<Self::Value, V::Error>
		where V: MapVisitor
	{
		let mut id = None;
		let mut version = None;
		let mut crypto = None;
		let mut address = None;
		let mut name = None;
		let mut meta = None;

		loop {
			match visitor.visit_key()? {
				Some(KeyFileField::Id) => { id = Some(visitor.visit_value()?); }
				Some(KeyFileField::Version) => { version = Some(visitor.visit_value()?); }
				Some(KeyFileField::Crypto) => { crypto = Some(visitor.visit_value()?); }
				Some(KeyFileField::Address) => { address = Some(visitor.visit_value()?); }
				Some(KeyFileField::Name) => { name = visitor.visit_value().ok(); }	// ignore anyhing that is not a string to be permissive.
				Some(KeyFileField::Meta) => { meta = visitor.visit_value().ok(); }	// ignore anyhing that is not a string to be permissive.
				None => { break; }
			}
		}

		let id = match id {
			Some(id) => id,
			None => visitor.missing_field("id")?,
		};

		let version = match version {
			Some(version) => version,
			None => visitor.missing_field("version")?,
		};

		let crypto = match crypto {
			Some(crypto) => crypto,
			None => visitor.missing_field("crypto")?,
		};

		let address = match address {
			Some(address) => address,
			None => visitor.missing_field("address")?,
		};

		visitor.end()?;

		let result = KeyFile {
			id: id,
			version: version,
			crypto: crypto,
			address: address,
			name: name,
			meta: meta,
		};

		Ok(result)
	}
}

impl KeyFile {
	pub fn load<R>(reader: R) -> Result<Self, serde_json::Error> where R: Read {
		serde_json::from_reader(reader)
	}

	pub fn write<W>(&self, writer: &mut W) -> Result<(), serde_json::Error> where W: Write {
		serde_json::to_writer(writer, self)
	}
}

#[cfg(test)]
mod tests {
	use std::str::FromStr;
	use serde_json;
	use json::{KeyFile, Uuid, Version, Crypto, Cipher, Aes128Ctr, Kdf, Scrypt};

	#[test]
	fn basic_keyfile() {
		let json = r#"
		{
			"address": "6edddfc6349aff20bc6467ccf276c5b52487f7a8",
			"crypto": {
				"cipher": "aes-128-ctr",
				"ciphertext": "7203da0676d141b138cd7f8e1a4365f59cc1aa6978dc5443f364ca943d7cb4bc",
				"cipherparams": {
					"iv": "b5a7ec855ec9e2c405371356855fec83"
				},
				"kdf": "scrypt",
				"kdfparams": {
					"dklen": 32,
					"n": 262144,
					"p": 1,
					"r": 8,
					"salt": "1e8642fdf1f87172492c1412fc62f8db75d796cdfa9c53c3f2b11e44a2a1b209"
				},
				"mac": "46325c5d4e8c991ad2683d525c7854da387138b6ca45068985aa4959fa2b8c8f"
			},
			"id": "8777d9f6-7860-4b9b-88b7-0b57ee6b3a73",
			"version": 3,
			"name": "Test",
			"meta": "{}"
		}"#;

		let expected = KeyFile {
			id: Uuid::from_str("8777d9f6-7860-4b9b-88b7-0b57ee6b3a73").unwrap(),
			version: Version::V3,
			address: "6edddfc6349aff20bc6467ccf276c5b52487f7a8".into(),
			crypto: Crypto {
				cipher: Cipher::Aes128Ctr(Aes128Ctr {
					iv: "b5a7ec855ec9e2c405371356855fec83".into(),
				}),
				ciphertext: "7203da0676d141b138cd7f8e1a4365f59cc1aa6978dc5443f364ca943d7cb4bc".into(),
				kdf: Kdf::Scrypt(Scrypt {
					n: 262144,
					dklen: 32,
					p: 1,
					r: 8,
					salt: "1e8642fdf1f87172492c1412fc62f8db75d796cdfa9c53c3f2b11e44a2a1b209".into(),
				}),
				mac: "46325c5d4e8c991ad2683d525c7854da387138b6ca45068985aa4959fa2b8c8f".into(),
			},
			name: Some("Test".to_owned()),
			meta: Some("{}".to_owned()),
		};

		let keyfile: KeyFile = serde_json::from_str(json).unwrap();
		assert_eq!(keyfile, expected);
	}

	#[test]
	fn capital_crypto_keyfile() {
		let json = r#"
		{
			"address": "6edddfc6349aff20bc6467ccf276c5b52487f7a8",
			"Crypto": {
				"cipher": "aes-128-ctr",
				"ciphertext": "7203da0676d141b138cd7f8e1a4365f59cc1aa6978dc5443f364ca943d7cb4bc",
				"cipherparams": {
					"iv": "b5a7ec855ec9e2c405371356855fec83"
				},
				"kdf": "scrypt",
				"kdfparams": {
					"dklen": 32,
					"n": 262144,
					"p": 1,
					"r": 8,
					"salt": "1e8642fdf1f87172492c1412fc62f8db75d796cdfa9c53c3f2b11e44a2a1b209"
				},
				"mac": "46325c5d4e8c991ad2683d525c7854da387138b6ca45068985aa4959fa2b8c8f"
			},
			"id": "8777d9f6-7860-4b9b-88b7-0b57ee6b3a73",
			"version": 3
		}"#;

		let expected = KeyFile {
			id: "8777d9f6-7860-4b9b-88b7-0b57ee6b3a73".into(),
			version: Version::V3,
			address: "6edddfc6349aff20bc6467ccf276c5b52487f7a8".into(),
			crypto: Crypto {
				cipher: Cipher::Aes128Ctr(Aes128Ctr {
					iv: "b5a7ec855ec9e2c405371356855fec83".into(),
				}),
				ciphertext: "7203da0676d141b138cd7f8e1a4365f59cc1aa6978dc5443f364ca943d7cb4bc".into(),
				kdf: Kdf::Scrypt(Scrypt {
					n: 262144,
					dklen: 32,
					p: 1,
					r: 8,
					salt: "1e8642fdf1f87172492c1412fc62f8db75d796cdfa9c53c3f2b11e44a2a1b209".into(),
				}),
				mac: "46325c5d4e8c991ad2683d525c7854da387138b6ca45068985aa4959fa2b8c8f".into(),
			},
			name: None,
			meta: None,
		};

		let keyfile: KeyFile = serde_json::from_str(json).unwrap();
		assert_eq!(keyfile, expected);
	}

	#[test]
	fn to_and_from_json() {
		let file = KeyFile {
			id: "8777d9f6-7860-4b9b-88b7-0b57ee6b3a73".into(),
			version: Version::V3,
			address: "6edddfc6349aff20bc6467ccf276c5b52487f7a8".into(),
			crypto: Crypto {
				cipher: Cipher::Aes128Ctr(Aes128Ctr {
					iv: "b5a7ec855ec9e2c405371356855fec83".into(),
				}),
				ciphertext: "7203da0676d141b138cd7f8e1a4365f59cc1aa6978dc5443f364ca943d7cb4bc".into(),
				kdf: Kdf::Scrypt(Scrypt {
					n: 262144,
					dklen: 32,
					p: 1,
					r: 8,
					salt: "1e8642fdf1f87172492c1412fc62f8db75d796cdfa9c53c3f2b11e44a2a1b209".into(),
				}),
				mac: "46325c5d4e8c991ad2683d525c7854da387138b6ca45068985aa4959fa2b8c8f".into(),
			},
			name: Some("Test".to_owned()),
			meta: None,
		};

		let serialized = serde_json::to_string(&file).unwrap();
		println!("{}", serialized);
		let deserialized = serde_json::from_str(&serialized).unwrap();

		assert_eq!(file, deserialized);
	}
}
