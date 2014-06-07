// ==UserScript==
// @name           Facebook - Ghost Trappers Smart Autohunt EDITED
// @namespace      iispyderii & Jaryl
// @description    A smart autohunt script for the Ghost Trappers Facebook App
// @include        http://www.ghost-trappers.com/fb/*
// @version        2.34
// @history        2.34 - Fixed updates notification
// @history        2.33 - Fixed back configurations button
// @history        2.32 - iFrame compatibility
// @history        2.31 - Disabling of daily reward when completed
// @history        2.30 - Fixed randomly going to the ghost monster page
// @history        2.29 - Fixed auto update saying it has an update everytime again
// @history        2.28 - Fixed auto GM page when you have no active GM
// @history        2.25 - Added auto goto GM page when you have active GM (+ Settings)
// @history        2.24 - Just some simple edits, might add in Milamber's suggestion soon.
// @history        2.23 - Added more stuff to the notes
// @history        2.22 - Added configurations menu at the top of the page
// @history        2.22 - Added notes on how to use
// @history        2.21 - Little more touches here and there
// @history        2.19 - Fixed up update alerter
// @history        2.18 - Added more detailed location on title
// @history        2.17 - Changed update alerter
// @history        2.15 - Fixed update alerter from spoiling the script
// @history        2.14 - Reverted to old auto-update (Hopefully works with chrome now) 
// @history        2.13 - Fixed auto-update not working (Still not working)
// @history        2.11 - Fixed title on captcha not working
// @history        2.10 - Changed to another update alerter again (Hopefully fixing chrome)
// @history        2.09 - Fixed even more minor bugs
// @history        2.08 - Fixed auto captcha refresher (Now works)
// @history        2.07 - Fixed some more minor bugs
// @history        2.06 - Added a manual check for updates at the "User Script Commands" menu
// @history        2.05 - Used back the old update alerter so that it would not interfere with hunting
// @history        2.04 - Fixed some minor bugs
// @history        2.03 - Fixed auto captcha refresher (Still not working again)
// @history        2.02 - Fixed "White Page of Death"
// @history        2.02 - Changed update alerter
// @history        2.01 - Added more settings
// @history        2.01 - Page location (index, etc.) on the title
// @history        2.00 - Initial release of editings
// ==/UserScript==
var SUC_local_ver = 2.34;
var GTSAH_Notes_Ver = 4;

/** SETTINGS IS NOW A MENU OPENED BY A JAVASCRIPT HYPERLINK AT THE TOP OF THE PAGE!) **/

/*********** MAIN SCRIPT (DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING!) ***********/
/********************* Update Checker *********************/
var SUC_script_num = 82046;
function updateCheck(forced)
{
	try
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
			headers: {
				"Pragma": "no-cache",
				"Cache-Control": "no-cache"
			},
			onload: function(resp)
			{
				var remote_version, rt, script_name;
				
				rt=resp.responseText;
				remote_version=(/@version\s*(.*?)\s*$/m.exec(rt))[1];
				if(SUC_local_ver!=-1)
				{
					script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
					GM_setValue('SUC_target_script_name', script_name);
					if (remote_version > SUC_local_ver)
					{
						if ( document.getElementById("newsText")) {
							document.getElementById("newsText").innerHTML = "<p style=\"font-family:arial;color:red;font-size:22px;\"><b><u>There is an update available for the auto-hunt script! <a href=\"http://userscripts.org/scripts/source/82046.user.js\">Download</a> now!<u></b></p>";
						}
						if (forced)
						{
							alert('Update available for "'+script_name+'! Click on the link at the newsText near the hunt button to download."');
						}
					}
					else if (forced)
					{
						alert('No update is available for "'+script_name+'."');
					}
				}
			}
		});
	}
	catch (err)
	{
		if (forced)
			alert('An error occurred while checking for updates:\n'+err);
	}
}
GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
{
	updateCheck(true);
});
updateCheck(false);

