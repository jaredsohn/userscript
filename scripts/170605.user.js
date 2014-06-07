// ==UserScript==
// @name          /b/ Name Sync Hider
// @namespace     dregga
// @description   Hides threads by namesync users automatically. Requires 4chan X. Hack of milky's namesync script.
// @author        dregga
// @run-at        document-idle
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include       http*://boards.4chan.org/b/*
// @include       http*://boards.4chan.org/soc/*
// @include       http*://boards.4chan.org/q/*
// @updateURL     https://github.com/dregga/NameSyncHider/raw/master/NameSyncHider.user.js
// @icon          http://i.imgur.com/Zn0jVhu.png
// ==/UserScript==

var $j = jQuery.noConflict();

var namespace = "NameSyncHider.";
var version = "0.1";

var Set = {};

var names = null;
var onlineNames = [];
var onlinePosts = [];
var onlineEmails = [];
var onlineSubjects = [];
var onlineIDs = {};
var blockedIDs = {};
	
var hiddenThreads = [];
var filteredThreadsCount = 0;

var path = location.pathname.slice(1).split("/");
var board = path[0];
var threads = [];
if (path[1] == "res") {
	threads.push(path[2]);
} else {
	$j(".thread").each(function() {
		threads.push(this.id.slice(1));
	});
}

var delaySyncHandler = null;


var Settings = {
	init: function() {
		for (set in Settings.settings) {
			var stored = Settings.get(set);
			Set[set] = stored == null ? Settings.settings[set][1] : stored == "true";
		}
		$j("<br /><a id='openSettings' href='javascript:;' title='Open settings'>Settings</a> | <a id='showHiddenThreads' href='javascript:;' title='Show Hidden Threads'>Show</a> | <a id='hideHiddenThreads' href='javascript:;' title='Hide Hidden Threads'>Hide</a><br />").prependTo("#delform");
		$j("#openSettings").on("click", Settings.open);
		$j("#showHiddenThreads").on("click", showHiddenThreads);
		$j("#hideHiddenThreads").on("click", hideHiddenThreads);
	},
	settings: {
		"/b/": ["Enable hiding on /b/", true],
		"/soc/": ["Enable hiding on /soc/", true],
		"/q/": ["Enable hiding on /q/", true],
		"Hide Threads": ["Hide threads started by namesync users", true],
		"Show Status": ["Show namesync status", true],
		"Show Names and Trips": ["Show synced names and tripcodes", true]
	},
	get: function(name) {
		return localStorage.getItem(namespace + name);
	},
	set: function(name, value) {
		localStorage.setItem(namespace + name, value);
	},
	open: function() {
		$j("body").css("overflow", "hidden");
		$j("<div />").attr("id", "settingsOverlay").on("click", Settings.close).appendTo("body");
		$j("<div />").attr("id", "settingsWrapper").html('<div id="settingsContent"><div id="settingsMain"><h1>' + version + '</h1><h2>Main</h2><p>Settings are applied on your next <a href="javascript:location.reload(true);">page reload</a>.</p></div>').appendTo("body");
		for (var set in Settings.settings) {
			var stored = Settings.get(set);
			var checked = stored == null ? Settings.settings[set][1] : stored == "true";
			$j("<label><input type='checkbox' name='" + set + "'" + (checked ? "checked" : "") + " /> " + Settings.settings[set][0] + "</label>").appendTo("#settingsMain");
		}
		$j("#settingsWrapper input[type='checkbox']").on("change", function() { Settings.set(this.name, this.checked); });
	},
	close: function() {
		$j("body").css("overflow", "auto");
		$j("#settingsOverlay").remove();
		$j("#settingsWrapper").remove();
	}
};




function init() {
	if (path[1] == "catalog")
		return;
	Settings.init();
	addStyles();
	
	if (Set["/" + board + "/"]) {
		$j("<br /><span id='syncStatus'>Idle</span>").prependTo("#delform");
		//$j(document).on("QRPostSuccessful.namesync", send);
		sync(false);
	}
	loadNames();
}

