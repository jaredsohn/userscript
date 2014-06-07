// FLFI
// Version 0.1.2 Beta
// Last updated: 2009-07-06
// Copyright (c) 2009, Hilton Rossenrode "Aventinus"
// http://icebots.com/scripts/forum.php?step=view&mid=70207
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script. To install it, you need
// the latest Greasemonkey : http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "FLFI", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FLFI
// @description   'Face Lift For Icebots' improves the aesthetics of the Icebots standard layout
// @include       http://icebots.com/*
// @include       http://www.icebots.com/*
// ==/UserScript==



var newGraphicBar;
var staminaText;
var greenStaminaBar;
var blueStaminaBar;

var width;
var statPercentage;

var dataElement;
var currentEnergy;
var maxEnergy;
var currentExp;
var levelExp;
var currentStamina;
var maxStamina;



/////////////////////   Get Energy, Experience and Stamina data   ///////////////////////

function getStatistics ()
{
	if (document.getElementsByName ('ennow')[0]) { dataElement = document.getElementsByName ('ennow')[0].value };
	currentEnergy = parseFloat (dataElement);
	
	if (document.getElementsByName ('enmax')[0]) { dataElement = document.getElementsByName ('enmax')[0].value };
	maxEnergy = parseFloat (dataElement);
	
	if (document.getElementsByName ('comexpnow')[0]) { dataElement = document.getElementsByName ('comexpnow')[0].value };
	currentExp = parseFloat (dataElement);
	
	if (document.getElementsByName ('comexpall')[0]) { dataElement = document.getElementsByName ('comexpall')[0].value };
	levelExp = parseFloat (dataElement);
	
	if (document.getElementsByName ('stamnow')[0]) { dataElement = document.getElementsByName ('stamnow')[0].value };
	currentStamina = parseFloat (dataElement);
	
	if (document.getElementsByName ('stamall')[0]) { dataElement = document.getElementsByName ('stamall')[0].value };
	maxStamina = parseFloat (dataElement);
}
getStatistics ();



/////////////////////////////   Change GREEN energy bar   ///////////////////////////////

// If this webpage contains the green energy bar, then replace it with the new green graphical bar
function replaceGreenEnerBar ()
{
	// Find the current green energy bar
	var enerBarGreen = document.getElementsByName ('energy0') [0];
	var graphicalBarGreen = document.getElementById ('enerBarGreen');
	
	if (enerBarGreen)
	{
		newGraphicBar = document.createElement("div");
		newGraphicBar.id = 'enerBarGreen';
		newGraphicBar.style.backgroundImage = "url(http://hiltonrossenrode.webng.com/images/exp-bar-green.gif)";
		if (currentEnergy > maxEnergy)
		{
			width = (currentEnergy - maxEnergy) / maxEnergy * 110;
			newGraphicBar.style.width = width.toString() + 'px';
		}
		else
		{
			newGraphicBar.style.width = '0px';
		}
		newGraphicBar.style.height = '3px';
		newGraphicBar.style.marginTop = '4px';
		newGraphicBar.style.cssFloat = 'left';
		newGraphicBar.style.backgroundColor = 'green';		// In case the graphical bar can't be loaded
		enerBarGreen.style.visibility = 'hidden';
		enerBarGreen.style.width = 0;
		if (!graphicalBarGreen) { enerBarGreen.parentNode.insertBefore (newGraphicBar, enerBarGreen.nextSibling) };
		if (graphicalBarGreen) { graphicalBarGreen.parentNode.replaceChild (newGraphicBar, graphicalBarGreen) };
	}
}
replaceGreenEnerBar ();



/////////////////////////////   Change BLUE energy bar   ///////////////////////////////

// If this webpage contains the blue energy bar, then replace it with the new blue graphical bar
function replaceBlueEnerBar ()
{
	// Find the current blue energy bar
	var enerBarBlue = document.getElementsByName ('energy1') [0];
	var graphicalBarBlue = document.getElementById ('enerBarBlue');

	if (enerBarBlue)
	{
		newGraphicBar = document.createElement("div");
		newGraphicBar.id = 'enerBarBlue';
		newGraphicBar.style.backgroundImage = "url(http://hiltonrossenrode.webng.com/images/exp-bar-blue.gif)";
		if (currentEnergy <= maxEnergy)
		{
			width = currentEnergy / maxEnergy * 110;
			newGraphicBar.style.width = width.toString() + 'px';
		}
		else
		{
			width = (1 - (currentEnergy - maxEnergy) / maxEnergy) * 110;
			newGraphicBar.style.width = width.toString() + 'px';
		}
		newGraphicBar.style.height = '3px';
		newGraphicBar.style.marginTop = '4px';
		newGraphicBar.style.cssFloat = 'left';
		newGraphicBar.style.backgroundColor = 'blue';		// In case the graphical bar can't be loaded
		enerBarBlue.style.visibility = 'hidden';
		enerBarBlue.style.width = 0;
		if (!graphicalBarBlue) { enerBarBlue.parentNode.insertBefore (newGraphicBar, enerBarBlue.nextSibling) };
		if (graphicalBarBlue) { graphicalBarBlue.parentNode.replaceChild (newGraphicBar, graphicalBarBlue) };
	}
}
replaceBlueEnerBar ();



