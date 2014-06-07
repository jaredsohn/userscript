// ==UserScript==
// @name           hatenaquestionCategorizer
// @namespace      http://d.hatena.ne.jp/so_blue/
// @description    人力検索はてなのtwitter-bot【hartenaquestion】のtweetを「人力検索」「アンケート」「いわし」に分類します。
// @author         so_blue
// @version        0.1
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function() {

	GM_addStyle(<><![CDATA[
		span.question_status {
			display: inline-block;
			-moz-border-radius: 3px;
			padding: 2px;
			color: #fff;
		}
	]]></>);

	var xpath = '//li[contains(@class, "u-hatenaquestion")]//span[@class="entry-content"]/a[starts-with(@href, "http://q.hatena.ne.jp") and not(@lang="ja")]';

	var span = document.createElement('span');
	//span.style.fontWeight = 'bold';

	function getAnchors(doc) {
		var tweets = document.evaluate(xpath, doc, null, 7, null);
		if (!tweets) return;
		for (var i = 0, len = tweets.snapshotLength; i < len; i++) {
			var q = tweets.snapshotItem(i);
			q.lang = 'ja';
			GM_xmlhttpRequest({
				method: 'GET',
				url: q.href,
				onload: categorize(q)
			});
		}
	}

	function categorize(node) {
		return function(res) {
			var div = document.createElement('div');
			div.innerHTML = res.responseText;
			var img = document.evaluate('.//h1//img[@class="by"]', div, null, 9, null).singleNodeValue;
			if (!img) return;
			var s = img.src.split('-')[1].substring(0, 1);
			var wrapper = span.cloneNode(true);
			var elm = span.cloneNode(true);
			elm.className = 'question_status';
			wrapper.appendChild(elm);
			var q_stat = document.evaluate('.//div[@class="question-information"]//li[2]', div, null, 9, null).singleNodeValue
			if (/終了/.test(q_stat.textContent)) {
				elm.style.color = '#000';
			}
			switch (s) {
			case 'j':
				elm.style.backgroundColor = '#32CD32';
				elm.textContent = '人';
				var s = document.evaluate('.//div[@class="question-information"]//li[4]', div, null, 9, null).singleNodeValue.textContent;
				s = s.replace('回答ポイント：', '').replace('ポイント', 'pt');
				break;
			case 'e':
				elm.style.backgroundColor = '#ffa500';
				elm.textContent = 'ア';
				var s = document.evaluate('.//div[@class="question-information"]//li[3]', div, null, 9, null).singleNodeValue.textContent;
				s = s.replace('回答数：', '');
				break;
			default:
				elm.style.backgroundColor = '#4682B4';
				elm.textContent = 'い';
				var s = document.evaluate('.//div[@class="iwashi-header-top"]//span[@class="iwashi-status"]', div, null, 9, null).singleNodeValue.textContent;
				s = s.replace(' pt', 'pt');
				break;
			}
			var pt = span.cloneNode(true);
			pt.textContent = ' ' + s;
			wrapper.appendChild(pt);
			node.parentNode.insertBefore(wrapper, node.nextSibling);
			elm = pt = null;
		}
	}

	/*
	AutoPagerize対応
	via http://d.hatena.ne.jp/blooo/20091012/1255323254
	*/
	document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(evt) {
		var doc = evt.target;
		getAnchors(doc);
	}, false);

	getAnchors(document);

})();