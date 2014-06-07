// ==UserScript==
// @name           LevynLight Forge
// @namespace      allc0re
// @icon	   	   http://dl.dropbox.com/u/1756571/forge_icon.png
// @version        0.73
// @description    Adds a Forge, Foundry, and Daily Rewards links to the HUD for LevynLight. 
// @include        http://apps.facebook.com/levynlight/*
// @include        https://apps.facebook.com/levynlight/*
// @include        http://www.levynlight.com/*
// @history        0.73 - Fixed bug and added better browser version detect
// @history        0.72 - Adjusted for Facebook changes
// @history        0.71 - added GM icon
// @history        0.7 - updated for Firefox 4.0 compatibility, made reward link more obvious
// @history        0.6 - Added Daily Reward link
// @history        0.5 - Added Foundry link
// @history        0.4 - Aesthetic tweaks
// @history        0.3 - Background Image
// @history        0.2 - Improved appearance
// @history        0.1 - Initial release
// ==/UserScript==

collected = /Collected on:/;
collectedTest = collected.test(document.body.innerHTML);
var versionExp = /Firefox/;
var versionIndex = navigator.userAgent.search(versionExp) + 8;
var versionInt = parseInt(navigator.userAgent.substr(versionIndex, 1), 10);

//*******Add Daily Rewards Link
document.getElementById('subMenu').innerHTML += '<div id="rewardLink" style="background-color:#FFFFCC; width:95px;" class="dropdownmenu mainnavigation"><a href="http://apps.facebook.com/levynlight/daily.php" class="menuitem">Daily Rewards</a></div>';

if (collectedTest) { //Test for reward collection
	document.getElementById("rewardLink").style.backgroundColor = "#FFFFFF";
}
else {
	document.getElementById("rewardLink").style.backgroundColor = "#FFFFCC";
}

//*******Add Forge and Foundry Links
if (versionInt >= 4) { //check for Firefox 4
document.getElementById('playerHud').innerHTML += '<div align="left" style="position:relative; width:122px; top:51px; left:354px; background:url(\'http://dl.dropbox.com/u/1756571/forgebg2.png\') repeat-x; padding:8px 0px 7px 17px; overflow:visible;"><a href="http://apps.facebook.com/levynlight/mastery.php" title="Upgrade my weapons" style="letter-spacing:0.5px; text-decoration:none; color:white; font-variant:small-caps; font-family:serif; font-weight:500">forge</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://apps.facebook.com/levynlight/foundry.php" title="Salvage my equipment" style="letter-spacing:0.5px; text-decoration:none; color:white; font-variant:small-caps; font-family:serif; font-weight:500">foundry</a></div>';
}
else { //for Firefox 3.6 or older
document.getElementById('playerHud').innerHTML += '<div align="left" style="position:relative; width:134px; top:51px; left:354px; background:url(\'http://dl.dropbox.com/u/1756571/forgebg2.png\') repeat-x; padding:9px 3px 7px 2px; overflow:visible;">&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://apps.facebook.com/levynlight/mastery.php" title="Upgrade my weapons" style="letter-spacing:0.5px; text-decoration:none; color:white; font-variant:small-caps; font-family:serif; font-weight:500">forge</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="http://apps.facebook.com/levynlight/foundry.php" title="Salvage my equipment" style="letter-spacing:0.5px; text-decoration:none; color:white; font-variant:small-caps; font-family:serif; font-weight:500">foundry</a></div>';
}