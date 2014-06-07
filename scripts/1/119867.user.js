// ==UserScript==
// @id             Fahrul Icon
// @name           Fahrul Icon
// @version        3.0.1.2
// @namespace      fahrulicon
// @author         Fahrul Septiana
// @description    Adds emoticons to Twitter, Facebook And Fahrul Blog
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @include        http://twitter.com/*
// @include        https://minebomb.blogspot.com/*
// @include        https://userscript.org/*

// ==/UserScript==

// Borrowed from Yochanc15's Facebook scripts:
// http://userscripts.org/users/422980
// And sourced from YoYo icons:


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
	emoticons[":)"] = {
		src: "http://www.laymark.com/l/m/m129.gif",
		alt: "happy"
	};
	emoticons[":-)"] = {
		src: "http://www.laymark.com/l/m/m129.gif",
		alt: "happy"
	};
	emoticons[":("] = {
		src: "http://www.laymark.com/l/m/m003.gif",
		alt: "sad"
	};
        emoticons[":s"] = {
		src: "http://www.laymark.com/l/m/m033.gif",
		alt: ":s"
	};
	emoticons[":-("] = {
		src: "http://www.laymark.com/l/m/m003.gif",
		alt: "sad"
	};	
	emoticons[";)"] = {
		src: "http://www.laymark.com/l/m/m087.gif",
		alt: "winking"
	};
	emoticons[";-)"] = {
		src: "http://www.laymark.com/l/m/m087.gif",
		alt: "winking"
	};
	emoticons[":D"] = {
		src: "http://www.laymark.com/l/m/m048.gif",
		alt: "big grin"
	};
	emoticons[":-D"] = {
		src: "http://www.laymark.com/l/m/m048.gif",
		alt: "big grin"
	};
	emoticons[";;)"] = {
		src: "http://www.laymark.com/l/m/m054.gif",
		alt: "batting eyelashes"
	};
	emoticons[">:D<"] = {
		src: "http://www.laymark.com/l/m/m055.gif",
		alt: "big hug"
	};
	emoticons[":-/"] = {
		src: "http://www.laymark.com/l/m/m075.gif",
		alt: "confused"
	};
	emoticons[":x"] = {
		src: "http://www.laymark.com/l/m/m016.gif",
		alt: "love struck"
	};
	emoticons[":-x"] = {
		src: "http://www.laymark.com/l/m/m016.gif",
		alt: "love struck"
	};	
	emoticons[":X"] = {
		src: "http://www.laymark.com/l/m/m016.gif",
		alt: "love struck"
	};
	emoticons[":-X"] = {
		src: "http://www.laymark.com/l/m/m16.gif",
		alt: "love struck"
	};	
	emoticons[":\">"] = {
		src: "http://www.laymark.com/l/o/13.gif",
		alt: "blushing"
	};
	emoticons[":P"] = {
		src: "http://www.laymark.com/l/m/m011.gif",
		alt: "tongue"
	};
	emoticons[":-P"] = {
		src: "http://www.laymark.com/l/m/m011.gif",
		alt: "tongue"
	};
	emoticons[":-*"] = {
		src: "http://www.laymark.com/l/m/m120.gif",
		alt: "kiss"
	};
emoticons[":*"] = {
		src: "http://www.laymark.com/l/m/m120.gif",
		alt: "kiss"
	};
	emoticons["=(("] = {
		src: "http://www.laymark.com/l/m/m068.gif",
		alt: "broken heart"
	};
	emoticons[":-O"] = {
		src: "http://www.laymark.com/l/m/m077.gif",
		alt: "surprise"
	};
        emoticons[":O"] = {
		src: "http://www.laymark.com/l/m/m077.gif",
		alt: "surprise"
	};
	emoticons["X("] = {
		src: "http://www.laymark.com/l/m/m072.gif",
		alt: "angry"
	};
	emoticons[":>"] = {
		src: "http://www.laymark.com/l/m/m027.gif",
		alt: "smug"
	};
	emoticons["B-)"] = {
		src: "http://www.laymark.com/l/m/m182.gif",
		alt: "cool"
	};
	emoticons[":-S"] = {
		src: "http://www.laymark.com/l/m/m162.gif",
		alt: "worried"

	};
