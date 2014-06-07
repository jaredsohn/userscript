// ==UserScript==

// @name           InsertGeo

// @namespace      http://brucknerite.net

// @description    Adds a button to Blogger's edit post interface to insert geo microformats.

// @include        http://www.blogger.com/*

// @version        1.0

// ==/UserScript==



// Triggers page modification code modifyPage() on page load event.

window.addEventListener('load', modifyPage, true);



/**

 * Just to save space.

 * 

 * @param id    Element id attribute to return.

 * @return Element whose id attribute was specified.

 */

function $(id) {

    return document.getElementById(id);

}



// Button icon as data: URI

var BUTTON_ICON = 'data:image/gif;base64,R0lGODlhEAAQAIQQAFd3jWZ6hUqCp2SWtH%2BTnnuowY%2BntZm80am8xLPQ4avU77zR273g9NTj5%2Bfz9Pj%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEKAA8ALAAAAAAQABAAAAWG4COOTdmM6LggBhEYyJKKCBEny9IiKbs0B0OipOOJdInEoVA4JHMEWQPhLAyuB8YT9mgQEkxrQaFgaGulgNI6KDDICQYikI4frgJyWUn3xhl3AoJjSgQnBgZvCgOCgk5cDwsEB2SMggMKB1EjLAoFjQJtAwY9bIyWBycpOgCtBAYyMyQmMyEAOw%3D%3D';

// Wait icon as data: URI

var WAIT_ICON = 'data:image/gif;base64,R0lGODlhEAAQAMIHAHp6enx8fIiIiJqamqurq729vcDAwP%2F%2F%2FyH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhVDcmVhdGVkIHdpdGggVGhlIEdJTVAAIfkEBQEABwAsAAAAABAAEAAAA0N4ugfAkDkXVwhtHiHgvdnGddbHjGQZcYxhVMswHK4Ly3L9VvhswwdZa8cgECC6ovG4SBYKhyWz%2BXo%2Bo9OIFQpcXCMJACH5BAUBAAcALAAAAAAQABAAAAM%2FeLonwpA5FxcAbZ4x4L3ZxnXWx4xkGXFMEFQLQRyuC8ty%2FVb4bMMHGXBRKAyJRSPMYDgklREm0wmNSo%2BKaSQBACH5BAUBAAcALAAAAAAQAA4AAAM7eLo3w5A5F5cQbR5C4L3ZxnXWx4xkGXEMAFRLURyuC8ty%2FVb4bMMHGSMQiBgMECKRcTwOlcxmsghxKhIAIfkEBQEABwAsAAAAABAAEAAAAz54ukfEkDkX1xhtnlLgvdnGddbHjGQZcYwgVIthHK4Ly3L9VvhswwcZAwAADolF4wFZDASMxIPTqZROq9ZKAgAh%2BQQFAQAHACwAAAAADgAQAAADPHi6V8VQORcPIW0eY9a92cZ11seMZBlxyjBUjOvCrUzXNyMIURAsux3D51MEeQDAgfgzIpPKYgSqvCUhCQAh%2BQQFAQAHACwAAAAAEAAQAAADPni6Z8aQORdXKW3Wc2%2FeXAcy3ngQxBgEJ5pW6%2Bq%2BUcyiKrsMQwQAEB6P8fsxhD2B4FAEHpPKpXETXZoOykoCACH5BAUBAAcALAAAAgAQAA4AAAM%2BeGqmfiG8w9iL8dXmsNTc9SlFMU0AcJTlqaQpa7qw2rqv6hDEKQgTHu%2Fx%2Bz2EvcHgUAQek8qlERdd4h5KVwIAIfkEBQEABwAsAAAAABAAEAAAAz54uhfBkDkX43wA1EVz3oyngcu3GAYpCAeKbuvqplXMvuDKFEU0DBAej%2FH77YQHAuFQBB6TyqVxE12SFMpKAgA7';



/**

 * Modifies Blogger's edit post page to append a button to the html editing bar.

 * This button acts as a control for a geo insertion dialog.

 */

