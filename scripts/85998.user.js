// ==UserScript==
// @name           Travian Resource bar plus Farsi
// @namespace      http://qdl.ir/Travian/Script
// @description    Shows travian resources
// @author         Serj_LV
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include        http://*.travian.*
// @exclude     http://*.travian*.*/hilfe.php*
// @exclude     http://*.travian*.*/log*.php*
// @exclude     http://*.travian*.*/index.php*
// @exclude     http://*.travian*.*/anleitung.php*
// @exclude     http://*.travian*.*/impressum.php*
// @exclude     http://*.travian*.*/anmelden.php*
// @exclude     http://*.travian*.*/gutscheine.php*
// @exclude     http://*.travian*.*/spielregeln.php*
// @exclude     http://*.travian*.*/links.php*
// @exclude     http://*.travian*.*/geschichte.php*
// @exclude     http://*.travian*.*/tutorial.php*
// @exclude     http://*.travian*.*/manual.php*
// @exclude     http://*.travian*.*/manual.php*
// @exclude     http://*.travian*.*/ajax.php*
// @exclude     http://*.travian*.*/ad/*
// @exclude     http://*.travian*.*/chat/*
// @exclude     http://forum.travian*.*
// @exclude     http://board.travian*.*
// @exclude     http://shop.travian*.*
// @exclude     http://*.travian*.*/activate.php*
// @exclude     http://*.travian*.*/support.php*
// @exclude     http://help.travian*.*
// @exclude     *.css
// @exclude     *.js

// @version        1.5.12.4
// ==/UserScript==

(function allInOneOpera () {
var version = '1.5.12.4';

var RunTime = [ new Date().getTime() ];

var namespace = 'http://userscripts.org/scripts/show/75431';
var GMcookieID = '';
var market_all = [];
var market_fi = [];
var market_fc = [];
var market_ftd = [];
var income = [];
var incomepersecond = [];
var resNow = [];
var fullRes = [];
var wfl = false;
var timerRB = [];
var timerP = [];
var lastTimerP = [0,0];
var lastTimerB = 0;
var timerB = [];
var timerB3 = [];
var timerF = [];
var timerOv = [];
var villages_id = [];
var village_aid = 0;
var village_aNum = 0;
var villages_count = 0;
var linkVSwitch = [];
var sumPPH = [0,0,0,0];
var merchInWork = 0;
var crtPath = window.location.href;
var crtName = crtPath.replace(/.*\/(.*)\/.*/, "$1");
var speedAK = [0,0.5,1,2];
var bgcolor = ['#66ff66','yellow','red'];
var windowID = []; // 0-Setup, 1-Overview, 2-distanceTips, 3-notes, 4-Reports
var pageElem = [
	'side_navi', // 0- left side. include menu, profile etc.
	'content', // 1- main block in center
	'side_info', // 2- right side. include village list, links, quest.
	'mid', // 3- central block. include left menu, main content and right menu
	'llist', // 4- links from plus
	'vlist', // 5- villages list
	];
var RB = new Object();
	RB.village_dorf1 = [0];
	RB.village_dorf11 = [0];
	RB.village_dorf12 = [0];
	RB.village_Dorf2 = [0,0,0,0,0];
	RB.village_Var = [0,0];
	RB.village_PPH = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	RB.overview = [-1,'0'];
	RB.wantsMem = [0,0,0,0];
//						1		2				3				4			5					6				7			8		9			10		11		12
	RB.dictionary = [0,'اتحاد','بازرگانان','میدان تمرین','مدت','تعادل منابع','اردوگاه','بازار','سربازخانه','اصطبل','کارگاه','خرید','حمله ها'];
	RB.dictFL = [0,0,0,0,0,0,0,0,0,0,0,0,0];
	RB.XY = [
		200, 10, // 0-Setup
		700, 430, // 1-Resource bar
		200, 100, // 2-Overview
		5, 400, // 3-Links
		400, 50, // 4-Report&Messages
		400, 130 // 5-Notes
		];

var img_igm = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAIAQMAAAAV9pfLAAAAAXNSR0IArs4c6QAAAAZQTFRFAPBTf39/A1tvJwAAAAF0Uk5TAEDm2GYAAAAfSURBVAjXY6g/wHAggWHBAoaJCgyzFRiWLABx6w8AAGi2CK/Y99oaAAAAAElFTkSuQmCC";
var img_car = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAMAAABYzB2OAAAAAXNSR0IArs4c6QAAAEVQTFRFAAApq5lj4NSvyrqKiXhFYlMo8unM/Pv1+fTmwLaX1s2zy8Kp1M687ObV3NO629CwtamGua+R29XC5N3Ip5pw+vft5+TaHnB6ZAAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAY0lEQVQI113NVw6AQAgE0B2avZf7H1XQNW6chJ+XAVLyjBDlIRWhEEw/IoZASiOowvX8zEyfZv/KYSSMoCVLZUYOQbI+VBs5+ADSfEQ3ie55kW+Iks752AYOcNHufdkiwCVOXeVTAjD1v/82AAAAAElFTkSuQmCC";
var img_def = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAYAAABvEu28AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAASxJREFUKM+1kD1Iw1AUhb+ICCVDVxGDHSpC/QHJkMnBwYKZioJbXF2DYEcHRwuSNYOL3YRKl7aDYwkSaBG0gsEMFZduBUeX5/Bo02hMBfHC41we5333vKswUe5NXRi6ztWJppBSh5U34Xe7HO2Vxr6ZSYOh6/iuBiDSju9qGLoeg8cmHx8gVvKyzy9LXV2X+vQoNXyRGoRwcU1yor/U/4AWFpd+/fCrdwy6q8Du9itBOB0ShNI76ER3s6Om7cEWkFWng7IqvD9D4zIhUbkObQ+lWCA1VRBCsSC95foPOzItW7S99FRZVaY3LVsk7qhXs0Wz6mBaNpkhNFrfIY0WZIZgWjbNqkOvFsEUgNvTHPcPfWFaNmv7jgJwXoLBHLGp8x/Rd0aDNzdyys5Zn0/GSWQNYduyJQAAAABJRU5ErkJggg==";
var img_att = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAMCAMAAABYzB2OAAAAAXNSR0IArs4c6QAAAF1QTFRF9OKZvM7Q/9IAgZeZ5Mum1K1w8vf3RFJTlHhN1cSowtTW6PDx0KVjprS23sBcho2OeouN5Mdcv9LUhVEAwbKZ5dKZu34gr8LEZT4Ama6w47YA3urrvY4AcYiK0OHjex9A+wAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAaUlEQVQI11WLWQ6AIBBDy2JcSEwMgjDMcP9jSuKCvq/2NQUaquKmqicYdwVn3nG5Yu2mXaWVIgofDinFHPghRvK3B2qvLKDQFeuaZdTcFSIToDl2M/jERJz862xMwLoBydtbzdMz7jNwAmmnBejV54RhAAAAAElFTkSuQmCC";
var img_pref = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMBAMAAACZySCyAAAAAXNSR0IArs4c6QAAACFQTFRFmZlmADNmMzOZM2aZZmbMZpnMmZmZmcyZzMyZzMzM////Mir4+AAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXklEQVQI1x2MvQ2AIBhEH5hQQ2MiFQ0uYFzAETT00pA4Do07wJTyedXl3Q8oZ8HcwFLhKSh8xbzgXa+UEaje2ywNnBuZSK+5WTHxzD/SaQ9KULwO5IGYwpgONG3/1H5oFA+SSflBcAAAAABJRU5ErkJggg==";
var img_refr = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAAXNSR0IArs4c6QAAACFQTFRFAAAAK1WAK1WqK4CqVYCqVYDUgICqgKqqgKrUqqrUqtTUrKrIrgAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAcklEQVQI1yWMQQqDMBBF/7QXyASLXWroRRqC1N5KkNLsszCeoHrK/iFZDI/PywOg6mBPQooOZP+YvgtH8ern+iLoAJ9Pwm0A7plg/ntvH9UKwtsytdjM5bcAl5VwbIrrk1Dq2uSx/6QwUnbSxUCfQbHAH5rAEJvdKXN3AAAAAElFTkSuQmCC";
var img_view = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAQAAADIBVVwAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+Hj8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2ggTFQABYEd3VAAAAPpJREFUGNN9kb8rxAEYxj/fQ65L2a4ukV+ZTUaDULdYlEX+BCN1/4BB7DYDs0kGKZllUJdFusLCDepOyY97P4bzdY7LMz3D53173+eBVFMcdT9zz1aml3+0iJuhWpQKKZpPMu1YntsTjVB1Us6AQtYJe2XpJ7g27VuEGhrloM4ytbr64ryMt8DTjXSdoRYaPO00mv7Q/oNvLlPd96cWJB6bg3HjYBWg7ViBuy/bxwNAkiVy32CUb1FIOGeIIlfB+yyjXgMVPi5bq9bTZ1ZEghqlntecF9GIVZn7E4/uijTjKQ177ILs0dUh8HCkFfgAM4yR/O4mrXC7c4WfAMWs/dRvkYgAAAAASUVORK5CYII=";
var img_del = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMAQMAAABRKa/CAAAAAXNSR0IArs4c6QAAAAZQTFRFAPBT/wAAinN9MwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2gcHFRUv1g/LlgAAACpJREFUCNdjsGBgsOFhkJNgYDdgYHzAwHiAgfkBiM0nwSDHwyDDwiDBAABSdgQyFhEKhwAAAABJRU5ErkJggg==";
var img_edit = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMAgMAAAAWidUSAAAAAXNSR0IArs4c6QAAAAxQTFRFAAAA////cdAAdXxtY+NXkgAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAOUlEQVQI12NgYLBnAIJ3BxgYmHdtYGDge/WBgcF6NZBltw4o9no3UPLVG6DkKqA483sgj/8DiABiAO0ND57GNPlIAAAAAElFTkSuQmCC";
var img_notes = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAMAAABcOc2zAAAAAXNSR0IArs4c6QAAAFpQTFRFAGAAACSStiQA2yQAbUkASUlt/yQAkkkAAG3b20kkkm0AbW1tbW2Stm0AAJL/JJLbbZKSkpKSkpK225IAtra2trbbttvbttv//9tJ29vb/9v/2//////b////0AOA4wAAAAF0Uk5TAEDm2GYAAABqSURBVAjXTYqJDoMgFARXBUuh9rDgUd3//82uiMbJJi8zeQC+l4lP3/XH2NTAmzeW0bW/u4JNZW5kWyscuHF5XcPmzwp4cN44XSHjs8ccBkE/yRkUwv6wrlPFElJKCsZwDzaIaHyMuhb4A+RyDHbkWYZoAAAAAElFTkSuQmCC";
var img_save = "data:image/gif;base64,R0lGODlhLgAUAKUoAAAAABw5OTk5ORw5qjk5VTk5cTk5jjk5qhxVqjlVjlVVVTlVqlVVcTlVxlVVjlVVqlVVxlVxjlVxxnFxjnFxxnFx445xxo5x43GOjo6O446O/6qO46qO/3HGAKqqxqqq46qq/8aq/8bGxsbG48bG/8bj4+Pj4+P//////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEKAD8ALAAAAAAuABQAAAb+wJ/w1ykaj8ikclkcDouoqHRKrVqv0aawg+16v53tN/opmzeZdMZCoYxRYe77Q9JYT5DH422CzkkZVScmDQR7Y31yY3SBU4MmCxeHX4lvKHQVjiYmJQsUk16VbxskblGPJSMDEqBYm35jGSQSp5upqhAOiKKxISAQwA0LCwMDwAm7sF8ZIM1qF23AD8iUvCfX2NnXFs4M3t4ReQsG2uXXr3Lm5RQgaQwAAiUlEcMH5OrYm5X6/P2bFBzcCZiwCcOBgwb8KTQhoshChRTSIAjgwYMIEQoOHijwsF9DIh35TWCl54GDBAkMqCzAMSTDMCBdypR58eOWDjVz6tzJs6cKTi1OmAgdusRJEAA7";
var img_underline =	"data:image/gif;base64,R0lGODlhFwAQAIABAODg4AAAACH5BAEAAAEALAAAAAAXABAAQAIVjI+py+0Po5y02ouz3rxjAIbiSIIFADs=";
var img_stat = "data:image/gif;base64,R0lGODlhMQAxAKUtADdJkklJpFtbW0lbpFtbpFtbtm1tbW1tgFtttm1tklttyG1tpG1ttm1tyG2ApICAgG2AyICAkm2A24CApICAtoCA24CA7ZKSkpKSpICS7YCS/5KS25KS7ZKS/6SkpJKk7ZKk/6Sk7aSk/6S2tra2tra2yKS2/7a2/8jIyLbI/9vb29vb7e3t7f///////////////////////////////////////////////////////////////////////////yH5BAEAAD8ALAAAAAAxADEAAAb+wJ9wSCwKWy0WCkXyeC5O0pLVMlqv2F+Seel6v14pNUsutlQosHp9QamQ5axS/Xh06/i6GjWOG1UkawICXYOGg3ZgJG9+Q2dPbJGRHox+j5KYbJRVcSqQbAYGXaGkpaYGdptlnph6F3mwsYmqWYGZt5EkfVZpuL5rKJxGLLiho6fIpxcqVi29ma6y0rBtwkfEv9lrLGbP2t9tZrYXEwUDCaCiF8mliWskwkldEwQBEh0FEWvR03iSzEfSFLDXoWCGAfrAZQp2hMSAABkKSswQYB6FBuYCBAAAIMCAAQUaUIjQz101LSxASlzZQQLIAAUUSJCQISKIDhksSMAIc8H+gUOH1F2Ap4WCApYsXRa4txKE06cgRHSooGAAAwySPCBpUYBBAwRgETSgmUFDy48RC0J9KqJtWw4YKUzaCrKBXbthxY49GEDDWrZuRZgYzAHBVTZ0Q95dvHimx79RAw8efMIEhMNgtCIhoJixZ7sKCkAN3HayiROoT0CQmznx3Y8aN3os0Jn2B6ekTadGHYLABEVbOdulvVJDBglVNS4190Gy7t0nUlRgYDIYkgWxCSLt4LRlgwEACjQvPRl69BQfClQ/sqLEgQN9kf51m6ECecrmU6Q4EQCVF25DEGNAAPLN59xzqemnYH+JEEUECQ8AkJZaBh5o3nkKngCAfyf+EaHCBRJSuBZpgiGImoIohrBhIrsMgQIA90BGommn7YYiih8AgAhDf0iYQYVumRgdhik2oKMolZgBQAcW/AjYgTXaeKN+H9i1ooNGtACAWTlxN6OQU+5XgVgIbLiMNUS0EB9ONI13X5QJ3njCmHohEMADuqDpyFISGSeBBc0JSeQJG3zF2EAe8KHnERA0wFJNM1WQAQclpmbCBxtU8JVejHEmxqJarDDAhAbVVN9Mny3WKGN2evDpFUhsgABSptZaXwW4ziQBBKt2OgEJr8LKwkVmGWScrbdWoOuuvB7qALButGjGGRjwWaqtuCqrLK/c3oWAb9AqCuoRLazgQUxtFuCEbLa5ztQtRgRgAKwY0jbDAgsl0LMUsskqy+xXBfg2Qrgq1IvFvYBggF0BYkWaa6MIBBzAAhgMHO694wqLBhMYTLBARhx5lMACE3hgMcEGN/LDxkzM6/LLUixRcMoqD8HyEjjnLPO9AGYRBAA7";
var img_bigIcon = [ // 0-RP, 1-barrack, 2-stable, 3-workshop, 4-market, 5-market_in, 6-ally, 7-ally_attack
	"data:image/gif;base64,R0lGODlhIAAgAKU3ADMzMzNEREREREREVURVRERVVVVVVVVmVVVmZmZmVVVmiGZmZmZmd1V3iGZ3ZlV3mWZ3d2Z3iHd3ZmZ3mXd3d2aIiGaImXeId2aIqmaIu4iId3eIqoiIiGaZu2aZzIiZiHeZu3eZzJmZiIiZu5mZmXeqzIiqu5mqmYiqzIiq3aqqmaqqqqq7qpm73bu7qru7u7vMu8zMu8zMzMzdzN3dzN3d3e7u3f///////////////////////////////////yH5BAEKAD8ALAAAAAAgACAAAAb+wJ9wSCwaj8ikcnk0HBKLRcJApUITU+bPoCGtXi+ZjFarqVRl8cu1ElEOBqTBjC7ba6fT3X6uxZt4enuDd3l+SAl2JCQfHBRRTgsQFBxeK2kJSAsyZVQIDBEYIKMZGBYTEREGnDKZRAAAP5s1JBQyLyccBgglvSUhIR4dm7euQgAUFAIBJzKbMDAzKwggKSi+wBnEK38/AAYcF7UBCyS3MtMjKevXvSEYC2EcrwxUCxwcm2EsCCYtLezavaMQhsIrBAsGCDCQYIUMGDIMjPgH0JrACBxcRCwCoAAEBAIcnMsHAcU6dtggcGDxotsrKi9ixHixoMaKBRVQ6MQWAgHiCRckXBIRwOGcAxUwypBAsIGnthMvDMo5t4IgGFYXFmQA5mECBRIt5ZgLc6Doras1aELo4AGBBhUnhA7RF+MmhwN6zsYoM61B2RUXkiSAEUOGrhUkoryoMTNMGREHNHBTsmkGFYIkDiCwNQMMxBoyHsktIiGsgS+6FBggMUMvDRs0DyipImQTC10PFCC4dOuzTdlJuoGTcdvAgwcG4tGAEZNTjQVatpgrboDSPTWfXwBncvrWohWIqZCgIaPw8+hbwlydvGUBCzEyMqPvHl9olQNw0EvXpV+LAQL9BSjggEMEAQA7",
	"data:image/gif;base64,R0lGODlhIgAgAKU1AAAAAAAkACQkACQkJEkkAG0kAABJAJIkALYkAElJAElJJElJSW1JAG1JJABtJG1JSZJJAJJJJCRtJJJJSbZJJG1tAEltbW1tSQCSJJJtAG1tbZJtJG1tkrZtAJJtbbZtJG2SkraSAJKSbZKSkpKSttuSALaSkpK2ttu2ALa2kra2tv+2ANu2tv/bALbb29vbttvb2//btv/b29v/////2////////////////////////////////////////////yH5BAEAAD8ALAAAAAAiACAAAAb+wJ9wSPzVGq1kKFFpMCqhToFCRSAKqqJ2ONpUMo2LhrMYLDadCJWCoGS3W4/GVavXZjDSArpGHN5wRCMjdnczhzMkAhkZVQcwgUQqCycqKiQkKjCIJxwDGWpXkFs1KiMwkzN2My4nIySbJCMWCaETNVuoHg8CAhoaF2IjKqouIycnFiQDUwgXuFowNSMKAgoKCw8PCb0Dc6UaCyALAhQHI4HUKgMsLDA0MjApJgsAAxysCxYWAgUIgEVKwYChYQSLGjRgnKrB4sKChyqSaRBAgMCodB4OypDB0ANCFgsmDXC1QAMqaHAUwttIAx6LjSY03Bkw0gLAQCpYjLggLaf+jJVyOKwDoA9dpB8wSmrwYKIhu5UPRogTEJKFzEiTTEirEe/Fi5UgN3HQYJUsQJRIF0jbyLYl2zEaVGh4McLDAhlGhaAly5Wt358vKLmSCUNG05tE7v7dyMIDWxYipLZrWcPDRS1kFzdMsfHFxhQjDL8cFClp03YpdnFOaBneypKIMZt58DDjT4Xv/LIYcHTIBRPzXm5U2PqvXbRDkC94ycKSiREaTPz8y4IqnLxClqOKB+NlX78xPAC4AOdBkbg05NSVvlgGZOvRGBQxxTV4e/cN7dUpMgJCkaTu/bRSWy+I0I54ADxwQVSa1DCAAJiN0NSAAurUTkMMfPABAwJ0GOCABPVoEFA9Ub2DkHseKODBLgtkEAIEAgDgAAY0YmCAiMmRAwAAAigIzAUulhBFAi4+IaMDM9LogAFETCQABAmggEIIIaCwwpVXogBBCAyEUEEASNaIAZJDqFCBAERmkMSaSVzZQgUaVtCCAEsmqaQDQQAAOw==",
	"data:image/gif;base64,R0lGODlhHwAgAKUlACQAACQkACQkJEkkAG0kAElJJElJSW1JAG1JJG1JSZJJAJJJJG1tJG1tSW1tbZJtJJJtSbZtAJJtbbZtJNttANttJJKSJJKSSbaSJJKSkraSSduSJLaSkra2Sba2ktu2Sba2tv+2Sdu2tv/bbdvb2////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAD8ALAAAAAAfACAAAAb+wJ9wSCwaj8jkEERSOo+kxyExbD6VoIgiICQZrsYSB/TLRga/DAINFpaEI4vEcTgMHIoIt51+kzoPFg8CAAoUW3w/JR0fISEfGAgCBREHAXt8IBcPDAgFBwUDegNfiSUeEBiRBHlnCVZ8JbIZB3kUEWcOiUQOIBMRGiIWWwVkuyQZBhUTJCAZCgAPxonJCBUaJAJ0ABYZuz8JBxsRGCUkJJcM3okODxvjEUwZAAcI608lDgUCCBO3uLgG1MFwT0mJBBM2TBAQIMI/CpYIIHhQ8AiIBAje/buEC6KAWqB0JckmroKWA1roVRIwQJSCBQ2UoEuIawIGlAQC5GyJMgLCJ5n9AOJqJUBBARIJCOB68OENEhBBcXHUItBbuKUhphkhkdEhtJ5GAzShg6sABgNOwyTYYFIoLgdo0/QMwOCByDALKLQVqoBUTBAHfkVgEGLQ3SElEEQQ3DECgQMZBGTgiuHWgg8fHhSo+IPOA6EHHhvopQ0BhgoQMTwaZEAAERINlN2qg8CBF2QABpzWYsFRBwYCXBfhWm9CBqfJyhSYIPhBh94dgicBIWG4NhLvTCqoBwlDgUQgBBjIDlCBpw4GggAAOw==",
	"data:image/gif;base64,R0lGODlhIAAgAKUvAAAAAEkAACQkACQkJEkkAEkkJG0kALYkAElJAElJJElJSW1JAElJbW1JJG1JSZJJALZJAG1tAEltbW1tSZJtAG1tbZJtJG1tkpJtSbZtANttAJKSAG2SkpKSSbaSAJKSbbaSJJKSkpKSttuSAJK2ttu2ALa2tra229u2ttvbAP/bALbb29vb29vb/9v//////////////////////////////////////////////////////////////////////yH5BAEAAD8ALAAAAAAgACAAAAb+wJ9wSCwOFQqWkFWRvIzQqLASklqvrOp1W3y9Ktzw0BF6irevhvYcfbI2FSW7u/xNVGXzvP4DI1QmQmtzCk8hAx8RDT8fG4F7VD8mAiwCKS8OHoNsYCGOJioDChRyeyYsCiksLykLChGlcywdKRE/LCoIJpp7Py8TESoRKA0jLKAIvSwRJSkCDxkafbm9JggaGwQGGhoGEQ+bYi8FECMB2xoEIwl6bAoHBhkBB/DcAI9sLwb73fQBGgcAADAVIIAAgAAOzFM4kM2hghD3nTMQoOEZCSYACIDIsSKAWFwUrHAhQuDGggIEDgBzRkGFFidOkAghgUEFEReQhLsyIIFjgwYkgsY8wYGBKJBSWHxAYGHBgAUMgko1qkBAmBdPLSAgUEBACKkzB4gdwKWABa0fD5mQSUIEBwUMKHFhikABPgwhKjCQoEAs0igVQCAQ0M7BBEkhQphoZ4WABQL4hrBIsCcIADs=",
	"data:image/gif;base64,R0lGODlhIAAgAMIEAAAAADMzM0xMTOXjI////////////////yH5BAEKAAQALAAAAgAgAB4AAAN9SLrc/jDKSau9VghsAdDaInwcM3ofSJbKtqAeWG6uCYP1RDuje+cQFzDm8OhEDWID+KgNV6YjYdB69ZYEZnTAzVqhVe0LZhSBnRLy8jz1TgBN6IZLFevkdK5dclWQyxx9fjAsWWB+hS2HiWZ7GAGQAQCRAYx/aoyZmpucHAkAOw==",
	"data:image/gif;base64,R0lGODlhIAAgAIQcAKocAMYcAOMcAKo5HKo5OcY5HFVVVeM5HP85AI5VOXFxcf9VHKpxVcZxVY6Ocf9xVY6Ojv+Ocaqqjqqqqsaqqv+qjsbGxuPGxv/GxuPj4//j4///4////////////////yH5BAEAAB8ALAAAAAAgACAAAAW84CeOZGmeaKqubOu+8BdFMas9T71Gy1PpqceiBzxVEMgFplhaIJE5pmghqFqjI4jW8BIErFUE6QIoA1wZ5DeM4IzIZpclkfAGEAlG5m0+tzIQDgGDAlp7InAAAWgWEoNfExaHHxRmiy8UAWWXJJmbMJWfIxmNjwKRkyqJnB+AgoSGLYl+InN1g3h6sn0kaQhrAkhuLLMlXmDBL1oQXCRUyFhMTk/RTEdJS1IjQkTaIzw+3iM31d4z4ujp3iEAOw==",
	"data:image/gif;base64,R0lGODlhIAAgAIQeAFUrK4ArAIArK6orK1VVVYBVK4BVVapVK6pVVdRVK6qAVaqAgKqAqtSAVdSAgP+AVaqqqtSqVdSqgNSqqv+qVdSq1P+qgP+qqtTUqtTU1P/Uqv/U1P/U/9T//////////yH5BAEKAB8ALAAAAAAgACAAAAX+4CeOZGmeaKqubOu+cCzPdK0KiKAi0ysoDosDYQIYGBlPZsFcmA4IiURD3WgujYMIkulWPOCksmIQFRqWtNpyoWosjYbYM+GEwWBEgyJpPB4UcXtrFhQUE3hdSnMTaW5vhYZxFJGSHh1giBMbeBIWV4SGlA97ooaIYRwQHJgbnpWmhlSBsRKJXJd0sbuUVHAJlHxiHBMQnbymgxpWk5QYuV0dHa7Ihml+jhpxabZ4uROlyJ9wg4WAgUkcHBsbGUHVpGmShg8H9gcGSx9GBGeAsIUKNQt0QAcLPX6CUTi3cFKDAC4EHCAXLs65OAZfDJjYIEFFQRljKNBD6lwELTYQPggQVKBAypcwY8qcSRNmCAA7",
	"data:image/gif;base64,R0lGODlhIAAgAOMOACQkJElJSW1tbZJtbZKSbZKSkraSkra2kra2ttu2ttvbttvb2//b2///2////////yH5BAEKAA8ALAAAAAAgACAAAAT+8MlJaVs16y2X+xgnZp8jCM6oPp6DAALjhGuGeEggLEuBzLXJDXf69Xye4K3h0v0QBxeiUGDQRIhbQeCTgo5dhEqxmGZvQ1eZOlyVFwf2OaH4+ZAKFXpK7R3QPFRIYiMKZHFZCj5ndYJlbmR3WX9TgVQHjyNDfIF7DHwECAkHKgsKDqcJQ45HBjyEWDxglj5WpgYFdWOnUAUeirWfBQSLBaWvUg1Lq7gBPnoeszO4CFbECzvGIzwOcX1TuAsMAlkLA1Oa0X0LDQfE1dhl5LAcZDMuvmXUDHdbPekf5OAr4GpBAGcntImwdyufoGpTnCncFlCQMl8XuJBS0sJbCwcpW+gpAVHtA4J5QSpgKuGgAZuUGn6YFKALZoaVBRJcsVlBpkieFfIEiQAAOw=="
	];

/*********************** common library ****************************/

var flOpera = typeof window.opera != 'undefined' ? true: false;
var flChrome = /Chrome/i.test(navigator.appVersion) ? true: false;
var flFirefox = /Firefox/i.test(navigator.appVersion) ? true: false;

var noGM = /Chrome\/[0-6]/;
if (typeof GM_getValue == 'undefined' || noGM.test(navigator.appVersion) ) {
	function GM_getValue( key, defaultValue ) {
		var cookie = document.cookie.split("; ");
		for( var i = 0; i < cookie.length; i++ ) {
			var oneCookie = cookie[i].split("=");
			if( oneCookie[0] == escape( key ) ) {
				var value = unescape( oneCookie[1] );
				return value;
			}
		}
		return defaultValue;
	}
}
if (typeof GM_setValue == 'undefined' || noGM.test(navigator.appVersion) ) {
	function GM_setValue( key, value ) {
		lifeTime = 31536000;
		document.cookie = escape( key ) + "=" + escape( value ) +
		";expires=" + ( new Date( ( new Date() ).getTime() + ( 1000 * lifeTime ) ) ).toGMTString() + ";path=/";
	}
}
if (typeof GM_deleteValue == 'undefined' || noGM.test(navigator.appVersion) ) {
	function GM_deleteValue( key ) {
		document.cookie = escape( key ) + "= ;expires=" + ( new Date( ( new Date() ).getTime() - 1000 ) ).toGMTString() + ";path=/";
	}
}
if (typeof GM_addStyle == 'undefined' ) {
  function GM_addStyle(css) {
    var head = document.getElementsByTagName('head')[0];
    if (head) {
      var style = document.createElement("style");
      style.type = "text/css";
      style.appendChild($t(css));
      head.appendChild(style);
    }
  }
}
var useDOMs = typeof window.localStorage == 'undefined' ? false: true;
function RB_getValue ( key, defaultValue ) {
	if( useDOMs ) {
		var value = window.localStorage.getItem(key);
		if( value == null ) value = defaultValue;
		return value;
	} else return GM_getValue( key, defaultValue );
}
function RB_setValue( key, value ) {
	if( useDOMs )
		window.localStorage.setItem( key, value );
	else
		GM_setValue( key, value );
}
function RB_deleteValue( key ) {
	if( useDOMs )
		window.localStorage.removeItem( key );
	else
		GM_deleteValue( key );
}
function $xf(xpath, xpt, startnode, aDoc) {
	var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
	var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
	var XPIterate = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;
	var XPResult = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
	if (!aDoc) aDoc = document;
	if (!startnode) startnode = document;
	var xpres = XPFirst;
	switch (xpt) {
		case 'i': xpres = XPIterator; break;
		case 'l': xpres = XPList; break;
		case 'r': xpres = XPResult; break;
	};
	var ret = aDoc.evaluate(xpath, startnode, null, xpres, null);
	return (xpres == XPFirst ? ret.singleNodeValue : ret);
};
function ajaxRequest(url, aMethod, param, onSuccess, onFailure) {
	var aR = new XMLHttpRequest();
	aR.onreadystatechange = function() {
//		if (aR.readyState == 4 && aR.status == 200 )
		if( aR.readyState == 4 && (aR.status == 200 || aR.status == 304))
			onSuccess(aR);
		else if (aR.readyState == 4 && aR.status != 200) onFailure(aR);
	};
	aR.open(aMethod, url, true);
	if (aMethod == 'POST') aR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
	aR.send(param);
};
function $g(aID) {return (aID != '' ? document.getElementById(aID) : null);};
function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == 'TITLE') aElem.setAttribute('alt', att[xi][1]);};};};//Acr111-addAttributes
function $c(iHTML, att) {var aCell = document.createElement("TD"); aCell.innerHTML = iHTML; $at(aCell, att); return aCell;};
function $a(iHTML, att) {var aLink = document.createElement("A"); aLink.innerHTML = iHTML; $at(aLink, att); return aLink;};
function $e(nElem, att) {var Elem = document.createElement(nElem); $at(Elem, att); return Elem;};
function $ee(nElem, oElem, att) {var Elem = document.createElement(nElem); if (oElem !== undefined) if( typeof(oElem) == 'object' ) Elem.appendChild(oElem); else Elem.innerHTML = oElem; $at(Elem, att); return Elem;};
function $t(iHTML) {return document.createTextNode(iHTML);};
function toNumber(aValue) {return parseInt(aValue.replace(/\W/g, "").replace(/\s/g, ""));};
function ajaxNDIV(aR) {var ad = $ee('div',aR.responseText,[['style','display:none;']]); return ad;};
function dummy() {return;};
jsVoid = 'javaScript:void(0)';
jsNone = 'return false;';

