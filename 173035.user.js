// ==UserScript==
// @id             Social Memes
// @name           Social Memes
// @namespace      http://singlesanime.blogspot.com
// @description    Usa emoticonos de memes en sitios conocidos. ahora tambien en el chat de Facebook
// @author         Delzon
// @icon           http://i.imgur.com/FEoMq.png
// @include *.facebook.com/*
// @include http://userscripts.org/*/114888*
// @include	*.youtube.com/*
// @include	*.twitter.com/*
// @include	http://www.trollr.com/*
// @include	http://www.cuantocabron.com/*
// @include	http://www.notengotele.com/*
// @include	http://www.vayagif.com/*
// @include	http://www.vistoenfb.com/*
// @include	http://www.cuantarazon.com/*
// @include	http://www.teniaquedecirlo.com/*
// @include	http://www.ascodevida.com/*
// @include	http://*.tuenti.com/*
// @include	https://plus.google.com/*
// @include	http://plus.google.com/*
// @include	https://www.tumblr.com/*
// @include	https://talkgadget.google.com/*
// @include	http://talkgadget.google.com/*
// @include	http://www.tumblr.com/*
// @include	http://www.funnyjunk.com/*
// @include	http://*.grou.ps/*
// @include http*://*.jimdo.com/*
// @include http://imgur.com/*
// @include	*.deviantart.com/*
// @include	http://pinterest.com/*
// @include	*.facebook.com/plugins/comments.php*
// @include	http://jsfiddle.net/Public/SuX3R/show/* 
// @exclude	http://jsfiddle.net/Delzon/AKzJs/show/* 
// @exclude *.youtube.com/embed/*
// @exclude *.facebook.com/plugins/likebox.php*
// @exclude *.facebook.com/plugins/like.php*
// @exclude *.facebook.com/connect/connect.php?*
// @exclude *.facebook.com/plugins/recommendations.php*
// @exclude *.facebook.com/plugins/activity.php*
// @exclude http://plus.google.com/u/0/_/notifications/*
// @exclude https://plus.google.com/u/0/_/notifications/*
// @version        7.5
// ==/UserScript==

(function(d){
d.addEventListener('keydown', function(e) {
  // 
  if (e.keyCode == 90 && !e.shiftKey && !e.ctrlKey && e.altKey && !e.metaKey) {
   window.open("http://adf.ly/196180/memecodigos","mywindow",'scrollbars=yes,toolbar=no,menubar=no,status=no,width=810,height=502'); return false;
  }
}, false);
})(document);


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

body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "50px";
	div.style.left = "0px";
	div.style.color = "#888";
	div.style.border = "0px solid #888";
	div.style.zIndex = "999999";
	div.style.padding = "0px";
	div.innerHTML = "<style>#btmeme {opacity:0.5;}#btmeme:hover{opacity:1.0;}#loliframe {border: 0 !important;}</style><a title=\"Ver codigos\" style=\"opacty:0.1;text-decoration:none;color:#888;\" href=\"http://adf.ly/196180/memecodigos\" target=\"_blank\" onClick=\"window.open(this.href, this.target, 'scrollbars=yes,toolbar=no,menubar=no,status=no,width=810,height=502'); return false\"><img id=\"btmeme\" src=\"http://i.imgur.com/UU6zM.png\" /></a>"
	body.appendChild(div);
}

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
emoticons[":-tuversion-:"] = { src: "http://superpatanegra.com/textoaimagen/images/email_imager.php?e=7.5&f=arlrdbd&r=0&l=false&fs=8&c=^ffffff&bc=^6699CC", alt: "version" }; 

//--PLUS: Vocaloid
emoticons[":rin:"] = { src: "http://i.imgur.com/EUTD3.png", alt: "pokerface" };
emoticons[":miku:"] = { src: "http://i.imgur.com/PAibY.png", alt: "pokerface" };
emoticons[":len:"] = { src: "http://i.imgur.com/7psoT.png", alt: "pokerface" };
emoticons[":luka:"] = { src: "http://i.imgur.com/IweIQ.png", alt: "pokerface" };

//--ANIME: Nichijou

emoticons[":yuuko-bling:"] = { src: "http://i.imgur.com/Ta9O6.gif", alt: "pokerface" };
emoticons[":yuuko-confused:"] = { src: "http://i.imgur.com/Hy9gT.gif", alt: "pokerface" };
emoticons[":yuuko-rofl:"] = { src: "http://i.imgur.com/nDW0s.gif", alt: "pokerface" };
emoticons[":yuuko-idea:"] = { src: "http://i.imgur.com/6nkyX.gif", alt: "pokerface" };
emoticons[":yuuko-evilsmile:"] = { src: "http://i.imgur.com/h1l3L.jpg", alt: "pokerface" };
emoticons[":yuuko-like:"] = { src: "http://i.imgur.com/qofK0.gif", alt: "pokerface" };
emoticons[":yuuko-shocked:"] = { src: "http://i.imgur.com/9d43b.gif", alt: "pokerface" };
emoticons[":yuuko-sad:"] = { src: "http://i.imgur.com/xAFYq.gif", alt: "pokerface" };
emoticons[":hakase-nyan:"] = { src: "http://i.imgur.com/SMZez.gif", alt: "pokerface" };
emoticons[":sakamoto-sleeping:"] = { src: "http://i.imgur.com/MJMIc.gif", alt: "pokerface" };


