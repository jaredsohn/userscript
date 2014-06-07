// ==UserScript==
// @name           Enable Roundcube AutoComplete
// @namespace      RoundCube
// @description    Enables autocomplete when logging in to Roundcube Webmail
// @include        *
// @author         sunn0
// ==/UserScript==

if(document.getElementById("rcmloginuser")){
    document.getElementById("rcmloginuser").setAttribute('autocomplete', 'on');
}
if(document.getElementById("rcmloginpwd")){
    document.getElementById("rcmloginpwd").setAttribute('autocomplete', 'on');
}
