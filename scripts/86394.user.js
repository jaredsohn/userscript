// ==UserScript==
// @name           what.cd - Highlight Invitees
// @namespace      http://userscripts.org/users/52197
// @author         darkip
// @version        0.52
// @description    Highlights any links to the profiles of users you have invited
// @include        http://what.cd/*
// @include        https://ssl.what.cd/*
// ==/UserScript==

/**
 * Create a new Invitee object
 *
 * @param string username Username
 * @param string userID User ID
 * @return Invitee New invitee object
 */
function Invitee(username, userID) {
    this.username = username;
    this.userID = userID;
    this.serialize = InviteeUtility.serialize;
}

InviteeUtility = {
    /**
     * Method for Invitee object to return a serialized string
     *
     * @return string Serialized string for object
     */
    serialize: function() {
        return '{' + this.username + ',' + this.userID + '}';
    },
    
    /**
     * Serializes a given array of invitees
     *
     * @param array inviteeArray Array of invitees
     * @return string Serialized string for array
     */
    serializeInvitees: function(inviteeArray) {
        inviteeString = '';
        for (i=0; i < inviteeArray.length; i++) {
            inviteeString += inviteeArray[i].serialize();
        }
        return inviteeString;
    },
    
    /**
     * Unserializes a string of serialized invitees and returns an array
     *
     * @param string Serialized string
     * @return array Array of invitees
     */
    unserializeInvitees: function(inviteeString) {
        unserializeRegexp = /\{([\s\S]+?),(\d+?)\}/g;
        unserializeMatch = unserializeRegexp.exec(inviteeString);
        newInvitees = new Array();
        while (unserializeMatch != null) {
            newInvitees.push(new Invitee(unserializeMatch[1], unserializeMatch[2]));
            unserializeMatch = unserializeRegexp.exec(inviteeString);
        }
        return newInvitees;
    }
}

/**
 * Gets the cookie with the given name
 *
 * @param string name Name of cookie
 * @return mixed Content of the cookie or null if the cookie is not set
 */
function getCookie(name) {
    ca = document.cookie.split(';');
    for (i=0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1, c.length);
        }

        if (c.indexOf(name) === 0) {
            return c.substring(name.length+1, c.length);
        }
    }
    return null;
}

/**
 * Sets a cookie with the given parameters
 *
 * @param string name Name of cookie
 * @param mixed value Value to be stored
 * @param integer maxAge Maximum age of cookie in seconds before expiration
 * @return void
 */
function setCookie(name, value, maxAge) {
    theDate = new Date();
    expiryDate = new Date(theDate.getTime() + maxAge*1000).toGMTString();
    document.cookie = name + '=' + value + ';expires=' + expiryDate;
}

/**
 * Inserts Javascript into the page's context
 *
 * @param string script Javascript to insert
 * @return void
 */
function insertScript(script) {
    document.body.appendChild(document.createElement('script')).innerHTML = script;
}

/**
 * Inserts a row into the correct place on the settings page
 *
 * @param row tr Row to insert
 * @return void
 */
function insertSettingsRow(tr, colheadBelow) {
    rows = document.getElementById('userform').getElementsByTagName('tr');
    
    colheads = 0;
    for(i=0; i < rows.length; i++) {
        if(rows[i].className == 'colhead_dark') {
            colheads++;
        }

        if(colheads == colheadBelow) {
            rows[i].parentNode.insertBefore(tr, rows[i]);
            break;
        }
    }
}

/**
 * Gets the maximum age of the cached invitee list
 *
 * @return mixed Max age of cached invitee list or null if not set
 */
function getMaxAge() {
    return getCookie('max_age_invitee_cache');
}

/**
 * Callback called when the max age setting is changed to update it
 *
 * @return void
 */
function updateMaxAge() {
    maxAge = document.getElementById('maxAge').value;
    setCookie('invitee_cache', InviteeUtility.serializeInvitees(invitees), maxAge*60);
    setCookie('max_age_invitee_cache', maxAge, 31536000);
}

/**
 * Gets the cached invitee list
 *
 * @return mixed Array of invitee names or null if not set
 */
function getInvitees() {
    cookie = getCookie('invitee_cache');
    if (cookie != null) {
        return InviteeUtility.unserializeInvitees(cookie);
    }
    return null;
}

/**
 * Refreshes the cache of invitees
 *
 * @return void
 */
function updateInvitees() {
    updating = true;
    doRequest('/user.php?action=invite', requestComplete);
}

/**
 * Gets the colour with which to highlight the invitees
 *
 * @return mixed CSS colour code or null if not set
 */
