// ==UserScript==
// @name            YouTube Homepage Perfect
// @description     Removes all crap from the new homepage and restores the inbox to the homepage
// @include         http://*youtube.com*
// @include         https://*youtube.com*
// @run-at          document-start
// @unwrap
// @version         2012.6-1
// ==/UserScript==

/**
 * Copyright (c) 2011-2012 Marco D. Pfeiffer (Nemo64)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function (unsafeWindow) {

// check if the domain is currect
if (!/youtube\.com$/i.test(location.hostname)) return;

// check if the script already runs
if (unsafeWindow.YTBSP) return;
unsafeWindow.YTBSP = true;

// config
var LOADATTHESAMETIME = 10, // DEFAULT: 10 (higher numbers result into slower loading of single items but overall faster laoding)
	ITEMSPERROW = 5, // DEFAULT: 5
	ITMESPERROWWITHOUTSIDEBAR = 7, // DEFAULT: 7
	MAXITEMSPERSUB = 35, // DEFAULT: 35 (should be dividable with ITEMSPERROW AND ITMESPERROWWITHOUTSIDEBAR)
	SCREENLOADTHREADSHOLD = 1500, // DEFAULT: 1000
	UPDATEINTERVAL = 1000*60*60*24, // DEFAULT: 1000*60*60*24 (1 day)
	UPDATEDELAY = 5000, // DEFAULT: 5000 (5 sek)


// resources
	VERSION = "2012.6-1",
	UPDATEURL = "http://sett.bplaced.net/userscripts/YTBSP/version.json",
	AJAXLOADER = '<img alt="..." class="ytbsp-ajaxloader" src="data:image/gif;base64,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" />';


// a simple but optimized css selector
var RxIsCl = /^(\.[\w-]+)$/m,
	RxIsTn = /^([\w-]+|\*)$/m;
function $ (selector, object, noerror) {
	if (object == null) object = document;
	
	try {
		var result = RxIsCl.test( selector ) ? object.getElementsByClassName( selector.substr(1).replace(/\./g, " ") )
		           : RxIsTn.test( selector ) ? object.getElementsByTagName( selector )
		           : object.querySelectorAll( selector );
		
		if (result.length === 0 && !noerror) console.warn('Selector "' + selector + '" returned empty result. Could be an error!');
		return Array.prototype.slice.call( result );
	} catch (e) {
		throw 'Selector throw error on: "' + selector + "\"\n Error: " + e;
	}
}


// will call an function during pageload as soon as matching elements are available BEFORE DOMContentLoaded !!! ... and after if failed
function callForEach (selector, callback, limit) {
	var elements = $( selector, document, true ); // get all elements that are already in the dom
	elements.forEach( callback ); // call for already existing elements
	
	// if the document hasn't fully loaded yet
	if ((!limit || elements.length < limit) && document.readyState !== "complete") {
	
		// will be called for every time a node is inserted into the document
		function nodeInserted () {
			
			var i = elements.length;
			elements = $( selector );
			
			// call the callback for all new elements that haven't been found yet
			for (var ilen = elements.length; i < ilen && (!limit || i < limit); ++i) {
				callback( elements[i], i );
			}
			
			// if the limit has been reached stop listening to these events
			if (limit && elements.length >= limit) {
				document.removeEventListener("DOMNodeInserted", nodeInserted, false);
				document.removeEventListener("DOMContentLoaded", onload, false);
			}
		}
		
		// will be called on document load
		function onload () {
			document.removeEventListener("DOMNodeInserted", nodeInserted, false); // remove listener for performance
			nodeInserted(); // protent there was a node inserted
		}
		document.addEventListener("DOMNodeInserted", nodeInserted, false); // bind only if matchSelector is available
		document.addEventListener("DOMContentLoaded", onload, false); // for some checking after domload
	}
}


// a set of basic ajax functions
var loadFuncs = [], loading = 0;
function loadTrigger () {
	
	while (loading < LOADATTHESAMETIME) {
		var loadFunc = loadFuncs.shift();
		if (typeof loadFunc === "function") {
			++loading;
			loadFunc();
		} else {
			break;
		}
	}
}
function ajax (url, callback, onerror) {

	loadFuncs.push(function () {
	
		var req = new XMLHttpRequest(),
			errorTimeout;
		
		function error () {
			if (req.abort) req.abort();
			if (typeof onerror === "function") onerror.call(req);
			console.error('Request for "' + url + '" failed');
			loadTrigger();
		}
		
		req.open("GET", url, true);
		req.onreadystatechange = function () {
			
			clearTimeout(errorTimeout);
			
			if (this.readyState !== 4) {
				errorTimeout = setTimeout(error, 30000);
			
			} else if (this.status === 200) {
				callback.call(this, this.responseText);
				--loading;
				loadTrigger();
				
			} else error();
		};
		req.send();
	});
	loadTrigger();
}

// create a dom to search in
var defaultBodyRx = /<body[^>]*>([\s\S]*)<\/body>/im,
	imgRx  = /src(=("[^\"]*"|\w*))?/gim,
	remoRx = /<(script|style|object|embed|link|meta|video|audio|iframe|!--)[^>]*>([\s\S]*<\/\1>)?/gim
function createDOM (content, bodyRx) {
	if (bodyRx == null) bodyRx = defaultBodyRx;
	
	// get the body out of the html
	var bodyContent = content.match(bodyRx);
	if (bodyContent && bodyContent.length) content = bodyContent[1];
	
	// rename resources (so they won't load) and remove every tag that never has informations and just wasts performance
	content = content.replace(imgRx, "data-src$1").replace(remoRx, "");
	
	var div = document.createElement("div");
	div.style.display = "none";
	div.innerHTML = content;
	
	return div;
}

// removes unneccesarry spaces at the beginning and ending of a string
function strip (string) {
	return string.replace(/^[\s]*|[\s]*$|\s+(?=\s)/gm, "");
}

// an object loop that uses what the browser can
var objLoop = ("keys" in Object)
	? function (obj, callback, context) {
		var keys = Object.keys(obj), k = 0, klen = keys.length;
		for(; k < klen; ++k) if (callback.call(context, obj[keys[k]], keys[k]) === false) break;
	}
	: function (obj, callback, context) {
		for (var name in obj) if (obj.hasOwnProperty(name) && callback.call(context, obj[name], name) === false) break;
	};











// if we are on the startpage
if (/^\/?(guide|home|index)?$/i.test(location.pathname)) {

	var subs = {}, // contains { USERNAME: SubscriptionObject, ... }
		
		lastScroll = Date.now(), // the last time the page size changed (for inView check)
		screenTop    = 0,
		screenBottom = screenTop + window.innerHeight,
		
		cache = localStorage.getItem("YTBSP"),
		sortSubs = localStorage.getItem("YTBSPsort"),
		hideSubs = localStorage.getItem("YTBSPhide"),
		showSide = localStorage.getItem("YTBSPshowSide");
	
	// parse the config
	sortSubs = sortSubs == null || sortSubs == "1";
	hideSubs = hideSubs == null || hideSubs == "1";
	showSide = showSide == null || showSide == "1";
	
	// if we have a cache parse it
	if (typeof cache === "string") try { cache = JSON.parse(cache); } catch (e) {}
	if (typeof cache !== "object" || cache == null) cache = {};




	// Let's build the new site
	
	var content, old;
	
	// create an div for us
	var headtext = '<span class="func shownative">[toggle native startpage]</span> <span class="func unremove">[reset removed videos]</span> '
		+ '<input type="checkbox" class="func sort" ' + (sortSubs ? 'checked="checked" ':'') + '/><span class="func sort">Sort videos</span>'
		+ '<input type="checkbox" class="func hide" ' + (hideSubs ? '':'checked="checked" ') + '/><span class="func hide">Show empty subscriptions</span>'
		+ '<input type="checkbox" class="func side" ' + (showSide ? 'checked="checked" ':'') + '/><span class="func side">Show sidebar</span>',
		maindiv = document.createElement("div");
	maindiv.id = "YTBSP";
	maindiv.className = showSide ? "" : "large";
	maindiv.innerHTML =
		  '<div id="ytbsp-header">' + headtext + '</div>'
		+ '<ul id="ytbsp-subs"><li>' + AJAXLOADER + ' Loading subscription list</li></ul>'
		+ '<div id="ytbsp-footer">' + headtext + '</div>';
	
	
	
	callForEach("#content > .guide-layout-container", function (element) {
		old = element;
		content = document.getElementById("content");
		
		// first hide the normal startpage content
		old.style.display = "none";
		content.insertBefore(maindiv, old);
		
		callForEach("#video-sidebar", function (sidebar) {
			maindiv.insertBefore(sidebar, maindiv.firstChild);
		
			// make sure YouTube doesn't change the fact that the bar floats
			sidebar.style.float = "right !important";
			sidebar.style.maxWidth = "300px !important";
			sidebar.style.display = showSide ? "block" : "none";
		}, 1);
	}, 1);
	
	
	
	// now get the subList
	var subList = $("#ytbsp-subs", maindiv)[0],
		footer = $("#ytbsp-footer", maindiv)[0];
	
	// now set click event for the toggle native button
	var isNative = false;
	function shownative () {
		
		isNative = !isNative;
		old.style.display = isNative ? "" : "none";
		subList.style.display = footer.style.display = isNative ? "none" : "";
	}
	$(".func.shownative", maindiv).forEach(function (obj) {
		obj.addEventListener("click", shownative, false);
	});
	
	function unremoveAllVideos () {
		var toRebuild = {};
		objLoop(allVideos, function (video) {
			if (video.isRemoved()) {
				video.unremove();
				allVideos[vid].subscriptions.forEach(function (subscription) {
					toRebuild[subscription.name] = subscription;
				});
			}
		});
		objLoop(toRebuild, function (subscription) {
			subscription.buildList();
		});
		saveList();
	}
	$(".func.unremove", maindiv).forEach(function (obj) {
		obj.addEventListener("click", unremoveAllVideos, false);
	});
	
	// sort videos buttons
	function sortVideos () {
		localStorage.setItem("YTBSPsort", sortSubs ? "0" : "1");
		location.reload();
	}
	$(".func.sort", maindiv).forEach(function (obj) {
		obj.addEventListener("click", sortVideos, false);
	});
	
	// hide empty subscriptions button
	function hideSubsFunc () {
		localStorage.setItem("YTBSPhide", hideSubs ? "0" : "1");
		hideSubs = !hideSubs;
		objLoop(subs, function (sub) {
			sub.handleVisablility();
		});
		// change checkbox
		$("input.func.hide", maindiv).forEach(function (element) { element.checked = !hideSubs; });
	}
	$(".func.hide", maindiv).forEach(function (obj) {
		obj.addEventListener("click", hideSubsFunc, false);
	});
	
	// show sidebar
	function toggleSidebarFunc () {
		localStorage.setItem("YTBSPshowSide", (showSide = !showSide) ? "1" : "0");
		objLoop(subs, function (subscription) {
			subscription.buildList();
		});
		$("input.func.side", maindiv).forEach(function (element) { element.checked = showSide; });
		maindiv.className = showSide ? "" : "large";
		callForEach("#video-sidebar", function (sidebar) {
			sidebar.style.display = showSide ? "block" : "none";
		}, 1);
	}
	$(".func.side", maindiv).forEach(function (obj) {
		obj.addEventListener("click", toggleSidebarFunc, false);
	});










	/////////////////////////////////////
	// SUBSCRIPTION Object constructor //
	/////////////////////////////////////
	
	function Subscription (name) {
		
		// some vars
		this.videos = {};
		this.href = cache[name] ? cache[name].href : "";
		this.updateurl = "";
		this.showall = false;
		this.needsUpdate = true;
		
		// if videos are in the cache make instances
		if (cache[name] && cache[name].videos) {
			objLoop(cache[name].videos, function (video, vid) {
				this.videos[vid] = getVideo(this, video);
			}, this);
		}
		
		
		
		// now build the overview
		
		// create Element
		this.row = document.createElement("li");
		this.row.className = "ytbsp-subscription";
		
		// create content
		this.row.innerHTML = '<div class="ytbsp-subinfo">'
		+ '<div class="right"><span class="func removeall">[remove videos]</span> <span class="func reset">[unremove videos]</span>'
		+ ' <span class="func allseen">[mark all as seen]</span> <span class="func showmore">[show more thumbs &gt; ]</span></div>'
		+ '<div class="ytbsp-loaderph">' + AJAXLOADER + '</div><h3 class="ytbsp-subtitle"><a href="'+this.href+'"></a></h3>'
		+ '</div><ul class="ytbsp-subvids"></ul><div style="clear:both"></div>';
		
		// get some tags
		this.videoList = $(".ytbsp-subvids", this.row)[0];
		this.titleObj = $(".ytbsp-subtitle a", this.row)[0];
		
		// put unsave text in an append
		this.titleObj.textContent = name;
		subList.appendChild(this.row);
		this.offsetTop = this.videoList.offsetTop;
		
		
		
		// create function events
		
		var self = this;
		
		// function to reset all videos
		function removeAll () {
			objLoop(self.videos, function (video) {
				video.remove();
			});
			saveList();
			self.buildList();
		}
		$(".func.removeall", this.row).forEach(function (obj) {
			obj.addEventListener("click", removeAll, false);
		});
		
		// function to reset all videos
		function resetAll () {
			objLoop(self.videos, function (video) {
				video.unremove();
			});
			saveList();
			self.buildList();
		}
		$(".func.reset", this.row).forEach(function (obj) {
			obj.addEventListener("click", resetAll, false);
		});
		
		// function to see all
		function seeAll () {
			objLoop(self.videos, function (video) {
				video.see();
			});
			saveList();
		}
		$(".func.allseen", this.row).forEach(function (obj) {
			obj.addEventListener("click", seeAll, false);
		});
		
		// function to show more
		function showMore () {
			if (self.showall = !self.showall) {
				this.textContent = "[show less thumbs < ]";
				self.videoList.style.padding = "80px 0";
			} else {
				this.textContent = "[show more thumbs > ]";
				self.videoList.style.padding = "";
			}
			self.buildList();
		}
		$("span.func.showmore", this.row).forEach(function (obj) {
			obj.addEventListener("click", showMore, false);
		});
		
		
		// complete the build
		this.buildList();
	}
	
	// methods
	Subscription.prototype = {
		
		// builds a new list of videos
		buildList: function () {
			
			// first remove all thumbs
			this.thumbs = {};
			
			var alreadyIn = $( ".ytbsp-video-item", this.videoList, true ),
				visableItems = 0,
				limit = this.showall ? MAXITEMSPERSUB
				      : showSide ? ITEMSPERROW
				      : ITMESPERROWWITHOUTSIDEBAR;
			
			// now loop through the videos 
			objLoop(this.videos, function (video) {
				
				// if that video is removed search for it
				if (video.isRemoved()) {
					var thumb = $( "#YTBSPthumb_"+video.vid, this.videoList, true )[0],
						index = alreadyIn.indexOf( thumb );
					if (thumb && index !== -1) {
						thumb.parentNode.removeChild( thumb );
						alreadyIn.splice( index, 1 );
					}
				
				// if this video isn't removed and we are still in the search of new ones
				} else if (visableItems < limit) {
				
					var thumb = alreadyIn[visableItems];
					if (thumb && thumb.id.substr(11) === video.vid) {
						video.updateThumb( thumb );
						
					
					// if the thumb in this position isn't the right one
					} else {
						thumb = video.createThumb();
						
						if (visableItems < alreadyIn.length) {
							this.videoList.insertBefore( thumb, alreadyIn[visableItems] );
							alreadyIn.splice( visableItems, 0, thumb );
						
						} else {
							this.videoList.appendChild(thumb);
							alreadyIn.push( thumb );
						}
					}
					
					// create a thumb and append it
					//var thumb = video.createThumb();
					//this.videoList.appendChild(thumb);
					//this.thumbs[video.vid] = thumb;
					++visableItems;
				}
				
			}, this);
			
			// remove overstanding items
			for (var i = visableItems, ilen = alreadyIn.length; i < ilen; ++i) {
				this.videoList.removeChild( alreadyIn[i] );
			}
			
			// create internal vid list
			alreadyIn.forEach(function (item) {
				this.thumbs[item.id.substr(11)] = item;
			}, this);
			
			// handly visability
			this.isEmpty = visableItems <= 0;
			this.handleVisablility();
		},
		
		handleVisablility: function () {
			this.row.style.display = this.isEmpty && hideSubs ? "none" : "";
		},
		
		// update the videos
		update: function (callback) {
			if (!this.needsUpdate) return;
			this.needsUpdate = false;
			
			// if have an url request the page
			var self = this;
			if (this.updateurl) ajax(this.updateurl, function (response) {
				
				var dom = createDOM(response, /<ol[^>]+id="vm-playlist-video-list-ol"[^>]*>([\s\S]*)<\/ol>/i);
				self.videos = {};
				
				// get the video items
				$( ".vm-video-item", dom, true ).forEach(function (item) {

					var thumb  = $(".yt-thumb-clip img", item)[0],
						time   = $(".video-time", item)[0],
						title  = $(".vm-video-title a", item)[0],
						upload = $(".vm-video-info:nth-of-type(2)", item)[0],
						clicks = $(".vm-video-metrics dd:first-of-type", item)[0],
						vid = title.href.match(/v=([^&]{11})/)[1];

					self.videos[vid] = getVideo(self, {
						vid:   vid,
						title: strip(title.textContent),
						thumb:    thumb  ? thumb.getAttribute("data-src") : "",
						duration: time   ? strip(time.textContent)        : "0:00",
						uploaded: upload ? strip(upload.textContent)      : "not found",
						clicks:   clicks ? strip(clicks.textContent)      : "NaN"
					});
				});
				
				// now extend the information we already have
				var headerData = response.match(/<div[^>]+id="vm-page-subheader"[^>]+>\s*<h3>\s*<a[^>]+href="([^"]*)"/i);
				self.href = headerData == null ? "Javascript: alert('url not found, sorry!')" : headerData[1];
				self.titleObj.href = self.href;
				//self.href = $("#vm-page-subheader h3 a", dom)[0].href;
				//self.titleObj.href = self.href;
				
				// remove the dom to reduce memory use
				dom = null;
				
				// rebuild the list
				self.buildList();
				self.removeLoader();
			
				// callback
				if (callback) callback();
			},
			// ON FAILURE
			function () {
				self.titleObj.appendChild(document.createTextNode(" (update failed)"));
				
				if (callback) callback();
			});
		},
		
		removeLoader: function () {
			
			var loadph = $(".ytbsp-loaderph", this.row)[0],
				loader = $(".ytbsp-ajaxloader", this.row)[0];
			if (loadph && loader) {
				loader.style.opacity = "0";
				setTimeout(function () {
					loader.style.display = "none";
					loadph.style.width = "0px";
				}, 200);
			}
		},
		
		inView: function () {
		
			if (this.lastViewCheck === lastScroll) {
				return this.isInView;
			}
			this.lastViewCheck = lastScroll;
			
			return this.isInView = (this.videoList
				&& this.offsetTop - SCREENLOADTHREADSHOLD < screenBottom
				&& this.offsetTop + SCREENLOADTHREADSHOLD > screenTop);
		},
		
		// returns an object that can be saved as json
		getSaveable: function () {
			
			var saveable = {
				videos: {},
				href: this.href
			};
			
			var areIn = 0;
			objLoop(this.videos, function (video, vid) {
				
				if (areIn >= MAXITEMSPERSUB) return false;
				if (!video.isRemoved()) ++areIn;
				saveable.videos[vid] = video.getSaveable();
				
			}, this);
			
			return saveable;
		}
	};
	
	
	
	
	
	
	
	
	////////////////////////////////////////
	// some function for the video object //
	////////////////////////////////////////
	
	var allVideos = {},
		seenVideos = {},
		unseenVideos = {},
		removedVideos = {},
		unremovedVideos = {};
	
	function parseVidList (string) {
	
		var result = {};
		
		if (typeof string === "string") {
			var parts = string.match(/.{11}/g);
			parts.forEach(function (part) {
				result[part] = true;
			});
		}
		return result;
	}
	function getChangedVideos () {
	
		seenVideos = parseVidList(localStorage.getItem("YTBSPseen"));
		unseenVideos = parseVidList(localStorage.getItem("YTBSPunseen"));
		removedVideos = parseVidList(localStorage.getItem("YTBSPremoved"));
		unremovedVideos = parseVidList(localStorage.getItem("YTBSPunremoved"));
	}
	function integrateChangedVideos () {
		var doCount = 0;
		
		objLoop(seenVideos, function (_, vid) {
			if (allVideos.hasOwnProperty(vid)) {
				allVideos[vid].see(true);
				++doCount;
			}
		});
		objLoop(unseenVideos, function (_, vid) {
			if (allVideos.hasOwnProperty(vid)) {
				allVideos[vid].unsee(true);
				++doCount;
			}
		});
		var toRebuild = {};
		objLoop(removedVideos, function (_, vid) {
			if (allVideos.hasOwnProperty(vid)) {
				allVideos[vid].remove(true);
				allVideos[vid].subscriptions.forEach(function (subscription) {
					toRebuild[subscription.name] = subscription;
				});
				++doCount;
			}
		});
		objLoop(unremovedVideos, function (_, vid) {
			if (allVideos.hasOwnProperty(vid)) {
				allVideos[vid].unremove(true);
				allVideos[vid].subscriptions.forEach(function (subscription) {
					toRebuild[subscription.name] = subscription;
				});
				++doCount;
			}
		});
		objLoop(toRebuild, function (subscription) {
			subscription.buildList();
		});
		saveList();
		
		// do a cleanup after a delay
		if (doCount) setTimeout(cleanUp, 20);
	}
	
	function registerChangeEvent () {
		window.addEventListener("storage", function (e) {
			if (/^YTBSP((un)?seen|(un)?removed)/.test(e.key) && e.newValue && e.newValue !== e.oldValue) {
				getChangedVideos();
				integrateChangedVideos();
			}
		}, false);
	}
	getChangedVideos();
	
	
	// this function will be called after all subscriptions are loaded
	function cleanUp () {
		console.log("Do Cleanup");
		
		// remove the seen list
		localStorage.removeItem("YTBSPseen");
		localStorage.removeItem("YTBSPunseen");
		localStorage.removeItem("YTBSPremoved");
		localStorage.removeItem("YTBSPunremoved");
		seenVideos = {};
		unseenVideos = {};
		removedVideos = {};
		unremovedVideos = {};
	}
	
	
	
	
	
	// gets a new video instance or an already existing one
	function getVideo (subscription, infos) {
		if (infos.vid === undefined) throw "Video without id";
		
		if (allVideos[infos.vid]) {
			var video = allVideos[infos.vid];
			video.addInfos(infos);
			video.addSubscription(subscription);
			return video;
		} else {
			return new Video(subscription, infos);
		}
	}
	
	
	
	
	
	
	
	//////////////////////////////
	// VIDEO Object Constructor //
	//////////////////////////////
	
	function Video (subscription, infos) {
		
		this.removed = false;
		this.seen = false;
		this.removed = false;
		this.subscriptions = [subscription];
		
		this.addInfos(infos);
		
		// add/replace in all video list
		allVideos[infos.vid] = this;
	}
	
	Video.prototype = {
		
		addSubscription: function (newone) {
			this.subscriptions.push(newone);
		},
		
		addInfos: function (infos) {
			
			// loop through given informations
			objLoop(infos, function (info, name) {
				this[name] = info;
			}, this);
		
			// if globally videos were seen or removed ignore everything else
			if (seenVideos.hasOwnProperty(infos.vid)) this.seen = true;
			if (removedVideos.hasOwnProperty(infos.vid)) this.removed = true;
			if (unseenVideos.hasOwnProperty(infos.vid)) this.seen = false;
			if (unremovedVideos.hasOwnProperty(infos.vid)) this.removed = false;
		},
		
		isRemoved: function () {
			return this.removed;
		},
		
		remove: function (privat) {
			if (this.removed) return;
			this.removed = true;
			if (!privat) localStorage.setItem("YTBSPremoved", (localStorage.getItem("YTBSPremoved") || "") + this.vid);
		},
		
		unremove: function (privat) {
			if (!this.removed) return;
			this.removed = false;
			if (!privat) localStorage.setItem("YTBSPunremoved", (localStorage.getItem("YTBSPunremoved") || "") + this.vid);
		},
		
		isSeen: function () {
			return this.seen;
		},
		
		toggleSeen: function () {
			if (this.seen) this.unsee();
			else this.see();
		},
		
		see: function (privat) {
			if (this.seen) return;
			this.seen = true;
			this.subscriptions.forEach(function (subscription) {
				var thumb = subscription.thumbs[this.vid];
				if (thumb) {
					var marker = $(".ytbsp-seemarker", thumb)[0];
					marker.textContent = "already seen";
					marker.className += " seen";
				}
			}, this);
			if (!privat) localStorage.setItem("YTBSPseen", (localStorage.getItem("YTBSPseen") || "") + this.vid);
		},
		
		unsee: function (privat) {
			if (!this.seen) return;
			this.seen = false;
			this.subscriptions.forEach(function (subscription) {
				var thumb = subscription.thumbs[this.vid];
				if (thumb) {
					var marker = $(".ytbsp-seemarker", thumb)[0];
					marker.textContent = "mark as seen";
					marker.className = marker.className.replace(/[\s]*seen[\s]*/img, "");
				}
			}, this);
			if (!privat) localStorage.setItem("YTBSPunseen", (localStorage.getItem("YTBSPunseen") || "") + this.vid);
		},
		
		reset: function () {
			this.unsee();
			this.unremove();
		},
		
		createThumb: function () {
			
			var self = this,
				thumb = document.createElement("li"),
				inView = false;
			
			// check if this thumb will be visable
			this.subscriptions.forEach(function (subscription) {
				if (subscription.inView()) {
					inView = true;
					return false;
				}
			});
			
			thumb.id = "YTBSPthumb_" + this.vid;
			thumb.title = this.title;
			thumb.className = "ytbsp-video-item";
			thumb.innerHTML = '<div class="ytbsp-clip contains-addto ux-thumb-wrap">'
				+ '<div class="ytbsp-x yt-uix-tooltip" data-tooltip-text="remove video">X</div><a href="/watch?v=' + this.vid + '">'
				+ '<img class="ytbsp-thumb" ' + (inView ? "" : "data-") + 'src="' + this.thumb + '" /></a>'
				+ '<button onclick=";return false;" title="watch later" type="button" ' // freak'in youtube button 
					+ 'class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip"'
					+ ' data-video-ids="' + this.vid + '" role="button"><span class="yt-uix-button-content"><span class="addto-label">watch later</span>'
					+ '<span class="addto-label-error">error</span><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></span></button>'
				+ '<div class="video-time">' + this.duration + '</div></div><a class="vlink" href="/watch?v=' + this.vid + '"></a>'
				+ '<div class="ytbsp-seemarker' + (this.isSeen() ? ' seen">already seen' : '">mark as seen') + '</div>'
				+ '<p class="ytbsp-views">' + this.clicks + ' Views</p><p class="ytbsp-uploaded">' + this.uploaded + '</p>';
			
			// create references to objects
			this.durationItem = $( ".video-time", thumb )[0];
			this.clicksItem   = $( ".ytbsp-views", thumb )[0];
			this.uploadItem   = $( ".ytbsp-uploaded", thumb )[0];
			this.titleItem    = $( "a.vlink", thumb )[0];
			this.titleItem.textContent = this.title;
			
			$( ".ytbsp-seemarker", thumb )[0].addEventListener("click", function () {
				self.toggleSeen();
				saveList();
			}, false);
			
			$( ".ytbsp-x", thumb )[0].addEventListener("click", function () {
				self.remove();
				saveList();
				self.subscriptions.forEach(function (subscription) {
					subscription.buildList();
				})
			}, false);
			
			return thumb;
		},
		
		updateThumb: function (thumb) {
			
			this.durationItem.textContent = this.duration;
			this.clicksItem.textContent   = this.clicks + " Views";
			this.uploadItem.textContent   = this.uploaded;
			this.titleItem.textContent    = this.title;
		},
		
		getSaveable: function () {
			
			if (this.isRemoved()) return {
				vid:      this.vid,
				seen:     this.seen,
				removed:  1
			}; else return {
				vid:      this.vid,
				title:    this.title,
				thumb:    this.thumb,
				duration: this.duration,
				uploaded: this.uploaded,
				clicks:   this.clicks,
				seen:     this.seen
			};
		}
	};
	
	
	
	
	
	
	function updateSubs (callback) {
		
		var updateCount = 0;
		
		// check subs which has to be updated
		objLoop(subs, function (sub) {
			if (sub.inView()) {
				
				if (sub.needsUpdate) {
					++updateCount;
					sub.update(function () {
			
						// if the page is loaded do some afterwork
						if (--updateCount === 0) {
							updateSubs(); // check now again
							saveList();
							if (typeof callback === "function") callback();
						}
					});
				}
				
				// get all images that don't have a src but have an data-src
				$("img[data-src]", sub.videoList, true).forEach(function (image) {
					image.src = image.getAttribute("data-src");
					image.removeAttribute("data-src");
				});
			}
		});
	}
	
	function saveList () {
		
		var saveObj = {};
		
		objLoop(subs, function (sub, name) {
			saveObj[name] = sub.getSaveable();
		});
		
		localStorage.setItem("YTBSP", JSON.stringify(saveObj));
	}
	
	
	
	
	
	
	// !!!!!!!!!!!!!!!!!!!!!!
	// everything starts here
	// !!!!!!!!!!!!!!!!!!!!!!
	
	ajax("/my_subscriptions?dm=0", function (string) {
		
		var dom = createDOM(string);
		
		// remove the current content
		subList.innerHTML = "";
		
		
		// now look for the subscription links and put them into an array that will be sorted
		var subscriptions = [];
		$("#yt-admin-sidebar ol > li:not(:first-child) a", dom).forEach(function (obj) {
			
			subscriptions.push({name: strip(obj.textContent), url: obj.href + "&dm=0"});
		});
		
		// now sort the subscriptions
		if (sortSubs) {
			
			// get the video item names for sorting
			var names = {}, count = 1;
			$("#vm-video-list-container .yt-user-name", dom).forEach(function (item) {
				var name = strip(item.textContent);
				if (!names.hasOwnProperty(name)) {
					names[name] = count++;
				}
			});
			
			subscriptions.sort(function (a, b) {
				return (names[a.name] || count) - (names[b.name] || count);
			});
		}
		
		// create subscription objects
		subscriptions.forEach(function (sub) {
		
			// create an object with this informations
			var csub = subs[sub.name] = new Subscription( sub.name );
			csub.updateurl = sub.url;
			updateSubs();
		});
		
		// free the browser of informations we don't need anymore
		dom = cache = null
	
		// do some things for tab communication
		registerChangeEvent();
		getChangedVideos();
		integrateChangedVideos();
		cleanUp();
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	// Now we just need to generate a stylesheet
	var css = document.createElement("style");
	css.type = "text/css";
	function addStyleSheet () {
		
		// check if we got a dark design
		var color = getComputedStyle(document.body).backgroundColor.match(/\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/),
			dark = color && (parseInt(color[1])+parseInt(color[2])+parseInt(color[3])) < 384,
			outColor = dark ? "#333" : "#eee",
			lightColor = dark ? "rgba(255,255,255,.2)" : "#fff",
			midColor = dark ? "#444" : "#ccc",
			darkColor = dark ? "#aaa" : "#1c629e",
			shadow = "rgba(64,64,64,.1)";
		
		css.innerHTML =
		// header and footer
		  '#ytbsp-header { margin-bottom: 20px; }'
		+ '#ytbsp-footer { margin-top: 20px; clear: both; }'
	
		// overall list
		+ '#ytbsp-subs { float: left; width: 650px; box-shadow: 40px 0 30px -30px '+shadow+'; -moz-box-shadow: 40px 0 30px -30px '+shadow+';'
			+ 'overflow: hidden; margin: -30px 0 0 -30px; padding: 30px 10px 10px 30px; }'
		+ '#YTBSP.large #ytbsp-subs { width: 970px; box-shadow: none; -moz-box-shadow: none; }'
		+ '.ytbsp-subscription { display: block; clear: both; }'
		+ '.ytbsp-subvids { -webkit-transition: padding .1s ease-out; -moz-transition: padding .1s ease-out; -o-transition: padding .1s ease-out; }'
		+ '#YTBSP.large .ytbsp-subvids { margin-right: -10px; }'
		+ '.ytbsp-video-item { display: inline-block; vertical-align:top; width: 122px; height: 145px; padding: 5px 4px; margin: 0 0 4px;'
			+ 'border-bottom: 1px solid rgba(204,204,204, 0); cursor: default; overflow: hidden; }'
		+ '#YTBSP.large .ytbsp-video-item { margin-right: 10px; }'
		+ '.ytbsp-video-item a { display: block; height: 30px; overflow: hidden; cursor: pointer; }'
		+ '.ytbsp-video-item:hover { background-color: '+lightColor+'; border-bottom-color: '+midColor+'; -webkit-transition: none; -moz-transition: none; }'
		+ '.ytbsp-subinfo { background-color: '+outColor+'; line-height: 25px; padding: 0 5px; margin-bottom: 4px; -moz-border-radius: 5px; border-radius: 5px;'
			+ 'border: 1px solid '+lightColor+'; -moz-box-shadow: 0 0 0 1px '+midColor+', 0 3px 10px '+shadow+'; box-shadow: 0 0 0 1px '+midColor+', 0 3px 10px '+shadow+' }'
		+ '.ytbsp-subinfo h3 { display: inline; }'
		+ '#YTBSP .right { float: right; }'
	
		// links
		+ '#ytbsp-subs a { color: #333; font-weight: bold; }'
		+ '#ytbsp-subs a:hover, .ytbsp-video-item:hover a { color: '+darkColor+'; }'
	
		// image part
		+ '.ytbsp-clip { position: relative; width: 120px; height: 68px; overflow: hidden; background-color: '+outColor+'; border: 1px solid '+lightColor+'; }'
		+ '.ytbsp-video-item .ytbsp-x { position: absolute; z-index: 1; top: 2px; right: 2px; opacity: .75; width: 15px; height: 14px; line-height: 14px; text-align: center;'
			+ 'background-color: #000; color: '+lightColor+'; font-size: 12px; font-weight: bold; border-radius: 3px; -moz-border-radius: 3px; display: none; }'
		+ '.ytbsp-video-item:hover .ytbsp-x { display: block; }'
		+ '.ytbsp-x:hover { background-color: #888; }'
		+ '.ytbsp-thumb { display: block; position: absolute; top: -11px; width: 120px; height: 90px; }'
		+ '.ytbsp-video-item:hover button { opacity: 1; }'
		+ '.ytbsp-video-item:hover .video-time { display: none; }'
	
		// infos
		+ '.ytbsp-seemarker { border: 1px solid '+lightColor+'; border-bottom-color: #69c; -moz-border-radius: 6px; border-radius: 6px; background-color: #def;'
			+ ' line-height: 14px; opacity: 0; text-align: center; cursor: pointer; }'
		+ '.ytbsp-video-item:hover .ytbsp-seemarker { opacity: .2; }'
		+ '.ytbsp-seemarker:hover { opacity: .4 !important; }'
		+ '.ytbsp-seemarker.seen { opacity: 1 !important; }'
	
		// functionbuttons
		+ '#YTBSP span.func { color: #777; cursor: pointer; vertical-align: top; display: inline-block; }'
		+ '#YTBSP span.func:hover { color: #333; }'
	
		// ajax loader
		+ '.ytbsp-loaderph { display: block; float: left; vertical-align: middle; width: 16px; height: 16px;'
			+ '-webkit-transition: width 1s; -moz-transition: width 1s; -o-transition: width 1s; }'
		+ '.ytbsp-ajaxloader { vertical-align: middle; -webkit-transition: opacity .2s; -moz-transition: opacity .2s; -o-transition: opacity .2s; }';
		
		document.head.appendChild(css);
	}
	callForEach("#content", addStyleSheet, 1);













	// Because of the extreme ammount of thumbs they shouldn't be downloaded all at once (data-src instead of src)
	// since 2012.6-1 also the entire update only starts as soon as you scroll to it
	// The solution is: only download those on the screen
	
	// now we need an scroll event
	// also if the window is resized it should be triggered
	var scrollTimeout = null,
		moved = false;
	function checkEvent () {
	
		if (scrollTimeout === null) {
			scrollTimeout = setTimeout(function () {
				lastScroll   = Date.now();
				screenTop    = document.body.scrollTop || document.documentElement.scrollTop;
				screenBottom = screenTop + window.innerHeight;

				updateSubs();
				scrollTimeout = null;
				
				if (moved) {
					moved = false;
					checkEvent();
				}
			}, 300);
		} else {
			moved = true;
		}
	}
	window.addEventListener("scroll", checkEvent, false);
	window.addEventListener("resize", checkEvent, false);















// if on a watch page
} else if (/^\/?watch$/.test(location.pathname)) {

	// mark as seen after at least 10 secounds
	setTimeout(function () {
		var vid = location.href.match(/v=([^&]{11})/)[1];
		if (vid) {
			var seenList = localStorage.getItem("YTBSPseen") || "";
			localStorage.setItem("YTBSPseen", seenList + vid);
		}
	}, 10000);
}










// UPDATER
function updateMessage (info) {
	
	var div = document.createElement("div");
	div.title = info.version + " is available";
	div.innerHTML = 'An update for "Better Startpage" is available.<br />It\'ll only take a few secounds ;)'
		+ '<a style="display: block; text-align: center" href="' + info.url + '" target="_blank">click here</a>'
		+ '<a style="display: block; text-align: center" href="Javascript: void 0">remind me later</a>';
	div.style.position = "absolute";
	div.style.top = "20px";
	div.style.right = "20px";
	div.style.backgroundColor = "#ccc";
	div.style.border = "1px solid #fff";
	div.style.whiteSpace = "nowrap";
	div.style.zIndex = "9999";
	div.style.padding = "10px";
	$("a", div)[1].addEventListener("click", function () {
		div.style.display = "none";
		localStorage.removeItem("YTBSPupdatewaiting");
	}, false);
	
	callForEach("body", function (body) {
		body.appendChild(div);
	}, 1);
}

// if there is still an update waiting
var updateinfo = localStorage.getItem("YTBSPupdatewaiting");
try { updateinfo = JSON.parse(updateinfo) || {}; } catch (e) {}
if (updateinfo && updateinfo.version && updateinfo.version !== VERSION) {
	
	updateMessage(updateinfo);
}

// if the UPDATEINTERVAL is over request new version
var lastUpdate = parseInt(localStorage.getItem("YTBSPupdate")) || 0;
if ((lastUpdate + UPDATEINTERVAL) < Date.now()) setTimeout(function () {
	console.log("Do update");

	ajax(UPDATEURL, function (response) {
		try { response = JSON.parse(response) || {}; } catch(e) {}
		
		// check if everything is there
		if (response && response.version && response.url) {
		
			// check if the version differs
			if (response.version !== VERSION) {
			
				localStorage.setItem("YTBSPupdatewaiting", JSON.stringify(response));
				updateMessage(response);
				
			} else {
				console.log("Version is up to date (" + response.version + ")");
			}
			
			// update the last update timestamp
			localStorage.setItem("YTBSPupdate", Date.now());
		
		// must be an error
		} else {
			
			// the next update will happen in half the time
			localStorage.setItem("YTBSPupdate", Math.floor(Date.now() - (UPDATEINTERVAL / 2)));
		}
	});

}, UPDATEDELAY);

})( window.unsafeWindow || window );

