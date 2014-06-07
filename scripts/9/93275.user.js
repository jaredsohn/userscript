// ==UserScript==
// @name           Gmail right side tasks gadget
// @author         wingphil
// @namespace      org.userscripts.wingphil
// @description    Move the tasks gadget underneath the chat gadget, wherever it may be
// @version        0.1.5
// @license        CC by-nc-sa  http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include        http://mail.google.com/*
// @include        https://mail.google.com/*
// @include        http://*.mail.google.com/*
// @include        https://*.mail.google.com/*
// ==/UserScript==

//Based on 1nfected's scripts
//http://userscripts.org/scripts/show/82105
//http://userscripts.org/scripts/show/75047
//and szrudi's script
//http://userscripts.org/scripts/show/83718

(function() {

	var LOG_PREFIX = 'RightSideTasksGadget: ';
	isGM = typeof GM_deleteValue != 'undefined';
	log = isGM ? GM_log : window.opera ? function(msg) {
		opera.postError(LOG_PREFIX + msg);
	} : function(msg) {
		try {
			console.log(msg);
		} catch (e) {
		}
	};

	var canvas = document.getElementById('canvas_frame');
	if (canvas && canvas.contentDocument)
		var gmail = canvas.contentDocument;
	if (!gmail)
		return;

	var runCount = 0;
	// switching completed
	log('Moving menu..');
	// window.addEventListener("load", moveMenu, false);
	moveMenu();

	function moveMenu() {
		if (runCount++ > 30) {
			// just a safeguard, so we do not get an infinite cycle if something
			// goes wrong
			log('I give up...');
			return;
		}
		if (gmail.URL == 'about:blank') {
			// every once in a while this happens in FF for me..
			log('Lost gmail iframe.');
			gmail = canvas.contentDocument;
		}

		var tasksGadget = $(
				'//div[contains(@class,"pp")][.//h2[contains(text(),"Tasks (Labs)")]]',
				gmail, true);

		var chatGadget = $(
				'//div[contains(@class,"pp")][.//h2[contains(text(),"Chat")]]',
				gmail, true);

		if (!chatGadget) {
			chatGadget = $(
					'//div[contains(@class,"pp")][.//input[contains(@title,"Search, add or invite")]]',
					gmail, true);
		}

		if (chatGadget && tasksGadget) {
			chatGadget.parentNode.insertBefore(tasksGadget, chatGadget);
			chatGadget.parentNode.insertBefore(chatGadget, tasksGadget);

			runCount = 0;
			log('Everything should be ok, stuff moved. :)');
		} else {
			// gmail did not fully load yet, so we need to retry
			nextTry = runCount < 20 ? runCount * 25 : 500;
			if (!tasksGadget)
				log('Tasks gadget not found, I\'ll retry in ' + nextTry
						+ 'ms..');
			else if (!chatGadget)
				log('Chat gadget not found, I\'ll retry in ' + nextTry + 'ms..');
			setTimeout(moveMenu, nextTry);
		}
	}

	// All in one function to get elements
	function $(q, root, single, context) {
		root = root || document;
		context = context || root;
		if (q[0] == '#')
			return root.getElementById(q.substr(1));
		else if (q.match(/^\/|^\.\//)) {
			if (single)
				return root.evaluate(q, context, null, 9, null).singleNodeValue;
			var arr = [];
			var xpr = root.evaluate(q, context, null, 7, null);
			for ( var i = 0, l = xpr.snapshotLength; i < l; i++)
				arr.push(xpr.snapshotItem(i));
			return arr;
		} else if (q[0] == '.')
			return root.getElementsByClassName(q.substr(1));
		return root.getElementsByTagName(q);
	}

	var AnotherAutoUpdater = {
		// Config values, change these to match your script
		version : '0.1.5', // Changer version manually with each update.
		// Important!
		name : 'Gmail right side tasks gadget',
		id : '93275', // Script id on Userscripts.org
		days : 1, // Days to wait between update checks

		// Don't edit after this line, unless you know what you're doing ;-)
		time : new Date().getTime(),
		call : function(response) {
			GM_xmlhttpRequest({
				method : 'GET',
				url : 'https://userscripts.org/scripts/source/' + this.id
						+ '.meta.js',
				onload : function(xpr) {
					AnotherAutoUpdater.compare(xpr, response);
				}
			});
		},
		compare : function(xpr, response) {
			this.xversion = /\/\/\s*@version\s+(.*)\s*\n/i
					.exec(xpr.responseText);
			this.xname = /\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
			if ((this.xversion) && (this.xname[1] == this.name)) {
				this.xversion = this.xversion[1].replace(/\./g, '');
				this.xname = this.xname[1];
			} else {
				if ((xpr.responseText
						.match("the page you requested doesn't exist"))
						|| (this.xname[1] != this.name))
					GM_setValue('updated_' + this.id, 'off');
				return false;
			}
			if ((+this.xversion > +this.version)
					&& (confirm('A new version of the '
							+ this.xname
							+ ' user script is available. Do you want to update?'))) {
				GM_setValue('updated_' + this.id, this.time + '');
				top.location.href = 'https://userscripts.org/scripts/source/'
						+ this.id + '.user.js';
			} else if ((this.xversion) && (+this.xversion > +this.version)) {
				if (confirm('Do you want to turn off auto updating for this script?')) {
					GM_setValue('updated_' + this.id, 'off');
					GM_registerMenuCommand("Auto Update " + this.name,
							function() {
								GM_setValue('updated_' + this.id, new Date()
										.getTime()
										+ '');
								AnotherAutoUpdater.call(true);
							});
					alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
				} else {
					GM_setValue('updated_' + this.id, this.time + '');
				}
			} else {
				if (response)
					alert('No updates available for ' + this.name);
				GM_setValue('updated_' + this.id, this.time + '');
			}
		},
		check : function() {
			if (GM_getValue('updated_' + this.id, 0) == "off")
				GM_registerMenuCommand("Enable " + this.name + " updates",
						function() {
							GM_setValue('updated_' + this.id, new Date()
									.getTime()
									+ '');
							AnotherAutoUpdater.call(true);
						});
			else {
				if (+this.time > (+GM_getValue('updated_' + this.id, 0) + 1000
						* 60 * 60 * 24 * this.days)) {
					GM_setValue('updated_' + this.id, this.time + '');
					this.call();
				}
				GM_registerMenuCommand("Check " + this.name + " for updates",
						function() {
							GM_setValue('updated_' + this.id, new Date()
									.getTime()
									+ '');
							AnotherAutoUpdater.call(true);
						});
			}
		}
	};
	if (self.location == top.location
			&& isGM)
		AnotherAutoUpdater.check();

})();
