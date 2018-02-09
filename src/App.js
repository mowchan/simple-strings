import React, {Component} from 'react';
import Web3 from 'web3';
import {CONTRACT_ADDRESS, CONTRACT_ABI} from './config/contract';
import {Submit} from './components/buttons';
import {Container, Header, NetworkStatus, PendingTxns, Row} from './components/layout';
import {Heading, Label, Value} from './components/type';
import Input from './components/form/Input';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      web3: null,
      userName: '',
      pageName: '',
      pendingTxns: 0
    };

    this.contractInterface = null;
    this.contract = null;
  }

  componentWillMount() {
    const {web3} = window;

    if (typeof web3 !== 'undefined') {
      console.log('web3 connected!');
      this.setState({web3: new Web3(web3.currentProvider)});
    } else {
      console.log('No web3 provider!');
      return;
    }

    this.contractInterface = web3.eth.contract(CONTRACT_ABI);
    this.contract = this.contractInterface.at(CONTRACT_ADDRESS);

    return this.watchContractEvents();
  }

  watchContractEvents = () => {
    const blockArgs = {fromBlock: 0, toBlock: 'latest'};
    const userNameEvent = this.contract.UserName({}, blockArgs);
    const pageNameEvent = this.contract.PageName({}, blockArgs);

    userNameEvent.watch((error, result) => {
      if (error) return this.onError(error);

      const {userName} = result.args;
      this.decrementPendingTxns();
      this.setState({userName});
    });

    pageNameEvent.watch((error, result) => {
      if (error) return this.onError(error);

      const {pageName} = result.args;
      this.decrementPendingTxns();
      this.setState({pageName});
    });

    return this;
  };

  onSubmitUserName = (e) => {
    e.preventDefault();
    const value = e.target.previousSibling.value;
    this.contract.setUserName(value, this.onTxnCreated);
  };

  onSubmitPageName = (e) => {
    e.preventDefault();
    const value = e.target.previousSibling.value;
    this.contract.setPageName(value, this.onTxnCreated);
  };

  onTxnCreated = (error, result) => {
    if (error) return this.onError(error);
    this.setState({pendingTxns: this.state.pendingTxns + 1});
  };

  decrementPendingTxns = () => {
    const {pendingTxns} = this.state;
    const newPendingTxns = pendingTxns === 0 ? 0 : pendingTxns - 1;
    this.setState({pendingTxns: newPendingTxns});
  };

  onError = (error) => {
    console.log(error);
    return;
  };

  render() {
    const {userName, pageName, pendingTxns, web3} = this.state;
    const pendingTxnsNoun = pendingTxns > 1 || pendingTxns === 0 ? 'transactions' : 'transaction';

    return (
      <div>
        <Header>
          <Container>
            <NetworkStatus>
              {!!web3 && 'MetaMask Connected'}
              {!web3 && 'Network Disconnected'}
            </NetworkStatus>
            {!!pendingTxns && <PendingTxns>
              {pendingTxns} {pendingTxnsNoun} pending
            </PendingTxns>}
          </Container>
        </Header>
        <Container>
          <Heading>Current Values</Heading>
          <Row>
            <Label>userName</Label>
            <Value>{userName}</Value>
          </Row>
          <Row>
            <Label>pageName</Label>
            <Value>{pageName}</Value>
          </Row>
        </Container>
        <Container>
          <Heading>Update Values</Heading>
          <Row>
            <Label>userName</Label>
            <Input />
            <Submit onClick={this.onSubmitUserName}>Submit</Submit>
          </Row>
          <Row>
            <Label>pageName</Label>
            <Input />
            <Submit onClick={this.onSubmitPageName}>Submit</Submit>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
