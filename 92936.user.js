Compartilhar / Salvar
E-mail
Marcador
OrkutdiHITTDeliciousGoogle BookmarksMySpaceMessengerYahoo BookmarksMister-WongGoogle ReaderXINGNetvibes SharePosterousBusiness ExchangeTechNetArtoSmakNewsAIMIdenti.caBlogger PostBox.netNetlogShoutwireJumptagsFunPPhoneFavsNetvouzDiigoBlogMarksStartAidKhabbrYoolinkTechnotizieMultiplyPlaxo PulseSquidooBlinklistYiGGSegnaloYouMobFarkJamespotTwiddlaMindBodyGreenHuggNowPublicLiveJournalHelloTxtYampleLinkatopiaLinkedInAsk.com MyStuffMapleConnoteaMyLinkVaultSphinnCare2 NewsSphereGabbrTagzaVodPodAmazon Wish ListRead It LaterEmail
Yahoo MailAOL Mail
	
FacebookTwitterDiggGoogle BuzzRedditStumbleUponBeboWordPressEvernoteStrandsDailyMeMSDNExpressionTipdPlurkYahoo MessengerMozillacaTypePad PostMixxTechnorati FavoritesCiteULikeHemidemiInstapaperXerpiWinkBibSonomyTailrankKledyMeneameBookmarks.frNewsVineFriendFeedPingProtopage BookmarksFavesWebnewsPushaSlashdotAllvoicesImera BrazilLinkaGoGounalogDiglogTumblrCurrentSpurlOneviewSimpyBuddyMarksViadeoWistsBackflipSiteJotDZoneHyvesBitty BrowserSymbaloo FeedsFolkdNewsTrustPrintFriendlyTuentiRediff MyPage
Google GmailHotmail
Enviar de qualquer e-mail ou programa de e-mail:
Any email    
Fornecido por AddToAny
Userscripts.org

    * Signup
    * Login

    * Scripts
    * Tags
    * Forums
    * People
    * Blog
    * Books

Nachrichtensuche/Message search (Pennergame, Clodogame, Mendigogame, Menelgame, Dossergame, Serserionline, Bumrise, SampaFaveladogame)
By Peter L aus B — Last update May 22, 2010 — Installed 531 times.

    * About
    * Source Code
    * Reviews 0
    * Discussions 1
    * Fans 4
    * Issues
    * Share

There are 3 previous versions of this script.
Add Syntax Highlighting (this will take a few seconds, probably freezing your browser while it works)

var scr_version = <><![CDATA[
// ==UserScript==
// @name           Nachrichtensuche/Message search (Pennergame, Clodogame, Mendigogame, Menelgame, Dossergame, Serserionline, Bumrise, Faveladogame)
// @description    Searches messages for some sender/receiver and/or the message title.
// @namespace      peter_l_aus_b[Nachrichtensuche]
// @include        http://*bumrise.com/messages/
// @include        http://*bumrise.com/messages/#*
// @include        http://*bumrise.com/messages/?*
// @include        http://*bumrise.com/messages/out/
// @include        http://*bumrise.com/messages/out/#*
// @include        http://*bumrise.com/messages/out/?*
// @include        http://*clodogame.fr/messages/
// @include        http://*clodogame.fr/messages/#*
// @include        http://*clodogame.fr/messages/?*
// @include        http://*clodogame.fr/messages/out/
// @include        http://*clodogame.fr/messages/out/#*
// @include        http://*clodogame.fr/messages/out/?*
// @include        http://*dossergame.co.uk/messages/
// @include        http://*dossergame.co.uk/messages/#*
// @include        http://*dossergame.co.uk/messages/?*
// @include        http://*dossergame.co.uk/messages/out/
// @include        http://*dossergame.co.uk/messages/out/#*
// @include        http://*dossergame.co.uk/messages/out/?*
// @include        http://*sampa.faveladogame.com.br/messages/
// @include        http://*sampa.faveladogame.com.br/messages/#*
// @include        http://*sampa.faveladogame.com.br/messages/?*
// @include        http://*sampa.faveladogame.com.br/messages/out/
// @include        http://*sampa.faveladogame.com.br/messages/out/#*
// @include        http://*sampa.faveladogame.com.br/messages/out/?*
// @include        http://*mendigogame.es/messages/
// @include        http://*mendigogame.es/messages/#*
// @include        http://*mendigogame.es/messages/?*
// @include        http://*mendigogame.es/messages/out/
// @include        http://*mendigogame.es/messages/out/#*
// @include        http://*mendigogame.es/messages/out/?*
// @include        http://*menelgame.pl/messages/
// @include        http://*menelgame.pl/messages/#*
// @include        http://*menelgame.pl/messages/?*
// @include        http://*menelgame.pl/messages/out/
// @include        http://*menelgame.pl/messages/out/#*
// @include        http://*menelgame.pl/messages/out/?*
// @include        http://*pennergame.de/messages/
// @include        http://*pennergame.de/messages/#*
// @include        http://*pennergame.de/messages/?*
// @include        http://*pennergame.de/messages/out/
// @include        http://*pennergame.de/messages/out/#*
// @include        http://*pennergame.de/messages/out/?*
// @include        http://*serserionline.com/messages/
// @include        http://*serserionline.com/messages/#*
// @include        http://*serserionline.com/messages/?*
// @include        http://*serserionline.com/messages/out/
// @include        http://*serserionline.com/messages/out/#*
// @include        http://*serserionline.com/messages/out/?*
// @version        0.1.1
// ==/UserScript==
]]></>.toString().match(/@version\s+([.\d]+)/)[1];



