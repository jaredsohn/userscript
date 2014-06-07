// ==UserScript==
// @name        TF2Outpost offer button
// @namespace   http://jessecar96.net
// @description Shows a button on outpost profiles for steam offers.  **PROOF OF CONCEPT ONLY**
// @require     https://raw.github.com/xPaw/SteamID/master/SteamID.js
// @include     http://www.tf2outpost.com/user/*
// @version     1
// ==/UserScript==

// Written by Jessecar96
// Thanks to xPaw for the SteamID Javascript class!
// Please don't use this for spamming purposes :(


$(function(){

	if($(".navigation_bar .left").length > 0) $(".navigation_bar .left").append("<li><a href=\"javascript:openOffer('"+$(".badges").text()+"')\">Steam Offer</a></li>");
	window.aries.bind_tipsy();

});

window.openOffer = function(steamid)
{
	var sid = new SteamID(steamid);
	var AccountID = sid.GetAccountID();

	var winHeight = 948;
	var nClientChromePX = 92;
	if ( window.screen.availHeight && window.screen.availHeight - nClientChromePX < winHeight )
		winHeight = window.screen.availHeight - nClientChromePX;

	var winOffer = window.open( 'http://steamcommunity.com/tradeoffer/new/?partner='+ AccountID, "NewTradeOffer"+AccountID, 'height=' + winHeight + ',width=1028,resize=yes,scrollbars=yes' );

	winOffer.focus();
}