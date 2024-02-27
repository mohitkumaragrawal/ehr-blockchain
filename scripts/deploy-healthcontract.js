import hre from "hardhat";

const [owner] = await hre.ethers.getSigners();

const HealthContractCaller = await hre.ethers.getContractFactory(
  "HealthContractCaller"
);
const healthContractCaller = await HealthContractCaller.deploy();

await healthContractCaller.waitForDeployment();
console.log(`HealthContractCaller deployed to ${healthContractCaller.target}`);

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contractFile = path.join(__dirname, "../src/HealthContract.json");
fs.writeFileSync(
  contractFile,
  JSON.stringify({ address: healthContractCaller.target }, null, 2)
);