var IS_OUT = /\/out\/(?:\?.*)?$/.test(window.location.href);
var DUMPDEST = window.location.host + '/' + (IS_OUT ? "out" : "in");

var THROBBER         = "http://i42.tinypic.com/6ymflx.png";
var READ             = "http://static.pennergame.de/img/pv4/icons/read.gif";
var TRASH            = "http://static.pennergame.de/img/pv4/icons/trash.gif";

function German() {
	this.LOADING          = "Läd …";
	this.MESSAGE_SEARCH   = "Nachrichtensuche";
	this.USER_NAME        = "Favelado";
	this.FROM_TO          = IS_OUT ? "an" : "von";
	this.MSG_TITLE        = "Nachrichtentitel";
	this.CASE_INSENSITIVE = "Groß/kleinschreibung ignorieren";
	this.REGEX            = "Regulärer Ausdruck";
	this.ORDER_BY         = "Sortieren nach";
	this.ORDER_BY_DATE    = "Datum";
	this.ORDER_BY_SENDER  = IS_OUT ? "Empfänger" : "Absender";
	this.ORDER_BY_TITLE   = "Überschrift";
	this.DESCENDING       = "absteigend";
	this.SELECT           = "auswählen";
	this.INDEXED_AT       = "Indiziert am %1% mit %2% Nachrichten.";
	this.REINDEX          = "Neu laden.";
	this.BROWSER_TOO_OLD  = "Du brauchst Firefox 3.5 oder höher, damit die Nachrichtensuche funktioniert!";
}

function English() {
	this.LOADING          = "Loading …";
	this.MESSAGE_SEARCH   = "Message search";
	this.USER_NAME        = "Bum's name";
	this.FROM_TO          = IS_OUT ? "to" : "from";
	this.MSG_TITLE        = "Message's title";
	this.CASE_INSENSITIVE = "ignore case";
	this.REGEX            = "regular expression";
	this.ORDER_BY         = "Order by";
	this.ORDER_BY_DATE    = "date";
	this.ORDER_BY_SENDER  = IS_OUT ? "receiver" : "sender";
	this.ORDER_BY_TITLE   = "title";
	this.DESCENDING       = "descending";
	this.SELECT           = "select";
	this.INDEXED_AT       = "Index at %1% (%2% messages).";
	this.REINDEX          = "Reindex.";
	this.BROWSER_TOO_OLD  = "Message searcher needs Firefox 3.5 or higher!";
}

var Default = English;

// please send me some translations!
function French() {}
function Spanish() {}
function Polish() {}
function Turkish() {}
function Portuguese() {}

