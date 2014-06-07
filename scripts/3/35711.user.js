// ==UserScript==
// @name           Userscripts Insert Donate Button
// @namespace      http://userscripts.org/users/23652
// @description    Inserts a donate button into the description area
// @include        http://userscripts.org/scripts/edit/*
// @copyright      JoeSimmons
// @version        1.0.3
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @grant          GM_registerMenuCommand
// @downloadURL    http://userscripts.org/scripts/source/35711.user.js
// @updateURL      http://userscripts.org/scripts/source/35711.meta.js
// ==/UserScript==


// OPTIONS ////////////////////////////////////////////////////
var donatecode = '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=P7476K8HX27RL&lc=US&item_name=Joe%20Simmons&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_LG%2egif%3aNonHosted" title="Donate to this scriptwright for further improvements"><img src="http://s18.postimg.org/47cxl1geh/donate_250x50.png"></a>';
///////////////////////////////////////////////////////////////





function insert() {
    var desc = document.getElementById('script_description_extended');
    if (desc) {
        desc.value += donatecode;
    }
}

GM_registerMenuCommand('Insert Donate Button', insert);

// add the "Add Donate Button" link
window.addEventListener('load', function() {
    var a = document.createElement('a'),
        desc = document.getElementById('script_description_extended');

    a.setAttribute('href', 'javascript:void(0);');
    a.setAttribute('style', 'display: block; font-size: 17px; font-family: "Myriad Pro", Arial, Verdana; font-weight: bold; margin-top: 4px;');
    a.setAttribute('id', 'adddonate');
    a.addEventListener('click', insert, false);
    a.appendChild( document.createTextNode('Add Donate Button') );

    if (desc) {
        desc.parentNode.appendChild(a);
    }
}, false);