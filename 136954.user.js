// ==UserScript==
// @name           Semi Arj
// @namespace      Shane Graham, Corruptsource.ca
// @description    Semi-Auto raid joiner for http://www.outwar.com
// @include        http://*corruptsource.ca/*Semi_Arj.php
// @include        http://*outwar.com/*
// ==/UserScript==

/* Sections are used for quick finding code sections.
 * To quick find the section press your find button (normally ctrl + f)
 * Then Type in the "Semi-(section)"
 * Section		Explination
 * 1.			Crew_Select event listener on change
 * 2.			tab click event handler for start raid
 * 3.			tab click event handler for join raid
 * 4.			Outwar Cookie retrieving function
 * 5.			remove duplicate entry from array function
 * 6.			unescape converter
 * 7.			string logger function Log(String string) > logs string in div_log
 * 8.			Scroll bottom function make sure Div_Log is always showing newest data
 * 9.			Split ccounts function > Parses data for chacters nd adds to a array
 * 10.			function that gets current raids formed in the specified crew.
 * 11.			Starts the raid process to allow users to start entering captchas
 * 12.			Function that gets currently spawned bosses.
 * 13. 			Function that gives server character informtion to be parced into a array
 * 14.			Function that forms a new boss spawn raid
 * 15. 			Main program start functions
 */


var Version = "2.0.0.0";

var started = false;
var Characters;
var Crew;
var last_Boss;
var crewRaidExtras;
var crewRaidFormer;
var Bosses = new Array;
var raidAccounts = new Array;
var timeoutRaids;
var raidResultsTimer;
var Former = 0;
var curLocation = unsafeWindow.location.host.split(".")[1];
var challenge_key = "6LcZ-AAAAAAAANX-xwVtzow1f4RpSrbSViRUx9Js";
var recaptcha_server = "http://www.google.com/recaptcha/api/";
var demo = false;
var charOffSet = 0;
var charsAt = 0;
var loadChars = 7;

if(curLocation == "outwar")
{
	GM_setValue("Outwar_Cookie", document.cookie);	
}



/*
 * Stand alone Event ListenersW
 * The following information is all the stand alone event listeners.
 * Including:
 * Crew Select selction box change
 * tab switch click (start raid and join raid)
 */
//Section: Semi-1
document.getElementById("Crew_Select").addEventListener("change", function () {
	Crew = document.getElementById("Crew_Select");
	Raider = document.getElementById("Raid_Former");
	if(Crew.value != "")
	{
		unsafeWindow.$("#Char_Table").html("<tbody><tr style=\"background-color:#666;\" ><th>&nbsp;</th><th style=\"width:25px;overflow:auto;\">Name</th><th>Level</th><th width=\"15px\">&nbsp;</th></tr></tbody>");
		unsafeWindow.$("#Raid_Former").html("");
		for(var i in Characters)
		{
			if(unescapeHTML(Characters[i].crew) == Crew.value)
			{
				unsafeWindow.$("#Char_Table tr:last").after("<tr><td><input type=\"checkbox\" id=\"chkRaid_" + Characters[i].suid + "\" \></td><td><div id=\"name_" + Characters[i].suid + "\" style=\"width:120px;overflow:auto;color:#000;\">" + Characters[i].name + "</div></td><td style=\"color:#000;\">" + Characters[i].level + "</td><td><img src=\"\" id=\"status_" + Characters[i].suid + "\" width=\"15px\" height=\"15px\" /></td></tr>");
				unsafeWindow.$('#Raid_Former').append("<option value=\"" + Characters[i].suid + "\">" + Characters[i].name + "</option>");
			}
		}			
	}
	getRaidsUp(Raider.value);
}, false);

document.getElementById("Raid_Former").addEventListener("change", function () {
	setWorld();
}, false);

function KeyCheck(e)
{
	if(e.keyCode == 13)
	{
		var Account = document.getElementById("recaptcha_Account");
		raidAccounts[Account.value].recaptcha_response_field = this.value;
		submitCaptcha();
	}
}

