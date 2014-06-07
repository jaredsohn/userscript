// ==UserScript==
// $LastChangedDate: 2008-03-05 21:27:37 +0200 (Wed, 05 Mar 2008) $
// $LastChangedRevision: 18 $
// Dmitry Rubinstein, 2008 (C)
// This script is in the public domain
//
// @name           Vox to LJ crosspost
// @namespace      http://dimrub.vox.com/
// @description    Cross-posts entries from Vox to LJ while keeping the tags and the security settings
// @include        http://www.vox.com/compose*
// ==/UserScript==

var DEBUG = false;
var username = '';

function debug(str) 
{
    if (DEBUG) GM_log(str);
}

ITER = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
SNAP = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
NODE = XPathResult.FIRST_ORDERED_NODE_TYPE;

var groups = [];

// Query is a valid Xpath expression
// Root is the node relative to which the query is performed
// (usually document).
// Type is one of the following:
//
// ITER = XPathResult.ORDERED_NODE_ITERATOR_TYPE;
// SNAP = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
// NODE = XPathResult.FIRST_ORDERED_NODE_TYPE;
//
// returns undefined if the query has failed
function xpath(query, root, type)
{
    var res;
    try {
        res = document.evaluate(query, root, null, type, null);
    } catch (e) {
        debug("Failed to run an XPath query \"" + query + "\", got exception <" + e.name + ">, error was: <" + e.message + ">");
    } finally {
        return res;
    }
}

defined = function( x ) {
    return x === undefined ? false : true;
}

finite = function( x ) {
    return isFinite( x ) ? x : 0;
}


finiteInt = function( x, base ) {
    return finite( parseInt( x, base ) );
}

Date.extend = function() {
    var a = arguments;
    for( var i = 0; i < a.length; i++ ) {
        var o = a[ i ];
        for( var p in o ) {
            try {
                if( !this[ p ] &&
                    (!o.hasOwnProperty || o.hasOwnProperty( p )) )
                    this[ p ] = o[ p ];
            } catch( e ) {}
        }
    }
    return this;
}

/* date extensions */

Date.extend( {
    /*  iso 8601 date format parser
        this was fun to write...
        thanks to: http://www.cl.cam.ac.uk/~mgk25/iso-time.html */

    matchISOString: new RegExp(
        "^([0-9]{4})" +                                                     // year
        "(?:-(?=0[1-9]|1[0-2])|$)(..)?" +                                   // month
        "(?:-(?=0[1-9]|[12][0-9]|3[01])|$)([0-9]{2})?" +                    // day of the month
        "(?:T(?=[01][0-9]|2[0-4])|$)T?([0-9]{2})?" +                        // hours
        "(?::(?=[0-5][0-9])|\\+|-|Z|$)([0-9]{2})?" +                        // minutes
        "(?::(?=[0-5][0-9]|60$|60[+|-|Z]|60.0+)|\\+|-|Z|$):?([0-9]{2})?" +  // seconds
        "(\.[0-9]+)?" +                                                     // fractional seconds
        "(Z|\\+[01][0-9]|\\+2[0-4]|-[01][0-9]|-2[0-4])?" +                  // timezone hours
        ":?([0-5][0-9]|60)?$"                                               // timezone minutes
    ),
    
    
    fromISOString: function( string ) {
        var t = this.matchISOString.exec( string );
        if( !t )
            return undefined;

        var year = finiteInt( t[ 1 ], 10 );
        var month = finiteInt( t[ 2 ], 10 ) - 1;
        var day = finiteInt( t[ 3 ], 10 );
        var hours = finiteInt( t[ 4 ], 10 );
        var minutes = finiteInt( t[ 5 ], 10 );
        var seconds = finiteInt( t[ 6 ], 10 );
        var milliseconds = finiteInt( Math.round( parseFloat( t[ 7 ] ) * 1000 ) );
        var tzHours = finiteInt( t[ 8 ], 10 );
        var tzMinutes = finiteInt( t[ 9 ], 10 );

        var date = new this( 0 );
        if( defined( t[ 8 ] ) ) {
            date.setUTCFullYear( year, month, day );
            date.setUTCHours( hours, minutes, seconds, milliseconds );
            var offset = (tzHours * 60 + tzMinutes) * 60000;
            if( offset )
                date = new this( date - offset );
        } else {
            date.setFullYear( year, month, day );
            date.setHours( hours, minutes, seconds, milliseconds );
        }

        return date;
    }
} );

