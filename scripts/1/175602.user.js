// ==UserScript==
// @name     precious gems
// @include  http://www.rubycalaber.com/*
// @include  http://rubycalaber.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant    none
// ==/UserScript==

var badDivs = $('TABLE[id^="thread"]');
badDivs.hide ();
var goodDivs = $("TABLE").has('[title^="Started by steveyos"][href$="steveyos"],[title^="Started by rubycalaber"][href$="rubycalaber"],[title^="m0nde"][href$="m0nde"]:first-child,[title^="maks"][href$="maks"]:first-child,[title^="juji"][href$="juji"]:first-child,[title^="cbarry"][href$="cbarry"]:first-child,[title^="Started by fanfare"][href$="fanfare"],[title^="Started by Fucklord Bimbo"][href$="Fucklord-Bimbo"]');
goodDivs.show ();
var lizardDivs = $("TABLE").has('[href*="lizard"],[href*="lisa"],[href*="cag"],[href*="cody"],[href*="herpetarium"],[href*="plug"],[href*="link"],[href*="remulak"]');
lizardDivs.hide ();

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://rubycalaber.com/forums/images/aria/misc/logo1.gif")
{
images[x].src = "http://doir.ir/duxx/08-12-2013-14-37-22_logo1.gif";
}
x=x+1;
}