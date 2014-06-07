// ==UserScript==
// @name          ETH moodle PDF link resolver
// @description   Change the links to pdf files on eth's moodle so that they directly point to the pdf files, also disables some pop-ups
// @include       https://elabs.inf.ethz.ch/*
// ==/UserScript==

var links=document.evaluate("//a[@href and img/@src = 'https://elabs.inf.ethz.ch/pix/f/pdf.gif']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for(i = 0; i < links.snapshotLength; i++) {
	var tmp = links.snapshotItem(i);
	var xhr = new XMLHttpRequest();
	xhr.open('GET',tmp.href);
	xhr.node = tmp;
	xhr.onload=function(){
		var resp = this.responseText.match('https://elabs.inf.ethz.ch/file.php/22/[^"]+')
		if (resp)
			this.node.href = resp[0];
	};
	xhr.send();


} 



links = document.getElementsByTagName('a')

for (i=0;i<links.length;i++){
	if (links[i].search.match('inpopup=true'))
		window.location.replace(links[i].href);

}