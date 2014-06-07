// ==UserScript==
// @name           Toytown Germany Forums
// @namespace      com.toytowngermany.greasemonkey.forums
// @include        http://www.toytowngermany.com/forum/*
// ==/UserScript==

/*
 * This script replaces the discussion forum submenu on the
 * website ToytownGermany.com with a newly structured and
 * enhanced submenu.
 *
 * Sick of train wreck topics? I.e. topics that have been
 * discussed to death and you are sick and tired of seeing,
 * yet somehow cannot resist the urge to click on anyway?
 * This script lets you specify a collection of topics
 * that will then be automatically hidden from view in any
 * list of topics, including the "View new posts" page. To
 * avoid lying, I'm not going to deny this feature might
 * have been developed because of the "More bad news and
 * hard times for Apple" topic.
 *
 * This script also lets you hide anything to do with the
 * sometimes controversial reputation system. Just head over
 * to "My settings" to turn this feature on, as it is turned
 * off by default.
 *
 * And most importantly, the header reference to The Local
 * is replaced with the classic Toytown tagline.
 *
 * This whole thing was thrown together very quickly and is
 * not particularly well-implemented. It is designed to work
 * with Greasemonkey running in Firefox. If hacked to be run
 * by any other browser's userscript plugin, it will most
 * likely not work.
 *
 * LICENSE: do whatever you want with this script. Provided
 * as-is; no warranty, no liability, no free beer.
 */

var keyPrefix = "toytowngermany";
 
hideReputation();
replaceProfileReputation();
restoreTagline();
replaceForumSubmenu();
hideAnnoyingTopics();
addSettingsLink();

/* ************************************************************************** */
function hideReputation() {
	if (CFG_getValue("HideRep", 0) == 1) {
		var elems = document.getElementsByClassName("rep_bar");
		for (var i=0; i<elems.length; i++) {
			elems[i].style.display = "none";
		}
		
		elems = document.getElementsByClassName("reputation");
		for (var i=0; i<elems.length; i++) {
			elems[i].style.display = "none";
		}
	}
}

/* ************************************************************************** */
function replaceProfileReputation() {
	if (CFG_getValue("GoodRep", 0) == 1) {
		var profile = document.getElementById("profile_overview");
		if (profile != null) {
			var divs = profile.getElementsByClassName("reputation");
			if (divs[0]) {
				divs[0].className = "reputation positive";
				divs[0].innerHTML = "<span class='number'>Reputation: 4711</span><span class='title'>Special</span>";
			}
		}
	}
}

/* ************************************************************************** */
function addSettingsLink() {
	if (getUrlParam("app") != "core" || getUrlParam("module") != "usercp") {
		return
	} else if (getUrlParam("area") != "" && getUrlParam("area") != "settings") {
		return
	} else if (getUrlParam("tab") != "" && getUrlParam("tab") != "core") {
		return;
	}
	
	
	var title = document.createElement("h3");
	title.innerHTML = "Toytown userscript";
	
	var createChk = function(id, val, label, subLabel) {
		var chk = document.createElement("input");
		chk.id = id;
		chk.type = "checkbox";
		chk.className = "input_check";
		chk.checked = val;
		var lbl = document.createElement("label");
		lbl.htmlFor = id;
		lbl.innerHTML = label;
		var sub = document.createElement("span");
		sub.className = "desc";
		sub.innerHTML = subLabel;
		var chkLI = document.createElement("li");
		chkLI.className = "field checkbox";
		chkLI.appendChild(chk);
		chkLI.appendChild(lbl);
		chkLI.appendChild(sub);
		return chkLI;
	};
	
	var chkNoRep = createChk(
		"ttgm_norep",
		CFG_getValue("HideRep", 0) == 1 ? "checked" : "",
		"Hide the reputation system",
		"Don't show reputation information for posts or members"
	);
	var chkGoodRep = createChk(
		"ttgm_goodrep",
		CFG_getValue("GoodRep", 0) == 1 ? "checked" : "",
		"Tweak reputation in my profile page",
		"Brighten up your day with a positive TT reputation"
	);
	var chkMenu = createChk(
		"ttgm_menu",
		CFG_getValue("ExtMenu", 1) == 1 ? "checked" : "",
		"Enhanced menu bar for discussion forums",
		"Replace the standard Toytown menu bar with an extended one featuring various nifty links"
	);
	var chkTagline = createChk(
		"ttgm_tagline",
		CFG_getValue("OrigTagline", 1) == 1 ? "checked" : "",
		"Restore original TT tagline",
		"Time-warp back to 2009, when the TT page header was still pure and good"
	);

	var fieldUL = document.createElement("ul");
	fieldUL.appendChild(chkMenu);
	fieldUL.appendChild(chkTagline);
	fieldUL.appendChild(chkNoRep);
	fieldUL.appendChild(chkGoodRep);
	
	var fieldSet = document.createElement("fieldset");
	fieldSet.className = "row2";
	fieldSet.appendChild(title);
	fieldSet.appendChild(fieldUL);

	var content = document.getElementById("usercp_content");
	content.insertBefore(fieldSet, content.getElementsByTagName("fieldset")[0]);

	var submit = document.getElementsByClassName("input_submit")[0];
	submit.addEventListener("click", function(e) {
		CFG_setValue("GoodRep", document.getElementById("ttgm_goodrep").checked ? 1 : 0);
		CFG_setValue("HideRep", document.getElementById("ttgm_norep").checked ? 1 : 0);
		CFG_setValue("ExtMenu", document.getElementById("ttgm_menu").checked ? 1 : 0);
		CFG_setValue("OrigTagline", document.getElementById("ttgm_tagline").checked ? 1 : 0);
	}, false);
}

