// ==UserScript==
// @name            Yahoo Fantasy Football Free Stats
// @namespace       http://www.digivill.net/~joykillr
// @description     Live and free yahoo fantasy football scoring!
// @include         http://football.fantasysports.yahoo.com/f*
// ==/UserScript==

// Yahoo Fantasy Football Free Stats v. 2.9
//2.9.0 - Updated node xpath for stat retreival.
//2.8.0 - Better code to prevent player "false positives" with similar names.  Changed some other code.  Added Reload Stats button.
//2.7.0 - Updated Stat Tracker button modification to work in 2008.
//2.6.9 - really works correctly with other team pages now.
//2.6.8 - fixed to work with all team pages, better css for overlay background.
//2.6.6 - Now sorts bench players below starters. Also removed the scroll because it was impossible to view certain players if your team was too large.
//

/*
This script is released under Mozilla Public License 1.1, http://www.mozilla.org/MPL/
The purpose is to provide live scoring updates for your default yahoo fantasy football team.

#### MPL Code Modification Statement: ####
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
*/

var ffre1=/^http\:\/\/football\.fantasysports\.yahoo\.com\/f\d{1}\/\d{1,7}\/\d{1,2}$/i;
var ffre2=/^http\:\/\/football\.fantasysports\.yahoo\.com\/f\d{1}\/\d{1,7}\/\d{1,2}\?week\=/i;
var ffre3=/^http\:\/\/football\.fantasysports\.yahoo\.com\/f\d{1}\/\d{1,7}\/team\?/i;

var tmm=new Date();
tmm = tmm.getTime();
/*
var mastRbDiv = tmm.toString()+'rrrobobruinDiv';
var mastModiv = tmm.toString()+'rrrobobruinModal';
var sbmodar = tmm.toString()+'robobruinTableBody';
var dmodar = tmm.toString()+'robobruinDTableBody';
var qbmodar = tmm.toString()+'robobruinQBTableBody';
var wrmodar = tmm.toString()+'robobruinWRTableBody';
var kmodar = tmm.toString()+'robobruinKTableBody';
var bnmodar = tmm.toString()+'robobruinBNTableBody';
*/

var mastRbDiv = tmm.toString()+'rrDiv';
//var mastModiv = tmm.toString()+'Mdl';
var mastModiv = 'rrrobobruinModal';
var sbmodar = tmm.toString()+'TblBod';
var dmodar = tmm.toString()+'DTblBd';
var qbmodar = tmm.toString()+'QBTBdy';
var wrmodar = tmm.toString()+'robobruinWRTableBody';
var kmodar = tmm.toString()+'KTaby';
var bnmodar = tmm.toString()+'BNTBdy';
var rtTableMst = tmm.toString()+'mastable';

/*
var mastRbDiv = 'rrrobobruinDiv';
var mastModiv = 'rrrobobruinModal';
var sbmodar = 'robobruinTableBody';
var dmodar = 'robobruinDTableBody';
var qbmodar = 'robobruinQBTableBody';
var wrmodar = 'robobruinWRTableBody';
var kmodar = 'robobruinKTableBody';
var bnmodar = 'robobruinBNTableBody';
var rtTableMst = 'mastable';
*/

