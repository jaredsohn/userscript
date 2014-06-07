// ==UserScript==
// @name			Inbox ignore
// @description		Позволяет игнорировать выбранные инбоксы при подсчёте числа новых сообщений.
// @namespace		http://leprosorium.ru/users/ViSoR
// @include			http://leprosorium.ru/*
// @include			http://*.leprosorium.ru/*
// @version			0.3.1
// ==/UserScript==

var bannedInboxes;
var win;

initWin();
loadBannedInboxes();
updateInboxesPage();
getInboxesPage();

function initWin() {
	win = (typeof unsafeWindow != "undefined") ? unsafeWindow : window;
	document.domain = "leprosorium.ru";
	win.documentLoader = {};
	win.documentLoader.timeout = 0;
	win.documentLoader.loaded = false;
}

function getInboxesPage() {
	if (isCurrentPageInbox()) {
		var html = document.body.innerHTML;
		updateNewCommentsCount(html);
		return;
	}

	if (!document.getElementsByName("ifr").length) {
		var ifr = document.createElement("iframe");
		ifr.setAttribute("name", "ifr");
		ifr.src = "http://leprosorium.ru/my/inbox/";
		ifr.style.display="none";
		document.body.appendChild(ifr);
	}

	clearInterval(win.documentLoader.timeout);
	if (win.documentLoader.loaded) {
		return;
	}
	else {
		win.documentLoader.retries = 20;
		var parser = parseInboxes;
		win.documentLoader.timeout = setInterval(parser, 300);
	}
}

function parseInboxes() {
	var frame = document.getElementsByName("ifr");
	if (frame && frame[0] && frame[0].contentDocument
			&& frame[0].contentDocument.getElementById("cellar")) {
		clearInterval(win.documentLoader.timeout);
		var html = frame[0].contentDocument.body.innerHTML;
		updateNewCommentsCount(html);

		win.documentLoader.loaded = true;
		clearInterval(win.documentLoader.timeout);
	}
	if(win.documentLoader.retries-- <= 0) {
		clearInterval(win.documentLoader.timeout);
	}
}

function updateNewCommentsCount(html) {
	var updatedInboxes = parseInboxesPage(html);
	var newComments = calculateNewComents(updatedInboxes);
	updateComments(newComments);
}

function isCurrentPageInbox() {
	var location = window.location.href.split(window.location.host)[1];
	return location == "/my/inbox" || location == "/my/inbox/";
}

function updateInboxesPage() {
	if (!isCurrentPageInbox()) {
		return;
	}

	var inboxes = document.getElementsByClassName("post");
	for (var i = 0; i < inboxes.length; i++)
	{
		var inboxId = getInboxId(inboxes[i]);
		var ban = getBanned(inboxId);
		addBanControls(inboxes[i], ban);
	}
}

function loadBannedInboxes() {
	bannedInboxes = [];

	if (document.cookie.length != 0) {
		var cookieName = "bannedInboxesList=";
		var start = document.cookie.indexOf(cookieName);
		if (start != -1) {
			start = start + cookieName.length;
			end = document.cookie.indexOf(";", start);

			if (end == -1) {
				end = document.cookie.length;
			}

			var bannedString = unescape(document.cookie.substring(start, end));
			if (bannedString) {
				bannedInboxes = bannedString.split(",");
			}
		}
	}
}

function saveBannedInboxes() {
	var bannedString = bannedInboxes.join(",");
	var expDate = new Date();
	expDate.setDate(expDate.getDate() + 10*365);
	var cookieText = "bannedInboxesList=" + escape(bannedString) + ";expires=" + expDate.toUTCString() + ";path=/;domain=leprosorium.ru";
	document.cookie = cookieText;
}

