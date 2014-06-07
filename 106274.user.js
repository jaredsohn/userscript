// ==UserScript==
// @name           SC Tools Library
// @description    Adds Functions, Methods, And Variables To SC Pages So Other Scripts Can Use Them
// @namespace      SCToolsLibrary
// @include        http://*playstarfleet*/*
// @version       1.0.1.9
// ==/UserScript==




//////////////Chrome Variables///////////////////////
//////////////Chrome Variables///////////////////////
//////////////Chrome Variables///////////////////////



//////////////Chrome Functions///////////////////////
//////////////Chrome Functions///////////////////////
//////////////Chrome Functions///////////////////////


function loadFunctionsIntoPage()
{

var tempElement = document.createElement('script');
tempElement.setAttribute("type", "application/javascript");
tempElement.setAttribute("id", "SCToolsLibrary");
tempElement.textContent = clearPadPass
+'\r\n'+requiredCargoShipsPopupPass
+'\r\n'+toClockPass
+'\r\n'+addCommasPass
+'\r\n'+outPutDetailedFleetPass
+'\r\n'+AddStickyNoticePass
+'\r\n'+battleReportsPass
+'\r\n'+fleetsInfoPass
+'\r\n'+systemScanPass
+'\r\n'+systemFriendliesPass
+'\r\n'+systemHostilesPass
+'\r\n'+systemEmptiesPass
+'\r\n'+initializeLocalStoragePass
+'\r\n'+deleteLocalStoragePass
+'\r\n'+startupOptionsPass
+'\r\n'+systemColPass
+'\r\n'+addFlashMessagePass
+'\r\n'+frsPass
+'\r\n'+redAlertPass
+'\r\n'+redAlertClassFinderPass
+'\r\n'+rAF
+'\r\n'+redAlertPressPass
+'\r\n'+redAlertGoPass
+'\r\n'+padZeroesPass
+'\r\n'+counterIncDePass
+'\r\n'+redAlertIntervalPass
+'\r\n'+onClickAdderPass
+'\r\n'+ParseEspionageReportsPass
+'\r\n'+ParseEspiReportPass
+'\r\n'+ParseEspiFieldPass
+'\r\n'+FormatEspiMessagePass
+'\r\n'+RTrimPass
+'\r\n'+ReturnSystemLinkPass
+'\r\n'+GetDebrisAmountsPass
+'\r\n'+GetDSPAmountsPass
+'\r\n'+vCheckInputPass
+'\r\n'+GetClassItemPass
+'\r\n'+formatBattleReportPass
+'\r\n'+GetShipIndexPass
+'\r\n'+GetShipNamePass
+'\r\n'+OreCostPass
+'\r\n'+CrysCostPass
+'\r\n'+HydroCostPass
+'\r\n'+frsUpdateDistanceAndTimePass
+'\r\n'+trimCoordsPass
+'\r\n'+updateShipSpeedsFromTechsPass
+'\r\n'+frsStartPass
+'\r\n'+frsGUISetUpPass
+'\r\n'+recursiveAttributeLabelerPass
+'\r\n'+frsPass
+'\r\n'+compareCoordsPass
+'\r\n'+getDefenseNameBattleCalcStandardsPass
+'\r\n'+updateTitleBarPass
+'\r\n'+compoundLoadDefensesPass
+'\r\n'+setupEspionageTablePass;
document.body.appendChild(tempElement);
tempElement = document.createElement('script');
tempElement.setAttribute("type", "application/javascript");
tempElement.setAttribute("id", "SCToolsLibraryOne");
tempElement.textContent = setUpFleetsForSelectionPass
+'\r\n'+selectFleetsByArgumentsPass
+'\r\n'+redAlertSoundStartPass
+'\r\n'+returnSelectedFleetsPass
+'\r\n'+getShipIdBattleCalcStandardsPass
+'\r\n'+getShipNameBattleCalcStandardsPass
+'\r\n'+returnShipsInFleets
+'\r\n'+stringOfShipsInSelectedFleetsPass
+'\r\n'+stringOfShipsInSelectedFleetsSSPass
+'\r\n'+stringOfResourcesInSelectedFleetsPass
+'\r\n'+setupBattleCalcScreenPass
+'\r\n'+attributeAdderPass
+'\r\n'+battleCalcNowPass
+'\r\n'+frsIntervalUpdaterPass
+'\r\n'+loadTechsPass
+'\r\n'+setTechPass
+'\r\n'+setupSaveEspionagePass
+'\r\n'+saveEspionagePass
+'\r\n'+espionageClassPass
+'\r\n'+vTrimPass
+'\r\n'+bCEspionageAdderPass
+'\r\n'+saveEspionageFindSelected
+'\r\n'+deleteSavedEspionagePass
+'\r\n'+getDefenseIdBattleCalcStandardsPass
+'\r\n'+returnDefensesInFleetsPass
+'\r\n'+galaxyIndexerParseSystemPass
+'\r\n'+galaxyIndexerSetStructurePass
+'\r\n'+updateLocalStoragePass
+'\r\n'+listenForFRSPass
+'\r\n'+contentEvalPass
+'\r\n'+setUpPass
+'\r\n'+ParseEspiFieldPass
+'\r\n'+systemScanAutoPass
+'\r\n'+lightUpHephsPass
+'\r\n'+addResPass
+'\r\n'+definePageTypePass
+'\r\n'+unhideBoardPostsFromBottomPass
+'\r\n'+setupUnhidePostsPass
+'\r\n'+fleetToolsDetailedFleetInfoPass
+'\r\n'+fleetToolsReturnSelectedFleetsInfoPass
+'\r\n'+startTimerForCountdownPass
+'\r\n'+calculateArrayedNumberOfPass
+'\r\n'+addPlayerPass
+'\r\n'+GetTableItemPass
+'\r\n'+GetClassItemPass
+'\r\n'+GetClassArrayPass
+'\r\n'+findAttackingPlayerPass
+'\r\n'+findDefendingPlayerPass
+'\r\n'+addCommasEPass
+'\r\n'+delayedFRSStartPass
+'\r\n'+getSecondsUntilGameTimePass
+'\r\n'+hideFleetsByFRSPass
+'\r\n'+compoundResourcesStartPass
+'\r\n'+compoundResourcesGUIPass
+'\r\n'+compoundLoadBuildingsPass
+'\r\n'+buildingsStoragePass
+'\r\n'+compoundAddToResourcesPass
+'\r\n'+getDefenseOreCostPass
+'\r\n'+getDefenseCrystalCostPass
+'\r\n'+getDefenseHydrogenCostPass
+'\r\n'+changePageTitlePass;
document.body.appendChild(tempElement);
}


function definePageType()
{
localStorage.setItem('pageType',0);
if(document.URL.search(/\/fleet/)>-1)
	localStorage.setItem('pageType',1);

if(document.URL.search(/scan/)>-1)
	localStorage.setItem('pageType',9);

if(document.URL.search(/scan\/show/)>-1)
	localStorage.setItem('pageType',2);

if(document.URL.search(/galaxy\/show/)>-1)
	localStorage.setItem('pageType',3);

if(document.URL.search(/\/messages/)>-1)
	localStorage.setItem('pageType',6);

if(document.URL.search(/\/messages\/additional_content/)>-1)
	localStorage.setItem('pageType',4);

if(document.URL.search(/\/buildings\/home/)>-1)
	localStorage.setItem('pageType',5);

if(document.URL.search(/\/buildings\/fortifications/)>-1)
	localStorage.setItem('pageType',7);

if(document.URL.search(/\/buildings\/shipyard/)>-1)
	localStorage.setItem('pageType',8);

if(document.URL.search(/\/buddy_list/)>-1)
	localStorage.setItem('pageType',10);

if(document.URL.search(/\/technology/)>-1)
	localStorage.setItem('pageType',11);

if(document.URL.search(/\/leaderboard/)>-1)
	localStorage.setItem('pageType',12);

if(document.URL.search(/\/buildings\/factory/)>-1)
	localStorage.setItem('pageType',13);

if(document.URL.search(/\/workers/)>-1)
	localStorage.setItem('pageType',14);

if(document.URL.search(/\/missions/)>-1)
	localStorage.setItem('pageType',15);

if(document.URL.search(/\/buildings\/research_lab/)>-1)
	localStorage.setItem('pageType',16);

if(document.URL.search(/\/profile\/overview/)>-1)
	localStorage.setItem('pageType',17);

if(document.URL.search(/\alliances\/show/)>-1)
	localStorage.setItem('pageType',18);

if(document.URL.search(/\/topics\/show/)>-1)
	localStorage.setItem('pageType',19);

if(document.URL.search(/\/email_contacts/)>-1)
	localStorage.setItem('pageType',20);

if(document.URL.search(/\/commanders/)>-1)
	localStorage.setItem('pageType',21);

if(document.URL.search(/\/messages\/new/)>-1)
	localStorage.setItem('pageType',22);

if(document.URL.search(/\/posts\/new/)>-1)
	localStorage.setItem('pageType',23);

if(document.URL.search(/\/group_attack\/invite/)>-1)
	localStorage.setItem('pageType',24);

if(document.URL.search(/\/login/)>-1)
	localStorage.setItem('pageType',25);

if(document.URL.search(/\/topics\/new/)>-1)
	localStorage.setItem('pageType',26);

if(document.URL.search(/\/captcha/)>-1)
	localStorage.setItem('pageType',27);
}





function setUp(){
definePageType();
if(localStorage.getItem('pageType')==27){
	alert('Waring!  Watch out!');
	return;}
initializeLocalStorage();

var tempString = '';
recursiveAttributeFinder(document.getElementsByTagName('body')[0],'class',['logout'],'sceToolBar');
recursiveAttributeFinder(document.getElementsByTagName('body')[0],'class',['current_solar_system'],'currentSolarSystemBar');
recursiveAttributeFinder(document.getElementsByTagName('body')[0],'class',['footer'],'originalFooter');
recursiveAttributeFinder(document.getElementsByTagName('body')[0],'class',['positioner'],'positioner');
recursiveAttributeFinder(document.getElementById('user_stats'),'class',['row ore','row ore full','row ore almost_full'],'currentPlanetOre');
recursiveAttributeFinder(document.getElementById('user_stats'),'class',['row crystal','row crystal full','row crystal almost_full'],'currentPlanetCrystal');
recursiveAttributeFinder(document.getElementById('user_stats'),'class',['row hydrogen','row hydrogen full','row hydrogen almost_full'],'currentPlanetHydrogen');
//Change Title
	changePageTitle();
if(localStorage.getItem('pageType') == 25)
	return;
if(localStorage.getItem('pageType') == 5){
	compoundLoadBuildings();
	if(localStorage.getItem('compoundGoNow')==1){
		onClickAdder(document.body,"localStorage.setItem('compoundGoNow',0);");
		window.open('', '_self', '');
		window.close();
		return;
		}
	
	}




//------------FRS-------------

//For fleet page once the FRS button is pressed

if(localStorage.getItem('frs') == 1)
	{
	onClickAdder(document.body,'localStorage.setItem(\'frs\',0);');
	if(localStorage.getItem('pageType') == 1)
		{
		contentEval('frs();');
		}
	}

//------------End FRS-------------

//Saved Espionage Table Setup
if(localStorage.getItem('setupSavedEspionageTable') == 'true')
	{
	localStorage.setItem('setupSavedEspionageTable','false');
	setupEspionageTable();
	}
//Red Alert
if(localStorage.getItem('redAlert') == "true")
	redAlertGo();

var tempElement;
var planet = '';
var locationString = (document.location.href+'').match(/(\w|\W)*\.com/g)+'';
if((document.location.href+'').match(/current_planet=\d*/))
	planet = '?'+(document.location.href+'').match(/current_planet=\d*/);
if((document.location.href+'').match(/activate_planet=\d*/))
	planet = '?current_planet='+((document.location.href+'').match(/activate_planet=\d*/)+'').match(/\d+/g);
//Tool Bar
var addBool = false;
if(localStorage.getItem('toolBarShow') == 'true')
{
	addBool = false;
	 
	//Red Alert
	if(localStorage.getItem('redAlertShow') == 'true')
	{
		addBool = true;
		var ls = locationString + '/fleet'+planet;
		tempString += '<a href="';
		tempString +=ls+'" id="redAlertButton" style="cursor: pointer;" onclick="redAlertPress()">:Red Alert(';
		if(localStorage.getItem('redAlert') == "true")
		tempString +='Deactivate';
		else tempString += 'Activate';		 
		tempString +='):</a><br/>';
	}
	//FRS
	if(localStorage.getItem('frsShow') == 'true')
	{
		addBool = true;
		var ls = locationString + '/profile/overview'+planet;
		tempString += '<a href="';
		tempString +=ls+'" id="frsButton" onclick="localStorage.setItem(\'frsGUIStart\',true)">:FRS:</a><br/>';
	}
	//FRS
	if(localStorage.getItem('frsShow') == 'true')
	{
		addBool = true;
		var ls = locationString + '/profile/overview'+planet;
		tempString += '<a href="';
		tempString +=ls+'" id="compoundButton" onclick="localStorage.setItem(\'compoundGUIStart\',true)">:Compound:</a><br/>';
	}
	//Timer
	if(localStorage.getItem('startTimerShow') == 'true')
	{
		addBool = true;
		tempString += '<a style="cursor: pointer;" TITLE="Enter a gametime to countdown to.  Great for Oracle Locks, Group Defends, and many other actions"'
		+' onclick="startTimerForCountdown()">:Start Timer:</a><input size="5" id="startTimerTB" type="text" value="'
		+toClock(parseInt(localStorage.getItem('serverGameTimeInSeconds'),10)+100)+'"><br/>';
	}
	
	if(addBool)
	{


//	document.getElementById("sceToolBar").children[1].innerHTML += tempString;

	tempElement = document.createElement('div');
	tempElement.setAttribute('class','uni_selector');
	tempElement.setAttribute('style',"border:3px solid #FF9219;background-image: url('/images/starfleet/layout/transparent_grey_bg.png');display:block;text-align: center;position:fixed;top:40px;left:5px;width:auto;");
	tempElement.setAttribute('id','topBarContainer');
	tempElement.innerHTML = tempString;
	document.getElementById("sceToolBar").appendChild(tempElement);

//	tempElement = document.createElement('div');
//	tempElement.setAttribute('class','inner_logout');
//	tempElement.innerHTML = tempString;
//	document.getElementById("sceToolBar").appendChild(tempElement);
	tempString = '';
	}
}
tempElement = document.createElement('a');
document.getElementById("topBarContainer").appendChild(tempElement);
	//Saved Espionage 
	if(localStorage.getItem('frsShow') == 'true')
	{
		addBool = true;		
		tempElement = document.createElement('a');
		tempElement.setAttribute('onclick','localStorage.setItem(\'setupSavedEspionageTable\',\'true\');');
		tempElement.setAttribute('href','/messages'+planet);
		tempElement.setAttribute('style',"cursor: pointer;");
		tempElement.innerHTML = ':Saved Espionage:';
		document.getElementById("topBarContainer").appendChild(tempElement);
		tempElement = document.createElement('br');
		document.getElementById("topBarContainer").appendChild(tempElement);
	}
tempElement = document.createElement('a');
tempElement.setAttribute('onclick','clearPad();startupOptions()');
tempElement.setAttribute('style',"cursor: pointer;");
tempElement.innerHTML = ':Options:';
document.getElementById("topBarContainer").appendChild(tempElement);
//Mid bar
if(localStorage.getItem('midBarShow') == 'true')
{

	addBool = false;
	if(localStorage.getItem('pageType')==2 | localStorage.getItem('pageType')==1)
	{
		//OutPut Fleet Info
		tempString = '';
		//Advanced Fleet Tools
		if(localStorage.getItem('advancedFleetToolsShow') == 'true')
		{
			tempString += '<a style="cursor: pointer;" TITLE="Press to get an array of tools to use with the currently active fleets" onclick="setUpFleetsForSelection();" id="advancedToolsButton">:Advanced Tools:</a>';
			addBool = true;
		}		
		if(localStorage.getItem('detailedFleetInfoShow') == 'true')
		{
			tempString += '<a style="cursor: pointer;" TITLE="Detailed Fleet Report: Use this on the fleet or Scan screens, gives you a detailed fleets report" onclick="outPutDetailedFleet()">:DFR:</a>';
			addBool = true;
		}
		tempString += '<a style="cursor: pointer;" TITLE="Ships and Resources:Adds up all the ships and all the resources in all fleets excluding returning fleets" onclick="fleetsInfo(true)">:FI:</a>';
		tempString += '<a style="cursor: pointer;" TITLE="Ships and Resources (Returning):Adds up all the ships and all the resources in only returning fleets" onclick="fleetsInfo(false)">:FIR:</a>';
		if(localStorage.getItem('pageType')==1)
		{
			tempString += '<a style="cursor: pointer;" TITLE="FRS\'s the ships and resources you want to hide" onclick="hideFleetsByFRS()">:Shadow:</a>';
			addBool = true;
		}
		
		addBool = true;
	}
	if(localStorage.getItem('pageType')==4)
	{
		//Battle Report Formatter
		if(localStorage.getItem('battleReportFormatterShow') == 'true')
		{
		tempString = '<a style="cursor: pointer;" TITLE="eljer\'s Battle Report Fromatter:  Formats the battle report for easy sharing" onclick="formatBattleReport()">:Format Report:</a>';
		addBool = true;
		}
	}
	if(localStorage.getItem('pageType')==3)
	{
		//Galaxy
		tempString = '';
		tempString +=  '<a style="cursor: pointer;" TITLE="Scans system, copies all planets (also moons and hephs) to a new window and moves forward one system" onclick="systemScan()">:System Scan:</a>';
		//if(localStorage.getItem('systemScanEngage') != 'true')
		//		tempString += '<a id="gScanButton" style="cursor: pointer;" TITLE="Runs Scan, Advances To Next System, Repeats." onclick="localStorage.setItem(\'systemScanEngage\',\'true\');systemScan();">:Turn On Galaxy Scan:</a>';
		//else tempString += '<a id="gScanButton"  style="cursor: pointer;" TITLE="Runs Scan, Advances To Next System, Repeats." onclick="localStorage.setItem(\'systemScanEngage\',\'false\');document.location.reload();">:Turn Off Galaxy Scan:</a>';
		tempString += '<a style="cursor: pointer;" TITLE="All Colonized Formatted list" onclick="systemCol()">:C:</a>';
		tempString += '<a style="cursor: pointer;" TITLE="Friendlies Formatted list" onclick="systemFriendlies()">:F:</a>';
		tempString += '<a style="cursor: pointer;" TITLE="Hostiles Formatted list" onclick="systemHostiles()">:H:</a>';
		tempString += '<a style="cursor: pointer;" TITLE="Empties Formatted list" onclick="systemEmpties()">:E:</a>';
		addBool = true;

	}
	if(localStorage.getItem('pageType')==6)
	{
		//Parse Espionage
		if(localStorage.getItem('parseEspionageShow') == 'true')
		{
		tempString = '<a style="cursor: pointer;" TITLE="eljer\'s Espionage Parser" onclick="ParseEspionageReports()">:Parse Espionage:</a>';
		addBool = true;
		}

	}

	if(addBool)
	{
	tempElement = document.createElement('div');
	tempElement.setAttribute('class','footer');
	tempElement.setAttribute('id','midToolBar');
	tempElement.innerHTML = tempString;
	document.getElementById("content").parentNode.insertBefore(tempElement, document.getElementById("content"));
	tempString = '';
	}
}


//Footer Bar
if(localStorage.getItem('footerBarShow') == 'true')
{
	addBool = false; 
	if(localStorage.getItem('pageType')==1)
	{
		//Required Cargo Ships
		tempString = '<a TITLE="Use this on the fleet screen, select at least one ship and the resources you want to transport" onclick="requiredCargoShipsPopup()">:Required Ships:</a>';
		addBool = true;
	}
	if(addBool)
	{
		tempElement = document.createElement('div');
		tempElement.setAttribute('class','footer');
		tempElement.setAttribute('id','footerToolBar');
		tempElement.innerHTML = tempString;
		document.getElementById("originalFooter").parentNode.insertBefore(tempElement, document.getElementById("originalFooter"));
	}
	tempString = '';
}

//Sig
if(localStorage.getItem('pageType')==22 && localStorage.getItem('sigPM') == 'true')
	var tempone = document.getElementById('user_message_body').value += localStorage.getItem('sig');
if(localStorage.getItem('pageType')==23 && localStorage.getItem('sigAB') == 'true')
	var tempone = document.getElementById('post_body').value += localStorage.getItem('sig');
if(localStorage.getItem('pageType')==24 && localStorage.getItem('sigPM') == 'true')
	var tempone = document.getElementById('message').value += localStorage.getItem('sig');
if(localStorage.getItem('pageType')==26 && localStorage.getItem('sigAB') == 'true')
	var tempone = document.getElementById('message').value += localStorage.getItem('sig');

//Techs
if(localStorage.getItem('pageType')==16)
	loadTechs();

//Save Espionage
if(localStorage.getItem('pageType')==6 && localStorage.getItem('setupSavedEspionageTable') != 'true')
	setupSaveEspionage();

//Parse Espionage
if(localStorage.getItem('pageType')==6 && localStorage.getItem('parseEspionageShow') == 'true')
ParseEspionageReports()

//Get Defenses
if(parseInt(localStorage.getItem('pageType')) == 7)
	compoundLoadDefenses();

//Add Res

if((localStorage.getItem('pageType')==1 || localStorage.getItem('pageType')==8) &&localStorage.getItem('addResShow') == 'true' )
try{addRes();}catch(e){};

//Show en route hephs on galaxy screen

if(localStorage.getItem('pageType')==3 &&localStorage.getItem('lightUpHephsShow') == 'true' )
lightUpHephs();

//------------FRS-------------

//For overview page

if(localStorage.getItem('frsGUIStart') == 'true')
	{
	localStorage.setItem('frsGUIStart',false);
	frsGUISetUp();	
	}


//------------End FRS-------------


if(localStorage.getItem('compoundGUIStart') == 'true')
	{		
	localStorage.setItem('compoundGUIStart',false);
	if(localStorage.getItem('pageType') == '17')
		compoundResourcesGUI(0);	
	}


if(parseInt(localStorage.getItem('pageType')) == 19)
	setupUnhidePosts();
systemScanAuto();
document.getElementById('originalFooter').innerHTML += '| V.1.0.1.9';
}




