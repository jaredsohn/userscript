// ==UserScript==
// @name		Manage Reddit Subscriptions
// @version		0.70
// @namespace	http://ictinus.com/mrs/
// @description	Locally manages your Reddit subscriptions so that you can determine which of your favourite 50 you should be subscribed to at any time. Allows reddit tagging, filtering, view (single or multi reddits).
// @match http://*.reddit.com/*
// @match https://*.reddit.com/*
// ==/UserScript==

// Author: Ictinus
// Released: v0.40 11 January 2011
// Update: v0.41 11 January 2011, improved display updates to keep items checked.
// Update: v0.50 12 Januaru 2011, added ability to pull new unsubscribed reddits the server.
// Update: v0.60 17 January 2011, improved Firefox support, added 'more reddits' button, allowed filtering of NSFW tag, fix multi-reddit subscription button functionality.
// Update: v0.61 17 January 2011, added 'Subscribed Only' filter option.
// Update: v0.62 17 January 2011, added middle button new window/tab action for the 'view' button.
// Update: v0.63 21 January 2011, added close interface on page/UI click; remember filter text after page refresh.
// Update: v0.64 22 January 2011, fixed JSON string bug.
// Update: v0.65 23 January 2011, fixed filter clear btn not remembering it was cleared.
//                                prevented interface from going off screen.
//                                reduced maximum height of interface
// Update: v0.70 02 October 2011, added 'Show Tagged Only' filter; added auto close other UIs.
//				  changed script site security to allow https and remove scary 'allow access to all domains' message.

//TODO: Ability to remove reddits
// TODO allow export of selected reddits.
//		Ability to export/import reddits (that have tags?)
//			export subscribed reddits
//			export reddits with tags
//			export all reddits
//		Consider delaying display updates during 'more reddits' requests or storing selected reddits to keep them checked on display refresh.

if (!Array.prototype.contains) {
	Array.prototype.contains = function(obj) {
		for (var i = 0, len = this.length; i < len; i++) {
			if (this[i] === obj) {
				return i;
			}
		}
		return -1;
	};
}
if (!Array.prototype.remove) {
	// Array Remove - By John Resig (MIT Licensed)
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	}
};

