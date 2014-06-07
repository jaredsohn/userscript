// ==UserScript==
// @name           Experts Exchange Answer Fetcher
// @namespace      hunsley@gmail.com
// @description    Replaces experts exchange comments advertising a free trial of the site with the actual comments
// @include        http://www.experts-exchange.com/*.html
// ==/UserScript==

fakeAnswerNodes = document.evaluate('.//div[@class="answers"]//div[contains(@class,"answer") and contains(@class,"Header blurredAnswer") and contains(@id,"answerSection")]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

var numFakeAnswers = fakeAnswerNodes.snapshotLength;
if (numFakeAnswers > 0) {
	url = document.location.toString();
	GM_xmlhttpRequest({
		method:'GET',
		url:url,
		headers: {'User-Agent': 'Googlebot/2.1 (+http://www.googlebot.com/bot.html)'},
		onload:findReplaceAnswers
	});
}

function findReplaceAnswers (response) {
	var holder = document.createElement('html');
	holder.innerHTML = response.responseText;
	var realAnswerNodes = document.evaluate('.//div[@class="bc"]/div[@class="answers"]//div[contains(@class,"sectionTwo answer ") and contains(@class,"Header")]',holder,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);

	for (var i=0;i<fakeAnswerNodes.snapshotLength;i++) {
		fakeNode = fakeAnswerNodes.snapshotItem(i);
		realNode = realAnswerNodes.snapshotItem(i);
		fakeNode.parentNode.replaceChild(realNode,fakeNode);
	}
}	