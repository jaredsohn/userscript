// ==UserScript==
// @name        What.CD :: Collage Building Helper
// @author      Z4ppy
// @namespace   Z4ppy.What.CD
// @description Make it easier to build your collage.
// @include     https://*what.cd/torrents.php*
// @include     https://*what.cd/collages.php*
// @include     https://*what.cd/collage.php*
// @include     https://*what.cd/artist.php*
// @include     https://*what.cd/bookmarks.php*
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @grant       GM_xmlhttpRequest
// @updateURL   http://userscripts.org/scripts/source/142458.meta.js
// @version     1.0.1
// @date        2013-03-05
// ==/UserScript==

// Changelog can be found at https://userscripts.org/topics/118127

var collageID, collName;
// Momenticons: http://findicons.com/icon/263495/folder_open_add
var ICON_ADD = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACmUlEQVR4nIWRS0hVURSGv33Ovp57j0oqV7Qkil5mEwNDKoILikQjg6Jykg0qIrIkwkySbOANahBYCj0oigoLCyxqpFRIUHTLHlb0tCJTTK2b9+HjnLMbHDOjsjXca+1vfaxfKKVoOTUz/01X9N7IcBQAw5uMIWMFGyoHb/KfEsdqfGtT/HMb16xaCdHngILEbC5dvsrAlzdFW2riLZMCjtdmqk2l61H9t0BZgAPCQKQu5UxjE+Fw3/iwLr1k+FN9q7e9Hfr5JuOxMERegh0HoSN0AWoYwm2UFueCNNxJI5OO1zYfX7eKiQYSAMdGKRvLcjh7rZPYsBprP/ubdaxurwmApusfxgCjaFjcbu+ndONJpPMJhQ1MXOagCQVCgPJA2iKOHij56AJsBysWQU8rwjPchoo8RCg14bMABEoIUAphzuTtg26SszJ3ugAsbj+OEChejDNwEWVFQGhuSynQvOjmbPDNB6FD0ixaL1Tc3VzdFXIBQ1FsfwEy1o4T63PFhZsoykIz02joinDgfT0CRWnKEraXXAyOH/FWRz+BwCrUl3MwEgc0lyAT0BIyICmPnr4eqgM7kB548qjje/qcZRaQKQFsXzZG9D5WtMdVdlNHmnNp+Kpz5Ml5wqMRtqabSAmXum+YN05nXS5buKtJHN7jVeVlJ6D3Cox8++UuJGSsYHpLkOpAOb3RTtq7WvEmQv6MIqYmz2B382GklB7q6jf/LW9SprxD+B10zUbXwPCBYehIXSAlCARC/RbXHzXv0P3g/hMd9cWDo4MJlcvX6bqE4PVGO8mTPFK2cFfTpIBXn1t986YVpgB5++5UHVywwMyRmuDps+iLmqXBCmAsxn+tn1YYB+JAyG+mhyqba3NAsDO3KgSEgJ4f88//Bf3Zb/0AAAAASUVORK5CYII=';
// Yusuke Kamiyamane: http://findicons.com/icon/118036/cross
var ICON_ERR = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAX5JREFUeNrEU71OwlAUPrVqrDFBHsARX6AJri4kJSEyEBMHggkLK8EEFsauvoPo4iN04gkgLiYOOBHUxDSUCBO0XL9z7a1t1YnBJl967/l+enIOaEII2uTZog2fbXW41zTSiSwcbaAbEDl+TJTmLsLO4x1YIOzzTscMvoRWmjtrNn9yPAPGHdFg3W6Lx1JJLFstwXfACjF4r9clN6lWJad8UUAPwhsQXqMh+vm8eK3VBN8ZT+WyrA0LBVljrfJpags9zMBnAi2eVirm82hEmUyGFosFvUwmZBgGzcfjoYYZYCbOZehLBKzwDsKQo1zOnLqu5HRdpw/XlWYM09lBTQVEW3gDdsMChLSazWhfkUEgw9nCm1n+9TuAwILAPs5mTcP36QA1Ba4xJ5LbSa4RX7FPIFSmB88bMtSduVVqjVEAE8WYuQ8jvthl9GMhxe+QZMAcwlsI93DmN9/RrsP4jVO+aAtX2IKH1tZIR2o3C+NhKJoBae46vcZ/+zd+CjAAN5vaL1x3kMMAAAAASUVORK5CYII=';
// Yusuke Kamiyamane: http://findicons.com/icon/119015/tick
var ICON_OK = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAehJREFUeNpi/P//PwMlgImBQsACIhhnCAFZjEAGkANy0B8gwQ00m5kRogpEMYHl5YF4LZBXw/D3/47/Ea/xuOD7PwaGX1AMMvDvfwGGf/8nprkkGQPZLUAVHqR4gY3hH0Ofoby+6ZcvXxjinWL0Gf4wtMC9QAAwAjXXK0jIO8gLyUl9/Pzx98Fjh24AXdOA7gIPoP/PwJwGdvoPoNP/MGQIcwkGq4mrKHz5+uXf0UtH7wBdMRGodgvCgP9ATX/+tyT5JxqCaDAfIu7DwcSWJckjqfzgwQOGU5dP3f3w4cNSoJq5DL//I0Xjn38tMX4xes+ePWOK8IowAPGBmnNZ/jPVS4vLqH7985Xl5YcXDz99+rAJGIDtQAxxIcKA/zVLViy8xM7J9uvU7VPMDnaOOkAb4sVkxTV+sPxgf/fhzdOP797vZ/gLjD4Ghn8oAQRKiYx9/AxADaAwaDF2NtN6+vMZpwCnAMP7b+8Zfrz49vrj3fdHGJgZkhhYmT4wsELTC8iHWe+RAvE/ww6g02vO7jhxjfkv49fXjK8Zvn/5+uHTzXcXgSGeC1TxAWdKRDHk81+Gp5vutnCZ8Mt8v/DpDtCBeUBrnuJNyigAmEQZ3v9h+LbzTQsw+ZYwCLJcBydjXIlkwHMjQIABAIHQ3hY9qLekAAAAAElFTkSuQmCC';
// ajaxload.info
var ICON_LOADING = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==';

