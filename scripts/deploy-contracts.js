import hre from "hardhat";

const [owner] = await hre.ethers.getSigners();

const HealthContractCaller = await hre.ethers.getContractFactory(
  "HealthContractCaller"
);
const healthContractCaller = await HealthContractCaller.deploy();

await healthContractCaller.waitForDeployment();
console.log(`HealthContractCaller deployed to ${healthContractCaller.target}`);

// now deploy the EHR contract;
const EHR = await hre.ethers.getContractFactory("EHR");
const ehr = await EHR.deploy();

await ehr.waitForDeployment();
console.log(`EHR deployed to ${ehr.target} and admin is ${owner.address}`);

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const contractFile = path.join(__dirname, "../src/contracts.json");
fs.writeFileSync(
  contractFile,
  JSON.stringify(
    { healthContract: healthContractCaller.target, ehr: ehr.target },
    null,
    2
  )
);
