// ==UserScript==
// @name           YAESUS
// @description    Yet Another Ek$i Sozluk User Script
// @namespace      http://userscripts.org/users/134635
// @include        http://sozluk.sourtimes.org/index.asp*
// @include        http://www.eksisozluk.com/index.asp?*
// @author         dandikos
// @version        0.3
// ==/UserScript==

if (window.location.href.indexOf("index.asp") >= 0) {
	var e_titles = document.evaluate("//ul[@class='index']//li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (window.location.href.indexOf("au=")== -1) {
		for (var i = 0; i < e_titles.snapshotLength; i++) {
			e_title = e_titles.snapshotItem(i);
			e_title.addEventListener('mouseover', function(event) { this.firstChild.style.fontWeight = 'bold';}, true);
			e_title.addEventListener('mouseout', function(event) { this.firstChild.style.fontWeight = 'normal';},true); 
			entryCntArr = e_title.firstChild.title.match(/\(.*?\)/)[0].match(/\d+/g);
			if (entryCntArr[0] != entryCntArr[1]) {
				e_title.innerHTML += '&nbsp;<a href="' + e_title.firstChild.href.replace(/(&a=[a-z][a-z]|&d=\d\d.\d\d.\d\d\d\d)/, '') 
									 + '" style="visibility: hidden;font-weight: bold;color: #DC143C;" target="sozmain">('
									 + entryCntArr[1] +')</a>';
				e_title.addEventListener('mouseover', function(event) { this.lastChild.style.visibility = 'visible'; }, true);				
				e_title.addEventListener('mouseout', function(event) { this.lastChild.style.visibility = 'hidden'; }, true);					
			}
		}
	}
	else {
		for (var i = 0; i < e_titles.snapshotLength; i++) {
			e_title = e_titles.snapshotItem(i);
			e_title.addEventListener('mouseover', function(event) { this.firstChild.style.fontWeight = 'bold';}, true);
			e_title.addEventListener('mouseout', function(event) { this.firstChild.style.fontWeight = 'normal';},true); 		
			entryCnt = e_title.firstChild.title.match(/\(.*?\)/)[0].match(/\d+/g)[1];			
			entryHref = e_title.firstChild.href;
			atpos = entryHref.indexOf("&");
			if (atpos >= 0) {
				e_title.innerHTML += '&nbsp;<a href="' + entryHref.substr(0, atpos) 
									 +'" style="visibility: hidden;font-weight: bold;color: #DC143C;" target="sozmain">('
									 + entryCnt +')</a>';
				e_title.addEventListener('mouseover', function(event) { this.lastChild.style.visibility = 'visible'; }, true);		
				e_title.addEventListener('mouseout', function(event) { this.lastChild.style.visibility = 'hidden'; }, true);				
			}
		}
	}
}