function handleCustomButton(event) {
    var ljCustomGroups = document.getElementById("compose-custom-groups");
    ljCustomGroups.style.display = 'block';
}

function handleOtherButton(event) {
    var ljCustomGroups = document.getElementById("compose-custom-groups");
    ljCustomGroups.style.display = 'none';
}

function getSecurity() {
    var security, mask = 0;
    if (document.getElementById("crosspost-public").checked) {
        security = 'public';
    } else if (document.getElementById("crosspost-friends").checked) {
        security = 'usemask';
        mask = 1;
    } else if (document.getElementById("crosspost-private").checked) {
        security = 'private';
    } else { // custom
        security = 'usemask';   
        mask = 0;
        group_nodes = xpath('//input[contains(@id, "crosspost-group-")]', document, SNAP);
        for (var i = 0; i < group_nodes.snapshotLength; ++i) {
            group_node = group_nodes.snapshotItem(i);
            if (group_node.checked) {
                id = group_node.id.match(/\d+/);
                mask += 1<<id;
            }
        }
    }
    return {security: security, mask: mask};
}

// A callback of a request for LJ. Receives an object
// with the results of the request to LJ.
function crossPostCB(result, cb, addPostscript)
{
    if (result.success != 'OK') {
        var answer = confirm("There was an error while trying to crosspost your entry to LiveJournal. Do you want to proceed with posting to Vox (the entry will not appear in your Livejournal)?");
        if (!answer)
            return;
    }

    // Now add the retrieved track to the post's body
    composeEntryIframe = document.getElementById("compose-entry-iframe");
    doc = composeEntryIframe.contentDocument || 
        composeEntryIframe.contentWindow.document;
    body = doc.getElementsByTagName("body")[0];

    // Can't post the itemid as hidden input - Vox sanitizes it away.
    if (addPostscript) {
        p = doc.createElement('p');
        b = doc.createElement('font');
        b.setAttribute('size', -2);
        b.setAttribute('color', 'white');

        sec = getSecurity();
        text = doc.createTextNode("Crossposted to LJ, itemid = " + result.itemid + ", security = " + sec.security + ", mask = " + sec.mask + ".");
        b.appendChild(text);
        p.appendChild(b);
        body.appendChild(p);
    }
 
    cb();
}

function processEmbeds(body)
{
    debug("body = " + body);
    return body;
}

