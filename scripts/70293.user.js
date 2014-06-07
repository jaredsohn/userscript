// ==UserScript==
// @name             Ocultar publicidad de Tuenti
// @author           ACF
// @date             March 2, 2010
// @namespace        http://tuenti.com
// @include          http://tuenti.com/*
// @include          http://www.tuenti.com/*
// ==/UserScript==

(function()
{
	document.getElementById("invitations").style.display = 'none';
	document.getElementById("home_friends_importer").style.display = 'none';
	document.getElementById("sp_events").style.display = 'none';
}) ();