var torrentCache = {
	Cache: [],
	GM_read: function () {
		this.clear();
		this.Cache = JSON.parse(GM_getValue('torrentCache', '[]'));
		return this.Cache.length;
	},
	GM_save: function () {
		return GM_setValue('torrentCache', JSON.stringify(this.Cache));
	},
	GM_delete: function () {
		GM_deleteValue('torrentCache');
	},
	add: function (torrentgroupid) {
		if (this.Cache.indexOf(torrentgroupid) != -1) {
			return false;
		}
		this.Cache.push(torrentgroupid);
		return true;
	},
	contains: function (torrentgroupid) {
		return (this.Cache.indexOf(torrentgroupid) != -1);
	},
	remove: function (torrentgroupid) {
		if (this.Cache.indexOf(torrentgroupid) == -1) {
			return false;
		}
		this.Cache.splice(this.Cache.indexOf(torrentgroupid), 1);
		return true;
	},
	clear: function () {
		this.Cache.length = 0;
	}
}

var URL = new Object();
function parseURL() {
	var URLArr = document.URL.match(/^(https:\/\/(?:ssl\.)?what\.cd)\/([\w\/\.]+?)(\?(.*?))?(#.*)?$/);
	URL.Host = URLArr[1]; //protocol + hostname, eg. https://what.cd
	URL.Path = URLArr[2];
	URL.Hash = URLArr[5];
	URL.Parameters = new Object();
	if (typeof URLArr[4] != 'undefined') {
		var URLPArr = URLArr[4].split('&'); //URL parameter array
		var tmpP; //temporary Parameter
		for (var i = 0; i < URLPArr.length; ++i) {
			tmpP = URLPArr[i].split('=');
			URL.Parameters[tmpP[0]] = tmpP[1];
		}
	}
}

function init() {
	parseURL();

	getCollageID();

	torrentCache.GM_read();

	// putting the add image on various pages (with an active collage)
	// $.inArray(URL.Path, ['torrents.php', 'artist.php'])
	if ((URL.Path == 'torrents.php' || URL.Path == 'artist.php' || URL.Path == 'bookmarks.php' || URL.Path == 'collages.php') && (collageID != 0)) {
		if (URL.Path == 'torrents.php' && URL.Parameters['id']) {
			//torrent group page
			var title = document.getElementById('content').getElementsByTagName('h2')[0];
			title.insertBefore(document.createTextNode(' '), null);
			title.insertBefore(createAddIcon(URL.Host + '/torrents.php?id=' + URL.Parameters['id'], URL.Parameters['id']), null);
		} else {
			var tableId = '';
			if (URL.Path == 'torrents.php' && (URL.Parameters['type'] || URL.Parameters['action'] == 'notify')) {
				// user uploaded/snatched/etc and notifications
				tableId = 'content';
			} else if (URL.Path == 'artist.php' || (URL.Path == 'collages.php' && URL.Parameters['id'] && URL.Parameters['id'] != collageID)) {
				// artist page; other collages
				tableId = 'discog_table';
			} else if (URL.Path == 'torrents.php' || URL.Path == 'bookmarks.php') {
				// search page; bookmarks
				tableId = 'torrent_table';
			}

			if (tableId != '') {
				var linkArr = extractTorrentgroupLinks(tableId);
				for (var i = 0; i < linkArr.length; ++i) {
					linkArr[i].parentNode.insertBefore(document.createTextNode(' '), linkArr[i].parentNode.firstChild);
					linkArr[i].parentNode.insertBefore(createAddIcon(linkArr[i].href, linkArr[i].getAttribute('torrentgroupid')), linkArr[i].parentNode.firstChild);
				}
			}
		}
	}
	
	if (URL.Path == 'collages.php' && URL.Parameters['id'] && !URL.Parameters['action']) {
		var currentCollURL = URL.Parameters['id'];

		var cx = document.getElementsByTagName('h2')[0];

		if (collageID != 0 && collageID != currentCollURL) {
			// if there is an active collage & the active collage is different than current page, use name + link
			cx.parentNode.innerHTML = "\<h3\>The active collage is: \<a href\=\"" + URL.Host + "\/collages.php\?id\=" + collageID + "\"\>" + collName + "\<\/a\>" + cx.parentNode.innerHTML;
		} else {
			// else just display name
			cx.parentNode.innerHTML = "\<h3\>The active collage is: " + collName + cx.parentNode.innerHTML;
		}

		var jx = document.getElementsByTagName('h2')[0];

		// display "Make This Active Collage!"
		if (currentCollURL != collageID) {
			//standard collage pages
			var collageLink = document.createElement('a');
			collageLink.href = '#';
			collageLink.textContent = 'Make this the active collage';
			collageLink.setAttribute('collage-id', currentCollURL);
			collageLink.setAttribute('collage-name', jx.innerHTML);
			collageLink.className = 'brackets';
			collageLink.style.marginRight = '10px';
			collageLink.addEventListener('click', function(e) { setCollageID(e.target); return false; }, false);
			jx.parentNode.insertBefore(collageLink, jx);
		}

		// display "Remove Active Collage"
		if (collageID != 0) {
			var removeActColl = document.createElement('a');
			removeActColl.href = '#';
			removeActColl.textContent = 'Remove the active collage';
			removeActColl.setAttribute('collage-id', '0');
			removeActColl.className = 'brackets';
			removeActColl.addEventListener('click', function(e) { setCollageID(e.target); return false; }, false);
			jx.parentNode.insertBefore(removeActColl, jx);
		}

		// cache the current contents of the active collage
		if (currentCollURL == collageID) {
			var linkArr = extractTorrentgroupLinks('discog_table');
			torrentCache.clear();
			for (var i = 0; i < linkArr.length; ++i) {
				torrentCache.add(linkArr[i].getAttribute('torrentgroupid'));
			}
			torrentCache.GM_save();
		}
	} else if (URL.Path == 'collages.php' && URL.Parameters['collageid'] && URL.Parameters['action'] == 'manage') {
		manageStuff();
	}
}

function extractTorrentgroupLinks(tableId) {
	var linkArr = new Array();

	if (document.getElementById(tableId) != null) {
		var lx = document.getElementById(tableId).getElementsByTagName('a');
		if (typeof lx != 'undefined') {
			var curTorrID = '0';
			for (var i = 0; i < lx.length; ++i) {
				match = /torrents\.php\?id=(\d+)/.exec(lx[i].href);
		   		if (match != null && match[1] != curTorrID) {
					lx[i].setAttribute('torrentgroupid', match[1]);
					linkArr.push(lx[i]);
					curTorrID = match[1];
		   		}
		   	}
		}
	}

	return linkArr;
}

function createAddIcon(torrent_url, torrentgroupid) {
	var res = document.createElement('img');
	res.setAttribute('torrent-url', torrent_url);
	res.setAttribute('torrentgroupid', torrentgroupid);
	updateAddIcon(res);
	res.addEventListener('click', image_click, false);
	return res;
}

function updateAddIcon(img) {
	if (torrentCache.contains(img.getAttribute('torrentgroupid'))) {
		img.src = ICON_OK;
		img.title = 'Remove from collage "' + collName + '"...';
	} else {
		img.src = ICON_ADD;
		img.title = 'Add to collage "' + collName + '"...';
	}
}

function manageStuff() {
	var authKey = findAuthKey();
	
	var activeCollageID = URL.Parameters['collageid'];
	var allGroupNumbers=new Array();
	var allNewSortNumbers=new Array();
	var allOrigSortNumbers=new Array();
	var isUpdated = 0;

	//get initial group numbers
	var jx = document.getElementsByName('groupid');
	for (var i = 0;i < jx.length; ++i) {
		allGroupNumbers[i]=parseInt(jx[i].value);
	}
	
	//get initial group sort numbers
	var kx = document.getElementsByName('sort');
	for (var i = 0; i < kx.length; ++i) {
		allOrigSortNumbers[i]=parseInt(kx[i].value);
	}
	
	var editAllButton = document.createElement('input');
	editAllButton.type = 'button';
	editAllButton.value = 'Edit All';
	
	var zx = document.getElementById('content').getElementsByTagName('h2')[0];
	zx.parentNode.insertBefore(editAllButton, zx);
	
	//edit all button
	editAllButton.addEventListener("click", function(){
		var mx = document.getElementsByName('sort');
		var i = 0;
		isUpdated = 1;
		editAllButton.value = 'Updating...';
		
		for (i = 0; i < mx.length; ++i) {
			allNewSortNumbers[i]=parseInt(mx[i].value);
			
			//only update new numbers
			if (allNewSortNumbers[i] != allOrigSortNumbers[i]) {
				GM_xmlhttpRequest({
					method: "POST",
					url: URL.Host + "/collages.php",
					data: "action=manage_handle&auth=" + authKey + "&collageid=" + activeCollageID + "&groupid=" + allGroupNumbers[i] + "&sort=" + allNewSortNumbers[i],
					headers: { "Content-Type" : "application/x-www-form-urlencoded" },
					//I can't figure out a way to error check this page...
					onload: function(e) { 
						if (e.responseText.match(/Invalid authorization key/)) {
							var temp = document.getElementById('content');
							temp.innerHTML = "Invalid authorization key (the system must have updated your authkey since you loaded the page).  Refresh the page and try again!<br>I strongly recommend rechecking your values, since it's possible (though unlikely) that some values updated while others didn't.  Sorry :(";
						}
					},
					onerror: function(e) { 
						alert("some sort of error occured with the server.  Error occured with torrentID: \"" + allGroupNumbers[i] + "\" which had a new sort number of: \"" + allNewSortNumbers[i] + "\".  Recommend rechecking your values."); 
						return;
					}
				});
			}
		}
		// one more worthless request to reload the page after all previous requests finish
		GM_xmlhttpRequest({
			method: "POST",
			url: URL.Host + "/collages.php",
			data: "action=manage_handle&auth=" + authKey + "&collageid=" + activeCollageID + "&groupid=" + allGroupNumbers[i] + "&sort=" + allNewSortNumbers[i],
			headers: { "Content-Type" : "application/x-www-form-urlencoded" },
			onload: function(e) { 
				if (e.responseText.match(/Invalid authorization key/)) {
					var temp = document.getElementById('content');
					temp.innerHTML = "Invalid authorization key (the system must have updated your authkey since you loaded the page).  Refresh the page and try again!<br>I strongly recommend rechecking your values, since it's possible (though unlikely) that some values updated while others didn't.  Sorry :(";
				} else {
					document.location.href = document.location.href; 
				}
			}
		});
	}, false);
	
	//insert blank space between edit all image and math range image
	var oNewP = document.createElement("b");
	var oText = document.createTextNode(" ");
	oNewP.appendChild(oText);
	var beforeMe = document.getElementsByTagName('h2')[0];
	beforeMe.parentNode.insertBefore(oNewP, beforeMe);
	
	if (GM_getValue("checkBoxAlwaysOn", "0") == 0) {
		var mathRangeButton = document.createElement('input');
		mathRangeButton.type = 'button';
		mathRangeButton.value = 'Math Range';
		
		mathRangeButton.addEventListener("click", function() {
			mathArray();
			mathRangeButton.style.display = 'none';
		}, false);
		
		var bx = document.getElementById('content').getElementsByTagName('h2')[0];
		bx.parentNode.insertBefore(mathRangeButton, bx);
	} else {
		mathArray();
	}
	
	//catch 'Remove' clicks for torrentcache update
	var inputs = document.querySelectorAll('input[name=submit][value=Remove]');
	var groupidnode;
	for(var ii = 0; ii < inputs.length; ++ii) {
		groupidnode = inputs[ii].parentNode.querySelector('input[type=hidden][name=groupid]');
		inputs[ii].setAttribute('torrentgroupid', groupidnode.value);
		inputs[ii].addEventListener('click', function(e) { manage_remove_click(e); });
	}
}

// used for operations on manage page
function mathArray() {
	// math Array checkboxes
	var box=new Array();
	var lx = document.getElementsByName('sort');
	
	for (var i =0; i< lx.length; ++i) {
		box[i] = document.createElement("input");
		box[i].type="checkbox";
		box[i].setAttribute('realChecked', "0");
		box[i].setAttribute('arrayValue', i);
		lx[i].parentNode.insertBefore(box[i], lx[i]);
		
		//check for max of two boxes
		box[i].addEventListener("click", function() {
			var unclickCheck = 0;
			if (this.checked == true) {
				this.setAttribute('realChecked', "1");
			} else  {
				// if you unselect the box do the following:
				this.setAttribute('realChecked', "0"); 
				for (var m =0; m< lx.length; ++m) {
					if (box[m].getAttribute('realChecked') != "1") {
						box[m].checked = false;
						box[m].disabled = false;
					}
				}
			}
			var counter = 0;
						
			var firstValue, secondValue, thirdValue;
			for (var z=0; z< lx.length; ++z) {
				if (box[z].getAttribute('realChecked') == "1") { 
					counter++;
					if (counter == 1) {
						firstValue = parseInt(z);
					} else if (counter == 2) {
						secondValue = parseInt(z);
					} else if (counter == 3) {
						thirdValue = parseInt(z);
					}
				}
			}
			if (counter == 2) {
				//visibly show which boxes you checked
				for (var x = firstValue+1; x <= secondValue-1; ++x) {
					box[x].checked = true;
					box[x].disabled = true;
				}
			} else if (counter == 3) {
				alert("You can only select TWO check boxes.  One for the top of your range, one for the bottom of your range.  Unselecting the checkbox.");
				// if you select below the current range
				if  (this.getAttribute('arrayValue') > secondValue) { 
					for (var x = firstValue+1; x <= secondValue+1; ++x) {
						box[x].checked = false;
						box[x].disabled = false;
						box[x].setAttribute('realChecked', "0");
					}
					//uncheck current selection
					box[thirdValue].checked = false;
					box[thirdValue].setAttribute('realChecked', "0");

				}
				// if you select above the current range
				else if (this.getAttribute('arrayValue') < secondValue) {
					for (var y = secondValue; y <= thirdValue-1; ++y) {
						
						box[y].checked = false;
						box[y].disabled = false;
						box[y].setAttribute('realChecked', "0");
					}
					//uncheck current selection
					box[firstValue].checked = false;
					box[firstValue].setAttribute('realChecked', "0");
				}
			}
		}, false);
	}
	
	//execute the math range button
	var operationButton = document.createElement('input');
	operationButton.type = 'button';
	operationButton.value = 'Operation';
	
	var yx = document.getElementById('content').getElementsByTagName('h2')[0];
	yx.parentNode.insertBefore(operationButton, yx);
	
	operationButton.addEventListener("click", function(e){
		var upperRangeValue, lowerRangeValue;
		
		var counter = 0;
		// check if they have two check boxes
		for (var q =0; q< lx.length; ++q) {
			if (box[q].getAttribute('realChecked') == "1"){ 
				counter++;
				if (counter == 1) { upperRangeValue = parseInt(q); } 
				else if (counter == 2) { lowerRangeValue = parseInt(q); }	
			}
		}
		if (counter == 1) {
			alert("You must select two checkboxes to include your entire range.\nExample- select the 3rd checkbox and 6th checkbox to perform a math operation on torrents 3, 4, 5, 6\nAnother option is to select NO checkboxes.  When you perform an operation, it will perform on ALL torrents.\nRemember: click edit all to update the changes.");
		} else {
			// We are ready to do the math operations
			var userOperationMessage = "What operation do you want to perform:\nadd: +\nsubtract: -\nmultiply: *\ndivide: \/\nfind missing torrents: m\nexport to tab delimitted file: e\n\nRemember: click edit all to update the changes.";
			if (counter == 0) {				
				// check all the boxes so you can see you're doing stuff on everything
				for (var c = 0; c < lx.length; ++c) {
					box[c].checked = true;
					box[c].disabled = true;
				}
				
				upperRangeValue = 0;
				lowerRangeValue = parseInt(c);

				var userOperation = prompt("Now performing an operation on ALL elements.\n\n" + userOperationMessage);
			} else {
				var userOperation = prompt(userOperationMessage);
			}
			
			if (userOperation != null && userOperation != '') {
				userOperation = userOperation.toUpperCase();
				if (userOperation == "+" || userOperation == "-" || userOperation == "*" || userOperation == "\/") {
					var adjustValue = prompt("Current operation: \"" + userOperation + "\".  Input an integer to adjust the selected range by the operation.");
					if (adjustValue != null && adjustValue != '') {
						adjustValue = parseInt(adjustValue);
						
						if (isNaN(adjustValue)) { 
							alert("Please pick a valid integer!"); 
							return;
						}
					} else {
						return;
					}
				} else if (userOperation == "M") {
					var diffValue = prompt("Current operation: \"Find Missing Torrents\".  Input the difference of sort numbers.\nExample: Input 10 if the collage sort numbers are 10, 20, 30, ...");
					if (diffValue != null && diffValue != '') {
						diffValue = parseInt(diffValue);
						if (isNaN(diffValue)) { 
							alert("Please pick a valid integer!"); 
							return;
						}
					} else {
						return;
					}
				} else if (userOperation == "E") {
				} else { 
					// uncheck all the boxes assuming the user never selecting any
					if (counter == 0) {					
						for (var c =0; c< lx.length; ++c) {
							if (c >= upperRangeValue && c <= lowerRangeValue) {
								box[c].checked = false;
								box[c].disabled = false;
							}	
						}
					}
					alert("Please select only the following characters \"+\", \"-\", \"*\", \"\/\", \"m\" (no quotes)");
					return; 
				}
			} else {
				// user hits cancel

				// uncheck all the boxes assuming the user never selecting any
				if (counter == 0) {
					for (var c = 0; c < lx.length; ++c) {
						if (c >= upperRangeValue && c <= lowerRangeValue) {
							box[c].checked = false;
							box[c].disabled = false;
						}	
					}
				}
				return; 
			}
						
			var allNewSortNumbers = new Array();

			if (userOperation == "+") {
				for (var b = 0; b < lx.length; ++b) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) + adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}
			} else if (userOperation == "-") {
				for (var b = 0; b < lx.length; ++b) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) - adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}
			} else if (userOperation == "*") {
				for (var b = 0; b < lx.length; ++b) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) * adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}			
			} else if (userOperation == "\/") {
				for (var b = 0; b < lx.length; ++b) {		
					if (b >= upperRangeValue && b <= lowerRangeValue) {
						allNewSortNumbers[b] = parseInt(lx[b].value) / adjustValue;
						lx[b].value=allNewSortNumbers[b];
					}				
				}
			} else if (userOperation == "M") {
				//find missing numbers
				var missingValues=new Array();
				var extraValues=new Array();
				var missingCount = 0;
				var extraCount = 0;
				var zzb = document.getElementsByName('sort');
				var checkNumber = parseInt(zzb[upperRangeValue].value);
				var nextNumber =0;
				for (var i = upperRangeValue; i < lowerRangeValue-1; ++i) {
					checkNumber += diffValue;
					
					nextNumber = parseInt(zzb[i + 1].value);

					if (checkNumber != nextNumber) {
						if (checkNumber < nextNumber) {
							i--;
							if (checkNumber != missingValues[missingCount-1]) {
								missingValues[missingCount] = checkNumber;
								missingCount++;
							}
						} else {
							extraValues[extraCount] = nextNumber;
							extraCount++;
							if (checkNumber != missingValues[missingCount-1]) {
								missingValues[missingCount] = checkNumber;
								missingCount++;
								checkNumber -= diffValue;
							}
						}
					} else {
						if (checkNumber == missingValues[missingCount-1]) {
								missingCount--;
								missingValues.pop();
						}
					}
				}
				if (missingCount == 0) { 
					if (extraCount == 0) {
						alert("No missing sort numbers.\nAlso, no extra sort numbers tucked inbetween.");
					} else {
						alert("No missing sort numbers.\nBut the extra sort numbers are: " + extraValues);
					}	
				} else {
					if (extraCount == 0) {
						alert("The missing sort numbers are: " + missingValues + "\nAlso, no extra sort numbers tucked inbetween.");
					} else { 
						alert("The missing sort numbers are: " + missingValues + "\nAnd the extra sort numbers are: " + extraValues);
					}
				}
			} else if (userOperation == "E") {
				var items = document.getElementById("content").getElementsByTagName("a");
				var names = new Array();
				var artist, album;
				var artistMatch, artistMatchSecond, albumMatch;
				var combined;

				for (var i = 0; i < items.length; ++i) { 
					albumMatch = items[i].href.match(/torrents\.php\?id=([0-9]+)$/);
					if (albumMatch) {
						album = items[i].innerHTML;
						artistMatch = items[i-1].href.match(/artist\.php\?id=([0-9]+)$/);
						
						if (artistMatch) { 
							artist = items[i-1].innerHTML; 
							//check for 2 artists (eg. "Billy Bragg" and "Wilco" - "Mermaid Avenue")
							artistMatchSecond = items[i-2].href.match(/artist\.php\?id=([0-9]+)$/);
							if (artistMatchSecond) { artist = items[i-2].innerHTML + " and " + artist; }
							// sort by artist - album
							if (userOperation == "E" ) { combined = "\"" + artist + "\",\"" + album+  "\""; }
							// sort by album - artist
							else {combined = "\"" + album + "\",\"" + artist + "\""; }
						} else {
							// case for no artist found (ie pdf, audiobook, Various Artists etc)
							combined = ",\"" + album + "\""; 
							
							// super ugly way to handle Various Artists for sort by artist (if anyone has a better idea, I'm all ears :)
							var itemsx = document.getElementById("content").getElementsByTagName("tr");
							outerLoop: for (var z = 0; z < itemsx.length; ++z) {
								var itemsInnerHTML = itemsx[z].innerHTML
								var match = itemsInnerHTML.match(/torrents\.php/);
								if (match) { 
									if (itemsx[z].innerHTML.match(/Various Artists/)) { 
										var tempAlbumCheck = itemsInnerHTML.substring(itemsInnerHTML.indexOf("Torrent\">")+9, itemsInnerHTML.indexOf("</a>"));
										if (album == tempAlbumCheck) {
											//put at end of sort list
											combined = "\"Various Artits\",\"" + album + "\"";
											break outerLoop;
										}
									}
								}
							}
						}
						names.push(combined);
					}
				}
				var message = '';
				for (var x = 0; x < names.length; ++x) {
					message = message + names[x] + "<br>";
				}
				document.body.innerHTML = message;
				
			}

			// uncheck the boxes in the range (note: the above/below loops should be separate for speed issues
			for (var c =0; c< lx.length; ++c) {
				if (c >= upperRangeValue && c <= lowerRangeValue) {
					box[c].checked = false;
					box[c].disabled = false;
				}	
			}
			box[upperRangeValue].setAttribute('realChecked', "0");
			box[lowerRangeValue].setAttribute('realChecked', "0");
		}
	}, false);
}


