// ==UserScript==
// @name           QLStats
// @description    Show Teir Stats on the QL site.
// @include        http://*.quakelive.com/*
// ==/UserScript==

// QLStats v0.01e

// FEATURES
// * Show Tier Stats
// * Movable

// TODO
// * Position not reset on page reload (cookie)
// * Find more stats to show
// * Clean up the god awful styling...
// * Option for showing tier numbers or skill names
// * Plenty more!

// HISTORY

// 2009-22-02 v0.01e
// Cleaned up some code
// The text doesn't just leave CTF: if you are not logged in anymore.

// 2009-18-02 v0.01d
// Minor GUI change. Helps identify draggable part easier.

// 2009-18-02 v0.01c
// Per request, Tier numbers are shown.

// 2009-18-02 v0.01b
// Don't need to display nick so removed it.
// Also the header just says Tier stats because that is all that is shown for now.

// 2009-17-02 v0.01
// Initial Release

// LOOKING AHEAD
// NEXT RELEASE
// I will try and dig up a few more stats to post, and maybe some gui changes.
// I am finished with these minor pushes for now.
// HAPPY OPEN BETA DAY IN 2 DAYS (2 days from when written)!


// BEGIN
window.addEventListener('load', init, true);

//need the statsDiv to be global as well as the xmlhttp request?
var statsDiv = document.createElement('div');
var xmlhttp = new XMLHttpRequest();

function init()
{
	var statsPanelWrapper = document.createElement('div');
	statsPanelWrapper.style.background = "red";
	statsPanelWrapper.style.width = "175px";
	statsPanelWrapper.style.fontSize = "small";
	statsPanelWrapper.style.position = "absolute";
	statsPanelWrapper.style.left = "0px";
	statsPanelWrapper.style.top = "0px";
	statsPanelWrapper.style.zIndex = "250";
	statsPanelWrapper.style.width = "auto";
	statsPanelWrapper.style.borderStyle = "solid";
	statsPanelWrapper.style.borderWidth = "1px";
	statsPanelWrapper.style.padding = "2px 2px 2px 2px";
	
	//Handle for the movability
	var statsPanelHandle = document.createElement('div');
	statsPanelHandle.style.width = "100%";
	//statsPanelHandle.style.height = "20px";
	//statsPanelHandle.style.opacity = ".6";
	//statsPanelHandle.style.background = "white";
	statsPanelHandle.style.cursor = "move";
	statsPanelWrapper.appendChild(statsPanelHandle);
	
	//Simple Header
	var statsPanelHeader = document.createElement('div');
	statsPanelHeader.style.fontColor = "black";
	statsPanelHeader.style.opacity = "1";
	statsPanelHeader.textContent = "Your Tier Stats";
	statsPanelHeader.style.fontFamily = "sans-serif";
	statsPanelHeader.style.borderBottom = "1px solid";
	statsPanelHeader.style.cssFloat = "left";
	statsPanelHandle.appendChild(statsPanelHeader);

	//Create the stats DIV
	statsDiv.textContent = "Loading Stats...";
	statsPanelWrapper.appendChild(statsDiv);
	
	makeStatsMovable(statsPanelHandle);
	
	getStats();
	
	document.body.appendChild(statsPanelWrapper);

}

function getStats()
{
	if(xmlhttp != null)
	{
		xmlhttp.onreadystatechange=state_Change;
		xmlhttp.open("GET",'http://beta.quakelive.com/user/load',true);
		xmlhttp.send(null);
	}
}

function state_Change()
{
	if (xmlhttp.readyState == 4)
	{
		if (xmlhttp.status == 200)
		{
			var userStats = xmlhttp.responseText.split(':');
			statsDiv.innerHTML = "";
 			if (xmlhttp.responseText.split(":")[2] == "\"Not Authorized\"}") {
				statsDiv.innerHTML = "<br /><br />You need to log in first.";
			} else {
				statsDiv.innerHTML += "<br />CTF: ";
				statsDiv.innerHTML += userStats[21].split(',')[0].replace(/['"]/g,'');
				statsDiv.innerHTML += "<br />DM: ";
				statsDiv.innerHTML += userStats[22].split(',')[0].replace(/['"]/g,'');
				statsDiv.innerHTML += "<br />Duel: ";
				statsDiv.innerHTML += userStats[23].split(',')[0].replace(/['"]/g,'');
				statsDiv.innerHTML += "<br />TDM: ";
				statsDiv.innerHTML += userStats[24].split(',')[0].replace(/['"]/g,'');
				statsDiv.innerHTML += "<br />CA: ";
				statsDiv.innerHTML += userStats[25].split(',')[0].replace(/['"]/g,'');
			}
		}
	}
}

function makeStatsMovable(element)
{
	var movableElement = null;
	var dragXoffset = 0;
	var dragYoffset = 0;

	element.addEventListener('mousedown', function(event) {
		moveableElement = element.parentNode;

		dragHandler(event);

		event.stopPropagation();
		event.preventDefault();	
	}, false);

	function dragHandler(e)
	{
		if (e == null) { e = window.event; htype='move';} 
		dragXoffset=e.clientX-parseInt(moveableElement.style.left);
		dragYoffset=e.clientY-parseInt(moveableElement.style.top);
		document.addEventListener('mousemove',moveHandler,false);
		document.addEventListener('mouseup',cleanup,false);
	}

	function moveHandler(e)
	{
		if (e == null)
		{
			e = window.event;
		}
		
		if (e.button == 0)
		{
			moveableElement.style.left=e.clientX-dragXoffset+'px';
			moveableElement.style.top=e.clientY-dragYoffset+'px';
		}
	}

	function cleanup(e)
	{
		document.removeEventListener('mousemove',moveHandler,false);
		document.removeEventListener('mouseup',cleanup,false);
	}
}
