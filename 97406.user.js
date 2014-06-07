// ==UserScript==

// @name           Farming Machine

// @author         Black_Blood (Update from ScratchZ)

// @namespace	   FM

// @description    Updated version of Farming Machine

// @include        http://*.travian.*/build.php?*gid=16*

// @include        http://*.travian.*/build.php?*id=39*

// @include        http://*.travian.*/a2b.php*

// @include        http://*.travian.*/karte.php*

// @include        http://*.travian.*/berichte.php*

// @include        http://*.travian.*/login.php

// @include        http://*.travian.*/

// @include        http://*.travian.*/dorf1.php

// @exclude        http://forum.travian.*

// @version        1.6.1

// ==/UserScript==


var SCRIPT = {
	url : 'http://userscripts.org/scripts/source/79484.user.js',
	version : '1.6.1' //same value as @version
};


//Adapt these variables to your personal need:

//Message Window config

var messageWindowTop = 450;		//0 means top of the browser window

var messageWindowLeft = 700;	        //0 means left most point of the browser window

var zIndex = 100;		        //Make it as big as you want to put the message window over top of anything

//Waiting times

var minWait = 500; 			//Don't make it smaller then 5000ms!

var maxWait = 1 * minWait;

//Skipping villages

var maxSkipCount = -1;			//Max. Number for skipped farms before changing villages, make it -1 to try the whole list


//Map
//FarmImage by Black_Blood
var farmImage = "http://img706.imageshack.us/img706/5794/d22.gif";

//Default troops
var defTroops = "5,0,0,0,0,0,0,0,0,0,0";

//DynamicTroopCount variables
var minimumTroopCount = 2;
var minimumEfficiency = 50;


//Logging

var logLevel = 0;			//You probably don't need to change this


/* Log Levels:

 * 0: no special logging (logs general stuff)

 * 1: log for testing level1

 * 2: log for testing level2

 * 3: logs calls of all functions

 * 4: logs steps inside of functions

 * 5: logs values inside of functions

 */



//Global variables (Don't changes these)

var dom = new DOMUtils();

var server = location.hostname;

var rootPath = "http://" + server + "/";

var suffixLocal, suffixGlobal;

var lang = new Array();			//Language definitions

var image = new Array();		//All images used

var farmList = new Array();		//Complete farm List

var fque = new Array();			//Farm queue

var prioque = new Array();		//Priority queue

var user_race = 1;			//Default Romans

var globalInt = -1;

var totalTroops = new Array();	        //For temporary value passing between functions

var runningDiv;

var random;				//Random farming

var priorityAttack = false;

var vT35;



var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;

var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;

var XPListO = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

var XPIter = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;



//FM main functions

