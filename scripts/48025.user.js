// ==UserScript==
// @name          Prev/Next Keyboard Navigation
// @namespace     http://www.notyetnamed.com/
// @include       http://*
// @description	  Navigate Prev/Next links on webpages using the keyboard. Use Alt+z for Prev and Alt+x for Next.
// ==/UserScript==

int_links = document.evaluate(
    "//a[contains(@href,window.location.host)]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
p=n=null;
for(i=0;i<int_links.snapshotLength-1;i++) {
	l = int_links.snapshotItem(i);
	if((l.innerHTML.toLowerCase().indexOf("prev")>=0 || l.title.toLowerCase().indexOf("prev")>=0) && l.textContent.toLowerCase().indexOf("nextnewest")==-1) p=l;
	if((l.innerHTML.toLowerCase().indexOf("next")>=0 || l.title.toLowerCase().indexOf("next")>=0) && l.textContent.toLowerCase().indexOf("nextnewest")==-1) n=l;
}
document.addEventListener('keydown', function(event) {
	if(event.altKey && event.keyCode==90 && p) window.location.href = p.href;
	if(event.altKey && event.keyCode==88 && n) window.location.href = n.href;		
}, true);
