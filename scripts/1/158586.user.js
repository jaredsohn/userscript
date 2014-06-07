// ==UserScript==
// @name           WFMultiFleetCommander
// @namespace      sk.seko
// @description    Allows you to move (or abort) group of fleets at once to specified destination (coordinates, planet, colony, wormhole)
// @include        http://*.war-facts.com/logistics.php
// @version        1.3
// ==/UserScript==

// Version history:
// 1.0    initial version
// 1.1    remove system id as a target - not supported by wf anymore; fixed fleet id parsing
// 1.2    added trade station / outpost as a target (to refuel)
// 1.3    added fleet (and global or local coordinates) as a target (to assault, support, reinforce etc)
// 1.4    added system / planet name as fleet specification (matches all fleets at the system/planet); some small fixes

/*
Target:

g#1,2,3 or 1,2,3 = global x,y,z
p#12345 or 12345 = planet #
c#12345          = colony #
l#1,2,3          = local x,y,z
w#1,2,3          = wormhole, local x,y,z
r#12345          = refuel at trade station #
fl#1,2,3#123     = fleet 123, local x,y,z
fg#1,2,3#123     = fleet 123, global x,y,z


Fleets:

1234             = fleet ID
123-234          = range of fleets
s#Naidar         = all fleets at all systems which name contains 'Naidar'
p#^Beta-A4-      = all fleets at all planets which name starts with 'Beta-A4-'
attack           = fleets (with names) containing substring 'attack' (case sensitive)
^Attack-[0-9]+   = fleets starting with 'Attack-' and followed by a number
23,24,30-45,TT-  = combination of all above, delimited by comma
*/


