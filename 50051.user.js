// Coup d'Group// version SIP
// created by CAVX
// various sections created or redone by littlerat and Sprool
// group customization by JimboMonkey1234
// 2009-04-09
// Copyright (c) 2005
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Coup d'Group ~ SIP", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Coup d'Group ~ SIP
// @namespace     http://www.bungie.net/fanclub/sip/Group/GroupHome.aspx
// @description   IMPORTANT: If this isn't working correctly for you, clear your cookies (Ctrl + Shift + Del). -- -- This script allows you to change your personal viewing experience of the group Spartan I Project.  Using this script, you can change how YOU see your own posts, but how you see moderators has been predetermined.  Not for use outside of SIP.
// @include       http://*bungie.net/fanclub/191711/*
// ==/UserScript==

var coupContainer = document.createElement("div");
coupContainer.id = "coupContainer";
coupContainer.innerHTML = " ";
var navDiv = document.getElementById("ctl00_dashboardNav_navigationMenuList");
document.body.appendChild(coupContainer);


var udv_UserData = [
    // [0]UserName, [1]UserTitle, [2]UserTitleColor, [3]UserBarImage, [4]UserBarBackgroundColor, [5]UserBarBorderColor, [6]UserPostColor, [7]UserAvatarImage, [8] OPTIONAL UserAvatarImageHeight
	['Luke35120', 'but a leaf on the wind', '#BBBBBB', '', '#103349', '#1B1D1F', '#BBBBBB', 'http://luke.theoreticalchaos.com/marathon_avatar.jpg']
// [0]UserName, [1]UserTitle, [2]UserTitleColor, [3]UserBarImage, [4]UserBarBackgroundColor, [5]UserBarBorderColor, [6]UserPostColor, [7]UserAvatarImage, OPTIONAL [8]UserAvatarImageHeight
	
];

