// ==UserScript==
// @name           Memes, memes everywhere...
// @namespace      http://dl.dropbox.com/u/24220832/
// @description    Usa cualquier meme en cualquier lugar!
// @author         Chimecho
// @include        *
// @exclude        *mail.google*
// @exclude        *www.google*
// @exclude        *translate.google.com*
// @exclude        *www.lmgtfy.com/*
// @exclude        *play.google.com*
// @exclude        *maps.google.com*
// @exclude        http://dl.dropbox.com/u/24220832/Memes/database.htm
// @exclude        http://userscripts.org/scripts/edit*
// @version        1.43
// ==/UserScript==

var acc, nac;

(function(d){
	d.addEventListener('keydown', function(e) {
		if ((e.keyCode == 90 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) || (e.keyCode == 17 && e.shiftKey)) {
			window.open("http://dl.dropbox.com/u/24220832/Memes/database.htm","mywindow",'scrollbars=yes,toolbar=no,menubar=no,status=no,width=810,height=502');
		}
	}, false);
})(document);

function replaceTextNode(textNode) {
	var content = textNode.textContent;
	var currentStopPosition;
	var i = 0, j, k, end;
	var firstChar;
	var found = false;
	var htmls = [];
	var img;
	var lastEnd = 0;
	var len = content.length;
	while (i < len) {
		firstChar = content.charCodeAt(i);
		if (firstChar == 58 || firstChar == 42) { // :
			end = i;
			for(j = i+1; j < len; j++) {
				var currentchar = content.charCodeAt(j);
				if(currentchar == 58 || currentchar == 42){
					end = j;
					break;
				}else {
					var found = false;
					for(k=0; k < acc.length; k++) {
						if(currentchar == acc.charCodeAt(k)) {
							found = true;
							break;
						}
					}
					if(!found)
						break;
				}
			}
			
			if(i!=end) {
				var name = content.substring(i+1,end);
				if(name.length>0 && !name.match(nac)) {
					htmls.push(document.createTextNode(content.substring(lastEnd, i)));
					img = document.createElement('img');
					img.src = "http://dl.dropbox.com/u/24220832/Memes/imgs/"+name+".gif";
					img.title = name;
					img.alt = ":"+name+":";
					htmls.push(img);
					lastEnd = end+1;
				}				
				i=end-1;
			}
		}
		i++;
	}
	
	if(lastEnd>0 && lastEnd<len)
		htmls.push(document.createTextNode(content.substring(lastEnd, len)));
	
	var span=null;
	if (htmls.length) {
		span=document.createElement('span');
		for (i = 0; i < htmls.length; i++) 
			span.appendChild(htmls[i]);
	}
	return span;
}

function replaceElement(element) {
	var pathResult = document.evaluate(".//text()", element, null, 7, null);
	
	for (i = 0; i < pathResult.snapshotLength; i++) {
		var tNode = pathResult.snapshotItem(i);
		if (tNode.parentNode) {
			var span = replaceTextNode(tNode);
			if (span) 
				tNode.parentNode.replaceChild(span, tNode);
		}
	}
}

function listen(evt) {
	var node = evt.target;
	if (node.nodeType == document.ELEMENT_NODE) 
		replaceElement(node);
	
	if (node.nodeType == document.TEXT_NODE) {
		var parent = node.parentNode;
		var span = replaceTextNode(node);
		if (span) 
			parent.replaceChild(span, node);
	}
}

function getVars() {
	try {
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: 'http://dl.dropbox.com/u/24220832/Memes/vars.txt',
			headers: {'Cache-Control': 'no-cache'},
			onload: function(resp) {
				var text = resp.responseText;
				acc = /acc:\s*(.*?)$/m.exec(text)[1];
				nac = /nac:\s*(.*?)$/m.exec(text)[1];
				replaceElement(document);
				document.body.addEventListener('DOMNodeInserted', listen, true);
			}
		});
	} catch(e) {
		acc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
		nac = "http|progid|last-child";
		replaceElement(document);
		document.body.addEventListener('DOMNodeInserted', listen, true);
	}
}

getVars();