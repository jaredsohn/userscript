// ==UserScript==
// @name FusionGanja :: Battlefield
// @author Пушкенъ (fix W_or_M)
// @namespace FG
// @version 0.1.7
// @description Графическое улучшение для страницы боя и страницы наблюдения за боем. ВНИМАНИЕ: не работает в JavaScript версии боя
// @license GPL v3 или любая другая поздняя версия (http://www.gnu.org/copyleft/gpl.html)
// @include http://*.ganjawars.ru/b*/b.php*
// @include http://ganjawars.ru/b*/b.php*
// @include http://*.ganjawars.ru/warlog.php?bid=*
// @include http://ganjawars.ru/warlog.php?bid=*
// @grant none
// ==/UserScript==
//                                      НАСТРОЙКИ 

// Строка информации. Выводится при подсветке изображения персонажа на поле боя
//	 Переменные:
//		 %name%		Имя
//		 %hp% 		HP в формате n/N, где n - текущее значение, N - максимальное
//		 		значение
//		 %range%	Расстояние
//		 %power%	Мощность
//		 %damage%	Урон
//		 %visibility%	Видимость
//		 %weapon%	Оружие в руках
//
// ... вы можете использовать html теги для форматирования строки
var HOVER_INFO_FORMAT = '<b>%name% [%hp%]</b>, видимость: %visibility%%, в руках: %weapon%, урон: %damage% (<b>%frags%</b>)';

//           ВСЕ, ЧТО НИЖЕ ЭТОЙ СТРОКИ ВЫ ИЗМЕНЯЕТЕ НА СВОЙ СТРАХ И РИСК