function msUserSearch(lookingFor) {
	lookingFor = lookingFor.toLowerCase();
	//lookingFor = 'costlyaxis';
	lower = 0;
	upper = udv_UserData.length-1;
	found = false;
	middle = 0;
	while (lower < upper & !found) 
	{			
		//find middle

		middle = Math.floor((upper + lower) / 2);
		//alert(lower + " | " + middle + " | " + upper + "\n" + lookingFor + " : " + udv_UserData[lower][0] + " | " + udv_UserData[middle][0] + " | " + udv_UserData[upper][0]);
		if (lookingFor == udv_UserData[middle][0].toLowerCase()) 
		{
			found = true;
			answer = middle;
		} else if (lookingFor < udv_UserData[middle][0].toLowerCase()) {
			//search lower half of list
			upper = middle - 1;
		} else {
			lower = middle + 1;
		}					   
	}		
	if (lookingFor == udv_UserData[lower][0].toLowerCase())
	{
		answer = lower;
		found = true;
	} 
	
	if (found == true) {
		return answer;
	} else {
		return -1;
	}
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function addGlobalScript(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('script');
    style.innerHTML = css;
    head.appendChild(style);
}
function addExternalScript(css) {
    var top, script;
    top = document.getElementsByTagName('head')[0];
    if (!top) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = css;
    top.appendChild(script);

}
// User Defined Functions
function getCookie(uda_Name)
{
	var results = document.cookie.match(uda_Name + '=(.*?)(;|$)');
	if (results)
		return (unescape(results[1]));
	else
		return null;
}
function getFieldIndex(field) {
	var scriptSettingTitlesArray = ['stripRanked', 'stripColors', 'masterScript', 'userName', 'userTitle', 'userAvatar', 'siteBG', 'colorText', 'colorTitle', 'colorBarBorder', 'colorBarBG', 'imageBarBG'];
	fieldIndex = 0;
	while (fieldIndex < scriptSettingTitlesArray.length) {
		if (field == scriptSettingTitlesArray[fieldIndex]) {
			return fieldIndex;
		} else {
			fieldIndex ++;
		}
	}	
	return -1;	
}
function getOption(field) {
	
	if (getFieldIndex(field) >= 0) {
		var scriptSettings = String(getCookie('scriptSettings'));
		if (scriptSettings == 'null') {
			//defaults
			//scriptSettings = ",,,,,,,,,,,";	
		}
		
		scriptSettingsArray = scriptSettings.split(",");
		//get setting at fieldIndex
		return scriptSettingsArray[fieldIndex];
	}	
}
function setOption(field, data) {
	
	if ((fieldNo = getFieldIndex(field)) >= 0) {
		var scriptSettings = String(getCookie('scriptSettings'));
		if (scriptSettings == 'null') {
			scriptSettings = ",,,,,,,,,,,";	
		}
		scriptSettingsArray = scriptSettings.split(",");
		//set appropriate field;
		scriptSettingsArray[fieldNo] = data;
		//save new settings to cookie
		var exdate = new Date();
	    exdate.setDate(exdate.getDate() + 100);
		setCookieWithExpires('scriptSettings', scriptSettingsArray, exdate);
	}
		
}
function setCookieWithExpires(name, value, expires) {
	document.cookie = name + "=" + escape(value) + ";path=/;expires=" + expires.toUTCString();
}

if (getOption('masterScript') == "yes")
{
version = 406;
addExternalScript('http://cavx.bungiefans.org/scripts/coup/msupdate.php?version='+version+'');
// Master Script
// Created By: CAVX, Editing/Cookies: LittleRat, Optimizing: Sprool
//Extenders
Array.prototype.contains = function(uda_Element)
{
    for (var udv_I = 0; udv_I < this.length; udv_I++)
    {
        if (this[udv_I] === uda_Element)
        {
            return true;
        }
    }
    return false;
};

var udv_PosterIdArray = [];
var udv_PostElementArray = [];
var udv_UserAvatarElementArray = [];
var udv_DebugAlertCurrent = 1;
var udv_DisplayTitleBarImages = true;




function udf_Initialize()
{
    var udv_Debug = false;
    var udv_Style = document.createElement("style");
    udv_Style.type = "text/css";
    var udv_Script = document.createElement("script");
    udv_Script.language = "javascript";
    udv_Script.type = "text/javascript";
	udv_Script.innerHTML = "function udf_ToggleUserStyle(box, id) {" +
	                           "var found = false; var i = 0;" +
	                           "var oldCookie = String(getCookie('scriptBlockList'));" +
	                           "if (oldCookie == 'null') {" +
		                           "oldCookie = '';" +
	                           "};" +
	                           "var newCookie = oldCookie.split(',');" +

	                           "while (!found & i < newCookie.length) {" +
		                           "if (id == newCookie[i]) {" +
			                           "found = true;" +
		                           "} else { i ++ };" +
	                           "};" +

	                           "var exdate = new Date();" +
	                           "exdate.setDate(exdate.getDate() + 100);" +

	                           "if (box.checked) {" +
		                           "if (!found) {" +
			                           "newCookie.push(id);" +
			                           "setCookieWithExpires('scriptBlockList', newCookie, exdate);" +
		                           "};" +
	                           "} else {" +
		                           "arrStart = newCookie.slice(0,i);" +
		                           "arrFin = newCookie.slice(i+1,newCookie.length);" +
		                           "newCookie = arrStart.concat(arrFin);" +
		                           "setCookieWithExpires('scriptBlockList', newCookie, exdate);" +
	                           "}" +
	                       "}";
	document.getElementById("ctl00_Head1").appendChild(udv_Script);
    var udv_UserParseArray = [];
    var udv_ProfileAvatar = document.getElementById("ctl00_mainContent_imgSelectedAvatar");
    for (var udv_I = 1; udv_I < 26; udv_I++)
    {
        var udv_PostData_UserId;
        var udv_PostData_UserIdParsed;
        var udv_PostData_UserIdElement;
        var udv_PostData_UserBarElement;
        var udv_PostData_UserInfoElement;
        var udv_PostData_UserPostElement;
        var udv_PostData_UserTitleElement;
        var udv_PostData_UserAvatarElement;
        var udv_PostData_UserGamertagElement;
        var udv_PostElement = "";
        var udv_PosterId = "";
        var udv_PostId = "";
        if (udv_I.toString().length == 1) { udv_PostId = "0" + udv_I; }
        else { udv_PostId = udv_I; }
        if (udv_PostData_UserIdElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_usernameLink"))
        {
            udv_PostElementArray[udv_I - 1] = udv_PostData_UserIdElement;
            udv_PostData_UserId = udv_PostData_UserIdElement.innerHTML;
            udv_PosterIdArray[udv_I - 1] = udv_PostData_UserId;
            udv_PostData_UserBarElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_author_header");
            udv_PostData_UserInfoElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_userDiv");
            udv_PostData_UserPostElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_PostBlock");
            udv_PostData_UserTitleElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_UserTitleBlock");
            udv_PostData_UserAvatarElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_userAvatar");

            // Begin [Insert "Extra Info"] - Idea By Assassin073
            if (udv_PostData_UserGamertagElement = document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_gamertagLinkFloat"))
            {
                var udv_GamertagName = udv_PostData_UserGamertagElement.innerHTML;
                if (udv_GamertagName != "[none]")
                {
                    var udv_GamertagName = udv_PostData_UserGamertagElement.innerHTML;
                    udv_PostData_UserInfoElement.childNodes[1].innerHTML += "<li>" +
                                                                                "extra info: " + "<a href='http://www.bungie.net/Stats/Halo3/Default.aspx?player=" + udv_GamertagName + "'>Service Record</a> | <a href='http://www.bungie.net/stats/PlayerStatsHalo3.aspx?player=" + udv_GamertagName + "'>Career Stats</a> | <a href='http://www.bungie.net/stats/Halo3/FileShare.aspx?gamertag=" + udv_GamertagName + "'>File Share</a> | <a href='http://www.bungie.net/stats/PlayerStatsHalo3.aspx?player=" + udv_GamertagName + "'>Game History</a>" +
                                                                            "</li>";
                }
            }
            // End
        }
        		
		if (msUserSearch(String(udv_PostData_UserId)) >= 0) {				
		
			udv_J = answer;
            if (udv_PostData_UserId == udv_UserData[udv_J][0] && document.getElementById("ctl00_mainContent_postRepeater1_ctl" + udv_PostId + "_ctl00_postControl_skin_usernameLink"))
            {
				
                if (udv_Debug == true) { alert("User Settings Match: " + udv_PostData_UserId + "\r\nElement Title: " + udv_PostData_UserTitleElement.id + "\r\nUser Bar: " + udv_PostData_UserBarElement.id + "\r\nPost ID: " + udv_PostId); }
                udv_PostData_UserTitleElement.innerHTML = udv_UserData[udv_J][1];
                udv_PostData_UserIdParsed = udv_PostData_UserId.replace(/ /g, "__");
                udv_PostData_UserTitleElement.id = udv_PostData_UserIdParsed + "_UserTitleBlock";
                udv_PostData_UserBarElement.id = udv_PostData_UserIdParsed + "_author_header";
                udv_PostData_UserPostElement.id = udv_PostData_UserIdParsed + "_PostBlock";
                
                
                // Begin [Insert "Disable User Style" Check Box]
                var udv_Checked = "";
                var udv_DisabledStyleArray = getCookie("scriptBlockList");
				var showScript = true;
                if (udv_DisabledStyleArray != null)
                {
                    if (udv_DisabledStyleArray.split(',').contains(udv_PostData_UserIdParsed) == true) 
					{ 
						udv_Checked = "checked='checked'"; 
						showScript = false;
					} else { 
						udv_Checked = ""; 
						showScript = true;
					}
                }
                udv_PostData_UserInfoElement.childNodes[3].innerHTML += "<li>" +
                                                                            "<input id='UserStyleCheckBox_" + udv_PostData_UserIdParsed + "' type='checkbox' onchange='udf_ToggleUserStyle(this, \"" + udv_PostData_UserIdParsed + "\");' " + udv_Checked + " />" +
                                                                            "<label style='position: absolute; margin-top: 3px;' for='UserStyleCheckBox_" + udv_PostData_UserIdParsed + "'>Disable User Style</label>" +
                                                                        "</li>";
                // End
                
                if (showScript) {
					if (udv_UserData[udv_J][7] != "")
					{
						udv_PostData_UserAvatarElement.src = udv_UserData[udv_J][7];
						if (udv_UserData[udv_J][8])
						{
							udv_PostData_UserAvatarElement.style.height = ""+ udv_UserData[udv_J][8]+"px";
						}
						udv_UserAvatarElementArray[udv_I - 1] = udv_PostData_UserAvatarElement;
					}
					if (udv_UserParseArray.contains(udv_UserData[udv_J][0]) == false)
					{
						var Temp = "background: url(" + udv_UserData[udv_J][3] + ") !important;";
						if (udv_DisplayTitleBarImages == false)
						{
							Temp = "";
						}
						udv_Style.innerHTML += "#" + udv_PostData_UserIdParsed + "_UserTitleBlock { color: " + udv_UserData[udv_J][2] + " ! important; }\r\n";
						udv_Style.innerHTML += "#" + udv_PostData_UserIdParsed + "_author_header { " + Temp + " background-color: " + udv_UserData[udv_J][4] + " ! important; border: solid 1px " + udv_UserData[udv_J][5] + " ! important; }\r\n";
						udv_Style.innerHTML += "#" + udv_PostData_UserIdParsed + "_PostBlock { color: " + udv_UserData[udv_J][6] + " ! important; }\r\n";
						udv_UserParseArray[udv_J] = udv_PostData_UserId;
					}
				}
            }
        }
    }
    document.getElementById("ctl00_Head1").appendChild(udv_Style);
}

function IDA() //Insert Debug Alert
{
    if (arguments[0])
    {
        alert(udv_DebugAlertCurrent + " - C: " + arguments[0]);
    }
    else
    {
        alert(udv_DebugAlertCurrent);
    }
    udv_DebugAlertCurrent++;
}

function queryString(parameter)
{ 
  var loc = location.search.substring(1, location.search.length);
  var param_value = false;

  var params = loc.split("&");
  for (i=0; i<params.length;i++) {
      param_name = params[i].substring(0,params[i].indexOf('='));
      if (param_name == parameter) {
          param_value = params[i].substring(params[i].indexOf('=')+1)
      }
  }
  if (param_value) {
      return param_value;
  }
  else {
      return "";
  }
}

udf_Initialize();
}

var docURL = location.href;
var stripRankedChecked = "";
var stripColorsChecked = "";
var masterScriptChecked = "";
var userScreenName = "";
var userTitle = "";
var userAvatar = "";
var siteBG = "";
var colorText = "";
var colorTitle = "";
var colorBarBorder = "";
var colorBarBG = "";
var imageBarBG = "";
if (getOption('stripRanked') == "yes")
	stripRankedChecked = "checked='checked'";
if (getOption('stripColors') == "yes")
	stripColorsChecked = "checked='checked'";
if (getOption('masterScript') == "yes")
	masterScriptChecked = "checked='checked'";
if (getOption('userName') != undefined){
	userScreenName = getOption('userName');
	userTitle = getOption('userTitle');
	userAvatar = getOption('userAvatar');
	siteBG = getOption('siteBG');
	colorText = getOption('colorText');
	colorTitle = getOption('colorTitle');
	colorBarBorder = getOption('colorBarBorder');
	colorBarBG = getOption('colorBarBG');
	imageBarBG = getOption('imageBarBG');
}
function isOnMS() {
	//updates the form asking if the value in the username field is on the masterscript
	if (msUserSearch(document.getElementById("userName").value) >= 0) {
		isOn = "Is on the MasterScript";
		colour = 'green';
		msg = "This means that other people using this version of the script can see your colours";
	} else {
		colour = 'red';
		isOn = "Is not on the MasterScript";
		msg = "This means that other people using this version of the script can not see your colours";
	}
	document.getElementById("onTheScript").style.color = colour;
	document.getElementById("onTheScript").innerHTML = isOn + " (<a href='#' onClick='alert(\""+msg+"\")'>?</a>)";
}

var divArray0 = document.getElementsByTagName("div");
document.getElementById("coupContainer").innerHTML = document.getElementById("coupContainer").innerHTML+
"<div id='coupSettingDiv' style='z-index:500; position:absolute;top:145px;left:50%;margin-left:-458px;background:#000000; width:882px; padding:10px; border:1px solid #aaaaaa; display:none;'>"+
"	<div style='background:#000066; margin-left:-10px; margin-right:-10px;margin-top:-10px;padding:5px;'>"+
"		<a href='#' onclick='closeCoupConfig();' style='float:right;'>[X]</a>"+
"		<span style='float:left;'>Coup d'Bungie Settings</span>&nbsp;"+
"	</div>"+
"	<center>"+
"		Eliminate Elevated User Titles?<input type='checkbox' id='stripRanked' name='stripRanked' "+stripRankedChecked+"><br>"+
"		Strip Security Role Font Colors?<input type='checkbox' name='stripColors' id='stripColors' "+stripColorsChecked+"><br>"+
"		Enable Master Script?<input type='checkbox' name='masterScript' id='masterScript' "+masterScriptChecked+"><br>"+
"		<br>"+
"		<b>NOTE: Your settings here will not be seen by others.  The Master Script is only for admins and special users.  <br> Remember to enable it in the checkbox above.<br>"+
"		<br>"+
"		Your Bungie.net Username: <input name='userName' id='userName' value='"+getOption('userName')+"' type='text'  size=25> <span id='onTheScript'></span><br>"+
"		Desired Custom Title: <input name='userTitle' id='userTitle' value='"+userTitle+"' type='text'  size=31><br>"+
"		URL of Desired Avatar: <input name='userAvatar' id='userAvatar' value='"+userAvatar+"' type='text'  size=30><br>"+
"		<br>"+
"		(optional) Custom Website Background Image URL:<br>"+
"		<input name='siteBG' id='siteBG' value='"+siteBG+"' type='text'  size=53><br>"+
"		<br>"+
"		The following color choices require hex codes <a href='http://www.developingwebs.net/tools/color.php' target='_blank'>[hex code generator]</a>:<br>"+
"		Text Color: # <input name='colorText' id='colorText' value='"+colorText+"' type='text'  size=6><br>"+
"		Title Color: # <input name='colorTitle' id='colorTitle' value='"+colorTitle+"' type='text'  size=6><br>"+
"		Title Bar Border Color: # <input name='colorBarBorder' id='colorBarBorder' value='"+colorBarBorder+"' type='text'  size=6><br>"+
"		Title Bar Background Color: # <input name='colorBarBG' id='colorBarBG' value='"+colorBarBG+"' type='text'  size=6><br>"+
"		(optional) Title Bar Background Image URL: <input name='imageBarBG' id='imageBarBG' value='"+imageBarBG+"' type='text'  size=30><br>"+
"		<br>"+
"		<br>"+
"		<a id='theButtonCoup' href='#'>[Save Settings]</a><br>"+
"	</center>"+
"</div> ";
isOnMS();


function reConfig()
{
document.getElementById("coupSettingDiv").style.display = "";
document.getElementById("userName").addEventListener('keyup', function(event3) {
	isOnMS();
}, false);
document.getElementById("theButtonCoup").addEventListener('click', function(event2) {
	if (document.getElementById("stripRanked").checked)
	setOption("stripRanked", "yes");
	else
	setOption("stripRanked", "no");
	if (document.getElementById("stripColors").checked)
	setOption("stripColors", "yes");
	else
	setOption("stripColors", "no");
	if (document.getElementById("masterScript").checked)
	setOption("masterScript", "yes");
	else
	setOption("masterScript", "no");

	setOption("userName", document.getElementById('userName').value);
	setOption("userTitle", document.getElementById('userTitle').value);
	setOption("userAvatar", document.getElementById('userAvatar').value);
	setOption("siteBG", document.getElementById('siteBG').value);
	setOption("colorText", document.getElementById('colorText').value);
	setOption("colorTitle", document.getElementById('colorTitle').value);
	setOption("colorBarBorder", document.getElementById('colorBarBorder').value);
	setOption("colorBarBG", document.getElementById('colorBarBG').value);
	setOption("imageBarBG", document.getElementById('imageBarBG').value);
location.reload(true);
}, true);

}
addGlobalScript(
'function closeCoupConfig()'+
'{'+
'document.getElementById("coupSettingDiv").style.display = "none";'+
'}');
if (getOption("userName") != undefined)
{
	if (getOption("siteBG") != "")
	{
	addGlobalStyle(
	'body {' +
	'background: #000 url('+getOption("siteBG")+') fixed repeat 	! important;' +
	'}');
	}
	if (getOption("stripColors") == "yes")
	{
	addGlobalStyle(
	'.author_header_block {' +
	'  background-color:#27282C ! important;' +
	'  border: none ! important;' +
	'}' +
	'.forumpost p {' +
	'  color: #bbbbbb ! important;' +
	'}' +
	'.title {' +
	'  color: #bbbbbb ! important;' +
	'}');
	}
	if (getOption("imageBarBG") != "")
	{
	addGlobalStyle(
	'#userpostings {' +
	'background:url('+getOption("imageBarBG")+') repeat ! important;' +
	'}');
	}
}

addGlobalStyle(
'#updateCoup img  {background:url(http://i208.photobucket.com/albums/bb114/CavAvx/coupupdate.jpg) top no-repeat;}' +
'#updateCoup img:hover {background:url(http://i208.photobucket.com/albums/bb114/CavAvx/coupupdate_h.jpg) top no-repeat;}'+
'#updateCoup {position:absolute;top:46px;left:50%; margin-left:366px;}'+
'#wrenchCoup img  {background:url(http://i208.photobucket.com/albums/bb114/CavAvx/coupsettings.jpg) top no-repeat;}' +
'#wrenchCoup img:hover {background:url(http://i208.photobucket.com/albums/bb114/CavAvx/coupsettings_h.jpg) top no-repeat;}'+
'#wrenchCoup {position:absolute;top:33px;left:50%; margin-left:366px;}'+
'#userpostings {' +
'background-color: #'+colorBarBG+' ! important;'+
'border-color: #'+colorBarBorder+' ! important;'+
'border-style:solid ! important;border-width:1px ! important;' +
'}' +
'#usercontent {' +
'  color: #'+getOption("colorText")+' ! important;' +
'}');

function fixPageErrors()
	{
	var divArray = document.getElementsByTagName("div");
	for (var i = 0; i<divArray.length; i++)
	{
		if(divArray[i].getAttribute("class") == "block-a")
			{
			if(!(divArray[i].innerHTML.match(/<h5><strong>Topic not found.<.strong><.h5>/gi))){}
			else
				{
				var pageExtract = document.URL.split(/[=|#]/i);
				var q = pageExtract.length-1;
				var r = q-1;
				if (pageExtract[q] == "end") {newpage = pageExtract[r]-1;}
				else {newpage = pageExtract[q]-1;}
				newURL = document.URL.replace(/p=[0-9]+/gi, "p="+newpage);
				window.location = newURL
				}
			}
		}
	}
timeto = fixPageErrors();
document.getElementById("coupContainer").innerHTML = document.getElementById("coupContainer").innerHTML+"</div> <div><a href='#' id='wrenchCoup'><img src='http://www.bungie.net/images/spacer.gif' width='66' height='11'></a>";

document.getElementById("wrenchCoup").addEventListener('click',reConfig, true);

function getdivHTML(){
var divArray = document.getElementsByTagName("div");
for (var i = 0; i<divArray.length; i++){
	if(divArray[i].getAttribute("class") == "list-db"){
		if(!(divArray[i].innerHTML.match(/img id=.*?dashboardAvatar/gi))){}
		else{
			divArray[i].innerHTML =  divArray[i].innerHTML.replace(/a href=.*?dashboardAvatar.*?><.a/gi, "a href='/Account/Profile.aspx' ><img src='"+getOption("userAvatar")+"' style='border-style:None;height:64px;width:64px;border-width:0px;'/></a");
	}
	}
var coupRegex = new RegExp(">"+getOption("userName")+"<.a><.li>", 'gi');
	if(divArray[i].getAttribute("class") == "forumpost"){
		if(!(divArray[i].innerHTML.match(coupRegex))){
		if (getOption("stripRanked") == "yes")			
		{
		if((divArray[i].innerHTML.match(/<li id=.* class=.title.>.*Member.*<.li>/i))){
				divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<li id=.* class=.title.>((Heroic)|(Legendary)|(Mythic)) Member<.li>/gi, "<li class='title'>Member</li>");
				divArray[i].innerHTML =  divArray[i].innerHTML.replace(/background-color/gi, "null");
			}
		}
			}
		else{
			divArray[i].innerHTML = divArray[i].innerHTML.replace(/div class=.forumavatar.>[\s\S]*style=.*><.a>[\s\S][\s\S]?<.div/gi, "div class='forumavatar'><a href='/Account/Profile.aspx'><img src='"+getOption("userAvatar")+"' style='height:90px;width:90px;border-width:0px;'/></a></div");
			divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<ul id=.* class=.author_header_block./gi, "<ul id='userpostings' class='author_header_block'");
			divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<li id=.* class=.title.*>.*<.li>/gi, "<li class='title' style='color:#"+getOption("colorTitle")+" ! important;'>"+getOption("userTitle")+"</li>");
			divArray[i].innerHTML =  divArray[i].innerHTML.replace(/<p id=.*postControl_skin_PostBlock./gi, "<p id='usercontent'");
	}
	}
}
}
whatsup = getdivHTML();


if (getOption('userName') == ''){
	reConfig();
}


//
// o hai
// wat r u doin in hear
// r u messin with mai script
//
//