document.getElementById("recaptcha_response_field").addEventListener('keydown', KeyCheck, true);

//Section: Semi-2
document.getElementById("Start_Raid").addEventListener("click", function () {
var className = unsafeWindow.$('#Start_Raid').attr('class');
if(className == "tab")
{

}

	
}, false);

 //Section: Semi-3
document.getElementById("Join_Raid").addEventListener("click", function () {
	var className = unsafeWindow.$('#Join_Raid').attr('class');
	if(className == "tab")
	{

	}
	
}, false);

document.getElementById("refresh_Raids").addEventListener("click", function () {
	Raider = document.getElementById("Raid_Former");
	getRaidsUp(Raider.value);
}, false);

document.getElementById("launch_raid").addEventListener("click", function () {
	if(started == true)
	{
		Launch();
	}
}, false);

//Section: Semi-4
//This secion of code gets outwar cookie inforation
function getOutwarCookie(c_name)
{
	var i,x,y,ARRcookies=Outwar_Cookie.split(";");
	for (i=0;i<ARRcookies.length;i++)
	{
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name)
		{
			return unescape(y);
		}
	}
}

//Section: Semi-5.0
//Adds new uniqueArr values to temp array
function uniqueArr(a) {
 temp = new Array();
 for(i=0;i<a.length;i++){
  if(!contains(temp, a[i])){
   temp.length+=1;
   temp[temp.length-1]=a[i];
  }
 }
 return temp;
}
//Section: Semi-5.1
//Will check for the Uniqueness
function contains(a, e) {
 for(j=0;j<a.length;j++)if(a[j]==e)return true;
 return false;
}

//Section: Semi-6
//this converts ll unescape html to there original characters
function unescapeHTML(html) {
    return unsafeWindow.$("<div />").html(html).text();
}

//Section: Semi-7
//this function logs string in the log div in the top right
function Log(str)
{
	var currentDate = new Date()

	unsafeWindow.$('#Log_Div').append("<div>[" + currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds() + "] " + str + "</div>");
	ScrollBottom("Log_Div")
}

//Section: Semi-8
// this is used to scroll the div log to the bottom
function ScrollBottom(divid)
{
	var objDiv = document.getElementById(divid);
	objDiv.scrollTop = objDiv.scrollHeight;
}


//Section: Semi-9
// this gets all the character information for the 
//rampid gaming account and turns it and returns it as array
function splitAccounts(strHTML)
{
	Log("Getting account information...");
	var data = new Array;
	var parcedData = new Array;
	var crews = new Array;
	parcedData = strHTML.split('<font color="#FFFF00" face="Verdana, Arial, Helvetica, sans-serif" size="1">');
	
	for(var i  = 1; i < parcedData.length; i++)
	{
		pattern = /<b>(.*?)<\/b>/g;
		matches = parcedData[i].match(pattern);
		var name = matches[0].replace("<b>", "");
		var level = matches[1].replace("<b>", "");
		var crew = matches[2].replace("<b>", "");
		name = name.replace("</b>", "");
		level = level.replace("</b>", "");
		crew = crew.replace("</b>", "");
		pattern = /suid=(.*?)&serverid/;
		matches = parcedData[i].match(pattern);
		var suid = matches[0].replace("suid=", "");
		suid = suid.replace("&serverid", "");
		
		if(demo == false) var jsonData = unsafeWindow.jQuery.parseJSON('{ "name": "' + name + '", "level": "' + level + '", "crew": "' + crew + '", "suid": "' + suid + '" }');
		else var jsonData = unsafeWindow.jQuery.parseJSON('{ "name": "Hidden", "level": "Hidden", "crew": "' + crew + '", "suid": "' + suid + '" }');
		data.push(jsonData);
		if(crew != "")
		{
			crews.push(crew);
		}
		
		
	}
	
	crews = uniqueArr(crews);
	
	for( var i in crews )
	{
		if(demo == false) unsafeWindow.$('#Crew_Select').append("<option value=\"" + crews[i] + "\">" + crews[i] + "</option>");
		else unsafeWindow.$('#Crew_Select').append("<option value=\"" + crews[i] + "\">Hidden</option>");
	}	
	
	return data;
	
}


