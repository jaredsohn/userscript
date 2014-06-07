// ==UserScript==
// @name           Add_Ikariam_Crowns
// @namespace      
// @description    Add a crown to each town ;D
// @author         Batnas
// @include        http://s*.ikariam.dk/*view=palace*
// @exclude        http://s*.ikariam.dk/*oldView=palace*
// ==/UserScript==
//
// Adds a crown for each city in Ikariam.
// Just fun.

var ALT = "It's cheat!!!";
var CrownTag = '<td><img title="' + ALT + '" alt="' + ALT + '" src="skin/layout/crown.gif"/></td>'
var ID = 'mainview';
var BeingReplaced = '<td></td>';
var Content = document.getElementById(ID).innerHTML;
var Length = Content.split(BeingReplaced).length-1;

while (Length >= 0)
{
	Content = Content.replace(BeingReplaced, CrownTag);
	Length = Length - 1;
}

document.getElementById(ID).innerHTML = Content;