function xpath(doc, xpath) {
    return doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

    function getDocument(url, playerId, position) {
	    if (document.getElementById('toggbo')) {document.getElementById('toggbo').textContent = 'Loading stats, stand by...';}
		GM_xmlhttpRequest({
            method:"GET",
            url:url,
			headers:{
			"User-Agent":"Mozilla/5.0 Firefox/2.0.0.16",
			//"Accept":"text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5",
			"Accept":"text/xml,text/html;q=0.9,text/plain",
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
        var div = document.getElementById(mastRbDiv);
        if (!div) {
            div = document.createElement("div");
            document.body.appendChild(div);
			//document.getElementById("bd").appendChild(div);
			//document.body.insertBefore(div,document.body.firstChild);
            div.id = mastRbDiv;
            div.style.display = 'none';
        }
		
        div.innerHTML = html;
		
		//var nodes = xpath(document, "//td[@id='yspMainContent']/table[@class='yspwhitebg']/tbody/tr[starts-with(@class,'ysprow')]/td[1]");
		var nodes = xpath(document, "//tr[starts-with(@class,'ysprow')]/td[1]");
		
		//"td[@id='yspMainContent']/table[@class='yspwhitebg']/tbody/tr[@class='ysprow1']/td[@class='first']"
		//var rnodes = xpath(document,"table[@class='teamtable']/tbody/tr/td[@class='statspromo stat']");
		//var nodes = xpath(document, "//tr[contains(@class,'ysprow')]/td[1]");
        if (!nodes.snapshotLength) {
			alert("Couldn't retreive nodes");
			//alert(nodes.snapshotLength);
            return null;
        } else {
		//} else if (nodes.match(/\w{1}\.\ /gi)){
			for (var xy=1;xy<nodes.snapshotLength;xy++){
				var nvarss = nodes.snapshotItem(xy - 1).textContent.toString();
				var nodeCat = nodes.snapshotItem(xy - 1).parentNode.parentNode.childNodes[0].textContent.toString();
				//var repd = replacenode.snapshotItem(xy - 1);
			
				//if (nvarss.match(playerId)) {
				var newtest = new RegExp(playerId+"\-","gi");
				if ((nvarss.match(playerId)) && (!nvarss.match(newtest)) && (nvarss.match(/\w{1}\.\ /i))) {
				//if ((nvarss.match(playerId)) && (!nvarss.match(newtest))) {
				//if ((nvarss.match(playerId))&&(nvarss.length==playerId.length)) {
					var row = nodes.snapshotItem(xy - 1).parentNode.cloneNode(true);
					
					//var repd = rnodes.snapshotItem(xy - 1);
				//	rnodes.snapshotItem(xy - 1).innerHTML = nodes.snapshotItem(xy - 1).parentNode.cloneNode(true);
					printStats(row, position, nodeCat);
					}
					//if (nodes.snapshotLength==nodes.snapshotItem(xy-1)) {
					/*if (xy-1>=nodes.snapshotLength) {
					alert(xy);
						document.getElementById("toggbo").innerHTML = "Toggle Stats On/Off!";
						//addShowStatsButton("Toggle Stat Display On/Off");
					}*/
				}
				//if (nodes.snapshotLength==nodes.snapshotItem(xy-1)) {document.getElementById("toggbo").innerHTML = "Toggle Stats On/Off!";}
			}
			if (document.getElementById('toggbo')){document.getElementById('toggbo').textContent = 'Toggle Stats On/Off!'}
			GM_addStyle('#reloadStatsBtn {display:block!important;visibility:visible!important;');
			
	}

    function printStats(row, position, nodeCat) {
        var statBody = document.getElementById(sbmodar);
        if (!statBody) {
            statBody = addModalOverlay();
            //addShowStatsButton();
        }

        if (row) {
			var statBodyQB = document.getElementById(qbmodar);
			var statBodyD = document.getElementById(dmodar);
            var statBodyWR = document.getElementById(wrmodar);
			var statBodyBN = document.getElementById(bnmodar);
			var statBodyK = document.getElementById(kmodar);
			
			var tr = document.createElement("tr").appendChild(row);
			//repd.innerHTML = tr.innerHTML;
			
			if (position == 'BN') {
				//var tr = document.createElement("tr").appendChild(row);
				tr.setAttribute("id","bencher");
				tr.setAttribute("style", "background-color: #777777!important; font-style:italic!important;");
				//tr.className = "bencher";
			} /* else {
				var tr = document.createElement("tr").appendChild(row);
				//tr.id = starter;
				//repd.innerHTML = tr.innerHTML;
			}*/
				
			if (nodeCat.match(/Rushing/gi)) {
				var className = (statBody.childNodes.length % 2 == 0) ? 'odd' : 'even';
				tr.className = className;
				if (tr.id!="bencher"){statBody.insertBefore(tr,statBody.firstChild);}
				else {statBody.appendChild(tr);}
			} else if (nodeCat.match(/Defense/gi)) {
				var className = (statBodyD.childNodes.length % 2 == 0) ? 'odd' : 'even';
				tr.className = className;
				if (tr.id!="bencher"){statBodyD.insertBefore(tr,statBodyD.firstChild);}
				else {statBodyD.appendChild(tr);}
			} else if (nodeCat.match(/Passing/gi)) {
				var className = (statBodyQB.childNodes.length % 2 == 0) ? 'odd' : 'even';
				tr.className = className;
				if (tr.id!="bencher"){statBodyQB.insertBefore(tr,statBodyQB.firstChild);}
				else {statBodyQB.appendChild(tr);}
			} else if (nodeCat.match(/Receiving/gi)) {
				var className = (statBodyWR.childNodes.length % 2 == 0) ? 'odd' : 'even';
				tr.className = className;
				if (tr.id!="bencher"){statBodyWR.insertBefore(tr,statBodyWR.firstChild);}
				else {statBodyWR.appendChild(tr);}
			} else if (nodeCat.match(/Kicking/gi)) {
				var className = (statBodyK.childNodes.length % 2 == 0) ? 'odd' : 'even';
				tr.className = className;
				if (tr.id!="bencher"){statBodyK.insertBefore(tr,statBodyK.firstChild);}
				else {statBodyK.appendChild(tr);}
			}
		}
    }

    function showOverlay() {
        var div = document.getElementById(mastModiv);
        div.style.visibility = (div.style.visibility == "visible") ? "hidden" : "visible";
    }

    function addModalOverlay() {
        var div = document.createElement("div");
        document.body.appendChild(div);
		//document.getElementById("bd").appendChild(div);
        div.id = mastModiv;

        div.innerHTML =
        //'<div><table id="roboTable" width="100%">' +
		'<div><table id="'+rtTableMst+'" width="100%">' +
			'<thead><tr><td width="18%" height="18" align="left">&nbsp;Pass&nbsp;Stats</td><td width="6%">Comp</td><td width="8%">Att</td><td width="8%">Yds</td><td width="8%">Pct</td><td width="8%">Y/A</td><td width="6%">Sack</td><td width="6%">YdsL</td><td width="6%">TD</td><td width="6%">Int</td><td>Rating</td></tr></thead>' +
            '<tbody id="'+ qbmodar +'">' +
            '</tbody>' + 
			'<thead><tr><td width="18%" height="18" align="left">&nbsp;Rec&nbsp;Stats</td><td width="6%">Rec</td><td width="8%">Yds</td><td width="8%">Avg</td><td width="8%">Lng</td><td width="8%">TD</td><td width="6%">FumL</td></tr></thead>' +
            '<tbody id="'+ wrmodar +'">' +
            '</tbody>' + 
            '<thead><tr><td width="18%" height="18" align="left">&nbsp;Rush&nbsp;Stats</td><td width="6%">Rush</td><td width="8%">Yds</td><td width="8%">Avg</td><td width="8%">Lng</td><td width="8%">TD</td><td width="6%">FumL</td></tr></thead>' +
            '<tbody id="'+ sbmodar +'">' +
            '</tbody>' + 
			'<thead><tr><td width="18%" height="18" align="left">&nbsp;Kick&nbsp;Stats</td><td width="6%">XPM</td><td width="8%">XPA</td><td width="8%">FGM</td><td width="8%">FGA</td><td width="8%">Lng</td><td width="6%">Pct</td><td width="6%">Pts</td></tr></thead>' +
			'<tbody id="'+ kmodar +'">' +
			'</tbody>' + 
			'<thead><tr><td width="18%" height="18" align="left">&nbsp;Def&nbsp;Stats</td><td width="6%">Tack</td><td width="8%">Ast</td><td width="8%">Sack</td><td width="8%">Yds</td><td width="8%">FFum</td><td width="6%">FFumR</td><td width="6%">PD</td><td width="6%">Int</td><td width="6%">Yds</td><td width="6%">IntTD</td></tr></thead>' +
			'<tbody id="'+ dmodar +'">' +
			'</tbody>' + 
        '</table><a id="rbClose" href="">close</a></div>';

        GM_addStyle('#'+mastModiv+' {visibility: hidden;position: absolute;left: 0px!important; top: 0px!important; min-width:100%!important; min-height:100%!important; height:340% !important; text-align:center; z-index: 2001; background: url(\"data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%002%00%00%002%01%03%00%00%00%24%F1%1A%F2%00%00%00%06PLTE%9D%BF%C4%FF%FF%FFo%99%7C%D4%00%00%00%02tRNS%FF%00%E5%B70J%00%00%00%01bKGD%01%FF%02-%DE%00%00%00%09pHYs%00%00%00H%00%00%00H%00F%C9k%3E%00%00%00yIDATx%01%05%C1%01%01%00%00%08%02%20%1C%D9I%07u%A2%13A%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A6%03.%05%9B%01%97%82%CD%80K%C1f%C0%A5%603%E0R%B0%19p)%D8%0C%B8%14l%06%5C%0A%F6%01%90%ADD%F3%BDe%02%17%00%00%00%00IEND%AEB%60%82\")!important;}');
        GM_addStyle('#' + mastModiv + ' div {width:67%!important; margin: 100px auto;background-color:#fff;border:1px solid #000;padding:15px;text-align:center;z-index:2002;}');
        GM_addStyle('#'+rtTableMst+' {padding:3px;border-collapse:collapse;border: 1px solid #000000!important;} tr.even {background-color:#f1f2ed!important;} thead tr {background-color:#ABAB9E;border-bottom:1px solid #000000;} td {text-align:center;} tr.bench, #'+rtTableMst+' #bencher, #'+rtTableMst+' .bencher, #bencher, .bencher {background-color: #666666!important; font-style:italic!important;} thead > tr > td {font-weight:bold!important;}');
        showOverlay();

        var close = document.getElementById('rbClose');
        close.addEventListener('click',
                           function(e) { showOverlay(); },
                           false);
        centerPopWin();
        return document.getElementById(sbmodar);
    }

    function processFantasyHome(nodes) {
		for (var i = 0; i < nodes.snapshotLength; i++) {
		document.getElementById('toggbo').textContent = 'Loading stats, stand by...';
            var userIdNode = nodes.snapshotItem(i);
			var playerId = userIdNode.textContent.toString();
			playerId = playerId.replace(/[0-9]/g, '');
			var playerIda = playerId.substring(0,1);
			var playerIdb = playerId.split(" ")[1];
			playerId = playerIda + ". " + playerIdb;
			var row = userIdNode.parentNode.parentNode.parentNode;
            var position = row.childNodes[0].textContent.toString();
	//var rnodes = xpath(document,"table[@class='teamtable']/tbody/tr/td[@class='statspromo stat']");
            //iterate columns to find the boxscore column
            //start at 1 since we know 0 is BN or position
			for(var j=1; j < row.childNodes.length; j++) {
                var column = row.childNodes[j];
                if (column.className && column.className == 'gametime') {
                    if (column.childNodes.length && column.childNodes[0].nodeName == 'A') {
                        var boxscoreLink = column.childNodes[0].getAttribute("href");
						//
						/*
						if (boxscoreLink.search(/preview/gi) != -1) {
							boxscoreLink = new String(boxscoreLink).replace('preview', 'boxscore');
							column.childNodes[0].setAttribute("href", boxscoreLink);
							getDocument(boxscoreLink, playerId, position, replacenode);
							}
						else if (boxscoreLink.search(/recap/gi) != -1) {
						*/
						
						if (boxscoreLink.search(/recap/gi) != -1) {
							boxscoreLink = new String(boxscoreLink).replace('recap', 'boxscore');
							column.childNodes[0].setAttribute("href", boxscoreLink);
							getDocument(boxscoreLink, playerId, position);
							//getDocument(boxscoreLink, playerId, position, rnodes);
						} else if (boxscoreLink.search(/boxscore/gi) != -1) {
							getDocument(boxscoreLink, playerId, position);
							//getDocument(boxscoreLink, playerId, position, rnodes);
							}
							//getDocument(boxscoreLink, playerId, position, replacenode);
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
        var popMask = document.getElementById(mastModiv);

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

    function addShowStatsButton(themsg) {
        var button = document.createElement("button");
        document.body.appendChild(button);
		//document.getElementById("bd").appendChild(button);
        button.id = 'toggbo';
        //button.innerHTML = "Toggle Stats On/Off!";
		button.innerHTML = "Loading stats, stand by...";
		//button.innerHTML = themsg;
        button.addEventListener('click',
                           function(e) { showOverlay(); },
                           false);
        GM_addStyle('#toggbo, .toggbo {display:block!important;visibility:visible!important;position:fixed;top:40px;left:40px;z-index:2003;background-color:#0781C8;color:#fff;}');
    }
	
	function addLoadStatsButton(nodes,STlocbak,STloc) {
        var button2 = document.createElement("button");
        document.body.appendChild(button2);
		//document.getElementById("bd").appendChild(button2);
        button2.id = 'toggbo2';
		button2.textContent = "Load Freebie Stats!";
		//alterSTbutton();
		button2.addEventListener('click',
                           function(e) {
							 processFantasyHome(nodes);
							 //STloc.parentNode.innerHTML = STlocbak;
							 GM_addStyle('#toggbo2, .toggbo2 {background-color:grey!important;display:none!important;}');
},
                           false);
        GM_addStyle('#toggbo2, .toggbo2 {position:fixed;top:80px;left:80px;z-index:2003;background-color:#0781C8;color:#fff;border-top:1px solid #ffffff;cursor: pointer!important;border-left:1px solid #ffffff;}');
    }
	
	function alterSTbutton(nodes) {
		var STloc;
		var STbutton = document.getElementById("yspnav").getElementsByTagName("li");
		for (var zz=0;zz<STbutton.length;zz++) {
		//for (var zz=STbutton.length-1;zz>STbutton.length-3;zz--) {
			//if (STbutton[zz].className.match(/stattracker/i)) {
			if (STbutton[zz].className.search("stattracker")!=-1) {
				var STloc = STbutton[zz];
				//alert(STloc);
				break;
				}
			}
		if (STloc!=null&&STloc!="") {
			var STlocbak = STloc.innerHTML;
			STloc = STloc.getElementsByTagName("a")[0];
			STloc.id = 'toggbo3';
			STloc.textContent = "Load Freebie Stats!";
			STloc.removeAttribute("href");
			STloc.removeAttribute("target");
			STloc.setAttribute("style", "cursor: pointer !important;");
			
			STloc.addEventListener('click',
                function(e) {
					addShowStatsButton("Loading stats, stand by...");	
					processFantasyHome(nodes);
				//addShowStatsButton(nodes,STlocbak,STloc);
//				addShowStatsButton("Loading stats, stand by...");
				STloc.parentNode.innerHTML = STlocbak;
				//GM_addStyle('#toggbo2, .toggbo2, #toggbo3 {background-color:grey!important;display:none!important;}');
				reloadStatsButton();
				},
			false);
		}
	}

function reloadStatsButton() {
        var bton = document.createElement("button");
        document.body.appendChild(bton);
	//document.getElementById("bd").appendChild(bton);
        bton.id = 'reloadStatsBtn';
        //button.innerHTML = "Toggle Stats On/Off!";
		bton.innerHTML = "Reload Stats!";
		//button.innerHTML = themsg;
        bton.addEventListener('click',
                           function(e) { reloadStats(); },
                           false);
        GM_addStyle('#reloadStatsBtn {display:none;visibility:hidden;position:fixed;top:64px;left:40px;z-index:2003;background-color:#0781C8;color:#fff;}');
}
	
function reloadStats() {
	nodes = ""; playerId = "";
	showOverlay();
	var divsToClear = new Array(sbmodar, dmodar, qbmodar, wrmodar, kmodar, bnmodar, rtTableMst, mastModiv, mastRbDiv);
	for (dtcC=0; dtcC<divsToClear.length; dtcC++) {
		if (document.getElementById(divsToClear[dtcC])) {document.getElementById(divsToClear[dtcC]).innerHTML = ""; document.getElementById(divsToClear[dtcC]).id = "";}
	}
	/*
	if (document.getElementById(sbmodar)) {document.getElementById(sbmodar).innerHTML = "";}
	if (document.getElementById(dmodar)) {document.getElementById(dmodar).innerHTML = "";}
	if (document.getElementById(qbmodar)) {document.getElementById(qbmodar).innerHTML = "";}
	if (document.getElementById(wrmodar)) {document.getElementById(wrmodar).innerHTML = "";}
	if (document.getElementById(kmodar)) {document.getElementById(kmodar).innerHTML = "";}
	if (document.getElementById(bnmodar)) {document.getElementById(bnmodar).innerHTML = "";}
	if (document.getElementById(rtTableMst)) {document.getElementById(rtTableMst).innerHTML = "";}
	if (document.getElementById(mastModiv)) {document.getElementById(mastModiv).innerHTML = "";}
	if (document.getElementById(mastRbDiv)) {document.getElementById(mastRbDiv).innerHTML = "";}
	*/
	//runMain();
	var nodes = xpath(document,"//td[@class='player']/div/a[@class='name']");
	processFantasyHome(nodes);
	}
	
function runMain() {
	var decoy = document.createElement("div"); var decoy2 = document.createElement("div");
	decoy.id = 'robo'; decoy2.id = 'robobruin';
	document.body.insertBefore(decoy,document.body.firstChild);
	document.body.appendChild(decoy2);
    addEvent(window, "resize", centerPopWin);
    //addEvent(window, "scroll", centerPopWin);
	//    var nodes = xpath(document, "//table[contains(@id,'statTable')]/tbody/tr/td[@class='player']/div[1]/a[1]");
	
	var nodes = xpath(document,"//td[@class='player']/div/a[@class='name']");
	//var replacenode = xpath(document,"table[@class='teamtable']/tbody/tr/td[@class='statspromo stat']");
	//You can use a button if you don't want the StatTracker link altered, uncomment the following line and comment out 2 lines down.
	//addLoadStatsButton(nodes);
	//alert(nodes.snapshotLength);
	alterSTbutton(nodes);
	//document.getElementById('toggbo').textContent = 'Toggle Stats On\/Off\!';
}

if ((location.href.match(ffre1)) || (location.href.match(ffre2)) || (location.href.match(ffre3))) {
	runMain();
	//reloadStatsButton();
}