// ==UserScript==
// @name            Yahoo Fantasy Basketball Mod
// @namespace       http://www.digivill.net/~joykillr
// @description     Live basketball fantasy scoring working and slightly modified
// @include         http://basketball.fantasysports.yahoo.com/*
// ==/UserScript==

// Yahoo Fantasy Basketball Free Stats Mod v.2.2
// Jan. 14, 2006
// Fixed for yahoo's latest changes.  Modified to load only when button is clicked.  This is Dave's script with some minor code modifications.  You can leave it enabled all the time as it only applies to your team page.

/*
This script is released under Mozilla Public License 1.1, http://www.mozilla.org/MPL/
The purpose is to provide live scoring updates for your default yahoo fantasy baseball team.

For code enhancements or feature requests, visit:
http://code.google.com/p/freebiestats/issues/list

credits:-
http://robobruin.com/greasemonkey/fantasysports
http://gabrito.com/files/subModal/
http://www.sitening.com/blog/2006/03/29/create-a-modal-dialog-using-css-and-javascript/

revision
2006-Nov-05: don't rely on hard coded offset to find boxscore link

*/
GM_addStyle("#notetoself #notetoselfcontent textarea, #notetoself #notetoselfcontent input {display:none;} #notetoself p a, #notetoself #notecount, #notetoself span {display:inline;} #notetoself #notelimit {margin-top:0;} #yspmain, #rosternav, #yspsub, #yspcontentfooter, #yspcontentheader, #ysppageheader, #matchupheader1 , #matchupheader2 {visibility:visible!important;} #otherteamnav input.submit {display:inline!important;} #smack {display:block;}");

