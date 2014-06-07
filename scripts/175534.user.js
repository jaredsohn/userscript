// ==UserScript==
// @name Grooveshark Now Playing
// @namespace
// @version  0.1.2
// @description    LastFM scrobbler ++
// @include        http://grooveshark.com/*
// @include        http://*.grooveshark.com/*
// @author         robot
// @info           Using modified https://github.com/fxb/javascript-last.fm-api
// @dependencies   jQuery, javascript-last.fm-api
// @license        Public Domain
// ==/UserScript==

/**
 * Script communicates with robot-script.appspot.com and ws.audioscrobbler.com - allow/trust in noscript etc.
 * CHROME: Install as TAMPERMONKEY script

 * LASTFM SETUP
 * You need apiKey & apiSecret; create account here: http://www.last.fm/api
 * On first run username + password are required (edit LASTFM below)
 * Enable logging to see the sessionKey (which won't expire) and edit it in; then you can blank the password
 
 * LOCAL SERVICE
 * Scroll down to GSAPI and edit localURL if you run a local server
 * Feel free to customize dispatchLocal()
 
 * TODO
 * Better error handling, http://www.last.fm/api/scrobbling
 * Add a GM cache handler
 
 * CHANGELOG
 * 0.1.1: Couple logic improvements and bugfixes
 * 0.1.2: Replaced broken md5 lib + minor tweaks
 */

var LOG = new function() { // toggle console via ctrl+shift+k on firefox
	// ------------------------------------ CONFIG
	this.on = false; // logging [true|false]
	// ------------------------------------ END
	this.app = '[Grooveshark Now Playing]';
	this.print = function(str) {
		unsafeWindow.console.info(this.app + ' ' + str);
	};
};

