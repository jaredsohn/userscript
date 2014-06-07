// ==UserScript==
// @name          Mafia Wars - Direct Links
// @namespace     http://userscripts.org/users/36992/scripts
// @description   Direct links to heal, heal in NY only, hitlist, promote, & many other items you get tired of clicking 2 & 3 links for. Reduces risk of Carpal Tunnel. You can also change background color.(Open in a new window)
// @author        Kwame Jeffers aka LordSnooze
// @version       0.70 : 21-Nov-2009
// @include       http://apps.facebook.com/inthemafia/*
//
// ==/UserScript==


/*

Credits
============
21-Nov-2009 Copied Stockholm's (http://www.spockholm.com) script to find the user id
18-Jun-2009 Copied a significant amount of code from script..."Facebook Mafia Wars OMERTA Autoplayer" v 0.6.4
18-Jun-2009 (Continued) So I'll mention the contributors to THAT here...StevenD, CharlesD, Eric Ortego, Jeremy, Liquidor, AK17710N, Fragger, <x51>
============

About
============
This is a GreaseMonkey script. More information about GreaseMonkey can be found here:
http://diveintogreasemonkey.org/install/what-is-greasemonkey.html
============

Installation
-------------
First you need firefox...
http://mozilla.org/firefox
then you need to install GreaseMonkey...
http://greasemonkey.mozdev.org
============

History
-------------
0.70 : 21-Nov-2009 Added user-based links to promote a member and job assists.
0.67 : 21-Nov-2009 Fixed display for custom color of Heal in NY
0.66 : 19-Nov-2009 Allowed ads to remain (on right side) when Direct Links are on left.
0.65 : 19-Nov-2009 Now Compatible with Autoplayer (toggle the side links are displayed)
0.61 : 19-Nov-2009 Added link to Home
0.60 : 19-Nov-2009 Changed a few labels for links.
0.55 : 18-Nov-2009 Added links to Declare War, Boosts, Lotto, and Leaderboards.
0.51 : 27-Oct-2009 Added Vor & Pakhan.
0.50 : 19-Oct-2009 Added tabs for Moscow. Didn't add jobs. See Discussion Topics.
0.39 : 18-Oct-2009 Removed jobs since Zynga has made it extremely difficult to run jobs. See Discussion Topics.
0.38 : 18-Oct-2009 Updated the Heal in New York only.
0.37 : 09-Sep-2009 Updated the location of the "X" close image in the settings box.
0.36 : 09-Sep-2009 Fixed background when settings box is open to compensate for Zynga's change.
0.35 : 09-Sep-2009 Fixed robbing link to match Zynga's change.
0.34 : 25-Jun-2009 Added Rate/Review link
0.33 : 21-Jun-2009 Added HTML color codes link
0.32 : 21-Jun-2009 Added ability to change background color
0.31 : 20-Jun-2009 Added "Heal in New York only"
0.30 : 18-Jun-2009 Major Overhaul. Created div popup menu to choose which links should be on the final display.
0.05 : 21-May-2009 Readded the "&" on the "heal" link
0.04 : 21-May-2009 Removed duplicate arguments in generated links
0.03 : 21-May-2009 Updated @description
0.02 : 16-May-2009 Updated @description
0.02 : 16-May-2009 Updated @name from "Sidebar Links" to "Direct Links"
0.01 : 16-May-2009 Initial release
============

Known Issues
-------------
(none)
============

Comments
-------------

============

Unnecessary Comments
-------------
I never thought I'd put THIS much effort into this script! haha!
Once I get a dog, I'm going to name him GreaseMonkey!
============
*/
  var SCRIPT = {
    version: '0.70'
  };
    
  
