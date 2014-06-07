// ==UserScript==
// @name           [LYBARY of] MSN emoticons In Facebook
// @namespace      MeMario
// @description    Replace MSN typical text emoticon by MSN smiley.
// @include        http://www.facebook.com/*
// @exclude        http://www.google.*
// @exclude        http://messenger.msn.com/Resource/Emoticons.aspx
// @version        0.2
// @author         MeMario
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
///////////////////////         :) or :-)
	emoticons[":)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/regular_smile.gif",
		alt: ":)"
	};
		emoticons[":-)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/regular_smile.gif",
		alt: ":-)"
	};
emoticons["(:"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/regular_smile.gif",
		alt: "(:"
	};

emoticons["=)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/regular_smile.gif",
		alt: "=)"
	};
///////////////////////         :-O or :o or :O
		emoticons[":O"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/omg_smile.gif",
		alt: ":O"
	};
	emoticons[":-O"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/omg_smile.gif",
		alt: ":-O"
	};
	emoticons[":o"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/omg_smile.gif",
		alt: ":o"
	};
///////////////////////         ;) or ;-)
	emoticons[";)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/wink_smile.gif",
		alt: ";)"
	};
	emoticons[";-)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/wink_smile.gif",
		alt: ";-)"
	};
///////////////////////         :s or :-S
	emoticons[":s"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/confused_smile.gif",
		alt: ":s"
	};
	emoticons[":-S"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/confused_smile.gif",
		alt: ":-)"
	};
///////////////////////         :'(
	emoticons[":'("] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/cry_smile.gif",
		alt: ":'("
	};
///////////////////////         (H) or (h)
	emoticons["(H)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/shades_smile.gif",
		alt: "(H)"
	};
	emoticons["(h)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/shades_smile.gif",
		alt: "(h)"
	};
///////////////////////         (A) or (a)
	emoticons["(A)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/angel_smile.gif",
		alt: "(A)"
	};
	emoticons["(a)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/angel_smile.gif",
		alt: "(a)"
	};
///////////////////////         :-#
	emoticons[":-#"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/47_47.gif",
		alt: ":-#"
	};
///////////////////////         8-|
	emoticons["	8-|"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/49_49.gif",
		alt: "8-|"
	};
///////////////////////         :-*
	emoticons[":-*"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/51_51.gif",
		alt: ":-*"
	};
///////////////////////         :^)
	emoticons[":^)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/71_71.gif",
		alt: ":^)"
	};
///////////////////////         <:o)
	emoticons["<:o)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/74_74.gif",
		alt: "<:o)"
	};
///////////////////////         |-)
	emoticons["|-)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/77_77.gif",
		alt: "|-)"
	};
///////////////////////         (Y) or (y)
	emoticons["(Y)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/thumbs_up.gif",
		alt: "(Y)"
	};
		emoticons["(y)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/thumbs_up.gif",
		alt: "(Y)"
	};
///////////////////////         (B) or (b)	 
	emoticons["(B)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/beer_mug.gif",
		alt: "(B)"
	};
		emoticons["(b)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/beer_mug.gif",
		alt: "(b)"
	};
///////////////////////         (X) or (x)	 
	emoticons["(X)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/girl.gif",
		alt: "(X)"
	};
		emoticons["(x)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/girl.gif",
		alt: "(x)"
	};
///////////////////////         (X) or (x)	 
	emoticons["(X)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/girl.gif",
		alt: "(X)"
	};
		emoticons["(x)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/girl.gif",
		alt: "(x)"
	};
///////////////////////         	({)	 
	emoticons["({)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/guy_hug.gif",
		alt: "({)"
	};
///////////////////////         	:-[ or :[	 
	emoticons[":-["] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/bat.gif",
		alt: ":-["
	};
		emoticons[":["] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/bat.gif",
		alt: ":["
	};
///////////////////////         	(L) or (l) 
	emoticons["(L)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/heart.gif",
		alt: "(L)"
	};
		emoticons["(l)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/heart.gif",
		alt: "(l)"
	};		
///////////////////////         	(K) or (k) 
	emoticons["(K)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/kiss.gif",
		alt: "(K)"
	};
		emoticons["(k)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/kiss.gif",
		alt: "(k)"
	};	
