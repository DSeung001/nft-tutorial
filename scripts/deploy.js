async function main() {
    // ethers 의 ContractFactory 는 새로운 스마트 께약을 배포하는 데 사용되는 추상화
    const MyNFT = await ethers.getContractFactory("MyNFT")

    // ContractFactory 에서 deploy() 호출 시 배포를 시작하며 계약이 실행되는 Promise 반환
    const myNFT = await MyNFT.deploy()
    await myNFT.deployed()
    console.log("Contract deployed to address:", myNFT.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