//indent, default color, id/GM-Key,             xw_controller, job, tab, bar, action, other,		                  		Title
  var arrMenuMainChecklist = new Array(
  [10, "Black",		"bgcolor", 								  	"", 				"", 	"",  	"",  	"", 	  "", 														"Set Background Color"],
  [10, "#372695",	"index", 											"index", 		"", 	"",  "", "view",  	"", 														"Home"],
  [10, "#A400A4",	"bank", 											"bank", 		"", 	"",  "", "view",  	"", 														"Bank"],
	[10, "#0CAB07",	"hospital", 									"hospital", "", 	"",  "", "view",  	"", 														"Hospital"],
	[25, "#0CAB07",	"heal", 											"hospital", "", 	"",  "", "heal",  	"", 														"Heal"],
	[25, "#0CAB07",	"healny", 										"", 				"", 	"",  	"",  	"", 	  "", 														"Heal(NY Only)"],
	
	[10, "#808000",	"jobs", 											"job", 			"", 	"",  "", "view",  	"", 														"Jobs"],
	[25, "#808000",	"ny_street_thug",							"job", 			"", 	"1", "0","view",  	"", 														"Street Thug"],
	[25, "#808000",	"ny_associate",								"job", 			"", 	"2", "0","view",  	"", 														"Associate"],
	[25, "#808000",	"ny_soldier",									"job", 			"", 	"3", "0","view",  	"", 														"Soldier"],
	[25, "#808000",	"ny_enforcer",								"job", 			"", 	"4", "0","view",  	"", 														"Enforcer"],
	[25, "#808000",	"ny_hitman",									"job", 			"", 	"5", "0","view",  	"", 														"Hitman"],
	[25, "#808000",	"ny_capo",										"job", 			"", 	"6", "1","view",  	"", 														"Capo"],
	[25, "#808000",	"ny_consigliere",							"job", 			"", 	"7", "1","view",  	"", 														"Consigliere"],
	[25, "#808000",	"ny_underboss",								"job", 			"", 	"8", "1","view",  	"", 														"Underboss"],
	[25, "#808000",	"ny_boss",										"job", 			"", 	"9", "1","view",  	"", 														"Boss"],
	
	[25, "#708000",	"cuba_el_soldado",						"job", 			"", 	"1", "0","view",  	"", 														"El Soldado"],
	[25, "#708000",	"cuba_el_capitan",						"job", 			"", 	"2", "0","view",  	"", 														"El Capitan"],
	[25, "#708000",	"cuba_el_jefe",								"job", 			"", 	"3", "0","view",  	"", 														"El Jefe"],
	[25, "#708000",	"cuba_el_patron",							"job", 			"", 	"4", "0","view",  	"", 														"El Patron"],
	[25, "#708000",	"cuba_el_padrino",						"job", 			"", 	"5", "0","view",  	"", 														"El Padrino"],
	[25, "#708000",	"cuba_el_cacique",						"job", 			"", 	"6", "0","view",  	"", 														"El Cacique"],
	
	[25, "#708000",	"moscow_baklany",						  "job", 			"", 	"",  "", "view",  "&episode_tab=1", 							  "Baklany"],
	[25, "#708000",	"moscow_boets",						    "job", 			"", 	"",  "", "view",  "&episode_tab=2", 							  "Boets"],
	[25, "#708000",	"moscow_brigadir",						"job",  		"", 	"",  "", "view",  "&episode_tab=3", 							  "Brigadir"],
	[25, "#708000",	"moscow_avtoritet",						"job", 	  	"", 	"",  "", "view",  "&episode_tab=4", 							  "Avtoritet"],
	[25, "#708000",	"moscow_vor",					      	"job", 	  	"", 	"",  "", "view",  "&episode_tab=5", 							  "Vor"],
	[25, "#708000",	"moscow_pakhan",					  	"job", 	  	"", 	"",  "", "view",  "&episode_tab=6", 							  "Pakhan"],
	
	[10, "#AE0000",	"fight", 											"fight", 		"", 	"",  "", "view", 		"", 														"Fight"],
	[25, "#AE0000",	"war", 									  		"war", 		  "", 	"",  "", "view", 		"", 														"Declare War"],	
	[25, "#AE0000",	"hitlist", 										"hitlist", 	"", 	"",  "", "view", 		"", 														"Hitlist"],
	[25, "#AE0000",	"robbing", 										"robbing", 	"", 	"",  "", "view", 		"",															"Robbing",],
	[10, "#804000",	"cuba_business", 							"business", "", 	"",  "", "view", 		"", 														"Business"],
	[10, "#804000",	"ny_properties", 							"property", "", 	"",  "", "view", 		"", 														"Properties"],
	[10, "#372695",	"inventory", 									"item", 		"", 	"",  "", "view", 		"", 														"Inventory"],
	[25, "#372695",	"weapons", 										"item", 		"", 	"1", "", "view", 		"", 														"Weapons"],
	[25, "#372695",	"armor", 											"item", 		"", 	"2", "", "view", 		"", 														"Armor"],
	[25, "#372695",	"vehicles", 									"item", 		"", 	"3", "", "view", 		"", 														"Vehicles"],
	[25, "#372695",	"boosts", 								    "expendable",	"",	"4", "", "view", 		"", 														"Boosts"],
	
	[25, "#008080",	"loot", 											"loot", 		"", 	"",  "", "view", 		"", 														"Loot"],
	[25, "#008080",	"collection", 								"collection","", 	"",  "", "view", 		"", 														"Collections & Vault"],
	[25, "#008080",	"gift", 											"gift",			"", 	"",  "", "view", 		"", 														"Gifting"],
	[10, "#A400A4",	"favor", 											"favor", 		"", 	"",  "", "view", 		"", 														"Godfather"],
	[25, "#A400A4",	"lotto", 											"lotto", 		"", 	"",  "", "view", 		"", 														"Daily Chance"],
	
	[10, "#808000",	"profile", 										"stats", 		"", 	"",  "", "view", 		"", 														"Profile"],
	[10, "#808000",	"achievement", 								"achievement","", "",  "", "view", 		"", 														"Achievements"],
	[25, "#808000",	"stats_attack", 							"stats", 		"", 	"",  "", "upgrade", "&upgrade_key=attack", 					"+ Attack"],
	[25, "#808000",	"stats_defense", 							"stats", 		"", 	"",  "", "upgrade", "&upgrade_key=defense", 				"+ Defense"],
	[25, "#808000",	"stats_health", 							"stats", 		"", 	"",  "", "upgrade", "&upgrade_key=max_health", 			"+ Health"],
	[25, "#808000",	"stats_energy", 							"stats", 		"", 	"",  "", "upgrade", "&upgrade_key=max_energy", 			"+ Energy"],
	[25, "#808000",	"stats_stamina", 							"stats", 		"", 	"",  "", "upgrade", "&upgrade_key=max_stamina", 		"+ Stamina"],
	[10, "#808000",	"recruit", 										"recruit", 	"", 	"",  "", "view", 		"", 														"Recruit"],	
	[10, "#808000",	"group", 											"group", 		"", 	"",  "", "view", 		"", 														"My Mafia"],
	[25, "#808000",	"leaders", 										"leaders", 	"", 	"1",  "", "view",  	"", 	  												"Leaders - My Mafia"],
	[25, "#808000",	"leaders", 										"leaders", 	"", 	"2",  "", "view",  	"", 	  												"Leaders - Overall"],

	[10, "#0CAB07",	"user_promote", 							"", 				"", 	"",  	"",  	"", 	  "", 														"Member - Promote"],
  [10, "#0CAB07",	"user_job_assist", 						"", 				"", 	"",  	"",  	"", 	  "", 														"Member - Job Assist"],
	
	//Add new items above this line
	["","","","","","","","","",""]) //last item without a comma
	arrMenuMainChecklist.pop() //removes last item
	