//--ANIME: Amagami SS++
emoticons[":miya:"] = { src: "http://i.imgur.com/nsTe8.png", alt: "pokerface" };
emoticons[":morishima:"] = { src: "http://i.imgur.com/e5mc5.png", alt: "pokerface" };
emoticons[":rihoko:"] = { src: "http://i.imgur.com/HIMKV.png", alt: "pokerface" };
emoticons[":sae:"] = { src: "http://i.imgur.com/8AKmG.png", alt: "pokerface" };
emoticons[":ai:"] = { src: "http://i.imgur.com/mNOQK.png", alt: "pokerface" };
emoticons[":ayatsuji:"] = { src: "http://i.imgur.com/3s5PN.png", alt: "pokerface" };
emoticons[":junichi:"] = { src: "http://i.imgur.com/GqaCe.png", alt: "pokerface" };
emoticons[":kaoru:"] = { src: "http://i.imgur.com/zdbvf.png", alt: "pokerface" };

//--ANIME: Lucky Star++
emoticons[":kagami:"] = { src: "http://i.imgur.com/3tcnx.png", alt: "pokerface" };
emoticons[":tsukasa:"] = { src: "http://i.imgur.com/6Ikih.png", alt: "pokerface" };
emoticons[":konata:"] = { src: "http://i.imgur.com/vRstv.png", alt: "pokerface" };
emoticons[":miyuki:"] = { src: "http://i.imgur.com/u98UZ.png", alt: "pokerface" };
emoticons[":sojiro:"] = { src: "http://i.imgur.com/Ywfv9.png", alt: "pokerface" };

//--ANIME: Suzumiya Haruhi++

emoticons[":itsuki:"] = { src: "http://i.imgur.com/GdJRq.png", alt: "pokerface" };
emoticons[":taniguchi:"] = { src: "http://i.imgur.com/dT09U.png", alt: "pokerface" };
emoticons[":kyon:"] = { src: "http://i.imgur.com/gQwC4.png", alt: "pokerface" };
emoticons[":kyon-no-imouto:"] = { src: "http://i.imgur.com/pkFur.png", alt: "pokerface" };
emoticons[":mikuru:"] = { src: "http://i.imgur.com/gUf1Q.png", alt: "pokerface" };
emoticons[":haruhi:"] = { src: "http://i.imgur.com/nqQPY.png", alt: "pokerface" };
emoticons[":nagato:"] = { src: "http://i.imgur.com/WukEG.png", alt: "pokerface" };

//--SERIE: Doctor Who++
emoticons[":doctor500miles:"] = { src: "http://i.imgur.com/AWOgz.png", alt: "pokerface" };
emoticons[":dalek:"] = { src: "http://i.imgur.com/KSLZp.png", alt: "pokerface" };
emoticons[":1doctor:"] = { src: "http://i.imgur.com/2M2Ge.png", alt: "pokerface" };
emoticons[":2doctor:"] = { src: "http://i.imgur.com/hNKsz.png", alt: "pokerface" };
emoticons[":3doctor:"] = { src: "http://i.imgur.com/hNKsz.png", alt: "pokerface" };
emoticons[":4doctor:"] = { src: "http://i.imgur.com/qxoqe.png", alt: "pokerface" };
emoticons[":5doctor:"] = { src: "http://i.imgur.com/lxCqK.png", alt: "pokerface" };
emoticons[":6doctor:"] = { src: "http://i.imgur.com/AU5gN.png", alt: "pokerface" };
emoticons[":7doctor:"] = { src: "http://i.imgur.com/aR3jh.png", alt: "pokerface" };
emoticons[":8doctor:"] = { src: "http://i.imgur.com/j3Sm2.png", alt: "pokerface" };
emoticons[":9doctor:"] = { src: "http://i.imgur.com/Ix7Xb.png", alt: "pokerface" };
emoticons[":10doctor:"] = { src: "http://i.imgur.com/xXt3B.png", alt: "pokerface" };
emoticons[":11doctor:"] = { src: "http://i.imgur.com/3ySKc.png", alt: "pokerface" };
emoticons[":cyberman:"] = { src: "http://i.imgur.com/61vO3.png", alt: "pokerface" };