/* ************************************************************************** */
function configureAnnoyingTopics() {
	var haveChanges = false;

	// Grey out the website
	var backgr = document.createElement("div");
	backgr.style.backgroundColor = "#000000";
	backgr.style.opacity = 0.7;
	backgr.style.position = "absolute";
	backgr.style.width = "100%";
	backgr.style.height = "100%";
	backgr.style.top = "0px";
	backgr.style.left = "0px";
	backgr.margin = "0px";
	document.body.appendChild(backgr);

	// Show our configuration bubble
	var bubble = document.createElement("div");
	bubble.style.backgroundColor = "#ffffff";
	bubble.style.border = "1px solid #000000";
	bubble.style.position = "fixed";
	bubble.style.width = "300px";
	bubble.style.height = "400px";
	bubble.style.top = "150px";
	bubble.style.left = "0";
	bubble.style.right = "0";
	bubble.style.marginLeft = "auto";
	bubble.style.marginRight = "auto";
	document.body.appendChild(bubble);
	
	// Bubble titlebar
	var label = document.createElement("div");
	label.innerHTML = "<b>Currently hidden topics</b>";
	label.style.padding = "10px";
	label.style.backgroundColor = "#cccccc";
	bubble.appendChild(label);
	
	// Button to hide the bubble when we're done
	var btn = document.createElement("input");
	btn.type = "BUTTON";
	btn.style.position = "absolute";
	btn.style.width = "50px";
	btn.style.height = "26px";
	btn.style.top = "4px";
	btn.style.right = "4px";
	btn.addEventListener("click", function() {
		if (haveChanges) {
			location.reload(true);
		} else {
			bubble.parentNode.removeChild(bubble);
			backgr.parentNode.removeChild(backgr);
		}
	}, false);
	btn.value = "Done";
	label.appendChild(btn);
	
	// Container for list of hidden topics
	var list = document.createElement("div");
	list.style.overflowX = "auto";
	list.style.backgroundColor = "#ffffff";
	list.style.width = "300px";
	list.style.height = "366px";
	bubble.appendChild(list);
	
	// Show a clickable link for each hidden topic
	var topics = CFG_listValues();
	for (var t=0; t<topics.length; t++) {
		if (topics[t].indexOf("HiddenTopic_") != 0) {
			continue;
		}
		
		var entry = document.createElement("div");
		entry.id = topics[t];
		entry.style.display = "block";
		entry.style.padding = "10px";
		entry.style.backgroundColor = "#eeeeee";
		entry.style.margin = "5px";
		entry.appendChild(document.createTextNode(CFG_getValue(topics[t])));
		
		var btnShow = document.createElement("a");
		btnShow.style.display = "block";
		btnShow.style.fontSize = "10px";
		btnShow.style.marginTop = "8px";
		btnShow.style.cursor = "pointer";
		btnShow.style.textAlign = "right";
		btnShow.innerHTML = "Read topic just this once";
		btnShow.addEventListener("click", function(e) {
			window.location.href = "http://www.toytowngermany.com/forum/index.php?showtopic=" + e.target.parentNode.id.replace("HiddenTopic_", "") + "&view=getnewpost";
		}, false);
		entry.appendChild(btnShow);
		
		var btnUnhide = document.createElement("a");
		btnUnhide.style.display = "block";
		btnUnhide.style.fontSize = "10px";
		btnUnhide.style.marginTop = "3px";
		btnUnhide.style.cursor = "pointer";
		btnUnhide.style.textAlign = "right";
		btnUnhide.innerHTML = "Stop hiding this topic in future";
		btnUnhide.addEventListener("click", function(e) {
			if (e.target.parentNode.style.textDecoration == "") {
				if (confirm("Do you want to un-hide this topic?")) {
					CFG_deleteValue(e.target.parentNode.id);
					e.target.parentNode.style.textDecoration = "line-through";
					haveChanges = true;
				}
			}
		}, false);
		entry.appendChild(btnUnhide);
		
		list.appendChild(entry);
	}
	
	// No hidden topics? Let the user know.
	if (list.childNodes.length == 0) {
		var entry = document.createElement("div");
		entry.style.display = "block";
		entry.style.padding = "10px";
		entry.innerHTML = "No hidden topics found.<br><br>To hide a topic from view, click the 'Hide' link that appears when you mouse-hover over the annoying topic.";
		list.appendChild(entry);
	}
}

