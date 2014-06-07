// ==UserScript==
// @name   Aber
// @include        http://www.neopets.com/*
// @include        http://www.neopets.com/objects.phtml?type=shop&obj_type=13
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
// @require	   http://userscripts.org/scripts/source/38788.user.js
// ==/UserScript==




var sURL = unescape(window.location.pathname);
function doLoad()
{
    setTimeout( "refresh()", 2*1000 );
}

function refresh()
{
    window.location.href = sURL;
}


	var restockList = document.createElement("div");
	restockList.innerHTML = "restock list:<br /><textarea style='border: none; background-color: #EEEEEE; width: 220px; height: 250px;' id='restockList'>" + GM_getValue('restockList', '') + "</textarea>";
	restockList.setAttribute("style", "position: relative; top: 25px;");
	settingsBox.appendChild(restockList);
	saveButton.innerHTML = "<button>save</button>";
	saveButton.addEventListener('click', saveSettings, false);
	saveButton.setAttribute("style", "position: relative; top: 30px;");
	settingsBox.appendChild(saveButton);
}



function alarm() { // plays a sound when a listed item appears
	alarmDiv = document.createElement("div");
	alarmDiv.innerHTML = "<embed src=\"http://www.liquidenjoyment.com/stuff/hobonickelget.swf\" autostart=true hidden=true>";
	pbDiv = document.getElementById("contentContainer");
	document.body.insertBefore(alarmDiv, pbDiv);
}



function autobuy() {
	if (item.snapshotLength > 0) {
		item = item.snapshotItem(0);
		selectedlink = item.previousSibling.previousSibling;
		window.location = selectedlink;
	}
}

function popup() { // adds additional capabilities to the script
	{
		alert("RS!")
	} // creates a popup to alert the user that an item in the list below was autobought/autograbbed
}

function clearLog() {
	GM_setValue('itemLog', '');
	logBox.innerHTML = "";
}