//--Memes++
emoticons[":waitno:"] = { src: "http://i.imgur.com/yE7RQ.jpg", alt: "pokerface" };
emoticons[":ultragay:"] = { src: "http://i.imgur.com/plkdZ.jpg", alt: "pokerface" };
emoticons[":trolol:"] = { src: "http://i.imgur.com/mipDg.jpg", alt: "pokerface" };
emoticons[":please:"] = { src: "http://i.imgur.com/MO63M.jpg", alt: "pokerface" };
emoticons[":objection:"] = { src: "http://i.imgur.com/A85Bj.jpg", alt: "pokerface" };
emoticons[":motherofgusta:"] = { src: "http://i.imgur.com/6bZ1t.jpg", alt: "pokerface" };
emoticons[":likealady:"] = { src: "http://i.imgur.com/LKVZ0.jpg", alt: "pokerface" };
emoticons[":ifyouknowwhatimean:"] = { src: "http://i.imgur.com/EczGs.jpg", alt: "pokerface" };
emoticons[":goodtroll:"] = { src: "http://i.imgur.com/evl0h.jpg", alt: "pokerface" };
emoticons[":gay:"] = { src: "http://i.imgur.com/tdizH.jpg", alt: "pokerface" };
emoticons[":genius:"] = { src: "http://i.imgur.com/NipqE.png", alt: "pokerface" };
emoticons[":fuckyeamelvin:"] = { src: "http://i.imgur.com/Pg2rP.jpg", alt: "pokerface" };
emoticons[":fuckyeahmelvin:"] = { src: "http://i.imgur.com/Pg2rP.jpg", alt: "pokerface" };
emoticons[":challengedenied:"] = { src: "http://i.imgur.com/TcLCZ.jpg", alt: "pokerface" };
emoticons[":brokenheart:"] = { src: "http://i.imgur.com/DMFQ8.jpg", alt: "pokerface" };
emoticons[":angrymom:"] = { src: "http://i.imgur.com/QRdcK.jpg", alt: "pokerface" };

emoticons[":allofthethings:"] = { src: "http://i.imgur.com/3hCIA.png", alt: "pokerface" };
emoticons[":allthethings:"] = { src: "http://i.imgur.com/3hCIA.png", alt: "pokerface" };
emoticons[":cjyaoming:"] = { src: "http://i.imgur.com/DvJon.png", alt: "pokerface" };
emoticons[":clevergirl:"] = { src: "http://i.imgur.com/3CWCa.png", alt: "pokerface" };
emoticons[":closeenough:"] = { src: "http://i.imgur.com/g8MSX.png", alt: "pokerface" };
emoticons[":durrrr:"] = { src: "http://i.imgur.com/ttXHW.png", alt: "pokerface" };
emoticons[":fapaborted:"] = { src: "http://i.imgur.com/Pv2ul.png", alt: "pokerface" };
emoticons[":ha:"] = { src: "http://i.imgur.com/NVqd5.png", alt: "pokerface" };
emoticons[":haha:"] = { src: "http://i.imgur.com/yfRsX.gif", alt: "pokerface" };
emoticons[":idgafpsycho:"] = { src: "http://i.imgur.com/zAJv1.png", alt: "pokerface" };
emoticons[":internetdied:"] = { src: "http://i.imgur.com/1KKkp.gif", alt: "pokerface" };
emoticons[":iregretnothing:"] = { src: "http://i.imgur.com/qHdX4.gif", alt: "pokerface" };
emoticons[":isthisreallife:"] = { src: "http://i.imgur.com/djj9O.gif", alt: "pokerface" };
emoticons[":itsatrap:"] = { src: "http://i.imgur.com/pCkna.png", alt: "pokerface" };
emoticons[":over18:"] = { src: "http://i.imgur.com/qQu03.png", alt: "pokerface" };
emoticons[":killitwithfire:"] = { src: "http://i.imgur.com/XgMUT.gif", alt: "pokerface" };
emoticons[":malote:"] = { src: "http://i.imgur.com/LPFtz.png", alt: "pokerface" };
emoticons[":memedance:"] = { src: "http://i.imgur.com/knyTY.gif", alt: "pokerface" };
emoticons[":motherofkurtcobain:"] = { src: "http://i.imgur.com/nkMDd.png", alt: "pokerface" };
emoticons[":mrbean:"] = { src: "http://i.imgur.com/x4OQE.png", alt: "pokerface" };
emoticons[":nowkiss:"] = { src: "http://i.imgur.com/JfCib.png", alt: "pokerface" };
emoticons[":numb:"] = { src: "http://i.imgur.com/CZ538.png", alt: "pokerface" };
emoticons[":nyant:"] = { src: "http://i.imgur.com/3deBp.gif", alt: "pokerface" };
emoticons[":ohgod:"] = { src: "http://i.imgur.com/GpBlD.png", alt: "pokerface" };
emoticons[":ohhh:"] = { src: "http://i.imgur.com/JcOsN.gif", alt: "pokerface" };
emoticons[":ohmygod:"] = { src: "http://i.imgur.com/dx3TA.gif", alt: "pokerface" };
emoticons[":okaywalk:"] = { src: "http://i.imgur.com/iJJML.gif", alt: "pokerface" };
emoticons[":paranoidparrot:"] = { src: "http://i.imgur.com/3ml88.png", alt: "pokerface" };
emoticons[":prepareyouranus:"] = { src: "http://i.imgur.com/6TeLs.png", alt: "pokerface" };
emoticons[":this:"] = { src: "http://i.imgur.com/s3mJJ.png", alt: "pokerface" };
emoticons[":tooold:"] = { src: "http://i.imgur.com/a4r4s.png", alt: "pokerface" };
emoticons[":trollshark:"] = { src: "http://i.imgur.com/puhuK.png", alt: "pokerface" };
emoticons[":uhmwat:"] = { src: "http://i.imgur.com/BoHXJ.png", alt: "pokerface" };
emoticons[":ummm:"] = { src: "http://i.imgur.com/jqZm2.png", alt: "pokerface" };
emoticons[":upthis:"] = { src: "http://i.imgur.com/T0DaX.png", alt: "pokerface" };
emoticons[":wutwutwut:"] = { src: "http://i.imgur.com/7B3qA.gif", alt: "pokerface" };
emoticons[":yay:"] = { src: "http://i.imgur.com/tNIKU.jpg", alt: "pokerface" };
emoticons[":youmustbenewhere:"] = { src: "http://i.imgur.com/G69w0.png", alt: "pokerface" };
emoticons[":youwinthistime:"] = { src: "http://i.imgur.com/PMSum.jpg", alt: "pokerface" };

