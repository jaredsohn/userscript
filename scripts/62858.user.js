typeof(CheckForUpdate)!='undefined' && CheckForUpdate.init(<>
// ==UserScript==
// @name           AutoHaggler
// @namespace      http://userscripts.org/users/62858
// @description    Haggler
// @include        http://*.neopets.*/haggle.phtml*
// @include        http://neopets.*/haggle.phtml*
// @include        http://*.neopets.*/haggle.phtml*
// @include        http://neopets.*/haggle.phtml*
// @note           Still trying to fix!
// @credit         Making this a autohaggler with a log. Credit by Backslash, for log code.
// ==/UserScript==
</>);

///////////////////////////////////////////////////////

// if you previously installed this, delete it.

document.body.innerHTML = document.body.innerHTML.replace(/Merchandise/g, "Restock Log")
document.body.innerHTML = document.body.innerHTML.replace(/\/shopping\/index.phtml/g, "/pronounce.phtml")
var Drop1Open = false;
var Drop2Open = false;
var Drop3Open = false;
var LogOpen = false;
var BarOpen = false;
var SettingsOpen = false;
var ListOpen = false;
var RefreshOpen = false;
var TopOpen = false;
var shopToAB = GM_getValue('shopId', '1');
var shopURL = "http://www.neopets.com/objects.phtml?type=shop&obj_type=";
var shopFull = shopURL + shopToAB;
var TopBar = document.createElement("div");
TopBar.setAttribute("style", "position: fixed;top: 0;left: 0;z-index: 9999;width: 100%;height: 19px;background-image: url('http://i49.tinypic.com/n4xwl4.png');visibility:visible;");
setOpacity(TopBar, 5)
TopBar.addEventListener('click', TopBarOpacity, false);
document.body.appendChild(TopBar);
var CoverObject = document.createElement("div");
CoverObject.setAttribute("style", "top:0px;left:0px;width:100%;height:100%;position:fixed;background-color:#000000;z-index:999;opacity:0.9;filter:alpha(opacity=90);visibility:visible;");



var viewSettings = document.createElement("div");
viewSettings.innerHTML = "Misc Settings";
viewSettings.setAttribute("style", "position: relative;font-family:Trebuchet MS;font-size:10pt;cursor:default;");
viewSettings.addEventListener('click', toggleSettings, false);
Drop2.appendChild(viewSettings);



var logBox = document.createElement("div");
logBox.innerHTML = GM_getValue('itemLog', 'There are no log items.');
logBox.setAttribute("style", "height:300px;width:400px;position:fixed;top:100px;left:30%;border:1px solid black;background-color:#ffffff;z-index:9999999;visibility:visible;padding:3px;text-align:left;font-family:Trebuchet MS;");




//<|-------------------------------------------------------------------|>\\
//<|-----------------------------FUNCTIONS---------------------------|>\\
//<|----------------CREDITBACKSLASH!--------------------------------|>\\
function saveSettings() {
	GM_setValue('restockList', document.getElementById('restockList').value);

	alert("settings saved.");
}



function Item1Actions() {
	toggleDrop1()
}


function Item2Actions() {
	toggleDrop2()
}


function EndNoteActions() {
	alert('Thank you for using BackSlash Buyer®! \n\nThis script autobuys items from the Neopets Main Shops, located in the "Shops" section of Neopets.\n\nThe makers of this script are notheld responsible if you are frozen for using this script! This is for educational purposes only.');
}



function toggleDrop1() {
	if (Drop1Open == false) {
		Drop1Open = true;
		Drop1.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
		Drop3.style.visibility = "hidden";
	}
	else {
		Drop1Open = false;
		Drop1.style.visibility = "hidden";

	}
}


function toggleDrop2() {
	if (Drop2Open == false) {
		Drop2Open = true;
		Drop2.style.visibility = "visible";
		Drop1.style.visibility = "hidden";
		Drop3.style.visibility = "hidden";
	}
	else {
		Drop2Open = false;
		Drop2.style.visibility = "hidden";

	}
}


function tOptions() {
	var pausing = prompt("Enter the ammount of seconds you wish to pause, and click 'OK'.", "5");
	var newnum = pausing * 1000
	if (pausing) {
		setTimeout(function() {
			alert('The awaited time you wished to pause has elapsed.')
		},
		newnum);
	}
	else {
		alert('Pause was aborted.')
	}
}