function main() {

	FM_log(3,"main() called");

	suffixGlobal = server + '_' + getPlayerId();

	suffixLocal = suffixGlobal + '_' + getActiveVillageId();

	

	FM_log(3,"suffixGlobal is: "+suffixGlobal);

	FM_log(3,"suffixLocal is: "+suffixLocal);

	

	//Define Travian 3.6 Version

	getT35version();

	

	FM_log(5,document.URL);

	var html = document.body.innerHTML; // In case 'Unable to load site' is showed, try to Refresh the page.

	if (html.indexOf(" <!-- ERROR ITEM CONTAINER") != -1) {

		window.location.replace(rootPath + "a2b.php"); 

	}

		

	if (GM_getValue("Active_" + suffixGlobal, -1) > -1  && GM_getValue("ReadRep_" + suffixGlobal, -1)==1 )

	{

		newreport = document.getElementsByTagName('html')[0].innerHTML.indexOf('id=\"n5\" class=\"i1\"')+document.getElementsByTagName('html')[0].
        innerHTML.indexOf('id=\"n5\" class=\"i3\"');

		if ( newreport != -2) 

		{

			if(document.URL.indexOf("berichte.php") == -1) {

				window.open("/berichte.php", "_self");

			}

			checkreports();

			return;

		}

	}

	

	// Start countdown and forward to rallypoint if FM is active
	
	// This is not working because FM script not runs on all the Travian pages
	// Could be working if @includes get changed, but this probably leads to a slow browser
	

	/*

	if (GM_getValue("Active_" + suffixGlobal, -1) > -1)

	{

		//alert("waiting");

		setTimeout(function(){window.open("/a2b.php","_self");}, 60000); //wait 1 minute then go back to rally point

	}

	*/

		

	// Get variable for random farming

	random = GM_getValue("RandomFarming_" + suffixGlobal, 0);

	

	FM_log(3,"Setting language, images & style");

	setLanguage();

	loadImage();

	loadStyle();

	var url = document.URL;

	url = url.substring(url.lastIndexOf("/") + 1);

	user_race = GM_getValue('Tribe_' + suffixGlobal, -1);

	if (user_race != -1) {

		user_race = GM_getValue('Tribe_' + suffixGlobal, 0);

		user_race = parseInt(user_race);

	} else {

		if (url.indexOf("a2b.php") != -1) {

			user_race = 1 + 10 * getPlayerTribe();

			GM_setValue('Tribe_' + suffixGlobal, user_race);

			alert(T('SCRIPT_NAME') + " Installation complete\n"

					+ T('INSTALL_M1') + "\n" + T('INSTALL_M2') + " \nBlack_Blood");

			window.location.replace(rootPath + "build.php?id=39"); //ToDo: Reload

		} else {

			window.location.replace(rootPath + "a2b.php"); //ToDo: Reload

		}



	}

	

	// Set default values if not defined yet

	if (GM_getValue("Maximize_" + suffixGlobal, false) === false) {

		GM_setValue("Maximize_" + suffixGlobal, 1);

	}

	if (GM_getValue("MaximizeSettings_" + suffixGlobal, false) === false) {

		GM_setValue("MaximizeSettings_" + suffixGlobal, 0);

	}

	if (GM_getValue("StartIndex_" + suffixLocal, false) === false) {

		GM_setValue("StartIndex_" + suffixLocal, 0);

	}

	if (GM_getValue("EndIndex_" + suffixLocal, false) === false) {

		GM_setValue("EndIndex_" + suffixLocal, -1);

	}

	if (GM_getValue("Skipcounter_" + suffixGlobal, false) === false) {

		GM_setValue("Skipcounter_" + suffixGlobal, 0);

	}

	

	//Settings
	if (GM_getValue("RandomFarming_" + suffixGlobal, false) == false) {
	
		GM_setValue("RandomFarming_" + suffixGlobal, 0);
	}

	if (GM_getValue("farmMarking_" + suffixGlobal, false) === false) {

		GM_setValue("farmMarking_" + suffixGlobal, 0);

	}

	if (GM_getValue("VillageSkipping_" + suffixGlobal, false) === false) {

		GM_setValue("VillageSkipping_" + suffixGlobal, 0);

	}

	if (GM_getValue("DelTList_" + suffixLocal, false) === false) {

		GM_setValue("DelTList_" + suffixLocal, 1);

	}

	if (GM_getValue("ReadRep_" + suffixLocal, false) === false) {

		GM_setValue("ReadRep_" + suffixLocal, 0);

	}	
	if (GM_getValue("DynamicTroopCount__" + suffixLocal, false) === false) {

		GM_setValue("DynamicTroopCount__" + suffixLocal, 1);

	}	

	

	// Setting Travian Version

	if (GM_getValue("TravianVersion_" + suffixGlobal, false) === false) {

		GM_setValue("TravianVersion_" + suffixGlobal, 0);

	}

	

	//Insert village selector

	rp_villageSelector();

	//Alert (url);

	if (url.indexOf("build.php?") > -1 && (url.indexOf("gid=16") > -1 || url.indexOf("id=39") > -1)) {

		if (isReallyRallyPoint()) {

			rp_mainPage();

		}

		activeMain();

	} else if (url.indexOf("a2b.php") > -1) {

		activeMain();

	} else if (url.indexOf("karte.php?") > -1 && url.indexOf("d=") > -1

			&& url.indexOf("c=") > -1) { //If user profile page

		foundNewFarm();

	} else if (url.indexOf("berichte.php") > -1) {

		// If no messages there, return to rally point

		newreport = document.getElementsByTagName('html')[0].innerHTML.indexOf('id=\"n5\" class=\"i1\"')+document.getElementsByTagName('html')[0]. innerHTML.indexOf('id=\"n5\" class=\"i3\"');

		if ( newreport == -2 && GM_getValue("Active_" + suffixGlobal, -1) > -1) 

		{

			window.open("/build.php?id=39", "_self");

			return;

		}

	}

	

	// Farm marking in the map

	if (url.indexOf('karte.php')>-1 && url.indexOf('karte.php?d=')==-1 && GM_getValue("farmMarking_" + suffixGlobal, 0)==1)

	{

				// Get center village

				var mapX = dom.get('x').textContent;

				var mapY = dom.get('y').textContent;

				

				FM_log(4,"CenterCoords="+mapX+","+mapY);

				

				GM_setValue("MapCenter_"+suffixGlobal,mapX+","+mapY);

				

				// Look for arrow buttons

				var ex = "//area[contains(@id,'ma_n')]";

				tag = document.evaluate(ex,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

				

				FM_log(4,"adding eventListener");

				

				for(var i=1; i<=tag.snapshotLength;i++)

				{

					var arrowButton = tag.snapshotItem(i-1);

					// Call function to check again after listener was activated

					FM_log(4,"arrowId="+arrowButton.id);

					

					arrowButton.addEventListener("click", function (e){

						var evt = e || event;

						var ele = evt.target || evt.srcElement;

						setTimeout(function(){getXYtoFarms(ele.id);},500);

						

						}, true); // So that it will check again when scrolling.

						

				}

				getXYtoFarms("")

	}

}

function activeMain() {

	FM_log(3,"activeMain() called");

	if (GM_getValue("Active_" + suffixGlobal, -1) > -1) {

		FM_log(4,"FM is active");

		GM_addStyle("body { color:black; }");

		drawMessageBox();

		var messageStr = "", acVillageFlag = true, titleStr = "";

		var currentVillageId = getActiveVillageId();

		if (isFarmerVillage(currentVillageId)) {

			if (farmList == null || farmList.length == 0) {

				farmList = GM_getValue("FarmList_" + suffixLocal, "").split(">:)");

			}

			var sIndex = getStartIndex();

			FM_log(4,"activeMain sIndex="+sIndex);

			var eIndex = getEndIndex();

			

			//Teuton Mod Code (M4rtini)

			fque = GM_getValue('farmqueue'+ suffixLocal, '');

			if (fque == null || fque.length == 0 || fque.indexOf('>:)') == -1)

			{

				//Alert("neue liste");

				fque = new Array();

				x = 0;

				if(eIndex == -1) //No eIndex set

				{ // First fill from sIndex to end, then add from beginning to sIndex

					for (var i = sIndex; i < farmList.length; i++)

					{

						fque[x] = farmList[i];

						x++;

					}

					for (var i = 0; i < sIndex; i++)

					{

						fque[x] = farmList[i];

						x++;

					}

				}else if(eIndex <= farmList.length){ //Fill in between sIndex and eIndex

					for (var i = sIndex; i <= eIndex; i++)

					{

						fque[x] = farmList[i];

						x++;

					}

				}else if(eIndex <= sIndex){ //Fill to the End and then from the beginning to eIndex

					for (var i = sIndex; i < farmList.length; i++)

					{

						fque[x] = farmList[i];

						x++;

					}

					for (var i = 0; i < eIndex; i++)

					{

						fque[x] = farmList[i];

						x++;

					}

				}

			  

				//Removing all inactives.

				for (var i=0; i < fque.length;i++)

				{

					temp = fque[i].split('|');

					if(temp[7] != 'true')

					{

						fque.splice(i,1); //Removes from array

					}

				}

				 

				if(random==1) {

					fque.sort(randOrd);

					fque.sort(randOrd);

					fque.sort(randOrd);

					fque.sort(randOrd);

				}

				//Alert(fque.join('>:)'));

				GM_setValue('farmqueue'+ suffixLocal,  fque.join('>:)'));

			}else{ //Fque already existing

				fque = fque.split('>:)');

			}

			

			// End Teuton Mod

			

			if (eIndex >= farmList.length) {

				GM_setValue("EndIndex_" + suffixLocal, -1);

			}



			var doneHere = GM_getValue("DoneHere_" + suffixLocal, 0);

			

			if (fque == "" || fque.length == 0 || doneHere == 1) {

				titleStr = T("NO_FARM");

				messageStr = T('CHANGE_VILLAGE');

				setTextMessage(titleStr, messageStr);

				acVillageFlag = false;

			} else {

				if (sIndex < farmList.length) {

					setAttackMessage();

				} else {

					titleStr = T("Error");

					messageStr = T('CHANGE_VILLAGE');

					setTextMessage(titleStr, messageStr);

					changeVillage();

					return;

				}

			}

		} else {

			titleStr = T('NOT_FARMER');

			messageStr = T('CHANGE_VILLAGE');

			acVillageFlag = false;

			setTextMessage(titleStr, messageStr);

		}

		if (acVillageFlag) {

			var url = document.URL;

			url = url.substring(url.lastIndexOf("/") + 1);

			if (url == "a2b.php") { //Ready to fill out form

				setTimeout(function(){sendtroops();},Random()/2);

			} else { //Changing to the send troops form

				setTimeout("window.location.replace('" + rootPath + "a2b.php')",Random() / 2);

			}

		} else {

			changeVillage();

		}

	}

}

function rp_mainPage() {

	FM_log(3,"rp_mainPage() called");

	if (GM_getValue("Active_" + suffixGlobal, -1) > -1) {

		setTimeout("window.location.replace('" + rootPath + "a2b.php')",

				Random());

	} else {

		insertEditFarmBox();

		//Now Add eventlistener for the save button

		dom.get("FMsaveButton")

				.addEventListener('click', saveEditedFarm, false); //Add eventlistener

		

		var container = dom.get("content");

		var newP = dom.cn("p");

		newP.id = "FMtitle";

		newP.innerHTML += '<b>Farming Machine</b>';

		container.appendChild(newP);

		//Insert a new table

		

		rp_insertTable();

	}

}

function rp_villageSelector() { //Adds Village checkboxes

	FM_log(3,"rp_villageSelector() called");

	

	//Get Travian Version

	vT35 = GM_getValue("TravianVersion_" + suffixGlobal, false);


	var vTableExp = "//a[contains(@href,'newdid')]/ancestor::td/ancestor::tr/ancestor::tbody";



	var vTable = dom.find(vTableExp, XPFirst);


	if (vTable != null && vTable.firstChild != null) {

		for (var i = 1; i < vTable.childNodes.length; i++) {


			var search = /\n?\((.*)\n?\s*\|\s*\n?(.*)\)\n?/;


			var resultxy = search.exec(vTable.childNodes[i].textContent);


			var X = resultxy[1];

			var Y = resultxy[2];



			
			var vid = xy2id(X, Y);


			var newdid = getParamFromUrl(vTable.childNodes[i].getElementsByTagName("a")[0].getAttribute("href"),"newdid");

			var checkButton = createInputButton("checkbox", i);

			checkButton.id = "vcb_" + vid + "~" + newdid;

			if (isFarmerVillage(vid)) {

				checkButton.checked = true;


			}

			if (GM_getValue("Active_" + suffixGlobal, -1) > -1) {

				checkButton.disabled = true;


			} else {

				checkButton.addEventListener("click", function(event) {

							villageCheckBox(event)

						}, false);


			}

			

			if(vT35==1) {

				FM_log(4,"old code version");

				var newCol = dom.cn("td");

				newCol.appendChild(checkButton);

				vTable.childNodes[i].appendChild(newCol);

			} else if (vT35==2) {

				FM_log(4,"new code version");

				var vilExp = vTableExp+"/tr["+(i)+"]/td[contains(@class,'dot')]";

				dom.xs(vilExp).textContent = "";

				dom.xs(vilExp).appendChild(checkButton); 

			} else {

				FM_log(0,"could not attach villagecheckbox - unknown Travian Version");

			}

		}

	}

}

function sendtroops() {

	FM_log(3,"sendtroops() called");

	prioque = GM_getValue('priorityqueue'+ suffixLocal, '').split('>:)');

	fque = GM_getValue('farmqueue'+ suffixLocal, '').split('>:)');

	

	//Get Travian Version

	vT35 = GM_getValue("TravianVersion_" + suffixGlobal, false);

	

	if (prioque.length >= 1 && prioque[0].length > 2)

	{

		FM_log(4,"priority attack");

		var arr = prioque[0].toString().split("|");

		attackList = prioque;

		priorityAttack = true;

	}else{

		var arr = fque[0].toString().split("|");

		attackList = fque;

		priorityAttack = false;

	}

	

	xy = arr[0].split(",");

	var sIndex = getSindexFromXY(xy[0],xy[1], suffixLocal);

	var eIndex = getEndIndex();

		

	var notFoundHtml = (dom.get("content")).innerHTML;

	var formNode = dom.get("content").innerHTML, titleStr = "", messageStr = "";

	var attackCount = GM_getValue("Active_" + suffixGlobal, 0);

	

	if(vT35==1) {

		var searchStr = "<div class=\"f10 e b\">";

		var searchExp = "//div[@class='f10 e b']";

	} else if (vT35==2) {

		var searchStr = "<p class=\"error\">";

		var searchExp = "//p[@class='error']";

	}

	

	if (notFoundHtml.indexOf(searchStr) > -1) { //Village not found or player bannded

		farmSetInactive(sIndex, suffixLocal); // Got error on this farm so set it inactive

		

		if (sIndex == eIndex) {

			GM_setValue("DoneHere_" + suffixLocal, 1);

		}

		

		errText = dom.xs(searchExp).textContent;

		

		FM_log(4,"errText="+errText);

		

		titleStr = T("Error") + " :";

		messageStr = errText + "<br>" + T('NEXT_FARM');

				

		setTextMessage(titleStr, messageStr);

		

		removefromque(priorityAttack); //Remove the farm from the attack queue.

		setTimeout("window.location.replace('" + rootPath + "a2b.php')",Random());

		

	} else if (sIndex < farmList.length) { // No error message from travian and inside farmList

		if(arr[3]=="pixelgeek") {

			farmSetInactive(sIndex, suffixLocal); // Got error on this farm so set it inactive

			if (sIndex == eIndex) {

				GM_setValue("DoneHere_" + suffixLocal, 1);

			}

			titleStr = T("Error") + " :";

			messageStr = "...<br>" + T('NEXT_FARM');

			setTextMessage(titleStr, messageStr);

			

			removefromque(priorityAttack); //Remove the farm from the attack queue.

			

			setTimeout("window.location.replace('" + rootPath + "a2b.php')",Random());

			

		} else {

			if (formNode.indexOf("kid") > -1) { //Confimation page

				var e = document.getElementsByTagName('form');

				e[0].submit(); //Submit done

				GM_setValue("Active_" + suffixGlobal, attackCount + 1);

				

				if(GM_getValue("RandomFarming_" + suffixGlobal, 1)==0 && priorityAttack==false) {

					//Keep all villages in the list for making it the same as the inital version of FM

					makelastinque(priorityAttack);

				} else {

					//If prioattack or random farming, this farm needs to be removed from the list

					removefromque(priorityAttack);

				}

				

				titleStr = T('TROOPS_GONE') + ":";

				messageStr = "[" + sIndex + "] " + E2C(arr[3]) + " : "

						+ E2C(arr[5]) + "<b>(" + arr[0] + ")</b>";

				setTextMessage(titleStr, messageStr);

				if (sIndex == eIndex) {

					GM_setValue("DoneHere_" + suffixLocal, 1);

				}

			} else { //Filling out the form & sending troops

				setAttackMessage();

				var i;

				if (arr[7] == "true") {

					FM_log(4,"checking if there are enough troops");

					var xy = arr[0].split(",");

					var troopsCount = arr[1].split(",");

					var random = GM_getValue("RandomFarming_" + suffixGlobal, 0);

					var skipcounter = GM_getValue("Skipcounter_" + suffixGlobal, 0);

					var availableTroops = new Array();

					//Find all the available troops

					//Alert(getNumber(formNode.substr(formNode.lastIndexOf("t1.value"))));

					for (i = 1; i < 11; i++) {

						var tt = "t" + i + ".value";

						availableTroops.push(getNumber(formNode.substr(formNode

								.lastIndexOf(tt))));

					}

					for (i = 0; i < troopsCount.length; i++) {

						if (parseInt(availableTroops[i]) < parseInt(troopsCount[i])) {

							FM_log(4,"not enough troops");

							titleStr = T("Error") + " :";

							tIndex = getSindexFromXY(arr[0].split(",")[0],arr[0].split(",")[1], suffixLocal)

							messageStr = T('NOT_ENOUGH') + ":<br>["+tIndex+"] " + E2C(arr[3]) + " : " + E2C(arr[5])

									+ "<b>(" + arr[0] + ")</b><br>"


									+ T("Available") + ": <b>" + availableTroops[i]

									+ "</b> " + T("Needed") + ": <b>"

									+ troopsCount[i] + "</b>";

							setTextMessage(titleStr, messageStr);

							

							//Move village to the latest position and continue with next village

							//Only if skipvillage is activated

							if(GM_getValue("VillageSkipping_" + suffixGlobal, 0)==1) {

								FM_log(4,"moving village to the end of list");

								makelastinque(priorityAttack);

							}

														

							//Add one unsuccessfull count to the skipcounter

							skipcounter++;

							

							GM_setValue("Skipcounter_" + suffixGlobal, skipcounter);

														

							FM_log(5,"Skipcounter="+skipcounter);

							FM_log(5,"attackList Length="+attackList.length);

							

							//If all farms were unsuccessfully, change village otherwise continue trying

							

							if(maxSkipCount < 1) {

								maxSkipCount = attackList.length;

							}

							if(maxSkipCount > attackList.length) {

								maxSkipCount = attackList.length;

							}

							

							FM_log(5,"maxSkipcount="+maxSkipCount);

							

							if (skipcounter >= maxSkipCount )

							{						

								changeVillage();

							}else{

								setTimeout("window.location.replace('" + rootPath + "a2b.php')",Random());

								if(GM_getValue("VillageSkipping_" + suffixGlobal, 0)==1) { //Only display message, when it's really skipping to next farm

								messageStr = T('NEXT_FARM');

								setTextMessage("", messageStr);

								}

								setTimeout(function(){sendtroops}, 2000);

							}							

							

							return;

						}

					}



					var theForm = document.forms.namedItem("snd");

					for (i = 1; i < 12; i++) {

						theForm.elements.namedItem("t" + i).value = troopsCount[i-1];

					}

					dom.find("//input[@name='c' and @value='" + arr[8] + "']",

							XPFirst, theForm).checked = true;

					//theForm.elements.namedItem('c').value = 3;

					theForm.elements.namedItem('x').value = xy[0];

					theForm.elements.namedItem('y').value = xy[1];

					//All set.. submit

					//Reset skipcounter, because a village was successfully attacked

					FM_log(3,"Successfully send troops > skipcounter = 0");

					GM_setValue("Skipcounter_" + suffixGlobal, 0);

					setTimeout(function(){theForm.submit()}, Random());

				} else { //Farm not active

					titleStr = T('FARM_INACTIVE') + ":";

					messageStr = E2C(arr[3]) + " : " + E2C(arr[5]) + "<b>(" + arr[0] + ")</b>";

					setTextMessage(titleStr, messageStr);

					

					//alert("Farm inactiv: removing it");					

					removefromque(priorityAttack);

					setTimeout("window.location.replace('" + rootPath + "a2b.php')",Random());

					

					setTimeout(function(){sendtroops}, 2000);

					return;

				}

			}

		}	

	} else {

		messageStr = T('CHANGE_VILLAGE');

		setTextMessage(titleStr, messageStr);

		changeVillage();

	}

}

function markFarm(x, y) {

	FM_log(1,"markFarm("+x+","+y+") called");

	//farm coords

	var x = parseInt(x);

	var y = parseInt(y);



	var id = (x + 401) + ((400 - y) * 801);

		

	//Get map center

	var centerCoords = GM_getValue("MapCenter_"+suffixGlobal,"");

	if(centerCoords!="") {

		centerCoords = centerCoords.split(',');

		FM_log(4,"stored coords:"+centerCoords[0]+","+centerCoords[1]);

	} else {

		FM_log(4,"no center coords stored");

		return;

	}

	

	var centerX = parseInt(centerCoords[0]);

	var centerY = parseInt(centerCoords[1]);

	

	//Get map size

	//var ex = "//area[contains(@href,'d=')][contains(@id,'a_')]";

	var ex = "//div[contains(@id,'i_')]";

	var tag = dom.xo(ex);

	

	mapSize = Math.floor(Math.sqrt(tag.snapshotLength));

	FM_log(2,"mapSize="+mapSize);

	

	mapCenterX = (mapSize-1)/2;

	mapCenterY = (mapSize-1)/2;

	FM_log(4,"mapCenterXY="+mapCenterX+","+mapCenterY);

	mapOffsetX = mapCenterX - 3;

	mapOffsetY = mapCenterY - 3;

	

	

	mapOffsetX = 0;

	mapOffsetY = 0;

	

	//Create coordinates for each cell and compare

	for(var i=0; i<mapSize; i++) {

		//calculate X-Offset to Center

		offX = i - mapCenterX;

		FM_log(4,"offX="+offX);

		//Calculate tCoorX

		tCoorX = centerX + offX + mapOffsetX;

		for(var j=0; j<mapSize; j++) {

			//calculate Y-Offset

			offY = j - mapCenterY;

			FM_log(4,"offY="+offY);

			//calculate tCoorY

			tCoorY = centerY + offY + mapOffsetY;

			FM_log(4,"tCoords="+tCoorX+"/"+tCoorY);

			//compare to farm coords

			//FM_log(2,"compare X="+tCoorX+"/"+x);

			//FM_log(2,"compare Y="+tCoorY+"/"+y);

			if(tCoorX==x && tCoorY==y) {

				var exArea = "//div[@id='i_"+i+"_"+j+"']";

				FM_log(2,"exArea="+exArea);

				tag2 = dom.xs(exArea);

				//tag2.innerHTML = "<div class=\"isfarm\"> </div>";

				tag2.setAttribute("class","isfarm");

				//return;

			}

			

		}

	}

}

function farmSetInactive(index, suffix) {

	FM_log(3,"farmSetInactive("+index+","+suffix+") called");

	var fList = GM_getValue("FarmList_" + suffix, "").split(">:)");

	var newfList = "";

	var i, j;

	if (index < fList.length) {

		for (i = 0; i < fList.length; i++) {

			if (i)

				newfList += ">:)";

			if (i == index) {

				var arr = fList[i].split("|");

				arr[7] = "false";

				for (j = 0; j < arr.length; j++) {

					if (j)

						newfList += "|";

					newfList += arr[j];

				}

			} else {

				newfList += fList[i];

			}

		}

		GM_setValue("FarmList_" + suffixLocal, newfList);

	}

}

function farmAddRemoveOne(index, suffix,add) {

	FM_log(2,"farmAddOne("+index+","+suffix+") called");
FM_log(2, "suffix:"+ suffix +" SuffixLocal:"+ suffixLocal);
	var fList = GM_getValue("FarmList_" + suffix, "").split(">:)");

	var newfList = "";

	var i, j;

	if (index < fList.length) {

		for (i = 0; i < fList.length; i++) {

			if (i)

				newfList += ">:)";

			if (i == index) {

				var arr = fList[i].split("|");
				//FM_log(2, arr[1]);
				troops = arr[1].split(',')
				//FM_log(2,troops);
				
					for (var x in troops) {
							if(add && parseInt(troops[x]) != 0){
								troops[x]++;
								break;
							}else if( parseInt(troops[x]) != 0 && parseInt(troops[x]) > minimumTroopCount){
								troops[x]--;
								break;
							}

					}
				
				arr[1] = troops.join(',');
				//FM_log(2,arr[1]);
				for (j = 0; j < arr.length; j++) {

					if (j)

						newfList += "|";

					newfList += arr[j];

				}

			} else {

				newfList += fList[i];

			}

		}
		GM_setValue("FarmList_" + suffix, newfList);

	}

}

function changeVillage() {

try{

	FM_log(3,"changeVillage() called");

	GM_setValue("Skipcounter_" + suffixGlobal, 0);

	//clear farmque, because all the other farms are already tried...

	if(maxSkipCount==-1 && GM_getValue("RandomFarming_" + suffixGlobal, -1)==1) {

		clearque();

	}

	var vList = GM_getValue("FarmerVillages_" + suffixGlobal);

	var newList = new Array();

	var i, pause, messageStr = "";

	if (vList != null && vList != "") {

		vList = vList.toString().split(",");

		if (vList.length > 0) {

			var activeVId = getActiveVillageId();

			for (i = 0; i < vList.length; i++) {

				var ids = vList[i].split('~')[0];

				if (GM_getValue("DoneHere_" + suffixGlobal + "_" + ids, 0) == 0

						&& ids != activeVId) {

					newList.push(vList[i]); //only taking villages which is not current village and also not done

				}

			}

		}

	}



	random = GM_getValue("RandomFarming_" + suffixGlobal, 0);

	

	if (newList.length == 0) { //Village Change is not possible, Engine is pause for X sec

		//if there are other villages, reactivate these, otherwise stay in this village		

		if (vList == "" || vList == null) {

			//no farmer village! so set the current village a farmer, important for single village account

			GM_setValue("FarmerVillages_" + suffixGlobal, getActiveVillageId()

							+ "~-1"); //no newdid

			vList = GM_getValue("FarmerVillages_" + suffixGlobal, "");

		}

		FM_log(4,"Reseting all doneHeres");

		//reset DoneHere for all selected village

		var arr = vList.toString().split(",");

		FM_log(4,"number of villages="+arr.length);

		for (var i = 0; i < arr.length; i++) {

			arr[i] = arr[i].split("~");

			FM_log(4,"villageId="+arr[i][0]);

			GM_setValue("DoneHere_" + suffixGlobal + "_" + arr[i][0], 0);

		}

		

		pause = Random();

		messageStr = T('NO_VILLAGE') + " " + T('WAITING') + " <b> "

				+ Math.floor(pause / 1000) + "</b> " + T('SEC') + " "

		setTextMessage("", messageStr);

		setTimeout("window.location.replace('" + rootPath + "a2b.php')", pause);

	} else {

		//In case of random iteration we come up to this point because sIndex was bigger then farmList length

		//before we leave this village we have to ensure that when we came back to this village we got the sIndex is in between farmlist length

		var sIndex = 0;

		if (random == 1 && farmList != null && farmList.length > 0) {

			sIndex = Random(0, farmList.length - 1);

			GM_setValue("StartIndex_" + suffixLocal, sIndex); //by force set it inside

		}

		//select a village randomly from the active villages

		i = Random(0, newList.length - 1);

		newList[i] = newList[i].split('~');

		var coord = id2xy(newList[i][0]);

		pause = Random();

		messageStr = T('SWITCH_V') + ": (" + coord.x + "|" + coord.y + "), "

				+ T("after") + " " + Math.floor(pause / 1000) + " " + T("sec");

		setTextMessage("", messageStr);

		setTimeout("window.location.replace('" + rootPath + "a2b.php?newdid="+ newList[i][1] + "')", pause);

	}

} catch(error) {

	FM_log(0,"changeVillage(): change not successfull");

}

}

function foundNewFarm() {

	FM_log(3,"foundNewFarm() called");

	insertEditFarmBox();

	var tribe = getFPlayerTribe().toUpperCase();
	var tribeG=T('GAUL').toUpperCase();

	if (tribe ==tribeG) {

		dom.get("radio3").checked = true; //default attack for gauls

	} else {

		dom.get("radio4").checked = true; //default raid for other

	}

	dom.get('FMsaveButton').addEventListener('click', addNewFarm, true);

    var tbody = dom.xs("//a[contains(@href,'karte.php')]/parent::td/parent::tr/parent::tbody");

	if (tbody == null || tbody == "")

		return;

		

	/*

	Trying to mark already added villages

	*/

	// getting coordinates

	testCoord = getFVillageCoords();	

	// checking if already existing

	if(isFarm(testCoord.split(',')[0],testCoord.split(',')[1])) {

		var addOption = createLinkButton('<font style="color: #cd0000;">'+'\u00BB' + " " + T("Add_To") + " "

						+ T('SCRIPT_NAME') + "<\/font>", T("Add_As"), showPopupFarmEditBox);

	} else {

		var addOption = createLinkButton('\u00BB' + " " + T("Add_To") + " "

						+ T('SCRIPT_NAME'), T("Add_As"), showPopupFarmEditBox);

	}

	

	/* original Code

	var addOption = createLinkButton('\u00BB' + " " + T("Add_To") + " "

					+ T('SCRIPT_NAME'), T("Add_As"), showPopupFarmEditBox);

	*/

		

	var row = dom.cn('tr');

	var cell = dom.cn('td');

	cell.appendChild(addOption);

	row.appendChild(cell);

	tbody.appendChild(row);



}

function addNewFarm() {

	FM_log(3,"addNewFarm() called");

	var formDiv = dom.get("popupFarmEditBox");

	var inputTag = formDiv.getElementsByTagName("input");

	var troopConfig = "", attackType, activeBool, i;
	

	for (i = 0; i < inputTag.length; i++) {

		if (i < 11) {

			if (i)

				troopConfig += ",";

			if (inputTag[i].value == "" || inputTag[i].value == null)

				inputTag[i].value = 0;

			troopConfig += parseInt(inputTag[i].value);

		} else {

			if (inputTag[i].getAttribute("type") == "radio"

					&& inputTag[i].checked) {

				attackType = inputTag[i].value;

			} else if (inputTag[i].getAttribute("type") == "checkbox") {

				activeBool = inputTag[i].checked;

			}

		}

	}

	//alert(troopConfig+"|"+attackType+"|"+activeBool);

	

	var coords = getFVillageCoords();

	var tribe = getFPlayerTribe();

	var fPlayerName = getFPlayerName();

	var fPlayerId = getFPlayerId();

	FM_log(3,"getFVillageName");

	var fVillageName = getFVillageName();

	//alert(fVillageName);

	FM_log(3,"getCvalue");

	var cValue = getCvalue();

	FM_log(3,"window confirm");

	if (window.confirm(T('ADD_FARM') + ": " + fVillageName + " (" + coords

			+ ")" + "\n" + T('TROOP_CONFIG') + ": \"" + troopConfig + "\"\n"

			+ T('CONFIRM') + "?")) {

		addList(coords + "|" + troopConfig + "|" + C2E(tribe) + "|"

				+ C2E(fPlayerName) + "|" + C2E(fPlayerId) + "|"

				+ C2E(fVillageName) + "|" + cValue + "|" + activeBool + "|"

				+ attackType);

		//alert("New Farm Added: "+fVillageName+"("+coords+") :)");

		hidePopupFarmEditBox();

	}

	FM_log(3,"New Farm Add done");

}

function addList(dataStr) {

	FM_log(3,"addList() called");

	var oldList = GM_getValue("FarmList_" + suffixLocal, "") + " ";

	oldList = trim(oldList);

	if (oldList != "") {

		oldList += ">:)";//evil face

	}

	oldList += dataStr; //now it is actually new list ;)

	GM_setValue("FarmList_" + suffixLocal, oldList);



}

function randOrd(){ //randomize for farmque

	return (Math.round(Math.random())-0.5);

} 

function removefromque(prioattack) { //remove farm from farmque or prioque

	FM_log(3,"removefromque() called");

	if(prioattack)

	{

		prioque.shift();

		GM_setValue('priorityqueue'+ suffixLocal,  prioque.join('>:)'));

	}else{

		fque.shift();

		GM_setValue('farmqueue'+ suffixLocal,  fque.join('>:)'));

	}



}

function makelastinque(prioattack) {

	FM_log(3,"makelastinque() called");

	if(prioattack)

	{

		if (prioque.length > 1)

		{	  

			info = prioque.shift();

			prioque.push(info);

			//alert("make last: " + prioque.join('>:)'));

			GM_setValue('priorityqueue'+ suffixLocal,  prioque.join('>:)'));

		}else{

			//only one in the list so there is no need to change position

		}

	}else{

		if (fque.length > 1)

		{

			info = fque.shift();

			fque.push(info);

			//alert(fque.join('>:)'));

			GM_setValue('farmqueue'+ suffixLocal,  fque.join('>:)'));

		}else{

			//only one in the list so there is no need to change position

		}

	}

}

function addtoprio(info, vilId) { //add farm to prioque

	FM_log(0,"addtoprio("+info+","+vilId+" called");

	suffixGlobal = server + '_' + getPlayerId();

	suffixLocal = suffixGlobal + '_' + vilId;

	prioque = GM_getValue('priorityqueue'+ suffixLocal, '') + " ";

	prioque = trim(prioque);

	if (prioque != "")	{

		prioque += ">:)";

	}

	prioque += info;

	//alert(prioque);

	GM_setValue('priorityqueue'+ suffixLocal,  prioque);

}

function clearque() { //delete farmque / prioque

	FM_log(3,"clearque() called");

	var vListID = getAllVillageId().toString();

	FM_log(4,"vListID="+vListID);

	var temptemp = vListID.split(",");

	

	//alert(temptemp.length);

	

	for(var i=0; i<temptemp.length;i++)

	{

		//alert(temptemp[i]);

		GM_setValue('farmqueue'+ suffixGlobal + '_' + temptemp[i], '');

		GM_setValue('priorityqueue'+ suffixGlobal + '_' + temptemp[i], '');

	}

	FM_log(4,"Farmqueue cleared");

}

function checkreports() { //Analyze new reports

	FM_log(3,"checkreports() called");

	

	FM_log(3,"Setting language, images & style");

	setLanguage();

	loadImage();

	loadStyle();

	drawMessageBox();

	

	setTextMessage("Checking reports", "Opening report");

	

	url = document.URL;

	pulled = document.createElement('div');



	if ( (url.indexOf("berichte.php") != -1 && url.indexOf("berichte.php?") == -1) || url.indexOf("berichte.php?s=") != -1) {

		ex = "//td/div/a[contains(@href,'berichte.php?')]/parent::*";

		ex2 = "//td/div/a[contains(@href,'berichte.php?id=')]";

		tag = document.evaluate(ex,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		
        //alert(tag);
        
       	totReports = find(ex2,XPList);
       	
       	for(i=totReports.snapshotLength-1;i>=0;i--){

			pulled.innerHTML = tag.snapshotItem(i).innerHTML;

			attackreporturl = pulled.getElementsByTagName('a')[0].href;

			endofA = tag.snapshotItem(i).innerHTML.indexOf("</a>");

			testIndex = tag.snapshotItem(i).innerHTML.indexOf("(",endofA); // check if line is a new report

			if (testIndex != -1 && endofA < testIndex) {
				//save url

				GM_setValue("lastreportpage_"+suffixGlobal, url);

				FM_log(4,"attrepurl="+attackreporturl);

				//window.open(attackreporturl, "_self");

				setTimeout("window.location.replace('" + attackreporturl + "')", 500);

				break;

			}

		}



		if (i==-1){ // all reports from this page done, switching to next page

			newreport = document.getElementsByTagName('html')[0].innerHTML.indexOf('id=\"n5\" class=\"i1\"') + document.getElementsByTagName('html')[
0].innerHTML.indexOf('id=\"n5\" class=\"i3\"');

			if ( newreport == -2 || url.indexOf("berichte.php?s=1000") != -1) {

				//no more reports to read, going back to attacks

				setTextMessage("Checking reports", "No more reports to read<br/>Going back to rally point")
				//resetting lastreportpage

				GM_setValue("lastreportpage_"+suffixGlobal, "berichte.php");

				setTimeout("window.location.replace('" + rootPath + "a2b.php')",500);

			} else {

				//going to next page

				next = find("//a[contains(@href,'berichte.php?s=')]",XPList);

				if (next.snapshotLength > 0)

				{

				nextRep = next.snapshotItem(next.snapshotLength-1).href.split("/");

				nextRepLink = nextRep[nextRep.length-1];

				FM_log(4,"nextRepLink="+nextRepLink);

				GM_setValue("lastreportpage_"+suffixGlobal,nextRepLink);

				//window.open(next.snapshotItem(next.snapshotLength-1).href, "_self");

				setTimeout("window.location.replace('" + next.snapshotItem(next.snapshotLength-1).href + "')",500);
				}

			}

		}

	

	}



	//Is this any report page?

	if ((url.indexOf("berichte.php?id=") != -1 || url.indexOf("berichte.php?newdid=") != -1) ) {

		FM_log(4,"inside report page");

		//alert("analysing report");

		test = find("//a[contains(@href,'uid=')]",XPList);

		var uids = find("//div[@id='content']//a[contains(@href,'karte.php?d=')]",XPList);



		if(test.snapshotLength == 3 && uids.snapshotLength == 2 ){

			setTextMessage("Checking reports", "Attack report");

			FM_log(4,"report is attack report");

			troopsinattack = document.getElementsByTagName('tr')[6].innerHTML.match(/\d+/g).join();

			casualties = document.getElementsByTagName('tr')[7].innerHTML.match(/\d+/g).join();

			attackedId = uids.snapshotItem(1).href.split('d=')[1].split('&c')[0];

			attackerVillageId = uids.snapshotItem(0).href.split('d=')[1].split('&c')[0];

			attackerPlayerId = test.snapshotItem(1).href.split('uid=')[1];

			playerId = getPlayerId();					

			thisCValue = uids.snapshotItem(1).href.split('d=')[1].split('&c=')[1];

			defenderPlayerId = test.snapshotItem(2).href.split('uid=')[1];

			//alert(defenderPlayerId);

			//alert(thisCValue);

			

			coords = id2xy(attackedId);

			FM_log(4,"coords="+coords.x+"/"+coords.y);

			

			FM_log(2,"going to check attacktable");

			temp = attacktable();
			lostResources = temp[1];
			var gain;
			var carryCapacity;
			var carryCell=dom.find("//img[@class='car']/parent::div",XPFirst);
			if (carryCell != null) {
				gain = carryCell.textContent.split('/')[0] - lostResources;
				carryCapacity = carryCell.textContent.split('/')[1];
				efficiency = gain/carryCapacity  * 100;
			}else{
				efficiency = -1;
				
			}
			FM_log(2, "Gain "+gain+"Carry: "+ carryCapacity + "Efficiency: "+ efficiency);



			//adding up casualties

			var casTemp = casualties.split(',');

			var casNr=0;

			for(i=0;i<casTemp.length;i++) {

				casNr+casTemp[i];

			}

			

			setTextMessage("Checking reports", "Attack report<br/><br/>Efficiency: "+efficiency+"%<br/>Gain: "+gain+"<br/>Casualties: "+casNr);

			

			FM_log(0,"efficiency="+efficiency);

						

			switch (temp[2]){

				case 1:tribe=T('ROMAN');break;

				case 2:tribe=T('TEUTON');break;

				case 3:tribe=T('GAUL');break;

				default:tribe=T('ROMAN');break;

			}

			if (temp[2]==3) {

				attType = 3;

			} else {

				attType = 4;

			}

			

			//alert("troopsinattack:"+troopsinattack);

			//alert("casualties:"+casualties);			

			//alert("gain:"+gain);

			//alert("efficiency:"+efficiency);

			

			if (troopsinattack.split(',').join() == casualties || gain < 0)

			{

				//alert("all units lost - deactivating village");
				
				suffix = suffixGlobal + '_' + attackerVillageId;
				suffixLocal = suffixGlobal + '_' + getActiveVillageId();
				index = getSindexFromXY(coords.x,coords.y, suffix);

				if (index != -2)

				{

					farmSetInactive(index, suffix);

					//alert("farm set inactive");

				}

			}

  	

			FM_log(2,"c="+casualties+"/eff="+efficiency+"/playerId="+playerId+"/attPId="+attackerPlayerId);
			var DynamicTroopCount = GM_getValue("DynamicTroopCount_" + suffixGlobal, 0);
			if(casualties == "0,0,0,0,0,0,0,0,0,0" && efficiency == 100 && playerId == attackerPlayerId )

			{
				suffixGlobal = server + '_' + getPlayerId();
				suffix = suffixGlobal + '_' + attackerVillageId;
				
				index = getSindexFromXY(coords.x,coords.y, suffix);
				FM_log(1,"Calling: farmAddRemoveOne("+ index + ","+ suffix +",true)");
				if(DynamicTroopCount){
					farmAddRemoveOne(index, suffix,true);
				}
				

				FM_log(2,"adding this farm to prioque");

				villageName = uids.snapshotItem(1).textContent;

				FM_log(4,"villageName="+villageName);

				playerName = test.snapshotItem(2).textContent + '(Priority)';

				FM_log(4,"playerName="+playerName);

				attackInfo = coords.x +','+ coords.y +'|'+ troopsinattack +'|'+tribe+'|'+playerName+'|'+defenderPlayerId+'|'+villageName+'|'+ thisCValue +'|true|'+attType;

				FM_log(2,"attackInfo="+attackInfo);

				addtoprio(attackInfo, attackerVillageId);

			}
			if(casualties == "0,0,0,0,0,0,0,0,0,0" && efficiency < minimumEfficiency && efficiency != -1 && playerId == attackerPlayerId ){
				
				suffixGlobal = server + '_' + getPlayerId();
				suffix = suffixGlobal + '_' + attackerVillageId;
				
				index = getSindexFromXY(coords.x,coords.y, suffix);
				FM_log(1,"Calling: farmAddRemoveOne("+ index + ","+ suffix +",false)");
				if(DynamicTroopCount){
					farmAddRemoveOne(index, suffix,false);
				}
			}

		} else {

			setTextMessage("Checking reports", "No Attack report");

		}

		//going back to last report page

		lastRepPage = GM_getValue("lastreportpage_" + suffixGlobal, "berichte.php");

		FM_log(4,"RepPage="+lastRepPage);

		//window.location.replace(lastRepPage);

		setTimeout("window.location.replace('" + lastRepPage + "')",500);

	}

	

}

function attacktable(){ //analyse report table

try {

	FM_log(1,"attacktable() called");

	var ats=new Array(0,0,0,0,0,0,0,0,0,0,0); 

	var XPFirst=XPathResult.FIRST_ORDERED_NODE_TYPE;

	var XPList=XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

	exTab = "//div[@id='content']//a[contains(@href,'spieler.php?')]/parent::*/parent::tr/parent::thead/parent::table/tbody";

	tab=find(exTab,XPList);

	//alert(tab.snapshotLength);

	table=tab.snapshotItem(0).getElementsByTagName("td"); //Item(0)=attacker, Item(1)=bounty, Item(2,3,4)=defender

	if(tab.snapshotLength>1) {

		//alert("check details");

		//real defender is always the last table

		tabledefender=tab.snapshotItem(tab.snapshotLength-1).getElementsByTagName("td");

				

		//alert(tabledefender);		

		if(tabledefender[1].innerHTML.indexOf("unit u1")>0) tribedefender=1;

		if(tabledefender[1].innerHTML.indexOf("unit u11")>0) tribedefender=2;

		if(tabledefender[1].innerHTML.indexOf("unit u21")>0) tribedefender=3;

				

	} else {

		//define tribe for defender

		tribedefender = 0;

	}

	var statushero=0;

	var statustrap=0;

	var troops=0; //1-romans 2-teutons 3-gauls

	var lostres=new Array(0,0,0,0);

	var atstemp=new Array(0,0,0,0,0,0,0,0,0,0,0);

	

	tableattacker=tab.snapshotItem(0).getElementsByTagName("td");

	

	if(tableattacker[1].innerHTML.indexOf("unit u1")>0) troops=1;

	if(tableattacker[1].innerHTML.indexOf("unit u11")>0) troops=2;

	if(tableattacker[1].innerHTML.indexOf("unit u21")>0) troops=3;

	//alert(troops);

	switch (troops){ //define need resources for troops

		case 1:tm=romans;break;

		case 2:tm=teutons;break;

		case 3:tm=gauls;break;

		default:tm=null;break;

	}

	

	var rescell=dom.find("//img[@class='r1']/parent::div",XPFirst);
	
	if (rescell != null){

		if(tm!=null){

			if(tab.snapshotItem(0).getElementsByTagName("tr")[0].innerHTML.indexOf("unit uhero")>0) {statushero=1;ats[5]=1;}

			

			//alert(statushero);

			

			var tda=11+statushero; //start for sent units

			var tdl=20+statushero*2; //start for casualities

			var tdt=0;

						

			for(var i=0;i<=(9+statushero);i++){

				atstemp[0]=atstemp[0]+table[tda+i].textContent*tm[i][0];

				lostres[0]=lostres[0]+table[tdl+i].textContent*tm[i][3];

				lostres[1]=lostres[1]+table[tdl+i].textContent*tm[i][4];

				lostres[2]=lostres[2]+table[tdl+i].textContent*tm[i][5];

				lostres[3]=lostres[3]+table[tdl+i].textContent*tm[i][6];

				atstemp[4]=atstemp[4]+table[tda+i].textContent*tm[i][7];

				atstemp[6]=atstemp[6]+table[tdl+i].textContent*tm[i][7];

				atstemp[8]=atstemp[8]+table[tda+i].textContent*tm[11][i]*tm[i][0];

				atstemp[9]=atstemp[9]+table[tda+i].textContent*tm[12][i]*tm[i][0];

				if(tdt!=0){

					atstemp[7]=atstemp[7]+table[tdt+i].textContent*tm[i][7];

					atstemp[3]=atstemp[3]+(table[tda+i].textContent-table[tdl+i].textContent-table[tdt+i].textContent)*tm[i][9];

				}else{

					atstemp[3]=atstemp[3]+(table[tda+i].textContent-table[tdl+i].textContent)*tm[i][9];

				}

			}

			atstemp[1]=lostres[0]+lostres[1]+lostres[2]+lostres[3];

			

			FM_log(2,"resText="+rescell.textContent);

			res=rescell.textContent.split(" | ");

			

			atstemp[2]=parseInt(res[0])+parseInt(res[1])+parseInt(res[2])+parseInt(res[3]);

			var efficiency = Math.round(atstemp[2] / atstemp[3] * 100);

			gain = atstemp[2] - atstemp[1];

			//alert(atstemp[1]);
			
			FM_log(2,"Loot: "+atstemp[2]+" Carry capacity: "+atstemp[3]);

			FM_log(2,efficiency+"/"+gain+"/"+tribedefender);

			returnstring = new Array();

			returnstring[0] = efficiency;

			returnstring[1] = atstemp[1];

			returnstring[2] = tribedefender;

			return (returnstring);

		};

	}

	return 0;

} catch(error) {

	FM_log(0,"attacktable(): Error in reading the attack-table");

}

}

function getSindexFromXY(x,y, suffix) {

	FM_log(3,"getSindexFromXY() called");

	farmList =  GM_getValue("FarmList_" + suffix, "");

	if (farmList != "" && farmList != null) {

		farmList = farmList.split(">:)");

		//alert(farmList.length);

		for (i=0; i<farmList.length;i++)

		{

			xy = farmList[i].split("|")[0].split(',');

			//alert(xy);

			if (x == xy[0] && y == xy[1])

			{

				return i;

			}

		}    

	} 

	return -2;

}



//FM list functions

function farmRemove(itemToRemove) { //Remove a farm from the list

	FM_log(3,"farmRemove("+itemToRemove+") called");

	var sIndex = getStartIndex();

	var eIndex = getEndIndex();

	

	FM_log(4,"sufLoc:"+suffixLocal);

	var fullList = GM_getValue("FarmList_" + suffixLocal);

	var farms = new Array;

	farms = fullList.split(">:)");



	var newFarmList = '', flag = false, i;

	if (itemToRemove < farms.length) {

		var arr = farms[itemToRemove].split("|");

		if (confirm(T('REMOVING') + ": " + E2C(arr[5]) + "(" + arr[0] + ")")) {

			for (i = 0; i < farms.length; i++) {

				if (i != itemToRemove) {

					if (flag) {

						newFarmList += ">:)";

					}

					newFarmList += farms[i];

					flag = true;

				}

			}

			//alert(newFarmList);

			if (itemToRemove <= sIndex) {

				GM_setValue("StartIndex_" + suffixLocal, (sIndex - 1) >= 0

								? (sIndex - 1)

								: 0);

			}

			if (itemToRemove <= eIndex) {

				GM_setValue("EndIndex_" + suffixLocal, (eIndex - 1) >= 0

								? (eIndex - 1)

								: 0);

			}

			GM_setValue("FarmList_" + suffixLocal, newFarmList);



			//reload the farm table

			clearque();

			reloadFarmTable();

		}

	} else {

		alert('???Not a farm for remove');

	}

}

function startEngine() {

	farmList = new Array();

	var vList = GM_getValue("FarmerVillages_" + suffixGlobal, "");

	if (vList == "" || vList == null) {

		//no farmer village! so set the current village a farmer, important for single village account

		GM_setValue("FarmerVillages_" + suffixGlobal, getActiveVillageId()

						+ "~-1"); //no newdid

		vList = GM_getValue("FarmerVillages_" + suffixGlobal, "");

	}

	//reset DoneHere for all selected village

	var arr = vList.toString().split(","), i;

	for (i = 0; i < arr.length; i++) {

		arr[i] = arr[i].split("~");

		GM_setValue("DoneHere_" + suffixGlobal + "_" + arr[i][0], 0);

	}

	GM_setValue("Active_" + suffixGlobal, 0);

	GM_addStyle("body { color:black; }");

	window.location.replace(rootPath + "a2b.php");

}

function stopEngine() {
	// set active variable to -1

	GM_setValue("Active_" + suffixGlobal, -1);
	// reset skipcounter

	GM_setValue("Skipcounter_" + suffixGlobal, 0);
	// reset all active farming villages

	var vList = GM_getValue("FarmerVillages_" + suffixGlobal, "").split(",");

	if (vList.length == 1 && vList[0].split("~")[1] == -1) { //for single village account

		GM_setValue("FarmerVillages_" + suffixGlobal, "");

	}

	// Reset farmques if random is deactivated so it will start where it should start

	if(GM_getValue("DelTList_" + suffixGlobal, 0)==1) {

		//alert("clearing que");

		clearque();

	}

	GM_addStyle("body { color:black; }");
	

	FM_log(3,"Engine stopped, setting skipcounter=0");
	
	// going back to rallypoint

	setTimeout("window.location.replace('build.php?id=39')",500);

	//window.location.replace("build.php?id=39");

}



function reloadFarmTable() {

	FM_log(3,"reloadFarmTable() called");

	var oldTable;

	if ((oldTable = dom.get("farmMachineTable")) != null

			|| oldTable != "undefined") {

		//then remove it

		dom.get("content").removeChild(dom.get("farmMachineTable"));

	}

	rp_insertTable();

	FM_log(4,"Farm Table Reload Complete");

}

function distanceSort(a, b) {

	var d1 = a.distance;

	var d2 = b.distance;

	return (d1 < d2) ? -1 : ((d1 > d2) ? 1 : 0); // -1 a,b | 1 b,a | 0 nothing

}

function sortFarms() {

	FM_log(1,"sortFarms() called");

	farmList = GM_getValue("FarmList_" + suffixLocal, "");

	if (farmList == "" || farmList == null)

		return;

	farmList = farmList.split(">:)");

	if (farmList.length == 1) //just one farm

		return;

	var arr = new Array(), i;

	var xy = getActiveVillageXY(), xyt;

	for (i = 0; i < farmList.length; i++) {

		xyt = farmList[i].split("|")[0].split(",");

		arr[i] = {

			FarmInfo : farmList[i],

			distance : coordDistXYtoXY(xy[0], xy[1], xyt[0], xyt[1])

		};

		//alert(xy[0]+" "+xy[1]+" "+xyt[0]+" "+xyt[1]);

	}

	arr.sort(distanceSort); //sorting

	var newList = "";

	for (i = 0; i < arr.length; i++) {

		if (i)

			newList += ">:)";

		newList += arr[i].FarmInfo;

	}

	GM_setValue("FarmList_" + suffixLocal, newList);

	reloadFarmTable();

}

function optimizeFarmsByDistance() {

	FM_log(3,"optimizeFarmsByDistance() called");

	if (confirm(T('OPTIMIZE_SM') + "\n" + T('CONFIRM') + "?")) {

		var selectedvList = GM_getValue("FarmerVillages_" + suffixGlobal, ""); //if empty, just one village

		var i, j, minDis, k;

		if (selectedvList != "" && selectedvList != null) {

			var vList = selectedvList.split(",");

			

			if (vList.length < 2) return;

			

			for (i = 0; i < vList.length; i++) {

				vList[i] = vList[i].split('~')[0];

			

			}

			

			var allFarms = "", vCoords = new Array(), newFarmList = new Array();

			

			for (i = 0; i < vList.length; i++) {

				var fList = GM_getValue("FarmList_" + suffixGlobal + "_" + vList[i], "");

				

				if (fList != "" && fList != null) {

					if (allFarms != "")	allFarms += ">:)";

					allFarms += fList;

				}

				newFarmList[i] = "";

				vCoords[i] = id2xy(vList[i]);

			}

			if (allFarms != "") {

				allFarms = allFarms.split(">:)");

				for (i = 0; i < allFarms.length; i++) {

					minDis = 5000000.0;

					k = -1;

					var xy = allFarms[i].split("|")[0].split(",");

					for (j = 0; j < vList.length; j++) {

						var dis = coordDistXYtoXY(vCoords[j].x, vCoords[j].y,

								xy[0], xy[1]);

						if (dis < minDis) {

							minDis = dis;

							k = j;

						}

					}

					if (k != -1) {

						if (newFarmList[k] != "") {

							newFarmList[k] += ">:)";

						}

						newFarmList[k] += allFarms[i];

					}

				}

				for (i = 0; i < vList.length; i++) {

					GM_setValue("FarmList_" + suffixGlobal + "_" + vList[i],

							newFarmList[i]);

				}

			}

		}

		reloadFarmTable();

		alert(T('OPTIMIZE_DONE'));

	}

}

function importExport() {

	FM_log(3,"importExport() called");

	var farmData = GM_getValue("FarmList_" + suffixLocal, ""), val;

	FM_log(4,"suffixLocal="+suffixLocal);

	val = prompt(T('LOCAL_IM_EX_PROMPT'), farmData);

	if (val != null) {

		val = trim(val);

		GM_setValue("FarmList_" + suffixLocal, val);

		reloadFarmTable();

	}

}

function globalImportExport() {

	var allVillageId = getAllVillageId();

	allVillageId = allVillageId.split(",");

	var allData = "", i, j, farmData;

	for (i = 0; i < allVillageId.length; i++) {

		farmData = GM_getValue("FarmList_" + suffixGlobal + "_"

						+ allVillageId[i], "");

		farmData = trim(farmData);

		if (allData != "")

			allData += "//";

		allData += allVillageId[i] + ":>" + farmData;

	}

	var val = prompt(T('GLOBAL_IM_EX_PROMPT'), allData);

	if (val != null) {

		val = trim(val).split("//");

		for (i = 0; i < val.length; i++) {

			farmData = val[i].split(":>");

			farmData[0] = trim(farmData[0]);

			if (farmData.length == 1)

				farmData.push("");

			for (j = 0; j < allVillageId.length; j++) {

				if (farmData[0] == allVillageId[j]) {

					break;

				}

			}

			if (j < allVillageId.length) {

				//alert(allVillageId[j]+" Data:"+farmData[1]);

				GM_setValue("FarmList_" + suffixGlobal + "_" + allVillageId[j],

						farmData[1]);

			}

		}

		reloadFarmTable();

	}

}

function editFarm(itemToEdit, event) {

	FM_log(3,"editFarm("+itemToEdit+",event) called");

	farmList = GM_getValue("FarmList_" + suffixLocal, "");

	var i;

	hidePopupFarmEditBox();

	if (farmList != "" && farmList != null) {

		farmList = farmList.split(">:)");

		if (itemToEdit < farmList.length) {

			//initialize the form with old values;

			var farmEditBox = dom.get("popupFarmEditBox");

			var arr = farmList[itemToEdit].split("|");

			var troopsConfig = arr[1].split(",");

			var inputTag = farmEditBox.getElementsByTagName("input");

			for (i = 0; i < inputTag.length; i++) {

				if (i < 11) {

					inputTag[i].value = troopsConfig[i];

				} else {

					if (inputTag[i].getAttribute("type") == "radio") {

						if (parseInt(inputTag[i].value) == parseInt(arr[8])) {

							inputTag[i].checked = true;

						} else {

							inputTag[i].checked = false;

						}

					}

					if (inputTag[i].getAttribute("type") == "checkbox") {

						if (arr[7] == "true") {

							inputTag[i].checked = true;

						} else {

							inputTag[i].checked = false;

						}

					}

				}

			}

			FM_log(3,"editFarm: Form Initialization complete " + farmList.length);

			//get the globalInt so if the save button get clicked saveEditedFarm function will use it

			globalInt = itemToEdit;

			//changing position

			farmEditBox.style.top = event.pageY + "px";

			farmEditBox.style.left = (event.pageX + 20) + "px";

			showPopupFarmEditBox(); //Now show the box

		}

	}

}

function saveEditedFarm() {

	FM_log(3,"saveEditedFarm() called");

	var itemToEdit = globalInt;

	FM_log(4,"itemToEdit="+itemToEdit);

	var newList = "", i, j;

	hidePopupFarmEditBox();

	if (farmList.length == 0 || farmList == null || itemToEdit < 0 || itemToEdit >= farmList.length) {

		FM_log(3,"saveEditedFarm: illegal call of this function");

		return;

	}

	FM_log(4,"SaveEditedFarm: Going to save the edited farm " + farmList.length);

	for (i = 0; i < farmList.length; i++) {

		if (newList != "") {

			newList += ">:)";

		}

		if (i == itemToEdit) {

			var formDiv = dom.get("popupFarmEditBox");

			var inputTag = formDiv.getElementsByTagName("input");

			var troopConfig = "", attackType, activeBool;

			for (j = 0; j < inputTag.length; j++) {

				if (j < 11) {

					if (j)

						troopConfig += ",";

						

					if (inputTag[j].value == "" || inputTag[j].value == "NaN" || inputTag[j].value == null)

						inputTag[j].value = 0;

					

					troopConfig += parseInt(inputTag[j].value);

					

				} else {

					if (inputTag[j].getAttribute("type") == "radio" && inputTag[j].checked) {

						attackType = inputTag[j].value;

					} else if (inputTag[j].getAttribute("type") == "checkbox") {

							activeBool = inputTag[j].checked;

					}

				}

			}

			var arr = farmList[i].split("|");

			newList += arr[0] + "|" + troopConfig + "|" + C2E(arr[2]) + "|"

					+ C2E(arr[3]) + "|" + C2E(arr[4]) + "|" + C2E(arr[5]) + "|"

					+ arr[6] + "|" + activeBool + "|" + attackType;

		} else {

			newList += farmList[i];

		}

	}

	GM_setValue("FarmList_" + suffixLocal, newList);

	FM_log(4,"SaveEditedFarm: Edit Farm Save Complete");

	clearque();

	reloadFarmTable();

}



//get informations

function getT35version() {

try{

	plusLogo = dom.get("logo");

	if(plusLogo != null) {

		if(plusLogo.nodeName == "IMG") {

			//de2

			GM_setValue("TravianVersion_"+suffixGlobal,1);

			vT35=1;

		} else if (plusLogo.nodeName == "A") {

			//com7, com9, it9, comx

			GM_setValue("TravianVersion_"+suffixGlobal,2);

			vT35=2;

		} else {

			GM_setValue("TravianVersion_"+suffixGlobal,0);

			vT35=0;

			FM_log(0,"unknown Travian Version");

		}

	}

	FM_log(2,"Travian Version is: "+vT35);

	return;

} catch (error) {

	FM_log(0,"getT35version(): error retrieving Travian35-Version");

}

}

function getStartIndex() {

	FM_log(3,"getStartIndex() called");

	FM_log(4,"getSIndex suffixLocal="+suffixLocal);

	var sIndex = GM_getValue("StartIndex_" + suffixLocal, 0);

	FM_log(4,"retrieved sIndex="+sIndex);

	return sIndex;

}

function getEndIndex() {

	var eIndex = GM_getValue("EndIndex_" + suffixLocal, 0);

	return eIndex;

}

function getXYtoFarms(buttonId) {

	FM_log(1,"getXYtoFarms("+buttonId+") called");

	

	var xOff = 0, yOff = 0;

	if(buttonId!="") {

		if (buttonId=="ma_n1") {

			xOff = 0; yOff = 1;

		} else if (buttonId=="ma_n2") {

			xOff = 1; yOff = 0;						

		} else if (buttonId=="ma_n3") {

			xOff = 0; yOff = -1;						

		} else if (buttonId=="ma_n4") {

			xOff = -1; yOff = 0;						

		} else if (buttonId=="ma_n1p7") {

			xOff = 0; yOff = 7;

		} else if (buttonId=="ma_n2p7") {

			xOff = 7; yOff = 0;						

		} else if (buttonId=="ma_n3p7") {

			xOff = 0; yOff = -7;						

		} else if (buttonId=="ma_n4p7") {

			xOff = -7; yOff = 0;						

		}

	}

	

	FM_log(4,"offsets="+xOff+"/"+yOff);

	

	//get new map center and store it

	centerCoords = GM_getValue("MapCenter_"+suffixGlobal,"");

	if(centerCoords!="") {

		centerCoords = centerCoords.split(',');

		FM_log(4,"stored coords:"+centerCoords[0]+","+centerCoords[1]);

	} else {

		FM_log(4,"no center coords stored");

		return;

	}

	

	centerX = parseInt(centerCoords[0])+xOff;

	centerY = parseInt(centerCoords[1])+yOff;

	

	//store new map Center

	FM_log(4,"new mapCenter="+centerX+"/"+centerY);

	GM_setValue("MapCenter_"+suffixGlobal,centerX+","+centerY);

	

	var allVillageId = new Array();

	var allVillageIdStr = getAllVillageId().toString();

	FM_log(4,"allVillageStr="+allVillageIdStr);

	if(allVillageIdStr.indexOf(",")<0) {

		allVillageId.push(allVillageIdStr);

	} else {

		allVillageId = allVillageIdStr.split(",");

	}

	var allData = "", i, farmData;

	for (i = 0; i < allVillageId.length; i++) {

		farmData = GM_getValue("FarmList_" + suffixGlobal + "_"	+ allVillageId[i], "");

		farmData = trim(farmData);

		if(allData !="") allData +=">:)";

		allData += farmData;

	}

	FM_log(4,"allDataString="+allData);

	allData = allData.split(">:)");

	FM_log(4,"allDatalength="+allData.length);

	

	for (var i = 0; i < allData.length; i++) {

		if(allData[i].length>3) {

			xyt = allData[i].split("|")[0].split(",");

			markFarm(xyt[0], xyt[1]);

		}

	}



}

function isFarmerVillage(currentVillageId) {

	var vList = GM_getValue("FarmerVillages_" + suffixGlobal, "").split(",");

	if (vList == "" || vList.length == 0) {

		return false;

	}

	var i;

	for (i = 0; i < vList.length; i++) {

		if (vList[i].split('~')[0] == currentVillageId) {

			return true;

		}

	}

	return false;

}

function isFarm(x,y) {

	FM_log(3,"isFarm("+x+","+y+") called");

	var allvList = getAllVillageId().toString();

	FM_log(4,"allvList="+allvList);

	if(allvList != "" && allvList != null) {

		var vList = allvList.split(',');

		for(i=0; i<vList.length; i++) {

			var vId = vList[i];

			//Get Farmlist for this village

			tList = GM_getValue("FarmList_"+suffixGlobal+"_"+vId, "");

			fVillages = tList.split(">:)");

			for(j=0; j<fVillages.length; j++) {

				vCoords = fVillages[j].split("|")[0];

				cooX = vCoords.split(",")[0];

				cooY = vCoords.split(",")[1];

				if(x==cooX && y== cooY) {

					FM_log(4,"it is a farm");

					return true;

				}

			}

		}

		FM_log(4,"it is not a farm");

		return false;

	} else {

		FM_log(4,"error fetching allvList");

		return false;

	}

}

function isReallyRallyPoint() {

	FM_log(3,"isReallyRallyPoint() called");

	// suche muss umgestaltet werden > direkt nach links suchen

	

	var rp_link_overview = dom.xo('//a[contains(@href,"build.php?id=39")]');

	var rp_link_sendtroops = dom.xo('//a[contains(@href,"a2b.php")]');

	var rp_link_warsim = dom.xo('//a[contains(@href,"warsim.php")]');

	

	FM_log(5,"LinkOverview:"+rp_link_overview.snapshotLength+"/LinkSendtroops:"+rp_link_sendtroops.snapshotLength+"/LinkWarsim:"+rp_link_warsim.
snapshotLength);

	

	if (rp_link_overview.snapshotLength < 1 || rp_link_sendtroops.snapshotLength < 1 || rp_link_warsim.snapshotLength < 1) {

		//one of the link was not found

		FM_log(4,"isReallyRallyPoint() = false");

		return false;

	}

	FM_log(4,"isReallyRallyPoint() = true");

	return true;

}

function getPlayerTribe() { //retrieve Player's tribe

	FM_log(3,"getPlayerTribe() called");

	var tribe = 0; //roman

	if (dom.xs("//img[contains(@src,'x.gif')][@class='unit u1']")) {

		tribe = 0;

	} else if (dom.xs("//img[contains(@src,'x.gif')][@class='unit u11']")) {

		tribe = 1;

	} else if (dom.xs("//img[contains(@src,'x.gif')][@class='unit u21']")) {

		tribe = 2;

	}

	return tribe;

}

function getFPlayerName() { //retrieve Farm player's name

	FM_log(3,"getFPlayerName() called");

	var user = dom.xs("//a[contains(@href,'spieler.php')]/parent::td");

	//alert(user);

	var playerName = (user) ? user.textContent : '';

	playerName = trim(playerName);

	//alert(playerName);

	return playerName;

}

function getFPlayerId() { //retrieve Farm player's ID

	FM_log(3,"getFPlayerId() called");

	var user = dom.xs("//a[contains(@href,'spieler.php')][1]");

	//alert(user);

	var playerId = (user) ? getParamFromUrl(user.href, 'uid') : '';

	//alert(playerId);

	return playerId;

}

function getFPlayerTribe() { //retrieve Farm player's tribe

	FM_log(3,"getFPlayerTribe() called");



	var playerLink = dom.xs("//a[contains(@href,'spieler.php')]");

	var playerTribe = "";

			

	if (playerLink.snapshotLength<2) { //abandoned area/empty oasis

		playerTribe = '';

	} else {

		playerTribe = dom.xs("//a[contains(@href,'spieler.php?')]/parent::td/parent::tr/parent::tbody/tr[1]/td[last()]").textContent;

	}

	playerTribe = trim(playerTribe.toLowerCase());

	//alert(playerTribe);

	FM_log(4,"PlayerTribe="+playerTribe);

	return playerTribe;

}

function getCvalue() { //retrieve village c value

	var url = document.location.href;

	var cValue = getParamFromUrl(url, 'c');

	return cValue;

}

function getFVillageCoords() { //retrieve coordinates

	FM_log(3,"getFVillageCoords() called");

	var playerLink = dom.xs("//a[contains(@href,'spieler.php')]");

	var title, coordsObject;

	

	if (playerLink.snapshotLength<2) {	//abandoned area/empty oasis

		title = "";

		coordsObject = dom.xo('//h1').textContent;

	} else { //normal village or occupied oasis

		title = dom.xs('//h1').textContent;

		coordsObject = dom.xo('//h1').textContent;

	}

	title = title.replace(/^[\s( )]+/g, '').replace(/[\s( )]+$/g, '');

	var coords = title.substring(title.lastIndexOf('('));

	coords = coords.replace(/[\(\)]/g, '').split('|').join(',')

	FM_log(4,"retrieved coords:"+coords);

	return coords; //comma sperated

}

function getFVillageName() { //retrieve Farm Village name

	FM_log(3,"getFVillageName() called");

	var playerLink = dom.xo("//a[contains(@href,'spieler.php')]");

	//alert(divcontent);

	var title, villageName;
	FM_log(2,"playerLink.snapshotLength="+playerLink.snapshotLength);

	if (playerLink.snapshotLength<2) {	//abandoned area/empty oasis

		var villageNameObject = dom.xs('//h1');

		title = villageNameObject.textContent;

		villageName = title.substring(0, title.lastIndexOf('(')).replace(

				/^\s+|\s+$/g, '');

		//alert(villageName);

	} else {

		//normal village or occupied oasis

		var villageNameObject = dom.xo("//h1/div");
		FM_log(2,"villageNameObject.snapshotLength="+villageNameObject.snapshotLength);

		villageName = villageNameObject.snapshotItem(villageNameObject.snapshotLength-1).innerHTML;

	}

	FM_log(3,"Final villageName="+villageName);

	villageName = trim(villageName);

	//alert(villageName);

	return villageName;

}

function getPlayerId() { //retrieve Player's ID
try {
	var user = dom.xs('//*[@id="side_navi"]/p/a[starts-with(@href, "spieler.php?uid=")]');
	if(user==null) {
		//old id-tag

		user = dom.xs('//*[@id="sleft"]/p/a[starts-with(@href, "spieler.php?uid=")]');
	}

	var playerID = (user) ? getParamFromUrl(user.href, 'uid') : '';

	FM_log(3,"Fetched userid");

	return playerID;
} catch(error) {
	FM_log(0,"getPlayerId(): error retrieving ID");
}

}

function getActiveVillageId() { //retrieve ID of active Village from Villagelist

try {

	FM_log(3,"getActiveVillageId() called");

	var xy = getActiveVillageXY();

	return xy2id(xy[0], xy[1]);

} catch(error) {

	FM_log(0,"getActiveVillageId(): error retrieving ID");

}

}

function getAllVillageId() { //retrieve IDs of all Villages

try {

	FM_log(1,"getAllVillageId() called");

	//get Travian Version

	vT35 = GM_getValue("TravianVersion_" + suffixGlobal, 0);

	

	//Look for villageTable

	citiesExp = "//a[contains(@href,'newdid')]/parent::td/parent::tr/parent::tbody";

	var cities = dom.find(citiesExp,XPFirst);

	if (!cities) {

		FM_log(4,"no villageTable");

		//no villageTable

		return getActiveVillageId();

	} else {

		FM_log(4,"villageTable existing");

		var idList = "", i;

		//check number of villages

		var nVillages = cities.childNodes.length -1;

		FM_log(4,nVillages+" villages");

		

		if(nVillages>1) {

			FM_log(4,"more than 1 village");

			for (var i = 1; i <= nVillages; i++) {

				if(vT35==1) {

					cityExp1 = citiesExp + "/tr["+i+"]/td[@class='x']";

					cityExp2 = citiesExp + "/tr["+i+"]/td[@class='y']";

				} else if (vT35==2) {

					cityExp1 = citiesExp + "/tr["+i+"]/td/div[@class='cox']";

					cityExp2 = citiesExp + "/tr["+i+"]/td/div[@class='coy']";

				}

				FM_log(4,"cityExp1:"+cityExp1);

				FM_log(4,"cityExp2:"+cityExp2);

				if(dom.xs(cityExp1)!=null) {

					X = dom.xs(cityExp1).textContent.match(/[-\d]+/);

					Y = dom.xs(cityExp2).textContent.match(/[-\d]+/);

				} else {

					FM_log(2,"Travian Beyond table conflicting");


					if(vT35==1) {

						TBExp1 = citiesExp + "/tr["+i+"]/td[@class='x']";

						TBExp2 = citiesExp + "/tr["+i+"]/td[@class='y']";


					} else {

						TBExp1 = citiesExp + "/tr["+i+"]//td[@class='cox']";

						TBExp2 = citiesExp + "/tr["+i+"]//td[@class='coy']";


					}

					FM_log(4,"TBExp1="+TBExp1);

					FM_log(4,"TBExp2="+TBExp2);

					X = dom.xs(TBExp1).textContent.match(/[-\d]+/);

					Y = dom.xs(TBExp2).textContent.match(/[-\d]+/);

				}

				if (i > 1)

					idList += ",";

				idList += xy2id(X, Y);

			}

		} else { //TBeyond table

			FM_log(4,"only 1 village - TBeyond table");

			

			cityExp1 = citiesExp + "/tr[1]/td[@class='x']";

			cityExp2 = citiesExp + "/tr[1]/td[@class='y']";

			

			if(dom.xs(cityExp1)==null) {

				cityExp1 = citiesExp + "/tr[1]//td[@class='cox']";

				cityExp2 = citiesExp + "/tr[1]//td[@class='coy']";

			}

			X = dom.xs(cityExp1).textContent.match(/[-\d]+/);

			Y = dom.xs(cityExp2).textContent.match(/[-\d]+/);

			

			idList += xy2id(X, Y);

		}

		FM_log(4,"idList="+idList);

		return idList;

	}

} catch(error) {

	FM_log(0,"getAllVillageId(): Error retrieving all village IDs");

}

}

function getActiveVillageXY() { //retrieve coordinates of active Village from Villagelist

try {

	FM_log(3,"getActiveVillageXY() called");

	//get Travian Version

	vT35 = GM_getValue("TravianVersion_" + suffixGlobal, 0);

	var xy = new Array();

	if(vT35 == 1) {

		// old search strings for de-servers

		FM_log(4,"old T35 version");

		var ex1 	= "//tr[@class='sel']";

		var ex1_1 	= "//tr[@class='sel']/td[@class='x']";

		var ex1_2 	= "//tr[@class='sel']/td[@class='y']";

	} else if (vT35 == 2) {

		//new T35-Version

		FM_log(4,"new T35 version");

		var ex1 	= "//td[@class='dot hl']/parent::tr";

		var ex1_1 	= "//td[@class='dot hl']/parent::tr/td/div[@class='cox']";

		var ex1_2 	= "//td[@class='dot hl']/parent::tr/td/div[@class='coy']";

		if(dom.xs(ex1_1)==null) { //different Version: it9

			ex1_1 = "//td[@class='dot hl']/parent::tr//td[@class='cox']";

			ex1_2 = "//td[@class='dot hl']/parent::tr//td[@class='coy']";

		}

		FM_log(4,"ex1: "+ex1);		

	} else {

		FM_log(0,"unknown Travian Version");

	}

	

	

	var villageNode = dom.xo(ex1);

	

	FM_log(5,"villageNode.snapshotLength="+villageNode.snapshotLength);

	if (villageNode.snapshotLength > 0) {

		FM_log(3,"villageTable existing");

		xy.push(dom.xs(ex1_1).textContent.match(/[-\d]+/));

		xy.push(dom.xs(ex1_2).textContent.match(/[-\d]+/));

	} else {

		FM_log(3,"villageTable not existing - Single Village Account");

		xy.push("");

		xy.push("");

	}

	//alert(xy);

	if (xy[0] == "" || xy[1] == "") {

		//single Village

		var singleVillageXY = GM_getValue('SingleVillageXY_' + suffixGlobal, '');

		if (!singleVillageXY || singleVillageXY == '') {

			//grab coordinates for the first time

			xy = getSingleVillageXY();

		} else {

			xy = singleVillageXY.split(",");

		}

	}

	FM_log(4,"retrieved coords: X="+xy[0]+"/Y="+xy[1]);

	return xy;

} catch(error) {

	FM_log(0,"getActiveVillageXY(): error retrieving coordinates");

}

}

function getSingleVillageXY() { //retrieve coordinates for single village account

try {

	var url = document.URL;

	url = url.substring(0, url.lastIndexOf('/') + 1);

	url = url + 'karte.php';

	GM_xmlhttpRequest({

		method : 'GET',

		url : url,

		onload : function(responseDetails) {

			if (responseDetails.status != 200)

				return new Array(0, 0);

			var div = dom.cn('div', responseDetails.responseText);

			var ansDoc = document.implementation.createDocument('', '', null);

			ansDoc.appendChild(div);

			var x = ansDoc.getElementById('x').firstChild.nodeValue;

			var y = ansDoc.getElementById('y').firstChild.nodeValue;

			var singleVillageCoords = x + ',' + y;

			GM_setValue('SingleVillageXY_' + suffixGlobal, singleVillageCoords);

			return new Array(x, y);

		}

	});

} catch(error) {

	FM_log(0,"getSingleVillageXY(): error retrieving coordinates");

}

}

function xy2id(x, y) { //calculate village ID from coordinates

	return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));

}

