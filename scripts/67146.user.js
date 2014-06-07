// ==UserScript==
// @name           Starfleet Commander Mission Bot
// @include        http://fb.playstarfleet.com/*
// @include        http://starfleet-fb-vip1.bluefrogsrv.com/*
// ==/UserScript==

	//This is a Greasemonkey Script
	//Greasmonkey is a firefox addon
	//Greasemonkey - https://addons.mozilla.org/en-US/firefox/addon/748


	//#########################################################
	var MainLoopDelayMin = 4200;
	var MainLoopDelayMax = 5200;
	//Dont change After this
	var MainLoopDelay = RandomNumber(MainLoopDelayMin,MainLoopDelayMax) //Intervall of the main loop
	
	//#########################################################	
	var Args = getArgs(); //Used to determ page and planet
	var Abbreviation = "YA_" //used to identify saved variables and stuff like that
	var MissionData = [] // Main mission data
	var RunLoop = true //Used to tell if we should be running the bot or not
	
	//#########################################################
	//All this is for the hour delay
	//#########################################################
	if (GM_getValue(Abbreviation + "FromHourMax") == null) {
		GM_setValue(Abbreviation + "FromHourMax",6)
	}
	var FromHourMax = GM_getValue(Abbreviation + "FromHourMin")
	if (GM_getValue(Abbreviation + "FromHourMin") == null) {
		GM_setValue(Abbreviation + "FromHourMin",2)
	}
	var FromHourMin = GM_getValue(Abbreviation + "FromHourMin")	
	var MinFromHour = RandomNumber(FromHourMin,FromHourMax)	
	
	//#########################################################
	//All this is for main loop random
	//#########################################################
	if (GM_getValue(Abbreviation + "MaxLoopDelay") == null) {
		GM_setValue(Abbreviation + "MaxLoopDelay",4)
	}
	var MaxLoopDelay = GM_getValue(Abbreviation + "MaxLoopDelay")
	if (GM_getValue(Abbreviation + "MinLoopDelay") == null) {
		GM_setValue(Abbreviation + "MinLoopDelay",2)
	}
	var MinLoopDelay = GM_getValue(Abbreviation + "MinLoopDelay")
	var RandomLoop = RandomNumber(MinLoopDelay,MaxLoopDelay) //Used to tell if we are ready to fire our click
	var RandomCount = 0 
	//#########################################################
	//All this for Capcha Stuff
	//#########################################################
	var CapchaText = "CAPCHA DETECTED"
	var CapchaStartTime = 0
	var CapchaPhase = 0
	
	//#########################################################
	//###################Main Entry Point######################
	//#########################################################
	
	if (Args[0] == "missions") { 
		SetupTab()
		SetUpConfig()
		MissionLoop();
	} else if (Args[0].toLowerCase().indexOf("captcha") != -1) {
		//O SHIT CAPTCHA
		CapchaStartTime = new Date();
		window.setTimeout(CaptchaAlert,100)
	}

	//#########################################################
	//Capcha Functions
	//#########################################################
	
	function CaptchaAlert() {
		var DisplayText;
		if (CapchaPhase == 1) {
			DisplayText = " " + CapchaText
			CapchaPhase = 0
		} else {
			DisplayText = CapchaText + " "
			CapchaPhase = 1
		}
			var now = new Date();
			DisplayText = DisplayText + " " + timeDifference(now,CapchaStartTime)
			document.title = DisplayText
			window.setTimeout(CaptchaAlert,3000)
	}
	
	//#########################################################
	//Main Functions
	//#########################################################
	
	function MissionLoop() {
		CheckForTime(); //Check if we should be running
		if (RunLoop == true) {	
			var missions=document.evaluate("//tr[@class='mission item']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
			for (var a = 0; a < missions.snapshotLength; a++) {
				var cElement = missions.snapshotItem(a);
				var Clickable = false
				var MyID = Abbreviation + cElement.id
				
				var cButton=document.evaluate(".//td[@class='actions']/div[contains(@id,'select_fleet')]//span[@class='enabled' and not(@style)]", cElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
				if (cButton.snapshotLength > 0) {
					Clickable = true;
				}
				
				cMission = FindMission(MyID)
				if (cMission) {
					cMission.Clickable = Clickable;
				} else {
					var tMissionNode = document.evaluate(".//div[@class='name']", cElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); //Get mission text
					var tMissionName = trim(tMissionNode.snapshotItem(0).innerHTML)
					var tRunAmount = GM_getValue(Args[1] + MyID + "_c",1) //Load up possible saved info on how many we want running
					var tRun = GM_getValue(Args[1] + MyID)
					var tMaxRun = GM_getValue(Args[1] + MyID + "_mc",1)
					var cMission = new MissionDataTemplate(MyID,cElement.id,Clickable,tMissionName,tRunAmount,tRun,tMaxRun); 
					MissionData.push(cMission) //then push it
				}
				
				//This is where we need to check if our element is added
				var CheckElement = document.getElementById(MyID)
				if (CheckElement) {
					//Do nothing
				} else {
					var tMissionNode=document.evaluate(".//div[contains(@id,'select_fleet')]", cElement, null, 9, null).singleNodeValue
					var NewNode = document.createElement("div");
					NewNode.innerHTML = "<input type=\"checkbox\" id=\"" + MyID + "\"" + ((GM_getValue(Args[1] + MyID) == true) ? " checked=\"checked\"" : "") + ">&nbsp;&nbsp;<b>A</b></input>"
					tMissionNode.insertBefore(NewNode, tMissionNode.firstChild);
					document.getElementById(Abbreviation + cElement.id).addEventListener("click", ClickCheck, false);
					//If our box is missing means that this stuff is probly reset as well
					var tDropDown = document.evaluate(".//select[@class='batch_dropdown']", cElement, null, 9, null).singleNodeValue; //Get the drop down
					if (tDropDown.length != 0 && tDropDown.length >= cMission.MaxRun) {
						cMission.MaxRun = tDropDown.length
						GM_setValue(Args[1] + MyID + "_mc",tDropDown.length)
					}
					tDropDown.value = cMission.RunAmount
					document.getElementById(tDropDown.id).addEventListener("click", DropDownClick, false);
					//Do this to make sure they have drop downs
					if (Clickable == false || tDropDown.length == 1 || tDropDown.length < cMission.MaxRun ) {
						var DropBatch = document.evaluate(".//div[contains(@class,'batch_selector')]/div[contains(@class,'batch')]", cElement, null, 9, null).singleNodeValue;
						if (DropBatch) {
							DropBatch.className = "batch"
							var WorkNode = DropBatch.childNodes[1];
							for (var b = tDropDown.length+1; b <= cMission.MaxRun; b++) {
								var tOption = document.createElement('option');
								tOption.value = b
								tOption.text = b
								WorkNode.appendChild(tOption)
							}
							WorkNode.value = cMission.RunAmount				
						}					
					}
				}			
			}
			RandomCount = RandomCount + 1;
			if (RandomCount >= RandomLoop) {
				RandomLoop = RandomNumber(MinLoopDelay,MaxLoopDelay)
				RandomCount = 0
				ClickFirstMission()
			}
		} else {
			//Do nothing		
		}
		window.setTimeout(MissionLoop, MainLoopDelay); // Start main loop back up
		MainLoopDelay = RandomNumber(MainLoopDelayMin,MainLoopDelayMax) //Add this here for really random behavory
	}
	
	function ToggleMainLoop() {
		if (RunLoop == true) {
			RunLoop = false
		} else {
			RunLoop = true
		}
	}
	
	function MissionDataTemplate(tID,tRealID,tClickable,tMissionName,tRunAmount,tRun,tMaxRun) {
		this.ID = tID
		this.RealID = tRealID
		this.Clickable = tClickable
		this.MissionName = tMissionName
		this.RunAmount = tRunAmount
		this.Run = tRun
		this.MaxRun = tMaxRun
	}	
	
	function CheckForTime() {
		now = new Date();
		hour = now.getHours();
		min = now.getMinutes();
		var run = GM_getValue("Config_" + Args[1] + "Time_" + hour)
		if (run == false) {
			if (RunLoop == true) {
				if (min >= MinFromHour) {
					MinFromHour = RandomNumber(FromHourMin,FromHourMax)
					RunLoop = false
				}
			}
		} else {
			if (RunLoop == false) {
				if (min >= MinFromHour) {
					MinFromHour = RandomNumber(FromHourMin,FromHourMax)
					RunLoop = true	
				}
			}
		}
	}

	function ClickFirstMission() {
		for (var a = 0; a < MissionData.length - 1; a++) {
			if (MissionData[a].Clickable && MissionData[a].Run) {
				if (CheckForMissionTimer(MissionData[a].MissionName) == false) {
					var evt = document.createEvent("HTMLEvents");
					evt.initEvent("click", true, true);
					var cButton=document.evaluate("//tr[contains(@id,'" + MissionData[a].RealID + "')]/td[@class='actions']//div[contains(@id,'select_fleet')]//span[@class='enabled' and not(@style)]//a", document, null, 9, null).singleNodeValue;
					cButton.dispatchEvent(evt);
					return
				}
			}
		}
	}
	
	function CheckForMissionTimer(CheckMission) {
		var TaskTable=document.evaluate("//table[@id='tasks']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (TaskTable) {
			var MissionRows=document.evaluate(".//tr", TaskTable.snapshotItem(0), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			for(var a=0; a < MissionRows.snapshotLength; a++) {
				var MissionRow = MissionRows.snapshotItem(a);
				var SpanName = document.evaluate(".//span[@class='name']", MissionRow, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
				var MissionName = trim(SpanName.snapshotItem(0).textContent)
				if (MissionName == CheckMission) {
					return true
				}

			}
		}
		return false
	}
	
	function ClickCheck() {
		GM_setValue(Args[1] + this.id,this.checked)
		cMission = FindMission(this.id)
		cMission.Run = this.checked
	}
	
	function DropDownClick() {
		var MissionId = Abbreviation + "mission" + String(RegExp("\x5F[0-9]+").exec(this.id))
		cMission = FindMission(MissionId)
		if (this.value != cMission.RunAmount) {
			cMission.RunAmount = this.value;
			GM_setValue(Args[1] + MissionId + "_c",this.value)
		}
	}
	
	function FindMission(FindId) {
		for (var a = 0; a < MissionData.length - 1; a++) {
			if (MissionData[a].ID == FindId) {				
				return MissionData[a];
			}
		}
		return false
	}	
	
	function getArgs() {
        var a = {};
		a[0] = location.pathname.replace("/",""); // Get the Current Page
		a[1] = String(RegExp("\x3D[0-9]+").exec(document.location.href)).replace("=","") //Get the Current Planet
		return a;
    }
	
	//#########################################################
	//Config Stuff
	//#########################################################
	
	function SetupTab() {
		var NavBar = document.getElementById("nav_bar").childNodes[1]
		NavBar.innerHTML = NavBar.innerHTML + "<b><a id='BOTLINK' href='#'>BOT</a></b>"
		document.getElementById("BOTLINK").addEventListener("click", ConfigClick, false);
	}
	
	function SetUpConfig() {
		var Pretext = "Config_" + Args[1]
		var ConfigHTML = "<h3>Mission Bot Config</h3><br>"
		//Setup the Hours Table
		tCount = 1
		ConfigHTML = ConfigHTML + "<h2>Misson Hours</h2><br>Only bot between these Hours(Local Time)<br><table border='0'>"
		for (var a = 1; a <= 6; a++) {
			ConfigHTML = ConfigHTML + "<tr>"
			for (var b = 1; b <= 4; b++) {
				if (GM_getValue(Pretext + "Time_" + tCount) == null) {
					GM_setValue(Pretext + "Time_" + tCount,true)
				}
				ConfigHTML = ConfigHTML + "<td><input type=\"checkbox\" id=\"" + "Time_" + tCount + "\"" + ((GM_getValue(Pretext + "Time_" + tCount) == true) ? " checked=\"checked\"" : "") + ">&nbsp;&nbsp;Hour (" + TOD(tCount) + " - " + TOD(tCount+1) + ")&nbsp;&nbsp;</input><td>"
				tCount = tCount + 1
			}
			ConfigHTML = ConfigHTML + "</tr>"
		}
		ConfigHTML = ConfigHTML + "</table><br>"
		//Setup Hour Delays
		ConfigHTML = ConfigHTML + "<h2>Delays</h2><br><b>Hour Delay</b><br>From Hour Min: <input type=\"text\" size=\"5\" id=\"" + Abbreviation + "FromHourMin\"/ value=\""+ GM_getValue(Abbreviation + "FromHourMin") +"\">&nbsp;&nbsp;From Hour Max: <input type=\"text\" size=\"5\" id=\"" + Abbreviation + "FromHourMax\"/ value=\""+ GM_getValue(Abbreviation + "FromHourMax") +"\"><br>Random Delay at the start of each Hour to check to see if the bot should be started<br>(Looks less like bot if you are not stopping exactly at the hour)<br>"
		//Setup Main Loop Delays
		ConfigHTML = ConfigHTML + "<br><b>Main Loop Delay</b><br>Min loop delay: <input type=\"text\" size=\"5\" id=\"" + Abbreviation + "MinLoopDelay\"/ value=\""+ GM_getValue(Abbreviation + "MinLoopDelay") +"\">&nbsp;&nbsp;Max loop delay: <input type=\"text\" size=\"5\" id=\"" + Abbreviation + "MaxLoopDelay\"/ value=\""+ GM_getValue(Abbreviation + "MaxLoopDelay") +"\"><br>Random interval range to start missions(Each interval is 4seconds)<br>"
		//Cap off the Config Box Html
		ConfigHTML = ConfigHTML + "<br><h3></h3><div class='okay'><a id='okay_link' href='#'>Save</a>&nbsp;&nbsp;<a id='quit_link' href='#'>Close</a></div><br><br><br>"
		//Now add the Html to the page
		var FlashBox = document.getElementById("sticky_notices")
		if (!FlashBox) {
			FlashBox = document.getElementById("tutorial")
		}
		var ConfigBox = document.getElementById(Abbreviation + "Config")
		if (ConfigBox) {
			ConfigBox.style.display='none'
			ConfigBox.innerHTML = ConfigHTML
		} else {
			FlashBox.innerHTML = FlashBox.innerHTML + "<div id='" + Abbreviation + "Config' style='display:none;'></div>"
			ConfigBox = document.getElementById(Abbreviation + "Config")
			ConfigBox.innerHTML = ConfigHTML
		}
		document.getElementById("okay_link").addEventListener("click", SaveClick, false);
		document.getElementById("quit_link").addEventListener("click", SetUpConfig, false);
	}
	
	function TOD(tNumber) {
		if (tNumber <= 12) {
			return tNumber + "AM"
		} else if (tNumber == 25) {
			return "1AM"
		}
		return (tNumber - 12) + "PM"
	}
	
	function ConfigClick() {
		var ConfigBox = document.getElementById(Abbreviation + "Config")
		if (ConfigBox == null) {
			SetUpConfig()
			ConfigClick()
		} else {
			ConfigBox.style.display=''
		}
	}
	
	function SaveClick() {
		var ConfigBox = document.getElementById(Abbreviation + "Config")
		var Pretext = "Config_" + Args[1]
		var TimeButton=document.evaluate(".//input[contains(@id,'Time_')]", ConfigBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
		for (var a = 0; a < TimeButton.snapshotLength; a++) {
			GM_setValue(Pretext + TimeButton.snapshotItem(a).id,TimeButton.snapshotItem(a).checked)
		}
		var TextBoxs=document.evaluate(".//input[@type='text']", ConfigBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
		for (var a = 0; a < TextBoxs.snapshotLength; a++) {
			GM_setValue(TextBoxs.snapshotItem(a).id,parseInt(TextBoxs.snapshotItem(a).value))
		}
		ConfigBox.style.display = 'none'
		ReloadPage()
	}

	//#########################################################
	//Misc Funtions
	//#########################################################

	function trim(A) { //Taken from http://blog.stevenlevithan.com/archives/faster-trim-javascript
		var	str = A.replace(/^\s\s*/, ''),
			ws = /\s/,
			i = str.length;
		while (ws.test(str.charAt(--i)));
		return str.slice(0, i + 1);
	}
	
	function insertAfter( referenceNode, newNode )	{
		referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
	}
	
	function RandomNumber(minVal,maxVal) {
		minVal = parseInt(minVal)
		maxVal = parseInt(maxVal)
		return Math.round(minVal+(Math.random()*(maxVal-minVal)));
	}

	function ReloadPage() {
		location.reload(true)
	}
	
	function timeDifference(laterdate,earlierdate) {
		var difference = laterdate.getTime() - earlierdate.getTime();
		var daysDifference = Math.floor(difference/1000/60/60/24);
		difference -= daysDifference*1000*60*60*24
		var hoursDifference = Math.floor(difference/1000/60/60);
		difference -= hoursDifference*1000*60*60
		var minutesDifference = Math.floor(difference/1000/60);
		difference -= minutesDifference*1000*60
		var secondsDifference = Math.floor(difference/1000);
		return hoursDifference + ":" + minutesDifference + ":" + secondsDifference
	}
	

	

	