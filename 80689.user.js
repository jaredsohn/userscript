// Static Reddit Header
// Author: Ictinus
// Released: 03 July 2010, make the Reddit header static.
// Update: 04 July 2010, (1.01) removed outerHTML reference fixing 'undefined' error in Firefox. 
//         (1.02) Fixed FF content capture. 
//         (1.03) Fixed for pages that do not display 'side' panel (eg. Inbox)
//         (1.04) Added moveSubRedditDrop function.
//         (1.05) Fixed things.
// Update: 07 July 2010, (1.06) Fixed Firefox border radius bug. Prevent script running twice with exclude.
// Update: 10 July 2010, (1.07) Get the first 'content' class sibling of 'Side' class div, not the first 'content' class element.
//         (1.08) added 'rising' tab to header.
//         (1.09) added user tab menu containing user page tab links: overview, comments, submitted, liked, disliked, hidden
//         (1.10) fixed what was I thinking code loops. Moved user tab to end of tabs for consistent 'my reddits' positioning.
// Update: 11 July 2010, (1.11) added a link to the subreddit title in the right side pane. ok not header related, but so what.
//         (1.12) bug fix for non-existing subreddit title on main page, doh!
//         (1.13) bug fix for non-existing subreddit title on user page.
// Update: 01 October 2010, (1.14) added tab menu for 'top' pages.
//         (1.15) Added 'all time' as an option to the 'top' tab, and fixed the urls.
//         (1.16) Clear Search field text on focus, revert to 'search reddit' on blur if empty.
// Update: 06 November 2010, (1.17) fix funtionality on Search page.
// Update: 28 January 2011, (1.18) added friends to the user tab. made tab styling consistent with existing tabs.
//		   (1.19) improved header tab compatibility with custom CSS.
// Update: 08 August 2011, (1.20) added additional header resize calls to update the header height sooner when possible.
// Update: 12 October 2011, (1.21) grr, now the header should be fixed. Changed script site security to allow https and remove scary 'allow access to all domains' message. Fixed moveSubReddits menu click event.
// Update: 14 October 2011, (1.22) added Acount Activity to the user tab. Fixed 'friends' spelling in the user tab.
// Update: 05 November 2011, (1.23) added ability to move Sticky messages to above the content area.
// Update: 07 November 2011, (1.24) removed options for linking the sub-reddit title and fixing the search field as they are no longer needed.
// Update: 29 November 2011, (1.25) added ability to configure script options.
// Update: 09 February 2012, (1.26) changed layout for static header, fixes compatability with some other scripts and CSS sticky banners.
// Update: 28 February 2012, (1.27) Side bar is now static along with the header as requested by jzupp.
// Update: 01 March 2012, (1.28) Use .srhContent rather than .content for styling to prevent issues with use of .content in /r/geek side bar.
// Update: 05 October 2012, (1.29) Added per reddit configuration. Fixed header sizing. Removed down arrow image on tabs.
// Update: 05 October 2012, (1.30) Static Side Bar is now an option independent of Static Header as requested by keylogthis.

// ==UserScript==
// @name            Static Reddit Header
// @version         1.30
// @namespace       http://ictinus.com/srh/
// @description     Make the Reddit Header static, allowing it to be visible at all times.
// @match http://*.reddit.com/*
// @match https://*.reddit.com/*
// ==/UserScript==

