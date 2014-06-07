// vim: et ts=4 sw=4 ai tw=80

// ==UserScript==
// @name           Yodlee MoneyCenter Tweaks
// @namespace      http://www.arthaey.com
// @description    Slight modifications to Yodlee MoneyCenter
// @include        https://moneycenter.yodlee.com/moneycenter/*
//
// @author         Arthaey Angosii
// @version        0.1
// ==/UserScript==

/* CHANGELOG:
 *  v0.1 - initial release
 */

window.addEventListener("load", function() {

    const Options = new Object();

    // Removes the auto-login drop-down menu and all "go to site" links.
    Options.hideAutoLogin = true;

    // Adds day of week to transactions' dates (one of UMTWRFS).
    Options.dayOfWeek = true;

    // Colors transaction table rows in alterating colors.
    Options.stripeTransactions = true;
    Options.stripeColor = "#f6f7f8";

    /* SKINNING METHODS ******************************************************/

    function run() {
        var debugInfo = "Skinning Yodlee MoneyCenter, with these options:";
        for (var option in Options) {
            debugInfo += "\n - " + option + ": " + Options[option];
        }
        debug(debugInfo);

        if (Options.hideAutoLogin)      { hideAutoLogin(); }
        if (Options.dayOfWeek)          { dayOfWeek(); }
        if (Options.stripeTransactions) { stripeTransactions(); }
    }

    function hideAutoLogin() {
        // hide the drop-down menu at the top of the dashboard page
        var autoLogin = $$(".autologin");
        // We're only expecting the one auto-login div. If that's not what
        // we found, then don't try to hide the drop-down menu.
        if (autoLogin.length == 1) {
            autoLogin[0].style.display = "none";
        }

        // hide the "got to site" links
        runAtIntervalsUntil(function() {
            var links = document.getElementsByTagName("a");
            var link, sibling;

            for (var i = 0; i < links.length; i++) {
                link = links[i];
                sibling = link.nextSibling;

                if (link.textContent.match(/go to site|auto-login/)) {
                    link.style.display = "none";
                    // remove "|" if that text follows the link
                    if (sibling.nodeType == 3 /* TEXT */ &&
                        sibling.textContent.match(/^\s*\|\s*$/))
                    {
                        sibling.parentNode.removeChild(sibling);
                    }
                }
            }
        }, 5, 30);
    }

    function dayOfWeek() {
        forEachTransactionTable(function(table) {
            var weekday = ["U", "M", "T", "W", "R", "F", "S"];
            var cell, match, date;

            for (var i = 0; i < table.rows.length; i++) {
                for (var j = 0; j < table.rows[i].cells.length; j++ ) {
                    cell = table.rows[i].cells[j];
                    if (match = cell.textContent.match(/(\d{2})\/(\d{2})\/(\d{4})/)) {
                        date = new Date(match[3], parseInt(match[1]) - 1, match[2]);
                        cell.innerHTML = weekday[date.getDay()] +
                            "&nbsp;" + cell.textContent;
                    }
                }
            }
        });
    }

    function stripeTransactions() {
        GM_addStyle("tr.zebraStripe { background-color: " +
            Options.stripeColor + "; }");
        // highlight takes precedence over striping
        GM_addStyle("tr.zebraStripe.highlight { background-color: #ffffe5; }");

        forEachTransactionTable(function(table) {
            for (var r = 0; r < table.rows.length; r += 2) {
                table.rows[r].className += " zebraStripe";
            }
        });
    }

    /* SKINNING UTILITY METHODS **********************************************/

    var _transactionTables = null;

    /* The transaction tables can take a while to load, and they do so
     * asynchronously. So if you want to do something to each transaction table
     * on a page, use this function and pass in the function that will process
     * one table.
     *
     * If no transaction tables show up in 30 seconds, this function will give
     * up and stop calling your function. It will return true if it called your
     * function, false if it did not.
     */
    function forEachTransactionTable(processFunc) {
        _transactionTables = null;
        var hasRun = false;

        runAtIntervalsUntil(_checkForTransactionTables, 5, 30);

        runAtIntervalsUntil(function() {
            if (hasRun || _transactionTables == null) { return; }
            for (var i = 0; i < _transactionTables.length; i++) {
                processFunc(_transactionTables[i]);
            }
            hasRun = true;
        }, 6, 45);

        return hasRun;
    }

    function _checkForTransactionTables() {
        if (_transactionTables) { return _transactionTables; }

        var results = [];
        var tables = document.getElementsByTagName("table");
        var table;

        for (var i = 0; i < tables.length; i++) {
            table = tables[i];
            if (table.id.match(/^Txn/)) {
                results.push(table);
            }
        }

        if (results.length > 0) {
            _transactionTables = results;
            debug("Found " + results.length + " transaction tables.");
        }

        return results;
    }

    /* GENERIC UTILITY METHODS ***********************************************/

    var DEBUG = false;

    function debug(msg) {
        if (DEBUG) console.log(msg);
    }

    function runAtIntervalsUntil(func, intervalSeconds, untilSeconds) {
        var intervalObj = window.setInterval(func, intervalSeconds);
        window.setTimeout(function(intervalObj) {
            window.clearInterval(intervalObj);
        }, untilSeconds);
    }

    /* From http://wiki.greasespot.net/Code_snippets */
    function $$(xpath,root) {
        xpath = xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3').
                replace(/\.([\w-]+)(?!([^\]]*]))/g,'[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]').
                replace(/#([\w-]+)/g,'[@id="$1"]').
                replace(/\/\[/g,'/*[');
        var str = '(@\\w+|"[^"]*"|\'[^\']*\')';
        xpath = xpath.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'),'contains($1,$2)').
                replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'),'starts-with($1,$2)').
                replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'),'substring($1,string-length($1)-string-length($2)+1)=$2');

        var got = document.evaluate(xpath, root || document, null, null, null);
        var result = [];
        var next;

        while (next = got.iterateNext()) {
            result.push(next);
        }

        return result;
    }

    // http://wiki.greasespot.net/Code_snippets#Make_script_accessible_to_Firebug
    function makeAvailableToFirebug() {
        return makeAvailableToFirebug.caller.toString().
            replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')
    }
    document.body.appendChild(document.createElement('script')).innerHTML =
        makeAvailableToFirebug();


    /* RUN THE SCRIPT ********************************************************/

    run();

}, true);