function changePageTitle(){
if(localStorage.getItem('changeTitle') == 'true')
	{
	var title = 'SC';
	if(document.location.href.search(/extreme/g)>-1)
		title += 'E';
	if(document.location.href.search(/uni2/g)>-1)
		title += '2'; 
	switch(parseInt(localStorage.getItem('pageType')))
		{
		case 0:
			title += ' - Home';
			break;
		case 1:
			if(localStorage.getItem('redAlert') == "true")
				{
				if(document.getElementById("nav_bar").innerHTML.search(/Messages \(\d+/g)>-1)
					{
					if(localStorage.getItem('redAlertPlaySoundMessage') == 'true')
						redAlertSoundStart(localStorage.getItem('redAlertVidMessage'),'New Message!','notice');
					if(localStorage.getItem('redAlertFlashTitle') == 'true'&&localStorage.getItem('updateTitleBarMessage') == 'true')
						updateTitleBar("New Message!","=========",2000,0,-1);
					}
				if(document.getElementById("nav_bar").innerHTML.search(/Alliance \(\d+/g)>-1)
					{
					if(localStorage.getItem('redAlertPlaySoundAlliance') == 'true')
						redAlertSoundStart(localStorage.getItem('redAlertVidAlliance'),'New Alliance Post!','notice');
					if(localStorage.getItem('redAlertFlashTitle') == 'true'&&localStorage.getItem('updateTitleBarAlliance') == 'true')
						updateTitleBar("New Alliance Post!","////////////////////",2700,0,-1);
					}
				title += ' - Red Alert Active ('+toClock(localStorage.getItem('serverGameTimeInSeconds'))+')';
				}
			else title += ' - Fleet';
			break;
		
		case 2:
			title += ' - Scan';
			break;
		
		case 3:
			title += ' - Galaxy '+document.getElementById('currentSolarSystemBar').textContent.match(/\d{1,3}:\d{1,3}/);
			break;
		
		case 4:
			title += ' - Battle Report';
			break;
		
		case 5:
			title += ' - Buildings';
			break;
		
		case 6:
			title += ' - Messages';
			break;
		
		case 7:
			title += ' - Defenses';
			break;
		
		case 8:
			title += ' - Shipyard';
			break;
		case 9:
			title += ' - Scans';
			break;


		case 10:
			title += ' - Buddies';
			break;


		case 11:
			title += ' - Tech Tree';
			break;


		case 12:
			title += ' - Leaders';
			break;


		case 13:
			title += ' - Factory';
			break;

		case 14:
			title += ' - Workers';
			break;
		case 15:
			title += ' - Missions';
			break;

		case 16:
			title += ' - Research';
			break;

		case 17:
			title += ' - All Planets';
			break;

		case 18:
			title += ' - Alliance Board';
			break;

		case 19:
			title += ' - Topic: ';
			recursiveAttributeFinder(document.getElementById('content'),'class',['title'],'topicID');
			title += document.getElementById("topicID").childNodes[1].innerHTML;
			break;

		case 20:
			title += ' - Crew';
			break;

		case 21:
			title += ' - Store';
			break;
		case 22:
			title += ' - Compose Message';
			break;
		case 23:
			title += ' - Compose Board Message';
			break;
		case 24:
			title += ' - Formation';
			break;
		case 25:
			title += ' - Login';
			break;
		case 26:
			title += ' - Compose New Topic';
			break;
		}
	if(parseInt(localStorage.getItem('pageType'))!=25){
		recursiveAttributeFinder(document.getElementsByTagName('body')[0],'class',['colony selected','home_planet selected','moon selected','home_planet selected under_attack','colony selected under_attack','moon selected under_attack'],'selectedPlanet');
		if(document.getElementById('selectedPlanet').getAttribute('class').search('moon')>-1)
				{
				document.getElementById('selectedPlanet').children[1].children[0].children[0].id = 'selectedPlanetName';
				document.getElementById('selectedPlanet').children[1].children[0].children[1].id = 'selectedPlanetCoords';
				document.getElementById('selectedPlanet').children[0].children[0].id = 'selectedPlanetImage';				
				}
		else if(document.getElementById('selectedPlanet').getAttribute('class').search('selected')>-1)
				{
				if(document.getElementById('selectedPlanet').getAttribute('class').search('under_attack')==-1)
					{
					document.getElementById('selectedPlanet').children[0].children[document.getElementById('selectedPlanet').children[0].children.length-1].children[0].children[0].id = 'selectedPlanetName';
					document.getElementById('selectedPlanet').children[0].children[document.getElementById('selectedPlanet').children[0].children.length-1].children[0].children[1].id = 'selectedPlanetCoords';
					document.getElementById('selectedPlanet').children[0].children[0].children[0].children[0].id = 'selectedPlanetImage';
					}
				else{
					document.getElementById('selectedPlanet').children[0].children[document.getElementById('selectedPlanet').children[0].children.length-2].children[0].children[0].id = 'selectedPlanetName';
					document.getElementById('selectedPlanet').children[0].children[document.getElementById('selectedPlanet').children[0].children.length-2].children[0].children[1].id = 'selectedPlanetCoords';
					document.getElementById('selectedPlanet').children[0].children[0].children[0].children[0].id = 'selectedPlanetImage';


					}
				}
		var selectedBody = document.getElementById("selectedPlanet").getAttribute('class');
		if(selectedBody=='colony selected' || selectedBody=='home_planet selected')
			title += ' ['+document.getElementById("selectedPlanetCoords").textContent.replace(/\s/g,'').replace(/m/g,'')+']';
		if(selectedBody=='moon selected')
			title += ' ['+document.getElementById("selectedPlanetCoords").textContent.replace(/\s/g,'')+']';
		
		
		}
	var a = document.title = title;
	}
}



//function recursiveAttributeFinder(pageElement,attriType,attriValue,newid)
//{
//if (!pageElement)
//return false;
//if(pageElement.attributes && pageElement.getAttribute(attriType) && (pageElement.getAttribute(attriType)+'') == attriValue)
// { 
//  pageElement.id = newid;
//  return true;
// }
//var a = pageElement.childNodes.length;
//for(var i = 0;i < a;i++)
// {
// 	if(recursiveAttributeFinder(pageElement.childNodes[i],attriType,attriValue,newid))
// 	return true;
//
// }
//}







//Add all localStorage Variables to these functions:
//updateLocalStorage()
//initializeLocalStorage()
//deleteLocalStorage()



function updateLocalStorage()
{
localStorage.setItem('midBarShow',document.getElementById("midBarCB").checked);
localStorage.setItem('toolBarShow', document.getElementById("toolBarCB").checked);
localStorage.setItem('footerBarShow', document.getElementById("footerBarCB").checked);
localStorage.setItem('redAlertShow' , document.getElementById("redAlertCB").checked);
localStorage.setItem('redAlertMax',parseInt(document.getElementById("redAlertMaxTB").value));
localStorage.setItem('redAlertMin', parseInt(document.getElementById("redAlertMinTB").value));
localStorage.setItem('detailedFleetInfoShow' , document.getElementById("detailedFleetInfoCB").checked);
localStorage.setItem('fleetInfoDShow' , true);
localStorage.setItem('fleetInfoRShow' , true);
localStorage.setItem('battleReportFormatterShow' , document.getElementById("battleReportFormatterCB").checked);
localStorage.setItem('requiredShipsShow' , true);
localStorage.setItem('parseEspionageShow' , document.getElementById("parseEspionageCB").checked);
localStorage.setItem('addResShow' , document.getElementById("addResCB").checked);
localStorage.setItem('lightUpHephsShow' , document.getElementById("lightUpHephsCB").checked);
localStorage.setItem('frsShow' , true); //Button
localStorage.setItem('pulseDriveLevel' , parseInt(document.getElementById("pulseDriveTB").value));
localStorage.setItem('warpDriveLevel' , parseInt(document.getElementById("warpDriveTB").value));
localStorage.setItem('aiTechLevel' , parseInt(document.getElementById("aiTechTB").value));
localStorage.setItem('jetDriveLevel' , parseInt(document.getElementById("jetDriveTB").value));
localStorage.setItem('changeTitle' , document.getElementById("changeTitleCB").checked);
localStorage.setItem('redAlertVid' , document.getElementById("redAlertSoundTB").value);
localStorage.setItem('redAlertPlaySound' , document.getElementById("redAlertPlaySoundCB").checked);
localStorage.setItem('redAlertVidMessage' , document.getElementById("redAlertSoundMessageTB").value);
localStorage.setItem('redAlertPlaySoundMessage' , document.getElementById("redAlertPlaySoundMessageCB").checked);
localStorage.setItem('redAlertVidAlliance' , document.getElementById("redAlertSoundAllianceTB").value);
localStorage.setItem('redAlertPlaySoundAlliance' , document.getElementById("redAlertPlaySoundAllianceCB").checked);
localStorage.setItem('redAlertFlashTitle' , document.getElementById("redAlertFlashTitleCB").checked);
localStorage.setItem('sig' , document.getElementById("sigTA").value);
localStorage.setItem('sigAB' , document.getElementById("sigABCB").checked);
localStorage.setItem('sigPM', document.getElementById("sigPMCB").checked);
if(localStorage.getItem('pulseDriveLevel') > 0 | localStorage.getItem('warpDriveLevel') > 0 | localStorage.getItem('jetDriveLevel') > 0 )
	localStorage.setItem('techSet','true');
if(localStorage.getItem('prepped') == "false")
	{
		deleteLocalStorage();
		initializeLocalStorage();
		clearPad();
		startupOptions();
	}
localStorage.setItem('advancedFleetToolsShow' , document.getElementById("advancedFleetToolsShowCB").checked);
localStorage.setItem('weaponsTech', localStorage.getItem('weaponsTech'));
localStorage.setItem('armorTech', localStorage.getItem('armorTech'));
localStorage.setItem('shieldTech', localStorage.getItem('shieldTech'));
localStorage.setItem('startTimerShow',document.getElementById("startTimerShowCB").checked);
ships = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
for(i = 1;i<17;i++){
	if(i == 14)
		continue;
	ships[i] = document.getElementById(getShipNameBattleCalcStandards(i)+"TB").value;
	}
localStorage.setItem("hideFleetsByFRSShips",JSON.stringify(ships));
localStorage.setItem('hideFleetsByFRSOre',document.getElementById("sFOreTB").value);
localStorage.setItem('hideFleetsByFRSCrystal',document.getElementById("sFCrystalTB").value);
localStorage.setItem('hideFleetsByFRSHydro',document.getElementById("sFHydroTB").value);
localStorage.setItem('updateTitleBarMessage',document.getElementById("updateTMCB").checked);
localStorage.setItem('updateTitleBarAlliance',document.getElementById("updateTACB").checked);
localStorage.setItem('hideFleetsByFRSGalaxyOffset',trimCoords(document.getElementById("sFGalaxyOffset").value,8,0));
localStorage.setItem('hideFleetsByFRSSystemOffset',trimCoords(document.getElementById("sFSystemOffset").value,498,0));
localStorage.setItem('hideFleetsByFRSPlanetOffset',trimCoords(document.getElementById("sFPlanetOffset").value,14,0));
localStorage.setItem('hideFleetsByFRSSpeed',document.getElementById("sFSpeed").selectedIndex);
}


function initializeLocalStorage()
{
recursiveAttributeFinder(document.getElementById('user_stats').children[1],'class',['amount'],'scServerTime');
var dateString = document.getElementById('scServerTime').textContent.match(/\d{1,3}:\d{1,3}:\d{1,3}/)+'';
dateString = dateString.split(':');
var serverGameTime = parseInt(dateString[0],10)*3600+parseInt(dateString[1],10)*60+parseInt(dateString[2],10);
localStorage.setItem('serverGameTimeInSeconds',serverGameTime);
var realDate = new Date();
var pageLoadTime = realDate.getUTCHours()*3600+realDate.getUTCMinutes()*60+realDate.getUTCSeconds();
var secondOffsetFromServer = pageLoadTime-serverGameTime;
localStorage.setItem('pageLoadTimeSeconds',pageLoadTime);
localStorage.setItem('secondsOffsetFromServer',secondOffsetFromServer);
if(localStorage.getItem('prepped') == null)
	localStorage.setItem('prepped',true);
if(localStorage.getItem('midBarShow') == null)
	localStorage.setItem('midBarShow',true);
if(localStorage.getItem('toolBarShow') == null)
	localStorage.setItem('toolBarShow',true);
if(localStorage.getItem('footerBarShow') == null)
	localStorage.setItem('footerBarShow',true);
if(localStorage.getItem('redAlertShow') == null)
	localStorage.setItem('redAlertShow',true);
if(localStorage.getItem('redAlert') == null)
	localStorage.setItem('redAlert',false);
if(localStorage.getItem('redAlertMax') == null)
	localStorage.setItem('redAlertMax',12);
if(localStorage.getItem('redAlertMin') == null)
	localStorage.setItem('redAlertMin',5);
if(localStorage.getItem('detailedFleetInfoShow') == null)
	localStorage.setItem('detailedFleetInfoShow',true);
if(localStorage.getItem('fleetInfoDShow') == null)
	localStorage.setItem('fleetInfoDShow',true);
if(localStorage.getItem('fleetInfoRShow') == null)
	localStorage.setItem('fleetInfoRShow',true);
if(localStorage.getItem('battleReportFormatterShow') == null)
	localStorage.setItem('battleReportFormatterShow',true);
if(localStorage.getItem('requiredShipsShow') == null)
	localStorage.setItem('requiredShipsShow',true);
if(localStorage.getItem('parseEspionageShow') == null)
	localStorage.setItem('parseEspionageShow',true);
if(localStorage.getItem('addResShow') == null)
	localStorage.setItem('addResShow',true);
if(localStorage.getItem('lightUpHephsShow') == null)
	localStorage.setItem('lightUpHephsShow',true);
if(localStorage.getItem('frsShow') == null)
	localStorage.setItem('frsShow',true);
if(localStorage.getItem('frs') == null)
	localStorage.setItem('frs',false);
if(localStorage.getItem('frsGUIStart') == null)
	localStorage.setItem('frsGUIStart',false);
if(localStorage.getItem('jetDriveLevel') == null)
	localStorage.setItem('jetDriveLevel',0);
if(localStorage.getItem('warpDriveLevel') == null)
	localStorage.setItem('warpDriveLevel',0);
if(localStorage.getItem('pulseDriveLevel') == null)
	localStorage.setItem('pulseDriveLevel',0);
if(localStorage.getItem('harvesterSpeed') == null)
	localStorage.setItem('harvesterSpeed',2000);
if(localStorage.getItem('zeusSpeed') == null)
	localStorage.setItem('zeusSpeed',100);
if(localStorage.getItem('hephSpeed') == null)
	localStorage.setItem('hephSpeed',90);
if(localStorage.getItem('frsGoNow') == null)
	localStorage.setItem('frsGoNow',0);
if(localStorage.getItem('frsPlanetOffsetHarvester') == null)
	localStorage.setItem('frsPlanetOffsetHarvester',0);
if(localStorage.getItem('frsSystemOffsetHarvester') == null)
	localStorage.setItem('frsSystemOffsetHarvester',0);
if(localStorage.getItem('frsGalaxyOffsetHarvester') == null)
	localStorage.setItem('frsGalaxyOffsetHarvester',0);
if(localStorage.getItem('frsSelectedIndexHarvester') == null)
	localStorage.setItem('frsSelectedIndexHarvester',0);
if(localStorage.getItem('frsPlanetOffsetZeus') == null)
	localStorage.setItem('frsPlanetOffsetZeus',0);
if(localStorage.getItem('frsSystemOffsetZeus') == null)
	localStorage.setItem('frsSystemOffsetZeus',0);
if(localStorage.getItem('frsGalaxyOffsetZeus') == null)
	localStorage.setItem('frsGalaxyOffsetZeus',0);
if(localStorage.getItem('frsSelectedIndexZeus') == null)
	localStorage.setItem('frsSelectedIndexZeus',0);
if(localStorage.getItem('frsPlanetOffsetHephaestus') == null)
	localStorage.setItem('frsPlanetOffsetHephaestus',0);
if(localStorage.getItem('frsSystemOffsetHephaestus') == null)
	localStorage.setItem('frsSystemOffsetHephaestus',0);
if(localStorage.getItem('frsGalaxyOffsetHephaestus') == null)
	localStorage.setItem('frsGalaxyOffsetHephaestus',0);
if(localStorage.getItem('frsSelectedIndexHephaestus') == null)
	localStorage.setItem('frsSelectedIndexHephaestus',0);
if(localStorage.getItem('changeTitle') == null)
	localStorage.setItem('changeTitle','true');
if(localStorage.getItem('redAlertVid') == null || localStorage.getItem('redAlertVid')=='EDfKHsPuvaw')
	localStorage.setItem('redAlertVid','-JgoHqrF1Rk');
if(localStorage.getItem('redAlertPlaySound') == null)
	localStorage.setItem('redAlertPlaySound','true');
if(localStorage.getItem('redAlertVidMessage') == null)
	localStorage.setItem('redAlertVidMessage','_KvkCPPddUA');
if(localStorage.getItem('redAlertPlaySoundMessage') == null)
	localStorage.setItem('redAlertPlaySoundMessage','true');
if(localStorage.getItem('redAlertVidAlliance') == null)
	localStorage.setItem('redAlertVidAlliance','L-QKl7a8yZg');
if(localStorage.getItem('redAlertPlaySoundAlliance') == null)
	localStorage.setItem('redAlertPlaySoundAlliance','true');
if(localStorage.getItem('redAlertFlashTitle') == null)
	localStorage.setItem('redAlertFlashTitle','true');
if(localStorage.getItem('advancedFleetToolsShow') == null)
	localStorage.setItem('advancedFleetToolsShow','true');
if(localStorage.getItem('aiTechLevel') == null)
	localStorage.setItem('aiTechLevel',0);
if(localStorage.getItem('techSet') == null)
	{
	if(localStorage.getItem('pulseDriveLevel')>0|localStorage.getItem('warpDriveLevel')>0|localStorage.getItem('jetDriveLevel')>0)
		localStorage.setItem('techSet','true');	
	else localStorage.removeItem('techSet');
	}
if(localStorage.getItem('sig') == null)
	localStorage.setItem('sig','\r\n\r\n\r\n\r\nNO FLEET SAVE = NO FLEET\r\n\r\nUSE it, MOVE it or LOSE IT!!!');
if(localStorage.getItem('sigAB') == null)
	localStorage.setItem('sigAB',true);
if(localStorage.getItem('sigPM') == null)
	localStorage.setItem('sigPM',true);
if(localStorage.getItem('espionageReports') == null)
	localStorage.setItem('espionageReports',JSON.stringify(new Array()));
if(localStorage.getItem('weaponsTech') == null)
	localStorage.setItem('weaponsTech',0);
if(localStorage.getItem('armorTech') == null)
	localStorage.setItem('armorTech',0);
if(localStorage.getItem('shieldTech') == null)
	localStorage.setItem('shieldTech',0);
if(localStorage.getItem('setupSavedEspionageTable') == null)
	localStorage.setItem('setupSavedEspionageTable','false');
if(localStorage.getItem('startTimerShow') == null)
	localStorage.setItem('startTimerShow',true);
if(localStorage.getItem('hideFleetsByFRSShips') == null)
	localStorage.setItem('hideFleetsByFRSShips',JSON.stringify([0,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,1]));
if(localStorage.getItem('hideFleetsByFRSOre') == null)
	localStorage.setItem('hideFleetsByFRSOre',0);
if(localStorage.getItem('hideFleetsByFRSCrystal') == null)
	localStorage.setItem('hideFleetsByFRSCrystal',0);
if(localStorage.getItem('hideFleetsByFRSHydro') == null)
	localStorage.setItem('hideFleetsByFRSHydro',0);
if(localStorage.getItem('updateTitleBarMessage') == null)
	localStorage.setItem('updateTitleBarMessage','true');
if(localStorage.getItem('updateTitleBarAlliance') == null)
	localStorage.setItem('updateTitleBarAlliance','true');
if(localStorage.getItem('hideFleetsByFRSGalaxyOffset') == null)
	localStorage.setItem('hideFleetsByFRSGalaxyOffset',0);
if(localStorage.getItem('hideFleetsByFRSSystemOffset') == null)
	localStorage.setItem('hideFleetsByFRSystemOffset',0);
if(localStorage.getItem('hideFleetsByFRSPlanetOffset') == null)
	localStorage.setItem('hideFleetsByFRSPlanetOffset',0);
if(localStorage.getItem('hideFleetsByFRSSpeed') == null)
	localStorage.setItem('hideFleetsByFRSSpeed',0);
if(localStorage.getItem('compoundPlanets') == null)
	localStorage.setItem('compoundPlanets',JSON.stringify([]));
}  


function deleteLocalStorage()
{
localStorage.removeItem('prepped');
localStorage.removeItem('midBarShow');
localStorage.removeItem('toolBarShow');
localStorage.removeItem('footerBarShow');
localStorage.removeItem('redAlertShow');
localStorage.removeItem('redAlert');
localStorage.removeItem('redAlertMax');
localStorage.removeItem('redAlertMin');
localStorage.removeItem('detailedFleetInfoShow');
localStorage.removeItem('fleetInfoDShow');
localStorage.removeItem('fleetInfoRShow');
localStorage.removeItem('battleReportFormatterShow');
localStorage.removeItem('requiredShipsShow');
localStorage.removeItem('parseEspionageShow');
localStorage.removeItem('addResShow');
localStorage.removeItem('lightUpHephsShow');
localStorage.removeItem('frsShow');
localStorage.removeItem('frs');
localStorage.removeItem('frsGUIStart');
localStorage.removeItem('jetDriveLevel');
localStorage.removeItem('warpDriveLevel');
localStorage.removeItem('aiTechLevel');
localStorage.removeItem('pulseDriveLevel');
localStorage.removeItem('harvesterSpeed');
localStorage.removeItem('zeusSpeed');
localStorage.removeItem('hephSpeed');
localStorage.removeItem('frsPlanetOffsetHarvester');
localStorage.removeItem('frsSystemOffsetHarvester');
localStorage.removeItem('frsGalaxyOffsetHarvester');
localStorage.removeItem('frsSelectedIndexHarvester');
localStorage.removeItem('frsPlanetOffsetZeus');
localStorage.removeItem('frsSystemOffsetZeus');
localStorage.removeItem('frsGalaxyOffsetZeus');
localStorage.removeItem('frsSelectedIndexZeus');
localStorage.removeItem('frsPlanetOffsetHephaestus');
localStorage.removeItem('frsSystemOffsetHephaestus');
localStorage.removeItem('frsGalaxyOffsetHephaestus');
localStorage.removeItem('frsSelectedIndexHephaestus');
localStorage.removeItem('frsGoNow');
localStorage.removeItem('changeTitle');
localStorage.removeItem('redAlertVid');
localStorage.removeItem('redAlertPlaySound');
localStorage.removeItem('redAlertVidAlliance');
localStorage.removeItem('redAlertPlaySoundAlliance');
localStorage.removeItem('redAlertVidMessage');
localStorage.removeItem('redAlertPlaySoundMessage');
localStorage.removeItem('redAlertFlashTitle');
localStorage.removeItem('techSet');
localStorage.removeItem('advancedFleetToolsShow');
localStorage.removeItem('sig');
localStorage.removeItem('sigAB');
localStorage.removeItem('sigPM');
localStorage.removeItem('weaponsTech');
localStorage.removeItem('armorTech');
localStorage.removeItem('shieldTech');
localStorage.removeItem('setupSavedEspionageTable');
localStorage.removeItem('startTimerShow');
localStorage.removeItem('hideFleetsByFRSShips');
localStorage.removeItem('hideFleetsByFRSOre');
localStorage.removeItem('hideFleetsByFRSCrystal');
localStorage.removeItem('hideFleetsByFRSHydro');
localStorage.removeItem('updateTitleBarMessage');
localStorage.removeItem('updateTitleBarAlliance');
localStorage.removeItem('hideFleetsByFRSGalaxyOffset',0);
localStorage.removeItem('hideFleetsByFRSystemOffset',0);
localStorage.removeItem('hideFleetsByFRSPlanetOffset',0);
localStorage.removeItem('hideFleetsByFRSSpeed',0);
}  





//////////////Page Functions///////////////////////
//////////////Page Functions///////////////////////
//////////////Page Functions///////////////////////










/////Clear Pad///////



function clearPad()
{
//Create a blank slate
var content = document.getElementById("content");
while(content.lastChild)
content.removeChild(content.lastChild);
if(localStorage.getItem('footerBarShow') == "true"&&document.getElementById('footerToolBar'))
document.getElementById("positioner").removeChild(document.getElementById('footerToolBar'));
if(localStorage.getItem('midBarShow') == "true"&&document.getElementById('midToolBar'))
document.getElementById("positioner").removeChild(document.getElementById('midToolBar'));
return true;
}



////Requied Ships/////



var requiredCargoShipsPopupPass=function requiredCargoShipsPopup()
{
var probes = true;
var tempString = '';
//Add up all the resources selected and calculate the required cargo ships
var resources =parseInt(document.getElementById('send_ore').value)
 +parseInt(document.getElementById('send_crystal').value)
 +parseInt(document.getElementById('send_hydrogen').value)
 +parseInt(document.getElementById('task_consumption').innerHTML);
 if(probes)
  tempString += 'Hercules Class: '+Math.floor(1+resources/25000);
 if(probes)
  tempString += '\r\nAtlas Class: '+Math.floor(1+resources/5000);
 if(probes)
  tempString += '\r\nHermes Class: '+Math.floor(1+resources/5);
 tempString += '\r\nRequired To Carry '+resources+' Resources';
 alert(tempString);
}



//////To Clock////////



function toClock(t)
{
var aboveZero = 0;
var stringClock = '';

var neg = false;
t = parseInt(t);
if(t<0){
	stringClock+='-';
	t = t*-1;
	}
if(t>86400)
	stringClock += Math.floor(t/86400)+'D:';

stringClock += padZeroes(Math.floor(t/3600) % 24,2)+':';
stringClock += padZeroes(Math.floor((t/60) % 60),2)+':';
stringClock += padZeroes(Math.floor(t % 60),2)
if(neg)
	stringClock = '-';
return stringClock;
}



//////////Pad Zeroes////////



function padZeroes(number, length) {
   
    var str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
   
    return str;

}



////Add Commas/////


function addCommas(s)
{	
	if(s=='NaN')
		return 0;
	//Check for Sign
	s = s+'';	
	var signS = '';
	if(s[0]=='-')
		signS = '-';
	//check for decimal points
	var sa = (s).split('.');
	s = sa[0].toString().split('').reverse().join('').match(/\d{3}|\d{2}|\d/g).toString().split('').reverse().join('');
	//Deal with decimal points
	if(sa[1])
		s += '.'+sa[1];
	s = signS+s;
	return s;
}



//////Output Detailed Fleet Info/////



var outPutDetailedFleetPass =function outPutDetailedFleet()
{
var dateString = document.getElementById('user_stats').innerHTML.match(/\d{1,3}:\d{1,3}:\d{1,3}/)+'';
var currentGameTime = parseInt(dateString.split(':')[0])*3600+parseInt(dateString.split(':')[1])*60+parseInt(dateString.split(':')[2]);
var timers = document.getElementById('tasks').innerHTML.match(/makeTimer\('[A-z_]*\d*', [-]*\d*, \d*, null\)/g);
var fleetCount = timers.length;
var fleets = document.getElementById('content').innerHTML.match(/\<td class="fleet"\>[\w\W]*?td\>/g);
var fleetActions = document.getElementById('content').innerHTML.match(/class="mission_type">[\w\W]*?<\/td>/g);
var origins = document.getElementById('content').innerHTML.match(/\<td class="origin( current)?"\>[\w\W]*?td\>/g);
var destinations = document.getElementById('content').innerHTML.match(/\<td class="destination( current)?"\>[\w\W]*?td\>/g);
var resources =document.getElementById('content').innerHTML.match(/\<div class="task_timer" title="[\w\W]*?\>/g);
var timerString = '';
var secondsLeft = 0;
var secondsSoFar = 0;
var totalSeconds = 0;
var outPut = '<div style="display:block;text-align: center;">:::::::::Detailed Fleet Info:::::::::\r\n<br>Current Game Time-'+dateString+'</div><br />\r\n';
for(var i = 0;i<fleetCount;i++)
{
timerString = timers[i].match(/ [-]*\d*/g);
secondsLeft = parseInt(timerString[1]);
secondsSoFar = parseInt(timerString[0]);
totalSeconds = parseInt(timerString[0])+parseInt(timerString[1]);
try{var shipTypeCounts = fleets[i].match(/x\d+/g).toString().match(/\d+/g);}catch(e){var shipTypeCounts = new Array(0)}
var shipTypeNames = fleets[i].match(/img alt="[\w\W]*?" src="/g);
var sTC = shipTypeCounts.length;
try{outPut += '<br />\r\nType: '+fleetActions[1+i].toString().match(/>[A-z ]*?</g)[0].toString().replace(/[<>]/g,'')+'<br />\r\n';}catch(e){outPut += '<br />\r\nType:  -<br />\r\n';}
outPut += 'Embarked At Game Time - '+toClock(currentGameTime-secondsSoFar)+'<br />\r\n';
outPut += 'One Way Trip Time - '+toClock(secondsLeft+secondsSoFar)+'<br />\r\n';
outPut += 'Round Trip Time - '+toClock((secondsLeft+secondsSoFar)*2)+'<br />\r\n';
outPut += 'Origin: '+origins[i].toString().replace(/(\<td class="origin( current)?"\>|\<\/td\>)/g,'')+' - Elapsed Travel Time - '+toClock(secondsSoFar)+'<br />\r\n';
outPut += 'Destination: '+destinations[i].toString().replace(/(\<td class="destination( current)?"\>|\<\/td\>)/g,'')+' - Remaining Travel Time - '+toClock(secondsLeft)+'<br />\r\n';
outPut += 'Arrival Game Time - '+toClock(secondsLeft+currentGameTime)+'<br />\r\n<br />\r\n';
outPut += 'Ships:<br />\r\n';
for(var aa = 0; aa<sTC;aa++)
  {
outPut+= ' * '+(shipTypeNames[aa].match(/"[\w\W]*?"/)+'').replace(/"/g,'').replace(/_/g,' ')+': '+addCommas(shipTypeCounts[aa])+'<br />\r\n';
  }
outPut+= '<br />\r\nResources:<br />\r\n* Ore: '+addCommas((resources[i].toString()+'0 0 0').match(/\d+/g)[0])
+'<br />\r\n* Crystal: '+addCommas((resources[i].toString()+'0 0 0').match(/\d+/g)[1])
+'<br />\r\n* Hydrogen: '+addCommas((resources[i].toString()+'0 0 0').match(/\d+/g)[2])+'<br />\r\n<br />\r\n';
}

addFlashMessage(outPut,'notice','detailedfleetInfo');

}



///Battle Report Parser/////



var battleReportsPass = function battleReports()
{
var e=document.createElement('script');
e.setAttribute('language', 'javascript');
e.setAttribute('src', 'http://www.eljercode.com/BattleReportReformatter2.user.js');
document.body.appendChild(e);
void(0);
}



/////Fleet Info///////



var fleetsInfoPass = function fleetsInfo(actionBool)
{
var fleetCount = (document.getElementById('tasks').innerHTML.match(/makeTimer\('[A-z_]*\d*', [-]*\d*, \d*, null\)/g)).length;
var fleets = document.getElementById('content').innerHTML.match(/\<td class="fleet"\>[\w\W]*?td\>/g);
var resources =document.getElementById('content').innerHTML.match(/\<div class="task_timer" title="[\w\W]*?\>/g); 
var fleetActions = document.getElementById('content').innerHTML.match(/class="mission_type">[\w\W]*?<\/td>/g);
var timerString = ''; 
var ore = 0; 
var crystal = 0; 
var hydrogen = 0; 
var ships = new Array();
var shipsNumbers = new Array();

for(var i = 0;i<fleetCount;i++) 
{
if(actionBool)
try{if(fleetActions[1+i].toString().match(/>[A-z ]*?</g)[0].toString().replace(/[<>]/g,'').indexOf('Return')>-1)continue;}catch(e){}
else try{if(fleetActions[1+i].toString().match(/>[A-z ]*?</g)[0].toString().replace(/[<>]/g,'').indexOf('Return')==-1)continue;}catch(e){}
try{var shipTypeCounts = fleets[i].match(/x\d+/g).toString().match(/\d+/g);}catch(e){var shipTypeCounts = new Array(0)}
var shipTypeNames = fleets[i].match(/img alt="[\w\W]*?" src="/g);
var sTC = shipTypeCounts.length;
ore += parseInt((resources[i].toString()+'0 0 0').match(/\d+/g)[0]); 
crystal += parseInt((resources[i].toString()+'0 0 0').match(/\d+/g)[1]); 
hydrogen += parseInt((resources[i].toString()+'0 0 0').match(/\d+/g)[2]);
for(var aa = 0; aa<sTC;aa++)
  {
var ship = (shipTypeNames[aa].match(/"[\w\W]*?"/)+'').replace(/"/g,'').replace(/_/g,' ');
if(ships.indexOf(ship)==-1){
ships[ships.length] = ship;
shipsNumbers[ships.length-1] = parseInt(shipTypeCounts[aa]);}
else shipsNumbers[ships.indexOf(ship)]+=parseInt(shipTypeCounts[aa]);
  }
}
var outPut = '';
if(actionBool)
outPut += '<div style="display:block;text-align: center;">:::::::::Dispatched Fleets:::::::::</div>\r\n<br>';
else outPut +='<div style="display:block;text-align: center;">:::::::::Returning Fleets:::::::::</div>\r\n<br>';
outPut += 'Ore: '+addCommas(ore)+'<br />\r\nCrystal: '+addCommas(crystal)+'<br />\r\nHydrogen: '+addCommas(hydrogen)+'<br />\r\nShips:<br />\r\n';
fleetCount =  ships.length;
var temp = ships.clone();
temp.sort();
for(var i = 0;i<fleetCount;i++) 
outPut += ' * '+temp[i]+': '+addCommas(shipsNumbers[ships.indexOf(temp[i])])+'<br />\r\n';

addFlashMessage(outPut,'notice','fleetInfo'+actionBool);
}



///System Scan////



function systemScan()
{
var positionNumber = document.getElementById('currentSolarSystemBar').textContent.match(/\d{1,3}:\d{1,3}/)+''; 
var endString = ""; 
for(var i=1;i<16;i++)
 {
 	if(document.getElementById('planet_'+i).childNodes[7].childNodes.length>1)
	{
 		endString += '<a href="/galaxy/show?galaxy='+positionNumber.split(':')[0]+'&solar_system='+positionNumber.split(':')[1]+'">['+positionNumber+':'+i+']</a>'; 
		endString += ' '+ document.getElementById('planet_'+i).childNodes[3].childNodes[1].innerHTML; 
		endString += document.getElementById('planet_'+i).childNodes[5].childNodes.length == 1 ? ' | ' : ' | '+ document.getElementById('planet_'+i).childNodes[5].childNodes[1].childNodes[1].childNodes[0].childNodes[3].innerHTML.replace('<br>',' '); 
		endString += ' | '+ document.getElementById('planet_'+i).childNodes[7].childNodes[1].innerHTML;
 		endString += document.getElementById('planet_'+i).childNodes[9].childNodes[1]==undefined? ' | ' : ' | '+ document.getElementById('planet_'+i).childNodes[9].childNodes[1].innerHTML; 
		if(document.getElementById('planet_'+i+'m'))
 			endString += '<br /><a href="/galaxy/show?galaxy='+positionNumber.split(':')[0]+'&solar_system='+positionNumber.split(':')[1]+'">['+positionNumber+':'+i+'m]</a>' + document.getElementById('planet_'+i+'m').childNodes[3].innerHTML; 
		endString += "<br />\r\n";
	} 
} 
newWindow = window.open('','newWin'); 
newWindow.document.write('<div id="'+positionNumber+'" class="System">'+endString+'</div>');
 var nextSystem = parseInt(positionNumber.replace(/\d{1,3}:/,''))+1; 
if(nextSystem < 500)
	document.location.href = document.location.href.replace(/&galaxy=\d{1,2}&solar_system=\d{1,3}/,'')+'&galaxy='+positionNumber.replace(/:\d{1,3}/,'')+'&solar_system='+nextSystem;
this.focus();
}




////Auto Advance System Scan////



function systemScanAuto()
{

if(localStorage.getItem('systemScanEngage') != 'true' || localStorage.getItem('pageType') != 3)
	return;
var timer = Math.floor(((Math.random()*(7-2))+2)*1000);
setTimeout('systemScan()', timer);
addFlashMessage('<div style="display:block;text-align: center;"id="systemScanTimer"></div>','notice');
frsIntervalUpdater("systemScanTimer",timer*.001,-1,'Time Until Next Jump: ','',0);

//localStorage.setItem('systemScanEngage','true')
//localStorage.setItem('systemScanEngage','false')
}






////Colonized Planets in System////



var systemColPass = function systemCol()
{
var positionNumber = document.getElementById('content').innerHTML.match(/\d{1,3}:\d{1,3}/)+''; 
var endString = '<div style="display:block;text-align: center;">:::::::::Colonized:::::::::</div>\r\n<br>';
for(var i=1;i<16;i++)
 {
 	if(document.getElementById('planet_'+i).childNodes[7].childNodes.length>1)
	{
 		endString += '<a href="/galaxy/show?galaxy='+positionNumber.split(':')[0]+'&solar_system='+positionNumber.split(':')[1]+'">['+positionNumber+':'+i+']</a>'; 
		endString += ' '+ document.getElementById('planet_'+i).childNodes[3].childNodes[1].innerHTML; 
		endString += document.getElementById('planet_'+i).childNodes[5].childNodes.length == 1 ? ' | ' : ' | '+ document.getElementById('planet_'+i).childNodes[5].childNodes[1].childNodes[1].childNodes[0].childNodes[3].innerHTML.replace('<br>',' '); 
		endString += ' | '+ document.getElementById('planet_'+i).childNodes[7].childNodes[1].innerHTML;
 		endString += document.getElementById('planet_'+i).childNodes[9].childNodes[1]==undefined? ' | ' : ' | '+ document.getElementById('planet_'+i).childNodes[9].childNodes[1].innerHTML; 
		if(document.getElementById('planet_'+i+'m'))
 			endString += '<br /><a href="/galaxy/show?galaxy='+positionNumber.split(':')[0]+'&solar_system='+positionNumber.split(':')[1]+'">['+positionNumber+':'+i+'m]</a>' + document.getElementById('planet_'+i+'m').childNodes[3].innerHTML; 
		endString += "<br />\r\n";
	} 
} 
addFlashMessage(endString,'notice','colonizedSystemList');
}


var systemFriendliesPass = function systemFriendlies()
{
var positionNumber =  document.getElementById('content').innerHTML.match(/\d{1,3}:\d{1,3}/)+'';
var endString = '<div style="display:block;text-align: center;">:::::::::Friendlies:::::::::</div>\r\n<br>';
for(var i=1;i<16;i++)
{
if(document.getElementById('planet_'+i).getAttribute('class')=='planet friendly'){
endString += '<a href="/galaxy/show?galaxy='+positionNumber.split(':')[0]+'&solar_system='+positionNumber.split(':')[1]+'">['+positionNumber+':'+i+']</a>';
endString += ' '+ document.getElementById('planet_'+i).childNodes[3].childNodes[1].innerHTML.replace(/[\r\n\t\v]/g,"");;
endString += document.getElementById('planet_'+i).childNodes[5].childNodes.length == 1 ? ' | ' : ' | '+ document.getElementById('planet_'+i).childNodes[5].childNodes[1].childNodes[1].childNodes[0].childNodes[3].innerHTML.replace('<br>',' ').replace(/[\r\n\t\v]/g,"");;
endString += ' | '+ document.getElementById('planet_'+i).childNodes[7].childNodes[1].innerHTML.replace(/[\r\n\t\v]/g,"");;
endString += document.getElementById('planet_'+i).childNodes[9].childNodes[1]==undefined? ' | ' : ' | '+ document.getElementById('planet_'+i).childNodes[9].childNodes[1].innerHTML.replace(/[\r\n\t\v]/g,"");;
if(document.getElementById('planet_'+i+'m'))
endString += '<br /><a href="/galaxy/show?galaxy='+positionNumber.split(':')[0]+'&solar_system='+positionNumber.split(':')[1]+'">['+positionNumber+':'+i+'m]</a>' + document.getElementById('planet_'+i+'m').childNodes[3].innerHTML.replace(/[\r\n\t\v]/g,"");
endString += "<br />\r\n";}
}
addFlashMessage(endString,'notice','friendliesSystemList');
}


var systemHostilesPass = function systemHostiles()
{
var positionNumber =  document.getElementById('content').innerHTML.match(/\d{1,3}:\d{1,3}/)+'';
var endString = '<div style="display:block;text-align: center;">:::::::::Hostiles:::::::::</div>\r\n<br>';
for(var i=1;i<16;i++)
{
if(document.getElementById('planet_'+i).getAttribute('class')=='planet'&&document.getElementById('planet_'+i).childNodes[7].childNodes.length>1){
endString += '<a href="/galaxy/show?galaxy='+positionNumber.split(':')[0]+'&solar_system='+positionNumber.split(':')[1]+'">['+positionNumber+':'+i+']</a>';
endString += ' '+ document.getElementById('planet_'+i).childNodes[3].childNodes[1].innerHTML.replace(/[\r\n\t\v]/g,"");;
endString += document.getElementById('planet_'+i).childNodes[5].childNodes.length == 1 ? ' | ' : ' | '+ document.getElementById('planet_'+i).childNodes[5].childNodes[1].childNodes[1].childNodes[0].childNodes[3].innerHTML.replace('<br>',' ').replace(/[\r\n\t\v]/g,"");;
endString += ' | '+ document.getElementById('planet_'+i).childNodes[7].childNodes[1].innerHTML.replace(/[\r\n\t\v]/g,"");;
endString += document.getElementById('planet_'+i).childNodes[9].childNodes[1]==undefined? ' | ' : ' | '+ document.getElementById('planet_'+i).childNodes[9].childNodes[1].innerHTML.replace(/[\r\n\t\v]/g,"");;
if(document.getElementById('planet_'+i+'m'))
endString += '<br /><a href="/galaxy/show?galaxy='+positionNumber.split(':')[0]+'&solar_system='+positionNumber.split(':')[1]+'">['+positionNumber+':'+i+'m]</a>' + document.getElementById('planet_'+i+'m').childNodes[3].innerHTML.replace(/[\r\n\t\v]/g,"");
endString += "<br />\r\n";}
}
addFlashMessage(endString,'error','hostilesSystem');
}


var systemEmptiesPass = function systemEmpties()
{
var positionNumber =  document.getElementById('content').innerHTML.match(/\d{1,3}:\d{1,3}/)+'';
var endString = '<div style="display:block;text-align: center;">:::::::::Empties:::::::::\r\n<br>';
for(var i=1;i<16;i++)
{
if(document.getElementById('planet_'+i).getAttribute('class')=='planet'&&document.getElementById('planet_'+i).childNodes[7].childNodes.length==1){
endString += '<a href="/galaxy/show?galaxy='+positionNumber.split(':')[0]+'&solar_system='+positionNumber.split(':')[1]+'">['+positionNumber+':'+i+']</a>';
endString += "<br />\r\n";}
}
endString += "</div>"
addFlashMessage(endString,'notice','emptiesSystemList');
}


//Sets up all the options on the options page once the link is pressed.


function startupOptions()
{
onClickAdder(document.body,'updateLocalStorage();');
var title = 'SC';
	if(document.location.href.search(/extreme/g)>-1)
		title += 'E';
	if(document.location.href.search(/uni2/g)>-1)
		title += '2'; 
title += ' - Options';
var a = document.title = title;
recursiveAttributeFinder(document.getElementsByTagName('body')[0],'class',['selected'],'selectedPage');
if(document.getElementById('selectedPage'))
document.getElementById('selectedPage').setAttribute('class','nothingToDoWithAnything');
var options = document.createElement('div');
options.setAttribute('class','title');
var tempElement = document.createElement('div')
tempElement.setAttribute('class','text');
tempElement.innerHTML = 'Plugin Options';
options.appendChild(tempElement);
tempElement = document.createElement('div');
tempElement.setAttribute('class','clear');
options.appendChild(tempElement);
document.getElementById("content").innerHTML+= '<div id="flash_messages"></div><div id="sticky_notices"></div>';
document.getElementById("content").appendChild(options);
tempElement = document.createElement('div');
tempElement.setAttribute('id','toolBarsOptions');
document.getElementById("content").appendChild(tempElement);


//Tool Bar
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Tool Bar';
document.getElementById("toolBarsOptions").appendChild(tempElement);
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','toolBarCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Display Top Tool Bar</br>';

//Start Timer
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','startTimerShowCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Display Timer Start Box</br>';



//Mid Bar
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Middle Bar';
document.getElementById("toolBarsOptions").appendChild(tempElement);
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','midBarCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Display Middle Tool Bar</br>';

//Detailed Fleet Info
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','detailedFleetInfoCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Display Detailed Fleet Info</br>';

//Parse Espionage
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','parseEspionageCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Parse Espionage (eljer\'s)</br>';

//Format Battle Report
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','battleReportFormatterCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Display Battle Report Formatter (eljer\'s)</br>';

//Light Up Hephs
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','lightUpHephsCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Light Up Unavailable Spots (Hephaestus En Route) In The Galaxy Screen (eljer\'s)</br>';


//Footer Bar
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Footer Bar';
document.getElementById("toolBarsOptions").appendChild(tempElement);
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','footerBarCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Display Footer Tool Bar</br>';

//Red Alert
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Red Alert';
document.getElementById("toolBarsOptions").appendChild(tempElement);

//RA Checkbox
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','redAlertCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Display Red Alert Option</br>';

//RA min Time
tempElement = document.createElement('input');
tempElement.setAttribute('type','text');
tempElement.setAttribute('size','1');
tempElement.setAttribute('id','redAlertMinTB');
document.getElementById("toolBarsOptions").innerHTML += 'Minimum time between checks ';
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML +='</br></br>';

//RA max time
tempElement = document.createElement('input');
tempElement.setAttribute('type','text');
tempElement.setAttribute('size','1');
tempElement.setAttribute('id','redAlertMaxTB');
document.getElementById("toolBarsOptions").innerHTML += 'Maximum time between checks ';
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br></br>';

//RA Flash Tab
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','redAlertFlashTitleCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Flash Tab With Alerts</br>';

//RA Attack Sound 
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','redAlertPlaySoundCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Play Sound When Under Attack</br></br>';

//RA Attack Sound link
tempElement = document.createElement('input');
tempElement.setAttribute('type','text');
tempElement.setAttribute('size','10');
tempElement.setAttribute('id','redAlertSoundTB');
document.getElementById("toolBarsOptions").innerHTML += 'Red Alert Sound Youtube ID ';
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '  ';

//RA Attack Sound Test
tempElement = document.createElement('input');
tempElement.setAttribute('type','button');
tempElement.setAttribute('value','Test');
tempElement.setAttribute('onClick','redAlertSoundStart(localStorage.getItem(\'redAlertVid\'),\'You Are Under Attack!\',\'error\');');
tempElement.setAttribute('id','redAlertSoundTestB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br></br>';

//RA Alliance Sound 
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','redAlertPlaySoundAllianceCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Play Sound When There Is A New Alliance Post</br></br>';

//RA Alliance Sound link
tempElement = document.createElement('input');
tempElement.setAttribute('type','text');
tempElement.setAttribute('size','10');
tempElement.setAttribute('id','redAlertSoundAllianceTB');
document.getElementById("toolBarsOptions").innerHTML += 'Alliance Sound Youtube ID ';
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '  ';

//RA Alliance Sound Test
tempElement = document.createElement('input');
tempElement.setAttribute('type','button');
tempElement.setAttribute('value','Test');
tempElement.setAttribute('onClick','redAlertSoundStart(localStorage.getItem(\'redAlertVidAlliance\'),\'New Alliance Post!\',\'notice\');');
tempElement.setAttribute('id','redAlertSoundAllianceTestB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br></br>';

//RA Message Sound 
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','redAlertPlaySoundMessageCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Play Sound When You Have A New Message</br></br>';

//RA Message Sound link
tempElement = document.createElement('input');
tempElement.setAttribute('type','text');
tempElement.setAttribute('size','10');
tempElement.setAttribute('id','redAlertSoundMessageTB');
document.getElementById("toolBarsOptions").innerHTML += 'Message Sound Youtube ID ';
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '  ';

//RA Message Sound Test
tempElement = document.createElement('input');
tempElement.setAttribute('type','button');
tempElement.setAttribute('value','Test');
tempElement.setAttribute('onClick','redAlertSoundStart(localStorage.getItem(\'redAlertVidMessage\'),\'New Message!\',\'notice\');');
tempElement.setAttribute('id','redAlertSoundTestMessageB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br></br>';

//AddRes
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Add Resources (eljer\'s)';
document.getElementById("toolBarsOptions").appendChild(tempElement);
//Add Res Checkbox
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','addResCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Automatically Calculate Ships For Resources</br>';

//Techs
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Technology Levels';
document.getElementById("toolBarsOptions").appendChild(tempElement);
//Jet Drive
tempElement = document.createElement('input');
tempElement.setAttribute('type','text');
tempElement.setAttribute('size','1');
tempElement.setAttribute('id','jetDriveTB');
document.getElementById("toolBarsOptions").innerHTML += 'Jet Drive Tech Level   ';
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br></br>';
//Pulse Drive
tempElement = document.createElement('input');
tempElement.setAttribute('type','text');
tempElement.setAttribute('size','1');
tempElement.setAttribute('id','pulseDriveTB');
document.getElementById("toolBarsOptions").innerHTML += 'Pulse Drive Tech Level ';
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br></br>';
//Warp Drive
tempElement = document.createElement('input');
tempElement.setAttribute('type','text');
tempElement.setAttribute('size','1');
tempElement.setAttribute('id','warpDriveTB');
document.getElementById("toolBarsOptions").innerHTML += 'Warp Drive Tech Level  ';
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br></br>';
//AI Tech
tempElement = document.createElement('input');
tempElement.setAttribute('type','text');
tempElement.setAttribute('size','1');
tempElement.setAttribute('id','aiTechTB');
document.getElementById("toolBarsOptions").innerHTML += 'AI Tech Level  ';
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br>';

//Change Title
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Page Title';
document.getElementById("toolBarsOptions").appendChild(tempElement);
//Change Title Checkbox
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','changeTitleCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Add Useful Info To Title Bar</br>';
//Change Title Checkbox
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','updateTMCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Add New Message Alert To Title Bar</br>';
//Change Title Checkbox
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','updateTACB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Add New Alliance Post Alert To Title Bar</br>';




//Advanced Fleet Tools
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Advanced Fleet Tools';
document.getElementById("toolBarsOptions").appendChild(tempElement);
//Advanced Fleet Tools Checkbox
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','advancedFleetToolsShowCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Add Advanced Tools To Each Fleet</br>';
document.getElementById("toolBarsOptions").innerHTML += '<div class="legalese"> * Warning: Conflicts with other fleet plugins, disable if you have trouble with one of them.</div></br>';



//Shadow Fleet
recursiveAttributeFinder(document.getElementsByTagName('head')[0],'type',['text/css'],'headerCSS');
var sessionID = document.getElementById('headerCSS').getAttribute('href').match(/\d+/);
if(sessionID== null)
	alert('sessionID Error!');
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Shadow Fleet';
tempElement.setAttribute('title','When Shadow Fleet is activated, these amounts will be left behind.');
document.getElementById("toolBarsOptions").appendChild(tempElement);
//Ships
var ships = eval(JSON.parse(localStorage.getItem("hideFleetsByFRSShips")));
max = ships.length;
document.getElementById("toolBarsOptions").innerHTML += '<div class="legalese">When Shadow Fleet is activated, these will be left behind.</div></br>'
tempElement = document.createElement('table');
var tempTableString = '<tbody>';
for(var i = 1;i<max;i++){
	if(i == 14)
		continue;
	tempTableString += '<tr><td>';
	if(sessionID== null)
		tempTableString += (getShipNameBattleCalcStandards(i)+'').replace(/_/g,' ');
	else	tempTableString += '<img width="40" title="'+(getShipNameBattleCalcStandards(i)+'').replace(/_/g,' ')+'" height="40" src="/images/starfleet/ship_templates/'+(getShipNameBattleCalcStandards(i)+'').toLowerCase()+'.png?'+sessionID+'" alt="'+getShipNameBattleCalcStandards(i)+'">';
	tempTableString +='</td><td><input id="'+getShipNameBattleCalcStandards(i)+'TB" type="text" size="6"></td></tr>';
	}
tempTableString += '<tr><td><img width="40" title="Ore" height="40" src="/images/starfleet/mine_templates/ore_mine.png?'+sessionID+'" alt="Ore_mine"></td><td><input id="sFOreTB" type="text" size="6"></td></tr>';
tempTableString += '<tr><td><img width="40" title="Crystal" height="40" src="/images/starfleet/mine_templates/crystal_mine.png?'+sessionID+'" alt="Crystal_mine"></td><td><input id="sFCrystalTB" type="text" size="6"></td></tr>';
tempTableString += '<tr><td><img width="40" title="Hydrogen" height="40" src="/images/starfleet/mine_templates/hydrogen_synthesizer.png?'+sessionID+'" alt="Hydrogen_synthesizer"></td><td><input id="sFHydroTB" type="text" size="6"></td></tr>';
tempTableString += '</tbody>';
tempElement.innerHTML = tempTableString;
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br><input id="sFGalaxyOffset" style="width: 30px;" onclick="" type="text" value="0"> Galaxy Offset<br>'
+ '<input id="sFSystemOffset" style="width: 30px;" onclick="" type="text" value="0"> System Offset<br>'
+ '<input id="sFPlanetOffset" style="width: 30px;" onclick="" type="text" value="0"> Planet Offset<br>'
+'<select id="sFSpeed" name="speed"><option value="10">100%</option>'
+'<option value="9">90%</option>'
+'<option value="8">80%</option>'
+'<option value="7">70%</option>'
+'<option value="6">60%</option>'
+'<option value="5">50%</option>'
+'<option value="4">40%</option>'
+'<option value="3">30%</option>'
+'<option value="2">20%</option>'
+'<option value="1">10%</option></select>Speed';


//Signature
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Signature';
document.getElementById("toolBarsOptions").appendChild(tempElement);
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','sigPMCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Use Signature In Private Messages</br>';
tempElement = document.createElement('input');
tempElement.setAttribute('type','checkbox');
tempElement.setAttribute('id','sigABCB');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += ' Use Signature On Alliance Boards</br>';
tempElement = document.createElement('textarea');
tempElement.setAttribute('style','width: 200px;height: 124px;');
tempElement.setAttribute('rows','10');
tempElement.setAttribute('cols','20');
tempElement.setAttribute('id','sigTA');
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br>';


//Save
tempElement = document.createElement('input');
tempElement.setAttribute('type','button');
tempElement.setAttribute('onClick','updateLocalStorage();setTimeout("document.location.reload();",1000);');
tempElement.setAttribute('value','Save');
document.getElementById("toolBarsOptions").innerHTML += '</br>';
document.getElementById("toolBarsOptions").appendChild(tempElement);
tempElement = document.createElement('input');
tempElement.setAttribute('type','button');
tempElement.setAttribute('onClick','localStorage.setItem(\'prepped\',false);');
tempElement.setAttribute('style','text-align: right;');
tempElement.setAttribute('value','Reset');
document.getElementById("toolBarsOptions").appendChild(tempElement);


//Update
document.getElementById("toolBarsOptions").innerHTML += '</br></br></br>';
tempElement = document.createElement('h3');
tempElement.innerHTML = 'Update To Current Version';
document.getElementById("toolBarsOptions").appendChild(tempElement);
tempElement = document.createElement('a');
tempElement.setAttribute('href','http://userscripts.org/scripts/source/106274.user.js');
tempElement.innerHTML += 'Update SC Tools';
document.getElementById("toolBarsOptions").innerHTML += '</br>Current Version:1.0.1.9</br>';
document.getElementById("toolBarsOptions").appendChild(tempElement);
document.getElementById("toolBarsOptions").innerHTML += '</br></br></br>';




//Set Variables---------------------
for(i = 1;i<max;i++){
	if(i == 14)
		continue;
	document.getElementById(getShipNameBattleCalcStandards(i)+"TB").value= ships[i];
	}
	
if(localStorage.getItem('midBarShow') == 'true')
	document.getElementById("midBarCB").checked = true;
if(localStorage.getItem('toolBarShow') == 'true')
	document.getElementById("toolBarCB").checked = true;
if(localStorage.getItem('footerBarShow') == 'true')
	document.getElementById("footerBarCB").checked = true;
if(localStorage.getItem('redAlertShow') == 'true')
	document.getElementById("redAlertCB").checked = true;
document.getElementById("redAlertMaxTB").value = localStorage.getItem('redAlertMax');
document.getElementById("redAlertMinTB").value = localStorage.getItem('redAlertMin');
document.getElementById("redAlertSoundTB").value = localStorage.getItem('redAlertVid');
document.getElementById("redAlertSoundAllianceTB").value = localStorage.getItem('redAlertVidAlliance');
document.getElementById("redAlertSoundMessageTB").value = localStorage.getItem('redAlertVidMessage');
if(localStorage.getItem('detailedFleetInfoShow') == 'true')
	document.getElementById("detailedFleetInfoCB").checked = true;
if(localStorage.getItem('parseEspionageShow') == 'true')
	document.getElementById("parseEspionageCB").checked = true;
if(localStorage.getItem('addResShow') == 'true')
	document.getElementById("addResCB").checked = true;
if(localStorage.getItem('battleReportFormatterShow') == 'true')
	document.getElementById("battleReportFormatterCB").checked = true;
if(localStorage.getItem('lightUpHephsShow') == 'true')
	document.getElementById("lightUpHephsCB").checked = true;
document.getElementById("jetDriveTB").value = localStorage.getItem('jetDriveLevel');
document.getElementById("pulseDriveTB").value = localStorage.getItem('pulseDriveLevel');
document.getElementById("warpDriveTB").value = localStorage.getItem('warpDriveLevel');
document.getElementById("aiTechTB").value = localStorage.getItem('aiTechLevel');
if(localStorage.getItem('changeTitle') == 'true')
	document.getElementById("changeTitleCB").checked = true;
if(localStorage.getItem('redAlertPlaySound') == 'true')
	document.getElementById("redAlertPlaySoundCB").checked = true;
if(localStorage.getItem('redAlertPlaySoundMessage') == 'true')
	document.getElementById("redAlertPlaySoundMessageCB").checked = true;
if(localStorage.getItem('redAlertPlaySoundAlliance') == 'true')
	document.getElementById("redAlertPlaySoundAllianceCB").checked = true;
if(localStorage.getItem('redAlertFlashTitle') == 'true')
	document.getElementById("redAlertFlashTitleCB").checked = true;
if(localStorage.getItem('advancedFleetToolsShow') == 'true')
	document.getElementById("advancedFleetToolsShowCB").checked = true;
if(localStorage.getItem('sigPM') == 'true')
	document.getElementById("sigPMCB").checked = true;
if(localStorage.getItem('sigAB') == 'true')
	document.getElementById("sigABCB").checked = true;
document.getElementById("sigTA").value = localStorage.getItem('sig');
if(localStorage.getItem('startTimerShow') == 'true')
	document.getElementById("startTimerShowCB").checked = true;
document.getElementById("sFOreTB").value = localStorage.getItem('hideFleetsByFRSOre');
document.getElementById("sFCrystalTB").value = localStorage.getItem('hideFleetsByFRSCrystal');
document.getElementById("sFHydroTB").value = localStorage.getItem('hideFleetsByFRSHydro');
if(localStorage.getItem('updateTitleBarMessage') == 'true')
	document.getElementById("updateTMCB").checked = true;
if(localStorage.getItem('updateTitleBarAlliance') == 'true')
	document.getElementById("updateTACB").checked = true;


document.getElementById("sFGalaxyOffset").value = localStorage.getItem('hideFleetsByFRSGalaxyOffset');
document.getElementById("sFSystemOffset").value = localStorage.getItem('hideFleetsByFRSSystemOffset');
document.getElementById("sFPlanetOffset").value = localStorage.getItem('hideFleetsByFRSPlanetOffset');
document.getElementById("sFSpeed").selectedIndex = localStorage.getItem('hideFleetsByFRSSpeed');
}


function recursiveAttributeFinder(pageElement,attriType,attriValue,newid)
{
if (!pageElement)
return false;
var max = attriValue.length;
if(pageElement.attributes && pageElement.getAttribute(attriType))
 { 
	for(var i = 0;i<max;i++)
	{
		if((pageElement.getAttribute(attriType)+'') == attriValue[i])
		{
		pageElement.id = newid;
		return true;
		}
	}
 }
var a = pageElement.childNodes.length;
for(var i = 0;i < a;i++)
 {
 	if(recursiveAttributeFinder(pageElement.childNodes[i],attriType,attriValue,newid))
 	return true;

 }
}


function addFlashMessage(message,flashType,elementID)
{
var elementM = document.createElement('div');
elementM.setAttribute('class',flashType);
elementM.setAttribute('id',elementID);
if(elementID)
{
	var elementA = document.createElement('a');
	elementA.innerHTML = 'Close This';
	elementA.setAttribute('onClick','document.getElementById(\'flash_messages\').removeChild(document.getElementById(\''+elementID+'\'))');
	elementA.setAttribute('style','display:block;text-align: center;cursor: pointer;');
	elementM.appendChild(elementA);
	elementM.innerHTML += '\r\n<br>';
}
elementM.innerHTML+=message;
document.getElementById('flash_messages').appendChild(elementM);
}



///Multi FRS
//This function sets up the GUI from the overview page.

function getSecondsUntilGameTime(time){
var myDate = new Date();
var serverTime = parseInt(localStorage.getItem('pageLoadTimeSeconds'));
var offset = parseInt(localStorage.getItem('secondsOffsetFromServer'),10);
if (time!=null && time.match(/\d(\d)?/g).length==3)
	{
	var timeNow = myDate.getUTCHours()*3600+myDate.getUTCMinutes()*60+myDate.getUTCSeconds();
	time = time.match(/\d(\d)?/g);
	time = parseInt(time[0],10)*3600+parseInt(time[1],10)*60+parseInt(time[2],10);
	if(time<timeNow)
		time+=86400;
	time = time-timeNow;
	}
else return -1;
return time;
}


function delayedFRSStart(){
var time = getSecondsUntilGameTime(document.getElementById('delayedFRSTB').value);
if(time == -1){ alert('Bad Input!'); return;}
setTimeout('frsStart();',time*1000);
addFlashMessage('<div style="display:block;text-align: center;"id="timerFRSDelayed"></div>','notice');
frsIntervalUpdater("timerFRSDelayed",time,-1,' --- Time Until Start: ',' ---',0);

}

function frsGUISetUp()
{
updateShipSpeedsFromTechs();
localStorage.setItem('frsGoNow',0);
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('empire'),'class',['image'],'playerPlanetImage','TD');
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('empire'),'class',['name'],'playerPlanetName','TD');
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('empire'),'class',['mines'],'playerPlanetMines','TD');
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('empire'),'class',['ships'],'playerPlanetShips','TD');
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('empire'),'class',['tasks'],['playerPlanetTasks'],'TD');
var tempElement;
var elementCounter = parseInt(localStorage.getItem('elementCounter'));
var planetMines = new Array(elementCounter);
var planetCoords = new Array(elementCounter);
var planetFields = new Array(elementCounter);
var planetIds = new Array(elementCounter);
var planetsName = new Array(elementCounter);
var planetSlowestShip = new Array(elementCounter);
var planetsHarvestReady = new Array(elementCounter);
var tempString = '';
for(var i = 0;i<elementCounter;i++)
{
	tempElement = document.getElementById('playerPlanetName'+i);
	planetIds[i] = ((tempElement.innerHTML).match(/activate_planet=\d*/)+'').match(/\d+/g)+'';
	tempString = (tempElement.innerHTML).match(/>.*<\/a>/)+'';	
	planetsName[i] = tempString.slice(1,-4);
	planetCoords[i] = (tempElement.textContent).match(/\[\d+:\d+:\d+m?\]/)+'';
	planetFields[i] = ((tempElement.textContent).match(/\d+\/\d+/)+'').replace('/',' of ');
	tempElement = document.getElementById('playerPlanetShips'+i);
	tempString = tempElement.innerHTML.match(/Icon_dionysus_class/g);
	planetSlowestShip[i] = 'No_harvesters';
	if(tempString)
	{
		planetSlowestShip[i] = tempString;
		planetsHarvestReady[i] = true;
	}
	tempString = tempElement.innerHTML.match(/Icon_zeus_class/g);
	if(tempString)
		planetSlowestShip[i] = tempString;
	tempString = tempElement.innerHTML.match(/Icon_hephaestus_class_attack_platform/g);
	if(tempString)
		planetSlowestShip[i] = tempString;
	tempElement = document.getElementById('playerPlanetMines'+i);
	tempString = 'N/A';
	if(tempElement.childElementCount>0)
		{
		tempString = (tempElement.textContent.match(/\d+/g)+'').replace(/,/g,'/');
		}
	planetMines[i] = tempString;

}
clearPad();
onClickAdder(document.body,'localStorage.setItem(\'frs\',0);');
document.getElementById("content").innerHTML = '<div id="flash_messages"></div>'+document.getElementById("content").innerHTML;
recursiveAttributeFinder(document.getElementsByTagName('body')[0],'class',['selected'],'selectedPage');
if(document.getElementById('selectedPage'))
document.getElementById('selectedPage').setAttribute('class','nothingToDoWithAnything');
var frsTitle = document.createElement('div');
frsTitle.setAttribute('class','title');
tempElement = document.createElement('div');
tempElement.setAttribute('class','text');
tempElement.innerHTML = 'Fleet Resource Save All Fleets';
frsTitle.appendChild(tempElement);
tempElement = document.createElement('div');
tempElement.setAttribute('class','clear');
frsTitle.appendChild(tempElement);
document.getElementById("content").appendChild(frsTitle);




var frsMenu = document.createElement('div');
frsMenu.setAttribute('id','frsArea');
frsMenu.innerHTML += '<input type="button" style="width: 150px;" onClick="frsStart();" value="FRS!">';
frsMenu.innerHTML += '<input type="button" style="width: 200px;" onClick="localStorage.setItem(\'redAlert\',true);frsStart();" value="FRS & Activate Red Alert!">';
frsMenu.innerHTML += '<input type="button" style="width: 150px;" style="width: 150px;" onClick="delayedFRSStart();" value="Delayed FRS">';
frsMenu.innerHTML += '<input type="text" title="Gametime To Start FRS" id="delayedFRSTB" size="6" value="'+toClock(200+parseInt(localStorage.getItem('pageLoadTimeSeconds')))+'">';
if(localStorage.getItem('techSet') == 'false')
{
	tempElement = document.createElement('h3')
	tempElement.setAttribute('class','text');
	tempElement.innerHTML = 'You Have Not Set Your Technology Levels Yet, Please Go To Options And Do So Now!';
	frsMenu.appendChild(tempElement);
}
tempElement = document.createElement('h3')
tempElement.setAttribute('class','text');
tempElement.innerHTML = 'Harvester Fleets';
frsMenu.appendChild(tempElement);
frsMenu.innerHTML += '<input id="galaxyOffsetHarvester" onblur="frsUpdateDistanceAndTime()" style="width: 30px;" onclick="" type="text" value="0"> Galaxy Offset<br>';
frsMenu.innerHTML += '<input id="systemOffsetHarvester" onblur="frsUpdateDistanceAndTime()" style="width: 30px;" onclick="" type="text" value="0"> System Offset<br>';
frsMenu.innerHTML += '<input id="planetOffsetHarvester" onblur="frsUpdateDistanceAndTime()" style="width: 30px;" onclick="" type="text" value="0"> Planet Offset<br>';
frsMenu.innerHTML += '<br><select id="speedHarvester" onblur="frsUpdateDistanceAndTime()" name="speed"><option value="10">100%</option>'
+'<option value="9">90%</option>'
+'<option value="8">80%</option>'
+'<option value="7">70%</option>'
+'<option value="6">60%</option>'
+'<option value="5">50%</option>'
+'<option value="4">40%</option>'
+'<option value="3">30%</option>'
+'<option value="2">20%</option>'
+'<option value="1">10%</option></select>Speed';
frsMenu.innerHTML += '<div id="harvesterDistance"></div>';
frsMenu.innerHTML += '<input type="button" align="right" onClick="frsUpdateDistanceAndTime()" value="update">';


tempElement = document.createElement('h3')
tempElement.setAttribute('class','text');
tempElement.innerHTML = 'Zeus Fleets';
frsMenu.appendChild(tempElement);
frsMenu.innerHTML += '<input id="galaxyOffsetZeus" onblur="frsUpdateDistanceAndTime()" style="width: 30px;" onclick="" type="text" value="0"> Galaxy Offset<br>';
frsMenu.innerHTML += '<input id="systemOffsetZeus" onblur="frsUpdateDistanceAndTime()" style="width: 30px;" onclick="" type="text" value="0"> System Offset<br>';
frsMenu.innerHTML += '<input id="planetOffsetZeus" onblur="frsUpdateDistanceAndTime()" style="width: 30px;" onclick="" type="text" value="0"> Planet Offset<br>';
frsMenu.innerHTML += '<br><select id="speedZeus" onblur="frsUpdateDistanceAndTime()" name="speed"><option value="10">100%</option>'
+'<option value="9">90%</option>'
+'<option value="8">80%</option>'
+'<option value="7">70%</option>'
+'<option value="6">60%</option>'
+'<option value="5">50%</option>'
+'<option value="4">40%</option>'
+'<option value="3">30%</option>'
+'<option value="2">20%</option>'
+'<option value="1">10%</option></select>Speed';
frsMenu.innerHTML += '<div id="zeusDistance"></div>';
frsMenu.innerHTML += '<input type="button" align="right" onClick="frsUpdateDistanceAndTime()" value="update">';

tempElement = document.createElement('h3')
tempElement.setAttribute('class','text');
tempElement.innerHTML = 'Hephaestus Fleet';
frsMenu.appendChild(tempElement);
frsMenu.innerHTML += '<input id="galaxyOffsetHephaestus" onblur="frsUpdateDistanceAndTime()" style="width: 30px;" onclick="" type="text" value="0"> Galaxy Offset<br>';
frsMenu.innerHTML += '<input id="systemOffsetHephaestus" onblur="frsUpdateDistanceAndTime()" style="width: 30px;" onclick="" type="text" value="0"> System Offset<br>';
frsMenu.innerHTML += '<input id="planetOffsetHephaestus" onblur="frsUpdateDistanceAndTime()" style="width: 30px;" onclick="" type="text" value="0"> Planet Offset<br>';
frsMenu.innerHTML += '<br><select id="speedHephaestus" onblur="frsUpdateDistanceAndTime()" name="speed"><option value="10">100%</option>'
+'<option value="9">90%</option>'
+'<option value="8">80%</option>'
+'<option value="7">70%</option>'
+'<option value="6">60%</option>'
+'<option value="5">50%</option>'
+'<option value="4">40%</option>'
+'<option value="3">30%</option>'
+'<option value="2">20%</option>'
+'<option value="1">10%</option></select>Speed';
frsMenu.innerHTML += '<div id="hephaestusDistance"></div>';
frsMenu.innerHTML += '<input type="button" align="right" onClick="frsUpdateDistanceAndTime()" value="update">';


tempElement = document.createElement('h3')
tempElement.setAttribute('class','text');
tempElement.innerHTML = 'Planets And Moons';
frsMenu.appendChild(tempElement);
var tableString = '<table ><td><table border="1"><tr><td>Location</td><td>Celestial body</td><td>Mines</td><td>Fields</td></tr>';
for(i = 0;i<elementCounter;i++)
{
tableString += '<tr>';
tableString += '<td>'+planetCoords[i]+'</td>';
tableString += '<td>'+planetsName[i]+'</td>';
tableString += '<td>'+planetMines[i]+'</td>';
tableString += '<td>'+planetFields[i]+'</td>';
tableString += '</tr>';
}
tableString += '</table></td><td><table border="1"><tr><td> ID</td><td>Slowest Ship</td><td>FRS?</td></tr>';
for(i = 0;i<elementCounter;i++)
{
tableString += '<tr>';
tableString += '<td>'+planetIds[i]+'</td>';
tableString += '<td>'+(planetSlowestShip[i]+'').replace(/_/g,' ')+'</td>';
tableString += '<td><input id="frs'+planetIds[i]+'"type="checkbox"'
if(planetsHarvestReady[i])
	tableString += ' checked';
tableString += '></td>';
tableString += '</tr>';
}
frsMenu.innerHTML += tableString + '</table></td></table>';





/*
tableString = '<table border="1"><td><table border="1"><tr><td>Location</td><td>Celestial body</td><td>Mines</td><td>Fields</td><td> ID</td><td>Slowest Ship</td><td>FRS?</td></tr>';
for(i = 0;i<elementCounter;i++)
{
tableString += '<tr>';
tableString += '<td>'+planetCoords[i]+'</td>';
tableString += '<td>'+planetsName[i]+'</td>';
tableString += '<td>'+planetMines[i]+'</td>';
tableString += '<td>'+planetFields[i]+'</td>';
tableString += '<td>'+planetIds[i]+'</td>';
tableString += '<td>'+(planetSlowestShip[i]+'').replace(/_/g,' ')+'</td>';
tableString += '<td><input id="frs'+planetIds[i]+'"type="checkbox"'
if(planetsHarvestReady[i])
	tableString += ' checked';
tableString += '></td>';
tableString += '</tr>';
}
frsMenu.innerHTML += tableString + '</table></td>';

*/
document.getElementById("content").appendChild(frsMenu);



document.getElementById("speedZeus").selectedIndex = localStorage.getItem('frsSelectedIndexZeus');
document.getElementById("speedHarvester").selectedIndex = localStorage.getItem('frsSelectedIndexHarvester');
document.getElementById("speedHephaestus").selectedIndex = localStorage.getItem('frsSelectedIndexHephaestus');
document.getElementById("planetOffsetHarvester").value = localStorage.getItem('frsPlanetOffsetHarvester');
document.getElementById("systemOffsetHarvester").value = localStorage.getItem('frsSystemOffsetHarvester');
document.getElementById("galaxyOffsetHarvester").value = localStorage.getItem('frsGalaxyOffsetHarvester');
document.getElementById("planetOffsetHephaestus").value = localStorage.getItem('frsPlanetOffsetHephaestus');
document.getElementById("systemOffsetHephaestus").value = localStorage.getItem('frsSystemOffsetHephaestus');
document.getElementById("galaxyOffsetHephaestus").value = localStorage.getItem('frsGalaxyOffsetHephaestus');
document.getElementById("planetOffsetZeus").value = localStorage.getItem('frsPlanetOffsetZeus');
document.getElementById("systemOffsetZeus").value = localStorage.getItem('frsSystemOffsetZeus');
document.getElementById("galaxyOffsetZeus").value = localStorage.getItem('frsGalaxyOffsetZeus');

var title = 'SC';
	if(document.location.href.search(/extreme/g)>-1)
		title += 'E';
	if(document.location.href.search(/uni2/g)>-1)
		title += '2'; 
title += ' - Stream Lined FRS';
recursiveAttributeFinder(document.getElementsByTagName('body')[0],'class',['colony selected','home_planet selected','moon selected'],'selectedPlanet');
		var selectedBody = document.getElementById("selectedPlanet").getAttribute('class');
		if(selectedBody=='colony selected' || selectedBody=='home_planet selected')
			title += ' ['+document.getElementById("selectedPlanetCoords").textContent.replace(/\s/g,'').replace(/m/g,'')+']';
		if(selectedBody=='moon selected')
			title += ' ['+document.getElementById("selectedPlanetCoords").textContent.replace(/\s/g,'')+']';
var a = document.title = title;
localStorage.setItem('planetIdsArray',JSON.stringify(planetIds));
localStorage.setItem('planetsNameArray',JSON.stringify(planetsName));

frsUpdateDistanceAndTime();

//setTimeout('listenForFRS()',200);

}


///Updated local Storage to here

//Runs each time a input box (or select) is removed from focus (user selects something else) or the update button is pressed.
//This function runs both page side and chrome side.
//Updates all the info needed for the fleet page to frs.  Also updates the time and distance on the FRS page


function frsUpdateDistanceAndTime()
{
	var universe = document.location.href.search(/extreme/g)>-1?1:2
	localStorage.setItem('frsSelectedIndexZeus', document.getElementById("speedZeus").selectedIndex);
	var zeusSpeed = 10-document.getElementById("speedZeus").selectedIndex;
	localStorage.setItem('frsSelectedIndexHarvester',document.getElementById("speedHarvester").selectedIndex);
	var harvesterSpeed = 10-localStorage.getItem('frsSelectedIndexHarvester');
	localStorage.setItem('frsSelectedIndexHephaestus',document.getElementById("speedHephaestus").selectedIndex);
	var hephSpeed = 10-document.getElementById("speedHephaestus").selectedIndex;
	var distanceHarvester = 5;	
	var distanceZeus = 5;
	var distanceHephaestus = 5;
	localStorage.setItem('frsPlanetOffsetHarvester',trimCoords(document.getElementById("planetOffsetHarvester").value,14,0));
	document.getElementById("planetOffsetHarvester").value = localStorage.getItem('frsPlanetOffsetHarvester');
	localStorage.setItem('frsSystemOffsetHarvester',trimCoords(document.getElementById("systemOffsetHarvester").value,498,0));
	document.getElementById("systemOffsetHarvester").value = localStorage.getItem('frsSystemOffsetHarvester');
	localStorage.setItem('frsGalaxyOffsetHarvester',trimCoords(document.getElementById("galaxyOffsetHarvester").value,8,0));
	document.getElementById("galaxyOffsetHarvester").value = localStorage.getItem('frsGalaxyOffsetHarvester');
	localStorage.setItem('frsPlanetOffsetHephaestus',trimCoords(document.getElementById("planetOffsetHephaestus").value,14,0));
	document.getElementById("planetOffsetHephaestus").value = localStorage.getItem('frsPlanetOffsetHephaestus');

	localStorage.setItem('frsSystemOffsetHephaestus',trimCoords(document.getElementById("systemOffsetHephaestus").value,498,0));

	document.getElementById("systemOffsetHephaestus").value = localStorage.getItem('frsSystemOffsetHephaestus');

	localStorage.setItem('frsGalaxyOffsetHephaestus',trimCoords(document.getElementById("galaxyOffsetHephaestus").value,8,0));

	document.getElementById("galaxyOffsetHephaestus").value = localStorage.getItem('frsGalaxyOffsetHephaestus');

	localStorage.setItem('frsPlanetOffsetZeus',trimCoords(document.getElementById("planetOffsetZeus").value,14,0));

	document.getElementById("planetOffsetZeus").value = localStorage.getItem('frsPlanetOffsetZeus');
	localStorage.setItem('frsSystemOffsetZeus',trimCoords(document.getElementById("systemOffsetZeus").value,498,0));
	document.getElementById("systemOffsetZeus").value = localStorage.getItem('frsSystemOffsetZeus');
	localStorage.setItem('frsGalaxyOffsetZeus',trimCoords(document.getElementById("galaxyOffsetZeus").value,8,0));
	document.getElementById("galaxyOffsetZeus").value = localStorage.getItem('frsGalaxyOffsetZeus');
	if(parseInt(document.getElementById("planetOffsetZeus").value)>0)
		distanceZeus = parseInt(document.getElementById("planetOffsetZeus").value)*5+1000;
	if(parseInt(document.getElementById("systemOffsetZeus").value)>0)
		distanceZeus = parseInt(document.getElementById("systemOffsetZeus").value)*95+2700;
	if(parseInt(document.getElementById("galaxyOffsetZeus").value)>0)
		distanceZeus = parseInt(document.getElementById("galaxyOffsetZeus").value)*20000;
	var time = Math.ceil((35000/zeusSpeed)*(Math.sqrt((10*distanceZeus)/localStorage.getItem('zeusSpeed')))+10)*universe; 
	document.getElementById("zeusDistance").innerHTML = 'Distance : '+distanceZeus+' Total Trip Time : '+toClock(time);
	

	if(parseInt(document.getElementById("planetOffsetHarvester").value)>0)
		distanceHarvester = parseInt(document.getElementById("planetOffsetHarvester").value)*5+1000;
	if(parseInt(document.getElementById("systemOffsetHarvester").value)>0)
		distanceHarvester = parseInt(document.getElementById("systemOffsetHarvester").value)*95+2700;
	if(parseInt(document.getElementById("galaxyOffsetHarvester").value)>0)
		distanceHarvester = parseInt(document.getElementById("galaxyOffsetHarvester").value)*20000;
	time = Math.ceil((35000/harvesterSpeed)*(Math.sqrt((10*distanceHarvester)/localStorage.getItem('harvesterSpeed')))+10)*universe; 
	document.getElementById("harvesterDistance").innerHTML = 'Distance : '+distanceHarvester+' Total Trip Time : '+toClock(time);
	

	if(parseInt(document.getElementById("planetOffsetHephaestus").value)>0)
		distanceHephaestus = parseInt(document.getElementById("planetOffsetHephaestus").value)*5+1000;
	if(parseInt(document.getElementById("systemOffsetHephaestus").value)>0)
		distanceHephaestus = parseInt(document.getElementById("systemOffsetHephaestus").value)*95+2700;
	if(parseInt(document.getElementById("galaxyOffsetHephaestus").value)>0)
		distanceHephaestus = parseInt(document.getElementById("galaxyOffsetHephaestus").value)*20000;

	var time = Math.ceil((35000/hephSpeed)*(Math.sqrt((10*distanceHephaestus)/localStorage.getItem('hephSpeed')))+10)*universe; 

	document.getElementById("hephaestusDistance").innerHTML = 'Distance : '+distanceHephaestus+' Total Trip Time : '+toClock(time);

}


//Takes coordinates and trims them to be correct for the game


function trimCoords(coords, max, min)
{
if(coords == '')
return min;
coords = parseInt(coords);
if(coords>max)
return max;
else if(coords<min)
return min;
else return coords;
}


//Pretty self explanatory......


function updateShipSpeedsFromTechs()
{
	localStorage.setItem('harvesterSpeed',2000*.1*parseInt(localStorage.getItem('jetDriveLevel'))+2000);
	localStorage.setItem('zeusSpeed',100*.3*parseInt(localStorage.getItem('warpDriveLevel'))+100);
	localStorage.setItem('hephSpeed',90*.3*parseInt(localStorage.getItem('warpDriveLevel'))+90);
}

//Listens for the FRS button to be pressed, this is how I set up the comunication between the FRS page and chrome's
//plugin mainframe (whatever you wanna call it)


function listenForFRS()
{
if(localStorage.getItem('frsGoNow') == 1)
	{
	frsStart();	
	}
else
	setTimeout('listenForFRS()',200);
	
}


//After FRS Button is pressed on the FRS page


function frsStart()
{
var planetIds = eval(JSON.parse(localStorage.getItem('planetIdsArray')));
var planetsName = eval(JSON.parse(localStorage.getItem('planetsNameArray')));
var elementCounter = parseInt(localStorage.getItem('elementCounter'));
onClickAdder(document.body,'localStorage.setItem(\'frs\',0);');
localStorage.setItem('frs',1);
var planet = ((document.location.href+'').match(/current_planet=\d*/)+'').match(/\d+/g)+'';
var timer = 5000+Math.floor(Math.random()*11)*1000;
var samePlanet = false;
var tempChecked;
for(var i = 0;i<elementCounter;i++)
{
	if(document.getElementById('frs'+planetIds[i]).checked)
	{	
		if(planet+''== planetIds[i]+'')
			{
			samePlanet = 'true';
			}
		break;
	}

}
localStorage.setItem('frsGoNow',1);
for(var i = 0;i<elementCounter;i++)
{
	if(document.getElementById('frs'+planetIds[i]).checked)
	{		
		if(samePlanet == 'true')
			{
			var a = "window.open('"+(document.location.href+'').match(/(\w|\W)*\.com/g)+'/fleet?current_planet='+planet+"')";
			setTimeout(a,timer);
			samePlanet = 'false';
			planet = planetIds[i];
			}
		else 
			{
			var a = "window.open('"+(document.location.href+'').match(/(\w|\W)*\.com/g)+'/fleet?activate_planet='+planetIds[i]+'&current_planet='+planet+"')";
			setTimeout(a,timer);
			planet = planetIds[i];
			}
		addFlashMessage('<div style="display:block;text-align: center;"id="timer'+planetIds[i]+'"></div>','notice');
		frsIntervalUpdater("timer"+planetIds[i],timer*.001,-1,planetsName[i]+' --- Time Until FRS Start: ','',0);
		timer += 15000+Math.floor(Math.random()*11)*1000;
	}
	
	
//		
	
}
setTimeout('localStorage.setItem(\'frs\',0);',timer);
if(localStorage.getItem('redAlert') == "true")
	{
	var loc = (document.location.href+'').match(/(\w|\W)*\.com/g)+'/fleet';	
	if((document.location.href+'').match(/current_planet=\d*/))
		planet = '?'+(document.location.href+'').match(/current_planet=\d*/);
	if((document.location.href+'').match(/activate_planet=\d*/))
		planet = '?current_planet='+((document.location.href+'').match(/activate_planet=\d*/)+'').match(/\d+/g);
	loc += planet;
	setTimeout("document.location = '"+loc+"'",timer+50);
	addFlashMessage('<div style="display:block;text-align: center;"id="redAlertFRSTimer"></div>','notice');
	frsIntervalUpdater("redAlertFRSTimer",timer*.001,-1,' --- Time Until Red Alert Start: ',' ---',0);
}	
}


//Function that runs when Fleet page opens and localStorage.frsGoNow == 1,
//this is the function that actually sends the ships off.


function frs()
{
//javascript:frs();
	if(document.getElementById('assign_button')==null || document.getElementById("assign_fleet").innerHTML.match(/dionysus_class/g)==null)
		{
			window.open('', '_self', '');
			window.close();
			return;
		}

	var shipType = 0;
	var tempString = document.getElementById("assign_fleet").innerHTML.match(/Icon_zeus_class/g);
	if(tempString)
		shipType = 1;
	tempString = document.getElementById("assign_fleet").innerHTML.match(/Icon_hephaestus_class_attack_platform/g);
	if(tempString)
		shipType = 2;
	var currentPlanet = parseInt(document.getElementById('planet').value);
	var currentSystem = parseInt(document.getElementById('solar_system').value);
	var currentGalaxy = parseInt(document.getElementById('galaxy').value);
	var offsetPlanet = 0;
	var offsetSystem = 0;
	var offsetGalaxy = 0;
	var selectedIndexSCE = 0;
	switch(shipType)
		{
		case 0:
  			offsetPlanet = parseInt(localStorage.getItem('frsPlanetOffsetHarvester'));
			offsetSystem = parseInt(localStorage.getItem('frsSystemOffsetHarvester'));
			offsetGalaxy = parseInt(localStorage.getItem('frsGalaxyOffsetHarvester'));
			selectedIndexSCE = parseInt(localStorage.getItem('frsSelectedIndexHarvester'));
 			break;
		case 1:
  			offsetPlanet = parseInt(localStorage.getItem('frsPlanetOffsetZeus'));
			offsetSystem = parseInt(localStorage.getItem('frsSystemOffsetZeus'));
			offsetGalaxy = parseInt(localStorage.getItem('frsGalaxyOffsetZeus'));
			selectedIndexSCE = parseInt(localStorage.getItem('frsSelectedIndexZeus'));
 			break;
		case 2:
  			offsetPlanet = parseInt(localStorage.getItem('frsPlanetOffsetHephaestus'));
			offsetSystem = parseInt(localStorage.getItem('frsSystemOffsetHephaestus'));
			offsetGalaxy = parseInt(localStorage.getItem('frsGalaxyOffsetHephaestus'));
			selectedIndexSCE = parseInt(localStorage.getItem('frsSelectedIndexHephaestus'));		
			break;
		default:

		}
	
	document.getElementById('planet').value = compareCoords(trimCoords(currentPlanet+offsetPlanet,15,1),trimCoords(currentPlanet-parseInt(offsetPlanet),15,1),currentPlanet);
	document.getElementById('galaxy').value = compareCoords(trimCoords(currentGalaxy+offsetGalaxy,20,1),trimCoords(currentGalaxy-offsetGalaxy,20,1),currentGalaxy);
	document.getElementById('solar_system').value = compareCoords(trimCoords(currentSystem+offsetSystem,499,1),trimCoords(currentSystem-offsetSystem,499,1),currentSystem);


	setTimeout("document.getElementById('speed').selectedIndex = "+selectedIndexSCE+";",200);
	setTimeout("select_all_ships();",300);
	setTimeout("select_max_cargo('hydrogen');select_max_cargo('crystal');select_max_cargo('ore');",1000);
	var maxFleets = parseInt(document.getElementById('active_fleets').parentNode.innerHTML.match(/\d+/g)[1]);
	var usedFleets = parseInt(document.getElementById('active_fleets').innerHTML);
	if(!(parseInt(localStorage.getItem('aiTechLevel')) == maxFleets-1))
		localStorage.setItem('aiTechLevel',maxFleets-1);
	if(usedFleets<(parseInt(localStorage.getItem('aiTechLevel'))+1))
		setTimeout("if(document.getElementById('assign_button').disabled==false)document.getElementById('assign_button').click();",5000+Math.floor(Math.random()*5)*1000);
}

//javascript:alert(document.getElementById('active_fleets').parentNode.innerHTML.match(/\d+/g)[1])
// Decides to increase the coords or decrease the coords based on the offsets

function compareCoords(addCoords,minusCoords,current)
{
	if(addCoords-current>=current-minusCoords)
		return addCoords;
	else return minusCoords;
}


//Function for countdown timer


function frsIntervalUpdater(id,timeLeft,amount,before,after,stop)
{
	if(document.getElementById(id)==null)
		return;
	document.getElementById(id).innerHTML = before+toClock(timeLeft)+after;
	if(stop != null)
		if(((amount<0)&&(timeLeft <= stop))||((amount>0)&&(timeLeft >= stop)))
			return;
	var timeoutString = 'frsIntervalUpdater("'+id+'",'+(timeLeft+amount)+','+amount+',"'+before+'","'+after+'",'+stop+');';
	setTimeout(timeoutString,Math.abs(amount*1000));
}


//Function to add an id to all tags that have certain attribute with a certian value


function recursiveAttributeLabeler(pageElement,attriType,attriValue,newid,tagType)
{
//You need to set localStorage.elementCounter before you
//call this function.
if (!pageElement)
return;
var max = attriValue.length;
if(!tagType|pageElement.tagName == tagType)
 { 
	for(var i = 0;i<max;i++)
	{
		if((pageElement.getAttribute(attriType)+'') == attriValue[i])
		{
		pageElement.id = newid+localStorage.getItem('elementCounter');
		localStorage.setItem('elementCounter',1+parseInt(localStorage.getItem('elementCounter')));
		}
	}
 }
var a = pageElement.childNodes.length;
for(var i = 0;i < a;i++)
 {
 	recursiveAttributeLabeler(pageElement.childNodes[i],attriType,attriValue,newid,tagType);
 }
}


//&&(pageElement.attributes && pageElement.getAttribute(attriType) && (pageElement.getAttribute(attriType)+'') == attriValue)











function redAlert()
{
	if(redAlertClassFinder(document.getElementById('content')))
	{		
		if(localStorage.getItem('redAlertPlaySound') == 'true')
		{
			redAlertSoundStart(localStorage.getItem('redAlertVid'),'You Are Under Attack!','error');
		}
		else addFlashMessage("You Are Under Attack!",'error','redAlertNotice');
		if(localStorage.getItem('redAlertFlashTitle') == 'true')
			updateTitleBar("Under Attack","!!!!!!!!!!!!!!!!!!!!!!!!",250,0,-1);
	}
return false;
}


function redAlertSoundStart(id,text,boxType)
{
	addFlashMessage(text+'</br></br></br>',boxType,'redAlertNotice');
	var tempElement = document.createElement('iframe');
	tempElement.setAttribute('id',id);
	tempElement.setAttribute('name',id);
	tempElement.setAttribute('type','text/html');
	tempElement.setAttribute('width','1');
	tempElement.setAttribute('height','1');
	tempElement.setAttribute('src','http://www.youtube.com/embed/'+id+'?autoplay=1');
	document.getElementById('redAlertNotice').appendChild(tempElement);

}

function updateTitleBar(title,secondTitle,interval,counter,max)
{
	var a = document.title = title;
	if(counter==max)
		return;
	counter = interval+counter;
	setTimeout('updateTitleBar("'+secondTitle+'","'+title+'",'+interval+','+counter+','+max+')',interval);
}



function redAlertClassFinder(pageElement)
{
if(!pageElement)
return false;

if(pageElement.attributes && pageElement.getAttribute('class') && (pageElement.getAttribute('class')+'').match(/hostile.*attack/))
{ 
	return true;
}
var a = pageElement.childNodes.length;
for(var i = 0;i < a;i++)
{
	if(redAlertClassFinder(pageElement.childNodes[i]))
	return true;
}
}

function redAlertPress()
{	
	if(localStorage.getItem('redAlert') == "true")
	{
	localStorage.setItem('redAlert',false);
	}
	else {localStorage.setItem('redAlert',true);}
}


function redAlertGo()
{
var max = parseInt(localStorage.getItem('redAlertMax'));
if(localStorage.getItem('frsGUIStart')!='true' && localStorage.getItem('pageType')!= '0' && localStorage.getItem('pageType')!= '25' && localStorage.getItem('pageType')!= '1'){
	addFlashMessage('<div style="display:block;text-align: center;"id="redAlertClock"></div>','notice');
	var timerCount= max*60*1000;
	var planet = '';
	var locationString = (document.location.href+'').match(/(\w|\W)*\.com/g)+'';
	if((document.location.href+'').match(/current_planet=\d*/))
		planet = '?'+(document.location.href+'').match(/current_planet=\d*/);
	if((document.location.href+'').match(/activate_planet=\d*/))
		planet = '?current_planet='+((document.location.href+'').match(/activate_planet=\d*/)+'').match(/\d+/g);
	locationString += '/fleet'+planet;
	setTimeout("document.location.href ='"+locationString+"';",timerCount);
	frsIntervalUpdater("redAlertClock",timerCount*.001,-1,'Time Until Red Alert Reactivates-','',0);
	}

if(localStorage.getItem('pageType')!= '1')	
	return;	
if(!document.getElementById('assign_fleet'))
{
	alert('Error!  Tread Carefully!');
	localStorage.setItem('redAlert',false);
	document.getElementById('assign_fleet').value=document.getElementById('assign_fleet').value;
}
//onClickAdder(document.body,'localStorage.setItem(\'redAlert\',false);');
addFlashMessage('<div style="display:block;text-align: center;"id="redAlertClock"></div>','notice');
var timerCount = 0;
var min = parseInt(localStorage.getItem('redAlertMin'));
var timerCount = Math.floor(((Math.random()*(max-min))+min)*60*1000);
setTimeout("document.location.reload();",timerCount);
var tempElement = document.createElement('input');
tempElement.setAttribute('id','redAlertTimerDiv');
tempElement.setAttribute('type','text');
tempElement.setAttribute('style',"display: none;");
document.getElementById('sceToolBar').appendChild(tempElement);
document.getElementById('redAlertTimerDiv').value = timerCount;
frsIntervalUpdater("redAlertClock",timerCount*.001,-1,'Time Until Next Sensor Sweep-','',0);
redAlert();
}

function counterIncDe(id,upOrDown)
{
	var x = parseInt(document.getElementById(id).value);
	if(upOrDown == 'true')
		document.getElementById(id).value = x + 1000;
	else document.getElementById(id).value = x - 1000;
}

function redAlertInterval(boolColor)
{
counterIncDe('redAlertTimerDiv',false);
var outPut = '<font color="';
if(boolColor == true)
outPut += '#ff0000';
else  
outPut += '#0060ff';
outPut += '">'+'Time Until Next Sensor Sweep-'+toClock(Math.floor(document.getElementById('redAlertTimerDiv').value/1000));
document.getElementById('redAlertClock').innerHTML = outPut;
if(boolColor == true)
setTimeout('redAlertInterval(false)',1000);
else setTimeout('redAlertInterval(true)',1000);
}


function onClickAdder(pageElement,expressionToUse)
{
if(!pageElement)
return false;
if(pageElement.tagName == 'A' && pageElement.attributes)
{ 
	if(pageElement.getAttribute('Onclick'))
	pageElement.setAttribute('onclick',expressionToUse+pageElement.getAttribute('Onclick'));
	else
	pageElement.setAttribute('onClick',expressionToUse);
}
var a = pageElement.childNodes.length;
for(var i = 0;i < a;i++)
{
	onClickAdder(pageElement.childNodes[i],expressionToUse)
}
}






//Advanced Fleet Tools


function setUpFleetsForSelection()
{
	if(!document.getElementById('tasks'))
		return;
	document.getElementById("advancedToolsButton").setAttribute('onClick','alert("Don\'t press that twice!")');
	recursiveAttributeFinder(document.getElementById('content'),'class',['title'],'titleElement');
	var tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['return'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Returning');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(new Array(),['return'],'true','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Non-Returning');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(new Array(),new Array(),'false','true')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select None');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(new Array(),new Array(),'true','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select All');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['hostile'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Hostiles');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['foreign','friendly'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Friendlies');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['local'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Own Fleets');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['transport'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Transports');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['harvest'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Harvests');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['deploy'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Deploys');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['attack'],['hostile', 'group_attack'],'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Friendly Attacks');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['group_attack'],['hostile'],'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Friendly Group Attacks');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['local','attack'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Own Attacks');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['foreign','hostile','attack'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Hostile Attacks');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['foreign','hostile','group_attack'],[' attack'],'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Hostile Group Attacks');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['foreign','friendly', 'task', 'transport'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Trades');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['group_defend'],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Group Defends');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"selectFleetsByArguments(['missile_strike '],new Array(),'false','false')");
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('value','Select Missile Strikes');
	document.getElementById("titleElement").appendChild(tempElement);




	document.getElementById("titleElement").innerHTML += '<br/><br/>';



//foreign hostile task espionage

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick','');
	tempElement.setAttribute('value','Hide Selected Fleets');
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('title','Not Implimented Yet');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick','');
	tempElement.setAttribute('value','Hide Unselected Fleets');
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('title','Not Implimented Yet');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick','');
	tempElement.setAttribute('value','Un-hide Hidden Fleets');
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('title','Not Implimented Yet');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"addFlashMessage(stringOfResourcesInSelectedFleets()+'Ships:</br>'+stringOfShipsInSelectedFleets(returnShipsInFleets(returnSelectedFleets('fleetcheckbox'),'fleetShips')),'notice','shipsAddedUp');");
	tempElement.setAttribute('value','Fleets');
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('title','This displays all the ships and resources in your selected fleets');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"addFlashMessage('Ships:</br>'+stringOfShipsInSelectedFleetsSS(),'notice','shipsSSAddedUp');");
	tempElement.setAttribute('value',' SS Format Ships');
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('title','This displays all the ships in your selected fleets.  This one only displays the ships, and in format for spreadsheets.');
	document.getElementById("titleElement").appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick',"fleetToolsDetailedFleetInfo();");
	tempElement.setAttribute('value','Detailed Fleet Info');
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('title','This displays all the ships, resources, and timing info in the selected fleets.');
	document.getElementById("titleElement").appendChild(tempElement);


	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick','setupBattleCalcScreen();');
	tempElement.setAttribute('value','Battle Calc Selected Fleets!');
	tempElement.setAttribute('style',"cursor: pointer;");
	document.getElementById("titleElement").appendChild(tempElement);







	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('tasks'),'class',['warning'],'fleetWarning','TD');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('tasks'),'class',['time'],'fleetTime','TD');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('tasks'),'class',['mission_type'],'fleetMission','TD');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('tasks'),'class',['origin current','origin'],'fleetOrigin','TD');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('tasks'),'class',['destination','destination current'],'fleetDestination','TD');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('tasks'),'class',['fleet'],'fleetShips','TD');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('tasks'),'class',['actions'],'fleetActions','TD');