if (location.href.indexOf('pronounce.phtml') != -1) {
	document.getElementById("content").innerHTML = "<center><div style='margin:10px;padding:10px;font-family:courier new;font-size:20px;'>" + GM_getValue('itemLog', '') + "</div><br><br><br><br><br></center>";
}



function toggleBar() {
	if (BarOpen == false) {
		BarOpen = true;
		TopBar.style.visibility = "visible";
		HiddenBar.style.visibility = "hidden";
		Drop1.style.visibility = "hidden";
	}
	else {
		BarOpen = false;
		TopBar.style.visibility = "hidden";
		HiddenBar.style.visibility = "visible";
		Drop1.style.visibility = "hidden";
	}
}



function LogItem(line) {
	GM_setValue('itemLog', GM_getValue('itemLog', '') + line + "<br />")
}



function toggleLog() {
	if (LogOpen == false) {
		LogOpen = true;
		document.location = location.href;
		ViewLog.innerHTML = "Hide RS Log";
		CoverObject.style.visibility = "visible";
		logBox.style.visibility = "hidden";
		Drop1.style.visibility = "hidden";
	}
	else {
		LogOpen = false;
		CoverObject.style.visibility = "hidden";
		ViewLog.innerHTML = "RS Log";
		logBox.style.visibility = "hidden";
		Drop1.style.visibility = "hidden";
	}
}



function toggleSettings() {
	if (SettingsOpen == false) {
		SettingsOpen = true;
		viewSettings.innerHTML = "Hide Misc Settings";
		CoverObject.style.visibility = "visible";
		miscBox.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
	}
	else {
		SettingsOpen = false;
		CoverObject.style.visibility = "hidden";
		viewSettings.innerHTML = "Misc Settings";
		miscBox.style.visibility = "hidden";
		Drop2.style.visibility = "hidden";

		if (document.getElementById('RSCheck').checked == true) {
			GM_setValue('RSCheck', 'checked');
		}
		else {
			GM_setValue('RSCheck', '0');
		}
		GM_setValue('shopId', document.getElementById('shopId').value);
		GM_setValue('WBB', document.getElementById('WBB').value);
		GM_setValue('rscheckt', document.getElementById('rscheckt').value);
	}
}



function toggleList() {
	if (ListOpen == false) {
		ListOpen = true;
		viewList.innerHTML = "Hide Restock List<hr>";
		CoverObject.style.visibility = "visible";
		ListBox.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
	}
	else {
		ListOpen = false;
		GM_setValue('restockList', document.getElementById('restockList').value);
		CoverObject.style.visibility = "hidden";
		viewList.innerHTML = "Restock List<hr>";
		ListBox.style.visibility = "hidden";
		Drop2.style.visibility = "hidden";
	}
}



function TopBarOpacity() {
	if (TopOpen == false) {
		TopOpen = true;
		setOpacity(TopBar, 10)

	}
	else {
		TopOpen = false;
		setOpacity(TopBar, 10)

	}
}



function clearLog() {
	GM_setValue('itemLog', '');
	logBox.innerHTML = GM_getValue('itemLog', '');
}



function toggleRefresh() {
	if (RefreshOpen == false) {
		RefreshOpen = true;
		viewRefresh.innerHTML = "Hide Refresh Rates<hr>";
		CoverObject.style.visibility = "visible";
		refreshBox.style.visibility = "visible";
		Drop2.style.visibility = "hidden";
	}
	else {
		RefreshOpen = false;
		GM_setValue('to', document.getElementById('to').value);
		GM_setValue('from', document.getElementById('from').value);
		CoverObject.style.visibility = "hidden";
		viewRefresh.innerHTML = "Refresh Rates<hr>";
		refreshBox.style.visibility = "hidden";
		Drop2.style.visibility = "hidden";
	}
}



function GetStringBetween(target_str, start_str, end_str, start_pos, include_str) {
	if (!start_pos) 0;
	if (!include_str) false;

	var result_str = target_str.substr(start_pos); //cut to start from start_pos
	result_str = result_str.substr(result_str.indexOf(start_str) + start_str.length); //cut to start from start_str
	result_str = result_str.substr(0, result_str.indexOf(end_str));

	if (include_str == true) {
		result_str = start_str + result_str + end_str
	}

	return result_str;
}