var LASTFM = {
	LASTFMAPI: null,
	// ------------------------------------ CONFIG
	apiKey: '',
	apiSecret: '',
	username: '', // required for checking if track was loved
	password: '', // or use sessionKey
	sessionKey: '', // recommended
	// ------------------------------------ END
	nowPlaying: false, // nowPlaying dispatched
	nowPlayingFailCount: 0,
	gotInfo: false, // getInfo dispatched (runs in nowPlaying())
	
	scrobbled: false, // scrobble dispatched
	scrobbleFailCount: 0,
	scrobbleTime: 120, // initialized at 2 mins
	
	loved: null, // track loved [null:notChecked|false:notLoved|true:loved]
	
	init: function() { // initialize last fm api
		var self = LASTFM;
		self.insertLoveBtn(); // inject the love button
		self.LASTFMAPI = new unsafeWindow.GMLastFM({
			apiKey    : self.apiKey,
			apiSecret : self.apiSecret
		});
		if (self.sessionKey) {
			if (LOG.on) LOG.print('LastFM session key: ' + self.sessionKey);
			return;
		}
		self.LASTFMAPI.auth.getMobileSession({username: self.username, password: self.password}, {
			success: function(data){
				if (typeof data != 'undefined' && data.session) {
					self.sessionKey = data.session.key;
					if (LOG.on) LOG.print('LastFM session key: ' + self.sessionKey);
				}
			},
			error: function(code, message){
				if (LOG.on) LOG.print('LASTFMAPI.auth.getMobileSession failed with code: ' + code);
			}
		});
	},

	getParams: function(ext) {
		var params = { artist: GSAPI.artistName, track: GSAPI.songName };
		if (ext && GSAPI.albumName) params.album = GSAPI.albumName;
		if (ext && GSAPI.duration) params.duration = GSAPI.duration;
		return params;
	},
	
	updateNowPlaying: function() {
		var self = LASTFM;
		if (self.nowPlayingFailCount > 2) {
			if (LOG.on) LOG.print('UpdateNowPlaying retries exhausted');
			return;
		}
		self.LASTFMAPI.track.updateNowPlaying(
				self.getParams(true),
				{key: self.sessionKey}, {
				success: function(resp) {
					GSAPI.startedTime = Math.floor(Date.now() / 1000);
					if (LOG.on) LOG.print('UpdateNowPlaying dispatched: ' + JSON.stringify(resp));
				},
				error: function(code, message) {
					self.nowPlaying = false;
					self.nowPlayingFailCount++;
					if (LOG.on) LOG.print('UpdateNowPlaying failed with code: ' + code);
				}
			}
		);
	},
	
	scrobble: function() {
		var self = LASTFM;
		if (self.scrobbleFailCount > 2) {
			if (LOG.on) LOG.print('Scrobble retries exhausted');
			return;
		}
		var _params = self.getParams(true);
		_params.timestamp = GSAPI.startedTime;
		self.LASTFMAPI.track.scrobble(
				_params,
				{key: self.sessionKey}, {
				success: function(resp) {
					if (LOG.on) LOG.print('Scrobble dispatched: ' + JSON.stringify(resp));
				},
				error: function(code, message) {
					self.scrobbled = false;
					self.scrobbleFailCount++;
					if (LOG.on) LOG.print('Scrobble failed with code: ' + code);
				}
			}
		);
	},

	btnClickLove: function() {
		var self = LASTFM;
		self.loved = true;
		self.switchBtn('love', 'fade');
		self.LASTFMAPI.track.love(
				self.getParams(false),
				{key: self.sessionKey}, {
				success: function(resp) {
					if (LOG.on) LOG.print('Love dispatched: ' + JSON.stringify(resp));
				},
				error: function(code, message) {
					self.loved = false;
					self.switchBtn('love', 'disable');
					if (LOG.on) LOG.print('Love failed with code: ' + code);
				}
			}
		);
	},
	
	trackGetInfo: function() {
		var self = LASTFM;
		var _params = self.getParams(false);
		_params.username = self.username; // perhaps also use autocorrect=1
		self.LASTFMAPI.track.getInfo(
				_params, {
				success: function(resp) {
					self.gotInfo = true;
					if (resp.track.userloved && resp.track.userloved == 1) { // user has loved the track before
						self.loved = true;
						self.switchBtn('love', 'fade');
					} else {
						self.switchBtn('love', 'enable');
					}
					//if (LOG.on) LOG.print('TrackGetInfo dispatched: ' + JSON.stringify(resp));
				},
				error: function(code, message) {
					self.gotInfo = false;
					// at this point the love button is faded
					// don't need a failCount since function won't run if nowPlaying is true
					if (LOG.on) LOG.print('TrackGetInfo failed with code: ' + code);
				}
			}
		);
	},

	switchBtn: function(type, cmd) {
		var self = LASTFM;
		var node = document.getElementById('gm_btn_' + type);
		var btn = node.parentNode;
		var fn = self['btnClick' + type.charAt(0).toUpperCase() + type.slice(1)];
		
		switch(type) { // set title
			case 'love':
				btn.title = GSAPI.artistName ? ['[GM] LastFM', 'Love' + (self.loved ? 'd' : ''), '-', GSAPI.artistName, '-', GSAPI.songName].join(' ') : '';
				break;
		}
		
		switch(cmd) {
			case 'disable':
				node.style.opacity = '0';
				btn.title = '';
				btn.style.cursor = 'auto';
				btn.removeEventListener('click', fn, false);
				break;
			case 'enable':
				node.style.opacity = '1';
				btn.style.cursor = 'pointer';
				btn.addEventListener('click', fn, false);
				break;
			case 'fade':
				node.style.opacity = '0.4';
				btn.style.cursor = 'auto';
				btn.removeEventListener('click', fn, false);
				break;
		}
	},
	
	insertLoveBtn: function() {
		var container = document.getElementById('header');
		
		var node_div = document.createElement('span');
		node_div.id = 'gm_btn_love_container';
		node_div.style.margin = '0 20px 0 -15px';
		node_div.style.position = 'fixed';
		node_div.style.top = '13px';
		
		var node_img = document.createElement('img');
		node_img.id = 'gm_btn_love';
		node_img.style.width = '24px';
		node_img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABQBJREFUeNq0VmtsFFUU/ua1z+4WWigFRKgUi0JAghIMkRCDwQdCIAYSpSihEEjEICQKJkhiQBNNRIgIgkhSxADlJSCKUESINmARJFhpS1u67G63z233NTszd+717MYQLP7x0bt/ZrLnnO+c73zn3JGEEOjLI6OPT58DqL3AeCB4W/up4tDwHevWF+mGIQKcNYS53dTbUQKU+2WleKisDrcEZ7e4fbNd8MA9dn/2QDW4ndtw8KsFHZ/sXOK6duOhIU63LEsSUszkTcyoPWzE9+zRe7a5IXle8fRbMdORM/8+xVHkUjVYzEKXnrQuM71qm5XYcIWz038BMGzb27B337YC0y7NOjQFIZIpwLaBeAKiKQC1OYC6eE/EKUnO+/39+tsjhgMjhgFeDwTZWZE2mNWX0dMaxpvp6PJvubn9DsDZHbvmFtXfOlS0fg24nkZi31GYF38BdAOS1w11QD5ZSpBa2yEUYnLQAIBxWG0d4MkkBP0n5/og3C4kzp5HqLnBmpfufCQCXiM3RVpQ88GmUm9rJ/RLV6CfrwKjjFl3DLaqwHa7YXZ1wwyEwCkAcrywb4WQ/r0ONgXmHjdsqpYRuB1sgaNkFIZ4fNqzirOMClDUpaULXYuCkXGsMYDkkZOAacHq6oHnpbnwz3kGksuV5dJqbEZ855fg12qAXD/861fDPXkiBOeI7z+GRPl+SBlK02nIbg/GJLTHvLY+WD1z5oxnpa/Qw3vixH0AnNnwr1gM33PT0X3wBIyfr0JSVfjmz0Lee2vRVrYa2uhiOCeMRXjtRsgODe7Ro7LUZkQhkjoEaSxfUfN9kPurJDfTgDBkQhdkpIwpyQZve38r2Kkf4KQAMCxEq3+FuutD5JS9CJ2eWWcU5oWLUOJJ2FolFKJOmIyimVCo4h4hYknqkEwiTTTaVoNsGJSFDtfjj2abZ54+DxdlrlI2GinFZRMVO/dmaUnfbIKsKBh2vBz+15dCebgEnPxBuYMokzlDPbdq40BLdpK/t/TvkNZhE01KPz9YOAKJGidldSZl/VSPB4yUZVMzvePHILzgVcRPnYOHqi0s3wLH9KmwE6Qoy6KCTfzIjFPkrWcBKi39i2t6rF3piiJd1wjngyMhDxsCkEJE5ic4OVL5yTTiFSfgmzUDKvUqtWUXgs8vRLTiOPwvz4NFVTiIhXN67Ler3Dp+ZxdRcaE18dZVOtORqjgGSdOQU/oCDEqeEU1mLAarIA++t1ciebKSBovDPedpcjSgUNYs1JIdNplmIpSImu/oXa9R0fF7FtMMh+etxv4PiHDZKlIfF+btsIgdOCYS35wV3LREuqZWBJ+YLVpXrhM2vUd37xPR8gMiczo3bhJXvUPtCapj0d0xlbtfGmzrwk1hYlp9YFr6XBUUWgWuieMATUXs6EnEPvoMmiSDNQeRqqmFd+ZTUIcWIv7x52jcvJUtSUWWXmHm7l5L8d4zSXMt+9Q3eHOB2+cw8vIgyzJUok0jKUr0nKHIItoMoseZTOBGtK17udlVVm9bh3rHUv4OIMRZ9ddGvKpEUSePlbR8ig6ZAKjbWZVkhkqhiXXpCRyJtVUvS7XPC3G78t/cFwMXu3O3Xy8sYR0jJ4ng6CkiVDJFdBRNFJcKilOznd4NZOP9z7fSIEme+m7OgMq6gmJxfeBI8YY377BPksb/37efNEJWZhZK8pN9ecVmVqv2j7Lq68+WPwQYAPDemKZJ4BJiAAAAAElFTkSuQmCC';
		node_img.style.opacity = '0';
		
		node_div.appendChild(node_img);
		container.appendChild(node_div);
	}
};

