// ==UserScript==
// @name pennergame 4.0 navileiste
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description man hat so was wie die alte navileiste wieder da und erleichtert die scheise bei 4.0 
// @include *pennergame.de*
// ==/UserScript==



var VonOben2 = 250; //px
var VonRechts2 = 120; //px
var borderfarbe2 = 'black';
var hintergrundfarbe2 = 'black';
var schrieftfarbe2 = 'white';
var schrieftgroese2 = '200';
var borderbreite2 = '0';

var schrieftgrosse = "210";
var krum = "white";

var newspan1 = document.createElement("tr");
newspan1.setAttribute('id', 'news_bla1');
newspan1.setAttribute('name', 'news__bla1');
newspan1.setAttribute('style', 'position:absolute;top:'+VonOben2+'px;left:'+VonRechts2+'px;font-size:x-small;-moz-border-radius:0px;-moz-opacity:1.8;opacity:1.8;border:'+borderbreite2+'px solid '+borderfarbe2+'; background-color:'+hintergrundfarbe2+'');  var navigation = document.getElementById("header");
navigation.appendChild(newspan1);
document.getElementById("news_bla1").innerHTML = ''
+'&nbsp;&nbsp;&nbsp;<a href="/overview/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b> Uberssicht </b></span></a>' 
+'&nbsp;&nbsp;&nbsp;<a href="/skills/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Skills </b></span></a>'
+'&nbsp;&nbsp;&nbsp;<a href="/activities/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Aktion </b></span></a>'
+'&nbsp;&nbsp;&nbsp;<a href="/city/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Stadt </b></span></a>'
+'&nbsp;&nbsp;&nbsp;<a href="/stock/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Inventar</b> </span></a>' 
+'&nbsp;&nbsp;&nbsp;<a href="/fight/overview/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Fights</b></span></a>'
+'&nbsp;&nbsp;&nbsp;<a href="/gang/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Bande </b></span></a>'
+'&nbsp;&nbsp;&nbsp;<a href="/stock/plunder/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>Plunder</b></span></a>'
+'&nbsp;&nbsp;&nbsp;<a href="/messages/"> <span style=\"color: '+krum+'; font-size: '+schrieftgrosse+'%;\"><b>sms </b></span></a>';

// copyright by basti1012
