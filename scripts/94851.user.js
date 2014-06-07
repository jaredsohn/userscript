// ==UserScript==
// @name		Reddit Moderator Admin
// @version		1.13
// @namespace	http://ictinus.com/rma/
// @description	Provides Reddit header tab with an interface to all you moderator links. 
// @match http://*.reddit.com/*
// @match https://*.reddit.com/*
// ==/UserScript==

// Author: Ictinus
// Released: v1.00 19 January 2011
// Updated: v1.01 19 January 2011, added stylesheet link.
// Updated: v1.02 19 January 2011, fixed moderator-mail icon.
// Updated: v1.03 19 January 2011, added 'submit a link';
// 								   added middle click new window/tab;
// 								   added close interface on page/UI click;
// 								   added 'refresh' action to re-scan your moderated reddits.
// Updated: v1.04 20 January 2011, now works on about and /help/faqs pages.
// Updated: v1.05 20 January 2011, added moderator reddits for spam, report, and modqueue.
// Updated: v1.06 28 January 2011, added auto close other UIs
// Updated: v1.07 10 September 2011, added edir user flair.
// Updated: v1.08 06 October 2011, changed script site security to allow https and remove scary 'allow access to all domains' message.
// Updated: v1.09 01 February 2012, fixed subreddit menu layout. Added some debug output functionality to chase a bug raised by kylde.
// Updated: v1.10 01 February 2012, fixed 'refresh' bug to correctly fetch all moderated reddits from scratch, thanks to kylde.
// Updated: v1.11 02 February 2012, re-wrote action links to be normal links so firefox can open to new tab with middle mouse click.
// Updated: v1.12 05 February 2012, fixed menu positioning of scrolled reddits (thanks Raerth). Added subscription counts/sorting and moderation log link as requested by Raerth.
// Updated: v1.13 08 February 2012, changed font-family for the spam/reports/modqueue links so that Windows browsers display properly.