(function() {
var init_time = (new Date().getTime());
var myCSS = document.createElement('style');
myCSS.type = 'text/css';
myCSS.innerHTML = "\
#battlefield { display: block; border-collapse: collapse; overflow: auto; overflow-y: hidden }\
#battlefield td { width: 39px; min-width: 39px; min-height: 46px; border: 1px dashed #fff; text-align: center; line-height: 1px; font-size: 1px }\
#battlefield td { background: url('http://quest.ganjawars.ru/imap/terrain.gif') top left repeat } \
.ruller td { background: none !important; height: 12px; line-height: 12px; font-size: 11px !important; font-weight: bold }\
#modeselector th { background: none !important; height: 12px; line-height: 12px; font-size: 11px !important; text-align: right }\
";
document.getElementsByTagName('head')[0].appendChild(myCSS);

var myJS = document.createElement('script');

myJS.type = 'text/javascript';
myJS.innerHTML = "\
var hideinfo_timer = null;\
function evaluateNode(xpath, contextNode) {\
	return (document.evaluate(xpath, contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);\
}\
function ajaxQuery(url, rmethod, param, async, onsuccess, onfailure) {\
	var xmlHttpRequest = new XMLHttpRequest();\
	if (async == true) {\
		xmlHttpRequest.onreadystatechange = function () {\
			if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200 && typeof onsuccess != 'undefined') onsuccess(xmlHttpRequest);\
			else if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status != 200 && typeof onfailure != 'undefined') onfailure(xmlHttpRequest);\
		}\
	}\
	if (rmethod == 'POST') xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');\
	xmlHttpRequest.open(rmethod, url, async);\
	xmlHttpRequest.send(param);\
	if (async == false) {\
		if (xmlHttpRequest.status == 200 && typeof onsuccess != 'undefined') onsuccess(xmlHttpRequest);\
		else if (xmlHttpRequest.status != 200 && typeof onfailure != 'undefined') onfailure(xmlHttpRequest);\
	}\
}\
function getCookie(name) {\
	var dc = document.cookie;\
	var begin = dc.indexOf(name);\
	var end = (dc.indexOf(';', begin) == -1) ? dc.length : dc.indexOf(';', begin);\
\
	return unescape(dc.substring((begin + (name.length + 1)), end));\
}\
function setCookie(name, value) {\
	if (!name || !value) { return 0; }\
\
	document.cookie = name + '=' + value + ';domain=ganjawars.ru;path=/;';\
}\
function toggleRuller(n) {\
	if (n == 0) {\
		document.getElementById('range').setAttribute('style', 'display: table-row');\
		document.getElementById('dyncenter').setAttribute('style', 'display: none');\
		setCookie('rullermode', '0');\
	} else {\
		document.getElementById('range').setAttribute('style', 'display: none');\
		document.getElementById('dyncenter').setAttribute('style', 'display: table-row');\
		setCookie('rullermode', '1');\
	}\
}\
function handle(delta) {\
	if (delta < 0)\
		document.getElementById('battlefield').scrollLeft += 20;\
	else\
		document.getElementById('battlefield').scrollLeft -= 20;\
}\
function wheel(event) {\
	var delta = 0;\
	if (!event) event = window.event;\
	if (event.wheelDelta) {\
		delta = event.wheelDelta/120;\
	} else if (event.detail) {\
		delta = -event.detail/3;\
	}\
	if (delta)\
		handle(delta);\
        if (event.preventDefault)\
                event.preventDefault();\
        event.returnValue = false;\
}\
function showPokemonInfo(textHTML) {\
	if (hideinfo_timer) {\
		window.clearTimeout(hideinfo_timer);\
		hideinfo_timer = null;\
	}\
	if (textHTML) document.getElementById('hover-info').innerHTML = unescape(textHTML);\
}\
function timeHidePokemonInfo() {\
	hideinfo_timer = window.setTimeout(hidePokemonInfo, 500);\
}\
function hidePokemonInfo() {\
	document.getElementById('hover-info').innerHTML = '&nbsp;';\
}\
function selectEnemyBattlefield(nn) {\
	var selectEnemy = evaluateNode(\"//select[contains(@name,'enemy')]\", document);\
	if (selectEnemy != null) {\
		for (var i = 0; i < selectEnemy.length; i++) {\
			if (selectEnemy.options[i].textContent.indexOf(nn) != -1) selectEnemy.selectedIndex = i;\
		}\
	}\
}\
";
document.getElementsByTagName('head')[0].appendChild(myJS);

var IMG_PNG = "data:image/png;base64,";

var POK_TEAM_RED	= 0;
var POK_TEAM_BLUE	= 7;
var POK_TEAM_UNDEFINED 	= 666;
var POK_CLASS_PISTOL	= 0;
var POK_CLASS_2PISTOLS	= 1;
var POK_CLASS_ASSAULT	= 2;
var POK_CLASS_SNIPER	= 3;
var POK_CLASS_HARDGUN	= 4;
var POK_CLASS_SHOTGUN	= 5;
var POK_CLASS_RPG	= 6;
var POK_CLASS_UNDEFINED = 666;

var IMG_POKEMON = [
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFAGZm"+
	"AAAAZgAAMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMABec0MwAAAAF0Uk5TAEDm2GYAAADISURBVDjLlZLBDsMgDEPrhAgQ"+
	"2nH//6tzsg1NG6SdDxzKk0NjH8ffQugMEimlCC5AFHIqmHvqNq0uUHHklBRxJ5x4SSHS8LGZtRcU"+
	"1a/wWt43GBTaDSO+Q816NzP8bEJQKcwYAFWs8iEUGoNuPnexVT6dk+nX6jpTQs75WVvbbcNniW81"+
	"LQYap8R/5p2oQeUF84dTJTcDB3rcOQZEkq7UjNP4Kjnp17MSmRXzQkAqEd8WMvV7U1Zhjfm9dZ2V"+
	"2nkBffQUebvtkQf40QPq9wN2fQAAAABJRU5ErkJggg=="),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFAGZm"+
	"AAAAZgAAMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMABec0MwAAAAF0Uk5TAEDm2GYAAADbSURBVDjLlZJRD4MgDIS9lgYI"+
	"2YMP+/9/dddqmHGCriGSwJfjvHZZ/i5E3UEiKSXBA4iFORXMe6rWpR5Q8ZlTksSVcKMliUjBIZlr"+
	"LSiyX2EP7wwGhfJCi3OoWa1mdpLDKqKZhd4GQPVEaRwTimqNav7uUafwwn2pbw7mq54SK6D5tKZr"+
	"2xvklIivge1OMXUZ2t4p8MWcC+3/2D7ETJmWS8mzUYx/DEDG3YbBU+VijSlXS64mN/O1jcREalEN"+
	"Q0wgzOkQsmikKTO9xvzeqvbejLSA2uoU+Y7NCPkAD8oEkvjFth4AAAAASUVORK5CYII="),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFAGZm"+
	"AAAAZgAAMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMABec0MwAAAAF0Uk5TAEDm2GYAAADESURBVDjLlZLBEsMgCESzIKOO"+
	"k2MP/f8fLRCTtBmD6R48yJsVF5blT8E1g4hSSoQHkAox5cwrdDusHlB+xBQlMidMvCgpUrDMvMDI"+
	"VwpXCmVFQ4/30Df1Pq+riIC71h8KBBHWumgJajmw8he1866S8/AT0KBKa2Zp/F0cilHuRBCZFQ2i"+
	"SWCbEwW59s4t/5DK9gEfU7jONiJT2Je+Zl1N9mtbicjKZuIQe1x8CwlbXSdZ6xizulQ+l+LGS7el"+
	"1RDZ3SLkA8suA9PrVs55AAAAAElFTkSuQmCC"),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFAGZm"+
	"AAAAZgAAMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMABec0MwAAAAF0Uk5TAEDm2GYAAADXSURBVDjLlZLRDsMgCEV3UaPG"+
	"LHUP+/9f3QVnu2wt7XjwQU6OCNxu/wQsziCRGKPgAsSATxnzdG2r6gJlh09JFDXNb+LAJZFIwdqU"+
	"38YMFwKyUSEh8ah7FModDR8mfEnx2C5qSgF9YfROYaLyLQUEvB2pDir70jfRdPFFVo5uqZ7z7kzB"+
	"RpXWNMd+HE6dmGQzupsxNe5WUDNMUhxTsZe0/y6V9QM2JneddUQabl18Tas62a+xEp4qBLUQCtau"+
	"cAhxwNAz1bqPaT7VsC3FgYvb0qqLTNsJ8gIqDQU6G5euawAAAABJRU5ErkJggg=="),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFAGZm"+
	"AAAAZgAAMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMABec0MwAAAAF0Uk5TAEDm2GYAAADPSURBVDjLlZLBDoMgEESdXYgQ"+
	"0gva9P//tANWg5Wydkw8bF6eMuw0/RfUWJCIc05wA2IwpirzHNoO1Q2qvsaUOCkmGC5xRAImywXF"+
	"bFIIDySrCcHMwL4fA5rAGrCnGX9B5YCxBpc0f0/II2d4eD0e7yMizi4sC5RtpJOocTkJnFBVmmUd"+
	"KJ7LPfB4ISW6kOZN0NlJ3kxgDZvL6EuWRcQon8lZhsuKsqyort+fVHyWi3vhFdplOJdqWV+rZ7k9"+
	"TFEE2jTZd0Fj8iNix6rrF/EGcV8FYpZM058AAAAASUVORK5CYII="),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFAGZm"+
	"AAAAZgAAMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMABec0MwAAAAF0Uk5TAEDm2GYAAADLSURBVDjLlZLRDsMgCEW9gKnG"+
	"NHvpsv//0wHtmm0luPFgGnN6lCul/F/wmkFEIkL4AdJCTjlzT22n6gfKl5wiITNh4iJRpKHMXGAs"+
	"UwptxZglQVi0MH+fCVSgMejVzw4RQ+IcHaGiI749CF91vZG60NdewdVKXbdPyneF2o4zxy6uXK29"+
	"NsZ+ahvXZ9K/2QRtGW7QZIM8DrstZGWf6RtZEumwwobVdcnsMI7hImsGHDK6T27ZHlvV0CJMG1QB"+
	"v6Ueu8B91Ix4Ye6KiCedqwQ752xtmQAAAABJRU5ErkJggg=="),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFAGZm"+
	"AAAAZgAAMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMABec0MwAAAAF0Uk5TAEDm2GYAAADhSURBVDjLjZLbDsMgDEPrQAQI"+
	"6Nv+/1dnSHdBo9EsUbXl1E2Cj+MjTB2+IBJjFPwBUfCpyTxct7fVH9S8+JREGU6jTTheEonkScHz"+
	"QkAaAAquAW4o5I469xVktATFOvMfaeld+xtDUS0mVUWqdKoFfOx8j71XrVwJCPyEa6mM268ms1VN"+
	"jlqhzE2xeaXvn6xQSokeMqB0O9OBERoV5dsTGhNHnlZODmllRfshnIQlAi52RUf85NhMxcsX6ALL"+
	"9V1pATjbdT5ifYYdhHa+OOF922DLWTcy7dy4hU24wr4wl3kCPuYFlY62bRQAAAAASUVORK5CYII="),
	(IMG_PNG + 
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFZgAA"+
	"AAAAAGZmMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMAo9uN7AAAAAF0Uk5TAEDm2GYAAADQSURBVDjLnZLbisMwDEQ7ElZs"+
	"h772/z91ZxRadmksw+ohEPtwdPPj8d9Axg6yiDCrMcScc4fR9BIVO+qKUgaKbFsZu7M5jdA39atz"+
	"dP4khpv5CNQ5DjhuXGitjdGa5zFOPDtuKPePTS6GZPiqij7HeV4oocWOrutODTOxgWKqvO6HsSYx"+
	"xfBTqama8tbrVn9H7zWFpLaqmYkrl2q3mMGUFWUKbRElNU2VRf3ykZoQvEJyoeb5dsD9riA+Dm9i"+
	"9V1j7/Ah2KukjHGONfTH+IZ+ALUpBJs+n3ZlAAAAAElFTkSuQmCC"),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFZgAA"+
	"AAAAAGZmMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMAo9uN7AAAAAF0Uk5TAEDm2GYAAADgSURBVDjLnZLrCoMwDEb3JaTp"+
	"hf0dvv+T7kvFbWJbYUEQ6+E0t8fj30CPO0hSSiJrDKnWeofR9Aoq3VF7LGWgSG4zY3VSqxC6Uj+V"+
	"I/OjYxj0J8A4h0MxcMHMSjHTfoyGZ8aAUv3YwsVQkQ2XrOhTtLaj7v2lk9nFX+dN0J48WMhkyIy0"+
	"JaZPZAD9FEEPH1Ij17cI4QQm1FGEe3bnjRhTnyJy9hbC+Sqyn/ulK4ibE7FFV2Fzl9QtTClMS1n0"+
	"TOp8v3ovRPvucAQ6g9hXtT5GW2FHaLHxyE9gaWUOnYwH9AbrvQVhp/Oo8wAAAABJRU5ErkJggg=="),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFZgAA"+
	"AAAAAGZmMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMAo9uN7AAAAAF0Uk5TAEDm2GYAAADKSURBVDjLnZLBDgMhCEQdjKiY"+
	"vTbp//9ogd1Nu92KSefgxecIDCn9L7hWEDEzUYyBRWSFqdPDKF5Ru0IzqBEtK9PuSIQUir9sCjr2"+
	"SX2/QEXGzQtXJQxsDTdqy4dQSulv/on0y2wAyipa9AD9Dgm1tvNBw7RHG4LeqckYTXNCtA1GVp1r"+
	"nJBj8eqg0fFvGJCNSo4OovXSubMwakiRib20iBKvjOPNh9uwwTMk+8Cy747lNYN61xSNtXOOncrd"+
	"4Bx9quqjz6GL4w69AHC2BIJLPuH1AAAAAElFTkSuQmCC"),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFZgAA"+
	"AAAAAGZmMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMAo9uN7AAAAAF0Uk5TAEDm2GYAAADbSURBVDjLpZLJjsQgDERTtjCb"+
	"RuHUmv//0imTSW9qnEPXgQjp8SC2t+2rYOYKEjMTiTFYa+0Ko+nmlF1RR0IZKJL1y3D/QWlNCL1T"+
	"uMc3hd+JvVM1KRK4+CZD8eTCp2zo+Cl4oioliYYxdmZAU6oP/vd0PXSDUOfn/8C+Qz40ycmcxzzA"+
	"tUBW9SLhJWd6L+wTomlwS2Zd4w6dwggqctjiNnqp2ry5RJix7tYMOaTE411ESLX5MosnH1NjDq8Q"+
	"nQXTOTuA6gqqnKLkrK9r7IxWhzW6lKm9rqEXI6E/3KsF+AFWgwUAAAAASUVORK5CYII="),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFZgAA"+
	"AAAAAGZmMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMAo9uN7AAAAAF0Uk5TAEDm2GYAAADYSURBVDjLpZLLDsIwDARZW3mL"+
	"S4vg//+UdRAtLSQ+4KpSVE2mib2Xyx+FXh4kMUaROYZYa/Uwmu5GRY961VQGisQ9GW8ntQqh+S8z"+
	"wY5NqQSF72q4ZrhUYpnMaSuhHzPCeYR2T4n4/rpV6cVF3DEUlBCCbg8ClgWhmG2ncNA1dkGxrrau"+
	"9XwwmI8bmnXUZED+PNghd3xTA12tZV50nlO6Usqc1Cw5sq7iZZqzWRYRNzd0waI6whRsGaRHjJgO"+
	"ILYz3B63bhTu0QG2lZp2oNvJ0IoOoY1UfUNP6VkF9T67bBYAAAAASUVORK5CYII="),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFZgAA"+
	"AAAAAGZmMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMAo9uN7AAAAAF0Uk5TAEDm2GYAAADSSURBVDjLnZLLDsMgDASztiA8"+
	"FPUStf//p12TKqkawFJ94TKM7YVl+bPQyoMkxigyxxBLKR5G09Oo6FFHTWWgSNzJuJ2UIoTmLRPB"+
	"hk2pFQrfVbEluNTKMpkTK6HxG+HaMoFhdClkfGKVxsQOhp8yskM96ApWipC3zMjKfbpTonqciU3t"+
	"Eu5dazq61Zps0aA0dzJgos1U12RaFnpPbSta7DbQLLXYknD/jYnsq44whY0r7YsR0wHEqML+2ptR"+
	"eEcH2Fdu1A50Fxlq1iF0khbVBb0BOTwE0Pu2XFAAAAAASUVORK5CYII="),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAcCAMAAADRNYZUAAAAAXNSR0IArs4c6QAAAE5QTFRFZgAA"+
	"AAAAAGZmMzMzmQAAZmZmM5mZ/5lmmWYzzJmZAJmZ/8yZZmYz////MzMAzMzMmZmZMwAA/5kAzMxm"+
	"ZplmzAAAAMzMmcyZADMzZjMAo9uN7AAAAAF0Uk5TAEDm2GYAAADpSURBVDjLhZLbDsMgDENrULjT"+
	"x/3/p86BddoGzfzQInHkxCHHsRGGDltwIQTnbAyhlPIPo9NDqfCPmjLNQCNnd4YR0JXiCN1RGFQi"+
	"ODCsA9JfHt8Ij40XxGchBxlURU9YKEiX3pXb6qJylp5zRq50qxEikqd4eFMinhceiBWode91wFMz"+
	"HxNqxMDulwf/LB91XjqGRP529FExGqUYo4El7Y6YQvcvqeW1oPZor8WMYVSk11gIZ241H/paHHO/"+
	"xqi0OZi7Oq6ZIOwxP/O9vNBOwO+gdja4i+F5xdTpbOTa9rW/K/7I33W2ME/jVAYuL5AqBgAAAABJ"+
	"RU5ErkJggg==")
];