function count (responseString, folder)
{
	var match = responseString.match (new RegExp ('"' + folder + '": ([0-9]*)')) [1];
	return parseInt (match, 10);
}

function getToken (responseString)
{
//	var match = responseString.match (/'XSRF_TOKEN': '([^']*)/) [1];
	var match = responseString.match (/inbox.initialize[^']*'session_token=([^']*)/) [1];
	return match;
}

spam_div = document.getElementById ('feedmodule-TOP');
if (spam_div)
	spam_div.parentNode.removeChild (spam_div);

spam_div = document.getElementById ('homepage-sidebar-ads');
if (spam_div)
	spam_div.parentNode.removeChild (spam_div);

var divs = document.getElementsByTagName ('div');
for (var i = 0; i < divs.length; i++)
{
	if (divs [i].className == 'top-videos-module ytg-box')
		divs [i].style.display = 'none';
}

inbox_container = document.getElementById ('video-sidebar');
if (inbox_container.parentNode.style.display == 'none')
{
	new_pos = inbox_container.parentNode.parentNode;
	inbox_container = document.createElement ('div');
	inbox_container.style.cssFloat = 'right';
	new_pos.insertBefore (inbox_container, new_pos.firstChild);
}
if (inbox_container)
{
	var secure = false;
	if (window.location.href.substr (0, 5) == "https")
		secure = true;
	var wdivp = document.getElementById ('video-sidebar');
	var deleteTo = document.getElementById ('recommended-videos');
	for (var spam = wdivp.lastChild; spam != deleteTo; spam = wdivp.lastChild)
		wdivp.removeChild (spam);
	var wdiv = document.createElement ('div');
	wdiv.innerHTML = 'Loading inbox...';
	inbox_container.insertBefore (wdiv, inbox_container.firstChild);
	inbox_container.insertBefore (document.createElement ('hr'), wdiv.nextSibling);
	var base = 'http' + (secure ? 's' : '') + '://www.youtube.com/inbox?folder=messages&action_message=1#';
	var req1 = new XMLHttpRequest ();
	var req2 = new XMLHttpRequest ();
	req1.onreadystatechange = function ()
	{
		if (req1.readyState == 4 && req1.status == 200)
		{
			req2.onreadystatechange = function ()
			{
				if (req2.readyState == 4 && req2.status == 200)
				{
					var counts = req2.responseText;
					var cur_count;
					cur_count = count (counts, 'inbox');
					wdiv.innerHTML = '<div style="border-bottom: 1px solid #cccccc; color: #000000; font-size: 16px; font-weight: normal; padding-bottom: 4px">Inbox' + (cur_count ? ' <b>(' + cur_count + ')</b>' : '') + '</div>';
					wdiv.innerHTML += '<br />';
					cur_count = count (counts, 'messages');
					wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'messages/1">Personal Messages (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
					wdiv.innerHTML += '<br />';
					cur_count = count (counts, 'videos');
					wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'videos/1">Shared With You (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
					wdiv.innerHTML += '<br />';
					cur_count = count (counts, 'comments');
					wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'comments/1">Comments (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
					wdiv.innerHTML += '<br />';
					cur_count = count (counts, 'invites');
					wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'invites/1">Contact Suggestions (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
					wdiv.innerHTML += '<br />';
					cur_count = count (counts, 'responses');
					wdiv.innerHTML += (cur_count ? '<b>' : '') + '<a href="' + base + 'responses/1">Video Responses (' + cur_count + ')</a>' + (cur_count ? '</b>' : '');
				}
			}
			req2.open ('POST', 'http' + (secure ? 's' : '') + '://www.youtube.com/inbox_ajax?action_ajax=1&type=display_messages&folder=messages', true);
			req2.setRequestHeader ('Content-Type', 'application/x-www-form-urlencoded');
			req2.send ('session_token=' + getToken (req1.responseText) + '&messages=[{"type":"display_messages","request":{"folder":"messages","start":0,"num":20,"messages_deleted":[],"messages_read":[]}}]');
		}
	}
	req1.open ('GET', base, true);
	req1.send ();
}
