// ==UserScript==
// @name           		Last.fm Mutual Groups
// @namespace      		http://lunrfarsde.blogspot.com
// @description         	Lists all the groups of the user instead of first five and highlights the ones which you are both in
// @include        		http://www.lastfm.com.*/user/*
// @include			http://www.last.fm/user/*
// ==/UserScript==

(function() {
var user = document.location.pathname.split("/")[2];

var localUser = "";
if (t = document.getElementById("idBadgerUser")) {
	href = t.getAttribute("href");
	localUser = href.substring(href.indexOf("/", 1) + 1);
}

function isFirstLocalGroupPage() {
	if (user != localUser) return false;

	if (document.location.pathname.split("/")[3] == "groups") {
		searchArray = document.location.search.substr(1).split("&");
		for (i=0; i < searchArray.length; i++)
			if (searchArray[i].split("=")[0] == "groupspage" &&  searchArray[i].split("=")[1] != "1")
				return false; 
		return true;
	}
	return false;
}

var counter = 0;

function purgeRegister() {
	i = counter;
	while (GM_getValue(localUser + "." + i, "") != "") {
		GM_setValue(localUser + "." + i, "");
		i++;
	}	 
}

function getGroups(user, pageNumber, totalPages, f, purge, modifyPage) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://' + document.location.host + '/user/' + user + '/groups?groupspage=' + pageNumber,
		onload: function(responseDetails) {	
			while (matchHref = /<strong><a href="\/group\/(.*?)">/gm.exec(responseDetails.responseText)) {
				matchMemberCount = /<p class="members">(.+?)<\/p>/gm.exec(responseDetails.responseText);
				matchName = /<img class="groupImage .* src="(\S+?)" \/> (.+?)<\/a>/gm.exec(responseDetails.responseText);
				f(matchHref[1], matchName[2], matchName[1], matchMemberCount[1]);
			}
			if (modifyPage) groupsBox.innerHTML = pageNumber == 1 ? strHTML : groupsBox.innerHTML + strHTML;
			strHTML = '';
	
			if (pageNumber < totalPages) getGroups(user, pageNumber + 1, totalPages, f, purge, modifyPage)
			else if (purge) purgeRegister()
			else if (modifyPage) groupsBox.parentNode.childNodes[1].removeChild(throbber);
		}
	});
}

