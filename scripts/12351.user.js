// ==UserScript==
// @name            Yahoo Fantasy Football Free Stats Calculator
// @namespace       http://bhtech.blogspot.com/
// @description     Live and free yahoo fantasy football scoring!
// @include         http://football.fantasysports.yahoo.com/f*
// ==/UserScript==

// Yahoo Fantasy Football Free Stats v .2.6.4
//

/*
This script is released under Mozilla Public License 1.1, http://www.mozilla.org/MPL/
The purpose is to provide live scoring updates for your default yahoo fantasy football team.

#### MPL Code Modification Statement: ####
Based on script at: http://userscripts.org/scripts/show/6486
Altered to add scoring and total points
###
Modifications: Altered code to work with Fantasy NFL
This code is derived from: http://robobruin.com/greasemonkey/fantasysports
####

original credits:-
http://gabrito.com/files/subModal/
http://www.sitening.com/blog/2006/03/29/create-a-modal-dialog-using-css-and-javascript/
---
Much credit to Dave for originally creating the baseball and basketball scripts.  This NFL script only exists because of his work.
Since Dave has stated he will not be producing an NFL script I have taken the liberty of modifying his script.

Notes: Since Yahoo removed player links on their boxscore pages it was necessary to match only the player name (first initial and 
last name) so there may be some "false positives" resulting in the appearance of stats for players with identical abbreviations (e.g. 
A. Smith would get Alex Smith & Antowain Smith if they both are playing in the same game).  The stat gathering process is 
resource-intensive so be prepared for it to hose your system for a minute.

Based on script at: 

*/

var ffre1, ffre2 = new RegExp;
ffre1=/^http\:\/\/football\.fantasysports\.yahoo\.com\/f\d{1}\/\d{1,7}\/\d{1,2}$/i;
ffre2=/^http\:\/\/football\.fantasysports\.yahoo\.com\/f\d{1}\/\d{1,7}\/\d{1,2}\?week\=/i;