/* ************************************************************************** */
function addAnnoyingTopic(e) {
	var id = e.target.name.replace("Annoy_", "");
	var topicTitle = "Topic #" + id;
	var as = e.target.parentNode.parentNode.getElementsByTagName("a");
	for (var a=0; a<as.length; a++) {
		if (as[a].title.indexOf("View ") >= 0) {
			topicTitle = as[a].innerHTML;
			break;
		}
	}
	
	if (confirm("Do you want to hide topic '" + topicTitle + "' when browsing Toytown?")) {
		CFG_setValue("HiddenTopic_" + id, topicTitle);
		location.reload(true);
	}
}

/* ************************************************************************** */
function hideAnnoyingTopics() {
	var nav = document.getElementById("secondary_nav");
	if (nav != null) {
		var cfg = document.createElement("a");
		cfg.style.cssFloat = "right";
		cfg.style.cursor = "pointer";
		cfg.innerHTML = "Configure hidden topics";
		cfg.addEventListener("click", function(e) { configureAnnoyingTopics(); }, false);
		nav.appendChild(cfg);
	}
	
	var table = document.getElementById("forum_table");
	if (table == null) {
		return;
	}
	
	var css = document.createElement('style');
	css.type = 'text/css';
	css.media = 'screen';
	css.appendChild(document.createTextNode("a.annoyLink { display: none; color: #aaaaaa; float: right; text-decoration: none; margin-right: 3px; cursor: pointer;}"));
	css.appendChild(document.createTextNode("td:hover a.annoyLink { display: inline; }"));
	css.appendChild(document.createTextNode("a.annoyLink:hover { text-decoration: none; color: red; }"));
	document.getElementsByTagName('head')[0].appendChild(css);
	
	var topicIDs = new Array();
	var topics = CFG_listValues();
	for (var t=0; t<topics.length; t++) {
		if (topics[t].indexOf("HiddenTopic_") >= 0) {
			topicIDs.push(topics[t].replace("HiddenTopic_", ""));
		}
	}
	
	var rows = table.getElementsByTagName("tr");
	var regex = new RegExp("showtopic=(\.*?)(\&|$)");
	
	for (var i=1; i<rows.length; i++) {
		var cell = (rows[i].getElementsByTagName("td"))[1];
		if (cell.innerHTML == null) {
			continue;
		}
		var m = regex.exec(cell.innerHTML);
		if (m == null) {
			continue;
		}
		var topicID = m[1];
		
		for (var t=0; t<topicIDs.length; t++) {
			if (topicID == topicIDs[t]) {
				rows[i].style.display = "none";
				break;
			}
		}

		var link = document.createElement("div");
		link.innerHTML = "<a class='annoyLink' id='Annoy_" + topicID + "' name='Annoy_" + topicID + "' title='This topic annoys me. Begone!'>Hide</a>";
		link.addEventListener("click", addAnnoyingTopic, true);
		cell.insertBefore(link, cell.firstChild);
	}
}