//This updates the div with links. Runs at load & after save changes
function updateSidebar() {
	if (window==window.top) {
		
		//generate our own xw_time & xw_exp_sig
		var xw_time = generateTime()
		var xw_exp_sig = generateSig()

		argTimeFull = '&xw_time=' + xw_time
		argSigFull = '&xw_exp_sig=' + xw_exp_sig
		proDomain = location.href.substr(0,location.href.indexOf('/', '10'))
		linkBase = proDomain + location.pathname

    parentAdsDiv=document.getElementById('MafiaWars-Sidebar')
    if (parentAdsDiv !== null) {
      removeFamily(parentAdsDiv)
    }

    if (GM_getValue('Links_On_Right_Side_cbox')) { //right side
      dropMenu=document.getElementById('MafiaWars-SidebarRightParent')
      if (dropMenu == null) {
        adsDiv = document.getElementById('sidebar_ads')
        tempDiv = adsDiv.parentNode
        tempDiv.setAttribute('id', 'MafiaWars-SidebarRightParent')
        removeChildrenFromNode(tempDiv)
        dropMenu=document.getElementById('MafiaWars-SidebarRightParent')
      }
      
      
      var parentAdsDiv = document.createElement('div');
      parentAdsDiv.setAttribute('id','MafiaWars-Sidebar');
      parentAdsDiv.setAttribute('style', 'background-color: black; width: 150px;')
      dropMenu.appendChild(parentAdsDiv);
      removeChildrenFromNode(parentAdsDiv)
    } else { //Left side
      dropMenu=document.getElementById('dropmenu_container')
      var parentAdsDiv = document.createElement('div');
      parentAdsDiv.setAttribute('id','MafiaWars-Sidebar');
      parentAdsDiv.setAttribute('style', 'background-color: black; width: 150px;')
      dropMenu.appendChild(parentAdsDiv);
      removeChildrenFromNode(parentAdsDiv)
    }

    //Create the Direct Links
		//Options   
		linkNew = document.createElement('a')
		linkNew.setAttribute('onmouseover', 'window.status="Show Settings Menu";return true')
		linkNew.setAttribute('onmouseout', 'window.status="";return true')
		linkNew.addEventListener("click", createMenu, false);
		linkNew.setAttribute('style','color: green');
		linkNew.setAttribute('class', 'MWSB')
		linkNew.appendChild(document.createTextNode('- Options -'))
		parentAdsDiv.appendChild(linkNew)
		parentAdsDiv.appendChild(document.createElement('br'))
		
		for(k=0; k<arrMenuMainChecklist.length; k++) {
			argColor = 			arrMenuMainChecklist[k][1]	
			argId = 				arrMenuMainChecklist[k][2]
			argController = arrMenuMainChecklist[k][3]
			argJob = 				arrMenuMainChecklist[k][4]
			argTab = 				arrMenuMainChecklist[k][5]
			argBar = 				arrMenuMainChecklist[k][6]
			argAction = 		arrMenuMainChecklist[k][7]
			argOther = 			arrMenuMainChecklist[k][8]
			argTitle = 			arrMenuMainChecklist[k][9]
					
			switch (argId)
			{
			case 'healny':
				if (GM_getValue(argId + '_cbox')) {
					linkNew = document.createElement('a')
					linkNew.setAttribute('onmouseover', 'window.status="(Script) If NY, then heal. If Cuba, travel.";return true')
					linkNew.setAttribute('onmouseout', 'window.status="";return true')
					linkNew.addEventListener("click", healNY, false);
					linkColor = GM_getValue(argId + '_color', argColor)
					linkNew.setAttribute('style','color:' + linkColor)
					linkNew.setAttribute('class', 'MWSB')
					linkNew.appendChild(document.createTextNode(argTitle))
					parentAdsDiv.appendChild(linkNew)
					parentAdsDiv.appendChild(document.createElement('br'))
				}
				break;
			
			case 'bgcolor':
				if (GM_getValue(argId + '_cbox')) {
					bgColor = GM_getValue(argId + '_color',argColor)
					addGlobalStyle('BODY {background-color:' + bgColor + '}');
				}
				break;
				
			case 'user_promote':
				if (GM_getValue(argId + '_cbox')) {
					linkNew = document.createElement('a')
					linkNew.setAttribute('onmouseover', 'window.status="Promote this mafia member";return true')
					linkNew.setAttribute('onmouseout', 'window.status="";return true')
					linkNew.addEventListener("click", promoteUser, false);
					linkColor = GM_getValue(argId + '_color', argColor)
					linkNew.setAttribute('style','color:' + linkColor)
					linkNew.setAttribute('class', 'MWSB')
					linkNew.appendChild(document.createTextNode(argTitle))
					parentAdsDiv.appendChild(linkNew)
					parentAdsDiv.appendChild(document.createElement('br'))
				}
				break;

			case 'user_job_assist':
				if (GM_getValue(argId + '_cbox')) {
					linkNew = document.createElement('a')
					linkNew.setAttribute('onmouseover', 'window.status="Assist a job for this mafia member";return true')
					linkNew.setAttribute('onmouseout', 'window.status="";return true')
					linkNew.addEventListener("click", jobAssistUser, false);
					linkColor = GM_getValue(argId + '_color', argColor)
					linkNew.setAttribute('style','color:' + linkColor)
					linkNew.setAttribute('class', 'MWSB')
					linkNew.appendChild(document.createTextNode(argTitle))
					parentAdsDiv.appendChild(linkNew)
					parentAdsDiv.appendChild(document.createElement('br'))
				}
				break;
				
			default:
				if (GM_getValue(argId + '_cbox')) {
					argIdFull = GM_getValue(argId + '_cbox')
					linkColor = GM_getValue(argId + '_color',argColor)
			
					if (!(argController=='')) {
						argControllerFull = 'xw_controller=' + argController  //no &
					} else {
						argControllerFull = ''
					}
					if (!(argJob=='')) {
						argJobFull = '&job=' + argJob
					} else {
						argJobFull = ''
					}
					if (!(argTab=='')) {
						argTabFull = '&tab=' + argTab
					} else {
						argTabFull = ''
					}
					if (!(argBar=='')) {
						argBarFull = '&bar=' + argBar
					} else {
						argBarFull = ''
					}
					if (!(argAction=='')) {
						argActionFull = '&xw_action=' + argAction
					} else {
						argActionFull = ''
					}
					if (!(argOther=='')) {
						argOtherFull = argOther
					} else {
						argOtherFull = ''
					}
			
					//Final link argurments order: action, city, job, tab, bar, other
					linkNew = document.createElement('a')
					linkPartial = 'remote/html_server.php' + '?' + argControllerFull + argSigFull + argTimeFull + argActionFull + argJobFull + argTabFull + argBarFull + argOtherFull
					linkFull = linkBase + '?' + argControllerFull + argSigFull + argTimeFull + argActionFull + argJobFull + argTabFull + argBarFull + argOtherFull
					linkNew.setAttribute('onmouseover', 'window.status="' + linkFull + '";return true')
					linkNew.setAttribute('onmouseout', 'window.status="";return true')
					linkNew.setAttribute('onclick','window.location="javascript:a10979261223_do_ajax(\'mainDiv\',\'' + linkPartial + '\')";updateSidebar();')
					linkNew.appendChild(document.createTextNode(argTitle))		
					linkNew.setAttribute('style','color:' + linkColor)
					linkNew.setAttribute('class', 'MWSB')
					parentAdsDiv.appendChild(linkNew)
					parentAdsDiv.appendChild(document.createElement("br"))
				}
			}
		}
	}
}

