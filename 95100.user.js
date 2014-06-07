// ==UserScript==
// @name		Reddit Username and ID Extractor
// @version		1.02
// @namespace	http://ictinus.com/ruid/
// @description	Provide an interface to all users on the current page showing their username and reddit id. For the purpose of creating custom CSS for Reddit.
// @include http://www.reddit.com/*
// ==/UserScript==

// Author: Ictinus
// Released: v1.00 22 January 2011
// Updated:  v1.02 23 January 2011, added 'clear users' button and shortened the ui.
// Updated:  v1.02 23 January 2011, added 'export' button and interface.

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
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(str){
    return (this.indexOf(str) === 0);
  }
}
var ruidExtractor = {
	version : "1.02",
	ruid : null,
	defaultJSON : {version: "1.02", filterText:"", fetch: false, users:{} },
	reqLimit : 20,
	reqDelay : 2000, // the minimum millisecond delay requested by Reddit
						// Admins
	subDelay : 2000, // the minimum millisecond delay for subscription
						// requests, since the standard reddit interface appears
						// to allow much faster than 2000 ms.
	fetchMyReddits : false, // fetch my subscribed reddits or reddits from
							// /r/all up to 'reqLimit' pages.
	readData : function() {
		var strJSON = window.localStorage.getItem("ruidExtractor");
		if (strJSON === null) {
			ruidExtractor.ruid = ruidExtractor.defaultJSON;
		} else {
  		ruidExtractor.ruid = JSON.parse(strJSON);
		}
	},
	writeData : function() {
		window.localStorage.setItem("ruidExtractor", JSON.stringify(ruidExtractor.ruid));
	},
	createUITab : function() {
		headerleft = document.getElementById("header-bottom-left");
		var arrTabMenu = headerleft.getElementsByClassName("tabmenu");
		var lastTab;
		if (typeof(arrTabMenu[0]) != 'undefined') {
			tabmenu = arrTabMenu[0];
			uiTab = document.createElement("li");		
			var theLink = document.createElement("a");
			theLink.id = "ruidTab";
			theLink.href = "#";
			theLink.innerHTML = "ruid";
			theLink.addEventListener('click', function (e) {
				e.stopPropagation();
				var theUI = document.getElementById("ruidUI");
				if (theUI.style.display === 'block') {
					theUI.style.display = 'none';
				} else {
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
			theUI.id = "ruidUI";
			theUI.className = "ruidUI";

			var theUIForm = document.createElement('form');
			theUIForm.id = "ruidForm";
			theUI.appendChild(theUIForm);

			var theTitlebar = document.createElement("div");
			theTitlebar.className = "ruidTitlebar";
			theTitlebar.innerHTML = "<div class='left'>User names and ids</div><div class='right' onclick='document.getElementById(\"ruidUI\").style.display = \"none\"'>&#215;</div>";

			theUIForm.appendChild(theTitlebar);

			// theFilter
			var theFilterSpan = document.createElement("span");
			theFilterSpan.className = "ruidClear";

			var theFilter = document.createElement("input");
			theFilter.id = "ruidFilter";
			theFilter.className = "ruidFilter";
			theFilter.value = ruidExtractor.ruid.filterText || "";
			theFilter.addEventListener('keyup', function() {
						ruidExtractor.ruid.filterText = this.value;
						ruidExtractor.writeData();
						ruidExtractor.filterDisplay();
					}, false);
			theFilterSpan.appendChild(theFilter);

			var theSpan = document.createElement("span");
			theSpan.className = "ruidFilterClearBtn2"
			theSpan.innerHTML = "&#8855;";
			theSpan.addEventListener('click', function(e) {
					e.stopPropagation();
					var input = this.previousSibling;
					input.value = '';
					input.focus();
					ruidExtractor.filterDisplay();
				}, false);
			theFilterSpan.appendChild(theSpan);

			var theSpan = document.createElement("span");
			theSpan.className = "ruidFilterOptionsBtn"
			theSpan.innerHTML = "&#9660;";
			theSpan.addEventListener('click', function(e) {
					e.stopPropagation();				
					var theFilterOptions = document.getElementById("ruidFilterOptions");
					if (theFilterOptions.style.display === "block") {
						theFilterOptions.style.display = "none";
					} else {
						var theTagUI = document.getElementById("ruidTagUI");
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
			theFilterOptions.id = "ruidFilterOptions";
			theFilterOptions.className = "ruidFilterOptions";

			// option Reddits
			var theFilterOptionItem = document.createElement("div");
			theFilterOptions.appendChild(theFilterOptionItem);

			var theRadioBtn = document.createElement("input");
			theRadioBtn.type = "radio";
			theRadioBtn.name = "ruidInputFilterOptions";
			theRadioBtn.value = "ruidFO2";
			theRadioBtn.id = "ruidFO2";
			theRadioBtn.checked = false;
			theRadioBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				setTimeout(function() {
					document.getElementById("ruidFilterOptions").style.display = "none";
					ruidExtractor.filterDisplay();
				}, 250);
			}, false);
			theFilterOptionItem.appendChild(theRadioBtn);

			var theLabel = document.createElement("label");
			theLabel.htmlFor = "ruidFO2";
			theLabel.innerHTML = "User names";
			theFilterOptionItem.appendChild(theLabel);
			theFilterOptions.appendChild(theFilterOptionItem);

			// option Reddit ids
			theFilterOptionItem = document.createElement("div");
			theFilterOptions.appendChild(theFilterOptionItem);

			theRadioBtn = document.createElement("input");
			theRadioBtn.type = "radio";
			theRadioBtn.name = "ruidInputFilterOptions";
			theRadioBtn.value = "ruidFO3";
			theRadioBtn.id = "ruidFO3";
			theRadioBtn.checked = false;
			theRadioBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				setTimeout(function() {
					document.getElementById("ruidFilterOptions").style.display = "none";
					ruidExtractor.filterDisplay();
				}, 250);
			}, false);
			theFilterOptionItem.appendChild(theRadioBtn);

			theLabel = document.createElement("label");
			theLabel.htmlFor = "ruidFO3";
			theLabel.innerHTML = "Reddit IDs";
			theFilterOptionItem.appendChild(theLabel);
			theFilterOptions.appendChild(theFilterOptionItem);

      // option Tags
      theFilterOptionItem = document.createElement("div");
      theFilterOptions.appendChild(theFilterOptionItem);

      theRadioBtn = document.createElement("input");
      theRadioBtn.type = "radio";
      theRadioBtn.name = "ruidInputFilterOptions";
      theRadioBtn.value = "ruidFO4";
      theRadioBtn.id = "ruidFO4";
      theRadioBtn.checked = false;
      theRadioBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        setTimeout(function() {
          document.getElementById("ruidFilterOptions").style.display = "none";
          ruidExtractor.filterDisplay();
        }, 250);
      }, false);
      theFilterOptionItem.appendChild(theRadioBtn);

      theLabel = document.createElement("label");
      theLabel.htmlFor = "ruidFO4";
      theLabel.innerHTML = "Tags";
      theFilterOptionItem.appendChild(theLabel);
      theFilterOptions.appendChild(theFilterOptionItem);

			// option All
			theFilterOptionItem = document.createElement("div");
			theFilterOptions.appendChild(theFilterOptionItem);

			theRadioBtn = document.createElement("input");
			theRadioBtn.type = "radio";
			theRadioBtn.name = "ruidInputFilterOptions";
			theRadioBtn.value = "ruidFO1";
			theRadioBtn.id = "ruidFO1";
			theRadioBtn.checked = true;
			theRadioBtn.addEventListener('click', function(e) {
				e.stopPropagation();
				setTimeout(function() {
					document.getElementById("ruidFilterOptions").style.display = "none";
					ruidExtractor.filterDisplay();
				}, 250);
			}, false);
			theFilterOptionItem.appendChild(theRadioBtn);

			theLabel = document.createElement("label");
			theLabel.htmlFor = "ruidFO1";
			theLabel.innerHTML = "All";
			theFilterOptionItem.appendChild(theLabel);
			theFilterOptions.appendChild(theFilterOptionItem);

			theUIForm.appendChild(theFilterOptions);

			// theBtns - Tags...
			var btn = document.createElement("span");
			btn.addEventListener('click', function(e) {
					e.stopPropagation();			
					var theFilterOptions = document.getElementById("ruidFilterOptions");
					theFilterOptions.style.display = "none";
					ruidExtractor.filterTagDisplay();
					var theTagUI = document.getElementById('ruidTagUI');
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
			btn.innerHTML = "tags...";
			btn.className = "ruidBtn";

			theUIForm.appendChild(btn);

      // theBtns - export
      btn = document.createElement("span");
      btn.addEventListener('click', function() {
            ruidExtractor.exportUsers();
          }, false);
      btn.innerHTML = "export";
      btn.className = "ruidBtn";
      theUIForm.appendChild(btn);

      // theBtns - scan users
      btn = document.createElement("span");
      btn.addEventListener('click', function() {
            ruidExtractor.slurpData();
          }, false);
      btn.innerHTML = "scan users";
      btn.className = "ruidBtn";
      theUIForm.appendChild(btn);

      // theBtns - clear users
      btn = document.createElement("span");
      btn.addEventListener('click', function() {
            ruidExtractor.clearUsers();
          }, false);
      btn.innerHTML = "clear users";
      btn.className = "ruidBtn";
      theUIForm.appendChild(btn);

			// theTagUI
			var theTagUI = document.createElement("div");
			theTagUI.id = "ruidTagUI";
			theTagUI.className = "ruidTagUI";
			// theTagTitlebar
			theTitlebar = document.createElement("div");
			theTitlebar.className = "ruidTitlebar";
			theTitlebar.innerHTML = "<div class='left'>Manage Tags</div><div class='right' onclick='document.getElementById(\"ruidTagUI\").style.display = \"none\"'>&#215;</div>";
			theTagUI.appendChild(theTitlebar);

			var theTagFilterSpan = document.createElement("span");
			theTagFilterSpan.className = "ruidClear";
			var theTagFilter = document.createElement("input");
			theTagFilter.id = "ruidTagFilter";
			theTagFilter.className = "ruidTagFilter";
			theTagFilter.addEventListener('keyup', function() {
						ruidExtractor.filterTagDisplay();
					}, false);
			var theSpan = document.createElement("span");
			theSpan.className = "ruidFilterClearBtn1";
			theSpan.innerHTML = "&#8855;";
			theSpan.addEventListener('click', function() {
						var input = this.previousSibling;
						input.value = '';
						input.focus();
						ruidExtractor.filterTagDisplay();
					}, false);
			theTagFilterSpan.appendChild(theTagFilter);
			theTagFilterSpan.appendChild(theSpan);
			theTagUI.appendChild(theTagFilterSpan);

			btn = document.createElement("span");
			btn.addEventListener('click', function() {
						ruidExtractor.test = "Add";
						ruidExtractor.addTag(document.getElementById("ruidTagFilter").value);
						ruidExtractor.filterTagDisplay();
					}, false);
			btn.innerHTML = "Add"; // "&#8853;";
			btn.className = "ruidBtn";
			theTagUI.appendChild(btn);

			btn = document.createElement("span");
			btn.addEventListener('click', function() {
						ruidExtractor.removeTag(document.getElementById("ruidTagFilter").value);
						ruidExtractor.filterTagDisplay();
					}, false);
			btn.innerHTML = "Remove"; // "&#8854;";
			btn.className = "ruidBtn";
			theTagUI.appendChild(btn);

			// theTagDisplay
			theHeader = document.createElement("div");
			theHeader.className = "ruidHeader";
			theHeader.innerHTML = "<span class='ruidCol3'>Tags</span><p class='ruidp'>";
			theTagUI.appendChild(theHeader);

			var theTagDisplay = document.createElement("div");
			theTagDisplay.id = "ruidTagDisplay";
			theTagDisplay.className = "ruidTagDisplay";
			theTagUI.appendChild(theTagDisplay);

			theTagUI.addEventListener('click', function(e) {
				e.stopPropagation();
			}, false);
			
			theUIForm.appendChild(theTagUI);

			// theDisplay
			var theHeader = document.createElement("div");
			theHeader.className = "ruidHeader";
			theHeader.innerHTML = "<span class='ruidCol1'><input type='checkbox' name='ruidSelectAll' id='ruidSelectAll'></input></span><span class='ruidCol2'>User names</span><span class='ruidCol3'>Reddit ids</span><span class='ruidCol4'>Tags</span><p class='ruidp'>";
			theUIForm.appendChild(theHeader);

			var theDisplay = document.createElement("div");
			theDisplay.id = "ruidDisplay";
			theDisplay.className = "ruidDisplay";
			theUIForm.appendChild(theDisplay);
			
			var theExport = document.createElement("div");
			theExport.id = "ruidExport";
			theExport.className = "ruidExport";
			var theInput = document.createElement("textarea");
		  theInput.id = "ruidExportData";
		  theInput.className = "ruidExportData";
		  
		  theExport.appendChild(theInput);
			theUIForm.appendChild(theExport);

			var theStatusBar = document.createElement("div");
			theStatusBar.id = "ruidStatusBar";
			theStatusBar.className = "ruidStatusBar";
			theUIForm.appendChild(theStatusBar);

			// build up ui and append to the div
			document.body.appendChild(theUI);
			document.getElementById("ruidSelectAll").addEventListener('click',
				function() {
					ruidExtractor.selectAll(this.checked)
				}, false);
			
			document.body.addEventListener('click', function () {
				document.getElementById("ruidFilterOptions").style.display = "none";
				document.getElementById("ruidUI").style.display = "none";
				document.getElementById("ruidTagUI").style.display = "none";
			}, false);			

			theUI.addEventListener('click', function(e) {
				e.stopPropagation();
				document.getElementById("ruidFilterOptions").style.display = "none";
				document.getElementById('ruidTagUI').style.display = "none";
			}, false);
					
			ruidExtractor.filterDisplay();
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
    return arrSorted.sort(ruidExtractor.alphaTagSortAscending);
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
	getSortedLabelArray : function(data) {
		var arrSorted = [];
		for (elm in data) {
			arrSorted.push({
						"id" : elm,
						"label" : data[elm].label,
						"tags" : data[elm].tags
					});
		}
		if (arrSorted != []) {
			return arrSorted.sort(ruidExtractor.alphaLabelSortAscending);
		} else {
			return [];
		}
	},
	getFilterOption : function() {
		var arrFilterOptions = document.getElementsByName("ruidInputFilterOptions");
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
		var ruidData = ruidExtractor.ruid;
		var theDisplay = document.getElementById("ruidDisplay");
		var strHTML = "";
		var strClass = "";
		var iRedditCount = 0;
		var iSubscribed = 0;
		var iFilterSub = 0;
		var iFilterTotal = 0;
		var strFilterLC = document.getElementById("ruidFilter").value.toLowerCase();
		var arrLabelSorted = ruidExtractor.getSortedLabelArray(ruidData.users);
		var strFilterOption = ruidExtractor.getFilterOption();
		theDisplay.innerHTML = "";
		for (var aReddit = 0, len = arrLabelSorted.length; aReddit < len; aReddit++) {
			var aRedditID = arrLabelSorted[aReddit].id;
			var aRedditLabel = arrLabelSorted[aReddit].label;
			var aRedditIds = arrLabelSorted[aReddit].id;
      var aRedditTags = arrLabelSorted[aReddit].tags;
				iSubscribed++;

 			switch (strFilterOption) {
				case "ruidFO1" : //All
					var bFilterCondition = (aRedditLabel.toLowerCase().indexOf(strFilterLC) >= 0
							| aRedditTags.toLowerCase().indexOf(strFilterLC) >= 0 | aRedditIds.toLowerCase().indexOf(strFilterLC) >= 0 | strFilterLC === "");
					break;
				case "ruidFO2" : //Label only
					var bFilterCondition = (aRedditLabel.toLowerCase().indexOf(strFilterLC) >= 0 | strFilterLC === "");
					break;
				case "ruidFO3" : //Reddit id only
					var bFilterCondition = (aRedditIds.toLowerCase().indexOf(strFilterLC) >= 0 | strFilterLC === "");
					break;
        case "ruidFO4" : //Tag only
          var bFilterCondition = (aRedditTags.toLowerCase().indexOf(strFilterLC) >= 0 | strFilterLC === "");
          break;
				default :
					var bFilterCondition = true;
			}

			if (bFilterCondition) {
				iFilterTotal++;
				idChecked = "ruidChecked" + iRedditCount;
				strClass = "ruidGreen";

				// row div
				var theRow = document.createElement("div");
				theRow.className = "ruidRow " + strClass;
				theRow.addEventListener('click', function(e) {
							e.stopPropagation();				
							var theInput = this.firstChild.firstChild;
							theInput.checked = !theInput.checked;
						}, false);
				// col1 / input
				var theCol1 = document.createElement("span");
				theCol1.className = "ruidCol1";
				var theInput = document.createElement("input");
				theInput.name = "ruidChecked";
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
				theCol2.className = "ruidCol2";
				theCol2.innerHTML = aRedditLabel;
				theRow.appendChild(theCol2);

				// col3 / reddit ids
				var theCol3 = document.createElement("span");
				theCol3.className = "ruidCol3";
				theCol3.innerHTML = aRedditIds;
				theRow.appendChild(theCol3);

        // col4 / tags
        var theCol4 = document.createElement("span");
        theCol4.className = "ruidCol4";
        theCol4.innerHTML = aRedditTags;
        theRow.appendChild(theCol4);

				// clear paragraph
				var theClearP = document.createElement("p");
				theClearP.className = "ruidp";
				theRow.appendChild(theClearP);

				theDisplay.appendChild(theRow);
			}
			iRedditCount++;
		}
		document.getElementById("ruidSelectAll").checked = false;
		ruidExtractor.updateStatusBar(iRedditCount, iSubscribed,
				iFilterTotal, iFilterSub);
	},
	filterTagDisplay : function() {
		var theTagDisplay = document.getElementById("ruidTagDisplay");
		var strFilterLC = document.getElementById("ruidTagFilter").value.toLowerCase();
		var arrTagSorted = ruidExtractor.getSortedTagArray(ruidExtractor.ruid.users);
		theTagDisplay.innerHTML = "";
		for (var iTag = 0, len = arrTagSorted.length; iTag < len; iTag++) {
			if (arrTagSorted[iTag].toLowerCase().indexOf(strFilterLC) >= 0
					| strFilterLC === "") {
				var theRow = document.createElement("div");
				theRow.className = "ruidRow";
				theRow.addEventListener('click', function() {
					document.getElementById("ruidTagFilter").value = this.firstChild.innerHTML;
					ruidExtractor.filterTagDisplay();
				}, false);
				var theTagSpan = document.createElement("span");
				theTagSpan.className = "ruidCol3";
				theTagSpan.innerHTML = arrTagSorted[iTag];
				theRow.appendChild(theTagSpan);
				var theClearP = document.createElement("p");
				theClearP.className = "ruidp";
				theRow.appendChild(theClearP);
				theTagDisplay.appendChild(theRow);
			}
		}
	},
  exportUsers : function() {
  	var strExportBefore = "";
    var strExportAfter = "";
    var arrExportBefore = [];
    var arrExportAfter = [];
    var ruidData = ruidExtractor.ruid;
    var theInputs = document.getElementsByName("ruidChecked");
    for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
      if (theInputs[iInput].checked === true) {
        arrExportBefore.push("." + theInputs[iInput].value + ":before");
        arrExportAfter.push("." + theInputs[iInput].value + ":after");
      }
    }
    var theExportData = document.getElementById("ruidExportData");
    theExportData.innerHTML = arrExportBefore.toString(",") + "\n" + arrExportAfter.toString(",")
    theExportData.select(); 
  },
  clearUsers : function() {
    var ruidData = ruidExtractor.ruid;
    var theInputs = document.getElementsByName("ruidChecked");
    for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
      if (theInputs[iInput].checked === true) {
        delete ruidData.users[theInputs[iInput].value];
      }
    }
    ruidExtractor.writeData();
    ruidExtractor.filterDisplay();
  },
	viewReddit : function(e) {
		var ruidData = ruidExtractor.ruid;
		var strReddits = "";
		var strURL = "";
		var theInputs = document.getElementsByName("ruidChecked");
		for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
			if (theInputs[iInput].checked === true) {
				strReddits = ruidData.users[theInputs[iInput].value].label + "+" + strReddits;
			}
		}
		if (strReddits === "") {
			strReddits = document.getElementById("ruidFilter").value;
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
		var theInputs = document.getElementsByName("ruidChecked");
		for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
			theInputs[iInput].checked = bOnOff;
		}
	},
	updateStatusBar : function(iTotal, iSubs, iFilterTotal, iFilterSub) {
		var theStatusBar = document.getElementById("ruidStatusBar");
		theStatusBar.innerHTML = "Users names: " + iTotal;
		if (iFilterTotal != iTotal) {
			theStatusBar.innerHTML += ", Filtered: " + iFilterTotal;
		}
	},
	refreshDisplay : function(bSelectedOnly) {
		// for each entry in the display, read the stored infomation and update
		// subscription status; tags; label
		var ruidData = ruidExtractor.ruid;
		var strClass = "";
		var theRow = null;
		var theLabel = null;
		var theTags = null;
		var theRedditId = null;
		var theInputs = document.getElementsByName("ruidChecked");
		for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
			if ((!bSelectedOnly) || (bSelectedOnly && theInputs[iInput].checked === true)) {
				theRow = theInputs[iInput].parentNode.parentNode;
				theLabel = theRow.firstChild.nextSibling;
				theRedditId = theLabel.nextSibling;
				theTags = theRedditId.nextSibling;
				strClass = "ruidGreen";
				theRow.className = "ruidRow " + strClass;
				theLabel.innerHTML = ruidData.users[theInputs[iInput].value].label;
        theRedditId.innerHTML = theInputs[iInput].value;
				theTags.innerHTML = ruidData.users[theInputs[iInput].value].tags;
			}
		}
	},
	addTag : function(tag) {
		if (tag != "") {
			var ruidData = ruidExtractor.ruid;
			var arrTags = [];
			var iTagPos = -1;
			var strTags = "";
			var theInputs = document.getElementsByName("ruidChecked");
			for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
				if (theInputs[iInput].checked === true) {
					strTags = ruidData.users[theInputs[iInput].value].tags;
					if (strTags != "") {
						arrTags = strTags.split(",");
					} else {
						arrTags = [];
					}
					iTagPos = arrTags.contains(tag);
					if (iTagPos === -1) {
						arrTags.push(tag);
						ruidData.users[theInputs[iInput].value].tags = arrTags.join(",");
					}
				}
			}
			ruidExtractor.writeData();
			ruidExtractor.refreshDisplay(true);
		}
	},
	removeTag : function(tag) {
		if (tag != "") {
			var ruidData = ruidExtractor.ruid;
			var arrTags = [];
			var iTagPos = -1;
			var theInputs = document.getElementsByName("ruidChecked");
			for (var iInput = 0, len = theInputs.length; iInput < len; iInput++) {
				if (theInputs[iInput].checked === true) {
					arrTags = ruidData.users[theInputs[iInput].value].tags.split(",");
					iTagPos = arrTags.contains(tag);
					if (iTagPos != -1) {
						arrTags.remove(iTagPos);
						ruidData.users[theInputs[iInput].value].tags = arrTags.join(",");
					}
				}
			}
			ruidExtractor.writeData();
			ruidExtractor.refreshDisplay(true);
		}
	},
	fetch : function () {
		
		
	},
	update : function(bSubscribed) {
		// parse json data and populate local storage
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				var ruidData = ruidExtractor.ruid;
				var response = xhr.responseText;
				var subredditsJSON = JSON.parse(response);
				var subRedditsJSONData = subredditsJSON.data;
				var subRedditsJSONDataChildren = subRedditsJSONData.children;

				if (subRedditsJSONDataChildren.length != 0) {
					for (var iSubReddit = 0, len = subRedditsJSONDataChildren.length; iSubReddit < len; iSubReddit++) {
						thisSubReddit = subRedditsJSONDataChildren[iSubReddit];
						if (thisSubReddit.data.name != null) {
							if (bSubscribed === true) {
								ruidData.subscribed[thisSubReddit.data.name] = thisSubReddit.data.display_name;
							}
							var strTag = (thisSubReddit.data.over18)
									? "NSFW"
									: "";
							ruidData.users[thisSubReddit.data.name] = {
								"label" : thisSubReddit.data.display_name,
								"tags" : strTag
							};
						}
					}

					// write to local storage
					ruidExtractor.writeData();
					ruidExtractor.filterDisplay();
					// we've processed a page, now look for the next and request it.
					if (subRedditsJSONData.after != null) {
						// get the next page
						if (bSubscribed) {
							ruidData.nextSubFetch = subRedditsJSONData.after;
						} else {
							ruidData.nextUnSubFetch = subRedditsJSONData.after;
						}
						ruidExtractor.writeData();
						ruidExtractor.fetch(bSubscribed, false); // false to enforce delay
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
			var bSubscribed = ((ruidExtractor.hasClass(objLink, "active") && ruidExtractor.hasClass(objLink, "remove")) ||
				 (ruidExtractor.hasClass(objLink.nextSibling, "active") && ruidExtractor.hasClass(objLink.nextSibling, "remove")));

			if (strRedditID != "") {
				if (!ruidExtractor.hasClass(objLink, "ruid")) { // only do this once
					objLink.onclick = null;
					objLink.addEventListener('click', function() {
								ruidExtractor.subOverride(this);
							}, false);

					objLink.nextSibling.onclick = null;
					objLink.nextSibling.addEventListener('click', function() {
								ruidExtractor.subOverride(this);
							}, false);

					ruidExtractor.addClass(objLink, "ruid");
				}

				if (typeof(ruidExtractor.ruid.users[strRedditID]) === 'undefined') {
					// this is a previously unknown reddit, but we know it now.
					// TODO determine over18 status and populate tag
					ruidExtractor.ruid.users[strRedditID] = {
						"label" : strRedditName,
						"tags" : ""
					};
				}
				if (bSubscribed) {
					ruidExtractor.ruid.subscribed[strRedditID] = strRedditName;
				} else {
					delete ruidExtractor.ruid.subscribed[strRedditID];
				}

				ruidExtractor.writeData();
				ruidExtractor.filterDisplay();
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
				var bSubscribed = ((ruidExtractor
						.hasClass(objLink, "active") && ruidExtractor
						.hasClass(objLink, "remove")) || (ruidExtractor
						.hasClass(objLink.nextSibling, "active") && ruidExtractor
						.hasClass(objLink.nextSibling, "remove")));

				if (strRedditID != "") {
					if (!ruidExtractor.hasClass(objLink, "ruid")) { // only do this once per page so multiple EventListeners aren't created
						objLink.onclick = null;
						objLink.addEventListener('click', function() {
									ruidExtractor.subOverride(this);
								}, false);

						objLink.nextSibling.onclick = null;
						objLink.nextSibling.addEventListener('click',
								function() {
									ruidExtractor.subOverride(this);
								}, false);

						ruidExtractor.addClass(objLink, "ruid");
					}
					if (typeof(ruidExtractor.ruid.users[strRedditID]) === 'undefined') {
						// this is a previously unknown reddit, but we know it
						// now.
						// TODO determine over18 status and populate tag
						ruidExtractor.ruid.users[strRedditID] = {
							"label" : strRedditName,
							"tags" : ""
						};
					}
					if (bSubscribed) {
						ruidExtractor.ruid.subscribed[strRedditID] = strRedditName;
					} else {
						delete ruidExtractor.ruid.subscribed[strRedditID];
					}
				}
			}
			ruidExtractor.writeData();
			ruidExtractor.filterDisplay();
		}
	},
	slurpData : function() {
		// grab any users we can find on the page
		  var theLink, userName, arrClasses;
		  var strRedditName = "";
		  var arrRedditNames = document.getElementsByClassName("redditname");
		  if (arrRedditNames && arrRedditNames[0]) {
		  	strRedditName = arrRedditNames[0].firstChild.innerHTML;
		  }
      var arrAuthors = document.getElementsByClassName("author");
      if (arrAuthors) {
        for (var iAuthor = 0, alen=arrAuthors.length; iAuthor < alen; iAuthor++) { //for each author
          theLink = arrAuthors[iAuthor];
          userName = theLink.innerHTML;
          arrClasses = theLink.className.split(" ");
          for (var iClass = 0, clen=arrClasses.length; iClass < clen; iClass++) {
            if (arrClasses[iClass].startsWith("id-")) { //find the id class of the link tag
            	if (ruidExtractor.ruid.users[arrClasses[iClass]]) {
            		var arrTags = ruidExtractor.ruid.users[arrClasses[iClass]].tags.split(",");
            		if (-1 === arrTags.contains(strRedditName)) {
            			arrTags.push(strRedditName);
              		ruidExtractor.ruid.users[arrClasses[iClass]] = {"label": userName, "tags":arrTags.join(",")};
            		}
            	} else {
            		ruidExtractor.ruid.users[arrClasses[iClass]] = {"label": userName, "tags":strRedditName};
            	}
              iClass = clen;
            }    	
          }
        }
      }
			ruidExtractor.writeData();
			ruidExtractor.filterDisplay();
	},
	hasClass : function(el, selector) {
		var className = " " + selector + " ";
		if ((" " + el.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1) {
			return true;
		}
		return false;
	},
	removeClass : function(ele, cls) {
		if (ruidExtractor.hasClass(ele, cls)) {
			ele.className = ele.className.replace(cls, '');
			ele.className.replace(/ +/g, ' ');
		}
	},
	addClass : function(ele, cls) {
		// from http://userscripts.org/scripts/review/77390
		if (!ruidExtractor.hasClass(ele, cls)) ele.className += " " + cls;
		ele.className = ele.className.replace(/ +/g, ' ');
	},
	init : function() {
		ruidExtractor.readData();
		ruidExtractor.createUITab();
		if (ruidExtractor.ruid.fetch === true) {
      ruidExtractor.slurpData();
   		ruidExtractor.writeData();
		}
		return false;
	}
}

if (document.body) {
		ruidExtractor.readData();
		ruidExtractor.addGlobalStyle(' \
		div.ruidUI { display:none; border:1px solid #5F99CF; position:fixed; background: white; padding:3px; width:500px; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px;  \
			-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888;} \
		div.ruidHeader {background:#888; color:#FFF; border:1px sold #888; margin-top:4px; padding: 0px 0px 1px 3px;} \
		div.ruidTitlebar {padding: 2px 4px; margin-bottom:4px; width:auto; background: #CEE3F8; height:2em; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
		border-bottom-right-radius: 4px; \
		border-bottom-left-radius: 4px;  } \
		div.ruidTagTitlebar {height:1em;} \
		div.ruidTitlebar div.left{text-align:left; font-size:1.5em; float:left;} \
		div.ruidTitlebar div.right{text-align:right; font-size:1.5em; cursor:pointer; width:1.5em; float:right;} \
		div.ruidTitlebar div.right:hover {color:orangeRed; } \
		span.ruidClear input.ruidFilter {width:10em; padding-right: 32px; } \
		span.ruidClear input.ruidTagFilter {width:7em; padding-right: 16px; } \
		div.ruidFilterOptions{display:none; border:1px solid #5F99CF; position:absolute; background: white; padding:3px; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
		border-bottom-right-radius: 4px; \
		border-bottom-left-radius: 4px;  \
			-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888;} \
		div.ruidFilterOptions div input {vertical-align:bottom;} \
		div.ruidTagUI {display:none; border:1px solid #5F99CF; position:absolute; background: white; padding:3px; opacity:0.5; -moz-opacity:0.5; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
		border-bottom-right-radius: 4px; \
		border-bottom-left-radius: 4px;  \
		-moz-box-shadow: 1px 3px 12px #888; -webkit-box-shadow: 1px 3px 12px #888; box-shadow: 1px 3px 12px #888; } \
		div.ruidTagUI:hover { opacity:1; -moz-opacity:1; } \
		div.ruidDisplay, div.ruidTagDisplay {border:1px solid #5F99CF; border-top:none; min-height:10em; max-height:25em; overflow-y: scroll; overflow-x: auto; \
			-webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px;  } \
		div.ruidRow { border-top:1px solid #FFF; border-bottom:1px solid #FFF; padding-left:3px;} \
		div.ruidRow:hover { border-top:1px solid #CCC; border-bottom:1px solid #CCC; } \
		div.ruidGreen { color:green; } \
		div.ruidRed { color:red; } \
		div.ruidStatusBar { margin-top: 2px; } \
		span.ruidCol1{width:2em; float:left;} span.ruidCol2 {cursor:default; width: 15em; float:left} span.ruidCol3 {cursor:default; width:8em; float:left} span.ruidCol4 {cursor:default; float:left} p.ruidp{clear:both;} span.ruidCol1 input{margin:0px;} \
		span.ruidBtn { -webkit-border-bottom-right-radius: 4px; \
			-webkit-border-bottom-left-radius: 4px; \
			-moz-border-radius-bottomright: 4px; \
			-moz-border-radius-bottomleft: 4px; \
			border-bottom-right-radius: 4px; \
			border-bottom-left-radius: 4px; \
			border: 1px solid #5F99CF; \
			margin: 0px 0px 0px 5px;\
			padding: 2px; \
			background: -moz-linear-gradient(top, #fcfff4 0%, #dfe5d7 40%, #CCC 100%); \
			background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fcfff4), color-stop(40%,#dfe5d7), color-stop(100%,#CCC)); \
		} \
		span.ruidBtn:hover {background: #dfe5d7; cursor:pointer;} \
		span.ruidClear { position: relative; } \
		span.ruidClear span.ruidFilterClearBtn2 { \
			position: absolute; \
			display: block; \
			top: -5px; \
			right: 16px; \
			width: 16px; \
			cursor: pointer; \
			font-size:1.6em; \
			color: grey; \
		} \
		span.ruidClear span.ruidFilterClearBtn1 { \
			position: absolute; \
			display: block; \
			top: -5px; \
			right: 0px; \
			width: 16px; \
			cursor: pointer; \
			font-size:1.6em; \
			color: grey; \
		} \
		span.ruidClear span.ruidFilterOptionsBtn { \
			position: absolute; \
			display: block; \
			top: -4px; \
			right: 0px; \
			width: 16px; \
			cursor: pointer; \
			font-size:1.4em; \
			color: grey; \
		} \
		span.ruidClear span:hover { color: orangeRed } \
		span.ruidCancel { display:none; color:red; font-size:0.8em; cursor:pointer;} \
		div.ruidTopBorder { border-top: 1px solid grey; padding-top: 2px; margin-top: 5px; } \
    div.ruidExport { margin: 2px 5px 0px 0px;} \
    div.ruidExport textarea { height:3em; width:100%; border-color:#5F99CF;} \
    ');

		ruidExtractor.init();
}
