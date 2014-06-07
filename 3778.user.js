// ==UserScript==
// @name            LJ Clean Friends
// @namespace       
// @description     kill tables and forms in entries on friends page which tend to be quizzes and set max width on images
// @include      	http://*.livejournal.com/friend*
// ==/UserScript==

GM_addStyle("img { max-width: 600px; }");

function quizKiller() {
	var x = document.getElementsByTagName('div');
	var tableKill = document.createElement('STRONG');
	var tableText = document.createTextNode('Table element has been removed possible quiz meme click post link below to view');
	tableKill.appendChild(tableText);
	var formKill = document.createElement('STRONG');
	var formText = document.createTextNode('Form element has been removed possible quiz meme click post link below to view');
	formKill.appendChild(formText);
	var imgKill = document.createElement('STRONG');
	var imgText = document.createTextNode('Img element has been removed possible quiz meme click post link below to view');
	imgKill.appendChild(imgText);
	for (var i=0;i<x.length;i++) {
      	if (x[i].className.indexOf('entry') != -1) {
        	c = x[i].childNodes
		  for (var ii=0;ii<c.length;ii++) {
		  		if (c[ii].nodeName == 'TABLE') {
						var q = c[ii];
						tlink = x[i].nextSibling;
						plink = tlink.firstChild;
						plinka = plink.firstChild;
						plinkah = plinka.getAttribute('href');
						var kill = document.createElement('P');
						var b = document.createElement('STRONG');
						var a = document.createElement('A');
						var href = document.createAttribute('href');
						a.setAttributeNode(href);
						href.value = plinkah;
						var killText = document.createTextNode('Possible Quiz [table] removed! Click to view');
						a.appendChild(killText);
						b.appendChild(a);
						kill.appendChild(b);
						x[i].replaceChild(kill,q)
				} else if (c[ii].nodeName == 'FORM') {
						var q = c[ii];
						tlink = x[i].nextSibling;
						plink = tlink.firstChild;
						plinka = plink.firstChild;
						plinkah = plinka.getAttribute('href');
						var kill = document.createElement('P');
						var b = document.createElement('STRONG');
						var a = document.createElement('A');
						var href = document.createAttribute('href');
						a.setAttributeNode(href);
						href.value = plinkah;
						var killText = document.createTextNode('Possible Quiz [form] removed! Click to view');
						a.appendChild(killText);
						b.appendChild(a);
						kill.appendChild(b);
						x[i].replaceChild(kill,q)
		  		} else if (c[ii].nodeName == 'DIV') {
					cc = c[ii].firstChild;
					if (cc.nodeName == 'FORM') {
						var q = c[ii];
						tlink = x[i].nextSibling;
						plink = tlink.firstChild;
						plinka = plink.firstChild;
						plinkah = plinka.getAttribute('href');
						var kill = document.createElement('P');
						var b = document.createElement('STRONG');
						var a = document.createElement('A');
						var href = document.createAttribute('href');
						a.setAttributeNode(href);
						href.value = plinkah;
						var killText = document.createTextNode('Possible Quiz [form] removed! Click to view');
						a.appendChild(killText);
						b.appendChild(a);
						kill.appendChild(b);
						x[i].replaceChild(kill,q)
					}
		  		}
			}
	  	}
    	}
}

quizKiller();