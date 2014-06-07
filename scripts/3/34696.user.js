// ==UserScript==
// @name           SU Groups Cleaner
// @namespace      thlayli.detrave.net
// @description    Hides and/or dims messages by age
// @include        http://*.stumbleupon.com/groups/
// @license        http://www.gnu.org/copyleft/gpl.html
// @version        2.0.2
// ==/UserScript==

// auto-update variables
var script_title = "StumbleUpon Groups Cleaner";
var source_location = "http://thlayli.detrave.net/su-groupscleaner.user.js";
var version_holder = "http://thlayli.detrave.net/su-groupscleaner.version.txt";
var current_version = "2.0.2";
var latest_version = "";
var manual_check = true;
var lastupdatecheck = GM_getValue("Updated", "never");

GM_registerMenuCommand("Update - " + script_title, CheckVersion);
CheckForUpdate();

GM_registerMenuCommand("Toggle Conversation Fading", toggleFading);
var fades = new Array();
var ages = new Array();
var ageLimit = GM_getValue("ageLimit", 0);
var fadingEnabled =  GM_getValue('fadingEnabled', true);
var dates = xpath(document, "//span[contains(@class, 'msgDate')]");
var cmdBars = xpath(document, "//div[contains(@class, 'sectionCmds')]");
if(ageLimit != 0)
	ageText = "Hiding messages more than " + ageLimit + " hours old";
else
	ageText = "Showing all messages";
cmdBars.snapshotItem(1).style.display = "none";
cmdBars.snapshotItem(0).firstChild.nextSibling.firstChild.nextSibling.innerHTML = '<ul class="cmds"><li class="textlink"><a class="textlink" href="javascript:void(0);" id="toggle_agelimit">' + ageText + '</a> (click to change)';
document.getElementById("toggle_agelimit").wrappedJSObject.addEventListener('click', toggleLimit, true);
location.href = "javascript:showAllConvos();";

for(i=0;i<dates.snapshotLength;i++){
	age = dates.snapshotItem(i).firstChild.textContent.replace("said ","");
	age = age.replace(/ ago\n\t+in/ig,"");
	ageArr = age.split(" ");
	switch(ageArr[1]){
		case "hours":
			age = ageArr[0] * 60;
			break;
		case "hour":
			age = ageArr[0] * 60;
			break;
		case "days":
			age = ageArr[0] * 1440;
			break;
		case "day":
			age = ageArr[0] * 1440;
			break;
		default:
			age = ageArr[0];
	}
	ages[i] = age;

	bubble = dates.snapshotItem(i).parentNode.parentNode.parentNode;
	bubble.setAttribute("fade_id",i);
	bubble.setAttribute("post_age",age);

	if(fadingEnabled == true){
		fade = 1;
		if(age < 15){
			fade = .9;
		}else if(age < 60){
			fade = .85;
		}else if(age < 240){
			fade = .8;
		}else if(age < 300){
			fade = .75;
		}else if(age < 360){
			fade = .7;
		}else if(age < 480){
			fade = .65;
		}else if(age < 600){
			fade = .6;
		}else if(age < 720){
			fade = .55;
		}else if(age < 940){
			fade = .5;
		}else if(age < 1440){
			fade = .4;
		}else if(age < 2880){
			fade = .3;
		}else if(age < 3840){
			fade = .25;
		}else if(age < 4320){
			fade = .2;
		}else if(age < 7680){
			fade = .15;
		}else{
			fade = .1;
		}
		bubble.setAttribute("style","-moz-opacity: " + fade + ";");
		bubble.wrappedJSObject.addEventListener('mouseover', unFade, true);
		bubble.wrappedJSObject.addEventListener('mouseout', reFade, true);
		fades[i] = fade;
	}
}

hideOld();

function hideOld(){
	var messages =  xpath(document, "//div[contains(@class, 'listMsgs')]");
	for(i=0;i<messages.snapshotLength;i++){
		if(ages[i] > ageLimit * 60 && ageLimit != 0)
			messages.snapshotItem(i).style.display = "none";
		else
			messages.snapshotItem(i).style.display = "block";
	}
	hideEmpty();
}