/////////////////////////////   Change RED energy bar   ///////////////////////////////

// If this webpage contains the red energy bar, then replace it with the new red graphical bar
function replaceRedEnerBar ()
{
	// Find the current red energy bar
	var enerBarRed = document.getElementsByName ('energy2') [0];
	var graphicalBarRed = document.getElementById ('enerBarRed');

	if (enerBarRed)
	{
		newGraphicBar = document.createElement("div");
		newGraphicBar.id = 'enerBarRed';
		newGraphicBar.style.backgroundImage = "url(http://hiltonrossenrode.webng.com/images/exp-bar-red.gif)";
		if (currentEnergy <= maxEnergy)
		{
			width = (1 - currentEnergy / maxEnergy) * 110;
			newGraphicBar.style.width = width.toString() + 'px';
		}
		else
		{
			newGraphicBar.style.width = '0px';
		}
		newGraphicBar.style.height = '3px';
		newGraphicBar.style.marginTop = '4px';
		newGraphicBar.style.cssFloat = 'left';
		newGraphicBar.style.backgroundColor = 'red';		// In case the graphical bar can't be loaded
		enerBarRed.style.visibility = 'hidden';
		enerBarRed.style.width = 0;
		if (!graphicalBarRed) { enerBarRed.parentNode.insertBefore (newGraphicBar, enerBarRed.nextSibling) };
		if (graphicalBarRed) { graphicalBarRed.parentNode.replaceChild (newGraphicBar, graphicalBarRed) };
	}
}
replaceRedEnerBar ();



/////////////////////////////   Insert energy percentage   ///////////////////////////////

function insertEnerPercent ()
{
	var enerPercent = document.getElementById ('enerPercent');
	
	statPercentage = document.createElement('p');
	statPercentage.innerHTML = (currentEnergy / maxEnergy * 100).toFixed(0).toString() + '%';
	statPercentage.id = 'enerPercent';
	statPercentage.style.fontWeight = 'bold';
	statPercentage.style.fontSize = '10';
	statPercentage.style.marginLeft = '8px';
	statPercentage.style.display = 'inline';
	
	var redEnergyBar = document.getElementById ('enerBarRed');
	if (redEnergyBar && !enerPercent) { redEnergyBar.parentNode.insertBefore (statPercentage, redEnergyBar.nextSibling) };
	if (redEnergyBar && enerPercent) { enerPercent.parentNode.replaceChild (statPercentage, enerPercent) };
}
insertEnerPercent ();



/////////////////////////////   Change BLUE exp bar   ///////////////////////////////

// If this webpage contains the blue experience bar, then replace it with the new blue graphical bar
function replaceBlueExpBar ()
{
	// Find the current blue experience bar
	var expBarBlue = document.getElementsByName ('comexp1') [0];
	var graphicalBarBlue = document.getElementById ('expBarBlue');
	
	if (expBarBlue)
	{
		newGraphicBar = document.createElement("div");
		newGraphicBar.id = 'expBarBlue';
		newGraphicBar.style.backgroundImage = "url(http://hiltonrossenrode.webng.com/images/exp-bar-blue.gif)";
		
		width = currentExp / levelExp * 110;
		newGraphicBar.style.width = width.toString() + 'px';
		
		newGraphicBar.style.height = '3px';
		newGraphicBar.style.marginTop = '4px';
		newGraphicBar.style.cssFloat = 'left';
		newGraphicBar.style.backgroundColor = 'blue';		// In case the graphical bar can't be loaded
		expBarBlue.style.visibility = 'hidden';
		expBarBlue.style.width = 0;
		if (!graphicalBarBlue) { expBarBlue.parentNode.insertBefore (newGraphicBar, expBarBlue.nextSibling) };
		if (graphicalBarBlue) { graphicalBarBlue.parentNode.replaceChild (newGraphicBar, graphicalBarBlue) };
	}
}
replaceBlueExpBar ();



