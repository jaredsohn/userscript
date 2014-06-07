// ==UserScript==
// @name           Dream World Library
// @namespace      http://playmage.com/
// @include        http://*playmage.com/*
// @version		   1.0.4
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==
  
    if (Array.prototype.clear==null) Array.prototype.clear=function(){this.splice(0,this.length);}
    if (String.prototype.format==null) String.prototype.format=function(){var a=arguments; if (a.length==1 && typeof(a[0])=="object" && a[0].constructor==Array) a=a[0]; var t=this; for(var num1=0;num1<a.length;num1++) if (a[num1]!=null) t=t.replace(new RegExp("\\{"+num1+"\\}","gm"),a[num1]); return t;}
    if (String.prototype.trim==null) String.prototype.trim=function(){return this.replace(/^\s+|\s+$/gm,"");}
    if (String.prototype.beginsWith==null) String.prototype.beginsWith=function(text){return this.indexOf(text)==0;}
    if (String.prototype.endsWith==null) String.prototype.endsWith=function(text){return this.lastIndexOf(text)==this.length-text.length;}
     
    function $x(path,method,element){return (element?element.ownerDocument:document).evaluate(path,element||document,null,method||0,null);}
    function $x1(path,element){return $x(path,9,element).singleNodeValue;}
    function $xa(path,method,element){var x=$x(path,method,element); switch(x.resultType){case 4:case 5:for(var num1=0,obj1=null;(obj1=x.iterateNext())!=null;num1++){x[num1]=obj1;x.length=num1+1;} break; case 6:case 7:x.length=x.snapshotLength;for(var num1=0;num1<x.length;num1++) x[num1]=x.snapshotItem(num1); break; } return x;}
    function $nc(nameclass,element){ var r=(element?element:document).getElementsByName(nameclass); if (r.length==0) r=(element?element:document).getElementsByClassName(nameclass); if (r.length==0) r=null; return r;}
    function $inc1(idnameclass,element){var r=(element?element.ownerDocument:document).getElementById(idnameclass); if (r==null) { r=$nc(idnameclass,element); if (r) r=r[0]; } return r;}
    function $ce(tag,textContent,attributes){var e=document.createElement(tag);if (textContent) e.textContent=textContent; if (attributes) for(var name in attributes) e.setAttribute(name,attributes[name]); return e;}
    function stringToHTML(html)
    {
            var div1=$inc1("HiddenDivStringToHtml");
            if (div1==null)
            {
                    div1=$ce("div",null,{id:"HiddenDivStringToHtml",style:"display:none;visibility:hidden;position:absolute;top:-1000px;left:-1000px;"});
                    document.body.appendChild(div1);
            }
            div1.innerHTML=html;
            var element1=div1.firstChild;
            if (element1) div1.removeChild(element1);
            return element1;
    }
     
    var bonusFactor=1.5;
    var playerName="Hero";
    var playerType=0;
    var chainWihsingWells=6;
     
    var logLevel=5;
    function log(message,level){ if (logLevel==0 || (logLevel && logLevel<=level)) GM_log(message);}
     
    function promptDebug(code)
    {
            var result=null;
            while(code)
            {
                    code=prompt(result,code);
                    try{result=eval(code);}
                    catch(ex){result=ex.message;}
            }
    }
     
    function debugFunction(functionCall)
    {
            var curLogLevel=logLevel;
            logLevel=0;
            log("Debuging function: "+functionCall);
            try{return result=eval(functionCall);}
            finally{logLevel=curLogLevel};
    }
     
    puzzleSolverEnabled=false;
    function setPuzzleSolverEnabled(enabled)
    {
            puzzleSolverEnabled=enabled;
            var b=$inc1("puzzleSolver");
            if (b)
            {
                    if (/Disable/.test(b.value)!=enabled)
                    {
                            log("Changing puzle solver ...");
                            clickElement(b);
                    }
            }
            return b;
    }
     
    function setAutofightEnabled(enabled)
    {
            var b=$inc1("disableauto");
            if (b && b.checked==enabled) clickElement(b);
    }
     
    if ($inc1("bodydiv"))
    {
            log("starting up ...");
            if (/dream\/enter/.test(location.href))
            {
                    getData().entryPoint=location.href;
                    setData();
            }
            createGUI();
            removeAlertFunction();
            mainloop();
    }
     
    function removeAlertFunction()
    {
            unsafeWindow.alert=function(msg){setTimeout(log,0,"Alert: "+msg);}
    }
     
    function createGUI()
    {
            if (!$inc1("autoplay") && $inc1("bodydiv"))
            {
                    log("create GUI");
                    var options=getOptions();
                    var div=document.createElement("div");
                    div.setAttribute("style","position:absolute;left:0px;top:30px;z-index:1000;background:white;border:solid 1px black;padding:1px;color:black;");
                    div.innerHTML="<input type='checkbox' id='autoplay' name='autoplay' "+(options.autoplay?"checked='checked'":"")+"/><label for='autoplay'>Autoplay</label>&nbsp;<select id='method' name='method'><option value='autoFight()' "+(options.method=="autoFight()"?"selected='selected'":"")+">Auto Fight</option><option value='fightWithSkillProtected()' "+(options.method=="fightWithSkillProtected()"?"selected='selected'":"")+">Fight With Skill Protected</option><option value='fightDemons()' "+(options.method=="fightDemons()"?"selected='selected'":"")+">Fight Demons</option><option value='fightBoss()' "+(options.method=="fightBoss()"?"selected='selected'":"")+">Fight Mother Ship</option><option value='fightBoss1()' "+(options.method=="fightBoss1()"?"selected='selected'":"")+">Fight Boss</option><option value='fightBoss2()' "+(options.method=="fightBoss2()"?"selected='selected'":"")+">Fight Boss(fast)</option><option value='fightBoss1HKO()' "+(options.method=="fightBoss1HKO()"?"selected='selected'":"")+">Fight Boss(1HKO)</option><option value='searchForMoney()' "+(options.method=="searchForMoney()"?"selected='selected'":"")+">Search For Money</option><option value='searchForPills()' "+(options.method=="searchForPills()"?"selected='selected'":"")+">Search For Pills</option><option value='chainMoneyWells()' "+(options.method=="chainMoneyWells()"?"selected='selected'":"")+">Chain Money Wells</option></select>&nbsp;<input type='checkbox' id='debug' name='debug'/><a id='promptDebug' href='javascript:void(0);'>Debug</a><br/><span id='info'/>";
                    document.body.appendChild(div);
                    $inc1("autoplay").addEventListener("click",function(e){getOptions().autoplay=e.target.checked; setData();},false);
                    $inc1("method").addEventListener("change",function(e){getOptions().method=e.target.value; getQueue().clear(); setData();},false);
                    $inc1("promptDebug").addEventListener("click",function(e){promptDebug("true");},false);
            }
    }
     
    function setInfo(text)
    {
            var el=$inc1("info");
            if (el) el.textContent=text;
    }
     
    var mainlooptimeout=1000;
    function mainloop()
    {
            //log("mainloop");
            try
            {
                    var options=getOptions();
                    if (options.autoplay) eval(options.method);
            }
            catch(e) { log(e.message+"\n"+e.stackTrace); }
            setTimeout(mainloop,mainlooptimeout);
            mainlooptimeout=1000;
    }
     
    function isLoading()
    {
            var flag=unsafeWindow.requestPending;
            var state=getState();
            state.isLoading=flag?state.isLoading+1:0;
            setData();
            if (state.isLoading==4000) reload();
            return flag;
    }
     
    function fightWithSkillProtected()
    {
            if (isLoading()) return;
            setAutofightEnabled(false);
            if (sword==null) sword=getCurrentWeapon().textContent;
            if (!executeCommandsInQueue())
            {
                    addToQueue(["initFullProtection()","fullProtection()","equipSword()","fightWithSkill(0)","clickExploreOrWait()"]);
            }
    }
     
    var aimed=false;
    var guarded=false;
    var shielded=false;
     
    function fullProtection()
    {
            if (!shielded) shielded=shield();
            else if (!guarded) guarded=guard();
            else if (!aimed) aimed=aim();
            return aimed && guarded && shielded?true:null;
    }
     
    function initFullProtection()
    {
            return !(aimed=guarded=shielded=false);
    }
     
    function fightDemons()
    {
            if (isLoading()) return;
            setAutofightEnabled(false);
            if (!executeCommandsInQueue())
            {
                    addToQueue(["fightWithSkillOrRefillSkillPoints(2)","clickExploreOrWait()"]);
            }
    }

    utes = 1;

    function fightBoss()
    {
            if (isLoading()) return;
            setAutofightEnabled(false);
            if (!executeCommandsInQueue())
            {
                    addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints3(-1)","clickButton('Continue')","utes=1"]);
            }
    }
    function fightBoss1()
    {
            if (isLoading()) return;
            setAutofightEnabled(false);
            if (!executeCommandsInQueue())
            {
                    addToQueue(["fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Attack Again')"]);
            }
    }
    
    function fightBoss2()
    {
            if (isLoading()) return;
            setAutofightEnabled(false);
            if (!executeCommandsInQueue())
            {
                    addToQueue(["fightWithSkillOrRefillSkillPoints2(-1)","clickButton('Attack Again')"]);
            }
    }

    function fightBoss1HKO()
    {
            if (isLoading()) return;
            setAutofightEnabled(false);
            if (!executeCommandsInQueue())
            {
                    addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Attack Again')","utes=1"]);
            }
    }
     
    function fightWithSkillOrRefillSkillPoints(skill)
    {
            return getCursp()<20?refillSkillPoints():fightWithSkill(skill)
    }
    
    function fightWithSkillOrRefillSkillPoints1(skill)
    {
            return getCursp()<20?refillSkillPoints():fightWithSkill1(skill)
    }
    
    function fightWithSkillOrRefillSkillPoints2(skill)
    {
            return getCursp()<20?refillSkillPoints():fightWithSkill2(skill)
    }
    
	function fightWithSkillOrRefillSkillPoints3(skill)
    {
	//alert(getMobHp());
        if(getMobHp()<400000){
            return getCursp()<10?openInventoryAndUseItem("fairy dust"):fightWithSkill3("Implosion");
        }
        return getCursp()<61?openInventoryAndUseItem("fairy dust"):fightWithSkill3(skill);
	    //return getMobHp()==600000000?openInventoryAndUseItem("Magic Talisman"):(getCursp()<300?refillSkillPoints():fightWithSkill3(skill))   
    }

    function Talisman()
    {
	if(getCursp()<300){
		openInventoryAndUseItem("fairy dust")
	}
        if (utes==1&&getMobHp()>400000){
	openInventoryAndUseItem("Magic Talisman");
            utes=2;
        }
        return 1;
    }
    
    var exploreCommand=null;
    var fightCommand=null;
     
    function autoFight()
    {
            if (isLoading()) return;
            exploreCommand="clickExploreOrWait(5)";
            fightCommand="fightWithNormalAttackAndDisposeItem()";
            setAutofightEnabled(false);
            setPuzzleSolverEnabled(puzzleSolverEnabled);
            if (!executeCommandsInQueue())
            {
                    var queue=null;
                    if ($inc1("dailychest")) openDailyFreeChest();
                    else if ($inc1("reviewdiv")) queue=["clickPlayNow()"];
                    else if ($inc1("townsign")) queue=["goToDungeon()",exploreCommand];
                    else if ($inc1("enctext"))
                    {
                            var mob=$inc1("mobname");
                            switch(mob.textContent)
                            {
                                    case "A Beggar":
                                            queue=["getEnergyOrNothing()","getBeggarResult()",exploreCommand];
                                            break;
                                    case "A Puzzle Box":
                                            setTimeout(queue=[exploreCommand], 3550);
                                            break;
                                    case "A Treasure Chest":
                                            setTimeout(queue=[exploreCommand], 3550);
                                            break;
                                    case "A Treasure Map":
                                            queue=[exploreCommand];
                                            break;
                                    case "Dust Merchant":
                                            queue=[fightCommand,exploreCommand];
                                            break;
                                    case "Girl in Red":
                                            queue=[fightCommand,exploreCommand];
                                            break;
                                    case "Guardian of Dreams":
                                            queue=["fightWithSkill(0)",exploreCommand];
                                            break;
                                    case "Little Imp":
                                            queue=[exploreCommand];
                                            break;
                                    case "Magic Elf":
                                            queue=["fightWithSkill(0)",exploreCommand];
                                            break;
                                    // case "New Ally":
                                            // break;
                                    case "Magic Mushrooms":
                                            queue=[exploreCommand];
                                            break;
                                    // case "Santa":
                                            // queue=["clickButton('Ask for gift')","getSantaResultAndDisposeItem()",exploreCommand];
                                            // break;
                                    case "The Gambler":
                                            queue=[fightCommand,exploreCommand];
                                            break;
                                    case "The Wiseman":
                                            queue=[fightCommand,exploreCommand];
                                            break;
                                    case "Wishing Well":
                                            queue=["getEnergyOrDive()","getWishingWellResultStatistics()",exploreCommand];
                                            break;
                                            
                  		    case "Alcon Fortress":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints3(-1)","clickButton('Continue')","utes=1"]);
                                            break;
                      		    case "Mu Fortress":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints3(-1)","clickButton('Continue')","utes=1"]);
                                            break;
                      		    case "Human Fortress":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints3(-1)","clickButton('Continue')","utes=1"]);
                                            break;
                      		    case "Vereen Fortress":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                                            
                      		    case "The Lake Demon":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "The Rat Demon":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Captain":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Leader":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Whale":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon H1N1":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Senator":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Sandworm":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Jawba":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Dragon":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;					    					    					    					    					                                                
                                    default:
                                            log("default");
                                            queue=[exploreCommand];
                                            break;
                            }
                    }
                    else if ($inc1("mobnamespan")){
                      	        var mob2=$inc1("mobnamespan")
		    		switch(mob2.textContent){
		     		    case "Alcon Fortress":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints3(-1)","clickButton('Continue')","utes=1"]);
                                            break;
                      		    case "Mu Fortress":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints3(-1)","clickButton('Continue')","utes=1"]);
                                            break;
                      		    case "Human Fortress":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints3(-1)","clickButton('Continue')","utes=1"]);
                                            break;
                      		    case "Vereen Fortress":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints3(-1)","clickButton('Continue')","utes=1"]);
                                            break;

                      		    case "The Lake Demon":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "The Rat Demon":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Captain":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Leader":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Whale":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon H1N1":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Senator":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Sandworm":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Jawba":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                      		    case "Demon Dragon":
                                            addToQueue(["Talisman()","fightWithSkillOrRefillSkillPoints1(-1)","clickButton('Explore')","utes=1"]);
                                            break;
                                    default:
		     			    queue=[fightCommand,exploreCommand];
		     			    break;
 			    }
 		    }
                    else
                    {
                            log("Unknown situation, waiting...");
                            queue=["emptyTurn()"];
                    }
                   
                    addToQueue(queue);
            }
    }
     
    function openDailyFreeChest()
    {
            addToQueue(["clickButton('Open')","clickButton('Close')","tryClickButton('Close')"]);
    }
     
    function killOrAccept()
    {
            var result=null;
            var state=getState();
            if (state.questMob!="The Wiseman") result=clickButton('Accept');
            else
            {
                    state.questMob=null;
                    setData();
                    result=clickButton('Fight');
                    if (result) addToQueue([fightCommand],false,true);
            }
            return result;
    }
     
    function getGirlInRedQuest()
    {
            var result=getGirlInRedQuestResult();
            if (result)
            {
                    var state=getState();
                    state.questMob=result[2];
                    setData();
            }
            return result;
    }
     
    function getItemOtNothing()

    {
            var result=getCurcoins()>getHighCoins()?giveCoinsToBeggar(getHighCoins()):true;
            return result;
    }
     
    function getEnergyOrNothing()
    {
            var result=getCurcoins()>getLowCoins()?giveCoinsToBeggar(getLowCoins()):true;
            return result;
    }
     
    function getEnergyOrDive()
    {
            var result=getCurcoins()>getLowCoins()?throwCoinsInWell(getLowCoins()):clickButton("Dive In");
            return result;
    }
     
    function clickExploreOrBuyMist(index)
    {
            if (getCurenergy()==0 && getCurcoins()>10000000) return addToQueue(["goToTown()","clickButton('healer')","buyMist()","clickButton('Back to Town')"]);
            return clickExploreOrWait(index);
    }
     
    function buyMist()
    {
            var result=true;
            if (getCurcoins()>10000000)
            {
                    result=clickButton("Use");
                    if (getCurenergy()<getCurmaxenergy()-1)
                    {
                            resetQueueFailedRepeatedCommand();
                            result=null;
                    }
            }
            return result;
    }
     
    function fightWithNormalAttackAndDisposeItem()
    {
            result=fightWithSkillOrRefillSkillPoints3(-1);
            if (result)
            {
                    freeInventoryFromUselessItems(result[1]);
                    var quest=getQuestEndResult();
                    if (quest) freeInventoryFromUselessItems(quest[2]);
            }
            return result;
    }
     
    function getFightResultAndDisposeItem()
    {
            var result=getFightResult();
            if (result) freeInventoryFromUselessItems(result[1]);
            return result;
    }
     
    function getGuardianOfDreamsResultAndDisposeItem()
    {
            var result=getGuardianOfDreamsResult();
            if (result) freeInventoryFromUselessItems(result[1]);
            return result;
    }
     
    function getSantaResultAndDisposeItem()
    {
            var result=getSantaResult();
            if (result) freeInventoryFromUselessItems(result[1]);
            return result;
    }
     
    function getTreasureMapResultAndDisposeItem()
    {
            var result=getTreasureMapResult();
            if (result) freeInventoryFromUselessItems(result[1]);
            return result;
    }
     
    function solveTreasureChestAndDisposeItem()
    {
            var result=solveTreasureChest();
            if (result) freeInventoryFromUselessItems(result[1]);
            return result;
    }
     
    function getMysteryBoxResultAndDisposeItem()
    {      
            var result=getMysteryBoxResult();
            if (result) freeInventoryFromUselessItems(result[1]);
            return result;
    }
     
    function freeInventoryFromUselessItems(text)
    {
            text=text.trim();
            if (isFinite(parseInt(text.replace(/,/gm,"")))) return; //it's a number --> coins!
            var el=$x1("//a[contains(text(),\""+text+"\")]/@onmouseover");
            log("freeInventoryFromUselessItems: "+text,5);
            //log("quick inventory item: "+el,5);
            if (text=="fairy dust") openInventoryAndUseItem("fairy dust");
            else if (text=="enchant potion") openInventoryAndUseItem("enchant potion",["enchantWeapon()"]);
            else if (text=="mystery box") openInventoryAndUseItem("mystery box",["getMysteryBoxResultAndDisposeItem()"]);
            else if (el!=null)
            {
                    //({Type:"Sword ", Level:"64", Value:"125000000", Damage:"847", 'Min. Str':"28", 'Equip Bonus':"none"})
                    var num1=/-?\d+/.exec(el.value)[0];
                    log("item id is: "+num1,5);
                    var item=getItemInfos(num1);
                    log(item.toSource(),5);
                    if (item.Name==text && item.Level<getCurlevel() && item.Value>0) sellItemInTown(text);
            }
            //else if (/Guardian's|of speed|of life|of power|of regeneration/.test(text)) sellItemInTown(text);
            //else if (/key|orb/.test(text)) sellItemInTown(text);
            //else addToQueue(["tryClickButton('Close')",exploreCommand]);
    }
     
    function requestItemInfos(itemId)
    {
            var req=new XMLHttpRequest();
            req.open("GET","/dream/itemfloat?item="+itemId,false);
            req.send();
            return req;
    }
     
    function getItemInfos(itemId)
    {
            var req=requestItemInfos(itemId);
            var el=stringToHTML("<div>"+req.responseText+"</div>");
            var attrs=Array.map($xa(".//td[(not(@colspan) or @colspan='2') and span]|.//td[@colspan='4']/span",7,el),function(el){return el.textContent.replace(/\s+/gm," ").trim();});
            attrs.unshift("Name");
            var result=new Object();
            for(var num1=0;num1<attrs.length;num1=num1+2)
            {
                    result[attrs[num1]]=attrs[num1+1];
            }
            return result;
    }
     
    function enchantAccessory(){return enchantItem("accessory");}
    function enchantWeapon(){return enchantItem("weapon");}
    function enchantArmor(){return enchantItem("armor");}
    function enchantItem(item)
    {
            var el=$x1("//div[@id='enhance-id']//div[contains(@onclick,'"+item+"')]");
            if (el) clickElement(el);
            return el;
    }
     
    function openInventoryAndUseItem(item,addCommands)
    {
            log("Open inventory and use item: "+item);
            var queue=["clickButton('Inventory')","useInventoryItem(\""+item+"\")"];
            if (addCommands) queue=queue.concat(addCommands);
            queue.push("tryClickButton('Close')");
            return addToQueue(queue,false,true);
    }
     
    function searchForMoney()
    {
            if (isLoading()) return;
            exploreCommand="clickExploreOrWait(5)";
            fightCommand="fightWithNormalAttack()";
            setPuzzleSolverEnabled(puzzleSolverEnabled);
            if (!executeCommandsInQueue())
            {
                    var queue=null;
                    if ($inc1("dailychest")) openDailyFreeChest();
                    else if ($inc1("reviewdiv")) queue=["clickPlayNow()"];
                    else if ($inc1("townsign")) queue=["goToDungeon()",exploreCommand];
                    else if ($inc1("enctext"))
                    {
                            var mob=$inc1("mobname");
                            log("Special encounter: "+mob.textContent,5);
                            switch(mob.textContent)
                            {
                                    case "A Beggar":
                                            queue=["getItemOtNothing()","getBeggarResultAndSellItem()",exploreCommand];//
                                            break;
                                    // case "A Puzzle Box":
                                            // queue=["clickButton('Open')","solvePuzzleBox()",exploreCommand];
                                            // break;
                                    // case "A Treasure Chest":
                                            // queue=["clickButton('Open')","solveTreasureChest()",exploreCommand];
                                            // break;
                                    // case "A Treasure Map":
                                            // queue=["clickButton('Find')","getTreasureMapResult()",exploreCommand];
                                            // break;
                                    // case "Girl in Red":
                                            // queue=["clickButton('Accept')","getGirlInRedQuest()",exploreCommand];
                                            // break;
                                    // case "Guardian of Dreams":
                                            // queue=["clickButton('Fight')","fightWithSkill(-1)",exploreCommand];
                                            // break;
                                    case "Magic Mushrooms":
                                            queue=["clickButton('Taste')","getMagicMushroomResult()",exploreCommand];
                                            break;
                                    // case "Santa":
                                            // queue=["clickButton('Ask for gift')","getSantaResultAndDisposeItem()",exploreCommand];
                                            // break;
                                    case "Wishing Well":
                                            queue=["clickButton('Dive In')","getWishingWellResultStatistics()",exploreCommand]; //clickButton('Dive In')
                                            break;
                                    default:
                                            log("default");
                                            queue=[exploreCommand];
                                            break;
                            }
                    }
                    else if ($inc1("mobnamespan")) queue=["goToTown()"];
                    else
                    {
                            log("Unknown situation, waiting...");
                            queue=["emptyTurn()"];
                    }
                   
                    addToQueue(queue);
            }
    }
     
    function goToDungeon()
    {
            var result=getButtons("Auto Explore").length!=0;
            if (!result) clickButton('dungeon');
            return result;
    }
     
    function goToTown()
    {
            var result=$inc1("townsign");
            if (!result)
            {
                    clickButton('Town Map');
                    clickButton('Okay');
            }
            return result;
    }
     
    function sellItemInTown(item)
    {
            log("Sell Item In Town: "+item,5);
            addToQueue(["goToTown()","clickButton('healer')","sellInventoryItem(\""+item+"\")","clickButton('Okay')","clickButton('Back to Town')","goToDungeon()"],true,true)
    }
     
    function getBeggarResultAndSellItem()
    {
            var result=getBeggarResult();
            if (result && result.length>1) sellItemInTown(result[2].replace("!","").trim());
            return result;
    }
     
    function searchForPills()
    {
            exploreCommand="clickExploreOrWait()";
            fightCommand="fightWithNormalAttack()";
            setPuzzleSolverEnabled(puzzleSolverEnabled);
            if (!executeCommandsInQueue())
            {
                    var queue=null;
                    if ($inc1("reviewdiv")) queue=["clickPlayNow()"];
                    else if ($inc1("townsign")) queue=["clickButton('The Marsh')","emptyTurn()",exploreCommand];
                    else if ($inc1("enctext"))
                    {
                            var mob=$inc1("mobname");
                            log("Special encounter: "+mob.textContent,5);
                            switch(mob.textContent)
                            {
                                    case "A Beggar":
                                            queue=["giveCoinsToBeggar("+getLowCoins()+")","getBeggarResult()",exploreCommand];
                                            break;
                                    case "A Puzzle Box":
                                            queue=["clickButton('Open')","solvePuzzleBox()",exploreCommand];
                                            break;
                                    // case "A Treasure Chest":
                                            // queue=["clickButton('Open')","solveTreasureChest()",exploreCommand];
                                            // break;
                                    case "A Treasure Map":
                                            queue=["clickButton('Find')","getTreasureMapResult()",exploreCommand];
                                            break;
                                    case "Girl in Red":
                                            queue=["clickButton('Accept')","getGirlInRedQuest()",exploreCommand];
                                            break;
                                    // case "Guardian of Dreams":
                                            // queue=["clickButton('Fight')","fightWithSkill(-1)",exploreCommand];
                                            // break;
                                    case "Magic Mushrooms":
                                            queue=["clickButton('Taste')","getMagicMushroomResult()",exploreCommand];
                                            break;
                                    case "Wishing Well":
                                            queue=["throwCoinsInWell("+getLowCoins()+")","getWishingWellResultStatistics()",exploreCommand];
                                            break;
                                    default:
                                            log("default");
                                            queue=[exploreCommand];
                                            break;
                            }
                    }
                    else if ($inc1("mobnamespan")) queue=["goToTown()"];
                    else
                    {
                            log("Unknown situation, waiting...");
                            queue=["emptyTurn()"];
                    }
                   
                    addToQueue(queue);
            }
    }
     
    function solveTreasureChest()
    {
            log("solveTreasureChest");
            var result=getTreasureChestResult();
            log(result);
            if (!result)
            {
                    var text=$inc1("qnsbox").textContent;
                    log(text);
                    var match=/My age (will) be (\d+) in (\d+) years\. How young am I now\?/.exec(text) ||
                                  /My (current) age is (\d+), how young will I be in (\d+) years\?/.exec(text) ||
                                  /I (have) (\d+) gallons of \w+\.  How many (\d+) gallon containers can I fully fill\?/.exec(text) ||
                                  /On a (farm) there are ([\w-]+) and ([\w-]+)\. There are total of (\d+) heads and (\d+) legs.  How many ([\w-]+) are on the farm\?/.exec(text);
                    log(match);
                    if (match)
                    {
                            switch(match[1])
                            {
                                    case "will":
                                            result=parseInt(match[2])-parseInt(match[3]);
                                            break;
                                    case "current":
                                            result=parseInt(match[2])+parseInt(match[3]);
                                            break;
                                    case "have":
                                            result=Math.floor(parseInt(match[2])/parseInt(match[3]));
                                            break;
                                    case "farm":
                                            var alegs=new Array(2);
                                            for(var num1=0;num1<2;num1++)
                                            {
                                                    var text=match[2+num1];
                                                    alegs[num1]=text=="chickens"?2:text=="three-legged-cows"?3:text=="horses"?4:0;
                                            }
                                            var heads=parseInt(match[4]);
                                            var legs=parseInt(match[5]);
                                            log("X+Y="+heads+"; "+alegs[0]+"X+"+alegs[1]+"Y="+legs);
                                            result=match[6]==match[2]?(legs-alegs[1]*heads)/(alegs[0]-alegs[1]):(legs-alegs[0]*heads)/(alegs[1]-alegs[0]);
                                            break;
                            }
                            log(result);
                            if (result)
                            {
                                    $inc1("answer").value=result;
                                    clickButton("Open");
                            }
                    }
            }
            return result;
    }
     
    function resetQueueFailedRepeatedCommand()
    {
            log("reseting queue failed and repeated state");
            var state=getState();
            state.failedCommand=0;
            state.repeatedCommand=0;
            setData();
    }
     
    function solvePuzzleBox()
    {
            log("solvePuzzleBox");
            var result=getPuzzleBoxResultStatistics();
            log(result);
            if (!result)
            {
                    result=getPuzzleBoxType();
                    log(result);
                    if (result)
                    {
                            log(result[1]);
                            result=/buttons/.test(result[1])?solveGreenButtonsPuzzle():/colors/.test(result[1])?solveFourColorsPuzzle():null;
                            log(result);
                            if (result)
                            {
                                    resetQueueFailedRepeatedCommand();
                                    result=null;
                            }
                    }
            }
            return result;
    }
     
    function solveGreenButtonsPuzzle()
    {
            log("solveGreenButtonsPuzzle");
            var key="";
            var xpath=$x("//div[@class='qnsbox']/table//table//td//a",7);
            log(xpath.snapshotLength);
            for(var num1=0;num1<xpath.snapshotLength;num1++)
            {
                    var el=xpath.snapshotItem(num1);
                    key+=el.parentNode.textContent;
            }
            log(key);
            var solutions=greenButtonsCombinations[key.toString()];
            log(solutions);
            if (!solutions) promptDebug("greenButtonsCombinations["+key+"]");
            for(var num1=0;num1<solutions.length;num1++)
            {
                    var solution=solutions[num1];
                    log(solution);
                    for(var num2=0;num2<solution.length;num2++)
                    {
                            if (solution[num2])
                            {
                                    var el=xpath.snapshotItem(num2);
                                    var src=el.getElementsByTagName("img")[0].src;
                                    var isToPress=/db_button/.test(src);
                                    var isRight=/lg_button/.test(src);
                                    var isWrong=/lr_button/.test(src);
                                    log(isToPress+" "+isRight+" "+isWrong);
                                    if (isToPress) return clickElement(el);
                                    else if (isWrong) break;
                            }
                    }
            }
            return false;
    }
     
    function solveFourColorsPuzzle()
    {
            log("solveFourColorsPuzzle");
            var solution=fourColorsCombinations;
            var xpath=$x("//div[@id='resl']//input[@class='dungeoninput']",7);
            log(xpath.snapshotLength);
            for(var num1=0;num1<xpath.snapshotLength;num1+=2)
            {
                    var cp=xpath.snapshotItem(num1).value+xpath.snapshotItem(num1+1).value;
                    log(cp);
                    solution=solution[cp];
            }
            log(solution.key);
            xpath=document.evaluate("//div[@class='qnsbox']/table//table//td//a",document,null,7,null);
            log(xpath.snapshotLength);
            for(var num1=0;num1<solution.key.length;num1++)
            {
                    var num2=solution.key[num1];
                    log(num1+" "+num2);
                    var el=xpath.snapshotItem(num1+num2*4);
                    clickElement(el);
            }
            return clickButton("Open");
    }
     
    function fightWithNormalAttack()
    {
            var result=getFightResult();
            if (!result && clickButton("Attack")) resetQueueFailedRepeatedCommand();
            return result;
    }
     
    function fightWithSkill(index)
    {
            var result=getFightResult();
            if (!result && useSkill(index)) resetQueueFailedRepeatedCommand();
            return result;
    }
    
    function fightWithSkill1(index)
    {
            var result=getFightResult();
            if (getHpPercent()<95)
            {
            skill=$x1("//tr[@class='vskill' and td/text()=\" "+"Light Heal"+"\"]");
            useSkill(skill);
            }
            else
            if (!result && useSkill(index)) resetQueueFailedRepeatedCommand();
            return result;
    }
    
    function fightWithSkill2(index)
    {
            var result=getFightResult();
            if (getHpPercent()<95)
            {
            skill=$x1("//tr[@class='vskill' and td/text()=\" "+"Light Heal"+"\"]");
            useSkill(skill);
            }
            else
            if (!result && useSkill2(index)) resetQueueFailedRepeatedCommand();
            return result;
    }
    
    function fightWithSkill3(index)
    {
           /* var result=getFightResult();
            if (getMobHp()>13000)
            {
			openInventoryAndUseItem("Magic Talisman");
            }
            else
            if (!result && useSkill3(index)) resetQueueFailedRepeatedCommand();
            return result;*/
            var result=getFightResult();
            if (!result && useSkill(index)) resetQueueFailedRepeatedCommand();
            return result;
    		
    }
     
    var gun=null;
    var sword=null;
    var wand=null;
     
    function equipGun() { return equipWeapon(gun); }
    function equipSword() { return equipWeapon(sword); }
    function equipWand(){ return equipWeapon(wand);  }
    function equipWeapon(weapon) { return getCurrentWeapon().textContent==weapon?true:useQuickInventoryItem(weapon);}
     
    function refillSkillPoints()
    {
            return getCursp()<20?openInventoryAndUseItem("fairy dust"):false;
    }
     
    function getQuickInventoryItem(item)
    {
            return $x1("//div[@id='invbox']//td[a/text()=\""+item+"\"]");
    }
     
    function getQuickIventoryItemId(item)
    {
            /'(\d+)'/.exec($x1(".//a/@onmouseover",getQuickInventoryItem(item)).value)[1];
    }
     
    function useQuickInventoryItem(item)
    {
            var el=getQuickInventoryItem(item);
            if (!el) log("item "+item+" not found.");
            else
            {
                    el=el.getElementsByTagName("div")[0];
                    log(el.textContent+" item '"+item+"'");
                    clickElement(el);
            }
            return el;
    }
     
    function useInventoryItem(item)
    {
            var el=$x1("//table[@id='tinvtb']//tr[td/a/text()=\""+item+"\"]//div");
            if (!el) log("item "+item+" not found.");
            else
            {
                    log(el.textContent+" item '"+item+"'");
                    clickElement(el);
            }
            return el;
    }
     
    function sellInventoryItem(item)
    {
            var el=$x1("//div[@id='invbox']//td[a/text()=\""+item+"\"]//span");
            if (!el) log("item "+item+" not found.");
            else
            {
                    log(el.textContent+" item '"+item+"'");
                    clickElement(el);
            }
            return el;
    }
     
    function disableAutoFight()
    {
            var el=getDisableauto();
            if (el && !el.checked) clickElement(el);
    }
     
    function aim() { return useGunSkill("Aim"); }
    function guard() { return useSwordSkill("Guard"); }
    function greaterHeal() { return useWandSkill("Greater Heal"); }
    function heal() { return useWandSkill("Heal"); }
    function lightHeal() { return useWandSkill("Light Heal"); }
    function shield() { return useWandSkill("Shield"); }
     
    function useGunSkill(skill) { return equipGun()?useSkill(skill):true; }
    function useSwordSkill(skill) { return equipSword()?useSkill(skill):true; }
    function useWandSkill(skill) { return useSkill(skill); }
     
    function useSkill(skill)
    {
            //log("useSkill");
            var flag=false;
            if (typeof(skill)=="number") skill=$x1("//tr[@class='vskill']["+(skill<0?"last()":(skill+1))+"]");
            else if (typeof(skill)=="string") skill=$x1("//tr[@class='vskill' and td/text()=\" "+skill+"\"]");
            //log(skill);
            if (skill)
            {
                    clickElement(skill);
                    clickButton("Use Skill");
                    var bar=$inc1("powerbar");
                    //log(bar);
                    var pro=$inc1("powerbarwidth");
	       	    //log(pro);
		    pro.style.width>="100%";
	setTimeout(function() {
	    flag=clickElement(pro);
	}, 550);

            }
            return flag;
    }
    
    function useSkill2(skill)
    {
            //log("useSkill");
            var flag=false;
            if (typeof(skill)=="number") skill=$x1("//tr[@class='vskill']["+(skill<0?"last()":(skill+1))+"]");
            else if (typeof(skill)=="string") skill=$x1("//tr[@class='vskill' and td/text()=\" "+skill+"\"]");
            //log(skill);
            if (skill)
            {
                    clickElement(skill);
                    clickButton("Use Skill");
                    var bar=$inc1("powerbar");
                    //log(bar);
                    var pro=$inc1("powerbarwidth");
	       	    //log(pro);
		    pro.style.width>="100%";
	    flag=clickElement(pro);
            }
            return flag;
    }
     
    function chainMoneyWells()
    {
            setPuzzleSolverEnabled(puzzleSolverEnabled);
            if (!executeCommandsInQueue())
            {
                    var queue=null;
                    var state=getState();
                    //log("worink on state: "+state.action);
                    switch(state.action)
                    {
                            case "createPlayer":
                                    createPlayer(playerType,playerName);
                                    break;
                            case "followTutorial":
                                    followTutorial();
                                    break;
                            case "maxMoney":
                                    maxMoney();
                                    break;
                            case "betAllOnWishingWells":
                                    betAllOnWishingWells(chainWihsingWells);
                                    break;
                            case "end":
                                    break;
                            default:
                                    changeStateAction('createPlayer');
                                    break;
                    }
                    addToQueue(queue);
            }
    }
     
    function emptyTurn()
    {
            return true;
    }
     
    function changeStateAction(newAction)
    {
            if (newAction)
            {
                    log("new action: "+newAction);
                    getState().action=newAction;
                    setData();
            }
            return newAction;
    }
     
    function restart()
    {
            if (getCurlevel()>3) log("don't reset character, level is higher than 3");
            else if (getCurcoins()>20000) log("don't reset character, more than 20000 coins");
            else
            {
                    log("restart character");
                    changeStateAction("createPlayer");
                    var state=getState()
                    var stat=getStatistics();
                    stat.restarts++;
                    stat.moneyWellsHistory.push(state.moneyWells+"/"+state.WishingWells);
                    getData().state=null;
                    return addToQueue(["clickButton('Character')","clickRestart()","clickButton('Okay')"],true);
            }
    }
     
    function createPlayer(classIndex,playerName)
    {
            var classes=$nc("createboxsel");
            if (!classes) restart();
            else
            {
                    var state=getState();
                    state.WishingWells=0;
                    state.moneyWells=0;
                    state.solvedPuzzle=0;
                    clickElement(classes[classIndex]);
                    var name=$inc1("name");
                    name.value=playerName;
                    clickPlayNow();
                    changeStateAction('followTutorial')
            }
    }
     
    function followTutorial()
    {
            var result=$inc1("tutorialdiv")!=null;
            if (result) addToQueue(["clickButton('Village Chief')","clickButton('Back to Town')","clickButton('The Marsh')","emptyTurn()","clickExplore()","emptyTurn()","clickButton('Taste')","reload()","changeStateAction('maxMoney')"]); //,"clickExplore()","attack()","clickExplore()","clickButton('Town Map')"
    }
     
    function maxMoney()
    {
            return addToQueue(["clickButton('Home')","tryClickButton('Open')","emptyTurn()","tryClickButton('Close')","clickPlayNow()","clickButton('Guardian')","emptyTurn()","buyMoney()","clickButton('Close')","changeStateAction('betAllOnWishingWells')"]);
    }
     
    function betAllOnWishingWells(moneyWells)
    {
            var ceowor="clickExploreOrWaitOrReset()";
            var queue=null;
            var state=getState();
            if ($inc1("reviewdiv")) queue=["clickPlayNow()"];
            else if ($inc1("townsign")) queue=["clickButton('The Marsh')","emptyTurn()",ceowor];
            else if ($inc1("enctext"))
            {
                    var mob=$inc1("mobname");
                    log("Special encounter: "+mob.textContent);
                    switch(mob.textContent)
                    {
                            case "A Puzzle Box":
                                    queue=state.solvedPuzzle>2?[ceowor,"clickButton('Okay')"]:["clickButton('Open')","solvePuzzleBox()",ceowor];
                                    break;
                            case "Girl in Red":
                                    queue=["clickButton('Accept')","getGirlInRedQuest()",ceow];
                                    break;
                            case "Magic Mushrooms":
                                queue=["clickButton('Taste')","getMagicMushroomResult()",ceowor];
                                    break;
                            case "Wishing Well":
                                    queue=["throwCoinsInWell("+getCurcoins()+")","getWishingWellResultAndContinueOrReset("+moneyWells+")",ceowor];
                                    break;
                            default:
                                queue=[ceowor];
                                    break;
                    }
            }
            else if ($inc1("mobname")) queue=["clickButton('Town Map')","clickButton('Okay')"];
        else queue=[ceowor];
            addToQueue(queue);
            setData();
    }
     
    function buyMoney()
    {
            var flag=getCurhgems()<10;
            if (!flag) clickButton('Buy');
            return flag;
    }
     
    function clickExploreOrWaitOrReset(index)
    {
            if (getCurenergy()==0 && getState().moneyWells<3) return restart();
            return clickExploreOrWait(index,4);
    }
     
    function getWishingWellResultAndContinueOrReset(moneyWells)
    {
            var match=getWishingWellResultStatistics();
            log(match);
            if (match)
            {
                    var state=getState();
                    state.WishingWells++;
                    if (getCurcoins()==0) restart();
                    else
                    {
                            state.moneyWells++;
                            if (state.moneyWells==moneyWells) addToQueue(["changeStateAction('end')"]);
                    }
                    setData();
            }
            return match;
    }
     
    function getPuzzleBoxResultStatistics()
    {
            log("solvePuzzleBox");
            var match=getPuzzleBoxResult();
            log(match);
            if (match)
            {
                    var text=match[1];
                    getState().solvedPuzzle++;
                    var stat=getStatistics();
                    stat.puzzleBoxes++;
                    if (/\d+ coins/.test(text)) { log("Box contains coins"); stat.moneyPuzzleBoxes++; }
                    else if (/A magical Dexterity Pill/.test(text)) { log("Box contains Dexterity Pill"); stat.dexterityPuzzleBoxes++; }
                    else if (/A magical Speed Pill/.test(text)) { log("Box contains Speed Pill"); stat.speedPuzzleBoxes++; }
                    else if (/A magical IQ Pill/.test(text)) { log("Box contains IQ Pill"); stat.iqPuzzleBoxes++; }
                    setData();
            }
            return match;
    }
     
    function getWishingWellResultStatistics()
    {
            var match=getWishingWellResult();
            log(match);
            if (match)
            {
                    var stat=getStatistics();
                    stat.WishingWells++;
                    var text=match[1];
                    log(text);
                    if (/The well suddenly spits out twice much coins as you threw in!/.test(text))
                    {
                            stat.moneyWells++;
                            log("gained money");
                    }
                    else if (/The well invites you to take drink its water!/.test(text))
                    {
                            stat.skillWells++;
                            log("skill refilled");
                    }
                    else if (/The well sprays some water on you/.test(text))
                    {
                            stat.energyWells++;
                            log("energy refilled");
                    }
                    setData();
            }
            return match;
    }
     
    function throwCoinsInWell(coins)
    {
            return submitCoins(coins,"Throw");
    }
     
    function giveCoinsToBeggar(coins)
    {
            return submitCoins(coins,"Give");
    }
     
    function submitCoins(coins,button)
    {
            //log("submit coins "+coins,5);
            var amount=$inc1("amount");
            if (amount) amount.value=coins;
            return amount && clickButton(button);
    }
     
    //                  0                              10                                       20                                                30                                                       40                                                            50                                                                    60                                                                      70                                                                              80                                                                                90                                                                                        100
    var gcdSharedCoins=[0,20,30,40,50,60,72,98,128,162,200,240,288,345,414,496,595,714,856,1027,1232,1453,1714,2022,2385,2814,3320,3917,4622,5453,6434,7592,8958,10570,12472,14716,17364,20489,24177,28528,33663,39049,45296,52543,60949,70700,82012,95133,110354,123596,138427,155038,173642,194479,217816,243953,273227,306014,342735,383863,429926,481517,539299,604014,676495,757674,848594,950425,1064476,1192213,1335278,1495511,1674972,1875968,2101084,2353214,2635599,2951870,3306094,3702825,4147164,4644823,5202201,5826465,6525640,7308716,8185761,9168052,10268218,11500404,12880452,14426106,16157238,18096106,20267638,22699754,25423724,28474570,31891518,35718500,40004720];
    function getGCDSharedCoinsCurrentLevel() { return gcdSharedCoins[getCurlevel()]*bonusFactor; }
    function getLowCoins(){ return getGCDSharedCoinsCurrentLevel()*2+1; }
    function getHighCoins(){ return getGCDSharedCoinsCurrentLevel()*4+1; }
    function getDisableauto(){ return $inc1("disableauto"); }
    function getCursp(){ return getNumericValue("cursp"); }
    function getMobHp() { return getNumericValue("mobhp"); }
    function getCurhp() { return getNumericValue("curhp"); }
    function getCurhgems(){ return getNumericValue("curhgems"); }
    function getCurlevel() { return getNumericValue("curlevel"); }
    function getCurcoins() { return getNumericValue("curcoins"); }
    function getCurenergy() { return getNumericValue("curenergy"); }
    function getCurmaxenergy() { return getNumericValue("curmaxenergy"); }
    function getCurrentWeapon() { return $x1("//div[@id='equipbox']//tr[td/img/@alt='weapon']/td/a"); }
    function getHpPercent() { return getNumericValue("hpwidth",100,function(el){return el.style.width;}); }
    function getMobHpPercent() { return getNumericValue("mobhpwidth",100,function(el){return el.style.width;}); }
     
    function getNumericValue(idname,defaultValue,selector)
    {
            var num1=defaultValue || 0;
            var el=$inc1(idname);
            //log(element+": "+el);
            if (el)
            {
                    num1=parseInt((selector?selector(el):el.textContent).replace(/,/gm,""));
                    //log("element value "+num1);
            }
            return num1;
    }
     
    function addToQueue(commands,keepCurrentQueue,ontop)
    {
            //log(commands);
            if (commands)
            {
                    var queue=getQueue();
                    if (keepCurrentQueue)
                    {
                            if (ontop) commands=commands.concat(queue);
                            else commands=queue.concat(commands);
                    }
                    queue.clear();
                    for(var num1=0;num1<commands.length;num1++) queue.push(commands[num1]);
                    //log("actual queue:"+queue);
                    setData();
            }
            return commands;
    }
     
    function executeCommandsInQueue()
    {
            log("executeCommandsInQueue");
            var queue=getQueue();
            var flag=queue.length!=0;
            if (flag)
            {
                    var state=getState();
                    var command=queue.shift();
                    setInfo("Executing: "+command+" ("+state.failedCommand+","+state.repeatedCommand+")");
     
                    var result=null;
                    try{ result = eval(command); }
                    catch(ex){ log(command+"\n"+ex.message+"\n"+ex.stack); }
                    log("Result of '"+command+"' is "+result);
                    if (result!=null)
                    {
                            state.failedCommand=0;
                    }
                    else
                    {
                            queue.unshift(command);
                            var fails=state.failedCommand++;
                            if (fails>4000)
                            {
                                    if ($inc1("debug").checked) promptDebug(command);
                                    else
                                    {
                                            log("failedCommand detected desynchronization ... trying to reset");
                                            addToQueue(["reload()"]);
                                    }
                            }
                    }
                   
                    if (command!=state.lastCommand)
                    {
                            state.repeatedCommand=0;
                            state.lastCommand=command;
                    }
                    else
                    {
                            var repeated=state.repeatedCommand++;
                            if (repeated>4000)
                            {
                                    if ($inc1("debug").checked) promptDebug(command);
                                    else
                                    {
                                            log("repeatedCommand detected desynchronization ... trying to reset");
                                            addToQueue(["reload()"]);
                                    }
                            }
                    }
                   
                    setData();
            }
            return flag;
    }
     
    function reload()
    {
            log("reload");
            var href=getData().entryPoint;
            var state=getState();
            state.failedcommand=0;
            state.repeatedcommand=0;
            setData();
            if (location.href==href) location.reload(true);
            else location.href=href;
            return true;
    }
     
    function getMessageBoxContent(removeNewLines)
    {
            var div=$inc1("exploreActionResult") || $inc1("battletextmiddle") || $inc1("actionresulttd");
            var text=div?div.textContent:"";
            if (removeNewLines) text=text.replace(/\s+/gm," ");
            return text.trim();
    }
     
    function parseMessageBoxContent(regexs,removeNewLines)
    {
            return parseMessage(regexs,getMessageBoxContent(removeNewLines));
    }
     
    function getElementContent(element,removeNewLines)
    {
            var el=$inc1(element);
            var text=el?el.textContent:"";
            if (removeNewLines) text=text.replace(/\s+/gm," ");
            return text.trim();
    }
     
    var lastParsedMessage;
    function parseMessage(regexs,text)
    {
            var result;
            for(var num1=0;num1<regexs.length;num1++)
            {
                    log(regexs[num1]+" = "+regexs[num1].exec(text));
                    if (result=regexs[num1].exec(text)) break;
            }
            log(result?result[0]:text);
            return (lastParsedMessage=result);
    }
     
    function getPuzzleBoxType() { return parseMessageBoxContent([/The metallic Puzzle Box\s*is locked electronically,(.*)/], true); }
    function getFightResult() { return parseMessageBoxContent([/You found an(.*)!/,/You received(.*)coins!\s*You received(.*)experience!/,/You received(.*)coins!\sYou received(.*)experience!(.*.)/,/You received(.*)coins!\sYou received(.*)experience!(.*)/,/You received(.*)coins!\sYou received(.*)experience!(.)/,/You were knocked unconscious(.*)\s*After some time passed, you regained consciousness\.\s*The Guardian of Dreams healed your wounds for (.*) coins\./,/You received(.*)!/,/You were knocked(.*)/], true); }
    function getBeggarResult() { return parseMessageBoxContent([/(The Beggar .+?\.)(.*!)?(.*)/], true); }
    function getPuzzleBoxResult() { return parseMessageBoxContent([/Inside you find:\s*(.*)!/,/Puzzle Box "Self-destructing in 3\.\.2\.\.1\.\."/],true); }
    function getTreasureChestResult() { return parseMessageBoxContent([/Treasure Chest opens! Inside you find:(.*)!(.*)/,/You tried to bash the Treasure Chest open, but it disappeared before you made impact\./,/Treasure Chest laughs "wrong answer!" and then disappears\./],true); }
    function getTreasureMapResult() { return parseMessageBoxContent([/You found:(.*)!(.*)/,/You sold the Treasure Map to another adventurer\.(.*)/],true); }
    function getMagicMushroomResult() { return parseMessageBoxContent([/The mushroom(.*)/],true); }
    function getWishingWellResult() { return parseMessageBoxContent([/You tossed the coins into the Wishing Well\.\s*(.*)\s*(.*)/,/You dived into the Wishing Well(.+)\s*(.*)\s*(.*)/]);}
    function getGirlInRedQuestResult() { return parseMessageBoxContent([/Avenge me and defeat (\d*)\s*(.+) and I will repay you for your trouble\./], true); }
    function getQuestEndResult() { return parseMessageBoxContent([/(.*?)runs to you, gives you a \*hug\* and :(.*?)!/],true); }
    function getSantaResult() { return parseMessageBoxContent([/Santa opens his gift bag and hands you a(.*)!/],true); }
    function getMysteryBoxResult() { return parseMessage([/You used a mystery box\. You found "(.*)"/,/You used a mystery box\. You found(.*)!/,/You used a mystery box\. You found(.*)\./],getElementContent("stepupdatenc",true)); }
    function getGuardianOfDreamsResult() { return parseMessageBoxContent([/The Guardian smiles and gives you(.*)!/],true); }
     
    function clickExploreOrWait(index,waitMinutes)
    {
            var flag=false;
            if (getCurenergy()!=0) flag=clickExplore(index) || clickButton("Back to Area Map");
            else
            {
                    if (!waitMinutes) waitMinutes=(getCurmaxenergy()-1)*4;
                    log("pausing minutes: "+waitMinutes);
                    mainlooptimeout=waitMinutes*60*1000;
            }      
            return flag;
    }
     
    function clickPlayNow()
    {
            //log("click PlayNow");
            var btns=$nc("btn");
            if (btns!=null)
            {
                    for(var num2=0;num2<btns.length;num2++)
                    {
                            var btn=btns[num2];
                            if (btn.alt=="Play Now")
                            {
                                    clickElement(btn);
                                    return btn;
                            }
                    }
            }
            return null;
    }
     
    function clickRestart()
    {
            //log("click restart");
            var links=document.links;
            for(var num1=0;num1<links.length;num1++)
            {
                    var link=links[num1];
                    if (link.textContent=="restart")
                    {
                            clickElement(link);
                            return link;
                    }
            }
            return null;
    }
     
    function clickExplore(index)
    {
            return clickButton("Explore",index);
    }
     
     
     
    function tryClickButton(text,index)
    {
            clickButton(text,index);
            return true;
    }
     
    function clickButton(text,index)
    {
            //log("click "+text);
            var btns=getButtons(text);
            if (btns.length!=0)
            {
                    var btn=btns[Math.max(0,isNaN(index)?0:Math.min(btns.length-1,index))];
                    clickElement(btn);
            }
            return btn;
    }
     
    function getButtons(text)
    {
            //log("searching button "+text);
            var result=new Array();
            var classes=["btn100","btn50","btn60","innertab","menubar","navbutton","signtdright","signtdleft"];
            for(var num1=0;num1<classes.length;num1++)
            {
                    var btns=$nc(classes[num1]);
                    //log(btns);
                    if (btns!=null)
                    {
                            //log(btns.length);
                            for(var num2=0;num2<btns.length;num2++)
                            {
                                    //log(btns[num2].textContent);
                                    var btn=btns[num2];
                                    var onclick=btn.getAttribute("onclick");
                                    if (btn.textContent.trim()==text || (onclick && onclick.indexOf(text)!=-1)) result.push(btn);
                            }
                    }
            }
            //if (result.length==0) log("Button not found");
            return result;
    }
     
    function clickElement(element)
    {
            //log("generating click event");
            if (element)
            {
                    var evt = document.createEvent("MouseEvents");
                    evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
                    element.dispatchEvent(evt);
            }
            return element;
    }
     
    var _data;
    function getData()
    {
            return _data || (_data=(eval(GM_getValue("data")) || new Object()));
    }
    function setData()
    {
            //log("Setting data:"+getData().toSource());
            setTimeout(function(){GM_setValue("data",getData().toSource());},0);
    }
    function getDataKey(key,newKey)
    {
            var data=getData();
            var dataKey=data[key];
            if (!dataKey)
            {
                    dataKey=data[key]=newKey;
                    setData();
            }
            return dataKey;
    }
    function getOptions() { return getDataKey("options",{autoplay:false,method:"fight()"}); }
    function getQueue() { return getDataKey("queue",new Array()); }
    function getState() { return getDataKey("state",{moneyWells:0,WishingWells:0,failedCommand:0,repeatedCommand:0,lastCommand:"",solvedPuzzle:0}); }
    function getStatistics() { return getDataKey("statistics",{puzzleBoxes:0,moneyPuzzleBoxes:0,dexterityPuzzleBoxes:0,speedPuzzleBoxes:0,iqPuzzleBoxes:0,WishingWells:0,energyWells:0,moneyWells:0,skillWells:0,restarts:0,moneyWellsHistory:[]}); }
     
    var greenButtonsCombinations={
            "001121122":[[,,,,,1,1,1,1]],
            "010112121":[[,,1,,,,1,1,1]],
            "010211121":[[1,,,,,,1,1,1]],
            "010212131":[[,,,,1,,1,1,1]],
            "011022112":[[,,1,,,1,,1,1]],
            "011112021":[[,,1,,,1,1,,1]],
            "011121112":[[,,1,,,1,1,1,],[1,,,,,1,,1,1]],
            "011122122":[[,,,,1,1,,1,1]],
            "011211021":[[1,,,,,1,1,,1]],
            "011212031":[[,,,,1,1,1,,1]],
            "011220112":[[1,,,,,1,1,1,]],
            "011221122":[[,,,,1,1,1,1,]],
            "020112111":[[1,,1,,,,,1,1]],
            "020113121":[[,,1,,1,,,1,1]],
            "020202020":[[1,,1,,,,1,,1]],
            "020203030":[[,,1,,1,,1,,1]],
            "020211111":[[1,,1,,,,1,1,]],
            "020212121":[[,,1,,1,,1,1,],[1,,,,1,,,1,1]],
            "020302030":[[1,,,,1,,1,,1]],
            "020311121":[[1,,,,1,,1,1,]],
            "021112011":[[1,,1,,,1,,,1]],
            "021113021":[[,,1,,1,1,,,1]],
            "021121102":[[1,,1,,,1,,1,]],
            "021122112":[[,,1,,1,1,,1,]],
            "021211011":[[1,,1,,,1,1,,]],
            "021212021":[[,,1,,1,1,1,,],[1,,,,1,1,,,1]],
            "021221112":[[1,,,,1,1,,1,]],
            "021311021":[[1,,,,1,1,1,,]],
            "030203020":[[1,,1,,1,,,,1]],
            "030212111":[[1,,1,,1,,,1,]],
            "030302020":[[1,,1,,1,,1,,]],
            "031212011":[[1,,1,,1,1,,,]],
            "100121221":[[,,,1,,,1,1,1]],
            "101031212":[[,,,1,,1,,1,1]],
            "101121121":[[,,,1,,1,1,,1],[,1,,,,,1,1,1]],
            "101130212":[[,,,1,,1,1,1,]],
            "102031112":[[,1,,,,1,,1,1]],
            "102121021":[[,1,,,,1,1,,1]],
            "102130112":[[,1,,,,1,1,1,]],
            "110022211":[[,,1,1,,,,1,1]],
            "110112120":[[,,1,1,,,1,,1]],
            "110121211":[[,,1,1,,,1,1,],[1,,,1,,,,1,1]],
            "110122221":[[,,,1,1,,,1,1]],
            "110211120":[[1,,,1,,,1,,1]],
            "110212130":[[,,,1,1,,1,,1]],
            "110220211":[[1,,,1,,,1,1,]],
            "110221221":[[,,,1,1,,1,1,]],
            "111022111":[[,,1,1,,1,,,1],[,1,1,,,,,1,1]],
            "111031202":[[,,1,1,,1,,1,]],
            "111112020":[[,1,1,,,,1,,1]],
            "111121111":[[,,1,1,,1,1,,],[,1,1,,,,1,1,],[1,,,1,,1,,,1],[1,1,,,,,,1,1]],
            "111122121":[[,,,1,1,1,,,1],[,1,,,1,,,1,1]],
            "111130202":[[1,,,1,,1,,1,]],
            "111131212":[[,,,1,1,1,,1,]],
            "111211020":[[1,1,,,,,1,,1]],
            "111212030":[[,1,,,1,,1,,1]],
            "111220111":[[1,,,1,,1,1,,],[1,1,,,,,1,1,]],
            "111221121":[[,,,1,1,1,1,,],[,1,,,1,,1,1,]],
            "112022011":[[,1,1,,,1,,,1]],
            "112031102":[[,1,1,,,1,,1,]],
            "112121011":[[,1,1,,,1,1,,],[1,1,,,,1,,,1]],
            "112122021":[[,1,,,1,1,,,1]],
            "112130102":[[1,1,,,,1,,1,]],
            "112131112":[[,1,,,1,1,,1,]],
            "112220011":[[1,1,,,,1,1,,]],
            "112221021":[[,1,,,1,1,1,,]],
            "120112110":[[1,,1,1,,,,,1]],
            "120113120":[[,,1,1,1,,,,1]],
            "120121201":[[1,,1,1,,,,1,]],
            "120122211":[[,,1,1,1,,,1,]],
            "120211110":[[1,,1,1,,,1,,]],
            "120212120":[[,,1,1,1,,1,,],[1,,,1,1,,,,1]],
            "120221211":[[1,,,1,1,,,1,]],
            "120311120":[[1,,,1,1,,1,,]],
            "121112010":[[1,1,1,,,,,,1]],
            "121113020":[[,1,1,,1,,,,1]],
            "121121101":[[1,,1,1,,1,,,],[1,1,1,,,,,1,]],
            "121122111":[[,,1,1,1,1,,,],[,1,1,,1,,,1,]],
            "121211010":[[1,1,1,,,,1,,]],
            "121212020":[[,1,1,,1,,1,,],[1,1,,,1,,,,1]],
            "121221111":[[1,,,1,1,1,,,],[1,1,,,1,,,1,]],
            "121311020":[[1,1,,,1,,1,,]],
            "122121001":[[1,1,1,,,1,,,]],
            "122122011":[[,1,1,,1,1,,,]],
            "122221011":[[1,1,,,1,1,,,]],
            "130212110":[[1,,1,1,1,,,,]],
            "131212010":[[1,1,1,,1,,,,]],
            "201031211":[[,1,,1,,,,1,1]],
            "201121120":[[,1,,1,,,1,,1]],
            "201130211":[[,1,,1,,,1,1,]],
            "202031111":[[,1,,1,,1,,,1]],
            "202040202":[[,1,,1,,1,,1,]],
            "202130111":[[,1,,1,,1,1,,]],
            "211022110":[[,1,1,1,,,,,1]],
            "211031201":[[,1,1,1,,,,1,]],
            "211121110":[[,1,1,1,,,1,,],[1,1,,1,,,,,1]],
            "211122120":[[,1,,1,1,,,,1]],
            "211130201":[[1,1,,1,,,,1,]],
            "211131211":[[,1,,1,1,,,1,]],
            "211220110":[[1,1,,1,,,1,,]],
            "211221120":[[,1,,1,1,,1,,]],
            "212031101":[[,1,1,1,,1,,,]],
            "212130101":[[1,1,,1,,1,,,]],
            "212131111":[[,1,,1,1,1,,,]],
            "221121100":[[1,1,1,1,,,,,]],
            "221122110":[[,1,1,1,1,,,,]],
            "221221110":[[1,1,,1,1,,,,]]};
    var fourColorsCombinations={
            key:[0,0,1,2]
            ,"00":{key:[3,3,3,3]}
            ,"01":{key:[2,3,3,3]
                    ,"10":{key:[1,1,3,1]}
                    ,"11":{key:[3,1,3,1]}
                    ,"12":{key:[3,2,2,3]}
                    ,"20":{key:[1,1,3,3]
                            ,"10":{key:[2,2,2,3]}
                            ,"22":{key:[1,3,3,1]}}
                    ,"21":{key:[3,3,3,1]
                            ,"21":{key:[3,3,0,3]}
                            ,"22":{key:[3,1,3,3]}
                            ,"30":{key:[3,3,3,0]}}
                    ,"22":{key:[3,3,2,3]
                            ,"22":{key:[3,2,3,3]}}
                    ,"30":{key:[2,2,3,3]
                            ,"20":{key:[1,3,3,3]}
                            ,"22":{key:[2,3,2,3]}}}
            ,"02":{key:[3,3,0,1]
                    ,"01":{key:[2,2,2,0]}
                    ,"02":{key:[1,2,2,3]
                            ,"12":{key:[2,2,3,0]}
                            ,"22":{key:[2,1,2,3]}
                            ,"30":{key:[1,1,2,3]}}
                    ,"03":{key:[1,2,3,3]
                            ,"20":{key:[1,1,3,0]}
                            ,"22":{key:[2,1,3,3]}}
                    ,"10":{key:[2,2,2,1]
                            ,"20":{key:[1,1,2,1]}
                            ,"30":{key:[1,2,2,1]
                                    ,"22":{key:[2,1,2,1]}}}
                    ,"11":{key:[3,2,2,0]
                            ,"02":{key:[2,1,3,1]}
                            ,"11":{key:[1,2,3,1]}
                            ,"12":{key:[2,2,3,1]}
                            ,"13":{key:[2,2,0,3]}
                            ,"22":{key:[2,3,2,0]}}
                    ,"12":{key:[3,2,3,0]
                            ,"02":{key:[1,1,0,3]}
                            ,"03":{key:[1,3,2,3]}
                            ,"12":{key:[3,1,2,3]}
                            ,"22":{key:[2,3,3,0]}}
                    ,"13":{key:[1,3,3,0]
                            ,"22":{key:[3,1,3,0]}}
                    ,"20":{key:[3,2,2,1]
                            ,"10":{key:[1,1,0,1]}
                            ,"21":{key:[1,3,2,1]}
                            ,"22":{key:[2,3,2,1]}
                            ,"30":{key:[3,1,2,1]}}
                    ,"21":{key:[2,3,3,1]
                            ,"03":{key:[3,2,0,3]}
                            ,"12":{key:[3,3,2,0]}
                            ,"21":{key:[2,3,0,3]}
                            ,"22":{key:[3,2,3,1]}}
                    ,"22":{key:[3,1,0,3]
                            ,"22":{key:[1,3,0,3]}}
                    ,"30":{key:[1,3,0,1]
                            ,"20":{key:[3,3,0,0]
                                    ,"20":{key:[3,3,2,1]}}
                            ,"22":{key:[3,1,0,1]}}}
            ,"03":{key:[1,3,2,0]
                    ,"03":{key:[2,1,0,1]
                            ,"30":{key:[2,2,0,1]}}
                    ,"04":{key:[2,1,0,3]
                            ,"13":{key:[3,2,0,1]}}
                    ,"11":{key:[2,2,0,0]}
                    ,"12":{key:[1,2,0,1]
                            ,"11":{key:[3,1,0,0]}
                            ,"20":{key:[3,2,0,0]}}
                    ,"13":{key:[1,2,0,3]
                            ,"04":{key:[2,1,3,0]}
                            ,"13":{key:[2,3,0,1]}}
                    ,"20":{key:[1,1,0,0]}
                    ,"21":{key:[2,1,2,0]
                            ,"20":{key:[2,3,0,0]}}
                    ,"22":{key:[1,2,3,0]
                            ,"13":{key:[3,1,2,0]}}
                    ,"30":{key:[1,1,2,0]
                            ,"20":{key:[1,3,0,0]}
                            ,"30":{key:[1,2,2,0]}}}
            ,"04":{key:[2,1,0,0]
                    ,"22":{key:[1,2,0,0]}}
            ,"10":{key:[0,3,3,3]
                    ,"00":{key:[1,1,1,1]
                            ,"00":{key:[2,2,2,2]}}
                    ,"01":{key:[3,1,1,1]
                            ,"10":{key:[3,2,2,2]}}
                    ,"10":{key:[1,3,1,1]
                            ,"01":{key:[2,2,3,2]}
                            ,"10":{key:[2,3,2,2]}
                            ,"22":{key:[1,1,1,3]}}
                    ,"11":{key:[3,3,1,1]
                            ,"11":{key:[3,2,3,2]}
                            ,"20":{key:[3,3,2,2]}
                            ,"22":{key:[3,1,1,3]}}
                    ,"20":{key:[2,3,3,2]
                            ,"11":{key:[1,3,1,3]}}
                    ,"21":{key:[3,3,3,2]
                            ,"21":{key:[3,3,1,3]}}
                    ,"22":{key:[3,0,3,3]}}
            ,"11":{key:[0,3,0,3]
                    ,"00":{key:[1,2,1,1]
                            ,"02":{key:[2,1,2,2]}
                            ,"12":{key:[1,1,2,2]}
                            ,"20":{key:[1,2,2,2]}
                            ,"22":{key:[2,1,1,1]}
                            ,"30":{key:[2,2,1,1]}}
                    ,"01":{key:[1,2,3,2]
                            ,"10":{key:[1,1,1,0]}
                            ,"12":{key:[3,2,1,1]}
                            ,"13":{key:[3,1,2,2]}
                            ,"22":{key:[2,1,3,2]}
                            ,"30":{key:[1,1,3,2]}}
                    ,"02":{key:[3,1,3,2]
                            ,"11":{key:[1,0,3,1]}
                            ,"20":{key:[3,1,1,0]}}
                    ,"03":{key:[3,0,3,1]}
                    ,"04":{key:[3,0,3,0]}
                    ,"10":{key:[1,2,1,3]
                            ,"10":{key:[2,2,0,2]}
                            ,"12":{key:[1,3,2,2]}
                            ,"13":{key:[2,3,1,1]}
                            ,"22":{key:[2,1,1,3]}
                            ,"30":{key:[2,2,1,3]}}
                    ,"11":{key:[3,2,0,2]
                            ,"02":{key:[1,3,1,0]
                                    ,"04":{key:[0,1,3,1]}}
                            ,"04":{key:[2,0,2,3]}
                            ,"11":{key:[1,3,3,2]}
                            ,"20":{key:[3,2,1,3]}}
                    ,"12":{key:[2,0,3,3]
                            ,"03":{key:[3,3,1,0]}
                            ,"11":{key:[3,0,0,0]}
                            ,"22":{key:[3,0,2,3]}
                            ,"30":{key:[1,0,3,3]}}
                    ,"20":{key:[0,2,2,3]
                            ,"04":{key:[2,3,0,2]}
                            ,"11":{key:[2,3,1,3]}}
                    ,"21":{key:[0,1,3,3]
                            ,"03":{key:[3,3,0,2]}
                            ,"22":{key:[0,3,3,1]}
                            ,"30":{key:[0,2,3,3]}}
                    ,"22":{key:[0,3,3,0]
                            ,"04":{key:[3,0,0,3]}}
                    ,"30":{key:[0,3,0,0]
                            ,"20":{key:[0,3,2,3]}}}
            ,"12":{key:[0,1,2,1]
                    ,"02":{key:[1,0,0,3]
                            ,"12":{key:[2,0,3,0]}
                            ,"20":{key:[2,0,0,0]}
                            ,"22":{key:[1,0,3,0]}
                            ,"30":{key:[1,0,0,0]
                                    ,"20":{key:[2,0,0,3]}}}
                    ,"03":{key:[1,2,0,2]
                            ,"03":{key:[2,3,1,0]}
                            ,"12":{key:[3,2,1,0]}
                            ,"13":{key:[2,2,1,0]}
                            ,"30":{key:[1,3,0,2]}}
                    ,"04":{key:[1,2,1,0]}
                    ,"11":{key:[0,2,0,3]
                            ,"03":{key:[2,0,2,0]}
                            ,"04":{key:[3,0,2,0]}
                            ,"12":{key:[3,0,0,1]}
                            ,"22":{key:[0,2,3,0]}
                            ,"30":{key:[0,2,0,0]}}
                    ,"12":{key:[1,0,2,3]
                            ,"03":{key:[2,1,0,2]}
                            ,"04":{key:[3,1,0,2]}
                            ,"13":{key:[2,0,3,1]}
                            ,"20":{key:[1,0,0,1]}}
                    ,"13":{key:[1,1,0,2]
                            ,"13":{key:[2,1,1,0]}}
                    ,"20":{key:[0,1,3,0]
                            ,"13":{key:[0,3,0,1]}
                            ,"20":{key:[0,2,2,0]}
                            ,"21":{key:[0,3,2,0]}
                            ,"22":{key:[0,1,0,3]}
                            ,"30":{key:[0,1,0,0]}}
                    ,"21":{key:[0,2,3,1]
                            ,"12":{key:[2,0,2,1]}
                            ,"13":{key:[3,0,2,1]}}
                    ,"22":{key:[1,0,2,1]}
                    ,"30":{key:[0,2,2,1]
                            ,"20":{key:[0,1,0,1]}
                            ,"21":{key:[0,1,2,3]}
                            ,"30":{key:[0,3,2,1]}}}
            ,"13":{key:[0,1,2,0]
                    ,"04":{key:[2,0,0,1]}
                    ,"13":{key:[0,2,0,1]}
                    ,"22":{key:[1,0,2,0]}}
            ,"20":{key:[0,0,3,3]
                    ,"00":{key:[1,2,1,2]
                            ,"22":{key:[2,1,1,2]}
                            ,"30":{key:[1,1,1,2]
                                    ,"20":{key:[2,2,1,2]}}}
                    ,"01":{key:[1,3,1,2]
                            ,"21":{key:[3,2,1,2]}
                            ,"22":{key:[3,1,1,2]}
                            ,"30":{key:[2,3,1,2]}}
                    ,"02":{key:[3,3,1,2]}
                    ,"10":{key:[0,1,1,1]
                            ,"01":{key:[2,0,2,2]}
                            ,"10":{key:[0,2,2,2]}
                            ,"22":{key:[1,0,1,1]}}
                    ,"11":{key:[0,3,1,1]
                            ,"02":{key:[3,0,2,2]}
                            ,"20":{key:[0,3,2,2]}
                            ,"22":{key:[3,0,1,1]}}
                    ,"20":{key:[0,1,1,3]
                            ,"02":{key:[2,0,3,2]}
                            ,"10":{key:[0,0,0,0]}
                            ,"11":{key:[0,2,3,2]}
                            ,"22":{key:[1,0,1,3]}}
                    ,"21":{key:[0,3,1,3]
                            ,"03":{key:[3,0,3,2]}
                            ,"21":{key:[0,3,3,2]}
                            ,"22":{key:[3,0,1,3]}}
                    ,"30":{key:[0,0,0,3]
                            ,"22":{key:[0,0,3,0]}}}
            ,"21":{key:[1,0,2,2]
                    ,"02":{key:[0,1,1,0]
                            ,"30":{key:[0,3,1,0]}}
                    ,"03":{key:[0,2,1,1]
                            ,"30":{key:[0,2,1,3]}}
                    ,"11":{key:[0,0,0,1]
                            ,"12":{key:[3,0,1,0]}
                            ,"20":{key:[0,3,0,2]}
                            ,"30":{key:[0,0,3,1]}}
                    ,"12":{key:[0,1,3,2]
                            ,"03":{key:[2,0,1,1]}
                            ,"04":{key:[2,0,1,3]}
                            ,"20":{key:[0,2,0,2]}}
                    ,"20":{key:[0,0,2,0]
                            ,"12":{key:[3,0,0,2]}
                            ,"20":{key:[1,0,1,0]}
                            ,"30":{key:[0,0,2,3]}}
                    ,"21":{key:[2,0,0,2]}
                    ,"22":{key:[0,1,2,2]}
                    ,"30":{key:[1,0,3,2]}}
            ,"22":{key:[2,0,1,0]
                    ,"04":{key:[0,1,0,2]}
                    ,"13":{key:[0,0,2,1]
                            ,"13":{key:[1,0,0,2]}}
                    ,"22":{key:[0,2,1,0]}}
            ,"30":{key:[0,3,1,2]
                    ,"20":{key:[0,0,0,2]
                            ,"20":{key:[0,0,1,1]}
                            ,"21":{key:[0,0,1,0]}
                            ,"30":{key:[0,0,2,2]}}
                    ,"21":{key:[0,0,1,3]
                            ,"20":{key:[1,0,1,2]
                                    ,"30":{key:[2,0,1,2]}}
                            ,"21":{key:[0,0,3,2]}}
                    ,"22":{key:[3,0,1,2]}
                    ,"30":{key:[0,2,1,2]
                            ,"30":{key:[0,1,1,2]}}}};