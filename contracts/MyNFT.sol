//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

/// @dev OpenZeppelin의 스마트 계약 클래스를 가져오는데 차례대로
/// - NFT 스마트 계약이 상속할 ERC-721 표준의 구현을 포함(모든 방법을 구현해야 유효한 NFT) (자세히 : https://eips.ethereum.org/EIPS/eip-721)
/// - 1만큼 증가/감소 할 수 있는 카운터를 제공(NFT 총 개수 추적 및 고유 ID 설정)
/// - 액세스 제어로 스마트 계약 소유자만이 NFT 를 생성할 수 있게함, 모두 가능케 하려면 Ownable, onlyOwner 제거

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

/// @dev OpenZeppelin 라이브러리의 ERC-721 구현을 기반으로 한 NFT 스마트 계약 코드
contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; // NFT 고유 ID

    constructor() ERC721("MyNFT", "NFT") {} // 첫 번째는 스마트 게약의 이름이고 두 번째는 기호

    // NFT 제조
    /// @param recipient 발행된 NFT를 받을 주소, tokenURI NFT의 메타 데이터를 해석하기 위한 JSON 문서
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256)
    {
        // 신규 NFT 생성
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}
