// ==UserScript==
// @name           FrenzyFM Smiley for Facebook
// @namespace      http://frenzyfm.my
// @description    Gantikan Text Senyuman dengan Icon Senyuman FrenzyFM.
// @require        http://userscripts.org/scripts/source/90947.user.js
// @include        http://www.facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://*.facebook.com/*
// @include        https://www.facebook.com/*
// ----------------------------------------------------------[ CHROME ]-
// @match          http://*.facebook.com/*
// @match          http://www.facebook.com/*
// @match          https://*.facebook.com/*
// @match          https://www.facebook.com/*
// @run-at         document-start
// @version        1.2 beta
// @author         Elyaszbha aka Gaara
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
	emoticons["@wek"] = {
		src: "http://www.sinilah.com/ikon/wekk.gif",
		alt: "wek"
	};
	emoticons["@hentak"] = {
		src: "http://www.sinilah.com/ikon/hentak.gif",
		alt: "hentak"
	};
	emoticons["@m0ntot"] = {
		src: "http://www.sinilah.com/ikon/montot.gif",
		alt: "m0ntot"
	};
	emoticons["@sonic"] = {
		src: "http://www.sinilah.com/ikon/sonic.gif",
		alt: "@sonic"
	};
	emoticons["@bye"] = {
		src: "http://www.sinilah.com/ikon/bye.gif",
		alt: "nonono"
	};
	emoticons[":kecur"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(20).gif",
		alt: "!kecur"
	};
	emoticons["@haha"] = {
		src: "http://www.sinilah.com/ikon/haha.gif",
		alt: "@haha"
	};
	emoticons["!tawe"] = {
		src: "http://www.sinilah.com/ikon/agaga.gif",
		alt: "!tawe"
	};
	emoticons["@blank"] = {
		src: "http://www.sinilah.com/ikon/blank.gif",
		alt: "@blank"
	};
	emoticons["!siul"] = {
		src: "http://www.sinilah.com/-/4/ikon/EM_YoCi062.gif",
		alt: "!siul"
	};
	emoticons["!angguk"] = {
		src: "http://www.sinilah.com/-/4/ikon/9.gif",
		alt: "!angguk"
	};
	emoticons["!hampa"] = {
		src: "http://www.sinilah.com/-/4/ikon/EM_Onion_Tou034.gif",
		alt: "!hampa"
	};
	emoticons["!hihi"] = {
		src: "http://www.sinilah.com/-/4/ikon/EM_YoCi069.gif",
		alt: "tepuk"
	};
	emoticons["!ktuk"] = {
		src: "http://www.sinilah.com/-/4/ikon/EM_Onion_Tou113.gif",
		alt: "!ktuk"
	};
	emoticons["!2zz"] = {
		src: "http://www.sinilah.com/-/4/ikon/EM_Teat_boy036.GIF",
		alt: "!2zz"
	};
	emoticons["!gegel"] = {
		src: "http://sinilah.com/ikon/112.gif",
		alt: "!gegel"
	};
	emoticons["!syg"] = {
		src: "http://sinilah.com/ikon/22.gif",
		alt: "!syg"
	};
	emoticons["!ko"] = {
		src: "http://sinilah.com/ikon/em42.gif",
		alt: "menengo"
	};
	emoticons["!hah"] = {
		src: "http://sinilah.com/ikon/em66.gif",
		alt: "!hah"
	};
	emoticons["!makan"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(198).gif",
		alt: "!makan"
	};
	emoticons["!basikal"] = {
		src: "http://www.sinilah.com/-/4/greensmilies-010.gif",
		alt: "!basikal"
	};
	emoticons["!r0kok"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(38).gif",
		alt: "!r0kok"
	};
	emoticons["!benjol"] = {
		src: "http://www.sinilah.com/ikon/benjol.gif",
		alt: "!benjol"
	};
	emoticons["!mana"] = {
		src: "http://www.sinilah.com/ikon/mana.gif",
		alt: "!mana"
	};
	emoticons["@mizz"] = {
		src: "http://i289.photobucket.com/albums/ll211/manma90/3D%20Emoticons/001.gif",
		alt: "@mizz"
	};
	emoticons["!majuk"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(122).gif",
		alt: "!majuk"
	};
	emoticons["!korek"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(120).gif",
		alt: "!korek"
	};
	emoticons["!salam"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(136).gif",
		alt: "askum"
	};
	emoticons["wasalam"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-.gif",
		alt: "!jwb"
	};
	emoticons[":penampo"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(66).gif",
		alt: ":penampo"
	};
	emoticons[":bagak"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(63).gif",
		alt: ":bagak"
	};
	emoticons[":tkot"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(54).gif",
		alt: ":tkot"
	};
	emoticons[":brb"] = {
		src: "http://www.sinilah.com/ikon/brb.gif",
		alt: "brb"
	};
	emoticons[":malu"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(58).gif",
		alt: ":malu"
	};
	emoticons["!ngeh"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-.jpg",
		alt: "!ngeh"
	};
	emoticons[":mujuk"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(178).gif",
		alt: ":mujuk"
	};
	emoticons["!tunggu"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(179).gif",
		alt: "duduaku"
	};
	emoticons["!yeke"] = {
		src: "http://www.sinilah.com/ikon/yeke.gif",
		alt: "!yeke"
	};
	emoticons["!montel"] = {
		src: "http://sinilah.com/ikon/41%20(1).gif",
		alt: "!montel"
	};
	emoticons[":!hah"] = {
		src: "http://sinilah.com/ikon/em66.gif",
		alt: "!hah"
	};
	emoticons["!tepuk"] = {
		src: "http://www.sinilah.com/-/4/ikon/4yoyo39.gif",
		alt: "ngokar"
	};
	emoticons["!lala"] = {
		src: "hhttp://www.sinilah.com/ikon/FrenzyFM-%20(131).gif",
		alt: "rock"
	};
	emoticons["!langgar"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(216).gif",
		alt: "puff16"
	};
	emoticons[":erkk"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(59).gif",
		alt: "ngupil"
	};
	emoticons["!kiss"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(214).gif",
		alt: "!kiss"
	};
	emoticons[":))"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(13).gif",
		alt: "43"
	};
	emoticons[":P"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(57).gif",
		alt: "gebukan"
	};
	emoticons[":lawaknya"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(1).gif",
		alt: "rock on"
	};
	emoticons["x_x"] = {
		src: "http://www.sinilah.com/-/4/109.gif",
		alt: "X_X"
	};
        emoticons[":menung"] = {
		src: "http://www.sinilah.com/-/4/menung.gif",
		alt: "menung"
	};
        emoticons["!uwek"] = {
		src: "http://sinilah.com/ikon/em19.gif",
		alt: "!wek"
	};
        emoticons["!sad"] = {
  		src: "http://www.sinilah.com/-/4/sedih.gif",
		alt: "sad"
	};
        emoticons[":cedih"] = {
		src: "http://www.sinilah.com/ikon/FrenzyFM-%20(49).gif",
		alt: "cedih"
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