// get the collage ID from stored file
function getCollageID() {
	collageID = GM_getValue('activeCollageID', '0');
	collName = GM_getValue('activeCollageName', 'None');
}

// write the collage ID to the stored file
function setCollageID(linkref) {
	if (linkref.getAttribute('collage-id') == '0') {
		GM_deleteValue('activeCollageID');
		GM_deleteValue('activeCollageName');
		torrentCache.GM_delete();
	} else {
		GM_setValue('activeCollageID', linkref.getAttribute('collage-id'));
		GM_setValue('activeCollageName', linkref.getAttribute('collage-name'));
	}
	window.location.reload();
}

function image_click(e) {
	var authKey = findAuthKey();

	//error checking on collageID in case user updates collage and doesn't refresh torrents.php page
	if (GM_getValue('activeCollageID') != collageID) {
		alert('Active collage has changed. Refresh the page and try again!');
		return;
	}

	var img = this; //necessary to be able to change the image's src attribute from within the onload/onerror closures

	var inCollage = torrentCache.contains(img.getAttribute('torrentgroupid'));

	img.src = ICON_LOADING;

	GM_xmlhttpRequest({
		method: "POST",
		url: URL.Host + "/collages.php",
		data: (inCollage ? 
			'action=manage_handle&auth=' + authKey + '&collageid=' + collageID + '&groupid=' + img.getAttribute('torrentgroupid') + '&submit=Remove' :
			'action=add_torrent&auth=' + authKey + '&collageid=' + collageID + '&url=' + img.getAttribute('torrent-url')),
		headers: { "Content-Type" : "application/x-www-form-urlencoded" },
		onload: function(response) {
			// we get redirected if the action was successful, so if we are still on collages.php$, that means that something went wrong.
			if (response.finalUrl.match(/\/collages\.php$/)) {
				// generically read out the error message. yes, this code isn't pretty :-/
				var title = response.responseText.substring(response.responseText.search('<h2>')+4);
				title = title.substring(0, title.search('</h2>'));
				var description = response.responseText.substring(response.responseText.search('<h2>Error</h2>')); 
				description = description.substring(description.search('<p>')+3);
				description = description.substring(0, description.search('</p>'));
				
				img.src = ICON_ERR;
				alert(title+"\n\n"+description);
			} else {
				// Remember: inCollage is determined *before* sending the request. When inCollage is true, the torrent now isn't in the collage anymore!
				if (inCollage) {
					torrentCache.remove(img.getAttribute('torrentgroupid'));
				} else {
					torrentCache.add(img.getAttribute('torrentgroupid'));
				}
				torrentCache.GM_save();
				updateAddIcon(img);
			}
		},
		onerror: function(f) {
			img.src = ICON_ERR;
			alert('Some unknown error occured. Refresh the page and try again!');
		}
	});
}