///////////////////////         	(F) or (f) 
	emoticons["(F)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/rose.gif",
		alt: "(F)"
	};
		emoticons["(f)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/rose.gif",
		alt: "(f)"
	};		
///////////////////////         	(P) or (p) 
	emoticons["(P)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/camera.gif",
		alt: "(P)"
	};
		emoticons["(p)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/camera.gif",
		alt: "(p)"
	};	
///////////////////////         	(@) 
	emoticons["(@)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/cat.gif",
		alt: "(@)"
	};
///////////////////////         	(T) or (t)
	emoticons["(T)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/phone.gif",
		alt: "(T)"
	};
	emoticons["(t)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/phone.gif",
		alt: "(t)"
	};
///////////////////////         	(8)
	emoticons["(8)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/note.gif",
		alt: "(8)"
	};
///////////////////////         	(*)
	emoticons["(*)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/star.gif",
		alt: "(*)"
	};		
///////////////////////         	(O) or (o)
	emoticons["(O)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/clock.gif",
		alt: "(O)"
	};	
          emoticons["(o)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/clock.gif",
		alt: "(o)"
	};	
///////////////////////         	(sn)
	emoticons["(sn)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/53_53.gif",
		alt: "(sn)"
	};		
///////////////////////         	(pl)
	emoticons["(pl)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/55_55.gif",
		alt: "(pl)"
	};		
///////////////////////         	(pi)
	emoticons["(pi)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/57_57.gif",
		alt: "(pi)"
	};	
///////////////////////         	(au)
	emoticons["(au)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/59_59.gif",
		alt: "(au)"
	};		
///////////////////////         	(um)
	emoticons["(um)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/61_61.gif",
		alt: "(um)"
	};		
///////////////////////         	(co)
	emoticons["(co)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/63_63.gif",
		alt: "(co)"
	};		
///////////////////////         	(st)
	emoticons["(st)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/66_66.gif",
		alt: "(st)"
	};		
///////////////////////         	(fo)
	emoticons["(fo)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/69_69.gif",
		alt: "(fo)"
	};		
///////////////////////         	:D or :-D or :d
	emoticons[":D"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/teeth_smile.gif",
		alt: ":D"
	};
	emoticons[":-D"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/teeth_smile.gif",
		alt: ":-D"
	};
        emoticons[":d"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/teeth_smile.gif",
		alt: ":d"
	};
///////////////////////         	:-P or :p
	emoticons[":-P"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/tongue_smile.gif",
		alt: ":-P"
	};
	emoticons[":P"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/tongue_smile.gif",
		alt: ":P"
	};
	emoticons[":p"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/tongue_smile.gif",
		alt: ":p"
	};
///////////////////////         	:-( or :(
	emoticons[":-("] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/sad_smile.gif",
		alt: ":-("
	};
	emoticons[":("] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/sad_smile.gif",
		alt: ":("
	};
///////////////////////         	:-| or :|
	emoticons[":-|"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/what_smile.gif",
		alt: ":-|"
	};
	emoticons[":|"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/what_smile.gif",
		alt: ":|"
	};
///////////////////////         	:-$ or :$
	emoticons[":-$"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/red_smile.gif",
		alt: ":-$"
	};
	emoticons[":$"] = {              
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/red_smile.gif",
		alt: ":$"
	};
///////////////////////         	:@ or :-@
	emoticons[":@"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/angry_smile.gif",
		alt: ":@"
	};
	emoticons[":-@"] = {              
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/red_smile.gif",
		alt: ":-@"
	};
///////////////////////         	(6)
	emoticons["(6)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/devil_smile.gif",
		alt: "(6)"
	};
///////////////////////         	8o|
	emoticons["8o|"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/48_48.gif",
		alt: "8o|"
	};
///////////////////////         	^o)
	emoticons["^o)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/50_50.gif",
		alt: "^o)"
	};
///////////////////////         	+o(
	emoticons["+o("] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/52_52.gif",
		alt: "+o("
	};
///////////////////////         	*-)
	emoticons["*-)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/72_72.gif",
		alt: "*-)"
	};
