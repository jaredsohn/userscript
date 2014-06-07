// ==UserScript==
// @name           Facebook smiley
// @namespace      http://userscripts.org/
// @description    Mengganti emoticon teks dengan emoticon gambar dari Yahoo, Kaskus dan Facebook chat.
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
	
	
	// Yahoo Messenger Emoticon
	emoticons[":)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif",
		alt: "happy"
	};
	emoticons[":-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif",
		alt: "happy"
	};
	emoticons["=)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/1.gif",
		alt: "happy"
	};
	emoticons[":("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif",
		alt: "sad"
	};
	emoticons[":-("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif",
		alt: "sad"
	};
	emoticons["=("] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/2.gif",
		alt: "sad"
	};
	emoticons[";)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif",
		alt: "winking"
	};
	emoticons[";-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/3.gif",
		alt: "winking"
	};
	emoticons[":D"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif",
		alt: "big grin"
	};
	emoticons[":-D"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/4.gif",
		alt: "big grin"
	};
	emoticons["=D"] = {
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
	emoticons[" :/"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif",
		alt: "confused"
	};
	emoticons["=/"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/7.gif",
		alt: "confused"
	};
	emoticons[":x"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/8.gif",
		alt: "love struck"
	};
	emoticons[":X"] = {
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
	emoticons[":-P"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif",
		alt: "tongue"
	};
	emoticons[":p"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif",
		alt: "tongue"
	};
	emoticons[":-p"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif",
		alt: "tongue"
	};
	emoticons["=p"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif",
		alt: "tongue"
	};
	emoticons["=P"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/10.gif",
		alt: "tongue"
	};
	emoticons[":-*"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/11.gif",
		alt: "kiss"
	};
	emoticons[":*"] = {
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
	emoticons[":O"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif",
		alt: "surprise"
	};
	emoticons["=O"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif",
		alt: "surprise"
	};
	emoticons[":-o"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif",
		alt: "surprise"
	};
	emoticons[":o"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/13.gif",
		alt: "surprise"
	};
	emoticons["=o"] = {
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
	emoticons[" B)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif",
		alt: "cool"
	};
	emoticons[" 8|"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/16.gif",
		alt: "cool"
	};
	emoticons[":-S"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif",
		alt: "worried"
	};
	emoticons[":S"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif",
		alt: "worried"
	};
	emoticons["=S"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif",
		alt: "worried"
	};
	emoticons[":-s"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif",
		alt: "worried"
	};
	emoticons[":s"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/17.gif",
		alt: "worried"
	};
	emoticons["=s"] = {
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
	emoticons["T_T"] = {
		src: "http://tsug.net/style_emoticons/default/cry1.gif",
		alt: "crying"
	};
	emoticons["ToT"] = {
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
	emoticons["=|"] = {
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
	emoticons["O:)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif",
		alt: "angel"
	};
	emoticons["o:)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif",
		alt: "angel"
	};
	emoticons["o:-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/25.gif",
		alt: "angel"
	};
	emoticons[":-B"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif",
		alt: "nerd"
	};
	emoticons[":B"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/26.gif",
		alt: "nerd"
	};
	emoticons["=B"] = {
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
	emoticons[" 8->"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/105.gif",
		alt: "day dreaming"
	};
	emoticons["I-)"] = {
		src: "http://l.yimg.com/us.yimg.com/i/mesg/emoticons7/28.gif",
		alt: "sleepy"
	};
	emoticons[" 8-|"] = {
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
	
	
	
	
	
	// KasKus Emoticon
	emoticons[":ilovekaskus"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_ilovekaskus.gif",
		alt: "csgakmod"
	};
	emoticons[":kiss"] = {
		src: "http://www.kaskus.us/images/smilies/cewek.gif",
		alt: "csgakmod"
	};
	emoticons[":najis"] = {
		src: "http://www.kaskus.us/images/smilies/najis.gif",
		alt: "csgakmod"
	};
	emoticons[":marah"] = {
		src: "http://www.kaskus.us/images/smilies/marah.gif",
		alt: "csgakmod"
	};
	emoticons[":malu"] = {
		src: "http://www.kaskus.us/images/smilies/malu.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_repost1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sup2:"] = {
		src: "http://www.kaskus.us/images/smilies/sundul.gif",
		alt: "csgakmod"
	};
	
	emoticons[":batabig"] = {
		src: "http://www.kaskus.us/images/smilies/s_big_batamerah.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takut"] = {
		src: "http://www.kaskus.us/images/smilies/takut.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpm"] = {
		src: "http://www.kaskus.us/images/smilies/cekpm.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammer"] = {
		src: "http://www.kaskus.us/images/smilies/hammer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":toast"] = {
		src: "http://www.kaskus.us/images/smilies/toastcendol.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cystg"] = {
		src: "http://www.kaskus.us/images/smilies/cystg.gif",
		alt: "csgakmod"
	};
	
	emoticons[":iloveindonesia"] = {
		src: "http://www.kaskus.us/images/smilies/I-Luv-Indonesia.gif",
		alt: "csgakmod"
	};
	
	emoticons[":maho"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_maho.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nosara"] = {
		src: "http://www.kaskus.us/images/smilies/nosara.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berduka"] = {
		src: "http://www.kaskus.us/images/smilies/berduka.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakak"] = {
		src: "http://www.kaskus.us/images/smilies/ngakak.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost2"] = {
		src: "http://www.kaskus.us/images/smilies/s_sm_repost2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendolbig"] = {
		src: "http://www.kaskus.us/images/smilies/s_big_cendol.gif",
		alt: "csgakmod"
	};
	
	emoticons[":recsel"] = {
		src: "http://www.kaskus.us/images/smilies/recseller.gif",
		alt: "csgakmod"
	};
	
	emoticons[" :ngacir2"] = {
		src: "http://www.kaskus.us/images/smilies/ngacir2.gif",
		alt: "csgakmod"
	};

	emoticons[":bingung"] = {
		src: "http://www.kaskus.us/images/smilies/bingung.gif",
		alt: "csgakmod"
	};
	emoticons[":bingung:"] = {
		src: "http://www.kaskus.us/images/smilies/bolakbalik.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cd"] = {
		src: "http://www.kaskus.us/images/smilies/capede.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hoax"] = {
		src: "http://www.kaskus.us/images/smilies/hoax.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendols"] = {
		src: "http://www.kaskus.us/images/smilies/cendols.gif",
		alt: "csgakmod"
	};
	emoticons[":iloveindonesias"] = {
		src: "http://www.kaskus.us/images/smilies/iloveindonesias.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berdukas"] = {
		src: "http://www.kaskus.us/images/smilies/berdukas.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bingungs"] = {
		src: "http://www.kaskus.us/images/smilies/bingungs.gif",
		alt: "csgakmod"
	};
	
	emoticons[":najiss"] = {
		src: "http://www.kaskus.us/images/smilies/najiss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ilovekaskuss"] = {
		src: "http://www.kaskus.us/images/smilies/iluvkaskuss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mads"] = {
		src: "http://www.kaskus.us/images/smilies/mads.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sundulgans"] = {
		src: "http://www.kaskus.us/images/smilies/sundulgans.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammers"] = {
		src: "http://www.kaskus.us/images/smilies/hammers.gif",
		alt: "csgakmod"
	};
	
	emoticons[":batas"] = {
		src: "http://www.kaskus.us/images/smilies/batas.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cekpms"] = {
		src: "http://www.kaskus.us/images/smilies/cekpms.gif",
		alt: "csgakmod"
	};
	
	emoticons[":capedes"] = {
		src: "http://www.kaskus.us/images/smilies/capedes.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mahos"] = {
		src: "http://www.kaskus.us/images/smilies/mahos.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malus"] = {
		src: "http://www.kaskus.us/images/smilies/malus.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kisss"] = {
		src: "http://www.kaskus.us/images/smilies/kisss.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngakaks"] = {
		src: "http://www.kaskus.us/images/smilies/ngakaks.gif",
		alt: "csgakmod"
	};
	
	emoticons[":takuts"] = {
		src: "http://www.kaskus.us/images/smilies/takuts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":reposts"] = {
		src: "http://www.kaskus.us/images/smilies/reposts.gif",
		alt: "csgakmod"
	};
	
	emoticons[":genit:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q03.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tabrakan:"] = {
		src: "http://www.kaskus.us/images/smilies/tabrakan.gif",
		alt: "csgakmod"
	};
	
	emoticons[":linux1:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/25.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nohope:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q11.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/1.gif",
		alt: "csgakmod"
	};
	emoticons[":fuck3:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/fuck-8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":doctor:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/18.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rose:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/34.gif",
		alt: "csgakmod"
	};
	
	emoticons[":angel:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/017.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kagets:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":eek:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/4.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fm:"] = {
		src: "http://www.kaskus.us/images/smilies/smileyfm329wj.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/fuck-4.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hammer:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rolleyes:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/01.gif",
		alt: "csgakmod"
	};
	
	emoticons[":amazed:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/amazed.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shutup:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/5.gif",
		alt: "csgakmod"
	};
	
	emoticons[":berbusa:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q20.gif",
		alt: "csgakmod"
	};
	emoticons[":thumbdown"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/48.gif",
		alt: "csgakmod"
	};
	
	emoticons[":heart:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/37.gif",
		alt: "csgakmod"
	};
	
	emoticons[":linux2:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/26.gif",
		alt: "csgakmod"
	};
	
	emoticons[":matabelo:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/004.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kissmouth"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/36.gif",
		alt: "csgakmod"
	};
	emoticons[":siul:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/020.gif",
		alt: "csgakmod"
	};
	
	emoticons[":army:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/24.gif",
		alt: "csgakmod"
	};
	
	emoticons[":confused:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/7.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ngacir:"] = {
		src: "http://www.kaskus.us/images/smilies/ngacir.gif",
		alt: "csgakmod"
	};
	
	
	emoticons[":ngacir"] = {
		src: "http://static.kaskus.us/images/smilies/ngacir3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":fuck2:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/fuck-6.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tv:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/44.gif",
		alt: "csgakmod"
	};
	
	emoticons[":medicine:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/33.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kissing:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/014.gif",
		alt: "csgakmod"
	};
	
	emoticons[":wowcantik"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/001.gif",
		alt: "csgakmod"
	};
	
	emoticons[":mad:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/12.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ck"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/kaskuslove.gif",
		alt: "csgakmod"
	};
	
	emoticons[":flower:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/e03.gif",
		alt: "csgakmod"
	};
	
	emoticons[":coffee:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/31.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sun:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/008.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bikini:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/vana-bum-vanaweb-dot-com.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cool:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/05.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cool"] = {
		src: "http://static.kaskus.us/images/smilies/cool2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bola"] = {
		src: "http://static.kaskus.us/images/smilies/bola.gif",
		alt: "csgakmod"
	};
	
	emoticons[":jrb:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_1.gif",
		alt: "csgakmod"
	};
	
	emoticons[":gila:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/crazy.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rain:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/60.gif",
		alt: "csgakmod"
	};
	
	emoticons[":present:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/40.gif",
		alt: "csgakmod"
	};
	
	emoticons[":think:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/006.gif",
		alt: "csgakmod"
	};
	
	emoticons[":beer:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/smiley_beer.gif",
		alt: "csgakmod"
	};
	
	emoticons[":shakehand"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/49.gif",
		alt: "csgakmod"
	};

	emoticons[":shakehand2"] = {
		src: "http://www.kaskus.us/images/smilies/shakehand2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":breakheart"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/38.gif",
		alt: "csgakmod"
	};
	
	emoticons[":babi:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/27.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Peace:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/005.gif",
		alt: "csgakmod"
	};
	
	emoticons[":afro:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/kribo.gif",
		alt: "csgakmod"
	};
	
	emoticons[":repost:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_7.gif",
		alt: "csgakmod"
	};
	
	emoticons[":bigo:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_3.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cd:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kbgt:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_4.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kacau:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_8.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kts:"] = {
		src: "http://www.kaskus.us/images/smilies/fd_6.gif",
		alt: "csgakmod"
	};
	
	emoticons[":sup:"] = {
		src: "http://static.kaskus.us/images/smilies/fd_5.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nangis"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/mewek.gif",
		alt: "csgakmod"
	};
	
	emoticons[":rate:"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/rate.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ht:"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/hotrit.gif",
		alt: "csgakmod"
	};
	
	emoticons[":salam"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/sungkem.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hope"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/hope.gif",
		alt: "csgakmod"
	};
	
	emoticons[":malu2"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/malu2.gif",
		alt: "csgakmod"
	};
	
	emoticons[":pertamax"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/pertamax.gif",
		alt: "csgakmod"
	};
	
	emoticons[":nerd"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/nerd.gif",
		alt: "csgakmod"
	};
	
	emoticons[":alay"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/alay.gif",
		alt: "csgakmod"
	};
	
	emoticons[":cendol2"] = {
		src: "http://fadilz.blog.csmod.uk.to/wp-content/plugins/kaskus-emoticons/emoticons/tambahan-kaskuser/cendol.gif",
		alt: "csgakmod"
	};
	emoticons[":kodok"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/iwig2a.gif",
		alt: "csgakmod"
	};
	emoticons[":lol"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/Lips.gif",
		alt: "csgakmod"
	};
	emoticons[":gitar"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/Guitar.gif",
		alt: "csgakmod"
	};
	emoticons[":joget"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/nari2.gif",
		alt: "csgakmod"
	};
	emoticons[":kapak"] = {
		src: "http://i43.tinypic.com/2q354j9.gif",
		alt: "csgakmod"
	};
	emoticons[":metal"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/Punk.gif",
		alt: "csgakmod"
	};
	emoticons[":malu3"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/malu2.gif",
		alt: "csgakmod"
	};
	emoticons[":pisang"] = {
		src: "http://i925.photobucket.com/albums/ad93/kaskusradio/icon%20kaskusbox/party0010.gif",
		alt: "csgakmod"
	};
	
	emoticons[":tai:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/shit-3.gif",
		alt: "csgakmod"
	}
		
	emoticons[":rate1:"] = {
		src: "http://www.kaskus.us/images/rating/rating_1.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate2:"] = {
		src: "http://www.kaskus.us/images/rating/rating_2.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate3:"] = {
		src: "http://www.kaskus.us/images/rating/rating_3.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate4:"] = {
		src: "http://www.kaskus.us/images/rating/rating_4.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate5:"] = {
		src: "http://www.kaskus.us/images/rating/rating_5.gif",
		alt: "csgakmod"
	}
	
	emoticons[":rate5"] = {
		src: "http://static.kaskus.us/images/smilies/rate5.gif",
		alt: "csgakmod"
	}
	
	emoticons[":dp"] = {
		src: "http://www.kaskus.us/images/smilies/dp.gif",
		alt: "csgakmod"
	}
	
	emoticons[":selamat"] = {
		src: "http://www.kaskus.us/images/smilies/selamat.gif",
		alt: "csgakmod"
	}
	
	emoticons[":2thumbup"] = {
		src: "http://www.kaskus.us/images/smilies/jempol2.gif",
		alt: "csgakmod"
	}
	
	emoticons[":thumbup"] = {
		src: "http://www.kaskus.us/images/smilies/jempol1.gif",
		alt: "csgakmod"
	}

	emoticons[":thumbup:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/47.gif",
		alt: "csgakmod"
	};
	
	emoticons[":metal:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/q17.gif",
		alt: "csgakmod"
	};

	emoticons[":hi:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/hi.gif",
		alt: "csgakmod"
	};
	
	emoticons[":hi:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/hi.gif",
		alt: "csgakmod"
	};

	emoticons[":peluk"] = {
		src: "http://www.kaskus.us/images/smilies/peluk.gif",
		alt: "csgakmod"
	};
	
	emoticons[":anjing:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/29.gif",
		alt: "csgakmod"
	};

	emoticons[":moon:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/007.gif",
		alt: "csgakmod"
	};
	
	emoticons[":baby:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/30.gif",
		alt: "csgakmod"
	};
	
	emoticons[":travel"] = {
		src: "http://static.kaskus.us/images/smilies/traveller.gif",
		alt: "csgakmod"
	};
	
	emoticons[":kucing:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/28.gif",
		alt: "csgakmod"
	};
	
	emoticons[":norose:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/35.gif",
		alt: "csgakmod"
	};
	
	emoticons[":Onigiri:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/rice.gif",
		alt: "csgakmod"
	};
	
	emoticons[":ricebowl:"] = {
		src: "http://www.kaskus.us/images/smilies/sumbangan/32.gif",
		alt: "csgakmod"
	};
	emoticons[":mewek"] = {
		src: "http://www.kaskus.us/images/smilies/mewek.gif",
		alt: "csgakmod"
	};
	emoticons[":angel"] = {
		src: "http://www.kaskus.us/images/smilies/angel1.gif",
		alt: "csgakmod"
	};
	emoticons[":matabelo"] = {
		src: "http://www.kaskus.us/images/smilies/matabelo1.gif",
		alt: "csgakmod"
	};
	emoticons[":request"] = {
		src: "http://static.kaskus.us/images/smilies/request.gif",
		alt: "csgakmod"
	};
	emoticons[":kr"] = {
		src: "http://static.kaskus.us/images/smilies/kaskus_radio.gif",
		alt: "csgakmod"
	};
	emoticons[":nohope"] = {
		src: "http://static.kaskus.us/images/smilies/nohope.gif",
		alt: "csgakmod"
	};
	emoticons[":sorry"] = {
		src: "http://static.kaskus.us/images/smilies/sorry.gif",
		alt: "csgakmod"
	};
	emoticons[":kimpoi"] = {
		src: "http://static.kaskus.us/images/smilies/kimpoi.gif",
		alt: "csgakmod"
	}; 
	emoticons[":kimpoi:"] = {
		src: "http://static.kaskus.us/images/smilies/sumbangan/smiley_couple.gif",
		alt: "csgakmod"
	}; 
	emoticons[":ultah"] = {
		src: "http://static.kaskus.us/images/smilies/ultah.gif",
		alt: "csgakmod"
	}; 
	emoticons[":salahkamar"] = {
		src: "http://static.kaskus.us/images/smilies/salah_kamar.gif",
		alt: "csgakmod"
	}; 
	emoticons[" :babyboy1"] = {
		src: "http://static.kaskus.us/images/smilies/babyboy1.gif",
		alt: "csgakmod"
	};
	emoticons[":babyboy"] = {
		src: "http://static.kaskus.us/images/smilies/babyboy.gif",
		alt: "csgakmod"
	};
	emoticons[":babygirl"] = {
		src: "http://static.kaskus.us/images/smilies/babygirl.gif",
		alt: "csgakmod"
	};
	emoticons[":sorry"] = {
		src: "http://static.kaskus.us/images/smilies/sorry.gif",
		alt: "csgakmod"
	};
	emoticons[":sorry"] = {
		src: "http://static.kaskus.us/images/smilies/sorry.gif",
		alt: "csgakmod"
	};
	
	
	
	
	// Facebook Emoticon
	
	emoticons["\(^^^\)"] = {
		src: "http://3.bp.blogspot.com/_o0z7HPmXX6w/S0PrAvvLSqI/AAAAAAAABWg/zLRiVXv-XyI/s200/fbshark.gif",
		alt: "shark"
	}; 
	emoticons[":putnam:"] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0Pq_-3p4vI/AAAAAAAABWQ/2qe3G3Hz_sw/s200/fbputnam.gif",
		alt: "chris putnam"
	}; 
	
	emoticons["XD"] = {
		src: "http://www.indowebster.web.id/images/smilies/onion-11.gif",
		alt: "onion XD"
	}; 
	emoticons["xD"] = {
		src: "http://www.indowebster.web.id/images/smilies/onion-11.gif",
		alt: "onion XD"
	};
	
	emoticons["O.o"] = {
		src: "http://4.bp.blogspot.com/_o0z7HPmXX6w/S0PqePeSfCI/AAAAAAAABUg/mon2mHAf-Uo/s200/fbconfused.png",
		alt: "confused"
	};
	emoticons["o.O"] = {
		src: "http://4.bp.blogspot.com/_o0z7HPmXX6w/S0PqePeSfCI/AAAAAAAABUg/mon2mHAf-Uo/s200/fbconfused.png",
		alt: "confused"
	};
	emoticons[":'("] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0PqeZfrCJI/AAAAAAAABUo/7UbSGUEca-A/s200/fbcry.png",
		alt: "cry"
	};
	emoticons[" :3"] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0PqeveOluI/AAAAAAAABUw/ZX2belHq45k/s200/fbcurlylips.png",
		alt: "curly lips"
	};
	emoticons[" =3"] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0PqeveOluI/AAAAAAAABUw/ZX2belHq45k/s200/fbcurlylips.png",
		alt: "curly lips"
	};
	emoticons["3:-)"] = {
		src: "http://1.bp.blogspot.com/_o0z7HPmXX6w/S0PqexTAeEI/AAAAAAAABU4/5HnLQ0hp7-Q/s200/fbdevil.png",
		alt: "satan"
	};
	emoticons["3:)"] = {
		src: "http://1.bp.blogspot.com/_o0z7HPmXX6w/S0PqexTAeEI/AAAAAAAABU4/5HnLQ0hp7-Q/s200/fbdevil.png",
		alt: "satan"
	};
	emoticons["3=)"] = {
		src: "http://1.bp.blogspot.com/_o0z7HPmXX6w/S0PqexTAeEI/AAAAAAAABU4/5HnLQ0hp7-Q/s200/fbdevil.png",
		alt: "satan"
	};
	emoticons[">:("] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0PqpW7zETI/AAAAAAAABVg/_Xg2xskgVHE/s200/fbgrumpy.png",
		alt: "grumpy"
	};
	emoticons[">:-("] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0PqpW7zETI/AAAAAAAABVg/_Xg2xskgVHE/s200/fbgrumpy.png",
		alt: "grumpy"
	};
	emoticons[">.<"] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0PqpW7zETI/AAAAAAAABVg/_Xg2xskgVHE/s200/fbgrumpy.png",
		alt: "grumpy"
	};
	emoticons[">,<"] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0PqpW7zETI/AAAAAAAABVg/_Xg2xskgVHE/s200/fbgrumpy.png",
		alt: "grumpy"
	};
	emoticons[">_<"] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0PqpW7zETI/AAAAAAAABVg/_Xg2xskgVHE/s200/fbgrumpy.png",
		alt: "grumpy"
	};
	emoticons["\<3"] = {
		src: "http://1.bp.blogspot.com/_o0z7HPmXX6w/S0PqyfGOPYI/AAAAAAAABVo/-cZMgOphmXM/s200/fbheart.png",
		alt: "love"
	};
	emoticons["^_^"] = {
		src: "http://3.bp.blogspot.com/_o0z7HPmXX6w/S0Pqyifj9tI/AAAAAAAABVw/Bo1621EwddY/s200/fbkiki.png",
		alt: "kiki smile"
	};
	emoticons["^^v"] = {
		src: "http://tsug.net/style_emoticons/default/a06.gif",
		alt: "peace"
	};
	emoticons["^_^v"] = {
		src: "http://tsug.net/style_emoticons/default/a06.gif",
		alt: "peace"
	};
	emoticons["^^,"] = {
		src: "http://3.bp.blogspot.com/_o0z7HPmXX6w/S0Pqyifj9tI/AAAAAAAABVw/Bo1621EwddY/s200/fbkiki.png",
		alt: "kiki smile"
	};
	emoticons["^ ^,"] = {
		src: "http://3.bp.blogspot.com/_o0z7HPmXX6w/S0Pqyifj9tI/AAAAAAAABVw/Bo1621EwddY/s200/fbkiki.png",
		alt: "kiki smile"
	};
	emoticons[":v"] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0PqzC-0nGI/AAAAAAAABWA/L-FtqZ5CD6M/s200/fbpacman.png",
		alt: "pac man"
	};
	emoticons["=v"] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0PqzC-0nGI/AAAAAAAABWA/L-FtqZ5CD6M/s200/fbpacman.png",
		alt: "pac man"
	};
	emoticons["\<(\")"] = {
		src: "http://3.bp.blogspot.com/_o0z7HPmXX6w/S0PqzUjwJCI/AAAAAAAABWI/G6OT9pGr4oc/s200/fbpenguin.gif",
		alt: "penguin"
	};
	emoticons[":|]"] = {
		src: "http://3.bp.blogspot.com/_o0z7HPmXX6w/S0PrALVVHSI/AAAAAAAABWY/OOVvNg3dj7E/s200/fbrobot.gif",
		alt: "robot"
	};
	emoticons["-_-"] = {
		src: "http://3.bp.blogspot.com/_o0z7HPmXX6w/S0PrBLLBubI/AAAAAAAABWw/OfZx1yC7eGg/s200/fbsquint.png",
		alt: "squint"
	};
	emoticons[">:O"] = {
		src: "http://1.bp.blogspot.com/_o0z7HPmXX6w/S0PrM2EAUaI/AAAAAAAABXQ/GdiATWqiIoM/s200/fbupset.png",
		alt: "upset"
	};
	emoticons[">:-O"] = {
		src: "http://1.bp.blogspot.com/_o0z7HPmXX6w/S0PrM2EAUaI/AAAAAAAABXQ/GdiATWqiIoM/s200/fbupset.png",
		alt: "upset"
	};
	emoticons[">:o"] = {
		src: "http://1.bp.blogspot.com/_o0z7HPmXX6w/S0PrM2EAUaI/AAAAAAAABXQ/GdiATWqiIoM/s200/fbupset.png",
		alt: "upset"
	};
	emoticons[">:-o"] = {
		src: "http://1.bp.blogspot.com/_o0z7HPmXX6w/S0PrM2EAUaI/AAAAAAAABXQ/GdiATWqiIoM/s200/fbupset.png",
		alt: "upset"
	};
	emoticons["8-)"] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0Pqo3Uhv8I/AAAAAAAABVQ/Et2tHXD-1Do/s200/fbglasses.png",
		alt: "glasses"
	};
	emoticons[" 8)"] = {
		src: "http://2.bp.blogspot.com/_o0z7HPmXX6w/S0Pqo3Uhv8I/AAAAAAAABVQ/Et2tHXD-1Do/s200/fbglasses.png",
		alt: "glasses"
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