emoticons[":-s"] = {
		src: "http://www.laymark.com/l/m/m162.gif",
		alt: "worried"

	};
	emoticons["#:-S"] = {
		src: "http://www.laymark.com/l/m/m187.gif",
		alt: "whew!"
	};
	emoticons[">:)"] = {
		src: "http://www.laymark.com/l/m/m113.gif",
		alt: "devil"
	};
	emoticons[":(("] = {
		src: "http://www.laymark.com/l/m/m147.gif",
		alt: "crying"
	};
	emoticons[":))"] = {
		src: "http://www.laymark.com/l/m/m137.gif",
		alt: "laughing"
	};
        emoticons[":-))"] = {
		src: "http://www.laymark.com/l/m/m137.gif",
		alt: "laughing"
	};
	emoticons[":|"] = {
		src: "http://www.laymark.com/l/m/m025.gif",
		alt: "straight face"
	};
	emoticons[":-|"] = {
		src: "http://www.laymark.com/l/m/m025.gif",
		alt: "straight face"
	};
	emoticons["/:)"] = {
		src: "http://www.laymark.com/l/m/m082.gif",
		alt: "raised eyebrows"
	};
	emoticons["=))"] = {
		src: "http://www.laymark.com/l/m/m146.gif",
		alt: "rolling on the floor"
	};
	emoticons["O:-)"] = {
		src: "http://www.laymark.com/l/o/85.gif",
		alt: "angel"
	};
	emoticons[":-B"] = {
		src: "http://www.laymark.com/l/m/m174.gif",
		alt: "nerd"
	};
	emoticons["=;"] = {
		src: "http://www.laymark.com/l/m/m108.gif",
		alt: "talk to the hand"
	};
	emoticons[":-c"] = {
		src: "http://www.laymark.com/l/m/m150.gif",
		alt: "call me"
	};
	emoticons[":)]"] = {
		src: "www.laymark.com/l/m/m141.gif",
		alt: "on the phone"
	};
	emoticons["~X("] = {
		src: "http://www.laymark.com/l/m/m133.gif",
		alt: "at wits' end"
	};
	emoticons[":-h"] = {
		src: "http://www.laymark.com/l/m/m118.gif",
		alt: "wave"
	};
	emoticons[":-t"] = {
		src: "http://www.laymark.com/l/m/m191.gif",
		alt: "time out"
	};
	emoticons["8->"] = {
		src: "http://www.laymark.com/l/m/m209.gif",
		alt: "day dreaming"
	};
	emoticons["I-)"] = {
		src: "http://www.laymark.com/l/m/m093.gif",
		alt: "sleepy"
	};
	emoticons["8-|"] = {
		src: "http://www.laymark.com/l/m/m037.gif",
		alt: "rolling eyes"
	};
	emoticons["L-)"] = {
		src: "http://www.laymark.com/l/m/m095.gif",
		alt: "loser"
	};
	emoticons[":-&"] = {
		src: "http://www.laymark.com/l/m/m006.gif",
		alt: "sick"
	};
	emoticons[":-$"] = {
		src: "http://www.laymark.com/l/o/28.gif",
		alt: "don't tell anyone"
	};
	emoticons["[-("] = {
		src: "http://www.laymark.com/l/m/m058.gif",
		alt: "no talking"
	};
	emoticons[":O)"] = {
		src: "http://www.laymark.com/l/m/m000.gif",
		alt: "clown"
	};
	emoticons["8-}"] = {
		src: "http://www.laymark.com/l/m/m053.gif",
		alt: "silly"
	};
	emoticons["<:-P"] = {
		src: "http://www.laymark.com/l/m/m034.gif",
		alt: "party"
	};
	emoticons["(:|"] = {
		src: "http://www.laymark.com/l/m/m047.gif",
		alt: "yawn"
	};
	emoticons["=P~"] = {
		src: "http://www.laymark.com/l/m/m153.gif",
		alt: "drooling"
	};
	emoticons[":-?"] = {
		src: "http://www.laymark.com/l/m/m083.gif",
		alt: "thinking"
	};
	emoticons["#-o"] = {
		src: "http://www.laymark.com/l/m/m097.gif",
		alt: "d'oh"
	};
	emoticons["=D>"] = {
		src: "http://www.laymark.com/l/m/m121.gif",
		alt: "applause"
	};
	emoticons[":-SS"] = {
		src: "http://www.laymark.com/l/m/m196.gif",
		alt: "nail biting"
	};
	emoticons["@-)"] = {
		src: "http://www.laymark.com/l/m/m097.gif",
		alt: "hypnotized"
	};
	emoticons[":^o"] = {
		src: "http://www.laymark.com/l/o/58.gif",
		alt: "liar"
	};
	emoticons[":-w"] = {
		src: "http://www.laymark.com/l/m/m080.gif",
		alt: "waiting"
	};
	emoticons[":-<"] = {
		src: "http://www.laymark.com/l/m/m020.gif",
		alt: "sigh"
	};
	emoticons[">:P"] = {
		src: "http://www.laymark.com/l/m/m039.gif",
		alt: "phbbbbt"
	};
	emoticons["<):)"] = {
		src: "http://www.laymark.com/l/o/51.gif",
		alt: "cowboy"
	};
	emoticons["X_X"] = {
		src: "http://www.laymark.com/l/o/52.gif",
		alt: "I don't want to see"
	};
	emoticons[":!!"] = {
		src: "http://www.laymark.com/l/m/m044.gif",
		alt: "hurry up!"
	};
	emoticons["\\m/"] = {
		src: "http://www.laymark.com/l/m/m141.gif",
		alt: "rock on!"
	};
	emoticons[":-q"] = {
		src: "http://www.laymark.com/l/m/m089.gif",
		alt: "thumbs down"
	};
	emoticons[":-bd"] = {
		src: "http://www.laymark.com/l/o/105.gif",
		alt: "thumbs up"
	};
	emoticons["^#(^"] = {
		src: "http://www.laymark.com/l/m/m087.gif114.gif",
		alt: "it wasn't me"
	};
	emoticons[":ar!"] = {
		src: "http://l.yimg.com/a/i/us/msg/emoticons/pirate_2.gif",
		alt: "pirate*"
	};
	emoticons[":o3"] = {
		src: "http://www.laymark.com/l/m/m087.gif108.gif",
		alt: "puppy dog eyes"
	};
	emoticons[":-??"] = {
		src: "http://www.laymark.com/l/m/m052.gif",
		alt: "I don't know"
	};
	emoticons["%-("] = {
		src: "http://www.laymark.com/l/m/m087.gif107.gif",
		alt: "not listening"
	};
	emoticons[":@)"] = {
		src: "http://www.laymark.com/l/m/m106.gif",
		alt: "pig"
	};
	emoticons["3:-O"] = {
		src: "http://www.laymark.com/l/m/m087.gif50.gif",
		alt: "cow"
	};
	emoticons[":(|)"] = {
		src: "http://www.laymark.com/l/m/m087.gif51.gif",
		alt: "monkey"
	};
	emoticons["~:>"] = {
		src: "http://www.laymark.com/l/m/m087.gif52.gif",
		alt: "chicken"
	};
	emoticons["@};-"] = {
		src: "http://www.laymark.com/l/m/m087.gif53.gif",
		alt: "rose"
	};
	emoticons["%%-"] = {
		src: "http://www.laymark.com/l/m/m087.gif54.gif",
		alt: "good luck"
	};
	emoticons["**=="] = {
		src: "http://www.laymark.com/l/m/m087.gif55.gif",
		alt: "flag"
	};
	emoticons["(~~)"] = {
		src: "http://www.laymark.com/l/m/m087.gif56.gif",
		alt: "pumpkin"
	};
	emoticons["~O)"] = {
		src: "http://www.laymark.com/l/m/m087.gif57.gif",
		alt: "coffee"
	};
	emoticons["*-:)"] = {
		src: "http://www.laymark.com/l/m/m161.gif",
		alt: "idea"
	};
	emoticons["8-X"] = {
		src: "http://www.laymark.com/l/m/m134.gif",
		alt: "skull"
	};
	emoticons["=:)"] = {
		src: "http://www.laymark.com/l/m/m087.gif60.gif",
		alt: "bug"
	};
	emoticons[">-)"] = {
		src: "http://www.laymark.com/l/m/m132.gif",
		alt: "alien"
	};
	emoticons[":-L"] = {
		src: "http://www.laymark.com/l/m/m029.gif",
		alt: "frustrated"
	};
	emoticons["[-O<"] = {
		src: "http://www.laymark.com/l/m/m058.gif",
		alt: "praying"
	};
	emoticons["$-)"] = {
		src: "http://www.laymark.com/l/m/m151.gif",
		alt: "money eyes"
	};
	emoticons[":-\""] = {
		src: "http://www.laymark.com/l/m/m122.gif",
		alt: "whistling"
	};
	emoticons["b-("] = {
		src: "http://www.laymark.com/l/o/107.gif",
		alt: "feeling beat up"
	};
	emoticons[":)>-"] = {
		src: "http://www.laymark.com/l/m/m087.gif67.gif",
		alt: "peace sign"
	};
	emoticons["[-X"] = {
		src: "http://www.laymark.com/l/m/m145.gif",
		alt: "shame on you"
	};
	emoticons["\\:D/"] = {
		src: "http://www.laymark.com/l/m/m087.gif69.gif",
		alt: "dancing"
	};
	emoticons[">:/"] = {
		src: "http://www.laymark.com/l/m/m087.gif70.gif",
		alt: "bring it on"
	};
	emoticons[";))"] = {
		src: "http://www.laymark.com/l/m/m131.gif",
		alt: "hee hee"
	};
	emoticons[":-@"] = {
		src: "http://www.laymark.com/l/m/m087.gif76.gif",
		alt: "chatterbox"
	};
	emoticons["^:)^"] = {
		src: "http://www.laymark.com/l/m/m178.gif",
		alt: "not worthy"
	};
	emoticons[":-j"] = {
		src: "http://www.laymark.com/l/m/m009.gif",
		alt: "oh go on"
	};
	emoticons["(*)"] = {
		src: "http://www.laymark.com/l/m/m087.gif79.gif",
		alt: "star"
	};
	emoticons["o->"] = {
		src: "http://www.laymark.com/l/m/m087.gif72.gif",
		alt: "hiro"
	};
	emoticons["o=>"] = {
		src: "http://www.laymark.com/l/m/m087.gif73.gif",
		alt: "billy"
	};
	emoticons["o-+"] = {
		src: "http://www.laymark.com/l/m/m087.gif74.gif",
		alt: "april"
	};
	emoticons["(%)"] = {
		src: "http://www.laymark.com/l/m/m087.gif75.gif",
		alt: "yin yang"
	};
	emoticons[":bz"] = {
		src: "http://www.laymark.com/l/m/m087.gif115.gif",
		alt: "bee"
	};
	emoticons["[..]"] = {
		src: "http://l.yimg.com/a/i/us/msg/emoticons/transformer.gif",
		alt: "transformer*"
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

replaceElement(document, yemo);

function listen(evt)
{
	var node = evt.target;
	if (node.nodeType == document.ELEMENT_NODE) 
		replaceElement(node, yemo);
	
	if (node.nodeType == document.TEXT_NODE) {
		var parent = node.parentNode;
		var span = replaceTextNode(node, yemo);
		if (span) 
			parent.replaceChild(span, node);
	}
}		

document.body.addEventListener('DOMNodeInserted', listen, true);