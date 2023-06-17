import { DeployFunction } from "hardhat-deploy/dist/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { localChains, networkConfig } from "../hardhat-helper-config"
import { network } from "hardhat"
import { verify } from "../utils/verify"

const deployBox: DeployFunction = async ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) => {
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId as number

  log("----------------------------------------")
  const box = await deploy("Box", {
    from: deployer,
    args: [],
    waitConfirmations: networkConfig[chainId].blockConfirmations || 1,
    log: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: {
        name: "BoxProxyAdmin",
        artifact: "BoxProxyAdmin",
      },
    },
  })

  if (!localChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(box.address, [])
  }
}
export default deployBox
deployBox.tags = ["all", "box"]