//Section: Semi-10
//this function gets the current raids formed for the users crew
function getRaidsUp(Raider)
{
	Crew = document.getElementById("Crew_Select");
    if(demo == false) Log("Getting Currently Formed Raids For " + Crew.value + "...");
	else Log("Getting Currently Formed Raids For Hidden Crew...");
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/crew_raidsforming.php?suid=" + Raider,
		headers: {
		"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {
			var data = response.responseText;
			raid_pattern = /joinraid(.*?)<\/td>/g;
			former_pattern = /<td><a href="profile.php\?id=(.*?)<\/a><\/td>/g;
			Raid = data.match(raid_pattern);
			Former = data.match(former_pattern);
			unsafeWindow.$('#Cur_Raid').html("");		

			for(var i in Raid)
			{
				Raid_Link = Raid[i].split("\"><b>")[0].replace("joinraid.php", "");
				Raid_Name = Raid[i].split("\"><b>")[1].replace("</b></a></td>", "");
				Former_id = Former[i].split("\">")[0].replace("<td><a href=\"profile.php?id=", "");
				Former_Name = Former[i].split("\">")[1].replace("</a></td>", "");
				unsafeWindow.$('#Cur_Raid').append("<div id=\"Raid_" + i + "\" class=\"Raid\" title=\"" + Raid_Link + "|" + Former_id + "\"><span title=\"Former: " + Former_Name + "\">" + Raid_Name + "</span></div>");
				document.getElementById("Raid_" + i).addEventListener("click", function () {
					raidInfo = this.title.split("|");
					raid_extras = raidInfo[0];
					raid_former = raidInfo[1];
					started = false;
					startRaid(raid_extras, raid_former);
				}, false);

			
			}
			setWorld();
		}
	});
	
}

function getRaidIdFromSuid(suid)
{
	for(var i in raidAccounts)
	{
		if(raidAccounts[i].suid == suid)
		{
			return i;
		}
	}
	return false;
}

function getCharIdFromSuid(suid)
{
	for(var i in Characters)
	{
		if(Characters[i].suid == suid)
		{
			return i;
		}
	}
}

function refreshRaid(raidExtras, raidFormer)
{
	GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.outwar.com/raidmembers.php" + raidExtras.split("&")[0],
	headers: {
	"Accept": "text/xml"            // If not specified, browser defaults will be used.
	},
		onload: function(response) {
			var data = response.responseText;
			pattern = /"profile.php\?id=(.*?)"/g;
			matches = data.match(pattern);	
			for(var i in matches)
			{
				var profileId = matches[i].replace("\"profile.php?id=", "").replace("\"", "");
				if(document.getElementById("status_" + profileId))
				{
					if(document.getElementById("status_" + profileId).src != "http://outwar.corruptsource.ca/images/Knobs/success.png")
					{
						document.getElementById("status_" + profileId).src = "/images/Knobs/success.png";
						Log(Characters[getCharIdFromSuid(profileId)].name + " Has been joined.");
						if(raidAccounts[getRaidIdFromSuid(profileId)])
							raidAccounts[getRaidIdFromSuid(profileId)].status = "Joined";	
					}
				}
			}
		}
	});	
}

var readyTicker = {
    init: function() { readyTicker.play();},
    pause: function() { clearTimeout(timeoutRaids); }, 
    play: function() { 
			 timeoutRaids = setTimeout( function() {				
				refreshRaid(crewRaidExtras, crewRaidFormer);
				readyTicker.play();
			}, 1000 ); 
		}
	};
	
var launchTicker = {
    init: function() { readyTicker.play();},
    pause: function() { clearTimeout(launchRaids); }, 
    play: function() { 
			 launchRaids = setTimeout( function() {				
				checkLaunch();
				launchTicker.play();
			}, 2000 ); 
		}
	};	
	
	
