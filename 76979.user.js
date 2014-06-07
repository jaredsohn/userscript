// ==UserScript==
// @name           4Chan - Kodiak Recall
// @namespace      kodiak.bear.chan
// @author         Timothy Lewis
// @description    AJAX Thread updating without full refresh while blocking SPAM and replacing the XXX with numbers again. Designed to work with /b/ackwash reloaded.
// @include        http://boards.4chan.org/*
// @require        http://sizzlemctwizzle.com/updater.php?id=76979&days=1
// @copyright      2010 Timothy Lewis
// @version        2.02
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @supported      Firefox 3.5+

// ==/UserScript==

// Copyright (c) 2010, Timothy Lewis

const PAGE_OK = 200, PAGE_NOT_MODIFIED = 304, PAGE_NOT_FOUND = 404;
XMLHttpRequest.DONE = 4;

const THREAD_DEAD = "Thread Died - 404";
const THREAD_UPDATED = "New Posts";
const THREAD_UPDATING = "Kodiak Running";
const THREAD_PAUSED = "Kodiak Paused";
const ORIGINAL_PAGE_TITLE = document.getElementsByTagName('title')[0].innerHTML;
const SPAM = new Array("simply pick an option from the list below,",
					   "ust horrible, I will tell you why if you ",
					   "Voltar para a ",
					   "der video: http://www.youtube.c",
					   "or has detected that your gateway is unable to establish a ",
					   "murder video: http://www.you",
					   "h BangBros, RealityKings,",
					   "enjoy videos from all popular porn sites",
					   "look i have pris!",
					   "ttp://jade.cheating-ex",
					   "with you nerdy faggots is cos I get",
					   "chan Spam (Updated Agian",
                                           "secret.femanonchan.org",
					   "youtube.com/watch?v=H5Eksc3ZGB",
					   "secret.femanonchan.org",
					   "rc://primer.hopto.org:80/0", 
					   "BangBros, Brazzers, RealityKings",
					   "wow-this-is-so-good",
					   " boys Ready for free fun No download",
					   "Connection IssueErro",
					   "xkitty777@hotmail.com",
					   "d it. Gnarly, dude.",
					   "d every single timestampd pic of cumdum",
					   "Hot Cam Girls & boys Ready for free fun No download ",
					   "owered by Cisco Clean Acces",
					   "4chan 5pamm3r H3r3",
					   "owered by 110MB Hostin");
const SPAM_LENGTH = SPAM.length; //makes the array search faster, trust me.


//if(unsafeWindow.console){ var GM_log = unsafeWindow.console.log; }
var GM_log = function (){};


