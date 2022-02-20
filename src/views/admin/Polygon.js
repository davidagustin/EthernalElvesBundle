import React from "react"
import { useState, useEffect } from "react"
import './style.css'
import {
    // getTokenSupply, 
    elvesAbi, 
    elvesContract,
    etherscan, web3, polyweb3

} from "../../utils/interact"
import { useMoralis } from "react-moralis"


const Polygon = () => {

    const { Moralis } = useMoralis();
    const [tokenId, setTokenId] = useState("3718");
    const [toWallet, setToWallet] = useState("0xe7AF77629e7ECEd41C7B7490Ca9C4788F7c385E5");
    const [sentinelDna, setSentinelDna] = useState("4706963401957735144979870435920061003326130281084485245784014031657642460645");
    const [signature, setSignature] = useState();


    const getSignature = async () => {
    const params =  {wallet: toWallet, tokenId: tokenId, sentinel: sentinelDna}
    let response = await Moralis.Cloud.run("signForEthReturn", params)

    console.log(response)

   
    
}

const remoteTx = async () => {
    const params =  {tokenId: tokenId, sentinel: sentinelDna}
    let response = await Moralis.Cloud.run("remoteTx", params)
    console.log(response)
/*
    const polyElvesAddress = "0x4deab743f79b582c9b1d46b4af61a69477185dd5"
    const polyElvesABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"uint256","name":"action","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Action","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"baseRewards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"creatureCount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"creatureHealth","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"expPoints","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"minLevel","type":"uint256"}],"name":"AddCamp","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"bool","name":"subtract","type":"bool"}],"name":"BalanceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"campaign","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"sector","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Campaigns","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"sentinel","type":"uint256"}],"name":"CheckIn","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"}],"name":"LastKill","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"},{"indexed":true,"internalType":"uint256","name":"renAmount","type":"uint256"}],"name":"RenTransferOut","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"INIT_SUPPLY","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"MAX_LEVEL","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"REGEN_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TIME_CONSTANT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint16","name":"baseRewards_","type":"uint16"},{"internalType":"uint16","name":"creatureCount_","type":"uint16"},{"internalType":"uint16","name":"expPoints_","type":"uint16"},{"internalType":"uint16","name":"creatureHealth_","type":"uint16"},{"internalType":"uint16","name":"minLevel_","type":"uint16"},{"internalType":"uint16","name":"maxLevel_","type":"uint16"}],"name":"addCamp","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"attributes","outputs":[{"internalType":"uint256","name":"hair","type":"uint256"},{"internalType":"uint256","name":"race","type":"uint256"},{"internalType":"uint256","name":"accessories","type":"uint256"},{"internalType":"uint256","name":"sentinelClass","type":"uint256"},{"internalType":"uint256","name":"weaponTier","type":"uint256"},{"internalType":"uint256","name":"inventory","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"bankBalances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"camps","outputs":[{"internalType":"uint32","name":"baseRewards","type":"uint32"},{"internalType":"uint32","name":"creatureCount","type":"uint32"},{"internalType":"uint32","name":"creatureHealth","type":"uint32"},{"internalType":"uint32","name":"expPoints","type":"uint32"},{"internalType":"uint32","name":"minLevel","type":"uint32"},{"internalType":"uint32","name":"campMaxLevel","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256","name":"renAmount","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"checkIn","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"elves","outputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint256","name":"action","type":"uint256"},{"internalType":"uint256","name":"healthPoints","type":"uint256"},{"internalType":"uint256","name":"attackPoints","type":"uint256"},{"internalType":"uint256","name":"primaryWeapon","type":"uint256"},{"internalType":"uint256","name":"level","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"flipActiveStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"flipTerminal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address","name":"owner","type":"address"}],"name":"forging","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getSentinel","outputs":[{"internalType":"uint256","name":"sentinel","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getToken","outputs":[{"components":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"uint256","name":"timestamp","type":"uint256"},{"internalType":"uint8","name":"action","type":"uint8"},{"internalType":"uint8","name":"healthPoints","type":"uint8"},{"internalType":"uint8","name":"attackPoints","type":"uint8"},{"internalType":"uint8","name":"primaryWeapon","type":"uint8"},{"internalType":"uint8","name":"level","type":"uint8"},{"internalType":"uint8","name":"hair","type":"uint8"},{"internalType":"uint8","name":"race","type":"uint8"},{"internalType":"uint8","name":"accessories","type":"uint8"},{"internalType":"uint8","name":"sentinelClass","type":"uint8"},{"internalType":"uint8","name":"weaponTier","type":"uint8"},{"internalType":"uint8","name":"inventory","type":"uint8"}],"internalType":"struct DataStructures.Token","name":"token","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"healer","type":"uint256"},{"internalType":"uint256","name":"target","type":"uint256"},{"internalType":"address","name":"owner","type":"address"}],"name":"heal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"}],"name":"initMint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"address","name":"","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isGameActive","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"isTerminalOpen","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address","name":"owner","type":"address"}],"name":"merchant","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"minted","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256[]","name":"sentinel","type":"uint256[]"}],"name":"modifyElfDNA","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"oldSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address","name":"owner","type":"address"}],"name":"passive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"address","name":"owner","type":"address"}],"name":"returnPassive","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256[]","name":"ids","type":"uint256[]"},{"internalType":"uint256","name":"campaign_","type":"uint256"},{"internalType":"uint256","name":"sector_","type":"uint256"},{"internalType":"bool","name":"rollWeapons_","type":"bool"},{"internalType":"bool","name":"rollItems_","type":"bool"},{"internalType":"bool","name":"useitem_","type":"bool"},{"internalType":"address","name":"owner","type":"address"}],"name":"sendCampaign","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"sentinels","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_owner","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"setAccountBalance","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_inventory","type":"address"},{"internalType":"address","name":"_operator","type":"address"}],"name":"setAddresses","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint8","name":"_primaryWeapon","type":"uint8"},{"internalType":"uint8","name":"_weaponTier","type":"uint8"},{"internalType":"uint8","name":"_attackPoints","type":"uint8"},{"internalType":"uint8","name":"_healthPoints","type":"uint8"},{"internalType":"uint8","name":"_level","type":"uint8"},{"internalType":"uint8","name":"_inventory","type":"uint8"},{"internalType":"uint8","name":"_race","type":"uint8"},{"internalType":"uint8","name":"_class","type":"uint8"},{"internalType":"uint8","name":"_accessories","type":"uint8"}],"name":"setElfManually","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"supported","type":"bool"}],"stateMutability":"pure","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
    const polyElves = new polyweb3.eth.Contract(polyElvesABI, polyElvesAddress);  

    ///TEMP///

    const nonceOperator = await polyweb3.eth.getTransactionCount("0xa2B877EC3234F50C33Ff7d0605F7591053d06E31", 'latest')



 const transactionBody = {
    	to: "0x4deab743f79b582c9b1d46b4af61a69477185dd5",
      	nonce: nonceOperator,
      	data: polyElves.methods.modifyElfDNA([tokenId], [sentinelDna]).encodeABI(),
      	gas:400000
    }
  
  const signedTransaction = await polyweb3.eth.accounts.signTransaction(transactionBody, "b65863535fd5b8ae2d4e4ab60117338ddf84cb80a39b39ba6f2250949b8978a8");
  
    //////


    const fulfillTx = await polyweb3.eth.sendSignedTransaction(signedTransaction.rawTransaction);

   
    console.log(fulfillTx)

   */
    
}




  //


    

   

   

    return (
        <>


        
        <div className="d-flex flex-column text-white justify-center px-4 text-uppercase wl-dialog">
            <p>Generate Player Mint Signature</p>
            
          
            TokenId
            <div className="wl-role">
            <input type="text" value={tokenId} onChange={(e)=>setTokenId(e.target.value)}/>
            </div>
            
            <div className="wl-sig">
            Wallet Address: <br/><input type="text" value={toWallet} onChange={(e)=>setToWallet(e.target.value)}/>
            </div>

            <div className="wl-sig">
            Sentinel DNA: <br/><input type="text" value={sentinelDna} onChange={(e)=>setSentinelDna(e.target.value)}/>
            </div>


                <br/>
            <div className="d-flex flex-row justify-center">
             <button onClick={getSignature} className="btn btn-green">
                Generate Signature
            </button>
            
            <button onClick={remoteTx} className="btn btn-red">
            remoteTx
            </button>
            

            
            </div>
            
         
            
         
         

        </div>        
        
        

        </>



    )
}

export default Polygon