var raidResultsTicker = {
    init: function() { raidResultsTicker.play(); Log("Waiting for Raid results..."); },
    pause: function() { clearTimeout(raidResultsTimer); }, 
    play: function() { 
			 raidResultsTimer = setTimeout( function() {				
				getRaidResults(crewRaidExtras, crewRaidFormer);
				raidResultsTicker.play();
			}, 1000 ); 
		}
	};
	
function getRaidResults(crewRaidExtras, crewRaidFormer)
{
	
	GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.outwar.com/raidattack.php" + crewRaidExtras.split("&")[0],
	headers: {
	"Accept": "text/xml"            // If not specified, browser defaults will be used.
	},
		onload: function(response) {
			var data = response.responseText;
			var hits = 0;
			if(data.indexOf("This mob has already been defeated or you have selected an invalid raid") == -1)
			{
				pattern = /<font color=\"#FF9900\"> (.*?)<\/b>/g;
				matches = data.match(pattern);				
				for(var i in matches)
				{
					var hit = matches[i].replace("<font color=\"#FF9900\"> ", "").replace("</b>", "").replace(",", "");
					hits += parseInt(hit);
				}
				Raider = document.getElementById("Raid_Former");
				getRaidsUp(Raider.value);
				if(data.indexOf("has lost!") > -1) 
				{
					Log("You have <font color=red>LOST</font> this raid dealing <font color=red>" + hits + "</font> damage");
					if(unsafeWindow.$('#auto_reform:checked').val() == "on") formRaid(last_Boss);
				}
				else if(data.indexOf("has won!") > -1) Log("You have <font color=green>WON</font> this raid dealing <font color=red>" + hits + "</font> damage");
				raidResultsTicker.pause();
			}
		}
	});	
}

//Section: Semi-11
//this starts the raid process
function startRaid (raidExtras, raidFormer)
{
	readyTicker.pause();
	raidResultsTicker.pause();	
	launchTicker.play();
	readyTicker.init();		
	crewRaidExtras = raidExtras;
	crewRaidFormer = raidFormer;
	charOffSet = 0;
	charsAt = 0;
	raidAccounts = new Array;
	Crew = document.getElementById("Crew_Select");
	var accounts = 0;
	for(var i in Characters)
	{
		if(unescapeHTML(Characters[i].crew) == Crew.value)
		{
			var chkRaid = document.getElementById("chkRaid_" + Characters[i].suid);
			document.getElementById("status_" + Characters[i].suid).src = "";
			if(chkRaid.checked == true)
			{
				accounts++;
				var jsonData = unsafeWindow.jQuery.parseJSON('{' +
				' "name": "' + Characters[i].name + '",' +
				' "suid": "' + Characters[i].suid + '",' +
				' "recaptcha_response_field": "",' +
				' "recaptcha_challenge_field": "",' +
				' "extras": "",' +
				' "status": "",' +
				' "codeid": ""' +
				' }');
				raidAccounts.push(jsonData);
			}			
		}
	}	
	GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.outwar.com/raidmembers.php" + raidExtras.split("&")[0],
	headers: {
	"Accept": "text/xml"            // If not specified, browser defaults will be used.
	},
		onload: function(response) {
			var data = response.responseText;
			pattern = /"profile.php\?id=(.*?)"/g;
			matches = data.match(pattern);	
			for(var i in matches)
			{
				var profileId = matches[i].replace("\"profile.php?id=", "").replace("\"", "");
				if(document.getElementById("status_" + profileId))
				{
					document.getElementById("status_" + profileId).src = "/images/Knobs/success.png";
					Log(Characters[getCharIdFromSuid(profileId)].name + " Has already been joined.");
					if(raidAccounts[getRaidIdFromSuid(profileId)])
						raidAccounts[getRaidIdFromSuid(profileId)].status = "Joined";	
				}
			}
			
			
			Log(accounts + " Accounts Queued to be joined.");
			if(raidAccounts.length > 0)
			{
				for(var i in raidAccounts)
				{
					if(raidAccounts[i].status != "Joined")
					{
						getCaptchaInfo(i, raidExtras, raidFormer);
						charOffSet++;
						//if(charOffSet >= loadChars) i = raidAccounts.length();
					}
				}
			} else {
				Log("Please select atleast 1 account to join to the raid.");	
			}
			
		}
	});	
	
}

