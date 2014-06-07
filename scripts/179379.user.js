// ==UserScript==
// @name           S8Fixer
// @namespace      Bennett
// @include        http://*.storm8.com/*
// @version        1.2
// ==/UserScript==

document.body.style.background = 'black';
document.body.style.color = 'white';
document.body.style.overflowX = 'hidden';
var page = String(location).split('/')[3].split('.php')[0];

if (page == "home") {
	var arr = document.getElementsByClassName("messageBoxSuccess");
	for (i = 0; i < arr.length; i++) {
		if (arr[i].textContent.indexOf("More FREE Games:") != -1) {
			arr[i].style.display = 'none';
		}
		if (arr[i].textContent.indexOf("for FREE!") != -1) {
			arr[i].style.display = 'none';
		}
		if (arr[i].textContent.indexOf("NOW!") != -1) {
			arr[i].style.display = 'none';
		}
	}
}

try {
	document.getElementsByClassName('profileArea')[0].style.width = '320px';
	document.getElementsByClassName('topBar')[0].style.width = '100%';
	document.getElementsByClassName('topBarBg')[0].style.width = '100%';
	document.getElementById('cashTimerDiv').style.width = '100%';
} catch (e) {}

window.noConfirm = function(m, url) {
	document.location.href = url;
};

var fix = document.getElementsByClassName('actionButtonNew');
for (var i = 0; i < fix.length; i++) {
	fix[i].href = fix[i].href.replace('confirmDialog', 'noConfirm');
}

var menu = document.createElement('div');
menu.setAttribute("id", "navmenu");
menu.innerHTML = "[<a href=\"home.php\">Home</a>] [<a href=\"missions.php\">Missions</a>] [<a href=\"fight.php\">Fight</a>] [<a href=\"equipment.php\">Equipment</a>] [<a href=\"group.php\">Alliance</a>] [<a href=\"investment.php\">Income</a>] [<a href=\"bank.php\">Bank</a>] [<a href=\"hospital.php\">Hospital</a>] [<a href=\"profile.php\">Profile</a>]";
menu.style.padding = '10px';
document.body.insertBefore(menu, document.body.children[1]);

var urlvars = getUrlVars();

var tabs = document.getElementById('sectionTabs');
if (tabs) tabs = tabs.getElementsByTagName('a');
else tabs = [];
for (var i = 0; i < tabs.length; i++) {
	if (tabs[i].href.substr(0, 10) == 'javascript') {
		var t = getUrlVars(tabs[i].href.split('\'')[1]);
		tabs[i].href = decodeURIComponent(t['url']) + '?cat=' + t['cat']
		console.log(t);
	}
}
var sells = document.getElementsByClassName('equipmentSellAction');
var cat = urlvars['cat'];
for (var i = 0; i < sells.length; i++) {
	try {
		var l = sells[i].getElementsByTagName('a')[0];
		var h = sells[i].parentNode.getElementsByClassName('equipmentBuyAction')[0].getElementsByTagName('a')[0].href.replace('action=buy', 'action=sell');
		l.href = h;
	} catch (e) {}
}

function getUrlVars(href) {
	var str = href || window.location.href;
	var map = {};
	var parts = str.replace(/[?&]+([^=&#]+)=([^&#]*)/gi, function(m, key, value) {
		map[key] = value;
	});
	return map;
}

if (document.URL.indexOf("investment.php") > 0) {
	createSellLinkInvest();
}

function createSellLinkInvest() {
	var arLinks = document.links;
	var theh = "";
	var cat = "";
	for (var i = 0; i <= arLinks.length - 1; i++) {
		var elmLink = arLinks[i];


		if (elmLink.href.indexOf("ion=buy") > 0) {

			theh = elmLink.href.substring((elmLink.href.indexOf("&h=") + 3));
		}

		if (elmLink.href.indexOf("sellInvest") > 0) {

			var url = "",
				itemId = "",
				catId = "",
				itemName = "",
				itemNumber = "",
				nonce = "",
				sellText = "";
			var temp = elmLink.href.replace("javascript:sellInvestmentDialog('", "");
			temp = temp.replace(/,%20/g, ",");
			temp = temp.replace(/'/g, "");

			var values = temp.split(",");
			url = values[0];
			itemId = values[1];
			itemName = values[2];
			itemNumber = values[3];
			nonce = values[4];
			action = values[5];

			var urlJoiner = "&";
			if (url.indexOf('?') == -1 && url.indexOf('%3F') == -1) {
				urlJoiner = "?";
			}
			url = url + "?action=sell&inv_id=" + itemId + "&formNonce=" + nonce;
			elmLink.href = "" + url + "";
		}
	}
}