function hideEmpty(){
	var groups =  xpath(document, "//div[contains(@class, 'groupBanner')]");
	for(i=0;i<groups.snapshotLength;i++){
		var empty = true;
		var nextLine = groups.snapshotItem(i).nextSibling.nextSibling;
		while(nextLine.className.indexOf("listMsgs") != -1){
			if(nextLine.style.display != "none")
				empty = false;
			nextLine = nextLine.nextSibling.nextSibling;
		}
		if(empty == true){
			groups.snapshotItem(i).style.display = "none";
		}else{
			groups.snapshotItem(i).style.display = "block";
		}
	}
}

function toggleLimit(){
	switch(ageLimit){
		case 0:
			ageLimit = 12;
			break;
		case 12:
			ageLimit = 24;
			break;
		case 24:
			ageLimit = 36;
			break;
		case 36:
			ageLimit = 48;
			break;
		case 48:
			ageLimit = 60;
			break;
		default:
			ageLimit = 0;
	}
	if(ageLimit != 0)
		this.innerHTML = "Hiding messages more than " + ageLimit + " hours old";
	else
		this.innerHTML = "Showing all messages";
	GM_setValue("ageLimit", ageLimit);
	hideOld();
}

function toggleFading(){
	if(fadingEnabled == true)
		fadingEnabled = false;
	else
		fadingEnabled = true;
	GM_setValue("fadingEnabled", fadingEnabled);
	document.location.reload();
}

function reFade(){
	fade = fades[this.getAttribute("fade_id")];
	this.setAttribute("style","-moz-opacity: " + fade + ";");
}

function unFade(){
	this.setAttribute("style","-moz-opacity: 1;");
}

function xpath(obj,query) {
    return document.evaluate(query, obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

// Userscript Auto-Update - http://userscripts.org/scripts/show/22372 - edited July 18 2008 by Nathan Blume

function GetNewVersion() {
        var today = new Date();
        GM_setValue('Updated', String(today));
        window.location = source_location;
}

function CheckForUpdate(){   
    var today = new Date();
    var one_day = 24 * 60 * 60 * 1000; //One day in milliseconds
    if(lastupdatecheck != 'never'){
        today = today.getTime(); //Get today's date
        lastupdatecheck = new Date(lastupdatecheck).getTime();
        var interval = (today - lastupdatecheck) / one_day; //Find out how many days have passed       
        if(interval >= 7){
			manual_check = false;
            CheckVersion();
		}
    }else{
        lastupdatecheck = new Date(lastupdatecheck).getTime();
		manual_check = false;
        CheckVersion();
	}
}

function CheckVersion(){
    GM_xmlhttpRequest({
            method: 'GET',
            url: version_holder,
            headers: {'Content-type':'application/x-www-form-urlencoded'},           
            onload: function(responseDetails){
                var latest_version = responseDetails.responseText.match(/version=([0-9\.]+)/);
                if(latest_version[1] != null && latest_version[1] != 'undefined'){
                    if(current_version != latest_version[1]){
                        if(confirm('A more recent version of ' + script_title + ' (' + latest_version[1] + ') has been found.\nWould you like to get it now?'))
                            GetNewVersion();
                        else
                            AskForReminder();
                    }else{
						SkipWeeklyUpdateCheck();
						if(manual_check == true)
							alert('You have the latest version of ' + script_title + '.');
					}
                }else{
                    alert('Sorry, there was problem checking for the update.\nPlease try again later.');
                }
            }
        });
}

function AskForReminder(){
    if(confirm('Would you like to be reminded in 24 hours ?\n(Cancel to be reminded in one week.)')){
        var today = new Date();
        today = today.getTime();       
        var sixdays_ms = 6 * 24 * 60 * 60 * 1000;
        var sda_ms = today - sixdays_ms;       
        var sixdaysago = new Date(sda_ms)
        GM_setValue('Updated', String(sixdaysago));
    }else{
        SkipWeeklyUpdateCheck();
	}
}

function SkipWeeklyUpdateCheck(){
    var today = new Date();
    GM_setValue('Updated', String(today));
}