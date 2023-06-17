import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { localChains, networkConfig } from "../hardhat-helper-config"
import { network } from "hardhat"
import { verify } from "../utils/verify"

const deployBoxV2: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId as number

  log("----------------------------------------")
  const boxV2 = await deploy("BoxV2", {
    from: deployer,
    args: [],
    waitConfirmations: networkConfig[chainId].blockConfirmations || 1,
    log: true,
  })

  if (!localChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(boxV2.address, [])
  }
}
export default deployBoxV2
deployBoxV2.tags = ["all", "box2"]
