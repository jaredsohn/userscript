// ==UserScript==
// @name           Chromacity
// @namespace      nuckchorris0.deviantart.com
// @description    Replacement for the famous dAmnColors script.  For bots, it may cause issues unless you hold SHIFT when you send a message.
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

GM_addStyle(".farbtastic {\n position: relative;\n}\n.farbtastic * {\n position: absolute;\n cursor: crosshair;\n}\n.farbtastic, .farbtastic .wheel {\n width: 195px;\n height: 195px;\n}\n.farbtastic .color, .farbtastic .overlay {\n top: 47px;\n left: 47px;\n width: 101px;\n height: 101px;\n}\n.farbtastic .wheel {\n background: url(http://i51.tinypic.com/vhfbzc.png) no-repeat;\n width: 195px;\n height: 195px;\n}\n.farbtastic .overlay {\n background: url(http://i53.tinypic.com/34qsrgw.png) no-repeat;\n}\n.farbtastic .marker {\n width: 17px;\n height: 17px;\n margin: -8px 0 0 -8px;\n overflow: hidden; \n background: url(http://i53.tinypic.com/v7bo1l.png) no-repeat;\n}\n#chromacity-settings {\n display: block;\n width: 300px;\n height: 200px;\n background-color: rgb(118,142,124);\n -moz-border-radius: 8px;\n border: 1px solid rgb(43, 52, 50);\n position: absolute;\n z-index: 50;\n}\n #chromacity-settings #chromacity-picker {\n float: left;\n }\n #chromacity-settings .settings-right {\n float: right;\n width: 100px;\n font-family: Trebuchet MS, Arial,sans-serif;\n color: rgb(37, 47, 42);\n text-shadow: 0 1px 0 rgb(158,181,156);\n font-size: 11pt;\n text-align: center;\n height: 100%;\n padding-top: 25px;\n }\n #chromacity-settings input.hex {\n width: 50px;\n }\n #chromacity-settings .settings-buttons {\n margin-top: 10px;\n }\n #chromacity-settings .settings-buttons div {\n font-size: 12pt;\n color: rgb(154, 170, 151);\n text-shadow: 0pt -1px 0pt rgb(44, 55, 49);\n background-image: -moz-linear-gradient(center bottom , rgb(53, 66, 58) 0%, rgb(77, 95, 83) 100%);\n border: 1px solid #2b3432;\n text-align: center;\n width: 80px;\n height: 30px;\n -moz-border-radius: 3px;\n margin: 3px 7px 5px 5px;\n cursor: default;\n float: right;\n }\n #chromacity-settings .settings-buttons div span {\n color: rgb(119, 131, 116);\n font-size: 7pt;\n display: block;\n margin-top: -6px;\n }\ninput.hex {\n -moz-border-radius: 3px;\n border: 1px solid #2B3432;\n font-family: Trebuchet MS,Arial,sans-serif;\n font-size: 8pt;\n text-align: center;\n width: 50px;\n }\n #chromacity-settings .settings-buttons div:active {\n background:-moz-linear-gradient(center bottom , #5a6d60 0%, #2b362f 100%);\n border:1px solid #171c1b;\n }\n #chromacity-settings .settings-buttons div:hover {\n background:-moz-linear-gradient(center bottom , #2b362f 0%, #5a6d60 100%);\n border:1px solid #171c1b;\n }\n input.focus {\n -moz-box-shadow:0 0 3px white, 0 0 5px white, 0 0 2px white;\n }\n a[title='Drag'] {\n margin: 8px 8px 0 0;\n }");

(function(){
var datetime = new Date().getTime();

if(!document.getElementById("MiddleMan"))
{
	var MMScript 			= document.createElement('script');
		MMScript.id 		= "MiddleMan";
		MMScript.src 		= 'http://sumopiggy.24bps.com/damn/middleman/middleman.js';
		document.getElementsByTagName('head')[0].appendChild(MMScript);
}

if(!document.getElementById("chromacity"))
{
	var colorScript 		= document.createElement('script');
		colorScript.id 		= "chromacity";
		colorScript.src 	= 'http://userscripts.org.nyud.net/scripts/source/86001.user.js?dt='+datetime;
		document.getElementsByTagName('head')[0].appendChild(colorScript);
}
})();