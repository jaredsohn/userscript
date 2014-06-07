// ==UserScript==
// @name        mailman-admindb-label
// @namespace   tag:kon@iki.fi,2012-07-21:greasemonkey
// @description Add label elements to Mailman 2.1.9 moderation pages
// @include     http://linuxfromscratch.org/mailman/admindb/*
// @version     1.1.1
// @license     WTFPL v2 (http://sam.zoy.org/wtfpl/COPYING)
// ==/UserScript==
//
// This script is intended for moderators of mailing lists that are
// run with GNU Mailman 2.1.9.  It adds HTML LABEL elements to the
// "Administrative requests" (admindb) web pages.  For example, the
// page has a check box "[ ] Discard all messages marked Defer".
// Without this pscript, you have to click on the check box itself if
// you want to check it.  With this script, you can also click on the
// text.  Likewise, you can click "Discard" or other words above radio
// buttons.
//
// Tested with Mailman 2.1.9, Debian Iceweasel 10.0.5, Greasemonkey
// 0.9.20, and NoScript 2.1.4.  Unlikely to work with newer versions
// of Mailman.
//
// Hosted at <http://userscripts.org/scripts/show/138908>.
//
// Version 1.0 (2012-07-21): Unpublished first attempt.
//
// Version 1.1 (2012-07-22): After finding a radio button, generate a
// label for only that button, rather than all in the same table.
// This may be slower but simplifies the handling of unexpected
// elements.
//
// Version 1.1.1 (2012-07-23): More comments.  Create elements with
// lower-case "label".  Corrected a GM_log string.

// The numeric part of the ID that the ensureId function last used.
var idCounter = 0;

// Gets the ID of the specified element, generating a new one if needed.
function ensureId(element)
{
    var id = element.getAttribute("id");
    if (id == null) {
        // The element has no ID yet.
        // Generate IDs until we find an unused one.
        do {
            id = "id" + (++idCounter);
        } while (document.getElementById(id) != null);

        // The generated ID is not yet in use.  Assign it to the element.
        element.setAttribute("id", id);
    }
    return id;
}

// Adds a LABEL element for the specified check box.  The LABEL will
// contain the check box itself and any text that immediately follows.
function labelCheckBox(checkBox)
{
    var label = document.createElement("label");
    checkBox.parentNode.insertBefore(label, checkBox);
    label.appendChild(checkBox);

    // Move all following text into the LABEL element.
    //
    // It might be good to check that the elements being moved into
    // the LABEL don't themselves contain INPUT or LABEL elements.
    // It is not necessary with Mailman 2.1.9 though.
    var sibling = label.nextSibling;
    while (sibling != null
           && (sibling.nodeType == Node.TEXT_NODE
               || (sibling.nodeType == Node.ELEMENT_NODE
                   && (sibling.localName == "b"
                       || sibling.localName == "em")))) {
        label.appendChild(sibling);
        sibling = label.nextSibling;
    }
}

// Adds a LABEL element for the specified radio button.  This assumes
// that the radio button is in a table cell and that the corresponding
// cell in the previous row contains the label, e.g. "Discard".  The
// LABEL element will contain the label and have a FOR attribute that
// refers to the ID of the radio button.
function labelRadioButton(radioButton)
{
    // The radio button should be in a table cell (TD).
    // Do not look for TH, because Mailman does not use that here.
    var walk = radioButton.parentNode;
    for (;;) {
        if (walk == null) {
            GM_log("skipped radio button: has no TD ancestor");
            return;
        }
        if (walk.localName == "td") {
            break;
        }
        walk = walk.parentNode;
    }

    // There should be no other INPUT elements in that table cell.
    if (walk.getElementsByTagName("input").length != 1) {
        GM_log("skipped radio button: TD has multiple INPUT descendants");
        return;
    }

    // The TD element should be a child of TR.
    var tr = walk.parentNode;
    if (tr.localName != "tr") {
        GM_log("skipped radio button: parent of TD is not TR");
        return;
    }

    // There should be another TR above that one.
    tr = tr.previousElementSibling;
    if (tr.localName != "tr") {
        GM_log("skipped radio button: ancestor TR is not preceded by TR");
        return;
    }

    // In which column of the table is the TD element?
    var inputColumn = 0;
    for (walk = walk.previousElementSibling; walk != null;
         walk = walk.previousElementSibling) {
        if (walk.localName == "td") {
            ++inputColumn;
        }
    }

    // Find the corresponding TD element in the upper TR.
    var labelColumn = 0;
    for (walk = tr.firstElementChild; walk != null;
         walk = walk.nextElementSibling) {
        if (walk.localName == "td") {
            if (labelColumn == inputColumn) {
                break;
            }
            ++labelColumn;
        }
    }
    if (walk == null) {
        GM_log("skipped radio button: not enough TD elements in upper TR");
        return;
    }

    // Refuse to nest LABEL elements.
    // This check is here mainly to detect bugs in this script.
    if (walk.getElementsByTagName("label").length != 0) {
        GM_log("skipped radio button: upper TD already has a LABEL descendant");
        return;
    }

    // Refuse to move an INPUT into a LABEL that refers to a different INPUT.
    // This check is just for safety against Mailman versions not supported
    // by this script.
    if (walk.getElementsByTagName("input").length != 0) {
        GM_log("skipped radio button: upper TD already has an INPUT descendant");
        return;
    }

    // Create a LABEL for the INPUT element.
    var label = document.createElement("label");
    label.setAttribute("for", ensureId(radioButton));

    // Move all children of the TD element into the LABEL,
    // and then make the LABEL the only child of the TD.
    while (walk.hasChildNodes()) {
        label.appendChild(walk.firstChild);
    }
    walk.appendChild(label);
}

// Add labels for all check boxes and radio buttons.
var inputs = document.getElementsByTagName("input");
for (var inputIndex = 0; inputIndex < inputs.length; ++inputIndex) {
    var input = inputs[inputIndex];
    if (input.getAttribute("type") == "CHECKBOX") {
        labelCheckBox(input);
    } else if (input.getAttribute("type") == "RADIO") {
        labelRadioButton(input);
    }
}