var staticRedditHeader = {
	storeName: "staticRedditHeader",
	staticHeader: true,    //change to false to disable the static header
	moveSubReddits: true,  //change to false to prevent subreddit tab menu move and subreddit bar removal
	addRisingTab: true,    //adds a 'rising' tab next to the 'new' tab
	addUserTab: true,      //adds a 'user' dropdown tab with the user page tabs in it.
	dropdownTopTab: true,  //adds a drop down list of top options to the top tab
	moveStickyElement: true, //moves absolute positioned md child element to top of content.

	version : 1.30,
	marginTop : {get:true, value: 0},
	defaultJSON: {version:"1.30", ops:{defaults:{staticHeader:true, staticSide:true, moveSubReddits:true, addRisingTab:true, addUserTab:true, dropdownTopTab:true, moveStickyElement:true}, reddits:{}}},
	getNextSibling: function (obj) {
		obj  = obj.nextSibling;
		while (obj && (obj.nodeType != 1)) {
			obj = obj.nextSibling;
		}
		return obj;
	},
	readStore : function() {
		var strJSON = window.localStorage.getItem(this.storeName);
		if (strJSON === null) {
			this.srh = this.defaultJSON;
		} else {
			this.srh = JSON.parse(strJSON);
			if (this.srh.version != this.defaultJSON.version) {
				try {
					//ensure all default options exist
					for (option in this.defaultJSON.ops.defaults) {
						if (typeof (this.srh.ops.defaults[option]) == 'undefined') {
							this.srh.ops.defaults[option] = this.defaultJSON.ops.defaults[option];
						}
					}
					//ensure all options for each reddit exist
					for (reddit in this.srh.ops.reddits) {
						for (option in this.defaultJSON.ops.defaults) {
							if (typeof(this.srh.ops.reddits[reddit][option]) == 'undefined') {
								this.srh.ops.reddits[reddit][option] = this.defaultJSON.ops.defaults[option];
							}
						}
					}
					this.srh.version = this.defaultJSON.version;
				} catch (e) {
					this.srh = this.defaultJSON;			
				}
			}
		}
	},
	writeStore : function() {
		window.localStorage.setItem(this.storeName, JSON.stringify(this.srh));
	},
	copyObject: function(obj) {
	    // Handle the 3 simple types, and null or undefined
	    if (null == obj || "object" != typeof obj) return obj;
	    if (obj instanceof Object) {
	        var copy = {};
	        for (var attr in obj) {
	            if (obj.hasOwnProperty(attr)) copy[attr] = staticRedditHeader.copyObject(obj[attr]);
	        }
	        return copy;
	    }
	},
	arrayRemove: function(from, to) {
		  var rest = this.slice((to || from) + 1 || this.length);
		  this.length = from < 0 ? this.length + from : from;
		  return this.push.apply(this, rest);
	},
	closeUIs: function() {
		//close other UIs
		var theUIs = document.getElementsByClassName('ictinusUI');
		for (var iUI = 0, lenUI = theUIs.length; iUI < lenUI; iUI++) {
			theUIs[iUI].style.display = 'none';
		}
	},
	getCurrentRedditInfo : function() {
		// find the current reddit id and name

		var titlebox = document.getElementsByClassName("titlebox");
		if (typeof(titlebox[0]) != 'undefined') {
			var strTitleBoxHTML = titlebox[0].innerHTML;
			var pattRedditID = /fancy-toggle-button.*onclick.*unsubscribe\('(.*?)'/;
			var pattTitle = /class.*redditname.*href.*\/r\/(.*?)\/.*fancy-toggle-button/;
			var res = strTitleBoxHTML.match(pattRedditID);
			this.strRedditID = RegExp.$1;
			res = strTitleBoxHTML.match(pattTitle);
			this.strRedditName = RegExp.$1;
			if (typeof(this.strRedditID) == 'undefined') {
				this.strRedditID = 'reddit';
				this.strRedditName = 'Reddit';
			}
		} else {
			this.strRedditID = 'reddit';
			this.strRedditName = 'Reddit';
		}
	},
	createUITab : function() {
		var headerBottomRight = document.getElementById("header-bottom-right");
		var spanSeparator = document.createElement('span');
		spanSeparator.innerHTML = "|";
		spanSeparator.className = "separator";
		var spanCheck = document.createElement('span');
		spanCheck.id = "srhOptions";
		spanCheck.innerHTML = "<b>&sect;&sect;</b>";
		spanCheck.style.cursor = "pointer";
		spanCheck.style.fontWeight = "bold";
		spanCheck.addEventListener("click", function(e) {
			e.stopPropagation();
			var theUI = document.getElementById('srhUI');
			if (theUI.style.display === 'block') {
				theUI.style.display = 'none';
			} else { 
				staticRedditHeader.closeUIs();
				theUI.style.visibility = 'hidden';
				theUI.style.display = 'block';
				theUI.style.top = parseInt(this.offsetTop + this.offsetHeight + 2) + 'px';
				var iOffsetLeft = parseInt(this.parentElement.offsetLeft) + parseInt(this.offsetLeft) + parseInt(this.offsetWidth) - parseInt(theUI.offsetWidth) + 10; 
				theUI.style.left = iOffsetLeft + 'px';
				theUI.style.visibility = '';
			}
		}, false);
 		headerBottomRight.insertBefore(spanCheck, headerBottomRight.lastChild);
 		headerBottomRight.insertBefore(spanSeparator, headerBottomRight.lastChild);

//create ui popup
		var theUI = document.createElement("div");
		theUI.id = "srhUI";
		theUI.className = "srhUI ictinusUI";

//populate the ui here
		if (staticRedditHeader.strRedditID != "") {
			if (!staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) {
				staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID] = staticRedditHeader.copyObject(staticRedditHeader.srh.ops.defaults);
			}
			//reddit name
			var optionTitle = document.createElement("div");
			optionTitle.innerHTML = "<span class='srhRedditOptionTitle'>" + staticRedditHeader.strRedditName + "</span>"
			theUI.appendChild(optionTitle);

			//Option 1 - for this reddit		
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "staticHeader";
			theInputBtn.id = "srh-op1-tr";
			theInputBtn.checked = staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].staticHeader;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				if (!staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) {
					staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID] = staticRedditHeader.copyObject(staticRedditHeader.srh.ops.defaults);
				}
				staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].staticHeader = this.checked;
				
				if (JSON.stringify(staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) === JSON.stringify(staticRedditHeader.srh.ops.defaults)) {
					//if the option values for this reddit are the same as the default, we can remove them and rely on the defaults
					delete staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID];
				}
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op1-tr";
			theLabel.innerHTML = "Static Header";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);			

			//Option 7 - for this reddit			
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "staticSide";
			theInputBtn.id = "srh-op7-tr";
			theInputBtn.checked = staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].staticSide;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				if (!staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) {
					staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID] = staticRedditHeader.copyObject(staticRedditHeader.srh.ops.defaults);
				}
				staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].staticSide = this.checked;
				if (JSON.stringify(staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) === JSON.stringify(staticRedditHeader.srh.ops.defaults)) {
					//if the option values for this reddit are the same as the default, we can remove them and rely on the defaults
					delete staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID];
				}
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op7-tr";
			theLabel.innerHTML = "Static Side Bar";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);			

			//Option 2 - for this reddit			
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "moveSubReddits";
			theInputBtn.id = "srh-op2-tr";
			theInputBtn.checked = staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].moveSubReddits;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				if (!staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) {
					staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID] = staticRedditHeader.copyObject(staticRedditHeader.srh.ops.defaults);
				}
				staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].moveSubReddits = this.checked;
				if (JSON.stringify(staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) === JSON.stringify(staticRedditHeader.srh.ops.defaults)) {
					//if the option values for this reddit are the same as the default, we can remove them and rely on the defaults
					delete staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID];
				}				
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op2-tr";
			theLabel.innerHTML = "Move subReddits List";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);			

			//Option 3 - for this reddit			
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "addRisingTab";
			theInputBtn.id = "srh-op3-tr";
			theInputBtn.checked = staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].addRisingTab;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				if (!staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) {
					staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID] = staticRedditHeader.copyObject(staticRedditHeader.srh.ops.defaults);
				}
				staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].addRisingTab = this.checked;
				if (JSON.stringify(staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) === JSON.stringify(staticRedditHeader.srh.ops.defaults)) {
					//if the option values for this reddit are the same as the default, we can remove them and rely on the defaults
					delete staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID];
				}				
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op3-tr";
			theLabel.innerHTML = "Add Rising Tab";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);			

			//Option 4 - for this reddit			
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "addUserTab";
			theInputBtn.id = "srh-op4-tr";
			theInputBtn.checked = staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].addUserTab;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				if (!staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) {
					staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID] = staticRedditHeader.copyObject(staticRedditHeader.srh.ops.defaults);
				}
				staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].addUserTab = this.checked;
				if (JSON.stringify(staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) === JSON.stringify(staticRedditHeader.srh.ops.defaults)) {
					//if the option values for this reddit are the same as the default, we can remove them and rely on the defaults
					delete staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID];
				}				
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op4-tr";
			theLabel.innerHTML = "Add User Tab";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);			

			//Option 5 - for this reddit			
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "dropdownTopTab";
			theInputBtn.id = "srh-op5-tr";
			theInputBtn.checked = staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].dropdownTopTab;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				if (!staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) {
					staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID] = staticRedditHeader.copyObject(staticRedditHeader.srh.ops.defaults);
				}
				staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].dropdownTopTab = this.checked;
				if (JSON.stringify(staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) === JSON.stringify(staticRedditHeader.srh.ops.defaults)) {
					//if the option values for this reddit are the same as the default, we can remove them and rely on the defaults
					delete staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID];
				}				
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op5-tr";
			theLabel.innerHTML = "Add Top Tab";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);			

			//Option 6 - for this reddit			
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "moveStickyElement";
			theInputBtn.id = "srh-op6-tr";
			theInputBtn.checked = staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].moveStickyElement;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				if (!staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) {
					staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID] = staticRedditHeader.copyObject(staticRedditHeader.srh.ops.defaults);
				}
				staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID].moveStickyElement = this.checked;
				if (JSON.stringify(staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) === JSON.stringify(staticRedditHeader.srh.ops.defaults)) {
					//if the option values for this reddit are the same as the default, we can remove them and rely on the defaults
					delete staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID];
				}				
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op6-tr";
			theLabel.innerHTML = "Move Sticky Element";
			theOptionItem.className = "lastopt";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);			

			if (JSON.stringify(staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID]) === JSON.stringify(staticRedditHeader.srh.ops.defaults)) {
				//if the option values for this reddit are the same as the default, we can remove them and rely on the defaults
				delete staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID];
			}
		}

		
		//Default Title
		var defaultTitle = document.createElement("div");
		defaultTitle.innerHTML = "<b>Default Options</b>"
		theUI.appendChild(defaultTitle);

		//Option 1
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "staticHeaderDefault";
			theInputBtn.id = "srh-op1";
			theInputBtn.checked = staticRedditHeader.srh.ops.defaults.staticHeader;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				staticRedditHeader.srh.ops.defaults.staticHeader = this.checked;
				staticRedditHeader.consolidateRedditOptions();
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op1";
			theLabel.innerHTML = "Static Header";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);
