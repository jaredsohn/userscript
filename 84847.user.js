// vim: ts=4 sts=4 sw=4 tw=80 et

// ==UserScript==
// @name           Word Count and Goal Tracker
// @description    Shows word count; also allows working toward a goal (eg, NaNoWriMo).
// @namespace      http://www.arthaey.com/
//
// @copyright      Arthaey Angosii <arthaey@gmail.com>
// @contributor    http://userscripts.org/users/glennji
//
// @include        http://docs*.google.com/document/edit?id=*
// @include        https://docs*.google.com/document/edit?id=*
// @require        http://usocheckup.redirectme.net/60914.js
// @version        2.0.1
//
// Based on the original "Nanowrimo Daily Wordcount" script written by glennji,
// available at http://userscripts.org/scripts/show/60632
//
// See changelog at end of file for version details.
//
// ==/UserScript==
(function (){

    /* CONSTANTS & GLOBALS ***************************************************/

    var SETTINGS = null;

    var DEFAULTS = {
        enableGoal:     true, // whether to calculate word count goal information
        wordCountGoal: 50000, // standard NaNoWriMo goal
        startDate:     firstDayOfThisMonth(), // standard NaNoWriMo goal
        endDate:       lastDayOfThisMonth(), // standard NaNoWriMo goal
        cutoffHour:        0, // midnight
        ignoreComments: true, // whether to include [comments] in word count
        jumpToEnd:      true  // whether to jump to end of document when page loads
    };

    var CONFIG = {
        enableGoal: {
            label: 'Enable word count goal?',
            value: DEFAULTS.enableGoal
        },
        wordCountGoal: {
            label: 'Word count goal:',
            value: DEFAULTS.wordCountGoal,
            display: formatNumber,
            save: unformatNumber
        },
        startDate: {
            label: 'Start on:',
            value: DEFAULTS.startDate,
            display: dateToString,
            save: stringToDate
        },
        endDate: {
            label: 'Finish by:',
            value: DEFAULTS.endDate,
            display: dateToString,
            save: stringToDate
        },
        cutoffHour: {
            label: 'Hour that counts as "end of day":',
            value: DEFAULTS.cutoffHour,
            display: hourToString,
            save: stringToHour
        },
        ignoreComments: {
            label: 'Ignore comments [in brackets]?',
            value: DEFAULTS.ignoreComments
        },
        jumpToEnd: {
            label: 'Jump to end of document?',
            value: DEFAULTS.jumpToEnd
        },
    };

    var ctrlKey = false;

    var CUSTOM_CSS = '\
        #nanocounty {                                                         \
          display: inline;                                                    \
          margin: 0;                                                          \
          padding: 4px;                                                       \
          padding-right: 10px;                                                \
          left: auto;                                                         \
          right: 0;                                                           \
          bottom: auto;                                                       \
        }                                                                     \
        #nanocounty label {                                                   \
          padding-left: 1.5em;                                                \
          padding-right: 0.5em;                                               \
        }                                                                     \
        #nanocounty blink {                                                   \
          color: red;                                                         \
          font-weight: bold;                                                  \
        }                                                                     \
        #wordCount {                                                          \
          color: black;                                                       \
          font-weight: bold;                                                  \
        }                                                                     \
        #wordCountGoalContainer {                                             \
          display: inline;                                                    \
        }                                                                     \
        #wordCountGoal.nanoWinner {                                           \
          color: white;                                                       \
          background-color: #22BA29;  /* green */                             \
        }                                                                     \
        #wordCountGoal.redAlert {                                             \
          color: red;                                                         \
        }                                                                     \
        #wordCountGoal.blueMonday {                                           \
          color: blue;                                                        \
        }                                                                     \
        #wordCountGoal.betOnBlack {                                           \
          color: black;                                                       \
        }                                                                     \
        #wordCountConfig {                                                    \
          position: absolute;                                                 \
          top: 30%;                                                           \
          left: 30%;                                                          \
          padding: 1em;                                                       \
          background-color: #E3E9FF; /* light blue like menu bar */           \
          border: 2px solid #BBCCFF; /* same as menu bar top border */        \
        }                                                                     \
        #wordCountConfig h1 {                                                 \
          font-size: 16px;                                                    \
        }                                                                     \
        #wordCountConfig label {                                              \
          display: inline-block;                                              \
          width: 16em;                                                        \
        }                                                                     \
        #wordCountConfig input[type="text"] {                                 \
          width: 9em;                                                         \
        }                                                                     \
    ';

    var CONFIG_DIALOG = null;


    /* WORD COUNT FUNCTIONS **************************************************/

    function getWordCount() {
        var count = 0;

        var regexStr = "<.*?>"; // remove HTML
        if (!SETTINGS.ignoreComments) {
            regexStr = regexStr + "|\\[.*?\\]"; // remove [comments]
        }
        var regex = new RegExp(regexStr, "g");

        var dv = window.document.getElementsByClassName("kix-documentview")[0];
        var text = dv.innerHTML.replace(regex, ' ').split('&nbsp;').join(' ');

        // remove the Table of Contents, so we don't count its words
        /* Disabled until reimplemented
        var toc = doc.getElementById("WritelyTableOfContents");
        var tocNextSibling;
        if (toc && (tocNextSibling = toc.nextSibling)) {
            toc.parentNode.removeChild(toc);
        }
        */

        if (words = text.match(/(\S+)/g)) { // split purely on whitespace
            count = words.length;
        }

        // re-insert the Table of Contents
        /*
        if (toc && tocNextSibling) {
            tocNextSibling.parentNode.insertBefore(toc, tocNextSibling);
        }*/

        console.log("Counted words:", count);

        return count;
    }

    function updateWordCount(e) {
        if (!window.parent.document.getElementById('nanocounty')) return;
        if (!SETTINGS) loadConfig();

        var wordCount = getWordCount();
        var wc = window.parent.document.getElementById('wordCount');
        wc.innerHTML = formatNumber(wordCount);

        if (!SETTINGS.enableGoal) return;

        var ONE_DAY = 24 * 60 * 60 * 1000; // milliseconds in a day
        var today = new Date();
        var daysPast = Math.ceil((today - SETTINGS.startDate) / ONE_DAY);
        var daysLeft = Math.floor((SETTINGS.endDate - today) / ONE_DAY);
        var numDays  = Math.floor((SETTINGS.endDate - SETTINGS.startDate) / ONE_DAY);

        var wordCountGoal = parseInt(SETTINGS.wordCountGoal);
        var expectedWordsPerDay = wordCountGoal / numDays;
        var difference = Math.ceil(daysPast * expectedWordsPerDay) - wordCount;

        var wcGoal = window.parent.document.getElementById('wordCountGoal');
        wcGoal.innerHTML = formatNumber(difference);
        wcGoal.parentNode.title = 'Total: ' + wordCount + '. ';

        if (wordCount >= wordCountGoal) {
            wcGoal.className = 'nanoWinner';
            wcGoal.parentNode.title += "You've won! :)";
            var blink = window.parent.document.createElement('blink');
            blink.innerHTML = '!';
            wcGoal.appendChild(blink);
        } else if (difference > 0) {
            wcGoal.className = 'redAlert';
            var wordsPerDay = Math.ceil((wordCountGoal - wordCount) / daysLeft);
            wcGoal.parentNode.title += 'Write ' + wordsPerDay +
                ' words per day to reach ' + wordCountGoal + ' words.';
        } else if (difference < 0) {
            wcGoal.className = 'blueMonday';
            wcGoal.innerHTML = '+' + formatNumber(-difference);
            wcGoal.parentNode.title += "You're done for today! :)";
        } else {
            wcGoal.className = 'betOnBlack';
            wcGoal.parentNode.title += "You're done for today! :)";
        }
    }

    /**
    * Handle all keypresses, we are looking for an Ctrl-S key-combo. Since we can't detect
    * Two keys being pressed at the same time, we first make sure the ALT key was pressed
    * then we wait to see if the S key is pressed next
    */
    function checkForSaveKeyCombo(e){
        // check to see if 'S' is pressed after Ctrl
        if (e.keyCode == 83 && ctrlKey) {
            updateWordCount(e);
        }
        else if (e.keyCode == 17) {
            ctrlKey = true;
        }
    }

    function resetKeys(e) {
        ctrlKey = false;
    }


    /* CONFIGURATION FUNCTIONS ***********************************************/

    function getDocId() {
        var url = window.parent.location.href;
        var matchData = url.match(/\?docid=(\w+?)(&|$)/);
        if (!matchData)
            return 'default';
        else
            return matchData[1];
    }

    function loadConfig() {
        SETTINGS = deserialize('docid_' + getDocId(), DEFAULTS);

        // make sure that all expected values are defined...
        for (var setting in DEFAULTS) {
            if (typeof SETTINGS[setting] == 'undefined')
                SETTINGS[setting] = DEFAULTS[setting];
        }

        // ...make sure that no unexpected values are defined
        for (var setting in SETTINGS) {
            if (typeof DEFAULTS[setting] == 'undefined')
                delete SETTINGS[setting];
        }
    }

    function displayConfigDialog() {
        if (!SETTINGS) loadConfig();

        var form = document.getElementById('wordCountConfigForm');
        var input, value, callback;
        for (var setting in DEFAULTS) {
            input = form.elements.namedItem(setting);
            value = SETTINGS[setting];

            callback = CONFIG[setting].display;
            if (callback) value = callback(value);

            if (typeof SETTINGS[setting] == 'boolean')
                input.checked = value
            else
                input.value = value;
        }

        CONFIG_DIALOG.style.display = 'block';
        updateGoalEnableness();
    }

    function closeConfigDialog() {
        var form = document.getElementById('wordCountConfigForm');
        var input, value, callback;
        for (var setting in SETTINGS) {
            input = form.elements.namedItem(setting);
            value = input.value;
            if (input.type == 'checkbox') value = input.checked;

            callback = CONFIG[setting].save;
            if (callback) value = callback(value);
            SETTINGS[setting] = value;
        }

        serialize('docid_' + getDocId(), SETTINGS);
        CONFIG_DIALOG.style.display = 'none';
        updateGoalEnableness();
        updateWordCount();
    }

    // This is *totally* a great function name. What are you talking about?
    function updateGoalEnableness() {
        var form = document.getElementById('wordCountConfigForm');
        var enabled = form.elements.namedItem('enableGoal').checked;

        // enable or disable goal-related form elements
        var input;
        for (var setting in DEFAULTS) {
            input = form.elements.namedItem(setting);
            if (setting != 'enableGoal')
                input.disabled = !enabled;
        }

        // show or hide the word count goal in the menu bar
        var display = (enabled ? 'inline' : 'none');
        document.getElementById('wordCountGoalContainer').style.display = display;
    }

    // http://wiki.greasespot.net/Code_snippets
    function deserialize(name, defaultValue) {
        try {
            return JSON.parse(localStorage.getItem(name) || defaultValue || '{}');
        } catch (e) {
            return {};
        }
    }

    // http://wiki.greasespot.net/Code_snippets
    function serialize(name, value) {
        for (m in value) {
            if (value[m] instanceof Date) {
                value[m] = value[m].toString();
            }
        }
        localStorage.setItem(name, JSON.stringify(value));
    }

    function createConfigHTML() {
        var formHTML = '<form id="wordCountConfigForm">';
        var setting, type;
        for (var settingName in CONFIG) {
            setting = CONFIG[settingName];
            type = (typeof setting.value == 'boolean' ? 'checkbox' : 'text');
            formHTML += '<label for="' + settingName + '">'
                     +  setting.label
                     +  '</label>'
                     +  '<input type="' + type + '" id="' + settingName
                     +      '" name="' + settingName + '">'
                     +  '<br>'
                     ;
        }

        formHTML += '\
              <div style="text-align:right">                                      \
                <input type="button" id="closeConfigDialog" value="Save">         \
              </div>                                                              \
            </form>                                                               \
        ';

        return '<h1>Word Count Settings</h1>' + formHTML;
    }


    /* UTILITY FUNCTIONS *****************************************************/

    // converts number to string, with commas every three digits
    function formatNumber(num) {
        var numStr = num + '';
        var decimal = numStr.split('.');
        var integer = decimal[0];
        var fraction = (decimal.length > 1 ? '.' + decimal[1] : '');

        var regex = /(\d+)(\d{3})/;
        while (regex.test(integer)) {
            integer = integer.replace(regex, '$1' + ',' + '$2');
        }

        return integer + fraction;
    }

    function unformatNumber(str) {
        return parseInt(str.replace(/[,\s]/g, ''));
    }

    function firstDayOfThisMonth() {
        var today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), 1);
    }

    // based on http://snippets.dzone.com/posts/show/2099
    function lastDayOfThisMonth() {
        var cutoffHour = 0;
        if (SETTINGS) cutoffHour = parseInt(SETTINGS.cutoffHour);

        var today = new Date();
        today.setHours(today.getHours() - cutoffHour);

        var daysInThisMonth = 32 - new Date(today.getFullYear(), today.getMonth(), 32).getDate();
        return new Date(today.getFullYear(), today.getMonth(), daysInThisMonth);
    }

    function hourToString(cutoffHour) {
        if (cutoffHour == 0) {
            return "12 AM";
        }
        else if (cutoffHour < 12) {
            return cutoffHour + " AM";
        }
        else {
            return cutoffHour + " PM";
        }
    }

    function stringToHour(cutoffStr) {
        if (cutoffStr == null || cutoffStr == '')
            return DEFAULTS.cutoffHour;

        var matchData = cutoffStr.match(/(\d+)(?::\d+)?\s*([AP]M)?/i);
        if (!matchData) {
            alert("The value '" + cutoffStr + "' is not a valid time Try '2 AM' or similar.");
            return;
        }

        var isPM = (matchData[2] && matchData[2].match(/PM/i));
        var cutoffHour = parseInt(matchData[1]);

        // special case noon and midnight
        if (cutoffHour == 24) {
            cutoffHour = 0;
        }
        else if (cutoffHour == 12 && matchData[2] /* only matters if AM/PM were defined */ ) {
            if (!isPM) cutoffHour = 0;
        }
        // add 12 to all other PM times
        else if (isPM) {
            cutoffHour += 12;
        }

        return cutoffHour;
    }

    function dateToString(dt) {
        try {
            return dt.toDateString();
        } catch(e) {
            console.error(e);
            return "";
        }
    }

    function stringToDate(str) {
        return new Date(str);
    }


    /* RUN SCRIPT AFTER PAGE LOAD ********************************************/

    function initWordCount() {
        loadConfig(); // initializes global SETTINGS variable
        GM_addStyle(CUSTOM_CSS);

        // create the DOM element used by this script
        if (!document.getElementById('nanocounty')) {
            div = document.createElement('div');
            div.id = 'nanocounty';
            div.className = 'shelly goog-toolbar-menu-button';

            // create word count elements
            labelCount = document.createElement('label');
            labelCount.innerHTML = 'Word Count:';
            wordCount = document.createElement('span');
            wordCount.id = 'wordCount';

            div.appendChild(labelCount);
            div.appendChild(wordCount);

            // create goal elements
            goalDiv = document.createElement('div');
            goalDiv.id = 'wordCountGoalContainer';
            labelGoal = document.createElement('label');
            labelGoal.innerHTML = 'Words Left Today:';
            wordCountGoal = document.createElement('span');
            wordCountGoal.id = 'wordCountGoal';

            goalDiv.appendChild(labelGoal);
            goalDiv.appendChild(wordCountGoal);
            div.appendChild(goalDiv);

            document.getElementById('docs-notice').parentNode.appendChild(div);

            // create config dialog
            CONFIG_DIALOG = document.createElement('div');
            CONFIG_DIALOG.id = 'wordCountConfig';
            CONFIG_DIALOG.innerHTML = createConfigHTML();
            CONFIG_DIALOG.style.display = 'none';
            document.body.appendChild(CONFIG_DIALOG);

            // add listeners to config dialog elements
            document.getElementById('closeConfigDialog').addEventListener('click', closeConfigDialog, false);
            document.getElementById('enableGoal').addEventListener('click', updateGoalEnableness, false);

            div.addEventListener('click', displayConfigDialog, false);

            // word count goal is assumed to be enabled by default; if it's not,
            // then we need to hide it at the start
            if (!SETTINGS.enableGoal) {
                updateGoalEnableness();
            }
        }

        // update word count, and wire up other events that will update the count too
        updateWordCount();
        window.setInterval(updateWordCount, 1000);

        // scroll to the bottom of the editor window
        if (SETTINGS.jumpToEnd) {
            unsafeWindow.scrollTo(0, unsafeWindow.document.body.scrollHeight);
        }
    };

    window.addEventListener('load', function(){
        initWordCount();
    }, false);

    // capture all onkeydown events, so we can filter for our key-combo
    window.addEventListener('keydown', checkForSaveKeyCombo, false);
    window.addEventListener('keyup', resetKeys, false);

})();

