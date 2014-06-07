// ==UserScript==
// @name           tvrageCancelled
// @namespace      smk
// @description    make tag blink/bold/red
// @include        http://www.tvrage.com/*
// ==/UserScript==

let cancelled=document.evaluate('//div/b[contains(.,"Status")]',document,null,7,null).snapshotItem(0).nextSibling;
if(cancelled && /canceled|ended/i.test(cancelled.textContent)){
	let cancelledSpan=document.createElement('span');
	cancelledSpan.setAttribute('style','color:red; text-decoration:blink;  font-weight: bold;');
	cancelledSpan.textContent=cancelled.textContent.replace(/^:\s*/,' ');
	cancelled.parentNode.insertBefore(cancelledSpan,cancelled.nextSibling);
	cancelled.parentNode.removeChild(cancelled);
}
