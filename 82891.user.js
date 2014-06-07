// ==UserScript==
// @name           Colorful Favstar.fm
// @namespace      http://moco.nond.es/
// @description    Change tweet color and font size by favourites count like Favotter.net.
// @version        0.1.1.20100804
// @include        http://favstar.fm/*
// @include        http://ja.favstar.fm/*
// @include        http://de.favstar.fm/*
// ==/UserScript==
(function () {
	var css = [
		'.theTweet {'
			,'font-size: 16px;'
			,'line-height: 1.4;'
			,'color: #333;'
		,'}'
		,'.theTweet a {'
			,'color: #1a75d2;'
		,'}'
		,'.cofav2 {'
			,'font-weight: bold;'
			,'color: #008e00;'
		,'}'
		,'.cofav3 {'
			,'font-size: 18px;'
			,'font-weight: bold;'
			,'color: #5f008f;'
		,'}'
		,'.cofav4 {'
			,'font-size: 18px;'
			,'font-weight: bold;'
			,'color: #5f008f;'
		,'}'
		,'.cofav5 {'
			,'font-size: 21px;'
			,'line-height: 1.3;'
			,'font-weight: bold;'
			,'color: #f40000;'
		,'}'
	].join('');

	var style = document.createElement('style');
		style.type = 'text/css';
		style.appendChild(document.createTextNode(css));
	document.getElementsByTagName('head')[0].appendChild(style);
	
	var favCounts = getElementsByClass('favouritesCount');
	for (var i = 0; i < favCounts.length; i++) {
		var fav = parseInt(favCounts[i].innerHTML, 10);
		var parent = favCounts[i].parentNode.parentNode;
		if (!isNaN(fav) && fav >= 1) {
			setColorfulClass(fav, parent);
		}
	}
	
	function setColorfulClass (favCount, node) {
		if (node.className !== 'tweetContainer') {return;}
		var tweet = getElementsByClass('theTweet', node, 'div');
		if (favCount <= 4) {
			tweet[0].className += ' cofav'+favCount;
		} else if (favCount >= 5) {
			tweet[0].className += ' cofav5';
		}
	}
	
	function getElementsByClass (searchClass, node, tag) {
		var classElements = [];
		if (!node) {node = document;}
		if (!tag) {tag = '*';}
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp('(^|\\s)'+searchClass+'(\\s|$)');
		for (var i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}
})();