function id2xy(id) { //calculate village coordinates from ID

	var x = (id % 801) - 401;

	var y = 400 - (id - 401 - x) / 801;

	return {

		x : x,

		y : y

	};

}

/**

 * getParamFromUrl

 * @param {String} url The string of the URL

 * @param {String} urlParam The param being searched in the URL

 */

function getParamFromUrl(url, urlParam) {

	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that

	var searchStr = "&" + urlParam + "=";

	var pos = res.indexOf(searchStr);

	if (pos != -1) {

		res = res.substring(res.indexOf(searchStr) + searchStr.length);

		var endPos = (res.indexOf("&") > res.indexOf("#"))

				? res.indexOf("&")

				: res.indexOf("#");

		if (endPos != -1) {

			res = res.substring(0, endPos);

		}

		return res;

	} else {

		return null;

	}

}



//message window functions

/**

 * set text message to the runningDiv. If title is blank then it append the message with the previous message

 * @param {} titleStr

 * @param {} messageStr

 */

function drawMessageBox() {

	FM_log(3,"drawMessageBox() called");

	runningDiv = dom.cn("div"); //global

	runningDiv

			.setAttribute(

					"style",

					"text-align:center; margin:auto; position:absolute; top:"+400+"px; left:"+700+"px; width:320px; height:180px; background-color: #F8F8FF; border: 2px solid #c0c0c0; -moz-border-radius: 5px; z-index:"+zIndex);



	var tempDiv = dom.cn("div");

	tempDiv

			.setAttribute(

					"style",

					"font-size:12px; margin-bottom:6px; font-weight:bold; color:red; border-bottom: 1px solid #c0c0c0; padding: 3px 0 3px 0;");

	tempDiv.innerHTML = T('MACHINE_RUNNING') + "...";

	runningDiv.appendChild(tempDiv);



	var textDiv = dom.cn("div");

	textDiv

			.setAttribute(

					"style",

					"text-align:center; font-size:10px; margin:auto; overflow: auto; height:90px; border-bottom: 1px solid #c0c0c0;");

	runningDiv.appendChild(textDiv);



	tempDiv = dom.cn("div");

	tempDiv.setAttribute("style",

			"font-size: 10px; border-bottom: 1px solid #c0c0c0; margin:4px 0 4px 0; height: 16px;");

	tempDiv.innerHTML = " ";

	runningDiv.appendChild(tempDiv);



	var pushButton = createInputButton("button", T("Halt_Farming"), function() {

				stopEngine();

			});

	runningDiv.appendChild(pushButton);

	document.body.appendChild(runningDiv);

}

function setAttackMessage() {

	FM_log(3,"setAttackMessage() called");

	

	prioque = GM_getValue('priorityqueue'+ suffixLocal, '').split('>:)');

	fque = GM_getValue('farmqueue'+ suffixLocal, '').split('>:)');

	

	if (prioque.length >= 1 && prioque[0].length > 2)

	{

		FM_log(3,"priority attack");

		var arr = prioque[0].split("|");

		priorityAttack = true;

		attackList = prioque

	}else{

		var arr = fque[0].split("|");

		attackList = fque;

		priorityAttack = false;

	}

	

	tX = arr[0].split(",")[0];

	tY = arr[0].split(",")[1];

	

	sIndex = getSindexFromXY(tX,tY, suffixLocal);

	

	var titleStr = T("Going_to")

			+ " "

			+ (arr[8] == 2 ? T("Reinforce") : (arr[8] == 3

					? T("Attack")

					: T("Raid")));

	var messageStr = "["+sIndex+"] "+E2C(arr[3]) + " - "; // FPlayerName

	messageStr += E2C(arr[5]);

	messageStr += "<b>(" + arr[0] + ")</b><br>"; // X,Y

	messageStr += T("Used_Troops") + ": ";

	arr[1] = arr[1].split(",");

	if (parseInt(arr[1][0])) {

		messageStr += " : " + arr[1][0] + " ";

	}

	for (var i = 1; i < 10; i++) {

		if (parseInt(arr[1][i]) > 0) {

			messageStr += "  " + arr[1][i] + " ";

		}

	}
	setTextMessage(titleStr, messageStr);

}

function setTextMessage(titleStr, messageStr) {

	if (titleStr != "") {

		runningDiv.childNodes[1].innerHTML = "<div style='font-size:14px; font-weight:bold; color:black'>"

				+ titleStr + "</div>";

	}

	runningDiv.childNodes[1].innerHTML += messageStr + "<br>";

	var attackCount = GM_getValue("Active_" + suffixGlobal, 0);



	runningDiv.childNodes[2].innerHTML = T('SUCCESS_COUNT') + ": "

			+ attackCount;

}



//add farm pop up

function insertEditFarmBox() {

	FM_log(3,"insertEditFarmBox() called");

	var i;

	div = document.createElement('div');

	div.id = "popupFarmEditBox";

	div.style.visibility = 'hidden';

	div.style.zIndex = 100;

	div.style.position = 'absolute';

	div.style.borderWidth = '1px';

	div.style.top = '600px';

	div.style.left = '150px';
	
	//getting default troops	
	tempTroops = defTroops.split(',');
	FM_log(4,"tempTroops arraysize="+tempTroops.length);
	if(tempTroops.length!=11) {
		defTroops = "0,0,0,0,0,0,0,0,0,0,0";
		tempTroops = defTroops.split(',');
	}
	

	var text = "<fieldset style='background-color: #F8F8FF; border: 1px solid #C0C0C0; -moz-border-radius: 10px;'>"

			+ "<legend style='background-color: #F4F7EC; border-top: 1px solid #C0C0C0; -moz-border-radius: 2px;'>Add/Edit Farm</legend>"

			+ "<img src='img/x.gif' class='unit u" + (user_race)

				+ "'>:<input type='text' size='1' value='" + tempTroops[0] + "' id='t1'>";
	
	

	for (i = 1; i < 10; i++) {

		text += "<img src='/img/x.gif' class='unit u" + (user_race + i)

				+ "'>:<input type='text' size='1' value='" + tempTroops[i] + "' id='t"

				+ (i + 1) + "'>";

	}
	text += "<img src='/img/x.gif' class='unit uhero'>:<input type='text' size='1' value='" + tempTroops[10] + "' id='t"

			+ (10 + 1) + "'>";

	text += "<br/>"

			+ "<input type='radio' id='radio2' name='AttackType' value='2' />"

			+ T("Reinforce")

			+ "<input type='radio' id='radio3' name='AttackType' value='3' />"

			+ T("Attack")

			+ "<input type='radio' id='radio4' name='AttackType' checked='true' value='4' />"

			+ T("Raid")

			+ "<br />"

			+ "<input type='checkbox' checked='true' id='activeCheck' />"

			+ T("Active_Farm")

			+ "<br />"

			+ "<input style='float: right;' id='FMcancelButton' type='submit' value="

			+ T('Cancel')

			+ " />"

			+ "<input style='float: right;' id='FMsaveButton' type='submit' value="

			+ T('Save') + " /></fieldset>";



	div.innerHTML = text;

	document.body.appendChild(div);

	dom.get('FMcancelButton').addEventListener('click', hidePopupFarmEditBox,

			true);

	FM_log(3,"FarmEditBox Insert done");

	//Add the event listener for Save button in appropiate place :)

}

function showPopupFarmEditBox() {

	var farmEditBox = null;

	if ((farmEditBox = document.getElementById('popupFarmEditBox')) == null

			|| farmEditBox == "undefined") {

		return;

	}

	farmEditBox.style.visibility = "visible";

}

function hidePopupFarmEditBox() {

	var farmEditBox = null;

	if ((farmEditBox = document.getElementById('popupFarmEditBox')) == null

			|| farmEditBox == "undefined") {

		return;

	}

	farmEditBox.style.visibility = "hidden";

}



//set up options

function rp_setStartIndex(index) {

	GM_setValue("StartIndex_" + suffixLocal, index);

}

function rp_setEndIndex(index) {

	GM_setValue("EndIndex_" + suffixLocal, index);

}

function rp_removeEndIndex() {

	GM_setValue("EndIndex_" + suffixLocal, -1);

	reloadFarmTable();

}

function setVillageSkipping() { //Option VillageSkipping

	var vilSkip = GM_getValue("VillageSkipping_" + suffixGlobal, -1);

	if (vilSkip == 1) {

		GM_setValue("VillageSkipping_" + suffixGlobal, 0);

	} else {

		GM_setValue("VillageSkipping_" + suffixGlobal, 1);

	}

}

function setFarmMarking() { //Option Farm marking

	var farmMark = GM_getValue("farmMarking_" + suffixGlobal, -1);

	if (farmMark == 1) {

		GM_setValue("farmMarking_" + suffixGlobal, 0);

	} else {

		GM_setValue("farmMarking_" + suffixGlobal, 1);

	}

}

function setRandomFarming() { //Option Randomize

	var random = GM_getValue("RandomFarming_" + suffixGlobal, -1);

	if (random == 1) {

		GM_setValue("RandomFarming_" + suffixGlobal, 0);

	} else {

		GM_setValue("RandomFarming_" + suffixGlobal, 1);

	}

}

function setDelTList() { //Option Delete Temporary List

	var DelTList = GM_getValue("DelTList_" + suffixGlobal, -1);

	if (DelTList == 1) {

		GM_setValue("DelTList_" + suffixGlobal, 0);

	} else {

		GM_setValue("DelTList_" + suffixGlobal, 1);

	}

}

function setDynamicTroopCount() { //Option Dynamic Troop Count

	var DelTList = GM_getValue("DynamicTroopCount_" + suffixGlobal, -1);

	if (DelTList == 1) {

		GM_setValue("DynamicTroopCount_" + suffixGlobal, 0);

	} else {

		GM_setValue("DynamicTroopCount_" + suffixGlobal, 1);

	}

}

function setReadRep() { //Option Read Reports

	var ReadRep = GM_getValue("ReadRep_" + suffixGlobal, -1);

	if (ReadRep == 1) {

		GM_setValue("ReadRep_" + suffixGlobal, 0);

	} else {

		GM_setValue("ReadRep_" + suffixGlobal, 1);

	}

}

function min_max_settings() { //shows / hides the settings part

	if (GM_getValue("MaximizeSettings_" + suffixGlobal, 0) == 0) {

		GM_setValue("MaximizeSettings_" + suffixGlobal, 1);

	} else {

		GM_setValue("MaximizeSettings_" + suffixGlobal, 0);

	}

	reloadFarmTable();

}

function rp_min_max() { //minimizes / maximizes the farming list

	if (GM_getValue("Maximize_" + suffixGlobal, 0) == 0) {

		GM_setValue("Maximize_" + suffixGlobal, 1);

	} else {

		GM_setValue("Maximize_" + suffixGlobal, 0);

	}

	reloadFarmTable();

}

// Auto Login

