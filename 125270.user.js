// ==UserScript==
// @name           force login forum Ubuntu-fr
// @namespace      sputnick
// @description    Force le login automatique sur http://*ubuntu-fr.org
// @include        http://forum.*ubuntu-fr.org/*
// ==/UserScript==
//
// écrit en 2012 par sputnick. Fonctionne avec chrome.

// http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}

if (document.getElementById("login_top").req_username.value && document.getElementById("login_top").req_password) {
    GM_setValue("url", document.location.href);
    document.getElementById("login_top").submit();
    if document.location.href != GM_getValue("url")
        document.location.href = GM_getValue("url");
}