// Proboards - Change name color
//
// This script searches all
// text nodes on pages within Proboards and replaces any instances of the
// name  with whatever your heart desires.
//
// ==UserScript==
// @name              Proboards Change name color
// @namespace     http://userscripts.org/users/76354
// @description     Proboards display name color
// @include           *.proboards.com*
// ==/UserScript==

var color = '#FF0000';

var username = unsafeWindow.pb_username;
for(d = document.getElementsByTagName('a'), a = 0; a < d.length; a++){
    if(d[a].href.match(new RegExp('viewprofile&user=' + username))){
        var x = (d[a].firstChild)? d[a].firstChild : d[a];
        x.style.color = color;
    }
}