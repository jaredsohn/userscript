// ==UserScript==
// @name           COB Helper
// @namespace      http://userscripts.org/users/119430
// @description    A helper for Chronicles of Blood
// @include        http://chronicles-of-blood.com/*
// @version        1.08
// @history        1.08 - Some bug fixes
// @history        1.07 - Fixed up auto-healing
// @history        1.06 - Fixed saying there is always an update
// @history        1.06 - Fixed attacking when you lost the battle
// @history        1.05 - Fixed not speed attacking on failed to encounter
// @history        1.04 - Added stop hunting on 0 bait
// @history        1.04 - Fixed doing actions when an action is being carried out
// @history        1.04 - Changed update hyperlink to open new tab/window
// @history        1.03 - Used "The Mentor"'s version
// @history        1.02 - Fixed auto healing not working
// @history        1.01 - Added auto healing
// @history        1.00 - Initial release
// ==/UserScript==
var SUC_local_ver = 1.08;
var COBH_Notes_Ver = 1;

/** SETTINGS (SOME IS IN A MENU OPENED BY A JAVASCRIPT HYPERLINK AT THE TOP OF THE PAGE!) **/
// No auto speed attack list (NOT CASE SENSITIVE!)
var noAutoAttack = new Array (
	//"Lord Of The Undead",
	//"necromancer"
)

