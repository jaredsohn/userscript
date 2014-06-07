// ==UserScript==
// @name           DNS Park Batch WebGUI
// @namespace      http://meridian.tamucc.edu/~ndurham
// @description    [Automatically] add multiple A and CNAME records to a DNS Park domain
// @include        https://www.dnspark.net/dnshosting.php?domain=*
// @version        0.1
// ==/UserScript==

// Constants
var HOSTNAME_LIST_STR = 'hostlist';
var RECORD_TYPE_STR = 'record_type';
var TTL_STR = 'record_ttl';
var DYNAMIC_STR = 'record_is_dynamic';
var DEBUG = true;                       // log debugging messages?

// "Global" variables
var host_panel = undefined;
var hp_host_list = undefined;           // host list text area element
var hp_record_type = undefined;         // record type select element
var hp_ttl = undefined;                 // TTL text input
var hp_dynamic = undefined;             // dynamic? checkbox element
var last_clicked_checkbox = undefined;  // last '*_delete' checkbox toggled

// Return single element matched by an XPath query.  
//
// Return undefined if no/more than one element matches.
function getElementByXPath(xpath)
{
    var snapshotResults = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (snapshotResults.snapshotLength != 1) {
        if (DEBUG) { 
            GM_log("xpath=" + xpath + ";  snapshotResults.snapshotLength=" + snapshotResults.snapshotLength);
        }
        return undefined;
    }
    return snapshotResults.snapshotItem(0);
}

// Shift the next hostname off of the "serialized" list and save the 
// shortened list.
function getNextRecord()
{
    var host_list = GM_getValue(HOSTNAME_LIST_STR);
    if (host_list == undefined) return undefined;

    var hosts = host_list.split(';');
    var mapping = hosts.shift();
    if (DEBUG) GM_log("mapping='" + mapping + "';  hosts.length=" + hosts.length);
    var host_map = mapping.split(' ');
    if (hosts.length <= 0) {            // no more hostnames 
        GM_deleteValue(HOSTNAME_LIST_STR);
    } 
    else {
        GM_setValue(HOSTNAME_LIST_STR, hosts.join(';'));
    }

    return host_map;
}

// Handle "Add Records" button clicks.
function addRecordsHandler()
{
    var host_list = hp_host_list.value;

    // Transform and store hostname list.
    //
    // TODO: Error checking?
    var regex = /(?:^\s+|\s+$)/g;
    host_list = host_list.replace(regex, ''); // eat preceding/trailing whitespace
    regex = /\n+/g;
    var serialized = host_list.replace(regex, ';');
    regex = /\s+/g;
    serialized = serialized.replace(regex, ' ');
    GM_setValue(HOSTNAME_LIST_STR, serialized);

    // Store other record information.

    // Store record type.
    var value = hp_record_type.options[hp_record_type.selectedIndex].value;
    GM_setValue(RECORD_TYPE_STR, value);
    // Store TTL
    GM_setValue(TTL_STR, hp_ttl.value);
    // Store dynamic update checkbox
    if (hp_dynamic.checked == true) {
        GM_setValue(DYNAMIC_STR, 'true');
    }
    else {
        GM_setValue(DYNAMIC_STR, 'false');
    }

    // Hide panel
    host_panel.style.display = 'none'; 

    // Start processing hostname list
    batchAddRecord();
}

