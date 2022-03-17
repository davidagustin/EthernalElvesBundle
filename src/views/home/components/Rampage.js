import React, { useEffect, useState } from "react"
import {rampages} from "../config" 
import {getRampages, getCurrentWalletConnected} from "../../../utils/interact"
import Loader from "../../../components/Loader";

const Rampage = ({onRampage, data, chain}) => {

    const [rerollWeapon, setRerollWeapon] = useState(false);
    const [rerollAccessories, setRerollAccessories] = useState(true);
    const [useItemValue, setUseItemValue] = useState(false);
    const [sector, setSector] = useState(1)
    const [tooltip, setTooltip] = useState("");
    const [modal, setModal] = useState({show: false, nft: null})
    const [creatureHealth, setCreatureHealth] = useState("")
    const [mirenRewards, setMirenRewards] = useState("")
    const [alert, setAlert] = useState({ show: false, value: null })

    const [campaign, setCampaign] = useState(0)
    const [activeCampaign, setActiveCampaign] = useState(0)
    const [campaignArray, setCampaignArray] = useState(0)
    const [loadingStatus, setLoadingStatus] = useState(true)

    const setSectorChange = (value) => {
    
    setSector(value)
    setMirenRewards(parseInt(activeCampaign.renCost) + (2 * (parseInt(value) - 1)))
    setCreatureHealth(((parseInt(value) - 1) * 12) + parseInt(activeCampaign.levelsGained))
    
    }
    const handleChangeIndex = async (value) => {


        let {address} = await getCurrentWalletConnected()
        let levelValidation = []
        
        data.map(item => {
            if (parseInt(item.level) >= parseInt(activeCampaign.minLevel) && parseInt(item.level) <= parseInt(activeCampaign.maxLevel)) {

                
            }else{
                levelValidation.push(item)
            }        
        
        })

        if(levelValidation.length > 0){
            setAlert({show: true, value: {
                title: "Levels not in range", 
                content: `You can't use this campaign because you have anElf with level ${levelValidation[0].level} in this sector and the campaign requires level ${activeCampaign.minLevel} to ${activeCampaign.maxLevel}`
            }})

            return
        }

        if(parseInt(activeCampaign.count) === 0){
            setAlert({show: true, value: {
                title: "No creatures left", 
                content: `No creatures left in this campaign`
            }})

            return
        }
      
        let tryTokenids = data.map(nft => {return(nft.id)})
        if(tryTokenids.length === 0){
            setAlert({show: true, value: {
                title: "No creatures left",
                content: `Select atleast one elf to enter this campaign`
            }})
            return
        }


        let tryCampaign = activeCampaign.id.toString()
        let trySection = sector.toString()
        let tryWeapon = rerollWeapon
        let tryItem = rerollAccessories
        let useItem = useItemValue

       
        onRampage({tryTokenids, tryCampaign, trySection, tryWeapon, tryItem, useItem, address})
       
        
       // onChangeIndex(value)
    }



    const handleCampaignChange = async (value) => {
        setCampaign(value)
        setActiveCampaign(campaignArray[value])
        setSectorChange(1)

    }

    const showTooltip = (content) => {
        if(content === "") return <></>
        return (
            <div className="sector-tooltip">
                {/* <h3>{title}</h3> */}
                <pre>{content}</pre>
            </div>
        )
    }
    const renderModal = (modal) => {
        if(!modal.show) return <></>
        return (
            <div className="modal">
                <div className="modal-content">
                    <span className="close-modal" onClick={() => setModal({show: false, nft: null})}>X</span>
                    <h3>{`${modal.nft.classString} ${modal.nft.name}`}</h3>
                    <p>{`Health: ${modal.nft.health}\nLevel: ${modal.nft.level}`}</p>
                </div>
            </div>
        )
    }

    const handleRollChoice = (value) => {

        
        if(value === "weapon"){
            setRerollWeapon(!rerollWeapon)
            setRerollAccessories(false)
        }else if(value === "accessories"){
            setRerollWeapon(false)
            setRerollAccessories(!rerollAccessories)
        }else{
            setRerollWeapon(false)
            setRerollAccessories(false)
        }

    }

        useEffect(() => {
            const getCampaignData = async() => {
                const campaignArry = []
                setLoadingStatus("finding creatures to slay")
                for(let i = 0; i < rampages.length; i++){
    
                    await getRampages(rampages[i].id).then(res => {
                        setLoadingStatus("found rampage " + rampages[i].name)
                    const camoObj = {
                            name: rampages[i].name,
                            id: rampages[i].id,
                            time: rampages[i].time,
                            image: rampages[i].image,
                            renCost: res.renCost,
                            count: res.count,
                            levelsGained: res.levelsGained,
                            minLevel: res.minLevel,
                            maxLevel: res.maxLevel,                     
                        }
    
                        campaignArry.push(camoObj)
                    })
                }

                console.log(campaignArry)
                //initialize campaign array
                setCampaignArray(campaignArry)
                setActiveCampaign(campaignArry[campaign])
                setSector(1)
                setMirenRewards(parseInt(campaignArry[campaign].renCost) + (2 * (parseInt(1) - 1)))
                setCreatureHealth(((parseInt(1) - 1) * 12) + parseInt(campaignArry[campaign].levelsGained))
                setLoadingStatus("done")
                
            }
            getCampaignData()
        }, [])

        const showAlert = ({ title, content }) => {

            return (
                <div className="alert">
                    <h3>{title}</h3>
                    <pre>{content}</pre>
                    <button className="btn btn-red" onClick={() => setAlert({ show: false })}>close</button>
                </div>
            )
        }
    
        



    return campaignArray ? (
        <div>

            <div className="d-flex flex-column overview-content">         
            <div className="sector-panel">
                           
            <div className="carousel">
                             <button className="btn_prev" onClick={() => handleCampaignChange(campaign === 0 ? campaignArray.length - 1 : campaign - 1)} />
                             <div className="campaign-slide-passive">
                                 <img className="campaign-thumb-passive" src={campaignArray[campaign === 0 ? campaignArray.length - 1 : campaign - 1].image} alt="campaign" />
                             </div>
                             <div className="campaign-slide">
                                 <img className="campaign-thumb" src={campaignArray[campaign].image} alt="campaign" />
                                 <div className="campaign-title">{campaignArray[campaign].name}</div>
                                 
                             </div>
                             <div className="campaign-slide-passive">
                                 <img className="campaign-thumb-passive" src={campaignArray[(campaign + 1) % campaignArray.length].image} alt="campaign" />
                             </div>
                             <button className="btn_next" onClick={() => handleCampaignChange((campaign + 1) % campaignArray.length)} />
                         </div>
  
                 <div className="sector-options">

                 <div>
                   <span>Sector Selector</span>
                   <br/>
                  
                    
                    {showTooltip(tooltip)}
                   
                    <>
                    <div style={{width: 380}}>
                    <p>weapons &amp; items - look for new stuff when you campaign?</p>
                    </div>
                    
                    <div className="d-flex items-center">
                        <div 
                            className={rerollWeapon ? "btn-sector-option active" : "btn-sector-option"} 
                            onClick={() => handleRollChoice("weapon")}
                            onMouseEnter={() => setTooltip("Do you want to roll a new Weapon?")}
                            onMouseLeave={() => setTooltip("")}
                        >
                            weapon
                        </div>
                        <div 
                            className={rerollAccessories ? "btn-sector-option active" : "btn-sector-option"} 
                            onClick={() => handleRollChoice("accessories")} 
                            onMouseEnter={() => setTooltip("Do you want to roll a new Item?")}
                            onMouseLeave={() => setTooltip("")} 
                        >
                            accessories
                        </div>
                        </div>
                        <div className="d-flex items-center">
                        <div 
                            className={useItemValue ? "btn-sector-option active" : "btn-sector-option"} 
                            onClick={() => setUseItemValue(state => !state)}
                            onMouseEnter={() => setTooltip(`Do you use your item in {${"item in stash"}}?`)}
                            onMouseLeave={() => setTooltip("")}
                        >
                            use item
                        </div>
                    </div>
                    </>
                </div>


                    <div className="game-info">
                     
                      
                        <span>
                            roll weapon:
                            {" "}
                            {rerollWeapon ? <b>YES</b> : <strong>NO</strong>}
                        </span>
                        <span>
                            roll accessories: 
                            {" "}
                            {rerollAccessories ? <b>YES</b> : <strong>NO</strong>}
                        </span>
                        <span>
                            use item:
                            {" "}
                            {useItemValue ? <b>YES</b> : <strong>NO</strong>}
                        </span>
                        <br/>
                      

                        <span>{`Rampage cost: ${mirenRewards}`} $REN</span>
                        <span> Rampage remaining: {activeCampaign.count}</span>                        
                        <span>{`Levels gained: ${creatureHealth}`}</span>
                        <span> Min Level Required: {activeCampaign.minLevel}</span>
                        <span> Max Level Allowed: {activeCampaign.maxLevel}</span>
                     
                    </div>

                   
                    <div className="elves-panel">
                        {data.map((character) => {
                         
                            let attackTime = creatureHealth/parseInt(character.attack);
                            attackTime = attackTime > 0 ? attackTime * 1 : 0;
                            
                            let time = (300/(parseInt(character.health))) +  attackTime;
                            time = Math.ceil(time)
                            
                            
                            
                           return(
                            
                            <div key={character.id} className="elf-rect">
                                <img src={character.image} 
                                onMouseEnter={() => setTooltip(`Expected regeneration time: ${time} hours. Elf level: ${character.level} `)}
                                onMouseLeave={() => setTooltip("")} 
                                alt="elf" onClick={() => setModal({show: true, nft: character})} />
                            </div>
                            )}   
                        )}
                             </div>
                    

                     </div>     
                </div>              
            
            </div>

           
            <div className="d-flex flex-row justify-around">
                  
                    <button className="btn btn-green" onClick={() => handleChangeIndex(1)}>Confirm</button>
            </div>
            
            {renderModal(modal)}
            {alert.show && showAlert(alert.value)}
        </div>
        
    ) : <Loader text={loadingStatus} />
}



export default Rampage