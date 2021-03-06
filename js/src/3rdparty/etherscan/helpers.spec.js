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

import nock from 'nock';
import { stringify } from 'qs';

import { url } from './links';

function mockget (requests, test) {
  let scope = nock(url(test));

  requests.forEach((request) => {
    scope = scope
      .get(`/api?${stringify(request.query)}`)
      .reply(request.code || 200, () => {
        return { result: request.reply };
      });
  });

  return scope;
}

export {
  mockget
};
