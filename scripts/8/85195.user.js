// ==UserScript==
// @name           cRPG
// @namespace      crpg
// @include        http://78.46.65.211/*
// @include        http://c-rpg.net/*
// ==/UserScript==


//Replace any text/string on the page (can remove text with blank)
document.body.innerHTML= document.body.innerHTML.replace(/cRPG Character Creation Page/g,"");
document.body.innerHTML= document.body.innerHTML.replace(/Try to join the battle as a merc/g,"Join");
document.body.innerHTML= document.body.innerHTML.replace(/The armies will clash together at/g,"Fight starting at");
document.body.innerHTML= document.body.innerHTML.replace(/It should usually happen in 5-24 hours. Whining about it not being /g,"");
document.body.innerHTML= document.body.innerHTML.replace(/fast enough extends it to a week. Thanks for taking notice./g,"");
document.body.innerHTML= document.body.innerHTML.replace(/Join Strategus BETA by clicking this link - only one character per game key/g,"Join Strategus BETA"); 
document.body.innerHTML= document.body.innerHTML.replace(/allowed, so chose wisely./g,"");
document.body.innerHTML= document.body.innerHTML.replace(/Convert 2 Skill Points into 1 Attribute point./g,"Convert 2 Skill Points->1 Attribute point");

