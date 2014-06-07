// ==UserScript==
// @name          Quick mark as Resolved/Fix in the Mantis bug tracker
// @namespace     http://apcon.com/internal/greasemonkey/markresolvedfixed
// @description   Adds a link to the edit page within the Mantis bug tracker to quickly mark a bug as resolved, fixed in the latest release, assigned to the currently logged in user, and repositions the cursor in the "Notes" field for quick entry of detailed information.
// @include       http://eris/mantis/bug_update_advanced_page.php*
// ==/UserScript==
// NOTES:
//   * now reads username from the "Logged in as:" string at the top of the page

function getUsername() {
    var theElements = document.evaluate("//td[@class='login-info-left']", document, null, XPathResult.ANY_TYPE, null);
    var theElement = theElements.iterateNext();
    while (theElement) {
        var label = theElement.textContent.replace(/^\s+|\s+$/g,"");
        if (label.substr(0, 14) == 'Logged in as: ') {
            var pos;
            label = label.substr(14);
            pos = label.indexOf('(') - 1;
            label = label.substr(0, pos);
            return label;
        }
        theElement = theElements.iterateNext();
    }
    return '';
}

function markResolved() {
    var myUsername = getUsername();
    for (var i=0; i<unsafeWindow.document.forms[2].elements['handler_id'].options.length; i++) {
        if (unsafeWindow.document.forms[2].elements['handler_id'].options[i].text == myUsername)
            unsafeWindow.document.forms[2].elements['handler_id'].options[i].selected = true;
    }
    unsafeWindow.document.forms[2].elements['status'].selectedIndex = 5;
    unsafeWindow.document.forms[2].elements['resolution'].selectedIndex = 1;
    unsafeWindow.document.forms[2].elements['fixed_in_version'].selectedIndex = 1;
    unsafeWindow.document.forms[2].elements['bugnote_text'].focus();
    return false;
}

function addLinks(obj) {
    var link = document.createElement("a");
    link.setAttribute('title', 'Mark Resolved');
    link.setAttribute('href', '#');
    link.addEventListener("click", markResolved, false);
    link.appendChild(document.createTextNode('[Resolved/Fixed]'));
    obj.appendChild(link);
}

var categories = document.evaluate("//td[@class='category']", document, null, XPathResult.ANY_TYPE, null);
var category = categories.iterateNext();
while (category) {
    var label = category.textContent.replace(/^\s+|\s+$/g,"");
    if (label == 'Status') {
        addLinks(category);
        break;
    }
    category = categories.iterateNext();
}
