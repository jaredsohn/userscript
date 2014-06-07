///////////////////////////////////////////////////////////////////////////////
//
// This is a Greasemonkey user script.
//
// Last.fm Playlist and Tag Manager
// Version 1.16, 2010-11-06
// Coded by Maarten van Egmond.  See namespace URL below for contact info.
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name        Last.fm Playlist and Tag Manager
// @namespace   http://userscripts.org/users/64961
// @author      Maarten
// @version     1.16
//
// @description v1.16: Complete playlist/tag management: create, add, copy, merge, convert and delete.  Export tracks to tab-separated text output.  Import tracks in one go rather than searching for and adding them one-by-one.
//
// @include     http://*last*fm*/group/*/charts*subtype=track*
// TODO: @include     http://*last*fm*/music/*/+charts*
// TODO: @exclude     http://*last*fm*/music/*/+charts*subtype=album*
// @include     http://*last*fm*/music/*/_/*/+similar
// TODO: @include     http://*last*fm*/music/*/+tracks*
// @include     http://*last*fm*/tag/*/tracks
// @include     http://*last*fm*/user/*/charts*subtype=track*
// @include     http://*last*fm*/user/*/library/banned*
// @include     http://*last*fm*/user/*/library/loved*
// @include     http://*last*fm*/user/*/library/playlists/*_*
// @include     http://*last*fm*/user/*/library/tags?tag=*
// @include     http://*last*fm*/user/*/library/tags?*&tag=*
// @include     http://*last*fm*/user/*/tracks*
//
// The includes below are for removing playlists and tags.
// Note: remove buttons clutter the tag cloud view, so only the list view
// will have the remove buttons.
// @include     http://*last*fm*/user/*/library/playlists
// @include     http://*last*fm*/user/*/library/tags?*sortOrder=*view=list*
// @include     http://*last*fm*/user/*/library/tags?*view=list*sortOrder=*
// ==/UserScript==
//
// TODO: the TODO's above all don't work because tracks on those pages do not
//       have an artist in the page source (they are tracks for one and the
//       same artist).
//
///////////////////////////////////////////////////////////////////////////////
//
// For install, uninstall, and known issues, see the namespace link above.
//
///////////////////////////////////////////////////////////////////////////////
//
// This script will generate a Last.fm playlist or tag from a user's direct
// text input, or from an existing playlist or tag.
// When collecting tracks, it'll favor streamable tracks. If multiple tracks
// match the user input, it'll pick the first streamable track in the list.
// If there is no streamable track, it'll pick the first track in the list,
// unless the "streamable only" box is checked, then it'll skip the track.
//
///////////////////////////////////////////////////////////////////////////////
//
// The code mimics a work queue.  There are work units to be done, and a
// sequence of steps is required to process one work unit.  This pattern can
// be used to do any kind of work, as long as the total number of work units
// is known beforehand.  (If it is not known how many work units there are
// beforehand, we could use some form of page scraping.)  To customize this
// script to fit a different kind of work load, just re-implement these
// functions:
//     assertScriptIsRunnable
//     captureStartState
//     addWorkQueueItems
//     doWork
//     captureEndState
//
// Other than that there are some hardcoded strings in the GUI itself,
// which can be changed in this function:
//     buildGui
//
// Note: There is a delay of 500ms between each XHR request.  When used to 
//       contact Last.fm servers, any value lower than that causes some
//       queries to return zero results.  You may have to tweak that value
//       if you customize this script for your own needs.
//
///////////////////////////////////////////////////////////////////////////////

// Satisfy JSLint.
/*global alert, clearTimeout, confirm, document, GM_registerMenuCommand, GM_xmlhttpRequest, location, setTimeout */