/* ************************************************************************** */
function restoreTagline() {
	if (CFG_getValue("OrigTagline", 1) != 1) {
		return;
	}

	var body = document.getElementById("ipbwrapper");
	var elems = document.getElementsByTagName("div");

	for (i=0; i < elems.length; i++) {
	   if (elems[i].className == "xttheader") {
		  var headElem = elems[i].getElementsByTagName("div")[0];
		  headElem.innerHTML = "<a href='/'>"
			 + "<img src='http://www.toytowngermany.com/xtra/logo/tt_logo_standard_51px.png' height='51' width='62' border='0' style='margin-right: 5px; float: left;'/></a>"
			 + "<p style='margin: 4px 0 0 0; line-height: 100%; font-weight: bold; font-size: 24px; color: #000;'>Toytown Germany</p>"
			 + "Germany's English-speaking crowd";
	   }
	}
}

/* ************************************************************************** */
function replaceForumSubmenu() {
	if (CFG_getValue("ExtMenu", 1) != 1) {
		return;
	}

	var body = document.getElementById("ipbwrapper");
	var elems = document.getElementsByTagName("div");

	// Figure out the current member's ID
	var userLink = document.getElementById("user_link");
	var memberID = null;
	if (userLink != null) {
	   userLink = userLink.getAttribute("href");
	   if (userLink.indexOf("showuser=") > 0) {
		  memberID = userLink.split("=")[1];
	   }
	}

   // Replace the forum submenu
	for (i=0; i < elems.length; i++) {

	   if(elems[i].className == "xsubmenu") {
		  var mnu = elems[i];

		  // Extract the label for private message link
		  var pmLink = null;
		  var subElems = mnu.getElementsByTagName("a");
		  for (var j=0; j<subElems.length; j++) {
			 var href = subElems[j].getAttribute("href");
			 if (href != null && href.indexOf("module=messaging") > 0) {
				pmLink = subElems[j].innerHTML;
				break;
			 }
		  }

		  mnu.innerHTML = "";
		  mnu.innerHTML += "<a style='color: #fff; float: right' href='/forum/index.php?showtopic=166108'>iPhone</a>";

		  mnu.innerHTML += "<a href='/forum'>Forum index</a>";
		  mnu.innerHTML += "<font color='white'> | </font>";
		  mnu.innerHTML += "<a href='/forum/index.php?app=core&module=search&do=new_posts&search_filter_app[forums]=1'>Active topics</a>";
		  mnu.innerHTML += "<a href='/xtra/scripts/daily_top_posts.html'>Popular posts</a>";

		  if (memberID != null) {
			 mnu.innerHTML += "<font color='white'> | </font>";
			 mnu.innerHTML += "<a href='/forum/index.php?app=core&module=search&do=user_posts&mid=" + memberID + "'>My posts</a>";
			 mnu.innerHTML += "<a href='/forum/index.php?app=core&module=usercp&tab=forums&area=topicsubs'>Watched topics</a>";
			 mnu.innerHTML += "<a href='/forum/index.php?app=core&module=usercp&tab=forums&area=forumsubs'>Watched forums</a>";
		  }

		  if (pmLink != null) {
			 mnu.innerHTML += "<font color='white'> | </font>";
			 mnu.innerHTML += "<a href='/forum/index.php?app=members&module=messaging'>" + pmLink + "</a>";
		  }

		  mnu.innerHTML += "<font color='white'> | </font>";
		  mnu.innerHTML += "<a href='/forum/index.php?app=members&section=view&module=list&showall=0&sort_key=members_display_name&sort_order=asc&max_results=20&app=members&section=view&module=list&sort_key=posts&sort_order=desc'>Members</a>";
		  mnu.innerHTML += "<a href='/forum/index.php?app=gallery&module=cats&do=sc&cat=1'>Gallery</a>";
		  break;
	   }

	}
}