if ((location.href.match(ffre1)) || (location.href.match(ffre2))) {
    var PPComp = 0.25;
    var PPRec = 0.5;
    var PPPassYd = 0.05;
    var PPRushYd = 0.1;
    var PPRecYd = 0.1;
    var PPPassTd = 6;
    var PPRushTd = 6;
    var PPRecTd = 6;
    var PPInt = -2;
    var PPFumb = -2;
    
    var totalPts = 0;

    var HIDDEN_DIV_ID = 'robobruinDiv';
    var MODAL_DIV_ID = 'robobruinModal';
    var STAT_BODY_ID = 'robobruinTableBody';
    var STAT_D_BODY_ID = 'robobruinDTableBody';
    var STAT_QB_BODY_ID = 'robobruinQBTableBody';
    var STAT_WR_BODY_ID = 'robobruinWRTableBody';
    var STAT_K_BODY_ID = 'robobruinKTableBody';
    var STAT_BN_BODY_ID = 'robobruinBNTableBody';
    var STAT_TOTAL_ID= 'robobruinTTableBody';

    function xpath(doc, xpath) {
        return doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    function getDocument(url, playerId, position) {
	    GM_xmlhttpRequest({
            method:"GET",
            url:url,
			headers:{
			"User-Agent":"Mozilla/5.0 Firefox/2.0.0.7",
			"Accept":"text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
			},
            onload:function(details) {
                var s = new String(details.responseText);
                s = s.replace(/\n/g, ' ');
                s = s.replace(/^.*<body[^>]*>(.*)<\/body>.*$/gi, "$1");
				processBoxscore(s, playerId, position);
            }
        });
    }

	function processBoxscore(html, playerId, position) {
        var div = document.getElementById(HIDDEN_DIV_ID);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
            div.id = HIDDEN_DIV_ID;
            div.style.display = 'none';
        }

        div.innerHTML = html;
		var nodes = xpath(document, "//tr[contains(@class,'ysprow')]/td[1]");

        if (!nodes.snapshotLength) {
            return null;
        } else {
			for (var xy=1;xy<nodes.snapshotLength;xy++){
				var nvarss = nodes.snapshotItem(xy - 1).textContent.toString();
				var nodeCat = nodes.snapshotItem(xy - 1).parentNode.parentNode.childNodes[0].textContent.toString();

				if (nvarss.match(playerId)) {
					var row = nodes.snapshotItem(xy - 1).parentNode.cloneNode(true);
					printStats(row, position, nodeCat);
					}
			}	
		}
	}

    function printStats(row, position, nodeCat) {
        var statBody = document.getElementById(STAT_BODY_ID);
        if (!statBody) {
            statBody = addModalOverlay();
            addShowStatsButton();
        }

        if (row) {
			var statBodyQB = document.getElementById(STAT_QB_BODY_ID);
			var statBodyD = document.getElementById(STAT_D_BODY_ID);
            var statBodyWR = document.getElementById(STAT_WR_BODY_ID);
			var statBodyBN = document.getElementById(STAT_BN_BODY_ID);
			var statBodyK = document.getElementById(STAT_K_BODY_ID);
			
			
			if (position == 'BN') {
                        }		
			else if (nodeCat.match(/Rushing/gi)) {
				var className = (statBody.childNodes.length % 2 == 0) ? 'odd' : 'even';
				var td = document.createElement("td");
				var pts = row.childNodes[5].textContent*PPRushYd+row.childNodes[11].textContent*PPRushTd+row.childNodes[13].textContent*PPFumb;
				pts = Math.round(pts*10)/10;
				totalPts = totalPts + pts;
				td.textContent  = pts;
				row.appendChild(td);
				var tr = document.createElement("tr").appendChild(row);
				tr.className = className;
				statBody.appendChild(tr);
			} else if (nodeCat.match(/Defense/gi)) {
				var className = (statBodyD.childNodes.length % 2 == 0) ? 'odd' : 'even';
				var tr = document.createElement("tr").appendChild(row);
				tr.className = className;
				statBodyD.appendChild(tr);
			} else if (nodeCat.match(/Passing/gi)) {
				var className = (statBodyQB.childNodes.length % 2 == 0) ? 'odd' : 'even';
				var td = document.createElement("td");
				var pts = row.childNodes[3].textContent*PPComp +row.childNodes[7].textContent*PPPassYd+row.childNodes[17].textContent*PPPassTd+row.childNodes[19].textContent*PPInt;
				pts = Math.round(pts*10)/10;
				totalPts = totalPts + pts;
				td.textContent  = pts;
				row.appendChild(td);
				var tr = document.createElement("tr").appendChild(row);
				tr.className = className;
				statBodyQB.appendChild(tr);
			} else if (nodeCat.match(/Receiving/gi)) {
				var className = (statBodyWR.childNodes.length % 2 == 0) ? 'odd' : 'even';
				var td = document.createElement("td");
				var pts = row.childNodes[3].textContent*PPRec +row.childNodes[5].textContent*PPRecYd+row.childNodes[11].textContent*PPRecTd+row.childNodes[13].textContent*PPFumb;
				pts = Math.round(pts*10)/10;
				totalPts = totalPts + pts;
				td.textContent  = pts;
				row.appendChild(td);
				var tr = document.createElement("tr").appendChild(row);
				tr.className = className;
				statBodyWR.appendChild(tr);
			} else if (nodeCat.match(/Kicking/gi)) {
				var className = (statBodyK.childNodes.length % 2 == 0) ? 'odd' : 'even';
				var pts = 1.0 *row.childNodes[15].textContent;
				totalPts = totalPts + pts;
				var tr = document.createElement("tr").appendChild(row); 
				tr.className = className;
				statBodyK.appendChild(tr);
			}
			var statBodyTotal = document.getElementById(STAT_TOTAL_ID); 
			totalPts = Math.round(totalPts*10)/10;
       			statBodyTotal.textContent = totalPts.toString();
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
			'<thead><tr><td width="18%" height="18" align="left">&nbsp;Pass&nbsp;Stats</td><td width="6%">Comp</td><td width="8%">Att</td><td width="8%">Yds</td><td width="8%">Pct</td><td width="8%">Y/A</td><td width="6%">Sack</td><td width="6%">YdsL</td><td width="6%">TD</td><td width="6%">Int</td><td width="6%">FF Pts</td></tr></thead>' +
            '<tbody id="'+ STAT_QB_BODY_ID +'">' +
            '</tbody>' + 
			'<thead><tr><td width="18%" height="18" align="left">&nbsp;Rec&nbsp;Stats</td><td width="6%">Rec</td><td width="8%">Yds</td><td width="8%">Avg</td><td width="8%">Lng</td><td width="8%">TD</td><td width="6%">FumL</td><td width="6%">FF Pts</td></tr></thead>' +
            '<tbody id="'+ STAT_WR_BODY_ID +'">' +
            '</tbody>' + 
            '<thead><tr><td width="18%" height="18" align="left">&nbsp;Rush&nbsp;Stats</td><td width="6%">Rush</td><td width="8%">Yds</td><td width="8%">Avg</td><td width="8%">Lng</td><td width="8%">TD</td><td width="6%">FumL</td><td width="6%">FF Pts</td></tr></thead>' +
            '<tbody id="'+ STAT_BODY_ID +'">' +
            '</tbody>' + 
			'<thead><tr><td width="18%" height="18" align="left">&nbsp;Kick&nbsp;Stats</td><td width="6%">XPM</td><td width="8%">XPA</td><td width="8%">FGM</td><td width="8%">FGA</td><td width="8%">Lng</td><td width="6%">Pct</td><td width="6%">Pts</td></tr></thead>' +
			'<tbody id="'+ STAT_K_BODY_ID +'">' +
			'</tbody>' + 
			'<thead><tr><td width="18%" height="18" align="left">&nbsp;Def&nbsp;Stats</td><td width="6%">Tack</td><td width="8%">Ast</td><td width="8%">Sack</td><td width="8%">Yds</td><td width="8%">FFum</td><td width="6%">FFumR</td><td width="6%">PD</td><td width="6%">Int</td><td width="6%">Yds</td><td width="6%">IntTD</td></tr></thead>' +
			'<tbody id="'+ STAT_D_BODY_ID +'">' +
			'</tbody>' +  
        '</table>'+
        'Approx Total Fantasy Points: <a id="'+ STAT_TOTAL_ID +'" href="#">' + '</a> <br/>' +
	'<a id="roboClose" href="#">close</a></div>';

        GM_addStyle('#' + MODAL_DIV_ID + " {visibility: hidden;position: absolute;left: 0px;top: 0px;width:100%;height:100%;text-align:center;z-index: 200;background: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%002%00%00%002%01%03%00%00%00%24%F1%1A%F2%00%00%00%06PLTE%9D%BF%C4%FF%FF%FFo%99%7C%D4%00%00%00%02tRNS%FF%00%E5%B70J%00%00%00%01bKGD%01%FF%02-%DE%00%00%00%09pHYs%00%00%00H%00%00%00H%00F%C9k%3E%00%00%00yIDATx%01%05%C1%01%01%00%00%08%02%20%1C%D9I%07u%A2%13A%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A%F6%01%90%ADD%F3%BDe%02%17%00%00%00%00IEND%AEB%60%82\");}");
        GM_addStyle('#' + MODAL_DIV_ID + ' div {width:700px;margin: 50px auto;background-color:#fff;border:1px solid #000;padding:10px;text-align:center;z-index:201;}');
        GM_addStyle('#roboTable {padding:3px;border-collapse:collapse;border: 1px solid #000;} tr.even {background-color:#f1f2ed;} thead tr {background-color:#ABAB9E;border-bottom:1px solid #000;} td {text-align:center;} tr.bench, #roboTable #bencher {background-color: #666; font-style:italic;} thead > tr > td {font-weight:bold;}');
        showOverlay();

        var close = document.getElementById('roboClose');
        close.addEventListener('click',
                           function(e) { showOverlay(); },
                           false);
        
        centerPopWin();
        return document.getElementById(STAT_BODY_ID);
    }

    function processFantasyHome(nodes) {
        totalPts = 0;
        for (var i = 0; i < nodes.snapshotLength; i++) {
            var userIdNode = nodes.snapshotItem(i);
			var playerId = userIdNode.textContent.toString();
			playerId = playerId.replace(/[0-9]/g, '');
			var playerIda = playerId.substring(0,1);
			var playerIdb = playerId.split(" ")[1];
			playerId = playerIda + ". " + playerIdb;
			
            var row = userIdNode.parentNode.parentNode.parentNode;
            var position = row.childNodes[0].textContent.toString();

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
						} else if (boxscoreLink.search(/boxscore/gi) != -1) {
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
        GM_addStyle('#robobruinStatBtn, .robobruinStatBtn {position:fixed;top:80px;left:80px;z-index:200;background-color:#0781C8;color:#fff;}');
    }
	
	function addLoadStatsButton(nodes,STlocbak,STloc) {
        var button2 = document.createElement("button");
        document.body.appendChild(button2);
        button2.id = 'robobruinStatBtn2';
		button2.textContent = "Load Freebie Stats!";
		//alterSTbutton();
		
        button2.addEventListener('click',
                           function(e) {
							 processFantasyHome(nodes);
							 //STloc.parentNode.innerHTML = STlocbak;
							 GM_addStyle('#robobruinStatBtn2, .robobruinStatBtn2 {background-color:grey!important;display:none!important;}');
},
                           false);
        GM_addStyle('#robobruinStatBtn2, .robobruinStatBtn2 {position:fixed;top:80px;left:80px;z-index:199;background-color:#0781C8;color:#fff;border-top:1px solid #ffffff;cursor: pointer!important;border-left:1px solid #ffffff;}');
    }
	
	function alterSTbutton() {
		var STbutton = document.getElementById("yspnav").getElementsByTagName("li");
		//for (var zz=1;zz<=STbutton.length;zz++) {
		for (var zz=STbutton.length-1;zz>STbutton.length-3;zz--) {
			if (STbutton[zz].className.match(/last/i)) {var STloc = STbutton[zz]}
			}

		var STlocbak = STloc.innerHTML;
		STloc = STloc.getElementsByTagName("a")[0];
		STloc.id = 'robobruinStatBtn3';
		STloc.textContent = "Load Freebie Stats!";
		STloc.removeAttribute("href");
		STloc.removeAttribute("target");
		STloc.setAttribute("style", "cursor: pointer !important;");
		STloc.addEventListener('click',
                           function(e) {
							 processFantasyHome(nodes);
							 addShowStatsButton(nodes,STlocbak,STloc);
							 STloc.parentNode.innerHTML = STlocbak;
							 //GM_addStyle('#robobruinStatBtn2, .robobruinStatBtn2, #robobruinStatBtn3 {background-color:grey!important;display:none!important;}');
},
                           false);		
	}

    addEvent(window, "resize", centerPopWin);
    addEvent(window, "scroll", centerPopWin);

//    var nodes = xpath(document, "//table[contains(@id,'statTable')]/tbody/tr/td[@class='player']/div[1]/a[1]");
	
var nodes = xpath(document,"//td[@class='player']/div/a[@class='name']");
    //processFantasyHome(nodes);
	
	//addLoadStatsButton(nodes);
	alterSTbutton(nodes);
};