
// Trap Submit
// version 0.4 BETA!
// 2005-07-08
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script that traps form submission
// and displays an alert when the form is about to be submitted.
// It is meant as an example from which you can derive your own
// form-trapping scripts.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Trap Submit", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Trap Submit
// @namespace     http://diveintomark.org/projects/greasemonkey/
// @description   trap form submission
// @include       *
// ==/UserScript==

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

(function() {
    function newsubmit(event) {
        var form = event ? event.target : this;

        // do whatever you want here
        alert('Submitting form to ' + form.action);

        // call real submit function
        form._submit();
    }

    // capture the onsubmit event on all forms
    window.addEventListener('submit', newsubmit, true);

    // If a script calls someForm.submit(), the onsubmit event does not fire,
    // so we need to redefine the submit method of the HTMLFormElement class.
    HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
    HTMLFormElement.prototype.submit = newsubmit;
})();

//
// ChangeLog
// 2005-07-08 - 0.4 - MAP - added license block
// 2005-04-21 - 0.3 - MAP - use simply syntax for function declarations
// 2005-04-18 - 0.2 - MAP - use window-level event listener instead of adding one to every form
//