function modifyPage() {

    var htmlBarPreviewAction = $('htmlbar_PreviewAction');

    if (htmlBarPreviewAction) {

        var geoButton = document.createElement('span');

        geoButton.setAttribute('id', 'htmlbar_GeoButton');

        geoButton.setAttribute('title', 'Add geo microformat');

        geoButton.setAttribute('style', 'width:18px');

        geoButton.addEventListener('mousedown', geoButtonMouseDownHandler, false);

        geoButton.addEventListener('mouseup', geoButtonMouseUpHandler, false);

        geoButton.addEventListener('mouseout', geoButtonMouseOutHandler, false);

        geoButton.addEventListener('mouseover', geoButtonMouseOverHandler, false);

        geoButton.innerHTML = '<img style="margin:2px 0px 2px 0px;" src="' + BUTTON_ICON + '"/>';

        var separator = document.createElement('div');

        separator.setAttribute('class', 'vertbar');

        separator.innerHTML = '<span class="g">&nbsp;</span><span class="w">&nbsp;</span>';

        htmlBarPreviewAction.parentNode.insertBefore(geoButton, htmlBarPreviewAction);

        htmlBarPreviewAction.parentNode.insertBefore(separator, htmlBarPreviewAction);

        var geoForm = createGeoFormDiv();

        htmlBarPreviewAction.parentNode.parentNode.appendChild(geoForm);

        geoForm.style.top = (geoButton.offsetTop + geoButton.offsetHeight) + 'px';

        linkGeoFormEvents(geoForm);

    }

}



/**

 * Handles mousedown event for the button inserted in the html editing bar

 * of Blogger's edit post pages. Mimics other buttons' behaviour.

 * 

 * @param event A mousedown event.

 */

function geoButtonMouseDownHandler(event) {

    unsafeWindow.CheckFormatting(event);

    unsafeWindow.ButtonMouseDown(this);

}



/**

 * Handles mouseup event for the button inserted in the html editing bar

 * of Blogger's edit post pages. Reveals unit insertion dialog.

 * 

 * @param event A mouseup event.

 */

function geoButtonMouseUpHandler(event) {

    var geoFormDiv = $('geoForm');

    var geoButton = $('htmlbar_GeoButton');

    if (geoFormDiv) {

        $('htmlbar_GeoButton').style.backgroundColor = '#f5ede3';

        geoFormDiv.style.display = 'block';

        var geoForm = $('insertGeoForm');

        var textarea = $('textarea');

        $('insertGeoLocation').value = getSelection(textarea);

        $('insertGeoLocation').focus();

        checkOkActivation();

    }

}



/**

 * Handles mouseout event for the button inserted in the html editing bar

 * of Blogger's edit post pages. Mimics other buttons' behaviour.

 * 

 * @param event A mouseout event.

 */

function geoButtonMouseOutHandler(event) {

    unsafeWindow.ButtonHoverOff(this);

}



/**

 * Handles mouseover event for the button inserted in the html editing bar

 * of Blogger's edit post pages. Mimics other buttons' behaviour.

 * 

 * @param event A mouseover event.

 */

function geoButtonMouseOverHandler(event) {

    unsafeWindow.ButtonHoverOn(this);

}



/**

 * Handles gei insertion dialog confirmation event.

 *

 * @param event An event signalling confirmation (the 'Ok' button was pressed).

 */

function insertGeoFormOk(event) {

    var geoForm = $('insertGeoForm');

    var location = $('insertGeoLocation').value;

    jsonQuery(location);

    enableDialog(false);

}



/**

 * Handles geo insertion dialog cancellation event.

 *

 * @param event An event signalling cancellation (i.e. the 'Cancel' button was pressed).

 */

function insertGeoFormCancel(event) {

    var geoForm = $('insertGeoForm');

    geoForm.reset();

    geoForm.parentNode.style.display = 'none';

    $('htmlbar_GeoButton').style.backgroundColor = '#e1d4c0';

    $('textarea').focus();

    enableDialog(true);

}



/**

 * Verifies 'Ok' button activation for the geo insertion dialog. This

 * button should only be active whenever there is some location (text)

 * specified in the insertGeoLocation field.

 */

function checkOkActivation() {

    var geoForm = $('insertGeoForm');

    var location = $('insertGeoLocation').value;

    $('geoOkButton').disabled = location.length == 0;

}



/**

 * Handles global enabling/disabling for the geo insertion dialog.

 *

 * @param enable    true to enable, false to disable

 */

function enableDialog(enable) {

    $('insertGeoLocation').disabled = !enable;

    $('geoOkButton').disabled = !enable;

    $('geoCancelButton').disabled = !enable;

}