// Singleton pattern.
var LastfmPlaylistAndTagManager = (function () {
    //
    // Private variables
    //
    var MAX_TRACKS = 200;
    var SCRIPT_OUTPUT_IMPORT = false;
    var YAHOO_MUSIC_PLAYLIST = false;
    var STREAMABLE_TRACKS_ONLY = false;
    var PROCESS_ALL_PAGES = true;
    var XHR_REQUEST_DELAY = 500;
    var LET_FUNCTION_EXIT_DELAY = 100;
    var startTime = 0;
    var addedTracks = 0;
    var skippedTracks = 0;
    var formToken = null;
    var workQueue = [];
    var workQueueIndex = 0;
    var maxWorkQueueSize = Infinity;
    var timer = null;
    var stop = false;
    var user = null;
    var userUrl = null;
    var targetUrl = null;
    var encTargetTag = null;
    var delayedAssert = false;
    var outputAreaId = 'outputArea';
    var progressAreaId = 'progress';

    var IMPORT_PLAYLIST_OPTION = 0;
    var IMPORT_TAG_OPTION = 1;
    var IMPORT_RAW_TEXT_OPTION = 2;
    var EXPORT_NEW_PLAYLIST_OPTION = 3;
    var EXPORT_PLAYLIST_OPTION = 4;
    var EXPORT_NEW_TAG_OPTION = 5;
    var EXPORT_TAG_OPTION = 6;
    var EXPORT_RAW_TEXT_OPTION = 7;
    var REMOVE_TAG_OPTION = 100;
    var selectedOrigin = -1;

    //
    // Private functions
    //

    // Add support for document.getElementsByClassName, e.g. for FF2.
    function customGetElementsByClassName(elt, tag, name) {
        if ("undefined" === typeof elt.getElementsByClassName) {
            var result = [];

            if (undefined === tag) { 
                alert('Internal error: must pass tag name!');
            } else {
                var elts = elt.getElementsByTagName(tag);
                for (var ii = 0; ii < elts.length; ii++) {
                    if (elts[ii].className === name) {
                        result.push(elts[ii]);
                    }
                }
            }

            return result;
        } else {
            return elt.getElementsByClassName(name);
        }
    }

    function setButtonStates(startState, stopState) {
        var button = document.getElementById('startButton');
        if (startState) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', true);
        }

        button = document.getElementById('stopButton');
        if (stopState) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', true);
        }
    }

    // Adds a message to the user-readable output area.
    function addOutput(msg) {
        var output = document.getElementById(outputAreaId);
        if ('textarea' === output.tagName.toLowerCase()) {
            output.value += msg + "\n";

            // Move cursor to the end of the output area.
            output.scrollTop = output.scrollHeight;
        } else {
            output.innerHTML = msg;
        }
    }

    // Sets the message in the user-readable progress area.
    function updateProgress(msg) {
        var output = document.getElementById(progressAreaId);
        output.innerHTML = msg;
    }

    function captureEndState(forced, showDone) {
        // Inform the user about what happened.
        if (forced) {
            addOutput("Stopped.");
            var msg = 'Stopped.';
            if (targetUrl) {
                if (targetUrl === document.URL) {
                    msg += ' Reload this page';
                } else {
                    msg += ' Load ' + targetUrl;
                }
                msg += ' to see which tracks were added.';
            }
            alert(msg);
        } else if (showDone) {
            var endTime = (new Date()).getTime();
            addOutput("Done.\nProcessed " + workQueueIndex +
                    " tracks.  Added " + addedTracks + " tracks.  Skipped " +
                    skippedTracks + " tracks.\nScript took " +
                    Math.round((endTime - startTime) / 1000) + " seconds.");

            if (targetUrl === document.URL) {
                alert('Done.\n' +
                        'Reload this page to verify all tracks ' +
                        '(and the right tracks) were added.');
            } else {
                addOutput('Tracks added to: ' + targetUrl);
                alert('Done.\n' +
                        'Load the URL at the end of the Status/Errors area ' +
                        'in a new tab\n' +
                        'and verify all tracks (and the right tracks) ' +
                        'were added.');
            }
        } else {
            alert('Done.');
        }
    }

    function stopWorking(forced, showDone) {
        // Stop any delayed jobs.
        clearTimeout(timer);
        timer = null;

        // Clear work queue.
        workQueue = [];

        // Reset button states.
        setButtonStates(true, false);

        if (!forced) {
            // Clear progress indicator.
            updateProgress('');
        }

        captureEndState(forced, showDone);
    }

    // Event handler for the Stop button.
    function stopScript() {
        stop = true;

        // Prevent the user from pressing the Stop button again.
        setButtonStates(true, false);

        stopWorking(true, true);
    }

    function html_entity_decode(str) {
        var elt = document.createElement('textarea');
        elt.innerHTML = str.replace(/</g, '<').replace(/>/g, '>');
        var result = elt.value;
        elt = null;
        return result;
    }

    function selectRadioButton(id) {
        var radio = document.getElementById(id);
        radio.checked = true;
    }

    function selectImportPlaylistOption() {
        selectRadioButton('importPlaylistOption');
    }

    function selectImportTagOption() {
        selectRadioButton('importTagOption');
    }

    function selectImportRawTextOption() {
        selectRadioButton('importRawTextOption');
    }

    function selectExportNewPlaylistOption() {
        selectRadioButton('exportNewPlaylistOption');
    }

    function selectExportPlaylistOption() {
        selectRadioButton('exportPlaylistOption');
    }

    function selectExportNewTagOption() {
        selectRadioButton('exportNewTagOption');
    }

    function selectExportTagOption() {
        selectRadioButton('exportTagOption');
    }

    // Extracts information about the signed in user, if any.
    function setUserInfo() {
        // Extract signed in user name.
        var elt = document.getElementById('idBadgerUser');
        if (elt) {
            // elt.href is something like http://www.last.fm/user/<username>
            user = elt.href.substring(elt.href.lastIndexOf('/') + 1);
        }

        if (user !== null) {
            // Extract signed in user home page URL.
            userUrl = document.URL;
            var thirdSlashIndex = 
                    userUrl.indexOf('/', userUrl.indexOf("://") +
                    "://".length);
            if (thirdSlashIndex > 0) {
                userUrl = userUrl.substring(0, thirdSlashIndex);
            }
            userUrl += "/user/" + user;
        }
    }

    // Determines if the current page is the user's playlists list page.
    function pageIsUsersPlaylistsList() {
        // The playlists list URL looks like
        // http://www.last.fm/user/<user>/library/playlists
        return document.URL === userUrl + "/library/playlists";
    }

    // Determines if the current page is someone else's playlists list page.
    function pageIsSomeoneElsesPlaylistsList() {
        // The playlists list URL looks like
        // http://www.last.fm/user/<user>/library/playlists
        return !pageIsUsersPlaylistsList() &&
                /^http.*?\/user\/.*?\/library\/playlists$/.test(document.URL);
    }

    // Determines if the current page is the user's tags list page.
    function pageIsUsersTagsList() {
        // The tags list URL looks like
        // http://www.last.fm/user/<user>/library/tags?view=list&sortOrder=
        return (document.URL.indexOf(userUrl + "/library/tags?") === 0) &&
                (document.URL.indexOf('view=list',
                document.URL.lastIndexOf('?')) > 0) &&
                (document.URL.indexOf('sortOrder=',
                document.URL.lastIndexOf('?')) > 0);
    }

    // Determines if the current page is someone else's tags list page.
    function pageIsSomeoneElsesTagsList() {
        // The tags list URL looks like
        // http://www.last.fm/user/<user>/library/tags?view=list&sortOrder=
        return !pageIsUsersTagsList() &&
                /^http.*?\/user\/.*?\/library\/tags?.*?view=list/.test(
                document.URL) &&
                /^http.*?\/user\/.*?\/library\/tags?.*?sortOrder=/.test(
                document.URL);
    }

    // Determines if the current page is one of the user's playlists.
    function pageIsUserPlaylist() {
        // A playlist URL looks like
        // http://www.last.fm/user/<user>/library/playlists/<id>_<name>
        return (document.URL.indexOf(userUrl + "/library/playlists/") === 0) &&
                (document.URL.indexOf('_', document.URL.lastIndexOf('/')) > 0);
    }

    // Determines if the current page is one of the user's tags.
    function pageIsUserTag() {
        // A tag URL looks like
        // http://www.last.fm/user/<user>/library/tags?tag=<tag>[&...]
        return (document.URL.indexOf(userUrl + "/library/tags") === 0) &&
                (document.URL.indexOf('?tag=') > 0 ||
                 document.URL.indexOf('&tag=') > 0);
    }

    // Determines if the current page contains any tracks.
    function pageContainsTracks() {
        var elts = customGetElementsByClassName(document, 'td',
                'playbuttonCell');
        return elts.length > 0;
    }
    
    function extractTagFromUrl(url) {     
        var result = null;

        var regex = /[\?\&]tag=(.*?)\&/;
        if (regex.test(url)) {
            result = RegExp.$1;
        } else {
            regex = /[\?\&]tag=(.*?)$/;
            if (regex.test(url)) {
                result = RegExp.$1;
            } else {
                alert('There is a problem: no tag found in url: ' + url + '\n' +
                        'Cannot run script; this may be a bug.\n' +
                        'Please contact the script\'s author to fix this.');
            }
        }

        return result;
    }

    function setPageColor() {
        var elt = document.getElementById('scriptContainer');
        if (elt) {
            var color = "D51007";
            var colorToggle = document.getElementById('colourToggle');
            if (colorToggle) {
                if (colorToggle.text === 'Simply Red') {
                    color = "696969";
                }
            }
            elt.setAttribute('style', 'border: 10px solid #' + color +
                    '; padding: 1em; margin-top: 3em');
        }
    }

    function trim(str) {
        return str.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
    }

    function getNextLink(elt, ignoreProcessAllPagesOption) {
        var result;

        if (ignoreProcessAllPagesOption || PROCESS_ALL_PAGES) {
            var nextLinks = customGetElementsByClassName(elt, 'a', 'nextlink');
            if (nextLinks && nextLinks.length > 0) {
                result = nextLinks[0].href;
            }
        }

        return result;
    }

    function preStartScript() {
        // Assume we do not need to retrieve formtokens from another page.
        delayedAssert = false;

        // Now start the script.
        startScript();
    }

    function addTitleRow(table) { 
        var tr = document.createElement('tr');
        var td = document.createElement('th');
        td.setAttribute('colspan', '2');
        td.setAttribute(
                'style', 'font-size: larger; font-weight: bold; ' +
                'text-align: center;');
        td.appendChild(document.createTextNode(
                'Last.fm Playlist and Tag Manager'));
        td.appendChild(document.createElement('br'));
        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
        table.appendChild(tr);
    }

    function addHeaderRow(table, numBrTags, text, styles) {
        // Init optional styles parameter.
        styles = styles || '';

        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.setAttribute('colspan', '2');
        td.setAttribute('style', 'font-size: larger;' + styles);
        while (numBrTags-- > 0) {
            td.appendChild(document.createElement('br'));
        }
        td.appendChild(document.createTextNode(text));
        tr.appendChild(td);
        table.appendChild(tr);
    }

    function buildNotSignedInGui() {
        var table = document.createElement('table');
        addTitleRow(table);
        addHeaderRow(table, 0, 'Please log in to use this script.');
        return table;
    }

    function addSelectOption(table, radioValue, radioId, radioText,
                              selectId, selectChange, loadingOptionId) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.5em 0.25em 0 0');
        var radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'origin');
        radio.setAttribute('value', radioValue);
        radio.setAttribute('id', radioId);
        td.appendChild(radio);
        tr.appendChild(td);
        td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.25em 0');
        var label = document.createElement('label');
        label.setAttribute('for', radio.id);
        label.appendChild(document.createTextNode(radioText));
        td.appendChild(label);
        var select = document.createElement('select');
        select.setAttribute('id', selectId);
        select.addEventListener('change', selectChange, true);
        var option = document.createElement('option');
        option.setAttribute('value', '');
        option.setAttribute('id', loadingOptionId);
        option.appendChild(document.createTextNode('Loading...'));
        select.appendChild(option);
        td.appendChild(select);
        tr.appendChild(td);
        table.appendChild(tr);
    }

    function addImportCheckbox(table, checked, id, text) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(''));
        tr.appendChild(td);
        td = document.createElement('td');
        td.setAttribute('style', 'padding-top: 0.25em');
        var check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        check.setAttribute('id', id);
        check.addEventListener('change', selectImportRawTextOption, true);
        if (checked) {
            check.setAttribute('checked', 'checked');
        }
        td.appendChild(check);
        var label = document.createElement('label');
        label.setAttribute('for', check.id);
        label.appendChild(document.createTextNode(' ' + text));
        td.appendChild(label);
        tr.appendChild(td);
        table.appendChild(tr);
    }

    function addImportTrackOptions(table) {
        addSelectOption(table, IMPORT_PLAYLIST_OPTION, 'importPlaylistOption',
                'Add tracks from playlist: ', 'importPlaylistSelector',
                 selectImportPlaylistOption, 'importPlaylistInstruction');

        addSelectOption(table, IMPORT_TAG_OPTION, 'importTagOption',
                'Add tracks from tag: ', 'importTagSelector',
                 selectImportTagOption, 'importTagInstruction');

        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.5em 0.25em 0.25em 0');
        var radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'origin');
        radio.setAttribute('value', IMPORT_RAW_TEXT_OPTION);
        radio.setAttribute('id', 'importRawTextOption');
        td.appendChild(radio);
        tr.appendChild(td);
        td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.375em 0 0.25em 0');
        var label = document.createElement('label');
        label.setAttribute('for', radio.id);
        label.appendChild(document.createTextNode(
                'Search for and add the following tracks ' +
                '(one track per line):'));
        td.appendChild(label);
        tr.appendChild(td);
        table.appendChild(tr);

        // Create input area.
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.appendChild(document.createTextNode(''));
        tr.appendChild(td);
        td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.25em 0');
        var text = document.createElement('textarea');
        text.setAttribute('rows', '5');
        text.setAttribute('cols', '110');
        text.setAttribute('style', 'width: 100%');
        text.setAttribute('id', 'rawTextInput');
        text.addEventListener('keypress', selectImportRawTextOption, true);
        td.appendChild(text);
        tr.appendChild(td);
        table.appendChild(tr);

        // Create raw input import options.
        addImportCheckbox(table, SCRIPT_OUTPUT_IMPORT, 'scriptOutputImport',
                'I pasted tracks exported with this script');
        addImportCheckbox(table, YAHOO_MUSIC_PLAYLIST, 'yahooMusicPlaylist',
                'I pasted a Yahoo! Music playlist');
    }

    function addExportTrackOptions(table) {
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.7em 0.25em 0 0');
        var radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'origin');
        radio.setAttribute('value', EXPORT_NEW_PLAYLIST_OPTION);
        radio.setAttribute('id', 'exportNewPlaylistOption');
        td.appendChild(radio);
        tr.appendChild(td);
        td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.25em 0');
        var label = document.createElement('label');
        label.setAttribute('for', radio.id);
        label.appendChild(document.createTextNode(
                'Create a new playlist named: '));
        td.appendChild(label);
        var field = document.createElement('input');
        field.setAttribute('type', 'text');
        field.setAttribute('id', 'newPlaylistName');
        field.setAttribute('size', '68');
        field.addEventListener('change', selectExportNewPlaylistOption, true);
        td.appendChild(field);
        tr.appendChild(td);
        table.appendChild(tr);

        addSelectOption(table, EXPORT_PLAYLIST_OPTION, 'exportPlaylistOption',
                'Add tracks to playlist: ', 'exportPlaylistSelector',
                 selectExportPlaylistOption, 'exportPlaylistInstruction');

        tr = document.createElement('tr');
        td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.7em 0.25em 0 0');
        radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'origin');
        radio.setAttribute('value', EXPORT_NEW_TAG_OPTION);
        radio.setAttribute('id', 'exportNewTagOption');
        td.appendChild(radio);
        tr.appendChild(td);
        td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.25em 0');
        label = document.createElement('label');
        label.setAttribute('for', radio.id);
        label.appendChild(document.createTextNode(
                'Tag tracks as a new tag named: '));
        td.appendChild(label);
        field = document.createElement('input');
        field.setAttribute('type', 'text');
        field.setAttribute('id', 'newTagName');
        field.setAttribute('size', '68');
        field.addEventListener('change', selectExportNewTagOption, true);
        td.appendChild(field);
        tr.appendChild(td);
        table.appendChild(tr);

        addSelectOption(table, EXPORT_TAG_OPTION, 'exportTagOption',
                'Tag tracks as: ', 'exportTagSelector',
                 selectExportTagOption, 'exportTagInstruction');

        tr = document.createElement('tr');
        td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.5em 0.25em 0.25em 0');
        radio = document.createElement('input');
        radio.setAttribute('type', 'radio');
        radio.setAttribute('name', 'origin');
        radio.setAttribute('value', EXPORT_RAW_TEXT_OPTION);
        radio.setAttribute('id', 'exportRawTextOption');
        td.appendChild(radio);
        tr.appendChild(td);
        td = document.createElement('td');
        td.setAttribute('style', 'padding: 0.375em 0 0.25em 0');
        label = document.createElement('label');
        label.setAttribute('for', radio.id);
        label.appendChild(document.createTextNode(
                'Export track information (tab-separated output will appear ' +
                'in the status/errors area below)'));
        td.appendChild(label);
        tr.appendChild(td);
        table.appendChild(tr);
    }

    function addAdditionalOptions(table) {
        addHeaderRow(table, 1, 'Select additional options:',
                'padding-bottom: 0.5em;');

        // Create STREAMABLE_TRACKS_ONLY option.
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var check = document.createElement('input');
        check.setAttribute('type', 'checkbox');
        check.setAttribute('style', 'padding-right: 0.5em');
        check.setAttribute('id', 'streamableTracksOnly');
        if (STREAMABLE_TRACKS_ONLY) {
            check.setAttribute('checked', 'checked');
        }
        td.appendChild(check);
        tr.appendChild(td);
        td = document.createElement('td');
        var label = document.createElement('label');
        label.setAttribute('for', check.id);
        label.appendChild(document.createTextNode(
                'Add streamable tracks only'));
        td.appendChild(label);
        tr.appendChild(td);
        table.appendChild(tr);

        if (undefined !== getNextLink(document, true)) {
            // Create PROCESS_ALL_PAGES option.
            tr = document.createElement('tr');
            td = document.createElement('td');
            check = document.createElement('input');
            check.setAttribute('type', 'checkbox');
            check.setAttribute('style', 'padding-right: 0.5em');
            check.setAttribute('id', 'processAllPages');
            if (PROCESS_ALL_PAGES) {
                check.setAttribute('checked', 'checked');
            }
            td.appendChild(check);
            tr.appendChild(td);
            td = document.createElement('td');
            label = document.createElement('label');
            label.setAttribute('for', check.id);
            label.appendChild(document.createTextNode(
                    'Process all pages after this one as well'));
            td.appendChild(label);
            tr.appendChild(td);
            table.appendChild(tr);
        }
    }

    function addControlsAndOutputArea(table, importOptionsShown) {
        // Create start and stop buttons.
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.setAttribute('style', 'padding-top: 1em');
        td.setAttribute('colspan', '2');
        td.appendChild(document.createElement('br'));
        var button = document.createElement('button');
        button.setAttribute('id', 'startButton');
        button.appendChild(document.createTextNode('Start'));
        button.addEventListener('click', preStartScript, true);
        td.appendChild(button);
        var span = document.createElement('span');
        span.setAttribute('style', 'padding-left: 1em');
        button = document.createElement('button');
        button.setAttribute('id', 'stopButton');
        button.appendChild(document.createTextNode('Stop'));
        button.addEventListener('click', stopScript, true);
        span.appendChild(button);
        td.appendChild(span);
        tr.appendChild(td);
        table.appendChild(tr);

        // Create output area.
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.setAttribute('colspan', '2');
        td.setAttribute('style', 'font-size: larger');
        td.appendChild(document.createElement('br'));

        // Create progress area.
        span = document.createElement('span');
        span.setAttribute('style', 'font-size: smaller; float: right;');
        span.setAttribute('id', progressAreaId);
        td.appendChild(span);

        // Continue with output area.
        td.appendChild(document.createTextNode('Status / Errors:'));
        td.appendChild(document.createElement('br'));
        var text = document.createElement('textarea');
        text.setAttribute('rows', '7');
        text.setAttribute('cols', '110');
        text.setAttribute('style', 'width: 100%');
        text.setAttribute('id', outputAreaId);
        td.appendChild(text);
        tr.appendChild(td);
        table.appendChild(tr);
    }

    function buildSignedInGui() {
        var table = document.createElement('table');

        // Add script title
        addTitleRow(table);

        var spacer = 0;
        if (pageContainsTracks()) {
            addHeaderRow(table, 0, 'Export: copy the tracks on this ' +
                    'page to somewhere else.');
            addExportTrackOptions(table);
            spacer = 1;
        }

        var importOptionsShown = false;
        if (pageIsUserPlaylist()) {
            addHeaderRow(table, spacer,
                    'Import: add tracks to this playlist.');
            addImportTrackOptions(table);
            importOptionsShown = true;
        } else if (pageIsUserTag()) {
            addHeaderRow(table, spacer,
                    'Import: add tracks to this tag.');
            addImportTrackOptions(table);
            importOptionsShown = true;
        }

        addAdditionalOptions(table);
        addControlsAndOutputArea(table, importOptionsShown);

        return table;
    }

    function addOption(selector, optionValue, optionText) {
        var option = document.createElement('option');
        option.setAttribute('value', optionValue);
        option.appendChild(document.createTextNode(optionText));
        selector.appendChild(option);
    }

    function replaceLoadingOption(selector, optionId, optionText) {
        var oldFirst = document.getElementById(optionId);
        var newFirst = document.createElement('option');
        newFirst.setAttribute('value', oldFirst.value);
        newFirst.setAttribute('id', oldFirst.id);
        newFirst.appendChild(document.createTextNode(
                '--- select ' + optionText + ' ---'));
        selector.replaceChild(newFirst, oldFirst);
    }

    function parseTags(text) {
        var importSelector = document.getElementById('importTagSelector');
        var exportSelector = document.getElementById('exportTagSelector');

        // Change message Loading... item.
        if (importSelector) {
            replaceLoadingOption(importSelector, 'importTagInstruction',
                    'tag');
        }
        if (exportSelector) {
            replaceLoadingOption(exportSelector, 'exportTagInstruction',
                    'tag');
        }

        // In JavaScript, "everything until and including a newline" is
        // represented as the expression "(?:.*?\n)*?".  So that matches
        // wherever you are in the string until the end-of-line, and any
        // lines underneath it.  To continue matching on another line,
        // skip into the line first using ".*?".
        var regex = /<a href="\/user\/.*?\/library\/tags\?tag=(.*?)&amp;view=list">(.*?)<\/a>(?:.*?\n)*?.*?(\d+)/gi;
        while (regex.test(text)) {
            var optionValue = RegExp.$1;
            var optionText = html_entity_decode(RegExp.$2) +
                    " (" + RegExp.$3 + " tracks)";
            if (importSelector) {
                addOption(importSelector, optionValue, optionText);
            }
            if (exportSelector) {
                addOption(exportSelector, optionValue, optionText);
            }
        }
    }

    function loadTags() {
        // Pick the right URL so that tags appear sorted by name.
        var url = userUrl + '/library' +
                '/tags?view=list&sortOrder=asc&sortBy=name';

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                parseTags(xhr.responseText);
            }
        });
    }

    function parsePlaylists(text) {
        var importSelector = document.getElementById('importPlaylistSelector');
        var exportSelector = document.getElementById('exportPlaylistSelector');

        // Change message Loading... item.
        if (importSelector) {
            replaceLoadingOption(importSelector, 'importPlaylistInstruction',
                    'playlist');
        }
        if (exportSelector) {
            replaceLoadingOption(exportSelector, 'exportPlaylistInstruction',
                    'playlist');
        }

        var options = [];
        // In JavaScript, "everything until and including a newline" is
        // represented as the expression "(?:.*?\n)*?".  So that matches
        // wherever you are in the string until the end-of-line, and any
        // lines underneath it.  To continue matching on another line,
        // skip into the line first using ".*?".
        var regex = /<strong><a href="\/user\/.*?\/library\/playlists\/(.*?)">(.*?)<\/a><\/strong>(?:.*?\n)*?.*?(\d+) tracks(?:.*?\n)*?.*?(\d+:\d+)/gi;
        while (regex.test(text)) {
            var optionValue = RegExp.$1;
            var optionText = html_entity_decode(RegExp.$2) +
                    " (" + RegExp.$3 + " tracks, " + RegExp.$4 + ")";
            var trackCount = parseInt(RegExp.$3, 10);

            options.push({
                "value": optionValue,
                "text": optionText,
                "count": trackCount
            });
        }

        // Sort options by name.
        var sortFn = function (a, b) {
            return a.text > b.text ? 1 : -1;
        };
        options.sort(sortFn);

        for (var ii = 0; ii < options.length; ii++) {
            if (importSelector) {
                if (0 !== options[ii].count) {
                    addOption(importSelector, options[ii].value,
                            options[ii].text);
                }
            }
            if (exportSelector) {
                addOption(exportSelector, options[ii].value, options[ii].text);
            }
        }
    }

    function loadPlaylists() {
        var url = userUrl + '/library/playlists';

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                parsePlaylists(xhr.responseText);

                var delayed = function () {
                    loadTags();
                };
                timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            }
        });
    }

    function createDomElementAndInvokeFunction(text, fn, tag, id) {
        // Create a DOM node that contains all text.
        var elt = document.createElement('div');
        elt.innerHTML = text;

        // Extract a specific node, if specified.
        if (undefined !== tag && undefined !== id) {
            // Only document.getElementById exists, not elt.getElementById!
            // So, can only search by class name or tag here...
            //elt = elt.getElementById(id);
            var tags = elt.getElementsByTagName(tag);
            if (tags && tags.length > 0) {
                for (var tt = 0; tt < tags.length; tt++) {
                    if (tags[tt].getAttribute('id') === id) {
                        elt = tags[tt];
                        break;   // Because IDs in HTML should be unique.
                    }
                }
            }
        }

        // Call the function.
        fn(elt);
    }

    function getNextPage(url, doneFn, doneTag, doneId) {
        if (stop) {
            return;
        }

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                createDomElementAndInvokeFunction(xhr.responseText, doneFn,
                        doneTag, doneId);
            }
        });
    }

    function removePlaylist(e) {
        var button = e.target;
        var aElt = button.parentNode.getElementsByTagName('a')[0];
        if (confirm('Playlist "' + aElt.innerHTML +
                '" will be permanently deleted.')) {
            // Only one remove operation at a time.
            var buttons = customGetElementsByClassName(document, 'button',
                    'removeButton');
            for (var bb = 0; bb < buttons.length; bb++) {
                buttons[bb].setAttribute('disabled', true);
            }

            // Give an indication of deleted-ness.
            aElt.innerHTML = '<strike>' + aElt.innerHTML + '</strike>';

            // Get formToken.
            var elts = document.getElementsByName('formtoken');
            if (elts && elts.length > 0) {
                formToken = elts[0].value;
            } else {
                var text = document.head;
                var regex = /"formtoken":"(.*?)"/;
                if (regex.test(text)) {
                    formToken = RegExp.$1;
                }
            }

            var url = aElt.href + '/delete';
            var data = 'formtoken=' + formToken;

            GM_xmlhttpRequest({
                'method': 'POST',
                'url': url,
                'data': data,
                'headers': {
                    'Content-Type':
                            'application/x-www-form-urlencoded; charset=UTF-8'
                },
                'onload': function (xhr) {
                    location.reload();
                }
            });
        }
    }

    function removeTag(e) {
        var button = e.target;
        var aElt = button.parentNode.parentNode.getElementsByTagName('a')[0];
        if (confirm('Tag "' + aElt.innerHTML +
                '" will be permanently deleted.')) {
            // Only one remove operation at a time.
            var buttons = customGetElementsByClassName(document, 'button',
                    'removeButton');
            for (var bb = 0; bb < buttons.length; bb++) {
                buttons[bb].setAttribute('disabled', true);
            }

            // Capture start state.
            startTime = (new Date()).getTime();
            addedTracks = 0;
            skippedTracks = 0;
            workQueue = [];
            workQueueIndex = 0;
            maxWorkQueueSize = Infinity;
            stop = false;
            targetUrl = aElt.href;
            encTargetTag = aElt.innerHTML;

            // Give an indication of deleted-ness.
            aElt.innerHTML = '<strike>' + aElt.innerHTML + '</strike>';

            // Set "selected option".
            selectedOrigin = REMOVE_TAG_OPTION;

            // Set formToken.
            var elts = document.getElementsByName('formtoken');
            if (elts && elts.length > 0) {
                formToken = elts[0].value;
            } else {
                var text = document.getElementsByTagName('head')[0].innerHTML;
                var regex = /"formtoken":"(.*?)"/;
                if (regex.test(text)) {
                    formToken = RegExp.$1;
                }
            }

            // Set options.
            STREAMABLE_TRACKS_ONLY = false;
            PROCESS_ALL_PAGES = true;

            // Set the correct output area.
            outputAreaId = button.value;
            progressAreaId = button.value;

            // Process the first tag page.
            getNextPage(aElt.href, delayedAddWorkQueueItemsForPageOption,
                    'div', 'content');
        }
    }

    // This function adds remove buttons to the playlists or tags on the page.
    function buildRemoveGui() {
        var aa, tbodyElts, elt;
        if (pageIsUsersPlaylistsList()) {
            // The playlist links are coded like:
            // <td class="mainCell">...<strong><a href="url">name</a></strong>
            tbodyElts = document.getElementsByTagName('tbody');
            for (aa = 0; aa < tbodyElts.length; aa++) {
                if ("playlists" === tbodyElts[aa].parentNode.className) {
                    break;
                }
            }
            var tdElts = tbodyElts[aa].getElementsByTagName('td');
            for (aa = 0; aa < tdElts.length; aa++) {
                if ('mainCell' === tdElts[aa].className) {
                    // Get the anchor inside of the td.
                    var aElt = tdElts[aa].getElementsByTagName('a')[0];

                    // Add the remove option.
                    elt = document.createElement('button');
                    elt.addEventListener('click', removePlaylist, true);
                    // Add handle for disabling all remove buttons.
                    elt.setAttribute('class', 'removeButton');
                    elt.setAttribute('style',
                            'font-size: smaller; float: right;');
                    elt.appendChild(document.createTextNode('Delete'));
                    aElt.parentNode.insertBefore(elt, aElt);
                }
            }
        } else if (pageIsUsersTagsList()) {
            // The tag links are coded like:
            // <tbody>...<tr...>...<td>...<a href="url">name</a>
            tbodyElts = document.getElementsByTagName('tbody');
            for (aa = 0; aa < tbodyElts.length; aa++) {
                if ("libraryList" === tbodyElts[aa].parentNode.id) {
                    break;
                }
            }
            var aElts = tbodyElts[aa].getElementsByTagName('a');
            for (aa = 0; aa < aElts.length; aa++) {
                // Add the remove option.
                elt = document.createElement('button');
                elt.addEventListener('click', removeTag, true);
                // Add handle for disabling all remove buttons.
                elt.setAttribute('class', 'removeButton');
                // Add handle for setting the correct output area.
                elt.setAttribute('value', 'outputArea' + aa);
                elt.setAttribute('style', 'font-size: smaller; float: right;');
                elt.appendChild(document.createTextNode('Delete'));
                aElts[aa].parentNode.insertBefore(elt, aElts[aa]);

                // Need an output area as well as a remove button.
                var divElt = document.createElement('div');
                divElt.setAttribute('id', 'outputArea' + aa);
                aElts[aa].parentNode.appendChild(divElt);
            }
        }
    }

    // This function builds the GUI and adds it to the page body.
    function buildGui() {
        // Add options to the Tools->Greasemonkey->User Script Commands menu.
        GM_registerMenuCommand(
                'Start Last.fm Playlist and Tag Manager', preStartScript);
        GM_registerMenuCommand(
                'Stop Last.fm Playlist and Tag Manager', stopScript);

        // Create GUI container.
        var gui = document.createElement('center');
        gui.setAttribute('id', 'scriptContainer');
        gui.setAttribute('style', 'border: 10px solid #D51007; padding: 1em;');

        // Add page color change handler.
        var colorToggle = document.getElementById('colourToggle');
        if (colorToggle) {
            colorToggle.addEventListener('click', setPageColor, true);
        }

        var realGui = null;
        if (null === user) {
            // User is not signed in.
            realGui = buildNotSignedInGui();
        } else {
            realGui = buildSignedInGui();
        }
        gui.appendChild(realGui);

        // Add GUI to the page.
        var content = document.getElementById('content');
        if (!content) {
            content = document.body;
        }
        content.appendChild(gui);

        // The GUI is added to the DOM, so now we can set its color.
        setPageColor();

        if (null !== user) {
            // User is signed in.

            // Set initial button state.
            setButtonStates(true, false);

            // Now populate the select boxes.
            var delayed = function () {
                loadPlaylists();
            };
            timer = setTimeout(delayed, LET_FUNCTION_EXIT_DELAY);
        }
    }

    function extractFormTokenFromPage(text) {
        if (stop) {
            return;
        }

        var regex = /"formtoken":"(.*?)"/;
        if (regex.test(text)) {
            formToken = RegExp.$1;
        }

        // Try again.
        startScript();
    }

    // This function is called before and after selectedOrigin is set, so can't
    // rely on it.  This function works similar to assertScriptIsRunnable.
    function getNumTracksInTargetPlaylist() {
        var result = -1;

        // Only handle playlist target selections.
        var importOptionsShown = pageIsUserPlaylist();
        var exportOptionsShown = pageContainsTracks();
        if (importOptionsShown &&
                (document.getElementById('importPlaylistOption').checked ||
                document.getElementById('importTagOption').checked ||
                document.getElementById('importRawTextOption').checked)) {
            // Add to current playlist page.
            result = customGetElementsByClassName(document, 'td',
                    'position').length;
        } else if (exportOptionsShown &&
                document.getElementById('exportNewPlaylistOption').checked) {
            // Add to new playlist.
            result = 0;
        } else if (exportOptionsShown &&
                document.getElementById('exportPlaylistOption').checked) {
            // Add to existing playlist.
            var selector = document.getElementById('exportPlaylistSelector');
            var text = selector.options[selector.selectedIndex].innerHTML;
            if (/(\d+) tracks/.test(text)) {
                result = parseInt(RegExp.$1, 10);
            }
        }

        return result;
    }

    function delayAssertScriptIsRunnable() {
        // Indicate that the script accepted the user command.
        addOutput("Initializing...");

        var url = userUrl;

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                extractFormTokenFromPage(xhr.responseText);
            }
        });
    }

    function assertScriptIsRunnable() {
        var selector, input, field;
        var importOptionsShown = pageIsUserPlaylist() || pageIsUserTag();
        var exportOptionsShown = pageContainsTracks();
        var needFormToken = true;

        // Make sure there is input.
        if (importOptionsShown &&
                document.getElementById('importPlaylistOption').checked) {
            selector = document.getElementById('importPlaylistSelector');
            input = selector.value;
            if ('' === input) {
                alert('Please select a playlist.');
                return false;
            }
        } else if (importOptionsShown &&
                document.getElementById('importTagOption').checked) {
            selector = document.getElementById('importTagSelector');
            input = selector.value;
            if ('' === input) {
                alert('Please select a tag.');
                return false;
            }
        } else if (importOptionsShown &&
                document.getElementById('importRawTextOption').checked) {
            field = document.getElementById('rawTextInput');
            input = field.value;

            // Check for input.
            if ('' === trim(input)) {
                alert('Please enter tracks in the input area ' +
                        '(one track per line).');
                return false;
            }
        } else if (exportOptionsShown &&
                document.getElementById('exportNewPlaylistOption').checked) {
            field = document.getElementById('newPlaylistName');
            input = field.value;

            // Check for name.
            if ('' === trim(input)) {
                alert('Please enter a playlist name.');
                return false;
            }
        } else if (exportOptionsShown &&
                document.getElementById('exportPlaylistOption').checked) {
            selector = document.getElementById('exportPlaylistSelector');
            input = selector.value;
            if ('' === input) {
                alert('Please select a playlist.');
                return false;
            }
        } else if (exportOptionsShown &&
                document.getElementById('exportNewTagOption').checked) {
            field = document.getElementById('newTagName');
            input = trim(field.value);

            // Check for name.
            if ('' === input) {
                alert('Please enter a tag name.');
                return false;
            }

            // Tags must be shorter than 256 characters and may only contain
            // letters, numbers, hyphens, spaces and colons.
            if (input.length >= 256) {
                alert('Tags must be shorter than 256 characters.');
                return false;
            }
            var regex = /^([a-zA-Z0-9]|-| |:)+$/;
            if (!regex.test(input)) {
                alert('Tags may only contain letters, numbers, hyphens, ' +
                        'spaces and colons.');
                return false;
            }
        } else if (exportOptionsShown &&
                document.getElementById('exportTagOption').checked) {
            selector = document.getElementById('exportTagSelector');
            input = selector.value;
            if ('' === input) {
                alert('Please select a tag.');
                return false;
            }
        } else if (exportOptionsShown &&
                document.getElementById('exportRawTextOption').checked) {
            // No additional input needed.
            needFormToken = false;
        } else {
            if (importOptionsShown && exportOptionsShown) {
                alert('Please select an import or export option.');
            } else if (importOptionsShown) {
                alert('Please select an import option.');
            } else if (exportOptionsShown) {
                alert('Please select an export option.');
            }
            return false;
        }
 
        // If target is a playlist, make sure it's not already full.
        if (getNumTracksInTargetPlaylist() >= MAX_TRACKS) {
            if (importOptionsShown && pageIsUserPlaylist() &&
                    (document.getElementById('importPlaylistOption').checked ||
                    document.getElementById('importTagOption').checked ||
                    document.getElementById('importRawTextOption').checked)) {
                alert('Last.fm only allows ' + MAX_TRACKS +
                        ' tracks in a playlist.  ' +
                        'No tracks can be added to this page.');
                return false;
            } else if (exportOptionsShown &&
                    document.getElementById('exportPlaylistOption').checked) {
                alert('Last.fm only allows ' + MAX_TRACKS +
                        ' tracks in a playlist.  ' +
                        'Please select a different playlist.');
                return false;
            }
        }
    
        if (needFormToken) {
            var formtokens = document.getElementsByName('formtoken');

            if (formToken) {
                // Skip if formToken already set (via delayedAssert).
            }

            // Else make sure there is a form token.
            else if (!formtokens ||
                    0 === formtokens.length ||
                    '' === formtokens[0].value) {
                // No form token.  If we're not on a user playlist or tag page, 
                // try getting it from the user's home page.
                // But only if we're not already in delayedAssert mode.
                if (!delayedAssert &&
                        !(pageIsUserPlaylist() || pageIsUserTag())) {
                    delayedAssert = true;

                    var delayed = function () {
                        delayAssertScriptIsRunnable();
                    };
                    timer = setTimeout(delayed, LET_FUNCTION_EXIT_DELAY);
                } else {
                    alert('There is a problem: no formtoken field found.\n' +
                            'Cannot run script; the Last.fm page source may ' +
                            'have changed.\n' + 'Please contact the ' +
                            'script\'s author to fix this.');
                }

                // Return false either way.
                return false;
            }
        }

        // All ok.
        return true;
    }

    function targetUrlIsPlaylist() {
        var result = false;

        switch (selectedOrigin) {
        case IMPORT_PLAYLIST_OPTION :
        case IMPORT_TAG_OPTION :
        case IMPORT_RAW_TEXT_OPTION :
            // Import options can be playlist or tag.
            result = pageIsUserPlaylist();
            break;

        case EXPORT_NEW_PLAYLIST_OPTION :
        case EXPORT_PLAYLIST_OPTION :
            result = true;
            break;
        }

        return result;
    }

    function getMaxWorkQueueSize() {
        var result = Infinity;

        var num = getNumTracksInTargetPlaylist();
        if (-1 !== num) {
            // Target is indeed a playlist.
            result = MAX_TRACKS - num;
        }

        return result;
    }

    function captureStartState() {
        startTime = (new Date()).getTime();
        addedTracks = 0;
        skippedTracks = 0;
        workQueue = [];
        workQueueIndex = 0;
        maxWorkQueueSize = getMaxWorkQueueSize();
        stop = false;
        targetUrl = null;
        encTargetTag = null;

        var elts = document.getElementsByName('origin');
        for (var idx in elts) {
            if (elts[idx].checked) {
                selectedOrigin = parseInt(elts[idx].value, 10);
                break;
            }
        }

        // Get checkbox options.
        var elt = document.getElementById('scriptOutputImport');
        if (elt) {   // Only visible if import options are shown.
            SCRIPT_OUTPUT_IMPORT = elt.checked;
        }
        elt = document.getElementById('yahooMusicPlaylist');
        if (elt) {   // Only visible if import options are shown.
            YAHOO_MUSIC_PLAYLIST = elt.checked;
        }
        STREAMABLE_TRACKS_ONLY =
                document.getElementById('streamableTracksOnly').checked;
        if (undefined !== getNextLink(document, true)) {
            PROCESS_ALL_PAGES =
                    document.getElementById('processAllPages').checked;
        }

        elts = document.getElementsByName('formtoken');
        if (elts && elts.length > 0) {
            formToken = elts[0].value;
        }
    }

    function addToWorkQueue(item) {
        var result = true;

        if (targetUrlIsPlaylist() &&
                workQueue.length >= maxWorkQueueSize) {
            // Queue is full.
            result = false;

            addOutput("Note: Last.fm only allows " + MAX_TRACKS +
                    " tracks in a playlist.  The script will stop after" +
                    " adding " + maxWorkQueueSize + " tracks.");
        } else {
            workQueue.push(item);
        }

        return result;
    }

    function addWorkQueueItems() {
        var selector, field, name, url, elt;
        var showMsg = true;
        var delayed = null;

        if (IMPORT_PLAYLIST_OPTION === selectedOrigin) {
            // Target URL is always current URL for import options.
            targetUrl = document.URL;

            if (pageIsUserTag()) {
                encTargetTag = extractTagFromUrl(document.URL);
            }

            selector = document.getElementById('importPlaylistSelector');
            url = userUrl + '/library/playlists' + "/" + selector.value;

            delayed = function () {
                addWorkQueueItemsForPageOption(url);
            };
        } else if (IMPORT_TAG_OPTION === selectedOrigin) {
            // Target URL is always current URL for import options.
            targetUrl = document.URL;

            if (pageIsUserTag()) {
                encTargetTag = extractTagFromUrl(document.URL);
            }

            selector = document.getElementById('importTagSelector');
            url = userUrl + '/library' +
                    '/tags?tag=' + selector.value + '&amp;view=list';

            delayed = function () {
                addWorkQueueItemsForPageOption(url);
            };
        } else if (IMPORT_RAW_TEXT_OPTION === selectedOrigin) {
            // Target URL is always current URL for import options.
            targetUrl = document.URL;

            if (pageIsUserTag()) {
                encTargetTag = extractTagFromUrl(document.URL);
            }

            delayed = function () {
                addWorkQueueItemsForRawTextOption();
            };
        } else if (EXPORT_NEW_PLAYLIST_OPTION === selectedOrigin) {
            // Target URL has to be determined first.

            field = document.getElementById('newPlaylistName');
            name = field.value;

            delayed = function () {
                createNewPlaylist(name);
            };
        } else if (EXPORT_PLAYLIST_OPTION === selectedOrigin) {
            // Target URL is always selected URL for export options.
            selector = document.getElementById('exportPlaylistSelector');
            targetUrl = userUrl + '/library/playlists' + "/" + selector.value;

            delayed = function () {
                // Don't just pass the document.body element.
                // Luckily there's a div containing just the items we need.
                elt = document.getElementById('content');
                delayedAddWorkQueueItemsForPageOption(elt);
            };
        } else if (EXPORT_NEW_TAG_OPTION === selectedOrigin) {
            field = document.getElementById('newTagName');
            name = field.value;

            // TODO: is this target URL correct?
            targetUrl = userUrl + '/library' + '/tags?tag=' +
                    encodeURIComponent(name);

            // Items will be added for this target tag later.
            encTargetTag = encodeURIComponent(name);

            delayed = function () {
                // Don't just pass the document.body element.
                // Luckily there's a div containing just the items we need.
                elt = document.getElementById('content');
                delayedAddWorkQueueItemsForPageOption(elt);
            };
        } else if (EXPORT_TAG_OPTION === selectedOrigin) {
            // Target URL is always selected URL for export options.
            selector = document.getElementById('exportTagSelector');
            targetUrl = userUrl + '/library' + '/tags?tag=' + selector.value;

            // Items will be added for this target tag later.
            encTargetTag = selector.value;

            delayed = function () {
                // Don't just pass the document.body element.
                // Luckily there's a div containing just the items we need.
                elt = document.getElementById('content');
                delayedAddWorkQueueItemsForPageOption(elt);
            };
        } else if (EXPORT_RAW_TEXT_OPTION === selectedOrigin) {
            // No target URL necessary.

            // No msg necessary.
            showMsg = false;

            delayed = function () {
                // Don't just pass the document.body element.
                // Luckily there's a div containing just the items we need.
                elt = document.getElementById('content');
                exportTracksOnPage(elt, true);
            };
        }

        if (showMsg) {
            // Indicate that the script accepted the user command.
            addOutput("Processing...");
        }

        if (delayed) {
            timer = setTimeout(delayed, LET_FUNCTION_EXIT_DELAY);
        }
    }

    function delayedAddWorkQueueItemsForPageOption(elt) {
        if (stop) {
            return;
        }

        var id, url, text = elt.innerHTML;

        // Note: both ID and the track URL are used to retrieve additional
        // information about a track, so make sure to grab them both.

        // In JavaScript, "everything until and including a newline" is
        // represented as the expression "(?:.*?\n)*?".  So that matches
        // wherever you are in the string until the end-of-line, and any
        // lines underneath it.  To continue matching on another line,
        // skip into the line first using ".*?".
        var regex = null;
        if (STREAMABLE_TRACKS_ONLY) {
            regex = /<tr class=".*?streamable.*?" id=".*?_(.*?)[_"](?:.*?\n)*?.*?<\/a> . <a href="(\/music\/.*?)"/gi;
        } else {
            regex = /<tr class=".*?" id=".*?_(.*?)[_"](?:.*?\n)*?.*?<\/a> . <a href="(\/music\/.*?)"/gi;
        }

        var sawOne = false;
        var queueFull = false;
        while (regex.test(text)) {
            id = RegExp.$1;
            url = RegExp.$2;
            sawOne = true;
            if (!addToWorkQueue({ "id": id, "url": url })) {
                // Queue full.
                queueFull = true;
                break;
            }
        }

        var delayed, nextLink;
        if (sawOne) {
            // Check if there are more pages to process.
            // Of course, only check if the queue is not already full.
            if (!queueFull) {
                nextLink = getNextLink(elt);
            }
            if (undefined === nextLink) {
                addOutput("Read " + workQueue.length + " tracks.");

                // Now we're ready to do work.
                startWorkQueue();
            } else {
                delayed = function () {
                    getNextPage(nextLink,
                            delayedAddWorkQueueItemsForPageOption,
                            'div', 'content');
                };
                timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            }
        } else {
            // Not all track listing pages have an id embedded... 
            // for those, need to get the ID asynchronously.

            // These regex's are as above, except the id matching is removed.
            if (STREAMABLE_TRACKS_ONLY) {
                regex = /<tr class=".*?streamable.*?"(?:.*?\n)*?.*?<\/a> . <a href="(\/music\/.*?)"/gi;
            } else {
                regex = /<tr class=".*?"(?:.*?\n)*?.*?<\/a> . <a href="(\/music\/.*?)"/gi;
            }

            queueFull = false;
            while (regex.test(text)) {
                id = -1;
                url = RegExp.$1;
                if (!addToWorkQueue({ "id": id, "url": url })) {
                    // Queue full.
                    queueFull = true;
                    break;
                }
            }

            // Check if there are more pages to process.
            // Of course, only check if the queue is not already full.
            if (!queueFull) {
                nextLink = getNextLink(elt);
            }
            if (undefined === nextLink) {
                addOutput("Read " + workQueue.length + " tracks.");

                // Let the user know this might take a while.
                addOutput("Fetching track IDs...");

                // Now we're ready to get the IDs.
                delayed = function () {
                    getTrackId(0, true, startWorkQueue);
                };
                timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            } else {
                delayed = function () {
                    getNextPage(nextLink,
                            delayedAddWorkQueueItemsForPageOption,
                            'div', 'content');
                };
                timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            }
        }
    }

    function addWorkQueueItemsForPageOption(url) {
        if (stop) {
            return;
        }

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                createDomElementAndInvokeFunction(xhr.responseText,
                        delayedAddWorkQueueItemsForPageOption,
                        'div', 'content');
            }
        });
    }

    function buildWorkQueue() { 
        // Add work to the queue.
        addWorkQueueItems();
    }

    function getTrackId(queueIdx, tryAgain, doneFn) {
        if (stop) {
            return;
        }

        if (queueIdx >= workQueue.length) {
            // Now we're ready to do work.
    
            updateProgress('');

            // Call queue processing function.
            doneFn();

            return;
        }

        if (workQueue[queueIdx].id !== -1) {
            // Already have the ID.
            getTrackId(queueIdx + 1, true, doneFn);
        }

        var enc_url = encodeURIComponent(workQueue[queueIdx].url);
        var cachebuster = (new Date()).getTime() % 100;
        var url = 'http://www.last.fm/ajax/library/gettrackinfo?url=' +
                enc_url + '&cachebuster=' + cachebuster;

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                processGetTrackId(queueIdx, url, tryAgain, doneFn,
                        xhr.responseText);
            }
        });
    }

    function processGetTrackId(queueIdx, ajaxUrl, tryAgain, doneFn, text) {
        if (stop) {
            return;
        }

        var delayed;

        updateProgress('Fetching track IDs: ' +
                Math.floor(100 * queueIdx / workQueue.length) + '% completed');

        var regex = /"id":"?(.*?)"?,/;
        if (regex.test(text)) {
            var id = RegExp.$1;
            workQueue[queueIdx].id = id;

            // Get next ID.
            delayed = function () {
                getTrackId(queueIdx + 1, true, doneFn);
            };
            timer = setTimeout(delayed, XHR_REQUEST_DELAY);
        } else {
            if (tryAgain) {
                // Sometimes a request comes back empty (text === "").
                // TODO: get to the bottom of this; what causes this?
                // Before blaming the script, try the request again first.
                delayed = function () {
                    getTrackId(queueIdx, false, doneFn);
                };
                timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            } else {
                alert('There is a problem: id not found for url "' +
                    workQueue[queueIdx].url + '".\n' +
                    '(' + ajaxUrl + ')\n(' + text + ')\n' +
                    'Cannot run script; ' +
                    'the Last.fm page source may have changed.\n' +
                    'Please contact the script\'s author to fix this.');
                stopWorking(false, true);
            }
        }
    }

    function saveNewPlaylistName(name, id) {
        if (stop) {
            return;
        }

        var enc_name = encodeURIComponent(name);
        var url = userUrl + '/library/playlists/' + id + '/settitle';
        var data = 'value=' + enc_name + '&property=title&formtoken=' +
                formToken + '&editorId=playlistTitle';

        GM_xmlhttpRequest({
            'method': 'POST',
            'url': url,
            'data': data,
            'headers': {
                'Content-Type':
                        'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'onload': function (xhr) {
                addOutput('Renamed new playlist to: ' + name);

                // Now all info is available.
                // Current URL is origin, target URL is new playlist.
                targetUrl = userUrl + '/library/playlists/' + id;
                var delayed = function () {
                    // Don't just pass the document.body element.
                    // Luckily there's a div containing just the items we need.
                    var elt = document.getElementById('content');
                    delayedAddWorkQueueItemsForPageOption(elt);
                };
                timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            }
        });
    }

    function processGetNewPlaylistId(name, text) {
        if (stop) {
            return;
        }

        // First match is the newest one.
        var regex = /<a href="\/user\/.*?\/library\/playlists\/(.*?_)">/i;
        if (regex.test(text)) {
            var id = RegExp.$1;

            addOutput('Created new playlist: ' + id);

            var delayed = function () {
                saveNewPlaylistName(name, id);
            };
            timer = setTimeout(delayed, XHR_REQUEST_DELAY);
        } else {
            alert('There is a problem: new playlist not found.\n' +
                    'Cannot run script; ' +
                    'the Last.fm page source may have changed.\n' +
                    'Please contact the script\'s author to fix this.');
            stopWorking(false, true);
        }
    }

    function getNewPlaylistId(name) {
        if (stop) {
            return;
        }

        var url = userUrl + '/library/playlists';

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                processGetNewPlaylistId(name, xhr.responseText);
            }
        });
    }

    function createNewPlaylist(name) {
        if (stop) {
            return;
        }

        var url = userUrl + '/library/playlists/create';
        var data = 'formtoken=' + formToken;

        GM_xmlhttpRequest({
            'method': 'POST',
            'url': url,
            'data': data,
            'headers': {
                'Content-Type':
                        'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'onload': function (xhr) {
                var delayed = function () {
                    getNewPlaylistId(name);
                };
                timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            }
        });
    }
   
    function exportTracksOnPage(elt, outputHeaders) {
        if (stop) {
            return;
        }

        var trs, cells, links, ii, jj, idx, class, type, id, artist, url, track;

        // Output headers.
        if (outputHeaders) {
            addOutput("Type\tID\tArtist\tTrack/Album\tURL");
        }

        trs = elt.getElementsByTagName('tr');
        for (ii = 0; ii < trs.length; ii += 1) {
            type = id = artist = track = url = '';

            class = trs[ii].getAttribute('class');

            if (!class) {
                // Must be a header row; skip.
                continue;
            }

            if (STREAMABLE_TRACKS_ONLY && -1 === class.indexOf('streamable')) {
                continue;
            }

            // Determine type
            if (class.indexOf('track') >= 0) {
                type = 'track';
            } else if (class.indexOf('artist') >= 0) {
                type = 'artist';
            } else if (class.indexOf('album') >= 0) {
                type = 'album';
            } else {
                // Assume track (this is a playlist page)
                type = 'track';
            }

            // Determine id
            id = trs[ii].getAttribute('data-track-id');
            if (!id) {
                id = trs[ii].getAttribute('id');
                idx = id.indexOf('_');   // id="r1_11111"
                if (idx > 0) {
                    id = id.substring(idx + 1);
                    idx = id.indexOf('_');
                    if (idx > 0) {    // id="r1_11111_11111"
                        id = id.substring(0, idx);
                    }
                } else {
                    // The ID attribute has at least one underscore; this must
                    // be some kind of other row (e.g. group charts page). Skip.
                    continue;
                }
            }
            if (!id) {
                alert('Could not determine ID!');
                id = '';   // Unknown
            }

            // Determine artist, track (if present) and url
            cells = customGetElementsByClassName(trs[ii], 'td', 'subjectCell'); 
            if (0 === cells.length) {
                cells = customGetElementsByClassName(trs[ii], 'td', 'track'); 
            }
            if (1 === cells.length) {
                links = cells[0].getElementsByTagName('a');
                for (jj = 0; jj < links.length; jj += 1) {
                    if ('album' === type) {
                        // order is always album-artist
                        if (0 === jj) {
                            track = html_entity_decode(links[jj].innerHTML);
                            // remove tags
                            track = track.replace(/<.*?>/g, '');
                            // remove leading and trailing space
                            track = track.replace(/^\s+|\s+$/g, '');
                            url = html_entity_decode(links[jj].getAttribute('href'));
                        } else if (1 === jj) {
                            artist = html_entity_decode(links[jj].innerHTML);
                        }
                    } else {
                        // order is always artist-track or just artist
                        if (0 === jj) {
                            artist = html_entity_decode(links[jj].innerHTML);

                            // Cleanup for tagged artists only.
                            // remove tags
                            artist = artist.replace(/<.*?>/g, '');
                            // remove leading and trailing space
                            artist = artist.replace(/^\s+|\s+$/g, '');
                        } else if (1 === jj) {
                            track = html_entity_decode(links[jj].innerHTML);
                        }
                        url = html_entity_decode(links[jj].getAttribute('href'));
                    }
                }
            } else {
                alert('Script error: could not determine table cell');
            }

            addOutput(type + "\t" + id + "\t" + artist + "\t" + track + "\t" + url);
            sawOne = true;
        }

        var delayed, nextLink;
        if (sawOne) {
            // Check if there are more pages to process.
            nextLink = getNextLink(elt);
            if (undefined === nextLink) {
                // All done!
                stopWorking(false, false);
            } else {
                delayed = function () {
                    getNextPage(nextLink, exportTracksOnPage, 'div',
                            'content');
                };
                timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            }
        } else {
            // Not all track listing pages have an id embedded... 
            // for those, need to get the ID asynchronously.

            // These regex's are as above, except the id matching is removed.
            if (STREAMABLE_TRACKS_ONLY) {
                regex = /<tr class=".*?streamable.*?"(?:.*?\n)*?.*?<a href="\/music\/.*?">(.*?)<\/a>.*?<a href="(\/music\/.*?)".*?>(.*?)<\/a>/gi;
            } else {
                regex = /<tr class=".*?"(?:.*?\n)*?.*?<a href="\/music\/.*?">(.*?)<\/a>.*?<a href="(\/music\/.*?)".*?>(.*?)<\/a>/gi;
            }

            var item, queueFull = false;
            while (regex.test(text)) {
                id = -1;
                artist = html_entity_decode(RegExp.$1);
                url = RegExp.$2;   // For the url, decode happens later.
                track = html_entity_decode(RegExp.$3);
                item = {
                    "id": id,
                    "artist": artist,
                    "url": url,
                    "track": track
                };
                if (!addToWorkQueue(item)) {
                    // Queue full.
                    queueFull = true;
                    break;
                }
            }

            // Check if there are more pages to process.
            // Of course, only check if the queue is not already full.
            if (!queueFull) {
                nextLink = getNextLink(elt);
            }
            if (undefined === nextLink) {
                // Now we're ready to get the IDs.
                getTrackId(0, true, delayedExportTracksOnPage);
            } else {
                delayed = function () {
                    getNextPage(nextLink, exportTracksOnPage, 'div',
                            'content');
                };
                timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            }
        }
    }

    function delayedExportTracksOnPage() {
        if (stop) {
            return;
        }

        for (var ii = 0; ii < workQueue.length; ii++) {
            var id = workQueue[ii].id;
            var artist = workQueue[ii].artist;
            var url = html_entity_decode(workQueue[ii].url);
            var track = workQueue[ii].track;
            addOutput("track\t" + id + "\t" + artist + "\t" + track + "\t" + url);
        }

        // All done!
        stopWorking(false, false);
    }

    function addWorkQueueItemsForRawTextOption() {
        var cols, numLines = 0, queueFull = false;
        var input = document.getElementById('rawTextInput');
        var tracks = input.value.split("\n");
        for (var tt = 0; tt < tracks.length; tt++) {
            if (0 === tt && (SCRIPT_OUTPUT_IMPORT || YAHOO_MUSIC_PLAYLIST)) {
                // Skip column headings
                continue;
            }
            if ('' !== trim(tracks[tt])) {
                var work = tracks[tt];
                if (SCRIPT_OUTPUT_IMPORT) {
                    // This script raw text export contains these columns:
                    // up to v1.14: ID Artist Track URL
                    // from v1.15: Type ID Artist Track URL
                    cols = work.split("\t");
                    if (cols.length === 4) {
                        work = { "id": cols[0], "url": cols[3] };
                    } else if (cols.length === 5) {
                        work = { "id": cols[1], "url": cols[4] };
                    }
                } else if (YAHOO_MUSIC_PLAYLIST) {
                    // Y!M's Copy-to-clipboard contains these columns:
                    // Song Artist Album Duration
                    cols = work.split("\t");
                    if (cols.length > 2) {
                        work = '"' + cols[1] + '" "' + cols[0] + '"';
                    }
                }
                // Only try to add if the queue is not full yet.
                if (!queueFull && !addToWorkQueue(work)) {
                    queueFull = true;
                    // Don't break here as we want to report the #lines read.
                    //break;
                }
                numLines++;
            }
        }

        addOutput("Read " + tracks.length + " lines containing " +
                numLines + " tracks.");

        // Now we're ready to do work.
        startWorkQueue();
    }

    function addTrack(id, url) {
        if (stop) {
            return;
        }

        url += '/addtrack';
        var data = 'track=' + id + '&formtoken=' + formToken;

        GM_xmlhttpRequest({
            'method': 'POST',
            'url': url,
            'data': data,
            'headers': {
                'Content-Type':
                        'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'onload': function (xhr) {
                addedTracks++;

                var delayed = function () {
                    findWork();
                };
                timer = setTimeout(delayed, LET_FUNCTION_EXIT_DELAY);
            }
        });
    }

    function doWork(work) {
        // Don't bombard the servers.
        var delayed = function () { 
            if (IMPORT_RAW_TEXT_OPTION === selectedOrigin &&
                    !SCRIPT_OUTPUT_IMPORT) {
                searchForTrack(work);
            } else if ( // target page is a tag page
                    (pageIsUserTag() &&
                     (IMPORT_PLAYLIST_OPTION === selectedOrigin ||
                      IMPORT_TAG_OPTION === selectedOrigin ||
                      IMPORT_RAW_TEXT_OPTION === selectedOrigin)) ||
                    EXPORT_NEW_TAG_OPTION === selectedOrigin ||
                    EXPORT_TAG_OPTION === selectedOrigin ||
                    REMOVE_TAG_OPTION === selectedOrigin) {
                getExistingTagsForTrack(work, encTargetTag);
            } else {
                addTrack(work.id, targetUrl);
            }
        };
        timer = setTimeout(delayed, XHR_REQUEST_DELAY);
    }



    //
    // These functions define the sequence of steps to process a work unit.
    //

    function searchForTrack(track) {
        if (stop) {
            return;
        }

        var enc_track = encodeURIComponent(track);
        var playlistId = '';   // Not set in Last.fm code of August 2008
        var url = document.URL + '/tracksearch';
        var data = 'trackToAdd=' + enc_track +
                '&addTrack=Search&track=' + enc_track +
                // Using = when playlistId is empty causes server error...
                ('' === playlistId ? '&playlist' : '&playlist=' + playlistId) +
                '&ajax=1';

        GM_xmlhttpRequest({
            'method': 'POST',
            'url': url,
            'data': data,
            'headers': {
                'Content-Type':
                        'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'onload': function (xhr) {
                parseSearchResults(track, xhr.responseText, true);
            }
        });
    }

    function parseSearchResults(track, text, tryAgain) {
        if (stop) {
            return;
        }

        var delayed, id;
        var added = false;

        var regex = />No tracks found.</i;
        if (regex.test(text)) {
            addOutput("Track " + workQueueIndex + " not found: " + track);
            skippedTracks++;

            // Continue with next item on queue.
            delayed = function () {
                findWork();
            };
            timer = setTimeout(delayed, LET_FUNCTION_EXIT_DELAY);
            return;
        }

        // Find the first streamable track, if any.
        // Note: the result is JSON, so quotes are escaped.
        regex = /<tr class=\\".*?streamable.*?\\" id=\\".*?_(\d+?)_/i;
        if (regex.test(text)) {
            id = RegExp.$1;

            delayed = function () {
                addTrack(id, targetUrl);
            };
            timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            added = true;
        }

        // Even if the user only wants streamable tracks, we still need the
        // "try again" logic.  So, add the "streamable only" logic in the
        // "add first" logic below.

        var doSkip = false;
        if (!added) {
            // Find the first track, if any.
            // Note: the result is JSON, so quotes are escaped.
            regex = /<tr class=\\".*?first.*?\\" id=\\".*?_(\d+?)_/i;
            if (regex.test(text)) {
                // Now we know that there are only non-streamable tracks.
                if (STREAMABLE_TRACKS_ONLY) {
                    addOutput("No streamable track " + workQueueIndex +
                            ": " + track);
                    doSkip = true;
                } else {
                    id = RegExp.$1;

                    delayed = function () {
                        addTrack(id, targetUrl);
                    };
                    timer = setTimeout(delayed, XHR_REQUEST_DELAY);
                }
                added = true;
            }
        }

        if (!added) {
            if (tryAgain) {
                // We got results but nothing matched?
                // TODO: get to the bottom of this... what causes this?

                delayed = function () { 
                    parseSearchResults(track, text, false);
                };
                timer = setTimeout(delayed, LET_FUNCTION_EXIT_DELAY);
            } else {
                addOutput("Parse error for track " + workQueueIndex +
                        ": " + track);
                doSkip = true;
            }
        }

        if (doSkip) {
            skippedTracks++;

            // Continue with next item on queue.
            delayed = function () {
                findWork();
            };
            timer = setTimeout(delayed, LET_FUNCTION_EXIT_DELAY);
        }
    }

    function removeTagsForTrack(id, tagIds, tagNames, enc_tag) {
        if (stop) {
            return;
        }

        var url = 'http://www.last.fm/ajax/dialog/tag';
        var data = 'type=9&id=' + id + '&formtoken=' + formToken +
                '&clickSource=multiBtn&tag=1&tags=';

        for (var idx = 0; idx < tagIds.length; idx++) {
            if (tagNames[idx] !== enc_tag) {
                data += "&tags_ids%5B%5D=" + tagIds[idx];
            }
        }

        GM_xmlhttpRequest({
            'method': 'POST',
            'url': url,
            'data': data,
            'headers': {
                'Content-Type':
                        'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'onload': function (xhr) {
                addedTracks++;

                var delayed = function () {
                    findWork();
                };
                timer = setTimeout(delayed, LET_FUNCTION_EXIT_DELAY);
            }
        });
    }

    function addTagsForTrack(id, tagIds, enc_tag) {
        if (stop) {
            return;
        }

        var url = 'http://www.last.fm/ajax/dialog/tag';
        var data = 'type=9&id=' + id + '&formtoken=' + formToken +
                '&clickSource=multiBtn&tag=1&tags=';

        for (var idx = 0; idx < tagIds.length; idx++) {
            data += "&tags_ids%5B%5D=" + tagIds[idx];
        }

        // Add tag.
        data += "&tags_free%5B%5D=" + enc_tag;

        GM_xmlhttpRequest({
            'method': 'POST',
            'url': url,
            'data': data,
            'headers': {
                'Content-Type':
                        'application/x-www-form-urlencoded; charset=UTF-8'
            },
            'onload': function (xhr) {
                addedTracks++;

                var delayed = function () {
                    findWork();
                };
                timer = setTimeout(delayed, LET_FUNCTION_EXIT_DELAY);
            }
        });
    }

    function processGetExistingTagsForTrack(id, enc_tag, text) {
        if (stop) {
            return;
        }

        var tagIds = [], tagNames = [];

        // Note: the result is JSON, so quotes are escaped.
        var regex = /prefill: (\{.*?\}),/;
        if (regex.test(text)) {
            var tagInfo = RegExp.$1;

            regex = /\\".*?_(\d+)\\":\\"(.*?)\\"/g;
            while (regex.test(tagInfo)) {
                var tagId = RegExp.$1;
                var tagName = RegExp.$2;
                tagIds.push(tagId);
                tagNames.push(tagName);
            }
        }

        if (REMOVE_TAG_OPTION === selectedOrigin) {
            removeTagsForTrack(id, tagIds, tagNames, enc_tag);
        } else {
            addTagsForTrack(id, tagIds, enc_tag);
        }
    }

    function getExistingTagsForTrack(work, enc_tag) {
        var trackUrl = encodeURIComponent(work.url);
        var url = 'http://www.last.fm/ajax/dialog/tag?_dialog=6&url=' +
                trackUrl;

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                var delayed = function () {
                    processGetExistingTagsForTrack(
                            work.id, enc_tag, xhr.responseText);
                };
                timer = setTimeout(delayed, XHR_REQUEST_DELAY);
            }
        });
    }



    ///////////////////////////////////////////////////////////////////////
    // START - Generic work queue functions.
    ///////////////////////////////////////////////////////////////////////

    function findWork() {
        if (workQueueIndex < workQueue.length) {
            // Do more work.

            updateProgress((targetUrlIsPlaylist() ? 'Adding' : 'Tagging') +
                    ' tracks: ' +
                    Math.floor(100 * workQueueIndex / workQueue.length) +
                    '% completed');

            // Do work.
            var work = workQueue[workQueueIndex];
            workQueueIndex++;
            doWork(work);
        } else {
            // Done.
            if (REMOVE_TAG_OPTION === selectedOrigin) {
                // So little space to display status; just reload.
                updateProgress((targetUrlIsPlaylist() ? 'Adding' : 'Tagging') +
                        ' tracks: ' +
                        Math.floor(100 * workQueueIndex / workQueue.length) +
                        '% completed');
                location.reload();
            } else {
                stopWorking(false, true);
            }
        }
    }

    function startWorkQueue() {
        addOutput((targetUrlIsPlaylist() ? 'Adding' : 'Tagging') +
                ' tracks...');

        // To avoid having to declare findWork public, invoke via closure.
        var delayed = function () {
            findWork();
        };
        timer = setTimeout(delayed, XHR_REQUEST_DELAY);
    }

    ///////////////////////////////////////////////////////////////////////
    // END - Generic work queue functions.
    ///////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////
    // START - Generic start/stop/output functions.
    ///////////////////////////////////////////////////////////////////////

    // Event handler for the Start button.
    function startScript() {
        // Prevent the user from pressing the Start button again.
        setButtonStates(false, true);

        // Before outputting anything, make sure the script is runnable.
        if (!assertScriptIsRunnable()) {
            if (!delayedAssert) {
                setButtonStates(true, false);
            }
            return;
        }

        captureStartState();

        buildWorkQueue();

        // Since most options must do some work before the work queue is
        // filled, each option must start the work whenever they're ready.
    }

    ///////////////////////////////////////////////////////////////////////
    // END - Generic start/stop/output functions.
    ///////////////////////////////////////////////////////////////////////



    // Return publicly accessible variables and functions.
    return {
        //
        // Public functions
        // (These access private variables and functions through "closure".)
        //

        // Initialize this script.
        init: function () {
            // Get information about the user.
            setUserInfo();

            // Build the GUI for this script.
            if (pageIsUsersPlaylistsList() || pageIsUsersTagsList()) {
                // Add remove options.
                buildRemoveGui();
            } else if (!pageIsSomeoneElsesPlaylistsList() &&
                    !pageIsSomeoneElsesTagsList()) {
                // Add import/export options.
                buildGui();
            }

            // Now wait for the user to press a button.
        }
    };
}());
// End singleton pattern.

// Run this script.
LastfmPlaylistAndTagManager.init();

///////////////////////////////////////////////////////////////////////////////