///////////////////////         	8-)
	emoticons["8-)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/75_75.gif",
		alt: "8-)"
	};
///////////////////////         	(C) or (c)
	emoticons["(C)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/coffee.gif",
		alt: "(C)"
	};
    emoticons["(c)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/coffee.gif",
		alt: "(c)"
	};
///////////////////////         	(N) or (n)
	emoticons["(N)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/thumbs_down.gif",
		alt: "(N)"
	};
    emoticons["(n)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/thumbs_down.gif",
		alt: "(n)"
	};
///////////////////////         	(D) or (d)
	emoticons["(D)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/martini.gif",
		alt: "(D)"
	};
    emoticons["(d)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/martini.gif",
		alt: "(d)"
	};
///////////////////////         	(Z) or (z)
	emoticons["(Z)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/guy.gif",
		alt: "(Z)"
	};
    emoticons["(z)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/guy.gif",
		alt: "(z)"
	};
///////////////////////         	((})) 
	emoticons["(})"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/girl_hug.gif",
		alt: "(})"
	};
///////////////////////         	(^) 
	emoticons["(^)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/cake.gif",
		alt: "(^)"
	};
///////////////////////         	(U) or (u) 
	emoticons["(U)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/broken_heart.gif",
		alt: "(U)"
	};

///////////////////////         	</3 
	emoticons["</3"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/broken_heart.gif",
		alt: "</3"
	};
	emoticons["(u)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/broken_heart.gif",
		alt: "(u)"
	};
///////////////////////         	(G) or (g) 
	emoticons["(G)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/present.gif",
		alt: "(G)"
	};
	emoticons["(g)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/present.gif",
		alt: "(g)"
	};
///////////////////////         	(W) or (w) 
	emoticons["(W)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/wilted_rose.gif",
		alt: "(W)"
	};
	emoticons["(w)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/wilted_rose.gif",
		alt: "(w)"
	};	
///////////////////////         	(~)
	emoticons["(~)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/film.gif",
		alt: "(~)"
	};
///////////////////////         	(&)
	emoticons["(&)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/dog.gif",
		alt: "(&)"
	};
///////////////////////         	(I) or (i)
	emoticons["(I)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/lightbulb.gif",
		alt: "(I)"
	};
		emoticons["(i)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/lightbulb.gif",
		alt: "(i)"
	};
///////////////////////         	(S) 
	emoticons["( s )"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/moon.gif",
		alt: "( S )"
	};
///////////////////////         	(M) or (m) 
	emoticons["(M)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/messenger.gif",
		alt: "(M)"
	};
	emoticons["(m)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/messenger.gif",
		alt: "(m)"
	};
///////////////////////         	(bah) 
	emoticons["(bah)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/70_70.gif",
		alt: "(bah)"
	};
///////////////////////         	(||) 
	emoticons["(||)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/56_56.gif",
		alt: "(||)"
	};
///////////////////////         	(so) 
	emoticons["(so)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/58_58.gif",
		alt: "(so)"
	};
///////////////////////         	(ap) 
	emoticons["(ap)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/60_60.gif",
		alt: "(ap)"
	};
///////////////////////         	(ip) 
	emoticons["(ip)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/62_62.gif",
		alt: "(ip)"
	};
///////////////////////         	(mp) 
	emoticons["(mp)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/64_64.gif",
		alt: "(mp)"
	};
///////////////////////         	(li) 
	emoticons["(li)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/73_73.gif",
		alt: "(li)"
	};

///////////////////////         	♥ 
	emoticons["♥"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/heart.gif",
		alt: "♥"
	};

///////////////////////         	<3 
	emoticons["<3"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/heart.gif",
		alt: "<3"
	};
///////////////////////         	(mo) 
	emoticons["(mo)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/69_69.gif",
		alt: "(mo)"
	};
///////////////////////         	(mail) / (MAIL) 
	emoticons["(mail)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/envelope.gif",
		alt: "(mail)"
	};
        emoticons["(MAIL)"] = {
		src: "http://messenger.msn.com/MMM2006-04-19_17.00/Resource/emoticons/envelope.gif",
		alt: "(mail)"
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