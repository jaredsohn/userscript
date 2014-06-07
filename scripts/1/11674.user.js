// ==UserScript==
// @name           Yodlee Virtual Subaccounts
// @namespace      http://www.arthaey.com
// @description    Adds virtual subaccounts to Yodlee Moneycenter
// @include        https://moneycenter.yodlee.com/moneycenter/accountSummary.moneycenter.do*
// @include        https://moneycenter.yodlee.com/moneycenter/networth.moneycenter.do*
// @include        https://moneycenter.yodlee.com/moneycenter/dashboard.moneycenter.do*
// @version        1.3
// ==/UserScript==

/* HOW TO USE:
 *
 * By setting an account's caption/description with a specially formatted string,
 * you can have virtual subaccounts. The string format is:
 *
 *   My First Subaccount XX% $X,XXX.XX max;
 *    |                   |   |         |
 *    '-> name            |   |         `-> optional (see below)
 *                        |   |
 *                        |   `-> dollar goal
 *                        |
 *                        `-> percentage
 *
 * You can have have multiple subaccounts. You need to have either a percentage
 * or a specific dollar goal; you may have both, but that's optional. The
 * percentage limits the value of the subaccount to a fraction of the real
 * account's value. The dollar goal limits the value of the subaccount to a
 * set dollar amount.
 *
 * The "max" is optional. Without it, the subaccount's value will be the
 * minimum of its percentage and goal. With it, the value will be the maximum.
 *
 * The value of the real account is distributed among the virtual subaccounts
 * in order, trying to completely satisfy the first subaccount before
 * distributing any funds to the second subaccount, and so on. Keep this is
 * mind when you define the order of your subaccounts, especially if you use
 * the "max" setting.
 *
 * EXAMPLE:
 *
 *   Emergency Fund 50% $12,000; Laptop 25% $2000 max; Travel 20%; Other $100;
 *
 * CHANGELOG:
 *  v1.3 - added subaccounts to the Dashboard page's Net Worth module
 *  v1.2 - added subaccounts to the Net Worth Statement page
 *  v1.1 - updated to work with Yodlee 8.0
 *  v1.0 - initial release (subaccounts only on the Accounts Summary page)
 *
 */