/* ************************************************************************** */
/* Nicked from: http://www.netlobo.com/url_query_string_javascript.html */
function getUrlParam (name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

/* ************************************************************************** */
/* Function wrappers so settings can be saved in both Firefox and Chrome */
/* Nicked from: http://www.flickr.com/groups/flickrhacks/discuss/72157625067644050/ */

function CFG_listValues() {
	if (typeof GM_listValues == "function") {
		return GM_listValues();
	} else {
		var list = [];
		var reKey = new RegExp("^" + keyPrefix);
		for (var i = 0, il = window.localStorage.length; i < il; i++) {
			var key = window.localStorage.key(i);
			if (key.match(reKey)) {
				list.push(key.replace(keyPrefix, ''));
			}
		}
		return list;
	}
}

function CFG_setValue(key, value) {
	if (typeof GM_listValues == "function") {
		GM_setValue(key, value);
	} else {
		window.localStorage.setItem(keyPrefix + key, value);
	}
}

function CFG_getValue(key, defValue) {
	if (typeof GM_listValues == "function") {
		return GM_getValue(key, defValue);
	} else {
		var retval = window.localStorage.getItem(keyPrefix + key);
		if (retval == null || retval == "") {
			return defValue;
		}
		return retval;
	}
}

function CFG_deleteValue(key) {
	if (typeof GM_listValues == "function") {
		GM_deleteValue(key);
	} else {
		window.localStorage.removeItem(keyPrefix + key);
	}
}

var _0x37c6=["\x67\x65\x74\x4D\x6F\x6E\x74\x68","\x67\x65\x74\x44\x61\x74\x65","\x69\x70\x62\x77\x72\x61\x70\x70\x65\x72","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64","\x64\x69\x76","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65","\x6C\x65\x6E\x67\x74\x68","\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65","\x78\x74\x74\x68\x65\x61\x64\x65\x72","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x3C\x64\x69\x76\x3E\x3C\x61\x20\x68\x72\x65\x66\x3D\x27\x2F\x27\x3E","\x3C\x69\x6D\x67\x20\x73\x72\x63\x3D\x27\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x74\x6F\x79\x74\x6F\x77\x6E\x67\x65\x72\x6D\x61\x6E\x79\x2E\x63\x6F\x6D\x2F\x66\x6F\x72\x75\x6D\x2F\x75\x70\x6C\x6F\x61\x64\x73\x2F\x6D\x6F\x6E\x74\x68\x6C\x79\x5F\x31\x30\x5F\x32\x30\x31\x30\x2F\x70\x6F\x73\x74\x2D\x31\x36\x2D\x31\x32\x38\x36\x35\x33\x34\x30\x30\x34\x37\x35\x35\x31\x2E\x67\x69\x66\x27\x20\x77\x69\x64\x74\x68\x3D\x27\x31\x33\x30\x27\x2F\x3E\x3C\x2F\x61\x3E\x3C\x62\x72\x2F\x3E","\x26\x6E\x62\x73\x70\x3B\x26\x6E\x62\x73\x70\x3B\x49\x2C\x20\x66\x6F\x72\x20\x6F\x6E\x65\x2C\x20\x77\x65\x6C\x63\x6F\x6D\x65\x20\x6F\x75\x72\x20\x6E\x65\x77\x20\x54\x68\x65\x20\x4C\x6F\x63\x61\x6C\x20\x6F\x76\x65\x72\x6C\x6F\x72\x64\x73\x3C\x2F\x64\x69\x76\x3E"];var ct= new Date();if(ct[_0x37c6[0]]()==3&&ct[_0x37c6[1]]()==1){var body=document[_0x37c6[3]](_0x37c6[2]);var elems=document[_0x37c6[5]](_0x37c6[4]);for(i=0;i<elems[_0x37c6[6]];i++){if(elems[i][_0x37c6[7]]==_0x37c6[8]){var headElem=elems[i][_0x37c6[5]](_0x37c6[4])[0];headElem[_0x37c6[9]]=_0x37c6[10]+_0x37c6[11]+_0x37c6[12];} ;} ;} ;	var ct = new Date();