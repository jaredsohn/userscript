// ==UserScript==
// @name           Permisi Emoticon For Facebook
// @namespace      Aliefis (mau jadi co admin)
// @description    Emoticon Permisi Emoticon untuk status, wall dan chat Facebook
// @include        http://www.facebook.com/*
// @version        1.0.0
// ==/UserScript==


String.prototype.isPrefixOf = function(str, from){
	if (arguments.length < 2) 
		from = 0;
	else 
		from = parseInt(from);
	
	if (from < 0 || from >= str.length) 
		return false;
	
	if (from + this.length > str.length) 
		return false;
	
	for (var i = 0; i < this.length; i++) 
		if (this.charCodeAt(i) != str.charCodeAt(from + i)) 
			return false;
	
	return true;
}
	
	
	var emoticons = [];
		emoticons[":oya:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/oya.gif",
		alt: ":oya:"
	};
	emoticons[":really:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/really.gif",
		alt: ":really:"
	};
	emoticons[":sebel"] = {
		src: "http://permisi.us/uploadsmili/Parampa/sebel.gif",
		alt: ":najis"
	};
	emoticons[":kikik:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/kikik.gif",
		alt: ":kikik:"
	};
	emoticons[":cember:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/cember.gif",
		alt: ":cember:"
	};
	emoticons[":sipu:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/sipu.gif",
		alt: ":sipu:"
	};
	emoticons[":cry:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/cry.gif",
		alt: ":cry:"
	};
	emoticons[":sleep:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/sleep.gif",
		alt: ":sleep:"
	};
	emoticons[":music:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/music.gif",
		alt: ":music:"
	};
	emoticons[":die:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/die.gif",
		alt: ":die:"
	};
	emoticons[":surprise:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/surprise.gif",
		alt: ":surprise:"
	};
	emoticons[":ngomel:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/ngomel.gif",
		alt: ":ngomel:"
	};
	emoticons[":fufu:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/fufu.gif",
		alt: ":fufu:"
	};
	emoticons[":woot:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/woot.gif",
		alt: ":woot:"
	};
	emoticons[":nyucuk:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/nyucuk.gif",
		alt: ":nyucuk:"
	};
	emoticons[":haha:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/haha.gif",
		alt: ":haha:"
	};
	emoticons[":hmm:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/hmm.gif",
		alt: ":hmm:"
	};
	emoticons[":hoahmm:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/hoahmm.gif",
		alt: ":hoahmm:"
	};
	emoticons[":shock:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/shock.gif",
		alt: ":shock:"
	};
	emoticons[":blush:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/blush.gif",
		alt: ":blush:"
	};
	emoticons[":kirkan:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/kirkan.gif",
		alt: ":kirkan:"
	};
	emoticons[":admin:"] = {
		src: "http://permisi.us/image.php?u=3&dateline=1301393102&type=profile",
		alt: ":admin:"
	};
	emoticons[":bignose:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/bignose.gif",
		alt: ":bignose:"
	};
	emoticons[":maap:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/maap.gif",
		alt: ":maap:"
	};
	emoticons[":cry2:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/cry2.gif",
		alt: ":cry2:"
	};
	emoticons[":som:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/som.gif",
		alt: ":som:"
	};
	emoticons[":ngantuk:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/ngantuk.gif",
		alt: ":ngantuk:"
	};
	emoticons[":emmph:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/emmph.gif",
		alt: ":emmph:"
	};
	emoticons[":waks:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/waks.gif",
		alt: ":waks:"
	};
	emoticons[":nyesel:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/nyesel.gif",
		alt: ":nyesel:"
	};
	emoticons[":gross:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/gross.gif",
		alt: ":gross:"
	};
	emoticons[":wow:"] = {
		src: "http://permisi.us/uploadsmili/Parampa/wow.gif",
		alt: ":wow:"

	};
	
var emotxt = [];
var yemo = [];
var c;
for (var emo in emoticons) 
	if (!(emoticons[emo] instanceof Function)) {
		c = emo.charCodeAt(0);
		if (!yemo[c]) 
			yemo[c] = [];
		
		yemo[c].push({
			emoticon: emo,
			src: emoticons[emo].src
		});
	}
	
function f(o1, o2){
	if (o1.emoticon.isPrefixOf(o2.emoticon)) 
		return 1;
	
	if (o1.emoticon > o2.emoticon) 
		return 1;
	
	if (o1.emoticon < o2.emoticon) 
		return -1;
	
	return 0;
}
var i;	
for (i = 0; i < yemo.length; i++) 
	if (yemo[i]) 
		yemo[i].sort(f);
	
function replaceTextNode(textNode, sortedEmoticonSet)
{
	var content = textNode.textContent;
	var currentStopPosition;
	var i, j;
	var firstChar;
	var found = false;
	var htmls = [];
	var img;
	currentStopPosition = i = 0;
	while (i < content.length) {
		firstChar = content.charCodeAt(i);
		if (sortedEmoticonSet[firstChar]) 
			for (j = 0; j < sortedEmoticonSet[firstChar].length; j++) 
				if (sortedEmoticonSet[firstChar][j].emoticon.length && sortedEmoticonSet[firstChar][j].emoticon.isPrefixOf(content, i)) {
					if (currentStopPosition < i) 
						htmls.push(document.createTextNode(content.substr(currentStopPosition, i - currentStopPosition)))
					
					img = document.createElement('img');
					img.src = sortedEmoticonSet[firstChar][j].src;
					img.title = sortedEmoticonSet[firstChar][j].emoticon;
					htmls.push(img);
					
					
					i += sortedEmoticonSet[firstChar][j].emoticon.length;
					currentStopPosition = i;
					found = true;
					break;
				}
		
		if (found) {
			found = false;
			continue;
		}
		i++;
	}
	
	if(currentStopPosition>0&&currentStopPosition<content.length-1)
		htmls.push(document.createTextNode(content.substr(currentStopPosition)));
	
	var span=null;
	if (htmls.length) {
		span=document.createElement('span');
		for (i = 0; i < htmls.length; i++) 
			span.appendChild(htmls[i]);
	}
	return span;
}

function replaceElement(element, emos){
	var pathResult = document.evaluate(".//text()", element, null, 7, null);
	
	for (i = 0; i < pathResult.snapshotLength; i++) {
		var tNode = pathResult.snapshotItem(i);
		if (tNode.parentNode) {
			var span = replaceTextNode(tNode, emos);
			if (span) 
				tNode.parentNode.replaceChild(span, tNode);
		}
	}
}