function formatTime(secc, aFormat){
	//aFormat: 0 = h:mm:ss (h = 0-&gt;... can be more than 24); 1 = days, h:mm:ss; 2 = h:mm:ss (h = 0-&gt;23:59:59 = only time); 3 = h:mm
	if( isNaN(secc) || secc === Infinity ) return '--:--';
	var ht = secc < 0 ? "-" : "";
	var sec = Math.abs(secc);
	var h = Math.floor(sec/3600);
	var m = Math.floor(sec/60) % 60;
	var s = parseInt(sec % 60);
	switch (aFormat) {
		case 1: var d = Math.floor(h/24); h = h - d * 24; if( d > 0 ) ht += d + " "; break;
		case 2: h = h % 24; break;
	}
	ht += h + ":" + (m > 9 ? m: '0' + m);
	if( aFormat != 3 ) ht += ":" + (s > 9 ? s : '0' + s);
	h = null; m = null; s = null; d = null;
	return ht;
}

function toSeconds(hTime) {
	p = hTime.split(":");
	return (p[0] >= 0 ? 1:-1) * ( (Math.abs(p[0]) * 3600) + (p[1] * 60) + (p[2] * 1));
}

function httpGet(url) {
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", url, false);
	xhttp.send(null);
	return xhttp.responseText;
}

/********************* travian library *****************************/

function id2xy(vid) {
	var arrXY = new Array;
	var ivid = parseInt(vid);
	arrXY[0] = ((ivid-1) % 801) - 400;
	arrXY[1] = 400 - Math.floor((ivid-1) / 801);
	return arrXY;
}

function xy2id(x, y) {
	return (1 + (parseInt(x) + 400) + (801 * Math.abs(parseInt(y) - 400)));
}

function calcDistance ( id1, id2 ) {
	var myXY = id2xy( id1 );
	var dXY = id2xy( id2 );
	dX = Math.min(Math.abs(dXY[0] - myXY[0]), Math.abs(801 - Math.abs(dXY[0] - myXY[0])));
	dY = Math.min(Math.abs(dXY[1] - myXY[1]), Math.abs(801 - Math.abs(dXY[1] - myXY[1])));
	return Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
}

function getTTime(dist, speed, arena, artefact) {
	speed *= artefact + 1;
	if( arena > 0 && dist > 30 ) {
		return Math.round((dist-30)/(speed*(1+arena*0.1))*3600+30/speed*3600);
	} else {
		return Math.round(dist/speed*3600);
	}
}

function getUserID() {
	var uLink = $xf("//div[@id='" + pageElem[0] + "']//a[contains(@href, 'spieler.php')]");
	return (uLink) ? uLink.href.split("uid=")[1] : null;
};

function getResources() {
	for( var i = 0; i < 4; i++ ) {
		var wholeRes = $g("l" + (4-i));
		if( ! wholeRes ) return false;
		income[i] = parseInt(wholeRes.getAttribute("title"));
		incomepersecond[i] = income[i] / 3600;
		wholeRes = wholeRes.innerHTML.split("/");
		resNow[i] = parseInt(wholeRes[0]);
		if( resNow[i] < 0 ) resNow[i] = 0;
		fullRes[i] = parseInt(wholeRes[1]);
	}
	return true;
}

function getServerTime() {
	return toSeconds($g('tp1').innerHTML.match(/\d+:\d{2}:\d{2}/)[0]);
}

function absTime( time ) {
	var tTime = Math.abs(time) + getServerTime();
	if( Math.abs(time) < 86400 ) if( tTime > 86400 ) tTime -= 86400;
	return tTime;
}

function $eT( tO, time, ft, att ) { // tO-type of Object, time - relative time, ft - time format, att - attributes
	var tTime = absTime(time);
	var att2 = [['title',formatTime(tTime, 1)]];
	if( att !== undefined ) att2 = att.concat( att2 );
	return $ee(tO, formatTime(time,ft), att2);
}

function showRunTime() {
	var ltime = $g('ltimeWrap');
	RunTime[1] = new Date().getTime();
	var timestring = $e("span");
	var fts = " RB:<b>" + (RunTime[1]-RunTime[0]);
//	fts += "</b>/<b>" + (RunTime[3]-RunTime[2]);
	timestring.innerHTML = fts + "</b>ms"
	ltime.insertBefore(timestring, ltime.getElementsByTagName('br')[0]);
}

/************* CSS & ID *****************/

var allIDs = [
	'mbuyf', // 0-mbuyf
	'resoursebar', // 1-resourcebar
	'progressbar', // 2-progressbar (class)
	'rb_tooltip', // 3-rb_tooltip
	'flDIV', // 4-flDIV (class)
	'newDd', // 5-newDd (class)
	'RBSetup', // 6-RBSetup
	'gnTable', // 7-gnTable (class)
	'rbOverview', // 8-rbOverview
	'rbLinks', // 9-rbLinks
	'pbOview', // 10-pbOview(123) (class)
	'rb_sum', // 11-rb_sum
	'rb_sum2', // 12-rb_sum2
	'redLine', // 13-redLine (class)
	'flDIV', // 14-flDIV(num)
	'rb_sendTimeout', // 15-rb_sendTimeout
	'progressbar-completed', // 16-progressbar-completed
	'rbOtime', // 17-rbOtime
	'sf', // 18-sf
	];

//RunTime[2] = new Date().getTime();
function randomizeIDs () {
	function replacer ( n ) {
		return rtStr[parseInt(n)];
	}
			//    0   1   2   3   4   5   6   7   8   9
	var rtStr = ['d','h','w','l','c','m','t','a','b','i'];
	var UUIDs = '';
	for( var i = 0; i < allIDs.length; i++ ) {
		do {
			var rID_num = (Math.round(Math.random()*Math.pow(10,Math.random()*5+3) + 1e3)).toString();
			var rID = rID_num.replace(/\d/g, replacer);
			var Rej = new RegExp(rID);
		} while( Rej.test(UUIDs) )
		UUIDs += rID + ',';
		allIDs[i] = rID;
	}
}
randomizeIDs();
//RunTime[3] = new Date().getTime();