var IMG_HEALTH = [
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRFAP8A"+
	"////AAAA/5kA/wAAO6ngRwAAAAF0Uk5TAEDm2GYAAAAcSURBVAjXY2BSQgcMDIqC6EABU8xRAas6"+
	"LOYBALqOCN/Jx9ctAAAAAElFTkSuQmCC"
	),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRFAP8A"+
	"////AAAA/5kA/wAAO6ngRwAAAAF0Uk5TAEDm2GYAAAAdSURBVAjXY2BSQgcMDIqC6EABQ8zFUQGr"+
	"OizmAQDDHwkSMT5EZQAAAABJRU5ErkJggg=="
	),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRFAP8A"+
	"////AAAA/5kA/wAAO6ngRwAAAAF0Uk5TAEDm2GYAAAAfSURBVAjXY2BSQgcMDIqC6EABTUzExcVR"+
	"Aas6LOYBAMxqCUjwzxGWAAAAAElFTkSuQmCC"
	),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRFAP8A"+
	"////AAAA/5kA/wAAO6ngRwAAAAF0Uk5TAEDm2GYAAAAfSURBVAjXY2BSQgcMDIqC6EABRUzEBQgc"+
	"FbCqw2IeAN6RCa71J6alAAAAAElFTkSuQmCC"
	),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRFAP8A"+
	"////AAAA/5kA/wAAO6ngRwAAAAF0Uk5TAEDm2GYAAAAeSURBVAjXY2BSQgcMDIqC6EABWcwFDBwV"+
	"sKrDYh4A8PEKEUvw1i0AAAAASUVORK5CYII="
	),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRFAP8A"+
	"////AAAA/5kA/wAAO6ngRwAAAAF0Uk5TAEDm2GYAAAAeSURBVAjXY2BSQgcMDIqC6EABIWYMBYYK"+
	"WNVhMQ8A6VYJ30vKinAAAAAASUVORK5CYII="
	),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRFAP8A"+
	"////AAAA/5kA/wAAO6ngRwAAAAF0Uk5TAEDm2GYAAAAfSURBVAjXY2BSQgcMDIqC6EABJiZsDAOG"+
	"CljVYTEPAPCECgMDojPRAAAAAElFTkSuQmCC"
	),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRFAP8A"+
	"////AAAA/5kA/wAAO6ngRwAAAAF0Uk5TAEDm2GYAAAAeSURBVAjXY2BSQgcMDIqC6EABKmaMAIYK"+
	"WNVhMQ8A/g4KRRvbxIsAAAAASUVORK5CYII="
	),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRF/5kA"+
	"////AAAAAP8A/wAAoVPkcwAAAAF0Uk5TAEDm2GYAAAAfSURBVAjXY2BSQgcMDIqC6EABLCZsjAQM"+
	"FbCqw2IeAAW3Cml7cgTAAAAAAElFTkSuQmCC"
	),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRF/5kA"+
	"////AAAAAP8A/wAAoVPkcwAAAAF0Uk5TAEDm2GYAAAAeSURBVAjXY2BSQgcMDIqC6EABJGaMAgwV"+
	"sKrDYh4AFAcKqySq5i8AAAAASUVORK5CYII="
	),
	(IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAACUAAAAFBAMAAAAwHDgGAAAAAXNSR0IArs4c6QAAAA9QTFRF/5kA"+
	"////AAAAAP8A/wAAoVPkcwAAAAF0Uk5TAEDm2GYAAAAeSURBVAjXY2BSQgcMDIqC6ECBQdEYDRgq"+
	"YFWHxTwAI00K77kviJAAAAAASUVORK5CYII="
	)
];

