// ==UserScript==
// @name           TwittMedia
// @namespace      http://dl.dropboxusercontent.com/u/24220832/
// @description    ¡Añade imágenes de instagram, dropbox y otras webs con links directos como tarjetas de twitter!
// @author         Chimecho
// @include        *twitter.com*
// @version        1.1
// ==/UserScript==

var currver = "1.1";

currentMilis = Date.now();
lastrefresh = GM_getValue("lastrefresh", 0);
if (((currentMilis - lastrefresh)/1000/3600) >= 12) { // más de 12 horas desde la última notificación
	GM_setValue("lastrefresh", currentMilis+"");
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://userscripts.org/scripts/show/165090',
		headers: {'Cache-Control': 'no-cache'},
		onload: function(resp) {
			var text = resp.responseText;
			var ver = /<b>Version:<\/b>([^<]+)/m.exec(text)[1].trim();
			if (ver > currver) {
				if (confirm("Existe una nueva versión de TwittMedia.\n¿Desea actualizar el script?")) {
					window.location("http://userscripts.org/scripts/show/165090");
				}
			}
		}
	});
}

RegExp.prototype.execAll = function(string) {
    var match = null;
    var matches = new Array();
    while (match = this.exec(string)) {
        var matchArray = [];
        for (i in match) {
            if (parseInt(i) == i) {
                matchArray.push(match[i]);
            }
        }
        matches.push(matchArray);
    }
    return matches;
}

function addMediaST(node) {
	var content = node.innerHTML;
	if (!content)
		return null;
	
	if (content.indexOf("<div class=\"tweet permalink-tweet") >= 0) { // Single tweet view
		var tweettext = /<p class="js-tweet-text tweet-text[^>]+>(.*?)<\/p>/m.exec(content)[1];
		var urls = /url="([^"]+)"/mg.execAll(tweettext);
		var imgs = [];
		
		for (index = 0; index < urls.length; index++) {
			var url = urls[index][1];
			if (url.indexOf("instagr") >= 0) {
				addInstagramCard(url, node);
				return null;
			} else {
				var ext = (/.*\.(.*)$/.exec(url) || ["", ""])[1].toLowerCase();
				
				if (ext == "jpg" || ext == "jpeg" || ext == "bmp" || ext == "gif") {
					imgs.push(url);
				}
			}
		}
		
		if (imgs.length > 0) {
			CardsDiv = getImgsCardsDiv(imgs, imgs);
			
			content = content.replace("<div class=\"js-tweet-details-fixer tweet-details-fixer\">", CardsDiv).replace("<div class=\"js-tweet-media-container \"></div>", "<span class=\"metadata\">Powered by <a href=\"https://twitter.com/Chimech0\">Chimecho</a>'s <a href=\"http://userscripts.org/scripts/show/165090\">TwittMedia script</a></span><div class=\"js-tweet-media-container \"></div>").replace("<div class=\"tweet permalink-tweet", "<div class=\"tweet chimechostwittmedia permalink-tweet");
			return content;
		}
	}
	return null;
}

function addMediaTL(node) {
	var content = node.innerHTML;
	if (!content)
		return null;
	
	cond = content.indexOf("<div class=\"tweet original-tweet") >= 0;
	condt = 1;
	if (!cond) {
		cond = content.indexOf("<div class=\"simple-tweet tweet") >= 0;
		condt = 2;
	}
	
	if (cond) {
		var cont = /<p class="js-tweet-text">(.*?)<\/p>/m.exec(content);
		if (cont) {
			var tweettext = cont[1];
			var urls = /url="([^"]+)"/mg.execAll(tweettext);
			var imgs = [];
			
			for (index = 0; index < urls.length; index++) {
				var url = urls[index][1];
				if (url.indexOf("instagr") >= 0) {
					addInstagramCardTL(url, node, condt);
					return null;
				} else {
					var ext = (/.*\.(.*)$/.exec(url) || ["", ""])[1].toLowerCase();
					
					if (ext == "jpg" || ext == "jpeg" || ext == "bmp" || ext == "gif") {
						imgs.push(url);
					}
				}
			}
			
			if (imgs.length > 0) {
				CardsDiv = getImgsCardsDiv(imgs, imgs);
				
				content = content.replace("data-expanded-footer=\"&lt;div class=&quot;js-tweet-details-fixer tweet-details-fixer&quot;&gt;", "data-expanded-footer=\""+ampcode(CardsDiv)).replace("&lt;div class=&quot;js-tweet-media-container &quot;&gt;&lt;/div&gt;", "&#60;span&#32;class&#61;&#34;metadata&#34;&#62;Powered&#32;by&#32;&#60;a&#32;href&#61;&#34;https&#58;&#47;&#47;twitter&#46;com&#47;Chimech&#48;&#34;&#62;Chimecho&#60;&#47;a&#62;&#39;s&#32;&#60;a&#32;href&#61;&#34;http&#58;&#47;&#47;userscripts&#46;org&#47;scripts&#47;show&#47;&#49;&#54;&#53;&#48;&#57;&#48;&#34;&#62;TwittMedia&#32;script&#60;&#47;a&#62;&#60;&#47;span&#62;"+"&lt;div class=&quot;js-tweet-media-container &quot;&gt;&lt;/div&gt;").replace("data-expanded-footer", "data-card-type=\"photo\" data-expanded-footer").replace("<div class=\""+(condt==1?"tweet original-tweet":"simple-tweet tweet"), "<div class=\"expansion-container js-expansion-container\" style=\"height: auto;\"><div class=\""+(condt==1?"tweet chimechostwittmedia original-tweet":"simple-tweet chimechostwittmedia tweet")+" has-cards has-native-media")+"</div>";
				return content;
			}
		}
	}
	
	return null;
}

