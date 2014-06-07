// ==UserScript==
// @name          Tibia Forum Post Name
// @namespace     http://www.erig.net/
// @description   Allows you to set a default character to post on the forums with
// @include       http://forum.tibia.com/forum/?action=new_post*
// @include       http://forum.tibia.com/forum/?action=new_thread*
// @include       http://forum.tibia.com/forum/?action=quote*
// @version       0.1
// @author        Erig (http://www.erig.net/)
// ==/UserScript==

// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need FireFox http://www.mozilla.org/products/firefox and 
// the Firefox extension called Greasemonkey: http://greasemonkey.mozdev.org/
// Install the Greasemonkey extension then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Tibia House Linker", and click Uninstall.
//
// --------------------------------------------------------------------

(function() {
    var select;
    var eles = document.forms[0].elements;
    for (var i = 0; i < eles.length; i++) {
        if (eles[i].name == 'forum_character') {
            select = eles[i];
            break;
        }
    }

    if (!select)
        return;

    var td = select.parentNode;
    var span = document.createElement('span');
    td.appendChild(span);
    span.innerHTML = ' <a href="#" onclick="return tfpn_setdefault()">[set as default]</a>';

    function tfpn_setdefault() {
        window.setTimeout(GM_setValue, 0, 'defaultchar', select.options[select.selectedIndex].value);
        return false;
    }

    var defaultchar = GM_getValue('defaultchar');

    if (defaultchar != '') {
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].value == defaultchar) {
                select.selectedIndex = i;
                break;
            }
        }
    }

    unsafeWindow.tfpn_setdefault = tfpn_setdefault;
})();