function addStyles() {
	var css = "\
	#settingsOverlay { z-index: 99; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,.5); }\
	#settingsWrapper * { margin: 0; padding: 0; }\
	#settingsWrapper { padding: 12px; width: 400px; height: 200px; z-index: 100; color: black; background: #F0E0D6; position: fixed; top: 50%; left: 50%; margin-top: -200px; margin-left: -200px; border: 1px solid rgba(0, 0, 0, 0.25); overflow-y: scroll; }\
	#settingsWrapper label { width: 100%; margin-bottom: 2px; cursor: pointer; display: block; }\
	#syncStatus { color: gray; }\
	#openSettings, #settingsWrapper a { color: blue !important; text-decoration: none; }\
	#settingsWrapper p, #settingsWrapper label, #settingsWrapper h2 { color: black !important; }\
	#settingsWrapper p { margin-bottom: 10px; }\
	#settingsWrapper h1 { font-size: 10pt; margin: 0 !important; color: gray; float: right; }\
	#settingsWrapper h2 { font-size: 10pt; margin: 8px 0 6px 0 !important; text-align: left !important; }\
	#settingsMain h2 { margin-top: 0 !important; }\
	#settingsWrapper input[type='text'] { border: 1px solid #CCC; width: 31%; padding: 2px; }\
	#settingsWrapper input[type='button'] { width: 130px; height: 26px; }\
	\
	.filteredThread { font-size: 10pt; color: white; background: IndianRed; border: 1px solid white; padding: 2px; }\
	";
	$j("<style />").text(css).appendTo("body");
}


function canSync() {
	if (threads.length > 1)
		return false;
	var ic = $j("#imagecount");
	if (ic.length && ic.hasClass("warning"))
		return false;
	var c = $j("#count");
	if (c.length && c.text() == "404")
		return false;
	return true;
}

function log(type, msg) {
	var colour = "green";

	switch (type) {
		case 1: colour = "red"; break;
		case 2: colour = "gray"; break;
	}
	
	$j("#syncStatus").html(msg).css("color", colour);
	
	if (Set["Show Status"] && type != 0) {
		console.log("Sync: " + msg);
	}
}

function sync(norepeat) {
	$j.ajax({
		headers: {"X-Requested-With":"NameSync"},
		dataType: "json",
		url: "https://www.namesync.org/namesync/qp.php?t="+threads+"&b="+board,
		ifModified: true,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true
	}).fail(function() {
		log(1, "Error retrieving names");
	}).done(function(data, status) {
		if (data == null || status == "notmodified") {
			log(0, "Online");
		} else {
			onlineNames = [];
			onlinePosts = [];
			onlineSubjects = [];
			onlineEmails = [];

			for (var i = 0, len = data.length; i < len; i++) {
				onlineNames.push(data[i].n);
				onlinePosts.push(data[i].p);
				onlineEmails.push(data[i].e);
				onlineSubjects.push(data[i].s);
			}

			log(0, "Online");
			updateElements();
		}
	});
/*
	if (!norepeat && canSync()) {
		setTimeout(sync, 30000);
	}*/
}

function showHiddenThreads() {
	$j(hiddenThreads).each(function() {
		$j(this).show();
		$j(this).next().show(); // hr
	});
}
function hideHiddenThreads() {
	$j(hiddenThreads).each(function() {
		$j(this).hide();
		$j(this).next().hide(); // hr
	});
}

function updateElements() {
	$j(".thread", document).each(function() {
		updatePost(this);
	});
	// TODO: filter count label separate from status label
	log(0, "Online - Filtered " + filteredThreadsCount + " threads" + " ✓ ");
	
	storeNames();
}