window.addEventListener("load", function(){

    var DEBUG = false;

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

    String.prototype.trim = function() { return this.replace(/^\s+|\s+$/, ''); };

    /* VIRTUAL SUBACCOUNTS OBJECT ********************************************/

    const Site = new Object();

    Site.BASE_URL        = "https://moneycenter.yodlee.com/moneycenter/";
    Site.ACCOUNT_SUMMARY = Site.BASE_URL + "accountSummary.moneycenter.do";
    Site.NET_WORTH       = Site.BASE_URL + "networth.moneycenter.do";
    Site.DASHBOARD       = Site.BASE_URL + "dashboard.moneycenter.do";

    Site.page = null;

    Site.determinePage = function() {
        var url = window.location.href;
        var pages = [Site.ACCOUNT_SUMMARY, Site.NET_WORTH, Site.DASHBOARD];
        for (var i in pages) {
            var page = pages[i];
            if (url.match('^' + page)) {
                Site.page = page;
                break;
            }
        }
        debug("Site.page == " + Site.page);
    }

    const Subaccounts = new Object();

    Subaccounts.all = [];

    Subaccounts.parseCaption = function(fullCaption, parentAccount) {
        var name, percent, goal;
        name = percent = goal = null;

        fullCaption = fullCaption.trim();
        var captions = fullCaption.split(";");
        var matches, subaccount;
        var thisParse = [];

        for (var i = 0; i < captions.length; i++) {
            matches = captions[i].match(SUBACCOUNTS);
            if (matches) {
                name = matches[NAME_NDX];

                goal = matches[GOAL_NDX] || matches[GOAL_ONLY_NDX];
                if (goal) { goal = stringToMoney(goal); }

                percent = matches[PERCENT_NDX] || matches[PERCENT_ONLY_NDX];
                if (percent) { percent /= 100; }

                subaccount = new Subaccount(name, percent, goal, parentAccount);

                modifiers = matches[MODIFIERS_NDX];
                if (modifiers == "max") { subaccount.max = true };

                thisParse.push(subaccount);
                this.all.push(subaccount);
            }
        }

        return thisParse;
    };

    function Subaccount(name, percent, goal, parentAccount) {
        this.name = name;
        this.percent = percent;
        this.goal = goal;
        this.parentAccount = parentAccount;
        this.amount = null;
        this.max = false;

        this.toString = function() {
            return this.name + " " + moneyToString(this.amount);
        };

        this.settingsHTML = function() {
            var content;
            var html = document.createElement("span");

            if (!this.percent && !this.goal) return html;

            if (this.percent) {
                var percent = (this.percent * 100) + "%";
                if (this.amount >= this.percent * this.parentAccount.amount) {
                    content = document.createElement("b");
                    content.appendChild(document.createTextNode(percent));
                }
                else {
                    content = document.createTextNode(percent);
                }
                html.appendChild(content);
            }

            if (this.percent && this.goal) {
                content = (this.max ? " or " : " only ");
                html.appendChild(document.createTextNode(content));
            }

            if (this.goal) {
                if (this.amount >= this.goal) {
                    content = document.createElement("b");
                    content.appendChild(document.createTextNode(
                        moneyToString(this.goal)));
                    html.appendChild(document.createTextNode("up to "));
                    html.appendChild(content);
                }
                else {
                    var goal = "up to " + moneyToString(this.goal);
                    html.appendChild(document.createTextNode(goal));
                }
            }

            return html;
        };
    }

    const Accounts = new Object();

    Accounts.parseAmount = function(tableRow) {
        var cellNdx;
        switch (Site.page) {
            case Site.ACCOUNT_SUMMARY:
                cellNdx = 2;
                break;
            case Site.NET_WORTH:
            case Site.DASHBOARD:
                cellNdx = 1;
                break;
            default:
                return null;
        }
        var amountTD = tableRow.getElementsByTagName("td")[cellNdx];
        return stringToMoney(amountTD.textContent);
    };

    function Account(name) {
        this.name = name;
        this.subaccounts = null;
        this.captionDiv = null;
        this.amount = 0;
        this.amountUnassigned = 0;

        this.toString = function() {
            return this.name + " (" + this.subaccounts.length + " subaccounts)";
        };

        this.addSubaccountRows = function() {
            if (this.captionDiv == null) return;

            // create a fake subaccount for all unassigned, "leftover" money
            this.distributeFunds();
            var unassigned = new Subaccount("Unassigned");
            unassigned.amount = this.amountUnassigned;
            var subaccounts = Array.concat(this.subaccounts, [unassigned]);

            var subaccount, row, nameCell, amountCell, settingsCell;
            var subaccountTable = document.createElement("table");

            // create table headers
            row = document.createElement("tr");
            nameHeader = document.createElement("th");
            amountHeader = document.createElement("th");
            settingsHeader = document.createElement("th");

            nameHeader.appendChild(document.createTextNode("Subaccount"));
            amountHeader.appendChild(document.createTextNode("Value"));
            settingsHeader.appendChild(document.createTextNode("Settings"));

            row.appendChild(nameHeader);
            row.appendChild(amountHeader);
            row.appendChild(settingsHeader);
            subaccountTable.appendChild(row);

            // create row for each subaccount
            for (var i = 0; i < subaccounts.length; i++) {
                subaccount = subaccounts[i];
                row = document.createElement("tr");
                nameCell = document.createElement("td");
                amountCell = document.createElement("td");
                settingsCell = document.createElement("td");

                nameCell.appendChild(document.createTextNode(subaccount.name));
                amountCell.appendChild(document.createTextNode(
                    moneyToString(subaccount.amount)));
                settingsCell.appendChild(subaccount.settingsHTML());

                nameCell.style.width = "100%";
                if (subaccount.name == "Unassigned") {
                    nameCell.style.fontStyle = "italic";
                }
                amountCell.style.textAlign = "right";
                amountCell.style.whiteSpace = "nowrap";
                settingsCell.style.whiteSpace = "nowrap";

                row.appendChild(nameCell);
                row.appendChild(amountCell);
                row.appendChild(settingsCell);
                subaccountTable.appendChild(row);
            }

            // add new subaccounts table and remove the original caption
            this.captionDiv.parentNode.insertBefore(
                subaccountTable, this.captionDiv.nextSibling);
            this.captionDiv.parentNode.removeChild(this.captionDiv);
            this.captionDiv = null;
        };

        this.distributeFunds = function() {
            var amountLeft = this.amount;
            var subaccount, amount;

            for (var i = 0; i < this.subaccounts.length; i++) {
                subaccount = this.subaccounts[i];
                amount = null;

                if (subaccount.max) {
                    var want = Math.max(subaccount.percent * this.amount, subaccount.goal);
                    amount = Math.min(want, amountLeft);
                }
                else {
                    if (subaccount.percent) {
                        amount = Math.min(subaccount.percent * this.amount, amountLeft);
                    }
                    if (subaccount.goal) {
                        amount = Math.min(subaccount.goal,
                            (subaccount.percent ? amount : amountLeft));
                    }
                }

                amountLeft -= amount;
                subaccount.amount = amount;
            }

            this.amountUnassigned = amountLeft;
        };
    }

    /* VIRTUAL SUBACCOUNTS REGULAR EXPRESSIONS *******************************/

    // name (maybe multi-word), not followed by '%', followed by whitespace
    const NAME = "(\\w+(?:\\s+\\w+)*)(?!%)(?=\\s+)";

    // numbers, followed by '%'
    const PERCENT = "(\\d+)(?:%)";

    // '$', followed by numbers (maybe comma-separated), maybe with cents
    const GOAL = "[$]((?:\\d{1,3},?)*\\d{1,3}(?:[.]\\d{2})?)";

    // both PERCENT and GOAL, or just one or the other
    const PERCENT_AND_OR_GOAL = "(?:" + PERCENT + "\\s+" + GOAL + "|" +
                                PERCENT + "|" + GOAL + ")";

    const MODIFIERS = "(max)?";

    // optional whitespace
    const WS = "\\s*";

    // subaccount is "NAME PERCENT GOAL"; one of PERCENT or GOAL can be optional
    const SUBACCOUNT = WS + NAME + WS + PERCENT_AND_OR_GOAL + WS + MODIFIERS + WS;

    // whole string is a series of subaccounts, separated by semicolons or EOL
    const SUBACCOUNTS = "^(?:" + SUBACCOUNT + "(?:;|$))+";

    // indices for array returned by match(SUBACCOUNT)
    const ENTIRE_MATCH_NDX = 0;
    const NAME_NDX         = 1;
    const PERCENT_NDX      = 2;
    const GOAL_NDX         = 3;
    const PERCENT_ONLY_NDX = 4;
    const GOAL_ONLY_NDX    = 5;
    const MODIFIERS_NDX    = 6;

    /* VIRTUAL SUBACCOUNTS FUNCTIONS *****************************************/

    var MAX_TRIES = 3;
    var numTries = 0;

    function createSubaccounts() {
        var accountsWithVirtualSubaccounts = [];

        var accountsTable;
        switch (Site.page) {
            case Site.DASHBOARD:
                var div = document.getElementById("net_worth_module_dynamic");
                accountsTable = getElementsByClassName("datatable", "table", div)[0];
                // the dynamic Net Worth module on the dashboard can take a
                // while to load, so we'll try again later.
                if (!accountsTable && numTries++ < MAX_TRIES) {
                    debug("Expected table not found yet. Will try to create subaccounts " +
                          (MAX_TRIES - numTries) + " more times...");
                    window.setTimeout(doVirtualSubaccounts, 2000);
                    return;
                }
                break;
            case Site.ACCOUNT_SUMMARY:
            case Site.DASHBOARD:
                accountsTable = document.getElementById("accntsummary");
                break;
            default:
                return;
        }

        var accounts = getElementsByClassName("lcell", "td", accountsTable);
        if (!accounts) return;
        debug(accounts.length + " accounts found, total");

        var accountTD, name, captionDivs, caption, subaccount;
        var pattern = new RegExp(SUBACCOUNTS);

        for (var i = 0; i < accounts.length; i++) {
            accountTD = accounts[i];
            name = parseAccountName(accountTD);
            debug("Account " + i + " name: " + name);
            captionDivs = getElementsByClassName("caption", "span", accountTD);

            if (captionDivs.length > 0) {
                // if the caption is formatted as required, assume it's meant
                // to be a virtual subaccount used by this Greasemonkey script
                caption = captionDivs[0].innerHTML.trim();
                debug("Account " + i + " caption: " + caption);
                if (pattern.test(caption)) {
                    account = new Account(name);
                    account.captionDiv = captionDivs[0];
                    account.amount = Accounts.parseAmount(accountTD.parentNode);
                    // if we couldn't parse the amount, then skip this account,
                    // even though its description matches the correct format
                    if (!account.amount) {
                        debug("Could not create subaccounts for this account.");
                        continue;
                    }
                    account.subaccounts = Subaccounts.parseCaption(caption, account);
                    accountsWithVirtualSubaccounts.push(account);
                }
            }
        }

        return accountsWithVirtualSubaccounts;
    }

    function parseAccountName(accountTD) {
        var links = accountTD.getElementsByTagName("a");

        if (!links) return null;
        var nameLink = links[0];
        if (!nameLink) return null;

        return nameLink.textContent.trim().replace(/(\n|\r)+/g, '');
    }

    function prettifyCaptions(captionDiv) {
        captionDiv.innerHTML = null;
    }

    function doVirtualSubaccounts() {
        var accounts = createSubaccounts();
        if (!accounts) return;

        for (var i = 0; i < accounts.length; i++ ) {
            accounts[i].addSubaccountRows();
        }
    }

    Site.determinePage();
    doVirtualSubaccounts();

}, true);
