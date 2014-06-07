// ==UserScript==
// @name           Ikariam Solariam
// @namespace      Ikariam Solariam
// @description    Simplification of the Ikariam Solariam script by Foxtrod II. Darkens the town view at night and lightens is around noon (user time, not server time).
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version        1.0.0
// @include        http://s*.ikariam.*/index.php?*view=city*
// ==/UserScript==

const timeMap = [
	[ '#660099', 0.8 ],	//0
	[ '#660099', 0.8 ],	//1
	[ '#660099', 0.8 ],	//2
	[ '#663399', 0.8 ],	//3
	[ '#9966CC', 0.8 ],	//4
	[ '#FF66FF', 0.9 ],	//5
	[ '#FF99FF', 0.95 ],	//6
	[ '#FFCCFF', 0.95 ],	//7
	[ '#FFFFFF', 1 ],	//8
	[ '#FFFFFF', 1 ],	//9
	[ '#FFFFEE', 0.97 ],	//10
	[ '#FFFFDD', 0.95 ],	//11
	[ '#FFFFBB', 0.9 ],	//12
	[ '#FFFFBB', 0.9 ],	//13
	[ '#FFFFDD', 0.95 ],	//14
	[ '#FFFFEE', 0.97 ],	//15
	[ '#FFFFFF', 1 ],	//16
	[ '#FFFFFF', 1 ],	//17
	[ '#FFCCFF', 0.95 ],	//18
	[ '#FF99FF', 0.95 ],	//19
	[ '#FF66FF', 0.9 ],	//20
	[ '#9966CC', 0.8 ],	//21
	[ '#663399', 0.8 ],	//22
	[ '#660099', 0.8 ]	//23
];

const hour = new Date().getHours();

GM_addStyle(
	'div#mainview	{ position: relative; margin: 0px 0px; }' +
	'div#solariam	{ position:relative;margin:0px 29px -18px 251px; z-index:30; padding:0px 0px; background-color: ' + timeMap[hour][0] + '; }'
);

$("div#mainview").wrap('<div id="solariam"></div>')
$("div#solariam div#mainview").css('opacity', timeMap[hour][1]);