updateSidebar()


addGlobalStyle('a.MWSB    				 {text-decoration:underline;font:normal 10pt Verdana,Arial,sans-serif;}');
addGlobalStyle('a:VISITED.MWSB     {text-decoration:underline;font:normal 10pt Verdana,Arial,sans-serif;}');
addGlobalStyle('a:LINK.MWSB        {text-decoration:underline;font:normal 10pt Verdana,Arial,sans-serif;}');
addGlobalStyle('a:HOVER.MWSB       {text-decoration:none;font:normal 10pt Verdana,Arial,sans-serif;}');
addGlobalStyle('a:ACTIVE.MWSB      {text-decoration:underline;font:normal 10pt Verdana,Arial,sans-serif;}');



// -----------------functions-----------------


//######Start of Create Menu########
function createMenu() {
  // trying to make settings box appear like popup in MW
  // This will fade the background when the settings box is up, just like facebook popups
	
  var settingsBoxBg = document.createElement('div');
    settingsBoxBg.setAttribute('style', 'height: 100%; position: fixed; display:block; left:0; top:0; width:100%; z-index:100;');
    //settingsBoxBg.setAttribute('class','dark_dialog_overlay'); //disabling because the class value has changed.
    settingsBoxBg.setAttribute('id','settingsBoxBg');
    document.body.appendChild(settingsBoxBg);

  // This creates the settings box just like a facebook popup
  var sBoxGenDialogPopDialog = document.createElement('div');
		sBoxGenDialogPopDialog.setAttribute('style', 'display:block;');
    sBoxGenDialogPopDialog.setAttribute('class','generic_dialog pop_dialog');
    sBoxGenDialogPopDialog.setAttribute('id','GenDialogPopDialog');
    document.body.appendChild(sBoxGenDialogPopDialog);

    var sBoxGenDialogPopup = document.createElement('div');
      sBoxGenDialogPopup.setAttribute('class','generic_dialog_popup');
      sBoxGenDialogPopup.setAttribute('style','top: 40px;');
      sBoxGenDialogPopDialog.appendChild(sBoxGenDialogPopup);

     var sBoxPopDialogTable = document.createElement('table');
        sBoxPopDialogTable.setAttribute('class','pop_dialog_table');
        sBoxPopDialogTable.setAttribute('id','pop_dialog_table');
        sBoxPopDialogTable.setAttribute('style','width: 620px;');
        sBoxGenDialogPopup.appendChild(sBoxPopDialogTable);

        var sBoxTableTR = document.createElement('tr');
          sBoxPopDialogTable.appendChild(sBoxTableTR);

							var sBoxTDPopTopleft = document.createElement('td');
              sBoxTDPopTopleft.setAttribute('class','pop_topleft');
              sBoxTableTR.appendChild(sBoxTDPopTopleft);

							var sBoxTDPopBorderPopTop = document.createElement('td');
              sBoxTDPopBorderPopTop.setAttribute('class','pop_border pop_top');
              sBoxTableTR.appendChild(sBoxTDPopBorderPopTop);

							var sBoxTDPopTopright = document.createElement('td');
              sBoxTDPopTopright.setAttribute('class','pop_topright');
              sBoxTableTR.appendChild(sBoxTDPopTopright);

							var sBoxTableTR2 = document.createElement('tr');
							sBoxPopDialogTable.appendChild(sBoxTableTR2);

							var sBoxTDPopBorderPopSide = document.createElement('td');
              sBoxTDPopBorderPopSide.setAttribute('class','pop_border pop_side');
              sBoxTableTR2.appendChild(sBoxTDPopBorderPopSide);

							var sBoxTDPopContent = document.createElement('td');
              sBoxTDPopContent.setAttribute('class','pop_content');
              sBoxTDPopContent.setAttribute('id','pop_content');
              sBoxTableTR2.appendChild(sBoxTDPopContent);

              // This creates the settings container
              var settingsBox = document.createElement('div');
              settingsBox.setAttribute('style', 'overflow:auto; border: 0px solid #ffd461; z-index: 30; background-color: #fffadb; position: relative; width: 600px; height: 650px; opacity: 1; vertical-align: middle; text-align: left; ');
              settingsBox.setAttribute('id','settingsBox');
              sBoxTDPopContent.appendChild(settingsBox);
							
              var sBoxTDPopBorderPopSide2 = document.createElement('td');
              sBoxTDPopBorderPopSide2.setAttribute('class','pop_border pop_side');
              sBoxTableTR2.appendChild(sBoxTDPopBorderPopSide2);

              var sBoxTableTR3 = document.createElement('tr');
              sBoxPopDialogTable.setAttribute('id','pop_tr3');
              sBoxPopDialogTable.appendChild(sBoxTableTR3);

              var sBoxTDPopBottomleft = document.createElement('td');
              sBoxTDPopBottomleft.setAttribute('class','pop_bottomleft');
              sBoxTableTR3.appendChild(sBoxTDPopBottomleft);

              var sBoxTDPopBorderPopBottom = document.createElement('td');
              sBoxTDPopBorderPopBottom.setAttribute('class','pop_border pop_bottom');
              sBoxTableTR3.appendChild(sBoxTDPopBorderPopBottom);

              var sBoxTDPopBottomright = document.createElement('td');
              sBoxTDPopBottomright.setAttribute('class','pop_bottomright');
              sBoxTableTR3.appendChild(sBoxTDPopBottomright);

  //End settings box

		var settingsBoxTitle = document.createElement('div');
    settingsBoxTitle.innerHTML = 'Mafia Wars - Direct Links v'+SCRIPT.version;
    settingsBoxTitle.setAttribute('style','position:absolute;left:10px; top:5px; color:#000000; font-size:18px; font-weight:bold;');
    settingsBox.appendChild(settingsBoxTitle);
    
		var settingsBoxBody = document.createElement('div');
    settingsBoxBody.innerHTML = ' '
    settingsBoxBody.setAttribute('style','background-color: #fffadb; left: 125px; z-index: 30; width: 600px; z-index: 30; opacity: 1; vertical-align: middle; text-align: left; float: left; clear: left; font-size: 14px; font-weight: normal; color: #000000; width: 490px;');
    settingsBox.appendChild(settingsBoxBody);

		var versionBox = document.createElement('img');
    versionBox.setAttribute('src','http://www.zynga.com/images/games/gameSmall_mafiawars.jpg');
    versionBox.setAttribute('style','position: absolute; top: 0px; right: 30px;');
    settingsBox.appendChild(versionBox);

		var settingsBoxButton = document.createElement('img');
    settingsBoxButton.setAttribute('src','http://mwfb.static.zynga.com/mwfb/graphics/button_X.gif');
    settingsBoxButton.setAttribute('style','position: absolute; top: 0px; right: 0px; cursor: pointer;');
    //settingsBoxButton.setAttribute('showHideRemoteId', 'settingsBoxBg~GenDialogPopDialog')
    //settingsBoxButton.addEventListener('click', parseRemoteIdsShowHide, false);
    settingsBoxButton.addEventListener('click', destroyMenu, false);
    settingsBox.appendChild(settingsBoxButton);

		var sBoxForm = document.createElement('form');
		sBoxForm.setAttribute('id','settingsBoxForm');
		settingsBox.appendChild(sBoxForm);


// -----------------Start of Preferences Menu list-----------------
	posTop = 100
	posBeforeIndent = 80
	
	for(k=0; k<arrMenuMainChecklist.length; k++) {
		var tmpDiv = document.createElement('div');
		argTitle = arrMenuMainChecklist[k][9]
		argId = arrMenuMainChecklist[k][2]
		argColor = arrMenuMainChecklist[k][1]
		
		if (GM_getValue(argId + '_cbox')) {
			checkedValue = ' checked="checked"'
		}else{
			checkedValue = ''
		}
		
		inputValue = GM_getValue(argId + '_color',argColor)
		eleInputBox = '<input id="' + argId + '_color' + '" value="' + inputValue + '" size="7">'
    tmpDiv.innerHTML = eleInputBox
    tmpDiv.setAttribute('style','position:absolute;left:' + '10' + 'px;top:' + posTop + 'px; color:#000000;font-size:14px;font-weight:normal;');
    sBoxForm.appendChild(tmpDiv);
    
    
    var tmpDiv = document.createElement('div');
    argIndent = arrMenuMainChecklist[k][0] + posBeforeIndent
    eleCheckBox = '<input type="checkbox" id="' + argId + '_cbox' + '"' + checkedValue + '>'
    tmpDiv.innerHTML = eleCheckBox + argTitle;
    tmpDiv.setAttribute('style','position:absolute;left:' +argIndent+ 'px;top:' + posTop + 'px; color:#000000;font-size:14px;font-weight:normal;');
    sBoxForm.appendChild(tmpDiv);

    posTop = posTop +25
	}

	
	//##########Explicit Positions############
	
 	var tmpDiv = document.createElement('div');
	tmpDiv.innerHTML = 'Created by Kwame Jeffers';
	tmpDiv.setAttribute('style','position:absolute;left:10px; top:25px; color:#000000;font-size:10px;font-weight:normal;');
	settingsBox.appendChild(tmpDiv);
	
	tmpDiv = document.createElement('a')
	linkFull = 'http://userscripts.org/reviews/new?script_id=49312'
	tmpDiv.setAttribute('onmouseover', 'window.status="' + linkFull + '";return true')
	tmpDiv.setAttribute('onmouseout', 'window.status="";return true')
	tmpDiv.setAttribute('href',linkFull)
	tmpDiv.setAttribute('target','ColorCodes')
	tmpDiv.appendChild(document.createTextNode('Rate/Review'))
	tmpDiv.setAttribute('style','position:absolute;left:220px; top:25px; color:orange;font-size:10px;font-weight:normal;');
	tmpDiv.setAttribute('class', 'MWSB')
	settingsBox.appendChild(tmpDiv);
		
	tmpDiv = document.createElement('a')
	linkFull = 'http://html-color-codes.info/#HTML_Color_Picker'
	tmpDiv.setAttribute('onmouseover', 'window.status="' + linkFull + '";return true')
	tmpDiv.setAttribute('onmouseout', 'window.status="";return true')
	//tmpDiv.setAttribute('onclick','window.open("' + linkFull + '", "myWindow", "status = 1, height = 450, width = 768, resizable = 0")')
	tmpDiv.setAttribute('href',linkFull)
	tmpDiv.setAttribute('target','ColorCodes')
	tmpDiv.appendChild(document.createTextNode('Color Codes'))
	tmpDiv.setAttribute('style','position:absolute;left:10px; top:70px; color:orange;font-size:12px;font-weight:normal;');
	tmpDiv.setAttribute('class', 'MWSB')
	settingsBox.appendChild(tmpDiv);
		
	var tmpDiv = document.createElement('div');
  tmpDiv.innerHTML = '<button>Save changes</button>';
  tmpDiv.addEventListener('click', saveSettings, false);
  tmpDiv.setAttribute('style', 'position: absolute; left: 200px; top: 50px;');
  settingsBox.appendChild(tmpDiv);

  var tmpDiv = document.createElement('div');
  if (GM_getValue('Links_On_Right_Side_cbox')) {var checkedRightSide='checked="checked"'}
  eleCheckBox = '<input type="checkbox" id="Links_On_Right_Side_cbox" ' + checkedRightSide + '>'
  tmpDiv.innerHTML = eleCheckBox + 'Links on Right Side<br>(Toggle if Autoplayer is not visible)';
  tmpDiv.setAttribute('style','position:absolute;left:300px;top:100px; color:#000000;font-size:14px;font-weight:normal;');
  sBoxForm.appendChild(tmpDiv);

	//adds space at bottom of popup
	posTop = posTop +75
	var tmpDiv = document.createElement('div');
	tmpDiv.setAttribute('style','position:absolute;left:1px;top:' + posTop + 'px; color:#999999;font-size:14px;font-weight:normal;');
	sBoxForm.appendChild(tmpDiv);
}