function parseInboxesPage(html) {
	var matches = html.match(/<a href="\/my\/inbox\/(\d+)#new"><strong>(\d+)/g);
	var updatedInboxes = [];

	if (!matches) {
		return updatedInboxes;
	}

	for (var i = 0; i < matches.length; i++) {
		var inboxInfo = {};
		var m = matches[i].match(/(\d+)#new"><strong>(\d+)/);

		inboxInfo.number = m[1];
		inboxInfo.newComments = m[2];
		updatedInboxes.push(inboxInfo);
	}

	return updatedInboxes;
}

function calculateNewComents(updatedInboxes) {
	var newComments = 0;

	for (var i = 0; i < updatedInboxes.length; i++) {
		var found = false;
		var inboxInfo = updatedInboxes[i];

		for (var j = 0; j < bannedInboxes.length; j++) {
			var bannedInbox = bannedInboxes[j];

			if (bannedInbox == inboxInfo.number) {
				found = true;
				break;
			}
		}
		
		if (!found) {
			newComments += parseInt(inboxInfo.newComments, 10);
		}
	}

	return newComments;
}

function updateComments(newComments) {
	var originalValue = getOriginalNewComments();

	if (!originalValue) {
		return;
	}

	var newValue = "";
	var parts = originalValue.split("/");

	if (parts.length == 2) {
		newValue = parts[0] + "/" + newComments;
	}
	else {
		newValue = newComments == 0 ? "&nbsp;" : newComments;
	}

	if (newValue == "&nbsp;") {
		document.getElementById("inbox").childNodes[0].innerHTML = newValue;
	}
	else {
		document.getElementById("inbox").childNodes[0].innerHTML = "<span><em>" + newValue + "</em></span>";
	}
}

function getOriginalNewComments() {
	var inboxNode = document.getElementById("inbox");
	var originalValue = inboxNode.childNodes[0].innerHTML;

	var m = originalValue.match(/[0-9\/]+/);
	if (!m) {
		return;
	}

	return m[0];
}

function addBanControls(inbox, ban) {
	var controls = inbox.getElementsByClassName("p")[0];
	var inboxId = getInboxId(inbox);
	var spanId = "span_ban" + inboxId;
	var banLinkId = "ban" + inboxId;

	var banSpan = document.getElementById(spanId);
	if (banSpan) {
		banSpan.parentNode.removeChild(banSpan);
	}

	var spanElement = document.createElement("span");
	var banLink;
	spanElement.id = spanId;

	if (!ban) {
		spanElement.innerHTML = '| [<a id="' + banLinkId + '" href="#" onclick="return false;" title="Видеть этот инбокс не могу">O</a>]';
		controls.appendChild(spanElement);
		banLink = document.getElementById("ban" + inboxId);
		banLink.addEventListener("click", function(event) {addToBanned(inboxId); return false; }, false);
	}
	else {
		spanElement.innerHTML = '| [<a id="' + banLinkId + '" href="#" onclick="return false;" title="Мне всё же интересно, что там происходит" style="color:#C33;">Ø</a>]';
		controls.appendChild(spanElement);
		banLink = document.getElementById("ban" + inboxId);
		banLink.addEventListener("click", function(event) {removeFromBanned(inboxId); return false; }, false);
	}
}

function addToBanned(inboxId) {
	removeFromList(inboxId);
	bannedInboxes.push(inboxId);
	saveBannedInboxes();

	updateBanControls(inboxId, true);
}

function removeFromBanned(inboxId) {
	removeFromList(inboxId);
	saveBannedInboxes();

	updateBanControls(inboxId, false);
}

function updateBanControls(inboxId, ban) {
	var inbox = getInbox(inboxId);
	addBanControls(inbox, ban);

	var html = document.body.innerHTML;
	updateNewCommentsCount(html);
}

function getInboxId(inbox) {
	var id = inbox.id;
	id = id.match(/\d+/)[0];

	return id;
}

function getInbox(inboxId) {
	return document.getElementById("p" + inboxId);
}

function getBanned(inboxId) {
	for (var i = 0; i < bannedInboxes.length; i++) {
		if (bannedInboxes[i] == inboxId) {
			return true;
		}
	}

	return false;
}

function removeFromList(inboxId) {
	var newList = [];

	for (var i = 0; i < bannedInboxes.length; i++) {
		if (bannedInboxes[i] != inboxId) {
			newList.push(bannedInboxes[i]);
		}
	}

	bannedInboxes = newList;
}