acss =	"table#"+allIDs[0]+" {width:100%; border-collapse:collapse; font-size:8pt; text-align:center; background-color:white; padding:2px; margin:1px;}" +
	"table#"+allIDs[0]+" td {background-color:transparent; border:1px solid silver; padding:2px;}" +
	"table#"+allIDs[0]+" td."+allIDs[18]+" {background-color:#FFE4B5;}" +
	"table#"+allIDs[1]+" {border-collapse:collapse; text-align:left; background-color:white; padding:0px; margin:0px;}" +
	"table#"+allIDs[1]+" tr {height:18px;border-collapse:collapse; text-align:left;}" +
	"table#"+allIDs[1]+" td {font-size:8pt;overflow:visible;white-space:nowrap;background-color:transparent; border:1px solid silver; padding:0px;}" +
	"table#"+allIDs[1]+" td."+allIDs[11]+" {font-size:8pt;background-color:#FFFFAF; text-align:right;}" +
	"table#"+allIDs[1]+" td."+allIDs[12]+" {background-color:#FFFFAF;height:18px; text-align:center; font-size:11px;}" +
	"table#"+allIDs[1]+" th {border:1px solid silver;height:18px;text-align:left;padding-left:3px;direction:ltr;}" +
	"table#"+allIDs[1]+" th a {color:black; font-size:11px;}" +
	"."+allIDs[2]+" {width: 200px; }" +
	"div#"+allIDs[3]+" {position:absolute;z-index:1100;border:1px solid silver;text-align:center;background-color:#FFFFE0;}" +
	"."+allIDs[4]+" {position:absolute;z-index:501;border:1px solid silver;text-align:center;background-color:yellow;}" +
	"."+allIDs[5]+" {width:100%;text-align:center;background-color: #D0D0FF;cursor:move;font-size:6pt;}"+
	"table#"+allIDs[6]+" {width:auto;border-collapse:collapse; text-align:left; background-color:#F0F0F0; margin:1px;}" +
	"table#"+allIDs[6]+" td {background-color:transparent; border:1px solid silver; padding:2px;}" +
	"table#"+allIDs[6]+" td input {width:100px;text-align:right} table#"+allIDs[6]+" td.RBVals {text-align:center;}" +
	"."+allIDs[7]+" {width:auto;border-collapse:collapse; text-align:left; background-color:transparent; margin:1px;}" +
	"."+allIDs[7]+" td {background-color:transparent; border:1px solid silver; padding:0px 2px;text-align:right;}" +
	"."+allIDs[7]+" td img {margin:0px 3px;}" +
	"table#"+allIDs[8]+" {width:auto;border-collapse:collapse; text-align:left; background-color:#F8F8F8; margin:1px;}" +
	"table#"+allIDs[8]+" tr {border-collapse:collapse; text-align:left;} table#"+allIDs[8]+" tbody tr:hover {background-color:#E5E5F0;}" +
	"table#"+allIDs[8]+" td {overflow:visible;white-space:nowrap;background-color:transparent;padding:0px 5px 1px;}" +
	"table#"+allIDs[8]+" td a {color:black;} table#"+allIDs[8]+" thead td {text-align:center;}" +
	"table#"+allIDs[8]+" td."+allIDs[17]+" {text-align:right;font-size:8pt;}" +
	"table#"+allIDs[8]+" td."+allIDs[10]+" {font-size:11px;width:54px;border:1px solid silver;background-color:transparent;padding:0px;}" +
	"table#"+allIDs[9]+" {width:auto;border-collapse:collapse; background-color:white; margin:1px;margin:0px;}" +
	"table#"+allIDs[9]+" tr {border-collapse:collapse;} table#"+allIDs[9]+" tbody tr:hover {background-color:#E5E5F0;}" +
	"table#"+allIDs[9]+" td {white-space:nowrap;text-align:left;background-color:transparent;padding:0px 5px 1px;}" +
	"table#"+allIDs[9]+" thead td {font-weight:bold;} table#"+allIDs[9]+" a {font-size:12px;}" +
	"."+allIDs[10]+"1 {width:100%;background-color:"+bgcolor[0]+";float:left;margin:0px; display:inline;padding:0px 2px;}" +
	"."+allIDs[10]+"2 {width:100%;background-color:"+bgcolor[1]+";float:left;margin:0px; display:inline;padding:0px 2px;}" +
	"."+allIDs[10]+"3 {width:100%;background-color:"+bgcolor[2]+";float:left;margin:0px; display:inline;padding:0px 2px;}" +
	/* "table#vlist {border-collapse:collapse;}" + */"table#vlist tbody td {background-color:transparent;} table#vlist tr:hover {background-color:#E5E5F0;}" +
	"."+allIDs[13]+" {width:100%; border-collapse:collapse; border:1px solid silver; font-size:8pt; text-align:center; background-color:#FFC0C0; padding:2px; margin:1px;}" ;

GM_addStyle(acss);

/*************tooltips elements*****************/
function makeTooltip( ttObj ) {
	var ttD = $g(allIDs[3]);
	if( ! ttD ) {
		ttD = $e('DIV', [['id', allIDs[3]]]);
		document.body.appendChild(ttD);
		document.addEventListener("mousemove", updateTooltip, false);
	}
	ttD.appendChild( ttObj );
	return ttD;
}
function removeTooltip() {
	var ttD = $g(allIDs[3]);
	if( ttD ) {
		document.removeEventListener("mousemove", updateTooltip, false);
		document.body.removeChild(ttD);
		timerP.length = lastTimerP[0];
		timerB.length = lastTimerB;
	}
}
function updateTooltip(e){
	var ttD = $g(allIDs[3]);
	if( ! ttD ) return;
	var wW = window.innerWidth;
	var wH = window.innerHeight;
	var x = (e.pageX + 8);
	var y = (e.pageY + 8);
	var dW = ttD.clientWidth;
	var dH = ttD.clientHeight;
	if (x + dW > wW) x = x - dW - 16;
	ttD.style.left = x + "px";
	if (y + dH > wH) y = y - dH - 16;
	ttD.style.top = y + "px";
};
/*************drag elements*****************/
var dragMaster = (function() {
	var dragObject;
	var mouseOffset;
	var mouseDownAt;
	function getMouseOffset(target, e) {
		var docPos	= getPosition(target);
		return {x:e.pageX - docPos.x, y:e.pageY - docPos.y};
	}
	function mouseUp(){
		if (mouseDownAt) {
			mouseDownAt = null;
		} else {
			savePosition(dragObject);
			dragObject = null;
		}
		document.removeEventListener('mousemove', mouseMove, true);
		document.removeEventListener('mouseup', mouseUp, true);
//		document.ondragstart = null;
//		document.body.onselectstart = null;
	}
	function mouseMove(e){
		if (mouseDownAt) if (Math.abs(mouseDownAt.x-e.pageX)<10 && Math.abs(mouseDownAt.y-e.pageY)<10) return;
		with(dragObject.style) {
			position = 'absolute';
			top = e.pageY - mouseOffset.y + 'px';
			left = e.pageX - mouseOffset.x + 'px';
		}
		mouseDownAt = null;
		return false;
	}
	function mouseDown(e) {
		if (e.which!=1) return;
		dragObject  = this.parentNode;
		mouseOffset = getMouseOffset(this, e);
		mouseDownAt = { x: e.pageX, y: e.pageY, dragObject: this };
		document.addEventListener('mousemove', mouseMove, true);
		document.addEventListener('mouseup', mouseUp, true);
//		document.ondragstart = function() { return false };
//		document.body.onselectstart = function() { return false };
		return false;
	}
	return {
		makeDraggable: function(element){
			element.addEventListener('mousedown', mouseDown, true);
		}
	}
}())

function getPosition(e){
	var left = 0; var top = 0;
	while (e.offsetParent){
		left += e.offsetLeft; top += e.offsetTop; e = e.offsetParent;
	}
	left += e.offsetLeft; top += e.offsetTop;
	return {x:left, y:top};
}
/**********end**drag elements*****************/

function savePosition(objName) {
	objNum = parseInt(objName.id.match(/\d+$/)[0]);
	if( objNum > 10 ) return;
	RB.XY[objNum*2] = objName.style.left.match(/^\d+/)[0];
	RB.XY[objNum*2+1] = objName.style.top.match(/^\d+/)[0];
	saveCookie('xy', 'XY');
}

var divSN = 100;
function makeFloat(flObj, ix, iy, sid) {
	flId = sid !== undefined ? sid : ++divSN;
	bd = $e('div',[['id',allIDs[14] + flId],['class',allIDs[4]],['style','left:'+ ix +'px;top:'+ iy +'px;']]);
	bdr = $ee('div','&nbsp;',[['class',allIDs[5]],['onmousedown',jsNone]]);
	bd.appendChild(bdr);
	bd.appendChild(flObj);
	document.body.appendChild(bd);
	dragMaster.makeDraggable(bdr);
	return allIDs[14] + flId;
}

function makeFloatD(flObj, mNum) {
	var ix = RB.XY[mNum*2] < 1 ? 1: RB.XY[mNum*2];
	var iy = RB.XY[mNum*2+1] < 1 ? 1: RB.XY[mNum*2+1];
	return makeFloat(flObj, ix, iy, mNum);
}

function closeWindowN ( num ) {
	if( windowID[num] == undefined ) return false;
	var wo = $g(windowID[num]);
	if( ! wo ) return false;
	wo.parentNode.removeChild(wo);
	windowID[num] = undefined;
	return true;
}

/************************** build pages ****************************/

