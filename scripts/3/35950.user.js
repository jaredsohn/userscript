// ==UserScript==
// @name		ShowStatusSequence
// @namespace	http://www.madin.jp/diary/?date=20081023 
// @description	個別 post のページを開いたとき、それを含むユーザページに移動し、文脈を把握できるようにする
// @include		http://twitter.com/*
// @include		https://twitter.com/*
// @include		http://explore.twitter.com/* 
// ==/UserScript==

/**
	author: Maripo GODA
	version: 0.0.4
	detail: http://www.madin.jp/diary/?date=20081023#p01

    20081022    公開
    20081023    /status/ と /statuses/ の両方に対応
    20081024    /status/ と /statuses/ の両方に対応
                自動ジャンプ/手動ジャンプ、自動検索/手動検索をそれぞれ切り替え可能に
                explore.twitter.com に対応
    20081025    160ページ以降 (Twitter の表示制限) の処理
	20090615	Max Integer 問題解消

*/
const JUMP_AUTOMATICALLY = true; //false にすると、自動でジャンプする代わりに当該ページへのリンクを表示する
const START_BY_BUTTON_EVENT = true; //true にするとボタンを押して検索開始、false にするとアクセス次第検索開始

const TWITTER_PAGE_INDEX_LIMIT = 160; //160ページまでしか存在しない

var ShowStatusSequence = {
};
ShowStatusSequence.search = function (pageNum) {
	var http = new XMLHttpRequest();
	http.open('GET', ShowStatusSequence.baseUrl + '?page=' + pageNum, true);
	ShowStatusSequence.messageArea.showMessage ('Searching in page ' + pageNum);
	http.onreadystatechange = function () {
		if (http.readyState != 4) return;
        else if (http.status == 200) {
			try {
				linkList = getElementsByXPath('//a[@class="entry-date"]', createHTMLDocumentByString(http.responseText));
				if (linkList.length == 0) ShowStatusSequence.search(ShowStatusSequence.getNextPageNum(pageNum, false));
				else {
					var pageRegExp = new RegExp('[0-9]+$');
					var maxId = parseInt(linkList[0].href.match(pageRegExp), 10);
					var minId = parseInt(linkList[linkList.length - 1].href.match(pageRegExp), 10);
					if (maxId >= ShowStatusSequence.targetId && ShowStatusSequence.targetId >= minId) {
						 GM_setValue('ShowStatusSequence_targetId', String(ShowStatusSequence.targetId)); 
						if (JUMP_AUTOMATICALLY) {
							location.href = ShowStatusSequence.baseUrl + '?page=' + pageNum;
							ShowStatusSequence.messageArea.showMessage ('Moving...');
						} else {
							ShowStatusSequence.messageArea.showMessage ('<a href="' + ShowStatusSequence.baseUrl + '?page=' + pageNum + '" target="blank">[link]</a>');
						}
					}
					else if (maxId < ShowStatusSequence.targetId) ShowStatusSequence.search(ShowStatusSequence.getNextPageNum(pageNum, false));
					else if (minId > ShowStatusSequence.targetId) {
						if (pageNum == TWITTER_PAGE_INDEX_LIMIT) {
							ShowStatusSequence.messageArea.showMessage ('Too old.');
							return;
						}
						else ShowStatusSequence.search(ShowStatusSequence.getNextPageNum(pageNum, true));
					}
				}
			} catch (ex) {ShowStatusSequence.printError (ex)}
		} else ShowStatusSequence.messageArea.showMessage ('HTTP error ' + http.status);
	}
	http.send(null);
};

ShowStatusSequence.emphasizeNode = function (node) {
	// change color
	node.style.backgroundColor = '#ffff88';
	// scroll
	var height = node.clientHeight;
	var offset = 0;
	var tmpNode = node;
	while (document.body != tmpNode) {
		offset += tmpNode.offsetTop;
		tmpNode = tmpNode.offsetParent;
	}
	var centerY = offset + node.offsetHeight/2;
	if (window.innerHeight/2 < centerY) {
		window.scroll (0, centerY - window.innerHeight/2);
	}
};

ShowStatusSequence.printError = function (message) {
	ShowStatusSequence.messageArea.showMessage (message);
};
ShowStatusSequence.getSearchStartAction = function () {
	return function () {
		ShowStatusSequence.messageArea.style.display = 'block';
		ShowStatusSequence.search(1);
	};
};