function submitCaptcha()
{
	var Account = document.getElementById("recaptcha_Account").value;
	var RaidStatus = document.getElementById("status_" + raidAccounts[Account].suid);
	raidAccounts[Account].status = "joined";
	RaidStatus.src = "http://quiver.outwar.com/images/ajax-loader.gif";	
	//var postVars = "recaptcha_challenge_field=" + raidAccounts[Account].recaptcha_challenge_field + "&recaptcha_response_field=" + raidAccounts[Account].recaptcha_response_field + "&codeid=" + raidAccounts[Account].codeid + "&submit=Launch%21"
	var postVars = "joinraid=1";
	
	GM_xmlhttpRequest({
	method: "POST",
	url: "http://www.outwar.com/joinraid.php" + crewRaidExtras + "&suid=" + raidAccounts[Account].suid,
	data: postVars,
	headers: {
	"Content-Type":	"application/x-www-form-urlencoded",
	"referer": "http://www.outwar.com/"
	},
	onload: function(response) {	
		var data = response.responseText;	
		if(data.indexOf("incorrect-captcha-sol") < 0)
		{
			//checkLaunch();
			Log(raidAccounts[Account].name + " Has been joined.");
			RaidStatus.src = "/images/Knobs/success.png";
			raidAccounts[AccountID].status = "Joined";				
		}
		else
		{
			Log("Invalid captcha for" + raidAccounts[Account].name + ".");
			raidAccounts[Account].status = "";
			getCaptchaInfo(Account, crewRaidExtras, crewRaidFormer);
		}
	}});
	joinAccounts("");

}

function Launch()
{
	var Captcha_Image = document.getElementById("captcha_image");
	var Responce = document.getElementById("recaptcha_response_field");
	Responce.value = "";
	Captcha_Image.data = "";

	GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.outwar.com/joinraid.php" + crewRaidExtras.split("&")[0] + "&launchraid=yes&x=159&y=26&suid=" + crewRaidFormer,
	headers: {
	"Accept": "text/xml"            // If not specified, browser defaults will be used.
	},
	onload: function(response) {
		
		var data = response.responseText;
		
		if(data.indexOf("<img src=\"/images/errorz.jpg\" />") > -1)
		{
			
			var captchaData = response.responseText;
			pattern = /color="#000000">(.*?)<\/font>/g;
			matches = captchaData.match(pattern)[0].replace("color=\"#000000\">", "").replace("</font>", "");
			Log("Error Launching: " + "http://www.outwar.com/formraid.php" + crewRaidExtras + "&launchraid=yes&suid=" + crewRaidFormer);
			readyTicker.pause();
			joinAccounts("");
		}
		else
		{
			Raider = document.getElementById("Raid_Former");
			getRaidsUp(Raider.value);
			Log("Raid has been Launched!");
			raidResultsTicker.init();
			readyTicker.pause();
			started = true;
		}
		
		launchTicker.pause();
		
	}});
}

function checkLaunch()
{
	charsAt++;
	if(charsAt >= charOffSet - 2 && charOffSet != raidAccounts.length)
	{
		var tempCount = 0;
		for(var i = charOffSet + 1; i < raidAccounts.length; i++)
		{
			getCaptchaInfo(i, crewRaidExtras, crewRaidFormer);
			tempCount++;
			charOffSet = i;
			if(tempCount >= loadChars) 
			{				
				i = raidAccounts.length;
			}
		}
	}
	for(var i in raidAccounts)
	{
		if (raidAccounts[i].status == "ready" || raidAccounts[i].status == "" || unsafeWindow.$('#auto_launch:checked').val() != "on")
		{
			return false;
		}
	}	
	
	Launch();	
}

