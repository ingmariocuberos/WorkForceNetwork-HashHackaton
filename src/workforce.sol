// SPDX-License-Identifier: MIT

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

pragma solidity ^0.8.7;

contract WorkForce is ERC721 {
    enum JobStatus { OPEN, COMPLETED }
    
    struct Job {
        string title;
        string description;
        uint256 pay;
        JobStatus status;
    }

    uint256 private s_tokenCounter;
    
    mapping(uint256 => Job) public jobs;

    constructor() ERC721("Contractor", "CTR") {
        s_tokenCounter = 0;
    }
    
    function mintNft(string calldata title, string calldata description, uint256 pay) public returns (uint256) {
        Job memory newJob = Job({
            title: title,
            description: description,
            pay: pay,
            status: JobStatus.OPEN
        });
        jobs[s_tokenCounter] = newJob;
        _safeMint(msg.sender, s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
        return s_tokenCounter;
    }
      
    function tokenURI(uint256 /*tokenId*/) public pure override returns (string memory){
        return "ipfs://QmSTFqCfNWeXoxyaozH6WEaRV4KgsXgiSKgDkwTzffCygF?filename=metadata.json";
    }
      
    function completeJob(uint256 tokenId) public {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: transfer caller is not owner nor approved");
        Job storage job = jobs[tokenId];
        require(job.status == JobStatus.OPEN, "Job is not open");
        job.status = JobStatus.COMPLETED;
        payable(msg.sender).transfer(job.pay);
    }
      
    function getTokenCount() public view returns(uint256){
        return s_tokenCounter;
    }
}
