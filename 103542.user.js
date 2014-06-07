// ==UserScript==
// @name           Facebook - Alien Visitors
// @namespace      IgnorBE
// @description    A smart autoscan script for the Alien Visitors Facebook App
// @include        http://apps.facebook.com/alienvisitors/*
// @include        http://alien-visitors.com/alienvisitor/*
// @version        1.09
// @history        1.09 - Bugfix for 1.08
// @history        1.08 - Bugfix for scan timeout
// @history        1.07 - Bugfix for multiple scans after each other
// @history        1.06 - Changed the autohunt to wait a random amount of seconds before scanning
// @history        1.05 - Shows a notice & stops hunting if you're out of batteries
// @history        1.04 - Added option to check manual for an update
// @history        1.03 - Added updatechecker
// @history        1.02 - Improved timer + overall script
// @history        1.01 - Added timer to title
// @history        1.00 - Initial release
// ==/UserScript==

var LOCAL_VERSION = "1.09";
var newerVersionExists = false;
var minSecsToWait = 1;
var maxSecsToWait = 5;
var scanStarted = false;

function getBatteryCount()
{
	var count = 0;
	var countXes = 0;
	var number;
	var childnodes = document.getElementById("batteryCount").childNodes;
	for(var i = 0; i < childnodes.length ; ++i)
	{
		number = childnodes[i].className.replace("number", "");
		if (number !== "X")
		{
			count += (number * Math.pow(10, childnodes.length - countXes - i));
		} else {
			++countXes;
		}
	}
	return count;
}

function getScanTime()
{
	var scanTime = unsafeWindow.secondsToNextScan - 1;
	
	if (scanTime == 0)
	{
		return "NOW !";
	} else {
		var mins = Math.floor(scanTime / 60);
		var secs = scanTime % 60;

		if (mins < 10)
		{
			mins = "0" + mins;
		}
		if (secs < 10)
		{
			secs = "0" + secs;
		}

		return mins + ":" + secs;
	}
}

function scan()
{
	scanStarted = false;
	unsafeWindow.onHuntClick();
}

function checkForScan()
{
	if (document.getElementById("scanButtonOff").style.display == "none")
	{
		if (getBatteryCount() != 0)
		{
			document.title = "| AV | Scan: NOW ! | Battery Count: " + getBatteryCount() + " |";
			if(!scanStarted)
			{
				scanStarted = true;
				var secsToWait = Math.floor(Math.random() * (maxSecsToWait + 1) + minSecsToWait) * 1000;
				setTimeout(scan(), secsToWait);
			}
		}
        else
		{
            document.title = "| AV | No Batteries! |";
        }
	} else {
		document.title = "| AV | Scan: " + getScanTime() + " | Battery Count: " + getBatteryCount() + " |";
	}
}

function checkForNewVersion(manualOverride)
{
	var currentTime = Math.round((new Date()).getTime() / 1000); // Unix time in seconds
	var updateURL = "http://userscripts.org/scripts/source/103542.meta.js?" + currentTime;
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: updateURL + '?' + currentTime,
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
		onload: function(responseDetails) {
			remote_version=(/@version\s*(.*?)\s*$/m.exec(responseDetails.responseText))[1];
			newerVersionExists = (parseFloat(remote_version) > parseFloat(LOCAL_VERSION));
			
			if (manualOverride && newerVersionExists)
			{
				alert("There is a new update available");
				document.location = "javascript:onHomeClick();";
			}
		}
	});
}

function performChecks()
{
	if (newerVersionExists)
	{
		var now = new Date();
		var d = now.getDate();
		var m = now.getMonth() + 1;
		var mm = m < 10 ? "0" + m : m;
		var y = now.getFullYear();
		document.getElementsByClassName("newsBox")[0].innerHTML = "<div id=\"news0\" class=\"newsEntry \"> <div class=\"newsDate\">" + mm + "/" + d + "/" + y + "</div> <div class=\"newsText\">There's a new update available!<br /><a href=\"http://userscripts.org/scripts/show/103542\" target=\"_blank\">Download</a> now !</div> </div>";
		document.title = "| AV | UPDATE ! |";
	}
	
	if (document.getElementById("catpchaPopup") != null)
	{
		document.title = "| AV | CAPTCHA ! |";
	}
	else
	{
		checkForScan();
	}
}

var interval = setInterval(performChecks, 1000);

GM_registerMenuCommand('Check for newer version', function()
{
    checkForNewVersion(true);
});
checkForNewVersion(false);