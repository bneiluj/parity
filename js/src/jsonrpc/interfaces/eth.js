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

import { Address, BlockNumber, Data, Hash, Quantity } from '../types';

export default {
  accounts: {
    desc: 'Returns a list of addresses owned by client.',
    params: [],
    returns: {
      type: Array,
      desc: '20 Bytes - addresses owned by the client',
      example: ['0x407d73d8a49eeb85d32cf465507dd71d507100c1']
    }
  },

  blockNumber: {
    desc: 'Returns the number of most recent block.',
    params: [],
    returns: {
      type: Quantity,
      desc: 'integer of the current block number the client is on',
      example: '0x4b7'
    }
  },

  call: {
    desc: 'Executes a new message call immediately without creating a transaction on the block chain.',
    params: [
      {
        type: Object,
        desc: 'The transaction call object',
        format: 'inputCallFormatter',
        details: {
          from: {
            type: Address,
            desc: '20 Bytes - The address the transaction is send from',
            optional: true
          },
          to: {
            type: Address,
            desc: '20 Bytes  - The address the transaction is directed to'
          },
          gas: {
            type: Quantity,
            desc: 'Integer of the gas provided for the transaction execution. eth_call consumes zero gas, but this parameter may be needed by some executions',
            optional: true
          },
          gasPrice: {
            type: Quantity,
            desc: 'Integer of the gasPrice used for each paid gas',
            optional: true
          },
          value: {
            type: Quantity,
            desc: 'Integer of the value send with this transaction',
            optional: true
          },
          data: {
            type: Data,
            desc: 'Hash of the method signature and encoded parameters. For details see [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)',
            optional: true
          }
        },
        example: {
          from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
          to: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
          value: '0x186a0'
        }
      },
      {
        type: BlockNumber,
        desc: 'integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter)',
        format: 'inputDefaultBlockNumberFormatter',
        example: 'latest'
      }
    ],
    returns: {
      type: Data,
      desc: 'the return value of executed contract',
      example: '0x5208'
    }
  },

  coinbase: {
    desc: 'Returns the client coinbase address.',
    params: [],
    returns: {
      type: Address,
      desc: 'The current coinbase address',
      example: '0x407d73d8a49eeb85d32cf465507dd71d507100c1'
    }
  },

  compileSerpent: {
    desc: 'Returns compiled serpent code.',
    params: [
      {
        type: String,
        desc: 'The source code',
        example: '/* some serpent */'
      }
    ],
    returns: {
      type: Data,
      desc: 'The compiled source code',
      example: '0x603880600c6000396000f3006001600060e060020a600035048063c6888fa114601857005b6021600435602b565b8060005260206000f35b600081600702905091905056'
    }
  },

  compileSolidity: {
    desc: 'Returns compiled solidity code.',
    params: [
      {
        type: String,
        desc: 'The source code',
        example: 'contract test { function multiply(uint a) returns(uint d) {   return a * 7;   } }'
      }
    ],
    returns: {
      type: Data,
      desc: 'The compiled source code',
      example: '0x605880600c6000396000f3006000357c010000000000000000000000000000000000000000000000000000000090048063c6888fa114602e57005b603d6004803590602001506047565b8060005260206000f35b60006007820290506053565b91905056'
    }
  },

  compileLLL: {
    desc: 'Returns compiled LLL code.',
    params: [
      {
        type: String,
        desc: 'The source code',
        example: '(returnlll (suicide (caller)))'
      }
    ],
    returns: {
      type: Data,
      desc: 'The compiled source code',
      example: '0x603880600c6000396000f3006001600060e060020a600035048063c6888fa114601857005b6021600435602b565b8060005260206000f35b600081600702905091905056'
    }
  },

  estimateGas: {
    desc: 'Makes a call or transaction, which won\'t be added to the blockchain and returns the used gas, which can be used for estimating the used gas.',
    params: [
      {
        type: Object,
        desc: 'see [eth_sendTransaction](#eth_sendTransaction)',
        format: 'inputCallFormatter',
        example: {

        }
      },
    ],
    returns: {
      type: Quantity,
      desc: 'The amount of gas used',
      format: 'utils.toDecimal',
      example: '0x5208'
    }
  },

  fetchQueuedTransactions: {
    desc: '?',
    params: [
      '?'
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  flush: {
    desc: '?',
    params: [],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  gasPrice: {
    desc: 'Returns the current price per gas in wei.',
    params: [],
    returns: {
      type: Quantity,
      desc: 'integer of the current gas price in wei',
      example: '0x09184e72a000'
    }
  },

  getBalance: {
    desc: 'Returns the balance of the account of given address.',
    params: [
      {
        type: Address,
        desc: '20 Bytes - address to check for balance',
        format: 'inputAddressFormatter',
        example: '0x407d73d8a49eeb85d32cf465507dd71d507100c1'
      },
      {
        type: BlockNumber,
        desc: 'integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter)',
        format: 'inputDefaultBlockNumberFormatter',
        example: 'latest'
      }
    ],
    returns: {
      type: Quantity,
      desc: 'integer of the current balance in wei',
      format: 'outputBigNumberFormatter',
      example: '0x0234c8a3397aab58'
    }
  },

  getBlockByHash: {
    desc: 'Returns information about a block by hash.',
    params: [
      {
        type: Hash,
        desc: 'Hash of a block',
        example: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331'
      },
      {
        type: Boolean,
        desc: 'If `true` it returns the full transaction objects, if `false` only the hashes of the transactions',
        example: true
      }
    ],
    returns: {
      type: Object,
      desc: 'A block object, or `null` when no block was found',
      details: {
        number: {
          type: Quantity,
          desc: 'The block number. `null` when its pending block'
        },
        hash: {
          type: Hash,
          desc: '32 Bytes - hash of the block. `null` when its pending block'
        },
        parentHash: {
          type: Hash,
          desc: '32 Bytes - hash of the parent block'
        },
        nonce: {
          type: Data,
          desc: '8 Bytes - hash of the generated proof-of-work. `null` when its pending block'
        },
        sha3Uncles: {
          type: Data,
          desc: '32 Bytes - SHA3 of the uncles data in the block'
        },
        logsBloom: {
          type: Data,
          desc: '256 Bytes - the bloom filter for the logs of the block. `null` when its pending block'
        },
        transactionsRoot: {
          type: Data,
          desc: '32 Bytes - the root of the transaction trie of the block'
        },
        stateRoot: {
          type: Data,
          desc: '32 Bytes - the root of the final state trie of the block'
        },
        receiptsRoot: {
          type: Data, desc: '32 Bytes - the root of the receipts trie of the block'
        },
        miner: {
          type: Address,
          desc: '20 Bytes - the address of the beneficiary to whom the mining rewards were given'
        },
        difficulty: {
          type: Quantity,
          desc: 'integer of the difficulty for this block'
        },
        totalDifficulty: {
          type: Quantity,
          desc: 'integer of the total difficulty of the chain until this block'
        },
        extraData: {
          type: Data,
          desc: 'the \'extra data\' field of this block'
        },
        size: {
          type: Quantity,
          desc: 'integer the size of this block in bytes'
        },
        gasLimit: {
          type: Quantity,
          desc: 'the maximum gas allowed in this block'
        },
        gasUsed: {
          type: Quantity,
          desc: 'the total used gas by all transactions in this block'
        },
        timestamp: {
          type: Quantity,
          desc: 'the unix timestamp for when the block was collated'
        },
        transactions: {
          type: Array,
          desc: 'Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter'
        },
        uncles: {
          type: Array,
          desc: 'Array of uncle hashes'
        }
      },
      example: {
        number: '0x1b4', // 436
        hash: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331',
        parentHash: '0x9646252be9520f6e71339a8df9c55e4d7619deeb018d2a3f2d21fc165dde5eb5',
        sealFields: ['0xe04d296d2460cfb8472af2c5fd05b5a214109c25688d3704aed5484f9a7792f2', '0x0000000000000042'],
        sha3Uncles: '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
        logsBloom: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331',
        transactionsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
        stateRoot: '0xd5855eb08b3387c0af375e9cdb6acfc05eb8f519e419b874b6ff2ffda7ed1dff',
        miner: '0x4e65fda2159562a496f9f3522f89122a3088497a',
        difficulty: '0x027f07', // 163591
        totalDifficulty: '0x027f07', // 163591
        extraData: '0x0000000000000000000000000000000000000000000000000000000000000000',
        size: '0x027f07', // 163591
        gasLimit: '0x9f759', // 653145
        minGasPrice: '0x9f759', // 653145
        gasUsed: '0x9f759', // 653145
        timestamp: '0x54e34e8e', // 1424182926
        transactions: ['$DUMMY$', '$DUMMY$'], // will be replaced with [{ ... }, { ... }] by the generator
        uncles: ['0x1606e5...', '0xd5145a9...']
      }
    }
  },

  getBlockByNumber: {
    desc: 'Returns information about a block by block number.',
    params: [
      {
        type: BlockNumber,
        desc: 'integer of a block number, or the string `\'earliest\'`, `\'latest\'` or `\'pending\'`, as in the [default block parameter](#the-default-block-parameter)',
        example: '0x1b4'
      },
      {
        type: Boolean,
        desc: 'If `true` it returns the full transaction objects, if `false` only the hashes of the transactions',
        example: true
      }
    ],
    returns: 'See [eth_getBlockByHash](#eth_getblockbyhash)'
  },

  getBlockTransactionCountByHash: {
    desc: 'Returns the number of transactions in a block from a block matching the given block hash.',
    params: [
      {
        type: Hash,
        desc: '32 Bytes - hash of a block',
        example: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238'
      }
    ],
    returns: {
      type: Quantity,
      desc: 'integer of the number of transactions in this block',
      example: '0xb'
    }
  },

  getBlockTransactionCountByNumber: {
    desc: 'Returns the number of transactions in a block from a block matching the given block number.',
    params: [
      {
        type: BlockNumber,
        desc: 'integer of a block number, or the string `\'earliest\'`, `\'latest\'` or `\'pending\'`, as in the [default block parameter](#the-default-block-parameter)',
        example: '0xe8'
      }
    ],
    returns: {
      type: Quantity,
      desc: 'integer of the number of transactions in this block',
      example: '0xa'
    }
  },

  getCode: {
    desc: 'Returns code at a given address.',
    params: [
      {
        type: Address,
        desc: '20 Bytes - address',
        format: 'inputAddressFormatter',
        example: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b'
      },
      {
        type: BlockNumber,
        desc: 'integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter)',
        format: 'inputDefaultBlockNumberFormatter',
        example: '0x2'
      }
    ],
    returns: {
      type: Data,
      desc: 'the code from the given address',
      example: '0x600160008035811a818181146012578301005b601b6001356025565b8060005260206000f25b600060078202905091905056'
    }
  },

  getCompilers: {
    desc: 'Returns a list of available compilers in the client.',
    params: [],
    returns: {
      type: Array,
      desc: 'Array of available compilers',
      example: ['solidity', 'lll', 'serpent']
    }
  },

  getFilterChanges: {
    desc: 'Polling method for a filter, which returns an array of logs which occurred since last poll.',
    params: [
      {
        type: Quantity,
        desc: 'The filter id',
        example: '0x16'
      }
    ],
    returns: {
      type: Array,
      desc: 'Array of log objects, or an empty array if nothing has changed since last poll',
      example: [
        {
          logIndex: '0x1', // 1
          blockNumber: '0x1b4', // 436
          blockHash: '0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d',
          transactionHash: '0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf',
          transactionIndex: '0x0', // 0
          address: '0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d',
          data: '0x0000000000000000000000000000000000000000000000000000000000000000',
          topics: ['0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5']
        },
        '$DUMMY$' // will be replaced with { ... } by the generator
      ]
    }
  },

  getFilterChangesEx: {
    desc: '?',
    params: [
      '?'
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  getFilterLogs: {
    desc: 'Returns an array of all logs matching filter with given id.',
    params: [
      {
        type: Quantity,
        desc: 'The filter id',
        example: '0x16'
      }
    ],
    returns: 'See [eth_getFilterChanges](#eth_getfilterchanges)'
  },

  getFilterLogsEx: {
    desc: '?',
    params: [
      '?'
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  getLogs: {
    desc: 'Returns an array of all logs matching a given filter object.',
    params: [
      {
        type: Object,
        desc: 'The filter object, see [eth_newFilter parameters](#eth_newfilter)',
        example: {
          topics: ['0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b']
        }
      }
    ],
    returns: 'See [eth_getFilterChanges](#eth_getfilterchanges)'
  },

  getLogsEx: {
    desc: '?',
    params: [
      '?'
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  getStorageAt: {
    desc: 'Returns the value from a storage position at a given address.',
    params: [
      {
        type: Address,
        desc: '20 Bytes - address of the storage',
        example: '0x407d73d8a49eeb85d32cf465507dd71d507100c1'
      },
      {
        type: Quantity,
        desc: 'integer of the position in the storage',
        format: 'utils.toHex',
        example: '0x0'
      },
      {
        type: BlockNumber,
        desc: 'integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter)',
        format: 'inputDefaultBlockNumberFormatter',
        example: '0x2'
      }
    ],
    returns: {
      type: Data,
      desc: 'the value at this storage position',
      example: '0x0000000000000000000000000000000000000000000000000000000000000003'
    }
  },

  getTransactionByHash: {
    desc: 'Returns the information about a transaction requested by transaction hash.',
    params: [
      {
        type: Hash,
        desc: '32 Bytes - hash of a transaction',
        example: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238'
      }
    ],
    returns: {
      type: Object,
      desc: 'A transaction object, or `null` when no transaction was found:',
      format: 'outputTransactionFormatter',
      details: {
        hash: {
          type: Hash,
          desc: '32 Bytes - hash of the transaction.'
        },
        nonce: {
          type: Quantity,
          desc: 'the number of transactions made by the sender prior to this one.'
        },
        blockHash: {
          type: Hash,
          desc: '32 Bytes - hash of the block where this transaction was in. `null` when its pending.'
        },
        blockNumber: {
          type: BlockNumber,
          desc: 'block number where this transaction was in. `null` when its pending.'
        },
        transactionIndex: {
          type: Quantity,
          desc: 'integer of the transactions index position in the block. `null` when its pending.'
        },
        from: {
          type: Address,
          desc: '20 Bytes - address of the sender.'
        },
        to: {
          type: Address,
          desc: '20 Bytes - address of the receiver. `null` when its a contract creation transaction.'
        },
        value: {
          type: Quantity,
          desc: 'value transferred in Wei.'
        },
        gasPrice: {
          type: Quantity,
          desc: 'gas price provided by the sender in Wei.'
        },
        gas: {
          type: Quantity,
          desc: 'gas provided by the sender.'
        },
        input: {
          type: Data,
          desc: 'the data send along with the transaction.'
        }
      },
      example: {
        hash: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b',
        nonce: '0x0',
        blockHash: '0xbeab0aa2411b7ab17f30a99d3cb9c6ef2fc5426d6ad6fd9e2a26a6aed1d1055b',
        blockNumber: '0x15df', // 5599
        transactionIndex: '0x1', // 1
        from: '0x407d73d8a49eeb85d32cf465507dd71d507100c1',
        to: '0x85h43d8a49eeb85d32cf465507dd71d507100c1',
        value: '0x7f110', // 520464
        gas: '0x7f110', // 520464
        gasPrice: '0x09184e72a000',
        input: '0x603880600c6000396000f300603880600c6000396000f3603880600c6000396000f360'
      }
    }
  },

  getTransactionByBlockHashAndIndex: {
    desc: 'Returns information about a transaction by block hash and transaction index position.',
    params: [
      {
        type: Hash,
        desc: 'hash of a block',
        example: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331'
      },
      {
        type: Quantity,
        desc: 'integer of the transaction index position',
        example: '0x0'
      }
    ],
    returns: 'See [eth_getBlockByHash](#eth_gettransactionbyhash)'
  },

  getTransactionByBlockNumberAndIndex: {
    desc: 'Returns information about a transaction by block number and transaction index position.',
    params: [
      {
        type: BlockNumber,
        desc: 'a block number, or the string `\'earliest\'`, `\'latest\'` or `\'pending\'`, as in the [default block parameter](#the-default-block-parameter)',
        example: '0x29c'
      },
      {
        type: Quantity,
        desc: 'The transaction index position',
        example: '0x0'
      }
    ],
    returns: 'See [eth_getBlockByHash](#eth_gettransactionbyhash)'
  },

  getTransactionCount: {
    desc: 'Returns the number of transactions *sent* from an address.',
    params: [
      {
        type: Address,
        desc: '20 Bytes - address',
        example: '0x407d73d8a49eeb85d32cf465507dd71d507100c1'
      },
      {
        type: BlockNumber,
        desc: 'integer block number, or the string `\'latest\'`, `\'earliest\'` or `\'pending\'`, see the [default block parameter](#the-default-block-parameter)',
        format: 'inputDefaultBlockNumberFormatter',
        example: 'latest'
      }
    ],
    returns: {
      type: Quantity,
      desc: 'integer of the number of transactions send from this address',
      format: 'utils.toDecimal',
      example: '0x1'
    }
  },

  getTransactionReceipt: {
    desc: 'Returns the receipt of a transaction by transaction hash.\n\n**Note** That the receipt is not available for pending transactions.',
    params: [
      {
        type: Hash,
        desc: 'hash of a transaction',
        example: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238'
      }
    ],
    returns: {
      type: Object,
      desc: 'A transaction receipt object, or `null` when no receipt was found:',
      format: 'outputTransactionReceiptFormatter',
      details: {
        transactionHash: {
          type: Hash,
          desc: '32 Bytes - hash of the transaction.'
        },
        transactionIndex: {
          type: Quantity,
          desc: 'integer of the transactions index position in the block.'
        },
        blockHash: {
          type: Hash,
          desc: '32 Bytes - hash of the block where this transaction was in.'
        },
        blockNumber: {
          type: BlockNumber,
          desc: 'block number where this transaction was in.'
        },
        cumulativeGasUsed: {
          type: Quantity,
          desc: 'The total amount of gas used when this transaction was executed in the block.'
        },
        gasUsed: {
          type: Quantity,
          desc: 'The amount of gas used by this specific transaction alone.'
        },
        contractAddress: {
          type: Address,
          desc: '20 Bytes - The contract address created, if the transaction was a contract creation, otherwise `null`.'
        },
        logs: {
          type: Array,
          desc: 'Array of log objects, which this transaction generated.'
        }
      },
      example: {
        transactionHash: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238',
        transactionIndex: '0x1', // 1
        blockNumber: '0xb', // 11
        blockHash: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b',
        cumulativeGasUsed: '0x33bc', // 13244
        gasUsed: '0x4dc', // 1244
        contractAddress: '0xb60e8dd61c5d32be8058bb8eb970870f07233155', // or null, if none was created
        logs: ['$DUMMY$', '$DUMMY$'] // will be replaced with [{ ... }, { ... }] by the generator
      }
    }
  },

  getUncleByBlockHashAndIndex: {
    desc: 'Returns information about a uncle of a block by hash and uncle index position.\n\n**Note:** An uncle doesn\'t contain individual transactions.',
    params: [
      {
        type: Hash,
        desc: 'Hash a block',
        example: '0xc6ef2fc5426d6ad6fd9e2a26abeab0aa2411b7ab17f30a99d3cb96aed1d1055b'
      },
      {
        type: Quantity,
        desc: 'The uncle\'s index position',
        example: '0x0'
      }
    ],
    returns: 'See [eth_getBlockByHash](#eth_getblockbyhash)'
  },

  getUncleByBlockNumberAndIndex: {
    desc: 'Returns information about a uncle of a block by number and uncle index position.\n\n**Note:** An uncle doesn\'t contain individual transactions.',
    params: [
      {
        type: BlockNumber,
        desc: 'a block number, or the string `\'earliest\'`, `\'latest\'` or `\'pending\'`, as in the [default block parameter](#the-default-block-parameter)',
        example: '0x29c'
      },
      {
        type: Quantity,
        desc: 'The uncle\'s index position',
        example: '0x0'
      }
    ],
    returns: 'See [eth_getBlockByHash](#eth_getblockbyhash)'
  },

  getUncleCountByBlockHash: {
    desc: 'Returns the number of uncles in a block from a block matching the given block hash.',
    params: [
      {
        type: Hash,
        desc: '32 Bytes - hash of a block',
        example: '0xb903239f8543d04b5dc1ba6579132b143087c68db1b2168786408fcbce568238'
      }
    ],
    returns: {
      type: Quantity,
      desc: 'integer of the number of uncles in this block',
      example: '0x1'
    }
  },

  getUncleCountByBlockNumber: {
    desc: 'Returns the number of uncles in a block from a block matching the given block number.',
    params: [
      {
        type: BlockNumber,
        desc: 'integer of a block number, or the string \'latest\', \'earliest\' or \'pending\', see the [default block parameter](#the-default-block-parameter)',
        example: '0xe8'
      }
    ],
    returns: {
      type: Quantity,
      desc: 'integer of the number of uncles in this block',
      example: '0x1'
    }
  },

  getWork: {
    desc: 'Returns the hash of the current block, the seedHash, and the boundary condition to be met ("target").',
    params: [],
    returns: {
      type: Array,
      desc: 'Array with the following properties:\n  - `Data`, 32 Bytes - current block header pow-hash.\n  - `Data`, 32 Bytes - the seed hash used for the DAG.\n  - `Data`, 32 Bytes - the boundary condition ("target"), 2^256 / difficulty.\n  - `Quantity`, the current block number.',
      example: [
        '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        '0x5EED00000000000000000000000000005EED0000000000000000000000000000',
        '0xd1ff1c01710000000000000000000000d1ff1c01710000000000000000000000',
        '0x1'
      ]
    }
  },

  hashrate: {
    desc: 'Returns the number of hashes per second that the node is mining with.',
    params: [],
    returns: {
      type: Quantity,
      desc: 'number of hashes per second',
      example: '0x38a'
    }
  },

  inspectTransaction: {
    desc: '?',
    params: [
      '?'
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  mining: {
    desc: 'Returns `true` if client is actively mining new blocks.',
    params: [],
    returns: {
      type: Boolean,
      desc: '`true` of the client is mining, otherwise `false`',
      example: true
    }
  },

  newBlockFilter: {
    desc: 'Creates a filter in the node, to notify when a new block arrives.\nTo check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).',
    params: [],
    returns: {
      type: Quantity,
      desc: 'A filter id',
      example: '0x1'
    }
  },

  newFilter: {
    desc: 'Creates a filter object, based on filter options, to notify when the state changes (logs).\nTo check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).',
    params: [{
      type: Object,
      desc: 'The filter options:',
      details: {
        fromBlock: {
          type: BlockNumber,
          desc: 'Integer block number, or `\'latest\'` for the last mined block or `\'pending\'`, `\'earliest\'` for not yet mined transactions.',
          optional: true,
          default: 'latest'
        },
        toBlock: {
          type: BlockNumber,
          desc: 'Integer block number, or `\'latest\'` for the last mined block or `\'pending\'`, `\'earliest\'` for not yet mined transactions.',
          optional: true,
          default: 'latest'
        },
        address: {
          type: Address,
          desc: '20 Bytes - Contract address or a list of addresses from which logs should originate.',
          optional: true
        },
        topics: {
          type: Array,
          desc: 'Array of 32 Bytes `DATA` topics. Topics are order-dependent. Each topic can also be an array of DATA with \'or\' options.',
          optional: true
        },
        limit: {
          type: Number,
          desc: 'The maximum number of entries to retrieve (latest first)',
          optional: true
        }
      },
      example: {
        fromBlock: '0x1',
        toBlock: '0x2',
        address: '0x8888f1f195afa192cfee860698584c030f4c9db1',
        topics: ['0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b', null, ['0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b', '0x000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc']]
      }
    }],
    returns: {
      type: Quantity,
      desc: 'The filter id',
      example: '0x1'
    }
  },

  newFilterEx: {
    desc: '?',
    params: [
      '?'
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  newPendingTransactionFilter: {
    desc: 'Creates a filter in the node, to notify when new pending transactions arrive.\n\nTo check if the state has changed, call [eth_getFilterChanges](#eth_getfilterchanges).',
    params: [],
    returns: {
      type: Quantity,
      desc: 'A filter id',
      example: '0x1'
    }
  },

  notePassword: {
    desc: '?',
    params: [
      '?'
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  pendingTransactions: {
    desc: '?',
    params: [],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  protocolVersion: {
    desc: 'Returns the current ethereum protocol version.',
    params: [],
    returns: {
      type: String,
      desc: 'The current ethereum protocol version',
      example: '0x63'
    }
  },

  register: {
    desc: '?',
    params: [
      '?'
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  sendRawTransaction: {
    desc: 'Creates new message call transaction or a contract creation for signed transactions.',
    params: [
      {
        type: Data,
        desc: 'The signed transaction data',
        example: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675'
      }
    ],
    returns: {
      type: Hash,
      desc: '32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available\n\nUse [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.',
      example: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331'
    }
  },

  sendTransaction: {
    desc: 'Creates new message call transaction or a contract creation, if the data field contains code.',
    params: [
      {
        type: Object,
        desc: 'The transaction object',
        format: 'inputTransactionFormatter',
        details: {
          from: {
            type: Address,
            desc: '20 Bytes - The address the transaction is send from'
          },
          to: {
            type: Address,
            desc: '20 Bytes - (optional when creating new contract) The address the transaction is directed to'
          },
          gas: {
            type: Quantity,
            desc: 'Integer of the gas provided for the transaction execution. It will return unused gas.',
            optional: true,
            default: 90000
          },
          gasPrice: {
            type: Quantity,
            desc: 'Integer of the gasPrice used for each paid gas',
            optional: true,
            default: 'To-Be-Determined'
          },
          value: {
            type: Quantity,
            desc: 'Integer of the value send with this transaction',
            optional: true
          },
          data: {
            type: Data,
            desc: 'The compiled code of a contract OR the hash of the invoked method signature and encoded parameters. For details see [Ethereum Contract ABI](https://github.com/ethereum/wiki/wiki/Ethereum-Contract-ABI)'
          },
          nonce: {
            type: Quantity,
            desc: 'Integer of a nonce. This allows to overwrite your own pending transactions that use the same nonce.',
            optional: true
          }
        },
        example: {
          from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
          to: '0xd46e8dd67c5d32be8058bb8eb970870f072445675',
          gas: '0x76c0', // 30400,
          gasPrice: '0x9184e72a000', // 10000000000000
          value: '0x9184e72a', // 2441406250
          data: '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675'
        }
      }
    ],
    returns: {
      type: Hash,
      desc: '32 Bytes - the transaction hash, or the zero hash if the transaction is not yet available.\n\nUse [eth_getTransactionReceipt](#eth_gettransactionreceipt) to get the contract address, after the transaction was mined, when you created a contract.',
      example: '0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331'
    }
  },

  sign: {
    desc: 'Signs transaction hash with a given address.',
    params: [
      {
        type: Address,
        desc: '20 Bytes - address',
        format: 'inputAddressFormatter',
        example: '0xd1ade25ccd3d550a7eb532ac759cac7be09c2719'
      },
      {
        type: Data,
        desc: 'Transaction hash to sign',
        example: 'Schoolbus'
      }
    ],
    returns: {
      type: Data,
      desc: 'Signed data',
      example: '0x2ac19db245478a06032e69cdbd2b54e648b78431d0a47bd1fbab18f79f820ba407466e37adbe9e84541cab97ab7d290f4a64a5825c876d22109f3bf813254e8628'
    }
  },

  signTransaction: {
    desc: '?',
    params: [
      '?'
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  },

  submitWork: {
    desc: 'Used for submitting a proof-of-work solution.',
    params: [
      {
        type: Data,
        desc: '8 Bytes - The nonce found (64 bits)',
        example: '0x0000000000000001'
      },
      {
        type: Data,
        desc: '32 Bytes - The header\'s pow-hash (256 bits)',
        example: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'
      },
      {
        type: Data,
        desc: '32 Bytes - The mix digest (256 bits)',
        example: '0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000'
      }
    ],
    returns: {
      type: Boolean,
      desc: '`true` if the provided solution is valid, otherwise `false`',
      example: true
    }
  },

  submitHashrate: {
    desc: 'Used for submitting mining hashrate.',
    params: [
      {
        type: Data,
        desc: 'a hexadecimal string representation (32 bytes) of the hash rate',
        example: '0x0000000000000000000000000000000000000000000000000000000000500000'
      },
      {
        type: Data,
        desc: 'A random hexadecimal(32 bytes) ID identifying the client',
        example: '0x59daa26581d0acd1fce254fb7e85952f4c09d0915afd33d3886cd914bc7d283c'
      }
    ],
    returns: {
      type: Boolean,
      desc: '`true` if submitting went through succesfully and `false` otherwise',
      example: true
    }
  },

  syncing: {
    desc: 'Returns an object with data about the sync status or `false`.',
    params: [],
    returns: {
      type: Object,
      desc: 'An object with sync status data or `FALSE`, when not syncing',
      format: 'outputSyncingFormatter',
      details: {
        startingBlock: {
          type: Quantity,
          desc: 'The block at which the import started (will only be reset, after the sync reached this head)'
        },
        currentBlock: {
          type: Quantity,
          desc: 'The current block, same as eth_blockNumber'
        },
        highestBlock: {
          type: Quantity,
          desc: 'The estimated highest block'
        },
        blockGap: {
          type: Array,
          desc: 'Array of "first", "last", such that [first, last) are all missing from the chain'
        },
        warpChunksAmount: {
          type: Quantity,
          desc: 'Total amount of snapshot chunks'
        },
        warpChunksProcessed: {
          type: Quantity,
          desc: 'Total amount of snapshot chunks processed'
        }
      },
      example: {
        startingBlock: '0x384',
        currentBlock: '0x386',
        highestBlock: '0x454'
      }
    }
  },

  uninstallFilter: {
    desc: 'Uninstalls a filter with given id. Should always be called when watch is no longer needed.\nAdditonally Filters timeout when they aren\'t requested with [eth_getFilterChanges](#eth_getfilterchanges) for a period of time.',
    params: [
      {
        type: Quantity,
        desc: 'The filter id',
        example: '0xb'
      }
    ],
    returns: {
      type: Boolean,
      desc: '`true` if the filter was successfully uninstalled, otherwise `false`',
      example: true
    }
  },

  unregister: {
    desc: '?',
    params: [
      '?'
    ],
    returns: {
      type: Boolean,
      desc: 'whether the call was successful'
    }
  }
};
