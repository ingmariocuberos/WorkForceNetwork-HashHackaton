// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

// Import the ERC20 contract you want to use for staking
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract StakingContract {
    IERC20 public stakingToken;
    mapping(address => uint256) public stakedAmounts;

    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
    }

    // Allow the contractor to stake tokens
    function stakeTokens(uint256 amount) public {
        require(amount > 0, "Amount must be greater than zero");
        
        // Transfer the ERC20 tokens from the contractor to this contract
        stakingToken.transferFrom(msg.sender, address(this), amount);
        
        // Update the stakedAmounts mapping
        stakedAmounts[msg.sender] += amount;
    }

    // Allow the contractor to withdraw their staked tokens
    function withdrawStake() public {
        uint256 amount = stakedAmounts[msg.sender];
        require(amount > 0, "No staked amount");
        
        // Transfer the staked ERC20 tokens back to the contractor
        stakingToken.transfer(msg.sender, amount);
        
        // Update the stakedAmounts mapping
        stakedAmounts[msg.sender] = 0;
    }
}
