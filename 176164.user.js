// ==UserScript==
// @name        Outlook.com (Hotmail) Calendar Monthly Expand Items
// @namespace   http://userscripts.org/users/368084
// @description	Auto-expand monthly calendar items
// @include     https://*.calendar.live.com/*
// @grant       none
// @run-at      document-end
// @author      blitzter47
// @version     20130820
// ==/UserScript==

function clic(element)
{
	var evt = document.createEvent("MouseEvents");
	evt.initEvent("click", true, true);
	element.dispatchEvent(evt);
}
function expand_core() {
	if (document.getElementById('ns1_cellMore_1') != null)
	{

	for (var i=0; i<35; i++)
	{
	if (document.getElementById('ns1_cellMore_' + i) != null)
	{
	var exp = document.getElementById('ns1_cellMore_' + i);
	if (exp != null)
	{
	var lnk_in = exp.innerHTML;
	if (lnk_in.match(/restant/) || lnk_in.match(/more/))
	{
	clic(exp);
	console.log('OK');
	var nxt_wk = Math.floor((i+1)/7)+1;
	i = nxt_wk*7;
	exp.innerHTML = "";
	}
	if (lnk_in.match(/Afficher moins/) || lnk_in.match(/Show less/))
	{
	exp.innerHTML = "";
		
	}
	}
	else
	continue;
	}
	}
}
}
function expand() {
	expand_core();
	setTimeout(expand_core, 2000);
}
var refr = document.getElementById('gridNavigator');
var div1 = document.createElement('div');
div1.setAttribute('style', 'display : inline');
refr.appendChild(div1);
var button = document.createElement('input');
button.setAttribute('type', 'button');
button.setAttribute('id', 'exp_all');
button.setAttribute('value', 'Expand All Here Manually');
//button.setAttribute('onClick', 'expand();');
div1.appendChild(button);
var el = document.getElementById("gridNavigator");
if (el.addEventListener)
    el.addEventListener("click", expand, false);
else if (el.attachEvent)
    el.attachEvent('onclick', expand);
window.onload = function () {
//var execu = setInterval(function () {
expand();
//}, 2000);
}