emoticons[":faponyou:"] = { src: "http://i.imgur.com/JOTWK.gif", alt: "pokerface" }; 
emoticons[":flippingtable:"] = { src: "http://i.imgur.com/kLu45.png", alt: "pokerface" }; 
emoticons[":nogusta:"] = { src: "http://i.imgur.com/QyD0v.png", alt: "pokerface" }; 
emoticons[":nojodas:"] = { src: "http://i.imgur.com/ZmSPA.jpg", alt: "pokerface" }; 
emoticons[":ohgodwhy:"] = { src: "http://i.imgur.com/U3dKf.jpg", alt: "pokerface" }; 
emoticons[":philosoraptor:"] = { src: "http://i.imgur.com/Qsfjs.jpg", alt: "pokerface" }; 
emoticons[":rage:"] = { src: "http://i.imgur.com/x27Z6.png", alt: "pokerface" }; 
emoticons[":slowpoke:"] = { src: "http://i.imgur.com/fE17s.jpg", alt: "pokerface" }; 
emoticons[":thatsracist:"] = { src: "http://i.imgur.com/6X8bt.gif", alt: "pokerface" }; 
emoticons[":type:"] = { src: "http://i.imgur.com/I2ls6.gif", alt: "pokerface" }; 
emoticons[":whywhywhy:"] = { src: "http://i.imgur.com/67gs5.gif", alt: "pokerface" }; 
emoticons[":zorra1000:"] = { src: "http://i.imgur.com/yRP7p.jpg", alt: "pokerface" }; 


emoticons[":aw:"] = { src: "http://i.imgur.com/DVDbD.jpg", alt: "pokerface" }; 
emoticons[":awesome:"] = { src: "http://i.imgur.com/kQtTe.jpg", alt: "pokerface" }; 
emoticons[":yes:"] = { src: "http://i.imgur.com/xz4R6.jpg", alt: "pokerface" }; 
emoticons[":trollkitty:"] = { src: "http://i.imgur.com/WeIJV.png", alt: "pokerface" }; 
emoticons[":trollflame:"] = { src: "http://i.imgur.com/s8obJ.png", alt: "pokerface" }; 
emoticons[":trolledtroll:"] = { src: "http://i.imgur.com/F2nNN.png", alt: "pokerface" }; 
emoticons[":thisissparta:"] = { src: "http://i.imgur.com/7Fpyg.jpg", alt: "pokerface" }; 
emoticons[":tacocat:"] = { src: "http://i.imgur.com/qyj4D.gif", alt: "pokerface" }; 
emoticons[":reallife:"] = { src: "http://i.imgur.com/Qep6G.gif", alt: "pokerface" }; 
emoticons[":pedodog:"] = { src: "http://i.imgur.com/E6w6y.png", alt: "pokerface" }; 
emoticons[":pedobot:"] = { src: "http://i.imgur.com/fDZ0F.png", alt: "pokerface" }; 
emoticons[":pedoboo:"] = { src: "http://i.imgur.com/wSRqU.png", alt: "pokerface" }; 
emoticons[":over9000:"] = { src: "http://i.imgur.com/qTKFd.gif", alt: "pokerface" }; 
emoticons[":ooo:"] = { src: "http://i.imgur.com/uLtwE.png", alt: "pokerface" }; 
emoticons[":onedoesnot:"] = { src: "http://i.imgur.com/Fh2gB.jpg", alt: "pokerface" }; 
emoticons[":herpderp:"] = { src: "http://i.imgur.com/KxF20.png", alt: "pokerface" }; 
emoticons[":feellikeagamer:"] = { src: "http://i.imgur.com/04UrL.jpg", alt: "pokerface" }; 
emoticons[":epicfacepalm:"] = { src: "http://i.imgur.com/SZPq4.png", alt: "pokerface" }; 
emoticons[":doainternet:"] = { src: "http://i.imgur.com/cEFvY.gif", alt: "pokerface" }; 
emoticons[":dammit:"] = { src: "http://i.imgur.com/bX1jq.jpg", alt: "pokerface" }; 
emoticons[":cryrainbows:"] = { src: "http://i.imgur.com/BXZ2d.png", alt: "pokerface" }; 
emoticons[":cyoot:"] = { src: "http://i.imgur.com/KYi41.png", alt: "pokerface" }; 
emoticons[":chuckthumbsup:"] = { src: "http://i.imgur.com/QeKbu.jpg", alt: "pokerface" }; 
emoticons[":byebyebye:"] = { src: "http://i.imgur.com/n5lmn.gif", alt: "pokerface" }; 
emoticons[":omgomgomg:"] = { src: "http://i.imgur.com/ffqet.gif", alt: "pokerface" }; 