function getHighlightColour() {
    return getCookie('invitee_highlight_colour');
}

/**
 * Callback called when the highlight colour setting is changed to update it
 *
 * @return void
 */
function updateHighlightColour() {
    highlightColour = document.getElementById('inviteeHighlightColour').value;
    setCookie('invitee_highlight_colour', highlightColour, 31536000);
}

/**
 * Make an AJAX GET request
 *
 * @param string url URL to request
 * @param function callback Callback to call when successful
 * @return void
 */
function doRequest(url, callback) {
    var req = (typeof(window.ActiveXObject) === 'undefined') ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    if (callback !== undefined) {
        req.onreadystatechange = function () {
            if (req.readyState !== 4 || req.status !== 200) {
                return;
            }
            callback(req.responseText);
        };
    }
    req.open('GET', url, true);
    req.send(null);
}

/**
 * Callback called when the AJAX request to the invite page is successful
 *
 * @param string response Response from the server
 * @return void
 */
function requestComplete(response) {
    tableRegexp = /<table width="100%">([\s\S]+?)<\/table>/;
    tableMatch = tableRegexp.exec(response);
    if (tableMatch != null) {
        table = tableMatch[1];
        inviteeRegexp = /<tr class="row[ab]">[\s\S]*?id=(\d+?)">([\s\S]+?)</g;
        inviteeMatch = inviteeRegexp.exec(table);
        if (inviteeMatch != null) {
            invitees = new Array();
            while (inviteeMatch != null) {
                invitee = new Invitee(inviteeMatch[2], inviteeMatch[1]);
                invitees.push(invitee);
                inviteeMatch = inviteeRegexp.exec(table);
            }
            setCookie('invitee_cache', InviteeUtility.serializeInvitees(invitees), maxAge*60);
        }
    }

    updating = false;
    if (loaded) {
        highlight();
    }
}

/**
 * Uses the cached invitee list to highlight all links to invitee pages
 *
 * @param element event Event passed from peerlist link onclick
 * @return void
 */
function highlight(event) {
    if (event == null) {
        container = document;
    } else {
        // Substr gives just the torrent id
        container = document.getElementById('peers_' + event.target.id.substr(10));
    }
    
    urlRegexp = /user\.php\?id=(\d+)$/;
    urlMatch = urlRegexp.exec(window.location.href);
    if (urlMatch == null) {
        // Not on a profile page
        links = container.getElementsByTagName('a');
        linkRegexp = /user\.php\?id=(\d+)$/;

        for (i=0; i < links.length; i++) {
            link = links[i];
            linkMatch = linkRegexp.exec(link.href);
            if (linkMatch != null) {
                userID = linkMatch[1];
                for (j=0; j < invitees.length; j++) {
                    invitee = invitees[j];
                    if (link.innerHTML === invitee.username && userID === invitee.userID) {
                        link.style.color = highlightColour;
                        break;
                    }
                }
            }
        }
    } else {
        // On a profile page so highlight the username if an invitee
        usernameElement = document.getElementById('content').getElementsByTagName('div')[0].getElementsByTagName('h2')[0];
        username = usernameElement.innerHTML;
        userID = urlMatch[1];
        for (i=0; i < invitees.length; i++) {
            if (username === invitees[i].username && userID === invitees[i].userID) {
                usernameElement.style.color = highlightColour;
                return;
            }
        }
    }
}

var invitees = getInvitees();
var maxAge = getMaxAge();
var highlightColour = getHighlightColour();
var updating = false;
var loaded = false;

if (maxAge == null) {
    // First-time initialisation
    updating = true;
    header = "---------------------------------------\nHighlight Invitees script initialisation\n---------------------------------------\n\n";
    ageMessage = "Please enter (in minutes) the maximum age of your invite list before it is refreshed on the next page load\n\n(This is adjustable later from your profile settings page where you can also force a refresh)";
    input = prompt(header + ageMessage, '30');
    if (input != null) {
        while (isNaN(maxAge = parseInt(input))) {
            input = prompt("Invalid maximum age\n\n" + header + ageMessage, '30');
            if (input == null) {
                alert('Defaulting to maximum age of 30 minutes');
                maxAge = 30;
                break;
            }
        }
    } else {
        alert('Defaulting to maximum age of 30 minutes');
        maxAge = 30;
    }

    colourMessage = 'Please enter the CSS colour code with which to highlight your invitees, the default is red';
    highlightColour = prompt(header + colourMessage, '#FF0000');
    if (highlightColour == null) {
        alert('Defaulting to red highlight colour');
        highlightColour = '#FF0000';
    }
}