function KodiakRecall() {
	var HUD = null;
	var timer = null;
	var lastUpdate = null;
	var totalReplies = null;
	var threadID = null;
	var threadCategory = null;
	var tempWorkDOM = document.createElement("div");
	
	this.run = function () {
		threadCategory = String(document.location).split("/")[3];
		
		if(GM_getValue('autoUpdate') == undefined) {
			GM_setValue('autoUpdate', true);
			GM_setValue('pollInterval', 10);	
			GM_setValue('blockSpam', true);
			GM_setValue('numberFix', true);
		}
		
		if(String(document.location).split("/").length > 5) {
			threadID = String(document.location).split("/")[5].split("#")[0];
				
			timer = new Timer(pollServer, GM_getValue('pollInterval'));	
			HUD = new statusHUD(timer);			
				
			initializePosts();
			
			lastUpdate = new Date(document.lastModified);
		
			if(GM_getValue('autoUpdate')) {
				timer.start();
			}
		} else {
			if(GM_getValue('numberFix')){ 
				fixPostNumber(document);
			}
		}
	}

	
	pollServer = function() {
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			if (request.readyState == XMLHttpRequest.DONE) {
					switch (request.status) {
						case PAGE_OK:
							GM_log('Updating Page');
							setLastUpdated(new Date(request.getResponseHeader('Last-Modified')))
							timer.stop();
							parseNewPosts(request.responseText);
							timer.start();					
						break;
					case PAGE_NOT_MODIFIED:
							GM_log('Page Not Modified');
						break;
					case PAGE_NOT_FOUND:
							GM_log('Thread is Dead');
							HUD.dead();
							timer.stop();
						break;
					default:
							GM_log('Unkown Server Response');
						break;
				}
			}
		}
		
		
		try {
			request.open("GET", window.location.href.replace(/#.*/, ''), true);
			request.setRequestHeader('If-Modified-Since', lastUpdate.toUTCString());
			request.send(null);
		} catch (e) {
			GM_log('Error Connecting to Server');
		}
	
	}	
	
    parseNewPosts = function(newDocument) {
		tempWorkDOM.innerHTML = newDocument.match(/<form name=\"delform\".*?>[\s\S]*?<\/form>/gm);
		var newTables = tempWorkDOM.getElementsByTagName("table");
		var currentTables = null;
		
		var tempLength = newTables.length - 1;
		for(var X = totalReplies; X < tempLength; X++) {
				if (!isSpam(newTables[X].getElementsByTagName("blockquote")[0].innerHTML) || !GM_getValue('blockSpam')) {					
					if(threadCategory == "b" && GM_getValue('numberFix')) {	fixPostNumber(newTables[X]); }
					if(totalReplies == 0) {
						currentTables = document.getElementById("4chan_ext_thread_" + threadID);
						currentTables.insertBefore(newNode(newTables[X]), currentTables.lastChild);
					} else {
						currentTables = document.getElementById("4chan_ext_thread_" + threadID).getElementsByTagName("table");
						currentTables[currentTables.length-1].parentNode.insertBefore(newNode(newTables[X]), currentTables[currentTables.length-1].nextSibling);
					}
					HUD.updated();
				}
				totalReplies++;
		}
	}
	
	initializePosts = function() {
		if(threadCategory == "b" && GM_getValue('numberFix')) { fixPostNumber(document); }
		
		if(GM_getValue('blockSpam')) {
			var pageTables = document.getElementById("4chan_ext_thread_" + threadID).getElementsByTagName("table");
			totalReplies = pageTables.length
			
			for(var X = 0; X < totalReplies; X++) {
					if (isSpam(pageTables[X].getElementsByTagName("blockquote")[0].innerHTML)) {
						removePost(pageTables[X]);
					}	
			}
		}
	}
	
	newNode = function(currentDOM) {
		var reply = document.createElement("table");
		reply.innerHTML = currentDOM.innerHTML.match(/<tr>[\s\S]*?<\/tr>/gm);
		
		return reply;
	}
	
	fixPostNumber = function(currentDOM) {
		var links = currentDOM.getElementsByTagName('a');
		var linksLength = links.length;
		for(var X=0; X < linksLength ; X++)
		{
			if(links[X].innerHTML.match(/\d{5}XXX/))
			{
				links[X].href.match(/[^\/](\d{9})/);
				links[X].innerHTML=RegExp.$1;
			}
		}
	}
	
	isSpam = function(post) {
		for(var X = 0; X < SPAM_LENGTH; X++) {
			if(post.indexOf(SPAM[X]) > 0) {
				return true;
			}
		}
		return false;
	}	

	getPostID = function(postDOM) {
		return postDOM.getElementsByTagName("input")[0].getAttribute("name");		
	}
		
	removePost = function(currentDOM) {
		var spam = currentDOM.rows[0];
        spam.parentNode.removeChild(spam);
	}

	setLastUpdated = function (when) {
        lastUpdate = when;
    }

}

function statusHUD(timer) {
	var enabled = true;
	var timerID = timer
	var statusHUD = document.createElement("div");	
	var preferences = new preferencesHUD();
	
	document.body.insertBefore(statusHUD, document.body.lastChild);
	if(GM_getValue('autoUpdate')) {
		statusHUD.innerHTML = '<div style="border: 2px solid #000000; font-size: small; background-color: #00aa00; color: #ffffff; position:fixed; bottom:3px; right:3px; display: block; padding: 2px 6px 2px 6px;">' + THREAD_UPDATING + '</div>';
	} else {
		statusHUD.innerHTML = '<div style="border: 2px solid #000000; font-size: small; background-color: #aa0000; color: #ffffff; position:fixed; bottom:3px; right:3px; display: block; padding: 2px 6px 2px 6px;">' + THREAD_PAUSED + '</div>';
		enabled = false;		
	}
	
	
	this.updated = function() {
		document.title = THREAD_UPDATED;
		document.addEventListener("mouseover", revertTitle, false);
	}

	this.dead = function() {	
		statusHUD.removeEventListener("click", handleInteraction, false);
		statusHUD.innerHTML = '<div style="border: 2px solid #000000; font-size: large; font-weight: bold; background-color: #aa0000; color: #ffffff; position:fixed; bottom:3px; right:3px; display: block; padding: 2px 6px 2px 6px;">' + THREAD_DEAD + '</div>';
		document.title = THREAD_DEAD;
	}

	handleInteraction = function (e) {
		if(e.ctrlKey) {
			if(preferences.intialized) {
				preferences.show();
			} else {
				preferences.initializeHUD();
				preferences.show();
			}
		} else {
			if(enabled) {
				statusHUD.innerHTML = '<div style="border: 2px solid #000000; font-size: small; background-color: #aa0000; color: #ffffff; position:fixed; bottom:3px; right:3px; display: block; padding: 2px 6px 2px 6px;">' + THREAD_PAUSED + '</div>';
				timer.stop();
				enabled = false;
			} else {
				statusHUD.innerHTML = '<div style="border: 2px solid #000000; font-size: small; background-color: #00aa00; color: #ffffff; position:fixed; bottom:3px; right:3px; display: block; padding: 2px 6px 2px 6px;">' + THREAD_UPDATING + '</div>';
				timer.start();
				enabled = true;
			}
		}
	}

	revertTitle = function () {
		document.title = ORIGINAL_PAGE_TITLE;
		document.removeEventListener("mouseover", revertTitle, false);
	}
	
	statusHUD.addEventListener("click", handleInteraction, false);
}

function preferencesHUD () {
	var preferencesHUD = document.createElement("div");	
	var initialized = false;

	
	
	this.initializeHUD = function() {
		document.body.insertBefore(preferencesHUD, document.body.lastChild);
		
		preferencesHUD.innerHTML = '<div id="krPreferences" style="border: 2px solid #000000; background-color: #cccccc; color: #000000; position:fixed; bottom:30px; right:3px; display: none; padding: 6px;">' +
			'<p style="border: 1px solid #000000; font-weight: bold; margin: 0px 0px 10px 0px; background-color: #66ccff; color: #000000; padding: 3px;" align="center">Kodiak Recall</p>' +
			'<fieldset><legend>Main Preferences</legend>' +
			'<label><input type="checkbox" id="krPreferencesAutoUpdate" />Start Updating When Page Starts.</label><br/>' +
			'<label><input type="text" size="1" id="krPreferencesInterval" /> Update Interval (Seconds).</label>' +
			'</fieldset><br/><fieldset><legend>Extra Formating</legend>' +
			'<label><input type="checkbox" id="krPreferencesBlockSpam" />Block Spam.</label><br/>' +
			'<label><input type="checkbox" id="krPreferencesNumberFix" />Replace XXX Thread Numbers.</label><br/>' +
			'</fieldset><br/><input type="submit" style="width: 50%;" id="krPreferencesSubmit" value="Save Settings" />' +
			'<input type="submit" style="width: 50%;" id="krPreferencesCancel" value="Cancel" /></div>';
			
		initialized = true;
	}

	this.hide = function() {	
		document.getElementById("krPreferences").style.display = "none";
		document.getElementById("krPreferencesCancel").removeEventListener("click", this.hide, false);		
		document.getElementById("krPreferencesSubmit").removeEventListener("click", this.save, false);
	}
	
	this.show = function() {
		this.load();
		document.getElementById("krPreferences").style.display = "block";
		document.getElementById("krPreferencesCancel").addEventListener("click", this.hide, false);		
		document.getElementById("krPreferencesSubmit").addEventListener("click", this.save, false);
	}
	
    this.load = function() {
        document.getElementById("krPreferencesAutoUpdate").checked = GM_getValue('autoUpdate');
        document.getElementById("krPreferencesInterval").value = GM_getValue('pollInterval');
		
        document.getElementById("krPreferencesBlockSpam").checked = GM_getValue('blockSpam');
        document.getElementById("krPreferencesNumberFix").checked = GM_getValue('numberFix');
    }

	
	this.save = function() {
		if(isNaN(document.getElementById("krPreferencesInterval").value)) {
			alert("Update interval must be a number!");
		} else {
			GM_setValue('autoUpdate', document.getElementById("krPreferencesAutoUpdate").checked);
			GM_setValue('pollInterval', document.getElementById("krPreferencesInterval").value);
			
			GM_setValue('blockSpam', document.getElementById("krPreferencesBlockSpam").checked);
			GM_setValue('numberFix', document.getElementById("krPreferencesNumberFix").checked);
			
			//until I figure out why this. and me. do not work with event handelers...
			document.getElementById("krPreferences").style.display = "none";
			document.getElementById("krPreferencesCancel").removeEventListener("click", this.hide, false);		
			document.getElementById("krPreferencesSubmit").removeEventListener("click", this.save, false);
		}
	}
}

function Timer(callback, interval) {
    var callback = callback;
    var interval = interval;
    var id = null;
    const ONE_SECOND_IN_MILLISECONDS = 1000;

    this.isRunning = function() { return id; }
    this.setInterval = function(new_interval) { interval = new_interval; }

    this.start = function() { 
        if (this.isRunning()) {
            GM_log('Timer Already Started!');
        } else {
            id = window.setInterval(callback, ONE_SECOND_IN_MILLISECONDS * interval);
            GM_log('Starting Timer');
        }
    }

    this.stop = function() { 
        GM_log('Stopping Timer');
        clearInterval(id); 
        id = null; 
    }

    this.restart = function () {
        GM_log('Restarting Timer');
        this.stop();
        this.start();
    }
}

function run() {
    kodiakrecall = new KodiakRecall();
    kodiakrecall.run();
}

window.addEventListener("load", run, false);