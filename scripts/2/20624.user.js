// ==UserScript==
// @name            Yahoo Fantasy Basketball
// @namespace       http://robobruin.com/greasemonkey/fantasysports
// @description     Live basketball fantasy scoring
// @include         http://basketball.fantasysports.yahoo.com/*
//
// ==/UserScript==

/*
This script is released under Mozilla Public License 1.1, http://www.mozilla.org/MPL/
The purpose is to provide live scoring updates for your default yahoo fantasy baseball team.

For code enhancements or feature requests, visit:
http://code.google.com/p/freebiestats/issues/list

*--!Important!--*
The script is set to run on all urls that match
http://basketball.fantasysports.yahoo.com/*
So if you're not on you daily stats page, disable it by right-clicking
on the monkey in the lower right and unchecking the script.

credits:-
http://gabrito.com/files/subModal/
http://www.sitening.com/blog/2006/03/29/create-a-modal-dialog-using-css-and-javascript/

revision
2006-Nov-05: don't rely on hard coded offset to find boxscore link
2007-Dec-15: new boxscore format

*/

(function () {
    if (!location.href.match(/^http\:\/\/basketball\.fantasysports\.yahoo\.com\/nba\/\d+\/(team\?mid=)?\d+.*/i)) {
        return;
    }

    const HIDDEN_DIV_ID = 'robobruinDiv';
    const MODAL_DIV_ID = 'robobruinModal';
    const STAT_BODY_ID = 'robobruinTableBody';
    const BUTTON_LABEL   = 'Show Freebie Stats!';
    const STAT_BUTTON_ID = 'robobruinStatBtn';

    var RE_MADE_ATTEMPT = new RegExp(".+\\D+-\\D+.+", 'g');
    
    function Baller() {
        this._playerId = '';
        this._name     = '';
        this._position = '';
        this._order = 0;
    }
    Baller.prototype.isOnBench   = function ()    {return (this._position == 'BN');}
    Baller.prototype.playerId   = function (arg) {if (arguments.length) this._playerId  = parseInt(arg); else return this._playerId;}
    Baller.prototype.name   = function (arg) {if (arguments.length) this._name  = arg; else return this._name;}
    Baller.prototype.position = function (arg) {if (arguments.length) this._position  = arg; else return this._position;}
    Baller.prototype.order       = function (arg) {if (arguments.length) this._order = parseInt(arg); else return this._order;}

    function xpath(doc, xpath) {
        return doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    function getDocument(url, player) {
        GM_xmlhttpRequest({
            method:"GET",
            url:url,
            headers:{
                "User-Agent":"monkeyagent",
                "Accept":"text/monkey,text/xml"
            },
            onload:function(details) {
                var s = new String(details.responseText);
                s = s.replace(/\n/g, ' ');
                s = s.replace(/^.*<style.*<\/style>/gi, ' ');
                s = s.replace(/^.*<body[^>]*>(.*)<\/body>.*$/gi, "$1");
                var row = processBoxscore(s, player);
                printStats(row, player);
            }
        });
    }

    function processBoxscore(html, player) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }

        div.innerHTML = html;
        var nodes = xpath(document, "//tr[contains(@class,'ysprow')]/td/a[contains(@href,'/" + player.playerId() + "')]");
        var i = nodes.snapshotLength;

        if (!i) {
            return null;
        } else {
            return nodes.snapshotItem(i - 1).parentNode.parentNode.cloneNode(true);
        }
    }

    function printStats(row, player) {
        var statBody = findOrCreateStatBody();

        if (row) {
            var rows = statBody.getElementsByTagName("TR");
            var tr = document.createElement("tr").appendChild(row);
            var td = document.createElement("td");
            td.innerHTML = player.position();
            tr.insertBefore(td, tr.firstChild);            
            statBody.replaceChild(tr, rows[player.order()]);
            if (player.isOnBench()) {
                tr.className = 'bench';
            } else {
                tr.className = (player.order() % 2 == 0) ? 'even' : 'odd';
                var totalRow = rows[rows.length-1];
                updateTotals(totalRow, tr);
            }
        }
    }

    function updateTotals(totalRow, currentRow) {
        var cells = currentRow.getElementsByTagName("TD");
        var totalCells = totalRow.getElementsByTagName("TD");

        if (cells.length < 10) {return;}

        if (totalCells.length==0) {
            for (var i=0; i < cells.length; i++) {
                totalRow.appendChild(document.createElement("td"));
            }
        }

        //index 0 is the position
        //index 1 is the name
        for (var i=2; i < cells.length; i++) {
            totalCells[i].innerHTML = sumValues(totalCells[i].innerHTML, cells[i].innerHTML);
        }
    }

    function sumValues(oldValue, newValue) {
        newValue = newValue.replace(/^\s+/,"");
        if (newValue.indexOf('-') > 0) {
            var ma = parseMadeAttempt(newValue);
            var tma = parseMadeAttempt(oldValue);
            var totalMade = parseInt(tma.made) + parseInt(ma.made);
            var totalAttempted = parseInt(tma.attempted) + parseInt(ma.attempted);

            var pct = (totalAttempted==0) ? "" : "<br/>" + parseFloat(totalMade*100/totalAttempted).toFixed(1) + "%";
            return totalMade + "-" + totalAttempted + pct;
        } else {
            var oldNumValue = parseInt(oldValue == '' ? 0 : oldValue);
            var newNumValue = parseInt(newValue);
            
            if (isNaN(newNumValue) || isNaN(oldNumValue)) {
                return '';
            } else {
                return oldNumValue + newNumValue;
            }
        }
    }

    function parseMadeAttempt(s) {
        var made = 0;
        var attempted = 0;

        var i = s.indexOf("-");
        if (i>-1) {
            var re = new RegExp("\\D+(\\d+-\\d+).+", 'gi');
            s = s.replace(re, "$1");
            i = s.indexOf("-");
            made = s.substring(0,i);
            attempted = s.substring(i+1,s.length);
        }
        return {made:made,attempted:attempted};
    }

    function findOrCreateStatBody() {
        var statBody = document.getElementById(STAT_BODY_ID);
        if (!statBody) {
            statBody = addModalOverlay();
            addShowStatsButton();

            var totalRow = document.createElement("tr");
            totalRow.className = 'total';
            statBody.appendChild(totalRow);

        }
        return statBody;
    }

    function addModalOverlay() {
        if (document.getElementById(MODAL_DIV_ID)) {
            document.body.removeChild(document.getElementById(MODAL_DIV_ID));
        }

        var div = document.createElement("div");
        document.body.appendChild(div);
        div.id = MODAL_DIV_ID;

        div.innerHTML =
        '<div><table id="roboTable" width="100%">' +
            '<thead><tr><td width="6%">Pos</td><td width="17%" height="18" align="left"> Name</td><td width="4%"/><td width="7%">Min</td><td width="7%">FG</td><td width="6%">3Pt</td><td width="6%">FT</td><td width="6%">+/-</td><td width="5%">Off</td><td width="5%">Reb</td><td width="5%">Ast</td><td width="5%">TO</td><td width="5%">Stl</td><td width="5%">BS</td><td width="5%">BA</td><td width="5%">PF</td><td width="7%">Pts </td></tr></thead>' +
            '<tbody id="'+ STAT_BODY_ID+'">' +
            '</tbody>' +
        '</table></div>';
        
        GM_addStyle('#' + MODAL_DIV_ID + " {position: absolute;left: 0px;top: 0px;width:100%;height:100%;text-align:center;z-index: 200;background: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%002%00%00%002%01%03%00%00%00%24%F1%1A%F2%00%00%00%06PLTE%9D%BF%C4%FF%FF%FFo%99%7C%D4%00%00%00%02tRNS%FF%00%E5%B70J%00%00%00%01bKGD%01%FF%02-%DE%00%00%00%09pHYs%00%00%00H%00%00%00H%00F%C9k%3E%00%00%00yIDATx%01%05%C1%01%01%00%00%08%02%20%1C%D9I%07u%A2%13A%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A%F6%01%90%ADD%F3%BDe%02%17%00%00%00%00IEND%AEB%60%82\");}");
        GM_addStyle('#' + MODAL_DIV_ID + ' div {width:700px;margin: 100px auto;background-color:#fff;border:1px solid #000;padding:15px;text-align:center;z-index:201;}');
        GM_addStyle(GM_addStyle('.roboTable {width:100%;margin-bottom:20px;padding:3px;border-collapse:collapse;border: 1px solid #000;} tr.odd {background-color:white;font-weight:bold;} tr.even {background-color:beige;font-weight:bold;} thead tr {background-color:#ABAB9E;border-bottom:1px solid #000;} td {text-align:center;} tr.bench {background-color:#f1f2ed;font-weight:normal;} tr.total {background-color:yellow;font-weight:bold}'));
        addCloseAndRefresh();
        return document.getElementById(STAT_BODY_ID);
    }

        /**
     Add a close link and refresh to the modal
     */
    function addCloseAndRefresh() {
        var div = document.getElementById(MODAL_DIV_ID).childNodes[0];

        var close = document.createElement("a");
        close.id ="roboClose";
        close.href = "#";
        close.innerHTML = "[close]";
        div.appendChild(close);
        close.addEventListener('click', function(e) { removeOverlay(); }, false);

        var refresh = document.createElement("a");
        refresh.id = "roboRefresh";
        refresh.href = "#";
        refresh.innerHTML = "[refresh]";
        refresh.addEventListener('click', function(e) { removeOverlay(); getStats();},false);
        div.appendChild(refresh);
        GM_addStyle('#roboRefresh {padding-left:10px;}');
    }

    function processFantasyHome(nodes) {
        var numActivePlayers = 0;
        for (var i = 0; i < nodes.snapshotLength; i++) {
            var userIdNode = nodes.snapshotItem(i);
            var playerId = userIdNode.getAttribute('href');
            playerId = playerId.replace(/[^0-9]/g, '');

            var row = userIdNode.parentNode.parentNode.parentNode;
            var position = row.childNodes[0].innerHTML;

            //iterate columns to find the boxscore column
            //start at 1 since we know 0 is BN or position
            for(var j=1; j < row.childNodes.length; j++) {
                var column = row.childNodes[j];
                if (column.className && column.className == 'gametime') {
                    if (column.childNodes.length && column.childNodes[0].nodeName == 'A') {
                        var boxscoreLink = column.childNodes[0].getAttribute("href");
                        boxscoreLink = new String(boxscoreLink).replace('recap', 'boxscore');
                        if (boxscoreLink.indexOf("preview")> -1) {break;}
                        //update score link on management page to go directly to boxscore instead of recap
                        column.childNodes[0].setAttribute("href", boxscoreLink);

                        var statBody = findOrCreateStatBody();
                        var rows = statBody.getElementsByTagName("TR");
                        var lastRow = rows[rows.length-1];
                        var statRow = document.createElement("tr");
                        statBody.insertBefore(statRow, lastRow);

                        var player = new Baller();
                        player.playerId(playerId);
                        player.position(position);
                        player.order(numActivePlayers);

                        getDocument(boxscoreLink, player);
                        numActivePlayers++;
                    }
                    break;
                }
            }
        }
    }

    /**
     Remove modal window overlay
     */
    function removeOverlay() {
        if (document.getElementById(MODAL_DIV_ID)) {
            document.body.removeChild(document.getElementById(MODAL_DIV_ID));
        }
    }

    function addShowStatsButton() {
        if (document.getElementById(STAT_BUTTON_ID)) {
            return;
        }
        var nodes = xpath(document, "//a[contains(@href,'stattracker')]");

        if (nodes.snapshotItem(0)) {
            var a = nodes.snapshotItem(0);
            a.href = '#';
            a.target = null;
            a.innerHTML = BUTTON_LABEL;
            a.id = STAT_BUTTON_ID;
            a.addEventListener('click', function(e) {getStats(); return false;},false);
        }
        else {
            //left this here just in case stattracker button disappears
            var button = document.createElement("button");
            document.body.appendChild(button);
            button.id = STAT_BUTTON_ID;
            button.innerHTML = BUTTON_LABEL;
            button.addEventListener('click', function(e) {getStats();}, false);
            GM_addStyle('#' + STAT_BUTTON_ID + '{position:fixed;top:80px;right:80px;z-index:200;background-color:#0781C8;color:#fff;}');
        }
    }

    function getStats() {
        var nodes = xpath(document, "//table[@id='statTable0']/tbody/tr/td[@class='player']/div/a[@class='name' and @href]");
        processFantasyHome(nodes);
    }
    addShowStatsButton();
})();