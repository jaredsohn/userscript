// ==UserScript==
// @name          RES Max
// @namespace 	  http://www.reddit.com/
// @description	  A suite of tools to enhance reddit...
// @author        honestbleeps
// @include       http://reddit.honestbleeps.com/*
// @include       http://reddit.com/*
// @include       https://reddit.com/*
// @include       http://*.reddit.com/*
// @include       https://*.reddit.com/*
// ==/UserScript==

var RESVersion = 3.4;

/*
	Reddit Enhancement Suite - a suite of tools to enhance Reddit
	Copyright (C) 2010-2011 - honestbleeps (steve@honestbleeps.com)

	RES is released under the GPL. However, I do ask a favor (obviously I don't/can't require it, I ask out of courtesy):
	
	Because RES auto updates and is hosted from a central server, I humbly request that if you intend to distribute your own
	modified Reddit Enhancement Suite, you name it something else and make it very clear to your users that it's your own
	branch and isn't related to mine.
	
	RES is updated very frequently, and I get lots of tech support questions/requests from people on outdated versions. If 
	you're distributing RES via your own means, those recipients won't always be on the latest and greatest, which makes 
	it harder for me to debug things and understand (at least with browsers that auto-update) whether or not people are on 
	a current version of RES.
	
	I can't legally hold you to any of this - I'm just asking out of courtesy.
	
	Thanks, I appreciate your consideration.  Without further ado, the all-important GPL Statement:

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/

// DOM utility functions
function insertAfter( referenceNode, newNode ) {
	if ((typeof(referenceNode) == 'undefined') || (referenceNode == null)) {
		console.log(arguments.callee.caller);
	} else if ((typeof(referenceNode.parentNode) != 'undefined') && (typeof(referenceNode.nextSibling) != 'undefined')) {
		if (referenceNode.parentNode == null) {
			console.log(arguments.callee.caller);
		} else {
			referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
		}
	}
};
function createElementWithID(elementType, id, classname) {
	obj = document.createElement(elementType);
	if (id != null) {
		obj.setAttribute('id', id);
	}
	if ((typeof(classname) != 'undefined') && (classname != '')) {
		obj.setAttribute('class', classname);
	}
	return obj;
};

var safeJSON = {
	// safely parses JSON and won't kill the whole script if JSON.parse fails
	// if localStorageSource is specified, will offer the user the ability to delete that localStorageSource to stop further errors.
	parse: function(data, localStorageSource) {
		try {
			return JSON.parse(data);
		} catch (error) {
			if (localStorageSource) {
				var msg = 'Error caught: JSON parse failure on the following data from "'+localStorageSource+'": <textarea rows="5" cols="50">' + data + '</textarea><br>RES can delete this data to stop errors from happening, but you might want to copy/paste it to a text file so you can more easily re-enter any lost information.';
				alert(msg, function() {
					// back up a copy of the corrupt data
					localStorage.setItem(localStorageSource + '.error', data);
					// delete the corrupt data
					RESStorage.removeItem(localStorageSource);
				});
			} else {
				alert('Error caught: JSON parse failure on the following data: ' + data);
			}
			return {};
		}
	}
}

// array compare utility function for keyCode arrays
function keyArrayCompare(fromArr, toArr) {
	// if we've passed in a number, fix that and make it an array with alt, shift and ctrl set to false.
	if (typeof(toArr) == 'number') {
		toArr = Array(toArr,false,false,false);
	} else if (toArr.length == 4) {
		toArr.push(false);
	}
	if (fromArr.length != toArr.length) return false;
	for (var i = 0; i < toArr.length; i++) {
		if (fromArr[i].compare) { 
			if (!fromArr[i].compare(toArr[i])) return false;
		}
		if (fromArr[i] !== toArr[i]) return false;
	}
	return true;
}

function operaUpdateCallback(obj) {
	RESUtils.compareVersion(obj);
}
function operaForcedUpdateCallback(obj) {
	RESUtils.compareVersion(obj, true);
}

function hasClass(ele,cls) {
	if ((typeof(ele) == 'undefined') || (ele == null)) {
		console.log(arguments.callee.caller);
		return false;
	}
	return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
	if (!hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
	if (hasClass(ele,cls)) {
		var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
		ele.className=ele.className.replace(reg,' ');
	}
}

function post_to_url(path, params, method) {
    method = method || "post"; // Set method to post by default, if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}

// This object will store xmlHTTPRequest callbacks for Safari because Safari's extension architecture seems stupid.
// This really shouldn't be necessary, but I can't seem to hold on to an onload function that I pass to the background page...
xhrQueue = { count: 0, onloads: [] };
function safariMessageHandler(msgEvent) {
	switch (msgEvent.name) {
		case 'GM_xmlhttpRequest':
			// Fire the appropriate onload function for this xmlhttprequest.
			xhrQueue.onloads[msgEvent.message.XHRID](msgEvent.message);
			break;
		case 'compareVersion':
			var forceUpdate = false;
			if (typeof(msgEvent.message.forceUpdate) != 'undefined') forceUpdate = true;
			RESUtils.compareVersion(msgEvent.message, forceUpdate);
			break;
		case 'loadTweet':
			var tweet = msgEvent.message;
			var thisExpando = modules['styleTweaks'].tweetExpando;
			thisExpando.innerHTML = '<form class="usertext"><div class="usertext-body"><div class="md"><div><img style="display: block;" src="'+tweet.user.profile_image_url+'"></div>' + tweet.user.screen_name + ': ' + tweet.text + '</div></div></form>';
			thisExpando.style.display = 'block';
		case 'getLocalStorage':
			// Does RESStorage have actual data in it?  If it doesn't, they're a legacy user, we need to copy 
			// old schol localStorage from the foreground page to the background page to keep their settings...
			if (typeof(msgEvent.message.importedFromForeground) == 'undefined') {
				// it doesn't exist.. copy it over...
				var thisJSON = {
					requestType: 'saveLocalStorage',
					data: localStorage
				}
				safari.self.tab.dispatchMessage('saveLocalStorage', thisJSON);
			} else {
				setUpRESStorage(msgEvent.message);
				RESInit();
			}
			break;
		case 'saveLocalStorage':
			// Okay, we just copied localStorage from foreground to background, let's set it up...
			setUpRESStorage(msgEvent.message);
			RESInit();
		default:
			// console.log('unknown event type in safariMessageHandler');
			break;
	}
}

function operaMessageHandler(msgEvent) {
	  var eventData = msgEvent.data;
	  switch (eventData.msgType) {
		case 'GM_xmlhttpRequest':
			// Fire the appropriate onload function for this xmlhttprequest.
			xhrQueue.onloads[eventData.XHRID](eventData.data);
			break;
		case 'compareVersion':
			var forceUpdate = false;
			if (typeof(eventData.data.forceUpdate) != 'undefined') forceUpdate = true;
			RESUtils.compareVersion(eventData.data, forceUpdate);
			break;
		case 'loadTweet':
			var tweet = eventData.data;
			var thisExpando = modules['styleTweaks'].tweetExpando;
			thisExpando.innerHTML = '<form class="usertext"><div class="usertext-body"><div class="md"><div><img style="display: block;" src="'+tweet.user.profile_image_url+'"></div>' + tweet.user.screen_name + ': ' + tweet.text + '</div></div></form>';
			thisExpando.style.display = 'block';
		case 'getLocalStorage':
			// Does RESStorage have actual data in it?  If it doesn't, they're a legacy user, we need to copy 
			// old schol localStorage from the foreground page to the background page to keep their settings...
			if (typeof(eventData.data.importedFromForeground) == 'undefined') {
				// it doesn't exist.. copy it over...
				var thisJSON = {
					requestType: 'saveLocalStorage',
					data: localStorage
				}
				opera.extension.postMessage(JSON.stringify(thisJSON));
			} else {
				setUpRESStorage(eventData.data);
				RESInit();
			}
			break;
		case 'saveLocalStorage':
			// Okay, we just copied localStorage from foreground to background, let's set it up...
			setUpRESStorage(eventData.data);
			RESInit();
		default:
			// console.log('unknown event type in operaMessageHandler');
			break;
	  }
}

if (typeof(safari) != 'undefined') {
	safari.self.addEventListener("message", safariMessageHandler, false);
}
// we can't do this check for opera here because we need to wait until DOMContentLoaded is triggered, I think.  Putting this in RESinit();

// opera compatibility
if (typeof(opera) != 'undefined') {
	// removing this line for new localStorage methodology (store in extension localstorage)
	localStorage = window.localStorage;
	location = window.location;
	XMLHttpRequest = window.XMLHttpRequest;
}

// Firebug stopped showing console.log for some reason. Need to use unsafeWindow if available.

if (typeof(unsafeWindow) != 'undefined') {
	if (typeof(unsafeWindow.console) != 'undefined') {
		console = unsafeWindow.console;
	} else if (typeof(console) == 'undefined') {
		console = {
			log: function(str) {
				return false;
			}
		};
	}
}



// GreaseMonkey API compatibility for Chrome
// @copyright      2009, 2010 James Campos
// @modified		2010 Steve Sobel - added some missing gm_* functions
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if ((typeof GM_deleteValue == 'undefined') || (typeof GM_addStyle == 'undefined')) {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		var head = document.getElementsByTagName('head')[0];
		if (head) {
			head.appendChild(style);
		}
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
	
	if (typeof(chrome) != 'undefined') {
		GM_xmlhttpRequest = function(obj) {
			var crossDomain = (obj.url.indexOf(location.hostname) == -1);
			
			if ((typeof(obj.onload) != 'undefined') && (crossDomain)) {
				obj.requestType = 'GM_xmlhttpRequest';
				if (typeof(obj.onload) != 'undefined') {
					chrome.extension.sendRequest(obj, function(response) {
						obj.onload(response);
					});
				}
			} else {
				var request=new XMLHttpRequest();
				request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
				request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
				try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
				if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
				request.send(obj.data); return request;
			}
		}
	} else if (typeof(safari) != 'undefined')  {
		GM_xmlhttpRequest = function(obj) {
			obj.requestType = 'GM_xmlhttpRequest';
			// Safari is a bastard.  Since it doesn't provide legitimate callbacks, I have to store the onload function here
			// in the main userscript in a queue (see xhrQueue), wait for data to come back from the background page, then call the onload. Damn this sucks.
			// See how much easier it was up there in the Chrome statement?  Damn.
			if (typeof(obj.onload) != 'undefined') {
				obj.XHRID = xhrQueue.count;
				xhrQueue.onloads[xhrQueue.count] = obj.onload;
				safari.self.tab.dispatchMessage("GM_xmlhttpRequest", obj);
				xhrQueue.count++;
			}
		}
	} else if (typeof(opera) != 'undefined') {
		GM_xmlhttpRequest = function(obj) {
			obj.requestType = 'GM_xmlhttpRequest';
			// Turns out, Opera works this way too, but I'll forgive them since their extensions are so young and they're awesome people...
			// Really though, we need callbacks like Chrome has!  This is such a hacky way to emulate GM_xmlhttpRequest.

			// oy vey... another problem. When Opera sends xmlhttpRequests from the background page, it loses the cookies etc that it'd have 
			// had from the foreground page... so we need to write a bit of a hack here, and call different functions based on whether or 
			// not the request is cross domain... For same-domain requests, we'll call from the foreground...
			var crossDomain = (obj.url.indexOf(location.hostname) == -1);
			
			if ((typeof(obj.onload) != 'undefined') && (crossDomain)) {
				obj.XHRID = xhrQueue.count;
				xhrQueue.onloads[xhrQueue.count] = obj.onload;
				opera.extension.postMessage(JSON.stringify(obj));
				xhrQueue.count++;
			} else {
				var request=new XMLHttpRequest();
				request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
				request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
				try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
				if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
				request.send(obj.data); return request;
			}
		}
	} else {
		GM_xmlhttpRequest=function(obj) {
			var request=new XMLHttpRequest();
			request.onreadystatechange=function() { if(obj.onreadystatechange) { obj.onreadystatechange(request); }; if(request.readyState==4 && obj.onload) { obj.onload(request); } }
			request.onerror=function() { if(obj.onerror) { obj.onerror(request); } }
			try { request.open(obj.method,obj.url,true); } catch(e) { if(obj.onerror) { obj.onerror( {readyState:4,responseHeaders:'',responseText:'',responseXML:'',status:403,statusText:'Forbidden'} ); }; return; }
			if(obj.headers) { for(name in obj.headers) { request.setRequestHeader(name,obj.headers[name]); } }
			request.send(obj.data); return request;
		}
	}

}


var RESConsoleContainer = '';
var modalOverlay = '';
var RESMenuItems = new Array();
var RESConsolePanels = new Array();
var modules = new Array();

// define common RESUtils
var RESUtils = {
	// imgur API key
	imgurAPIKey: 'fe266bc9466fe69aa1cf0904e7298eda',
	// A cache variable to store CSS that will be applied at the end of execution...
	css: '',
	addCSS: function(css) {
		this.css += css;
	},
	// checks if script should run on current URL using exclude / include.
	isMatchURL: function (moduleID) {
		var currURL = location.href;
		// get includes and excludes...
		var excludes = modules[moduleID].exclude;
		var includes = modules[moduleID].include;
		// first check excludes...
		if (typeof(excludes) != 'undefined') {
			for (i=0, len = excludes.length; i<len; i++) {
				// console.log(moduleID + ' -- ' + excludes[i] + ' - excl test - ' + currURL + ' - result: ' + excludes[i].test(currURL));
				if (excludes[i].test(currURL)) {
					return false;
				}
			}
		}
		// then check includes...
		for (i=0, len=includes.length; i<len; i++) {
			// console.log(moduleID + ' -- ' + includes[i] + ' - incl test - ' + currURL + ' - result: ' + includes[i].test(currURL));
			if (includes[i].test(currURL)) {
				return true;
			}
		}
		return false;
	},
	// gets options for a module...
	getOptions: function(moduleID) {
		var thisOptions = RESStorage.getItem('RESoptions.' + moduleID);
		var currentTime = new Date();
		if ((thisOptions) && (thisOptions != 'undefined') && (thisOptions != null)) {
			// merge options (in case new ones were added via code) and if anything has changed, update to localStorage
			storedOptions = safeJSON.parse(thisOptions, 'RESoptions.' + moduleID)			
			/*
			try {
				storedOptions = JSON.parse(thisOptions);
			} catch (error) {
				alert('Your options for '+moduleID+' have become corrupt. Please contact honestbleeps on reddit for help.');
			}
			*/
			codeOptions = modules[moduleID].options;
			for (attrname in codeOptions) {
				if (typeof(storedOptions[attrname]) == 'undefined') {
					storedOptions[attrname] = codeOptions[attrname];
				}
			}
			modules[moduleID].options = storedOptions;
			if (modules[moduleID].options != storedOptions) {
				RESStorage.setItem('RESoptions.' + moduleID, JSON.stringify(modules[moduleID].options));
			}
		} else {
			// nothing in localStorage, let's set the defaults...
			RESStorage.setItem('RESoptions.' + moduleID, JSON.stringify(modules[moduleID].options));
		}
		return modules[moduleID].options;
	},
	setOption: function(moduleID, optionName, optionValue) {
		// console.log('called with: moduleid:' + moduleID + ' - optionname: ' + optionName + ' - optionvalue: ' + optionValue + ' -- type: ' + isNaN(optionValue));
		var thisOptions = this.getOptions(moduleID);
		if ((isNaN(optionValue)) || (typeof(optionValue) == 'boolean') || (typeof(optionValue) == 'object')) {
			saveOptionValue = optionValue;
		} else if (optionValue.indexOf('.')) {
			saveOptionValue = parseFloat(optionValue);
		} else {
			saveOptionValue = parseInt(optionValue);
		}
		thisOptions[optionName].value = saveOptionValue;
		// save it to the object...
		modules[moduleID].options = thisOptions;
		// save it to RESStorage...
		RESStorage.setItem('RESoptions.' + moduleID, JSON.stringify(modules[moduleID].options));
		return true;
	},
	click: function(obj, button) { 
		var button = button || 0;
		var evt = document.createEvent('MouseEvents');
		evt.initMouseEvent('click', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, button, null); obj.dispatchEvent(evt); 
	},
	mousedown: function(obj, button) { 
		var button = button || 0;
		var evt = document.createEvent('MouseEvents');
		evt.initMouseEvent('mousedown', true, true, window, 0, 1, 1, 1, 1, false, false, false, false, button, null); obj.dispatchEvent(evt); 
	},
	loggedInUser: function() {
		if (typeof(this.loggedInUserCached) == 'undefined') {
			var userLink = document.querySelector('#header-bottom-right > span.user > a');
			if ((userLink != null) && (userLink.innerHTML != 'register')) {
				this.loggedInUserCached = userLink.innerHTML;
			} else {
				this.loggedInUserCached = null;
			}
		}
		return this.loggedInUserCached;
	},
	pageType: function() {
		if (typeof(this.pageTypeSaved) == 'undefined') {
			var pageType = '';
			var currURL = location.href;
			var commentsRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*comments\/[-\w\.\/]*/i);
			var inboxRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/message\/[-\w\.\/]*/i);
			var profileRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/user\/[-\w\.]*\/?(comments)?\/?$/i);
			var submitRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*\/submit\/?$/i);
			var prefsRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/prefs\/?/i);
			if (commentsRegex.test(currURL)) {
				pageType = 'comments'
			} else if (profileRegex.test(currURL)) {
				pageType = 'profile';
			} else if (inboxRegex.test(currURL)) {
				pageType = 'inbox';
			} else if (submitRegex.test(currURL)) {
				pageType = 'submit';
			} else if (prefsRegex.test(currURL)) {
				pageType = 'prefs';
			} else {
				pageType = 'linklist';
			}
			this.pageTypeSaved = pageType;
		} 
		return this.pageTypeSaved;
	},
	currentSubreddit: function() {
		if (typeof(this.curSub) == 'undefined') {
			var match = location.href.match(/https?:\/\/(?:[a-z]+).reddit.com\/r\/([\w\.]+).*/i);
			if (match != null) {
				this.curSub = match[1];
				return match[1];
			} else {
				return null;
			}
		} else {
			return this.curSub;
		}
	},
	getXYpos: function (obj) {
		var topValue= 0,leftValue= 0;
		while(obj){
			leftValue+= obj.offsetLeft;
			topValue+= obj.offsetTop;
			obj= obj.offsetParent;
		}
		finalvalue = { 'x': leftValue, 'y': topValue };
		return finalvalue;
	},
	elementInViewport: function (obj) {
		var top = obj.offsetTop;
		var left = obj.offsetLeft;
		var width = obj.offsetWidth;
		var height = obj.offsetHeight;
		while(obj.offsetParent) {
			obj = obj.offsetParent;
			top += obj.offsetTop;
			left += obj.offsetLeft;
		}
		return (
			top >= window.pageYOffset &&
			left >= window.pageXOffset &&
			(top + height) <= (window.pageYOffset + window.innerHeight) &&
			(left + width) <= (window.pageXOffset + window.innerWidth)
		);
	},
	setMouseXY: function(e) {
		e = e || window.event;
		var cursor = {x:0, y:0};
		if (e.pageX || e.pageY) {
			cursor.x = e.pageX;
			cursor.y = e.pageY;
		} else {
			cursor.x = e.clientX + 
				(document.documentElement.scrollLeft || 
				document.body.scrollLeft) - 
				document.documentElement.clientLeft;
			cursor.y = e.clientY + 
				(document.documentElement.scrollTop || 
				document.body.scrollTop) - 
				document.documentElement.clientTop;
		}
		RESUtils.mouseX = cursor.x;
		RESUtils.mouseY = cursor.y;
	},
	elementUnderMouse: function (obj) {
		var top = obj.offsetTop;
		var left = obj.offsetLeft;
		var width = obj.offsetWidth;
		var height = obj.offsetHeight;
		var right = left + width;
		var bottom = top + height;
		if ((RESUtils.mouseX >= left) && (RESUtils.mouseX <= right) && (RESUtils.mouseY >= top) && (RESUtils.mouseY <= bottom)) {
			return true;
		} else {
			return false;
		}
	},
	setSelectValue: function(obj, value) {
		for (var i=0, len=obj.length; i < len; i++) {
			if (obj[i].value == value) {
				obj[i].selected = true;
			}
		}
	},
	stripHTML: function(str) {
		var regExp = /<\/?[^>]+>/gi;
        str = str.replace(regExp,"");
        return str;
	},
	fadeElementOut: function(obj, speed) {
		if (obj.getAttribute('isfading') == 'in') {
			return false;
		}
		obj.setAttribute('isfading','out');
		speed = speed || 0.1;
		if (obj.style.opacity <= 0) {
			obj.style.display = 'none';
			obj.setAttribute('isfading',false);
			return true;
		} else {
			var newOpacity = parseFloat(obj.style.opacity) - parseFloat(speed);
			if (newOpacity < 0) newOpacity = 0;
			obj.style.opacity = newOpacity;
			setTimeout(function() { RESUtils.fadeElementOut(obj, speed) }, 100);
		}
	},
	fadeElementIn: function(obj, speed) {
		if (obj.getAttribute('isfading') == 'out') {
			return false;
		}
		obj.setAttribute('isfading','in');
		speed = speed || 0.1;
		if ((obj.style.display == 'none') || (obj.style.display == '')) {
			obj.style.opacity = 0;
			obj.style.display = 'block';
		}
		if (obj.style.opacity >= 1) {
			obj.setAttribute('isfading',false);
			return true;
		} else {
			var newOpacity = parseFloat(obj.style.opacity) + parseFloat(speed);
			if (newOpacity > 1) newOpacity = 1;
			obj.style.opacity = newOpacity;
			setTimeout(function() { RESUtils.fadeElementIn(obj, speed) }, 100);
		}
	},
	checkForUpdate: function(forceUpdate) {
		var now = new Date();
		var lastCheck = parseInt(RESStorage.getItem('RESLastUpdateCheck')) || 0;
		// if we haven't checked for an update in 24 hours, check for one now!
		if (((now.getTime() - lastCheck) > 86400000) || (RESVersion > RESStorage.getItem('RESlatestVersion')) || ((RESStorage.getItem('RESoutdated') == 'true') && (RESVersion == RESStorage.getItem('RESlatestVersion'))) || forceUpdate) {
			var jsonURL = 'http://reddit.honestbleeps.com/update.json?v=' + RESVersion;
			// mark off that we've checked for an update...
			RESStorage.setItem('RESLastUpdateCheck',now.getTime());
			var outdated = false;
			if (typeof(chrome) != 'undefined') {
				// we've got chrome, so we need to hit up the background page to do cross domain XHR
				thisJSON = {
					requestType: 'compareVersion',
					url: jsonURL
				}
				chrome.extension.sendRequest(thisJSON, function(response) {
					// send message to background.html to open new tabs...
					outdated = RESUtils.compareVersion(response, forceUpdate);
				});
			} else if (typeof(safari) != 'undefined') {
				// we've got safari, so we need to hit up the background page to do cross domain XHR
				thisJSON = {
					requestType: 'compareVersion',
					url: jsonURL,
					forceUpdate: forceUpdate
				}
				safari.self.tab.dispatchMessage("compareVersion", thisJSON);
			} else if (typeof(opera) != 'undefined') {
				// we've got opera, so we need to hit up the background page to do cross domain XHR
				thisJSON = {
					requestType: 'compareVersion',
					url: jsonURL,
					forceUpdate: forceUpdate
				}
				opera.extension.postMessage(JSON.stringify(thisJSON));
			} else {
				// we've got greasemonkey, so we can do cross domain XHR.
				GM_xmlhttpRequest({
					method:	"GET",
					url:	jsonURL,
					onload:	function(response) {
						outdated = RESUtils.compareVersion(JSON.parse(response.responseText), forceUpdate);
					}
				});
			}
		}
	},
	compareVersion: function(response, forceUpdate) {
		if (RESVersion < response.latestVersion) {
			RESStorage.setItem('RESoutdated','true');
			RESStorage.setItem('RESlatestVersion',response.latestVersion);
			RESStorage.setItem('RESmessage',response.message);
			if (forceUpdate) {
				RESConsole.RESCheckUpdateButton.innerHTML = 'You are out of date! <a target="_blank" href="http://reddit.honestbleeps.com/download">[click to update]</a>';
			}
			return true;
		} else {
			RESStorage.setItem('RESlatestVersion',response.latestVersion);
			RESStorage.setItem('RESoutdated','false');
			if (forceUpdate) {
				RESConsole.RESCheckUpdateButton.innerHTML = 'You are up to date!';
			}
			return false;
		}
	},
	niceKeyCode: function(charCode) {
		keyComboString = '';
		if (typeof(charCode) == 'string') {
			var tempArray = charCode.split(',');
			if (tempArray.length) {
				if (tempArray[1] == 'true') keyComboString += 'alt-';
				if (tempArray[2] == 'true') keyComboString += 'ctrl-';
				if (tempArray[3] == 'true') keyComboString += 'shift-';
				if (tempArray[4] == 'true') keyComboString += 'command-';
			} 
			testCode = parseInt(charCode);
		} else if (typeof(charCode) == 'object') {
			testCode = parseInt(charCode[0]);
			if (charCode[1]) keyComboString += 'alt-';
			if (charCode[2]) keyComboString += 'ctrl-';
			if (charCode[3]) keyComboString += 'shift-';
			if (charCode[4]) keyComboString += 'command-';
		}
		switch(testCode) {
			case 8:
				niceString = "backspace"; //  backspace
				break;
			case 9:
				niceString = "tab"; //  tab
				break;
			case 13:
				niceString = "enter"; //  enter
				break;
			case 16:
				niceString = "shift"; //  shift
				break;
			case 17:
				niceString = "ctrl"; //  ctrl
				break;
			case 18:
				niceString = "alt"; //  alt
				break;
			case 19:
				niceString = "pause/break"; //  pause/break
				break;
			case 20:
				niceString = "caps lock"; //  caps lock
				break;
			case 27:
				niceString = "escape"; //  escape
				break;
			case 33:
				niceString = "page up"; // page up, to avoid displaying alternate character and confusing people	         
				break;
			case 34:
				niceString = "page down"; // page down
				break;
			case 35:
				niceString = "end"; // end
				break;
			case 36:
				niceString = "home"; // home
				break;
			case 37:
				niceString = "left arrow"; // left arrow
				break;
			case 38:
				niceString = "up arrow"; // up arrow
				break;
			case 39:
				niceString = "right arrow"; // right arrow
				break;
			case 40:
				niceString = "down arrow"; // down arrow
				break;
			case 45:
				niceString = "insert"; // insert
				break;
			case 46:
				niceString = "delete"; // delete
				break;
			case 91:
				niceString = "left window"; // left window
				break;
			case 92:
				niceString = "right window"; // right window
				break;
			case 93:
				niceString = "select key"; // select key
				break;
			case 96:
				niceString = "numpad 0"; // numpad 0
				break;
			case 97:
				niceString = "numpad 1"; // numpad 1
				break;
			case 98:
				niceString = "numpad 2"; // numpad 2
				break;
			case 99:
				niceString = "numpad 3"; // numpad 3
				break;
			case 100:
				niceString = "numpad 4"; // numpad 4
				break;
			case 101:
				niceString = "numpad 5"; // numpad 5
				break;
			case 102:
				niceString = "numpad 6"; // numpad 6
				break;
			case 103:
				niceString = "numpad 7"; // numpad 7
				break;
			case 104:
				niceString = "numpad 8"; // numpad 8
				break;
			case 105:
				niceString = "numpad 9"; // numpad 9
				break;
			case 106:
				niceString = "multiply"; // multiply
				break;
			case 107:
				niceString = "add"; // add
				break;
			case 109:
				niceString = "subtract"; // subtract
				break;
			case 110:
				niceString = "decimal point"; // decimal point
				break;
			case 111:
				niceString = "divide"; // divide
				break;
			case 112:
				niceString = "F1"; // F1
				break;
			case 113:
				niceString = "F2"; // F2
				break;
			case 114:
				niceString = "F3"; // F3
				break;
			case 115:
				niceString = "F4"; // F4
				break;
			case 116:
				niceString = "F5"; // F5
				break;
			case 117:
				niceString = "F6"; // F6
				break;
			case 118:
				niceString = "F7"; // F7
				break;
			case 119:
				niceString = "F8"; // F8
				break;
			case 120:
				niceString = "F9"; // F9
				break;
			case 121:
				niceString = "F10"; // F10
				break;
			case 122:
				niceString = "F11"; // F11
				break;
			case 123:
				niceString = "F12"; // F12
				break;
			case 144:
				niceString = "num lock"; // num lock
				break;
			case 145:
				niceString = "scroll lock"; // scroll lock
				break;
			case 186:
				niceString = ";"; // semi-colon
				break;
			case 187:
				niceString = "="; // equal-sign
				break;
			case 188:
				niceString = ","; // comma
				break;
			case 189:
				niceString = "-"; // dash
				break;
			case 190:
				niceString = "."; // period
				break;
			case 191:
				niceString = "/"; // forward slash
				break;
			case 192:
				niceString = "`"; // grave accent
				break;
			case 219:
				niceString = "["; // open bracket
				break;
			case 220:
				niceString = "\\"; // back slash
				break;
			case 221:
				niceString = "]"; // close bracket
				break;
			case 222:
				niceString = "'"; // single quote
				break;
			default:
				niceString = String.fromCharCode(testCode);
				break;
		}
		return keyComboString + niceString;
	},
	niceDate: function(d, usformat) {
		var year = d.getFullYear();
		var month = (d.getMonth() + 1);
		(month < 10) ? month = '0'+month : month=month;
		var day = d.getDate();
		(day < 10) ? day = '0'+day : day=day;
		var fullString = year+'-'+month+'-'+day;
		if (usformat) {
			fullString = month+'-'+day+'-'+year;
		}
		return fullString;
	},
	niceDateDiff: function(origdate, newdate) {
		// Enter the month, day, and year below you want to use as
		// the starting point for the date calculation
		var amonth = origdate.getMonth()+1;
		var aday = origdate.getDate();
		var ayear = origdate.getFullYear();

		if (newdate == null) newdate = new Date();
		var dyear;
		var dmonth;
		var dday;
		var tyear = newdate.getFullYear();
		var tmonth = newdate.getMonth()+1;
		var tday = newdate.getDate();
		var y=1;
		var mm=1;
		var d=1;
		var a2=0;
		var a1=0;
		var f=28;

		if ((tyear/4)-parseInt(tyear/4)==0) {
			f=29;
		}

		m = new Array(31, f, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);

		dyear = tyear-(ayear);

		dmonth = tmonth-amonth;
		if (dmonth<0) {
			dmonth = dmonth+12;
			dyear--;
		}

		dday = tday-aday;
		if (dday<0) {
			if (dmonth>0) {
				var ma = amonth+tmonth;
				// console.log('amonth: ' + amonth + ' -- tmonth: ' +tmonth);
				if (ma>12) {ma = ma-12}
				if (ma=0) {ma = ma+12}
				dday = dday+m[ma];
				dmonth--;
				if (dmonth < 0) {
					dyear--;
					dmonth = dmonth+12;
				}
			} else {
				dday=0;
			}
		}

		var returnString = '';
		
		if (dyear==0) {y=0}
		if (dmonth==0) {mm=0}
		if (dday==0) {d=0}
		if ((y==1) && (mm==1)) {a1=1}
		if ((y==1) && (d==1)) {a1=1}
		if ((mm==1) && (d==1)) {a2=1}
		if (y==1){
			if (dyear == 1) {
				returnString += dyear + " year";
			} else {
				returnString += dyear + " years";
			}
		}
		if ((a1==1) && (a2==0)) { returnString += " and "; }
		if ((a1==1) && (a2==1)) { returnString += ", "; }
		if (mm==1){
			if (dmonth == 1) {
				returnString += dmonth + " month";
			} else {
				returnString += dmonth + " months";
			}
		}
		if (a2==1) { returnString += " and "; }
		if (d==1){
			if (dday == 1) {
				returnString += dday + " day";
			} else {
				returnString += dday + " days";
			}
		}
		if (returnString == '') {
			returnString = '0 days';
		}
		return returnString;
	},
	checkIfSubmitting: function() {
		this.checkedIfSubmitting = true;
		if ((location.href.match(/\/r\/[\w]+\/submit\/?/i)) || (location.href.match(/reddit.com\/submit\/?/i))) {
			var thisSubRedditInput = document.getElementById('sr-autocomplete');
			if (thisSubRedditInput) {
				var thisSubReddit = thisSubRedditInput.value;
				var title = document.querySelector('textarea[name=title]');
				if (typeof(this.thisSubRedditInputListener) == 'undefined') {
					this.thisSubRedditInputListener = true;
					thisSubRedditInput.addEventListener('change', function(e) {
						RESUtils.checkIfSubmitting();
					}, false);
				}
				if (thisSubReddit.toLowerCase() == 'enhancement') {
					var textDesc = document.getElementById('text-desc');
					this.submittingToEnhancement = createElementWithID('div','submittingToEnhancement');
					this.submittingToEnhancement.innerHTML = "<b>Hey there!</b><br><br>It looks like you are submitting to /r/Enhancement. Are you submitting a bug report? \
						If so, please consider the following:<br> \
						<ol> \
							<li>Have you searched /r/Enhancement to see if someone else has reported it?</li> \
							<li>Have you checked the <a target=\"_blank\" href=\"http://reddit.honestbleeps.com/faq\">FAQ</a> and <a target=\"_blank\" href=\"http://reddit.honestbleeps.com/wiki\">Wiki</a> yet?</li> \
							<li>Are you sure it's a bug with RES specifically? Do you have any other Reddit-related userscripts/extensions running?</li> \
							<li>Okay - if you've answered \"yes\" to all of the above, go ahead and report it. <b>Please be sure to specify:</b> your browser (with version), version of RES, operating system, anything showing up in your Javascript error console, and any special settings you may have that might help debug.</li> \
						</ol> \
					";
					insertAfter(textDesc, this.submittingToEnhancement);
					if (title.value == '') title.value = 'Submitting a bug? Please read the box above...';
					RESUtils.addCSS('#submittingToEnhancement { font-size: 14px; border: 1px solid blue; padding: 5px; margin-top: 10px; } #submittingToEnhancement ol { margin-left: 10px; margin-top: 15px; list-style-type: decimal; } #submittingToEnhancement li { margin-left: 25px; }');
				} else if (typeof(this.submittingToEnhancement) != 'undefined') {
					this.submittingToEnhancement.parentNode.removeChild(this.submittingToEnhancement);
					if (title.value == 'Submitting a bug? Please read the box above...') {
						title.value = '';
					}
				}
			}
		} 
	},
	urlencode: function(string) {
		// Javascript's escape function is stupid, and ignores the + character. Why? I have no idea.
		// string = string.replace('+', '%2B');
		return escape(this._utf8_encode(string)).replace('+', '%2B');
	},
	urldecode: function(string) {
		return this._utf8_decode(unescape(string));
	},
	// private method for UTF-8 encoding
	_utf8_encode: function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode: function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	},
	isEmpty: function(obj) {
		for(var prop in obj) {
			if(obj.hasOwnProperty(prop))
			return false;
		}
		return true;
	}
}
// end RESUtils;

// Create a nice alert function...
var gdAlert = {
	container: false,
	overlay: "",
	
	init: function(callback) {
		//init
		var alertCSS = '#alert_message { ' +
			'display: none;' +
			'opacity: 0.0;' +
			'background-color: #EFEFEF;' +
			'border: 1px solid black;' +
			'color: black;' +
			'font-size: 10px;' +
			'padding: 20px;' +
			'padding-left: 60px;' +
			'padding-right: 60px;' +
			'position: fixed!important;' +
			'position: absolute;' +
			'width: 400px;' +
			'float: left;' +
			'z-index: 10000;' +
			'text-align: left;' +
			'left: auto;' +
			'top: auto;' +
			'}' +
		'#alert_message .button {' +
			'border: 1px solid black;' +
			'font-weight: bold;' +
			'font-size: 10px;' +
			'padding: 4px;' +
			'padding-left: 7px;' +
			'padding-right: 7px;' +
			'float: left;' +
			'background-color: #DFDFDF;' +
			'cursor: pointer;' +
			'}' +
		'#alert_message span {' +
			'display: block;' +
			'margin-bottom: 15px;	' +
			'}';

		GM_addStyle(alertCSS);
		
		gdAlert.populateContainer(callback);

	},
	
	populateContainer: function(callback) {
		gdAlert.container = createElementWithID('div','alert_message');
		gdAlert.container.appendChild(document.createElement('span'));
		if (typeof(callback) == 'function') {
			this.okButton = document.createElement('input');
			this.okButton.setAttribute('type','button');
			this.okButton.setAttribute('value','confirm');
			this.okButton.addEventListener('click',callback, false);
			this.okButton.addEventListener('click',gdAlert.close, false);
			var closeButton = document.createElement('input');
			closeButton.setAttribute('type','button');
			closeButton.setAttribute('value','cancel');
			closeButton.addEventListener('click',gdAlert.close, false);
			gdAlert.container.appendChild(this.okButton);
			gdAlert.container.appendChild(closeButton);
		} else {
			/* if (this.okButton) {
				gdAlert.container.removeChild(this.okButton);
				delete this.okButton;
			} */
			var closeButton = document.createElement('input');
			closeButton.setAttribute('type','button');
			closeButton.setAttribute('value','ok');
			closeButton.addEventListener('click',gdAlert.close, false);
			gdAlert.container.appendChild(closeButton);
		}
		var br = document.createElement('br');
		br.setAttribute('style','clear: both');
		gdAlert.container.appendChild(br);
		document.body.appendChild(gdAlert.container);
	
	},
	
	open: function(text, callback) {
		gdAlert.populateContainer(callback);
	
		//set message
		gdAlert.container.getElementsByTagName("SPAN")[0].innerHTML = text;
		gdAlert.container.getElementsByTagName("INPUT")[0].focus();
		gdAlert.container.getElementsByTagName("INPUT")[0].focus();
		
		//create site overlay
		gdAlert.overlay = document.createElement("DIV");
		gdAlert.overlay.style.width = gdAlert.getPageSize()[0] + "px";
		gdAlert.overlay.style.height = gdAlert.getPageSize()[1] + "px";
		gdAlert.overlay.style.backgroundColor = '#333333';
		gdAlert.overlay.style.top = '0';
		gdAlert.overlay.style.left = '0';
		gdAlert.overlay.style.position = 'absolute';
		gdAlert.overlay.style.zIndex = '9999';
		
		document.body.appendChild(gdAlert.overlay);
		
		// center messagebox (requires prototype functions we don't have, so we'll redefine...)
		// var arrayPageScroll = document.viewport.getScrollOffsets();
        // var winH = arrayPageScroll[1] + (document.viewport.getHeight());
        // var lightboxLeft = arrayPageScroll[0];
		var arrayPageScroll = [ document.documentElement.scrollLeft , document.documentElement.scrollTop ];
        var winH = arrayPageScroll[1] + (window.innerHeight);
        var lightboxLeft = arrayPageScroll[0];
		
		gdAlert.container.style.top = ((winH / 2) - 90) + "px";
		gdAlert.container.style.left = ((gdAlert.getPageSize()[0] / 2) - 155) + "px";
		
		/*
		new Effect.Appear(gdAlert.container, {duration: 0.2});
		new Effect.Opacity(gdAlert.overlay, {duration: 0.2, to: 0.8});
		*/
		RESUtils.fadeElementIn(gdAlert.container, 0.3);
		RESUtils.fadeElementIn(gdAlert.overlay, 0.3);
		
	},
	
	close: function() {
		/*
		new Effect.Fade(gdAlert.container, {duration: 0.3});
		new Effect.Fade(gdAlert.overlay, {duration: 0.3, afterFinish: function() {
			document.body.removeChild(gdAlert.overlay);
		}});	
		*/
		RESUtils.fadeElementOut(gdAlert.container, 0.3);
		RESUtils.fadeElementOut(gdAlert.overlay, 0.3);
	},
	
	getPageSize: function() {
	        
		var xScroll, yScroll;
		
		if (window.innerHeight && window.scrollMaxY) {	
			xScroll = window.innerWidth + window.scrollMaxX;
			yScroll = window.innerHeight + window.scrollMaxY;
		} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}
	
		var windowWidth, windowHeight;
	
		if (self.innerHeight) {	// all except Explorer
			if(document.documentElement.clientWidth){
				windowWidth = document.documentElement.clientWidth; 
			} else {
				windowWidth = self.innerWidth;
			}
			windowHeight = self.innerHeight;
		} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else if (document.body) { // other Explorers
			windowWidth = document.body.clientWidth;
			windowHeight = document.body.clientHeight;
		}	
	
		// for small pages with total height less then height of the viewport
		if(yScroll < windowHeight){
			pageHeight = windowHeight;
		} else { 
			pageHeight = yScroll;
		}
	
		// for small pages with total width less then width of the viewport
		if(xScroll < windowWidth){	
			pageWidth = xScroll;		
		} else {
			pageWidth = windowWidth;
		}
	
		return [pageWidth,pageHeight];
	}
}

//overwrite the alert function
var alert = function(text, callback) {
	if (gdAlert.container == false) {
		gdAlert.init(callback);
	}
	gdAlert.open(text, callback);
}

localStorageFail = false;

// Check for localStorage functionality...
try {
	localStorage.setItem('RES.lsTest','test');
} catch(e) {
	localStorageFail = true;
	/*
	localStorage = {
		getItem: function() {
			return false;
		},
		setItem: function() {
			return false;
		},
		removeItem: function() {
			return false;
		}
	}
	*/
}


// GM_addStyle('#RESConsole { display: none; }');
RESUtils.addCSS(' \
#RESConsole { \
	display: none; \
	font-size: 12px; \
	z-index: 1000; \
	position: absolute; \
	top: 50px; \
	left: 50px; \
	width: 740px; \
	height: 500px; \
	border-radius: 10px 10px 10px 10px; \
	-moz-border-radius: 10px 10px 10px 10px; \
	-webkit-border-radius: 10px 10px 10px 10px; \
	padding: 10px; \
	border: 4px solid #CCCCCC; \
	background-color: #ffffff; \
} \
#modalOverlay { \
	display: none; \
	z-index: 999; \
	position: absolute; \
	top: 0px; \
	left: 0px; \
	width: 100%; \
	background-color: #333333; \
	opacity: 0.6; \
} \
#RESConsoleHeader { \
	width: 100%; \
} \
#RESLogo { \
	margin-right: 5px; \
	float: left; \
} \
#RESConsoleTopBar { \
	width: 100%; \
	height: 35px; \
	margin-bottom: 10px; \
	padding: 3px; \
	background-color: #F0F3FC; \
	float: left; \
} \
#RESConsoleTopBar h1 { \
	float: left; \
	margin-top: 5px; \
	padding: 0px; \
	font-size: 14px; \
	font-weight: bold; \
} \
#RESConsoleSubredditLink { \
	margin-left: 15px; \
	font-size: 11px; \
} \
#RESClose { \
	background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); \
	background-position: 0px -120px; \
	width: 16px; \
	height: 16px; \
	float: right; \
	cursor: pointer; \
} \
#RESHelp { \
	background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); \
	background-position: -16px -120px; \
	margin-right: 8px; \
	width: 16px; \
	height: 16px; \
	float: right; \
	cursor: pointer; \
} \
#RESMenu li { \
	float: left; \
	text-align: center; \
	min-width: 80px; \
	margin-right: 15px; \
	border: 1px solid black; \
	border-radius: 5px 5px 5px 5px; \
	-moz-border-radius: 5px 5px 5px 5px; \
	-webkit-border-radius: 5px 5px 5px 5px; \
	padding: 3px; \
	cursor: pointer; \
} \
#RESConsoleContent { \
	clear: both; \
	margin-top: 40px; \
	padding: 6px; \
	height: 410px; \
	border: 1px solid #DDDDDD; \
	overflow: auto; \
} \
#RESConfigPanelOptions { \
	margin-top: 15px; \
	display: block; \
	width: 100%; \
} \
.RESPanel { \
	display: none; \
} \
.clear { \
	clear: both; \
} \
#keyCodeModal { \
	display: none; \
	width: 200px; \
	height: 40px; \
	position: absolute; \
	z-index: 1000; \
	background-color: #FFFFFF; \
	padding: 4px; \
	border: 2px solid #CCCCCC; \
} \
p.moduleListing { \
	padding-left: 5px; \
	padding-right: 5px; \
	padding-top: 5px; \
	padding-bottom: 15px; \
	border: 1px solid #BBBBBB; \
	-moz-box-shadow: 3px 3px 3px #BBB; \
	-webkit-box-shadow: 3px 3px 3px #BBB; \
} \
#RESConsoleModulesPanel label { \
	float: left; \
	width: 140px; \
	padding-top: 6px; \
} \
#RESConsoleModulesPanel input[type=checkbox] { \
	float: left; \
	margin-left: 10px; \
} \
#RESConsoleModulesPanel input[type=button] { \
	float: right; \
	padding: 3px; \
	margin-left: 20px; \
	font-size: 12px; \
	border: 1px solid #DDDDDD; \
	-moz-box-shadow: 3px 3px 3px #BBB; \
	-webkit-box-shadow: 3px 3px 3px #BBB; \
	background-color: #F0F3FC; \
	margin-bottom: 10px; \
} \
#RESConsoleModulesPanel p { \
	overflow: auto; \
	clear: both; \
	margin-bottom: 10px; \
} \
.moduleDescription { \
	float: left; \
	width: 500px; \
	margin-left: 10px; \
	padding-top: 6px; \
} \
.optionContainer { \
	width: 700px; \
	overflow: auto; \
	padding: 5px; \
	border: 1px dashed #AAAAAA; \
} \
.optionContainer table { \
	width: 650px; \
	margin-top: 20px; \
} \
.optionContainer label { \
	float: left; \
	width: 140px; \
} \
.optionContainer input[type=text], .optionContainer input[type=password] { \
	float: left; \
	width: 100px; \
} \
.optionDescription { \
	float: left; \
	width: 430px; \
	margin-left: 10px; \
} \
#RESCheckForUpdate { \
	float: left; \
	font-size: 10px; \
	cursor: pointer; \
	color: f0f3fc; \
	margin-left: 10px; \
} \
#moduleOptionsSave { \
	float: right; \
	padding: 3px; \
	margin-top: 6px; \
	margin-left: 20px; \
	font-size: 12px; \
	border: 1px solid #DDDDDD; \
	-moz-box-shadow: 3px 3px 3px #BBB; \
	-webkit-box-shadow: 3px 3px 3px #BBB; \
	background-color: #F0F3FC; \
	margin-bottom: 10px; \
} \
#moduleOptionsSaveStatus { \
	display: none; \
	margin-top: 10px; \
	padding: 5px; \
	text-align: center; \
	background-color: #FFFACD; \
} \
#RESConsoleAboutPanel p { \
	margin-bottom: 10px; \
} \
#RESConsoleAboutPanel ul { \
	margin-bottom: 10px; \
	margin-top: 10px; \
} \
#RESConsoleAboutPanel li { \
	list-style-type: disc; \
	margin-left: 15px; \
} \
.outdated { \
	float: right; \
	font-size: 11px; \
	margin-right: 15px; \
	margin-top: 5px; \
} \
');


// define the RESConsole class
var RESConsole = {
	// make the modules panel accessible to this class for updating (i.e. when preferences change, so we can redraw it)
	RESConsoleModulesPanel: createElementWithID('div', 'RESConsoleModulesPanel', 'RESPanel'),
	RESConsoleConfigPanel: createElementWithID('div', 'RESConsoleConfigPanel', 'RESPanel'),
	RESConsoleAboutPanel: createElementWithID('div', 'RESConsoleAboutPanel', 'RESPanel'),
	RESConsoleProPanel: createElementWithID('div', 'RESConsoleProPanel', 'RESPanel'),
	addConsoleLink: function() {
		var userMenu = document.querySelector('#header-bottom-right');
		if (userMenu) {
			var preferencesUL = userMenu.querySelector('UL');
			var separator = document.createElement('span');
			separator.setAttribute('class','separator');
			separator.innerHTML = '|';
			this.RESPrefsLink = document.createElement('a');
			this.RESPrefsLink.setAttribute('id','openRESPrefs');
			this.RESPrefsLink.setAttribute('href','javascript:void(0)');
			if (RESStorage.getItem('RESoutdated') == 'true') {
				this.RESPrefsLink.innerHTML = '[RES](u)';
			} else {
				this.RESPrefsLink.innerHTML = '[RES]';
			}
			this.RESPrefsLink.addEventListener('click', function(e) {
				e.preventDefault();
				RESConsole.open();
			}, true);
			insertAfter(preferencesUL, this.RESPrefsLink);
			insertAfter(preferencesUL, separator);
		}
	},
	resetModulePrefs: function() {
		prefs = {
			'userTagger': true,
			'betteReddit': true,
			'singleClick': true,
			'subRedditTagger': true,
			'uppersAndDowners': true,
			'keyboardNav': true,
			'commentPreview': true,
			'showImages': true,
			'showKarma': true,
			'usernameHider': false,
			'neverEndingReddit': false,
			'accountSwitcher': true,
			'styleTweaks': true,
			'filteReddit': true,
			'RESPro': false
		};
		this.setModulePrefs(prefs);
		return prefs;
	},
	getAllModulePrefs: function() {
		// get the stored preferences out first.
		if (RESStorage.getItem('RES.modulePrefs') != null) {
			var storedPrefs = safeJSON.parse(RESStorage.getItem('RES.modulePrefs'), 'RES.modulePrefs');
		} else if (RESStorage.getItem('modulePrefs') != null) {
			// Clean up old moduleprefs.
			var storedPrefs = safeJSON.parse(RESStorage.getItem('modulePrefs'), 'modulePrefs');
			RESStorage.removeItem('modulePrefs');
			this.setModulePrefs(storedPrefs);
		} else {
			// looks like this is the first time RES has been run - set prefs to defaults...
			storedPrefs = this.resetModulePrefs();
		}
		if (storedPrefs == null) {
			storedPrefs = {};
		}
		// create a new JSON object that we'll use to return all preferences. This is just in case we add a module, and there's no pref stored for it.
		var prefs = {};
		// for any stored prefs, drop them in our prefs JSON object.
		for (i in modules) {
			if (storedPrefs[i]) {
				prefs[i] = storedPrefs[i];
			} else if (storedPrefs[i] == null) {
				// looks like a new module, or no preferences. We'll default it to on.
				prefs[i] = true;
			} else {
				prefs[i] = false;
			}
		}
		if ((typeof(prefs) != 'undefined') && (prefs != 'undefined') && (prefs)) {
			return prefs;
		} 
	},
	getModulePrefs: function(moduleID) {
		if (moduleID) {
			var prefs = this.getAllModulePrefs();
			return prefs[moduleID];
		} else {
			alert('no module name specified for getModulePrefs');
		}
	},
	setModulePrefs: function(prefs) {
		if (prefs != null) {
			RESStorage.setItem('RES.modulePrefs', JSON.stringify(prefs));
			this.drawModulesPanel();
			return prefs;
		} else {
			alert('error - no prefs specified');
		}
	},
	container: RESConsoleContainer,
	create: function() {
		// create the console container
		RESConsoleContainer = createElementWithID('div', 'RESConsole');
		// hide it by default...
		RESConsoleContainer.style.display = 'none';
		// create a modal overlay
		modalOverlay = createElementWithID('div', 'modalOverlay');
		modalOverlay.addEventListener('click',function(e) {
			e.preventDefault();
			return false;
		}, true);
		document.body.appendChild(modalOverlay);
		// create the header
		RESConsoleHeader = createElementWithID('div', 'RESConsoleHeader');
		// create the top bar and place it in the header
		RESConsoleTopBar = createElementWithID('div', 'RESConsoleTopBar');
		this.logo = 'data:image/gif;base64,R0lGODlhPAAeAPcAADo6OlxcXSQkJDExMQ8PDwkJCRISEhwcHCgoKBAQEBYWFgQEBAcHBxQVFAICAtDT2pCSlyAgIvDz+2BhZf7//5KTlSIiIvPz87y8vJGRkf7+/jU1NRkZGScnJ6enp/79/WNjY+nr8rW2ulBQUB8fH0xMTBgYGD4+PvX19S8vL42OkN7e3uXl5f7//tXX3Pb29v9PAOvr69fX18XFxe3v98LCwmVlZZmanf9UAOfq8P9YAJKSkrGxseTk5FpaWoWGiP39/f5LACAgIENDQ0dHR56fokhISC0tLXp6ep2eoDk5Of9NALe4u1JSUnZ2dpOUltrc4aurq/adcYeHh9DS15SUl76+vv328u3w+PiVY1lZWvZxLsLDx0VFRfa1kcfIzXx8fGFiY/rYxZSUlP9VAPaVYfhcC5qbmurs9PxJAHFyc+zs7Pvq3/3//+/x+ezv9jg4OF9fX+/v7/tNAOLk6uDg4ODi6IqKimRkZLKysqqrrv369uPj4+jo6CkpKnBxcm1tbUZGRmprbBgYGfnJrjs7PPekdvhbBxcXGPZ9Pvh1NpaXmdLT2Pvr4flfFfzv5u/y+omKjI2Njebo76+vsUdHSPvn3NXV1fZtJoODg/r6+mtra9zc3MrKysnLz/jRuF5fYOrs8+zu9bi4uLu7u2BgYPeMU3h4eHh5e/ehc/nGrPLy8svM0eTm7dja346PkU9PT39/f3R1dmRkZZ6enpiYmLW1tfz8/LO0t/T09Ovu9erq6v///jk6Off39/i4ls7Q1PZ/Qfd/RS4tLtbW1lhYWP36+O7x+Pa1j+7x+YSFh8TExPlZCaOjo5CQkPz18be3t+7u7jc3N3R0dFZXV+Pl697g5uHh4aOkptvd4mxtboiJi29vcUBBQ5GSlPvp3qGipbOzs/nYxKmqrcXGypWVlf369/i8mU9PUBUWFvWWYejp6Ofn55mbnSoqKnV1df359WxsbE1NTbe4vP1IAP5IAP9JAGZmaGdnaDQ0NA0NDf9MAPpNAAAAAP////Dz/CH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzBCMDk1MzM5NkZGMTFERjgyQTZGNzE3MzdDRTMxNzUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzBCMDk1MzQ5NkZGMTFERjgyQTZGNzE3MzdDRTMxNzUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMEIwOTUzMTk2RkYxMURGODJBNkY3MTczN0NFMzE3NSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMEIwOTUzMjk2RkYxMURGODJBNkY3MTczN0NFMzE3NSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAAA8AB4AAAj/AP8JHEiwoMGDCBMqXMhwoIRjBnNU+QGlocWLBr316/WDC41/LvqlONEPHMaTFo+g0qOkQIEUBPD48+dsARaUOBHSYfBGoIRJT/qRmtnDAaOcSAmq8GOQxKaZtPrpSkr1QBKDX/oVMtJPBdWkIfpVO2jnnhZPX5PesJC27UBR2UQsOtBhnis0bpECk0WinwN9FjYMSOCg3yBB5CTkRQipyKx2bv5hQ9RPSYYaK1Zp8NcCRZ0ZtYYsMFBBMRN8ykLktUOAg5EOBhoQiMVipu3bt2PcUZBACAcifvqJcCugxC1/p/rZWHO7Be6ZFG5feNfPx8xM/XIYjPCg4AQICq05/+DkD0y/Zs/T+4uO29YCEP40CCmyvTvB7wpdLEARpZ+H2xoQkooqHzwnhiG/XHGbFf3s4M8wr9TnHXgJ0bBABkcEgNs5/OwzBzLszSQOM0HQU0aI/iBhAgYLsDIQBP3EGGM3D8goY0I39FOADLe1IQwMOsCgCIpSBKEDDo48chs7lFFzEHcTMsRNPs9lUQ8Z9piCmxdp4LDEFnvgNkQhCEF5H4UKRSLPc98Ec0giluAGjzpmYPLJcyCAUqZ9A+G3UBIApGcMG+b4wwtuHzTyTHqBqLEYFQvUpt6k6V1gACWLSZCOE5R2etsOCySz2D+49LMMbi8Ug0F6KzRxCW4yFJlQwagC/UHADLcBMUI/I2RAySh5nGFDAQL0cBsxJqBD60Bh9FNOrjycYAADCyxAwBFjXHCbBwxUotiyAo3TjzvhvHCbL7vw0Ucut2mCARz9zAouQaFoswAC0/AQQ3pyQIPEAAsE0Mq8B23TTwMMEBBYFyUQIY0ABiygQD+wEHxQBQYY0Ek0NUgCSCk+xBHPFBisc80BBghCa0AAOw==';
		this.loader = 'data:image/gif;base64,R0lGODlhHQAWAKUAAESatKTO3HSyxNTm7IzCzFymvOzy9Lza5IS6zNzu9GSuxEyivLTW3JzK1PT6/Hy6zMzi7Hy2zNzq7GSqvEyetKzS3HS2xJTG1Oz29MTe5Iy+zOTu9GyuxFSivLTa5JzO3Pz6/ESetKTS3NTq7IzC1FyqvLze5IS+zLTW5JzK3Mzm7Nzq9GSqxHS2zOz2/OTy9GyyxFSmvPz+/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQIBgAAACwAAAAAHQAWAAAG/kCZcEgsykAY1CuQgGyMUOiKdHkgrI9GwBTtVkgPbPh6ugSeXWLierXAOAqL9fSouNLDCod+Ukz8CgongxEHeEIBMIN0DCoHJwInGoMBRXcmKBskIyMIJZKSFwcmARokpxwkRBsnKSSLpgocHA+mJKYEJLkCMIYyCWawoKckCg8sJ8SnkA8LEjIuBwiDk2SmpoMdbhYkAgIPACwIDg4X1CQIMAosCjCnF2AcCx0TMAUUMJ8YMgYPya8wWHBoEfDBhYO6ODTQwCGFAhID0FRIZiuVBBcvGFC50OBEAQgOEjBwMMIAEYe5LhC4sE8IhAYcYTa40+VAyoNmDhwI0CBFbs8GHVi0jKKCggWcMn1+CMAzxQkLDtJgaIHugs8UKZhq5RAjgodDASaE0MCRqZYGDz4giGFhaBcDcC4UKBEAgYUAF+hZYODrUAYU8iacKMHCQiQFEQ4ZIREBwiwPD9pmSKDYCAYHWmRkOBC1sowgACH5BAgGAAAALAAAAAAdABYAhUSetKTO3NTm7HSyxIzCzLza5Ozy9FymvIS6zMTi5PT6/GSuxLTW3Nzu9JzK1Hy6zFSivKzW3Hy2zPT2/GSqvMzi7KzS3Nzq9HS2xJTG1MTe5Oz29Iy+zPz6/GyuxOTu9JzO3EyetKTS3NTq7IzC1Lze5FyqvIS+zMTi7LTW5JzK3FSmvGSqxMzm7HS2zOz2/Pz+/GyyxOTy9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+QJhwSCwKG4kLSFbYdIxQoyCTeSCsj0CmEu1GSNgr9kF9dYufB9YV8ywGj9MJYTGfhSLP/LSgLP4UcicuGndCFi6CDwwtBRwxHJEPKkUvEyMqMgEFBicQCHIcGQUlAQQkJyQuGUMKHSdUexyqFC4usyQEuCQkEiYlQgYkDoInHKnIGBIxD7y5JI8PBwIwMhqCx1fGzlcHCw+QDyYnISsErqjGcjELLAuQuVUxBxAUbiEsHhJmMqi4MfnYsCBDhUoMBBkWZFDWQIaQAM2cecgw4oWBFAQKnjhQQcaLCAZkGCBiIcapDCQyjBTSwoEDFQ4yEHDYJUWqghlAFCgQ4OVzywwsXEw4kyCEhIIuYcIMoKJnjAEKzrxAQEBC0pcBsmalcNCCIREQIGQQ1TPrWBEUIJyIeufDAgwnALgIgOGBhQcQ4JIoYIhlChMQBiBY4eHBgAEmVDzpK+TFiQAMWCBgsMDBiwAfGBPpoKAflwBcNMMIAgAh+QQIBgAAACwAAAAAHQAWAIVEmrSkztx0ssTU5uyMwsxcprzs8vS82uSEuszc7vRkrsScytTE4uxMory01uR8usz0+vx8tszc6uxkqrys0tx0tsSUxtTs9vTE3uSMvszk7vRsrsScztzM4uxUorxMnrSk0tzU6uyMwtRcqry83uSEvsycyty02uT8/vzc6vRkqsR0tszs9vzk8vRsssTM5uxUprwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/kCUcEgsCkODDqV1gECMUGMnIHpYrYFM4hmFOghWxENMtlhY3WJrNUZUXBuF4FGqB9BpYUAgLin+gHUlEQx5QhQrgg8OHQclAiUZJQ8WRSwaLBYpBwEQFh90kgsnGAElIqgRC0NOCxkWgiUWESMPKyIEJQS7uGANDkIQp7GSGRkig3MRqKgEIioREyEoCQfIkiVkyKgPAiMej3UFCAUNBE8LoXUuKn8CqBbILiP0Ki4fIxUVBigpsMci4mwQwI6SGQILAgZQcMpFCH4oAlRgFlBEChYtvphZUGLDgAEoDgyAAFGIgwjOLBCwcGHICwsLTCywIKBFGgcTzZgJcIBTacyYNEtwiYIBhqyNP2UGWGrBg4ChUC4ksyBT6dIAC1SACWAowAcXHBdgZWrBqwcLUKOkcPFgAwARCzaU3VCrRIUDhoRoMDGiQAQXMOa4mDCBQcm8LUp0EDEh5oQOL23mlcJSgwXJk1EEAQAh+QQIBgAAACwAAAAAHQAWAIVEmrSkztx0ssTU5uxcpry82uSMwszs8vSEusxMorSs1txkrsTE4uT0+vzk7vScytR8usx8tszc6uxkqrz09vxUory01tzM4uxMnrSs0tx0tsTE3uSUxtTs9vSMvsxsrsT8+vyczty02uREnrSk0tzU6uxcqry83uSMwtSEvsxMorzE4uzk8vScytzc6vRkqsRUpry01uTM5ux0tszs9vxsssT8/vwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/kCbcEgsCges2GlwAjWMUONGgYBUESkOikWJRgspK2QsTqE4XS+RJRDPap9FO0VvddTDjCCFXUwWgBN0KREyeEIBe3QQMTJgAh4pHjMoRRQDDQEbAxw0LRUzgw8FGwFmKCgIAUM0DidmgyktKYIzHiiRqCgGKBAJCkMcsZKSu2MfhLoGtx/NAzYuGcJ0HmPFqAgLJhgoGhEoBAIfIxxPGRCSkXCANbdnKQIvfiY1FaAQLDacxCg18gL+IHAYiMrCggcCBJCoceGOjQw1dKFYwMEFjSRnBhqA4IIBCBlN8g2JcWoghwNDZDx40OJBihcio2R4YcAkhxAFCgRgyTMLcEovDBbUHLiyZYsWOwNAABDhiZcDLzXwbBmg6s4ZD7AeapEAQS+kD6pyCOABgIkAP9WUiADBnksBATgQ0JBixgcGh4TQ8GBiAQQCJiBEWEBgAYtneYW44OCgxgILEDQ4IFEusRELGUDECNAAhGUbQQAAIfkECAYAAAAsAAAAAB0AFgCFRJ60pM7c1ObsdLLEvNrkjMLM7PL0XKa8hLrMrNbcxOLk9Pr8ZK7E3O70nMrUVKK8fLrMfLbM9Pb8ZKq8tNbczOLsTJ60rNLc3Or0dLbExN7klMbU7Pb0jL7M/Pr8bK7E5O70nM7ctNrkpNLc1OrsvN7kjMLUXKq8hL7MxOLsnMrcVKa8ZKrEtNbkzObsTKK8dLbM7Pb8/P78bLLE5PL0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv5AmXBILMo8glhAoHEtJMaoUSOCoCDYjmljiEmlFSwEISajUKrFtwiakRGZj3xmRXU23rUwAUMhUCwMgoJnVy56QgEfhRAJFSUoAx12MCZFCykSIgEgKgIBJ312DgQaASgmqRABQzEVAggFhSgOJh8QESZ2uiYFvSgPF0MXf4UdkyYdVgxXqQUbWgMHMyQyGBsbs2apvQgrLBZjGSYsoRYbHjIEEWe6Mx+BM1pbBRkTHwwrHwcWGSgNMirwSgWPQYYZLCBgywahAoMCCFgkiNBCjYwWM3z5+rABQwwaLZ5tcACNhgYDDUQ8IZJg3oZnBoZUcEBTBYwDNNYEWCESW3YIAgRGOFAxlGaHPGByLaRZ00EAFQFmAECR7gsHCA8g1FQBNYDXlypYqEC04cCGCKucBqB5YQCADxdAICIRCcCEqBCITTAB4R4GREJiZGARIcODRTNOnEDQoATgIQIIKGCR4cIHExgQhHhsRMKFQyYIyFhQFXAQACH5BAgGAAAALAAAAAAdABYAhUSatKTO3HSyxNTm7IzCzOzy9FymvLza5IS6zPT6/GSuxLTW3Nzu9JzK1MTi7EyitHy6zHy2zNzq7PT2/GSqvKzS3HS2xJTG1Oz29MTe5Iy+zPz6/GyuxLTa5JzO3Mzi7FSivEyetKTS3NTq7IzC1FyqvLze5IS+zLTW5OTy9JzK3Nzq9GSqxHS2zOz2/Pz+/GyyxMzm7FSmvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+wJdwSCy+EpJUgLFgFBLGqPGDgpwgEATptHRJpTFLdoxFZEWTb3ElMCMsHAVHfDppSFC1ENU6IU4KLAqDCnV+Dl8bQw2FdRAVMQcnAnYnLRdGDgwjFykVGQEclHYNB6B3JCQWIkMTKBIalXUXFzAtWidbBCS7BBolFUIJGVaGsbEkERAKf6mpuxEPHCMvDHcEdRpYuc4EMgohFhowJxYhLSAkLxsOVrEnMHEsMHcXJBoRBnIlLCwhMBckvPjQLBUMQS0OQqB1AV4MZRdKBLgQYIgJC7xScbgwYkIKFBpoNaCF4UNHFCkSKBIiApW9CwWGfFBxoYEKAQZiflEBggB1Q4oHDgRoYLMoBC9fBuRiOFKFTRUBoiowoE6NCxghThB1CtVD1JoaDFTUQwIgBy4Nog4NYEDGQgZ6ql2gAABCAxYEAgiA0QCGARg646bgACOCvwgnKBigECBoXCIDGDSgUJNFBRMwTDyO4snFiBMMNqTYLCQIACH5BAgGAAAALAAAAAAdABYAhUSetKTO3NTm7HSyxLza5Ozy9IzCzFymvIS6zKzW3Nzu9MTi5PT6/GSuxJzK1Hy6zFSivNzq7Hy2zPT2/GSqvLTW3Mzi7KzS3HS2xMTe5Oz29JTG1Iy+zOTu9Pz6/GyuxJzO3LTa5EyetKTS3NTq7Lze5IzC1FyqvIS+zMTi7JzK3FSmvNzq9GSqxLTW5Mzm7HS2zOz2/OTy9Pz+/GyyxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+wJlwSCzOGB3WpTOKKRjGqFEQeKAeD4ThQXhNpFILDJHFlsmhArhIgmFRGNrnQ0Og7ibPekgYoOwNFA2DDXd3GWB6QionhhIVFgQofhwcMA5GFikyJgIpFwEDMHccGwQlARwmJhw0AUMMFxYOKByGpRI0KKsmBr2/KDQuQjIsdoa1uyYPGB+jqr4mfyItETMFyYZktau+LRQrNCYYEigAA41HKcfSNA0tDTSqG9IwEA0fFAcfIicqLDMslOP1oYUzGi0ebFiIokEFBzQcFHLh4MuMBTC6mfhgIkIMGS5KLVxYgEUGBhlIeFA0Q4WWVQs1DJm1QYUDCRRkrAlwwMR9yA0BCBAY4UCFChABDAyIsYbElpEONhQtGiCAgw8DTEABE+MABAMOpqqoWtVBABoQEuyZsQzFiZpmrVqFgOEBBwVrO2yAIGIDggZhP5Q6sOLB1rUkPkxaAQGFhAYnGpQwtZaIghgwHD5okOGqApaVh0TI4OECBwYxOoQWEgQAIfkECAYAAAAsAAAAAB0AFgCFTJ60rNLcfLbM3OrsZKq8xN7klMbU9Pb85PL0bLLEtNrkhL7MzObsVKa8nM7ctNbc5O70bK7EzOLs/P787PL0dLLEjL7MVKK8hLrM3O70ZK7ExOLknMrU/Pr8vNrk1ObsXKa8pM7c7Pb0dLbEjMLMTKK8rNbcfLrM3Or0ZKrE9Pr8tNbkxOLsnMrcvN7k1OrsXKq8pNLc7Pb8dLbMjMLUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AiXBILE4OIpbnFZC9OsaoEcVZLE6Yk+VUcKmk0sIMSz6RMQUIuPgyZwUJTaRysi4M37XQM8NYNQSAGhp2Cx5gUEIcMFZZDwweCxULFgsCDkYZKyItCigBBjMCdi0rBSE0qTQaHEQBKyF+dn4nGhaptyQ0t1sCK0IZL5V2FpWpGAkVGiQLqbpWDQ0DR8NWW3W4NCQVMIMkJxU0ADARCx0qCpW3C3EpGgm3BjSSACkJEQAJFyAOKBMfI5rNi5AiwgyCJwwoXBDBQAANBiokkMBBhhAWGFStMvBCBoUHdwxwMLAAwYEVB16wKGJghCqFFIYwaMGBQwsBM2KCCRCBhnZChSE8eAhRk2aLWiLWvFgw4udIoy2IhqhAgkQeKRQapFBo02aIr0RbNChxSA/JCiC6fuUQggQIGuAy6JlAYcEFGC3mhGAXwgKAtDrnSkhAA9+yCDBSjFgxosBcIhQQEDjxQMOMDWNUWHzMBoUKGgEmDFDDeUIQACH5BAgGAAAALAAAAAAdABYAhUSetKTO3NTm7HSyxOzy9IzCzLza5FymvIS6zNzu9PT6/MTi5GSuxLTW3JzK1FSivHy6zNzq7Hy2zPT2/GSqvMzi7EyetKzS3HS2xOz29JTG1MTe5Iy+zOTu9Pz6/GyuxLTa5JzO3KTS3NTq7IzC1Lze5FyqvIS+zMTi7LTW5JzK3FSmvNzq9GSqxMzm7EyivHS2zOz2/OTy9Pz+/GyyxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+wJlwSCzOFAqQYGMgCIxQaIekgVgRJwjKoIhGDVcIwgrJngwdb3EEkYwxn/igPA511cLUwMzo+0+ACCBqHkIqFIBZDRUGJ3scHBABRhMBMikhBCkQGFgcJw4gGwEFJCckDBpEKQ4XiaeOEC2nHCQcpbUkVg1CLBsar5+fpgwwLaYkyaYnFC8RR8CAn2MnuSQFEAcDDIAMBQcvHxAeCgGmtSc0fjS5Ggg0ACYfNA8UJg8OaQkDBcMffQNotICgoWABGBAMMPhkYsMFGUJKnFKWikUMTScKOiAxoIMHECwybCii4YOyggSGVHCgwoGDahC9bCpQsGAIAwZEtGSpgsFwihhqXASs6ZKlywAtQSG4E4XAARgaXKpoqSKAVXMWDozEA+xACwcarlqFQMMBDRpp8MSA8ACDhhUnAgyQIGKABQopRuAZsqFaCwswTpigQCPjB717hyjYYKIqBRIpKATwkDYxkRETRiAQ4GFBTMtBAAAh+QQIBgAAACwAAAAAHQAWAIVEmrSkztx0ssTU5uyMwsxcpry82uTs8vSEusys1txkrsT0+vxMorTc7vScytTE4ux8usx8tsxkqrz09vy01txMnrSs0tx0tsTc6vSUxtTE3uTs9vSMvsxsrsT8+vxUorzk7vScztzM4uy02uREnrSk0tzU6uyMwtRcqry83uSEvsycytxkqsS01uR0tszs9vxsssT8/vxUprzk8vTM5uwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/sCYcEgsxhYTSoMiwpiMUChIlYFYVZCTwRDttrAISFiM5bRA3SIGDLnAOgoBRIUtLdLDRCesUrAUEgoKKghYXHgxAYN0EBQ0BioCKhyEAUULHhYiNBkgGhEdk5MZBhoBlCcnCidEIicWdIUnKh0XLJOpBCqpqRcuhxglAXR0lKgnLBAou7kZWAIMGEcBhaJ8vLoqMhEKEAQdEDAA4B4LDrMcszCCLDDpGVUdFQXtMgUKBScbMQcuzCowWHQQEBACvAwnEMCwEOFCBgkWUswQMkIFgXQnOmQw8eLACA4HCSgYEOPBAw8iXhDJwCIVwgwHhojIsMLBCngqu0A6CC/AdJYSNoPK+LCvC40CMA46oGkzRIAQSx1EuNNlAwsOBDIEXeE0gNcIJBRoQBRAQAUXN716lZq1gICJeF7AyBfhg1aNAVAw6JBiLKIYKQJc+CADwQUUEgRwcAEj5l8hHlZ0gAQxgwIaM6Q9JtIgRsUFMwwUfRwEADs=';
		RESConsoleTopBar.innerHTML = '<img id="RESLogo" src="'+this.logo+'"><h1>Reddit Enhancement Suite Console</h1>';
		RESConsoleHeader.appendChild(RESConsoleTopBar);
		/*this.RESCheckUpdateButton = createElementWithID('div','RESCheckForUpdate');
		this.RESCheckUpdateButton.innerHTML = 'v' + RESVersion + ' [check for update]';
		this.RESCheckUpdateButton.addEventListener('click',function(e) {
			RESUtils.checkForUpdate(true);
		}, true);
		RESConsoleTopBar.appendChild(this.RESCheckUpdateButton);*/
		RESSubredditLink = createElementWithID('a','RESConsoleSubredditLink');
		RESSubredditLink.innerHTML = '/r/Enhancement';
		RESSubredditLink.setAttribute('href','http://reddit.com/r/Enhancement');
		RESSubredditLink.setAttribute('alt','The RES Subreddit');
		RESConsoleTopBar.appendChild(RESSubredditLink);
		// create the close button and place it in the header
		RESClose = createElementWithID('span', 'RESClose');
		RESClose.innerHTML = '&nbsp;';
		RESClose.addEventListener('click',function(e) {
			e.preventDefault();
			RESConsole.close();
		}, true);
		RESConsoleTopBar.appendChild(RESClose);
		// create the help button and place it in the header
		RESHelp = createElementWithID('span', 'RESHelp');
		RESHelp.innerHTML = '&nbsp;';
		RESHelp.addEventListener('click',function(e) {
			e.preventDefault();
			modules['RESTips'].randomTip();
		}, true);
		RESConsoleTopBar.appendChild(RESHelp);
		if (RESStorage.getItem('RESoutdated') == 'true') {
			var RESOutdated = document.createElement('div');
			RESOutdated.setAttribute('class','outdated');
			RESOutdated.innerHTML = 'There is a new version of RES! <a target="_blank" href="http://reddit.honestbleeps.com/download">click to grab it</a>';
			RESConsoleTopBar.appendChild(RESOutdated); 
		}
		// create the menu
		if (RESStorage.getItem('RESPro_secret') == 'true') {
			var menuItems = new Array('Enable Modules','Configure Modules','RES Pro','About RES');
		} else {
			var menuItems = new Array('Enable Modules','Configure Modules','About RES');
		}
		RESMenu = createElementWithID('ul', 'RESMenu');
		for (i in menuItems) {
			thisMenuItem = document.createElement('li');
			thisMenuItem.innerHTML = menuItems[i];
			thisMenuItem.setAttribute('id', 'Menu-' + menuItems[i]);
			thisMenuItem.addEventListener('click', function(e) {
				e.preventDefault();
				RESConsole.menuClick(this);
			}, true);
			RESMenu.appendChild(thisMenuItem);
		}
		RESConsoleHeader.appendChild(RESMenu);
		RESConsoleContainer.appendChild(RESConsoleHeader);
		// Store the menu items in a global variable for easy access by the menu selector function.
		RESMenuItems = RESMenu.querySelectorAll('li');
		// Create a container for each management panel
		RESConsoleContent = createElementWithID('div', 'RESConsoleContent');
		RESConsoleContainer.appendChild(RESConsoleContent);
		this.drawModulesPanel();
		// Draw the config panel
		this.drawConfigPanel();
		// Draw the about panel
		this.drawAboutPanel();
		// Draw the RES Pro panel
		if (RESStorage.getItem('RESPro_secret') == 'true') {
			this.drawProPanel();
		}
		// Set an easily accessible array of the panels so we can show/hide them as necessary.
		RESConsolePanels = RESConsoleContent.querySelectorAll('.RESPanel');
		// Okay, the console is done. Add it to the document body.
		document.body.appendChild(RESConsoleContainer);
	},
	drawModulesPanel: function() {
		// Create the module management panel (toggle modules on/off)
		RESConsoleModulesPanel = this.RESConsoleModulesPanel;
		RESConsoleModulesPanel.innerHTML = '';
		var prefs = this.getAllModulePrefs();
		var modulesPanelHTML = '';
		for (i in modules) {
			(prefs[i]) ? thisChecked = 'CHECKED' : thisChecked = '';
			if (typeof(modules[i]) != 'undefined') {
				thisDesc = modules[i].description;
				modulesPanelHTML += '<p class="moduleListing"><label for="'+i+'">' + modules[i].moduleName + ':</label> <input type="checkbox" name="'+i+'" '+thisChecked+' value="true"> <span class="moduleDescription">'+thisDesc+'</span></p>';
			}
		}
		RESConsoleModulesPanel.innerHTML = modulesPanelHTML;
		var RESConsoleModulesPanelButtons = createElementWithID('span','RESConsoleModulesPanelButtons');
		var RESSavePrefsButton = createElementWithID('input','savePrefs');
		RESSavePrefsButton.setAttribute('type','button');
		RESSavePrefsButton.setAttribute('name','savePrefs');
		RESSavePrefsButton.setAttribute('value','save');
		RESSavePrefsButton.addEventListener('click', function(e) {
			e.preventDefault();
			var modulePrefsCheckboxes = RESConsole.RESConsoleModulesPanel.querySelectorAll('input[type=checkbox]');
			var prefs = {};
			for (i=0, len=modulePrefsCheckboxes.length;i<len;i++) {
				var thisName = modulePrefsCheckboxes[i].getAttribute('name');
				var thisChecked = modulePrefsCheckboxes[i].checked;
				prefs[thisName] = thisChecked;
			}
			RESConsole.setModulePrefs(prefs);
			RESConsole.close();
		}, true);
		RESConsoleModulesPanelButtons.appendChild(RESSavePrefsButton);
		var RESResetPrefsButton = createElementWithID('input','resetPrefs');
		RESResetPrefsButton.setAttribute('type','button');
		RESResetPrefsButton.setAttribute('name','resetPrefs');
		RESResetPrefsButton.setAttribute('value','reset to default');
		RESConsoleModulesPanelButtons.appendChild(RESResetPrefsButton);
		RESResetPrefsButton.addEventListener('click', function(e) {
			e.preventDefault();
			RESConsole.resetModulePrefs();
		}, true);
		RESConsoleModulesPanel.appendChild(RESConsoleModulesPanelButtons);
		var clearDiv = document.createElement('p');
		clearDiv.setAttribute('class','clear');
		clearDiv.style.display = 'block';
		RESConsoleModulesPanel.appendChild(clearDiv);
		RESConsoleContent.appendChild(RESConsoleModulesPanel);
	},
	drawConfigPanel: function() {
		RESConsoleConfigPanel = createElementWithID('div', 'RESConsoleConfigPanel', 'RESPanel');
		RESConfigPanelSelectorLabel = document.createElement('label');
		RESConfigPanelSelectorLabel.setAttribute('for','RESConfigPanelSelector');
		RESConfigPanelSelectorLabel.innerHTML = 'Configure module: ';
		RESConsoleConfigPanel.appendChild(RESConfigPanelSelectorLabel);
		this.RESConfigPanelSelector = createElementWithID('select', 'RESConfigPanelSelector');
		thisOption = document.createElement('option');
		thisOption.setAttribute('value','');
		thisOption.innerHTML = 'Select Module';
		this.RESConfigPanelSelector.appendChild(thisOption);
		var moduleList = Array();
		for (i in modules) {
			moduleList.push(i);
		}
		moduleList.sort();
		for (var i=0, len=moduleList.length; i<len; i++) {
			var thisModule = moduleList[i];
			thisOption = document.createElement('option');
			thisOption.value = modules[thisModule].moduleID;
			thisOption.innerHTML = modules[thisModule].moduleName;
			this.RESConfigPanelSelector.appendChild(thisOption);
		}
		this.RESConfigPanelSelector.addEventListener('change', function(e) {
			thisModule = this.options[this.selectedIndex].value;
			if (thisModule != '') {
				RESConsole.drawConfigOptions(thisModule);
			}
		}, true);
		RESConsoleConfigPanel.appendChild(this.RESConfigPanelSelector);
		RESConfigPanelOptions = createElementWithID('div', 'RESConfigPanelOptions');
		RESConsoleConfigPanel.appendChild(RESConfigPanelOptions);
		RESConsoleContent.appendChild(RESConsoleConfigPanel);
	},
	drawOptionInput: function(moduleID, optionName, optionObject, isTable) {
		switch(optionObject.type) {
			case 'text':
				// text...
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','text');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				break;
			case 'password':
				// password...
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','password');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				break;
			case 'boolean':
				// checkbox
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','checkbox');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				if (optionObject.value) {
					thisOptionFormEle.setAttribute('checked',true);
				}
				break;
			case 'enum':
				// radio buttons
				if (typeof(optionObject.values) == 'undefined') {
					alert('misconfigured enum option in module: ' + moduleID);
				} else {
					var thisOptionFormEle = createElementWithID('div', optionName);
					thisOptionFormEle.setAttribute('class','enum');
					for (var j=0;j<optionObject.values.length;j++) {
						var thisDisplay = optionObject.values[j].display;
						var thisValue = optionObject.values[j].value;
						thisOptionFormSubEle = createElementWithID('input', optionName+'-'+j);
						thisOptionFormSubEle.setAttribute('type','radio');
						thisOptionFormSubEle.setAttribute('name',optionName);
						thisOptionFormSubEle.setAttribute('moduleID',moduleID);
						thisOptionFormSubEle.setAttribute('value',optionObject.values[j].value);
						var nullEqualsEmpty = ((optionObject.value == null) && (optionObject.values[j].value == ''));
						// we also need to check for null == '' - which are technically equal.
						if ((optionObject.value == optionObject.values[j].value) || nullEqualsEmpty)  {
							thisOptionFormSubEle.setAttribute('checked','checked');
						}
						var thisOptionFormSubEleText = document.createTextNode(' ' + optionObject.values[j].name + ' ');
						thisOptionFormEle.appendChild(thisOptionFormSubEle);
						thisOptionFormEle.appendChild(thisOptionFormSubEleText);
					}
				}
				break;
			case 'keycode':
				// keycode - shows a key value, but stores a keycode and possibly shift/alt/ctrl combo.
				var thisOptionFormEle = createElementWithID('input', optionName);
				thisOptionFormEle.setAttribute('type','text');
				thisOptionFormEle.setAttribute('class','keycode');
				thisOptionFormEle.setAttribute('moduleID',moduleID);
				thisOptionFormEle.setAttribute('value',optionObject.value);
				break;
			default:
				console.log('misconfigured option in module: ' + moduleID);
				break;
		}
		if (isTable) {
			thisOptionFormEle.setAttribute('tableOption','true');
		}
		return thisOptionFormEle;
	},
	drawConfigOptions: function(moduleID) {
		var thisOptions = RESUtils.getOptions(moduleID);
		var optCount = 0;
		RESConfigPanelOptions.setAttribute('style','display: block;');
		RESConfigPanelOptions.innerHTML = '';
		for (var i in thisOptions) {
			if (!(thisOptions[i].noconfig)) {
				optCount++;
				var thisOptionContainer = createElementWithID('div', null, 'optionContainer');
				var thisLabel = document.createElement('label');
				thisLabel.setAttribute('for',i);
				thisLabel.innerHTML = i;
				thisOptionDescription = createElementWithID('div', null, 'optionDescription');
				thisOptionDescription.innerHTML = thisOptions[i].description;
				thisOptionContainer.appendChild(thisLabel);
				if (thisOptions[i].type == 'table') {
					// table - has a list of fields (headers of table), users can add/remove rows...
					if (typeof(thisOptions[i].fields) == 'undefined') {
						alert('misconfigured table option in module: ' + moduleID);
					} else {
						// get field names...
						var fieldNames = new Array();
						// now that we know the field names, get table rows...
						var thisTable = document.createElement('table');
						thisTable.setAttribute('moduleID',moduleID);
						thisTable.setAttribute('optionName',i);
						thisTable.setAttribute('class','optionsTable');
						var thisThead = document.createElement('thead');
						var thisTableHeader = document.createElement('tr');
						thisTable.appendChild(thisThead);
						for (var j=0;j<thisOptions[i].fields.length;j++) {
							fieldNames[j] = thisOptions[i].fields[j].name;
							var thisTH = document.createElement('th');
							thisTH.innerHTML = thisOptions[i].fields[j].name;
							thisTableHeader.appendChild(thisTH);
						}
						thisThead.appendChild(thisTableHeader);
						thisTable.appendChild(thisThead);
						var thisTbody = document.createElement('tbody');
						thisTbody.setAttribute('id','tbody_'+i);
						for (var j=0;j<thisOptions[i].value.length;j++) {
							var thisTR = document.createElement('tr');
							for (var k=0;k<thisOptions[i].fields.length;k++) {
								var thisTD = document.createElement('td');
								thisOpt = thisOptions[i].fields[k];
								thisOpt.value = thisOptions[i].value[j][k];
								var thisOptInputName = thisOpt.name + '_' + j;
								var thisTableEle = this.drawOptionInput(moduleID, thisOptInputName, thisOpt, true);
								thisTD.appendChild(thisTableEle);
								thisTR.appendChild(thisTD);
							}
							thisTbody.appendChild(thisTR);
						}
						thisTable.appendChild(thisTbody);
						var thisOptionFormEle = thisTable;
					}
					thisOptionContainer.appendChild(thisOptionDescription);
					thisOptionContainer.appendChild(thisOptionFormEle);
					// Create an "add row" button...
					var addRowButton = document.createElement('input');
					addRowButton.setAttribute('type','button');
					addRowButton.setAttribute('value','Add Row');
					addRowButton.setAttribute('optionName',i);
					addRowButton.setAttribute('moduleID',moduleID);
					addRowButton.addEventListener('click',function() {
						var optionName = this.getAttribute('optionName');
						var thisTbodyName = 'tbody_' + optionName;
						var thisTbody = document.getElementById(thisTbodyName);
						var newRow = document.createElement('tr');
						for (var i=0, len=modules[moduleID].options[optionName].fields.length;i<len;i++) {
							var newCell = document.createElement('td');
							var thisOpt = modules[moduleID].options[optionName].fields[i];
							thisOpt.value = '';
							var thisInput = RESConsole.drawOptionInput(moduleID, optionName, thisOpt, true);
							newCell.appendChild(thisInput);
							newRow.appendChild(newCell);
						}
						thisTbody.appendChild(newRow);
					}, true);
					thisOptionContainer.appendChild(addRowButton);
				} else {
					var thisOptionFormEle = this.drawOptionInput(moduleID, i, thisOptions[i]);
					thisOptionContainer.appendChild(thisOptionFormEle);
					thisOptionContainer.appendChild(thisOptionDescription);
				}
				RESConfigPanelOptions.appendChild(thisOptionContainer);
			}
		}
		// run through any keycode options and mask them for input...
		var keyCodeInputs = RESConfigPanelOptions.querySelectorAll('.keycode');
		if (keyCodeInputs.length > 0) {
			this.keyCodeModal = createElementWithID('div','keyCodeModal');
			this.keyCodeModal.innerHTML = 'Press a key (or combination with shift, alt and/or ctrl) to assign this action.';
			document.body.appendChild(this.keyCodeModal);
			for (var i=0, len=keyCodeInputs.length;i<len;i++) {
				keyCodeInputs[i].style.border = '1px solid red';
				keyCodeInputs[i].style.display = 'none';
				thisKeyCodeDisplay = createElementWithID('input',keyCodeInputs[i].getAttribute('id')+'-display');
				thisKeyCodeDisplay.setAttribute('type','text');
				thisKeyCodeDisplay.setAttribute('capturefor',keyCodeInputs[i].getAttribute('id'));
				thisKeyCodeDisplay.setAttribute('displayonly','true');
				thisKeyCodeDisplay.setAttribute('value',RESUtils.niceKeyCode(keyCodeInputs[i].value.toString()));
				// thisKeyCodeDisplay.disabled = true;
				thisKeyCodeDisplay.addEventListener('focus',function(e) {
					window.addEventListener('keydown', function(e) {
						if ((RESConsole.captureKey) && (e.keyCode != 16) && (e.keyCode != 17) && (e.keyCode != 18)) {
							// capture the key, display something nice for it, and then close the popup...
							e.preventDefault();
							document.getElementById(RESConsole.captureKeyID).value = e.keyCode + ',' + e.altKey + ',' + e.ctrlKey + ',' + e.shiftKey + ',' + e.metaKey;
							var keyArray = Array(e.keyCode, e.altKey, e.ctrlKey, e.shiftKey, e.metaKey);
							document.getElementById(RESConsole.captureKeyID+'-display').value = RESUtils.niceKeyCode(keyArray);
							RESConsole.keyCodeModal.style.display = 'none';
							RESConsole.captureKey = false;
						}
					}, true);
					thisXY=RESUtils.getXYpos(this);
					RESConsole.keyCodeModal.setAttribute('style', 'display: block; top: ' + thisXY.y + 'px; left: ' + thisXY.x + 'px;');
					// show dialog box to grab keycode, but display something nice...
					RESConsole.keyCodeModal.style.display = 'block';
					RESConsole.captureKey = true;
					RESConsole.captureKeyID = this.getAttribute('capturefor');
				}, true);
				insertAfter(keyCodeInputs[i], thisKeyCodeDisplay);
			}
		}
		var thisSaveButton = createElementWithID('input','moduleOptionsSave');
		thisSaveButton.setAttribute('type','button');
		thisSaveButton.setAttribute('value','save');
		thisSaveButton.addEventListener('click',function(e) {
			e.preventDefault();
			var panelOptionsDiv = document.getElementById('RESConfigPanelOptions');
			// first, go through inputs that aren't a part of a "table of options"...
			var inputs = panelOptionsDiv.querySelectorAll('input');
			for (var i=0, len=inputs.length;i<len;i++) {
				// save values of any inputs onscreen, but skip ones with 'capturefor' - those are display only.
				if ((inputs[i].getAttribute('type') != 'button') && (inputs[i].getAttribute('displayonly') != 'true') && (inputs[i].getAttribute('tableOption') != 'true')) {
					// get the option name out of the input field id - unless it's a radio button...
					if (inputs[i].getAttribute('type') == 'radio') {
						var optionName = inputs[i].getAttribute('name');
					} else {
						var optionName = inputs[i].getAttribute('id');
					}
					// get the module name out of the input's moduleid attribute
					var moduleID = inputs[i].getAttribute('moduleID');
					if (inputs[i].getAttribute('type') == 'checkbox') {
						(inputs[i].checked) ? optionValue = true : optionValue = false;
					} else if (inputs[i].getAttribute('type') == 'radio') {
						if (inputs[i].checked) {
							var optionValue = inputs[i].value;
						}
					} else {
						// check if it's a keycode, in which case we need to parse it into an array...
						if ((inputs[i].getAttribute('class')) && (inputs[i].getAttribute('class').indexOf('keycode') >= 0)) {
							var tempArray = inputs[i].value.split(',');
							// convert the internal values of this array into their respective types (int, bool, bool, bool)
							var optionValue = Array(parseInt(tempArray[0]), (tempArray[1] == 'true'), (tempArray[2] == 'true'), (tempArray[3] == 'true'), (tempArray[4] == 'true'));
						} else {
							var optionValue = inputs[i].value;
						}
					}
					if (typeof(optionValue) != 'undefined') {
						RESUtils.setOption(moduleID, optionName, optionValue);
					}
				}
			}
			// Check if there are any tables of options on this panel...
			var optionsTables = panelOptionsDiv.querySelectorAll('.optionsTable');
			if (typeof(optionsTables) != 'undefined') {
				// For each table, we need to go through each row in the tbody, and then go through each option and make a multidimensional array.
				// For example, something like: [['foo','bar','baz'],['pants','warez','cats']]
				for (i=0, len=optionsTables.length;i<len;i++) {
					var moduleID = optionsTables[i].getAttribute('moduleID');
					var optionName = optionsTables[i].getAttribute('optionName');
					var thisTBODY = optionsTables[i].querySelector('tbody');
					var thisRows = thisTBODY.querySelectorAll('tr');
					// check if there are any rows...
					if (typeof(thisRows) != 'undefined') {
						// go through each row, and get all of the inputs...
						var optionMulti = Array();
						var optionRowCount = 0;
						for (j=0;j<thisRows.length;j++) {
							var optionRow = Array();
							var inputs = thisRows[j].querySelectorAll('input');
							var notAllBlank = false;
							for (k=0;k<inputs.length;k++) {
								// get the module name out of the input's moduleid attribute
								var moduleID = inputs[k].getAttribute('moduleID');
								if (inputs[k].getAttribute('type') == 'checkbox') {
									(inputs[k].checked) ? optionValue = true : optionValue = false;
								} else if (inputs[k].getAttribute('type') == 'radio') {
									if (inputs[k].checked) {
										var optionValue = inputs[k].value;
									}
								} else {
									// check if it's a keycode, in which case we need to parse it into an array...
									if ((inputs[k].getAttribute('class')) && (inputs[k].getAttribute('class').indexOf('keycode') >= 0)) {
										var tempArray = inputs[k].value.split(',');
										// convert the internal values of this array into their respective types (int, bool, bool, bool)
										var optionValue = Array(parseInt(tempArray[0]), (tempArray[1] == 'true'), (tempArray[2] == 'true'), (tempArray[3] == 'true'));
									} else {
										var optionValue = inputs[k].value;
									}
								}
								if (optionValue != '') {
									notAllBlank = true;
								}
								optionRow[k] = optionValue;
							}
							// just to be safe, added a check for optionRow != null...
							if ((notAllBlank) && (optionRow != null)) {
								optionMulti[optionRowCount] = optionRow;
								optionRowCount++;
							}
						}
						if (optionMulti == null) {
							optionMulti = [];
						}
						// ok, we've got all the rows... set the option.
						if (typeof(optionValue) != 'undefined') {
							RESUtils.setOption(moduleID, optionName, optionMulti);
						}
					}
				}
			}
			
			var statusEle = document.getElementById('moduleOptionsSaveStatus');
			statusEle.innerHTML = 'Options have been saved...';
			statusEle.setAttribute('style','display: block; opacity: 1');
			RESUtils.fadeElementOut(statusEle, 0.1)
		}, true);
		RESConfigPanelOptions.appendChild(thisSaveButton);
		var thisSaveStatus = createElementWithID('div','moduleOptionsSaveStatus','saveStatus');
		RESConfigPanelOptions.appendChild(thisSaveStatus);
		if (optCount == 0) {
			RESConfigPanelOptions.innerHTML = 'There are no configurable options for this module';
		}
	},
	drawAboutPanel: function() {
		RESConsoleAboutPanel = this.RESConsoleAboutPanel; 
		var AboutPanelHTML = ' \
<p>Author: <a target="_blank" href="http://reddit.honestbleeps.com/">honestbleeps</a><br></p> \
<p>Description: Reddit Enhancement Suite is a collection of modules that make browsing reddit a bit nicer.</p> \
<p>License: Reddit Enhancement Suite is released under the <a target="_blank" href="http://www.gnu.org/licenses/gpl-3.0.html">GPL v3.0</a>.</p> \
<p>It\'s built with <a target="_blank" href="http://reddit.honestbleeps.com/api">an API</a> that allows you to contribute and include your own modules!</p> \
<p>If you\'ve got bug reports, you\'d like to discuss RES, or you\'d like to converse with other users, please see the <a target="_blank" href="http://www.reddit.com/r/Enhancement/">Enhancement subreddit.</a> </p> \
<p>If you want to contact me directly with suggestions, bug reports or just want to say you appreciate the work, an <a href="mailto:steve@honestbleeps.com">email</a> would be great.</p> \
<p>If you really, really like the work, a contribution would be much appreciated.</p> \
<p> \
<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="S7TAR7QU39H22"><input type="image" src="https://www.paypal.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!"><img alt="" border="0" src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1"></form> \
</p> \
<p></p> \
<p> \
			Or use Google Checkout: \
			<form action="https://checkout.google.com/api/checkout/v2/checkoutForm/Merchant/474530516020369" id="BB_BuyButtonForm" method="post" name="BB_BuyButtonForm" target="_top"> \
				<input name="item_name_1" type="hidden" value="Purchase - Reddit Enhancement Suite"/> \
				<input name="item_description_1" type="hidden" value="purchase"/> \
				<input name="item_quantity_1" type="hidden" value="1"/> \
				$<input name="item_price_1" type="text" value="" size="2" /> \
				<input name="item_currency_1" type="hidden" value="USD"/> \
				<input name="_charset_" type="hidden" value="utf-8"/> \
				<input alt="" src="https://checkout.google.com/buttons/buy.gif?merchant_id=474530516020369&amp;w=117&amp;h=48&amp;style=white&amp;variant=text&amp;loc=en_US" type="image"/> \
			</form> \
</p> \
<p><strong>Note:</strong> Reddit Enhancement Suite will check, at most once a day, to see if a new version is available.  No data about you is sent to me nor is it stored.</p> \
		'
		RESConsoleAboutPanel.innerHTML = AboutPanelHTML;
		RESConsoleContent.appendChild(RESConsoleAboutPanel);
	},
	drawProPanel: function() {
		RESUtils.addCSS('.RESButton { margin: 5px; padding: 3px; border: 1px solid #999999; width: 120px; cursor: pointer; border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px 5px 5px 5px;  }');
		RESUtils.addCSS('.RESButton:hover { background-color: #DDDDDD;  }');
		RESConsoleProPanel = this.RESConsoleProPanel;
		var proPanelHeader = document.createElement('div');
		proPanelHeader.innerHTML = 'RES Pro allows you to save your preferences to the RES Pro server.<br><br><strong>Please note:</strong> this is alpha functionality right now, and you should only use it if you\'re interested in helping test it out! If you find the storage of your preferences to be critical information, I would suggest not trying this out.  You will need to <a target="_blank" href="http://reddit.honestbleeps.com/register.php">register for a PRO account</a> first, then email <a href="mailto:steve@honestbleeps.com">steve@honestbleeps.com</a> with your RES Pro username to get access.';
		RESConsoleProPanel.appendChild(proPanelHeader);
		this.proSetupButton = createElementWithID('div','RESProSetup');
		this.proSetupButton.setAttribute('class','RESButton');
		this.proSetupButton.innerHTML = 'Configure RES Pro';
		this.proSetupButton.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESPro'].configure();
		}, false);
		RESConsoleProPanel.appendChild(this.proSetupButton);
		this.proAuthButton = createElementWithID('div','RESProAuth');
		this.proAuthButton.setAttribute('class','RESButton');
		this.proAuthButton.innerHTML = 'Authenticate';
		this.proAuthButton.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESPro'].authenticate();
		}, false);
		RESConsoleProPanel.appendChild(this.proAuthButton);
		this.proSaveButton = createElementWithID('div','RESProSave');
		this.proSaveButton.setAttribute('class','RESButton');
		this.proSaveButton.innerHTML = 'Save to Server';
		this.proSaveButton.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESPro'].savePrefs();
		}, false);
		RESConsoleProPanel.appendChild(this.proSaveButton);

		/*
		this.proUserTaggerSaveButton = createElementWithID('div','RESProSave');
		this.proUserTaggerSaveButton.setAttribute('class','RESButton');
		this.proUserTaggerSaveButton.innerHTML = 'Save user tags to Server';
		this.proUserTaggerSaveButton.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESPro'].saveModuleData('userTagger');
		}, false);
		RESConsoleProPanel.appendChild(this.proUserTaggerSaveButton);
		*/

		this.proSaveCommentsSaveButton = createElementWithID('div','RESProSave');
		this.proSaveCommentsSaveButton.setAttribute('class','RESButton');
		this.proSaveCommentsSaveButton.innerHTML = 'Save saved comments to Server';
		this.proSaveCommentsSaveButton.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESPro'].saveModuleData('saveComments');
		}, false);
		RESConsoleProPanel.appendChild(this.proSaveCommentsSaveButton);
		
		this.proSaveCommentsGetButton = createElementWithID('div','RESProGetSavedComments');
		this.proSaveCommentsGetButton.setAttribute('class','RESButton');
		this.proSaveCommentsGetButton.innerHTML = 'Get saved comments from Server';
		this.proSaveCommentsGetButton.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESPro'].getModuleData('saveComments');
		}, false);
		RESConsoleProPanel.appendChild(this.proSaveCommentsGetButton);
		
		this.proGetButton = createElementWithID('div','RESProGet');
		this.proGetButton.setAttribute('class','RESButton');
		this.proGetButton.innerHTML = 'Get from Server';
		this.proGetButton.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESPro'].getPrefs();
		}, false);
		RESConsoleProPanel.appendChild(this.proGetButton);
		RESConsoleContent.appendChild(RESConsoleProPanel);
	},
	open: function() {
		// hide the ad-frame div in case it's flash, because then it covers up the settings console and makes it impossible to see the save button!
		var adFrame = document.getElementById('ad-frame');
		if ((typeof(adFrame) != 'undefined') && (adFrame != null)) {
			adFrame.style.display = 'none';
		}
		var leftCentered = Math.floor((window.innerWidth - 720) / 2);
		modalOverlay.setAttribute('style','display: block; height: ' + document.documentElement.scrollHeight + 'px');
		RESConsoleContainer.setAttribute('style','display: block; left: ' + leftCentered + 'px');
		RESConsole.menuClick(RESMenuItems[0]);
	},
	close: function() {
		// Let's be nice to reddit and put their ad frame back now...
		var adFrame = document.getElementById('ad-frame');
		if ((typeof(adFrame) != 'undefined') && (adFrame != null)) {
			adFrame.style.display = 'block';
		}
		modalOverlay.setAttribute('style','display: none;');
		RESConsoleContainer.setAttribute('style','display: none;');
		// just in case the user was in the middle of setting a key and decided to close the dialog, clean that up.
		if (typeof(RESConsole.keyCodeModal) != 'undefined') {
			RESConsole.keyCodeModal.style.display = 'none';
			RESConsole.captureKey = false;
		}
	},
	menuClick: function(obj) {
		objID = obj.getAttribute('id')
		// make all menu items look unselected
		for (i in RESMenuItems) {
			if (i == 'length') break;
			RESMenuItems[i].setAttribute('style', 'background-color: #ffffff');
		}
		// make selected menu item look selected
		obj.setAttribute('style', 'background-color: #dddddd');
		// hide all console panels
		for (i in RESConsolePanels) {
			// bug in chrome, barfs on for i in loops with queryselectorall...
			if (i == 'length') break;
			RESConsolePanels[i].setAttribute('style', 'display: none');
		}
		switch(objID) {
			case 'Menu-Enable Modules':
				// show the modules panel
				RESConsoleModulesPanel.setAttribute('style', 'display: block');
				break;
			case 'Menu-Configure Modules':
				// show the config panel
				this.RESConfigPanelSelector.selectedIndex = 0;
				RESConsoleConfigPanel.setAttribute('style', 'display: block');
				break;
			case 'Menu-About RES':
				// show the about panel
				RESConsoleAboutPanel.setAttribute('style', 'display: block');
				break;
			case 'Menu-RES Pro':
				// show the pro panel
				RESConsoleProPanel.setAttribute('style', 'display: block');
				break;
			default:
				alert('err, what just happened here? I do not recognize that menu item.');
				break;
		}
	},
};


/************************************************************************************************************

Creating your own module:

Modules must have the following format, with required functions:
- moduleID - the name of the module, i.e. myModule
- moduleName - a "nice name" for your module...
- description - for the config panel, explains what the module is
- isEnabled - should always return RESConsole.getModulePrefs('moduleID') - where moduleID is your module name.
- isMatchURL - should always return RESUtils.isMatchURL('moduleID') - checks your include and exclude URL matches.
- include - an array of regexes to match against location.href (basically like include in GM)
- exclude (optional) - an array of regexes to exclude against location.href
- go - always checks both if isEnabled() and if RESUtils.isMatchURL(), and if so, runs your main code.

modules['myModule'] = {
	moduleID: 'myModule',
	moduleName: 'my module',
	options: {
		// any configurable options you have go here...
		// options must have a type and a value.. 
		// valid types are: text, boolean (if boolean, value must be true or false)
		// for example:
		defaultMessage: {
			type: 'text',
			value: 'this is default text',
			description: 'explanation of what this option is for'
		},
		doSpecialStuff: {
			type: 'boolean',
			value: false,
			description: 'explanation of what this option is for'
		}
	},
	description: 'This is my module!',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/http:\/\/([a-z]+).reddit.com\/user\/[-\w\.]+/i,
		/http:\/\/([a-z]+).reddit.com\/message\/comments\/[-\w\.]+/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// do stuff now!
			// this is where your code goes...
		}
	}
}; // note: you NEED this semicolon at the end!

************************************************************************************************************/

modules['subRedditTagger'] = {
	moduleID: 'subRedditTagger',
	moduleName: 'Subreddit Tagger',
	options: {
		subReddits: {
			type: 'table',
			fields: [
				{ name: 'subreddit', type: 'text' },
				{ name: 'doesntContain', type: 'text' },
				{ name: 'tag', type: 'text' }
			],
			value: [
				/*
				['somebodymakethis','SMT','[SMT]'],
				['pics','pic','[pic]']
				*/
			],
			description: 'Set your subreddits below. For that subreddit, if the title of the post doesn\'t contain what you place in the "doesn\'t contain" field, the subreddit will be tagged with whatever you specify.'
		}
	},
	description: 'Adds tags to posts on subreddits (i.e. [SMT] on SomebodyMakeThis when the user leaves it out)',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: new Array(
		/https?:\/\/([a-z]+).reddit.com\/[\?]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			this.checkForOldSettings();
			this.SRTDoesntContain = new Array();
			this.SRTTagWith = new Array();
			this.loadSRTRules();
			
			document.body.addEventListener('DOMNodeInserted', function(event) {
				if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
					modules['subRedditTagger'].scanTitles();
				}
			}, true);
			this.scanTitles();
			
		}
	},
	loadSRTRules: function () {
		var subReddits = this.options.subReddits.value;
		for (var i=0, len=subReddits.length; i<len; i++) {
			thisGetArray = subReddits[i];
			if (thisGetArray) {
				this.SRTDoesntContain[thisGetArray[0].toLowerCase()] = thisGetArray[1];
				this.SRTTagWith[thisGetArray[0].toLowerCase()] = thisGetArray[2];
			}
		}
	},
	scanTitles: function() {
		var entries = document.querySelectorAll('#siteTable > .thing > DIV.entry');
		for (var i=0, len=entries.length; i<len;i++) {
			// bug in chrome, barfs on for i in loops with queryselectorall...
			if (i == 'length') break;
			thisSubRedditEle = entries[i].querySelector('A.subreddit');
			if ((typeof(thisSubRedditEle) != 'undefined') && (thisSubRedditEle != null)) {
				thisSubReddit = thisSubRedditEle.innerHTML.toLowerCase();
				if (typeof(this.SRTDoesntContain[thisSubReddit]) != 'undefined') {
					thisTitle = entries[i].querySelector('A.title');
					if (!(hasClass(thisTitle, 'srTagged'))) {
						addClass(thisTitle, 'srTagged');
						thisRegEx = this.SRTDoesntContain[thisSubReddit];
						thisTagWith = this.SRTTagWith[thisSubReddit];
						if (thisTitle.text.search(thisRegEx) == -1) {
							thisTitle.innerHTML = thisTagWith + ' ' + thisTitle.innerHTML;
						}
					}
				}
			}
		}
	},
	checkForOldSettings: function() {
		var settingsCopy = Array();
		var subRedditCount = 0;
		while (RESStorage.getItem('subreddit_' + subRedditCount)) {
			var thisGet = RESStorage.getItem('subreddit_' + subRedditCount).replace(/\"/g,"");
			var thisGetArray = thisGet.split("|");
			settingsCopy[subRedditCount] = thisGetArray;
			RESStorage.removeItem('subreddit_' + subRedditCount);
			subRedditCount++;
		}
		if (subRedditCount > 0) {
			RESUtils.setOption('subRedditTagger', 'subReddits', settingsCopy);
		}
	}

}; 


modules['uppersAndDowners'] = {
	moduleID: 'uppersAndDowners',
	moduleName: 'Uppers and Downers Enhanced',
	options: {
		showSigns: {
			type: 'boolean',
			value: false,
			description: 'Show +/- signs next to upvote/downvote tallies.'
		},
		applyToLinks: {
			type: 'boolean',
			value: true,
			description: 'Uppers and Downers on links.'
		},
		postUpvoteStyle: {
			type: 'text',
			value: 'color:rgb(255, 139, 36); font-weight:normal;',
			description: 'CSS style for post upvotes'
		},
		postDownvoteStyle: {
			type: 'text',
			value: 'color:rgb(148, 148, 255); font-weight:normal;',
			description: 'CSS style for post upvotes'
		},
		commentUpvoteStyle: {
			type: 'text',
			value: 'color:rgb(255, 139, 36); font-weight:bold;',
			description: 'CSS style for comment upvotes'
		},
		commentDownvoteStyle: {
			type: 'text',
			value: 'color:rgb(148, 148, 255); font-weight:bold;',
			description: 'CSS style for comment upvotes'
		},
		showTimestamp: {
			type: 'boolean',
			value: true,
			description: 'Show actual created time when hovering over comment taglines'
		}
	},
	description: 'Displays up/down vote counts on comments.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/?(?:\??[\w]+=[\w]+&?)*/i,
		/https?:\/\/([a-z]+).reddit.com\/r\/[\w]+\/?(?:\??[\w]+=[\w]+&?)*$/i,
		/https?:\/\/([a-z]+).reddit.com\/user\/[-\w\.]+/i,
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			var css = '.res_comment_ups { '+this.options.commentUpvoteStyle.value+' } .res_comment_downs { '+this.options.commentDownvoteStyle.value+' }';
			css += '.res_post_ups { '+this.options.postUpvoteStyle.value+' } .res_post_downs { '+this.options.postDownvoteStyle.value+' }';
			RESUtils.addCSS(css);
			if ((RESUtils.pageType() == 'comments') || (RESUtils.pageType() == 'profile')) {
				this.commentsWithMoos = Array();
				this.moreCommentsIDs = Array();
				this.applyUppersAndDownersToComments();
				var moreComments = document.querySelectorAll('.morecomments > a');
				for (var i=0, len=moreComments.length; i<len; i++) {
					moreComments[i].addEventListener('click', this.addParentListener, true);
				}
			} else if ((RESUtils.pageType() == 'linklist') && (this.options.applyToLinks.value)) {
				this.linksWithMoos = Array();
				this.applyUppersAndDownersToLinks();
				document.body.addEventListener('DOMNodeInserted', function(event) {
					if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
						modules['uppersAndDowners'].applyUppersAndDownersToLinks(modules['neverEndingReddit'].nextPageURL);
					}
				}, true);
				
			}
		}
	},
	addParentListener: function (event) {
		var moreCommentsParent = event.target;
		// first, make sure we're starting at the <span class="morecomments"> rather than one of its children...
		while ((moreCommentsParent != null) && (moreCommentsParent.className != 'morecomments')) {
			moreCommentsParent = moreCommentsParent.parentNode;
		}
		var i=0;
		var isDeepComment = true;
		// Now, check if this is link nested deep inside comments, or a top level "load more comments" link at the bottom of a page.
		while (i<6) {
			if ((moreCommentsParent != null) && (typeof(moreCommentsParent.parentNode) != 'undefined')) {
				moreCommentsParent = moreCommentsParent.parentNode;
				if (moreCommentsParent.className == 'commentarea') {
					i=6;
					isDeepComment = false;
				}
			} else {
				i=6;
				isDeepComment = false;
			}
			i++;
		}
		if (isDeepComment) {
			moreCommentsParent.addEventListener('DOMNodeInserted', modules['uppersAndDowners'].processMoreComments, true);
		} else {
			// There isn't a good way to handle this with a single API call right now, so it'd make a new API call for each
			// hit, and that sucks.  Skipping this for now.
			// document.body.addEventListener('DOMNodeInserted', modules['uppersAndDowners'].processMoreCommentsTopLevel, true);
		}
	},
	processMoreCommentsTopLevel: function (event) {
		if (typeof(trackCount) == 'undefined') {
			trackCount = 0;
		} else {
			if (event.target.tagName == 'DIV') {
				trackCount++;
				if (trackCount < 30) {
					// console.log(event.target);
				}
			}
		}
	},
	processMoreComments: function (event) {
		if ((event.target.tagName == 'DIV') && (hasClass(event.target, 'thing'))) {
			var getID = /id-([\w])+\_([\w]+)/i;
			var IDMatch = getID.exec(event.currentTarget.getAttribute('class'));
			if (IDMatch) {
				var thisID = IDMatch[2];
				if (typeof(modules['uppersAndDowners'].moreCommentsIDs[thisID]) == 'undefined') {
					modules['uppersAndDowners'].moreCommentsIDs[thisID] = true;
					var thisHREF = location.href + thisID;
					event.currentTarget.removeEventListener('DOMNodeInserted', this.processMoreComments, true);
					modules['uppersAndDowners'].applyUppersAndDownersToComments(thisHREF);
				}
			}
		}			
	},
	applyUppersAndDownersToComments: function(href) {
		/*
			The Reddit Uppers/Downers module is included as a convenience, but I did not write it.
			Original credits are below.
			
			I have, however, greatly modified it to integrate better with RES and also add some configuration options.
		*/
		/*
		This code is provided as is, with no warranty of any kind.

		I hacked it together in one night for my own use, and have not tested it extensively.

		The script can slow down comment page load time; if the lag is noticeable, you may want
		to change your preferences to load fewer comments per page.

		Note that this runs once and does not install any persistent code on the page. So any votes
		you cast will not affect the numbers displayed until you reload.

		Also note that the ups and downs will not always add up to the score displayed on reddit.
		I think this is because of caching on reddit's part. It's usually within one or two points though.

		Code contributors: Allan Bogh - http://www.opencodeproject.com
				brasso - http://userscripts.org/scripts/show/56641
				savetheclocktower - http://gist.github.com/174069
				skeww (jslint, fragment, chunking) - http://kaioa.com
		*/
		
		var loc, jsonURL, voteTable, onloadJSON, displayVotes, processTree, isComment, processChildren, processReplies, chunker;

		//Get the URL for the JSON details of this comments page
		if (href) {
			loc = href;
		} else {
			loc = "" + window.location;
		}
		jsonURL = loc.replace(/\/$/,'') + "/.json";
		if (loc.indexOf("?") !== -1) {
			jsonURL = loc.replace("?", "/.json?");
		}

		voteTable = {};

		onloadJSON = function (response) {
			var jsonText = response.responseText, data;

			try {
				data = JSON.parse(jsonText);
			} catch (e) {
				if (window.console) {
					// window.console.log(e);
					window.console.log(jsonText);
				}
			}

			//Load the vote table by processing the tree
			processTree(data); //this takes up no time (4ms on 4000 records)

			//Display the loaded votes
			displayVotes();
		};

		// spend up to 50msec a time with a task, wait for 25msec and continue if necessary
		// changed to 100/100
		chunker = function (items, process) {
			var todo = items.concat();
			setTimeout(function () {
				var start = Date.now();
				do {
					process(todo.shift());
				} while (todo.length && Date.now() - start < 100); // was 50
				if (todo.length) {
					setTimeout(arguments.callee, 100); // was 25
				}
			}, 100); // was 25
		};

		displayVotes = function () {
			//Add the style sheets for up and down ratings

			var taglines,
				commentID = null,
				toArray;

			toArray = function (col) {
				var a = [], i, len;
				for (i = 0, len = col.length; i < len; i++) {
					a[i] = col[i];
				}
				return a;
			};

			taglines = toArray(document.getElementsByClassName("tagline"));

			chunker(taglines, function (item) {
				if (item) {
					var votes, openparen, mooups, pipe, moodowns, voteDowns, voteUps, closeparen, frag;
					if (item.nextSibling.nodeName === "FORM") { //the first item is the title of the post
						commentID = item.nextSibling.firstChild.value;
						if ((voteTable[commentID]) && (typeof(modules['uppersAndDowners'].commentsWithMoos[commentID]) == 'undefined')) {
							modules['uppersAndDowners'].commentsWithMoos[commentID] = true;
							frag = document.createDocumentFragment(); //using a fragment speeds this up by a factor of about 2

							votes = voteTable[commentID];
							
							if (modules['uppersAndDowners'].options.showSigns.value) {
								votes.ups = '+'+votes.ups;
								votes.downs = '-'+votes.downs;
							}

							openparen = document.createTextNode(" (");
							frag.appendChild(openparen);

							mooups = document.createElement("span");
							mooups.className = "res_comment_ups";
							voteUps = document.createTextNode(votes.ups);

							mooups.appendChild(voteUps);
							frag.appendChild(mooups);

							pipe = document.createTextNode("|");
							item.appendChild(pipe);

							moodowns = document.createElement("span");
							moodowns.className = "res_comment_downs";

							voteDowns = document.createTextNode(votes.downs);
							moodowns.appendChild(voteDowns);

							frag.appendChild(moodowns);

							closeparen = document.createTextNode(")");
							frag.appendChild(closeparen);

							frag.appendChild(openparen);
							frag.appendChild(mooups);
							frag.appendChild(pipe);
							frag.appendChild(moodowns);
							frag.appendChild(closeparen);

							item.appendChild(frag);
							// thanks to Reddit user semanticist for the idea/patch to put the date created in here... 
							if (modules['uppersAndDowners'].options.showTimestamp.value) {
								// find the modified time and wrap it in a span...
								for (var i=1, len=item.childNodes.length; i<len; i++) {
									// if this is a text node, and comes right after a div with a class of score, it's the time...
									if ((item.childNodes[i].nodeType == 3) && (item.childNodes[i-1].nodeType == 1) && (hasClass(item.childNodes[i-1],'score'))) {
										var timeStampNode = document.createElement('span');
										timeStampNode.innerHTML = item.childNodes[i].textContent;
										timeStampNode.title = new Date(votes.created*1000).toString();
										insertAfter(item.childNodes[i],timeStampNode);
										item.removeChild(item.childNodes[i]);
										break;
									}
								}
							}
						}
					}				
				}
				
			});
		};

		//Recursively process the comment tree
		processTree = function (obj) {
			var i, il, data, name;
			if (obj instanceof Array) {
				for (i = 0, il = obj.length; i < il; i++) {
					processTree(obj[i]);
				}
			}
			if (obj) {
				data = obj.data;
				if (data) { //Data found
					if (isComment(obj) && data.author !== "[deleted]") {
						name = data.name;
						if (name) { //Store the votes in the vote table
							voteTable[name] = {
								downs: data.downs || 0,
								ups: data.ups || 0,
								created: data.created_utc || 0

							};
						}
					}

					//Process any subtrees
					processChildren(data);
					processReplies(data);

				}
			}
		};

		isComment = function (obj) {
			return obj.kind === "t1";
		};

		processChildren = function (data) {
			var children = data.children, i, il;
			if (children) {
				for (i = 0, il = children.length; i < il; i++) {
					processTree(children[i]);
				}
			}
		};

		processReplies = function (data) {
			var replies = data.replies;
			if (replies) {
				processTree(replies);
			}
		};

		//load the JSON
		if (jsonURL.indexOf('/comscore-iframe/') === -1) {
			// the setTimeout is to avoid an unsafeWindow error with Greasemonkey when processing additional (newly loaded) comments...
			setTimeout(function() {
				GM_xmlhttpRequest({
					method:	"GET",
					url:	jsonURL,
					onload:	onloadJSON
				});
			}, 200);
		}
	},
	applyUppersAndDownersToLinks: function(href) {
		var loc, onloadJSONLinks
		//Get the URL for the JSON details of this comments page
		if (href) {
			loc = href;
		} else {
			loc = "" + window.location;
		}
		jsonURL = loc.replace(/\/$/,'') + "/.json";
		if (loc.indexOf("?") !== -1) {
			jsonURL = loc.replace("?", "/.json?");
		}
		onloadJSONLinks = function (response) {
			var jsonText = response.responseText, data;

			try {
				data = JSON.parse(jsonText);
			} catch (e) {
				if (window.console) {
					// window.console.error(e);
				}
			}

			// Since we're dealing with max 100 links at a time, we don't need a chunker here...
			if ((typeof(data) != 'undefined') && ((typeof(data.data) != 'undefined'))) {
				var linkList = data.data.children;
				var displayType = 'regular';
				if (modules['uppersAndDowners'].options.showSigns.value) {
					var thisPlus = '+';
					var thisMinus = '-';
				} else {
					var thisPlus = '';
					var thisMinus = '';
				}
				for (var i=0, len=linkList.length; i<len; i++) {
					var thisups = linkList[i].data.ups;
					var thisdowns = linkList[i].data.downs;
					var thisid = linkList[i].data.id;
					var thisClass = '.id-t3_'+thisid;
					if (i == 0) {
						var thisSelector = thisClass + ' p.tagline';
						var thisTagline = document.body.querySelector(thisSelector);
						if ((thisTagline) && (thisTagline.innerHTML.indexOf('span class="score likes"') != -1)) {
							displayType = 'compressed';
							var thisSelector = thisClass + ' p.tagline span.likes';
							var thisTagline = document.body.querySelector(thisSelector);
						} 
					} else if (displayType == 'regular') {
						var thisSelector = thisClass + ' p.tagline';
						var thisTagline = document.body.querySelector(thisSelector);
					} else {
						var thisSelector = thisClass + ' p.tagline span.likes';
						var thisTagline = document.body.querySelector(thisSelector);
					}
					// Check if compressed link display or regular...
					if ((typeof(thisTagline) != 'undefined') && (thisTagline != null)) {
						var upsAndDowns = ' (<span class="res_post_ups">'+thisPlus+thisups+'</span>|<span class="res_post_downs">'+thisMinus+thisdowns+'</span>) ';
						var upsAndDownsEle = document.createElement('span');
						upsAndDownsEle.innerHTML = upsAndDowns;
						// thanks to Reddit user semanticist for the idea/patch to put the date created in here... 
						if (modules['uppersAndDowners'].options.showTimestamp.value) {
							var thisTimeString = new Date(linkList[i].data.created_utc*1000).toString();
							// find the modified time and wrap it in a span...
							var timeStampNode = document.createElement('span');
							timeStampNode.innerHTML = thisTagline.childNodes[0].textContent;
							timeStampNode.title = thisTimeString;
							insertAfter(thisTagline.childNodes[0],timeStampNode);
							thisTagline.removeChild(thisTagline.childNodes[0]);
						}
						if (displayType == 'regular') {
							thisTagline.insertBefore(upsAndDownsEle, thisTagline.firstChild);
						} else {
							insertAfter(thisTagline, upsAndDownsEle);
						}
					}
				}
			}
		};
		// load the JSON
		setTimeout(function() {
			GM_xmlhttpRequest({
				method:	"GET",
				url:	jsonURL,
				onload:	onloadJSONLinks
			});
		}, 200);
		
	}
};

modules['keyboardNav'] = {
	moduleID: 'keyboardNav',
	moduleName: 'Keyboard Navigation',
	options: {
		// any configurable options you have go here...
		// options must have a type and a value.. 
		// valid types are: text, boolean (if boolean, value must be true or false)
		// for example:
		focusBorder: {
			type: 'text',
			value: '1px dashed #888888', 
			description: 'Border style of focused element'
		},
		focusBGColor: {
			type: 'text',
			value: '#F0F3FC', 
			description: 'Background color of focused element'
		},
		scrollOnExpando: {
			type: 'boolean',
			value: true,
			description: 'Scroll window to top of link when expando key is used (to keep pics etc in view)'
		},
		commentsLinkNumbers: {
			type: 'boolean',
			value: true,
			description: 'Assign number keys to links within selected comment'
		},
		commentsLinkNewTab: {
			type: 'boolean',
			value: true,
			description: 'Open number key links in a new tab'
		},
		clickFocus: {
			type: 'boolean',
			value: true,
			description: 'Move keyboard focus to a link or comment when clicked with the mouse'
		},
		onHideMoveDown: {
			type: 'boolean',
			value: true,
			description: 'After hiding a link, automatically select the next link'
		},
		toggleHelp: {
			type: 'keycode',
			value: [191,false,false,true], // ? (note the true in the shift slot)
			description: 'Show help'
		},
		toggleCmdLine: {
			type: 'keycode',
			value: [190,false,false,false], // .
			description: 'Show/hide commandline box'
		},
		hide: {
			type: 'keycode',
			value: [72,false,false,false], // h
			description: 'Hide link'
		},
		moveUp: {
			type: 'keycode',
			value: [75,false,false,false], // k
			description: 'Move up (previous link or comment)'
		},
		moveDown: {
			type: 'keycode',
			value: [74,false,false,false], // j
			description: 'Move down (next link or comment)'
		},
		moveTop: {
			type: 'keycode',
			value: [75,false,false,true], // shift-k
			description: 'Move to top of list (on link pages)'
		},
		moveBottom: {
			type: 'keycode',
			value: [74,false,false,true], // shift-j
			description: 'Move to bottom of list (on link pages)'
		},
		moveUpSibling: {
			type: 'keycode',
			value: [75,false,false,true], // shift-k
			description: 'Move to previous sibling (in comments) - skips to previous sibling at the same depth.'
		},
		moveDownSibling: {
			type: 'keycode',
			value: [74,false,false,true], // shift-j
			description: 'Move to next sibling (in comments) - skips to next sibling at the same depth.'
		},
		moveToParent: {
			type: 'keycode',
			value: [80,false,false,false], // p
			description: 'Move to parent (in comments).'
		},
		followLink: {
			type: 'keycode',
			value: [13,false,false,false], // enter
			description: 'Follow link (hold shift to open it in a new tab) (link pages only)'
		},
		followLinkNewTab: {
			type: 'keycode',
			value: [13,false,false,true], // shift-enter
			description: 'Follow link in new tab (link pages only)'
		},
		toggleExpando: {
			type: 'keycode',
			value: [88,false,false,false], // x
			description: 'Toggle expando (image/text/video) (link pages only)'
		},
		toggleChildren: {
			type: 'keycode',
			value: [13,false,false,false], // enter
			description: 'Expand/collapse comments (comments pages only)'
		},
		followComments: {
			type: 'keycode',
			value: [67,false,false,false], // c
			description: 'View comments for link (shift opens them in a new tab)'
		},
		followCommentsNewTab: {
			type: 'keycode',
			value: [67,false,false,true], // shift-c
			description: 'View comments for link in a new tab'
		},
		followLinkAndCommentsNewTab: {
			type: 'keycode',
			value: [76,false,false,false], // l
			description: 'View link and comments in new tabs'
		},
		followLinkAndCommentsNewTabBG: {
			type: 'keycode',
			value: [76,false,false,true], // shift-l
			description: 'View link and comments in new background tabs'
		},
		upVote: {
			type: 'keycode',
			value: [65,false,false,false], // a
			description: 'Upvote selected link or comment'
		},
		downVote: {
			type: 'keycode',
			value: [90,false,false,false], // z
			description: 'Downvote selected link or comment'
		},
		save: {
			type: 'keycode',
			value: [83,false,false,false], // s
			description: 'Save the current link'
		},
		reply: {
			type: 'keycode',
			value: [82,false,false,false], // r
			description: 'Reply to current comment (comment pages only)'
		},
		followSubreddit: {
			type: 'keycode',
			value: [82,false,false,false], // r
			description: 'Go to subreddit of selected link (link pages only)'
		},
		inbox: {
			type: 'keycode',
			value: [73,false,false,false], // i
			description: 'Go to inbox'
		},
		frontPage: {
			type: 'keycode',
			value: [70,false,false,false], // f
			description: 'Go to front page'
		},
		nextPage: {
			type: 'keycode',
			value: [78,false,false,false], // n
			description: 'Go to next page (link list pages only)'
		},
		prevPage: {
			type: 'keycode',
			value: [80,false,false,false], // p
			description: 'Go to prev page (link list pages only)'
		},
		link1: {
			type: 'keycode',
			value: [49,false,false,false], // 1
			description: 'Open first link within comment.',
			noconfig: true
		},
		link2: {
			type: 'keycode',
			value: [50,false,false,false], // 2
			description: 'Open link #2 within comment.',
			noconfig: true
		},
		link3: {
			type: 'keycode',
			value: [51,false,false,false], // 3
			description: 'Open link #3 within comment.',
			noconfig: true
		},
		link4: {
			type: 'keycode',
			value: [52,false,false,false], // 4
			description: 'Open link #4 within comment.',
			noconfig: true
		},
		link5: {
			type: 'keycode',
			value: [53,false,false,false], // 5
			description: 'Open link #5 within comment.',
			noconfig: true
		},
		link6: {
			type: 'keycode',
			value: [54,false,false,false], // 6
			description: 'Open link #6 within comment.',
			noconfig: true
		},
		link7: {
			type: 'keycode',
			value: [55,false,false,false], // 7
			description: 'Open link #7 within comment.',
			noconfig: true
		},
		link8: {
			type: 'keycode',
			value: [56,false,false,false], // 8
			description: 'Open link #8 within comment.',
			noconfig: true
		},
		link9: {
			type: 'keycode',
			value: [57,false,false,false], // 9
			description: 'Open link #9 within comment.',
			noconfig: true
		},
		link10: {
			type: 'keycode',
			value: [48,false,false,false], // 0
			description: 'Open link #10 within comment.',
			noconfig: true
		}
	},
	description: 'Keyboard navigation for reddit!',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			if (typeof(this.options.focusBorder) == 'undefined') {
				focusBorder = '1px dashed #888888';
			} else {
				focusBorder = this.options.focusBorder.value;
			}
			if (typeof(this.options.focusBGColor) == 'undefined') {
				focusBGColor = '#F0F3FC';
			} else {
				focusBGColor = this.options.focusBGColor.value;
			}
			var borderType = 'outline';
			if (typeof(opera) != 'undefined') borderType = 'border';
			RESUtils.addCSS(' \
				.keyHighlight { '+borderType+': '+focusBorder+'; background-color: '+focusBGColor+'; } \
				#keyHelp { display: none; position: fixed; right: 20px; top: 20px; z-index: 1000; border: 2px solid #AAAAAA; border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px 5px 5px 5px; width: 300px; padding: 5px; background-color: #ffffff; } \
				#keyHelp th { font-weight: bold; padding: 2px; border-bottom: 1px dashed #dddddd; } \
				#keyHelp td { padding: 2px; border-bottom: 1px dashed #dddddd; } \
				#keyHelp td:first-child { width: 70px; } \
				#keyCommandLineWidget { font-size: 14px; display: none; position: fixed; top: 200px; left: 50%; margin-left: -275px; z-index: 9999; width: 550px; border: 3px solid #555555; border-radius: 10px 10px 10px 10px; -moz-border-radius: 10px 10px 10px 10px; -webkit-border-radius: 10px 10px 10px 10px; padding: 10px; background-color: #333333; color: #CCCCCC; opacity: 0.95; } \
				#keyCommandInput { width: 240px; background-color: #999999; margin-right: 10px; } \
				#keyCommandInputTip { margin-top: 5px; color: #99FF99; } \
				#keyCommandInputTip ul { font-size: 11px; list-style-type: disc; }  \
				#keyCommandInputTip li { margin-left: 15px; }  \
				#keyCommandInputError { margin-top: 5px; color: red; font-weight: bold; } \
			');
			this.drawHelp();
			this.attachCommandLineWidget();
			window.addEventListener('keydown', function(e) {
				// console.log(e.keyCode);
				modules['keyboardNav'].handleKeyPress(e);
			}, true);
			this.scanPageForKeyboardLinks();
			// listen for new DOM nodes so that modules like autopager, never ending reddit, "load more comments" etc still get keyboard nav.
			document.body.addEventListener('DOMNodeInserted', function(event) {
				if ((event.target.tagName == 'DIV') && ((event.target.getAttribute('id') == 'siteTable') || (hasClass(event.target,'child')) || (hasClass(event.target,'thing')))) {
					modules['keyboardNav'].scanPageForKeyboardLinks(true);
				}
			}, true);
		}
	},
	attachCommandLineWidget: function() {
		this.commandLineWidget = createElementWithID('div','keyCommandLineWidget');
		this.commandLineInput = createElementWithID('input','keyCommandInput');
		this.commandLineInput.setAttribute('type','text');
		this.commandLineInput.addEventListener('blur', function(e) {
			modules['keyboardNav'].toggleCmdLine(false);
		}, false);
		this.commandLineInput.addEventListener('keyup', function(e) {
			if (e.keyCode == 27) {
				// close prompt.
				modules['keyboardNav'].toggleCmdLine(false);
			} else {
				// auto suggest?
				modules['keyboardNav'].cmdLineHelper(e.target.value);
			}
		}, false);
		this.commandLineInputTip = createElementWithID('div','keyCommandInputTip');
		this.commandLineInputError = createElementWithID('div','keyCommandInputError');

		/*
		this.commandLineSubmit = createElementWithID('input','keyCommandInput');
		this.commandLineSubmit.setAttribute('type','submit');
		this.commandLineSubmit.setAttribute('value','go');
		*/
		this.commandLineForm = createElementWithID('form','keyCommandForm');
		this.commandLineForm.appendChild(this.commandLineInput);
		// this.commandLineForm.appendChild(this.commandLineSubmit);
		var txt = document.createTextNode('type a command, ? for help, esc to close');
		this.commandLineForm.appendChild(txt);
		this.commandLineForm.appendChild(this.commandLineInputTip);
		this.commandLineForm.appendChild(this.commandLineInputError);
		this.commandLineForm.addEventListener('submit', modules['keyboardNav'].cmdLineSubmit, false);
		this.commandLineWidget.appendChild(this.commandLineForm);
		document.body.appendChild(this.commandLineWidget);
		
	},
	cmdLineHelper: function (val) {
		var splitWords = val.split(' ');
		var command = splitWords[0];
		splitWords.splice(0,1);
		var val = splitWords.join(' ');
		if (command.slice(0,2) == 'r/') {
			// get the subreddit name they've typed so far (anything after r/)...
			var srString = command.slice(2);
			this.cmdLineShowTip('navigate to subreddit: ' + srString);
		} else if (command == 'tag') {
			if ((typeof(this.cmdLineTagUsername) == 'undefined') || (this.cmdLineTagUsername == '')) {
				var searchArea = modules['keyboardNav'].keyboardLinks[modules['keyboardNav'].activeIndex];
				var authorLink = searchArea.querySelector('a.author');
				this.cmdLineTagUsername = authorLink.innerHTML;
			}
			var str = 'tag user ' + this.cmdLineTagUsername;
			if (val) {
				str += ' as: ' + val;
			}
			this.cmdLineShowTip(str);
		} else if (command == 'user') {
			var str = 'go to profile';
			if (val) {
				str += ' for: ' + val;
			}
			this.cmdLineShowTip(str);
		} else if (command == 'sw') {
			this.cmdLineShowTip('Switch users to: ' + val);
		} else if (command == 'm') {
			this.cmdLineShowTip('View messages.');
		} else if (command == 'mm') {
			this.cmdLineShowTip('View moderator mail.');
		} else if (command == 'ls') {
			this.cmdLineShowTip('Toggle lightSwitch.');
		} else if (command.slice(0,1) == '?') {
			var str = 'Currently supported commands:';
			str += '<ul>';
			str += '<li>r/[subreddit] - navigates to subreddit</li>'
			str += '<li>[number] - navigates to the link with that number (comments pages) or rank (link pages)</li>'
			str += '<li>tag [text] - tags author of currently selected link/comment as text</li>'
			str += '<li>sw [username] - switch users to [username]</li>'
			str += '<li>user [username] - view profile for [username]</li>'
			str += '<li>m - go to inbox</li>'
			str += '<li>mm - go to moderator mail</li>'
			str += '<li>ls - toggle lightSwitch</li>'
			str += '<li>RESStorage [get|set|update|remove] [key] [value] - For debug use only, you shouldn\'t mess with this unless you know what you\'re doing.</li>'
			str += '</ul>';
			this.cmdLineShowTip(str);
		} else {
			this.cmdLineShowTip('');
		}
	},
	cmdLineShowTip: function(str) {
		this.commandLineInputTip.innerHTML = str;
	},
	cmdLineShowError: function(str) {
		this.commandLineInputError.innerHTML = str;
	},
	toggleCmdLine: function(force) {
		var open = (((force == null) || (force == true)) && (this.commandLineWidget.style.display != 'block'))
		delete this.cmdLineTagUsername;
		if (open) {
			this.cmdLineShowError('');
			this.commandLineWidget.style.display = 'block';
			setTimeout(function() {
				modules['keyboardNav'].commandLineInput.focus();
			}, 20);
			this.commandLineInput.value = '';
		} else {
			modules['keyboardNav'].commandLineInput.blur();
			this.commandLineWidget.style.display = 'none';
		}
	},
	cmdLineSubmit: function(e) {
		e.preventDefault();
		modules['keyboardNav'].commandLineInputError.innerHTML = '';
		var theInput = modules['keyboardNav'].commandLineInput.value;
		// see what kind of input it is:
		if (theInput.indexOf('r/') != -1) {
			// subreddit? (r/subreddit or /r/subreddit)
			theInput = theInput.replace('/r/','').replace('r/','');
			location.href = '/r/'+theInput;		
		} else if (!(isNaN(parseInt(theInput)))) {
			if (RESUtils.pageType() == 'comments') {
				// comment link number? (integer)
				modules['keyboardNav'].commentLink(parseInt(theInput)-1);
			} else if (RESUtils.pageType() == 'linklist') {
				modules['keyboardNav'].keyUnfocus(modules['keyboardNav'].keyboardLinks[modules['keyboardNav'].activeIndex]);
				modules['keyboardNav'].activeIndex = parseInt(theInput) - 1;
				modules['keyboardNav'].keyFocus(modules['keyboardNav'].keyboardLinks[modules['keyboardNav'].activeIndex]);
				modules['keyboardNav'].followLink();
			}
		} else {
			var splitWords = theInput.split(' ');
			var command = splitWords[0];
			splitWords.splice(0,1);
			var val = splitWords.join(' ');
			switch (command) {
				case 'tag':
					var searchArea = modules['keyboardNav'].keyboardLinks[modules['keyboardNav'].activeIndex];
					var tagLink = searchArea.querySelector('a.userTagLink');
					if (tagLink) {
						RESUtils.click(tagLink);
						setTimeout(function() {
							if (val != '') {
								document.getElementById('userTaggerTag').value = val;
							}
						}, 20);
					}
					break;
				case 'sw':
					// switch accounts (username is required)
					if (val.length <= 1) {
						modules['keyboardNav'].cmdLineShowError('No username specified.');
						return false;
					} else {
						// first make sure the account exists...
						var accounts = modules['accountSwitcher'].options.accounts.value;
						var found = false;
						for (var i=0, len=accounts.length; i<len; i++) {
							thisPair = accounts[i];
							if (thisPair[0] == val) {
								found = true;
							}
						}
						if (found) {
							modules['accountSwitcher'].switchTo(val);
						} else {
							modules['keyboardNav'].cmdLineShowError('No such username in accountSwitcher.');
							return false;
						}
					}
					break;
				case 'user':
					// view profile for username (username is required)
					if (val.length <= 1) {
						modules['keyboardNav'].cmdLineShowError('No username specified.');
						return false;
					} else {
						location.href = '/user/' + val;
					}
					break;
				case 'userinfo':
					// view JSON data for username (username is required)
					if (val.length <= 1) {
						modules['keyboardNav'].cmdLineShowError('No username specified.');
						return false;
					} else {
						GM_xmlhttpRequest({
							method:	"GET",
							url:	location.protocol + "//www.reddit.com/user/" + val + "/about.json",
							onload:	function(response) {
								alert(response.responseText);
							}
						});
					}
					break;
				case 'userbadge':
					// get CSS code for a badge for username (username is required)
					if (val.length <= 1) {
						modules['keyboardNav'].cmdLineShowError('No username specified.');
						return false;
					} else {
						GM_xmlhttpRequest({
							method:	"GET",
							url:	location.protocol + "//www.reddit.com/user/" + val + "/about.json",
							onload:	function(response) {
								var thisResponse = JSON.parse(response.responseText);
								var css = ', .id-t2_'+thisResponse.data.id+':before';
								alert(css);
							}
						});
					}
					break;
				case 'm':
					// go to inbox
					location.href = '/message/inbox/';
					break;
				case 'mm':
					// go to mod mail
					location.href = '/message/moderator/';
					break;
				case 'ls':
					// toggle lightSwitch
					RESUtils.click(modules['styleTweaks'].lightSwitch);
					break;
				case 'RESStorage':
					// get or set RESStorage data
					var splitWords = val.split(' ');
					if (splitWords.length < 2) {
						modules['keyboardNav'].cmdLineShowError('You must specify "get [key]", "update [key]" or "set [key] [value]"');
					} else {
						var command = splitWords[0];
						var key = splitWords[1];
						if (splitWords.length > 2) {
							splitWords.splice(0,2);
							var value = splitWords.join(' ');
						}
						// console.log(command);
						if (command == 'get') {
							alert('Value of RESStorage['+key+']: <br><br><textarea rows="5" cols="50">' + RESStorage.getItem(key) + '</textarea>');
						} else if (command == 'update') {
							var now = new Date().getTime();
							alert('Value of RESStorage['+key+']: <br><br><textarea id="RESStorageUpdate'+now+'" rows="5" cols="50">' + RESStorage.getItem(key) + '</textarea>', function() {
								var textArea = document.getElementById('RESStorageUpdate'+now);
								if (textArea) {
									var value = textArea.value;
									RESStorage.setItem(key, value);
								}
							});
						} else if (command == 'remove') {
							RESStorage.removeItem(key);
							alert('RESStorage['+key+'] deleted');
						} else if (command == 'set') {
							RESStorage.setItem(key, value);
							alert('RESStorage['+key+'] set to:<br><br><textarea rows="5" cols="50">' + value + '</textarea>');
						} else {
							modules['keyboardNav'].cmdLineShowError('You must specify either "get [key]" or "set [key] [value]"');
						}
					}
					break;
				case '?':
					// user is already looking at help... do nothing.
					return false;
					break;
				default:
					modules['keyboardNav'].cmdLineShowError('unknown command - type ? for help');
					return false;
					break;
			}
		}
		// hide the commandline tool...
		modules['keyboardNav'].toggleCmdLine(false);
	},
	scanPageForKeyboardLinks: function(isNew) {
		if (typeof(isNew) == 'undefined') {
			isNew = false;
		}
		// check if we're on a link listing (regular page, subreddit page, etc) or comments listing...
		this.pageType = RESUtils.pageType();
		switch(this.pageType) {
			case 'linklist':
			case 'profile':
				// get all links into an array...
				var siteTable = document.querySelector('#siteTable');
				var stMultiCheck = document.querySelectorAll('#siteTable');
				// stupid sponsored links create a second div with ID of sitetable (bad reddit! you should never have 2 IDs with the same name! naughty, naughty reddit!)
				if (stMultiCheck.length == 2) {
					siteTable = stMultiCheck[1];
				}
				if (siteTable) {
					this.keyboardLinks = document.body.querySelectorAll('div.linklisting .entry');
					if (!isNew) {
						if (RESStorage.getItem('RESmodules.keyboardNavLastIndex.'+location.href) > 0) {
							this.activeIndex = RESStorage.getItem('RESmodules.keyboardNavLastIndex.'+location.href);
						} else {
							this.activeIndex = 0;
						}
						if (RESStorage.getItem('RESmodules.keyboardNavLastIndex.'+location.href) >= this.keyboardLinks.length) {
							this.activeIndex = 0;
						}
						this.keyFocus(this.keyboardLinks[this.activeIndex]);
					}
				}
				break;
			case 'comments':
				// get all links into an array...
				this.keyboardLinks = document.body.querySelectorAll('#siteTable .entry, div.content > div.commentarea .entry');
				if (!(isNew)) {
					this.activeIndex = 0;
				}
				this.keyFocus(this.keyboardLinks[this.activeIndex])
				break;
			case 'inbox':
				var siteTable = document.querySelector('#siteTable');
				if (siteTable) {
					this.keyboardLinks = siteTable.querySelectorAll('.entry');
					this.activeIndex = 0;
					this.keyFocus(this.keyboardLinks[this.activeIndex]);
				}
				break;
		}
		// wire up keyboard links for mouse clicky selecty goodness...
		if ((typeof(this.keyboardLinks) != 'undefined') && (this.options.clickFocus.value)) {
			for (var i=0, len=this.keyboardLinks.length;i<len;i++) {
				this.keyboardLinks[i].setAttribute('keyIndex', i);
				this.keyboardLinks[i].addEventListener('click', function(e) {
					var thisIndex = parseInt(this.getAttribute('keyIndex'));
					if (modules['keyboardNav'].activeIndex != thisIndex) {
						modules['keyboardNav'].keyUnfocus(modules['keyboardNav'].keyboardLinks[modules['keyboardNav'].activeIndex]);
						modules['keyboardNav'].activeIndex = thisIndex;
						modules['keyboardNav'].keyFocus(modules['keyboardNav'].keyboardLinks[modules['keyboardNav'].activeIndex]);
					}
				}, true);
			}
		}
	},
	keyFocus: function(obj) {
		if ((typeof(obj) != 'undefined') && (hasClass(obj, 'keyHighlight'))) {
			return false;
		} else if (typeof(obj) != 'undefined') {
			addClass(obj, 'keyHighlight');
			if ((this.pageType == 'linklist') || (this.pageType == 'profile')) RESStorage.setItem('RESmodules.keyboardNavLastIndex.'+location.href, this.activeIndex);
			if ((this.pageType == 'comments') && (this.options.commentsLinkNumbers.value)) {
				var links = obj.querySelectorAll('div.md a');
				var annotationCount = 0;
				for (var i=0, len=links.length; i<len; i++) {
					if ((!(hasClass(links[i],'madeVisible'))) && (!(hasClass(links[i],'toggleImage')))) {
						var annotation = document.createElement('span');
						annotationCount++;
						annotation.innerHTML = '['+annotationCount+'] ';
						addClass(annotation,'keyNavAnnotation');
						if (!(hasClass(links[i],'hasListener'))) {
							addClass(links[i],'hasListener');
							links[i].addEventListener('click',function(e) {
								e.preventDefault();
								var button = e.button;
								if ((modules['keyboardNav'].options.commentsLinkNewTab.value) || event.ctrlKey) {
									button = 1;
								}
								if (button == 1) {
									if (typeof(chrome) != 'undefined') {
										thisJSON = {
											requestType: 'keyboardNav',
											linkURL: this.getAttribute('href'),
											button: button
										}
										chrome.extension.sendRequest(thisJSON, function(response) {
											// send message to background.html to open new tabs...
											return true;
										});
									} else if (typeof(safari) != 'undefined') {
										thisJSON = {
											requestType: 'keyboardNav',
											linkURL: this.getAttribute('href'),
											button: button
										}
										safari.self.tab.dispatchMessage("keyboardNav", thisJSON);
									} else if (typeof(opera) != 'undefined') {
										thisJSON = {
											requestType: 'keyboardNav',
											linkURL: this.getAttribute('href'),
											button: button
										}
										opera.extension.postMessage(JSON.stringify(thisJSON));
									} else {
										window.open(this.getAttribute('href'));
									}
								} else {
									location.href = this.getAttribute('href');
								}
							}, true);
						}
						links[i].parentNode.insertBefore(annotation, links[i]);
					}
				}
			}
		}
	},
	keyUnfocus: function(obj) {
		removeClass(obj, 'keyHighlight');
		if (this.pageType == 'comments') {
			var annotations = obj.querySelectorAll('div.md .keyNavAnnotation');
			for (var i=0, len=annotations.length; i<len; i++) {
				annotations[i].parentNode.removeChild(annotations[i]);
			}
		}
	},
	drawHelp: function() {
		var thisHelp = createElementWithID('div','keyHelp');
		var helpTable = document.createElement('table');
		thisHelp.appendChild(helpTable);
		var helpTableHeader = document.createElement('thead');
		var helpTableHeaderRow = document.createElement('tr');
		var helpTableHeaderKey = document.createElement('th');
		helpTableHeaderKey.innerHTML = 'Key';
		helpTableHeaderRow.appendChild(helpTableHeaderKey);
		var helpTableHeaderFunction = document.createElement('th');
		helpTableHeaderFunction.innerHTML = 'Function';
		helpTableHeaderRow.appendChild(helpTableHeaderFunction);
		helpTableHeader.appendChild(helpTableHeaderRow);
		helpTable.appendChild(helpTableHeader);
		helpTableBody = document.createElement('tbody');
		for (i in this.options) {
			var isLink = new RegExp(/^link[\d]+$/i);
			if ((this.options[i].type == 'keycode') && (!isLink.test(i))) {
				var thisRow = document.createElement('tr');
				var thisRowKey = document.createElement('td');
				var keyCodeArray = this.options[i].value;
				if (typeof(keyCodeArray) == 'string') {
					keyCodeAarray = parseInt(keyCodeArray);
				}
				if (typeof(keyCodeArray) == 'number') {
					keyCodeArray = Array(keyCodeArray, false, false, false, false);
				}
				thisRowKey.innerHTML = RESUtils.niceKeyCode(keyCodeArray);
				thisRow.appendChild(thisRowKey);
				var thisRowDesc = document.createElement('td');
				thisRowDesc.innerHTML = this.options[i].description;
				thisRow.appendChild(thisRowDesc);
				helpTableBody.appendChild(thisRow);
			}
		}
		helpTable.appendChild(helpTableBody);
		document.body.appendChild(thisHelp);
	},
	handleKeyPress: function(e) {
		if (document.activeElement.tagName == 'BODY') {
			// comments page, or link list?
			keyArray = Array(e.keyCode, e.altKey, e.ctrlKey, e.shiftKey, e.metaKey);
			switch(this.pageType) {
				case 'linklist':
				case 'profile':
					switch(true) {
						case keyArrayCompare(keyArray, this.options.moveUp.value):
							this.moveUp();
							break;
						case keyArrayCompare(keyArray, this.options.moveDown.value):
							this.moveDown();
							break;
						case keyArrayCompare(keyArray, this.options.moveTop.value):
							this.moveTop();
							break;
						case keyArrayCompare(keyArray, this.options.moveBottom.value):
							this.moveBottom();
							break;
						case keyArrayCompare(keyArray, this.options.followLink.value):
							this.followLink();
							break;
						case keyArrayCompare(keyArray, this.options.followLinkNewTab.value):
							this.followLink(true);
							break;
						case keyArrayCompare(keyArray, this.options.followComments.value):
							this.followComments();
							break;
						case keyArrayCompare(keyArray, this.options.followCommentsNewTab.value):
							this.followComments(true);
							break;
						case keyArrayCompare(keyArray, this.options.toggleExpando.value):
							this.toggleExpando();
							break;
						case keyArrayCompare(keyArray, this.options.followLinkAndCommentsNewTab.value):
							e.preventDefault();
							this.followLinkAndComments();
							break;
						case keyArrayCompare(keyArray, this.options.followLinkAndCommentsNewTabBG.value):
							e.preventDefault();
							this.followLinkAndComments(true);
							break;
						case keyArrayCompare(keyArray, this.options.upVote.value):
							this.upVote();
							break;
						case keyArrayCompare(keyArray, this.options.downVote.value):
							this.downVote();
							break;
						case keyArrayCompare(keyArray, this.options.save.value):
							this.saveLink();
							break;
						case keyArrayCompare(keyArray, this.options.inbox.value):
							e.preventDefault();
							this.inbox();
							break;
						case keyArrayCompare(keyArray, this.options.frontPage.value):
							e.preventDefault();
							this.frontPage();
							break;
						case keyArrayCompare(keyArray, this.options.nextPage.value):
							e.preventDefault();
							this.nextPage();
							break;
						case keyArrayCompare(keyArray, this.options.prevPage.value):
							e.preventDefault();
							this.prevPage();
							break;
						case keyArrayCompare(keyArray, this.options.toggleHelp.value):
							this.toggleHelp();
							break;
						case keyArrayCompare(keyArray, this.options.toggleCmdLine.value):
							this.toggleCmdLine();
							break;
						case keyArrayCompare(keyArray, this.options.hide.value):
							this.hide();
							break;
						case keyArrayCompare(keyArray, this.options.followSubreddit.value):
							this.followSubreddit();
							break;
						default:
							// do nothing. unrecognized key.
							break;
					}
					break;
				case 'comments':
					switch(true) {
						case keyArrayCompare(keyArray, this.options.toggleHelp.value):
							this.toggleHelp();
							break;
						case keyArrayCompare(keyArray, this.options.toggleCmdLine.value):
							this.toggleCmdLine();
							break;
						case keyArrayCompare(keyArray, this.options.moveUp.value):
							this.moveUp();
							break;
						case keyArrayCompare(keyArray, this.options.moveDown.value):
							this.moveDown();
							break;
						case keyArrayCompare(keyArray, this.options.moveUpSibling.value):
							this.moveUpSibling();
							break;
						case keyArrayCompare(keyArray, this.options.moveDownSibling.value):
							this.moveDownSibling();
							break;
						case keyArrayCompare(keyArray, this.options.moveToParent.value):
							this.moveToParent();
							break;
						case keyArrayCompare(keyArray, this.options.toggleChildren.value):
							this.toggleChildren();
							break;
						case keyArrayCompare(keyArray, this.options.followLinkNewTab.value):
							// only execute if the link is selected on a comments page...
							if (this.activeIndex == 0) {
								this.followLink(true);
							}
							break;
						case keyArrayCompare(keyArray, this.options.save.value):
							if (this.activeIndex == 0) {
								this.saveLink();
							} else {
								this.saveComment();
							}
							break;
						case keyArrayCompare(keyArray, this.options.toggleExpando.value):
							this.toggleAllExpandos();
							break;
						case keyArrayCompare(keyArray, this.options.upVote.value):
							this.upVote();
							break;
						case keyArrayCompare(keyArray, this.options.downVote.value):
							this.downVote();
							break;
						case keyArrayCompare(keyArray, this.options.reply.value):
							e.preventDefault();
							this.reply();
							break;
						case keyArrayCompare(keyArray, this.options.inbox.value):
							e.preventDefault();
							this.inbox();
							break;
						case keyArrayCompare(keyArray, this.options.frontPage.value):
							e.preventDefault();
							this.frontPage();
							break;
						case keyArrayCompare(keyArray, this.options.link1.value):
							e.preventDefault();
							this.commentLink(0);
							break;
						case keyArrayCompare(keyArray, this.options.link2.value):
							e.preventDefault();
							this.commentLink(1);
							break;
						case keyArrayCompare(keyArray, this.options.link3.value):
							e.preventDefault();
							this.commentLink(2);
							break;
						case keyArrayCompare(keyArray, this.options.link4.value):
							e.preventDefault();
							this.commentLink(3);
							break;
						case keyArrayCompare(keyArray, this.options.link5.value):
							e.preventDefault();
							this.commentLink(4);
							break;
						case keyArrayCompare(keyArray, this.options.link6.value):
							e.preventDefault();
							this.commentLink(5);
							break;
						case keyArrayCompare(keyArray, this.options.link7.value):
							e.preventDefault();
							this.commentLink(6);
							break;
						case keyArrayCompare(keyArray, this.options.link8.value):
							e.preventDefault();
							this.commentLink(7);
							break;
						case keyArrayCompare(keyArray, this.options.link9.value):
							e.preventDefault();
							this.commentLink(8);
							break;
						case keyArrayCompare(keyArray, this.options.link10.value):
							e.preventDefault();
							this.commentLink(9);
							break;
						default:
							// do nothing. unrecognized key.
							break;
					}
					break;
				case 'inbox':
					switch(true) {
						case keyArrayCompare(keyArray, this.options.toggleHelp.value):
							this.toggleHelp();
							break;
						case keyArrayCompare(keyArray, this.options.toggleCmdLine.value):
							this.toggleCmdLine();
							break;
						case keyArrayCompare(keyArray, this.options.moveUp.value):
							this.moveUp();
							break;
						case keyArrayCompare(keyArray, this.options.moveDown.value):
							this.moveDown();
							break;
						case keyArrayCompare(keyArray, this.options.toggleChildren.value):
							this.toggleChildren();
							break;
						case keyArrayCompare(keyArray, this.options.upVote.value):
							this.upVote();
							break;
						case keyArrayCompare(keyArray, this.options.downVote.value):
							this.downVote();
							break;
						case keyArrayCompare(keyArray, this.options.reply.value):
							e.preventDefault();
							this.reply();
							break;
						case keyArrayCompare(keyArray, this.options.frontPage.value):
							e.preventDefault();
							this.frontPage();
							break;
						default:
							// do nothing. unrecognized key.
							break;
					}
					break;
			}
		} else {
			// console.log('ignored keypress');
		}
	},
	toggleHelp: function() {
		(document.getElementById('keyHelp').style.display == 'block') ? this.hideHelp() : this.showHelp();
	},
	showHelp: function() {
		// show help!
		RESUtils.fadeElementIn(document.getElementById('keyHelp'), 0.3);
	},
	hideHelp: function() {
		// show help!
		RESUtils.fadeElementOut(document.getElementById('keyHelp'), 0.3);
	},
	hide: function() {
		// find the hide link and click it...
		var hideLink = this.keyboardLinks[this.activeIndex].querySelector('form.hide-button > span > a');
		RESUtils.click(hideLink);
		if (this.options.onHideMoveDown.value) {
			this.moveDown();
		}
	},
	followSubreddit: function() {
		// find the subreddit link and click it...
		var srLink = this.keyboardLinks[this.activeIndex].querySelector('A.subreddit');
		if (srLink) {
			var thisHREF = srLink.getAttribute('href');
			location.href = thisHREF;
		}
	},
	moveUp: function() {
		if (this.activeIndex > 0) {
			this.keyUnfocus(this.keyboardLinks[this.activeIndex]);
			this.activeIndex--;
			thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
			// skip over hidden elements...
			while ((thisXY.x == 0) && (thisXY.y == 0) && (this.activeIndex > 0)) {
				this.activeIndex--;
				thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
			}
			this.keyFocus(this.keyboardLinks[this.activeIndex]);
			if (!(RESUtils.elementInViewport(this.keyboardLinks[this.activeIndex]))) {
				window.scrollTo(0,thisXY.y);
			}
		}
	},
	moveDown: function() {
		if (this.activeIndex < this.keyboardLinks.length-1) {
			this.keyUnfocus(this.keyboardLinks[this.activeIndex]);
			this.activeIndex++;
			thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
			// skip over hidden elements...
			while ((thisXY.x == 0) && (thisXY.y == 0) && (this.activeIndex < this.keyboardLinks.length-1)) {
				this.activeIndex++;
				thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
			}
			this.keyFocus(this.keyboardLinks[this.activeIndex]);
			// console.log('xy: ' + RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]).toSource());
			if (!(RESUtils.elementInViewport(this.keyboardLinks[this.activeIndex]))) {
				window.scrollTo(0,thisXY.y);
			}
		}
	},
	moveTop: function() {
			this.keyUnfocus(this.keyboardLinks[this.activeIndex]);
			this.activeIndex = 0;
			this.keyFocus(this.keyboardLinks[this.activeIndex]);
			thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
			if (!(RESUtils.elementInViewport(this.keyboardLinks[this.activeIndex]))) {
				window.scrollTo(0,thisXY.y);
			}
	},
	moveBottom: function() {
			this.keyUnfocus(this.keyboardLinks[this.activeIndex]);
			this.activeIndex = this.keyboardLinks.length-1;
			this.keyFocus(this.keyboardLinks[this.activeIndex]);
			thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
			if (!(RESUtils.elementInViewport(this.keyboardLinks[this.activeIndex]))) {
				window.scrollTo(0,thisXY.y);
			}
	},
	moveDownSibling: function() {
		if (this.activeIndex < this.keyboardLinks.length-1) {
			this.keyUnfocus(this.keyboardLinks[this.activeIndex]);
			var thisParent = this.keyboardLinks[this.activeIndex].parentNode;
			var childCount = thisParent.querySelectorAll('.entry').length;
			this.activeIndex += childCount;
			// skip over hidden elements...
			thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
			while ((thisXY.x == 0) && (thisXY.y == 0) && (this.activeIndex < this.keyboardLinks.length-1)) {
				this.activeIndex++;
				thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
			}
			if ((this.pageType == 'linklist') || (this.pageType == 'profile')) RESStorage.setItem('RESmodules.keyboardNavLastIndex.'+location.href, this.activeIndex);
			this.keyFocus(this.keyboardLinks[this.activeIndex]);
			if (!(RESUtils.elementInViewport(this.keyboardLinks[this.activeIndex]))) {
				window.scrollTo(0,thisXY.y);
			}
		}
	},
	moveUpSibling: function() {
		if (this.activeIndex < this.keyboardLinks.length-1) {
			this.keyUnfocus(this.keyboardLinks[this.activeIndex]);
			var thisParent = this.keyboardLinks[this.activeIndex].parentNode;
			if (thisParent.previousSibling != null) {
				var childCount = thisParent.previousSibling.previousSibling.querySelectorAll('.entry').length;
			} else {
				var childCount = 1;
			}
			this.activeIndex -= childCount;
			// skip over hidden elements...
			thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
			while ((thisXY.x == 0) && (thisXY.y == 0) && (this.activeIndex < this.keyboardLinks.length-1)) {
				this.activeIndex++;
				thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
			}
			if ((this.pageType == 'linklist') || (this.pageType == 'profile')) RESStorage.setItem('RESmodules.keyboardNavLastIndex.'+location.href, this.activeIndex);
			this.keyFocus(this.keyboardLinks[this.activeIndex]);
			if (!(RESUtils.elementInViewport(this.keyboardLinks[this.activeIndex]))) {
				window.scrollTo(0,thisXY.y);
			}
		}
	},
	moveToParent: function() {
		if ((this.activeIndex < this.keyboardLinks.length-1) && (this.activeIndex > 1)) {
			this.keyUnfocus(this.keyboardLinks[this.activeIndex]);
			var firstParent = this.keyboardLinks[this.activeIndex].parentNode;
			if (firstParent != null) {
				var thisParent = firstParent.parentNode.parentNode.previousSibling;
				var newKeyIndex = parseInt(thisParent.getAttribute('keyindex'));
				this.activeIndex = newKeyIndex;
				this.keyFocus(this.keyboardLinks[this.activeIndex]);
				thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
				if (!(RESUtils.elementInViewport(this.keyboardLinks[this.activeIndex]))) {
					window.scrollTo(0,thisXY.y);
				}
			}
		}
	},
	toggleChildren: function() {
		if (this.activeIndex == 0) {
			// Ahh, we're not in a comment, but in the main story... that key should follow the link.
			this.followLink();
		} else {
			// find out if this is a collapsed or uncollapsed view...
			var thisCollapsed = this.keyboardLinks[this.activeIndex].querySelector('div.collapsed');
			var thisNonCollapsed = this.keyboardLinks[this.activeIndex].querySelector('div.noncollapsed');
			if (thisCollapsed.style.display != 'none') {
				thisToggle = thisCollapsed.querySelector('a.expand');
			} else {
				// check if this is a "show more comments" box, or just contracted content...
				moreComments = thisNonCollapsed.querySelector('span.morecomments > a');
				if (moreComments) {
					thisToggle = moreComments;
				} else {
					thisToggle = thisNonCollapsed.querySelector('a.expand');
				}
			}
			RESUtils.click(thisToggle);
		}
	},
	toggleExpando: function() {
		var thisExpando = this.keyboardLinks[this.activeIndex].querySelector('.expando-button');
		if (thisExpando) {
			RESUtils.click(thisExpando);
			if (this.options.scrollOnExpando.value) {
				thisXY=RESUtils.getXYpos(this.keyboardLinks[this.activeIndex]);
				window.scrollTo(0,thisXY.y);
			}
		}
	},
	toggleAllExpandos: function() {
		var thisExpandos = this.keyboardLinks[this.activeIndex].querySelectorAll('.expando-button');
		if (thisExpandos) {
			for (var i=0,len=thisExpandos.length; i<len; i++) {
				RESUtils.click(thisExpandos[i]);
			}
		}
	},
	followLink: function(newWindow) {
		var thisA = this.keyboardLinks[this.activeIndex].querySelector('a.title');
		var thisHREF = thisA.getAttribute('href');
		// console.log(thisA);
		if (newWindow) {
			if (typeof(chrome) != 'undefined') {
				thisJSON = {
					requestType: 'keyboardNav',
					linkURL: thisHREF
				}
				chrome.extension.sendRequest(thisJSON, function(response) {
					// send message to background.html to open new tabs...
					return true;
				});
			} else if (typeof(safari) != 'undefined') {
				thisJSON = {
					requestType: 'keyboardNav',
					linkURL: thisHREF
				}
				safari.self.tab.dispatchMessage("keyboardNav", thisJSON);
			} else if (typeof(opera) != 'undefined') {
				thisJSON = {
					requestType: 'keyboardNav',
					linkURL: thisHREF
				}
				opera.extension.postMessage(JSON.stringify(thisJSON));
			} else {
				window.open(thisHREF);
			}
		} else {
			location.href = thisHREF;
		}
	},
	followComments: function(newWindow) {
		var thisA = this.keyboardLinks[this.activeIndex].querySelector('a.comments');
		var thisHREF = thisA.getAttribute('href');
		if (newWindow) {
			if (typeof(chrome) != 'undefined') {
				thisJSON = {
					requestType: 'keyboardNav',
					linkURL: thisHREF
				}
				chrome.extension.sendRequest(thisJSON, function(response) {
					// send message to background.html to open new tabs...
					return true;
				});
			} else if (typeof(safari) != 'undefined') {
				thisJSON = {
					requestType: 'keyboardNav',
					linkURL: thisHREF
				}
				safari.self.tab.dispatchMessage("keyboardNav", thisJSON);
			} else if (typeof(opera) != 'undefined') {
				thisJSON = {
					requestType: 'keyboardNav',
					linkURL: thisHREF
				}
				opera.extension.postMessage(JSON.stringify(thisJSON));
			} else {
				window.open(thisHREF);
			}
		} else {
			location.href = thisHREF;
		}
	},
	followLinkAndComments: function(background) {
		// find the [l+c] link and click it...
		var lcLink = this.keyboardLinks[this.activeIndex].querySelector('.redditSingleClick');
		RESUtils.mousedown(lcLink, background);
	},
	upVote: function() {
		if (this.keyboardLinks[this.activeIndex].previousSibling.tagName == 'A') {
			var upVoteButton = this.keyboardLinks[this.activeIndex].previousSibling.previousSibling.querySelector('div.up') || this.keyboardLinks[this.activeIndex].previousSibling.previousSibling.querySelector('div.upmod');
		} else {
			var upVoteButton = this.keyboardLinks[this.activeIndex].previousSibling.querySelector('div.up') || this.keyboardLinks[this.activeIndex].previousSibling.querySelector('div.upmod');
		}
		RESUtils.click(upVoteButton);
	},
	downVote: function() {
		if (this.keyboardLinks[this.activeIndex].previousSibling.tagName == 'A') {
			var downVoteButton = this.keyboardLinks[this.activeIndex].previousSibling.previousSibling.querySelector('div.down') || this.keyboardLinks[this.activeIndex].previousSibling.previousSibling.querySelector('div.downmod');
		} else {
			var downVoteButton = this.keyboardLinks[this.activeIndex].previousSibling.querySelector('div.down') || this.keyboardLinks[this.activeIndex].previousSibling.querySelector('div.downmod');
		}
		RESUtils.click(downVoteButton);
	},
	saveLink: function() {
		var saveLink = this.keyboardLinks[this.activeIndex].querySelector('form.save-button > span > a');
		if (saveLink) RESUtils.click(saveLink);
	},
	saveComment: function() {
		var saveComment = this.keyboardLinks[this.activeIndex].querySelector('.saveComments');
		if (saveComment) RESUtils.click(saveComment);
	},
	reply: function() {
		// activeIndex = 0 means we're at the original post, not a comment
		if ((this.activeIndex > 0) || (RESUtils.pageType() != 'comments')) {
			var commentButtons = this.keyboardLinks[this.activeIndex].querySelectorAll('ul.buttons > li > a');
			for (var i=0, len=commentButtons.length;i<len;i++) {
				if (commentButtons[i].innerHTML == 'reply') {
					RESUtils.click(commentButtons[i]);
				}
			}
		} else {
			infoBar = document.body.querySelector('.infobar');
			// We're on the original post, so shift keyboard focus to the comment reply box.
			if (infoBar) {
				// uh oh, we must be in a subpage, there is no first comment box. The user probably wants to reply to the OP. Let's take them to the comments page.
				var commentButton = this.keyboardLinks[this.activeIndex].querySelector('ul.buttons > li > a.comments');
				location.href = commentButton.getAttribute('href');
			} else {
				var firstCommentBox = document.querySelector('.commentarea textarea[name=text]');
				firstCommentBox.focus();
			}
		}
	},
	inbox: function() {
		location.href = 'http://www.reddit.com/message/inbox/';
	},
	frontPage: function() {
		location.href = 'http://www.reddit.com/';
	},
	nextPage: function() {
		// if Never Ending Reddit is enabled, just scroll to the bottom.  Otherwise, click the 'next' link.
		if (modules['neverEndingReddit'].isEnabled()) {
			this.moveBottom();
		} else {
			// get the first link to the next page of reddit...
			var nextPrevLinks = document.body.querySelectorAll('.content .nextprev a');
			if (nextPrevLinks.length > 0) {
				var nextLink = nextPrevLinks[nextPrevLinks.length-1];
				// RESUtils.click(nextLink);
				location.href = nextLink.getAttribute('href');
			}
		}
	},
	prevPage: function() {
		// if Never Ending Reddit is enabled, do nothing.  Otherwise, click the 'prev' link.
		if (modules['neverEndingReddit'].isEnabled()) {
			return false;
		} else {
			// get the first link to the next page of reddit...
			var nextPrevLinks = document.body.querySelectorAll('.content .nextprev a');
			if (nextPrevLinks.length > 0) {
				var prevLink = nextPrevLinks[0];
				// RESUtils.click(prevLink);
				location.href = prevLink.getAttribute('href');
			}
		}
	},
	commentLink: function(num) {
		if (this.options.commentsLinkNumbers.value) {
			var links = this.keyboardLinks[this.activeIndex].querySelectorAll('div.md a:not(.expando-button):not(.madeVisible)');
			if (typeof(links[num]) != 'undefined') {
				var thisLink = links[num];
				if ((thisLink.nextSibling) && (typeof(thisLink.nextSibling.tagName) != 'undefined') && (hasClass(thisLink.nextSibling, 'expando-button'))) {
					thisLink = thisLink.nextSibling;
				}
				RESUtils.click(thisLink);
			}
		}
	}
}; 

// user tagger functions
modules['userTagger'] = {
	moduleID: 'userTagger',
	moduleName: 'User Tagger',
	options: {
		defaultMark: {
			type: 'text',
			value: '_',
			description: 'clickable mark for users with no tag'
		},
		hardIgnore: {
			type: 'boolean',
			value: false,
			description: 'If "hard ignore" is off, only post titles and comment text is hidden. If it is on, the entire block is hidden - note that this would make it difficult/impossible for you to unignore a person.'
		},
		colorUser: {
			type: 'boolean',
			value: true,
			description: 'Color users based on cumulative upvotes / downvotes'
		},
		hoverInfo: {
			type: 'boolean',
			value: true,
			description: 'Show information on user (karma, how long they\'ve been a redditor) on hover.'
		},
		hoverDelay: {
			type: 'text',
			value: 400,
			description: 'Delay, in milliseconds, before hover tooltip loads. Default is 400.'
		},
		fadeDelay: {
			type: 'text',
			value: 200,
			description: 'Delay, in milliseconds, before hover tooltip fades away. Default is 200.'
		},
		USDateFormat: {
			type: 'boolean',
			value: false,
			description: 'Show date (redditor since...) in US format (i.e. 08-31-2010)'
		},
		vwNumber: {
			type: 'boolean',
			value: true,
			description: 'Show the number (i.e. [+6]) rather than [vw]'
		},
		vwTooltip: {
			type: 'boolean',
			value: true,
			description: 'Show the vote weight tooltip on hover (i.e. "your votes for...")'
		}
	},
	description: 'Adds a great deal of customization around users - tagging them, ignoring them, and more.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	include: new Array(
		/^https?:\/\/([-\w\.]+\.)?reddit\.com\/[-\w\.]*/i
	),
	exclude: new Array(
		/^https?:\/\/www\.reddit\.com\/prefs\//i
	),
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			
			// Get user tag data...
			var tags = RESStorage.getItem('RESmodules.userTagger.tags');
			this.tags = null;
			if (typeof(tags) != 'undefined') this.tags = safeJSON.parse(tags, 'RESmodules.userTagger.tags');
			// check if we're using the old method of storing user tags... yuck!
			if (this.tags == null) {
				this.updateTagStorage();
			}
			// set up an array to cache user data
			this.authorInfoCache = Array();
			if (this.options.colorUser.value) {
				var voteButtons = document.body.querySelectorAll('.arrow');
				this.voteStates = new Array();
				for (var i=0, len=voteButtons.length;i<len;i++) {
					// get current vote states so that when we listen, we check the delta...
					// pairNum is just the index of the "pair" of vote arrows... it's i/2 with no remainder...
					pairNum = Math.floor(i/2);
					if (typeof(this.voteStates[pairNum]) == 'undefined') {
						this.voteStates[pairNum] = 0;
					}
					if (hasClass(voteButtons[i], 'upmod')) {
						this.voteStates[pairNum] = 1;
					} else if (hasClass(voteButtons[i], 'downmod')) {
						this.voteStates[pairNum] = -1;
					}
					// add an event listener to vote buttons...
					voteButtons[i].setAttribute('pairNum',pairNum);
					voteButtons[i].addEventListener('click', function(e) {
						if (e.target.getAttribute('onclick').indexOf('unvotable') == -1) {
							var pairNum = e.target.getAttribute('pairNum');
							if (pairNum) pairNum = parseInt(pairNum);
							var thisAuthorA = this.parentNode.nextSibling.querySelector('p.tagline a.author');
							var thisVWobj = this.parentNode.nextSibling.querySelector('.voteWeight');
							var thisAuthor = thisAuthorA.text;
							var votes = 0;
							if (typeof(modules['userTagger'].tags[thisAuthor]) != 'undefined') {
								if (typeof(modules['userTagger'].tags[thisAuthor].votes) != 'undefined') {
									votes = parseInt(modules['userTagger'].tags[thisAuthor].votes);
								}
							} else {
								modules['userTagger'].tags[thisAuthor] = {};
							}
							// there are 6 possibilities here:
							// 1) no vote yet, click upmod
							// 2) no vote yet, click downmod
							// 3) already upmodded, undoing
							// 4) already downmodded, undoing
							// 5) upmodded before, switching to downmod
							// 6) downmodded before, switching to upmod
							var upOrDown = '';
							((hasClass(this, 'up')) || (hasClass(this, 'upmod'))) ? upOrDown = 'up' : upOrDown = 'down';
							// did they click the up arrow, or down arrow?
							switch (upOrDown) {
								case 'up':
									// the class changes BEFORE the click event is triggered, so we have to look at them backwards.
									// if the arrow now has class "up" instead of "upmod", then it was "upmod" before, which means
									// we are undoing an upvote...
									if (hasClass(this, 'up')) {
										// this is an undo of an upvote. subtract one from votes. We end on no vote.
										votes--;
										modules['userTagger'].voteStates[pairNum] = 0;
									} else {
										// They've upvoted... the question is, is it an upvote alone, or an an undo of a downvote?
										// add one vote either way...
										votes++;
										// if it was previously downvoted, add another!
										if (modules['userTagger'].voteStates[pairNum] == -1) {
											votes++;
										}
										modules['userTagger'].voteStates[pairNum] = 1;
									}
									break;
								case 'down':
									// the class changes BEFORE the click event is triggered, so we have to look at them backwards.
									// if the arrow now has class "up" instead of "upmod", then it was "upmod" before, which means
									// we are undoing an downvote...
									if (hasClass(this, 'down')) {
										// this is an undo of an downvote. subtract one from votes. We end on no vote.
										votes++;
										modules['userTagger'].voteStates[pairNum] = 0;
									} else {
										// They've downvoted... the question is, is it an downvote alone, or an an undo of an upvote?
										// subtract one vote either way...
										votes--;
										// if it was previously upvoted, subtract another!
										if (modules['userTagger'].voteStates[pairNum] == 1) {
											votes--;
										}
										modules['userTagger'].voteStates[pairNum] = -1;
									}
									break;
							}
							/*
							if ((hasClass(this, 'upmod')) || (hasClass(this, 'down'))) {
								// upmod = upvote.  down = undo of downvote.
								votes = votes + 1;
							} else if ((hasClass(this, 'downmod')) || (hasClass(this, 'up'))) {
								// downmod = downvote.  up = undo of downvote.
								votes = votes - 1;
							}
							*/
							modules['userTagger'].tags[thisAuthor].votes = votes;
							RESStorage.setItem('RESmodules.userTagger.tags', JSON.stringify(modules['userTagger'].tags));
							modules['userTagger'].colorUser(thisVWobj, thisAuthor, votes);
						}
						
					}, true);
				}
			}
			// add tooltip to document body...
			var css = '#userTaggerToolTip { display: none; position: absolute; padding: 5px; background-color: #CCCCCC; border: 3px solid #999999; border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px 5px 5px 5px; width: 160px; font-size: 14px; color: #000000;  }';
			css += '#userTaggerToolTip label { margin-top: 5px; clear: both; float: left; width: 60px; }';
			css += '#userTaggerToolTip input[type=text], #userTaggerToolTip select { margin-top: 5px; float: left; width: 80px; }';
			css += '#userTaggerToolTip input[type=checkbox] { margin-top: 5px; float: left; }';
			css += '#userTaggerToolTip input[type=submit] { margin-left: 60px; margin-top: 0px; } ';
			css += '.ignoredUserComment { color: #CACACA; padding: 3px; font-size: 10px; }';
			css += '.ignoredUserPost { color: #CACACA; padding: 3px; font-size: 10px; }';
			css += 'a.voteWeight { text-decoration: none; color: #336699; }';
			css += 'a.voteWeight:hover { text-decoration: none; }';
			css += '#authorInfoToolTip { display: none; position: absolute; padding: 5px; background-color: #EFF7FF; border: 3px solid #CEE3F8; border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px 5px 5px 5px; width: 180px; font-size: 11px; color: #000000;  }';
			css += '#benefits { width: 200px; margin-left: 0px; }';
			RESUtils.addCSS(css);
			this.userTaggerToolTip = createElementWithID('div','userTaggerToolTip');
			thisHTML = '<form name="userTaggerForm" action=""><input type="hidden" id="userTaggerName" value="">';
			thisHTML += '<label for="userTaggerTag">Tag</label> <input type="text" id="userTaggerTag" value="">';
			thisHTML += '<label for="userTaggerColor">Color</label> <select id="userTaggerColor">';
			for (color in this.bgToTextColorMap) {
				thisValue = color;
				if (thisValue == 'none') thisValue = '';
				thisHTML += '<option style="background-color: '+color+'; color: '+this.bgToTextColorMap[color]+'" value="'+thisValue+'">'+color+'</option>';
			}
			thisHTML += '</select><br>';
			thisHTML += '<label for="userTaggerTag">Ignore</label> <input type="checkbox" id="userTaggerIgnore" value="true"><div class="clear"></div><input type="submit" id="userTaggerSave" value="Save"></form>';
			this.userTaggerToolTip.innerHTML = thisHTML;
			// userTaggerSave = createElementWithID('input', 'userTaggerSave');
			userTaggerSave = this.userTaggerToolTip.querySelector('#userTaggerSave');
			userTaggerSave.setAttribute('type','submit');
			userTaggerSave.setAttribute('value','Save');
			userTaggerSave.addEventListener('click', function(e) {
				e.preventDefault();
				modules['userTagger'].saveTagForm();
			}, false);
			//this.userTaggerToolTip.appendChild(userTaggerSave);
			this.userTaggerForm = this.userTaggerToolTip.querySelector('FORM');
			this.userTaggerForm.addEventListener('submit',function(e) {
				e.preventDefault();
				modules['userTagger'].saveTagForm();
			}, true);
			document.body.appendChild(this.userTaggerToolTip);
			if (this.options.hoverInfo.value) {
				this.authorInfoToolTip = createElementWithID('div','authorInfoToolTip');
				this.authorInfoToolTip.addEventListener('mouseover', function(e) {
					if (typeof(modules['userTagger'].hideTimer) != 'undefined') {
						clearTimeout(modules['userTagger'].hideTimer);
					}
				}, false);
				this.authorInfoToolTip.addEventListener('mouseout', function(e) {
					if (e.target.getAttribute('class') != 'hoverAuthor') {
						modules['userTagger'].hideTimer = setTimeout(function() {
							modules['userTagger'].hideAuthorInfo();
						}, modules['userTagger'].options.fadeDelay.value);
					}
				}, false);
				document.body.appendChild(this.authorInfoToolTip);
			}
			document.getElementById('userTaggerTag').addEventListener('keydown', function(e) {
				if (e.keyCode == 27) {
					// close prompt.
					modules['userTagger'].closeUserTagPrompt();
				}
			}, true);
			//console.log('before applytags: ' + Date());
			this.applyTags();
			//console.log('after applytags: ' + Date());
			// listen for new DOM nodes so that modules like autopager, river of reddit, etc still get user tags
			document.body.addEventListener('DOMNodeInserted', function(event) {
				// if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
				if ((event.target.tagName == 'DIV') && ((event.target.getAttribute('id') == 'siteTable') || (hasClass(event.target,'child')) || (hasClass(event.target,'thing')))) {
					modules['userTagger'].applyTags(event.target);
				}
			}, true);
			var userpagere = new RegExp(/https?:\/\/([a-z]+).reddit.com\/user\/[-\w\.]+\/?/i);
			if (userpagere.test(location.href)) {
				var friendButton = document.querySelector('.titlebox .fancy-toggle-button');
				if ((typeof(friendButton) != 'undefined') && (friendButton != null)) {
					var firstAuthor = document.querySelector('a.author');
					if ((typeof(firstAuthor) != 'undefined') && (firstAuthor != null)) {
						var thisFriendComment = firstAuthor.getAttribute('title');
						(thisFriendComment != null) ? thisFriendComment = thisFriendComment.substring(8,thisFriendComment.length-1) : thisFriendComment = '';
					} else {
						var thisFriendComment = '';
					}
					var benefitsForm = document.createElement('div');
					var thisUser = document.querySelector('.titlebox > h1').innerHTML;
					benefitsForm.innerHTML = '<form action="/post/friendnote" id="friendnote-r9_2vt1" method="post" class="pretty-form medium-text friend-note" onsubmit="return post_form(this, \'friendnote\');"><input type="hidden" name="name" value="'+thisUser+'"><input type="text" maxlength="300" name="note" id="benefits" class="tiny" onfocus="$(this).parent().addClass(\'edited\')" value="'+thisFriendComment+'"><button onclick="$(this).parent().removeClass(\'edited\')" type="submit">submit</button><span class="status"></span></form>';
					insertAfter( friendButton, benefitsForm );
				}
			}
		}
	},
	saveTagForm: function() {
		var thisName = document.getElementById('userTaggerName').value;
		var thisTag = document.getElementById('userTaggerTag').value;
		var thisColor = document.getElementById('userTaggerColor').value;
		var thisIgnore = document.getElementById('userTaggerIgnore').checked;
		modules['userTagger'].setUserTag(thisName, thisTag, thisColor, thisIgnore);
	},
	bgToTextColorMap: {
		'none':'black',
		'aqua':'black',
		'black':'white',
		'blue':'white',
		'fuchsia':'white',
		'gray':'white',
		'green':'white',
		'lime':'black',
		'maroon':'white',
		'navy':'white',
		'olive':'black',
		'orange':'black',
		'purple':'white',
		'red':'black',
		'silver':'black',
		'teal':'white',
		'white':'black',
		'yellow':'black'
	},
	openUserTagPrompt: function(obj, username) {
		thisXY=RESUtils.getXYpos(obj);
		this.clickedTag = obj;
		document.getElementById('userTaggerName').value = username;
		var thisTag = null;
		var thisIgnore = null;
		if (typeof(this.tags[username]) != 'undefined') {
			if (typeof(this.tags[username].tag) != 'undefined') document.getElementById('userTaggerTag').value = this.tags[username].tag;
			if (typeof(this.tags[username].ignore) != 'undefined') document.getElementById('userTaggerIgnore').value = this.tags[username].ignore;
			if (typeof(this.tags[username].color) != 'undefined') {
				RESUtils.setSelectValue(document.getElementById('userTaggerColor'), this.tags[username].color);
			}
		}
		this.userTaggerToolTip.setAttribute('style', 'display: block; top: ' + thisXY.y + 'px; left: ' + thisXY.x + 'px;');
		document.getElementById('userTaggerTag').focus();
		return false;
	},
	closeUserTagPrompt: function() {
		this.userTaggerToolTip.setAttribute('style','display: none');
		if (modules['keyboardNav'].isEnabled()) {
			var inputs = this.userTaggerToolTip.querySelectorAll('INPUT, BUTTON');
			// remove focus from any input fields from the prompt so that keyboard navigation works again...
			for (var i=0,len=inputs.length; i<len; i++) {
				inputs[i].blur();
			}
		}
	},
	setUserTag: function(username, tag, color, ignore) {
		if ((tag != null) && (tag != '')) {
			if (typeof(this.tags[username]) == 'undefined') this.tags[username] = {};
			this.tags[username].tag = tag;
			if (color != '') {
				this.tags[username].color = color;
			}
			RESStorage.setItem('RESmodules.userTagger.tags', JSON.stringify(this.tags));
			this.clickedTag.setAttribute('style', 'background-color: '+color+'; color: ' + this.bgToTextColorMap[color]);
			this.clickedTag.innerHTML = tag;
		} else {
			delete this.tags[username].tag;
			delete this.tags[username].color;
			RESStorage.setItem('RESmodules.userTagger.tags', JSON.stringify(this.tags));
			this.clickedTag.setAttribute('style', 'background-color: none');
			this.clickedTag.innerHTML = this.options.defaultMark.value;
		}
		if (ignore) {
			this.tags[username].ignore = true;
		} else {
			delete this.tags[username].ignore;
		}
		if (RESUtils.isEmpty(this.tags[username])) delete this.tags[username];
		RESStorage.setItem('RESmodules.userTagger.tags', JSON.stringify(this.tags));
		this.closeUserTagPrompt();
	},
	applyTags: function(ele) {
		if (ele == null) ele = document;
		this.authors = ele.querySelectorAll('.noncollapsed a.author, p.tagline a.author');
		this.authorCount = this.authors.length;
		this.authori = 0;
		(function(){
			modules['userTagger'].authorCount;
			var chunkLength = Math.min((modules['userTagger'].authorCount - modules['userTagger'].authori), 15);
			for (var i=0;i<chunkLength;i++) {
				modules['userTagger'].applyTagToAuthor(modules['userTagger'].authori);
				modules['userTagger'].authori++;
			}
			if (modules['userTagger'].authori < modules['userTagger'].authorCount) {
				setTimeout(arguments.callee, 1000);
			}
		})();		
	},
	applyTagToAuthor: function(authorNum) {
		var userObject = new Array();
		var thisAuthorObj = this.authors[authorNum];
		if ((!(hasClass(thisAuthorObj,'userTagged'))) && (typeof(thisAuthorObj) != 'undefined') && (thisAuthorObj != null)) {
			if (this.options.hoverInfo.value) {
				// add event listener to hover, so we can grab user data on hover...
				thisAuthorObj.addEventListener('mouseover', function(e) {
					modules['userTagger'].showTimer = setTimeout(function() {
						modules['userTagger'].showAuthorInfo(thisAuthorObj);
					}, modules['userTagger'].options.hoverDelay.value);
				}, false);
				thisAuthorObj.addEventListener('mouseout', function(e) {
					clearTimeout(modules['userTagger'].showTimer);
				}, false);
			}
			var thisAuthor = thisAuthorObj.text;
			addClass(thisAuthorObj, 'userTagged');
			if (typeof(userObject[thisAuthor]) == 'undefined') {
				var thisVotes = 0;
				var thisTag = null;
				var thisColor = null;
				var thisIgnore = null;
				if ((this.tags != null) && (typeof(this.tags[thisAuthor]) != 'undefined')) {
					if (typeof(this.tags[thisAuthor].votes) != 'undefined') {
						thisVotes = parseInt(this.tags[thisAuthor].votes);
					}
					if (typeof(this.tags[thisAuthor].tag) != 'undefined') {
						thisTag = this.tags[thisAuthor].tag;
					}
					if (typeof(this.tags[thisAuthor].color) != 'undefined') {
						thisColor = this.tags[thisAuthor].color;
					}
					if (typeof(this.tags[thisAuthor].ignore) != 'undefined') {
						thisIgnore = this.tags[thisAuthor].ignore;
					}
				}
				userObject[thisAuthor] = {
					tag: thisTag,
					color: thisColor,
					ignore: thisIgnore,
					votes: thisVotes
				}
			}
			if (!(thisTag)) thisTag = this.options.defaultMark.value;
			
			var userTagFrag = document.createDocumentFragment();
			
			var userTagLink = document.createElement('a');
			userTagLink.setAttribute('class','userTagLink');
			userTagLink.innerHTML = thisTag;
			if (thisColor) {
				userTagLink.setAttribute('style','background-color: '+thisColor+'; color: '+this.bgToTextColorMap[thisColor]);
			}
			userTagLink.setAttribute('username',thisAuthor);
			userTagLink.setAttribute('title','set a tag');
			userTagLink.setAttribute('href','javascript:void(0)');
			userTagLink.addEventListener('click', function(e) {
				modules['userTagger'].openUserTagPrompt(this, this.getAttribute('username'));
			}, true);
			var userTag = document.createElement('span');
			var lp = document.createTextNode(' (');
			var rp = document.createTextNode(')');
			userTag.appendChild(userTagLink);
			userTagFrag.appendChild(lp);
			userTagFrag.appendChild(userTag);
			userTagFrag.appendChild(rp);
			if (this.options.colorUser.value) {
				var userVoteFrag = document.createDocumentFragment();
				var spacer = document.createTextNode(' ');
				userVoteFrag.appendChild(spacer);
				var userVoteWeight = document.createElement('a');
				userVoteWeight.setAttribute('href','javascript:void(0)');
				userVoteWeight.setAttribute('class','voteWeight');
				userVoteWeight.innerHTML = '[vw]';
				this.colorUser(userVoteWeight, thisAuthor, userObject[thisAuthor].votes);
				userVoteFrag.appendChild(userVoteWeight);
				userTagFrag.appendChild(userVoteFrag);
			}
			insertAfter( thisAuthorObj, userTagFrag );
			// thisAuthorObj.innerHTML += userTagFrag.innerHTML;
			thisIgnore = userObject[thisAuthor].ignore;
			if (thisIgnore) {
				if (this.options.hardIgnore.value) {
					var commentsre = new RegExp(/comments\/[-\w\.\/]/i);
					if (commentsre.test(location.href)) {
						var thisComment = thisAuthorObj.parentNode.parentNode;
						// hide comment block first...
						thisComment.style.display = 'none';
						// hide associated voting block...
						thisComment.previousSibling.style.display = 'none';
					} else {
						var thisPost = thisAuthorObj.parentNode.parentNode.parentNode;
						// hide post block first...
						thisPost.style.display = 'none';
						// hide associated voting block...
						thisPost.previousSibling.style.display = 'none';
					}
				} else {
					var commentsre = new RegExp(/comments\/[-\w\.\/]/i);
					if (commentsre.test(location.href)) {
						var thisComment = thisAuthorObj.parentNode.parentNode.querySelector('.usertext');
						thisComment.innerHTML = thisAuthor + ' is an ignored user';
						addClass(thisComment, 'ignoredUserComment');
					} else {
						var thisPost = authors[i].parentNode.parentNode.parentNode.querySelector('p.title');
						thisPost.innerHTML = thisAuthor + ' is an ignored user';
						thisPost.setAttribute('class','ignoredUserPost');
					}
				}
			}
		}
	},
	colorUser: function(obj, author, votes) {
		if (this.options.colorUser.value) {
			var red = 255;
			var green = 255;
			var blue = 255;
			var voteString = '+';
			if (votes > 0) {
				red = Math.max(0, (255-(8*votes)));
				green = 255;
				blue = Math.max(0, (255-(8*votes)));
			} else if (votes < 0) {
				red = 255;
				green = Math.max(0, (255-Math.abs(8*votes)));
				blue = Math.max(0, (255-Math.abs(8*votes)));
				voteString = '';
			}
			voteString = voteString + votes;
			var rgb='rgb('+red+','+green+','+blue+')';
			if (obj != null) {
				if (votes == 0) {
					obj.style.display = 'none';
				} else {
					obj.style.display = 'inline';
					obj.style.backgroundColor = rgb;
					if (this.options.vwNumber.value) obj.innerHTML = '[' + voteString + ']';
					if (this.options.vwTooltip.value) obj.setAttribute('title','your votes for '+author+': '+voteString);
				}
			}
		}
	},
	showAuthorInfo: function(obj) {
		thisXY=RESUtils.getXYpos(obj);
		this.authorInfoToolTip.innerHTML = '<a class="hoverAuthor" href="/user/'+obj.text+'">'+obj.text+'</a>:<br><img src="'+RESConsole.loader+'"> loading...';
		this.authorInfoToolTip.setAttribute('style', 'top: ' + (thisXY.y - 10) + 'px; left: ' + (thisXY.x - 10) + 'px;');
		RESUtils.fadeElementIn(this.authorInfoToolTip, 0.3);
		var thisUserName = obj.text;
		setTimeout(function() {
			if (!RESUtils.elementUnderMouse(modules['userTagger'].authorInfoToolTip)) {
				modules['userTagger'].hideAuthorInfo();
			}
		}, 1000);
		if (typeof(this.authorInfoCache[thisUserName]) != 'undefined') {
			this.writeAuthorInfo(this.authorInfoCache[thisUserName]);
		} else {
			GM_xmlhttpRequest({
				method:	"GET",
				url:	location.protocol + "//www.reddit.com/user/" + thisUserName + "/about.json",
				onload:	function(response) {
					var thisResponse = JSON.parse(response.responseText);
					modules['userTagger'].authorInfoCache[thisUserName] = thisResponse;
					modules['userTagger'].writeAuthorInfo(thisResponse);
				}
			});
		}
	},
	writeAuthorInfo: function(jsonData) {
		var utctime = jsonData.data.created;
		var d = new Date(utctime*1000);
		var userHTML = '<a class="hoverAuthor" href="/user/'+jsonData.data.name+'">'+jsonData.data.name+'</a>:';
		userHTML += '<br>Link Karma: ' + jsonData.data.link_karma;
		userHTML += '<br>Comment Karma: ' + jsonData.data.comment_karma;
		userHTML += '<br>Redditor since: ' + RESUtils.niceDate(d, this.options.USDateFormat.value) + '<br>('+RESUtils.niceDateDiff(d)+')';
		this.authorInfoToolTip.innerHTML = userHTML;
	},
	hideAuthorInfo: function(obj) {
		// this.authorInfoToolTip.setAttribute('style', 'display: none');
		RESUtils.fadeElementOut(this.authorInfoToolTip, 0.3);
	},
	updateTagStorage: function() {
		// update tag storage format from the old individual bits to a big JSON blob
		// It's OK that we're directly accessing localStorage here because if they have old school tag storage, it IS in localStorage.
		(typeof(unsafeWindow) != 'undefined') ? ls = unsafeWindow.localStorage : ls = localStorage;
		var tags = {};
		var toRemove = new Array();
		for (var i = 0, len=ls.length; i < len; i++){
			var keySplit = null;
			if (ls.key(i)) keySplit = ls.key(i).split('.');
			if (keySplit) {
				var keyRoot = keySplit[0];
				switch (keyRoot) {
					case 'reddituser':
						var thisNode = keySplit[1];
						if (typeof(tags[keySplit[2]]) == 'undefined') {
							tags[keySplit[2]] = {};
						}
						if (thisNode == 'votes') {
							tags[keySplit[2]].votes = ls.getItem(ls.key(i));
						} else if (thisNode == 'tag') {
							tags[keySplit[2]].tag = ls.getItem(ls.key(i));
						} else if (thisNode == 'color') {
							tags[keySplit[2]].color = ls.getItem(ls.key(i));
						} else if (thisNode == 'ignore') {
							tags[keySplit[2]].ignore = ls.getItem(ls.key(i));
						}
						// now delete the old stored garbage...
						var keyString = 'reddituser.'+thisNode+'.'+keySplit[2];
						toRemove.push(keyString);
						break;
					default:
						// console.log('Not currently handling keys with root: ' + keyRoot);
						break;
				}
			}
		}
		this.tags = tags;
		RESStorage.setItem('RESmodules.userTagger.tags', JSON.stringify(this.tags));
		// now remove the old garbage...
		for (var i=0, len=toRemove.length; i<len; i++) {
			ls.removeItem(toRemove[i]);
		}
	}
};

// betteReddit
modules['betteReddit'] = {
	moduleID: 'betteReddit',
	moduleName: 'betteReddit',
	options: {
		fullCommentsLink: {
			type: 'boolean',
			value: true,
			description: 'add "full comments" link to comment replies, etc'
		},
		fullCommentsText: {
			type: 'text',
			value: 'full comments',
			description: 'text of full comments link'
		},
		fixSaveLinks: {
			type: 'boolean',
			value: true,
			description: 'Make "save" links change to "unsave" links when clicked'
		},
		searchSubredditByDefault: {
			type: 'boolean',
			value: true,
			description: 'Search the current subreddit by default when using the search box, instead of all of reddit.'
		},
		manageSubreddits: {
			type: 'boolean',
			value: false,
			description: 'Replace the top bar with a custom Subreddit manager.'
		},
		linkAll: {
			type: 'boolean',
			value: true,
			description: 'Show "ALL" link in subreddit manager'
		},
		linkRandom: {
			type: 'boolean',
			value: true,
			description: 'Show "RANDOM" link in subreddit manager'
		},
		linkFriends: {
			type: 'boolean',
			value: true,
			description: 'Show "FRIENDS" link in subreddit manager'
		},
		linkMod: {
			type: 'boolean',
			value: true,
			description: 'Show "MOD" link in subreddit manager'
		},
		showUnreadCount: {
			type: 'boolean',
			value: true,
			description: 'Show unread message count next to orangered?'
		}
		/* not yet. this ended up being much trickier than I thought it might be...
		pinSubredditBar: {
			type: 'boolean',
			value: false,
			description: 'Pin subreddit bar to the top even when you scroll'
		}
		*/
	},
	description: 'Adds a number of interface enhancements to Reddit, such as a Subreddit manager, "full comments" links, and more',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	include: Array(
		/*
		/http:\/\/([a-z]+).reddit.com\/user\/[-\w\.]+\/?/i,
		/http:\/\/([a-z]+).reddit.com\/message\/[-\w\.]*\/?/i,
		/http:\/\/([a-z]+).reddit.com\/message\/comments\/[-\w\.]+/i 
		*/
		/https?:\/\/([a-z]+).reddit.com\/.*/i
	),
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			
			if (((RESUtils.pageType() == 'inbox') || (RESUtils.pageType() == 'profile')) && (this.options.fullCommentsLink.value)) {
				this.fullComments();
			}
			if (((RESUtils.pageType() == 'linklist') || (RESUtils.pageType() == 'comments')) && (this.options.fixSaveLinks.value)) {
				this.fixSaveLinks();
			}
			if (this.options.manageSubreddits.value) {
				this.manageSubreddits();
				if (RESUtils.currentSubreddit() != null) {
					this.setLastViewtime();
				}
			}
			if ((RESUtils.currentSubreddit() != null) && (this.options.searchSubredditByDefault.value)) {
				// make sure we're not on a search results page...
				if (location.href.indexOf('/r/'+RESUtils.currentSubreddit()+'/search') == -1) {
					this.searchSubredditByDefault();
				}
			}
			/* this won't work because getting the JSON kills your orangered.  I even tried marking a message unread to restore the orangered, but that won't work.
			or maybe it will with "http://www.reddit.com/message/inbox/.json?mark=false" ?
			*/
			if ((RESUtils.loggedInUser() != null) && (this.options.showUnreadCount.value)) {
				var mail = document.querySelector('#mail');
				if (mail) {
					if (hasClass(mail, 'havemail')) {
						var lastCheck = parseInt(RESStorage.getItem('RESmodules.betteReddit.msgCount.lastCheck.'+RESUtils.loggedInUser())) || 0;
						var now = new Date();
						// 300000 = 5 minutes... we don't want to annoy Reddit's servers too much with this query...
						if ((now.getTime() - lastCheck) > 300000) {
							GM_xmlhttpRequest({
								method:	"GET",
								url:	location.protocol + '//' + location.hostname + "/message/unread/.json?mark=false",
								onload:	function(response) {
									// save that we've checked in the last 5 minutes
									var now = new Date();
									RESStorage.setItem('RESmodules.betteReddit.msgCount.lastCheck.'+RESUtils.loggedInUser(), now.getTime());
									var data = JSON.parse(response.responseText);
									var count = data.data.children.length;
									RESStorage.setItem('RESmodules.betteReddit.msgCount.'+RESUtils.loggedInUser(), count);
									var countText = document.createTextNode(' [' + count + ']');
									var now = new Date();
									mail.appendChild(countText);
									// get the first MsgID so we can mark it unread, and bring back the orangered since Reddit kills it!
									// var firstMsgID = data.data.children[0].data.id;
									// okay, mark that first msg unread so we can keep our envelope orangered.
									// wait a few seconds to be nice to the Reddit API rate limiting...
									/* no longer needed, yay!
									setTimeout(
										GM_xmlhttpRequest({
											method:	"POST",
											url:	'http://' + location.hostname + "/api/unread_message",
											data: 'id=' + firstMsgID,
											headers: {
												"Content-Type": "application/x-www-form-urlencoded"
											},
											onload:	function(response) {
												console.log('marked it unread!');
											}
										}),
										2000
									);
									*/
								}
							});
						} else {
							var count = RESStorage.getItem('RESmodules.betteReddit.msgCount.'+RESUtils.loggedInUser());
							var countText = document.createTextNode(' [' + count + ']');
							var now = new Date();
							mail.appendChild(countText);
						}
					} else {
						// console.log('no need to get count - no new mail. resetting lastCheck');
						RESStorage.setItem('RESmodules.betteReddit.msgCount.lastCheck.'+RESUtils.loggedInUser(), 0);
					}
				}
			}
		}
	},
	fullComments: function() {
		var entries = document.querySelectorAll('#siteTable .entry');

		for (var i=0, len=entries.length; i<len;i++) {
			// bug in chrome, barfs on for i in loops with queryselectorall...
			if (i == 'length') break;
			var linkEle = entries[i].querySelector('A.bylink');
			var thisCommentsLink = '';
			if ((typeof(linkEle) != 'undefined') && (linkEle != null)) {
				thisCommentsLink = linkEle.getAttribute('href');
			}
			if (thisCommentsLink != '') {
				thisCommentsSplit = thisCommentsLink.split("/");
				thisCommentsSplit.pop();
				thisCommentsLink = thisCommentsSplit.join("/");
				linkList = entries[i].querySelector('.flat-list');
				var fullCommentsLink = document.createElement('li');
				fullCommentsLink.innerHTML = '<a class="redditFullComments" href="' + thisCommentsLink + '">'+ this.options.fullCommentsText.value +'</a>';
				linkList.appendChild(fullCommentsLink);
			}
		}
	},
	fixSaveLinks: function() {
		var saveLinks = document.querySelectorAll('FORM.save-button > SPAN > A');
		for (var i=0, len=saveLinks.length; i<len; i++) {
			saveLinks[i].setAttribute('onclick','');
			saveLinks[i].setAttribute('action','save');
			saveLinks[i].addEventListener('click', modules['betteReddit'].saveLink, false);
		}
		var unsaveLinks = document.querySelectorAll('FORM.unsave-button > SPAN > A');
		for (var i=0, len=saveLinks.length; i<len; i++) {
			if (typeof(unsaveLinks[i]) != 'undefined') {
				unsaveLinks[i].setAttribute('onclick','');
				unsaveLinks[i].setAttribute('action','unsave');
				unsaveLinks[i].addEventListener('click', modules['betteReddit'].saveLink, false);
			}
		}
	},
	saveLink: function(e) {
		modules['betteReddit'].saveLinkClicked = e.target;
		var action = e.target.getAttribute('action');
		var parentThing = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		var idRe = /id-([\w]+)/i;
		var getLinkid = idRe.exec(parentThing.getAttribute('class'));
		var linkid = getLinkid[1];
		// we also need the modhash to be able to send an API call to save the link...
		var head = document.getElementsByTagName('head')[0];
		var redditScript = head.querySelectorAll('SCRIPT');
		var modhashRe = /modhash: '([\w]+)'/i;
		for (var i=0, len=redditScript.length; i<len; i++) {
			var modhash = modhashRe.exec(redditScript[i].innerHTML);
			if (modhash) break;
		}
		if (action == 'unsave') {
			var executed = 'unsaved';
			var apiURL = 'http://'+location.hostname+'/api/unsave';
		} else {
			var executed = 'saved';
			var apiURL = 'http://'+location.hostname+'/api/save';
		}
		var params = 'id='+linkid+'&executed='+executed+'&uh='+modhash[1]+'&renderstyle=html';
		if (RESUtils.currentSubreddit()) {
			params += '&r='+RESUtils.currentSubreddit();
		}
		GM_xmlhttpRequest({
			method:	"POST",
			url:	apiURL,
			data: params,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload:	function(response) {
				if (modules['betteReddit'].saveLinkClicked.getAttribute('action') == 'unsave') {
					modules['betteReddit'].saveLinkClicked.innerHTML = 'save';
					modules['betteReddit'].saveLinkClicked.setAttribute('action','save');
				} else {
					modules['betteReddit'].saveLinkClicked.innerHTML = 'unsave';
					modules['betteReddit'].saveLinkClicked.setAttribute('action','unsave');
				}
			}
		});
	},
	searchSubredditByDefault: function() {
		// Reddit now has this feature... but for some reason the box isn't checked by default, so we'll still do that...
		/*
		var searchForm = document.querySelector('#search');
		if (searchForm) {
			var restrictSearch = document.createElement('div');
			restrictSearch.innerHTML = '<input type="checkbox" name="restrict_sr" CHECKED> <label for="restrict_sr">limit my search to /r/'+RESUtils.currentSubreddit()+'</label>';
			restrictSearch.setAttribute('style','margin-top: 7px;');
			searchForm.appendChild(restrictSearch);
		}
		*/
		var restrictSearch = document.body.querySelector('INPUT[name=restrict_sr]');
		if (restrictSearch) {
			restrictSearch.checked = true;
		}
	},
	manageSubreddits: function() {
		RESUtils.addCSS('.srOver { outline: 1px dashed black; }');
		RESUtils.addCSS('body { overflow-x: hidden; }');
		RESUtils.addCSS('#sr-header-area a { color: black !important; font-size: 100% !important; }');
		/*
		if (this.options.pinSubredditBar.value) {
			RESUtils.addCSS('#sr-header-area { position: fixed !important; }');
		}
		*/
		// RESUtils.addCSS('#sr-header-area { border: none !important; }');
		RESUtils.addCSS('#srList { position: absolute; top: 18px; left: 0px; z-index: 9999; display: none; border: 1px solid black; background-color: #FAFAFA; max-height: 400px; width: 360px; overflow-y: auto; }');
		RESUtils.addCSS('#srList tr { border-bottom: 1px solid gray; }');
		RESUtils.addCSS('#srList td { padding-left: 8px; padding-right: 8px; padding-top: 3px; padding-bottom: 3px; }');
		RESUtils.addCSS('#srList td.RESvisited, #srList td.RESshortcut { text-transform: none; }');
		RESUtils.addCSS('#srList td.RESshortcut {cursor: pointer;}');
		RESUtils.addCSS('#srList td a { width: 100%; display: block; }');
		RESUtils.addCSS('#srList tr:hover { background-color: #eeeeff; }');
		RESUtils.addCSS('#srLeftContainer, #RESStaticShortcuts, #RESShortcuts, #srDropdown { display: inline; float: left; position: relative; z-index: 5; background-color: #f0f0f0; }');
		RESUtils.addCSS('#editShortcutDialog { display: none; z-index: 999; position: absolute; top: 25px; left: 5px; width: 230px; height: 60px; background-color: #cccccc; border: 1px solid black; padding: 8px; border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px 5px 5px 5px; }');
		RESUtils.addCSS('#editShortcutDialog label { float: left; width: 100px; }');
		RESUtils.addCSS('#editShortcutDialog input { float: left; width: 110px; }');
		RESUtils.addCSS('#editShortcutDialog input[type=button] { width: 60px; }');
		RESUtils.addCSS('#editShortcutDialog input[name=shortcut-save] { float: left; margin-left: 100px; }');
		if ((typeof(chrome) != 'undefined') || (typeof(safari) != 'undefined')) {
			RESUtils.addCSS('#srLeftContainer { margin-right: 14px; }');
		} else {
			RESUtils.addCSS('#srLeftContainer { margin-right: 6px; }');
		}
		RESUtils.addCSS('#srLeftContainer { z-index: 4; margin-left: -4px; padding-left: 4px; }');
		
		// RESUtils.addCSS('#RESShortcuts { position: absolute; left: '+ this.srLeftContainerWidth+'px;  z-index: 6; white-space: nowrap; overflow-x: hidden; padding-left: 2px; margin-top: -2px; padding-top: 2px; }');
		RESUtils.addCSS('#RESShortcutsViewport { width: auto; max-height: 20px; overflow: hidden; } ');
		RESUtils.addCSS('#RESShortcuts { z-index: 6; white-space: nowrap; overflow-x: hidden; padding-left: 2px; }');
		RESUtils.addCSS('#RESSubredditGroupDropdown { display: none; position: absolute; z-index: 100; padding: 3px; background-color: #F0F0F0; border-left: 1px solid black; border-right: 1px solid black; border-bottom: 1px solid black; }');
		RESUtils.addCSS('#RESSubredditGroupDropdown li { padding-left: 3px; padding-right: 3px; margin-bottom: 2px; }');
		RESUtils.addCSS('#RESSubredditGroupDropdown li:hover { background-color: #F0F0FC; }');

		RESUtils.addCSS('#RESShortcutsEditContainer { width: 52px; position: absolute; right: 0px; top: 0px; z-index: 999; background-color: #f0f0f0; height: 16px; user-select: none; -webkit-user-select: none; -moz-user-select: none; }');
		RESUtils.addCSS('#RESShortcutsRight { width: 16px; background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); background-position: -16px -176px; cursor: pointer; right: 0px; position: absolute; top: 0px; z-index: 999; background-color: #f0f0f0; height: 16px; user-select: none; -webkit-user-select: none; -moz-user-select: none; }');
		RESUtils.addCSS('#RESShortcutsAdd { width: 16px; background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); background-position: 0px -160px; background-repeat: no-repeat; cursor: pointer; right: 15px; height: 16px; position: absolute; top: 0px; z-index: 999; background-color: #f0f0f0; user-select: none; -webkit-user-select: none; -moz-user-select: none; }');
		RESUtils.addCSS('#RESShortcutsTrash { display: none; width: 16px; background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); background-position: -16px -160px; background-repeat: no-repeat; cursor: pointer; right: 15px; height: 16px; position: absolute; top: 0px; z-index: 1000; background-color: #DDD; user-select: none; -webkit-user-select: none; -moz-user-select: none; }');
		RESUtils.addCSS('#RESShortcutsLeft { width: 16px; background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); background-position: 0px -176px; cursor: pointer; right: 31px; position: absolute; top: 0px; z-index: 999; background-color: #f0f0f0; height: 16px; user-select: none; -webkit-user-select: none; -moz-user-select: none; }');
		RESUtils.addCSS('.srSep { margin-left: 6px; }');
		RESUtils.addCSS('.RESshortcutside { float: left; margin-left: 8px; margin-top: 2px; cursor: pointer; text-align: center; width: 52px; font-size: 10px; border: 1px solid gray; padding: 2px; border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px 5px 5px 5px;  }');
		RESUtils.addCSS('.RESshortcutside:hover { background-color: #f0f0ff; }');
		RESUtils.addCSS('h1.redditname > a { float: left; }');
		RESUtils.addCSS('h1.redditname { overflow: auto; }');
		RESUtils.addCSS('.sortAsc, .sortDesc { float: right; background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); width: 12px; height: 12px; background-repeat: no-repeat; }');
		RESUtils.addCSS('.sortAsc { background-position: 0px -148px; }');
		RESUtils.addCSS('.sortDesc { background-position: -12px -148px; }');
		RESUtils.addCSS('#RESShortcutsAddFormContainer { display: none; position: absolute; padding: 2px; right: 0px; top: 21px; z-index: 10000; background-color: #CCCCCC; }');
		RESUtils.addCSS('#RESShortcutsAddFormContainer  a { font-weight: bold; }');
		RESUtils.addCSS('#newShortcut { width: 195px; }');
		
		// this shows the sr-header-area that we hid while rendering it (to curb opera's glitchy "jumping")...
		if (typeof(opera) != 'undefined') {
			RESUtils.addCSS('#sr-header-area { display: block !important; }');
		}
		// This is the init function for Manage Subreddits - it'll get your preferences and redraw the top bar.
		this.redrawSubredditBar();
		// Listen for subscriptions / unsubscriptions from reddits so we know to reload the JSON string...
		// also, add a +/- shortcut button...
		if (RESUtils.currentSubreddit()) {
			var subButton = document.querySelector('.fancy-toggle-button');
			if (subButton) {
				subButton.addEventListener('click',function() {
					// reset the last checked time for the subreddit list so that we refresh it anew no matter what.
					RESStorage.setItem('RESmodules.betteReddit.subreddits.lastCheck.'+RESUtils.loggedInUser(),0);
				},false);
				var theSubredditLink = document.querySelector('h1.redditname');
				if (theSubredditLink) {
					var theSC = document.createElement('span');
					theSC.setAttribute('class','RESshortcut RESshortcutside');
					theSC.setAttribute('subreddit',RESUtils.currentSubreddit());
					var idx = -1;
					for (var i=0, len=modules['betteReddit'].mySubredditShortcuts.length; i<len; i++) {
						if (modules['betteReddit'].mySubredditShortcuts[i].subreddit == RESUtils.currentSubreddit()) {
							idx=i;
							break;
						}
					}
					if (idx != -1) {
						theSC.innerHTML = '-shortcut';
						theSC.setAttribute('title','Remove this subreddit from your shortcut bar');
					} else {
						theSC.innerHTML = '+shortcut';
						theSC.setAttribute('title','Add this subreddit to your shortcut bar');
					}
					theSC.addEventListener('click', modules['betteReddit'].toggleSubredditShortcut, false);
					// subButton.parentNode.insertBefore(theSC, subButton);
					theSubredditLink.appendChild(theSC);
				}
			}
		}
		// If we're on the reddit-browsing page (/reddits), add +shortcut and -shortcut buttons...
		if (location.href.match(/https?:\/\/www.reddit.com\/reddits\/?(\?[\w=&]+)*/)) {
			this.browsingReddits();
		}
	},
	browsingReddits: function() {
		var subredditLinks = document.body.querySelectorAll('p.titlerow > a');
		for (var i=0, len=subredditLinks.length; i<len; i++) {
			var match = subredditLinks[i].getAttribute('href').match(/https?:\/\/(?:[a-z]+).reddit.com\/r\/([\w]+).*/i);
			if (match != null) {
				var theSC = document.createElement('span');
				theSC.setAttribute('class','RESshortcut RESshortcutside');
				theSC.setAttribute('subreddit',match[1]);
				var idx = -1;
				for (var i=0, len=modules['betteReddit'].mySubredditShortcuts.length; i<len; i++) {
					if (modules['betteReddit'].mySubredditShortcuts[i].subreddit == RESUtils.currentSubreddit()) {
						idx=i;
						break;
					}
				}
				if (idx != -1) {
					theSC.innerHTML = '-shortcut';
					theSC.setAttribute('title','Remove this subreddit from your shortcut bar');
				} else {
					theSC.innerHTML = '+shortcut';
					theSC.setAttribute('title','Add this subreddit to your shortcut bar');
				}
				theSC.addEventListener('click', modules['betteReddit'].toggleSubredditShortcut, false);
				// subButton.parentNode.insertBefore(theSC, subButton);
				subredditLinks[i].parentNode.parentNode.previousSibling.appendChild(theSC);
			} else {
				// uh oh...
			}
		}
	},
	redrawShortcuts: function() {
		this.shortCutsContainer.innerHTML = '';
		var shortCuts = RESStorage.getItem('RESmodules.betteReddit.subredditShortcuts.'+RESUtils.loggedInUser());
		if ((shortCuts != null) && (shortCuts != '') && (shortCuts != [])) {
			this.mySubredditShortcuts = safeJSON.parse(shortCuts, 'RESmodules.betteReddit.subredditShortcuts.'+RESUtils.loggedInUser())
			// go through the list of shortcuts and print them out...
			for (var i=0, len=this.mySubredditShortcuts.length; i<len; i++) {
				if (typeof(this.mySubredditShortcuts[i]) == 'string') {
					this.mySubredditShortcuts[i] = {
						subreddit: this.mySubredditShortcuts[i],
						displayName: this.mySubredditShortcuts[i]
					}
				} 
				var thisShortCut = document.createElement('a');
				thisShortCut.setAttribute('draggable','true');
				thisShortCut.setAttribute('orderIndex',i);
				thisShortCut.setAttribute('href','/r/'+this.mySubredditShortcuts[i].subreddit);
				thisShortCut.innerHTML = this.mySubredditShortcuts[i].displayName;
				thisShortCut.addEventListener('click', function(e) {
					if (e.button != 1) {
						e.preventDefault();
						modules['betteReddit'].clickedShortcut = e.target.getAttribute('href');
						if (typeof(modules['betteReddit'].clickTimer) == 'undefined') {
							modules['betteReddit'].clickTimer = setTimeout(modules['betteReddit'].followSubredditShortcut, 300);
						}
					}
				}, false);
				thisShortCut.addEventListener('dblclick', function(e) {
					e.preventDefault();
					clearTimeout(modules['betteReddit'].clickTimer);
					delete modules['betteReddit'].clickTimer;
					modules['betteReddit'].editSubredditShortcut(e.target);
				}, false);
				thisShortCut.addEventListener('mouseover', function(e) {
					clearTimeout(modules['betteReddit'].hideSubredditGroupDropdownTimer);
					if (e.target.getAttribute('href').indexOf('+') != -1) {
						var subreddits = e.target.getAttribute('href').replace('/r/','').split('+');
						modules['betteReddit'].showSubredditGroupDropdown(subreddits, e.target);
					}
				}, false);
				thisShortCut.addEventListener('mouseout', function(e) {
					modules['betteReddit'].hideSubredditGroupDropdownTimer = setTimeout(function() {
						modules['betteReddit'].hideSubredditGroupDropdown();
					}, 500);
				}, false);
				thisShortCut.addEventListener('dragstart', modules['betteReddit'].subredditDragStart, false);
				thisShortCut.addEventListener('dragenter', modules['betteReddit'].subredditDragEnter, false)
				thisShortCut.addEventListener('dragover', modules['betteReddit'].subredditDragOver, false);
				thisShortCut.addEventListener('dragleave', modules['betteReddit'].subredditDragLeave, false);
				thisShortCut.addEventListener('drop', modules['betteReddit'].subredditDrop, false);
				thisShortCut.addEventListener('dragend', modules['betteReddit'].subredditDragEnd, false);
				this.shortCutsContainer.appendChild(thisShortCut);
				if (i < len-1) {
					var sep = document.createElement('span');
					sep.setAttribute('class','separator');
					sep.innerHTML = '-';
					this.shortCutsContainer.appendChild(sep);
				} 
			}
			if (this.mySubredditShortcuts.length == 0) {
				this.shortCutsContainer.style.textTransform = 'none';
				this.shortCutsContainer.innerHTML = 'add shortcuts from the my subreddits menu at left or click the button by the subreddit name, drag and drop to sort';
			} else {
				this.shortCutsContainer.style.textTransform = '';
			}
		} else {
			this.shortCutsContainer.style.textTransform = 'none';
			this.shortCutsContainer.innerHTML = 'add shortcuts from the my subreddits menu at left or click the button by the subreddit name, drag and drop to sort';
			this.mySubredditShortcuts = new Array();
		}
		// clip the width of the container to the remaining area...
		// this.shortCutsContainer.style.width = parseInt(window.innerWidth - this.srLeftContainerWidth - 40) + 'px';
	},
	showSubredditGroupDropdown: function(subreddits, obj) {
		if (typeof(this.subredditGroupDropdown) == 'undefined') {
			this.subredditGroupDropdown = createElementWithID('div','RESSubredditGroupDropdown');
			this.subredditGroupDropdownUL = document.createElement('ul');
			this.subredditGroupDropdown.appendChild(this.subredditGroupDropdownUL);
			document.body.appendChild(this.subredditGroupDropdown);
			this.subredditGroupDropdown.addEventListener('mouseout', function(e) {
				modules['betteReddit'].hideSubredditGroupDropdownTimer = setTimeout(function() {
					modules['betteReddit'].hideSubredditGroupDropdown();
				}, 500);
			}, false);
			this.subredditGroupDropdown.addEventListener('mouseover', function(e) {
				clearTimeout(modules['betteReddit'].hideSubredditGroupDropdownTimer);
			}, false);
		}
		this.groupDropdownVisible = true;
		if (subreddits) {
			this.subredditGroupDropdownUL.innerHTML = '';
			for (var i=0, len=subreddits.length; i<len; i++) {
				this.subredditGroupDropdownUL.innerHTML += '<li><a href="/r/'+subreddits[i]+'">'+subreddits[i]+'</a></li>';
			}
			var thisXY = RESUtils.getXYpos(obj);
			this.subredditGroupDropdown.style.top = (thisXY.y + 16) + 'px';
			this.subredditGroupDropdown.style.left = thisXY.x + 'px';
			this.subredditGroupDropdown.style.display = 'block';
		}
	},
	hideSubredditGroupDropdown: function() {
		delete modules['betteReddit'].hideSubredditGroupDropdownTimer;
		if (this.subredditGroupDropdown) this.subredditGroupDropdown.style.display = 'none';
	},
	editSubredditShortcut: function(ele) {
		var subreddit = ele.getAttribute('href').slice(3);
		for (var i=0, len=modules['betteReddit'].mySubredditShortcuts.length; i<len; i++) {
			if (modules['betteReddit'].mySubredditShortcuts[i].subreddit == subreddit) {
				idx = i;
				break;
			}
		}
		if (typeof(this.editShortcutDialog) == 'undefined') {
			this.editShortcutDialog = createElementWithID('div','editShortcutDialog');
			document.body.appendChild(this.editShortcutDialog);
		}
		this.editShortcutDialog.innerHTML = '<form name="editSubredditShortcut"><label for="subreddit">Subreddit:</label> <input type="text" name="subreddit" value="'+subreddit+'" id="shortcut-subreddit"><br>';
		this.editShortcutDialog.innerHTML += '<label for="displayName">Display Name:</label><input type="text" name="displayName" value="'+ele.innerHTML+'" id="shortcut-displayname">';
		this.editShortcutDialog.innerHTML += '<input type="hidden" name="idx" value="'+idx+'"><input type="button" name="shortcut-save" value="save" id="shortcut-save"><input type="button" name="shortcut-cancel" value="cancel" id="shortcut-cancel"></form>';
		
		this.subredditInput = this.editShortcutDialog.querySelector('input[name=subreddit]');
		this.displayNameInput = this.editShortcutDialog.querySelector('input[name=displayName]');

		this.subredditForm = this.editShortcutDialog.querySelector('FORM');
		this.subredditForm.addEventListener('submit', function(e) {
			e.preventDefault();
		}, false);

		this.saveButton = this.editShortcutDialog.querySelector('input[name=shortcut-save]');
		this.saveButton.addEventListener('click', function(e) {
			var idx = modules['betteReddit'].editShortcutDialog.querySelector('input[name=idx]').value;
			var subreddit = modules['betteReddit'].editShortcutDialog.querySelector('input[name=subreddit]').value;
			var displayName = modules['betteReddit'].editShortcutDialog.querySelector('input[name=displayName]').value;
			if ((subreddit == '') || (displayName == '')) {
				modules['betteReddit'].mySubredditShortcuts.splice(idx,1);
			} else {
				modules['betteReddit'].mySubredditShortcuts[idx] = {
					subreddit: subreddit,
					displayName: displayName
				}
			}
			RESStorage.setItem('RESmodules.betteReddit.subredditShortcuts.'+RESUtils.loggedInUser(),JSON.stringify(modules['betteReddit'].mySubredditShortcuts));
			modules['betteReddit'].editShortcutDialog.style.display = 'none';
			modules['betteReddit'].redrawShortcuts();
			modules['betteReddit'].populateSubredditDropdown();
		}, false);

		// handle enter and escape keys in the dialog box...
		this.subredditInput.addEventListener('keyup', function(e) {
			if (e.keyCode == 27) {
				modules['betteReddit'].editShortcutDialog.style.display = 'none';
				modules['betteReddit'].editShortcutDialog.blur();
			} else if (e.keyCode == 13) {
				RESUtils.click(modules['betteReddit'].saveButton);
			}
		}, false);
		this.displayNameInput.addEventListener('keyup', function(e) {
			if (e.keyCode == 27) {
				modules['betteReddit'].editShortcutDialog.style.display = 'none';
				modules['betteReddit'].editShortcutDialog.blur();
			} else if (e.keyCode == 13) {
				RESUtils.click(modules['betteReddit'].saveButton);
			}
		}, false);

		var cancelButton = this.editShortcutDialog.querySelector('input[name=shortcut-cancel]');
		cancelButton.addEventListener('click', function(e) {
			modules['betteReddit'].editShortcutDialog.style.display = 'none';
		}, false);
		this.editShortcutDialog.style.display = 'block';
		var thisLeft = Math.min(RESUtils.mouseX, window.innerWidth-300);
		this.editShortcutDialog.style.left = thisLeft + 'px';
		setTimeout(function() {
			modules['betteReddit'].subredditInput.focus()
		}, 200);
	},
	followSubredditShortcut: function() {
		location.href = modules['betteReddit'].clickedShortcut;
	},
	subredditDragStart: function(e) {
		// Target (this) element is the source node.
		this.style.opacity = '0.4';
		modules['betteReddit'].shortCutsTrash.style.display = 'block';
		modules['betteReddit'].dragSrcEl = this;

		e.dataTransfer.effectAllowed = 'move';
		// because Safari is stupid, we have to do this.
		modules['betteReddit'].srDataTransfer = this.getAttribute('orderIndex') + ',' + this.innerHTML;
		// e.dataTransfer.setData('text/html', this.getAttribute('orderIndex') + ',' + this.innerHTML);
	},
	subredditDragEnter: function(e) {
		addClass(this,'srOver');
		return false;
	},
	subredditDragOver: function(e) {
		if (e.preventDefault) {
			e.preventDefault(); // Necessary. Allows us to drop.
		}
		e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
		// addClass(this,'srOver');

		return false;
	},
	subredditDragLeave: function(e) {
		removeClass(this,'srOver');
		return false;
	},
	subredditDrop: function(e) {
		// this/e.target is current target element.
		if (e.stopPropagation) {
			e.stopPropagation(); // Stops some browsers from redirecting.
		}
		modules['betteReddit'].shortCutsTrash.style.display = 'none';
		// Don't do anything if dropping the same column we're dragging.
		if (modules['betteReddit'].dragSrcEl != this) {
			if (e.target.getAttribute('id') != 'RESShortcutsTrash') {
				// get the order index of the src and destination to swap...
				// var theData = e.dataTransfer.getData('text/html').split(',');
				var theData = modules['betteReddit'].srDataTransfer.split(',');
				var srcOrderIndex = parseInt(theData[0]);
				var srcSubreddit = theData[1];
				var destOrderIndex = parseInt(this.getAttribute('orderIndex'));
				var destSubreddit = this.innerHTML;
				var rearranged = new Array();
				var rearrangedI = 0;
				for (var i=0, len=modules['betteReddit'].mySubredditShortcuts.length; i<len; i++) {
					if ((i != srcOrderIndex) && (i != destOrderIndex)) {
						rearranged[rearrangedI] = modules['betteReddit'].mySubredditShortcuts[i];
						rearrangedI++;
					} else if (i == destOrderIndex) {
						if (destOrderIndex > srcOrderIndex) {
							// if dragging right, order dest first, src next.
							rearranged[rearrangedI] = destSubreddit;
							rearrangedI++;
							rearranged[rearrangedI] = srcSubreddit;
							rearrangedI++;
						} else {
							// if dragging left, order src first, dest next.
							rearranged[rearrangedI] = srcSubreddit;
							rearrangedI++;
							rearranged[rearrangedI] = destSubreddit;
							rearrangedI++;
						}
					}
				}
				modules['betteReddit'].mySubredditShortcuts = rearranged;
				// save the updated order...
				RESStorage.setItem('RESmodules.betteReddit.subredditShortcuts.'+RESUtils.loggedInUser(),JSON.stringify(modules['betteReddit'].mySubredditShortcuts));
				// redraw the shortcut bar...
				modules['betteReddit'].redrawShortcuts();
				removeClass(this,'srOver');
			} else {
				// var theData = e.dataTransfer.getData('text/html').split(',');
				var theData = modules['betteReddit'].srDataTransfer.split(',');
				var srcOrderIndex = parseInt(theData[0]);
				var srcSubreddit = theData[1];
				modules['betteReddit'].removeSubredditShortcut(srcSubreddit);
			}
		}
		return false;
	},
	subredditDragEnd: function(e) {
		modules['betteReddit'].shortCutsTrash.style.display = 'none';
		this.style.opacity = '1';
		return false;
	},
	redrawSubredditBar: function() {
		this.headerContents = document.querySelector('#sr-header-area');
		if (this.headerContents) {
			// for opera, because it renders progressively and makes it look "glitchy", hide the header bar, then show it all at once with CSS.
			if (typeof(opera) != 'undefined') this.headerContents.style.display = 'none';
			// Clear out the existing stuff in the top bar first, we'll replace it with our own stuff.
			this.headerContents.innerHTML = '';
			this.srLeftContainer = createElementWithID('div','srLeftContainer');
			this.srDropdown = createElementWithID('div','srDropdown');
			this.srDropdownContainer = createElementWithID('div','srDropdownContainer');
			this.srDropdownContainer.innerHTML = '<a href="javascript:void(0)">My Subreddits</a>';
			this.srDropdownContainer.addEventListener('click',modules['betteReddit'].toggleSubredditDropdown, false);
			this.srDropdown.appendChild(this.srDropdownContainer);
			this.srList = createElementWithID('table','srList');
			// this.srDropdownContainer.appendChild(this.srList);
			document.body.appendChild(this.srList);
			this.srLeftContainer.appendChild(this.srDropdown);
			var sep = document.createElement('span');
			sep.setAttribute('class','srSep');
			sep.innerHTML = '|';
			this.srLeftContainer.appendChild(sep);
			// now put in the shortcuts...
			this.staticShortCutsContainer = document.createElement('div');
			this.staticShortCutsContainer.setAttribute('id','RESStaticShortcuts');
			/* this probably isn't the best way to give the option, since the mechanic is drag/drop for other stuff..  but it's much easier for now... */
			this.staticShortCutsContainer.innerHTML = '';
			if (this.options.linkAll.value) this.staticShortCutsContainer.innerHTML += '<span class="separator">-</span><a href="/r/all/">ALL</a>';
			if (this.options.linkRandom.value) this.staticShortCutsContainer.innerHTML += '<span class="separator">-</span><a href="/r/random/">RANDOM</a>';
			if (RESUtils.loggedInUser() != null) {
				if (this.options.linkFriends.value) this.staticShortCutsContainer.innerHTML += '<span class="separator">-</span><a href="/r/friends/">FRIENDS</a>';
				var modmail = document.getElementById('modmail');
				if ((modmail) && (this.options.linkMod.value)) this.staticShortCutsContainer.innerHTML += '<span class="separator">-</span><a href="/r/mod/">MOD</a>';
			}
			
			/*
			this.staticShortCutsContainer.innerHTML = ' <span class="separator">|</span><a href="/r/all/">ALL</a><span class="separator">-</span><a href="/r/random/">RANDOM</a>';
			if (RESUtils.loggedInUser() != null) {
				this.staticShortCutsContainer.innerHTML += '<span class="separator">-</span><a href="/r/friends/">FRIENDS</a><span class="separator">-</span><a href="/r/mod/">MOD</a>';
			}
			*/
			this.srLeftContainer.appendChild(this.staticShortCutsContainer);
			this.srLeftContainer.appendChild(sep);
			this.headerContents.appendChild(this.srLeftContainer);			
						
			this.shortCutsViewport = document.createElement('div');
			this.shortCutsViewport.setAttribute('id','RESShortcutsViewport');
			this.headerContents.appendChild(this.shortCutsViewport);

			this.shortCutsContainer = document.createElement('div');
			this.shortCutsContainer.setAttribute('id','RESShortcuts');
			this.shortCutsViewport.appendChild(this.shortCutsContainer);

			this.shortCutsEditContainer = document.createElement('div');
			this.shortCutsEditContainer.setAttribute('id','RESShortcutsEditContainer');
			this.headerContents.appendChild(this.shortCutsEditContainer);
			
			// now add an event listener to show the edit bar on hover...
			/* not working so great, too much glitchiness... maybe we'll address this later when we have more time...
			this.headerContents.addEventListener('mouseover', modules['betteReddit'].showShortcutButtons, false);
			this.headerContents.addEventListener('mouseout', modules['betteReddit'].hideShortcutButtons, false);
			*/

			// add right scroll arrow...
			this.shortCutsRight = document.createElement('div');
			this.shortCutsRight.setAttribute('id','RESShortcutsRight');
			this.shortCutsRight.innerHTML = '';
			// this.containerWidth = this.shortCutsContainer.scrollWidth;
			this.shortCutsRight.addEventListener('click', function(e) {
				modules['betteReddit'].containerWidth = modules['betteReddit'].shortCutsContainer.offsetWidth;
				// var marginLeft = modules['betteReddit'].shortCutsContainer.firstChild.style.marginLeft;
				// width of browser minus width of left container plus a bit extra for padding...
				// var containerWidth = window.innerWidth + 20 - modules['betteReddit'].srLeftContainer.scrollWidth;
				var marginLeft = modules['betteReddit'].shortCutsContainer.firstChild.style.marginLeft;
				marginLeft = parseInt(marginLeft.replace('px',''));
				if (isNaN(marginLeft)) marginLeft = 0;
				if (Math.abs(marginLeft) < modules['betteReddit'].containerWidth) {
					marginLeft -= (window.innerWidth - 380);
					modules['betteReddit'].shortCutsContainer.firstChild.style.marginLeft = marginLeft + 'px';
				} else {
					// console.log('already all the way over.');
				}
			}, false);
			this.shortCutsEditContainer.appendChild(this.shortCutsRight);

			// add an "add shortcut" button...
			this.shortCutsAdd = document.createElement('div');
			this.shortCutsAdd.setAttribute('id','RESShortcutsAdd');
			this.shortCutsAdd.innerHTML = '';
			this.shortCutsAdd.title = 'add shortcut';
			this.shortCutsAddFormContainer = document.createElement('div');
			this.shortCutsAddFormContainer.setAttribute('id','RESShortcutsAddFormContainer');
			this.shortCutsAddFormContainer.style.display = 'none';
			this.shortCutsAddFormContainer.innerHTML = ' \
				<form id="shortCutsAddForm"> \
					<input type="text" id="newShortcut"> \
					<input type="submit" name="submit" value="add"> \
				</form> \
				Type a subreddit name to add a shortcut<br> \
				<a style="float: right; margin-top: 5px; padding-right: 2px;" href="/reddits">Edit frontpage subscriptions</a> \
			';
			this.shortCutsAddFormField = this.shortCutsAddFormContainer.querySelector('#newShortcut');
			modules['betteReddit'].shortCutsAddFormField.addEventListener('keyup', function(e) {
				if (e.keyCode == 27) {
					modules['betteReddit'].shortCutsAddFormContainer.style.display = 'none';
					modules['betteReddit'].shortCutsAddFormField.blur();
				}
			}, false);
			
			// add the "add shortcut" form...
			this.shortCutsAddForm = this.shortCutsAddFormContainer.querySelector('#shortCutsAddForm');
			this.shortCutsAddForm.addEventListener('submit', function(e) {
				e.preventDefault();
				var subreddit = modules['betteReddit'].shortCutsAddFormField.value;
				subreddit = subreddit.replace('/r/','').replace('r/','').replace('/','');
				modules['betteReddit'].shortCutsAddFormField.value = '';
				modules['betteReddit'].shortCutsAddFormContainer.style.display = 'none';
				if (subreddit) {
					modules['betteReddit'].addSubredditShortcut(subreddit);
				}
			}, false);
			this.shortCutsAdd.addEventListener('click', function(e) {
				if (modules['betteReddit'].shortCutsAddFormContainer.style.display == 'none') {
					modules['betteReddit'].shortCutsAddFormContainer.style.display = 'block';
					modules['betteReddit'].shortCutsAddFormField.focus();
				} else {
					modules['betteReddit'].shortCutsAddFormContainer.style.display = 'none';
					modules['betteReddit'].shortCutsAddFormField.blur();
				}
			}, false);
			this.shortCutsEditContainer.appendChild(this.shortCutsAdd);
			document.body.appendChild(this.shortCutsAddFormContainer);
			
			// add the "trash bin"...
			this.shortCutsTrash = document.createElement('div');
			// thisShortCut.setAttribute('draggable','true');
			// thisShortCut.setAttribute('orderIndex',i);
			this.shortCutsTrash.setAttribute('id','RESShortcutsTrash');
			// thisShortCut.addEventListener('dragstart', modules['betteReddit'].subredditDragStart, false);
			this.shortCutsTrash.addEventListener('dragenter', modules['betteReddit'].subredditDragEnter, false)
			this.shortCutsTrash.addEventListener('dragleave', modules['betteReddit'].subredditDragLeave, false);
			// thisShortCut.addEventListener('dragend', modules['betteReddit'].subredditDragEnd, false);
			this.shortCutsTrash.addEventListener('dragover', modules['betteReddit'].subredditDragOver, false);
			this.shortCutsTrash.addEventListener('drop', modules['betteReddit'].subredditDrop, false);
			this.shortCutsEditContainer.appendChild(this.shortCutsTrash);
			
			// add left scroll arrow...
			this.shortCutsLeft = document.createElement('div');
			this.shortCutsLeft.setAttribute('id','RESShortcutsLeft');
			this.shortCutsLeft.innerHTML = '';
			this.shortCutsLeft.addEventListener('click', function(e) {
				var marginLeft = modules['betteReddit'].shortCutsContainer.firstChild.style.marginLeft;
				marginLeft = parseInt(marginLeft.replace('px',''));
				if (isNaN(marginLeft)) marginLeft = 0;
				marginLeft += (window.innerWidth - 380);
				if (marginLeft <= 0) {
					modules['betteReddit'].shortCutsContainer.firstChild.style.marginLeft = marginLeft + 'px';
				}
			}, false);
			this.shortCutsEditContainer.appendChild(this.shortCutsLeft);
			
			this.redrawShortcuts();
		}
	},
	/* not working so great, too much glitchiness... maybe we'll address this later when we have more time...
	showShortcutButtons: function() {
			RESUtils.fadeElementIn(modules['betteReddit'].shortCutsEditContainer, 0.3);
	},
	hideShortcutButtons: function() {
			RESUtils.fadeElementOut(modules['betteReddit'].shortCutsEditContainer, 0.3);
	}, */
	toggleSubredditDropdown: function() {
		if (modules['betteReddit'].srList.style.display == 'block') {
			modules['betteReddit'].srList.style.display = 'none';
		} else {
			if (RESUtils.loggedInUser()) {
				modules['betteReddit'].srList.innerHTML = '<tr><td width="360">Loading subreddits (may take a moment)...</td></tr>';
				modules['betteReddit'].srList.style.display = 'block';
				modules['betteReddit'].getSubreddits();
			} else {
				modules['betteReddit'].srList.innerHTML = '<tr><td width="360">You must be logged in to load your own list of subreddits. <a style="display: inline; float: left;" href="/reddits">browse them all</a></td></tr>';
				modules['betteReddit'].srList.style.display = 'block';
			}
		}
	},
	mySubreddits: [
	],
	mySubredditShortcuts: [
	],
	getSubredditJSON: function(after) {
		// console.log('getsubredditjson called');
		var jsonURL = 'http://' + location.hostname + '/reddits/mine/.json';
		if (after) jsonURL += '?after='+after;
		// console.log('jsonURL: ' + jsonURL);
		GM_xmlhttpRequest({
			method:	"GET",
			url:	jsonURL,
			onload:	function(response) {
				// console.log('json loaded...');
				var thisResponse = JSON.parse(response.responseText);
				// console.log(typeof(thisResponse.data));
				// if (typeof(thisResponse.data) != 'undefined') console.log(typeof(thisResponse.data.children));;
				if ((typeof(thisResponse.data) != 'undefined') && (typeof(thisResponse.data.children) != 'undefined')) {
					// console.log('starting to process json...');
					var now = new Date();
					RESStorage.setItem('RESmodules.betteReddit.subreddits.lastCheck.'+RESUtils.loggedInUser(),now.getTime());
					var subreddits = thisResponse.data.children;
					for (var i=0, len=subreddits.length; i<len; i++) {
						var srObj = {
							display_name: subreddits[i].data.display_name,
							url: subreddits[i].data.url,
							over18: subreddits[i].data.over18,
							id: subreddits[i].data.id,
							created: subreddits[i].data.created,
							description: subreddits[i].data.description,
						}
						modules['betteReddit'].mySubreddits.push(srObj);
					}
					// console.log('finished processing json... any more?');
					if (thisResponse.data.after != null) {
						// console.log('yes, more - after = ' + thisResponse.data.after);
						modules['betteReddit'].getSubredditJSON(thisResponse.data.after);
					} else {
						// console.log('nope, no more, now  sort... ' );
						modules['betteReddit'].mySubreddits.sort(function(a,b) {
							var adisp = a.display_name.toLowerCase();
							var bdisp = b.display_name.toLowerCase();
							if (adisp > bdisp) return 1;
							if (adisp == bdisp) return 0;
							return -1;
						});
						// console.log('done sorting');
						RESStorage.setItem('RESmodules.betteReddit.subreddits.'+RESUtils.loggedInUser(),JSON.stringify(modules['betteReddit'].mySubreddits));
						// console.log('ok populate the dropdown...');
						modules['betteReddit'].populateSubredditDropdown();
					}
				} else {
					// user is probably not logged in.. no subreddits found.
					// console.log('hm, something bad happened. here comes a lot of text...');
					// console.log(response.responseText);
					modules['betteReddit'].populateSubredditDropdown(null, true);
				}
			}
		});
	
	},
	getSubreddits: function() {
		modules['betteReddit'].mySubreddits = new Array();
		var lastCheck = parseInt(RESStorage.getItem('RESmodules.betteReddit.subreddits.lastCheck.'+RESUtils.loggedInUser())) || 0;
		var now = new Date();
		var check = RESStorage.getItem('RESmodules.betteReddit.subreddits.'+RESUtils.loggedInUser());
		// 86400000 = 1 day
		if (((now.getTime() - lastCheck) > 86400000) || (check == null) || (check == '') || (check.length == 0)) {
			this.getSubredditJSON();
		} else {
			modules['betteReddit'].mySubreddits = safeJSON.parse(check, 'RESmodules.betteReddit.subreddits.'+RESUtils.loggedInUser());
			this.populateSubredditDropdown();
		}
	},
	// if badJSON is true, then getSubredditJSON ran into an error...
	populateSubredditDropdown: function(sortBy, badJSON) {
		modules['betteReddit'].sortBy = sortBy || 'subreddit';
		modules['betteReddit'].srList.innerHTML = '';
		// NOTE WE NEED TO CHECK LAST TIME THEY UPDATED THEIR SUBREDDIT LIST AND REPOPULATE...
		var theHead = document.createElement('thead');
		var theRow = document.createElement('tr');
		modules['betteReddit'].srHeader = document.createElement('td');
		modules['betteReddit'].srHeader.addEventListener('click', function() {
			if (modules['betteReddit'].sortBy == 'subreddit') {
				modules['betteReddit'].populateSubredditDropdown('subredditDesc');
			} else {
				modules['betteReddit'].populateSubredditDropdown('subreddit');
			}
		}, false);
		modules['betteReddit'].srHeader.innerHTML = 'subreddit';
		modules['betteReddit'].srHeader.setAttribute('width','200');
		modules['betteReddit'].lvHeader = document.createElement('td');
		modules['betteReddit'].lvHeader.addEventListener('click', function() {
			if (modules['betteReddit'].sortBy == 'lastVisited') {
				modules['betteReddit'].populateSubredditDropdown('lastVisitedAsc');
			} else {
				modules['betteReddit'].populateSubredditDropdown('lastVisited');
			}
		}, false);
		modules['betteReddit'].lvHeader.innerHTML = 'Last Visited';
		modules['betteReddit'].lvHeader.setAttribute('width','120');
		var scHeader = document.createElement('td');
		// scHeader.innerHTML = '&nbsp;';
		scHeader.innerHTML = '<a style="float: right;" href="/reddits">View all &raquo;</a>';
		theRow.appendChild(modules['betteReddit'].srHeader);
		theRow.appendChild(modules['betteReddit'].lvHeader);
		theRow.appendChild(scHeader);
		theHead.appendChild(theRow);
		// theRow.innerHTML = '<td width="120">subreddit</td><td width="100">Last Visited</td><td></td>';
		modules['betteReddit'].srList.appendChild(theHead);
		var theBody = document.createElement('tbody');
		if (!(badJSON)) {
			var subredditCount = modules['betteReddit'].mySubreddits.length;
			if (typeof(this.subredditsLastViewed) == 'undefined') {
				var check = RESStorage.getItem('RESmodules.betteReddit.subredditsLastViewed.'+RESUtils.loggedInUser());
				if (check) {
					this.subredditsLastViewed = safeJSON.parse(check, 'RESmodules.betteReddit.subredditsLastViewed.'+RESUtils.loggedInUser());
				} else {
					this.subredditsLastViewed = {};
				}
			}
			// copy modules['betteReddit'].mySubreddits to a placeholder array so we can sort without modifying it...
			var sortableSubreddits = modules['betteReddit'].mySubreddits;
			if (sortBy == 'lastVisited') {
				modules['betteReddit'].lvHeader.innerHTML = 'Last Visited <div class="sortAsc"></div>';
				modules['betteReddit'].srHeader.innerHTML = 'subreddit';
				sortableSubreddits.sort(function(a, b) {
					var adisp = a.display_name.toLowerCase();
					var bdisp = b.display_name.toLowerCase();
					(typeof(modules['betteReddit'].subredditsLastViewed[adisp]) == 'undefined') ? alv = 0 : alv = parseInt(modules['betteReddit'].subredditsLastViewed[adisp].last_visited);
					(typeof(modules['betteReddit'].subredditsLastViewed[bdisp]) == 'undefined') ? blv = 0 : blv = parseInt(modules['betteReddit'].subredditsLastViewed[bdisp].last_visited);
					if (alv < blv) return 1;
					if (alv == blv) {
						if (adisp > bdisp) return 1;
						return -1;
					}
					return -1;
				});
			} else if (sortBy == 'lastVisitedAsc') {
				modules['betteReddit'].lvHeader.innerHTML = 'Last Visited <div class="sortDesc"></div>';
				modules['betteReddit'].srHeader.innerHTML = 'subreddit';
				sortableSubreddits.sort(function(a, b) {
					var adisp = a.display_name.toLowerCase();
					var bdisp = b.display_name.toLowerCase();
					(typeof(modules['betteReddit'].subredditsLastViewed[adisp]) == 'undefined') ? alv = 0 : alv = parseInt(modules['betteReddit'].subredditsLastViewed[adisp].last_visited);
					(typeof(modules['betteReddit'].subredditsLastViewed[bdisp]) == 'undefined') ? blv = 0 : blv = parseInt(modules['betteReddit'].subredditsLastViewed[bdisp].last_visited);
					if (alv > blv) return 1;
					if (alv == blv) {
						if (adisp > bdisp) return 1;
						return -1;
					}
					return -1;
				});
			} else if (sortBy == 'subredditDesc') {
				modules['betteReddit'].lvHeader.innerHTML = 'Last Visited';
				modules['betteReddit'].srHeader.innerHTML = 'subreddit <div class="sortDesc"></div>';
				sortableSubreddits.sort(function(a,b) {
					var adisp = a.display_name.toLowerCase();
					var bdisp = b.display_name.toLowerCase();
					if (adisp < bdisp) return 1;
					if (adisp == bdisp) return 0;
					return -1;
				});		
			} else {
				modules['betteReddit'].lvHeader.innerHTML = 'Last Visited';
				modules['betteReddit'].srHeader.innerHTML = 'subreddit <div class="sortAsc"></div>';
				sortableSubreddits.sort(function(a,b) {
					var adisp = a.display_name.toLowerCase();
					var bdisp = b.display_name.toLowerCase();
					if (adisp > bdisp) return 1;
					if (adisp == bdisp) return 0;
					return -1;
				});
			}
			for (var i=0; i<subredditCount; i++) {
				var dateString = 'Never';
				var thisReddit = sortableSubreddits[i].display_name.toLowerCase();
				if (typeof(this.subredditsLastViewed[thisReddit]) != 'undefined') {
					var ts = parseInt(this.subredditsLastViewed[thisReddit].last_visited);
					var dateVisited = new Date(ts);
					dateString = RESUtils.niceDate(dateVisited);
				}
				var theRow = document.createElement('tr');
				var theSR = document.createElement('td');
				theSR.innerHTML = '<a href="'+modules['betteReddit'].mySubreddits[i].url+'">'+modules['betteReddit'].mySubreddits[i].display_name+'</a>';
				theRow.appendChild(theSR);
				var theLV = document.createElement('td');
				theLV.innerHTML = dateString;
				theLV.setAttribute('class','RESvisited');
				theRow.appendChild(theLV);
				var theSC = document.createElement('td');
				theSC.setAttribute('class','RESshortcut');
				theSC.setAttribute('subreddit',modules['betteReddit'].mySubreddits[i].display_name);
				var idx = -1;
				for (var j=0, len=modules['betteReddit'].mySubredditShortcuts.length; j<len; j++) {
					if (modules['betteReddit'].mySubredditShortcuts[j].subreddit == modules['betteReddit'].mySubreddits[i].display_name) {
						idx=j;
						break;
					}
				}
				if (idx != -1) {
					theSC.addEventListener('click', function(e) {
						if (e.stopPropagation) {
							e.stopPropagation(); // Stops from triggering the click on the bigger box, which toggles this window closed...
						}
						var subreddit = e.target.getAttribute('subreddit');
						modules['betteReddit'].removeSubredditShortcut(subreddit);
					}, false);
					theSC.innerHTML = '-shortcut';
				} else {
					theSC.addEventListener('click', function(e) {
						if (e.stopPropagation) {
							e.stopPropagation(); // Stops from triggering the click on the bigger box, which toggles this window closed...
						}
						var subreddit = e.target.getAttribute('subreddit');
						modules['betteReddit'].addSubredditShortcut(subreddit);
					}, false);
					theSC.innerHTML = '+shortcut';
				}
				theRow.appendChild(theSC);
				theBody.appendChild(theRow);
			}
		} else {
			var theRow = document.createElement('tr');
			var theTD = document.createElement('td');
			theTD.innerHTML = 'There was an error getting your subreddits. You may have third party cookies disabled by your browser. For this function to work, you\'ll need to add an exception for cookies from reddit.com<';
			theTD.setAttribute('colspan','3');
			theRow.appendChild(theTD);
			theBody.appendChild(theRow);
		}
		modules['betteReddit'].srList.appendChild(theBody);
	},
	toggleSubredditShortcut: function(e) {
		if (e.stopPropagation) {
			e.stopPropagation(); // Stops from triggering the click on the bigger box, which toggles this window closed...
		}
		var idx = -1;
		for (var i=0, len=modules['betteReddit'].mySubredditShortcuts.length; i<len; i++) {
			if (modules['betteReddit'].mySubredditShortcuts[i].subreddit == e.target.getAttribute('subreddit')) {
				idx=i;
				break;
			}
		}
		if (idx != -1) {
			modules['betteReddit'].mySubredditShortcuts.splice(idx,1);
			e.target.setAttribute('title','Add this subreddit to your shortcut bar');
			e.target.innerHTML = '+shortcut';
		} else {
			modules['betteReddit'].mySubredditShortcuts.push(e.target.getAttribute('subreddit'));
			e.target.setAttribute('title','Remove this subreddit from your shortcut bar');
			e.target.innerHTML = '-shortcut';
		}
		RESStorage.setItem('RESmodules.betteReddit.subredditShortcuts.'+RESUtils.loggedInUser(), JSON.stringify(modules['betteReddit'].mySubredditShortcuts));
		modules['betteReddit'].redrawShortcuts();
	},
	addSubredditShortcut: function(subreddit) {
		var idx = -1;
		for (var i=0, len=modules['betteReddit'].mySubredditShortcuts.length; i<len; i++) {
			if (modules['betteReddit'].mySubredditShortcuts[i].subreddit == subreddit) {
				idx = i;
				break;
			}
		}
		if (idx != -1) {
			alert('Whoops, you already have a shortcut for that subreddit');
		} else {
			modules['betteReddit'].mySubredditShortcuts.push(subreddit);
			RESStorage.setItem('RESmodules.betteReddit.subredditShortcuts.'+RESUtils.loggedInUser(), JSON.stringify(modules['betteReddit'].mySubredditShortcuts));
			modules['betteReddit'].redrawShortcuts();
			modules['betteReddit'].populateSubredditDropdown();
		}
	},
	removeSubredditShortcut: function(subreddit) {
		var idx = -1;
		for (var i=0, len=modules['betteReddit'].mySubredditShortcuts.length; i<len; i++) {
			if (modules['betteReddit'].mySubredditShortcuts[i].subreddit == subreddit) {
				idx = i;
				break;
			}
		}
		if (idx != -1) {
			modules['betteReddit'].mySubredditShortcuts.splice(idx,1);
			RESStorage.setItem('RESmodules.betteReddit.subredditShortcuts.'+RESUtils.loggedInUser(), JSON.stringify(modules['betteReddit'].mySubredditShortcuts));
			modules['betteReddit'].redrawShortcuts();
			modules['betteReddit'].populateSubredditDropdown();
		}
	},
	setLastViewtime: function() {
		var check = RESStorage.getItem('RESmodules.betteReddit.subredditsLastViewed.'+RESUtils.loggedInUser());
		if (check == null) {
			this.subredditsLastViewed = {};
		} else {
			this.subredditsLastViewed = safeJSON.parse(check, 'RESmodules.betteReddit.subredditsLastViewed.'+RESUtils.loggedInUser());
		}
		var now = new Date();
		var thisReddit = RESUtils.currentSubreddit().toLowerCase();
		this.subredditsLastViewed[thisReddit] = {
			last_visited: now.getTime()
		}
		RESStorage.setItem('RESmodules.betteReddit.subredditsLastViewed.'+RESUtils.loggedInUser(),JSON.stringify(this.subredditsLastViewed));
	}
};

modules['singleClick'] = {
	moduleID: 'singleClick',
	moduleName: 'Single Click Opener',
	options: {
		openOrder: {
			type: 'enum',
			values: [
				{ name: 'open comments then link', value: 'commentsfirst' },
				{ name: 'open link then comments', value: 'linkfirst' }
			],
			value: 'commentsfirst',
			description: 'What order to open the link/comments in.'
		},
		hideLEC: {
			type: 'boolean',
			value: false,
			description: 'Hide the [l=c] when the link is the same as the comments page'
		}
	},
	description: 'Adds an [l+c] link that opens a link and the comments page in new tabs for you in one click.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	isURLMatch: function() {

	},
	include: new Array(
		/https?:\/\/([a-z]+).reddit.com\/[\?]*/i,
		/https?:\/\/([a-z]+).reddit.com\/r\/[-\w\._]*\//i
	),
	exclude: new Array(
		/https?:\/\/([a-z]+).reddit.com\/r\/[-\w\._\/\?]*\/comments[-\w\._\/\?=]*/i
	),
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff here!
			this.applyLinks();
			RESUtils.addCSS('.redditSingleClick { color: #888888; font-weight: bold; cursor: pointer; padding: 0 1px; }');
			// listen for new DOM nodes so that modules like autopager, river of reddit, etc still get l+c links...
			document.body.addEventListener('DOMNodeInserted', function(event) {
				if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
					modules['singleClick'].applyLinks();
				}
			}, true);
		}
	},
	applyLinks: function() {
		var entries = document.querySelectorAll('#siteTable .entry');
		for (var i=0, len=entries.length; i<len;i++) {
			if ((typeof(entries[i]) != 'undefined') && (!(hasClass(entries[i],'lcTagged')))) {
				// bug in chrome, barfs on for i in loops with queryselectorall...
				if (i == 'length') break;
				addClass(entries[i],'lcTagged')
				thisLA = entries[i].querySelector('A.title');
				if (thisLA != null) {
					thisLink = thisLA.getAttribute('href');
					thisComments = entries[i].querySelector('.comments');
					if (!(thisLink.match(/^http/i))) {
						thisLink = 'http://' + document.domain + thisLink;
					}
					thisUL = entries[i].querySelector('.flat-list');
					var singleClickLI = document.createElement('li');
					// changed from a link to a span because you can't cancel a new window on middle click of a link during the mousedown event, and a click event isn't triggered.
					var singleClickLink = document.createElement('span');
					// singleClickLink.setAttribute('href','javascript:void(0);');
					singleClickLink.setAttribute('class','redditSingleClick');
					singleClickLink.setAttribute('thisLink',thisLink);
					singleClickLink.setAttribute('thisComments',thisComments);
					if (thisLink != thisComments) {
						singleClickLink.innerHTML = '[l+c]';
					} else if (!(this.options.hideLEC.value)) {
						singleClickLink.innerHTML = '[l=c]';
					}
					singleClickLI.appendChild(singleClickLink);
					thisUL.appendChild(singleClickLI);
					// we have to switch to mousedown because Webkit is being a douche and not triggering click events on middle click.  
					// ?? We should still preventDefault on a click though, maybe?
					singleClickLink.addEventListener('mousedown', function(e) {
						e.preventDefault();
						if (e.button != 2) {
							// check if it's a relative link (no http://domain) because chrome barfs on these when creating a new tab...
							var thisLink = this.getAttribute('thisLink')
							if (typeof(chrome) != 'undefined') {
								thisJSON = {
									requestType: 'singleClick',
									linkURL: this.getAttribute('thisLink'), 
									openOrder: modules['singleClick'].options.openOrder.value,
									commentsURL: this.getAttribute('thisComments'),
									button: e.button,
									ctrl: e.ctrlKey
								}
								chrome.extension.sendRequest(thisJSON, function(response) {
									// send message to background.html to open new tabs...
									return true;
								});
							} else if (typeof(safari) != 'undefined') {
								thisJSON = {
									requestType: 'singleClick',
									linkURL: this.getAttribute('thisLink'), 
									openOrder: modules['singleClick'].options.openOrder.value,
									commentsURL: this.getAttribute('thisComments'),
									button: e.button,
									ctrl: e.ctrlKey
								}
								safari.self.tab.dispatchMessage("singleClick", thisJSON);
							} else if (typeof(opera) != 'undefined') {
								thisJSON = {
									requestType: 'singleClick',
									linkURL: this.getAttribute('thisLink'), 
									openOrder: modules['singleClick'].options.openOrder.value,
									commentsURL: this.getAttribute('thisComments'),
									button: e.button,
									ctrl: e.ctrlKey
								}
								opera.extension.postMessage(JSON.stringify(thisJSON));
							} else {
								if (modules['singleClick'].options.openOrder.value == 'commentsfirst') {
									if (this.getAttribute('thisLink') != this.getAttribute('thisComments')) {
										// console.log('open comments');
										window.open(this.getAttribute('thisComments'));
									}
									window.open(this.getAttribute('thisLink'));
								} else {
									window.open(this.getAttribute('thisLink'));
									if (this.getAttribute('thisLink') != this.getAttribute('thisComments')) {
										// console.log('open comments');
										window.open(this.getAttribute('thisComments'));
									}
								}
							}
						}
					}, false);
				}
			}
		}

	}
};

modules['commentPreview'] = {
	moduleID: 'commentPreview',
	moduleName: 'Live Comment Preview',
	options: {
		// any configurable options you have go here...
		commentingAs: {
			type: 'boolean',
			value: true,
			description: 'Shows your currently logged in username to avoid posting from the wrong account.'
		}
	},
	description: 'Provides a live preview of comments, as well as shortcuts for easier markdown.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i,
		/https?:\/\/([a-z]+).reddit.com\/message\/[-\w\.]*\/?[-\w\.]*/i,
		/https?:\/\/([a-z]+).reddit.com\/r\/[-\w\.]*\/submit\/?/i,
		/https?:\/\/([a-z]+).reddit.com\/submit\/?/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			/*
			2009-08-30
				- Fixed top comment box.
				- Added markdown toolbar.
				
			2009-02-05
				- Fixed the preview clearing after clicking "comment". That was broken, too.
				
			2009-02-04
				- Fix because reddit broke it.
			*/

			//
			// showdown.js -- A javascript port of Markdown.
			//
			// Copyright (c) 2007 John Fraser.
			//
			// Original Markdown Copyright (c) 2004-2005 John Gruber
			//   <http://daringfireball.net/projects/markdown/>
			//
			// Redistributable under a BSD-style open source license.
			// See license.txt for more information.
			//
			// The full source distribution is at:
			//
			//				A A L
			//				T C A
			//				T K B
			//
			//   <http://www.attacklab.net/>
			//

			//
			// Wherever possible, Showdown is a straight, line-by-line port
			// of the Perl version of Markdown.
			//
			// This is not a normal parser design; it's basically just a
			// series of string substitutions.  It's hard to read and
			// maintain this way,  but keeping Showdown close to the original
			// design makes it easier to port new features.
			//
			// More importantly, Showdown behaves like markdown.pl in most
			// edge cases.  So web applications can do client-side preview
			// in Javascript, and then build identical HTML on the server.
			//
			// This port needs the new RegExp functionality of ECMA 262,
			// 3rd Edition (i.e. Javascript 1.5).  Most modern web browsers
			// should do fine.  Even with the new regular expression features,
			// We do a lot of work to emulate Perl's regex functionality.
			// The tricky changes in this file mostly have the "attacklab:"
			// label.  Major or self-explanatory changes don't.
			//
			// Smart diff tools like Araxis Merge will be able to match up
			// this file with markdown.pl in a useful way.  A little tweaking
			// helps: in a copy of markdown.pl, replace "#" with "//" and
			// replace "$text" with "text".  Be sure to ignore whitespace
			// and line endings.
			//


			//
			// Showdown usage:
			//
			//   var text = "Markdown *rocks*.";
			//
			//   var converter = new Showdown.converter();
			//   var html = converter.makeHtml(text);
			//
			//   alert(html);
			//
			// Note: move the sample code to the bottom of this
			// file before uncommenting it.
			//


			//
			// Showdown namespace
			//
			var Showdown = {};

			//
			// converter
			//
			// Wraps all "globals" so that the only thing
			// exposed is makeHtml().
			//
			Showdown.converter = function() {

			//
			// Globals:
			//

			// Global hashes, used by various utility routines
			var g_urls;
			var g_titles;
			var g_html_blocks;

			// Used to track when we're inside an ordered or unordered list
			// (see _ProcessListItems() for details):
			var g_list_level = 0;


			this.makeHtml = function(text) {
			//
			// Main function. The order in which other subs are called here is
			// essential. Link and image substitutions need to happen before
			// _EscapeSpecialCharsWithinTagAttributes(), so that any *'s or _'s in the <a>
			// and <img> tags get encoded.
			//

				// Clear the global hashes. If we don't clear these, you get conflicts
				// from other articles when generating a page which contains more than
				// one article (e.g. an index page that shows the N most recent
				// articles):
				g_urls = new Array();
				g_titles = new Array();
				g_html_blocks = new Array();

				// Replace < with &lt; and > with &gt;
				text = text.replace(/</g,"&lt;");
				text = text.replace(/>/g,"&gt;");

				// attacklab: Replace ~ with ~T
				// This lets us use tilde as an escape char to avoid md5 hashes
				// The choice of character is arbitray; anything that isn't
				// magic in Markdown will work.
				// text = text.replace(/~/g,"~T");
				text = text.replace(/(^|[^~])~(?!~)/g,"$1~T");

				// attacklab: Replace $ with ~D
				// RegExp interprets $ as a special character
				// when it's in a replacement string
				text = text.replace(/\$/g,"~D");

				// Standardize line endings
				text = text.replace(/\r\n/g,"\n"); // DOS to Unix
				text = text.replace(/\r/g,"\n"); // Mac to Unix

				// Make sure text begins and ends with a couple of newlines:
				text = "\n\n" + text + "\n\n";

				// Convert all tabs to spaces.
				text = _Detab(text);

				// Strip any lines consisting only of spaces and tabs.
				// This makes subsequent regexen easier to write, because we can
				// match consecutive blank lines with /\n+/ instead of something
				// contorted like /[ \t]*\n+/ .
				text = text.replace(/^[ \t]+$/mg,"");

				// Turn block-level HTML blocks into hash entries
				text = _HashHTMLBlocks(text);

				// Strip link definitions, store in hashes.
				text = _StripLinkDefinitions(text);

				// check for tables...
				text = _DoTables(text);

				text = _RunBlockGamut(text);

				text = _UnescapeSpecialChars(text);

				// attacklab: Restore dollar signs
				text = text.replace(/~D/g,"$$");

				// attacklab: Restore tildes
				text = text.replace(/~T/g,"~");

				return text;
			}


			var _StripLinkDefinitions = function(text) {
			//
			// Strips link definitions from text, stores the URLs and titles in
			// hash references.
			//

				// Link defs are in the form: ^[id]: url "optional title"

				/*
					var text = text.replace(/
							^[ ]{0,3}\[(.+)\]:  // id = $1  attacklab: g_tab_width - 1
							  [ \t]*
							  \n?				// maybe *one* newline
							  [ \t]*
							<?(\S+?)>?			// url = $2
							  [ \t]*
							  \n?				// maybe one newline
							  [ \t]*
							(?:
							  (\n*)				// any lines skipped = $3 attacklab: lookbehind removed
							  ["(]
							  (.+?)				// title = $4
							  [")]
							  [ \t]*
							)?					// title is optional
							(?:\n+|$)
						  /gm,
						  function(){...});
				*/
				var text = text.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm,
					function (wholeMatch,m1,m2,m3,m4) {
						m1 = m1.toLowerCase();
						g_urls[m1] = _EncodeAmpsAndAngles(m2);  // Link IDs are case-insensitive
						if (m3) {
							// Oops, found blank lines, so it's not a title.
							// Put back the parenthetical statement we stole.
							return m3+m4;
						} else if (m4) {
							g_titles[m1] = m4.replace(/"/g,"&quot;");
						}
						
						// Completely remove the definition from the text
						return "";
					}
				);

				return text;
			}


			var _HashHTMLBlocks = function(text) {
				// attacklab: Double up blank lines to reduce lookaround
				text = text.replace(/\n/g,"\n\n");

				// Hashify HTML blocks:
				// We only want to do this for block-level HTML tags, such as headers,
				// lists, and tables. That's because we still want to wrap <p>s around
				// "paragraphs" that are wrapped in non-block-level tags, such as anchors,
				// phrase emphasis, and spans. The list of tags we're looking for is
				// hard-coded:
				var block_tags_a = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del"
				var block_tags_b = "p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math"

				// First, look for nested blocks, e.g.:
				//   <div>
				//     <div>
				//     tags for inner block must be indented.
				//     </div>
				//   </div>
				//
				// The outermost tags must start at the left margin for this to match, and
				// the inner nested divs must be indented.
				// We need to do this before the next, more liberal match, because the next
				// match will start at the first `<div>` and stop at the first `</div>`.

				// attacklab: This regex can be expensive when it fails.
				/*
					var text = text.replace(/
					(						// save in $1
						^					// start of line  (with /m)
						<($block_tags_a)	// start tag = $2
						\b					// word break
											// attacklab: hack around khtml/pcre bug...
						[^\r]*?\n			// any number of lines, minimally matching
						</\2>				// the matching end tag
						[ \t]*				// trailing spaces/tabs
						(?=\n+)				// followed by a newline
					)						// attacklab: there are sentinel newlines at end of document
					/gm,function(){...}};
				*/
				text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,hashElement);

				//
				// Now match more liberally, simply from `\n<tag>` to `</tag>\n`
				//

				/*
					var text = text.replace(/
					(						// save in $1
						^					// start of line  (with /m)
						<($block_tags_b)	// start tag = $2
						\b					// word break
											// attacklab: hack around khtml/pcre bug...
						[^\r]*?				// any number of lines, minimally matching
						.*</\2>				// the matching end tag
						[ \t]*				// trailing spaces/tabs
						(?=\n+)				// followed by a newline
					)						// attacklab: there are sentinel newlines at end of document
					/gm,function(){...}};
				*/
				text = text.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,hashElement);

				// Special case just for <hr />. It was easier to make a special case than
				// to make the other regex more complicated.  

				/*
					text = text.replace(/
					(						// save in $1
						\n\n				// Starting after a blank line
						[ ]{0,3}
						(<(hr)				// start tag = $2
						\b					// word break
						([^<>])*?			// 
						\/?>)				// the matching end tag
						[ \t]*
						(?=\n{2,})			// followed by a blank line
					)
					/g,hashElement);
				*/
				text = text.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,hashElement);

				// Special case for standalone HTML comments:

				/*
					text = text.replace(/
					(						// save in $1
						\n\n				// Starting after a blank line
						[ ]{0,3}			// attacklab: g_tab_width - 1
						<!
						(--[^\r]*?--\s*)+
						>
						[ \t]*
						(?=\n{2,})			// followed by a blank line
					)
					/g,hashElement);
				*/
				text = text.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,hashElement);

				// PHP and ASP-style processor instructions (<?...?> and <%...%>)

				/*
					text = text.replace(/
					(?:
						\n\n				// Starting after a blank line
					)
					(						// save in $1
						[ ]{0,3}			// attacklab: g_tab_width - 1
						(?:
							<([?%])			// $2
							[^\r]*?
							\2>
						)
						[ \t]*
						(?=\n{2,})			// followed by a blank line
					)
					/g,hashElement);
				*/
				text = text.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,hashElement);

				// attacklab: Undo double lines (see comment at top of this function)
				text = text.replace(/\n\n/g,"\n");
				return text;
			}

			var hashElement = function(wholeMatch,m1) {
				var blockText = m1;

				// Undo double lines
				blockText = blockText.replace(/\n\n/g,"\n");
				blockText = blockText.replace(/^\n/,"");
				
				// strip trailing blank lines
				blockText = blockText.replace(/\n+$/g,"");
				
				// Replace the element text with a marker ("~KxK" where x is its key)
				blockText = "\n\n~K" + (g_html_blocks.push(blockText)-1) + "K\n\n";
				
				return blockText;
			};

			var _RunBlockGamut = function(text) {
			//
			// These are all the transformations that form block-level
			// tags like paragraphs, headers, and list items.
			//
				text = _DoHeaders(text);

				// Do Horizontal Rules:
				var key = hashBlock("<hr />");
				text = text.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,key);
				text = text.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,key);
				text = text.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,key);

				text = _DoLists(text);
				text = _DoCodeBlocks(text);
				text = _DoBlockQuotes(text);

				// We already ran _HashHTMLBlocks() before, in Markdown(), but that
				// was to escape raw HTML in the original Markdown source. This time,
				// we're escaping the markup we've just created, so that we don't wrap
				// <p> tags around block-level tags.
				text = _HashHTMLBlocks(text);
				text = _FormParagraphs(text);

				return text;
			}


			var _RunSpanGamut = function(text) {
			//
			// These are all the transformations that occur *within* block-level
			// tags like paragraphs, headers, and list items.
			//

				text = _DoCodeSpans(text);
				text = _EscapeSpecialCharsWithinTagAttributes(text);
				text = _EncodeBackslashEscapes(text);

				// Process anchor and image tags. Images must come first,
				// because ![foo][f] looks like an anchor.
				text = _DoImages(text);
				text = _DoAnchors(text);

				// Make links out of things like `<http://example.com/>`
				// Must come after _DoAnchors(), because you can use < and >
				// delimiters in inline links like [this](<url>).
				text = _DoAutoLinks(text);
				text = _EncodeAmpsAndAngles(text);
				text = _DoItalicsAndBoldAndStrike(text);
				text = _DoSuperscript(text);

				// Do hard breaks:
				text = text.replace(/  +\n/g," <br />\n");

				return text;
			}

			var _EscapeSpecialCharsWithinTagAttributes = function(text) {
			//
			// Within tags -- meaning between < and > -- encode [\ ` * _] so they
			// don't conflict with their use in Markdown for code, italics and strong.
			//

				// Build a regex to find HTML tags and comments.  See Friedl's 
				// "Mastering Regular Expressions", 2nd Ed., pp. 200-201.
				var regex = /(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;

				text = text.replace(regex, function(wholeMatch) {
					var tag = wholeMatch.replace(/(.)<\/?code>(?=.)/g,"$1`");
					tag = escapeCharacters(tag,"\\`*_");
					return tag;
				});

				return text;
			}

			var _DoAnchors = function(text) {
			//
			// Turn Markdown link shortcuts into XHTML <a> tags.
			//
				//
				// First, handle reference-style links: [link text] [id]
				//

				/*
					text = text.replace(/
					(							// wrap whole match in $1
						\[
						(
							(?:
								\[[^\]]*\]		// allow brackets nested one level
								|
								[^\[]			// or anything else
							)*
						)
						\]

						[ ]?					// one optional space
						(?:\n[ ]*)?				// one optional newline followed by spaces

						\[
						(.*?)					// id = $3
						\]
					)()()()()					// pad remaining backreferences
					/g,_DoAnchors_callback);
				*/
				text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,writeAnchorTag);

				//
				// Next, inline-style links: [link text](url "optional title")
				//

				/*
					text = text.replace(/
						(						// wrap whole match in $1
							\[
							(
								(?:
									\[[^\]]*\]	// allow brackets nested one level
								|
								[^\[\]]			// or anything else
							)
						)
						\]
						\(						// literal paren
						[ \t]*
						()						// no id, so leave $3 empty
						<?(.*?)>?				// href = $4
						[ \t]*
						(						// $5
							(['"])				// quote char = $6
							(.*?)				// Title = $7
							\6					// matching quote
							[ \t]*				// ignore any spaces/tabs between closing quote and )
						)?						// title is optional
						\)
					)
					/g,writeAnchorTag);
				*/
				text = text.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,writeAnchorTag);

				//
				// Last, handle reference-style shortcuts: [link text]
				// These must come last in case you've also got [link test][1]
				// or [link test](/foo)
				//

				/*
					text = text.replace(/
					(		 					// wrap whole match in $1
						\[
						([^\[\]]+)				// link text = $2; can't contain '[' or ']'
						\]
					)()()()()()					// pad rest of backreferences
					/g, writeAnchorTag);
				*/
				text = text.replace(/(\[([^\[\]]+)\])()()()()()/g, writeAnchorTag);

				return text;
			}

			var writeAnchorTag = function(wholeMatch,m1,m2,m3,m4,m5,m6,m7) {
				if (m7 == undefined) m7 = "";
				var whole_match = m1;
				var link_text   = m2;
				var link_id	 = m3.toLowerCase();
				var url		= m4;
				var title	= m7;
				
				if (url == "") {
					if (link_id == "") {
						// lower-case and turn embedded newlines into spaces
						link_id = link_text.toLowerCase().replace(/ ?\n/g," ");
					}
					url = "#"+link_id;
					
					if (g_urls[link_id] != undefined) {
						url = g_urls[link_id];
						if (g_titles[link_id] != undefined) {
							title = g_titles[link_id];
						}
					}
					else {
						if (whole_match.search(/\(\s*\)$/m)>-1) {
							// Special case for explicit empty url
							url = "";
						} else {
							return whole_match;
						}
					}
				}	
				
				url = escapeCharacters(url,"*_");
				var result = "<a href=\"" + url + "\"";
				
				if (title != "") {
					title = title.replace(/"/g,"&quot;");
					title = escapeCharacters(title,"*_");
					result +=  " title=\"" + title + "\"";
				}
				
				result += ">" + link_text + "</a>";
				
				return result;
			}


			var _DoImages = function(text) {
			//
			// Turn Markdown image shortcuts into <img> tags.
			//

				//
				// First, handle reference-style labeled images: ![alt text][id]
				//

				/*
					text = text.replace(/
					(						// wrap whole match in $1
						!\[
						(.*?)				// alt text = $2
						\]

						[ ]?				// one optional space
						(?:\n[ ]*)?			// one optional newline followed by spaces

						\[
						(.*?)				// id = $3
						\]
					)()()()()				// pad rest of backreferences
					/g,writeImageTag);
				*/
				text = text.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,writeImageTag);

				//
				// Next, handle inline images:  ![alt text](url "optional title")
				// Don't forget: encode * and _

				/*
					text = text.replace(/
					(						// wrap whole match in $1
						!\[
						(.*?)				// alt text = $2
						\]
						\s?					// One optional whitespace character
						\(					// literal paren
						[ \t]*
						()					// no id, so leave $3 empty
						<?(\S+?)>?			// src url = $4
						[ \t]*
						(					// $5
							(['"])			// quote char = $6
							(.*?)			// title = $7
							\6				// matching quote
							[ \t]*
						)?					// title is optional
					\)
					)
					/g,writeImageTag);
				*/
				text = text.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,writeImageTag);

				return text;
			}

			var writeImageTag = function(wholeMatch,m1,m2,m3,m4,m5,m6,m7) {
				var whole_match = m1;
				var alt_text   = m2;
				var link_id	 = m3.toLowerCase();
				var url		= m4;
				var title	= m7;

				if (!title) title = "";
				
				if (url == "") {
					if (link_id == "") {
						// lower-case and turn embedded newlines into spaces
						link_id = alt_text.toLowerCase().replace(/ ?\n/g," ");
					}
					url = "#"+link_id;
					
					if (g_urls[link_id] != undefined) {
						url = g_urls[link_id];
						if (g_titles[link_id] != undefined) {
							title = g_titles[link_id];
						}
					}
					else {
						return whole_match;
					}
				}	
				
				alt_text = alt_text.replace(/"/g,"&quot;");
				url = escapeCharacters(url,"*_");
				var result = "<img src=\"" + url + "\" alt=\"" + alt_text + "\"";

				// attacklab: Markdown.pl adds empty title attributes to images.
				// Replicate this bug.

				//if (title != "") {
					title = title.replace(/"/g,"&quot;");
					title = escapeCharacters(title,"*_");
					result +=  " title=\"" + title + "\"";
				//}
				
				result += " />";
				
				return result;
			}


			var _DoHeaders = function(text) {

				// Setext-style headers:
				//	Header 1
				//	========
				//  
				//	Header 2
				//	--------
				//
				text = text.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,
					function(wholeMatch,m1){return hashBlock("<h1>" + _RunSpanGamut(m1) + "</h1>");});

				text = text.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,
					function(matchFound,m1){return hashBlock("<h2>" + _RunSpanGamut(m1) + "</h2>");});

				// atx-style headers:
				//  # Header 1
				//  ## Header 2
				//  ## Header 2 with closing hashes ##
				//  ...
				//  ###### Header 6
				//

				/*
					text = text.replace(/
						^(\#{1,6})				// $1 = string of #'s
						[ \t]*
						(.+?)					// $2 = Header text
						[ \t]*
						\#*						// optional closing #'s (not counted)
						\n+
					/gm, function() {...});
				*/

				text = text.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,
					function(wholeMatch,m1,m2) {
						var h_level = m1.length;
						return hashBlock("<h" + h_level + ">" + _RunSpanGamut(m2) + "</h" + h_level + ">");
					});

				return text;
			}

			// This declaration keeps Dojo compressor from outputting garbage:
			var _ProcessListItems;

			var _DoLists = function(text) {
			//
			// Form HTML ordered (numbered) and unordered (bulleted) lists.
			//

				// attacklab: add sentinel to hack around khtml/safari bug:
				// http://bugs.webkit.org/show_bug.cgi?id=11231
				text += "~0";

				// Re-usable pattern to match any entirel ul or ol list:

				/*
					var whole_list = /
					(									// $1 = whole list
						(								// $2
							[ ]{0,3}					// attacklab: g_tab_width - 1
							([*+-]|\d+[.])				// $3 = first list item marker
							[ \t]+
						)
						[^\r]+?
						(								// $4
							~0							// sentinel for workaround; should be $
						|
							\n{2,}
							(?=\S)
							(?!							// Negative lookahead for another list item marker
								[ \t]*
								(?:[*+-]|\d+[.])[ \t]+
							)
						)
					)/g
				*/
				var whole_list = /^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;

				if (g_list_level) {
					text = text.replace(whole_list,function(wholeMatch,m1,m2) {
						var list = m1;
						var list_type = (m2.search(/[*+-]/g)>-1) ? "ul" : "ol";

						// Turn double returns into triple returns, so that we can make a
						// paragraph for the last item in a list, if necessary:
						list = list.replace(/\n{2,}/g,"\n\n\n");;
						var result = _ProcessListItems(list);
				
						// Trim any trailing whitespace, to put the closing `</$list_type>`
						// up on the preceding line, to get it past the current stupid
						// HTML block parser. This is a hack to work around the terrible
						// hack that is the HTML block parser.
						result = result.replace(/\s+$/,"");
						result = "<"+list_type+">" + result + "</"+list_type+">\n";
						return result;
					});
				} else {
					whole_list = /(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g;
					text = text.replace(whole_list,function(wholeMatch,m1,m2,m3) {
						var runup = m1;
						var list = m2;

						var list_type = (m3.search(/[*+-]/g)>-1) ? "ul" : "ol";
						// Turn double returns into triple returns, so that we can make a
						// paragraph for the last item in a list, if necessary:
						var list = list.replace(/\n{2,}/g,"\n\n\n");;
						var result = _ProcessListItems(list);
						result = runup + "<"+list_type+">\n" + result + "</"+list_type+">\n";	
						return result;
					});
				}

				// attacklab: strip sentinel
				text = text.replace(/~0/,"");

				return text;
			}

			_ProcessListItems = function(list_str) {
			//
			//  Process the contents of a single ordered or unordered list, splitting it
			//  into individual list items.
			//
				// The $g_list_level global keeps track of when we're inside a list.
				// Each time we enter a list, we increment it; when we leave a list,
				// we decrement. If it's zero, we're not in a list anymore.
				//
				// We do this because when we're not inside a list, we want to treat
				// something like this:
				//
				//    I recommend upgrading to version
				//    8. Oops, now this line is treated
				//    as a sub-list.
				//
				// As a single paragraph, despite the fact that the second line starts
				// with a digit-period-space sequence.
				//
				// Whereas when we're inside a list (or sub-list), that line will be
				// treated as the start of a sub-list. What a kludge, huh? This is
				// an aspect of Markdown's syntax that's hard to parse perfectly
				// without resorting to mind-reading. Perhaps the solution is to
				// change the syntax rules such that sub-lists must start with a
				// starting cardinal number; e.g. "1." or "a.".

				g_list_level++;

				// trim trailing blank lines:
				list_str = list_str.replace(/\n{2,}$/,"\n");

				// attacklab: add sentinel to emulate \z
				list_str += "~0";

				/*
					list_str = list_str.replace(/
						(\n)?							// leading line = $1
						(^[ \t]*)						// leading whitespace = $2
						([*+-]|\d+[.]) [ \t]+			// list marker = $3
						([^\r]+?						// list item text   = $4
						(\n{1,2}))
						(?= \n* (~0 | \2 ([*+-]|\d+[.]) [ \t]+))
					/gm, function(){...});
				*/
				list_str = list_str.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,
					function(wholeMatch,m1,m2,m3,m4){
						var item = m4;
						var leading_line = m1;
						var leading_space = m2;

						if (leading_line || (item.search(/\n{2,}/)>-1)) {
							item = _RunBlockGamut(_Outdent(item));
						}
						else {
							// Recursion for sub-lists:
							item = _DoLists(_Outdent(item));
							item = item.replace(/\n$/,""); // chomp(item)
							item = _RunSpanGamut(item);
						}

						return  "<li>" + item + "</li>\n";
					}
				);

				// attacklab: strip sentinel
				list_str = list_str.replace(/~0/g,"");

				g_list_level--;
				return list_str;
			}


			var _DoCodeBlocks = function(text) {
			//
			//  Process Markdown `<pre><code>` blocks.
			//  

				/*
					text = text.replace(text,
						/(?:\n\n|^)
						(								// $1 = the code block -- one or more lines, starting with a space/tab
							(?:
								(?:[ ]{4}|\t)			// Lines must start with a tab or a tab-width of spaces - attacklab: g_tab_width
								.*\n+
							)+
						)
						(\n*[ ]{0,3}[^ \t\n]|(?=~0))	// attacklab: g_tab_width
					/g,function(){...});
				*/

				// attacklab: sentinel workarounds for lack of \A and \Z, safari\khtml bug
				text += "~0";
				
				text = text.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,
					function(wholeMatch,m1,m2) {
						var codeblock = m1;
						var nextChar = m2;
					
						codeblock = _EncodeCode( _Outdent(codeblock));
						codeblock = _Detab(codeblock);
						codeblock = codeblock.replace(/^\n+/g,""); // trim leading newlines
						codeblock = codeblock.replace(/\n+$/g,""); // trim trailing whitespace

						codeblock = "<pre><code>" + codeblock + "\n</code></pre>";

						return hashBlock(codeblock) + nextChar;
					}
				);

				// attacklab: strip sentinel
				text = text.replace(/~0/,"");

				return text;
			}

			var hashBlock = function(text) {
				text = text.replace(/(^\n+|\n+$)/g,"");
				return "\n\n~K" + (g_html_blocks.push(text)-1) + "K\n\n";
			}


			var _DoCodeSpans = function(text) {
			//
			//   *  Backtick quotes are used for <code></code> spans.
			// 
			//   *  You can use multiple backticks as the delimiters if you want to
			//	 include literal backticks in the code span. So, this input:
			//	 
			//		 Just type ``foo `bar` baz`` at the prompt.
			//	 
			//	   Will translate to:
			//	 
			//		 <p>Just type <code>foo `bar` baz</code> at the prompt.</p>
			//	 
			//	There's no arbitrary limit to the number of backticks you
			//	can use as delimters. If you need three consecutive backticks
			//	in your code, use four for delimiters, etc.
			//
			//  *  You can use spaces to get literal backticks at the edges:
			//	 
			//		 ... type `` `bar` `` ...
			//	 
			//	   Turns to:
			//	 
			//		 ... type <code>`bar`</code> ...
			//

				/*
					text = text.replace(/
						(^|[^\\])					// Character before opening ` can't be a backslash
						(`+)						// $2 = Opening run of `
						(							// $3 = The code block
							[^\r]*?
							[^`]					// attacklab: work around lack of lookbehind
						)
						\2							// Matching closer
						(?!`)
					/gm, function(){...});
				*/

				text = text.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,
					function(wholeMatch,m1,m2,m3,m4) {
						var c = m3;
						c = c.replace(/^([ \t]*)/g,"");	// leading whitespace
						c = c.replace(/[ \t]*$/g,"");	// trailing whitespace
						c = _EncodeCode(c);
						return m1+"<code>"+c+"</code>";
					});

				return text;
			}


			var _EncodeCode = function(text) {
			//
			// Encode/escape certain characters inside Markdown code runs.
			// The point is that in code, these characters are literals,
			// and lose their special Markdown meanings.
			//
				// Encode all ampersands; HTML entities are not
				// entities within a Markdown code span.
				text = text.replace(/&/g,"&amp;");

				// Do the angle bracket song and dance:
				text = text.replace(/</g,"&lt;");
				text = text.replace(/>/g,"&gt;");

				// Now, escape characters that are magic in Markdown:
				text = escapeCharacters(text,"\*_{}[]\\",false);

			// jj the line above breaks this:
			//---

			//* Item

			//   1. Subitem

			//            special char: *
			//---

				return text;
			}


			var _DoItalicsAndBoldAndStrike = function(text) {
				text = text.replace(/(?:^|[^\S])(~~)((?:.+)(?:(?:\n.+)+)?)\1/g,
					" <del>$2</del>");
					
				// <strong> must go first:
				// text = text.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,
				// text = text.replace(/(^|[^\S])(\*\*|__)(.+)\n?(.*)\2/g,
				// text = text.replace(/(\*\*|__)((?:.+)(?:(?:\n.+)+)?)\1/g,
				text = text.replace(/(\*\*)((?:.+?)(?:(?:\n.*)+)?)\1/g,
					"<strong>$2</strong>");

				// text = text.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,
				// (^|[^\S])(\*|_)([^*]+)(([\n{1}].+)+)?\2
				// (^|[^\S])(\*|_)[^*]+\2
				// text = text.replace(/(^|[^\S])(\*|_)(.+)\n?(.*)\2/g,
				text = text.replace(/(\*)((?:.+?)(?:(?:\n.*)+)?)\1/g,
					"<em>$2</em>");
				text = text.replace(/(?:^|[^\S])(_)((?:.+)(?:(?:\n.*)+)?)\1/g,
					" <em>$2</em>");
					
				return text;
			}

			var _DoSuperscript = function(text) {
				// do the bigger grab first (to capture things like its^super^duper
				var lastText = '';
				while (text != lastText) {
					lastText = text;
					text = text.replace(/([\S]+)\^([\S]+)/g,
						"$1<sup>$2</sup>");
				}
				return text;
			}

			var _DoTables = function(text) {
				// eventually...
				// (([\w]+)(?:\|([\w]+))+)\n((--+)(?:\|(--+))+)\n(([\w]+)(?:\|([\w]+))+\n)+ grabs a table!
				if (text) {
					var match = text.match(/[^\n\r]+(?:\|[^\n\r]+)+\n--(?:\|--)+\n(?:[^\n\r]+(\|[^\n\r]+)+\n)+/g);
					if (match != null) {
						for (var i=0, len=match.length; i<len; i++) {
							if (typeof(match[i]) != 'undefined') {
								var thisTable = match[i].split('\n');
								var thisRow = thisTable[0];
								var thisRowCells = thisRow.split('|');
								var thisTableHTML = '<table><thead>';
								for (cell in thisRowCells) {
									thisCell = _RunSpanGamut(thisRowCells[cell]);
									thisTableHTML += '<th>'+thisCell+'</th>';
								}
								thisTableHTML += '</thead><tbody>';
								// row 0 is headers. row 1 is dividers which we can ignore, so we'll start at row 2.
								for (var j=2, len=thisTable.length; j<len; j++) {
									thisRow = thisTable[j];
									thisRowCells = thisRow.split('|');
									thisTableHTML += '<tr>';
									for (cell in thisRowCells) {
										thisCell = _RunSpanGamut(thisRowCells[cell]);
										thisTableHTML += '<td>'+thisCell+'</td>';
									}
									thisTableHTML += '</tr>';
								}
								thisTableHTML += '</tbody></table>';
								
								text = text.replace(/[^\n\r]+(?:\|[^\n\r]+)+\n--(?:\|--)+\n(?:[^\n\r]+(\|[^\n\r]+)+\n)+/,
									thisTableHTML);
							}
						}
					}
				}
				return text;
			}


			var _DoBlockQuotes = function(text) {

				/*
					text = text.replace(/
					(								// Wrap whole match in $1
						(
							^[ \t]*>[ \t]?			// '>' at the start of a line
							.+\n					// rest of the first line
							(.+\n)*					// subsequent consecutive lines
							\n*						// blanks
						)+
					)
					/gm, function(){...});
				*/

				text = text.replace(/((^[ \t]*&gt;[ \t]?.+\n(.+\n)*\n*)+)/gm,
					function(wholeMatch,m1) {
						var bq = m1;

						// attacklab: hack around Konqueror 3.5.4 bug:
						// "----------bug".replace(/^-/g,"") == "bug"

						bq = bq.replace(/^[ \t]*&gt;[ \t]?/gm,"~0");	// trim one level of quoting

						// attacklab: clean up hack
						bq = bq.replace(/~0/g,"");

						bq = bq.replace(/^[ \t]+$/gm,"");		// trim whitespace-only lines
						bq = _RunBlockGamut(bq);				// recurse
						
						bq = bq.replace(/(^|\n)/g,"$1  ");
						// These leading spaces screw with <pre> content, so we need to fix that:
						bq = bq.replace(
								/(\s*<pre>[^\r]+?<\/pre>)/gm,
							function(wholeMatch,m1) {
								var pre = m1;
								// attacklab: hack around Konqueror 3.5.4 bug:
								pre = pre.replace(/^  /mg,"~0");
								pre = pre.replace(/~0/g,"");
								return pre;
							});
						
						return hashBlock("<blockquote>\n" + bq + "\n</blockquote>");
					});
				return text;
			}


			var _FormParagraphs = function(text) {
			//
			//  Params:
			//    $text - string to process with html <p> tags
			//

				// Strip leading and trailing lines:
				text = text.replace(/^\n+/g,"");
				text = text.replace(/\n+$/g,"");

				var grafs = text.split(/\n{2,}/g);
				var grafsOut = new Array();

				//
				// Wrap <p> tags.
				//
				var end = grafs.length;
				for (var i=0; i<end; i++) {
					var str = grafs[i];

					// if this is an HTML marker, copy it
					if (str.search(/~K(\d+)K/g) >= 0) {
						grafsOut.push(str);
					}
					else if (str.search(/\S/) >= 0) {
						str = _RunSpanGamut(str);
						str = str.replace(/^([ \t]*)/g,"<p>");
						str += "</p>"
						grafsOut.push(str);
					}

				}

				//
				// Unhashify HTML blocks
				//
				end = grafsOut.length;
				for (var i=0; i<end; i++) {
					// if this is a marker for an html block...
					while (grafsOut[i].search(/~K(\d+)K/) >= 0) {
						var blockText = g_html_blocks[RegExp.$1];
						blockText = blockText.replace(/\$/g,"$$$$"); // Escape any dollar signs
						grafsOut[i] = grafsOut[i].replace(/~K\d+K/,blockText);
					}
				}

				return grafsOut.join("\n\n");
			}


			var _EncodeAmpsAndAngles = function(text) {
			// Smart processing for ampersands and angle brackets that need to be encoded.
				
				// Ampersand-encoding based entirely on Nat Irons's Amputator MT plugin:
				//   http://bumppo.net/projects/amputator/
				text = text.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;");
				
				// Encode naked <'s
				text = text.replace(/<(?![a-z\/?\$!])/gi,"&lt;");
				
				return text;
			}


			var _EncodeBackslashEscapes = function(text) {
			//
			//   Parameter:  String.
			//   Returns:	The string, with after processing the following backslash
			//			   escape sequences.
			//

				// attacklab: The polite way to do this is with the new
				// escapeCharacters() function:
				//
				// 	text = escapeCharacters(text,"\\",true);
				// 	text = escapeCharacters(text,"`*_{}[]()>#+-.!",true);
				//
				// ...but we're sidestepping its use of the (slow) RegExp constructor
				// as an optimization for Firefox.  This function gets called a LOT.

				text = text.replace(/\\(\\)/g,escapeCharacters_callback);
				text = text.replace(/\\([`*_{}\[\]()>#+-.!])/g,escapeCharacters_callback);
				return text;
			}


			var _DoAutoLinks = function(text) {

				text = text.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,"<a href=\"$1\">$1</a>");

				// Email addresses: <address@domain.foo>

				/*
					text = text.replace(/
						<
						(?:mailto:)?
						(
							[-.\w]+
							\@
							[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+
						)
						>
					/gi, _DoAutoLinks_callback());
				*/
				
				text = text.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,
					function(wholeMatch,m1) {
						return _EncodeEmailAddress( _UnescapeSpecialChars(m1) );
					}
				);

				return text;
			}


			var _EncodeEmailAddress = function(addr) {
			//
			//  Input: an email address, e.g. "foo@example.com"
			//
			//  Output: the email address as a mailto link, with each character
			//	of the address encoded as either a decimal or hex entity, in
			//	the hopes of foiling most address harvesting spam bots. E.g.:
			//
			//	<a href="&#x6D;&#97;&#105;&#108;&#x74;&#111;:&#102;&#111;&#111;&#64;&#101;
			//	   x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;">&#102;&#111;&#111;
			//	   &#64;&#101;x&#x61;&#109;&#x70;&#108;&#x65;&#x2E;&#99;&#111;&#109;</a>
			//
			//  Based on a filter by Matthew Wickline, posted to the BBEdit-Talk
			//  mailing list: <http://tinyurl.com/yu7ue>
			//

				// attacklab: why can't javascript speak hex?
				function char2hex(ch) {
					var hexDigits = '0123456789ABCDEF';
					var dec = ch.charCodeAt(0);
					return(hexDigits.charAt(dec>>4) + hexDigits.charAt(dec&15));
				}

				var encode = [
					function(ch){return "&#"+ch.charCodeAt(0)+";";},
					function(ch){return "&#x"+char2hex(ch)+";";},
					function(ch){return ch;}
				];

				addr = "mailto:" + addr;

				addr = addr.replace(/./g, function(ch) {
					if (ch == "@") {
						// this *must* be encoded. I insist.
						ch = encode[Math.floor(Math.random()*2)](ch);
					} else if (ch !=":") {
						// leave ':' alone (to spot mailto: later)
						var r = Math.random();
						// roughly 10% raw, 45% hex, 45% dec
						ch =  (
								r > .9  ?	encode[2](ch)   :
								r > .45 ?	encode[1](ch)   :
											encode[0](ch)
							);
					}
					return ch;
				});

				addr = "<a href=\"" + addr + "\">" + addr + "</a>";
				addr = addr.replace(/">.+:/g,"\">"); // strip the mailto: from the visible part"

				return addr;
			}


			var _UnescapeSpecialChars = function(text) {
			//
			// Swap back in all the special characters we've hidden.
			//
				text = text.replace(/~E(\d+)E/g,
					function(wholeMatch,m1) {
						var charCodeToReplace = parseInt(m1);
						return String.fromCharCode(charCodeToReplace);
					}
				);
				return text;
			}


			var _Outdent = function(text) {
			//
			// Remove one level of line-leading tabs or spaces
			//

				// attacklab: hack around Konqueror 3.5.4 bug:
				// "----------bug".replace(/^-/g,"") == "bug"

				text = text.replace(/^(\t|[ ]{1,4})/gm,"~0"); // attacklab: g_tab_width

				// attacklab: clean up hack
				text = text.replace(/~0/g,"")

				return text;
			}

			var _Detab = function(text) {
			// attacklab: Detab's completely rewritten for speed.
			// In perl we could fix it by anchoring the regexp with \G.
			// In javascript we're less fortunate.

				// expand first n-1 tabs
				text = text.replace(/\t(?=\t)/g,"    "); // attacklab: g_tab_width

				// replace the nth with two sentinels
				text = text.replace(/\t/g,"~A~B");

				// use the sentinel to anchor our regex so it doesn't explode
				text = text.replace(/~B(.+?)~A/g,
					function(wholeMatch,m1,m2) {
						var leadingText = m1;
						var numSpaces = 4 - leadingText.length % 4;  // attacklab: g_tab_width

						// there *must* be a better way to do this:
						for (var i=0; i<numSpaces; i++) leadingText+=" ";

						return leadingText;
					}
				);

				// clean up sentinels
				text = text.replace(/~A/g,"    ");  // attacklab: g_tab_width
				text = text.replace(/~B/g,"");

				return text;
			}


			//
			//  attacklab: Utility functions
			//


			var escapeCharacters = function(text, charsToEscape, afterBackslash) {
				// First we have to escape the escape characters so that
				// we can build a character class out of them
				var regexString = "([" + charsToEscape.replace(/([\[\]\\])/g,"\\$1") + "])";

				if (afterBackslash) {
					regexString = "\\\\" + regexString;
				}

				var regex = new RegExp(regexString,"g");
				text = text.replace(regex,escapeCharacters_callback);

				return text;
			}


			var escapeCharacters_callback = function(wholeMatch,m1) {
				var charCodeToEscape = m1.charCodeAt(0);
				return "~E"+charCodeToEscape+"E";
			}

			} // end of Showdown.converter




			// ###########################################################################
			// Start user script 
			// ###########################################################################



			var converter = new Showdown.converter();

			function wireupNewCommentEditors( parent )
			{	
				if (!parent.getElementsByTagName) return;
				
				if ( parent.tagName == 'FORM' )
				{		
					/*HACK: I don't get it! When I click Reply to a comment, a live 
					preview already exists! Even before our handler for DOMNodeInserted 
					fires. (I tested this with a timeout.) Plus, the existing live preview 
					will already contain whatever preview is in the main comment preview 
					at the time, but it is not linked to the main comment text area, so it 
					never updates. The crazy thig is, the form for the comment reply 
					doesn't even exist in the DOM before we click the Reply link. So where 
					the hell is this preview coming from? I'm just brute-forcing it away 
					for now. Same issue with the editor*/
					removeExistingPreview( parent );		
					removeExistingEditor( parent );
					
					var preview = addPreviewToParent( parent );	
					addMarkdownEditorToForm( parent, preview );
				}
				else
				{		
					var forms = parent.getElementsByTagName('form');
					
					for ( var i=0, form=null; form=forms[i]; i++ ) {
						
						if ( form.getAttribute('id') && (form.getAttribute('id').match(/^commentreply_./)))	{				
							var preview = addPreviewToParent(form);
							addMarkdownEditorToForm( form, preview );
						} else if (form.getAttribute('id').match(/^form-./)) {
							// this is a just-added comment, so we need to add the elements to the usertext-edit div as its structure is a bit different from an existing comment...
							var usertext = form.querySelector('.usertext-edit');
							var preview = addPreviewToParent(usertext);
							addMarkdownEditorToForm( usertext, preview );
						}

					}
				}
			}

			function wireupExistingCommentEditors()
			{
				// opera doesn't like xpath for some reason - changing to querySelectorAll.
				/*
				var editDivs = document.evaluate(
					"//div[@class='usertext-edit']",
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null
				);
				//First one is not an edit form.
				for ( var i = 0; i < editDivs.snapshotLength; i++)
				{
					var editDiv = editDivs.snapshotItem(i);
					
					var preview = addPreviewToParent( editDiv );
					addMarkdownEditorToForm( editDiv, preview );
					
					refreshPreview( preview, preview.textArea )
				}
				*/
				var editDivs = document.body.querySelectorAll('div.usertext-edit');
				//First one is not an edit form.
				for ( var i = 0, len=editDivs.length; i < len; i++)
				{
					var editDiv = editDivs[i];
					
					var preview = addPreviewToParent( editDiv );
					addMarkdownEditorToForm( editDiv, preview );
					
					refreshPreview( preview, preview.textArea )
				}
				
			}
			
			function wireupViewSourceButtons(ele) {
				if (ele == null) ele = document;
				if (RESUtils.pageType() == 'comments') {
					modules['commentPreview'].commentMenus = ele.querySelectorAll('.entry .flat-list.buttons .first');
					modules['commentPreview'].commentMenusCount = modules['commentPreview'].commentMenus.length;
					modules['commentPreview'].commentMenusi = 0;
					(function(){
						// scan 15 links at a time...
						var chunkLength = Math.min((modules['commentPreview'].commentMenusCount - modules['commentPreview'].commentMenusi), 15);
						for (var i=0;i<chunkLength;i++) {
							viewSource = document.createElement('li');
							viewSource.innerHTML = '<a href="javascript:void(0)">source</a>';
							viewSource.addEventListener('click',function(e) {
								e.preventDefault();
								modules['commentPreview'].viewSource(e.target);
							}, false);
							// if (modules['commentPreview'].commentMenus[modules['commentPreview'].commentMenusi].nextSibling) {
							//	insertAfter(modules['commentPreview'].commentMenus[modules['commentPreview'].commentMenusi].nextSibling, viewSource);
							//} else {
								if (modules['commentPreview'].commentMenus[modules['commentPreview'].commentMenusi].nextSibling != null) {
									insertAfter(modules['commentPreview'].commentMenus[modules['commentPreview'].commentMenusi].nextSibling, viewSource);
								}
							//}
							modules['commentPreview'].commentMenusi++;
						}
						if (modules['commentPreview'].commentMenusi < modules['commentPreview'].commentMenusCount) {
							setTimeout(arguments.callee, 1000);
						} 
					})();		
				}
			}

			function addPreviewToParent( parent ) {	
				var set=document.createElement('fieldset');
				set.setAttribute('class', 'liveComment');

				var legend=document.createElement('legend');
				legend.textContent='Live Preview';

				var preview=document.createElement('div');
				preview.setAttribute('class', 'md');
				

				set.appendChild(legend);
				set.appendChild(preview);

				// modification: hide this thing until someone types...
				preview.parentNode.style.display = 'none';
				
				parent.appendChild(set);

				var textAreas = parent.getElementsByTagName('textarea');
				
				if ( textAreas[0] )
				{		
					var targetTextArea = textAreas[0];
				
					var timer=null;
					
					targetTextArea.addEventListener(
						'keyup',
						function()
						{
							if (timer) clearTimeout(timer);
							
							timer = setTimeout(
								function()
								{
									refreshPreview( preview, targetTextArea );			
								},
								100
							);
						},
						false
					);	
					
					preview.textArea = targetTextArea;
				
					addPreviewClearOnCommentSubmit( parent, preview );
				}
				
				return preview;
			}

			//Find any fieldsets with a class of liveComment as children of this element and remove them.
			function removeExistingPreview( parent )
			{
				var fieldSets = parent.getElementsByTagName('fieldset');
				
				for (var i = 0, fieldSet = null; fieldSet = fieldSets[i]; i++)
				{		
					if ( fieldSet.getAttribute( 'class' ) == 'liveComment' )
					{			
						fieldSet.parentNode.removeChild( fieldSet );
						break;
					}
				}
			}

			function removeExistingEditor( parent )
			{
				// var divs = parent.getElementsByTagName('div');
				var divs = parent.querySelectorAll('.markdownEditor, .commentingAs');
				
				for (var i = 0, div = null; div = divs[i]; i++)
				{
					div.parentNode.removeChild( div );
				}
			}

			function addPreviewClearOnCommentSubmit( parent, preview )
			{
				var buttons = parent.getElementsByTagName('button');
				
				for (var i = 0, button = null; button = buttons[i]; i++)
				{
					if ( button.getAttribute('class') == "save" )
					{
						button.addEventListener(
							'click', 
							function()
							{
								preview.innerHTML='';
							}, 
							false
						);
					}
				}	
			}

			function refreshPreview( preview, targetTextArea )
			{
				// modification: hide this thing if it's empty...
				if (targetTextArea.value == '') {
					preview.parentNode.style.display = 'none';
				} else {
					preview.parentNode.style.display = 'block';
				}
				preview.innerHTML = converter.makeHtml( targetTextArea.value );
			}

			function addMarkdownEditorToForm( parent, preview ) 
			{	
				var textAreas = parent.getElementsByTagName('textarea');
				
				if ( !textAreas[0] ) return;
				
				var targetTextArea = textAreas[0];
				
				
				var controlBox = document.createElement( 'div' );
				controlBox.setAttribute('class', 'markdownEditor');
				parent.insertBefore( controlBox, parent.firstChild );

				if ((modules['commentPreview'].options.commentingAs.value) && (!(modules['usernameHider'].isEnabled()))) {
					// show who we're commenting as...
					var commentingAs = document.createElement('div');
					commentingAs.setAttribute('class', 'commentingAs');
					commentingAs.innerHTML = 'Commenting as: ' + RESUtils.loggedInUser();
					parent.insertBefore( commentingAs, parent.firstChild );
				}
				
				var bold = new EditControl(
					'<b>Bold</b>',
					function()
					{
						tagSelection( targetTextArea, '**', '**' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var italics = new EditControl(
					'<i>Italic</i>',
					function()
					{
						tagSelection( targetTextArea, '*', '*' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var strikethrough = new EditControl(
					'<del>strike</del>',
					function()
					{
						tagSelection( targetTextArea, '~~', '~~' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var superscript = new EditControl(
					'<sup>sup</sup>',
					function()
					{
						tagSelection( targetTextArea, '^', '' );
						refreshPreview( preview, targetTextArea );
					}
				);

				var link = new EditControl(
					'Link',
					function()
					{
						linkSelection( targetTextArea );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var quote = new EditControl(
					'|Quote',
					function()
					{
						prefixSelectionLines( targetTextArea, '>' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var code = new EditControl(
					'<span style="font-family: Courier New;">Code</span>',
					function()
					{
						prefixSelectionLines( targetTextArea, '    ' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var bullets = new EditControl(
					'&bull;Bullets',
					function()
					{
						prefixSelectionLines( targetTextArea, '* ' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var numbers = new EditControl(
					'1.Numbers',
					function()
					{
						prefixSelectionLines( targetTextArea, '1. ' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var disapproval = new EditControl(
					'&#3232;\_&#3232;',
					function() {
						prefixSelectionLines( targetTextArea, '&#3232;\\\_&#3232;' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				var promoteRES = new EditControl(
					'[Promote]',
					function() {
						prefixSelectionLines( targetTextArea, '[Reddit Enhancement Suite](http://reddit.honestbleeps.com)' );
						refreshPreview( preview, targetTextArea );
					}
				);
				
				controlBox.appendChild( bold.create() );
				controlBox.appendChild( italics.create() );
				controlBox.appendChild( strikethrough.create() );
				controlBox.appendChild( superscript.create() );
				controlBox.appendChild( link.create() );
				controlBox.appendChild( quote.create() );
				controlBox.appendChild( code.create() );
				controlBox.appendChild( bullets.create() );
				controlBox.appendChild( numbers.create() );
				controlBox.appendChild( disapproval.create() );
				controlBox.appendChild( promoteRES.create() );
					
			}

			function EditControl( label, editFunction )
			{
				this.create = function() 
				{
					var link = document.createElement('a');
					link.innerHTML = label;
					link.href = 'javascript:;';
					// link.setAttribute('style','Margin-Right: 15px; text-decoration: none;');
					
					link.execute = editFunction;
					
					addEvent( link, 'click', 'execute' );
					
					return link;	
				}
			}

			function tagSelection( targetTextArea, tagOpen, tagClose, textEscapeFunction )
			{	
				//record scroll top to restore it later.
				var scrollTop = targetTextArea.scrollTop;
				
				//We will restore the selection later, so record the current selection.
				var selectionStart = targetTextArea.selectionStart;
				var selectionEnd = targetTextArea.selectionEnd;
				
				var selectedText = targetTextArea.value.substring( selectionStart, selectionEnd );
				
				//Markdown doesn't like it when you tag a word like **this **. The space messes it up. So we'll account for that because Firefox selects the word, and the followign space when you double click a word.
				var potentialTrailingSpace = '';
				
				if( selectedText[ selectedText.length - 1 ] == ' ' )
				{
					potentialTrailingSpace = ' ';
					selectedText = selectedText.substring( 0, selectedText.length - 1 );
				}
				
				if ( textEscapeFunction )
				{
					selectedText = textEscapeFunction( selectedText );
				}
				
				targetTextArea.value = 
					targetTextArea.value.substring( 0, selectionStart ) + //text leading up to the selection start
					tagOpen + 
					selectedText +
					tagClose + 
					potentialTrailingSpace +
					targetTextArea.value.substring( selectionEnd ); //text after the selection end
				
				targetTextArea.selectionStart = selectionStart + tagOpen.length;
				targetTextArea.selectionEnd = selectionEnd + tagOpen.length;
				
				targetTextArea.scrollTop = scrollTop;
			}

			function linkSelection( targetTextArea )
			{
				var url = prompt( "Enter the URL:", "" );

				if ( url != null )
				{
					tagSelection(
						targetTextArea,
						'[',
						'](' + url.replace( /\(/, '\\(' ).replace( /\)/, '\\)' ) + ')', //escape parens in url
						function( text )
						{
							return text.replace( /\[/, '\\[' ).replace( /\]/, '\\]' ).replace( /\(/, '\\(' ).replace( /\)/, '\\)' ); //escape brackets and parens in text
						}
					);
				}
			}

			function prefixSelectionLines( targetTextArea, prefix )
			{
				var scrollTop = targetTextArea.scrollTop;
				var selectionStart = targetTextArea.selectionStart;
				var selectionEnd = targetTextArea.selectionEnd;
				
				var selectedText = targetTextArea.value.substring( selectionStart, selectionEnd );
				
				var lines = selectedText.split( '\n' );
				
				var newValue = '';
				
				for( var i = 0; i < lines.length; i++ )
				{
					newValue += prefix + lines[i] + '\n';
				}
				
				targetTextArea.value = 
					targetTextArea.value.substring( 0, selectionStart ) + //text leading up to the selection start
					newValue + 
					targetTextArea.value.substring( selectionEnd ); //text after the selection end
				
				targetTextArea.scrollTop = scrollTop;
			}

			//Delegated event wire-up utitlity. Using this allows you to use the "this" keyword in a delegated function.
			function addEvent( target, eventName, handlerName )
			{
				target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
			}

			// Make the stuff we add look pretty!
			RESUtils.addCSS('fieldset.liveComment, fieldset.liveComment legend { border: 1px solid black; border-radius: 1em; -moz-border-radius: 1em; -webkit-border-radius: 1em; }'+
				'fieldset.liveComment { padding: 1ex; margin: 1em 0; }'+
				'fieldset.liveComment legend { padding: 0 1ex; background-color: #E9E9E9; }');

			// Bootstrap with the top-level comment always in the page, and editors for your existing comments.
			wireupExistingCommentEditors();
			
			// Add "view source" buttons
			wireupViewSourceButtons(document);
			
			RESUtils.addCSS('.markdownEditor { white-space: nowrap;  }');
			RESUtils.addCSS('.markdownEditor a { margin-right: 8px; text-decoration: none; font-size: 11px; }');

			// Watch for any future 'reply' forms, or stuff loaded in via "load more comments"...
			document.body.addEventListener(
				'DOMNodeInserted',
				function( event ) {
					if (event.target.tagName == 'FORM') {
						wireupNewCommentEditors( event.target );
					}
					if ((event.target.tagName == 'DIV') && (hasClass(event.target,'thing'))) {
						wireupNewCommentEditors( event.target );
						wireupViewSourceButtons( event.target );
					}
				},
				false
			);
		}
	},
	viewSource: function(ele) {
		if (ele) {
			var permalink = ele.parentNode.parentNode.firstChild.firstChild;
			if (permalink) {
				// check if we've already viewed the source.. if so just reveal it instead of loading...
				var sourceDiv = ele.parentNode.parentNode.previousSibling.querySelector('.viewSource');
				if (sourceDiv) {
					sourceDiv.style.display = 'block';
				} else {
					var jsonURL = permalink.getAttribute('href');
					var sourceLink = 'comment';
					if (hasClass(permalink, 'comments')) {
						sourceLink = 'selftext';
					}
					jsonURL += '/.json';
					this.viewSourceEle = ele;
					this.viewSourceLink = sourceLink;
					
					GM_xmlhttpRequest({
						method:	"GET",
						url:	jsonURL,
						onload:	function(response) {
							var thisResponse = JSON.parse(response.responseText);
							var userTextForm = document.createElement('div');
							addClass(userTextForm,'usertext-edit');
							addClass(userTextForm,'viewSource');
							if (modules['commentPreview'].viewSourceLink == 'comment') {
								sourceText = thisResponse[1].data.children[0].data.body;
								userTextForm.innerHTML = '<div><textarea rows="1" cols="1" name="text">' + sourceText + '</textarea></div><div class="bottom-area"><div class="usertext-buttons"><button type="button" class="cancel">hide</button></div></div>';
							} else {
								sourceText = thisResponse[0].data.children[0].data.selftext;
								userTextForm.innerHTML = '<div><textarea rows="1" cols="1" name="text">' + sourceText + '</textarea></div><div class="bottom-area"><div class="usertext-buttons"><button type="button" class="cancel">hide</button></div></div>';
							}
							var cancelButton = userTextForm.querySelector('.cancel');
							cancelButton.addEventListener('click', modules['commentPreview'].hideSource, false);
							modules['commentPreview'].viewSourceEle.parentNode.parentNode.previousSibling.appendChild(userTextForm);
						}
					});
				}
				
			}
		}
	},
	hideSource: function(e) {
		e.target.parentNode.parentNode.parentNode.style.display = 'none';
	}
};

modules['usernameHider'] = {
	moduleID: 'usernameHider',
	moduleName: 'Username Hider',
	options: {
		displayText: {
			type: 'text',
			value: '~anonymous~',
			description: 'What to replace your username with, default is ~anonymous~'
		}
	},
	description: 'This module hides your real username when you\'re logged in to reddit.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*/i,
		/https?:\/\/reddit.com\/[-\w\.\/]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			var userNameEle = document.querySelector('#header-bottom-right > span > a');
			var thisUserName = userNameEle.text;
			userNameEle.textContent = this.options.displayText.value;
			var authors = document.querySelectorAll('.author');
			for (var i=0, len=authors.length; i<len;i++) {
				if (authors[i].textContent == thisUserName) {
					authors[i].textContent = this.options.displayText.value;
				}
			}
		}
	}
};

modules['showImages'] = {
	moduleID: 'showImages',
	moduleName: 'Inline Image Viewer',
	options: {
		maxWidth: {
			type: 'text',
			value: '640',
			description: 'Max width of image displayed onscreen'
		},
		maxHeight: {
			type: 'text',
			value: '480',
			description: 'Max height of image displayed onscreen'
		},
		openInNewWindow: {
			type: 'boolean',
			value: true,
			description: 'Open images in a new tab/window when clicked?'
		},
		hideNSFW: {
			type: 'boolean',
			value: false,
			description: 'If checked, do not show images with NSFW in the title.'
		},
		imageSize: {
			type: 'enum',
			values: [
				{ name: 'default', value: '' },
				{ name: 'Huge', value: 'h' },
				{ name: 'Large', value: 'l' },
				{ name: 'Medium', value: 'm' },
				{ name: 'Small', value: 't' },
				{ name: 'Big Square', value: 'b' },
				{ name: 'Small Square', value: 's' }
			],
			value: '',
			description: 'imgur only: which imgur size to display inline.'
		},
		autoExpandSelfText: {
			type: 'boolean',
			value: true,
			description: 'When loading selftext from an Aa+ expando, auto reveal images.'
		},
		imageZoom: {
			type: 'boolean',
			value: true,
			description: 'Allow dragging to resize/zoom images.'
		},
		hoverPreview: {
			type: 'boolean',
			value: true,
			description: 'Show thumbnail preview when hovering over expando.'
		}
	},
	description: 'Opens images inline in your browser with the click of a button. Also has configuration options, check it out!',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\_\?=]*/i
	),
	exclude: Array(
		/https?:\/\/([a-z]+).reddit.com\/ads\/[-\w\.\_\?=]*/i,
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*\/submit\/?$/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			
			// Show Images - source originally from Richard Lainchbury - http://userscripts.org/scripts/show/67729
			// Source modified to work as a module in RES, and improved slightly..
			// RESUtils.addCSS(".expando-button.image { float: left; width: 23px; height: 23px; max-width: 23px; max-height: 23px; display: inline-block; background-image: url('http://thumbs.reddit.com/t5_2s10b_0.png'); margin-right: 6px; cursor: pointer;  padding: 0px; }");
			RESUtils.addCSS(".expando-button.image { vertical-align:top !important; float: left; width: 23px; height: 23px; max-width: 23px; max-height: 23px; display: inline-block; background-image: url('http://thumbs.reddit.com/t5_2s10b_0.png'); margin-right: 6px; cursor: pointer;  padding: 0px; }");
			RESUtils.addCSS(".expando-button.image.commentImg { float: none; margin-left: 4px; } ");
			RESUtils.addCSS(".expando-button.image.collapsed { background-position: 0px 0px; } ");
			RESUtils.addCSS(".expando-button.image.collapsed:hover { background-position: 0px -24px; } ");
			RESUtils.addCSS(".expando-button.image.expanded { background-position: 0px -48px; } ");
			RESUtils.addCSS(".expando-button.image.expanded:hover { background-position: 0px -72px; } ");
			RESUtils.addCSS(".isGallery { margin-left: 30px; margin-top: 3px; } ");
			RESUtils.addCSS(".madeVisible { clear: both; display: block; overflow: hidden; } ");
			RESUtils.addCSS(".madeVisible a { display: inline-block; overflow: hidden; } ");
			RESUtils.addCSS(".RESImage { float: left; display: block !important;  } ");
			RESUtils.addCSS(".RESClear { clear: both; margin-bottom: 10px;  } ");
			
			
			this.imageList = Array();
			this.imagesRevealed = Array();
			this.flickrImages = Array();

			document.body.addEventListener('DOMNodeInserted', function(event) {
				if (
					((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) ||
					((event.target.tagName == 'FORM') && (event.target.getAttribute('class') == 'usertext'))
				)
				{
					var isSelfText = false;
					if (event.target.tagName == 'FORM') {
						isSelfText = true;
					}
					modules['showImages'].findAllImages(event.target, isSelfText);
					if ((modules['showImages'].allImagesVisible) && (!isSelfText)) {
						modules['showImages'].waitForScan = setInterval(function() {
							if (!(modules['showImages'].scanningForImages)) {
								modules['showImages'].showImages(modules['showImages'].gw, true);
								clearInterval(modules['showImages'].waitForScan);
							}
						}, 100);
					}
				}
			}, true);
			
			// create a div for the thumbnail tooltip...
			RESUtils.addCSS('#RESThumbnailToolTip { display: none; position: absolute; border: 2px solid gray; z-index: 9999; }');
			modules['showImages'].toolTip = createElementWithID('div','RESThumbnailToolTip');
			document.body.appendChild(modules['showImages'].toolTip);
			
			
			// this.imguReddit();
			this.createImageButtons();
			this.findAllImages();
			document.addEventListener('dragstart',function(){return false}, false);
		}
	},
	getDragSize: function(e){
		return (p=Math.pow)(p(e.clientX-(rc=e.target.getBoundingClientRect()).left,2)+p(e.clientY-rc.top,2),.5)
	},
	createImageButtons: function() {
		if (location.href.match(/search\?\/?q\=/)) {
			var hbl = document.body.querySelector('#header-bottom-left');
			if (hbl) {
				var mainmenuUL = document.createElement('ul');
				mainmenuUL.setAttribute('class','tabmenu');
				hbl.appendChild(mainmenuUL);
			}
		} else {
			var mainmenuUL = document.body.querySelector('#header-bottom-left ul.tabmenu');
		}
		
		if (mainmenuUL) {

			var li = document.createElement('li');
			var a = document.createElement('a');
			var text = document.createTextNode('scanning for images...');
			this.scanningForImages = true;

			a.setAttribute('href','javascript:void(0);');
			a.setAttribute('id','viewImagesButton');
			a.addEventListener('click', function(e) {
				e.preventDefault();
				if (!(modules['showImages'].scanningForImages)) {
					modules['showImages'].showImages();
				}
			}, true);
			a.appendChild(text);
			li.appendChild(a);
			mainmenuUL.appendChild(li);
			this.viewButton = a;
			this.gw = '';

			var commentsre = new RegExp(/comments\/[-\w\.\/]/i);
			if (!(commentsre.test(location.href)) && (window.location.href.indexOf('gonewild')>=0)){
				var li = document.createElement('li');
				var a = document.createElement('a');
				var text = document.createTextNode('[m]');
				a.setAttribute('href','javascript:void(0);');
				a.addEventListener('click', function(e) {
					e.preventDefault();
					modules['showImages'].gw = 'm';
					modules['showImages'].showImages('m');
				}, true);
				a.appendChild(text);
				li.appendChild(a);
				mainmenuUL.appendChild(li);

				var li = document.createElement('li');
				var a = document.createElement('a');
				var text = document.createTextNode('[f]');
				a.setAttribute('href','javascript:void(0);');
				a.addEventListener('click', function(e) {
					e.preventDefault();
					modules['showImages'].gw = 'f';
					modules['showImages'].showImages('f');
				}, true);
				a.appendChild(text);
				li.appendChild(a);
				mainmenuUL.appendChild(li);
			}
		}
	
	},
	updateImageButtons: function(imgCount) {
		if ((typeof(this.viewButton) != 'undefined')) {
			if (this.allImagesVisible) {
				this.viewButton.innerHTML = 'hide images ('+imgCount+')';
			} else {
				this.viewButton.innerHTML = 'view images ('+imgCount+')';
			}
		}
	},
	findImages: function(gonewild, showmore) {
		switch (gonewild) {
			case 'f':
				re = new RegExp(/[\[\{\<\(](f|fem|female)[\]\}\>\)]/i);
				break;
			case 'm':
				re = new RegExp(/[\[\{\<\(](m|man|male)[\]\}\>\)]/i);
				break;
		}
		if (this.options.hideNSFW.value) {
			re = new RegExp(/nsfw/i);
		}
		for(var i=0, len=this.imageList.length;i<len;i++) {
			var href= this.imageList[i].getAttribute("href").toLowerCase();
			var checkhref = href.toLowerCase();
			var title_text=this.imageList[i].text;
			(gonewild) ? titleMatch = re.test(title_text) : titleMatch = false;
			var NSFW = false;
			if (this.options.hideNSFW.value) {
				NSFW = re.test(title_text);
			}
			var isImgur = (checkhref.indexOf('imgur.com')>=0);
			var isFlickr = ((checkhref.indexOf('flickr.com')>=0) && (checkhref.indexOf('/sets/') == -1));
			var isMinus = ((checkhref.indexOf('min.us')>=0) && (checkhref.indexOf('blog.') == -1));
			var isQkme = (checkhref.indexOf('qkme.me')>=0) || (checkhref.indexOf('quickmeme.com')>=0);
			if (href && (gonewild == '' || titleMatch) && (!NSFW) && (href.indexOf('wikipedia.org/wiki') < 0) && (isImgur || isFlickr || isMinus || isQkme || href.indexOf('imgur.')>=0 || href.indexOf('.jpeg')>=0 || href.indexOf('.jpg')>=0 || href.indexOf('.gif')>=0 || href.indexOf('.png')>=0)) {
				if (hasClass(this.imageList[i].parentNode,'title')) {
					var targetImage = this.imageList[i].parentNode.nextSibling
				} else {
					var targetImage = this.imageList[i].nextSibling
				}
				this.revealImage(targetImage, showmore);
			}
		}
	},
	imgurType: function(url) {
		// Detect the type of imgur link
		// Direct image link?  http://i.imgur.com/0ZxQF.jpg
		// imgur "page" link?  http://imgur.com/0ZxQF
		// imgur "gallery"?    ??????????
		var urlPieces = url.split('?');
		var cleanURL = urlPieces[0];
		var directImg = /i.imgur.com\/[\w]+\.[\w]+/gi;
		var imgPage = /imgur.com\.[\w+]$/gi;
	},
	findAllImages: function(ele, isSelfText) {
		this.scanningForImages = true;
		if (ele == null) {
			ele = document.body;
		}
		// get elements common across all pages first...
		// if we're on a comments page, get those elements too...
		var commentsre = new RegExp(/comments\/[-\w\.\/]/i);
		var userre = new RegExp(/user\/[-\w\.\/]/i);
		this.scanningSelfText = false;
		if ((commentsre.test(location.href)) || (userre.test(location.href))) {
			this.allElements = ele.querySelectorAll('#siteTable A.title, .expando .usertext-body > div.md a, .content .usertext-body > div.md a');
		} else if (isSelfText) {
			// We're scanning newly opened (from an expando) selftext...
			this.allElements = ele.querySelectorAll('.usertext-body > div.md a');
			this.scanningSelfText = true;
		} else {
			this.allElements = ele.querySelectorAll('#siteTable A.title');
		}
		// make an array to store any links we've made calls to for the imgur API so we don't do any multiple hits to it.
		this.imgurCalls = new Array();
		this.minusCalls = new Array();
		// this.allElements contains all link elements on the page - now let's filter it for images...
		this.imgurHashRe = /^http:\/\/[i.]*imgur.com\/([\w]+)(\..+)?$/i;
		// this.imgurAlbumRe = /^http:\/\/[i.]*imgur.com\/a\/([\w]+)(\..+)?$/i;
		this.minusHashRe = /^http:\/\/min.us\/([\w]+)(?:#[\d+])?$/i;
		this.qkmeHashRe = /^http:\/\/(?:www.quickmeme.com\/meme|qkme.me)\/([\w]+)\/?/i;
		var groups = Array();
		this.allElementsCount=this.allElements.length;
		this.allElementsi = 0;
		if (RESUtils.pageType() == 'comments') {
			(function(){
				// we're on a comments page which is more intense, so just scan 15 links at a time...
				var chunkLength = Math.min((modules['showImages'].allElementsCount - modules['showImages'].allElementsi), 15);
				for (var i=0;i<chunkLength;i++) {
					modules['showImages'].checkElementForImage(modules['showImages'].allElementsi);
					modules['showImages'].allElementsi++;
				}
				if (modules['showImages'].allElementsi < modules['showImages'].allElementsCount) {
					setTimeout(arguments.callee, 1000);
				} else {
					modules['showImages'].scanningSelfText = false;
					modules['showImages'].scanningForImages = false;
					modules['showImages'].updateImageButtons(modules['showImages'].imageList.length);
				}
			})();		
		} else {
			var chunkLength = modules['showImages'].allElementsCount;
			for (var i=0;i<chunkLength;i++) {
				modules['showImages'].checkElementForImage(modules['showImages'].allElementsi);
				modules['showImages'].allElementsi++;
			}
			modules['showImages'].scanningSelfText = false;
			modules['showImages'].scanningForImages = false;
			modules['showImages'].updateImageButtons(modules['showImages'].imageList.length);
		}
	},
	checkElementForImage: function(index) {
		ele = this.allElements[index];
		var href = ele.getAttribute('href');
		var checkhref = href.toLowerCase();
		// the this.scanningSelfText variable is set as true when we're scanning newly loaded selfText via an expando...
		// this is done so that we do not do the RES ignored duplicate image thing, because when you close a selfText expando,
		// reddit completely deletes it from the DOM instead of just hiding it, so re-opening it causes a total rescan.
		if (((!(hasClass(ele,'imgScanned'))) && (typeof(this.imagesRevealed[href]) == 'undefined') && (href != null)) || this.scanningSelfText) {
			addClass(ele,'imgScanned');
			this.imagesRevealed[href] = true;
			isImgur = (checkhref.indexOf('imgur.com')>=0);
			isFlickr = ((href.indexOf('flickr.com')>=0) && (href.indexOf('/sets/') == -1));
			isMinus = ((checkhref.indexOf('min.us')>=0) && (checkhref.indexOf('blog.') == -1));
			isQkme = (checkhref.indexOf('qkme.me')>=0) || (checkhref.indexOf('quickmeme.com')>=0);
			if (!(ele.getAttribute('scanned') == 'true') && (checkhref.indexOf('wikipedia.org/wiki') < 0) && (isImgur || isFlickr || isMinus || isQkme || checkhref.indexOf('.jpeg')>=0 || checkhref.indexOf('.jpg')>=0 || checkhref.indexOf('.gif')>=0 || checkhref.indexOf('.png')>=0)) {
				if (isImgur) {
					// if it's not a full (direct) imgur link, get the relevant data and append it... otherwise, go now!
					// first, kill any URL parameters that screw with the parser, like ?full.
					var splithref = href.split('?');
					href = splithref[0];
					var orighref = href;
					if ((this.options.imageSize.value != null) && (this.options.imageSize.value != '')) { 
						splithref = href.split('.');
						if ((splithref[splithref.length-1] == 'jpg') || (splithref[splithref.length-1] == 'jpeg') || (splithref[splithref.length-1] == 'png') || (splithref[splithref.length-1] == 'gif'))  {
							splithref[splithref.length-2] += this.options.imageSize.value;
							href = splithref.join('.');
						}
					}
					ele.setAttribute('href',href);
					// now, strip the hash off of it so we can make an API call if need be
					var groups = this.imgurHashRe.exec(href);
					// if we got a match, but we don't have a file extension, hit the imgur API for that info
					if (groups && !groups[2]) {
						var apiURL = 'http://api.imgur.com/2/image/'+groups[1]+'.json';
						// avoid making duplicate calls from the same page... want to minimize hits to imgur API
						if (typeof(this.imgurCalls[apiURL]) == 'undefined') {
							// store the object we want to modify when the json request is finished...
							this.imgurCalls[apiURL] = ele;
							GM_xmlhttpRequest({ 
								method: 'GET', 
								url: apiURL,
								onload: function(response) {
									var json = JSON.parse(response.responseText);
									if (json.image.links.original) {
										if (typeof(modules['showImages'].imgurCalls[apiURL]) != 'undefined') {
											modules['showImages'].imgurCalls[apiURL].setAttribute('href',json.image.links.original);
										}
									}
								}
							});
						}
					} 
					if (groups) this.createImageExpando(ele);
				} else if (isMinus) {
					var splithref = href.split('?');
					href = splithref[0];
					var getExt = href.split('.');
					var ext = '';
					if (getExt.length > 1) {
						ext = getExt[getExt.length-1].toLowerCase();
					} 
					if ((ext != 'jpg') && (ext != 'jpeg') && (ext != 'gif') && (ext != 'png')) {
						var orighref = href;
						var groups = this.minusHashRe.exec(href);
						if (groups && !groups[2]) {
							var imgHash = groups[1];
							var apiURL = 'http://min.us/api/GetItems/' + imgHash;
							if (typeof(this.minusCalls[apiURL]) == 'undefined') {
								this.minusCalls[apiURL] = ele;
								GM_xmlhttpRequest({ 
									method: 'GET', 
									url: apiURL,
									onload: function(response) {
										var json = JSON.parse(response.responseText);
										var firstImg = json.ITEMS_GALLERY[0];
										var imageString = json.ITEMS_GALLERY.join(' ');
										modules['showImages'].minusCalls[apiURL].setAttribute('minusgallery',imageString);
									}
								});
							}
						}
					} 
					this.createImageExpando(ele);
				} else if (isFlickr) {
					// Check to make sure we don't already have an expando... Reddit creates them for videos.
					var videoExpando = ele.parentNode.parentNode.querySelector('DIV.video');
					if (videoExpando == null) {
						this.createImageExpando(ele);
					}
				} else if (isQkme) {
					var groups = this.qkmeHashRe.exec(href);
					if (groups) {
						ele.setAttribute('href','http://i.qkme.me/'+groups[1]+'.jpg');
						this.createImageExpando(ele);
					}
				} else {
					this.createImageExpando(ele);
				}
			}
		} else if (!(hasClass(ele,'imgFound'))) {
			if (!(ele.getAttribute('scanned') == 'true') && (checkhref.indexOf('wikipedia.org/wiki') < 0) && (checkhref.indexOf('imgur.')>=0 || checkhref.indexOf('.jpeg')>=0 || checkhref.indexOf('.jpg')>=0 || checkhref.indexOf('.gif')>=0)) {
				var textFrag = document.createTextNode(' [RES ignored duplicate image]');
				insertAfter(ele, textFrag);
			}
		}
	},
	createImageExpando: function(obj) {
		addClass(obj,'imgFound');
		obj.setAttribute('scanned','true');
		this.imageList.push(obj);
		var thisExpandLink = document.createElement('a');
		thisExpandLink.setAttribute('class','toggleImage expando-button image');
		// thisExpandLink.innerHTML = '[show img]';
		thisExpandLink.innerHTML = '&nbsp;';
		removeClass(thisExpandLink, 'expanded');
		addClass(thisExpandLink, 'collapsed');
		thisExpandLink.addEventListener('click', function(e) {
			e.preventDefault();
			var isCollapsed = hasClass(e.target, 'collapsed') != null;
			modules['showImages'].revealImage(e.target, isCollapsed);
		}, true);
		if (hasClass(obj.parentNode,'title')) {
			var nodeToInsertAfter = obj.parentNode;
			addClass(thisExpandLink, 'linkImg');
			if (this.options.hoverPreview.value) {
				thisExpandLink.addEventListener('mouseover', function(e) {
					e.preventDefault();
					modules['showImages'].thumbnailTarget = e.target;
					modules['showImages'].toolTipTimer = setTimeout(modules['showImages'].showThumbnail, 1000);
				}, false);
				thisExpandLink.addEventListener('mouseout', function(e) {
					e.preventDefault();
					clearTimeout(modules['showImages'].toolTipTimer);
					modules['showImages'].hideThumbnail();
				}, false);
			}
		} else {
			var nodeToInsertAfter = obj;
			addClass(thisExpandLink, 'commentImg');
		}
		insertAfter(nodeToInsertAfter, thisExpandLink);
		if (this.scanningSelfText && this.options.autoExpandSelfText.value) {
			this.revealImage(thisExpandLink, true);
		}
	},
	showThumbnail: function() {
		var gpClass = modules['showImages'].thumbnailTarget.parentNode.parentNode.getAttribute('class');
		// console.log(gpClass);
		var idRe = /id-([\w]+)/;
		var match = idRe.exec(gpClass);
		if (match && (typeof(match[1]) != 'undefined')) {
			thisXY=RESUtils.getXYpos(modules['showImages'].thumbnailTarget);
			// console.log(thisXY.x);
			thisXY.x += 30;
			// console.log(thisXY.x);
			modules['showImages'].toolTip.innerHTML = '<img src="http://thumbs.reddit.com/'+match[1]+'.png">';
			// console.log('top: ' + thisXY.y + 'px; left: ' + thisXY.x + 'px;');
			modules['showImages'].toolTip.setAttribute('style', 'top: ' + thisXY.y + 'px; left: ' + thisXY.x + 'px;');
			RESUtils.fadeElementIn(modules['showImages'].toolTip, 0.3);
		}
	},
	hideThumbnail: function(e) {
		if (modules['showImages'].toolTip.getAttribute('isfading') != 'in') {
			RESUtils.fadeElementOut(modules['showImages'].toolTip, 0.3);
		} else {
			// image is in the middle of fading in... try again in 200ms and fade it out after it's done fading in.
			setTimeout(modules['showImages'].hideThumbnail, 200);
		}
	},
	revealImage: function(showLink, showhide) {
		clearTimeout(modules['showImages'].toolTipTimer);
		this.hideThumbnail();
		// showhide = false means hide, true means show!
		if (hasClass(showLink, 'commentImg')) {
			var thisImageLink = showLink.previousSibling;
			var imageCheck = showLink.nextSibling;
		} else {
			var thisImageLink = showLink.parentNode.firstChild.firstChild;
			var imageCheck = showLink.parentNode.lastChild;
		}
		// Check if the next sibling is an image. If so, we've already revealed that image.
		if ((typeof(imageCheck) != 'undefined') && (imageCheck != null) && (typeof(imageCheck.tagName) != 'undefined') && (hasClass(imageCheck, 'madeVisible'))) {
			// if ((showhide != true) && (imageCheck.style.display != 'none')) {
			if (showhide != true) {
				imageCheck.style.display = 'none';
				removeClass(showLink, 'expanded');
				addClass(showLink, 'collapsed');
			} else {
				imageCheck.style.display = 'block';
				removeClass(showLink, 'collapsed');
				addClass(showLink, 'expanded');
			}
		} else {
			// we haven't revealed this image before. Load it in.
			var href = thisImageLink.getAttribute('href');
			var orighref = href;
			var ext = (href.indexOf('imgur.')>=0 && href.indexOf('.jpg')<0 && href.indexOf('.png')<0 && href.indexOf('.gif')<0) ? '.jpg' :'';
			if ((this.options.imageSize.value != null) && (this.options.imageSize.value != '') && (href.indexOf('imgur.com') != -1)) {
				var repString = this.options.imageSize.value + '.' + ext;
				orighref = href.replace(repString, '.'+ext);
			}
			var img = document.createElement('div');
			img.setAttribute('class','madeVisible');
			var imgA = document.createElement('a');
			if (this.options.openInNewWindow.value) {
				imgA.setAttribute('target','_blank');
			}
			imgA.setAttribute('href',orighref);
			img.appendChild(imgA);
			if (thisImageLink.getAttribute('minusGallery') != null) {
				var imageList = thisImageLink.getAttribute('minusGallery').split(' ');
				var imageNum = 0;
				var hashTest = thisImageLink.getAttribute('href').split('#');
				if (hashTest.length > 1) {
					imageNum = hashTest[1] - 1;
				}
				var href = imageList[imageNum];
				// if the min.us gallery is empty, the image was deleted.. show a placeholder..
				if (href == '') href = 'http://i.min.us/ibmYy2.jpg';
				imgA.innerHTML = '<img class="RESImage" style="max-width:'+this.options.maxWidth.value+'px; max-height:'+this.options.maxHeight.value+'px;" src="' + href + ext + '" /><div class="isGallery">[this is the first image in a gallery - click for more]</div>';
				var imgTag = img.querySelector('IMG');
				this.makeImageZoomable(imgTag);
			} else if (href.indexOf('www.flickr.com') >= 0) {
				this.flickrImages[href] = img;
				GM_xmlhttpRequest({
					method:	"GET",
					url:	href,
					onload:	function(response) {
						var thisHTML = response.responseText;
						var tempDiv = document.createElement(tempDiv);
						// This regex has been commented out because it slows Opera WAY down...
						// It's there as a security check to kill out any script tags... but for now it's not known to cause any problems if we leave it, so we will.
						// tempDiv.innerHTML = thisHTML.replace(/<script(.|\s)*?\/script>/g, '');
						tempDiv.innerHTML = thisHTML;
						if (href.indexOf('/sizes') != -1) {
							var flickrImg = tempDiv.querySelector('#allsizes-photo > IMG');
						} else {
							var flickrImg = tempDiv.querySelector('#photo > .photo-div > IMG');
						}
						var flickrStyle = 'display:block;max-width:'+modules['showImages'].options.maxWidth.value+'px;max-height:'+modules['showImages'].options.maxHeight.value+'px;';
						flickrImg.setAttribute('width','');
						flickrImg.setAttribute('height','');
						flickrImg.setAttribute('style',flickrStyle);
						modules['showImages'].flickrImages[href].appendChild(flickrImg);
						var imgTag = img.querySelector('IMG');
						modules['showImages'].makeImageZoomable(imgTag);
					}
				});
			} else {
				imgA.innerHTML = '<img title="drag to resize" class="RESImage" style="max-width:'+this.options.maxWidth.value+'px;max-height:'+this.options.maxHeight.value+'px;" src="' + href + ext + '" />';
				var imgTag = img.querySelector('IMG');
				this.makeImageZoomable(imgTag);
			}
			// var clear = document.createElement('div');
			// clear.setAttribute('class','RESclear');
			if (hasClass(showLink, 'commentImg')) {
				insertAfter(showLink, img);
			} else {
				showLink.parentNode.appendChild(img);
			}
			// insertAfter(showLink, img);
			// insertAfter(img, clear);
			removeClass(showLink, 'collapsed');
			addClass(showLink, 'expanded');
		}
	},
	makeImageZoomable: function(imgTag) {
		if (this.options.imageZoom.value) {
			// Add listeners for drag to resize functionality...
			imgTag.addEventListener('mousedown', function(e) {
				if (e.button == 0) {
					modules['showImages'].dragTargetData.iw=e.target.width;
					modules['showImages'].dragTargetData.d=modules['showImages'].getDragSize(e);
					modules['showImages'].dragTargetData.dr=false;
					e.preventDefault();
				}
			}, true);
			imgTag.addEventListener('mousemove', function(e) {
				if (modules['showImages'].dragTargetData.d){
					e.target.style.maxWidth=e.target.style.width=((modules['showImages'].getDragSize(e))*modules['showImages'].dragTargetData.iw/modules['showImages'].dragTargetData.d)+"px";
					e.target.style.maxHeight='';
					e.target.style.height='auto';
					modules['showImages'].dragTargetData.dr=true;
				}
			}, false);
			imgTag.addEventListener('mouseout', function(e) {
				modules['showImages'].dragTargetData.d=false;
				if (modules['showImages'].dragTargetData.dr) return false;
			}, false);
			imgTag.addEventListener('mouseup', function(e) {
				modules['showImages'].dragTargetData.d=false;
				if (modules['showImages'].dragTargetData.dr) return false;
			}, false);
			imgTag.addEventListener('click', function(e) {
				modules['showImages'].dragTargetData.d=false;
				if (modules['showImages'].dragTargetData.dr) {
					e.preventDefault();
					return false;
				}
			}, false);
		}
	},
	dragTargetData: {},
	showImages: function(gonewild, showmore) {
		if ((this.allImagesVisible) && (!(showmore))) {
			// Images are visible, and this request didn't come from never ending reddit, so hide the images...
			// (if it came from NER, we'd want to make the next batch also visible...)
			this.allImagesVisible = false;
			var imageList = document.body.querySelectorAll('.madeVisible');
			for (var i=0, len=this.imageList.length;i<len;i++) {
				if (typeof(imageList[i]) != 'undefined') {
					if (hasClass(imageList[i],'commentImg')) {
						var targetExpando = imageList[i].previousSibling;
					} else {
						var targetExpando = imageList[i].parentNode.firstChild.nextSibling;
					}
					this.revealImage(targetExpando, false);
				}
			}
			this.viewButton.innerHTML = 'view images ('+this.imageList.length+')';
			return false;
		} else {
			this.allImagesVisible = true;
			this.viewButton.innerHTML = 'hide images ('+this.imageList.length+')';
			var gw = gonewild || '';
			this.findImages(gw, true);
		}
	}
};

modules['showKarma'] = {
	moduleID: 'showKarma',
	moduleName: 'Show Comment Karma',
	options: {
		separator: {
			type: 'text',
			value: '\u00b7',
			description: 'Separator character between post/comment karma'
		}
	},
	description: 'Shows your comment karma next to your link karma.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/.*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			var thisUserName = RESUtils.userName;
			GM_xmlhttpRequest({
				method:	"GET",
				url:	location.protocol + "//www.reddit.com/user/" + thisUserName + "/about.json",
				onload:	function(response) {
					var thisResponse = JSON.parse(response.responseText);
					var karmaDiv = document.querySelector("#header-bottom-right > .user b");
					if ((typeof(karmaDiv) != 'undefined') && (karmaDiv != null)) {
						karmaDiv.innerHTML += " " + modules['showKarma'].options.separator.value + " " + thisResponse.data.comment_karma;
					}
				}
			});
		}
	}
};

modules['hideChildComments'] = {
	moduleID: 'hideChildComments',
	moduleName: 'Hide All Child Comments',
	options: {
		// any configurable options you have go here...
		// options must have a type and a value.. 
		// valid types are: text, boolean (if boolean, value must be true or false)
		// for example:
		automatic: {
			type: 'boolean',
			value: false,
			description: 'Automatically hide all but parent comments, or provide a link to hide them all?'
		}
	},
	description: 'Allows you to hide all comments except for replies to the OP for easier reading.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			var toggleButton = document.createElement('li');
			this.toggleAllLink = document.createElement('a');
			this.toggleAllLink.innerHTML = 'hide all child comments';
			this.toggleAllLink.setAttribute('action','hide');
			this.toggleAllLink.setAttribute('href','javascript:void(0);');
			this.toggleAllLink.setAttribute('title','Show only replies to original poster.');
			this.toggleAllLink.addEventListener('click', function() {
				modules['hideChildComments'].toggleComments(this.getAttribute('action'));
				if (this.getAttribute('action') == 'hide') {
					this.setAttribute('action','show');
					this.setAttribute('title','Show all comments.');
					this.innerHTML = 'show all child comments';
				} else {
					this.setAttribute('action','hide');
					this.setAttribute('title','Show only replies to original poster.');
					this.innerHTML = 'hide all child comments';
				}
			}, true);
			toggleButton.appendChild(this.toggleAllLink);
			var commentMenu = document.querySelector('ul.buttons');
			if (commentMenu) {
				commentMenu.appendChild(toggleButton);
				var rootComments = document.querySelectorAll('div.commentarea > div.sitetable > div.thing > div.child > div.listing');
				for (var i=0, len=rootComments.length; i<len; i++) {
					var toggleButton = document.createElement('li');
					var toggleLink = document.createElement('a');
					toggleLink.innerHTML = 'hide child comments';
					toggleLink.setAttribute('action','hide');
					toggleLink.setAttribute('href','javascript:void(0);');
					toggleLink.setAttribute('class','toggleChildren');
					toggleLink.setAttribute('title','Hide child comments.');
					toggleLink.addEventListener('click', function(e) {
						modules['hideChildComments'].toggleComments(this.getAttribute('action'), this);
						if (this.getAttribute('action') == 'hide') {
							this.setAttribute('action','show');
							this.setAttribute('title','show child comments.');
							this.innerHTML = 'show child comments';
						} else {
							this.setAttribute('action','hide');
							this.setAttribute('title','hide child comments.');
							this.innerHTML = 'hide child comments';
						}
					}, true);
					toggleButton.appendChild(toggleLink);
					var sib = rootComments[i].parentNode.previousSibling;
					if (typeof(sib) != 'undefined') {
						var sibMenu = sib.querySelector('ul.buttons');
						if (sibMenu) sibMenu.appendChild(toggleButton);
					}
				}
				if (this.options.automatic.value) {
					RESUtils.click(this.toggleAllLink);
				}
			}
		}
	},
	toggleComments: function(action, obj) {
		if (obj) {
			var thisChildren = obj.parentNode.parentNode.parentNode.parentNode.nextSibling.firstChild;
			if (thisChildren.tagName == 'FORM') thisChildren = thisChildren.nextSibling;
			(action == 'hide') ? thisChildren.style.display = 'none' : thisChildren.style.display = 'block';
		} else {
			// toggle all comments
			var commentContainers = document.querySelectorAll('div.commentarea > div.sitetable > div.thing');
			for (var i=0, len=commentContainers.length; i<len; i++) {
				var thisChildren = commentContainers[i].querySelector('div.child > div.sitetable');
				var thisToggleLink = commentContainers[i].querySelector('a.toggleChildren');
				if (thisToggleLink != null) {
					if (action == 'hide') {
						if (thisChildren != null) {
							thisChildren.style.display = 'none' 
						}
						thisToggleLink.innerHTML = 'show child comments';
						thisToggleLink.setAttribute('title','show child comments');
						thisToggleLink.setAttribute('action','show');
					} else {
						if (thisChildren != null) {
							thisChildren.style.display = 'block';
						}
						thisToggleLink.innerHTML = 'hide child comments';
						thisToggleLink.setAttribute('title','hide child comments');
						thisToggleLink.setAttribute('action','hide');
					}
				}
			}
		}
	}
};

modules['showParent'] = {
	moduleID: 'showParent',
	moduleName: 'Show Parent on Hover',
	options: {
	},
	description: 'Shows parent comment when hovering over the "parent" link of a comment.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			
			// code included from http://userscripts.org/scripts/show/34362
			// author: lazyttrick - http://userscripts.org/users/20871

			this.wireUpParentLinks();
			// Watch for any future 'reply' forms.
			document.body.addEventListener(
				'DOMNodeInserted',
				function( event ) {
					if ((event.target.tagName == 'DIV') && (hasClass(event.target,'thing'))) {
						modules['showParent'].wireUpParentLinks(event.target);
					}
				},
				false
			);
			
		}
	},
	show: function (evt) {
		var href = evt.target.getAttribute('href');
		href = href.replace(location.href,'');
		var id = href.replace(/\#/,"");
		var top = parseInt(evt.pageY,10)+10, 
			left = parseInt(evt.pageX,10)+10;
		try{
			// var div = createElement('div', {id:"parentComment"+id, class: "comment", style:"position:absolute; top:"+top+"px; left:"+left+"px;"}, null );
			var div = createElementWithID('div','parentComment'+id);
			addClass(div, 'comment');
			var bgFix = '';
			if ((!(modules['styleTweaks'].options.commentBoxes.value)) || (!(modules['styleTweaks'].isEnabled())))  {
				(modules['styleTweaks'].options.lightOrDark.value == 'dark') ? bgFix = 'border: 1px solid #666666; padding: 4px; background-color: #333333;' : bgFix = 'border: 1px solid #666666; padding: 4px; background-color: #FFFFFF;';
			}
			div.setAttribute('style','position:absolute; top:'+top+'px; left:'+left+'px; '+bgFix+';');
			// again, opera doesn't like xpath queries, so... redoing...
			// var query = "//div[contains(@class, 'id-t1_"+id+"')]/div[starts-with(@class,'entry')]";
			// div.innerHTML = modules['showParent'].xp(query)[0].innerHTML.replace(/\<ul\s+class[\s\S]+\<\/ul\>/,"").replace(/\<a[^\>]+>\[-\]\<\/a\>/,'');
			var parentDiv = document.querySelector('div.id-t1_'+id);
			div.innerHTML = parentDiv.innerHTML.replace(/\<ul\s+class[\s\S]+\<\/ul\>/,"").replace(/\<a[^\>]+>\[-\]\<\/a\>/,'');
			modules['showParent'].getTag('body')[0].appendChild(div);
		}catch(e){
			// opera.postError(e);
			// console.log(e);
		}
	},
	hide: function (evt) {
		var href = evt.target.getAttribute('href');
		href = href.replace(location.href,'');
		var id = href.replace(/\#/,"");
		try{
			var div = modules['showParent'].getId("parentComment"+id);
			div.parentNode.removeChild(div);
		}catch(e){
			// console.log(e);
		}
	},
	getId: function (id, parent) {
		if(!parent)
			return document.getElementById(id);
		return parent.getElementById(id);	
	},
	getTag: function (name, parent) {
		if(!parent)
			return document.getElementsByTagName(name);
		return parent.getElementsByTagName(name);
	}, 
	wireUpParentLinks: function (ele) {
		if (ele == null) ele = document;
		var querySelector = '.child ul.flat-list > li:nth-child(2) > a';
		if (ele != document) {
			// console.log(ele);
			// ele = ele.parentNode.parentNode;
			querySelector = 'ul.flat-list > li:nth-child(2) > a';
			var parentLinks = ele.querySelectorAll(querySelector);
			
			for (var i=0, len=parentLinks.length;i<len;i++) {
				parentLinks[i].addEventListener('mouseover', modules['showParent'].show, false);
				parentLinks[i].addEventListener('mouseout', modules['showParent'].hide, false);
			}
		} else {
			this.parentLinks = ele.querySelectorAll(querySelector);
			this.parentLinksCount = this.parentLinks.length;
			this.parentLinksi = 0;
			(function(){
				// add 15 event listeners at a time...
				var chunkLength = Math.min((modules['showParent'].parentLinksCount - modules['showParent'].parentLinksi), 15);
				for (var i=0;i<chunkLength;i++) {
					modules['showParent'].parentLinks[modules['showParent'].parentLinksi].addEventListener('mouseover', modules['showParent'].show, false);
					modules['showParent'].parentLinks[modules['showParent'].parentLinksi].addEventListener('mouseout', modules['showParent'].hide, false);
					modules['showParent'].parentLinksi++;
				}
				if (modules['showParent'].parentLinksi < modules['showParent'].parentLinksCount) {
					setTimeout(arguments.callee, 1000);
				}
			})();		
		}
	}
};

modules['neverEndingReddit'] = {
	moduleID: 'neverEndingReddit',
	moduleName: 'Never Ending Reddit',
	options: {
		// any configurable options you have go here...
		// options must have a type and a value.. 
		returnToPrevPage: {
			type: 'boolean',
			value: true,
			description: 'Return to the page you were last on when hitting "back" button?'
		}
	},
	description: 'Inspired by modules like River of Reddit and Auto Pager - gives you a never ending stream of reddit goodness.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\_\?=]*/i
	),
	exclude: Array(
		/https?:\/\/([a-z]+).reddit.com\/saved\//i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			
			RESUtils.addCSS('#NERModal { display: none; z-index: 999; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; background-color: #333333; opacity: 0.6; }');
			RESUtils.addCSS('#NERContent { display: none; position: absolute; top: 40px; z-index: 1000; width: 720px; background-color: #FFFFFF; color: #000000; padding: 10px; font-size: 12px; }');
			RESUtils.addCSS('#NERFail { width: 95%; height: 30px; font-size: 14px; border: 1px solid #999999; border-radius: 10px 10px 10px 10px; -moz-border-radius: 10px 10px 10px 10px; -webkit-border-radius: 10px 10px 10px 10px; padding: 5px; text-align: center; bgcolor: #f0f3fc; cursor: pointer; }');
			
			// code inspired by River of Reddit, but rewritten from scratch to work across multiple browsers...
			// Original River of Reddit author: reddy kapil
			// Original link to Chrome extension: https://chrome.google.com/extensions/detail/bjiggjllfebckflfdjbimogjieeghcpp
			
			// set the style for our little loader widget
			RESUtils.addCSS('#progressIndicator { width: 95%; height: 30px; font-size: 14px; border: 1px solid #999999; border-radius: 10px 10px 10px 10px; -moz-border-radius: 10px 10px 10px 10px; -webkit-border-radius: 10px 10px 10px 10px; padding: 5px; text-align: center; bgcolor: #f0f3fc; } ');
			// store access to the siteTable div since that's where we'll append new data...
			var stMultiCheck = document.querySelectorAll('#siteTable');
			this.siteTable = stMultiCheck[0];
			// stupid sponsored links create a second div with ID of sitetable (bad reddit! you should never have 2 IDs with the same name! naughty, naughty reddit!)
			if (stMultiCheck.length == 2) {
				// console.log('skipped first sitetable, stupid reddit.');
				this.siteTable = stMultiCheck[1];
			}
			// get the first link to the next page of reddit...
			var nextPrevLinks = document.body.querySelectorAll('.content .nextprev a');
			if (nextPrevLinks.length > 0) {
				var nextLink = nextPrevLinks[nextPrevLinks.length-1];
				if (nextLink) {
					this.nextPageURL = nextLink.getAttribute('href');
					var nextXY=RESUtils.getXYpos(nextLink);
					this.nextPageScrollY = nextXY.y;
				}
				this.attachLoaderWidget();
				
				if (this.options.returnToPrevPage.value) {
					this.attachModalWidget();
					// Set the current page to page 1...
					this.currPage = 1;
					// If there's a page=# value in location.hash, then update the currPage...
					var currPageRe = /#page=([0-9]+)/i;
					var backButtonPageNumber = currPageRe.exec(location.href);
					if (backButtonPageNumber) {
						this.currPage = backButtonPageNumber[1];
						this.loadNewPage(true);
					}
				}
					
				// watch for the user scrolling to the bottom of the page.  If they do it, load a new page.
				window.addEventListener('scroll', function(e) {
					if ((RESUtils.elementInViewport(modules['neverEndingReddit'].progressIndicator)) && (modules['neverEndingReddit'].fromBackButton != true)) {
						modules['neverEndingReddit'].loadNewPage();
					}
					if ((typeof(modules['neverEndingReddit'].navMail) != 'undefined') && (modules['neverEndingReddit'].navMail != null) && (!(RESUtils.elementInViewport(modules['neverEndingReddit'].navMail)))) {
						modules['neverEndingReddit'].showNewMail(true);
					} else {
						modules['neverEndingReddit'].showNewMail(false);
					}
				}, false);
			}
			// hide any next/prev page indicators
			var nextprev = document.body.querySelectorAll('.content p.nextprev');
			for (var i=0, len=nextprev.length;i<len;i++) {
				nextprev[i].style.display = 'none';
			}
			// check if the user has new mail...
			this.navMail = document.body.querySelector('#mail');
			this.NREMail = createElementWithID('a','NREMail');
			this.NREMail.style.position = 'fixed';
			this.NREMail.style.top = '10px';
			this.NREMail.style.right = '10px';
			this.NREMail.style.display = 'none';
			document.body.appendChild(this.NREMail);
			var hasNew = false;
			if ((typeof(this.navMail) != 'undefined') && (this.navMail != null)) {
				hasNew = hasClass(this.navMail,'havemail');
			}
			this.setMailIcon(hasNew);
		}
	},
	setMailIcon: function(newmail) {
		if (newmail) {
			modules['neverEndingReddit'].hasNewMail = true;
			addClass(this.NREMail, 'havemail');
			this.NREMail.setAttribute('href','http://www.reddit.com/message/unread/');
			this.NREMail.setAttribute('alt','new mail!');
			var newMailImg = '/static/mail.png';
			if (modules['styleTweaks'].options.colorBlindFriendly.value) {
				newMailImg = 'http://thumbs.reddit.com/t5_2s10b_5.png';
			}
			this.NREMail.innerHTML = '<img src="'+newMailImg+'" alt="messages">';
		} else {
			modules['neverEndingReddit'].hasNewMail = false;
			addClass(this.NREMail, 'nohavemail');
			this.NREMail.setAttribute('href','http://www.reddit.com/message/inbox/');
			this.NREMail.setAttribute('alt','no new mail');
			this.NREMail.innerHTML = '<img src="/static/mailgray.png" alt="messages">';
		}
	},
	attachModalWidget: function() {
		this.modalWidget = createElementWithID('div','NERModal');
		this.modalWidget.innerHTML = '&nbsp;';
		this.modalContent = createElementWithID('div','NERContent');
		this.modalContent.innerHTML = 'Never Ending Reddit has detected that you are returning from a page that it loaded. Please give us a moment while we reload that content and return you to where you left off.<br><img src="'+RESConsole.loader+'">';
		document.body.appendChild(this.modalWidget);
		document.body.appendChild(this.modalContent);
	},
	attachLoaderWidget: function() {
		// add a widget at the bottom that will be used to detect that we've scrolled to the bottom, and will also serve as a "loading" bar...
		this.progressIndicator = document.createElement('p');
		this.progressIndicator.innerHTML = 'Never Ending Reddit... [scroll or click to activate]';
		this.progressIndicator.id = 'progressIndicator';
		this.progressIndicator.className = 'neverEndingReddit';
		this.progressIndicator.addEventListener('click', modules['neverEndingReddit'].loadNewPage, false);
		insertAfter(this.siteTable, this.progressIndicator);
	},
	loadNewPage: function(fromBackButton, reload) {
		 // console.log('called load new..');
		if (fromBackButton) {
			window.scrollTo(0,0)
			this.fromBackButton = true;
			var thisPageType = RESUtils.pageType()+'.'+RESUtils.currentSubreddit();
			this.nextPageURL = RESStorage.getItem('RESmodules.neverEndingReddit.lastPage.'+thisPageType);
			var leftCentered = Math.floor((window.innerWidth - 720) / 2);
			this.modalWidget.style.display = 'block';
			this.modalContent.style.display = 'block';
			this.modalContent.style.left = leftCentered + 'px';
			// remove the progress indicator early, as we don't want the user to scroll past it on accident, loading more content.
			this.progressIndicator.parentNode.removeChild(modules['neverEndingReddit'].progressIndicator);
		} else {
			this.fromBackButton = false;
		}
		if (this.isLoading != true) {
			this.progressIndicator.removeEventListener('click', modules['neverEndingReddit'].loadNewPage , false);
			this.progressIndicator.innerHTML = '<img src="'+RESConsole.loader+'"> Loading next page...';
			this.isLoading = true;
			// console.log('loading: '+this.nextPageURL);
			GM_xmlhttpRequest({
				method:	"GET",
				url:	this.nextPageURL,
				onload:	function(response) {
					// console.log('loaded.');
					if ((typeof(modules['neverEndingReddit'].progressIndicator.parentNode) != 'undefined') && (modules['neverEndingReddit'].progressIndicator.parentNode != null)) {
						modules['neverEndingReddit'].progressIndicator.parentNode.removeChild(modules['neverEndingReddit'].progressIndicator);
					}
					// drop the HTML we got back into a div...
					var thisHTML = response.responseText;
					var tempDiv = document.createElement('div');
					// clear out any javascript so we don't render it again...
					tempDiv.innerHTML = thisHTML.replace(/<script(.|\s)*?\/script>/g, '');
					// grab the siteTable out of there...
					var newHTML = tempDiv.querySelector('#siteTable');
					// did we find anything?
					if (newHTML) {
						if ((!(modules['neverEndingReddit'].fromBackButton)) && (modules['neverEndingReddit'].options.returnToPrevPage.value)) {
							modules['neverEndingReddit'].currPage++;
							var thisPageType = RESUtils.pageType()+'.'+RESUtils.currentSubreddit();
							RESStorage.setItem('RESmodules.neverEndingReddit.lastPage.'+thisPageType, modules['neverEndingReddit'].nextPageURL);
							location.hash = 'page='+modules['neverEndingReddit'].currPage;
						}
						var stMultiCheck = tempDiv.querySelectorAll('#siteTable');
						// stupid sponsored links create a second div with ID of sitetable (bad reddit! you should never have 2 IDs with the same name! naughty, naughty reddit!)
						if (stMultiCheck.length == 2) {
							// console.log('skipped first sitetable, stupid reddit.');
							newHTML = stMultiCheck[1];
						}
						// check for new mail
						var hasNewMail = tempDiv.querySelector('#mail');
						if ((typeof('hasNewMail') != 'undefined') && (hasClass(hasNewMail,'havemail'))) {
							modules['neverEndingReddit'].setMailIcon(true);
						} else {
							modules['neverEndingReddit'].setMailIcon(false);
						} 
						// load up uppers and downers, if enabled...
						if (modules['uppersAndDowners'].isEnabled()) {
							modules['uppersAndDowners'].applyUppersAndDownersToComments(modules['neverEndingReddit'].nextPageURL);
						}
						// get the new nextLink value for the next page...
						var nextPrevLinks = tempDiv.querySelectorAll('.content .nextprev a');
						var nextLink = nextPrevLinks[nextPrevLinks.length-1];
						modules['neverEndingReddit'].siteTable.appendChild(newHTML);
						modules['neverEndingReddit'].isLoading = false;
						if (nextLink) {
							modules['neverEndingReddit'].nextPageURL = nextLink.getAttribute('href');
							modules['neverEndingReddit'].attachLoaderWidget();
						}
						if ((fromBackButton) && (modules['neverEndingReddit'].options.returnToPrevPage.value)) {
							modules['neverEndingReddit'].modalWidget.style.display = 'none';
							modules['neverEndingReddit'].modalContent.style.display = 'none';
							// window.scrollTo(0,0)
							window.scrollTo(0,modules['neverEndingReddit'].nextPageScrollY);
							modules['neverEndingReddit'].fromBackButton = false;
						}
					} else {
						modules['neverEndingReddit'].isLoading = false;
						var newHTML = createElementWithID('div','NERFail');
						newHTML.innerHTML = 'It appears Reddit is under heavy load or has barfed for some other reason, so Never Ending Reddit couldn\'t load the next page. Click here to try to load the page again.';
						newHTML.addEventListener('click', function(e) {
							modules['neverEndingReddit'].attachLoaderWidget();
							modules['neverEndingReddit'].loadNewPage(false, true);
							e.target.parentNode.removeChild(e.target);
							e.target.innerHTML = 'Loading... or trying, anyway...';
						}, false);
						modules['neverEndingReddit'].siteTable.appendChild(newHTML);
					}
				}
			});
		} else {
			// console.log('load new page ignored');
		}
	},
	showNewMail: function(show) {
		if (show) {
			this.NREMail.style.display = 'block';
		} else {
			this.NREMail.style.display = 'none';
		}
	}
}; 

modules['saveComments'] = {
	moduleID: 'saveComments',
	moduleName: 'Save Comments',
	options: {
		// any configurable options you have go here...
		// options must have a type and a value.. 
		// valid types are: text, boolean (if boolean, value must be true or false)
		// for example:
	},
	description: 'Save Comments allows you to save comments, since reddit doesn\'t!',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*/i
	),
	exclude: Array(
		/https?:\/\/([a-z]+).reddit.com\/user\/[-\w\.\/]*\/?/i,
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*\/submit\/?/i,
		/https?:\/\/([a-z]+).reddit.com\/submit\/?/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			var currURL = location.href;
			var commentsRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*comments\/[-\w\.\/]*/i);
			var savedRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/saved\/?/i);
			if (commentsRegex.test(currURL)) {
				// load already-saved comments into memory...
				this.loadSavedComments();
				this.addSaveLinks();
			} else if (savedRegex.test(currURL)) {
				// load already-saved comments into memory...
				this.loadSavedComments();
				this.addSavedCommentsTab();
				this.drawSavedComments();
				if (location.hash == '#comments') {
					this.showSavedTab('comments');
				}
			} else {
				this.addSavedCommentsTab();
			}
		}
	},
	addSaveLinks: function() {
		this.allComments = document.querySelectorAll('div.commentarea > div.sitetable > div.thing div.entry div.noncollapsed');
		this.allCommentsCount = this.allComments.length;
		this.allCommentsi = 0;
		(function(){
			// add 15 save links at a time...
			var chunkLength = Math.min((modules['saveComments'].allCommentsCount - modules['saveComments'].allCommentsi), 15);
			for (var i=0;i<chunkLength;i++) {
				var thisi = modules['saveComments'].allCommentsi;
				var thisComment = modules['saveComments'].allComments[thisi];
				modules['saveComments'].addSaveLinkToComment(thisComment);
				modules['saveComments'].allCommentsi++;
			}
			if (modules['saveComments'].allCommentsi < modules['saveComments'].allCommentsCount) {
				setTimeout(arguments.callee, 1000);
			}
		})();		
	},
	addSaveLinkToComment: function(commentObj) {
		var commentsUL = commentObj.querySelector('ul.flat-list');
		var permaLink = commentsUL.querySelector('li.first a.bylink');
		if (permaLink != null) {
			// if there's no 'parent' link, then we don't want to put the save link before 'lastchild', we need to move it one to the left..
			// note that if the user is not logged in, there is no next link for first level comments... set to null!
			if (RESUtils.loggedInUser()) {
				if (permaLink.parentNode.nextSibling != null) {
					var nextLink = permaLink.parentNode.nextSibling.firstChild.getAttribute('href');
				} else {
					var nextLink = null;
				}
			} else {
				var nextLink = null;
			}
			var isTopLevel = ((nextLink == null) || (nextLink.indexOf('#') == -1));
			var userLink = commentObj.querySelector('a.author');
			if (userLink != null) {
				var saveUser = userLink.text;
				var saveHREF = permaLink.getAttribute('href');
				var splitHref = saveHREF.split('/');
				var saveID = splitHref[splitHref.length-1];
				var saveLink = document.createElement('li');
				if (typeof(this.storedComments[saveID]) != 'undefined') {
					saveLink.innerHTML = '<a href="/saved#comments">saved</a>';
				} else {
					saveLink.innerHTML = '<a href="javascript:void(0);" class="saveComments">save</a>';
					saveLink.setAttribute('saveID',saveID);
					saveLink.setAttribute('saveLink',saveHREF);
					saveLink.setAttribute('saveUser',saveUser);
					saveLink.addEventListener('click', function(e) {
						e.preventDefault();
						modules['saveComments'].saveComment(this, this.getAttribute('saveID'), this.getAttribute('saveLink'), this.getAttribute('saveUser'));
					}, true);
				}
				var whereToInsert = commentsUL.lastChild;
				if (isTopLevel) whereToInsert = whereToInsert.previousSibling;
				commentsUL.insertBefore(saveLink, whereToInsert);
			}
		}
	},
	loadSavedComments: function() {
		// first, check if we're storing saved comments the old way (as an array)...
		var thisComments = RESStorage.getItem('RESmodules.saveComments.savedComments');
		if (thisComments == null) {
			this.storedComments = {};
		} else {
			this.storedComments = safeJSON.parse(thisComments, 'RESmodules.saveComments.savedComments');
			// console.log(this.storedComments);
			// old way of storing saved comments... convert...
			if (thisComments.slice(0,1) == '[') {
				var newFormat = {};
				for (var i in this.storedComments) {
					var urlSplit = this.storedComments[i].href.split('/');
					var thisID = urlSplit[urlSplit.length-1];
					newFormat[thisID] = this.storedComments[i];
				}
				this.storedComments = newFormat;
				RESStorage.setItem('RESmodules.saveComments.savedComments',JSON.stringify(newFormat));
			} 
		}
	},
	saveComment: function(obj, id, href, username, comment) {
		// loop through comments and make sure we haven't already saved this one...
		if (typeof(this.storedComments[id]) != 'undefined') {
			alert('comment already saved!');
		} else {
			var comment = obj.parentNode.parentNode.querySelector('div.usertext-body > div.md');
			if (comment != null) {
				commentHTML = comment.innerHTML;
				var savedComment = {
					href: href,
					username: username,
					comment: commentHTML,
					timeSaved: Date()
				};
				this.storedComments[id] = savedComment;
				var unsaveObj = document.createElement('li');
				unsaveObj.innerHTML = '<a href="javascript:void(0);">unsave</a>';
				unsaveObj.setAttribute('unsaveID',id);
				unsaveObj.setAttribute('unsaveLink',href);
				unsaveObj.setAttribute('class','saveComments');
				unsaveObj.addEventListener('click', function(e) {
					// e.preventDefault();
					var id = this.getAttribute('unsaveID');
					modules['saveComments'].unsaveComment(id, this);
				}, false);
				obj.parentNode.replaceChild(unsaveObj, obj);
			}
			RESStorage.setItem('RESmodules.saveComments.savedComments', JSON.stringify(this.storedComments));
		}
	},
	addSavedCommentsTab: function() {
		var mainmenuUL = document.body.querySelector('#header-bottom-left ul.tabmenu');
		if (mainmenuUL) {
			var menuItems = mainmenuUL.querySelectorAll('li');
			for (var i=0, len=menuItems.length;i<len;i++) {
				var savedLink = menuItems[i].querySelector('a');
				if ((hasClass(menuItems[i], 'selected')) && (savedLink.href == 'http://www.reddit.com/saved/')) {
					menuItems[i].addEventListener('click', function(e) {
						e.preventDefault();
						modules['saveComments'].showSavedTab('links');
					}, true);
				}
				if (savedLink.href == 'http://www.reddit.com/saved/') {
					this.savedLinksTab = menuItems[i];
					savedLink.innerHTML = 'saved links';
				}
			}
			this.savedCommentsTab = document.createElement('li');
			this.savedCommentsTab.innerHTML = '<a href="javascript:void(0);">saved comments</a>';
			var savedRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/saved\/?/i);
			if (savedRegex.test(location.href)) {
				this.savedCommentsTab.addEventListener('click', function(e) {
					e.preventDefault();
					modules['saveComments'].showSavedTab('comments');
				}, true);
			} else {
				this.savedCommentsTab.addEventListener('click', function(e) {
					e.preventDefault();
					location.href = 'http://www.reddit.com/saved/#comments';
				}, true);
			}
			if (this.savedLinksTab != null) {
				insertAfter(this.savedLinksTab, this.savedCommentsTab);
			}
		}
	},
	showSavedTab: function(tab) {
		switch(tab) {
			case 'links':
				location.hash = 'links';
				this.savedLinksContent.style.display = 'block';
				this.savedCommentsContent.style.display = 'none';
				addClass(this.savedLinksTab, 'selected');
				removeClass(this.savedCommentsTab, 'selected');
				break;
			case 'comments':
				location.hash = 'comments';
				this.savedLinksContent.style.display = 'none';
				this.savedCommentsContent.style.display = 'block';
				removeClass(this.savedLinksTab, 'selected');
				addClass(this.savedCommentsTab, 'selected');
				break;
		}
	},
	drawSavedComments: function() {
		RESUtils.addCSS('.savedComment { padding: 5px; font-size: 12px; margin-bottom: 20px; margin-left: 40px; margin-right: 10px; border: 1px solid #CCCCCC; border-radius: 10px 10px 10px 10px; -moz-border-radius: 10px 10px 10px 10px; -webkit-border-radius: 10px 10px 10px 10px; width: auto; } ');
		RESUtils.addCSS('.savedCommentHeader { margin-bottom: 8px; }');
		RESUtils.addCSS('.savedCommentBody { margin-bottom: 8px; }');
		RESUtils.addCSS('#savedLinksList { margin-top: 10px; }');
		// css += '.savedCommentFooter {  }';
		this.savedLinksContent = document.body.querySelector('BODY > div.content');
		this.savedCommentsContent = createElementWithID('div', 'savedLinksList');
		this.savedCommentsContent.style.display = 'none';
		this.savedCommentsContent.setAttribute('class','sitetable linklisting');
		for (var i in this.storedComments) {
			var clearLeft = document.createElement('div');
			clearLeft.setAttribute('class','clearleft');
			var thisComment = document.createElement('div');
			addClass(thisComment, 'savedComment');
			addClass(thisComment, 'thing entry');
			thisComment.innerHTML = '<div class="savedCommentHeader">Comment by user: ' + this.storedComments[i].username + ' saved on ' + this.storedComments[i].timeSaved + '</div><div class="savedCommentBody">' + this.storedComments[i].comment + '</div>';
			thisComment.innerHTML += '<div class="savedCommentFooter"><ul class="flat-list buttons"><li><a class="unsaveComment" href="javascript:void(0);">unsave</a></li><li><a href="' + this.storedComments[i].href + '">view original</a></li></ul></div>';
			var unsaveLink = thisComment.querySelector('.unsaveComment');
			unsaveLink.setAttribute('unsaveID', i);
			unsaveLink.setAttribute('unsaveLink', this.storedComments[i].href);
			unsaveLink.addEventListener('click', function(e) {
				e.preventDefault();
				modules['saveComments'].unsaveComment(this.getAttribute('unsaveID'));
			}, true);
			this.savedCommentsContent.appendChild(thisComment);
			this.savedCommentsContent.appendChild(clearLeft);
		}
		if (this.storedComments.length == 0) {
			this.savedCommentsContent.innerHTML = '<li>You have not yet saved any comments.</li>';
		}
		insertAfter(this.savedLinksContent, this.savedCommentsContent);
	},
	unsaveComment: function(id, unsaveLink) {
		/*
		var newStoredComments = Array();
		for (var i=0, len=this.storedComments.length;i<len;i++) {
			if (this.storedComments[i].href != href) {
				newStoredComments.push(this.storedComments[i]);
			} else {
				// console.log('found match. deleted comment');
			}
		}
		this.storedComments = newStoredComments;
		*/
		delete this.storedComments[id];
		RESStorage.setItem('RESmodules.saveComments.savedComments', JSON.stringify(this.storedComments));
		if (typeof(this.savedCommentsContent) != 'undefined') {
			this.savedCommentsContent.parentNode.removeChild(this.savedCommentsContent);
			this.drawSavedComments();
			this.showSavedTab('comments');
		} else {
			var commentObj = unsaveLink.parentNode.parentNode;
			unsaveLink.parentNode.removeChild(unsaveLink);
			this.addSaveLinkToComment(commentObj);
		}
	}
};

modules['userHighlight'] = {
	moduleID: 'userHighlight',
	moduleName: 'User Highlighter',
	description: 'Highlights certain users in comment threads: OP, Admin, Friends, Mod - contributed by MrDerk',
	options: { 
		highlightOP: {
			type: 'boolean',
			value: true,
			description: 'Highlight OP\'s comments'
		},
		OPColor: {
			type: 'text',
			value: '#0055DF',
			description: 'Color to use to highlight OP. Defaults to original text color'
		},
		OPColorHover: {
			type: 'text',
			value: '#4E7EAB',
			description: 'Color used to highlight OP on hover.'
		},
		highlightAdmin: {
			type: 'boolean',
			value: true,
			description: 'Highlight Admin\'s comments'
		},
		adminColor: {
			type: 'text',
			value: '#FF0011',
			description: 'Color to use to highlight Admins. Defaults to original text color'
		},
		adminColorHover: {
			type: 'text',
			value: '#B3000C',
			description: 'Color used to highlight Admins on hover.'
		},
		highlightFriend: {
			type: 'boolean',
			value: true,
			description: 'Highlight Friends\' comments'
		},
		friendColor: {
			type: 'text',
			value: '#FF4500',
			description: 'Color to use to highlight Friends. Defaults to original text color'
		},
		friendColorHover: {
			type: 'text',
			value: '#B33000',
			description: 'Color used to highlight Friends on hover.'
		},
		highlightMod: {
			type: 'boolean',
			value: true,
			description: 'Highlight Mod\'s comments'
		},
		modColor: {
			type: 'text',
			value: '#228822',
			description: 'Color to use to highlight Mods. Defaults to original text color'
		},
		modColorHover: {
			type: 'text',
			value: '#134913',
			description: 'Color used to highlight Mods on hover. Defaults to gray.'
		},
		fontColor: {
			type: 'text',
			value: 'white',
			description: 'Color for highlighted text.',
		}
	},
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[\?]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},	
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			if (this.options.highlightFriend.value) {
				var name = 'friend';
				var color = this.options.friendColor.value;
				var hoverColor = this.options.friendColorHover.value;
				this.doHighlight(name,color,hoverColor);
			}
			if (this.options.highlightMod.value) {
				var name = 'moderator';
				var color = this.options.modColor.value;
				var hoverColor = this.options.modColorHover.value;
				this.doHighlight(name,color,hoverColor);
			}
			if (this.options.highlightAdmin.value) {
				var name = 'admin';
				var color = this.options.adminColor.value;
				var hoverColor = this.options.adminColorHover.value;
				this.doHighlight(name,color,hoverColor);
			}
			if (this.options.highlightOP.value) {
				var name = 'submitter';
				var color = this.options.OPColor.value;
				var hoverColor = this.options.OPColorHover.value;
				this.doHighlight(name,color,hoverColor);
			}			
		}
	},
	doHighlight: function(name,color,hoverColor) {
		// First look for .noncollapsed members. If they're there, we have comments
		// If we skip the noncollapsed, we can pick up the gray, collapsed versions
		// If that's the case, you'll end up with gray as your 'default' color
		var firstComment = document.querySelector('.noncollapsed .' + name);
		// This kicks in if a friend/admin/mod has made a post but not a comment, 
		// allowing them to be highlighted at the top of the submission
		if (firstComment === null) { 
			firstComment = document.querySelector('.' + name); 
		}
		if (firstComment != null) {
			if (color === 'default') {
				color = this.getStyle(firstComment, 'color');
			}
			if (hoverColor === 'default') {
				hoverColor = "#AAA";
			}
			if(typeof(color) != "undefined" && color != 'rgb(255, 255, 255)') {
				RESUtils.addCSS("\
				.author." + name + " { \
					color: " + this.options.fontColor.value + " !important; \
					font-weight: bold; \
					padding: 0 2px 0 2px; \
					border-radius: 3px; \
					-moz-border-radius: 3px; \
					-webkit-border-radius: 3px; \
					background-color:" + color + " !important} \
				.collapsed .author." + name + " { \
					color: white !important; \
					background-color: #AAA !important}\
				.author." + name + ":hover {\
					background-color: " + hoverColor + " !important; \
					text-decoration: none !important}");
				// this.addCSS(css);
			}		
		}
	},
	/*addCSS: function(css) {
		// Add CSS Style
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node);
		}
	},*/
	getStyle: function(oElm, strCssRule){
		var strValue = "";
		if(document.defaultView && document.defaultView.getComputedStyle){
			strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
		}
		else if(oElm.currentStyle){
			strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
				return p1.toUpperCase();
			});
			strValue = oElm.currentStyle[strCssRule];
		}
		return strValue;
	}
}; 

modules['styleTweaks'] = {
	moduleID: 'styleTweaks',
	moduleName: 'Style Tweaks',
	description: 'Provides a number of style tweaks to the Reddit interface',
	options: { 
		navTop: {
			type: 'boolean',
			value: true,
			description: 'Moves the username navbar to the top (great on netbooks!)'
		},
		commentBoxes: {
			type: 'boolean',
			value: true,
			description: 'Highlights comment boxes for easier reading / placefinding in large threads.'
		},
		/* REMOVED for performance reasons...
		commentBoxShadows: {
			type: 'boolean',
			value: false,
			description: 'Drop shadows on comment boxes (turn off for faster performance)'
		},
		*/
		commentRounded: {
			type: 'boolean',
			value: true,
			description: 'Round corners of comment boxes'
		},
		commentHoverBorder: {
			type: 'boolean',
			value: false,
			description: 'Highlight comment box hierarchy on hover (turn off for faster performance)'
		},
		commentIndent: {
			type: 'text',
			value: 10,
			description: 'Indent comments by [x] pixels (only enter the number, no \'px\')'
		},
		continuity: {
			type: 'boolean',
			value: false,
			description: 'Show comment continuity lines'
		},
		lightSwitch: {
			type: 'boolean',
			value: true,
			description: 'Enable lightswitch (toggle between light / dark reddit)'
		},
		lightOrDark: {
			type: 'enum',
			values: [
				{ name: 'Light', value: 'light' },
				{ name: 'Dark', value: 'dark' }
			],
			value: 'light',
			description: 'Light, or dark?'
		},
		showExpandos: {
			type: 'boolean',
			value: true,
			description: 'Bring back video and text expando buttons for users with compressed link display'
		},
		colorBlindFriendly: {
			type: 'boolean',
			value: false,
			description: 'Use colorblind friendly styles when possible'
		}
	},
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},	
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			
			// get rid of antequated option we've removed (err, renamed) due to performance issues.
			if (typeof(this.options.commentBoxHover) != 'undefined') {
				delete this.options.commentBoxHover;
				RESStorage.setItem('RESoptions.styleTweaks', JSON.stringify(modules['styleTweaks'].options));
			}
			if (this.options.navTop.value) {
				this.navTop();
			}
			var commentsRegex = new RegExp(/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*comments\/[-\w\.\/]*/i);
			if ((this.options.commentBoxes.value) && (commentsRegex.test(location.href))) {
				this.commentBoxes();
			}
			if (this.options.lightSwitch.value) {
				this.lightSwitch();
			}
			if (this.options.lightOrDark.value == 'dark') {
				this.redditDark();
			}
			if (this.options.colorBlindFriendly.value) {
				var orangered = document.body.querySelector('#mail');
				if (hasClass(orangered, 'havemail')) {
					var img = orangered.firstChild;
					img.setAttribute('src','http://thumbs.reddit.com/t5_2s10b_5.png');
				}
			}
			if (this.options.showExpandos.value) {
				RESUtils.addCSS('.compressed .expando-button { display: block !important; }');
				var twitterLinks = document.body.querySelectorAll('.entry > p.title > a.title');
				var isTwitterLink = /twitter.com\/[^\/]+\/(status|statuses)\/([\d]+)/i;
				for (var i=0, len = twitterLinks.length; i<len; i++) {
					var thisHref = twitterLinks[i].getAttribute('href');
					thisHref = thisHref.replace('/#!','');
					if (isTwitterLink.test(thisHref)) {
						var thisExpandoButton = document.createElement('div');
						thisExpandoButton.setAttribute('class','expando-button collapsed selftext');
						thisExpandoButton.addEventListener('click',modules['styleTweaks'].toggleTweetExpando,false);
						insertAfter(twitterLinks[i].parentNode, thisExpandoButton);
					}
				}
			}
			this.userbarHider();
			this.subredditStyles();
		}
	},
	toggleTweetExpando: function(e) {
		var thisExpando = e.target.nextSibling.nextSibling.nextSibling;
		if (hasClass(e.target,'collapsed')) {
			removeClass(e.target,'collapsed');
			addClass(e.target,'expanded');
			var twitterLink = e.target.previousSibling.firstChild.getAttribute('href');
			twitterLink = twitterLink.replace('/#!','');
			var match = twitterLink.match(/twitter.com\/[^\/]+\/(?:status|statuses)\/([\d]+)/i);
			if (match != null) {
				var jsonURL = 'http://api.twitter.com/1/statuses/show/'+match[1]+'.json';
				if (typeof(chrome) != 'undefined') {
					// we've got chrome, so we need to hit up the background page to do cross domain XHR
					thisJSON = {
						requestType: 'loadTweet',
						url: jsonURL
					}
					chrome.extension.sendRequest(thisJSON, function(response) {
						// send message to background.html 
						var tweet = response;
						thisExpando.innerHTML = '<form class="usertext"><div class="usertext-body"><div class="md"><div><img style="display: block;" src="'+tweet.user.profile_image_url+'"></div>' + tweet.user.screen_name + ': ' + tweet.text + '</div></div></form>';
						thisExpando.style.display = 'block';
					});
				} else if (typeof(safari) != 'undefined') {
					// we've got safari, so we need to hit up the background page to do cross domain XHR
					modules['styleTweaks'].tweetExpando = thisExpando;
					thisJSON = {
						requestType: 'loadTweet',
						url: jsonURL
					}
					safari.self.tab.dispatchMessage("loadTweet", thisJSON);
				} else if (typeof(opera) != 'undefined') {
					// we've got opera, so we need to hit up the background page to do cross domain XHR
					modules['styleTweaks'].tweetExpando = thisExpando;
					thisJSON = {
						requestType: 'loadTweet',
						url: jsonURL
					}
					opera.extension.postMessage(JSON.stringify(thisJSON));
				} else {
					GM_xmlhttpRequest({
						method:	"GET",
						url:	jsonURL,
						target: thisExpando,
						onload:	function(response) {
							var tweet = JSON.parse(response.responseText);
							thisExpando.innerHTML = '<form class="usertext"><div class="usertext-body"><div class="md"><div><img style="display: block;" src="'+tweet.user.profile_image_url+'"></div>' + tweet.user.screen_name + ': ' + tweet.text + '</div></div></form>';
							thisExpando.style.display = 'block';
						}
					});
				}
			}
		} else {
			addClass(e.target,'collapsed');
			removeClass(e.target,'expanded');
			thisExpando.style.display = 'none';
		}
		
	},
	navTop: function() {
		RESUtils.addCSS('#header-bottom-right { top: 20px; border-radius: 0px 0px 0px 7px; -moz-border-radius: 0px 0px 0px 7px; -webkit-border-radius: 0px 0px 0px 7px; bottom: auto;  }');
	},
	userbarHider: function() {
		RESUtils.addCSS("#userbarToggle { width: 7px; height: 11px; display: inline-block; background-image: url('http://thumbs.reddit.com/t5_2s10b_0.png'); cursor: pointer; margin-right: 4px; background-repeat: no-repeat; }");
		RESUtils.addCSS(".userbarHide { background-position: 0px -137px; }");
		RESUtils.addCSS(".userbarShow { background-position: -8px -137px; }");
		var userbar = document.getElementById('header-bottom-right');
		if (userbar) {
			this.userbarToggle = createElementWithID('div','userbarToggle');
			this.userbarToggle.setAttribute('title','Toggle Userbar');
			addClass(this.userbarToggle, 'userbarHide');
			this.userbarToggle.addEventListener('click', function(e) {
				modules['styleTweaks'].toggleUserBar();
			}, false);
			userbar.insertBefore(this.userbarToggle, userbar.firstChild);
			if (RESStorage.getItem('RESmodules.styleTweaks.userbarState') == 'hidden') {
				this.toggleUserBar();
			}
		}
	},
	toggleUserBar: function() {
		var nextEle = this.userbarToggle.nextSibling;
		if (hasClass(this.userbarToggle,'userbarHide')) {
			removeClass(this.userbarToggle,'userbarHide');
			addClass(this.userbarToggle,'userbarShow');
			RESStorage.setItem('RESmodules.styleTweaks.userbarState', 'hidden');
			while ((typeof(nextEle) != 'undefined') && (nextEle != null)) {
				nextEle.style.display = 'none';
				nextEle = nextEle.nextSibling;
			}
		} else {
			removeClass(this.userbarToggle,'userbarShow');
			addClass(this.userbarToggle,'userbarHide');
			RESStorage.setItem('RESmodules.styleTweaks.userbarState', 'visible');
			while ((typeof(nextEle) != 'undefined') && (nextEle != null)) {
				nextEle.style.display = 'inline-block';
				nextEle = nextEle.nextSibling;
			}
		}
	},
	commentBoxes: function() {
		// replaced with a less intensive method... adapted from Reddit Comment Boxes via:
		// @description	  Updated version of Tiby312's Reddit Comment Boxes script (http://userscripts.org/scripts/show/63628) 
		// @author        flatluigi
		

		RESUtils.addCSS(".comment{");
		if (this.options.commentRounded.value) {
			RESUtils.addCSS("	-moz-border-radius:7px !important;"+
				" 	 -webkit-border-radius:7px !important;"+
				" 	 border-radius:7px !important;");
		}
		RESUtils.addCSS("	margin: 0 0 10px 0 !important;"+
		"	background-color:#ffffff !important;"+
		"	border:1px solid #bbbcbf !important;"+
		"	padding: 5px 0 0px 5px !important;"+
		"	overflow: hidden !important;"+				
		"}");
		/* REMOVED for performance reasons...
		if (this.options.commentBoxShadows.value) {
			RESUtils.addCSS('.comment {-webkit-box-shadow: #BBB 2px 2px 0px inset; -moz-box-shadow: #BBB 2px 2px 0px inset; box-shadow: #BBB 2px 2px 0px inset; border:1px solid #DDD; padding-bottom:0px; padding: 4px 5px 4px 4px; margin: 0px 0px 3px; }');
		}
		*/
		if (this.options.continuity.value) {
			RESUtils.addCSS('.comment div.child { border-left: 1px dotted #555555 !important; } ');
		} else {
			RESUtils.addCSS('.comment div.child { border-left: none !important; } ');
		}
		RESUtils.addCSS(".comment .comment{"+
		"	margin: 5px 0 5px 0 !important;"+
		"	background-color:#F7F7F8 !important;"+
		"	padding: 5px 0 0 5px !important;"+		
		"	border-radius: 7px 0 0 7px !important;"+
		"	-moz-border-radius: 7px 0 0 7px !important;"+
		"	-webkit-border-radius: 7px 0 0 7px !important;"+
		"	border-right: none !important;"+	
		"}"+
		".comment .comment .comment{"+
		"	background-color:#ffffff !important;"+	
		"}"+
		".comment .comment .comment .comment{"+
		"	background-color:#F7F7F8 !important;"+	
		"}"+
		".comment .comment .comment .comment .comment{"+
		"	background-color:#ffffff !important;"+	
		"}"+
		".comment .comment .comment .comment .comment .comment{"+
		"	background-color:#F7F7F8 !important;"+	
		"}"+
		".comment .comment .comment .comment .comment .comment .comment{"+
		"	background-color:#ffffff !important;"+	
		"}"+
		".comment .comment .comment .comment .comment .comment .comment .comment{"+
		"	background-color:#F7F7F8 !important;"+	
		"}"+
		".comment .comment .comment .comment .comment .comment .comment .comment .comment{"+
		"	background-color:#ffffff !important;"+	
		"}"+
		".comment .comment .comment .comment .comment .comment .comment .comment .comment .comment{"+
		"	background-color:#F7F7F8 !important;"+	
		"}"+
		/*
		".commentarea, .link, .comment {"+
		"	overflow:hidden; !important;"+
		"}"+
		*/
		"body > .content {"+
		" padding-right:0px; !important;"+
		"}"); 
		if (this.options.commentHoverBorder.value) {
			RESUtils.addCSS(" .comment:hover {border: 1px solid #99AAEE !important; }");
		}
	},
	lightSwitch: function() {
		RESUtils.addCSS("#lightSwitch { width: 24px; height: 11px; display: inline-block; background-image: url('http://thumbs.reddit.com/t5_2s10b_0.png'); cursor: pointer; }");
		RESUtils.addCSS(".lightOn { background-position: 0px -96px; } ");
		RESUtils.addCSS(".lightOff { background-position: 0px -108px; } ");
		var thisFrag = document.createDocumentFragment();
		var separator = document.createElement('span');
		addClass(separator,'separator');
		separator.innerHTML = '|';
		this.lightSwitch = document.createElement('span');
		this.lightSwitch.setAttribute('title',"Toggle night and day");
		this.lightSwitch.addEventListener('click',function(e) {
			e.preventDefault();
			if (hasClass(modules['styleTweaks'].lightSwitch, 'lightOn')) {
				removeClass(modules['styleTweaks'].lightSwitch, 'lightOn');
				addClass(modules['styleTweaks'].lightSwitch, 'lightOff');
				RESUtils.setOption('styleTweaks','lightOrDark','dark');
				modules['styleTweaks'].redditDark();
			} else {
				removeClass(modules['styleTweaks'].lightSwitch, 'lightOff');
				addClass(modules['styleTweaks'].lightSwitch, 'lightOn');
				RESUtils.setOption('styleTweaks','lightOrDark','light');
				modules['styleTweaks'].redditDark(true);
			}
		}, true);
		this.lightSwitch.setAttribute('id','lightSwitch');
		this.lightSwitch.innerHTML = '&nbsp;';
		(this.options.lightOrDark.value == 'dark') ? addClass(this.lightSwitch, 'lightOff') : addClass(this.lightSwitch, 'lightOn');
		thisFrag.appendChild(separator);
		thisFrag.appendChild(this.lightSwitch);
		insertAfter(RESConsole.RESPrefsLink, thisFrag);
	},
	subredditStyles: function() {
		this.ignoredSubReddits = Array();
		var getIgnored = RESStorage.getItem('RESmodules.styleTweaks.ignoredSubredditStyles');
		if (getIgnored) {
			this.ignoredSubReddits = safeJSON.parse(getIgnored, 'RESmodules.styleTweaks.ignoredSubredditStyles');
		}
		this.head = document.getElementsByTagName("head")[0];
		var subredditTitle = document.querySelector('.titlebox h1');
		var styleToggle = document.createElement('div');
		var thisLabel = document.createElement('label');
		addClass(styleToggle,'styleToggle');
		thisLabel.setAttribute('for','subRedditStyleCheckbox');
		thisLabel.innerHTML = 'Use subreddit style ';
		styleToggle.appendChild(thisLabel);
		this.styleToggleCheckbox = document.createElement('input');
		this.styleToggleCheckbox.setAttribute('type','checkbox');
		this.styleToggleCheckbox.setAttribute('name','subRedditStyleCheckbox');
		this.curSubReddit = RESUtils.currentSubreddit();
		if ((this.curSubReddit != null) && (subredditTitle != null)) {
			var idx = this.ignoredSubReddits.indexOf(this.curSubReddit);
			if (idx == -1) {
				this.styleToggleCheckbox.checked = true;
			} else {
				this.toggleSubredditStyle(false);
			}
			this.styleToggleCheckbox.addEventListener('change', function(e) {
				modules['styleTweaks'].toggleSubredditStyle(this.checked);
			}, false);
			styleToggle.appendChild(this.styleToggleCheckbox);
			insertAfter(subredditTitle, styleToggle);
		}
	},
	toggleSubredditStyle: function(toggle) {
		if (toggle) {
			var idx = this.ignoredSubReddits.indexOf(this.curSubReddit);
			if (idx != -1) this.ignoredSubReddits.splice(idx, 1); // Remove it if found...
			var subredditStyleSheet = document.createElement('link');
			subredditStyleSheet.setAttribute('title','applied_subreddit_stylesheet');
			subredditStyleSheet.setAttribute('rel','stylesheet');
			subredditStyleSheet.setAttribute('href','http://www.reddit.com/r/'+this.curSubReddit+'/stylesheet.css');
			this.head.appendChild(subredditStyleSheet);
		} else {
			var idx = this.ignoredSubReddits.indexOf(this.curSubReddit); // Find the index
			if (idx==-1) this.ignoredSubReddits[this.ignoredSubReddits.length] = this.curSubReddit;
			var subredditStyleSheet = this.head.querySelector('link[title=applied_subreddit_stylesheet]');
			if (subredditStyleSheet) {
				subredditStyleSheet.parentNode.removeChild(subredditStyleSheet);
			}
		}
		RESStorage.setItem('RESmodules.styleTweaks.ignoredSubredditStyles',JSON.stringify(this.ignoredSubReddits));
	},
	redditDark: function(off) {
		if (off) {
			if (typeof(this.darkStyle) != 'undefined') {
				this.darkStyle.parentNode.removeChild(this.darkStyle);
				
				textBoxes = document.getElementsByTagName('input');
				for (var i=0; i<textBoxes.length; i++)
				{
					textBoxes[i].style.border = '1px solid #808080';
					textBoxes[i].style.backgroundColor = '#FFFFFF';
					textBoxes[i].style.color = '#000000';
				}

				textAreas = document.getElementsByTagName('textarea');
				for (var i=0; i<textAreas.length; i++)
				{
					textAreas[i].style.border = '2px solid #ECE9D8';
					textAreas[i].style.backgroundColor = '#FFFFFF';
					textAreas[i].style.color = '#000000';
				}

				selectBoxes = document.getElementsByTagName('select');
				for (var i=0; i<selectBoxes.length; i++)
				{
					selectBoxes[i].style.border = '1px inset #ECE9D8';
					selectBoxes[i].style.backgroundColor = '#FFFFFF';
					selectBoxes[i].style.color = '#000000';
				}

				formButtons = document.getElementsByTagName('button');
				for (var i=0; i<formButtons.length; i++)
				{
					formButtons[i].style.border = '3px outset #ECE9D8';
					formButtons[i].style.backgroundColor = '#ECE9D8';
					formButtons[i].style.color = '#000000';
					formButtons[i].style.textTransform = 'capitalize';
				}
			
			}
		} else {
			var css = "div[class=\"organic-listing\"] ul[class=\"tabmenu \"], div[id=\"header-bottom-left\"]] {background-color: #666 !important; } ::-moz-selection {	background:orangered; }";
			css += "body { background-color: #333 !important; } .infobar { background-color:#222 !important; color: #999 !important; }";
			css += ".side { background:none !important; } h2, .tagline a, .content a, .footer a, .wired a, .side a, .subredditbox li a { color:#8AD !important; }";
			css += ".rank .star { color:orangered !important; } .content { color:#CCC !important; } .thing .title.loggedin, .link .title { color: #6699CC !important; }";
			css += ".link .midcol, .linkcompressed .midcol, .comment .midcol { background:none !important; margin-right: 5px !important; margin-top: 0 !important; }";
			css += ".arrow { height:14px !important; margin-top:0 !important; width:15px !important; }";
			css += ".arrow.up { background:url(http://thumbs.reddit.com/t5_2qlyl_0.png?v=zs9q49wxah08x4kpv2tu5x4nbda7kmcpgkbj) -15px 0 no-repeat !important; }";
			css += ".arrow.down { background:url(http://thumbs.reddit.com/t5_2qlyl_0.png?v=10999ad3mtco31oaf6rrggme3t9jdztmxtg6) -15px -14px no-repeat !important; }";
			css += ".arrow.up:hover { background:url(http://thumbs.reddit.com/t5_2qlyl_0.png?v=9oeida688vtqjpb4k0uy93oongrzuv5j7vcj) -30px 0 no-repeat !important; }";
			css += ".arrow.down:hover { background:url(http://thumbs.reddit.com/t5_2qlyl_0.png?v=cmsw4qrin2rivequ0x1wnmn8ltd7ke328yqs) -30px -14px no-repeat !important; }";
			css += ".arrow.upmod { background:url(http://thumbs.reddit.com/t5_2qlyl_0.png?v=8oarqkcswl255wrw3q1kyd74xrty50a7wr3z) 0 0 no-repeat !important; }";
			css += ".arrow.downmod { background:url(http://thumbs.reddit.com/t5_2qlyl_0.png?v=90eauq018nf41z3vr0u249gv2q6651xyzrkh) 0 -14px no-repeat !important; }";
			css += ".link .score.likes, .linkcompressed .score.likes { color:orangered !important; }";
			css += ".link .score.dislikes, .linkcompressed .score.dislikes { color:#8AD !important; }";
			css += ".linkcompressed .entry .buttons li a, .link .usertext .md, .thing .compressed, organic-listing .link, .organic-listing .link.promotedlink, .link.promotedlink.promoted { background:none !important; }";
			css += ".message.new > .entry {background-color:#444444; border:1px solid #E9E9E9; padding:6px; } ";
			css += ".subredditbox li a:before { content:\"#\" !important; } .subredditbox li { font-weight:bold !important; text-transform:lowercase !important; }";
			css += ".side h3:after { content:\" (#reddit on freenode)\" !important; font-size:85% !important; font-weight:normal !important; }";
			css += "#subscribe a { color:#8AD !important; } .dropdown.lightdrop .drop-choices { background-color:#333 !important; }";
			css += ".dropdown.lightdrop a.choice:hover { background-color:#111 !important; } .side { background:none !important; color:#999 !important; margin-left:10px !important; }";
			css += ".side h4, .side h3 { color:#ddd !important; } .side h5 { color:#aaa !important; margin-top:5px !important; } .side p { margin-top:5px !important; }";
			css += ".login-form-side { background:#e8690a !important; border-bottom:0 !important; border-color:#e8690a !important; padding-bottom:1px !important; position:relative !important; }";
			css += ".login-form-side input { width:125px !important; } .login-form-side label { color:#111 !important; } .login-form-side a { color:#FFFFFF !important; font-size:11px !important; }";
			css += ".login-form-side .error { color:#660000 !important; } .subreddit-info .label { color:#aaa !important; } .subreddit-info { padding:10px !important; }";
			//css += "button.btn { background:none !important; border:2px solid black !important; color:black !important; position:relative !important; width:auto !important; }";
			css += ".commentreply .buttons button { margin-left:0 !important; margin-top:5px !important; } .commentreply .textarea { color:black !important; }";
			css += ".menuarea { margin-right:315px !important; } .permamessage { background-image:url(http://thumbs.reddit.com/t5_2qlyl_3.png?v=uza2aq80cb2x2e90ojhdqooj1wazax4jjzfc) !important; border-color:#369 !important; }";
			css += ".commentbody.border { background-color:#369 !important; } .commentreply .help tr { background:none !important; } .commentreply table.help { margin:2px !important; }";
			css += "#newlink th { padding-top:5px !important; vertical-align:top !important; } .pretty-form.long-text input[type=\"text\"], .pretty-form.long-text textarea, .pretty-form.long-text input[type=\"password\"], .commentreply textarea { background-color: #333 !important; border: 2px solid black !important; color: #CCC !important; padding: 4px !important; box-shadow: none !important; }";
			css += "input#title { height:5em !important; } .spam, .reported { background:none !important; border:2px dotted !important; padding:4px !important; }";
			css += ".spam { border-color:orangered !important; } .reported { border-color:goldenrod !important; } .organic-listing .linkcompressed { background:none !important; }";
			css += ".organic-listing .nextprev img { opacity:.7 !important; } .organic-listing .nextprev img:hover { opacity:.85 !important; }";
			css += "#search input[type=\"text\"]:focus { color:white !important; }";
			css += "#sr-header-area, #sr-more-link { background: 0 !important; } #sr-header-area { border-bottom:none !important; }";
			css += "#header-bottom-left .tabmenu .selected a { padding-bottom:0 !important; } #ad-frame { opacity:.8 !important; }";
			css += ".comment.unread { background-color:#4A473B !important; } .raisedbox .flat-list a { background-color:#222 !important; -moz-border-radius:2px !important; -webkit-border-radius:2px !important; }";
			css += ".raisedbox .flat-list a:hover { background-color:#336699 !important; color:white !important; } .instructions { background:white !important; padding:10px !important; }";
			css += ".instructions .preftable th, .instructions .pretty-form  { color:black !important; } #feedback { padding:10px !important; } span[class=\"hover pagename redditname\"] a {font-size: inherit !important; color: #77BB88 !important;}";
			css += ".thing .title.loggedin:visited, .link .title:visited  {color: #666666 !important;} legend {background-color: black !important;}";
			css += "a.author.moderator, a.moderator {color:#3F4 !important; } a.author.friend, a.friend {color:rgb(255, 139, 36) !important; } a.submitter {color: #36F !important; }";
			css += "a.author.admin, a.admin{color: #f22 !important; } a.author.submitter { }   table[class=\"markhelp md\"] tr td { background-color: #555 !important; }";
			css += "div.infobar { background-color: #222 !important; color: #999 !important; border: 1px solid orange !important; }  table[class=\"markhelp md\"] tr[style=\"background-color: rgb(255, 255, 153); text-align: center;\"] td { background-color: #36c !important; }";
			css += "form[class=\"usertext border\"] div.usertext-body { background-color: transparent !important;  border-width: 2px !important; border-style: solid !important; border-color: #999 !important; }";
			css += "div[class=\"midcol likes\"], div[class=\"midcol dislikes\"], div[class=\"midcol unvoted\"] {padding: 0px 7px 0px 0px !important;}";
			css += "form[class=\"usertext border\"] div.usertext-body div.md { background-color: transparent !important; } form#form-t1_c0b71p54yc div {color: black !important;}";
			css += "a[rel=\"tag\"], a.dsq-help {color: #8AD !important; }  div[class=\"post-body entry-content\"], div.dsq-auth-header { color: #ccc !important; }";
			css += "div#siteTable div[onclick=\"click_thing(this)\"] {background-color: inherit !important;} .md p {color: #999 !important; } .mail .havemail img, .mail .nohavemail img { visibility: hidden; }";
			css += ".havemail {   background: url('http://i.imgur.com/2Anoz.gif') bottom left no-repeat; }  .mail .nohavemail {   background: url('http://imgur.com/6WV6Il.gif') bottom left no-repeat; }";
			css += "#header-bottom-right { background-color: #BBBBBB !important; }";
			css += '.expando-button.image {background: none !important; background-image: url(http://thumbs.reddit.com/t5_2s10b_2.png) !important;}';
			css += '.expando-button.image.collapsed {background-position: 0px 0px !important;}';
			css += '.expando-button.image.collapsed:hover {background-position: 0px -24px !important;}';
			css += '.expando-button.image.expanded, .eb-se { margin-bottom:5px; background-position: 0px -48px !important;}';
			css += '.expando-button.image.expanded:hover, .eb-seh {background-position: 0px -72px !important;}';
			css += '.expando-button.selftext {background: none !important; background-image: url(http://thumbs.reddit.com/t5_2s10b_2.png) !important;}';
			css += '.expando-button.selftext.collapsed {background-position: 0px -96px !important;}';
			css += '.expando-button.selftext.collapsed:hover {background-position: 0px -120px !important;}';
			css += '.expando-button.selftext.expanded, .eb-se { margin-bottom:5px; background-position: 0px -144px !important;}';
			css += '.expando-button.selftext.expanded:hover, .eb-seh {background-position: 0px -168px !important;}';
			css += '.expando-button.video {background: none !important; background-image: url(http://thumbs.reddit.com/t5_2s10b_2.png) !important;}';
			css += '.expando-button.video.collapsed {background-position: 0px -192px !important;}';
			css += '.expando-button.video.collapsed:hover {background-position: 0px -216px !important;}';
			css += '.expando-button.video.expanded, .eb-se { margin-bottom:5px; background-position: 0px -240px !important;}';
			css += '.expando-button.video.expanded:hover, .eb-seh {background-position: 0px -264px !important;}';
			css += '.expando-button {  background-color:transparent!important; }';
			css += '.keyHighlight, .keyHighlight div.md { background-color: black !important; } .keyHighlight .title.loggedin:visited { color: #dfdfdf !important; } .nub {background: none !important;}';
			css += '.side .titlebox { padding-left:5px!important;}';
			css += '.user b { color:#444!important; }';
			css += '.drop-choices { background-color: #222 !important; border: 1px solid #111; }';
			css += '.drop-choices a { color: #6699CC !important; }';
			css += '.subreddit .usertext .md { background-color:#222 !important; color:#CCC!important; }';
			css += '.formtabs-content { background-color:#222 !important; border: 1px solid #111 !important; padding: 5px !important; width: 530px !important; }';
			//css += 'form#newlink.submit ul.tabmenu>li.selected a { background-color:#111!important; color:#88AADD!important; }';
			css += 'a.link-button, a.text-button { color:#444!important; }';
			css += 'form#newlink.submit button.btn { margin-top: 10px; }';
			css += '#sr-autocomplete-area { z-index:1!important; }';
			//css += 'form#newlink.submit textarea, form#newlink.submit input#url, form#newlink.submit input#sr-autocomplete { background-color:#666!important; color:#CCC!important; }';
			css += '.create-reddit { border:none!important; }';
			css += '.create-reddit span.title { background-color: #222 !important; color: #88AADD !important; border: 1px solid #111 !important; border-bottom: 1px solid #222 !important;}';
			css += '.linefield .linefield-content { background-color: #222 !important; border: 1px solid #111 !important; }';
			//css += '.create-reddit input#title, .create-reddit input#name.text, .create-reddit input#domain.text { height:1.2em!important; background-color:#666!important; color:#CCC!important; }';
			css += '.linefield .delete-field { background-color:transparent!important; }';
			css += '.instructions { background-color:transparent!important; }';
			css += '.instructions .preftable th { color:#CCC!important; }';
			css += '.icon-menu a, FORM.leavemoderator-button { background-color:#222!important; }';
			css += '#pref-delete .delete-field { background-color:transparent!important; }';
			if (this.options.commentBoxes.value) {
				css += ".comment{"+
				"	background-color:#222 !important;"+
				"	border:1px solid #111 !important;"+
				"}"+
				".comment .comment{"+
				"	background-color:#333 !important;"+			
				"}"+
				".comment .comment .comment{"+
				"	background-color:#222 !important;"+
				"}"+
				".comment .comment .comment .comment{"+
				"	background-color:#333 !important;"+	
				"}"+
				".comment .comment .comment .comment .comment{"+
				"	background-color:#222 !important;"+	
				"}"+
				".comment .comment .comment .comment .comment .comment{"+
				"	background-color:#333 !important;"+	
				"}"+
				".comment .comment .comment .comment .comment .comment .comment{"+
				"	background-color:#222 !important;"+	
				"}"+
				".comment .comment .comment .comment .comment .comment .comment .comment{"+
				"	background-color:#333 !important;"+	
				"}"+
				".comment .comment .comment .comment .comment .comment .comment .comment .comment{"+
				"	background-color:#222 !important;"+	
				"}"+
				".comment .comment .comment .comment .comment .comment .comment .comment .comment .comment{"+
				"	background-color:#333 !important;"+	
				"}";
				//css += '.thing { margin-bottom: 10px; border: 1px solid #666666 !important; } ';
			}
			css += '.organic-listing .link { background-color: #333333 !important; }';
			if (this.options.continuity.value) {
				css += '.comment div.child { border-left: 1px dotted #555555 !important; } ';
			} else {
				css += '.comment div.child { border-left: none !important; } ';
			}
			css += '.roundfield { background-color: #333 !important; border: 1px solid #111 !important; }';
			css += '#authorInfoToolTip { background-color: #666666 !important; color: #cccccc !important; border-color: #888888 !important; } #authorInfoToolTip a { color: #88AADD !important; } ';
			css += '.new-comment .usertext-body { background-color: #444444 !important; border: none !important; margin:-1px 0; }';
			//css += '.usertext-edit textarea { background-color: #111 !important; color: #999 !important; } ';
			
			css += '#header { background-color: black; color: #77BB88; border-bottom: 1px solid #111; }';
			css += '.tabmenu li a { background-color: #222; color: #6699CC;}';
			css += '.tabmenu li.selected a { background-color: #333; color: orangered; border-color: #111 #111 #333; }';
			css += '.myhome a, .dropdown.srdrop .selected { color: #77BB88; }';
			css += '.drop-choices a.choice:hover { background-color: black; } ';
			css += 'form.logout a:hover { background-color: black; text-decoration: none; }';
			css += '#openRESPrefs {color: #77BB88 !important; }';
			css += '#accountSwitcherMenu { background-color: #222 !important; color: #999 !important; border: 1px solid #111 !important; }';
			css += '#accountSwitcherMenu .accountName { border-bottom: 1px solid #111 !important; border-left: 1px solid #111 !important; border-right: 1px solid #111 !important; }';
			css += '#accountSwitcherMenu .accountName:first-child { border-top: 1px solid #111; !important; }';
			css += '#accountSwitcherMenu .accountName:hover { background-color: black !important; }';
			css += '.link .entry {margin: 5px; padding: 5px; background-color: #222; border-radius: 7px; border: 1px solid #111; }';
			css += '.link .midcol { background-color: #222 !important; border: 1px solid #111 !important; }';
			css += '.thumbnail { width: 54px; height: 54px; margin: 0 5px 0 0; }';
			css += 'a.thumbnail img { width: inherit; height: inherit; }';
			css += '.footer { background-color: #222 !important; border: 1px solid #111 !important; }';
			css += '.footer .col { border-left: 1px solid #111 !important; }';
			css += '.linkinfo { background-color: #222 !important; border: 1px solid #111 !important; border-radius: 0 !important; }';
			css += '.side, .sidebox .spacer { background-color: #333 !important; }';
			css += '.side .titlebox { background-color: #222 !important; border: 1px solid #111 !important; }';
			css += '.side .titlebox .fancy-toggle-button a { color: #FAFAFA !important; }';
			css += '.morelink { background: none #222 !important; border: 1px solid #111 !important; border-radius: 7px !important;}';
			css += '.morelink:hover { background-color: black !important; }';
			css += '.sidecontentbox .content { background-color: #222 !important; border: 1px solid #111 !important; }';
			css += '.sidecontentbox .content .thing { background-color: #333 !important; color: #77BB88 !important; border: 1px solid #111 !important; margin-bottom: 5px !important; padding: 5px !important; }';
			css += '.sidecontentbox .content .thing:hover { color: #99CCFF !important; text-decoration: none !important; } ';
			//css += 'a.reddit-comment-link { color: #77BB88 !important; }';
			//css += 'a.reddit-comment-link:hover { color: #AAEEBB !important; text-decoration: none !important; }';
			css += '.link .usertext .md { background-color: #333 !important; border: 1px solid #111 !important; }';
			css += '.link.last-clicked .entry { border: 1px solid #77BB88 !important; }';
			css += '#REScommentNavToggle { background-color: #222 !important; border: 1px solid #111 !important; }';
			css += '#REScommentNavToggle:hover { background-color: black !important; }';
			css += '.linefield { background-color: #333 !important; border: 1px solid #111 !important; }';
			css += '#sr-form { background-color: #222 !important; border: 1px solid #111 !important; padding: 5px !important; width: 530px !important;}';
			css += '.usertext .markhelp, .usertext .markhelp td, .usertext .markhelp tr { border: 1px solid #111 !important; padding: 5px !important; }';
			css += '.tabmenu.formtab a { background-color: #333 !important; color: #999 !important; border: 1px solid #111 !important; }';
			css += '.tabmenu.formtab li.selected a { background-color: #222 !important; color: orangered !important; border-top: 1px solid #111 !important; border-bottom-color: #222 !important; }';
			css += '.redditSingleClick, .entry .buttons li a { color: #999 !important; }';
			css += '.redditSingleClick:hover, .entry .buttons li a:hover, .thing .title.loggedin:hover, .link .title:hover, a.reddit-link-title:hover { color: #99CCFF !important; text-decoration: none !important; }';
			css += '.domain a, a.author, .tagline a.subreddit, a.reddit-comment-link { color: #77BB88 !important; }';
			css += '.domain a:hover, a.author:hover, .tagline a.subreddit:hover, a.reddit-comment-link:hover { color: #AAEEBB !important; text-decoration: none !important; }';
			
			this.darkStyle = createElementWithID('style', 'darkStyle');
			this.darkStyle.innerHTML = css;
			document.body.appendChild(this.darkStyle);
			
			textBoxes = document.getElementsByTagName('input');
			for (var i=0; i<textBoxes.length; i++)
			{
				textBoxes[i].style.border = '1px solid #111111';
				textBoxes[i].style.backgroundColor = '#000000';
				textBoxes[i].style.color = '#999999';
			}

			textAreas = document.getElementsByTagName('textarea');
			for (var i=0; i<textAreas.length; i++)
			{
				textAreas[i].style.border = '1px solid #111111';
				textAreas[i].style.backgroundColor = '#000000';
				textAreas[i].style.color = '#999999';
			}

			selectBoxes = document.getElementsByTagName('select');
			for (var i=0; i<selectBoxes.length; i++)
			{
				selectBoxes[i].style.border = '1px solid #111111';
				selectBoxes[i].style.backgroundColor = '#000000';
				selectBoxes[i].style.color = '#6699CC';
			}

			formButtons = document.getElementsByTagName('button');
			for (var i=0; i<formButtons.length; i++)
			{
				formButtons[i].style.border = '1px solid #111111';
				formButtons[i].style.backgroundColor = '#000000';
				formButtons[i].style.color = '#999999';
				formButtons[i].style.textTransform = 'capitalize';
			}
		}
		// GM_addStyle(css);
	}
}; 

modules['accountSwitcher'] = {
	moduleID: 'accountSwitcher',
	moduleName: 'Account Switcher',
	options: {
		accounts: {
			type: 'table',
			fields: [
				{ name: 'username', type: 'text' },
				{ name: 'password', type: 'password' }
			],
			value: [
				/*
				['somebodymakethis','SMT','[SMT]'],
				['pics','pic','[pic]']
				*/
			],
			description: 'Set your usernames and passwords below. They are only stored in RES preferences.'
		},
		keepLoggedIn: {
			type: 'boolean',
			value: false,
			description: 'Keep me logged in when I restart my browser.'
		}
	},
	description: 'Store username/password pairs and switch accounts instantly while browsing Reddit!',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			this.userLink = document.querySelector('#header-bottom-right > span.user > a');
			// this.loggedInUser = userLink.innerHTML;
			this.loggedInUser = RESUtils.loggedInUser();
			var downArrowIMG = 'http://www.reddit.com/static/droparrowgray.gif';
			var downArrow = document.createElement('img');
			downArrow.setAttribute('src', downArrowIMG);
			downArrow.style.cursor = 'pointer';
			downArrow.style.marginLeft = '3px';
			downArrow.addEventListener('click',function(e) {
				e.preventDefault();
				modules['accountSwitcher'].toggleAccountMenu();
			}, true);
			insertAfter(this.userLink, downArrow);

			this.accountMenu = createElementWithID('UL','accountSwitcherMenu');
			this.accountMenu.style.display = 'none';
			RESUtils.addCSS('#accountSwitcherMenu { position: absolute; z-index: 999; display: none; padding: 3px; background-color: #ffffff; }');
			RESUtils.addCSS('.accountName { padding: 2px; border-bottom: 1px solid #AAAAAA; border-left: 1px solid #AAAAAA; border-right: 1px solid #AAAAAA; }');
			RESUtils.addCSS('.accountName:first-child { padding: 2px; border-top: 1px solid #AAAAAA; }');
			RESUtils.addCSS('.accountName:hover { background-color: #F3FAFF; }');
			// GM_addStyle(css);
			var accounts = this.options.accounts.value;
			if (accounts != null) {
				var accountCount = 0;
				for (var i=0, len=accounts.length; i<len; i++) {
					thisPair = accounts[i];
					if (thisPair[0] != this.loggedInUser) {
						accountCount++;
						var thisLI = document.createElement('LI');
						addClass(thisLI, 'accountName');
						thisLI.innerHTML = thisPair[0];
						thisLI.style.cursor = 'pointer';
						thisLI.addEventListener('click', function(e) {
							e.preventDefault();
							modules['accountSwitcher'].toggleAccountMenu();
							modules['accountSwitcher'].switchTo(e.target.innerHTML);
						}, true);
						this.accountMenu.appendChild(thisLI);
					}
				}
				var thisLI = document.createElement('LI');
				addClass(thisLI, 'accountName');
				thisLI.innerHTML = '+ add account';
				thisLI.style.cursor = 'pointer';
				thisLI.addEventListener('click', function(e) {
					e.preventDefault();
					modules['accountSwitcher'].toggleAccountMenu();
					modules['accountSwitcher'].manageAccounts();
				}, true);
				this.accountMenu.appendChild(thisLI);
			}
			document.body.appendChild(this.accountMenu);
		}
	},
	toggleAccountMenu: function() {
		if (this.accountMenu.style.display == 'none') {
			thisXY=RESUtils.getXYpos(this.userLink);
			this.accountMenu.style.top = (thisXY.y + 12) + 'px';
			this.accountMenu.style.left = (thisXY.x - 10) + 'px';
			this.accountMenu.style.display = 'block';
		} else {
			this.accountMenu.style.display = 'none';
		}
	},
	switchTo: function(username) {
		var accounts = this.options.accounts.value;
		var password = '';
		var rem = '';
		if (this.options.keepLoggedIn.value) {
			rem = '&rem=on';
		}
		for (var i=0, len=accounts.length; i<len; i++) {
			thisPair = accounts[i];
			if (thisPair[0] == username) {
				password = thisPair[1];
			}
		}
		// console.log('request with user: ' +username+ ' -- passwd: ' + password);
		GM_xmlhttpRequest({
			method:	"POST",
			url:	'http://'+location.hostname+'/api/login',
			data: 'user='+RESUtils.urlencode(username)+'&passwd='+RESUtils.urlencode(password)+rem,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload:	function(response) {
				var data = JSON.parse(response.responseText);
				// var errorCheck = data.jquery[10][3][0];
				var error = /WRONG_PASSWORD/;
				var rateLimit = /RATELIMIT/;
				if (error.test(response.responseText)) {
					alert('Incorrect login and/or password. Please check your configuration.');
				} else if (rateLimit.test(response.responseText)) {
					alert('RATE LIMIT: The Reddit API is seeing too many hits from you too fast, perhaps you keep submitting a wrong password, etc?  Try again in a few minutes.');
				} else {
					location.reload();
				}
			}
		});
	},
	manageAccounts: function() {
			RESConsole.open();
			RESConsole.menuClick(document.getElementById('Menu-Configure Modules'));
			RESConsole.drawConfigOptions('accountSwitcher');
	}
};

modules['RESTips'] = {
	moduleID: 'RESTips',
	moduleName: 'RES Tips and Tricks',
	options: {
		// any configurable options you have go here...
		// options must have a type and a value.. 
		// valid types are: text, boolean (if boolean, value must be true or false)
		// for example:
		dailyTip: {
			type: 'boolean',
			value: true,
			description: 'Show a random tip once every 24 hours.'
		}
	},
	description: 'Adds tips/tricks help to RES console',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[\?]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			this.init();
			if (this.options.dailyTip.value) {
				this.dailyTip();
			}
		}
	},
	init: function() {
		thisXY=RESUtils.getXYpos(RESConsole.RESPrefsLink);
		RESUtils.addCSS("#tipsAndTricksToolTip { position: absolute; background-color: #F3FCFF; width: 300px; border: 2px solid #cccccc; padding: 6px; font-size: 12px; }");
		RESUtils.addCSS("#tipsAndTricksToolTip h2 { float: left; }");
		RESUtils.addCSS("#closeTipsAndTricksToolTip { float: right; cursor: pointer; } ");
		RESUtils.addCSS("#tipsAndTricksText { clear: both; padding-top: 3px; padding-bottom: 3px; } ");
		RESUtils.addCSS("#toolTipNextPrev { border-top: 1px solid #cccccc; }");
		RESUtils.addCSS("#toolTipPrev, #toolTipNext { color: #7799ff; cursor: pointer; }");
		RESUtils.addCSS("#toolTipPrev { float: left; }");
		RESUtils.addCSS("#toolTipNext { float: right; }");
		this.toolTip = createElementWithID('div','tipsAndTricksToolTip');
		var toolTipHeader = document.createElement('h2');
		toolTipHeader.innerHTML = 'RES Tips and Tricks:';
		this.toolTip.appendChild(toolTipHeader);
		var toolTipCloseButton = createElementWithID('div','closeTipsAndTricksToolTip');
		toolTipCloseButton.innerHTML = 'x';
		toolTipCloseButton.addEventListener('click',function(e) {
			e.preventDefault();
			RESUtils.fadeElementOut(modules['RESTips'].toolTip, 0.3);
		}, false);
		this.toolTip.appendChild(toolTipCloseButton);
		this.toolTip.setAttribute('style', 'top: ' + (thisXY.y + 20) + 'px; left: ' + (thisXY.x - 305) + 'px;');
		this.toolTip.style.display = 'none';
		this.toolTip.style.zIndex = 1001;
		this.toolTipText = createElementWithID('div','tipsAndTricksText');
		this.toolTipText.innerHTML = '';
		this.toolTip.appendChild(this.toolTipText);
		var toolTipNextPrev = createElementWithID('div', 'toolTipNextPrev');
		var toolTipPrev = createElementWithID('span','toolTipPrev');
		toolTipPrev.innerHTML = 'Prev';
		toolTipPrev.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESTips'].nextPrevTip(-1);
		}, false);
		this.toolTip.appendChild(toolTipPrev);
		var toolTipNext = createElementWithID('span','toolTipNext');
		toolTipNext.innerHTML = 'Next';
		toolTipNext.addEventListener('click', function(e) {
			e.preventDefault();
			modules['RESTips'].nextPrevTip(1);
		}, false);
		this.toolTip.appendChild(toolTipNext);
		document.body.appendChild(this.toolTip);
	},
	dailyTip: function() {
		var lastCheck = parseInt(RESStorage.getItem('RESLastToolTip')) || 0;
		var now = new Date();
		// 86400000 = 1 day
		if ((now.getTime() - lastCheck) > 86400000) {
			// mark off that we've displayed a new tooltip
			RESStorage.setItem('RESLastToolTip',now.getTime());
			if (lastCheck == 0) {
				var thisTip = 'Welcome to RES. You can turn modules on and off, and configure settings for the modules using the [RES] link above. For feature requests, bug reports, etc - head over to <a href="http://reddit.com/r/Enhancement">/r/Enhancement</a>.<br>Do you keep seeing this message? <a target=\"_blank\" href=\"http://reddit.honestbleeps.com/faq\">see the FAQ</a> about BetterPrivacy and similar addons.';
				this.showTip(thisTip);
			} else {
				this.randomTip();
			}
		}
	},
	randomTip: function() {
		this.currTip = Math.floor(Math.random()*this.tips.length);
		var thisTip = this.tips[this.currTip];
		this.showTip(thisTip);
	},
	nextPrevTip: function(idx) {
		if (typeof(this.currTip) == 'undefined') this.currTip = 0;
		this.currTip += idx;
		if (this.currTip < 0) {
			this.currTip = this.tips.length;
		} else if (this.currTip >= this.tips.length) {
			this.currTip = 0;
		}
		var thisTip = this.tips[this.currTip];
		this.showTip(thisTip);
	},
	tips: Array(
		"Don't forget to subscribe to <a href=\"http://reddit.com/r/Enhancement\">/r/Enhancement</a> to keep up to date on the latest versions of RES, report bugs, or suggest features!",
		"Don't want to see posts containing certain keywords? Want to filter out certain subreddits from /r/all? Try the filteReddit module!",
		"RES checks for new versions every 24 hours, but if you want to check manually, open up the RES console and click [check for update]",
		"Keyboard Navigation is one of the most underutilized features in RES. You should try it!  Hit the ? key (shift-/) to see a list of commands.",
		"Did you know you can configure the appearance of a number of things in RES? For example: Keyboard navigation lets you configure the look of the 'selected' box, and commentBoxes lets you configure the borders / shadows.",
		"Do you subscribe to a ton of reddits? Give the subreddit tagger a try, it makes your homepage a bit more readable.",
		"If you haven't tried it yet, Keyboard Navigation is great. Just hit ? while browsing for instructions.",
		"Click the (_) next to a user to tag that user with any name you like - you can also color code the tag.",
		"Roll over a user's name to get information about them such as their karma, and how long they've been a reddit user.",
		"Hover over the 'parent' link in comments pages to see the text of the parent being referred to.",
		"You can configure the color and style of MrDerk's User Highlighter module if you want to change how the highlights look.",
		"Not a fan of how comments pages look? You can change the appearance in the Style Tweaks module",
		"Sick of seeing these tips?  They only show up once every 24 hours, but you can disable that in the RES Tips and Tricks preferences.",
		"Don't like the night/day icon for switching between light/dark styles? Just disable the 'lightSwitch' option under Style Tweaks",
		"Did you know that there is now a 'keep me logged in' option in the Account Switcher? Turn it on if you want to stay logged in to Reddit when using the switcher!",
		"See that little [vw] next to users you've voted on?  That's their vote weight - it moves up and down as you vote the same user up / down."
	),
	showTip: function(message) {
		this.toolTipText.innerHTML = message;
		RESUtils.fadeElementIn(this.toolTip, 0.2);
	}
};

modules['filteReddit'] = {
	moduleID: 'filteReddit',
	moduleName: 'filteReddit',
	options: {
		// any configurable options you have go here...
		// options must have a type and a value.. 
		// valid types are: text, boolean (if boolean, value must be true or false)
		// for example:
		NSFWfilter: {
			type: 'boolean',
			value: false,
			description: 'Filters all links labelled NSFW'
		},
		keywords: {
			type: 'table',
			fields: [
				{ name: 'keyword', type: 'text' }
			],
			value: [
			],
			description: 'Type in title keywords you want to ignore if they show up in a title'
		},
		subreddits: {
			type: 'table',
			fields: [
				{ name: 'subreddit', type: 'text' }
			],
			value: [
			],
			description: 'Type in a subreddit you want to ignore (only applies to /r/all)'
		},
		domains: {
			type: 'table',
			fields: [
				{ name: 'domain', type: 'text' }
			],
			value: [
			],
			description: 'Type in domain keywords you want to ignore. Note that \"reddit\" would ignore \"reddit.com\" and \"fooredditbar.com\"'
		}
	},
	description: 'Filter out NSFW content, or links by keyword, domain (use User Tagger to ignore by user) or subreddit (for /r/all).',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: new Array(
		/https?:\/\/([a-z]+).reddit.com\/?(?:\??[\w]+=[\w]+&?)*/i,
		/https?:\/\/([a-z]+).reddit.com\/r\/[\w]+\/?(?:\??[\w]+=[\w]+&?)*$/i
	),
	exclude: new Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			if (this.options.NSFWfilter.value) {
				this.filterNSFW();
			}
			document.body.addEventListener('DOMNodeInserted', function(event) {
				if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
					modules['filteReddit'].scanEntries(event.target);
				}
			}, true);
			this.scanEntries();
		}
	},
	scanEntries: function(ele) {
		if (ele == null) {
			var entries = document.querySelectorAll('#siteTable div.thing.link');
		} else {
			var entries = ele.querySelectorAll('div.thing.link');
		}
		// var RALLre = /\/r\/all\/?(([\w]+)\/)?/i;
		// var onRALL = RALLre.exec(location.href);
		var onRALL = (RESUtils.currentSubreddit() == 'all');
		for (var i=0, len=entries.length; i<len;i++) {
			var postTitle = entries[i].querySelector('.entry a.title').innerHTML;
			var postDomain = entries[i].querySelector('.entry span.domain > a').innerHTML;
			var thisSubreddit = entries[i].querySelector('.entry a.subreddit');
			if (thisSubreddit != null) {
				var postSubreddit = thisSubreddit.innerHTML;
			} else {
				var postSubreddit = false;
			}
			var filtered = false;
			filtered = this.filterTitle(postTitle);
			if (!filtered) filtered = this.filterDomain(postDomain);
			if ((!filtered) && (onRALL) && (postSubreddit)) {
				filtered = this.filterSubreddit(postSubreddit);
			}
			if (filtered) {
				// console.log('filtered this entry: ' + postTitle);
				entries[i].style.display = 'none';
			}
		}
	},
	filterNSFW: function() {
		RESUtils.addCSS('.over18 { display: none; !important }');
	},
	filterTitle: function(title) {
		return this.arrayContainsSubstring(this.options.keywords.value, title.toLowerCase());
	},
	filterDomain: function(domain) {
		return this.arrayContainsSubstring(this.options.domains.value, domain.toLowerCase());
	},
	filterSubreddit: function(subreddit) {
		return this.arrayContainsSubstring(this.options.subreddits.value, subreddit.toLowerCase());
	},
	arrayContainsSubstring: function(obj, substring) {
	  var i = obj.length;
	  while (i--) {
		if ((obj[i] != null) && (substring.indexOf(obj[i].toString().toLowerCase()) != -1)) {
		  return true;
		}
	  }
	  return false;
	}
};

modules['newCommentCount'] = {
	moduleID: 'newCommentCount',
	moduleName: 'New Comment Count',
	options: {
		// any configurable options you have go here...
		// options must have a type and a value.. 
		// valid types are: text, boolean (if boolean, value must be true or false)
		// for example:
		cleanComments: {
			type: 'text',
			value: 7,
			description: 'Clean out cached comment counts of pages you haven\t visited in [x] days - enter a number here only!'
		}
	},
	description: 'Shows how many new comments there are since your last visit.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/?(?:\??[\w]+=[\w]+&?)*/i,
		/https?:\/\/([a-z]+).reddit.com\/r\/[\w]+\/?(?:(new|controversial|top)\/?)?(?:\??[\w]+=[\w]+&?)*$/i,
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i
	),
	exclude: Array(
		/https?:\/\/([a-z]+).reddit.com\/message\/[-\w\.\/]*/i,
		/https?:\/\/([a-z]+).reddit.com\/user\/[-\w\.\/]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// go!
			var counts = RESStorage.getItem('RESmodules.newCommentCount.counts');
			if (counts == null) {
				counts = '{}';
			}
			this.commentCounts = safeJSON.parse(counts, 'RESmodules.newCommentCount.counts');
			if (RESUtils.pageType() == 'comments') {
				this.updateCommentCount();
				document.body.addEventListener('DOMNodeInserted', function(event) {
					if ((event.target.tagName == 'DIV') && (hasClass(event.target,'thing'))) {
						modules['newCommentCount'].updateCommentCount();
					}
				}, true);
			} else {
				this.processCommentCounts();
			}
			RESUtils.addCSS('.newComments { display: inline; color: #aaaadd; }');
		}
	},
	processCommentCounts: function() {
		var lastClean = RESStorage.getItem('RESmodules.newCommentCount.lastClean');
		var now = new Date();
		if (lastClean == null) {
			lastClean = now.getTime();
			RESStorage.setItem('RESmodules.newCommentCount.lastClean', now.getTime());
		}
		// Clean cache once a day
		if ((now.getTime() - lastClean) > 86400000) {
			this.cleanCache();
		}
		var IDre = /\/r\/[\w]+\/comments\/([\w]+)\//i;
		var commentsLinks = document.querySelectorAll('#siteTable div.thing.link a.comments');
		for (var i=0, len=commentsLinks.length; i<len;i++) {
			var href = commentsLinks[i].getAttribute('href');
			var thisCount = commentsLinks[i].innerHTML;
			var split = thisCount.split(' ');
			thisCount = split[0];
			var matches = IDre.exec(href);
			if (matches) {
				var thisID = matches[1];
				if ((typeof(this.commentCounts[thisID]) != 'undefined') && (this.commentCounts[thisID] != null)) {
					var diff = thisCount - this.commentCounts[thisID].count;
					if (diff > 0) {
						commentsLinks[i].innerHTML += ' ('+diff+' new)';
					}
				}
			}
		}
	},
	updateCommentCount: function() {
		var IDre = /\/r\/[\w]+\/comments\/([\w]+)\//i;
		var matches = IDre.exec(location.href);
		if (matches) {
			if (!this.currentCommentCount) {
				this.currentCommentID = matches[1];
				var thisCount = document.querySelector('#siteTable a.comments');
				if (thisCount) {
					thisCountText = thisCount.innerHTML
					var split = thisCountText.split(' ');
					this.currentCommentCount = split[0];
					if ((typeof(this.commentCounts[this.currentCommentID]) != 'undefined') && (this.commentCounts[this.currentCommentID] != null)) {
						var prevCommentCount = this.commentCounts[this.currentCommentID].count;
						var diff = this.currentCommentCount - prevCommentCount;
						if (diff>0) thisCount.innerHTML = this.currentCommentCount + ' comments ('+diff+' new)';
					}
					if (isNaN(this.currentCommentCount)) this.currentCommentCount = 0;
				}
			} else {
				this.currentCommentCount++;
			}
		}
		var now = new Date();
		if (typeof(this.commentCounts) == 'undefined') {
			this.commentCounts = {};
		}
		this.commentCounts[this.currentCommentID] = {
			count: this.currentCommentCount,
			updateTime: now.getTime()
		}
		if (this.currentCommentCount) {
			// dumb, but because of Greasemonkey security restrictions we need a window.setTimeout here...
			window.setTimeout( function() {
				RESStorage.setItem('RESmodules.newCommentCount.counts', JSON.stringify(modules['newCommentCount'].commentCounts));
			}, 100);
		}
	},
	cleanCache: function() {
		var now = new Date();
		for(i in this.commentCounts) {
			if ((this.commentCounts[i] != null) && ((now.getTime() - this.commentCounts[i].updateTime) > (86400000 * this.options.cleanComments.value))) {
				this.commentCounts[i] = null;
			}
		}
		RESStorage.setItem('RESmodules.newCommentCount.counts', JSON.stringify(this.commentCounts));
		RESStorage.setItem('RESmodules.newCommentCount.lastClean', now.getTime());
	}
};

modules['spamButton'] = {
	moduleID: 'spamButton',
	moduleName: 'Spam Button',
	options: {
	},
	description: 'Adds a Spam button to posts for easy reporting.',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[\?]*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// get this module's options...
			// RESUtils.getOptions(this.moduleID);
			// do stuff now!
			// this is where your code goes...
			// credit to tico24 for the idea, here: http://userscripts.org/scripts/review/84454
			// code adapted for efficiency...
			document.body.addEventListener('DOMNodeInserted', function(event) {
				if ((event.target.tagName == 'DIV') && (event.target.getAttribute('id') == 'siteTable')) {
					modules['spamButton'].addSpamButtons(event.target);
				}
			}, true);
			this.addSpamButtons();
		}
	},
	addSpamButtons: function(ele) {
		if (ele == null) ele = document;
		if ((RESUtils.pageType() == 'linklist') || (RESUtils.pageType() == 'comments') || (RESUtils.pageType() == 'profile')) {
			var allLists = ele.querySelectorAll('#siteTable ul.flat-list.buttons');
			for(var i=0, len=allLists.length; i<len; i++)
			{
				var permaLink = allLists[i].childNodes[0].childNodes[0].href;

				var spam = document.createElement('li');
				// insert spam button second to last in the list... this is a bit hacky and assumes singleClick is enabled...
				// it should probably be made smarter later, but there are so many variations of configs, etc, that it's a bit tricky.
				allLists[i].lastChild.parentNode.insertBefore(spam, allLists[i].lastChild);
				
				// it's faster to figure out the author only if someone actually clicks the link, so we're modifying the code to listen for clicks and not do all that queryselector stuff.
				var a = document.createElement('a');
				a.setAttribute('class', 'option');
				a.setAttribute('title', 'Report this user as a spammer');
				a.addEventListener('click', modules['spamButton'].reportPost, false);
				a.setAttribute('href', 'javascript:void(0)');
				a.innerHTML= 'spam';
				spam.appendChild(a);
			}
		}
	},
	reportPost: function(e) {
		var a = e.target;
		if (RESUtils.pageType() == 'comments') {
			var authorProfileContainer = a.parentNode.parentNode.parentNode;
		} else {
			var authorProfileContainer = a.parentNode.parentNode.previousSibling;
		}
		var authorProfileLink = authorProfileContainer.querySelector('.author').href;
		a.setAttribute('href', 'http://www.reddit.com/r/reportthespammers/submit?url=' + authorProfileLink);void(0);
		a.setAttribute('target', '_blank');
	}
};

modules['commentNavigator'] = {
	moduleID: 'commentNavigator',
	moduleName: 'Comment Navigator',
	description: 'Provides a comment navigation tool to easily find comments by OP, mod, etc.',
	options: { 
		showByDefault: {
			type: 'boolean',
			value: false,
			description: 'Display Comment Navigator by default'
		}
	},
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]+\/comments\/[-\w\.]+/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},	
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			// draw the commentNav box
			RESUtils.addCSS('#REScommentNavBox { position: fixed; z-index: 999; right: 10px; top: 46px; width: 160px; border: 1px solid gray; background-color: #ffffff; opacity: 0.7; padding: 3px; user-select: none; -webkit-user-select: none; -moz-user-select: none; }');
			RESUtils.addCSS('#REScommentNavToggle { display: block; cursor: pointer; border: 1px solid gray; width: 160px; padding: 3px; margin-left: 10px; margin-bottom: 10px; text-align: center; border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px 5px 5px 5px; user-select: none; -webkit-user-select: none; -moz-user-select: none; }');
			RESUtils.addCSS('#commentNavLeft, #commentNavButtons { float: left; }');
			RESUtils.addCSS('#commentNavUp { margin: auto; cursor: pointer; background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); width: 12px; height: 12px; background-position: 0px -148px; }');
			RESUtils.addCSS('#commentNavDown { margin: auto; cursor: pointer; background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); width: 12px; height: 12px; background-position: -12px -148px; }');			
			RESUtils.addCSS('#commentNavButtons { display: none; margin-left: 12px; text-align: center; user-select: none; -webkit-user-select: none; -moz-user-select: none; }');
			RESUtils.addCSS('#commentNavCloseButton { background-image: url("http://thumbs.reddit.com/t5_2s10b_0.png"); background-position: 0px -120px; width: 16px; height: 16px; float: right; cursor: pointer; }');
			
			this.commentNavBox = createElementWithID('div','REScommentNavBox');
			var commentArea = document.body.querySelector('div.sitetable.nestedlisting');
			if (commentArea) {
				this.commentNavToggle = createElementWithID('div','REScommentNavToggle');
				this.commentNavToggle.addEventListener('click', modules['commentNavigator'].toggleNavigator, false);
				commentArea.insertBefore(this.commentNavToggle,commentArea.firstChild);
				if (!(this.options.showByDefault.value)) {
					this.commentNavBox.style.display = 'none';
					this.commentNavToggle.innerHTML = 'Show Comment Navigator';
				} else {
					this.commentNavToggle.innerHTML = 'Hide Comment Navigator';
				}
				this.commentNavBox.addEventListener('mouseover', function(e) {
					this.style.opacity = 1;
				}, false);
				this.commentNavBox.addEventListener('mouseout', function(e) {
					this.style.opacity = 0.3;
				}, false);
				this.commentNavBox.innerHTML = ' \
					\
					<div id="commentNavLeft"> \
						Navigate by: <br> \
						<select id="commentNavBy"> \
							<option name=""></option> \
							<option name="submitter">submitter</option> \
							<option name="moderator">moderator</option> \
							<option name="admin">admin</option> \
							<option name="friend">friend</option> \
							<option name="popular">popular</option> \
						</select> \
					</div> \
					<div id="commentNavButtons"> \
						<div id="commentNavUp"></div> <div id="commentNavPostCount"></div> <div id="commentNavDown"></div> \
					</div> \
					<div id="commentNavCloseButton"> \
					</div> \
				';
				this.posts = new Array();
				this.nav = new Array();
				this.navSelect = this.commentNavBox.querySelector('#commentNavBy');
				this.commentNavPostCount = this.commentNavBox.querySelector('#commentNavPostCount');
				this.commentNavButtons = this.commentNavBox.querySelector('#commentNavButtons');
				this.commentNavCloseButton = this.commentNavBox.querySelector('#commentNavCloseButton');
				this.commentNavCloseButton.addEventListener('click',function(e) {
					RESUtils.click(modules['commentNavigator'].commentNavToggle);
				}, false);
				this.commentNavUp = this.commentNavBox.querySelector('#commentNavUp');
				this.commentNavUp.addEventListener('click',modules['commentNavigator'].moveUp, false);
				this.commentNavDown = this.commentNavBox.querySelector('#commentNavDown');
				this.commentNavDown.addEventListener('click',modules['commentNavigator'].moveDown, false);
				this.navSelect.addEventListener('change', function(e) {
					modules['commentNavigator'].currentCategory = this.options[this.selectedIndex].value;
					if (modules['commentNavigator'].currentCategory != '') {
						modules['commentNavigator'].getPostsByCategory(this.currentCategory);
						modules['commentNavigator'].commentNavButtons.style.display = 'block';
					} else {
						modules['commentNavigator'].commentNavButtons.style.display = 'none';
					}
				}, false);
				document.body.appendChild(this.commentNavBox);
			}
		}
	},
	toggleNavigator: function() {
		if (modules['commentNavigator'].commentNavBox.style.display == 'none') {
			modules['commentNavigator'].commentNavToggle.innerHTML = 'Hide Comment Navigator';
			modules['commentNavigator'].commentNavBox.style.display = 'block';
		} else {
			modules['commentNavigator'].commentNavToggle.innerHTML = 'Show Comment Navigator';
			modules['commentNavigator'].commentNavBox.style.display = 'none';
		}
	},
	getPostsByCategory: function () {
		var category = modules['commentNavigator'].currentCategory;
		if ((typeof(category) != 'undefined') && (category != '')) {
			if (typeof(this.posts[category]) == 'undefined') {
				switch (category) {
					case 'submitter':
					case 'moderator':
					case 'friend':
					case 'admin':
						this.posts[category] = document.querySelectorAll('.noncollapsed a.author.'+category);
						break;
					case 'popular':
						var allComments = document.querySelectorAll('.noncollapsed');
						var commentsObj = new Array();
						for (var i=0, len=allComments.length; i<len; i++) {
							var thisScore = allComments[i].querySelector('.unvoted');
							if (thisScore) {
								var scoreSplit = thisScore.innerHTML.split(' ');
								var score = scoreSplit[0];
							} else {
								var score = 0;
							}
							commentsObj[i] = {
								comment: allComments[i],
								score: score
							}
						}
						commentsObj.sort(function(a, b) {
							return parseInt(b.score) - parseInt(a.score);
						});
						this.posts[category] = new Array();
						for (var i=0, len=commentsObj.length; i<len; i++) {
							this.posts[category][i] = commentsObj[i].comment;
						}
						break;
				}
				this.nav[category] = 0;
			}
			if (this.posts[category].length) {
				modules['commentNavigator'].scrollToNavElement();
			} else {
				modules['commentNavigator'].commentNavPostCount.innerHTML = 'none';
			}
		}
	},
	moveUp: function() {
		var category = modules['commentNavigator'].currentCategory;
		if (modules['commentNavigator'].posts[category].length) {
			if (modules['commentNavigator'].nav[category] > 0) {
				modules['commentNavigator'].nav[category]--;
			}
			modules['commentNavigator'].scrollToNavElement();
		}
	},
	moveDown: function() {
		var category = modules['commentNavigator'].currentCategory;
		if (modules['commentNavigator'].posts[category].length) {
			if (modules['commentNavigator'].nav[category] < modules['commentNavigator'].posts[category].length - 1) {
				modules['commentNavigator'].nav[category]++;
			}
			modules['commentNavigator'].scrollToNavElement();
		}
	},
	scrollToNavElement: function() {
		var category = modules['commentNavigator'].currentCategory;
		modules['commentNavigator'].commentNavPostCount.innerHTML = modules['commentNavigator'].nav[category]+1 + '/' + modules['commentNavigator'].posts[category].length;
		thisXY=RESUtils.getXYpos(modules['commentNavigator'].posts[category][modules['commentNavigator'].nav[category]]);
		window.scrollTo(0,thisXY.y);
	}
}; 

modules['resMax'] = {
	moduleID: 'resMax',
	moduleName: 'RES Max',
	options: {
		// any configurable options you have go here...
		// options must have a type and a value.. 
		// valid types are: text, boolean (if boolean, value must be true or false)
		// for example:
		/*defaultMessage: {
			type: 'text',
			value: 'this is default text',
			description: 'explanation of what this option is for'
		},
		doSpecialStuff: {
			type: 'boolean',
			value: false,
			description: 'explanation of what this option is for'
		}*/
	},
	description: 'Reddit Max for RES!',
	isEnabled: function() {
		return RESConsole.getModulePrefs(this.moduleID);
	},
	include: Array(
		/https?:\/\/www.reddit.com\/*/i
	),
	isMatchURL: function() {
		return RESUtils.isMatchURL(this.moduleID);
	},
	go: function() {
		if ((this.isEnabled()) && (this.isMatchURL())) {
			var myList = document.getElementById('sr-header-area').getElementsByClassName('dropdown');
			var loggedIn = false;
			if (myList.length == 1)
			{
				loggedIn=true;
			}

			var popBar = document.getElementById('sr-bar').getElementsByTagName('a');
			var specBar = document.getElementById('sr-header-area').getElementsByTagName('ul')[0].getElementsByTagName('a');
			var popList = '<a class="choice " href="http://www.reddit.com/">home</a>';			
			for (i=0; i<specBar.length; i++) popList += '<a class="choice " href="' + specBar[i] + '">' + specBar[i].innerHTML + '</a>';
			for (i=0; i<popBar.length; i++) popList += '<a class="choice " href="' + popBar[i] + '">' + popBar[i].innerHTML + '</a>';

			var dropData = new Array();
			var dropClassNames = new Array();
			var dropOnClick = new Array();

			if (loggedIn)
			{
			myList[0].setAttribute('onclick', '$(this).siblings(".drop-choices.srdrop").not(".inuse").addClass("active inuse");');
			document.getElementById('header-bottom-right').style.display = 'none';

			var havemail = false;
			var isMod = false;
			var modHaveMail = false;

			if (document.getElementById('mail').className == 'havemail') havemail=true;
			if (document.getElementById('modmail'))
			{
				isMod=true;
				if (document.getElementById('modmail').className == 'havemail') modHaveMail=true;
			}

			var userName = document.getElementById('header-bottom-right').getElementsByClassName('user')[0].getElementsByTagName('a')[0];
			var userKarma = document.getElementById('header-bottom-right').getElementsByClassName('user')[0].getElementsByTagName('b')[0];
			var logOutForm = document.getElementById('header-bottom-right').getElementsByClassName('logout ')[0];
			
			var userList = '';
			var imgList = '';

			userList += '<a class="choice " href="http://www.reddit.com/submit">submit content</a>';
			userList += '<a class="choice " href="http://www.reddit.com/reddits/create">create sub-reddit</a>';
			userList += '<a class="choice " href="http://www.reddit.com/reddits/">edit subscriptions</a>';
			userList += '<form class="logout hover" action="/logout" method="post">' + logOutForm.innerHTML + '</form>';

			userList += '<span class="subMenu">User Overview</span>';
			userList += '<a class="choice " href="' + userName + '">overview</a>';
			userList += '<a class="choice " href="' + userName + 'comments">comments</a>';
			userList += '<a class="choice " href="' + userName + 'submitted">posted</a>';
			userList += '<a class="choice " href="' + userName + 'liked">liked</a>';
			userList += '<a class="choice " href="' + userName + 'disliked">disliked</a>';
			userList += '<a class="choice " href="' + userName + 'hidden">hidden</a>';

			userList += '<span class="subMenu">Inbox</span>';
			userList += '<a class="choice " href="http://www.reddit.com/message/compose/">compose</a>';
			userList += '<a class="choice " href="http://www.reddit.com/message/sent/">sent</a>';
			userList += '<a class="choice " href="http://www.reddit.com/message/inbox/">all</a>';
			if (havemail) userList += '<a class="choice " style="color:orangered;" href="http://www.reddit.com/message/unread/">unread</a>';
			else userList += '<a class="choice " href="http://www.reddit.com/message/unread/">unread</a>';
			userList += '<a class="choice " href="http://www.reddit.com/message/messages/">messages</a>';
			userList += '<a class="choice " href="http://www.reddit.com/message/comments/">comment replies</a>';
			userList += '<a class="choice " href="http://www.reddit.com/message/selfreply/">post replies</a>';
			
			RESList = '';

			if (isMod)
			{
				userList += '<span class="subMenu">Mod Inbox</span>';
				userList += '<a class="choice " href="http://www.reddit.com/message/moderator/inbox/">all moderator mail</a>';
				if (modHaveMail) userList += '<a class="choice " style="color:orangered;" href="http://www.reddit.com/message/moderator/unread/">unread moderator mail</a>';
				else userList += '<a class="choice " href="http://www.reddit.com/message/moderator/unread/">unread moderator mail</a>';
			}

			userList += '<span class="subMenu">Preferences</span>';
			userList += '<a class="choice " href="http://www.reddit.com/prefs/">options</a>';
			userList += '<a class="choice " href="http://www.reddit.com/prefs/feeds/">RSS feeds</a>';
			userList += '<a class="choice " href="http://www.reddit.com/prefs/friends/">mates</a>';
			userList += '<a class="choice " href="http://www.reddit.com/prefs/update/">password/e-mail</a>';
			userList += '<a class="choice " href="http://www.reddit.com/prefs/delete/">delete</a>';
			
			dropData[0] = '<span class="selected title">popular</span>';
			if (havemail) dropData[1] = '<span class="selected title"><img src="/static/mail.png" alt="messages"> ' + userName.innerHTML + ' (' + userKarma.innerHTML + ')' + '</span>';
			else dropData[1] = '<span class="selected title"><img src="/static/mailgray.png" alt="messages"> ' + userName.innerHTML + ' (' + userKarma.innerHTML + ')' + '</span>';
			dropData[2] = popList;
			dropData[3] = userList;
			//dropData[4] = '<a href="http://www.reddit.com/">home</a>';

			dropClassNames[0] = 'dropdown popbar ';
			dropClassNames[1] = 'dropdown userbar ';
			dropClassNames[2] = 'drop-choices popbar ';
			dropClassNames[3] = 'drop-choices userbar ';
			//dropClassNames[4] = 'myhome';

			dropOnClick[0] = '$(this).siblings(".drop-choices.popbar").not(".inuse").addClass("active inuse");';
			dropOnClick[1] = '$(this).siblings(".drop-choices.userbar").not(".inuse").addClass("active inuse");';
			dropOnClick[2] = '';
			dropOnClick[3] = '';
			//dropOnClick[4] = '';
			}
			else
			{
			dropData[0] = '<span class="selected title">popular</span>';
			dropData[1] = popList;
			//dropData[2] = '<a href="http://www.reddit.com/">home</a>';

			dropClassNames[0] = 'dropdown popbar ';
			dropClassNames[1] = 'drop-choices popbar ';
			//dropClassNames[2] = 'myhome';

			dropOnClick[0] = '$(this).siblings(".drop-choices.popbar").not(".inuse").addClass("active inuse");';
			dropOnClick[1] = '';
			//dropOnClick[2] = '';
			}

			menu = document.getElementById('sr-header-area');
			menuEnd = menu.getElementsByTagName('ul')[0];

			for (i=0; i<dropData.length; i++) {
			  var menuItem = document.createElement('div');
			  if (dropClassNames[i] != '') menuItem.className = dropClassNames[i];
			  if (dropOnClick[i] != '') menuItem.setAttribute('onclick', dropOnClick[i]);
			  menuItem.innerHTML = dropData[i];
			  menu.insertBefore(menuItem, menuEnd);
			}
			
			//var userBar = document.getElementsByClassName('drop-choices userbar')[0];
			var resPrefs = document.getElementById('openRESPrefs');
			resPrefs.className = 'choice ';
			document.getElementsByClassName('drop-choices userbar')[0].appendChild(resPrefs);
			
			var colorScheme = document.getElementById('lightSwitch');
			var accSwitcher = document.getElementById('header-bottom-right').getElementsByClassName('user')[0].getElementsByTagName('img')[0];			
			
			menu.appendChild(colorScheme);
			
			var userIcon = document.createElement('img');
			userIcon.setAttribute('id', 'uaccIcon');
			userIcon.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAL9JREFUeNp80L9KwnEUBfCPv36hadQmba2tQtHmIPQOPkcQRCj0KOYohKCU0dasky/g4ibN9oei5QrfSj1w4R7O4dzLKXR6DxIUcYwCZvhYCVli2sMVnjDCJUorMU+MDVyjEryFKR7/Jp4lJrGfrju9wFfCv/G6zjjEJOHT+Pffj2+4wzL4faTu4jOLKi4wQBP9mCZe0MZBjipucR5Jdb9xg3GGI5zYjB3Usih633Yc5pijG52VUA5xiffQn38GAIVlInlxoSJtAAAAAElFTkSuQmCC');
			
			menu.appendChild(userIcon);
			accSwitcher.setAttribute('id', 'uaccSelect');
			menu.appendChild(accSwitcher);
			
			var bitCoin = document.createElement('img');
			bitCoin.setAttribute('id', 'bitCoin');
			bitCoin.className = 'dropdown donatebar ';
			bitCoin.setAttribute('onclick', '$(this).siblings(".drop-choices.donatebar").not(".inuse").addClass("active inuse");');
			bitCoin.setAttribute('width', '14px');
			bitCoin.setAttribute('height', '14px');
			bitCoin.setAttribute('vertical-align', 'middle');
			bitCoin.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAB4AXACp7D9eBAAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sFEgkpJYZOJgsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADq0lEQVQ4ywXBfUyUdQDA8e/vee547p2HOzju4HzQQyIUX3H4Nicr5xZOl43UVZtzLVv912zmavlSuTZ1rvWHLkqzZWuORuUfam0u2NTBRGZmCsaZIhzXHQccd9xxd/D8+nwEQPv7fjY1N9Gw6yrHXhd11YGKjwwj1OJw2g2h2cxUPB4ZeBT5vf9+9sjFm0ycfNuG7tR563QMce5ggDdPxAD49oNgR9PqpW3LVjaC5gRTYmYySAHmvKSn9w7dN26d/vh7Dny+34ZbcyPudexg+auX+fHowqGXt7fW2ny6TMXGiQwOiezMNKaU1IQbCBphWWIRjE8nxbmz7b2HzhfWHX5NQT3bMciFQ1U/7N7TtlnzeGRfV494GvlXCD1Mpmhn8yvv0td1lfBCQ+QUhN64RIZrjJA92eP/7JK8on7SxoKtu3afrww3yntd3WIiXaSsZgV6ZQiPtwJ/oIroWJSCVSFYVcZMYlz4wotkauxJc0kmcUbdu9M4sWXPvjXpWJzc5LRQNQclnkoa1mwgOTbCcOQha1tacXqqeNj3BwGbFaGYBCr94v7d2w5lYV19CxaFdDwmNM1Oua6Tjg2BamHoQT+V2jh3bl3H7i1nOjmJVbMym5gQXq8XXXe8aLG7nAYlAit57N5SQMUxMwvFIqvWvwBI1tQ2MNh3E1nMEosmsFg1HHopTqczbDHnZiXpFFLOo1rA7nLhLuZBEfwz8Be5qQRjI09pamlldnqc9OQz3D4/CBVz3hRKJjn5hFwaj7cUp8OCVVPIFwogFArZNMuXLOK/JwMgJQ6Pl1QmiyJMyOVIpdPDyuNI5LpMT6HabDKfzTI2GidUtx7mijRvfgmLr57WfQcw87PcvfUb0sxT5tHkcCTC1HShS13mz952ebSDgepq8vmcKMwWePTwb8YTCWLREeqXruLil58y0HsNn13BMKrwBoJ0Xr4mRuPpNvXGINnVCyYqFodrm516mdRURahzeXIFydREEt1bTmZ0iHBNGGNpE6HnG+Wf/XfF9e7en774hXb1wocL2H8qfqXeN9L6XMPKkGfxCulylWFVTFFR5iaXnqJ2xTqMTduku2YtAw96xMX2r5+e7GTje9tB3bnJya4tQfYeH/6mUvR75oVzQzBQLUqNAO5ACD1Ug81XTmr0sfj1q6Pi6qWOzhM/swFg20Y3AuDCoRC5OZN3TkXZUY5n4w7rEX+waqvLXVpXLJpqMj72LBpNdqdmOH7mGkPH3gChujj8XYb/AR/Ef/rphCP6AAAAAElFTkSuQmCC');
			
			var donateBar = document.createElement('div');
			donateBar.className = 'drop-choices donatebar ';
			donateBar.setAttribute('id', 'donBar');			
			donateBar.innerHTML = '<ul id="donation-list"><li>RES: <a href="http://reddit.honestbleeps.com/" target="_blank">reddit.honestbleeps.com</a><li>RESMax: <a href="javascript:void(0)" onclick="prompt(\'Donations can be made to the following bitcoin address:\', \'1DSpSwV2vmVGrhA3iy95tj5VYXfYMoNP3a\')">1DSpSwV2vmVGrhA3iy95tj5VYXfYMoNP3a</a></li></ul>';

			menu.appendChild(bitCoin);
			menu.appendChild(donateBar);
			
			side = document.getElementsByClassName('side')[0];

			if (side)
			{
				headerImg = document.getElementById('header-img-a');
				sideSpacer = side.getElementsByTagName('div')[0];
				sideImg = document.createElement('div');
				sideImg.className = 'spacer';
				sideImg.innerHTML = '<a id="side-header-img-a" href="' + headerImg + '" title="' + headerImg.getAttribute('title') + '">' + headerImg.innerHTML + '</a>';
				side.insertBefore(sideImg, sideSpacer);
			}

			var siteLinks = document.getElementsByClassName('link');

			for (var i = 0; i < siteLinks.length; i++)
			{
				var imgSrc = siteLinks[i].getElementsByClassName('thumbnail')[0].getElementsByTagName('img')[0].getAttribute("src");
				if (imgSrc == '/static/noimage.png' || imgSrc == '/static/self_default2.png')
				{
					siteLinks[i].getElementsByClassName('thumbnail')[0].getElementsByTagName('img')[0].parentNode.setAttribute('style', 'display: none !important;');
				}
			}
			
			RESUtils.addCSS('body > div.content { margin-top: 20px !important; }');
			RESUtils.addCSS('h1 { margin: 0 !important; font-size: 200% !important; text-transform: uppercase !important; }');
			RESUtils.addCSS('#header { position: fixed !important; padding: 0 10px 0 10px !important; top: 0 !important; height: 16px !important; left: 0px !important; right: 0px !important; }');
			RESUtils.addCSS('#sr-header-area { display: inline-block !important; float: right !important; width: auto !important; background-color: transparent !important; border: none !important; white-space: normal !important; padding: 0 !important; }');
			RESUtils.addCSS('#sr-header-area > ul { display: none !important; }');
			RESUtils.addCSS('#sr-header-area span.separator { display: none !important; }');
			RESUtils.addCSS('#sr-more-link { display: none !important; }');
			RESUtils.addCSS('#header-bottom-right { right: 330px !important; display:none !important;}');
			RESUtils.addCSS('#header-img-a { display: none !important; }');
			RESUtils.addCSS('#sr-header-area .dropdown .selected { background: url("http://www.reddit.com/static/droparrowgray.gif") no-repeat scroll right center transparent !important; display: inline-block !important; margin-left: 0 !important; margin-right: 0 !important; padding-left: 5px !important; padding-right: 18px !important; font-weight: bold !important; cursor: pointer !important; vertical-align: middle !important; }');
			RESUtils.addCSS('#sr-header-area .drop-choices { margin-top: 0 !important; position: fixed !important; right: 0 !important; white-space: normal !important; width: 470px !important; left: auto !important; }');
			RESUtils.addCSS('#sr-header-area .drop-choices a.choice { display: inline-block !important; padding: 2px 5px 1px 5px !important; }');
			RESUtils.addCSS('#sr-header-area .srdrop .choice.bottom-option { display: none !important; }');
			RESUtils.addCSS('span.subMenu { display: block !important; }');
			RESUtils.addCSS('form.logout { display: inline-block !important; }');
			RESUtils.addCSS('form.logout a { padding: 2px 5px 1px 5px !important; }');
			RESUtils.addCSS('.pagename { font-size: 100% !important; font-variant: normal !important; margin-right: 10px !important; }');
			RESUtils.addCSS('.tabmenu { margin-top: 0 !important; }');
			RESUtils.addCSS('.tabmenu li a { padding: 0 5px 0 5px !important; }');
			RESUtils.addCSS('.tabmenu li.selected a { border-top: none !important; }');
			RESUtils.addCSS('.userbar .selected img { position: relative !important; top: 1px !important; }');
			RESUtils.addCSS('#openRESPrefs { display: inline-block !important; margin-left: 0 !important; margin-right: 0 !important; padding-left: 5px !important; font-weight: bold !important; cursor: pointer !important; }');
			RESUtils.addCSS('#NREMail { display: none !important; }');
			RESUtils.addCSS('#lightSwitch { margin: 0 5px !important; vertical-align: middle !important; }');
			RESUtils.addCSS('#accountSwitcherMenu { position: fixed !important; right: 1px !important; left: inherit !important; top: 17px !important; }');
			RESUtils.addCSS('#uaccSelect { margin-left: 0 !important; vertical-align: middle !important; }');
			RESUtils.addCSS('#bitCoin, #uaccIcon { margin-left: 5px !important; vertical-align: middle !important; }');
			RESUtils.addCSS('#bitCoin:hover {cursor: pointer !important; }');
			RESUtils.addCSS('#donbar { display: block !important; }');
			RESUtils.addCSS('.link .midcol { width: 44px !important; margin: 0 5px !important; padding: 5px !important; border-radius: 7px; }');
			RESUtils.addCSS('.link .midcol .arrow { margin: auto !important; }');
			RESUtils.addCSS('.link.last-clicked { border: none !important; }');
			RESUtils.addCSS('.pretty-form input[type="text"], .pretty-form textarea, .pretty-form input[type="password"] { box-shadow: none !important; }');
			RESUtils.addCSS('.linefield.usertext .infobar, .pretty-form .infobar { width: auto !important; margin: 5px !important; padding: 5px !important; }');
			
		}
	}
};

if ((!localStorageFail) && (localStorage.getItem('RESPro_secret') == 'true')) {

	modules['RESPro'] = {
		moduleID: 'RESPro',
		moduleName: 'RES Pro',
		options: {
			// any configurable options you have go here...
			// options must have a type and a value.. 
			// valid types are: text, boolean (if boolean, value must be true or false)
			// for example:
			username: {
				type: 'text',
				value: '',
				description: 'Your RES Pro username'
			},
			password: {
				type: 'password',
				value: '',
				description: 'Your RES Pro password'
			}
		},
		description: 'This is my module!',
		isEnabled: function() {
			return RESConsole.getModulePrefs(this.moduleID);
		},
		include: Array(
			/https?:\/\/([a-z]+).reddit.com\/?/i,
			/https?:\/\/([a-z]+).reddit.com\/[-\w\.\/]+/i
		),
		isMatchURL: function() {
			return RESUtils.isMatchURL(this.moduleID);
		},
		go: function() {
			if ((this.isEnabled()) && (this.isMatchURL())) {
				// get this module's options...
				// RESUtils.getOptions(this.moduleID);
				// do stuff now!
				//	this.RESProLink = createElementWithID('div','RESPRo');
				//	this.RESProLink.innerHTML = '(p)';
				//	this.RESProLink.style.cursor = 'pointer';
				//	this.RESProLink.addEventListener('click', this.authenticate, false);
				//	console.log('hi');
				//	insertAfter(RESConsole.RESPrefsLink, this.RESProLink);
			}
		},
		saveModuleData: function(module) {
			switch(module){
				case 'userTagger':
					// THIS IS NOT READY YET!  We need to merge votes on the backend.. hard stuff...
					// in this case, we want to send the JSON from RESmodules.userTagger.tags;
					var tags = RESStorage.getItem('RESmodules.userTagger.tags');
					GM_xmlhttpRequest({
						method:	"POST",
						url:	'http://reddit.honestbleeps.com/RESsync.php',
						data: 'action=PUT&type=module_data&module='+module+'&data='+tags,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						onload:	function(response) {
							var resp = JSON.parse(response.responseText);
							// console.log(resp);
							if (resp.success) {
								RESConsole.proUserTaggerSaveButton.innerHTML = 'Saved!';
							} else {
								alert(response.responseText);
							}
						}
					});
					break;
				case 'saveComments':
					var savedComments = RESStorage.getItem('RESmodules.saveComments.savedComments');
					GM_xmlhttpRequest({
						method:	"POST",
						url:	'http://reddit.honestbleeps.com/RESsync.php',
						data: 'action=PUT&type=module_data&module='+module+'&data='+savedComments,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						onload:	function(response) {
							var resp = JSON.parse(response.responseText);
							// console.log(resp);
							if (resp.success) {
								RESConsole.proSaveCommentsSaveButton.innerHTML = 'Saved!';
							} else {
								alert(response.responseText);
							}
						}
					});
					break;
				default:
					console.log('invalid module specified: ' + module);
					break;
			}
		},
		getModuleData: function(module) {
			switch(module){
				case 'saveComments':
					RESConsole.proSaveCommentsGetButton.innerHTML = 'Loading...';
					GM_xmlhttpRequest({
						method:	"POST",
						url:	'http://reddit.honestbleeps.com/RESsync.php',
						data: 'action=GET&type=module_data&module='+module,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						onload:	function(response) {
							var resp = JSON.parse(response.responseText);
							if (resp.success) {
								var modulePrefs = JSON.parse(response.responseText);
								var prefsData = modulePrefs.data;
								// console.log(JSON.stringify(prefsData));
								RESStorage.setItem('RESmodules.saveComments.savedComments', JSON.stringify(prefsData));
								RESConsole.proSaveCommentsGetButton.innerHTML = 'Saved Comments Loaded!';
							} else {
								alert(response.responseText);
							}
						}
					});
					break;
				default:
					console.log('invalid module specified: ' + module);
					break;
			}
		},
		savePrefs: function() {
			// (typeof(unsafeWindow) != 'undefined') ? ls = unsafeWindow.localStorage : ls = localStorage;
			RESConsole.proSaveButton.innerHTML = 'Saving...';
			var RESOptions = {};
			// for (var i = 0, len=ls.length; i < len; i++) {
			for(var i in RESStorage) {
				if ((typeof(RESStorage.getItem(i)) != 'function') && (typeof(RESStorage.getItem(i)) != 'undefined')) {
					var keySplit = i.split('.');
					if (keySplit) {
						var keyRoot = keySplit[0];
						switch (keyRoot) {
							case 'RES':
								var thisNode = keySplit[1];
								if (thisNode == 'modulePrefs') {
									RESOptions[thisNode] = safeJSON.parse(RESStorage.getItem(i), i);
								}
								break;
							case 'RESoptions':
								var thisModule = keySplit[1];
								if (thisModule != 'accountSwitcher') {
									RESOptions[thisModule] = safeJSON.parse(RESStorage.getItem(i), i);
								}
								break;
							default:
								//console.log('Not currently handling keys with root: ' + keyRoot);
								break;
						}
					}
				}
			}
			// Post options blob.
			var RESOptionsString = JSON.stringify(RESOptions);
			GM_xmlhttpRequest({
				method:	"POST",
				url:	'http://reddit.honestbleeps.com/RESsync.php',
				data: 'action=PUT&type=all_options&data='+RESOptionsString,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload:	function(response) {
					var resp = JSON.parse(response.responseText);
					// console.log(resp);
					if (resp.success) {
						RESConsole.proSaveButton.innerHTML = 'Saved!';
					} else {
						alert(response.responseText);
					}
				}
			});
		},
		getPrefs: function() {
			RESConsole.proGetButton.innerHTML = 'Loading...';
			GM_xmlhttpRequest({
				method:	"POST",
				url:	'http://reddit.honestbleeps.com/RESsync.php',
				data: 'action=GET&type=all_options',
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload:	function(response) {
					var resp = JSON.parse(response.responseText);
					if (resp.success) {
						var modulePrefs = JSON.parse(response.responseText);
						var prefsData = modulePrefs.data;
						//console.log('prefsData:');
						//console.log(prefsData);
						for (thisModule in prefsData){
							if (thisModule == 'modulePrefs') {
								var thisOptions = prefsData[thisModule];
								RESStorage.setItem('RES.modulePrefs',JSON.stringify(thisOptions));
							} else {
								var thisOptions = prefsData[thisModule];
								RESStorage.setItem('RESoptions.'+thisModule,JSON.stringify(thisOptions));
							}
						}
						RESConsole.proGetButton.innerHTML = 'Preferences Loaded!';
						// console.log(response.responseText);
					} else {
						alert(response.responseText);
					}
				}
			});
		},
		configure: function() {
			// RESConsole.open();
			RESConsole.menuClick(document.getElementById('Menu-Configure Modules'));
			RESConsole.drawConfigOptions('RESPro');
		},
		authenticate: function() {
			if ((modules['RESPro'].options.password.value == '') || (modules['RESPro'].options.password.value == '')) {
				this.configure();
			} else {
				GM_xmlhttpRequest({
					method:	"POST",
					url:	'http://reddit.honestbleeps.com/RESlogin.php',
					data: 'uname='+modules['RESPro'].options.username.value+'&pwd='+modules['RESPro'].options.password.value,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload:	function(response) {
						var resp = JSON.parse(response.responseText);
						if (resp.success) {
							RESConsole.proAuthButton.innerHTML = 'Authenticated!';
						} else {
							RESConsole.proAuthButton.innerHTML = 'Authentication failed.';
						}
					}
				});
			}
		}
	}; 
}

/*
	* Konami-JS ~ 
	* :: Now with support for touch events and multiple instances for 
	* :: those situations that call for multiple easter eggs!
	* Code: http://konami-js.googlecode.com/
	* Examples: http://www.snaptortoise.com/konami-js
	* Copyright (c) 2009 George Mandis (georgemandis.com, snaptortoise.com)
	* Version: 1.3.2 (7/02/2010)
	* Licensed under the GNU General Public License v3
	* http://www.gnu.org/copyleft/gpl.html
	* Tested in: Safari 4+, Google Chrome 4+, Firefox 3+, IE7+ and Mobile Safari 2.2.1
*/
var Konami = function() {
	var konami= {
			addEvent:function ( obj, type, fn, ref_obj )
			{
				if (obj.addEventListener)
					obj.addEventListener( type, fn, false );
				else if (obj.attachEvent)
				{
					// IE
					obj["e"+type+fn] = fn;
					obj[type+fn] = function() { obj["e"+type+fn]( window.event,ref_obj ); }
	
					obj.attachEvent( "on"+type, obj[type+fn] );
				}
			},
	        input:"",
	        pattern:"3838404037393739666513",
	        load: function(link) {	
				
				this.addEvent(document,"keydown", function(e,ref_obj) {											
					if (ref_obj) konami = ref_obj; // IE
					konami.input+= e ? e.keyCode : event.keyCode;
					if (konami.input.length > konami.pattern.length) konami.input = konami.input.substr((konami.input.length - konami.pattern.length));
					if (konami.input == konami.pattern) {
                    konami.code(link);
					konami.input="";
                   	return;
                    }
            	},this);
           this.iphone.load(link)
	                
				},
	        code: function(link) { window.location=link},
	        iphone:{
	                start_x:0,
	                start_y:0,
	                stop_x:0,
	                stop_y:0,
	                tap:false,
	                capture:false,
									orig_keys:"",
	                keys:["UP","UP","DOWN","DOWN","LEFT","RIGHT","LEFT","RIGHT","TAP","TAP","TAP"],
	                code: function(link) { konami.code(link);},
	                load: function(link){
										orig_keys = this.keys;
	    							konami.addEvent(document,"touchmove",function(e){
	                          if(e.touches.length == 1 && konami.iphone.capture==true){ 
	                            var touch = e.touches[0]; 
	                                konami.iphone.stop_x = touch.pageX;
	                                konami.iphone.stop_y = touch.pageY;
	                                konami.iphone.tap = false; 
	                                konami.iphone.capture=false;
	                                konami.iphone.check_direction();
	                                }
	                                });               
	                        konami.addEvent(document,"touchend",function(evt){
	                                if (konami.iphone.tap==true) konami.iphone.check_direction(link);           
	                                },false);
	                        konami.addEvent(document,"touchstart", function(evt){
	                                konami.iphone.start_x = evt.changedTouches[0].pageX
	                                konami.iphone.start_y = evt.changedTouches[0].pageY
	                                konami.iphone.tap = true
	                                konami.iphone.capture = true
	                                });               
	                                },
	                check_direction: function(link){
	                        x_magnitude = Math.abs(this.start_x-this.stop_x)
	                        y_magnitude = Math.abs(this.start_y-this.stop_y)
	                        x = ((this.start_x-this.stop_x) < 0) ? "RIGHT" : "LEFT";
	                        y = ((this.start_y-this.stop_y) < 0) ? "DOWN" : "UP";
	                        result = (x_magnitude > y_magnitude) ? x : y;
	                        result = (this.tap==true) ? "TAP" : result;                     

	                        if (result==this.keys[0]) this.keys = this.keys.slice(1,this.keys.length)
	                        if (this.keys.length==0) { 
								this.keys=this.orig_keys;
								this.code(link)
							}
					}
	               }
	}
	return konami;
};

function RESInit() {
	if (localStorageFail) {
		RESFail = "Sorry, but localStorage seems inaccessible. Reddit Enhancement Suite can't work without it. \n\n";
		if (typeof(safari) != 'undefined') {
			RESFail += 'Since you\'re using Safari, it might be that you\'re in private browsing mode, which unfortunately is incompatible with RES until Safari provides a way to allow extensions localStorage access.';
		} else if (typeof(chrome) != 'undefined') {
			RESFail += 'Since you\'re using Chrome, you might just need to go to your extensions settings and check the "Allow in Incognito" box.';
		} else if (typeof(opera) != 'undefined') {
			RESFail += 'Since you\'re using Opera, you might just need to go to your extensions settings and click the gear icon, then click "privacy" and check the box that says "allow interaction with private tabs".';
		} else {
			RESFail += 'Since it looks like you\'re using Firefox, you probably need to go to about:config and ensure that dom.storage.enabled is set to true, and that dom.storage.default_quota is set to a number above zero (i.e. 5120, the normal default)".';
		}
		var userMenu = document.querySelector('#header-bottom-right');
		if (userMenu) {
			var preferencesUL = userMenu.querySelector('UL');
			var separator = document.createElement('span');
			separator.setAttribute('class','separator');
			separator.innerHTML = '|';
			RESPrefsLink = document.createElement('a');
			RESPrefsLink.setAttribute('href','javascript:void(0)');
			RESPrefsLink.addEventListener('click', function(e) {
				e.preventDefault();
				alert(RESFail);
			}, true);
			RESPrefsLink.innerHTML = '[RES - ERROR]';
			RESPrefsLink.setAttribute('style','color: red; font-weight: bold;');
			insertAfter(preferencesUL, RESPrefsLink);
			insertAfter(preferencesUL, separator);
		}
	} else {
		// Don't fire the script on the iframe. This annoyingly fires this whole thing twice. Yuck.
		// Also don't fire it on static.reddit or thumbs.reddit, as those are just images.
		if ((location.href.match(/comscore-iframe/i)) || (location.href.match(/static\.reddit/i)) || (location.href.match(/thumbs\.reddit/i))) {
			// do nothing.
			return false;
		}
		document.body.addEventListener('mousemove', RESUtils.setMouseXY, false);
		// added this if statement because some people's Greasemonkey "include" lines are getting borked or ignored, so they're calling RES on non-reddit pages.
		if (location.href.match(/^(http|https):\/\/([\w]+.)?reddit\.com/i)) {
			//RESUtils.checkForUpdate();
			// add the config console link...
			RESConsole.create();
			RESConsole.addConsoleLink();
			var userNameEle = document.querySelector('#header-bottom-right span a');
			if ((typeof(userNameEle) != 'undefined') && (userNameEle != null)) {
				RESUtils.userName = userNameEle.text;
			}
			RESUtils.checkIfSubmitting();
			// first, go through each module and set all of the options so that if a module needs to check another module's options, they're ready...
			// console.log('get options start: ' + Date());
			for (i in modules) {
				thisModuleID = i;
				if (typeof(modules[thisModuleID]) == 'object') {
					RESUtils.getOptions(thisModuleID);
				}
			}
			// console.log('get options end: ' + Date());
			// go through each module and run it
			for (i in modules) {
				thisModuleID = i;
				if (typeof(modules[thisModuleID]) == 'object') {
					  //console.log(thisModuleID + ' start: ' + Date());
					  //perfTest(thisModuleID+' start');
					modules[thisModuleID].go();
					  //perfTest(thisModuleID+' end');
					  //console.log(thisModuleID + ' end: ' + Date());
				}
			}
			GM_addStyle(RESUtils.css);
		//	console.log('end: ' + Date());
		}
		if (location.href.match(/reddit.honestbleeps.com\/download/)) {
			var installLinks = document.body.querySelectorAll('.install');
			for (var i=0, len=installLinks.length;i<len;i++) {
				addClass(installLinks[i], 'update');
				removeClass(installLinks[i], 'install');
			}
		}
		konami = new Konami();
		konami.code = function() {
			// modules['RESTips'].showTip('You have won ten internets! Now I will tell you a secret. RES Pro is coming soon.');
			// location.href = 'http://reddit.com/r/Enhancement/?I+AM+AWESOME!';
			// location.href = 'http://www.youtube.com/watch?v=Zn-NuT-BAZk#t=6s';
			localStorage.setItem('RESPro_secret','true');
			modules['RESTips'].showTip('You have just unlocked RES Pro. Email steve@honestbleeps.com for temporary free access!');
		}
		konami.load();
	
	}
}

RESStorage = {};
function setUpRESStorage (response) {
	if (typeof(chrome) != 'undefined') {
		RESStorage = response;
		// we'll set up a method for getItem, but it's not adviseable to use since it's asynchronous...
		RESStorage.getItem = function(key) {
			if (typeof(RESStorage[key]) != 'undefined') return RESStorage[key];
			return null;
		}
		RESStorage.setItem = function(key, value) {
			// save it locally in the RESStorage variable, but also write it to the extension's localStorage...
			// It's OK that saving it is asynchronous since we're saving it in this local variable, too...
			RESStorage[key] = value;
			var thisJSON =  {
				requestType: 'localStorage',
				operation: 'setItem',
				itemName: key,
				itemValue: value
			}
			chrome.extension.sendRequest(thisJSON, function(response) {
				// this is an asynchronous response, we don't really need to do anything here...
			});
		}
		RESStorage.removeItem = function(key) {
			// delete it locally in the RESStorage variable, but also delete it from the extension's localStorage...
			// It's OK that deleting it is asynchronous since we're deleting it in this local variable, too...
			delete RESStorage[key];
			var thisJSON =  {
				requestType: 'localStorage',
				operation: 'removeItem',
				itemName: key
			}
			chrome.extension.sendRequest(thisJSON, function(response) {
				// this is an asynchronous response, we don't really need to do anything here...
			});
		}
		window.localStorage = RESStorage;
		RESInit();
	} else if (typeof(safari) != 'undefined') {
		RESStorage = response;
		// we'll set up a method for getItem, but it's not adviseable to use since it's asynchronous...
		RESStorage.getItem = function(key) {
			if (typeof(RESStorage[key]) != 'undefined') return RESStorage[key];
			return null;
		}
		RESStorage.setItem = function(key, value) {
			// save it locally in the RESStorage variable, but also write it to the extension's localStorage...
			// It's OK that saving it is asynchronous since we're saving it in this local variable, too...
			RESStorage[key] = value;
			var thisJSON =  {
				requestType: 'localStorage',
				operation: 'setItem',
				itemName: key,
				itemValue: value
			}
			safari.self.tab.dispatchMessage("localStorage", thisJSON);
		}
		RESStorage.removeItem = function(key) {
			// delete it locally in the RESStorage variable, but also delete it from the extension's localStorage...
			// It's OK that deleting it is asynchronous since we're deleting it in this local variable, too...
			delete RESStorage[key];
			var thisJSON =  {
				requestType: 'localStorage',
				operation: 'removeItem',
				itemName: key
			}
			safari.self.tab.dispatchMessage("localStorage", thisJSON);
		}
		window.localStorage = RESStorage;
	} else if (typeof(opera) != 'undefined') {
		RESStorage = response;
		// we'll set up a method for getItem, but it's not adviseable to use since it's asynchronous...
		RESStorage.getItem = function(key) {
			if (typeof(RESStorage[key]) != 'undefined') return RESStorage[key];
			return null;
		}
		RESStorage.setItem = function(key, value) {
			// save it locally in the RESStorage variable, but also write it to the extension's localStorage...
			// It's OK that saving it is asynchronous since we're saving it in this local variable, too...
			RESStorage[key] = value;
			var thisJSON =  {
				requestType: 'localStorage',
				operation: 'setItem',
				itemName: key,
				itemValue: value
			}
			opera.extension.postMessage(JSON.stringify(thisJSON));
		}
		RESStorage.removeItem = function(key) {
			// delete it locally in the RESStorage variable, but also delete it from the extension's localStorage...
			// It's OK that deleting it is asynchronous since we're deleting it in this local variable, too...
			delete RESStorage[key];
			var thisJSON =  {
				requestType: 'localStorage',
				operation: 'removeItem',
				itemName: key
			}
			opera.extension.postMessage(JSON.stringify(thisJSON));
		}
		window.localStorage = RESStorage;
	} else {
		// must be firefox...
		// RESStorage = localStorage;
		//
		// we'll set up a method for getItem, but it's not adviseable to use since it's asynchronous...
		RESStorage.getItem = function(key) {
			if (typeof(RESStorage[key]) != 'undefined') return RESStorage[key];
			RESStorage[key] = GM_getValue(key);
			return GM_getValue(key);
		}
		RESStorage.setItem = function(key, value) {
			// save it locally in the RESStorage variable, but also write it to the extension's localStorage...
			// It's OK that saving it is asynchronous since we're saving it in this local variable, too...
			// Wow, GM_setValue doesn't support big integers, so we have to store anything > 2147483647 as a string, so dumb.
			if (typeof(value) != 'undefined') {
				// if ((typeof(value) == 'number') && (value > 2147483647)) {
				if (typeof(value) == 'number') {
					value = value.toString();
				}
				RESStorage[key] = value;
				GM_setValue(key, value);
			}
			return true;
		}
		RESStorage.removeItem = function(key) {
			// delete it locally in the RESStorage variable, but also delete it from the extension's localStorage...
			// It's OK that deleting it is asynchronous since we're deleting it in this local variable, too...
			delete RESStorage[key];
			GM_deleteValue(key);
			return true;
		}
	}
}


if (typeof(opera) != 'undefined') {
	// I freaking hate having to use different code that won't run in other browsers to log debugs, so I'm overriding console.log with opera.postError here
	// so I don't have to litter my code with different statements for different browsers when debugging.
	console.log = opera.postError;
	opera.extension.addEventListener( "message", operaMessageHandler, false);	
	window.addEventListener("DOMContentLoaded", function(u) {
		// we've got opera, let's check for old localStorage...
		// RESInit() will be called from operaMessageHandler()
		thisJSON = {
			requestType: 'getLocalStorage'
		}
		opera.extension.postMessage(JSON.stringify(thisJSON));
	}, false);
} else {
	(function(u) {
		if (typeof(chrome) != 'undefined') {
			// we've got chrome, get a copy of the background page's localStorage first, so don't init until after.
			var thisJSON = {
				requestType: 'getLocalStorage'
			}
			chrome.extension.sendRequest(thisJSON, function(response) {
				// Does RESStorage have actual data in it?  If it doesn't, they're a legacy user, we need to copy 
				// old schol localStorage from the foreground page to the background page to keep their settings...
				if (typeof(response.importedFromForeground) == 'undefined') {
					// it doesn't exist.. copy it over...
					var thisJSON = {
						requestType: 'saveLocalStorage',
						data: localStorage
					}
					chrome.extension.sendRequest(thisJSON, function(response) {
						setUpRESStorage(response);
					});
				} else {
					setUpRESStorage(response);
				}
			});
		} else if (typeof(safari) != 'undefined') {
			// we've got safari, let's check for old localStorage...
			thisJSON = {
				requestType: 'getLocalStorage'
			}
			safari.self.tab.dispatchMessage("getLocalStorage", thisJSON);
		} else {
			// Check if GM_getValue('importedFromForeground') has been set.. if not, this is an old user using localStorage;
			(typeof(unsafeWindow) != 'undefined') ? ls = unsafeWindow.localStorage : ls = localStorage;
			if (GM_getValue('importedFromForeground') != 'true') {
				// It doesn't exist, so we need to copy localStorage over to GM_setValue storage...
				for (var i = 0, len=ls.length; i < len; i++){
					var value = ls.getItem(ls.key(i));
					if (typeof(value) != 'undefined') {
						if ((typeof(value) == 'number') && (value > 2147483647)) {
							value = value.toString();
						}
						if (ls.key(i)) {
							GM_setValue(ls.key(i), value);
						}
					}
				}
				GM_setValue('importedFromForeground','true');
			}
			setUpRESStorage();
			RESInit();
		}
	})();
}



var lastPerf = 0;
function perfTest(name) {
	var d = new Date();
	var diff = d.getTime() - lastPerf;
	console.log(name+' executed. Diff since last: ' + diff +'ms');
	lastPerf=d.getTime();
}