var IMG_FAVICON = (IMG_PNG +
	"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAsJJREFUOMt1"+
	"k29olXUUxz/n/J7de7d7Vyydl/knmYiZ2l64ZcNGxQJhSlAxIrTShOxFEL7xTb2yF72RkCCCDNxi"+
	"/bEbRNOQEDFK/PPGhmXMGqUV3tqcOqbb3X3u85zTi2BtMD/vzoHzgcM5X5jDofvID4S6Ru7CYVjb"+
	"V6A4t6fzigmWVKPa4/OGlpUk3tkefVBPRyq8vfQlbiwo+HYvGpqilZ7wxrEecr65JL65JM+tPC79"+
	"nw/t0ipHA8ijX+2yBQXVf3qQW8laF9r+PiG9Pzx7UGBKSuf7u0LNDggUROWvmy+OyIKC8unjiFIU"+
	"Q8X8+fEj5+j/c09z6rxrTp2DpsbFyaFrPk/Qlys2xdk9svRlIUZvugARXdcv5ZfYRPK0OGsAxRjP"+
	"kxvccOLq7AoD9eQiqqO9/XpoctWHjV/m7PZYBcwTshZNrUsrbCdCHFzh6+62yq07009En41830rG"+
	"tsbgMhBYVXV+RDmtWX0rmbZvEDJE9JGyg5RAYFybGrbYzMxqKrYPoV2NMfeoW05lmsMfdv2TmrA1"+
	"pIy54wYrEEZxFrtjoZF3whTrY5Ue3F2EWFReeyX2IwLwkeqDJnYscVoQ1FJMAwEwC9wOAbcZ7nEh"+
	"EWNCVV7XTh/cfRZXgPZOu5wGdqrzuwmpCKmlJG6IJDQS0yDKHRE+pZjpeqqzd3D3WRxAAD4u3Jur"+
	"2OQLUvEdmmOTGQgkaQ0FRBXDGTbju/rAT6Z1J+/veHP0yrZ1IgCHs8iK1ge0fPmXR+LAk9k8LRmn"+
	"eXKabRiJ/Hda9QQJjlvEBCmlXEP+vdmv8jMI++F8GalNsWl5IRo+9XNyEKe73uWAibe4QDXSYQk2"+
	"9PCrq0faygX/X7ChXa4VLxR++5WHHlvDRZYzfbKIlt9nY90MLdsTjt4tpfhe9EIr68+0SccXzxTD"+
	"6DJmxZe2IOcWzU/tXP4FZhkpqOElYn0AAAAASUVORK5CYII=");

