// ==UserScript==
// @name           Download YouTube Videos
// @namespace      http://userscripts.org/users/90251
// @description    Adds a download menu to YouTube videos.
// @include        http://*.youtube.com/*
// @include        http://youtube.com/*
// @include        https://*.youtube.com/*
// @include        https://youtube.com/*
// ==/UserScript==

(function () {
"use strict";

function clickButton (event) {
	var els = this.parentNode.getElementsByClassName("yt-uix-button-toggled");
	for (var i = 0; i < els.length; ++ i) {
		els[i].classList.remove("yt-uix-button-toggled");
	}
	this.classList.add("yt-uix-button-toggled");
	event.preventDefault();
}

function createMenu (videos) {
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
		ul.style.listStyle = "none";
		ul.style.margin = "0";
		ul.style.padding = "0";
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

	return menu;
}

function createMenuButton () {
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
	return btn;
}

function createSidebar (videos) {
	var toolbar = document.getElementById("docs-toolbar-wrapper");

	var sidebar = document.createElement('div');
	var hdr = document.createElement('div');
	var close = document.createElement('div');
	var icon = document.createElement('div');
	var img = document.createElement('div');
	var details = document.createElement('div');
	var menu = createMenu(videos);

	sidebar.id = 'docs-details-sidebar';
	sidebar.style.top = toolbar ? (toolbar.offsetTop + toolbar.offsetParent.offsetTop)+'px' : '0px';
	sidebar.style.bottom = '0px';
	hdr.id = 'docs-details-sidebar-header';
	close.id = 'docs-details-sidebar-close';
	close.tabindex = '0';
	close.title = 'Close';
	close.setAttribute('onclick', 'this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);');
	icon.className = 'docs-icon goog-inline-block ';
	img.className = 'docs-icon-img-container docs-icon-img docs-icon-close-white';
	details.className = 'docs-details-sidebar-details jfk-sidebar';
	menu.style.marginTop = '10px';
	menu.style.textAlign = 'center';

	img.appendChild(document.createTextNode('\u00A0'));
	icon.appendChild(img);
	close.appendChild(icon);
	hdr.appendChild(document.createTextNode('Download'));
	hdr.appendChild(close);
	sidebar.appendChild(hdr);
	details.appendChild(menu);
	sidebar.appendChild(details);

	return sidebar;
}

function insertForm (videos) {
	var actions = document.getElementById("watch7-secondary-actions");
	if (!actions) {
		var sidebar = document.getElementById("docs-details-sidebar");

		if (sidebar) {
			sidebar.parentNode.removeChild(sidebar);
		}
		document.body.appendChild(createSidebar(videos));
		return;
	}

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

	var menu = createMenu(videos);
	var btn = createMenuButton();

	menu.style.display = 'none';

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
	if (window.ytplayer && window.ytplayer.config) {
		return window.ytplayer.config.args;
	}
	if (window.yt && window.yt.playerConfig) {
		return window.yt.playerConfig.args;
	}
	var scripts = document.getElementsByTagName("script");
	for (var i = scripts.length - 1; i >= 0; -- i) {
		var script = scripts[i];
		var code = script.textContent || script.text;
		var m = /;\s*ytplayer\.config\s*=\s*(.*);\(function\(\).*\(\)\);\s*$/m.exec(code) || /\byt\.playerConfig\s*=\s*(.*);\s*$/m.exec(code);
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
	var movie_player = document.getElementById("movie_player") || document.getElementById("vpl1");
	if (!movie_player) {	
		return null;
	}

	var flashvars;
	
	if (movie_player.nodeName === 'OBJECT') {
		flashvars = movie_player.querySelector('param[name=flashvars]');

		if (!flashvars) {
			return null;
		}

		flashvars = flashvars.getAttribute('value');
	}
	else {
		flashvars = movie_player.getAttribute('flashvars');
	}

	if (!flashvars) {
		return null;
	}

	return parseVars(flashvars);
}

function parseFmtStreamMap (map, sizes) {
	var videos = [];
	map = map.split(',');
	for (var i = 0; i < map.length; ++ i) {
		var video = parseVars(map[i]);
		var size = video.size;
		if (size) {
			size = size.split('x');
			video.size = {
				width:  parseInt(size[0], 10),
				height: parseInt(size[1], 10)
			};
		}
		else {
			video.size = sizes[video.itag];
		}
		videos.push(video);
	}
	return videos;
}

function getVideos () {
	var config = findFlashConfig();

	if (!config) {
		config = findJSConfig();
	}

	if (!config || !config.url_encoded_fmt_stream_map) {
		return null;
	}

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

	var videos = parseFmtStreamMap(config.url_encoded_fmt_stream_map, sizes);

// these aren't really files but streams in some obscure binary format that separates audio and video
//	if (config.adaptive_fmts) {
//		videos.push.apply(videos, parseFmtStreamMap(config.adaptive_fmts, sizes));
//	}

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
		else if (retry_count < 5) {
			++ retry_count;
			retryLater();
		}
	}, 1000);
}

var videos = getVideos();
if (videos) {
	insertForm(videos);
	handleDynamicUpdates();
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
		handleDynamicUpdates();
	},false);
}
else {
	retryLater();
	handleDynamicUpdates();
}

function handleDynamicUpdates () {
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	if (!MutationObserver) return;
	var observer = new MutationObserver(function (mutations) {
		for (var i = 0; i < mutations.length; ++ i) {
			var mutation = mutations[i];

			if (mutation.type === "childList") {
				for (var j = 0; j < mutation.addedNodes.length; ++ j) {
					var node = mutation.addedNodes[j];
					if (node.nodeType === 1 && (node.id === "watch7-container" || node.querySelector("#watch7-container"))) {
						var videos = getVideos();
						if (videos) {
							insertForm(videos);
						}
					}
				}
			}
		}
	});

	observer.observe(document.body, {childList: true, subtree: true});
}

})();