// ==UserScript==
// @name           Azrane's MMG Favorites
// @namespace      http://twitter.com/azrane
// @description    Adds customizable bet buttons and access keys to the MMG.
// @description    Version 0.5
// @include        http://*.kingdomofloathing.com/bet.php*
// @include        http://127.0.0.1:*/bet.php*
// @include        http://*.kingdomofloathing.com/main.php*
// @include        http://127.0.0.1:*/main.php*
// @include        http://*.kingdomofloathing.com/topmenu.php*
// @include        http://127.0.0.1:*/topmenu.php*
// ==/UserScript==
//

/*
	---------------------------------------------------------------------------
	Changelog
	0.5 - So many bugs
	*	Fixed MMG Link in the top pane from screwing with the dimensions. I
		think.
	*	Fixed the configuration panel not opening! Thank you to Laurenthegreat
		and Vaan the Nasty for pointing this out!
	*	Yet another new home for the script. It should now forever be at
		UserScripts.org.

	0.402 - New update location
	*	Updated the script to use a new server to check for updates.
	0.401 - Oops
	*	Turns out a stray double-slash comment broke the first CSS entry, which
		happened to be for the entire main table. Sorry.
	0.4 - Interface and  sparkle, but with only half the mormon vampires.
	*	To show meat and disable bets, you now have to go through a link letting
		you know they have bugs and may not work. Because they have bugs and
		may not work.
	*	CSS implemented, code cleanup, lots of whitespaces in output added. This 
		will help debugging as things creep up on me... Once the feature-set is 
		locked in for 1.0 release, whitespaces will be removed.

	0.31 - Interface
	*	Now you're required to click a link AND check a box to reset your settings.
		Just because I don't want some idiot bitching about how easy it is to
		misclick later on.
	*	Changed the main table header to be simplified. Now there shouldn't be 
		any problems with CSS formatting.
	0.3 - New Functionality! Now with added Sparkle!
	*	Added a little polish to the config panel.
	*	Changed location labels pull-down to a check box.
	*	Added option to show meat. Currently, it only shows your meat on-hand.
		It pulls it from the side-panel. Just more convenient.
	*	Added an option to show a link to the MMG in the top menu like DrEvi1's
		Raid Manager.
	*	When you don't have enough meat on-hand to make a bet, it'll disable that
		(it only works for bets made with meat from your inventory).

	0.212 - Typo & Bug Fix
	*	Hangk is now spelled correctly. - Chalk another up to Inve. :D
	*	Forgot to finish an if statement. If you selected link instead of button,
		it wouldn't have set a variable.
	*	Oh, also a little more cleanup.
	0.21 - Fix
	*	The new labels could cause screen scrolling. Fixed it. - Thanks again Inve
	0.2 - New Functionality!
	*	It was suggested to add a label to buttons letting you know where that bet
		was being made from. So I did it! Thanks for the suggestion, Invariel.
		Also, little bits of cleanup here and there.

	0.1 - Initial release to testers
	*	Everything should be functionally working.

	---------------------------------------------------------------------------
	To Do:
	Add ability to customize the Bet From labels.
	Allow only commas and numbers to be placed in the bet field.
	---------------------------------------------------------------------------
	Future Features (maybe):
	* A simple calculator that'll let the user choose a base bet and a
	  multiplier, which will populate the bet fields with sanitized, rounded values.
	* Maybe expand on that and allow users to save a number of "favorite bets" 
	* Add a button to throw X amount of meat into your closet. - Requested by MephistoWolf
	---------------------------------------------------------------------------
*/
	var debug = false;