// CHANGELOG:
//
//  - version 2.1-a2:
//      - updating word count to use the new editing in Google Docs, no longer
//      frame based.
//      - update URL patterns for the new URLs gdocs uses
//  - version 2.0.1:
//      - updated URL for UsoCheckup
//  - version 2.0:
//      - can turn off goal tracking entirely and just display word count
//      - allow custom date range for goal
//      - allow different settings per document (based on docid)
//      - removed use of GM_config script
//
//  - version 1.15:
//      - always show current word count
//  - version 1.14:
//      - ignore Table of Contents for word count
//  - version 1.13:
//      - fixed bug when loading GM_config settings
//  - version 1.12:
//      - allow toggling of whether to jump to the end of the document when the
//        page loads
//  - version 1.11:
//      - store cutoff hour string and integer values separately; user's
//        formatting of the hour is preserved now
//  - version 1.10:
//      - allow toggling of whether [bracketed comments] are counted
//  - version 1.9:
//      - fixed bug that made word count with commas not save correctly
//  - version 1.8:
//      - fixed bug that made word count read "NaN" when first installed
//      - display word count goal with commas in the config window
//  - version 1.7:
//      - failed attempt at fixing the "NaN" word count bug
//  - version 1.6:
//      - added config dialog to set preferences like custom word count goal and
//        custom cutoff hour for when the next day
//  - version 1.5:
//      - allow custom cutoff hour of when the next day should start counting
//        for word count purposes
//  - version 1.4:
//      - new look for word count when you actually hit the word count goal
//  - version 1.2:
//      - ignore comments in square brackets for word count purposes
//      - more accurate calculation of how many words you must write each day
//  - version 1.1:
//      - allow custom word count goal
//      - script runs on both http and https URLs, and on "Edit" URLs
//      - trigger recount when clicking on File > Save
