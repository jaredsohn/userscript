// ==UserScript==
// @name           HoA quick&dirty autoadventure
// @namespace      http://userscripts.org/users/110369
// @include        http://www.heroesofardania.net/Content.asp*
// ==/UserScript==

(function(){
var x=document.getElementsByTagName('b');
var y=x.length;
x[y-2].parentNode.removeChild(x[y-2]);
x[y-2].parentNode.removeChild(x[y-2]);

var buttontype=document.createElement('span');
var a=document.getElementById('maincontentmetadiv');
if(a.parentNode)
	a.parentNode.insertBefore(buttontype,a);
GM_log('b');
if (!GM_getValue('running',false))
	buttontype.innerHTML = '<input type="button" id="start" value="Click to Start">';
else 
	buttontype.innerHTML = '<input type="button" id="stop" value="Stop">';	
GM_log('c');
if (GM_getValue('running',false)) {
	var y=window.location;
	var a=document.getElementById('lnkAttack');
	if (!a) a=document.getElementById('lnkExplore');
	y.href =a.href;}GM_log('d');


if(document.getElementById('start')) 
	document.getElementById('start').addEventListener("click",rockIt,true);
if(document.getElementById('stop')) 
	document.getElementById('stop').addEventListener("click",shutDown,true);
function rockIt() {
	GM_setValue('running',true);
	var y=window.location;
	var a=document.getElementById('lnkAttack');
	if (!a) a=document.getElementById('lnkExplore');
	y.href =a.href;}
function shutDown() {
	GM_setValue('running',false);}})();