emoticons[":youdontsay:"] = { src: "http://i.imgur.com/Zxfxf.png", alt: "pokerface" }; 
emoticons[":yaominggirl:"] = { src: "http://i.imgur.com/H0t5z.png", alt: "pokerface" }; 
emoticons[":creepygusta:"] = { src: "http://i.imgur.com/F07sC.png", alt: "pokerface" };
emoticons[":quemalote:"] = { src: "http://i.imgur.com/7QJEK.jpg", alt: "pokerface" };
emoticons[":hero:"] = { src: "http://i.imgur.com/K0FC7.gif", alt: "pokerface" };
emoticons[":hijadeputa:"] = { src: "http://i.imgur.com/NQODD.jpg", alt: "pokerface" };
emoticons[":hijodeputa:"] = { src: "http://i.imgur.com/NQODD.jpg", alt: "pokerface" };
emoticons[":theobserver:"] = { src: "http://i.imgur.com/quI6e.jpg", alt: "pokerface" };
emoticons[":observer:"] = { src: "http://i.imgur.com/quI6e.jpg", alt: "pokerface" };

emoticons[":yaomingscared:"] = { src: "http://i.imgur.com/Gs0dU.png", alt: "pokerface" };
emoticons[":yaomingew:"] = { src: "http://i.imgur.com/Gs0dU.png", alt: "pokerface" };
emoticons[":queesestamierda:"] = { src: "http://i.imgur.com/DvTqr.png", alt: "pokerface" };
emoticons[":perfecto:"] = { src: "http://i.imgur.com/YMUp2.png", alt: "pokerface" };
emoticons[":mexican:"] = { src: "http://i.imgur.com/0UwLY.png", alt: "pokerface" };
emoticons[":fuckyou:"] = { src: "http://i.imgur.com/gXstc.png", alt: "pokerface" };
emoticons[":fucklogic:"] = { src: "http://i.imgur.com/DMjkG.gif", alt: "pokerface" };
emoticons[":trollfacegif:"] = { src: "http://i.imgur.com/Bolb3.gif", alt: "pokerface" };
emoticons[":lololol:"] = { src: "http://i.imgur.com/s5Uf2.gif", alt: "pokerface" };

emoticons[":salfate:"] = { src: "http://i.imgur.com/jHfXa.png", alt: "pokerface" };
emoticons[":despreocupado:"] = { src: "http://i.imgur.com/8wAro.png", alt: "pokerface" };
emoticons[":impossibru:"] = { src: "http://i.imgur.com/b3HcJ.jpg", alt: "pokerface" };
emoticons[":nomedigas:"] = { src: "http://i.imgur.com/9LJ0h.jpg", alt: "pokerface" };
emoticons[":watchout:"] = { src: "http://i.imgur.com/oGlE8.jpg", alt: "pokerface" };
emoticons[":problem:"] = { src: "http://i.imgur.com/LH6y3.jpg", alt: "pokerface" };
emoticons[":santaclaustroll:"] = { src: "http://i.imgur.com/P2bk4.jpg", alt: "pokerface" };

emoticons[":adios:"] = { src: "http://i.imgur.com/OCBeK.gif", alt: "pokerface" };
emoticons[":epiccry:"] = { src: "http://i.imgur.com/RLzdf.png", alt: "pokerface" };
emoticons[":chucktesta:"] = { src: "http://i.imgur.com/YZ7ns.png", alt: "pokerface" };
emoticons[":cerealguyspitting:"] = { src: "http://i.imgur.com/Dqf2e.png", alt: "pokerface" };
emoticons[":waitaminute:"] = { src: "http://i.imgur.com/ADPvz.png", alt: "pokerface" };
emoticons[":umad:"] = { src: "http://i.imgur.com/3zhtb.png", alt: "pokerface" };
emoticons[":teena.laugh:"] = { src: "http://i.imgur.com/NhBxM.gif", alt: "pokerface" }; //by button
emoticons[":epicfuu:"] = { src: "http://i.imgur.com/o8PY6.gif", alt: "pokerface" }; //by button

