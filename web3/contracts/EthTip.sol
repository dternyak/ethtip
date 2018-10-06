pragma solidity ^0.4.24;

import 'chainlink/solidity/contracts/Chainlinked.sol';


contract EthTip is Chainlinked {
  address public owner;
  address public node;
  bytes32 public specId;

  constructor(address _node, address _link, address _oracle, bytes32 _specId) {
    setLinkToken(_link);
    setOracle(_oracle);
    owner = msg.sender;
    specId = _specId;
    node = _node;
  }

  struct TipRequest {
    address from;
    address to;
    uint256 amount;
    bool isInternal;
  }

  mapping (address => uint256) balanceOf;
  mapping (bytes32 => TipRequest) tipRequests;

  event Deposit(address indexed to, uint256 amt);
  event RequestTransfer(address indexed from, address indexed to, bool indexed _isInternal);
  event FufillTransfer(bytes32 indexed requestId, uint256 amount);


  function deposit(address _to) external payable {
    balanceOf[_to] += msg.value;
    emit Deposit(_to, msg.value);
  }

  function requestTransfer(address _from, address _to, uint256 _amount, bool _isInternal) external returns (bytes32) {
    require(msg.sender == owner, "Only the contract owner can call this");
    require(balanceOf[_from] >= _amount);

    ChainlinkLib.Run memory run = newRun(specId, address(this), "fufillTransfer(bytes32,uint256)");
    bytes32 _requestId = chainlinkRequest(run, LINK(1));
    tipRequests[_requestId] = TipRequest(_from, _to, _amount, _isInternal);
    emit RequestTransfer(_from, _to, _isInternal);
    return _requestId;
 }

  function fufillTransfer(bytes32 _requestId) public {
    require(msg.sender == node);

    TipRequest storage request = tipRequests[_requestId];

    balanceOf[request.from] -= request.amount;

    /*
    * Internal transfers are twitter <--> twitter transfers
    * External transfers are twitter -> eth address transfers
    */
    if (request.isInternal) {
      balanceOf[request.to] += request.amount;
    } else {
      request.to.transfer(request.amount);
    }

    delete tipRequests[_requestId];
    emit FufillTransfer(_requestId, request.amount);
  }

  function totalSupply() public view returns (uint256) {
      return address(this).balance;
  }

}
