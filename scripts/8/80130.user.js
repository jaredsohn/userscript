// ==UserScript==
// @name	         cc98 auto_url_relative
// @namespace	http://pascale.yo2.cn
// @description	automatically change absolute links to relative while do post/edit
// @include	http://www.cc98.org/dispbbs.asp?*
// @include	http://www.cc98.org/reannounce.asp?*
// @include http://www.cc98.org/announce.asp?*
// @include http://www.cc98.org/vote.asp?*
// @include http://www.cc98.org/editannounce.asp?*
// ==/UserScript==

function xpath(query)
{
	return document.evaluate(
			query,
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null).snapshotItem(0);
}

function ator(content){
	var regcc = new RegExp(/http:\/\/www\.cc98\.org\/(.+)/gm);
	content=content.replace(regcc , "[url]$1[/url]");
	var regip = new RegExp(/http:\/\/10\.10\.98\.98\/(.+)/gm);
	content=content.replace(regip , "[url]$1[/url]");
	return content;
}

function newsubmit(event) {
	var target = event ? event.target : this;
	if (/.*SaveReAnnounce.asp\?method=.*/.test(target.action) || /.*SaveditAnnounce.asp\?/.test(target.action)) {
		var textArea = xpath("//textarea[@id='content']")
		textArea.value = ator(textArea.value);
	}
	this._submit();
}

window.addEventListener('submit', newsubmit, true);

unsafeWindow.HTMLFormElement.prototype._submit = unsafeWindow.HTMLFormElement.prototype.submit;
unsafeWindow.HTMLFormElement.prototype.submit = newsubmit;

