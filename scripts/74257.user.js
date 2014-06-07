// ==UserScript==
// @name           FA-PornControl
// @namespace      FA-PornControl
// @description    Choose whether to focus on porn or clean art on FurAffinity
// @include        http://www.furaffinity.net/*
// ==/UserScript==

// call the action function on each node in the xpath result
function fapo_process_xpath(expr, action, context, doc)
{
    if (typeof doc == 'undefined')
	doc = document;
    if (typeof context == 'undefined')
	context = doc;

    GM_log("process_xpath(" + expr + ", ..., " + context + ")...");

    var xpathres = doc.evaluate(
        expr, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < xpathres.snapshotLength; i++) {
        action(xpathres.snapshotItem(i));
    }

    return xpathres.snapshotLength;
}

// retrieve a single node via xpath
function fapo_get_xpath(expr, context)
{
    return document.evaluate(expr, context || document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function fapo_add_message(message, parentNode, containerType)
{
    var msg;
    var msgElt = document.createElement(containerType);
    if (message == 1) {
        msgElt.innerHTML = 'porn is hidden';
    } else if (message == 2) {
        msgElt.innerHTML = 'non-porn is hidden';
    } else {
	msgElt.innerHTML = message;
    }
    parentNode.appendChild(msgElt);
}

var g_rule_idx = null;

function fapo_hide(setting)
{
    var sheet = document.styleSheets[document.styleSheets.length - 1];
    if (g_rule_idx !== null) {
	sheet.deleteRule(g_rule_idx);
    }
    var setRule = function(cssText) {
	g_rule_idx = sheet.cssRules.length;
	sheet.insertRule(cssText, g_rule_idx);
    }
    if (setting == 1) {
	setRule(".r-adult { display: none !important }");
    } else if (setting == 2) {
	setRule(".r-general { display: none !important }");
    } else {
	g_rule_idx = null;
    }
}

function fapo_check_deleted()
{
    function docheck(checkbox) {
	GM_log("checking " + checkbox.value);
	if (!checkbox.checked) {
	    checkbox.click();
	}
	checkbox.checked = true;
    }
    var cnt = fapo_process_xpath("//img[@src='/images/submission-message-deleted.gif']/ancestor::b//input[@name='submissions[]']", docheck);
    return cnt;
}

function fapo_remove_deleted(event)
{
    if (fapo_check_deleted() > 0) {
	fapo_process_xpath("//input[@value='Remove checked']", function(delbtn) { delbtn.click(); });
    }

    return false;
}

function fapo_set(event)
{
    var oldSetting = GM_getValue("PornOnly", 0);
    var newSetting = +this.value;
    GM_log("Setting to " + newSetting);
    GM_setValue("PornOnly", newSetting);
    
    fapo_hide(newSetting);
}

function fapo_setup() {
    var links_td = document.evaluate("//td[@align='right']",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    var controls = document.createElement("span");
    controls.innerHTML = "<input type='radio' name='fapo' id='fapo-porn' value='2'>" +
                         "<label for='fapo-porn'>Porn</label> " + 
                         "<input type='radio' name='fapo' id='fapo-clean' value='1'>" +
                         "<label for='fapo-nonporn'>Clean</label> " +
                         "<input type='radio' name='fapo' id='fapo-both' value='0'>" +
                         "<label for='fapo-both'>Both</label>" +
			 "<input type='button' name='fapo-del-removed' class='button'" +
			       " id='fapo-del-removed' value='Delete Removed' />";

    links_td.appendChild(controls);

    var pornbox = document.getElementById('fapo-porn');
    var cleanbox = document.getElementById('fapo-clean');
    var bothbox = document.getElementById('fapo-both');
    var delremovedbtn = document.getElementById('fapo-del-removed');
    var setting = GM_getValue("PornOnly", 0);
    if (!setting) {
        bothbox.checked = true;
    } else if (setting == 1) {
        cleanbox.checked = true;
        fapo_hide(1);
    } else {
        pornbox.checked = true;
        fapo_hide(2);
    }
    pornbox.addEventListener("click", fapo_set, false);
    cleanbox.addEventListener("click", fapo_set, false);
    bothbox.addEventListener("click", fapo_set, false);
    delremovedbtn.addEventListener("click", fapo_remove_deleted, false);
}

fapo_setup();

GM_registerMenuCommand('Check deleted', fapo_check_deleted);