function manage_remove_click(e) {
	torrentCache.remove(e.target.getAttribute('torrentgroupid'));
	torrentCache.GM_save();
	return true;
}

//find authkey
function findAuthKey() {
	return unsafeWindow.authkey;
}

// preference for always showing checkboxes on manage page
GM_registerMenuCommand("What.CD :: Collage Building Helper - MathRange checkboxes", function() {
	var checkBoxQuestion;
	for (var zz = 1; zz <= 3 && isNaN(checkBoxQuestion); ++zz) {
		checkBoxQuestion = prompt("Do you want the checkboxes to always appear on the manage collage page?\nType \"1\" for yes and \"0\" for no.\nCurrent selection is: " + GM_getValue("checkBoxAlwaysOn", "0") + " (0 is default)");
		if (checkBoxQuestion != null && checkBoxQuestion != '') {
			checkBoxQuestion = parseInt(checkBoxQuestion);
			if (isNaN(checkBoxQuestion)) { 
				if (zz==3) {
					alert("Try harder!  Better luck next time!");
				} else {
					alert("Please pick \"1\" or \"0\" (no quotes)");
				}
			} else if (checkBoxQuestion == 0 || checkBoxQuestion == 1) {
				GM_setValue("checkBoxAlwaysOn", checkBoxQuestion);
			} else {
				alert("Please pick \"1\" or \"0\" (no quotes)");
			}
		}
	}
});

init();