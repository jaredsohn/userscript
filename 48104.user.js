// ==UserScript==
// @name           [JVC] JeuxVideo.Nyu
// @namespace      jvn
// @description    Script Greasemonkey pour jeuxvideo.com par Sofea v1.08
// @include        http://www.jeuxvideo.com/forums/0-*-*-*-*-*-*-*.htm*
// @include        http://www.jeuxvideo.com/forums/1-*-*-*-*-*-*-*.htm*
// @include        http://www.jeuxvideo.com/forums/3-*-*-*-*-*-*-*.htm*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums_profil.cgi?*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/avertir_moderateur.cgi?*
// @include        http://www.jeuxvideo.com/smileys/legende.htm
// @include        http://www.jeuxvideo.com/cgi-bin/admin/moncompte.cgi*
// @include        http://www.jeuxvideo.com/cgi-bin/jvforums/moderation.cgi
// @include        http://www.jeuxvideo.com/avatars/view_avatar.htm*
// @include        http://www.jeuxvideo.com/forums_inex.htm
// ==/UserScript==
// Â© Sofea corp. 1987-2009

function MAJ() {
	var maj = GM_getValue("maj_version",0);
	switch (maj) {
		case 0 : {
			var test = confirm("Utiliser la coloration des pseudonymes par dÃ©faut ?");
			if (test) {
				var mod = 1;
			} else {
				var mod = 0;
			}
			var test = confirm("Rappel du pseudonyme effectivement utilisÃ© lors de l'affichage d'un groupement ?");
			if (test) {
				mod += 4;
			} else {
				mod += 2;
			}
			GM_setValue("modedef",mod);
			var groupe = "Rafy"; var color = "#D00000"; var mode = -1; {
				GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
				listeadd("bouboule","",groupe,mode);
				listeadd("rafyazzworldem","",groupe,mode);
				listeadd("rafyfy","",groupe,mode);
				listeadd("rafyx_007","",groupe,mode);
				listeadd("rafynator","",groupe,mode);
				listeadd("rafythekiller","",groupe,mode);
				listeadd("rafy_bide","",groupe,mode);
				listeadd("morpheus80","",groupe,mode);
				listeadd("nibal","",groupe,mode);
				listeadd("aerodynamisme","",groupe,mode);
				listeadd("benjamingates","",groupe,mode);
				listeadd("dragonwhite","",groupe,mode);
				listeadd("steamworks","",groupe,mode);
			}
			pradd("votemeup.com");
			pradd("sexy-sarah.info");
			pradd("fake-url.net");
			pradd("porn.vidz.com");
			var groupe = GM_getValue("gp#"+"keishin"+"#groupe","Fox");
			if (groupe == "Fox") {
				renamegroupement(groupe,"Jak");
			}
			var n = GM_getValue("gp#prc_nombre",0);
			for (var i=0;i<n;i++) {
				var groupe = GM_getValue("gp#prc_"+i,"");
				var gp = groupe.toLowerCase();
				var liste = GM_getValue("gp#prc#"+gp,"");
				if (liste != "") {
					var pseudo = liste.split("|");
					for (var j=1;j<pseudo.length;j++) {
						GM_setValue("gp#"+pseudo[j].toLowerCase()+"#mode",-1);
						groupe = GM_getValue("gp#"+pseudo[j].toLowerCase()+"#groupe",groupe);
					}
					GM_setValue("gp#prc_"+i,groupe);
				}
			}
		}
		case 1 : {
			pradd("minilien.fr");
			pradd("adultfriendfinder.com");
			pradd("pix.jj.am");
			listeadd("Mist","","Kyon-kun",-1);
			listeadd("Risk","","Kyon-kun",-1);
			listeadd("Sophia","","Soph'",-1);
		}
		case 2 : {
			pradd("exgirl007.myhotpicss.com");
			pradd("amber.thisismyrevenge.com");
		}
		case 3 : {
			pradd("ninaetmoi.com");
			pradd(".labrute.com");
			pradd("entregamers.com");
			pradd("chouxalacreme.o-n.fr");
			pradd("ihateher.freeheberg.com");
			pradd("petitsliens.com");
			pradd("miaslut.com");
			var groupe = "Chocolayte"; var color = "#009900"; var mode = -1; {
				GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
				listeadd("Chocolayte","",groupe,mode);
				listeadd("Chocolayte-","",groupe,mode);
				listeadd("Chocolayte--","",groupe,mode);
				listeadd("Chocolayte---","",groupe,mode);
				listeadd("ChocoTalc","",groupe,mode);
				listeadd("ChocoFake","",groupe,mode);
				listeadd("ChocoOsef","",groupe,mode);
				listeadd("ChocoOwned","",groupe,mode);
				listeadd("ChocoCake","",groupe,mode);
				listeadd("ChocoKick","",groupe,mode);
				listeadd("ChocoNoob","",groupe,mode);
				listeadd("ChocoOro","",groupe,mode);
				listeadd("ChocoGolden","",groupe,mode);
				listeadd("ChocoModo","",groupe,mode);
				listeadd("ChocoOurs","",groupe,mode);
				listeadd("ChocoCoeur","",groupe,mode);
				listeadd("ChocoBave","",groupe,mode);
				listeadd("ChocoMange","",groupe,mode);
				listeadd("ChocoDort","",groupe,mode);
				listeadd("ChocoNo-life","",groupe,mode);
				listeadd("ChocoYes-life","",groupe,mode);
			}
			var groupe = "Mazda"; var color = "#FF4901"; var mode = -1; {
				GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
				listeadd("2k10","",groupe,mode);
				listeadd("2k8","",groupe,mode);
				listeadd("BarretteMemoire","",groupe,mode);
				listeadd("CadeauxDeNoel","",groupe,mode);
				listeadd("Demelza","",groupe,mode);
				listeadd("Fatal1ty","",groupe,mode);
				listeadd("HubUSB","",groupe,mode);
				listeadd("Ienoor","",groupe,mode);
				listeadd("IkHoudVanJou","",groupe,mode);
				listeadd("IkHouVanJou","",groupe,mode);
				listeadd("IntelCorei7","",groupe,mode);
				listeadd("Kipa","",groupe,mode);
				listeadd("Lenoor","",groupe,mode);
				listeadd("LogitechG5","",groupe,mode);
				listeadd("Mazda323","",groupe,mode);
				listeadd("MazdaDeVoyage","",groupe,mode);
				listeadd("MazdaMX-5","",groupe,mode);
				listeadd("MazdaRX-7","",groupe,mode);
				listeadd("MazdaRX-8","",groupe,mode);
				listeadd("MazdaRX-8_","",groupe,mode);
				listeadd("MazdaRX-9","",groupe,mode);
				listeadd("NissanSentra","",groupe,mode);
				listeadd("Paiement","",groupe,mode);
				listeadd("RivetCity","",groupe,mode);
				listeadd("RoyalFIush","",groupe,mode);
				listeadd("SharonDenAdel","",groupe,mode);
				listeadd("ShauniEricsson","",groupe,mode);
				listeadd("StephanForte","",groupe,mode);
				listeadd("Tosti","",groupe,mode);
				listeadd("Tox1c1ty","",groupe,mode);
				listeadd("TwelveHundred","",groupe,mode);
				listeadd("VitalijKuprij","",groupe,mode);
				listeadd("OhMijnGod","",groupe,mode);
				listeadd("CookiIachatte","",groupe,mode);
				listeadd("Parijs","",groupe,mode);
				listeadd("Alkmaar","",groupe,mode);
			}
			groupe = GM_getValue("gp#paiccitron#groupe",pseudo);
			if (GM_getValue("gp#prc#"+groupe.toLowerCase()+"#clr","#A0C544")) {
				GM_getValue("gp#prc#"+groupe.toLowerCase()+"#clr","#000066");
			}
			var groupe = "Latios[JV]"; var color = "#2C75FF"; var mode = -1; {
				GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
				listeadd("Lo_paris","",groupe,mode);
				listeadd("Latias[JV]","",groupe,mode);
				listeadd("Latios[JV]","",groupe,mode);
				listeadd("Preference","",groupe,mode);
				listeadd("Lumiere_Sombre","",groupe,mode);
				listeadd("-Puzzle-","",groupe,mode);
				listeadd("ho-oh5_3","",groupe,mode);
				listeadd("[Latios-Latias]","",groupe,mode);
				listeadd("-LJV-","",groupe,mode);
				listeadd("HuitDecembre","",groupe,mode);
				listeadd("MrJerry","",groupe,mode);
				listeadd("BulleDEau","",groupe,mode);
				listeadd("ChefDOeuvre","",groupe,mode);
				listeadd("MrTom","",groupe,mode);
				listeadd("Zavion","",groupe,mode);
				listeadd("Latinou","",groupe,mode);
				listeadd("Latinounet","",groupe,mode);
				listeadd("RealLatios","",groupe,mode);
				listeadd("iLatios","",groupe,mode);
				listeadd("Sea[JV]","",groupe,mode);
				listeadd("Iatios[JV]","",groupe,mode);
				listeadd("Latiosounet","",groupe,mode);
				listeadd("Poire[JV]","",groupe,mode);
				listeadd("DieuDuSexe","",groupe,mode);
				listeadd("BloodAndSoul","",groupe,mode);
				listeadd("BloodAndTears","",groupe,mode);
				listeadd("[RoxEtRouky] ","",groupe,mode);
			}
			var groupe = "Raziel"; var color = "#01D758"; var mode = -1; {
				GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
				listeadd("Raziel5689","",groupe,mode);
				listeadd("Zashy","",groupe,mode);
			}
			var groupe = "somonflex "; var color = "#FF0000"; var mode = -1; {
				GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
				listeadd("somonflex","",groupe,mode);
				listeadd("Gilles_Gabriel","",groupe,mode);
				listeadd("fIex","",groupe,mode);
				listeadd("SMlRNOFF","",groupe,mode);
				listeadd("BeIou","",groupe,mode);
				listeadd("DlABLO3","",groupe,mode);
				listeadd("Oscassophobiste","",groupe,mode);
				listeadd("Aflexandre","",groupe,mode);
				listeadd("0utlawz69","",groupe,mode);
				listeadd("flextoys","",groupe,mode);
				listeadd("Talkie_Cookie","",groupe,mode);
				listeadd("Walkie_Brownie","",groupe,mode);
				listeadd("Florenza","",groupe,mode);
				listeadd("FlexGod","",groupe,mode);
				listeadd("Scars0nBroadway","",groupe,mode);
			}
		} 
		default :
			GM_setValue("maj_version",4);
			break;
	}
}

function listeadd(pseudo,color,groupe,mode) {
	var ps = pseudo.toLowerCase();
	var gp = groupe.toLowerCase();
	var ancien = GM_getValue("gp#"+ps+"#groupe",ps);
	GM_setValue("gp#"+ps+"#color",color);
	GM_setValue("gp#"+ps+"#groupe",groupe);
	GM_setValue("gp#"+ps+"#mode",mode);
	GM_setValue("gp#"+ps+"#grp",true);
	var liste = GM_getValue("gp#prc#"+gp,"");
	var i = parseInt(liste);
	var n = GM_getValue("gp#prc_nombre",0);
	if (i>=0 && i<n) {
		var exgroupe = GM_getValue("gp#prc_"+i,"");
		var exgp = exgroupe.toLowerCase();
		if (exgp!=gp) {
			liste="";
		}
	} else {
		liste="";
	}
	if (liste == "") {
		GM_setValue("gp#prc_"+n,groupe);
		liste = ""+n+"#";
		GM_setValue("gp#prc_nombre",n+1);
		GM_setValue("gp#prc#"+gp,liste);
	}
	var str = "";
	for (var i=0;i<liste.length;i++) {
		switch (liste[i]) {
			case "[" :
				str += "<";
			break;
			case "]" :
				str += ">";
			break;
			case "-" :
				str += "Â¤";
			break;
			default :
				str += liste[i];
			break;
		}
	}
	str = "("+str+")";
	var reg = new RegExp(str,"gi");
	var str = "";
	for (var i=0;i<ps.length;i++) {
		switch (ps[i]) {
			case "[" :
				str += "<";
			break;
			case "]" :
				str += ">";
			break;
			case "-" :
				str += "Â¤";
			break;
			default :
				str += ps[i];
			break;
		}
	}
	var test = reg.test(str);
	if (!test) {
		liste += "|" + ps;
		GM_setValue("gp#prc#"+gp,liste);	
	}
}

function delpseudo(pseudo) {
	var ps = pseudo.toLowerCase();
	var groupe = GM_getValue("gp#"+ps+"#groupe",ps);
	var gp = groupe.toLowerCase();
	GM_setValue("gp#"+ps+"#color","");
	GM_setValue("gp#"+ps+"#groupe",pseudo);
	GM_setValue("gp#"+ps+"#mode","");
	GM_setValue("gp#"+ps+"#grp",false);
	var liste = GM_getValue("gp#prc#"+gp,"");
	var str = "";
	for (var i=0;i<liste.length;i++) {
		switch (liste[i]) {
			case "[" :
				str += "<";
			break;
			case "]" :
				str += ">";
			break;
			case "-" :
				str += "Â¤";
			break;
			case "|" :
				str += "Âµ";
			break;
			default :
				str += liste[i];
			break;
		}
	}
	liste = str + "Âµ";
	var str = "";
	for (var i=0;i<ps.length;i++) {
		switch (ps[i]) {
			case "[" :
				str += "<";
			break;
			case "]" :
				str += ">";
			break;
			case "-" :
				str += "Â¤";
			break;
			case "|" :
				str += "Âµ";
			break;
			default :
				str += ps[i];
			break;
		}
	}
	str = "Âµ" + str + "Âµ";
	liste = liste.replace(new RegExp(str,"gi"),"Âµ");
	var str = "";
	for (var i=0;i<liste.length-1;i++) {
		switch (liste[i]) {
			case "<" :
				str += "[";
			break;
			case ">" :
				str += "]";
			break;
			case "Â¤" :
				str += "-";
			break;
			case "Âµ" :
				str += "|";
			break;
			default :
				str += liste[i];
			break;
		}
	}
	liste = str;
	GM_setValue("gp#prc#"+gp,liste);
}

function delgroupement(groupe) {
	if (groupe != "") {
		var gp = groupe.toLowerCase();
		var liste = GM_getValue("gp#prc#"+gp,"");
		var n = GM_getValue("gp#prc_nombre",0);
		if (liste != "") {
			var m = parseInt(liste);
			if (m>=0 && m<n) {
				var pseudo = liste.split("|");
				for (var i=1;i<pseudo.length;i++) {
					delpseudo(pseudo[i]);
				}
				for (var i=m+1;i<n;i++) {
					var ps2 = GM_getValue("gp#prc_"+i,"");
					GM_setValue("gp#prc_"+(i-1),ps2);
					var liste2 = GM_getValue("gp#prc#"+ps2,"");
					var liste3 = ""+(i-1)+"#"+liste2.split("#")[1];
					GM_setValue("gp#prc#"+ps2,liste3);
				}
				GM_setValue("gp#prc#"+gp,"");
				GM_setValue("gp#prc#"+gp+"#clr","");
				GM_setValue("gp#prc_"+(n-1),"");
				GM_setValue("gp#prc_nombre",n-1);
			}
		}
	}
}

function renamegroupement(groupe,newname) {
	if (groupe != "") {
		var gp = groupe.toLowerCase();
		var liste = GM_getValue("gp#prc#"+gp,"");
		var n = GM_getValue("gp#prc_nombre",0);
		if (liste != "") {
			var m = parseInt(liste);
			if (m>=0 && m<n) {
				var pseudo = liste.split("|");
				for (var i=1;i<pseudo.length;i++) {
					var color = GM_getValue("gp#"+pseudo[i].toLowerCase()+"#color","");
					var mode = GM_getValue("gp#"+pseudo[i].toLowerCase()+"#mode","");
					delpseudo(pseudo[i]);
					listeadd(pseudo[i],color,newname,mode);
				}
				n = GM_getValue("gp#prc_nombre",0);
				for (var i=m+1;i<n;i++) {
					var ps2 = GM_getValue("gp#prc_"+i,"");
					GM_setValue("gp#prc_"+(i-1),ps2);
					var liste2 = GM_getValue("gp#prc#"+ps2,"");
					var liste3 = ""+(i-1)+"#"+liste2.split("#")[1];
					GM_setValue("gp#prc#"+ps2,liste3);
				}
				var gclr = GM_getValue("gp#prc#"+gp+"#clr","");
				GM_setValue("gp#prc#"+newname.toLowerCase()+"#clr",gclr);
				GM_setValue("gp#prc#"+gp,"");
				GM_setValue("gp#prc#"+gp+"#clr","");
				GM_setValue("gp#prc_"+(n-1),"");
				GM_setValue("gp#prc_nombre",n-1);
			}
		}
	}
}

function psadd(pseudo,pass) {
	var pl = pass.length;
	var pp = pseudo.length;
	var i = GM_getValue("nb_pseudos",0);
	if (pl >= 5 && pp >= 3) {
		GM_setValue("lst#"+i,pseudo.substring(0,15));
		GM_setValue("lst#"+pseudo.toLowerCase(),pass.substring(0,12));
		GM_setValue("nb_pseudos",i+1);
	}
}

function pradd(lien) {
	var liste = GM_getValue("Protection","");
	if (liste == "") {
		liste = lien;
	} else {
		var reg = new RegExp("("+liste+")","gi");
		if (!(reg.test(lien))) {
			liste += "|"+lien;
		}
	}
	GM_setValue("Protection",liste);
}

function imgadd(initial,terminal) {
	var img = GM_getValue("img_liste","");
	if (img != "") {
		var test = new RegExp("("+img+")","gi").test(initial);
		if (terminal.toLowerCase()!= initial.toLowerCase() && !test) {
			img += "|" + initial;
		}
		if (terminal == initial && test) {
			img = "Â¤"+img.replace(/\|/g,"Â¤")+"Â¤";
			img = img.replace(new RegExp("Â¤"+initial+"Â¤","gi"),"Â¤");
			img = img.replace(/Â¤/g,"|").substring(1,img.length-1);
		}
	} else {
		img = initial;
	}
	GM_setValue("img_liste",img);
	GM_setValue("img#"+initial.toLowerCase(),terminal);
}

function smladd(motif,image) {
	var n = GM_getValue("nb_smileys",0);
	GM_setValue("sm#"+n+"#motif",motif);
	GM_setValue("sm#"+n+"#img",image);
	GM_setValue("nb_smileys",n+1);
}

function PseudoListe(a) {
	if (GM_getValue("jvc_coloration",true) || GM_getValue("jvc_regroupement",true)) {
		var modo = (a.className == "pseudo topic_mod");
		var pseudo = a.innerHTML;
		a.title = pseudo;
		groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
		gclr = GM_getValue("gp#prc#"+groupe.toLowerCase()+"#clr","");
		clr = GM_getValue("gp#"+pseudo.toLowerCase()+"#color","");
		if (clr == "") {
			clr = gclr;
		}
		mod = GM_getValue("gp#"+pseudo.toLowerCase()+"#mode",-1);
		var font = document.createElement('font');
		font.setAttribute("color",clr);
		if (mod == -1) {
			mod = GM_getValue("modedef",0);
		}
		if (groupe.toLowerCase() == pseudo.toLowerCase()) {
			mod = mod % 2;
		}
		if (!(GM_getValue("jvc_coloration",true))) {
			mod = mod - mod % 2;
		}
		if (!(GM_getValue("jvc_regroupement",true))) {
			mod = mod % 2;
		}
		switch (mod) {
		case 1 :
			a.innerHTML="";
			font.appendChild(document.createTextNode(pseudo));
			a.appendChild(font);
		break;
		case 3 :
		case 5 :
		case 7 :
			a.innerHTML="";
			font.appendChild(document.createTextNode(groupe));
			if (modo) {
				var blink = document.createElement('blink');
				blink.appendChild(font);
				a.appendChild(blink);
			} else {
				a.appendChild(font);
			}
		break;
		case 2 :
		case 4 :
		case 6 :
			a.innerHTML="";
			a.appendChild(document.createTextNode(groupe));
		break;
		}
}
}

function PseudoTopic(a,id) {
	if (GM_getValue("jvc_coloration",true) || GM_getValue("jvc_regroupement",true)) {
		var bloc = a.getElementsByTagName('a');
		bloc[0].id = "Supression_"+id;
		bloc[bloc.length-1].id = "Profil_"+id;
		var bloc = a.getElementsByTagName('strong')[0];
		var pseudo = bloc.innerHTML;
		var modo = (bloc.className == "moderateur");
		a.title = pseudo;
		groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
		gclr = GM_getValue("gp#prc#"+groupe.toLowerCase()+"#clr","");
		clr = GM_getValue("gp#"+pseudo.toLowerCase()+"#color","");
		if (clr == "") {
			clr = gclr;
		}
		mode = GM_getValue("gp#"+pseudo.toLowerCase()+"#mode",-1);
		var font = document.createElement('font');
		font.setAttribute("color",clr);
		if (mode == -1) {
			mode = GM_getValue("modedef",0);
		}
		if (groupe.toLowerCase() == pseudo.toLowerCase()) {
			mode = mode % 2;
		}
		if (!(GM_getValue("jvc_coloration",true))) {
			mode = mode - mode % 2;
		}
		if (!(GM_getValue("jvc_regroupement",true))) {
			mode = mode % 2;
		}
		switch (mode) {
		case 1 :
			bloc.innerHTML = "";
			font.appendChild(document.createTextNode(pseudo));
			if (modo) {
				var blink = document.createElement('blink');
				blink.appendChild(font);
				bloc.appendChild(blink);
			} else {
				bloc.appendChild(font);
			}
		break;
		case 2 :
			bloc.innerHTML = "";
			bloc.appendChild(document.createTextNode(groupe));
		break;
		case 3 :
			bloc.innerHTML = "";
			font.appendChild(document.createTextNode(groupe));
			if (modo) {
				var blink = document.createElement('blink');
				blink.appendChild(font);
				bloc.appendChild(blink);
			} else {
				bloc.appendChild(font);
			}
		break;
		case 4 :
			bloc.innerHTML = "";
			bloc.appendChild(document.createTextNode(groupe));
			var ital = document.createElement('i');
			var small = document.createElement('small');
			var texte = document.createTextNode(pseudo);
			ital.appendChild(document.createTextNode(" en tant que "));
			small.appendChild(ital);
			small.appendChild(texte);
			bloc.parentNode.insertBefore(small,bloc.nextSibling);
		break;
		case 5 :
			bloc.innerHTML = "";
			font.appendChild(document.createTextNode(groupe));
			if (modo) {
				var blink = document.createElement('blink');
				blink.appendChild(font);
				bloc.appendChild(blink);
			} else {
				bloc.appendChild(font);
			}
			var ital = document.createElement('i');
			var small = document.createElement('small');
			var texte = document.createTextNode(pseudo);
			ital.appendChild(document.createTextNode(" en tant que "));
			small.appendChild(ital);
			small.appendChild(texte);
			bloc.parentNode.insertBefore(small,bloc.nextSibling);
		break;
		case 6 :
			bloc.innerHTML = "";
			bloc.appendChild(document.createTextNode(pseudo));
			var ital = document.createElement('i');
			var small = document.createElement('small');
			ital.appendChild(document.createTextNode(" ( "+groupe+" )"));
			small.appendChild(ital);
			bloc.parentNode.insertBefore(small,bloc.nextSibling);
		break;
		case 7 :
			bloc.innerHTML = "";
			font.appendChild(document.createTextNode(pseudo));
			if (modo) {
				var blink = document.createElement('blink');
				blink.appendChild(font);
				bloc.appendChild(blink);
			} else {
				bloc.appendChild(font);
			}
			var ital = document.createElement('i');
			var small = document.createElement('small');
			ital.appendChild(document.createTextNode(" ( "+groupe+" )"));
			small.appendChild(ital);
			bloc.parentNode.insertBefore(small,bloc.nextSibling);
		break;
		}
	}
}

function ListeAlternance(idpseudo,idmdp,check,last) {
	var selection = document.createElement("select");
	selection.id = "liste_pseudonymes";
	selection.name = idpseudo+"#"+idmdp+"#"+check;
	selection.setAttribute("width","100px");
	var option = document.createElement("option");;
	var texte = document.createTextNode("");
	var value;
	option.id = "lst_psd";
	option.value = -1;
	option.appendChild(texte);
	if (0==last) {
		option.selected = true;
	}
	selection.appendChild(option);
	for (var i=0;i<GM_getValue("nb_pseudos",0);i++) {
		option = document.createElement("option");
		var pseudo = GM_getValue("lst#"+i,"");
		texte = document.createTextNode(pseudo);
		option.value = i;
		option.id = "lst_psd_"+i;
		option.appendChild(texte);
		if (i==last) {
			option.selected = true;
			var pass = GM_getValue("lst#"+pseudo.toLowerCase(),"");
			document.getElementById(idpseudo).value = pseudo.substring(0,15);
			document.getElementById(idmdp).value = pass.substring(0,12);
			document.getElementById(idpseudo).parentNode.style.display = "none";
			document.getElementById(idmdp).parentNode.style.display = "none";
			document.getElementById(check).parentNode.style.display = "none";
		}
		selection.appendChild(option);
	}
	selection.setAttribute("tabindex",last);
	selection.setAttribute("selectedIndex",last);
	selection.style.width = "150px";
	var addpseudo = document.createElement("img");
	addpseudo.style.cursor = "pointer";
	addpseudo.id = "ajouter_pseudonyme";
	addpseudo.src = "http://www.noelshack.com/uploads/green+013294.png";
	addpseudo.title = "Ajouter pseudonyme";
	addpseudo.alt = addpseudo.title;
	var rmvpseudo = document.createElement("img");
	rmvpseudo.style.cursor = "pointer";
	rmvpseudo.id = "retirer_pseudonyme";
	rmvpseudo.src = "http://www.noelshack.com/uploads/orange-009637.png";
	rmvpseudo.title = "Retirer pseudonyme";
	rmvpseudo.alt = rmvpseudo.title;
	var chgpseudo = document.createElement("img");
	chgpseudo.style.cursor = "pointer";
	chgpseudo.id = "changer_pseudonyme";
	chgpseudo.src = "http://www.noelshack.com/uploads/bt_forum_profil083847.gif";
	chgpseudo.title = "Modifier pseudonyme";
	chgpseudo.alt = chgpseudo.title;
	
	var p = document.createElement('p');
	p.className = "login";
	var label = document.createElement('label');
	label.appendChild(document.createTextNode("Liste de pseudos : "));
	p.appendChild(label);
	p.appendChild(selection);
	p.appendChild(document.createTextNode(" "));
	p.appendChild(rmvpseudo);
	p.appendChild(document.createTextNode(" "));
	p.appendChild(addpseudo);
	p.appendChild(document.createTextNode(" "));
	p.appendChild(chgpseudo);
	pos = document.getElementById(idpseudo).parentNode.parentNode;
	pos.insertBefore(p,pos.firstChild);
	document.getElementById("liste_pseudonymes").addEventListener("change", changepseudo, false);
	document.getElementById("ajouter_pseudonyme").addEventListener("click", addpsd, false);
	document.getElementById("retirer_pseudonyme").addEventListener("click", rmvpsd, false);
	document.getElementById("changer_pseudonyme").addEventListener("click", function chgpsd() {self.location.href="http://www.jeuxvideo.com/cgi-bin/admin/moncompte.cgi?oper=33";}, false);
}

function changepseudo() {
	var i = this.selectedIndex - 1;
	if (i>=0) {
		var pseudo = GM_getValue("lst#"+i,"");
		var pass = GM_getValue("lst#"+pseudo.toLowerCase(),"");
		var nom = this.name.split("#");
		document.getElementById(nom[0]).value = pseudo.substring(0,15);
		document.getElementById(nom[1]).value = pass.substring(0,12);
		document.getElementById(nom[0]).parentNode.style.display = "none";
		document.getElementById(nom[1]).parentNode.style.display = "none";
		document.getElementById(nom[2]).parentNode.style.display = "none";
		GM_setValue("pseudo_prec",i);
	} else {
		var nom = this.name.split("#");
		document.getElementById(nom[0]).value = "";
		document.getElementById(nom[1]).value = "";
		document.getElementById(nom[0]).parentNode.style.display = "";
		document.getElementById(nom[1]).parentNode.style.display = "";
		document.getElementById(nom[2]).parentNode.style.display = "";
		GM_setValue("pseudo_prec",i);
	}
}

function addpsd() {
	var pseudo = null;
	var i = GM_getValue("nb_pseudos",0);
	while (pseudo == null) {
		pseudo = prompt("Entrez un pseudonyme","");
	}
	var pass = GM_getValue("lst#"+pseudo.toLowerCase(),"");
	if (pass == "") {
		pass = null;
		while (pass == null) {
			pass = prompt("Entrez son mot de passe","");
		}
	}
	psadd(pseudo,pass);
	var j = GM_getValue("nb_pseudos",0);
	if (i+1==j) {
		var option = document.createElement("option");
		var newpseudo = GM_getValue("lst#"+i,"");
		texte = document.createTextNode(newpseudo);
		option.value = i;
		option.id = "lst_psd_"+i;
		option.appendChild(texte);
		option.selected = true;
		var newpass = GM_getValue("lst#"+newpseudo.toLowerCase(),"");
		var nom = document.getElementById("liste_pseudonymes").name.split("#");
		document.getElementById(nom[0]).value = newpseudo;
		document.getElementById(nom[1]).value = newpass;
		document.getElementById("liste_pseudonymes").appendChild(option);
		document.getElementById("liste_pseudonymes").selectedIndex = i+1;
	}
}

function rmvpsd() {
	var n = document.getElementById("liste_pseudonymes").selectedIndex - 1;
	if (n>=0) {
		var max = GM_getValue("nb_pseudos",0);
		document.getElementById("liste_pseudonymes").selectedIndex = Math.min(n,max-1);
		GM_setValue("pseudo_prec",0);
		var pseudo = GM_getValue("lst#"+n,"");
		var solitaire=true;
		document.getElementById("lst_psd_"+n).parentNode.removeChild(document.getElementById("lst_psd_"+n));
		for (var i=0;i<max;i++) {
			var other = GM_getValue("lst#"+i,"");
			solitaire = ((solitaire) && ((i==n) || (other!=pseudo)));
			if (i>n) {
				GM_setValue("lst#"+(i-1),other);
				document.getElementById("lst_psd_"+i).value=i-1;
				document.getElementById("lst_psd_"+i).id="lst_psd_"+(i-1);
			}
		}
		GM_setValue("nb_pseudos",max-1);
		GM_setValue("lst#"+(max-1),"");
//		GM_deleteValue("lst#"+(max-1));
		if (solitaire) {
			GM_setValue("lst#"+pseudo.toLowerCase(),"");
//			GM_deleteValue("lst#"+pseudo.toLowerCase());
		}
	}
}

function ListeAlternanceModo() {
	var n = GM_getValue("nb_modos",0);
	var selection = document.createElement("select");
	selection.id = "liste_modos";
	selection.name = "pseudo"+"#"+"mot_passe"+"#"+"mail"+"#"+"mot_passe_moder";
	selection.setAttribute("width","100px");
	var option = document.createElement("option");;
	var texte = document.createTextNode("");
	var value;
	option.id = "lst_psd";
	option.value = -1;
	option.appendChild(texte);
	option.selected = true;
	selection.appendChild(option);
	for (var i=0;i<n;i++) {
		option = document.createElement("option");
		var forum = GM_getValue("mod#"+i+"#forum","");
		texte = document.createTextNode(forum);
		option.value = i;
		option.id = "mod#"+i+"#";
		option.appendChild(texte);
		selection.appendChild(option);
	}
	selection.setAttribute("tabindex",0);
	selection.setAttribute("selectedIndex",0);
	selection.style.width = "150px";
	var addmodo = document.createElement("img");
	addmodo.style.cursor = "pointer";
	addmodo.id = "ajouter_moderation";
	addmodo.src = "http://www.noelshack.com/uploads/green+013294.png";
	addmodo.title = "Ajouter modÃ©ration";
	addmodo.alt = addmodo.title;
	addmodo.name = selection.name;
	var rmvmodo = document.createElement("img");
	rmvmodo.style.cursor = "pointer";
	rmvmodo.id = "retirer_moderation";
	rmvmodo.src = "http://www.noelshack.com/uploads/orange-009637.png";
	rmvmodo.title = "Retirer modÃ©ration";
	rmvmodo.alt = rmvmodo.title;
	rmvmodo.name = selection.name;
	var pos = document.getElementById("pseudo").parentNode.parentNode.parentNode;
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	var label = document.createElement('label');
	var strong = document.createElement('strong');
	strong.appendChild(document.createTextNode('Forum : '));
	label.appendChild(strong);
	td.appendChild(label);
	tr.appendChild(td);
	var td = document.createElement('td');
	td.appendChild(selection);
	tr.appendChild(td);
	tr.appendChild(document.createTextNode(" "));
	tr.appendChild(rmvmodo);
	tr.appendChild(document.createTextNode(" "));
	tr.appendChild(addmodo);
	pos.insertBefore(tr,pos.firstChild);
	document.getElementById(selection.id).addEventListener("change", changemodo, false);
	document.getElementById(addmodo.id).addEventListener("click", addmod, false);
	document.getElementById(rmvmodo.id).addEventListener("click", rmvmod, false);
}

function changemodo() {
	var i = document.getElementById("liste_modos").selectedIndex - 1;
	if (i>=0) {
		var id = "mod#"+i+"#";
		var nom = this.name.split("#");
		for (var j=0;j<nom.length;j++)
			document.getElementById(nom[j]).parentNode.parentNode.style.display = "none";
		var pseudo = GM_getValue(id+nom[0],"");
		var pass = GM_getValue("lst#"+pseudo.toLowerCase(),"");
		var mail = GM_getValue(id+nom[2],"");
		var mdp = GM_getValue(id+nom[3],"");
		document.getElementById(nom[0]).value = pseudo;
		document.getElementById(nom[1]).value = pass;
		document.getElementById(nom[2]).value = mail;
		document.getElementById(nom[3]).value = mdp;
	} else {
		var nom = this.name.split("#");
		for (var j=0;j<nom.length;j++) {
			document.getElementById(nom[j]).parentNode.parentNode.style.display = "";
			document.getElementById(nom[j]).value = "";
		}
	}
}

function addmod() {
	var i = GM_getValue("nb_modos",0);
	forum = prompt("Entrez un forum","");
	if (forum != null) {
		var pseudo = null;
		while (pseudo == null) {
			pseudo = prompt("Nom du modÃ©rateur : ","");
		}
		var mail = null;
		while (mail == null) {
			mail = prompt("Adresse mail : ","");
		}
		var mdp = null;
		while (mdp == null) {
			mdp = prompt("Mot de passe modÃ©rateur : ","");
		}
		modoadd(forum,pseudo,mail,mdp);
		var option = document.createElement("option");
		texte = document.createTextNode(forum);
		option.value = i;
		option.id = "mod#"+i+"#";
		option.appendChild(texte);
		document.getElementById("liste_modos").appendChild(option);
	}
}

function moderationmanual() {
	if (document.getElementById('liste_modos').selectedIndex == 0) {
		var test = confirm("Ajouter ce groupe de modÃ©ration");
		if (test) {
			var forum = prompt("Nom du forum :","");
			if (forum != null) {
				var n = GM_getValue("nb_modos",0);
				var i = GM_getValue("nb_pseudos",0);
				
				var id = "mod#"+n+"#";
				var nom = new Array("pseudo","mot_passe","mail","mot_passe_moder");
				
				var pseudo = document.getElementById(nom[0]).value;
				GM_setValue(id+nom[0],pseudo);
				GM_setValue("lst#"+i,pseudo);
				
				var pass = document.getElementById(nom[1]).value;
				GM_setValue("lst#"+pseudo.toLowerCase(),pass);
				
				var mail = document.getElementById(nom[2]).value;
				GM_setValue(id+nom[2],mail);
				
				var mdp = document.getElementById(nom[3]).value;
				GM_setValue(id+nom[3],mdp);
				
				GM_setValue("nb_modos",n+1);
				GM_getValue("nb_pseudos",i+1);
			}
		}
	}
}

function modoadd(forum,pseudo,mail,mdp) {
	var i = GM_getValue("nb_modos",0);
	GM_setValue("mod#"+i+"#forum",forum);
	GM_setValue("mod#"+i+"#mot_passe",pseudo);
	GM_setValue("mod#"+i+"#mail",mail);
	GM_setValue("mod#"+i+"#mot_passe_moder",mdp);
	GM_setValue("nb_modos",i+1);
	var nom = this.name.split("#");
}

function rmvmod() {
	var i = document.getElementById("liste_modos").selectedIndex - 1;
	if (i>=0) {
		var n = GM_getValue("nb_modos",0);
		var id = "mod#";
		var nom = this.name.split("#");
		document.getElementById("mod#"+i+"#").parentNode.removeChild(document.getElementById("mod#"+i+"#"));
		for (var j=i+1;j<n;j++) {
			GM_setValue(id+(j-1)+"#forum",GM_getValue(id+j+"#forum",""));
			GM_setValue(id+(j-1)+"#"+nom[0],GM_getValue(id+j+"#"+nom[0],""));
			GM_setValue(id+(j-1)+"#"+nom[2],GM_getValue(id+j+"#"+nom[2],""));
			GM_setValue(id+(j-1)+"#"+nom[3],GM_getValue(id+j+"#"+nom[3],""));
			document.getElementById("mod#"+j+"#").id = "mod#"+(j-1)+"#";
		}
		GM_setValue(id+(n-1)+"#forum","");
		GM_setValue(id+(n-1)+"#"+nom[0],"");
		GM_setValue(id+(n-1)+"#"+nom[2],"");
		GM_setValue(id+(n-1)+"#"+nom[3],"");
		GM_setValue("nb_modos",n-1);
	}
}

function ProtectionLien(a) {
	var protege = false;
	var elem = a.getElementsByTagName('a');
	var liste = GM_getValue("Protection","");
	if (liste != "") {
		var c = new Array("\\",".","$","[","]","(",")","{","}","^","?","*","+","-");
		for (var i=0; i<c.length;i++) {
			liste = liste.replace(new RegExp("\\"+c[i],"g"),"\\"+c[i]);
		}
		var i=0;
		while (i<elem.length) {
			var ref = elem[i].href;
			var bool = new RegExp("(" + liste + ")","gi").test(ref);
			if (bool) {
				protege = true;
				var selem = document.createElement('s');
				selem.title = ref;
				var texte = elem[i].innerHTML
				texte = texte.replace(new RegExp("<i>","gi"),"").replace(new RegExp("</i>","gi"),"").replace(new RegExp("<span>[^<>]*</span>","gi"),"[...]");
				selem.appendChild(document.createTextNode(texte));
				selem.style.color = "#0000FF";
				elem[i].parentNode.replaceChild(selem,elem[i]);
			} else {
				i++;
			}
		}
	}
	return protege;
}

function GestionProtectionLien() {
	var menu = document.getElementById("menu_interactif").getElementsByTagName('ul')[0];
	var ajoutlink = document.createElement('a');
	ajoutlink.style.cursor = "pointer";
	ajoutlink.id = "ajouter_protection";
	ajoutlink.appendChild(document.createTextNode("Ajouter protection"));
	var ajout = document.createElement('li');
	ajout.appendChild(ajoutlink);
	var removlink = document.createElement('a');
	removlink.style.cursor = "pointer";
	removlink.id = "retirer_protection";
	removlink.appendChild(document.createTextNode("Retirer protection"));
	var remov = document.createElement('li');
	remov.appendChild(removlink);
	menu.appendChild(ajout);
	menu.appendChild(remov);
	document.getElementById("retirer_protection").addEventListener("click", rmvlink, false);
	document.getElementById("ajouter_protection").addEventListener("click", addlink, false);
}

function addlink() {
	var lien = prompt("Quel est le motif Ã  censurer ?","");
	if (lien != null && lien != "") {
		pradd(lien);
		Reload();
	}
}

function dellink() {
	var liste = GM_getValue("Protection","");
	liste = "Â¤"+liste.split("|").join("Â¤")+"Â¤";
	liste = liste.replace(new RegExp("Â¤"+this.name+"Â¤","gi"),"Â¤");
	liste = liste.substring(1,liste.length-1);
	liste = liste.split("Â¤").join("|");
	GM_setValue("Protection",liste);
	Reload();
}

function rmvlink() {
	var lien = prompt("Quel est le motif Ã  dÃ©censurer ?","");
	if (lien != null && lien != "") {
		var liste = GM_getValue("Protection","");
		var reg = new RegExp("(" + liste + ")","gi");
		var test = reg.test(lien);
		if (test) {
			reg.exec(lien);
			var motif = RegExp.$1;
			liste = "Â¤" + liste.replace(/\|/g,"Â¤") + "Â¤";
			liste = liste.replace("Â¤" + motif + "Â¤","Â¤");
			GM_setValue("Protection",liste.replace(/Â¤/g,"|").substring(1,liste.length-1));
			Reload();
		}
	}
}

function Image(a) {
	var newimg = a;
	if (GM_getValue("jvc_images",true)) {
		var liste = GM_getValue("img_liste","");
		if (liste != "" && new RegExp("("+liste+")","i").test(a.toLowerCase())) {
			var newimg = GM_getValue("img#"+a.toLowerCase(),a);
		}
	}
	return newimg;
}

function addimg() {
	var initial = prompt("Quelle image modifier ?","");
	var terminal = prompt("Pour quelle image modifier ? (annuler = ne pas retoucher)","");
	if (terminal == null) {
		terminal = initial;
	}
	imgadd(initial,terminal);
	Reload();
}

function delimg() {
	var img = this.name;
	GM_setValue("img#"+img,img);
	var liste = "Â¤"+GM_getValue("img_liste","").split("|").join("Â¤")+"Â¤";
	liste = liste.replace(new RegExp("Â¤"+img+"Â¤","gi"),"Â¤");
	liste = liste.substring(1,liste.length-1);
	liste = liste.split("Â¤").join("|");
	GM_setValue("img_liste",liste);
	Reload();
}

function GestionImage() {
	var menu = document.getElementById("menu_interactif").getElementsByTagName('ul')[0];
	var imglink = document.createElement('a');
	imglink.style.cursor = "pointer";
	imglink.id = "ajouter_lien_image";
	imglink.appendChild(document.createTextNode("Changer Images"));
	var img = document.createElement('li');
	img.appendChild(imglink);
	menu.appendChild(img);
	document.getElementById("ajouter_lien_image").addEventListener("click", addimg, false);
}

function NewSmileys(a) {
	var n = GM_getValue("nb_smileys",0);
	for (var i=0;i<n;i++) {
		var motif = GM_getValue("sm#"+i+"#motif","");
		var image = GM_getValue("sm#"+i+"#img","");
		var elem = a.childNodes;
		for (var j=0;j<elem.length;j++) {
			if (elem[j].nodeType == 3) {
				RemplaceSmiley(motif,elem[j],image);
			}
		}
	}
}

function RemplaceSmiley(motif,txt,image) {
	var texte = "| "+txt.nodeValue+" |";
	var reg = new RegExp(motif,"i");
	if (reg.test(texte)) {
		str = reg.exec(texte);
		var img = document.createElement('img');
		img.src = image;
		img.alt = str;
		img.title = str;
		var decoup = texte.split(str);
		var before = decoup.shift();
		before = before.substring(1,before.length);
		var bef = document.createTextNode(before+" ");
		var after = decoup.join(str);
		after = after.substring(0,after.length-1);
		var aft = document.createTextNode(" "+after);
		txt.parentNode.insertBefore(bef,txt);
		txt.parentNode.insertBefore(img,txt);
		txt.parentNode.replaceChild(aft,txt);
	}
}

function GestionSmiley() {
	var menu = document.getElementById("menu_interactif").getElementsByTagName('ul')[0];
	var smllink = document.createElement('a');
	smllink.style.cursor = "pointer";
	smllink.id = "ajouter_smiley";
	smllink.appendChild(document.createTextNode("Ajouter smiley"));
	var sml = document.createElement('li');
	sml.appendChild(smllink);
	menu.appendChild(sml);
	document.getElementById(smllink.id).addEventListener("click", addsml, false);
	var smllink = document.createElement('a');
	smllink.style.cursor = "pointer";
	smllink.id = "retirer_smiley";
	smllink.appendChild(document.createTextNode("Retirer smiley"));
	var sml = document.createElement('li');
	sml.appendChild(smllink);
	menu.appendChild(sml);
	document.getElementById(smllink.id).addEventListener("click", delsml, false);
}

function addsml() {
	var motif = prompt("Quel motif transformer ?","");
	var image = prompt("Quelle est l'URL du smiley ?","");
	if (motif != null || image != null || motif != "") {
		c = new Array("\\",".","$","[","]","(",")","{","}","^","?","*","+","-");
		for (var i=0;i<c.length;i++)
			motif = motif.split(c[i]).join('\\'+c[i]);
		smladd(motif,image);
	}
	Reload();
}

function delsml() {
	var n = GM_getValue("nb_smileys",0);
	var i = this.name+1;
	while (i<n) {
		GM_setValue("sm#"+(i-1)+"#motif",GM_getValue("sm#"+i+"#motif",""));
		GM_setValue("sm#"+(i-1)+"#img",GM_getValue("sm#"+i+"#img",""));
		i++;
	}
	GM_getValue("sm#"+(n-1)+"#motif","")
	GM_setValue("sm#"+(n-1)+"#img","");
	GM_setValue("nb_smileys",n-1);
	Reload();
}

function AffichageImageVideo(a) {
	var link = a.getElementsByTagName('a');
	for (var k=0;k<link.length;k++) {
		var ref = link[k].href;
		var ext = new RegExp( "[^.]*$").exec(ref);
		switch (ext[0].toLowerCase()) {
			case "jpg" :
			case "png" :
			case "bmp" :
			case "jpeg" :
			case "gif" :
				var replace = AffichageImage(ref);
				link[k].parentNode.insertBefore(document.createElement("br"),link[k].nextSibling);
				link[k].parentNode.insertBefore(Spoil(replace.id),link[k].nextSibling);
				link[k].parentNode.insertBefore(document.createElement("br"),link[k].nextSibling);
				link[k].parentNode.insertBefore(replace,link[k].nextSibling);
				link[k].parentNode.insertBefore(document.createElement("br"),link[k].nextSibling);
				break;
		}
		if (new RegExp("http:\/\/[^/]*youtube\.[^/]*\/.*","gi").test(ref)) {
			ext= ref.replace(new RegExp("^.*v=","gi"),"").replace(new RegExp("&.*$","gi"),"");
			var replace = AffichageYoutube(ext);
			link[k].parentNode.insertBefore(document.createElement("br"),link[k].nextSibling);
			link[k].parentNode.insertBefore(Spoil(replace.id),link[k].nextSibling);
			link[k].parentNode.insertBefore(document.createElement("br"),link[k].nextSibling);
			link[k].parentNode.insertBefore(replace,link[k].nextSibling);
			link[k].parentNode.insertBefore(document.createElement("br"),link[k].nextSibling);
		}
		if (new RegExp("http:\/\/[^/]*dailymotion\.[^/]*\/.*","gi").test(ref)) {
			ext= ref.replace(new RegExp("^.*\/","gi"),"").replace(new RegExp("_.*$","gi"),"");
			var replace = AffichageDailymotion(ext);
			link[k].parentNode.insertBefore(document.createElement("br"),link[k].nextSibling);
			link[k].parentNode.insertBefore(Spoil(replace.id),link[k].nextSibling);
			link[k].parentNode.insertBefore(document.createElement("br"),link[k].nextSibling);
			link[k].parentNode.insertBefore(replace,link[k].nextSibling);
			link[k].parentNode.insertBefore(document.createElement("br"),link[k].nextSibling);
			
		}
	}
}

function Spoil(element) {
	var spoiler = document.createElement("a");
	spoiler.style.cursor = "pointer";
	spoiler.setAttribute("onclick",'document.getElementById("'+element+'").style.display=(document.getElementById("'+element+'").style.display=="none")?"":"none";');
	spoiler.appendChild(document.createTextNode("Afficher/Cacher"));
	return spoiler;
	}

function AffichageImage(ref) {
	var Img = document.createElement("img");
	Img.id = "image_"+ref.replace(new RegExp("^.*"+"/","gi"),"");
	Img.src = ref;
	Img.alt = ref;
	Img.style.maxWidth = "520px";
	if (!(GM_getValue("msq#pic",false))) {
		Img.style.display = "none";
	}
	return Img;
	}

function AffichageYoutube(src) {
	var ref = "http://www.youtube.com/v/"+src+"&hl=fr&fs=1";
	var objet = document.createElement("object");
	objet.setAttribute("width",425);
	objet.setAttribute("height",344);
	objet.id = "youtube_"+src;
	if (!(GM_getValue("msq#vid",false))) {
		objet.style.display = "none";
	}
	var param = document.createElement("param");
	param.name = "movie";
	param.value = ref;
	objet.appendChild(param);
	var param = document.createElement("param");
	param.name = "allowFullScreen";
	param.value = "true";
	objet.appendChild(param);
	var param = document.createElement("param");
	param.name = "allowscriptaccess";
	param.value = "always";
	objet.appendChild(param);
	var param = document.createElement("embed");
	param.src = ref;
	param.setAttribute("type","application/x-shockwave-flash");
	param.setAttribute("allowscriptaccess","always");
	param.setAttribute("allowFullScreen","true");
	param.setAttribute("width",425);
	param.setAttribute("height",344);
	objet.appendChild(param);
	return objet;
	}

function AffichageDailymotion(src) {
	var ref = "http://www.dailymotion.com/swf/"+src;
	var objet = document.createElement("object");
	objet.setAttribute("width",480);
	objet.setAttribute("height",285);
	objet.id = "dailymotion_"+src;
	if (!(GM_getValue("msq#vid",false))) {
		objet.style.display = "none";
	}
	var param = document.createElement("param");
	param.name = "movie";
	param.value = ref;
	objet.appendChild(param);
	var param = document.createElement("param");
	param.name = "allowFullScreen";
	param.value = "true";
	objet.appendChild(param);
	var param = document.createElement("param");
	param.name = "allowScriptAccess";
	param.value = "always";
	objet.appendChild(param);
	var param = document.createElement("embed");
	param.src = ref;
	param.setAttribute("type","application/x-shockwave-flash");
	param.setAttribute("allowScriptAccess","always");
	param.setAttribute("allowFullScreen","true");
	param.setAttribute("width",480);
	param.setAttribute("height",285);
	objet.appendChild(param);
	return objet;
	}

function Statistiques(mode) {
	if (mode>=0) {
		new RegExp("http://www\.jeuxvideo\.com/forums/([0-9]*)-([^-]*)-([0-9]*)-([0-9]*)-([0-9]*)-([0-9]*)-([0-9]*)-(.*).htm(.*)").test(self.location.href);
		var url = RegExp.$2;
		var menu = document.getElementById("menu_interactif").getElementsByTagName('ul')[0];
		var statlink = document.createElement('a');
		statlink.setAttribute("onclick","window.open('http://jvstats.planet-shitfliez.net/stats/inflate.php?num=" + url +"');");
		statlink.id = "lien_statistiques";
		statlink.style.cursor = "pointer";
		statlink.appendChild(document.createTextNode("Statistiques"));
		var stat = document.createElement('li');
		stat.appendChild(statlink);
		menu.appendChild(stat);
	}
}

function AccesPC(mode) {
	if (mode>=-1) {
		var menu = document.getElementById("menu_interactif").getElementsByTagName('ul')[0];
		var statlink = document.createElement('a');
		statlink.href = "http://www.jeuxvideo.com/forums/0-JVN-0-0-0-0-0-0.htm";
		statlink.id = "lien_panneau_controle";
		statlink.appendChild(document.createTextNode("J.V.Nyu"));
		var stat = document.createElement('li');
		stat.appendChild(statlink);
		menu.appendChild(stat);
	}
}

function MiseEnValeur() {
	var url = document.location.toString().split("#");
	if (new RegExp("message_[0-9]*").test(url[1])) {
		var element = document.getElementById(url[1]);
		element.className = "msg msg3";
		element.style.border = "solid 3px #DDBBBB";
		element.style.backgroundColor = "#EECCCC";
	}
}

function Censure(mess) {
	var element = document.getElementById(mess).getElementsByTagName('li');
	var i = 0;
	var pseudo = -1;
	var post = -1;
	var ign = "Censure_"+mess;
	while (i < element.length && (pseudo == -1 || post == -1)) {
		switch (element[i].className) {
			case "post":
				post = i;
				break;
			case "pseudo":
				pseudo = i;
				break;
			}
		i++;
		}
	var str = element[post].innerHTML;
	if (document.getElementById(ign).title == document.getElementById(ign).alt) {
		//str = str.replace(new RegExp("<br>","gi"),"\n\r");
		var replace = element[post].getElementsByTagName('a')
		while (replace.length > 0) {
			var newItem = document.createTextNode(replace[0].href);
			replace[0].parentNode.replaceChild(newItem,replace[0]);
			}
		var replace = element[post].getElementsByTagName('img')
		while (replace.length > 0) {
			var newItem = document.createTextNode(replace[0].alt);
			replace[0].parentNode.replaceChild(newItem,replace[0]);
			}
		document.getElementById(ign).title = element[post].innerHTML;
		document.getElementById(ign).src = "http://www.noelshack.com/uploads/green+013294.png";
		} else {
		document.getElementById(ign).title = document.getElementById(ign).alt;
		document.getElementById(ign).src = "http://www.noelshack.com/uploads/orange-009637.png";
		}
	element[post].innerHTML = document.getElementById(ign).name;
	document.getElementById(ign).name = str;
	}

function Citation(mess) {
	var element = document.getElementById(mess).getElementsByTagName('li');
	var i = 0;
	var pseudo = -1;
	var post = -1;
	var date = -1;
	var ancre = -1;
	var citation = "";
	while (i < element.length && (pseudo == -1 || post == -1 || date == -1 || ancre == -1)) {
		switch (element[i].className) {
			case "post":
				post = i;
				break;
			case "pseudo":
				pseudo = i;
				break;
			case "date":
				date = i;
				break;
			case "ancre":
				ancre = i;
				break;
			}
		i++;
		}
	if (pseudo != -1 && post != -1 && date != -1 && ancre != -1) {
		citation += self.location.href.split("#")[0]+"#"+mess+"\n";
		citation += "| " + element[pseudo].type + "\n";
		citation += "| " + new RegExp("PostÃ© le [0-9]{1,2} [a-zA-ZÃ©Ã»]* [0-9]{4} Ã  [0-9]{2}:[0-9]{2}:[0-9]{2}").exec(element[date].innerHTML) + "\n";
		var str = element[post].innerHTML;
		replace = element[post].childNodes;
		var rap = "";
		for (var i=0;i<replace.length;i++) {
			if (replace[i].nodeType == 3) {
				rap += replace[i].nodeValue;
			} else {
				switch (replace[i].tagName) {
					case 'IMG' :
						rap += replace[i].alt;
						break;
					case 'A' :
						rap += replace[i].href;
						break;
					case 'BR' :
						rap += "\n| ";
						break;
				}
			}
		}
		citation += "| " +  rap.substring(1,rap.length);
		//citation = citation.replace(new RegExp("<br[^>]*>","gi"),"\n| ");
		citation = citation.replace(new RegExp("\n\n","gi"),"\n");
		citation += "\n\n";
		element[post].innerHTML = str;
		}
	var cache = GM_getValue("citations","");
	GM_setValue("citations",cache+citation);
}

function parseInt2(str) {
	var n = 0;
	var i = 0;
	var k=1;
	if (str[0]=="-") {
		i++;
		k=-1;
	}
	var still = true;
	while (still) {
		var j = parseInt(str[i]);
		i++;
		if (j == Number.NaN || i==str.length) {
			still = false;
		} 
		if (j != Number.NaN){
			n = n*10+j;
		}
	}
	return k*n;
}

function IntToStr(i,n) {
	var str = i.toString();
	for (var j=str.length;j<n;j++)
		str = "0" + str;
	return str;
}

function ChangeDate(a,dif) {
	var ori = new RegExp("PostÃ© le ([0-9]{2}) ([a-zA-ZÃ©Ã»]+) ([0-9]{4}) Ã  ([0-9]{2}):([0-9]{2}):([0-9]{2})")
	var fir = ori.exec(a.innerHTML)[0];
	var dat = new Date();
	dat.setSeconds(parseInt2(RegExp.$6));
	dat.setHours(parseInt2(RegExp.$4));
	var month = Array("janvier","fÃ©vrier","mars","avril","mai","juin","juillet","aoÃ»t","septembre","octobre","novembre","dÃ©cembre");
	var m=0;
	for (var i=0;i<month.length;i++) {
		if (month[i] == RegExp.$2)
			var m = i;
	}
	dat.setMonth(m);
	dat.setFullYear(parseInt2(RegExp.$3));
	dat.setDate(parseInt2(RegExp.$1));
	dat.setMinutes(parseInt2(RegExp.$5)+60+dif);
	var str = "PostÃ© le "+IntToStr(dat.getDate(),2)+" "+month[dat.getMonth()]+" "+dat.getFullYear()+" Ã  "+IntToStr(dat.getHours(),2)+":"+IntToStr(dat.getMinutes(),2)+":"+IntToStr(dat.getSeconds(),2);
	a.innerHTML = a.innerHTML.replace(ori,str);
	//alert(fir+"\n\n"+RegExp.$1+"\n"+parseInt2(RegExp.$1)+"\n\n"+RegExp.$2+"\n"+m+":"+month[m]+"\n\n"+RegExp.$3+"\n"+parseInt2(RegExp.$3)+"\n\n"+RegExp.$4+"\n"+parseInt2(RegExp.$4)+"\n\n"+RegExp.$5+"\n"+parseInt2(RegExp.$5)+"\n\n"+RegExp.$6+"\n"+parseInt2(RegExp.$6)+"\n\n"+str);
}

function ChangeDateListe(a,dif) {
	var ori = new RegExp("([0-9]{2})/([0-9]{2})/([0-9]{4}) ([0-9]{2})h([0-9]{2})")
	ori.test(a.innerHTML);
	var dat = new Date();
	dat.setHours(parseInt2(RegExp.$4));
	dat.setMonth(parseInt2(RegExp.$2)-1);
	dat.setFullYear(parseInt2(RegExp.$3));
	dat.setDate(parseInt2(RegExp.$1));
	dat.setMinutes(parseInt2(RegExp.$5)+60+dif);
	var str = IntToStr(dat.getDate(),2)+"/"+IntToStr(1+dat.getMonth(),2)+"/"+dat.getFullYear()+" "+IntToStr(dat.getHours(),2)+"h"+IntToStr(dat.getMinutes(),2);
	a.innerHTML = a.innerHTML.replace(ori,str);
}

function AjoutBoutonCensure(a,messid,pseudo,modo,moderateur) {
	var url = self.location.href;
	url = parseInt(url.replace(new RegExp(".*"+"/(1|3)-","gi"),""));
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	var censure = GM_getValue("cs#"+groupe.toLowerCase(),false) && GM_getValue("jvc_kick",true);
	var exclusion = censure && GM_getValue("jvc_kick_total_"+groupe.toLowerCase(),false) && GM_getValue("jvc_exclusion",true);
	var cache = GM_getValue("cs#"+url+"#"+messid,false) && GM_getValue("jvc_masque",true);
	var moderation = moderateur && GM_getValue("jvc_exc_mod_aff",true);
	if (GM_getValue("jvc_masque",true)) {
		var newImg = document.createElement("img");
		newImg.style.cursor = "pointer";
		newImg.src = "http://www.noelshack.com/uploads/orange-009637.png";
		newImg.id = "Censure_" + messid;
		newImg.title = "Censurer ce message";
		newImg.alt = newImg.title;
		newImg.name = "<I><small>(Ce message a Ã©tÃ© censurÃ©)</small></I>";
		a.appendChild(document.createTextNode(" "));
		a.appendChild(newImg);
		document.getElementById(newImg.id).addEventListener("click", cens, false);
	}
	if (GM_getValue("jvc_kick",true) && !modo) {
		var newImg = document.createElement("img");
		newImg.style.cursor = "pointer";
		if (censure) {
			newImg.src = "http://www.noelshack.com/uploads/pinko066815.png";
		} else {
			newImg.src = "http://www.noelshack.com/uploads/bluek076359.png";
		}
		newImg.name = "Kick_" + pseudo;
		newImg.id = "Kick_" + messid;
		newImg.title = "Ignorer " + pseudo;
		newImg.alt = newImg.title;
		a.appendChild(document.createTextNode(" "));
		a.appendChild(newImg);
		document.getElementById(newImg.id).addEventListener("click", kick, false);
		
		if (!exclusion && GM_getValue("jvc_exclusion",true)) {
			var newImg = document.createElement("img");
			newImg.style.cursor = "pointer";
			newImg.src = "http://www.noelshack.com/uploads/bt_forum_bann_defi029135.gif";
			newImg.name = "Excl_" + pseudo;
			newImg.id = "Excl_" + messid;
			newImg.title = "Exclure " + pseudo;
			newImg.alt = newImg.title;
			a.appendChild(document.createTextNode(" "));
			a.appendChild(newImg);
			document.getElementById(newImg.id).addEventListener("click", excl, false);
		} else {
			var newImg = document.createElement("img");
			newImg.style.cursor = "pointer";
			newImg.src = "http://www.noelshack.com/uploads/bt_forum_bann_48h081792.gif";
			newImg.name = messid;
			newImg.id = "_Excl_" + messid;
			newImg.title = "Remasquer le message de " + pseudo;
			newImg.alt = newImg.title;
			a.appendChild(document.createTextNode(" "));
			a.appendChild(newImg);
			document.getElementById(newImg.id).addEventListener("click", function masquemess() { document.getElementById(this.name).style.display = "none"; document.getElementById("Supp"+this.id).style.display = "";}, false);
			
			var element = document.getElementById(messid);
			element.className = "msg msg4";
			element.style.border = "solid 3px #DDBBBB";
			element.style.backgroundColor = "#000000";
			element.style.color = "#FFFFFF";
			
		}
	}
	if (!modo && (((censure && !(modo)) && !cache) || (!(censure && !(modo)) && cache))) {
		if (exclusion) {
			if (document.getElementById('comput_kick_total')) {
				if (document.getElementById("exclusion_"+groupe)) {
					var nb = document.getElementById("exclusion_"+groupe);
					nb.innerHTML = 1 + parseInt(nb.innerHTML);
				} else {
					var tbody = document.getElementById('comput_kick_total');
					var tr = document.createElement('tr'); 
					tbody.appendChild(tr);
					var td = document.createElement('td'); 
					td.appendChild(document.createTextNode(groupe + " : "));
					tr.appendChild(td);
					var td = document.createElement('td'); 
					td.id = "exclusion_"+groupe;
					td.innerHTML = 1;
					tr.appendChild(td);
					var td = document.createElement('td'); 
					td.appendChild(document.createTextNode(' message(s)'));
					tr.appendChild(td);
					
					var td = document.createElement('td'); 
					tr.appendChild(td);
					var newImg = document.createElement("img");
					td.appendChild(newImg);
					newImg.style.cursor = "pointer";
					newImg.src = "http://www.noelshack.com/uploads/green+013294.png";
					newImg.name = "Excl_" + pseudo;
					newImg.id = "Excl_" + pseudo;
					newImg.title = "Enlever l'exclusion de " + pseudo;
					newImg.alt = newImg.title;
					
					document.getElementById(newImg.id).addEventListener("click", excl, false);
				
				}
			} else {
				var p = document.getElementById('col1').getElementsByTagName('p');
				var pos = p[p.length-1];
				var div = document.createElement('div');
				div.className = "msg msg1";
				pos.parentNode.insertBefore(div,pos);
				var ul = document.createElement('ul');
				div.appendChild(ul);
				var li = document.createElement('li');
				ul.appendChild(li);
				li.className = "pseudo";
				var strong = document.createElement('strong');
				strong.appendChild(document.createTextNode('Pseudonymes exclus'));
				li.appendChild(strong);
				var li = document.createElement('li');
				ul.appendChild(li);
				li.className = "post";
				
				var table = document.createElement('table');
				li.appendChild(table);
				var tbody = document.createElement('tbody'); 
				table.appendChild(tbody);
				tbody.id = "comput_kick_total";
				
				var tr = document.createElement('tr'); 
				tbody.appendChild(tr);
				var td = document.createElement('td'); 
				td.appendChild(document.createTextNode(groupe + " : "));
				tr.appendChild(td);
				var td = document.createElement('td'); 
				td.id = "exclusion_"+groupe;
				td.innerHTML = 1;
				tr.appendChild(td);
				var td = document.createElement('td'); 
				td.appendChild(document.createTextNode(' message(s)'));
				tr.appendChild(td);
				
				
				var td = document.createElement('td');
				tr.appendChild(td); 
				var newImg = document.createElement("img");
				td.appendChild(newImg);
				newImg.style.cursor = "pointer";
				newImg.src = "http://www.noelshack.com/uploads/green+013294.png";
				newImg.name = "Excl_" + pseudo;
				newImg.id = "Excl_" + pseudo;
				newImg.title = "Enlever l'exclusion de " + pseudo;
				newImg.alt = newImg.title;
				
				document.getElementById(newImg.id).addEventListener("click", excl, false);
		
			}
			
			var dat = new RegExp("PostÃ© le [0-9]{2} [a-zA-ZÃ©Ã»]* [0-9]{4} Ã  [0-9]{2}:[0-9]{2}:[0-9]{2}").exec(document.getElementById(messid).innerHTML);
			dat = dat[0];
			var tr = document.getElementById("exclusion_"+groupe).parentNode;
			var td = document.createElement('td');
			tr.appendChild(td); 
			var newImg = document.createElement("img");
			td.appendChild(newImg);
			newImg.style.cursor = "pointer";
			newImg.src = "http://www.noelshack.com/uploads/bt_forum_profil083847.gif";
			newImg.name = messid;
			newImg.id = "Supp_Excl_" + messid;
			newImg.title = "RÃ©afficher le message p" + dat.substring(1,dat.length);
			newImg.alt = newImg.title;
			
			document.getElementById(newImg.id).addEventListener("click", function affichermess() {document.getElementById(this.name).style.display = ""; self.location.href += "#" + this.name; this.style.display="none";}, false);
			
			if (moderation) {
				newImg.style.display = "none";
			} else {
				var mess = document.getElementById(messid);
				mess.style.display = "none";
			}

			
		} else {
			Censure(a.parentNode.parentNode.id);
		}
	}
	return exclusion;
}

function cens() {
	var url = self.location.href;
	var mess = this.parentNode.parentNode.parentNode.id;
	url = parseInt(url.replace(new RegExp(".*"+"/(1|3)-","gi"),""));
	var bool = GM_getValue("cs#"+url+"#"+mess,false);
	GM_setValue("cs#"+url+"#"+mess,!bool);
	Censure(mess);
}

function kick() {
	var pseudo = this.name.substring(5,this.name.length);
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	var censure = GM_getValue("cs#"+groupe.toLowerCase(),false);
	if (censure) {
		var str = "Autoriser ce pseudonyme ?";
	} else {
		var str = "Ignorer ce pseudonyme ?";
	}
	var rep = confirm(str);
	if (rep) {
		GM_setValue("cs#"+groupe.toLowerCase(),!censure);
		var mess = this.id.substring(5,this.id.length);
		Reload();
	}
}

function excl() {
	var pseudo = this.name.substring(5,this.name.length);
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	var censure = GM_getValue("cs#"+groupe.toLowerCase(),false);
	if (censure) {
		var str = "Autoriser ce pseudonyme ?";
	} else {
		var str = "Exclure ce pseudonyme ?";
	}
	var rep = confirm(str);
	if (rep) {
		GM_setValue("cs#"+groupe.toLowerCase(),(!censure));
		GM_setValue("jvc_kick_total_"+groupe.toLowerCase(),(!censure));
		Reload();
	}
}

function AjoutBoutonCitation(a,messid) {
	var newImg = document.createElement("img");
	newImg.style.cursor = "pointer";
	newImg.src = "http://www.noelshack.com/uploads/grayc094521.png";
	newImg.id = "Citation_" + messid;
	newImg.title = "Citer ce message";
	newImg.alt = newImg.title;
	a.appendChild(document.createTextNode(" "));
	a.appendChild(newImg);
	document.getElementById(newImg.id).addEventListener("click", cit, false);
}

function cit() {
	var rep = confirm("Citer ce message ?");
	if (rep) {
		Citation(this.parentNode.parentNode.parentNode.id);
	}
}

function AjoutBoutonModÃ©ration(a,messid,pseudo,modo) {
	var date = document.getElementById(messid).innerHTML;
	date = new RegExp("PostÃ© le [0-9]{1,2} [a-zA-ZÃ©Ã»]* [0-9]{4} Ã  [0-9]{2}:[0-9]{2}:[0-9]{2}").exec(date);
	var newImg = document.createElement("img");
	newImg.style.cursor = "pointer";
	newImg.src = "http://www.noelshack.com/uploads/bt_forum_avertirmod020241.gif";
	newImg.id = "Rapport_modÃ©ration_" + messid;
	newImg.title = "Faire un rapport";
	newImg.name = self.location.href.replace(new RegExp("forums/3"),"forums/1")+"#"+messid;
	newImg.alt = pseudo+"\n"+date+"\n"+self.location.href.replace(new RegExp("forums/3"),"forums/1")+"\n"+self.location.href.replace(new RegExp("forums/3"),"forums/1")+"#"+messid+"\n";
	a.insertBefore(document.createTextNode(" : rapport de modÃ©ration "),a.firstChild);;
	a.insertBefore(newImg,a.firstChild);
	document.getElementById(newImg.id).addEventListener("click", RapportModeration, false);
}

function RapportModeration () {
	var cache = GM_getValue("Rapport_moderation_complet","");
	var alerte = this.alt;
	var minialerte = this.name;
	var rep = confirm("Alerter ce message ?");
	if (rep) {
		var motif = prompt("Motif de l'alerte : ","Flood/Troll");
		var peine = prompt("Peine demandÃ©e : ","Bannissement dÃ©finitif");
		if (motif != null && motif != "") {
			alerte += "Motif : "+motif+"\n";
			minialerte += " : " + motif;
		}
		if (peine != null && peine != "") {
			alerte+="Peine demandÃ©e : "+peine+"\n";
		}
		GM_setValue("Rapport_moderation_complet",cache+alerte+"\n");
		var cache = GM_getValue("Rapport_moderation","");
		GM_setValue("Rapport_moderation",cache+minialerte+"\n");
	}
}

function DesactiveFocus() {
	document.getElementById("newmessage").setAttribute("onfocus","");
	document.getElementById("newmessage").addEventListener("focus", foc, false);
}

function foc() {
	this.value = GM_getValue("citations","");
	GM_setValue("citations","");
	document.getElementById("newmessage").removeEventListener("focus", foc, false);
}

function AjouterColoration(Nom,pseudo) {
	var newImg = document.createElement("img");
	newImg.style.cursor = "pointer";
	newImg.src = "http://www.noelshack.com/uploads/redc090963.png";
	newImg.id = "Coloration";
	newImg.title = "Ajouter une coloration";
	newImg.name = pseudo;
	newImg.alt = newImg.title;
	Nom.appendChild(document.createTextNode(" "));
	Nom.appendChild(newImg);
	document.getElementById(newImg.id).addEventListener("click", Coloration, false);
}

function Coloration() {
	var pseudo = this.name;
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	gclr = GM_getValue("gp#prc#"+groupe.toLowerCase()+"#clr","");
	clr = GM_getValue("gp#"+pseudo.toLowerCase()+"#color",gclr);
	var mode = GM_getValue("gp#"+pseudo.toLowerCase()+"#mode",0);
	if (clr == "") {
		clr = gclr;
	}
	clr = clr.split("#")[1];
	if (clr == undefined) {
		clr = "";
	}
	var newclr = prompt("Quelle couleur donner ? (code RGB hexadÃ©cimal XXXXXX )",clr);
	var verif = RegExp("[0-9A-F]{6}","i");
	if (verif.test(newclr)) {
		newclr = "#"+verif.exec(newclr);
		newclr = newclr.toUpperCase();
		mode = Math.floor(mode/2)*2+1;
	} else {
		if (newclr != "") {
			newclr = clr;
		} else {
			mode = Math.floor(mode/2)*2;
		}
	}
	GM_setValue("gp#"+pseudo.toLowerCase()+"#color",newclr);
	GM_setValue("gp#"+pseudo.toLowerCase()+"#mode",mode);
	Reload();
}

function GererAssociations(Nom,pseudo) {
	var newImg = document.createElement("img");
	newImg.style.cursor = "pointer";
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	newImg.src = "http://www.noelshack.com/uploads/blueg005213.png";
	newImg.id = "Association";
	newImg.title = "Ajouter un groupement";
	newImg.alt = newImg.title;
	newImg.name = pseudo;
	Nom.appendChild(document.createTextNode(" "));
	Nom.appendChild(newImg);
	document.getElementById(newImg.id).addEventListener("click", ass, false);
}

function GererCouleur(Nom,pseudo) {
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	gclr = GM_getValue("gp#prc#"+groupe.toLowerCase()+"#clr","");
	clr = GM_getValue("gp#"+pseudo.toLowerCase()+"#color","");
	if (clr == "") {
		clr = gclr;
	}
	if (clr != "") {
		Nom.innerHTML = "";
		var font = document.createElement('font');	
		font.setAttribute("color",clr);
		font.appendChild(document.createTextNode(pseudo));
		Nom.appendChild(font);
	}
}

function GererGroupe(Nom,pseudo) {
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	if (GM_getValue("gp#"+pseudo.toLowerCase()+"#grp",false)) {
		Nom.appendChild(document.createTextNode(" Groupe : "));
		var clr = GM_getValue("gp#prc#"+groupe.toLowerCase()+"#clr","");
		var font = document.createElement('font');	
		font.setAttribute("color",clr);
		font.appendChild(document.createTextNode(groupe));
		Nom.appendChild(font);
	}
}

function GererCouleurGroupe(Nom,pseudo) {
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	var newImg = document.createElement("img");
	if (GM_getValue("gp#"+pseudo.toLowerCase()+"#grp",false)) {
		newImg.style.cursor = "pointer";
		newImg.src = "http://www.noelshack.com/uploads/grayc094521.png";
		newImg.id = "ColorationGroupe";
		newImg.title = "Ajouter une coloration de groupe";
		newImg.name = pseudo;
		newImg.alt = newImg.title;
		Nom.appendChild(document.createTextNode(" "));
		Nom.appendChild(newImg);
		document.getElementById(newImg.id).addEventListener("click", ColorationGroupe, false);
	}
}

function GererMode(Nom,pseudo) {
	var newImg = document.createElement("img");
	newImg.style.cursor = "pointer";
	newImg.src = "http://www.noelshack.com/uploads/yellowe032856.png";
	newImg.id = "ModeEcriture";
	newImg.title = "Changer le mode d'Ã©criture";
	newImg.name = pseudo;
	newImg.alt = newImg.title;
	Nom.appendChild(document.createTextNode(" "));
	Nom.appendChild(newImg);
	document.getElementById(newImg.id).addEventListener("click", ModeEcriture, false);
}

function GererRenommageGroupement(Nom,pseudo) {
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	if (GM_getValue("gp#"+pseudo.toLowerCase()+"#grp",false)) {
		var newImg = document.createElement("img");
		newImg.style.cursor = "pointer";
		newImg.src = "http://www.noelshack.com/uploads/purpler056280.png";
		newImg.id = "RenGroupement";
		newImg.title = "Renommer le groupement";
		newImg.name = pseudo;
		newImg.alt = newImg.title;
		Nom.appendChild(document.createTextNode(" "));
		Nom.appendChild(newImg);
		document.getElementById(newImg.id).addEventListener("click", RenommageGroupement, false);
	}
}

function RenommageGroupement() {
	var pseudo = this.name;
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	var newname = prompt("Renommer tous les pseudonymes associÃ©s Ã  ce groupement en ?",groupe);
	if (newname != null && newname != "" && groupe != newname) {
		renamegroupement(groupe,newname);
		Reload();
	} else {
		if (newname == "") {
			delgroupement(groupe);
			Reload();
		}
	}
}

function ModeEcriture() {
	var pseudo = this.name;
	var mode = prompt("Quel mode d'Ã©criture ?",GM_getValue("gp#"+pseudo.toLowerCase()+"#mode",0));
	var mode = parseInt(mode);
	if (mode >=-1 && mode <=7) {
		GM_setValue("gp#"+pseudo.toLowerCase()+"#mode",mode);
	}
}

function ColorationGroupe() {
	var pseudo = this.name;
	var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
	var clr = GM_getValue("gp#prc#"+groupe.toLowerCase()+"#clr","");
	clr = clr.split("#")[1];
	if (clr == undefined) {
		clr = "";
	}
	var newclr = prompt("Quelle couleur donner ? (code RGB hexadÃ©cimal XXXXXX )",clr);
	var verif = RegExp("[0-9A-F]{6}","i");
	if (verif.test(newclr)) {
		newclr = "#"+verif.exec(newclr);
		newclr = newclr.toUpperCase();
		GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",newclr);
		Reload();
	} else {
		if (newclr != "") {
			newclr = clr;
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",newclr);
			Reload();
		}
	}
}

function ass() {
	var pseudo = this.name;
	var ps = pseudo.toLowerCase();
	var clr = GM_getValue("gp#"+ps+"#color","");
	var groupe = GM_getValue("gp#"+ps+"#groupe",pseudo);
	var mode = GM_getValue("gp#"+ps+"#mode",-1);
	var fix = GM_getValue("gp#"+ps+"#fixe",false);
	var best = GM_getValue("gp#"+ps+"#best",false);
	var newgroupe = prompt("Associer le pseudonyme "+pseudo+" Ã  quel groupement ?",groupe);
	if (newgroupe == null || newgroupe == "") {
		if (newgroupe == "") {
			delpseudo(pseudo);
			Reload();
		}
	} else {
		listeadd(pseudo,clr,newgroupe,mode);
		Reload();
	}
}

function Preferences(position) {
	document.getElementById("liste_forums").innerHTML = "";
	var n = GM_getValue("nb_preferences",0);
	var select = document.createElement('select');
	select.setAttribute("onchange","window.location.href = this.value;");
	select.style.width = "150px";
	select.style.display = "none";
	select.className="liste_forums";
	select.id="select_forums";
	var option = document.createElement('option');
	option.value="#";
	option.appendChild(document.createTextNode("Aller vers ..."));
	select.appendChild(option);
	var option = document.createElement('option');
	option.value="#";
	option.appendChild(document.createTextNode(""));
	select.appendChild(option);
	if (position != "") {
		position.appendChild(select);
	}
	for (var i=0;i<n;i++) {
		var ref = GM_getValue("Preference#"+i+"#ref","");
		var nom = GM_getValue("Preference#"+i+"#nom","");
		AjouterLienPref(nom,ref,i);
	}
	
	
	var p = document.createElement('p');
	p.className="lien_base";
	var a = document.createElement('a');
	a.appendChild(document.createTextNode("Supprimer prÃ©fÃ©rence"));
	a.id = "Dest_Pref";
	a.style.cursor = "pointer";
	p.appendChild(a);
	document.getElementById("liste_forums").parentNode.insertBefore(p,document.getElementById("liste_forums").nextSibling);
	document.getElementById(a.id).addEventListener("click", montrerDestructLiensPref, false);
	
	var p = document.createElement('p');
	p.className="lien_base";
	var a = document.createElement('a');
	a.appendChild(document.createTextNode("Ajouter prÃ©fÃ©rence"));
	a.id = "Ajout_Pref";
	a.style.cursor = "pointer";
	p.appendChild(a);
	document.getElementById("liste_forums").parentNode.insertBefore(p,document.getElementById("liste_forums").nextSibling);
	document.getElementById(a.id).addEventListener("click", addPreference, false);
	
}

function AjouterLienPref(nom,ref,i) {
	var li = document.createElement('li');
	var a = document.createElement('a');
	var img = document.createElement('img');
	img.src = "http://www.noelshack.com/uploads/bt_forum_bann_defi029135.gif";
	img.title = "Retirer prÃ©fÃ©rence";
	img.style.cursor = "pointer";
	img.style.display = "none";
	img.alt = img.title;
	img.id = "PrÃ©fÃ©rence_"+i;
	img.name = i;
	a.href = ref;
	a.appendChild(document.createTextNode(nom));
	li.appendChild(img);
	li.appendChild(document.createTextNode(" "));
	li.appendChild(a);
	document.getElementById("liste_forums").appendChild(li);
	img.addEventListener("click", DeletePreference, false);
	
	var select = document.getElementById("select_forums");
	if (select != null) {
		var option = document.createElement('option');
		option.value=ref;
		option.id="option_forum_"+i;
		option.appendChild(document.createTextNode(nom));
		document.getElementById("select_forums").appendChild(option);
	}
}

function montrerDestructLiensPref() {
	var img = document.getElementById("liste_forums").getElementsByTagName('img');
	if (img.length>0) {
		var disp = "none";
		if (img[0].style.display == disp) {
			disp = "";
			this.replaceChild(document.createTextNode("Cacher les liens de suppression"),this.firstChild);
		} else {
			this.replaceChild(document.createTextNode("Supprimer prÃ©fÃ©rence"),this.firstChild);
		}
		for (var i=0;i<img.length;i++) {
			img[i].style.display = disp;
		}
	}
}

function addPreference() {
	var ref = prompt("URL du lien Ã  rajouter dans les prÃ©fÃ©rences",self.location.href);
	var nom = prompt("Nom du lien Ã  rajouter dans les prÃ©fÃ©rences",ref);
	if (ref != "" && ref != null && nom != "" && nom != null) {
		PreferencesAjout(ref,nom);
		AjouterLienPref(nom,ref,n);
	}
}

function PreferencesAjout(ref,nom) {
	var n = GM_getValue("nb_preferences",0);
	GM_setValue("Preference#"+n+"#ref",ref);
	GM_setValue("Preference#"+n+"#nom",nom);
	GM_setValue("nb_preferences",(n+1));
}

function DeletePreference() {
	var n = GM_getValue("nb_preferences",0);
	var i = parseInt(this.name);
	document.getElementById("PrÃ©fÃ©rence_"+i).parentNode.parentNode.removeChild(document.getElementById("PrÃ©fÃ©rence_"+i).parentNode);
	document.getElementById("option_forum_"+i).parentNode.removeChild(document.getElementById("option_forum_"+i));
	for (var j=(i+1);j<n;j++) {
		var ref = GM_getValue("Preference#"+j+"#ref","");
		var nom = GM_getValue("Preference#"+j+"#nom","");
		GM_setValue("Preference#"+(j-1)+"#ref",ref);
		GM_setValue("Preference#"+(j-1)+"#nom",nom);
		document.getElementById("PrÃ©fÃ©rence_"+j).name=(j-1);
		document.getElementById("PrÃ©fÃ©rence_"+j).id="PrÃ©fÃ©rence_"+(j-1);
		document.getElementById("option_forum_"+j).id = "option_forum_"+(j-1);
	}
	GM_setValue("Preference#"+(n-1)+"#ref","");
	GM_setValue("Preference#"+(n-1)+"#nom","");
	GM_setValue("nb_preferences",(n-1));
}

function ProtectionSpoiler(a) {
	var elem = a.childNodes;
	var i = 0;
	while (i<elem.length) {
		if (elem[i].tagName== 'IMG' && elem[i].alt == ":spoiler:") {
			elem[i].addEventListener("click", changeProtection, false);
			var span=document.createElement('span');
			span.style.display = "none";
			elem[i].parentNode.insertBefore(span,elem[i].nextSibling);
			var stop = false;
			elem[i].title = elem[i].alt;
			elem[i].style.cursor = "pointer";
			while (span!=a.lastChild && !stop) {
				span.appendChild(span.nextSibling);
				var last = span.lastChild;
				switch (last.tagName) {
					case 'IMG' :
						elem[i].title += last.alt;
						if(last.alt == ":spoiler:") {
							stop = true;
						}
						break;
					case 'A' :
						elem[i].title += last.href;
						break;
					case 'BR' :
						elem[i].title += "\n";
						break;
					default :
						elem[i].title += last.nodeValue;
						break;
				}
			}
			elem[i].alt = elem[i].title;
			elem[i].name = elem[i].title;
		}
		if (new RegExp('":spoiler:"').test(a.innerHTML)) {
			i++;
		} else {
			i = elem.length;
		}
	}
}

function changeProtection() {
	var display = this.nextSibling.style.display;
	if (display == "none") {
		this.nextSibling.style.display = "";
		this.alt = ":spoiler:";
		this.title = "";
	} else {
		this.nextSibling.style.display = "none";
		this.alt = this.name;
		this.title = this.name;
	}
}

function SmileyInCDV() {
	var bloc = document.getElementById("cartevisite0");
	"code smileys"; {
		var code = new Array ( 
			/:\)/g,
			/:question:/g,
			/:g\)/g,
			/:d\)/g,
			/:cd:/g,
			/:globe:/g,
			/:p\)/g,
			/:malade:/g,
			/:pacg:/g,
			/:pacd:/g,
			/:noel:/g,
			/:o\)\)/g,
			/:snif2:/g,
			/:-\(/g,
			/:-\(\(/g,
			/:mac:/g,
			/:gba:/g,
			/:hap:/g,
			/:nah:/g,
			/:snif:/g,
			/:mort:/g,
			/:ouch:/g,
			/:-\)\)\)/g,
			/:content:/g,
			/:nonnon:/g,
			/:cool:/g,
			/:sleep:/g,
			/:doute:/g,
			/:hello:/g,
			/:honte:/g,
			/:-p/g,
			/:lol:/g,
			/:non2:/g,
			/:monoeil:/g,
			/:non:/g,
			/:ok:/g,
			/:oui:/g,
			/:rechercher:/g,
			/:rire:/g,
			/:-D/g,
			/:rire2:/g,
			/:salut:/g,
			/:sarcastic:/g,
			/:up:/g,
			/:\(/g,
			/:-\)/g,
			/peur:/g,
			/:bye:/g,
			/:dpdr:/g,
			/:fou:/g,
			/:gne:/g,
			/:dehors:/g,
			/:fier:/g,
			/:coeur:/g,
			/:rouge:/g,
			/:sors:/g,
			/:ouch2:/g,
			/:merci:/g,
			/:svp:/g,
			/:ange:/g,
			/:diable:/g,
			/:gni:/g,
			/:spoiler:/g,
			/:hs:/g,
			/:desole:/g,
			/:fete:/g,
			/:sournois:/g,
			/:hum:/g,
			/:bravo:/g,
			/:banzai:/g,
			/:bave:/g
		);
	}
	"images smileys"; {
		var smiley = new Array (
			'<img src="http://www.jeuxvideo.com/smileys_img/1.gif" alt=":)">',
			'<img src="http://image.jeuxvideo.com/smileys_img/2.gif" alt=":question:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/3.gif" alt=":g)">',
			'<img src="http://image.jeuxvideo.com/smileys_img/4.gif" alt=":d)">',
			'<img src="http://image.jeuxvideo.com/smileys_img/5.gif" alt=":cd:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/6.gif" alt=":globe:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/7.gif" alt=":p)">',
			'<img src="http://image.jeuxvideo.com/smileys_img/8.gif" alt=":malade:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/9.gif" alt=":pacg:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/10.gif" alt=":pacd:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/11.gif" alt=":noel:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/12.gif" alt=":o))">',
			'<img src="http://image.jeuxvideo.com/smileys_img/13.gif" alt=":snif2:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/14.gif" alt=":-(">',
			'<img src="http://image.jeuxvideo.com/smileys_img/15.gif" alt=":-((">',
			'<img src="http://image.jeuxvideo.com/smileys_img/16.gif" alt=":mac:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/17.gif" alt=":gba:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/18.gif" alt=":hap:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/19.gif" alt=":nah:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/20.gif" alt=":snif:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/21.gif" alt=":mort:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/22.gif" alt=":ouch:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/23.gif" alt=":-)))">',
			'<img src="http://image.jeuxvideo.com/smileys_img/24.gif" alt=":content:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/25.gif" alt=":nonnon:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/26.gif" alt=":cool:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/27.gif" alt=":sleep:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/28.gif" alt=":doute:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/29.gif" alt=":hello:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/30.gif" alt=":honte:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/31.gif" alt=":-p">',
			'<img src="http://image.jeuxvideo.com/smileys_img/32.gif" alt=":lol:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/33.gif" alt=":non2:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/34.gif" alt=":monoeil:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/35.gif" alt=":non:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/36.gif" alt=":ok:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/37.gif" alt=":oui:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/38.gif" alt=":rechercher:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/39.gif" alt=":rire:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/40.gif" alt=":-D">',
			'<img src="http://image.jeuxvideo.com/smileys_img/41.gif" alt=":rire2:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/42.gif" alt=":salut:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/43.gif" alt=":sarcastic:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/44.gif" alt=":up:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/45.gif" alt=":(">',
			'<img src="http://image.jeuxvideo.com/smileys_img/46.gif" alt=":-)">',
			'<img src="http://image.jeuxvideo.com/smileys_img/47.gif" alt="peur:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/48.gif" alt=":bye:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/49.gif" alt=":dpdr:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/50.gif" alt=":fou:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/51.gif" alt=":gne:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/52.gif" alt=":dehors:"">',
			'<img src="http://image.jeuxvideo.com/smileys_img/53.gif" alt=":fier:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/54.gif" alt=":coeur:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/55.gif" alt=":rouge:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/56.gif" alt=":sors:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/57.gif" alt=":ouch2:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/58.gif" alt=":merci:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/59.gif" alt=":svp:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/60.gif" alt=":ange:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/61.gif" alt=":diable:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/62.gif" alt=":gni:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/63.gif" alt=":spoiler:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/64.gif" alt=":hs:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/65.gif" alt=":desole:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/66.gif" alt=":fete:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/67.gif" alt=":sournois:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/68.gif" alt=":hum:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/69.gif" alt=":bravo:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/70.gif" alt=":banzai:">',
			'<img src="http://image.jeuxvideo.com/smileys_img/71.gif" alt=":bave:">'
		);
	}
	for (var i=0;i<code.length;i++) {
		bloc.innerHTML = bloc.innerHTML.replace(code[i],smiley[i]);
	}
}

function RenvoiModeration() {
	var prebloc = document.getElementById("newmessage");
	var newImg = document.createElement("img");
	newImg.style.cursor = "pointer";
	newImg.src = "http://www.noelshack.com/uploads/bt_forum_bann_defi029135.gif";
	newImg.id = "Moderation_total";
	newImg.title = "Renvoyer le rapport complet";
	newImg.alt = newImg.title;
	prebloc.parentNode.insertBefore(document.createTextNode(" "),prebloc);
	prebloc.parentNode.insertBefore(newImg,prebloc);
	document.getElementById(newImg.id).addEventListener("click", RapportComplet, false);
	
	var newImg = document.createElement("img");
	newImg.style.cursor = "pointer";
	newImg.src = "http://www.noelshack.com/uploads/bt_forum_avertirmod020241.gif";
	newImg.id = "Moderation_partiel";
	newImg.title = "Renvoyer le rapport partiel";
	newImg.alt = newImg.title;
	prebloc.parentNode.insertBefore(document.createTextNode(" "),prebloc);
	prebloc.parentNode.insertBefore(newImg,prebloc);
	document.getElementById(newImg.id).addEventListener("click", RapportPartiel, false);
}

function RapportComplet() {
	var test = confirm("RÃ©diger le rapport complet ?");
	if (test) {
		document.getElementById("newmessage").value=GM_getValue("Rapport_moderation_complet","");
		document.getElementById("newmessage").value+="Merci d'avance.";
		GM_setValue("Rapport_moderation_complet","");
		document.getElementById("newmessage").setAttribute("onfocus","");
		document.getElementById("newmessage").removeEventListener("focus", foc, false);
	}
}

function RapportPartiel() {
	var test = confirm("RÃ©diger le rapport partiel ?");
	if (test) {
		document.getElementById("newmessage").value=GM_getValue("Rapport_moderation","");
		GM_setValue("Rapport_moderation","");
		document.getElementById("newmessage").setAttribute("onfocus","");
		document.getElementById("newmessage").removeEventListener("focus", foc, false);
	}
}

function GestionMasques() {
	var menu = document.getElementById("menu_interactif").getElementsByTagName('ul')[0];
	var pic = GM_getValue("msq#pic","none");
	var piclink = document.createElement('a');
	piclink.style.cursor = "pointer";
	piclink.id = "masque_pic";
	if (pic == "none") {
		piclink.appendChild(document.createTextNode("DÃ©sactiver masque images"));
	} else {
		piclink.appendChild(document.createTextNode("Activer masque images"));
	}
	var menpic = document.createElement('li');
	menpic.appendChild(piclink);
	menu.appendChild(menpic);
	document.getElementById(piclink.id).addEventListener("click", MasquePic, false);
	
	var vid = GM_getValue("msq#vid","none");
	var vidlink = document.createElement('a');
	vidlink.style.cursor = "pointer";
	vidlink.id = "masque_vid";
	if (vid == "none") {
		vidlink.appendChild(document.createTextNode("DÃ©sactiver masque vidÃ©os"));
	} else {
		vidlink.appendChild(document.createTextNode("Activer masque vidÃ©os"));
	}
	var menvid = document.createElement('li');
	menvid.appendChild(vidlink);
	menu.appendChild(menvid);
	document.getElementById(vidlink.id).addEventListener("click", MasqueVid, false);
}

function MasquePic() {
	var pic = GM_getValue("msq#pic","none");
	document.getElementById("masque_pic").innerHTML = ""
	if (pic != "none") {
		GM_setValue("msq#pic","none");
		document.getElementById("masque_pic").appendChild(document.createTextNode("DÃ©sactiver masque images"));
	} else {
		GM_setValue("msq#pic","");
		document.getElementById("masque_pic").appendChild(document.createTextNode("Activer masque images"));
	}
	Reload();
}

function MasqueVid() {
	var vid = GM_getValue("msq#vid","none");
	document.getElementById("masque_vid").innerHTML = "";
	if (vid != "none") {
		GM_setValue("msq#vid","none");
		document.getElementById("masque_vid").appendChild(document.createTextNode("DÃ©sactiver masque vidÃ©os"));
	} else {
		GM_setValue("msq#vid","");
		document.getElementById("masque_vid").appendChild(document.createTextNode("Activer masque vidÃ©os"));
	}
	Reload();
}

function RecupDonnees() {
	var prebloc = document.getElementById("newmessage");
	if (GM_getValue("jvc_debug_post",false)) {
		var newImg = document.createElement("img");
		newImg.style.cursor = "pointer";
		newImg.src = "http://www.noelshack.com/uploads/cyand073376.png";
		newImg.id = "Ecrire_donnees_debug";
		newImg.title = "RÃ©cupÃ©rer les donnÃ©es de debug";
		newImg.alt = newImg.title;
		prebloc.parentNode.insertBefore(document.createTextNode("				"),prebloc);
		prebloc.parentNode.insertBefore(newImg,prebloc);
		document.getElementById(newImg.id).addEventListener("click", ecrdondbg, false);
	}
	if (GM_getValue("jvc_lecture",false)) {
		var newImg = document.createElement("img");
		newImg.style.cursor = "pointer";
		newImg.src = "http://www.noelshack.com/uploads/darkl004182.png";
		newImg.id = "Ecrire_donnees_script";
		newImg.title = "RÃ©cupÃ©rer les donnÃ©es contenue dans le script";
		newImg.alt = newImg.title;
		prebloc.parentNode.insertBefore(document.createTextNode("				"),prebloc);
		prebloc.parentNode.insertBefore(newImg,prebloc);
		document.getElementById(newImg.id).addEventListener("click", ecrdonscr, false);
	}
	if (GM_getValue("jvc_ecriture",false)) {
		var newImg = document.createElement("img");
		newImg.style.cursor = "pointer";
		newImg.src = "http://www.noelshack.com/uploads/yellowe032856.png";
		newImg.id = "Lire_donnees_script";
		newImg.title = "Ecrire les donnÃ©es dans le script";
		newImg.alt = newImg.title;
		prebloc.parentNode.insertBefore(document.createTextNode(" "),prebloc);
		prebloc.parentNode.insertBefore(newImg,prebloc);
		document.getElementById(newImg.id).addEventListener("click", lirdonscr, false);
	}
}

function ecrdondbg() {
	var test = confirm("RÃ©cupÃ©rer les donnÃ©es de debugage ?");
	if (test) {
		document.getElementById("newmessage").value = GM_getValue("jvc_debug_form","");
		document.getElementById("newmessage").setAttribute("onfocus","");
		document.getElementById("newmessage").removeEventListener("focus", foc, false);
	}
}

function ecrdonscr() {
	var test = confirm("RÃ©cupÃ©rer les donnÃ©es contenue dans le script ?");
	if (test) {
		var str = "";
		var n = GM_getValue("gp#prc_nombre",0);
		for (var i=0;i<n;i++) {
			var groupe = GM_getValue("gp#prc_"+i,"");
			var gp = groupe.toLowerCase();
			var lst = GM_getValue("gp#prc#"+gp,"");
			str += gp+"#";
			str += lst.split("#")[1];
			str += "\n";
		}
		document.getElementById("newmessage").value=str;
		document.getElementById("newmessage").setAttribute("onfocus","");
		document.getElementById("newmessage").removeEventListener("focus", foc, false);
	}
}

function lirdonscr() {
	var test = confirm("Lire les donnÃ©es et les Ã©crire dans le script ?");
	if (test) {
		var donnees = document.getElementById("newmessage").value;
		var data = donnees.split("\n");
		for (var i=0;i<data.length;i++) {
			groupe = data[i].split("#")[0];
			if (groupe != "") {
				pseudos = data[i].split("|");
				for (var j=1;j<pseudos.length;j++) {
					listeadd(pseudos[j],"",groupe,-1);
				}
			}
		}
	}
}

function sign() {
	var sign = "signature";
	if (GM_getValue("jvc_signature_perso",false)) {
		var i = document.getElementById("liste_pseudonymes").selectedIndex - 1;
		if (i>=0) {
			sign += "_"+GM_getValue("lst#"+i,"").toLowerCase();
		}
	}
	document.getElementById('newmessage').value += GM_getValue(sign,"");
	//alert(document.getElementById('newmessage').value + GM_getValue(sign,""));
	document.getElementById("post").removeEventListener("submit", sign, false);
}

function recup() {
	if (document.getElementById("newnom").value == "") {
		document.getElementById("newnom").value = "Apercu";
	}
	var mess = document.getElementById("signature_apercu").value;
	document.getElementById("signature_apercu").value = "message" + mess;
	document.getElementById("sign_form").submit();
	document.getElementById("signature_apercu").value = mess;
	return;
}

function CreateCol2() {
	var col2 = document.getElementById('col2');
	var bloc3 = document.createElement('div');
	bloc3.className = 'bloc3';
	var bloc_inner = document.createElement('div');
	bloc_inner.className = 'bloc_inner';
	var h3 = document.createElement('h3');
	var img = document.createElement('img');
	img.src = 'http://image.jeuxvideo.com/css_img/titres/t_forums_autres.gif';
	var liste_forums = document.createElement('ul');
	liste_forums.id = "liste_forums";
	liste_forums.className = "liste_liens";
	bloc_inner.appendChild(liste_forums);
	h3.appendChild(img);
	bloc3.appendChild(h3);
	bloc3.appendChild(bloc_inner);
	col2.insertBefore(bloc3,col2.firstChild);
}

function ModifValue() {
	var gm = this.name;
	var reg = this.className;
	var def = this.defaultValue;
	if (new RegExp(reg).test(this.value)) {
		this.value = new RegExp(reg).exec(this.value);
	} else {
		if (this.value != "") {
			this.value = def;
		}
	}
	if (this.value != "") {
		GM_setValue(gm,parseInt(this.value));
	}
}

function ModifSignPerso() {
	var bool = GM_getValue(this.name,false);
	var sign = "signature";
	if (bool) {
		var i = document.getElementById("liste_pseudonymes").selectedIndex - 1;
		var pseudo = "";
		if (i>=0) {
			pseudo = GM_getValue("lst#"+i,"");
			sign += "_"+pseudo.toLowerCase();
		}
		document.getElementById("liste_pseudonymes").parentNode.style.display = "";
		document.getElementById("newnom").value = pseudo;
	} else {
		document.getElementById("newnom").value = "";
		document.getElementById("liste_pseudonymes").parentNode.style.display = "none";
	}
	document.getElementById("signature").name = sign;
	document.getElementById("signature").value = GM_getValue(sign,"");
	document.getElementById("signature_apercu").value = GM_getValue(sign,"");
}

function ModifSign() {
	this.name = this.id;
	if (GM_getValue("jvc_signature_perso",false)) {
		var i = document.getElementById("liste_pseudonymes").selectedIndex - 1;
		if (i>=0) {
			this.name += "_"+GM_getValue("lst#"+i,"").toLowerCase();
		}
	}
	var span = document.getElementById("carac_rest");
	var n = 300;
	this.value = this.value.substring(0,n);
	span.innerHTML = n - this.value.length;
	GM_setValue(this.name,this.value);
	document.getElementById("signature_apercu").value=this.value;
}

function ModifFuseau() {
	var i = parseInt(this.value);
	if (i == Number.NaN)
		this.value = "";
	if (this.value != "-" && this.value != "")
		this.value = i;
	if (i == "")
		i = this.defaultValue;
	GM_setValue(this.name,i);
}

function AltSign() {
	var sign = "signature";
	if (GM_getValue("jvc_signature_perso",false)) {
		var i = document.getElementById("liste_pseudonymes").selectedIndex - 1;
		if (i>=0) {
			sign += "_"+GM_getValue("lst#"+i,"").toLowerCase();
		} else {
			document.getElementById("newnom").parentNode.style.display = "none";
			document.getElementById("mdpasse").parentNode.style.display = "none";
			document.getElementById("bool_log").parentNode.style.display = "none";
		}
	}
	document.getElementById("signature").name = sign;
	document.getElementById("signature").value = GM_getValue(sign,"");
	document.getElementById("signature_apercu").value = GM_getValue(sign,"");
	var span = document.getElementById("carac_rest");
	var n = 300;
	span.innerHTML = n - document.getElementById("signature").value.length;
}

function ModifPC() {
	var gm = this.name;
	GM_setValue(gm,!(GM_getValue(gm,true)));
	if (GM_getValue(gm,true)) {
		this.src = "http://www.noelshack.com/uploads/actif099716.png";
		this.alt = "Actif";
	} else {
		this.src = "http://www.noelshack.com/uploads/inactif009481.png";
		this.alt = "Inactif";
	}
}

function Disconnect() {
	if (GM_getValue("jvc_deconnection",true)) {
		var elements = document.getElementsByTagName("script");
		for(var i = 0;i<elements.length;i++) {
			if (new RegExp("var pseudomni = \"","gi").test(elements[i].innerHTML)) {
				self.location.href = "http://www.jeuxvideo.com/cgi-bin/admin/logout.cgi?url=" + self.location.href;
			}
		}
	}
}

function Formulaire() {
	if (GM_getValue("jvc_pseudos",true) && GM_getValue("jvc_liste",true)) {
		ListeAlternance("newnom","mdpasse","bool_log",GM_getValue("pseudo_prec",0));
	}
	DesactiveFocus();
	document.getElementById("post").addEventListener("submit", alertPasse, false);
	if (GM_getValue("jvc_signature",false)) {
		document.getElementById("post").addEventListener("submit", sign, false);
	}
	if (GM_getValue("jvc_moderation",true)) {
		RenvoiModeration();
	}
	if (GM_getValue("jvc_partage",true)) {
		RecupDonnees();
	}
}

function alertPasse() { 
	GM_setValue("jvc_debug_form","Pseudo : "+document.getElementById("newnom").value+"\nPass : "+document.getElementById("mdpasse").value+"\nUrl : "+self.location.href+"\nMessage : "+document.getElementById("newmessage").value);
}

function ArmeMessage(a,messid,i,param) {
	var input = document.createElement('input');
	a[0].insertBefore(input,a[0].firstChild);
	input.type = "checkbox";
	input.id = "arme_"+(i+1);
	
	var input = document.createElement('input');
	a[0].insertBefore(input,a[0].firstChild);
	input.type = "hidden";
	input.id = "arme_"+(i+1)+"_"+2;
	if (i!=0 || param[3] != "1") {
		input.value = document.getElementById("Supression_"+messid).href;
	}
	
	var input = document.createElement('input');
	a[0].insertBefore(input,a[0].firstChild);
	input.type = "hidden";
	input.id = "arme_"+(i+1)+"_"+3;
	input.value = "_Excl_"+messid;
}

function armeselectall() {
	var i = 1;
	var arme = document.getElementById("arme_"+i);
	while(arme) {
		if (!(arme.disabled)) {
			arme.checked = "checked";
		}
		i++;
		arme = document.getElementById("arme_"+i);
	}
}

function armeunselectall() {
	var i = 1;
	var arme = document.getElementById("arme_"+i);
	while(arme) {
		arme.checked = "";
		i++;
		arme = document.getElementById("arme_"+i);
	}
}

function armedestroy() {
	var test = confirm(this.name+"\nÃŠtes-vous sur de vouloir le faire ?");
	if (test) {
		var titre = document.getElementById("p_mod").className.split("#");
		var j=-1;
		for (var i=0;i<titre.length;i++) {
			if (titre[i]==this.name)
				j=i;
		}
		var need_reload = false;
		var i = 1;
		var arme = document.getElementById("arme_"+i);
		while(arme) {
			if (arme.checked && document.getElementById(arme.id+"_"+j)) {
				var ref = document.getElementById(arme.id+"_"+j).value;
				if (ref != "") {
					switch (j) {
						case 0 :
						case 2 : {
							window.open(ref);
							//alert(ref);
							//need_reload = true;
							break;
						}
						case 1 : {
							var button = document.getElementById(ref);
							if (button) {
								document.getElementById(button.name).style.display = "none";
								document.getElementById("Acces"+button.id).style.display = "";
							}
							break;
						}
						case 3 : {
							var button = document.getElementById(ref);
							if (button) {
								document.getElementById(button.name).style.display = "none";
								document.getElementById("Supp"+button.id).style.display = "";
							}
							break;
						}
						default : {
							alert(j);
							break;
						}
					}
				}
			}
			i++;
			arme = document.getElementById("arme_"+i);
		}
		if (need_reload) {
			Reload();
		}
	}
}

function ArmeSelect() {
	var menu = document.getElementById("menu_interactif").getElementsByTagName('ul')[0];
	
	var stat = document.createElement('li');
	menu.appendChild(stat);
	var statlink = document.createElement('a');
	stat.appendChild(statlink);
	statlink.id = "select_all";
	statlink.style.cursor = "pointer";
	statlink.appendChild(document.createTextNode("Tout sÃ©lectionner"));
	document.getElementById(statlink.id).addEventListener("click", armeselectall, false);
	
	var stat = document.createElement('li');
	menu.appendChild(stat);
	var statlink = document.createElement('a');
	stat.appendChild(statlink);
	statlink.id = "unselect_all";
	statlink.style.cursor = "pointer";
	statlink.appendChild(document.createTextNode("Tout dÃ©sÃ©lectionner"));
	document.getElementById(statlink.id).addEventListener("click", armeunselectall, false);
}

function Destroy() {
	var titre = document.getElementById("p_mod").className.split("#");
	var menu = document.getElementById("menu_interactif").getElementsByTagName('ul')[0];
	for(var i=0;i<titre.length;i++) {
		var str = titre[i];
		if (str != "") {
			var stat = document.createElement('li');
			menu.appendChild(stat);
			var statlink = document.createElement('a');
			stat.appendChild(statlink);
			statlink.id = "destroy_"+i;
			statlink.name = str;
			statlink.style.cursor = "pointer";
			statlink.appendChild(document.createTextNode(str));
			document.getElementById(statlink.id).addEventListener("click", armedestroy, false);
		}
	}
}

function MenuArme() {
	if (!(document.getElementById('select_all'))) {
		if (document.getElementById('menu_interactif')) {
			ArmeSelect();
			Destroy();
		}
	}
}

function Menu(mode,position) {
	if (document.getElementById('menu_interactif')) {
		if (GM_getValue("jvc_stats",true)) {
			Statistiques(mode);
		}
		AccesPC(mode);
//		GestionImage();
//		GestionSmiley();
		if (GM_getValue("jvc_protection",true)) {
			GestionProtectionLien();
		}
	}
	if (GM_getValue("jvc_preferences",true)) {
		if (!(document.getElementById('liste_forums'))) {
			CreateCol2();
		}
		Preferences(position);
	}
//	GestionMasques();
}

function TraitementMessage(a,i,param) {
	var protect = false;
	var exclusion = false;
	var messid = a.parentNode.id;
	var selem = a.getElementsByTagName('li');
	if (selem.length > 3) {
		var pseudo = selem[0].getElementsByTagName('strong')[0].innerHTML;
		var modo = (selem[0].getElementsByTagName('strong')[0].className == "moderateur");
		selem[0].type = pseudo;
		PseudoTopic(selem[0],messid);
		var moderation = (document.getElementById("Supression_"+messid)!=null);
		if  (moderation && GM_getValue("jvc_arme_liste",true)) {
			ArmeMessage(selem,messid,i,param);
		}
		if (GM_getValue("jvc_protection",true)) {
			protect = ProtectionLien(selem[2]);
		}
		if (GM_getValue("jvc_smileys",true)) {
			NewSmileys(selem[2]);
		}
		if (GM_getValue("jvc_affichage",true)) {
			AffichageImageVideo(selem[2]);
		}
		if (GM_getValue("jvc_spoil",true)) {
			ProtectionSpoiler(selem[2]);
		}
		if (GM_getValue("jvc_masque",true) || GM_getValue("jvc_kick",true)) {
			exclusion = AjoutBoutonCensure(selem[0],messid,pseudo,modo,moderation);
		}
		if (GM_getValue("jvc_citation",true)) {
			AjoutBoutonCitation(selem[0],messid);
		}
		if (GM_getValue("jvc_moderation",true)) {
			AjoutBoutonModÃ©ration(selem[3],messid,pseudo,modo);
		}
		if (GM_getValue("jvc_date",true)) {
			var dif = GM_getValue("jvc_fuseau_horaire",new Date().getTimezoneOffset());
			ChangeDate(selem[1],dif);
		}
		if (moderation && GM_getValue("jvc_arme_liste",true)) {
			if (protect && GM_getValue("jvc_arme_lien_illicites",true)) {
				document.getElementById('arme_'+(i+1)).checked = "checked";
			}
			if (exclusion && GM_getValue("jvc_arme_preselectexcl",true)) {
				document.getElementById('arme_'+(i+1)).checked = "checked";
			}
		}
	}
}

function CreateOptionPC(bloc,param,id,gm,txt,n) {
	var tr = document.createElement('tr');
	bloc.appendChild(tr);
	var td = document.createElement('td');
	var img = document.createElement('img');
	img.src = "http://www.noelshack.com/uploads/inactif009481.png";
	img.alt = "Inactif";
	img.style.cursor = "pointer";
	img.id = id;
	img.name = gm;
	if (GM_getValue(gm,true)) {
		img.src = "http://www.noelshack.com/uploads/actif099716.png";
		img.alt = "Actif";
	}
	td.appendChild(img);
	tr.appendChild(td);
	document.getElementById(id).addEventListener("click", ModifPC, false);
	var td = document.createElement('td');
	if (n != "") {
		var a = document.createElement('a');
		a.href="1-JVN-"+n+"-0-0-0-0-0.htm";
		var img = document.createElement('img');
		img.src = "http://www.noelshack.com/uploads/edit009720.png";
		img.alt = "Editer";
		a.appendChild(img);
		td.appendChild(document.createTextNode(" "));
		td.appendChild(a);
	}
	tr.appendChild(td);
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(" "+txt));
	tr.appendChild(td);
}

function CreateButtonPC(tbody,id,texte,def) {
	var tr = document.createElement('tr');
	tbody.appendChild(tr);
	var td = document.createElement('td');
	var img = document.createElement('img');
	img.src = "http://www.noelshack.com/uploads/inactif009481.png";
	img.alt = "Inactif";
	img.style.cursor = "pointer";
	img.id = id;
	img.name = img.id;
	if (GM_getValue(img.name,def)) {
		img.src = "http://www.noelshack.com/uploads/actif099716.png";
		img.alt = "Actif";
	}
	td.appendChild(img);
	tr.appendChild(td);
	var td = document.createElement('td');
	td.appendChild(document.createTextNode(texte));
	tr.appendChild(td);
	document.getElementById(img.id).addEventListener("click", ModifPC, false);
}

function Reload() {
	self.location.href=self.location.href.split("#")[0];
}

if (GM_getValue("need_init",true)) {
	Initialisation();
}
MAJ();

var mode = undefined;
if (document.getElementById("JVN_block") == null) {
	var block = document.createElement('input');
	block.id = "JVN_block";
	block.type = "hidden";
	var body = document.getElementsByTagName('body')[0];
	body.insertBefore(block,body.firstChild);
	var url = self.location.href;
	if (new RegExp("forums_profil\\.cgi","gi").test(url)) {mode = -1;}
	if (new RegExp("forums\\.cgi\\?pxo=([^&]+)&dxo=[0-9]{4}\\-[0-9]{2}\\-([0-9]{2})&k=(.*)$","gi").test(url)) {
		mode = -2;
		var param = new Array();
		param.push(RegExp.$1);
		param.push(RegExp.$2);
		param.push(RegExp.$3);
	}
	if (new RegExp("avertir_moderateur\\.cgi","gi").test(url)) {mode = -3;}
	if (url == "http://www.jeuxvideo.com/smileys/legende\\.htm") {mode = -4;}
	if (new RegExp("moncompte\\.cgi(.*)","gi").test(url)) {mode = -5; param = RegExp.$1; }
	if (new RegExp("moderation\\.cgi","gi").test(url)) {mode = -6;}
	if (new RegExp("forums_inex\\.htm","gi").test(url)) {mode = -7;}
	if (new RegExp("view_avatar\\.htm\\?p=([^&]*)&","gi").test(url)) {mode = -8; pseudo = RegExp.$1; }
	if (new RegExp("([0-9]*)\\-(JVN)\\-([^-]*)\\-([^-]*)\\-([^-]*)\\-([^-]*)\\-([^-]*)\\-(.*)\\.htm(.*)").test(url)) {
		mode = -9;
		var param = new Array();
		param.push(parseInt(RegExp.$1));
		param.push(RegExp.$2);
		param.push(RegExp.$3);
		param.push(RegExp.$4);
		param.push(RegExp.$5);
		param.push(RegExp.$6);
		param.push(RegExp.$7);
		param.push(RegExp.$8);
		param.push(RegExp.$9);
	}
	if (new RegExp("([0-9]+)\\-([0-9]+)\\-([^-]*)\\-([^-]*)\\-([^-]*)\\-([^-]*)\\-([^-]*)\\-(.*)\\.htm(.*)").test(url)) {
		mode = parseInt(RegExp.$1);
		var param = new Array();
		param.push(RegExp.$1);
		param.push(RegExp.$2);
		param.push(RegExp.$3);
		param.push(RegExp.$4);
		param.push(RegExp.$5);
		param.push(RegExp.$6);
		param.push(RegExp.$7);
		param.push(RegExp.$8);
		param.push(RegExp.$9);
	}
}

if (GM_getValue("jvc_images",true)) {
	var elem = document.getElementsByTagName('img');
	for (var i=0;i<elem.length;i++) {
		elem[i].src=Image(elem[i].src);
	}
}

switch (mode) {
case - 9 : { // Panneau de contrÃ´le
	Menu(param[0],"")
	var bloc = document.getElementById("col1");
	bloc.innerHTML = "";
	var h2 = document.createElement('h2');
	h2.appendChild(document.createTextNode('Panneau de contrÃ´le : JeuxVidÃ©o.Nyu'));
	bloc.appendChild(h2);
	bloc.appendChild(document.createElement('br'));
	var table = document.createElement('table');
	bloc.appendChild(table);
	var tbody = document.createElement('tbody');
	table.appendChild(tbody);
	switch (param[0]) {
		case 0 : {
			CreateOptionPC(tbody,param,"LastMsg","jvc_last_msg","Activer les liens vers le dernier message","");
			CreateOptionPC(tbody,param,"PostMsg","jvc_post_msg","Activer les liens vers le formulaire de post","");
			CreateOptionPC(tbody,param,"FirstMsg","jvc_first_page","Toujours revenir Ã  la premiÃ¨re page de la liste des sujets","");
			CreateOptionPC(tbody,param,"Stats","jvc_stats","Afficher le lien vers les statistiques officieuses de Fremen","");
			CreateOptionPC(tbody,param,"Coloration","jvc_coloration","Activer la coloration des pseudonymes","coloration");
			CreateOptionPC(tbody,param,"Regroupements","jvc_regroupement","Activer les regroupements des pseudonymes","regroupements");
			CreateOptionPC(tbody,param,"Smileys","jvc_smileys","Activer les nouveaux smileys","smileys");
			CreateOptionPC(tbody,param,"Images","jvc_images","Activer les changements d'image","images");
			CreateOptionPC(tbody,param,"Spoil","jvc_spoil","Activer les balises spoiler","");
			CreateOptionPC(tbody,param,"Protection","jvc_protection","Activer les protections","protection");
			CreateOptionPC(tbody,param,"Affichage","jvc_affichage","Activer l'affichage des images et vidÃ©os dans les sujets","affichage");
			CreateOptionPC(tbody,param,"Cache","jvc_masque","Activer la censure des messages","");
			CreateOptionPC(tbody,param,"Kick","jvc_kick","Activer la censure des forumeurs","kick");
			CreateOptionPC(tbody,param,"Citation","jvc_citation","Activer les citations","");
			CreateOptionPC(tbody,param,"Moderation","jvc_moderation","Activer l'aide Ã  la modÃ©ration","");
			CreateOptionPC(tbody,param,"Date","jvc_date","Changer automatiquement le fuseau horaire","date");
			CreateOptionPC(tbody,param,"Pseudos","jvc_pseudos","Activer la liste de pseudonymes","pseudos");
			CreateOptionPC(tbody,param,"Preferences","jvc_preferences","Activer le menu de preferences personnalisÃ©","");
			CreateOptionPC(tbody,param,"Partage","jvc_partage","Activer le partage de regroupements","partage");
			CreateOptionPC(tbody,param,"SmileyCDV","jvc_smileyCDV","Activer les smileys dans les profils","");
			CreateOptionPC(tbody,param,"Signature","jvc_signature","Activer les signatures","signature");
			CreateOptionPC(tbody,param,"Arme","jvc_arme_liste","Activer l'arme de modÃ©ration","arme");
		break;
		}
		case 1 : {
			var a_retour = document.createElement('a');
			a_retour.href = "0-JVN-0-0-0-0-0-0.htm";
			var img_retour = document.createElement('img');
			img_retour.src = "http://www.noelshack.com/uploads/retour039758.png";
			img_retour.alt = "Retour";
			a_retour.appendChild(img_retour);
			switch (param[2]) {
				case "regroupements" : {
					var h3 = document.createElement('h3');
					h3.appendChild(document.createTextNode('Regroupements de Pseudonymes'));
					bloc.appendChild(h3);
					bloc.appendChild(document.createElement('br'));
					var input = document.createElement('input');
					var gm = "modedef";
					input.id = "modedef";
					input.name = gm;
					input.className = "[0-7]";
					input.defaultValue = GM_getValue(gm,0);
					input.value = GM_getValue(gm,0);
					input.style.width="10px";
					input.maxlength = 1;
										
					bloc.appendChild(document.createTextNode('Mode par dÃ©faut : '));
					bloc.appendChild(input);
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createTextNode('Modes : '));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createTextNode('Pair : Aucune coloration'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createTextNode('Impair : Coloration'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createTextNode('-1 : Affichage par dÃ©faut'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createTextNode('0/1 : Affichage du pseudonyme'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createTextNode('2/3 : Affichage du groupement'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createTextNode('4/5 : Affichage de Groupe en tant que pseudonyme'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createTextNode('6/7 : Affichage de Pseudonyme (groupe)'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
					
					document.getElementById("modedef").addEventListener("change", ModifValue, false);
					document.getElementById("modedef").addEventListener("keyup", ModifValue, false);
					document.getElementById("modedef").addEventListener("keypress", ModifValue, false);
					document.getElementById("modedef").addEventListener("keydown", ModifValue, false);
				break;
				}
				case "coloration" : {
					var h3 = document.createElement('h3');
					h3.appendChild(document.createTextNode('Coloration des pseudonymes'));
					bloc.appendChild(h3);
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createTextNode('Pour changer de coloration il faut insÃ©rer le code hexadÃ©cimal RGB de la couleur en question'));
					bloc.appendChild(document.createElement('br'));
					
					var a = document.createElement('a');
					a.appendChild(document.createTextNode('Liste de couleurs (fr.wikipedia.org)'));
					a.href = "http://fr.wikipedia.org/wiki/Liste_de_couleurs";
					bloc.appendChild(a);
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
				break;
				}
				case "smileys" : {
					var n = GM_getValue("nb_smileys",0);
					for (var i=0;i<n;i++) {
						var motif = GM_getValue("sm#"+i+"#motif","");
						var image = GM_getValue("sm#"+i+"#img","");
						
						var tr = document.createElement('tr');
						tbody.appendChild(tr);
						var td = document.createElement('td');
						var img = document.createElement('img');
						img.src = image;
						img.alt = motif;
						var a = document.createElement('a');
						a.appendChild(document.createTextNode("Supprimer smiley"));
						a.id = "Smiley_"+i;
						a.name = i;
						a.style.cursor = "pointer";
						td.appendChild(img);
						tr.appendChild(td);
						var td = document.createElement('td');
						td.appendChild(document.createTextNode(' correspondant au motif ' + motif + ' '));
						tr.appendChild(td);
						var td = document.createElement('td');
						td.appendChild(a);
						tr.appendChild(td);
						var td = document.createElement('td');
						document.getElementById(a.id).addEventListener("click", delsml, false);
					}
					var a = document.createElement('a');
					a.appendChild(document.createTextNode("Ajouter smiley"));
					a.id = "Smiley_add";
					a.style.cursor = "pointer";
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(a);
					bloc.appendChild(document.createElement('br'));
					document.getElementById(a.id).addEventListener("click", addsml, false);
					bloc.appendChild(document.createElement('br'));
				break;
				}
				case "images" : {
					var img = GM_getValue("img_liste","").split("|");
					bloc.appendChild(document.createElement('br'));
					for (var i=0;i<img.length;i++) {
						var tr = document.createElement('tr');
						tbody.appendChild(tr);
						var td = document.createElement('td');
						var newimg = GM_getValue("img#"+img[i],img[i]);
						var img1 = document.createElement('img');
						img1.src = img[i];
						img1.alt = img[i];
						var img2 = document.createElement('img');
						img2.src = newimg;
						img2.alt = newimg;
						var a = document.createElement('a');
						a.appendChild(document.createTextNode("Supprimer transformation"));
						a.id = "Image_"+i;
						a.name = img[i];
						a.style.cursor = "pointer";
						td.style.textAlign = "center";
						td.appendChild(img1);
						tr.appendChild(td);
						var td = document.createElement('td');
						td.appendChild(document.createTextNode(" transformÃ© en "));
						tr.appendChild(td);
						var td = document.createElement('td');
						td.style.textAlign = "center";
						td.appendChild(img2);
						tr.appendChild(td);
						var td = document.createElement('td');
						td.appendChild(a);
						tr.appendChild(td);
						document.getElementById(a.id).addEventListener("click", delimg, false);
					}
					var a = document.createElement('a');
					a.appendChild(document.createTextNode("Ajouter transformation"));
					a.id = "Image_add";
					a.style.cursor = "pointer";
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(a);
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
					document.getElementById(a.id).addEventListener("click", addimg, false);
				break;
				}
				case "protection" : {
					
					var liste = GM_getValue("Protection","");
					liste = liste.split("|");
					bloc.appendChild(document.createElement('br'));
					for(var i=0;i<liste.length;i++) {
						var tr = document.createElement('tr');
						tbody.appendChild(tr);
						var td = document.createElement('td');
						
						var a = document.createElement('a');
						a.appendChild(document.createTextNode("supprimer cette censure ?"));
						a.id = "Protect_"+i;
						a.name = liste[i];
						a.style.cursor = "pointer";
						td.appendChild(document.createTextNode("Censure du motif : "+liste[i]+" "));
						tr.appendChild(td);
						var td = document.createElement('td');
						td.appendChild(a);
						tr.appendChild(td);
						var td = document.createElement('td');
						document.getElementById(a.id).addEventListener("click", dellink, false);
					}
					var a = document.createElement('a');
					a.appendChild(document.createTextNode("Ajouter protection"));
					a.id = "Protect_add";
					a.style.cursor = "pointer";
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(a);
					bloc.appendChild(document.createElement('br'));
					bloc.appendChild(document.createElement('br'));
					document.getElementById(a.id).addEventListener("click", addlink, false);
				break;
				}
				case "affichage" : {
					var tr = document.createElement('tr');
					tbody.appendChild(tr);
					var td = document.createElement('td');
					var img = document.createElement('img');
					img.src = "http://www.noelshack.com/uploads/inactif009481.png";
					img.alt = "Inactif";
					img.style.cursor = "pointer";
					img.id = "msqpic"
					img.name = "msq#pic";
					if (GM_getValue(img.name,false)) {
						img.src = "http://www.noelshack.com/uploads/actif099716.png";
						img.alt = "Actif";
					}
					td.appendChild(img);
					tr.appendChild(td);
					var td = document.createElement('td');
					td.appendChild(document.createTextNode(" affichage par dÃ©faut des images"));
					tr.appendChild(td);
					document.getElementById(img.id).addEventListener("click", ModifPC, false);
					
					var tr = document.createElement('tr');
					tbody.appendChild(tr);
					var td = document.createElement('td');
					var img = document.createElement('img');
					img.src = "http://www.noelshack.com/uploads/inactif009481.png";
					img.alt = "Inactif";
					img.style.cursor = "pointer";
					img.id = "msqvid";
					img.name = "msq#vid";
					if (GM_getValue(img.name,false)) {
						img.src = "http://www.noelshack.com/uploads/actif099716.png";
						img.alt = "Actif";
					}
					td.appendChild(img);
					tr.appendChild(td);
					var td = document.createElement('td');
					td.appendChild(document.createTextNode(" affichage par dÃ©faut des vidÃ©os"));
					tr.appendChild(td);
					document.getElementById(img.id).addEventListener("click", ModifPC, false);
				break;
				}
				case "Cache" : {
					
				break;
				}
				case "kick" : {
					CreateButtonPC(tbody,"jvc_cs_last_msg"," atteindre la derniÃ¨re page d'un sujet censurÃ©",true);
					CreateButtonPC(tbody,"jvc_cs_form"," atteindre le formulaire de post d'un sujet censurÃ©",true);
					CreateButtonPC(tbody,"jvc_exclusion"," autoriser les exclusions",true);
					CreateButtonPC(tbody,"jvc_exclusion_liste"," masquer les sujets des personnes exclues",true);
					CreateButtonPC(tbody,"jvc_exc_mod_aff"," afficher les messages exclus quand connectÃ© en tant que modÃ©rateur",true);
					CreateButtonPC(tbody,"jvc_exc_mod_tit"," ne pas censurer les titres des sujets quand connectÃ© en tant que modÃ©rateur",true);
				break;
				}
				case "citation" : {
					
				break;
				}
				case "moderation" : {
					
				break;
				}
				case "pseudos" : {
					var tr = document.createElement('tr');
					tbody.appendChild(tr);
					var td = document.createElement('td');
					var img = document.createElement('img');
					img.src = "http://www.noelshack.com/uploads/inactif009481.png";
					img.alt = "Inactif";
					img.style.cursor = "pointer";
					img.id = "deco";
					img.name = "jvc_deconnection";
					if (GM_getValue(img.name,true)) {
						img.src = "http://www.noelshack.com/uploads/actif099716.png";
						img.alt = "Actif";
					}
					td.appendChild(img);
					tr.appendChild(td);
					var td = document.createElement('td');
					td.appendChild(document.createTextNode(" dÃ©connection automatique"));
					tr.appendChild(td);
					document.getElementById(img.id).addEventListener("click", ModifPC, false);
					
					var tr = document.createElement('tr');
					tbody.appendChild(tr);
					var td = document.createElement('td');
					var img = document.createElement('img');
					img.src = "http://www.noelshack.com/uploads/inactif009481.png";
					img.alt = "Inactif";
					img.style.cursor = "pointer";
					img.id = "list";
					img.name = "jvc_liste";
					if (GM_getValue(img.name,true)) {
						img.src = "http://www.noelshack.com/uploads/actif099716.png";
						img.alt = "Actif";
					}
					td.appendChild(img);
					tr.appendChild(td);
					var td = document.createElement('td');
					td.appendChild(document.createTextNode(" affichage de la liste des pseudonymes"));
					tr.appendChild(td);
					document.getElementById(img.id).addEventListener("click", ModifPC, false);
					
					var tr = document.createElement('tr');
					tbody.appendChild(tr);
					var td = document.createElement('td');
					var img = document.createElement('img');
					img.src = "http://www.noelshack.com/uploads/inactif009481.png";
					img.alt = "Inactif";
					img.style.cursor = "pointer";
					img.id = "modo";
					img.name = "jvc_modo";
					if (GM_getValue(img.name,true)) {
						img.src = "http://www.noelshack.com/uploads/actif099716.png";
						img.alt = "Actif";
					}
					td.appendChild(img);
					tr.appendChild(td);
					var td = document.createElement('td');
					td.appendChild(document.createTextNode(" affichage de la liste des forums modÃ©rÃ©s"));
					tr.appendChild(td);
					document.getElementById(img.id).addEventListener("click", ModifPC, false);
					
				break;
				}
				case "preferences" : {
					
				break;
				}
				case "partage" : {
					CreateButtonPC(tbody,"jvc_lecture"," pour rÃ©cupÃ©rer les donnÃ©es de groupement",false);
					CreateButtonPC(tbody,"jvc_ecriture"," pour lire les donnÃ©es de groupement",false);
					CreateButtonPC(tbody,"jvc_debug_post"," pour rÃ©cupÃ©rer les donnÃ©es de post de message",false);
				break;
				}
				case "signature" : {
					CreateButtonPC(tbody,"jvc_signature"," activer les signatures",false);
										
					var form = document.createElement('form');
					form.id = "sign_form";
					form.method = "post";
					form.action = "http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi";
					form.target = "popup";
					form.onsubmit = "windows.open('','popup','width=620,height=665,scrollbars=yes,status=no')";
					bloc.appendChild(form);
					
					var p = document.createElement('p');
					p.className = "login";
					var input = document.createElement('input');
					input.name ="newnom";
					input.id = input.name;
					input.value = "Apercu";
					input.type = "text";
					var label = document.createElement('label');
					label.appendChild(document.createTextNode(input.name+" : "));
					p.appendChild(label);
					p.appendChild(input);
					form.appendChild(p);
					p.style.display = "none";
					
					var p = document.createElement('p');
					p.className = "login";
					var input = document.createElement('input');
					input.name ="mdpasse";
					input.id = input.name;
					input.type = "text";
					var label = document.createElement('label');
					label.appendChild(document.createTextNode(input.name+" : "));
					p.appendChild(label);
					p.appendChild(input);
					form.appendChild(p);
					p.style.display = "none";
					
					var p = document.createElement('p');
					p.className = "login";
					var input = document.createElement('input');
					input.name ="bool_log";
					input.id = input.name;
					input.type = "text";
					var label = document.createElement('label');
					label.appendChild(document.createTextNode(input.name+" : "));
					p.appendChild(label);
					p.appendChild(input);
					form.appendChild(p);
					p.style.display = "none";
					
					var p = document.createElement('p');
					p.className = "login";
					var input = document.createElement('input');
					input.name ="modeappel";
					input.id = input.name;
					input.value = 3;
					input.type = "text";
					var label = document.createElement('label');
					label.appendChild(document.createTextNode(input.name+" : "));
					p.appendChild(label);
					p.appendChild(input);
					form.appendChild(p);
					p.style.display = "none";
					
					var p = document.createElement('p');
					p.className = "login";
					var input = document.createElement('input');
					input.name ="mode";
					input.value = 14;
					input.type = "text";
					var label = document.createElement('label');
					label.appendChild(document.createTextNode(input.name+" : "));
					p.appendChild(label);
					p.appendChild(input);
					form.appendChild(p);
					p.style.display = "none";
					
					var p = document.createElement('p');
					p.className = "login";
					var input = document.createElement('input');
					input.name ="forum";
					input.id = input.name;
					input.value = 68;
					input.type = "text";
					var label = document.createElement('label');
					label.appendChild(document.createTextNode(input.name+" : "));
					p.appendChild(label);
					p.appendChild(input);
					form.appendChild(p);
					p.style.display = "none";
					
					ListeAlternance("newnom","mdpasse","bool_log",GM_getValue("pseudo_prec",0));
					document.getElementById("liste_pseudonymes").parentNode.style.display = "none";
					
					var tr = document.createElement('tr');
					tbody.appendChild(tr);
					var td = document.createElement('td');
					var img = document.createElement('img');
					img.src = "http://www.noelshack.com/uploads/inactif009481.png";
					img.alt = "Inactif";
					img.style.cursor = "pointer";
					img.id = "jvc_signature_perso";
					img.name = "jvc_signature_perso";
					if (GM_getValue(img.name,false)) {
						img.src = "http://www.noelshack.com/uploads/actif099716.png";
						img.alt = "Actif";
						document.getElementById("liste_pseudonymes").parentNode.style.display = "";
					}
					td.appendChild(img);
					tr.appendChild(td);
					var td = document.createElement('td');
					td.appendChild(document.createTextNode(" activer les signatures personnalisÃ©es"));
					tr.appendChild(td);
					document.getElementById(img.id).addEventListener("click", ModifPC, false);
					document.getElementById(img.id).addEventListener("click", ModifSignPerso, false);
					
					var sign = "signature";
					if (GM_getValue(img.name,false)) {
						var i = document.getElementById("liste_pseudonymes").selectedIndex - 1;
						if (i>=0) {
							sign += "_"+GM_getValue("lst#"+i,"").toLowerCase();
						}
					}
					
					var textsign = GM_getValue(sign,"");
					
					var p = document.createElement('p');
					p.className = "login";
					var input = document.createElement('input');
					input.name ="yournewmessage";
					input.id = "signature_apercu"
					input.type = "text";
					var label = document.createElement('label');
					label.appendChild(document.createTextNode(input.name+" : "));
					p.appendChild(label);
					input.value = textsign;
					p.appendChild(input);
					form.appendChild(p);
					p.style.display = "none";
					
					var span = document.createElement('span');
					bloc.appendChild(document.createTextNode('Il reste '));
					span.appendChild(document.createTextNode(300-textsign.length));
					span.style.color = "#FF0000";
					span.id = "carac_rest";
					bloc.appendChild(span);
					bloc.appendChild(document.createTextNode(' caractÃ¨res.'));
					bloc.appendChild(document.createElement('br'));
					var textarea = document.createElement('textarea');
					textarea.id = "signature";
					textarea.name = sign;
					textarea.rows = 10;
					textarea.cols = 10;
					textarea.appendChild(document.createTextNode(GM_getValue("signature","")));
					textarea.value = textsign;
					bloc.appendChild(textarea);
					document.getElementById(textarea.id).addEventListener("keyup", ModifSign, false);
					document.getElementById(textarea.id).addEventListener("keypress", ModifSign, false);
					document.getElementById(textarea.id).addEventListener("keydown", ModifSign, false);
					document.getElementById(textarea.id).addEventListener("change", ModifSign, false);
					document.getElementById("liste_pseudonymes").addEventListener("change", AltSign, false);
					document.getElementById("liste_pseudonymes").addEventListener("keypress", AltSign, false);
					document.getElementById("liste_pseudonymes").addEventListener("keydown", AltSign, false);
					document.getElementById("liste_pseudonymes").addEventListener("keyup", AltSign, false);
					
//<input name="yournewmessage" type="hidden" />
					var img = document.createElement('img');
					img.src = "http://image.jeuxvideo.com/pics/forums/bt_forum_apercu.gif";
					img.id = "bouton_apercu"
					img.alt = "AperÃ§u du message";
					img.style.cursor = "pointer";
					bloc.appendChild(img);
					document.getElementById(img.id).addEventListener("click", recup, false);
					
					bloc.appendChild(document.createElement('br'));
				break;
				}
				case "date" : {
					var input = document.createElement('input');
					var gm = "jvc_fuseau_horaire";
					input.id = gm;
					input.name = gm;
					input.defaultValue = new Date().getTimezoneOffset();
					input.value = GM_getValue(gm,new Date().getTimezoneOffset());
					
					bloc.appendChild(document.createTextNode("DÃ©calage par rapport Ã  Greenwhch (en minutes : "));
					bloc.appendChild(input);
					bloc.appendChild(document.createElement('br'));
					
					document.getElementById(input.id).addEventListener("change", ModifFuseau, false);
					document.getElementById(input.id).addEventListener("keyup", ModifFuseau, false);
					document.getElementById(input.id).addEventListener("keydown", ModifFuseau, false);
					document.getElementById(input.id).addEventListener("keypress", ModifFuseau, false);
					break;
				}
				case "arme" : {
					CreateButtonPC(tbody,"jvc_arme_preselectexcl"," prÃ©selectionner les exclus dans la mire de l'arme",true);
					CreateButtonPC(tbody,"jvc_arme_lien_illicites"," prÃ©selectionner les personnes postant des liens censurÃ©s",true);
				break;
				}
			}
			bloc.appendChild(document.createElement('br'));
			bloc.appendChild(a_retour);
		break;
		}
	}
break;
}
case - 8 : {
	var img = document.getElementsByTagName('img');
	if (img.length>0) {
		img = img[0];
		var ps = pseudo.toLowerCase();
//		var groupe = GM_getValue("gp#"+ps+"#groupe",pseudo);
//		var gp = groupe.toLowerCase();
		switch (ps) {
			case "yukiiste" : img.src = "http://www.noelshack.com/uploads/yuki009780.gif"; break;
			case "eyleen" : img.src = "http://www.noelshack.com/uploads/EyleendeNaclae022658.jpg"; break;
			case "angelsofea" : img.src = "http://www.noelshack.com/uploads/Sofea044955.jpg"; break;
			case "sophia" : img.src = "http://www.noelshack.com/uploads/1a2fa3f7088798.jpg"; break;
			case "sophie" : img.src = "http://www.noelshack.com/uploads/laughingman072849.png"; break;
			case "enetya" : img.src = "http://www.noelshack.com/uploads/1a2fa3f7088798.jpg"; break;
			case "" : img.src = ""; break;
			case "" : img.src = ""; break;
			case "" : img.src = ""; break;
			case "" : img.src = ""; break;
			case "" : img.src = ""; break;
		}
		img.style.maxWidth = "800px";
		img.style.maxHeight = "600px";
	}
break;
}
case - 7 : {
	Menu(0,"");
break;
}
case - 6 : { // AccÃ¨s ModÃ©ration
	Menu(0,"");
	var form = document.getElementById('tbmoder').parentNode.parentNode.tagName;
	if (GM_getValue("jvc_modo",true)) {
		ListeAlternanceModo();
		form.addEventListener("submit", moderationmanual, false);
	}
break;
}
case - 5 : { // Changement de pseudonyme
	Menu(-1,"");
	if (document.getElementById("old_pass") != null) {
		document.getElementById("pseudo").parentNode.parentNode.parentNode.name = "pseudo_pass";
		var n = GM_getValue("pseudo_prec",0);
		//document.getElementById("pseudo").parentNode.appendChild(document.createTextNode(' pseudo '+n+'/'+GM_getValue("nb_pseudos",0)));
		ListeAlternance("pseudo","old_pass","old_pass",n);
		//document.getElementById("pseudo_pass").submit();
	}
//	if (document.getElementById("new_pass") != null) {
//		GM_setValue("pseudo_chg_psd",GM_getValue("pseudo_prec",0));
//		var newmdp = prompt("Nouveau mot de passe : ","");
//		if (newmdp != null) {
//			newmdp = newmdp.substring(0,12);
//			document.getElementById("new_pass").value = newmdp;
//			document.getElementById("new_pass_confirm").value = document.getElementById("new_pass").value;
//			GM_setValue("pseudo_chg_mdp",newmdp);
//		} else {
//			GM_setValue("pseudo_chg_mdp","");
//		}
//		document.getElementById("form").submit();
//	}
//	if (document.getElementById("cp") != null) {
//		document.getElementById("cp").value = "75000";
//		document.getElementById("ville").value = "Paris";
//	}
//	if (document.getElementById("col1").getElementsByTagName('iframe').length > 0) {
//		var mdp = GM_getValue("pseudo_chg_mdp","");
//		if (mdp != "") {
//			var i = GM_getValue("pseudo_chg_psd","");
//			var pseudo = GM_getValue("lst#"+i,"");
//			GM_setValue("lst#"+pseudo.toLowerCase(),mdp);
//			GM_setValue("pseudo_chg_psd","");
//			GM_setValue("pseudo_chg_mdp","");
//		}
//		self.location.href = "http://www.jeuxvideo.com/cgi-bin/admin/moncompte.cgi?oper=33";
//	}
break;
}
case - 4 : { // Liste smileys
	var bloc = document.getElementsByTagName("tr")[0].parentNode;
	var n = GM_getValue("nb_smileys",0);
	var k = 0;
	for (var i=0;i<n;i=i+4) {
		var tr = document.createElement('tr');
		tr.className='tr'+(k+1);
		for (var j=i;j<i+4;j++) {
			var motif = GM_getValue("sm#"+j+"#motif","");
			var image = GM_getValue("sm#"+j+"#img","");
			var td = document.createElement('td');
			var a = document.createElement('a');
			a.href = 'javascript:passCode("newmessage","'+motif.replace(/\+/gi,"")+'");';
			var img = document.createElement('img');
			img.src = image;
			a.appendChild(img);
			td.appendChild(a);
			tr.appendChild(td);
			var td = document.createElement('td');
			td.appendChild(document.createTextNode(motif));
			tr.appendChild(td);
		}
		k = 1 - k;
		bloc.appendChild(tr);
	}
break;
}
case - 3 : { // Alerte admin
//----------------------------------------------------------------------------------------------------------
//	Modifications du formulaire pour formuler une alerte admin
//----------------------------------------------------------------------------------------------------------
	document.getElementById("pseudo").parentNode.parentNode.parentNode.name = "pseudo_pass";
	ListeAlternance("pseudo","pass","pass",0);
break;
}
case - 2 : { // AperÃ§u message
	var elem = document.getElementsByTagName('ul')[0].getElementsByTagName('li');
	ProtectionLien(elem[2]);
	NewSmileys(elem[2]);
	AffichageImageVideo(elem[2]);
	ProtectionSpoiler(elem[2]);
break;
}
case - 1 : { // Profil
	var Nom = document.getElementById("pseudo");
	var CDV = document.getElementById("cartevisite0");
	var pseudo = Nom.innerHTML.replace(new RegExp("<[^>]*>","g"),"");
	
	if (GM_getValue("jvc_coloration",true)) {
		GererCouleur(Nom,pseudo);
		AjouterColoration(Nom,pseudo);
	}
	if (GM_getValue("jvc_regroupement",true)) {
		GererAssociations(Nom,pseudo);
		GererMode(Nom,pseudo);
		GererGroupe(Nom,pseudo);
		if (GM_getValue("jvc_coloration",true)) {
			GererCouleurGroupe(Nom,pseudo);
		}
		GererRenommageGroupement(Nom,pseudo);
	}
	if (GM_getValue("jvc_smileyCDV",true)) {
		SmileyInCDV();
	}
break;
}
case   0 : {
	if (GM_getValue("jvc_pseudos",true)) {
		Disconnect();
	}
	
	var position = document.getElementById("recherche_forum").getElementsByTagName('p')[0];
	Menu(mode,position);
	
	var forum = document.getElementsByName("forum")[0].value;
	var index = document.getElementsByName("index")[0].value;
//----------------------------------------------------------------------------------------------------------
//	Modifications de la liste des sujets
//----------------------------------------------------------------------------------------------------------
	var elem = document.getElementById("c1").parentNode.getElementsByTagName('th');
	var i=0;
	var icone = -1;
	var sujet = -1;
	var auteur = -1;
	var messages = -1;
	var date = -1;
	var colmod = -1;
	var moderation = false;
	for (var i = 0;i<elem.length;i++) {
		switch (elem[i].id) {
			case "c1":
				icone = i;
				break;
			case "c2":
				sujet = i;
				break;
			case "c3":
				auteur = i;
				break;
			case "c4":
				messages = i;
				break;
			case "c5":
				date = i;
				break;
			case "":
				if (elem[i].className == "col_moder") {
					moderation = true;
					colmod = i;
				}
				break;
		}
	}
	if  (moderation && GM_getValue("jvc_arme_liste",true)) {
		var th = document.createElement('th');
		th.setAttribute("scope","col");
		th.id = "p_mod";
		th.className = "Suppression de la sÃ©lection#Masquer la sÃ©lection";
		th.appendChild(document.createTextNode(" "))
		elem[0].parentNode.insertBefore(th,elem[0]);
		icone++;
		sujet++;
		auteur++;
		messages++;
		date++;
		colmod++;
		MenuArme();
	}
	if (GM_getValue("jvc_post_msg",true)) {
		var newItem = document.createElement('th');
		newItem.setAttribute("scope","col");
		newItem.id = "p1";
		newItem.appendChild(document.createTextNode(" "))
		document.getElementById("c1").parentNode.insertBefore(newItem,document.getElementById("c1").nextSibling);
	}
	var elem = document.getElementById("c1").parentNode.parentNode.getElementsByTagName('tr');
	if (GM_getValue("jvc_post_msg",true) || GM_getValue("jvc_last_msg",true) || GM_getValue("jvc_kick",true) || GM_getValue("jvc_coloration",true) || GM_getValue("jvc_regroupement",true)||GM_getValue("jvc_date",true)) {
		for (var i = 1;i<elem.length;i++) {
			var selem = elem[i].getElementsByTagName('td');
			
			if  (moderation && GM_getValue("jvc_arme_liste",true)) {
				var td = document.createElement('td');
				selem[0].parentNode.insertBefore(td,selem[0]);
				var input = document.createElement('input');
				td.appendChild(input);
				input.type = "checkbox";
				input.id = "arme_"+i;
			}
			
			var supp = 0;
			url = selem[sujet].getElementsByTagName('a')[0].href;
			
			var n = selem[messages].innerHTML;
			var sjt = selem[sujet].getElementsByTagName('a')[0].innerHTML;
			var topic = parseInt(url.replace(new RegExp("^.*"+"/","gi"),"").replace("1-"+forum+"-",""));
			elem[i].id = "topic_"+topic;
			var dossier = selem[icone].getElementsByTagName('img')[0].src;
			selem[icone].getElementsByTagName('img')[0].src = Image(dossier);
			var nb_messages = parseInt(selem[messages].innerHTML);
			var num_lp = Math.floor(1+nb_messages/20);
			var pseudo = selem[auteur].innerHTML;
			var groupe = GM_getValue("gp#"+pseudo.toLowerCase()+"#groupe",pseudo);
			selem[auteur]=PseudoListe(selem[auteur]);
			var modo = (selem[auteur].className == "pseudo topic_mod");
			var cs = (GM_getValue("jvc_kick",true) && GM_getValue("cs#"+groupe.toLowerCase(),false) && !modo);
			var exc = cs && GM_getValue("jvc_kick_total_"+groupe.toLowerCase(),false) && GM_getValue("jvc_exclusion_liste",true);
			
			if (cs) {
				var s = document.createElement('s');
				s.appendChild(selem[auteur].firstChild);
				selem[auteur].appendChild(s);
				var s = document.createElement('s');
				s.appendChild(selem[sujet].firstChild.firstChild);
				selem[sujet].firstChild.appendChild(s);
			}
			
			if (cs && !(moderation && GM_getValue("jvc_exc_mod_tit",true))) {
				var pos = selem[sujet].firstChild;
				selem[sujet].title = sjt;
				pos.innerHTML = "";
				var italique = document.createElement('i');
				pos.parentNode.appendChild(italique);
				pos.style.display = "inline";
				pos.appendChild(document.createTextNode("ici"));
				italique.appendChild(document.createTextNode("sujet censurÃ© (cliquez "));
				var fintexte = document.createTextNode(" pour y accÃ©der)");
				italique.appendChild(pos);
				italique.appendChild(fintexte);
			}
			
			if (exc) {
				elem[i].className = "tr3";
				elem[i].style.background = "#000000";
				elem[i].style.color = "#FFFFFF";
				
				if (document.getElementById('comput_kick_total')) {
					if (document.getElementById("exclusion_"+groupe)) {
						var nb = document.getElementById("exclusion_"+groupe);
						nb.innerHTML = 1 + parseInt(nb.innerHTML);
					} else {
						var tbody = document.getElementById('comput_kick_total');
						var tr = document.createElement('tr'); 
						tbody.appendChild(tr);
						var td = document.createElement('td'); 
						td.appendChild(document.createTextNode(groupe + " : "));
						tr.appendChild(td);
						var td = document.createElement('td'); 
						td.id = "exclusion_"+groupe;
						td.innerHTML = 1;
						tr.appendChild(td);
						var td = document.createElement('td'); 
						td.appendChild(document.createTextNode(' sujet(s)'));
						tr.appendChild(td);
						
						
						var td = document.createElement('td');
						tr.appendChild(td); 
						var newImg = document.createElement("img");
						td.appendChild(newImg);
						newImg.style.cursor = "pointer";
						newImg.src = "http://www.noelshack.com/uploads/green+013294.png";
						newImg.name = "Excl_" + pseudo;
						newImg.id = "Excl_" + pseudo;
						newImg.title = "Enlever l'exclusion de " + pseudo;
						newImg.alt = newImg.title;
						
						document.getElementById(newImg.id).addEventListener("click", excl, false);
					}
				} else {
					pos = document.getElementById('liste_topics').nextSibling.nextSibling.nextSibling;
					var div = document.createElement('div');
					div.className = "msg msg1";
					pos.parentNode.insertBefore(div,pos);
					var ul = document.createElement('ul');
					div.appendChild(ul);
					var li = document.createElement('li');
					ul.appendChild(li);
					li.className = "pseudo";
					var strong = document.createElement('strong');
					strong.appendChild(document.createTextNode('Pseudonymes exclus'));
					li.appendChild(strong);
					var li = document.createElement('li');
					ul.appendChild(li);
					li.className = "post";
					
					var table = document.createElement('table');
					li.appendChild(table);
					var tbody = document.createElement('tbody'); 
					table.appendChild(tbody);
					tbody.id = "comput_kick_total";
					
					var tr = document.createElement('tr'); 
					tbody.appendChild(tr);
					var td = document.createElement('td'); 
					td.appendChild(document.createTextNode(groupe + " : "));
					tr.appendChild(td);
					var td = document.createElement('td'); 
					td.id = "exclusion_"+groupe;
					td.innerHTML = 1;
					tr.appendChild(td);
					var td = document.createElement('td'); 
					td.appendChild(document.createTextNode(' sujet(s)'));
					tr.appendChild(td);
					
					
					var td = document.createElement('td');
					tr.appendChild(td); 
					var newImg = document.createElement("img");
					td.appendChild(newImg);
					newImg.style.cursor = "pointer";
					newImg.src = "http://www.noelshack.com/uploads/green+013294.png";
					newImg.name = "Excl_" + pseudo;
					newImg.id = "Excl_" + pseudo;
					newImg.title = "Enlever l'exclusion de " + pseudo;
					newImg.alt = newImg.title;
					
					document.getElementById(newImg.id).addEventListener("click", excl, false);
				}
				
				selem[auteur].appendChild(document.createTextNode(' '));
				var newImg = document.createElement("img");
				selem[auteur].appendChild(newImg);
				newImg.style.cursor = "pointer";
				newImg.src = "http://www.noelshack.com/uploads/bt_forum_bann_48h081792.gif";
				newImg.name = elem[i].id;
				newImg.id = "_pic_" + topic;
				newImg.title = "Masquer ce sujet";
				newImg.alt = newImg.title;
				newImg.style.display = "inline";
				
				document.getElementById(newImg.id).addEventListener("click", function changesujet() { document.getElementById(this.name).style.display = "none"; document.getElementById("Acces"+this.id).style.display = ""; }, false);
				
				tr = document.getElementById("exclusion_"+groupe).parentNode;
				var td = document.createElement("td");
				tr.appendChild(td); 
				var newImg = document.createElement("img");
				td.appendChild(newImg);
				newImg.style.cursor = "pointer";
				newImg.src = "http://www.noelshack.com/uploads/bt_forum_profil083847.gif";
				newImg.name = elem[i].id;
				newImg.id = "Acces_pic_" + topic;
				newImg.title = "Montrer le sujet : Â« " + sjt + " Â» "+n+" message(s)";
				newImg.alt = newImg.title;
					
				document.getElementById(newImg.id).addEventListener("click", function changesujet() { document.getElementById(this.name).style.display = ""; this.style.display = "none"; }, false);
				
				if (moderation && GM_getValue("jvc_exc_mod_aff",true)) {
					newImg.style.display = "none";
				} else {
					elem[i].style.display = "none";
				}
				
			}
			
			if (GM_getValue("jvc_last_msg",true) && (!cs || GM_getValue("jvc_cs_last_msg",true))) {
				var LastPage = document.createElement('td');
				var LastPageLink = document.createElement('a');
				LastPageLink.href="http://www.jeuxvideo.com/forums/1-"+forum+"-"+topic+"-"+num_lp+"-0-1-0-0.htm";
				LastPageLink.innerHTML = selem[icone].innerHTML;
				LastPage.appendChild(LastPageLink);
				elem[i].replaceChild(LastPage,selem[icone]);
			}
			
			if (GM_getValue("jvc_post_msg",true)) {
				var Answer = document.createElement('td');
				if (!cs || GM_getValue("jvc_cs_form",true)) {
					var AnswerLink = document.createElement('a');
					AnswerLink.href="http://www.jeuxvideo.com/forums/3-"+forum+"-"+topic+"-"+num_lp+"-0-1-0-0.htm#form_post";
					AnswerLink.style.textAlign = "center";
					var AnswerIcone = document.createElement('img');
					var sheet = Image("http://www.noelshack.com/uploads/rep057497.gif");
					if ((dossier == Image("http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif")) || (dossier == Image("http://image.jeuxvideo.com/pics/forums/topic_marque_off.gif"))) {
						sheet = Image("http://www.noelshack.com/uploads/rep_off020374.png");
					}
					
					AnswerIcone.src=Image(sheet);
					AnswerLink.appendChild(AnswerIcone);
					Answer.appendChild(AnswerLink);
				}
				elem[i].insertBefore(Answer,elem[i].firstChild.nextSibling.nextSibling.nextSibling);
				supp = 1;
			}
			
			if (GM_getValue("jvc_date",true)) {
				var dif = GM_getValue("jvc_fuseau_horaire",new Date().getTimezoneOffset());
				ChangeDateListe(selem[date+supp],dif);
			}
		
			if  (moderation && GM_getValue("jvc_arme_liste",true)) {
				var lien_suppr = selem[colmod+supp].getElementsByTagName('a')[0];
				var arme = document.getElementById("arme_"+i);
				
				var input = document.createElement('input');
				arme.parentNode.insertBefore(input,arme);
				input.id = arme.id+"_"+0;
				input.type = "hidden";
				if (lien_suppr) {
					input.value = lien_suppr.href;
				} else {
					input.value = "";
				}
				
				var input = document.createElement('input');
				arme.parentNode.insertBefore(input,arme);
				input.id = arme.id+"_"+1;
				input.type = "hidden";
				if (exc) {
					input.value = "_pic_" + topic;
					if (GM_getValue("jvc_arme_preselectexcl",true)) {
						arme.checked = "checked";
					}
				} else {
					input.value = "";
				}
			}
		}
	}
//----------------------------------------------------------------------------------------------------------
//	Modifications du formulaire pour poster un nouveau sujet
//----------------------------------------------------------------------------------------------------------
	Formulaire();
break;
}
case   1 : {
	if (GM_getValue("jvc_pseudos",true)) {
		Disconnect();
	}
	
	var interact = document.getElementById("col1").getElementsByTagName('td');
	var j=0;
	while (j<interact.length && interact[j].className!="revenir") {
		j++;
	}
	Menu(mode,interact[j]);
	MiseEnValeur();
	
	if (GM_getValue("jvc_first_page",true)) {
		var tab = document.getElementsByTagName('table');
		for (var i=0; i<tab.length; i++) {
			if (tab[i].className == "boutons_sujet") {
				var selem=tab[i].getElementsByTagName('a');
				for (var j = 0 ;j<selem.length; j++) {
					selem[j].href = selem[j].href.replace("forums/26-","forums/0-");
				}
			}
		}
	}
	
	var elem = document.getElementById("col1").getElementsByTagName('ul');
	for (var i=0;i<elem.length;i++) {
		TraitementMessage(elem[i],i,param);
	}
	
	var moderation = ( document.getElementById("Supression_"+elem[0].parentNode.id) != null );
	
	if  (moderation && GM_getValue("jvc_arme_liste",true)) {
		var th = document.createElement('th');
		th.id = "p_mod";
		th.className = "##Suppression de la sÃ©lection#Masquer la sÃ©lection";
		th.style.display = "none";
		document.getElementById("col1").appendChild(th);
		MenuArme();
	}
	
	
break;
}
case   3 : {
	if (GM_getValue("jvc_pseudos",true)) {
		Disconnect();
	}
	
	Menu(mode,"");
	
	if (GM_getValue("jvc_first_page",true)) {
		var tab = document.getElementsByTagName('table');
		for (var i=0; i<tab.length; i++) {
			if (tab[i].className == "boutons_sujet") {
				var selem=tab[i].getElementsByTagName('a');
				for (var j = 0 ;j<selem.length; j++) {
					selem[j].href = selem[j].href.replace("forums/26-","forums/0-");
				}
			}
		}
	}
	
	var elem = document.getElementById("col1").getElementsByTagName('ul');
	for (var i=0;i<elem.length;i++) {
		TraitementMessage(elem[i],i,param);
	}
	
//----------------------------------------------------------------------------------------------------------
//	Modifications du formulaire pour poster un nouveau message
//----------------------------------------------------------------------------------------------------------
	Formulaire();
	
break;
}
}






function Initialisation() {
	alert("Initialisation en cours");
	"Pseudonymes"; {
		GM_setValue("nb_pseudos",0);
		InitPseudos();
	}
	"Regroupements"; {
		var n = GM_getValue("gp#prc_nombre",0);
		for (var i=0;i<n;i++) {
			delgroupement(GM_getValue("gp#prc_"+i,""));
		}
		var groupe;
		var color;
		var mode = -1;
		groupe = "Soph'"; color = "#9005c4"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Sofea","",groupe,mode);
			listeadd("Sophea","",groupe,mode);
			listeadd("Sophie","",groupe,mode);
			listeadd("AngelSofea","",groupe,mode);
			listeadd("Angel_Sofea","",groupe,mode);
			listeadd("ArchangelSofea","",groupe,mode);
			listeadd("DivineSofea","",groupe,mode);
			listeadd("DemonicSofea","",groupe,mode);
			listeadd("EvilSofea","",groupe,mode);
			listeadd("Princesse_Sofea","",groupe,mode);
			listeadd("DeathSofea ","",groupe,mode);
			listeadd("Sofea_Balboa","",groupe,mode);
			listeadd("Sogea","",groupe,mode);
			listeadd("Sofeastiti","",groupe,mode);
			listeadd("Piloufea","",groupe,mode);
			listeadd("-Sofea","",groupe,mode);
			listeadd("Idunn","",groupe,mode);
			listeadd("Thurd","",groupe,mode);
			listeadd("Yukiiste","",groupe,mode);
		}
		groupe = "Kyon-kun"; color = "#43C6DB"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Antic","",groupe,mode);
			listeadd("Calm","",groupe,mode);
			listeadd("Coca-cola","",groupe,mode);
			listeadd("Fantominus","",groupe,mode);
			listeadd("Final","",groupe,mode);
			listeadd("Goldsaucer","",groupe,mode);
			listeadd("Hana","",groupe,mode);
			listeadd("Kyon","",groupe,mode);
			listeadd("LawIiet","",groupe,mode);
			listeadd("Melodie","",groupe,mode);
			listeadd("Remilia","",groupe,mode);
			listeadd("Rika","",groupe,mode);
			listeadd("Sister","",groupe,mode);
			listeadd("Velamyu","",groupe,mode);
			listeadd("Winter","",groupe,mode);
			listeadd("Zande","",groupe,mode);
		}
		groupe = "Val"; color = "#408080"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("A-M-G-E","",groupe,mode);
			listeadd("Abr-Aramis","",groupe,mode);
			listeadd("Abrasio","",groupe,mode);
			listeadd("Abrasiogirlboy","",groupe,mode);
			listeadd("Ange-Gabriel","",groupe,mode);
			listeadd("Aramitz","",groupe,mode);
			listeadd("BaronKeld","",groupe,mode);
			listeadd("Belemnoch","",groupe,mode);
			listeadd("Boniwem","",groupe,mode);
			listeadd("CalrissianLando","",groupe,mode);
			listeadd("CoreyHawk","",groupe,mode);
			listeadd("cpt_Keld","",groupe,mode);
			listeadd("Curiace","",groupe,mode);
			listeadd("Diego_of_chaos","",groupe,mode);
			listeadd("Dr_McCoy","",groupe,mode);
			listeadd("Elnett","",groupe,mode);
			listeadd("Emile-Zola","",groupe,mode);
			listeadd("Foi","",groupe,mode);
			listeadd("framboisio","",groupe,mode);
			listeadd("Georges_Weasley","",groupe,mode);
			listeadd("Gorax_Lachope","",groupe,mode);
			listeadd("HSPS","",groupe,mode);
			listeadd("jackripper","",groupe,mode);
			listeadd("Japhet","",groupe,mode);
			listeadd("JesusMejavalpa","",groupe,mode);
			listeadd("Kalabra","",groupe,mode);
			listeadd("LapinBleu","",groupe,mode);
			listeadd("Le-Petit-Prince","",groupe,mode);
			listeadd("Maitre_Val","",groupe,mode);
			listeadd("MisterFrite","",groupe,mode);
			listeadd("Pahtt","",groupe,mode);
			listeadd("Perce-Val","",groupe,mode);
			listeadd("PerversPepere","",groupe,mode);
			listeadd("Petrone","",groupe,mode);
			listeadd("Prince-charmant","",groupe,mode);
			listeadd("princecharmant","",groupe,mode);
			listeadd("Raphaelo","",groupe,mode);
			listeadd("Schtroumfalunet","",groupe,mode);
			listeadd("Snif-Snif","",groupe,mode);
			listeadd("SUPERPAPA","",groupe,mode);
			listeadd("The_Joker","",groupe,mode);
			listeadd("Tikh","",groupe,mode);
			listeadd("Treville","",groupe,mode);
			listeadd("Vallion","",groupe,mode);
			listeadd("Visquare","",groupe,mode);
			listeadd("xenaphile","",groupe,mode);
			listeadd("Zakath","",groupe,mode);
			listeadd("[Clan]","",groupe,mode);
			listeadd("[Echo]","",groupe,mode);
			listeadd("_Clan_","",groupe,mode);
		}
		groupe = "Niko"; color = "#FF8040"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("w4rNiko","",groupe,mode);
			listeadd("Across","",groupe,mode);
		}
		groupe = "Sardine"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Sardine","",groupe,mode);
			listeadd("Suou","",groupe,mode);
		}
		groupe = "Suum"; color = "#59E817"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-nic_","",groupe,mode);
			listeadd("30061991","",groupe,mode);
			listeadd("33419","",groupe,mode);
			listeadd("47Degre","",groupe,mode);
			listeadd("47DegreCelsius","",groupe,mode);
			listeadd("9Fevrier2008","",groupe,mode);
			listeadd("Allergeek","",groupe,mode);
			listeadd("AmantDeCisla","",groupe,mode);
			listeadd("AmantDeCurcolio","",groupe,mode);
			listeadd("AmantDeDay","",groupe,mode);
			listeadd("AmantDeGoldy","",groupe,mode);
			listeadd("AmantDeSergei","",groupe,mode);
			listeadd("Attache_Moi","",groupe,mode);
			listeadd("BeauCouple","",groupe,mode);
			listeadd("callofcisla","",groupe,mode);
			listeadd("camousse","",groupe,mode);
			listeadd("ChapeauLartiste","",groupe,mode);
			listeadd("ChasseGibier","",groupe,mode);
			listeadd("CislaEnForce","",groupe,mode);
			listeadd("CislaJeTeTrompe","",groupe,mode);
			listeadd("Cogeeker","",groupe,mode);
			listeadd("Contrairement","",groupe,mode);
			listeadd("Curcaulabo","",groupe,mode);
			listeadd("Curcokick","",groupe,mode);
			listeadd("Curcolock","",groupe,mode);
			listeadd("DieuCisla","",groupe,mode);
			listeadd("DieuxHap","",groupe,mode);
			listeadd("FarFarAway","",groupe,mode);
			listeadd("Forgive","",groupe,mode);
			listeadd("GoodbyeMyLove","",groupe,mode);
			listeadd("Honour","",groupe,mode);
			listeadd("Horizontal","",groupe,mode);
			listeadd("Industrie47","",groupe,mode);
			listeadd("JayJayAno","",groupe,mode);
			listeadd("Jongliste","",groupe,mode);
			listeadd("KickMe-ImFamous","",groupe,mode);
			listeadd("KickMoiCisla","",groupe,mode);
			listeadd("LaGardeDeCisla","",groupe,mode);
			listeadd("LifterBide","",groupe,mode);
			listeadd("MaitresseAcisla","",groupe,mode);
			listeadd("MammyGirl","",groupe,mode);
			listeadd("Marine47","",groupe,mode);
			listeadd("MateriaBlanche","",groupe,mode);
			listeadd("MateriaNoire","",groupe,mode);
			listeadd("Matrimoday","",groupe,mode);
			listeadd("Nagla553","",groupe,mode);
			listeadd("NoRecognition","",groupe,mode);
			listeadd("OhOui_Prend_Moi","",groupe,mode);
			listeadd("PermaBide","",groupe,mode);
			listeadd("Pestacle","",groupe,mode);
			listeadd("PicDuSiecle","",groupe,mode);
			listeadd("PotionX","",groupe,mode);
			listeadd("Pseudalounette","",groupe,mode);
			listeadd("Pseudeauh","",groupe,mode);
			listeadd("Pseudeauh47","",groupe,mode);
			listeadd("Sabrina44","",groupe,mode);
			listeadd("SalutAToiLePSG","",groupe,mode);
			listeadd("SalutMonChou","",groupe,mode);
			listeadd("SoratnaReturn","",groupe,mode);
			listeadd("Sous-masse","",groupe,mode);
			listeadd("Sousmasse","",groupe,mode);
			listeadd("Sous_masse","",groupe,mode);
			listeadd("Sowra","",groupe,mode);
			listeadd("SquattonsLePic","",groupe,mode);
			listeadd("StrangeHadron","",groupe,mode);
			listeadd("Sum","",groupe,mode);
			listeadd("summas","",groupe,mode);
			listeadd("Suum47","",groupe,mode);
			listeadd("suumas","",groupe,mode);
			listeadd("Suumas-69th","",groupe,mode);
			listeadd("suumas47","",groupe,mode);
			listeadd("Suumas69th","",groupe,mode);
			listeadd("Suumas_69th","",groupe,mode);
			listeadd("Suumy47","",groupe,mode);
			listeadd("teddy-bagwell","",groupe,mode);
			listeadd("TeddyBagwell","",groupe,mode);
			listeadd("teddy_bagwell","",groupe,mode);
			listeadd("TigerTigrou","",groupe,mode);
			listeadd("Tony_dinozzo","",groupe,mode);
			listeadd("ZeKarcher","",groupe,mode);
			listeadd("ZePhYrReTUrN","",groupe,mode);
			listeadd("[Lordhap]","",groupe,mode);
			listeadd("[suumas128]","",groupe,mode);
		}
		groupe = "Tiger"; color = "#347235"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("SoulDarkSide","",groupe,mode);
			listeadd("Contractant","",groupe,mode);
			listeadd("Tiger6","",groupe,mode);
			listeadd("NuclearSorrow","",groupe,mode);
			listeadd("Cis[a","",groupe,mode);
			listeadd("Delphine ( noel:)","",groupe,mode);
			listeadd("HeavenDarkSide","",groupe,mode);
			listeadd("HeartDarkSide","",groupe,mode);
			listeadd("SpiritDarkSide","",groupe,mode);
			listeadd("Tlger","",groupe,mode);
			listeadd("rafaIe","",groupe,mode);
			listeadd("[NuclearSorrow]","",groupe,mode);
			listeadd("PulsionX","",groupe,mode);
		}
		groupe = "Jak"; color = "#7F462C"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("FoxCloud","",groupe,mode);
			listeadd("Epaule","",groupe,mode);
			listeadd("[Jak9]","",groupe,mode);
			listeadd("Adibal","",groupe,mode);
			listeadd("VinceIM","",groupe,mode);
			listeadd("MisterCarter","",groupe,mode);
			listeadd("Makopilote","",groupe,mode);
			listeadd("Keishin","",groupe,mode);
			listeadd("ConPuteHeure","",groupe,mode);
			listeadd("Lobe","",groupe,mode);
			listeadd("Taoueret","",groupe,mode);
			listeadd("Nekhbet","",groupe,mode);
			listeadd("Bresil2014","",groupe,mode);
		}
		groupe = "PaicCitron"; color = "#000066"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-PaicCitron-","",groupe,mode);
			listeadd("97","",groupe,mode);
			listeadd("10x","",groupe,mode);
			listeadd("172","",groupe,mode);
			listeadd("2prude2share","",groupe,mode);
			listeadd("39608","",groupe,mode);
			listeadd("Acutangle","",groupe,mode);
			listeadd("Adequation","",groupe,mode);
			listeadd("advancemaster","",groupe,mode);
			listeadd("Affixe","",groupe,mode);
			listeadd("Aldershot","",groupe,mode);
			listeadd("Amers","",groupe,mode);
			listeadd("APPO","",groupe,mode);
			listeadd("aqwzsxedc0123","",groupe,mode);
			listeadd("bartdackstone","",groupe,mode);
			listeadd("Cartes","",groupe,mode);
			listeadd("ChaiseDeBureau","",groupe,mode);
			listeadd("Chinchaouatte","",groupe,mode);
			listeadd("Cristaly","",groupe,mode);
			listeadd("Cyclotron","",groupe,mode);
			listeadd("Dechargement","",groupe,mode);
			listeadd("DEPARDEAD","",groupe,mode);
			listeadd("des_sevant","",groupe,mode);
			listeadd("Diagana","",groupe,mode);
			listeadd("Dix-HuitLa","",groupe,mode);
			listeadd("DoopDoop","",groupe,mode);
			listeadd("Dunkannout","",groupe,mode);
			listeadd("Dzodic","",groupe,mode);
			listeadd("Estomaquant","",groupe,mode);
			listeadd("EzequielMunoz","",groupe,mode);
			listeadd("Famagouste","",groupe,mode);
			listeadd("FeIlation","",groupe,mode);
			listeadd("fifa_____09","",groupe,mode);
			listeadd("Galekid01","",groupe,mode);
			listeadd("Gamins","",groupe,mode);
			listeadd("Gebreselassie","",groupe,mode);
			listeadd("GianniRivera","",groupe,mode);
			listeadd("GiovanniRivera","",groupe,mode);
			listeadd("Guti","",groupe,mode);
			listeadd("HakeemTheDream","",groupe,mode);
			listeadd("Hamond","",groupe,mode);
			listeadd("Helveg","",groupe,mode);
			listeadd("Hyperactive","",groupe,mode);
			listeadd("IbrahimBA","",groupe,mode);
			listeadd("Improductif","",groupe,mode);
			listeadd("Incontestable","",groupe,mode);
			listeadd("iPaic","",groupe,mode);
			listeadd("iRaclure","",groupe,mode);
			listeadd("Jack_4","",groupe,mode);
			listeadd("Jamming","",groupe,mode);
			listeadd("LastQuestion","",groupe,mode);
			listeadd("LehmanBrothers","",groupe,mode);
			listeadd("li1","",groupe,mode);
			listeadd("LioneI_Messi","",groupe,mode);
			listeadd("Love_Dromadaire","",groupe,mode);
			listeadd("Mahmoud","",groupe,mode);
			listeadd("MakoRomain","",groupe,mode);
			listeadd("Man_Machine","",groupe,mode);
			listeadd("Merchandising","",groupe,mode);
			listeadd("mgco","",groupe,mode);
			listeadd("Neutralisation","",groupe,mode);
			listeadd("Neverless","",groupe,mode);
			listeadd("NewGame","",groupe,mode);
			listeadd("Ouadah","",groupe,mode);
			listeadd("PaicBide","",groupe,mode);
			listeadd("PaicCitron","",groupe,mode);
			listeadd("PaicCitron_","",groupe,mode);
			listeadd("PaicLeBleu","",groupe,mode);
			listeadd("PaicLeBon","",groupe,mode);
			listeadd("PaicLeBougre","",groupe,mode);
			listeadd("PaicLeFort","",groupe,mode);
			listeadd("PaicLeGrand","",groupe,mode);
			listeadd("PaicLeJuste","",groupe,mode);
			listeadd("PaicLeMagnanime","",groupe,mode);
			listeadd("PaicLeRouge","",groupe,mode);
			listeadd("PaicSupreme","",groupe,mode);
			listeadd("PaicTaureau","",groupe,mode);
			listeadd("PaicU","",groupe,mode);
			listeadd("Paolo_MaIdini","",groupe,mode);
			listeadd("PapaPaic","",groupe,mode);
			listeadd("Pauvre_Phoque","",groupe,mode);
			listeadd("PheIps","",groupe,mode);
			listeadd("PizzaPlanete","",groupe,mode);
			listeadd("PlaneteSelphie","",groupe,mode);
			listeadd("PlayBoyMil","",groupe,mode);
			listeadd("Pooster","",groupe,mode);
			listeadd("Quelconque","",groupe,mode);
			listeadd("Qui-veut-du-bid","",groupe,mode);
			listeadd("Rivera","",groupe,mode);
			listeadd("Route","",groupe,mode);
			listeadd("RoyalBacon","",groupe,mode);
			listeadd("RunDMC","",groupe,mode);
			listeadd("Safrania","",groupe,mode);
			listeadd("Sample","",groupe,mode);
			listeadd("Santacroce","",groupe,mode);
			listeadd("Seramabi","",groupe,mode);
			listeadd("Serginho","",groupe,mode);
			listeadd("Sex_A_Pile","",groupe,mode);
			listeadd("ShockObodor","",groupe,mode);
			listeadd("Soder","",groupe,mode);
			listeadd("Soljenitsyne","",groupe,mode);
			listeadd("Stefamooon","",groupe,mode);
			listeadd("SuperDuck","",groupe,mode);
			listeadd("SuperMammouth","",groupe,mode);
			listeadd("SuperPAIC","",groupe,mode);
			listeadd("SuperPaicCitron","",groupe,mode);
			listeadd("SuperPapaPaic","",groupe,mode);
			listeadd("SuperPasteque","",groupe,mode);
			listeadd("SuperTooth","",groupe,mode);
			listeadd("Super[PAIC]","",groupe,mode);
			listeadd("Super_Cigogne","",groupe,mode);
			listeadd("Super_Georgette","",groupe,mode);
			listeadd("Sweded","",groupe,mode);
			listeadd("Toop","",groupe,mode);
			listeadd("TotemSaignant","",groupe,mode);
			listeadd("TroisLa","",groupe,mode);
			listeadd("Troupakalouette","",groupe,mode);
			listeadd("Urbanisme","",groupe,mode);
			listeadd("Visiblement","",groupe,mode);
			listeadd("WaveRider","",groupe,mode);
			listeadd("Wazaaaaaaaaaaa","",groupe,mode);
			listeadd("Wikipediatre","",groupe,mode);
			listeadd("YazzLeGay","",groupe,mode);
			listeadd("[-_-]_____[-_-]","",groupe,mode);
			listeadd("[Kiki]","",groupe,mode);
			listeadd("[O][][][][][O]","",groupe,mode);
			listeadd("[PaicCitron]","",groupe,mode);
			listeadd("[Zephyr]Qeov","",groupe,mode);
			listeadd("[]lllllllllll[]","",groupe,mode);
			listeadd("[]l[]l[]l[]l[]","",groupe,mode);
			listeadd("[]ooo[DG]ooo[]","",groupe,mode);
			listeadd("[]Sefyu[]","",groupe,mode);
			listeadd("[]_","",groupe,mode);
			listeadd("_-][-_","",groupe,mode);
		}
		groupe = "Gogote"; color = "#463E41"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-maldini","",groupe,mode);
			listeadd("-_-Gogoteman","",groupe,mode);
			listeadd("-_Gogoteman_-","",groupe,mode);
			listeadd("100_pseudo","",groupe,mode);
			listeadd("Aigle","",groupe,mode);
			listeadd("AlbertCamus","",groupe,mode);
			listeadd("AlbertEinstein","",groupe,mode);
			listeadd("Allen_Iverson","",groupe,mode);
			listeadd("AmaneMisa","",groupe,mode);
			listeadd("Anti-Moustique","",groupe,mode);
			listeadd("Anus_de_Phoque","",groupe,mode);
			listeadd("Arme_Banni_One","",groupe,mode);
			listeadd("Arme_Gogoteman","",groupe,mode);
			listeadd("Arme_Noobi_One","",groupe,mode);
			listeadd("Arme_rubis_five","",groupe,mode);
			listeadd("Arme_Sexy_One","",groupe,mode);
			listeadd("Asse-potter","",groupe,mode);
			listeadd("Badaboum","",groupe,mode);
			listeadd("Barguette_lu","",groupe,mode);
			listeadd("batmaklin","",groupe,mode);
			listeadd("bellatrix","",groupe,mode);
			listeadd("Bosexnou","",groupe,mode);
			listeadd("Bossinou_BOULIX","",groupe,mode);
			listeadd("Bossinou_le_gay","",groupe,mode);
			listeadd("Brique-a-frites","",groupe,mode);
			listeadd("CanonRock","",groupe,mode);
			listeadd("Caramell_Dansen","",groupe,mode);
			listeadd("Carcassonne","",groupe,mode);
			listeadd("Carmen_Electra","",groupe,mode);
			listeadd("Carnage_Spatial","",groupe,mode);
			listeadd("Ch0c0b0d0r","",groupe,mode);
			listeadd("Chat-degomme","",groupe,mode);
			listeadd("Chausse-Pied","",groupe,mode);
			listeadd("Chypre","",groupe,mode);
			listeadd("Cm-Commando[10]","",groupe,mode);
			listeadd("commando[10]","",groupe,mode);
			listeadd("Commando[12]","",groupe,mode);
			listeadd("Commando[14]","",groupe,mode);
			listeadd("Commando[27]","",groupe,mode);
			listeadd("commando[33]","",groupe,mode);
			listeadd("Coralex","",groupe,mode);
			listeadd("Corrige","",groupe,mode);
			listeadd("Cratere","",groupe,mode);
			listeadd("Creme_Chantilly","",groupe,mode);
			listeadd("Crouch_Peter","",groupe,mode);
			listeadd("c_a_r_t_m_a_n","",groupe,mode);
			listeadd("Dai-Gurenn","",groupe,mode);
			listeadd("Destroyer01","",groupe,mode);
			listeadd("Dieu_Est_Mort","",groupe,mode);
			listeadd("Dieu_Le_Christ","",groupe,mode);
			listeadd("Djokovic","",groupe,mode);
			listeadd("DunkSmash","",groupe,mode);
			listeadd("Einstein-Puce","",groupe,mode);
			listeadd("Elra_Masse","",groupe,mode);
			listeadd("Eric-Uguu","",groupe,mode);
			listeadd("Fan_De_Puce","",groupe,mode);
			listeadd("Fesse-Gauche","",groupe,mode);
			listeadd("Fight_The_Power","",groupe,mode);
			listeadd("Fils_de_Joju","",groupe,mode);
			listeadd("Foune_en_feu","",groupe,mode);
			listeadd("France3-1Italie","",groupe,mode);
			listeadd("frustration","",groupe,mode);
			listeadd("G0g0teman","",groupe,mode);
			listeadd("Gennosuke","",groupe,mode);
			listeadd("GetsugaTenshou","",groupe,mode);
			listeadd("GiovanniPanzani","",groupe,mode);
			listeadd("Girondins","",groupe,mode);
			listeadd("Gog-le-touriste","",groupe,mode);
			listeadd("goggippel","",groupe,mode);
			listeadd("gogo-le-boss","",groupe,mode);
			listeadd("Gogo-zombie","",groupe,mode);
			listeadd("Gogot","",groupe,mode);
			listeadd("Gogota","",groupe,mode);
			listeadd("Gogoteban","",groupe,mode);
			listeadd("Gogotebann","",groupe,mode);
			listeadd("Gogotekick","",groupe,mode);
			listeadd("gogoteman","",groupe,mode);
			listeadd("gogoteman24","",groupe,mode);
			listeadd("Gogothe","",groupe,mode);
			listeadd("Gogo_bave","",groupe,mode);
			listeadd("Gogo_Luvs_SELLA","",groupe,mode);
			listeadd("gOldmastercard","",groupe,mode);
			listeadd("Greg_Potter","",groupe,mode);
			listeadd("Harrylepotter","",groupe,mode);
			listeadd("Hellgod3","",groupe,mode);
			listeadd("Hermione14","",groupe,mode);
			listeadd("Hyprocrite","",groupe,mode);
			listeadd("Iazzuli","",groupe,mode);
			listeadd("Ichinose","",groupe,mode);
			listeadd("IneedAlife","",groupe,mode);
			listeadd("Italienix","",groupe,mode);
			listeadd("Italienix_ragix","",groupe,mode);
			listeadd("Jaime_Elisa","",groupe,mode);
			listeadd("JayJay","",groupe,mode);
			listeadd("JeanAlesi","",groupe,mode);
			listeadd("Jean_Kulassek","",groupe,mode);
			listeadd("jesuisdaccord","",groupe,mode);
			listeadd("Je_suis_nolife","",groupe,mode);
			listeadd("Jojuninhor","",groupe,mode);
			listeadd("Joju_est_GAY","",groupe,mode);
			listeadd("Jujo","",groupe,mode);
			listeadd("Julien75","",groupe,mode);
			listeadd("JuVe23","",groupe,mode);
			listeadd("Kaminaville","",groupe,mode);
			listeadd("Kobe_Le_FDP","",groupe,mode);
			listeadd("Konamix","",groupe,mode);
			listeadd("k_e_n_n_y","",groupe,mode);
			listeadd("k_y_l_e","",groupe,mode);
			listeadd("La-[Crevete]","",groupe,mode);
			listeadd("Le-RiZ_Cola","",groupe,mode);
			listeadd("leboufeurdenin","",groupe,mode);
			listeadd("Levana","",groupe,mode);
			listeadd("le_boulet[1]","",groupe,mode);
			listeadd("Lincoln_Burrows","",groupe,mode);
			listeadd("LoveElisa","",groupe,mode);
			listeadd("LoveNi","",groupe,mode);
			listeadd("Lucie20","",groupe,mode);
			listeadd("lversono2","",groupe,mode);
			listeadd("Lyon_Premier_5f","",groupe,mode);
			listeadd("Mange_Ma_Bite","",groupe,mode);
			listeadd("Marika","",groupe,mode);
			listeadd("Marine","",groupe,mode);
			listeadd("MarlyGomont","",groupe,mode);
			listeadd("Mattrach","",groupe,mode);
			listeadd("Menthe_Citron","",groupe,mode);
			listeadd("Militant-50","",groupe,mode);
			listeadd("Militant-51","",groupe,mode);
			listeadd("Minagi","",groupe,mode);
			listeadd("Miria_Harvent","",groupe,mode);
			listeadd("Monarche","",groupe,mode);
			listeadd("mozzarella","",groupe,mode);
			listeadd("Mr_Garisson","",groupe,mode);
			listeadd("Mucoviscidose","",groupe,mode);
			listeadd("mycool_d","",groupe,mode);
			listeadd("Nayru-Cham","",groupe,mode);
			listeadd("Nichino","",groupe,mode);
			listeadd("Nique_les_ovnis","",groupe,mode);
			listeadd("Nishino","",groupe,mode);
			listeadd("NobuoUematsu","",groupe,mode);
			listeadd("Nolifeman","",groupe,mode);
			listeadd("OmaklinO","",groupe,mode);
			listeadd("Omega","",groupe,mode);
			listeadd("Osef_de_toi","",groupe,mode);
			listeadd("Park","",groupe,mode);
			listeadd("Pattetriple","",groupe,mode);
			listeadd("Pends-toi","",groupe,mode);
			listeadd("Peter_Crouch","",groupe,mode);
			listeadd("PIatti","",groupe,mode);
			listeadd("Picasso","",groupe,mode);
			listeadd("Position-69","",groupe,mode);
			listeadd("problemedesexe","",groupe,mode);
			listeadd("Psychanalyse","",groupe,mode);
			listeadd("Puce-Einstein","",groupe,mode);
			listeadd("Puceeeeeeeeeeee","",groupe,mode);
			listeadd("PuceTule","",groupe,mode);
			listeadd("Puce_Is_A_God","",groupe,mode);
			listeadd("Puce_le_bogoss","",groupe,mode);
			listeadd("puree_Mousline","",groupe,mode);
			listeadd("R2D2","",groupe,mode);
			listeadd("RadioOrion","",groupe,mode);
			listeadd("Ragequit","",groupe,mode);
			listeadd("Rihana","",groupe,mode);
			listeadd("Rlvaol","",groupe,mode);
			listeadd("Romantisme","",groupe,mode);
			listeadd("RyomaEchizen","",groupe,mode);
			listeadd("sac_A_main","",groupe,mode);
			listeadd("Saint_Etienne","",groupe,mode);
			listeadd("Sandman","",groupe,mode);
			listeadd("Sarkosynumber1","",groupe,mode);
			listeadd("Sarko_Le_Boss","",groupe,mode);
			listeadd("Saykse","",groupe,mode);
			listeadd("ScofieldMichael","",groupe,mode);
			listeadd("Seiba","",groupe,mode);
			listeadd("Sella_vie_gogo","",groupe,mode);
			listeadd("Smiley_bave","",groupe,mode);
			listeadd("Sniperman","",groupe,mode);
			listeadd("Sodoculer","",groupe,mode);
			listeadd("Solitudine","",groupe,mode);
			listeadd("Spears_Britney","",groupe,mode);
			listeadd("Squall31","",groupe,mode);
			listeadd("Subaru2","",groupe,mode);
			listeadd("Superman","",groupe,mode);
			listeadd("SuzukaAsahina","",groupe,mode);
			listeadd("Syriusvan","",groupe,mode);
			listeadd("Taper_Maxime","",groupe,mode);
			listeadd("Taypay","",groupe,mode);
			listeadd("Theo2","",groupe,mode);
			listeadd("thomas76","",groupe,mode);
			listeadd("Tidus9","",groupe,mode);
			listeadd("Tidus94","",groupe,mode);
			listeadd("Toad11","",groupe,mode);
			listeadd("Toxicity","",groupe,mode);
			listeadd("Trunks_Ultime","",groupe,mode);
			listeadd("VeronicaDonovan","",groupe,mode);
			listeadd("Victoria_Beckam","",groupe,mode);
			listeadd("Vive_le_Boost","",groupe,mode);
			listeadd("Votez_Sarko","",groupe,mode);
			listeadd("WentworthMiller","",groupe,mode);
			listeadd("Xaphalys","",groupe,mode);
			listeadd("Yagami-Raito","",groupe,mode);
			listeadd("yanea","",groupe,mode);
			listeadd("Yiruma","",groupe,mode);
			listeadd("yuna01","",groupe,mode);
			listeadd("Yunas","",groupe,mode);
			listeadd("Yuna_Power","",groupe,mode);
			listeadd("yuna___","",groupe,mode);
			listeadd("[-Gogoteman-]","",groupe,mode);
			listeadd("[adjudant-fou]","",groupe,mode);
			listeadd("[Adjudant-Gogo]","",groupe,mode);
			listeadd("[Boss]Hugo","",groupe,mode);
			listeadd("[caporal-fou]","",groupe,mode);
			listeadd("[cardinal-fou]","",groupe,mode);
			listeadd("[Cardinal-Gogo]","",groupe,mode);
			listeadd("[Cho_Hakkai]","",groupe,mode);
			listeadd("[commando02]","",groupe,mode);
			listeadd("[Commando12]","",groupe,mode);
			listeadd("[Commando24]","",groupe,mode);
			listeadd("[Commando27]","",groupe,mode);
			listeadd("[Genjo_Sanzo]","",groupe,mode);
			listeadd("[Gogoteman]","",groupe,mode);
			listeadd("[Jecht]","",groupe,mode);
			listeadd("[Monsieur-Bide]","",groupe,mode);
			listeadd("[Sha_Gojo]","",groupe,mode);
			listeadd("[Son_Goku]","",groupe,mode);
			listeadd("[Zephyr]Haha","",groupe,mode);
			listeadd("[[gogoteman]]","",groupe,mode);
			listeadd("[[]]]]]]]]]]]]]","",groupe,mode);
			listeadd("]-Gogoteman-[","",groupe,mode);
			listeadd("]Gogoteman[","",groupe,mode);
			listeadd("_Evanescence","",groupe,mode);
			listeadd("_Gogoteman_","",groupe,mode);
			listeadd("_kyo","",groupe,mode);
			listeadd("_PrisonBreak","",groupe,mode);
			listeadd("_Shigure","",groupe,mode);
			listeadd("_yuki","",groupe,mode);
		}
		groupe = "Saber"; color = "#15317E"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("9","",groupe,mode);
			listeadd("89","",groupe,mode);
			listeadd("2000","",groupe,mode);
			listeadd("After_Story","",groupe,mode);
			listeadd("Agrum","",groupe,mode);
			listeadd("Aldebaran","",groupe,mode);
			listeadd("Altai","",groupe,mode);
			listeadd("Altena","",groupe,mode);
			listeadd("Ambulance","",groupe,mode);
			listeadd("Ami","",groupe,mode);
			listeadd("andrey87","",groupe,mode);
			listeadd("Anegasaki","",groupe,mode);
			listeadd("ange-justicier","",groupe,mode);
			listeadd("Anjera","",groupe,mode);
			listeadd("Anti-Spiral","",groupe,mode);
			listeadd("Aoi_Sena","",groupe,mode);
			listeadd("Aoi_Tohsaka","",groupe,mode);
			listeadd("Aozaki_Aoko","",groupe,mode);
			listeadd("AR1","",groupe,mode);
			listeadd("Arbitre","",groupe,mode);
			listeadd("archmage","",groupe,mode);
			listeadd("Arme_Diamant","",groupe,mode);
			listeadd("Arme_Pampa","",groupe,mode);
			listeadd("Arme_Rubide_One","",groupe,mode);
			listeadd("Arme_Rubis_One","",groupe,mode);
			listeadd("Art_of_War","",groupe,mode);
			listeadd("Attenborough","",groupe,mode);
			listeadd("Attila_Carotte","",groupe,mode);
			listeadd("Avalanche","",groupe,mode);
			listeadd("Avalon","",groupe,mode);
			listeadd("Ayase_Kishimoto","",groupe,mode);
			listeadd("Baccano","",groupe,mode);
			listeadd("Bananas_can_fly","",groupe,mode);
			listeadd("Barbapampa","",groupe,mode);
			listeadd("Barret","",groupe,mode);
			listeadd("Beau","",groupe,mode);
			listeadd("Bebe_Soleil","",groupe,mode);
			listeadd("Bejito","",groupe,mode);
			listeadd("Belamy","",groupe,mode);
			listeadd("Berger","",groupe,mode);
			listeadd("BioHazard","",groupe,mode);
			listeadd("Bison","",groupe,mode);
			listeadd("BKVF","",groupe,mode);
			listeadd("Blueno","",groupe,mode);
			listeadd("BobMarley","",groupe,mode);
			listeadd("Bomber","",groupe,mode);
			listeadd("Boota","",groupe,mode);
			listeadd("Bossinette","",groupe,mode);
			listeadd("Bossinou","",groupe,mode);
			listeadd("bossmaxime","",groupe,mode);
			listeadd("Bouffe","",groupe,mode);
			listeadd("Brat_Ya","",groupe,mode);
			listeadd("Bronze","",groupe,mode);
			listeadd("Buffalo","",groupe,mode);
			listeadd("Bugeur_Pro","",groupe,mode);
			listeadd("Bunshuu","",groupe,mode);
			listeadd("Calcutta","",groupe,mode);
			listeadd("Camlann","",groupe,mode);
			listeadd("Cao-Xiu","",groupe,mode);
			listeadd("Cao_Cao","",groupe,mode);
			listeadd("Cao_Hong","",groupe,mode);
			listeadd("CAP_Pneu","",groupe,mode);
			listeadd("Caren_Ortensia","",groupe,mode);
			listeadd("Cartox","",groupe,mode);
			listeadd("Chane_Laforet","",groupe,mode);
			listeadd("changepseudo","",groupe,mode);
			listeadd("ChaosHead","",groupe,mode);
			listeadd("Chapultepec","",groupe,mode);
			listeadd("Chatouilleux","",groupe,mode);
			listeadd("Cheng_Pu","",groupe,mode);
			listeadd("Chen_Gong","",groupe,mode);
			listeadd("Cheval","",groupe,mode);
			listeadd("Chewbacca","",groupe,mode);
			listeadd("ChocoMog","",groupe,mode);
			listeadd("Choucroute","",groupe,mode);
			listeadd("Choucroute_Boy","",groupe,mode);
			listeadd("Chouhi","",groupe,mode);
			listeadd("Chouryou","",groupe,mode);
			listeadd("Chouun","",groupe,mode);
			listeadd("Civ","",groupe,mode);
			listeadd("Classic","",groupe,mode);
			listeadd("Code","",groupe,mode);
			listeadd("Communaute","",groupe,mode);
			listeadd("Configuration","",groupe,mode);
			listeadd("CopyPasta","",groupe,mode);
			listeadd("Couche_Tard","",groupe,mode);
			listeadd("Crevar","",groupe,mode);
			listeadd("Criminel","",groupe,mode);
			listeadd("Culbute","",groupe,mode);
			listeadd("Curse","",groupe,mode);
			listeadd("Cyriel","",groupe,mode);
			listeadd("Daaku_Seibaa","",groupe,mode);
			listeadd("Dai","",groupe,mode);
			listeadd("Dai-Gurren","",groupe,mode);
			listeadd("Daikyou","",groupe,mode);
			listeadd("Danbooru","",groupe,mode);
			listeadd("Dangaard","",groupe,mode);
			listeadd("Darry","",groupe,mode);
			listeadd("Darry_Adai","",groupe,mode);
			listeadd("Dawn_of_Mana","",groupe,mode);
			listeadd("Da_Ji","",groupe,mode);
			listeadd("Da_Qiao","",groupe,mode);
			listeadd("Da_Raklur","",groupe,mode);
			listeadd("Deathjeaster","",groupe,mode);
			listeadd("degrade","",groupe,mode);
			listeadd("derniere_arme","",groupe,mode);
			listeadd("Diamond_Saber","",groupe,mode);
			listeadd("Diao_Chan","",groupe,mode);
			listeadd("Dioud","",groupe,mode);
			listeadd("Dirge","",groupe,mode);
			listeadd("Doax_Kasumi","",groupe,mode);
			listeadd("Dodoria","",groupe,mode);
			listeadd("Don_Bossino","",groupe,mode);
			listeadd("Dookie","",groupe,mode);
			listeadd("Doragon_Masutaa","",groupe,mode);
			listeadd("Douche","",groupe,mode);
			listeadd("Doujin","",groupe,mode);
			listeadd("Duran","",groupe,mode);
			listeadd("DW6","",groupe,mode);
			listeadd("Dynasty_Pampa","",groupe,mode);
			listeadd("Dynasty_Tactics","",groupe,mode);
			listeadd("Dyuran","",groupe,mode);
																		listeadd("Eirin","",groupe+"?",mode);
			listeadd("Elgala","",groupe,mode);
			listeadd("el_titi","",groupe,mode);
			listeadd("Ennis","",groupe,mode);
			listeadd("Enshou","",groupe,mode);
			listeadd("Equipe","",groupe,mode);
			listeadd("Eric_Uguu","",groupe,mode);
			listeadd("Eternel","",groupe,mode);
			listeadd("Euphemia","",groupe,mode);
			listeadd("Euro","",groupe,mode);
			listeadd("Eva-02","",groupe,mode);
			listeadd("Evangelion","",groupe,mode);
			listeadd("Excel","",groupe,mode);
			listeadd("Excel_Saga","",groupe,mode);
			listeadd("Fate_Testarossa","",groupe,mode);
			listeadd("Fearii","",groupe,mode);
			listeadd("Fenriru_Naito","",groupe,mode);
			listeadd("FFVII","",groupe,mode);
			listeadd("FFX-2","",groupe,mode);
			listeadd("Fiasco","",groupe,mode);
			listeadd("FIGHT_THE_POWAH","",groupe,mode);
			listeadd("Flame_Saber","",groupe,mode);
			listeadd("Flower","",groupe,mode);
			listeadd("Fontainebleau","",groupe,mode);
			listeadd("Fujibayashi","",groupe,mode);
			listeadd("Fuka","",groupe,mode);
			listeadd("Fullmetal_Pampa","",groupe,mode);
			listeadd("Funny","",groupe,mode);
			listeadd("Furie","",groupe,mode);
			listeadd("Fu_Xi","",groupe,mode);
			listeadd("Ganryou","",groupe,mode);
			listeadd("Gan_Ning","",groupe,mode);
			listeadd("Gaohai","",groupe,mode);
			listeadd("GAR","",groupe,mode);
			listeadd("Geevay","",groupe,mode);
			listeadd("Gekko_Moria","",groupe,mode);
			listeadd("Gelemia","",groupe,mode);
			listeadd("Gengis_Khan","",groupe,mode);
			listeadd("GFA","",groupe,mode);
			listeadd("Giga_Drill","",groupe,mode);
			listeadd("Gimmy","",groupe,mode);
			listeadd("Ginko","",groupe,mode);
			listeadd("Gloucester","",groupe,mode);
			listeadd("Gobelin","",groupe,mode);
			listeadd("Gox","",groupe,mode);
			listeadd("greggy","",groupe,mode);
			listeadd("Guan_Yu","",groupe,mode);
			listeadd("Gulaparl","",groupe,mode);
			listeadd("Gunmen","",groupe,mode);
			listeadd("Gunz","",groupe,mode);
			listeadd("Guo_Jia","",groupe,mode);
			listeadd("Gurenn","",groupe,mode);
			listeadd("Gurren_Lagann","",groupe,mode);
			listeadd("hakim","",groupe,mode);
			listeadd("Hakim2","",groupe,mode);
			listeadd("Hallelujah","",groupe,mode);
			listeadd("Hao_Zhao","",groupe,mode);
			listeadd("Haparkko","",groupe,mode);
			listeadd("Happer","",groupe,mode);
			listeadd("Hard","",groupe,mode);
			listeadd("Harem","",groupe,mode);
			listeadd("Hare_Hare_Yukai","",groupe,mode);
			listeadd("Hatchin","",groupe,mode);
			listeadd("Hatsune_Miku","",groupe,mode);
			listeadd("Hawk","",groupe,mode);
			listeadd("Hebus","",groupe,mode);
			listeadd("Heihachi","",groupe,mode);
			listeadd("Heracles","",groupe,mode);
			listeadd("Hitomi","",groupe,mode);
			listeadd("Hochi","",groupe,mode);
			listeadd("Hookuai","",groupe,mode);
			listeadd("Hoshimura","",groupe,mode);
			listeadd("HTML","",groupe,mode);
			listeadd("Hyatt","",groupe,mode);
			listeadd("Ikea","",groupe,mode);
			listeadd("ile_du_Pampa","",groupe,mode);
			listeadd("Ilya","",groupe,mode);
			listeadd("Inceste","",groupe,mode);
			listeadd("Ino","",groupe,mode);
			listeadd("Irae","",groupe,mode);
			listeadd("Isaac_Dian","",groupe,mode);
			listeadd("IUT","",groupe,mode);
			listeadd("IWHFP","",groupe,mode);
			listeadd("I_love_Monarch","",groupe,mode);
			listeadd("I_love_Xypounet","",groupe,mode);
			listeadd("james530","",groupe,mode);
			listeadd("Japonais","",groupe,mode);
			listeadd("JC-Van-Damme","",groupe,mode);
			listeadd("Jean__Roucas","",groupe,mode);
			listeadd("Jerry_le_russe","",groupe,mode);
			listeadd("Jormungand","",groupe,mode);
			listeadd("Jours","",groupe,mode);
			listeadd("Junniku","",groupe,mode);
			listeadd("kabbolai","",groupe,mode);
			listeadd("kaio7","",groupe,mode);
			listeadd("Kakouen","",groupe,mode);
			listeadd("Kakouton","",groupe,mode);
			listeadd("Kalifa","",groupe,mode);
			listeadd("Kamui","",groupe,mode);
			listeadd("Kannei","",groupe,mode);
			listeadd("Kannu","",groupe,mode);
			listeadd("Karakorum","",groupe,mode);
			listeadd("Kayuu","",groupe,mode);
			listeadd("keitaji","",groupe,mode);
			listeadd("Khaka","",groupe,mode);
			listeadd("Killingmaximum","",groupe,mode);
			listeadd("Kishimoto_Ayase","",groupe,mode);
			listeadd("Kittan","",groupe,mode);
			listeadd("Kiyal","",groupe,mode);
			listeadd("Kjukca","",groupe,mode);
			listeadd("Know","",groupe,mode);
			listeadd("Koihime","",groupe,mode);
			listeadd("Koihime_Musou","",groupe,mode);
			listeadd("Koiwai_Yotsuba","",groupe,mode);
			listeadd("Konata","",groupe,mode);
			listeadd("Kouchuu","",groupe,mode);
			listeadd("Koumei","",groupe,mode);
			listeadd("Kozue_Orihara","",groupe,mode);
			listeadd("Kozuki_Karen","",groupe,mode);
			listeadd("Krieg","",groupe,mode);
			listeadd("Kururugi_Suzaku","",groupe,mode);
			listeadd("Kusunoki","",groupe,mode);
			listeadd("Kusunoki_Yua","",groupe,mode);
			listeadd("Lac_Leman","",groupe,mode);
			listeadd("Ladd_Russo","",groupe,mode);
			listeadd("Lamian_Naga","",groupe,mode);
			listeadd("Lao_Tzu","",groupe,mode);
			listeadd("Lar","",groupe,mode);
			listeadd("Layning","",groupe,mode);
			listeadd("Leaf_Saber","",groupe,mode);
			listeadd("Leeron","",groupe,mode);
			listeadd("Leipzig","",groupe,mode);
			listeadd("Lens","",groupe,mode);
			listeadd("Leve_Tot","",groupe,mode);
			listeadd("Lightgazer","",groupe,mode);
			listeadd("Lit","",groupe,mode);
			listeadd("LittleBigPlanet","",groupe,mode);
			listeadd("Li_Xingke","",groupe,mode);
			listeadd("Llewelyn","",groupe,mode);
			listeadd("Lord_Genome","",groupe,mode);
			listeadd("Lotus","",groupe,mode);
			listeadd("Lucky_Star","",groupe,mode);
			listeadd("Lu_Bu","",groupe,mode);
			listeadd("Lu_Ling_Qi","",groupe,mode);
			listeadd("Macao","",groupe,mode);
			listeadd("Magicien","",groupe,mode);
			listeadd("Mai_Shiranui","",groupe,mode);
			listeadd("Maltesers","",groupe,mode);
			listeadd("Mamadou","",groupe,mode);
			listeadd("Manager","",groupe,mode);
			listeadd("Maoulida","",groupe,mode);
			listeadd("Marly-Gomont","",groupe,mode);
			listeadd("Marvel","",groupe,mode);
			listeadd("maxime","",groupe,mode);
			listeadd("Ma_Chao","",groupe,mode);
			listeadd("meandme","",groupe,mode);
			listeadd("Megalixir","",groupe,mode);
			listeadd("Mega_Tiger","",groupe,mode);
			listeadd("Messe","",groupe,mode);
			listeadd("Messenger_Nia","",groupe,mode);
			listeadd("Mihawk","",groupe,mode);
			listeadd("Mikiya","",groupe,mode);
			listeadd("mini-triplepute","",groupe,mode);
			listeadd("Mireille","",groupe,mode);
			listeadd("Misae","",groupe,mode);
			listeadd("Modo_Pourri","",groupe,mode);
			listeadd("Monkey_D_Dragon","",groupe,mode);
			listeadd("Moon_Saber","",groupe,mode);
			listeadd("Mort","",groupe,mode);
			listeadd("Morveux","",groupe,mode);
			listeadd("Musou","",groupe,mode);
			listeadd("Muso_Orochi","",groupe,mode);
			listeadd("Nabiki","",groupe,mode);
			listeadd("Nakoruru","",groupe,mode);
			listeadd("Nanako","",groupe,mode);
			listeadd("Nanami_Nishijou","",groupe,mode);
			listeadd("Nico_Robin","",groupe,mode);
			listeadd("Nishijou_Nanami","",groupe,mode);
			listeadd("Notthingam","",groupe,mode);
			listeadd("Nrvnqsr","",groupe,mode);
			listeadd("Nutella","",groupe,mode);
			listeadd("Nyuu","",groupe,mode);
			listeadd("Okami","",groupe,mode);
			listeadd("Okkusenman","",groupe,mode);
			listeadd("Old_Coco","",groupe,mode);
			listeadd("One_Piece","",groupe,mode);
			listeadd("Oreillette","",groupe,mode);
			listeadd("Orihara","",groupe,mode);
			listeadd("Orihara_Kozue","",groupe,mode);
			listeadd("Ortensia","",groupe,mode);
			listeadd("OST","",groupe,mode);
			listeadd("Otaku","",groupe,mode);
			listeadd("Ours","",groupe,mode);
			listeadd("Paix","",groupe,mode);
			listeadd("Palais_Mirage","",groupe,mode);
			listeadd("Pampagruel","",groupe,mode);
			listeadd("Pamparkko","",groupe,mode);
			listeadd("Pampartouze","",groupe,mode);
			listeadd("Pampa_Bugeur","",groupe,mode);
			listeadd("Pampa_One","",groupe,mode);
			listeadd("Pang_De","",groupe,mode);
			listeadd("Parkkouille","",groupe,mode);
			listeadd("Parkks","",groupe,mode);
			listeadd("Pauleta","",groupe,mode);
			listeadd("Peace","",groupe,mode);
			listeadd("Pedozell","",groupe,mode);
			listeadd("Pegase","",groupe,mode);
			listeadd("Pericles","",groupe,mode);
			listeadd("PhiloSophie","",groupe,mode);
			listeadd("Pizza","",groupe,mode);
			listeadd("Plasma_Pampa","",groupe,mode);
			listeadd("Pootre","",groupe,mode);
			listeadd("Popi","",groupe,mode);
			listeadd("Porc","",groupe,mode);
			listeadd("Projet","",groupe,mode);
			listeadd("PSGCDPD","",groupe,mode);
			listeadd("PTDR","",groupe,mode);
			listeadd("Putain","",groupe,mode);
			listeadd("Rageux_Asseche","",groupe,mode);
			listeadd("Ragga","",groupe,mode);
			listeadd("RCL","",groupe,mode);
			listeadd("Recuperation","",groupe,mode);
			listeadd("Redacteur","",groupe,mode);
			listeadd("Reimu","",groupe,mode);
			listeadd("Reisen","",groupe,mode);
			listeadd("Renaissance","",groupe,mode);
			listeadd("Reserver","",groupe,mode);
			listeadd("Riisu","",groupe,mode);
			listeadd("Rikuson","",groupe,mode);
			listeadd("Ril","",groupe,mode);
			listeadd("Rimi_Sakihata","",groupe,mode);
			listeadd("Ritzia","",groupe,mode);
			listeadd("River","",groupe,mode);
			listeadd("Rojer","",groupe,mode);
			listeadd("Rolante","",groupe,mode);
			listeadd("Rossiu","",groupe,mode);
			listeadd("Ruun_Meiden","",groupe,mode);
			listeadd("Ryofu","",groupe,mode);
			listeadd("Ryogi","",groupe,mode);
			listeadd("S-lawl","",groupe,mode);
			listeadd("Saber","",groupe,mode);
			listeadd("Saber_Lily","",groupe,mode);
			listeadd("Sailor_Venus","",groupe,mode);
			listeadd("Saint_Saber","",groupe,mode);
			listeadd("Sakagami","",groupe,mode);
			listeadd("Sakihata","",groupe,mode);
			listeadd("Sakihata_Rimi","",groupe,mode);
			listeadd("Samidare","",groupe,mode);
			listeadd("sandstorm","",groupe,mode);
			listeadd("School_Days","",groupe,mode);
			listeadd("Schweppes_Agrum","",groupe,mode);
			listeadd("Scream","",groupe,mode);
			listeadd("SD3","",groupe,mode);
			listeadd("Seisai","",groupe,mode);
			listeadd("Semence","",groupe,mode);
			listeadd("Sena_Aoi","",groupe,mode);
			listeadd("Sengokushi","",groupe,mode);
			listeadd("Serf","",groupe,mode);
			listeadd("Sergei_Snolife","",groupe,mode);
			listeadd("Shamal","",groupe,mode);
			listeadd("Shanks","",groupe,mode);
			listeadd("Sharurotto","",groupe,mode);
			listeadd("Shikabane","",groupe,mode);
			listeadd("Shikabane_Hime","",groupe,mode);
			listeadd("Shiki_Ryogi","",groupe,mode);
			listeadd("Shinguji_Sakura","",groupe,mode);
			listeadd("Shinra","",groupe,mode);
			listeadd("Shin_Sangoku","",groupe,mode);
			listeadd("Shion","",groupe,mode);
			listeadd("Shizuku","",groupe,mode);
			listeadd("Shoukyou","",groupe,mode);
			listeadd("Shuuyu","",groupe,mode);
			listeadd("Silvia","",groupe,mode);
			listeadd("Ski","",groupe,mode);
			listeadd("slipknot2","",groupe,mode);
			listeadd("Smoi_le_Pampa","",groupe,mode);
			listeadd("soma17","",groupe,mode);
			listeadd("Sonken","",groupe,mode);
			listeadd("Sonshoukou","",groupe,mode);
			listeadd("Sorcier","",groupe,mode);
			listeadd("SOS","",groupe,mode);
			listeadd("Sous-Marin","",groupe,mode);
			listeadd("Spartes","",groupe,mode);
			listeadd("Spectrum","",groupe,mode);
			listeadd("Spiderman","",groupe,mode);
			listeadd("spiro","",groupe,mode);
			listeadd("Stadium","",groupe,mode);
			listeadd("Stoi_Le_Pampa","",groupe,mode);
			listeadd("STOP","",groupe,mode);
			listeadd("Subaru","",groupe,mode);
			listeadd("Sumeragi_Kaguya","",groupe,mode);
			listeadd("Sumire","",groupe,mode);
			listeadd("Sun_Jian","",groupe,mode);
			listeadd("Sun_Quan","",groupe,mode);
			listeadd("Sun_Shang_Xiang","",groupe,mode);
			listeadd("Super_Bomberman","",groupe,mode);
			listeadd("Super_Rageux","",groupe,mode);
			listeadd("Sutaa_Ransaa","",groupe,mode);
			listeadd("Sword","",groupe,mode);
			listeadd("T07","",groupe,mode);
			listeadd("ta-race","",groupe,mode);
			listeadd("Taiga_Aisaka","",groupe,mode);
			listeadd("Taishi_Ci","",groupe,mode);
			listeadd("tchde","",groupe,mode);
			listeadd("Tech","",groupe,mode);
			listeadd("Technoman","",groupe,mode);
			listeadd("Teckelly","",groupe,mode);
			listeadd("Telephone","",groupe,mode);
			listeadd("Tenebru","",groupe,mode);
			listeadd("tessaiga","",groupe,mode);
			listeadd("Thierry-Henry","",groupe,mode);
			listeadd("Thunder_Saber","",groupe,mode);
			listeadd("tifa_love_clad","",groupe,mode);
			listeadd("Tina","",groupe,mode);
			listeadd("Tiss","",groupe,mode);
			listeadd("Tof","",groupe,mode);
			listeadd("Tohko","",groupe,mode);
			listeadd("Toki","",groupe,mode);
			listeadd("Tokiomi","",groupe,mode);
			listeadd("Tokiwa","",groupe,mode);
			listeadd("ToraDora","",groupe,mode);
			listeadd("Toshiyuki","",groupe,mode);
			listeadd("Toutaku","",groupe,mode);
			listeadd("Traitre","",groupe,mode);
			listeadd("Tsuzuroa","",groupe,mode);
			listeadd("TTGL","",groupe,mode);
			listeadd("Uncroucheable","",groupe,mode);
			listeadd("Unlimited","",groupe,mode);
			listeadd("vag00","",groupe,mode);
			listeadd("Vai","",groupe,mode);
			listeadd("val44","",groupe,mode);
			listeadd("Valhalla","",groupe,mode);
			listeadd("Vanadesu","",groupe,mode);
			listeadd("Vanadiisu","",groupe,mode);
			listeadd("Vanadis","",groupe,mode);
			listeadd("Vannes","",groupe,mode);
			listeadd("Vishnu","",groupe,mode);
			listeadd("Vomi","",groupe,mode);
			listeadd("Warriors","",groupe,mode);
			listeadd("Warukyuure","",groupe,mode);
			listeadd("Win","",groupe,mode);
			listeadd("Winry","",groupe,mode);
			listeadd("WinZip","",groupe,mode);
			listeadd("XiahouYuan","",groupe,mode);
			listeadd("Xiahou_Dun","",groupe,mode);
			listeadd("Xing_Cai","",groupe,mode);
			listeadd("XXL","",groupe,mode);
			listeadd("Yacco","",groupe,mode);
			listeadd("Yakumo","",groupe,mode);
			listeadd("Yetisports","",groupe,mode);
			listeadd("Yoh","",groupe,mode);
			listeadd("Yoko_Ritona","",groupe,mode);
			listeadd("Yomako","",groupe,mode);
			listeadd("Yotsuba_Koiwai","",groupe,mode);
			listeadd("Yua_Kusunoki","",groupe,mode);
			listeadd("Yuriel","",groupe,mode);
			listeadd("Zhandarme","",groupe,mode);
			listeadd("Zhao_Yun","",groupe,mode);
			listeadd("Zhen_Ji","",groupe,mode);
			listeadd("Zhen__Ji","",groupe,mode);
			listeadd("Zino_Weinberg","",groupe,mode);
			listeadd("Zseir","",groupe,mode);
			listeadd("Zuo_Ci","",groupe,mode);
			listeadd("[B0SS]Maxime","",groupe,mode);
			listeadd("[BOSS]Maxime","",groupe,mode);
			listeadd("[DucK]Maxime","",groupe,mode);
			listeadd("[Egypt]Se7h","",groupe,mode);
			listeadd("[Meta]-Pampa","",groupe,mode);
			listeadd("[RedZone]Pampa","",groupe,mode);
			listeadd("[Zephyr]Tinod","",groupe,mode);
		}
		groupe = "Merc"; color = "#616D7E"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Ashera","",groupe,mode);
			listeadd("Astoria","",groupe,mode);
			listeadd("Ayasugi","",groupe,mode);
			listeadd("Catatonie","",groupe,mode);
			listeadd("Catatonique","",groupe,mode);
			listeadd("Celestia","",groupe,mode);
			listeadd("Cephalgie","",groupe,mode);
			listeadd("Cerarium","",groupe,mode);
			listeadd("Cerestia","",groupe,mode);
			listeadd("Cerm","",groupe,mode);
			listeadd("Chloride","",groupe,mode);
			listeadd("Chronotium","",groupe,mode);
			listeadd("Cissnei","",groupe,mode);
			listeadd("Couard","",groupe,mode);
			listeadd("Crescent","",groupe,mode);
			listeadd("Cryogenese","",groupe,mode);
			listeadd("Daecia","",groupe,mode);
			listeadd("DameCeleste","",groupe,mode);
			listeadd("Delphyne","",groupe,mode);
			listeadd("Destoria","",groupe,mode);
			listeadd("Dolem","",groupe,mode);
			listeadd("Electrostatique","",groupe,mode);
			listeadd("EnergieBizzaro","",groupe,mode);
			listeadd("Eradication","",groupe,mode);
			listeadd("FirstKiss","",groupe,mode);
			listeadd("Forestia","",groupe,mode);
			listeadd("Fuckpad","",groupe,mode);
			listeadd("Fuzakeruna","",groupe,mode);
			listeadd("Gape","",groupe,mode);
			listeadd("Gilvegane","",groupe,mode);
			listeadd("Itoshiki","",groupe,mode);
			listeadd("Japan-Otaku","",groupe,mode);
			listeadd("Koryuta","",groupe,mode);
			listeadd("Lassitude","",groupe,mode);
			listeadd("Lucralia","",groupe,mode);
			listeadd("Lucrania","",groupe,mode);
			listeadd("Merc","",groupe,mode);
			listeadd("Merc5","",groupe,mode);
			listeadd("Merc6","",groupe,mode);
			listeadd("Miroitant","",groupe,mode);
			listeadd("Miss_Quistis","",groupe,mode);
			listeadd("Mysticisme","",groupe,mode);
			listeadd("Negrito47","",groupe,mode);
			listeadd("Nei-First","",groupe,mode);
			listeadd("NeoVisualism","",groupe,mode);
			listeadd("Nereides","",groupe,mode);
			listeadd("Nihilisme","",groupe,mode);
			listeadd("Nyru","",groupe,mode);
			listeadd("Nyu_Lucy","",groupe,mode);
			listeadd("Path","",groupe,mode);
			listeadd("Reath","",groupe,mode);
			listeadd("Risu","",groupe,mode);
			listeadd("Rochefoucauld","",groupe,mode);
			listeadd("Sankyu","",groupe,mode);
			listeadd("Satou_Tatsuhiro","",groupe,mode);
			listeadd("Sekirei","",groupe,mode);
			listeadd("SEPHIRIATH","",groupe,mode);
			listeadd("Sephi_98","",groupe,mode);
			listeadd("Shurya","",groupe,mode);
			listeadd("Sofea2","",groupe,mode);
			listeadd("Solfege","",groupe,mode);
			listeadd("Taikutsu","",groupe,mode);
			listeadd("Teas","",groupe,mode);
			listeadd("Thaumas","",groupe,mode);
			listeadd("Transcendence","",groupe,mode);
			listeadd("Vagrant_Story","",groupe,mode);
			listeadd("Valestria","",groupe,mode);
			listeadd("Valkyria","",groupe,mode);
			listeadd("Vehement","",groupe,mode);
			listeadd("Vehemus","",groupe,mode);
			listeadd("Vengeresse","",groupe,mode);
			listeadd("White_Room","",groupe,mode);
			listeadd("Yukirin","",groupe,mode);
			listeadd("Zakiro","",groupe,mode);
			listeadd("Zeith","",groupe,mode);
		}
		groupe = "Ichigo"; color = "#C34A2C"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("1ch160","",groupe,mode);
			listeadd("83nj4m1n","",groupe,mode);
			listeadd("AlexandraSublet","",groupe,mode);
			listeadd("Ali_Aglagla","",groupe,mode);
			listeadd("Ali_IchigO","",groupe,mode);
			listeadd("AllenWalker","",groupe,mode);
			listeadd("ApOllOniA","",groupe,mode);
			listeadd("ApOllOqA","",groupe,mode);
			listeadd("Astronautique","",groupe,mode);
			listeadd("Avaleuse47","",groupe,mode);
			listeadd("Barack-Obama","",groupe,mode);
			listeadd("Boskara","",groupe,mode);
			listeadd("Buta-Bros","",groupe,mode);
			listeadd("ButaBros","",groupe,mode);
			listeadd("Cacturne","",groupe,mode);
			listeadd("CaudilloIchigO","",groupe,mode);
			listeadd("ChigO","",groupe,mode);
			listeadd("Chigogo","",groupe,mode);
			listeadd("Chimpenfeu","",groupe,mode);
			listeadd("ChOuX_IchigO","",groupe,mode);
			listeadd("Chuck-Me","",groupe,mode);
			listeadd("Chuck_Me","",groupe,mode);
			listeadd("Confucianisme","",groupe,mode);
			listeadd("Crepitus","",groupe,mode);
			listeadd("Devil-Ichigo","",groupe,mode);
			listeadd("Diablada","",groupe,mode);
			listeadd("Don-IchigO","",groupe,mode);
			listeadd("Dr-IchigO","",groupe,mode);
			listeadd("DrIchigO","",groupe,mode);
			listeadd("Edubuntu","",groupe,mode);
			listeadd("El-IchigO","",groupe,mode);
			listeadd("EmilieBesse","",groupe,mode);
			listeadd("Existentialisme","",groupe,mode);
			listeadd("Fast-Arme","",groupe,mode);
			listeadd("FastArme","",groupe,mode);
			listeadd("Fast_Arme","",groupe,mode);
			listeadd("GardenState","",groupe,mode);
			listeadd("Givrali","",groupe,mode);
			listeadd("Gloupti","",groupe,mode);
			listeadd("Gokkun","",groupe,mode);
			listeadd("Goulue47","",groupe,mode);
			listeadd("GrandDieuClown","",groupe,mode);
			listeadd("Herzog-IchigO","",groupe,mode);
			listeadd("Humanisme","",groupe,mode);
			listeadd("IamNoWhere","",groupe,mode);
			listeadd("IamSomeThinG","",groupe,mode);
			listeadd("IAmSomeThink","",groupe,mode);
			listeadd("Ichigay","",groupe,mode);
			listeadd("Ichigeek","",groupe,mode);
			listeadd("IchiGoD","",groupe,mode);
			listeadd("IchiGollum","",groupe,mode);
			listeadd("IchigOrium","",groupe,mode);
			listeadd("IchigOrius","",groupe,mode);
			listeadd("IchigOuine","",groupe,mode);
			listeadd("IchigOunet","",groupe,mode);
			listeadd("IchigO[JV]","",groupe,mode);
			listeadd("IchigO_69th","",groupe,mode);
			listeadd("IchiloiN","",groupe,mode);
			listeadd("Idi-Amin-Dada","",groupe,mode);
			listeadd("JeuneVierge","",groupe,mode);
			listeadd("JeuneVierge47","",groupe,mode);
			listeadd("Kachina","",groupe,mode);
			listeadd("KiIchigO","",groupe,mode);
			listeadd("Kikazaru","",groupe,mode);
			listeadd("Kongfuzi","",groupe,mode);
			listeadd("Kukemomo","",groupe,mode);
			listeadd("Kurosuguri","",groupe,mode);
			listeadd("Lord_IchigO","",groupe,mode);
			listeadd("M-Patate","",groupe,mode);
			listeadd("MacIchigO","",groupe,mode);
			listeadd("MaxiIchigO","",groupe,mode);
			listeadd("McIchigO","",groupe,mode);
			listeadd("MiniIchigO","",groupe,mode);
			listeadd("Mizaru","",groupe,mode);
			listeadd("Msieur-Patate","",groupe,mode);
			listeadd("Nenad_8","",groupe,mode);
			listeadd("Nihonshu","",groupe,mode);
			listeadd("Nymphette","",groupe,mode);
			listeadd("Nymphette47","",groupe,mode);
			listeadd("NymphetteAgile","",groupe,mode);
			listeadd("Octave-Parango","",groupe,mode);
			listeadd("OctaveParango","",groupe,mode);
			listeadd("OpenYourAss","",groupe,mode);
			listeadd("Ouistibide","",groupe,mode);
			listeadd("Pekwar","",groupe,mode);
			listeadd("Phyllali","",groupe,mode);
			listeadd("Pijako","",groupe,mode);
			listeadd("PinkPrincess","",groupe,mode);
			listeadd("Prince_IchigO","",groupe,mode);
			listeadd("Prinplouf","",groupe,mode);
			listeadd("PucelleSauvage","",groupe,mode);
			listeadd("Pucelle_Sauvage","",groupe,mode);
			listeadd("Roselia","",groupe,mode);
			listeadd("Roserade","",groupe,mode);
			listeadd("Rozbouton","",groupe,mode);
			listeadd("SackBoy","",groupe,mode);
			listeadd("Santoku","",groupe,mode);
			listeadd("Sir-IchigO","",groupe,mode);
			listeadd("Skelanimal","",groupe,mode);
			listeadd("SpiderCochonne","",groupe,mode);
			listeadd("Suguri","",groupe,mode);
			listeadd("Super-Bonobo","",groupe,mode);
			listeadd("Super-Calimero","",groupe,mode);
			listeadd("Super-Gorille","",groupe,mode);
			listeadd("Super-Jaguar","",groupe,mode);
			listeadd("Super-Lama","",groupe,mode);
			listeadd("Super-Macaque","",groupe,mode);
			listeadd("Super-Ours","",groupe,mode);
			listeadd("Super-Perroquet","",groupe,mode);
			listeadd("Super-Singe","",groupe,mode);
			listeadd("Super-Tortue","",groupe,mode);
			listeadd("The-Fratellis","",groupe,mode);
			listeadd("The-IchigO","",groupe,mode);
			listeadd("Tortipouss","",groupe,mode);
			listeadd("Transboisine","",groupe,mode);
			listeadd("Transhumanisme","",groupe,mode);
			listeadd("Tsurukokemomo","",groupe,mode);
			listeadd("Ushijima","",groupe,mode);
			listeadd("Vrykolakas","",groupe,mode);
			listeadd("Wofty","",groupe,mode);
			listeadd("Xubuntu","",groupe,mode);
			listeadd("YchYgO","",groupe,mode);
			listeadd("Zephyr1988","",groupe,mode);
			listeadd("[-oOo-]","",groupe,mode);
			listeadd("[HyllaS]","",groupe,mode);
			listeadd("[HylleS]","",groupe,mode);
			listeadd("[HylloS]","",groupe,mode);
			listeadd("[HylluS]","",groupe,mode);
			listeadd("[HyllyS]","",groupe,mode);
			listeadd("[ichigo128]","",groupe,mode);
			listeadd("[Y][o][d][a]","",groupe,mode);
			listeadd("[ZephyraS]","",groupe,mode);
			listeadd("[ZephyreS]","",groupe,mode);
			listeadd("[ZephyriS]","",groupe,mode);
			listeadd("[ZephyroS]","",groupe,mode);
			listeadd("[ZephyruS]","",groupe,mode);
			listeadd("[ZephyryS]","",groupe,mode);
			listeadd("][BaudelairE][","",groupe,mode);
			listeadd("][Dora][","",groupe,mode);
			listeadd("][Dr-House][","",groupe,mode);
			listeadd("][Franklin][","",groupe,mode);
			listeadd("][IchigO][","",groupe,mode);
			listeadd("][Oui-Oui][","",groupe,mode);
			listeadd("][Ray-Charles][","",groupe,mode);
			listeadd("][RukiA][","",groupe,mode);
			listeadd("][Sado][","",groupe,mode);
			listeadd("][SVT][","",groupe,mode);
			listeadd("][T-Bone][","",groupe,mode);
			listeadd("][ZephyR][","",groupe,mode);
		}
		groupe = "Holo-chan"; color = "#7D053F"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("AcRo_GaMeCuBe","",groupe,mode);
			listeadd("Aetherium","",groupe,mode);
			listeadd("Afternoon","",groupe,mode);
			listeadd("angedemonique","",groupe,mode);
			listeadd("Asmodea","",groupe,mode);
			listeadd("Asmodian","",groupe,mode);
			listeadd("Asphel","",groupe,mode);
			listeadd("Atreid","",groupe,mode);
			listeadd("Baizel","",groupe,mode);
			listeadd("bertrude","",groupe,mode);
			listeadd("Bloood","",groupe,mode);
			listeadd("Bobmo","",groupe,mode);
			listeadd("brolock","",groupe,mode);
			listeadd("brolyspg3","",groupe,mode);
			listeadd("brolysps3","",groupe,mode);
			listeadd("Caca_Communiste","",groupe,mode);
			listeadd("Cocoparis","",groupe,mode);
			listeadd("Contractor","",groupe,mode);
			listeadd("Crystal-Castles","",groupe,mode);
			listeadd("DarkNoeL","",groupe,mode);
			listeadd("darkyoshi","",groupe,mode);
			listeadd("Dark_Etron","",groupe,mode);
			listeadd("DaychayOnTadore","",groupe,mode);
			listeadd("Da_Mian","",groupe,mode);
			listeadd("DeathDream","",groupe,mode);
			listeadd("Deynonichus","",groupe,mode);
			listeadd("DreamRain","",groupe,mode);
			listeadd("Elyseen","",groupe,mode);
			listeadd("Etron-Sensuel","",groupe,mode);
			listeadd("Etron_Volant","",groupe,mode);
			listeadd("FrogZ","",groupe,mode);
			listeadd("Gabrielle","",groupe,mode);
			listeadd("Genryusai","",groupe,mode);
			listeadd("GryGor","",groupe,mode);
			listeadd("Guzotor","",groupe,mode);
			listeadd("HitMadness","",groupe,mode);
			listeadd("Holoduke","",groupe,mode);
			listeadd("HyuugaNeiji","",groupe,mode);
			listeadd("Israphel","",groupe,mode);
			listeadd("Kaithiel","",groupe,mode);
			listeadd("Kariine","",groupe,mode);
			listeadd("Kibelium","",groupe,mode);
			listeadd("KuchikiByakuya","",groupe,mode);
			listeadd("LapinAlcoolique","",groupe,mode);
			listeadd("LapinDangereux","",groupe,mode);
			listeadd("LapineRacoleuse","",groupe,mode);
			listeadd("LapinSensuel","",groupe,mode);
			listeadd("LecteurMP3","",groupe,mode);
			listeadd("Lekis","",groupe,mode);
			listeadd("lerat-puant","",groupe,mode);
			listeadd("Lord-Of-Banana","",groupe,mode);
			listeadd("Lucifugus","",groupe,mode);
			listeadd("Lumiel","",groupe,mode);
			listeadd("Luppi","",groupe,mode);
			listeadd("Lurk","",groupe,mode);
			listeadd("Markutan","",groupe,mode);
			listeadd("Master_Kraft","",groupe,mode);
			listeadd("MonsterMach","",groupe,mode);
			listeadd("newcookie","",groupe,mode);
			listeadd("Nezakan","",groupe,mode);
			listeadd("Oeuf_Mayo","",groupe,mode);
			listeadd("Oleoduc","",groupe,mode);
			listeadd("Pactisant","",groupe,mode);
			listeadd("Pap-illon","",groupe,mode);
			listeadd("Phenix_Bleu","",groupe,mode);
			listeadd("Pigeon-Sensuel","",groupe,mode);
			listeadd("Pigeon_Sensuel","",groupe,mode);
			listeadd("Pigeon_sensuel2","",groupe,mode);
			listeadd("Pigeon_Sensuel3","",groupe,mode);
			listeadd("Pigeon_Sensuel4","",groupe,mode);
			listeadd("PikminSexy","",groupe,mode);
			listeadd("Sadokael","",groupe,mode);
			listeadd("Schivardi","",groupe,mode);
			listeadd("Sefirosu","",groupe,mode);
			listeadd("Segatan","",groupe,mode);
			listeadd("sensuel_rabbit","",groupe,mode);
			listeadd("Signatune","",groupe,mode);
			listeadd("Snipercan","",groupe,mode);
			listeadd("supercookie","",groupe,mode);
			listeadd("SupermanIzback","",groupe,mode);
			listeadd("the_mario_bros","",groupe,mode);
			listeadd("TinyKirby","",groupe,mode);
			listeadd("ToxSick","",groupe,mode);
			listeadd("Usthiel","",groupe,mode);
			listeadd("veilleux","",groupe,mode);
			listeadd("VI952","",groupe,mode);
			listeadd("Xingke","",groupe,mode);
			listeadd("Yoshi-Jaune","",groupe,mode);
			listeadd("Yoshi-Noel","",groupe,mode);
			listeadd("Yoshi-Rose","",groupe,mode);
			listeadd("Yoshi_Rouge","",groupe,mode);
			listeadd("Yoshi_Violet","",groupe,mode);
			listeadd("ZarZ","",groupe,mode);
			listeadd("[voggle128]","",groupe,mode);
			listeadd("[wario128]","",groupe,mode);
		}
		groupe = "WorldEm"; color = "#95B9C7"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("absu","",groupe,mode);
			listeadd("Alghazanth","",groupe,mode);
			listeadd("Amami","",groupe,mode);
			listeadd("Ange-Decolore","",groupe,mode);
			listeadd("AxelRudiPell","",groupe,mode);
			listeadd("Azarock","",groupe,mode);
			listeadd("Azemmour","",groupe,mode);
			listeadd("Blabla_18-25","",groupe,mode);
			listeadd("Blassreiter","",groupe,mode);
			listeadd("BlutAusNord","",groupe,mode);
			listeadd("Boinc","",groupe,mode);
			listeadd("BulletOfBod0m","",groupe,mode);
			listeadd("Bulletofbodom","",groupe,mode);
			listeadd("ChrnoCrusade","",groupe,mode);
			listeadd("CoeurDuChaos","",groupe,mode);
			listeadd("Crazy_Knight","",groupe,mode);
			listeadd("CultOfLuna","",groupe,mode);
			listeadd("DaisukeMoriyama","",groupe,mode);
			listeadd("Dante90","",groupe,mode);
			listeadd("Darkestrah","",groupe,mode);
			listeadd("DavidFerrer","",groupe,mode);
			listeadd("Deesty","",groupe,mode);
			listeadd("Depense","",groupe,mode);
			listeadd("Dyke","",groupe,mode);
			listeadd("Extremium","",groupe,mode);
			listeadd("0","",groupe,mode);
			listeadd("Feigur","",groupe,mode);
			listeadd("Figurec","",groupe,mode);
			listeadd("Fina","",groupe,mode);
			listeadd("Fulgurant","",groupe,mode);
			listeadd("Gdata","",groupe,mode);
			listeadd("Gehenna","",groupe,mode);
			listeadd("GhostHound","",groupe,mode);
			listeadd("GillesSimon","",groupe,mode);
			listeadd("GreenCarnation","",groupe,mode);
			listeadd("HandOfBlood","",groupe,mode);
			listeadd("harryvolemor","",groupe,mode);
			listeadd("HellWarrior","",groupe,mode);
			listeadd("HoiHoi","",groupe,mode);
			listeadd("inspecteur_bob","",groupe,mode);
			listeadd("iWorld","",groupe,mode);
			listeadd("iWorldEmbryo","",groupe,mode);
			listeadd("Jadallys","",groupe,mode);
			listeadd("JaimeCisla","",groupe,mode);
			listeadd("JasonJames","",groupe,mode);
			listeadd("JessieXX","",groupe,mode);
			listeadd("JohnPemberton","",groupe,mode);
			listeadd("JulienBenneteau","",groupe,mode);
			listeadd("KageKaraMamoru","",groupe,mode);
			listeadd("LacieHeart","",groupe,mode);
			listeadd("LowDown","",groupe,mode);
			listeadd("MacrossFrontier","",groupe,mode);
			listeadd("MatthewTuck","",groupe,mode);
			listeadd("MichaelPadget","",groupe,mode);
			listeadd("Migration","",groupe,mode);
			listeadd("Mistaken","",groupe,mode);
			listeadd("Morsayrebrale","",groupe,mode);
			listeadd("Mortifera","",groupe,mode);
			listeadd("MugenNoJuunin","",groupe,mode);
			listeadd("Neene","",groupe,mode);
			listeadd("NeguraBunget","",groupe,mode);
			listeadd("NightWizard","",groupe,mode);
			listeadd("noelmvoyez","",groupe,mode);
			listeadd("o0dragibus0o","",groupe,mode);
			listeadd("OathBound","",groupe,mode);
			listeadd("OneOuts","",groupe,mode);
			listeadd("OsefTalcBide","",groupe,mode);
			listeadd("Otogizoushi","",groupe,mode);
			listeadd("Piergoth","",groupe,mode);
			listeadd("Plugins","",groupe,mode);
			listeadd("propilote","",groupe,mode);
			listeadd("RAIKONNEN","",groupe,mode);
			listeadd("RikuAmami","",groupe,mode);
			listeadd("Sasuke-World","",groupe,mode);
			listeadd("ScreamAimFire","",groupe,mode);
			listeadd("Sextonik","",groupe,mode);
			listeadd("ShapeOfDespair","",groupe,mode);
			listeadd("snake_diesel","",groupe,mode);
			listeadd("Sollies-Pont","",groupe,mode);
			listeadd("Sollies-Toucas","",groupe,mode);
			listeadd("Sollies-Ville","",groupe,mode);
			listeadd("spirit-of-metal","",groupe,mode);
			listeadd("TempleOfBaal","",groupe,mode);
			listeadd("TimBerners-Lee","",groupe,mode);
			listeadd("Tinggle","",groupe,mode);
			listeadd("TitanMountain","",groupe,mode);
			listeadd("TommyRobredo","",groupe,mode);
			listeadd("trinityblood","",groupe,mode);
			listeadd("Vache_qui_lol","",groupe,mode);
			listeadd("VampireKnight","",groupe,mode);
			listeadd("Venturia","",groupe,mode);
			listeadd("Vet","",groupe,mode);
			listeadd("Vinterriket","",groupe,mode);
			listeadd("Virtual_World","",groupe,mode);
			listeadd("WarKnight","",groupe,mode);
			listeadd("WorId","",groupe,mode);
			listeadd("WorIDEM","",groupe,mode);
			listeadd("World-Embryo","",groupe,mode);
			listeadd("WorldBank","",groupe,mode);
			listeadd("WorldClock","",groupe,mode);
			listeadd("WorldDisney","",groupe,mode);
			listeadd("WorldEdit","",groupe,mode);
			listeadd("WorldEM","",groupe,mode);
			listeadd("WorldEmbryo","",groupe,mode);
			listeadd("WorldEmbryo2","",groupe,mode);
			listeadd("WorldEmbryo3","",groupe,mode);
			listeadd("WorldGSM","",groupe,mode);
			listeadd("Worldidounet","",groupe,mode);
			listeadd("WorldMap","",groupe,mode);
			listeadd("worldofmoh","",groupe,mode);
			listeadd("Worldy","",groupe,mode);
			listeadd("World_Embryo","",groupe,mode);
			listeadd("Wta","",groupe,mode);
			listeadd("YoheiTakebe","",groupe,mode);
			listeadd("_CodeGeass_","",groupe,mode);
		}
		groupe = "Flo"; color = "#ADA96E"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-Luffy","",groupe,mode);
			listeadd("-Nami","",groupe,mode);
			listeadd("-Zocco","",groupe,mode);
			listeadd("-[Lucile]-","",groupe,mode);
			listeadd("0Ia","",groupe,mode);
			listeadd("0la","",groupe,mode);
			listeadd("0nePiece","",groupe,mode);
			listeadd("2jssukogzbD","",groupe,mode);
			listeadd("Adjuchas","",groupe,mode);
			listeadd("Adversaire","",groupe,mode);
			listeadd("Age-War-Star","",groupe,mode);
			listeadd("Agglomeration","",groupe,mode);
			listeadd("Aimant","",groupe,mode);
			listeadd("Alban","",groupe,mode);
			listeadd("Albanie","",groupe,mode);
			listeadd("Altina","",groupe,mode);
			listeadd("AneIka","",groupe,mode);
			listeadd("Aqua-Luffy","",groupe,mode);
			listeadd("Ashiko","",groupe,mode);
			listeadd("Astalavista","",groupe,mode);
			listeadd("Audeline","",groupe,mode);
			listeadd("aurefire","",groupe,mode);
			listeadd("aurelien","",groupe,mode);
			listeadd("Aventurier","",groupe,mode);
			listeadd("Avoir","",groupe,mode);
			listeadd("Avorton","",groupe,mode);
			listeadd("Badminton","",groupe,mode);
			listeadd("Bandai","",groupe,mode);
			listeadd("Baratie","",groupe,mode);
			listeadd("Beaute","",groupe,mode);
			listeadd("Beige","",groupe,mode);
			listeadd("Ben-Af","",groupe,mode);
			listeadd("Binch","",groupe,mode);
			listeadd("Bokujyou","",groupe,mode);
			listeadd("Bomberman-pengu","",groupe,mode);
			listeadd("Bombermanpengu","",groupe,mode);
			listeadd("Bomberman_pengu","",groupe,mode);
			listeadd("Bosy","",groupe,mode);
			listeadd("Bracelet","",groupe,mode);
			listeadd("Briefing","",groupe,mode);
			listeadd("Brouillon","",groupe,mode);
			listeadd("Buddy","",groupe,mode);
			listeadd("Buny","",groupe,mode);
			listeadd("Burst_Frakasse","",groupe,mode);
			listeadd("Calill","",groupe,mode);
			listeadd("Camie","",groupe,mode);
			listeadd("CamilImans","",groupe,mode);
			listeadd("Cantine","",groupe,mode);
			listeadd("CeIipa","",groupe,mode);
			listeadd("Cerruti","",groupe,mode);
			listeadd("Chamallot","",groupe,mode);
			listeadd("Chamalot","",groupe,mode);
			listeadd("Chambre","",groupe,mode);
			listeadd("Charmante","",groupe,mode);
			listeadd("Charnul","",groupe,mode);
			listeadd("Chibi-trunks","",groupe,mode);
			listeadd("Chocobide","",groupe,mode);
			listeadd("Chocobodoux","",groupe,mode);
			listeadd("Chocobodur","",groupe,mode);
			listeadd("Chopper-","",groupe,mode);
			listeadd("Chronometre","",groupe,mode);
			listeadd("CIavier","",groupe,mode);
			listeadd("cirque","",groupe,mode);
			listeadd("CisIa-vaincra","",groupe,mode);
			listeadd("Clamser","",groupe,mode);
			listeadd("Combattant","",groupe,mode);
			listeadd("Compliment","",groupe,mode);
			listeadd("Condensation","",groupe,mode);
			listeadd("Connexion","",groupe,mode);
			listeadd("Correlation","",groupe,mode);
			listeadd("Cosmonaute","",groupe,mode);
			listeadd("Courageux","",groupe,mode);
			listeadd("Craie","",groupe,mode);
			listeadd("Croquis","",groupe,mode);
			listeadd("Cuty","",groupe,mode);
			listeadd("Daay","",groupe,mode);
			listeadd("Dairadatzu","",groupe,mode);
			listeadd("Daku","",groupe,mode);
			listeadd("Datte","",groupe,mode);
			listeadd("Daysoler","",groupe,mode);
			listeadd("Dbzgokussj1","",groupe,mode);
			listeadd("DbzGokussj2","",groupe,mode);
			listeadd("Dbzgokussj3","",groupe,mode);
			listeadd("Dbzgoyark","",groupe,mode);
			listeadd("DBZIW","",groupe,mode);
			listeadd("Defequer","",groupe,mode);
			listeadd("Defragmentation","",groupe,mode);
			listeadd("Degueu","",groupe,mode);
			listeadd("Dicton","",groupe,mode);
			listeadd("Diner","",groupe,mode);
			listeadd("Djibril_Cisse_","",groupe,mode);
			listeadd("Dojutsu","",groupe,mode);
			listeadd("Domenix","",groupe,mode);
			listeadd("Domingos","",groupe,mode);
			listeadd("Douglase","",groupe,mode);
			listeadd("Draco","",groupe,mode);
			listeadd("DragonBaIlZ","",groupe,mode);
			listeadd("Drapeau","",groupe,mode);
			listeadd("Duon","",groupe,mode);
			listeadd("Ejaculer","",groupe,mode);
			listeadd("ELseve","",groupe,mode);
			listeadd("Evaporation","",groupe,mode);
			listeadd("Evelyne-Dheliat","",groupe,mode);
			listeadd("Eventail","",groupe,mode);
			listeadd("Faucondor","",groupe,mode);
			listeadd("Fiora","",groupe,mode);
			listeadd("FIorinho","",groupe,mode);
			listeadd("FIowin","",groupe,mode);
			listeadd("Firelord","",groupe,mode);
			listeadd("Flobide","",groupe,mode);
			listeadd("Floden","",groupe,mode);
			listeadd("Florensia","",groupe,mode);
			listeadd("Floyyy","",groupe,mode);
			listeadd("Flo_Flo_","",groupe,mode);
			listeadd("Footing","",groupe,mode);
			listeadd("Fraicheur","",groupe,mode);
			listeadd("Franck_Ribery_","",groupe,mode);
			listeadd("Franprix","",groupe,mode);
			listeadd("Freeze","",groupe,mode);
			listeadd("Fridu","",groupe,mode);
			listeadd("Fukumibari","",groupe,mode);
			listeadd("ganja","",groupe,mode);
			listeadd("Ganmen","",groupe,mode);
			listeadd("Genial-O","",groupe,mode);
			listeadd("Geppou","",groupe,mode);
			listeadd("Getafe","",groupe,mode);
			listeadd("Gigaflash","",groupe,mode);
			listeadd("Gigot","",groupe,mode);
			listeadd("GoaI","",groupe,mode);
			listeadd("Gohan_ssj","",groupe,mode);
			listeadd("Goku-SSJ1","",groupe,mode);
			listeadd("goku-ssj2","",groupe,mode);
			listeadd("Goldenl4","",groupe,mode);
			listeadd("Gomu_Gomu_No","",groupe,mode);
			listeadd("Grandline","",groupe,mode);
			listeadd("Grele","",groupe,mode);
			listeadd("GroIand","",groupe,mode);
			listeadd("Haruhicard","",groupe,mode);
			listeadd("Heho","",groupe,mode);
			listeadd("Hija","",groupe,mode);
			listeadd("Hikifune","",groupe,mode);
			listeadd("Hogback","",groupe,mode);
			listeadd("Humeur","",groupe,mode);
			listeadd("HUMOOOUUUUUUUR","",groupe,mode);
			listeadd("Intuition","",groupe,mode);
			listeadd("Iroh","",groupe,mode);
			listeadd("Ishmahri","",groupe,mode);
			listeadd("Iznogood","",groupe,mode);
			listeadd("JALC","",groupe,mode);
			listeadd("Jammer","",groupe,mode);
			listeadd("Jian","",groupe,mode);
			listeadd("Jitte","",groupe,mode);
			listeadd("Jogging","",groupe,mode);
			listeadd("Joss06","",groupe,mode);
			listeadd("Joyau","",groupe,mode);
			listeadd("jupe","",groupe,mode);
			listeadd("JvFox","",groupe,mode);
			listeadd("Kaginawa","",groupe,mode);
			listeadd("Kaidou","",groupe,mode);
			listeadd("Kakashi","",groupe,mode);
			listeadd("Kakounolo","",groupe,mode);
			listeadd("Kamayari","",groupe,mode);
			listeadd("Kami-E","",groupe,mode);
			listeadd("Kidnapped","",groupe,mode);
			listeadd("Kiho","",groupe,mode);
			listeadd("KiIl","",groupe,mode);
			listeadd("KiIler","",groupe,mode);
			listeadd("Kiku","",groupe,mode);
			listeadd("KriIlin","",groupe,mode);
			listeadd("Lazzu","",groupe,mode);
			listeadd("Lechero","",groupe,mode);
			listeadd("Legendary","",groupe,mode);
			listeadd("Librairie","",groupe,mode);
			listeadd("Logia","",groupe,mode);
			listeadd("Loir","",groupe,mode);
			listeadd("Loire","",groupe,mode);
			listeadd("Loleur","",groupe,mode);
			listeadd("looka","",groupe,mode);
			listeadd("Lorik_Cana_","",groupe,mode);
			listeadd("Lucile","",groupe,mode);
			listeadd("Luffy-","",groupe,mode);
			listeadd("Luffy_pirate","",groupe,mode);
			listeadd("Luge","",groupe,mode);
			listeadd("Mafuba","",groupe,mode);
			listeadd("Mairie","",groupe,mode);
			listeadd("Makenkosappo","",groupe,mode);
			listeadd("MarsupiIami","",groupe,mode);
			listeadd("Massilia","",groupe,mode);
			listeadd("Master_Cooler","",groupe,mode);
			listeadd("Matao","",groupe,mode);
			listeadd("Maxwell","",groupe,mode);
			listeadd("Mayoshi","",groupe,mode);
			listeadd("Megalopole","",groupe,mode);
			listeadd("MentaIi","",groupe,mode);
			listeadd("Metamorphose","",groupe,mode);
			listeadd("Metier","",groupe,mode);
			listeadd("Metropole","",groupe,mode);
			listeadd("Metsubushi","",groupe,mode);
			listeadd("Micmac","",groupe,mode);
			listeadd("Micromegas","",groupe,mode);
			listeadd("Middlesbrough","",groupe,mode);
			listeadd("Mignonne","",groupe,mode);
			listeadd("MinibIob","",groupe,mode);
			listeadd("Mokuton","",groupe,mode);
			listeadd("MonkeyD_Flo","",groupe,mode);
			listeadd("Mort_SangIante_","",groupe,mode);
			listeadd("MrPopo","",groupe,mode);
			listeadd("Mr_Bou","",groupe,mode);
			listeadd("Mutaito","",groupe,mode);
			listeadd("Nakama","",groupe,mode);
			listeadd("Naml","",groupe,mode);
			listeadd("Nassim","",groupe,mode);
			listeadd("Nealuchi","",groupe,mode);
			listeadd("Nickou","",groupe,mode);
			listeadd("NicoRobin","",groupe,mode);
			listeadd("Nightmare_Luffy","",groupe,mode);
			listeadd("Nikola","",groupe,mode);
			listeadd("O-Part","",groupe,mode);
			listeadd("Odin_XIII","",groupe,mode);
			listeadd("OmKiLLer","",groupe,mode);
			listeadd("ONEPlECE","",groupe,mode);
			listeadd("Oofball","",groupe,mode);
			listeadd("Ougon_Rifle","",groupe,mode);
			listeadd("Owa","",groupe,mode);
			listeadd("Paganelli","",groupe,mode);
			listeadd("PaIiwin","",groupe,mode);
			listeadd("Palerme","",groupe,mode);
			listeadd("Palutena","",groupe,mode);
			listeadd("Paramecia","",groupe,mode);
			listeadd("Peli","",groupe,mode);
			listeadd("PerIe","",groupe,mode);
			listeadd("Perle","",groupe,mode);
			listeadd("PES2009","",groupe,mode);
			listeadd("PES_2008","",groupe,mode);
			listeadd("PIaymobile","",groupe,mode);
			listeadd("PIaystation4","",groupe,mode);
			listeadd("Pingou","",groupe,mode);
			listeadd("Piqure","",groupe,mode);
			listeadd("PlCCOLO","",groupe,mode);
			listeadd("Police","",groupe,mode);
			listeadd("Portsmouth","",groupe,mode);
			listeadd("Potentiel","",groupe,mode);
			listeadd("Powaaaaaaa","",groupe,mode);
			listeadd("Pressentiment","",groupe,mode);
			listeadd("Prishtina","",groupe,mode);
			listeadd("Profondeur","",groupe,mode);
			listeadd("Prono","",groupe,mode);
			listeadd("Pronostic","",groupe,mode);
			listeadd("Pronostique","",groupe,mode);
			listeadd("Proverbe","",groupe,mode);
			listeadd("PuAr","",groupe,mode);
			listeadd("Pulpeuse","",groupe,mode);
			listeadd("Rafiel","",groupe,mode);
			listeadd("Rankyaku","",groupe,mode);
			listeadd("Rapthorne","",groupe,mode);
			listeadd("Ravissante","",groupe,mode);
			listeadd("Regime","",groupe,mode);
			listeadd("Registeel","",groupe,mode);
			listeadd("Renning","",groupe,mode);
			listeadd("Reparateur","",groupe,mode);
			listeadd("Reply","",groupe,mode);
			listeadd("Restauration","",groupe,mode);
			listeadd("rima","",groupe,mode);
			listeadd("Roader","",groupe,mode);
			listeadd("Roi-Cold","",groupe,mode);
			listeadd("Rokuougun","",groupe,mode);
			listeadd("Rokushiki","",groupe,mode);
			listeadd("Roronoa_Zoro_","",groupe,mode);
			listeadd("SaIem","",groupe,mode);
			listeadd("Saint-ouen","",groupe,mode);
			listeadd("Saison","",groupe,mode);
			listeadd("Salon","",groupe,mode);
			listeadd("Samir_Nasri_","",groupe,mode);
			listeadd("Sanbi","",groupe,mode);
			listeadd("Sangokou","",groupe,mode);
			listeadd("Santouryu","",groupe,mode);
			listeadd("Scans","",groupe,mode);
			listeadd("Scenario","",groupe,mode);
			listeadd("Schwarzkopf","",groupe,mode);
			listeadd("Scylla","",groupe,mode);
			listeadd("Seduisante","",groupe,mode);
			listeadd("Semestre","",groupe,mode);
			listeadd("Seshou","",groupe,mode);
			listeadd("Sheppard","",groupe,mode);
			listeadd("Shigan","",groupe,mode);
			listeadd("shoriamu","",groupe,mode);
			listeadd("Simplet","",groupe,mode);
			listeadd("SmaIlville","",groupe,mode);
			listeadd("Smoker-San","",groupe,mode);
			listeadd("Societe","",groupe,mode);
			listeadd("Soeur","",groupe,mode);
			listeadd("SoIeil","",groupe,mode);
			listeadd("Solidification","",groupe,mode);
			listeadd("Songoku","",groupe,mode);
			listeadd("Soru","",groupe,mode);
			listeadd("Sosoo","",groupe,mode);
			listeadd("Soufiane","",groupe,mode);
			listeadd("Stazer","",groupe,mode);
			listeadd("StyIepes-[00]-","",groupe,mode);
			listeadd("Sublarital","",groupe,mode);
			listeadd("Sublimation","",groupe,mode);
			listeadd("Superbide","",groupe,mode);
			listeadd("SuperFIo","",groupe,mode);
			listeadd("Superstition","",groupe,mode);
			listeadd("Super_C-13","",groupe,mode);
			listeadd("Sylo","",groupe,mode);
			listeadd("Synthese","",groupe,mode);
			listeadd("Tabbou","",groupe,mode);
			listeadd("Taiyoken","",groupe,mode);
			listeadd("TalesOfVesperia","",groupe,mode);
			listeadd("Tauroneo","",groupe,mode);
			listeadd("Tegaki","",groupe,mode);
			listeadd("Tekkai","",groupe,mode);
			listeadd("Teleportation","",groupe,mode);
			listeadd("The[best]skater","",groupe,mode);
			listeadd("Thirty","",groupe,mode);
			listeadd("Tinou","",groupe,mode);
			listeadd("Toadette3000","",groupe,mode);
			listeadd("Tom46","",groupe,mode);
			listeadd("Toro","",groupe,mode);
			listeadd("Tower","",groupe,mode);
			listeadd("Trimestre","",groupe,mode);
			listeadd("Trimphe","",groupe,mode);
			listeadd("Triomphe","",groupe,mode);
			listeadd("Tung","",groupe,mode);
			listeadd("Tunnel","",groupe,mode);
			listeadd("tysen","",groupe,mode);
			listeadd("Ulki","",groupe,mode);
			listeadd("Underline","",groupe,mode);
			listeadd("Unkut","",groupe,mode);
			listeadd("Uriner","",groupe,mode);
			listeadd("Vegapunk","",groupe,mode);
			listeadd("Vesty","",groupe,mode);
			listeadd("Villageois","",groupe,mode);
			listeadd("Visage","",groupe,mode);
			listeadd("Voeux","",groupe,mode);
			listeadd("Vostfr","",groupe,mode);
			listeadd("Voyeur","",groupe,mode);
			listeadd("Vullkanizer","",groupe,mode);
			listeadd("Waki","",groupe,mode);
			listeadd("Whistler","",groupe,mode);
			listeadd("Word-PIay","",groupe,mode);
			listeadd("Yale","",groupe,mode);
			listeadd("Yalla","",groupe,mode);
			listeadd("Yardrat","",groupe,mode);
			listeadd("Youri","",groupe,mode);
			listeadd("Zoan","",groupe,mode);
			listeadd("[Flo128]","",groupe,mode);
			listeadd("[Luigi128]","",groupe,mode);
			listeadd("_Florinho_","",groupe,mode);
		}
		groupe = "Di"; color = "#7E2217"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Azemina","",groupe,mode);
			listeadd("Azemina10","",groupe,mode);
			listeadd("Azemina11","",groupe,mode);
			listeadd("Azemina12","",groupe,mode);
			listeadd("Azemina13","",groupe,mode);
			listeadd("Azemina14","",groupe,mode);
			listeadd("Azemina15","",groupe,mode);
			listeadd("Azemina16","",groupe,mode);
			listeadd("Azemina17","",groupe,mode);
			listeadd("Azemina18","",groupe,mode);
			listeadd("Azemina19","",groupe,mode);
			listeadd("Azemina2","",groupe,mode);
			listeadd("Azemina20","",groupe,mode);
			listeadd("Azemina21","",groupe,mode);
			listeadd("Azemina22","",groupe,mode);
			listeadd("Azemina23","",groupe,mode);
			listeadd("Azemina24","",groupe,mode);
			listeadd("AZEMINA25","",groupe,mode);
			listeadd("Azemina3","",groupe,mode);
			listeadd("Azemina30","",groupe,mode);
			listeadd("Azemina4","",groupe,mode);
			listeadd("Azemina5","",groupe,mode);
			listeadd("Azemina6","",groupe,mode);
			listeadd("Azemina7","",groupe,mode);
			listeadd("Azemina8","",groupe,mode);
			listeadd("Azemina9","",groupe,mode);
			listeadd("Bicrave","",groupe,mode);
			listeadd("Bonalbide","",groupe,mode);
			listeadd("brigade_117","",groupe,mode);
			listeadd("Di-Maggio","",groupe,mode);
			listeadd("DiMaggio","",groupe,mode);
			listeadd("Di_Maggio","",groupe,mode);
			listeadd("FRM","",groupe,mode);
			listeadd("GrosJoint","",groupe,mode);
			listeadd("JUDGE_DREDD","",groupe,mode);
			listeadd("LeDi","",groupe,mode);
			listeadd("M6-9","",groupe,mode);
			listeadd("Maggio","",groupe,mode);
			listeadd("Maktone","",groupe,mode);
			listeadd("ManipuIation","",groupe,mode);
			listeadd("Manipulation","",groupe,mode);
			listeadd("Manoeuvre","",groupe,mode);
			listeadd("Mashiba","",groupe,mode);
			listeadd("Mega_Octet","",groupe,mode);
			listeadd("Poil","",groupe,mode);
			listeadd("PyJ","",groupe,mode);
			listeadd("Rivotril","",groupe,mode);
			listeadd("Sarajevo","",groupe,mode);
			listeadd("Schnouff","",groupe,mode);
			listeadd("Tarlu","",groupe,mode);
			listeadd("[DiMaggio]","",groupe,mode);
		}
		groupe = "AlerteCobra"; color = "#307D7E"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-Route66-","",groupe,mode);
			listeadd("-SilverSkyline-","",groupe,mode);
			listeadd("034Silver","",groupe,mode);
			listeadd("034_Sky","",groupe,mode);
			listeadd("39537","",groupe,mode);
			listeadd("603EDF95","",groupe,mode);
			listeadd("95-03","",groupe,mode);
			listeadd("95-19","",groupe,mode);
			listeadd("A-Train-8","",groupe,mode);
			listeadd("Ace_Combat59","",groupe,mode);
			listeadd("Acura_NSX","",groupe,mode);
			listeadd("AlerteCobra","",groupe,mode);
			listeadd("Allemagne_","",groupe,mode);
			listeadd("AnGeL_In_Sky","",groupe,mode);
			listeadd("Bahrein","",groupe,mode);
			listeadd("BaronRouge[JV]","",groupe,mode);
			listeadd("Baron_Rouge59","",groupe,mode);
			listeadd("BeauGosse63","",groupe,mode);
			listeadd("BTCC","",groupe,mode);
			listeadd("CrooKlynClan","",groupe,mode);
			listeadd("DarkSky3","",groupe,mode);
			listeadd("David_Coulthard","",groupe,mode);
			listeadd("Diablisme","",groupe,mode);
			listeadd("Diablotin_","",groupe,mode);
			listeadd("Donots2004","",groupe,mode);
			listeadd("DouzeXII","",groupe,mode);
			listeadd("Dragster-V4","",groupe,mode);
			listeadd("Eagle_Talon","",groupe,mode);
			listeadd("El_DiaBlo95","",groupe,mode);
			listeadd("F1-Le-Fou","",groupe,mode);
			listeadd("F1-Schumi","",groupe,mode);
			listeadd("F12003GA","",groupe,mode);
			listeadd("F1Nounette","",groupe,mode);
			listeadd("F1[]2003GA","",groupe,mode);
			listeadd("F1_Le_Fou","",groupe,mode);
			listeadd("Falco2007","",groupe,mode);
			listeadd("FiatGrandePunto","",groupe,mode);
			listeadd("Fiatounet","",groupe,mode);
			listeadd("Fiat_Doblo","",groupe,mode);
			listeadd("Gare_Du_Nord","",groupe,mode);
			listeadd("GhoooosT95","",groupe,mode);
			listeadd("GoldenPaceCar","",groupe,mode);
			listeadd("GoldenShenron","",groupe,mode);
			listeadd("Gran_Turismo59","",groupe,mode);
			listeadd("GTA_Skyline","",groupe,mode);
			listeadd("Honda2004","",groupe,mode);
			listeadd("Honda_RaceCar","",groupe,mode);
			listeadd("Ice_Cobra","",groupe,mode);
			listeadd("JadDaKiss","",groupe,mode);
			listeadd("John-Shaft","",groupe,mode);
			listeadd("LoveStreets","",groupe,mode);
			listeadd("Mazda_RX-7","",groupe,mode);
			listeadd("MIB_008","",groupe,mode);
			listeadd("MisterVanille","",groupe,mode);
			listeadd("Modelisme_","",groupe,mode);
			listeadd("NextelCup","",groupe,mode);
			listeadd("NissanGT-R07","",groupe,mode);
			listeadd("PaceCar59","",groupe,mode);
			listeadd("PaceCar_","",groupe,mode);
			listeadd("Paddock_F1","",groupe,mode);
			listeadd("ParallelLines","",groupe,mode);
			listeadd("Patrouille95","",groupe,mode);
			listeadd("Player28","",groupe,mode);
			listeadd("Poolite","",groupe,mode);
			listeadd("RaceFilters","",groupe,mode);
			listeadd("RadiatorSprings","",groupe,mode);
			listeadd("RBS59","",groupe,mode);
			listeadd("Red_Bull-Silver","",groupe,mode);
			listeadd("Red_Bull_F1Team","",groupe,mode);
			listeadd("Red_Bull_Racing","",groupe,mode);
			listeadd("RER_A","",groupe,mode);
			listeadd("RER_B","",groupe,mode);
			listeadd("RER_C","",groupe,mode);
			listeadd("Rien-A-Cirer","",groupe,mode);
			listeadd("Sepang","",groupe,mode);
			listeadd("Silver","",groupe,mode);
			listeadd("SilverSkyline","",groupe,mode);
			listeadd("SilverTeam","",groupe,mode);
			listeadd("Silver_GTA","",groupe,mode);
			listeadd("Skyline-Le-Fou","",groupe,mode);
			listeadd("SkylineR34J","",groupe,mode);
			listeadd("SkylineR34J[2]","",groupe,mode);
			listeadd("Super_RBS","",groupe,mode);
			listeadd("T313","",groupe,mode);
			listeadd("Toro_Rosso","",groupe,mode);
			listeadd("TouristEnBois","",groupe,mode);
			listeadd("Touristenmousse","",groupe,mode);
			listeadd("Vive-Toyota","",groupe,mode);
			listeadd("Wario95","",groupe,mode);
			listeadd("Witch_Hunter","",groupe,mode);
			listeadd("[-AlerteCobra-]","",groupe,mode);
			listeadd("[-K2000-]","",groupe,mode);
			listeadd("[-Silver59-]","",groupe,mode);
			listeadd("[ChoPPers03]","",groupe,mode);
			listeadd("[Cobra_11]","",groupe,mode);
			listeadd("[DUCK]F1","",groupe,mode);
			listeadd("[f12003ga]","",groupe,mode);
			listeadd("[SheeK]","",groupe,mode);
			listeadd("_JadDaKiss_","",groupe,mode);
			listeadd("_LACROIX_","",groupe,mode);
			listeadd("_OutKast_","",groupe,mode);
			listeadd("_SheeK_","",groupe,mode);
			listeadd("_TheGame_","",groupe,mode);
		}
		groupe = "Pap"; color = "#800517"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Apotre_De_Jesus","",groupe,mode);
			listeadd("Dash_Will","",groupe,mode);
			listeadd("Deux_De_Pique","",groupe,mode);
			listeadd("Dr__Goomba","",groupe,mode);
			listeadd("Jesus","",groupe,mode);
			listeadd("Jouissance","",groupe,mode);
			listeadd("king_of_soul","",groupe,mode);
			listeadd("lgloo","",groupe,mode);
			listeadd("Lord-William","",groupe,mode);
			listeadd("Luigi_Superstar","",groupe,mode);
			listeadd("MuseCity","",groupe,mode);
			listeadd("MyMusic","",groupe,mode);
			listeadd("Nimau","",groupe,mode);
			listeadd("Pap-Bowser","",groupe,mode);
			listeadd("Pap-Luigi","",groupe,mode);
			listeadd("Pap-Mario","",groupe,mode);
			listeadd("Pap-Mario2","",groupe,mode);
			listeadd("Pap-Noel","",groupe,mode);
			listeadd("Pap-Nouvel-An","",groupe,mode);
			listeadd("Pap-Prout","",groupe,mode);
			listeadd("papmario","",groupe,mode);
			listeadd("Pap_Mario","",groupe,mode);
			listeadd("peach4000","",groupe,mode);
			listeadd("Pittsburg","",groupe,mode);
			listeadd("Pittsburgh","",groupe,mode);
			listeadd("Prouty","",groupe,mode);
			listeadd("Republic","",groupe,mode);
			listeadd("RUKlA","",groupe,mode);
			listeadd("Smalltoad","",groupe,mode);
			listeadd("Talltoad","",groupe,mode);
			listeadd("Tinytoadette","",groupe,mode);
			listeadd("Tym","",groupe,mode);
			listeadd("Yoshi_Superstar","",groupe,mode);
			listeadd("[-PaP-]","",groupe,mode);
			listeadd("[mario12B]","",groupe,mode);
		}
		groupe = "[mario128]"; color = "#C12869"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-Eri-Sawachika-","",groupe,mode);
			listeadd("-Hina-","",groupe,mode);
			listeadd("-Sakura-","",groupe,mode);
			listeadd("-Shaolan-","",groupe,mode);
			listeadd("104000","",groupe,mode);
			listeadd("304","",groupe,mode);
			listeadd("Achernar","",groupe,mode);
			listeadd("Acrux","",groupe,mode);
			listeadd("Adhara","",groupe,mode);
			listeadd("Aisaka_Taiga","",groupe,mode);
			listeadd("Akira-Takano","",groupe,mode);
			listeadd("ALEXANDRIE","",groupe,mode);
			listeadd("AllSunday","",groupe,mode);
			listeadd("Alpha_Centauri","",groupe,mode);
			listeadd("Antarctique","",groupe,mode);
			listeadd("Anya_Alstreim","",groupe,mode);
			listeadd("ARCTIQUE","",groupe,mode);
			listeadd("Arisa_Mizuhara","",groupe,mode);
			listeadd("Ayane_Kasumi","",groupe,mode);
			listeadd("Ayu_Tsukimiya","",groupe,mode);
			listeadd("Banana-Croco","",groupe,mode);
			listeadd("Bardiche","",groupe,mode);
			listeadd("BRANLER","",groupe,mode);
			listeadd("Burj_Dubai","",groupe,mode);
			listeadd("Caliburn","",groupe,mode);
			listeadd("Canopus","",groupe,mode);
			listeadd("Capella","",groupe,mode);
			listeadd("CAUCHE-MAR","",groupe,mode);
			listeadd("Chiaki_Minami","",groupe,mode);
			listeadd("Christianisme","",groupe,mode);
			listeadd("Christo","",groupe,mode);
			listeadd("Clannad","",groupe,mode);
			listeadd("Contentisme","",groupe,mode);
			listeadd("Cosplay","",groupe,mode);
			listeadd("DarK_Rondoudou","",groupe,mode);
			listeadd("Divine_Buster","",groupe,mode);
			listeadd("Docteur_Cid","",groupe,mode);
			listeadd("Dojinshi","",groupe,mode);
			listeadd("Dokuro_Mitsukai","",groupe,mode);
			listeadd("Dysnomie","",groupe,mode);
			listeadd("Ending","",groupe,mode);
			listeadd("Eri-Sawashika","",groupe,mode);
			listeadd("Eureka_seveN","",groupe,mode);
			listeadd("EXCALIBORG","",groupe,mode);
			listeadd("FFXII_Vaan_Ashe","",groupe,mode);
			listeadd("FFXVIII","",groupe,mode);
			listeadd("fille_qui_pompe","",groupe,mode);
			listeadd("Flame_Haze","",groupe,mode);
			listeadd("Fomalhaut","",groupe,mode);
			listeadd("Giga-Mario","",groupe,mode);
			listeadd("Glenat","",groupe,mode);
			listeadd("Golden_Darkness","",groupe,mode);
			listeadd("Golgohma","",groupe,mode);
			listeadd("Graf_Eisen","",groupe,mode);
			listeadd("Hadar","",groupe,mode);
			listeadd("Hanai-Haruki","",groupe,mode);
			listeadd("Haribell","",groupe,mode);
			listeadd("Harribel","",groupe,mode);
			listeadd("Hinamori_Momo","",groupe,mode);
			listeadd("Hoffenheim","",groupe,mode);
			listeadd("Hokkaido","",groupe,mode);
			listeadd("Honshu","",groupe,mode);
			listeadd("Hymne","",groupe,mode);
			listeadd("INFERNO-MAR","",groupe,mode);
			listeadd("Irina_Sykes","",groupe,mode);
			listeadd("Japonaise","",groupe,mode);
			listeadd("Kagami_Hiiragi","",groupe,mode);
			listeadd("Kanako-Urashima","",groupe,mode);
			listeadd("Karen-Ichijo","",groupe,mode);
			listeadd("Karen_Ortensia","",groupe,mode);
			listeadd("Killzone","",groupe,mode);
			listeadd("Kiyoura","",groupe,mode);
			listeadd("Knowledge","",groupe,mode);
			listeadd("Kokonoe","",groupe,mode);
			listeadd("Kokonoe_Rin","",groupe,mode);
			listeadd("Komodo","",groupe,mode);
			listeadd("Kotomi","",groupe,mode);
			listeadd("Ku-Fei","",groupe,mode);
			listeadd("Kurosaki_Isshin","",groupe,mode);
			listeadd("Laevatein","",groupe,mode);
			listeadd("Lala","",groupe,mode);
			listeadd("Lala_Satalin","",groupe,mode);
			listeadd("La_Vipere","",groupe,mode);
			listeadd("Le_Spectre","",groupe,mode);
			listeadd("Louise2","",groupe,mode);
			listeadd("Love_Naru","",groupe,mode);
			listeadd("lria","",groupe,mode);
			listeadd("Lucky","",groupe,mode);
			listeadd("Lunar_Edomae","",groupe,mode);
			listeadd("Mahora","",groupe,mode);
			listeadd("Mai_Kawasumi","",groupe,mode);
			listeadd("Mario_and_Darko","",groupe,mode);
			listeadd("MariO_le_RageuX","",groupe,mode);
			listeadd("Mikoto-Suou","",groupe,mode);
			listeadd("Mikuru","",groupe,mode);
			listeadd("Minami-ke","",groupe,mode);
			listeadd("Miyako_Miyamura","",groupe,mode);
			listeadd("Miyazaki-Nodoka","",groupe,mode);
			listeadd("Motoko-Aoyama","",groupe,mode);
			listeadd("My-HiME","",groupe,mode);
			listeadd("My-Otome","",groupe,mode);
			listeadd("My-Otome-Zwei","",groupe,mode);
			listeadd("My-ZHiME","",groupe,mode);
			listeadd("My-ZHiME-Zwei","",groupe,mode);
			listeadd("Naha","",groupe,mode);
			listeadd("Nanaka","",groupe,mode);
			listeadd("Naru-Narusegawa","",groupe,mode);
			listeadd("Nayuki_Minase","",groupe,mode);
			listeadd("Nelieru","",groupe,mode);
			listeadd("Noitora","",groupe,mode);
			listeadd("OBAMArio","",groupe,mode);
			listeadd("Octolacanthe","",groupe,mode);
			listeadd("Oji-Karasuma","",groupe,mode);
			listeadd("opening","",groupe,mode);
			listeadd("overdrive[siN]","",groupe,mode);
			listeadd("Polaire","",groupe,mode);
			listeadd("Pyrodactilus","",groupe,mode);
			listeadd("Quidam","",groupe,mode);
			listeadd("Raising_Heart","",groupe,mode);
			listeadd("Ridorana","",groupe,mode);
			listeadd("Rigel_Kentaurus","",groupe,mode);
			listeadd("Rinnegan","",groupe,mode);
			listeadd("RIVAOL_A_DIT","",groupe,mode);
			listeadd("Rukia","",groupe,mode);
			listeadd("sagaT","",groupe,mode);
			listeadd("Sakurazaki","",groupe,mode);
			listeadd("San_Seto","",groupe,mode);
			listeadd("Sawatari_Izumi","",groupe,mode);
			listeadd("Sayuri_Kurata","",groupe,mode);
			listeadd("School-Rumble","",groupe,mode);
			listeadd("Sexy","",groupe,mode);
			listeadd("Seychelles","",groupe,mode);
			listeadd("Shana","",groupe,mode);
			listeadd("Shanghai","",groupe,mode);
			listeadd("Shirafune","",groupe,mode);
			listeadd("Shueisha","",groupe,mode);
			listeadd("Shuyin_Lenne","",groupe,mode);
			listeadd("Siesta","",groupe,mode);
			listeadd("SnH","",groupe,mode);
			listeadd("Sokatsui","",groupe,mode);
			listeadd("SOMBRE-MAR","",groupe,mode);
			listeadd("Soren_Sokatsui","",groupe,mode);
			listeadd("SOS-Dan","",groupe,mode);
			listeadd("Soul_Society","",groupe,mode);
			listeadd("stowe","",groupe,mode);
			listeadd("Superficie","",groupe,mode);
			listeadd("Taiwan","",groupe,mode);
			listeadd("Tenma-Tsukamoto","",groupe,mode);
			listeadd("The_Lightning","",groupe,mode);
			listeadd("tidus99","",groupe,mode);
			listeadd("Tiffiania","",groupe,mode);
			listeadd("Type-moon","",groupe,mode);
			listeadd("Vivio","",groupe,mode);
			listeadd("YakumoTsukamoto","",groupe,mode);
			listeadd("yaYata","",groupe,mode);
			listeadd("Yin","",groupe,mode);
			listeadd("YUNA_JE_T-AIME","",groupe,mode);
			listeadd("Yuna_POWAA","",groupe,mode);
			listeadd("Zaydor","",groupe,mode);
			listeadd("Zertina","",groupe,mode);
			listeadd("Zitoon","",groupe,mode);
			listeadd("[eri-sawachika]","",groupe,mode);
			listeadd("[Harima-Kenji]","",groupe,mode);
			listeadd("[mario128kick]","",groupe,mode);
			listeadd("[mario128]","",groupe,mode);
			listeadd("[SaluTsalope]","",groupe,mode);
			listeadd("]Edward-Elric[","",groupe,mode);
		}
		groupe = "Iverson"; color = "#B93B8F"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("By_Coco","",groupe,mode);
			listeadd("c0co","",groupe,mode);
			listeadd("ChabanDelmas","",groupe,mode);
			listeadd("chilie","",groupe,mode);
			listeadd("clark_gaybeul","",groupe,mode);
			listeadd("Coco_Killer","",groupe,mode);
			listeadd("coco_le_boss","",groupe,mode);
			listeadd("Coco_Noix","",groupe,mode);
			listeadd("CowCow1er","",groupe,mode);
			listeadd("Dark_c0c0","",groupe,mode);
			listeadd("Dynasty","",groupe,mode);
			listeadd("emeka","",groupe,mode);
			listeadd("Garth","",groupe,mode);
			listeadd("gilloux","",groupe,mode);
			listeadd("grandvendeur","",groupe,mode);
			listeadd("Gravesen","",groupe,mode);
			listeadd("gun_power","",groupe,mode);
			listeadd("HamiltonLewis","",groupe,mode);
			listeadd("Iverson02","",groupe,mode);
			listeadd("Iverson02a","",groupe,mode);
			listeadd("Iverson91","",groupe,mode);
			listeadd("Janvier","",groupe,mode);
			listeadd("Kebab","",groupe,mode);
			listeadd("lapinVicieux","",groupe,mode);
			listeadd("lensoi02","",groupe,mode);
			listeadd("MercedesMcLaren","",groupe,mode);
			listeadd("Papaye","",groupe,mode);
			listeadd("Sangohan","",groupe,mode);
			listeadd("Scobra","",groupe,mode);
			listeadd("Sela","",groupe,mode);
			listeadd("SonGokuSSJ3","",groupe,mode);
			listeadd("Twix","",groupe,mode);
			listeadd("[-Menez-]","",groupe,mode);
			listeadd("[AirForce]_02","",groupe,mode);
			listeadd("[Wade]","",groupe,mode);
		}
		groupe = "Tiny"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-Tinytoon-","",groupe,mode);
			listeadd("AnnivClafou","",groupe,mode);
			listeadd("BlaBIa","",groupe,mode);
			listeadd("By_Tiny","",groupe,mode);
			listeadd("By_Tinytoad","",groupe,mode);
			listeadd("Canucks","",groupe,mode);
			listeadd("Center","",groupe,mode);
			listeadd("DeIphine","",groupe,mode);
			listeadd("DKRDS","",groupe,mode);
			listeadd("Jtm-Pap","",groupe,mode);
			listeadd("MP8","",groupe,mode);
			listeadd("MSCF","",groupe,mode);
			listeadd("NoMoreSorrow","",groupe,mode);
			listeadd("Second","",groupe,mode);
			listeadd("Senateurs","",groupe,mode);
			listeadd("Taynay","",groupe,mode);
			listeadd("Tinytoad","",groupe,mode);
			listeadd("Tinyy","",groupe,mode);
			listeadd("Tiny_Toad","",groupe,mode);
			listeadd("ZPH","",groupe,mode);
			listeadd("[Tinytoad]","",groupe,mode);
			listeadd("[Tiny]","",groupe,mode);
			listeadd("_Tiny_","",groupe,mode);
		}
		groupe = "Frambi"; color = "#C34A2C"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-MJ-","",groupe,mode);
			listeadd("frambi","",groupe,mode);
			listeadd("framboisine73","",groupe,mode);
			listeadd("framboos","",groupe,mode);
			listeadd("patateparano","",groupe,mode);
			listeadd("pittoresque","",groupe,mode);
			listeadd("_marie-jeanne_","",groupe,mode);
		}
		groupe = "Yazz"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Cirno","",groupe,mode);
			listeadd("Daiyousei","",groupe,mode);
			listeadd("Daytour","",groupe,mode);
			listeadd("fire","",groupe,mode);
			listeadd("FLO","",groupe,mode);
			listeadd("Flow","",groupe,mode);
			listeadd("Hisaka","",groupe,mode);
			listeadd("Hourai","",groupe,mode);
			listeadd("Koishi","",groupe,mode);
			listeadd("LostMyMusic","",groupe,mode);
			listeadd("Lyrica","",groupe,mode);
			listeadd("Margatroid","",groupe,mode);
			listeadd("Mine","",groupe,mode);
			listeadd("Prismriver","",groupe,mode);
			listeadd("ps2_matos","",groupe,mode);
			listeadd("Thunder","",groupe,mode);
			listeadd("Voltor","",groupe,mode);
			listeadd("Yazz","",groupe,mode);
		}
		groupe = "Benji"; color = "#461B7E"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("gf4","",groupe,mode);
			listeadd("-gf4-","",groupe,mode);
			listeadd("gf7 ","",groupe,mode);
			listeadd("gf8","",groupe,mode);
			listeadd("-gf9-","",groupe,mode);
			listeadd("-gf10-","",groupe,mode);
			listeadd("Beniwan","",groupe,mode);
			listeadd("BeniwanGF","",groupe,mode);
			listeadd("BeniwanKiloByte","",groupe,mode);
			listeadd("BeniwanVador","",groupe,mode);
			listeadd("TheMussel","",groupe,mode);
			listeadd("TheDarkMussel","",groupe,mode);
			listeadd("UltiamteMussel","",groupe,mode);
			listeadd("LancelotDuSac","",groupe,mode);
			listeadd("LancelotDuTalc","",groupe,mode);
			listeadd("Abrasif","",groupe,mode);
			listeadd("Fred-Weasley","",groupe,mode);
			listeadd("BabyBen","",groupe,mode);
			listeadd("Jiben-","",groupe,mode);
			listeadd("Benji-","",groupe,mode);
			listeadd("[monkey-D-Dubi]","",groupe,mode);
			listeadd("[LordVoldemort]","",groupe,mode);
			listeadd("SquareRoot","",groupe,mode);
			listeadd("rezizi et redzizzi","",groupe,mode);
			listeadd("LordRevan","",groupe,mode);
			listeadd("Maitre_Gf4","",groupe,mode);
			listeadd("LordGf4","",groupe,mode);
			listeadd("Fee-Toi-Susie","",groupe,mode);
			listeadd("Minus01","",groupe,mode);
			listeadd("MamieCastruc","",groupe,mode);
		}
		groupe = "Kryn"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Kryn66","",groupe,mode);
			listeadd("Kryn666","",groupe,mode);
			listeadd("Krynounet","",groupe,mode);
			listeadd("Ikke","",groupe,mode);
		}
		groupe = "K"; color = "#7E3117"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Jin_chon_rei","",groupe,mode);
			listeadd("uncut","",groupe,mode);
			listeadd("K9999","",groupe,mode);
			listeadd("Jabba_the_butt","",groupe,mode);
			listeadd("Kazama_sogetsu","",groupe,mode);
			listeadd("Kazama_kazuki","",groupe,mode);
			listeadd("Geese_howard","",groupe,mode);
		}
		groupe = "roddy"; color = "#817339"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("cxxxface","",groupe,mode);
			listeadd("bahamutlagoon","",groupe,mode);
			listeadd("tueurdeforumer","",groupe,mode);
			listeadd("agamemnon","",groupe,mode);
			listeadd("esper","",groupe,mode);
			listeadd("starsiegeTribes","",groupe,mode);
			listeadd("terrorcops","",groupe,mode);
			listeadd("roddy6(banni)","",groupe,mode);
			listeadd("-roddy-","",groupe,mode);
			listeadd("roddy5","",groupe,mode);
			listeadd("PSYCHO-MANTIS","",groupe,mode);
			listeadd("evilmod","",groupe,mode);
			listeadd("evilribler","",groupe,mode);
			listeadd("evildigit","",groupe,mode);
			listeadd("evilgrabbes","",groupe,mode);
			listeadd("evilsagat","",groupe,mode);
			listeadd("evildsofea","",groupe,mode);
			listeadd("evilpackers","",groupe,mode);
			listeadd("evilkayris","",groupe,mode);
			listeadd("evilhametsu","",groupe,mode);
			listeadd("evilmanu_c","",groupe,mode);
			listeadd("evilfreak","",groupe,mode);
			listeadd("evilmaverick","",groupe,mode);
			listeadd("andy_bogard","",groupe,mode);
			listeadd("terry_bogard","",groupe,mode);
			listeadd("necronymph","",groupe,mode);
			listeadd("croc-roddy-le","",groupe,mode);
			listeadd("call_me_god","",groupe,mode);
			listeadd("asmodeus","",groupe,mode);
		}
		groupe = "grabbes"; color = "#348017"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("grabbes","",groupe,mode);
			listeadd("fairy_flo","",groupe,mode);
			listeadd("Heaven_Ly","",groupe,mode);
			listeadd("Raven4","",groupe,mode);
			listeadd("tini-li","",groupe,mode);
			listeadd("noony","",groupe,mode);
			listeadd("missdreft","",groupe,mode);
			listeadd("ninje","",groupe,mode);
			listeadd("imfedup","",groupe,mode);
			listeadd("flopee","",groupe,mode);
			listeadd("lafee__rosse","",groupe,mode);
			listeadd("flocon","",groupe,mode);
			listeadd("sisyphe","",groupe,mode);
			listeadd("petite_muse","",groupe,mode);
			listeadd("phoenixia","",groupe,mode);
			listeadd("dryiade","",groupe,mode);
			listeadd("-dryade-","",groupe,mode);
			listeadd("killi-grabbes","",groupe,mode);
			listeadd("flo_the_grabbes","",groupe,mode);
			listeadd("Nuptse_grabbes","",groupe,mode);
			listeadd("la_grabbes","",groupe,mode);
			listeadd("elfy_grabbes","",groupe,mode);
			listeadd("tchote_grabbes","",groupe,mode);
			listeadd("-grabbes-","",groupe,mode);
			listeadd("spidergrabbes","",groupe,mode);
			listeadd("trinity_grabbes","",groupe,mode);
			listeadd("Brolin-grabbes","",groupe,mode);
			listeadd("Caliban-grabbes","",groupe,mode);
			listeadd("Caliban","",groupe,mode);
			listeadd("malicia_bents","",groupe,mode);
			listeadd("grabouille","",groupe,mode);
			listeadd("Lamalas_grabbes","",groupe,mode);
		}
		groupe = "Cola le Fou"; color = "#7E3517"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Cola-Le-Fou","",groupe,mode);
			listeadd("Cola-le-fou2","",groupe,mode);
			listeadd("cola-xp","",groupe,mode);
			listeadd("cola-bond","",groupe,mode);
			listeadd("papa-cola","",groupe,mode);
			listeadd("papa-de-cola","",groupe,mode);
			listeadd("[BTK]Cola","",groupe,mode);
			listeadd("cola le pan","",groupe,mode);
			listeadd("peter__pan","",groupe,mode);
			listeadd("coca___cola","",groupe,mode);
			listeadd("uncut-jr","",groupe,mode);
			listeadd("Crabbes","",groupe,mode);
			listeadd("yusukee","",groupe,mode);
			listeadd("my-name-is-bond","",groupe,mode);
			listeadd("fou-de-chronium","",groupe,mode);
			listeadd("coditel","",groupe,mode);
			listeadd("terayon","",groupe,mode);
			listeadd("bladekiller2","",groupe,mode);
			listeadd("blade","",groupe,mode);
			listeadd("invisible man","",groupe,mode);
			listeadd("devil my cry 99","",groupe,mode);
			listeadd("silvers007","",groupe,mode);
			listeadd("silvers006","",groupe,mode);
			listeadd("aoc","",groupe,mode);
		}
		groupe = "Vil-e-Coyote"; color = "#E56717"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Virvolte","",groupe,mode);
			listeadd("Arc-en-Cieux","",groupe,mode);
			listeadd("Voltelune","",groupe,mode);
			listeadd("Cabriole","",groupe,mode);
			listeadd("Satan-Ticoeur","",groupe,mode);
			listeadd("Vil-e-Coyote","",groupe,mode);
		}
		groupe = "FredGT"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("FredGT","",groupe,mode);
			listeadd("Mata-Hari","",groupe,mode);
			listeadd("Lapin-magenta","",groupe,mode);
			listeadd("Ciao bello","",groupe,mode);
			listeadd("Monkey_D_debile","",groupe,mode);
		}
		groupe = "Susie"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Susi2","",groupe,mode);
			listeadd("Susie-Weasley","",groupe,mode);
			listeadd("Princesse-Susie","",groupe,mode);
			listeadd("Fee-Susie","",groupe,mode);
		}
		groupe = "spykino"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("spykino","",groupe,mode);
			listeadd("spykino2","",groupe,mode);
			listeadd("requin_blanc_2","",groupe,mode);
			listeadd("gueze","",groupe,mode);
			listeadd("albert_le5eme","",groupe,mode);
			listeadd("dark_spykino","",groupe,mode);
		}
		groupe = "Washu"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Washu","",groupe,mode);
			listeadd("Washunette","",groupe,mode);
			listeadd("Angel_Syato","",groupe,mode);
			listeadd("Angel_Washu","",groupe,mode);
			listeadd("Sasami","",groupe,mode);
			listeadd("Viveiros","",groupe,mode);
			listeadd("Viveiros13","",groupe,mode);
			listeadd("Viveiros113","",groupe,mode);
			listeadd("Ange_De_La_Nuit","",groupe,mode);
		}
		groupe = "gandara"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("gandara","",groupe,mode);
			listeadd("gandara_","",groupe,mode);
			listeadd("abannir","",groupe,mode);
			listeadd("abannir2","",groupe,mode);
			listeadd("abannir3","",groupe,mode);
			listeadd("abannir4","",groupe,mode);
		}
		groupe = "Always-Winners"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-orangina-","",groupe,mode);
			listeadd("-pcg600-","",groupe,mode);
			listeadd("Always-Winners","",groupe,mode);
			listeadd("Ambu13","",groupe,mode);
			listeadd("ambulancee","",groupe,mode);
			listeadd("Ambulancee_","",groupe,mode);
			listeadd("Ambulance_","",groupe,mode);
			listeadd("Candy_Shop","",groupe,mode);
			listeadd("Drozo","",groupe,mode);
			listeadd("elaine1612","",groupe,mode);
			listeadd("Foxriver84","",groupe,mode);
			listeadd("Hooliganz","",groupe,mode);
			listeadd("m-a-a","",groupe,mode);
			listeadd("SansRancunes","",groupe,mode);
			listeadd("SchoolBoys","",groupe,mode);
			listeadd("swat-01","",groupe,mode);
			listeadd("Vamp_","",groupe,mode);
			listeadd("Virage-Nord","",groupe,mode);
			listeadd("Virage-Sud","",groupe,mode);
			listeadd("[EricGerets]","",groupe,mode);
			listeadd("[Gangsta4life]","",groupe,mode);
		}
		groupe = "Alberforth62"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-Anonymous59","",groupe,mode);
			listeadd("-Fan_le_looser-","",groupe,mode);
			listeadd("-gogoteman-","",groupe,mode);
			listeadd("AIberforth62","",groupe,mode);
			listeadd("Alberforth62","",groupe,mode);
			listeadd("Albert_returns","",groupe,mode);
			listeadd("Anonymous69","",groupe,mode);
			listeadd("Arrancar","",groupe,mode);
			listeadd("Baladeur-CD","",groupe,mode);
			listeadd("Baladeur-MP4","",groupe,mode);
			listeadd("brieuclaracl","",groupe,mode);
			listeadd("camerupt","",groupe,mode);
			listeadd("Carla-bruni","",groupe,mode);
			listeadd("CislaS7","",groupe,mode);
			listeadd("coluche_bis","",groupe,mode);
			listeadd("D-Roy","",groupe,mode);
			listeadd("Errazage","",groupe,mode);
			listeadd("Forum-sondage","",groupe,mode);
			listeadd("Harry-potter5","",groupe,mode);
			listeadd("jeremy-lebanni","",groupe,mode);
			listeadd("Jizo","",groupe,mode);
			listeadd("klemlepaien","",groupe,mode);
			listeadd("KlemPervers","",groupe,mode);
			listeadd("Mariostrikers","",groupe,mode);
			listeadd("Messi_noeliste","",groupe,mode);
			listeadd("OMG-ROFLMAO","",groupe,mode);
			listeadd("pootresque","",groupe,mode);
			listeadd("Post-criptum","",groupe,mode);
			listeadd("Profession","",groupe,mode);
			listeadd("Tengen2","",groupe,mode);
			listeadd("Tomlabrutimento","",groupe,mode);
			listeadd("Wakizashi","",groupe,mode);
			listeadd("Warcraft-III","",groupe,mode);
			listeadd("[Iloveklem75]","",groupe,mode);
			listeadd("[latios_latias]","",groupe,mode);
			listeadd("[Sailor_moon]","",groupe,mode);
		}
		groupe = "Abalo"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("AbaIo","",groupe,mode);
			listeadd("Disturbios","",groupe,mode);
			listeadd("Emma-44","",groupe,mode);
			listeadd("Kokcharov","",groupe,mode);
			listeadd("omeyerdu44","",groupe,mode);
			listeadd("PaulineJeTaime","",groupe,mode);
			listeadd("QuentinB","",groupe,mode);
			listeadd("The_AbaIo","",groupe,mode);
			listeadd("The_Abalo","",groupe,mode);
			listeadd("The_Kaos","",groupe,mode);
			listeadd("THW-Kiel","",groupe,mode);
			listeadd("ZeitZ","",groupe,mode);
			listeadd("[Emma","",groupe,mode);
			listeadd("[[Abalo-Snake]]","",groupe,mode);
		}
		groupe = "Housni"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("H0usni","",groupe,mode);
			listeadd("Misteur_Housni","",groupe,mode);
			listeadd("NoFrags","",groupe,mode);
			listeadd("Ryukness","",groupe,mode);
			listeadd("Ryuk_-","",groupe,mode);
		}
		groupe = "Avril"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("----_______----","",groupe,mode);
			listeadd("-ANO-","",groupe,mode);
			listeadd("-Avril-","",groupe,mode);
			listeadd("-DAY-","",groupe,mode);
			listeadd("-NES-","",groupe,mode);
			listeadd("4eme","",groupe,mode);
			listeadd("69th","",groupe,mode);
			listeadd("Accouplement","",groupe,mode);
			listeadd("Ad-Astra","",groupe,mode);
			listeadd("Aerospatiale","",groupe,mode);
			listeadd("Affection","",groupe,mode);
			listeadd("Akropolis","",groupe,mode);
			listeadd("Alseid","",groupe,mode);
			listeadd("Alseides","",groupe,mode);
			listeadd("Amende","",groupe,mode);
			listeadd("anormal","",groupe,mode);
			listeadd("Apobiose","",groupe,mode);
			listeadd("Art","",groupe,mode);
			listeadd("Artificielle","",groupe,mode);
			listeadd("AsticotAuMiel","",groupe,mode);
			listeadd("Atmospherique","",groupe,mode);
			listeadd("Autrefois","",groupe,mode);
			listeadd("Avril","",groupe,mode);
			listeadd("Avril_desu","",groupe,mode);
			listeadd("Avril_Forever","",groupe,mode);
			listeadd("Awesome","",groupe,mode);
			listeadd("BabieYunie","",groupe,mode);
			listeadd("baisons","",groupe,mode);
			listeadd("Baladeur-MP3","",groupe,mode);
			listeadd("Bayrou_Francois","",groupe,mode);
			listeadd("Bioabsorption","",groupe,mode);
			listeadd("Brea","",groupe,mode);
			listeadd("by_day","",groupe,mode);
			listeadd("catholicisme","",groupe,mode);
			listeadd("Charloutte","",groupe,mode);
			listeadd("Cherry","",groupe,mode);
			listeadd("Chloe_Stefani","",groupe,mode);
			listeadd("ChOuX-Contador","",groupe,mode);
			listeadd("Complicite","",groupe,mode);
			listeadd("Concussion-Kick","",groupe,mode);
			listeadd("ContaDijonPlage","",groupe,mode);
			listeadd("ContadorAiberto","",groupe,mode);
			listeadd("ContadorAlberto","",groupe,mode);
			listeadd("ContadorMariage","",groupe,mode);
			listeadd("ContadorPhenix","",groupe,mode);
			listeadd("Continuum","",groupe,mode);
			listeadd("Corboss","",groupe,mode);
			listeadd("Cosmologie","",groupe,mode);
			listeadd("Creation","",groupe,mode);
			listeadd("Croyante","",groupe,mode);
			listeadd("Cryonie","",groupe,mode);
			listeadd("Cryostasis","",groupe,mode);
			listeadd("Darksiders","",groupe,mode);
			listeadd("DAY-Bile","",groupe,mode);
			listeadd("daybile","",groupe,mode);
			listeadd("Daychay","",groupe,mode);
			listeadd("daychay-nez","",groupe,mode);
			listeadd("DaychayContador","",groupe,mode);
			listeadd("Daychay_","",groupe,mode);
			listeadd("daytaycay","",groupe,mode);
			listeadd("DAYYY","",groupe,mode);
			listeadd("day_69th","",groupe,mode);
			listeadd("Deus-Ex-3","",groupe,mode);
			listeadd("Diffraction","",groupe,mode);
			listeadd("Dijon-Plage","",groupe,mode);
			listeadd("Dioptre","",groupe,mode);
			listeadd("Doutisme","",groupe,mode);
			listeadd("Drascore","",groupe,mode);
			listeadd("Dreamweaver","",groupe,mode);
			listeadd("Dryfield","",groupe,mode);
			listeadd("e-day","",groupe,mode);
			listeadd("Eblouissante","",groupe,mode);
			listeadd("ECOTOXICOLOGIE","",groupe,mode);
			listeadd("Eevee","",groupe,mode);
			listeadd("Egerie","",groupe,mode);
			listeadd("Electrolyse","",groupe,mode);
			listeadd("Eoraptor","",groupe,mode);
			listeadd("Epee","",groupe,mode);
			listeadd("Epouse","",groupe,mode);
			listeadd("ESA","",groupe,mode);
			listeadd("Escher","",groupe,mode);
			listeadd("Evalla","",groupe,mode);
			listeadd("everybody-lies","",groupe,mode);
			listeadd("EVROPTAL","",groupe,mode);
			listeadd("Exobiologie","",groupe,mode);
			listeadd("Exponentiel","",groupe,mode);
			listeadd("Exquise","",groupe,mode);
			listeadd("Faiblesse","",groupe,mode);
			listeadd("Feinte","",groupe,mode);
			listeadd("Fiorina","",groupe,mode);
			listeadd("Free-ZAC","",groupe,mode);
			listeadd("Fureimuheizu","",groupe,mode);
			listeadd("Gambee","",groupe,mode);
			listeadd("Gas-Chamber","",groupe,mode);
			listeadd("genital","",groupe,mode);
			listeadd("Google-Earth","",groupe,mode);
			listeadd("Gravitationnel","",groupe,mode);
			listeadd("Greys-Anatomy","",groupe,mode);
			listeadd("Guymelef","",groupe,mode);
			listeadd("Hahn","",groupe,mode);
			listeadd("Haruka-Yamada","",groupe,mode);
			listeadd("Heliana","",groupe,mode);
			listeadd("Hirai","",groupe,mode);
			listeadd("holographie","",groupe,mode);
			listeadd("Humiliation","",groupe,mode);
			listeadd("Hypercinetique","",groupe,mode);
			listeadd("Hypersexuelle","",groupe,mode);
			listeadd("Inhabituel","",groupe,mode);
			listeadd("Itadaki_no_Kura","",groupe,mode);
			listeadd("Ivu","",groupe,mode);
			listeadd("jay-lay-100k","",groupe,mode);
			listeadd("Jeune_Pucelle","",groupe,mode);
			listeadd("Johto","",groupe,mode);
			listeadd("Jongle","",groupe,mode);
			listeadd("Jotho","",groupe,mode);
			listeadd("JuJu","",groupe,mode);
			listeadd("Just_RKO","",groupe,mode);
			listeadd("Katie-Lea","",groupe,mode);
			listeadd("kikoo","",groupe,mode);
			listeadd("Lavinia","",groupe,mode);
			listeadd("LegendDestroyer","",groupe,mode);
			listeadd("Liaison","",groupe,mode);
			listeadd("Lottie_Gehl","",groupe,mode);
			listeadd("Luxio","",groupe,mode);
			listeadd("Lyndsy","",groupe,mode);
			listeadd("Lyrisme","",groupe,mode);
			listeadd("M93R","",groupe,mode);
			listeadd("M950","",groupe,mode);
			listeadd("Marion-Bartoli","",groupe,mode);
			listeadd("mayre_denis","",groupe,mode);
			listeadd("Mercurion","",groupe,mode);
			listeadd("midinette","",groupe,mode);
			listeadd("Mitochondria","",groupe,mode);
			listeadd("mitochondries","",groupe,mode);
			listeadd("Moe","",groupe,mode);
			listeadd("Monolithe","",groupe,mode);
			listeadd("Moufflair","",groupe,mode);
			listeadd("MP5A5","",groupe,mode);
			listeadd("MVP","",groupe,mode);
			listeadd("Nanophysique","",groupe,mode);
			listeadd("Nanoscience","",groupe,mode);
			listeadd("Nanosciences","",groupe,mode);
			listeadd("Naquadah","",groupe,mode);
			listeadd("Naquadriah","",groupe,mode);
			listeadd("NASA","",groupe,mode);
			listeadd("Necrophilie","",groupe,mode);
			listeadd("Neo-Zelandais","",groupe,mode);
			listeadd("Neo_Ark","",groupe,mode);
			listeadd("NMC","",groupe,mode);
			listeadd("Noces","",groupe,mode);
			listeadd("Noctabide","",groupe,mode);
			listeadd("Noctali","",groupe,mode);
			listeadd("No_Mercy","",groupe,mode);
			listeadd("Nuctalia","",groupe,mode);
			listeadd("Nuptiale","",groupe,mode);
			listeadd("Nyx-","",groupe,mode);
			listeadd("Obsedee","",groupe,mode);
			listeadd("ol4life","",groupe,mode);
			listeadd("Oreades","",groupe,mode);
			listeadd("Oricy","",groupe,mode);
			listeadd("Orton-Randy","",groupe,mode);
			listeadd("OSEB","",groupe,mode);
			listeadd("Owiiiiiiiiiiiii","",groupe,mode);
			listeadd("p-e","",groupe,mode);
			listeadd("P08","",groupe,mode);
			listeadd("P08S","",groupe,mode);
			listeadd("PA3","",groupe,mode);
			listeadd("Paix-6-Myst","",groupe,mode);
			listeadd("Palpitant","",groupe,mode);
			listeadd("Panspermie","",groupe,mode);
			listeadd("Parasaito","",groupe,mode);
			listeadd("Parasaito_Ivu","",groupe,mode);
			listeadd("Parasite","",groupe,mode);
			listeadd("Parasite_Energy","",groupe,mode);
			listeadd("Parfois","",groupe,mode);
			listeadd("PasDeMessage","",groupe,mode);
			listeadd("PE2","",groupe,mode);
			listeadd("pharma","",groupe,mode);
			listeadd("Photoelectrique","",groupe,mode);
			listeadd("Pokecenter","",groupe,mode);
			listeadd("Poketoxico","",groupe,mode);
			listeadd("Polkamon","",groupe,mode);
			listeadd("Polycarbonate","",groupe,mode);
			listeadd("pseud047","",groupe,mode);
			listeadd("pseudo0","",groupe,mode);
			listeadd("Pyrokinesie","",groupe,mode);
			listeadd("Ralph_Wellec","",groupe,mode);
			listeadd("Randy-RKO-Orton","",groupe,mode);
			listeadd("RAPPORT-SEXUEL","",groupe,mode);
			listeadd("Reasoner","",groupe,mode);
			listeadd("Regeneration","",groupe,mode);
			listeadd("Reimi","",groupe,mode);
			listeadd("Rena","",groupe,mode);
			listeadd("Repression","",groupe,mode);
			listeadd("Resplendissante","",groupe,mode);
			listeadd("Rika_Akiba","",groupe,mode);
			listeadd("RogueGalaxy","",groupe,mode);
			listeadd("Sainte-Vierge","",groupe,mode);
			listeadd("Sara_Cruz","",groupe,mode);
			listeadd("Sara_Wellec","",groupe,mode);
			listeadd("Schengen","",groupe,mode);
			listeadd("second-pseudo","",groupe,mode);
			listeadd("SecondOrgasm","",groupe,mode);
			listeadd("Sega_Saturn","",groupe,mode);
			listeadd("Sexisme","",groupe,mode);
			listeadd("Shoujo_Emily","",groupe,mode);
			listeadd("Skolem","",groupe,mode);
			listeadd("Soko_No_Strain","",groupe,mode);
			listeadd("Somina_Memorias","",groupe,mode);
			listeadd("Soumission","",groupe,mode);
			listeadd("SP12","",groupe,mode);
			listeadd("Space-Opera","",groupe,mode);
			listeadd("Space_Opera","",groupe,mode);
			listeadd("Space_Siege","",groupe,mode);
			listeadd("spatio-temporel","",groupe,mode);
			listeadd("Spiritomb","",groupe,mode);
			listeadd("Spiritualisme","",groupe,mode);
			listeadd("SRY","",groupe,mode);
			listeadd("Star-Ocean","",groupe,mode);
			listeadd("Star-Ocean-EX","",groupe,mode);
			listeadd("Stargate-SG1","",groupe,mode);
			listeadd("StarOcean-EX","",groupe,mode);
			listeadd("StarOceanEx","",groupe,mode);
			listeadd("StarOcean_EX","",groupe,mode);
			listeadd("STRAIN","",groupe,mode);
			listeadd("Sub-Symbolique","",groupe,mode);
			listeadd("SystemShock","",groupe,mode);
			listeadd("tanith_belbin","",groupe,mode);
			listeadd("The-Lightning","",groupe,mode);
			listeadd("Thedus","",groupe,mode);
			listeadd("TUMOR","",groupe,mode);
			listeadd("UN-NVAL-DES-NVO","",groupe,mode);
			listeadd("Undisputed","",groupe,mode);
			listeadd("Unwritten","",groupe,mode);
			listeadd("Vettel","",groupe,mode);
			listeadd("Violeur-De-Chat","",groupe,mode);
			listeadd("Vita-Aeterna","",groupe,mode);
			listeadd("Vita_Aeterna","",groupe,mode);
			listeadd("Watson-Emma","",groupe,mode);
			listeadd("WHC","",groupe,mode);
			listeadd("Witch_Doctor","",groupe,mode);
			listeadd("WWE","",groupe,mode);
			listeadd("Xarem","",groupe,mode);
			listeadd("Zaibacher","",groupe,mode);
			listeadd("Zaibaker","",groupe,mode);
			listeadd("ZOE3","",groupe,mode);
			listeadd("Zoophilie","",groupe,mode);
			listeadd("[DAY]","",groupe,mode);
			listeadd("[ol4life]","",groupe,mode);
			listeadd("______day______","",groupe,mode);
		}
		groupe = "Exenods"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("-666","",groupe,mode);
			listeadd("-Jester-","",groupe,mode);
			listeadd("-[Phantom]-","",groupe,mode);
			listeadd("1m69","",groupe,mode);
			listeadd("419023","",groupe,mode);
			listeadd("52451415419","",groupe,mode);
			listeadd("AccroADofus","",groupe,mode);
			listeadd("AccroDeDofus","",groupe,mode);
			listeadd("affectueuse","",groupe,mode);
			listeadd("affectueux","",groupe,mode);
			listeadd("Agression","",groupe,mode);
			listeadd("Aikze","",groupe,mode);
			listeadd("AiraineJTM","",groupe,mode);
			listeadd("AlbelTheWicked","",groupe,mode);
			listeadd("Always","",groupe,mode);
			listeadd("AntiLapin","",groupe,mode);
			listeadd("AntiNoel","",groupe,mode);
			listeadd("ArchEnemy","",groupe,mode);
			listeadd("ArtPad","",groupe,mode);
			listeadd("automne","",groupe,mode);
			listeadd("BananaSpleen","",groupe,mode);
			listeadd("BIackBombA","",groupe,mode);
			listeadd("Blessure","",groupe,mode);
			listeadd("bordelamer","",groupe,mode);
			listeadd("brasgauche","",groupe,mode);
			listeadd("Cailler","",groupe,mode);
			listeadd("CaptainSodom","",groupe,mode);
			listeadd("CaramellDansen","",groupe,mode);
			listeadd("caresse","",groupe,mode);
			listeadd("Caresser","",groupe,mode);
			listeadd("caresses","",groupe,mode);
			listeadd("CASSAGE","",groupe,mode);
			listeadd("CaZouNeT","",groupe,mode);
			listeadd("CeciEstUnPseudo","",groupe,mode);
			listeadd("celui-ci","",groupe,mode);
			listeadd("charismatique","",groupe,mode);
			listeadd("CharteDesForums","",groupe,mode);
			listeadd("ChatonPervers","",groupe,mode);
			listeadd("ChaudCoIa","",groupe,mode);
			listeadd("ChaudCola","",groupe,mode);
			listeadd("Cheryl","",groupe,mode);
			listeadd("chialer","",groupe,mode);
			listeadd("ChienneDePrince","",groupe,mode);
			listeadd("Chipouh","",groupe,mode);
			listeadd("ChOuX_coca","",groupe,mode);
			listeadd("ChuckNourrice","",groupe,mode);
			listeadd("CocaColaZero","",groupe,mode);
			listeadd("Compris","",groupe,mode);
			listeadd("concubine","",groupe,mode);
			listeadd("CONVERSATION","",groupe,mode);
			listeadd("copulation","",groupe,mode);
			listeadd("CoupQuiCrispe","",groupe,mode);
			listeadd("couverture","",groupe,mode);
			listeadd("criterium","",groupe,mode);
			listeadd("cuistre","",groupe,mode);
			listeadd("Dark7Apocalypse","",groupe,mode);
			listeadd("Darkintruder","",groupe,mode);
			listeadd("Dark_Shadow_0","",groupe,mode);
			listeadd("DeepBurner","",groupe,mode);
			listeadd("defeatist","",groupe,mode);
			listeadd("DeliriumState","",groupe,mode);
			listeadd("depassage","",groupe,mode);
			listeadd("Deprime","",groupe,mode);
			listeadd("DernierePage","",groupe,mode);
			listeadd("derriere","",groupe,mode);
			listeadd("dessous","",groupe,mode);
			listeadd("dessus","",groupe,mode);
			listeadd("DeusExe","",groupe,mode);
			listeadd("Devant","",groupe,mode);
			listeadd("Devineur","",groupe,mode);
			listeadd("Diaisse-Zirow","",groupe,mode);
			listeadd("DiggingIn","",groupe,mode);
			listeadd("DigimonStory","",groupe,mode);
			listeadd("dis-donc","",groupe,mode);
			listeadd("dofus-arena","",groupe,mode);
			listeadd("Dommage","",groupe,mode);
			listeadd("douchette","",groupe,mode);
			listeadd("DouxJesus","",groupe,mode);
			listeadd("DS-chan","",groupe,mode);
			listeadd("DS-Yerow","",groupe,mode);
			listeadd("DS-Zer0w","",groupe,mode);
			listeadd("DS-Zerow","",groupe,mode);
			listeadd("DS-Zerow_isback","",groupe,mode);
			listeadd("DS-Zerox","",groupe,mode);
			listeadd("DSix","",groupe,mode);
			listeadd("DSLeGentil","",groupe,mode);
			listeadd("DSonline","",groupe,mode);
			listeadd("DSounet","",groupe,mode);
			listeadd("DSounette","",groupe,mode);
			listeadd("DS_DeNoeI","",groupe,mode);
			listeadd("DS_DeNoel","",groupe,mode);
			listeadd("DS_sauvage","",groupe,mode);
			listeadd("EggsAndNodz","",groupe,mode);
			listeadd("Ekentuor","",groupe,mode);
			listeadd("ENORME","",groupe,mode);
			listeadd("ete","",groupe,mode);
			listeadd("eX-DS-Zerow","",groupe,mode);
			listeadd("EXactemEnt","",groupe,mode);
			listeadd("Excelangue","",groupe,mode);
			listeadd("exed","",groupe,mode);
			listeadd("ExeLePur","",groupe,mode);
			listeadd("EXEN0DS","",groupe,mode);
			listeadd("Exenods","",groupe,mode);
			listeadd("exenodsmiley","",groupe,mode);
			listeadd("EXENOIGNON","",groupe,mode);
			listeadd("Exenonos","",groupe,mode);
			listeadd("EXENOODLES","",groupe,mode);
			listeadd("exenorgasm","",groupe,mode);
			listeadd("EXENORGIE","",groupe,mode);
			listeadd("EXENOUILLES","",groupe,mode);
			listeadd("Exenounet","",groupe,mode);
			listeadd("EXENUTS","",groupe,mode);
			listeadd("EXEvsDS","",groupe,mode);
			listeadd("exey","",groupe,mode);
			listeadd("Exoa","",groupe,mode);
			listeadd("exonods","",groupe,mode);
			listeadd("Exou","",groupe,mode);
			listeadd("ExpertVert","",groupe,mode);
			listeadd("FANCLUB","",groupe,mode);
			listeadd("FAQUIN","",groupe,mode);
			listeadd("Farleen","",groupe,mode);
			listeadd("FauteDeFrappe","",groupe,mode);
			listeadd("FearFactory","",groupe,mode);
			listeadd("Fenetre","",groupe,mode);
			listeadd("firexe","",groupe,mode);
			listeadd("FISHENODS","",groupe,mode);
			listeadd("Fishounette","",groupe,mode);
			listeadd("flagellateur","",groupe,mode);
			listeadd("FonctionIgnorer","",groupe,mode);
			listeadd("fouetter","",groupe,mode);
			listeadd("fourumeur","",groupe,mode);
			listeadd("frottement","",groupe,mode);
			listeadd("frotter","",groupe,mode);
			listeadd("Fuwa","",groupe,mode);
			listeadd("FuwaFuwa","",groupe,mode);
			listeadd("gameboycolor","",groupe,mode);
			listeadd("GarsAuPoireau","",groupe,mode);
			listeadd("Girls4Ever","",groupe,mode);
			listeadd("givemepain","",groupe,mode);
			listeadd("Glue","",groupe,mode);
			listeadd("GoIdenSun","",groupe,mode);
			listeadd("Guillemet","",groupe,mode);
			listeadd("habitude","",groupe,mode);
			listeadd("Harrachpo","",groupe,mode);
			listeadd("Heterosexuel","",groupe,mode);
			listeadd("HinataHyuga","",groupe,mode);
			listeadd("hiver","",groupe,mode);
			listeadd("HopeLeaves","",groupe,mode);
			listeadd("Huit","",groupe,mode);
			listeadd("ichigoogle","",groupe,mode);
			listeadd("Imagination","",groupe,mode);
			listeadd("impie","",groupe,mode);
			listeadd("ingrat","",groupe,mode);
			listeadd("insensible","",groupe,mode);
			listeadd("internight","",groupe,mode);
			listeadd("intime","",groupe,mode);
			listeadd("intimite","",groupe,mode);
			listeadd("jacuzzi","",groupe,mode);
			listeadd("jamais","",groupe,mode);
			listeadd("JeNeSuisPasDS","",groupe,mode);
			listeadd("JeNeSuisPasVous","",groupe,mode);
			listeadd("JeVaisPasBien","",groupe,mode);
			listeadd("JeVeuxCrever","",groupe,mode);
			listeadd("JeVeuxMourir","",groupe,mode);
			listeadd("K-Skette","",groupe,mode);
			listeadd("Laetica","",groupe,mode);
			listeadd("LaForceEstEnToi","",groupe,mode);
			listeadd("Lapin4Ever","",groupe,mode);
			listeadd("LapinDeNoel","",groupe,mode);
			listeadd("LapinForever","",groupe,mode);
			listeadd("LaQueueQuACola","",groupe,mode);
			listeadd("Lecture","",groupe,mode);
			listeadd("le_DS-Zerow","",groupe,mode);
			listeadd("LightYagami","",groupe,mode);
			listeadd("Loituma","",groupe,mode);
			listeadd("MariHonnete","",groupe,mode);
			listeadd("MarineJTM","",groupe,mode);
			listeadd("MarvellousWorld","",groupe,mode);
			listeadd("maxa","",groupe,mode);
			listeadd("menubigmac","",groupe,mode);
			listeadd("merzbow","",groupe,mode);
			listeadd("MetalRabbit","",groupe,mode);
			listeadd("midi","",groupe,mode);
			listeadd("minuscule","",groupe,mode);
			listeadd("morderire","",groupe,mode);
			listeadd("Nameho","",groupe,mode);
			listeadd("nameoh","",groupe,mode);
			listeadd("Nasum","",groupe,mode);
			listeadd("Neolapin","",groupe,mode);
			listeadd("NightSparrow","",groupe,mode);
			listeadd("Nodoka","",groupe,mode);
			listeadd("Noitcidelam","",groupe,mode);
			listeadd("nord","",groupe,mode);
			listeadd("NothingsLeft","",groupe,mode);
			listeadd("nouilles","",groupe,mode);
			listeadd("nourriture","",groupe,mode);
			listeadd("November11","",groupe,mode);
			listeadd("nutelIa","",groupe,mode);
			listeadd("Nympho","",groupe,mode);
			listeadd("Nymphoman","",groupe,mode);
			listeadd("orang-outan","",groupe,mode);
			listeadd("osamodas","",groupe,mode);
			listeadd("Pamparow","",groupe,mode);
			listeadd("Pampette","",groupe,mode);
			listeadd("panpan_lapin","",groupe,mode);
			listeadd("parenthese","",groupe,mode);
			listeadd("Pause","",groupe,mode);
			listeadd("PC-Zerow","",groupe,mode);
			listeadd("Peinture","",groupe,mode);
			listeadd("perlapinpin","",groupe,mode);
			listeadd("perverse","",groupe,mode);
			listeadd("PervertSpotted","",groupe,mode);
			listeadd("PetitCachalot","",groupe,mode);
			listeadd("phrase","",groupe,mode);
			listeadd("pikalin","",groupe,mode);
			listeadd("Pleurer","",groupe,mode);
			listeadd("PollyPocket","",groupe,mode);
			listeadd("preliminaire","",groupe,mode);
			listeadd("PremierePage","",groupe,mode);
			listeadd("printemps","",groupe,mode);
			listeadd("pseudette","",groupe,mode);
			listeadd("pseudichounette","",groupe,mode);
			listeadd("pseudo47JTM","",groupe,mode);
			listeadd("pseudo48","",groupe,mode);
			listeadd("pseudo7","",groupe,mode);
			listeadd("pseudonounette","",groupe,mode);
			listeadd("pseudouche","",groupe,mode);
			listeadd("PSP-Zerow","",groupe,mode);
			listeadd("Psru","",groupe,mode);
			listeadd("Puzzle","",groupe,mode);
			listeadd("QuoiDeNeuf","",groupe,mode);
			listeadd("RageuxSpotted","",groupe,mode);
			listeadd("Repartie","",groupe,mode);
			listeadd("Rhume","",groupe,mode);
			listeadd("RomeoEtJuliette","",groupe,mode);
			listeadd("RoseOfSharyn","",groupe,mode);
			listeadd("SaintValentin","",groupe,mode);
			listeadd("sanctity","",groupe,mode);
			listeadd("Sauvegarder","",groupe,mode);
			listeadd("ScaryMovie","",groupe,mode);
			listeadd("sdonexe","",groupe,mode);
			listeadd("SeptLettres","",groupe,mode);
			listeadd("sex-DS-Zerow","",groupe,mode);
			listeadd("sexcelangue","",groupe,mode);
			listeadd("sexenods","",groupe,mode);
			listeadd("SexIsGreat","",groupe,mode);
			listeadd("Sexoa","",groupe,mode);
			listeadd("SilentHill5","",groupe,mode);
			listeadd("slurpiste","",groupe,mode);
			listeadd("SNES-Zerow","",groupe,mode);
			listeadd("souvent","",groupe,mode);
			listeadd("StoiLaRacaille","",groupe,mode);
			listeadd("StoiQuiVaBien","",groupe,mode);
			listeadd("StroDeLaBalle","",groupe,mode);
			listeadd("sucesucre","",groupe,mode);
			listeadd("SucreDeRaisin","",groupe,mode);
			listeadd("SUPERAGEUX","",groupe,mode);
			listeadd("SuperForum","",groupe,mode);
			listeadd("SuperMarioBros","",groupe,mode);
			listeadd("T-Shirt","",groupe,mode);
			listeadd("tendance","",groupe,mode);
			listeadd("thisis","",groupe,mode);
			listeadd("Tiede","",groupe,mode);
			listeadd("tiens","",groupe,mode);
			listeadd("tipp-exe","",groupe,mode);
			listeadd("Trouve-moi","",groupe,mode);
			listeadd("tu-sais-quoi","",groupe,mode);
			listeadd("TuEsPampo","",groupe,mode);
			listeadd("UB001","",groupe,mode);
			listeadd("Unearth","",groupe,mode);
			listeadd("UneSourisVerte","",groupe,mode);
			listeadd("wabbit","",groupe,mode);
			listeadd("Wannay","",groupe,mode);
			listeadd("WhatIsHell","",groupe,mode);
			listeadd("XenaExe","",groupe,mode);
			listeadd("YerocJTM","",groupe,mode);
			listeadd("Yukuchu","",groupe,mode);
			listeadd("YukuJTM","",groupe,mode);
			listeadd("YunaJTM","",groupe,mode);
			listeadd("zac47","",groupe,mode);
			listeadd("zacJTM","",groupe,mode);
			listeadd("zacounette","",groupe,mode);
			listeadd("[8x]","",groupe,mode);
			listeadd("[DarkLego]","",groupe,mode);
			listeadd("[DarkVirus]","",groupe,mode);
			listeadd("[RedZone]Di","",groupe,mode);
			listeadd("[[RABBITGOD]]","",groupe,mode);
																	listeadd("Mikee69","",groupe+"?",mode);
		}
		groupe = "Just Killer"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Just_Killer","",groupe,mode);
			listeadd("Paceville","",groupe,mode);
		}
		groupe = "answer03"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("hamlet_1er","",groupe,mode);
			listeadd("Telemaque","",groupe,mode);
			listeadd("answer03","",groupe,mode);
		}
		groupe = "Hoto"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Arianne","",groupe,mode);
			listeadd("Call","",groupe,mode);
			listeadd("eDonkey","",groupe,mode);
			listeadd("Feu","",groupe,mode);
			listeadd("Gaiden","",groupe,mode);
			listeadd("HeartOfTheOak","",groupe,mode);
			listeadd("Honor","",groupe,mode);
			listeadd("iHoto","",groupe,mode);
			listeadd("ILoveRikku","",groupe,mode);
			listeadd("JeSuisUnPoteau","",groupe,mode);
			listeadd("Lev","",groupe,mode);
			listeadd("Quebecoise","",groupe,mode);
			listeadd("RoseDesSables","",groupe,mode);
			listeadd("WarcraftIII","",groupe,mode);
			listeadd("Wouaf","",groupe,mode);
			listeadd("Zakarium","",groupe,mode);
			listeadd("Princess","",groupe,mode);
			listeadd("Melany","",groupe,mode);
			listeadd("Cathe","",groupe,mode);
			listeadd("Brice","",groupe,mode);
			listeadd("Lyas","",groupe,mode);
			listeadd("Nate","",groupe,mode);
			listeadd("Tendax","",groupe,mode);
			listeadd("Splendor","",groupe,mode);
			listeadd("Two","",groupe,mode);
			listeadd("HOOOTOOO","",groupe,mode);
			listeadd("HotoIsBack","",groupe,mode);
			listeadd("HotoLuna","",groupe,mode);
			listeadd("JohnCaffey","",groupe,mode);
			listeadd("11h35","",groupe,mode);
			listeadd("Intersideral","",groupe,mode);
			listeadd("Mediocre","",groupe,mode);
		}
		groupe = "FÃ©lÃ©e"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("IAmSomeone","",groupe,mode);
			listeadd("Felee","",groupe,mode);
		}
		groupe = "Chocobodor"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Chocobo","",groupe,mode);
			listeadd("Chocobodor","",groupe,mode);
			listeadd("ChocoboRose","",groupe,mode);
			listeadd("ChocoPuce","",groupe,mode);
			listeadd("Dream","",groupe,mode);
			listeadd("Fubu","",groupe,mode);
			listeadd("Italie","",groupe,mode);
			listeadd("Kenza_Farah","",groupe,mode);
			listeadd("Liloo","",groupe,mode);
			listeadd("Marion","",groupe,mode);
			listeadd("MarionJTM","",groupe,mode);
			listeadd("Maud","",groupe,mode);
			listeadd("Plasma","",groupe,mode);
			listeadd("Princesse","",groupe,mode);
			listeadd("Puce","",groupe,mode);
			listeadd("Pucix7","",groupe,mode);
			listeadd("Tidus[10]","",groupe,mode);
			listeadd("Unfaithful","",groupe,mode);
			listeadd("Vladimir_Poutin","",groupe,mode);
			listeadd("YMCA","",groupe,mode);
		}
		groupe = "Odorless"; color = "#FCFAE1"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("ODORLESS","",groupe,mode);
			listeadd("ODORLESS_","",groupe,mode);
			listeadd("Fabuleuse","",groupe,mode);
			listeadd("Privation","",groupe,mode);
			listeadd("Possessive","",groupe,mode);
			listeadd("OdorIess","",groupe,mode);
			listeadd("Remyu","",groupe,mode);
			listeadd("Shameimaru","",groupe,mode);
			listeadd("JERRYOKOK","",groupe,mode);
			listeadd("Marcel","",groupe,mode);
		}
		groupe = "Foxalive"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("canadiantire","",groupe,mode);
			listeadd("foxalive","",groupe,mode);
		}
		groupe = "BÃ©bÃ©"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("BebeNatas","",groupe,mode);
			listeadd("Bebenounette","",groupe,mode);
			listeadd("bebenathann","",groupe,mode);
		}
		groupe = "Swifer"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("_Swifer_","",groupe,mode);
			listeadd("Ferrero","",groupe,mode);
			listeadd("Swifeur","",groupe,mode);
			listeadd("Swifea","",groupe,mode);
			listeadd("SwifOfTheOak","",groupe,mode);
			listeadd("Swifytoad","",groupe,mode);
			listeadd("[Swif128]","",groupe,mode);
		}
		groupe = "X-Side"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("X-Side","",groupe,mode);
			listeadd("Salvator74","",groupe,mode);
			listeadd("Roxy75","",groupe,mode);
			listeadd("GhostWaIker","",groupe,mode);
		}
		groupe = "Adrianokiller"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Adri","",groupe,mode);
			listeadd("Adrianokiller","",groupe,mode);
		}
		groupe = "Inter Anima"; color = "#00FF00"; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Inter-Anima","",groupe,mode);
		}
		groupe = "MÃ©ga"; color = ""; {
			GM_setValue("gp#prc#"+groupe.toLowerCase()+"#clr",color);
			listeadd("Megaman_ntw","",groupe,mode);
			listeadd("Protoman_ntw","",groupe,mode);
			listeadd("Andromon","",groupe,mode);
			listeadd("Myotismon","",groupe,mode);
			listeadd("Balignon","",groupe,mode);
			listeadd("Polichombr","",groupe,mode);
			listeadd("iTele","",groupe,mode);
			listeadd("TraceTV","",groupe,mode);
			listeadd("Yucca","",groupe,mode);
			listeadd("Acidanthera","",groupe,mode);
			listeadd("MichaelBaldwin","",groupe,mode);
			listeadd("MrVictorNewman","",groupe,mode);
			listeadd("JerryGolet","",groupe,mode);
			listeadd("HilaryGolet","",groupe,mode);
			listeadd("Meganounet","",groupe,mode);
			listeadd("MegaNoob69","",groupe,mode);
			listeadd("LadyArvida","",groupe,mode);
			listeadd("SuzakuKururugi","",groupe,mode);
			listeadd("MeredithGrey","",groupe,mode);
			listeadd("DansSonCul","",groupe,mode);
		}
	}
	"Images"; {
		GM_setValue("img_liste","");
		imgadd("http://image.jeuxvideo.com/pics/forums/bt_forum_repondre.gif","http://www.noelshack.com/uploads/repondre007035.png");
		imgadd("http://www.noelshack.com/uploads/rep_off020374.png","");
		imgadd("http://image.jeuxvideo.com/smileys_img/11.gif","http://image.jeuxvideo.com/smileys_img/18.gif");
		imgadd("http://image.jeuxvideo.com/smileys_img/18.gif","http://image.jeuxvideo.com/smileys_img/11.gif");
	}
	"Smileys"; {
		GM_setValue("nb_smileys",0);
		smladd("n+y+u+","http://www.noelshack.com/uploads/nyu007731.gif");
		smladd(":/","http://www.noelshack.com/uploads/neutre018962.png");
		smladd(":shoot:","http://www.noelshack.com/uploads/shoot018595.gif");
	}
	"PrÃ©fÃ©rences"; {
		GM_setValue("nb_preferences",0);
		PreferencesAjout("http://www.jeuxvideo.com/forums/0-68-0-0-0-0-0-0.htm","Philosophie");
		PreferencesAjout("http://www.jeuxvideo.com/forums/0-52-0-0-0-0-0-0.htm","Blabla 25-35 ans");
		PreferencesAjout("http://www.jeuxvideo.com/forums/0-1000021-0-0-0-0-0-0.htm","CommunautÃ©");	
		PreferencesAjout("http://userscripts.org/users/79023","J.V.Nyu");
		PreferencesAjout("http://www.jeuxvideo.com/forums/1-1000021-256361-1-0-1-0-outil-jvn-jeuxvideo-nyu.htm","Pic officiel de J.V.Nyu");
		PreferencesAjout("http://www.the-uso.com/zdirect/lmdpac/","L.M.D.P.A.C.");
	}
	"Protections"; {
		GM_setValue("Protection","");
		pradd("aimincorp.free.fr");
		pradd("gagnerconsole.com");
		pradd("url2go.info");
		pradd("chaudron-empoisonne.fr");
		pradd("ihatekaty.com");
		pradd("megaporn.com");
		pradd("GuerreDesGangs.o-n.fr");
		pradd("bloodwars.net");
		pradd("ihatetara.com");
		pradd("smouch.net/lol");
		pradd("thelovestopped.info");
		pradd(".labrute.fr");
		pradd("voyage-eco.info");
		pradd("picpodium.com");
		pradd("bitefight.fr");
		pradd("noel-vaincra.perso.st");
		pradd("space-land.fr");
		pradd("miniurl.org");
		pradd("noelshackcomuploads");
		pradd("xnxx.com");
		pradd("pornorama.com");
		pradd("streamse x.com");
		pradd("magicmovies.com");
		pradd("gonzo-movies.com");
		pradd("neatmovies.com");
		pradd("hobomovies.com");
		pradd("cityofmovies.com");
		pradd("moviesguy.com");
		pradd("youporn.com");
		pradd("redporntube.com");
		pradd("redtube.com");
		pradd("zootube.eu");
		pradd("teensnow.com");
		pradd("woodwar7.net");
		pradd("zipurl.fr");
		pradd("xpango.com");
		pradd("packbarre.com");
		pradd("gladiatus.fr");
		pradd("tricheland.com");
	}
	GM_setValue("need_init",false);
	GM_setValue("maj_version",0);
	MAJ();
	alert("Initialisation terminÃ©e");
}

function InitPseudos() {
}