var favicon = {
	change: function(iconURL) {
		if (arguments.length == 2) {
			document.title = optionalDocTitle;
		}
		this.addLink(iconURL, "icon");
		this.addLink(iconURL, "shortcut icon");
	},
	 
	addLink: function(iconURL, relValue) {
		var link = document.createElement("link");
		link.type = "image/png";
		link.rel = relValue;
		link.href = iconURL;
		/*
		 * "вива ля гугл!" или "маё любимае глюкало", посвящается незыблемости идеалов вы3си ))
		 */
		// this.removeLinkIfExists(relValue);
		this.docHead.appendChild(link);
	},
	 
	removeLinkIfExists: function(relValue) {
		var links = this.docHead.getElementsByTagName("link");
		for (var i = 0; links.length; i++) {
			var link = links[i];
			if (link.type == "image/png" && link.rel == relValue) {
				this.docHead.removeChild(link);
				return;
			}
		}
	},
 
	docHead:document.getElementsByTagName("head")[0]
};
favicon.change(IMG_FAVICON);

function grep(p, expr) {
	return ((p.innerHTML.search(expr) != -1) ? RegExp.$1 : new String());
}

function trimImageTitle(untrimmedTitle) {
	if ((untrimmedTitle) && (untrimmedTitle.search(/(.+) \[\d+\/\d+\]/) != -1)) {
		return (RegExp.$1);
	}
}	

