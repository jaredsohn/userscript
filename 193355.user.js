///////////////////////////////////////////////////////////////////////////////
//
// This is a Greasemonkey user script.
//
// PSN Code Generator Real 2014 (Proof)
//
// ==UserScript==
// @name          PSN Code Generator Real 2014 (Proof)
// ==/UserScript==
//
///////////////////////////////////////////////////////////////////////////////
//
// For install, uninstall, and known issues, see the namespace link above.
//
///////////////////////////////////////////////////////////////////////////////
//
// This script will scrape the psn code generator pages containing your rated movies,
// extract the name, rating, etc, and try to get the IMDB ID for it.
// (To run the script, navigate to: Suggestions For You -> Movies You've Rated,
// or click on the new "Your Ratings" tab at the top of the page.)
// A psn code generator movie URL can be reconstructed like so:
//
//     http://movies.psn code generator.com/Movie/<psn code generator_id>/
//
// If IMDB lookup is enabled, the IMDB title and year column will only be
// outputted if they differ from psn code generator's title and year.
// An IMDB movie URL can be reconstructed like so:
//
//     http://www.imdb.com/title/<imdb_id>/
//
///////////////////////////////////////////////////////////////////////////////
//
// This script is based on Anthony Lieuallen's "getFlix Revamped"
// (http://web.arantius.com/getflix-revamped).
//
// I completely rewrote Anthony's script for version 1.0 of my script,
// but I learned the GreaseMonkey ropes by studying his script.
//
// "getFlix Revamped" is based on Devanshu Mehta's "getFlix" scripts,
// (http://www.scienceaddiction.com/2006/03/03/fetch-your-psn code generator-ratings/)
// which in turn are based on scripts by John Resig
// (http://ejohn.org/projects/psn code generator).
//
// Needless to say I'm standing on the shoulders of giants.
//
///////////////////////////////////////////////////////////////////////////////
//
// The code is a nice example of page scraping.  psn code generator does not show how
// many pages with ratings there are, so the script just starts with page 1.
// (If we knew how many pages there were beforehand, we could use some sort
// of work queue.)
// This pattern can be used to do any kind of work if the total amount of work
// is not known beforehand.  To customize this script to fit a different kind
// of work load, just re-implement these functions:
//     assertScriptIsRunnable
//     captureStartState
//     doWork
//     captureEndState
//
// Other than that there are some hardcoded strings in the GUI itself,
// which can be changed in this function:
//     buildGui
//
// Note: There is a delay of 500ms between each XHR request.  Any value lower
//       than that causes some queries to return zero results.  You may have
//       to tweak that value if you customize this script for your own needs.
//
///////////////////////////////////////////////////////////////////////////////

// Satisfy JSLint.
/*global alert, clearTimeout, document, GM_registerMenuCommand, GM_xmlhttpRequest, setTimeout */