// ---------------------------------------------------------------------------
//	Update code taken from Picklish's scripts. Thanks again! :D
//	Permission has been given, said to "consider it public domain."
// ---------------------------------------------------------------------------
	// VERSION CHECKER 1.0

	// - BEGIN MANUAL SECTION -
	var currentVersion = "0.5";
	var scriptURL = "http://userscripts.org/scripts/source/65063.user.js";
	var scriptName = "Azrane's MMG Favorites Script";
	var showOnlyErrors = true;
	// - END MANUAL SECTION -

	// - BEGIN CUT AND PASTE SECTION -

	// Check for an updated script version and print the result box...
	function CheckScriptVersion(){
		GM_setValue("webVersion", "Error");	// Preemptively set error, in case request fails...

		GM_xmlhttpRequest({
			method: "GET",
			url: scriptURL,
			headers:{
				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
				"Accept": "text/html",
			},
			onload: function(responseDetails){
				if (responseDetails.status == "200"){
					var m = responseDetails.responseText.match(
						/description\s*Version (\w+(?:\.\w+)?)/);
					if (m && !isNaN(m[1])){
						GM_setValue("webVersion", m[1]);
					}
				}

				// In either case...
				PrintCheckVersionBox();
			}
		});
	}

	function PrintCheckVersionBox(){
		var message;
		var color;

		var webVer = parseFloat(GM_getValue("webVersion"));
		if (GM_getValue("webVersion", "Error") == "Error"){
			message = "Failed to check website for updated version of script.";
			color = "orange";
		}else if (isNaN(webVer)){
			message = "Couldn't find suitable version number.";
			color = "orange";
		}else{
			if (webVer > parseFloat(currentVersion)){
				message = "Right click <a href='" + scriptURL + "' TARGET='_blank'>here</a> and select 'Install User Script' for Version " + webVer + ".";
				color = "red";
			}else{
				if (showOnlyErrors)
					return;

				if (webVer < parseFloat(currentVersion)){
					message = "Script is newer than web version.";
					color = "blue";
				}else{
					message = "Script is latest version.";
					color = "blue";
				}
			}
		}

		var span = document.createElement("center");
		span.innerHTML = "<table style='border: 1px solid " + color + "; margin-bottom: 4px;' width=95% cellpadding=1 cellspacing=0><tr><td bgcolor=" + color + "><font color=white size=-2><b>" + scriptName + "</b> " + currentVersion + ":</font></td></tr><tr><td><font size=-2>&nbsp;&#42;" + message + "</font></td></tr></table>";

		document.body.insertBefore(span, document.body.firstChild);
	}

	if (window.location.pathname == "/main.php"){
		CheckScriptVersion();
		return;
	}
	// - END CUT AND PASTE SECTION -
// ---------------------------------------------------------------------------

//Functions
	//This grabs GET variables and returns their value. 
	//Pulled it from http://www.11tmr.com/11tmr.nsf/D6Plinks/MWHE-695L9Z
	function getURLParam(strParamName){
	  var strReturn = "";
	  var strHref = window.location.href;
	  if ( strHref.indexOf("?") > -1 ){
		var strQueryString = strHref.substr(strHref.indexOf("?"))/*.toLowerCase()*/;
		var aQueryString = strQueryString.split("&");
		for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
		  if (aQueryString[iParam].indexOf(strParamName/*.toLowerCase()*/ + "=") > -1 ){
			var aParam = aQueryString[iParam].split("=");
			strReturn = aParam[1];
			break;
		  }
		}
	  }
	  return unescape(strReturn);
	} 

	function parse(varname){
		if(getURLParam(varname) == 'on'){
			return 1;
		}else if(getURLParam(varname) == ''){
			return 0;
		}else{
			return getURLParam(varname);
		}
	}
	
	function stripCommas(numString) {
		var numNum ='';
		for (i=0; i<numString.length; i++){
			var x = numString.charAt(i);
			//For some reason, switch() doesn't want to work.
			if(x==0||x==1||x==2||x==3||x==4||x==5||x==6||x==7||x==8||x == 9){
					numNum += x;
			}
		}
		return parseInt(numNum);
	}
	function displayToggle(toggle){
		//if(getIframe == 0){
			return 'displayToggle(\''+toggle+'\');';
		/*}else{
			return 	
				'if(document.getElementById(\''+toggle+'\').style.display == \'none\'){'+
					'document.getElementById(\''+toggle+'\').style.display = \'block\';'+
				'}else{'+
					'document.getElementById(\''+toggle+'\').style.display = \'none\';'+
				'}';
		}*/
	}
	function log(message){
		if(debug){
			GM_log(message);
		}
	}
	function logarray(arrayname,array){
		if(debug){
			for(var x in array){
				GM_log(arrayname+'['+x+'] == ' + array[x]);
			}
		}
	}