//#########End of Create Menu##########

function destroyMenu() {
	var sBoxGenDialogPopDialog = document.getElementById('GenDialogPopDialog')
	removeFamily(sBoxGenDialogPopDialog)
	var settingsBoxBg = document.getElementById('settingsBoxBg')
	removeFamily(settingsBoxBg)
}


function saveSettings() {
	var sBoxForm = document.getElementById('settingsBoxForm')
	var formElements = sBoxForm.elements
	for(k=0; k<formElements.length; k++) {
		if (formElements[k].id=='bgcolor_cbox') {
			if (formElements[k].checked !=='checked'){
				if (GM_getValue(formElements[k].id)){
					//All this just to unset the background color when unchecked
					addGlobalStyle('BODY {background-color:white}');
				}
			}
			GM_setValue(formElements[k].id, formElements[k].checked)
		} else {
			if (formElements[k].id.indexOf('_cbox') !=-1) {
				GM_setValue(formElements[k].id, formElements[k].checked)
			} else if(formElements[k].id.indexOf('_color') !=-1) {
				GM_setValue(formElements[k].id, formElements[k].value)
			}
		}
	}
	destroyMenu()
	updateSidebar()
}


function randomString(charsLen) {
	var chars = "0123456789abcdef";
	var randomstring = '';
	for (var i=0; i<charsLen; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring
}

function addGlobalStyle(myStyle) {
    var head;
    var style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = myStyle;
    head.appendChild(style);
}

function removeChildrenFromNode(node) {
  if(node.hasChildNodes()) {
    while(node.childNodes.length >= 1 ) {
			node.removeChild(node.firstChild);
    }
  }
}


function removeFamily(el) {
	//before deleting el, recursively delete all of its children.
	while(el.childNodes.length > 0) {
		removeFamily(el.childNodes[el.childNodes.length-1]);
	}
	el.parentNode.removeChild(el);
}

function fetchId() {
  userId = ''
	var as = document.getElementsByTagName('a');
	for(var i=0; i<as.length; i++){
		if(as[i].innerHTML=='Attack') {
			if (/html_server\.php\?query_params=/.test(as[i].href)) { 
        base64=true;
        //Take a look at AttackX from Spockholm if needed. Don't feel like doing this now. (ScriptAuthor = "Lazy")
			}
			else { //standard link
				attackhref = new String(as[i].href);
				attackstring=attackhref;
			}
		}
	}
	
	if(m=/opponent_id=([0-9]*)/.exec(attackstring)) { userId=m[1]; }
	//if(m=/tmp=([0-9a-f]*)/.exec(attackstring)) { tmpkey=m[1]; }
	//if(m=/xw_exp_sig=([0-9a-f]*)/.exec(attackstring)) { xw_exp_sig=m[1]; }
	//if(m=/xw_time=([0-9]*)/.exec(attackstring)) { xw_time=m[1]; }
	return userId
}

function generateTime() {
	today=new Date()
	return (Date.parse(today).toString()/1000) //-3600 this corrects my own computer time
}

function generateSig() {
	return randomString(32)
}
  

function healNY() {
	var xw_time = '&xw_time=' + generateTime()
	var xw_exp_sig = '&xw_exp_sig=' + generateSig()
	tmpHTML = document.getElementById('app10979261223_game_stats').innerHTML
	if (tmpHTML.indexOf('alt="cash"') <0){ //We're not in NY
		//Currently the MW application has "from=job", so we're not going to change that.
		var linkPartial = 'remote/html_server.php?xw_controller=travel' + xw_exp_sig + xw_time + '&xw_action=travel&xw_city=2&destination=1&from=job'
	} else {  //We're in NY
		var linkPartial = 'remote/html_server.php?xw_controller=hospital' + xw_exp_sig + xw_time + '&xw_action=heal&xw_city=1'
	}
	window.location="javascript:a10979261223_do_ajax(\'mainDiv\',\'" + linkPartial + "\')";updateSidebar();
}

function promoteUser() {
  id = fetchId()
  var linkPartial = 'remote/html_server.php?xw_controller=group&xw_action=view&promote=yes&uid=' + id
  window.location="javascript:a10979261223_do_ajax(\'mainDiv\',\'" + linkPartial + "\')";updateSidebar();
}

function jobAssistUser() {
  id = fetchId()
  var linkPartial = 'index.php?xw_controller=episode&xw_action=give_help_moscow_social&target_id=' + id + '&job_city=3&skip_interstitial=1'
  window.location="javascript:a10979261223_do_ajax(\'mainDiv\',\'" + linkPartial + "\')";updateSidebar();
}

