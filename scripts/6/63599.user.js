// ==UserScript==
// @name           AskReddit AutoDownvote
// @namespace      yopla
// @description    Auto downvote and report link in AskReddit
// @include        http://www.reddit.com/r/AskReddit/
// @include        http://www.reddit.com/r/AskReddit/new/
// @version        0.6
// ==/UserScript==

// auto downvote link
try {
console.log("AskReddit autodownvote running");
$ = unsafeWindow.$;
$('div.link:has(div.unvoted:has(a.title[href*="http://"]))').each(
    function(i,o){
		setTimeout(function(){
			console.log("getting rid of:" + $('a.title',o).text())
			// * downvote
			$('div.down', o).click();
			// * report
			$('a:contains("report")', o).click();
			$('a.yes', o).click();
			}, i*500);
	}
);
// auto hide link
$('div.link:has(a.title[href*="http://"])').hide();

} catch (ex) { console.log("askreddit_autodownvote error", ex) }