//Option 7
			//Option 7 - for this reddit			
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "staticSideDefault";
			theInputBtn.id = "srh-op7";
			theInputBtn.checked = staticRedditHeader.srh.ops.defaults.staticSide;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				staticRedditHeader.srh.ops.defaults.staticSide = this.checked;
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op7";
			theLabel.innerHTML = "Static Side Bar";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);			
			
//Option 2
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "moveSubRedditsDefault";
			theInputBtn.id = "srh-op2";
			theInputBtn.checked = staticRedditHeader.srh.ops.defaults.moveSubReddits;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				staticRedditHeader.srh.ops.defaults.moveSubReddits = this.checked;
				staticRedditHeader.consolidateRedditOptions();
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op2";
			theLabel.innerHTML = "Move subReddits List";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);

//Option 3
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "addRisingTabDefault";
			theInputBtn.id = "srh-op3";
			theInputBtn.checked = staticRedditHeader.srh.ops.defaults.addRisingTab;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				staticRedditHeader.srh.ops.defaults.addRisingTab = this.checked;
				staticRedditHeader.consolidateRedditOptions();
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op3";
			theLabel.innerHTML = "Add Rising Tab";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);

//Option 4
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "addUserTabDefault";
			theInputBtn.id = "srh-op4";
			theInputBtn.checked = staticRedditHeader.srh.ops.defaults.addUserTab;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				staticRedditHeader.srh.ops.defaults.addUserTab = this.checked;
				staticRedditHeader.consolidateRedditOptions();
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op4";
			theLabel.innerHTML = "Add User Tab";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);