//javascript:document.getElementById("titleElement").innerHTML +=document.getElementById("fleetShips1").innerHTML;


	var max = document.getElementById('tasks').childNodes[1].childNodes.length;
	document.getElementById('tasks').childNodes[1].childNodes[0].innerHTML += '<th class="actions">Select</th>';
	var tempString = '';
	for(var i = 1;i<max;i++)
	{
		document.getElementById('tasks').childNodes[1].childNodes[i].id = 'fleetSlot'+(i*0.5-1);
		tempString = '<td class="actions">Select<input id="fleetcheckbox'+(i*0.5-1)+'" type="checkbox"/></td>';
		document.getElementById('tasks').childNodes[1].childNodes[i].innerHTML += tempString;
		
	}

}


function selectFleetsByArguments(include,doesNotInclude,defaultType,overrideTrue)
{
//args are string[]
	
	var iMax = include.length;
	var dMax = doesNotInclude.length;
	var classString = '';
	var i=0;
	var tempElement;
	var ii=0;
	var trueFalse;
	while(tempElement = document.getElementById('fleetSlot'+i))
	{
		trueFalse = defaultType+'';
		if(tempElement.getAttribute('class'))
			{
			for(ii = 0;ii<iMax;ii++)
				if(tempElement.getAttribute('class').search(new RegExp(include[ii],"g"))>-1)
				{
					trueFalse = 'true';
				}
			else {trueFalse = 'false';break;}
			for(ii = 0;ii<dMax;ii++)
				if(tempElement.getAttribute('class').search(new RegExp(doesNotInclude[ii],"g"))>-1)
				{
					trueFalse = 'false';
					break;
				}
			if(trueFalse == 'true')
				document.getElementById('fleetcheckbox'+i).checked = true;
			if(overrideTrue == 'true'&& defaultType+''=='false')
				document.getElementById('fleetcheckbox'+i).checked = false;
			}		
		i++;
	}

}