/************ Ghost Monster & Hunting & Captcha *************/
var TitleOver = ""
if(document.getElementsByName("captcha_id")[0])
{
	var d = new Date();
	d.setMilliseconds(d.getMilliseconds() + 1800000);
	
	var mins = d.getMinutes();
	var secs = d.getSeconds();
		
	if (mins < 10)
	{mins = "0" + mins;}
	if (secs < 10)
	{secs = "0" + secs;}
	
	TitleOver = "Captcha - Auto refreshing at " + d.getHours() + ":" + mins + ":" + secs;
	setTimeout(function() {document.getElementsByName("captcha_id")[0].parentNode.submit();}, 1800000)
	//name = "captcha";
	//setTimeout(function() {document.forms.captcha.submit(); }, 1800000);
	
	
	//var forms = document.getElementsByTagName('form');
    //var formid = forms[3].id
    //setTimeout(function() {document.getElementById(formid).submit();}, 1800000);
}
else
{
	if (document.body.innerHTML.indexOf("<div class=\"dcReminder\">") != -1 && GM_getValue("GTSAH.AutoDC", false))
	{
		document.location = "http://www.ghost-trappers.com/fb/dc.php?dc_id=" + GM_getValue("GTSAH.DCID", 0).toString();
	}

	if (document.body.innerHTML.indexOf("Congratulations! Your reward has been added to your inventory!") != -1 && GM_getValue("GTSAH.AutoDC", false))
	{
		GM_setValue("GTSAH.AutoDC", false);
	}

	if (document.getElementsByClassName("gmButton gmActiveAssistButton")[0] && GM_getValue("GTSAH.AutoGM", true))
	{
		document.location = document.getElementsByClassName("gmButton gmActiveAssistButton")[0].parentNode
	}
	else if(GM_getValue("GTSAH.GMClose", false) && document.location != "http://www.ghost-trappers.com/fb/ghost_monster.php" && document.location.toString().indexOf("ghost_monster.php?") != -1 && document.location.toString().indexOf("test=") != -1 && document.getElementsByClassName("gmButton gmActiveAssistButton")[0] == null)
	{
		TitleOver = "Assisted Ghost Monster, closing tab in " + GM_getValue("GTSAH.GMCloseSecs", 6)  + " seconds."
		setTimeout(function() {window.close();} , GM_getValue("GTSAH.GMCloseSecs", 6) * 1000);
	}
	
	var linklocation = document.body.innerHTML.search(/hunt.php\?[a-zA-z]+=[0-9]+/);
	if(linklocation != -1)
	{ 
		if (document.getElementById('profile_whisky_quantity').textContent == "0")
		{
			document.title = "0 Magic Potions left! Please refill!";
		}
		else
		{
		if (document.getElementById('topHuntSeconds') != null)
			{
				var minutesid = document.getElementById('topHuntMinutes').innerHTML
				var secondsid = document.getElementById('topHuntSeconds').innerHTML
			} 
			else if (document.getElementById('topHuntMinutes') == null)
			{
				var minutesid = '0'
				var secondsid = '0'
			}
			minutes = parseInt(minutesid, 10);
			seconds = parseInt(secondsid, 10);
			//add 3-33 seconds onto refresh timer randomly (i hope)
			timeoutvalue = (minutes * 60 + seconds + Math.round((Math.random() * 5)) + 1) * 1000;
			  
			//Parse out c=XXX value
			link = document.getElementById('topHuntActive').firstElementChild.href  

			//alert(timeoutvalue + "; " + link);
			setTimeout(function() {document.location = link;} , timeoutvalue);
		}
	}
	
	if (GM_getValue("GTSAH.AutoGMPage", false) && document.location != "http://www.ghost-trappers.com/fb/ghost_monster.php")
	{
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://www.ghost-trappers.com/fb/ghost_monster.php',
			headers: {
				"Accept": "text/html",
				"Pragma": "no-cache",
				"Cache-Control": "no-cache"
			},
			onload: function(rD) {
				if (rD.responseText.indexOf("At the moment") == -1)
				{
					document.location = "http://www.ghost-trappers.com/fb/ghost_monster.php";
				}
			}
		});
		
	}
}
GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.jaryl.giantice.com/GhostMonster/link.txt',
     headers: {
 		"Accept": "text/html",
 		"Pragma": "no-cache",
 		"Cache-Control": "no-cache"
     },
     onload: function(rD) {
		GMHL = rD.responseText;
		if (GMHL != GM_getValue("GTSAH.GM", "") && GMHL != "")
		{
			if (GMHL.indexOf("&assist=1") == -1)
			{
				GMHL = GMHL + "&assist=1";
			}
			GM_xmlhttpRequest({
				method: 'GET',
				url: GMHL,
				headers: {
					'Accept': '*/*',
				},
			});
		}
	}
});
UpdateTitle()

