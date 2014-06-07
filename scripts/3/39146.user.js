///////////////////////////////////////////////////////////////////////////////
//
// This is a Greasemonkey user script.
//
// Playlist.com Song Exporter
// Version 1.0, 2008-12-23
// Coded by Maarten van Egmond.  See namespace URL below for contact info.
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name        Playlist.com Song Exporter
// @namespace   http://userscripts.org/users/64961
// @author      Maarten
// @version     1.0
// @description v1.0: Export the songs on your Playlist.com playlist into tab-separated format, so that you can import them on another site.
// @include     http://view.playlist.com/*/manage?*
// ==/UserScript==
//
///////////////////////////////////////////////////////////////////////////////
//
// For install, uninstall, and known issues, see the namespace link above.
//
///////////////////////////////////////////////////////////////////////////////
//
// This script will export the songs on a Playlist.com playlist into
// tab-separated format.  You can then import them on another site, e.g. via:
// Last.fm Playlist and Tag Manager: http://userscripts.org/scripts/show/32963
//
///////////////////////////////////////////////////////////////////////////////

// Singleton pattern.
var PlaylistDotComSongExporter = (function() {
    //
    // Private variables
    //

    //
    // Private functions
    //

    // This function builds the GUI and adds it to the page body.
    function _buildGui() {
        // Add options to the Tools->Greasemonkey->User Script Commands menu.
        GM_registerMenuCommand(
                'Start Playlist.com Song Extractor', _startScript);

        // Create GUI container.
        var gui = document.createElement('center');
        gui.setAttribute('id', 'scriptContainer');
        gui.setAttribute('style', 'border: 10px solid #76A0CC; padding: 1em;');

        var table = document.createElement('table');
        _addTitleRow(table);   // Add script title
        _addControlsAndOutputArea(table);
        gui.appendChild(table);

        // Add GUI to the page.
        var content = document.getElementById('content');
        if (!content) {
            content = document.body;
        }
        content.appendChild(document.createElement('br'));
        content.appendChild(gui);
    }

    function _addControlsAndOutputArea(table) {
        // Create start button.
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.setAttribute('style', 'padding-top: 1em');
        var button = document.createElement('button');
        button.setAttribute('id', 'startButton');
        button.addEventListener('click', _startScript, true);
        var span = document.createElement('span');
        span.appendChild(document.createTextNode('Export Songs!'));
        button.appendChild(span);
        td.appendChild(button);
        td.appendChild(document.createElement('br'));
        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
        table.appendChild(tr);

        // Create output area.
        tr = document.createElement('tr');
        td = document.createElement('td');
        var text = document.createElement('textarea');
        text.setAttribute('rows', '7');
        text.setAttribute('style', 'width: 99%');
        text.setAttribute('id', 'outputArea');
        td.appendChild(text);
        tr.appendChild(td);
        table.appendChild(tr);
    }

    function _addTitleRow(table) { 
        var tr = document.createElement('tr');
        var td = document.createElement('th');
        td.setAttribute(
                'style', 'font-size: larger; font-weight: bold; '
                + 'text-align: center;');
        td.appendChild(document.createTextNode(
                'Playlist.com Song Exporter'));
        td.appendChild(document.createElement('br'));
        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
        table.appendChild(tr);
    }

    function _addWorkQueueItems() {
        // Don't take the whole document.body.innerHTML as text.
        // Luckily there's a div containing just the items we need.
        var text = document.getElementById('playlistTracks').innerHTML;
        _exportTracksOnPage(text);
    }

    function _exportTracksOnPage(text) {
        // In JavaScript, "everything until and including a newline" is
        // represented as the expression "(?:.*?\n)*?".  So that matches
        // wherever you are in the string until the end-of-line, and any
        // lines underneath it.  To continue matching on another line,
        // skip into the line first using ".*?".
        var regex = /<span class="title">(.*?)<\/span>(?:.*?\n)*?.*?<span class="artist">(.*?)<\/span>/gi;

        while (regex.test(text)) {
            var track = RegExp.$1;
            var artist = RegExp.$2;
            _addOutput("\"" + artist + "\"\t\"" + track + "\"");
        }

        // All done!
        _stopWorking();
    }

    function _captureEndState() {
        // Inform the user about what happened.
        alert('Done.');
    }



    ///////////////////////////////////////////////////////////////////////
    // START - Generic work queue functions.
    ///////////////////////////////////////////////////////////////////////

    function _buildWorkQueue() { 
        // Add work to the queue.
        _addWorkQueueItems();
    }

    function _stopWorking() {
        // Reset button state.
        _setButtonState(true);

        _captureEndState();
    }

    ///////////////////////////////////////////////////////////////////////
    // END - Generic work queue functions.
    ///////////////////////////////////////////////////////////////////////



    ///////////////////////////////////////////////////////////////////////
    // START - Generic start/stop/output functions.
    ///////////////////////////////////////////////////////////////////////

    // Event handler for the Start button.
    function _startScript() {
        // Prevent the user from pressing the Start button again.
        _setButtonState(false);

        _buildWorkQueue();
    }

    function _setButtonState(startState) {
        var button = document.getElementById('startButton');
        if (startState) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', true);
        }
    }

    // Adds a message to the user-readable output area.
    function _addOutput(msg) {
        var output = document.getElementById('outputArea');
        output.value += msg + "\n";

        // Move cursor to the end of the output area.
        output.scrollTop = output.scrollHeight;
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
        init: function() {
            // Build the GUI for this script.
            _buildGui();

            // Now wait for user to press Start button.
        }
    };
})();
// End singleton pattern.

// Run this script.
PlaylistDotComSongExporter.init();

///////////////////////////////////////////////////////////////////////////////