function crossPost(saveFunc)
{
    debug("In crossPost");
    var edit = false;

    // TODO: perhaps, support editing an existing post as well.
    if( xid = document.getElementById( 'post-xid' ).value ) {
        debug("crossposting an existing post");
        edit = true;
    }

    var cpEl = document.getElementById( "crosspost" );
    if (!edit && (!cpEl || !cpEl.checked)) {
        debug("Crosspost checkbox not checked, skipping crosspost");
        saveFunc();
        return true;
    }
    // Now uncheck the crosspost checkbox, so that Vox
    // does not crosspost again
    cpEl.checked = false;

    var body = this.editor.getHTML();

    // Unescape the lj tag
    body = body.replace(/&lt;lj\s*user="?([^"&]*)"?&gt;/g, "<lj user=\"$1\">");
    var title = document.getElementById( "post-title" ).value;
    var issued = document.getElementById( "post-issued" ).value;
    if (!issued || issued == "") 
        issued = new Date();
    else
        issued = Date.fromISOString(issued);
    
    var tags = this.tagEditor.getTags();

    bodyforlj = processEmbeds(body);
    if (edit) {
        if (body.match(/Crossposted to LJ, itemid = (\d*)/m)) {
            itemid = RegExp.$1; 
            var security = 'private', mask = '1';
            if (body.match(/Crossposted to LJ, itemid = \d*, security = (\w*), mask = (\d*)./m)) {
                security = RegExp.$1;
                mask = RegExp.$2;
                debug("Security = " + security + ", mask = " + mask);
            }
            bodyforlj = bodyforlj.replace(/<p><font[^>]*>Crossposted to LJ, itemid = \d*(, security = .*, mask = .*\.)?<\/font><\/p>/m, "");
            makeLJRequest({
                mode: 'editevent',
                user: username,
                itemid: itemid,
                event: encodeURIComponent(bodyforlj),
                subject: encodeURIComponent(title),
                security: security,
                allowmask: mask,
                year: issued.getFullYear(),
                mon: issued.getMonth() + 1,
                day: issued.getDate(),
                hour: issued.getHours(),
                min: issued.getMinutes(),
                lineendings: 'pc',
                auth_method: 'cookie',
                prop_taglist: tags,
                ver: '1',
            }, function (result) { crossPostCB(result, saveFunc, false) });
        }
    } else {
        var security, mask;
        sec = getSecurity();
        security = sec.security;
        mask = sec.mask;
        makeLJRequest({
            mode: 'postevent',
            user: username,
            event: encodeURIComponent(bodyforlj),
            subject: encodeURIComponent(title),
            security: security,
            allowmask: mask,
            year: issued.getFullYear(),
            mon: issued.getMonth() + 1,
            day: issued.getDate(),
            hour: issued.getHours(),
            min: issued.getMinutes(),
            lineendings: 'pc',
            auth_method: 'cookie',
            prop_taglist: tags,
        ver: '1',
        }, function (result) { crossPostCB(result, saveFunc, true) });
    }
}

// Perform all the initializations that depend upon availability of the 
// app object
function doAfterAppAppears() {
    var app = window.wrappedJSObject.App.singleton;
    if (!app) {
        setTimeout(doAfterAppAppears, 1000);
        return;
    }

    // Replace the eventAssetViewPrivacyChanged function so that
    // it does not disable the crosspost feature if the post's security
    // settings are not public.
    app.eventAssetViewPrivacyChanged = function (target, privacyLevel) {
        var cpEl = document.getElementById( "crosspost" );
        if( cpEl )
            cpEl.disabled = false;
        else {
            // Always cross-post an edit.
            cpEl.disabled = false;
            cpEl.checked = true;
        }
    }    

    // Make sure to return the checkbox that was disabled by the previous
    // version of the event handler.
    app.eventAssetViewPrivacyChanged();

    // Replace the savePost function
    oldSavePost = app.savePost;
    app.savePost = function( convertHTML ) {
        crossPost.call(
            app, 
            // A function that is called upon a successful crosspost
            function() 
            { 
                oldSavePost.call(app, convertHTML); 
            }
        );
    };
}

function makeLJRequest(data, cb)
{
    debug("Going to call the server with request " + data.mode);
    var first = true;
    var dataStr = '';
    for (var p in data) {
        if (!first)
            dataStr += '&';
        else
            first = false;
        dataStr += p + '=' + data[p];
    }
    window.setTimeout(function() {
        GM_xmlhttpRequest({
            method: 'POST',
            url: 'http://www.livejournal.com/interface/flat',
            headers: {
                'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
                'X-LJ-Auth': 'cookie',
            },
            data: dataStr,
            onload: function(responseDetails) {
                text = responseDetails.responseText;
                debug("Inside the handler for response");
                lines = text.split('\n');
                var field_name;
                var res = {};
                for (var i = 0; i < lines.length; ++i) {
                    line = lines[i];
                    // The even lines are the names of the fields, the odd ones - 
                    // values.
                    if (i % 2 == 0) {
                        field_name = line;
                    } else {
                        res[field_name] = line;
                    }
                }
                debug("Calling the callback");
                cb(res);
            }
        });
    }, 0);
}

