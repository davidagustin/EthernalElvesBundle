import React, { useEffect, useState, useMemo } from "react"
import Loader from "../../components/Loader"
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis"
import "./style.css"
import { actionString, campaigns } from "../home/config"
import Countdown from 'react-countdown';
import {elvesAbi, getCampaign, elvesContract, etherscan,
    checkIn, checkOut, checkOutRen, usedRenSignatures,
    sendCampaign, sendPassive, returnPassive, unStake, merchant, forging,
    heal, lookupMultipleElves, getCurrentWalletConnected, checkRenTransfersIn} from "../../utils/interact"


const TransfersToEth = () => {
    const [loading, setLoading] = useState(true)
    const { Moralis } = useMoralis();
    const [status, setStatus] = useState("")


 
    

    const [clicked, setClicked] = useState([]);

    const [nftData, setNftData] = useState([])
    const [renTransfers, setRenTransfers] = useState([])
    const [activeNfts, setActiveNfts] = useState(true)
    const [txreceipt, setTxReceipt] = useState()
    const [alert, setAlert] = useState({show: false, value: null})
    const [campaignModal, setCampaignModal] = useState(false)
   
    const resetVariables = async () => {
        setClicked([])
        setNftData([])
        setTxReceipt([])
        setCampaignModal(false)
        setActiveNfts(!activeNfts)

    }
    
   
    const handleClick = async (id) => {

        if (clicked.includes(id)) {
            setClicked(clicked.filter(item => item !== id))
        } else {
            setClicked([...clicked, id])
        }

       
    }    


    const checkOutElf = async () => {

        const elvesPolyCheckIn = "ElvesPolyCheckIn";
        const elvesRenTransferIn = "ElvesRenTransferIn"

        let tokenIdsArry = []
        let sentinelArry = []
        let signatureArry = []

        let renAmount 
        let renSignature 
        let timestamp 

        nftData.map((item, index) => {
           

            if (clicked.includes((item.id))) {
                
                if(item.className ===  elvesPolyCheckIn){
                tokenIdsArry.push(item.attributes.tokenId)
                sentinelArry.push(item.attributes.sentinel)
                signatureArry.push(item.attributes.signedTransaction.signature)
                }else if(item.className === elvesRenTransferIn){

                    renAmount = item.attributes.renAmount
                    timestamp = item.attributes.timestamp
                    renSignature = item.attributes.signedTransaction.signature
                }   

                item.set("status", "initiated")
                item.save()
            }


        })
       
      if(tokenIdsArry.length > 0){
        const params1 =  {ids:tokenIdsArry , sentinel:sentinelArry, signature:signatureArry}
        let {success, status, txHash} = await checkOut(params1)
   
        //success && resetVariables()            
 
        setAlert({show: true, value: {title: "Tx Sent", content: (status)}})
      }

        if(renAmount && renSignature && timestamp){
        let sigUsed = await usedRenSignatures(renSignature)
            
            if(parseInt(sigUsed) === 1){
                console.log("is true. very naice.")
                setAlert({show: true, value: {title: "Signature used", content: ("This transaction signature has already been used")}})
                return
            }

          
            const params2 =  {renAmount:renAmount , signature:renSignature, timestamp:timestamp}

            console.log(params2)
            let {success, status, txHash} = await checkOutRen(params2)       
        
     
        setAlert({show: true, value: {title: "Tx Sent", content: (status)}})
        }
        //success && resetVariables()  
        
        setClicked([])
        setNftData([])
                      
        }

        const checkOutRenFunction = async () => {
           
              
            let renAmount 
            let renSignature 
            let timestamp 
    
            nftData.map((item, index) => {
    
                if (clicked.includes((item.id))) {
                 
                    renAmount = item.attributes.renAmount
                    timestamp = item.attributes.timestamp
                    renSignature = item.attributes.signedTransaction.signature
                }   
    
            })

           
           
            let sigUsed = await usedRenSignatures(renSignature)
            
            if(parseInt(sigUsed) === 1){
                console.log("is true. very naice.")
                setAlert({show: true, value: {title: "Signature used", content: ("This transaction signature has already been used")}})
                return
            }

          
            const params =  {renAmount:renAmount , signature:renSignature, timestamp:timestamp}

            console.log(params)
            let {success, status, txHash} = await checkOutRen(params)
       
            success && resetVariables()            
     
            setAlert({show: true, value: {title: "Tx Sent", content: (status)}})
                          
            }

    
     
        useEffect(() => {
            const getData = async () => {
                const {address} = await getCurrentWalletConnected();
                setStatus("connected to address: " + address)

               const Elves = Moralis.Object.extend("ElvesPolyCheckIn");
               const ElvesRenTransferIn = Moralis.Object.extend("ElvesRenTransferIn");
               let results = []

                let query = new Moralis.Query(Elves);
                query.equalTo("from", address);
                query.notEqualTo("status", "confirmed");
                
                let limit = 50

                //page through the results
                
                let hasMore = true
                let page = 1

		while (hasMore) {

			query.limit(limit);
			query.skip(limit * (page - 1));
			query.withCount();
			const response = await query.find();
			let currentIndex = limit * (page)
			currentIndex > response.count ? hasMore = false : hasMore = true
			page++
			setStatus(currentIndex / response.count * 100)
			
			results = results.concat(response.results)
			
		}      

        
        query = new Moralis.Query(ElvesRenTransferIn);
        query.equalTo("from", address);
       
        let renResults = []
        hasMore = true
        page = 1
    
    while (hasMore) {

        query.limit(limit);
        query.skip(limit * (page - 1));
        query.withCount();
        const renResponse = await query.find();
        let currentIndex = limit * (page)
        currentIndex > renResponse.count ? hasMore = false : hasMore = true
        page++
        setStatus(currentIndex / renResponse.count * 100)

        renResults = renResults.concat(renResponse.results)
    
    }
       //check if signature has been used.
       setStatus("checking pending ren transfers")        
       let sigcheckresponse = await checkRenTransfersIn(renResults)
       
       results = results.concat(sigcheckresponse)

        setNftData(results)        
        
        setStatus("done")                  
        setLoading(false)
        }
        
        getData()
          },[]);


        const showAlert = ({title, content}) => {

            return (
                <div className="alert">
                    <h3>{title}</h3>
                    <pre>{content}</pre>
                    <button className="btn btn-red" onClick={()=>setAlert({show: false})}>close</button>
                </div>
            )
        }



    return !loading ? (
        
        <>

        
            
           
                <div className="d-flex">      
                    <div className="column">
                  

                    
                   
            <div>
                <div>Transfers to Eth </div>

            <div className="flex p-10">
                       
                        <button
                            /*disabled={!isButtonEnabled.unstake}*/
                            className="btn-whale"
                            onClick={checkOutElf}
                        >
                            Confirm Transfers
                        </button>     

                    </div>      
                
            </div>
                
                 
                    
        
      <table style={{width: '100%'}}>
      <thead style={{textAlign: "left"}}>
        <tr>
        <th>Id</th>
        <th>Transfer Initiated On</th>
        <th>
            <div className="flex">
                <span>Sentinel State</span>
                
            </div>
        </th>
        <th>Signature</th>
        <th>Token Id</th>
        <th>$REN</th>
        <th>Status</th>
       
        </tr>
      </thead>
      <tbody>
     

            {nftData.map((line, index) => {


                const date = new Date(line.attributes.timestamp * 1000)
                const dateString = date.toString()

                let rowSelected = clicked.includes((line.id)) ? "rowSelected" : ""

                return( <tr key={index} className={`${rowSelected} row`} onClick={()=> handleClick((line.id))}  > 
                   <td>
                     {line.id}
                    </td>
                    <td>
                        {dateString}
                    </td>
                    <td>
                     {line.attributes.sentinel && String(line.attributes.sentinel).substring(0, 10) +
                    "..." +
                    String(line.attributes.sentinel).substring(68)}
                    </td>
                    <td>
                    { String(line.attributes.signedTransaction.signature).substring(0, 15) +
                    "..." +
                    String(line.attributes.signedTransaction.signature).substring(108)}
                    </td>
                    <td>{line.attributes.tokenId}</td>
                    <td>{line.attributes.renAmount && line.attributes.renAmount/1000000000000000000}</td>
                    <td>{line.attributes.status}</td>
                </tr>)
            }
             
               
             
            )}
       

            
                </tbody>
                </table>

             

            </div>

     
      </div>
            
      




{alert.show && showAlert(alert.value)}



        </>
        
     
    ) : <Loader text={status} />
}

export default TransfersToEth