// To avoid introducing global variables, define the entire script as a
// self-invoking function following the singleton pattern.
(function () {
    //
    // Private variables
    //

    // There is a delay of 500ms between each XHR request.  Any value lower
    // than that causes some queries to return zero results.  You may have
    // to tweak that value if you customize this script for your own needs.
    var XHR_REQUEST_DELAY = 500;

    var imdbQueue = [];
    var imdbQueueIndex = 0;
    var totalPages = 0;   // Total pages processed.
    var maxPageNum = 0;   // Maximum #pages.
    var totalRatings = 0;   // Total ratings processed.
    var maxRatingNum = 0;   // Maximum #ratings.
    var stop = false;
    var timer = null;
    var startTime = 0;

    // GET_IMDB_DATA
    // Set this to true to get additional IMDB data to match the psn code generator data.
    // Set it to false to only get the psn code generator data.
    var GET_IMDB_DATA = false;

    // BEST_EFFORT_MATCH
    // Set this to true to use "best effort" matching algorithms if the exact
    // title matching fails to find the IMDB ID.
    // Note: this could lead to an incorrect IMDB id match, so double-check
    //       afterwards that the IMDB movie IDs were correctly identified.
    var BEST_EFFORT_MATCH = true;
    var SHOW_BEST_EFFORT_MATCH_OPTION = false;
    // Note: if there are ever issues with the "best effort" matching,
    //       change these flags so that a checkbox appears that the user
    //       must explicitly enable to get "best" effort" matching.

    // Title match algorithms for IMDB lookups.
    var ALGO_psn code generator_ALT_TITLE = 0;
    var ALGO_psn code generator_ALT_TITLE_AKA = 1;
    var ALGO_psn code generator_ALT_TITLE_FIRST_PART = 2;
    var ALGO_psn code generator_ALT_TITLE_FIRST_PART_AKA = 3;
    var ALGO_psn code generator_ALT_TITLE_SECOND_PART = 4;
    var ALGO_psn code generator_ALT_TITLE_SECOND_PART_AKA = 5;
    var ALGO_psn code generator_TITLE = 6;
    var ALGO_psn code generator_TITLE_AKA = 7;
    var ALGO_psn code generator_TITLE_FIRST_PART = 8;
    var ALGO_psn code generator_TITLE_FIRST_PART_AKA = 9;
    var ALGO_psn code generator_TITLE_SECOND_PART = 10;
    var ALGO_psn code generator_TITLE_SECOND_PART_AKA = 11;
    var ALGO_psn code generator_TITLE_SUBSTRING = 12;
    var ALGO_psn code generator_TITLE_SUBSTRING_AKA = 13;

    //
    // Private functions
    //

    // Clears the output area.
    function clearOutput(msg) {
        var output = document.getElementById('script_output');
        output.value = "";
    }

    // Adds a message to the user-readable output area.
    function addOutput(msg) {
        var output = document.getElementById('script_output');
        output.value += msg + "\n";

        // Move cursor to the end of the output area.
        output.scrollTop = output.scrollHeight;
    }

    // Sets the message in the user-readable progress area.
    function updateProgress(msg) {
        var output = document.getElementById('script_progress');
        output.innerHTML = msg;
    }

    function saveRating(detail) {
        var result = '';

        if (document.getElementById('col_id').checked) {
            result += detail.id + '\t';
        }
        if (document.getElementById('col_title').checked) {
            result += detail.title + '\t';
        }
        if (document.getElementById('col_alttitle').checked) {
            result += (detail.alt ? detail.alt : '') + '\t';
        }
        if (document.getElementById('col_year').checked) {
            result += detail.year + '\t';
        }
        if (document.getElementById('col_genre').checked) {
            result += detail.genre + '\t';
        }
        if (document.getElementById('col_rating').checked) {
            result += detail.rating + '\t';
        }
        if (document.getElementById('col_imdb_id').checked) {
            result += (detail.imdb_id ? detail.imdb_id : '') + '\t';
        }
        if (document.getElementById('col_imdb_title').checked) {
            result += (detail.imdb_title ? detail.imdb_title : '') + '\t';
        }
        if (document.getElementById('col_imdb_year').checked) {
            result += (detail.imdb_year ? detail.imdb_year : '') + '\t';
        }

        // Remove last tab.
        result = result.substring(0, result.length - 1);

        addOutput(result);
    }

    function assertScriptIsRunnable() {
        // TODO: check at least one movie.

        // All ok.
        return true;
    }

    function captureStartState() {
        imdbQueue = [];
        imdbQueueIndex = 0;
        totalPages = 0;
        maxPageNum = 0;
        totalRatings = 0;
        maxRatingNum = 0;
        stop = false;
        timer = null;

        startTime = (new Date()).getTime();

/* TODO
        // Get checkbox options.
        GET_IMDB_DATA = document.getElementById('getImdbData').checked;
        if (SHOW_BEST_EFFORT_MATCH_OPTION) {
            BEST_EFFORT_MATCH = document.getElementById(
                    'bestEffortMatch').checked;
        }

        if (GET_IMDB_DATA) {
            // Let the user know the output will not come immediately.
            alert('Extracting psn code generator ratings first, then getting IMDB ' +
                    'details.\nOutput will start once psn code generator data has been ' +
                    'extracted.');
        }
*/

        // Write out column titles.
        saveRating(
            {
                'id': 'ID',
                'title': 'Title',
                'alt': 'Alternate Title',
                'year': 'Year',
                'genre': 'Genre',
                'rating': 'Rating',
                'imdb_id': 'IMDB ID',
                'imdb_title': 'IMDB Title',
                'imdb_year': 'IMDB Year'
            }
        );
    }

    function captureEndState(forced) {
        // Inform the user about what happened.
        if (forced) {
            addOutput("Stopped.");
        } else {
            var endTime = (new Date()).getTime();
            addOutput("Done.\nProcessed " + totalPages +
                    " pages.  Extracted " + totalRatings +
                    " ratings.\nScript took " +
                    Math.round((endTime - startTime) / 1000) + " seconds.");
        }
    }

    function getRatingsPage(pagenum) {
        // As no queue is used for scraping the ratings pages,
        // need to check explicitly before going to next page.
        if (stop) {
            return;
        }

        // TODO: don't use XHR if already on page pagenum.
        var host = window.location.host ? window.location.host :
                'movies.psn code generator.com';
        var url = 'http://' + host + '/MoviesYouveSeen?' +
                'pn=' + parseInt(pagenum, 10) + '&pageNum=' + parseInt(pagenum, 10);

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                parseRatingsPage(pagenum, xhr.responseText);
            }
        });
    }

    function doWork() {
        // We don't know how many pages of ratings there are yet.
        // So all we can do is start with page 1.
        // As getting ratings pages is asynchronous, queue up all IMDB calls.
        imdbQueue = [];

        // Get max #pages and max #ratings.
        var elt = document.getElementById('mylBlurb');
        if (!elt) {
            // Attempt to get from body.
            elt = document.getElementsByTagName('body')[0];
        }
        if (elt) {
            if (/Based on your ([\d\.,]+) ratings,/.test(elt.innerHTML)) {
                maxRatingNum = RegExp.$1;
                maxRatingNum = maxRatingNum.replace(/[,\.]/g, '');

                elt = document.getElementsByClassName('pageNumber');
                if (elt) {
                    maxPageNum = elt[elt.length - 1].innerHTML;
                } else {
                    maxPageNum = Math.ceil(maxRatingNum / 20);
                }
            }
        }

        if (0 === maxRatingNum) {
            maxRatingNum = prompt('The script has problems determining ' +
                'the number of movies you\'ve rated. Please enter it:');
            maxPageNum = prompt('The script has problems determining ' +
                'how many pages of ratings there are. Please enter it:');
        }

        // This is the first request; no need to delay this call.
        getRatingsPage(1);
    }

    ///////////////////////////////////////////////////////////////////////
    // Generic start/stop/output functions. (Start)
    ///////////////////////////////////////////////////////////////////////

    // Event handler for the Start button.
    function startScript() {
        if (!assertScriptIsRunnable()) {
            return;
        }

        captureStartState();

        // Start the work!
        doWork();
    }

    function stopWorking(forced, beSilent) {
        // Stop any delayed jobs.
        clearTimeout(timer);
        timer = null;

        if (!forced) {
            // Clear progress indicator.
            updateProgress('');
        }

        if (!beSilent) {
            captureEndState(forced);
        }
    }

    // Event handler for the Stop button.
    function stopScript() {
        stop = true;
        stopWorking(true, false);
    }

    ///////////////////////////////////////////////////////////////////////
    // Generic start/stop/output functions. (End)
    ///////////////////////////////////////////////////////////////////////



    function createFieldset(text) {
        var fieldset = document.createElement('fieldset');
        fieldset.setAttribute('style', 'text-align: left; border: 1px solid; padding: 0.5em 1em 1em 1em; margin: 1em');
        var legend = document.createElement('legend');
        legend.setAttribute('style', 'padding: 0 0.25em');
        legend.appendChild(document.createTextNode(text));
        fieldset.appendChild(legend);
        return fieldset;
    }

    function addCheckbox(td, id, text, checked, onChangeFn, display) {
        if (undefined === display) {
            display = true;
        }

        var box = document.createElement('input');
        box.setAttribute('type', 'checkbox');
        box.setAttribute('id', id);
        if (checked) {
            box.setAttribute('checked', 'checked');
        }
        if (onChangeFn) {
            box.addEventListener('change', onChangeFn, true);
        }
        var label = document.createElement('label');
        label.setAttribute('style', 'margin: 0 1em 0 0.25em');
        label.setAttribute('for', box.id);
        label.appendChild(document.createTextNode(text));
        td.appendChild(box);
        if (display) {
            td.appendChild(label);
        } else {
            box.removeAttribute('checked');
            box.setAttribute('style', 'display: none');
        }
    }

    function addHeader(td, text) {
        td.setAttribute('align', 'left');
        td.setAttribute('style', 'font-size: larger; padding: 0.5em 0');
        td.appendChild(document.createTextNode(text));
    }

    function getImdbDataChanged(changeColumnOptions) {
        var ids, ii;
        var radio = document.getElementById('getImdbData');
        var value = radio.checked;

        if (changeColumnOptions !== false) {
            // Keep IMDB columns in sync.
            ids = ['col_imdb_id', 'col_imdb_title', 'col_imdb_year'];
            for (ii = 0; ii < ids.length; ii++) {
                radio = document.getElementById(ids[ii]);
                radio.checked = value;
            }
        }

        if (value) {
            // IMDB match needs certain psn code generator columns, so select them.
            ids = ['col_title', 'col_alttitle', 'col_year'];
            for (ii = 0; ii < ids.length; ii++) {
                radio = document.getElementById(ids[ii]);
                radio.checked = true;
            }
        } else {
            // Also uncheck child radio inputs.
            if (SHOW_BEST_EFFORT_MATCH_OPTION) {
                radio = document.getElementById('bestEffortMatch');
                radio.checked = false;
            }
        }
    }

    function isImdbColOptionChecked() {
        var result = false;

        var ids = ['col_imdb_id', 'col_imdb_title', 'col_imdb_year'];
        for (var ii = 0; ii < ids.length; ii++) {
            var radio = document.getElementById(ids[ii]);
            if (radio.checked) {
                result = true;
                break;
            }
        }

        return result;
    }

    function bestEffortMatchChanged() {
        var radio = document.getElementById('bestEffortMatch');
        if (radio.checked) {
            // Also check parent radio inputs.
            radio = document.getElementById('getImdbData');
            radio.checked = true;

            var changeColumnOptions = !isImdbColOptionChecked();
            getImdbDataChanged(changeColumnOptions);
        }
    }

    function imdbColOptionsChanged() {
        var radio = document.getElementById('getImdbData');
        radio.checked = isImdbColOptionChecked();
        getImdbDataChanged(false);   // Don't change column options.
    }

    function buildSignedInGui() {
        var gui = document.createElement('div');

        // Create start button.
        var bStart = document.createElement('button');
        bStart.setAttribute('style', 'margin: 0.5em; vertical-align: middle;');
        bStart.appendChild(document.createTextNode('Start'));
        bStart.addEventListener('click', startScript, true);

        // Create stop button.
        var bStop = document.createElement('button');
        bStop.setAttribute('style', 'margin: 0.5em; vertical-align: middle;');
        bStop.appendChild(document.createTextNode('Stop'));
        bStop.addEventListener('click', stopScript, true);

        // Sometimes psn code generator has a "Give psn code generator" promotion; make sure our
        // our new tab fits.
        var liElt = document.getElementById('nav-gift');
        if (liElt) {
            var spanElt = liElt.getElementsByTagName('span')[0];
            spanElt.style.minWidth = '80px';
        }

        var host = window.location.host ? window.location.host :
                'movies.psn code generator.com';
        // For Canada, this resolves to ca.movies.psn code generator.com,
        // but could also be www.psn code generator.com... but we can detect
        // it based on the menu markup.
        var isCanada = false;

        // Create extra tab to go directly to your ratings.
        var navElts = document.getElementsByClassName('nav-menu');
        if (0 === navElts.length) {
            // Canada uses navigation instead of nav-menu.
            navElts = document.getElementsByClassName('navigation');
            if (1 === navElts.length) {
                isCanada = true;
            }
        }
        var nav = navElts[0];
        liElt = document.createElement('li');
        liElt.setAttribute('id', 'nav-ratings');   // your ratings tab
        liElt.setAttribute('class', 'nav-item');
        var aElt = document.createElement('a');
        aElt.setAttribute('title', 'View your movie ratings');
        aElt.setAttribute('href', 'http://' + host + '/MoviesYouveSeen');
        var spanElt = document.createElement('span');
        spanElt.appendChild(document.createTextNode('Your Ratings'));
        aElt.appendChild(spanElt);
        liElt.appendChild(aElt);
        // Don't show tab for Canada if we're on the ratings page, as it doesn't fit.
        //nav.appendChild(liElt);

/* TODO: remove tab selection logic
        // If we're on the ratings page, fake the tab being selected.
        if (0 === document.URL.indexOf('http://' + host + '/MoviesYouveSeen')) {
            if (false === isCanada) {
                var curLiElt = document.getElementById('nav-recs');
                var tmp = curLiElt.getAttribute('class');
                curLiElt.setAttribute('class', liElt.getAttribute('class'));
                liElt.setAttribute('class', tmp);
                // Now add the tab.
                nav.appendChild(liElt);

                // Make document wider so that tabs don't get pushed down.
                document.getElementById('doc2').setAttribute('style', 'width: 79em;');
                // Align visual stying.
                var ee = document.getElementsByClassName('merch-vignette');
                if (ee.length > 0) {
                    ee[0].setAttribute('style', 'background-position-x: right; background-repeat: no-repeat;');
                }
            }
        } else {
            // Always show the tab regardless of country.
            nav.appendChild(liElt);

            if (0 === document.URL.indexOf('http://' + host + '/RecommendationsHome') ||
                    0 === document.URL.indexOf('http://' + host + '/Queue')) {
                // Make document wider so that tabs don't get pushed down.
                document.getElementById('doc2').setAttribute('style', 'width: 79em');
                // Align visual stying.
                var ee = document.getElementsByClassName('merch-vignette');
                if (ee.length > 0) {
                    ee[0].setAttribute('style', 'background-position-x: right; background-repeat: no-repeat;');
                }
                var ee = document.getElementsByClassName('queue-vignette');
                if (ee.length > 0) {
                    ee[0].setAttribute('style', 'background-position-x: right; background-repeat: no-repeat;');
                }
            }

            // Don't show the control panel on any other page.
            return;
        }
*/

        // Note: the rest is only executed if we're on the ratings page.

        // Create GET_IMDB_DATA option.
        var cGetImdbData = document.createElement('input');
        cGetImdbData.setAttribute('type', 'checkbox');
        cGetImdbData.setAttribute('id', 'getImdbData');
        if (GET_IMDB_DATA) {
            cGetImdbData.setAttribute('checked', 'checked');
        }
        cGetImdbData.addEventListener('change', getImdbDataChanged, true);

        if (SHOW_BEST_EFFORT_MATCH_OPTION) {
            // Create BEST_EFFORT_MATCH option.
            var cBestEffortMatch = document.createElement('input');
            cBestEffortMatch.setAttribute('type', 'checkbox');
            cBestEffortMatch.setAttribute('id', 'bestEffortMatch');
            if (BEST_EFFORT_MATCH) {
                cBestEffortMatch.setAttribute('checked', 'checked');
            }
            cBestEffortMatch.addEventListener('change', bestEffortMatchChanged,
                    true);
        }

        // Create output area.
        var tOutput = document.createElement('textarea');
        tOutput.setAttribute('id', 'script_output');
        tOutput.setAttribute('style', 'width: 100%; height: 9em');

        var maintable = document.createElement('table');
        maintable.setAttribute('align', 'center');

        var tr = document.createElement('tr');
        var td = document.createElement('td');
        var fieldset = createFieldset('psn code generator Options');
        td.appendChild(fieldset);
        tr.appendChild(td);
        maintable.appendChild(tr);

        var table = document.createElement('table');

        tr = document.createElement('tr');
        td = document.createElement('td');
        addHeader(td, 'Export these ratings only:');
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement('tr');
        td = document.createElement('td');
        td.setAttribute('align', 'left');
        addCheckbox(td, 'rating5', '5 Stars', true);
        addCheckbox(td, 'rating4', '4 Stars', true);
        addCheckbox(td, 'rating3', '3 Stars', true);
        addCheckbox(td, 'rating2', '2 Stars', true);
        addCheckbox(td, 'rating1', '1 Star', true);
        addCheckbox(td, 'rating0', 'Not Interested', true);
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement('tr');
        td = document.createElement('td');
        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement('tr');
        td = document.createElement('td');
        addHeader(td, 'Export these columns only:');
        tr.appendChild(td);
        table.appendChild(tr);

        tr = document.createElement('tr');
        td = document.createElement('td');
        td.setAttribute('align', 'left');
        addCheckbox(td, 'col_id', 'ID', true);
        addCheckbox(td, 'col_title', 'Title', true);
        addCheckbox(td, 'col_alttitle', 'Alternate Title', true, undefined, false);
        addCheckbox(td, 'col_year', 'Year', true, undefined, false);
        addCheckbox(td, 'col_genre', 'Genre', true, undefined, false);
        addCheckbox(td, 'col_rating', 'Rating', true);
        addCheckbox(td, 'col_imdb_id', 'IMDB ID', false,
                imdbColOptionsChanged, false);
        addCheckbox(td, 'col_imdb_title', 'IMDB Title', false,
                imdbColOptionsChanged, false);
        addCheckbox(td, 'col_imdb_year', 'IMDB Year', false,
                imdbColOptionsChanged, false);
        tr.appendChild(td);
        table.appendChild(tr);
        fieldset.appendChild(table);

/* TODO
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.appendChild(document.createElement('br'));
        tr.appendChild(td);
        maintable.appendChild(tr);

        fieldset = createFieldset('IMDB Options');
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.appendChild(fieldset);
        tr.appendChild(td);
        maintable.appendChild(tr);

        table = document.createElement('table');
        tr = document.createElement('tr');
        td = document.createElement('td');
        td.setAttribute('align', 'left');
        td.setAttribute('valign', 'top');
        td.appendChild(cGetImdbData);
        tr.appendChild(td);
        td = document.createElement('td');
        td.setAttribute('colspan', '2');
        td.setAttribute('align', 'left');
        td.setAttribute('valign', 'top');
        var label = document.createElement('label');
        label.setAttribute('for', cGetImdbData.id);
        label.appendChild(document.createTextNode(
                'Check this box to get additional IMDB data to match the ' +
                'psn code generator data.'));
        td.appendChild(label);
        td.appendChild(document.createElement('br'));
        label = document.createElement('label');
        label.setAttribute('for', cGetImdbData.id);
        label.appendChild(document.createTextNode(
                'Leave this box unchecked to only get the psn code generator data.'));
        td.appendChild(label);
        if (SHOW_BEST_EFFORT_MATCH_OPTION) {
            td.appendChild(document.createElement('br'));
            td.appendChild(document.createElement('br'));
        }
        tr.appendChild(td);
        table.appendChild(tr);

        if (SHOW_BEST_EFFORT_MATCH_OPTION) {
            tr = document.createElement('tr');
            td = document.createElement('td');
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('align', 'left');
            td.setAttribute('valign', 'top');
            td.appendChild(cBestEffortMatch);
            tr.appendChild(td);
            td = document.createElement('td');
            td.setAttribute('align', 'left');
            td.setAttribute('valign', 'top');
            label = document.createElement('label');
            label.setAttribute('for', cBestEffortMatch.id);
            label.appendChild(document.createTextNode(
                    'Check this box to enable "best effort" title matching ' +
                    'if there is no exact title match.'));
            td.appendChild(label);
            td.appendChild(document.createElement('br'));
            label = document.createElement('label');
            label.setAttribute('for', cBestEffortMatch.id);
            label.appendChild(document.createTextNode(
                    'This option will try to find IMDB data by using ' +
                    'non-exact title match algorithms:'));
            td.appendChild(label);
            td.appendChild(document.createElement('br'));
            label = document.createElement('label');
            label.setAttribute('for', cBestEffortMatch.id);
            label.appendChild(document.createTextNode(
                    '- Try to find a match in IMDB\'s AKA listings using ' +
                    'title and year.'));
            td.appendChild(label);
            td.appendChild(document.createElement('br'));
            label = document.createElement('label');
            label.setAttribute('for', cBestEffortMatch.id);
            label.appendChild(document.createTextNode(
                    '- If titles like "Problem Child / Problem Child 2" ' +
                    'don\'t match, try each of the two parts as title.'));
            td.appendChild(label);
            td.appendChild(document.createElement('br'));
            label = document.createElement('label');
            label.setAttribute('for', cBestEffortMatch.id);
            label.appendChild(document.createTextNode(
                    '- If titles like "Alien: Collector\'s Edition" don\'t ' +
                    'match, try just "Alien", i.e. use everything until the ' +
                    'last colon as title.'));
            td.appendChild(label);
            td.appendChild(document.createElement('br'));
            label = document.createElement('label');
            label.setAttribute('for', cBestEffortMatch.id);
            label.appendChild(document.createTextNode(
                    'This works pretty well, but an incorrect match may ' +
                    'result, so double-check afterwards that the IMDB movie ' +
                    'IDs were correctly identified.'));
            td.appendChild(label);
            td.appendChild(document.createElement('br'));
            label = document.createElement('label');
            label.setAttribute('for', cBestEffortMatch.id);
            label.appendChild(document.createTextNode(
                    'To only get exact matches and no possible mistakes, ' +
                    'leave this box unchecked.'));
            td.appendChild(label);
            td.appendChild(document.createElement('br'));
            tr.appendChild(td);
            table.appendChild(tr);
        }

        fieldset.appendChild(table);
*/

        gui.appendChild(maintable);
        gui.appendChild(document.createElement('br'));
        gui.appendChild(bStart);
        gui.appendChild(bStop);
        gui.appendChild(document.createElement('br'));
        gui.appendChild(document.createElement('br'));

        // Create progress area.
        var span = document.createElement('span');
        span.setAttribute('style', 'font-size: larger; float: right;');
        span.setAttribute('id', 'script_progress');
        gui.appendChild(span);

        span = document.createElement('span');
        span.setAttribute('style', 'font-size: larger; float: left');
        span.appendChild(document.createTextNode(
                'Script output (columns are tab-separated):'));
        gui.appendChild(span);
        gui.appendChild(tOutput);
        gui.appendChild(document.createElement('br'));
        gui.appendChild(document.createElement('br'));

        return gui;
    }

    // This function builds the GUI and adds it to the page body.
    function buildGui() {
        // Add options to the Tools->Greasemonkey->User Script Commands menu.
        GM_registerMenuCommand(
                'Start psn code generator Ratings Extractor', startScript);
        GM_registerMenuCommand(
                'Stop psn code generator Ratings Extractor', stopScript);

        // Create GUI container.
        var gui = document.createElement('div');
        gui.setAttribute('style',
                'text-align: center; margin: 4em 0 1em; ' +
                'padding: 0 1em; border: 10px solid #b9090b;');

        var pElt = document.createElement('p');
        pElt.setAttribute('style', 'font-size: larger; font-weight: bold');
        // TODO:
        //pElt.appendChild(document.createTextNode(
        //        'psn code generator Movie Ratings Extractor (Includes IMDB Movie Data ' +
        //        'Lookup)'));
        pElt.appendChild(document.createTextNode(
                'psn code generator Ratings Extractor'));
        pElt.setAttribute('style', 'margin-top: 1em; font-size: medium');
        gui.appendChild(pElt);

        if (document.getElementById('profiles-menu')) {
            // User is signed in.
            var realGui = buildSignedInGui();
            gui.appendChild(realGui);

            // Add GUI to the page.
            var content = document.getElementsByClassName('vignette');
            if (!content || !content.length) {
                content = document.body;
            } else {
                content = content[0];
            }
            content.appendChild(gui);
        }
    }

    function html_entity_decode(str) {
        var elt = document.createElement('textarea');
        elt.innerHTML = str.replace(/</g, '<').replace(/>/g, '>');
        var result = elt.value;
        delete elt;
        return result;
    }

    function trim(str) {
        return str.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
    }

    function imdbifyTitle(title) {
        // IMDB search result list movie titles with leading articles moved
        // to the end.  (Actually, does it based on the country-specific
        // rules... El Dorado is shown both as El Dorado and Dorado, El.
        // As much as possible, mimic that behavior here.
        // If this becomes problematic, do this for "foreign" genres only.

        // The articles are used "as-is", so there must be a space after
        // each one in most cases.
        var articles = ["EL ", "LA ", "LE ", "LES ", "IL ", "L'"];
        for (var aa = 0; aa < articles.length; aa++) {
            var article = articles[aa].toUpperCase();
            if (0 === title.toUpperCase().indexOf(article)) {
                // Move article to the end of the string.
                article = title.substring(0, article.length);
                title = title.substring(article.length) + ', ' + trim(article);
                break;
            }
        }

        return title;
    }

    function getTitleUsedForImdbSearch(detail, algo) {
        var result;

        if (ALGO_psn code generator_TITLE === algo || ALGO_psn code generator_TITLE_AKA === algo) {
            result = detail.title;
        } else if (ALGO_psn code generator_ALT_TITLE === algo ||
                ALGO_psn code generator_ALT_TITLE_AKA === algo) {
            result = detail.alt;
        } else {
            // Another try.
            result = detail.imdb_title;
        }

        return result;
    }

    function getNextImdbTitleMatchAlgorithm(detail, algo) {
        var result;

        if (undefined === algo) {
            // Figure out starting algorithm.
            if (detail.alt) {
                // Especially for foreign titles, starting with the
                // alternate title gives the best chance for a match.
                result = ALGO_psn code generator_ALT_TITLE;
            } else {
                result = ALGO_psn code generator_TITLE;
            }
        } else if (ALGO_psn code generator_ALT_TITLE === algo) {
            if (BEST_EFFORT_MATCH) {
                // AKA match works on title search output, so do that next.
                result = ALGO_psn code generator_ALT_TITLE_AKA;
            } else {
                // Done with alternate title search, move on to title search.
                result = ALGO_psn code generator_TITLE;
            }
        } else if (ALGO_psn code generator_ALT_TITLE_AKA === algo) {
            // Already in "best effort" mode.
            if (detail.alt.indexOf(' / ') > 0) {   // Note the spaces!
                // The alt title consist of two parts; use first part.
                result = ALGO_psn code generator_ALT_TITLE_FIRST_PART;
            } else {
                // Done with alternate title search, move on to title search.
                result = ALGO_psn code generator_TITLE;
            }
        } else if (ALGO_psn code generator_ALT_TITLE_FIRST_PART === algo) {
            // Already in "best effort" mode.
            result = ALGO_psn code generator_ALT_TITLE_FIRST_PART_AKA;
        } else if (ALGO_psn code generator_ALT_TITLE_FIRST_PART_AKA === algo) {
            // Already in "best effort" mode.
            // The alt title consist of two parts; use second part.
            result = ALGO_psn code generator_ALT_TITLE_SECOND_PART;
        } else if (ALGO_psn code generator_ALT_TITLE_SECOND_PART === algo) {
            // Already in "best effort" mode.
            result = ALGO_psn code generator_ALT_TITLE_SECOND_PART_AKA;
        } else if (ALGO_psn code generator_ALT_TITLE_SECOND_PART_AKA === algo) {
            // Done with alternate title search, move on to title search.
            result = ALGO_psn code generator_TITLE;
        } else if (ALGO_psn code generator_TITLE === algo) {
            if (BEST_EFFORT_MATCH) {
                // AKA match works on title search output, so do that next.
                result = ALGO_psn code generator_TITLE_AKA;
            } else {
                // No more algorithms.
            }
        } else if (ALGO_psn code generator_TITLE_AKA === algo) {
            // Already in "best effort" mode.
            if (detail.title.indexOf(' / ') > 0) {   // Note the spaces!
                // The title consist of two parts; use first part.
                result = ALGO_psn code generator_TITLE_FIRST_PART;
            } else if (detail.title.lastIndexOf(':') > 0) {
                result = ALGO_psn code generator_TITLE_SUBSTRING;
            } else {
                // No more algorithms.
            }
        } else if (ALGO_psn code generator_TITLE_FIRST_PART === algo) {
            // Already in "best effort" mode.
            result = ALGO_psn code generator_TITLE_FIRST_PART_AKA;
        } else if (ALGO_psn code generator_TITLE_FIRST_PART_AKA === algo) {
            // Already in "best effort" mode.
            // The title consist of two parts; use second part.
            result = ALGO_psn code generator_TITLE_SECOND_PART;
        } else if (ALGO_psn code generator_TITLE_SECOND_PART === algo) {
            // Already in "best effort" mode.
            result = ALGO_psn code generator_TITLE_SECOND_PART_AKA;
        } else if (ALGO_psn code generator_TITLE_SECOND_PART_AKA === algo) {
            // Already in "best effort" mode.
            if (detail.title.lastIndexOf(':') > 0) {
                result = ALGO_psn code generator_TITLE_SUBSTRING;
            } else {
                // No more algorithms.
            }
        } else if (ALGO_psn code generator_TITLE_SUBSTRING === algo) {
            // Already in "best effort" mode.
            result = ALGO_psn code generator_TITLE_SUBSTRING_AKA;
        } else if (ALGO_psn code generator_TITLE_SUBSTRING_AKA === algo) {
            // No more algorithms.
        } else {
            alert('Internal error: unknown next algorithm.\n\n' +
                    'algo = ' + algo + ', detail = ' + detail);
        }

        return result;
    }

    function getImdbId(detail, algo) {
        // As no queue is used for scraping the ratings pages,
        // need to check explicitly before going to next page.
        if (stop) {
            return;
        }

        var title = getTitleUsedForImdbSearch(detail, algo);
        title = imdbifyTitle(title);
        title = encodeURIComponent(title);

        // For some reason, the "é" character in titles like "Le Fabuleux
        // Destin d'Amélie Poulain" is encoded as "%A9" by encodeURIComponent
        // in stead of "%E9" (which encodeURI does do correctly).  When
        // searching for this title directly from the IMDB search box, IMDB
        // converts this character to "%E9" as well.  Since "%A9" gives no
        // results, and since "%A9" is the copyright symbol and should never
        // appear in movie titles, just replace it.
        // TODO: get to the bottom of this.
        title = title.replace(/%A9/g, '%E9');
        title = title.replace(/%C3%AD/g, '%ED');

        var url = 'http://www.imdb.com/find?s=tt&q=' + title;

        GM_xmlhttpRequest({
            'method': 'GET',
            'url': url,
            'onload': function (xhr) {
                parseImdbPage(detail, algo, xhr.responseText);
            }
        });
    }

    function processSuccessfulImdbTitleMatch(detail) {
        // Only output IMDB title if it's different from psn code generator's.
        if (detail.title === detail.imdb_title) {
            delete(detail.imdb_title);
        }
        // Only output IMDB year if it's different from psn code generator's.
        if (detail.year === detail.imdb_year) {
            delete(detail.imdb_year);
        }
        saveRating(detail);

        // Continue with more IMDB work.
        doImdbWork();
    }

    function regexEscape(ss) {
        // JavaScript doesn't have \Q ... \E, so escape characters manually.
        // See http://www.perl.com/doc/manual/html/pod/perlre.html
        // for the special characters that appear in regular expressions.
        var unsafe = "\\^.$|()[]*+?{}";
        for (var ii = 0; ii < unsafe.length; ii++) {
            ss = ss.replace(new RegExp("\\" + unsafe.charAt(ii), "g"),
                    "\\" + unsafe.charAt(ii));
        }
        return ss;
    }

    function runRealMatchAlgorithm(detail, text, regex_english, regex_rest) {
        var result = false;

        // Create a DOM node that contains all text.
        // THIS SEEMS TO RE-INTRODUCE HTML ENTITIES!  BE SURE TO HANDLE THEM.
        var elt = document.createElement('div');
        elt.innerHTML = text;

        var elts = elt.getElementsByTagName('td');
        for (var ee = 0; ee < elts.length; ee++) {
            if (/^(<img src="\/images\/b.gif" width="1" height="6"><br>)?\d+\.$/.test(elts[ee].innerHTML) ||
                    /^(<img src="\/images\/b.gif" height="6" width="1"><br>)?\d+\.$/.test(elts[ee].innerHTML)) {
                // Next td elt contains movie title, year and AKAs.
                if (ee + 1 === elts.length) {
                    // No next td elt.
                    continue;
                }

                // Handle HTML entities again...
                text = html_entity_decode(elts[ee + 1].innerHTML);

                if (regex_english.test(text) &&
                        !RegExp.$4) {   // Make sure it's no video game.
                    detail.imdb_id = RegExp.$1;
                    detail.imdb_title = RegExp.$2;
                    detail.imdb_year = RegExp.$3;

                    result = true;
                    break;
                }

                if (undefined !== regex_rest && regex_rest.test(text) &&
                        !RegExp.$4) {   // Make sure it's no video game.
                    detail.imdb_id = RegExp.$1;
                    detail.imdb_title = RegExp.$2;
                    detail.imdb_year = RegExp.$3;

                    result = true;
                    break;
                }

                // Already processed next element.
                ee++;
            }
        }

        return result;
    }

    function runTitleMatchAlgorithm(detail, algo, text) {
        // Find first occurrence of movie title + year
        // Return first match only, so don't use g flag.
        // Don't include closing ) in year to match (1998/I) as well.
        // First occurrence would use imdbified title.

        // NOTE: THAT ALL HTML ENTITIES HAVE BEEN CONVERTED TO REGULAR
        // CHARACTERS, SO DON'T USE HTML ENTITIES IN THE REGEX BELOW,
        // EVEN THOUGH THERE MAY BE HTML ENTITIES IN THE PAGE SOURCE!

        var title = getTitleUsedForImdbSearch(detail, algo);

        // Titles do NOT use imdbified title for English titles...
        var esc_title_english = regexEscape(title);
        var regex_english = new RegExp("<a href=\"/title/(tt\\d+)/\".*?>\"?(" + esc_title_english + ")\"?</a> \\((" + detail.year + ").*?\\) (\\(VG\\))?", "i");

        // ...but titles DO use imdbified title for foreign titles.
        var esc_title_rest = regexEscape(imdbifyTitle(title));
        var regex_rest;
        if (esc_title_english !== esc_title_rest) {
            regex_rest = new RegExp("<a href=\"/title/(tt\\d+)/\".*?>\"?(" + esc_title_rest + ")\"?</a> \\((" + detail.year + ").*?\\) (\\(VG\\))?", "i");
        }

        return runRealMatchAlgorithm(detail, text, regex_english, regex_rest);
    }

    function runAkaMatchAlgorithm(detail, algo, text) {
        // Another possibility is that the title is an alias, or AKA.
        // This happens a lot with foreign films, e.g. "The Machinist"
        // (which is listed under "El Maquinista").
        // Solving this case is not easy:
        // 1. At this point, we can't be sure of the title.
        // 2. At this point, there are multiple results listed,
        //    each with AKAs.
        // 3. Matching AKAs and movie titles in the IMDB result page
        //    is hard.

        // NOTE: THAT ALL HTML ENTITIES HAVE BEEN CONVERTED TO REGULAR
        // CHARACTERS, SO DON'T USE HTML ENTITIES IN THE REGEX BELOW,
        // EVEN THOUGH THERE MAY BE HTML ENTITIES IN THE PAGE SOURCE!

        var title = getTitleUsedForImdbSearch(detail, algo);

        // AKA titles do NOT use imdbified title for English titles...
        var esc_title_english = regexEscape(title);
        var regex_english = new RegExp("<a href=\"/title/(tt\\d+)/\".*?>(.*?)</a> \\((" + detail.year + ").*?\\) (\\(VG\\))?.*?aka <em>\"" + esc_title_english + "\"", "im");

        // ...but AKA titles DO use imdbified title for foreign titles.
        var esc_title_rest = regexEscape(imdbifyTitle(title));
        var regex_rest;
        if (esc_title_english !== esc_title_rest) {
            regex_rest = new RegExp("<a href=\"/title/(tt\\d+)/\".*?>(.*?)</a> \\((" + detail.year + ").*?\\) (\\(VG\\))?.*?aka <em>\"" + esc_title_rest + "\"", "im");
        }

        return runRealMatchAlgorithm(detail, text, regex_english, regex_rest);
    }

    function runNextImdbTitleMatchAlgorithm(detail, curAlgo, text) {
        // Determine next IMDB title match algorithm.
        var nextAlgo = getNextImdbTitleMatchAlgorithm(detail, curAlgo);

        var matched = false, findNextAlgo = false, idx;

        if (ALGO_psn code generator_ALT_TITLE === nextAlgo) {
            // Just do the search.
        } else if (ALGO_psn code generator_ALT_TITLE_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_psn code generator_ALT_TITLE_FIRST_PART === nextAlgo) {
            // Alternate title contains two different titles; try first one.
            idx = detail.alt.indexOf(' / ');   // Don't use '/'!
            detail.imdb_title = detail.alt.substring(0, idx);
        } else if (ALGO_psn code generator_ALT_TITLE_FIRST_PART_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_psn code generator_ALT_TITLE_SECOND_PART === nextAlgo) {
            // Alternate title contains two different titles; try second one.
            idx = detail.alt.indexOf(' / ');   // Don't use '/'!
            detail.imdb_title = detail.alt.substring(idx + 3);
        } else if (ALGO_psn code generator_ALT_TITLE_SECOND_PART_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_psn code generator_TITLE === nextAlgo) {
            // Just do the search.
        } else if (ALGO_psn code generator_TITLE_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_psn code generator_TITLE_FIRST_PART === nextAlgo) {
            // Title contains two different titles; try first one.
            idx = detail.title.indexOf(' / ');   // Don't use '/'!
            detail.imdb_title = detail.title.substring(0, idx);
        } else if (ALGO_psn code generator_TITLE_FIRST_PART_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_psn code generator_TITLE_SECOND_PART === nextAlgo) {
            // Title contains two different titles; try second one.
            idx = detail.title.indexOf(' / ');   // Don't use '/'!
            detail.imdb_title = detail.title.substring(idx + 3);
        } else if (ALGO_psn code generator_TITLE_SECOND_PART_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else if (ALGO_psn code generator_TITLE_SUBSTRING === nextAlgo) {
            // Titles like "2001: A Space Odyssey" are correctly resolved,
            // but titles like "Blade Runner: The Final Cut" are not.
            // Give those that fail another chance; try it without the ":".
            // But try only once, to avoid incorrect matches, e.g. for
            // Lisa Lampanelli: Dirty Girl: No Protection.
            idx = detail.title.lastIndexOf(':');   // Use psn code generator title.
            detail.imdb_title = detail.title.substring(0, idx);
        } else if (ALGO_psn code generator_TITLE_SUBSTRING_AKA === nextAlgo) {
            if (runAkaMatchAlgorithm(detail, nextAlgo, text)) {
                matched = true;
            } else {
                findNextAlgo = true;
            }
        } else {
            // Undefined algo.  Keep IMDB data empty and continue.
            detail.imdb_id = '';
            detail.imdb_title = '';
            detail.imdb_year = '';

            // Treat as success, so that rating gets saved.
            matched = true;
        }

        if (matched) {
            processSuccessfulImdbTitleMatch(detail);
        } else if (findNextAlgo) {
            runNextImdbTitleMatchAlgorithm(detail, nextAlgo, text);
        } else {
            var delayed = function () {
                getImdbId(detail, nextAlgo);
            };
            timer = setTimeout(delayed, XHR_REQUEST_DELAY);
        }
    }

    function doImdbWork() {
        if (imdbQueueIndex < imdbQueue.length) {
            // Update progress.
            updateProgress('Fetching IMDB IDs: ' +
                    Math.floor(100 * imdbQueueIndex / imdbQueue.length) +
                    '% completed');

            // Do more work.
            var work = imdbQueue[imdbQueueIndex];
            imdbQueueIndex++;
            runNextImdbTitleMatchAlgorithm(work);
        } else {
            // Done.
            stopWorking(false, false);
        }
    }



    //
    // These functions define the sequence of steps to process a work unit.
    //

    function stopEarly(rating) {
        var result = true;

        // Include current rating in test.
        do {
            if (document.getElementById('rating' + rating).checked) {
                result = false;
            }
        } while (--rating >= 0);

        return result;
    }

    function cleanDetail(detail) {
        if (!document.getElementById('col_id').checked) {
            delete detail.id;
        }
        if (!document.getElementById('col_title').checked) {
            delete detail.title;
        }
        if (!document.getElementById('col_alttitle').checked) {
            delete detail.alt;
        }
        if (!document.getElementById('col_year').checked) {
            delete detail.year;
        }
        if (!document.getElementById('col_genre').checked) {
            delete detail.genre;
        }
        if (!document.getElementById('col_rating').checked) {
            delete detail.rating;
        }
        if (!document.getElementById('col_imdb_id').checked) {
            delete detail.imdb_id;
        }
        if (!document.getElementById('col_imdb_title').checked) {
            delete detail.imdb_title;
        }
        if (!document.getElementById('col_imdb_year').checked) {
            delete detail.imdb_year;
        }

        return detail;
    }

    function parseRatingsPage(num, text) {
        // As no queue is used for scraping the ratings pages,
        // need to check explicitly before going to next page.
        if (stop) {
            return;
        }

        // Update progress.
        if (0 !== maxRatingNum) {
            updateProgress('Fetching page ' + num + ' of ' + maxPageNum +
                    ' pages (' + Math.floor(100 * num / maxPageNum) + '%)');
        } else {
            updateProgress('Fetching page ' + num + '...');
        }

        totalPages++;
        var seenOne = false;
        var stopNow = false;

        // JavaScript does not support regex spanning multiple lines...
        // So, added "(?:.*?\n)*?" before the ".*?stars" part.
        //var regex = /"title"><a.*?\/(\d+?)\?trkid=.*?>(.*?)<.*?"list-titleyear">.*?\((.*?)\)<.*?("list-alttitle">(.*?)<.*?)?"list-genre">(.*?)<.*?sbmf-(\d+)"/gim;
        var regex = /"title\s*?"><a.*?\/(\d+?)\?trkid=.*?>(.*?)<(?:.*?\n)*?.*?sbmf-(\d+)/gim;
        while (regex.test(text)) {
            seenOne = true;

            // TODO: account for 1/2 star ratings.
            //var rating = Math.floor(RegExp.$7 / 10);
            var rating = Math.floor(RegExp.$3 / 10);

            // If no other ratings need to be exported, stop early.
            if (stopEarly(rating)) {
                stopNow = true;
                break;
            }
            if (!document.getElementById('rating' + rating).checked) {
                continue;
            }
            totalRatings++;

            var detail = {
                'id': RegExp.$1,
                'title': RegExp.$2,
                //'year': RegExp.$3,
                //'alt': RegExp.$5,
                //'genre': RegExp.$6,
                //'rating': RegExp.$7 / 10
                //'genre': RegExp.$3,
                'rating': RegExp.$3 / 10
            };

            if (GET_IMDB_DATA) {
                // Make IMDB calls after visiting all ratings pages.

                // Save memory by only storing values for columns of interest.
                detail = cleanDetail(detail);

                imdbQueue.push(detail);
            } else {
                saveRating(detail);
            }
        }

        if (!seenOne) {
            // Possibly another profile page.

            // JavaScript does not support regex spanning multiple lines...
            // So, added "(?:.*?\n)*?" before the ".*?stars" part.
            //var regex = /"title"><a.*?\/(\d+?)\?trkid=.*?>(.*?)<.*?"list-titleyear">.*?\((.*?)\)<.*?("list-alttitle">(.*?)<.*?)?"list-genre">(.*?)<.*?sbmf-(\d+)"/gim;
            var regex = /"title">(?:.*?\n)*?.*?<a.*?\/(\d+?)\?trkid=.*?>(.*?)<(?:.*?\n)*?.*?genre">(.*?)<(?:.*?\n)*?.*?sbmf-(\d+)/gim;
            while (regex.test(text)) {
                seenOne = true;

                // TODO: account for 1/2 star ratings.
                //var rating = Math.floor(RegExp.$7 / 10);
                var rating = Math.floor(RegExp.$4 / 10);

                // If no other ratings need to be exported, stop early.
                if (stopEarly(rating)) {
                    stopNow = true;
                    break;
                }
                if (!document.getElementById('rating' + rating).checked) {
                    continue;
                }
                totalRatings++;

                var detail = {
                    'id': RegExp.$1,
                    'title': RegExp.$2,
                    //'year': RegExp.$3,
                    //'alt': RegExp.$5,
                    //'genre': RegExp.$6,
                    //'rating': RegExp.$7 / 10
                    'genre': RegExp.$3,
                    'rating': RegExp.$4 / 10
                };

                if (GET_IMDB_DATA) {
                    // Make IMDB calls after visiting all ratings pages.

                    // Save memory by only storing values for columns of interest.
                    detail = cleanDetail(detail);

                    imdbQueue.push(detail);
                } else {
                    saveRating(detail);
                }
            }
        }

        if (!seenOne) {
            // Fix 1.14... should this replace the "Possibly another profile page" above?

            // JavaScript does not support regex spanning multiple lines...
            // So, added "(?:.*?\n)*?" before the ".*?stars" part.
            //var regex = /"title"><a.*?\/(\d+?)\?trkid=.*?>(.*?)<.*?"list-titleyear">.*?\((.*?)\)<.*?("list-alttitle">(.*?)<.*?)?"list-genre">(.*?)<.*?sbmf-(\d+)"/gim;
            var regex = /"title">(?:.*?\n)*?.*?<a.*?\/(\d+?)\?trkid=.*?>((.*?\n)*?.*?)<(?:.*?\n)*?.*?"genre">(.*?)<(?:.*?\n)*?.*?sbmf-(\d+)/gim;
            while (regex.test(text)) {
                seenOne = true;

                // TODO: account for 1/2 star ratings.
                //var rating = Math.floor(RegExp.$7 / 10);
                var rating = RegExp.$5 / 10;
                var ratingFloor = Math.floor(rating);
                var genre = RegExp.$4;

                // If no other ratings need to be exported, stop early.
                if (stopEarly(ratingFloor)) {
                    stopNow = true;
                    break;
                }
                if (!document.getElementById('rating' + ratingFloor).checked) {
                    continue;
                }
                totalRatings++;

                var detail = {
                    'id': RegExp.$1,
                    'title': trim(RegExp.$2),
                    //'year': RegExp.$3,
                    //'alt': RegExp.$5,
                    //'genre': RegExp.$6,
                    //'rating': RegExp.$7 / 10
                    'genre': genre,
                    'rating': rating
                };

                if (GET_IMDB_DATA) {
                    // Make IMDB calls after visiting all ratings pages.

                    // Save memory by only storing values for columns of interest.
                    detail = cleanDetail(detail);

                    imdbQueue.push(detail);
                } else {
                    saveRating(detail);
                }
            }
        }

        if (!seenOne && totalRatings === 0) {
            // Either user has no ratings at all,
            // or user has not enabled the "accept third-party cookies" setting.
            if (text.match(/Once you've enabled cookies, /)) {
                alert('You must enable the "accept third-party cookies" ' +
                        'setting.\nSee the output area for instructions.');
                clearOutput();
                addOutput('You must enable the "accept third-party cookies" ' +
                        'setting:\n1. Windows: Select "Options" from the ' +
                        '"Tools" menu.\n   Macintosh: Select "Preferences" ' +
                        'from the "Firefox" menu.\n2. Click the "Privacy" ' +
                        'icon.\n3. Check the "Accept third-party cookies" ' +
                        'checkbox under the "Cookies" section.\n4. Windows: ' +
                        'Click "OK" on the "Options" window.\n   Macintosh: ' +
                        'Close the "Preferences" window.\n');
                addOutput('You may disable the "accept third-party cookies" ' +
                        'setting again after running the script.');
            } else {
                alert('Could not extract ratings; please contact the author of this script.');
            }
            stopWorking(true, true);
            return;
        }

        if (!stopNow && text.match(/>next</i) && !text.match(/next-inactive/i)) {
            // Next page.
            var delayed = function () {
                getRatingsPage(num + 1);
            };
            timer = setTimeout(delayed, XHR_REQUEST_DELAY);
        } else {
            // Processed all ratings pages; now do IMDB work.
            doImdbWork();
        }
    }

    function parseImdbPage(detail, algo, text) {
        // As no queue is used for scraping the ratings pages,
        // need to check explicitly before going to next page.
        if (stop) {
            return;
        }

        // Note: "text" can contain either the search results page or the
        // movie page itself.

        // For foreign movie titles like "Le Fabuleux Destin d'Amélie
        // Poulain" special characters may be encoded as HTML entities,
        // e.g. "é" -> "&#233;".  In JavaScript, it's hard to encode
        // special characters as HTML entities, but decoding them is easy.
        // So, let's do that here.
        // Also, this helps make extracted strings readable for the user.
        // NOTE: THE LINE BELOW CONVERTS ALL HTML ENTITIES TO REGULAR
        // CHARACTERS SO THE REGEX BELOW SHOULD NOT CONTAIN ANY HTML ENTITIES!
        text = html_entity_decode(text);

        var success = false;
        var regex = new RegExp("<title>.*?Search.*?</title>", "m");
        if (regex.test(text)) {
            // Multiple search results found.
            if (runTitleMatchAlgorithm(detail, algo, text)) {
                success = true;
            }
        } else {
            // Went straight to the movie itself.
            // This means IMDB recognized the search string and found an exact
            // match or knew how to interpret the query to locate another
            // match.  This happens with '13 Conversations About One Thing',
            // which maps to 'Thirteen Conversations About One Thing'.
            // And then there are the "imdbified" titles...

            // NOTE: THAT ALL HTML ENTITIES HAVE BEEN CONVERTED TO REGULAR
            // CHARACTERS, SO DON'T USE HTML ENTITIES IN THE REGEX BELOW,
            // EVEN THOUGH THERE MAY BE HTML ENTITIES IN THE PAGE SOURCE!
            regex = new RegExp("<title>(.*?) \\((\\d{4}).*?</title>(?:.*?\n)*?.*?/title/(tt\\d+)/", "im");
            if (regex.test(text)) {
                success = true;
                detail.imdb_title = RegExp.$1;
                detail.imdb_year = RegExp.$2;
                detail.imdb_id = RegExp.$3;
            }
        }

        if (success) {
            processSuccessfulImdbTitleMatch(detail);
        } else {
            runNextImdbTitleMatchAlgorithm(detail, algo, text);
        }
    }



    // Return publicly accessible variables and functions.
    return {
        //
        // Public functions
        // (These access private variables and functions through "closure".)
        //

        // Initialize this script.
        init: function () {
            // Build the GUI for this script.
            buildGui();

            // Now wait for user to press Start button.
        }
    };
}()).init();   // Auto-run this script.
// End singleton pattern.

///////////////////////////////////////////////////////////////////////////////