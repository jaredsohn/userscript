// ==UserScript==
// @name           Facebook YouTube auto play
// @namespace      http://sakuratan.biz/
// @description    Auto playing YouTube video clips on the Facebook news feed
// @version        1.0
// @include        http://www.facebook.com/*
// @include        http://www.facebook.com/?*
// @include        https://www.facebook.com/*
// @include        https://www.facebook.com/?*
// ==/UserScript==

var running = false;
var last_nchild = 0;
var video_wrapper;
var title_wrapper;
var video_id;
var restart_handle = null;
var q = [];
var mark = {};

function load() {
    video_wrapper.innerHTML = '';
    var ytapiplayer = document.createElement('div');
    ytapiplayer.id = 'ytapiplayer';
    video_wrapper.appendChild(ytapiplayer);

    var params = { allowScriptAccess: "always" };
    var atts = { id: "myytplayer" };

    unsafeWindow.swfobject.embedSWF("http://www.youtube.com/v/" + video_id + "&enablejsapi=1&autoplay=1", "ytapiplayer", "179", "158.25", "8", null, null, params, atts);
}

function set_restart(timeout) {
    if (restart_handle != null) {
	clearTimeout(restart_handle);
    }
    restart_handle = setTimeout(load, timeout);
}

function clear_restart() {
    if (restart_handle != null) {
	clearTimeout(restart_handle);
	restart_handle = null;
    }
}

function skip() {
    var player = document.getElementById('myytplayer').wrappedJSObject;
    player.stopVideo();
    video_wrapper.innerHTML = '';
    title_wrapper.innerHTML = '';
    dequeue();
}

function dequeue() {
    running = true;
    if (q.length <= 0) {
	running = false;
	return;
    }

    var elem = q.shift();
    video_id = elem.video_id;

    var title_link = document.createElement('a');
    title_link.innerHTML = elem.title;
    title_link.href = 'http://www.youtube.com/watch?v=' + video_id;
    title_link.target = '_blank';
    title_wrapper.innerHTML = '';
    title_wrapper.appendChild(title_link);

    if (elem.user) {
	title_wrapper.appendChild(document.createTextNode(' via '));
	title_wrapper.appendChild(elem.user);
    }

    var skip_button = document.createElement('a');
    skip_button.addEventListener('click', skip, false);
    skip_button.innerHTML = '&#x2318;';
    skip_button.title = 'skip';
    title_wrapper.appendChild(document.createTextNode(' '));
    title_wrapper.appendChild(skip_button);

    elem = null;

    load();
}

function findup_user(origin) {
    var node = origin.parentNode;
    if (!node) {
	return null;
    }
    var actors = node.getElementsByClassName('actorName');
    if (actors.length) {
	return actors[0].cloneNode(true);
    }
    return findup_user(node);
}

function enqueue() {
    var home_stream = document.getElementById('home_stream');
    if (!home_stream) {
	return;
    }
    if (home_stream.childNodes.length == last_nchild) {
	return;
    }
    last_nchild = home_stream.childNodes.length;

    var a = home_stream.getElementsByTagName('a');
    for (var i = 0; i < a.length; ++i) {
	var mo = a[i].href.match(/^http:\/\/www\.youtube\.com\/watch\?v=([^&]*)/);
	if (mo && mo[1] && !mark[mo[1]]) {
	    mark[mo[1]] = true;
	    q.push({video_id:mo[1],title:a[i].innerHTML,user:findup_user(a[i])});
	    if (!running) {
		dequeue();
	    }
	}
    }
}

function main() {
    var leftCol = document.getElementById('leftCol');
    if (!leftCol || !document.getElementById('home_stream')) {
	return;
    }

    // Load SWFObject from Google Ajax libraries
    var head = document.getElementsByTagName('head');
    var swfobject = document.createElement('script');
    swfobject.src = 'http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js';
    head[0].appendChild(swfobject);

    // Add SWFObject Event Handlers to the window
    unsafeWindow.onytplayerStateChange = function(newState) {
	if (newState == 3) {
	    set_restart(30000);
	} else {
	    clear_restart();
	}
	if (newState == 0) {
	    dequeue();
	}
    }

    unsafeWindow.onytplayerError = function(errorCode) {
	dequeue();
    }

    unsafeWindow.onYouTubePlayerReady = function(playerId) {
        set_restart(10000);
	var player = document.getElementById('myytplayer').wrappedJSObject;
	player.addEventListener('onStateChange', 'onytplayerStateChange');
	player.addEventListener('onError', 'onytplayerError');
    }

    // Modify sidebar
    var navSect = document.createElement('div');
    navSect.className = 'sideNavSectionContent';

    var sep = document.createElement('div');
    sep.className = 'uiHeader uiHeaderTopBorder uiHeaderNav uiHeaderNavEmpty';
    navSect.appendChild(sep);

    video_wrapper = document.createElement('div');
    navSect.appendChild(video_wrapper);

    title_wrapper = document.createElement('div');
    navSect.appendChild(title_wrapper);

    leftCol.appendChild(navSect);

    // Start polling
    setInterval(enqueue, 2500);
}

main();
