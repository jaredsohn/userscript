// ==UserScript==
// @name           Smileys PC INpact pour Facebook (librairie Smileys)
// @namespace      http://www.pcinpact.com
// @description    Deuxième script appelé par le premier. NE PAS INSTALLER.
// @include        http://www.facebook.com/*
// @exclude        http://apps.facebook.com/*
// @exclude        http://*facebook.com/apps/*
// @author         lol.2.dol
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
	emoticons[":reflechis:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/gratgrat.gif",
	};
	emoticons[":humour:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/humour.png",
	};
	emoticons[":heben:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/heben.png",
	};
	emoticons[":haine:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/haine.gif",
	};
	emoticons[":arrow:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/icon_arrow.gif",
	};
	emoticons[":vante:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/vante.gif",
	};
	emoticons[":gne:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/gne.gif",
	};
	emoticons[":non:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/ripeer.gif",
	};
	emoticons[":-D"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/biggerGrin.gif",
	};
	emoticons[":fumer:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/hat.gif",
	};
	emoticons[":D"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/icon_mrgreen.gif",
	};
	emoticons[":keskidit:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/keskidit2.gif",
	};
	emoticons[":yes:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/yaisse.gif",
	};
	emoticons[":incline:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/bowdown.gif",
	};
	emoticons[":byebye:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/byebye.gif",
	};
	emoticons[":chinois:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/chinese.gif",
	};
	emoticons[":eeek2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/eeek2.gif",
	};
	emoticons[":fou:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/fou.gif",
	};
	emoticons[":francais:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/francais2.gif",
	};
	emoticons[":craint:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/frown.gif",
	};
	emoticons[":oops:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/icon_redface.gif",
	};
	emoticons[":roll:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/icon_rolleyes.gif",
	};
	emoticons[":love:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/love.gif",
	};
	emoticons["8)"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/lunettes1.gif",
	};
	emoticons[":mad2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/mad2.gif",
	};
	emoticons[":pleure:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/pleure.gif",
	};
	emoticons[":mdr:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/laugh_pci.gif",
	};
	emoticons[":mrgreen:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/icon_mrgreen.gif",
	};
	emoticons[":fume:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/fume.gif",
	};
	emoticons[":freeposts:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/freeposts.gif",
	};
	emoticons[":embarassed:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/embarassed.gif",
	};
	emoticons[":eeek:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/eek.gif",
	};
	emoticons[":duelsw:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/duelSW.gif",
	};
	emoticons[":dtc:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/dtc.gif",
	};
	emoticons[":devil:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/devil.gif",
	};
	emoticons[":ati:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/aimeati.gif",
	};
	emoticons[":copain:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/copain",
	};
	emoticons[";)"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/clindoeil.gif",
	};
	emoticons[":cheat:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/cheatspabien.png",
	};
	emoticons[":pciwin:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/champion.gif",
	};
	emoticons[":censored:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/censored.gif",
	};
	emoticons[":cdmalades:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/cdmalad.gif",
	};
	emoticons[":bouletdujour:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/bouletdujour.gif",
	};
	emoticons[":boulet:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/boulet.gif",
	};
	emoticons[":dors:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/boisdormant.gif",
	};
	emoticons[":bocul:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/bocul.gif",
	};
	emoticons[":birthday:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/birthday.gif",
	};
	emoticons[":bravo:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/applaudit_gif.gif",
	};
	emoticons[":amdpowa:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/amdpowa.gif",
	};
	emoticons[":amdnaz:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/amdpasbien.gif",
	};
	emoticons[":aimepas:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/aimepas.gif",
	};
	emoticons[":prof:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/prof.gif",
	};
	emoticons[":postsinutiles:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/posts_inutiles.png",
	};
	emoticons[":pastoutlu:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/Pas_Lu.gif",
	};
	emoticons[":ouimaistusors:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/ouimaistusors.gif",
	};
	emoticons[":ouioui:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/oui.gif",
	};
	emoticons[":musique:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/music.gif",
	};
	emoticons[":modoreussi:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/modoreussi.gif",
	};
	emoticons[":modoplease:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/modoplease.gif",
	};
	emoticons[":modocmoi:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/modocmoi.gif",
	};
	emoticons[":merci:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/merci.gif",
	};
	emoticons[":best:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/meilleur.gif",
	};
	emoticons[":malade:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/malade.gif",
	};
	emoticons[":duel1:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/lsvader.gif",
	};
	emoticons[":iloveyou:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/loveeyessmly.gif",
	};
	emoticons[":kimouss:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/kimouss.gif",
	};
	emoticons[":kill:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/kill.gif",
	};
	emoticons[":jesquate:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/jesquate.gif",
	};
	emoticons[":cartonjaune:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/jaune.gif",
	};
	emoticons[":invasion:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/invasion.gif",
	};
	emoticons[":intelpowa:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/intelpowa.gif",
	};
	emoticons[":intelnaz:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/intelpasbien.gif",
	};
	emoticons[":inpactintel:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/inpactintel.gif",
	};
	emoticons[":lock:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/lock.gif",
	};
	emoticons[":inpactforce2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/inpactforce2.gif",
	};
	emoticons[":inpactforce:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/inpactforce.gif",
	};
	emoticons[":inpactamd:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/inpactamd.gif",
	};
	emoticons[":|"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/icon_neutral.gif",
	};
	emoticons[":zzz:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/zzzzz.gif",
	};
	emoticons[":youhou:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/youhou.gif",
	};
	emoticons[":yoda:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/yoda.gif",
	};
	emoticons[":wrongplace:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/wrongplace.gif",
	};
	emoticons[":vomi2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/vomi2.gif",
	};
	emoticons[":vomi1:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/vomi1.gif",
	};
	emoticons[":inpactitude:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/inpactitude3.gif",
	};
	emoticons[":up:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/up.gif",
	};
	emoticons[":tropfort:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/tropfort.gif",
	};
	emoticons[":toutafaitdaccord:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/toutafaitdaccord.png",
	};
	emoticons[":topigliss:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/Topigliss.gif",
	};
	emoticons[":arreterstop:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/stop",
	};
	emoticons[":spicedicounass:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/spicedicounass.gif",
	};
	emoticons[":sm:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/sm.gif",
	};
	emoticons[":shuttle:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/shuttle.gif",
	};
	emoticons[":seul:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/seulacomprendre.gif",
	};
	emoticons[":cartonrouge:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/rouge.gif",
	};
	emoticons[":rhooo:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/rhooo.gif",
	};
	emoticons[":smack:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/remybussi.gif",
	};
	emoticons[":rtfm:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/rtfm2.gif",
	};
	emoticons[":questionsvp:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/questionsvp.gif",
	};
	emoticons[":mad:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/mad_pci.gif",
	};
	emoticons[":crever:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/crever.gif",
	};
	emoticons[":cap:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/maitrecapello.gif",
	};
	emoticons[":supervomi:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/supervomi.gif",
	};
	emoticons[":mega:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/mega.gif",
	};
	emoticons[":musicos:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/musicos.gif",
	};
	emoticons[":transpi:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/transpi.gif",
	};
	emoticons[":roule:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/roule.gif",
	};
	emoticons[":dd:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/dd.gif",
	};
	emoticons[":phibee:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/phibee.gif",
	};
	emoticons[":fete:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/fete.gif",
	};
	emoticons[":lapin:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/lapin.gif",
	};
	emoticons[":ane:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/ane.gif",
	};
	emoticons[":ooo"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/ooo.gif",
	};
	emoticons[":poulp:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/poulp.png",
	};
	emoticons[":surenchere:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/surenchere.gif",
	};
	emoticons[":cali:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/cali.gif",
	};
	emoticons[":dix:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/dix.gif",
	};
	emoticons[":neuf:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/neuf.gif",
	};
	emoticons[":huit:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/huit.gif",
	};
	emoticons[":sept:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/sept.gif",
	};
	emoticons[":six:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/six.gif",
	};
	emoticons[":cinq:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/cinq.gif",
	};
	emoticons[":quatre:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/quatre.gif",
	};
	emoticons[":trois:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/trois.gif",
	};
	emoticons[":deux:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/deux.gif",
	};
	emoticons[":un:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/un.gif",
	};
	emoticons[":zero:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/zero.gif",
	};
	emoticons[":top:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/icon_46.gif",
	};
	emoticons[":tristan:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/bosse.gif",
	};
	emoticons[":baton:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/baton.gif",
	};
	emoticons[":photo:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/photo.gif",
	};
	emoticons[":corde:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/corde.gif",
	};
	emoticons[":nimp:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/nimp.gif",
	};
	emoticons[":chant:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/chant.gif",
	};
	emoticons[":brice:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/brice2.gif",
	};
	emoticons[":nvidia:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/nvidia.gif",
	};
	emoticons[":56k:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/56k.gif",
	};
	emoticons[":mike:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/mike.gif",
	};
	emoticons[":weekend:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/weekend.gif",
	};
	emoticons[":vac:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/vacances.gif",
	};
	emoticons[":down:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/down.gif",
	};
	emoticons[":menfin:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/menfin.gif",
	};
	emoticons[":ati2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/ati2.gif",
	};
	emoticons[":bisous:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/bisous.gif",
	};
	emoticons[":win:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/win.gif",
	};
	emoticons[":pleure2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/pleure2.gif",
	};
	emoticons[":simple:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/simple.jpg",
	};
	emoticons[":cbon:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/mangezen.gif",
	};
	emoticons[":pastaper:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/pastaper.gif",
	};
	emoticons[":ortho:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/ortho.gif",
	};
	emoticons[":vante2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/vante2.gif",
	};
	emoticons[":paris:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/paris.gif",
	};
	emoticons[":inpactitude2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/inpactitude2.gif",
	};
	emoticons[":mdr2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/mdr2.gif",
	};
	emoticons[":troll:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/troll.gif",
	};
	emoticons[":phiphi:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/phiphi.gif",
	};
	emoticons[":linux:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/linux.gif",
	};
	emoticons[":titia:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/correct.gif",
	};
	emoticons[":move:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/depl.png",
	};
	emoticons[":p"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/langue.gif",
	};
	emoticons[":apple:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/apple.gif",
	};
	emoticons[":perv:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/perv.gif",
	};
	emoticons[":sms:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/sms2.png",
	};
	emoticons[":paf:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/paf.gif",
	};
	emoticons[":breton:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/breton.gif",
	};
	emoticons[":vf:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/vf.gif",
	};
	emoticons[":theo:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/theo.gif",
	};
	emoticons[":google2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/google2.gif",
	};
	emoticons[":zarb:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/zarb.gif",
	};
	emoticons[":xzombi:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/cerf.gif",
	};
	emoticons[":sucre:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/sucre.gif",
	};
	emoticons[":hs:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/hs.gif",
	};
	emoticons[":hs2:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/hs2.gif",
	};
	emoticons[":resolu:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/resolu.gif",
	};
	emoticons[":rem:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/rem.gif",
	};
	emoticons[":turevesmongars:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/turevesmongars.gif",
	};
	emoticons[":tux:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/tux.png",
	};
	emoticons[":plantage:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/plantage.gif",
	};
	emoticons[":bretagne:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/bretagne.gif",
	};
	emoticons[":aimerien:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/aimerien.gif",
	};
	emoticons[":nowarez:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/nowarez.png",
	};
	emoticons[":contourne:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/contourne.gif",
	};
	emoticons[":8"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/lunettes1.gif",
	};
	emoticons[":apu:"] = {
		src: "http://www.pcinpact.com/forum/style_emoticons/default/o.gif",
	};
	emoticons[":mdr2:"] = {
		src: "http://static.pcinpact.com/images/smiles/mdr2.gif",
	};
	emoticons[":glasses:"] = {
		src: "http://static.pcinpact.com/images/smiles/glasses.gif",
	};
	emoticons[":reflechis:"] = {
		src: "http://static.pcinpact.com/images/smiles/gratgrat.gif",
	};
	emoticons[":arrow:"] = {
		src: "http://static.pcinpact.com/images/smiles/icon_arrow.gif",
	};
	emoticons[":francais:"] = {
		src: "http://static.pcinpact.com/images/smiles/francais2.gif",
	};
	emoticons[":non:"] = {
		src: "http://static.pcinpact.com/images/smiles/ripeer.gif",
	};
	emoticons[":-D"] = {
		src: "http://static.pcinpact.com/images/smiles/biggerGrin.gif",
	};
	emoticons[":8"] = {
		src: "http://static.pcinpact.com/images/smiles/lunettes1.gif",
	};
	emoticons[":fumer:"] = {
		src: "http://static.pcinpact.com/images/smiles/hat.gif",
	};
	emoticons[":D"] = {
		src: "http://static.pcinpact.com/images/smiles/icon_mrgreen.gif",
	};
	emoticons[":keskidit:"] = {
		src: "http://static.pcinpact.com/images/smiles/keskidit2.gif",
	};
	emoticons[":yes:"] = {
		src: "http://static.pcinpact.com/images/smiles/yaisse.gif",
	};
	emoticons[":incline:"] = {
		src: "http://static.pcinpact.com/images/smiles/bowdown.gif",
	};
	emoticons[":byebye:"] = {
		src: "http://static.pcinpact.com/images/smiles/byebye.gif",
	};
	emoticons[":chinois:"] = {
		src: "http://static.pcinpact.com/images/smiles/chinese.gif",
	};
	emoticons[":love:"] = {
		src: "http://static.pcinpact.com/images/smiles/love.gif",
	};
	emoticons[":fou:"] = {
		src: "http://static.pcinpact.com/images/smiles/fou.gif",
	};
	emoticons[":roll:"] = {
		src: "http://static.pcinpact.com/images/smiles/icon_rolleyes.gif",
	};
	emoticons[":craint:"] = {
		src: "http://static.pcinpact.com/images/smiles/frown.gif",
	};
	emoticons[":oops:"] = {
		src: "http://static.pcinpact.com/images/smiles/icon_redface.gif",
	};
	emoticons[":pleure:"] = {
		src: "http://static.pcinpact.com/images/smiles/pleure.gif",
	};
	emoticons[":mdr:"] = {
		src: "http://static.pcinpact.com/images/smiles/laugh_pci.gif",
	};
	emoticons[":mrgreen:"] = {
		src: "http://static.pcinpact.com/images/smiles/icon_mrgreen.gif",
	};
	emoticons[":fume:"] = {
		src: "http://static.pcinpact.com/images/smiles/fume.gif",
	};
	emoticons[":auto:"] = {
		src: "http://static.pcinpact.com/images/smiles/auto.gif",
	};
	emoticons[":bigssourire:"] = {
		src: "http://static.pcinpact.com/images/smiles/biggerGrin.gif",
	};
	emoticons[":embarassed:"] = {
		src: "http://static.pcinpact.com/images/smiles/embarassed.gif",
	};
	emoticons[":devil:"] = {
		src: "http://static.pcinpact.com/images/smiles/devil.gif",
	};
	emoticons[":nonnon:"] = {
		src: "http://static.pcinpact.com/images/smiles/ripeer.gif",
	};
	emoticons[":dors:"] = {
		src: "http://static.pcinpact.com/images/smiles/boisdormant.gif",
	};
	emoticons[":eeek2:"] = {
		src: "http://static.pcinpact.com/images/smiles/eeek2.gif",
	};
	emoticons[":bravo:"] = {
		src: "http://static.pcinpact.com/images/smiles/applaudit_gif.gif",
	};
	emoticons[":cartonjaune:"] = {
		src: "http://static.pcinpact.com/images/smiles/jaune.gif",
	};
	emoticons[":neutral:"] = {
		src: "http://static.pcinpact.com/images/smiles/icon_neutral.gif",
	};
	emoticons[":ouioui:"] = {
		src: "http://static.pcinpact.com/images/smiles/oui.gif",
	};
	emoticons[":musique:"] = {
		src: "http://static.pcinpact.com/images/smiles/music.gif",
	};
	emoticons[":mad:"] = {
		src: "http://static.pcinpact.com/images/smiles/mad_pci.gif",
	};
	emoticons[":dd:"] = {
		src: "http://static.pcinpact.com/images/smiles/dd.gif",
	};
	emoticons[":roule2:"] = {
		src: "http://static.pcinpact.com/images/smiles/roule2.gif",
	};
	emoticons[":cartonrouge:"] = {
		src: "http://static.pcinpact.com/images/smiles/rouge.gif",
	};
	emoticons[":transpi:"] = {
		src: "http://static.pcinpact.com/images/smiles/transpi.gif",
	};
	emoticons[":sucre:"] = {
		src: "http://static.pcinpact.com/images/smiles/sucre.gif",
	};
	emoticons[":troll:"] = {
		src: "http://static.pcinpact.com/images/smiles/troll.gif",
	};
	emoticons[":langue:"] = {
		src: "http://static.pcinpact.com/images/smiles/langue.gif",
	};
	emoticons[":breton:"] = {
		src: "http://static.pcinpact.com/images/smiles/breton.gif",
	};
	emoticons[":zarb:"] = {
		src: "http://static.pcinpact.com/images/smiles/zarb.gif",
	};
	emoticons[":xzombi:"] = {
		src: "http://static.pcinpact.com/images/smiles/cerf.gif",
	};
	emoticons[":crever:"] = {
		src: "http://static.pcinpact.com/images/smiles/crever.gif",
	};
	emoticons[":phibee:"] = {
		src: "http://static.pcinpact.com/images/smiles/phibee.gif",
	};
	emoticons[":cul:"] = {
		src: "http://static.pcinpact.com/images/smiles/cul.gif",
	};
	emoticons[":lapin:"] = {
		src: "http://static.pcinpact.com/images/smiles/lapin.gif",
	};
	emoticons[":ane:"] = {
		src: "http://static.pcinpact.com/images/smiles/ane.gif",
	};
	emoticons[":stress:"] = {
		src: "http://static.pcinpact.com/images/smiles/stress.gif",
	};
	emoticons[":duelsw:"] = {
		src: "http://static.pcinpact.com/images/smiles/duelSW.gif",
	};
	emoticons[":marin:"] = {
		src: "http://static.pcinpact.com/images/smiles/marin.gif",
	};
	emoticons[":censored:"] = {
		src: "http://static.pcinpact.com/images/smiles/censored.gif",
	};
	emoticons[":ouimaistusors:"] = {
		src: "http://static.pcinpact.com/images/smiles/ouimaistusors.gif",
	};
	emoticons[":oui2:"] = {
		src: "http://static.pcinpact.com/images/smiles/oui2",
	};
	emoticons[":mad2:"] = {
		src: "http://static.pcinpact.com/images/smiles/mad2.gif",
	};
	emoticons[":iloveyou:"] = {
		src: "http://static.pcinpact.com/images/smiles/loveeyessmly.gif",
	};
	emoticons[":kimouss:"] = {
		src: "http://static.pcinpact.com/images/smiles/kimouss.gif",
	};
	emoticons[":vomi2:"] = {
		src: "http://static.pcinpact.com/images/smiles/vomi2.gif",
	};
	emoticons[":youhou:"] = {
		src: "http://static.pcinpact.com/images/smiles/youhou.gif",
	};
	emoticons[":vomi1:"] = {
		src: "http://static.pcinpact.com/images/smiles/vomi1.gif",
	};
	emoticons[":yoda:"] = {
		src: "http://static.pcinpact.com/images/smiles/yoda.gif",
	};
	emoticons[":kill:"] = {
		src: "http://static.pcinpact.com/images/smiles/kill.gif",
	};
	emoticons[":smack:"] = {
		src: "http://static.pcinpact.com/images/smiles/remybussi.gif",
	};
	emoticons[":naz:"] = {
		src: "http://static.pcinpact.com/images/smiles/naz.gif",
	};
	emoticons[":supervomi:"] = {
		src: "http://static.pcinpact.com/images/smiles/supervomi.gif",
	};
	emoticons[":pet:"] = {
		src: "http://static.pcinpact.com/images/smiles/pet.gif",
	};
	emoticons[":sm:"] = {
		src: "http://static.pcinpact.com/images/smiles/sm.gif",
	};
	emoticons[":singe:"] = {
		src: "http://static.pcinpact.com/images/smiles/singe.gif",
	};
	emoticons[":mega:"] = {
		src: "http://static.pcinpact.com/images/smiles/mega.gif",
	};
	emoticons[":roule:"] = {
		src: "http://static.pcinpact.com/images/smiles/roule.gif",
	};
	emoticons[":musicos:"] = {
		src: "http://static.pcinpact.com/images/smiles/musicos.gif",
	};
	emoticons[":tchintchin:"] = {
		src: "http://static.pcinpact.com/images/smiles/tchin.gif",
	};
	emoticons[":perv:"] = {
		src: "http://static.pcinpact.com/images/smiles/perv.gif",
	};
	emoticons[":heben:"] = {
		src: "http://static.pcinpact.com/images/smiles/heben.png",
	};
	emoticons[":birthday:"] = {
		src: "http://static.pcinpact.com/images/smiles/birthday.gif",
	};
	emoticons[":dix:"] = {
		src: "http://static.pcinpact.com/images/smiles/dix.gif",
	};
	emoticons[":neuf:"] = {
		src: "http://static.pcinpact.com/images/smiles/neuf.gif",
	};
	emoticons[":huit:"] = {
		src: "http://static.pcinpact.com/images/smiles/huit.gif",
	};
	emoticons[":sept:"] = {
		src: "http://static.pcinpact.com/images/smiles/sept.gif",
	};
	emoticons[":six:"] = {
		src: "http://static.pcinpact.com/images/smiles/six.gif",
	};
	emoticons[":cinq:"] = {
		src: "http://static.pcinpact.com/images/smiles/cinq.gif",
	};
	emoticons[":quatre:"] = {
		src: "http://static.pcinpact.com/images/smiles/quatre.gif",
	};
	emoticons[":trois:"] = {
		src: "http://static.pcinpact.com/images/smiles/trois.gif",
	};
	emoticons[":deux:"] = {
		src: "http://static.pcinpact.com/images/smiles/deux.gif",
	};
	emoticons[":un:"] = {
		src: "http://static.pcinpact.com/images/smiles/un.gif",
	};
	emoticons[":zero:"] = {
		src: "http://static.pcinpact.com/images/smiles/zero.gif",
	};
	emoticons[":merci:"] = {
		src: "http://static.pcinpact.com/images/smiles/merci.gif",
	};
	emoticons[":pastaper:"] = {
		src: "http://static.pcinpact.com/images/smiles/pastaper.gif",
	};
	emoticons[":faim:"] = {
		src: "http://static.pcinpact.com/images/smiles/faim.gif",
	};
	emoticons[":boulet:"] = {
		src: "http://static.pcinpact.com/images/smiles/boulet.gif",
	};
	emoticons[":humour:"] = {
		src: "http://static.pcinpact.com/images/smiles/humour.png",
	};
	emoticons[":copain:"] = {
		src: "http://static.pcinpact.com/images/smiles/copain.png",
	};
	emoticons[":best:"] = {
		src: "http://static.pcinpact.com/images/smiles/meilleur.gif",
	};
	emoticons[":bouletdujour:"] = {
		src: "http://static.pcinpact.com/images/smiles/bouletdujour.gif",
	};
	emoticons[":cbon:"] = {
		src: "http://static.pcinpact.com/images/smiles/mangezen.gif",
	};
	emoticons[":jesquate:"] = {
		src: "http://static.pcinpact.com/images/smiles/jesquate.gif",
	};
	emoticons[":rhooo:"] = {
		src: "http://static.pcinpact.com/images/smiles/rhooo.gif",
	};
	emoticons[":zzz:"] = {
		src: "http://static.pcinpact.com/images/smiles/zzzzz.gif",
	};
	emoticons[":nimp:"] = {
		src: "http://static.pcinpact.com/images/smiles/nimp.gif",
	};
	emoticons[":inpactitude2:"] = {
		src: "http://static.pcinpact.com/images/smiles/inpactitude2.gif",
	};
	emoticons[":inpactitude:"] = {
		src: "http://static.pcinpact.com/images/smiles/inpactitude3.gif",
	};
	emoticons[":bisous:"] = {
		src: "http://static.pcinpact.com/images/smiles/bisous.gif",
	};
	emoticons[":win:"] = {
		src: "http://static.pcinpact.com/images/smiles/win.gif",
	};
	emoticons[":pleure2:"] = {
		src: "http://static.pcinpact.com/images/smiles/pleure2.gif",
	};
	emoticons[":muscu:"] = {
		src: "http://static.pcinpact.com/images/smiles/muscu.gif",
	};
	emoticons[":fete:"] = {
		src: "http://static.pcinpact.com/images/smiles/fete.gif",
	};
	emoticons[":chant:"] = {
		src: "http://static.pcinpact.com/images/smiles/chant.gif",
	};
	emoticons[":photo:"] = {
		src: "http://static.pcinpact.com/images/smiles/photo.gif",
	};
	emoticons[":cap:"] = {
		src: "http://static.pcinpact.com/images/smiles/maitrecapello.gif",
	};
	emoticons[":rtfm:"] = {
		src: "http://static.pcinpact.com/images/smiles/rtfm.gif",
	};
	emoticons[":fou3:"] = {
		src: "http://static.pcinpact.com/images/smiles/fou3.gif",
	};
	emoticons[":poke:"] = {
		src: "http://static.pcinpact.com/images/smiles/poke.gif",
	};
	emoticons[":ooo:"] = {
		src: "http://static.pcinpact.com/images/smiles/ooo.gif",
	};
	emoticons[":surenchere:"] = {
		src: "http://static.pcinpact.com/images/smiles/surenchere.gif",
	};
	emoticons[":phiphi:"] = {
		src: "http://static.pcinpact.com/images/smiles/phiphi.gif",
	};
	emoticons[":top:"] = {
		src: "http://static.pcinpact.com/images/smiles/top.gif",
	};
	emoticons[":tristan:"] = {
		src: "http://static.pcinpact.com/images/smiles/bosse.gif",
	};
	emoticons[":baton:"] = {
		src: "http://static.pcinpact.com/images/smiles/baton.gif",
	};
	emoticons[":prison:"] = {
		src: "http://static.pcinpact.com/images/smiles/prison.gif",
	};
	emoticons[":kc:"] = {
		src: "http://static.pcinpact.com/images/smiles/kc.gif",
	};
	emoticons[":mike:"] = {
		src: "http://static.pcinpact.com/images/smiles/mike.gif",
	};
	emoticons[":fr:"] = {
		src: "http://static.pcinpact.com/images/smiles/france.gif",
	};
	emoticons[":plantage:"] = {
		src: "http://static.pcinpact.com/images/smiles/plantage.gif",
	};
	emoticons[":accident:"] = {
		src: "http://static.pcinpact.com/images/smiles/accident.gif",
	};
	emoticons[":rem:"] = {
		src: "http://static.pcinpact.com/images/smiles/rem.gif",
	};
	emoticons[":bocul:"] = {
		src: "http://static.pcinpact.com/images/smiles/bocul.gif",
	};
	emoticons[":duel1:"] = {
		src: "http://static.pcinpact.com/images/smiles/lsvader.gif",
	};
	emoticons[":eeek:"] = {
		src: "http://static.pcinpact.com/images/smiles/eek.gif",
	};
	emoticons[":stress:"] = {
		src: "http://static.pcinpact.com/images/smiles/stress.gif",
	};
	emoticons[":baffe: "] = {
		src: "http://static.pcinpact.com/images/smiles/baffe.gif",
	};
	emoticons[":windu:"] = {
		src: "http://static.pcinpact.com/images/smiles/windu.gif",
	};

		
var emotxt = [];
var pcismile = [];
var c;
for (var emo in emoticons) 
	if (!(emoticons[emo] instanceof Function)) {
		c = emo.charCodeAt(0);
		if (!pcismile[c]) 
			pcismile[c] = [];
		
		pcismile[c].push({
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
for (i = 0; i < pcismile.length; i++) 
	if (pcismile[i]) 
		pcismile[i].sort(f);
	
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