// Update cookie expiration
setCookie('max_age_invitee_cache', maxAge, 31536000);
setCookie('invitee_highlight_colour', highlightColour, 31536000);

if (window.location.href.match(/user\.php\?action=invite$/)) {
    // If we're on the invite page, we might as well update the cache
    requestComplete(document.body.innerHTML);

    // Add the refresh button
    div = document.getElementById('content').getElementsByTagName('div')[0];
    iTools = document.createElement('div');
    iTools.className = 'box pad';
    iTools.innerHTML = '<input type="button" id="inviteeCacheRefresh" value="Refresh invitee cache" /> <input type="button" id="gotoInviteeSettings" value="Go to Invitee highlighting settings" />';

    header = document.createElement('h3');
    header.innerHTML = 'Invitee highlighting';

    div.insertBefore(iTools, document.getElementById('content').getElementsByTagName('div')[0].getElementsByTagName('h3')[0])
    div.insertBefore(header, iTools);
    document.getElementById('inviteeCacheRefresh').addEventListener('click', updateInvitees, false);
    document.getElementById('gotoInviteeSettings').addEventListener('click', function() { window.location.href = document.getElementById('userinfo_username').getElementsByTagName('li')[1].firstChild.href + '#highlightingSettings'; }, false);
    return;
} else if (window.location.href.match(/user\.php\?action=edit&userid=(\d+)(?:#[\s\S]*)?$/)) {
    // On the settings page so add the colour option
    header = document.createElement('tr');
    insertSettingsRow(header, 2);
    header.id = 'highlightingSettings';
    header.className = 'colhead_dark';
    header.innerHTML = '<td colspan="2"><strong>Invitee highlighting</strong></td>';

    maxAgeTr = document.createElement('tr');
    insertSettingsRow(maxAgeTr, 3);
    maxAgeTr.innerHTML = '<td class="label"><strong>Max invitee cache age</strong></td><td><input type="text" id="maxAge" value="' + maxAge + '" /> <label for="maxAge">Maximum number of minutes before the invitee cache should be refreshed <span style="color:red;">[This is saved immediately]</span></label></td>';
    maxAgeTr.addEventListener('change', updateMaxAge, false);

    highlightTr = document.createElement('tr');
    insertSettingsRow(highlightTr, 3);
    highlightTr.innerHTML = '<td class="label"><strong>Highlight colour</strong></td><td><input type="text" id="inviteeHighlightColour" value="' + highlightColour + '" /> <label for="inviteeHighlightColour">The colour with which to highlight your invitees <span style="color:red;">[This is saved immediately]</span></label></td>';
    highlightTr.addEventListener('change', updateHighlightColour, false);

    refreshTr = document.createElement('tr');
    insertSettingsRow(refreshTr, 3);
    refreshTr.innerHTML = '<td class="label"><strong>Force invitee cache refresh</strong></td><td><input type="button" id="inviteeForceRefresh" value="Refresh cache" /></label></td>';
    refreshTr.addEventListener('click', updateInvitees, false);
    
    // Scroll to the invitee highlighting options if linked from the invites page
    if (window.location.hash === '#highlightingSettings') {
        window.location.hash = window.location.hash;
    }
} else if (window.location.href.match(/user\.php\?action=invitetree$/)) {
    // Don't need to highlight on the invite tree!
    return;
} else if (window.location.href.match(/torrents.php\?[\s\S]*?id=\d+/)) {
    // On a torrent page, modify peerlist events to highlight
    // First modify the show_peers function to fire our event when loaded
    showPeers = 'eval(show_peers.toString().replace(/(innerHTML = response;)/g, "$1 evt = document.createEvent(\'HTMLEvents\'); evt.initEvent(\'peersLoaded\', false, false); $(\'#peersLink_\' + TorrentID).raw().dispatchEvent(evt);"));';
    insertScript(showPeers);
    
    torrentTable = document.getElementsByClassName('torrent_table')[0];
    linkBoxes = torrentTable.getElementsByClassName('linkbox');
    idRegexp = /show_peers\('(\d+?)'/;
    
    for (i=0; i < linkBoxes.length; i++) {
        link = linkBoxes[i].getElementsByTagName('a')[0];
        idMatch = idRegexp.exec(link.getAttribute('onclick'));
        torrentID = idMatch[1];
        link.id = 'peersLink_' + torrentID;
        link.addEventListener('peersLoaded', highlight, false);
    }
}

if (invitees == null) {
    // Invitees not loaded, so load them!
    updateInvitees();
}

if (!updating) {
    // If we're not currently updating, highlight, otherwise wait
    highlight();
} else {
    loaded = true;
}