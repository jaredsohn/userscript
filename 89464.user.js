// ==UserScript==
// @name          Google Trackerless
// @description   Fix google.
// @include       http://www.google.*
// @include       https://encrypted.google.*
// @exclude       http://www.google.com/books*
// @exclude       https://www.google.com/voice*
// @version       1.6
// ==/UserScript==

// remove the click tracking
notrack = function(nonevent) {
	unsafeWindow.rwt = window.do_nothing;
	unsafeWindow.clk = window.do_nothing;
	unsafeWindow.onmousedown = window.do_nothing;
	try { unsafeWindow.document.onmousedown = window.do_nothing; } catch(e) {}
	try { unsafeWindow.document.body.onmousedown = window.do_nothing; } catch(e) {}
	//unsafeWindow.google.nav = window.do_nothing;
	return;
}

window.do_nothing = function(a,b,c,d,e,f,g,h,i,j,k,l,m) {
	var link;
	try{
	if(a.href) link = a;
	if(a.target.href) link = a.target;
	if(a.target.parentNode.href) link = a.target.parentNode;
	} catch(e) {}
	if(link){
		link.old = link.href;
		link.removeAttribute("onmousedown");
		if(link.href.match(/(webcache\.googleusercontent\.com|imgres\?imgurl)/)) return;
		if(link.href.match(/\/search\?q=/)) return;
		link.href = link.href.replace(/.*google\.com\/url\?[a-z]*=http([^&]*)&.*/gi,"http$1");
		link.href = link.href.replace(/\/url\?[a-z]*=http([^&]*)&.*/gi,"http$1");
		link.href = link.href.replace(/&amp;ei=.+?&amp;/gi,"&amp;");
		link.href = decodeURIComponent(link.href);
		//if(link.old!=link.href) GM_log("newlink-> " + link);
	}
};

notrack();

document.addEventListener('DOMNodeInserted', function (event) {notrack(event);}, false);

return;