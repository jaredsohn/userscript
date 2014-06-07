// ==UserScript==
// @name           GamingClerks.de Farbwechsel - IN DEVELOPMENT SCRIPT
// @description    Selbe Funktion wie das normale Script. Nur halt in Entwicklung. Keine Garantie, dass es funktioniert, aber dafür hat es früher tolle neue Features. Aktuell ist das Forum in Arbeit.
// @match        http://www.gamingclerks.de/*
// @match        http://gamingclerks.de/*
// @include        http://www.gamingclerks.de/*
// @include        http://gamingclerks.de/*
// ==/UserScript==
var colorMod    = "standard";
var tCatRGB		= "869BBF";
var tCatURL		= "http://steryn.square7.ch/priv/playaround/userscripts/gcde/forum/standard/gradient_thead.gif";
var tHeadRGB	= "5c7099";
var tHeadURL	= "http://steryn.square7.ch/priv/playaround/userscripts/gcde/forum/standard/gradient_tcat.gif";
var alt1		= ".alt1, .alt1Active{background: #F5F5FF;}";
var alt2		= ".alt2, .alt2Active{background: #E1E4F2;}";
var tfoot		= ".tfoot{background-color: #3E5C92;}";
function black() {
  colorMod = "black";
  updateStylesheet();
}

function yellow() {
  colorMod = "yellow";
  updateStylesheet();
}

function blue() {
  colorMod = "standard";
  updateStylesheet();
}

function green() {
  colorMod = "green";
  updateStylesheet();
}

function updateStylesheet() {
if (colorMod == "black") {
	tCatRGB		= "9a9a9a";
	tHeadRGB	= "707070";
	alt1		= ".alt1, .alt1Active{background: #FAFAFA;}";
	alt2		= ".alt2, .alt2Active{background: #E6E6E6;}";
	tfoot		= ".tfoot{background-color: #5B5B5B;}";
}
if (colorMod == "yellow") {
	tCatRGB		= "bfaa86";
	tHeadRGB	= "99855c";
	alt1		= ".alt1, .alt1Active{background: #FFFFF5;}";
	alt2		= ".alt2, .alt2Active{background: #F2EFE1;}";
	tfoot		= ".tfoot{background-color: #92743E;}";
}
if (colorMod == "blue") {
	tCatRGB		= "869BBF";
	tHeadRGB	= "5c7099";
	alt1		= ".alt1, .alt1Active{background: #F5F5FF;}";
	alt2		= ".alt2, .alt2Active{background: #E1E4F2;}";
	tfoot		= ".tfoot{background-color: #3E5C92;}";
}
if (colorMod == "green") {
	tCatRGB		= "aebf86";
	tHeadRGB	= "84995c";
	alt1		= ".alt1, .alt1Active{background: #F8FFF5;}";
	alt2		= ".alt2, .alt2Active{background: #EAF2E1;}";
	tfoot		= ".tfoot{background-color: #78923E;}";
}
var bodyMod     = "body{background-image:url(http://steryn.square7.ch/priv/playaround/userscripts/" + colorMod + "/gcBG.png);no-repeat;width: 100%;height: 100%;}";
var bgMod       = "#contentwrap{background:url(http://steryn.square7.ch/priv/playaround/userscripts/" + colorMod + "/h_trans1.png) top left;}";
var headMod     = "#headwrap{background:url(http://steryn.square7.ch/priv/playaround/userscripts/" + colorMod + "/banner.png) top left;}";
var tCat       	= ".tcat  {background: #" + tCatRGB  +" url(http://steryn.square7.ch/priv/playaround/userscripts/gcde/forum/" + colorMod  + "/gradient_tcat.gif) repeat-x top left;}";
var tHead     	= ".thead {background: #" + tHeadRGB +" url(http://steryn.square7.ch/priv/playaround/userscripts/gcde/forum/" + colorMod  + "/gradient_tcat.gif) repeat-x top left;}";

if (colorMod == "black") {
var blackBorderMod     = ".galleryitem {border-color:#ffffff;} .galleryitem a img {border-right-width:3px; border-right-style:solid; border-right-color:#ffffff;";
var style       =  bodyMod + bgMod + headMod + blackBorderMod + tCat + tHead + alt1 + alt2 + tfoot;
}
else {
var style       =  bodyMod + bgMod + headMod + tCat + tHead + alt1 + alt2 + tfoot;
}
var head        =  document.getElementsByTagName("body")[0];
var newCSSLink  =  window.document.createElement('link');
newCSSLink.rel  = 'stylesheet';
newCSSLink.type = 'text/css';
newCSSLink.href = 'data:text/css;charset=utf-8,'+escape(style);
head.appendChild(newCSSLink);
}
updateStylesheet();

var headerMenu = document.getElementById("menu");
var layoutSwitcherDiv  =  window.document.createElement('div');
layoutSwitcherDiv.id   = 'layoutswitcher';
headerMenu.appendChild(layoutSwitcherDiv);

var layoutSwitcher = document.getElementById("layoutswitcher");

var switcherBlue       =  window.document.createElement('img');
switcherBlue.src       = 'http://steryn.square7.ch/priv/playaround/userscripts/imgs/blueButton.png';
switcherBlue.addEventListener("click", function () {blue();}, true);
headerMenu.appendChild(switcherBlue);

var switcherYellow     =  window.document.createElement('img');
switcherYellow.src     = 'http://steryn.square7.ch/priv/playaround/userscripts/imgs/yellowButton.png';
switcherYellow.addEventListener("click", function () {yellow();}, true);
headerMenu.appendChild(switcherYellow);

var switcherGreen      =  window.document.createElement('img');
switcherGreen.src     = 'http://steryn.square7.ch/priv/playaround/userscripts/imgs/greenButton.png';
switcherGreen.addEventListener("click", function () {green();}, true);
headerMenu.appendChild(switcherGreen);

var switcherBlack      =  window.document.createElement('img');
switcherBlack.src     = 'http://steryn.square7.ch/priv/playaround/userscripts/imgs/blackButton.png';
switcherBlack.addEventListener("click", function () {black();}, true);
headerMenu.appendChild(switcherBlack);

// GamingClerks.de Theme-Switcher
// Grundidee + Script: ViMaSter ( V.Mahnke[at]gmx[dot]com