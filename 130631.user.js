// ==UserScript==
// @name			4chan Expand Threads
// @namespace	4chanExpandThreads
// @description		Expands threads (and abbreviated posts) inline, replaces 4chan firefox extension functionality
// @version			2.0.2
// @updateURL		http://userscripts.org/scripts/source/130631.user.js
// @include			http://boards.4chan.org/*
// @include			https://boards.4chan.org/*
// @exclude			http://boards.4chan.org/*/res/
// @exclude			https://boards.4chan.org/*/res/
// ==/UserScript==

(function() {

	var threads = {};
	
	function calcStrings(pc, ic, o) {
		var ret = pc;
		ret += " post";
		if (pc > 1) { ret += "s"; }
		if (ic > 0) {
			ret += " and "+ic+" image repl";
			if (ic > 1) { ret += "ies"; }
			else { ret += "y"; }
		}
		if (!o) { ret += "."; }
		else { ret += " omitted. Click Reply to view."; }
		return ret;
	}
	function loadThread(threadObj, callback) {
		threadObj.loading = true;		
		GM_xmlhttpRequest({
			method : "GET",
			url : location.protocol+'//'+location.host+'/'+location.pathname.split("/")[1]+'/res/'+threadObj.id,
			onload : function(response) { 
				var posts = [], i, j = 0, tmpDiv, tp;
				threadObj.loading = false;
				if (response.status === 200) {
					tmpDiv = document.createElement("div");
					tmpDiv.innerHTML = response.responseText;
					tp = tmpDiv.querySelectorAll('.postContainer');
					for (i = 0; i < tp.length; i += 1) {
						posts.push(tp[i].outerHTML);
					}
					if (posts) { 
						threadObj.cache = posts;
						for (i = 1; i < posts.length; i += 1) {
							if (posts[i].indexOf("<img") !== -1) {
								j += 1;
							}
							if (i === posts.length - 6) {
								threadObj.omittedString = calcStrings(posts.length - 6, j, true);
							}
						}
						threadObj.imgCount = j;
						threadObj.showString = calcStrings(posts.length - 1, j);
					}
				}
				if (callback) {
					callback(posts);
				}
			}
		});
	}
	
	function replacePosts(threadObj, posts, postId) {
		var sib, sib2, i, j, div, fragment = document.createDocumentFragment(), found = 0;
		if (!posts) { return false; }
		if (typeof postId !== "undefined") {
		//	replace single post
			div = document.createElement('div');
			if (postId === 0) {
				div.innerHTML = posts[0];
				threadObj.el.querySelector('blockquote.postMessage').innerHTML = div.querySelector('blockquote.postMessage').innerHTML;
				return;
			} else {
				sib = threadObj.el.querySelector("#pc"+postId);
				if (sib) {
					div.innerHTML = posts[0];
					sib.innerHTML = div.childNodes[0].innerHTML;
				}
			}			
		} else {
		// replace complete thread
			div = document.createElement('div');
			sib = threadObj.el.querySelectorAll('.postContainer');
			div.innerHTML = posts[0];
			sib[0].querySelector('blockquote.postMessage').innerHTML = div.querySelector('blockquote.postMessage').innerHTML;
			for (i = 1; i < sib.length; i += 1) {
				threadObj.el.removeChild(sib[i]);
			}
			for (i = 1; i < posts.length; i += 1) {
				div.innerHTML = posts[i];
				if (div.childNodes && div.childNodes[0]) {
					fragment.appendChild(div.childNodes[0]);
				}
			}				
		}
		threadObj.el.appendChild(fragment);
	}
	function toggleThread(threadObj, state) {
		var request, cb, interval;
		if (!threadObj.loading) {
			threadObj.state = state;
			if (state === 1) {
				cb = function() {
					threadObj.button.innerHTML = "&ndash;";
					replacePosts(threadObj, threadObj.cache);
					if (interval) { clearInterval(interval); }
					threadObj.oel.innerHTML = threadObj.showString;
				};
				if (!threadObj.cache) {
					threadObj.oel.innerHTML = "&middot;";
					interval = setInterval(function() {
						switch(threadObj.oel.innerHTML.length) {
							case 1: threadObj.oel.innerHTML = "&middot; &middot;"; break;
							case 3: threadObj.oel.innerHTML = "&middot; &middot; &middot;"; break;
							default: threadObj.oel.innerHTML = "&middot;"; break;
						}
					}, 150);
					loadThread(threadObj, cb);
				} else {
					cb();
				}
			} else {
				if (threadObj.cache) {
					threadObj.button.innerHTML = "+";
					replacePosts(threadObj, [threadObj.cache[0]].concat(threadObj.cache.slice(threadObj.cache.length - (threadObj.sticky ? 1 : 5))));
					threadObj.oel.innerHTML = threadObj.omittedString;
				}
			}
		}
	}
	function togglePost(threadObj, link) {		
		var cb = function(posts) {
			var postId, i, sib;
			if (link.parentNode.parentNode.parentNode.className === "post op") {
				replacePosts(threadObj, [posts[0]], 0);
			} else {
				postId = link.parentNode.parentNode.id.substr(1);
				for (i = 0; i < posts.length; i += 1) {
					if (posts[i].indexOf('<div class="postContainer replyContainer" id="pc'+postId) !== -1) {
						replacePosts(threadObj, [posts[i]], postId);
					}
				}
			}
		};
		if (!threadObj.loading) {
			if (!threadObj.cache) {
				loadThread(threadObj, cb);
			} else {
				cb(threadObj.cache);
			}
		}
	}
	
	
	function initExpandThreads(container) {		
		var threadNodes,	threadObj, i, j, sib, sibA, expandThreadButton, abbr, abbrLink,
		
			threadEvent = function(e) {
				toggleThread(this, this.state === 0 ? 1 : 0);
				e.currentTarget.blur();
				e.preventDefault();
				e.stopImmediatePropagation();
				return false;
			},
			postEvent = function(e) {
				togglePost(this, e.currentTarget);
				e.currentTarget.blur();
				e.preventDefault();
				e.stopImmediatePropagation();
				return false;
			};
		
		if (container.className && container.className.indexOf("thread") !== -1) {
			threadNodes = [container];
		} else {
			threadNodes = container.querySelectorAll('.thread');
		}
		
		for (i = 0; i < threadNodes.length; i += 1) {
			threadObj = {};
			threadObj.el = threadNodes[i];
			threadObj.state = 0;
			threadObj.cache = null;
			threadObj.imgCount = null;
			threadObj.id = threadNodes[i].id.substr(1);
			threadObj.sticky = !!threadNodes[i].querySelectorAll('.post .postInfo img[title=Sticky]').length;
			
			sib = document.querySelectorAll('#'+threadNodes[i].id+' .summary.desktop');
			if (sib && sib[0]) {
				expandThreadButton = document.createElement("a");
				expandThreadButton.setAttribute("style", "display:inline-block;width:15px;text-align:center;line-height:15px;margin-right:8px;font-size:12px;background:#cccccc;cursor:pointer;border-radius:2px;");
				expandThreadButton.innerHTML = "+";
				threadNodes[i].appendChild(expandThreadButton);
				threadNodes[i].insertBefore(expandThreadButton, sib[0]);
				threadObj.button = expandThreadButton;
				expandThreadButton.addEventListener("click", threadEvent.bind(threadObj));
				threadObj.oel = sib[0];
			}

			sib = threadNodes[i].querySelectorAll('.post .postMessage .abbr a');
			if (sib && sib.length > 0) {
				for (j = 0; j < sib.length; j += 1) {
					sib[j].addEventListener("click", postEvent.bind(threadObj));
				}
			}
		}
	}	
	
	function init() {
		var postForm = document.getElementsByName('delform')[0];
		if (postForm) { initExpandThreads(postForm); }
		
		document.addEventListener('DOMNodeInserted', function(e) {
			if (e.target.className.indexOf("thread") !== -1) {
				initExpandThreads(e.target);
			}
		}, false);
		
	}
	
	if(document.body) { init(); }
	else { window.addEventListener("DOMContentLoaded", init, false); }
	
}());