// ==UserScript==
// @name           Gmail Chat Cleaner
// @namespace      http://userscripts.org/users/65373
// @description    Hides useless chat parts
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==


// *********** Begin Option Edit Section ***********
// You can edit the values below to enable/disable functions

var hide_chat_headline  = true;
var hide_chat_search	= true;
var hide_chat_status	= true;
var hide_offline_users	= true;
var hide_user_statuses  = true;

// *********** End Option Edit Section ***********

/* *********** DO NOT EDIT BELOW THIS LINE ***********/

function hide_given(ddiv, ttype, nname) 
{
	var css = "@namespace url(http://www.w3.org/1999/xhtml); "
			+ ddiv  + "["+ttype+"=\""
			+ nname + "\"] {display: none !important; }";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
	}
}


gTable = null;
function getContactsTable() {
    var tables = document.getElementsByTagName('table');
    for(var i = 0; i < tables.length; i++) {
        if(tables[i].getAttribute('class') == 'cf vH' &&
           tables[i].getAttribute('role') == 'listbox') {
            var rows = tables[i].getElementsByTagName('tr');
            if(rows.length > 0) {
                return tables[i];
            }
        }
    }

    return null;
}

function modified(node) {
    gTable.removeEventListener("DOMSubtreeModified", modified, false);

    GM_log('modified')
    var crows = gTable.getElementsByTagName('tr');
    for(var i = 0; i < crows.length; i++) {
        var img = crows[i].getElementsByTagName('img');
        if(img.length < 1)
            continue;
        img = img[0];
        if(img.alt == "Offline" || img.alt == "") {
            crows[i].style.display = 'none';
            GM_log('hiding row ' + i);
        } else {
            crows[i].style.display = '';
            GM_log('unhiding row ' + i);
        }
    }
    GM_log('end modified')

    gTable.addEventListener("DOMSubtreeModified", modified, false);
}

function load() {
    if(getContactsTable() == gTable)
        return;
    
    if(gTable != null) {
        gTable.removeEventListener("DOMSubtreeModified", modified, false);
    }

    if((gTable = getContactsTable()) != null) {
        gTable.addEventListener("DOMSubtreeModified", modified, false);
        modified();
    }
}

if (hide_offline_users)
	window.addEventListener("DOMSubtreeModified", load, false);
if (hide_chat_headline) 
	hide_given("div", "class", "nH pv r"); //chat headline
if (hide_chat_search)
	hide_given("div", "class", "dH");// hide search
if (hide_chat_status)
	hide_given("table", "class", "uJ"); // hide "Set status here"
if (hide_user_statuses){
        GM_addStyle(".vm { display: none !important; }");
        GM_addStyle(".vl.vF { display: none !important; }");
}