ShowStatusSequence.appendMessageArea = function () {
	ShowStatusSequence.messageArea = document.createElement('DIV');
	with (ShowStatusSequence.messageArea.style) {
		backgroundColor ='white';
		MozOpacity = 0.8;
		position = 'absolute';
		left = '3px';
		top = '3px';
		zIndex = 2;
		padding = '10px';
		border = '1px solid gray';
		display = 'none';
	}
	ShowStatusSequence.messageArea.showMessage = function (message) {
		ShowStatusSequence.messageArea.innerHTML = message;
	};
	document.body.appendChild(ShowStatusSequence.messageArea);
};

ShowStatusSequence.getNextPageNum = function (number, searchForward) {
	var nextPageNum = (function () {
		// Calculate search limit
		var maxCoff = 0;
		while (true) {
			var max = Math.pow(2, maxCoff);
			if (max == number && searchForward) return max * 2;
			else if (max >= number) break;
			maxCoff ++;
		}
		var current = Math.pow(2, maxCoff);
		var spanCoff = maxCoff - 1;
		// Binary search
		while (true) {
			spanCoff --;
			if (spanCoff < 0) throw 'Something is going wrong...';
			var span = Math.pow(2, spanCoff);
			if (current == number) return (searchForward)? current + span : current - span;
			else if (current < number) {
				current += span;
			}
			else if (current > number) {
				current -= span;
			}
		}
	})();
	if (TWITTER_PAGE_INDEX_LIMIT >= nextPageNum) return nextPageNum;
	else return ShowStatusSequence.getNextPageNum(nextPageNum,false);
};

(function () {
	// Fetch user's pages
	if (new RegExp('^https?://(?:explore\\.)?twitter\\.com/[0-9a-zA-Z_]+/status(|es)/[0-9]+$').test(location.href)) {
		ShowStatusSequence.appendMessageArea();
		ShowStatusSequence.targetId = parseInt(location.href.match('[0-9]+$'), 10);
		ShowStatusSequence.baseUrl = location.href.replace(new RegExp('/status(|es)/.*'), '');
		var currentPage = 1;
		if (START_BY_BUTTON_EVENT) {
			var startButton = document.createElement('INPUT');
			startButton.value = 'Search';
			startButton.type = 'button';
			startButton.style.marginLeft = '10px';
			startButton.style.fontSize = 'large';
			startButton.style.fontWeight = 'normal';
			var element = getElementsByXPath('//div[@class="full-name"]', document.body)[0] || getElementsByXPath('//div[@class="screen-name"]', document.body)[0] || getElementsByXPath('//a[@class="tweet-url screen-name"]/..',document.body)[0];
			element.appendChild(startButton);
			startButton.addEventListener('click', ShowStatusSequence.getSearchStartAction(), true);
		}
		else (ShowStatusSequence.getSearchStartAction())();
	}
	else if (new RegExp('^https?://(?:explore\\.)?twitter\\.com/[0-9a-zA-Z_]+\\?page=[0-9]+$').test(location.href)) {
		// Find target post and emphasize it
		try {
			var targetId = GM_getValue('ShowStatusSequence_targetId');
			if (!targetId) return;
			linkList = getElementsByXPath('//a[@class="entry-date"]', document.body);
			for (var i = 0, l = linkList.length; i < l; i ++) {
				if (targetId == linkList[i].href.match('[0-9]+$')) {
					var node = linkList[i];
					while ('undefined' != typeof node) {
						if ('LI' == node.nodeName.toUpperCase()) {
							ShowStatusSequence.emphasizeNode (node);
							return;
						}
						node = node.parentNode;
					}
				}
			}
		} catch (ex) {alert(ex);}
	}
})();

function createHTMLDocumentByString (str) {
	var html = str.replace(/^[\s\S]*?<html(?:[ \t\r\n][^>]*)?>[ \t\n\r]*|[ \t\r\n]*<\/html[ \t\r\n]*>[\S\s]*$/ig, ''); 
	var htmlDoc = document.implementation.createDocument(null, 'html', null);
	var fragment = createDocumentFragmentByString(html);
	try {
		fragment = htmlDoc.adoptNode(fragment);
	} catch (e) {
		fragment = htmlDoc.importNode(fragment, true);
	}
	htmlDoc.documentElement.appendChild(fragment);
	return htmlDoc;
}

function createDocumentFragmentByString (str) {
	var range = document.createRange();
	range.setStartAfter(document.body);
	return range.createContextualFragment(str);
}

function getElementsByXPath (xpath, node) {
	var node = node || document;
	var doc = node.ownerDocument ? node.ownerDocument : node;
	var nodesSnapshot = doc.evaluate(xpath, node, null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var data = [];
	for (var i = 0, l = nodesSnapshot.snapshotLength; i < l; i ++) {
		data.push(nodesSnapshot.snapshotItem(i));
	}
	return data;
}
