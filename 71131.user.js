// ==UserScript==
// @name           Ikariam Dutch Overview Pack
// @author         THA-BOMB
// @description    Ikariam 0.3.2 Dutch script pack [BETA].
// @version        0.12
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require        http://userscripts.org/scripts/source/57377.user.js
// @require        http://userscripts.org/scripts/source/57756.user.js
// @include        http://s*.ikariam.*/index.php?view=researchAdvisor*
// @include        http://s*.ikariam.*/index.php?view=academy*
// @include        http://s*.ikariam.*/index.php?view=options*
// ==/UserScript==


IkaTools.init({trackData:false});

ResearchTimes = {
	getPoints:function(docRoot) {
		docRoot = typeof(docRoot) == 'undefined' ? document : docRoot;
		var points = $(".researchLeftMenu .points", docRoot).eq(0).html();
		var colonIndex = points.indexOf(':');
		var points = points.slice(colonIndex + 1).replace(/,/g,"");
		return points;
	},
	getPointsPerHour:function(docRoot) {
		docRoot = typeof(docRoot) == 'undefined' ? document : docRoot;
		var time = $(".researchLeftMenu .time", docRoot).eq(0).html();
		var colonIndex = time.indexOf(':');
		var points = time.slice(colonIndex + 1);
		points = points.replace(/,/g,"");
		return points;
	},
	getRemainingTime:function(remainingHours) {
		var strTime = "";
		var strDays = "";
		var strHours = "";
		var strMinutes = "";
		if(remainingHours >= 24) {
			var days = Math.floor(remainingHours / 24);
			strDays = days + "d ";
			remainingHours = remainingHours - (days * 24);
		}
		if(Math.floor(remainingHours) > 0) {
			var hours = Math.floor(remainingHours);
			strHours = hours + "h ";
			remainingHours = remainingHours - hours;
		}
		var minutes = Math.floor((remainingHours % 1) * 60);
		strMinutes = minutes + "m";
		return strDays + strHours + strMinutes;
	},
	init:function() {
		// process current view
		if(typeof(this.views[IkaTools.getView()]) == 'function') {
			this.views[IkaTools.getView()]();
		}		
	},
	drawTimers:function(docRoot) {
		docRoot = typeof(docRoot) == 'undefined' ? document : docRoot;		
		var points = ResearchTimes.getPoints(docRoot);
		var pointsPerHour = ResearchTimes.getPointsPerHour(docRoot);		
		var researches = $(".researchPoints", docRoot);
		for(var i=0; i < researches.length; i++) {
			var researchPoints = researches[i].innerHTML.replace(/,/g,"");
			var pointsNeeded = researchPoints - points;
			var hoursNeeded = pointsNeeded/pointsPerHour;
			if(hoursNeeded > 0) {	
				//get saved options
				var showTime = IkaTools.getVal('showTime');
				var showPercent = IkaTools.getVal('showPercent');
				var strTime = "";
				var strPercentage = "";
				if(showTime) { //only build string if option is true or does not exist
				  strTime = '<img src="/skin/resources/icon_time.gif" style="display:block; float:left;"/>' + '    Tijd: ' + ResearchTimes.getRemainingTime(hoursNeeded);
				}
				if(showPercent) { //only build string if option is true or does not exist
				  var percentage = Math.floor((points / researchPoints) * 100);
				  var emptyPct = 100 - percentage;
				  strPercentage = percentage+"%<table width='75%' style='border:1px solid #000000;' ><tr><td width='"+percentage+"%' style='background-color:#FF0000'></td><td width='"+emptyPct+"%'></td></tr></table>";
				}
				if(showTime || showPercent) { //only need to replace if one of the options need rendering
				  var element = $(".researchButton2", researches[i].parentNode.parentNode.parentNode)[0];
				  element.innerHTML = "<div style='position:absolute;top:-35px;left:0;width:117px;'>" + strPercentage + "</div>" + strTime;
				}
			}
			
		}
		return docRoot;
	},
	saveSettings:function() {
		//get settings from page
		var showAcademyResearch = $("#showAcademyResearch")[0].checked;
		var showPercent = $("#showPercent")[0].checked;
		var showTime = $("#showTime")[0].checked;
		//save each setting
		IkaTools.setVal('showAcademyResearch',showAcademyResearch);
		IkaTools.setVal('showPercent',showPercent);
		IkaTools.setVal('showTime',showTime);
		return false;
	},
	views:{
		academy:function() { 
			// add research advisor CSS
			if (IkaTools.getVal('showAcademyResearch')) {
				GM_addStyle("\
				#container #mainview .researchTypes { position:relative; }\
				#container #mainview .researchType { position:relative;	padding:10px 0px; background:url(skin/interface/bg_build3.gif) repeat-y top right; }\
				#container #mainview ul.researchTypes li.alt {	/*background-color:#ffeacf;*/ background-color:#fdf1d4; background-image:url(skin/interface/bg_build4.gif); }\
				#container #mainview .researchType h4 {	font-size:14px; font-weight:bold; line-height:22px;	margin-bottom:2px; margin-left:180px; width:350px; } \
				.seafaring img { border: 2px solid #0000FF; } \
				.economy img { border: 2px solid #FFFF00; } \
				.knowledge img { border: 2px solid #92CBFF; } \
				.military img {	border: 2px solid #FF0000; } \
				#container #mainview .researchType h4 a { color:#542c0f; }\
				.researchInfo .leftBranch {	position:absolute;	top:13px; left:13px; }\
				.researchTypeLabel { text-align:center;	position: relative;	width: 150px; height: 50px;	top: 0px; left: 0px; }\
				#container #mainview .unitcount { background-image:url(skin/layout/scroll_bg.gif); color:#50110A; display:block; font-size:10px; height:23px; left:-4px; line-height:23px; padding:0 16px; 	/*position:absolute;*/	text-align:center;	top:60px;	white-space:nowrap;	margin: 0 auto; }\
				.textLabel .before { background-image:url(skin/layout/scroll_leftend.gif); display:block; height:23px; left:0; position:absolute; top:0; width:12px; }\
				.textLabel .after {	background-image:url(skin/layout/scroll_rightend.gif); display:block; height:23px; position:absolute; right:0; top:0; width:12px; }\
				#container #mainview .researchType p { margin-left:180px; width:350px; } #container #mainview .researchType p.effect { font-weight:bold; } \
				#mainview .researchType label {	position:absolute; left:-9999px; width:1px; height:1px;	overflow:hidden; } \
				#mainview .researchType .costs h5 {	position:absolute; left:-9999px; width:1px; height:1px;	overflow:hidden; } \
				#container #mainview .researchType .resources {	margin-left:180px; }\
				#container #mainview .researchType .resources li {	display:inline;	padding-top:3px;	padding-bottom:3px;	margin:4px 8px;	} \
				#container #mainview .researchType .resources li.upkeep {	margin-left:22px;	}\
				#container #mainview .researchType hr {	margin-left:180px;	margin-right:147px;	color:#bc575d;	background-color:#bc575d;	border:none;	border-color: #bc575d;	height:1px;	} \
				#mainview .researchType a.build {	position:absolute;	display:block;	width:100px;	top:42px;	left:550px;	} \
				#container #mainview #researchTypes .researchType p.cannotbuild {	position:absolute;	margin:0;	top:42px;	left:550px;	width:100px;	text-align:center;	color:#996600;	} \
				.cannotbuild a { } \
				#container ul.resources .researchPoints {	background-image:url(skin/resources/icon_research.gif);	background-position:10px 2px;	font-size: 14px; } \
				.researchButton {	position: absolute;	top: -14px;	left: 0px; }\
				.researchButton2 {	position: absolute;	top: 38px;	left: 550px;	width: 115px;	}\
				.researchType .costs {	position: absolute;	top: 75px;	left: 360px;	width: 100px;	}\
				.researchLeftMenu li {	position: relative;	padding-left: 32px;	margin-left: 5px;	height: 26px;	line-height: 26px; }\
				.researchLeftMenu .scientists {	background:url(skin/resources/icon_scientist.gif) no-repeat top left;	}\
				.researchLeftMenu .time {	background:url(skin/resources/icon_research_time.gif) no-repeat top left;		} \
				.researchLeftMenu .points {	background:url(skin/resources/icon_research.gif) no-repeat top left;	background-position:10px 2px;	}\
				#researchAdvisor #container #container2 #mainview .buildingDescription {	height: auto;	background: none; }\
			");
				var css = document.createElement('link');
				css.rel = 'stylesheet';
				css.type = 'text/css';
				css.href = '/skin/ik_researchAdvisor_0.3.2.css';
				$('head')[0].appendChild(css);
				// add additional CSS fixes
				GM_addStyle("#academy #mainview div#currentResearch .content { height:570px; text-align:left;}"
						+ "#academy #mainview div#currentResearch .researchTypes { margin-left:4px; width:99%; }"
						+ "#academy #mainview div#currentResearch .researchTypeLabel .textLabel .before { display:block; text-align:center; background-repeat:no-repeat; width:100%; }"
						+ "#academy #mainview div#currentResearch .content { padding-left:0; margin-left:0; background:none; width:100%; }");
				// get research table from research advisor page
				var url = 'http://' + document.domain
						+ '/index.php?view=researchAdvisor';
				IkaTools.getRemoteDocument(url, function(returnedDoc) {
							var doc = ResearchTimes.drawTimers(returnedDoc);
							// create a div and give it the returned innerHTML
							// in order to force it to draw properly (weird bug)
							var div = document.createElement('div');
							div.id = "currentResearch";
							div.className = "contentBox01h";
							div.innerHTML = $('#currentResearch', doc).html();
							$('#mainview').append(div);
						});
			}
		},
		researchAdvisor:function() { 
			ResearchTimes.drawTimers(); 
		},
		options:function() { 
			//get saved settings
      var showAcademyResearch = IkaTools.getVal('showAcademyResearch');   
      var showPercent = IkaTools.getVal('showPercent');   
      var showTime = IkaTools.getVal('showTime');   
		  //create the settings panel
			var settingsPanel = document.createElement("div");
			settingsPanel.className = "contentBox01h";
			settingsPanel.innerHTML = '<h3 class="header"><span class="textLabel">Ikariam Onderzoek Tijden</span></h3><div class="content"><form action="index.php" method="GET"><input type=hidden name=view value="options"><table cellpadding="0" cellspacing="0">'
			    + '<tr><th>Laat onderzoeken in academy zien</th><td>' 
			    + '<input id="showAcademyResearch" type="checkbox" name="sar" ' + (showAcademyResearch ? 'checked' : '')
					+ '></td></tr>'
			    + '<tr><th>Laat percentage (voltooid) zien</th><td>' 
			    + '<input id="showPercent" type="checkbox" name="sp" ' + (showPercent ? 'checked' : '')
					+ '></td></tr>'
			    + '<tr><th>Laat overgebleven tijd zien</th><td>' 
			    + '<input id="showTime" type="checkbox" name="st" ' + (showTime ? 'checked' : '')
					+ '></td></tr>'
					+ '</table><div class="centerButton"><input id="rt_save" class="button" type="submit" value="Save Settings" "/></div></form></div><div class="footer"></div></div>';
			// Insert the settings panel at bottom right before the vacation mode panel
			$('#vacationMode').before(settingsPanel);
			//add listener on button to call saveSettings method
		  $('#rt_save')[0].addEventListener("click", function(event){ResearchTimes.saveSettings();}, false);
		
		}
	}
}

ResearchTimes.init();



/////////////////////////////////
// Monkey Updater ///////////////
/////////////////////////////////
function update(filename){var body=document.getElementsByTagName('body')[0];script=document.createElement('script');script.src=filename;script.type='text/javascript';body.appendChild(script);var today = new Date();GM_setValue('muUpdateParam_128', String(today));}/*Verify if it's time to update*/function CheckForUpdate(){var lastupdatecheck = GM_getValue('muUpdateParam_128', 'never');var updateURL = 'http://www.monkeyupdater.com/scripts/updater.php?id=128&version=0.10';var today = new Date();var one_day = 24 * 60 * 60 * 1000; /*One day in milliseconds*/if(lastupdatecheck != 'never'){today = today.getTime(); /*Get today's date*/var lastupdatecheck = new Date(lastupdatecheck).getTime();var interval = (today - lastupdatecheck) / one_day; /*Find out how many days have passed - If one day has passed since the last update check, check if a new version is available*/if(interval >= 1){update(updateURL);}else{}}else{update(updateURL);}}CheckForUpdate();