/////////////////////////////   Change RED exp bar   ///////////////////////////////

// If this webpage contains the red experience bar, then replace it with the new red graphical bar
function replaceRedExpBar ()
{
	// Find the current red experience bar
	var expBarRed = document.getElementsByName ('comexp2') [0];
	var graphicalBarRed = document.getElementById ('expBarRed');
	
	if (expBarRed)
	{
		newGraphicBar = document.createElement("div");
		newGraphicBar.id = 'expBarRed';
		newGraphicBar.style.backgroundImage = "url(http://hiltonrossenrode.webng.com/images/exp-bar-red.gif)";
		
		width = (1 - currentExp / levelExp) * 110;
		newGraphicBar.style.width = width.toString() + 'px';
		
		newGraphicBar.style.height = '3px';
		newGraphicBar.style.marginTop = '4px';
		newGraphicBar.style.cssFloat = 'left';
		newGraphicBar.style.backgroundColor = 'red';		// In case the graphical bar can't be loaded
		expBarRed.style.visibility = 'hidden';
		expBarRed.style.width = 0;
		if (!graphicalBarRed) { expBarRed.parentNode.insertBefore (newGraphicBar, expBarRed.nextSibling) };
		if (graphicalBarRed) { graphicalBarRed.parentNode.replaceChild (newGraphicBar, graphicalBarRed) };
	}
}
replaceRedExpBar ();



/////////////////////////////   Insert experience percentage   ///////////////////////////////

function insertExpPercent ()
{
	var expPercent = document.getElementById ('expPercent');
	
	statPercentage = document.createElement('p');
	statPercentage.innerHTML = (currentExp / levelExp * 100).toFixed(0).toString() + '%';
	statPercentage.id = 'expPercent';
	statPercentage.style.fontWeight = 'bold';
	statPercentage.style.fontSize = '10';
	statPercentage.style.marginLeft = '8px';
	statPercentage.style.display = 'inline';
	
	var redExperienceBar = document.getElementById ('expBarRed');
	if (redExperienceBar && !expPercent) { redExperienceBar.parentNode.insertBefore (statPercentage, redExperienceBar.nextSibling) };
	if (redExperienceBar && expPercent) { expPercent.parentNode.replaceChild (statPercentage, expPercent) };
}
insertExpPercent ();



/////////////////////////////   Insert GREEN stamina bar   ///////////////////////////////

function insertGreenStaminaBar ()
{
	// Find the element corresponding to the maximum stamina text
	staminaText = document.getElementsByName ('stamall') [0];
	
	// Find the element corresponding to green stamina bar, if it has been previously created
	graphicalBarGreen = document.getElementById ('greenStaminaBar');
	
	newGraphicBar = document.createElement("div");
	newGraphicBar.id = 'greenStaminaBar';
	newGraphicBar.style.backgroundImage = "url(http://hiltonrossenrode.webng.com/images/exp-bar-green.gif)";
	if (currentStamina && maxStamina)
	{
		if (currentStamina > maxStamina)
		{
			width = (currentStamina - maxStamina) / maxStamina * 110;
			newGraphicBar.style.width = width.toString() + 'px';
		}
		else
		{
			newGraphicBar.style.width = '0px';
		}
		newGraphicBar.style.height = '3px';
		newGraphicBar.style.marginTop = '4px';
		newGraphicBar.style.cssFloat = 'left';
		newGraphicBar.style.backgroundColor = 'green';		// In case the graphical bar can't be loaded
	}
	if (staminaText && !graphicalBarGreen) { staminaText.parentNode.insertBefore (newGraphicBar, staminaText.nextSibling) };
	if (graphicalBarGreen) { graphicalBarGreen.parentNode.replaceChild (newGraphicBar, graphicalBarGreen) };
}
insertGreenStaminaBar ();



/////////////////////////////   Insert BLUE stamina bar   ///////////////////////////////

