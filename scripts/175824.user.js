// ==UserScript==
// @name           Google Mobilizer Folha
// @include        http://*folha.uol.com.br/*
// @copyright   Paulista.tk
// @version     0.0.1
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require    http://usocheckup.dune.net/29090.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

// find by JoeSimmons
String.prototype.find = function(s) {
	return (this.indexOf(s) != -1);
};

var url = window.location.href.toString();

if (url.find("http://www.google.com/gwt/x?u=") != true) {
    if(url.find("http://") === true) window.location.replace(url.replace("http://", "http://www.google.com/gwt/x?u="));
}