var redditModAdmin = {
	version : "1.13",
	defaultJSON : '{"version": "1.13","moderated":{}, "fetched":false, "reqcount":0, "nextModFetch":"", "order":0, "debug": false}',
	reqLimit : 20,
	reqDelay : 2000, // the minimum millisecond delay requested by Reddit Admins
	subDelay : 2000, // the minimum millisecond delay for subscription
						// requests, since the standard reddit interface appears
						// to allow much faster than 2000 ms.
	readRMA : function() {
		var strJSON = window.localStorage.getItem("redditModAdmin");
		if (strJSON === null) {
			strJSON = redditModAdmin.defaultJSON;
		};
		this.rma = JSON.parse(strJSON);
		redditModAdmin.debug("readRMA: " + JSON.stringify(this.rma));
	},
	writeRMA : function() {
		window.localStorage.setItem("redditModAdmin", JSON.stringify(this.rma));
		redditModAdmin.debug("writeRMA: " + JSON.stringify(this.rma));
	},
	closeUIs: function() {
		//close other UIs
		var theUIs = document.getElementsByClassName('ictinusUI');
		for (var iUI = 0, lenUI = theUIs.length; iUI < lenUI; iUI++) {
			theUIs[iUI].style.display = 'none';
		}
	},
	createUITab : function() {
		var lastTab;
		var tabmenu;
		headerleft = document.getElementById("header-bottom-left");
		var arrTabMenu = headerleft.getElementsByClassName("tabmenu");
		//make sure the tabmenu exists
		if (typeof(arrTabMenu[0]) != 'undefined') {
			tabmenu = arrTabMenu[0];
		} else {
			tabmenu = document.createElement("ul");
			tabmenu.className = "tabmenu";
			headerleft.appendChild(tabmenu);
		}
		
		uiTab = document.createElement("li");
		
		var theLink = document.createElement("a");
		theLink.id = "rmaUITab";
		theLink.href = "#";
		theLink.innerHTML = "admin box";
		theLink.addEventListener('click', function (e) {
			e.stopPropagation();	
			var theUI = document.getElementById('rmaUI');
			if (theUI.style.display === 'block') {
				theUI.style.display = 'none';
			} else { 
				redditModAdmin.closeUIs();
				theUI.style.visibility = 'hidden';
				theUI.style.display = 'block';
				theUI.style.top = parseInt(this.offsetTop + this.offsetHeight + 2) + 'px';
				var iOffsetLeft = parseInt(this.offsetLeft) + parseInt(this.offsetWidth) - parseInt(parseInt(theUI.offsetWidth)*0.75); 
				if (iOffsetLeft < 0) { 
					theUI.style.left = 2 + 'px';
				} else {
					theUI.style.left = iOffsetLeft + 'px';
				}
				theUI.style.visibility = '';
			} 
		}, false);
		
		uiTab.appendChild(theLink);
		tabmenu.appendChild(uiTab);	
		var theUI = document.createElement("div");
		theUI.id = "rmaUI";
		theUI.className = "rmaUI ictinusUI";
		var theUIForm = document.createElement('form');
		theUIForm.id = 'rmaForm';
		theUI.appendChild(theUIForm);

		var theTitlebar = document.createElement("div");
		theTitlebar.className = "rmaTitlebar";
		theTitlebar.innerHTML = "<div class='left'>reddit moderator admin</div><div class='right' onclick='document.getElementById(\"rmaUI\").style.display = \"none\"'>&#215;</div>";

		theUIForm.appendChild(theTitlebar);

		// theActions
		var theActions = document.createElement("div");
		theActions.id = "rmaActions";
		theActions.className = "rmaActions icon-menu hover";

		// theActions - submit
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "submit a link";
		theLink.className = "reddit-submit";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);

		// theActions - community settings
		var theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		var theLink = document.createElement("a");
		theLink.innerHTML = "community settings";
		theLink.className = "reddit-edit";
		theLink.href = "#";
		theActionItem.appendChild(theLink);
			
		// theActions - moderator mail
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "moderator mail";
		theLink.className = "moderator-mail";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);
			
		// theActions - moderator mail
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "edit moderators";
		theLink.className = "reddit-moderators";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);

		// theActions - edit approved submitters
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "edit approved submitters";
		theLink.className = "reddit-contributors";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);
					
		// theActions - edit user flair
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "edit user flair";
		theLink.className = "reddit-flair";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);

		// theActions - traffic stats
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "traffic stats";
		theLink.className = "reddit-traffic";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);
			
		// theActions - reported links
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "reported links";
		theLink.className = "reddit-reported";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);

		// theActions - ban users
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "ban users";
		theLink.className = "reddit-ban";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);

		// theActions - spam
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "spam";
		theLink.className = "reddit-spam";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);

		// theActions - stylesheet
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "stylesheet";
		theLink.className = "reddit-stylesheet";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);

		// theActions - moderation log
		theActionItem = document.createElement("div");
		theActions.appendChild(theActionItem);

		theLink = document.createElement("a");
		theLink.innerHTML = "moderation log";
		theLink.className = "reddit-moderationlog";
		theLink.href = "#"; 
		theActionItem.appendChild(theLink);

		theUIForm.appendChild(theActions);
		var modLinks = document.createElement("div");
		modLinks.className = "rmaModLinks";
		
		theLink = document.createElement("a");
		theLink.href = "/r/mod/about/spam";
		theLink.innerHTML = "spam";
		modLinks.appendChild(theLink);

		theLink = document.createElement("a");
		theLink.href = "/r/mod/about/reports";
		theLink.innerHTML = "reports";
		modLinks.appendChild(theLink);
		
		theLink = document.createElement("a");
		theLink.href = "/r/mod/about/modqueue";
		theLink.innerHTML = "modqueue";
		modLinks.appendChild(theLink);
		
		theUIForm.appendChild(modLinks);
		
		// theDisplay
		var theHeader = document.createElement("div");
		theHeader.className = "rmaHeader";
		//theHeader.innerHTML = "<span class='rmaCol1'></span><span id='htitle' class='rmaCol2'>Reddits&nbsp;&#8711;</span><p class='rmap'>";
		
				
		var theHTitle = document.createElement("span");
		theHTitle.className = 'rmaCol2';
		theHTitle.innerHTML = "Reddits&nbsp;&#8711;";
		theHTitle.addEventListener('click', function () {
				if (redditModAdmin.rma.order === 0) {
					redditModAdmin.rma.order = 1;
				} else {
					redditModAdmin.rma.order = 0;				
				}
				redditModAdmin.writeRMA();
				redditModAdmin.filterDisplay();
			}, false);
		var theRMAp = document.createElement("p");
		theRMAp.className = 'rmap';
		
		theHeader.appendChild(theHTitle);
		theHeader.appendChild(theRMAp);
		theUIForm.appendChild(theHeader);

		var theDisplay = document.createElement("div");
		theDisplay.id = "rmaDisplay";
		theDisplay.className = "rmaDisplay";
		theUIForm.appendChild(theDisplay);

		var theFooter = document.createElement("div");
		theFooter.className = "rmaFooter";

		var theStatusBar = document.createElement("div");
		theStatusBar.id = "rmaStatusBar";
		theStatusBar.className = "rmaStatusBar";
			
		var theRefresh = document.createElement("div");
		theRefresh.className = "rmaRefresh";
		theLink = document.createElement("a");
		theLink.href = "#";
		theLink.innerHTML = "refresh";
		theLink.addEventListener('click', function () {
				document.getElementById('rmaDBLog').value = '';
				redditModAdmin.firstTimeFetch();
			}, false);
		theRefresh.appendChild(theLink);
		
		var theDebug = document.createElement("div");
		theDebug.className = "rmaDebug";
		theLink = document.createElement("a");
		theLink.id = "lnkDebug"
		theLink.href = "#";
		theLink.innerHTML = "debug";
		theLink.addEventListener('click', function () {
				redditModAdmin.rma.debug = !redditModAdmin.rma.debug;
				redditModAdmin.writeRMA();
				redditModAdmin.displayDebug();
			}, false);
		theDebug.appendChild(theLink);

		theFooter.appendChild(theStatusBar);
		theFooter.appendChild(theRefresh);
		theFooter.appendChild(theDebug);
		
		var theDebugOutput = document.createElement("div");
		theDebugOutput.id = "rmaDebugOutput";
		theDebugOutput.className = "rmaDebugOutput";
		var theDBLog = document.createElement("textarea");
		theDBLog.id = "rmaDBLog";
		theDBLog.className = "rmaDBLog";
		theDebugOutput.appendChild(theDBLog);
		theFooter.appendChild(theDebugOutput);
		theUIForm.appendChild(theFooter);

		// build up ui and append to the div
		document.body.appendChild(theUI);
		document.body.addEventListener('click', function () {
			document.getElementById('rmaActions').style.display = "none";
			document.getElementById('rmaUI').style.display = "none";
		}, false);
		theUI.addEventListener('click', function(e) {
			document.getElementById('rmaActions').style.display = "none";
			e.stopPropagation(); 
		}, false);
	},
	alphaLabelSortAscending : function(a, b) {
		try {
			valA = a.label.toLowerCase();
			valB = b.label.toLowerCase();
			if (valA === valB) {
				return 0;
			} else if (valA < valB) {
				return -1;
			} else {
				return 1;
			}
		} catch (err) {
			return 0;
		}
	},
	numericSubscriptionSortDescending: function(a, b) {
		try {
			valA = a.subs;
			valB = b.subs;
			if (valA === valB) {
				return 0;
			} else if (valA < valB) {
				return 1;
			} else {
				return -1;
			}
		} catch (err) {
			return 0;
		}
	},
	getSortedLabelArray : function(reddits) {
		var arrSorted = [];
		for (aReddit in reddits) {
			arrSorted.push({
						"id" : aReddit,
						"label" : reddits[aReddit].label,
						"subs": reddits[aReddit].subs
					});
		}
		if (arrSorted != []) {
			if (redditModAdmin.rma.order === 0) {
				return arrSorted.sort(redditModAdmin.alphaLabelSortAscending);
			} else {
				return arrSorted.sort(redditModAdmin.numericSubscriptionSortDescending);
			}
		} else {
			return [];
		}
	},
	displayDebug: function () {
		if (redditModAdmin.rma.debug === true) {
			document.getElementById('lnkDebug').innerHTML = "debug off";
			document.getElementById('rmaDebugOutput').style.display = 'block';
		} else {
			document.getElementById('lnkDebug').innerHTML = "debug";
			document.getElementById('rmaDebugOutput').style.display = 'none';				
		}	
	},
	displayActions: function(theRow) {
		var theActions = document.getElementById("rmaActions");		
		if ((theActions.style.display === "block") && (theRow.offsetTop - theRow.parentNode.scrollTop + theRow.offsetHeight === parseInt(theActions.style.top))) {
			theActions.style.display = "none";
		} else {
			redditModAdmin.reddit = theRow.firstChild.firstChild.innerHTML;

			//for each link populate with correct links
			var arrLinks = theActions.getElementsByTagName('a');
			for (var i = 0; i < arrLinks.length; i++) {
				arrLinks[i].href = redditModAdmin.getURL(arrLinks[i]);
			}
			//display
			theActions.style.visibility = "hidden";
			theActions.style.display = "block";
			var iOffsetLeft = parseInt(theRow.offsetLeft)
				+ parseInt(theRow.offsetWidth)
				- parseInt(theActions.offsetWidth);
			theActions.style.left = theRow.offsetLeft + "px";
			theActions.style.top = theRow.offsetTop - theRow.parentNode.scrollTop + theRow.offsetHeight + "px";
			theActions.style.visibility = "";
		}		
	},
	getURL: function (theLink) {
		var strURLTail = "";
		switch (theLink.className) {
			case "reddit-view":
				strURLTail = ""; break;
			case "reddit-submit":
				strURLTail = "/submit"; break;
			case "reddit-edit":
				strURLTail = "/about/edit/"; break;
			case "moderator-mail":
				strURLTail = "/about/message/inbox/"; break;
			case "reddit-moderators":
				strURLTail = "/about/moderators/"; break;
			case "reddit-contributors":
				strURLTail = "/about/contributors/"; break;
			case "reddit-flair":
				strURLTail = "/about/flair/"; break;
			case "reddit-traffic":
				strURLTail = "/about/traffic/"; break;
			case "reddit-reported":
				strURLTail = "/about/reports/"; break;
			case "reddit-spam":
				strURLTail = "/about/spam/"; break;
			case "reddit-ban":
				strURLTail = "/about/banned/"; break;
			case "reddit-stylesheet":
				strURLTail = "/about/stylesheet/"; break;
			case "reddit-moderationlog":
				strURLTail = "/about/log/"; break;
		}
		return location.protocol + "//" + location.host + "/r/" + redditModAdmin.reddit + strURLTail; 
	},
	addCommas: function (nStr) {
	//credit: http://www.mredkj.com/javascript/numberFormat.html
		nStr += '';
		x = nStr.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	},
	filterDisplay : function() {
		redditModAdmin.debug("filterDisplay started.");
		var rmaData = redditModAdmin.rma;
		var theDisplay = document.getElementById("rmaDisplay");
		var strHTML = "";
		var strClass = "";
		var iRedditCount = 0;
		var iModerated = 0;
		var iFilterSub = 0;
		var iFilterTotal = 0;
		var arrLabelSorted = redditModAdmin.getSortedLabelArray(rmaData.moderated);
		theDisplay.innerHTML = "";
		for (var aReddit = 0, len = arrLabelSorted.length; aReddit < len; aReddit++) {
			var aRedditID = arrLabelSorted[aReddit].id;
			var aRedditLabel = arrLabelSorted[aReddit].label;
			var aRedditSubs = arrLabelSorted[aReddit].subs;
			if (rmaData.moderated[aRedditID]) {
				iModerated++;
			}
			iFilterTotal++;
			idChecked = "rmaChecked" + iRedditCount;
			strClass = "rmaGreen";
			iFilterSub++;

			// row div
			var theRow = document.createElement("div");
			theRow.className = "rmaRow " + strClass;
			theRow.addEventListener('click', function(e) {
					if (e.target.className != 'reddit-view') {
						e.stopPropagation();
						redditModAdmin.displayActions(this);
					}
				}, false);
			// col2 / labels
			var theCol2 = document.createElement("span");
			theCol2.className = "rmaCol2";
			theCol2.innerHTML = "<span class='label'>" + aRedditLabel + "</span><span class='subs'> ("+ redditModAdmin.addCommas(aRedditSubs) + ")</span>";
			theRow.appendChild(theCol2);
			// col3 / goto
			var theCol3 = document.createElement("a");
			theCol3.className = "reddit-view";
			theCol3.innerHTML = "&#8658;";
			theCol3.href = "/r/" + aRedditLabel;
			theCol3.addEventListener('mousedown', function(e) {
					e.stopPropagation();
				}, false);
			theRow.appendChild(theCol3);

			// clear paragraph
			var theClearP = document.createElement("p");
			theClearP.className = "rmap";
			theRow.appendChild(theClearP);
			theDisplay.appendChild(theRow);
			
			iRedditCount++;
		}
		redditModAdmin.updateStatusBar(iRedditCount, iModerated, iFilterTotal, iFilterSub);
		redditModAdmin.debug("filterDisplay ended.");
		redditModAdmin.displayDebug();
	},
	updateStatusBar : function(iTotal, iSubs, iFilterTotal, iFilterSub) {
		var theStatusBar = document.getElementById("rmaStatusBar");
		theStatusBar.innerHTML = "Reddits Moderated: " + iTotal;
	},
	refreshDisplay : function(bSelectedOnly) {
		// for each entry in the display, read the stored infomation and update
		// subscription status; tags; label
		var rmaData = redditModAdmin.rma;
		var strClass = "";
		var theRow = null;
		var theLabel = null;
		var theTags = null;
		var theInputs = document.getElementsByName("rmaChecked");
		for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
			if ((!bSelectedOnly) || (bSelectedOnly && theInputs[iInput].checked === true)) {
				theRow = theInputs[iInput].parentNode.parentNode;
				theLabel = theRow.firstChild.nextSibling;
				theTags = theLabel.nextSibling;
				if (rmaData.moderated[theInputs[iInput].value]) {
					strClass = "rmaGreen";
				} else {
					strClass = "rmaRed";
				}
				theRow.className = "rmaRow " + strClass;
				theLabel.innerHTML = rmaData.moderated[theInputs[iInput].value].label;
				theTags.innerHTML = rmaData.moderated[theInputs[iInput].value].tags;
			}
		}
	},
	fetch : function(bNow) {
		// look through reddits/mine to find subscribed reddits.
		xhr = new XMLHttpRequest;
		var strNextFetch = "";

		if (bNow) {
			if (redditModAdmin.rma.reqcount < redditModAdmin.reqLimit) {
				redditModAdmin.rma.reqcount++;
				redditModAdmin.writeRMA();

				var strURL = "http://www.reddit.com/reddits/mine/moderator.json";
				strNextFetch = (redditModAdmin.rma.nextModFetch != "")
						? "?after=" + redditModAdmin.rma.nextModFetch
						: "";

				xhr.open("GET", strURL + strNextFetch, true);

				xhr.onreadystatechange = function() {
					redditModAdmin.update();
				}
				xhr.send();
				redditModAdmin.debug("Sent Fetch request: After = " + redditModAdmin.rma.nextModFetch);
			}
		} else {
			// don't call next call too soon, be kind to Reddit servers
			setTimeout(function() {
						redditModAdmin.fetch(true);
					}, redditModAdmin.reqDelay);
			return false;
		}
	},
	update : function() {
		// parse json data and populate local storage
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				redditModAdmin.debug("Fetch response received");

				var rmaData = redditModAdmin.rma;
				var response = xhr.responseText;
				var subredditsJSON = JSON.parse(response);
				var subRedditsJSONData = subredditsJSON.data;
				var subRedditsJSONDataChildren = subRedditsJSONData.children;
				if (subRedditsJSONDataChildren.length != 0) {
					for (var iSubReddit = 0, len = subRedditsJSONDataChildren.length; iSubReddit < len; iSubReddit++) {
						thisSubReddit = subRedditsJSONDataChildren[iSubReddit];
						if (thisSubReddit.data.name != null) {
							rmaData.moderated[thisSubReddit.data.name] = {"label": thisSubReddit.data.display_name, "subs": thisSubReddit.data.subscribers};
						}
					}

					// write to local storage
					redditModAdmin.writeRMA();
					redditModAdmin.filterDisplay();
					// we've processed a page, now look for the next and request it.
					if (subRedditsJSONData.after != null) {
						// get the next page
						rmaData.nextModFetch = subRedditsJSONData.after;
						redditModAdmin.writeRMA();
						redditModAdmin.fetch(false); // false to enforce delay
					}
				}
			} else {
				// no successful response, todo
			}
		}
	},
	addGlobalStyle : function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) {
			return;
		}
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	},
	debug: function(strOutput) {
		try {
			if (redditModAdmin.rma.debug === true) {
				document.getElementById('rmaDBLog').value += strOutput + "\n";
			}
		} catch (err) {};
	},
	firstTimeFetch: function () {
		var bDebug = redditModAdmin.rma.debug;
		redditModAdmin.debug("Executing first time fetch");
		//re-initialise stored information
		window.localStorage.removeItem('redditModAdmin');
		redditModAdmin.readRMA(); 
		redditModAdmin.rma.debug = bDebug;
		redditModAdmin.fetch(true); // fetch subscriptions, now
		redditModAdmin.rma.fetched = true;
		redditModAdmin.writeRMA();
	},
	init : function() {
		// first tests. Parse a page to determine if we are looking at a
		// sub-reddit and capture its id/name/subscription
		redditModAdmin.readRMA();
		redditModAdmin.createUITab();

		var uh = document.getElementsByName("uh");
		if (uh && uh[0] && uh[0].value != "") {
			redditModAdmin.uh = uh[0].value;
			// first time run, get a list of all subscriptions
			if (redditModAdmin.rma.fetched === false) {
				redditModAdmin.firstTimeFetch();
			}
		}

		if (parseFloat(redditModAdmin.version) > parseFloat(redditModAdmin.rma.version)) {
				document.getElementById('rmaDBLog').value = '';
				redditModAdmin.firstTimeFetch();			
		} else {
			redditModAdmin.filterDisplay();
		}
		return false;
	}
}