function fillCustomGroups(div)
{
    makeLJRequest({
        mode: 'getfriendgroups',
        user: username,
        auth_method: 'cookie'
    }, function (res) { fillGroupsCB(res, div); } );
}

function fillGroupsCB(result, div)
{
    if (!result.success || result.success != 'OK') {
        alert("Failed to retrieve the list of custom groups from LJ. You are probably not logged in into LJ. You will not be able to crosspost to LJ. To fix this problem, login to LJ in another tab, then reload this page.");
        return;
    }
    groups = {};
    for (var field in result) {
        if (found = field.match(/frgrp_(\d*)_(.*)/)) {
            group_id = found[1];
            field_name = found[2];
            if (!groups[group_id])
                groups[group_id] = {};
            groups[group_id][field_name] = result[field];
        }
    }
 
    // TODO: sort the groups by sortorder
    for (var id in groups) {
        // Add the code for the custom group's checkbox
        div.innerHTML += 
"<div><label id=\"crosspost-lj-sec-group\" class=\"x-small-text crosspost-text\">" + 
"    <input type=\"checkbox\" id=\"crosspost-group-" + id + "\" name=\"lj-security\" class=\"crosspost checkbox\" />" + groups[id].name +
"</label></div>";
    }

}
 
// Perform initialization upon page's loading
function init() {
    getUsername();
 
    // Schedule a function call to after the app var has been set
    setTimeout(doAfterAppAppears, 1000);
 
    // Add a new option block for LJ's security settings
    var ljSecOptionsDiv = document.createElement('div');
    ljSecOptionsDiv.className = "option-block pkg";
    ljSecOptionsDiv.innerHTML = 
		"<label id=\"crosspost-lj-sec-public\" class=\"x-small-text crosspost-text\">" + 
		"    <input type=\"radio\" id=\"crosspost-public\" name=\"lj-security\" class=\"crosspost radio\" checked />public " + 
		"</label>" + 
		"<label id=\"crosspost-lj-sec-friends\" class=\"x-small-text crosspost-text\">" + 
		"    <input type=\"radio\" id=\"crosspost-friends\" name=\"lj-security\" class=\"crosspost radio\" />friends " + 
		"</label>" + 
		"<label id=\"crosspost-lj-sec-private\" class=\"x-small-text crosspost-text\">" + 
		"    <input type=\"radio\" id=\"crosspost-private\" name=\"lj-security\" class=\"crosspost radio\" />private " + 
		"</label>" + 
		"<label id=\"crosspost-lj-sec-custom\" class=\"x-small-text crosspost-text\">" + 
		"    <input type=\"radio\" id=\"crosspost-custom\" name=\"lj-security\" class=\"crosspost radio\" />custom" + 
		"</label>";
    var divComposeCrosspost = document.getElementById("compose-crosspost");
    divComposeCrosspost.appendChild(ljSecOptionsDiv);

    var ljCustomGroups = document.createElement('div');
    ljCustomGroups.id = "compose-custom-groups";
    ljCustomGroups.className = "option-block pkg";
    ljCustomGroups.style.display = 'none';
    fillCustomGroups(ljCustomGroups);
    divComposeCrosspost.appendChild(ljCustomGroups);

    buttons = xpath(".//input", ljSecOptionsDiv, SNAP);
    
    // Set a handler for the 'custom' radio-button
    for (var i = 0; i < buttons.snapshotLength; i++) {
        button = buttons.snapshotItem(i);
        if (button.id == "crosspost-custom") {
            button.addEventListener('click', handleCustomButton, true);
        } else {
            button.addEventListener('click', handleOtherButton, true);
        }
    }
}

function getUsername()
{
    username = GM_getValue("lj_username");
    if (!username) {
        username = prompt("In order to allow making cross posts to LJ, enter your LJ username ");
        GM_setValue("lj_username", username);
    }
}


init();
    