function getCaptchaInfo(AccountID, raidExtras, raidFormer) 
{
	var RaidStatus = document.getElementById("status_" + raidAccounts[AccountID].suid);
	if(raidFormer == raidAccounts[AccountID].suid)
	{
		RaidStatus.src = "/images/Knobs/success.png";	
		raidAccounts[AccountID].status = "Joined";	
		Log(raidAccounts[AccountID].name + " is the Raid Former.");
	}
	else
	{
		RaidStatus.src = "http://quiver.outwar.com/images/ajax-loader.gif";	
		GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/joinraid.php" + raidExtras + "&suid=" + raidAccounts[AccountID].suid,
		headers: {
		"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
			onload: function(response) {
				
				var data = response.responseText;
	
				RaidStatus.src = "/images/Knobs/info.png";								
				raidAccounts[AccountID].status = "ready";
				joinAccounts("start");	
				
				var inCounter = 0;
				for(i = 0; i < raidAccounts.length; i++)
				{
					if(raidAccounts[i].status == "ready")
					{
						inCounter++;
						
					}									
				}
				if(inCounter == 1)
				{
					joinAccounts("");
				}				
														
				
			}
		});	
	}
}

function joinAccounts(str)
{
	for(var i in raidAccounts)
	{
		if (raidAccounts[i].status == "ready")
		{
			if(str == "start" && started == false || str == "" && started == true)
			{
				joinAccount(i);
				started = true;
			}
			return false;
		}
	}
	for(var i in raidAccounts)
	{
		if (raidAccounts[i].status != "Error" && raidAccounts[i].status != "Joined" )
		{
			joinTimeout(i);
			return false;
		}
	}	
}

function joinTimeout(AccountID)
{
	if (raidAccounts[AccountID].status == "ready")
	{
		joinAccounts(AccountID);
		return false;
	}
	for(var i in raidAccounts)
	{
		var t=setTimeout(function(){joinTimeout(i)},1000);
		return false;
	}	

}

function joinAccount(AccountID)
{
	var Account = document.getElementById("recaptcha_Account");
	Account.value = AccountID;
	submitCaptcha();
}

//Section: Semi-12
//gets all the currently spawned raid bosses
function setBosses()
{	
	
	Log("Getting Current Spawned Bosses");
	unsafeWindow.$('#New_Raid').html("");	
	GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.outwar.com/crew_bossspawns.php",
	headers: {
	"Accept": "text/xml"            // If not specified, browser defaults will be used.
	},
		onload: function(response) {
			
			var data = response.responseText;
			pattern = /target=(.*?)<\/b>'/g;
			matches = data.match(pattern);
			for(var i in matches)
			{
				tempbosses = matches[i].replace("\" ONMOUSEOVER=\"popup(event,'<b>", "|");
				tempbosses = tempbosses.replace("</b>'", "");
				tempbosses = tempbosses.replace("target=", "");
				var BossID = tempbosses.split("|")[0];
				var BossName = tempbosses.split("|")[1];
				var jsonData = unsafeWindow.jQuery.parseJSON('{ "name": "' + BossName + '", "id": "' + BossID + '" }');					
				Bosses.push(jsonData);								
			};
			for(var i in Bosses)
			{
				unsafeWindow.$('#New_Raid').append("<div id=\"Boss_" + Bosses[i].id + "\" class=\"Raid\" title=\"" + Bosses[i].id + "\"><span title=\" \">" + Bosses[i].name + "</span></div>");
				document.getElementById("Boss_" + Bosses[i].id).addEventListener("click", function () {
						last_Boss = this.title;
						formRaid(this.title);
				}, false);
			}					
		}
	});
}

//Section: Semi-13
//this sets all the account information for the entire rga(Rampid gaming account)
function setAccounts()
{

	GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.outwar.com/accounts.php?ac_serverid=" + getOutwarCookie("ow_serverid"),
	headers: {
	"Accept": "text/xml"            // If not specified, browser defaults will be used.
	},
		onload: function(response) {
			
			var data = response.responseText;

			Characters = splitAccounts(data);
			
			Log("Finished getting account information...<br><p style=\"color:red;\"><b>Please select a crew from option box.</b></p>");	
			
		}
	});	
}