/************************* Titles *************************/
var pt = document.location.toString().search(/\?type=/);
var ptt = "";
if (pt != -1)
{
	ptt = ": " + document.location.toString().substring(pt + "?type=".length, document.location.toString().length);
}
function UpdateTitle()
{
	if (TitleOver == ""){
		if (document.getElementById('topHuntMinutes') != null)
		{
			var minutesid = document.getElementById('topHuntMinutes').innerHTML
			var secondsid = document.getElementById('topHuntSeconds').innerHTML
		} 
		else if (document.getElementById('topHuntMinutes') == null)
		{
			var minutesid = '0'
			var secondsid = '0'
		}
		
		var mins = parseInt(minutesid, 10);
		var secs = parseInt(secondsid, 10);
		
		if (mins < 10)
		{mins = "0" + mins;}
		if (secs < 10)
		{secs = "0" + secs;}
		
		document.title = "| " + document.location.pathname.toString().replace("/ghost-trappers/", "").replace(".php", "") + ptt + " | Hunt: " + mins + ':' + secs + " | Potions: " + document.getElementById('profile_whisky_quantity').textContent + " |";
	}
	else
	{
		document.title = TitleOver
	}
	setTimeout(UpdateTitle, 1000);
}

/************************** Menus **************************/
function CreatePopupWindow(name, w, h, display)
{
	if (display == null) display = true;
	
	if (document.getElementById(name + '_Message') == null)
	{
		if (display)
		{
			var CloseButton = "<A HREF='#' ID='" + name + "_Close'><big><b>X</b></A>";
			var PopupWindow = document.createElement("div");
			
			var WindowPosition = "90px_300px"
			WindowPosition = WindowPosition.split("_");
			
			PopupWindow.style.position = 'absolute';
			PopupWindow.style.top = WindowPosition[0];
			PopupWindow.style.left = WindowPosition[1];	
			
			PopupWindow.id = name + "_Message";
			PopupWindow.innerHTML = "<DIV STYLE='position:absolute; z-index:100; background: white; padding: 0px 0px; color: black; border: 1px solid; font:10pt Verdana; width: " + w + "px; height: " + h + "px;'><DIV ID='" + name + "_Titlebar' STYLE='background: black; color: white; font-weight: bold'>&nbsp;" + name + " <DIV STYLE='position:absolute; right:0px; top: 0px'>" + CloseButton + "</DIV></DIV><DIV ID='" + name + "' STYLE='padding: 5px 5px; text-align: left; overflow: auto; height: " + (h - 26) + "px;'></DIV></DIV>";
			
			document.body.appendChild(PopupWindow);
			
			document.getElementById(name + '_Close').addEventListener("mousedown", function() { document.getElementById(name + '_Message').parentNode.removeChild(document.getElementById(name + '_Message')) }, false);
			
			return document.getElementById(name);
		}
	}
	else
	{
		document.getElementById(name + '_Message').parentNode.removeChild(document.getElementById(name + '_Message'));
	}
		
	return null;
}

