// vim: tw=80 ts=4 sw=4 et nu ai si
//
// ==UserScript==
// @name           Yodlee Time = Money
// @namespace      http://www.arthaey.com/
// @description    Converts money spent into time spent
// @include        https://moneycenter.yodlee.com/moneycenter/chart.moneycenter.do?*chartId=6*
// @version        1.0
// ==/UserScript==

/* HOW TO USE:
 *
 *  To set the "minutes-per-dollars" ratio:
 *
 *   1. right-click on the Greasemonkey monkey face in the status bar
 *   2. select the "Select User Script Commands" menu
 *   3. select the "Set Minutes Per Dollars" menu item
 *   4. enter in the numbers of minutes it takes you to earn $1
 *       - if it takes you more than an hour, multiply by 60 to get minutes
 *       - fractional minutes ARE allowed (15.5, for example)
 *
 * Now, go to the "Expenses Analysis" chart for your Yodlee Moneycenter account.
 * The table column titled "$ Amount" will now include the amount of time it
 * "cost" you to earn that money.
 *
 * Any time you want to update your minutes-per-dollars ratio, just select the
 * User Script Command from the Greasemonkey menu. The page will reload to
 * display the new calculations.
 *
 * CHANGELOG:
 *  v1.0 - initial release (inspired by the book "Your Money or Your Life")
 *
 */

window.addEventListener("load", function(){

    var DEBUG = true; // FIXME

    /* UTILITY FUNCTIONS *****************************************************/

    function debug(msg) {
        if (DEBUG) console.log("DEBUG: " + msg);
    }

    /* Finds elements whose id matches the given regexp. */
    function getElementsByIdRegExp(regex, restrict) {
        var matchingElements = [];

        if (!regex) return matchingElements;
        //if (restrict != "id" && restrict != "class") restrict = null;

        var elements = document.getElementsByTagName("*");
        var element;

        for (var i = 0; i < elements.length; i++) {
            element = elements[i];
            if (element.id.match(regex)) {
                matchingElements.push(element);
            }
        }

        return matchingElements;
    }

    /*
     * Written by Jonathan Snook, http://www.snook.ca/jonathan
     * Add-ons by Robert Nyman, http://www.robertnyman.com
     */
    function getElementsByClassName(className, tag, elm){
        var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
        var tag = tag || "*";
        var elm = elm || document;
        var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
        var returnElements = [];
        var current;
        var length = elements.length;
        for(var i=0; i<length; i++){
            current = elements[i];
            if(testClass.test(current.className)){
                returnElements.push(current);
            }
        }
        return returnElements;
    }

    // returns cents
    function stringToMoney(moneyStr) {
        if (!moneyStr) return null;

        // convert to string, if necessary
        if (!moneyStr.replace) {
            moneyStr = moneyStr.toString();
        }

        // remove any non-digit characters, excepting "."
        moneyStr = moneyStr.replace(/[^0-9.]/g, '');

        // add cents to even dollar amounts
        if (!moneyStr.match(/[.]/)) {
            moneyStr += ".00";
        }

        // convert to an integer amount of cents
        return Math.round(parseFloat(moneyStr) * 100);
    }

    function moneyToString(money) {
        var cents = Math.round(money);
        var even = (cents % 100 == 0);
        var moneyStr = new Number(Math.round(cents) / 100).toLocaleString();
        return "$" + moneyStr + (even ? ".00" : "");
    }

    const MIN_PER_HR  = 60;
    const MIN_PER_DAY = 60 * 24;
    const MIN_PER_YR  = 60 * 24 * 365;

    function timeToString(time) {
        if (!time) return;

        var years   = Math.floor(time / MIN_PER_YR);
        var days    = Math.floor((time - years * MIN_PER_YR) / MIN_PER_DAY);
        var hours   = Math.floor((time - days * MIN_PER_DAY) / MIN_PER_HR);
        var minutes = Math.floor(time % 60);

        var check = minutes +
                    hours * MIN_PER_HR +
                    days * MIN_PER_DAY +
                    years * MIN_PER_YR;

        if (check != Math.floor(time)) {
            debug("ERROR in time conversion: " + check + " vs " + time + " (" +
                minutes + "m, " +
                hours   + "h, " + 
                days    + "d, " + 
                years   + "y)");
        }

        var timeStr = minutes + "m";
        if (hours > 0) timeStr = hours + "h, " + timeStr;
        if (days  > 0) timeStr = days  + "d, " + timeStr;
        if (years > 0) timeStr = years + "y, " + timeStr;

        return timeStr;
    }

    String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

    /* MAIN FUNCTIONS ********************************************************/

    function promptMinutesPerDollar(oldValue) {
        return prompt("Minutes Per Dollar", oldValue);
    }

    function setMinutesPerDollar() {
        var oldValue = GM_getValue("MinutesPerDollar", null);
        GM_setValue("MinutesPerDollar", promptMinutesPerDollar(oldValue));
        if (oldValue) window.location.reload();
    }

    function getMinutesPerDollar() {
        var minutesPerDollar = GM_getValue("MinutesPerDollar", null);
        if (!minutesPerDollar) {
            minutesPerDollar = promptMinutesPerDollar("");
        }
        GM_setValue("MinutesPerDollar", minutesPerDollar);
        return minutesPerDollar;
    }

    function doConvertMoneyToTime() {
        minutesPerDollar = getMinutesPerDollar();
        if (!minutesPerDollar) return;

        var table = document.getElementById("expenseAnalysis");
        if (!table) return;

        var cells = getElementsByClassName("rcell", "td", table);
        var cell, money, moneyStr, time, timeStr;

        // both percent and money columns are "rcell", so skip every other cell
        for (var i = 1; i < cells.length; i += 2) {
            cell = cells[i];
            moneyStr = cell.textContent.trim();
            money = stringToMoney(moneyStr); // in cents, NOT dollars
            if (!money) continue;

            time = minutesPerDollar * (money / 100);
            timeStr = timeToString(time);
            debug("Row " + (i+1)/2 + ": " + moneyStr + " == " + timeStr);
            cell.innerHTML =
                "<span style='float:left'>(" + timeStr + ")</span>&nbsp;" +
                moneyStr;
        }
    }

    GM_registerMenuCommand("Set Minutes Per Dollar", setMinutesPerDollar);
    doConvertMoneyToTime();

}, true);

