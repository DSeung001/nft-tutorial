require('dotenv').config(); // 환경변수 관련 라이브러리
const API_URL = process.env.API_URL; // HTTP Alchemy API URL
const PUBLIC_KEY = process.env.PUBLIC_KEY; // 거래 출처(=public key)
const PRIVATE_KEY = process.env.PRIVATE_KEY; // MetaMask 개인키

const { createAlchemyWeb3 } = require("@alch/alchemy-web3"); // Alchemy 에서 만든 향상된 web3
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json"); // 계약에 관한 메타정보
const contractAddress = "0x0ba2719038236c8f63028d03674d213fa267fbe8" // 계약 주소, 이더스캔에서 트랜잭션 해시를 검색함으로 얻을 수 있음
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    //the transaction
    const tx = {
        'from': PUBLIC_KEY, // 거래의 출처
        'to': contractAddress, // 우리와 상호작용하고 트랜잭션을 보내는 계약
        'nonce': nonce, // 우리 주소에서 보낼 트랜잭션 수를 정하는 계정의 주소
        'gas': 500000, // 소요 가스
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI() // 수행하고자 하는 계산, 이 경우 NFT 생성
    };
}