if(location.pathname == '/bet.php'){
	//Special case
	if(getURLParam('iframe') == 'off'){
		GM_setValue('useiframe',0);
	}
	log('location.pathname == ' + location.pathname);
	//Settings
		//Array of setting names
		settingArray = new Array(
			'bet_1_1','bet_2_1','bet_3_1','bet_4_1','bet_5_1',
			'bet_6_1','bet_7_1','bet_8_1','bet_9_1','bet_10_1',
			'bet_1_2','bet_2_2','bet_3_2','bet_4_2','bet_5_2',
			'bet_6_2','bet_7_2','bet_8_2','bet_9_2','bet_10_2',
			'bet_1_3','bet_2_3','bet_3_3','bet_4_3','bet_5_3',
			'bet_6_3','bet_7_3','bet_8_3','bet_9_3','bet_10_3',
			'style','labelbets','displaymeat','displaylink','disablebets',
			'invlabel','hagnklabel','useiframe');
		logarray('settingArray',settingArray);
		//Array of default values.
		defaultsArray = new Array(
			'1,000','2,000','4,000','8,000','16,000','32,000','64,000','128,000','256,000','512,000',//Bets, 0-9
			'1','2','3','4','5','Q','W','E','R','T',//Access Keys, 10-19
			0,0,0,0,0,0,0,0,0,0,//Meat From, 20-29
			'button',	//Style, 30
			0,	//Label, 31
			0,	//DisplayMeat, 32
			0,	//DisplayLink, 33
			0,	//Disable	34
			'%20-%20I',	//Inventory Label	35
			'%20-%20H',	//hagnk's label		36
			0	//use iframe	37
			);
		logarray('defaultsArray',defaultsArray);
		//If the settings have been changed, do stuff
		if(getURLParam('save') != ""){
			log('Settings were submitted...');
			//If the destroy box was checked, populate the script settings with default values.
			//Can't wait for the next GM version that allows you to delete settings!
			if(getURLParam('destroy') == "on"){
				log('Destroying all settings...');
				for(var i in settingArray){
					log('Setting '+settingArray[i]+' to '+defaultsArray[i]);
					GM_setValue(settingArray[i],defaultsArray[i]);
				}
			}else{ 
				//Save all settings.
				for(var i in settingArray){
					//if the displaylink variable has changed, reload frames
					if(settingArray[i] == 'displaylink' && GM_getValue('displaylink',0) != parse(settingArray[i])){
						document.getElementsByTagName('body')[0].setAttribute('onLoad','window.parent.frames[0].location.reload();window.parent.frames[1].location.reload();');
					}else{
						document.getElementsByTagName('body')[0].setAttribute('onLoad','window.parent.frames[1].location.reload();');
					}
					log('Setting '+settingArray[i]+' to '+defaultsArray[i]);
					GM_setValue(settingArray[i],parse(settingArray[i]));
				}
			}
		}

	//Get Variables - Pull from settings or define defaults
		log('Initializing variables');
		var getBet = new Array(null);	//Add null entry so numbering starts at one.
			var bKey = 0;	//These need to be defined in full or else they're treated as strings.
		var getKey = new Array(null);
			var kKey = 0;
		var getWhere = new Array(null);
			var wKey = 0;
		var getLabels = new Array();
		for(var i in settingArray){
			log('Beginning for() loop pass: var i ('+i+') in setting Array.');
			if(i < 10){
				bKey++;
				getBet[bKey] = GM_getValue(settingArray[i],defaultsArray[i]);
				log('Setting getBet['+bKey+'] to ' + GM_getValue(settingArray[i],defaultsArray[i]));
			}else if(i < 20){
				kKey = i - 9;
				getKey[i-9] = GM_getValue(settingArray[i],defaultsArray[i]);
				log('Setting getKey['+kKey+'] to ' + GM_getValue(settingArray[i],defaultsArray[i]));
			}else if(i < 30){
				wKey = i - 19;
				getWhere[i-19] = GM_getValue(settingArray[i],defaultsArray[i]);
			}else if(i == 30){
				var getStyle = GM_getValue(settingArray[i],defaultsArray[i]);
			}else if(i == 31){
				var getLabel = GM_getValue(settingArray[i],defaultsArray[i]);
			}else if(i == 32){
				var getMeat = GM_getValue(settingArray[i],defaultsArray[i]);
			}else if(i == 33){
				var getLink = GM_getValue(settingArray[i],defaultsArray[i]);
			}else if(i == 34){
				var getDisable = GM_getValue(settingArray[i],defaultsArray[i]);
			}else if(i == 35){
				getLabels[0] = unescape(GM_getValue(settingArray[i],defaultsArray[i]));
			}else if(i == 36){
				getLabels[1] = unescape(GM_getValue(settingArray[i],defaultsArray[i]));
			}else if(i == 37){
				var getIframe = GM_getValue(settingArray[i],defaultsArray[i]);
			}
			log('Ending for() loop pass ('+i+').');
		}
	//Do some preprocessing to make string creation easier.
		var selectWhere = new Array();
		for(var i in getWhere){
			if(getWhere[i] == '0'){
				selectWhere[i] = new Array(' selected="selected"','');
			}else{
				selectWhere[i] = new Array('',' selected="selected"');
			}
		}
		if(getStyle == 'button'){
			var selectStyle = new Array(' selected="selected"','');
		}else{
			var selectStyle = new Array('',' selected="selected"');
		}
		var checkLabel = '';
		var checkMeat = '';
		var checkLink = '';
		var checkDisable = '';
		var checkIframe = '';
		var nameIframe = '';
		var formIframe = '';
		if(getLabel == 1){ checkLabel = ' checked="checked"';}
		if(getMeat == 1){ checkMeat = ' checked="checked"';}
		if(getLink == 1){ checkLink = ' checked="checked"';}
		if(getDisable == 1){ checkDisable = ' checked="checked"';}
		if(getIframe == 1){ 
			checkIframe = ' checked="checked"';
			nameIframe = ' target="betframe"';
			formIframe ='				<input type="hidden" name="iframe" value="true">\n';
		}
	//Begin Page Creation
	var css = (<r><![CDATA[ 
		#mmgtable{ margin-left: auto; margin-right: auto; width: 95%; border: 1px solid blue; text-align: center; padding: 0; border-spacing: 0; }
		#header td{ text-align:center; background-color: blue; border-spacing: inherit; }
		#headertable { width: 100%; border: 0px; padding: 0; border-spacing: 0; }
		#headertable td { width: 33%; text-align: center; color: white; font-weight: bold; }
		#headertable2 { font-size: 12pt; }
		#headertable3, #headertable1 { font-size: 8pt; }
		#headertable3 a, #headertable1 a { color: white; }
		#configpanel { width: 100%; }
		#configpanel table { width:400px; margin-left: auto; margin-right: auto; }
		.cTableHeader td { font-size: 10pt; text-align:center; font-weight: bold; }
		.config { font-size:10pt; text-align:center; }
		.configcell-left { border-left: 1px solid black; border-top: 1px solid black; border-right: 1px solid lightgray; }
		.configcell-right { border-right: 1px solid black; border-top: 1px solid black; }
		.configcell-full { border: 1px solid black; border-bottom: 0px; }
		.configcell-bottom { border: 1px solid black; }
		.configcell { border-top: 1px solid black; border-right: 1px solid lightgray; }
		]]></r>).toString();
	//Functions that are used on the MMG page
	var headFunctions = document.createElement('script');
	headFunctions.setAttribute('type','text/javascript');
	headFunctions.innerHTML = 
		'function displayToggle(x){'+
		'	if (document.getElementById(x).style.display == "none"){'+
		'		document.getElementById(x).style.display = "";'+
		'	}else{'+
		'		document.getElementById(x).style.display = "none";'+
		'	}'+
		'}'+
		'function encodeLabels(){'+
		'	var iString = document.forms["mmgfaves"]["invlabel"].value;'+
		'	var hString = document.forms["mmgfaves"]["hagnklabel"].value;'+
		'	eiString = escape(iString);'+
		'	eiString = eiString.replace("+", "%2B");'+
		'	eiString = eiString.replace("/", "%2F");'+
		'	ehString = escape(hString);'+
		'	ehString = ehString.replace("+", "%2B");'+
		'	ehString = ehString.replace("/", "%2F");'+
		'	document.forms["mmgfaves"]["invlabel"].value=eiString;'+
		'	document.forms["mmgfaves"]["hagnklabel"].value=ehString;'+
		'}';
	/*
	var headFunctions = (<r><![CDATA[
		<script type="text/javascript">
		function displayToggle(x){
			if (document.getElementById(x).style.display == "none"){
				document.getElementById(x).style.display = "";
			}else{
				document.getElementById(x).style.display = "none";
			}
		}
		function encodeLabels(){
			var iString = document.forms["mmgfaves"]["invlabel"].value;
			var hString = document.forms["mmgfaves"]["hagnklabel"].value;
			eiString = escape(iString);
			eiString = eiString.replace("+", "%2B");
			eiString = eiString.replace("/", "%2F");
			ehString = escape(hString);
			ehString = ehString.replace("+", "%2B");
			ehString = ehString.replace("/", "%2F");
			document.forms["mmgfaves"]["invlabel"].value=eiString;
			document.forms["mmgfaves"]["hagnklabel"].value=ehString;
		}
		</script>
		]]></r>);
	*/
	var mainTableHeader =	//The main table where everything is populated.
		'<!-- mainTableHeader -->\n'+
		'<table id="mmgtable">\n'+
		'	<tr id="header">\n'+
		'		<td colspan="5">\n'+
		'			<table id="headertable">\n'+
		'				<tr>\n'+
		'					<td id="headertable1">';
		if(getIframe){mainTableHeader +='<a href="bet.php?iframe=off">Turn Off Iframe Mode</a>';}
		mainTableHeader += '</td>\n'+
		'					<td id="headertable2">MMG Favorites</td>\n'+
		'					<td id="headertable3">';
		if(!getIframe){
			mainTableHeader += '<a href="#" onclick="'+displayToggle('configpanel')+'">Toggle Config Panel</a>';
		}else{
			mainTableHeader += '<a href="#" onclick="alert(\'Configuration is disabled when using the iframe due to a bug. Turn off iframe mode to edit options.\');">Toggle Config Panel</a>';
		}
		mainTableHeader += '</td>				</tr>\n'+
		'			</table>\n'+
		'		</td>\n'+
		'	</tr>\n';
	var configTableHeader =	//Start the Config Table
		'	<!-- configTableHeader -->\n'+
		'	<tr>\n'+
		'		<td colspan="5">\n'+
		'			<div id="configpanel" style="display: none;">\n'+
		'				<form name="mmgfaves" method="get" action="bet.php" onsubmit="encodeLabels();">\n'+
		'					<table cellpadding="2" cellspacing="0">\n'+
		'						<tr class="cTableHeader">\n'+
		'							<td></td>\n'+
		'							<td>Bet Amount</td>\n'+
		'							<td>Access Key</td>\n'+
		'							<td>Meat From</td>\n'+
		'						</tr>\n';
	var configTableRows = "";	//Each of the 10 bet rows
		var cRow;
		for(cRow = 1; cRow <11; cRow++){
		configTableRows +=
		'						<!-- configTableRows[' + cRow + '] -->\n'+	
		'						<tr id="crow' + cRow + '">\n'+
		'							<td class="config configcell-left" id="configcell_' + cRow + '-label">Bet ' + cRow +'</td>\n'+
		'							<td class="config configcell" id="configcell_' + cRow + '-bet">\n'+
		'								<input style="width: 75;" type="text" name="bet_' + cRow + '_1" maxlength="11" value="' + getBet[cRow] +'">\n'+
		'							</td>\n'+
		'							<td class="config configcell" id="configcell_' + cRow + '-key">\n'+
		'								<input style="width: 75;" type="text" name="bet_' + cRow + '_2"  maxlength="1" value="' + getKey[cRow] +'">\n'+
		'							</td>\n'+
		'							<td class="config configcell-right" id="configcell_' + cRow + '-where">\n'+
		'								<select name="bet_' + cRow + '_3">\n'+
		'									<option value="0"' + selectWhere[cRow][0] + '>Inventory</option>\n'+
		'									<option value="1"' + selectWhere[cRow][1] + '>Hagnk\'s</option>\n'+
		'								</select>\n'+
		'							</td>\n'+
		'						</tr>\n';
		}
	var configTableOptions =	//Extra options
		'						<!-- configTableOptions -->\n'+
		//Config Row 1
		'						<tr id="configrow1" style="display:none;">\n'+
		'							<td colspan="2" class="config configcell-left">\n'+
		'								Style: \n'+
		'								<select name="style">\n'+
		'									<option value="button"'+selectStyle[0]+'>Button</option>\n'+
		'									<option value="link"'+selectStyle[1]+'>Link</option>\n'+
		'								</select>\n'+
		'							</td>\n'+
		'							<td colspan="2" class="config configcell-right">\n'+
		'								<input type="checkbox" name="displaylink"'+checkLink+'> Show Link in Top Menu\n'+
		'							</td>\n'+
		'						</tr>\n'+
		//Config Row 2
		'						<tr id="configrow2" style="display:none;">\n'+
		'							<td colspan="4" class="config configcell-full">\n'+
		'								<input type="checkbox" name="labelbets"'+checkLabel+'> Bet Location Labels\n'+
		'							</td>\n'+
		'						</tr>\n'+
		//Config Row 3
		'						<tr id="configrow3" style="display:none;">\n'+
		'							<td colspan="2" class="config configcell-left" style="border-top: 1px solid lightgray;">\n'+
		'								Inventory Label\n'+
		'								<input type="text" name="invlabel" value="'+getLabels[0]+'">\n'+
		'							</td>\n'+
		'							<td colspan="2" class="config configcell-right" style="border-top: 1px solid lightgray;">\n'+
		'								Hagnk\'s Label\n'+
		'								<input type="text" name="hagnklabel" value="'+getLabels[1]+'">\n'+
		'							</td>\n'+
		'						</tr>\n'+
		//Config Row 4
		'						<tr id="configrow4" style="display:none;">\n'+
		'							<td colspan="4" class="config configcell-full" id="buggy">\n'+
		'								There are some buggy features hidden behind <a href="#" onclick="' + displayToggle('configrow4a') + displayToggle('configrow4b') +  displayToggle('configrow4') + '">this link</a>.<br>Use them at your own risk.\n'+
		'							</td>\n'+
		'						</tr>\n'+
		//Config Row 4a
		'						<tr id="configrow4a" style="display:none;">\n'+
		'							<td colspan="2" class="config configcell-left" id="meat">\n'+
		'								<input type="checkbox" name="displaymeat"'+checkMeat+'> Show Meat\n'+
		'							</td>\n'+
		'							<td colspan="2" class="config configcell-right" id="disable">\n'+
		'								<input type="checkbox" name="disablebets"'+checkDisable+'> Disable Bets You Can\'t Afford\n'+
		'							</td>\n'+
		'						</tr>\n'+
		//Config Row 4b
		'						<tr id="configrow4b" style="display:none;">\n'+
		'							<td colspan="4" class="config configcell-full" id="iframes">\n'+
		'								<input type="checkbox" name="useiframe"'+checkIframe+'> Use an iframe to display MMG\n'+
		'							</td>\n'+
		'						</tr>\n';
	var configTableFooter =
		'						<tr id="moreoptions">\n'+
		'							<td colspan="4" class="config configcell-full">\n'+
		'								<a href="#" onClick="'+
			displayToggle('configrow1') + displayToggle('configrow2') + displayToggle('configrow3') + displayToggle('configrow4') + displayToggle('destroyrow') + displayToggle('moreoptions') + '">More Options</a>\n'+
		'							</td>\n'+
		'						</tr>\n'+
		'						<tr id="destroyrow" style="display:none;">\n'+
		'							<td colspan="4" class="config configcell-full">\n'+
		'								<div id="reset1" style="display:block;">\n'+
		'									<a href="#" onClick="' + displayToggle('reset1') + displayToggle('reset2') + '">Reset All Settings</a>\n'+
		'								</div>\n'+
		'								<div id="reset2" style="display:none;">\n'+
		'									Are you ABSOLUTELY sure you want to remove your settings?\n'+
		'									<br><a href="#" onClick="' + displayToggle('reset1') + displayToggle('reset2') + '">No, get me out of here!</a>\n'+
		'									<br><input type="checkbox" name="destroy"> <span style="color:red;">Yes, reset my settings.</span>\n'+
		'								</div>\n'+
		'							</td>\n'+
		'						</tr>\n'+
		'						<tr>\n'+
		'							<td colspan="4" class="config configcell-full">\n'+
		'								<input type="submit" name="save" value="Save Settings">\n'+
		'							</td>\n'+
		'						</tr>\n'+
		'						<tr>\n'+
		'							<td colspan="4" class="config configcell-bottom">\n'+
		'								<a href="#" onClick="' + displayToggle('infopane1') + '">Toggle Settings Info</a>\n'+
		'								<div id="infopane1" style="text-align:left; display: none;">\n'+
		'									<dl>\n'+
		'										<dt>Bet Amount</dt>\n'+
		'											<dd>The value of the bet to be placed.</dd>\n'+
		'										<dt>Access Key</dt>\n'+
		'											<dd>Keyboard combinations that let you hit your bets without using your mouse. Firefox\'s default is Alt + Shift + the access key.</dd>\n'+
		'										<dt>Meat From</dt>\n'+
		'											<dd>Lets you select whether your bet is made from your inventory or Hagnk\'s Ancestral Mini-Storage.</dd>\n'+
		'										<dt>Style</dt>\n'+
		'											<dd>Lets you choose whether your bets are displayed as form buttons or text links. While there is no functional difference between the two, text links take up less space, and are better suited for smaller screen resolutions.</dd>\n'+
		'										<dt>Bet Location Labels</dt>\n'+
		'											<dd>Adds some text, letting you know where your bet is being places from.</dd>\n'+
		'										<dt>Show Link in Top Menu</dt>\n'+
		'											<dd>Adds a graphical link to the MMG so you get get there faster.</dd>\n'+
		'										<dt>Show Meat</dt>\n'+
		'											<dd>Takes the meat displayed on your character pane and places it underneath your bets.</dd>\n'+
		'										<dt>Disable Bets You Can\'t Afford</dt>\n'+
		'											<dd>This will disable any on-hand bets when you don\'t have enough meat to cover the bet. It doesn\'t work with bets from Hagnk\'s.</dd>\n'+
		'										<dt>Known bugs with <b>Show Meat</b> and <b>Disable Bets</b> settings:</dt>\n'+
		'											<dd>If you\'ve placed a bet, the meat amount reported to these functions won\'t reflect this until after the page is refreshed.</dd>\n'+
		'											<dd>If the MMG page is loaded while your character pane is reloading, it won\'t be able to retrieve the meat amount and the script will fail. If this happens, simply reload the MMG page.</dd>\n'+
		'									</dl>\n'+
		'								</div>\n'+
		'							</td>\n'+
		'						</tr>\n'+
		'					</table>\n'+
		'				</form>\n'+
		'			</div>\n'+
		'		</td>\n'+
		'	</tr>\n';
	var mainTableRows = '';
		log('Starting mainTableRows');
		var pwdhash = document.getElementsByName("pwd")[0].getAttribute("value");
		log('pwdhash set to ' + pwdhash);
		var cell;
		var description = '';
			for(cell=1; cell < 11; cell++){
				log('cell = '+cell);
				if(getLabel == 1){
					if(getWhere[cell] == 0){
						description += getBet[cell] + getLabels[0];
					}else{
						description += getBet[cell] + getLabels[1];
					}
				}else{
					description = getBet[cell];
				}
				log('description = ' +description);
				if(cell == 1 || cell == 6){ 
					mainTableRows += '	<tr>\n'; 
				}

				if(getDisable){
					if(stripCommas(getBet[cell]) > stripCommas(window.parent.frames[1].document.getElementsByTagName('span')[2].innerHTML) && (getWhere[cell] == 0)){
						if(getStyle == 'button'){
							var disabled = ' disabled="disabled"';
						}else{
							var linktext = '<a accesskey="'+ getKey[cell] +'" h style="font-size: 10pt; color: 808080;">'+ description + '</a>';
							
						}
					}else{
						if(getStyle == 'button'){
							disabled = '';
						}else{
							var linktext = '<a accesskey="'+ getKey[cell] +'" href="bet.php?action=makebet&from=' + getWhere[cell] + '&pwd=' + pwdhash + '&howmuch=' + getBet[cell] + '" style="font-size:10pt;"'+ nameIframe +'>' + description + '</a>';
						}
					}
				}else{
					if(getStyle == 'button'){
						disabled = '';
					}else{
						var linktext = '<a accesskey="'+ getKey[cell] +'" href="bet.php?action=makebet&from=' + getWhere[cell] + '&pwd=' + pwdhash + '&howmuch=' + getBet[cell] + '" style="font-size:10pt;"'+ nameIframe +'>' + description + '</a>';
					}
				}
				if(getStyle == "button"){
					mainTableRows +=
						'		<td align="center">\n'+
						'			<form action="bet.php" name="makebet" method="get"'+ nameIframe +'>\n' +
						formIframe +
						'				<input type="hidden" name="action" value="makebet">\n' +
						'				<input type="hidden" name="from" value="' + getWhere[cell] + '">\n' +
						'				<input type="hidden" name="pwd" value="' + pwdhash + '">\n' +
						'				<input type="hidden" name="howmuch" value="' + getBet[cell] + '">\n' +
						'				<input style="" class="button" type="submit" accesskey="' + getKey[cell] + '" value="' + description + '"'+disabled+'>\n' + 
						'			</form>\n'+
						'		</td>\n';
				
					//mainTableRows += '<td align="center"><button accesskey="'+ getKey[cell] +'" onclick="mainpane.location=\'bet.php?action=makebet&from=' + getWhere[cell] + '&pwd=' + pwdhash + '&howmuch=' + getBet[cell] + '\'">' + getBet[cell] + '</button>';
				}
				if(getStyle == "link"){
					mainTableRows += '		<td align="center">'+ linktext +'</td>\n';
				}
				if(cell == 5 || cell == 10){ mainTableRows += '	</tr>\n'; }
				description = '';
				disabled = '';
			}
	var mainTableFooter = '';
		if(getMeat == 1){
			meat = window.parent.frames[1].document.getElementsByTagName('span')[2].innerHTML;
			mainTableFooter +=
			'	<tr>\n		<td colspan="5" class="config"><p>Meat on hand: '+ meat+ '</p></td>\n	</tr>\n';
		}

		mainTableFooter += 
		'</table>\n'+
		'<br>\n<!-- End MMG Favorites -->\n';

	var betiframe = '<iframe name="betframe" src="bet.php?iframe=true" width="100%" height="80%">If your browser doesn\'t support frames, how are you playing KoL? ;-)</iframe>';

	//Assemble HTML
	var mmgtable = document.createElement("div");

	mmgtable.innerHTML = /*headFunctions +*/ mainTableHeader + configTableHeader + configTableRows + configTableOptions + configTableFooter + mainTableRows + mainTableFooter;

	if(getIframe == 0){
		GM_addStyle(css);
		document.body.insertBefore(mmgtable, document.body.firstChild);
		document.getElementsByTagName('head')[0].appendChild(headFunctions);

	}else{

		

		if(parent.frames.length != 1){
			document.getElementsByTagName('head')[0].innerHTML = '<link rel="stylesheet" type="text/css" href="http://images.kingdomofloathing.com/styles.css">';
			mmgtable.innerHTML += betiframe;
			document.getElementsByTagName('body')[0].innerHTML = mmgtable.innerHTML;
			GM_addStyle(css);
			//var scriptsarray = document.getElementsByTagName('script');

		}else{

		}
	}

}
/*
if(location.pathname == '/charpane.php' && GM_getValue('displaymeat',0) == 1 && getURLParam('getmeat') == true){
	document.getElementsByTagName('body')[0].setAttribute('onLoad','document.body.innerHTML=document.;);');
	//var meat = 
}
*/
if(location.pathname == "/topmenu.php" && GM_getValue('displaylink',0) == 1){
	var mmgtableAnchor = document.getElementsByTagName("table")[1];
	//mmgtableAnchor.setAttribute('border','1');
	var mmgtableTR = mmgtableAnchor.getElementsByTagName("tr")[0];

    var mmgTd = document.createElement('td');
	mmgTd.setAttribute('rowspan','2');
    var mmgLink = document.createElement('a');
	
    var mmgImage = document.createElement('img');
    mmgImage.setAttribute("src","http://images.kingdomofloathing.com/adventureimages/oldman.gif");
    mmgImage.setAttribute("width","45");
    mmgImage.setAttribute("height","45");
    mmgImage.setAttribute("align","right");
    mmgImage.setAttribute("border","0");
    mmgLink.setAttribute("href","bet.php");
    mmgLink.setAttribute('target','mainpane');
    mmgLink.appendChild(mmgImage);

    mmgTd.appendChild(mmgLink);
	mmgtableTR.appendChild(mmgTd);
    //mmganchor.parentNode.insertBefore(mmgTd, mmganchor.nextSibling);
	//mmganchor.parentNode.appendChild(mmgTd);
}
