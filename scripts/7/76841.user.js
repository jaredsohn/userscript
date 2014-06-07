// ==UserScript==
// @name           Teddy Bear - 4Chan
// @namespace      teddy.bear.chan
// @description    Update Thread Warning for 4chan. Designed so that ALL other scripts will work...
// @include        http://*.4chan.org/*/res/*
// @version        1.0
// @author         Timothy Lewis
// ==/UserScript==

// Copyright (c) 2010, Timothy Lewis

const PAGE_OK = 200, PAGE_NOT_MODIFIED = 304, PAGE_NOT_FOUND = 404;
XMLHttpRequest.DONE = 4;
const THREAD_IS_DEAD_STRING = "THREAD DEAD";
const THREAD_UPDATED_STRING = "THREAD UPDATED";
const UPDATE_INTERVAL = 10;

//if(unsafeWindow.console){ var GM_log = unsafeWindow.console.log; }
var GM_log = function (){};


function TeddyBear() {
	var lastUpdate = null;
	var timer = null;

	this.run = function () {
		timer = new Timer(pollServer, UPDATE_INTERVAL);				
		
		lastUpdate = new Date(document.lastModified);
		
		timer.start();
	}
	
	pollServer = function() {
		var request = new XMLHttpRequest();
		
		request.onreadystatechange = function() {
			if (request.readyState == XMLHttpRequest.DONE) {
					switch (request.status) {
						case PAGE_OK:
							GM_log('Updating Page');
							setLastUpdated(new Date(request.getResponseHeader('Last-Modified')))
							threadUpdated();						
						break;
					case PAGE_NOT_MODIFIED:
							GM_log('Page Not Modified');
						break;
					case PAGE_NOT_FOUND:
							GM_log('Thread is Dead');
							document.title = THREAD_IS_DEAD_STRING;
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
		}  catch (e) {
			GM_log('Error connecting to server');
		}
	
	}

	setLastUpdated = function (when) {
        lastUpdate = when;
    }
	
	threadUpdated = function() {
		
		//Change Title to Updated
		document.title = THREAD_UPDATED_STRING;
		
		//Create and add update notifier in bottom right
		var newPostDiv = document.createElement("div");
		document.body.insertBefore(newPostDiv, document.body.lastChild);
		newPostDiv.innerHTML = '<div style="border: 1px solid #000000; font-size: large; background-color: #00FF00; color: #ffffff; position:fixed; bottom:10px; right:10px; display: block; padding: 0px 4px 0px 4px;">' + THREAD_UPDATED_STRING + '</div>';

	}

}

function Timer(callback, interval) {
    var callback = callback;
    var interval = interval;
    var id = null;
    const ONE_SECOND_IN_MILLISECONDS = 1000; // milliseconds

    this.isRunning = function() { return id; }
    this.setInterval = function(new_interval) { interval = new_interval; }

    this.start = function() { 
        if (this.isRunning()) {
            GM_log('timer already started, skipping');
        } else {
            id = window.setInterval(callback, ONE_SECOND_IN_MILLISECONDS * interval);
            GM_log('starting timer');
        }
    }

    this.stop = function() { 
        GM_log('stopping timer');
        clearInterval(id); 
        id = null; 
    }

    this.restart = function () {
        GM_log('restarting timer');
        this.stop();
        this.start();
    }
}


//BEGIN INITIALIZATION ================================

function run() {
    teddybear = new TeddyBear();
    teddybear.run();
}


window.addEventListener("load", run, false);