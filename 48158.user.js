// ==UserScript==
// @name           LoZ Speedy Fight
// @namespace      http://userscripts.org/users/89136
// @description    Shows stuff instantly instead of waiting for it to gradually be unveiled
// @include        http://legendsofzork.com/game/explore/*
// @include        http://legendsofzork.com/game/fight/*
// ==/UserScript==


// Notes:  The scroll pulse is still there.
//         And I did not bother to show the dice rolls.
//         How I use this is I have the explore page as a link on my toolbar.  
//             If the health is still high enough and enough moves left, I click the link to reload the page.


// Delete the stupid graphic
var allDivs=document.getElementsByTagName("div");
for (i=0; i<allDivs.length; i++) {if (allDivs[i].className=="m-col-2-top") {allDivs[i].style.display="none";}}

// Show the goods
if(document.getElementById('health-lost')){document.getElementById('health-lost').style.display="inline";}
if(document.getElementById('base-chance')){document.getElementById('base-chance').style.display="inline";}
if(document.getElementById('encounter-attack-defense')){document.getElementById('encounter-attack-defense').style.display="inline";}
if(document.getElementById('skills-used')){document.getElementById('skills-used').style.display="inline";}
if(document.getElementById('encounter-stance')){document.getElementById('encounter-stance').style.display="inline";}
if(document.getElementById('final-chance')){document.getElementById('final-chance').style.display="inline";}
if(document.getElementById('combat-result')){document.getElementById('combat-result').style.display="inline";}
if(document.getElementById('fanucci-card-found')){document.getElementById('fanucci-card-found').style.display="inline";}
if(document.getElementById('base-chance')){document.getElementById('base-chance').style.display="inline";}