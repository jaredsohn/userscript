// ==UserScript==
// @name           YouTube Comment Controller
// @namespace      #aVg
// @description    For now, blocks comments which are of lesser quality.
// @include        http://www.youtube.com/watch*
// @version        0.1
// ==/UserScript==
var block = /(?:\bgay|fagg?[io]?t|fuck|lol|penis|ass|balls\b)|(?:h[ea]){2,}/i, com = document.getElementById("recent_comments");
function loop(A, B) {
	A = document.evaluate(A, document, null, 6, null);
	for(var C = A.snapshotLength - 1; C >=0; --C) B(A.snapshotItem(C)); 
}
function remove(A) {if(A) A.parentNode.removeChild(A)}
function filter() {
	loop("//div[@class='watch-comment-body']/div", function(A) {
		if(block.test(A.textContent)) remove(A.parentNode.parentNode.parentNode);
	});
}
filter();
unsafeWindow.onWatchCommentsShowMore = function() {
	window.setTimeout(function() {
		GM_xmlhttpRequest({
			url : "http://www.youtube.com" + unsafeWindow.yt.www.comments.viewing.getCommentsPageUrl(unsafeWindow.pageVideoId, ++unsafeWindow.commentPageNum, -5, 0, 10),
			method : "GET",
			onload : function(A) {
				com.innerHTML += A.responseText.substring(67, A.responseText.length - 65);
				filter();
			}
		});
	}, 0);
};