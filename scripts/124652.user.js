// ==UserScript==
// @name           Memes, memes everywhere...
// @namespace      https://dl.dropboxusercontent.com/u/24220832/
// @description    Usa cualquier meme en cualquier lugar!
// @author         Chimecho
// @include        *
// @exclude        https://dl.dropboxusercontent.com/u/24220832/Memes/database.htm
// @exclude        http://userscripts.org/scripts/edit*
// @version        2.1
// ==/UserScript==

var acc, nac, hst, host_excluded, db = null, memes_ready, queue, stage = 0, currver = "2.1";

(function(d){
	d.addEventListener('keydown', function(e) {
		if ((e.keyCode == 90 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) || (e.keyCode == 17 && e.shiftKey)) {
			window.open("https://dl.dropboxusercontent.com/u/24220832/Memes/database.htm","mywindow",'scrollbars=yes,toolbar=no,menubar=no,status=no,width=810,height=502');
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
		if (firstChar == 58) { // :
			end = i;
			for(j = i+1; j < len; j++) {
				var currentchar = content.charCodeAt(j);
				if(currentchar == 58) {
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
				var name = content.substring(i+1,end).toLowerCase().trim();
				if(name.length<=0)
					return null;
				
				if(!name.match(nac)) {
					if (db) {
						window.console.log("Buscando \""+name+"\" en la base de datos...");
						index = db.indexOf(name);
						if (index == -1) {
							window.console.warn(name+" no encontrado en la base de datos.");
							return null;
						}
					}
					
					htmls.push(document.createTextNode(content.substring(lastEnd, i)));
					img = document.createElement('img');
					img.src = "https://dl.dropboxusercontent.com/u/24220832/Memes/imgs/"+name+".gif";
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
	
	var span = null;
	if (htmls.length) {
		span=document.createElement('span');
		for (i = 0; i < htmls.length; i++) 
			span.appendChild(htmls[i]);
	}
	return span;
}

function replaceElement(element) {
	if (host_excluded)
		return;
	
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
	if (host_excluded)
		return;
	
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
	acc = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789-";
	nac = "http|progid|last-child|webkit|scrollbar|track|updates|webupdatesmobile|talk|gadgets|feedreader|lh2|questions|friendview|gossip|stilbruch|start|vertical|horizontal|socialhost";
	hst = ".*mail.google.*|.*www.google.*|.*translate.google.com.*|.*lmgtfy.com.*|.*play.google.com.*|.*maps.google.com.*";
	
	try {
		currentMilis = Date.now();
		lastrefresh = GM_getValue("lastrefresh", 0);
		if (((currentMilis - lastrefresh)/1000/3600) >= 12) { // más de 12 horas desde la última notificación
			GM_setValue("lastrefresh", currentMilis+"");
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://userscripts.org/scripts/show/124652',
				headers: {'Cache-Control': 'no-cache'},
				onload: function(resp) {
					var text = resp.responseText;
					var ver = /<b>Version:<\/b>([^<]+)/m.exec(text)[1].trim();
					if (ver > currver) {
						if (confirm("Existe una nueva versión de Memes, memes everywhere.\n¿Desea actualizar el script?")) {
							window.location("http://userscripts.org/scripts/show/124652");
						}
					}
				}
			});
		}
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://dl.dropbox.com/u/24220832/Memes/vars.txt',
			headers: {'Cache-Control': 'no-cache'},
			onload: function(resp) {
				var text = resp.responseText;
				window.console.log("Variables obtenidas");
				acc = /acc:\s*(.*?)$/m.exec(text)[1];
				nac = /nac:\s*(.*?)$/m.exec(text)[1];
				hst = /hst:\s*(.*?)$/m.exec(text)[1];
				host_excluded = window.location.host.match(hst);
				
				if (host_excluded)
					window.console.warn("Host excluído, no se harán reemplazos de memes.");
				
				stage++;
				if (stage==2) {
					replaceElement(document);
					if (window.location.host == "twitter.com") {
						document.getElementById("stream-items-id").addEventListener('DOMNodeInserted', listen, true);
					} else {
						document.body.addEventListener('DOMNodeInserted', listen, true);
					}
				}
			}
		});
		
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'https://dl.dropbox.com/u/24220832/Memes/db',
			headers: {'Cache-Control': 'no-cache'},
			onload: function(resp) {
				window.console.log("Base de datos obtenida");
				var text = resp.responseText;
				db = text.split(" ");
				stage++;
				if (stage==2) {
					replaceElement(document);
					if (window.location.host == "twitter.com") {
						document.getElementById("stream-items-id").addEventListener('DOMNodeInserted', listen, true);
					} else {
						document.body.addEventListener('DOMNodeInserted', listen, true);
					}
				}
			}
		});
	} catch(e) {
		window.console.error("Error al obtener las variables");
		host_excluded = window.location.host.match(hst);
		if (host_excluded)
			window.console.warn("Host excluído, no se harán reemplazos de memes.");
		replaceElement(document);
		if (window.location.host == "twitter.com") {
			document.getElementById("stream-items-id").addEventListener('DOMNodeInserted', listen, true);
		} else {
			document.body.addEventListener('DOMNodeInserted', listen, true);
		}
	}
}

getVars();