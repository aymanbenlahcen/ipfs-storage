pragma solidity >=0.4.21 <0.7.0;

contract Storage {
	string ipfs;

	function set(string memory _ipfs) public {
		ipfs = _ipfs;
	}

	function get() public view returns(string memory) {
		return ipfs;
	}
}