/**

 * Creates a div containing the geo insertion dialog.

 *

 * @return Container element for the geo insertion dialog.

 */

function createGeoFormDiv() {

    var geoForm = document.createElement('div');

    geoForm.setAttribute('id', 'geoForm');

    geoForm.setAttribute('style', 'position:absolute;display:none;background-color:#f5ede3;border-width:2px;border-top-color:#f5ede3;border-right-color:#cccccc;border-bottom-color:#cccccc;border-left-color:#cccccc;border-top-style:solid;border-right-style:solid;border-bottom-style:solid;border-left-style:solid;width:300px');

    geoForm.innerHTML = '<style type="text/css">#insertGeoForm{width:300px;margin-bottom:3em;}#insertGeoForm fieldset{border-color:black white white;border-style:solid;border-width:1px 0pt 0pt;display:block;margin:0pt 0pt 1em;padding:0pt 1em 0em;}#insertGeoForm input {display:block;left:8em;position:relative;top:-1.4em;}#insertGeoForm input.submit {clear:both;top:0pt;}#insertGeoForm label {clear:both;display:block;float:left;font-weight:bold;margin-top:-1em;width:8em;}#insertGeoForm label.first {margin-top:0.5em;}#insertGeoForm #geoButtonBlock {float:right;margin-top:1.4em;margin-right:10em;}#insertGeoForm #geoButtonBlock input {display:inline;position:relative;}#insertGeoForm textarea {width:250%;height:100%;}</style><form id="insertGeoForm"><fieldset><legend>Geolocation</legend><label class="first" for="insertGeoLocation">Location:<textarea id="insertGeoLocation" tabindex="201"></textarea></label></fieldset><div id="geoButtonBlock"><input id="geoOkButton" type="button" value="Ok" tabindex="202" disabled="true" /><input id="geoCancelButton" type="button" value="Cancel" tabindex="203" /></div></form>';

    return geoForm;

}



/** 

 * Wires up various events to components of the geo insertion dialog and

 * others on the post edit page, namely:

 *  'geoOkButton' (geo insertion dialog confirmation button): click event

 *  'geoCancelButton' (geo insertion dialog cancellation button): click event

 *  'insertGeoLocation' (geo insertion dialog location text box): keyup event,

 *      to verify 'geoOkButton' activation status

 *  'ShowRichEditor' (edit post page rich editor mode activation control tab): 

 *      mousedown event, performing the same as 'geoCancelButton'

 *  'htmlbar' (edit post page html control bar): mousedown event, performing

 *      the same as 'geoCancelButton'

 */

function linkGeoFormEvents() {

    $('geoOkButton').addEventListener('click', insertGeoFormOk, true);

    $('geoCancelButton').addEventListener('click', insertGeoFormCancel, true);

    $('insertGeoLocation').addEventListener('keyup', checkOkActivation, true);

    $('ShowRichEditor').addEventListener('mousedown', insertGeoFormCancel, true);

    $('htmlbar').addEventListener('mousedown', insertGeoFormCancel, true);

}



/**

 * Inserts some text at the current caret position for a textarea.

 *

 * @param textarea  Textarea to use as text destination.

 * @param text      Text to insert.

 */

function insertAtCursor(textarea, text) {

    var startPos = textarea.selectionStart;

    var endPos = textarea.selectionEnd;

    textarea.value = textarea.value.substring(0, startPos) + 

        text + 

        textarea.value.substring(endPos, textarea.value.length);

}



/**

 * Returns the currently selected text in a textarea.

 * 

 * @param textarea  Textarea to use as text source.

 * @return Selected text inside the textarea.

 */

function getSelection(textarea) {

    var startPos = textarea.selectionStart;

    var endPos = textarea.selectionEnd;

    return textarea.value.substring(startPos, endPos);

}



// Handle for query timeout function

var timeoutHandle = null;

// Timeout default interval in ms

var TIMEOUT_INTERVAL = 50000;

// Id for wait indicator

var WAIT_ELEM_ID = 'geoWait';

// Backup for document body's cursor style

var body_cursor_bak = 'default';



/**

 * Shows a waiting symbol on the geo insertion dialog.

 */