//javascript:alert(document.getElementById('fleetShips0').childNodes[1].childNodes[2].textContent)


function returnSelectedFleets(elementNames)
{
var arrayToReturn = new Array();
var x;
var i = 0;
while(x = document.getElementById(elementNames+i))
	{
	if(x.checked+'' == "true")
		arrayToReturn[arrayToReturn.length] = i;	
	i++;
	}
return arrayToReturn;
}



function returnShipsInFleets(indices,elementNames)
{
var ships = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var max = indices.length;
var maxii;
var i;
var ii;
for(i= 0;max>i;i++)
	{
	maxii = document.getElementById(elementNames+indices[i]).children.length;
	for(ii = 0;ii<maxii;ii++)
		{
		if(document.getElementById(elementNames+indices[i]).children[ii].getAttribute('class') == 'ship')			
			ships[getShipIdBattleCalcStandards(document.getElementById(elementNames+indices[i]).children[ii].children[0].getAttribute('alt'))] += parseInt(document.getElementById(elementNames+indices[i]).children[ii].textContent.match(/\d+/g));
		}
	}
return ships;
}


function getShipIdBattleCalcStandards(name)
{
 switch (name)
	{
	case 'Icon_hermes_class_probe':
		return 1;
		 break;
	case 'Icon_atlas_class_cargo':
		return 2;
		break;
	case 'Icon_hercules_class_cargo':
		return 3;
		break;
	case 'Icon_artemis_class_fighter':
		return 4;
		break;
	case 'Icon_apollo_class_fighter':
		return 5;
		break;
	case 'Icon_dionysus_class_recycler':
		return 6;
		break;
	case 'Icon_poseidon_class_cruiser':
		return 7;
		break;
	case 'Icon_gaia_class_colony_ship':
		return 8;
		break;
	case 'Icon_athena_class_battleship':
		return 9;
		break;
	case 'Icon_ares_class_bomber':
		return 10;
		break;
	case 'Icon_hades_class_battleship':
		return 11;
		 break;
	case 'Icon_prometheus_class_destroyer':
		return 12;
		break;
	case 'Icon_zeus_class':
		return 13;
		break;
	case 'Icon_helios_class_solar_satellite':
		return 14;
		break;
	case 'Charon_class_transport':
		return 15;
		break;
	case 'Icon_hephaestus_class_attack_platform':
		return 16;
		break;
	case 'Hermes_class_probe':
		return 1;
		 break;
	case 'Atlas_class_cargo':
		return 2;
		break;
	case 'Hercules_class_cargo':
		return 3;
		break;
	case 'Artemis_class_fighter':
		return 4;
		break;
	case 'Apollo_class_fighter':
		return 5;
		break;
	case 'Dionysus_class_recycler':
		return 6;
		break;
	case 'Poseidon_class_cruiser':
		return 7;
		break;
	case 'Gaia_class_colony_ship':
		return 8;
		break;
	case 'Athena_class_battleship':
		return 9;
		break;
	case 'Ares_class_bomber':
		return 10;
		break;
	case 'Hades_class_battleship':
		return 11;
		 break;
	case 'Prometheus_class_destroyer':
		return 12;
		break;
	case 'Zeus_class':
		return 13;
		break;
	case 'Helios_class_solar_satellite':
		return 14;
		break;
	case 'Charon_class_transport':
		return 15;
		break;
	case 'Hephaestus_class_attack_platform':
		return 16;
		break;
	}
	return 0;
}

function getShipNameBattleCalcStandards(id)
{
 switch (id)
	{
	case 1:
		return 'Icon_hermes_class_probe';
		 break;
	case 2:
		return 'Icon_atlas_class_cargo';
		break;
	case 3:
		return 'Icon_hercules_class_cargo';
		break;
	case 4:
		return 'Icon_artemis_class_fighter';
		break;
	case 5:
		return 'Icon_apollo_class_fighter';
		break;
	case 6:
		return 'Icon_dionysus_class_recycler';
		break;
	case 7:
		return 'Icon_poseidon_class_cruiser';
		break;
	case 8:
		return 'Icon_gaia_class_colony_ship';
		break;
	case 9:
		return 'Icon_athena_class_battleship';
		break;
	case 10:
		return 'Icon_ares_class_bomber';
		break;
	case 11:
		return 'Icon_hades_class_battleship';
		 break;
	case 12:
		return 'Icon_prometheus_class_destroyer';
		break;
	case 13:
		return 'Icon_zeus_class';
		break;
	case 14:
		return 'Icon_helios_class_solar_satellite';
		break;
	case 15:
		return 'Icon_charon_class_transport';
		break;
	case 16:
		return 'Icon_hephaestus_class_attack_platform';
		break;
	}
	return '';
}

function returnDefensesInFleets(indices,elementNames)
{
var defenses = [0,0,0,0,0,0,0,0,0,0];
var max = indices.length;
var maxii;
var i;
var ii;
for(i= 0;max>i;i++)
	{
	maxii = document.getElementById(elementNames+indices[i]).children.length;
	for(ii = 0;ii<maxii;ii++)
		{
		defenses[getDefenseIdBattleCalcStandards(document.getElementById(elementNames+indices[i]).children[ii].children[0].getAttribute('alt'))] += parseInt(document.getElementById(elementNames+indices[i]).children[ii].textContent.match(/\d+/g));
		}
	}
return defenses;
}


function getDefenseIdBattleCalcStandards(name)
{
 switch (name)
	{
	case 'Icon_missile_battery':
		return 1;
		 break;
	case 'Icon_laser_cannon':
		return 2;
		 break;
	case 'Icon_pulse_cannon':
		return 3;
		 break;
	case 'Icon_particle_cannon':
		return 4;
		 break;
	case 'Icon_gauss_cannon':
		return 5;
		 break;
	case 'Icon_plasma_cannon':
		return 6;
		 break;
	case 'Icon_decoy':
		return 7;
		 break;
	case 'Icon_large_decoy':
		return 8;
		 break;	
	case 'Icon_helios_class_solar_satellite':
		return 9;
		 break;	
	case 'Icon_anti-ballistic_missile':
		return 10;
		 break;	
	case 'Icon_interplanetary_ballistic_missile':
		return 11;
		 break;			
	}
	return 0;
}


function getDefenseNameBattleCalcStandards(id)
{
 switch (id)
	{
	case 1:
		return 'Icon_missile_battery';
		 break;
	case 2:
		return 'Icon_laser_cannon';
		 break;
	case 3:
		return 'Icon_pulse_cannon';
		 break;
	case 4:
		return 'Icon_particle_cannon';
		 break;
	case 5:
		return 'Icon_gauss_cannon';
		 break;
	case 6:
		return 'Icon_plasma_cannon';
		 break;
	case 7:
		return 'Icon_decoy';
		 break;
	case 8:
		return 'Icon_large_decoy';
		 break;	
	case 9:
		return 'Icon_helios_class_solar_satellite';
		 break;	
	case 10:
		return 'Icon_anti-ballistic_missile';
		 break;		
	case 11:
		return 'Icon_interplanetary_ballistic_missile';
		 break;	
	}
	return 0;
}


function stringOfShipsInSelectedFleets(ships)
{
//	var ships = returnShipsInFleets(returnSelectedFleets('fleetcheckbox'),'fleetShips');
	var stringToDisplay = '* '+getShipNameBattleCalcStandards(5).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[5])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(10).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[10])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(4).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[4])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(9).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[9])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(2).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[2])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(15).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[15])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(6).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[6])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(8).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[8])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(11).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[11])+'</br>';
	stringToDisplay += '* '+getShipNameBattleCalcStandards(3).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[3])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(1).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[1])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(7).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[7])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(12).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[12])+'</br>'; 
	stringToDisplay += '* '+getShipNameBattleCalcStandards(13).replace(/_/g,' ').replace(/icon /g,'') +': '+addCommas(ships[13])+'</br>'; 
	return stringToDisplay;
}


function stringOfShipsInSelectedFleetsSS()
{
	var ships = returnShipsInFleets(returnSelectedFleets('fleetcheckbox'),'fleetShips');
	var stringToDisplay = ships[5]+'</br>'; 
	stringToDisplay += ships[10]+'</br>'; 
	stringToDisplay += ships[4]+'</br>'; 
	stringToDisplay += ships[9]+'</br>'; 
	stringToDisplay += ships[2]+'</br>'; 
	stringToDisplay += ships[15]+'</br>'; 
	stringToDisplay += ships[6]+'</br>'; 
	stringToDisplay += ships[8]+'</br>'; 
	stringToDisplay += ships[11]+'</br>';
	stringToDisplay += ships[3]+'</br>'; 
	stringToDisplay += ships[1]+'</br>'; 
	stringToDisplay += ships[7]+'</br>'; 
	stringToDisplay += ships[12]+'</br>'; 
	stringToDisplay += ships[13]+'</br>'; 
	return stringToDisplay;
}

function stringOfResourcesInSelectedFleets()
{
	var hydro = 0;
	var ore = 0;
	var crystal = 0;
	var fleets = returnSelectedFleets('fleetcheckbox');
	var resources;
	var max = fleets.length;
	for(var i = 0;i<max;i++)
	{
		resources = document.getElementById('fleetMission'+fleets[i]).childNodes[1].getAttribute('title').replace(/,/g,'').match(/\d+/g);
		ore += parseInt(resources[0]);
		crystal += parseInt(resources[1]);
		hydro += parseInt(resources[2]);
	}

	return 'Ore: '+addCommas(ore)+'</br>Crystal: '+addCommas(crystal)+'</br>Hydrogen: '+addCommas(hydro)+'</br>Total: '+addCommas(hydro+ore+crystal)+'</br>';
}







function setupBattleCalcScreen()
{
//fix resrouces on oracle screen.
	var fleets = returnSelectedFleets('fleetcheckbox');
	recursiveAttributeFinder(document.getElementsByTagName('head')[0],'type',['text/css'],'headerCSS');
	var max = fleets.length;
	var bCholder = document.createElement('div');
	bCholder.setAttribute('class','assign_fleet popup');
	bCholder.setAttribute('style','top: 200px; left: 95px; ');
	bCholder.setAttribute('id','battleCalcContainer');
	var tempElement = document.createElement('h3');
	tempElement.innerHTML = 'Choose Fleets To Send To BattleCalc';
	bCholder.appendChild(tempElement);
	var tableString =	'<table id="bCTable" class="compact"><tbody id="bCTableBody"><tr><th>Attacker</th><th>Time</th>'
				+'<th>Type</th><th>Origin</th><th>Destination</th>'
				+'<th class="fleet">Ships</th><th>Defender</th></tr></br>'
	var timeString;
	for(var i = 0;i<max;i++)
	{
		tableString += '<tr><th style="font-size: 8px;">Attacker<input id="attackercheckbox'+i+'" type="checkbox"></th>';
		timeString = document.getElementById('fleetTime'+fleets[i]).innerHTML.match(/\d+:\d+:\d+/g)+'';
		tableString += '<th id="bCTime'+i+'"style="font-size: 8px;">'+timeString+'</th>';
		setTimeout("frsIntervalUpdater('bCTime'+"+i+","+(parseInt(timeString.split(':')[0])*3600+parseInt(timeString.split(':')[1])*60+parseInt(timeString.split(':')[2])-1)+",-1,'','',0)",1000);
		tableString += '<th id="bCMission'+i+'" style="font-size: 8px;">'+ document.getElementById('fleetMission'+fleets[i]).innerHTML+'</th>';
		tableString += '<th id="bCOrigin'+i+'" style="font-size: 8px;">'+ document.getElementById('fleetOrigin'+fleets[i]).innerHTML+'</th>';
		tableString += '<th id="bCDestination'+i+'" style="font-size: 8px;">'+ document.getElementById('fleetDestination'+fleets[i]).innerHTML+'</th>';
		tableString += '<th id="bCFleet'+i+'" style="font-size: 8px;">'+ document.getElementById('fleetShips'+fleets[i]).innerHTML+'</th>';
		tableString += '<th style="font-size: 8px;">Defender<input id="defendercheckbox'+i+'" type="checkbox"></th></tr>';


	}
	bCholder.innerHTML += tableString+'</tbody></table><br>';
	tempElement = document.createElement('select');
	tempElement.setAttribute('id','espionageSelector');
	var espionageReports = eval(JSON.parse(localStorage.getItem("espionageReports")));	
	max = espionageReports.length;
	var tempElementTwo;
	var datevar = new Date();
	for(i = espionageReports.length-1;i>-1;i--)
	{
		datevar.setTime(espionageReports[i].cre);
		tempElementTwo = document.createElement('option');
		tempElementTwo.setAttribute('value','test');
		tempElementTwo.innerHTML = espionageReports[i].pN + ' | ' + espionageReports[i].cN +  ' | ' + espionageReports[i].coor+' | '+padZeroes(datevar.getUTCHours(),2)+':'+padZeroes(datevar.getUTCMinutes(),2)+':'+padZeroes(datevar.getUTCSeconds(),2);
		tempElement.appendChild(tempElementTwo);
	}
	bCholder.appendChild(tempElement);
	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick','bCEspionageAdder()')
	tempElement.setAttribute('value','Add');
	bCholder.appendChild(tempElement);	
	bCholder.innerHTML += '<br><br>';

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','text');
	tempElement.setAttribute('size','1');
	tempElement.setAttribute('id','bCAA');
	bCholder.innerHTML += 'Attacker Armor Tech ';
	bCholder.appendChild(tempElement);
	tempElement = document.createElement('input');
	tempElement.setAttribute('type','text');
	tempElement.setAttribute('size','1');
	tempElement.setAttribute('id','bCDA');
	bCholder.innerHTML += '  Defender Armor Tech ';
	bCholder.appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','text');
	tempElement.setAttribute('size','1');
	tempElement.setAttribute('id','bCAW');
	bCholder.innerHTML += '<br><br>Attacker Weapon Tech ';
	bCholder.appendChild(tempElement);
	tempElement = document.createElement('input');
	tempElement.setAttribute('type','text');
	tempElement.setAttribute('size','1');
	tempElement.setAttribute('id','bCDW');
	bCholder.innerHTML += '  Defender Weapon Tech ';
	bCholder.appendChild(tempElement);

	tempElement = document.createElement('input');
	tempElement.setAttribute('type','text');
	tempElement.setAttribute('size','1');
	tempElement.setAttribute('id','bCAS');
	bCholder.innerHTML += '<br><br>Attacker Shield Tech ';
	bCholder.appendChild(tempElement);
	tempElement = document.createElement('input');
	tempElement.setAttribute('type','text');
	tempElement.setAttribute('size','1');
	tempElement.setAttribute('id','bCDS');
	bCholder.innerHTML += '  Defender Sheild Tech ';
	bCholder.appendChild(tempElement);


	bCholder.innerHTML += '<br><br>';
	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick','document.getElementById(\'content\').removeChild(document.getElementById(\'battleCalcContainer\'))')
	tempElement.setAttribute('value','Close');
	bCholder.appendChild(tempElement);
	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick','battleCalcNow()')
	tempElement.setAttribute('value','Send To BattleCalc!');
	bCholder.appendChild(tempElement);
	document.getElementById('content').appendChild(bCholder);
	attributeAdder(document.getElementById('bCTable'), 'IMG', 'style', 'width: 10px;');
	document.getElementById('bCAA').value = localStorage.getItem('armorTech');
	document.getElementById('bCDA').value = localStorage.getItem('armorTech');
	document.getElementById('bCAW').value = localStorage.getItem('weaponsTech');
	document.getElementById('bCDW').value = localStorage.getItem('weaponsTech');
	document.getElementById('bCAS').value = localStorage.getItem('shieldTech');
	document.getElementById('bCDS').value = localStorage.getItem('shieldTech');



}

//<th class="warning"></th>
 //     <th class="time"></th>
 //     <th class="mission_type">Type</th>
 //     <th class="origin">Origin</th>
 //     <th class="destination">Destination</th>
 //     <th class="fleet"></th>
      

//style="font-size: 8px;"
//style="width: 10px;"
//type="text/css"



function bCEspionageAdder()
{
	var sessionID = document.getElementById('headerCSS').getAttribute('href').match(/\d+/);
	if(sessionID== null)
	{
		alert('sessionID Error!');
		return;
	}
	var x;
	var i = 0;
	while(x = document.getElementById('defenderScheckbox'+i))
		i++;

	var espionageReports = eval(JSON.parse(localStorage.getItem("espionageReports")));
	var indexFromSelector = espionageReports.length - 1 - document.getElementById('espionageSelector').selectedIndex;
	var stringToAdd = '';
	stringToAdd += '<tr><th style="font-size: 8px;">Attacker<input id="attackerScheckbox'+i+'" type="checkbox"></th>';
	stringToAdd += '<th id="bCSTime'+i+'"style="font-size: 8px;">N/A</th>';
	stringToAdd += '<th id="bCSMission'+i+'" style="font-size: 8px;"><a title="'+espionageReports[indexFromSelector].ore+' ore, '+espionageReports[indexFromSelector].cry+' crystal, and '+espionageReports[indexFromSelector].hyd+' hydrogen. ">Espionage Report</a></th>';
	stringToAdd += '<th id="bCSOrigin'+i+'" style="font-size: 8px;">'+ espionageReports[indexFromSelector].cN + ' <a>' +espionageReports[indexFromSelector].coor+'</a></th>';
	stringToAdd += '<th id="bCSDestination'+i+'" style="font-size: 8px;">N/A</th>';
	stringToAdd += '<th id="bCSFleets'+i+'" style="font-size: 8px;">';
	var stringToAddOne = '';	
	if(espionageReports[indexFromSelector].hep>0)
		stringToAddOne += '<div class="ship"><img alt=Icon_hephaestus_class_attack_platform" src="/images/starfleet/ship_templates/hephaestus_class_attack_platform.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].hep+'</img></div>';
	if(espionageReports[indexFromSelector].herm>0)
		stringToAddOne += '<div class="ship"><img alt="Hermes_class_probe" src="/images/starfleet/ship_templates/hermes_class_probe.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].herm+'</img></div>';
	if(espionageReports[indexFromSelector].cha>0)
		stringToAddOne += '<div class="ship"><img alt="Charon_class_transport" src="/images/starfleet/ship_templates/charon_class_transport.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].cha+'</img></div>';
	if(espionageReports[indexFromSelector].art>0)
		stringToAddOne += '<div class="ship"><img alt="Artemis_class_fighter" src="/images/starfleet/ship_templates/artemis_class_fighter.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].art+'</img></div>';
	if(espionageReports[indexFromSelector].atl>0)
		stringToAddOne += '<div class="ship"><img alt="Atlas_class_cargo" src="/images/starfleet/ship_templates/atlas_class_cargo.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].atl+'</img></div>';
	if(espionageReports[indexFromSelector].apo>0)
		stringToAddOne += '<div class="ship"><img alt="Apollo_class_fighter" src="/images/starfleet/ship_templates/apollo_class_fighter.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].apo+'</img></div>';
	if(espionageReports[indexFromSelector].herc>0)
		stringToAddOne += '<div class="ship"><img alt="Hercules_class_cargo" src="/images/starfleet/ship_templates/hercules_class_cargo.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].herc+'</img></div>';
	if(espionageReports[indexFromSelector].di>0)
		stringToAddOne += '<div class="ship"><img alt="Dionysus_class_recycler" src="/images/starfleet/ship_templates/dionysus_class_recycler.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].di+'</img></div>';
	if(espionageReports[indexFromSelector].pos>0)
		stringToAddOne += '<div class="ship"><img alt="Poseidon_class_cruiser" src="/images/starfleet/ship_templates/poseidon_class_cruiser.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].pos+'</img></div>';
	if(espionageReports[indexFromSelector].gaia>0)
		stringToAddOne += '<div class="ship"><img alt="Gaia_class_colony_ship" src="/images/starfleet/ship_templates/gaia_class_colony_ship.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].gaia+'</img></div>';
	if(espionageReports[indexFromSelector].ath>0)
		stringToAddOne += '<div class="ship"><img alt="Athena_class_battleship" src="/images/starfleet/ship_templates/athena_class_battleship.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].ath+'</img></div>';
	if(espionageReports[indexFromSelector].are>0)
		stringToAddOne += '<div class="ship"><img alt="Ares_class_bomber" src="/images/starfleet/ship_templates/ares_class_bomber.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].are+'</img></div>';
	if(espionageReports[indexFromSelector].had>0)
		stringToAddOne += '<div class="ship"><img alt="Hades_class_battleship" src="/images/starfleet/ship_templates/hades_class_battleship.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].had+'</img></div>';
	if(espionageReports[indexFromSelector].pro>0)
		stringToAddOne += '<div class="ship"><img alt="Prometheus_class_destroyer" src="/images/starfleet/ship_templates/prometheus_class_destroyer.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].pro+'</img></div>';
	if(espionageReports[indexFromSelector].zeu>0)
		stringToAddOne += '<div class="ship"><img alt="Zeus_class" src="/images/starfleet/ship_templates/zeus_class.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].zeu+'</img></div>';
	if(stringToAddOne == '')
		stringToAddOne += '<div class="ship"><img alt="Starfleet Commander" src="/images/starfleet/tech_templates/shield_tech.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x0</img></div>';
 	stringToAdd +=stringToAddOne+'</div></th>';
	stringToAdd += '<th style="font-size: 8px;">Defender<input id="defenderScheckbox'+i+'" type="checkbox"></th></tr>';

	i = 0;
	while(x = document.getElementById('defenderDcheckbox'+i))
		i++;
	stringToAddOne = '';
	stringToAdd += '<tr><th style="font-size: 8px;">N/A</th>';
	stringToAdd += '<th id="bCDTime'+i+'"style="font-size: 8px;">N/A</th>';
	stringToAdd += '<th id="bCDMission'+i+'" style="font-size: 8px;"><a title="'+espionageReports[indexFromSelector].ore+' ore, '+espionageReports[indexFromSelector].cry+' crystal, and '+espionageReports[indexFromSelector].hyd+' hydrogen. ">Espionage Report</a></th>';
	stringToAdd += '<th id="bCDOrigin'+i+'" style="font-size: 8px;">'+ espionageReports[indexFromSelector].cN + ' <a>' +espionageReports[indexFromSelector].coor+'</a></th>';
	stringToAdd += '<th id="bCDDestination'+i+'" style="font-size: 8px;">N/A</th>';
	stringToAdd += '<th id="bCDefenses'+i+'" style="font-size: 8px;">';
	
	


	if(espionageReports[indexFromSelector].hel>0)
		stringToAddOne += '<div class="ship"><img alt="Helios_class_solar_satellite" src="/images/starfleet/ship_templates/helios_class_solar_satellite.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].hel+'</img></div>';
	if(espionageReports[indexFromSelector].miB>0)
		stringToAddOne += '<div class="ship"><img alt="Missile_battery" src="/images/starfleet/defense_templates/missile_battery.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].miB+'</img></div>';
	if(espionageReports[indexFromSelector].lC>0)
		stringToAddOne += '<div class="ship"><img alt="Laser_cannon" src="/images/starfleet/defense_templates/laser_cannon.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].lC+'</img></div>';
	if(espionageReports[indexFromSelector].puC>0)
		stringToAddOne += '<div class="ship"><img alt="Pulse_cannon" src="/images/starfleet/defense_templates/pulse_cannon.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].puC+'</img></div>';
	if(espionageReports[indexFromSelector].paC>0)
		stringToAddOne += '<div class="ship"><img alt="Particle_cannon" src="/images/starfleet/defense_templates/particle_cannon.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].paC+'</img></div>';
	if(espionageReports[indexFromSelector].gC>0)
		stringToAddOne += '<div class="ship"><img alt="Gauss_cannon" src="/images/starfleet/defense_templates/gauss_cannon.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].gC+'</img></div>';
	if(espionageReports[indexFromSelector].plC>0)
		stringToAddOne += '<div class="ship"><img alt="Plasma_cannon" src="/images/starfleet/defense_templates/plasma_cannon.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].plC+'</img></div>';
	if(espionageReports[indexFromSelector].dS>0)
		stringToAddOne += '<div class="ship"><img alt="Decoy" src="/images/starfleet/defense_templates/decoy.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].dS+'</img></div>';
	if(espionageReports[indexFromSelector].lD>0)
		stringToAddOne += '<div class="ship"><img alt="Large_decoy" src="/images/starfleet/defense_templates/large_decoy.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x'+espionageReports[indexFromSelector].lD+'</img></div>';
	if(stringToAddOne == '')
		stringToAdd += '<div class="ship"><img alt="Starfleet Commander" src="/images/starfleet/tech_templates/weapons_tech.png?' + sessionID +'" style="font-size: 8px;width: 10px;">x0</img></div>';
 	stringToAdd +=stringToAddOne+'</div></th>';
	stringToAdd += '<th style="font-size: 8px;">Defender<input id="defenderDcheckbox'+i+'" type="checkbox"></th></tr>';
	document.getElementById('bCTableBody').innerHTML += stringToAdd;

	document.getElementById('bCDA').value = espionageReports[indexFromSelector].arT == 0?localStorage.getItem('armorTech'):espionageReports[indexFromSelector].arT;
	document.getElementById('bCDW').value = espionageReports[indexFromSelector].weT == 0?localStorage.getItem('weaponsTech'):espionageReports[indexFromSelector].weT;
	document.getElementById('bCDS').value = espionageReports[indexFromSelector].shT == 0?localStorage.getItem('shieldTech'):espionageReports[indexFromSelector].shT;
	
}