var manageRedditSubs = {
	version : "0.70",
	defaultJSON : {version: "0.70", filterText:"", subscribed:{}, reddits:{}, subqueue:{}, fetched:false, reqcount:0, nextSubFetch:"", nextUnSubFetch:"", hideOver18: false, showSubscribedOnly: false, showTaggedOnly: false },
	reqLimit : 20,
	reqDelay : 2000, // the minimum millisecond delay requested by Reddit
						// Admins
	subDelay : 2000, // the minimum millisecond delay for subscription
						// requests, since the standard reddit interface appears
						// to allow much faster than 2000 ms.
	fetchMyReddits : false, // fetch my subscribed reddits or reddits from
							// /r/all up to 'reqLimit' pages.
	readMRS : function() {
		var strJSON = window.localStorage.getItem("manageRedditSubs");
		if (strJSON === null) {
			manageRedditSubs.mrs = manageRedditSubs.defaultJSON;
		} else {
			manageRedditSubs.mrs = manageRedditSubs.mrs = JSON.parse(strJSON);
		}
	},
	writeMRS : function() {
		window.localStorage.setItem("manageRedditSubs", JSON.stringify(this.mrs));
	},
	subOverride : function(objLink) {
		// get id, label, action
		var pattRedditID = /fancy-toggle-button.*onclick.*unsubscribe\('(.*?)'/;
		var strTitleBoxHTML = objLink.parentNode.parentNode.innerHTML;
		var res = strTitleBoxHTML.match(pattRedditID);
		var strRedditID = RegExp.$1;

		var strRedditName = "";
		var objTitle = objLink.parentNode.nextSibling;
		if (manageRedditSubs.hasClass(objTitle, "title")) { // multiple reddit titles
			strRedditName = objTitle.innerHTML;
		} else { // single reddit title
			objTitle = objLink.parentNode.previousSibling.firstChild;
			if (manageRedditSubs.hasClass(objTitle, "hover")) {
				strRedditName = objTitle.innerHTML;
			} else {
				alert('Manager Reddit Subscriptions is unable to determine the Reddit Title, action stopped.');
				return false; // we failed to find the title, something is wrong, do no more.
			}
		}
		var bSubscribed = (manageRedditSubs.hasClass(objLink, "active") && manageRedditSubs.hasClass(objLink, "remove"));
		var strAction = (bSubscribed) ? "unsub" : "sub";
		manageRedditSubs.mrs.subqueue[strRedditID] = {
			"action" : strAction,
			"label" : strRedditName
		};
		manageRedditSubs.mrs.reqcount = 0;
		manageRedditSubs.writeMRS();
		manageRedditSubs.processRequests(true); // true indicates we need to update the current reddit page

	},
	storeRequests : function(action) {
		var theInputs = document.getElementsByName("mrsChecked");
		var mrsdata = manageRedditSubs.mrs;
		for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
			if (theInputs[iInput].checked === true) {
				mrsdata.subqueue[theInputs[iInput].value] = {
					"action" : action,
					"label" : theInputs[iInput].parentNode.nextSibling.innerHTML
				};
			}
		}

		mrsdata.reqcount = 0;
		manageRedditSubs.writeMRS();
		manageRedditSubs.processRequests();
	},
	processRequests : function(bUpdateCurrentPage) {
		// grab the first queue entry we find
		var firstReq = "";
		var iQueue = 0;
		var mrsData = manageRedditSubs.mrs;
		for (aReq in mrsData.subqueue) {
			iQueue = iQueue + 1;
			if (iQueue === 1) {
				firstReq = {
					"id" : aReq,
					"action" : mrsData.subqueue[aReq].action,
					"label" : mrsData.subqueue[aReq].label
				};
			}
		}
		if (firstReq != "") {
			document.getElementById('mrsProgress').innerHTML = " - Processing " + iQueue;
			document.getElementById('mrsCancel').style.display = "inline";

			if (mrsData.reqcount < manageRedditSubs.reqLimit) {
				mrsData.reqcount++;
				manageRedditSubs.writeMRS();

				// build request and send
				xhr = new XMLHttpRequest;
				var url = "http://www.reddit.com/api/subscribe";
				var params = "sr=" + firstReq.id + "&action=" + firstReq.action
						+ "&r=" + firstReq.label + "&renderstyle=html&uh="
						+ manageRedditSubs.uh;
				xhr.open("POST", url, true);

				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xhr.setRequestHeader("Content-length", params.length);
				xhr.setRequestHeader("Connection", "close");

				xhr.onreadystatechange = function() { // Call a function when the state changes.
					if (xhr.readyState === 4 && xhr.status === 200) {
						// remove the current item from the queue.
						delete mrsData.subqueue[firstReq.id];

						// update the local subscription list
						if (firstReq.action === 'sub') {
							mrsData.subscribed[firstReq.id] = firstReq.label;
						} else { // unsub
							delete mrsData.subscribed[firstReq.id];
						}
						manageRedditSubs.writeMRS();
						manageRedditSubs.refreshDisplay(false);

						if (iQueue === 1) {
							document.getElementById('mrsProgress').innerHTML = "";
							document.getElementById('mrsCancel').style.display = "none";
						}

						// if we have just changed the state of the current
						// page, update it.
						var titlebox = document.getElementsByClassName("titlebox");
						var subscriptionbox = document.getElementsByClassName("subscription-box");
						var pattRedditID = /fancy-toggle-button.*onclick.*unsubscribe\('(.*?)'/;

						if (titlebox && titlebox[0]) {
							var strTitleBoxHTML = titlebox[0].innerHTML;
							var res = strTitleBoxHTML.match(pattRedditID);
							var strRedditID = RegExp.$1;
							if (strRedditID === firstReq.id) {
								var objLink = titlebox[0].firstChild.nextSibling.firstChild;
								var objLinkNext = objLink.nextSibling;
								if (manageRedditSubs.hasClass(objLink, "active")) {
									manageRedditSubs.removeClass(objLink, "active");
									manageRedditSubs.addClass(objLinkNext, "active");
								} else {
									manageRedditSubs.removeClass(objLinkNext, "active");
									manageRedditSubs.addClass(objLink, "active");
								}
								manageRedditSubs.getCurrentRedditInfo();
							}
						} else if (typeof(subscriptionbox[0]) != 'undefined') {
							var arrLIs = subscriptionbox[0].getElementsByTagName('li');
							for (var iLI = 0, len = arrLIs.length; iLI < len; iLI++) {
								var strTitleBoxHTML = arrLIs[iLI].innerHTML;
								var res = strTitleBoxHTML.match(pattRedditID);
								var strRedditID = RegExp.$1;
								if (strRedditID === firstReq.id) {
									var objLink = arrLIs[iLI].firstChild.firstChild;
									var objLinkNext = objLink.nextSibling;
									if (manageRedditSubs.hasClass(objLink, "active")) {
										manageRedditSubs.removeClass(objLink, "active");
										manageRedditSubs.addClass(objLinkNext, "active");
									} else {
										manageRedditSubs.removeClass(objLinkNext, "active");
										manageRedditSubs.addClass(objLink, "active");
									}
									manageRedditSubs.getCurrentRedditInfo();
								}
							}
						}
						// don't call next call too soon, be kind to Reddit servers
						setTimeout(function() {
									manageRedditSubs.processRequests(bUpdateCurrentPage);
								}, manageRedditSubs.subDelay);
					}
				}
				xhr.send(params);
			}
		} else {
			document.getElementById('mrsProgress').innerHTML = "";
			document.getElementById('mrsCancel').style.display = "none";
		}
	},
	closeUIs: function() {
		//close other UIs
		var theUIs = document.getElementsByClassName('ictinusUI');
		for (var iUI = 0, lenUI = theUIs.length; iUI < lenUI; iUI++) {
			theUIs[iUI].style.display = 'none';
		}
	},
	createUITab : function() {
		headerleft = document.getElementById("header-bottom-left");
		var arrTabMenu = headerleft.getElementsByClassName("tabmenu");
		var lastTab;
		if (typeof(arrTabMenu[0]) != 'undefined') {
			tabmenu = arrTabMenu[0];
			uiTab = document.createElement("li");		
			var theLink = document.createElement("a");
			theLink.id = "mrsMyReddits";
			theLink.href = "#";
			theLink.innerHTML = "reddits";
			theLink.addEventListener('click', function (e) {
				e.stopPropagation();				
				var theUI = document.getElementById('mrsUI');
				if (theUI.style.display === 'block') {
					theUI.style.display = 'none';
				} else {
					manageRedditSubs.closeUIs();
					theUI.style.visibility = 'hidden';
					theUI.style.display = 'block';
					theUI.style.top = parseInt(this.offsetTop + this.offsetHeight + 2) + 'px';
					// if pageX +
					var iOffsetLeft = parseInt(this.offsetLeft) + parseInt(this.offsetWidth) - parseInt(parseInt(theUI.offsetWidth)*0.75);
					if (iOffsetLeft + parseInt(theUI.offsetWidth) > document.body.clientWidth) {
						iOffsetLeft = document.body.clientWidth - parseInt(theUI.offsetWidth) - 5;
					}
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
			theUI.id = "mrsUI";
			theUI.className = "mrsUI ictinusUI";

			var theUIForm = document.createElement('form');
			theUIForm.id = 'mrsForm';
			theUI.appendChild(theUIForm);

			var theTitlebar = document.createElement("div");
			theTitlebar.className = "mrsTitlebar";
			theTitlebar.innerHTML = "<div class='left'>manage reddit subscriptions<span id='mrsProgress'></span> <span id='mrsCancel' class='mrsCancel'>Cancel</span></div><div class='right'><span class='help' onclick='e.stopPropagation(); document.getElementById(\"mrsHelp\").style.display = \"block\"'>?</span> <span class='close' onclick='document.getElementById(\"mrsUI\").style.display = \"none\"'>&#215;</span></div>";

			theUIForm.appendChild(theTitlebar);

			var theHelp = document.createElement("div");
			theHelp.id = "mrsHelp";
			theHelp.className = "mrsHelp";
			theHelp.innerHTML = "Help Goes Here."
			theUIForm.appendChild(theHelp);
			
			// theFilter
			var theFilterSpan = document.createElement("span");
			theFilterSpan.className = "mrsClear";

			var theFilter = document.createElement("input");
			theFilter.id = "mrsFilter";
			theFilter.className = "mrsFilter";
			theFilter.value = manageRedditSubs.mrs.filterText || "";
			theFilter.addEventListener('keyup', function() {
						manageRedditSubs.mrs.filterText = this.value;
						manageRedditSubs.writeMRS();
						manageRedditSubs.filterDisplay();
					}, false);
			theFilterSpan.appendChild(theFilter);

			var theSpan = document.createElement("span");
			theSpan.className = "mrsFilterClearBtn2"
			theSpan.innerHTML = "&#8855;";
			theSpan.addEventListener('click', function(e) {
					e.stopPropagation();
					var input = this.previousSibling;
					input.value = '';
					input.focus();
          manageRedditSubs.mrs.filterText = "";
          manageRedditSubs.writeMRS();
					manageRedditSubs.filterDisplay();
				}, false);
			theFilterSpan.appendChild(theSpan);

			var theSpan = document.createElement("span");
			theSpan.className = "mrsFilterOptionsBtn"
			theSpan.innerHTML = "&#9660;";
			theSpan.addEventListener('click', function(e) {
					e.stopPropagation();				
					var theFilterOptions = document.getElementById("mrsFilterOptions");
					if (theFilterOptions.style.display === "block") {
						theFilterOptions.style.display = "none";
					} else {
						var theTagUI = document.getElementById("mrsTagUI");
						theTagUI.style.display = "none";
						theFilterOptions.style.visibility = "hidden";
						theFilterOptions.style.display = "block";
						var iOffsetLeft = parseInt(this.offsetLeft)
								+ parseInt(this.offsetWidth)
								- parseInt(theFilterOptions.offsetWidth);
						theFilterOptions.style.left = iOffsetLeft + "px";
						theFilterOptions.style.visibility = "";
					}
				}, false);
			theFilterSpan.appendChild(theSpan);

			theUIForm.appendChild(theFilterSpan);
			// theFilter options
			var theFilterOptions = document.createElement("div");
			theFilterOptions.id = "mrsFilterOptions";
			theFilterOptions.className = "mrsFilterOptions";

			// option Reddits
			var theFilterOptionItem = document.createElement("div");
			theFilterOptions.appendChild(theFilterOptionItem);

			var theRadioBtn = document.createElement("input");
			theRadioBtn.type = "radio";
			theRadioBtn.name = "mrsInputFilterOptions";
			theRadioBtn.value = "Reddits";
			theRadioBtn.id = "mrsFO2";
			theRadioBtn.checked = false;
			theRadioBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				setTimeout(function() {
					document.getElementById("mrsFilterOptions").style.display = "none";
					manageRedditSubs.filterDisplay();
				}, 250);
			}, false);
			theFilterOptionItem.appendChild(theRadioBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "mrsFO2";
			theLabel.innerHTML = "Reddits";
			theFilterOptionItem.appendChild(theLabel);
			theFilterOptions.appendChild(theFilterOptionItem);

			// option Tags
			theFilterOptionItem = document.createElement("div");
			theFilterOptions.appendChild(theFilterOptionItem);

			theRadioBtn = document.createElement("input");
			theRadioBtn.type = "radio";
			theRadioBtn.name = "mrsInputFilterOptions";
			theRadioBtn.value = "Tags";
			theRadioBtn.id = "mrsFO3";
			theRadioBtn.checked = false;
			theRadioBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				setTimeout(function() {
					document.getElementById("mrsFilterOptions").style.display = "none";
					manageRedditSubs.filterDisplay();
				}, 250);
			}, false);
			theFilterOptionItem.appendChild(theRadioBtn);

			theLabel = document.createElement("label");
			theLabel.htmlFor = "mrsFO3";
			theLabel.innerHTML = "Tags";
			theFilterOptionItem.appendChild(theLabel);
			theFilterOptions.appendChild(theFilterOptionItem);

			// option Both
			theFilterOptionItem = document.createElement("div");
			theFilterOptions.appendChild(theFilterOptionItem);

			theRadioBtn = document.createElement("input");
			theRadioBtn.type = "radio";
			theRadioBtn.name = "mrsInputFilterOptions";
			theRadioBtn.value = "Both";
			theRadioBtn.id = "mrsFO1";
			theRadioBtn.checked = true;
			theRadioBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				setTimeout(function() {
					document.getElementById("mrsFilterOptions").style.display = "none";
					manageRedditSubs.filterDisplay();
				}, 250);
			}, false);
			theFilterOptionItem.appendChild(theRadioBtn);

			theLabel = document.createElement("label");
			theLabel.htmlFor = "mrsFO1";
			theLabel.innerHTML = "Both";
			theFilterOptionItem.appendChild(theLabel);
			theFilterOptions.appendChild(theFilterOptionItem);

			// check show over18
			theFilterOptionItem = document.createElement("div");
			theFilterOptionItem.className = "mrsTopBorder";
			theFilterOptions.appendChild(theFilterOptionItem);

			var theCheckBoxBtn = document.createElement("input");
			theCheckBoxBtn.type = "checkbox";
			theCheckBoxBtn.name = "mrsHideOver18";
			theCheckBoxBtn.value = "hideOver18";
			theCheckBoxBtn.id = "mrsFO4";
			theCheckBoxBtn.checked = manageRedditSubs.mrs.showOver18;
			theCheckBoxBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				manageRedditSubs.mrs.showOver18 = this.checked;
				manageRedditSubs.writeMRS();
				setTimeout(function() {
					document.getElementById("mrsFilterOptions").style.display = "none";
					manageRedditSubs.filterDisplay();
				}, 250);
			}, false);
			theFilterOptionItem.appendChild(theCheckBoxBtn);

			theLabel = document.createElement("label");
			theLabel.htmlFor = "mrsFO4";
			theLabel.innerHTML = "Show NSFW";
			theFilterOptionItem.appendChild(theLabel);
			theFilterOptions.appendChild(theFilterOptionItem);
			
			// check Subscribed Only
			theFilterOptionItem = document.createElement("div");
			theFilterOptions.appendChild(theFilterOptionItem);

			var theCheckBoxBtn = document.createElement("input");
			theCheckBoxBtn.type = "checkbox";
			theCheckBoxBtn.name = "mrsSubsOnly";
			theCheckBoxBtn.value = "SubsOnly";
			theCheckBoxBtn.id = "mrsFO5";
			theCheckBoxBtn.checked = manageRedditSubs.mrs.showSubscribedOnly;
			theCheckBoxBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				manageRedditSubs.mrs.showSubscribedOnly = this.checked;
				manageRedditSubs.writeMRS();
				setTimeout(function() {
					document.getElementById("mrsFilterOptions").style.display = "none";
					manageRedditSubs.filterDisplay();
				}, 250);
			}, false);
			theFilterOptionItem.appendChild(theCheckBoxBtn);

			theLabel = document.createElement("label");
			theLabel.htmlFor = "mrsFO5";
			theLabel.innerHTML = "Subscribed Only";
			theFilterOptionItem.appendChild(theLabel);
			theFilterOptions.appendChild(theFilterOptionItem);

			// check Tagged Only
			theFilterOptionItem = document.createElement("div");
			theFilterOptions.appendChild(theFilterOptionItem);

			var theCheckBoxBtn = document.createElement("input");
			theCheckBoxBtn.type = "checkbox";
			theCheckBoxBtn.name = "mrsTaggedOnly";
			theCheckBoxBtn.value = "TaggedOnly";
			theCheckBoxBtn.id = "mrsFO6";
			theCheckBoxBtn.checked = manageRedditSubs.mrs.showTaggedOnly;
			theCheckBoxBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				manageRedditSubs.mrs.showTaggedOnly = this.checked;
				manageRedditSubs.writeMRS();
				setTimeout(function() {
					document.getElementById("mrsFilterOptions").style.display = "none";
					manageRedditSubs.filterDisplay();
				}, 250);
			}, false);
			theFilterOptionItem.appendChild(theCheckBoxBtn);

			theLabel = document.createElement("label");
			theLabel.htmlFor = "mrsFO6";
			theLabel.innerHTML = "Tagged Only";
			theFilterOptionItem.appendChild(theLabel);
			theFilterOptions.appendChild(theFilterOptionItem);

			theUIForm.appendChild(theFilterOptions);

			// theBtns
			var btn = document.createElement("span");
			btn.addEventListener('click', function(e) {
					e.stopPropagation();			
					var theFilterOptions = document.getElementById("mrsFilterOptions");
					theFilterOptions.style.display = "none";
					manageRedditSubs.filterTagDisplay();
					var theTagUI = document.getElementById('mrsTagUI');
					theTagUI.style.visibility = 'hidden';
					theTagUI.style.display = 'block';
					theTagUI.style.top = parseInt(this.offsetTop
							+ this.offsetHeight + 2)
							+ 'px';
					var iOffsetLeft = parseInt(this.offsetLeft)
							+ parseInt(parseInt(this.offsetWidth) / 2)
							- parseInt(parseInt(theTagUI.offsetWidth) / 2);
					if (iOffsetLeft < 0) {
						theTagUI.style.left = 2 + 'px';
					} else {
						theTagUI.style.left = iOffsetLeft + 'px';
					}
					theTagUI.style.visibility = '';
				}, false);
			btn.innerHTML = "Tags...";
			btn.className = "mrsBtn";

			theUIForm.appendChild(btn);

			btn = document.createElement("span");
			btn.addEventListener('click', function() {
						manageRedditSubs.storeRequests('sub');
					}, false);
			btn.innerHTML = "Subscribe";
			btn.className = "mrsBtn";
			theUIForm.appendChild(btn);

			btn = document.createElement("span");
			btn.addEventListener('click', function() {
						manageRedditSubs.storeRequests('unsub');
					}, false);
			btn.innerHTML = "Unsubscribe";
			btn.className = "mrsBtn";
			theUIForm.appendChild(btn);

			btn = document.createElement("span");
			btn.addEventListener('click', function(e) {
						manageRedditSubs.viewReddit(e);
					}, false);
			btn.innerHTML = "View";
			btn.className = "mrsBtn";
			theUIForm.appendChild(btn);

			btn = document.createElement("span");
			btn.addEventListener('click', function(e) {
					e.stopPropagation();
					if (manageRedditSubs.mrs.fetched === true) {
							manageRedditSubs.mrs.reqcount = 0;
							manageRedditSubs.fetch(false, true);
						}
					}, false);
			btn.innerHTML = "more reddits";
			btn.className = "mrsBtn";
			theUIForm.appendChild(btn);

			// theTagUI
			var theTagUI = document.createElement("div");
			theTagUI.id = "mrsTagUI";
			theTagUI.className = "mrsTagUI";
			// theTagTitlebar
			theTitlebar = document.createElement("div");
			theTitlebar.className = "mrsTitlebar";
			theTitlebar.innerHTML = "<div class='left'>manage tags</div><div class='right'><span onclick='document.getElementById(\"mrsTagUI\").style.display = \"none\"'>&#215;</span></div>";
			theTagUI.appendChild(theTitlebar);

			var theTagFilterSpan = document.createElement("span");
			theTagFilterSpan.className = "mrsClear";
			var theTagFilter = document.createElement("input");
			theTagFilter.id = "mrsTagFilter";
			theTagFilter.className = "mrsTagFilter";
			theTagFilter.addEventListener('keyup', function() {
						manageRedditSubs.filterTagDisplay();
					}, false);
			var theSpan = document.createElement("span");
			theSpan.className = "mrsFilterClearBtn1";
			theSpan.innerHTML = "&#8855;";
			theSpan.addEventListener('click', function() {
						var input = this.previousSibling;
						input.value = "";
						input.focus();
						manageRedditSubs.filterTagDisplay();
					}, false);
			theTagFilterSpan.appendChild(theTagFilter);
			theTagFilterSpan.appendChild(theSpan);
			theTagUI.appendChild(theTagFilterSpan);

			btn = document.createElement("span");
			btn.addEventListener('click', function() {
						manageRedditSubs.test = "Add";
						manageRedditSubs.addTag(document.getElementById("mrsTagFilter").value);
						manageRedditSubs.filterTagDisplay();
					}, false);
			btn.innerHTML = "Add"; // "&#8853;";
			btn.className = "mrsBtn";
			theTagUI.appendChild(btn);

			btn = document.createElement("span");
			btn.addEventListener('click', function() {
						manageRedditSubs.removeTag(document.getElementById("mrsTagFilter").value);
						manageRedditSubs.filterTagDisplay();
					}, false);
			btn.innerHTML = "Remove"; // "&#8854;";
			btn.className = "mrsBtn";
			theTagUI.appendChild(btn);

			// theTagDisplay
			theHeader = document.createElement("div");
			theHeader.className = "mrsHeader";
			theHeader.innerHTML = "<span class='mrsCol3'>Tags</span><p class='mrsp'>";
			theTagUI.appendChild(theHeader);

			var theTagDisplay = document.createElement("div");
			theTagDisplay.id = "mrsTagDisplay";
			theTagDisplay.className = "mrsTagDisplay";
			theTagUI.appendChild(theTagDisplay);

			theTagUI.addEventListener('click', function(e) {
				e.stopPropagation();
			}, false);
			
			theUIForm.appendChild(theTagUI);

			// theDisplay
			var theHeader = document.createElement("div");
			theHeader.className = "mrsHeader";
			theHeader.innerHTML = "<span class='mrsCol1'><input type='checkbox' name='mrsSelectAll' id='mrsSelectAll'></input></span><span class='mrsCol2'>Reddits</span><span class='mrsCol3'>Tags</span><p class='mrsp'>";
			theUIForm.appendChild(theHeader);

			var theDisplay = document.createElement("div");
			theDisplay.id = "mrsDisplay";
			theDisplay.className = "mrsDisplay";
			theUIForm.appendChild(theDisplay);

			var theStatusBar = document.createElement("div");
			theStatusBar.id = "mrsStatusBar";
			theStatusBar.className = "mrsStatusBar";
			theUIForm.appendChild(theStatusBar);

			// build up ui and append to the div
			document.body.appendChild(theUI);
			document.getElementById('mrsSelectAll').addEventListener('click',
				function() {
					manageRedditSubs.selectAll(this.checked)
				}, false);
			
			document.body.addEventListener('click', function () {
				document.getElementById('mrsHelp').style.display = "none";
				document.getElementById('mrsFilterOptions').style.display = "none";
				document.getElementById('mrsUI').style.display = "none";
				document.getElementById('mrsTagUI').style.display = "none";
			}, false);
			document.getElementById("mrsCancel").addEventListener('click',
					function() {
						manageRedditSubs.mrs.subqueue = {};
						manageRedditSubs.writeMRS();
						document.getElementById("mrsProgress").innerHTML = "";
						this.style.display = "none";
					}, false);
			theUI.addEventListener('click', function(e) {
				e.stopPropagation();
				document.getElementById('mrsHelp').style.display = "none";
				document.getElementById('mrsFilterOptions').style.display = "none";
				document.getElementById('mrsTagUI').style.display = "none";
			}, false);
					
			manageRedditSubs.filterDisplay();
		}
	},
	alphaTagSortAscending : function(a, b) {
		try {
			valA = a.toLowerCase();
			valB = b.toLowerCase();
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
	getSortedTagArray : function(reddits) {
		var arrSorted = [];
		var arrTags = [];
		var assTags = {};
		var strTags = "";
		for (aReddit in reddits) {
			// expand tags and append to array
			strTags = reddits[aReddit].tags;
			if (strTags != "") {
				arrTags = strTags.split(",");
			} else {
				arrTags = [];
			}
			for (var iTag = 0, len = arrTags.length; iTag < len; iTag++) {
				assTags[arrTags[iTag]] = "";
			}
		}
		// now we have all unique tags.
		for (aTag in assTags) {
			arrSorted.push(aTag);
		}
		return arrSorted.sort(manageRedditSubs.alphaTagSortAscending);
	},
	getSortedLabelArray : function(reddits) {
		var arrSorted = [];
		for (aReddit in reddits) {
			arrSorted.push({
						"id" : aReddit,
						"label" : reddits[aReddit].label,
						"tags" : reddits[aReddit].tags
					});
		}
		if (arrSorted != []) {
			return arrSorted.sort(manageRedditSubs.alphaLabelSortAscending);
		} else {
			return [];
		}
	},
	getFilterOption : function() {
		var arrFilterOptions = document.getElementsByName("mrsInputFilterOptions");
		if (arrFilterOptions) {
			for (var iOption = 0, len = arrFilterOptions.length; iOption < len; iOption++) {
				if (arrFilterOptions[iOption].checked === true) {
					return arrFilterOptions[iOption].value;
				}
			}
		}
		return false;
	},
	filterDisplay : function() {
		var mrsData = manageRedditSubs.mrs;
		var theDisplay = document.getElementById("mrsDisplay");
		var strHTML = "";
		var strClass = "";
		var iRedditCount = 0;
		var iSubscribed = 0;
		var iFilterSub = 0;
		var iFilterTotal = 0;
		var aRedditID, aRedditLabel, aRedditTags, bOKToDisplay, bFilterCondition;
		var strFilterLC = document.getElementById("mrsFilter").value.toLowerCase();
		var arrLabelSorted = manageRedditSubs.getSortedLabelArray(mrsData.reddits);
		var strFilterOption = manageRedditSubs.getFilterOption();
		theDisplay.innerHTML = "";
		for (var aReddit = 0, len = arrLabelSorted.length; aReddit < len; aReddit++) {
			aRedditID = arrLabelSorted[aReddit].id;
			aRedditLabel = arrLabelSorted[aReddit].label;
			aRedditTags = arrLabelSorted[aReddit].tags;
			if (mrsData.subscribed[aRedditID]) {
				iSubscribed++;
			}
			bOKToDisplay = (
					(mrsData.showOver18 || (aRedditTags.indexOf("NSFW") === -1)
				) && (
					(!mrsData.showSubscribedOnly) || (mrsData.subscribed[aRedditID])
				) && (
					(!mrsData.showTaggedOnly) || (aRedditTags != "")
				)
			);
			if (bOKToDisplay) {
				switch (strFilterOption) {
					case "Both" :
						bFilterCondition = (strFilterLC === "" | aRedditLabel.toLowerCase().indexOf(strFilterLC) >= 0
								| aRedditTags.toLowerCase().indexOf(strFilterLC) >= 0);
						break;
					case "Reddits" :
						bFilterCondition = (strFilterLC === "" | aRedditLabel.toLowerCase().indexOf(strFilterLC) >= 0);
						break;
					case "Tags" :
						bFilterCondition = (strFilterLC === "" | aRedditTags.toLowerCase().indexOf(strFilterLC) >= 0);
						break;
					default :
						bFilterCondition = true;
				}
				if (bFilterCondition) {
//			if (bFilterCondition && bOKToDisplay) {
					iFilterTotal++;
					idChecked = "mrsChecked" + iRedditCount;
	
					if (mrsData.subscribed[aRedditID]) {
						strClass = "mrsGreen";
						iFilterSub++;
					} else {
						strClass = "mrsRed";
					}
	
					// row div
					var theRow = document.createElement("div");
					theRow.className = "mrsRow " + strClass;
					theRow.addEventListener('click', function(e) {
								e.stopPropagation();				
								var theInput = this.firstChild.firstChild;
								theInput.checked = !theInput.checked;
							}, false);
					// col1 / input
					var theCol1 = document.createElement("span");
					theCol1.className = "mrsCol1";
					var theInput = document.createElement("input");
					theInput.name = "mrsChecked";
					theInput.type = "checkbox";
					theInput.id = idChecked;
					theInput.addEventListener('click', function(e) {
								e.stopPropagation();
							}, false);
					theInput.value = aRedditID;
					theCol1.appendChild(theInput);
					theRow.appendChild(theCol1);
	
					// col2 / labels
					var theCol2 = document.createElement("span");
					theCol2.className = "mrsCol2";
					theCol2.innerHTML = aRedditLabel;
					theRow.appendChild(theCol2);
	
					// col3 / tags
					var theCol3 = document.createElement("span");
					theCol3.className = "mrsCol3";
					theCol3.innerHTML = aRedditTags;
					theRow.appendChild(theCol3);
	
					// clear paragraph
					var theClearP = document.createElement("p");
					theClearP.className = "mrsp";
					theRow.appendChild(theClearP);
	
					theDisplay.appendChild(theRow);
				}
			}
			iRedditCount++;
		}
		document.getElementById("mrsSelectAll").checked = false;
		manageRedditSubs.updateStatusBar(iRedditCount, iSubscribed, iFilterTotal, iFilterSub);
	},
	filterTagDisplay : function() {
		var theTagDisplay = document.getElementById("mrsTagDisplay");
		var strFilterLC = document.getElementById("mrsTagFilter").value.toLowerCase();
		var arrTagSorted = manageRedditSubs.getSortedTagArray(manageRedditSubs.mrs.reddits);
		theTagDisplay.innerHTML = "";
		for (var iTag = 0, len = arrTagSorted.length; iTag < len; iTag++) {
			if (arrTagSorted[iTag].toLowerCase().indexOf(strFilterLC) >= 0
					| strFilterLC === "") {
				var theRow = document.createElement("div");
				theRow.className = "mrsRow";
				theRow.addEventListener('click', function() {
					document.getElementById("mrsTagFilter").value = this.firstChild.innerHTML;
					manageRedditSubs.filterTagDisplay();
				}, false);
				var theTagSpan = document.createElement("span");
				theTagSpan.className = "mrsCol3";
				theTagSpan.innerHTML = arrTagSorted[iTag];
				theRow.appendChild(theTagSpan);
				var theClearP = document.createElement("p");
				theClearP.className = "mrsp";
				theRow.appendChild(theClearP);
				theTagDisplay.appendChild(theRow);
			}
		}
	},
	viewReddit : function(e) {
		var mrsData = manageRedditSubs.mrs;
		var strReddits = "";
		var strURL = "";
		var theInputs = document.getElementsByName("mrsChecked");
		for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
			if (theInputs[iInput].checked === true) {
				strReddits = mrsData.reddits[theInputs[iInput].value].label + "+" + strReddits;
			}
		}
		if (strReddits === "") {
			strReddits = document.getElementById("mrsFilter").value;
		} else {
			strReddits = strReddits.slice(0, -1);
		}
		strURL = location.protocol + "//" + location.host + "/r/" + strReddits;
		if (e.button === 1) {
			window.open(strURL, strReddits);
		} else {
			location.href = strURL;			
		}		
	},
	selectAll : function(bOnOff) {
		var theInputs = document.getElementsByName("mrsChecked");
		for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
			theInputs[iInput].checked = bOnOff;
		}
	},
	updateStatusBar : function(iTotal, iSubs, iFilterTotal, iFilterSub) {
		var theStatusBar = document.getElementById("mrsStatusBar");
		theStatusBar.innerHTML = "Reddits Subscribed: " + iSubs + "/" + iTotal;
		if (iFilterTotal != iTotal) {
			theStatusBar.innerHTML += ", Filtered: " + iFilterSub + "/" + iFilterTotal;
		}
	},
	refreshDisplay : function(bSelectedOnly) {
		// for each entry in the display, read the stored infomation and update
		// subscription status; tags; label
		var mrsData = manageRedditSubs.mrs;
		var strClass = "";
		var theRow = null;
		var theLabel = null;
		var theTags = null;
		var theInput = null;
		var theInputs = document.getElementsByName("mrsChecked");
		for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
			theInput = theInputs[iInput];
			if ((!bSelectedOnly) || (bSelectedOnly && theInput.checked === true)) {
				theRow = theInput.parentNode.parentNode;
				theLabel = theRow.firstChild.nextSibling;
				theTags = theLabel.nextSibling;
				if (mrsData.subscribed[theInput.value]) {
					strClass = "mrsGreen";
				} else {
					strClass = "mrsRed";
				}
				theRow.className = "mrsRow " + strClass;
				theLabel.innerHTML = mrsData.reddits[theInput.value].label;
				theTags.innerHTML = mrsData.reddits[theInput.value].tags;
			}
		}
	},
	addTag : function(tag) {
		if (tag != "") {
			var mrsData = manageRedditSubs.mrs;
			var arrTags = [];
			var iTagPos = -1;
			var strTags = "";
			var theInput = null;
			var theInputs = document.getElementsByName("mrsChecked");
			for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
				theInput = theInputs[iInput];
				if (theInput.checked === true) {
					strTags = mrsData.reddits[theInput.value].tags;
					if (strTags != "") {
						arrTags = strTags.split(",");
					} else {
						arrTags = [];
					}
					iTagPos = arrTags.contains(tag);
					if (iTagPos === -1) {
						arrTags.push(tag);
						mrsData.reddits[theInput.value].tags = arrTags.join(",");
					}
				}
			}
			manageRedditSubs.writeMRS();
			manageRedditSubs.refreshDisplay(true);
		}
	},
	removeTag : function(tag) {
		if (tag != "") {
			var mrsData = manageRedditSubs.mrs;
			var arrTags = [];
			var iTagPos = -1;
			var theInput = null;
			var theInputs = document.getElementsByName("mrsChecked");
			for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
				theInput = theInputs[iInput];
				if (theInput.checked === true) {
					arrTags = mrsData.reddits[theInput.value].tags.split(",");
					iTagPos = arrTags.contains(tag);
					if (iTagPos != -1) {
						arrTags.remove(iTagPos);
						mrsData.reddits[theInput.value].tags = arrTags.join(",");
					}
				}
			}
			manageRedditSubs.writeMRS();
			manageRedditSubs.refreshDisplay(true);
		}
	},
	fetch : function(bSubscribed, bNow) {
		// look through reddits/mine to find subscribed reddits.
		xhr = new XMLHttpRequest;
		var strNextFetch = "";

		if (bNow) {
			if (manageRedditSubs.mrs.reqcount < manageRedditSubs.reqLimit) {
				manageRedditSubs.mrs.reqcount++;
				manageRedditSubs.writeMRS();

				if (bSubscribed) {
					var strURL = "http://www.reddit.com/reddits/mine.json";
					strNextFetch = (manageRedditSubs.mrs.nextSubFetch != "")
							? "?after=" + manageRedditSubs.mrs.nextSubFetch
							: "";
				} else {
					var strURL = "http://www.reddit.com/reddits.json";
					strNextFetch = (manageRedditSubs.mrs.nextUnSubFetch != "")
							? "?after=" + manageRedditSubs.mrs.nextUnSubFetch
							: "";
				}
				xhr.open("GET", strURL + strNextFetch, true);

				xhr.onreadystatechange = function() {
					manageRedditSubs.update(bSubscribed);
				}
				xhr.send();
			}
		} else {
			// don't call next call too soon, be kind to Reddit servers
			setTimeout(function() {
						manageRedditSubs.fetch(bSubscribed, true);
					}, manageRedditSubs.reqDelay);
			return false;
		}
	},
	update : function(bSubscribed) {
		// parse json data and populate local storage
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var mrsData = manageRedditSubs.mrs;
				var response = xhr.responseText;
				var subredditsJSON = JSON.parse(response);
				var subRedditsJSONData = subredditsJSON.data;
				var subRedditsJSONDataChildren = subRedditsJSONData.children;

				if (subRedditsJSONDataChildren.length != 0) {
					for (var iSubReddit = 0, len = subRedditsJSONDataChildren.length; iSubReddit < len; iSubReddit++) {
						thisSubReddit = subRedditsJSONDataChildren[iSubReddit];
						if (thisSubReddit.data.name != null) {
							if (bSubscribed === true) {
								mrsData.subscribed[thisSubReddit.data.name] = thisSubReddit.data.display_name;
							}
							var strTag = (thisSubReddit.data.over18)
									? "NSFW"
									: "";
							mrsData.reddits[thisSubReddit.data.name] = {
								"label" : thisSubReddit.data.display_name,
								"tags" : strTag
							};
						}
					}

					// write to local storage
					manageRedditSubs.writeMRS();
					manageRedditSubs.filterDisplay();
					// we've processed a page, now look for the next and request it.
					if (subRedditsJSONData.after != null) {
						// get the next page
						if (bSubscribed) {
							mrsData.nextSubFetch = subRedditsJSONData.after;
						} else {
							mrsData.nextUnSubFetch = subRedditsJSONData.after;
						}
						manageRedditSubs.writeMRS();
						manageRedditSubs.fetch(bSubscribed, false); // false to enforce delay
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
	getCurrentRedditInfo : function() {
		// ensure we have the correct subscription state for the current Reddit

		var titlebox = document.getElementsByClassName("titlebox");
		var subscriptionbox = document.getElementsByClassName("subscription-box");
		var pattRedditID = /fancy-toggle-button.*onclick.*unsubscribe\('(.*?)'/;
		if (typeof(titlebox[0]) != 'undefined') {
			var objLink = titlebox[0].firstChild.nextSibling.firstChild;
			var strTitleBoxHTML = titlebox[0].innerHTML;
			var pattTitle = /class.*redditname.*href.*\/r\/(.*?)\/.*fancy-toggle-button/;
			// var pattState = /class.*active.*(remove).*onclick.*unsubscribe/;
			var res = strTitleBoxHTML.match(pattRedditID);
			var strRedditID = RegExp.$1;
			res = strTitleBoxHTML.match(pattTitle);
			var strRedditName = RegExp.$1;
			// res = strTitleBoxHTML.match(pattState);
			var bSubscribed = ((manageRedditSubs.hasClass(objLink, "active") && manageRedditSubs.hasClass(objLink, "remove")) ||
				 (manageRedditSubs.hasClass(objLink.nextSibling, "active") && manageRedditSubs.hasClass(objLink.nextSibling, "remove")));

			if (strRedditID != "") {
				if (!manageRedditSubs.hasClass(objLink, "mrs")) { // only do this once
					objLink.onclick = null;
					objLink.addEventListener('click', function() {
								manageRedditSubs.subOverride(this);
							}, false);

					objLink.nextSibling.onclick = null;
					objLink.nextSibling.addEventListener('click', function() {
								manageRedditSubs.subOverride(this);
							}, false);

					manageRedditSubs.addClass(objLink, "mrs");
				}

				if (typeof(manageRedditSubs.mrs.reddits[strRedditID]) === 'undefined') {
					// this is a previously unknown reddit, but we know it now.
					// TODO determine over18 status and populate tag
					manageRedditSubs.mrs.reddits[strRedditID] = {
						"label" : strRedditName,
						"tags" : ""
					};
				}
				if (bSubscribed) {
					manageRedditSubs.mrs.subscribed[strRedditID] = strRedditName;
				} else {
					delete manageRedditSubs.mrs.subscribed[strRedditID];
				}

				manageRedditSubs.writeMRS();
				manageRedditSubs.filterDisplay();
			}
		} else if (typeof(subscriptionbox[0]) != 'undefined') {
			var arrLIs = subscriptionbox[0].getElementsByTagName('li');
			for (var iLI = 0, len = arrLIs.length; iLI < len; iLI++) {
				objLink = arrLIs[iLI].firstChild.firstChild;

				var strTitleBoxHTML = arrLIs[iLI].innerHTML;
				var res = strTitleBoxHTML.match(pattRedditID);
				var strRedditID = RegExp.$1;

				var objTitle = arrLIs[iLI].getElementsByClassName('title');
				var strRedditName = objTitle[0].innerHTML;
				var bSubscribed = ((manageRedditSubs
						.hasClass(objLink, "active") && manageRedditSubs
						.hasClass(objLink, "remove")) || (manageRedditSubs
						.hasClass(objLink.nextSibling, "active") && manageRedditSubs
						.hasClass(objLink.nextSibling, "remove")));

				if (strRedditID != "") {
					if (!manageRedditSubs.hasClass(objLink, "mrs")) { // only do this once per page so multiple EventListeners aren't created
						objLink.onclick = null;
						objLink.addEventListener('click', function() {
									manageRedditSubs.subOverride(this);
								}, false);

						objLink.nextSibling.onclick = null;
						objLink.nextSibling.addEventListener('click',
								function() {
									manageRedditSubs.subOverride(this);
								}, false);

						manageRedditSubs.addClass(objLink, "mrs");
					}
					if (typeof(manageRedditSubs.mrs.reddits[strRedditID]) === 'undefined') {
						// this is a previously unknown reddit, but we know it
						// now.
						// TODO determine over18 status and populate tag
						manageRedditSubs.mrs.reddits[strRedditID] = {
							"label" : strRedditName,
							"tags" : ""
						};
					}
					if (bSubscribed) {
						manageRedditSubs.mrs.subscribed[strRedditID] = strRedditName;
					} else {
						delete manageRedditSubs.mrs.subscribed[strRedditID];
					}
				}
			}
			manageRedditSubs.writeMRS();
			manageRedditSubs.filterDisplay();
		}
	},
	slurpReddits : function() {
		// grab any reddits we can find on pages like /r/all
		var subRedditLinks = document.getElementsByClassName("subreddit");
		if (typeof(subRedditLinks) != 'undefined') {
			for (var iSubReddit = 0, len = subRedditLinks.length; iSubReddit < len; iSubReddit++) {
				var strRedditName = subRedditLinks[iSubReddit].innerHTML;
				var objScript = subRedditLinks[iSubReddit].nextSibling;
				if (objScript.tagName.toLowerCase() === "script") {
					var pattThingID = /\['(.*?)'\] =/;
					var pattRedditID = /= '(.*?)';/;
					var res = objScript.innerHTML.match(pattRedditID);
					var strRedditID = RegExp.$1;
					if (typeof(manageRedditSubs.mrs.reddits[strRedditID]) === 'undefined') {
						var res = objScript.innerHTML.match(pattThingID);
						var strThingID = "id-" + RegExp.$1;

						var objThing = document.getElementsByClassName(strThingID);
						var strTag = (objThing[0].className.indexOf("over18") != -1)
								? "NSFW"
								: "";
						manageRedditSubs.mrs.reddits[strRedditID] = {
							"label" : strRedditName,
							"tags" : strTag
						};
					}
				}
			}
			manageRedditSubs.writeMRS();
			manageRedditSubs.filterDisplay();
		}
	},
	hasClass : function(el, selector) {
		var className = " " + selector + " ";
		if ((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
			return true;
		}
		return false;
	},
	removeClass : function(ele, cls) {
		if (manageRedditSubs.hasClass(ele, cls)) {
			ele.className = ele.className.replace(cls, '');
			ele.className.replace(/ +/g, ' ');
		}
	},
	addClass : function(ele, cls) {
		// from http://userscripts.org/scripts/review/77390
		if (!manageRedditSubs.hasClass(ele, cls)) ele.className += " " + cls;
		ele.className = ele.className.replace(/ +/g, ' ');
	},
	init : function() {
		// first tests. Parse a page to determine if we are looking at a
		// sub-reddit and capture its id/name/subscription
		manageRedditSubs.createUITab();
		manageRedditSubs.getCurrentRedditInfo();
		manageRedditSubs.slurpReddits();

		// first time run, get a list of all subscriptions
		if (manageRedditSubs.mrs.fetched === false) {
			manageRedditSubs.mrs.reqcount = 0;
			manageRedditSubs.fetch(true, true); // fetch subscriptions, now
			manageRedditSubs.mrs.fetched = true;
			manageRedditSubs.writeMRS();
		}
		return false;
	}
}

if (document.body) {
	var uh = document.getElementsByName("uh");
	if (uh && uh[0] && uh[0].value != "") {
		manageRedditSubs.uh = uh[0].value;
		manageRedditSubs.readMRS();

		manageRedditSubs.addGlobalStyle(' \
		div.mrsUI { display:none; border:1px solid #5F99CF; position:fixed; background: white; padding:3px; width:500px; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px;  \
			-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888;} \
		div.mrsHeader {background:#888; color:#FFF; border:1px sold #888; margin-top:4px; padding: 0px 0px 1px 3px;} \
		div.mrsTitlebar {padding: 2px 4px; margin-bottom:4px; width:auto; background: #CEE3F8; height:2em; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
		border-bottom-right-radius: 4px; \
		border-bottom-left-radius: 4px;  } \
		div.mrsTagTitlebar {height:1em;} \
		div.mrsTitlebar div.left{text-align:left; font-size:1.5em; float:left;} \
		div.mrsTitlebar div.right {text-align:right; cursor:pointer; width:2.5em; float:right;} \
		div.mrsTitlebar div.right span.help {font-size: 1.3em;} \
		div.mrsTitlebar div.right span.close {font-size:1.5em;} \
		div.mrsTitlebar div.right span:hover {color:orangeRed; } \
		span.mrsClear input.mrsFilter {width:10em; padding-right: 32px; } \
		span.mrsClear input.mrsTagFilter {width:7em; padding-right: 16px; } \
		div.mrsFilterOptions{display:none; border:1px solid #5F99CF; position:absolute; background: white; padding:3px; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
		border-bottom-right-radius: 4px; \
		border-bottom-left-radius: 4px;  \
			-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888;} \
		div.mrsFilterOptions div input {vertical-align:bottom;} \
		div.mrsTagUI {display:none; border:1px solid #5F99CF; position:absolute; background: white; padding:3px; opacity:0.5; -moz-opacity:0.5; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
		border-bottom-right-radius: 4px; \
		border-bottom-left-radius: 4px;  \
		-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888; } \
	    div.mrsTagUI:hover { opacity:1; -moz-opacity:1; } \
		div.mrsDisplay, div.mrsTagDisplay {border:1px solid #5F99CF; border-top:none; min-height:10em; max-height:25em; overflow-y: scroll; overflow-x: auto; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px;  } \
		div.mrsRow { border-top:1px solid #FFF; border-bottom:1px solid #FFF; padding-left:3px;} \
		div.mrsRow:hover { border-top:1px solid #CCC; border-bottom:1px solid #CCC; } \
		div.mrsGreen { color:green; } \
		div.mrsRed { color:red; } \
		div.mrsStatusBar { margin-top: 2px; } \
		span.mrsCol1{width:2em; float:left;} span.mrsCol2 {cursor:default; width: 15em; float:left} span.mrsCol3 {cursor:default; float:left} p.mrsp{clear:both;} span.mrsCol1 input{margin:0px;} \
		span.mrsBtn { -webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px; \
			border: 1px solid #5F99CF; \
			margin: 0px 0px 0px 5px;\
			padding: 2px; \
			background: -moz-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #CCC 100%);\
			background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fcfff4), color-stop(40%,#dfe5d7), color-stop(100%,#CCC)); \
		} \
		span.mrsBtn:hover {background: #dfe5d7; cursor:pointer;} \
		span.mrsClear { position: relative; } \
		span.mrsClear span.mrsFilterClearBtn2 { \
			position: absolute; \
			display: block; \
			top: -5px; \
			right: 16px; \
			width: 16px; \
			cursor: pointer; \
			font-size:1.6em; \
			color: grey; \
		} \
		span.mrsClear span.mrsFilterClearBtn1 { \
			position: absolute; \
			display: block; \
			top: -5px; \
			right: 0px; \
			width: 16px; \
			cursor: pointer; \
			font-size:1.6em; \
			color: grey; \
		} \
		span.mrsClear span.mrsFilterOptionsBtn { \
			position: absolute; \
			display: block; \
			top: -4px; \
			right: 0px; \
			width: 16px; \
			cursor: pointer; \
			font-size:1.4em; \
			color: grey; \
		} \
		span.mrsClear span:hover { color: orangeRed } \
		span.mrsCancel { display:none; color:red; font-size:0.8em; cursor:pointer;} \
		div.mrsTopBorder { border-top: 1px solid grey; padding-top: 2px; margin-top: 5px; } \
		div.mrsHelp {display:none; border:1px solid #5F99CF; position:absolute; background: white; padding:3px; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px; \
			-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888; \
			z-index:1; \
		} \
		');
 		manageRedditSubs.init();
	}
}