emoticons[":weegee:"] = { src: "http://i.imgur.com/NF6QP.png", alt: "pokerface" };
emoticons[":success:"] = { src: "http://i.imgur.com/ItCWi.png", alt: "pokerface" };
emoticons[":feelbro:"] = { src: "http://i.imgur.com/bo2VJ.png", alt: "pokerface" };
emoticons[":freddie:"] = { src: "http://i.imgur.com/PFbs4.png", alt: "pokerface" };
emoticons[":freddiemercury:"] = { src: "http://i.imgur.com/PFbs4.png", alt: "pokerface" };
emoticons[":eviltroll:"] = { src: "http://i.imgur.com/4xQtQ.png", alt: "pokerface" };
emoticons[":businesscat:"] = { src: "http://i.imgur.com/gL610.jpg", alt: "pokerface" };
emoticons[":mustnotfap:"] = { src: "http://i.imgur.com/ZUmJb.jpg", alt: "pokerface" };
emoticons[":neveralone:"] = { src: "http://i.imgur.com/x4XWO.png", alt: "pokerface" };
emoticons[":melvin:"] = { src: "http://i.imgur.com/QWnkq.png", alt: "pokerface" };
emoticons[":icanfaptothis:"] = { src: "http://i.imgur.com/vD6Ec.jpg", alt: "pokerface" };
emoticons[":ilovelife:"] = { src: "http://i.imgur.com/q1ukL.png", alt: "pokerface" };
emoticons[":thegame:"] = { src: "http://i.imgur.com/2yJtb.png", alt: "pokerface" };
emoticons[":haruhi:"] = { src: "http://i.imgur.com/EzAle.png", alt: "pokerface" };
emoticons[":konata:"] = { src: "http://i.imgur.com/fjnU8.png", alt: "pokerface" }; //anime
emoticons[":paralawea:"] = { src: "http://i.imgur.com/K62h7.jpg", alt: "pokerface" }; // local
emoticons[":t-raisins:"] = { src: "http://i.imgur.com/2EGEi.jpg", alt: "pokerface" }; 
emoticons[":feellikeahuaso:"] = { src: "http://i.imgur.com/Pk2eZ.png", alt: "pokerface" }; // local
emoticons[":exito:"] = { src: "http://i.imgur.com/Hwv85.jpg", alt: "pokerface" }; // local
emoticons[":infinitoaprecio:"] = { src: "http://i.imgur.com/M2Wb1.png", alt: "pokerface" }; 
emoticons[":badpokerface:"] = { src: "http://i.imgur.com/Qnmty.jpg", alt: "pokerface" }; 
emoticons[":loading:"] = { src: "http://i.imgur.com/K3MHg.jpg", alt: "loading" }; 
emoticons[":maximumtrolling:"] = { src: "http://i.imgur.com/UXmfT.jpg?7879", alt: "maximumtrolling" }; 
emoticons[":ohreally?:"] = { src: "http://i.imgur.com/K5BAn.jpg", alt: "ohreally?" }; 
emoticons[":orly:"] = { src: "http://i.imgur.com/K5BAn.jpg", alt: "ohreally?" }; 
emoticons[":yareally:"] = { src: "http://i.imgur.com/1hDdb.jpg", alt: "yareally" }; 
emoticons[":yarly:"] = { src: "http://i.imgur.com/1hDdb.jpg", alt: "yareally" }; 
emoticons[":imwatchingyou:"] = { src: "http://i.imgur.com/svpEI.jpg", alt: "imwatchingyou" }; 
emoticons[":everywhere:"] = { src: "http://i.imgur.com/rbBtS.png", alt: "everywhere" }; 
emoticons[":notbad:"] = { src: "http://i.minus.com/iI0hfiE5UTZ6z.gif", alt: "notbad" }; 
emoticons[":venganza:"] = { src: "http://i.minus.com/igZCIWlQ1P2A5.gif", alt: "venganza" }; 
emoticons[":areyouserious:"] = { src: "http://i.minus.com/ibpTjZCAil19BI.gif", alt: "areyouserious" }; 
emoticons[":thefuck:"] = { src: "http://i.minus.com/ibpTjZCAil19BI.gif", alt: "areyouserious" }; 
emoticons[":thumbsup:"] = { src: "http://i.minus.com/ib0LWElmtRsPyW.png", alt: "thumbsup" }; 
emoticons[":staredad:"] = { src: "http://i.minus.com/i6B27Sc6mFQi.png", alt: "staredad" }; 
emoticons[":iamdisappoint:"] = { src: "http://i.minus.com/ikPEZwzRmW9Mb.png", alt: "iamdisappoint" }; 
emoticons[":hmmm:"] = { src: "http://i.minus.com/i838v2wFBuqfB.png", alt: "cerealguy" }; 
emoticons[":grin:"] = { src: "http://i.minus.com/ifNzX3Mce0txI.png", alt: "grin" }; 
emoticons[":bighappy:"] = { src: "http://i.minus.com/ifNzX3Mce0txI.png", alt: "grin" }; 
emoticons[":troll:"] = { src: "http://i.imgur.com/2sy46.jpg", alt: "troll" }; 
emoticons[":trollface:"] = { src: "http://i.imgur.com/2sy46.jpg", alt: "trollface" }; 
emoticons[":trollanim:"] = { src: "http://i.minus.com/iAT5ZJtyanBeD.gif", alt: "trollanim" }; 
emoticons[":trolldance:"] = { src: "http://i.minus.com/ibaK1LjDvgfHW2.gif", alt: "trolldance" }; 
emoticons[":trolldad:"] = { src: "http://m-101.minus.com/ibmuNwfa6f6h9Y.gif", alt: "trolldad" }; 
emoticons[":areufuckingkiddingme:"] = { src: "http://i.minus.com/ip91YZFkb9gNR.png", alt: "areufuckingkiddingme" }; 
emoticons[":areyoufuckingkiddingme:"] = { src: "http://i.minus.com/ip91YZFkb9gNR.png", alt: "areufuckingkiddingme" }; 
emoticons[":awesomeface:"] = { src: "http://i.minus.com/ibvFlGPbJGhMKB.png", alt: "awesomeface" }; 
emoticons[":awwyea:"] = { src: "http://i.minus.com/iGTGZC86ggRm6.png", alt: "awwyea" }; 
emoticons[":happy:"] = { src: "http://i.minus.com/iO0CXfFCzrGae.png", alt: "happy" }; 
emoticons[":boring:"] = { src: "http://i.minus.com/iyqDTDvNdukrv.png", alt: "happy" }; 
emoticons[":meh:"] = { src: "http://i.minus.com/iyqDTDvNdukrv.png", alt: "happy" }; 
emoticons[":cerealguy:"] = { src: "http://i.minus.com/i3p3gGqpjMnXh.png", alt: "cerealguy" }; 
emoticons[":challengeaccepted:"] = { src: "http://i.minus.com/im8zeNlbe2kBb.png", alt: "cerealguy" }; 
emoticons[":cry:"] = { src: "http://i.minus.com/iNzkM37JSuDiW.png", alt: "cry" }; 
emoticons[":cryhappy:"] = { src: "http://i.minus.com/ibnIyEOrv0P6si.png", alt: "cryhappy" }; 
emoticons[":fapfapfap:"] = { src: "http://i.minus.com/ibiBprrgfTSjr7.png", alt: "fapfapfap" }; 
emoticons[":feellikeaninja:"] = { src: "http://i.minus.com/ibuRh6UFaejEcP.png", alt: "feellikeaninja" };
emoticons[":ninja:"] = { src: "http://i.minus.com/ibuRh6UFaejEcP.png", alt: "feellikeaninja" };
emoticons[":feellikeasir:"] = { src: "http://i.minus.com/ibmKxwz9ZRL5LR.png", alt: "feellikeasir" };
emoticons[":likeasir:"] = { src: "http://i.minus.com/ibmKxwz9ZRL5LR.png", alt: "feellikeasir" }; 
emoticons[":foreveralone:"] = { src: "http://i.minus.com/i4XBsnJgV0CCq.png", alt: "foreveralone" }; 
emoticons[":foreveralonehappy:"] = { src: "http://i.minus.com/ibkRBexKaUrqbX.png", alt: "foreveralonehappy" }; 
emoticons[":friki:"] = { src: "http://i.minus.com/ilIvfaDMm3WF8.png", alt: "friki" }; 
emoticons[":fry:"] = { src: "http://i.minus.com/ikRKo3Vl05yOp.png", alt: "fry" }; 
emoticons[":futuramafry:"] = { src: "http://i.minus.com/ikRKo3Vl05yOp.png", alt: "fry" }; 
emoticons[":fua:"] = { src: "http://i.minus.com/ijANB6fMKNZa2.png", alt: "fua" }; 
emoticons[":fuckyea:"] = { src: "http://i.minus.com/icyEakygqGhwH.png", alt: "fuckyea" }; 
emoticons[":fuu:"] = { src: "http://i.minus.com/ibftz9NCpego7E.png", alt: "fuu" }; 
emoticons[":fffuuu:"] = { src: "http://i.minus.com/ibftz9NCpego7E.png", alt: "fuu" }; 
emoticons[":f7u12:"] = { src: "http://i.minus.com/ibftz9NCpego7E.png", alt: "fuu" }; 
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
emoticons[":inglip:"] = { src: "http://i.minus.com/ilgRdzFPGfmoB.png", alt: "inglip" }; 
emoticons[":itsfree:"] = { src: "http://i.minus.com/i2izu2bvJhsOn.png", alt: "itsfree" }; 
emoticons[":itssomething:"] = { src: "http://i.minus.com/iSwGYrpXMten7.png" }; 
emoticons[":jelly:"] = { src: "http://i.minus.com/ifVR0an3XwZWq.png", alt: "jelly" }; 
emoticons[":lied:"] = { src: "http://i.minus.com/ibcTUwlsBxPZjI.png", alt: "lied" }; 
emoticons[":ilied:"] = { src: "http://i.minus.com/ibcTUwlsBxPZjI.png", alt: "lied" }; 
emoticons[":menti:"] = { src: "http://i.minus.com/ibcTUwlsBxPZjI.png", alt: "menti" }; 
emoticons[":lol:"] = { src: "http://i.minus.com/ibxqoQLi4zhueZ.png", alt: "lol" }; 
emoticons[":megusta:"] = { src: "http://i.minus.com/iGyecJK9VumVA.png", alt: "megusta" }; 
emoticons[":mentira:"] = { src: "http://i.minus.com/iTpOZbu2nzwaP.png", alt: "mentira" }; 
emoticons[":miradafija:"] = { src: "http://i.minus.com/ifQPNzXMZ7uXl.png", alt: "miradafija" }; 
emoticons[":stare:"] = { src: "http://i.minus.com/ifQPNzXMZ7uXl.png", alt: "miradafija" }; 
emoticons[":motherofgod:"] = { src: "http://i.minus.com/iXgShK9LSrYuk.png", alt: "motherofgod" }; 
emoticons[":nervious:"] = { src: "http://i.minus.com/iuvV9c72fRXbh.png", alt: "nervious" }; 
emoticons[":no:"] = { src: "http://i.minus.com/iFbmJm56hHMmA.png", alt: "no" }; 
emoticons[":nothingtodohere:"] = { src: "http://i.minus.com/iFHTDpeS8f10I.png", alt: "nothingtodohere" }; 
emoticons[":okay:"] = { src: "http://i.minus.com/ipLAI380D7V5a.png", alt: "okay" }; 
emoticons[":omg:"] = { src: "http://i.minus.com/ibtG6Kfjn8zNwK.png", alt: "omg" }; 
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
emoticons[":raisins:"] = { src: "http://i.minus.com/iZyy5DDgS7EJN.png", alt: "raisins" }; 
emoticons[":fu:"] = { src: "http://i.minus.com/iZyy5DDgS7EJN.png", alt: "raisins" }; 
emoticons[":infinitodesprecio:"] = { src: "http://i.minus.com/iosNPWIK8Vfqc.png", alt: "infinitodesprecio" }; 
emoticons[":foreverchacalone:"] = { src: "http://i.minus.com/ibpnf0ceAmGgLH.png", alt: "foreverchacalone" }; 
emoticons[":drunk:"] = { src: "http://i.minus.com/ixXxhXnsz5LRe.png", alt: "drunk" }; 
emoticons[":nomegusta:"] = { src: "http://i.minus.com/i0yxrLu0jPoK0.png", alt: "nomegusta" }; 
emoticons[":sad:"] = { src: "http://i.minus.com/ibhuXmCcRja2l2.png", alt: "sad" }; 
emoticons[":nyancat:"] = { src: "http://i.minus.com/iburTi4rJODnpS.gif", alt: "nyancat" };
emoticons[":nyan:"] = { src: "http://i.minus.com/iburTi4rJODnpS.gif", alt: "nyancat" }; 
emoticons[":sohardcore:"] = { src: "http://i.minus.com/iocNf906bBE3v.png", alt: "sohardcore" }; 
emoticons[":trollslap:"] = { src: "http://i.minus.com/igPSGsacoRrXJ.gif", alt: "trollslap" }; 
emoticons[":rageanim:"] = { src: "http://i.minus.com/ibUJKczfMEUTe.gif", alt: "rageanim" }; 
emoticons[":lmao:"] = { src: "http://i.minus.com/ibbvPPBzgAWzE9.gif", alt: "lmao" }; 
emoticons[":foreveralonedance:"] = { src: "http://i.minus.com/ivfQLYNJE1awz.gif", alt: "foreveralonedance" }; 
emoticons[":gaytroll:"] = { src: "http://i.minus.com/ibqmcDv1x7E42L.png", alt: "gaytroll" }; 
emoticons[":facepalm:"] = { src: "http://i.imgur.com/XBtfB.png", alt: "facepalm" }; 
emoticons[":noleiuncarajo:"] = { src: "http://i.imgur.com/l0Q4a.png", alt: "noleiuncarajo" }; 

