// ==UserScript==
// @name			MZ Extras
// @include			http://*managerzone.*
// @exclude			http://*managerzone.*/iframes/*
// @author			Joel Hietanen (info@joelhietanen.com)
// @license			http://creativecommons.org/licenses/by/3.0/
// åäö				just an utf-8 hack
// ==/UserScript==

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Important integrity note
 *
 * This code will access information from two MZ-cookies that is stored
 * on your computer. This information contains the current sport and
 * language you're using on ManagerZone and it is used to display the correct
 * output while using this script.
 *
 * If you do not want the script to access the cookie information, you 
 * can remove the two lines below encapsulated within the "Cookie accessors"-
 * delimiters. This will not prevent you from using the script, neither will
 * it make the script unusable, but the output might not always be 100%
 * correct.
 *
 * This script does not in any way store or broadcast the cookie information
 * to any other computer, person or party.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

if(unsafeWindow.gmsLoaded) return dump("Calling undefined function should break the script.");


//#region debug

function Debug(){};

Debug.addButton = function() {
	var element = '<button id="showquotes" style="position: fixed; top: 100px; left: 30px;">Show quotes</button>';
	doc.getElement("small_rectangle").innerHTML += element;
};

Debug.showQuotes = function() {
	var element = '<div id="quotes" style="position: absolute; top: 100px; left: 300px; background: white; border: 2px black solid; z-index:9999;">';
	var length = quotes.length;
	for(var i=0;i<length;i++) {
		if(quotes[i] === undefined) continue;
		element += "<p>" + i + ": " + quotes[i].postCell + "</p>";
	}
	element += "</div>";
	doc.getElement("small_rectangle").innerHTML += element;
};

/**
 * Dumps the content of the <code>array</code>-variable.
 * 
 * @param mixed array The content variable.
 * @author http://phpjs.org/functions/print_r:493 -
 * 		   slightly modified to better suit the needs of this script
 */
Debug.dump = function(array) {
	var output = '',
	pad_char = ' ',
	pad_val = 4,
	d = document,
	getFuncName = function(fn) {
		var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
		if(!name) {
			return "(Anonymous)";
		}
		return name[1];
	},
	repeat_char = function(len, pad_char) {
		var str = "";
		for(var i = 0; i < len; i++) {
			str += pad_char;
		}
		return str;
	},
	formatArray = function(obj, cur_depth, pad_val, pad_char) {
		if(cur_depth > 0) {
			cur_depth++;
		} 
		var base_pad = repeat_char(pad_val * cur_depth, pad_char);
		var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
		var str = "";
		if(typeof obj === "object" && obj !== null && obj.constructor) {
			str += "Array\n" + base_pad + "(\n";
			for(var key in obj) {
				if(Object.prototype.toString.call(obj[key]) === "[object Array]") {
					str += thick_pad + "[" + key + "] => " + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);                    }
				else {
					if(typeof(obj[key]) == "function") {
						str += "[" + key + "] => function\n";
					} else {
						str += thick_pad + "[" + key + "] => " + obj[key] + "\n";
					}
				}
			}
			str += base_pad + ")\n";
		} else if(obj === null || obj === undefined) {
			str = "";
		} else {
			str = obj.toString();
		}

		return str;
	};

	output = formatArray(array, 0, pad_val, pad_char);

	return output;
};

//#endregion debug


//#region Class definitions