function attributeAdder(pageElement, tagType, attributeType, value)
{
if(!pageElement)
return false;
if(pageElement.tagName == tagType)
{	
	pageElement.setAttribute(attributeType,value);
}
if(pageElement.childNodes)
var a = pageElement.childNodes.length;
for(var i = 0;i < a;i++)
{
	attributeAdder(pageElement.childNodes[i],tagType, attributeType, value)
}
}



function battleCalcNow()
{
	var tempElement;
	var selectedDefenderFleets = returnSelectedFleets('defendercheckbox');
	var defenderFleet = returnShipsInFleets(selectedDefenderFleets,'bCFleet');
	var attackerFleet = returnShipsInFleets(returnSelectedFleets('attackercheckbox'),'bCFleet');
	var selectedDefenderDefenses = returnSelectedFleets('defenderDcheckbox');
	var defenderDefenses = returnDefensesInFleets(selectedDefenderDefenses,'bCDefenses');
	var selectedDefenderEShips = returnSelectedFleets('defenderScheckbox');
	var defenderEShips = returnShipsInFleets(selectedDefenderEShips,'bCSFleets');
	var attackerEShips = returnShipsInFleets(returnSelectedFleets('attackerScheckbox'),'bCSFleets');
	var i;
	var ore = 0;
	var crystal = 0;
	var hydrogen = 0;
	var resources;
	var max = selectedDefenderFleets.length;
	for(var i = 0;i<max;i++)
	{
		resources = document.getElementById('bCMission'+selectedDefenderFleets[i]).childNodes[1].getAttribute('title').replace(/,/g,'').match(/\d+/g);
		if(resources==null)
			continue;
		ore += parseInt(resources[0]);
		crystal += parseInt(resources[1]);
		hydrogen += parseInt(resources[2]);
		
	}

	max = attackerFleet.length;
	var urlString = 'http://www.battlecalc.com/?';
	for (i = 1;i<max;i++)
		{
		attackerFleet[i]+=attackerEShips[i];
		defenderFleet[i]+=defenderEShips[i];
		if(attackerFleet[i]>0)
			{
			if(urlString[urlString.length-1] != '?')
				urlString += '&';
			urlString += 'attship'+i+'='+attackerFleet[i];

			}
		if(defenderFleet[i]>0)
			{
			if(urlString[urlString.length-1] != '?')
				urlString += '&';
			urlString += 'defship'+i+'='+defenderFleet[i]
			}
		}

	max = selectedDefenderDefenses.length;
	for(var i = 0;i<max;i++)
	{
		resources = document.getElementById('bCDMission'+selectedDefenderDefenses[i]).children[0].getAttribute('title').replace(/,/g,'').match(/\d+/g);
		if(resources==null)
			continue;
		ore += parseInt(resources[0]);
		crystal += parseInt(resources[1]);
		hydrogen += parseInt(resources[2]);
		
	}
	max = selectedDefenderEShips.length;


	for(var i = 0;i<max;i++)
	{
		resources = document.getElementById('bCSMission'+defenderDefenses[i]).children[0].getAttribute('title').replace(/,/g,'').match(/\d+/g);
		if(resources==null)
			continue;
		ore += parseInt(resources[0]);
		crystal += parseInt(resources[1]);
		hydrogen += parseInt(resources[2]);
		
	}
	max = defenderDefenses.length;
	for(i = 1;i<max;i++)
	{
			if(i==max-1)
			{
				if(defenderDefenses[i]>0)
				{
				if(urlString[urlString.length-1] != '?')
					urlString += '&';
				urlString += 'defship14='+defenderDefenses[i]
				}
				continue;
			}

			if(defenderDefenses[i]>0)
			{
			if(urlString[urlString.length-1] != '?')
				urlString += '&';
			urlString += 'defens'+i+'='+defenderDefenses[i]
			}
	}
	if(urlString[urlString.length-1] != '?')
		urlString += '&';
	urlString += 'crystal='+crystal+'&ore='+ore+'&hydrogen='+hydrogen+'&defarmour='+document.getElementById('bCDA').value
		+'&defshield='+document.getElementById('bCDS').value
		+'&defweapon='+document.getElementById('bCDW').value
		+'&attarmour='+document.getElementById('bCAA').value
		+'&attshield='+document.getElementById('bCAS').value
		+'&attweapon='+document.getElementById('bCAW').value;


	document.getElementById('bCAA').value = localStorage.getItem('armorTech');
	document.getElementById('bCDA').value = localStorage.getItem('armorTech');
	document.getElementById('bCAW').value = localStorage.getItem('weaponsTech');
	document.getElementById('bCDW').value = localStorage.getItem('weaponsTech');
	document.getElementById('bCAS').value = localStorage.getItem('shieldTech');
	document.getElementById('bCDS').value = localStorage.getItem('shieldTech');
//defarmour=14&defshield=13&defweapon=14&attarmour=2&attshield=2&attweapon=2
	window.open(urlString);
}




function setupSaveEspionage()
{
	recursiveAttributeFinder(document.getElementById('message_table'),'class',['pagination'],'pagination');
	var stringone = "setTimeout('setupSaveEspionage();";
	if(localStorage.getItem('parseEspionageShow') == 'true')
		stringone +="ParseEspionageReports();";
	stringone += "',1000);";
	onClickAdder(document.getElementById('message_navigation'),stringone);
	onClickAdder(document.getElementById('pagination'),stringone);
	var documentIds = (document.getElementById('content').innerHTML.match(/message_\d+_body/g)+'').match(/\d+/g);
	var max = documentIds.length;
	for(var i = 0;i<max;i++)
	{
		if(document.getElementById('message_'+documentIds[i]).innerHTML.search(/Espionage Report for .+? \[\d+:\d+:\d+m?\]/g)>-1)
			var a = document.getElementById('message_'+documentIds[i]+'_body').innerHTML = '<a href="javascript:alert(\'Saved!\');" onclick="saveEspionage(\''+documentIds[i]+'\')">Save</a>'+document.getElementById('message_'+documentIds[i]+'_body').innerHTML;
	}
}

function saveEspionage(id)
{
var espionageReports = eval(JSON.parse(localStorage.getItem("espionageReports")));
var newESP = new espionageClass(document.getElementById('message_'+id+'_body').innerHTML);
espionageReports[espionageReports.length] = newESP
localStorage.setItem("espionageReports",JSON.stringify(espionageReports));
}