function absoleteWeaponName (e) {
	if (e.search(/(?:\[(?:[^\]]+)\] )?(.*)(?: \[)?/) != -1) return (RegExp.$1);
}

function Pokemon () {
	this.nickName = new String;
	this.unitClass = POK_CLASS_UNDEFINED;
	this.lvl = 0;
	this.uID = 0;
	this.hp = 0;
	this.hpMax = 0;
	this.distance = 0;
	this.power = 0;
	this.kills = 0;
	this.visibility = 0;
	this.posX = 0;
	this.weaponSlots = 0;
	this.ammunitionSlot = new Array();
}

function Team() {
	this.pokemon = new Array();
	this.teamColor = POK_TEAM_UNDEFINED;
	this.initFromTD = function (td) {
		this.pokemon = new Array();
		var b = td.getElementsByTagName('b');
		for (var i = 0; i < b.length; i = i + 2) {
			var pok = new Pokemon();
			ptr_b = b[i];
			pok.nickName = ptr_b.textContent;
			if (ptr_b.parentNode.href) {
				if (ptr_b.parentNode.href.search(/\/info\.php\?id=(\d+)/) != -1) pok.uID = RegExp.$1;
				ptr_b = ptr_b.parentNode;
				if (ptr_b.nextSibling.textContent.search(/\[(\d+)\]/) != -1) pok.lvl = RegExp.$1;
			} else {
				var ensel = unsafeWindow.evaluateNode("//select[contains(@name,'enemy')]", document);
				if (ensel != null) {
					for (var j = 0; j < ensel.length; j++) if (ensel.options[j].textContent.indexOf(pok.nickName) != -1) {
						if (ensel.options[j].textContent.search(/\[(\d+)\] - \d+$/) != -1) pok.lvl = RegExp.$1;
					}
				}
			}
			ptr_b = ptr_b.nextSibling.nextSibling;
			pok.distance = grep(ptr_b, /расстояние: (\d+)/);
			pok.hp = grep(ptr_b, /HP: (\d+)\/\d+/);
			pok.hpMax = grep(ptr_b, /HP: \d+\/(\d+)/);
			pok.power = grep(ptr_b, /мощность: \d+/);
			pok.damage = grep(ptr_b, /урон: (\d+)/);
			pok.kills = grep(ptr_b, /урон: \d+ \(<b>(\d+)<\/b>\)/);
			pok.visibility = grep(ptr_b, /видимость: (\d+)%/);
			var li = ptr_b.getElementsByTagName('li');
			for (var j = 0; j < li.length; j++) pok.ammunitionSlot.push(li[j].textContent);

			var bf_lines = document.getElementById('battlefield').childNodes[0].childNodes[0].childNodes;
			var pok_img = null;
			for (var j = 0; j < bf_lines.length; j++) {
				var line_imgs = bf_lines[j].getElementsByTagName('img');
				if (line_imgs) for (var k = 0; k < line_imgs.length; k++) {
					if (line_imgs[k].getAttribute('title') && (line_imgs[k].getAttribute('title').indexOf(pok.nickName) != -1)) {
						pok_img = line_imgs[k];
						pok.posX = j;
						k = line_imgs.length;
						j = bf_lines.length;
					}
				}
			}
			if ((pok_img) && (pok_img.src.search(/\/(?:left|right)_(\w+)\.gif/) != -1)) {
				tmp_class = RegExp.$1;
				pok.weaponSlots = 1;
				switch (tmp_class) {
					case 'sniper':
						pok.unitClass = POK_CLASS_SNIPER;
						break;
					case 'hardgun':
						pok.unitClass = POK_CLASS_HARDGUN;
						break;
					case '2guns':
						pok.unitClass = POK_CLASS_2PISTOLS;
						pok.weaponSlots = 2;
						break;
					case 'pistol':
						pok.unitClass = POK_CLASS_PISTOL;
						break;
					case 'rpg':
						pok.unitClass = POK_CLASS_RPG;
						break;
					case 'automat':
						switch (absoleteWeaponName(pok.ammunitionSlot[0])) {
							case 'РПГ':
								pok.unitClass = POK_CLASS_RPG;
								break;
							case 'Дробовик Hunter':
							case 'Remington 870':
							case 'Nova Tactical':
							case 'M-37':
							case 'ТОЗ-194':
							case 'Jackhammer':
							case 'SPAS 12':
							case 'Страйкер':
							case 'Сайга':
							case 'Рысь':
							case 'Neostead':
							case 'XM-26 LSS':
							case 'HAWK 97':
							case 'Benelli M4':
							case 'Mossberg 590':
							case 'Вепрь-12':
							case 'MAG-7':
							case 'USAS-12':
								pok.unitClass = POK_CLASS_SHOTGUN;
								break;
							default:
								pok.unitClass = POK_CLASS_ASSAULT;
								break;
						}
						break;
					default:
						GM_log('Ошибка, не найден класс');
						break;
				}
			}
			this.pokemon.push(pok);
		}
		var left_corner = unsafeWindow.evaluateNode("//table[contains(@id,'battlefield')]//tr[1]/td[1]/img[1]", document);
		this.teamColor = (this.byNickName(trimImageTitle(left_corner.title)) != null) ? POK_TEAM_RED : POK_TEAM_BLUE;
	};
	this.byNickName = function (nn) {
		for (var i = 0; i < this.pokemon.length; i++) {
			if (this.pokemon[i].nickName == nn) return (this.pokemon[i]);
		}
		return (null);
	};
	this.byUid = function (uid) {
		for (var i = 0; i < this.pokemon.length; i++) {
			if (this.pokemon[i].uID == uid) return (this.pokemon[i]);
		}
		return (null);
	}
	this.frontX = function () {
		var res = ((this.teamColor == POK_TEAM_RED) ? 0 : 666);
		for (var i = 0; i < this.pokemon.length; i++) {
			if (this.teamColor == POK_TEAM_RED) res = ((this.pokemon[i].posX > res) ? this.pokemon[i].posX : res);
			else res = ((this.pokemon[i].posX < res) ? this.pokemon[i].posX : res);
		}
		return (res);
	}
}