var GSAPI = { // http://developers.grooveshark.com/docs/js_api/#getCurrentSongStatus
	// ------------------------------------ CONFIG
	localURL: false, // local service on http://localhost:port; false to disable
	intervalDaemon: 2, // seconds
	// ------------------------------------ END
	status: 'none',
	songID: 0,
	songName: '',
	artistID: 0,
	artistName: '',
	albumID: 0,
	albumName: '',
	trackNum: 0,
	duration: 0, // secs
	artURL: '',
	prevPlaying: 0,
	startedTime: 0, // unix ts
	trackPlayTime: 0,
	
	daemon: function() {
		var self = GSAPI;
		if (typeof unsafeWindow.Grooveshark == 'undefined') return;
		var gs = unsafeWindow.Grooveshark;
		var ss = gs.getCurrentSongStatus();
		
		if (ss.song === null) return;
		
		var nowPlaying = ss.song.artistID + ss.song.songID;
		var trackChanged = (nowPlaying != self.prevPlaying) ? true : false;
		var statusChanged = (ss.status != self.status) ? true : false;
		
		if (trackChanged || statusChanged) { // status changed
			self.status = ss.status;
			
			if (LOG.on && statusChanged) LOG.print(self.status);
			switch(self.status) { // "none", "loading", "playing", "paused", "buffering", "failed", "completed"
				case 'playing':
					if (trackChanged) { // track change
						self.prevPlaying = nowPlaying;
					
						self.artistName = ss.song.artistName;
						self.songName = ss.song.songName;
						self.albumName = ss.song.albumName || '';
						self.artistID = ss.song.artistID;
						self.songID = ss.song.songID;
						self.trackNum = ss.song.trackNum;
						self.albumID = ss.song.albumID;
						self.artURL = ss.song.artURL;
						self.duration = Math.ceil((ss.song.calculatedDuration || ss.song.estimateDuration) / 1000);
						
						// reset vars
						self.trackPlayTime = LASTFM.nowPlayingFailCount = LASTFM.scrobbleFailCount = 0;
						LASTFM.scrobbled = LASTFM.nowPlaying = LASTFM.gotInfo = false;
						LASTFM.loved = null;
						
						// scrobble if played for half the track's duration (and is longer than half a minute) or for 4 minutes
						LASTFM.scrobbleTime = (self.duration && self.duration > 30) ? (self.duration / 2) : 240;
						
						if (LOG.on) LOG.print(self.artistName + '|' + self.songName + '|' + self.albumName + '|' + self.duration);
						
						if (self.localURL) self.dispatchLocal();
					}
					LASTFM.switchBtn('love', ((LASTFM.loved === null || LASTFM.loved) ? 'fade' : 'enable'));
					break;
				case 'paused':
					break;
				default:
					LASTFM.switchBtn('love', 'disable');
					break;
			}
		}
		if (self.status != 'playing') return; // waiting
		// status is playing
		self.trackPlayTime += self.intervalDaemon;
		
		if (LASTFM.nowPlaying === false && self.trackPlayTime >= 10) { // update now playing
			if (LOG.on) LOG.print('UpdateNowPlaying fired');
			LASTFM.nowPlaying = true;
			if (LASTFM.gotInfo === false) LASTFM.trackGetInfo();
			LASTFM.updateNowPlaying();
		}
		
		if (LASTFM.scrobbled === false && self.trackPlayTime >= LASTFM.scrobbleTime) {
			if (LOG.on) LOG.print('Scrobble fired (' + LASTFM.scrobbleTime + '/' + self.duration + ')');
			LASTFM.scrobbled = true;
			LASTFM.scrobble();
		}
	},
	
	dispatchLocal: function() {
		var self = GSAPI;
		var postData = [];
		postData.unshift('duration=' + encodeURIComponent(self.duration));
		postData.unshift('artist=' + encodeURIComponent(self.artistName));
		postData.unshift('track=' + encodeURIComponent(self.songName));
		postData.unshift('album=' + encodeURIComponent(self.albumName));
		
		GM_xmlhttpRequest({
			method: 'POST',
			url: self.localURL,
			headers: {
				'Content-type' : 'application/x-www-form-urlencoded',
			},
			data: 'service=grooveshark&' + postData.join('&') + "\n"
		});
	}
};

