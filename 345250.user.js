// ==UserScript==
// @name           YouTube Video Downloader
// @namespace      http://userscripts.org/scripts/show/345250
// @description    Adds a download menu to YouTube videos.
// @version        1.2
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// ==/UserScript==

(function () {
"use strict";

if (typeof String.prototype.contains != 'function') {
    String.prototype.contains = function (s) {
        return this.indexOf(s) != -1;
    };
}

function clickButton (event) {
	var els = this.parentNode.getElementsByClassName("yt-uix-button-toggled");
	for (var i = 0; i < els.length; ++ i) {
		els[i].classList.remove("yt-uix-button-toggled");
	}
	this.classList.add("yt-uix-button-toggled");
	event.preventDefault();
}

function insertForm (videos) {
	var actions = document.getElementById("watch7-secondary-actions");
	if (!actions) return;
	var after = document.getElementById("watch-actions-share");

	if (!after || after.parentNode != actions) {
		if (actions.getElementsByClassName) {
			after = actions.getElementsByClassName("clear");
			after = after[after.length-1];
		}
	}

	if (!after) {
		after = actions.lastElementChild;
	}

	var lists = [];
	var types = {};
	for (var i = 0; i < videos.videos.length; ++ i) {
		var video = videos.videos[i];
		var res = video.size ? video.size.height+'p' : 'Unknown Size';
		var type = video.type.split(';')[0].split('/')[1].replace(/^x-/,'');
		var url = video.url;
		if (video.sig) url += "&signature="+video.sig;
		var item = [video.size ? video.size.height : 0, res, url];
		if (type in types) {
			types[type].push(item);
		}
		else {
			lists.push([type, (types[type] = [item])]);
		}
	}
	lists.sort(function (lhs,rhs) {
		lhs = lhs[0];
		rhs = rhs[0];
		return lhs < rhs ? -1 : (lhs > rhs ? 1 : 0);
	});

	var filename = (videos.title + (videos.user ? " by " + videos.user : "")).
		replace(/["\?]/g,'').
		replace(/[:;<>\*\|\/\\]/g,' ').
		replace(/\s\s+/g,' ').
		replace(/^\s+/,'').
		replace(/\s+$/,'')+".";

	var menu = document.createElement('div');
	menu.style.display = 'none';
	menu.id = "action-panel-download";
	menu.className = "action-panel-content hid";
	menu.setAttribute("data-panel-loaded","true");
	menu.style.lineHeight = "1.5";

	for (var i = 0; i < lists.length; ++ i) {
		var type = lists[i];
		var downloads = type[1];
		var div = document.createElement('div');
		var ul = document.createElement('ul');
		var title = document.createElement('strong');
		type = type[0];
		title.appendChild(document.createTextNode(type));
		ul.style.textAlign = "right";
		div.style.marginRight = "20px";
		div.style.display = "inline-block";
		div.style.verticalAlign = "top";
		downloads.sort(function (lhs,rhs) { return lhs[0] - rhs[0]; });

		for (var j = 0; j < downloads.length; ++ j) {
			var download = downloads[j];
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.href = download[2];
			a.setAttribute("download", filename+type);
			a.appendChild(document.createTextNode(download[1]));
			li.appendChild(a);
			ul.appendChild(li);
		}

		div.appendChild(title);
		div.appendChild(ul);
		menu.appendChild(div);
	}
	
	var btn = document.createElement('button');
	var span = document.createElement('span');
	btn.type = 'button';
	span.className = 'yt-uix-button-content';
	span.appendChild(document.createTextNode('Download'));
	btn.appendChild(span);
	btn.className = 'action-panel-trigger yt-uix-button yt-uix-button-text yt-uix-button-download';
	btn.addEventListener('click', clickButton, false);
	btn.setAttribute('data-trigger-for','action-panel-download');
	btn.setAttribute('role','button');

	if (after) {
		actions.insertBefore(btn, after);
	}
	else {
		actions.appendChild(btn);
	}

	document.getElementById('watch7-action-panels').appendChild(menu);
}

function parseVars (vars) {
	vars = vars.split("&");
	var map = {};
	for (var i = 0; i < vars.length; ++ i) {
		var v = vars[i];
		var j = v.search("=");
		if (j < 0) j = v.length;
		var key = decodeURIComponent(v.slice(0,j).replace(/\+/g, ' '));
		var value = decodeURIComponent(v.slice(j+1).replace(/\+/g, ' ') || "");

		if (key in map) {
			var old = map[key];
			if (typeof(old) === "string") {
				map[key] = [old, value];
			}
			else {
				old.push(value);
			}
		}
		else {
			map[key] = value;
		}
	}
	return map;
}

function findJSConfig () {
	if (window.yt && window.yt.playerConfig) {
		return window.yt.playerConfig.args;
	}
	var scripts = document.getElementsByTagName("script");
	for (var i = 0; i < scripts.length; ++ i) {
		var script = scripts[i];
		var m = /^\s*(?:yt\.playerConfig|.*;\s*ytplayer\.config)\s*=\s*(.*);\s*$/m.exec(script.textContent || script.text);
		if (m) {
			try {
				return JSON.parse(m[1]).args;
			}
			catch (e) {}
		}
	}

	return null;
}

function findFlashConfig () {
	var movie_player = document.getElementById("movie_player");
	if (!movie_player) {	
		return null;
	}

	var flashvars = movie_player.getAttribute('flashvars');
	if (!flashvars) {
		return null;
	}

	return parseVars(flashvars);
}

function getVideos () {
	var config = findFlashConfig();

	if (!config) {
		config = findJSConfig();
	}

	if (!config || !config.url_encoded_fmt_stream_map) {
		return null;
	}

	var fmt_stream_map = config.url_encoded_fmt_stream_map;
	var fmt_list = config.fmt_list ? config.fmt_list.split(',') : [];
	var sizes = {};
	for (var i = 0; i < fmt_list.length; ++ i) {
		var v = fmt_list[i].split('/');
		var size = v[1].split('x');
		sizes[v[0]] = {
			width:  parseInt(size[0], 10),
			height: parseInt(size[1], 10)
		};
	}

	fmt_stream_map = fmt_stream_map.split(',');
	var videos = [];
	for (var i = 0; i < fmt_stream_map.length; ++ i) {
		var video = parseVars(fmt_stream_map[i]);
		video.size = sizes[video.itag];
		videos.push(video);
	}

	var title = config.title;
	
	if (!title) {
		title = document.querySelector("*[itemscope] *[itemprop='name'], head meta[name='title']");
	
		if (title) {
			title = title.getAttribute("content");
		}
		else {
			title = config.video_id;
		}
	}
	
	var user = document.querySelector("a[rel='author']");

	if (user) {
		user = (user.getAttribute("title") || user.textContent || user.text || '').replace(/^\s+/,'').replace(/\s+$/,'') || null;
	}

	if (!user) {
		user = document.querySelector("*[itemscope][itemprop='author'] link[itemprop='url']");
		if (user) {
			user = user.getAttribute("href").split("/").pop();
		}
	}

	return {title: title, user: user, videos: videos};
}

var retry_count = 0;
function retryLater () {
	setTimeout(function () {
		var videos = getVideos();
		if (videos) {
			insertForm(videos);
		}
		else if (retry_count < 10) {
			++ retry_count;
			retryLater();
		}
	}, 1000);
}
    
    function registerAjaxCallback(){
        var xhr = XMLHttpRequest;
            var open = xhr.prototype.open;
            var send = xhr.prototype.send;

            xhr.prototype.open = function (method, url, async, user, pass) {
                this._url = url;
                open.call(this, method, url, async, user, pass);
            };

            xhr.prototype.send = function (data) {
                var self = this;
                var callerOnReadyStateChange;
                var url = this._url;

                function onReadyStateChange() {
                    if (callerOnReadyStateChange) {
                        callerOnReadyStateChange();
                    }

                    if (url.contains('watch?') && self.readyState == 4 /* complete */) {
                        window.setTimeout(function () {
                            retry_count = 0;
                            retryLater();
                        }, 200);
                    }
                }

                if (this.addEventListener) {
                    this.addEventListener("readystatechange", onReadyStateChange, false);
                } else {
                    callerOnReadyStateChange = this.onreadystatechange;
                    this.onreadystatechange = onReadyStateChange;
                }

                send.call(this, data);
            };
    }

var videos = getVideos();
if (videos) {
	insertForm(videos);
}
else if (!document.body) {
	window.addEventListener("load",function () {
		var videos = getVideos();
		if (videos) {
			insertForm(videos);
		}
		else {
			retryLater();
		}
	},false);
}
else {
	retryLater();
};
    
    registerAjaxCallback();

})();