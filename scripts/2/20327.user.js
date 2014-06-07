// ==UserScript==
// @name DZone - MsWatcher link flood ignorer
// @date Tue Jan 15 2008 20:21:04 GMT+0100
// @include http://www.dzone.com/links/queue.html
// @include http://www.dzone.com/links/
// ==/UserScript==

(function () {

function xpath(query,closure){ // xpath can be that easy?
	list = document.evaluate( // no, im not a simple array, im special
    query, 
    document,
    null,// null is cool
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, //i should check out other options, but i dont care
    null); // null is cool
	for (var i = 0; i < list.snapshotLength; i++) { // who wrote that API ? shoot him!
		closure(list.snapshotItem(i),i); // that makes retarded sence
	}
}
function hide(whom){ // i hide stuff and im not complicated
	whom.style.display = "none";
}



function clean(){
	query = "id('content-inner')/div/div[4]/p[2]/a[substring-after(text(),'mswatche')!='']"; // without r, because he doesnt deserve that r
	xpath(query,function(authorLink){
		evilPost = authorLink.parentNode.parentNode.parentNode; // i hope they wont change that
		hide(evilPost); // GO TO HELL!!
	});
}

cleanRunnable = function(){
	clean(); // see no evil
	starter(); // restart timer, hie hie hie
}

starter = function(){
	setTimeout(cleanRunnable,5*1000); // you can adjust cleaning time, 5 seconds
}

cleanRunnable(); // bye bye msWatcher


})();