var team_one = new Team();
var team_two = new Team();

function replaceBattlefield (battlefield_table) {
	var battlefield_div = document.createElement('div');
	battlefield_div.setAttribute('id', 'fusion-battlefield');
	
	// отключаем battlefield_table, чтобы получить нормальное форматирование
	battlefield_table.setAttribute('style', 'display: none');
	battlefield_table.parentNode.insertBefore(battlefield_div, battlefield_table);
	var battlefield_maxWidth = battlefield_div.offsetWidth;
	var battlefield_contentLines = battlefield_table.childNodes[0].childNodes[0].childNodes.length;
//	var battlefield_contentWidth = (battlefield_contentWidth * 37);
	var battlefield_contentWidth = (battlefield_contentLines * 37);

	battlefield_div.setAttribute('style', 'text-align: center; width: 100% !important');
	battlefield_div.innerHTML = '<span style="display: block; text-align: right; width: 100%"><input type="radio" id="rullermode0" value=0 name="rullermode" onclick="toggleRuller(0)">Расстояние</input>&nbsp;<input type="radio" id="rullermode1" value=1 name="rullermode" onclick="toggleRuller(1)">ДЦ</input></span>';
	
	// рисуем линейки
	var distance_offset = team_red.byNickName(trimImageTitle(battlefield_table.getElementsByTagName('img')[0].title)).distance;
	var team_red_margin = team_red.frontX();
	var team_blue_margin = team_blue.frontX();
	var dyncenter_space = team_blue_margin - (team_red_margin + 1);
	var dyncenter_fix = (dyncenter_space == (Math.floor(dyncenter_space / 2) * 2)) ? true : false;
	var dyncenter_offset = (Math.floor(dyncenter_space / 2) + team_red_margin) + ((dyncenter_fix) ? 0 : 1);
	var rangeHTML = '<tr id="range" class="ruller">';
	var dyncenterHTML = '<tr id="dyncenter" class="ruller">';
	for (var i = 0; i < battlefield_contentLines; i++) {
		rangeHTML += '<td>' + (Math.abs(distance_offset--)) + '</td>';
		if (!((battlefield_contentLines == (i + 1)) && dyncenter_fix)) dyncenterHTML += '<td>' + (Math.abs(dyncenter_offset--)) + '</td>';
		if ((dyncenter_offset == 0) && dyncenter_fix) dyncenterHTML += '<td>0</td>';
	}
	rangeHTML += '</tr>';
	dyncenterHTML += '</tr>';
	with (battlefield_table.childNodes[0]) {
		innerHTML = '<tr><th rowspan="3" class="battlefield-spacer">&nbsp;</th>' +
			'<th colspan="' + battlefield_contentLines + '" style="font-size: 0px; line-height: 0px; height: 0px">&nbsp;</th>' +
			'<th rowspan="3" class="battlefield-spacer">&nbsp;</th></tr>' +
			rangeHTML + dyncenterHTML + innerHTML;
	}
	var savedMode = unsafeWindow.getCookie('rullermode');
	if (savedMode != '0' && savedMode != '1') savedMode = '0';
	document.getElementById('rullermode' + savedMode).setAttribute('checked', true);
	unsafeWindow.toggleRuller(savedMode);

	battlefield_div.appendChild(battlefield_table);
//	battlefield_table.setAttribute('style', 'max-width: ' + battlefield_maxWidth + 'px !important');
	var battlefield_spacer = battlefield_table.getElementsByTagName('th');
	var battlefield_spacer_width = (battlefield_maxWidth - Math.floor(battlefield_contentLines * 37)) / 2;
	if (battlefield_spacer_width < 0) battlefield_spacer_width = 0;
	for (var i = 0; i < battlefield_spacer.length; i++) if (battlefield_spacer[i].getAttribute('class') == 'battlefield-spacer') {
		battlefield_spacer[i].setAttribute('style', 'width: ' + battlefield_spacer_width);
	}
	var hover_info = document.createElement('span');
	hover_info.setAttribute('id', 'hover-info');
	hover_info.innerHTML = '&nbsp;';
	battlefield_div.appendChild(hover_info);
	if (battlefield_table.addEventListener) {
		battlefield_table.addEventListener('DOMMouseScroll', unsafeWindow.wheel, false);
	}
}