if (location.href.match(/^http\:\/\/basketball\.fantasysports\.yahoo\.com\/nba\/\d{1,7}\/\d{1,2}$/i) || location.href.match(/^http\:\/\/basketball\.fantasysports\.yahoo\.com\/nba\/\d{1,7}\/\d{1,2}\?date\=/i)) {

    var HIDDEN_DIV_ID = 'robobruinDiv';
    var MODAL_DIV_ID = 'robobruinModal';
    var STAT_BODY_ID = 'robobruinTableBody';

    function xpath(doc, xpath) {
        return doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    function getDocument(url, playerId, position) {
        GM_xmlhttpRequest({
            method:"GET",
            url:url,
            headers:{
                "User-Agent":"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)",
                "Accept":"text/xml"
            },
            onload:function(details) {
                var s = new String(details.responseText);
                s = s.replace(/\n/g, ' ');
                s = s.replace(/^.*<body[^>]*>(.*)<\/body>.*$/gi, "$1");
                var row = processBoxscore(s, playerId);
                printStats(row, position);
            }
        });
    }

    function processBoxscore(html, playerId) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }

        div.innerHTML = html;
        var nodes = xpath(document, "//tr[contains(@class,'ysprow')]/td/a[contains(@href,'" + playerId + "')]");
        var i = nodes.snapshotLength;

        if (!i) {
            return null;
        } else {
            var node = nodes.snapshotItem(i - 1).parentNode.parentNode.cloneNode(true);
            return node;
        }
    }

    function printStats(row, position) {
        var statBody = document.getElementById(STAT_BODY_ID);
        if (!statBody) {
            statBody = addModalOverlay();
            addShowStatsButton();
        }

        if (row) {
            var tr = document.createElement("tr").appendChild(row);
            var className = (statBody.childNodes.length % 2 == 0) ? 'odd' : 'even';
            tr.className = className;
            if (position == 'BN') {
                tr.className = 'bench';
            }
            statBody.appendChild(tr);
        }
    }

    function showOverlay() {
        var div = document.getElementById(MODAL_DIV_ID);
        div.style.visibility = (div.style.visibility == "visible") ? "hidden" : "visible";
    }

    function addModalOverlay() {
        var div = document.createElement("div");
        document.body.appendChild(div);
        div.id = MODAL_DIV_ID;

        div.innerHTML =
        '<div><table id="roboTable" width="100%">' +
            '<thead><tr><td width="18%" height="18" align="left">&nbsp;Name</td><td width="6%">Min</td><td width="8%">FG</td><td width="8%">3Pt</td><td width="8%">FT</td><td width="8%">Off</td><td width="6%">Reb</td><td width="6%">Ast</td><td width="6%">TO</td><td width="6%">Stl</td><td width="6%">Blk</td><td width="6%">PF</td><td width="8%">Pts&nbsp;</td></tr></thead>' +
            '<tbody id="'+ STAT_BODY_ID+'">' +
            '</tbody>' +
        '</table><a id="roboClose" href="#">close</a></div>';

        GM_addStyle('#' + MODAL_DIV_ID + " {visibility: hidden;position: absolute;left: 0px;top: 0px;width:100%;height:100%;text-align:center;z-index: 200;background: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%002%00%00%002%01%03%00%00%00%24%F1%1A%F2%00%00%00%06PLTE%9D%BF%C4%FF%FF%FFo%99%7C%D4%00%00%00%02tRNS%FF%00%E5%B70J%00%00%00%01bKGD%01%FF%02-%DE%00%00%00%09pHYs%00%00%00H%00%00%00H%00F%C9k%3E%00%00%00yIDATx%01%05%C1%01%01%00%00%08%02%20%1C%D9I%07u%A2%13A%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A%F6%01%90%ADD%F3%BDe%02%17%00%00%00%00IEND%AEB%60%82\");}");
        GM_addStyle('#' + MODAL_DIV_ID + ' div {width:700px;margin: 100px auto;background-color:#fff;border:1px solid #000;padding:15px;text-align:center;z-index:201;}');
        GM_addStyle('#roboTable {padding:3px;border-collapse:collapse;border: 1px solid #000;} tr.even {background-color:#f1f2ed;} thead tr {background-color:#ABAB9E;border-bottom:1px solid #000;} td {text-align:center;} tr.bench {background-color: #666;}');
        showOverlay();

        var close = document.getElementById('roboClose');
        close.addEventListener('click',
                           function(e) { showOverlay(); },
                           false);
        centerPopWin();
        return document.getElementById(STAT_BODY_ID);
    }

    function processFantasyHome(nodes) {
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
						
						if (boxscoreLink.search(/recap/gi) != -1) {
							boxscoreLink = new String(boxscoreLink).replace('recap', 'boxscore');
							column.childNodes[0].setAttribute("href", boxscoreLink);
							getDocument(boxscoreLink, playerId, position);
						} 
						//
						// If Yahoo stops linking directly to boxscores again then uncomment this code:
						//
						/*
						else if (boxscoreLink.search(/preview/gi) != -1) {
							boxscoreLink = new String(boxscoreLink).replace('preview', 'boxscore');
							column.childNodes[0].setAttribute("href", boxscoreLink);
							getDocument(boxscoreLink, playerId, position);
						} */
						else if (boxscoreLink.search(/boxscore/gi) != -1) {
							getDocument(boxscoreLink, playerId, position);
							}
							
                    }
                    break;
                }
            }
        }
    }

    function getViewportHeight() {
        if (window.innerHeight!=window.undefined) return window.innerHeight;
        if (document.compatMode=='CSS1Compat') return document.documentElement.clientHeight;
        if (document.body) return document.body.clientHeight;
        return window.undefined;
    }

    function getViewportWidth() {
        if (window.innerWidth!=window.undefined) return window.innerWidth;
        if (document.compatMode=='CSS1Compat') return document.documentElement.clientWidth;
        if (document.body) return document.body.clientWidth;
        return window.undefined;
    }

    function centerPopWin() {
        var popMask = document.getElementById(MODAL_DIV_ID);

        var width = popMask.offsetWidth;
        var height = popMask.offsetHeight;

        var fullHeight = getViewportHeight();
        var fullWidth = getViewportWidth();
        var scLeft,scTop;
        if (self.pageYOffset) {
            scLeft = self.pageXOffset;
            scTop = self.pageYOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {
            scLeft = document.documentElement.scrollLeft;
            scTop = document.documentElement.scrollTop;
        } else if (document.body) {
            scLeft = document.body.scrollLeft;
            scTop = document.body.scrollTop;
        }

        popMask.style.height = fullHeight + "px";
        popMask.style.width = fullWidth + "px";
        popMask.style.top = scTop + "px";
        popMask.style.left = scLeft + "px";

        //check that user's screen is big enough for auto centering...
        if (fullHeight > height) {
            popMask.style.top = (scTop + ((fullHeight - height) / 2)) + "px";
        }
        if (fullWidth > width) {
            popMask.style.left =  (scLeft + ((fullWidth - width) / 2)) + "px";
        }
    }

    function addEvent(obj, evType, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(evType, fn, false);
            return true;
        } else if (obj.attachEvent) {
            var r = obj.attachEvent("on" + evType, fn);
            return r;
        } else {
            return false;
        }
    }

    function addShowStatsButton() {
        var button = document.createElement("button");
        document.body.appendChild(button);
        button.id = 'robobruinStatBtn';
        button.innerHTML = "Toggle Stats On/Off!";

        button.addEventListener('click',
                           function(e) { showOverlay(); },
                           false);
        GM_addStyle('#robobruinStatBtn {position:fixed;top:80px;left:80px;z-index:200;background-color:#0781C8;color:#fff;}');
    }
	
	
	//
	function addLoadStatsButton(nodes) {
        var button2 = document.createElement("button2");
        document.body.appendChild(button2);
        button2.id = 'robobruinStatBtn2';
        button2.innerHTML = "Load Freebie Stats!";

        button2.addEventListener('click',
                           function(e) {
							 processFantasyHome(nodes);
GM_addStyle('#robobruinStatBtn2 {background-color:grey;display:none!important;}');
},
                           false);
        GM_addStyle('#robobruinStatBtn2 {position:fixed;top:80px;left:80px;z-index:199;background-color:#0781C8;color:#fff;border-top:2px solid #ecebe7;cursor: pointer!important;border-left:2px solid #ecebe7;border-bottom:1px solid #888680;border-right:1px solid #888680;}');
    }	
	//

    addEvent(window, "resize", centerPopWin);
    addEvent(window, "scroll", centerPopWin);

    var nodes = xpath(document, "//table[@id='statTable0']/tbody/tr/td[@class='player']/div/a[@class='name' and @href]");

	addLoadStatsButton(nodes);

};