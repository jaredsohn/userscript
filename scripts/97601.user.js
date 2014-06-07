// ==UserScript==
// @name           Enable password autocomplete
// @namespace      http://probackup.nl/input-password-autocomplete-on
// @description    Remembers password for any site where firefox won't remember, for example voipbuster.com, voippro.com, powervoip.com, 12voip.com
// @include        https://www.voippro.com/myaccount/index.php*
// @include        https://www.powervoip.com/myaccount/index.php*
// @include        https://www.voipbuster.com/myaccount/index.php*
// @include        https://www.12voip.com/myaccount/index.php*
// ==/UserScript==

/* 1st fixed approach
var elmPassword = document.getElementById('password');
elmPassword.setAttribute('autocomplete', 'on')*/

/* 2nd more generic approach */
var node_list = document.getElementsByTagName('input');
 
for (var i = 0, j = node_list.length; i < j; i++) {
    var node = node_list[i];
 
    if (node.getAttribute('type') == 'password' && node.hasAttribute('autocomplete') && node.getAttribute('autocomplete') == 'off') {
        node.setAttribute('autocomplete', 'on');
    }
} 