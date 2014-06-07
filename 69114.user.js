// ==UserScript==
// @name           skinovanje1
// @namespace      bla1
// @description    blabla1
// @include        http://www.erepublik.com/*
// ==/UserScript==

var image1 = 'http://img297.imageshack.us/img297/8440/maperepublikloggedflowe.png';


var cssString = '#menu ul li#menu1 a {width: 48px;background-image: url('+image1+');background-position: 0px -369px;}#menu ul li#menu2 a {background-image: url('+image1+');background-position: -48px -369px;}#menu ul li#menu3 a {background-image: url('+image1+');background-position: -229px -369px;}#menu ul li#menu4 a {background-image: url('+image1+');background-position: -410px -369px;}#menu ul li#menu5 a {background-image: url('+image1+');background-position: -591px -369px;}#menu ul li#menu6 a {background-image: url('+image1+');background-position: -772px -369px;}#menu ul li#menu1 ul li a, #menu ul li#menu2 ul li a, #menu ul li#menu3 ul li a, #menu ul li#menu4 ul li a, #menu ul li#menu5 ul li a {width: 135px;height: 27px;padding: 13px 15px 0px 28px;font-size: 12px;color: #808080;float: left;display: block;text-decoration: none;background: url('+image1+') 0px -940px no-repeat;}';

GM_addStyle(cssString);


var cssString1 = '#logo a {background:url('+image1+') no-repeat scroll 0 0 transparent;display:inline;float:left;height:109px;margin-top:10px;width:152px;}';

GM_addStyle(cssString1);


var cssString2 = 'body {background: url(http://img254.imageshack.us/img254/6937/gradijent.png);background-attachment: fixed;background-repeat: repeat-x;background-position: top;background-color: rgb(x,y,z);}';

//GM_addStyle(cssString2);


//var background = 'http://img254.imageshack.us/img254/4308/gradijents.png';

//bgScript = document.createElement("script");
//bgScript.type = "application/javascript";
//bgScript.innerHTML = "function loadAmbient(){var cssDef={'background-image':'url("+background+")','background-attachment': 'fixed','background-repeat':'repeat-x','background-position':'top'};$j('body').css(cssDef);}";
//bgScript.innerHTML += "function decideAmbientGraphics(){if($j.cookie('ambientGraphic')=='0')$j('body').css({'background-image':'url("+background+")'});else $j('body').css({'background-image': 'none'});setAmbientCookie();}";
//document.body.appendChild(bgScript);

var background = 'http://img402.imageshack.us/img402/8099/bgcopyt.jpg';

bgScript = document.createElement("script");
bgScript.type = "application/javascript";
bgScript.innerHTML = "function loadAmbient(){var cssDef={'background-image':'url("+background+")','background-repeat':'no-repeat','background-position':'center top'};$j('body').css(cssDef);}";
bgScript.innerHTML += "function decideAmbientGraphics(){if($j.cookie('ambientGraphic')=='0')$j('body').css({'background-image':'url("+background+")'});else $j('body').css({'background-image': 'none'});setAmbientCookie();}";
document.body.appendChild(bgScript);