// Fill in new A/CNAME record information. 
//
// Returns true on success (no errors encountered).
function inputHostInformation(type, from, to, ttl, dynamic)
{
    var elem;                           // element reference
    var success = false;                // assume failure

    if (DEBUG) {
        GM_log("type=" + type + ";  from=" + from + ";  to=" + to + ";  ttl=" + ttl + ";  dynamic=" + dynamic.toString());
    }

    try {
        // Set record type
        elem = getElementByXPath("//form[@name='rrlist']//select[@name='x_rtype']//option[@value='" + type + "']");
        var rt_index = elem.index;      // record type index
        if (DEBUG) GM_log("rt_index=" + rt_index);
        elem = getElementByXPath("//form[@name='rrlist']//select[@name='x_rtype']");
        elem.selectedIndex = rt_index;

        // Manually trigger form change event
        // 
        // XXX: I'm *not* sure I'm setting up this event properly, but it 
        //      seems to work.
        //
        // I found the following reference to be the most helpful:
        //
        // http://help.dottoro.com/larrqqck.php
        //
        var event_obj = document.createEvent('HTMLEvents');
        event_obj.initEvent('change', false, true);
        elem.dispatchEvent(event_obj);

        // Set hostname/alias
        elem = getElementByXPath("//form[@name='rrlist']//input[@name='x_rname']");
        elem.value = from;

        // Set TTL
        elem = getElementByXPath("//form[@name='rrlist']//input[@name='x_ttl']");
        elem.value = ttl;

        // Check dynamic checkbox (assume dynamic is a boolean)
        elem = getElementByXPath("//form[@name='rrlist']//input[@name='x_dynamic']");
        elem.checked = dynamic;

        // Set target hostname/IP address
        elem = getElementByXPath("//form[@name='rrlist']//input[@name='x_rdata']");
        elem.value = to;

        success = true;
    }
    catch (e) {
        if ( e instanceof TypeError ) {
            alert("Error '" + e.message + "' occurred in inputHostInformation().\nThis may be due to outdated/incorrect XPath queries.");
        }
        else {
            alert("Unexpected error '" + e.message + "' in inputHostInformation()");
        }
    }

    return success;
}

// Generate HTML and style information for hostname list panel.
//
// Large chunks of this code stolen/adapted from Johannes le Poutré's 
// "Keep Track of Secure Site Passwords" Greasemonkey Hack:
//
// http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Web_Forms#Keep_Track_of_Secure_Site_Passwords
//
function createListPanel()
{
    var div = document.createElement('div');
    div.style.color = '#000';
    div.style.padding = '5px';
    div.style.backgroundColor = '#ffc';
    div.style.border = '1px solid black';
    div.style.position = 'absolute';

    // Try to center the panel at the top of the records form area.
    div.style.left = '400px';
    div.style.top = '250px';
    div.style.zIndex = 9999;            // make sure we're on top
    div.style.display = 'none';
    div.setAttribute('id', 'dpbw_panel');

    var title = document.createElement('h3');
    title.textContent = 'Batch Add Records';
    title.style.marginTop = '5px';
    title.style.marginBottom = '5px';
    div.appendChild(title);

    // Record type DDL
    div.appendChild(document.createTextNode('Record Type:'));
    hp_record_type = document.createElement('select');
    hp_record_type.setAttribute('name', 'dpbw_record_type');
    hp_record_type.setAttribute('id', 'dpbw_record_type');
    div.appendChild(hp_record_type);
    var option = document.createElement('option');
    option.setAttribute('value', 'A');
    option.innerHTML = 'A';
    option.setAttribute('selected', true);
    hp_record_type.add(option, null);
    option = document.createElement('option');
    option.setAttribute('value', 'CNAME');
    option.innerHTML = 'CNAME';
    option.removeAttribute('selected');
    hp_record_type.add(option, null);
    div.appendChild(document.createElement('br'));

    // TTL 
    div.appendChild(document.createTextNode('TTL:'));
    hp_ttl = document.createElement('input');
    hp_ttl.setAttribute('type', 'text');
    hp_ttl.setAttribute('name', 'dpbw_ttl');
    hp_ttl.setAttribute('id', 'dpbw_ttl');
    hp_ttl.setAttribute('size', '10');
    hp_ttl.setAttribute('value', '3600');
    div.appendChild(hp_ttl);
    div.appendChild(document.createElement('br'));

    // Dynamic updates?
    div.appendChild(document.createTextNode('Dynamic updates (A records)?'));
    hp_dynamic = document.createElement('input');
    hp_dynamic.setAttribute('type', 'checkbox');
    hp_dynamic.setAttribute('name', 'dpbw_dynamic');
    hp_dynamic.setAttribute('id', 'dpbw_dynamic');
    hp_dynamic.setAttribute('checked', true);
    div.appendChild(hp_dynamic);
    div.appendChild(document.createElement('br'));

    // Host information textarea
    div.appendChild(document.createTextNode('Hostname/Alias mapping (one per line):'));
    div.appendChild(document.createElement('br'));
    hp_host_list = document.createElement('textarea');
    hp_host_list.setAttribute('name', 'dpbw_hostname_list');
    hp_host_list.setAttribute('id', 'dpbw_hostname_list');
    hp_host_list.setAttribute('cols', '40');
    hp_host_list.setAttribute('rows', '12');
    div.appendChild(hp_host_list);

    // Cancel button
    div.appendChild(document.createElement('br'));
    var button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Cancel');
    button.setAttribute('name', 'Cancel');
    button.addEventListener('click', function() { hp_host_list.value = ''; host_panel.style.display = 'none'; }, false);
    div.appendChild(button);

    // Add submit/begin button 
    button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Add Records');
    button.setAttribute('name', 'add');
    button.addEventListener('click', addRecordsHandler , false);
    div.appendChild(button);

    return div;
}