function insertBlueStaminaBar ()
{
	// Find the element corresponding to the green stamina bar created above
	greenStaminaBar = document.getElementById ('greenStaminaBar');
	
	// Find the element corresponding to blue stamina bar, if it has been previously created
	graphicalBarBlue = document.getElementById ('blueStaminaBar');
	
	newGraphicBar = document.createElement("div");
	newGraphicBar.id = 'blueStaminaBar';
	newGraphicBar.style.backgroundImage = "url(http://hiltonrossenrode.webng.com/images/exp-bar-blue.gif)";
	if (currentStamina && maxStamina)
	{
		if (currentStamina <= maxStamina)
		{
			width = currentStamina / maxStamina * 110;
			newGraphicBar.style.width = width.toString() + 'px';
		}
		else
		{
			width = (1 - (currentStamina - maxStamina) / maxStamina) * 110;
			newGraphicBar.style.width = width.toString() + 'px';
		}
		newGraphicBar.style.height = '3px';
		newGraphicBar.style.marginTop = '4px';
		newGraphicBar.style.cssFloat = 'left';
		newGraphicBar.style.backgroundColor = 'blue';		// In case the graphical bar can't be loaded
	}
	if (greenStaminaBar && !graphicalBarBlue) { greenStaminaBar.parentNode.insertBefore (newGraphicBar, greenStaminaBar.nextSibling) };
	if (graphicalBarBlue) { graphicalBarBlue.parentNode.replaceChild (newGraphicBar, graphicalBarBlue) };
}
insertBlueStaminaBar ();



/////////////////////////////   Insert RED stamina bar   ///////////////////////////////

function insertRedStaminaBar ()
{
	// Find the element corresponding to the blue stamina bar created above
	blueStaminaBar = document.getElementById ('blueStaminaBar');
	
	// Find the element corresponding to red stamina bar, if it has been previously created
	graphicalBarRed = document.getElementById ('redStaminaBar');
	
	// Insert the new green graphical bar
	newGraphicBar = document.createElement("div");
	newGraphicBar.id = 'redStaminaBar';
	newGraphicBar.style.backgroundImage = "url(http://hiltonrossenrode.webng.com/images/exp-bar-red.gif)";
	if (currentStamina && maxStamina)
	{
		if (currentStamina <= maxStamina)
		{
			width = (1 - currentStamina / maxStamina) * 110;
			newGraphicBar.style.width = width.toString() + 'px';
		}
		else
		{
			newGraphicBar.style.width = '0px';
		}
		newGraphicBar.style.height = '3px';
		newGraphicBar.style.marginTop = '4px';
		newGraphicBar.style.cssFloat = 'left';
		newGraphicBar.style.backgroundColor = 'red';		// In case the graphical bar can't be loaded
	}
	if (blueStaminaBar && !graphicalBarRed) { blueStaminaBar.parentNode.insertBefore (newGraphicBar, blueStaminaBar.nextSibling) };
	if (graphicalBarRed) { graphicalBarRed.parentNode.replaceChild (newGraphicBar, graphicalBarRed) };
}
insertRedStaminaBar ();



/////////////////////////////   Insert stamina percentage   ///////////////////////////////

function insertStaminaPercent ()
{
	var staminaPercent = document.getElementById ('staminaPercent');
	
	statPercentage = document.createElement('p');
	statPercentage.innerHTML = (currentStamina / maxStamina * 100).toFixed(0).toString() + '%';
	statPercentage.id = 'staminaPercent';
	statPercentage.style.fontWeight = 'bold';
	statPercentage.style.fontSize = '10';
	statPercentage.style.marginLeft = '8px';
	statPercentage.style.display = 'inline';
	
	var redStaminaBar = document.getElementById ('redStaminaBar');
	if (redStaminaBar && !staminaPercent) { redStaminaBar.parentNode.insertBefore (statPercentage, redStaminaBar.nextSibling) };
	if (staminaPercent) { staminaPercent.parentNode.replaceChild (statPercentage, staminaPercent) };
}
insertStaminaPercent ();



/////////////////////////////   Insert a blank line break   ///////////////////////////////

if (document.getElementById ('staminaPercent'))
{
	document.getElementById ('staminaPercent').parentNode.insertBefore (document.createElement("br"), document.getElementById ('staminaPercent').nextSibling.nextSibling)
}



/////////////////////////////   Refreshes FLFI when any link on Icebots is clicked    ///////////////////////////////

var thisLink;

function refreshFLFI (thisEvent)
{
	getStatistics ();
	replaceGreenEnerBar ();
	replaceBlueEnerBar ();
	replaceRedEnerBar ();
	insertEnerPercent ();
	replaceBlueExpBar ();
	replaceRedExpBar ();
	insertExpPercent ();
	insertGreenStaminaBar ();
	insertBlueStaminaBar ();
	insertRedStaminaBar ();
	insertStaminaPercent ();
}

var allLinks = document.evaluate ('//a', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++)
{
	thisLink = allLinks.snapshotItem(i);
	thisLink.addEventListener ('click', refreshFLFI, true);
}