//--K-ON++
emoticons[":mio:"] = { src: "http://dl.dropbox.com/u/16954721/web/fb/mio.png", alt: "mio" }; 
emoticons[":yui:"] = { src: "http://dl.dropbox.com/u/16954721/web/fb/yui.png", alt: "yui" }; 
emoticons[":ritsu:"] = { src: "http://dl.dropbox.com/u/16954721/web/fb/ritsu.png", alt: "ritsu" }; 
emoticons[":mugi:"] = { src: "http://dl.dropbox.com/u/16954721/web/fb/mugi.png", alt: "mugi" };
emoticons[":azusa:"] = { src: "http://dl.dropbox.com/u/16954721/web/fb/azusa.png", alt: "azusa" }; 
emoticons[":ui:"] = { src: "http://dl.dropbox.com/u/16954721/web/fb/ui.png", alt: "ui" }; 
emoticons[":nodoka:"] = { src: "http://dl.dropbox.com/u/16954721/web/fb/nodoka.png", alt: "nodoka" }; 
emoticons[":sawa-chan:"] = { src: "http://dl.dropbox.com/u/16954721/web/fb/sawa-chan.png", alt: "sawa-chan" }; 
emoticons[":k-on:"] = { src: "http://dl.dropbox.com/u/16954721/web/fb/k-on.png", alt: "k-on" }; 

emoticons[":yui-shocked:"] = { src: "http://i.imgur.com/DTupJ.gif", alt: "pokerface" };
emoticons[":yui-scare:"] = { src: "http://i.imgur.com/tC8ZO.gif", alt: "pokerface" };
emoticons[":yui-tired:"] = { src: "http://i.imgur.com/8CIQO.gif", alt: "pokerface" };
emoticons[":ritsu-shocked:"] = { src: "http://i.imgur.com/XRVXu.gif", alt: "pokerface" };
emoticons[":azusa-shocked:"] = { src: "http://i.imgur.com/jPUdd.gif", alt: "pokerface" };
emoticons[":lol-azusa:"] = { src: "http://i.imgur.com/gC0ms.gif", alt: "pokerface" };
emoticons[":azusa-tired:"] = { src: "http://i.imgur.com/hn7HA.gif", alt: "pokerface" };


	
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


//Auto SOlo Firefox
var SUC_script_num = 114888; //

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 3600000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('New update for "'+script_name+'."\nGo to script page? Remember click on install its free!'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update', function()
	{
		GM_openInTab("http://userscripts.org/scripts/show/114888");
	});
	updateCheck(false);
}
catch(err)
{}