// Create button to display hostname list panel and insert into 
// existing form.
function insertAddBatchButton()
{
    var button = document.createElement('input');
    button.setAttribute('type', 'button');
    button.setAttribute('value', 'Batch Add Records');
    button.setAttribute('name', 'add_batch');
    button.addEventListener('click', function() { host_panel.style.display = 'inline'; hp_host_list.focus(); }, false);

    var elem = getElementByXPath("//form[@name='rrlist']//input[@type='submit']");
    elem.parentNode.insertBefore(button, elem);
}

// Add the next hostname in the list.
function batchAddRecord()
{
    var host_map = getNextRecord();
    if (host_map != undefined) {
        var type = GM_getValue(RECORD_TYPE_STR);
        var ttl = GM_getValue(TTL_STR);
        var dynamic = false;
        var bool_label = GM_getValue(DYNAMIC_STR);
        if (bool_label == 'true') dynamic = true;
        
        inputHostInformation(type, host_map[0], host_map[1], ttl, dynamic);
    }

    // Trigger "submit" button.
    //
    // Visual feedback code hijacked from Jesse Ruderman's Auto Login
    // Greasemonkey script:
    // 
    // http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Web_Forms#Automatically_Log_into_Web_Mail_and_Other_Sites
    var elem = getElementByXPath("//form[@name='rrlist']//input[@type='submit']");
    elem.focus();
    elem.style.MozOutline = '2px solid purple';
    elem.click();  
}

// Select a range of "delete record" checkboxes.
//
// Code in this and related functions stolen from Jesse Ruderman's "Check
// Range" Greasemonkey hack:
//
// http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Web_Forms#Select_Multiple_Checkboxes
function selectCheckboxRange(elem_start, elem_end)
{
    var xpath = "//form[@name='rrlist']//input[@type='checkbox' and contains(@name,'_delete')]";
    var snapCheckboxes = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var last_elem = undefined;          // last element in series
    var i;                              // generic counter

    for (i = 0; i < snapCheckboxes.snapshotLength; i++) {
        var elem = snapCheckboxes.snapshotItem(i);
        if (elem == elem_end) {
            last_elem = elem_start;
            break;
        }
        if (elem == elem_start) {
            last_elem = elem_end;
            break;
        }
    }

    // XXX: Intentionally re-use counter variable i (w/o resetting).
    for (; (elem = snapCheckboxes.snapshotItem(i)); i++) {
        if ( elem != elem_start && elem != elem_end && elem.checked != elem_start.checked ) {
            var click_event = document.createEvent('MouseEvents');
            click_event.initEvent('click', true, false);
            elem.dispatchEvent(click_event);
        }
        if (elem == last_elem) break;
    }
}

// Return true if this element is a "delete record" checkbox.
function isDeleteCheckbox(elem)
{
    var regex = /_delete$/;
    return ( elem.tagName == 'INPUT' && elem.type == 'checkbox' && elem.name.match(regex) );
}

// Hook into event processing loop to support shift-click selection of 
// range of delete checkboxes.
function batchEventHook(event) 
{
    var elem = event.target;

    // Hook for [delete] checkbox range selection.
    if ( isDeleteCheckbox(elem) && (event.button == 0 || event.keyCode == 32) ) {
        if (event.shiftKey && lastClickedCheckbox) {
            selectCheckboxRange(lastClickedCheckbox, elem);
        }
        lastClickedCheckbox = elem;
    }
}

//
// Main code
// 

// Initialization.
host_panel = createListPanel();
document.getElementsByTagName('body')[0].appendChild(host_panel);
insertAddBatchButton();

// Insert multiple checkbox selection hook
document.documentElement.addEventListener('keyup', batchEventHook, true);
document.documentElement.addEventListener('click', batchEventHook, true);

if (GM_getValue(HOSTNAME_LIST_STR) != undefined) {
    batchAddRecord();
}