function Resources(){};
Resources.uriPattern = /((https?|ftp|file):\/\/(?!dynamic|static)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
Resources.mzPattern = /(https?|ftp|file):\/\/([^enwiki|ptwiki].{0,63}\.){0,127}managerzone\..{2,4}\//gim;
Resources.smileys = {
	1 : "http://img248.imageshack.us/img248/5298/smiling.png",
	2 : "http://img218.imageshack.us/img218/9066/winking.png",
	3 : "http://img686.imageshack.us/img686/7121/unhappy.png",
	4 : "http://img194.imageshack.us/img194/7439/happy2e.png",
	5 : "http://img4.imageshack.us/img4/8593/huheo.png",
	6 : "http://img535.imageshack.us/img535/9836/spiteful.png",
	7 : "http://img638.imageshack.us/img638/2920/greedy.png",
	8 : "http://img686.imageshack.us/img686/4018/gah.png",
	9 : "http://img99.imageshack.us/img99/8879/uncertain.png",
	10 : "http://img99.imageshack.us/img99/3879/childish.png",
	11 : "http://img192.imageshack.us/img192/200/heartrd.png",
	12 : "http://img22.imageshack.us/img22/9094/thumbup.png",
	13 : "http://img197.imageshack.us/img197/5355/thumbdowni.png"
};
Resources.wordList = new Array(
	{ // en
		"enter_uri" : "Enter image URI/link",
		"image" : "The image ",
		"doesnt_exist" : " doesn't exist.",
		"quote_msg" : "Quote message",
		"guestbook" : "'s guest book",
		"bold" : "Bold",
		"italic" : "Italic",
		"underline" : "Underline",
		"list" : "List",
		"paragraph" : "Paragraph",
		"cm_exclusive" : "Restricted to Club Members",
		"add_img" : "Add image",
		"today" : "Today",
		"yesterday" : "Yesterday",
		"code" : "Code",
		"text_clr" : "Text color",
		"forum" : "Forum",
		"invite_long" : "Invite both home and away",
		"goto_page" : "Go to page",
		"goto_last_post" : "Go to last post of topic",
		"preview" : "Preview",
		"exit_preview" : "Close preview",
		"preview_disclaimer" : "This is only a preview, your post has not yet been saved."
	},
	{ // sv
		"enter_uri" : "Ange bildens URI/adress",
		"image" : "Bilden ",
		"doesnt_exist" : " existerar inte.",
		"quote_msg" : "Citera inlägg",
		"guestbook" : "s gästbok",
		"bold" : "Fetstil",
		"italic" : "Kursiv",
		"underline" : "Understruken",
		"list" : "Punktlista",
		"paragraph" : "Stycke",
		"cm_exclusive" : "Endast för klubbmedlemmar",
		"add_img" : "Lägg till bild",
		"today" : "Idag",
		"yesterday" : "Igår",
		"code" : "Kod",
		"text_clr" : "Teckenfärg",
		"forum" : "Forum",
		"invite_long" : "Utmana både borta och hemma",
		"goto_page" : "Gå till sida",
		"goto_last_post" : "Gå till senaste inlägg i tråden",
		"preview" : "Förhandsgranska",
		"exit_preview" : "Stäng förhandsgranskning",
		"preview_disclaimer" : "Detta är bara en förhandsgranskning, ditt inlägg har inte sparats ännu."
	}
);
Resources.dragModifiers = new Array(2);


function Accessories(){};

Accessories.pauseComp = function(millis) {
	var date = new Date();
	var curDate = null;

	do { curDate = new Date(); }
	while(curDate-date < millis);
};

Accessories.inArray = function(needle, haystack) {
	for(var key in haystack) {
		if(needle === haystack[key]) return true;
	}
	return false;
};

Accessories.addForumExtras = function() {
	var id;
	var name;
	var TDs = doc.document.getElementsByTagName("TD");
	var userDataCell, outputCell;

	for(row = 0; row < TDs.length; row++) {
		switch(TDs[row].className) {
		case "separate":
			if(TDs[row].width != "82%") break;
			quotes[row] = new Quote();
			quotes[row].setPostCell(TDs[row+2].innerHTML);
			quotes[row].postCell = TDs[row+2].innerHTML.replace(/<img (.*?)src="dynimg\/pic.php\?type=profile(.+?)"(.*?)>/gim, ""); // temp
			userDataCell = TDs[row];
			outputCell = TDs[row+1];

			if(userDataCell.childNodes[3].tagName == "A") {
				id = userDataCell.childNodes[3].href.split("&")[1].replace("uid=", "");
				name = userDataCell.childNodes[3].text;
				quotes[row].setUserName(userDataCell.childNodes[3].text);
				quotes[row].setTimeStamp(userDataCell.lastChild.nodeValue);
				quotes[row].timeStamp = quotes[row].timeStamp.replace(/^\s+|\s+$/g,"");
			} else {
				id = userDataCell.childNodes[5].href.split("&")[1].replace("uid=", "");
				name = userDataCell.childNodes[5].text;
				quotes[row].setUserName(userDataCell.childNodes[5].text);
				quotes[row].setTimeStamp(userDataCell.lastChild.nodeValue);
				quotes[row].timeStamp = quotes[row].timeStamp.replace(/^\s+|\s+$/g,"");
			}

			outputCell.innerHTML = outputCell.innerHTML + '&nbsp;<img id="quote?' + row + '" src="http://img842.imageshack.us/img842/50/071233glossyspaceiconal.png" alt="' + Resources.wordList[preferences.lang]["quote_msg"] + '" title="' + Resources.wordList[preferences.lang]["quote_msg"] + '" style="border: none; position: relative; bottom: 1px; cursor: pointer; float: right;">';
			outputCell.innerHTML = outputCell.innerHTML + '<a href="/?p=guestbook&uid=' + id + '"><img src="http://managerzone.com/img/hockey/reply_guestbook.gif" alt="' + name + Resources.wordList[preferences.lang]["guestbook"] + '" title="' + name + Resources.wordList[preferences.lang]["guestbook"] + '" style="border: none; position: relative; top: 2px; float: right;"></a>';
			TDs[row+2].innerHTML = TDs[row+2].innerHTML.replace(/<img src="((https?|ftp|file):\/\/(?!dynamic|static)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])" class="bb_image">/gim,'[noscript]$1[/noscript]');
			TDs[row+2].innerHTML = TDs[row+2].innerHTML.replace(Resources.uriPattern, '<a href="$1" target="_blank">$1</a>');
			TDs[row+2].innerHTML = TDs[row+2].innerHTML.replace(Resources.mzPattern, location.href.substring(0, location.href.indexOf("?", 0)));
			TDs[row+2].innerHTML = TDs[row+2].innerHTML.replace(/\[noscript\]<a href="(.+?)" target="_blank">(.+?)<\/a>\[\/noscript\]/gim,'<img src="$1" class="bb_image" alt="">');
			break;
		case "listsecondary":
			if(TDs[row].childNodes[1].tagName == "TABLE") {
				quotes[row] = new Quote();
				quotes[row].setPostCell(TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[0].childNodes[0].innerHTML);
				userDataCell = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[0].cells[0];
				outputCell = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[0].cells[0];

				if(userDataCell.childNodes[3].tagName == "A") {
					id = userDataCell.childNodes[3].href.split("&")[1].replace("uid=", "");
					name = userDataCell.childNodes[3].text;
					quotes[row].setUserName(userDataCell.childNodes[3].text);
					quotes[row].setTimeStamp(userDataCell.lastChild.nodeValue);
					quotes[row].timeStamp = quotes[row].timeStamp.replace(/^\s+|\s+$/g,"");
				} else {
					id = userDataCell.childNodes[5].href.split("&")[1].replace("uid=", "");
					name = userDataCell.childNodes[5].text;
					quotes[row].setUserName(userDataCell.childNodes[5].text);
					quotes[row].setTimeStamp(userDataCell.lastChild.nodeValue);
					quotes[row].timeStamp = quotes[row].timeStamp.replace(/^\s+|\s+$/g,"");
				}

				outputCell.innerHTML = outputCell.innerHTML + '&nbsp;<img id="quote?' + row + '" src="http://img842.imageshack.us/img842/50/071233glossyspaceiconal.png" alt="' + Resources.wordList[preferences.lang]["quote_msg"] + '" title="' + Resources.wordList[preferences.lang]["quote_msg"] + '" style="border: none; position: relative; bottom: 1px; cursor: pointer; float: right;">';
				outputCell.innerHTML = outputCell.innerHTML + '<a href="/?p=guestbook&uid=' + id + '"><img src="http://managerzone.com/img/hockey/reply_guestbook.gif" alt="' + name + Resources.wordList[preferences.lang]["guestbook"] + '" title="' + name + Resources.wordList[preferences.lang]["guestbook"] + '" style="border: none; position: relative; top: 2px; float: right;"></a>';
				TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[0].childNodes[0].innerHTML = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[0].childNodes[0].innerHTML.replace(/<img src="((https?|ftp|file):\/\/(?!dynamic|static)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])" class="bb_image">/gim,'[noscript]$1[/noscript]');
				TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[0].childNodes[0].innerHTML = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[0].childNodes[0].innerHTML.replace(Resources.uriPattern,'<a href="$1" target="_blank">$1</a>');
				TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[0].childNodes[0].innerHTML = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[0].childNodes[0].innerHTML.replace(Resources.mzPattern, location.href.substring(0, location.href.indexOf("?", 0)));
				TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[0].childNodes[0].innerHTML = TDs[row].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[0].childNodes[0].innerHTML.replace(/\[noscript\]<a href="(.+?)" target="_blank">(.+?)<\/a>\[\/noscript\]/gi,'<img src="$1" class="bb_image" alt="">');
			}
			break;
		}
	}
};

Accessories.createPageLinks = function() {
	var TDs = doc.document.getElementsByTagName("TD");
	var done = false;

	for(var i=0;i<TDs.length;i++) {
		if(TDs[i].className == "forumtitle" && !done) {
			var topics = TDs[i].parentNode.parentNode.rows;
			for(var i = 2; i<topics.length; i++) {
				var topicHref = topics[i].cells[0].getElementsByTagName("A")[0].href;
				var topicStats = topics[i].cells[1].innerHTML;
				var posts = parseInt(topicStats.split(" / ")[1]);
				var pages = Math.floor((posts-1)/50);
				if(pages > 0) {
					var left = doc.getCursorXY[0];
					var top = doc.getCursorXY[1];
					var seperator = "";
					var pagebar = '<div id="pagebar?' + i + '" style="position: absolute; top: ' + top + 'px; left: ' + left + 'px; display: none; border: 1px #000 solid; padding: 3px; background: #fff;">';
					for(var j=1;j<=pages;j++) {
						pagebar += seperator + '<a href="' + topicHref + '&amp;offset=' + (j*50) + '">' + (j+1) + '</a>';
						seperator = " ";
					}
					pagebar += "</div>";
					topics[i].cells[1].innerHTML += '<a id="gotopage?' + i + '" title="' + Resources.wordList[preferences.lang]["goto_page"] + '" style="float: right; cursor: pointer;">&#187;</a>' + pagebar;
					topics[i].cells[4].innerHTML = '<a href="' + topicHref + '&amp;offset=' + (pages*50) + '#last_post" title="' + Resources.wordList[preferences.lang]["goto_last_post"] + '" style="text-decoration: none; color: inherit;">' + topics[i].cells[4].innerHTML + '</a>';
				} else {
					topics[i].cells[4].innerHTML = '<a href="' + topicHref + '#last_post" title="' + Resources.wordList[preferences.lang]["goto_last_post"] + '" style="text-decoration: none; color: inherit;">' + topics[i].cells[4].innerHTML + '</a>';
				}
			}
			done = true;
		}
	}
};

Accessories.convertTextToLink = function() {
	switch(preferences.locationOnSite) {
	case "guestbook":
	case "leagueboard":
		var TDs = doc.document.getElementsByTagName("TD");
		for(var row = 0; row < TDs.length; row+=2) {
			if(TDs[row].className == "listsecondary") {
				TDs[row].parentNode.parentNode.rows[1].cells[0].childNodes[0].innerHTML = TDs[row].parentNode.parentNode.rows[1].cells[0].childNodes[0].innerHTML.replace(/<img src="((https?|ftp|file):\/\/(?!dynamic|static)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])" class="bb_image">/gim,'[noscript]$1[/noscript]');
				TDs[row].parentNode.parentNode.rows[1].cells[0].childNodes[0].innerHTML = TDs[row].parentNode.parentNode.rows[1].cells[0].childNodes[0].innerHTML.replace(Resources.uriPattern,'<a href="$1" target="_blank">$1</a>');
				TDs[row].parentNode.parentNode.rows[1].cells[0].childNodes[0].innerHTML = TDs[row].parentNode.parentNode.rows[1].cells[0].childNodes[0].innerHTML.replace(Resources.mzPattern, location.href.substring(0, location.href.indexOf("?", 0)));
				TDs[row].parentNode.parentNode.rows[1].cells[0].childNodes[0].innerHTML = TDs[row].parentNode.parentNode.rows[1].cells[0].childNodes[0].innerHTML.replace(/\[noscript\]<a href="(.+?)" target="_blank">(.+?)<\/a>\[\/noscript\]/gi,'<img src="$1" class="bb_image" alt="">');
			}
		}
		break;
	}
};


function Program(){};

Program.prototype.exec = function(){
	this.setPreferences();
	this.prepareObjects();
	this.addContent();
};

Program.prototype.setPreferences = function() {
	/* * * Cookie accessors - Start * * */
	preferences.setLang(doc.getCookie("MZLANG"));
	preferences.setSport(doc.getCookie("MZSPORT"));
	/* * * Cookie accessors - End * * */

	preferences.setLocationOnSite();
};

Program.prototype.prepareObjects = function() {
	bbCode.initialize();
};

Program.prototype.addContent = function() {
	switch(preferences.locationOnSite) {
	case "topic":
		Accessories.addForumExtras();
		Accessories.convertTextToLink();
		colorTable.build();
		preview.setUpPreviewWindow(preferences.locationOnSite);
		bbCode.buildToolbar();
		preview.setPreview();
		doc.addPreviewButton();
		break;
	case "topics":
		Accessories.createPageLinks();
		Accessories.convertTextToLink();
		colorTable.build();
		preview.setUpPreviewWindow(preferences.locationOnSite);
		bbCode.buildToolbar();
		preview.setPreview();
		doc.addPreviewButton();
		break;
	case "guestbook":
		Accessories.convertTextToLink();
		colorTable.build();
		preview.setUpPreviewWindow(preferences.locationOnSite);
		bbCode.buildToolbar();
		preview.setPreview();
		doc.addPreviewButton();
		break;
	case "leagueboard":
		Accessories.convertTextToLink();
		colorTable.build();
		preview.setUpPreviewWindow(preferences.locationOnSite);
		bbCode.buildToolbar();
		preview.setPreview();
		doc.addPreviewButton();
		break;
	case "challenge":
		doc.addChallengeButton();
		break;
	}
	doc.addForumQuickLink();
};

Program.prototype.retry = function() {
	switch(preferences.locationOnSite) {
	case "leagueboard":
		bbCode.message = doc.document.getElementsByName("msg")[0];
		break;
	}
};


function MainDocument(doc){
	MainDocument.prototype.document = doc;
	this.drag;
};

MainDocument.prototype.getCursorXY = function(e) {
	var coords = new Array(2);
	coords[0] = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
	coords[1] = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
	return coords;
};

MainDocument.prototype.getDocHeight = function() {
	var D = MainDocument.prototype.document;
	return Math.max(
		Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
		Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
		Math.max(D.body.clientHeight, D.documentElement.clientHeight)
	);
};

MainDocument.prototype.getDocWidth = function() {
	return MainDocument.prototype.document.documentElement.scrollWidth;
};

MainDocument.prototype.getElement = function(id) {
	return MainDocument.prototype.document.getElementById(id);
};

/**
 * Retrives cookie data.
 * 
 * @param string cName The name of the cookie to look up.
 * @author http://www.w3schools.com/js/js_cookies.asp -
 * 		   slightly modified to better suit the needs of this script.
 */
MainDocument.prototype.getCookie = function(cName) {
	var i, x, y, cookies = MainDocument.prototype.document.cookie.split(";");
	for(i=0;i<cookies.length;i++) {
		x = cookies[i].substr(0,cookies[i].indexOf("="));
		y = cookies[i].substr(cookies[i].indexOf("=") + 1);
		x = x.replace(/^\s+|\s+$/g,"");
		if(x == cName) return unescape(y);
	}
	return null;
};

MainDocument.prototype.toggleDisplay = function(id) {
	if(MainDocument.prototype.getElement(id).style.display == "none")
		MainDocument.prototype.getElement(id).style.display = "block";
	else if(MainDocument.prototype.getElement(id).style.display == "block")
		MainDocument.prototype.getElement(id).style.display = "none";
};

MainDocument.prototype.addPreviewButton = function() {
	var element = '<table border=0 cellpadding=0 cellspacing=0><tr><td><table onClick="button_onClick(\'preview\', \'void(0);\', \'multi\', \'normal\')" class=buttondiv border=0 cellpadding=0 cellspacing=0 id="preview_table"><tr><td width=6 align=right class="ButtonCursor"><img src="http://static.managerzone.com/nocache-68/img/btn/account_left.gif" id="send_btn_limg" width="5" height="24" style="display: block;"></td><td align="center" valign="middle" class="button_account_middle" height=24><span id="preview" style="white-space: nowrap">' + Resources.wordList[preferences.lang]["preview"] + '</span></td><td width=6 class="ButtonCursor"><img src="http://static.managerzone.com/nocache-68/img/btn/account_right.gif" id="send_btn_rimg" height="24" width="6" style="display: block;"></td></tr></table></td></tr></table>';
	if(preferences.locationOnSite == "leagueboard") {
		MainDocument.prototype.getElement("writeform").innerHTML += element;
	} else {
		MainDocument.prototype.getElement("formpostbutton").innerHTML = '<table border="0" cellpadding="2"><tr><td>' + element + '</td><td>' + MainDocument.prototype.getElement("formpostbutton").innerHTML + '</td></tr></table>';
	}
};

MainDocument.prototype.addChallengeButton = function() {
	var element = '<table border=0 cellpadding=0 cellspacing=0><tr><td><table onClick="button_onClick(\'invite\', \'void(0);\', \'single\', \'normal\')" id="invite_table" class=buttondiv border=0 cellpadding=0 cellspacing=0><tr><td width=6 align=right class="ButtonCursor"><img src="http://static.managerzone.com/nocache-63/img/btn/account_left.gif" id="challengeBtn_0_limg" width="5" height="24" style="display: block;"></td><td align="center" valign="middle" class="button_account_middle" height=24><span id="invite" style="white-space: nowrap">' + Resources.wordList[preferences.lang]["invite_long"] + '</span></td><td width=6 class="ButtonCursor"><img src="http://static.managerzone.com/nocache-63/img/btn/account_right.gif" id="challengeBtn_0_rimg" height="24" width="6" style="display: block;"></td></tr></table></td></tr></table>';
	MainDocument.prototype.getElement("chForm_0").parentNode.insertRow(2).innerHTML = "<td></td><td></td><td align=right>" + element + "</td>";
};

MainDocument.prototype.addForumQuickLink = function() {
	var i = (MainDocument.prototype.getElement("logout_etc").getElementsByTagName("DIV").length > 3) ? 3 : 2;
	MainDocument.prototype.getElement("logout_etc").getElementsByTagName("DIV")[i].innerHTML = '<a href="?p=forum"><img src="http://findicons.com/files/icons/1577/danish_royalty_free/32/users.png" alt="' + Resources.wordList[preferences.lang]["forum"] + '" title="' + Resources.wordList[preferences.lang]["forum"] + '" style="height: 23px; border: none;" /></a>' + MainDocument.prototype.getElement("logout_etc").getElementsByTagName("DIV")[i].innerHTML;
};

/**
 * @deprecated Doesn't work properly, bad solution anyway.
 */
MainDocument.prototype.doubleInvite = function() {
	setTimeout('document.getElementById("chForm_0").submit()',100);
	setTimeout('document.getElementById("chForm_1").submit()',200);
};


function UserPreference() {
	this.locationOnSite = null;
	this.lang = 0;
	this.sport = "soccer";
};

UserPreference.prototype.setLang = function(langCode) {
	var langCodeTable = {"en":0, "se":1};
	if(!(langCode in langCodeTable)) langCode = "en";
	this.lang = langCodeTable[langCode];
};

UserPreference.prototype.setLocationOnSite = function() {
	var path = window.location.href;

	if(
		(path.search(/managerzone/i) != -1) &&
		(path.search(/\/iframes\//i) == -1) &&
		(path.search(/\/ajax_com\//i) == -1) &&
		(path.search(/\/dynamic.managerzone.com\//i) == -1) &&
		(path.search(/\/static.managerzone.com\//i) == -1) &&
		(doc.document.getElementById("logout_etc") != null)
	) {
		this.locationOnSite = "another";

		if(path.search(/sub=topics/i) != -1) this.locationOnSite = "topics";
		else if(path.search(/topic_id=/i) != -1) this.locationOnSite = "topic";
		else if(path.search(/p=guestbook/i) != -1) this.locationOnSite = "guestbook";
		else if(path.search(/sub=board/i) != -1) this.locationOnSite = "leagueboard";
		else if(path.search(/sub=challenge/i) != -1) this.locationOnSite = "challenge";
	} else {
		this.locationOnSite = "outside";
	}
};

UserPreference.prototype.setSport = function(s) {
	this.sport = (s != null) ? s : "soccer";
};


function BBCode(doc) {
	this.table;
	this.tblRow;
	this.message;
	this.toolbar;
	this.mainDocument = doc;
};

BBCode.prototype.initialize = function() {
	switch(preferences.locationOnSite) {
	case "topic":
		this.table = this.mainDocument.getElement("forumform").getElementsByTagName("table")[0];
		this.tblRow = this.table.insertRow(2);
		this.message = this.mainDocument.document.getElementsByName("message")[0];
		this.toolbar = '<td valign="top">BBCode</td><td style="background-color: transparent;">';
		break;
	case "topics":
		this.table = this.mainDocument.document.getElementsByName("forumform")[0].parentNode;
		this.tblRow = this.table.insertRow(2);
		this.message = this.mainDocument.document.getElementsByName("message")[0];
		this.toolbar = '<td valign="top">BBCode</td><td style="background-color: transparent;">';
		break;
	case "guestbook":
		this.table = this.mainDocument.document.getElementsByName("writeForm")[0].parentNode.parentNode.parentNode.parentNode;
		this.tblRow = this.table.insertRow(0);
		this.message = this.mainDocument.document.getElementsByName("msg")[0];
		this.toolbar = '<td style="background-color: transparent; padding: 25px 0 0 203px;">';
		break;
	case "leagueboard":
		this.table = this.mainDocument.getElement("writeform").parentNode.parentNode.parentNode.parentNode;
		this.tblRow = this.table.insertRow(0);
		this.message = this.mainDocument.document.getElementsByName("msg")[0];
		this.toolbar = '<td style="background-color: transparent; padding: 25px 0 0 103px;">';
		break;
	}
};

BBCode.prototype.buildToolbar = function() {
	this.toolbar += '<div id="drag?clrBar" style="z-index: 9998; position: absolute; bottom: 300px; left: 250px; display: none; background: #fff; padding: 4px; border: 1px solid #000; cursor: move;">';
	this.toolbar += colorTable.table;
	this.toolbar += '</div>';
	this.toolbar += '<div id="drag?previewWnd" style="z-index: 9999; position: absolute; bottom: 500px; left: ' + ((doc.getDocWidth()/2)-600) + 'px; display: none; background: #fff; padding: 4px; border: 1px solid #000; cursor: move;">';
	this.toolbar += preview.window;
	this.toolbar += '</div>';
	this.toolbar += '<a id="bbcode?b" style="cursor: pointer;">' + Resources.wordList[preferences.lang]["bold"] + '</a> ';
	this.toolbar += '<a id="bbcode?i" style="cursor: pointer;">' + Resources.wordList[preferences.lang]["italic"] + '</a> ';
	this.toolbar += '<a id="bbcode?u" style="cursor: pointer;">' + Resources.wordList[preferences.lang]["underline"] + '</a> ';
	this.toolbar += '<a id="bbcode?li" style="cursor: pointer;">' + Resources.wordList[preferences.lang]["list"] + '</a> ';
	this.toolbar += '<a id="bbcode?p" style="cursor: pointer;">' + Resources.wordList[preferences.lang]["paragraph"] + '</a> ';
	this.toolbar += '<a id="bbcode?code" style="cursor: pointer;">' + Resources.wordList[preferences.lang]["code"] + '</a> ';
	this.toolbar += '<a id="color" style="cursor: pointer;" title="' + Resources.wordList[preferences.lang]["cm_exclusive"] + '">' + Resources.wordList[preferences.lang]["text_clr"] + '</a> ';
	this.toolbar += '<a id="image" style="cursor: pointer;" title="' + Resources.wordList[preferences.lang]["cm_exclusive"] + '">' + Resources.wordList[preferences.lang]["add_img"] + '</a><br>';
	this.toolbar += '<img id="smiley?1" src="' + Resources.smileys[1] + '" alt=":)" style="border: none; cursor: pointer; margin-top: 4px;"> ';
	this.toolbar += '<img id="smiley?2" src="' + Resources.smileys[2] + '" alt=";)" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?3" src="' + Resources.smileys[3] + '" alt=":(" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?4" src="' + Resources.smileys[4] + '" alt="^^" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?5" src="' + Resources.smileys[5] + '" alt="o_0" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?6" src="' + Resources.smileys[6] + '" alt="&gt;:)" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?7" src="' + Resources.smileys[7] + '" alt="$)" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?8" src="' + Resources.smileys[8] + '" alt="X|" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?9" src="' + Resources.smileys[9] + '" alt=":/" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?10" src="' + Resources.smileys[10] + '" alt=":&lt;" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?11" src="' + Resources.smileys[11] + '" alt="&lt;3" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?12" src="' + Resources.smileys[12] + '" alt="+" style="border: none; cursor: pointer;"> ';
	this.toolbar += '<img id="smiley?13" src="' + Resources.smileys[13] + '" alt="-" style="border: none; cursor: pointer;">';
	this.tblRow.innerHTML = this.toolbar;
};

BBCode.prototype.addImage = function() {
	var image = prompt(Resources.wordList[preferences.lang]["enter_uri"]);
	var preUri = "[image url=";
	var posUri = "]";
	var output = "";

	if(image != "" || image != null) {
		img = new Image();
		img.src = image;

		if((img.height == 0) || (img.width == 0)) {
			while(!((img.height == 0) || (img.width == 0))) {
				Accessories.pauseComp(100);
				img.src = image;
			}
		}

		if((img.height == 0 || img.width == 0) && image != null) {
			alert(Resources.wordList[preferences.lang]["image"] + image + Resources.wordList[preferences.lang]["doesnt_exist"]);
		} else if(image == null) {
			return;
		} else {
			output += preUri + image + posUri;			
			this.message.value += output;
		}
	}
};

BBCode.prototype.format = function(tag) {
	var obj = this.message;
	var start = obj.selectionStart;
	var end = obj.selectionEnd;
	obj.value = obj.value.substr(0, start) + "[" + tag + "]" + obj.value.substr(start, end - start) + "[/" + tag + "]" + obj.value.substr(end, obj.value.length);
};

BBCode.prototype.colorize = function(color) {
	var obj = this.message;
	var start = obj.selectionStart;
	var end = obj.selectionEnd;
	obj.value = obj.value.substr(0, start) + "[color=#" + color + "]" + obj.value.substr(start, end - start) + "[/color]" + obj.value.substr(end, obj.value.length);
};

BBCode.prototype.addSmiley = function(index) {
	this.message.value += "[image url=" + Resources.smileys[index] + "]";
};


function ColorTable(){
	this.table = "";
};

ColorTable.prototype.build = function() {
	var colors = new Array(216);
	var c = new Array("00", "33", "66", "99", "cc", "ff"); 
	var count = 0;
	for(r = 0; r < 6; r++) {
		for(g = 0; g < 6; g++) {
			for(b = 0; b < 6; b++) {
				colors[count] = c[r] + c[g] + c[b]; 
				count++;
			}
		}
	}

	var swatchcount = 0;
	for(clr in colors) {
		this.table += '<a title="#' + colors[clr] + '" alt="#' + colors[clr] + '" id="clrize?' + colors[clr] + '\" style="background: #' + colors[clr] + '; cursor: pointer; margin: 2px; width: 10px; height: 10px; display: inline-block;"></a>';
		swatchcount++;
		if(swatchcount%18 == 0) {
			this.table += "<br>";
		}
	}
};


function Preview(){
	this.window = "";
};

Preview.prototype.setUpPreviewWindow = function(locationOnSite, title, post) {
	if(locationOnSite === undefined) locationOnSite = "";
	if(title === undefined) title = "";
	if(post === undefined) post = "";

	//var who;
	var tid = 0;
	var location = "";

	switch(locationOnSite) {
	case "topics":
	case "topic":
		location = "forum_post";
		break;
	case "guestbook":
		location = "guestbook_post";
		break;
	case "leagueboard":
		location = "guestbook_post";
		break;
	}
	
	this.window = ""; // reset
	this.window += '<a title="' + Resources.wordList[preferences.lang]["exit_preview"] + '" style="float: right; cursor: pointer;"><img src="http://managerzone.com/img/logout.gif" alt="' + Resources.wordList[preferences.lang]["exit_preview"] + '" id="closepreview" /></a>';
	this.window += '<i style="cursor: auto;">' + Resources.wordList[preferences.lang]["preview_disclaimer"] + '</i>';
	this.window += '<table border="0" cellpadding="5" cellspacing="0" style="width: 600px; background-color: #ededed; clear: both; margin-top: 5px; cursor: auto;"><tr><td><table border=0 width="100%" cellpadding=1 cellspacing=1><tr><td class="listsecondary"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td>';
	this.window += title;
	this.window += '</td></tr></table></td></tr><tr><td><table border="0" width="100%" cellpadding="2" cellspacing="0"><tr><td colspan="2" style="vertical-align: middle;">';
	//this.window += who;
	this.window += '</td></tr><tr><td style="vertical-align: top;"><div style="overflow: auto; width: 509px;">';
	this.window += Preview.prototype.bbCodeToHtml(post);
	this.window += '</div></td><td style="vertical-align: top; text-align: right;">';
	this.window += '<img src="http://dynamic.managerzone.com/dynimg/badge.php?team_id=' + tid + '&sport=' + preferences.sport + '&location=' + location + '" onload="pngtrans(this);">';
	this.window += '</td></tr></table></td></tr></table></td></tr></table>';
};

Preview.prototype.setPreview = function() {
	doc.document.getElementById("drag?previewWnd").innerHTML = this.window;
};

Preview.prototype.buildPreview = function(location) {
	// TODO: parse user info
	var title = "";
	var msg = "";

	switch(location) {
	case "topics":
	case "topic":
		title = doc.document.forms[1].elements["title"].value;
		msg = doc.document.forms[1].elements["message"].value;
		break;
	case "guestbook":
		msg = doc.document.forms[1].elements["msg"].value;
		break;
	case "leagueboard":
		msg = doc.document.forms[1].elements["msg"].value;
		break;
	}

	Preview.prototype.setUpPreviewWindow(location, title, msg);
	Preview.prototype.setPreview();
};

Preview.prototype.bbCodeToHtml = function(msg) {
	var tables = msg.match(/^\[table\](?:(?!\[\/table\])[\s\S])*\[\/table\]$/gim);
	if(tables != null) {
		msg = msg.replace(/^\[table\](?:(?!\[\/table\])[\s\S])*\[\/table\]$/gim, "[tablehere]");
	}

	msg = msg.replace(/&/gi, "&amp;");
	msg = msg.replace(/</gi, "&lt;").replace(/>/gi, "&gt;");
	msg = msg.replace(/\n|\r/gi, "<br />");
	msg = msg.replace(/\[i\]\[color=#555555\](.+?)\[\/color\]\[\/i\]/gi, '<i style="color: #555555">$1</i>');
	msg = msg.replace(/\[color=(.+?)\](.+?)\[\/color\]/gim, '<span style="color: $1">$2</span>');
	msg = msg.replace(/\[\/b\]/gi, "</b>").replace(/\[b\]/gi, "<b>").replace(/\[\/i\]/gi, "</i>").replace(/\[i\]/gi, "<i>").replace(/\[\/u\]/gi, "</u>").replace(/\[u\]/gi, "<u>").replace(/\[li\]/gi, "<li>").replace(/\[\/li\]/gi, "</li>").replace(/\[p\]/gi, "<p>").replace(/\[\/p\]/gi, "</p>").replace(/\[code\]/gi, "<code>").replace(/\[\/code\]/gi, "</code>");

	if(tables != null) {
		for(var j=0;j<tables.length;j++) {
			msg = msg.replace(/\[tablehere\]/, tables[j]);
			msg = msg.replace(/\[table\]/gi, '<table class="BBCodeTable">').replace(/\[\/table\]/gi, "</table>");
			msg = msg.replace(/\[tr\]/gi, "<tr>").replace(/\[\/tr\]/gi, "</tr>");
			msg = msg.replace(/\[th\]/gi, "<th>").replace(/\[\/th\]/gi, "</th>");
			msg = msg.replace(/\[td\]/gi, "<td>").replace(/\[\/td\]/gi, "</td>");
		}
	}
	
	var images = msg.match(/\[image url=\S+\]/gm);

	if(images != null) {
		for(var j = 0; j < images.length; j++) {
			msg = msg.replace(images[j], images[j].replace('\[image url=', '<img src="').replace('\]', '" class="bb_image">'));
		}
	}

	msg = msg.replace(/<img src="((https?|ftp|file):\/\/(?!dynamic|static)[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])" class="bb_image">/gim,'[noscript]$1[/noscript]');
	msg = msg.replace(Resources.uriPattern,'<a href="$1" target="_blank">$1</a>');
	msg = msg.replace(Resources.mzPattern, location.href.substring(0, location.href.indexOf("?", 0)));
	msg = msg.replace(/\[noscript\]<a href="(.+?)" target="_blank">(.+?)<\/a>\[\/noscript\]/gi,'<img src="$1" class="bb_image" alt="">');

	return msg;
};

function Quote(){
	this.userName = "";
	this.timeStamp = "";
	this.postCell = "";
};

Quote.prototype.setUserName = function(name) {
	this.userName = name;
};

Quote.prototype.setTimeStamp = function(time) {
	this.timeStamp = time;
};

Quote.prototype.setPostCell = function(cell) {
	this.postCell = cell;
};

Quote.prototype.build = function() {
	var messageValue;
	var timeWords = this.timeStamp.split(" ");
	var quoteLine;
	switch(preferences.lang) {
	case 0:
		var noPrepDays = {0:Resources.wordList[preferences.lang]["today"], 1:Resources.wordList[preferences.lang]["yesterday"]};
		var preposition = (!(Accessories.inArray(timeWords[0], noPrepDays))) ? "On " : "";
		quoteLine = "[b]" + preposition+this.timeStamp + ", [i]" + this.userName + "[/i] wrote:[/b]\n";
		break;
	case 1:
		quoteLine = "[b]" + this.timeStamp + ", skrev [i]" + this.userName + "[/i]:[/b]\n";
		break;
	}
	bbCode.message.value += quoteLine;
	
	messageValue = this.postCell;
	messageValue = messageValue.replace(/<br>/gi, "");
	messageValue = messageValue.replace(/&lt;/gi, "<").replace(/&gt;/gi, ">");
	messageValue = messageValue.replace(/&amp;/gi, "&");
	messageValue = messageValue.replace(/<i style="color: #555555">(.+?)<\/i>/gi, "[i][color=#555555]$1[/color][/i]");
	messageValue = messageValue.replace(/<span style="color: (.+?)">(.+?)<\/span>/gim, "[color=$1]$2[/color]");
	messageValue = messageValue.replace(/<\/b>/gi, "[/b]").replace(/<b>/gi, "[b]").replace(/<\/i>/gi, "[/i]").replace(/<i>/gi, "[i]").replace(/<\/u>/gi, "[/u]").replace(/<u>/gi, "[u]").replace(/<li>/gi, "[li]").replace(/<\/li>/gi, "[/li]").replace(/<p>/gi, "[p]").replace(/<\/p>/gi, "[/p]").replace(/<code>/gi, "[code]").replace(/<\/code>/gi, "[/code]");
	var images = messageValue.match(/<img src="\S+" class="bb_image">/gm);
	
	if(images != null) {
		for(var j = 0; j < images.length; j++) {
			messageValue = messageValue.replace(images[j], images[j].replace('<img src="', '[image url=').replace('" class="bb_image">', ']'));
		}
	}

	bbCode.message.value += messageValue + "\n• • • • • • • • • •\n\n";
	bbCode.message.scrollTop = 8192;
	bbCode.message.focus();
};


/**
 * Constructs a new drag object.
 * 
 * @param MainDocument doc The main document
 * @author http://waseemblog.com/42/movable-div-using-javascript.html -
 * 		   slightly modified to better suit the needs of this script. This applies
 * 		   to all the member functions of the Drag class.
 */
function Drag(doc) {
	Drag.prototype.mainDocument = doc;
	Drag.prototype.windowWidth = Drag.prototype.mainDocument.getDocWidth();
	Drag.prototype.windowHeight = Drag.prototype.mainDocument.getDocHeight();
};

Drag.prototype.dragObj = new Object();
Drag.prototype.hMod = null;
Drag.prototype.wMod = null;

/**
 * Starts a new drag event.
 * 
 * @param event The event object
 * @param id The element id
 * @param modifiers Optional modifiers
 */
Drag.prototype.start = function(event, id, modifiers) {
	var x, y;
	Drag.prototype.dragObj.elNode = Drag.prototype.mainDocument.getElement(id);
	Drag.prototype.hMod = modifiers[0];
	Drag.prototype.wMod = modifiers[1];

	try {
		x = window.event.clientX + Drag.prototype.mainDocument.document.documentElement.scrollLeft + Drag.prototype.mainDocument.document.body.scrollLeft;
		y = window.event.clientY + Drag.prototype.mainDocument.document.documentElement.scrollTop + Drag.prototype.mainDocument.document.body.scrollTop;
	} catch(e) {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}

	Drag.prototype.dragObj.cursorStartX = x;
	Drag.prototype.dragObj.cursorStartY = y;
	if(Drag.prototype.wMod == 'l') Drag.prototype.dragObj.elStartLeft = parseInt(Drag.prototype.dragObj.elNode.style.left, 10);
	if(Drag.prototype.wMod == 'r') Drag.prototype.dragObj.elStartLeft = Drag.prototype.windowWidth - parseInt(Drag.prototype.dragObj.elNode.style.right, 10);
	if(Drag.prototype.hMod == 't') Drag.prototype.dragObj.elStartTop = parseInt(Drag.prototype.dragObj.elNode.style.top, 10);
	if(Drag.prototype.hMod == 'b') Drag.prototype.dragObj.elStartTop = Drag.prototype.windowHeight - parseInt(Drag.prototype.dragObj.elNode.style.bottom, 10);
	if(isNaN(Drag.prototype.dragObj.elStartLeft)) Drag.prototype.dragObj.elStartLeft = 0;
	if(isNaN(Drag.prototype.dragObj.elStartTop)) Drag.prototype.dragObj.elStartTop  = 0;

	try {
		Drag.prototype.mainDocument.document.attachEvent("onmousemove", Drag.prototype.go);
		Drag.prototype.mainDocument.document.attachEvent("onmouseup", Drag.prototype.stop);
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	} catch(e) {
		Drag.prototype.mainDocument.document.addEventListener("mousemove", Drag.prototype.go, true);
		Drag.prototype.mainDocument.document.addEventListener("mouseup", Drag.prototype.stop, true);
		event.preventDefault();
	}
};

/**
 * Tracks the drag event.
 * 
 * @param event The event object
 */
Drag.prototype.go = function(event) {
	var x, y;

	try  {
		x = window.event.clientX + Drag.prototype.mainDocument.document.documentElement.scrollLeft + Drag.prototype.mainDocument.document.body.scrollLeft;
		y = window.event.clientY + Drag.prototype.mainDocument.document.documentElement.scrollTop + Drag.prototype.mainDocument.document.body.scrollTop;
	} catch(e) {
		x = event.clientX + window.scrollX;
		y = event.clientY + window.scrollY;
	}

	var drLeft = (Drag.prototype.dragObj.elStartLeft + x - Drag.prototype.dragObj.cursorStartX);
	var drTop = (Drag.prototype.dragObj.elStartTop + y - Drag.prototype.dragObj.cursorStartY);
	if(drLeft > 0) {
		if(Drag.prototype.wMod == 'l') Drag.prototype.dragObj.elNode.style.left = drLeft  + "px";
		if(Drag.prototype.wMod == 'r') Drag.prototype.dragObj.elNode.style.right = Drag.prototype.windowWidth - drLeft  + "px";
	} else {
		if(Drag.prototype.wMod == 'l') Drag.prototype.dragObj.elNode.style.left = "1px";
		if(Drag.prototype.wMod == 'r') Drag.prototype.dragObj.elNode.style.right = "1px";
	}
	if(drTop > 0) {
		if(Drag.prototype.hMod == 't') Drag.prototype.dragObj.elNode.style.top = drTop + "px";
		if(Drag.prototype.hMod == 'b') Drag.prototype.dragObj.elNode.style.bottom = Drag.prototype.windowHeight - drTop + "px";
	} else {
		if(Drag.prototype.hMod == 't') Drag.prototype.dragObj.elNode.style.top = "1px";
		if(Drag.prototype.hMod == 'b') Drag.prototype.dragObj.elNode.style.bottom = "1px";
	}
	try {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	} catch(e) {
		event.preventDefault();
	}
};

/**
 * Stops a drag event.
 * 
 * @param event The event object
 */
Drag.prototype.stop = function(event) {
	try {
		Drag.prototype.mainDocument.document.detachEvent("onmousemove", Drag.prototype.go);
		Drag.prototype.mainDocument.document.detachEvent("onmouseup", Drag.prototype.stop);
	} catch(e) {
		Drag.prototype.mainDocument.document.removeEventListener("mousemove", Drag.prototype.go, true);
		Drag.prototype.mainDocument.document.removeEventListener("mouseup", Drag.prototype.stop, true);
	}
};


//#endregion Class definitions


// globals
var colorTable = new ColorTable();
var preview = new Preview();
var doc = new MainDocument(document);
var preferences = new UserPreference();
var bbCode = new BBCode(doc);
var quotes = new Array();
var mzExtras = new Program();


doc.drag = new Drag(doc);

doc.document.addEventListener("click", function(event) {
	var i = event.target.id.split("?")[1];
	switch(event.target.id) {
	case "image":
		bbCode.addImage();
		break;
	case "quote?" + i:
		quotes[i].build();
		break;
	case "bbcode?" + i:
		bbCode.format(i);
		break;
	case "smiley?" + i:
		bbCode.addSmiley(i);
		break;
	case "clrize?" + i:
		bbCode.colorize(i);
		doc.toggleDisplay("drag?clrBar");
		break;
	case "color":
		doc.toggleDisplay("drag?clrBar");
		break;
	case "invite":
		doc.doubleInvite();
		break;
	case "gotopage?" + i:
		if(window.Event) {
			doc.document.captureEvents(Event.CLICK);
		}
		doc.document.onClick = doc.getCursorXY;
		doc.toggleDisplay("pagebar?" + i);
		break;
	case "preview":
		preview.buildPreview(preferences.locationOnSite);
		doc.toggleDisplay("drag?previewWnd");
		break;
	case "closepreview":
		doc.toggleDisplay("drag?previewWnd");
		break;
	case "showquotes":
		Debug.showQuoteArray();
		break;
	}
}, true);

doc.document.addEventListener("mousedown", function(event) {
	var i = event.target.id.split("?")[1];
	switch(event.target.id) {
	case "drag?" + i:
		var modifiers = Resources.dragModifiers;
		modifiers[0] = (parseInt(event.target.style.bottom) > 0) ? 'b' : 't';
		modifiers[1] = (parseInt(event.target.style.right) > 0) ? 'r' : 'l';
		doc.drag.start(event, "drag?" + i, modifiers);
		break;
	}
}, true);


mzExtras.exec();

/* I'm too stupid to figure out the exact cause of the league board bug,
 * so this will be my poor workaround for now. Yeah I know, it sucks.
 * You're free to mail me and tell me how easy it is to fix the problem,
 * you'll find my e-mail address at the top of this document.
 */
mzExtras.retry();


unsafeWindow.gmsLoaded = true;