function loginCheck()
{
	if (GM_getValue('wearein') == 1) {
		location.href = rootPath+"build.php?id=39";
		GM_setValue('wearein', 0);
	}
	if (document.getElementsByName('login'))
	{
		var ex = ".//input[@value='login']";
		tag = document.evaluate( ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var ex = ".//input[@type='password' and contains(@value, '*')]";
		tag2 = document.evaluate( ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    	if(tag.snapshotLength && tag2.snapshotLength)
    	{
    		loginButton = tag.snapshotItem(0);
    		loginButton.click();
			GM_setValue('wearein', 1);
    	}
	}
}

var ex = "id('errorTitleText')";
tag = document.evaluate( ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var ex2 = "id('content')/p[2]/a[contains(@href, 'del_cookie')]";
tag2 = document.evaluate( ex2, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (tag.snapshotLength > 0) {
	setTimeout("window.location.replace('" + rootPath + "build.php?id=39')", 3000);
} else if (tag2.snapshotLength > 0) {
	setTimeout("window.location.replace('" + rootPath + "login.php')", 3000);
} else {
	loginCheck();
}

//Update
function updateFM(SCRIPT) {
	var loadImg = dom.cn("img");
	loadImg.src = image['LOADING'];
	var updater = dom.get("updater");
	updater.appendChild(loadImg);
	try {
		/*if (!GM_getValue)
		    return;*/
		GM_xmlhttpRequest({
			method : 'GET',
			url : SCRIPT.url + '?source',
			onload : function(result) {
				updater.removeChild(loadImg);
				if (result.status != 200) {
					alert(T("UPDATE_M1"));
					return;
				}
				if (!result.responseText.match(/@version\s+([\d.]+)/)) {
					alert(T('UPDATE_UNKNOWN') + " v" + RegExp.$1);
					return;
				}

				var onlineVersion = RegExp.$1;
				var currentVersion = SCRIPT.version;
				if (onlineVersion == SCRIPT.version) {
					alert(T('UPDATE_LAST') + " " + T("Script_name") + ' (v'
							+ onlineVersion + ')');
					return;
				} else {
					currentVersion = currentVersion.split(".");
					var onlineArray = onlineVersion.split(".");
					if (currentVersion[0] <= onlineArray[0]
							|| currentVersion[1] <= onlineArray[1]
							|| currentVersion[2] <= onlineArray[2]) {
						var messageStr = "";
						if (onlineArray[2] != 0) {
							messageStr = T('UPDATE_BETA');
						} else {
							messageStr = T('UPDATE_NEW') + " v" + onlineVersion;
						}
						if (confirm(messageStr + "\n\n" + T('CONFIRM') + ":"
								+ T('UPDATE_NOW') + "?")) {
							window.location.href = SCRIPT.url;
							GM_setValue("Tribe_" + suffixGlobal, -1);
						}
					}
				}
			}
		});
	} catch (ex) {
		alert("AJAX request Exception! Try later.");
	}
}

//insert elements

function rp_insertTable() {

	FM_log(3,"rp_insertTable() called");

	var farmTable = dom.cn("table");

	var ftableBody = dom.cn("tbody");

	var i;

	var maximize = GM_getValue("Maximize_" + suffixGlobal, 0);

	farmTable.className = "FMtbg";

	farmTable.id = "farmMachineTable";

	farmTable.setAttribute('cellpadding', 0);

	farmTable.setAttribute('cellspacing', 0);

	farmTable.style.marginBotton = "12px";

	//top row


	var tableRow = dom.cn("tr");

	tableRow.className = "cbg1";

	var tableCol = dom.cn("td");

	tableCol.setAttribute("colspan", 15);

	var Button = dom.cn("div");

	Button.id = "updater";

	Button.setAttribute("style", "margin:auto; width: 477px;");

	Button.appendChild(createLinkButton(T('UPDATE_M') + " " + T('SCRIPT_NAME'), T('UPDATE_M') + " "
					+ T('SCRIPT_NAME'), function() {
				updateFM(SCRIPT);
			}));
	tableCol.appendChild(Button);

	tableRow.appendChild(tableCol);

	//Add Minimize||Maximize button

	tableCol = dom.cn("td");

	var img = dom.cn("img");

	if (maximize) {

		img.src = image['MINIMIZE']; //add minimize image

		img.title = T("Minimize");

	} else {

		img.src = image['MAXIMIZE']; //add minimize image

		img.title = T("Maximize");

	}

	img.style.height = '16px';

	img.style.width = '30px';

	img.style.cursor = "pointer";

	Button = dom.cn("div");

	Button.setAttribute("style", "width:30px;float:right;");

	Button.appendChild(img);

	Button.addEventListener('click', function() {

				rp_min_max();

			}, 0);

	tableCol.appendChild(Button);



	tableRow.appendChild(tableCol);

	ftableBody.appendChild(tableRow); //adding the top row



	//********************************

	// option row

	tableRow = dom.cn("tr");

	tableRow.className = "cbg1";

	tableCol = dom.cn("td");

	tableCol.setAttribute("colspan", 15);

	

	if(GM_getValue("MaximizeSettings_" + suffixGlobal, 0)==1) {

	tableRow = dom.cn("tr");

	tableRow.className = "cbg1";

	tableCol = dom.cn("td");

	tableCol.setAttribute("colspan", 16);

		

	var settingsTable = dom.cn('table');

	settingsTable.width = "100%";

	settingsTable.setAttribute("margin-bottom",10);

	

	//1st option: randomiz farming

	var setRowRandomize = dom.cn('tr');

	

	var setRandomizeC1 = dom.cn('td');

	setRandomizeC1.width = 20;

	

	RandomButton = createInputButton("checkbox", 0, setRandomFarming);

	var random = GM_getValue("RandomFarming_" + suffixGlobal, 0);

	if (random == 1) {

		RandomButton.checked = true;

	}

	

	setRandomizeC1.appendChild(RandomButton);

	

	var setRandomizeC2 = dom.cn('td');

	setRandomizeC2.innerHTML = T('SETRANDOMIZE');

	

	setRowRandomize.appendChild(setRandomizeC1);

	setRowRandomize.appendChild(setRandomizeC2);

	

	//2nd option: delete temporary list

	var setRowDelTList = dom.cn('tr');

	

	var setTListC1 = dom.cn('td');

	setTListC1.width = 20;

	

	TListButton = createInputButton("checkbox", 0, setDelTList);

	var TList = GM_getValue("DelTList_" + suffixGlobal, 0);

	if (TList == 1) {

		TListButton.checked = true;

	}

	

	setTListC1.appendChild(TListButton);

	

	var setTListC2 = dom.cn('td');

	setTListC2.innerHTML = T('SETDELTLIST');

	

	setRowDelTList.appendChild(setTListC1);

	setRowDelTList.appendChild(setTListC2);

	

	//3rd option: read reports to make a priority queue

	var setRowReadRep = dom.cn('tr');

	

	var setReadRepC1 = dom.cn('td');

	setReadRepC1.width = 20;

	

	ReadRepButton = createInputButton("checkbox", 0, setReadRep);

	var ReadRep = GM_getValue("ReadRep_" + suffixGlobal, 0);

	if (ReadRep == 1) {

		ReadRepButton.checked = true;

	}

	

	setReadRepC1.appendChild(ReadRepButton);

	

	var setReadRepC2 = dom.cn('td');

	setReadRepC2.innerHTML = T('SETREADREP');

	

	setRowReadRep.appendChild(setReadRepC1);

	setRowReadRep.appendChild(setReadRepC2);

	

	//4th option: skipping of Villages

	var setRowVilSkip = dom.cn('tr');

	

	var setVilSkipC1 = dom.cn('td');

	setVilSkipC1.width = 20;

	

	SkipButton = createInputButton("checkbox", 0, setVillageSkipping);

	var vilSkip = GM_getValue("VillageSkipping_" + suffixGlobal, 0);

	if (vilSkip == 1) {

		SkipButton.checked = true;

	}

	

	setVilSkipC1.appendChild(SkipButton);

	

	var setVilSkipC2 = dom.cn('td');

	setVilSkipC2.innerHTML = T('SETVILSKIP');

	

	setRowVilSkip.appendChild(setVilSkipC1);

	setRowVilSkip.appendChild(setVilSkipC2);

	

	

	//5th option: marking of Farms

	var setRowFarmMark = dom.cn('tr');

	

	var setFarmMarkC1 = dom.cn('td');

	setFarmMarkC1.width = 20;

	

	farmMarkButton = createInputButton("checkbox", 0, setFarmMarking);

	var farmMark = GM_getValue("farmMarking_" + suffixGlobal, 0);

	if (farmMark == 1) {

		farmMarkButton.checked = true;

	}

	

	setFarmMarkC1.appendChild(farmMarkButton);

	

	var setFarmMarkC2 = dom.cn('td');

	setFarmMarkC2.innerHTML = T('FARMMARKING');

	

	setRowFarmMark.appendChild(setFarmMarkC1);

	setRowFarmMark.appendChild(setFarmMarkC2);
	
	

	//6th option: Adjust Troop Count

	var setRowDynamicTroopCount = dom.cn('tr');
	

	var setDynamicTroopCountC1 = dom.cn('td');

	setDynamicTroopCountC1.width = 20;

	

	DynamicTroopCountButton = createInputButton("checkbox", 0, setDynamicTroopCount);

	var DynamicTroopCount = GM_getValue("DynamicTroopCount_" + suffixGlobal, 0);

	if (DynamicTroopCount == 1) {

		DynamicTroopCountButton.checked = true;

	}

	

	setDynamicTroopCountC1.appendChild(DynamicTroopCountButton);

	

	var setDynamicTroopCountC2 = dom.cn('td');

	setDynamicTroopCountC2.innerHTML = T('DYNAMICTROOPCOUNT');

	

	setRowDynamicTroopCount.appendChild(setDynamicTroopCountC1);

	setRowDynamicTroopCount.appendChild(setDynamicTroopCountC2);

	

	

	// adding settingRows to the table

	settingsTable.appendChild(setRowRandomize);

	settingsTable.appendChild(setRowDelTList);

	settingsTable.appendChild(setRowReadRep);

	settingsTable.appendChild(setRowVilSkip);

	settingsTable.appendChild(setRowFarmMark);
	
	settingsTable.appendChild(setRowDynamicTroopCount);

	

	// add table

	tableCol.appendChild(settingsTable);

	

	

	tableRow.appendChild(tableCol);

		ftableBody.appendChild(tableRow); //add to table	

	}



	// end option row

	

	//second row

	tableRow = dom.cn("tr");

	tableRow.className = "cbg1";

	tableCol = dom.cn("td");

	tableCol.setAttribute("colspan", 16);

	

	tableCol.appendChild(createInputButton("submit", T('START_FARMING'),

			startEngine));

	tableRow.appendChild(tableCol);

	ftableBody.appendChild(tableRow); //adding the second row

	//third row

	tableRow = dom.cn("tr");

	tableRow.className = "cbg1";

	//start

	tableCol = dom.cn("td");

	tableCol.innerHTML = "<div style='cursor:help;' class='b' title='"

			+ T('START_M') + "'>S</div>";

	tableRow.appendChild(tableCol);

	tableCol = dom.cn("td");

	//tableCol.innerHTML = "<div style='cursor:pointer;' class='b' title='Select End Position'>E</div>";

	//tableCol.addEventListener("click",rp_removeEndIndex,false);

	tableCol.appendChild(createLinkButton("E", T('END_M'), rp_removeEndIndex));

	tableRow.appendChild(tableCol);

	tableCol = dom.cn("td");

	tableCol.innerHTML = "<div style='cursor:help;' class='b' title='"

			+ T('EDIT_M') + "'>E</div>";

	tableRow.appendChild(tableCol);

	tableCol = dom.cn("td");

	tableCol.innerHTML = "<div style='cursor:help;' class='b' title='"

			+ T('DELETE_M') + "'>D</div>";

	tableRow.appendChild(tableCol);

	tableCol = dom.cn("td");

	tableCol.width = "35%";

	tableCol.appendChild(createLinkButton(T('FARM') + " ↓",

			T('SORT_FARM'), sortFarms));

	tableRow.appendChild(tableCol);



	tableCol = dom.cn("td");

	tableCol.innerHTML = '<td><img src="img/x.gif" class="unit u' + user_race + '"></td>';

	tableRow.appendChild(tableCol);

	for (i = 1; i < 10; i++) {

		tableCol = dom.cn("td");

		tableCol.innerHTML = '<td><img src="img/x.gif" class="unit u' + (user_race + i)

				+ '"></td>';

		tableRow.appendChild(tableCol);

	}
	tableCol = dom.cn("td");

	tableCol.innerHTML = '<td><img src="img/x.gif" class="unit uhero"></td>';

	tableRow.appendChild(tableCol);

	ftableBody.appendChild(tableRow); //adding the 3rd row

	//add List

	

	//getting first farm in list for sIndex

	prioque = GM_getValue('priorityqueue'+ suffixLocal, '').split('>:)');

	fque = GM_getValue('farmqueue'+ suffixLocal, '').split('>:)');

	

	if (prioque.length >= 1 && prioque[0].length > 2)

	{

		var arr = prioque[0].split("|");

		var tX = arr[0].split(",")[0];

		var tY = arr[0].split(",")[1];

		var sIndex = getSindexFromXY(tX,tY, suffixLocal);

	} else if (fque.length >= 1 && fque[0].length > 2){

		var arr = fque[0].split("|");

		var tX = arr[0].split(",")[0];

		var tY = arr[0].split(",")[1];

		var sIndex = getSindexFromXY(tX,tY, suffixLocal);

	} else {

		sIndex = getStartIndex();

	}

		

	FM_log(4,"starting farmrows for: "+suffixLocal);

	farmList = GM_getValue("FarmList_" + suffixLocal, "");

	totalTroops = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

	if (farmList != "" && farmList != null) {

		farmList = farmList.split(">:)");

		var eIndex = getEndIndex();

		FM_log(3,"sIndex="+sIndex+"/eIndex="+eIndex);


		if (farmList.length > 0) {

			for (i = 0; i < farmList.length; i++) {

				if (maximize == 1) {

					tableRow = rp_createFarmRow(i, sIndex, eIndex);

					if (tableRow != null) {

						ftableBody.appendChild(tableRow);

					}

				} else { //the i have to count totalTroops here

					var arr = farmList[i].split("|");

					if (arr[7] == 'true') {

						arr[1] = arr[1].split(",");

						for (var j = 0; j < arr[1].length; j++) {

							totalTroops[j] += parseInt(arr[1][j]);

						}

					}

				}

			}

		}

	} else {

		tableCol = dom.cn("td");

		tableCol.setAttribute("colspan", 16);

		tableCol.innerHTML = "<div style='margin: auto;'>" + T('NO_FARM_YET')

				+ "</div>";

		ftableBody.appendChild(tableCol);

	}

	//bottom row

	tableRow = dom.cn("tr");

	tableRow.className = "cbg1";

	tableCol = dom.cn("td");

	tableCol.setAttribute("colspan", 5);

	//Optimize button

	img = dom.cn("img");

	img.src = image['OPTIMIZE'];

	img.title = T('OPTIMIZE_M');

	img.style.height = '16px';

	img.style.width = '16px';

	img.style.cursor = "pointer";

	Button = dom.cn("div");

	Button.setAttribute("style", "width:16px;float:left;");

	Button.appendChild(img);

	Button.addEventListener('click', function() {

				optimizeFarmsByDistance();

			}, 0);

	tableCol.appendChild(Button);

	//add space

	Button = dom.cn("div");

	Button.innerHTML = " ";

	Button.setAttribute("style", "width:5px;float:left;");

	tableCol.appendChild(Button);

	//Import/Export Button

	img = dom.cn("img");

	img.src = image['IM_EXPORT'];

	img.title = T('LOCAL_IM_EX_M');

	img.style.height = '16px';

	img.style.width = '16px';

	img.style.cursor = "pointer";

	Button = dom.cn("div");

	Button.setAttribute("style", "width:16px;float:left;");

	Button.appendChild(img);

	Button.addEventListener('click', function() {

				importExport();

			}, 0);

	tableCol.appendChild(Button);

	//add space

	Button = dom.cn("div");

	Button.innerHTML = " ";

	Button.setAttribute("style", "width:5px;float:left;");

	tableCol.appendChild(Button);

	//globalImportExport

	img = dom.cn("img");

	img.src = image['GIM_EXPORT'];

	img.title = T('GLOBAL_IM_EX_M');

	img.style.height = '16px';

	img.style.width = '16px';

	img.style.cursor = "pointer";

	Button = dom.cn("div");

	Button.setAttribute("style", "width:16px;float:left;");

	Button.appendChild(img);

	Button.addEventListener('click', function() {

				globalImportExport();

			}, 0);

	tableCol.appendChild(Button);

	//add space

	Button = dom.cn("div");

	Button.innerHTML = " ";

	Button.setAttribute("style", "width:5px;float:left;");

	tableCol.appendChild(Button);

	//Delete Farm list Button	

	img = dom.cn("img");

	img.src = image['DELTEMPLIST'];

	img.title = T('DELTEMPLIST');

	img.style.height = '16px';

	img.style.width = '16px';

	img.style.cursor = "pointer";

	Button = dom.cn("div");

	Button.setAttribute("style", "width:16px;float:left;");

	Button.appendChild(img);

	Button.addEventListener('click', function() {

				clearque();

				alert("Farmlist and Prioritylist deleted");

			}, 0);

	tableCol.appendChild(Button);

	//add space

	Button = dom.cn("div");

	Button.innerHTML = " ";

	Button.setAttribute("style", "width:5px;float:left;");

	tableCol.appendChild(Button);

	//Settings Button

	img = dom.cn("img");

	img.src = image['SETTINGS'];

	img.title = T('UPDATE_SETTINGS');

	img.style.height = '16px';

	img.style.width = '16px';

	img.style.cursor = "pointer";

	Button = dom.cn("div");

	Button.setAttribute("style", "width:16px;float:left;");

	Button.appendChild(img);

	Button.addEventListener('click', function() {

				min_max_settings();

			}, 0);

	tableCol.appendChild(Button);	

	//append the row in the table

	tableRow.appendChild(tableCol);



	for (i = 0; i < 11; i++) {

		tableCol = dom.cn("td");

		tableCol.innerHTML = totalTroops[i];

		tableRow.appendChild(tableCol);

	}

	ftableBody.appendChild(tableRow);

	farmTable.appendChild(ftableBody);



	var container = dom.get("content");

	container.appendChild(farmTable);

	

}

function rp_createFarmRow(index, sIndex, eIndex) {

	FM_log(3,"rp_createFarmRow() called");

	var arr = farmList[index].split("|");

	var troops = arr[1], i;

	//alert(troops);

	if (!(troops == null || troops == "")) {

		var tableRow = dom.cn("tr"); //the row

		FM_log(3,"rp_createFarmRow: Row Create Start");

		if (index % 2 == 1) {

			tableRow.style.backgroundColor = "#F8F8F0";

		}

		if (arr[7] == "false") {



			tableRow.className = "inactive";

		}

		var tableCol = dom.cn("td"); //cell 1

		//create start radio button

		var Button = createInputButton("radio", index);

		Button.name = "StartIndex";

		Button.addEventListener("click", function() {

					rp_setStartIndex(index);

				}, false);

		if (sIndex == index)

			Button.checked = true;

		tableCol.appendChild(Button);

		tableRow.appendChild(tableCol); // add the cell



		tableCol = dom.cn("td"); //cell 2

		//create End radio button

		Button = createInputButton("radio", index);

		Button.name = "EndIndex";

		Button.addEventListener("click", function() {

					rp_setEndIndex(index);

				}, false);

		if (eIndex == index)

			Button.checked = true;

		tableCol.appendChild(Button);

		tableRow.appendChild(tableCol); // add the cell



		var img;

		//create Edit button

		img = dom.cn("img");

		img.src = image['EDIT'];

		img.title = T('EDIT_FARM');

		img.setAttribute("style",

				"height: 14px; width:14px; cursor: 'pointer';");

		Button = dom.cn("div");

		Button.appendChild(img);

		Button.addEventListener('click', createEditFarmCallback(index), 0); //adding clicking event

		tableCol = dom.cn("td");

		tableCol.appendChild(Button);

		tableRow.appendChild(tableCol);



		//create Delete button

		img = dom.cn("img");

		img.src = image['DELETE'];

		img.title = T('DELETE_FARM');

		img.setAttribute("style",

				"height: 14px; width:14px; cursor: 'pointer';");

		Button = dom.cn("div");

		Button.appendChild(img);

		//Button.addEventListener("mouseup", function(this){moveEditFarmBox(this)},0);

		Button.addEventListener('click', createRemoveFarmCallback(index), 0); //adding clicking event

		tableCol = dom.cn("td");

		tableCol.appendChild(Button);

		tableRow.appendChild(tableCol);

		

		//Farm

		tableCol = dom.cn("td");

		var xy = arr[0].split(",");

		var fvillageId = xy2id(parseInt(xy[0]), parseInt(xy[1]));

		//alert(fvillageId);

		//alert(arr[3]);

		if(arr[6]!="$") {

		tableCol.innerHTML = "<div style='text-align:left;'>[" + index

				+ "] "

				/*+"<a href='spieler.php?uid="+arr[4]+"'>"+E2C(arr[3])+"</a> "*/

				+ "<a href='/karte.php?d=" + fvillageId + "&c=" + arr[6]

				+ "' title='" + E2C(arr[3]) + " : " + E2C(arr[5]) + "'>("

				+ xy[0] + "|" + xy[1] + ")</a>" + "</div>";

		} else {tableCol.innerHTML = "<div style='text-align:left;'>[" + index

				+ "] "

				+ "<a href='/karte.php?z=" + fvillageId + "' title='" + E2C(arr[3]) + " : " + E2C(arr[5]) + "'>("

				+ xy[0] + "|" + xy[1] + ")</a>" + "</div>";

		}

		tableRow.appendChild(tableCol);



		troops += " ";

		troops = troops.split(',');

		FM_log(3,"rp_createFarmRow: troops Get splited by comma");

		for (i = 0; i <= 10; i++) {

			tableCol = dom.cn("td");

			tableCol.innerHTML = troops[i];

			if (arr[7] == 'true') { //only count active troops

				totalTroops[i] += parseInt(troops[i]);

			}

			tableRow.appendChild(tableCol);

		}

		FM_log(3,"rp_createFarmRow: Returing the row");

		return tableRow;

	} else {

		if (confirm(index + " " + T('INVALID_FARM'))) {

			farmRemove(index);

		}

		return null;

	}

}

function createLinkButton(text, title, jsFunction) {

	var button = dom.cn("a");

	button.href = "javascript:void(0)";

	button.innerHTML = text;

	button.title = title;

	if (jsFunction != null) {

		button.addEventListener('click', jsFunction, false);

	}

	return button;

}

function createInputButton(type, value, jsFunction) {

	var inputButton = dom.cn("input");

	inputButton.type = type; // type bepalen

	inputButton.value = value;

	if (jsFunction != null) {

		inputButton.addEventListener('click', jsFunction, false);

	}

	return inputButton;

}

function villageCheckBox(event) {

	FM_log(3,"villageCheckBox() called");

	//alert(event.currentTarget.id);

	var cb = event.currentTarget;

	var vList = GM_getValue("FarmerVillages_" + suffixGlobal, "");

	var i;

	var vid = cb.id.split("_")[1];

	var newList = "";

	if (cb.checked) { //selected

		if (vList != "" && vList != null) {

			vList = vList.split(",");

			for (i = 0; i < vList.length; i++) {

				if (vList[i] == vid)

					return;

				newList += vList[i] + ",";

			}

		}

		newList += vid;

	} else {//deselect

		if (vList == "" || vList == null)

			return;

		vList = vList.split(",");

		for (i = 0; i < vList.length; i++) {

			if (vList[i] != vid) {

				if (newList != "")

					newList += ",";

				newList += vList[i];

			}

		}

	}

	GM_setValue("FarmerVillages_" + suffixGlobal, newList);

}



//utility functions
/*
function FM_log(level, text) {

	if(false) {

		alert(text);

	}

}
*/
function FM_log(level, msg){
	if (level <= logLevel) {
		var ld = new Date(); 
		GM_log(msg);
		}
};

function getNumber(tekst) {



	//alert(tekst.indexOf("'")+1+"      "+tekst.lastIndexOf("'"));

	if ((tekst.indexOf("=") + 1) == 0 && tekst.lastIndexOf(";") == -1) {

		return 0;

	} else {

		return tekst.substring(tekst.indexOf("=") + 1, tekst.indexOf(";"));

	}

}

function Random(minimum, maximum) {

	if (minimum == null || maximum == null) {

		minimum = minWait;

		maximum = maxWait;

	}

	/*var rand=Math.round(Math.random()*maximum);

	rand = rand<minimum ? minimum : rand;

	rand = rand>maximum ? maximum : rand;

	return rand;*/

	var range = maximum - minimum + 1;

	return (Math.floor(Math.random() * Math.pow(10, ("" + range).length)) % range) + parseInt(minimum);



}

function createEditFarmCallback(itemToEdit) {

	FM_log(3,"createEditFarmCallback("+itemToEdit+") called");

	return function(event) {

		editFarm(itemToEdit, event);

	}

}

function createRemoveFarmCallback(sequence) {

	return function() {

		farmRemove(sequence);

	}

}

function regxRemoveAll(str, regx, newVal) {

	if (newVal == null)

		newVal = "";

	while (regx.test(str)) {

		str = str.replace(regx, newVal);

	}

	return str;

}

function globeDistance(a, b) { //calculate globe distance

	var dist1 = (a > b) ? Math.abs(a - b) : Math.abs(b - a);

	var dist2 = (a > b) ? (Math.abs(400 - a) + Math.abs(-400 - b)) : (Math

			.abs(400 - b) + Math.abs(-400 - a));

	var distFinal = (dist1 < dist2) ? dist1 : dist2;

	return distFinal;

}

function coordDistXYtoXY(x1, y1, x2, y2) { //calculate distance between two villages

	var distX = globeDistance(x1, x2);

	var distY = globeDistance(y1, y2);

	var dist = Math.sqrt((distX * distX) + (distY * distY));

	return dist;

}

function trim(str, chars) {

	return trimL(trimR(str, chars), chars);

}

function trimL(str, chars) {

	chars = chars || "\\s";

	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");

}

function trimR(str, chars) {

	chars = chars || "\\s";

	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");

}

function C2E(str) { //encode characters to HTML safe code (by Alberto Biamino)

	str = str.replace(/&/g, '&');

	str = str.replace(/'/g, ''');

	str = str.replace(/"/g, '"');

	str = str.replace(/\\/g, '\');

	var acc = '';

	for (var i = 0; i < str.length; i++) {

		if ((str.charCodeAt(i) > 31 && str.charCodeAt(i) < 127)

				&& str.charAt(i) != '|')

			acc += str.charAt(i)

		else

			acc += '&#' + str.charCodeAt(i) + ';';

	}

	return acc;

}

function E2C(str) { //decode HTML safe code to characters (by Alberto Biamino)

	/*str = str.split(";");

	for(var i=0; i<str.length; i++){

		if(str[i].charAt(0)=='&' && str[i].charAt[1]=='#'){

			str[i] = str[i].replace(/&#([0-9]+);/g, '$1');

			str[i] = String.fromCharCode(str[i]);

		}

	}

	return str.join('');*/

	str = str.replace(/(&#[0-9]+;)/g, '\n$1\n');

	str = str.replace(/\n\n/g, '\n');

	spl = str.split('\n');

	for (var i = 0; i < spl.length; i++) {

		if (spl[i].charAt(0) == '&') {

			spl[i] = spl[i].replace(/&#([0-9]+);/g, '$1');

			spl[i] = String.fromCharCode(spl[i]);

		}

	}

	str = spl.join('');

	return str;

}



//DOM functions

function DOMUtils(doc, ctxt, html) { // from FranMod

	this.cn = function(tag, html) {

		var elem = this.document.createElement(tag);

		if (html)

			elem.innerHTML = html;

		return elem;

	}



	this.ct = function(text) {

		return this.document.createTextNode(text);

	}



	this.id = function(id) {

		return this.document.getElementById(id);

	}



	this.tag = function(tag) {

		return this.document.getElementsByTagName(tag);

	}



	this.xs = function(xpath) {

		var res = this.document.evaluate(xpath, this.context, null,

				XPathResult.FIRST_ORDERED_NODE_TYPE, null);

		return res.singleNodeValue;

	}



	this.xa = function(xpath) {

		var arr = [];

		var xpr = this.document.evaluate(xpath, this.context, null,

				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for (var i = 0; item = xpr.snapshotItem(i); i++)

			arr.push(item);

		return arr.length == 0 ? null : arr;

	}



	this.xo = function(xpath) {

		var ret = this.document.evaluate(xpath, this.context, null,

				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

		return ret; //no snapshot

	}

	this.find = function(xpath, xpres, doc) {

		if (!doc)

			doc = document;

		else if (typeof doc == 'string')

			doc = cn('div', doc);

		var ret = document.evaluate(xpath, doc, null, xpres, null);



		return xpres == XPFirst ? ret.singleNodeValue : ret;

	}

	this.get = function(id, doc) {

		if (!doc)

			doc = document;

		return doc.getElementById(id);

	}

	if (!doc)

		doc = document;

	if (!ctxt)

		ctxt = doc;

	if (html) {

		this.document = doc.implementation.createDocument('', '', null);

		this.context = doc.createElement('div');

		this.context.innerHTML = html;

		ansDoc.appendChild(this.context);

	} else {

		this.document = doc;

		this.context = ctxt;

	}

}

function find(xpath,xpres){

  var ret=document.evaluate(xpath,document,null,xpres,null);

  return  xpres==XPFirst ? ret.singleNodeValue : ret;

}



//language functions

function T(str) { //String Translation

	var name = str.toUpperCase();

	if (lang[name] != undefined) {

		return lang[name];

	} else {

		str = str.toLowerCase();

		return "^" + str.substr(0, 1).toUpperCase() + str.substr(1);

	}

}

function setLanguage() { //define language elements

	FM_log(3,"setLanguage() called");

	var ext = server.substring(server.lastIndexOf('.') + 1);

	//default English

	lang = {

		'UPDATE_M' : "Update",

		'UPDATE_M1' : "UserScripts.org not found.",

		'UPDATE_UNKNOWN' : "Version Number does not matched :",

		'UPDATE_LAST' : "You are using latest",

		'UPDATE_BETA' : "A New but BETA version is available",

		'UPDATE_NEW' : "A NEW Version is available",

		'UPDATE_NOW' : "You want to update now",


		'CONFIRM' : "Are you sure",

		'REMOVING' : "Removing",

		'SWITCH_V' : "Switching to village at",

		'AFTER' : "after",

		'SEC' : "second",

		'NO_VILLAGE' : "No other village to go!",

		'WAITING' : "Waiting",

		'BEFORE_RE' : "before recheck.",

		'ADD_FARM' : "You are going to add farm",

		'TROOP_CONFIG' : "Troop Configuration is",

		'ATTACK' : "Attack",

		'REINFORCE' : "Reinforce",

		'RAID' : "Raid",

		'ACTIVE_FARM' : "Active Farm",

		'CANCEL' : "Cancel",

		'SAVE' : "Save",

		'ADD_TO' : "Add to",

		'ADD_AS' : "Add as a farm",

		'GLOBAL_IM_EX_PROMPT' : "Copy All Village Data Or Paste Data from backup",

		'GLOBAL_IM_EX_M' : "Import or Export raw farm data For all village",

		'LOCAL_IM_EX_PROMPT' : "Copy the Data / Paste new Data",

		'LOCAL_IM_EX_M' : "Import or Export farm data of this village",

		'OPTIMIZE_DONE' : "Successfully done distance optimization",

		'OPTIMIZE_M' : "Optimize farms in selected villages based on distance.",

		'OPTIMIZE_SM' : "Going to Optimize All Farms In Selected Villages By their Distance",

		'INVALID_FARM' : "Farm's Troops setting is invalid! Remove it?",

		'DELETE_FARM' : "Delete this farm.",

		'EDIT_FARM' : "Edit this farm",

		'NO_FARM_YET' : "Set any village as your farm from Village Profile Page",

		'FARM' : "Farm",

		'SORT_FARM' : "Sort Farms By Distance form current village",

		'DELETE_M' : "Click the X icon to delete a farm",

		'EDIT_M' : "Click On the Edit Icon to edit a farm",

		'END_M' : "Select End Position from this column, Click here to remove EndIndex",

		'START_M' : "Select Start Position from this column",

		'START_FARMING' : "Start Farming from selected Villages",

		'MINIMIZE' : "Minimize",

		'MAXIMIZE' : "Maximize",

		'FARM_INACTIVE' : "Farm Set as Inactive",

		'ERROR' : "Error",

		'NOT_ENOUGH' : "Not Enough troops for the raid at",

		'AVAILABLE' : "Available",

		'NEEDED' : "Needed",

		'TROOPS_GONE' : "Troops On the Way to",

		'NEXT_FARM' : "Selecting Next Farm",

		'SUCCESS_COUNT' : "Total Successful sent count",

		'HALT_FARMING' : "Halt Farming",

		'MACHINE_RUNNING' : "Farming Machine Running",

		'CHANGE_VILLAGE' : "Trying to change current Village",

		'NO_FARM' : "No Farm Available",

		'NOT_FARMER' : "This is not a Farmer Village",

		'USED_TROOPS' : "Used Troops",

		'GOING_TO' : "Going to",

		'INSTALL_M1' : "Add New Farms from Village Profile Page",

		'INSTALL_M2' : "Happy Farming",

		'TRIBE_SELECT1' : "Your Tribe",

		'TRIBE_SELECT2' : "Please enter a correct Number for your Tribe type.",

		'TRIBE_SELECT3' : "You couldn't set your correct tribe, Setting Roman as default.",

		'ROMAN' : "Roman",

		'TEUTON' : "Teuton",

		'GAUL' : "Gaul",

		//Settings

		'SETRANDOMIZE' : "Randomize farming",

		'SETREADREP' : "Analize reports to make a priority queue",

		'SETDELTLIST' : "Delete temporary list when stopping",

		'DELTEMPLIST' : "Delete temporary list manually",

		'UPDATE_SETTINGS' : "Update settings",

		'SETVILSKIP' : "Activate village skipping",

		'FARMMARKING' : "Mark farms in map",
		
		'DYNAMICTROOPCOUNT' : "Dynamic Troops"

	}

	//for other language

	if (ext == "cz") { //Language:Czech, Translator : Rypi

		lang = {

			'UPDATE_M' : "Aktualizovat",

			'UPDATE_M1' : "UserScripts.org nenalezeno.",

			'UPDATE_UNKNOWN' : "Verze se neshodují :",

			'UPDATE_LAST' : "Používáš poslední verzi",

			'UPDATE_BETA' : "Je dostupná nová BETA verze",

			'UPDATE_NEW' : "Je dostupná nová verze",

			'UPDATE_NOW' : "Chceš aktualizovat teď",

			'CONFIRM' : "Jsi si jistý",

			'REMOVING' : "Odebírání",

			'SWITCH_V' : "Prepínám vesnici na",

			'AFTER' : "za",

			'SEC' : "sekund",

			'NO_VILLAGE' : "Žádná další vesnice!",

			'WAITING' : "Cekám",

			'BEFORE_RE' : "pred kontrolou.",

			'ADD_FARM' : "Pridávám farmu",

			'TROOP_CONFIG' : "Konfigurace jednotek je",

			'ATTACK' : "Útok",

			'REINFORCE' : "Podpora",

			'RAID' : "Loupež",

			'ACTIVE_FARM' : "Aktivní farma",

			'CANCEL' : "Storno",

			'SAVE' : "Uložit",

			'ADD_TO' : "Pridat do",

			'ADD_AS' : "Pridat jako farmu",

			'GLOBAL_IM_EX_PROMPT' : "Kopírovat / Vložit data všech vesnic",

			'GLOBAL_IM_EX_M' : "Importovat, Exportovat data všech vesnic",

			'LOCAL_IM_EX_PROMPT' : "Kopírovat / Vložit data",

			'LOCAL_IM_EX_M' : "Importovat, Exportovat data této vesnice",

			'OPTIMIZE_DONE' : "Úspešne provedena optimalizace vzdálenosti",

			'OPTIMIZE_M' : "Optimalizuj farmy ve vybraných vesnicích podle vzdálenosti.",

			'OPTIMIZE_SM' : "Budu optimalizovat všechny farmy ve vybraných vesnicích podle vzdálenosti",

			'INVALID_FARM' : "Nastavení farmy je neplatné! Odebrat?",

			'DELETE_FARM' : "Smazat farmu",

			'EDIT_FARM' : "Upravit farmu",

			'NO_FARM_YET' : "Nastav si nejakou farmu (prehled cizý vesnice po kliknutí na mapu)",

			'FARM' : "Farma",

			'SORT_FARM' : "Seradit farmy podle vzdálenosti od soucasné vesnice",

			'DELETE_M' : "Klikni na X pro smazání farmy",

			'EDIT_M' : "Klikni na EDIT pro úpravu farmy",

			'END_M' : "Vyber koncovou pozici, klikne zde pro odebrání konce",

			'START_M' : "Vyber zacátecní pozici z tohoto sloupce",

			'START_FARMING' : "Zacít farmit od zvolené vesnice",

			'MINIMIZE' : "Minimalizovat",

			'MAXIMIZE' : "Maximalizovat",

			'FARM_INACTIVE' : "Farma nastavena jako neaktivní",

			'ERROR' : "Chyba",

			'NOT_ENOUGH' : "Málo jednotek pro vyloupení",

			'AVAILABLE' : "Dostupné",

			'NEEDED' : "Potreba",

			'TROOPS_GONE' : "Jednotky na ceste do",

			'NEXT_FARM' : "Vyber další farmu",

			'SUCCESS_COUNT' : "Celkem úspešne poslaných loupeží",

			'HALT_FARMING' : "Zastavit farmení",

			'MACHINE_RUNNING' : "Farming Machine je spuštená",

			'CHANGE_VILLAGE' : "Zkouším zmenit vesnici",

			'NO_FARM' : "Žádná farma není dostupná.",

			'NOT_FARMER' : "Tohle není Farmárská vesnice",

			'USED_TROOPS' : "Použité jednotky",

			'GOING_TO' : "Jdeš do",

			'INSTALL_M1' : "Pro pridání farmy ji najdi na mape a klikni na ni",

			'INSTALL_M2' : "Veselé farmení",

			'TRIBE_SELECT1' : "Jaké jsi národnosti",

			'TRIBE_SELECT2' : "Prosím zvol správné císlo.",

			'TRIBE_SELECT3' : "Nenastavil jsi správné císlo, Nastavuji si te jako Rímana.",

			'ROMAN' : "Roman",

			'TEUTON' : "Teuton",

			'GAUL' : "Gaul",

			//Settings
			
			'SETRANDOMIZE' : "Náhodné farmení",
			
			'SETREADREP' : "Analizovat reporty a udelat prioritní seznam",
			
			'SETDELTLIST' : "Smazat docasný seznam pri vypnutí",
			
			'DELTEMPLIST' : "Smazání docasného seznamu rucne",
			
			'UPDATE_SETTINGS' : "Nastavení",
			
			'SETVILSKIP' : "Preskakovat aktivní vesnici",
			
			'FARMMARKING' : "Ukazovat farmy na mape",

                        'DYNAMICTROOPCOUNT' : "Vojska Dynamics"
		}

	} else if (ext == "pt") { //Language:Portuguese, Translator : Fujis & MyDooMJr & Black_Blood

		lang = {

			'UPDATE_M' : "Actualizar",

			'UPDATE_M1' : "UserScripts.org não encontrado.",

			'UPDATE_UNKNOWN' : "A versão não coincide :",

			'UPDATE_LAST' : "última versão disponível",

			'UPDATE_BETA' : "Nova versão BETA disponível",

			'UPDATE_NEW' : "Nova versão disponível",

			'UPDATE_NOW' : "Actualizar já",

			'UPDATE_NOW' : "Actualizar ",

			'CONFIRM' : "Tem a certeza",

			'REMOVING' : "A Remover",

			'SWITCH_V' : "Substituir para a aldeia",

			'AFTER' : "Depois de",

			'SEC' : "Segundos",

			'NO_VILLAGE' : "Nã há aldeias disponiveis!",

			'WAITING' : "Em espera",

			'BEFORE_RE' : "Antes verificar novamente.",

			'ADD_FARM' : "Adicionar Farm",

			'TROOP_CONFIG' : "Configuração de tropas",

			'ATTACK' : "Ataque",

			'REINFORCE' : "Reforço",

			'RAID' : "Assalto",

			'ACTIVE_FARM' : "Farm activo",

			'CANCEL' : "Cancelar",

			'SAVE' : "Guardar",

			'ADD_TO' : "Adicionar",

			'ADD_AS' : "Adicionar como Farm",

			'GLOBAL_IM_EX_PROMPT' : "Copiar todos os dados da aldeia ou copiar de copia de segurança",

			'GLOBAL_IM_EX_M' : "Importar ou Exportar lista de Farms de todas as aldeias",

			'LOCAL_IM_EX_PROMPT' : "Copiar dados / Colar novos dados",

			'LOCAL_IM_EX_M' : "Importar ou Exportar lista de Farms desta aldeia",

			'OPTIMIZE_DONE' : "Melhoramento de distancias feito com sucesso",

			'OPTIMIZE_M' : "Melhorar Farms nas aldeias tendo em conta a distancia.",

			'OPTIMIZE_SM' : "Melhorar todos os Farms da aldeia seleccionada por distancias",

			'INVALID_FARM' : "Tropas invalidas! Deseja Remover?",

			'DELETE_FARM' : "Apagar Farm.",

			'EDIT_FARM' : "Editar farm",

			'NO_FARM_YET' : "Activar qualquer aldeia da página do perfil da aldeia",

			'FARM' : "Farm",

			'SORT_FARM' : "Dispor Farms pela distancia a aldeia actual",

			'DELETE_M' : "Clicar no icon X para apagar o Farm",

			'EDIT_M' : "Clicar no icon Editar para editar o Farm",

			'END_M' : "Seleccionar fim do Farming a partir desta coluna, clicar para remover fim",

			'START_M' : "Seleccionar inicio do Farming a partir desta coluna",

			'START_FARMING' : "Iniciar Farming das aldeias seleccionadas",

			'MINIMIZE' : "Minimizar",

			'MAXIMIZE' : "Maximizar",

			'FARM_INACTIVE' : "Farm Inactivo",

			'ERROR' : "Erro Detectado",

			'NOT_ENOUGH' : "Tropas insuficientes para efectuar assalto a",

			'AVAILABLE' : "Disponivel",

			'NEEDED' : "Necessário",

			'TROOPS_GONE' : "Tropas a caminho de",

			'NEXT_FARM' : "Seleccionar proximo Farm",

			'SUCCESS_COUNT' : "Número total de envios com sucesso",

			'HALT_FARMING' : "Parar Farming",

			'MACHINE_RUNNING' : "Programa de Farms activo",

			'CHANGE_VILLAGE' : "A tentar substituir a aldeia",

			'NO_FARM' : "Farm não disponivel",

			'NOT_FARMER' : "Esta não é a aldeia de um Farm",

			'USED_TROOPS' : "Tropas utilizadas",

			'GOING_TO' : "Enviadas para",

			'INSTALL_M1' : "Adicionar novo Farm 1- Mapa 2- Aldeia do Farm 3- Adicionar",

			'INSTALL_M2' : "Happy Farming : Have FUN :D!",

			'TRIBE_SELECT1' : "A tua tribo",

			'TRIBE_SELECT2' : "Por favor preenche o teu tipo de tribo.",

			'TRIBE_SELECT3' : "A Tribo seleccionada é incorrecta, activou Romanos como predefinição.",

			'ROMAN' : "Romanos",

			'TEUTON' : "Teutões",

			'GAUL' : "Gauleses",

			//Settings

			'SETRANDOMIZE' : "Farming aleatorio ",

			'SETREADREP' : "Analisar os relatórios para definir uma lista de prioridades",

			'SETDELTLIST' : "Apaga a lista quando parar",

			'UPDATE_SETTINGS' : "Actualizar defenições",
			
			'SETVILSKIP' : "Activar passagem à proxima aldeia",

            		'FARMMARKING' : "Marcar farms no mapa",
            
            		'DYNAMICTROOPCOUNT' : "Tropas Dinamicas"

		}

	} else if (ext == "pl") { //Language:Polish, Translator : Dungaar

		lang = {

			'UPDATE_M' : "Aktualizuje",

			'UPDATE_M1' : "Nie znaleziono UserScripts.org",

			'UPDATE_UNKNOWN' : "Niewlasciwa wersja :",

			'UPDATE_LAST' : "Uzywasz najnowszej wersji",

			'UPDATE_BETA' : "Nowa wersja BETA jest dostepna",

			'UPDATE_NEW' : "Jest dostepna NOWA wersja",

			'UPDATE_NOW' : "Chcesz zaktualizowac teraz",

			'CONFIRM' : "Jestes pewien",

			'REMOVING' : "Usuwanie",

			'SWITCH_V' : "Zmiana wioski na",

			'AFTER' : "za",

			'SEC' : "sekund",

			'NO_VILLAGE' : "Nie ma zadnej wolnej wioski!",

			'WAITING' : "Czekam",

			'BEFORE_RE' : "przed ponownym sprawdzeniem.",

			'ADD_FARM' : "Zamierzasz dodac farme",

			'TROOP_CONFIG' : "Konfiguracja jednostek to",

			'ATTACK' : "Atak",

			'REINFORCE' : "Posilki",

			'RAID' : "Grabiez",

			'ACTIVE_FARM' : "Aktywna farma",

			'CANCEL' : "Anuluj",

			'SAVE' : "Zapisz",

			'ADD_TO' : "Dodaj do",

			'ADD_AS' : "Dodaj jako farme",

			'GLOBAL_IM_EX_PROMPT' : "Skopiuj dane ze wszystkich wiosek lub wklej kopie zapasowa",

			'GLOBAL_IM_EX_M' : "Import lub Eksport danych dla wszystkich wiosek",

			'LOCAL_IM_EX_PROMPT' : "Skopiuj dane / Wklej nowe dane",

			'LOCAL_IM_EX_M' : "Import lub Eksport danych dla tej wioski",

			'OPTIMIZE_DONE' : "Zoptymalizowano wedlug odleglosci",

			'OPTIMIZE_M' : "Zoptymalizuj farmy wedlug odleglosci.",

			'OPTIMIZE_SM' : "Optymalizacja farm wedlug odleglosci",

			'INVALID_FARM' : "Nieprawidlowe jednostki w osadzie! Usunac?",

			'DELETE_FARM' : "Usun farme",

			'EDIT_FARM' : "Edytuj farme",

			'NO_FARM_YET' : "Ustaw farmy w profilach wiosek",

			'FARM' : "Farma",

			'SORT_FARM' : "Sortuj farmy wedlug odleglosci od tej wioski",

			'DELETE_M' : "Kliknij X aby usunac farme",

			'EDIT_M' : "Kliknij na ikonie edycji aby edytowac farme",

			'END_M' : "Wybierz ostatnia atakowana wioske lub kliknij tutaj aby skrypt dzialal bez przerwy",

			'START_M' : "Wybierz pierwsza atakowana wioske",

			'START_FARMING' : "Rozpocznij farmienie od zaznaczonej wioski",

			'MINIMIZE' : "Minimalizuj",

			'MAXIMIZE' : "Maksymalizuj",

			'FARM_INACTIVE' : "Farma ustawiona jako nieaktywna",

			'ERROR' : "Blad",

			'NOT_ENOUGH' : "Brakuje jednostek do grabiezy",

			'AVAILABLE' : "Dostepne",

			'NEEDED' : "Potrzebne",

			'TROOPS_GONE' : "Jednostki w drodze do",

			'NEXT_FARM' : "Wybieranie kolejnej farmy",

			'SUCCESS_COUNT' : "W sumie wyslano",

			'HALT_FARMING' : "Zatrzymaj",

			'MACHINE_RUNNING' : "Skrypt uruchomiony",

			'CHANGE_VILLAGE' : "Pr?buje zmienic na inna wioske",

			'NO_FARM' : "Nie ma dostepnych zadnych farm",

			'NOT_FARMER' : "To nie jest wioska do atak?w",

			'USED_TROOPS' : "Uzyte jednostki",

			'GOING_TO' : "Wykonuje",

			'INSTALL_M1' : "Dodaj nowe farmy w profilach wiosek",

			'INSTALL_M2' : "Milego farmienia :)",

			'TRIBE_SELECT1' : "Wybierz nacje",

			'TRIBE_SELECT2' : "Prosze wpisac poprawny numer nacji.",

			'TRIBE_SELECT3' : "Nie bylo mozliwe wybranie poprawnej nacji, ustawiam domyslnie rzymian.",

			'ROMAN' : "Rzymianie",

			'TEUTON' : "Germanie",

			'GAUL' : "Galowie",

			//Settings

			'SETRANDOMIZE' : "Randomize Rolnictwa",

			'SETREADREP' : "Analizujemy raporty do kolejki priorytetowe",

			'SETDELTLIST' : "Usun tymczasowe zatrzymanie, kiedy lista",

			'UPDATE_SETTINGS' : "Update Settings",
			
			'SETVILSKIP' : "Wlacz omijajac wies",

           		'FARMMARKING' : "Mark gospodarstw w map",
		
           		'DYNAMICTROOPCOUNT' : "Dynamiczny Troops"
	


		}

	} else if (ext == "hr" || ext == "rs" || ext == "ba") { //Language:Hrvatski, Srpski and Bosanski, Translator : Coly

		lang = {

			'UPDATE_M' : "Ukljuciti",

			'UPDATE_M1' : "UserScripts.org nije pronađen.",

			'UPDATE_UNKNOWN' : "Broj verzije nije važeći:",

			'UPDATE_LAST' : "Vi koristite zadnju verziju",

			'UPDATE_BETA' : "Nova beta verzija je dostupna",

			'UPDATE_NEW' : "NOVA verzija je dostupna",

			'UPDATE_NOW' : "Dali želita instalirati sad",

			'CONFIRM' : "Dali ste sigurni",

			'REMOVING' : "Uklanjanje",

			'SWITCH_V' : "Prebacivanje na slijedece selo",

			'AFTER' : "Poslije",

			'SEC' : "Sekunde",

			'NO_VILLAGE' : "Slijedece selo nije prondeno",

			'WAITING' : "Cekanje",

			'BEFORE_RE' : "Ponovna provijera prije nego.",

			'ADD_FARM' : "Idite dodat farme",

			'TROOP_CONFIG' : "Vojska Konfiguracija je ",

			'ATTACK' : "Napad",

			'REINFORCE' : "Pojacanje",

			'RAID' : "Pljacka",

			'ACTIVE_FARM' : "Aktivna farma",

			'CANCEL' : "Odustani",

			'SAVE' : "sacuvaj farmu ",

			'ADD_TO' : "Dodaj u ",

			'ADD_AS' : "Dodaj kao farmu",

			'GLOBAL_IM_EX_PROMPT' : "Kopiraj sve podatke sela ili Zaljepi podatke iz sigurnosne kopije",

			'GLOBAL_IM_EX_M' : "ubaci ili izbaci podatke farma za sva sela",

			'LOCAL_IM_EX_PROMPT' : "Kopiraj podatke / Zaljepi nove podatke",

			'LOCAL_IM_EX_M' : "ubaci ili izbaci podatke farma za ovo selo",

			'OPTIMIZE_DONE' : "Uspje?no obaviti udaljenost optimizacija",

			'OPTIMIZE_M' : "Poredaj farme iz izabranog sela po udaljenosti",

			'OPTIMIZE_SM' : "Odlazak na Optimiziranej Svih farmi u Odabrane Naselja, Svojim Udaljenosti",

			'INVALID_FARM' : "Postavljena vojska za farmu nije ispravna! Ukloniti je?",

			'DELETE_FARM' : "Ukloni ovu farmu.",

			'EDIT_FARM' : "Uredi ovu farmu",

			'NO_FARM_YET' : "Postavite bilo koje selo kao svoju farmu iz svog odredenog sela",

			'FARM' : "Farma",

			'SORT_FARM' : "Sortiraj farme po daljini iz ovog sela",

			'DELETE_M' : "Kliknite na (x) da bi uklonili odredenu farmu",

			'EDIT_M' : "Kliknite na (Edit) ikonu da bi Uredili farme",

			'END_M' : "Izaberite poziciju u ovom stubcu, kliknite ovdje da uklonite (EndIndex)",

			'START_M' : "Izaberite pocetnu poziviju u ovom stubcu",

			'START_FARMING' : "Pocetak farmanja iz izabranog sela",

			'MINIMIZE' : "Minimiziraj",

			'MAXIMIZE' : "Maksimiziraj",

			'FARM_INACTIVE' : "Postavi farmu kao neaktivnu",

			'ERROR' : "Pogre?ka",

			'NOT_ENOUGH' : "Nemate dovoljno vojnika za napad na",

			'AVAILABLE' : "Dostupno",

			'NEEDED' : "Potrebno",

			'TROOPS_GONE' : "Vojska je na putu prema",

			'NEXT_FARM' : "Preacivanje slijedeca farma",

			'SUCCESS_COUNT' : "Ukupno uspje?nih poslanih napada",

			'HALT_FARMING' : "Prekini farmanje",

			'MACHINE_RUNNING' : "Farming Machine je pokrenut",

			'CHANGE_VILLAGE' : "Pokusaj preacivanja na slijedece selo",

			'NO_FARM' : "Farma nije raspolo?ljiva",

			'NOT_FARMER' : "Ovo nije famersko selo",

			'USED_TROOPS' : "Kori?tena vojska",

			'GOING_TO' : "Kretanje prema",

			'INSTALL_M1' : "Dodaj novu farmu za ovo selo",

			'INSTALL_M2' : "Happy Farming.pozdravite paula(coly) xD ",

			'TRIBE_SELECT1' : "tvoj narod?",

			'TRIBE_SELECT2' : "Molimo da unesete ispravnu Broj NAroda za svoju vrstu.",

			'TRIBE_SELECT3' : "Niste mogli postavit ispravno pleme,rimljane namjestite kao zadnje.",

			'ROMAN' : "Rimljani",

			'TEUTON' : "Teutonci",

			'GAUL' : "Gali",

			//Settings

			'SETRANDOMIZE' : "Slucajni Poljodjelstvo",

			'SETREADREP' : "Analize Izvješća napraviti red prioriteta",

			'SETDELTLIST' : "Brisanje privremenih popisa kad zaustavljanja",
			
			'DELTEMPLIST' : "Brisanje privremene liste ručno",

			'UPDATE_SETTINGS' : "Ažuriranje postavki",
			
			'SETVILSKIP' : "Aktiviraj naselje preskakivanje",
			
			'FARMMARKING' : "Označi farme u karti",

            		'DYNAMICTROOPCOUNT' : "Dynamic postrojbi"

		}

	} else if (ext == "it") { //Language:Italian, Translator : Snake

		lang = {

			'UPDATE_M' : "Aggiorna",

			'UPDATE_M1' : "UserScripts.org non trovato.",

			'UPDATE_UNKNOWN' : "La Versione non corrisponde :",

			'UPDATE_LAST' : "Hai già la Versione più Recente",

			'UPDATE_BETA' : "Nuova Versione BETA disponibile",

			'UPDATE_NEW' : "Nuova Versione disponibile",

			'UPDATE_NOW' : "Vuoi aggiornare ora",

			'CONFIRM' : "Conferma",

			'REMOVING' : "Sto Rimuovendo",

			'SWITCH_V' : "Cambiando villaggio:",

			'AFTER' : "dopo",

			'SEC' : " secondi",

			'NO_VILLAGE' : "Nessun altro Villaggio disponibile!",

			'WAITING' : "Aspetto",

			'BEFORE_RE' : "prima di ricontrollare.",

			'ADD_FARM' : "Stai aggiungendo una Farm",

			'TROOP_CONFIG' : "La configurazione delle Truppe ?",

			'ATTACK' : "Attacco",

			'REINFORCE' : "Rinforzo",

			'RAID' : "Raid",

			'ACTIVE_FARM' : "Farm Attiva",

			'CANCEL' : "Annulla",

			'SAVE' : "Salva",

			'ADD_TO' : "Aggiungi a",

			'ADD_AS' : "Aggiungi come Farm",

			'GLOBAL_IM_EX_PROMPT' : "Copia i Dati di Tutti i Villaggi o Incolla i Dati da un Backup",

			'GLOBAL_IM_EX_M' : "Importa o Esporta i Dati delle Farm per tutti i Villaggi",

			'LOCAL_IM_EX_PROMPT' : "Copy i Dati / Incolla nuovi Dati",

			'LOCAL_IM_EX_M' : "Importa o Esporta i Dati delle Farm per questo Villaggio",

			'OPTIMIZE_DONE' : "Ottimizzazione della distanza completata con Successo",

			'OPTIMIZE_M' : "Ottimizza le Farm per i Villaggi Selezioni per Distanza.",

			'OPTIMIZE_SM' : "Sto per Ottimizzare tutte le Farm nei Villaggi Selezionati per Distanza",

			'INVALID_FARM' : "Configurazione delle truppe della Farm invalide! Rimuoverla?",

			'DELETE_FARM' : "Cancella questa Farm.",

			'EDIT_FARM' : "Modifica questa Farm",

			'NO_FARM_YET' : "Imposta qualsiasi villaggio come Farm dal Profilo del Villaggio",

			'FARM' : "Farm",

			'SORT_FARM' : "Organizza Farm per Distanza dal Villaggio Attuale",

			'DELETE_M' : "Premi il Bottone X per cancellare una Farm",

			'EDIT_M' : "Premi il Bottone Modifica per modificare una Farm",

			'END_M' : "Seleziona la posizione Finale da questa colonna, Clicca Qu? per Rimuoverla",

			'START_M' : "Seleziona la posizione Iniziale da questa colonna",

			'START_FARMING' : "Inizia il Farming dai Villaggi Selezionati",

			'MINIMIZE' : "Minimizza",

			'MAXIMIZE' : "Ingrandisci",

			'FARM_INACTIVE' : "Farm Impostata come Inattiva",

			'ERROR' : "Errore",

			'NOT_ENOUGH' : "Non ci sono Abbastanza Truppe per il raid a",

			'AVAILABLE' : "Disponibili",

			'NEEDED' : "Necessarie",

			'TROOPS_GONE' : "Le truppe stanno partendo per",

			'NEXT_FARM' : "Seleziono la Prossima Farm",

			'SUCCESS_COUNT' : "Conteggio Totale degli Invii con Successo",

			'HALT_FARMING' : "Pausa Farming",

			'MACHINE_RUNNING' : "Farming Machine Running",

			'CHANGE_VILLAGE' : "Provo a Cambiare Villaggio",

			'NO_FARM' : "Nessuna Farm Disponibile",

			'NOT_FARMER' : "Questo non ? un Villaggio Farmer",

			'USED_TROOPS' : "Truppe Usate",

			'GOING_TO' : "Partendo Per",

			'INSTALL_M1' : "Aggiungi nuove Farm dal Profilo del Villaggio",

			'INSTALL_M2' : "Felice Farming",

			'TRIBE_SELECT1' : "La Tua Trib?",

			'TRIBE_SELECT2' : "Perfavore, inserisci il numero corretto per la Tua Trib?.",

			'TRIBE_SELECT3' : "Non hai inserito un numero Valido per la tua Trib?, Selezionati i Romani per default.",

			'ROMAN' : "Romani",

			'TEUTON' : "Teutoni",

			'GAUL' : "Galli",

			//Settings

			'SETRANDOMIZE' : "Randomize Agricoltura",

			'SETREADREP' : "Rapporti Analize a fare una coda di priorita",

			'SETDELTLIST' : "Elimina elenco temporaneo quando ci si ferma",
			
			'DELTEMPLIST' : "Eliminare manualmente la lista temporanea",

			'UPDATE_SETTINGS' : "Update Settings",
			
			'SETVILSKIP' : "Attiva villaggio salto",
			
			'FARMMARKING' : "Mark aziende nella cartina",

            		'DYNAMICTROOPCOUNT' : "Dynamic Truppe"

		}

	} else if (ext == "ru") { //Language:Russian Translator : System Failure

		lang = {

			'UPDATE_M' : "Обновить",

			'UPDATE_M1' : "UserScripts.org не найдено.",

			'UPDATE_UNKNOWN' : "Номер версии не совпадает :",

			'UPDATE_LAST' : "Вы используете последнюю",

			'UPDATE_BETA' : "Новая, БЕТА версия доступна",

			'UPDATE_NEW' : "Доступна новая версия",

			'UPDATE_NOW' : "Хотите обновить сейчас",

			'CONFIRM' : "Вы уверены",

			'REMOVING' : "Удаляю",

			'SWITCH_V' : "Переключаюсь к деревне в",

			'AFTER' : "после",

			'SEC' : " секунд",

			'NO_VILLAGE' : "Нет больше других деревень!",

			'WAITING' : "Ожидаю",

			'BEFORE_RE' : "до перепроверки.",

			'ADD_FARM' : " Вы собираетесь добавить целья для фарма ",

			'TROOP_CONFIG' : "Конфигурация войск",

			'ATTACK' : "Нападение",

			'REINFORCE' : "Подкрепление",

			'RAID' : "Набег",

			'ACTIVE_FARM' : "Активный фарм ",

			'CANCEL' : "Отменить",

			'SAVE' : "Сохранить",

			'ADD_TO' : "Добавить к",

			'ADD_AS' : "Добавить как цель для фарма",

			'GLOBAL_IM_EX_PROMPT' : "Скоприровать всю информацию по деревням или вставить информацию из резервной копии",

			'GLOBAL_IM_EX_M' : "Импортировать или экспортировать данные строки фарма для всех деревень",

			'LOCAL_IM_EX_PROMPT' : "Копировать данные / Вставить новые данные",

			'LOCAL_IM_EX_M' : " Импортировать или экспортировать фарм-данные для этой деревни ",

			'OPTIMIZE_DONE' : "Оптимизация расстояния успешно проведена",

			'OPTIMIZE_M' : " Оптимизировать фарм-цели в выбранных деревнях на основании расстояния.",

			'OPTIMIZE_SM' : " Собираюсь оптимизировать все фарм-цели в выбранных деревнях по их расстояниям.",

			'INVALID_FARM' : "Неверные настройки фарм-отряда! Удалить настройки?",

			'DELETE_FARM' : "Удалить эту фарм-цель.",

			'EDIT_FARM' : "Редактировать эту фарм-цель",

			'NO_FARM_YET' : " Установите любую деревню в качестве фарм-цели из страницы профиля деревни",

			'FARM' : "Фарм",

			'SORT_FARM' : "Сортировать фарм-цели по их удалению от текущей деревни.",

			'DELETE_M' : "Нажмите на значок Х чтобы удалить фарм-цель ",

			'EDIT_M' : "Нажмите на Редактировать, чтобы редактировать фарм-цель",

			'END_M' : " Выберите последнюю позицию в этой колонке, нажмите сдесь чтобы удалить EndIndex ",

			'START_M' : "Выберите стартовую позицию из этой колонки",

			'START_FARMING' : "Начать фарм из выбранных деревень",

			'MINIMIZE' : "Скрыть",

			'MAXIMIZE' : "Развернуть",

			'FARM_INACTIVE' : "Фарм переведен в активный режим",

			'ERROR' : "Ошибка",

			'NOT_ENOUGH' : "Не достаточно войск для набега на",

			'AVAILABLE' : "Доступно",

			'NEEDED' : "Необходимо",

			'TROOPS_GONE' : "Войска на пути в",

			'NEXT_FARM' : "Выбераю следующую цель для фарма",

			'SUCCESS_COUNT' : "Итого успешно послано",

			'HALT_FARMING' : "Остановить фарм ",

			'MACHINE_RUNNING' : "Farming Machine работает",

			'CHANGE_VILLAGE' : " Пытаюсь изменить текущую деревню ",

			'NO_FARM' : "Нет целей для фарма",

			'NOT_FARMER' : "Это не фарм-деревня ",

			'USED_TROOPS' : "Использованные войска ",

			'GOING_TO' : "Отправляю в ",

			'INSTALL_M1' : "Добавьте новые цели для фарма из страницы профиля деревни",

			'INSTALL_M2' : "Удачного фарма",

			'TRIBE_SELECT1' : "Ваш народ",

			'TRIBE_SELECT2' : " Пожалуйста введите корректное число для вашего народа.",

			'TRIBE_SELECT3' : "Вы не смогли установить правильный народ, устанавливаю Римляне по умолчанию.",

			'ROMAN' : "Римляне",

			'TEUTON' : "Германцы",

			'GAUL' : "Галлы",

			//Settings

			'SETRANDOMIZE' : "Рандомизировать цели",

			'SETREADREP' : "Проанализировать отчеты, для создания очереди упорядоченной по приоритету",

			'SETDELTLIST' : "Удалить временный список при остановке",
			
			'DELTEMPLIST' : "Удаление временных список вручную",

			'UPDATE_SETTINGS' : "Параметры обновления",
			
			'SETVILSKIP' : "Включить деревне пропуска",
			
			'FARMMARKING' : "Марк хозяйств на карте",
	
            		'DYNAMICTROOPCOUNT' : "Динамические войск"

		}

	} else if (ext == "net") { //Language:Espanhol, Translator : Royan

		lang = {

			'UPDATE_M' : "Actualizar",

			'UPDATE_M1' : "UserScripts.org no encontrado.",

			'UPDATE_UNKNOWN' : "La version no coincide :",

			'UPDATE_LAST' : "Ya tienes la ultima versión",

			'UPDATE_BETA' : "Nueva versión BETA disponible",

			'UPDATE_NEW' : "Nueva versión disponible",

			'UPDATE_NOW' : "Quieres actualizar ahora",

			'CONFIRM' : "Confirmar",

			'REMOVING' : "Borrando",

			'SWITCH_V' : "Cambiando ciudad en",

			'AFTER' : "despues",

			'SEC' : "segundo",

			'NO_VILLAGE' : "No hay m?s ciudades disponibles !",

			'WAITING' : "Esperando",

			'BEFORE_RE' : "Antes revisa.",

			'ADD_FARM' : "Vas a a?adir una granja",

			'TROOP_CONFIG' : "La configuraci?n de tropas es",

			'ATTACK' : "Ataque normal",

			'REINFORCE' : "Refuerzo",

			'RAID' : "Atraco",

			'ACTIVE_FARM' : "Activar granjeo",

			'CANCEL' : "Cancelar",

			'SAVE' : "Salvar",

			'ADD_TO' : "Anadir a",

			'ADD_AS' : "A?adir como granja",

			'GLOBAL_IM_EX_PROMPT' : "Copia o pega los datos de granjeo de todas las ciudades",

			'GLOBAL_IM_EX_M' : "Importar o Exportar raw datos de granjeo de todas las ciudades",

			'LOCAL_IM_EX_PROMPT' : "Copia los datos / pega los datos",

			'LOCAL_IM_EX_M' : "Importar o Exportar raw datos de granjeo de esta ciudad",

			'OPTIMIZE_DONE' : "Realizada optimizaci?n por distancia",

			'OPTIMIZE_M' : "Optimizar el granjeo en funci?n de la distancia.",

			'OPTIMIZE_SM' : "Optimizando el granjeo de las granjas seleccionadas en funci?n de su distancia",

			'INVALID_FARM' : "Configuraci?n de tropas de granjeo erronea! ?eliminar?",

			'DELETE_FARM' : "Borrar esta granja.",

			'EDIT_FARM' : "Editar esta granja",

			'NO_FARM_YET' : "Selecciona alguna ciudad como granja desde el perfil de las ciudades",

			'FARM' : "Granja",

			'SORT_FARM' : "Ordenar granjas por la distancia a la ciudad actual",

			'DELETE_M' : "Dar a la X para borrar la granja",

			'EDIT_M' : "Dar al boton de editar para editar la granja",

			'END_M' : "Selecciona posici?n final en esta columna, Dar aqui para borrar el marcador de posici?n final",

			'START_M' : "Selecciona posici?n inicial en esta columna",

			'START_FARMING' : "Empezar granjeo en las ciudades selecionadas",

			'MINIMIZE' : "Minimizar",

			'MAXIMIZE' : "Maximizar",

			'FARM_INACTIVE' : "Granja marcada inactiva",

			'ERROR' : "Error",

			'NOT_ENOUGH' : "Insuficientes tropas para mandar a",

			'AVAILABLE' : "Disponible",

			'NEEDED' : "Necesario",

			'TROOPS_GONE' : "Tropas en camino a",

			'NEXT_FARM' : "Seleccionando siguiente granja",

			'SUCCESS_COUNT' : "Contador total de granjeos",

			'HALT_FARMING' : "Pausar granjeo",

			'MACHINE_RUNNING' : "Farming Machine funcionando",

			'CHANGE_VILLAGE' : "Intentando cambiar de ciudad",

			'NO_FARM' : "Granjeo no disponible",

			'NOT_FARMER' : "Ciudad no granjera",

			'USED_TROOPS' : "Tropas usadas",

			'GOING_TO' : "Ir a",

			'INSTALL_M1' : "A?adir nuevas granjas desde el perfil de las ciudades",

			'INSTALL_M2' : "Feliz granjeo",

			'TRIBE_SELECT1' : "Tu tribu",

			'TRIBE_SELECT2' : "Por favor introduce el n?mero correspondiente a tu tribu.",

			'TRIBE_SELECT3' : "Imposible seleccionar tribu, selcionando Romanos por defecto.",

			'ROMAN' : "Romanos",

			'TEUTON' : "Germanos",

			'GAUL' : "Galos",

			//Settings

			'SETRANDOMIZE' : "Selección aleatoria de la agricultura",

			'SETREADREP' : "Analizar los informes para hacer una cola de prioridad",

			'SETDELTLIST' : "Eliminar la lista previa a la parada temporal",
			
			'DELTEMPLIST' : "Borrar lista temporal de forma manual",

			'UPDATE_SETTINGS' : "Actualización de la configuración",
			
			'SETVILSKIP' : "Activar pueblo sin pasar",
			
			'FARMMARKING' : "Marcos explotaciones en el mapa",

            		'DYNAMICTROOPCOUNT' : "Dinámica de las tropas"

		}

	}else if (ext == "ae") { //Language:arabic, Translator : kmmad1

		lang = {
'UPDATE_M' : "تحديث",

			'UPDATE_M1' : "UserScripts.orgلا يمكن العثور على",

			'UPDATE_UNKNOWN' : "رقم الاصدار غير مطابق:",

			'UPDATE_LAST' : "بحوذتك احدث اصدار",

			'UPDATE_BETA' : "يوجد اصدار جديد و لكن تجريبي.",

			'UPDATE_NEW' : "اصدار جديد متاح الان",

			'UPDATE_NOW' : "هل تود التحديث الان؟",

			'CONFIRM' : "تأكيد",

			'REMOVING' : "يتم الحذف",

			'SWITCH_V' : "سيتم تغيير القرية في:",

			'AFTER' : "بعد",

			'SEC' : "ثانية",

			'NO_VILLAGE' : "لايوجد قرية بديلة!",

			'WAITING' : "انتظار",

			'BEFORE_RE' : "قبل اعادة الفحص.",

			'ADD_FARM' : "سوف تقوم باضافة مزرعة جديدة",

			'TROOP_CONFIG' : "تصنيف القوات هو:",

			'ATTACK' : "هجوم كامل",

			'REINFORCE' : "مساندة",

			'RAID' : "هجوم للنهب",

			'ACTIVE_FARM' : "مزرعة عاملة",

			'CANCEL' : "الغاء",

			'SAVE' : "حفظ",

			'ADD_TO' : "اضافة الي",

			'ADD_AS' : "اضافة كمزرعة",

			'GLOBAL_IM_EX_PROMPT' : "انسخ بيانات جميع قراك أو الصق من ملف",

			'GLOBAL_IM_EX_M' : "تصدير او استيراد معلومات المزارع الاصلية لجميع القرى",

			'LOCAL_IM_EX_PROMPT' : "نسخ المعلومات / لصق المعلومات",

			'LOCAL_IM_EX_M' : "تصدير أو استيراد معلومات المزارع لهذة القرية",

			'OPTIMIZE_DONE' : "تم توزيع المزارع حسب المسافة من القرى بنجاح",

			'OPTIMIZE_M' : "توزيع المزارع على القرى المختارة حسب المسافة.",

			'OPTIMIZE_SM' : "سوف يتم توزيع المزارع على القرى حسب المسافة.",

			'INVALID_FARM' : "تصنيف الجيش لهذة المزرعة غير صالح! هل تريد الحذف؟",

			'DELETE_FARM' : "احذف هذة المزرعة.",

			'EDIT_FARM' : "عدل المزرعة.",

			'NO_FARM_YET' : "اضبط أي قرية لتكون مزرعة لك من صفحة هذة القرية.",

			'FARM' : "مزرعة",

			'SORT_FARM' : "رتب المزارع حسب مسافتها من القرية الحالية.",

			'DELETE_M' : "X لحذف المزرعة اضغط على ",

			'EDIT_M' : "اضغط على ايقونة تعديل, لتغيير معلومات المزرعة",

			'END_M' : "اختار مزرعة التوقف الأخيرة من هنا, أو اضغط هنا لعدم توقف النهب نهائيا",

			'START_M' : "اختار مزرعة البداية من هذا العمود",

			'START_FARMING' : "ابداء النهب من القرى المختارة",

			'MINIMIZE' : "تصغير",

			'MAXIMIZE' : "تكبير",

			'FARM_INACTIVE' : "المزرعة غير فعالة",

			'ERROR' : "خطأ",

			'NOT_ENOUGH' : "لايوجد قوات كافية للهجوم على:",

			'AVAILABLE' : "متاح",

			'NEEDED' : "مطلوب",

			'TROOPS_GONE' : "القوات في طريقها الي",

			'NEXT_FARM' : "المزرعة التالية",

			'SUCCESS_COUNT' : "عدد مرات الارسال بنجاح",

			'HALT_FARMING' : "توقف",

			'MACHINE_RUNNING' : " تعملFarming Machine ",

			'CHANGE_VILLAGE' : "احاول تغيير القرية الحالية",

			'NO_FARM' : "لا يوجد مزرعة متاحة",

			'NOT_FARMER' : "هذة ليست قرية مزارعة",

			'USED_TROOPS' : "القوي المستخدمة",

			'GOING_TO' : "ذاهب الى",

			'INSTALL_M1' : "اضف مزارع جديدة من صفحات القرى مباشرة",

			'INSTALL_M2' : "استمتع بالنهب",

			'TRIBE_SELECT1' : "قبيلتك",

			'TRIBE_SELECT2' : "برجاء ادخال الرقم الصحيح لقبيلتك.",

			'TRIBE_SELECT3' : "لم تستطع ادخال رقم قبيلتك الصحيحة. سوف يتم تعيين قبيلتك الرومان.",

			'ROMAN' : "رومان",

			'TEUTON' : "جرمان",

			'GAUL' : "الاغريق",

			//Settings

			'SETRANDOMIZE' : "الزراعة بطريقة عشوائية",

			'SETREADREP' : "اناليزي تقارير لجعل قائمة انتظار ذات الأولوية",

			'SETDELTLIST' : "حذف قائمة مؤقتة عندما وقف",
			
			'DELTEMPLIST' : "قائمة مؤقتة حذف يدويا",

			'UPDATE_SETTINGS' : "إعدادات التحديث",

            		'SETVILSKIP' : "تنشيط قرية تخطي",
			
			'FARMMARKING' : "مزارع مارك في الخريطة",

            		'DYNAMICTROOPCOUNT' : "دينامية القوات"
		}

	}else if (ext == "de") { //Language:German, Translator : Tequila/pixelgeek

		lang = {

			'UPDATE_M' : "Update",

			'UPDATE_M1' : "UserScripts.org nicht gefunden.",

			'UPDATE_UNKNOWN' : "Versions Nummer stimmt nicht überein :",

			'UPDATE_LAST' : "Du hast das Neuste",

			'UPDATE_BETA' : "Eine Neue Beta-Version ist verfügbar",

			'UPDATE_NEW' : "Eine Neue Version ist verfügbar",

			'UPDATE_NOW' : "Wollen Sie updaten?",

			'CONFIRM' : "Sind Sie sicher?",

			'REMOVING' : "Entfernen",

			'SWITCH_V' : "wechsel zu Dorf",

			'AFTER' : "später",

			'SEC' : "sekunden",

			'NO_VILLAGE' : "kein anderes Dorf verfügbar!",

			'WAITING' : "warte",

			'BEFORE_RE' : "before recheck.",

			'ADD_FARM' : "Farm hinzufügen",

			'TROOP_CONFIG' : "Truppen Einstellung",

			'ATTACK' : "Angriff",

			'REINFORCE' : "Unterstützung",

			'RAID' : "Raubzug",

			'ACTIVE_FARM' : "Aktive Farm",

			'CANCEL' : "Abbrechen",

			'SAVE' : "Speichern",

			'ADD_TO' : "Hinzufügen",

			'ADD_AS' : "Als Farm hinzufügen",

			'GLOBAL_IM_EX_PROMPT' : "Farmdaten kopieren oder einfügen",

			'GLOBAL_IM_EX_M' : "Importieren oder exportieren der roh Farmdaten aus allen Dörfern",

			'LOCAL_IM_EX_PROMPT' : "Daten kopieren / Neue Daten einfügen",

			'LOCAL_IM_EX_M' : "Importieren oder exportieren der Farmdaten aus diesem Dorf",

			'OPTIMIZE_DONE' : "Entfernungsoptimirung erfolgt",

			'OPTIMIZE_M' : "Optimiere alle Farmen im ausgewählten Dorf nach Entfernungen.",

			'OPTIMIZE_SM' : "Optimiere alle Farmen in den ausgewählten Dörfern nach Entfernungen",

			'INVALID_FARM' : "Die Truppeneinstellung ist ungültig! Entfernen?",

			'DELETE_FARM' : "Farm entfernen.",

			'EDIT_FARM' : "Farm bearbeiten",

			'NO_FARM_YET' : "Wähle ein beliebiges Dorf als Farm, in der Dorfansicht",

			'FARM' : "Farmen",

			'SORT_FARM' : "Sortiert die Farmen nach Enfernung im momentanen Dorf",

			'DELETE_M' : "x klicken um Farm zu löschen",

			'EDIT_M' : "Auf das Edit Icon klicken um eine Farm zu editieren",

			'END_M' : "Ende der Liste festlegen, Hier klicken um den EndIndex zu entfernen",

			'START_M' : "Anfang der Liste festlegen",

			'START_FARMING' : "Bei ausgewähltem Dorf mit farmen beginnen",

			'MINIMIZE' : "Minimieren",

			'MAXIMIZE' : "Maximieren",

			'FARM_INACTIVE' : "Farm als inaktiv ausgewählt",

			'ERROR' : "Fehler",

			'NOT_ENOUGH' : "Nicht genügend Truppen vorhanden",

			'AVAILABLE' : "Verfügbar",

			'NEEDED' : "werden gebraucht",

			'TROOPS_GONE' : "Truppen unterwegs",

			'NEXT_FARM' : "wähle nächste Farm aus",

			'SUCCESS_COUNT' : "Erfolgreich versendete Truppen",

			'HALT_FARMING' : "STOP",

			'MACHINE_RUNNING' : "Farm Maschine aktiviert",

			'CHANGE_VILLAGE' : "Versuche aktuelles Dorf zu wechseln",

			'NO_FARM' : "Keine Farm verfügbar",

			'NOT_FARMER' : "Dies ist kein Farmdorf",

			'USED_TROOPS' : "Benutzte Truppen",

			'GOING_TO' : "Wechsel zu",

			'INSTALL_M1' : "Neue Farmen vom Dorfprofil hinzufügen",

			'INSTALL_M2' : "Happy Farming",

			'TRIBE_SELECT1' : "Dein Volk",

			'TRIBE_SELECT2' : "Bitte die richtige Zahl für dein Volk eingeben.",

			'TRIBE_SELECT3' : "Du konntest nicht das richtige Volk einstellen, Römer wurden als Standart gewählt.",

			'ROMAN' : "Römer",

			'TEUTON' : "Germane",

			'GAUL' : "Gallier",

			//Settings

			'SETRANDOMIZE' : "Zufallsfarmen aktivieren",

			'SETREADREP' : "Berichte für die Erstellung einer Prioritätenliste analysieren",

			'SETDELTLIST' : "Temporäre Farmingliste löschen wenn FM gestoppt wird",

			'DELTEMPLIST' : "Temporäre Farmingliste manuell löschen",

			'UPDATE_SETTINGS' : "Einstellungen ändern",

			'SETVILSKIP' : "Dorfwechsel falls zuwenig Truppen vorhanden sind",

			'FARMMARKING' : "Farmen in Karte markieren",
			
			'DYNAMICTROOPCOUNT' : "Dynamic Troops"

		}

	} else if (ext == "cn") { //Language:简体中文,, Translator : congxz6688

		lang = {

			'UPDATE_M' : "升级",

			'UPDATE_M1' : "UserScripts.org 无法连接",

			'UPDATE_UNKNOWN' : "版本号不匹配 :",

			'UPDATE_LAST' : "你正在使用最新版",

			'UPDATE_BETA' : "一个新的Beta版可用",

			'UPDATE_NEW' : "一个新版本可用",

			'UPDATE_NOW' : "你现在要升级本脚本",

			'CONFIRM' : "确定吗",

			'REMOVING' : "移除",

			'SWITCH_V' : "将切换村庄至",

			'AFTER' : "请稍候",

			'SEC' : "秒",

			'NO_VILLAGE' : "没有其它村庄可切换",

			'WAITING' : "正在等待",

			'BEFORE_RE' : "在重新检测以前",

			'ADD_FARM' : "你正在添加你的羊",

			'TROOP_CONFIG' : "军队配置为",

			'ATTACK' : "攻击",

			'REINFORCE' : "增援",

			'RAID' : "掠夺",

			'ACTIVE_FARM' : "激活打羊行动",

			'CANCEL' : "取消",

			'SAVE' : "保存",

			'ADD_TO' : "添加到",

			'ADD_AS' : "存为肥羊",

			'GLOBAL_IM_EX_PROMPT' : "复制所有村庄数据或从备份中粘贴数据",

			'GLOBAL_IM_EX_M' : "为所有村子导入或导出肥羊数据",

			'LOCAL_IM_EX_PROMPT' : "复制数据或粘贴新数据",

			'LOCAL_IM_EX_M' : "导入或导出这个村子的数据",

			'OPTIMIZE_DONE' : "成功地进行了距离优化",

			'OPTIMIZE_M' : "以距离为基础优化打羊程序.",

			'OPTIMIZE_SM' : "将要在选中的村子里进行距离优化",

			'INVALID_FARM' : "打羊部队的设定无效，移除它?",

			'DELETE_FARM' : "删掉这一记录",

			'EDIT_FARM' : "编辑此羊",

			'NO_FARM_YET' : "你还没有设定属于自己的肥羊，赶快动手吧",

			'FARM' : "肥羊",

			'SORT_FARM' : "以当前村为标准，按距离给肥羊排序",

			'DELETE_M' : "按X删除羊",

			'EDIT_M' : "按编辑图标编辑羊",

			'END_M' : "从队列中选择结束点，按这里移除终点",

			'START_M' : "在队列中选择起始点",

			'START_FARMING' : "从选定的村庄开始打羊行动",

			'MINIMIZE' : "最小化",

			'MAXIMIZE' : "最大化",

			'FARM_INACTIVE' : "肥羊设置失效",

			'ERROR' : "计划暂时受阻",

			'NOT_ENOUGH' : "没有足够的军队攻击",

			'AVAILABLE' : "　可用",

			'NEEDED' : "需要",

			'TROOPS_GONE' : "正在派遣军队到",

			'NEXT_FARM' : "自动选择下一肥羊",

			'SUCCESS_COUNT' : "成功发送总计",

			'HALT_FARMING' : "中止打羊行动",

			'MACHINE_RUNNING' : "打羊机运行中",

			'CHANGE_VILLAGE' : "尝试改变当前村子",

			'NO_FARM' : "没有可用的羊",

			'NOT_FARMER' : "此村未参与打羊",

			'USED_TROOPS' : "正在调动军队",

			'GOING_TO' : "正在准备 －",

			'INSTALL_M1' : "小提示：你可以从敌村描述页把它添加为肥羊",

			'INSTALL_M2' : "尽情享受吧",

			'TRIBE_SELECT1' : "你的种族",

			'TRIBE_SELECT2' : "请输入一个正确的种族代码",

			'TRIBE_SELECT3' : "你未能正确设定你的种族，默认为罗马。",

			'ROMAN' : "罗马",

			'TEUTON' : "日尔曼",

			'GAUL' : "高卢",

			//Settings

			'SETRANDOMIZE' : "随机农业",

			'SETREADREP' : "极大的关联性报告，以优先队列",

			'SETDELTLIST' : "停车时删除临时名单",
			
			'DELTEMPLIST' : "手动删除临时名单",

			'UPDATE_SETTINGS' : "更新设置",
			
			'SETVILSKIP' : "跳过激活乡村",
			
			'FARMMARKING' : "在地图马克农场",

            		'DYNAMICTROOPCOUNT' : "动态部队"

		}

	}else if (ext == "id") { //Language:Indonesia, Translator : Abhy Boy

		lang = {

			'UPDATE_M' : "Update Script",

			'UPDATE_M1' : "UserScripts.org tidak ditemukan.",

			'UPDATE_UNKNOWN' : "Versi Update tidak sesuai :",

			'UPDATE_LAST' : "Script saat ini adalah yang terbaru",

			'UPDATE_BETA' : "Versi BETA yang baru sudah tersedia",

			'UPDATE_NEW' : "Versi yang baru sudah tersedia",

			'UPDATE_NOW' : "Anda ingin Update sekarang",

			'CONFIRM' : "Anda Yajin",

			'REMOVING' : "Menghapus",

			'SWITCH_V' : "Berpindah ke Desa yang lain pada ",

			'AFTER' : "setelah",

			'SEC' : "detik",

			'NO_VILLAGE' : "Tidak ada Desa lain lagi yang akan di serang!",

			'WAITING' : "Menunggu",

			'BEFORE_RE' : "sebelum cek ulang.",

			'ADD_FARM' : "Anda akan menambahkan daftar Serang",

			'TROOP_CONFIG' : "Konfigurasi serangan adalah ",

			'ATTACK' : "Menyerang Penuh",

			'REINFORCE' : "Bantuan",

			'RAID' : "Merampas",

			'ACTIVE_FARM' : "Aktif Diserang",

			'CANCEL' : "batal",

			'SAVE' : "Simpan",

			'ADD_TO' : "Tambahkan Ke",

			'ADD_AS' : "Ditambahkan Serangan",

			'GLOBAL_IM_EX_PROMPT' : "Gandakan data atau ganti dengan data yang baru",

			'GLOBAL_IM_EX_M' : "Import atau Export data raw untuk semua Desa",

			'LOCAL_IM_EX_PROMPT' : "Gandakan Data / Timpakan Data Baru",

			'LOCAL_IM_EX_M' : "Import atau Export data raw untuk Desa ini",

			'OPTIMIZE_DONE' : "Berhasil melakukan optimalisasi berdasar jarak",

			'OPTIMIZE_M' : "Optimalkan Serangan berdasar jarak.",

			'OPTIMIZE_SM' : "Mulai melakukan optimalisasi Serangan berdasar jarak",

			'INVALID_FARM' : "Seting Tentara tidak benar! hapus ini ?",

			'DELETE_FARM' : "Hapus data ini.",

			'EDIT_FARM' : "Ubah data ini",

			'NO_FARM_YET' : "Ubah sebuah desa menjadi jajahan Anda dari Halaman Profile Desa",

			'FARM' : "Jajah",

			'SORT_FARM' : "urutkan berdasarkan jarak mulai dari data ini",

			'DELETE_M' : "Tekan tanda X untuk menghapus Data Jajahan",

			'EDIT_M' : "Tekan tanda X untuk merubah Data Jajahan",

			'END_M' : "Pilih Posisi terakhir pada data, Tekan disini untuk membuang tanda",

			'START_M' : "Pilih posisi mulai di sini",

			'START_FARMING' : "Mulai menjajah dari Desa terpilih",

			'MINIMIZE' : "Kecilkan",

			'MAXIMIZE' : "Besarkan",

			'FARM_INACTIVE' : "jajahan diset tidak aktif",

			'ERROR' : "Kesalahan",

			'NOT_ENOUGH' : "Tidak cukup tentara untuk menjajah pada",

			'AVAILABLE' : "Tersedia",

			'NEEDED' : "Diperlukan",

			'TROOPS_GONE' : "Tentara sedang menuju ",

			'NEXT_FARM' : "Pilih Jajahan Berikutnya",

			'SUCCESS_COUNT' : "Jumlah kiriman Pasukan yang berhasil ",

			'HALT_FARMING' : "Hentikan Jajahan",

			'MACHINE_RUNNING' : "Mesin Jajahan Berjalana",

			'CHANGE_VILLAGE' : "Berusaha mengganti Desa yang dijajah",

			'NO_FARM' : "Tidak ada Jajahan tersedia",

			'NOT_FARMER' : "bukan desa yang bisa Dijajah",

			'USED_TROOPS' : "Pasukan digunakan",

			'GOING_TO' : "Menuju ke",

			'INSTALL_M1' : "Tambah sebuah desa menjadi jajahan Anda dari Halaman Profile Desa",

			'INSTALL_M2' : "Selamat bersenang - senang",

			'TRIBE_SELECT1' : "Kebangsaan Anda",

			'TRIBE_SELECT2' : "Silakan pilih angka yang sesuai dengan kebangsaaan pasukan.",

			'TRIBE_SELECT3' : "Anda salah memilih Kebangsaan, Gunakan Romawi sebagai defaultnya.",

			'ROMAN' : "Romawi",

			'TEUTON' : "Teuton",

			'GAUL' : "Gaul",

			//Settings

			'SETRANDOMIZE' : "Mengacak pertanian",

			'SETREADREP' : "Analisis laporan untuk membuat antrian prioritas",

			'SETDELTLIST' : "Hapus daftar sementara saat berhenti",
			
			'DELTEMPLIST' : "Hapus daftar sementara secara manual",

			'UPDATE_SETTINGS' : "Pengaturan pembaruan",
			
            		'SETVILSKIP' : "Aktifkan desa skipping",
			
			'FARMMARKING' : "Mark peternakan di peta",

            		'DYNAMICTROOPCOUNT' : "Pasukan Dinamis"			
			

		}

	} else if (ext == "fr") { //Language:français, Translator : Sch@k@

		lang = {

			'UPDATE_M' : "Mise à jour",

			'UPDATE_M1' : "UserScripts.org non trouvé.",

			'UPDATE_UNKNOWN' : "Le numéro de version ne correspond pas :",

			'UPDATE_LAST' : "Tu utilises le plus récent",

			'UPDATE_BETA' : "Une nouvelle version BETA est arrivée",

			'UPDATE_NEW' : "Une nouvelle version est arrivée",

			'UPDATE_NOW' : "Veux-tu mettre à jour maintenant",

			'CONFIRM' : "Es-tu sÜr",

			'REMOVEING' : "Effacer",

			'SWITCH_V' : "Passe au village à",

			'AFTER' : "après",

			'SEC' : "secondes",

			'NO_VILLAGE' : "Pas d'autre village où aller !",

			'WAITING' : "Attendre",

			'BEFORE_RE' : "avant de relancer.",

			'ADD_FARM' : "Tu vas ajouter une cible ",

			'TROOP_CONFIG' : "Ton armée est ",

			'ATTACK' : "attaquer",

			'REINFORCE' : "soutenir",

			'RAID' : "piller",

			'ACTIVE_FARM' : "Actif",

			'CANCEL' : "Arrêter",

			'SAVE' : "Sauver",

			'ADD_TO' : "Ajouter à",

			'ADD_AS' : "Ajouter en tant que cible",

			'GLOBAL_IM_EX_PROMPT' : "Copie les données de tous les villages ou colle les données sauvegardées",

			'GLOBAL_IM_EX_M' : "Importe ou exporte les données pour tous les villages",

			'LOCAL_IM_EX_PROMPT' : "Copie ou Colle les données de ce village",

			'LOCAL_IM_EX_M' : "Importe ou exporte les données de ce village",

			'OPTIMIZE_DONE' : "Optimisation des distances réussie",

			'OPTIMIZE_M' : "Optimise l'ordre des villages par rapport à l'éloignement du tien",

			'OPTIMIZE_SM' : "Optimise l'ordre de tous les villages par rapport à l'eloignement de tes villages sélectionnés",

			'INVALID_FARM' : "Réglages des troupes invalides ! Les effacer ?",

			'DELETE_FARM' : "Efface ce pillage",

			'EDIT_FARM' : "Edite ce pillage",

			'NO_FARM_YET' : "Ajoute n'importe quel village dans ta liste en allant sur les informations de celui-ci",

			'FARM' : "Pillage",

			'SORT_FARM' : "Trie les pillages par distance du village actuel",

			'DELETE_M' : "Clique sur X pour effacer un pillage",

			'EDIT_M' : "Clique sur l'icone pour éditer un pillage",

			'END_M' : "Sélectionne la position de fin, clique ici pour effacer",

			'START_M' : "Sélectionne la position de départ",

			'START_FARMING' : "Lancement des pillages sur les villages sélectionnés",

			'MINIMIZE' : "Minimise",

			'MAXIMIZE' : "Maximise",

			'FARM_INACTIVE' : "Le pillage est inactif",

			'ERROR' : "En attente ...",

			'NOT_ENOUGH' : "Pas assez de troupes pour piller",

			'AVAILABLE' : "Disponible",

			'NEEDED' : "Nécessaire",

			'TROOPS_GONE' : "Armée en route pour",

			'NEXT_FARM' : "Sélection de la cible suivante",

			'SUCCESS_COUNT' : "Total des attaques envoyées",

			'HALT_FARMING' : "--> ARRETER <--",

			'MACHINE_RUNNING' : "Pillages en cours .",

			'CHANGE_VILLAGE' : "Tentative de changement de village :",

			'NO_FARM' : "Plus de pillage possible",

			'NOT_FARMER' : "Pas de pillages sur ce village",

			'USED_TROOPS' : "Armée utilisée",

			'GOING_TO' : "Préparation pour ",

			'INSTALL_M1' : "Ajoute une nouvelle cible à partir de la carte",

			'INSTALL_M2' : "Joyeux pillages",

			'TRIBE_SELECT1' : "Ta tribu",

			'TRIBE_SELECT2' : "Entre un nombre correct pour ta tribu.",

			'TRIBE_SELECT3' : "Tu n as pas mis la bonne tribu.",

			'ROMAN' : "Romains",

			'TEUTON' : "Germains",

			'GAUL' : "Gaulois",

			//Settings

			'SETRANDOMIZE' : "Lance les pillages aléatoirement",

			'SETREADREP' : "Analyse les rapports afin d'optimiser les pillages",

			'SETDELTLIST' : "Efface la liste temporaire une fois arrêté",
			
			'DELTEMPLIST' : "Supprimer la liste temporaire manuellement",

			'UPDATE_SETTINGS' : "Mise à jour des paramètres",
			
			'SETVILSKIP' : "Activer village à sauter",
			
			'FARMMARKING' : "Mark fermes sur la carte",

            		'DYNAMICTROOPCOUNT' : "Dynamic troupes"

		}

	} else if (ext == "no") { //Language:norwegian, Translator : Koffirola

		lang = {

			'UPDATE_M' : "Oppdater",

			'UPDATE_M1' : "UserScripts.org ble ikke funnet.",

			'UPDATE_UNKNOWN' : "Du har ikke versjon :",

			'UPDATE_LAST' : "Du bruker den siste versjonen",

			'UPDATE_BETA' : "En ny BETA versjon er tilgjengelig!",

			'UPDATE_NEW' : "En ny versjon er tilgjengelig!",

			'UPDATE_NOW' : "Vil du oppdatere nå",

			'CONFIRM' : "Er du sikker",

			'REMOVING' : "Fjerner",

			'SWITCH_V' : "Bytter til byen med",

			'AFTER' : "etter",

			'SEC' : "andre",

			'NO_VILLAGE' : "Ingen andre byer å gå til!",

			'WAITING' : "Venter",

			'BEFORE_RE' : "før ny sjekk.",

			'ADD_FARM' : "Du kommer til å legge til farm",

			'TROOP_CONFIG' : "Troppeinstillingene er",

			'ATTACK' : "Angrip",

			'REINFORCE' : "Forsterk",

			'RAID' : "Plyndring",

			'ACTIVE_FARM' : "Aktiv farm",

			'CANCEL' : "Avbryt",

			'SAVE' : "Lagre",

			'ADD_TO' : "Legg til",

			'ADD_AS' : "Legg til som farm",

			'GLOBAL_IM_EX_PROMPT' : "Kopier alle byenes data, eller legg til ny data",

			'GLOBAL_IM_EX_M' : "Importer eller eksporter rå farm-data fra alle byer",

			'LOCAL_IM_EX_PROMPT' : "Kopier / Lim inn farm data",

			'LOCAL_IM_EX_M' : "Importer eller Eksporter farm data for denne byen",

			'OPTIMIZE_DONE' : "Distansekalkulasjon er ferdig",

			'OPTIMIZE_M' : "Sorter farmene dine i denne byen etter distanse.",

			'OPTIMIZE_SM' : "Sorterer farmene dine etter distanse",

			'INVALID_FARM' : "Farmens troppeinstillinger er feil! Slette den?",

			'DELETE_FARM' : "Slett denne farmen",

			'EDIT_FARM' : "Endre denne farmen",

			'NO_FARM_YET' : "Sett en by som Farm fra Byens Profilside.Set any village as your farm from Village Profile Page",

			'FARM' : "Farm",

			'SORT_FARM' : "Sorter farmene fine etter Distanse fra denn byen",

			'DELETE_M' : "Trykk på 'X' ikonet for å slette en farm.",

			'EDIT_M' : "Trykk på 'Endre' ikonet for å endre en farm",

			'END_M' : "Velg sluttpunk for farming i denne kolonnen. Trykk her for å slette EndIndex",

			'START_M' : "Velg startposisjon fra denne kolonnen",

			'START_FARMING' : "Start å farme fra de valgte byene",

			'MINIMIZE' : "Minimer",

			'MAXIMIZE' : "Maksimer",

			'FARM_INACTIVE' : "Farmen er satt som Inaktiv",

			'ERROR' : "En Feil oppstod",

			'NOT_ENOUGH' : "Det er ikke nok tropper for raidet mot",

			'AVAILABLE' : "Tilgjengelig",

			'NEEDED' : "Trengs",

			'TROOPS_GONE' : "Tropper er på vei til",

			'NEXT_FARM' : "Velger neste farm",

			'SUCCESS_COUNT' : "Totalt Gjennomførte Troppe-Sendinger",

			'HALT_FARMING' : "Stopp Farming",

			'MACHINE_RUNNING' : "Farming Maskinen Kjører",

			'CHANGE_VILLAGE' : "Prøver å Bytte Gjeldende By",

			'NO_FARM' : "Ingen Tilgjengelige Farmer",

			'NOT_FARMER' : "Dette er Ikke en Farmeby",

			'USED_TROOPS' : "Brukte Tropper",

			'GOING_TO' : "Går Til",

			'INSTALL_M1' : "Legg til en ny Farm fra Byens Profilside",

			'INSTALL_M2' : "Lykke til med Farmingen!",

			'TRIBE_SELECT1' : "Din Stamme",

			'TRIBE_SELECT2' : "Vennligst skriv inn riktig nummer for din stamme.",

			'TRIBE_SELECT3' : "Du Valgte ikke Riktig Stamme, Romer blir satt som Standard.",

			'ROMAN' : "Romer",

			'TEUTON' : "Germaner",

			'GAUL' : "Galler",

			//Settings

			'SETRANDOMIZE' : "Tilfeldig Farming",

			'SETREADREP' : "Analyser Rapporter for å lage en Prioritetskø",

			'SETDELTLIST' : "Slett Midlertidig Liste når Farmingen er Ferdig",
			
			'DELTEMPLIST' : "Slett midlertidige liste",

			'UPDATE_SETTINGS' : "Oppdater innstillinger",
			
			'SETVILSKIP' : "Aktiver landsbyen hopper",
			
			'FARMMARKING' : "Mark gårder i kart",

            		'DYNAMICTROOPCOUNT' : "Dynamisk Tropper"

		}

	} else if (ext == "asia") { //Language:thai, Translator : XPeter 

		lang = {

			'UPDATE_M' : "อัพเดท",

			'UPDATE_M1' : "ไม่พบเวปไซด์ UserScripts.org .",

			'UPDATE_UNKNOWN' : "ไม่พบเลขเวอร์ชั่น :",

			'UPDATE_LAST' : "คุณกำลังใช้เวอร์ชั่นล่าสุด",

			'UPDATE_BETA' : "พบเวอร์ชั่น BETA ใหม่",

			'UPDATE_NEW' : "พบเวอร์ชั่นใหม่",

			'UPDATE_NOW' : "คุณต้องการอัพเดทเดี๋ยวนี้",

			'CONFIRM' : "คุณแน่ใจหรือไม่",

			'REMOVEING' : "กำลังลบ",

			'SWITCH_V' : "เปลี่ยนไปยังหมู่บ้านที่",

			'AFTER' : "หลังจาก",

			'SEC' : "วินาที",

			'NO_VILLAGE' : "ไม่มีฟาร์มอื่นแล้ว",

			'WAITING' : "กำลังรอ",

			'BEFORE_RE' : "ก่อนจะเช็คอีกครั้ง",

			'ADD_FARM' : "คุณกำลังจะเพิ่มฟาร์ม",

			'TROOP_CONFIG' : "จำนวนกองทัพทั้งหมดคือ",

			'ATTACK' : "โจมตี",

			'REINFORCE' : "ส่งกำลังเสริม",

			'RAID' : "ปล้น",

			'ACTIVE_FARM' : "ใช้ฟาร์มนี้",

			'CANCEL' : "ยกเลิก",

			'SAVE' : "บันทึก",

			'ADD_TO' : "เพิ่มลง",

			'ADD_AS' : "เพิ่มเป็นฟาร์ม",

			'GLOBAL_IM_EX_PROMPT' : "Copy ข้อมูล All Village Data หรือ Paste Data จาก backup",

			'GLOBAL_IM_EX_M' : "Import หรือ Export ข้อมูล raw farm data สำหรับทุกหมู่บ้าน",

			'LOCAL_IM_EX_PROMPT' : "Copy ข้อมูล / Paste ข้อมูลใหม่",

			'LOCAL_IM_EX_M' : "Import หรือ Export ข้อมูลฟาร์มของหมู่บ้าน",

			'OPTIMIZE_DONE' : "เรียงลำดับฟาร์มใหม่อัตโนมัติเรียบร้อยแล้ว",

			'OPTIMIZE_M' : "เรียงลำดับฟาร์มใหม่อัตโนมัติตามระยะทาง",

			'OPTIMIZE_SM' : "กำลังเรียงลำดับฟาร์มใหม่อัตโนมัติตามระยะทาง",

			'INVALID_FARM' : "เลือกข้อมูลกองทัพของฟาร์มผิดพลาด ต้องการลบ?",

			'DELETE_FARM' : "ลบฟาร์มนี้",

			'EDIT_FARM' : "แก้ไขฟาร์มนี้",

			'NO_FARM_YET' : "เลือกหมู่บ้านเป็นฟาร์มได้จากหน้าหลักของหมู่บ้านนั้น",

			'FARM' : "ฟาร์ม",

			'SORT_FARM' : "เรียงลำดับฟาร์มตามระยะทางจากหมู่บ้านนี้",

			'DELETE_M' : "คลิ๊กที่ปุ่ม X เพื่อลบฟาร์ม",

			'EDIT_M' : "คลิ๊กปุ่ม Edit เพื่อแก้ไขรายละเอียดของฟาร์ม",

			'END_M' : "เลือกจุดสิ้นสุดจากแถวนี้, คลิ๊กที่นี่เพื่อยกเลิกจุดสิ้นสุด",

			'START_M' : "เลือกจุดเริ่มต้นจากแถวนี้",

			'START_FARMING' : "เริ่มต้นฟาร์มจากหมู่บ้านที่เลือกไว้",

			'MINIMIZE' : "ย่อส่วน",

			'MAXIMIZE' : "ขยายส่วน",

			'FARM_INACTIVE' : "ฟาร์มถูกยกเลิก",

			'ERROR' : "เกิดความขัดข้อง",

			'NOT_ENOUGH' : "กองทัพมีจำนวนไม่พอกับการปล้นที่",

			'AVAILABLE' : "ว่าง",

			'NEEDED' : "ต้องการ",

			'TROOPS_GONE' : "กองทัพอยู่ระหว่างทางไป",

			'NEXT_FARM' : "กำลังเลือกฟาร์มต่อไป",

			'SUCCESS_COUNT' : "ส่งกองทัพสำเร็จทั้งหมด",

			'HALT_FARMING' : "ยกเลิกการฟาร์ม",

			'MACHINE_RUNNING' : "Farming Machine กำลังทำงาน",

			'CHANGE_VILLAGE' : "กำลังเปลี่ยนไปยังหมู่บ้านถัดไป",

			'NO_FARM' : "ไม่มีฟาร์มเหลืออยู่",

			'NOT_FARMER' : "นี่ไม่ใช่ฟาร์ม",

			'USED_TROOPS' : "กองทัพที่ใช้",

			'GOING_TO' : "กำลังจะ",

			'INSTALL_M1' : "คุณสามารถเพิ่มฟาร์มได้จากหน้าจุดระดมพล",

			'INSTALL_M2' : "ขอให้สนุกกับการทำฟาร์ม",

			'TRIBE_SELECT1' : "กองทัพของคุณ",

			'TRIBE_SELECT2' : "กรุณาเลือกจำนวนของกองทัพให้ถูกต้อง",

			'TRIBE_SELECT3' : "คุณเลือกชนิดกองทัพไม่ถูกต้อง, ระบบเลือกให้อัดโนมัติ",

			'ROMAN' : "โรมัน",

			'TEUTON' : "ทูทันส์",

			'GAUL' : "กอลส์",

			//Settings

			'SETRANDOMIZE' : "เกษตร Randomize",

			'SETREADREP' : "Analize รายงานให้คิวลำดับความสำคัญ",

			'SETDELTLIST' : "ลบรายการชั่วคราวเมื่อหยุด",
			
			'DELTEMPLIST' : "รายการชั่วคราวลบด้วยตนเอง",

			'UPDATE_SETTINGS' : "การตั้งค่า Update",
            
            		'SETVILSKIP' : "หมู่บ้านเปิดข้าม",
			
			'FARMMARKING' : "ฟาร์ม Mark ในแผนที่",

            		'DYNAMICTROOPCOUNT' : "ยก Dynamic"	

		}

	} else if (ext == "fi") { //Language:finnish, Translator : gotler

		lang = {

			'UPDATE_M' : "Päivitä",

			'UPDATE_M1' : "Osoitetta UserScripts.org ei löydy.",

			'UPDATE_UNKNOWN' : "Versionumero ei täsmää :",

			'UPDATE_LAST' : "Käytät viimeisintä versiota",

			'UPDATE_BETA' : "Uusi BETA versio saatavilla",

			'UPDATE_NEW' : "UUSI versio saatavilla",

			'UPDATE_NOW' : "Haluatko päivittää nyt",

			'CONFIRM' : "Oletko varma",

			'REMOVING' : "Poistetaan",

			'SWITCH_V' : "Vaihdetaan kylään koordinaateissa",

			'AFTER' : "jälkeen",

			'SEC' : "sekuntia",

			'NO_VILLAGE' : "Ei farmattavia kyliä jäljellä!",

			'WAITING' : "Odotetaan",

			'BEFORE_RE' : "ennen uudelleentarkistusta.",

			'ADD_FARM' : "Olet lisäämässä farmia",

			'TROOP_CONFIG' : "Joukkomääritys on",

			'ATTACK' : "Hyökkäys",

			'REINFORCE' : "Vahvistus",

			'RAID' : "Ryöstö",

			'ACTIVE_FARM' : "Aktiivinen Farmi",

			'CANCEL' : "Peruuta",

			'SAVE' : "Tallenna",

			'ADD_TO' : "Lisää",

			'ADD_AS' : "Lisää farmiksi",

			'GLOBAL_IM_EX_PROMPT' : "Copy All Village Data Or Paste Data from backup",

			'GLOBAL_IM_EX_M' : "Import or Export raw farm data For all village",

			'LOCAL_IM_EX_PROMPT' : "Copy the Data / Paste new Data",

			'LOCAL_IM_EX_M' : "Import or Export farm data of this village",

			'OPTIMIZE_DONE' : "Etäisyyksien optimointi onnistui",

			'OPTIMIZE_M' : "Optimoi farmit valituissa kylissä etäisyyksien perusteella.",

			'OPTIMIZE_SM' : "Going to Optimize All Farms In Selected Villages By their Distance",

			'INVALID_FARM' : "Farm's Troops setting is invalid! Remove it?",

			'DELETE_FARM' : "Poista farmi",

			'EDIT_FARM' : "Muokkaa farmia",

			'NO_FARM_YET' : "Set any village as your farm from Village Profile Page",

			'FARM' : "Farmi",

			'SORT_FARM' : "Järjestä farmit etäisyyden valittuun kylään perusteella",

			'DELETE_M' : "Paina X kuvaketta poistaaksesi farmin",

			'EDIT_M' : "Paina Muokkaa kuvaketta muokataksesi farmia",

			'END_M' : "Valitse lopetuskohta. Paina tässä poistaaksesi valinnan",

			'START_M' : "Valitse aloituskohta",

			'START_FARMING' : "Aloita valittujen kylien farmaaminen",

			'MINIMIZE' : "Minimoi",

			'MAXIMIZE' : "Maksimoi",

			'FARM_INACTIVE' : "Farmi ei ole aktiivinen",

			'ERROR' : "Virhe",

			'NOT_ENOUGH' : "Ei tarpeeksi joukkoja ryöstöön kylään",

			'AVAILABLE' : "Saatavilla",

			'NEEDED' : "Tarvitaan",

			'TROOPS_GONE' : "Joukot ovat matkalla kylään",

			'NEXT_FARM' : "Valitaan seuraava farmi",

			'SUCCESS_COUNT' : "Onnistuneesti lähetettyjen lukumäärä",

			'HALT_FARMING' : "Pysäytä farmaus",

			'MACHINE_RUNNING' : "Farmikone käynnissä",

			'CHANGE_VILLAGE' : "Yritetään vaihtaa nykyinen kylä",

			'NO_FARM' : "Ei farmeja saatavilla",

			'NOT_FARMER' : "Tämä ei ole farmaava kylä",

			'USED_TROOPS' : "Käytetyt joukot",

			'GOING_TO' : "Lähetetään",

			'INSTALL_M1' : "Add New Farms from Village Profile Page",

			'INSTALL_M2' : "Farmaamisen iloa",

			'TRIBE_SELECT1' : "Heimosi",

			'TRIBE_SELECT2' : "Anna heimon tyyppiä vastaava numero.",

			'TRIBE_SELECT3' : "Et asettanut oikeaa heimoa, käytetään Roomalaisia oletuksena.",

			'ROMAN' : "Roomalainen",

			'TEUTON' : "Teutoni",

			'GAUL' : "Gallialainen",

			//Settings

			'SETRANDOMIZE' : "Satunnainen farmaus",

			'SETREADREP' : "Analysoi raportit muodostaaksesi prioriteettijonon",

			'SETDELTLIST' : "Poista väliaikainen lista lopettaessa",
			
			'DELTEMPLIST' : "Poista väliaikainen luettelo käsin",

			'UPDATE_SETTINGS' : "Päivitä asetukset",
			
			'SETVILSKIP' : "Ota kylä heitto",
			
			'FARMMARKING' : "Mark tilojen kartta",

            		'DYNAMICTROOPCOUNT' : "Dynaaminen Joukot"

		}

	} else if (ext == "nl") { //Language:dutch, Translator : Inqt_vis

		lang = {

			'UPDATE_M' : "Update",

			'UPDATE_M1' : "UserScripts.org niet gevonden.",

			'UPDATE_UNKNOWN' : "Versie nummer komt niet overeen :",

			'UPDATE_LAST' : "Je gebruikt de laatste versie.",

			'UPDATE_BETA' : "Een nieuwe versie is beschikbaar, het is wel de BETA versie.",

			'UPDATE_NEW' : "Een nieuw versie is beschikbaar.",

			'UPDATE_NOW' : "Wil je nu updaten.",

			'CONFIRM' : "Weet je het zeker?",

			'REMOVING' : "Verwijderen",

			'SWITCH_V' : "Wissel van dorp",

			'AFTER' : "na",

			'SEC' : "seconde",

			'NO_VILLAGE' : "Geen ander dorp om naar toe te gaan!",

			'WAITING' : "Wachten..",

			'BEFORE_RE' : "voor recheck.",

			'ADD_FARM' : "Je bent bezig met een nieuw farm toe te voegen",

			'TROOP_CONFIG' : "Troepeninstellingen zijn",

			'ATTACK' : "Aanval",

			'REINFORCE' : "Versterking",

			'RAID' : "Overval",

			'ACTIVE_FARM' : "Actieve farm",

			'CANCEL' : "Annuleer",

			'SAVE' : "Opslaan",

			'ADD_TO' : "Voeg toe aan",

			'ADD_AS' : "Voeg toe aan Autofarm",

			'GLOBAL_IM_EX_PROMPT' : "Kopieer alle dorpen data of plak alle data van een backup.",

			'GLOBAL_IM_EX_M' : "Importeer of Exporteer Raw Farm Data van alle dorpen.",

			'LOCAL_IM_EX_PROMPT' : "Kopieer de data / Plak nieuwe data",

			'LOCAL_IM_EX_M' : "Importeer of exporteer Raw Farm Data van dit dorp.",

			'OPTIMIZE_DONE' : "Sorteren op afstand gelukt!",

			'OPTIMIZE_M' : "Sorteer farms in geselecteerde dorpen op hun afstand.",

			'OPTIMIZE_SM' : "Sorteer farms in geselecteerde dorpen op hun afstand.",

			'INVALID_FARM' : "Farm troepen instellingen is incorrect, verwijderen?",

			'DELETE_FARM' : "Verwijder deze farm",

			'EDIT_FARM' : "Wijzig deze farm",

			'NO_FARM_YET' : "Zet een dorp als farmdorp op je dorpsprofiel pagina.",

			'FARM' : "Farm",

			'SORT_FARM' : "Sorteer farms op afstand van dit dorp",

			'DELETE_M' : "Klik op het kruisje (X) om een farm te verwijderen",

			'EDIT_M' : "Klik op de wijzig icoon om een farm te wijzigen",

			'END_M' : "Selecteer eindpositie van deze rij, Klik hier om EndIndex te verwijderen",

			'START_M' : "Selecteer startpositie van deze rij.",

			'START_FARMING' : "Start Farming van geselecteerde dorpen",

			'MINIMIZE' : "Minimaliseer",

			'MAXIMIZE' : "Maximaliseer",

			'FARM_INACTIVE' : "Farm ingesteld als inactive",

			'ERROR' : "Error",

			'NOT_ENOUGH' : "Niet genoeg troepen om te farmen",

			'AVAILABLE' : "Beschikbaar",

			'NEEDED' : "Nodig",

			'TROOPS_GONE' : "Troepen op weg naar",

			'NEXT_FARM' : "Bezig met volgende farm selecteren",

			'SUCCESS_COUNT' : "Aantal succesvol verzonden",

			'HALT_FARMING' : "Halt Farming",

			'MACHINE_RUNNING' : "Farming Machine bezig",

			'CHANGE_VILLAGE' : "Bezig met veranderen van dorp",

			'NO_FARM' : "Geen farm beschikbaar.",

			'NOT_FARMER' : "Dit is geen farmersdorp.",

			'USED_TROOPS' : "Gebruikte troepen",

			'GOING_TO' : "Gaan naar",

			'INSTALL_M1' : "Voeg nieuwe farms toe van Dorpsprofiel pagina.",

			'INSTALL_M2' : "Succes met farmen.",

			'TRIBE_SELECT1' : "Je volk",

			'TRIBE_SELECT2' : "Gebruik een correct getal voor je volk instellingen..",

			'TRIBE_SELECT3' : "Het is niet gelukt om je volk in te stellen, Romein standaard ingesteld.",

			'ROMAN' : "Romein",

			'TEUTON' : "Germaan",

			'GAUL' : "Gallier",
			
			//Settings

			'SETRANDOMIZE' : "Willekeurig farmen",

			'SETREADREP' : "Bekijk reports om een prioriteitslijst te maken",

			'SETDELTLIST' : "Verwijder tijdelijke lijst wanneer je stopt",
			
			'DELTEMPLIST' : "Verwijderen tijdelijke lijst handmatig",

			'UPDATE_SETTINGS' : "Update instellingen",
			
			'SETVILSKIP' : "Activeer dorp overslaan",
			
			'FARMMARKING' : "Mark boerderijen in de kaart",

            		'DYNAMICTROOPCOUNT' : "Dynamische Troepen"

		}

	} else if (ext == "ir") { //Language:persian, Translator : Reza_NA

		lang = {

			'UPDATE_M' : "بروز رسانی",

			'UPDATE_M1' : "UserScripts.org پیدا نشد.",

			'UPDATE_UNKNOWN' : "شماره نسخه مطابقت نمی کند :",

			'UPDATE_LAST' : "شما از جدیدترین استفاده می کنید",

			'UPDATE_BETA' : "نسخه جدید در دسترس است اما به صورت آزمایشی.",

			'UPDATE_NEW' : "نسخه جدید در دسترس است",

			'UPDATE_NOW' : "می خواهید بروز رسانی کنید",

			'CONFIRM' : "آیا مطمئن هستید",

			'REMOVEING' : "پاک کردن",

			'SWITCH_V' : "تعویض به دهکده جدید در",

			'AFTER' : "بعد از",

			'SEC' : "ثانیه",

			'NO_VILLAGE' : "دهکده دیگری برای حرکت نیست!",

			'WAITING' : "صبر کنید",

			'BEFORE_RE' : "قبل از بررسی مجدد.",

			'ADD_FARM' : "شما در حال اضافه کردن مستعمره هستید",

			'TROOP_CONFIG' : "آرایش لشکریان هست",

			'ATTACK' : "حمله",

			'REINFORCE' : "پشتیبانی",

			'RAID' : "غارت",

			'ACTIVE_FARM' : "مستعمره فعال",

			'CANCEL' : "لغو",

			'SAVE' : "ذخیره",

			'ADD_TO' : "اضافه کردن به",

			'ADD_AS' : "اضافه کرده به عنوان مستعمره",

			'GLOBAL_IM_EX_PROMPT' : ".داده های تمام دهکده ها را رونوشت بگیرید یا داده های پشتیبانی را درج کنید",

			'GLOBAL_IM_EX_M' : "وارد کردن یا خارج کردن ردیف داده های مستعمرات برای تمامی دهکده ها",

			'LOCAL_IM_EX_PROMPT' : "از داده ها رونوشت بگیرید / داده های جدید را درج کنید",

			'LOCAL_IM_EX_M' : "وارد کردن یا خارج کردن داده های همین مستعمره",

			'OPTIMIZE_DONE' : "بهینه سازی مسافت با موفقیت انجام شد",

			'OPTIMIZE_M' : "بهینه سازی مستعمرات در دهکده اصلی انتخاب شده برا اساس فاصله.",

			'OPTIMIZE_SM' : "اقدام برای بهینه سازی تمامی مستعمرات در دهکده اصلی انتخاب شده برا اساس فاصله",

			'INVALID_FARM' : "تنظیمات لشکریان برای مستعمره نامعتبر می باشد! پاک شود?",

			'DELETE_FARM' : "حذف این مستعمره.",

			'EDIT_FARM' : "ویرایش اطلاعات این مستعمره",

			'NO_FARM_YET' : "انتخاب تمامی دهکده های به عنوان مستعمره از صفحه مشخصات دهکده",

			'FARM' : "مستعمره",

			'SORT_FARM' : "مرتب سازی بر اساس فاصله ی مستعمره از دهکده فعلی",

			'DELETE_M' : "برای پاک کردن یک مستعمره روی تصوری ضربدر کلیک کنید",

			'EDIT_M' : "برای اصلاح اطلاعات یک مستعمره بر روی تصویر ویرایش کلیک کنید",

			'END_M' : "انتخاب نقطه پایان از این ستون، برای حذف آخرین اندیس اینجا کلیک کنید",

			'START_M' : "انتخاب نقطه شروع از این ستون",

			'START_FARMING' : "شروع غارت از دهکده های انتخاب شده",

			'MINIMIZE' : "کوچک سازی",

			'MAXIMIZE' : "حداکثر سازی",

			'FARM_INACTIVE' : "تنظیم مستعمره بعنوان غیر فعال",

			'ERROR' : "خطا",

			'NOT_ENOUGH' : "برای حمله غارت سرباز کافی وجود دارد در",

			'AVAILABLE' : "موجود",

			'NEEDED' : "مورد نیاز",

			'TROOPS_GONE' : "لشکریان در راه ",

			'NEXT_FARM' : "انتخاب مستعمره بعدی",

			'SUCCESS_COUNT' : "تمام لشکریان ارسال شده به صورت موفقیت آمیز",

			'HALT_FARMING' : "متوقف ساختن غارت",

			'MACHINE_RUNNING' : "دستگاه غارتگر در حال پردازش است",

			'CHANGE_VILLAGE' : "تلاش برای تعویض دهکده فعلی",

			'NO_FARM' : "هیچ مستعمره ای موجود نیست",

			'NOT_FARMER' : "این دهکده مستعمره ای ندارد",

			'USED_TROOPS' : "لشکریان استفاده شده",

			'GOING_TO' : "حرکت برای",

			'INSTALL_M1' : "اضافه کردن مستعمرات جدید از صفحه ی مشخصات دهکده ها",

			'INSTALL_M2' : "غارت سودمند",

			'TRIBE_SELECT1' : "نژاد شما",

			'TRIBE_SELECT2' : "لطفا برای نژاد خود عدد مناسب وارد کنید.",

			'TRIBE_SELECT3' : "شما نمی توانید نژاد فعلی خود را تعریف کنید، تنظیم رومی به عنوان پیشفرض.",

			'ROMAN' : "رومی",

			'TEUTON' : "توتن",

			'GAUL' : "گول",

			//Settings

			'SETRANDOMIZE' : "کشاورزی تصادفی",

			'SETREADREP' : "تحلیل گزارشات برای ایجاد صف اولویت بندی شده",

			'SETDELTLIST' : "لیست حذف موقت هنگام توقف",

			'DELTEMPLIST' : "پاک کردن لیست موقت دستی",

			'UPDATE_SETTINGS' : "تنظیمات بروز رسانی",
			
			'SETVILSKIP' : "دهکده فعال پرش",
			
			'FARMMARKING' : "مزارع علامت گذاری در نقشه",

            		'DYNAMICTROOPCOUNT' : "نیروهای دینامیکی"

		}

	} else if (ext == "tw") { //Language:繁體中文, Translator : Mike Chuang
		lang = {
		
		'UPDATE_M' : "升級",

		'UPDATE_M1' : "UserScripts.org 無法連線",

		'UPDATE_UNKNOWN' : "未知版號 :",

		'UPDATE_LAST' : "您使用的是最新版本",

		'UPDATE_BETA' : "有新的Beta版可用",

		'UPDATE_NEW' : "有新版可用",

		'UPDATE_NOW' : "您現在要升級嗎",
		
		'CONFIRM' : "確定嗎",

		'REMOVING' : "移除",

		'SWITCH_V' : "將切換村莊至",

		'AFTER' : "請稍候",

		'SEC' : "秒",

		'NO_VILLAGE' : "沒有其他村莊可切換",

		'WAITING' : "等待中",

		'BEFORE_RE' : "在重新檢測以前",

		'ADD_FARM' : "您正在增加您的羊",

		'TROOP_CONFIG' : "軍隊配置為",

		'ATTACK' : "攻擊：正常",

		'REINFORCE' : "增援",

		'RAID' : "攻擊：搶奪 ",

		'ACTIVE_FARM' : "啟動打羊任務",

		'CANCEL' : "取消",

		'SAVE' : "保存",

		'ADD_TO' : "增加到",
		
		'ADD_AS' : "存為肥羊",

		'GLOBAL_IM_EX_PROMPT' : "複製所有村莊資料或從備份中拷貝資料",

		'GLOBAL_IM_EX_M' : "為所有村莊匯入或匯出肥羊資料",

		'LOCAL_IM_EX_PROMPT' : "複製資料或拷貝新資料",

		'LOCAL_IM_EX_M' : "匯入或匯出本村莊的資料",

		'OPTIMIZE_DONE' : "距離優化完成",

		'OPTIMIZE_M' : "以距離優化打羊程序.",

		'OPTIMIZE_SM' : "將要在選擇中的村莊裡進行距離優化",

		'INVALID_FARM' : "攻擊部隊的設定無效，移除它?",

		'DELETE_FARM' : "刪除本任務",

		'EDIT_FARM' : "編輯本任務",

		'NO_FARM_YET' : "您還沒設定始於自己的肥羊，趕快行動吧",

		'FARM' : "肥羊",

		'SORT_FARM' : "以目前村莊為標準，按距離給肥羊排序",

		'DELETE_M' : "按X刪除羊",

		'EDIT_M' : "按編輯圖示編輯羊",

		'END_M' : "從對列中選擇結束點，按這裡移除終點",
		
		'START_M' : "在對列中選擇起始點",

		'START_FARMING' : "從選擇的村莊開始打羊行動",

		'MINIMIZE' : "最小化",

		'MAXIMIZE' : "最大化",

		'FARM_INACTIVE' : "肥羊設定失效",

		'ERROR' : "計畫暫時受阻",

		'NOT_ENOUGH' : "沒有足夠的軍隊攻擊",

		'AVAILABLE' : "　可用",

		'NEEDED' : "需要",

		'TROOPS_GONE' : "正在派遣軍隊到",

		'NEXT_FARM' : "自動選擇下一肥羊",

		'SUCCESS_COUNT' : "攻擊成功發動總計",

		'HALT_FARMING' : "終止打羊行動",

		'MACHINE_RUNNING' : "攻擊機運行中",

		'CHANGE_VILLAGE' : "嘗試改變當前村莊",

		'NO_FARM' : "沒有可用的羊",

		'NOT_FARMER' : "此村未參予打羊",
		
		'USED_TROOPS' : "正在調動軍隊",

		'GOING_TO' : "正在準備 －",

		'INSTALL_M1' : "小提示：您可以從敵村村莊概述頁把它加入攻擊名單中",

		'INSTALL_M2' : "盡情享受吧",

		'TRIBE_SELECT1' : "您的種族",

		'TRIBE_SELECT2' : "請輸入一個正確的種族代碼",

		'TRIBE_SELECT3' : "您未能正確設定種族，內定為羅馬。",

		'ROMAN' : "羅馬",

		'TEUTON' : "日耳曼",

		'GAUL' : "高盧",
		
		//Settings
		
		'SETRANDOMIZE' : "Randomize farming",
		
		'SETREADREP' : "Analize reports to make a priority queue",
		
		'SETDELTLIST' : "Delete temporary list when stopping",
		
		'DELTEMPLIST' : "Delete temporary list manually",
		
		'UPDATE_SETTINGS' : "Update settings",
		
		'SETVILSKIP' : "Activate village skipping",
		
		'FARMMARKING' : "Mark farms in map",
		
		'DYNAMICTROOPCOUNT' : "Dynamic Troops"
		
		}

} else if (ext == "lt") { //Language:Lithuanian Translator : m0ng00se

    lang = {

    'UPDATE_M' : "Atnaujinti",

    'UPDATE_M1' : "UserScripts.org nerastas.",

    'UPDATE_UNKNOWN' : "Nesutampa versijos numeris :",

    'UPDATE_LAST' : "Jūs naudojatės vėliausia",

    'UPDATE_BETA' : "Atsirado nauja BETA versija",

    'UPDATE_NEW' : "Atsirado NAUJA versija",

    'UPDATE_NOW' : "Ar norite atnaujinti",


    'CONFIRM' : "Jūs įsitikinę",

    'REMOVING' : "Šalinama",

    'SWITCH_V' : "Jungiamasi į kaimą",

    'AFTER' : "po",

    'SEC' : "sek.",

    'NO_VILLAGE' : "Neturite daugiau kaimų!",

    'WAITING' : "Laukiama",

    'BEFORE_RE' : "prieš patikrinimą.",

    'ADD_FARM' : "Ketinate pridėti fermą",

    'TROOP_CONFIG' : "Karių konfigūracija yra",

    'ATTACK' : "Ataka",

    'REINFORCE' : "Pastiprinimas",

    'RAID' : "Reidas",

    'ACTIVE_FARM' : "Aktyvi ferma",

    'CANCEL' : "Atšaukti",

    'SAVE' : "Išsaugoti",

    'ADD_TO' : "Pridėti",

    'ADD_AS' : "Pridėti fermą",

    'GLOBAL_IM_EX_PROMPT' : "Kopijuoti kaimų duomenis arba įkelti informaciją iš kopijos",

    'GLOBAL_IM_EX_M' : "Importuoti / Eksportuoti visų kaimų fermų duomenis",

    'LOCAL_IM_EX_PROMPT' : "Kopijuoti duomenis / Įkelti duomenis",

    'LOCAL_IM_EX_M' : "Importuoti / Eksportuoti šio kaimo fermų duomenis",

    'OPTIMIZE_DONE' : "Atstumų optimizavimas sėkmingai atliktas",

    'OPTIMIZE_M' : "Optimizuoti pasirinkto kaimo fermas pagal atstumą.",

    'OPTIMIZE_SM' : "Ketinate optimizuoti pasirinkto kaimo fermas pagal atstumą",

    'INVALID_FARM' : "Neteisingai nustatyti kariai ferminimui! Pašalinti?",

    'DELETE_FARM' : "Pašalinti šią fermą.",

    'EDIT_FARM' : "Redaguoti šią fermą",

    'NO_FARM_YET' : "Pasirinkite kaimą, kurį ferminsite iš šiuo metu aktyvaus savo kaimo",

    'FARM' : "Ferma",

    'SORT_FARM' : "Rūšiuoti fermas pagal atstumą nuo jūsų kaimo",

    'DELETE_M' : "Norėdami pašalinti fermą, paspauskite X",

    'EDIT_M' : "Norėdami keisti fermos nustatymus, paspauskite Edit",

    'END_M' : "Pasirinkite paskutinę poziciją nuo šio stulpelio, paspauskite čia, norėdami pašalinti EndIndex",

    'START_M' : "Pasirinkite pradinę poziciją nuo šio stulpelio",

    'START_FARMING' : "Pradėti pasirinktų kaimų ferminimą",

    'MINIMIZE' : "Minimizuoti",

    'MAXIMIZE' : "Maksimizuoti",

    'FARM_INACTIVE' : "Ferma statusas pakeistas į neaktyvią",

    'ERROR' : "Klaida",

    'NOT_ENOUGH' : "Nepakanka karių reidinimui",

    'AVAILABLE' : "Prieinama",

    'NEEDED' : "Reikalinga",

    'TROOPS_GONE' : "Kariai keliauja į",

    'NEXT_FARM' : "Pasirinkti kitą fermą",

    'SUCCESS_COUNT' : "Sėkmingų išsiuntimų skaičius",

    'HALT_FARMING' : "Nustoti ferminti",

    'MACHINE_RUNNING' : "Farming Machine dirba",

    'CHANGE_VILLAGE' : "Bandoma pakeisti aktyvų kaimą",

    'NO_FARM' : "Nėra fermų",

    'NOT_FARMER' : "Čia ne ferminimo kaimas",

    'USED_TROOPS' : "Naudoti kariai",

    'GOING_TO' : "Keliaujama į",

    'INSTALL_M1' : "Naujas fermas pridėkite iš kaimo aprašymo puslapio",

    'INSTALL_M2' : "Sėkmės ferminant",

    'TRIBE_SELECT1' : "Jūsų gentis",

    'TRIBE_SELECT2' : "Įveskite teisingą jūsų genties kodą.",

    'TRIBE_SELECT3' : "Jums nepavyko sėkmingai įvesti genties kodo, automatiškai nustatoma: Romėnai.",

    'ROMAN' : "Romėnai",

    'TEUTON' : "Germanai",

    'GAUL' : "Galai",

    //Settings

    'SETRANDOMIZE' : "Ferminimas atsitiktine tvarka",

    'SETREADREP' : "Analizuoti ataskaitas, ferminimo prioritetams nustatyti",

    'SETDELTLIST' : "Išvalyti laikinąjį sąrašą, kai stabdoma",

    'DELTEMPLIST' : "Išvalyti laikinąjį sąrašą rankiniu būdu",

    'UPDATE_SETTINGS' : "Pakeisti nustatymus",

    'SETVILSKIP' : "Įjungti kaimų praleidimą",

    'FARMMARKING' : "Rodyti fermas žemėlapyje",  

    'DYNAMICTROOPCOUNT' : "Dinaminis karių parinkimas"

    }

} else if (ext == "il") { //Language:Hebrew, Translator : Tzachi
		lang = {

		'UPDATE_M' : "עדכן",

		'UPDATE_M1' : " לא נמצאUserScripts.org .",

		'UPDATE_UNKNOWN' : "מספר הגירסה אינו תואם :",

		'UPDATE_LAST' : "הגירסה מעודכנת",

		'UPDATE_BETA' : "גירסת בטא חדשה זמינה",

		'UPDATE_NEW' : "גירסה חדשה זמינה",

		'UPDATE_NOW' : "אתה רוצה לעדכן עכשיו",

		'CONFIRM' : "האם אתה בטוח",

		'REMOVING' : "מסיר",

		'SWITCH_V' : "מחליף לכפר ב",

		'AFTER' : "בעוד",

		'SEC' : "שניות",

		'NO_VILLAGE' : "אין כפר נוסף לביצוע!",

		'WAITING' : "ממתין",

		'BEFORE_RE' : "לפני בדיקה מחדש.",

		'ADD_FARM' : "הוספת חווה",

		'TROOP_CONFIG' : "הגדרת החיילים היא",

		'ATTACK' : "התקפה רגילה",

		'REINFORCE' : "תגבור",

		'RAID' : "בזיזה",

		'ACTIVE_FARM' : "חווה פעילה",

		'CANCEL' : "ביטול",

		'SAVE' : "שמור",

		'ADD_TO' : "הוסף ל",

		'ADD_AS' : "הוסף כחווה",

		'GLOBAL_IM_EX_PROMPT' : "העתק את כל נתוני החוות או הדבק נתונים מגיבוי",

		'GLOBAL_IM_EX_M' : "ייבא או ייצא נתוני חווה לכל הכפרים",

		'LOCAL_IM_EX_PROMPT' : "העתק נתונים / הדבק נתונים",

		'LOCAL_IM_EX_M' : " ייבא או ייצא נתוני חווות של כפר זה ",

		'OPTIMIZE_DONE' : "אופטימיזציה על פי מרחק בוצע בהצלחה",

		'OPTIMIZE_M' : "בצע אופטימיזציה של החוות בכפר זה על פי מרחק.",

		'OPTIMIZE_SM' : "מבצע אופטימיזציה לכל החוות בכפר הנבחר על פי מרחק",

		'INVALID_FARM' : "הגדרת החיילים של החווה אינה תקינה, האם להסיר אותה?",

		'DELETE_FARM' : "מחק חווה זו.",

		'EDIT_FARM' : "ערוך חווה זו",

		'NO_FARM_YET' : "קבע כפרים כחוות מדף הפרופיל שלהם",

		'FARM' : "חווה",

		'SORT_FARM' : "סדר חוות על פי מרחק מהכפר הנוכחי",

		'DELETE_M' : "x כדי למחוק חווה לחץ על ה ",

		'EDIT_M' : "לחץ על לחצן העריכה כדי לערוך את נתוני החווה",

		'END_M' : "בחר בעמדת הסיום בעמודה זו, לחץ כאן כדי להסיר את עמדת הסיום",

		'START_M' : "בחר עמדת התחלה מעמודה זו",

		'START_FARMING' : "התחל בזיזה מהכפר הנבחר",

		'MINIMIZE' : "מזער",

		'MAXIMIZE' : "הגדל",

		'FARM_INACTIVE' : "חווה מוגדרת כלא פעילה",

		'ERROR' : "Error",

		'NOT_ENOUGH' : "אין מספיק חיילים בשביל הבזיזה של",

		'AVAILABLE' : "זמין",

		'NEEDED' : "צריך",

		'TROOPS_GONE' : "חיילים בדרך ל",

		'NEXT_FARM' : "בוחר בחווה הבאה",

		'SUCCESS_COUNT' : "מספר הבזיזות שנשלחו עד כה בהצלחה",

		'HALT_FARMING' : "עצור בזיזות",

		'MACHINE_RUNNING' : "מכונת הבזיזות פועלת",

		'CHANGE_VILLAGE' : "מנסה להחליף כפר",

		'NO_FARM' : "אין חווה זמינה",

		'NOT_FARMER' : "כפר זה אינו כפר בוזז",

		'USED_TROOPS' : "חיילים בשימוש",

		'GOING_TO' : "עובר ל",

		'INSTALL_M1' : "הוסף חוות חדשות מדף הפרופיל של הכפרים",

		'INSTALL_M2' : "בהצלחה בבזיזות",

		'TRIBE_SELECT1' : "השבט שלך",

		'TRIBE_SELECT2' : "אנא הכנס את המספר עבור השבט שלך.",

		'TRIBE_SELECT3' : "לא קבעת את השבט הנכון שלך, קובע רומאים כברירת מחדל.",

		'ROMAN' : "רומאים",

		'TEUTON' : "טאוטונים",

		'GAUL' : "גאלים",

		// Settings

		'SETRANDOMIZE' : "בזוז בסדר רנדומלי",

		'SETREADREP' : "נתח דוחות כדי ליצור סדר מועדף של חוות",

		'SETDELTLIST' : "מחק רשימה זמנית בעצירה",

		'DELTEMPLIST' : "מחק רשימה זמנית באופן ידני",

		'UPDATE_SETTINGS' : "עדכן הגדרות",

		'SETVILSKIP' : "הפעל דילוג כפרים",

		'FARMMARKING' : "סמן חוות במפה",

		'DYNAMICTROOPCOUNT' : "חיילים דינמיים"

		}

	}


	lang['SCRIPT_NAME'] = "Farming Machine";

}



//image & style

function loadImage() {

	FM_log(3,"loadImage() called");

	image['DELETE'] = "data:image/gif;base64,"

			+ "R0lGODlhDAAMAMQQAMwzM88/P/zy8tllZfXZ2fnl5fLMzOyystJMTO+/v+mlpdVZWdxycuWZ"

			+ "meKMjN9/f////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

			+ "ACH5BAEAABAALAAAAAAMAAwAQAVJIAQViiCKx0CICQAciLuYJ+MCwSoWw60UMtqp5zKcBAHA"

			+ "ICFyABC6Q3KAilFFDVegFxCKkC7GaZxN4oSEJAJiuAEKiYdxbKCFAAA7";

	image['EDIT'] = "data:image/png;base64,"

			+ "iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAABGdBTUEAAK/INwWK6QAAABl0"

			+ "RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAASsSURBVHjaYmzvn8bw798fBmYW"

			+ "dgZmBiaGX39+M7AxszD8/fePgYmVmYGd4RNDjFQXgxDHSwaGPwwM/ySsck591i4T/bhrljLn"

			+ "4y6gwl8MUAAQQEwMeAATwz+Gj79FGM68d2T49xdo1l8GRgap1BiRB79kn92Raf7LyK6LrB4g"

			+ "gFgYCABWpt8MVz+bMIj/2MQgJKXgIv3pj4nczWUMAoycl5j/fr8ONJ4B6CUGBg4GBoAAYiJk"

			+ "2N+/Pxk+/uRjOPdcmeGveFg+0/O9zN9YfjMwyP9c/e03w7f//xgY7j1hYGiaw8AAEEAsuA35"

			+ "y/D3/z9BJXm5fF5+MavnN4KOi0qqOzGcmsjwU4jl7bPfPxdwA4Px8gMGhoqFDAx3njMwAAQQ"

			+ "hmH/gAH/8+8vBn5+3ggTY706fW1Nzd9//zPcF2d15fw2A+il9wxP/zDsvPeG4cnTdwwMbasY"

			+ "GF59hOgFCCC4Yf///2f49fsXAycHp4Outmqpga62Fz8fH8OPn78ZXr16ySDO84KB6cMWhq9A"

			+ "+06/U1n24OV/hulr7zF8/Pof7hCAAGKCGPIbZJi2rrb6yogQ3z02luZeLCxsDG/ff2R4/+kL"

			+ "w5cv7xkEuY4xMPx8wfDsnwUjj+XMpKesXnxQg4SAWB2I+QACiIWFhVlOTkYxw0BfL0NOWkrw"

			+ "1+8/DO8+fGL4DaT//vvP8P37TwYent8M7Nx3GX6/ZWB4wuTBKCkuGiQjLSrCxy/Q9+njhw9A"

			+ "gwSBmB8ggBgPHz991FBP1+rbjx8M33/8Yvj95w8DyMC/f/8xsLIAI/s/I8OVi7sZxFk2MDy/"

			+ "9YHhDW8cAycXJzA42Bnu3Ln7furUyW3Pnz45CTTsJ0AAMb3/8PE3KK18Bbrg89dvDF+/gQz9"

			+ "CY4IJiZGBh5uDoY9e88xtM34xfCSL5mBg5ODgRkozs7GxuDr7SW4YsWqhtDIOG0VFf0zAAHE"

			+ "rKVnsP/bj5+6UpLiSr9+/QUa+J2BBegiNlZQSvzP8Afo0ju37zCYmtsx6GirM/Dz8TCoqaoy"

			+ "aGtrMcjJyzIoyMuyWVjaODGxC6wACCAWoKMeXr58Pfj9+49zzU2Ng/n5uBl+fP8BjMWfDMyM"

			+ "QBcAvSMlJc/w+9M9BilRAwZRKV0GDjYWoMtYwTF4+8FzhhNnLzIwsvxmAggATQCy/wQBAQEA"

			+ "BQUE8ePj5Fv09/ffJCQmdB4aFgD6+voABgUEAAQDAwBDQkAAAvndAPfo1AD+ExoABwwSAOHm"

			+ "6wDL0dcA3dzdqgkFAZEDAQPbAgiezoDR+vPL18+lJ8+c+fRTT7/JQEsFGAl/wIaxcrAxMHAr"

			+ "MfDxijB8//aF4fztpwwXLl6+9vXz+zomhr9r2biEGH7++sMAEEAoOYCJiZmBhfFX883rN77/"

			+ "+vmzydJYl5MTaBAHMLB//WFhuHP/I8Ola+eev/vwceGPb597WJiZ3v7/h8jeAAGElp3+MzAD"

			+ "yzIudraea1du3Pz87fsyV1tznhdvPjKcuXTt7+NHD+eyMTG2C/BzP/jxHVRcMKLoBgggHBmd"

			+ "Eeg9ps1PH93zX7ftSy8wm736/uVjH9BLO1lYuDAMgQGAAGIEZSdqAYAAAwBv6sTarY5ZRgAA"

			+ "AABJRU5ErkJggg==";

	image['OPTIMIZE'] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf"

			+ "8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFk"

			+ "eXHJZTwAAALtSURBVDjLbVPtS1NxFD73Nid6R7o13XxpY8WgJWTIPhQskMj%2BAKFvQpB%2B"

			+ "HtYHIUd9EJQC8R8YftoQhNk%2FkGStNV%2Ba1cSyMXQ5tcbm1DX3du%2F93ds5FxQlL5wxfr"

			+ "%2FzPOd5nnMvp6oqXPTEYrFBWZYHGGMgSVKwt7d3%2BqI%2B7izB2tqaCwF7WMcIzthstha6"

			+ "X1payjU2NlrxzIBkHf39%2FRsnGP4M2I%2FAdWxKYJMFi9VqNaDS6%2FWMzkRRTGCtB4NB%2"

			+ "FzmCeDzuEwRhyG6380ajkSYlsSzVahUqlQooikKESby3ohXebDYPTU5O%2Bgirox9k5TOZDH"

			+ "nhaKLFYhF4nifv2hSXy0XnAt1tb29DOBxWkZw%2Fl0E0Gh1vamoapakUXKFQgHQ6DXV1deBw"

			+ "OECn02mE5XKZ7E6MjIxoCjgMaBXltmIJVqvVWCqV4PDwkAgX8f%2FL%2Bvp6QFtjbrf7Lg1D"

			+ "q7CwsHCIZCXEZLlIJMKcTiefz%2BehWCxqEzc2NiCVSvX5fL55muL3%2Bx%2F8aJx5W5IK8K"

			+ "jjNRgMBrIJU1NTCk%2ByyBuyadJpCjWgndP1Uk9VFqHT7ILpLS9lBqSU7HCBQGB1f3%2B%2F"

			+ "FWUK3d3dRkod1waBxFNMX2SiIoMkM77d5ORudXpg5dc7iO8sw5WV3l0kzp6GODc3N97W1jZK"

			+ "Siiwma1n0Nf1GJiqAFMYKKBCprALRqEVFrfmYTX9QUZVem2NoVDoBbI9b25uhqOjI00BSSbw"

			+ "dj4JEqqQFQkkJsHfWhFuX70Hx1JZt5yKVDUCzEDBDXANDQ30UsHm5mapaq0KMpPBctmGYKaR"

			+ "%2FSmkwWSwwpedT7Cc%2BJwrA9hPLYyNjfkPDg6eYDhZk8nUk3SEftcwLFERoYJqrptvwp1r"

			+ "DyGWjkJ4%2FeNBia%2B0%2F55Qa%2Bc%2BpuHhYRda2UMrx7j%2FjMfjaaG0Z2dnc99uzHBu"

			+ "231z%2BOf77%2Fiq9SBY%2FO9rPPt4vd7BXC43QCvmOC74tevNK6ZcMlcUVpedUOWTvn%2FP"

			+ "Q%2BbC95cxOwAAAABJRU5ErkJggg%3D%3D";

	image['GIM_EXPORT'] = "data:image/png;base64,"

			+ "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6"

			+ "QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKUSURBVDjLhVNdSJ"

			+ "NRGH6%2B%2BenSTc3Rl9Y0KzRcoSHShURERRldlLGLMsqrCO2iLuwuL7qKLr0MoQvDHJi"

			+ "gJkEbG5mGdzKU1PnvN7I2Fgu33Or7W%2B858YkrpRee8x7ec97n%2FTtHyGQyCAQCVtJX"

			+ "CS2GYdSQribQ1vhEeon0C0KgublZx18i%2BP3%2B43TJI0lSXVlZGWw2GwoKCsCINzY2k"

			+ "EwmEQ6HEYvFPpLtptvtXs9i8Pl872VZZuEyu4mqqplgMJh57O1Ya%2Fe25jByExZaTpSW"

			+ "luJ%2F4nQ6kdZSTlXRAtvtIkXmTNPT07Db7RwlJSVYSS7infwGa8llaJoOTdXhLCwX7Zr"

			+ "97C3PdW9fy2BTFoHD4WB1IhKJIJH3HZPKBA4UOXHh4GXoGR0GQTd0vk%2Bl0peuPW9aGm"

			+ "7zVolmLSyyKIoUTUMgPoN9uRIk635MRYNY%2BbYMVVFRXlTBz0PhBf%2FIfd9FloHFzIA"

			+ "dULM4FhMh7jiyMIREfBOte9vwtLEL65%2B%2FanNyaFz5qTSdf3Y6P6sEXdc5CcO9Qw85"

			+ "UTQaRfJHktvYnTzFqpPzOV%2FHmEG%2B6awMzOgmyRahquHtlyF%2Bp0FoTJCz%2Fs8UG"

			+ "ExHk1DRflHjDAxHBpBSNrldURQ0djaMUT%2FO0DgZuSyySPF4HPQS%2BQTS6fQfZksuBu"

			+ "Q%2B5BXlQFDzceflDWqkJh2tOCydqq%2FH7Pw8xsYnvILH47lC7P0ul8tWWVkJq9UKQRB"

			+ "w99VtFBcW4%2BSx2q3xmeNcWl2F3z86qWv6I4Gl29vbe4RIOglui8VSzP4CK2dQfo09ks"

			+ "gf0kxoDhpPm%2FVG%2F0DOT1Z7wqOcYLt0d3cXknMVwaCmhjzRHi%2Bl7pjqmq3b8Y1v%"

			+ "2Fxg7ofZBTY6rvbp%2Ft%2FPfI0AjgZ0qo%2BwAAAAASUVORK5CYII%3D";

	image['IM_EXPORT'] = "data:image/png;base64,"

			+ "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6"

			+ "QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK4SURBVDjLjZPrT1"

			+ "JhHMfPq%2FNH%2BK6ty2bhJcswzUa2hTMaEmCsZmWuUU0HQuAVEWHMgCnLy2yOhiOKIs0"

			+ "L08ByXgab1TTRNlO7ULwylTOZ9iL9djiVrdLmi%2B%2BbZ7%2FP5znP93kOAYDYKt1F%2"

			+ "B0k6cR4ZK86jSCS3m9sW7pGxwh5FwlqfOmnNW34w7NUcInck6Ck%2BQNJgZNjExYTzOl6"

			+ "7iuG%2FnQuf7kjEp2eT%2FxV45AlknyopMmLJweRDGR05Jt1KBDvLMdoiRp8uLeKpTiO3"

			+ "FHiUiWR%2FWTI12sBD8JEC%2FkYBvLXpeGrIwHCTGOPuKgxYRXCXsan7ilTyD0G%2FOpn"

			+ "0lqdQfisfwccq%2BJuEGKjjYHpqkklvLQc%2BiwiBe2p06%2FmwSVOo5kvJjISgCyLpgi"

			+ "j%2FbQGCHWX0p4rgNZ7AyxdjWFxcxPLyMuZmZ%2BBUHUOHlodnd26g%2FeYpmIQsSn86n"

			+ "iR81akBf9PZn%2BfMo%2BEsTIy%2FwtLSEgP%2FyuzbGbQUsnFXdhJd5gtoLMxAOWdvgK"

			+ "Cb5Xr1aevDzXno0WZufHg3t7nz3%2Fn08T1qclhouHgUZZl71ulwfxRYncZ9omGPWOstG"

			+ "6urq8ywUqmESqWCWq1GaWkpsxaNRmEx3YKaEz8Vg%2F%2B5RpPJtEJRFDMcA1tbW9HW1o"

			+ "bKyspNQUwqkUj2bfkODAbDSiQSYYYrKipgs9lgt9tRU1OzKZDL5RAKhb8FRc8vJxR0nTs"

			+ "vtvMGxBb%2BN8dQO2ISjUYDh8MBp9MJWsysPXhjR0GnBGIbbzrbytGmaw%2FzCRr%2BLO"

			+ "u9iqrBEhT1FqDAmo9wOAydTgeXywW32426ujqEQiFoBlSoH9NDO6REvkOERFl8lKB3HqR"

			+ "tIdoWOC5Lp3jXchakUum80WhkQLoXmM1mCASC%2BdySMwvZtVlf0zWpYzT8ZfeVXYPEdr"

			+ "%2FpTvMdjX2sh%2B52%2FVQAAAAASUVORK5CYII%3D";

	image['MINIMIZE'] = "data:image/png;base64,"

			+ "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAQCAYAAAABOs/SAAAABGdBTUEAAK/INwWK6QAAAB"

			+ "l0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGASURBVHjaYlyyYMVMdnb2"

			+ "NFYWFgYWIGZkYmKgBfj/7x/Dnz9/GH4D8c+fP2cBBBALDzd3Mhc3NwMHOwcDCysrAzONLP"

			+ "4Lsvj3b4YfP38wfPv6NRkggFiAljLz8PAycHFyMrCxsjEwA31NE4uBPv31+xcDy3dWEJcZ"

			+ "IIBYQD4FWcrFBfE1MzMTAyMjI3WD+f9/hr9//4F9CwIgnwMEEAsoeEE+BVnKzsHOwMJMGx"

			+ "//+fsHYSnQToAAYgHFKSh4QT4FWcpCo6AGW8r8G2IX0E6AAIKnJGoHLzaAbAdAADExDBAA"

			+ "CKABsxgggPBG6OUrlxjOnjtDsqG6OnoMxkYmeNUABBBei/fs3cXQ0FJHssWF+SUELQYIIL"

			+ "wW6+rqMyTEJZFssbGhCUE1AAHEgpzJ0YGLkysYU7MggQGAAGIBlaGg4gxUssAyOa0KEJAd"

			+ "YLuAdgIEEAuwJPkLLEOZ4cUZMJPTssgEldcgOwECiAXIWQYsuGNhxRmtK4lv37+DHLAMIM"

			+ "AAhwiVy91Y0KAAAAAASUVORK5CYII=";

	image['MAXIMIZE'] = "data:image/png;base64,"

			+ "iVBORw0KGgoAAAANSUhEUgAAAB4AAAAQCAYAAAABOs/SAAAABGdBTUEAAK/INwWK6QAAABl"

			+ "0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF1SURBVHjaYlyyYMVMdnb2NF"

			+ "YWFgYWIGZkYmKgBfj/7x/Dnz9/GH4D8c+fP2cBBBALDzd3Mhc3NwMHOwcDCysrAzONLP4Ls"

			+ "vj3b4YfP38wfPv6NRkggFiAljLz8PAycHFyMrCxsjEwA31NE4uBPv31+xcDy3dWEJcZIIBY"

			+ "QD4FWcrFBfE1MzMTAyMjI3WD+f9/hr9//4F9CwIgnwMEEAsoeEE+BVnKzsHOwMKM8LGwJB9"

			+ "FFr59/gnO/vP3D8JSoJ0AAcQCilNQ8IJ8CrKUBUtQz5kxnyQLUzISwTS6WX+Yf0PsAtoJEE"

			+ "BwGXzBGxocTpbF6ADZDoAAok0SJgIABNCAWQwQQANmMUAADZjFAAFEVGmxeu1KqlsMEEAsy"

			+ "Jmc1FRKTkECAwABxAIqQ0HFGahkgWVybAUAOQBUKSAXICA7wHYB7QQIIBZgSfIXWIYyw4sz"

			+ "YCanZZEJKq9BdgIEEAuQswxYcMfCijNaVxLfvn8HOWAZQIABACNVl3Dbv9rRAAAAAElFTkS"

			+ "uQmCC";

	image['LOADING'] = "data:image/gif;base64,"

			+ "R0lGODlhEAAQAPfgAP////39/erq6uvr6+jo6Pn5+dPT0/v7+/X19efn5/Pz8/j4+Pf39/r6+vz8"

			+ "/MzMzO/v7/b29svLy/7+/unp6e7u7kJCQtnZ2fHx8a+vr4mJid7e3s/PzyYmJrOzs/Dw8NLS0vT0"

			+ "9Le3t9ra2tvb25CQkKOjo2tra9DQ0KysrM3Nza2traurq729vezs7M7OzuHh4fLy8rq6und3d6Cg"

			+ "oIGBgYCAgGRkZGJiYsPDw8fHx4eHh+Dg4J+fn6KiooiIiG9vb6enp9fX18DAwOXl5d3d3e3t7WBg"

			+ "YJmZmZOTk9/f30VFRebm5jQ0NBUVFQQEBNjY2ISEhOTk5K6urtzc3D8/P2dnZ8LCwpubm8jIyLm5"

			+ "uZqamiEhIcTExC0tLbCwsIyMjNXV1dHR0VxcXOPj40lJSTw8PGxsbExMTCwsLF9fXxAQEMnJyRYW"

			+ "FpSUlCIiIhsbGwgICAsLC11dXVhYWJGRkba2try8vMbGxr+/v7i4uDs7O76+vmFhYYaGho2NjbW1"

			+ "tZeXl4qKiiQkJKmpqYODg0ZGRk9PT3Z2dgkJCTo6OkFBQY+Pjx8fH3l5eRMTEw8PDyoqKrGxsWho"

			+ "aHNzcwcHB7KysqGhoYKCgkpKSmVlZXFxcaioqE1NTeLi4p2dnaampqSkpJ6ensXFxVNTU7S0tFZW"

			+ "VjExMVlZWaWlpVRUVDAwMCgoKFBQUKqqqg0NDUNDQxkZGT09PUdHR3p6ehISEgICAsHBwURERDU1"

			+ "NZKSkm1tbTk5OWlpaRwcHFJSUtTU1DMzMyAgIH5+fiMjI3JycnR0dA4ODkhISMrKynx8fJiYmAYG"

			+ "BnV1dU5OTgMDA4WFhR4eHgoKCpycnC8vL1paWmNjYzc3N7u7u4uLiycnJ3t7e15eXhoaGjY2NkBA"

			+ "QP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

			+ "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEA"

			+ "AAAh+QQFAADgACwAAAAAEAAQAAAIpQDBCRxIsGDBF1FwOQEQwEEAg+B6XJMT5wmAAwwiFCjo480j"

			+ "TVOYAJhQAEMFBgPFLOomyCADAQI2gqvDBQhEcBVgVBA4p4OImyFIeBIoy4uAmwcMhBFoocmAmw0k"

			+ "cBB4Yk+emwJyGBDYw8KPmyhkbBB4wUonTgYNTBnyYaCeMaiQqMCg4EILGimKFLzj6MYZRDY0JGFx"

			+ "AaISD0lqaEil4+jNxwIDAgAh+QQFAADgACwBAAEADgAOAAAImwDBCTRQx1SkDmj8qBDIkIUzbVzg"

			+ "OFkj59QWhhmqrJohggKBLzgqrQEADsocRRcZCqwBIMAEHxaiqFQZoMCBGWWuzGQYAAGDOa0q7BQ4"

			+ "4cOHG3QgDAUXQMCAHUckLEVAZoClSTSWJqBSAcYOY3d2EhFThAE4HTVsWBqBIAKTMKNeuGD4AAkY"

			+ "N5+CfNGSjMDMBDokgVqRY0QMhgEBACH5BAUAAOAALAEAAQAOAA4AAAiZAMEJHOEDCDILOJKAEMhQ"

			+ "xpkyFvY08dLBkAmGfPqo+nPFxQAtlBp1oAGOhzI1KRgy/NOG1wtAk6apVGnlGDQ3QDjMZJgh0RJM"

			+ "M2LsFJjgSRsNNhQMBQegaaofUJYGOOAATwkZSxdEOECBExYUOxFUUBAAnBBQQSQkKNAAgwAiAxYw"

			+ "JCHDg4wcEgyQYIJgJoQRKrJwKOJCrsCAACH5BAUAAOAALAEAAQAOAA4AAAiZAMEJhOFBg5UjtExA"

			+ "Ecgwy48TN8aoQrNETQaGDwrNMKECQoUufsx8YwEuwZYafBgyxHLqkAEdYDyoVDmjQ50MSUbMZChC"

			+ "mCkTWBDsFEghFitCJiIMBUfg0aA8LKQszfAqkxAPKJYeiRPlw6gWPHZOsOXlATgieLLwwOAgQIMC"

			+ "DQIsY0ghDIgLPBIYUbAgwEwEAqSQoYChL8OAACH5BAUAAOAALAEAAQAOAA4AAAiZAMEJFMDGFSMN"

			+ "SPTAEMjwwopAJX7YmAGkxhCGRVJcykNCgQIQlzRZuQPuQ4sUBhgyzIAKCAkqdl6oVFkCTSgOLQjM"

			+ "ZJhjySY2XQrsFOjCTBkOEhoMBTegiQUqIDAs1ZKmz4ALOoduGqRrARkYMXYKggMLBLgQCQSEODAB"

			+ "wAprtd74YMjgA4YIBwA8SeStx0wHBQrktVBIBcOAACH5BAUAAOAALAEAAQAOAA4AAAibAMEJjEFF"

			+ "R6kVIh5QEMiQwIMWdjIE6RHIBwqGLl7gEUKAQQQl2MCAeQCOAQkURBgyzGGjBBkjF1KqZEiIkggC"

			+ "GxTMZIjixJ8EUhzsFPgBx4kBAgIMBQeBzo0YEBos7XJo24IQBZb6MRQqQIECE3Zu2aMGCrgAAQBw"

			+ "m5KAAKBm1KpkYAggDTNpkJz4ItaJxcwHhWZx6UCqhAGGAQEAIfkEBQAA4AAsAQABAA4ADgAACJkA"

			+ "wQksYAQGMA4GlGAQyBABgQ0XQEjo0uKKEoYLBjBxoeBAgwEGPEgiAc5BDCMIGDIUEuTLgAYhIqhU"

			+ "eQWLhAYMHMxkWCQJCwcHAOwUGEJDCQBIh4JTYEPDoicplIpBhARTHBxKRZ0RoSIYpB87UxwZxgOc"

			+ "qEZtdtkRMGBItl99+DCkUSXaoDRNzCzpJWOmmBJjzFg4QWMEw4AAIfkEBQAA4AAsAQABAA4ADgAA"

			+ "CJkAwQmc0AABhAEDICwQyHCCAwYhIAiQsmFDBYZIAAQ44GBCgAgUwhgQAO6Bl2cAGDIkIIGDgiiV"

			+ "jqhUOWLIhjJypsxkSEFLljdrEuwUuOALoA5OCAwFFyHIClJwSi3d8EkEIy7FlupxIwFEpkiBdg7Z"

			+ "0UMpIUW5atwyAuGBCUc7XjBcUa2KoUN0cJwQxGamEBqIxtzY4cETw4AAOw==";

	image['SETTINGS'] = "data:image/png;base64,"

			+ "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0"

			+ "RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVDjLlZPLbxJRGMX5X%2FxbjB"

			+ "pjjCtXLl2L0YWkaZrhNQwdIA4FZxygC22wltYYSltG1HGGl8nopCMPX9AUKQjacdW4GNPTOywak7"

			+ "ZAF%2FeRe%2FM73%2FnOzXUAcEwaqVTKmUgkGqIoWoIgWP%2FfTYSTyaSTgAfdbhemaSIej%2BNc"

			+ "AgRudDod9Pt95PN5RKPR8wnwPG%2FZ1XVdB8dxin0WDofBsiyCwaA1UYBY%2FtdqtVAqlRCJRN6F"

			+ "QiE1k8mg2WyCpunxArFY7DKxfFir1VCtVlEoFCBJEhRFQbFYhM%2Fna5wKzq%2F%2B4ALprzqxbF"

			+ "UqFWiaBnstl8tQVRWyLMPr9R643W7nCZhZ3uUS%2BT74jR7Y5c8wDAO5XA4MwxzalklVy%2BPxNC"

			+ "iKcp4IkbbhzR4K%2Bh9IH02wax3MiAYCgcBfv99%2F4TS3xxtfepcTCPyKgGl5gCevfyJb%2FQ3q"

			+ "6Q5uMcb7s3IaTZ6lHY5f70H6YGLp7QDx9T0kSRtr5V9wLbZxw1N%2FfqbAHIEXsj1saQR%2BM8BC"

			+ "dg8icbJaHOJBqo3r1KfMuJdyuBZb2NT2R5a5l108JuFl1CHuJ9q4NjceHgncefSN9LoPcYskT9pY"

			+ "IfA9Al%2BZ3X4xzUdz3H74RbODWlGGeCYPcVf4jksz08HHId6k63USFK7ObuOia3rYHkdyavlR%2"

			+ "B267GwAAAABJRU5ErkJggg%3D%3D";

	image['DELTEMPLIST'] = "data:image/png;base64,"

			+ "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAABl0"

			+ "RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK9SURBVBgZBcFLiFVlAADg7%2F%2FP"

			+ "uXdmGp3xMeIokk1USG8jKmlRYJJU1K6NRILQopXVImoVFBGBpLteu2gVLYyiUALFRSVk0aKC0nyE"

			+ "5uA43pm598495%2Fzn7%2FtCzhns%2F%2FLSQzh867rxXYO6NahbddsaNm0Py7iGhEUs4DMcKwHa"

			+ "pnn4vtk1u157bBMA6Fft9KBqpxdX07aqZnmUnL%2B24tuz%2FT04WAK0TbN5qhvApRtJJwRloCgZ"

			+ "60Q3j0VFjDoFO7dN2Do9ueGT05cPRYBU11OTJU3LchX0am6M6K3SW2VhyPxKAm98ftGuuUl3z3Q2"

			+ "lQCprjes7Ub9Ef3VJMagRFEQCwpBEWgR0pIfzy06c7F3uQRIVbV5eqLQGzYGoyzGrIjEFBSRQlYU"

			+ "yIWrSyNHjv%2B9hP0lQFNV2zdPdfRWswYyRQpiRqKQlTlqM6mTNFUzd%2FSVR69HgFSNts9Oj%2B"

			+ "lXWYgUIYiICICQyZlmNJKqUYIS9r793URZxO5YJ6pSEmVkGUkAATFSp2SlP2iwBCU0o2rT5OS4GG"

			+ "ghEwJRkDMh4ORHhic%2F9MO%2Ff3lpfF1YU11%2Fnea9ElI1uqmc7CojRQxSG8hZixBw4mNTf37h"

			+ "jucPGJu7y%2FC3Y8Xvp46%2Fc%2FyJTr%2F4%2FsbtM21Kh3Y%2FuOPOua0zfjnfSG2WBUXMioLR"

			+ "py%2B6%2F9kXTJw9IZz6QGd4XnfDlnjl3IUdZaqq3Xj65z%2F%2BsTgsrYyyOmWjOqiaVpNaB65e"

			+ "MD47x1OvAijf2qJowy1lqusHnnv83ok39z0CAFKmTlnVcOanrQa%2FfmPyq5eNhv8ZYHmpkAqXi9"

			+ "l79t62fnrymYXl2sX5vvmlVUuDWt1kRYy6naAbWv%2BcOip2grro6y1k567ElBrvh537Ds%2FgIL"

			+ "ZjIzZiPdZjerzb6YyPd%2BxJp%2B248rW1%2FQVVGeeL3Bx58ljz7v%2FpCEpK8wRGcAAAAABJRU"

			+ "5ErkJggg%3D%3D";

}

function loadStyle() {

	FM_log(3,"loadStyle() called");

	var styleText = "tr.inactive{font-style:italic; color:gray;}";

	styleText += "div.isfarm{background-image:url("+farmImage+") !important}";

	//defining style new, so it won't conflict with TBeyond

	styleText += "table.FMtbg {width: 90%; margin:auto;}";

	styleText += "table.FMtbg td {border: 1px solid silver; font-size:13px; padding: 1px; text-align:center;}";

	styleText += ".FMtbg {background-color: #C0C0C0; width:100%; text-align:center;}";

	styleText += "table.FMtbg tr {background-color: #FFFFFF;}";

	styleText += "table.FMtbg tr.cbg1 td, td.cbg1 {background-color:#F5F5F5;}";

	styleText += "table.FMtbg td.cbg2 {background-color:#71D000;}";

	styleText += "p#FMtitle {width: 90%; margin: 10px auto;}";

	GM_addStyle(styleText);

}



/*define unit properties > needed to analyse battle reports

 * [0], [1] , [2] , [3]   , [4] , [5] , [6] , [7] , [8]  , [9]

 * att, def1, def2, lumber, clay, iron, crop, food, speed, load

 */

romans=new Array();

	romans[0] = new Array(40,35,50,120,100,180,40,1,6,40);						// Legionnaire

	romans[1] = new Array(30,65,35,100,130,160,70,1,5,20);						// Praetorian

	romans[2] = new Array(70,40,25,150,160,210,80,1,7,50);						// Imperian

	romans[3] = new Array(0,20,10,140,160,20,40,2,16,0);						// Equites Legati

	romans[4] = new Array(120,65,50,550,440,320,100,3,14,100);					// Equites Imperatoris

	romans[5] = new Array(180,80,105,550,640,800,180,4,10,70);					// Equites Caesaris

	romans[6] = new Array(60,30,75,900,360,500,70,3,4,0);						// Battering Ram

	romans[7] = new Array(75,60,10,950,1350,600,90,6,3,0);						// Fire catapult

	romans[8] = new Array(50,40,30,30750,27200,45000,37500,4,4,0);				// Senator

	romans[9] = new Array(0,80,80,5800,5300,7200,5500,1,5,1600);				// Settler

	romans[10] = new Array(0,0,0,0,0,0,0,6,0,0);								// Hero

	romans[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)

	romans[12] = new Array(0,0,0,1,1,1,0,0,0,0,0)

teutons=new Array();

	teutons[0] = new Array(40,20,5,95,75,40,40,1,7,60);							// Clubswinger

	teutons[1] = new Array(10,35,60,145,70,85,40,1,7,40);						// Spearfighter

	teutons[2] = new Array(60,30,30,130,120,170,70,1,6,50);						// Axefighter

	teutons[3] = new Array(0,10,5,160,100,50,50,1,9,0);						    // Scout

	teutons[4] = new Array(55,100,40,370,270,290,75,2,10,110);					// Paladin

	teutons[5] = new Array(150,50,75,450,515,480,80,3,9,80);					// Teuton Knight

	teutons[6] = new Array(65,30,80,1000,300,350,70,3,4,0);						// Ram

	teutons[7] = new Array(50,60,10,900,1200,600,60,6,3,0);						// Catapult

	teutons[8] = new Array(40,60,40,35500,26600,25000,27200,4,4,0);				// Chief

	teutons[9] = new Array(10,80,80,7200,5500,5800,6500,1,5,1600);				// Settler

	teutons[10] = new Array(0,0,0,0,0,0,0,6,0,0);								// Hero

	teutons[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)

	teutons[12] = new Array(0,0,0,1,1,1,0,0,0,0,0)

gauls = new Array(10);

	gauls[0] = new Array(15,40,50,100,130,55,30,1,7,30);						// Phalange

	gauls[1] = new Array(65,35,20,140,150,185,60,1,6,45);						// Swordfighter

	gauls[2] = new Array(0,20,10,170,150,20,40,2,17,0);							// Pathfinder

	gauls[3] = new Array(90,25,40,350,450,230,60,2,19,75);						// Theutates Thunder

	gauls[4] = new Array(45,115,55,360,330,280,120,2,16,35);					// Druidrider

	gauls[5] = new Array(140,50,165,500,620,675,170,3,13,65);					// Haeduan

	gauls[6] = new Array(50,30,105,950,555,330,75,3,4,0);						// Ram

	gauls[7] = new Array(70,45,10,960,1450,630,90,6,3,0);						// Trebuchet

	gauls[8] = new Array(40,50,50,30750,45400,31000,37500,4,5,0);				// Chieftain

	gauls[9] = new Array(0,80,80,5500,7000,5300,4900,1,5,1600);					// Settler

	gauls[10] = new Array(0,0,0,0,0,0,0,6,0,0);									// Hero

	gauls[11] = new Array(1,1,1,0,0,0,1,1,1,1,0)

	gauls[12] = new Array(0,0,1,1,1,1,0,0,0,0,0)

nature = new Array(10)

	nature[0] = new Array(10,25,10,0,0,0,0,1,20,0);							// Rat

	nature[1] = new Array(20,35,40,0,0,0,0,1,20,0);							// Spider

	nature[2] = new Array(60,40,60,0,0,0,0,1,20,0);							// Serpent

	nature[3] = new Array(80,66,50,0,0,0,0,1,20,0);							// Bat

	nature[4] = new Array(50,70,33,0,0,0,0,2,20,0);							// Wild boar

	nature[5] = new Array(100,80,70,0,0,0,0,2,20,0);						// Wolf

	nature[6] = new Array(250,140,200,0,0,0,0,3,20,0);						// Bear

	nature[7] = new Array(450,380,240,0,0,0,0,3,20,0);						// Crocodile

	nature[8] = new Array(200,170,250,0,0,0,0,3,20,0);						// Tiger

	nature[9] = new Array(600,440,520,0,0,0,0,5,20,0);						// Elephant



// let's get rollin'

if (document.body) {

	//suffixGlobal = server + '_' + getPlayerId();
	

	FM_log(3,"suffixGlobal="+suffixGlobal);

	if (GM_getValue("Active_" + suffixGlobal, -1) > -1 && GM_getValue("ReadRep_" + suffixGlobal, 0)==1)

	{

		FM_log(3,"going to check reports");
				

		checkreports();

	}

	//checkreports();
	var url1 = document.location.href;
	if (url1.indexOf("a2b.php") > -1){
		if (document.getElementById('troops') != null){
			var xf = "<td class=\"column-last\"><img class=\"unit uhero\" src=\"img/x.gif\" title=\"Hero\" alt=\"Hero\" /> <input type=\"text\" class= \"text disabled\" name=\"t11\" value=\"\" maxlength=\"6\" /><span class=\"none\"> (0)</span></td>";
			var tb1 = document.getElementById('troops')
			if (tb1.rows[2].cells[3].innerHTML == ""){
				tb1.rows[2].cells[3].innerHTML = xf;
			}
		}
	}
	

 	main();

}