// ==UserScript==
// @name           IMz Smiley for Facebook beta 1.1
// @namespace      http://indomp3z.us
// @description    Replace text emoticon by graphical (currently IMz) smiley.
// @include        http://www.facebook.com/*
// @version        1.1 beta
// @author         Aryv Kurniawan IMz [buk4n_p4hl4w4n]
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
	emoticons[":tembak:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/gun2.gif",
		alt: "gun"
	};
	emoticons[":puff82:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/puff82.gif",
		alt: "puff82"
	};
	emoticons[":damai:"] = {
		src: "http://www.indomp3z.us/images/smilies/damai.gif",
		alt: "damai"
	};
	emoticons[":D"] = {
		src: "http://www.indomp3z.us/images/smilies/biggrin.gif",
		alt: "big grin"
	};
	emoticons[":no:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/nono.gif",
		alt: "nonono"
	};
	emoticons[":giggling:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/giggling.gif",
		alt: "giggling"
	};
	emoticons[":mikir:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/mikir.gif",
		alt: "mikir"
	};
	emoticons[":damn:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/4_14_1.gif",
		alt: "damn"
	};
	emoticons[":marah:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/mad.gif",
		alt: "marah"
	};
	emoticons[":hjerte:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/nyolong/hjerte.gif",
		alt: "hjerte"
	};
	emoticons[":mumet:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/mumet.gif",
		alt: "mumet"
	};
	emoticons[":hm:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/4_12_5%5B1%5D.gif",
		alt: "hm"
	};
	emoticons[":tepuk:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/clapping.gif",
		alt: "tepuk"
	};
	emoticons[":puff50:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/puff50.gif",
		alt: "puff50"
	};
	emoticons[":barkenthu:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/barkenthu.gif",
		alt: "barkenthu"
	};
	emoticons[":kiss:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/kissbounce.gif",
		alt: "kiss"
	};
	emoticons[":close:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/close.gif",
		alt: "close"
	};
	emoticons[":meneng:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/menengo.gif",
		alt: "menengo"
	};
	emoticons[":tabrakan:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/tabrakan.gif",
		alt: "tabrakan"
	};
	emoticons[":ngguyu:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/laugh.gif",
		alt: "laugh"
	};
	emoticons[":cake:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/nyolong/cake.gif",
		alt: "cake"
	};
	emoticons[":loveme:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/loveme.gif",
		alt: "loveme"
	};
	emoticons[":guling:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/4_1_205%5B1%5D.gif",
		alt: "guling"
	};
	emoticons[":sensor:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/censored.gif",
		alt: "cencor"
	};
	emoticons[":puff34:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/puff34.gif",
		alt: "puff34"
	};
	emoticons[":cial:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/cial.gif",
		alt: "cial"
	};
	emoticons[":bye:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/action-smiley-069.gif",
		alt: "bye"
	};
	emoticons[":buahaha:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/buahaha.gif",
		alt: "buahaha"
	};
	emoticons[":prex:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/ahprex.gif",
		alt: "prex"
	};
	emoticons[":beer:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/smiley_beer.gif",
		alt: "beer"
	};
	emoticons[":nyerah"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/surrender.gif",
		alt: "nyerah"
	};
	emoticons[":kuda:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/kuda.gif",
		alt: "kuda"
	};
	emoticons[":brokenheart:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/23_30_108%5B1%5D.gif",
		alt: "brokenheart"
	};
	emoticons[":pukul:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/bash.gif",
		alt: "pukul"
	};
	emoticons[":puff26:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/puff26.gif",
		alt: "puff26"
	};
	emoticons[":guesuka:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/guesuka.gif",
		alt: "guesuka"
	};
	emoticons[":spam:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/spamqqq.gif",
		alt: "spam"
	};
	emoticons[":Back_2_Topic_2:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/Back_2_Topic_2.gif",
		alt: "Back_2_Topic_2"
	};
	emoticons[":duduaku:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/duduaku.gif",
		alt: "duduaku"
	};
	emoticons[":plak:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/4_11_7.gif",
		alt: "plak"
	};
	emoticons[":scooter:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/scooter.gif",
		alt: "scooter"
	};
	emoticons[":kereta:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/kereta.gif",
		alt: "kereta"
	};
	emoticons[":ngokar:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/15_4_115%5B1%5D.gif",
		alt: "ngokar"
	};
	emoticons[":rock:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/rockband.gif",
		alt: "rock"
	};
	emoticons[":puff16:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/puff16.gif",
		alt: "puff16"
	};
	emoticons[":ngupil:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/ngupil.gif",
		alt: "ngupil"
	};
	emoticons[":haha:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/24haha.gif",
		alt: "haha"
	};
	emoticons[":43:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/43.gif",
		alt: "43"
	};
	emoticons[":gebukan:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/gebuk.gif",
		alt: "gebukan"
	};
	emoticons[":rockon:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/rockon.gif",
		alt: "rock on"
	};
	emoticons[":help:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/help.gif",
		alt: "help"
	};
	emoticons[":bunga:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/11_1_218v%5B1%5D.gif",
		alt: "bunga"
	};
	emoticons[":puff9:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/puff9.gif",
		alt: "puff9"
	};
	emoticons[":talktomyhand:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/talktomyhand.gif",
		alt: "talktomyhand"
	};
	emoticons[":monyet:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/732572.gif",
		alt: "monyet"
	};
	emoticons[":42:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/42.gif",
		alt: "42"
	};
	emoticons[":bubye:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/bye.gif",
		alt: "bubye"
	};
	emoticons[":ngacir:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/ngacir.gif",
		alt: "ngacir"
	};
	emoticons[":ngek:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/26_28_3%5B1%5D.gif",
		alt: "ngek"
	};
	emoticons[":stupid:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/poster_stupid.gif",
		alt: "stupid"
	};
	emoticons[":hello:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/hello.gif",
		alt: "hello"
	};
	emoticons[":mad:"] = {
		src: "http://www.indomp3z.us/images/smilies/mad.gif",
		alt: "mad"
	};
	emoticons[":pet:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/10_1_133%5B1%5D.gif",
		alt: "pet"
	};
	emoticons[":gun:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/machinegun.gif",
		alt: "gun"
	};
	emoticons[":puff8:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/puff8.gif",
		alt: "puff8"
	};
	emoticons[":cocotmu:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/cocotmu.gif",
		alt: "cocotmu"
	};
	emoticons[":top:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/ur.gif",
		alt: "top"
	};
	emoticons[":41:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/41.gif",
		alt: "41"
	};
	emoticons[":what:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/what.gif",
		alt: "what"
	};
	emoticons[":malu:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/malu.gif",
		alt: "malu"
	};
	emoticons[":gebuk:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/10_9_210%5B1%5D.gif",
		alt: "gebuk"
	};
	emoticons[":ops:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/poster_oops.gif",
		alt: "ops"
	};
	emoticons[":dugem:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/dugem.gif",
		alt: "dugem"
	};
	emoticons[":ketapel:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/10_1_13%5B1%5D.gif",
		alt: "ketapel"
	};
	emoticons[":director:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/director.gif",
		alt: "director"
	};
	emoticons[":puff7:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/puff7.gif",
		alt: "puff7"
	};
	emoticons[":asuasu:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/asuasuasu.gif",
		alt: "asuasu"
	};
	emoticons[":piss:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/peace.gif",
		alt: "piss"
	};
	emoticons[":40:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/40.gif",
		alt: "40"
	};
	emoticons[":thanks:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/thanks.gif",
		alt: "thanks"
	};
	emoticons[":fuck:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/fuck1.gif",
		alt: "fuck"
	};
	emoticons[":pantat:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/10_6_8%5B1%5D.gif",
		alt: "pantat"
	};
	emoticons["/oot"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/offtopic.gif",
		alt: "oot"
	};
	emoticons[":balapan:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/balapan.gif",
		alt: "balapan"
	};
	emoticons[":ahrupamu:"] = {
		src: "http://www.indomp3z.us/images/smilies/ahrupamu.gif",
		alt: "ahrupamu"
	};
	emoticons[":giles:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/10_1_132%5B1%5D.gif",
		alt: "giles"
	};
	emoticons[":chiken:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/1.gif",
		alt: "chiken"
	};
	emoticons[":puff013:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/puff013.gif",
		alt: "puff013"
	};
	emoticons[":ampundj:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/ampun.gif",
		alt: "ampun dj"
	};
	emoticons[":married:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/married.gif",
		alt: "married"
	};
	emoticons[":8:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/8.gif",
		alt: "8"
	};
	emoticons[":sorry:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/sorry.gif",
		alt: "sorry"
	};
	emoticons[":hump:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/thumb_hump.gif",
		alt: "hump"
	};
	emoticons[":bubuk:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/7_11_116%5B1%5D.gif",
		alt: "bubuk"
	};
	emoticons[":huggie:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/hug.gif",
		alt: "huggie"
	};
	emoticons[":argh:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/argh.gif",
		alt: "argh"
	};
	emoticons[":takmut:"] = {
		src: "http://www.indomp3z.us/images/smilies/takmut.gif",
		alt: "takmut"
	};
	emoticons[";p"] = {
		src: "http://www.indomp3z.us/images/smilies/tongue.gif",
		alt: ";p"
	};
	emoticons[":dj:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/15_8_205%5B1%5D.gif",
		alt: "dj"
	};
	emoticons[":wink:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/wink.gif",
		alt: "wink"
	};
	emoticons[":offtopic:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/offtopic.gif",
		alt: "offtopic"
	};
	emoticons[":capedeh:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/cape.gif",
		alt: "capek deh"
	};
	emoticons[":inlove:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/inlove.gif",
		alt: "in love"
	};
	emoticons[":superman:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/nyolong/superman.gif",
		alt: "superman"
	};
	emoticons[":siul:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/siul.gif",
		alt: "siul"
	};
	emoticons[":bungalayu:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/bungalayu.gif",
		alt: "bunga layu"
	};
	emoticons[":marahin:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/4_2_103%5B1%5D.gif",
		alt: "marahan"
	};
	emoticons[":bday:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/happybday1.gif",
		alt: "bday"
	};
	emoticons[":wahh:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/wah.gif",
		alt: "wahh"
	};
	emoticons[":rupamu:"] = {
		src: "http://www.indomp3z.us/images/smilies/rupamu.gif",
		alt: "rupamu"
	};
	emoticons[";)"] = {
		src: "http://www.indomp3z.us/images/smilies/wink.gif",
		alt: ";)"
	};
	emoticons[":sport:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/sport009.gif",
		alt: "sport"
	};
	emoticons[":shoked:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/shocked.gif",
		alt: "shoked"
	};
	emoticons[":hebat!:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emolucu/hebat!.gif",
		alt: "hebat!"
	};
	emoticons[":kenthu:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/takdung.gif",
		alt: "kenthu"
	};
	emoticons[":duh:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/hammer.gif",
		alt: "duh"
	};
	emoticons[":medalje:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/nyolong/medalje.gif",
		alt: "medalje"
	};
	emoticons[":opps:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/emobaru/opps.gif",
		alt: "opps"
	};
	emoticons[":bingung:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/bolakbalik.gif",
		alt: "bingung"
	};
	emoticons[":dont:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/4_2_109v%5B1%5D.gif",
		alt: "dont"
	};
	emoticons[":rolleyes:"] = {
		src: "http://www.indomp3z.us/images/smilies/rolleyes.gif",
		alt: "rolleyes"
	};
	emoticons[":o"] = {
		src: "http://www.indomp3z.us/images/smilies/redface.gif",
		alt: ":o"
	};
	emoticons[":angel:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/angel.gif",
		alt: "angel"
	};
	emoticons[":)"] = {
		src: "http://www.indomp3z.us/images/smilies/smile.gif",
		alt: ":)"
	};
	emoticons[":eeek:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/eek.gif",
		alt: "transformer*"
	};
	emoticons[":("] = {
		src: "http://www.indomp3z.us/images/smilies/frown.gif",
		alt: ":("
	};
	emoticons[":monyetcool:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/cool.gif",
		alt: "monyetcool"
	};
	emoticons[":confused:"] = {
		src: "http://www.indomp3z.us/images/smilies/confused.gif",
		alt: "confused"
	};
	emoticons[":paw:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/paw.gif",
		alt: "paw"
	};
	emoticons[":beard:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/beard.gif",
		alt: "beard"
	};
	emoticons[":ole:"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/ole.gif",
		alt: "ole"
	};
	emoticons[":cool:"] = {
		src: "http://www.indomp3z.us/images/smilies/cool.gif",
		alt: "cool"
	};
	emoticons[":eek:"] = {
		src: "http://www.indomp3z.us/images/smilies/eek.gif",
		alt: "eek"
	};
	emoticons[":armi"] = {
		src: "http://www.indomp3z.us/images/smilies/icons/armi.gif",
		alt: "armi"
	};
	emoticons[":plisplis:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/8.gif",
		alt: "plisplis"
	};
	emoticons[":senyum:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/3.gif",
		alt: "senyum"
	};
	emoticons[":keplok:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/145.gif",
		alt: "keplok"
	};
	emoticons[":yiha:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/1.gif",
		alt: "yiha"
	};
	emoticons[":kocok:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/29.gif",
		alt: "kocok"
	};
	emoticons[":hmbingung:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/153535.gif",
		alt: "hmbingung"
	};
	emoticons[":skarangjuga:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/24w.gif",
		alt: "skarangjuga"
	};
	emoticons[":ambune:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/30354.gif",
		alt: "ambune"
	};
	emoticons[":nangismbeker:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/24.gif",
		alt: "nangismbeker"
	};
	emoticons[":crewetnan:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/1456.gif",
		alt: "crewetnan"
	};
	emoticons[":hualooooo:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/18.gif",
		alt: "hualooooo"
	};
	emoticons[":mrinding:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/252.gif",
		alt: "mrinding"
	};
	emoticons[":embuhlah:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/17as.gif",
		alt: "embuhlah"
	};
	emoticons[":ide:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/182.gif",
		alt: "ide"
	};
	emoticons[":pissdab:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/14.gif",
		alt: "pissdab"
	};
	emoticons[":cintaku:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/11.gif",
		alt: "cintaku"
	};
	emoticons[":kringeten:"] = {
		src: "http://www.indomp3z.us/images/smilies/emotbaru/10.gif",
		alt: "kringeten"
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