//Section: Semi-14
//This function forms a new raid for  boss spawn
function formRaid(BossID)
{
	
	readyTicker.pause();
	raidResultsTicker.pause();	

	Former = document.getElementById("Raid_Former");
	
	Log("Forming raid...");
	GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.outwar.com/formraid.php?target=" + BossID + "&suid=" + Former.value,
	headers: {
	"Accept": "text/xml"            // If not specified, browser defaults will be used.
	},
		onload: function(response) {
			
			var data = response.responseText;
			pattern = /name="codeid"\svalue="(.*?)"/g;
			matches = data.match(pattern);
			codeid =  matches[0].replace("name=\"codeid\" value=\"", "").replace("\"","");
			
			if(codeid)
			{
				var PostVars = "formtime=3&submit=Launch!&codeid=" + codeid;
				GM_xmlhttpRequest({
				method: "POST",
				url: "http://www.outwar.com/formraid.php?target=" + BossID + "&suid=" + Former.value,
				data: PostVars,
				headers: {
				"Content-Type":	"application/x-www-form-urlencoded",
				"Accept": "text/xml"            // If not specified, browser defaults will be used.
				},
				onload: function(response) {
					var data = response.responseText;
					pattern = /name=raidid\svalue="(.*?)"/g;
					matches = data.match(pattern);
					crewRaidExtras = "?raidid=" + matches[0].replace("name=raidid value=\"", "").replace("\"","") + "&";
					crewRaidFormer = Former.value;
					Log("Raid Formed.");
					Raider = document.getElementById("Raid_Former");
					getRaidsUp(Raider.value);
					startRaid(crewRaidExtras, crewRaidFormer)
				}});
			}
		}
	});	
}

function setWorld()
{

	Former = document.getElementById("Raid_Former");
	Bosses = new Array;	
	GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.outwar.com/ajax_changeroomb.php?suid=" + Former.value,
	headers: {
	"Accept": "text/xml"            // If not specified, browser defaults will be used.
	},
		onload: function(response) {
			
			var data = response.responseText;	
			pattern = /<b>(.*?)<\\\/b><br>(.*?)<\\\/font><\\\/div><\\\/a><\\\/td><td bgcolor=#(.*?)><a href=\\\"formraid.php\?target=(.*?)\\\">/ig;
			matches = data.match(pattern);
			
			for(var i in matches)
			{
				pattern = /formraid.php\?target=(.*?)\\\">/g;
				raidMatches = matches[i].match(pattern);
				var BossID = raidMatches[0].replace("formraid.php?target=", "").replace("\\\">", "")				
				var BossName = matches[i].replace(/<br>(.*?)<\\\/font>/ig, "").replace(/\\/ig, "").replace(/(<([^>]+)>)/ig, "");				
				var jsonData = unsafeWindow.jQuery.parseJSON('{ "name": "' + BossName + '", "id": "' + BossID + '" }');					
				Bosses.push(jsonData);
			};	
			
			setBosses();
		
		}
	});	
}

function refreshStats() 
{
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.outwar.com/userstats.php",
		headers: {
		"Accept": "text/xml"            // If not specified, browser defaults will be used.
		},
		onload: function(response) {

			if(response.responseText.indexOf("You must be logged in to use this page") != -1)
			{
				unsafeWindow.$('#error_login').show()
				unsafeWindow.$('#semi-arj_content').hide();
				return;
			}
			else{
				unsafeWindow.$('#semi-arj_content').show();
			}
		}
	});
}

function checkVersion()
{

	var curVersion = unsafeWindow.$('#version').html();
	if(Version != curVersion)
	{
		unsafeWindow.$('#semi_version').show();
	}	
}	

//Section: Semi-15
//this is the main part of the program 

if(curLocation != "outwar")
{
	var Outwar_Cookie = GM_getValue("Outwar_Cookie");

	unsafeWindow.onload = function(){

		setAccounts();
		unsafeWindow.$('#semi-arj_content').show();
		unsafeWindow.$('.error').hide()
		refreshStats();
		checkVersion();

	}
}
