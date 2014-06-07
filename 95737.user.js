// ==UserScript==
// @name           SusanCoffee
// @namespace      kra
// @include        http://www.susancoffey.net/gallery/*
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

{ 

	var releases = document.evaluate('//div[@class="imagethumb"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	function getfullname(link)
	{	
	
			pos = link.getElementsByTagName("a").item(0).href;
			edit = pos.replace(/\?|=|%/g,'').replace(/index.phpalbum/g,'albums/').replace(/2F|&image/g,'/');
			var newTD = document.createElement("td");
			unlink = document.createElement("a");
			unlink.className ='pic';
			nice = edit;
			unlink.href = nice;
			//unlink.innerHTML = "dl";
			newTD.appendChild(unlink);
			link.innerHTML += newTD.innerHTML;
	
	}

	
	for (var i=0; i<releases.snapshotLength; i++)
		getfullname(releases.snapshotItem(i));

}

addGlobalStyle('.pic { position:relative; top:-114px; border:none !important; background:none !important; height:87px; width:87px; margin-bottom:-100px !important; }');