// ==UserScript==
// @name           Facebook smiley
// @namespace      http://scripts.namdx1987.org/
// @description    Replace text emoticon by graphical (currently yahoo) smiley.
// @include        http://www.facebook.com/*
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
	emoticons[":)"] = {
		src: "http://images2.moneysavingexpert.com/images/forum_smilies/rolleyes.gif",
		alt: "happy"
	};
	emoticons[":("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif",
		alt: "sad"
	};
	emoticons[";)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif",
		alt: "winking"
	};
	emoticons[":D"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif",
		alt: "big grin"
	};
	emoticons[";;)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/5.gif",
		alt: "batting eyelashes"
	};
	emoticons[">:D<"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/6.gif",
		alt: "big hug"
	};
	emoticons[":-/"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif",
		alt: "confused"
	};
	emoticons[":x"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif",
		alt: "love struck"
	};
	emoticons[":\">"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/9.gif",
		alt: "blushing"
	};
	emoticons[":P"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif",
		alt: "tongue"
	};
	emoticons[":-*"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif",
		alt: "kiss"
	};
	emoticons["=(("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/12.gif",
		alt: "broken heart"
	};
	emoticons[":-O"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif",
		alt: "surprise"
	};
	emoticons["X("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/14.gif",
		alt: "angry"
	};
	emoticons[":>"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/15.gif",
		alt: "smug"
	};
	emoticons["B-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif",
		alt: "cool"
	};
	emoticons[":-S"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif",
		alt: "worried"
	};
	emoticons["#:-S"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/18.gif",
		alt: "whew!"
	};
	emoticons[">:)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/19.gif",
		alt: "devil"
	};
	emoticons[":(("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/20.gif",
		alt: "crying"
	};
	emoticons[":))"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/21.gif",
		alt: "laughing"
	};
	emoticons[":|"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/22.gif",
		alt: "straight face"
	};
	emoticons["/:)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/23.gif",
		alt: "raised eyebrows"
	};
	emoticons["=))"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/24.gif",
		alt: "rolling on the floor"
	};
	emoticons["O:-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif",
		alt: "angel"
	};
	emoticons[":-B"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif",
		alt: "nerd"
	};
	emoticons["=;"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/27.gif",
		alt: "talk to the hand"
	};
	emoticons[":-c"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/101.gif",
		alt: "call me"
	};
	emoticons[":)]"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/100.gif",
		alt: "on the phone"
	};
	emoticons["~X("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/102.gif",
		alt: "at wits' end"
	};
	emoticons[":-h"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/103.gif",
		alt: "wave"
	};
	emoticons[":-t"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/104.gif",
		alt: "time out"
	};
	emoticons["8->"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif",
		alt: "day dreaming"
	};
	emoticons["I-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif",
		alt: "sleepy"
	};
	emoticons["8-|"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/29.gif",
		alt: "rolling eyes"
	};
	emoticons["L-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/30.gif",
		alt: "loser"
	};
	emoticons[":-&"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/31.gif",
		alt: "sick"
	};
	emoticons[":-$"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/32.gif",
		alt: "don't tell anyone"
	};
	emoticons["[-("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/33.gif",
		alt: "no talking"
	};
	emoticons[":O)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/34.gif",
		alt: "clown"
	};
	emoticons["8-}"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/35.gif",
		alt: "silly"
	};
	emoticons["<:-P"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/36.gif",
		alt: "party"
	};
	emoticons["(:|"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/37.gif",
		alt: "yawn"
	};
	emoticons["=P~"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/38.gif",
		alt: "drooling"
	};
	emoticons[":-?"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/39.gif",
		alt: "thinking"
	};
	emoticons["#-o"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/40.gif",
		alt: "d'oh"
	};
	emoticons["=D>"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/41.gif",
		alt: "applause"
	};
	emoticons[":-SS"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/42.gif",
		alt: "nail biting"
	};
	emoticons["@-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/43.gif",
		alt: "hypnotized"
	};
	emoticons[":^o"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/44.gif",
		alt: "liar"
	};
	emoticons[":-w"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/45.gif",
		alt: "waiting"
	};
	emoticons[":-<"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/46.gif",
		alt: "sigh"
	};
	emoticons[">:P"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/47.gif",
		alt: "phbbbbt"
	};
	emoticons["<):)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/48.gif",
		alt: "cowboy"
	};
	emoticons["X_X"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/109.gif",
		alt: "I don't want to see"
	};
	emoticons[":!!"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/110.gif",
		alt: "hurry up!"
	};
	emoticons["\\m/"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/111.gif",
		alt: "rock on!"
	};
	emoticons[":-q"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/112.gif",
		alt: "thumbs down"
	};
	emoticons[":-bd"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/113.gif",
		alt: "thumbs up"
	};
	emoticons["^#(^"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/114.gif",
		alt: "it wasn't me"
	};
	emoticons[":ar!"] = {
		src: "http://l.yimg.com/a/i/us/msg/emoticons/pirate_2.gif",
		alt: "pirate*"
	};
	emoticons[":o3"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/108.gif",
		alt: "puppy dog eyes"
	};
	emoticons[":-??"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/106.gif",
		alt: "I don't know"
	};
	emoticons["%-("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/107.gif",
		alt: "not listening"
	};
	emoticons[":@)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/49.gif",
		alt: "pig"
	};
	emoticons["3:-O"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/50.gif",
		alt: "cow"
	};
	emoticons[":(|)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/51.gif",
		alt: "monkey"
	};
	emoticons["~:>"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/52.gif",
		alt: "chicken"
	};
	emoticons["@};-"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/53.gif",
		alt: "rose"
	};
	emoticons["%%-"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/54.gif",
		alt: "good luck"
	};
	emoticons["**=="] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/55.gif",
		alt: "flag"
	};
	emoticons["(~~)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/56.gif",
		alt: "pumpkin"
	};
	emoticons["~O)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/57.gif",
		alt: "coffee"
	};
	emoticons["*-:)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/58.gif",
		alt: "idea"
	};
	emoticons["8-X"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/59.gif",
		alt: "skull"
	};
	emoticons["=:)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/60.gif",
		alt: "bug"
	};
	emoticons[">-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/61.gif",
		alt: "alien"
	};
	emoticons[":-L"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/62.gif",
		alt: "frustrated"
	};
	emoticons["[-O<"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/63.gif",
		alt: "praying"
	};
	emoticons["$-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/64.gif",
		alt: "money eyes"
	};
	emoticons[":-\""] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/65.gif",
		alt: "whistling"
	};
	emoticons["b-("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/66.gif",
		alt: "feeling beat up"
	};
	emoticons[":)>-"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/67.gif",
		alt: "peace sign"
	};
	emoticons["[-X"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/68.gif",
		alt: "shame on you"
	};
	emoticons["\\:D/"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/69.gif",
		alt: "dancing"
	};
	emoticons[">:/"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/70.gif",
		alt: "bring it on"
	};
	emoticons[";))"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/71.gif",
		alt: "hee hee"
	};
	emoticons[":-@"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/76.gif",
		alt: "chatterbox"
	};
	emoticons["^:)^"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/77.gif",
		alt: "not worthy"
	};
	emoticons[":-j"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/78.gif",
		alt: "oh go on"
	};
	emoticons["(*)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/79.gif",
		alt: "star"
	};
	emoticons["o->"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/72.gif",
		alt: "hiro"
	};
	emoticons["o=>"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/73.gif",
		alt: "billy"
	};
	emoticons["o-+"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/74.gif",
		alt: "april"
	};
	emoticons["(%)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/75.gif",
		alt: "yin yang"
	};
	emoticons[":bz"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/115.gif",
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