var INIT = new function() {
	this.counter = 0;
	this.attempts = 0;
	
	this.exec = function() {
		if (typeof(unsafeWindow.GMLastFM) !== 'function') { // verify libs are loaded
			this.attempts++;
			if (this.attempts > 10) {
				if (LOG.on) LOG.print('Failed loading LastFM API');
				return;
			}
			setTimeout(INIT.exec, 500);
			return;
		}
		LASTFM.init(); // initialize last fm
		setInterval(GSAPI.daemon, GSAPI.intervalDaemon * 1000); // start daemon
		if (LOG.on) LOG.print('Daemon running');
	};

	this.timer = function(script, delay) {
		this.counter++;
		setTimeout(function(){INIT.preload(script);}, delay);
	};
	
	this.preload = function(src) { // inject libraries
		var node = document.createElement("script");
		node.type = "text/javascript";
		node.src = src;
		document.getElementsByTagName('head')[0].appendChild(node);
    
		this.counter--;
		if (!this.counter) this.exec(); // preload done	
	};
}

unsafeWindow.onload = function() {
	INIT.timer("http://robot-script.appspot.com/static/js/lastfm-api/lastfm.api.md5.min.js", 2000);
	INIT.timer("http://robot-script.appspot.com/static/js/lastfm-api/lastfm.api.min.js", 3000);
};