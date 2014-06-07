// Copyright 2008
// This script is distributed freely under the terms of the GNU General Public License
// Full text of the license is available at: http://www.gnu.org/licenses/gpl.txt
//


// --------------------------------------------------------------------

//

// This is a Greasemonkey user script.  To install it, you need

// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/

// Then restart Firefox and revisit this script.

// Under Tools, there will be a new menu item to "Install User Script".

// Accept the default configuration and install.

//

// To uninstall, go to Tools/Manage User Scripts,

// select "Back to Inbox", and click Uninstall.

//

// --------------------------------------------------------------------

//

// ==UserScript==

// @name          Back to Inbox
// @description   Adds "back to inbox" link when only individual gmail messages would otherwise be displayed
// @include       http://mail.google.com/mail/?*
// ==/UserScript==




var loadingElement, linkelement;
loadingElement = document.getElementById('loading');
if (loadingElement) {
    linkelement = document.createElement('a');
    var text = document.createTextNode('Back to Inbox');
    linkelement.setAttribute('href', 'http://mail.google.com');
    linkelement.appendChild(text);
    loadingElement.parentNode.insertBefore(linkelement, loadingElement);
}