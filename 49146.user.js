// ==UserScript==
// @name           My Brute Arena
// @namespace      mb
// @include        http://*.mybrute.com/arene
// ==/UserScript==
function  showInventory()
{
	areneRight.innerHTML = '<iframe scrolling="no" '
	+ 'src="http://'+this.getElementsByTagName("div")[3].innerHTML+'.mybrute.com/cellule#inventory" '
	+ 'width="310" height="600" align="middle" frameborder="0"></iframe>'
}
function  hideInventory()
{
	areneRight.innerHTML=defAreneRight
}
var miniCaracs = new Array
var areneRight =0;
var j = 0
var defAreneRight=""
tempElem = document.getElementsByTagName("td")
for (i in tempElem)
	if(tempElem[i].className=="areneRight")
	{
		areneRight=tempElem[i]
		defAreneRight=tempElem[i].innerHTML
		tempElem[i].innerHTML='<div style="width:310px;height:600px;padding:25px;background:url(http://forum.suicide-masters.net/samogot_files/my_Brute_background.gif)"></div>'
		areneRight=tempElem[i].getElementsByTagName("div")[0];
		areneRight.innerHTML=defAreneRight
	}
tempElem = document.getElementsByTagName("div")
for (i in tempElem)
	if(tempElem[i].className=="miniCaracs")
	{
		miniCaracs[j]=tempElem[i]
		miniCaracs[j].addEventListener("mouseover", showInventory, false);
		miniCaracs[j].addEventListener("mouseout", hideInventory, false);
		j++
	}
	