/*********** MAIN SCRIPT (DO NOT TOUCH UNLESS YOU KNOW WHAT YOU ARE DOING!) ***********/
/********************* Update Checker *********************/
var SUC_script_num = 83791;
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
						if (document.getElementById("news0") != null)
						{
							document.getElementById("news0").innerHTML = "<p style=\"font-family:arial;color:red;font-size:24.2px;\"><b><u>There is an update available for the helper script! <a href=\"http://userscripts.org/scripts/source/" + SUC_script_num + ".user.js\" target=\"_blank\">Download</a> now!<u></b></p>";
						}
						if (forced)
						{
							alert('Update available for "'+script_name+'! Click on the link at the top of the frame to download."');
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

/******************** Reoccuring Timer ********************/
autoBattler();
function autoBattler()
{
	setTimeout(autoBattler, 1000);
	if (document.getElementById("loading") != null && document.getElementById("loading").style.display == "none")
	{
		if (document.getElementById("bloodlust") != null && document.getElementById("blood") != null)
		{
			if (GM_getValue("COBH.AutoHeal", true) && document.getElementById("qhealB") != null && document.getElementById("blood").getAttribute("value") < parseInt(GM_getValue("COBH.AutoHealHP", "100")))
			{
				fireEvent(document.getElementById("qhealB"), "click");
			}
			else
			{
				if (document.getElementById("combatRounds") != null && document.body.innerHTML.indexOf("won the combat.") == -1 && document.body.innerHTML.indexOf("Your hunt was unsuccessful") == -1)
				{
					if (GM_getValue("COBH.AutoSA", false) && !arrayContains(noAutoAttack, document.getElementById("combatRounds").textContent) && document.getElementById("skip") != null)
					{
						fireEvent(document.getElementById("skip"), "click");
					}
				}
				else
				{
					if (document.getElementById("bait") != null && document.getElementById("bait").children[0] != null)
					{
						if (GM_getValue("COBH.AutoHunt", true) && document.getElementById("hunt") != null && document.getElementById("bait").children[0].className != "img0" && document.getElementById("bloodlust").getAttribute("value") > 12)
						{
							fireEvent(document.getElementById("hunt"), "click");
						}
					}
				}
			}
		}
		
		if (GM_getValue("COBH.AutoBossAssist", true))
		{
			if(document.getElementsByClassName("shatterAssist")[0] != null)
			{
				fireEvent(document.getElementsByClassName("shatterAssist")[0], "click");
			}
			if(document.getElementsByClassName("click1Assist")[0] != null)
			{
				fireEvent(document.getElementsByClassName("click1Assist")[0], "click");
			}
			if(document.getElementsByClassName("click2Assist")[0] != null)
			{
				fireEvent(document.getElementsByClassName("click2Assist")[0], "click");
			}
		}
	}
}

function arrayContains(a, obj) {
  var i = a.length;
  while (i--) {
    if (obj.toLowerCase().indexOf(a[i].toLowerCase()) != -1) {
      return true;
    }
  }
  return false;
}

function fireEvent(element, event)
{
	if (document.createEventObject)
	{
		// dispatch for IE
		var evt = document.createEventObject();
		return element.fireEvent('on' + event, evt);
	}
	else
	{
		// dispatch for firefox + others
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent(event, true, true ); // event type,bubbling,cancelable
		return !element.dispatchEvent(evt);
	}
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
			PopupWindow.innerHTML = "<DIV STYLE='position:absolute; z-index:100; background: black; padding: 0px 0px; color: black; border: 1px solid; font:10pt Verdana; width: " + w + "px; height: " + h + "px;'><DIV ID='" + name + "_Titlebar' STYLE='background: white; color: black; font-weight: bold'>&nbsp;" + name + " <DIV STYLE='position:absolute; right:0px; top: 0px'>" + CloseButton + "</DIV></DIV><DIV ID='" + name + "' STYLE='padding: 5px 5px; text-align: left; overflow: auto; height: " + (h - 26) + "px;'></DIV></DIV>";
			
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
	var ConfigWindow = CreatePopupWindow('Configuration', 275, 230, display);
	
	if (ConfigWindow != null)
	{
	  ConfigWindow.innerHTML = "<TABLE HEIGHT='92.5%'><TD STYLE='text-align: right; width: 100'></TD></TR><TR><TD WIDTH='200'>Auto Hunt</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Auto_Hunt'></TD></TR><TR><TD WIDTH='200'>Auto Speed Attack</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Auto_Speed_Attack'></TD></TR><TR><TD WIDTH='200'>Auto Boss Assist</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Auto_Boss_Assist'></TD></TR><TR><TD WIDTH='200'>Auto Heal</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Checkbox' ID='Auto_Heal'></TD></TR><TR><TD WIDTH='200'>Auto Heal HP</TD><TD STYLE='text-align: right; width: 100'><INPUT TYPE='Text' ID='Auto_Heal_HP'></TD></TR></TABLE><b>Some settings are in the script</b>";

		document.getElementById('Auto_Hunt').checked = GM_getValue("COBH.AutoHunt", true);
		document.getElementById('Auto_Speed_Attack').checked = GM_getValue("COBH.AutoSA", false);
		document.getElementById('Auto_Boss_Assist').checked = GM_getValue("COBH.AutoBossAssist", true);
		document.getElementById('Auto_Heal').checked = GM_getValue("COBH.AutoHeal", true);
		document.getElementById('Auto_Heal_HP').value = GM_getValue("COBH.AutoHealHP", "100");
		//document.getElementById('Auto_SA_Ignore').value = GM_getValue("COBH.SAIgnore", "");

		document.getElementById('Auto_Hunt').addEventListener('click', function () { GM_setValue("COBH.AutoHunt", !GM_getValue("COBH.AutoHunt", true)); }, true);
		document.getElementById('Auto_Speed_Attack').addEventListener('click', function () { GM_setValue("COBH.AutoSA", !GM_getValue("COBH.AutoSA", false)); }, true);
		document.getElementById('Auto_Boss_Assist').addEventListener('click', function () { GM_setValue("COBH.AutoBossAssist", !GM_getValue("COBH.AutoBossAssist", true)); }, true);
		document.getElementById('Auto_Heal').addEventListener('click', function () { GM_setValue("COBH.AutoHeal", !GM_getValue("COBH.AutoHeal", true)); }, true);
		document.getElementById('Auto_Heal_HP').addEventListener('keyup', function () { GM_setValue("COBH.AutoHealHP", document.getElementById('Auto_Heal_HP').value); }, true);
		//document.getElementById('Auto_SA_Ignore').addEventListener('keyup', function () { GM_setValue("COBH.SAIgnore", document.getElementById('Auto_SA_Ignore').value); }, true);
	}
}

if (document.body != null)
{
	document.body.innerHTML = "<a href='#' id='Config_Open' class='config_open_btn'><em><b>Script Configuration</b></em></a>" + document.body.innerHTML;
	document.getElementById('Config_Open').addEventListener("mousedown", ShowConfigWindow, false);
}