function initFusionDOM () {
	var battlefield = unsafeWindow.evaluateNode("//table[contains(@align,'center')]//td/img[contains(@height,'25')][contains(@width,'20')][contains(@title,.)]", document);
	var fusion_load_banner = document.createElement('span');
	fusion_load_banner.setAttribute('style', 'font-size: 8px');
	if (!battlefield) return;
	favicon.change(IMG_FAVICON);
	if (battlefield = battlefield.parentNode.parentNode.parentNode.parentNode) battlefield.setAttribute('id', 'battlefield');
	if (window.location.href.indexOf('/warlog.php?bid=') != -1) {
		var myteam_td = unsafeWindow.evaluateNode("//table[contains(@align,'center')][contains(@width,'100%')]/tbody/tr/td[contains(@width,'15%')][contains(@valign,'top')]", document);
		var enemyteam_td = unsafeWindow.evaluateNode("//table[contains(@align,'center')][contains(@width,'100%')]/tbody/tr/td[3][contains(@width,'15%')][contains(@valign,'top')]", document);
	} else {
		var myteam_td = unsafeWindow.evaluateNode("//table[contains(@cellpadding,'1')][contains(@cellspacing,'2')][contains(@width,'100%')]/tbody/tr/td[contains(@class,'txt')][contains(@valign,'top')]", document);
		var enemyteam_td = unsafeWindow.evaluateNode("//table[contains(@cellpadding,'1')][contains(@cellspacing,'2')][contains(@width,'100%')]/tbody/tr/td[3][contains(@class,'txt')][contains(@valign,'top')]", document);
		var ph = unsafeWindow.evaluateNode("//a[contains(@href,'http://chat.ganjawars.ru/')][contains(@target,'_blank')]", document);
	}
	if ((!battlefield) || (!myteam_td) || (!enemyteam_td)) return;
	// инициализируем комманды
	team_one.initFromTD(myteam_td);
	team_two.initFromTD(enemyteam_td);
	
	team_red = ((team_one.teamColor == POK_TEAM_RED) ? team_one : team_two);
	team_blue = ((team_one.teamColor == POK_TEAM_BLUE) ? team_one : team_two);
	// наводим красоту
	replaceBattlefield(battlefield);
	replaceTeamImages(team_red);
	replaceTeamImages(team_blue);
	battlefield.setAttribute('style', 'max-width: ' + document.getElementById('fusion-battlefield').offsetWidth + 'px !important');
	var finished_time = (new Date().getTime()) - init_time;
	fusion_load_banner.textContent = 'FusionGanja loaded in ' + finished_time + 'ms. ';
	ph.parentNode.insertBefore(fusion_load_banner, ph);
}
function pokinfoFmt(p) {
	var r = (typeof HOVER_INFO_FORMAT != 'undefined') ? HOVER_INFO_FORMAT : p.nickName;
	if (typeof HOVER_INFO_FORMAT != 'undefined') {
		while (r.indexOf('%name%') != -1) r = r.replace('%name%', p.nickName);
		while (r.indexOf('%hp%') != -1) r = r.replace('%hp%', (p.hp + '/' + p.hpMax));
		while (r.indexOf('%level%') != -1) r = r.replace('%level%', p.lvl);
		while (r.indexOf('%range%') != -1) r = r.replace('%range%', p.range);
		while (r.indexOf('%power%') != -1) r = r.replace('%power%', p.power);
		while (r.indexOf('%visibility%') != -1) r = r.replace('%visibility%', p.visibility);
		while (r.indexOf('%damage%') != -1) r = r.replace('%damage%', p.damage);
		while (r.indexOf('%frags%') != -1) r = r.replace('%frags%', p.kills);
		while (r.indexOf('%weapon%') != -1) r = r.replace('%weapon%', ((p.weaponSlots == 2) ? p.ammunitionSlot[0] + ", " + p.ammunitionSlot[1] : p.ammunitionSlot[0]));
	}
	return (r);
}
function replaceTeamImages(t) {
	var img_health = new Array();
	var cookie_uid = unsafeWindow.getCookie('uid');
	var selectable = ((t.byUid(cookie_uid) == null) && (unsafeWindow.evaluateNode("//select[contains(@name,'enemy')]", document))) ? true : false;
	for (var i = 0; i < t.pokemon.length; i++) {
		var pok_img = unsafeWindow.evaluateNode("//img[contains(@title,'" + t.pokemon[i].nickName + "')]", document);
		img_health[i] = document.createElement('img');
		img_health[i].setAttribute('src', IMG_HEALTH[Math.floor(t.pokemon[i].hp / (t.pokemon[i].hpMax * 0.1) + 0.01)]);
		img_health[i].setAttribute('style', 'margin-bottom: 1px; margin-top: 2px');
		if (pok_img) with (pok_img) {
			setAttribute('height', 28);
			setAttribute('width', 37);
			setAttribute('src', IMG_POKEMON[t.pokemon[i].unitClass + t.teamColor]);
			setAttribute('style', 'opacity: ' + ((t.pokemon[i].visibility > 20) ? (t.pokemon[i].visibility / 100) : 0.2) + ((selectable) ? ';cursor: pointer' : ''));
			setAttribute('onmouseover', 'showPokemonInfo("' + escape(pokinfoFmt(t.pokemon[i])) + '")');
			setAttribute('onmouseout', 'timeHidePokemonInfo()');
			if (selectable) setAttribute('onclick', "javascript:void(selectEnemyBattlefield('" + t.pokemon[i].nickName + "'))");
			parentNode.insertBefore(img_health[i],pok_img );
		}
	}
}

initFusionDOM();
})();
