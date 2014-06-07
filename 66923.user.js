// Facebook HTTPS Login done right
// version 1.3
// 2010-27-01
//
// --------------------------------------------------------------------
//
// This is (finally !) an elegant solution to ensure that your password
// is always sent securely over the interwebs.
// 
// Curiously every other dozen scripts do it wrong : either they put
// HTTPS everywhere, fucking up Facebook Chat and rendering the
// remaining elements painfully slow.
// Either they *try* to only turn login pages to HTTPS, but fail. And
// with redundant code.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name			Facebook HTTPS Login done right
// @author			MortalKastor
// @description			Sets up a secure connection to send your login & pass
// @include			http://www.facebook.com
// @include			http://www.facebook.com/
// @include			http://www.facebook.com/index.php*
// @include			http://www.facebook.com/login.php*
// @include			http://login.facebook.com/*
// @run-at			document-start
// ==/UserScript==

if (!document.getElementById("home_stream"))
{
	document.body.innerHTML = '';
	setTimeout("location.href = location.href.replace(/http:/, 'https:')", 0);
}