if (document.body) {
		redditModAdmin.addGlobalStyle(' \
		div.rmaUI { display:none; border:1px solid #5F99CF; position:fixed; background: white; padding:3px; width:250px; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px; \
			-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888;} \
		div.rmaHeader {background:#888; color:#FFF; border:1px sold #888; margin-top:4px; padding: 2px 0px 2px 3px;} \
		div.rmaHeader span.rmaCol2:hover { color:yellow; } \
		div.rmaTitlebar {padding: 2px 4px; margin-bottom:4px; width:auto; background: #CEE3F8; height:2em; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px; } \
		div.rmaTitlebar div.left{text-align:left; font-size:1.5em; float:left;} \
		div.rmaTitlebar div.right{text-align:right; font-size:1.5em; cursor:pointer; width:1.5em; float:right;} \
		div.rmaTitlebar div.right:hover {color:orangeRed; } \
		div.rmaActions{display:none; border:1px solid #5F99CF; position:absolute; background: white; padding:3px; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px; \
			-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888;} \
		div.rmaActions div input {vertical-align:bottom;} ' +

		'div.rmaDisplay {border:1px solid #5F99CF; border-top:none; min-height:10em; max-height:40em; overflow-y: scroll; overflow-x: auto; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px; } \
		div.rmaRow { border-top:1px solid #FFF; border-bottom:1px solid #FFF; padding-left:3px;} \
		div.rmaRow:hover { border-top:1px solid #CCC; border-bottom:1px solid #CCC; } \
		div.rmaGreen { color:green; } \
		div.rmaStatusBar { margin-top: 2px; } \
		span.rmaCol2 {cursor:default; float:left} a.reddit-view {cursor:default; float:right; display: none; color:inherit; font-size:2em; line-height:0.3em; padding: 0px 4px; margin-right: 1px;} p.rmap{clear:both;} \
		span.rmaCol2 span.subs { color:#AAA; } \
		div.rmaRow:hover a.reddit-view {display: inline;} \
		div.rmaRow:hover a.reddit-view:hover {color: orangeRed;} \
		div.rmaTopBorder { border-top: 1px solid grey; padding-top: 2px; margin-top: 5px; } \
		div.icon-menu div { margin: 2px; height:1.5em;} \
		a.reddit-stylesheet:before { background-image: url(http://www.reddit.com/static/sprite.png?v=0ec7f79c9f54824fdef1fe36aef6ad27); background-position: -4px -648px; \
 			float: left; content: " "; margin-right: 5px; display: block; width: 16px; height: 16px;} \
		a.reddit-submit:before {background-image: url(http://www.reddit.com/static/sprite.png?v=0ec7f79c9f54824fdef1fe36aef6ad27); background-position: -1px -17px; background-size: 23px; -moz-background-size: 23px; \
 			float: left; content: " "; margin-right: 5px; display: block; width: 16px; height: 16px;} \
		div.rmaFooter div.rmaStatusBar { text-align:left; float:left; } \
		div.rmaFooter div.rmaRefresh { text-align:right; float:right; margin: 2px 2px 0px 0px; } \
		div.rmaFooter div.rmaDebug { text-align:right; float:right; margin: 2px 2px 0px 0px; } \
		div.rmaFooter div.rmaDebug:after { content: " | ";}\
		div.rmaFooter div.rmaRefresh a:hover { color: orangeRed; } \
		div.rmaModLinks {text-align:center;} div.rmaModLinks a {padding:0px 5px; margin:0px 5px; border: 1px solid lightgrey; display:inline-block; width:5em; text-align:center; font-family: arial, helvetica, san-serif, verdana; }\
		div.rmaDebugOutput { display: none; clear:both; padding-top:5px; height:5em; width:auto;}\
		div.rmaDebugOutput textarea {border:1px solid #5F99CF;  height:3em; width:97.9%;\
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px; } \
		');

		redditModAdmin.init();
}
