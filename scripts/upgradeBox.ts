import { ethers } from "hardhat"

async function main() {
  const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
  const transparentProxy = await ethers.getContract("Box_Proxy")
  const boxV2 = await ethers.getContract("BoxV2") //or "Box_Implementation"

  const proxyBoxV1 = await ethers.getContractAt("Box", transparentProxy.address)
  const versionBeforeUpdate = await proxyBoxV1.version()
  console.log("current version: ", versionBeforeUpdate.toString())
  console.log("Upgrading now...")

  const upgradeTx = await boxProxyAdmin.upgrade(transparentProxy.address, boxV2.address)
  await upgradeTx.wait(1)

  const proxyBoxV2 = await ethers.getContractAt("BoxV2", transparentProxy.address)
  const versionAfterUpdate = await proxyBoxV2.version()
  console.log("updated version: ", versionAfterUpdate.toString())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