//Option 5
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "dropdownTopTabDefault";
			theInputBtn.id = "srh-op5";
			theInputBtn.checked = staticRedditHeader.srh.ops.defaults.dropdownTopTab;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				staticRedditHeader.srh.ops.defaults.dropdownTopTab = this.checked;
				staticRedditHeader.consolidateRedditOptions();
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op5";
			theLabel.innerHTML = "Add Top Tab";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);

//Option 6
			var theOptionItem = document.createElement("div");
			var theInputBtn = document.createElement("input");
			theInputBtn.type = "checkbox";
			theInputBtn.name = "srh-option";
			theInputBtn.value = "moveStickyElementDefault";
			theInputBtn.id = "srh-op6";
			theInputBtn.checked = staticRedditHeader.srh.ops.defaults.moveStickyElement;
			theInputBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				staticRedditHeader.srh.ops.defaults.moveStickyElement = this.checked;
				staticRedditHeader.consolidateRedditOptions();
				staticRedditHeader.writeStore();
				window.location.reload();
			}, false);
			theOptionItem.appendChild(theInputBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "srh-op6";
			theLabel.innerHTML = "Move Sticky Element";
			theOptionItem.appendChild(theLabel);
			theUI.appendChild(theOptionItem);
		
		// build up ui and append to the div
		document.body.appendChild(theUI);
		document.body.addEventListener('click', function () {
			document.getElementById('srhUI').style.display = "none";
		}, false);
		theUI.addEventListener('click', function(e) {
			document.getElementById('srhActions').style.display = "none";
			e.stopPropagation(); 
		}, false);

	},
	copyStyles: function (target, source) {
		var objT, objS;
		if (target != null && source != null) {
			target.style.cssText = window.getComputedStyle(source).cssText;
			objT = target.firstElementChild;
			objS = source.firstElementChild;
			this.copyStyles(objT, objS);
			this.copyStyles(target.nextElementSibling, source.nextElementSibling);
		}	
	},
	moveSticky: function () {
	//find sticky: find md, look for absolute positioned element.
		var objMD = document.getElementsByClassName('md')[0];
		if (typeof(objMD) == 'undefined') return;
		var objSticky = objMD.firstChild;
		var style = window.getComputedStyle(objSticky);
		while (objSticky && window.getComputedStyle(objSticky).position != "absolute") {
			objSticky = objSticky.nextElementSibling;
		}
		
		if (objSticky != null) {
			
			//copy sticky into new div
			var divStickyContainer = document.createElement('div');
			divStickyContainer.className = 'srhSticky';
			divStickyContainer.innerHTML = objSticky.outerHTML;
			//Copy style and remove unwanted properties
			divStickyContainer.firstElementChild.style.cssText = window.getComputedStyle(objSticky).cssText;
			divStickyContainer.firstElementChild.style.position = 'relative';
			divStickyContainer.firstElementChild.style.top = '0px';
			divStickyContainer.firstElementChild.style.left = '';
									
			//Copy styles of children
			this.copyStyles(divStickyContainer.firstElementChild.firstElementChild, objSticky.firstElementChild);
			
			//insert new div
			var objContent = document.getElementsByClassName("srhContent")[0];
			objContent = objContent.firstChild.nextSibling;
			objContent.style.paddingTop = "0px";
			objContent.insertBefore(divStickyContainer, objContent.firstChild);

			if (document.getElementById('siteTable').offsetTop - divStickyContainer.offsetTop - divStickyContainer.offsetHeight) {
				divStickyContainer.style.paddingBottom = "5px";
			}
			
			//remove old sticky
			objSticky.parentNode.removeChild(objSticky);
		}
	
	},
	displayHeaderHeight: function () {
		theHeader = document.getElementById("header");
		alert(theHeader.offsetHeight);
	},
	setSidePadding: function () {
		theHeader = document.getElementById("header");
		theSRHContent = document.getElementsByClassName("srhContent")[0];
		theSRHSide = document.getElementsByClassName('srhSide')[0];
		theSRHSidePaddingTop = parseInt(window.getComputedStyle(theSRHSide).paddingTop, 10);
		theSRHSide.style.height = window.innerHeight - theSRHSidePaddingTop - 20 - theHeader.offsetHeight + "px";
	},
	setPadding: function () {
		theHeader = document.getElementById("header");
		theSRHContent = document.getElementsByClassName("srhContent")[0];
		if (this.marginTop.get === true) {
			this.marginTop.value = parseInt(window.getComputedStyle(theSRHContent).marginTop, 10);
			this.marginTop.get = false;
		}
		var strStyle = new String(this.marginTop.value + theHeader.offsetHeight);
		this.addGlobalStyle('div.srhContent {margin-top:' + strStyle + 'px !important;}');
	},
	makeSideStatic: function () {
		this.addGlobalStyle('div.srhSide{position:fixed; right:0px; overflow-y: auto; max-height:95%; width: 320px; padding-right: 5px;}');
		theSide = document.getElementsByClassName("side")[0];
		if (typeof(theSide) != 'undefined') {
			this.addClass(theSide, "srhSide");
		}
		this.setSidePadding();
	},
	makeHeaderStatic: function () {
		this.addGlobalStyle('#header {width:100%; position:fixed; top:0px; min-height:44px;} .srhContent{margin: 7px 335px 0px 5px !important;}');
		
		theHeader = document.getElementById("header");
		theHeader.style.zIndex = 999;

		theSide = document.getElementsByClassName("side")[0];

		if (typeof(theSide) === 'undefined') {
			theContent = document.getElementsByClassName("content")[0];
			this.addClass(theContent, "srhContent");
		} else {
			obj = this.getNextSibling(theSide);
			while (!this.hasClass(obj, "content")) {
				obj = this.getNextSibling(obj);
			}
			theContent = obj;
			this.addClass(theContent, "srhContent");
		}
		this.setPadding();
		setTimeout(function () {staticRedditHeader.setPadding(); }, 1000); //because sometimes there needs to be a delay.
		setTimeout(function () {staticRedditHeader.setPadding(); }, 3000); //because sometimes there needs to be a delay.
		setTimeout(function () {staticRedditHeader.setPadding(); }, 6000); //because sometimes there needs to be a delay.
	},
	moveSubRedditDrop: function () {
		theSRHeader = document.getElementById("sr-header-area");
		allSRDrop = theSRHeader.getElementsByClassName("srdrop"); //0 is label, 1 is drop choices
		
		if (allSRDrop.length != 0) {
			this.addGlobalStyle('#header-bottom-left {float:left;} #header-bottom-right {float:right; position:relative; top:0px; bottom:auto; -moz-border-radius-topleft:0px; -webkit-border-top-left-radius:0px; -moz-border-radius-bottomleft: 7px;  -webkit-border-bottom-left-radius: 7px;} ');

			theSRHeader = theSRHeader.parentNode.removeChild(theSRHeader); //remove the sub-Reddit header

			theLabel = allSRDrop[0];
			theChoices = allSRDrop[1];
	
			headerleft = document.getElementById("header-bottom-left");
			headerright = this.getNextSibling(headerleft);
			headerright = headerright.parentNode.removeChild(headerright);
			newheaderright = headerleft.parentNode.insertBefore(headerright, headerleft);
			cleardiv = document.createElement("div");
			cleardiv.style.clear = "both";
			headerleft.parentNode.appendChild(cleardiv);
			
			var arrTabMenu = headerleft.getElementsByTagName("ul");
			var tabmenu;
			dropdownli = document.createElement("li");
			dropdownli.innerHTML = "<a class='srhTab' onclick='open_menu(this)'><span class='selected title'>"+theLabel.innerHTML+"</span></a>";
			dropdownli.appendChild(theChoices);

			if (typeof(arrTabMenu[0]) != 'undefined') {
				tabmenu = arrTabMenu[0];
			} else {
				tabmenu = document.createElement("ul");
				tabmenu.className = "tabmenu";
				headerleft.appendChild(tabmenu);
			}
			tabmenu.appendChild(dropdownli);			
		}
	},
	createRisingTab: function () {
		headerleft = document.getElementById("header-bottom-left");
		var arrTabMenu = headerleft.getElementsByClassName("tabmenu");
		var newTab;
		if (typeof(arrTabMenu[0]) != 'undefined') {
			tabmenu = arrTabMenu[0];
			var allLIs = tabmenu.getElementsByTagName("li");
			for (var iLI = 0; iLI < allLIs.length; iLI++) {
				if (allLIs[iLI].getElementsByTagName("a")[0].innerHTML === "new") {
					newTab = allLIs[iLI];
					iLI = allLIs.length;
				}
			}
			if (typeof(newTab) != "undefined") {		
				risingTab = document.createElement("li");
				risingTab.innerHTML = "<a href='"+ newTab.getElementsByTagName("a")[0].href +"?sort=rising'>rising</a>";
				newTab.parentNode.insertBefore(risingTab, this.getNextSibling(newTab));
			}
		}
	},
	createUserTab: function () {
		//remove std 'saved' tab
		headerleft = document.getElementById("header-bottom-left");
		var arrTabMenu = headerleft.getElementsByClassName("tabmenu");
		if (typeof(arrTabMenu[0]) != 'undefined') {
			tabmenu = arrTabMenu[0];
			var allLIs = tabmenu.getElementsByTagName("li");
			for (var iLI = 0; iLI < allLIs.length; iLI++) {
				if (allLIs[iLI].getElementsByTagName("a")[0].innerHTML === "saved") {
					tabmenu.removeChild(allLIs[iLI]);
				}
			}
		} else {
			var tabmenu = document.createElement("ul");
			tabmenu.className = "tabmenu";
			headerleft.appendChild(tabmenu);
		}
		//create user tab
		user = document.getElementsByClassName("user")[0];
		userTab = document.createElement("li");
		strUserPath = user.getElementsByTagName("a")[0].href;
		strUserName = user.getElementsByTagName("a")[0].innerHTML;
		strOverview = "<a href='"+strUserPath+"overview' class='choice'>overview</a>";
		strComments = "<a href='"+strUserPath+"comments' class='choice'>comments</a>";
		strSubmitted = "<a href='"+strUserPath+"submitted' class='choice'>submitted</a>";
		strSaved = "<a href='/saved/' class='choice'>saved</a>";
		strLiked = "<a href='"+strUserPath+"liked' class='choice'>liked</a>";
		strDisliked = "<a href='"+strUserPath+"disliked' class='choice'>disliked</a>";
		strHidden = "<a href='"+strUserPath+"hidden' class='choice'>hidden</a>";
		strFriends = "<a href='/prefs/friends/' class='choice'>friends</a>";
		strActivity = "<a href='/account-activity' class='choice'>activity</a>";
		userTab.innerHTML = "<a class='srhTab' onclick='open_menu(this)'><span class='selected title'>"+strUserName+"</span></a><div class='drop-choices tabdrop'>"+strActivity+strComments+strDisliked+strFriends+strHidden+strLiked+strOverview+strSaved+strSubmitted+"</div>";
		tabmenu.appendChild(userTab);
	},
	extendTopTab: function () {
		//remove std 'top' tab
		headerleft = document.getElementById("header-bottom-left");
		arrTabMenu = headerleft.getElementsByClassName("tabmenu");
		if (typeof(arrTabMenu[0]) != 'undefined') {
			tabmenu = arrTabMenu[0];
			var allLIs = tabmenu.getElementsByTagName("li");
			for (var iLI = 0; iLI < allLIs.length; iLI++) {
				if (allLIs[iLI].getElementsByTagName("a")[0].innerHTML === "top") {
					tabmenu.removeChild(allLIs[iLI]);
		
					//create top drop tab
					headerleft = document.getElementById("header-bottom-left");
					user = document.getElementsByClassName("user")[0];
					tabmenu = headerleft.getElementsByClassName("tabmenu")[0];
					userTab = document.createElement("li");
					strHour = "<a href='/top/?=all&t=hour' class='choice'>this hour</a>";
					strDay = "<a href='/top/?=all&t=day' class='choice'>today</a>";
					strWeek = "<a href='/top/?=all&t=week' class='choice'>this week</a>";
					strMonth = "<a href='/top/?=all&t=month' class='choice'>this month</a>";
					strYear = "<a href='/top/?=all&t=year' class='choice'>this year</a>";
					strAllTime = "<a href='/top/?=all&t=all' class='choice'>all time</a>";
					userTab.innerHTML = "<a class='srhTab' onclick='open_menu(this)'><span class='selected title'>top</span></a><div class='drop-choices tabdrop'>"+strHour+strDay+strWeek+strMonth+strYear+strAllTime+"</div>";
					tabmenu.appendChild(userTab);
				}
			}
		}
	},
	consolidateRedditOptions: function () {
		// for each reddit config in staticRedditHeader.srh.ops.reddits
		for (var reddit in staticRedditHeader.srh.ops.reddits)
		if (JSON.stringify(staticRedditHeader.srh.ops.reddits[reddit]) === JSON.stringify(staticRedditHeader.srh.ops.defaults)) {
			delete staticRedditHeader.srh.ops.reddits[reddit];
		}
	},
	hasClass : function(el, selector) {
		var className = " " + selector + " ";
		if (el && (" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
			return true;
		}
		return false;
	},
	removeClass : function(ele, cls) {
		if (this.hasClass(ele, cls)) {
			ele.className = ele.className.replace(cls, '');
			ele.className.replace(/ +/g, ' ');
		}
	},
	addClass : function(ele, cls) {
		if (!ele) return;
		// from http://userscripts.org/scripts/review/77390
		if (!this.hasClass(ele, cls)) ele.className += " " + cls;
		ele.className = ele.className.replace(/ +/g, ' ');
	},
	addGlobalStyle: function(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	},
	init: function() {
		this.addGlobalStyle(' \
			div.srhUI { display:none; z-index: 999; border:1px solid #5F99CF; position:fixed; background: white; padding:3px; width:150px; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px; \
			-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888;} \
			a.srhTab span img {margin-right: -5px; vertical-align:bottom; background: inherit !important;} a.srhTab span {zbackground:inherit !important; color:inherit !important; } \
			div.srhUI div {display: block; margin: 2px 0px 2px 5px;} \
			div.srhUI input {vertical-align:text-bottom; margin-right:5px;}\
			span.srhRedditOptionTitle {font-variant: small-caps; font-size: 1.5em; color: darkRed;}\
			div.lastopt {border-bottom: 1px solid grey; padding-bottom:3px;}');
		this.readStore();
		this.getCurrentRedditInfo();
		this.createUITab();

		if (this.strRedditID != "") {
			this.currentOptions = staticRedditHeader.srh.ops.reddits[staticRedditHeader.strRedditID] || staticRedditHeader.srh.ops.defaults;
		} else {
			this.currentOptions = staticRedditHeader.srh.ops.defaults;
		}
		
		if (this.currentOptions.dropdownTopTab == true) {
			this.extendTopTab();
		}
		if (this.currentOptions.moveSubReddits == true) {
			this.moveSubRedditDrop();
		}
		if (this.currentOptions.addRisingTab == true) {
			this.createRisingTab();
		}
		if (this.currentOptions.addUserTab == true) {
			this.createUserTab();
		}
		if (this.currentOptions.staticHeader == true) {
			this.makeHeaderStatic();
		}
		if (this.currentOptions.staticSide == true) {
			this.makeSideStatic();
		}		
		if (this.currentOptions.moveStickyElement == true) {
			this.moveSticky();
		}

		this.writeStore();
	}
}
document.addEventListener('load',staticRedditHeader.init(),true);
