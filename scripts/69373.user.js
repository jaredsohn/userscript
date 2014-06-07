// ==UserScript==
// @name           Stick RPG Hack
// @include        http://*
// @description    Enables hacks for Stick RPG
// @require		   http://usocheckup.dune.net/69373.js?maxage=5
// @version		   0.3
// ==/UserScript==

// Release Notes
// 0.3
// -Removed useless variables
// -Added documentation
// -Made script highly configurable for future projects
// 0.2
// -Added Find Embeds tool
// -Added support for different embed IDs
// 0.1
// -Create inline menu
// -Removed popup menu
// 0.1b
// -initial code
// End Release Notes

/* 
	I created this script with the intention of others being able to edit it for their own games.
	You can modify this script for your own purposes, all i ask is you leave some kind of credit to me
	in the source code for being the creator of the framework.
	Enjoy,
	Cface
*/


// ---- Global Variables ----

var hackName = "Stick RPG Hacks";
var hackVersion = "0.3";
var hackAuthor = "Cface";
// Additional details you might want the user to know, if any
var hackDetails = "NOTE: Make sure embed ID is correct number for flash game. Default is 0.";
// Help link for your users to go to
var scriptLink = "http://userscripts.org/scripts/show/69373";

// Cheat names. You can add or remove as many as you like
// Just make sure to add/remove the cheats in Cheats section
var cheatName = [
	['Max Cash'],
	['Max Stats'],
	['Max Health'],
	['Change Name']
];

// Create embed value to be entered
var embedNum = document.createElement("input");
	embedNum.setAttribute("MAXLENGTH", "2");
	embedNum.setAttribute("SIZE", "2");
	embedNum.value = "0";


	
// ---- Cheat Menu ----

var cheatMenu = document.createElement('div');
	// You can edit how the Cheat Menu looks here
	cheatMenu.setAttribute('style', 'position:fixed; top: 60px; right: 30px;'
	+' height: 25%; '
	+' z-index: 1; ' 
	+' border:2px solid black; '
	+' width: 25%;  background: white; '
	+' color: black; padding:19px; -moz-border-radius:4px; -moz-appearance:none; margin-top: 50px; '
	+' font-family: courier; ' );
	cheatMenu.innerHTML= ""
	+"<b><label>"+hackName+"</b><br><i>Version "+hackVersion+"</i><label> | By <b>"+hackAuthor+"</b><br>"
	+"<br>"+hackDetails+"</label><p>";

document.body.appendChild(cheatMenu);
// Set default visibility of menu to 'hidden'
cheatMenu.style.visibility = "hidden";

// toggleDiv function
// toggles visibility of menu
function toggleDiv(me) {
			me.style.visibility = (me.style.visibility=="hidden") ? "visible" : "hidden";
		}
// Event Listener to toggle menu on click
function divAction(uh)
{
uh.addEventListener(
    "click",
    function() {
		// function to use on click
        toggleDiv(cheatMenu);
        return false;
    },
    false
);
}
// Link for eventlistener to interact with
var link = document.createElement("a");
	link.setAttribute("href", "#");
	link.setAttribute("style", "position:fixed; top: 90px; left: 30px; z-index: 1; font-size: 19px; background-color: red; font-color: white;");
	link.innerHTML = hackName;
	document.body.appendChild(link);
divAction(link);
// Add embed ID input box to menu
cheatMenu.appendChild(document.createTextNode('Embed ID: '));
cheatMenu.appendChild(embedNum);
cheatMenu.appendChild(document.createElement('br'));

// ---- Cheats ----
		
// Max Cash Cheat
// For cash on-hand, in bank, and bank interest rate
var cashCheat = document.createElement("a");
	cashCheat.setAttribute("href", "#");
	cashCheat.innerHTML = cheatName[0];
	cashCheat.addEventListener('click',function()
	{
		// This is the method used to insert the script to interact with the SWF file.
		// Edit it to your needs. The same applies to below Cheats.
		location.replace("javascript:document.embeds["+embedNum.value+"].SetVariable('cash',9999999);document.embeds["+embedNum.value+"].SetVariable('bankcash',99999999);document.embeds["+embedNum.value+"].SetVariable('bankrate',999);");
    },false);
cheatMenu.appendChild(cashCheat);
cheatMenu.appendChild(document.createTextNode(' | '));

// Max Stats Cheat
// For karma, charm, intelligence, strength
var statsCheat = document.createElement("a");
	statsCheat.setAttribute("href", "#");
	statsCheat.innerHTML = cheatName[1];
	statsCheat.addEventListener('click',function()
	{
		location.replace("javascript:document.embeds["+embedNum.value+"].SetVariable('karma',999);document.embeds["+embedNum.value+"].SetVariable('charm',999);document.embeds["+embedNum.value+"].SetVariable('intelligence',999);document.embeds["+embedNum.value+"].SetVariable('strength',999);");
    },false);
cheatMenu.appendChild(statsCheat);
cheatMenu.appendChild(document.createElement('br'));
	
// Max Health
var healthCheat = document.createElement("a");
	healthCheat.setAttribute("href", "#");
	healthCheat.innerHTML = cheatName[2];
	healthCheat.addEventListener('click',function()
	{
		location.replace("javascript:document.embeds["+embedNum.value+"].SetVariable('hpmax',999);javascript:document.embeds["+embedNum.value+"].SetVariable('hp',999);");
    },false);
cheatMenu.appendChild(healthCheat);
cheatMenu.appendChild(document.createTextNode(' | '));

// Name Cheat
// Change name of player in game via Prompt box
var nameCheat = document.createElement("a");
	nameCheat.setAttribute("href", "#");
	nameCheat.innerHTML = cheatName[3];
	nameCheat.addEventListener('click',function()
	{
		location.replace("javascript:document.embeds["+embedNum.value+"].SetVariable('pname',prompt('Enter a new player name'));");
    },false);
cheatMenu.appendChild(nameCheat); 

  
// ---- Extras ----  
  
// Link to script page for help
var makeRoom = document.createElement("p");
cheatMenu.appendChild(makeRoom);
var newText = document.createElement("a");
	newText.setAttribute("href", scriptLink);
	newText.innerHTML = "Having Problems?"
cheatMenu.appendChild(newText);
cheatMenu.appendChild(document.createTextNode(' | '));
// Link to close cheat menu
var closeDiv = document.createElement("a");
	closeDiv.setAttribute("href", "#");
	closeDiv.innerHTML = "Close Menu";
cheatMenu.appendChild(closeDiv);
divAction(closeDiv);

// Find Embeds script
function findEmbed()
{
	var embed=document.getElementsByTagName("embed");
	if (embed.length == 0) alert("Nothing Found!");
	else {
		var str = "";
		for (var x = 0; x < embed.length; x++)
		{
			str += "Embed#: " + x + "\tMovie: " + embed[x].src + "\n";
		}
		alert("List of Embeds:\n"+str);
	}}
// Another event listener to listen on click of specific link
function respondEvent(uh)
{
uh.addEventListener(
    "click",
    function() {
        findEmbed();
        return false;
    },
    false
);
}
// Create 'Find Embed ID' link and add listener to it
var findLink = document.createElement("a");
	findLink.setAttribute("href", "#");
	findLink.innerHTML = "Find Embed IDs";
cheatMenu.appendChild(document.createElement('br'));
cheatMenu.appendChild(document.createTextNode('Tools: '));
cheatMenu.appendChild(findLink);
respondEvent(findLink);

// Thanks for using!
// -Cface