// begin Travian - add needed resources automatically under build/upgrade link
function needed_show( base ) {
	var neededRes = base.match(/>(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/);

	wfl = false;
	var wantsResMem = [0,0,0,0];
	var beforeThis = $e('DIV');
	for (var e = 0; e < 4; e++) {
		var wantsRes = resNow[e] - parseInt(neededRes[e+1]);
		beforeThis.appendChild($e('IMG',[['src','img/x.gif'],['class','r' + (e+1)]]));
		if (wantsRes >= 0) {
			beforeThis.appendChild($ee('SPAN','+' + wantsRes + ' ',[['style','color:green;']]));
		} else {
			var plusTimer = $ee('SPAN', wantsRes + ' (',[['style','color:red;']]);
			if( income[e] > 0 ) {
				var j=timerB.length;
				timerB[j] = new Object();
				timerB[j].time = Math.abs(Math.round(wantsRes/incomepersecond[e]));
				timerB[j].obj = $eT('SPAN', timerB[j].time, 0);
				plusTimer.appendChild(timerB[j].obj);
				plusTimer.appendChild($t(') '));
			} else
				plusTimer.innerHTML += "--:--) ";
			beforeThis.appendChild(plusTimer);
			wantsResMem[e] = Math.abs(wantsRes);
			wfl = true;
		}
	}
	var memP = $a('(M+)',[['href',jsVoid]]);
	memP.addEventListener('click', function(x) { return function() { saveWantsMem(x); }}(wantsResMem), 0);
	beforeThis.appendChild(memP);

	return beforeThis;
	function saveWantsMem ( wantsResM ) {
		RB.wantsMem = wantsResM.slice();
		saveCookie('Mem', 'wantsMem');
		alert( "Saved: "+ RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
	}
}

function neededResAdd() {
	var basee = $g("contract");
	if ( basee ) {
		var baseX = $xf('//p[@id="contract"]','l');
		for( var i = 0; i < baseX.snapshotLength; i++ ) {
			var base = baseX.snapshotItem(i).innerHTML;
			if ( ! /form/i.test(base) ) {
				baseX.snapshotItem(i).appendChild(needed_show( base ));
			}
		}
	} else  {
		var base = $g("build");
		if ( ! base ) return;
    	if ( /new_build/i.test(base.innerHTML) ) {
			var basee = base.getElementsByClassName("res");
			for ( var i=0; i<basee.length; i++ )
				basee[i].appendChild(needed_show( basee[i].innerHTML ));
		}
	}
	var research = $xf('//td[@class="desc"]/div[@class="details"]','l');
	for( var i = 0; i < research.snapshotLength; i++ ) {
		var base = research.snapshotItem(i);
		var newD = needed_show( base.innerHTML );
		if( wfl ) base.parentNode.appendChild( newD );
	}
	lastTimerB = timerB.length;
}
// end Travian - add needed resources automatically under build/upgrade link

/********************* messages & reports ***************************/

function deleteButtonAdd() {
	var mtable = $xf("//table[@id='overview']/tfoot/tr/th", "r");
	if ( mtable.snapshotLength > 0 ) {
		if( ! /checkbox/.test(mtable.snapshotItem(0).innerHTML) )
			mtable.snapshotItem(0).innerHTML = '<input class="check" id="s10" name="s10" onclick="Allmsg(this.form);" type="checkbox">';
		if( ! /btn_archiv/.test(mtable.snapshotItem(1).innerHTML) ) {
			mtable.snapshotItem(1).innerHTML += '&nbsp;&nbsp;<input id="btn_archiv" class="dynamic_img" type="image" src="img/x.gif" alt="archive" name="archive" value="archive"/></input>';
			var tm = $g('textmenu');
			if( /nachrichten.php/.test(crtPath) )
				tm.innerHTML += ' | <a href="nachrichten.php?t=3">archive</a>';
			else
				tm.innerHTML += ' | <a href="berichte.php?t=5">archive</a>';
		}
	}
	var mtable = document.getElementsByName('msg')[0];
	if( mtable ) {
		mtable.action += '?' + crtPath.split("?")[1];
	}
}

function convertCoordsInMessagesToLinks() {
	var messID = "//div[@*='message']";
	var cM = $xf(messID);
	if( cM ) {
		var arXY = [];
		var iHTML = cM.innerHTML;
		var iHTML2 = iHTML;
		var j = 0;
		var villageLink = [];
		var Rej = /<a.+?\/a>/gi; // new Travian IGM extended tags
		while ((arXY = Rej.exec(iHTML)) != null) {
			var mLink = arXY[0];
			villageLink[j] = "<span>" + mLink + "</span>";
			iHTML2 = iHTML2.replace(mLink, "<#!" + (j++) + "/>");
		}
		var Rej = /(https?:\/\/[\S]+)(<.*>|$| )+?/gi; // URLs
		while ((arXY = Rej.exec(iHTML)) != null) {
			var mLink = arXY[1].match(/(.*?)(?:\.|,|<|\))?$/)[1];
			villageLink[j] = "<a href='" + mLink + "'>" + mLink + "</a>";
			iHTML2 = iHTML2.replace(mLink, "<#!" + (j++) + "/>");
		}
		var Rej = /[\/:]?(-?\d+)(?:<.+?>)?\s*?([\|\/\\ ])?(?:<.+?>)?\s*?(-?\d+)(?![\$\/%\d:])/g;
		while ((arXY = Rej.exec(iHTML)) != null) {
			if( /^[\/:]/.test(arXY[0]) ) continue;
			if( ! ( arXY[2] != undefined || arXY[3] < 0 )) continue;
			if( Math.abs(arXY[1]) > 400 || Math.abs(arXY[3]) > 400 ) continue;
			var idVillage = xy2id(arXY[1], arXY[3]);
			villageLink[j] = "<span><a href='karte.php?z=" + idVillage + "'>" + arXY[0] + "</a></span>";
			iHTML2 = iHTML2.replace(arXY[0], "<#!" + (j++) + "/>");
		}
		for( var i = 0; i < j ; i++ ) {
			iHTML2 = iHTML2.replace("<#!" + i + "/>", villageLink[i]);
		}
		villageLink.length = 0;
		cM.innerHTML = iHTML2;
		var mLinks = $xf(messID+"//span/a[contains(@href, 'karte.php')]", 'r');
		for( var i = 0; i < mLinks.snapshotLength; i++ ) {
			distanceTooltip(mLinks.snapshotItem(i),0);
			sendResTropAdd(mLinks.snapshotItem(i), 1);
		}
	}
}

function addQuickLinks() {
	var mLinks = $xf("//table[@id='report_surround']//a[contains(@href, 'karte.php')]", 'r');
	for( var i = 0; i < mLinks.snapshotLength; i++ ) {
		var newIns = mLinks.snapshotItem(i).parentNode;
		var vId = mLinks.snapshotItem(i).getAttribute('href').match(/\?d=(\d+)/)[1];
		newIns.appendChild(addARLinks(vId,1));
		distanceTooltip(mLinks.snapshotItem(i),0);
	}
}

/************************* market place ****************************/

// market filter on bye page
function applyFilter_hide() {
	var market = $g("range").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	for (var mr = 0; mr < market.length; mr++) {
		var market_hide = [0,0,0];
		var mf = market_all[mr].split(";");
		for ( var i = 0; i < 2; i++ ) {
			for ( var j = 1; j < 5; j++ ) {
				if( mf[i] == market_fi[4*i+j-1]*j || market_fc[i] == 0 ) {
					market_hide[i] = 1;
				}
			}
		}
		if( market_fi[8] == 1 && mf[2] < 1 ) market_hide[2] = 1;
		if( market_fi[9] == 1 && mf[2] == 1 ) market_hide[2] = 1;
		if( market_fi[10] == 1 && mf[2] >= 1 ) market_hide[2] = 1;
		if( market_fi[11] == 1 && mf[2] > 1 ) market_hide[2] = 1;
		if( market_fc[2] == 0 ) market_hide[2] = 1;
		// apply filter
		if( market_hide[0]*market_hide[1]*market_hide[2] == 1 ) {
			market[mr].style.display = '';
		} else {
			market[mr].style.display = 'none';
		}
	}
}

function applyFilter_row( row ) {
	market_fc[row] = 0;
	for ( var i = 0; i < 4; i++ ) {
		var n = row*4+i;
		if ( market_fi[n] != 0 ) {
			market_fc[row]++;
			market_ftd[n].setAttribute('class', allIDs[18]);
		} else {
			market_ftd[n].removeAttribute('class');
		}
	}
}

function applyFilter( fi ) {
	var row = Math.floor(fi/4);
	if( market_fi[fi] == 0 && ( market_fc[row] > 2 || row > 1 )) {
		for ( var i = 0; i < 4; i++ ) {
			market_fi[row*4+i] = 0;
		}
	}
	market_fi[fi] = 1 - market_fi[fi];
	applyFilter_row( row );
	applyFilter_hide();

	var mf_cookie = '';
	for( var i=0; i < 3; i++ ) {
		for ( var j=0; j < 4; j++ ) {
			mf_cookie += market_fi[i*4+j] + '.';
		}
		mf_cookie += '/';
	}
	RB_setValue(GMcookieID + "mf", mf_cookie);
}

function market_restore() {
	var mf_cookie;
	mf_cookie = RB_getValue(GMcookieID + "mf", "0.0.0.0./0.0.0.0./0.0.0.0./");
	if ( mf_cookie == undefined ) return;
	var rows = [];
	rows = mf_cookie.split("\.\/");
	for( var i=0; i < 3; i++ ) {
		var cels = [];
		cels = rows[i].split(".");
		for ( var j=0; j < 4; j++ ) {
			market_fi[i*4+j] = !isNaN(parseInt(cels[j])) ? cels[j] :0;
		}
		applyFilter_row( i );
	}
	applyFilter_hide();
}

function marketBuy() {
	if ( RB.Setup[8] == 0 ) return;
	if ( crtPath.indexOf('&t=1') == -1 && crtPage.indexOf('&t=1&u=') != -1 ) return;
	var market = $g("range");
	if( ! market ) return;

	var resIMG = [];
	for ( var i=0; i<4; i++ ) {
		resIMG[i] = $g("resWrap").getElementsByTagName("table")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[i*2].getElementsByTagName("img")[0].getAttribute("alt");
	}

	market = market.getElementsByTagName("thead")[0].getElementsByTagName("tr");
	var TM = [];
	TM.push(market[1].getElementsByTagName("td")[0].innerHTML.replace(/<.*>/g, ""));
	TM.push(market[1].getElementsByTagName("td")[1].innerHTML.replace(/<.*>/g, ""));
	if( RB.dictFL[4] == 0 ) {
		TM.push(market[1].getElementsByTagName("td")[3].innerHTML.replace(/<.*>/g, ""));
		if( RB.dictionary[4] != TM[2] ) {
			RB.dictionary[4] = TM[2];
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[4] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
	if( RB.dictFL[11] == 0 ) {
		var tm = $g('textmenu');
		if( tm ) {
			RB.dictionary[11] = tm.getElementsByTagName('A')[1].innerHTML;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[11] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}

	if( RB.Setup[8] == 1 || RB.Setup[8] == 3 ) {
		// add new 2 field (ally & x/y)
		market[0].getElementsByTagName("th")[0].setAttribute("colspan","7");
		market[1].appendChild($c(RB.dictionary[1]));
		market[1].appendChild($c('<sup>x</sup>/<sub>y</sub>'));
		$g("range").getElementsByTagName("tfoot")[0].getElementsByTagName("tr")[0].getElementsByTagName("td")[0].setAttribute("colspan","7");
	}
	// create filter table
	if( RB.Setup[8] > 1 ) {
		var p = $e('DIV');
		var newTABLE = $e('TABLE',[['id', allIDs[0]]]);
		p.appendChild(newTABLE);

		for( var i=0; i<2; i++ ) {
			var newTR = $ee('TR',$c(TM[i]));
			for( var j = 0; j < 4; j++ ) {
				var n = i*4+j;
				market_ftd[n] = $ee('TD', $e('IMG',[['alt', resIMG[j]],['title', resIMG[j]],['class', 'r' + (j+1)],['src', 'img/x.gif']]));
				market_ftd[n].addEventListener('click', function(x) { return function() { applyFilter(x); }}(n), 0);
				newTR.appendChild(market_ftd[n]);
				market_fi[n] = 0;
			}
			newTABLE.appendChild(newTR);
			market_fc[i] = 0;
		}

		var newTR = $ee('TR',$c('&nbsp;'));
		var aLabels = ['k<1', '1:1', 'k>=1', 'k>1'];
		for (var i = 8; i < 12; i++){
			market_ftd[i] = $ee('TD', $a(aLabels[i-8], [['href', jsVoid]]));
			market_ftd[i].addEventListener('click', function(x) { return function() { applyFilter(x); }}(i), 0);
			newTR.appendChild(market_ftd[i]);
			market_fi[i] = 0;
		};
		newTABLE.appendChild(newTR);
		$g('build').insertBefore(p, $g('range'));
	}
	// calculate offer/wanted rate
	var market = $g("range").getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	for ( var mr = 0; mr < market.length; mr++ )
	{
		var offer
		var wanted;

		offer = market[mr].getElementsByTagName("td")[0];
		wanted = market[mr].getElementsByTagName("td")[1];
		ally = market[mr].getElementsByTagName("td")[2];
		act = market[mr].getElementsByTagName("td")[4];

		offer.value = parseInt( offer.childNodes.item(2).nodeValue );
		offer.type = offer.childNodes.item(1).getAttribute('class').substring(1);

		wanted.value = parseInt( wanted.childNodes.item(2).nodeValue );
		wanted.type = wanted.childNodes.item(1).getAttribute('class').substring(1);

		if( RB.village_Var[0] > 0 ) {
			var totMerchants = Math.ceil(wanted.value / RB.village_Var[0]);
			var crtExceed = wanted.value - totMerchants * RB.village_Var[0];
			var newTip = RB.dictionary[2]+': '+totMerchants;
			if( crtExceed < 0 ) newTip += ' ( '+ crtExceed + ' )';
			var aLink = act.getElementsByTagName("a")[0];
			if( aLink ) aLink.setAttribute('title', newTip);
		}

		ally.value = ally.getAttribute('title');
		var mrate = Math.round(offer.value/wanted.value * 100)/100;

		if( RB.Setup[8] == 1 || RB.Setup[8] == 3 ) {
			act.setAttribute("style","font-size:8pt;width:20%;");
			market[mr].appendChild($c(ally.value, [['style','font-size:8pt;']]));

			var aCol = ['black', 'white'];
			if ( mrate < 1.00) aCol = ['red', '#FFE1E1']; else if ( mrate > 1.00) aCol = ['darkgreen', '#C8FFC8'];
			market[mr].appendChild($c(mrate,[['style','font-size:8pt;background-color:' + aCol[1] + '; color:' + aCol[0] + ';']]));
		}
		market_all[mr] = offer.type + ';' + wanted.type + ';' + mrate;
	}
	// restore filter settings
	if( RB.Setup[8] > 1 ) market_restore();
}

// CAPTCHA sux
function rb_sendTimeout() {
	if( RB.Setup[11] == 0 ) return;
	var btn_ok = $g(allIDs[15]);
	if( btn_ok ) {
		var i = parseInt(btn_ok.innerHTML);
		if( i > 0 ) {
			btn_ok.innerHTML = --i;
			setTimeout(rb_sendTimeout, 1000);
		} else {
			btn_ok.parentNode.removeChild(btn_ok);
			if( RB.Setup[11] == 2 ) {
				btn_ok = document.getElementsByName('s1')[0];
				btn_ok.disabled = false;
			}
		}
	} else {
		btn_ok = document.getElementsByName('s1')[0];
		if( btn_ok ) {
			var i = getRandom(8,4);
			btn_ok.parentNode.appendChild($ee('span',i,[['id',allIDs[15]],['style','color:#880000;font-size:large;']]));
			setTimeout(rb_sendTimeout, 1000);
			if( RB.Setup[11] == 2 ) btn_ok.disabled = true;
		}
	}
}

// market send page :)
function marketSend() {
	var basee = $g('send_select');
	if( ! basee ) return;
	basee.setAttribute("style","width:50%;");

	var maxC = 0;
	var rxI = new Array();
	var mName = "";
	var maxM = 0;
	var maxTr = 0;
	var lastLinkR = [0,0,0,0];

	var moC = document.getElementsByClassName('mer')[0];
	if (moC) {
		var moCC = moC.innerHTML.split(' ');
		mName = moCC[0];
		maxM = parseInt(moCC[1].split('/')[0]);
		merchInWork = parseInt(moCC[1].split('/')[1]) - maxM;
	} else return;

	if( mName != RB.dictionary[2] ) {
		RB.dictionary[2] = mName;
		saveCookie( 'Dict', 'dictionary' );
	}

	rb_sendTimeout();
	myVid = RB_getValue(GMcookieID + 'next', -1);
	if( myVid > 0 ) {
		var arXY = id2xy( myVid );
		document.getElementsByName('x')[0].value = arXY[0];
		document.getElementsByName('y')[0].value = arXY[1];
		RB_setValue(GMcookieID + 'next', -1);
	}

	for (var i = 1; i < 5; i++){
		rxI[i] = $g('r' + i);
		rxI[i].addEventListener('keyup', mhRowUpdate, false);
		rxI[i].addEventListener('change', mhRowUpdate, false);
		var iRow = basee.getElementsByTagName('tr')[i-1];
		iRow.getElementsByTagName('td')[0].getElementsByTagName('a')[0].addEventListener('click', mhRowUpdate, false);
		iRow.getElementsByTagName('td')[3].getElementsByTagName('a')[0].addEventListener('click', mhRowUpdate, false);
		var ref = $a('-',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkM(x); }}( i ), false);
		iRow.appendChild($ee('td',ref,[['width','5%']]));
		var ref = $a('R',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkR(x); }}( i ), false);
		iRow.appendChild($ee('td',ref,[['width','5%']]));
		var ref = $a('+',[['href',jsVoid]]);
		ref.addEventListener('click', function(x) { return function() { mhRowLinkP(x); }}( i ), false);
		iRow.appendChild($ee('td',ref,[['width','5%']]));
	};
	maxC = parseInt(iRow.getElementsByTagName('td')[3].innerHTML.match(/>\((\d+)\)</)[1]);
	maxTr = maxM * maxC;

	if( maxC != RB.village_Var[0] ) {
		RB.village_Var[0] = maxC;
		saveVCookie( 'VV', RB.village_Var );
	}

	var newTR = $e('tr');
	var cM = $c('',[['colspan','3']]);
	newTR.appendChild(cM);
	basee.appendChild(newTR);
	var mhText = mName + ': ' + maxM + '<br>( &#931;=' + maxTr + ' )';
	setMerchantsCell(mhText, 'black');

	var ref = $a('(M-)',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowLinkMMem, false);
	newTR.appendChild($ee('td',ref,[['align','center']]));
	var ref = $a('-',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowsLinkM, false);
	newTR.appendChild($ee('td',ref,[['width','5%']]));
	var ref = $a('M',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowLinkMem, false);
	newTR.appendChild($ee('td',ref,[['width','5%']]));
	var ref = $a('+',[['href',jsVoid]]);
	ref.addEventListener('click', mhRowsLinkP, false);
	newTR.appendChild($ee('td',ref,[['width','5%']]));

	// travel time
	var ss = $g('btn_ok');
	if( ss ) {
		ss = ss.parentNode;
		addShowDistanceIn( ss, -1 );
	}

	function setMerchantsCell(tM, colM) {
		cM.innerHTML = tM;
		$at(cM, [['style', 'font-size:11px; color:' + colM + ';line-height:16px;']]);
	};
	function getTotTransport() {
		var totT = 0;
		for (var i = 1; i < 5; i++) {
			var aR = parseInt(rxI[i].value);
			if (!isNaN(aR)) totT += aR;
		}
		return totT;
	}
	function mhRowUpdate() {
		var totTransport = getTotTransport();
		var totMerchants = Math.ceil(totTransport / maxC);
		var mhColor = 'darkgreen';
		var crtWaste = maxC - (totTransport - (totMerchants-1) * maxC);
		var crtExceed = totTransport - maxTr;

		var mhText = "<b>" + mName + ": " + totMerchants + " / " + maxM + "<br>&#931;= " + totTransport;
		if (totMerchants > maxM) {
			mhColor = "red";
			mhText += " ( "+ crtExceed + " )";
		} else if ( crtWaste ) mhText += " ( -"+ crtWaste + " )";
 		mhText += "</b>";
		setMerchantsCell(mhText, mhColor);
	}
	function mhRowLinkR ( RC ) {
		var totTransport = getTotTransport();
		var aR = parseInt(rxI[RC].value);
		if( isNaN(aR) ) aR = 0;//return;
		if( lastLinkR[0] != RC || lastLinkR[3] != aR ) {
			lastLinkR = [RC,0,aR];
			var totMerchants = Math.ceil(totTransport / maxC);
			var crtExceed = totTransport - maxTr;
			if( crtExceed > 0 ) {
				rxI[RC].value = Math.ceil(crtExceed / maxC) > Math.ceil(aR / maxC) || aR < crtExceed ? 0: rxI[RC].value - crtExceed;
			} else {
				var crtWaste = maxC - (totTransport - (totMerchants-1) * maxC);
				var recomended = crtWaste != 0 ? aR + crtWaste : 0;
				var i = recomended < resNow[RC-1] ? recomended : resNow[RC-1];
				rxI[RC].value = crtExceed < 0 ? i : 0;
			}
		} else {
			var i = ( aR == 0 && lastLinkR[1] == 0 ) ? false : true;
			rxI[RC].value = lastLinkR[1] == 0 && i ? 0 : lastLinkR[2];
			if( ++lastLinkR[1] > 1 || ! i ) lastLinkR[0] = 0;
		}
		lastLinkR[3] = parseInt(rxI[RC].value);
		mhRowUpdate();
	}
	function mhRowLinkM ( RC ) {
		var aR = parseInt(rxI[RC].value);
		rxI[RC].value = aR > maxC ? aR - maxC : '';
		mhRowUpdate();
	}
	function mhRowLinkP ( RC ) {
		var aR = parseInt(rxI[RC].value);
		var i = isNaN(aR) ? maxC : aR + maxC;
		rxI[RC].value = i < resNow[RC-1] ? i : resNow[RC-1];
		mhRowUpdate();
	}
	function mhRowsLinkM () {
		for( var i = 1; i < 5; i++ )
			mhRowLinkM ( i );
	}
	function mhRowsLinkP () {
		for( var i = 1; i < 5; i++ )
			mhRowLinkP ( i );
	}
	function mhRowLinkMem () {
		for( var i = 0; i < 4; i++ )
			rxI[i+1].value = RB.wantsMem[i] < resNow[i] ? RB.wantsMem[i]: resNow[i];
		mhRowUpdate();
	}
	function mhRowLinkMMem () {
		for( var i = 1; i < 5; i++ ) {
			RB.wantsMem[i-1] -= rxI[i].value;
			if( RB.wantsMem[i-1] < 0 ) RB.wantsMem[i-1] = 0;
		}
		saveCookie('Mem', 'wantsMem');
		alert( "Corrected to: "+ RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
	}
}

// 'Repeat' offer possition
function marketReSel( sRow ) {
	var selTable = $g('sell_overview');
	var strow = selTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[sRow];

	var offer = strow.getElementsByTagName("td")[1];
	var wanted = strow.getElementsByTagName("td")[2];
	var dur = toNumber( strow.getElementsByTagName("td")[5].innerHTML );

	offer.value = parseInt( offer.childNodes.item(1).nodeValue );
	offer.type = offer.childNodes.item(0).getAttribute('class').substring(1);
	wanted.value = parseInt( wanted.childNodes.item(1).nodeValue );
	wanted.type = wanted.childNodes.item(0).getAttribute('class').substring(1);

	document.getElementsByName('rid1')[0].value = offer.type;
	document.getElementsByName('m1')[0].value = offer.value;

	document.getElementsByName('rid2')[0].value = wanted.type;
	document.getElementsByName('m2')[0].value = wanted.value;

	if( ! isNaN(dur) ) {
		document.getElementsByName('d1')[0].setAttribute('checked','checked');
		document.getElementsByName('d2')[0].value = dur;
	} else {
		document.getElementsByName('d1')[0].removeAttribute('checked');
	}
}

// automatically set min resourse as wanted & max resourse as offer
// add 'Repeat' key
function marketOffer() {
	if(!($g('sell'))) return;
	var maxR = 0;
	var minR = 0;
	for( var i = 1; i < 4; i++ ) {
		if( resNow[i] > resNow[maxR] ) maxR = i;
		if( resNow[i] < resNow[minR] ) minR = i;
	}
	document.getElementsByName('rid1')[0].value = maxR + 1;
	document.getElementsByName('rid2')[0].value = minR + 1;

	var selTable = $g('sell_overview');
	if ( ! selTable ) return;
	// add additional field
	var strows = selTable.getElementsByTagName("thead")[0].getElementsByTagName("tr");
	strows[0].getElementsByTagName("th")[0].setAttribute("colspan","7");
	strows[1].appendChild($c('&nbsp;',[['style','width:5%;']]));
	// fill rows
	var strows = selTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	for (var mr = 0; mr < strows.length; mr++ )
	{
		var newTD = $ee('td',$a('R',[['href',jsVoid]]));
		newTD.addEventListener('click', function(x) { return function() { marketReSel(x); }}( mr ), false);
		strows[mr].appendChild(newTD);
	}
	rb_sendTimeout();
}

// calculate incomming resourses
function marketSumm() {
	if( RB.Setup[10] == 0 ) return;
	if( ($g('target_validate')) ) return;
	var aT = document.getElementsByClassName('traders');
	if( aT.length == 0 ) return;
	var cH4 = document.getElementsByTagName('H4');
	if( cH4 ) var merchB = cH4.length;
	if( merchInWork != 0 && merchB == 1 )
		if( ! /<span\s+class="f10"/i.test(aT[0].innerHTML) ) return;

	resourceCalculatorInit();
	for (var i = 0; i < aT.length; ) {
		// get time to go
		var incomeCell = aT[i].getElementsByTagName('tr')[1].getElementsByTagName('td')[0].innerHTML;
		var timeToGo = toSeconds(incomeCell.match(/\d+:\d{2}:\d{2}/)[0]);
		// get incoming resources
		var incomeCell = aT[i].getElementsByTagName('tr')[2].getElementsByTagName('td')[0].innerHTML;
		var incomingRes = incomeCell.match( /class="r1".+>(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/ );

		resourceCalculator( aT[i], timeToGo, incomingRes, 0 );
		if( aT[i++].nextSibling.nodeName.match(/h4/i) ) break;
	}
	if( RB.Setup[10] == 2 && rpCount > 0 ) resourceCalculatorSumm(aT[0], timeToGo, i);
}

var incomeToGo = [];
var summIncomingRes = [];
var serverTime = 0;
var lastTime = 0;
var rpCount = 0;

function resourceCalculatorInit () {
	incomeToGo = resNow.slice();
	serverTime = getServerTime();
	lastTime = 0;
	summIncomingRes = [0,0,0,0];
	rpCount = 0;
}

function resourceCalculator ( tObj, timeToGo, incomingRes, tType ) { // tType 0-market 1-RP
	var textIncome = '';
	var redLine = '';
	for( var j = 0; j < 4; j++ ) {
		var extraRes = 0;
		var mColor = '';
		summIncomingRes[j] += parseInt(incomingRes[j+1]);
		incomeToGo[j] = Math.round(incomepersecond[j] * (timeToGo - lastTime) + incomeToGo[j]);
		if( incomeToGo[j] < 0 ) {
			var redTime = serverTime + timeToGo - Math.floor(incomeToGo[j]/incomepersecond[j]);
			redLine += ' <img src="img/x.gif" class="r' + (j+1) + '">0 ' + formatTime(redTime);
			extraRes = incomeToGo[j];
			mColor = 'red';
			incomeToGo[j] = 0;
		}
		incomeToGo[j] += parseInt(incomingRes[j+1])
		if( incomeToGo[j] > fullRes[j] ) {
			extraRes = incomeToGo[j] - fullRes[j];
			incomeToGo[j] = fullRes[j];
			mColor = 'red';
		}
		textIncome += ' <img src="img/x.gif" class="r' + (j+1) + '"><span style="color: ' + mColor + ';">' + incomeToGo[j];
		if( extraRes != 0 ) textIncome += ' (' + (extraRes > 0 ? '+' + extraRes: extraRes) + ') ';
		textIncome += '</span>';
	}
	if( incomepersecond[3] < 0 ) {
		var timeToZero = timeToGo - Math.round(incomeToGo[3]/incomepersecond[3]);
		if( timeToZero < 86400 )
			textIncome += ' <img src="img/x.gif" class="r5">' + formatTime(serverTime + timeToZero,2);
	}
	var newFText = '<img class="clock" src="img/x.gif"> ' + formatTime(absTime(timeToGo), 1); // 2 ??
	if( tType == 0 ) {
		var newTR = $ee('tr',$c( newFText ),[['class','res']]);
		newTR.appendChild( $c( textIncome ));
		tObj.appendChild( newTR );
	} else { //'&nbsp;<img class="clock" src="img/x.gif"> ' + formatTime(serverTime + timeToGo, 1)
	var newTR = $ee('TR',$c(newFText));
		newTR.appendChild($c(textIncome,[['colspan','11']]));
		tObj.appendChild($ee('TBODY',newTR,[['class','infos']]));
	}
	lastTime = timeToGo;

	if( redLine.length > 0 ) {
		var PP = $ee('P',$ee('table',$ee('tr',$c(redLine)),[['class',allIDs[13]]]));
		tObj.parentNode.insertBefore(PP,tObj);
	}
	rpCount++;
}

function resourceCalculatorSumm ( tObj, timeToGo ) {
	if( rpCount == 0 ) return;
	var rSumm = 0;
	var newR1 = $ee('TR',$c('<img class="clock" src="img/x.gif">'));
	var newR2 = $ee('TR',$c(formatTime(serverTime + timeToGo, 1)));
	var newR3 = $ee('TR',$c('&nbsp;'));

	var t = timerB.length;
	for( var j = 0; j < 4; j++ ) {
		rSumm += summIncomingRes[j];
		newR1.appendChild($c('<img src="img/x.gif" class="r' + (j+1) + '">'));
		newR2.appendChild($c(summIncomingRes[j]));
		timerB[t] = new Object();
		timerB[t].time = incomepersecond[j] > 0 ? Math.round((fullRes[j]-incomeToGo[j]) / incomepersecond[j])+lastTime : Math.round(incomeToGo[j] / incomepersecond[j])-lastTime;
		timerB[t].obj = $eT('TD', timerB[t].time, 0);
		newR3.appendChild(timerB[t++].obj);
	}
	lastTimerB = timerB.length;

	newR1.appendChild($c('&#931;('+rpCount+')'));
	newR2.appendChild($c(rSumm));
	var MM = $a('(M-)',[['href',jsVoid]]);
	MM.addEventListener('click', linkMMem, false);
	newR3.appendChild($ee('TD',MM));
	var newT = $ee('TABLE',newR1,[['class',allIDs[7]],['style','background-color:#F8FFEE;width:100%;']]);
	newT.appendChild(newR2);
	newT.appendChild(newR3);

	tObj.parentNode.insertBefore($ee('P', newT),tObj);

	function linkMMem () {
		for( var j = 0; j < 4; j++ ) {
			RB.wantsMem[j] -= summIncomingRes[j];
			if( RB.wantsMem[j] < 0 ) RB.wantsMem[j] = 0;
		}
		saveCookie('Mem', 'wantsMem');
		alert( "Corrected to: "+ RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
	}
}

/************************* cookie ****************************/

var cookieDelim = [
	[")\\.([-\\.\\d]+)",'.','/'],
	[")@_(.*?)@#_",'@_','@#_']];

function loadVCookie ( nameCoockie, contentCookie, vID, cType ) {
	var cvID = vID || village_aid;
	var cvT = cType || 0;
	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	var Rej = new RegExp("(" + cvID + cookieDelim[cvT][0]);
	var oneCookie = RCookie.match(Rej);
	if( cvT == 1 ) RB[contentCookie].length = 1;
	if( oneCookie != undefined ) {
		var cookieValue = oneCookie[2].split(cookieDelim[cvT][1]);
		var sI = cvT == 0 ? 0: 1;
		var contentLength = cvT == 0 ? RB[contentCookie].length: cookieValue[0].length == 0 ? 1: parseInt(cookieValue[0]);
		for( var j = 0; j < contentLength; j++ ) {
			RB[contentCookie][j] = cookieValue[j+sI] == undefined ? 0: cvT == 0 ? parseInt(cookieValue[j]): cookieValue[j+sI];
		}
	} else for( var j = 0; j < RB[contentCookie].length; j++ ) RB[contentCookie][j] = 0;
	if( cvT == 1 ) if( isNaN(RB[contentCookie][0]) ) RB[contentCookie][0] = 0;
}

function saveVCookie ( nameCoockie, contentCookie, cType ) {
	var newCookie = '';
	var cvT = cType || 0;
	var oldCookie = RB_getValue(GMcookieID + nameCoockie,'');
	for( var i = 0; i < villages_count; i++ ) {
		newCookie += villages_id[i] + cookieDelim[cvT][1];
		if( villages_id[i] == village_aid ) {
			if( cvT == 1 ) newCookie += contentCookie.length + cookieDelim[cvT][1];
			for( var j = 0; j < contentCookie.length; j++ ) {
				newCookie += contentCookie[j] + cookieDelim[cvT][1];
			}
		} else {
			var Rej = new RegExp("(" + villages_id[i] + cookieDelim[cvT][0]);
			var oldOneCookie = oldCookie.match(Rej);
			if( oldOneCookie != undefined ) newCookie += oldOneCookie[2];
		}
		newCookie += cookieDelim[cvT][2];
	}
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function saveCookie( nameCoockie, contentCookie ) {
	var newCookie = '';
	for( var j = 0; j < RB[contentCookie].length; j++ )	newCookie += RB[contentCookie][j] + '@_';
	RB_setValue(GMcookieID + nameCoockie, newCookie);
}

function loadCookie( nameCoockie, contentCookie ) {
	var RCookie = RB_getValue(GMcookieID + nameCoockie,'');
	if( RCookie != '' ) {
		var cookieValue = RCookie.split('@_');
		for( var j = 0; j < RB[contentCookie].length; j++ )
			if( cookieValue[j] != undefined ) if( cookieValue[j].length > 0 ) RB[contentCookie][j] = cookieValue[j];
	}
}

function loadAllCookie () {
	loadVCookie ( 'Dorf2', 'village_Dorf2' );
	loadCookie ( 'xy', 'XY' );
	loadVCookie ( 'VV', 'village_Var' );
	loadCookie ( 'OV', 'overview' );
	loadCookie ( 'Mem', 'wantsMem' );
	loadCookie ( 'DictFL', 'dictFL' );

	if( ! /^1\.5\./.test(RB.Setup[0]) ) RB.Setup = RB.dSetup.slice(); else RB.Setup[0] = version;
}

/************************* distance calculation ***************************/

var TTime = [
	[19, [24]], // Theutates Thunder
	[17, [23]], // Pathfinder
	[16, [4,25]], // Equites Legati, Druidrider
	[14, [5]], // Equites Imperatoris
	[13, [26]], // Haeduan
	[10, [6,15]], // Equites Caesaris, Paladin
	[9, [14,16]], // Scout
	[7, [3,11,12,21]], // Imperian, Clubswinger, Spearman, Phalanx
	[6, [1,13,22]], // Legionnaire, Axeman, Swordsman
	[5, [2,10,20,29,30]], // Praetorian, Settler, Chieftain
	[4, [7,9,17,19,27]], // Battering Ram, Senator, Ram, Chief, Ram
	[3, [8,18,28]] // Fire Catapult, Catapult, Trebuchet
	];
var MTime = [16, 12, 24];

function showAllTTime( vType, tVil, arena ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	var serverTime = getServerTime();
//	var tR = 3; //troop race
	var tR = vType < 1 ? parseInt(RB.Setup[2]) + 1: 0;
	var sK = /speed/i.test(crtPath) ? 2: 1;
	var sM = /speed/i.test(crtPath) ? 3: 1;
	if( /x2/i.test(crtPath) ) sM = 2;

	var t = lastTimerP[0];
	timerP.length = t;
	var xy = id2xy(tVil);
	var distance = calcDistance(tVil, village_aid);
	var newTR = $ee('TR',$ee('TD','('+xy[0]+'|'+xy[1]+')',[['style','font-weight:bold;']]));
	newTR.appendChild($ee('TD',' &lt;-&gt; ' + parseFloat(distance.toFixed(2)),[['colspan',(tR > 0 ? 2:4)]]));
	newTABLE.appendChild(newTR);

	if( distance > 0 ) {
		if( vType < 2 ) {
			var newTR = $e('TR');
			var ht = getTTime( distance, MTime[parseInt(RB.Setup[2])]*sM, 0, 0 );
			var htg = formatTime(ht, 0);
			newTR.appendChild($ee('TD',htg));
			var attr = vType < 1 ? undefined : [['colspan',3]];
			newTR.appendChild($ee('TD',$e('IMG',[['src',img_car]]),attr));
			htf = absTime( ht );
			timerP[t] = new Object();
			timerP[t].time = htf;
			timerP[t].obj = $ee('TD',formatTime(htf, 1));
			newTR.appendChild(timerP[t++].obj);
			newTABLE.appendChild(newTR);
		}
		if( vType > -1 )
		for( var i = 0; i < TTime.length; i++ ) {
			var newTR = $e('TR');
			var ht = getTTime( distance, TTime[i][0]*sK, arena, speedAK[parseInt(RB.Setup[3])] );
			var htg = formatTime(ht, 0);
			newTR.appendChild($ee('TD',htg));
			var j = 0;
			var fl = tR ? false: true;
			for( var k = 0; k < 3; k++ ) {
				var fl2 = tR ? false: true;
				var newTD = $e('TD');
				while( TTime[i][1][j] < (11+10*k) ) {
					if( Math.ceil((TTime[i][1][j])/10) == tR ) { fl = true; fl2 = true; }
					newTD.appendChild($e('IMG',[['class','unit u' + TTime[i][1][j++]],['src','img/x.gif']]));
				}
				if( fl2 ) newTR.appendChild(newTD);
			}
			if( fl ) {
				htf = absTime( ht );
				timerP[t] = new Object();
				timerP[t].time = htf;
				timerP[t].obj = $ee('TD',formatTime(htf, 1));
				newTR.appendChild(timerP[t++].obj);
				newTABLE.appendChild(newTR);
			}
		}
	}
	lastTimerP[1] = t;
	return newTABLE;
}

function distanceTooltipGen(e) {
	makeTooltip(showAllTTime(0, this.getAttribute('href').match(/[&\?][zd]=(\d+)/)[1], RB.village_Var[1]));
}
function distanceTooltipGen2(e) {
	makeTooltip(showAllTTime(1, this.getAttribute('href').match(/[&\?][zd]=(\d+)/)[1], RB.village_Var[1]));
}
function distanceTooltip(target, tp) {
	if( ! /[&\?][zd]=(\d+)/.test(target.getAttribute('href')) ) return;
	if( tp == 0 )
		target.addEventListener("mouseover", distanceTooltipGen, false);
	else
		target.addEventListener("mouseover", distanceTooltipGen2, false);
	target.addEventListener("mouseout", removeTooltip, false);
}

function addShowDistanceIn( ss, vt ) {
	var newP = $e('DIV',[['style','float:right;'],['id',allIDs[0]]]);
	ss.parentNode.insertBefore(newP, ss);
	document.getElementsByName('x')[0].addEventListener('keyup', function() { showDistanceIn( vt ) }, false);
	document.getElementsByName('y')[0].addEventListener('keyup', function() { showDistanceIn( vt ) }, false);
	lastTimerP[2] = lastTimerP[0];
	showDistanceIn( vt );
}

function showDistanceIn ( vt ) { // travel time
	var dd = $g(allIDs[0]);
	if( ! dd ) return;
	var dX = parseInt(document.getElementsByName('x')[0].value);
	var dY = parseInt(document.getElementsByName('y')[0].value);
	var ddd = dd.firstChild;
	if( ddd ) dd.removeChild(ddd);
	lastTimerP[0] = lastTimerP[2];
	if( isNaN(dX) || isNaN(dY) ) return;
	dd.appendChild(showAllTTime(vt,xy2id(dX, dY),RB.village_Var[1]));
	lastTimerP[2] = lastTimerP[0];
	lastTimerP[0] = lastTimerP[1];
}

/************************* other ****************************/

function incomeResourcesInRP () {
	if( RB.Setup[10] == 0 ) return;
	var townTables = $xf('//table[thead/tr/td/@class="role"]','l');
	resourceCalculatorInit();
	for ( var i=0 ; i < townTables.snapshotLength; i++ ){
		var ttable = townTables.snapshotItem(i);
		var vID = $xf('thead/tr/td[@class="role"]/a', 'f', ttable).getAttribute('href').match(/d=(\d+)/)[1];
		if( vID != village_aid ) {
			var xy = id2xy(vID);
			$xf('tbody[@class="units"]/tr/th', 'f', ttable).innerHTML += '('+xy[0]+'|'+xy[1]+') ';
		}
		var mLinks = $xf('tbody/tr/td/div[@class="res"]', 'f', ttable);
		if( mLinks ) {
			var timeToGo = toSeconds($xf('tbody/tr/td/div/span[contains(@id, "timer")]','f',ttable).innerHTML);
			var incomingRes = mLinks.innerHTML.match( /class="r1".+>(\d+).+?>(\d+).+?>(\d+).+?>(\d+)/ );
			resourceCalculator( ttable, timeToGo, incomingRes );
		}
	}
	if( RB.Setup[10] == 2 && rpCount > 0 ) resourceCalculatorSumm(townTables.snapshotItem(0), timeToGo);
}

function addARLinks(myVid, aDirect) {
	var newLinks = $e('span');
	var armStyle = aDirect == 0 ? img_def: img_att;
	var ref = $ee('a',$e('img',[['src',armStyle]]),[['href','a2b.php?z=' + myVid],['onClick','return false;']]);
	ref.addEventListener('click', function(x) { return function() { sendArmy(x); }}(myVid), false);
	newLinks.appendChild(ref);
	if( aDirect < 2 ) {
		var ref = $ee('a',$e('img',[['src',img_car]]),[['href','build.php?z=' + myVid + '&gid=17'],['onClick','return false;']]);
		ref.addEventListener('click', function(x) { return function() { sendResourses(x); }}(myVid), false);
		newLinks.appendChild(ref);
	}
	return newLinks;
}

function sendResTropAdd ( aLink, aType ) {
	if( RB.Setup[15] == 0 ) return;
	var vId = aLink.getAttribute('href').match(/\?[dz]=(\d+)/)[1];
	if( vId == village_aid ) return;
	aLink.parentNode.appendChild(addARLinks(vId, aType));
}

// begin Quick actions to my other villages
function vlist_addButtons() {
	var vlist = $g("vlist");
	if ( vlist ) {
		var villages = vlist.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
		for ( var vn = 0; vn < villages.length; vn++ ) {
			var getTds = villages[vn].getElementsByTagName("td");

			linkVSwitch[vn] = getTds[1].getElementsByTagName("a")[0].getAttribute('href');
			var coords = getTds[2].innerHTML.match(/-?\d{1,3}/g);
			var myVid = xy2id(coords[0], coords[1]);
			villages_id[vn] = myVid;

			if( getTds[0].getAttribute('class').match(/hl/i) ) {
				village_aid = myVid; village_aNum = vn;
			}

			if( ! paranoidMode ) {
				var newTD = $ee('TD', addARLinks(myVid,0));
				villages[vn].appendChild(newTD);
			}
			villages_count++;
		}
		if( ! paranoidMode ) {
			var villages_c = vlist.getElementsByTagName("thead")[0].getElementsByTagName("tr");
			newTH = $c('(' + villages_count + ')');
			villages_c[0].appendChild(newTH);
		}
	} else {
		villages_count = 1;
		villages_id[0] = 0;
	}
}
// end Quick actions to my other villages

function calculationPPH () {
	var RCookie = RB_getValue(GMcookieID + 'vPPH','0.0.0.0.0./');
	var rows = RCookie.split('\.\/');
	for( var i=0; i < (rows.length-1); i++ ) {
		var cels = [];
		cels = rows[i].split(".");
		for ( var j=1; j < 5; j++ ) {
			sumPPH[j-1] += !isNaN(parseInt(cels[j])) ? parseInt(cels[j]) :0;
		}
	}
}

var lastColor = [4,4,4,4];

function newStyle(e, j, sp) {
	var color = ( j == 2 && sp ) ? "white" : "black";
	var addCss = "."+ allIDs[16] + e + " div {color: " + color + ";background-color:" + bgcolor[j] + ";float: right;width: 100%;height:18px;margin-top:0px; display:inline;}";
	lastColor[e] = j;
	return addCss;
}

function progressbar_updValues() {
	getResources();
	var addCss = '';
	for (var j = 0; j < 4; j++) {
		var spaceLeft = fullRes[j] - resNow[j];
		var percentUsed2 = resNow[j] / fullRes[j] * 100;
		var percentUsed = Math.round(percentUsed2);

		timerRB[j].pb.setAttribute("style", "width: " + Math.round(percentUsed2 * 2) + "px;");
		timerRB[j].pval.innerHTML = percentUsed + "% ";
		if( incomepersecond[j] != 0 ) {
			if( timerRB[j].time != 0 ) {
				timerRB[j].time += incomepersecond[j] > 0 ? -1 : 1;
				timerRB[j].val.innerHTML = formatTime(timerRB[j].time, 0);
			}
		}

		var sp = incomepersecond[j] > 0 ? true:false;
		if( timerRB[j].time < parseFloat(RB.Setup[6])*3600 ) {
			if (lastColor[j] != 2) {
				addCss += newStyle(j, 2, sp);
			}
		} else if( timerRB[j].time < parseFloat(RB.Setup[5])*3600 ) {
			if (lastColor[j] != 1) {
				addCss += newStyle(j, 1, sp);
			}
		} else {
			if( lastColor[j] != 0 ) {
				addCss += newStyle(j, 0, sp);
			}
		}
	}
	if( addCss != '' ) GM_addStyle(addCss);
	for( var i = 0; i < timerP.length; i++ ) {
		timerP[i].obj.innerHTML = formatTime(++timerP[i].time, 1);
	}
	for( var i = 0; i < timerB.length; i++ ) {
		if( timerB[i].time != 0 ) {
			timerB[i].time += timerB[i].time > 0 ? -1 : 1;
			timerB[i].obj.innerHTML = formatTime(timerB[i].time, 0);
		}
	}
	for( var i = 0; i < timerB3.length; i++ ) {
		if( timerB3[i].time > 0 ) timerB3[i].obj.innerHTML = formatTime(--timerB3[i].time, 3);
		else if( timerB3[i].time == 0 ) {
			timerB3[i].obj.style.color = 'red';
			timerB3[i].time--;
		}
	}
	for( var i = 0; i < timerF.length; i++ ) {
		timerF[i].obj.innerHTML = formatTime(++timerF[i].time, 0);
	}
	for( var i = 0; i < timerOv.length; i++ ) {
		if( timerOv[i].time != 0 ) {
			timerOv[i].time += timerOv[i].dir;
			timerOv[i].obj.innerHTML = formatTime(timerOv[i].time, 0);
		}
	}
}

function progressbar_init() {
	calculationPPH();

	var tbl = $e('TABLE',[['cellspacing', '1'],['cellpadding', '1'],['id', allIDs[1]]]);
	var tblHead = $e("thead");
	var tblBody = $e("tbody");
	var ssPPH = 0;

	for (var j = 0; j < 4; j++) {
		// creates a table row
		var cellText = $e("div", [["class", allIDs[2]]]);

		timerRB[j] = new Object();
		timerRB[j].pb = $e('div', [['class', allIDs[16] + j]]);
		var fval = $e('DIV');
		fval.appendChild($e('IMG',[['class','r' + (j+1)],['src','img/x.gif'],['title',income[j]]]));
		timerRB[j].pval = $e('span');
		fval.appendChild(timerRB[j].pval);

		if( incomepersecond[j] != 0 ) {
			var spaceLeft = fullRes[j] - resNow[j];
			timerRB[j].time = incomepersecond[j] > 0 ? Math.round(spaceLeft / incomepersecond[j]) : Math.round(resNow[j] / incomepersecond[j]);
			timerRB[j].val = timerRB[j].val = $eT('span', timerRB[j].time, 0);
		} else {
			timerRB[j].time = 0;
			timerRB[j].val = $ee('span', '--:--');
		}
		fval.appendChild(timerRB[j].val);

		timerRB[j].pb.appendChild(fval);
		cellText.appendChild(timerRB[j].pb);

		var row = $ee('TR', $ee('TD',cellText));

		ssPPH += sumPPH[j];
		row.appendChild($ee('TD',sumPPH[j],[['class',allIDs[11]]]));
		tblBody.appendChild(row);
	}

	var row = $e('TR');
	var cell = $e('TH',[['class','rb_head']]);
	var alink = $a('  نوار منابع فارسی +',[['href', '#'],['onClick',jsNone],['title','مرور کلی']]);
	alink.addEventListener('click', overviewAll, false);
	var alink2 = $a(' v' + version,[['href', namespace],['style','font-size:8px;'],['target','_blank'],['title','ورژن اسکریپت']]);

	var aImg = $e('IMG',[['src',img_pref],['title','تنظیمات'],['style','padding:0px 2px;cursor:pointer;']]);
	aImg.addEventListener('click', rbSetup, false);

	var aImg2 = $e('IMG',[['src',img_notes],['title','متن'],['style','padding:0px 2px;cursor:pointer;']]);
	aImg2.addEventListener('click', rbNotes, false);

	cell.appendChild(alink);
	cell.appendChild(alink2);
	cell.appendChild(aImg);
	cell.appendChild(aImg2);
	row.appendChild(cell);

	row.appendChild($ee('TD',$ee('SPAN','&#931;/h',[['title',ssPPH]]),[['class',allIDs[12]]]));
	cell.appendChild(aImg);
    var alink3 = $a('[M+]', [['href', jsVoid],['style','font-size:8px;'],['title','90% منابع پر است']]);
    alink3.addEventListener('click', saveSpaceLeftToMem, false);
    cell.appendChild(alink3);

	tblHead.appendChild(row);
	tbl.appendChild(tblHead);
	tbl.appendChild(tblBody);

	if( RB.Setup[4] == 0 ) {
		$g(pageElem[2]).appendChild($ee('P',tbl));
	} else {
		makeFloatD(tbl, 1);
	}

	progressbar_updValues();
}

// thanks to yenoh
function saveSpaceLeftToMem() {
    RB.wantsMem = [0,0,0,0];
    for (var e = 0; e < 4; e++) {
        RB.wantsMem[e] = Math.round((fullRes[e] - resNow[e]) * 0.9);
    }
    saveCookie('Mem', 'wantsMem');
    alert( "Saved: "+ RB.wantsMem[0] +" | "+ RB.wantsMem[1] +" | "+ RB.wantsMem[2] +" | "+ RB.wantsMem[3] );
}

function distanceToMyVillages() {
	var curD = crtPath.match(/[&\?][zd]=(\d+)/)[1];
	var mid = $g(pageElem[1]);
	if ( mid ) {
		var pp = $e('P',[['style','margin:10px 30px;']]);
		var sel = $e('SELECT');
		for( var j = 0; j < 21; j++ ) sel.options[j] = new Option(j, j, false, false);
		sel.selected = RB.Setup[9]; sel.value = parseInt(RB.Setup[9]);
		pp.appendChild($t(RB.dictionary[3] + ' : '));
		pp.appendChild(sel);
		attbl = showAllTTime(1, curD, RB.Setup[9]);
		lastTimerP[2] = lastTimerP[0];
		lastTimerP[0] = lastTimerP[1];
		pp.appendChild(attbl);
		mid.appendChild(pp);
		document.addEventListener("change", updateDistTable, false);
	}
	var villages = $g("vlist");
	if ( ! villages ) return;
	villages = villages.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	for( var i = 0; i < villages_id.length; i++ ) {
		var distance = parseFloat(calcDistance( villages_id[i], curD ).toFixed(1));
		villages[i].getElementsByTagName("td")[3].appendChild($t(" <-> " + distance));
	}
	function updateDistTable () {
		pp.removeChild(attbl);
		lastTimerP[0] = lastTimerP[2];
		attbl = showAllTTime(1, curD, sel.value);
		lastTimerP[0] = lastTimerP[1];
		pp.appendChild(attbl);
	}
}

function distanceToTargetVillages() {
	var vtable = $g("villages");
	if ( ! vtable ) return;
	// add additional field
	var vtrows = vtable.getElementsByTagName("thead")[0].getElementsByTagName("tr");
	vtrows[0].getElementsByTagName("th")[0].setAttribute("colspan","4");
	vtrows[1].appendChild($c('&lt;-&gt;',[['style','width:10%;']]));
	// fill rows
	var vtrows = vtable.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	for (var mr = 0; mr < vtrows.length; mr++)
	{
		var vtLink = vtrows[mr].getElementsByTagName('td')[0].getElementsByTagName('a')[0];
		var vURL = vtLink.getAttribute("href");
		distanceTooltip(vtLink,0);
		sendResTropAdd(vtLink, 1);
		var Rej = /d=(\d+)/i;
		var vID = Rej.exec(vURL)[1];
		var distance = parseFloat(calcDistance( vID, village_aid ).toFixed(1));
		vtrows[mr].appendChild($c(distance));
	}
}

function fillXYtoRP() {
	myVid = RB_getValue(GMcookieID + 'next', -1);
	if( myVid > 0 ) {
		var arXY = id2xy( myVid );
		document.getElementsByName('x')[0].value = arXY[0];
		document.getElementsByName('y')[0].value = arXY[1];
		RB_setValue(GMcookieID + 'next', -1);
	}
	if( $g('coords') ) {
		var ss = $g('btn_ok');
		if( ss ) {
			var newP = $e('DIV',[['style','float:right;'],['id',allIDs[0]]]);
			addShowDistanceIn( ss, 0 );
		}
	}
}

function sendArmy( myVid ) {
	if( $g('coords') ) {
		var arXY = id2xy( myVid );
		document.getElementsByName('x')[0].value = arXY[0];
		document.getElementsByName('y')[0].value = arXY[1];
		showDistanceIn( 0 );
	} else {
		if( myVid != village_aid ) RB_setValue(GMcookieID + 'next', myVid);
		document.location.href='a2b.php';
	}
	return false;
}

function sendResourses( myVid ) {
	if( $g('target_select') ) {
		var arXY = id2xy( myVid );
		document.getElementsByName('x')[0].value = arXY[0];
		document.getElementsByName('y')[0].value = arXY[1];
		showDistanceIn( -1 );
	} else {
		if( RB.village_Dorf2[0] != 0 ) {
			if( myVid != village_aid ) RB_setValue(GMcookieID + 'next', myVid);
			document.location.href='build.php?id=' + RB.village_Dorf2[0];
		} else {
			document.location.href='build.php?z=' + myVid + '&gid=17';
		}
	}
	return false;
}

// 0-market, 1-barracks, 2-stable, 3-workshop, 4-میدان تمرین
function parseDorf2 () {
	var base = $g('village_map');
	if( !(base) ) return;
	var fl = false;
	var buildsID = ['g17','g19','g20','g21','g14'];
	var Rej = /class="building .(\d+) (\w+)"/gi;
	while ((bid = Rej.exec(base.innerHTML)) != null) {
		for( var i = 0 ; i < buildsID.length; i++ ) {
			if( bid[2] == buildsID[i] ) {
				var marketID = parseInt(bid[1])+18;
				if( marketID != RB.village_Dorf2[i] ) {
					RB.village_Dorf2[i] = marketID;
					fl = true;
				}
			}
		}
	}
	if( RB.village_Dorf2[4] > 0 ) { // search&save میدان تمرین
		var turF = $xf('//img[contains(@class,"g14")]','f',base).getAttribute('alt').split(' ');//.match(/\d+$/)[0];
		var tur = turF.pop();
		if( tur != RB.village_Var[1] ) {
			RB.village_Var[1] = tur;
			saveVCookie( 'VV', RB.village_Var );
		}
		var turD = turF.join(' ');
		if( turD != RB.dictionary[3] ) {
			RB.dictionary[3] = turD;
			saveCookie( 'Dict', 'dictionary' );
		}
	}
	var dictsFL = [['g17',7],['g19',8],['g20',9],['g21',10]];
	for( var i = 0 ; i < dictsFL.length; i++ ) {
		if( RB.dictFL[dictsFL[i][1]] == 0 && RB.village_Dorf2[i] > 0) {
			var turF = $xf('//img[contains(@class,"'+dictsFL[i][0]+'")]','f',base).getAttribute('alt').split(' ');//.match(/\d+$/)[0];
			turF.length = turF.length - 2;
			var turD = turF.join(' ');
			RB.dictionary[dictsFL[i][1]] = turD;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[dictsFL[i][1]] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
	if( RB.dictFL[6] == 0 ) {
		var turF = $xf('//img[contains(@class,"dx1 g16")]','f',base);
		if( turF ) {
			turF = turF.getAttribute('alt').split(' ');//.match(/\d+$/)[0];
			turF.length = turF.length - 2;
			var turD = turF.join(' ');
			RB.dictionary[6] = turD;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[6] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
	if( fl ) saveVCookie( 'Dorf2', RB.village_Dorf2 );
}

/************************* begin test zone ***************************/

RB.dSetup = [//	0	1	2	3	4	5	6	7	8	9
	/* 0 */	version,0,	0,	0,	1,	7,	1,	0,	3,	0,
	/* 1 */		2,	0,	1,	1,	1,	1,	1,	0,	1,	0,
			];
RB.Setup = RB.dSetup.slice();

function rbSetup() {
	// 0-type(Info,CheckBox,Text,SELect,SPan), 1-setupNum, 2-text, 3-ext
	var aRBS = [
		['I', 0, 'اطلاعات', ''],
//			['SP', 1, 'Script language', ''],
			['SEL', 2, 'دسته ی شما', ['رومی ها','توتن ها','گل ها']],
			['SEL', 3, 'سرعت مصنوعی', ['none','x1.5','x2','x3']],
			['SEL', 9, RB.dictionary[3], [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]],
		['I', 0, 'همه ی صفحات', ''],
			['CB', 7, "کشیده نشدن صفحه", 'اگر لیست روستاه پایین رفت'],
			['CB',14, "نمایش شمارش معکوس ساختمان و حمله", 'در لیست روستا ها'],
			['CB',15, "نمایش آیکون های ارسال منابع/سربازان", ''],
			['CB',18, "نمایش آیکون های ارسال پیام", ''],
			['CB',16, "نمایش آیکون های بزرگ", ''],
			['CB',13, "حالت پارانوئید", 'وظایف مخفی شود ، اگر تغیرات در سرور اسکریپت تراوین دریافت شد.'],
			['CB',17, "بازشدن خودکار متن ها", ''],
		['I', 0, 'نوار منابع', ''],
			['CB', 4, 'نمایش نوار منابع در پنجره', ''],
			['T', 6, 'قرمز (در ساعت)', ''],
			['T', 5, 'زرد (در ساعت)', ''],
		['I', 0, 'بازار', ''],
			['SEL', 8, 'فیلتر', ['خاموش','تنها ارزیابی','فقط خاموش','کامل']],
			['SEL', 11, 'شمارش معکوس روی دکمه ی ارسال', ['خاموش','روشن','سخت گیر']],
		['I', 0, 'اردوگاه و بازار', ''],
			['SEL', 10, 'دریافت اطلاعات منابع', ['خاموش','روشن','خلاصه']],
		['I', 0, 'لینک ها', ''],
			['SEL',12, "نمایش لیننک ها", ['خاموش','روشن','در پنجره']],
			['T', 'ln', 'ذخیره سازی لینک ها', ''],
		['I', 0, '', '']
	];

	function okTD() {
		var newTD = $e('TD',[['style','text-align:right']]);
		var newBTO = $ee('BUTTON','موافقم',[['onClick',jsNone]]);
		newBTO.addEventListener('click', setupSave, true);
		var newBTX = $ee('BUTTON','لغو',[['onClick',jsNone]]);
		newBTX.addEventListener('click', destroySetup, true);
		newTD.appendChild(newBTO);
		newTD.appendChild(newBTX);
		return newTD;
	}

	if( closeWindowN(0) ) return;
	setupD = $e('TABLE',[['id',allIDs[6]]]);
	var newTR = $ee('TR',$ee('TD','ورژن: ' + RB.Setup[0]));
	newTR.appendChild(okTD());
	setupD.appendChild(newTR);

	for( var i = 0; i < aRBS.length; i++ ) {
		if( aRBS[i][0] == 'I' ) {
			var newTt = $ee('SPAN',aRBS[i][2]);
			if( typeof aRBS[i][3] == 'string' && aRBS[i][3].length > 1 ) $at(newTt,[['title',aRBS[i][3]]]);
			var newTR = $ee('TR',$ee('TD',newTt,[['colspan','2'],['style','text-align:center']]));
		} else {
			var vN = isNaN(aRBS[i][1]) ? RB_getValue(GMcookieID + "ln", "") : RB.Setup[aRBS[i][1]];
			var newTt = $ee('SPAN',aRBS[i][2]);
			if( typeof aRBS[i][3] == 'string' && aRBS[i][3].length > 1 ) $at(newTt,[['title',aRBS[i][3]]]);
			var newTR = $ee('TR',$ee('TD',newTt));
			switch( aRBS[i][0] ) {
				case 'CB': var newO = $e('INPUT',[['type', 'CHECKBOX']]); if(vN == 1) $at(newO, [['checked', true]]); break;
				case 'T': var newO = $e('INPUT',[['type', 'TEXT'],['value',vN]]); break;
				case 'SEL': var newO = $e('SELECT');
					for( var j = 0; j < aRBS[i][3].length; j++ ) newO.options[j] = new Option(aRBS[i][3][j], j, false, false);
					newO.selected = vN; newO.value = parseInt(vN); break;
				case 'SP': var newO = $ee('SPAN',vN); break;
			}
			$at(newO, [['name', aRBS[i][1]]]);
			var newTD = $ee('TD', newO, [['class','RBVals']]);
			newTR.appendChild(newTD);
		}
		setupD.appendChild(newTR);
	}

	var newTR = $ee('TR',$c('&nbsp;'));
	newTR.appendChild(okTD());
	setupD.appendChild(newTR);

	windowID[0] = makeFloatD(setupD, 0);

	function setupSave() {
		var aS = $g(allIDs[6]).getElementsByTagName("SELECT");
		for (var i = 0; i < aS.length; i++) RB.Setup[parseInt(aS[i].name)] = aS[i].value;
		var aS = $g(allIDs[6]).getElementsByTagName("INPUT");
		for (var i = 0; i < aS.length; i++) {
			crtValue = aS[i].value;
			if (aS[i].type == 'checkbox') crtValue = (aS[i].checked == true ? '1' : '0');
			if( isNaN(aS[i].name) )
				RB_setValue(GMcookieID + aS[i].name, crtValue);
			else
				RB.Setup[parseInt(aS[i].name)] = crtValue;
		}
		saveCookie( 'RBSetup', 'Setup' );
		destroySetup();
		location.reload(true);
	}
	function destroySetup() {
		closeWindowN(0);
	}
}


function pageNoWrap() {
	var lf = $g(pageElem[0]);
	var mf = $g(pageElem[1]);
	var rf = $g(pageElem[2]);
	var mid = $g(pageElem[3]);
	mid.style.width = (lf.clientWidth + mf.clientWidth + rf.clientWidth + 15) + 'px';
}

function detectRace() {
	var Rej = new RegExp('(id=' + RB.village_Dorf2[1] + '|gid=19)');
	if( ! Rej.test(crtPath) ) return;
	var ofu = $xf('//img[contains(@class, "unit")]');
	if( ofu ) {
		var fu = Math.floor(parseInt(ofu.getAttribute('class').match(/\d+/)[0])/10);
		if( RB.Setup[2] != fu ) {
			RB.Setup[2] = fu;
			saveCookie( 'RBSetup', 'Setup' );
		}
	}
}

function parseSpieler() {
	var Rej = new RegExp('uid=' + userID);
	if( ! Rej.test(crtPath) ) return;
	var capitalS = $xf('//table[@id="villages"]/tbody/tr/td/span');
	var capital = capitalS.parentNode.firstChild.getAttribute('href').match(/d=(\d+)/)[1];
	if( RB.dictionary[0] != capital || RB.dictFL[1] == 0 ) {
		var ally = $xf('//table[@id="profile"]//table/tbody/tr','l').snapshotItem(2).innerHTML.match(/>(.+?):?</)[1];
		RB.dictionary[0] = capital;
		RB.dictionary[1] = ally;
		saveCookie( 'Dict', 'dictionary' );
		RB.dictFL[1] = 1;
		saveCookie( 'DictFL', 'dictFL' );
	}
}

function overviewAll () {
	if( closeWindowN(1) ) return;
	if( villages_count < 2 ) return;
	overviewD = $e('TABLE',[['id',allIDs[8]]]);
	var newTHead = $e('THEAD');
	var newTD = $e('TD',[['style','text-align:right'],['colspan',8]]);
	var newBTX = $ee('BUTTON','Close (X)',[['onClick',jsNone],['style','direction:ltr']]);
	newBTX.addEventListener('click', overviewClose, true);
	newTD.appendChild(newBTX);
	newTHead.appendChild($ee('TR',newTD));

	var newTR = $e('TR');
	var refreshImg = $e('IMG',[['src', img_refr],['title','refresh']]);
	refreshImg.addEventListener('click', refreshOview, true);
	newTR.appendChild($ee('TD', refreshImg));
	newTR.appendChild($ee('TD', $e('IMG',[['class', 'r1'],['src', 'img/x.gif']])));
	newTR.appendChild($ee('TD', $e('IMG',[['class', 'r2'],['src', 'img/x.gif']])));
	newTR.appendChild($ee('TD', $e('IMG',[['class', 'r3'],['src', 'img/x.gif']])));
	newTR.appendChild($ee('TD','&nbsp;'));
	newTR.appendChild($ee('TD', $e('IMG',[['class', 'r4'],['src', 'img/x.gif']])));
	newTR.appendChild($ee('TD','&nbsp;'));
	newTR.appendChild($ee('TD', $e('IMG',[['class', 'r5'],['src', 'img/x.gif']])));
	newTHead.appendChild(newTR);

	overviewD.appendChild(newTHead);

	var newTBody = $e('TBODY');
	var t = 0;
	var nowTime = Math.round((new Date().getTime())/1000);
	var vLinks = $xf('//table[@id="vlist"]//div/a[contains(@href, "newdid")]','l');
	for ( var vn = 0; vn < vLinks.snapshotLength; vn++ ) {
		var vName = vLinks.snapshotItem(vn).cloneNode(true);
		var newTR = $ee('TR',$ee('TD',vName));
		loadVCookie('vPPH', 'village_PPH', villages_id[vn]);

		var minLeft = Number.POSITIVE_INFINITY;
		for( var i = 0; i < 4; i++ ) {
			var deltaTime = RB.village_PPH[12] > 0 ? nowTime - parseInt(RB.village_PPH[12]): 0;
			var nowResInV = Math.round(RB.village_PPH[i]/3600 * deltaTime + RB.village_PPH[i+4]);
			if( nowResInV > RB.village_PPH[i+8] ) nowResInV = RB.village_PPH[i+8];
			if( nowResInV < 0 ) nowResInV = 0;
			var secLeft = RB.village_PPH[i] > 0 ? Math.round((RB.village_PPH[i+8] - nowResInV) / (RB.village_PPH[i]/3600)) : Math.round( nowResInV / (RB.village_PPH[i]/3600));
			if( secLeft < minLeft ) minLeft = secLeft;
			var nowResInVP = Math.round(nowResInV / RB.village_PPH[i+8]*100);
			var clr;
			if( secLeft < parseFloat(RB.Setup[6])*3600) {
				clr = 3;
			} else if ( secLeft < parseFloat(RB.Setup[5])*3600) {
				clr = 2;
			} else {
				clr = 1;
			}
			var newPval = $ee('DIV',nowResInVP+'%',[['class',allIDs[10]+clr]]);
			newPval.setAttribute("style", "width: " + Math.round(nowResInVP/2) + "px;");
			newTR.appendChild($ee('TD',newPval,[['class',allIDs[10]]]));
			if( i > 1 ) {
				timerOv[t] = new Object();
				timerOv[t].time = minLeft;
//				timerOv[t].obj = $c(formatTime(minLeft,0),[['class',allIDs[17]]]);
				timerOv[t].obj = $eT('TD', minLeft, 0, [['class',allIDs[17]]]);
				timerOv[t].dir = RB.village_PPH[i] > 0 ? -1: 1;
				if( Math.abs(minLeft) < 600 ) timerOv[t].obj.setAttribute('style','text-decoration:blink;');
				newTR.appendChild(timerOv[t++].obj);
				minLeft = Number.POSITIVE_INFINITY;
			}
		}
		newTR.appendChild($c(RB.village_PPH[3],[['style','text-align:right']]));
		newTBody.appendChild(newTR);
	}
	overviewD.appendChild(newTBody);

	windowID[1] = makeFloatD(overviewD, 2);

	function overviewClose () {
		timerOv.length = 0;
		closeWindowN(1);
	}
	function refreshOview () {
		if( (parseInt(RB.overview[1]) + 900) > nowTime ) return;
		RB.overview[0] = 0;
		RB.overview[1] = crtPath.split("?")[0] + clearAntibot( linkVSwitch[village_aNum] );
		saveCookie('OV', 'overview');
		document.location.href='http://' + crtName + '/dorf1.php';
	}
}

function clearAntibot ( oldURL ) {
	var clearURL = oldURL.replace(/&c=[\w]{6,6}/,'');
	return clearURL;
}

function showLinks () {
	var flKarte = /karte.+?[?&]d=.+c=/i.test(crtPath) ? true: false;

	var ln_cookie = RB_getValue(GMcookieID + "ln", "");
	var links = ln_cookie.split("@@_");
	links.splice((links.length - 1), 1);

	rbLinks = $e('TABLE',[['id',allIDs[9]]]);
	var newTHead = $e('THEAD');
	var newTR = $e('TR');
	if( flKarte ) {
		var newA = $a('(+)',[['href',jsVoid],['title','add current'],['style','color:red;']]);
		newA.addEventListener('click', addLink, true);
		newTR.appendChild($ee('TD',newA));
	}
	var newTD = $ee('TD','لینک ها:',[['colspan',2]]);
	newTR.appendChild(newTD);
	newTHead.appendChild(newTR);
	rbLinks.appendChild(newTHead);

	var newTBody = $e('TBODY');
	for( var i = 0; i < links.length; i++ ) {
		var oneLink = links[i].split("\/@_");
		var tVId = parseInt(oneLink[0].match(/d=(\d+)/)[1]);
		var newTR = $e('TR');
		if( flKarte ) {
			var newA = $ee('A',$e('IMG',[['src',img_del]]),[['href',jsVoid],['title','delete']]);
			newA.addEventListener('click', function(x) { return function() { removeLink(x); }}(i), false);
			var newTD = $ee('TD',newA);
			var newA = $ee('A',$e('IMG',[['src',img_edit]]),[['href',jsVoid],['title','edit']]);
			newA.addEventListener('click', function(x) { return function() { editLink(x); }}(i), false);
			newTD.appendChild(newA);
			newTR.appendChild(newTD);
		}
		var newA = $a(oneLink[1],[['href','/karte.php?'+oneLink[0]]]);
		distanceTooltip(newA,0);
		var newTD = $ee('TD', newA);
		newTR.appendChild(newTD);
		var newTD = $ee('TD',addARLinks(tVId,1));
		newTR.appendChild(newTD);
		newTBody.appendChild(newTR);
	}
	rbLinks.appendChild(newTBody);

	if( RB.Setup[12] == 1 ) {
		var linksID = allIDs[9]+'F';
		$g(pageElem[2]).appendChild($ee('P',rbLinks,[['id',linksID]]));
	} else {
		var linksID = makeFloatD(rbLinks, 3);
	}

	function saveLink () {
		var newCL = '';
		for( var i = 0; i < links.length; i++ )
			if( /d=.+c=/i.test(links[i]) ) newCL += links[i] + '@@_';
		RB_setValue(GMcookieID + "ln", newCL);
		$g(linksID).parentNode.removeChild($g(linksID));
		showLinks();
	}
	function addLink () {
		var newLink = crtPath.match(/[?&](d=.*)$/i)[1];
		var newName = $g(pageElem[1]).getElementsByTagName('h1')[0].innerHTML.replace(/<.+?>/g, "").replace(/&.+?;/g, " ");
		newName = prompt('link name', newName);
		if( newName == null ) return;
		var newOneLink = newLink + "\/@_" + newName;
		links.push(newOneLink);
		saveLink();
	}
	function removeLink ( num ) {
		if( ! confirm('delete link: '+(links[num].split("\/@_")[1])+' ?') ) return;
		links.splice(num, 1);
		saveLink();
	}
	function editLink ( num ) {
		var oneLink = links[num].split("\/@_");
		var newName = prompt('link name', oneLink[1]);
		if( newName == null ) return;
		links[num] = oneLink[0] + "\/@_" + newName;
		saveLink();
	}
}

function detectNameAttaker() {
	var tmenu = $g('textmenu');
	if( ! tmenu ) return;
	var nameLink = $a('???',[['href',jsVoid]]);
	nameLink.addEventListener('click', prepareGetAttakers, false);
	var newSP = $ee('SPAN',$t(' | '));
	newSP.appendChild(nameLink);
	tmenu.appendChild(newSP);

	var ttable = [];
	var thref = [];
	var nameCache = [];
	var linkCache = [];
	function nameAttaker( num ) {
		var tname = nameCache[thref[num]];
		var tlink = linkCache[thref[num]];
		if( ! tname ){
			var res = httpGet(thref[num]);
			res = res.match(/<td><a href=\"(spieler\.php.+?)\">(.+)<\/a/i);
			tlink = res[1];
			tname = res[2];
			nameCache[thref[num]] = tname;
			linkCache[thref[num]] = tlink;
		}
		var tTD = $xf('tbody[@class="units"]/tr/th', 'f', ttable[num]);
		tTD.appendChild($a(tname,[['href',tlink]]));
	}
	function prepareGetAttakers() {
		var allIn = $xf('//table[tbody/tr/td/div[@class="in"]]','l');
		var hrefCache = [];
		var curTO = 0;
		for( var i = 0; i < allIn.snapshotLength; i++ ) {
			ttable[i] = allIn.snapshotItem(i);
			thref[i] = $xf('thead/tr/td[@class="role"]/a', 'f', ttable[i]).getAttribute('href');
			hrefCache[thref[i]] = true;
			curTO += hrefCache[thref[i]] ? 1: getRandom(500,2000);
			setTimeout(function(x) { return function() { nameAttaker(x); }}(i), curTO);
		}
		newSP.parentNode.removeChild(newSP);
	}
}

function userActivityInfo() {
	// Get server id
	var srv = document.title.substring(8);
	var uID = crtPath.match(/uid=(\d+)/)[1];
	var cont = $g(pageElem[1]);
	if( ! cont ) return;
	// Call trav-utils
	var newD = $ee('DIV',$e('IMG',[['src',img_stat],['style','float:left;padding:0px 15px;']]),[['style','float:left;']]);
	newD.appendChild($a('travian-utils.com',[['href','http://travian-utils.com/?s='+srv+'&idu='+uID],['target','_blank']]));
	newD.appendChild($e('br'));
	newD.appendChild($a('travian.ws',[['href','http://travian.ws/analyser.pl?s='+srv+'&uid='+uID],['target','_blank']]));
	var newP = $ee('P',newD,[['id',allIDs[0]]]);
	cont.appendChild(newP);
}

function viewMessageIW() {
	var allRows = $xf('//table//tr[td[@class="sel"]]','l');
	for( var i = 0; i < allRows.snapshotLength; i++ ) {
		var td = allRows.snapshotItem(i).getElementsByTagName('TD')[1];
		var newImg = $e('IMG',[['src',img_view]]);
		newImg.addEventListener('click', function(x) { return function() { selectMessage(x); }}(i), false);
		td.insertBefore(newImg, td.firstChild);
	}

	function selectMessage (num) {
		var allRows = $xf('//table//tr[td[@class="sel"]]','l');
		var tds = allRows.snapshotItem(num).getElementsByTagName('TD');
		tds[0].firstChild.setAttribute('checked',true);
		var aLink = tds[1].getElementsByTagName('A')[0].getAttribute('href');

		var tV = /berichte/.test(aLink) ? 1: 0;
		viewMessageIWDisplay( aLink, tV );
	}
}

function viewMessageIWClose() {
	closeWindowN(4);
}
function viewMessageIWDisplay( aLink, tV ) {
	var viewPref = [
		['//form[@action="nachrichten.php"]','messages','width:440px;background-color:white;padding:5px;text-align:left;'],
		['//table[@id="report_surround"]','reports','width:500px;background-color:white;padding:5px;']];

	ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
		viewMessageIWClose();
		var ad = ajaxNDIV(ajaxResp);
		if( ! flFirefox ) $g(pageElem[0]).appendChild(ad);
		var aV = $xf(viewPref[tV][0], 'f', ad);
		ad = null;
		if (aV) {
			var newD = $ee('DIV',aV,[['class',viewPref[tV][1]],['style',viewPref[tV][2]]]);
			var newBTX = $ee('BUTTON','Close (X)',[['onClick',jsNone],['style','margin:5px 5px 0px;direction:ltr']]);
			newBTX.addEventListener('click', viewMessageIWClose, true);
			newD.appendChild($ee('DIV',newBTX,[['style','text-align:center;']]));
			windowID[4] = makeFloatD(newD, 4);
			if( tV == 1 ) addQuickLinks(); else convertCoordsInMessagesToLinks();
			addRefIGM( windowID[4] );
		}
	}, dummy);
}

function viewMessageIWK() {
	var allRows = $xf('//table//tr/td[a[contains(@href, "berichte.php?id=")]]','l');
	for( var i = 0; i < allRows.snapshotLength; i++ ) {
		var td = allRows.snapshotItem(i);
		var aLink = td.getElementsByTagName('A')[0].getAttribute('href');
		var newImg = $e('IMG',[['src',img_view]]);
		newImg.addEventListener('click', function(x) { return function() { selectMessage(x); }}(aLink), false);
		td.insertBefore(newImg, td.firstChild);
	}

	function selectMessage (aLink) {
		viewMessageIWDisplay( aLink, 1 );
	}
}

function culturePoints(){
	var aX = $xf('//div[@id="'+ pageElem[1] +'"]//b', 'l');
	if (aX.snapshotLength != 4) return;
	//production CP in all villages
	var prodCP = toNumber(aX.snapshotItem(1).innerHTML);
	//Current no of CP
	var curCP = toNumber(aX.snapshotItem(2).innerHTML);
	//CP needed to create a new village
	var nextCP = toNumber(aX.snapshotItem(3).innerHTML);

	var classic = false;
	if( villages2cp(villages_count, classic) != nextCP ) {
		classic = true;
	}

	var newTABLE = $e('TABLE',[['class',allIDs[7]],['style','margin:2px 25px;']]);
	var newTR = $ee('TR',$c('#'));
	newTR.appendChild($c($g('textmenu').getElementsByTagName('a')[1].innerHTML,[['colspan',2]]));
	newTR.appendChild($c(RB.dictionary[4]));
	newTABLE.appendChild(newTR);

	var nm = villages_count;
	for( var i = 0; i < 2; nm++ ) {
		var nmC = villages2cp(nm, classic);
		if( nmC > curCP ) i++;
		var newTR = $ee('TR',$c((nm+1)));
		newTR.appendChild($c(nmC));
		var tCP = nmC > curCP ? '('+ (curCP - nmC) +')': '+';
		newTR.appendChild($c(tCP));
		tCP = nmC > curCP ? formatTime(Math.round((nmC-curCP)/prodCP*86400),1): '--:--';
		newTR.appendChild($c(tCP));
		newTABLE.appendChild(newTR);
	}
	$g(pageElem[1]).appendChild(newTABLE);

	function villages2cp( noVil, classic ) {
		// formula from TB3, from fr3nchlover
		var rV = 0;
		if( classic )
			rV = Math.round(2 * Math.pow(noVil, 2)*10) * 100;
		else
			if( /speed/i.test(crtPath) )
				rV = Math.round(1.6/3 * Math.pow(noVil, 2.3)*10) * 100;
			else if( /x2/i.test(crtPath) )
				rV = Math.round(1.6/2 * Math.pow(noVil, 2.3)*10) * 100;
			else
				rV = Math.round(1.6 * Math.pow(noVil, 2.3)) * 1000;
		return rV;
	};
}

function migrateStorage () {
	if( useDOMs ) {
		var RCookie = GM_getValue(GMcookieID + 'vPPH','');
		if( RCookie.length > 0 ) {
			var allCookies = ['vPPH','mf','next','Dorf1','Dorf2','RBSetup','xy','VV','OV','Mem','Dict','DictFL','ln','src'];
			for( var i = 0; i< allCookies.length; i++ ) {
				RCookie = GM_getValue(GMcookieID + allCookies[i],'');
				if( RCookie.length > 0 )
					window.localStorage.setItem(GMcookieID + allCookies[i], RCookie);
				GM_deleteValue(GMcookieID + allCookies[i]);
			}
		}
	}
}

function testScripts () {
	if( RB.Setup[13] == 0 ) return false;
	var oldScrC = RB_getValue(GMcookieID + "src", "0");
	var oldSRC = oldScrC.split('@@');
	var t=1;
	var allSRC = document.getElementsByTagName('script');
	var URLs = '';
	var aS = false;
	var newSRC = [];
	for( var i = 0; i < allSRC.length; i++ ) {
		var sURL = allSRC[i].getAttribute('src');
		if( sURL != null ) {
			if( sURL != oldSRC[t] ) aS = true;
			newSRC[t++] = sURL;
		}
		URLs += allSRC[i].getAttribute('src') + '\n';
	}
	if( parseInt(oldSRC[0]) != t-1 ) aS = true;
	if( aS ) {
		var newSrcC = t-1;
		for( var i = 1; i < t; i++ ) {
			newSrcC += '@@' + newSRC[i];
		}
		RB_setValue(GMcookieID + "src", newSrcC);
//		alert( allSRC.length+' ('+oldSRC[0]+'/'+(t-1)+')  ||| '+ URLs );
	}
	return aS;
}

function parseDorf1 () {
	if( RB.Setup[14] == 0 ) return;
	parseBuilds();
	if( /dorf1.php/.test(crtPath) ) {
		parseAttack();
//		loadVCookie('Dorf12','village_dorf12',village_aid,1);
//		parseTroops();
	}

	function parseBuilds() {
		loadVCookie('Dorf1','village_dorf1',village_aid,1);
		var fl = false;
		var newCookie = [0];
		var t = 1;
		var move = $g('building_contract');
		if( ! move ) {
			if( RB.village_dorf1[0] != 0 ) fl = true;
		} else {
			var descr = move.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
			for( var i = 0; i < descr.length; i++ ) {
				newCookie[0]++;
				var td = descr[i].getElementsByTagName('td');
				newCookie[t++] = td[1].innerHTML;
				if( td.length < 4 ) {
					newCookie[t++] = 0;
					newCookie[t++] = '';
				} else {
					newCookie[t++] = Math.round(RunTime[0]/1000) + toSeconds(td[2].innerHTML.match(/\d+:\d\d:\d\d/)[0]);
					newCookie[t++] = td[3].innerHTML.replace(/<.+?>/g,'');
				}
			}
			fl = true;
		}
		if( fl ) saveVCookie('Dorf1',newCookie,1);
	}
	function parseAttack() {
		loadVCookie('Dorf11','village_dorf11',village_aid,1);
		var fl = RB.village_dorf11[0] == 0 ? false: true;
		var newCookie = [0];
		var t = 1;
		var move = $g('movements');
		var descr = move.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
		for( var i = 0; i < descr.length; i++ ) {
			var td = descr[i].getElementsByTagName('td');
			var aimg = td[0].getElementsByTagName('img')[0];
			if( ! aimg ) break;
			newCookie[0]++;
			newCookie[t++] = aimg.getAttribute('class');
			newCookie[t++] = Math.round(RunTime[0]/1000) + toSeconds(td[1].innerHTML.match(/\d+:\d\d:\d\d/)[0]);
			newCookie[t++] = td[1].getElementsByClassName('mov')[0].innerHTML.replace(/<.+?>/g,'');
			fl = true;
		}
		if( fl ) saveVCookie('Dorf11',newCookie,1);
	}
}

function showTooltipBuild ( tb ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	for( var i = 0; i < tb[0]; i++ ) {
		var newTR = $ee('TR',$ee('TD',tb[i*3+1]));
		newTR.appendChild($ee('TD',tb[i*3+3]));
		newTABLE.appendChild(newTR);
	}
	makeTooltip(newTABLE);
}
function showTooltipAttack ( tb ) {
	var newTABLE = $e('TABLE',[['class',allIDs[7]]]);
	lastTimerB = timerB.length;
	var t = lastTimerB;
	for( var i = 0; i < tb[0]; i++ ) {
		var newTR = $ee('TR',$ee('TD',$e('IMG',[['src','img/x.gif'],['class',tb[i*3+1]]])));
		var lrt = /2/.test(tb[i*3+1]) ? '&laquo;': '&raquo;';
		newTR.appendChild($c(lrt));
		newTR.appendChild($ee('TD',tb[i*3+3]));
		var htf = tb[i*3+2] - Math.round((new Date().getTime())/1000);
		if( htf > 0 ) {
			timerB[t] = new Object();
			timerB[t].time = htf;
			timerB[t].obj = $ee('TD',formatTime(htf, 0));
			newTR.appendChild(timerB[t++].obj);
		} else newTR.appendChild($c('--:--'));
		newTABLE.appendChild(newTR);
	}
	makeTooltip(newTABLE);
}

function showDorf1 () {
	var vlist = $g('vlist');
	if( ! vlist ) return;
	var t = 0;
	villages = vlist.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
	for( var i = 0; i < villages_id.length; i++ ) {
		loadVCookie('Dorf1','village_dorf1',villages_id[i],1);
		var newTD = $c('');
		if( RB.village_dorf1[0] > 0 ) {
			var dTime = RB.village_dorf1[2] - Math.round(RunTime[0]/1000);
			var color = dTime < 0 ? 'red': 'black';
			if( dTime < 0 ) dTime = 0;
			timerB3[t] = new Object();
			timerB3[t].time = dTime;
			timerB3[t].obj = $ee('SPAN',formatTime(dTime, 3),[['style','margin:0px 10px;color:'+color+';']]);
			var tb = RB.village_dorf1.slice();
			timerB3[t].obj.addEventListener("mouseover", function(x) { return function() { showTooltipBuild(x); }}(tb), false);
			timerB3[t].obj.addEventListener("mouseout", removeTooltip, false);
			newTD.appendChild(timerB3[t++].obj);
		} else newTD.appendChild($ee('SPAN','--:--',[['style','margin:0px 10px;']]));

		loadVCookie('Dorf11','village_dorf11',villages_id[i],1);
		if( RB.village_dorf11[0] > 0 ) {
			var newdid = linkVSwitch[i].match(/newdid=\d+/i)[0];
			var newAI = $a('',[['href','http://' + crtName + '/build.php?'+newdid+'&gid=16&id=39']]);
			for( var j = 0; j < RB.village_dorf11[0]; j++ ) {
				newAI.appendChild($e('IMG',[['src','img/x.gif'],['class',RB.village_dorf11[j*3+1]]]));
			}
			var tb = RB.village_dorf11.slice();
			newAI.addEventListener("mouseover", function(x) { return function() { showTooltipAttack(x); }}(tb), false);
			newAI.addEventListener("mouseout", removeTooltip, false);
			newTD.appendChild(newAI);
		}
		villages[i].appendChild(newTD);
	}
	vlist.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].appendChild($c(''));
}

function addSpeedAndRTSend () {
	if( /&t=1(&|$)/.test(crtPath) ) return;
	var mLinks = $xf('//div[@id="'+pageElem[1]+'"]//a[contains(@href, "karte.php?")]', 'r');
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		distanceTooltip(mLinks.snapshotItem(j),1);
		sendResTropAdd(mLinks.snapshotItem(j), 1);
	}
}

function bigQuickLinks () {
	var bigIcon = [ // [type (true-id, false-ref), value, additional, img_ID, Dict, Dict additionnal, Background]
		[false, 'build.php?id=39', '', 0, 6, 0, 0], // RP
		[true, 3, '', 3, 10, 0, 1], // Workshop
		[true, 0, '', 4, 7, 0, 1], // Market
		[false, 'allianz.php', '', 6, 1, 0, 2], // Ally
		[true, 1, '', 1, 8, 0, 3], // Barrack
		[true, 2, '', 2, 9, 0, 4], // Stable
		[true, 0, '&t=1', 5, 7, 11, 4], // Market in
		[false, 'allianz.php?s=3', '', 7, 1, 12, 5], // Ally attack
	];
	//icons 0-RP, 1-barrack, 2-stable, 3-workshop, 4-market, 5-market_in, 6-ally, 7-ally_attack
	//dorf2 0-market, 1-barracks, 2-stable, 3-workshop, 4-Tournament Square
	var insPoint = $g('plus');
	$at(insPoint,[['style','margin-left:10px']]);
	$at($g('mtop'),[['style','width:600px;']]);
	var newT = $e('TABLE',[['style','width:auto;background-color:transparent;float:left;border-collapse:collapse;']]);
	var t = 0;
	var tdStyle = 'border:1px solid silver;background-color:white;';
	for( var i = 0; i < 2; i++) {
		var newR = $e('TR');
		for( var j = 0; j < 4; j++ ) {
			var tt = bigIcon[t][4] > 0 ? RB.dictionary[bigIcon[t][4]] : '';
			if( bigIcon[t][5] > 0 ) tt += ', ' + RB.dictionary[bigIcon[t][5]];
			if( bigIcon[t][0] ) {
				if( RB.village_Dorf2[bigIcon[t][1]] != 0 )
					var newD = $ee('TD',$ee('A',$e('IMG',[['src',img_bigIcon[bigIcon[t][3]]]]),[['href','build.php?id='+RB.village_Dorf2[bigIcon[t][1]]+bigIcon[t][2]],['title',tt]]),[['style',tdStyle]]);
				else
					var newD = $c('');
			} else
				var newD = $ee('TD',$ee('A',$e('IMG',[['src',img_bigIcon[bigIcon[t][3]]]]),[['href',bigIcon[t][1]],['title',tt]]),[['style',tdStyle]]);
			newR.appendChild(newD);
			t++;
		}
		newT.appendChild(newR);
	}
	insPoint.parentNode.insertBefore(newT, insPoint);
}

function resourceBalance () {
	var uID = crtPath.match(/uid=(\d+)/)[1];
	var cont = $g(pageElem[1]);
	if( ! cont ) return;
	var linksP = $g(allIDs[0]);
	// Call trav-help
	var newP = $ee('P',$e('IMG',[['src',img_bigIcon[4]],['style','float:left;padding:0px 15px;']]));
	var newA = $a(RB.dictionary[5],[['href',jsVoid]]);
	newA.addEventListener('click', resourceBalanceShow, false);
	newP.appendChild(newA);
	if( linksP ) linksP.appendChild(newP);
		else cont.appendChild(newP);

	function resourceBalanceShow () {
		newA.removeEventListener('click', resourceBalanceShow, false);
		var aLink = 'http://'+crtName+'/manual.php?typ=7&s='+uID;
		ajaxRequest(aLink, 'GET', null, function(ajaxResp) {
			var ad = ajaxNDIV(ajaxResp);
			var tbs = ad.getElementsByTagName('TABLE');
			if( ! tbs ) return;
			if( RB.dictFL[5] == 0 ) {
				var h1 = ad.getElementsByTagName('h1');
				if( h1 ) {
					var resDict = h1[0].innerHTML.replace(/<.+?>/g,'');
					if( RB.dictionary[5] != resDict ) {
						RB.dictionary[5] = resDict;
						saveCookie( 'Dict', 'dictionary' );
						RB.dictFL[5] = 1;
						saveCookie( 'DictFL', 'dictFL' );
					}
				}
			}
			cont.appendChild($e('BR'));
			var newPP = $e('P');
			newPP.appendChild(tbs[1]);
			if( uID != userID ) {
				newPP.appendChild(tbs[0]);
			}
			cont.appendChild(newPP);
		}, dummy);
	}
}

var onKarteFL = false;
function distanceTooltipGenK(e) {
	var hr = this;
	onKarteFL = true;
	setTimeout(function() { distanceTooltipGenK2( hr ) }, 50);
}
function distanceTooltipGenK2( hr ) {
	removeTooltipK ();
	var dTTK = showAllTTime(0, hr.getAttribute('href').match(/[&\?][zd]=(\d+)/)[1], RB.village_Var[1]);
	$at(dTTK, [['style','background-color:white;']]); // #FFFFE0;
	windowID[2] = makeFloat( dTTK, 670, 130);
	onKarteFL = false;
}
function removeTooltipK () {
	var ttk = $g(windowID[2]);
	if( ttk ) {
		ttk.parentNode.removeChild(ttk);
		timerP.length = lastTimerP[0];
	}
}
function removeTooltipK2 () {
	onKarteFL = false;
	setTimeout(function(){ if( ! onKarteFL ) removeTooltipK(); }, 50);
}
function karteDistance () {
	var cont = $g(pageElem[1]);
	var allCells = cont.getElementsByTagName('AREA');
	if( ! allCells ) alert(222);
	for( var i = 0; i < allCells.length; i++ ) {
		if( /karte.php\?d=/.test(allCells[i].getAttribute('href')) ) {
			allCells[i].addEventListener("mouseover", distanceTooltipGenK, false);
			allCells[i].addEventListener("mouseout", removeTooltipK2, false);
		}
	}
}

function rbNotes () {
	if( closeWindowN(3) ) return;
	var nText = RB_getValue('notes','');
	var newNB = $e('TABLE');
	var textNB = $ee('TEXTAREA',nText,[['cols','40'],['rows','15'],['style', 'background-image: url('+img_underline+');']])
	newNB.appendChild($ee('TR',$ee('TD',textNB)));
	var saveB = $e('IMG',[['src',img_save]]);
	saveB.addEventListener('click', saveNotes, false);
	newNB.appendChild($ee('TR',$ee('TD',saveB)));
	windowID[3] = makeFloatD( newNB, 5 );

	function saveNotes () {
		RB_setValue('notes',textNB.value);
		alert( 'saved' );
//		WriteToFile( textNB.value );
//		loadFromServer();
//		makeFloat(loadFromServer(),10,10);
	}
}

function WriteToFile(sText){
	with(document){
		ir=createElement('iframe');
		ir.location='about:blank';
		ir.style.display='none';
		body.appendChild(ir);
		with(ir.contentWindow.document){
			location='data:application/octet-stream,'+encodeURIComponent(sText);
		}
	}
	setTimeout(function(){body.removeChild(ir)},1000);
}

function loadFromServer() {
//	alert("test");
}

//http://forum.hivext.ru/podkljuchenie-servisov/javascript-krossdomenye-zaprosy-k-servisam/?action=printpage
// var url = 'http://';
// var params = document.getElementById('form-upload-file');
// HttpRequest.post(url, params, function(response) {
//        alert(response.result); // Показать ответ метода.
// });
// var url = 'http://';
// var params = {
// 	appid : '1234567890ABCDEF',
// 	email : 'guest@guest.com',
// 	password : 'guest'
// };
// HttpRequest.get(url, params, function(response) {
//         alert(response.result); // Показать ответ метода.
// });

var HttpRequest = {
	//
	// Метод post (базируется на window.name транспорте).
	//
	post : function(url, params, callback) {
		function add2body(html) {
			var b = document.body;
			var div = document.createElement('div');
			div.innerHTML = html.join ? html.join('') : html;
			while (div.childNodes.length > 0) b.appendChild(div.childNodes[0]);
			return b.lastChild;
		}
		var form, input, doc = document, fid = 'fid' + parseInt(Math.random()*1000000),
  			html = '<iframe style="display:none" onload="HttpRequest._onLoad(this)"'
		  		+ ' src="javascript:true" id="' + fid + '" name="' + fid + '"></iframe>';
		var frame = add2body(html);
		HttpRequest.callback[fid] = callback;
		if(params) {
			if(params.nodeType) {
				form = params;
			} else {
				form = document.createElement('form');
				for(var name in params) {
					var value = params[name];
					input = document.createElement('input');
					input.name = name;
					input.value = value.replace(/\n/g, "");
					form.appendChild(input);
				}
			}
			if(form) {
				form.method = 'post';
				form.action = url;
				form.target = fid;
				form.acceptCharset = 'utf-8';
				form.style.display = 'none';
				document.body.appendChild(form);
				form.submit();
				form.parentNode.removeChild(form);
			}
		} else {
			frame.src = url;
			if(frame.contentWindow) {
				frame.contentWindow.location.replace(url);
			}
		}
	},

	callback : {},

	_getData : function(frame) {
		if(frame.abort) return;
		var callback = HttpRequest.callback[frame.id];
		if(callback) {
			try { callback(eval("(" + frame.contentWindow.name + ")")); } catch (ex) {}
			delete HttpRequest.callback[frame.id];
		}
		setTimeout(function() { frame.parentNode.removeChild(frame); }, 0);
	},

	_onLoad : function(frame) {
		var blank = 'about:blank',
			wnd = frame.contentWindow;
		try {
        	if (!frame.state && (wnd.location == blank
				|| wnd.location == 'javascript:true')) return;
		} catch (ex) {}
		if(frame.state) {
			return this._getData(frame);
		} else wnd.location = blank;
		frame.state = 1;
	}
}


function getIframeDocument(iframeNode) {
  if (iframeNode.contentDocument) return iframeNode.contentDocument
  if (iframeNode.contentWindow) return iframeNode.contentWindow.document
  return iframeNode.document
}
function setIframeSrc(iframeNode, src) {
  getIframeDocument(iframeNode).location.replace(src)
}

function addRefIGM ( idBlock ) {
	if( RB.Setup[18] == 0 ) return;
	var idB = idBlock || pageElem[1];
	var mLinks = $xf('//div[@id="'+ idB +'"]//a[contains(@href, "spieler.php?uid=")]', 'r');
	for( var j = 0; j < mLinks.snapshotLength; j++ ) {
		var al = mLinks.snapshotItem(j);
		var uid = al.getAttribute('href').match(/uid=(\d+)/)[1];
		if( uid != userID ) {
			al.parentNode.insertBefore($ee('A',$e('IMG',[['src',img_igm],['style','padding:0px 3px;']]),[['href','nachrichten.php?t=1&id='+uid]]),  al.nextSibling);
		}
	}
}

function getRandom ( x, y ) {
	return x+Math.round(Math.random()*y);
}

function parseAlly () {
	if( RB.dictFL[12] == 0 ) {
		var tm = $g('textmenu');
		if( tm ) {
			RB.dictionary[12] = tm.getElementsByTagName('A')[3].innerHTML;
			saveCookie( 'Dict', 'dictionary' );
			RB.dictFL[12] = 1;
			saveCookie( 'DictFL', 'dictFL' );
		}
	}
}

function addSpeedRTSendMessageInLLinks() {
	var llinks = $g(pageElem[4]);
	if( ! llinks ) return;
	if( RB.Setup[15] == 1 ) {
		var mLinks = $xf('tbody//a[contains(@href, "karte.php?")]', 'r', llinks);
		for( var j = 0; j < mLinks.snapshotLength; j++ ) {
			distanceTooltip(mLinks.snapshotItem(j),1);
			sendResTropAdd(mLinks.snapshotItem(j), 1);
		}
	}
	if( RB.Setup[15] == 1 ) {
		var mLinks = $xf('tbody//a[contains(@href, "spieler.php?uid=")]', 'r', llinks);
		for( var j = 0; j < mLinks.snapshotLength; j++ ) {
			var al = mLinks.snapshotItem(j);
			var uid = al.getAttribute('href').match(/uid=(\d+)/)[1];
			al.appendChild($ee('A',$e('IMG',[['src',img_igm],['style','padding:0px 3px;']]),[['href','nachrichten.php?t=1&id='+uid]]));
		}
	}
}

/************************** end test zone ****************************/

//function start_script() {
	if( ! getResources() ) return;
	var userID = getUserID();
	GMcookieID = crtName + '-' + userID + '-';
	migrateStorage();
	loadCookie ( 'RBSetup', 'Setup' );
	var paranoidMode = testScripts();

	vlist_addButtons();
	loadCookie ( 'Dict', 'dictionary' );

	if( villages_id[0] == 0 ) if( RB.dictionary[0] == 0 ) {
		document.location.href = 'http://' + crtName + '/spieler.php?uid=' + userID;
	} else {
		villages_id[0] = parseInt(RB.dictionary[0]);
		village_aid = villages_id[0];
	}
	loadAllCookie();

	//save "produce per hour"
	saveVCookie('vPPH', income.concat(resNow).concat(fullRes).concat(Math.round(RunTime[0]/1000)));
	if( /dorf[12].php/.test(crtPath) ) parseDorf1();

	if( RB.overview[0] > -1 ) {
		var i =  parseInt(RB.overview[0]) +1;
		if( i > villages_count ) {
			RB.overview[0] = -2;
			saveCookie('OV', 'overview');
			setTimeout( function() { document.location.href = RB.overview[1]; }, getRandom(500,2000));
		} else {
			RB.overview[0] = i;
			saveCookie('OV', 'overview');
			var newdid = linkVSwitch[i-1].match(/newdid=\d+/i)[0];
			setTimeout( function() { document.location.href = 'http://'+ crtName +'/dorf1.php?'+ newdid; }, getRandom(500,2000));
		}
		return;
	} else if( RB.overview[0] == -2 ) {
		RB.overview[0] = -1;
		RB.overview[1] = Math.round(RunTime[0]/1000);
		saveCookie('OV', 'overview');
		overviewAll();
	}

	if( paranoidMode ) return;
	progressbar_init();

	if( /dorf2.php/.test(crtPath) ) parseDorf2();
	if( /(?:nachrichten|berichte).php/.test(crtPath) ) { deleteButtonAdd(); viewMessageIW(); }
	if( /nachrichten.php\?.*id=/.test(crtPath) ) convertCoordsInMessagesToLinks();
	if( /karte.php\?(.*&)?[zd]=/.test(crtPath) ) distanceToMyVillages();
	if( /karte.php\?d=\d+&c=/.test(crtPath) )  viewMessageIWK();
	if( /karte.php/.test(crtPath) ) karteDistance();
	if( /spieler.php\?.*uid=/.test(crtPath) ) { distanceToTargetVillages(); parseSpieler(); userActivityInfo(); resourceBalance(); }
	if( /build.php\?.*&t=1/.test(crtPath) ) marketBuy();
	if( /build.php.*(gid=16|id=39)/.test(crtPath) ) { incomeResourcesInRP(); detectNameAttaker(); }
	if( /build.php\?(.*)&s=2/.test(crtPath) ) culturePoints();
	if( /a2b.php/.test(crtPath) ) fillXYtoRP();
	if( /allianz.php/.test(crtPath) ) parseAlly();
	if( /berichte.php.+id=/.test(crtPath) ) addQuickLinks();
	if( ! /dorf.\.php/.test(crtPath) ) addRefIGM();
	if( /build.php/.test(crtPath) ) {
		neededResAdd();
		marketSend();
		marketSumm();
		marketOffer();
		detectRace();
		addSpeedAndRTSend();
	}

	setInterval(progressbar_updValues, 1000);
	if( RB.Setup[16] == 1 ) bigQuickLinks();
	if( RB.Setup[14] == 1 ) showDorf1();
	if( RB.Setup[12] > 0 ) showLinks();
	if( RB.Setup[17] == 1 ) rbNotes();
	if( RB.Setup[7] == 1) setTimeout(pageNoWrap, 500); //pageNoWrap();
	addSpeedRTSendMessageInLLinks();
	showRunTime();
//}

//start_script();
})();