function ShowConfigWindow(display)
{
	var ConfigWindow = CreatePopupWindow('Configuration', 275, 200, display);
	
	if (ConfigWindow != null)
	{
	  ConfigWindow.innerHTML = "<TABLE HEIGHT='100%'><TD STYLE='text-align: right; width: 100'></TD></TR><TR><TD WIDTH='200'>Auto Daily Reward</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Auto_Daily_Reward'></TD></TR><TR><TD WIDTH='200'>Daily Reward ID</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='text' STYLE='width: 65%' ID='Daily_Reward_ID'><A HREF='#' ID='Daily_Reward_ID_Help'> <big><b>?</b></A></TD></TR><TR><TD WIDTH='200'>Auto GM Assist</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Auto_GM_Assist'></TD><TD WIDTH='200'></TD></TR><TR><TD STYLE='text-align: right; width: 100'>Auto GM Page (Active)</TD><TD><INPUT TYPE='Checkbox' ID='Auto_GM_Page'></TD></TR><TR><TD WIDTH='200'>Auto GM Close</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Auto_GM_Close'></TD></TR><TR><TD WIDTH='200'>Auto GM Close Secs</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='text' STYLE='width: 65%' ID='Auto_GM_Close_Secs'></TD></TR></TABLE>";

		document.getElementById('Auto_Daily_Reward').checked = GM_getValue("GTSAH.AutoDC", false);
		document.getElementById('Daily_Reward_ID').value = GM_getValue("GTSAH.DCID", 0);
		document.getElementById('Auto_GM_Assist').checked = GM_getValue("GTSAH.AutoGM", true);
		document.getElementById('Auto_GM_Page').checked = GM_getValue("GTSAH.AutoGMPage", false);
		document.getElementById('Auto_GM_Close').checked = GM_getValue("GTSAH.GMClose", false);
		document.getElementById('Auto_GM_Close_Secs').value = GM_getValue("GTSAH.GMCloseSecs", 6);

		document.getElementById('Auto_Daily_Reward').addEventListener('click', function () { GM_setValue("GTSAH.AutoDC", !GM_getValue("GTSAH.AutoDC", false)); }, true);
		document.getElementById('Daily_Reward_ID').addEventListener('keyup', function () { if (document.getElementById('Daily_Reward_ID').value != "") {GM_setValue("GTSAH.DCID", document.getElementById('Daily_Reward_ID').value);} }, true);
		document.getElementById('Auto_GM_Assist').addEventListener('click', function () { GM_setValue("GTSAH.AutoGM", !GM_getValue("GTSAH.AutoGM", true)); }, true);
		document.getElementById('Auto_GM_Page').addEventListener('click', function () { GM_setValue("GTSAH.AutoGMPage", !GM_getValue("GTSAH.AutoGMPage", false)); }, true);
		document.getElementById('Auto_GM_Close').addEventListener('click', function () { GM_setValue("GTSAH.GMClose", !GM_getValue("GTSAH.GMClose", false)); }, true);
		document.getElementById('Auto_GM_Close_Secs').addEventListener('keyup', function () { if (document.getElementById('Auto_GM_Close_Secs').value != "") {GM_setValue("GTSAH.GMCloseSecs", document.getElementById('Auto_GM_Close_Secs').value);} }, true);
		document.getElementById('Daily_Reward_ID_Help').addEventListener("click", function() { alert('LIST OF DAILY REWARDS AND IDS\n-------------------------------\nCONTRACTS\n"Countess Wilhelmina" - 1\n"Selena Darkblade" - 2\n"Nurse Chapham" - 3\n"Lorelle TMF" - 4\n\nCOCKTAIL RECIPE\n"Midnight Rider" - 5\n"Midnight Smash" - 6\n\nCOMPANIONS\n"Ghost fox" - 7\n"Ghost owl" - 8\n-------------------------------'); }, false);
	}
}

	document.body.innerHTML = "<table width=\"100%\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tr><td height=\"4\"></td></tr><tr><td><td width=\"160\"></td><td><a href='#' id='Config_Open' class='config_open_btn'><em><b>Script Configuration</b></em></a></td></tr></table>" + document.body.innerHTML;
	document.getElementById('Config_Open').addEventListener("mousedown", ShowConfigWindow, false);

/*************************** Notes ***************************/
if (GM_getValue("GTSAH.LastNotes", 0) < GTSAH_Notes_Ver)
{
	alert("Notes:\n\n- The script configurations button will be located at the top of the page, just click the \"Script Configurations\" javascript hyperlink to open.\n- To use the auto closer on firefox, you must first goto \"about:config\" and edit \"dom.allow_scripts_to_close_windows\" to true.\n- Update alerter will be shown on the newsText below the hunt button\n- The title bar is now not working.\n- There is a COB bot also available for download, check my userscripts page.\n\nOnce you click \"Ok\", this notes box will not open again until there is a note update.\n\nScript Credits: iispyderii & Jaryl\nPlease give a review to this script if you can! :)");
	GM_setValue("GTSAH.LastNotes", GTSAH_Notes_Ver);
}
