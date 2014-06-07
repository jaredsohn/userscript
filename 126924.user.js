// ==UserScript==
// @name           MTurk - Expanded header info.
// @version        1.4
// @namespace      shiny9k-1
// @author         Shiny9k
// @description    This script adds some extra features under the account header links on MTurk's site. New features include displaying of your current balance along with Worker ID.
// @include        https://www.mturk.com/mturk/*
// @downloadURL    https://userscripts.org/scripts/source/126924.user.js
// @updateURL      http://userscripts.org/scripts/source/126924.meta.js
// @run-at	   document-end
// ==/UserScript==
/*
Changes:
1.4 - I did a bit of overhauling the code. The script now has a cacheWorkerID option. If this is set to 1 (default) it will use the WorkerID stored by Greasemonkey rather accessing the Dashboard for it. Overall this should speed the script up a little bit. I could do something similar too with the balance but I would honestly rather not do so as I like my balance to be up to date. But this could change if people keep having the "too many connections" problem. The script also has gotten a few more checks to prevent weird errors (like WorkerID being shown before your balance) from happening. If you have any problems please feel free to post them on the discussion section. Thanks.
1.3 - Added easy copying. What this does is it makes you not even have to double click the WorkerID to select it. Just put your mouse cursor over it and CTRL+C.
1.2 - Several changes. Code has been restructured drastically. Script should automatically update itself now when a new version is released. Overall speed of data collection should be improved and several safeguards implemented to try to ensure data is collected.
1.1 - Minor changes. Made it so balance values up to 1 million can be fetched. I doubt anyone has anything near that so the current regex should be good for quite some time.
1.0 - Initial Release
*/

// Setting this to 1 (default) makes the script only check for a WorkerID once.
// If you are using MTurk from an Internet Cafe or shared computer where others access MTurk from you may want to set this to 0.
var cacheWorkerID = '1';

// Set this higher if your WorkerID isn't displaying. NOTE: Amazon does check for page flooding so I would not recommend setting this value too high.
var retryAttempts = '10';

// Like the above variable, set this to higher if your WorkerID isn't displaying. Lowering this value is not recommended.
var retryTime = '250';

function fetchData(urlNum) {
    var timer;

    var pageURL = new Array("https://www.mturk.com/mturk/youraccount", "https://www.mturk.com/mturk/dashboard");



    if (typeof numCon === 'undefined') {
        var numCon = 0;
    } else if (numCon > retryAttempts) {
        throw new Error("Could not get data.");
    }


    GM_xmlhttpRequest({
        method: "GET",
        url: pageURL[urlNum],
        onload: function (response) {
            // Get balance
            if (urlNum == '0') {
                var reBal = /(\$\d+,?.?\d+,?.?\d+,?.?\d?\d?)/;
                var balance = response.responseText.match(reBal);
                if (balance['0']) {
                    GM_setValue('AMZ_Balance', balance['0']);
                    addToPage(balance['0'], 0, numCon);
                }

                // Get Worker
            } else if (urlNum == '1' && document.getElementById('eh_balance') != null) {
                var reWID = /ID:\s(\w+)/;
                var workerID = response.responseText.match(reWID);
                if (workerID['1']) {
                    GM_setValue('AMZ_WorkerID', workerID['1']);
                    addToPage(workerID['1'], 1, numCon);
                }

            }
        }
    });
    numCon++;
}

function addToPage(item, type, numCon) {
    // This adds the balance
    if (type == '0') {
        newSpan = document.createElement('span');
        newSpan.id = 'eh_balance';
        newSpan.style.cssText = "font-weight: bold;";
        newDiv.innerHTML += 'Current Balance: ';
        newSpan.innerHTML = item;
        newDiv.appendChild(newSpan);
        newDiv.innerHTML += ' | ';

        if (cacheWorkerID == '1' && typeof GM_getValue('AMZ_WorkerID') != 'undefined' && document.getElementById('eh_balance') != null) {
            addToPage(GM_getValue('AMZ_WorkerID'), 1);
        } else if (document.getElementById('eh_balance') != null && numCon < retryAttempts) {
            // I don't want the script flooding MTurk with too many page view attempts. Going to user the defined delays to limit it
            var timer = setTimeout(function () {
                fetchData(1, " ");
            }, retryTime);
            numCon++;
        }

        // This is for adding the Worker ID
    } else if (type == '1') {
        newDiv.innerHTML += "Worker ID: <input type='text' onmouseover='javascript:this.focus();this.select();' onmouseout='javascript:this.blur();' value='" + item + "' style='color:#c60; font-weight: bold; border: none; width: 115px;' readonly/>";

        // Not logged in. Uses previously stored values (If available) to output the header info. with
    } else if (type == '2') {
        var balance = GM_getValue('AMZ_Balance');
        var workerID = GM_getValue('AMZ_WorkerID');
        if (balance && workerID) {
            topMenu.appendChild(newDiv);
            spanGen(balance, '0');
            spanGen(workerID, '1');
        }
    }
}

// Let's start things by creating the new div. This will contain the new header items.
var newDiv = document.createElement('div');
newDiv.style.paddingTop = "1%";
newDiv.id = 'expHdr';

// Quick check to see if you're logged in. If not, we'll try writing in some previously stored values.
if (document.getElementById('user_name_field')) {
    topMenu = document.getElementById('user_name_field').parentNode;
} else {
    topMenu = document.getElementById('lnkWorkerSignin').parentNode;
}
topMenu.appendChild(newDiv);

// Let's add the new header.
if (document.getElementById('lnkWorkerSignin')) {
    addToPage(0, 2);
    // Get Cash balance and then Worker ID
} else {
    fetchData(0);
}