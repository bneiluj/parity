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

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Portal from 'react-portal';

import IdentityIcon from '~/ui/IdentityIcon';
import InputAddress from '~/ui/Form/InputAddress';
import { fromWei } from '~/api/util/wei';

import styles from './addressSelector.css';

class AddressSelector extends Component {
  static propTypes = {
    // Required props
    onChange: PropTypes.func.isRequired,

    // Redux props
    accountsInfo: PropTypes.object,
    accounts: PropTypes.object,
    balances: PropTypes.object,
    contacts: PropTypes.object,
    contracts: PropTypes.object,
    tokens: PropTypes.object,
    wallets: PropTypes.object,

    // Optional props
    allowInput: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    hint: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    value: ''
  };

  state = {
    values: [],
    expanded: false,
    top: 0,
    left: 0
  };

  componentDidMount () {
    const { accounts = {}, contracts = {}, contacts = {} } = this.props;

    this.values = [].concat(
      Object.values(accounts).map((a) => { a.type = 'account'; return a; }),
      Object.values(contracts).map((a) => { a.type = 'contract'; return a; }),
      Object.values(contacts).map((a) => { a.type = 'contact'; return a; })
    ).filter((a) => a);

    this.setState({ values: this.values });
  }

  componentWillReceiveProps (nextProps) {
    if (this.values && this.values.length > 0) {
      return;
    }

    const { accounts = {}, contracts = {}, contacts = {} } = nextProps;

    this.values = [].concat(
      Object.values(accounts).map((a) => { a.type = 'account'; return a; }),
      Object.values(contracts).map((a) => { a.type = 'contract'; return a; }),
      Object.values(contacts).map((a) => { a.type = 'contact'; return a; })
    );

    this.setState({ values: this.values });
  }

  render () {
    const input = this.renderInput();
    const content = this.renderContent();

    return (
      <div className={ styles.main } ref='main'>
        { input }
        { content }
      </div>
    );
  }

  renderInput () {
    const { accountsInfo, disabled, error, hint, label, value } = this.props;

    return (
      <div className={ styles.inputAddress }>
        <InputAddress
          accountsInfo={ accountsInfo }
          disabled={ disabled }
          error={ error }
          label={ label }
          hint={ hint }
          onClick={ this.handleFocus }
          value={ value }
          text
        />
      </div>
    );
  }

  renderContent () {
    const { hint } = this.props;
    const { expanded, top, left } = this.state;

    const classes = [ styles.overlay ];

    if (expanded) {
      classes.push(styles.expanded);
    }

    return (
      <Portal isOpened>
        <div className={ classes.join(' ') } style={ { top, left } }>
          <div className={ styles.inputContainer }>
            <input
              className={ styles.input }
              placeholder={ hint }

              onBlur={ this.handleBlur }
              onChange={ this.handleChange }

              ref={ this.setInputRef }
            />

            { this.renderAccounts() }
          </div>
        </div>
      </Portal>
    );
  }

  renderAccounts () {
    const { expanded, values } = this.state;

    if (!expanded) {
      // return null;
    }

    if (values.length === 0) {
      return (
        <div className={ styles.categories }>
          <div className={ styles.empty }>
            No account matches this query...
          </div>
        </div>
      );
    }

    const accounts = values.filter((a) => a.type === 'account');
    const contacts = values.filter((a) => a.type === 'contact');
    const contracts = values.filter((a) => a.type === 'contract');

    const categories = [
      this.renderCategory('accounts', accounts),
      this.renderCategory('contacts', contacts),
      this.renderCategory('contracts', contracts)
    ];

    return (
      <div className={ styles.categories }>
        { categories }
      </div>
    );
  }

  renderCategory (name, values = []) {
    if (values.length === 0) {
      return null;
    }

    const cards = values
      .map((account) => this.renderAccountCard(account));

    return (
      <div className={ styles.category } key={ name }>
        <div className={ styles.title }>{ name }</div>
        <div className={ styles.cards }>
          <div>{ cards }</div>
        </div>
      </div>
    );
  }

  renderAccountCard (account) {
    const { address } = account;
    const name = account.name || address;
    const balance = this.renderBalance(address);

    const onClick = () => {
      this.handleClick(address);
    };

    return (
      <div key={ address } className={ styles.account } onClick={ onClick }>
        <IdentityIcon address={ address } />
        <div className={ styles.accountInfo }>
          <div className={ styles.accountName }>{ name }</div>
          <div className={ styles.address }>
            { address }
          </div>
          { balance }
        </div>
      </div>
    );
  }

  renderBalance (address) {
    const { balances = {} } = this.props;

    const balance = balances[address];

    if (!balance || !balance.tokens) {
      return null;
    }

    const ethToken = balance.tokens
      .find((tok) => tok.token && (tok.token.tag || '').toLowerCase() === 'eth');

    if (!ethToken) {
      return null;
    }

    const value = fromWei(ethToken.value).toFormat(3);

    return (
      <div className={ styles.balance }>
        <span className={ styles.value }>{ value }</span>
        <span className={ styles.tag }>ETH</span>
      </div>
    );
  }

  setInputRef = (refId) => {
    this.inputRef = refId;
  }

  handleClick = (address) => {
    const { top, left } = this.refs.main.getBoundingClientRect();
    this.props.onChange(null, address);

    this.setState({ top, left, expanded: false });
  }

  handleFocus = () => {
    const { top, left } = this.refs.main.getBoundingClientRect();

    this.setState({ top, left }, () => {
      this.setState({ expanded: true, top: 0, left: 0 }, () => {
        ReactDOM.findDOMNode(this.inputRef).focus();
      });
    });
  }

  handleBlur = () => {
    // this.setState({ expanded: false, top: 0 });
  }

  handleChange = (event) => {
    const { value } = event.target;

    const values = this.values.filter((account) => {
      const address = account.address.toLowerCase();
      const name = (account.name || address).toLowerCase();

      return address.includes(value) || name.includes(value);
    });

    this.setState({ values });
  }
}

function mapStateToProps (state) {
  // const { accounts, contacts, contracts } = state.personal;
  const { accountsInfo } = state.personal;
  const { balances } = state.balances;

  return {
    // accounts,
    // contacts,
    // contracts,
    accountsInfo,
    balances
  };
}

export default connect(
  mapStateToProps
)(AddressSelector);