function wait() {

    var waitElem = $(WAIT_ELEM_ID);

    if (!waitElem) {

        waitElem = document.createElement('div');

        waitElem.setAttribute('id', WAIT_ELEM_ID);

        waitElem.setAttribute('style', 'position:absolute;width:100px;height:20px;left:15px;top:110px;');

        waitElem.innerHTML = '<img style="width:16px;height:16px;margin:2px 0px 2px 0px;" src="' + WAIT_ICON + '"/> Please wait...';

        $('geoForm').appendChild(waitElem);

    }

    waitElem.style.display = 'block';

    body_cursor_bak = document.getElementsByTagName('body')[0].style.cursor;

    document.getElementsByTagName('body')[0].style.cursor = 'wait';

}



/**

 * Handles query timeouts, logging them and cancelling the form.

 */

function doTimeout() {

    alert('There was a timeout trying to fetch pipes data.');

    GM_log('Timeout fetching pipes data.');

    $(WAIT_ELEM_ID).style.display = 'none';

    document.getElementsByTagName('body')[0].style.cursor = body_cursor_bak;

    insertGeoFormCancel();

}



/**

 * Perform a Yahoo Pipes JSON query to geolocate the contents of a string.

 * 

 * @param location  String describing a place to geolocate.

 */

function jsonQuery(location) {

    GM_xmlhttpRequest({

        method: 'GET',

        url: 'http:/\/pipes.yahoo.com/pipes/pipe.run?_id=hiarPkFY3RG_7I3p1fC6Jw&_render=json&_callback=jsonResponse&location=' + location.replace(' ', '+'),

        headers: {

            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'

        },

        onload: function(response) {

            eval(response.responseText);

        },

        onerror: function(response) {

            alert('There was an error fetching pipes data (status code ' + response.status + ').');

            GM_log('Error fetching pipes data:');

            GM_log('  status code: ' + response.status);

            GM_log('  status message: ' + response.statusText);

            insertGeoFormCancel();

        },

        onreadystatechange: function(response) {

            if (response.readyState > 3 && timeoutHandle != null) {

                clearTimeout(timeoutHandle);

            }

        }

    });

    timeoutHandle = setTimeout(doTimeout, TIMEOUT_INTERVAL);

    wait();

}



/**

 * Processes a JSON formatted Yahoo Pipes data feed.

 *

 * @param feed  JSON value representing a Yahoo Pipes data feed.

 */

function jsonResponse(feed) {

    if (feed && feed.value && feed.value.items && feed.value.items.length > 0) {

        // here we shall generate geo (or adr) uFormat

        var locationName = document.getElementById('insertGeoLocation').value;

        var geoUFormat = '';

        var lat = feed.value.items[0].lat;

        var lon = feed.value.items[0].lon;

        if (lat != null && lon != null) {

            insertAtCursor(

                document.getElementById('textarea'), 

                createGeoMicroformat(locationName, lat, lon));

        }

    }

    $(WAIT_ELEM_ID).style.display = 'none';

    document.getElementsByTagName('body')[0].style.cursor = body_cursor_bak;

    insertGeoFormCancel();

}



/**

 * Create a HTML geo microformat.

 *

 * @param locationName  Location name to tag with the geo microformat

 * @param latitude      Latitude, given in signed decimal degrees

 * @param longitude     Longitude, given in signed decimal degrees

 * @return String describing a geo microformat for the given location.

 */

function createGeoMicroformat(locationName, latitude, longitude) {

    return '<span class="geo">' +

        locationName +

        ' (' +

        '<abbr class="latitude" title="' + latitude + '">' +

        getDMS(latitude, true) +

        '</abbr> ' +

        '<abbr class="longitude" title="' + longitude + '">' +

        getDMS(longitude, false) +

        '</abbr>' +

        ')</span>';    

}



/**

 * Converts a latitude/longitude value expressed as decimal degrees to a string

 * DMS sexagesimal format.

 * 

 * @param value Signed decimal degrees to convert

 * @param isLat true if value represents a latitude, false if it is a longitude

 * @return String with format DDDºMM'SS"

 */

function getDMS(value, isLat) {

    var direction = isLat ?

        (value < 0 ? 'S' : 'N') :

        (value < 0 ? 'W' : 'E');

    var degFloat = Math.abs(value);

    var deg = Math.floor(degFloat);

    var minFloat = 60 * (degFloat - deg);

    var min = Math.floor(minFloat);

    var sec = Math.round(60 * (minFloat - min));

    return deg + 'º' + min + '\'' + sec + '\"' + ' ' + direction;

}