var L10N = [
	[/pennergame\.de$/g,        German    ],
	[/clodogame\.fr$/g,         French    ],
	[/mendigogame\.es$/g,       Spanish   ],
	[/menelgame\.pl$/g,         Polish    ],
	[/dossergame\.co\.uk$/g,    English   ],
	[/serserionline\.com$/g,    Turkish   ],
	[/bumrise\.com$/g,          English   ],
	[/sampa.faveladogame\.com\.br$/g, Portuguese]

var messages = [];

var idToName = {};
var nameToId = {};
var nameToMsgs = {};

var idToTitle = [];
var titleToId = {};
var titleToMsgs = {};

var idToDate = [];
var dateToId = {};
var dateToMsgs = {};

var idToTime = [];
var timeToId = {};

var pagesToGet;
var timestamp = -1;
var foundMessages;
var indexedStatus;

var userName;
var userNameCaseInsensitive;
var userNameRegex;

var titleName;
var titleNameCaseInsensitive;
var titleNameRegex;

var orderBy;
var descending;

function newMessage(msgId, title, userId, userName, dateStr, timeStr) {
	var titleId, dateId, timeId;
	if(typeof(titleToId[title]) !== "undefined") {
		titleId = titleToId[title];
	} else {
		titleId = idToTitle.length;
		idToTitle.push(title);
		titleToId[title] = titleId;
	}
	if(typeof(dateToId[dateStr]) !== "undefined") {
		dateId = dateToId[dateStr];
	} else {
		dateId = idToDate.length;
		idToDate.push(dateStr);
		dateToId[dateStr] = dateId;
	}
	if(typeof(timeToId[timeStr]) !== "undefined") {
		timeId = timeToId[timeStr];
	} else {
		timeId = idToTime.length;
		idToTime.push(timeStr);
		timeToId[timeStr] = timeId;
	}
	
	if(typeof(idToName[userId]) === "undefined") {
		idToName[userId] = userName;
		nameToId[userName] = userId;
	}
	
	var id = messages.length;
	var res = { i:msgId, n:titleId, u:userId, d:dateId, t:timeId };
	messages.push(res);
	
	if(typeof(nameToMsgs[userId]) === "undefined") {
		nameToMsgs[userId] = [id];
	} else {
		nameToMsgs[userId].push(id);
	}
	if(typeof(titleToMsgs[titleId]) === "undefined") {
		titleToMsgs[titleId] = [id];
	} else {
		titleToMsgs[titleId].push(id);
	}
	if(typeof(dateToMsgs[dateId]) === "undefined") {
		dateToMsgs[dateId] = [id];
	} else {
		dateToMsgs[dateId].push(id);
	}
	
	return res;
}

function Alert(str) {
	if(--Alert.i >= 0) {
		alert(str);
	}
}
Alert.i = 1;

function purgeMessages() {
	messages = [];
	idToName = {};
	nameToId = {};
	nameToMsgs = {};
	idToTitle = [];
	titleToId = {};
	titleToMsgs = {};
	idToDate = [];
	dateToId = {};
	dateToMsgs = {};
	idToTime = [];
	timeToId = {};
}

function parseDump(dump) {
	purgeMessages();
	var obj = JSON.parse(dump);
	timestamp = obj.timestamp;
	for(var i = 0; i < obj.i.length; ++i) {
		var msg = obj.i[i];
		newMessage(msg.i, obj.n[msg.n], msg.u, obj.u[msg.u], obj.d[msg.d], obj.t[msg.t]);
	}
}

function safeDump() {
	timestamp = new Date().getTime();
	var dump = JSON.stringify({ i:messages, n:idToTitle, u:idToName, d:idToDate, t:idToTime, timestamp:timestamp })
	GM_setValue(DUMPDEST, dump);
}

function pagesCb(responseDetails) {
	var xmlDoc = document.createElement("div");
	xmlDoc.innerHTML = responseDetails.responseText;
	var rows = xmlDoc.querySelectorAll("tr.msglist");
	
	for(var r = 0; r < rows.length; ++r) {
		try {
			var as = rows[r].getElementsByTagName("td")[1].getElementsByTagName("a");
			var msgId = as[0].getAttribute("href").match(/\/([0-9]+)\/$/)[1];
			var title = as[0].firstChild.firstChild.data.trim();
			var userId = as[1].getAttribute("href").match(/:([0-9]+)\/$/)[1];
			var userName = as[1].firstChild.data.trim();
			
			var td2 = rows[r].getElementsByTagName("td")[2];
			var dateStr = td2.firstChild.data.trim();
			var timeStr = td2.querySelector("span").firstChild.data.trim();
			
			newMessage(msgId, title, userId, userName, dateStr, timeStr);
		} catch(e) {
			// ignore
		}
	}
	
	if(--pagesToGet <= 0) {
		safeDump();
		show();
	}
}

function reloadMessages() {
	purgeMessages();
	var pages = document.querySelectorAll("#messageslist a.pagenum");
	pagesToGet = pages.length;
	for(var i = 0; i < pages.length; ++i) {
		var page = pages[i].getAttribute("href");
		GM_xmlhttpRequest({
			"method": "GET",
			"url":    "http://" + window.location.host + pages[i].getAttribute("href"),
			"onload": pagesCb
		});
	}
}

function purgeFoundMessages() {
	var fm = document.createElement("tbody");
	foundMessages.parentNode.replaceChild(fm, foundMessages);
	foundMessages = fm;
}

function Line() {
	var tr = foundMessages.appendChild(document.createElement("tr"));
	tr.setAttribute("class", "msglist");
	
	var td = tr.appendChild(document.createElement("td"));
	td.setAttribute("width", "34");
	td.setAttribute("height", "32");
	td.style.verticalAlign = "middle";
	td.style.borderBottom = "1px solid #272727";
	td.style.borderLeft = "1px solid #272727";
	var div = td.appendChild(document.createElement("div"));
	div.setAttribute("align", "center");
	var img = div.appendChild(document.createElement("img"));
	
	var sender = tr.appendChild(document.createElement("td"));
	sender.setAttribute("width", "336");
	sender.style.borderBottom = "1px solid #272727";
	
	var dateTime = tr.appendChild(document.createElement("td"));
	dateTime.setAttribute("width", "130");
	dateTime.style.verticalAlign = "middle";
	dateTime.style.fontSize = "12px";
	dateTime.style.borderBottom = "1px solid #272727";
	
	var del = null;
	if(!IS_OUT) {
		del = tr.appendChild(document.createElement("td"));
		del.setAttribute("width", "30");
		del.style.verticalAlign = "middle";
		del.style.fontSize = "12px";
		del.style.borderBottom = "1px solid #272727";
		del.style.borderRight = "1px solid #272727";
	}
	
	this.setDestId = function(id) {
		tr.addEventListener("click", function() {
			window.location.href = "http://" + window.location.host + "/messages/read/" + id + "/";
		}, false);
	};
	
	this.setImg = function(src) {
		img.setAttribute("src", src);
	};
	
	this.setSender = function(msgId, msgTitle, senderId, senderName) {
		var sn = tr.appendChild(document.createElement("td"));
		sn.setAttribute("width", "336");
		sn.style.borderBottom = "1px solid #272727";
		
		sn.appendChild(document.createTextNode("\xA0"));
		var a = sn.appendChild(document.createElement("a"));
		a.setAttribute("href", "/messages/read/" + msgId + "/");
		a.appendChild(document.createElement("strong")).appendChild(document.createTextNode(msgTitle));
		sn.appendChild(document.createElement("br"));
		var span = sn.appendChild(document.createElement("span"));
		span.style.fontSize = "9px";
		span.style.color = "#999999";
		span.appendChild(document.createTextNode("\xA0" + FROM_TO + " "));
		a = span.appendChild(document.createElement("a"));
		a.setAttribute("href", "/profil/id:" + senderId + "/");
		a.style.textDecoration = "none";
		a.appendChild(document.createTextNode(senderName));
		
		sender.parentNode.replaceChild(sn, sender);
		sender = sn;
	};
	
	this.setDateTime = function(date, time) {
		var dt = tr.appendChild(document.createElement("td"));
		dt.setAttribute("width", "130");
		dt.style.verticalAlign = "middle";
		dt.style.fontSize = "12px";
		dt.style.borderBottom = "1px solid #272727";
		
		dt.appendChild(document.createTextNode(date));
		dt.appendChild(document.createElement("br"));
		var span = dt.appendChild(document.createElement("span"));
		span.style.fontSize = "9px";
		span.style.color = "#999999";
		span.appendChild(document.createTextNode(time));
		
		dateTime.parentNode.replaceChild(dt, dateTime);
		dateTime = dt;
	};
	
	if(IS_OUT) {
		this.setDelete = function() {};
	} else {
		this.setDelete = function(id) {
			var d = tr.appendChild(document.createElement("td"));
			d.setAttribute("width", "30");
			d.style.verticalAlign = "middle";
			d.style.fontSize = "12px";
			d.style.borderBottom = "1px solid #272727";
			d.style.borderRight = "1px solid #272727";
			
			var a = d.appendChild(document.createElement("a"));
			a.setAttribute("class", "trash");
			a.setAttribute("href", "/messages/delete/" + id + "/");
			var img = a.appendChild(document.createElement("img"));
			img.setAttribute("src", TRASH);
			img.setAttribute("border", "0");
			
			d.parentNode.replaceChild(d, del);
			dateTime = d;
		};
	}
}

function indicateLoading() {
	purgeFoundMessages();
	var line = new Line();
	line.setImg(THROBBER);
	line.setSender(0, LOADING, 0, "-");
}

function show() {
	var span = document.createElement("div");
	var ts = new Date();
	ts.setTime(timestamp);
	var text = INDEXED_AT.replace("%1%", ts).replace("%2%", messages.length);
	span.appendChild(document.createTextNode(text + " "));
	var a = span.appendChild(document.createElement("button"));
	a.appendChild(document.createTextNode(REINDEX));
	a.addEventListener("click", function(ev) {
		ev.preventDefault();
		indicateLoading();
		reloadMessages();
		return false;
	}, false);
	indexedStatus.parentNode.replaceChild(span, indexedStatus);
	indexedStatus = span;
	
	purgeFoundMessages();
	
	var sorting = ORDER_BY_FUNCTIONS[orderBy.value];
	if(descending.checked) {
		sorting = negateSorting(sorting);
	}
	
	// TODO: xxxToMsgs benutzen
	var filterName = mkStringFilter("u", idToName, userName, userNameCaseInsensitive, userNameRegex);
	var filterTitle = mkStringFilter("n", idToTitle, titleName, titleNameCaseInsensitive, titleNameRegex);
	function filter(msg) {
		return filterName(msg) && filterTitle(msg);
	}
	
	var messagesToShow = messages.filter(filter).sort(sorting);
	
	for(var i = 0; i < messagesToShow.length; ++i) {
		var msg = messagesToShow[i];
		var line = new Line();
		line.setDestId(msg.i);
		line.setImg(READ);
		line.setSender(msg.i, idToTitle[msg.n], msg.u, idToName[msg.u]);
		line.setDateTime(idToDate[msg.d], idToTime[msg.t]);
		line.setDelete(msg.i);
	}
}

function sortMessageId(left, right) {
	return parseInt(left.i) - parseInt(right.i);
}

function mkStringFilter(x, idToX, input, icase, regex) {
	var val = input.value.trim();
	if(val == "") {
		return function() { return true; };
	} else if(regex.checked) {
		// TODO;
	} else {
		if(icase.checked) {
			return (function(name) {
				return function(msg) {
					return idToX[msg[x]].toLowerCase() == name;
				};
			})(val.toLowerCase());
		} else {
			return (function(name) {
				return function(msg) {
					return idToX[msg[x]] == name;
				};
			})(val);
		}
	}
}

function sortUserName(left, right) {
	if(idToName[left.u] > idToName[right.u]) {
		return +1;
	} else if(idToName[left.u] < idToName[right.u]) {
		return -1;
	} else {
		return 0;
	}
}

function sortMsgTitle(left, right) {
	if(idToTitle[left.n] > idToTitle[right.n]) {
		return +1;
	} else if(idToTitle[left.n] < idToTitle[right.n]) {
		return -1;
	} else {
		return 0;
	}
}

function negateSorting(fun) {
	return function(left, right) {
		return fun(right, left);
	};
}

function init() {
	if(typeof(document.querySelector) !== "function") {
		Alert(BROWSER_TOO_OLD);
		return;
	}
	
	var messageslist = document.querySelector("#messageslist");
	var td = messageslist.appendChild(document.createElement("tr")).appendChild(document.createElement("td"));
	td.setAttribute("colspan", "4");
	td.appendChild(document.createElement("p"))
	td.appendChild(document.createElement("center")).appendChild(document.createElement("strong")).appendChild(document.createTextNode(MESSAGE_SEARCH + ":"));
	indexedStatus = td.appendChild(document.createElement("span"));
	var form = td.appendChild(document.createElement("form"));
	td.appendChild(document.createElement("p"))
	messageslist.appendChild(document.querySelector("#messageslist tr").cloneNode(true));
	foundMessages = messageslist.appendChild(document.createElement("tbody"));
	
	indicateLoading();
	
	form.appendChild(document.createTextNode(USER_NAME + ":\xA0"));
	userName = form.appendChild(document.createElement("input"));
	userName.setAttribute("type", "text");
	form.appendChild(document.createTextNode("\xA0 " + CASE_INSENSITIVE + ":\xA0"));
	userNameCaseInsensitive = form.appendChild(document.createElement("input"));
	userNameCaseInsensitive.setAttribute("type", "checkbox");
	userNameCaseInsensitive.setAttribute("checked", "checked");
	form.appendChild(document.createTextNode("\xA0 " + REGEX + ":\xA0"));
	userNameRegex = form.appendChild(document.createElement("input"));
	userNameRegex.setAttribute("type", "checkbox");
	userNameRegex.setAttribute("disabled", "disabled");
	
	form.appendChild(document.createElement("br"));
	form.appendChild(document.createTextNode(MSG_TITLE + ":\xA0"));
	titleName = form.appendChild(document.createElement("input"));
	titleName.setAttribute("type", "text");
	form.appendChild(document.createTextNode("\xA0 " + CASE_INSENSITIVE + ":\xA0"));
	titleNameCaseInsensitive = form.appendChild(document.createElement("input"));
	titleNameCaseInsensitive.setAttribute("type", "checkbox");
	titleNameCaseInsensitive.setAttribute("checked", "checked");
	form.appendChild(document.createTextNode("\xA0 " + REGEX + ":\xA0"));
	titleNameRegex = form.appendChild(document.createElement("input"));
	titleNameRegex.setAttribute("type", "checkbox");
	titleNameRegex.setAttribute("disabled", "disabled");
	
	form.appendChild(document.createElement("br"));
	form.appendChild(document.createTextNode(ORDER_BY + ":\xA0"));
	orderBy = form.appendChild(document.createElement("select"));
	for(var e in ORDER_BY_FUNCTIONS) {
		var option = orderBy.appendChild(document.createElement("option"));
		option.appendChild(document.createTextNode(e));
		option.setAttribute("value", e);
	}
	form.appendChild(document.createTextNode("\xA0 " + DESCENDING + ":\xA0"));
	descending = form.appendChild(document.createElement("input"));
	descending.setAttribute("type", "checkbox");
	descending.setAttribute("checked", "checked");
	
	form.appendChild(document.createElement("br"));
	var submit = form.appendChild(document.createElement("input"));
	submit.setAttribute("type", "submit");
	submit.setAttribute("value", SELECT);
	
	form.addEventListener("submit", function(ev) {
		ev.preventDefault();
		show();
		return false;
	}, false);
	
	var dump = GM_getValue(DUMPDEST, null);
	if(dump) {
		parseDump(dump);
		show();
	}  else {
		reloadMessages();
	}
}

Default();
for(var i = 0; i < L10N.length; ++i) {
	if(L10N[i][0].test(window.location.host)) {
		L10N[i][1].call(this);
		break;
	}
}

var ORDER_BY_FUNCTIONS = {};
ORDER_BY_FUNCTIONS[ORDER_BY_DATE] = sortMessageId;
ORDER_BY_FUNCTIONS[ORDER_BY_SENDER] = sortUserName;
ORDER_BY_FUNCTIONS[ORDER_BY_TITLE] = sortMsgTitle;

init();






// name          easy userscript updater snippet
// author        Thomas Duerr
// version       1.0.1
// date          2009-03-27

var userscriptUpdater = function(){
    var css = "div.greasemonkey_updater { font-size: 12px; background: #FFC; padding: 10px 15px; border-width: 1px 0; border-style: solid; border-color: #F90; margin: 0 0 30px; } " +
              "div.greasemonkey_updater h1 { font-size: 16px !important; margin: 0 0 5px 0; font-weight: bold; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide { float: right; text-align: right; width: 125px; font-size: 11px; font-weight: normal; } " +
              "div.greasemonkey_updater .greasemonkey_updater_link_to_hide a { color: #F00; } " +
              "div.greasemonkey_updater p { margin: 0 0 15px 0; font-size: 12px !important; line-height: 140%; color: #000; }";

    var config      = {
        checkInterval: 1*24*60*60,                                // default check interval: check once a day [in seconds]
        injectInto:    document.getElementsByTagName("body")[0],  // default dom-node for the updater-message to be inserted
        updaterCss:    css                                        // default styles of updater message
    };
    var lastCheck   = GM_getValue("lastCheck", 0);
    var lastVersion = GM_getValue("lastVersion", 0);
    var currentTime = Math.round(new Date().getTime()/1000);
    var meta        = {
        name:       /@name\s+(.*)[\r\n]/,
        version:    /@version\s+([.\d]+)(?:\s+.*)?[\r\n]/,
        change:     /@change\s+(.*)[\r\n]/,
        depricated: /@depricated\s+(.*)[\r\n]/
    };
    var updater;

    // check remote userscript for version
    var checkRemoteUserscript = function(){
        GM_xmlhttpRequest({
            method:  "GET",
            url:     "http://userscripts.org/scripts/source/" + config.scriptId + ".meta.js",
            headers: {"User-agent": "Mozilla/4.0 (compatible) Greasemonkey", "Accept": "text/plain"},
            onload:  function(resp) {
                GM_setValue("lastCheck", currentTime);
                for(m in meta){meta[m] = (meta[m].exec(resp.responseText) ? meta[m].exec(resp.responseText)[1] : null);}
                if(isNewer(meta.version, config.currentVersion) && isNewer(meta.version, lastVersion)) {
                    GM_addStyle(config.updaterCss);
                    updater = build();
                }
            }
        });
    };

    // compare versions based on versioning scheme: major.minor[.bugfix]
    var isNewer = function(o, p){
        /(\d+)\.(\d+)(?:\.(\d+))?\|(\d+)\.(\d+)(?:\.(\d+))?/.exec(o + "|" + p);
        with(RegExp){
            if(parseInt($4 || "0") < parseInt($1 || "0")) return true;
            if(parseInt($5 || "0") < parseInt($2 || "0")) return true;
            if(parseInt($6 || "0") < parseInt($3 || "0")) return true;
        }
        return false;
    };

    // skip current update until next
    var skipUpdate = function(ev){
        ev.preventDefault();
        GM_setValue("lastVersion", meta.version);
        config.injectInto.removeChild(updater);
    };

    // initialization
    var initialize = function(options){

        // merge options into config
        for(prop in options){if(options[prop]){config[prop] = options[prop];}}

        // already checked for an update today?
        if(currentTime > (lastCheck + config.checkInterval)){
            checkRemoteUserscript();
        }
    };

    // build updater message and inject it into DOM
    var build = function(){
        var updater = document.createElement("div");
            updater.className = "greasemonkey_updater";
        var hide = document.createElement("div");
            hide.className = "greasemonkey_updater_link_to_hide";
        if(meta.depricated == null){
            var a_hide = document.createElement("a");
                a_hide.href = "";
                a_hide.addEventListener("click", skipUpdate, false);
            var a_span = document.createElement("span");
                a_span.appendChild(document.createTextNode("Skip until next Update!"));
            a_hide.appendChild(a_span);
            hide.appendChild(a_hide);
        }
        var h1 = document.createElement("h1");
            h1.appendChild(hide);
            h1.appendChild(document.createTextNode(meta.depricated == null ? "Greasemonkey UserScript Update Notification!" : "Depricated Greasemonkey UserScript!"));
        updater.appendChild(h1);
        var p = document.createElement("p");
        if(meta.depricated == null){
            var text = "There is an update available for <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a>.<br>";
                text += meta.change ? "<br>" + meta.change + "<br><br>" : "";
                text += "You are currently running version <b>" + config.currentVersion + "</b>, the newest version on userscripts.org is <b>" + meta.version + "</b>!<br><a href=\"http://userscripts.org/scripts/source/" + config.scriptId + ".user.js\">Update to Version " + meta.version + "</a>";
        } else {
            var text = "The userscript <a href=\"http://userscripts.org/scripts/show/" + config.scriptId + "\">" + meta.name + "</a> is now depricated.<br>";
                text += meta.depricated && meta.depricated != "true" ? "<br>" + meta.depricated + "<br><br>" : "";
                text += "Please remove your script! Thanks for using it.";
        }
        p.innerHTML = text;
        updater.appendChild(p);
        var first = config.injectInto && config.injectInto.firstChild;
        (first ? config.injectInto.insertBefore(updater, first) : config.injectInto.appendChild(updater));
        return updater;
    };

    return { init: initialize };
}();

// initialize updater
userscriptUpdater.init({
    scriptId:       "77377", // insert id of your userscript from userscripts.org!
    currentVersion: scr_version
});

Because it's your web | Donate

Powered by overstimulate with the help of many friends

Policy & Guidelines: DMCA Privacy Policy
