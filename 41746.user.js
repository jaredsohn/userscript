// ==UserScript==
// @name           Nice To Have @ Userscripts.org
// @namespace      http://userscripts.org/scripts/show/41746
// @description    1) View all posts while editing/replying on a topic 2) Show the sender's message while replying to it
// @include        http://userscripts.org*
// @exclude
// @svc:version    [0.1.2]
// ==/UserScript==

if (top != self) return;
var message;

function messages() {
		window.addEventListener('mouseup', function (e) {
			if (e.which != 1) return;
			if (location.href.match('http://userscripts.org/messages/')) {
				if (e.target.innerHTML == 'reply' && e.target.href.match('reply') && e.target.tagName == 'A') {
					message = cc.$2('//div[(@class="body")]', document, 0);
					if (message) GM_setValue('message', message.innerHTML);
				}
			}
		}, false);
	if (location.href.match('http://userscripts.org/messages/new?')) {
		window.addEventListener('unload', function () { GM_setValue('message', ''); }, false);
		var node = cc.$('#content:h2:0');
		if (node) node.innerHTML += '<br><br>' + GM_getValue('message');
	}
}

// COMMON CODE (VERSION AS AT 29 DEC 2009)
// WITH TITLE++ AND SCRIPT* AND CLICK* AND LINK
var cc = {
	newNode: null,
	$: function (x, c) { // dom
		if (!c) c = document;
		re = /(#|^)(.+?)(:|$)(.+?)(:|$)(.*$)/;
		if (!re.test(x)) re = /(#|^)(.+?)(:|$)(.*$)/;
		
		if (re.exec(x)[1] == "#") { //first node is by id
			var node = c.getElementById(re.exec(x)[2]);
			if (!node) return null;
			
			var nodes = node.getElementsByTagName(re.exec(x)[4].toUpperCase());
			if (re.exec(x)[6] && !nodes) return null;
			if (re.exec(x)[4] && !nodes) return null;
			
			if (re.exec(x)[6]) return nodes[re.exec(x)[6]];
			if (re.exec(x)[4]) return nodes;
			if (re.exec(x)[2]) return node;
		}
		
		//first node is by tagname
		var nodes = c.getElementsByTagName(re.exec(x)[2].toUpperCase());
		if (re.exec(x)[4] && !nodes) return null;
		
		if (re.exec(x)[4]) return nodes[re.exec(x)[4]];
		return nodes;
	},
	
	$2: function (x, c, n) { // xpath
		try {
			if (typeof n == "number") return document.evaluate(x, c || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(n);
			return document.evaluate(x, c || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		} catch (err) {GM_log("err: " + err + ": " + x + ": " + c + ": " + n);}
	},
	
	loop: function (nodes, func) {
		if (!nodes) return;
		if (nodes.length > 0) {
			for (this.i=0; this.i<nodes.length; this.i++) { 
				this.node = nodes[this.i]; func(); }
				this.length = nodes.length;
			return;
		} 
		if (nodes.snapshotLength > 0) {
			for (this.i=0; this.i<nodes.snapshotLength; this.i++) {
				this.node = nodes.snapshotItem(this.i); func(); }
				this.length = nodes.snapshotLength;
			return;
		}
	},
	
	$$: function (tagName, nodeId, title, styleAttr, innerText, parentNode, position, sibling) {
		cc.newNode = document.createElement(tagName);
		if (nodeId) cc.newNode.id = nodeId;
		if (title) cc.newNode.title = title;
		if (styleAttr) cc.newNode.setAttribute('style', styleAttr);
		if (innerText) cc.newNode.innerHTML = innerText;
		if (!parentNode) return cc.newNode;
		if (position == 0) {
			if (!sibling) parentNode.appendChild(cc.newNode);
			if (sibling) {
				sibling.nextSibling ? parentNode.insertBefore(cc.newNode, sibling.nextSibling) : parentNode.appendChild(cc.newNode);
			}
		}
		if (position == 1) {
			if (!sibling) parentNode.insertBefore(cc.newNode, parentNode.firstChild);
			if (sibling) parentNode.insertBefore(cc.newNode, sibling);
		}
		return cc.newNode;
	},

	script: function (scriptText, src) {
		var node = document.createElement('script');
		node.type = 'text/javascript';
		if (src) node.src = src;
		if (scriptText) node.innerHTML = scriptText;
		document.getElementsByTagName('head')[0].appendChild(node);
	},
	
	link: function (src) {
		var node = document.createElement('link');
		node.type = 'text/css';
		node.rel = 'stylesheet';
		node.href = src;
		document.getElementsByTagName('head')[0].appendChild(node);
	},
	
	click: function (node) {
		var flag = false;
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		flag = !node.dispatchEvent(evt);
		if (!flag) window.location = link.href;
	},
};

// SCRIPT VERSION CHECKER
// VERSION 0.2.0
var SVC = {
	currentVersion: "0.1.2",
	scriptName: "Nice To Have @ Userscripts.org",
	scriptNum: 41746,
	
	// GLOBAL SETTINGS
	currentDate: null, userRequestCheck: null, timer: null,
	
	init: function () {
		SVC.currentDate = new Date();
		var cv = parseInt(/[1-9][\d]*/.exec(SVC.currentVersion.replace(/\D/g, "")));

		// INITIALIZE LOCAL VALUES (FOR FIRST-TIME USE)
		if (!GM_getValue("latest")) GM_setValue("latest", cv );
		if (!GM_getValue("notified")) GM_setValue("notified", false);
		if (!GM_getValue("lastChecked")) GM_setValue("lastChecked", (SVC.currentDate.getTime() - 1000*60*60*25) + "");
		
		// UPDATE LOCAL VALUES (FOR FIRST-TIME USE AFTER REINSTALL NEWER VERSION)
		if (GM_getValue("latest") < cv) {
			GM_setValue("latest", cv);
			GM_setValue("notified", false);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
		}
	},
	verify: function () {
		SVC.userRequestCheck = false;
		var sp = SVC.currentDate.getTime() - parseInt(GM_getValue("lastChecked"));
		
		// CHECK SOURCE IF USER HAS BEEN NOTIFIED OF AN UPDATED VERSION BEFORE AND 14 DAYS HAVE PASSED
		if (GM_getValue("notified") && (sp / (1000*60*60*24) > 14)) SVC.getInfo();
			
		// CHECK SOURCE FOR THE LATEST VERSION IF ONE DAY HAS PASSED SINCE LAST CHECKED
		if (!GM_getValue("notified") && ( sp / (1000*60*60*24) > 1 )) SVC.getInfo();
	},
	getInfo: function () {	
		var uso = 'http://userscripts.org';
		function retrieve(url, re, count) {
			SVC.xhr.get(url, function (status, text) {
				window.clearTimeout(SVC.timer);
				if (status == 404 && SVC.userRequestCheck) SVC.manualErrorMsg();
				if (status == 200) {
					if (re.test(text)) var uv = re.exec(text)[1];
					if (uv) SVC.compare(uv);
					if (!uv && count == 1) {
						retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
					} else if (!uv && SVC.userRequestCheck) {
						SVC.manualErrorMsg();
					}
				}
			});
			SVC.timer = setTimeout(function () { 
				if (count == 1) retrieve(uso + '/scripts/show/' + SVC.scriptNum, /<h1.+>.+\s([^\s]+)<\/h1>/, 2);
				if (count == 2) SVC.manualErrorMsg();
			}, 2000);
		};
		retrieve(uso + '/scripts/source/' + SVC.scriptNum + '.meta.js', /@svc:version[\s]*\[(.+)\]/, 1);
	},
	xhr: {
		get: function (url, process) {
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function (res) { process(res.status, res.responseText); },
			});
		},
	},
	compare: function (version) {
			
			var updatedVersionInt = parseInt(/[1-9][\d]*/.exec(version.replace(/\D/g, "")));
			
			// DO NOTHING IF NO CHANGE IN VERSIONS
			if (updatedVersionInt <= GM_getValue("latest")) {
				if (SVC.userRequestCheck) alert('Auto-check completed!\n---------------------------\n\nYou are using the latest greasemonkey script \n\n~ ' + SVC.scriptName + ' ~ version ' + SVC.currentVersion + '.\n\n  ');
				return;
			}
			
			GM_setValue("notified", true);
			GM_setValue("lastChecked", SVC.currentDate.getTime() + "");
			
			// NOTIFY USER
			if (SVC.userRequestCheck) {
			
				var reply = confirm('Auto-check completed!\n---------------------------\n\nThe Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has recently been updated to v.' + version + '. \n\nYou are currently using version ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscript.org now?\n\n  ');
				
				if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
				
			} else {
			
				var reply = confirm('Latest news for Greasemonkey Scripts!\n-----------------------------------------------\n\nThe Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has recently been updated to v.' + version + '. \n\nYour current working version is ' + SVC.currentVersion + '.\nWould you like to visit the download page at userscript.org now?\n\n  ');
				
				if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
			
			}
		},
	versionInfo: {
		autoChecking: function () {
			SVC.init();
			SVC.verify();
		},
		manualChecking: function () {
			SVC.userRequestCheck = true;
			SVC.getInfo();
		},
	},
	manualErrorMsg: function () {
		var reply = confirm('Alert!\n-------\n\nAuto-checking for the latest version of the Greasemonkey Script ~ ' + SVC.scriptName + ' ~ has not been successful.\n\nYou may wish to try again later or visit the download page to check manually. For your information, your current working version is ' + SVC.currentVersion + '. \n\nWould you like to visit the download page at userscript.org now?\n\n  ');
		if (reply) GM_openInTab("http://userscripts.org/scripts/show/" + SVC.scriptNum);
	},
};

if (location.href.match('http://userscripts.org/topics/')) cc.$$('div', '', '', 'height:170px', '', document.body, 0);
if (location.href.match('http://userscripts.org/messages/')) messages();

// THE "SCRIPT VERSION CHECKER"
GM_registerMenuCommand("Google Date Keeper (Check Latest Version)", SVC.versionInfo.manualChecking);
SVC.versionInfo.autoChecking();