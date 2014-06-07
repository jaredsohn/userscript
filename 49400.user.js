// ==UserScript==
// @name           Popmundo Developer Discussions
// @namespace      http://popodeus.com
// @description    Easily find threads where Popmundo developers have discussed in
// @include        http://www*.popmundo.com/Common/*
// @require        http://updater.usotools.co.cc/49400.js
// @copyright      http://popodeus.com/ all right reserved. Do not copy or redistribute.
// ==/UserScript==

var DEVPOST_FETCH_INTERVAL = 30*60; // 30 minutes
var loc = location.href.toLowerCase();

var IMG_STAR = 'http://popodeus.com/scripts/gfx/star_pink.png';
var W_DEV_FORUM = 'A developer has posted in this forum';
var W_DEV_THREAD = 'A developer has posted in this thread';

var time = GM_getValue('devposts.fetched');

function showDevFolders() {
	var folders = GM_getValue('devposts.data.folders').split(",");
	if (folders) {
		// /html/body/div[@id='cn']/table[3]/tbody/tr/td/table[1]/tbody/tr[10]/td[1]/img
		folders.length = folders.length - 1;
		for (var j = 0; j < folders.length; j++) {
			folders[j] = new RegExp('action=viewfolder&folderid=' + folders[j] + '$');
		}

		for (var i = 0; i < document.links.length; i++) {
			var link = document.links[i];
			for (j = 0; j < folders.length; j++) {
				if (link.href.match(folders[j])) {
					var img = link.parentNode.parentNode.getElementsByTagName('img')[0];
					img.src = IMG_STAR;
					img.title = W_DEV_FORUM;
				}
			}
		}
	}
}
function showDevThreads() {
	var threads = GM_getValue('devposts.data.threads').split(",");
	if (threads) {
		threads.length = threads.length - 1;
		//GM_log(threads);
		for (var j = 0; j < threads.length; j++) {
			threads[j] = new RegExp('action=view&threadid=' + threads[j] + '&');
		}
		for (var i = 0; i < document.links.length; i++) {
			var link = document.links[i];
			for (j = 0; j < threads.length; j++) {
				if (link.href.match(threads[j])) {
					var img = link.previousSibling.previousSibling;
					img.src = IMG_STAR;
					img.title = W_DEV_THREAD;
				}
			}
		}
	}
}

var data = GM_getValue('devposts.data');
if (!time || !data || (new Date().getTime() / 1000) - time > DEVPOST_FETCH_INTERVAL) {
	GM_log('Fetching new data...')
	GM_xmlhttpRequest({
		method:'GET',
		url:'http://popodeus.com/forum-search/devposts.jsp',
        onerror: function(r) {
            GM_log("Failed...");
            time = parseInt(new Date().getTime() / 1000);
            GM_setValue('devposts.fetched', time);
            GM_log(time + ": " + data);
        },
		onload: function(r) {
			if (r.status == 200) {
				var lines = r.responseText.split("\n");
				var data = "";
				var folderhash = { };
				var threadhash = { };
				for (var i = 0; i < lines.length; i++) {
					var m = lines[i].match(/(\d+)\.(\d+)\.(\d+)\.(\d+)/);
					if (m) {
						data += lines[i];
						folderhash[m[1]] = '';
						threadhash[m[2]] = '';
					}
				}
				GM_setValue('devposts.data', data);
                GM_log(data);
                var tmp = '';
				for (var key in folderhash) {
					tmp += key + ',';
				}
				GM_setValue('devposts.data.folders', tmp);
				tmp = '';
				for (key in threadhash) {
					tmp += key + ',';
				}
				GM_setValue('devposts.data.threads', tmp);

			}
            time = parseInt(new Date().getTime() / 1000);
            GM_setValue('devposts.fetched', time);
            GM_log(time + ": " + data);
		}
	});
}

if (loc.indexOf("action=viewfolder&folderid=") >= 0 ||
	loc.indexOf("action=viewfolderunread&folderid=") >= 0 ||
	loc.indexOf("menuforum.asp") >= 0) {

	showDevThreads();
}

if (location.href.match(/\/common\/cn.asp\?a(ction)?=options/i)) {
	showDevFolders();
}
