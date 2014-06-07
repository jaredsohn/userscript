// ==UserScript==
// @name       Facepunch - Fix ILY's name
// @namespace  http://facepunch.com/member.php?u=446188
// @version    0.1
// @description  ILY accidentally changed his name
// @match      http://*facepunch.com/*
// @copyright  2012+, BTYM
// ==/UserScript==

var ILY = $('font:contains("Adnap")')
for (i=0; i<ILY.size(); i++)
    $(ILY[i]).text("ILY");