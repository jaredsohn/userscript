// ==UserScript==
// @author		  zqqou
// @name          Travian Auto login
// @namespace     http://userscripts.org/
// @description   This script keeps you logged in.
// @include       http://*.travian.*/*
// @exclude		  http://*.travian.*/anmelden.php*
// @exclude		  http://*.travian.*/support.php*
// @exclude		  http://www.travian.*
// @exclude		  http://forum.travian.*
// @version		  0.7
// ==/UserScript==

// Edit this:
var AutoLogIn = "http://s2.travian.ph/build.php?id=39";

// Don't touch below
if(!doLogin()) {
	setTimer();
}

function loginCheck() {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+location.hostname+'/dorf1.php',
		onload: function(responseDetails) {
			if(responseDetails.status=200) {
				if(responseDetails.responseText.indexOf("logout.php")==-1) {
					GM_log("We're logged out.");
					window.location.href="http://"+location.hostname+"/login.php";
				} else {
					setTimer();
				}
			}
		}
	});
}

function setTimer() {
	var minReloadtime = 7;
	var maxReloadtime = 13;

	var difference = maxReloadtime - minReloadtime;
	var randomDifference = Math.floor((Math.random()*(difference+1)));
	var randomSecs = Math.floor((Math.random()*61))*1000;
	var randomReloadtime = (randomDifference+minReloadtime)*60000+randomSecs;
	var randomMinutes = (randomDifference+minReloadtime);
	GM_log("Next login check in "+randomMinutes+"min "+(randomSecs/1000)+"sec.");
	setTimeout(function() { loginCheck(); }, randomReloadtime);
}




function doLogin()
{
	if(window.location.href.indexOf('logout.php')!=-1)
		return true;
	if (GM_getValue('justLogged')==true) {
		location.href="http://"+location.hostname+"/"+afterLogin;
		GM_setValue('justLogged', false);
		return true;
	}
	if (document.getElementsByName('login'))
	{
		var ex = ".//input[@value='login']";
		tag = document.evaluate( ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		var ex = ".//input[@type='password' and contains(@value, '*')]";
		tag2 = document.evaluate( ex, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    	if(tag.snapshotLength && tag2.snapshotLength)
    	{
			GM_log("Trying to login.");
    		loginButton = tag.snapshotItem(0);
			GM_setValue('justLogged', true);
    		loginButton.click();
			return true;
    	}
	}
	return false;
}