function ampcode(str) {
	var i = str.length,
	aRet = [];
	
	while (i--) {
		var iC = str[i].charCodeAt();
		if (iC < 65 || iC > 127 || (iC>90 && iC<97)) {
			aRet[i] = '&#'+iC+';';
		} else {
			aRet[i] = str[i];
		}
	}
	
	return aRet.join('');   
}

function addInstagramCard(instagramurl, node, condt) {
	node.innerHTML = node.innerHTML.replace("<div class=\"tweet permalink-tweet", "<div class=\"tweet chimechostwittmedia permalink-tweet");
	
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: instagramurl,
		headers: {'Cache-Control': 'no-cache'},
		onload: function(resp) {
			var text = resp.responseText;
			var imglink = /<img class="photo" src="([^"]+)/m.exec(text)[1];
			CardDiv = getImgsCardsDiv([instagramurl], [imglink]);
			node.innerHTML = node.innerHTML.replace("<div class=\"js-tweet-details-fixer tweet-details-fixer\">", CardDiv).replace("<div class=\"js-tweet-media-container \"></div>", "<span class=\"metadata\">Powered by <a href=\"https://twitter.com/Chimech0\">Chimecho</a>'s <a href=\"http://userscripts.org/scripts/show/165090\">TwittMedia script</a></span><div class=\"js-tweet-media-container \"></div>");
		}
	});
}

function addInstagramCardTL(instagramurl, node) {
	node.innerHTML = node.innerHTML.replace("<div class=\""+(condt==1?"tweet original-tweet":"simple-tweet tweet"), "<div class=\"expansion-container js-expansion-container\" style=\"height: auto;\"><div class=\""+(condt==1?"tweet chimechostwittmedia original-tweet":"simple-tweet chimechostwittmedia tweet")+" has-cards has-native-media");
	
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: instagramurl,
		headers: {'Cache-Control': 'no-cache'},
		onload: function(resp) {
			var text = resp.responseText;
			var imglink = /<img class="photo" src="([^"]+)/m.exec(text)[1];
			CardDiv = getImgsCardsDiv([instagramurl], [imglink]);
			node.innerHTML = node.innerHTML.replace("data-expanded-footer=\"&lt;div class=&quot;js-tweet-details-fixer tweet-details-fixer&quot;&gt;", "data-expanded-footer=\""+ampcode(CardDiv)).replace("&lt;div class=&quot;js-tweet-media-container &quot;&gt;&lt;/div&gt;", "&#60;span&#32;class&#61;&#34;metadata&#34;&#62;Powered&#32;by&#32;&#60;a&#32;href&#61;&#34;https&#58;&#47;&#47;twitter&#46;com&#47;Chimech&#48;&#34;&#62;Chimecho&#60;&#47;a&#62;&#39;s&#32;&#60;a&#32;href&#61;&#34;http&#58;&#47;&#47;userscripts&#46;org&#47;scripts&#47;show&#47;&#49;&#54;&#53;&#48;&#57;&#48;&#34;&#62;TwittMedia&#32;script&#60;&#47;a&#62;&#60;&#47;span&#62;"+"&lt;div class=&quot;js-tweet-media-container &quot;&gt;&lt;/div&gt;").replace("data-expanded-footer", "data-card-type=\"photo\" data-expanded-footer")+"</div>";
		}
	});
}

function getImgsCardsDiv(urlsarray, imgsarray) {
	var div = "<div class=\"js-tweet-details-fixer tweet-details-fixer\">";
	for (cardi = 0; cardi < urlsarray.length; cardi++) {
		var url = urlsarray[cardi];
		var picurl = imgsarray[cardi];
		div +="	<div class=\"cards-media-container \">"
			+"		<div data-card-url=\""+url+"\" data-card-type=\"photo\" class=\"cards-base cards-multimedia\" data-element-context=\"platform_photo_card\">"
			+"			<div class=\"media\">"
			+"				<a class=\"twitter-timeline-link media-thumbnail\" href=\""+url+"\" data-url=\""+picurl+"\" data-resolved-url-large=\""+picurl+"\">"
			+"					<img src=\""+picurl+"\" alt=\"Enlace permanente de imagen incrustada\">"
			+"				</a>"
			+"			</div>"
			+"			<div class=\"cards-content\">"
			+"				<div class=\"byline\">"
			+"				</div>"
			+"			</div>"
			+"		</div>"
			+"	</div>";
	}
	
	return div;
}

function replaceChilds(node) {
	if (!node)
		return;
	
	var childs = node.getElementsByTagName('div');
	for (childi = 0; childi < childs.length; childi++) {
		var child = childs[childi];
		var element = addMediaST(child);
		if (element)
			child.innerHTML = element;
	}
	
	childs = node.getElementsByTagName('li');
	for (childi = 0; childi < childs.length; childi++) {
		var child = childs[childi];
		var element = addMediaTL(child);
		if (element)
			child.innerHTML = element;
	}
}

function listen(evt) {
	var node = evt.target;
	if (node.nodeType == document.ELEMENT_NODE) {
		replaceChilds(node);
	} else if (node.nodeType == document.TEXT_NODE) {
		replaceChilds(node.parentNode);
	}
}

function TLlistener(evt) {
	var node = evt.target;
	if (node.nodeType == document.ELEMENT_NODE) {
		var element = addMediaTL(node);
		if (element)
			node.innerHTML = element;
	}
}

replaceChilds(document);
replaceChilds(document.getElementById("page-container"));
document.getElementById("stream-items-id").addEventListener('DOMNodeInserted', TLlistener, true);