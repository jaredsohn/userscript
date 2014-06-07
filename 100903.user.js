// ==UserScript==
// @name           GamingClerks.de Farbwechsel
// @description    Erlaubt es euch, den Hintergrund und den Header von GamingClerks.de zu ändern. Einfach auf GamingClerks.de surfen und warten, bis oben rechts die Farbbuttons erscheinen.
// @match        http://www.gamingclerks.de/*
// @match        http://gamingclerks.de/*
// @include        http://www.gamingclerks.de/*
// @include        http://gamingclerks.de/*
// ==/UserScript==
var colorMod    = "standard";
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
var bodyMod     = "body{background-image:url(http://steryn.square7.ch/priv/playaround/userscripts/" + colorMod + "/gcBG.png);no-repeat;width: 100%;height: 100%;}";
var bgMod       = "#contentwrap{background:url(http://steryn.square7.ch/priv/playaround/userscripts/" + colorMod + "/h_trans1.png) top left;}";
var headMod     = "#headwrap{background:url(http://steryn.square7.ch/priv/playaround/userscripts/" + colorMod + "/banner.png) top left;}";
var forumHack     = ".page {background:url(http://steryn.square7.ch/priv/playaround/userscripts/gcde/transFix.png) top left;}";
if (colorMod == "black") {
var blackBorderMod     = ".galleryitem {border-color:#ffffff;} .galleryitem a img {border-right-width:3px; border-right-style:solid; border-right-color:#ffffff;";
var style       =  bodyMod + bgMod + headMod + blackBorderMod + forumHack;
}
else {
var style       =  bodyMod + bgMod + headMod + forumHack;
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
// var linkBlue           =  window.document.createElement('a');
// linkBlue.href          = "javascript:unsafeWindow.blue()";
// layoutSwitcher.appendChild(linkBlue);
var switcherBlue       =  window.document.createElement('img');
switcherBlue.src       = 'http://steryn.square7.ch/priv/playaround/userscripts/imgs/blueButton.png';
switcherBlue.addEventListener("click", function () {blue();}, true);
headerMenu.appendChild(switcherBlue);

// var linkYellow         =  window.document.createElement('a');
// linkYellow.href          = "javascript:unsafeWindow.yellow()";
// layoutSwitcher.appendChild(linkYellow);
var switcherYellow     =  window.document.createElement('img');
switcherYellow.src     = 'http://steryn.square7.ch/priv/playaround/userscripts/imgs/yellowButton.png';
switcherYellow.addEventListener("click", function () {yellow();}, true);
headerMenu.appendChild(switcherYellow);

// var linkGreen          =  window.document.createElement('a');
// linkGreen.href          = "javascript:unsafeWindow.green()";
// layoutSwitcher.appendChild(linkGreen);
var switcherGreen      =  window.document.createElement('img');
switcherGreen.src     = 'http://steryn.square7.ch/priv/playaround/userscripts/imgs/greenButton.png';
switcherGreen.addEventListener("click", function () {green();}, true);
headerMenu.appendChild(switcherGreen);

// var linkBlack          =  window.document.createElement('a');
// linkBlack.onclick      = location.assign( "javascript:black();void(0)" );
// layoutSwitcher.appendChild(linkBlack);
var switcherBlack      =  window.document.createElement('img');
switcherBlack.src     = 'http://steryn.square7.ch/priv/playaround/userscripts/imgs/blackButton.png';
switcherBlack.addEventListener("click", function () {black();}, true);
headerMenu.appendChild(switcherBlack);

// GamingClerks.de Theme-Switcher
// Grundidee + Script: ViMaSter ( V.Mahnke[at]gmx[dot]com