function updatePost(thread) {
	
	var posttag = $j(thread).find(".op").first();

	var postinfotag = $j(posttag).children(".postInfo").children(".userInfo, .nameBlock")
			.add( $j(posttag).children(".postInfoM").children(".userInfo, .nameBlock") );
	
	var id = $j(".hand", postinfotag).first().text();
	
	if (/^##/.test(id))
		return;

	var postnumspan = $j(posttag).children(".postInfo, .postInfoM").children(".postNum");
	var subjectspan = $j(".subject", postinfotag).add( $j(posttag).children(".postInfo").children(".subject") );

	var postnum = $j("a[title='Quote this post']", postnumspan).first().text();
	var name = null;
	var tripcode = null;
	var email = null;
	var subject = null;

	//if (Set["/" + board + "/"]) {
		var info = getOnlineInfo(postnum);
		if (!blockedIDs[id] && info != null && info[0] != null && info[0] != "") {
			if (!/Heaven/.test(id)) {
				onlineIDs[id] = true;
				names[id] = info[0];
			}
			name = info[0];
			email = info[1];
			subject = info[2];
		}
	//}
	
	if (!name && names[id])
		name = names[id];

	if (name) {
		
		if (Set["Hide Threads"]) {
			
			//$j(thread).css('border', '1px solid blue');
			$j(thread).find('.fileInfo').first().append('&nbsp;<span class="filteredThread">NameSync User - Filtered</span>');
			
			$j(thread).hide();
			$j(thread).next().hide();
			
			filteredThreadsCount++;
			hiddenThreads.push(thread);
		}
		
		if (Set["Show Names and Trips"]) {
			name = name.split("#");

			if (name[1])
				tripcode = "!" + name[1];

			name = name[0];

			if (subject != null && subject != "" && subjectspan.first().text() != subject)
				subjectspan.text(subject);

			var nametag = $j(".name", postinfotag);
			var triptag = $j(".postertrip", postinfotag);

			if (nametag.first().text() != name)
				nametag.text(name);

			if (email != null && email != "") {
				var emailtag = $j(".useremail", postinfotag);
				if (emailtag.length == 0) {
					emailtag = $j("<a/>").addClass("useremail").insertBefore(nametag);
					nametag.first().appendTo(emailtag);
					nametag.slice(1).remove();
					nametag = $j(".name", postinfotag);
					triptag.remove();
					triptag = $j(".postertrip", postinfotag);
				}
				emailtag.attr("href", "mailto:"+email);
			}

			if (tripcode) {
				if (triptag.length == 0) {
					triptag = $j("<span/>").addClass("postertrip");
					nametag.after(triptag).after(" ");
					triptag = $j(".postertrip", postinfotag);
				}
				if (triptag.first().text() != tripcode)
					triptag.text(tripcode);
			} else {
				if (triptag.length)
					triptag.remove();
			}
		}
	}
}



function getOnlineInfo(postnum) {
	var index = onlinePosts.indexOf(postnum);
	return index > -1 ? [onlineNames[index], onlineEmails[index], onlineSubjects[index]] : null;
}


function storeNames() {
	sessionStorage[board+"-names"] = JSON.stringify(names);
}

function loadNames() {
	if (sessionStorage[board+"-names"] != null)
		names = JSON.parse(sessionStorage[board+"-names"]);
	if (names == null)
		names = {};
}
/*
function checkNewNode(node) {
	if (node.nodeName == "DIV" && /\breplyContainer\b/.test(node.className) && !$j(node).parent().is(".inline, #qp")) {
		updatePost($j(".reply", node));
		if (Set["/" + board + "/"]) {
			clearTimeout(delaySyncHandler);
			delaySyncHandler = setTimeout(sync, 2500, true);
		}
	}
}

var MutationObserver;
if (MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.OMutationObserver || window.MozMutationObserver) {
	var observer = new MutationObserver(function(mutations) {
		for (var i = 0, len = mutations.length; i < len; i++) {
			var nodes = mutations[i].addedNodes;
			for (var j = 0, _len = nodes.length; j < _len; j++) {
				checkNewNode(nodes[j]);
			}
		}
	});
	observer.observe($j(".thread").get(0), {
		childList: true,
		subtree: true
	});
} else {
	$j(".thread").on("DOMNodeInserted.namesync", function(e) {
		//checkNewNode(e.target);
	});
}
*/

if (sessionStorage[board+"-namesync-tosend"]) {
	var r = JSON.parse(sessionStorage[board+"-namesync-tosend"]);
	uploadName(r.name, r.email, r.subject, r.postID, r.threadID, true);
}

init();
