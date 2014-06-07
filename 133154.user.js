// ==UserScript==
// @id             Dis Test #1337
// @name           Dis Test #1337
// @namespace      http://singlesanime.blogspot.com
// @description    Dis Test #1337
// @author         Delzon, Modified by Kevterminator
// @icon           http://dl.dropbox.com/u/16954721/web/img/socialmemes.png
// @include        http://www.facebook.com/*
// @version        0.01
// ==/UserScript==

(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml);.uiComposerMessageBoxControls .uiButtonConfirm {position: relative !important; z-index: 9999 !important}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();

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
	
//Other
emoticons[":panic:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/everybodypanic.gif", alt: ":panic:" };
emoticons[":mellow:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/mellow.gif", alt: ":panic:" };
emoticons[":huh:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/huh.gif", alt: ":panic:" };
emoticons["^_^"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/happy.gif", alt: ":panic:" };
emoticons[":o"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/ohmy.gif", alt: ":panic:" };
emoticons[":O"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/ohmy.gif", alt: ":panic:" };
emoticons[":xD:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/xD.gif", alt: ":panic:" };
emoticons[";)"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/wink.gif", alt: ":panic:" };
emoticons[":P"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/tongue.gif", alt: ":panic:" };
emoticons[":D"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/biggrin.gif", alt: ":panic:" };
emoticons[":cool:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/cool.gif", alt: ":panic:" };
emoticons[":rolleyes:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/rolleyes.gif", alt: ":panic:" };
emoticons["-_-"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/sleep.gif", alt: ":panic:" };
emoticons["<_<"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/dry.gif", alt: ":panic:" };
emoticons[":)"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/smile.gif", alt: ":panic:" };
emoticons[":wub:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/wub.gif", alt: ":panic:" };
emoticons[":angry:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/mad.gif", alt: ":panic:" };
emoticons[":("] = { src: "http://www.bf-games.net/forum/style_emoticons/default/sad.gif", alt: ":panic:" };
emoticons[":unsure:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/unsure.gif", alt: ":panic:" };
emoticons[":wacko:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/wacko.gif", alt: ":panic:" };
emoticons[":blink:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/blink.gif", alt: ":panic:" };
emoticons[":ph34r:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/ph34r.gif", alt: ":panic:" };
emoticons[":gehtsnoch:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/gehtsnoch.gif", alt: ":panic:" };
emoticons[":bleh:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/bleh.gif", alt: ":panic:" };
emoticons[":dagegen:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/dagegen2.gif", alt: ":panic:" };
emoticons[":dafür:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/dafuer2.gif", alt: ":panic:" };
emoticons[":danke:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/danke.gif", alt: ":panic:" };
emoticons[":laser:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/spam_laser.gif", alt: ":panic:" };
emoticons["*lol*"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/lol.gif", alt: ":panic:" };
emoticons[":offtopic:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/ot.gif", alt: ":panic:" };
emoticons[":ugly:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/zzz_ugly.gif", alt: ":panic:" };
emoticons["????"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/wtf.gif", alt: ":panic:" };
emoticons["*kotz*"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/kotzen.gif", alt: ":panic:" };
emoticons[":respekt:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/respekt2.gif", alt: ":panic:" };
emoticons[":party:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/feiern.gif", alt: ":panic:" };
emoticons["*argh*"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/shit.gif", alt: ":panic:" };
emoticons[":super:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/super.gif", alt: ":panic:" };
emoticons[":w00t:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/w00t.gif", alt: ":panic:" };
emoticons[":lol:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/lol.gif", alt: ":panic:" };
emoticons[":bye:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/bye2.gif", alt: ":panic:" };
emoticons[":yiiiiha:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/yiiiiha.gif", alt: ":panic:" };
emoticons[":wayne:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/wayne.gif", alt: ":panic:" };
emoticons[":addicted:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/joystick.gif", alt: ":panic:" };
emoticons[":clapping:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/clapping.gif", alt: ":panic:" };
emoticons[":daumenhoch:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/daumenhoch.gif", alt: ":panic:" };
emoticons[":daumenrunter:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/daumenrunter.gif", alt: ":panic:" };
emoticons[":puuuh:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/puuuh.gif", alt: ":panic:" };
emoticons[":rofl:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/rofl.gif", alt: ":panic:" };
emoticons[":hit:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/hitit.gif", alt: ":panic:" };
emoticons[":ermm:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/ermm.gif", alt: ":panic:" };
emoticons[":keks:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/keks.gif", alt: ":panic:" };
emoticons[":awesome:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/awesome.gif", alt: ":panic:" };
emoticons[":trollface:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/trollface.gif", alt: ":panic:" };
emoticons[":heul:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/heul.gif", alt: ":panic:" };
emoticons[":omg:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/omg.gif", alt: ":panic:" };
emoticons[":somuchwin:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/somuchwin.png", alt: ":panic:" };
emoticons[":omfg:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/omfg.gif", alt: ":panic:" };
emoticons[":derb:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/derb.gif", alt: ":panic:" };
emoticons[":aww:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/aww.gif", alt: ":panic:" };
emoticons[":okay:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/okay.gif", alt: ":panic:" };
emoticons[":laugh:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/laugh.gif", alt: ":panic:" };
emoticons[":yeaahh:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/yeaahh.png", alt: ":panic:" };
emoticons[";D"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/zwinker.gif", alt: ":panic:" };
emoticons["D:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/omg.gif", alt: ":panic:" };
emoticons[":welcome:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/willkommen2.gif", alt: ":panic:" };
emoticons["*closed*"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/closed.gif", alt: ":panic:" };
emoticons[":high:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/high.gif", alt: ":panic:" };
emoticons["*gebannt*"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/banned.gif", alt: ":panic:" };
emoticons[":klatsch:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/klatsch.gif", alt: ":panic:" };
emoticons[":zensiert:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/censored.gif", alt: ":panic:" };
emoticons[":locked:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/locked.gif", alt: ":panic:" };
emoticons[":spam2:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/spam2.gif", alt: ":panic:" };
emoticons[":please:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/please.gif", alt: ":panic:" };
emoticons[":nocomment:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/nocomment.gif", alt: ":panic:" };
emoticons[":ban:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/ban.gif", alt: ":panic:" };
emoticons[":wtf:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/wtf2.gif", alt: ":panic:" };
emoticons[":whistling:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/lalala.gif", alt: ":panic:" };
emoticons[":sabber:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/sabber.gif", alt: ":panic:" };
emoticons[":bones:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/bones.gif", alt: ":panic:" };
emoticons[":blush:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/blush.gif", alt: ":panic:" };
emoticons[":muede:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/muede.gif", alt: ":panic:" };
emoticons[":willkommen:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/willkommen.gif", alt: ":panic:" };
emoticons[":flowers:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/flowers.gif", alt: ":panic:" };
emoticons[":sniff:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/sniff.gif", alt: ":panic:" };
emoticons[":music2:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/music2.gif", alt: ":panic:" };
emoticons[":punish2:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/punish2.gif", alt: ":panic:" };
emoticons[":tease:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/tease.gif", alt: ":panic:" };
emoticons[":zip:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/zip.gif", alt: ":panic:" };
emoticons[":punkrock:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/punkrock.gif", alt: ":panic:" };
emoticons[":confused:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/confused.gif", alt: ":panic:" };
emoticons[":dwarf:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/dwarf.gif", alt: ":panic:" };
emoticons[":black_eye:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/black_eye.gif", alt: ":panic:" };
emoticons[":fear2:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/fear2.gif", alt: ":panic:" };
emoticons[":guns:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/guns.gif", alt: ":panic:" };
emoticons[":roflmao:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/roflmao.gif", alt: ":panic:" };
emoticons[":dau:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/dau.gif", alt: ":panic:" };
emoticons[":sauer:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/sauer.gif", alt: ":panic:" };
emoticons[":dash2:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/dash2.gif", alt: ":panic:" };
emoticons[":baeeeeeh:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/baeeeeeh.gif", alt: ":panic:" };
emoticons[":grrrrr:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/grrrrr.gif", alt: ":panic:" };
emoticons[":ohno:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/ohno.gif", alt: ":panic:" };
emoticons[":evil:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/evil.gif", alt: ":panic:" };
emoticons[":ayeaye:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/ayeaye.gif", alt: ":panic:" };
emoticons[":cry3:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/cry3.gif", alt: ":panic:" };
emoticons[":oo:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/oergl.gif", alt: ":panic:" };
emoticons[":popcorn:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/yay.gif", alt: ":panic:" };
emoticons[":popcorn2:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/popcorn2.gif", alt: ":panic:" };
emoticons[":nö:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/noe.gif", alt: ":panic:" };
emoticons[":kritisch:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/kritisch.gif", alt: ":panic:" };
emoticons[":egypt:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/post-2032-1212059578.gif", alt: ":panic:" };
emoticons[":deafdumbblind:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/deafdumbblind.gif", alt: ":panic:" };
emoticons[":fever:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/fever.gif", alt: ":panic:" };
emoticons[":clover:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/clover.gif", alt: ":panic:" };
emoticons[":shuriken:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/shuriken.gif", alt: ":panic:" };
emoticons[":excl:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/excl.gif", alt: ":panic:" };
emoticons[":innocent:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/innocent.gif", alt: ":panic:" };
emoticons[":kiss:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/kiss.gif", alt: ":panic:" };
emoticons[":shifty:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/shifty.gif", alt: ":panic:" };
emoticons[":achkomm:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/achkomm.gif", alt: ":panic:" };
emoticons[":schiri:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/schiri.gif", alt: ":panic:" };
emoticons[":kotzen2:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/kotzen2.gif", alt: ":panic:" };
emoticons[":muckibude:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/muckibude.gif", alt: ":panic:" };
emoticons[":affe:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/affe.gif", alt: ":panic:" };
emoticons[":grins:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/grins.gif", alt: ":panic:" };
emoticons[":0o:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/0o.gif", alt: ":panic:" };
emoticons[":shit2:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/shit2.gif", alt: ":panic:" };
emoticons[":ugly2:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/ugly2.gif", alt: ":panic:" };
emoticons[":wtfgtfo:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/wtfgtfo.gif", alt: ":panic:" };
emoticons[":guckstdu:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/guckstdu.gif", alt: ":panic:" };
emoticons[":whiplash:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/whiplash.gif", alt: ":panic:" };
emoticons[":buddies:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/buddies.gif", alt: ":panic:" };
emoticons[":facepalm:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/facepalm.gif", alt: ":panic:" };
emoticons[":allesklar:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/allesklar.gif", alt: ":panic:" };
emoticons[":tumbleweed:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/tumbleweed.gif", alt: ":panic:" };
emoticons[":fox:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/fox.gif", alt: ":panic:" };
emoticons[";-)"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/wink2.gif", alt: ":panic:" };
emoticons[":shitstorm:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/shitstorm.gif", alt: ":panic:" };
emoticons[":gangsta:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/gangsta.gif", alt: ":panic:" };
emoticons[":datass:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/datass.gif", alt: ":panic:" };
emoticons[":thihi:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/thihi.gif", alt: ":panic:" };
emoticons[":kiddingme:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/kiddingme.gif", alt: ":panic:" };
emoticons[":heilpalm:"] = { src: "http://www.bf-games.net/forum/style_emoticons/default/facepalm2.gif", alt: ":panic:" };


//--Memes++
emoticons[":scared:"] = { src: "http://i.imgur.com/Gs0dU.png", alt: "pokerface" };

emoticons[":epiccry:"] = { src: "http://i.imgur.com/RLzdf.png", alt: "pokerface" };
emoticons[":chucktesta:"] = { src: "http://i.imgur.com/YZ7ns.png", alt: "pokerface" };
emoticons[":cerealguyspitting:"] = { src: "http://i.imgur.com/Dqf2e.png", alt: "pokerface" };
emoticons[":waitaminute:"] = { src: "http://i.imgur.com/ADPvz.png", alt: "pokerface" };
emoticons[":umad:"] = { src: "http://i.imgur.com/3zhtb.png", alt: "pokerface" };
emoticons[":epicfuu:"] = { src: "http://i.imgur.com/o8PY6.gif", alt: "pokerface" }; //by button


emoticons[":freddie:"] = { src: "http://i.imgur.com/PFbs4.png", alt: "pokerface" };
emoticons[":freddiemercury:"] = { src: "http://i.imgur.com/PFbs4.png", alt: "pokerface" };
emoticons[":businesscat:"] = { src: "http://i.imgur.com/gL610.jpg", alt: "pokerface" };
emoticons[":mustnotfap:"] = { src: "http://i.imgur.com/ZUmJb.jpg", alt: "pokerface" };
emoticons[":neveralone:"] = { src: "http://i.imgur.com/x4XWO.png", alt: "pokerface" };
emoticons[":melvin:"] = { src: "http://i.imgur.com/QWnkq.png", alt: "pokerface" };
emoticons[":icanfaptothis:"] = { src: "http://i.imgur.com/vD6Ec.jpg", alt: "pokerface" };
emoticons[":ilovelife:"] = { src: "http://i.imgur.com/q1ukL.png", alt: "pokerface" };
emoticons[":thegame:"] = { src: "http://i.imgur.com/2yJtb.png", alt: "pokerface" };
emoticons[":badpokerface:"] = { src: "http://i.imgur.com/Qnmty.jpg", alt: "pokerface" }; 
emoticons[":loading:"] = { src: "http://i.imgur.com/K3MHg.jpg", alt: "loading" }; 
emoticons[":maximumtrolling:"] = { src: "http://i.imgur.com/UXmfT.jpg?7879", alt: "maximumtrolling" }; 
emoticons[":ohreally?:"] = { src: "http://i.imgur.com/K5BAn.jpg", alt: "ohreally?" }; 
emoticons[":yareally:"] = { src: "http://i.imgur.com/1hDdb.jpg", alt: "yareally" }; 
emoticons[":imwatchingyou:"] = { src: "http://i.imgur.com/svpEI.jpg", alt: "imwatchingyou" }; 
emoticons[":everywhere:"] = { src: "http://i.imgur.com/rbBtS.png", alt: "everywhere" }; 
emoticons[":notbad:"] = { src: "http://i.minus.com/iI0hfiE5UTZ6z.gif", alt: "notbad" }; 
emoticons[":venganza:"] = { src: "http://i.minus.com/igZCIWlQ1P2A5.gif", alt: "venganza" }; 
emoticons[":areyouserious:"] = { src: "http://i.minus.com/ibpTjZCAil19BI.gif", alt: "areyouserious" }; 
emoticons[":thumbsup:"] = { src: "http://i.minus.com/ib0LWElmtRsPyW.png", alt: "thumbsup" }; 
emoticons[":staredad:"] = { src: "http://i.minus.com/i6B27Sc6mFQi.png", alt: "staredad" }; 
emoticons[":iamdisappoint:"] = { src: "http://i.minus.com/ikPEZwzRmW9Mb.png", alt: "iamdisappoint" }; 
emoticons[":hmmm:"] = { src: "http://i.minus.com/i838v2wFBuqfB.png\' alt='=hmmm" }; 
emoticons[":grin:"] = { src: "http://i.minus.com/ifNzX3Mce0txI.png", alt: "grin" }; 
emoticons[":bighappy:"] = { src: "http://i.minus.com/ifNzX3Mce0txI.png", alt: "grin" }; 
emoticons[":troll:"] = { src: "http://i.imgur.com/2sy46.jpg", alt: "troll" }; 
emoticons[":trolldad:"] = { src: "http://m-101.minus.com/ibmuNwfa6f6h9Y.gif", alt: "trolldad" }; 
emoticons[":areufuckingkiddingme:"] = { src: "http://i.minus.com/ip91YZFkb9gNR.png", alt: "areufuckingkiddingme" }; 
emoticons[":areyoufuckingkiddingme:"] = { src: "http://i.minus.com/ip91YZFkb9gNR.png", alt: "areufuckingkiddingme" }; 
emoticons[":awesomeface:"] = { src: "http://i.minus.com/ibvFlGPbJGhMKB.png", alt: "awesomeface" }; 
emoticons[":awwyea:"] = { src: "http://i.minus.com/iGTGZC86ggRm6.png", alt: "awwyea" }; 
emoticons[":happy:"] = { src: "http://i.minus.com/iO0CXfFCzrGae.png", alt: "happy" }; 
emoticons[":boring:"] = { src: "http://i.minus.com/iyqDTDvNdukrv.png\' alt='boring" }; 
emoticons[":cerealguy:"] = { src: "http://i.minus.com/i3p3gGqpjMnXh.png", alt: "cerealguy" }; 
emoticons[":challengeaccepted:"] = { src: "http://i.minus.com/im8zeNlbe2kBb.png\' alt='challengeaccepted" }; 
emoticons[":cry:"] = { src: "http://i.minus.com/iNzkM37JSuDiW.png", alt: "cry" }; 
emoticons[":cryhappy:"] = { src: "http://i.minus.com/ibnIyEOrv0P6si.png", alt: "cryhappy" }; 
emoticons[":fapfapfap:"] = { src: "http://i.minus.com/ibiBprrgfTSjr7.png", alt: "fapfapfap" }; 
emoticons[":feellikeaninja:"] = { src: "http://i.minus.com/ibuRh6UFaejEcP.png", alt: "feellikeaninja" }; 
emoticons[":feellikeasir:"] = { src: "http://i.minus.com/ibmKxwz9ZRL5LR.png", alt: "feellikeasir" }; 
emoticons[":foreveralone:"] = { src: "http://i.minus.com/i4XBsnJgV0CCq.png", alt: "foreveralone" }; 
emoticons[":foreveralonehappy:"] = { src: "http://i.minus.com/ibkRBexKaUrqbX.png", alt: "foreveralonehappy" }; 
emoticons[":friki:"] = { src: "http://i.minus.com/ilIvfaDMm3WF8.png", alt: "friki" }; 
emoticons[":fry:"] = { src: "http://i.minus.com/ikRKo3Vl05yOp.png", alt: "fry" }; 
emoticons[":fuckyea:"] = { src: "http://i.minus.com/icyEakygqGhwH.png", alt: "fuckyea" }; 
emoticons[":fuu:"] = { src: "http://i.minus.com/ibftz9NCpego7E.png", alt: "fuu" }; 
emoticons[":fffuuu:"] = { src: "http://i.minus.com/ibftz9NCpego7E.png", alt: "fuu" }; 
emoticons[":fuuu:"] = { src: "http://i.minus.com/ibftz9NCpego7E.png", alt: "fuu" }; 
emoticons[":girlfap:"] = { src: "http://i.minus.com/iIJDCcS4CvM0T.png", alt: "girlfap" }; 
emoticons[":girlfuckyea:"] = { src: "http://i.minus.com/iIQzKVmbKu3k3.png", alt: "girlfuckyea" }; 
emoticons[":girlhappy:"] = { src: "http://i.minus.com/iDgF6RUzcDWPg.png", alt: "girlhappy" }; 
emoticons[":girlhappy2:"] = { src: "http://i.minus.com/ixHH3EsDEyGTJ.png", alt: "girlhappy2" }; 
emoticons[":girlrage:"] = { src: "http://i.minus.com/iLt9QDsslvqgG.png", alt: "girlrage" }; 
emoticons[":girlmegusta:"] = { src: "http://i.minus.com/iUPeKpTCyvqSa.png", alt: "girlmegusta" }; 
emoticons[":girltroll:"] = { src: "http://i.minus.com/i1pMWjXnNbwcj.png", alt: "girltroll" }; 
emoticons[":girlmad:"] = { src: "http://i.minus.com/iLt9QDsslvqgG.png", alt: "girlmad" }; 
emoticons[":girlwait:"] = { src: "http://i.minus.com/iXyKe3uM9Y3fV.png", alt: "girlwait" }; 
emoticons[":girlyaoming:"] = { src: "http://i.minus.com/iipM3gktdTjNs.png", alt: "girlyaoming" }; 
emoticons[":gtfo:"] = { src: "http://i.minus.com/iTfal45otmC30.png", alt: "gtfo" }; 
emoticons[":happy:"] = { src: "http://i.minus.com/ibjtAm2hnDLmWP.png", alt: "happy" }; 
emoticons[":lied:"] = { src: "http://i.minus.com/ibcTUwlsBxPZjI.png", alt: "lied" }; 
emoticons[":ilied:"] = { src: "http://i.minus.com/ibcTUwlsBxPZjI.png", alt: "lied" }; 
emoticons[":menti:"] = { src: "http://i.minus.com/ibcTUwlsBxPZjI.png", alt: "menti" }; 
emoticons[":lol2:"] = { src: "http://i.minus.com/ibxqoQLi4zhueZ.png", alt: "lol" }; 
emoticons[":megusta:"] = { src: "http://i.minus.com/iGyecJK9VumVA.png", alt: "megusta" }; 
emoticons[":miradafija:"] = { src: "http://i.minus.com/ifQPNzXMZ7uXl.png", alt: "miradafija" }; 
emoticons[":motherofgod:"] = { src: "http://i.minus.com/iXgShK9LSrYuk.png", alt: "motherofgod" }; 
emoticons[":nervious:"] = { src: "http://i.minus.com/iuvV9c72fRXbh.png", alt: "nervious" }; 
emoticons[":no:"] = { src: "http://i.minus.com/iFbmJm56hHMmA.png", alt: "no" }; 
emoticons[":okay2:"] = { src: "http://i.minus.com/ipLAI380D7V5a.png", alt: "okay" }; 
emoticons[":omg1:"] = { src: "http://i.minus.com/ibtG6Kfjn8zNwK.png", alt: "omg" }; 
emoticons[":pcguy:"] = { src: "http://i.minus.com/iXmMkk1gExyo6.png", alt: "pcguy" }; 
emoticons[":pedobear:"] = { src: "http://i.minus.com/igymO6wenbHau.png", alt: "pedobear" }; 
emoticons[":pfft:"] = { src: "http://i.minus.com/iNt9Ti2ppGscU.png", alt: "pfft" }; 
emoticons[":pokerface:"] = { src: "http://i.minus.com/ibaELAeqRfokeL.png", alt: "pokerface" }; 
emoticons[":pukerainbows:"] = { src: "http://i.minus.com/iblXkELedWt4uu.png", alt: "pukerainbows" }; 
emoticons[":serious:"] = { src: "http://i.minus.com/ibrVu2tx2d4wwj.png", alt: "serious" }; 
emoticons[":siclaro:"] = { src: "http://i.minus.com/iFR5Gu0e232jp.png", alt: "siclaro" }; 
emoticons[":suspicious:"] = { src: "http://i.minus.com/ibz0AyW9usrS6B.png", alt: "suspicious" }; 
emoticons[":sweetjesus:"] = { src: "http://i.minus.com/ib2qrBbuewYrd7.png", alt: "sweetjesus" }; 
emoticons[":hmm:"] = { src: "http://i.minus.com/ibmCmMtoJS8cFi.png", alt: "hmm" }; 
emoticons[":thinking:"] = { src: "http://i.minus.com/ibmCmMtoJS8cFi.png", alt: "thinking" }; 
emoticons[":truestory:"] = { src: "http://i.minus.com/idxyhlBdKYIk5.png", alt: "truestory" }; 
emoticons[":why:"] = { src: "http://i.minus.com/iiSWdLNsHXAtu.png", alt: "why" }; 
emoticons[":whynot:"] = { src: "http://i.minus.com/isqzaSZaFGQSZ.png", alt: "whynot" }; 
emoticons[":yaoming:"] = { src: "http://i.minus.com/ibhDg9Wk3nJrBP.png", alt: "yaoming" }; 
emoticons[":yuno:"] = { src: "http://i.minus.com/iFP79mBRn0549.png", alt: "yuno" }; 
emoticons[":zomg:"] = { src: "http://i.minus.com/iZyy5DDgS7EJN.png", alt: "zomg" }; 
emoticons[":drunk:"] = { src: "http://i.minus.com/ixXxhXnsz5LRe.png", alt: "drunk" }; 
emoticons[":sad:"] = { src: "http://i.minus.com/ibhuXmCcRja2l2.png", alt: "sad" }; 
emoticons[":nyancat:"] = { src: "http://i.minus.com/iburTi4rJODnpS.gif", alt: "nyancat" }; 
emoticons[":facepalm2:"] = { src: "http://i.imgur.com/XBtfB.png", alt: "sohardcore" }; 


	
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