if (isFirstLocalGroupPage()) {
	f = function (href) {
		GM_setValue(localUser + "." + counter, href);
		counter++;
	}
			
	groups = document.evaluate("//div[@class='groupContainer']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i=0; i<groups.snapshotLength; i++) {
		href = groups.snapshotItem(i).childNodes[1].firstChild.getAttribute("href");
		
		f(href.substring(href.lastIndexOf("/") + 1));
	}

	heading = document.evaluate("//span[@class='h2Wrapper']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	noPages = Math.ceil(/\b(\d+)\b/.exec(heading.innerHTML)[1] / 20);
	
	if (noPages > 1) getGroups(localUser, 2, noPages, f, true, false)
	else purgeRegister();
		
	GM_setValue(localUser, 1);
	return;
}

if (localUser == user) return;

var strHTML = '';
var groupsBox = document.evaluate("//ul[@class='groupsSmall']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
if (!groupsBox) return;
noGroups = /\((\d+)\)/.exec(groupsBox.parentNode.childNodes[1].firstChild.firstChild.innerHTML)[1];
noPages = Math.ceil(noGroups / 20);

var throbber = document.createElement("img");
throbber.setAttribute("id", "MG.throbber");
throbber.src = "data:image/gif,GIF89a%10%00%10%00%E3%08%00%00%00%00%1A%1A%1A333LLLfff%80%80%80%99%99%99%B2%B2%B2%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF%FF!%FF%0BNETSCAPE2.0%03%01%00%00%00!%F9%04%01%0A%00%08%00%2C%00%00%00%00%10%00%10%00%00%04H%10%C9%89%00%A0%98Z%9Bg%08%D5%86%1C%07%F6%7D%E1H%96%DEI%ADl%9B%91%94%20t%93a%20%B6%8D%EB%BA%DE%AD%03%DC%F9p%08%1De0%C8%14%0A%18%26%93%F2%7C.%A5%08%02%01Q%85%5E%B3%DA%AD%15%17%DE%22'%DAN%04%00!%F9%04%01%0A%00%0F%00%2C%00%00%00%00%10%00%10%00%00%04H%F0%C9%F9B%A0%98Z%9B%A7%10%D5%F6%00%00%F6%7D%E1H%96%DEI%ADl%9B%91%D40t%D3q%3C%B6%8D%EB%BA%DE%AD%03%DC%F9p%0F%1D%85%40%C8%18%0C%18%26%93%F2%7C.%A5%8FB%E1Q%85%5E%B3%DA%AD%15%17%DE%22'%DAN%04%00!%F9%04%01%0A%00%0F%00%2C%00%00%00%00%10%00%10%00%00%04H%F0%C9%F9%84%A0%98Z%9B%E7%18%D5%F6%04%01%F6%7D%E1H%96%DEI%ADl%9B%91%14At%13%00%3C%B6%8D%EB%BA%DE%AD%03%DC%F9p%0F%1D%A5P%C8%1C%0E%18%26%93%F2%7C.%A5%0F%83%E1Q%85%5E%B3%DA%AD%15%17%DE%22'%DAN%04%00!%F9%04%01%0A%00%0F%00%2C%00%00%00%00%10%00%10%00%00%04H%F0%C9%F9%C6%A0%98Z%9B'!%D5%F6%08%02%F6%7D%E1H%96%DEI%ADl%9B%91TQtS%10%3C%B6%8D%EB%BA%DE%AD%03%DC%F9p%0F%1D%C5%60%C8%00%00%18%26%93%F2%7C.%A5%8F%C3%E1Q%85%5E%B3%DA%AD%15%17%DE%22'%DAN%04%00!%F9%04%01%0A%00%0F%00%2C%00%00%00%00%10%00%10%00%00%04H%F0%C9%F9%08%A1%98Z%9Bg)%D5%F6%0C%03%F6%7D%E1H%96%DEI%ADl%9B%91%94at%93%20%3C%B6%8D%EB%BA%DE%AD%03%DC%F9p%0F%1D%E5p%C8%04%02%18%26%93%F2%7C.%A5%0F%00%E0Q%85%5E%B3%DA%AD%15%17%DE%22'%DAN%04%00!%F9%04%01%0A%00%0F%00%2C%00%00%00%00%10%00%10%00%00%04H%F0%C9%F9J%A1%98Z%9B%A71%D5%F6%10%04%F6%7D%E1H%96%DEI%ADl%9B%91%D4qt%D30%3C%B6%8D%EB%BA%DE%AD%03%DC%F9p%0F%1D%05%00%C8%08%04%18%26%93%F2%7C.%A5%8F%40%E0Q%85%5E%B3%DA%AD%15%17%DE%22'%DAN%04%00!%F9%04%01%0A%00%0F%00%2C%00%00%00%00%10%00%10%00%00%04H%F0%C9%F9%8C%A1%98Z%9B%E79%D5%F6%14%05%F6%7D%E1H%96%DEI%ADl%9B%91%14%00t%13A%3C%B6%8D%EB%BA%DE%AD%03%DC%F9p%0F%1D%25%10%C8%0C%06%18%26%93%F2%7C.%A5%0F%81%E0Q%85%5E%B3%DA%AD%15%17%DE%22'%DAN%04%00!%F9%04%01%0A%00%0F%00%2C%00%00%00%00%10%00%10%00%00%04H%F0%C9%F9%CE%A1%98Z%9B'%00%D5%F6%18%06%F6%7D%E1H%96%DEI%ADl%9B%91T%10tSQ%3C%B6%8D%EB%BA%DE%AD%03%DC%F9p%0F%1DE%20%C8%10%08%18%26%93%F2%7C.%A5%8F%C1%E0Q%85%5E%B3%DA%AD%15%17%DE%22'%DAN%04%00%3B"
groupsBox.parentNode.childNodes[1].insertBefore(throbber, groupsBox.parentNode.childNodes[1].firstChild);

if (localUser) {
	if (GM_getValue(localUser, 0) == 0) {
		f = function (groupName) {
			GM_setValue(localUser + "." + counter, groupName);
			counter++;
		}			
		getGroups(localUser, 1, noPages, f, false, false);
		GM_setValue(localUser, 1);
	}
	
	f = function (href, name, src, info) {
		i = 0;
		while (g = GM_getValue(localUser + "." + i)) {
			if (g == href) {
				name = '<span style="color:red">' + name + '</span>';
				break;
			}
			i++;
		}
		
		strHTML += '<li class="clearit"><a href="/group/' + href
			+ '"><strong><span class="groupImg"><img class="groupImage imagesmallsquare" height="34" width="34" src="' 
			+ src + '"></span>' + name + '</strong><span class="info">' + info + '</span></a></li>';
	}
			
	getGroups(user, 1, noPages, f, false, true);
}
else {
	f = function (href, name, src, info) {
		strHTML += '<li class="clearit"><a href="/group/' + href
			+ '"><strong><span class="groupImg"><img class="groupImage imagesmallsquare" height="34" width="34" src="' 
			+ src + '"></span>' + name + '</strong><span class="info">' + info + '</span></a></li>';
	}
	
	getGroups(user, 1, noPages, f, false, true);
}
})();