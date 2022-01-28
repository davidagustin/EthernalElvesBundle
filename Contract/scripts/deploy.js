const hre = require("hardhat");

let huskyAddress = "0xCcB6D1e4ACec2373077Cb4A6151b1506F873a1a5"
let beffAddress =  "0x3296D61C5E737F9847bA52267b1DeBB8Dbff139F"
let validator = "0x80861814a8775de20F9506CF41932E95f80f7035"
const isEthereum = true

async function deployArt() {
  const Hair = await ethers.getContractFactory("Hair");
  const Race = await ethers.getContractFactory("Race");
  const Weapons1 = await ethers.getContractFactory("Weapons1");
  const Weapons2 = await ethers.getContractFactory("Weapons2");
  const Weapons3 = await ethers.getContractFactory("Weapons3");
  const MetadataHandler = await ethers.getContractFactory("ElfMetadataHandler");
  const Accessories = await ethers.getContractFactory("Accessories");
    ///Deploy art contracts
    console.log("deploying art contracts")
    const hair = await Hair.deploy();
    const race = await Race.deploy();
    const weapons1 = await Weapons1.deploy();
    const weapons2 = await Weapons2.deploy();
    const weapons3 = await Weapons3.deploy();
    const accessories = await Accessories.deploy();
  
    //Deploying the contracts
    console.log("deploying inventory manager")  

    let inventory = await upgrades.deployProxy(MetadataHandler);
    await inventory.deployed();
    console.log("setting up inventory manager")  
    await inventory.setRace([1,2,3,4,5,6,7,8,9,10,11,12], race.address)
    await inventory.setHair([1,2,3,4,5,6,7,8,9], hair.address)
    await inventory.setAccessories([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], accessories.address)
    await inventory.setWeapons([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], weapons1.address)
    await inventory.setWeapons([16,17,18,19,20,21,22,23,24,25,26,27,28,29,30], weapons2.address)
    await inventory.setWeapons([31,32,33,34,35,36,37,38,39,40,41,42,43,44,45], weapons3.address)

    return inventory
}

async function deployCampaigns() {
  const Campaigns = await ethers.getContractFactory("ElfCampaigns");
  console.log("deploying campaigns")
  let campaigns = await Campaigns.deploy();
  await campaigns.deployed();
  return campaigns
}

async function deployMiren() {
  const Miren = await ethers.getContractFactory("Miren");
  const MirenX = await ethers.getContractFactory("MirenX");
  console.log("deploying ren")
  let ren = isEthereum ? await Miren.deploy() : await MirenX.deploy();
  await ren.deployed();

  return ren

}

async function deployElves() {
  const Elves = await ethers.getContractFactory("EthernalElves");
  
  console.log("deploying elves")

  const elves = await upgrades.deployProxy(Elves, [huskyAddress, beffAddress]);
  await elves.deployed();
  
  return elves
}


async function main() {
  //Miren on Mainnet: 0xE6b055ABb1c40B6C0Bf3a4ae126b6B8dBE6C5F3f
  
  /*
  const elves = await deployElves()
  console.log("Elves", elves.address)
  
  const inventory = await deployArt()
  console.log("Inventory", inventory.address)
*/
  const campaigns = await deployCampaigns()
  console.log("Campaigns", campaigns.address)
  
  const ren = await deployMiren()
  console.log("Miren", ren.address)
 
  console.log("done")


  
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