function espionageClass(message)
{
var tempRegStringResult = '';

if(message.search(/[\d*:\d*:\d*]/) >-1)
tempRegStringResult = (message.match(/\[\d*:\d*:\d*\]/)[0]);
else tempRegStringResult = 0;
this.coor = tempRegStringResult;

if(message.search(/ore: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/ore: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.ore = tempRegStringResult;

if(message.search(/crystal: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/crystal: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.cry = tempRegStringResult;

if(message.search(/hydrogen: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/hydrogen: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.hyd = tempRegStringResult;

if(message.search(/.+'S SHIPS:/) >-1)
tempRegStringResult = ((message.match(/.+'S SHIPS:/)+'').split('').reverse().join('').match(/:SPIHS S'.+?>rb</)+'').split('').reverse().join('').replace(/('S SHIPS:|<br>)/g,'');
else tempRegStringResult = 'Unknown';
this.pN = tempRegStringResult;

if(message.search(/(Planet|Hephaestus Class Attack Platform|Moon) .+?<a/) >-1)
tempRegStringResult = (message.match(/(Planet|Hephaestus Class Attack Platform|Moon) .+?<a/)[0]+'').replace(/(Planet|Hephaestus Class Attack Platform|Moon) /,'').replace(/ <a/,'');
else tempRegStringResult = 'Unknown';
this.cN = tempRegStringResult;

if(message.search(/(Planet|Hephaestus Class Attack Platform|Moon) .+?<a/) >-1)
tempRegStringResult = (message.match(/(Planet|Hephaestus Class Attack Platform|Moon) .+?<a/)[0]+'').match(/(Planet|Hephaestus Class Attack Platform|Moon)/)[0]+'';
else tempRegStringResult = 'Unknown';
this.cTy = tempRegStringResult;

if(message.search(/\* Hermes Class Probe: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Hermes Class Probe: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.herm = tempRegStringResult;

if(message.search(/\* Helios Class Solar Satellite: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Helios Class Solar Satellite: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.hel = tempRegStringResult;

if(message.search(/\* Artemis Class Fighter: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Artemis Class Fighter: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.art = tempRegStringResult;

if(message.search(/\* Atlas Class Cargo: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Atlas Class Cargo: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.atl = tempRegStringResult;

if(message.search(/\* Apollo Class Fighter: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Apollo Class Fighter: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.apo = tempRegStringResult;

if(message.search(/\* Hercules Class Cargo: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Hercules Class Cargo: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.herc = tempRegStringResult;

if(message.search(/\* Dionysus Class Recycler: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Dionysus Class Recycler: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.di = tempRegStringResult;

if(message.search(/\* Poseidon Class Cruiser: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Poseidon Class Cruiser: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.pos = tempRegStringResult;

if(message.search(/\* Gaia Class Colony Ship: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Gaia Class Colony Ship: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.gaia = tempRegStringResult;

if(message.search(/\* Athena Class Battleship: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Athena Class Battleship: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.ath = tempRegStringResult;

if(message.search(/\* Ares Class Bomber: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Ares Class Bomber: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.are = tempRegStringResult;

if(message.search(/\* Hades Class Battleship: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Hades Class Battleship: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.had = tempRegStringResult;

if(message.search(/\* Prometheus Class Destroyer: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Prometheus Class Destroyer: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.pro = tempRegStringResult;

if(message.search(/\* Zeus Class: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Zeus Class: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.zeu = tempRegStringResult;

if(message.search(/\* Hephaestus Class Attack Platform: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Hephaestus Class Attack Platform: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.hep = tempRegStringResult;

if(message.search(/\* Charon Class Transport: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Charon Class Transport: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.cha = tempRegStringResult;

if(message.search(/\* Shipyard: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Shipyard: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.shi = tempRegStringResult;

if(message.search(/\* Capitol: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Capitol: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.cap = tempRegStringResult;

if(message.search(/\* Research Lab: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Research Lab: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.rLa = tempRegStringResult;

if(message.search(/\* Missile Silo: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Missile Silo: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.mSi = tempRegStringResult;

if(message.search(/\* Factory: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Factory: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.fac = tempRegStringResult;

if(message.search(/\* Ore Warehouse: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Ore Warehouse: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.oW = tempRegStringResult;

if(message.search(/\* Crystal Warehouse: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Crystal Warehouse: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.cW = tempRegStringResult;

if(message.search(/\* Hydrogen Storage: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Hydrogen Storage: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.hS = tempRegStringResult;

if(message.search(/\* Foundry: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Foundry: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.fou = tempRegStringResult;

if(message.search(/\* Ore Mine: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Ore Mine: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.oM = tempRegStringResult;

if(message.search(/\* Crystal Mine: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Crystal Mine: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.cM = tempRegStringResult;

if(message.search(/\* Hydrogen Synthesizer: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Hydrogen Synthesizer: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.hG = tempRegStringResult;

if(message.search(/\* Lunar Base: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Lunar Base: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.lBa = tempRegStringResult;

if(message.search(/\* Oracle: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Oracle: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.ora = tempRegStringResult;

if(message.search(/\* Warp Gate: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Warp Gate: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.wG = tempRegStringResult;

if(message.search(/\* Laser Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Laser Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.laT = tempRegStringResult;

if(message.search(/\* Armor Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Armor Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.arT = tempRegStringResult;

if(message.search(/\* Weapons Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Weapons Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.weT = tempRegStringResult;

if(message.search(/\* Shield Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Shield Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.shT = tempRegStringResult;

if(message.search(/\* Particle Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Particle Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.paT = tempRegStringResult;

if(message.search(/\* Jet Drive: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Jet Drive: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.jD = tempRegStringResult;

if(message.search(/\* A.I. Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* A.I. Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.aiT = tempRegStringResult;

if(message.search(/\* Energy Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Energy Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.enT = tempRegStringResult;

if(message.search(/\* Espionage Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Espionage Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.esT = tempRegStringResult;

if(message.search(/\* Pulse Drive: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Pulse Drive: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.pDT = tempRegStringResult;

if(message.search(/\* Plasma Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Plasma Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.plT = tempRegStringResult;

if(message.search(/\* FTL Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* FTL Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.ftlT = tempRegStringResult;

if(message.search(/\* Expedition Tech: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Expedition Tech: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.exT = tempRegStringResult;

if(message.search(/\* Warp Drive: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Warp Drive: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.wDT = tempRegStringResult;

if(message.search(/\* Advanced Research Communication Network: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Advanced Research Communication Network: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.aNT = tempRegStringResult;

if(message.search(/\* Missile Battery: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Missile Battery: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.miB = tempRegStringResult;

if(message.search(/\* Interplanetary Ballistic Missile: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Interplanetary Ballistic Missile: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.iBM = tempRegStringResult;

if(message.search(/\* Laser Cannon: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Laser Cannon: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.lC = tempRegStringResult;

if(message.search(/\* Pulse Cannon: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Pulse Cannon: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.puC = tempRegStringResult;

if(message.search(/\* Particle Cannon: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Particle Cannon: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.paC = tempRegStringResult;

if(message.search(/\* Anti-Ballistic Missile: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Anti-Ballistic Missile: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.aBM = tempRegStringResult;

if(message.search(/\* Decoy: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Decoy: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.dS = tempRegStringResult;

if(message.search(/\* Gauss Cannon: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Gauss Cannon: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.gC = tempRegStringResult;

if(message.search(/\* Large Decoy: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Large Decoy: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.lD = tempRegStringResult;

if(message.search(/\* Plasma Cannon: (\d*,?)+/) >-1)
tempRegStringResult = parseInt((message.match(/\* Plasma Cannon: (\d*,?)+/)[0].match(/\d/g)+'').replace(/,/g,''));
else tempRegStringResult = 0;
this.plC = tempRegStringResult;

var newDate = new Date();
this.cre = newDate.getTime();
}

function setupEspionageTable()
{
	clearPad();
	var tempElement = document.createElement('div');
	tempElement.setAttribute('id','flash_messages');
	document.getElementById("content").appendChild(tempElement);
	tempElement = document.createElement('div');
	tempElement.setAttribute('id','sticky_notices');
	document.getElementById("content").appendChild(tempElement);
	var title = 'SC';
		if(document.location.href.search(/extreme/g)>-1)
			title += 'E';
		if(document.location.href.search(/uni2/g)>-1)
			title += '2'; 
	title += ' - Saved Espionage';
	var a = document.title = title;
	recursiveAttributeFinder(document.getElementsByTagName('body')[0],'class',['selected'],'selectedPage');
	if(document.getElementById('selectedPage'))
	document.getElementById('selectedPage').setAttribute('class','nothingToDoWithAnything');
	tempElement = document.createElement('h3');
	tempElement.innerHTML = 'Saved Espionage';
	document.getElementById("content").appendChild(tempElement);
	var messageTable = document.createElement('div');
	messageTable.setAttribute('id','message_table');
	var tableMain = document.createElement('table');
	tableMain.setAttribute('id','messages');
	tableMain.setAttribute('class','messages compact');
	var tBodyMain = document.createElement('tbody');
	tBodyMain.setAttribute('id','espionageTable');
	tableMain.appendChild(tBodyMain);
	messageTable.appendChild(tableMain);	
	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick','deleteSavedEspionage(saveEspionageFindSelected());clearPad();setupEspionageTable()');
	tempElement.setAttribute('value','Delete');
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('title','Delete Selected Espionage');
	document.getElementById('content').appendChild(tempElement);
	tempElement = document.createElement('input');
	tempElement.setAttribute('type','button');
	tempElement.setAttribute('onClick','localStorage.setItem("espionageReports",JSON.stringify(new Array()));clearPad();setupEspionageTable();');
	tempElement.setAttribute('value','Clear All Saved Espionage Reports');
	tempElement.setAttribute('style',"cursor: pointer;");
	tempElement.setAttribute('title','Deletes all of your saved espionage reports');
	document.getElementById('content').appendChild(tempElement);
	document.getElementById('content').appendChild(messageTable);
	document.getElementById('espionageTable').innerHTML+='<tr><th class="checkbox"></th><th class="sender">Player</th><th class="subject">Celestrial Body Name</th><th class="sender">Celestrial Body Type</th><th class="timestamp">Coordinates</th><th class="timestamp">Saved At:</th></tr>';

	var espionageReports = eval(JSON.parse(localStorage.getItem("espionageReports")));
	var stringToAdd = '';
	var stringToAddTempOne = '';
	var altString;
	var totalShips;
	var totalDefenses;
	var datevar = new Date();
	var planet = '';
	var locationString = (document.location.href+'').match(/(\w|\W)*\.com/g)+'';
	if((document.location.href+'').match(/current_planet=\d*/))
		planet = '?'+(document.location.href+'').match(/current_planet=\d*/);
	if((document.location.href+'').match(/activate_planet=\d*/))
		planet = '?current_planet='+((document.location.href+'').match(/activate_planet=\d*/)+'').match(/\d+/g);
	var coords;
	for(var i = espionageReports.length-1;i>-1;i--)
	{
		totalShips = 0
		totalDefenses = 0;
		datevar.setTime(espionageReports[i].cre);
		altString = i%2 == 1?'':' alt';
		stringToAdd += '<tr class="read message'+altString+'" style="cursor: pointer;" >\r\n';
		stringToAdd += '<td class="checkbox"><input id="cb'+i+'" class="message_checkbox" type="checkbox" value="'+i+'"></td>\r\n';
		stringToAdd += '<td class="sender" onclick="$(\'mess'+i+'\').toggle();">'+espionageReports[i].pN+'</td>\r\n';
		stringToAdd += '<td class="sender" onclick="$(\'mess'+i+'\').toggle();">'+espionageReports[i].cN+'</td>\r\n';
		stringToAdd += '<td class="sender" onclick="$(\'mess'+i+'\').toggle();">'+espionageReports[i].cTy+'</td>\r\n';
		stringToAdd += '<td class="sender" onclick="$(\'mess'+i+'\').toggle();">'+espionageReports[i].coor+'</td>\r\n';
		stringToAdd += '<td class="sender" onclick="$(\'mess'+i+'\').toggle();">'+datevar.toDateString()+' '+padZeroes(datevar.getUTCHours(),2)+':'+padZeroes(datevar.getUTCMinutes(),2)+':'+padZeroes(datevar.getUTCSeconds(),2)+' Game Time</td>\r\n';
		stringToAdd += '</tr>\r\n';
		stringToAdd += '<tr id="mess'+i+'" class="message_content'+altString+'" style="display:none;">\r\n';
		stringToAdd += '<td class="body" colspan="6" style="cursor: pointer;">\r\n<lll style="cursor: text;">'
		stringToAdd += espionageReports[i].cTy+' '+espionageReports[i].cN+' <a href="/galaxy/show';
		coords = espionageReports[i].coor.match(/\d+/g);
		stringToAdd += planet+'&galaxy='+coords[0]+'&solar_system='+coords[1]+'">'+espionageReports[i].coor+'</a> has: <br>\r\n<br>\r\n';
		stringToAdd += '</lll><lll id="espHRT'+i+'" onclick="$(\'espHRT'+i+'\').toggle();$(\'espRes'+i+'\').toggle();" style="display:none;">RESOURCES:<br>\r\n</lll><lll id="espRes'+i+'"onclick="$(\'espHRT'+i+'\').toggle();$(\'espRes'+i+'\').toggle();">';
		stringToAdd += 'RESOURCES:<br>\r\n* ore: '+addCommas(espionageReports[i].ore)+'<br>\r\n';
		stringToAdd += '* crystal: '+addCommas(espionageReports[i].cry)+'<br>\r\n';
		stringToAdd += '* hydrogen: '+addCommas(espionageReports[i].hyd)+'<br>\r\n<br>\r\n</lll>';
		
		if(espionageReports[i].pN!="Unknown")
		{
			stringToAdd += '<lll id="espHST'+i+'" onclick="$(\'espHST'+i+'\').toggle();$(\'espShips'+i+'\').toggle();" style="display:none;">'+espionageReports[i].pN+'\'S SHIPS:<br>\r\n</lll><lll id="espShips'+i+'"onclick="$(\'espHST'+i+'\').toggle();$(\'espShips'+i+'\').toggle();">';
			stringToAdd += espionageReports[i].pN+'\'S SHIPS:<br>\r\n';
			if(espionageReports[i].apo && espionageReports[i].apo>0)
			stringToAdd += '* Apollo Class Fighter: '+addCommas(espionageReports[i].apo)+'<br>\r\n';
			totalShips += espionageReports[i].apo;

			if(espionageReports[i].are && espionageReports[i].are>0)
				stringToAdd += '* Ares Class Bomber: '+addCommas(espionageReports[i].are)+'<br>\r\n';
			totalShips += espionageReports[i].are;
	
			if(espionageReports[i].art && espionageReports[i].art>0)
				stringToAdd += '* Artemis Class Fighter: '+addCommas(espionageReports[i].art)+'<br>\r\n';
			totalShips += espionageReports[i].art;	

			if(espionageReports[i].ath && espionageReports[i].ath>0)
				stringToAdd += '* Athena Class Battleship: '+addCommas(espionageReports[i].ath)+'<br>\r\n';
			totalShips += espionageReports[i].ath;

			if(espionageReports[i].atl && espionageReports[i].atl>0)
				stringToAdd += '* Atlas Class Cargo: '+addCommas(espionageReports[i].atl)+'<br>\r\n';
			totalShips += espionageReports[i].atl;

			if(espionageReports[i].cha && espionageReports[i].cha>0)
				stringToAdd += '* Charon Class Transport: '+addCommas(espionageReports[i].cha)+'<br>\r\n';
			totalShips += espionageReports[i].di;


			if(espionageReports[i].di && espionageReports[i].di>0)
				stringToAdd += '* Dionysus Class Recycler: '+addCommas(espionageReports[i].di)+'<br>\r\n';
			totalShips += espionageReports[i].di;

			if(espionageReports[i].gaia && espionageReports[i].gaia>0)
				stringToAdd += '* Gaia Class Colony Ship: '+addCommas(espionageReports[i].gaia)+'<br>\r\n';
			totalShips += espionageReports[i].gaia;

			if(espionageReports[i].had && espionageReports[i].had>0)
				stringToAdd += '* Hades Class Battleship: '+addCommas(espionageReports[i].had)+'<br>\r\n';
			totalShips += espionageReports[i].had;

			if(espionageReports[i].hel && espionageReports[i].hel>0)
				stringToAdd += '* Helios Class Solar Satellite: '+addCommas(espionageReports[i].hel)+'<br>\r\n';
			totalShips += espionageReports[i].hel;

			if(espionageReports[i].hep && espionageReports[i].hep>0)
				stringToAdd += '* Hephaestus Class Attack Platform: '+addCommas(espionageReports[i].hep)+'<br>\r\n';
			totalShips += espionageReports[i].hep;

			if(espionageReports[i].herc && espionageReports[i].herc>0)
				stringToAdd += '* Hercules class cargo: '+addCommas(espionageReports[i].herc)+'<br>\r\n';
			totalShips += espionageReports[i].herc;

			if(espionageReports[i].herm && espionageReports[i].herm>0)
				stringToAdd += '* Hermes Class Probe: '+addCommas(espionageReports[i].herm)+'<br>\r\n';
			totalShips += espionageReports[i].herm;

			if(espionageReports[i].pos && espionageReports[i].pos>0)
				stringToAdd += '* Poseidon Class Cruiser: '+addCommas(espionageReports[i].pos)+'<br>\r\n';
			totalShips += espionageReports[i].pos;

			if(espionageReports[i].pro && espionageReports[i].pro>0)
				stringToAdd += '* Prometheus Class Destroyer: '+addCommas(espionageReports[i].pro)+'<br>\r\n';
			totalShips += espionageReports[i].pro;

			if(espionageReports[i].zeu && espionageReports[i].zeu>0)
				stringToAdd += '* Zeus Class: '+addCommas(espionageReports[i].zeu)+'<br>\r\n';
			totalShips += espionageReports[i].zeu;

			stringToAdd += '* Total Ships: '+addCommas(totalShips)+'<br></lll>\r\n';
			stringToAdd += '<lll id="espHSIT'+i+'" onclick="$(\'espHSIT'+i+'\').toggle();$(\'espShipsI'+i+'\').toggle();">More....<br>\r\n</lll><lll id="espShipsI'+i+'"onclick="$(\'espHSIT'+i+'\').toggle();$(\'espShipsI'+i+'\').toggle();"style="display:none;">';
			stringToAdd += 'Here\'s more!</lll>\r\n<br>\r\n';
			if(espionageReports[i].cTy == 'Planet'||espionageReports[i].cTy == 'Moon')
			{
				stringToAdd += '<lll id="espHDT'+i+'" onclick="$(\'espHDT'+i+'\').toggle();$(\'espDef'+i+'\').toggle();" style="display:none;">DEFENSES:\r\n</lll><lll id="espDef'+i+'"onclick="$(\'espHDT'+i+'\').toggle();$(\'espDef'+i+'\').toggle();">';
				stringToAdd += 'DEFENSES:<br>\r\n';

				if(espionageReports[i].miB && espionageReports[i].miB>0)
					stringToAdd += '* Missile Battery: '+addCommas(espionageReports[i].miB)+'<br>\r\n';
				 totalDefenses += espionageReports[i].miB;

				if(espionageReports[i].lC && espionageReports[i].lC>0)
					stringToAdd += '* Laser Cannon: '+addCommas(espionageReports[i].lC)+'<br>\r\n';
				 totalDefenses += espionageReports[i].lC;

				if(espionageReports[i].puC && espionageReports[i].puC>0)
					stringToAdd += '* Pulse Cannon: '+addCommas(espionageReports[i].puC)+'<br>\r\n';
				 totalDefenses += espionageReports[i].puC;
	
				if(espionageReports[i].paC && espionageReports[i].paC>0)
					stringToAdd += '* Particle Cannon: '+addCommas(espionageReports[i].paC)+'<br>\r\n';
				 totalDefenses += espionageReports[i].paC;

				if(espionageReports[i].gC && espionageReports[i].gC>0)
					stringToAdd += '* Gauss Cannon: '+addCommas(espionageReports[i].gC)+'<br>\r\n';
				 totalDefenses += espionageReports[i].gC;

				if(espionageReports[i].plC && espionageReports[i].plC>0)
					stringToAdd += '* Plasma Cannon: '+addCommas(espionageReports[i].plC)+'<br>\r\n';
				 totalDefenses += espionageReports[i].plC;

				if(espionageReports[i].dS && espionageReports[i].dS>0)
					stringToAdd += '* Decoy: '+addCommas(espionageReports[i].dS)+'<br>\r\n';
				 totalDefenses += espionageReports[i].dS;

				if(espionageReports[i].lD && espionageReports[i].lD>0)
					stringToAdd += '* Large Decoy: '+addCommas(espionageReports[i].lD)+'<br>\r\n';
				 totalDefenses += espionageReports[i].lD;

				if(espionageReports[i].aBM && espionageReports[i].aBM>0)
					stringToAdd += '* Anti-Ballistic Missile: '+addCommas(espionageReports[i].aBM)+'<br>\r\n';
				 totalDefenses += espionageReports[i].aBM;

				if(espionageReports[i].iBM && espionageReports[i].iBM>0)
					stringToAdd += '* Interplanetary Ballistic Missile: '+addCommas(espionageReports[i].iBM)+'<br>\r\n';
				 totalDefenses += espionageReports[i].iBM;

				stringToAdd += '* Total Defenses: '+addCommas(totalDefenses)+'<br>\r\n</lll><br>\r\n';
			}
			stringToAddTempOne = '';
			stringToAdd += '<lll id="espHTT'+i+'" onclick="$(\'espHTT'+i+'\').toggle();$(\'espTechs'+i+'\').toggle();" style="display:none;">TECHS:\r\n</lll><lll id="espTechs'+i+'"onclick="$(\'espHTT'+i+'\').toggle();$(\'espTechs'+i+'\').toggle();">';
			stringToAdd += 'TECHS:<br>\r\n';
			stringToAddTempOne += espionageReports[i].arT == 0?'':'* Armor Tech: '+espionageReports[i].arT;
			stringToAddTempOne += espionageReports[i].weT == 0?'':'<br>\r\n* Weapons Tech: '+espionageReports[i].weT;
			stringToAddTempOne += espionageReports[i].shT == 0?'':'<br>\r\n* Shield Tech: '+espionageReports[i].shT;
			stringToAddTempOne += espionageReports[i].jD == 0?'':'<br>\r\n* Jet Drive: '+espionageReports[i].jD;
			stringToAddTempOne += espionageReports[i].pDT == 0?'':'<br>\r\n* Pulse Drive: '+espionageReports[i].pDT;
			stringToAddTempOne += espionageReports[i].wDT == 0?'':'<br>\r\n* Warp Drive: '+espionageReports[i].wDT;
			stringToAddTempOne += espionageReports[i].aiT == 0?'':'<br>\r\n* A.I. Tech: '+espionageReports[i].aiT;
			stringToAddTempOne += espionageReports[i].esT == 0?'':'<br>\r\n* Espionage Tech: '+espionageReports[i].esT;
			stringToAddTempOne += espionageReports[i].laT == 0?'':'<br>\r\n* Laser Tech: '+espionageReports[i].laT;
			stringToAddTempOne += espionageReports[i].paT == 0?'':'<br>\r\n* Particle Tech: '+espionageReports[i].paT;
			stringToAddTempOne += espionageReports[i].enT == 0?'':'<br>\r\n* Energy Tech: '+espionageReports[i].enT;
			stringToAddTempOne += espionageReports[i].plT == 0?'':'<br>\r\n* Plasma Tech: '+espionageReports[i].plT;
			stringToAddTempOne += espionageReports[i].ftlT == 0?'':'<br>\r\n* FTL Tech: '+espionageReports[i].ftlT;
			stringToAddTempOne += espionageReports[i].exT == 0?'':'<br>\r\n* Expedition Tech: '+espionageReports[i].exT;
			stringToAddTempOne += espionageReports[i].aNT == 0?'':'<br>\r\n* Advanced Research Communication Network: '+espionageReports[i].aNT;
			if(stringToAddTempOne!='')		
				stringToAdd += stringToAddTempOne;
			else stringToAdd += '* Technologies data not retrieved.';
			stringToAdd += '</br></lll></br>';
		}
		else {stringToAdd += '* Player\'s name, and ship data not retrieved.</br>';}
		stringToAddTempOne = '';
		if(espionageReports[i].cTy == 'Planet'||espionageReports[i].cTy == 'Moon')
		{
			if(espionageReports[i].shi>0)
				stringToAddTempOne += '* Shipyard: '+addCommas(espionageReports[i].shi)+'<br>\r\n';

			if(espionageReports[i].cap>0)
				stringToAddTempOne += '* Capitol: '+addCommas(espionageReports[i].cap)+'<br>\r\n';

			if(espionageReports[i].rLa>0)
				stringToAddTempOne += '* Research Lab: '+addCommas(espionageReports[i].rLa)+'<br>\r\n';

			if(espionageReports[i].shi>0)
				stringToAddTempOne += '* Shipyard: '+addCommas(espionageReports[i].shi)+'<br>\r\n';

			if(espionageReports[i].fac>0)
				stringToAddTempOne += '* Factory: '+addCommas(espionageReports[i].fac)+'<br>\r\n';



		}
		if(espionageReports[i].cTy == 'Planet')
		{

			if(espionageReports[i].mSi>0)
				stringToAddTempOne += '* Missile Silo: '+addCommas(espionageReports[i].mSi)+'<br>\r\n';

			if(espionageReports[i].fac>0)
				stringToAddTempOne += '* Factory: '+addCommas(espionageReports[i].fac)+'<br>\r\n';

			if(espionageReports[i].oW>0)
				stringToAddTempOne += '* Ore Warehouse: '+addCommas(espionageReports[i].oW)+'<br>\r\n';

			if(espionageReports[i].cW>0)
				stringToAddTempOne += '* Crystal Warehouse: '+addCommas(espionageReports[i].cW)+'<br>\r\n';

			if(espionageReports[i].hS>0)
				stringToAddTempOne += '* Hydrogen Storage: '+addCommas(espionageReports[i].hS)+'<br>\r\n';

			if(espionageReports[i].fou>0)
				stringToAddTempOne += '* Foundry: '+addCommas(espionageReports[i].fou)+'<br>\r\n';

			
		}
		if(espionageReports[i].cTy == 'Moon')
		{

			if(espionageReports[i].lBa>0)
				stringToAddTempOne += '* Lunar Base: '+addCommas(espionageReports[i].lBa)+'<br>\r\n';

			if(espionageReports[i].ora>0)
				stringToAddTempOne += '* Oracle: '+addCommas(espionageReports[i].ora)+'<br>\r\n';

			if(espionageReports[i].wG>0)
				stringToAddTempOne += '* Warp Gate: '+addCommas(espionageReports[i].wG)+'<br>\r\n';
		}

		if(espionageReports[i].cTy == 'Planet'||espionageReports[i].cTy == 'Moon')
		{
			stringToAdd += '<lll id="espHBT'+i+'" onclick="$(\'espHBT'+i+'\').toggle();$(\'espBuild'+i+'\').toggle();" style="display:none;">BUILDINGS:\r\n</lll><lll id="espBuild'+i+'"onclick="$(\'espHBT'+i+'\').toggle();$(\'espBuild'+i+'\').toggle();">';
			stringToAdd += '\r\nBUILDINGS: <br>\r\n';
			if(stringToAddTempOne!='')		
					stringToAdd += stringToAddTempOne;
			else stringToAdd += '* Building data not retrieved.<br>\r\n';
			stringToAdd += '</lll></br>';
		}


		if(espionageReports[i].cTy == 'Planet')
		{
			stringToAddTempOne = '';
			stringToAdd += '<lll id="espHMT'+i+'" onclick="$(\'espHMT'+i+'\').toggle();$(\'espMine'+i+'\').toggle();" style="display:none;">MINES:\r\n</lll><lll id="espMine'+i+'"onclick="$(\'espHMT'+i+'\').toggle();$(\'espMine'+i+'\').toggle();">';
			stringToAdd += '\r\nMINES: <br>\r\n';
			if(espionageReports[i].oM>0)
				stringToAddTempOne += '* Ore Mine: '+addCommas(espionageReports[i].oM)+'<br>\r\n';

			if(espionageReports[i].cM>0)
				stringToAddTempOne += '* Crystal Mine: '+addCommas(espionageReports[i].cM)+'<br>\r\n';

			if(espionageReports[i].hG>0)
				stringToAddTempOne += '* Hydrogen Synthesizer: '+addCommas(espionageReports[i].hG)+'<br>\r\n';
			if(stringToAddTempOne!='')		
				stringToAdd += stringToAddTempOne;
			else stringToAdd += '* Mine data not retrieved.';
			stringToAdd += '</lll></br>';
		}
		

		stringToAdd += '';
		stringToAdd += '</td></tr>\r\n';

	}
	document.getElementById('espionageTable').innerHTML+=stringToAdd;
	
}


function saveEspionageFindSelected()
{
	var i = 0;
	var element;
	var ids = [];
	while(element = document.getElementById('cb'+i))
	{
		if(element.checked == true)
			ids[ids.length] = i;		
		i++;
	}
	return ids;

}
function deleteSavedEspionage(index)
{
	var espionageReports = eval(JSON.parse(localStorage.getItem("espionageReports")));
	var max = index.length;
	var temp;
	var ii;
	for(var i = 0;i<max;i++)
	{
		temp = espionageReports.splice(index[i],1);
		for(ii = 0;ii<max;ii++)
			if(index[ii]>index[i])
				index[ii] = index[ii] - 1;
	}		
	localStorage.setItem("espionageReports",JSON.stringify(espionageReports));
}









//
//Load Techs
//

function loadTechs()
{
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('locations_table'),'class',['name'],'researchName','DIV');
//javascript:alert(document.getElementById('researchName6').parentElement==document.getElementById('researchLevel6').parentElement)
	var level = '';
	var name = '';
	var tempElement;
	//var stringS = '';
	var elementCounter = parseInt(localStorage.getItem('elementCounter'));
	for(var i = 0;i<elementCounter;i++)
	{
		name = document.getElementById('researchName'+i).innerHTML.match(/[A-z]+[A-z \.]+/g)+'';
		tempElement = document.getElementById('researchName'+i).parentNode;
		level = 0;
		if(tempElement.children[1] && tempElement.children[1].getAttribute('class') == 'level')
			level = parseInt(tempElement.children[1].innerHTML.match(/\d+/g));
	//	level = parseInt(document.getElementById('researchLevel'+i).innerHTML.match(/\d+/g));
		name = name.replace(/\./g,'');
		name = name.replace(/\s/g,'_');
		//stringS += name + '</br>';
		setTech(name,level);
	}
	//addFlashMessage(stringS,'notice','test');
}

function setTech(name,level)
{
//	alert('|'+name+'|'+level+'|');
 switch (name)
	{

	case 'Laser_Tech':
		
		break;
	case 'Armor_Tech':
		localStorage.setItem('armorTech',parseInt(level));
		break;
	case 'Weapons_Tech':
		localStorage.setItem('weaponsTech',parseInt(level));
		break;
	case 'Shield_Tech':
		localStorage.setItem('shieldTech',parseInt(level));
		break;
	case 'Particle_Tech':
		
		break;
	case 'Jet_Drive':
		localStorage.setItem('jetDriveLevel',parseInt(level));
		break;
	case 'AI_Tech':
		localStorage.setItem('aiTechLevel',parseInt(level));
		break;
	case 'Energy_Tech':
		
		break;
	case 'Espionage_Tech':
		
		break;
	case 'Pulse_Drive':
		localStorage.setItem('pulseDriveLevel',parseInt(level));
		break;
	case 'Plasma_Tech':
		
		break;
	case 'FTL_Tech':
		
		break;
	case 'Expedition_Tech':
		
		break;
	case 'Warp_Drive':
		localStorage.setItem('warpDriveLevel',parseInt(level));
		break;
	case 'Advanced_Research_Communication_Network':
		
		break;
	}
}





//alert(JSON.stringify(user));
//JSON.parse(localStorage.getItem("user"));







//
//Galaxy Indexer
//

function galaxyIndexerParseSystem()
{
	var atest =[];
	atest[0]=[];
	alert(atest[0][0][0]);
	alert(atest[0][1]);
	var celest;	
	for(var i = 1;i<16;i++)
	{
		celest = document.getElementById('planet_'+i);
		if(celest && celest.children[3].childElementCount!=0)
		{
			if(celest.children[3].children[0].childElementCount>1)
			{
				alert(celest.children[1].children[0].innerText);
				alert(celest.children[3].children[0].childNodes[0].textContent);
				alert(celest.children[3].children[0].children[0].innerText);
				alert(celest.children[3].children[0].children[1].innerText);				
			}
			else
			{
				alert(celest.children[1].children[0].innerText);
				alert(celest.children[3].children[0].childNodes[0].textContent);
				alert(celest.children[3].children[0].children[0].innerText);
			}


		
		}
		celest = document.getElementById('planet_'+i+'m');
		if(celest && celest.children[3].childElementCount!=0)
		{
			if(celest.children[3].children[0].childElementCount>1)
			{
				alert(celest.children[1].children[0].innerText);
				alert(celest.children[3].children[0].childNodes[0].textContent);
				alert(celest.children[3].children[0].children[0].innerText);
				alert(celest.children[3].children[0].children[1].innerText);				
			}
			else
			{
				alert(celest.children[1].children[0].innerText);
				alert(celest.children[3].children[0].childNodes[0].textContent);
				alert(celest.children[3].children[0].children[0].innerText);
			}
		}
		
		
		
	}




}
//if(document.getElementById("testingw").childNodes[1].childNodes[1].className == 'symbol')
//javascript:alert(document.getElementById("testingw").childNodes[1].childNodes[1].className)
//javascript:galaxyIndexerParseSystem()
//
//
//
//
//

function galaxyIndexerSetStructure()
{
	if(localStorage.getItem('galaxyIndexerStructure') != null)
		return;
	var structure = new Array(20);
	for(var i = 0;i<20;i++)
	{
		structure[i] = new Array(499);
		for(var ii=0;ii<499;ii++)
		{
			structure[i][ii] = new Array(15);
			for(var iii = 0;iii<15;iii++)
			{
				structure[i][ii][iii] = 'Testing one two three';
			}
		}
	}



	localStorage.setItem('galaxyIndexerStructure',JSON.stringify(structure));

}
//javascript:galaxyIndexerSetStructure();
//javascript:alert(localStorage.getItem('galaxyIndexerStructure').length);
function test()
{

}






function unhideBoardPostsFromBottom(numberOfPosts){
//javascript:unhideBoardPostsFromBottom(5)
var posts = document.getElementById('posts').children[0];
numberOfPosts = numberOfPosts*2;
var count = 0;
var focusElement = '';
for(var i = posts.children.length-1;i>-1;i--){
	
	if(posts.children[i].getAttribute('style') && posts.children[i].getAttribute('style') == 'display: none;'){
		count++;
		document.getElementById('posts').children[0].children[i].setAttribute('style','');	
		}
	else{
		focusElement = document.getElementById('posts').children[0].children[i].getAttribute('id');
		}
	if(count>=numberOfPosts)
		break;
	}

setTimeout('document.getElementById("'+focusElement+'").scrollIntoView();',200);
//javascript:document.getElementById("post_3365055").scrollIntoView();
}


function setupUnhidePosts()
{
var tempElement = document.createElement('a');
tempElement.setAttribute('onclick','unhideBoardPostsFromBottom(5);');
tempElement.setAttribute('style',"cursor: pointer;");
tempElement.innerHTML = '&uarr; 5 More Posts &uarr;';
document.getElementById('see_all').children[0].appendChild(tempElement);
}








function fleetToolsDetailedFleetInfo(){

var fleets = fleetToolsReturnSelectedFleetsInfo();
var myDate = new Date();
var max = fleets.length;
var outPut = '';
var aboveZero;
for(var i = 0;i<max;i++){
	outPut += '<br />\r\n<br />\r\n<br />\r\n';
	outPut += 'Type: '+fleets[i].type+'<br />\r\n';
	if(fleets[i].embarked>0)
		outPut += 'Embarked At Game Time: '+toClock(fleets[i].embarked)+'<br />\r\n';
	else {
		aboveZero = 0;
		while(aboveZero+fleets[i].embarked<0)
			aboveZero+=86400;
		outPut += 'Embarked At Game Time: '+toClock(aboveZero+fleets[i].embarked)+'<br />\r\n';			
		}
	outPut += 'One Way Trip Time: '+toClock(fleets[i].totalSeconds)+'<br />\r\n';
	outPut += 'Round Trip Time: '+toClock(fleets[i].totalSeconds*2)+'<br />\r\n';
	outPut += 'Origin: '+fleets[i].origin+'-Elapsed Travel Time: <xx id="fleetToolsDFIOrigin'+i+'"></xx><br />\r\n';
	outPut += 'Destination: '+fleets[i].destination+'-Remaining Travel Time: <xx id="fleetToolsDFIDestination'+i+'"></xx><br />\r\n';
	outPut += 'Arrival Game Time: '+toClock(fleets[i].arrivalTime)+'<br />\r\n';
	outPut += '<br />\r\nShips:<br />\r\n'+stringOfShipsInSelectedFleets(fleets[i].ships)
	outPut += '<br />\r\nResources:<br />\r\n* Ore: '+addCommas(fleets[i].ore)
		+'<br />\r\n* Crystal: '+addCommas(fleets[i].crystal)
		+'<br />\r\n* Hydrogen: '+addCommas(fleets[i].hydrogen)
		+'<br />\r\n* Total: '+addCommas(fleets[i].ore+fleets[i].crystal+fleets[i].hydrogen)+'<br />\r\n<br />\r\n';
	

	}
addFlashMessage(outPut,'notice','detailedfleetInfoOne');


var calculated;
var timeNow = myDate.getUTCHours()*3600+myDate.getUTCMinutes()*60+myDate.getUTCSeconds();
var serverTime = parseInt(localStorage.getItem('pageLoadTimeSeconds'));
for(var i = 0;i<max;i++){
	if(fleets[i].secondsSoFar>0)
		calculated = fleets[i].secondsSoFar + timeNow-serverTime; 
	else	calculated = fleets[i].secondsSoFar+ timeNow-serverTime;
	
	frsIntervalUpdater('fleetToolsDFIOrigin'+i,calculated,1,'','',null)

	
	frsIntervalUpdater('fleetToolsDFIDestination'+i,fleets[i].secondsLeft-timeNow+serverTime,-1,'','',null)
	}
}



function fleetToolsReturnSelectedFleetsInfo(){

var fleets = new Array();
var selectedFleets = returnSelectedFleets('fleetcheckbox');
var max = selectedFleets.length;
var temp;
for(var i = 0;i<max;i++){
	fleets[i] = function(){};
	temp = document.getElementById('fleetTime'+selectedFleets[i]).innerHTML.match(/makeTimer\('[A-z_]*\d*', [-]*\d*, \d*, null\)/)+'';
	temp = temp.match(/( [-]*\d*)/g);
	fleets[i].secondsLeft = parseInt(temp[1]);
	fleets[i].secondsSoFar = parseInt(temp[0]);
	fleets[i].totalSeconds = parseInt(temp[0])+parseInt(temp[1]);
	fleets[i].ships = returnShipsInFleets([selectedFleets[i]],'fleetShips');
	fleets[i].origin = document.getElementById('fleetOrigin'+selectedFleets[i]).innerHTML;
	fleets[i].destination = document.getElementById('fleetDestination'+selectedFleets[i]).innerHTML;
	fleets[i].type = document.getElementById('fleetMission'+selectedFleets[i]).textContent;
	fleets[i].ore = 0;
	fleets[i].crystal = 0;
	fleets[i].hydrogen = 0;
	try{temp = document.getElementById('fleetTime'+selectedFleets[i]).children[0].children[0].children[0].children[0].children[0].getAttribute('title');}catch(e){};
	if(temp)
		{
		temp = temp.match(/\d+(,\d*)?(,\d*)?(,\d*)?/g);
		if(temp[0]&&parseInt(temp[0].replace(/,/g,''))>0)
			fleets[i].ore = parseInt(temp[0].replace(/,/g,''));
		if(temp[1]&&parseInt(temp[1].replace(/,/g,''))>0)
			fleets[i].crystal = parseInt(temp[1].replace(/,/g,''));
		if(temp[2]&&parseInt(temp[2].replace(/,/g,''))>0)
			fleets[i].hydrogen = parseInt(temp[2].replace(/,/g,''));
		}
	fleets[i].embarked = parseInt(localStorage.getItem('serverGameTimeInSeconds'))-fleets[i].secondsSoFar;
	fleets[i].arrivalTime = fleets[i].secondsLeft+parseInt(localStorage.getItem('serverGameTimeInSeconds'))
	}
return fleets;
}




/*
localStorage.getItem('serverGameTimeInSeconds');
localStorage.getItem('secondsOffsetFromServer');
*/







function startTimerForCountdown(){
var time = getSecondsUntilGameTime(document.getElementById('startTimerTB').value);
if(time==-1)
	return;
var outPut = '<div style="display:block;text-align: center;" id="timerCountDownTime"></div>';
addFlashMessage(outPut,'notice','timerCountDownTimeNotice');
frsIntervalUpdater('timerCountDownTime',time,-1,'T Minus: ','',null);
}





function hideFleetsByFRS(){
var ships = eval(JSON.parse(localStorage.getItem("hideFleetsByFRSShips")));
recursiveAttributeFinder(document.getElementById('assign_fleet_form'),'class',['select_fleet'],'selectFleetContainer');
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('selectFleetContainer'),'class',['ship'],'playerShip','TD');
var currentPlanet = parseInt(document.getElementById('planet').value);
var currentSystem = parseInt(document.getElementById('solar_system').value);
var currentGalaxy = parseInt(document.getElementById('galaxy').value);
var offsetPlanet = parseInt(localStorage.getItem('hideFleetsByFRSPlanetOffset'));
var offsetSystem = parseInt(localStorage.getItem('hideFleetsByFRSSystemOffset'));
var offsetGalaxy = parseInt(localStorage.getItem('hideFleetsByFRSGalaxyOffset'));
var selectedIndexSCE = parseInt(localStorage.getItem('hideFleetsByFRSSpeed'));
var elementCounter = parseInt(localStorage.getItem('elementCounter'),10);
var indices = 0;
var availableShips = 0;
for(var i = 0;i<elementCounter;i++){

	if(document.getElementById('playerShip'+i).childElementCount == 0)
		continue;
	//ship
	indices = getShipIdBattleCalcStandards(document.getElementById('playerShip'+i).children[1].children[0].children[0].getAttribute('alt'));
	//Ships available
	availableShips = parseInt(document.getElementById('playerShip'+i).children[3].children[0].textContent,10);
	//Set Ship Value
	if(availableShips<ships[indices])
		continue;
	document.getElementById('playerShip'+i).children[0].children[1].children[0].children[1].value = availableShips-ships[indices];


	}
var ore = parseInt(localStorage.getItem('hideFleetsByFRSOre'),10);
var crystal = parseInt(localStorage.getItem('hideFleetsByFRSCrystal'),10);
var hydro = parseInt(localStorage.getItem('hideFleetsByFRSHydro'),10);
document.getElementById('planet').value = compareCoords(trimCoords(currentPlanet+offsetPlanet,15,1),trimCoords(currentPlanet-parseInt(offsetPlanet),15,1),currentPlanet);
document.getElementById('galaxy').value = compareCoords(trimCoords(currentGalaxy+offsetGalaxy,9,1),trimCoords(currentGalaxy-offsetGalaxy,9,1),currentGalaxy);
document.getElementById('solar_system').value = compareCoords(trimCoords(currentSystem+offsetSystem,499,1),trimCoords(currentSystem-offsetSystem,499,1),currentSystem);
document.getElementById('speed').selectedIndex = selectedIndexSCE;
setTimeout("select_max_cargo('hydrogen');select_max_cargo('crystal');select_max_cargo('ore');",250);
var stringToWait = "if(document.getElementById('send_ore').value>"+ore+")document.getElementById('send_ore').value=document.getElementById('send_ore').value-"+ore+";";
stringToWait += "if(document.getElementById('send_crystal').value>"+crystal+")document.getElementById('send_crystal').value=document.getElementById('send_crystal').value-"+crystal+";";
stringToWait += "if(document.getElementById('send_hydrogen').value>"+hydro+")document.getElementById('send_hydrogen').value=document.getElementById('send_hydrogen').value-"+hydro+";";
setTimeout(stringToWait,300);
setTimeout("if(document.getElementById('assign_button').disabled==false)document.getElementById('assign_button').click();",500);
}












/*
var max = indices.length;
var maxii;

var i;
var ii;
for(i= 0;max>i;i++)
	{
	maxii = document.getElementById(elementNames+indices[i]).children.length;
	for(ii = 0;ii<maxii;ii++)
		{
		if(document.getElementById(elementNames+indices[i]).children[ii].getAttribute('class') == 'ship')			
			ships[getShipIdBattleCalcStandards(document.getElementById(elementNames+indices[i]).children[ii].children[0].getAttribute('alt'))] += parseInt(document.getElementById(elementNames+indices[i]).children[ii].textContent.match(/\d+/g));
		}
	}
return ships;
var espionageReports = eval(JSON.parse(localStorage.getItem("espionageReports")));
var newESP = new espionageClass(document.getElementById('message_'+id+'_body').innerHTML);
espionageReports[espionageReports.length] = newESP
localStorage.setItem("espionageReports",JSON.stringify(espionageReports));


	var offsetPlanet = 0;
	var offsetSystem = 0;
	var offsetGalaxy = 0;
	var selectedIndexSCE = 0;
	switch(shipType)
		{
		case 0:
  			offsetPlanet = parseInt(localStorage.getItem('frsPlanetOffsetHarvester'));
			offsetSystem = parseInt(localStorage.getItem('frsSystemOffsetHarvester'));
			offsetGalaxy = parseInt(localStorage.getItem('frsGalaxyOffsetHarvester'));
			selectedIndexSCE = parseInt(localStorage.getItem('frsSelectedIndexHarvester'));
 			break;
		case 1:
  			offsetPlanet = parseInt(localStorage.getItem('frsPlanetOffsetZeus'));
			offsetSystem = parseInt(localStorage.getItem('frsSystemOffsetZeus'));
			offsetGalaxy = parseInt(localStorage.getItem('frsGalaxyOffsetZeus'));
			selectedIndexSCE = parseInt(localStorage.getItem('frsSelectedIndexZeus'));
 			break;
		case 2:
  			offsetPlanet = parseInt(localStorage.getItem('frsPlanetOffsetHephaestus'));
			offsetSystem = parseInt(localStorage.getItem('frsSystemOffsetHephaestus'));
			offsetGalaxy = parseInt(localStorage.getItem('frsGalaxyOffsetHephaestus'));
			selectedIndexSCE = parseInt(localStorage.getItem('frsSelectedIndexHephaestus'));		
			break;
		default:

		}
	document.getElementById('planet').value = compareCoords(trimCoords(currentPlanet+offsetPlanet,15,1),trimCoords(currentPlanet-parseInt(offsetPlanet),15,1),currentPlanet);
	document.getElementById('galaxy').value = compareCoords(trimCoords(currentGalaxy+offsetGalaxy,9,1),trimCoords(currentGalaxy-offsetGalaxy,9,1),currentGalaxy);
	document.getElementById('solar_system').value = compareCoords(trimCoords(currentSystem+offsetSystem,499,1),trimCoords(currentSystem-offsetSystem,499,1),currentSystem);
localStorage.setItem('hideFleetsByFRSGalaxyOffset',trimCoords(document.getElementById("sFGalaxyOffset").value,8,0));
localStorage.setItem('hideFleetsByFRSSystemOffset',trimCoords(document.getElementById("sFSystemOffset").value,498,0));
localStorage.setItem('hideFleetsByFRSPlanetOffset',trimCoords(document.getElementById("sFPlanetOffset").value,14,0));
localStorage.setItem('hideFleetsByFRSSpeed',document.getElementById("sFSpeed").selectedIndex);
*/








//Resource Compounder


function compoundResourcesGUI(first){
var tempElement = document.getElementById('empire');
if(first == 0){	
	tempElement.id = 'theOldEmpire';
	document.getElementById('originalFooter').appendChild(tempElement);
	tempElement.toggle();
	}
clearPad();
//javascript:alert(document.getElementById('selectedPlanetImage').getAttribute('src').split('?')[0]);
var playerServerImageId = document.getElementById('selectedPlanetImage').getAttribute('src').split('?')[1];
var planets = eval(JSON.parse(localStorage.getItem("compoundPlanets")));
var overContainer= document.createElement('div');
overContainer.setAttribute('class','title');
tempElement = document.createElement('div');
tempElement.setAttribute('class','text');
tempElement.innerHTML = 'Compounded Planets';
overContainer.appendChild(tempElement);
tempElement = document.createElement('input');
tempElement.setAttribute('type','button');
tempElement.setAttribute('value','Refresh');
tempElement.setAttribute('onclick','compoundResourcesStart();');
overContainer.appendChild(tempElement);
var finalString = '<br><br><br><table style="cursor: pointer;"><tbody>';
finalString +='<tr><th></th><th>Ore</th><th>Crystal</th><th>Hydrogen</th></tr>';
finalString +='<tr><th>Have</th><td id="compoundHaveOre" onClick="this.textContent=\'0\';compoundAddToResources(\'Ore\', 0, \'Have\');">0</td>';
finalString +='<td id="compoundHaveCrystal" onClick="this.textContent=\'0\';compoundAddToResources(\'Crystal\', 0, \'Have\');">0</td>';
finalString +='<td id="compoundHaveHydrogen" onClick="this.textContent=\'0\';compoundAddToResources(\'Hydrogen\', 0, \'Have\');">0</td></tr>';
finalString +='<tr><th>Need</th><td id="compoundNeedOre" onClick="this.textContent=\'0\';compoundAddToResources(\'Ore\', 0, \'Need\');">0</td>';
finalString +='<td id="compoundNeedCrystal" onClick="this.textContent=\'0\';compoundAddToResources(\'Crystal\', 0, \'Need\');">0</td>';
finalString +='<td id="compoundNeedHydrogen" onClick="this.textContent=\'0\';compoundAddToResources(\'Hydrogen\', 0, \'Need\');">0</td></tr>';
finalString +='<tr><th>Difference</th><td id="compoundDifferenceOre" style="cursor: default;">0</td>';
finalString +='<td id="compoundDifferenceCrystal" style="cursor: default;">0</td>';
finalString +='<td id="compoundDifferenceHydrogen" style="cursor: default;">0</td></tr>';
finalString +='</tbody></table>';
var dateA = new Date();
var max = planets.length;
var maxii;
var ii;
var ore;
var cry;
var hyd;
var combinedOre = 0;
var combinedCry = 0;
var combinedHyd = 0;
var combinedOreOutput = 0;
var combinedCryOutput = 0;
var combinedHydOutput = 0;
var defenseOre = 0;
var defenseCrystal = 0;
var defenseHydrogen = 0;
var combinedDefenseOre = 0;
var combinedDefenseCrystal = 0;
var combinedDefenseHydrogen = 0;
var combinedDefenseNumbers = 0;
finalString +='<br><br><br><table><tbody><tr><th></th><th>Resources</th><th>Buildings</th><th></th><th></th><th></th></tr>';
try{
for(var i = 0;i<max;i++){
	finalString +='<tr>';
	finalString +='<td class="name"><table><tbody>';
	finalString +='<tr><th>Coords</th><td>'+planets[i].planetCoords+'</td>';
	finalString +='<tr><th>Used Fields</th><td>'+planets[i].planetFieldsUsed+'</td>';
	finalString +='<tr><th>Total Fields</th><td>'+planets[i].planetFieldsTotal+'</td>';
	finalString +='<tr><th>ID</th><td>'+planets[i].planetID+'</td>';
	finalString +='<tr><th>Name</th><td>'+planets[i].planetName+'</td>';
	if(planets[i].planetImage != undefined)
		finalString +='<tr><td colSpan="2"><img src="'+planets[i].planetImage+'?'+playerServerImageId+'"></td>';
	dateA.setTime(parseInt(planets[i].date,10));
	finalString +='<tr><th>Updated</th><td>'+dateA+'</td>';
	finalString +='</tbody></table></td>';
	finalString +='<td class="name"><table><tbody>';
	finalString +='<tr><th colSpan="2">Stockpiled</th></tr>';
	combinedOre += parseInt(planets[i].ore.replace(/,/g,''));
	combinedCry += parseInt(planets[i].crystal.replace(/,/g,''));
	combinedHyd += parseInt(planets[i].hydrogen.replace(/,/g,''));
	finalString +='<tr><th>Ore</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Ore\', this.textContent, \'Have\');">'+planets[i].ore+'</td></tr>';
	finalString +='<tr><th>Crystal</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Crystal\', this.textContent, \'Have\');">'+planets[i].crystal+'</td></tr>';
	finalString +='<tr><th>Hydrogen</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Hydrogen\', this.textContent, \'Have\');">'+planets[i].hydrogen+'</td></tr>';
	finalString +='<tr><th>Total</th><td>'+addCommas(parseInt(planets[i].ore.replace(/,/g,''),10)+parseInt(planets[i].crystal.replace(/,/g,''),10)+parseInt(planets[i].hydrogen.replace(/,/g,''),10))+'</td></tr>';
	if(planets[i].planetCoords.search('m')==-1){
		finalString +='<tr><th colSpan="2">Hourly Production</th></tr>';
		ore = parseInt(planets[i].hourlyOre);
		cry = parseInt(planets[i].hourlyCrystal);
		hyd = parseInt(planets[i].hourlyHydrogen);
		finalString +='<tr><th>Ore</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Ore\', this.textContent, \'Have\');">'+addCommas(ore)+'</td></tr>';
		finalString +='<tr><th>Crystal</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Crystal\', this.textContent, \'Have\');">'+addCommas(cry)+'</td></tr>';
		finalString +='<tr><th>Hydrogen</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Hydrogen\', this.textContent, \'Have\');">'+addCommas(hyd)+'</td></tr>';
		finalString +='<tr><th>Total</th><td>'+addCommas(ore+cry+hyd)+'</td></tr>';
		finalString +='<tr><th colSpan="2">Daily Production</th></tr>';
		finalString +='<tr><th>Ore</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Ore\', this.textContent, \'Have\');">'+addCommas(24*ore)+'</td></tr>';
		finalString +='<tr><th>Crystal</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Crystal\', this.textContent, \'Have\');">'+addCommas(24*cry)+'</td></tr>';
		finalString +='<tr><th>Hydrogen</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Hydrogen\', this.textContent, \'Have\');">'+addCommas(24*hyd)+'</td></tr>';
		finalString +='<tr><th>Total</th><td>'+addCommas(24*(ore+cry+hyd))+'</td></tr>';
		finalString +='<tr><th colSpan="2">Weekly Production</th></tr>';
		finalString +='<tr><th>Ore</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Ore\', this.textContent, \'Have\');">'+addCommas(7*24*ore)+'</td></tr>';
		finalString +='<tr><th>Crystal</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Crystal\', this.textContent, \'Have\');">'+addCommas(7*24*cry)+'</td></tr>';
		finalString +='<tr><th>Hydrogen</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Hydrogen\', this.textContent, \'Have\');">'+addCommas(7*24*hyd)+'</td></tr>';
		finalString +='<tr><th>Total</th><td>'+addCommas(7*24*(ore+cry+hyd))+'</td></tr>';
		combinedOreOutput += ore;
		combinedCryOutput += cry;
		combinedHydOutput += hyd;
	}



	finalString +='</tbody></table></td>';
	finalString +='<td class="name"><table><tbody><tr><th>Building</th><th>Level</th><th>Ore</th><th>Crystal</th><th>Hydrogen</th><th>Time</th></tr>';
	maxii = planets[i].buildings.length;
	for(ii = 0;ii<maxii;ii++){
		finalString +='<tr><td>'+planets[i].buildings[ii].name+'</td>';
		finalString +='<td>'+planets[i].buildings[ii].level+'</td>';
		finalString +='<td style="cursor: pointer;" onClick="compoundAddToResources(\'Ore\', this.textContent, \'Need\');">'+planets[i].buildings[ii].ore+'</td>';
		finalString +='<td style="cursor: pointer;" onClick="compoundAddToResources(\'Crystal\', this.textContent, \'Need\');">'+planets[i].buildings[ii].crystal+'</td>';
		finalString +='<td style="cursor: pointer;" onClick="compoundAddToResources(\'Hydrogen\', this.textContent, \'Need\');">'+planets[i].buildings[ii].hydro+'</td>';
		finalString +='<td>'+planets[i].buildings[ii].time+'</td></tr>';
		}
	finalString +='<tr><th>Defense</th><th>Amount</th><th>Total Ore Cost</th><th>Total Crystal Cost</th><th>Total Hydrogen Cost</th><th></th></tr>';
	for(ii = 1;ii<12;ii++){
		if(ii==9)
			continue;
		finalString +='<tr><td>';
		finalString +='<img class="item_image" height="20" src="/images/starfleet/defense_templates/'+ getDefenseNameBattleCalcStandards(ii).replace('Icon_','')+ '.png?'+playerServerImageId+'" width="20">';
		finalString +='</td><td>x'+addCommas(planets[i].defenses[ii])+'</td>';
		defenseOre = parseInt(planets[i].defenses[ii],10)*getDefenseOreCost(ii);
		finalString += '<td>'+addCommas(defenseOre)+'</td>';
		defenseCrystal = parseInt(planets[i].defenses[ii],10)*getDefenseCrystalCost(ii);
		finalString += '<td>'+addCommas(defenseCrystal)+'</td>';
		defenseHydrogen = parseInt(planets[i].defenses[ii],10)*getDefenseHydrogenCost(ii);
		finalString += '<td>'+addCommas(defenseHydrogen)+'</td>';
		finalString +='</tr>';
		combinedDefenseOre += defenseOre;
		combinedDefenseCrystal += defenseCrystal;
		combinedDefenseHydrpgen += defenseHydrogen;
	}
	finalString +='<tr><th>Total</th><th>Amount</th><th>Total Ore Cost</th><th>Total Crystal Cost</th><th>Total Hydrogen Cost</th><th></th></tr>';
	finalString +='</tbody></table></td>';
	finalString +='</tr>';	
	}
finalString +='<tr><td colSpan="3"><table><tbody><tr><td><table><tbody>';
finalString +='<tr><th colSpan="2">Combined Stockpiled</th></tr>';
finalString +='<tr><th>Ore</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Ore\', this.textContent, \'Have\');">'+addCommas(combinedOre)+'</td></tr>';
finalString +='<tr><th>Crystal</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Crystal\', this.textContent, \'Have\');">'+addCommas(combinedCry)+'</td></tr>';
finalString +='<tr><th>Hydrogen</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Hydrogen\', this.textContent, \'Have\');">'+addCommas(combinedHyd)+'</td></tr>';
finalString +='<tr><th>Total</th><td>'+addCommas(combinedOre+combinedCry+combinedHyd)+'</td></tr>';
finalString +='</tbody></table></td>';

finalString +='<td><table><tbody>';
finalString +='<tr><th colSpan="2">Combined Hourly Production</th></tr>';
finalString +='<tr><th>Ore</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Ore\', this.textContent, \'Have\');">'+addCommas(combinedOreOutput)+'</td></tr>';
finalString +='<tr><th>Crystal</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Crystal\', this.textContent, \'Have\');">'+addCommas(combinedCryOutput)+'</td></tr>';
finalString +='<tr><th>Hydrogen</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Hydrogen\', this.textContent, \'Have\');">'+addCommas(combinedHydOutput)+'</td></tr>';
finalString +='<tr><th>Total</th><td>'+addCommas(combinedOreOutput+combinedCryOutput+combinedHydOutput)+'</td></tr>';
finalString +='</tbody></table></td>';

finalString +='<td><table><tbody>';
finalString +='<tr><th colSpan="2">Combined Daily Production</th></tr>';
finalString +='<tr><th>Ore</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Ore\', this.textContent, \'Have\');">'+addCommas(24*combinedOreOutput)+'</td></tr>';
finalString +='<tr><th>Crystal</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Crystal\', this.textContent, \'Have\');">'+addCommas(24*combinedCryOutput)+'</td></tr>';
finalString +='<tr><th>Hydrogen</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Hydrogen\', this.textContent, \'Have\');">'+addCommas(24*combinedHydOutput)+'</td></tr>';
finalString +='<tr><th>Total</th><td>'+addCommas(24*(combinedOreOutput+combinedCryOutput+combinedHydOutput))+'</td></tr>';
finalString +='</tbody></table></td>';

finalString +='<td><table><tbody>';
finalString +='<tr><th colSpan="2">Combined Weekly Production</th></tr>';
finalString +='<tr><th>Ore</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Ore\', this.textContent, \'Have\');">'+addCommas(7*24*combinedOreOutput)+'</td></tr>';
finalString +='<tr><th>Crystal</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Crystal\', this.textContent, \'Have\');">'+addCommas(7*24*combinedCryOutput)+'</td></tr>';
finalString +='<tr><th>Hydrogen</th><td style="cursor: pointer;" onClick="compoundAddToResources(\'Hydrogen\', this.textContent, \'Have\');">'+addCommas(7*24*combinedHydOutput)+'</td></tr>';
finalString +='<tr><th>Total</th><td>'+addCommas(7*24*(combinedOreOutput+combinedCryOutput+combinedHydOutput))+'</td></tr>';
finalString +='</tbody></table></td></tr></tbody></table></td></tr>';

finalString +='</tbody></table>';}
catch(e){alert('The planet data integrety has degraded, please use the "refreash" button (located on the page) to reload all the planet data.')}
tempElement = document.createElement('div');
tempElement.setAttribute('id','empire');
tempElement.innerHTML = finalString;
overContainer.appendChild(tempElement);
tempElement = document.createElement('div')
tempElement.setAttribute('class','clear');
overContainer.appendChild(tempElement);
document.getElementById("content").appendChild(overContainer);

}


function compoundAddToResources(resource, amount, type){
amount = parseInt((amount+'').replace(/,/g,''),10);
var idString = 'compound'+type+resource;
var addTo = parseInt(document.getElementById(idString).textContent.replace(/,/g,''),10);
amount += addTo;
document.getElementById(idString).textContent = addCommas(amount);
document.getElementById('compoundDifference'+resource).textContent = addCommas(parseInt(document.getElementById('compoundHave'+resource).textContent.replace(/,/g,''),10)-parseInt(document.getElementById('compoundNeed'+resource).textContent.replace(/,/g,''),10));
}















function compoundResourcesStart()
{
onClickAdder(document.body,"localStorage.setItem('compoundGoNow',0);");
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('theOldEmpire'),'class',['image'],'playerPlanetImage','TD');
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('theOldEmpire'),'class',['name'],'playerPlanetName','TD');
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('theOldEmpire'),'class',['mines'],'playerPlanetMines','TD');
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('theOldEmpire'),'class',['ships'],'playerPlanetShips','TD');
localStorage.setItem('elementCounter',0);
recursiveAttributeLabeler(document.getElementById('theOldEmpire'),'class',['tasks'],['playerPlanetTasks'],'TD');
var tempElement;
var elementCounter = parseInt(localStorage.getItem('elementCounter'));
var planetMines = new Array(elementCounter);
var planetCoords = new Array(elementCounter);
var planetFields = new Array(elementCounter);
var planetIds = new Array(elementCounter);
var planetsName = new Array(elementCounter);
var planetSlowestShip = new Array(elementCounter);
var planetsHarvestReady = new Array(elementCounter);
var tempString = '';
for(var i = 0;i<elementCounter;i++)
{
	tempElement = document.getElementById('playerPlanetName'+i);
	planetIds[i] = ((tempElement.innerHTML).match(/activate_planet=\d*/)+'').match(/\d+/g)+'';
	tempString = (tempElement.innerHTML).match(/>.*<\/a>/)+'';	
	planetsName[i] = tempString.slice(1,-4);
	planetCoords[i] = (tempElement.textContent).match(/\[\d+:\d+:\d+m?\]/)+'';
	planetFields[i] = ((tempElement.textContent).match(/\d+\/\d+/)+'').replace('/',' of ');
	tempElement = document.getElementById('playerPlanetShips'+i);
	tempElement = document.getElementById('playerPlanetMines'+i);
	tempString = 'N/A';
	if(tempElement.childElementCount>0)
		{
		tempString = (tempElement.textContent.match(/\d+/g)+'').replace(/,/g,'/');
		}
	planetMines[i] = tempString;

}
clearPad();
document.getElementById("content").innerHTML = '<div id="flash_messages"></div>'+document.getElementById("content").innerHTML;
recursiveAttributeFinder(document.getElementsByTagName('body')[0],'class',['selected'],'selectedPage');
if(document.getElementById('selectedPage'))
document.getElementById('selectedPage').setAttribute('class','nothingToDoWithAnything');
localStorage.setItem('compoundPlanets',JSON.stringify([]));
onClickAdder(document.body,'localStorage.setItem(\'frs\',0);');
var planet = ((document.location.href+'').match(/current_planet=\d*/)+'').match(/\d+/g)+'';
var timer = 1000+Math.floor(Math.random()*5)*1000;
var samePlanet = false;
var tempChecked;
if(planet+''== planetIds[0]+'')
	{
	samePlanet = 'true';
	}		

localStorage.setItem('compoundGoNow',1);
for(var i = 0;i<elementCounter;i++)
{

		if(samePlanet == 'true')
			{
			var a = "window.open('"+(document.location.href+'').match(/(\w|\W)*\.com/g)+'/buildings/home?current_planet='+planet+"')";
			setTimeout(a,timer);
			samePlanet = 'false';
			planet = planetIds[i];
			}
		else 
			{
			var a = "window.open('"+(document.location.href+'').match(/(\w|\W)*\.com/g)+'/buildings/home?activate_planet='+planetIds[i]+'&current_planet='+planet+"')";
			setTimeout(a,timer);
			planet = planetIds[i];
			}
		addFlashMessage('<div style="display:block;text-align: center;"id="timer'+planetIds[i]+'"></div>','notice');
		frsIntervalUpdater("timer"+planetIds[i],timer*.001,-1,'',' --- Time Until Snapshot for: '+planetsName[i],0);
		timer += 5000+Math.floor(Math.random()*7)*1000;
	
	
//		
	
}
	setTimeout('localStorage.setItem(\'compoundGoNow\',0);',timer);
	timer+=2000;
	setTimeout("compoundResourcesGUI(1);",timer);
	addFlashMessage('<div style="display:block;text-align: center;"id="compoundTimer"></div>','notice');
	frsIntervalUpdater("compoundTimer",timer*.001,-1,' --- Time Until Compound Displayed: ',' ---',0);
	
}







function compoundLoadBuildings(){
	recursiveAttributeFinder(document.getElementById('content'),'class',['fields block'],'fieldsBlock');
	var planets = eval(JSON.parse(localStorage.getItem("compoundPlanets")));
	var planet = new function(){};
	var planetid;
	if((document.location.href).match(/current_planet=\d*/))
		planetid = ((document.location.href).match(/current_planet=\d*/)+'').match(/\d+/g);
	if((document.location.href+'').match(/activate_planet=\d*/))
		planetid = ((document.location.href).match(/activate_planet=\d*/)+'').match(/\d+/g);
	planet.planetID = parseInt(planetid,10);
	planet.planetName = document.getElementById('selectedPlanetName').textContent;
	planet.planetCoords = document.getElementById('selectedPlanetCoords').textContent;
	planet.planetImage = document.getElementById('selectedPlanetImage').getAttribute('src').split('?')[0];
	planet.planetFieldsTotal = document.getElementById('fieldsBlock').children[1].textContent;
	planet.planetFieldsUsed = document.getElementById('fieldsBlock').children[0].textContent;
	var dateA = new Date();
	planet.date = dateA.getTime();
	var buildings = new Array();
	localStorage.setItem('elementCounter',0);	
	recursiveAttributeLabeler(document.getElementById('locations_table'),'class',['data image'],'data_image','DIV');
	localStorage.setItem('elementCounter',0);	
	recursiveAttributeLabeler(document.getElementById('locations_table'),'class',['data details'],'data_details','DIV');
	localStorage.setItem('elementCounter',0);	
	recursiveAttributeLabeler(document.getElementById('locations_table'),'class',['data actions'],'data_actions','DIV');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('locations_table'),'class',['row time cost'],'row_time_cost','DIV');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('locations_table'),'class',['row ore  cost','row ore  cost cannot_afford'],'row_ore_cost','DIV');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('locations_table'),'class',['row crystal  cost','row crystal  cost cannot_afford'],'row_crystal_cost','DIV');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('locations_table'),'class',['row hydrogen  cost','row hydrogen  cost cannot_afford'],'row_hydrogen_cost','DIV');
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('locations_table'),'class',['name'],'buildingName','DIV');
	var level;
	var name;
	var ore;
	var crystal;
	var hydro;
	var time;
	var parent;
	var max = parseInt(localStorage.getItem('elementCounter'),10);
	for(var i = 0;i<max;i++){
		name = document.getElementById('buildingName'+i).children[0].textContent;
		parent = document.getElementById('buildingName'+i).parentNode;
		if(parent.children.length > 1&&parent.children[1].getAttribute('class') == 'level')
			level = parent.children[1].children[0].textContent;
		else level = '0';
		ore = document.getElementById('row_ore_cost'+i).children[1].textContent;
		crystal = document.getElementById('row_crystal_cost'+i).children[1].textContent;
		hydro = document.getElementById('row_hydrogen_cost'+i).children[1].textContent;
		time = document.getElementById('row_time_cost'+i).children[1].textContent;
		buildings[i] = new buildingsStorage(level,name,ore,crystal,hydro,time);
	}
	planet.ore = document.getElementById('currentPlanetOre').children[1].textContent;
	planet.crystal = document.getElementById('currentPlanetCrystal').children[1].textContent;
	planet.hydrogen = document.getElementById('currentPlanetHydrogen').children[1].textContent;
	localStorage.setItem('elementCounter',0);
	recursiveAttributeLabeler(document.getElementById('resource_production'),'class',['amount right'],'hourlyProduction','SPAN');
	if(planet.planetCoords.search('m')==-1){
		planet.hourlyOre = document.getElementById('hourlyProduction0').textContent.replace(/,/g,'')+'';
		planet.hourlyCrystal = document.getElementById('hourlyProduction1').textContent.replace(/,/g,'')+'';
		planet.hourlyHydrogen = document.getElementById('hourlyProduction2').textContent.replace(/,/g,'')+'';	
	}
	else{
		planet.hourlyOre = 0;
		planet.hourlyCrystal = 0;
		planet.hourlyHydrogen = 0;	
	}
	planet.buildings = buildings;
	max = planets.length;
	var indexA = planets.length;
	for(i = 0;i<max;i++){
		if(planets[i].planetCoords == planet.planetCoords){
			indexA = i;
			break;
			}
	}
	if(indexA!=max&&planets[indexA].defenses)
		planet.defenses = planets[indexA].defenses;
	else planet.defenses = [0,0,0,0,0,0,0,0,0,0,0,0];
	planets[indexA] = planet;
	localStorage.setItem("compoundPlanets",JSON.stringify(planets));
}



function buildingsStorage(level,name,ore,crystal,hydro,time){
this.level = level;
this.name = name;
this.ore = ore;
this.crystal = crystal;
this.hydro = hydro;
this.time = time;

}

function compoundLoadDefenses(){
//javascript:compoundLoadDefenses();
var defenses = [0,0,0,0,0,0,0,0,0,0,0,0];
var planets = eval(JSON.parse(localStorage.getItem("compoundPlanets")));
var max = planets.length;
var planetid;
if((document.location.href).match(/current_planet=\d*/))
	planetid = ((document.location.href).match(/current_planet=\d*/)+'').match(/\d+/g);
if((document.location.href+'').match(/activate_planet=\d*/))
	planetid = ((document.location.href).match(/activate_planet=\d*/)+'').match(/\d+/g);
planetid = parseInt(planetid,10);
for(var i = 0; i<max;i++){
if(planetid == planets[i].planetID)
	break;
}
var index = i;
defensesHTML = document.getElementById('current_defenses').children[1].children[0];
max = defensesHTML.children.length;
for(i = 0;i<max;i++){
	if(defensesHTML.children[i].children.length==0)
		continue;
	try{
		defenses[getDefenseIdBattleCalcStandards(defensesHTML.children[i].children[0].getAttribute('alt'))] = parseInt(defensesHTML.children[i].children[2].textContent.match(/\d+/g),10);

	}
	
	catch(e){alert('error!!! '+e); };

}
planets[index].defenses = defenses;

localStorage.setItem("compoundPlanets",JSON.stringify(planets));
}




function getDefenseOreCost(i) {
switch (i){
	case 1: 
		return 2000; 
		break; 
	case 2: 
		return 1500; 
		break;
	case 3: 
		return 6000; 
		break;
	case 4: 
		return 2000; 
		break;
	case 5: 
		return 20000; 
		break;
	case 6: 
		return 50000; 
		break;
	case 7: 
		return 10000; 
		break;
	case 8:
		return 50000;
		break;
	case 9:
		return 0;
		break;
	case 10:
		return 8000;
		break;
	case 11:
		return 12500;
		break;
	} 
	return 0;
}

 
function getDefenseCrystalCost(i) {
switch (i){
	case 1: 
		return 0; 
		break; 
	case 2: 
		return 500; 
		break;
	case 3: 
		return 2000; 
		break;
	case 4: 
		return 6000; 
		break;
	case 5: 
		return 15000; 
		break;
	case 6: 
		return 50000; 
		break;
	case 7: 
		return 10000; 
		break;
	case 8:
		return 50000;
		break;
	case 9:
		return 2000;
		break;
	case 10:
		return 2000;
		break;
	case 11:
		return 2500;
		break;
	}
	return 0;	
}


 
function getDefenseHydrogenCost(i) {
switch (i){
	case 1: 
		return 0; 
		break; 
	case 2: 
		return 0; 
		break;
	case 3: 
		return 0; 
		break;
	case 4: 
		return 0; 
		break;
	case 5: 
		return 2000; 
		break;
	case 6: 
		return 30000; 
		break;
	case 7: 
		return 0; 
		break;
	case 8:
		return 0;
		break;
	case 9:
		return 500;
		break;
	case 10:
		return 2000;
		break;
	case 11:
		return 10000;
		break;
	} 
	return 0;
}
//style="background-image: url('/images/starfleet/layout/transparent_grey_bg.png');display:block;text-align: center;position:fixed;top:40px;left:5px;width:auto;"
































































////////////////////////////////////////////
//eljer/Pengy's code (Thanks for sharing!)//
////////////////////////////////////////////

































// Add Sticky Notice
var AddStickyNoticePass=function AddStickyNotice(StickyNotice){
 var stickyNotices=document.getElementById('sticky_notices');
 if (vTrim(stickyNotices.innerHTML).length>0) { stickyNotices.innerHTML+='<br/>'; }
 var closeMessages=new Array('(close)','(OK OK!)','(OKAY)','(roger)','(go away)');
 var closeMessage=closeMessages[Math.round(Math.random()*(closeMessages.length-1))];
 var stickyText=' <div class="notice">';
 stickyText+='  <div class="close"><span class="ajax_link"><span class="active"><span class="enabled"><a href="#" onclick="disable_ajax_links();; new Ajax.Request(&#39;/stickies/close/7&amp;klass=GlobalSticky&#39;, {asynchronous:true, evalScripts:true, method:&#39;post&#39;}); return false;">'+closeMessage+'</a></span></span></span></div>';
 stickyText+='  <div class="message">'+StickyNotice+'</div>';
 stickyText+=' </div>';
 stickyNotices.innerHTML+=vTrim(stickyText);}

//VTrim

function vTrim(vInString) { return vInString.replace(/^\s+|\s+$/g, ""); }



////
////Espionage Parser


function ParseEspionageReports()
 {

 var vMessageTable=document.getElementById('messages');
 var vMessages=vMessageTable.getElementsByTagName('tr');
 for (i=1;i<vMessages.length;i++) {
  var vRegExMatch=vMessages[i].getAttribute('class').match(/u?n?read message a?l?t?/);
  if (vRegExMatch != null) {
   var vRegExMatch=vMessages[i].innerHTML.match(/Espionage Report for /);
   if (vRegExMatch != null) {
    var vSubjectLine=vMessages[i].getElementsByTagName('td')[1];
    var vOrigMessage=vMessages[i+1].getElementsByTagName('td')[0].getElementsByTagName('DIV')[1];
    var vOrigMessageTxt=vOrigMessage.innerHTML;
    var espiData=ParseEspiReport(vOrigMessageTxt);	
    var vLinks=vOrigMessage.getElementsByTagName('a');
    var vLinkInfo='&nbsp;'
    for (j=1;j<vLinks.length;j++) { 
     vLinkInfo+='&nbsp;|&nbsp;'+vLinks[j].parentNode.innerHTML; 
    }
    vLinkInfo+='&nbsp;|&nbsp;'+vMessages[i+1].getElementsByTagName('td')[0].getElementsByTagName('DIV')[2].getElementsByTagName('a')[0].parentNode.innerHTML;
    vMessages[i+1].getElementsByTagName('td')[0].getElementsByTagName('DIV')[2].innerHTML='';

    var vDios=0;
    var vShips=0;
    var vDebris=0;
    var vRes=Math.ceil((parseInt(espiData[6].replace(/,/g,""))+parseInt(espiData[7].replace(/,/g,""))+parseInt(espiData[8].replace(/,/g,"")))/1000);
    var debrisAmount=GetDebrisAmounts();
    for (j=10;j<26;j++) {
     if(espiData[j].length>0 && parseInt(espiData[j].replace(/,/g,""))>0) { 
      var vShipCount=parseInt(espiData[j].replace(/,/g,""));
      vShips+=vShipCount;
      vDebris+=(vShipCount*debrisAmount[j]); } }
    var vDefenses=0;
    for (j=26;j<36;j++) {if (j!=30&&j!=32) {if(espiData[j].length>0 && parseInt(espiData[j].replace(/,/g,""))>0) { vDefenses+=parseInt(espiData[j].replace(/,/g,"")); }}}
    vDios=(Math.ceil(vDebris/2000)/10);
    if (espiData[9].length==0) { 
     vShips='?';
     vDios='?' }

    if (espiData[53].length==0) { vDefenses='?'; }
    vSubjectLine.innerHTML=espiData[0].substr(0,1)+'&nbsp;Res:'+vRes+'k&nbsp;S:'+vShips+'&nbsp;D:'+vDefenses+'&nbsp;Dios:'+vDios;
    
    var vToggleLink='<a href="#" onClick="if(document.getElementById(&quot;MsgData'+i+'&quot;).style.display==&quot;&quot;){document.getElementById(&quot;MsgData'+i+'&quot;).style.display=&quot;none&quot;;}else{document.getElementById(&quot;MsgData'+i+'&quot;).style.display=&quot;&quot;;};return false">Toggle original report</a>';
	 vBattleCalcLink='&nbsp;|&nbsp;&nbsp;<a href="http://www.battlecalc.com/log_parse?parse_to=/&parseLog=1&log_input='+encodeURIComponent(vOrigMessageTxt.trim().replace(/<br[^>]*>/g,"\n").replace(/<(.|\n)*?>/g,"")).replace(/!/gm,'%21').replace(/'/gm,'%27').replace(/\(/gm,'%28').replace(/\)/gm,'%29').replace(/\*/gm,'%2A')+'" target="_blank">Battlecalc</a>';
//try{
    vOrigMessage.innerHTML=FormatEspiMessage(espiData,vShips,vDefenses,vDios);
//}catch(e){alert('Here')}
    vOrigMessage.innerHTML+='<br />'+vOrigMessageTxt.match(/The chance of your probes being intercepted is \d+\%/im)[0];
    vOrigMessage.innerHTML+='<br /><br />'+vToggleLink+vLinkInfo+vBattleCalcLink+'<div id="MsgData'+i+'" style="display:none"><br />'+vOrigMessageTxt+'</div>';

    }
  }
 }
}
//9-ships, 53-defenses, 54-buildings, 55-techs

function ParseEspiReport(vEspi) {
 var vData=new Array();
 vData[0]=ParseEspiField(vEspi,/(Planet|Moon|Hephaestus Class Attack Platform) ([^\x00]*?) <a href="/m,1);
 vData[1]=ParseEspiField(vEspi,/(Planet|Moon|Hephaestus Class Attack Platform) ([^\x00]*?) <a href="/m,2);
 vData[2]=ParseEspiField(vEspi,/>(\[\d{1,2}:\d{1,3}:\d{1,2}m?\])</m,1);
 vData[3]=ParseEspiField(vEspi,/>\[(\d{1,2}):\d{1,3}:\d{1,2}m?\]</m,1);
 vData[4]=ParseEspiField(vEspi,/>\[\d{1,2}:(\d{1,3}):\d{1,2}m?\]</m,1);
 vData[5]=ParseEspiField(vEspi,/>\[\d{1,2}:\d{1,3}:(\d{1,2})m?\]</m,1);
 vData[6]=ParseEspiField(vEspi,/\* ore: ([0-9,]+)/m,1);
 vData[7]=ParseEspiField(vEspi,/\* crystal: ([0-9,]+)/m,1);
 vData[8]=ParseEspiField(vEspi,/\* hydrogen: ([0-9,]+)/m,1);
 vData[9]=ParseEspiField(vEspi,/hydrogen: [0-9,]+.*>([^\x00]+?)'S SHIPS:</m,1);
 vData[10]=ParseEspiField(vEspi,/\* Hermes Class Probe: ([\d,]+)/m,1);
 vData[11]=ParseEspiField(vEspi,/\* Helios Class Solar Satellite: ([\d,]+)/m,1);
 vData[12]=ParseEspiField(vEspi,/\* Artemis Class Fighter: ([\d,]+)/m,1);
 vData[13]=ParseEspiField(vEspi,/\* Atlas Class Cargo: ([\d,]+)/m,1);
 vData[14]=ParseEspiField(vEspi,/\* Apollo Class Fighter: ([\d,]+)/m,1);
 vData[15]=ParseEspiField(vEspi,/\* Charon Class Transport: ([\d,]+)/m,1);
 vData[16]=ParseEspiField(vEspi,/\* Hercules Class Cargo: ([\d,]+)/m,1);
 vData[17]=ParseEspiField(vEspi,/\* Dionysus Class Recycler: ([\d,]+)/m,1);
 vData[18]=ParseEspiField(vEspi,/\* Poseidon Class Cruiser: ([\d,]+)/m,1);
 vData[19]=ParseEspiField(vEspi,/\* Gaia Class Colony Ship: ([\d,]+)/m,1);
 vData[20]=ParseEspiField(vEspi,/\* Athena Class Battleship: ([\d,]+)/m,1);
 vData[21]=ParseEspiField(vEspi,/\* Ares Class Bomber: ([\d,]+)/m,1);
 vData[22]=ParseEspiField(vEspi,/\* Hades Class Battleship: ([\d,]+)/m,1);
 vData[23]=ParseEspiField(vEspi,/\* Prometheus Class Destroyer: ([\d,]+)/m,1);
 vData[24]=ParseEspiField(vEspi,/\* Zeus Class: ([\d,]+)/m,1);
 vData[25]=ParseEspiField(vEspi,/\* Hephaestus Class Attack Platform: ([\d,]+)/m,1);
 vData[26]=ParseEspiField(vEspi,/\* Missile Battery: ([\d,]+)/m,1);
 vData[27]=ParseEspiField(vEspi,/\* Laser Cannon: ([\d,]+)/m,1);
 vData[28]=ParseEspiField(vEspi,/\* Pulse Cannon: ([\d,]+)/m,1);
 vData[29]=ParseEspiField(vEspi,/\* Particle Cannon: ([\d,]+)/m,1);
 vData[30]=ParseEspiField(vEspi,/\* Anti-Ballistic Missile: ([\d,]+)/m,1);
 vData[31]=ParseEspiField(vEspi,/\* Decoy: ([\d,]+)/m,1);
 vData[32]=ParseEspiField(vEspi,/\* Interplanetary Ballistic Missile: ([\d,]+)/m,1);
 vData[33]=ParseEspiField(vEspi,/\* Gauss Cannon: ([\d,]+)/m,1);
 vData[34]=ParseEspiField(vEspi,/\* Large Decoy: ([\d,]+)/m,1);
 vData[35]=ParseEspiField(vEspi,/\* Plasma Cannon: ([\d,]+)/m,1);
 vData[36]=ParseEspiField(vEspi,/\* Ore Warehouse: ([\d,]+)/m,1);
 vData[37]=ParseEspiField(vEspi,/\* Crystal Warehouse: ([\d,]+)/m,1);
 vData[38]=ParseEspiField(vEspi,/\* Hydrogen Storage: ([\d,]+)/m,1);
 vData[39]=ParseEspiField(vEspi,/\* Ore Mine: ([\d,]+)/m,1);
 vData[40]=ParseEspiField(vEspi,/\* Crystal Mine: ([\d,]+)/m,1);
 vData[41]=ParseEspiField(vEspi,/\* Hydrogen Synthesizer: ([\d,]+)/m,1);
 vData[42]=ParseEspiField(vEspi,/\* Armor Tech: ([\d,]+)/m,1);
 vData[43]=ParseEspiField(vEspi,/\* Weapons Tech: ([\d,]+)/m,1);
 vData[44]=ParseEspiField(vEspi,/\* Shield Tech: ([\d,]+)/m,1);
 vData[45]=ParseEspiField(vEspi,/\* Jet Drive: ([\d,]+)/m,1);
 vData[46]=ParseEspiField(vEspi,/\* Pulse Drive: ([\d,]+)/m,1);
 vData[47]=ParseEspiField(vEspi,/\* Warp Drive: ([\d,]+)/m,1);
 vData[48]=ParseEspiField(vEspi,/\* A.I. Tech: ([\d,]+)/m,1);
 vData[49]=ParseEspiField(vEspi,/\* Espionage Tech: ([\d,]+)/m,1);
 vData[50]=ParseEspiField(vEspi,/\* Lunar Base: ([\d,]+)/m,1);
 vData[51]=ParseEspiField(vEspi,/\* Oracle: ([\d,]+)/m,1);
 vData[52]=ParseEspiField(vEspi,/\* Warp Gate: ([\d,]+)/m,1);
 vData[53]=ParseEspiField(vEspi,/(DEFENSES:)/m,1);
 vData[54]=ParseEspiField(vEspi,/(BUILDINGS:)/m,1);
 vData[55]=ParseEspiField(vEspi,/(TECHS:)/m,1);
 return vData; }

function ParseEspiField(vReport,vRegEx,vMatchNo) {
 var vReturn='';
 var vREMatch=vReport.match(vRegEx);
 if (vREMatch != null) {  vReturn=vREMatch[vMatchNo]; }
 return vReturn;}

function FormatEspiMessage(espiData,vShips,vDefenses,vDios) {
 var currPlanet='';
try{
 var vURLTest=document.location.href.match(/_planet=(\d+)/i);
 if (vURLTest != null) { currPlanet=vURLTest[1]; }
 var vText=espiData[0]+' '+espiData[1]+' '+ReturnSystemLink(espiData[2],currPlanet)+'  has: <br />';

 var vOreMine=parseInt(espiData[39]);
 var vCryMine=parseInt(espiData[40]);
 var vHydMine=parseInt(espiData[41]);

 var vOreCapacity=addCommas((50000*(Math.ceil(Math.pow(1.6,parseInt(espiData[36])))+1)).toString());
 var vCryCapacity=addCommas((50000*(Math.ceil(Math.pow(1.6,parseInt(espiData[37])))+1)).toString());
 var vHydCapacity=addCommas((50000*(Math.ceil(Math.pow(1.6,parseInt(espiData[38])))+1)).toString());
 var vExtremeTest=document.location.href.match(/extreme\.com/i);
 if (vExtremeTest==null) { var vSpeedMultiplier=1; } else { var vSpeedMultiplier=2; }
 var vMineProdTest=document.location.href.match(/uni2\.playstarfleet/i);
 if (vMineProdTest==null) { var vMineProdBase=1.1; } else { var vMineProdBase=1.14; }

 var vOreDroids=(((vOreMine-(vOreMine % 3))/3+1)*2)/100+1;
 var vCryDroids=(((vCryMine-(vCryMine % 3))/3+1)*2)/100+1;
 var vHydDroids=(((vHydMine-(vHydMine % 3))/3+1)*2)/100+1;

 var vOreProd=Math.floor(Math.floor(30*vOreMine*Math.pow(vMineProdBase,vOreMine))*vOreDroids*vSpeedMultiplier)+20*vSpeedMultiplier;
 var vCryProd=Math.floor(Math.floor(20*vCryMine*Math.pow(vMineProdBase,vCryMine)+10)*vCryDroids*vSpeedMultiplier);
 var vHydProd=Math.floor((12*vHydMine*Math.pow(vMineProdBase,vHydMine)*1.24*vHydDroids)*vSpeedMultiplier);
 var vOreProdStr=addCommas(vOreProd.toString());
 var vCryProdStr=addCommas(vCryProd.toString());
 var vHydProdStr=addCommas(vHydProd.toString());

 var vOreAmt=parseInt(espiData[6].replace(/,/g,''));
 var vCryAmt=parseInt(espiData[7].replace(/,/g,''));
 var vHydAmt=parseInt(espiData[8].replace(/,/g,''));

 var vOreTime=vOreAmt/vOreProd;
 var vCryTime=vCryAmt/vCryProd;

 var vOreHH=parseInt(vOreTime);
 var vCryHH=parseInt(vCryTime);
 var vOreHHStr=vOreHH.toString();
 var vCryHHStr=vCryHH.toString();

 var vOreMM=parseInt(60*(vOreTime-vOreHH));
 var vCryMM=parseInt(60*(vCryTime-vCryHH));
 var vOreMMStr=vOreMM.toString();
 var vCryMMStr=vCryMM.toString();
 if (vOreMMStr.length==1) { vOreMMStr='0'+vOreMMStr; }
 if (vCryMMStr.length==1) { vCryMMStr='0'+vCryMMStr; }
 
 var vOreSS=parseInt((vOreTime-vOreHH-vOreMM/60)*3600);
 var vCrySS=parseInt((vCryTime-vCryHH-vCryMM/60)*3600);
 var vOreSSStr=vOreSS.toString();
 var vCrySSStr=vCrySS.toString();
 if (vOreSSStr.length==1) { vOreSSStr='0'+vOreSSStr; }
 if (vCrySSStr.length==1) { vCrySSStr='0'+vCrySSStr; }
 
 var vOreTimeStr=vOreHHStr+':'+vOreMMStr+':'+vOreSSStr;
 var vCryTimeStr=vCryHHStr+':'+vCryMMStr+':'+vCrySSStr;

}catch(e){}
 if(espiData[36].length==0) {
  if(espiData[0]=='Planet'){
   var vOreData='(no mine data)';
   var vCryData='(no mine data)';
   var vHydData='(no mine data)';
  }
  else
  {
   var vOreData='';
   var vCryData='';
   var vHydData='';
  }
 }
 else
 {
  var vOreData='(~'+vOreProdStr+'/hr) ('+vOreCapacity+') (~'+vOreTimeStr+')';
  var vCryData='(~'+vCryProdStr+'/hr) ('+vCryCapacity+') (~'+vCryTimeStr+')';
  var vHydData='(~'+vHydProdStr+'/hr) ('+vHydCapacity+')';
 }

 var DSPAmount=GetDSPAmounts();
 var vDSPs=0;
 for (j=10;j<26;j++) {
  if(espiData[j].length>0 && parseInt(espiData[j].replace(/,/g,""))>0) { 
   var vShipCount=parseInt(espiData[j].replace(/,/g,""));
   vDSPs+=(vShipCount*DSPAmount[j]); } }
 var vDSP=addCommas((Math.ceil(vDSPs/100)/10).toString());

 var vTotal=parseInt(espiData[6].replace(/,/g,""))+parseInt(espiData[7].replace(/,/g,""))+parseInt(espiData[8].replace(/,/g,""));
 var vTotalPlunder=parseInt(vTotal/2);
 var vTotalToPlunder=addCommas(vTotalPlunder.toString());

 var vHermesNeeded=Math.ceil(vTotalPlunder/5);
 var vArtemisNeeded=Math.ceil(vTotalPlunder/50);
 var vAtlasNeeded=Math.ceil(vTotalPlunder/5000);
 var vApolloNeeded=Math.ceil(vTotalPlunder/100);
 var vCharonNeeded=Math.ceil(vTotalPlunder/100);
 var vHerculesNeeded=Math.ceil(vTotalPlunder/25000);
 var vDionysusNeeded=Math.ceil(vTotalPlunder/20000);
 var vPoseidonNeeded=Math.ceil(vTotalPlunder/800);
 var vGaiaNeeded=Math.ceil(vTotalPlunder/7500);
 var vAthenaNeeded=Math.ceil(vTotalPlunder/1500);
 var vAresNeeded=Math.ceil(vTotalPlunder/500);
 var vHadesNeeded=Math.ceil(vTotalPlunder/750);
 var vPrometheusNeeded=Math.ceil(vTotalPlunder/2000);
 var vZeusNeeded=Math.ceil(vTotalPlunder/1000000);
 var vHephaestusNeeded=Math.ceil(vTotalPlunder/1000000000);
 var vPlunderTitle='Probe:'+vHermesNeeded+' Arty:'+vArtemisNeeded+' Atlas:'+vAtlasNeeded+' Apollo:'+vApolloNeeded+' Charon:'+vCharonNeeded+String.fromCharCode(10);
 vPlunderTitle+='Herc:'+vHerculesNeeded+' Dio:'+vDionysusNeeded+' Posi:'+vPoseidonNeeded+' Gaia:'+vGaiaNeeded+' Athena:'+vAthenaNeeded+String.fromCharCode(10);
 vPlunderTitle+='Ares:'+vAresNeeded+' Hades:'+vHadesNeeded+' Prom:'+vPrometheusNeeded+' Zeus:'+vZeusNeeded+' Heph:'+vHephaestusNeeded;

 vText+='* ore: '+espiData[6]+' &nbsp;<span style="color: grey;">'+vOreData+'</span><br />';
 vText+='* crystal: '+espiData[7]+' &nbsp;<span style="color: grey;">'+vCryData+'</span><br />';
 vText+='* hydrogen: '+espiData[8]+' &nbsp;<span style="color: grey;">'+vHydData+'</span><br />';
 vText+='================================<br />';
 vText+='<span title="'+vPlunderTitle+'">'
 vText+='Total plunder: '+vTotalToPlunder+' ('+Math.ceil(vTotal/50000)+' herc / '+Math.ceil(vTotal/10000)+' atlas)<br />';
 vText+='</span>';
 vText+='Dios needed: '+vDios+' ('+vDSP+' DSP)<br />';
 if (espiData[9].length==0) {
  vText+='<br />* Player name not retrieved.<br />';
  vText+='* Ship data not retrieved.<br />';
 } 
 else {
  vText+='<br />'+espiData[9]+"'S SHIPS:<br />";
  if (espiData[10].length>0 && parseInt(espiData[10].replace(/,/g,""))>0) { vText+='* Hermes Class Probe: '+espiData[10]+'<br />'; }
  if (espiData[11].length>0 && parseInt(espiData[11].replace(/,/g,""))>0) { vText+='* Helios Class Solar Satellite: '+espiData[11]+'<br />'; }
  if (espiData[12].length>0 && parseInt(espiData[12].replace(/,/g,""))>0) { vText+='* Artemis Class Fighter: '+espiData[12]+'<br />'; }
  if (espiData[13].length>0 && parseInt(espiData[13].replace(/,/g,""))>0) { vText+='* Atlas Class Cargo: '+espiData[13]+'<br />'; }
  if (espiData[14].length>0 && parseInt(espiData[14].replace(/,/g,""))>0) { vText+='* Apollo Class Fighter: '+espiData[14]+'<br />'; }
  if (espiData[15].length>0 && parseInt(espiData[15].replace(/,/g,""))>0) { vText+='* Charon Class Transport: '+espiData[15]+'<br />'; }
  if (espiData[16].length>0 && parseInt(espiData[16].replace(/,/g,""))>0) { vText+='* Hercules Class Cargo: '+espiData[16]+'<br />'; }
  if (espiData[17].length>0 && parseInt(espiData[17].replace(/,/g,""))>0) { vText+='* Dionysus Class Recycler: '+espiData[17]+'<br />'; }
  if (espiData[18].length>0 && parseInt(espiData[18].replace(/,/g,""))>0) { vText+='* Poseidon Class Cruiser: '+espiData[18]+'<br />'; }
  if (espiData[19].length>0 && parseInt(espiData[19].replace(/,/g,""))>0) { vText+='* Gaia Class Colony Ship: '+espiData[19]+'<br />'; }
  if (espiData[20].length>0 && parseInt(espiData[20].replace(/,/g,""))>0) { vText+='* Athena Class Battleship: '+espiData[20]+'<br />'; }
  if (espiData[21].length>0 && parseInt(espiData[21].replace(/,/g,""))>0) { vText+='* Ares Class Bomber: '+espiData[21]+'<br />'; }
  if (espiData[22].length>0 && parseInt(espiData[22].replace(/,/g,""))>0) { vText+='* Hades Class Battleship: '+espiData[22]+'<br />'; }
  if (espiData[23].length>0 && parseInt(espiData[23].replace(/,/g,""))>0) { vText+='* Prometheus Class Destroyer: '+espiData[23]+'<br />'; }
  if (espiData[24].length>0 && parseInt(espiData[24].replace(/,/g,""))>0) { vText+='* Zeus Class: '+espiData[24]+'<br />'; }
  if (espiData[25].length>0 && parseInt(espiData[25].replace(/,/g,""))>0) { vText+='* Hephaestus Class Attack Platform: '+espiData[25]+'<br />'; }
 }
 
 vText+='<br />DEFENSES:<br />';
 if (espiData[53].length==0) { 
  vText+='* Defense data not retrieved.<br />'; }
 else {
  if (espiData[26].length>0 && parseInt(espiData[26].replace(/,/g,""))>0) { vText+='* Missile Battery: '+espiData[26]+'<br />'; }
  if (espiData[27].length>0 && parseInt(espiData[27].replace(/,/g,""))>0) { vText+='* Laser Cannon: '+espiData[27]+'<br />'; }
  if (espiData[28].length>0 && parseInt(espiData[28].replace(/,/g,""))>0) { vText+='* Pulse Cannon: '+espiData[28]+'<br />'; }
  if (espiData[29].length>0 && parseInt(espiData[29].replace(/,/g,""))>0) { vText+='* Particle Cannon: '+espiData[29]+'<br />'; }
  if (espiData[33].length>0 && parseInt(espiData[33].replace(/,/g,""))>0) { vText+='* Gauss Cannon: '+espiData[33]+'<br />'; }
  if (espiData[35].length>0 && parseInt(espiData[35].replace(/,/g,""))>0) { vText+='* Plasma Cannon: '+espiData[35]+'<br />'; }
  if (espiData[31].length>0 && parseInt(espiData[31].replace(/,/g,""))>0) { vText+='* Decoy: '+espiData[31]+'<br />'; }
  if (espiData[34].length>0 && parseInt(espiData[34].replace(/,/g,""))>0) { vText+='* Large Decoy: '+espiData[34]+'<br />'; }
  if (espiData[30].length>0 && parseInt(espiData[30].replace(/,/g,""))>0) { vText+='* Anti-Ballistic Missile: '+espiData[30]+'<br />'; }
  if (espiData[32].length>0 && parseInt(espiData[32].replace(/,/g,""))>0) { vText+='* Interplanetary Ballistic Missile: '+espiData[32]+'<br />'; }
 }
 vText+='<br />TECHS:';
 if (espiData[55].length==0) { 
  vText+='<br />* Tech data not retrieved.<br />'; }
 else {
  vText+=' (Espi '+espiData[49]+', AI '+espiData[48]+', Jet '+espiData[45]+', Pulse '+espiData[46]+', Warp '+espiData[47]+')<br />'; 
  vText+='* Armor Tech: '+espiData[42]+'<br />* Weapons Tech: '+espiData[43]+'<br />* Shield Tech: '+espiData[44]+'<br />';
 }
 
 if(espiData[0]=='Moon'){
  vText+='<br />MOON BUILDINGS:<br />';
  if (espiData[55].length==0) { 
   vText+='* Building data not retrieved.<br />'; }
  else {
   vText+='* Oracle: '+espiData[51]+'<br />';
   vText+='* Warp Gate: '+espiData[52]+'<br />';
   vText+='* Lunar Base: '+espiData[50]+'<br />';
  }
 }
 return vText;}
 

function RTrim( value ) { return value.replace(/((\s*\S+)*)\s*/, "$1"); }

function ReturnSystemLink(PlanetInBrackets,CurrentPlanet) {
 var PlanetMatch=PlanetInBrackets.match(/\[(\d{1,2}):(\d{1,3}):\d{1,2}m?\]/im);
 var PlanetLink=''; 
 if (PlanetMatch != null) {    PlanetLink='<a href="/galaxy/show?current_planet='+CurrentPlanet+'&amp;galaxy='+PlanetMatch[1]+'&amp;solar_system='+PlanetMatch[2]+'">'+PlanetInBrackets+'</a>';   }
 return PlanetLink;}
 
function GetDebrisAmounts() {
 var DebrisAmts=new Array();
 DebrisAmts[10]=300; //hermes
 DebrisAmts[11]=600; //helios
 DebrisAmts[12]=1200; //arty
 DebrisAmts[13]=1200; //atlas
 DebrisAmts[14]=2550; //apollo
 DebrisAmts[15]=2400; //charon
 DebrisAmts[16]=3600; //herc
 DebrisAmts[17]=4800; //dion
 DebrisAmts[18]=8100; //pos
 DebrisAmts[19]=9000; //gaia
 DebrisAmts[20]=18000; //athena
 DebrisAmts[21]=22500; //ares
 DebrisAmts[22]=21000; //hades
 DebrisAmts[23]=33000; //prom
 DebrisAmts[24]=2700000; //zeus
 DebrisAmts[25]=12000000; //heph
 return DebrisAmts;}
 
 function GetDSPAmounts() {
 var DSPAmts=new Array();
 DSPAmts[10]=1000; //hermes
 DSPAmts[11]=2500; //helios
 DSPAmts[12]=4000; //arty
 DSPAmts[13]=4000; //atlas
 DSPAmts[14]=8500; //apollo
 DSPAmts[15]=9000; //charon
 DSPAmts[16]=12000; //herc
 DSPAmts[17]=18000; //dion
 DSPAmts[18]=29000; //pos
 DSPAmts[19]=40000; //gaia
 DSPAmts[20]=60000; //athena
 DSPAmts[21]=90000; //ares
 DSPAmts[22]=85000; //hades
 DSPAmts[23]=125000; //prom
 DSPAmts[24]=10000000; //zeus
 DSPAmts[25]=50000000; //heph
 return DSPAmts;}



////
////Add Res


function vCheckInput() {
 var vOreNeeded=parseInt(document.getElementById('send_ore').value.match(/\d/g).join('')); 
 var vCryNeeded=parseInt(document.getElementById('send_crystal').value.match(/\d/g).join('')); 
 var vHydNeeded=parseInt(document.getElementById('send_hydrogen').value.match(/\d/g).join(''));
 var vFuelNeeded=0;
 if (document.getElementById('task_consumption').innerHTML.match(/\d/g)!=null) {    vFuelNeeded=parseInt(document.getElementById('task_consumption').innerHTML.match(/\d/g).join('')); }
 var vTotalNeeded=vOreNeeded+vCryNeeded+vHydNeeded+vFuelNeeded;
 var vHermesNeeded=Math.ceil(vTotalNeeded/5);
 var vArtemisNeeded=Math.ceil(vTotalNeeded/50);
 var vAtlasNeeded=Math.ceil(vTotalNeeded/5000);
 var vApolloNeeded=Math.ceil(vTotalNeeded/100);
 var vCharonNeeded=Math.ceil(vTotalNeeded/100);
 var vHerculesNeeded=Math.ceil(vTotalNeeded/25000);
 var vDionysusNeeded=Math.ceil(vTotalNeeded/20000);
 var vPoseidonNeeded=Math.ceil(vTotalNeeded/800);
 var vGaiaNeeded=Math.ceil(vTotalNeeded/7500);
 var vAthenaNeeded=Math.ceil(vTotalNeeded/1500);
 var vAresNeeded=Math.ceil(vTotalNeeded/500);
 var vHadesNeeded=Math.ceil(vTotalNeeded/750);
 var vPrometheusNeeded=Math.ceil(vTotalNeeded/2000);
 var vZeusNeeded=Math.ceil(vTotalNeeded/1000000);
 var vHephaestusNeeded=Math.ceil(vTotalNeeded/1000000000);
 document.getElementById('neededAtlas').innerHTML=vAtlasNeeded ;
 document.getElementById('neededHercs').innerHTML=vHerculesNeeded;
 var vShipsNeeded='Total res:'+vTotalNeeded+String.fromCharCode(10);
 vShipsNeeded+='Probe:'+vHermesNeeded+' Arty:'+vArtemisNeeded+' Atlas:'+vAtlasNeeded+' Apollo:'+vApolloNeeded+' Charon:'+vCharonNeeded+String.fromCharCode(10);
 vShipsNeeded+='Herc:'+vHerculesNeeded+' Dio:'+vDionysusNeeded+' Posi:'+vPoseidonNeeded+' Gaia:'+vGaiaNeeded+' Athena:'+vAthenaNeeded+String.fromCharCode(10);
 vShipsNeeded+='Ares:'+vAresNeeded+' Hades:'+vHadesNeeded+' Prom:'+vPrometheusNeeded+' Zeus:'+vZeusNeeded+' Heph:'+vHephaestusNeeded;
 document.getElementById('cargoCalculator').setAttribute('title',vShipsNeeded);}



function GetClassItem(vSource,vTagname,vClass) {
 var vElements=vSource.getElementsByTagName(vTagname);
 var vReturn=null;
 for (cnt=0;cnt<vElements.length;cnt++) {
  if (vElements[cnt].getAttribute('class')==vClass) { vReturn=vElements[cnt]; } }
 return vReturn;}


function addRes()
{
try{
//calculate total resources
var tbl = document.getElementById('user_stats').getElementsByTagName('table')[0];
var vOre = parseInt(tbl.getElementsByTagName('tr')[0].getElementsByTagName('td')[1].innerHTML.replace(',','').replace(',','').replace(',',''));
var vCrys = parseInt(tbl.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML.replace(',','').replace(',','').replace(',',''));
var vHydro = parseInt(tbl.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML.replace(',','').replace(',','').replace(',',''));
var vTotal = vOre+vCrys+vHydro;
//Add commas to total for nicer looking formatting
var vTotalWithCommas = vTotal.toString();
var vRegex = /(\d+)(\d{3})/;
while (vRegex.test(vTotalWithCommas)) {vTotalWithCommas = vTotalWithCommas.replace(vRegex, '$1' + ',' + '$2');}

//get hook to credit counter to add resource and cargo totals in its place
var creditsNode=tbl.getElementsByTagName('tr')[5];

//add new entry to table for Total Resources
var newTR = document.createElement('tr');
newTR.setAttribute('class','credits');
var newTD = document.createElement('td');
newTD.setAttribute('class','resource');
newTD.appendChild(document.createTextNode('Total'));
newTR.appendChild(newTD);
var newTD = document.createElement('td');
newTD.setAttribute('class','amount');
newTD.appendChild(document.createTextNode(vTotalWithCommas));
newTR.appendChild(newTD);
creditsNode.parentNode.insertBefore(newTR,creditsNode);

//add new entry to table for herc and atlas counts for transport
var newTR = document.createElement('tr');
newTR.setAttribute('class','credits');
var newTD = document.createElement('td');
newTD.setAttribute('class','resource');
newTD.appendChild(document.createTextNode('HERC / ATL'));
newTR.appendChild(newTD);
var newTD = document.createElement('td');
newTD.setAttribute('class','amount');
var vHercCount=Math.ceil(vTotal/25000);
var vAtlasCount=Math.ceil(vTotal/5000);
newTD.appendChild(document.createTextNode(vHercCount+' / '+vAtlasCount));
newTR.appendChild(newTD);
creditsNode.parentNode.insertBefore(newTR,creditsNode);

//remove credit count and merchant link
document.getElementById('buy_merchant').parentNode.removeChild(document.getElementById('buy_merchant'));
creditsNode.parentNode.removeChild(creditsNode);

//add herc and atlas count after ship counts
if (document.location.href.match(/\.com\/fleet/i)!=null) { 
 var vTDs=document.getElementsByTagName('td');
 for (i=0;i<vTDs.length;i++) {
  if (vTDs[i].getAttribute('class')=='ship') {
   var vSpans=vTDs[i].getElementsByTagName('span');
   for (j=0;j<vSpans.length;j++) {
    if (vSpans[j].getAttribute('class')=='name') {
     if (vTrim(vSpans[j].innerHTML)=='Atlas Class Cargo') {
      for (k=0;k<vSpans.length;k++) {
       if (vSpans[k].getAttribute('class')=='quantity') {;
        var vQtyId=vSpans[k].getElementsByTagName('span')[0].getAttribute('id');
        vQtyId=vQtyId.substr(0,(vQtyId.length-4));
        vSpans[k].innerHTML+=" <span id='atlasQty' style='cursor: pointer;' onclick='document.getElementById(&quot;"+vQtyId+"&quot;).value=&quot;"+vAtlasCount+"&quot;; return false;'>("+vAtlasCount+")</span>"; } } }
     if (vTrim(vSpans[j].innerHTML)=='Hercules Class Cargo') {
      for (k=0;k<vSpans.length;k++) {
       if (vSpans[k].getAttribute('class')=='quantity') {
        var vQtyId=vSpans[k].getElementsByTagName('span')[0].getAttribute('id');
        vQtyId=vQtyId.substr(0,(vQtyId.length-4));
        vSpans[k].innerHTML+=" <span id='hercQty' style='cursor: pointer;' onclick='document.getElementById(&quot;"+vQtyId+"&quot;).value=&quot;"+vHercCount+"&quot;; return false;'>("+vHercCount+")</span>"; } } } } } } } }

//Add the cargo calculator to determine how many cargo ships are needed to send entered resources
if (document.location.href.match(/\.com\/fleet/i)!=null) {
 var vForm=document.getElementById('assign_fleet_form');
 var vFleetSelector=GetClassItem(vForm,'div','select_fleet');
 var vCargoCalculator='';
 vCargoCalculator+="<div class='normal summary' id='cargoCalculator'>";
 vCargoCalculator+="Cargos needed for entered res:<br />";
 vCargoCalculator+="Atlas: <span class='consumption' id='neededAtlas'>0</span><br />";
 vCargoCalculator+="Hercules: <span class='consumption' id='neededHercs'>0</span><br />";
 vCargoCalculator+="<a href='javascript:void(0);' id='vRecalculate'>Force recalculate</a>";
 vCargoCalculator+="</div>";
 vFleetSelector.innerHTML+=vCargoCalculator;
 document.getElementById('send_ore').addEventListener("change",vCheckInput,true);
 document.getElementById('send_crystal').addEventListener("change",vCheckInput,true);
 document.getElementById('send_hydrogen').addEventListener("change",vCheckInput,true);

 document.getElementById('vRecalculate').addEventListener("click",vCheckInput,true);
 vFleetSelector.addEventListener("click",vCheckInput,true);}
}
catch(e){}
}






///
///Format Battle Report




function formatBattleReport()
{
var vBattleLog = GetClassItem(document.getElementById('content'), 'div', 'battle_log');
var vMainParticipants = GetClassItem(vBattleLog, 'div', 'participants');
var vAttackerList = GetClassItem(vMainParticipants, 'div', 'attacker');

var vAttackers = new Array();

var vElements = vAttackerList.getElementsByTagName('div');

for (var i = 0; i < vElements.length; i++) {
 if (typeof vElements[i] == "object" && vElements[i].getAttribute('class') == 'name') {
  addPlayer(vAttackers, vElements[i].innerHTML);
 }
}

var vDefenderList = GetClassItem(vMainParticipants, 'div', 'defender');

var vDefenders = new Array();

var vElements = vDefenderList.getElementsByTagName('div');

for (var i = 0; i < vElements.length; i++) {
 if (typeof vElements[i] == "object" && vElements[i].getAttribute('class') == 'name') {
  addPlayer(vDefenders, vElements[i].innerHTML);
 }
}

var vMainAttacker = vAttackers[0]['name'];
var vMainDefender = vDefenders[0]['name'];

var vLocation = GetClassItem(GetClassItem(vMainParticipants, 'div', 'defender'), 'div', 'stats');

var vFireFox = false;

if (vLocation.innerText == null) { vFireFox = true; }

if (vFireFox == true) { 
 vLocation = ReturnSystemLink(vTrim(vLocation.textContent.replace(/Defender/, '')));
} else {
 vLocation = ReturnSystemLink(vTrim(vLocation.innerText.replace(/Defender/, '')));
}

var vOutcome = GetClassItem(vBattleLog, 'div', 'outcome');

if (vFireFox == true) {
 vOutcome = vOutcome.textContent;
} else {
 vOutcome = vOutcome.innerText;
}

vOutcome = vTrim(vOutcome.replace(/\s\s/g, ' ').replace(/\s\s/g, ' ').replace(/\s\s/g, ' ').replace(/\s\s/g, ' ').replace(/\s\s/g, ' ').replace(/\s\s/g, ' ')).replace(/\.\s/g, '.<br />');

var vDivs = vBattleLog.getElementsByTagName('div');
var RountCount = ''

for (divCount = 0; divCount < vDivs.length; divCount++) {
 var div = vDivs[divCount];
 if (div.getAttribute('class') == 'round_title') {
  if (vTrim(div.innerHTML) == 'Round 1') { var vRound1 = div.parentNode; }
  if (vTrim(div.innerHTML) == 'Round 1') { RoundCount = '1'; }
  if (vTrim(div.innerHTML) == 'Round 2') { RoundCount = '2'; }
  if (vTrim(div.innerHTML) == 'Round 3') { RoundCount = '3'; }
  if (vTrim(div.innerHTML) == 'Round 4') { RoundCount = '4'; }
  if (vTrim(div.innerHTML) == 'Round 5') { RoundCount = '5'; }
  if (vTrim(div.innerHTML) == 'Round 6') { RoundCount = '6'; }
  if (vTrim(div.innerHTML) == 'Final State') { var vFinalRound = div.parentNode; }
 }
}

var currentPlayer = null;

if (vRound1 != null) {
 var vDivs = vRound1.getElementsByTagName('div');
 for (divCount = 0; divCount < vDivs.length; divCount++) {
  var div = vDivs[divCount];
  if (typeof div == "object" && div.getAttribute('class') == 'name') {
   var vData = vTrim(div.innerHTML).split(': ');
   if (vData[0] == "ATTACKER") {
    currentPlayer = findAttackingPlayer(vData[1],vAttackers);
    if(currentPlayer == null) { currentPlayer = addPlayer(vAttackers, vData[1]); }
   } else {
    currentPlayer = findDefendingPlayer(vData[1],vDefenders);
    if(currentPlayer == null) { currentPlayer = addPlayer(vDefenders, vData[1]); }
   }
   currentPlayer['fleetssent']++;
  }

  if (typeof div == "object" && div.getAttribute('class') == 'attacker ships') {
   var vShips = new Array();
   GetClassArray(div, 'div', 'ship', vShips);
   for (var shipCount = 0; shipCount < vShips.length; shipCount++) {
    var ship = vShips[shipCount];
    if (ship.getAttribute('class') == 'ship') {
     var vShip = GetShipIndex(ship.getElementsByTagName('img')[0].getAttribute('alt'));
     var vQty = parseInt(vTrim(GetClassItem(ship, 'div', 'number').innerHTML).substr(1).replace(/,/g, ''));
     currentPlayer['initialships'][vShip] += vQty;    }   }  }

  if (typeof div == "object" && div.getAttribute('class') == 'attacker defenses') {
   var vShips = new Array();
   GetClassArray(div, 'div', 'ship', vShips);
   for (var shipCount = 0; shipCount < vShips.length; shipCount++) {
    var ship = vShips[shipCount];
    if (ship.getAttribute('class') == 'ship') {
     var vShip = GetShipIndex(ship.getElementsByTagName('img')[0].getAttribute('alt'));
     var vQty = parseInt(vTrim(GetClassItem(ship, 'div', 'number').innerHTML).substr(1).replace(/,/g, ''));
     currentPlayer['initialdefenses'][vShip] += vQty;    }   }  }

  if (vDivs[divCount].getAttribute('class') == 'synopsis') { break; } }}

if (vFinalRound != null) {
 var vDivs = vFinalRound.getElementsByTagName('div');
 for (divCount = 0; divCount < vDivs.length; divCount++) {
  var div = vDivs[divCount];
  if (typeof div == "object" && div.getAttribute('class') == 'name') {
   var vData = vTrim(div.innerHTML).split(': ');

   if (vData[0] == "ATTACKER") {
    currentPlayer = findAttackingPlayer(vData[1],vAttackers);
   } else {
    currentPlayer = findDefendingPlayer(vData[1],vDefenders);
   }
  }

  if (typeof div == "object" && div.getAttribute('class') == 'destroyed') { }

  if (typeof div == "object" && div.getAttribute('class') == 'attacker ships') {
   var vShips = new Array();
   GetClassArray(div, 'div', 'ship', vShips);
   for (var shipCount = 0; shipCount < vShips.length; shipCount++) {
    var ship = vShips[shipCount];
    if (ship.getAttribute('class') == 'ship') {
     var vShip = GetShipIndex(ship.getElementsByTagName('img')[0].getAttribute('alt'));
     var vQty = parseInt(vTrim(GetClassItem(ship, 'div', 'number').innerHTML).substr(1).replace(/,/g, ''));
     currentPlayer['finalships'][vShip] += vQty;    }   }  }

  if (typeof div == "object" && div.getAttribute('class') == 'attacker defenses') {
   var vShips = new Array();
   GetClassArray(div, 'div', 'ship', vShips);
   for (var shipCount = 0; shipCount < vShips.length; shipCount++) {
    var ship = vShips[shipCount];
    if (ship.getAttribute('class') == 'ship') {
     var vShip = GetShipIndex(ship.getElementsByTagName('img')[0].getAttribute('alt'));
     var vQty = parseInt(vTrim(GetClassItem(ship, 'div', 'number').innerHTML).substr(1).replace(/,/g, ''));
     currentPlayer['finaldefenses'][vShip] += vQty;    }   }  }

  if (vDivs[divCount].getAttribute('class') == 'synopsis') { break; }
 }
}

var vNewReport = vMainAttacker + ' led an attack on ' + vMainDefender + ' at ' + vLocation + '.<br />';
vNewReport += 'The following emerged from battle after ' + RoundCount + ' Round(s)';
vNewReport += '<br />';
var vTotalAttackersShipsRSPLost = 0;
for (i = 0; i < vAttackers.length; i++) {
 vSurvived = false;
 for (var z = 0; z < 16; z++) {
  if (vAttackers[i]['finalships'] != null && vAttackers[i]['finalships'][z] != null && parseInt(vAttackers[i]['finalships'][z]) > 0) {
   vSurvived = true;
   break;  } }
 vAttackers[i]['script'] += '<br />*****Attacker: ' + vAttackers[i]['name'] + '*****<br />';
 var vDmg = new Array(0, 0, 0);
 for (j = 0; j < 16; j++) {
  initialshipCount = (vAttackers[i]['initialships'] != null && vAttackers[i]['initialships'][j] != null) ? vAttackers[i]['initialships'][j] : 0;
  finalshipCount = (vAttackers[i]['finalships'] != null && vAttackers[i]['finalships'][j] != null) ? vAttackers[i]['finalships'][j] : 0;
  if (initialshipCount > 0) {
   var vShipLost = '';
   if (vSurvived == false) {
    vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
    var vLost = initialshipCount;
    vDmg[0] += (OreCost(j) * vLost);
    vDmg[1] += (CrysCost(j) * vLost);
    vDmg[2] += (HydroCost(j) * vLost);
   } else {
    if (finalshipCount > 0) {
     if (initialshipCount != finalshipCount) {
      var vLost = initialshipCount - finalshipCount;
      vDmg[0] += (OreCost(j) * vLost);
      vDmg[1] += (CrysCost(j) * vLost);
      vDmg[2] += (HydroCost(j) * vLost);
      vShipLost = finalshipCount + '&nbsp;&nbsp;(Lost: ' + vLost + ')';
     } else {
      vShipLost = finalshipCount;
     }
    } else {
     vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
     var vLost = initialshipCount;
     vDmg[0] += (OreCost(j) * vLost);
     vDmg[1] += (CrysCost(j) * vLost);
     vDmg[2] += (HydroCost(j) * vLost);
    }
   }
   vAttackers[i]['script'] += GetShipName(j) + ': ' + vShipLost + '<br />';
  }
 }
 vTotalAttackersShipsRSPLost += (vDmg[0] + vDmg[1] + vDmg[2]);
 vAttackers[i]['script'] += '** Resources lost: ' + addCommasE(vDmg[0].toString()) + ' ore, ' + addCommasE(vDmg[1].toString()) + ' crystal, and ' + addCommasE(vDmg[2].toString()) + ' hydrogen.<br />';
}

var vTotalDefendersShipsRSPLost = 0;
for (i = 0; i < vDefenders.length; i++) {
 vSurvived = false;
 for (var z = 0; z < 26; z++) {
  if (vDefenders[i]['finalships'] != null && vDefenders[i]['finalships'][z] != null && parseInt(vDefenders[i]['finalships'][z]) > 0) {
   vSurvived = true;
  }
 }
 vDefenders[i]['script'] += '<br />*****Defender: ' + vDefenders[i]['name'] + '*****<br />';
 var vDmg = new Array(0, 0, 0);
 var vShipDmg = new Array(0, 0, 0);
 for (j = 0; j < 16; j++) {
  initialshipCount = (vDefenders[i]['initialships'] != null && vDefenders[i]['initialships'][j] != null) ? vDefenders[i]['initialships'][j] : 0;
  finalshipCount = (vDefenders[i]['finalships'] != null && vDefenders[i]['finalships'][j] != null) ? vDefenders[i]['finalships'][j] : 0;
  if (initialshipCount > 0) {
   var vShipLost = '';
   if (vSurvived == false) {
    vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
    var vLost = initialshipCount;
    vShipDmg[0] += (OreCost(j) * vLost);
    vShipDmg[1] += (CrysCost(j) * vLost);
    vShipDmg[2] += (HydroCost(j) * vLost);
   } else {
    if (finalshipCount > 0) {
     if (initialshipCount != finalshipCount) {
      var vLost = initialshipCount - finalshipCount;
      vShipDmg[0] += (OreCost(j) * vLost);
      vShipDmg[1] += (CrysCost(j) * vLost);
      vShipDmg[2] += (HydroCost(j) * vLost);
      vShipLost = finalshipCount + '&nbsp;&nbsp;(Lost: ' + vLost + ')';
     } else {
      vShipLost = finalshipCount;
     }
    } else {
     vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
     var vLost = initialshipCount;
     vShipDmg[0] += (OreCost(j) * vLost);
     vShipDmg[1] += (CrysCost(j) * vLost);
     vShipDmg[2] += (HydroCost(j) * vLost);
    }
   }
   vDefenders[i]['script'] += GetShipName(j) + ': ' + vShipLost + '<br />';
  }
 }
 vTotalDefendersShipsRSPLost += (vShipDmg[0] + vShipDmg[1] + vShipDmg[2]);

 vDmg[0] = vShipDmg[0];
 vDmg[1] = vShipDmg[1];
 vDmg[2] = vShipDmg[2];
 for (j = 16; j <= 25; j++) {
  initialshipCount = (vDefenders[i]['initialdefenses'] != null && vDefenders[i]['initialdefenses'][j] != null) ? vDefenders[i]['initialdefenses'][j] : '0';
  finalshipCount = (vDefenders[i]['finaldefenses'] != null && vDefenders[i]['finaldefenses'][j] != null) ? vDefenders[i]['finaldefenses'][j] : '0';
  if (initialshipCount > 0) {
   var vShipLost = '';
   if (vSurvived == false) {
    vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
    var vLost = initialshipCount;
    vDmg[0] += (OreCost(j) * vLost);
    vDmg[1] += (CrysCost(j) * vLost);
    vDmg[2] += (HydroCost(j) * vLost);
   } else {
    if (finalshipCount > 0) {
     if (initialshipCount != finalshipCount) {
      var vLost = initialshipCount - finalshipCount;
      vDmg[0] += (OreCost(j) * vLost);
      vDmg[1] += (CrysCost(j) * vLost);
      vDmg[2] += (HydroCost(j) * vLost);
      vShipLost = finalshipCount + '&nbsp;&nbsp;(Lost: ' + vLost + ')';
     } else { vShipLost = finalshipCount; } 
    } else {
     vShipLost = '0&nbsp;&nbsp;(Lost: ' + initialshipCount + ')';
     var vLost = initialshipCount;
     vDmg[0] += (OreCost(j) * vLost);
     vDmg[1] += (CrysCost(j) * vLost);
     vDmg[2] += (HydroCost(j) * vLost);
    } 
   }
   vDefenders[i]['script'] += GetShipName(j) + ': ' + vShipLost + '<br />';
  } 
 }

 vDefenders[i]['script'] += '** Ship Resources lost: ' + addCommasE(vShipDmg[0].toString()) + ' ore, ' + addCommasE(vShipDmg[1].toString()) + ' crystal, and ' + addCommasE(vShipDmg[2].toString()) + ' hydrogen.<br />';
 vDefenders[i]['script'] += '** Total Resources lost: ' + addCommasE(vDmg[0].toString()) + ' ore, ' + addCommasE(vDmg[1].toString()) + ' crystal, and ' + addCommasE(vDmg[2].toString()) + ' hydrogen.<br />';
}

var vAttackerDSPGained = Math.floor(Math.floor(vTotalDefendersShipsRSPLost / 1000) / vAttackers.length);
for (i = 0; i < vAttackers.length; i++) { vNewReport += vAttackers[i]['script'] + '** Destroyed Ship Points Gained: ' + addCommasE(Math.floor(vAttackerDSPGained).toString()) + '<br />'; }
var vDefenderDSPGained = Math.floor(Math.floor(vTotalAttackersShipsRSPLost / 1000) / vDefenders.length);
for (i = 0; i < vDefenders.length; i++) { vNewReport += vDefenders[i]['script'] + '** Destroyed Ship Points Gained: ' + addCommasE(Math.floor(vDefenderDSPGained).toString()) + '<br />'; }

vNewReport += '<br />' + vOutcome;
AddStickyNotice(vNewReport);
}




function calculateArrayedNumberOf( vSource, vIndex ) {
 var vReturn = 0;
 for(var i = 0; i < vSource.length; i++) {
  vReturn += vSource[i][vIndex];
 }
 return vReturn;}




function addPlayer( vArray, vName ) {
 var nextindex = vArray.length;
 vArray[nextindex] = new Array();
 vArray[nextindex]['name'] = vTrim(vName);
 vArray[nextindex]['initialdefenses'] = new Array(26);
 vArray[nextindex]['initialships'] = new Array(26);
 vArray[nextindex]['finalships'] = new Array(26);
 vArray[nextindex]['finaldefenses'] = new Array(26);
 vArray[nextindex]['script'] = '';
 vArray[nextindex]['fleetssent'] = 0;
 for (var k = 0; k < 26; k++) {
  vArray[nextindex]['initialdefenses'][k] = 0;
  vArray[nextindex]['initialships'][k] = 0;
  vArray[nextindex]['finalships'][k] = 0;
  vArray[nextindex]['finaldefenses'][k] = 0;
 }
 return vArray[nextindex];
}



function GetShipIndex(ShipName) {
switch (ShipName) {
case 'Icon_hermes_class_probe': return 0; break;
case 'Icon_helios_class_solar_satellite': return 1; break;
case 'Icon_artemis_class_fighter': return 2; break;
case 'Icon_atlas_class_cargo': return 3; break;
case 'Icon_apollo_class_fighter': return 4; break;
case 'Icon_charon_class_transport': return 5; break;
case 'Icon_hercules_class_cargo': return 6; break;
case 'Icon_dionysus_class_recycler': return 7; break;
case 'Icon_poseidon_class_cruiser': return 8; break;
case 'Icon_gaia_class_colony_ship': return 9; break;
case 'Icon_athena_class_battleship': return 10; break;
case 'Icon_ares_class_bomber': return 11; break;
case 'Icon_hades_class_battleship': return 12; break;
case 'Icon_prometheus_class_destroyer': return 13; break;
case 'Icon_zeus_class': return 14; break;
case 'Icon_hephaestus_class_attack_platform': return 15; break;
case 'Icon_missile_battery': return 16; break;
case 'Icon_laser_cannon': return 17; break;
case 'Icon_pulse_cannon': return 18; break;
case 'Icon_particle_cannon': return 19; break;
case 'Icon_anti-Ballistic_missile': return 20; break;
case 'Icon_decoy': return 21; break;
case 'Icon_interplanetary_ballistic_missile': return 22; break;
case 'Icon_gauss_cannon': return 23; break;
case 'Icon_large_decoy': return 24; break;
case 'Icon_plasma_cannon': return 25; break;
}
}


function GetShipName(ShipIndex) {
switch (ShipIndex) {
case 0: return 'Hermes '; break;
case 1: return 'Helios '; break;
case 2: return 'Artemis '; break;
case 3: return 'Atlas '; break;
case 4: return 'Apollo '; break;
case 5: return 'Charon '; break;
case 6: return 'Hercules '; break;
case 7: return 'Dionysus '; break;
case 8: return 'Poseidon '; break;
case 9: return 'Gaia '; break;
case 10: return 'Athena '; break;
case 11: return 'Ares '; break;
case 12: return 'Hades '; break;
case 13: return 'Prometheus '; break;
case 14: return 'Zeus '; break;
case 15: return 'Hephaestus '; break;
case 16: return 'Missile '; break;
case 17: return 'Laser '; break;
case 18: return 'Pulse '; break;
case 19: return 'Particle '; break;
case 20: return 'ABM '; break;
case 21: return 'Decoy '; break;
case 22: return 'IPBM '; break;
case 23: return 'Gauss '; break;
case 24: return 'Large decoy'; break;
case 25: return 'Plasma '; break;
}
}



function ReturnSystemLink(PlanetInBrackets) {
var PlanetMatch = PlanetInBrackets.match(/\[(\d{1,2}):(\d{1,3}):\d{1,2}m?\]/im);
var PlanetLink = '';
var currPlanet = '';
var vURLTest = document.location.href.match(/_planet=(\d+)/i);
if (vURLTest != null) { currPlanet = vURLTest[1]; }
if (PlanetMatch != null) { PlanetLink = '<a href="/galaxy/show?current_planet=' + currPlanet + '&amp;galaxy=' + PlanetMatch[1] + '&amp;solar_system=' + PlanetMatch[2] + '">' + PlanetInBrackets + '</a>'; }
return PlanetLink;
}


function GetTableItem(vTable, vPrevious) {
var vReturn = null;
var vElements = vTable.getElementsByTagName('tr');
if (vPrevious == null) {
vReturn = vElements[0];
}
else {
var i = 0;

for (i = 0; i < vElements.length; i++) {
if (vElements[i] == vPrevious) {
i++;
break;
}
}

if (i < vElements.length)
vReturn = vElements[i];
}
return vReturn;
}



function GetClassItem(vSource, vTagname, vClass) {
var vReturn = null;
var vElements = vSource.getElementsByTagName(vTagname);
for (var i = 0; i < vElements.length; i++) {
if (typeof vElements[i] == "object" && vElements[i].getAttribute('class') == vClass) {
vReturn = vElements[i];
}
}
return vReturn;
}





function GetClassArray(vSource, vTagname, vClass, vReturn) {
var vElements = vSource.getElementsByTagName(vTagname);
var j = 0;
for (var i = 0; i < vElements.length; i++) {
if (typeof vElements[i] == "object" && vElements[i].getAttribute('class') == vClass) {
vReturn[j] = vElements[i];
j++;
}
}
}


function findAttackingPlayer(vName,vAttackers) {
for (var i = 0; i < vAttackers.length; i++) {
if (vName == vAttackers[i]['name']) {
return vAttackers[i];
}
}
return null;
}



function findDefendingPlayer(vName,vDefenders) {
for (var i = 0; i < vDefenders.length; i++) {
if (vName == vDefenders[i]['name']) {
return vDefenders[i];
}
}
return null;
}



function OreCost(ShipIndex) {
switch (ShipIndex) {
case 0: return 0; break; //hermes
case 1: return 0; break; //helios
case 2: return 3000; break; //arty
case 3: return 2000; break; //atlas
case 4: return 6000; break; //apollo
case 5: return 4000; break; //charon
case 6: return 6000; break; //herc
case 7: return 10000; break; //dion
case 8: return 20000; break; //pos
case 9: return 10000; break; //gaia
case 10: return 45000; break; //athena
case 11: return 50000; break; //ares
case 12: return 30000; break; //hades
case 13: return 60000; break; //prom
case 14: return 5000000; break; //zeus
case 15: return 20000000; break; //heph
case 16: return 2000; break; //missile batt
case 17: return 1500; break; //laser
case 18: return 6000; break; //pulse
case 19: return 2000; break; //particle
case 20: return 8000; break; //ABM
case 21: return 10000; break; //decoy
case 22: return 12500; break; //IPBM
case 23: return 20000; break; //gauss
case 24: return 50000; break; //large decoy
case 25: return 50000; break; //plasma
} 
}

 
function CrysCost(ShipIndex) {
switch (ShipIndex) {
case 0: return 1000; break; //hermes
case 1: return 2000; break; //helios
case 2: return 1000; break; //arty
case 3: return 2000; break; //atlas
case 4: return 2500; break; //apollo
case 5: return 4000; break; //charon
case 6: return 6000; break; //herc
case 7: return 6000; break; //dion
case 8: return 7000; break; //pos
case 9: return 20000; break; //gaia
case 10: return 15000; break; //athena
case 11: return 25000; break; //ares
case 12: return 40000; break; //hades
case 13: return 50000; break; //prom
case 14: return 4000000; break; //zeus
case 15: return 20000000; break; //heph
case 16: return 0; break; //missile batt
case 17: return 500; break; //laser
case 18: return 2000; break; //pulse
case 19: return 6000; break; //particle
case 20: return 0; break; //ABM
case 21: return 10000; break; //decoy
case 22: return 2500; break; //IPBM
case 23: return 15000; break; //gauss
case 24: return 50000; break; //large decoy
case 25: return 50000; break; //plasma
} 
}


 
function HydroCost(ShipIndex) {
switch (ShipIndex) {
case 0: return 0; break; //hermes
case 1: return 500; break; //helios
case 2: return 0; break; //arty
case 3: return 0; break; //atlas
case 4: return 0; break; //apollo
case 5: return 1000; break; //charon
case 6: return 0; break; //herc
case 7: return 2000; break; //dion
case 8: return 2000; break; //pos
case 9: return 10000; break; //gaia
case 10: return 0; break; //athena
case 11: return 15000; break; //ares
case 12: return 15000; break; //hades
case 13: return 15000; break; //prom
case 14: return 1000000; break; //zeus
case 15: return 10000000; break; //heph
case 16: return 0; break; //missile batt
case 17: return 0; break; //laser
case 18: return 0; break; //pulse
case 19: return 0; break; //particle
case 20: return 2000; break; //ABM
case 21: return 0; break; //decoy
case 22: return 10000; break; //IPBM
case 23: return 2000; break; //gauss
case 24: return 0; break; //large decoy
case 25: return 30000; break; //plasma
} 
}

function addCommasE(vNumber) {
while (/(\d+)(\d{3})/.test(vNumber)) { vNumber = vNumber.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2'); }
return vNumber;
}


function lightUpHephs()
{
var planetTable=document.getElementById('planets');
var vTRs=planetTable.getElementsByTagName('tr');
for (i=1;i<vTRs.length;i++) {
 var vName=GetClassItem(vTRs[i],'td','name');
 if (vName!=null) {
  if (vTrim(vName.innerHTML)=='Unavailable') {
   var vPlayer=GetClassItem(vTRs[i],'td','player');
   if (vTrim(vPlayer.innerHTML).length==0) { 
    vName.style.backgroundImage='url(/images/starfleet/layout/transparent_green_bg.png)';
    vPlayer.style.backgroundImage='url(/images/starfleet/layout/transparent_green_bg.png)';
    GetClassItem(vTRs[i],'td','actions').style.backgroundImage='url(/images/starfleet/layout/transparent_green_bg.png)'; }}}}
}











//////////////Free Floating Code///////////////////////
//////////////Free Floating Code///////////////////////
//////////////Free Floating Code///////////////////////
//////////////Free Floating Code///////////////////////
//////////////Free Floating Code///////////////////////


var addFlashMessagePass = addFlashMessage;
var frsPass = frs;
var redAlertPass = redAlert;
var redAlertClassFinderPass = redAlertClassFinder;
var initializeLocalStoragePass = initializeLocalStorage;
var deleteLocalStoragePass = deleteLocalStorage;
var redAlertPressPass = redAlertPress;
var redAlertGoPass = redAlertGo;
var counterIncDePass = counterIncDe;
var addCommasPass= addCommas;
var toClockPass= toClock;
var padZeroesPass = padZeroes;
var redAlertIntervalPass = redAlertInterval;
var onClickAdderPass = onClickAdder;
var ParseEspionageReportsPass = ParseEspionageReports;
var ParseEspiReportPass = ParseEspiReport;
var ParseEspiFieldPass = ParseEspiField;
var FormatEspiMessagePass = FormatEspiMessage;
var RTrimPass = RTrim;
var ReturnSystemLinkPass = ReturnSystemLink;
var GetDebrisAmountsPass = GetDebrisAmounts;
var GetDSPAmountsPass = GetDSPAmounts;
var vCheckInputPass = vCheckInput;
var GetClassItemPass = GetClassItem;
var formatBattleReportPass = formatBattleReport;
var GetShipIndexPass = GetShipIndex;
var GetShipNamePass = GetShipName;
var OreCostPass = OreCost;
var CrysCostPass = CrysCost;
var HydroCostPass = HydroCost;
var vTrimPass = vTrim;
var clearPadPass = clearPad;
var frsUpdateDistanceAndTimePass = frsUpdateDistanceAndTime;
var trimCoordsPass = trimCoords;
var updateShipSpeedsFromTechsPass = updateShipSpeedsFromTechs;
var frsStartPass = frsStart;
var frsGUISetUpPass = frsGUISetUp;
var recursiveAttributeLabelerPass = recursiveAttributeLabeler;
var frsPass = frs;
var startupOptionsPass = startupOptions;
var compareCoordsPass = compareCoords;
var updateTitleBarPass = updateTitleBar;
var setUpFleetsForSelectionPass = setUpFleetsForSelection;
var selectFleetsByArgumentsPass = selectFleetsByArguments;
var redAlertSoundStartPass = redAlertSoundStart;
var returnSelectedFleetsPass = returnSelectedFleets;
var getShipIdBattleCalcStandardsPass = getShipIdBattleCalcStandards;
var returnShipsInFleetsPass = returnShipsInFleets;
var getShipNameBattleCalcStandardsPass = getShipNameBattleCalcStandards;
var stringOfShipsInSelectedFleetsPass = stringOfShipsInSelectedFleets;
var stringOfShipsInSelectedFleetsSSPass = stringOfShipsInSelectedFleetsSS;
var stringOfResourcesInSelectedFleetsPass = stringOfResourcesInSelectedFleets;
var setupBattleCalcScreenPass = setupBattleCalcScreen;
var attributeAdderPass = attributeAdder;
var battleCalcNowPass = battleCalcNow;
var frsIntervalUpdaterPass = frsIntervalUpdater;
var rAF = recursiveAttributeFinder;
var loadTechsPass = loadTechs;
var setTechPass = setTech;
var setupSaveEspionagePass = setupSaveEspionage;
var saveEspionagePass = saveEspionage;
var espionageClassPass = espionageClass;
var setupEspionageTablePass = setupEspionageTable;
var deleteSavedEspionagePass = deleteSavedEspionage;
var saveEspionageFindSelectedPass = saveEspionageFindSelected;
var bCEspionageAdderPass = bCEspionageAdder;
var returnDefensesInFleetsPass = returnDefensesInFleets;
var getDefenseIdBattleCalcStandardsPass = getDefenseIdBattleCalcStandards;
var galaxyIndexerParseSystemPass = galaxyIndexerParseSystem;
var galaxyIndexerSetStructurePass = galaxyIndexerSetStructure;
var updateLocalStoragePass = updateLocalStorage;
var listenForFRSPass = listenForFRS;
var contentEvalPass = contentEval;
var setUpPass = setUp;
var systemScanAutoPass = systemScanAuto;
var lightUpHephsPass = lightUpHephs;
var addResPass = addRes;
var definePageTypePass = definePageType;
var unhideBoardPostsFromBottomPass = unhideBoardPostsFromBottom;
var setupUnhidePostsPass = setupUnhidePosts;
var fleetToolsDetailedFleetInfoPass = fleetToolsDetailedFleetInfo;
var fleetToolsReturnSelectedFleetsInfoPass = fleetToolsReturnSelectedFleetsInfo;
var startTimerForCountdownPass = startTimerForCountdown;
var calculateArrayedNumberOfPass = calculateArrayedNumberOf;
var addPlayerPass = addPlayer;
var GetTableItemPass = GetTableItem;
var GetClassItemPass = GetClassItem;
var GetClassArrayPass = GetClassArray;
var findAttackingPlayerPass = findAttackingPlayer;
var findDefendingPlayerPass = findDefendingPlayer;
var addCommasEPass = addCommasE;
var delayedFRSStartPass = delayedFRSStart;
var getSecondsUntilGameTimePass = getSecondsUntilGameTime;
var hideFleetsByFRSPass = hideFleetsByFRS;
var changePageTitlePass = changePageTitle;
var systemScanPass = systemScan;
var compoundResourcesStartPass = compoundResourcesStart;
var compoundResourcesGUIPass = compoundResourcesGUI;
var compoundLoadBuildingsPass = compoundLoadBuildings;
var buildingsStoragePass = buildingsStorage;
var compoundAddToResourcesPass = compoundAddToResources;
var compoundLoadDefensesPass = compoundLoadDefenses;
var getDefenseNameBattleCalcStandardsPass = getDefenseNameBattleCalcStandards;
var getDefenseOreCostPass = getDefenseOreCost;
var getDefenseCrystalCostPass = getDefenseCrystalCost;
var getDefenseHydrogenCostPass = getDefenseHydrogenCost;

loadFunctionsIntoPage();
contentEval('setUp()');







function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