// target regexes:
var globalRegex = /^\s*(?:g#)?\s*(\-*\d+)[,;\s]+(\-*\d+)[,;\s]+(\-*\d+)/
var planetRegex = /^\s*(?:p#)?\s*(\d+)/
var colonyRegex = /^\s*c#\s*(\d+)/
var localRegex = /^\s*l#\s*(\-*\d+)[,;\s]+(\-*\d+)[,;\s]+(\-*\d+)/
var whRegex = /^\s*w#\s*(\-*\d+)[,;\s]+(\-*\d+)[,;\s]+(\-*\d+)/
var refuelRegex = /^\s*r#\s*(\d+)/
var fleetLocalRegex = /^\s*fl#\s*(\-*\d+)[,;\s]+(\-*\d+)[,;\s]+(\-*\d+)#(\d+)/
var fleegGloblRegex = /^\s*fg#\s*(\-*\d+)[,;\s]+(\-*\d+)[,;\s]+(\-*\d+)#(\d+)/
// other regexes:
var commaRegex = /\s*,\s*/
var rangeRegex = /\s*-\s*/
var trimRegex = /^\s+|\s+$/g


function myTrim(xxx) {
    return xxx ? xxx.replace(trimRegex, '') : xxx;
}


Array.prototype.unique = function() {
    var a = [], l = this.length;
    for(var i=0; i<l; i++) {
        for(var j=i+1; j<l; j++)
            if (this[i] === this[j]) j = ++i;
        a.push(this[i]);
    }
    return a;
};


function loadXMLDoc(method, url){
    // branch for native XMLHttpRequest object
    req = new XMLHttpRequest();
    req.onreadystatechange = processReqChange();
    req.open(method, url, true);
    req.send(null);
}


function processReqChange(){
    // do nothing
}


function moveThemRaw(target, fleets, mtype) {
    GM_log('moving ' + fleets + ' to ' + target + ' as mission ' + mtype)
    // this is base url
    var url = 'http://' + window.location.hostname + '/fleet_navigation.php?';
    // printable target (just to display it)
    ptarget = target
    if (t = target.match(globalRegex)) {
        url += '&tpos=global&rawcoords='+encodeURIComponent(t[1]+','+t[2]+','+t[3]);
        url += '&verify=1&mtype='+mtype;
        ptarget = t[1]+','+t[2]+','+t[3]+' global';
    } else if (t = target.match(planetRegex)) {
        url += '&tworld2='+t[1];
        url += '&verify=1&mtype='+mtype;
        ptarget = 'planet #' + t[1];
    } else if (t = target.match(colonyRegex)) {
        url += '&tcolony2='+t[1];
        url += '&verify=1&mtype='+mtype;
        ptarget = 'colony #' + t[1];
    } else if (t = target.match(localRegex)) {
        url += '&tpos=local&rawcoords='+encodeURIComponent(t[1]+','+t[2]+','+t[3]);
        url += '&verify=1&mtype='+mtype;
        ptarget = t[1]+','+t[2]+','+t[3]+' local';
    } else if (t = target.match(whRegex)) {
        url += '&tpos=local&rawcoords='+encodeURIComponent(t[1]+','+t[2]+','+t[3]);
        mtype = 'jump';
        url += '&verify=1&mtype='+mtype;
        ptarget = t[1]+','+t[2]+','+t[3]+' local/hyperjump';
    } else if (t = target.match(refuelRegex)) {
        url = 'http://' + window.location.hostname + '/outposttrade.php?outpost='+t[1]+'&refuel=1';
        mtype = 'refuel';
        ptarget = 'outpost #'+t[1];
    } else if (t = target.match(fleetLocalRegex)) {
        url += '&tpos=local&rawcoords='+encodeURIComponent(t[1]+','+t[2]+','+t[3]);
        url += '&verify=1&mtype='+mtype;
        url += '&tfleet='+t[4]
        url += 'mregistration=none&fratConfirm=0&delayLaunch=1&verify=Launch!'
        ptarget = t[1]+','+t[2]+','+t[3]+' local/fleet #'+t[4];
    } else if (t = target.match(fleetGlobalRegex)) {
        url += '&tpos=global&rawcoords='+encodeURIComponent(t[1]+','+t[2]+','+t[3]);
        url += '&verify=1&mtype='+mtype;
        url += '&tfleet='+t[4]
        url += 'mregistration=none&fratConfirm=0&delayLaunch=1&verify=Launch!'
        ptarget = t[1]+','+t[2]+','+t[3]+' local/fleet #'+t[4];
    } else {
        alert('Unknown target: ' + target)
        return
    }
    try {
        for (var k in fleets) {
            loadXMLDoc('GET', url + '&fleet=' + fleets[k]);
        }
        alert('Fleets launched: ' + fleets.join(', ') + ',\nMission: ' + mtype + ',\nTarget: ' + ptarget);
    } catch (ex) {
        alert('Exception ' + ex.name + ' - ' + ex.message);
    }
    return;
}


function abortThemRaw(fleets) {
    GM_log('aborting ' + fleets)
    try {
        var baseurl = 'http://' + window.location.hostname + '/fleet_navigation.php?';
        for (var k in fleets) {
            loadXMLDoc('PUT', baseurl + 'fleet=' + fleets[k] + '&abort=ABORT+MISSION');
        }
        alert('Missions aborted: ' + fleets.join(', '));
    } catch (ex) {
        alert('Exception ' + ex.name + ' - ' + ex.message);
    }
    return;
}


function parseFleets(fleets) {
    var ids = new Array();
    var farray = myTrim(fleets).split(commaRegex);
    for (var j = 0; j < farray.length; ++j) {
        f = myTrim(farray[j])
        // numeric fleet spec (single or range)
        if (/^[\s\d-]+$/.test(f)) {
            var range = f.split(rangeRegex);
            if (range.length >= 2) {
                for (var i = parseInt(range[0]); i <= parseInt(range[1]); ++i) {
                    ids.push(i);
                }
            } else {
                ids.push(myTrim(f));
            }
        // system specified
        } else if (/^s#.*$/.test(f)) {
            var elems = document.evaluate("//a/@href[contains(.,'/extras/view_system.php\?system=')]/..",
                    document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            if (elems) {
                fla = elems.iterateNext()
                while (fla)  {
                    grps = fla.href.match(/system=(\d+)\&fleet=(\d+)/)
                    if (grps) {
                        if (fla.textContent.match(f.substring(3))) {
                            var fleetid = parseInt(grps[2]);
                            ids.push(fleetid)
                        }
                    }
                    fla = elems.iterateNext()
                }
            }
        // planet specified
        } else if (/^p#.*$/.test(f)) {
            var elems = document.evaluate("//a/@href[contains(.,'/extras/view_planet.php\?planet=')]/..",
                    document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            if (elems) {
                fla = elems.iterateNext()
                while (fla)  {
                    grps = fla.href.match(/planet=(\d+)\&fleet=(\d+)/)
                    if (grps) {
                        if (fla.textContent.match(f.substring(3))) {
                            var fleetid = parseInt(grps[2]);
                            ids.push(fleetid)
                        }
                    }
                    fla = elems.iterateNext()
                }
            }
        // fallback - name specification is assumed
        } else {
            var elems = document.evaluate("//a/@href[contains(.,'fleet_navigation.php\?fleet=')]/..",
                    document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
            if (elems) {
                fla = elems.iterateNext()
                while (fla)  {
                    if (fla.textContent.match(f)) {
                        var fleetid = parseInt(fla.href.match(/fleet=(\d+)/)[1]);
                        ids.push(fleetid)
                    }
                    fla = elems.iterateNext()
                }
            }
        }
    }
    return ids.unique().sort();
}


unsafeWindow.moveThem = function(target, fleets) {
    if (!fleets) {
        alert('Missing input fleets!')
        return
    }
    fleets = parseFleets(fleets)
    if (!fleets || fleets.length <= 0) {
        alert('No matching fleets')
        return
    }
    mtype = document.getElementById('mtype').value;
    if (! mtype) {
        mtype = 'transfer'
    }
    if (mtype == 'abort') {
        abortThemRaw(fleets);
    } else {
        if (!target) {
            alert('Missing input target')
            return
        }
        moveThemRaw(myTrim(target), fleets, mtype);
    }
}


unsafeWindow.onHelpToggle = function() {
  var row1 = document.getElementById('helprow');
  if (row1) {
    row1.style.display = (row1.style.display == 'none') ? '' : 'none';
  }
}


function createUI_table() {
    var table = document.createElement('table');
    table.setAttribute('width', '95%');
    table.setAttribute('align', 'center');
    return table;
}


function createUI_row1() {
    var row1 = document.createElement('tr');
    var column1 = document.createElement('td');
    column1.setAttribute('class', 'head');
    column1.innerHTML = "\
    Fleets: <input type='text' length='50' size='25' onblur='fleets=this.value' value='' />&nbsp;\
    Mission: <select name='mtype' id='mtype'>\
        <option value=''>(default)</option>\
        <option value='abort'>Abort</option>\
        <option value='transfer'>Transfer</option>\
        <option value='explore'>Explore</option>\
        <option value='assault'>Assault</option>\
        <option value='conquer'>Conquer</option>\
        <option value='support'>Support</option>\
        <option value='reinforce'>Reinforce</option>\
        <option value='transport'>Transport</option>\
        <option value='colonize'>Colonize</option>\
        <option value='jump'>Hyperjump</option></select>&nbsp;\
    Target: <input type='text' length='50' size='25' onblur='target=this.value' value=''/>&nbsp;\
    <input type='submit' value='Move!' onclick='moveThem(target, fleets);' id='moveButton' />&nbsp;\
    <input type='button' onClick='onHelpToggle()' value='[?]' />";
    row1.appendChild(column1);
    return row1;
}


function createUI_row2() {
    var row2 = document.createElement('tr');
    row2.setAttribute('id', 'helprow')
    row2.setAttribute('style','display:none');
    var column2 = document.createElement('td');
    column2.setAttribute('class', 'head')
    column2.innerHTML = "\
    <u><b>Fleets:</b></u> Use <ul>\
    <li><b>4321</b> as fleet id,</li>\
    <li><b>4321 - 4332</b> as range of fleet ids,</li>\
    <li><b>s#Naidar</b> as all fleets at all systems which name contains 'Naidar',</li>\
    <li><b>p#^Beta-A4-</b> as all fleets at all planets which name starts with 'Beta-A4-',</li>\
    <li><b>abcd</b> as fleet name or substring (regular expressions supported!),</li>\
    <li>or all above combined, separated by commas.</li></ul>\
    For example,<ul><li>2133, 2200-2231, ^probe-[0-9]+\</li></ul></br>selects fleets with\
    specified ids and/or fleet prefixed with string <i>'probe-'</i> followed by a number.<br/><br/>\
    <u><b>Target:</b></u> Use <ul><li><b>x,y,z</b> or <b>g#x,y,z</b> as global coordinates,</li> \
    <li><b>12345</b> or <b>p#12345</b> as planet id,</li> \
    <li><b>c#12345</b> as colony id,</li> \
    <li><b>l#1,2,3</b> as local coordinates,</li> \
    <li><b>w#1,2,3</b> as wormhole (local) coordinates,</li> \
    <li><b>r#12345</b> as outpost # (to refuel),</li> \
    <li><b>fl#1,2,3#123</b> as local coordinates and target fleet id,</li> \
    <li><b>fg#1,2,3#123</b> as global coordinates and target fleet id</li></ul><br/><br/> \
    <u><b>Mission:</b></u> Defaults to <i>transfer</i> except wormhole, which defaults to <i>jump</i>.<br/><br/>\
    <u><b>Move!:</b></u> Move fleets to specified target, or aborts current mission if <i>abort</i> mission is selected.";
    row2.appendChild(column2);
    return row2
}


function createUI_header() {
    var header = document.createElement('p')
    header.innerHTML = '<b><u>Multiple Fleet Navigation</u></b>'
    return header
}


function findUI_insertPoint() {
    return document.evaluate("//text()[contains(.,'Rally Point Manager')]/../../..",
        document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}


unsafeWindow.target = '';
unsafeWindow.fleets = '';
var table = createUI_table();
table.appendChild(createUI_row1());
table.appendChild(createUI_row2());
var baseElement = findUI_insertPoint();
baseElement.parentNode.insertBefore(createUI_header(), baseElement);
baseElement.parentNode.insertBefore(table, baseElement);
baseElement.parentNode.insertBefore(document.createElement('br'), baseElement);
