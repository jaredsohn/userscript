// ==UserScript==
// @name			Jeuxvideo.Nyu v1.1
// @namespace		JVN
// @description		JeuxVideo.Nyu V1.1
// @version		1.1.0
// @include		http://www.jeuxvideo.com/forums/*-*-*-*-*-*-*-*.htm*
// @include		http://www.jeuxvideo.com/cgi-bin/jvforums/forums_profil.cgi?*
// @include		http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi*
// @include		http://www.jeuxvideo.com/cgi-bin/jvforums/avertir_moderateur.cgi?*
// @include		http://www.jeuxvideo.com/forums.htm
// @include		http://www.jeuxvideo.com/smileys/legende.htm
// @include		http://www.jeuxvideo.com/forums_inex.htm
// @include		http://www.jeuxvideo.com/cgi-bin/admin/moncompte.cgi*
// @include		http://www.jeuxvideo.com/cgi-bin/jvforums/moderation.cgi
// @include		http://www.jeuxvideo.com/avatars/view_avatar.htm*
// @include		http://127.0.0.1/www.jeuxvideo.com/*
// @include		http://ilyasviel.net63.net/*
// @include		http://127.0.0.1/ilyasviel.net63.net/*
// @exclude		http://www.jeuxvideo.com/forums/2-*-*-*-*-*-*-*.htm*
// @exclude		http://www.jeuxvideo.com/forums/4-*-*-*-*-*-*-*.htm*
// @exclude		http://www.jeuxvideo.com/forums/5-*-*-*-*-*-*-*.htm*
// @exclude		http://www.jeuxvideo.com/forums/15-*-*-*-*-*-*-*.htm*
// @exclude		http://www.jeuxvideo.com/forums/16-*-*-*-*-*-*-*.htm*
// @exclude		http://www.jeuxvideo.com/forums/17-*-*-*-*-*-*-*.htm*
// @exclude		http://www.jeuxvideo.com/forums/18-*-*-*-*-*-*-*.htm*
// @exclude		http://www.jeuxvideo.com/forums/26-*-*-*-*-*-*-*.htm*
// @resource		Nyu							http://www.noelshack.com/uploads/nyu007731.gif
// @require		http://ilyasviel.net63.net/jQuery/jquery-latest.js
// @require		http://ilyasviel.net63.net/jQuery/jquery-ui.js
// @require		http://ilyasviel.net63.net/jQuery/uislider.js
// @copyright		2008-2010,						Lúthien Sofea Elanessë
// @license			GPL version 3 or any later version; 		http://www.gnu.org/copyleft/gpl.html
// @contributor		JVF	Anonymous59
// @contributor		Ico	Ange
// @contributor		ß-1	Paic,Shaka
// @contributor		ß-2	Amber,Ange
// @contributor		ß-3	Dium,Paic
// @contributor		ß-4	Suumas,Kukirio
// @contributor		ß-5	
// @contributor		ß-6	
// @contributor		ß-7	
// @contributor		ß-8	Dargor (bon voilà j'ai changé le © :nah: :-P)
// @contributor		ß-9	Dargor (épurage de commentaires, c'est bÔ hein ? ^^)
// @contributor		ß-10 (unreleased)	Sil'
// ==/UserScript==

begin_date_jvn_test = new Date();

//"JVN:Secret:DebugMode:LocalGroups";

function MaJ() {
	var version = GM.let("JVN:MaJ","v1.0.0");
	switch (version) {
		default : {
			Init();
			break;
		}
		case "v1.0.0" : { Init(); };
		case "v1.10 Alpha" : 
		case "v1.10 Beta 1" : 
		case "v1.10 Beta 2" : 
		case "v1.10 Beta 3" : 
		case "v1.10 Beta 4" : 
		case "v1.10 Beta 5" : 
		case "v1.10 Beta 6" : 
		case "v1.10 Beta 7" : 
		case "v1.10 Beta 8" : { version = "v1.10 Beta 9"; GM.set("JVN:MaJ",version); }
		case "v1.10 Beta 9" : {
			var cont = "http://";
			if (GM.let("JVN:Secret:DebugMode:LocalGroups",false))
				cont = "http://127.0.0.1/";
			getPage(cont+"ilyasviel.net63.net/version.html",
				function(response) {
					if (new RegExp("<span version='version'>(.*)</span>").test(response.responseText)) {
						var newversion = RegExp.$1;
						if (!(newversion == version)) {
							check = confirm("Une nouvelle mise à jour de J.V.Nyu est disponible, la télécharger ?");
							if (check) {
								window.open("http://ilyasviel.net63.net/jeuxvideonyu_v11.user.js","_blank");
								GM.set("JVN:MaJ",newversion);
							}
						}
					}
				},
				function(response) {},
				function(response) {});
			break;
		}
	}
}

function Init() {
}

var Const = {
	mois : new Array("janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"),
	Icones : new Array("MaJ","neutre","nyu","shoot","actif","bluek","red","redC","blueG","apercu","greenX","redX","redS","redA","citer","couleur","cyanD","danger","darkl","edit","grayc","green","ignorer","inactif","listegroupe","orange","pinko","profil","purpler","rep","rep_off","retour","voir","yellowE","Menu-messages","Menu-profil","Menu-pseudonyme","Menu-topics","Menu-general","yuu","puppy","v","Menu-secrets","ouin","skin-select-noir","skin-select-ds","skin-select-iphone","skin-select-pc","skin-select-ps2","skin-select-ps3","skin-select-psp","skin-select-web","skin-select-wii","skin-select-x360","Titre-modo","avert","css-page-debut","css-page-prec","css-page-retour","css-page-suiv","css-page-fin","css-puce-prec","css-puce-suiv","css-puce-info"),
	machine : new Array("pc","ps3","x360","wii","ps2","ds","psp","iphone","web"),
	motifban : new Array("Flood","Piratage","Insulte","Racisme / Incitation à la haine","Lien pornographique ou choquant","Lien de parrainage et/ou pub abusive","Hors-sujet","Spoiler","Profil","Autre"),
	Coderef : new Array(),
	
	DateInTopicReg : "([0-9]{1,2})[er]* ([^ 0-9<>]*) ([0-9]{4}) à ([0-9]{2}):([0-9]{2}):([0-9]{2})",
	DateInTopic : function(act) {
		var mess = act.getDate();
		if (mess == 1)
			mess += "er";
			
		mess += " "+Const.mois[act.getMonth()];
		mess += " "+(1900+act.getYear());
		mess += " à "+Const.Numb(2,act.getHours());
		mess += ":"+Const.Numb(2,act.getMinutes());
		mess += ":"+Const.Numb(2,act.getSeconds());
		
		return mess;
	},
	DateInListeReg : "([0-9]{2})/([0-9]{2})/([0-9]{4}) ([0-9]{2})h([0-9]{2})",
	DateInListe : function(act) {
		var mess  = Const.Numb(2,act.getDate());
		mess += "/"+Const.Numb(2,act.getMonth()+1);
		mess += "/"+(1900+act.getYear());
		mess += " "+Const.Numb(2,act.getHours());
		mess += "h"+Const.Numb(2,act.getMinutes());
		
		return mess;
	},
	
	Numb : function(i,n) {
		var str = ""+n;
		for (j=str.length;j<i;j++)
			str = "0"+str;
		return str;
	},
	No0 : function(str) {
		if (str.length < 2 || str[0] != 0)
			return str;
		else
			return Const.No0(str.substring(1,str.length));
	},
	
	ConvertToRegExp : function(str) {
		var car = new Array("?",".","[","]","{","}","+","(",")");
		for(var iter=0;iter<car.length;iter++)
			str = str.replace(new RegExp("\\"+car[iter],"gi"),"\\"+car[iter]);
		return str;
	},
	
	HexToRGB : function(Hex) {
		return new Array(parseInt(Hex.substr(0,2),16),parseInt(Hex.substr(2,2),16),parseInt(Hex.substr(4,2),16));
	},
	RGBToHex : function(r, g, b) {
		var Hex = new Array(r.toString(16),g.toString(16),b.toString(16));
		for (var i=0;i<Hex.length;i++) {
			if (Hex[i].length == 1)
				Hex[i] = "0" + Hex[i];
		}
		return Hex.join('').toUpperCase();
	},
	
	special : function(pseudo,r,mode) {
		var res = "";
		var cont = "http://";
		if (GM.let("JVN:Secret:DebugMode:Img:Local",false)) {
			cont = cont+"127.0.0.1/";
		}
		if (r == null || isNaN(r) || r < 0 || r > 1)
			r = Math.random();
		switch(pseudo.toLowerCase()) {
			case "sofea" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						switch (Math.floor(Math.random()*2)) {
							case 000 : { res = cont+"ilyasviel.net63.net/avatar/yuki30sv.gif"; break; }
							case 001 : { res = cont+"ilyasviel.net63.net/avatar/yuki.mono.gif"; break; }
						}
						break;
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"ilyasviel.net63.net/avatar/Sofea1.jpg";
						break;
					}
					case "surnom" : {
						switch (Math.floor(Math.random()*6)) {
							case 000 : { res = 'Operationnal System'; break; }
							case 001 : { res = 'Last blade of Sumaria'; break; }
							case 002 : { res = 'Angel from Hell'; break; }
							case 003 : { res = 'Light Prism'; break; }
							case 004 : { res = 'Vipère blanche'; break; }
							case 005 : { res = '3ème âme'; break; }
						}
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "Lúthien Sofea Elanessë";
						break;
					}
					case "profil-cdv" : {
						res = "Système Opérationnel de Formation à l'Espionnage Avancé<br/><br/>Système de protection des secteurs 52 et 68 - actif<br/>Système de surveillance du secteur 50 - actif<br/><br/><span class='jvn_create_avatar' pseudo='Third Soul of Hecate' avatar = 'http://ilyasviel.net63.net/avatar/Sofea2.jpg'><span style='font-family:\"Times New Roman\",Times,serif;'>?</span></span> - <span class='jvn_create_avatar' pseudo='Last Blade of Sumaria' avatar = 'http://ilyasviel.net63.net/avatar/Sofea3.jpg'><span style='font-family:\"Times New Roman\",Times,serif;'>?</span></span>";
					}
				}
				break;
			}
			case "divinesofea" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						res = "";
						break;
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"ilyasviel.net63.net/avatar/DivineSofea.jpg";
						break;
					}
					case "surnom" : {
						res = "Divinity";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "Divine Sofea";
						break;
					}
					case "profil-cdv" : {
						res = "";
					}
				}
				break;
}
			case "idunn" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						res = "";
						break;
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"ilyasviel.net63.net/avatar/Idunn.jpg";
						break;
					}
					case "surnom" : {
						res = "Mirae Elessa";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "Idunn";
						break;
					}
					case "profil-cdv" : {
						res = "";
					}
				}
				break;
}
			case "silea" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						res = "";
						break;
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"ilyasviel.net63.net/avatar/Silea.jpg";
						break;
					}
					case "surnom" : {
						res = "'Condensed Love';";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "Sil' Eä";
						break;
					}
					case "profil-cdv" : {
						res = "";
					}
				}
				break;
}
			case "enetya" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						res = "";
						break;
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"ilyasviel.net63.net/avatar/Enetya.jpg";
						break;
					}
					case "surnom" : {
						res = "";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "";
						break;
					}
					case "profil-cdv" : {
						res = "";
					}
				}
				break;
}
			case "eyleen" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						res = cont+"ilyasviel.net63.net/avatar/Eyleen.png";
						break;
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"ilyasviel.net63.net/avatar/Eyleen%20de%20Naclae.jpg";
						break;
					}
					case "surnom" : {
						res = "Acid Terror";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "Eyleen de Näclae";
						break;
					}
					case "profil-cdv" : {
						res = "";
					}
				}
				break;
}
			case "angelsofea" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						res = "";
						break;
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"www.noelshack.fr/uploads/Sofea044955.jpg";
						break;
					}
					case "surnom" : {
						res = "Angel made woman";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "Angel Sofea";
						break;
					}
					case "profil-cdv" : {
						res = "";
					}
				}
				break;
}
			case "sophia" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						res = "http://ilyasviel.net63.net/mikuru.swf";
						// res = "http://b.bngi-channel.jp/psp-haruhi/swf/haruhi_swf_sample/mikuru512/mikuru512.swf";
						break;
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"www.noelshack.fr/uploads/1a2fa3f7088798.jpg";
						break;
					}
					case "surnom" : {
						res = "Wisdom, or not";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "Sophia";
						break;
					}
					case "profil-cdv" : {
						res = "";
					}
				}
				break;
}
			case "sophie" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						res = cont+"ilyasviel.net63.net/avatar/thelaughingmanbythelaug.gif";
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"ilyasviel.net63.net/avatar/laughingman.gif";
						break;
					}
					case "surnom" : {
						res = "Laughing woman";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "Sophie";
						break;
					}
					case "profil-cdv" : {
						res = "";
					}
				}
				break;
}
			case "yukiiste" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						res = context[0]+"ilyasviel.net63.net/yuki.swf";
						//res = cont+"ilyasviel.net63.net/avatar/Yukiiste-little.gif";
						//res = "http://b.bngi-channel.jp/psp-haruhi/swf/haruhi_swf_sample/yuki512/yuki512.swf";
						break;
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"ilyasviel.net63.net/avatar/yukiiste.gif";
						break;
					}
					case "surnom" : {
						res = "Humanoid interface";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "Nagato Yuki";
						break;
					}
					case "profil-cdv" : {
						res = "";
					}
				}
				break;
}
			case "amber" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
						res = cont+"ilyasviel.net63.net/avatar/ub-little.jpg";
						break;
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						res = cont+"ilyasviel.net63.net/avatar/amb-real.jpg";
						break;
					}
					case "surnom" : {
						res = "Contractante";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
						res = "February";
						break;
					}
					case "profil-cdv" : {
						res = "";
					}
				}
				break;
			}
			case "demelza" : {
				switch (mode) {
					case "profil-little" : {
					}
					case "little" : {
					}
					case "profil-avatar" : {
					}
					case "avatar" : {
						break;
					}
					case "surnom" : {
						res = "Service après-vente de J.V.N.";
						break;
					}
					case "profil-titre" : {
					}
					case "titre" : {
					}
					case "profil-cdv" : {
					}
				}
				break;
			}
		}
		switch(pseudo) {
		}
		return res;
	},
	reallyspecial : function(pseudo,r,mode,object) {
		switch(pseudo.toLowerCase()) {
			case "yukiiste" : {
				switch (mode) {
					case "avatar" : {
						var iframe = Create.Element('iframe');
						object.replaceWith(iframe);
						object = iframe;
						break;
					}
				}
				break;
			}
			case "sophia" : {
				switch (mode) {
					case "avatar" : {
						var iframe = Create.Element('iframe');
						object.replaceWith(iframe);
						object = iframe;
						break;
					}
				}
				break;
			}
		}
		return object;
	},
	constantSkin : function(pseudo,img,msg) {
		var res = false;
		var bool = false;
		var r = Math.random();
		
		if (img!=null) {
			img = Const.reallyspecial(pseudo,r,"avatar",img);
			
			var ava = Const.special(pseudo,r,"little");
			bool = (ava!="");
			res = res || bool;
			if (bool)
				img.attr("src",ava);
			
			var bva = Const.special(pseudo,r,"avatar");
			var nom = Const.special(pseudo,r,"titre");
			bool = (bva!="" && nom!="");
			res = (res || bool);
			if (bool) {
				Avatar.link(img,bva,nom);
				img.css("cursor","pointer");
			}
			
			img.css("max-width","90px");
			img.css("max-height","90px");
			img.css("border","solid 1px #000000");
		}
			
		if (msg!=null) {
			var txt = Const.special(pseudo,r,"surnom");
			bool = (txt!="");
			if (bool)
				msg.text(txt);
		}
		
		return !res;
	},
	constantProfil : function(pseudo,avatar,cdv) {
		var r = Math.random();
		if (avatar!= null) {
			var id = avatar.attr("id");
			avatar.removeAttr("id");
			avatar = Const.reallyspecial(pseudo,r,"avatar",avatar).attr("id",id);

			var ava = Const.special(pseudo,r,"profil-little");
			if (ava!="") {
				avatar.attr("src",ava);
				avatar.css("max-width","90px").css("max-height","90px");
			}
			
			var bva = Const.special(pseudo,r,"profil-avatar");
			var txt = Const.special(pseudo,r,"profil-titre");
			if (bva!="" && txt!="") {
				var img = Avatar.clickable(avatar,pseudo);
				Avatar.link(img,bva,txt);
				img.css("cursor","pointer");
			}
			
			avatar.css("max-width","90px");
			avatar.css("max-height","90px");
			avatar.css("border-width:","0px");
		}
		if (cdv != null) {
			var txt = Const.special(pseudo,r,"profil-cdv");
			if (txt != "") {
				cdv.html(txt);
				Avatar.search($(".jvn_create_avatar",cdv));
			}
		}
	},
	
	base64 : {
		alphabet : new Array(),
		encode : function(text) {
			
		},
		decode : function(base64) {
			
		}
	},
	
	Tempest : function() {
		var R=0;
		var x1=.1;
		var y1=.05;
		var x2=.25;
		var y2=.24;
		var x3=1.6;
		var y3=.24;
		var x4=300;
		var y4=200;
		var x5=300;
		var y5=200;
		var DI=document.getElementsByTagName("img");
		var DIL=DI.length;
		function A(){
			for(var i=0; i-DIL; i++){
				DIS=DI[ i ].style;
				DIS.position='absolute';
				DIS.left=(Math.sin(R*x1+i*x2+x3)*x4+x5)+"px";
				DIS.top=(Math.cos(R*y1+i*y2+y3)*y4+y5)+"px"
			}
			R++
		}
		setInterval('A()',50); void( 0 ) ; 
	},
	
	lectIcone : function(global,str) {
		global.append(Create.Element("span").text(str+" : "));
		global.append(Create.Icone("",str,"",str,""));
		global.append(Create.Element("br"));
	},
	SeeIcone : function(global) {
		for(var i=0;i<Const.Icones.length;i++)
			Const.lectIcone(global,Const.Icones[i]);
	}
}

{
	Const.Coderef[":M:NG:NM"] = "1<><strong><></strong>";
	Const.Coderef[":M:G:NM"] = "0<><strong><></strong><i style='font-size:85%;'> en tant que </i><strong style='font-size:95%;'><></strong>";
	Const.Coderef[":M:NG:M"] = "1<><strong class='moderateur'><></strong>";
	Const.Coderef[":M:G:M"] = "0<><span><strong class='moderateur'><></strong><i style='font-size:85%;'> en tant que </i><strong style='font-size:95%;' class='moderateur'><></strong></span>";
	
	Const.Coderef[":T:NG:NM"] = "1<><td class='pseudo'><></td>";
	Const.Coderef[":T:G:NM"] = "0<><td class='pseudo'><></td>";
	Const.Coderef[":T:NG:M"] = "1<><td class='pseudo topic_mod'><></td>";
	Const.Coderef[":T:G:M"] = "0<><td class='pseudo topic_mod'><></td>";
	
	for (i=0;i<26;i++)
		Const.base64.alphabet.push(String.fromCharCode("A".charCodeAt(0)+i));
	for (i=0;i<26;i++)
		Const.base64.alphabet.push(String.fromCharCode("a".charCodeAt(0)+i));
	for (i=0;i<10;i++)
		Const.base64.alphabet.push(String.fromCharCode("0".charCodeAt(0)+i));
	Const.base64.alphabet.push("+");
	Const.base64.alphabet.push("/");
	Const.base64.alphabet.push("=");
}

var Debug = {
	TimeStamp : function(base,str) {
		if (GM.let("JVN:Secret:DebugMode:TimeLog",false)) {
			if (base == "" || GM.let("JVN:Secret:DebugMode:TimeLog:"+base,false)) {
				var now = new Date();
				var now = now.toLocaleString()+"."+Const.Numb(3,now.getMilliseconds());
				GM.log(location.href+"\n"+base+str+"\n"+now);
				GM.set("JVN:Secret:DebugMode:TimeLog:Log",GM.get("JVN:Secret:DebugMode:TimeLog:Log")+"\n\n\n"+location.href+"\n"+base+str+"\n"+now);
			}
		}
	}

}

var Image = {
	replace : function (src) {
		return GM.let("JVN:Img:"+src,src);
	},
	newLine : function(line,ori) {
		var suppr = Create.Icone("","redX","[X]","Supprimer ce remplacement","");
		line.append(Create.Element('td').append(suppr));
		var orig = Create.Image("",ori,ori,ori,"");
		line.append(Create.Element('td').append(orig));
		var fin = GM.get("JVN:Img:"+ori);
		var fina = Create.Image("",fin,fin,fin,"");
		line.append(Create.Element('td').append(fina));
		
		suppr.attr("origin",ori);
		suppr.css("cursor","pointer");
		suppr.click(function() {
			var check = confirm(this.title+" ?");
			if (check) {
				var ori = $(this).attr("origin");
				GM.del("JVN:Img:"+ori);
				$(this).parent().parent().hide("slow",function() {$(this).remove()});
			}
		});
	},
	apply : function() {
		if (GM.let("JVN:Images",false)) {
			var img = document.getElementsByTagName('img');
			for(var i=0;i<img.length;i++)
				img[i].src = Image.replace(img[i].src);
		}
	}
}

function Icone(str,mode) {
	var hico = "";
	var ico = "";
	switch (str) {
		default : {
			ico = "";
			break;
		}
		case "MaJ" : {	
			hico = "ilyasviel.net63.net/icones/maj.png";
			//"www.noelshack.com/up/aac/maj-ee8dfda395.png";
			ico = 'data:image/png;base64,'
				+ 'iVBORw0KGgoAAAANSUhEUgAAAFAAAAARCAYAAABKFStkAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'
				+ '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kIHAkwL6gcdIQAAAAZdEVYdENv'
				+ 'bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAD5ElEQVRYw+2Yz2tcVRTHP/f9TjpJE3VhJCi0'
				+ 'NStLBkItkqCNIkhAKvY/cJOtkC4EBetOJAG7dFkQXAlKxI2kCf5Y2DhQMIpVx4WGiLFNM53JzLz3'
				+ '5r7nIvPu3Jl5L5mJ6GoODHNyvvec7znn/pyI+ZmlmIH0JeuFFZHoFsCZyblBV/qTOGmiBSCjYNCS'
				+ 'PuSJx55mnqV4vbAiTtzAOD7c+UKI/3aq/yeefmXy0TzzM0uxBRBJyWEjQ/ygjOuMYBq2GpzYbWuI'
				+ 'elAmikKFGYaN54x02U+CGYbNsDcOQLV+v4tn2BtXeckoVGM6MR0HUmN2cgEqH13vHK9ztG3hOI6p'
				+ '1P7ms6/e5IULV3l47AymYSOjkHv7v7G2ucylmdfZKLzfNRsvXnyDL759N3WmjsKev3CVm5vLXTbP'
				+ 'GeHzb97uGn/5ufcYcseI4obKKRE9Z70WgIXZd6gH5WO59PrSatU51MQmDZRRQKNRA2Btc5ndvTvU'
				+ 'gxK7e3dUon5YVo75qSvM5Rd56Zm3yA0/wsLsNebyiwqfyy+yMHvtSMw0zLZ4ADc3l3lwsJPKY1kO'
				+ 'MgqoVHdVTonf2uYyleouDekjo4CwWQvAg4Md1by5/KLKpZNLr6+z1jSOVgOlPPxEUjltFK7z+58F'
				+ 'NgrXlS2KIqXf/vljvr79AULYCGw8ZwzPGVe454zjOWMYwsnEmvQAuM6o0sNGkMoTRwIpJWHDz/Dz'
				+ 'VS2RVose75B7PBXT69P1LA61he+WigAc1O61LdnCTx+1/V2u/qX0p86+zLD3EK6To+rvdfnvV7YJ'
				+ 'GlV1+Kdh1fqest3dLyr9oHa3Zx7d7375D/zwACFE2xg97/3KdmZNWbrOUarsKA5T2K0lkNx2iZx7'
				+ '/FLbd6d47mk89zSGYaX6p92kR0lx+0sAzp+7jOPkeuZJ/Prl60dUbk++guvk2l4ERpbT6KkJLp5/'
				+ 'jdFTE6l43S9Rre9R8/eJosa/TvLs5LMn4un0i2NJ3S9R90vKph/6R2F+UFG6EMaxuXU10BCtQ90y'
				+ 'HFw7h2U4LTKzpW8VV/nuxw+5tXVDHdi6v65nYboteVJ8/+unSBn0zJP4JfagUePWDzfYKq4CMD11'
				+ 'hdHcBNPNi2CruJqJJStteupVhtyx7tx++YRAu5wAxPzMUizjsHlwNtQsuE4Ow7DabLY9RBjWiGKp'
				+ 'vc9MXLt7bOLfOpR7i40A2+qdR/k14x7eoBWiSGIIs7nlTOJY4gcVFTMLS+z6itRzS3IAMIXd3sCs'
				+ 'l79uSztfssb28qsiLXa/PJ1xdd80n+OwzjhpHKqBAJ1NHEhvom7h9cKKMIU96MgJpG2fDf432L/8'
				+ 'AxZ5rfnI/HiVAAAAAElFTkSuQmCC';
			break;
		}
		case "neutre" : {	
			hico = "ilyasviel.net63.net/icones/neutre.png";
			//"www.noelshack.fr/uploads/neutre018962.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kBEgEyO2MshoEAAAE3SURBVDjL'+
			'hZMxa8MwEIXfyR4MGTqFjAmZO3dWl8yloNl0K4T8mhDoVjobgucs0dzZs0nG4qmDwYt1HRwJW7aa'+
			'N0q8T+9Od5QqhSl9ZRn7Z6lS5J/FIWNbihE0Wnd3fVDsm+tzhGTZPU6zlwGgLXMHspD4rjnZOAAB'+
			'4DpHWwoHEQDwtt0ygIFZLI7OTMkTxMM7kGxGqWIAkFKiPkcAeLKh3Hw7EN+StGWOaJ2xsK9Pqjnh'+
			'nkTowvy8DiDm96NL4kFdE6vCYA6BZMngOh/W+k+SOBhtcQym4jpHc+1GgbTWbBt52RPmj8L9RrA1'+
			'V8LsuUWqFInPw2EwnlVhHD1krgozLkFrjdUthe3HlKrCYLVjN85kl8l+p5QSAHDZj1OsdjxaKupv'+
			'Y38mLKgvrTX8kmlqnaeGyzda/QHJ3o7Xk0krQAAAAABJRU5ErkJggg==';
		break;
		}
		case "nyu" : {	
			hico = "ilyasviel.net63.net/icones/nyu.gif";
			//"www.noelshack.com/uploads/nyu007731.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhEAAQAOMAAAAAAAD/AMbGxs6cAM7Ozv/OAP//Y///nP///wAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/gU6bnl1OgAh+QQFHgAPACwAAAAAEAAQAAAEVPDJCWqd'+
			'WNbC+c1AZ4yGh4UWcKQFIAkpEltam94o3CJy3+coHsA3BA5sFUOqBIAdRaSRR+DsWDuuh3NgQRa4'+
			'LxjgOfZkw+UWOaMdD7hvMPthEZ8fEQAh+QQFHgAPACwAAAAAEAAQAAAEHPDJSau9OOstEQLdh3kT'+
			'iQGghHKpyr1wLM90fUUAIfkEBR4ADwAsAAAAABAAEAAABBzwyUmrvTjrPQFCkgdeYvhpAJVaa8i9'+
			'cCzPdK1FACH5BAUeAA8ALAAAAAAQABAAAAQd8MlJq7046y0B9RsAPmKGINOJASrZcnAsz3RtVxEA'+
			'Ow==';
		break;
		}
		case "shoot" : {	
			hico = "ilyasviel.net63.net/icones/shoot.gif";
			//"www.noelshack.com/uploads/shoot018595.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhEAAQAOMOAAAAAABqm59oAACLy9GJAACu/+CTAW3R/8DAwPvDAKnk///jHv/wfv/5zv//'+
			'/////yH/C05FVFNDQVBFMi4wAwEAAAAh/gY7c2hvb3QAIfkECQEADwAsAAAAABAAEAAABGjwyQlq'+
			'nVjWxfnNQMIxJONhocc0DWAugIQAo+MA9g1rImy3PxNg1iMBWK2GkDgqIUmwmaFocUGHgGmnCk0M'+
			'pb2DQnHgeGVZbaFcThhiD4R0OjgkCm64bAYgBAoEAx8YcnwWCBmEhYgZEQAh+QQJAQAPACwAAAAA'+
			'EAAQAAAEaPDJCWqdWNbF+c1AsjQk6WHh6ABOC5wP8jas2zYLoIlNu/oAHEDG+9kcQuKo5/MlAQYe'+
			'zXLLyaJLC4uUGF55B4XiwNXFAAJsgUxOGMwIWToxOCQKbrMkXiEECgQDHxhxMloIGYSFiBkRACH5'+
			'BAkBAA8ALAAAAAAQABAAAARn8MkJap1Y1sX5zUCyNCTpYeEIOCzQnA8CjE3LOjOgic1qOyaAjPfD'+
			'ARfCFOnGfCUNvJ6F5ZRBaZYVKSG08g4KxWGriwEE18J4nDCUETJ0YnBIFNplCbxCCBQIAx8YcDJZ'+
			'CBmDhIcZEQAh+QQJAQAPACwAAAAAEAAQAAAEavDJCWqdWNbF+c1AwjEk42HhCDQNA5wP8i6A4zT1'+
			'TWviwtg5B8AEkPVcDNaqRTOOSqwWUWY4WoakJqDauWYTRWrvoFAcOGAJlVs4nxMGgHqdGBwSBbh8'+
			'gpABCAEFBAMfGH1+FggZhoeKGREAOw==';
			break;
		}
		case "actif" : {	
			hico = "ilyasviel.net63.net/icones/actif.png";
			//"www.noelshack.fr/uploads/actif099716.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAADEAAAARCAYAAAB0MEQqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCBRAzGqHUey8AAAAZdEVYdENv'+
			'bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACp0lEQVRIx9WXO2sUURSAv3N3ZnY1T2ISoxZC'+
			'fCwpApIVfCJYWIqxsLGxsfEnCTY2NhZRLC2EgC8wQUgRUmgISXBFjJuErJmdmXssMjM7iZtk1so9'+
			'MHDnvOZ+95wzw0iVfqUDZYSaJGsHYPjhg46DqD55qgmIA0C93nEQw/fvUX32XEeoSQyxnTtYVbEo'+
			'qiACBkFEdulhxyYImtElkrVBa79s7n1BJm9TffFKHQDZ2soFYFX5bSM2woDAKq4Reh0XTwwNtale'+
			'BDwxeMbQsBbfWqJ4wwWEojG4xuDbCNjx9a2loRZBMAJFY+gtuBSNORAk006/c1WgbiNW/W3Ks9Op'+
			'fn7iBgOOy1oYMJbRAyxdvMnpT29a5pufuJH6z1y4RuXz2798apdv4RWcfBA2B0SkSi1sUJ57B8DU'+
			'6Dh3v84xNjvNx3KFSwszAHwoVxhyXI6aAt0irIxfZbnhcyW2vy9XOOF6RFGU5l7LdMLLM+McdzxG'+
			'XI8hx0UlwOaBMDkgrCqNwE/vi40gXW9mXgwDQchJLeCJIkCXKvUwTO3HgpBBNYRhM163mzN558sc'+
			'AD/PVSgFlsIhACnE0sLCoY4hyiqW0aRVVpdT27eV5rq6uIjB4CJpXBXL+YxdMXzHcjbWfV9ZSeOn'+
			'pIdTGPoQNuOhP0hK6Uz8gzzSZgtkHxPFl0ExQLtf0n6EPoRiDoBETDsPyKZ8LF2Z02ha1lF+YPmF'+
			'4reIkxY6s6c1nDYA2oKQPZs9kQkdRHgtvQBM6ibXdYOKruPHdcjGleLtZXV9LextHW6Vfs3zqVOU'+
			'bWAz3pgLJKPZhaBAHSWIgT2gG8ED/ExcT9wq/j65ehBKbVSirZkQhBKK1yJ5UpMjMUxSOdMizuTI'+
			'1W4tBCBvNf5HKSWHOEJNSnSu7Kpbp/5b/AH87g4WVzg8OAAAAABJRU5ErkJggg==';
			break;
		}
		case "bluek" : {	
			hico = "ilyasviel.net63.net/icones/bluek.png";
			//"www.noelshack.fr/uploads/bluek076359.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQNH+Hl/bQAAAD7SURBVCjP'+
			'hdFPK4RxFMXxz2/Gn5pRFk9KbNhJEbHTlAVvQfa8IktlZ+EtyNLCwlN28goojPybZwZjrsUwTIqz'+
			'u93vOZ3bTZk8/KO65QQDUKst/QkfH+dRt5xk8lhfjJ5W5+5ibaH9a87kUYJm8Z1ydXvo6KwMZiYO'+
			'XN+deH5u6NX4CV9cboLpbB+MDM96bVVBCYpG/43j1R2vL6H8vqLdmtQsSiBl8giFetT6DKNpT9mU'+
			'ZKgLqnSTf6qStsFDbOmoC+3e7hecVI2mXXAfGzpuhPf+Gh2P3pwiDFoSWtrOJRWD5pWMSZDJo+NJ'+
			'aPTSCaHA22ffrAt/Gf57+webMHQzlgwMswAAAABJRU5ErkJggg==';
			break;
		}
		case "red" : {	
			hico="image.jeuxvideo.com/pics/forums/bt_forum_avertirmod.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhCwAMAMQAAAAAAP///94iD8ISALAQAIsNAOc+K/4nEf87Jv9PPbcqG50PAMwTAP8yHfdC'+
			'LrYRAOc1Ip8fEt8sGZ4YC/9EMLwRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUU'+
			'AAAALAAAAAALAAwAAAVAICOOIwAwSaqmzEm9QWA4r4jcsQLdYuPHEYlPdCjGJoKiaMAkFAoE5pIZ'+
			'WzykDOYgBsVqnd1BK9skVM6tE4kUAgA7';
			break;
		}
		case "redC" : {	hico = "ilyasviel.net63.net/icones/redC.png";
			//"www.noelshack.fr/uploads/redc090963.png";
			ico = hico;
		}
		case "blueG" : {	
			hico = "ilyasviel.net63.net/icones/blueg.png";
			//"www.noelshack.fr/uploads/blueg005213.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dE'+
			'AP8A/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQGDmihBI0AAAC6'+
			'SURBVCjPhdAxSkNBEMbx3z4kCA9rLyFiL3gREQsPkMoDeIRcIN5FxGPYWClEULF5Jk6Knaeb'+
			'FMnXDPvNf2a/3cI07NWswEE93O6jg1lJePHvxukGVcojriES/krwPIG7RDv0ONHE+Ny69Q1n'+
			'OMqBoYXft+Bv/GCJgo8WfkroMuszOhHzjHWDXrfzA/70gmETrhuIeBBxn94FftsYoyZKucJr'+
			'4x3iuPaqMY36ILllaGKsMEE/wuPAbq0B0Y8taKG3U2QAAAAASUVORK5CYII=';
			break;
		}
		case "apercu" : {	
			hico = "image.jeuxvideo.com/pics/forums/bt_forum_apercu.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhUAARALMAAAAAANbW1sXFxe/v7zMzM+bm5szMzPT09N7e3gAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAACH5BAUUAAAALAAAAABQABEAAATe0MhJq704672BN0cojmRpnmiqpsY3vHAsz3Rt3zjeGnnv'+
			'/8CapEAsGo/HoDKGbCKHzqiRQH1Rq4NrVQvjbgkDqRgqdn6z4HM3zY6dy1EJYk6v2+2Fs/5qbVOn'+
			'bEZ3g3YSAoeIiYqJElQIf5AEeQR1jpEIAZmWlAGGi5+goaCNWpN/k5VXRI6ZAZuYnqKys4wGm5MF'+
			'dI66lJKorZuZsbTEoaSPvZyaWq7Jc8zNBK3DxdW1Bq3Z2tvcVNydBtbiixPcGt0a44cA4eMc7xvq'+
			'6+zyAhSfF/XFHuzw/v8A4UUAADs=';
			break;
		}
		case "greenX" : {	
			hico = "image.jeuxvideo.com/pics/forums/bt_forum_bann_48h.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhCwAMAMQAAAAAAP///3O5GGGdFENsDjxiDJHdL1WJEYjPLITOJGakFUx7EJvlOojbHFuT'+
			'E2mjHUl2D4TUG1iOEpLjKFKEEVmNFWGbF47iIZbkMQAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAUU'+
			'AAAALAAAAAALAAwAAAVHoCKOIwAoTKqmyokFAWLAsjjBT4In4qXDgYqFp2hEBLCDQxARDQbAAMQx'+
			'cMIIBRjFYQ0UFleJU0IgSMjmlsJxdrAlXBNpHgIAOw==';
			break;
		}
		case "redX" : {	
			hico = "image.jeuxvideo.com/pics/forums/bt_forum_bann_defi.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhCwAMAMQAAAAAAP///8wTALAQAOc1IosNAHkLANYhDv9PPbwRAK8iFP8yHectGp4YC/Ym'+
			'EPdCLpcOAOc+K64bDMISAKQPALcqG4UMAP87Jp8fErYRAP4nEf9EMAAAAAAAAAAAAAAAACH5BAUU'+
			'AAAALAAAAAALAAwAAAVHoCCOIwAISKqmwrkFQfTAsnjBFYET4sLAMIyCIdI4DrCG5OAQTSbAQCEz'+
			'ccIsBhglYQ0YINeBc1AoDMjmliBxTrAHXBNpHgIAOw==';
			break;
		}
		case "redS" : {	
			hico = "image.jeuxvideo.com/pics/forums/bt_forum_sup_msg.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhCwAMAMQAAAAAAP///9cyIMwTALYRAKQPAHkLAN4iD20KAP9PPf8yHcYeDZceEfc5JfYm'+
			'EP9EMI8cEO8vG8ISAOc+K4sNAPdCLrAQAP87JqchE8cnF7wRAIUMAP4nEeYjDwAAAAAAACH5BAUU'+
			'AAAALAAAAAALAAwAAAVF4CCOIwAMSaqmw/m8QTxVj3hdcS40oqLEEAYmExFxOJ3c4uAQSZ4FSqyg'+
			'cUpysY3FSsghtFZJYWPYUFuDp8TC1lRNpHgIADs=';
			break;
		}
		case "redA" : {	
			hico = "ilyasviel.net63.net/icones/redA.png";
			//"www.noelshack.com/up/aac/reda-15b77e838.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dE'+
			'AAAAAAAA+UO7fwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kKCAoeLnPhYM8AAAD/'+
			'SURBVCjPhZE9TsNAFIS/XZsYBSGQLFEQWopIFKC4oADlCJyHE3CeHAFBQbEK9BFVqECxHEex'+
			'vYH4UXjjnwIx3dv5dnY1T5kQoSVxk1LNWbRAAfgAo5tb7Lbko7DYbQlA4GnO9gMCT2OenyRa'+
			'oHwAu1rysswYm1n7ER6jc66P+oyuLjGvb6JFYJ6kNTgZDpgMBwCMzYx5kiLZmvobNi+auM2m'+
			'k27zAuSngSXPavPu/asDS54hW93A0zjlwpkPh1UN96uqlmmcEntwoB3c1qnmT/kAe61Oe6oL'+
			'tD1lQiQp4bOqlxOX3J57CvqKajMmRNZld3O7TX671GPt4N0F/tEvtz9eQY1zkG4AAAAASUVO'+
			'RK5CYII=';
			break;
		}
		case "citer" : {	
			hico = "ilyasviel.net63.net/icones/citer.gif";
			//"www.noelshack.fr/uploads/citer083047.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhCwAMAIcAAAAAACAeezg2ezo4fCcklScklikmnC4rsDcz0Do23Ts23zw35Dw45T4560E8'+
			'+EE9+UM+/kM+/0hGlUhGlktJnFVSsFxZxExH/kxH/2Vh3Whl3mxo5Wxo62pm+W9r/3Fu5XRw/nRw'+
			'/3t3+Xh0/3t3/356/4J//oN//////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAACkALAAAAAALAAwA'+
			'AAhqADEIHDgwRQoMJxKeMMHQBIaDJSKimIjigwiBJEhMlDCBQgUOAkeMmDjAgoYNHQSGCDFRQAYQ'+
			'IDwIjABhYoAEECJEmBnBJs6cPBlQRMHgAU8HCAgUMHCgwUMMOh0sUKCg6MODAi9ovSAwIAA7';
			break;
		}
		case "couleur" : {	
			hico = "ilyasviel.net63.net/icones/couleur.png";
			//"www.noelshack.fr/uploads/couleur084255.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAADMAAAARCAYAAABwxZQXAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCDgsLHwFT+MsAAAAZdEVYdENv'+
			'bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADRklEQVRIx9WVu28cVRTGf3fu7k4se9cp00AL'+
			'hFeTUIAiGYkUQbHoEAU1JX8MJTUtL9HjgsQyBuI4fkWggIKMcWQR7+6s57Fz5x6Ku/Pc3bjeI43m'+
			'3PP47v3OPXNGidHCAotqZSrXW87y+cKSEfOF5ISUGC2oz1hokS9RrUxNyHxa94lgrSCTBlQKPM/d'+
			'5ovszqYQmdY9TxXrKkaOMy8v15t7KqUahL6atBlxYbNWiKKM4TAlTS1KKXzfY3m5hYgQBIY0tQC0'+
			'2x4rKy2UgtHIIAKdjsd47Py5rhSsrrbxfU2SZPT7KUliJyTB9zXttipsTYwkscXa9z16vTZLS7oo'+
			'ZKXntEi2LpKtizV3JRjckceH70tTjv/+QA721qbs+4/W5PfHZfyv27dm6ifHtyUOP5ST49sySw73'+
			'1y7FyOXoYE2CwR2x5m5xdjFaPEcpBEKsDRkOA1557UcAtrdu8teT9/j3n1vE8QXX39gAYPPeDTbv'+
			'3QDg9Tc3ePZsWBSn3x/N1KPoAmtDouiisP3w/dtsb93kyR/vYm10KcZ337wFwKvXNxgOA6wNi7OX'+
			'02zSZiJCHCdF8tWrlmvXLEoJYVjaV1dt7XajqGzTLEtm6iIxYBEZF7b1j3YBOD15hyzLLsXodEyh'+
			'J0mEiAXKVmsBZOa+SzRg0moPPnCh4nylfadGxpiDyuaHs3XzgMzUce7/pHj5Jeh2YVCpzzyM0eio'+
			'0LX3GzaDvARaa7ypn5CqgoIx7l2VzLonF6+CYu18rCyjNsV6Xej1oNWqx87D+PgTl/zLz4put74v'+
			'UCejFFy5Uq7P+3B6Cufn9aTBwD1l21G5/lJfWqpjPX8O47LLGAZwdjaNPw/j268dsyb52jQzCWIS'+
			'JI2R/n/I/i5TE+Tpn8ijnWn73kPk+Cmy97Du291BjvZnx8+SWfhNjK3NUj87RcYRxdnFaFFitFQ/'+
			'PmshDCEIIE1dBXwflpedbzQqq9vpuH73fVfNIHC+TgdWVlxuEEAcg9Yurt126yRx/tzexK9ijEZM'+
			'/mHuTJ7n2tP3yxvSWjNFxk0eB1z/65Zkm3al6jkvileq/k3Mw2/a8rgcK9+XygBQeas1CS2aFNNM'+
			'tTKltWbRRTWHwSKT+R+3MgG1BaaY/wAAAABJRU5ErkJggg==';
			break;
		}
		case "cyanD" : {	
			hico = "ilyasviel.net63.net/icones/cyand.png";
			//"www.noelshack.fr/uploads/cyand073376.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAA'+
			'AAAA+UO7fwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQSMx5nn8kAAADoSURBVCjP'+
			'jY9PasJQEIe/96IUFaVuSk+gC6EgybYX8CA9QM9RPIA7D2EuoIsoDy1dCoKLdmuNmGgkyesi/yqI'+
			'+sHALL6Z+Y3AVppb9CwBUAJ4tcyr7thWmp4lSgD7dPf86Vx6Wf5i1Bt0TZOFrbQE8HVSGc8fAwC+'+
			'Wk12P994YQTARTkIgrzfOmP2rkue2YszUwBwEjKXjzuXOAyLzRtnwsaZ5IK/Xp31WzUt5Hu5KOtB'+
			'Pwn19g6VGkhZZM4QwxF8zuDgwUMFanVod6Ba/feRrTQHH6IIfA/iOL0roVwGw4DGYypnAzf4A6Sp'+
			'VH1BrU4UAAAAAElFTkSuQmCC';
			break;
		}
		case "danger" : {	
			hico = "image.jeuxvideo.com/css_img/defaut/danger.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhHwAcAOYAAAAAAOXl2aWlnMZLR+UKCcsoJc7OxN6nnrmQiPn57L+/tvzv1OcZF+VcWPGE'+
			'ddzc0faxnud6c/Dw5M4qKOVBPu5lWryupayso8bGvN8TEfDVyvnQuf398P7+4uQlIr1sZtTUybx3'+
			'cfHk2NIuK/OTg+VQS7iclO22rfb26fvfx9fXzPB0Z+QzMO+clc5FQd46NumKg+3t4ba2ovjBrOfn'+
			'27qDfe1XTdwqKPWikMJVUdoaGOgpJN7e08RlX+tHP/Tm2riqou2on8zMzLm5r9UxLuqmnQAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5'+
			'BAQUAP8ALAAAAAAfABwAAAf/gByCg4SFhoeIiAktEigJiZCHQQQHARKPkZk/HgQ3GDwomZEJEQSm'+
			'PQYxmKKHGqamGUAPoayGKBSmDqYDGDSrtYJFphUdFaYIIJfAgpsEDAsdCwwEIwoBtLWkpiQd3SSm'+
			'H6m/ma4EOx0gACAdOwSxs9klpjMdAPYdM7u944knpjbd7AHoZuNYMn62ODFIEfBehxSmql0bVYqA'+
			'g271HHbQRSCcKkgapu2A1nBgtwXtdMjCZiiBPAIQMHaQAUCGTAimcuxD5I+AD5no1AH1YcqECmWF'+
			'UHAiwBCo0w4bIlpjyUEbgRVO060DusJUCHGEREx75lSgU2kEdFgANShBA1M4Vp5qffqNgE5fgnoS'+
			'oPe0L75XRi+hYPGqsOHDiCWigIG4seNXNZKVeEFkQoHLmDNr3nx5gotUMQwMuSCgtOnTqFOXvjAE'+
			'RAwJAR6AmE27tu3btR/QQBEIADs=';
			break;
		}
		case "darkl" : {	
			hico = "ilyasviel.net63.net/icones/darkl.png";
			//"www.noelshack.fr/uploads/darkl004182.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQ1GoYQtcAAAADeSURBVCjP'+
			'lZGxSsRAEIa/mWw0YiPKdQrhinRaiU+ifV7Bh/A97mlsLOws7prrDq5Q9A4J2ThjERJZOAj+1fLt'+
			't7PDjFRl7UxkuV4IQACYnd9O+b5cLyQAmLUAPL8+AnB3/USWFYgoABdnN1Rl7drLHWbdWObj640Y'+
			'9yMf7vrKHpM/Y7fnx1vU84QnbQwx7zBrMTsgf+5WCWyaLTstyLJiZKpHKP9IOAS37y/jeX71gPZD'+
			'S+X55T3fzQaziGqOiCISODmeASAAVVm7WYu7YRaBv6UajkogD6e9PDyY6vkXEDhYz3BrBjcAAAAA'+
			'SUVORK5CYII=';
			break;
		}
		case "edit" : {	
			hico = "ilyasviel.net63.net/icones/edit.png";
			//"www.noelshack.fr/uploads/edit009720.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAACAAAAARCAYAAAC8XK78AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCBQ8jC5bcrcEAAAAZdEVYdENv'+
			'bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB5UlEQVRIx8VWvc7iMBAce50fEI9BgcQ7UEAF'+
			'XRAlpOahaBCUSOmgp+NNKABRBQL+ueJkn034RHEnbqRI69Vmd3bsdcKyLDP4MoqiYNYWANDtdr/N'+
			'wVgSHACUUl99Op0OrPICAKSUIT1jYEx9ZxhjNT9jzL3zU4wfa+Pb7TayLDPCKuAXl1KiqirnZ4yB'+
			'iMA5d10AABEhjmMAwPP5hDEGRAStNZRSASkhBOI4BhE5Em8V0FrjdrthsVjUOpjNZlitVoFvOp2C'+
			'iLBcLn+MsZjP54jj+DOB+/3u1qPRCM1mE2maBkoNh0Psdjus12uMx2Pnl1Iiz3OUZYnNZgMAmEwm'+
			'aLVaSJIEUso6AT+xlc9iu90CAPI8D4j6SR6PR9BpFEUQQvwpIoRba62DWAEAx+OxtgUWvV4PjUYD'+
			'QghUVeX81+vV2ZfLxdmn0wlpmgYqns9nlGUJznlQnHMO8WlghRCIoijo2D/1f4uPBOxEcM4D+Xyb'+
			'iP4dATtyFvv93tmDwcDZh8MBANDv95EkSY2Mn+N19IJ6WZYZvxtjDJRSkFJCKeUuD8aYuwe01m5t'+
			'k9sDKoQAEbkcvu+VxNszYBUgomCf7cv+6fYT+h37Od7FBvUA4FWFb4Fz/vtjVBQFex2RbyHQ5X/8'+
			'G/wCvTw+p5pu/PoAAAAASUVORK5CYII=';
			break;
		}
		case "grayc" : {	
			hico = "ilyasviel.net63.net/icones/grayc.png";
			//"www.noelshack.fr/uploads/grayc094521.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQVNbhFrDsAAADcSURBVCjP'+
			'hZEtroZADABnN9tA9gBoFBrJRVAozGI4CwfAcyiOQHA4fvcJAh+IFyqbaTttlXPO8xFt2yoAA5Bl'+
			'2Rfv27ZVBmBZljtbVdWLapqGNE1xznkDsK4rAHVdA1CWJQBaa8IwJI5jbo0LvmKaJpIkwVqL1hqt'+
			'9Q9+agDs+44xBhFBKcW2bT+47/sXPAwD1lrCMLxzIoL+d33v8f59VeWc85fzPM90XfcCiqJARAiC'+
			'4NR4jsrznHEcz05KISJEUUQQBCiAZ/fjOFjX9VY4jgMRwVp7wlfB1xv/ANJJU6cQluBaAAAAAElF'+
			'TkSuQmCC';
			break;
		}
		case "green" : {	
			hico = "ilyasviel.net63.net/icones/green.png";
			//"www.noelshack.fr/uploads/green+013294.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQFLnjid4YAAADbSURBVCjP'+
			'jdG/TgJBEMfxz96djRqE0Jj4DkYFSwrfwgfwQXwpC2wpuWBrbaGFoqLHmUjiWnCH4P9fstmdmd/M'+
			'fJMN8nb0l7rjABn0Or1fvYN8EHXHIYPCdFEYOQe7D0fSRiakwX7nwEU+igmUXhan1l3/RjF5Xsln'+
			'tflKvrL6+vgS7NzvSbZSkMA0lj/yTvq3iscCBHk7KiNPbwxn4mlVOFlnM9AMHK6xnc4xwEaV/Bw3'+
			'w/xdM4M00AjCWYvhjFY1tZEsLNkXyOUN1cRa86jm/k6v1d0MPlr/8e3vZHxE6s+4B4AAAAAASUVO'+
			'RK5CYII=';
			break;
		}
		case "ignorer" : {	
			hico = "ilyasviel.net63.net/icones/ignorer.gif";
			//"www.noelshack.fr/uploads/ignorer022644.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhCwAMAIcAAAAAAFdSBVtVBWVfBWliBXFpBXdwB4+GCJSJB5ySCZ2TCaKYCaacCa+jCK+k'+
			'CrClCrOoCrSpCrmtCrquCrywCcu9Cc6/CdLECtXHCtfICtjKCtnLCtrMCt3NCt3OCt/PCuLSCuXV'+
			'CubWCv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAACQALAAAAAALAAwA'+
			'AAhsACcIHDiQBIkJIhKGWBhCxISDIECMmDiiQgcQAj98sDCxAAILHAR68JBh4oAGGS4I3LBBw0QC'+
			'FDRgEBghAoSJARJAiEDTJk6dPCfUpDjigIOgNRkYECDAAAOeByM8WKBAwYIHUA9OkMBVwsCAADs=';
			break;
		}
		case "inactif" : {	
			hico = "ilyasviel.net63.net/icones/inactif.png";
			//"www.noelshack.fr/uploads/inactif009481.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAADEAAAARCAYAAAB0MEQqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCBRAzM+Nm40MAAAAZdEVYdENv'+
			'bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACyElEQVRIx9WXS0v7TBTGf5nJpYnfw4XgBxBX'+
			'guhOd8GCItTLzs+jCFZEoZKdF3Dn2k/iwuKm2to2l/kv+k7eTDoBXfaBwEzOOTPznHPyDHHiOFYs'+
			'IJIkcfTYBVhdXV1EHkoTcQHyPF84BisrK8RxrJIkcVyALMvmaSqFUrNOc5yycjiOY7XpuX5X96vH'+
			'21C1NfnptQGWl5eJ41hZSSilyLKMyWQCgJRy1nuui5SSPM9Lm+/7KKVI05Q8z5FS4vt+6TedTsnz'+
			'HMdxkFKW77MsMw7sui5CiLIrpJRkWVbG6vggCJBSGom1kiiKgtFoxPn5OQCHh4fc3NxwdHREFEWk'+
			'acrFxQUAx8fH5HnO9fV1Gd/pdGi1WozHY7rdrrH26ekpl5eX1kp0Op3S/+DggNvb2zmfs7MzgiD4'+
			'HQmdaYDhcAjA1dUV+/v7RpkHgwFJkgCws7PD4+Mj3W6XdrtNr9cDoN1uE4ZhWcmTkxO+vr64v78H'+
			'YG9vj6WlJeMco9GoHO/u7hJFUflkWWaQEPrDtj0a1cXv7u4YDAblfDqdWrP68/Pzf6Zcl1arhe/7'+
			'uK6L53l4nlfa6/O62Dw8PNDr9RBCoJSiKArjjC7A+/u7tZ00Pj8/DfvT05PV9vHxYX3f7/cZDocI'+
			'Iazr9/t9vr+/DeLV+I2NDaIowvd9hBBGFaSUs0r8Bevr6422t7c3u6D/p1I2tfoNfN+3EjDa6S8I'+
			'w5DNzU1D8jTW1taMDGmkacp4PGYymVAUxZ9JaHWyEWgkoeWsmonqOIoitre352xhGJbjIAjY2toC'+
			'4PX1lZeXF56fnw0JrRNu2rMuqXPnjeNY1W9spZSh5UIIiqIw9LwoijKrOr7up+8b3UJCCDzPK+8D'+
			'LRjV+6dpzyYiUsrZh91UiWpmbOXV9rqyVKHJVFvPtv5v9mysBICtGouCUp2SJHGaMrAIMGq0qP8W'+
			'/wButZN61vlAZgAAAABJRU5ErkJggg==';
			break;
		}
		case "listegroupe" : {	
			hico = "ilyasviel.net63.net/icones/Listegroupes.png";
			//"www.noelshack.fr/uploads/Listegroupes015188.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAGQAAAARCAYAAAArDQkmAAAAAXNSR0IArs4c6QAAAAZiS0dEAAAA'+
			'AAAA+UO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCDgoUATfEoQEAAAAZdEVYdENv'+
			'bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAFTklEQVRYw+2Z32tcRRTHP2dm7iapjWlVBEub'+
			'TQyJsWna1L6I+BeI4IvS4osvgmhFKD7UFEEFMQiKikQRquCbQhVE8EX6JuJbbdq0TWpo0p9iEdua'+
			'7G52753x4d69O3fvTdNQIS+Zl52Zs9/v+c45M3PP3ZXhyUHHRlvvJucOno87w5ODbujJoY2QrGOb'+
			'/WU2TYoMTw66vif6NqKyzm3+13kAMQB1W88YnXNgk4ECEcnNAWDBORABBHDxOHMWV7CJ5Lmb9qbN'+
			'99GOy/lPuHz9q/GtRUM8Ga/D7/9fmrc9vo2rv111BmCZWiYZdtkRLYYA6M0GVRJs3ZvbpHEObCXC'+
			'RQ4JFCoQbMPh6hZnYzWiBCkpxAi2bnENlwqUDoW5RyNBwv1viE3sKhDUJo0IREtROt/E6S4FLra5'+
			'yCGlhKsk4MAuW6LFCBc6EJBSggGixSjjR2/WiBFc6FoYQIynoRKBAwmktYbmeu9Ss+pQmQ1sABph'+
			'2EpI5GjcCDnx1EkA9v60B3OvJrwVpXN7ju3Cho5TB6ZT3NgPo/z+zKnC47j72xGm9k/n5vcdH0N1'+
			'aULPX7ONfjOCMsLJZ0/ncHt/3E20FDHl+d93fAyNxi5b6tcbTD2XxT328xhu2XLi6amcNnOvIbwV'+
			'5jS2a9j19aOcfuFsrn83mo02+YRQ9c5X6LA3o3Rob0ZgVGau8WeDM6/OADDy+TClBwJ0l2Lvd6PU'+
			'/2ow/fK51BbcH0CtxT80MUCwNSC4LyDYYqCa9Tf07gCzb85x6sA0Oz99JIczPQYcTD0/3fL/YIDp'+
			'NlBxRDfCNBkjnw1jejSqU6E6FFGBn6n904x8Mcz0S7HmnZOxzzMHZ3Iawr/Dwv5daa66fEKi0GZO'+
			'iPXGNrREoc3NpX3ncAYIBNEK6ZLW3dklyCbB1ryKYnwuPlHfj2Jx8Qbw/Wtvb1SjHG7PsV3pNZH6'+
			'V6RcYaWFcSaet5UIlm382bR5N0XjViu40imZAPkabMMW9n2utWp23trThCyeXsxeWf+0BC7NVtIr'+
			'q9lqV5fpO9zL/PsXOfvKDP3jZYKtBtFC40YLW5mrYq7XM9jyoR0EWw2qSyGBgCXjr3axlb3qhWoh'+
			'Dgv942UuTCzc3v/MEvMfXkrHva9tb9n+qBT6rMxVMwHyNVTna4X9DNel2po0+88QCQS1aj1mXVxZ'+
			'eGWDMoLp1pRf3wHAhYkFbM3GlcoqTXUqVKdCtBTaMxxSjJMg9t+3mn+Jg5Jyhy37la+upUFTnSq7'+
			'XlusYSVtTa7+w71x8Negub2Z1QIYVSwSRLjIF0Z8BO3a621bs4SLEaoksViVTYx/tCWQQpzopMJp'+
			'9y+CGA/TyCbI59v+4kNcPnoN0XGF5PvJbCAvwH5Cfa7yoR2YHo3ZYoiWorVpXjUhkhW48FF85PvH'+
			'y5mvzb0zn/b7j5QJthhESQarAoG2uSYfwODEw0hH1n7ly2S3vdGL6daFuIG3+lbwD7pL0X+kzIX3'+
			'Frj4yeXWd9r4TE+89PkPLjHwdl96nSx87GHGY96m7crRaytwaXS3QSS7oe5Ecy78w5ODzidxLq6t'+
			'bdViQ4eouCYXJZka3VmHC12chM7keZAIau4y1anSGj/la75sGkmPc7tdjMR3q8S7rB0nWnBR3r+o'+
			'RFeiwUWJXu3xLdv4ncLEHAiokkrfXzIYX3/Cl+NqrjPZVJnY3aFm/9TlUiQiEIA2Gu3y92X2fkls'+
			'0nrjbGKbuEI+2nBF/hI6HRTgbuNflEApxrECX9GtAKBLeYyIgPL4irgK1r8WzTkp7adko63TT77N'+
			'KuvcwfPiP6Q22jomxR9s/Dey/u0/BgxQF71cBrEAAAAASUVORK5CYII=';
			break;
		}
		case "orange" : {	
			hico = "ilyasviel.net63.net/icones/orange.png";
			//"www.noelshack.fr/uploads/orange-009637.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQQExc/3YMAAACwSURBVCjP'+
			'lZFNDsFgFEXPq6a0koqZWddA2xjZjKkNdAkdsxcxZyRNjMxtQCPxk1B8Bq0Q+sNJ3uwM7n1XogBF'+
			'BV6IAOgAbn9QKkfBXHkhogOQHEplt9clClYqla8nfuF/WSVHAGS4/RLiSRvblJe8WMcA5NUcz3b4'+
			'DnRazxgZ05Gw3MD+DCp7qN34zJxhGeA7cH/7vCbQrOfINQ1ss7ig5oWIZRQLl1t6QDpjulL17A/m'+
			'HCzMjxYK5AAAAABJRU5ErkJggg==';
			break;
		}
		case "pinko" : {	
			hico = "ilyasviel.net63.net/icones/pinko.png";
			//"www.noelshack.fr/uploads/pinko066815.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQJHByAaQoAAAEdSURBVCjP'+
			'hdGxSltxFMfxz82NQwJaUQI2g3RwqWhRk0CXPkHHTH2C0rEP0HdQnyIIeYUuFcR6tdVBEOpW6BaT'+
			'kKRNc73/DlcThKK/8ZzvOXwPJ2pLgifSVI+gCPU3tUfh9pckNNWjImSDvPji7CH0/VXHfPzMznZN'+
			'+1sSChBGM3C/2rJfbYGtiyW/+j+lw1tQgGyUg3vLLZNxakPD5+o1OO0e6Q16ps7ZMCCSjYOt4mvP'+
			'/6xOVbJxkGbpbPPXziH4OHjnvJc4uTn0sjMHrodXzrrHIGpLwm8jA33vw9sHB36IPonFNjVUrOQa'+
			'UFK2Gx344XIKx2Jr1pWUZ855o2hJxaaGTHbnWFBSFt9hEdyr/C8Tf8GCxRy+H3jq7f8ArlRftbCK'+
			'5d8AAAAASUVORK5CYII=';
			break;
		}
		case "profil" : {	
			hico = "image.jeuxvideo.com/pics/forums/bt_forum_profil.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhCwAMAMQAAAAAAP///3LEGzpYGj5qD5LkO2m1GWClF3q0PKHnVlKAIVGLE4PHO6boX5Xc'+
			'SkyDEm69Gn/GM4zJS1mLJJrdUj9iGWWtGFaUFJzmTVWAJkNzEJflREJjIQAAAAAAAAAAACH5BAUU'+
			'AAAALAAAAAALAAwAAAVFoCCOIwAITaqmwpkkQRxIVCJisow44hYPnFiGISpEJopYRRERQQyHGIFw'+
			'MTghEMtDU4VcIbGFBfu1LMTkExZ6MKRPJFIIADs=';
			break;
		}
		case "purpler" : {	
			hico = "ilyasviel.net63.net/icones/purpler.png";
			//"www.noelshack.fr/uploads/purpler056280.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQbNr/P0A8AAAD3SURBVCjP'+
			'hdEtSwRhEADg5z1WV1QU0SjYrtw/EBQEUSzrXxCsgtW43Wqy+Bu8ZjSYxWAwieAHiKCIuHe7d74G'+
			'dT24cJNmmGeGgQmZPBoRbXmABFo2RvnYlocEKh2HcW1I7IVTqSlNqzJ5bEBPWYP1sG8rHICjuO3V'+
			'g1IBGtAfwJXCgqW6vnel8Ka+uQpF3TyPx3W+EnaNm1Tp/G++i5dD97bCpnfP+nqe3PzjwWiGVXAd'+
			'z0xbkJrW+GVDOJFaDjvgIp7o+hB9gZDJY6WjVHhxC+Yt6au8eZRIzVk0aVaATB5LnypdMCYV0dMV'+
			'9SXGTZj5wX8Do974DfeRT9Ogx94NAAAAAElFTkSuQmCC';
			break;
		}
		case "rep" : {	
			hico = "ilyasviel.net63.net/icones/rep.gif";
			//"www.noelshack.fr/uploads/rep057497.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhCgANAOdiAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4O'+
			'Dg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEh'+
			'ISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0'+
			'NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdH'+
			'R0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpa'+
			'WltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1t'+
			'bW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CA'+
			'gIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOT'+
			'k5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaam'+
			'pqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5'+
			'ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zM'+
			'zM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f'+
			'3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy'+
			'8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEKAP8ALAAAAQAKAAwA'+
			'AAhmAIEB+yeQ4L+DwPb5wsbPlzJdB3/tC1fOX7hi9nb966VvXz9//nThwqWLVz59/T76K/dNVyxq'+
			'MGPCjNVqHr17+E7u29eKlUyZrDrJk1fPHs6TnSD9jAnJELx49OoVxWkoj9WrWAMCADs=';
			break;
		}
		case "rep_off" : {	
			hico = "ilyasviel.net63.net/icones/rep_off.png";
			//"www.noelshack.fr/uploads/rep_off020374.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBDQ8BNusS9c8AAACoSURBVBjT'+
			'hc+9SkNBEMXx31y3EuwtRIs8htrlpXwtWyOmzSOIlTbWEhJBxWOzN5iLHweGObvs/M+OJVmSJKY+'+
			'ibEGOMddVY5x0f0hbqqiaxjdDEcYlBne+9CiP65bconCgFJgIT5HGlqw4yOilLnyLN7wgLbpZl/Z'+
			'O72ifeCsRx/0/r3gfox+9LeC9oLTfvETsbBCW+PpH+IabYuTyR9NiNeoq+mKv+gLy/s/MdZtnZAA'+
			'AAAASUVORK5CYII=';
			break;
		}
		case "retour" : {	
			hico = "ilyasviel.net63.net/icones/retour.png";
			//"www.noelshack.fr/uploads/retour039758.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAADEAAAARCAYAAAB0MEQqAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kCBQ8wI8KGRKkAAAAZdEVYdENv'+
			'bW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADRklEQVRIx9WXz4vdVBTHPzfJSzKTTKYDHfwx'+
			'LrrRFmeoTgvFQXEjIrPQghtXorgQ/ItcSsGNCCLtRl2UkWln2oIUBLUDthbEwjg+5728TCfJey/H'+
			'xZ0kN+/Fdv0uXHJyzj3f7z0/7g1RHCTCLI7lUJWiA/DZYjBzMXx+kEgZiAPweAZr8VEUcOUkEAcg'+
			'nVggIkhRgJxEpxTKsrTN1Jc2pRCRpv5JfpN6qDFMeWK9UqoB/0EU8NVBIroSEwEUacqw16PIMgAs'+
			'z8MJQ1CK0WBQ6bEsbM9DuS6S54yzDMZjbbNtbN/HDgIQ0X7DoXbrdGq8JAERLNelyHNtd12KLKvf'+
			'PQ8nirDn5qrgzTHVTjIuyA97bJ95rrHwtbu/YLkuO6svToG8vveQm2fPtJb9jQd/MYr73Hr15Sfi'+
			'Xdr9iTsbF6fkcmz8fA9v5QXsIJiqiAWQmFOEwfFxteClr78F4Nb6Kv39/Up/9ptrrN24w/reQ7Io'+
			'4sIfj1jbvl3Z17Zvs/77nyRpWgWwurXD6tZOK96g12uVS/7d8+eI45ikKBr7rSqRm+0EDI3eHrtu'+
			'JWdpfXr23n8XgPOPuhBFyPw8xVFS2YulJYqlJUbGRovFxUYGMyNZw7INJ+QGf5YhIqi2drr7T7fW'+
			'jEZweFi9Ptj/u5LvG6Tq6vewsgKLp6AQfRb6cWX/rR+DP9/AuhfHDfL7/X4tGzZTNvl/TY6g+y/Y'+
			'dg3i+VhPu8rk04/1pq/9AGFYGxYW9HSc8kZoBzD7d1zoWTWzQV8UrT4V/3fXNX/LwbaeRqy++PKk'+
			'ZjYoY/lgAN0u9HtQ3lbmhpXS0/UMn1hPMxHlyLNa9v1pftthqo/+NwilGiA886zOyOZb0OnUGXrv'+
			'HWTjAvLKuToI08/3ddmjBdSPu9rn8iZyeVPTbO3C8yv6CcgnH2r99Ztwenma/+03YTRurbjiIBGy'+
			'1PxQQHqsMy0CrgvDoQ7O6UCWQp7rd9vW9nBBP7NU+5VZ9uc0xvFjSBKNAzoZYairlGe1rdOBINDY'+
			'R0dNfsvSPJ7XrLjntwRRBlL2qFKNL2ejd0udZdXrSnupM/FMnEkfkVpvnhGT38RsBAG0BjIro7qd'+
			'lkOF5zOro1mbGf23+A/Sr5o+b30eUgAAAABJRU5ErkJggg==';
			break;
		}
		case "voir" : {	
			hico = "ilyasviel.net63.net/icones/voir.gif";
			//"www.noelshack.fr/uploads/voir035885.gif";
			ico = 'data:image/gif;base64,'+
			'R0lGODlhCwAMAIcAAAAAAFVQBVdSBVhSBWReBmVfBmdgBWliBWtjBWtkBXNsBoJ5BoN6BpOKCJSL'+
			'CJ2TCaKYCaacCa6kCq+kCrSpCrerCbmsCbmtCrquCsS3Ccq8Ccu9CdjKCtnLCtzMCt3OCt/PCuLS'+
			'CuXVCubWCv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
			'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAACUALAAAAAALAAwA'+
			'AAhrADEIHDiwRAkMIxKKEDFiIYaDIUKQIKFh4gYPAkGAmLhgIoMMAj98mIhgYoIKAjtwmGhg4gEL'+
			'FzBQoDAxwMQBDwTOhDCRhIACEHRSmNCAxAACDSYIpSDBgQIHEig8lDlzQoQJMx8eHBhzYEAAOw==';
			break;
		}
		case "yellowE" : {	
			hico = "ilyasviel.net63.net/icones/yellowe.png";
			//"www.noelshack.fr/uploads/yellowe032856.png";
			ico = 'data:image/png;base64,'+
			'iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'+
			'/wD/oL2nkwAAAAlwSFlzAAAOwwAADsMBx2+oZAAAAAd0SU1FB9kBHAQXI36ne+gAAAD7SURBVCjP'+
			'hdExTsMwGIbh908ipXGahrQS4gJIHRAKIksHxo6cgZGJvbeAuQeAE8CSEQaEooqZhRNAF5KSITGD'+
			'o1qUiv6LJeux9X225AWaHTPNEAAPIDs9+xfnxaOeZogHoPkCIGHxB74vj0nTlLx41R2ufoHr+QHR'+
			'wMF1hWjgkE16rGNs4rqumZz0SIaC52lU+G1xq0ujxCyzqyUAbx8Jqi+IIxY/P30CcN71vLgURvsQ'+
			'xzA+AhVCoDq8OX4Ah2OI98D37f5WPL+xT3/3IARqC769FxYvsCohCMF1QSkTpR91lfICvaqgaaAq'+
			'oW3tBW1j8iajdX9zYNe3/wDkuz+sWEgdaQAAAABJRU5ErkJggg==';
			break;
		}
		case "Menu-messages" : {	
			hico = "ilyasviel.net63.net/icones/Menu-messages.png";
			//"www.noelshack.com/up/aac/menu-messages-2ec1b9cd41.png";
			ico = 'data:image/png;base64,'
				+ 'iVBORw0KGgoAAAANSUhEUgAAAF4AAAAUCAYAAAAEEYpkAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A'
				+ '/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJDxELJRmCUasAAAC/SURBVFjD'
				+ '7ZfhCoAgDIRd+P6vvP4kSKSec1OI+35JzTzOzVlKhBBCCHFFvh6qqg4nigjtczQeMb1nfmt+Hdtb'
				+ 'o8RFx5zSU7isBs9WSnmHbOyOmBN6anJIGYlIEVKPZzczKua0njDjrdVhMcgaY9HkpWd41MjDexze'
				+ 'eDrr1JXkVfa7NMMZr6qKNiFPoWjjRps7WgGz2b1y2chI+bXOae+jptcTorN6ZU2LP5eXKK9M39ng'
				+ 'Ir6HzucPFCGEEEL+wQ1CEsgezHaNIAAAAABJRU5ErkJggg==';
			break;
		}
		case "Menu-profil" : {	
			hico = "ilyasviel.net63.net/icones/Menu-profil.png";
			//"www.noelshack.com/up/aac/menu-profil-732af9b565.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAYAAAAwaEt4AAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJDxEMJCHE9/oAAACX' +
				'SURBVFjD7ZZLDoAgDEQp4f5Xrhu7IQjDp0DivJXRUfHRNoZACCFkO1I6qaravFFEfiUGkfIl' +
				'p3avZZFMLYdkLGfX82Pk2+KIgBEQ4ZapZZHMCpJLGQKV5JW5WkxPdXi8a4WshO48MiNm2/Gm' +
				'gZ5au4EOu1kJ+tIr51gr2WK9h51nuyHPzAXHUwscrYJd7cYfPEIIIffwAFWueBRfqQxfAAAA' +
				'AElFTkSuQmCC';
			break;
		}
		case "Menu-pseudonyme" : {	
			hico = "ilyasviel.net63.net/icones/Menu-pseudonymes.png";
			//"www.noelshack.com/up/aac/menu-pseudonyme-31e5f7fd31.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAHkAAAAUCAYAAACpkJLNAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJEREZNlUOQAoAAAD1' +
				'SURBVGje7ZjRDsMgCEWr8f9/2b3MxC4KF0S7Jvc8tStS5CJjuy5CCCGEEHKENPqw1lrVhSkl' +
				'pu+lIiMCz4SW1va2iJ1m057PYuhtvPFYbJB4Vt/140fS5XafPWJ6aIEjRWQptJ3xWGws7wzI' +
				'j2mvZUt7AE44UjhRXwmeeLw2aDxaxwHz85zI3tMaVRxPEtWFwPxAwmet4prj/nrlNEk+TrTp' +
				'bcONsK/owpTcjVJYtGpCBwLLpkbP33hqrUNYVNHMhJ7JU5C2oU2qu9rZ6iQabfMPbf+rhclX' +
				'jhYm4iSsDmWW9Sfb7IlfMqPl/DOEEEIIIYSQKD5UkN4mxaH5vQAAAABJRU5ErkJggg==';


			break;
		}
		case "Menu-topics" : {	
			hico = "ilyasviel.net63.net/icones/Menu-topics.png";
			//"www.noelshack.com/up/aac/menu-topics-3433165d25.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAEYAAAAUCAYAAAAwaEt4AAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJDxELGEHqHboAAACp' +
				'SURBVFjD7ZZLDoAwCAWh6f2vjKsmLmh5/drENyujQOpAqyKEEEKOo95NM7MwUVV/JQaRUpMT' +
				'5Zb4Wlz03ItBa6J1C2lEwAytxSFN8WKQmj0NFxHJS8fP6U5NKjJtoxPZU/OImNX0dhmRgMpK' +
				'UeGS9L7+9FAcXEMrz5OVo46hh9dNEmrbGZ0gaCsVOaul7JA8e7B3f5VWvkRrCnZsE6SmF8Mf' +
				'PEIIIffwAGfWgCK4aKvGAAAAAElFTkSuQmCC';
			break;
		}
		case "Menu-general" : {	
			hico = "ilyasviel.net63.net/icones/Menu-g%e9n%e9ral.png";
			//"www.noelshack.com/up/aac/menu-general-875dce5767.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAFUAAAAUCAYAAAD88XGTAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJEREiBzhirwgAAACz' +
				'SURBVFjD7ZZLDoAgDESFcP8r44qEGKW/ASSZt4V06rSlXhchhBAUaYdorbV+JpRSWh1niamj' +
				'ZP+Q9HGdqjF0ZKymeyJ3ek0pjraTJa12rm2k7DXP2+HRO+3MUnxvHK9GmdL+iiJ47rx95Kw4' +
				'kaKVWe+KlLjXIKsOcoIgpvbJad7Do5bJxEVbpOppF8OKrkQ+I89vWzr+TdwiEhk3q9moOEit' +
				'jDIJuaB2jy9//gkhhBBi4waRyKgRBiD/MgAAAABJRU5ErkJggg==';
			break;
		}
		case "yuu" : {	
			hico = "ilyasviel.net63.net/icones/yuu.gif";
			//"www.noelshack.com/up/aac/yuu-d65a2f4939.gif";
			ico = 'data:image/gif;base64,'+
				'R0lGODlhEwAQAKUiAAAAAD0AAG4AAHkAAJsAAPM6AP1MAP9ZDP9eMd5lZedwAf9iUdttbf1v'+
				'AP93ENGJAP+BEf9+QuCTAf+DbP+ISM+SkvyUAP+Ghv+Rkf+tF8DAwP+3YPvDAP+9nf/Cwv/j'+
				'Hv/wfv/5zv//////////////////////////////////////////////////////////////'+
				'/////////////////////////////////////////////////////////yH/C05FVFNDQVBF'+
				'Mi4wAwEAAAAh/ghCeSBTb2ZlYQAh+QQJDwA/ACwAAAAAEwAQAAAGhcCfcPgDGI3E5ND4aTaR'+
				'SiGA0wRZQc/otAoKebEfQFIDeAK8IiNWTNwCrGeAKL0ekjkZwGYT73j0YXYAFg4HCIcbC4oI'+
				'EXmCCg0HR3xGCBSOQmQKFmUhaR+eABmcdmQSU12oIVNsgqcSVACwYadjpkccR7VKGmQAD8DA'+
				'UFG9vkcaUbbFyUEAIfkECQ8APwAsAAAAABMAEAAABo3An3D4AxiNxOTQ+Gk2kUohgNMEWUHP'+
				'6LQKCnmxH0BSc7SGjKIQVkxkhkEALyC9HmoCgEwGAO90AB5qYUMVAwYHBwgbCAgLCxMbdUIV'+
				'AgVHG0cIFJGDk3gfISIAoKIbGx8cbD8aZBxdU69NqWMAElS1t6gSqkKsR6lGHBy7Ub4AD8jI'+
				'UMXGRxpRY6ys0EEAIfkECQ8APwAsAAAAABMAEAAABo/An3D4AxiNxOTQ+Gk2kUohgNMEWUHP'+
				'6LQKCnmxH0BSw7QaRaIQVkzcAkAALwCtDg8rAEvmDdh0AB1pa0IeCQQGBwcbCIwLEx1Wdj8e'+
				'DARHe0YIFBuRbB54HyEiAKGjG5wfHGw/ZBxdU69OqkkAElS1t00cEqtCZEa8RhzDvFEavw/J'+
				'yVDGx0dGGlFjx8fSQQAh+QQJDwA/ACwAAAAAEwAQAAAGjcCfcPgDGI3E5ND4aTaRSiGA0wRZ'+
				'Qc/otAoKebEfQFJztIaMohBWTGSGQQAvIL0eagKATAYA73QAHmphQxUDBgcHCBsICAsLExt1'+
				'QhUCBUcbRwgUkYOTeB8hIgCgohsbHxxsPxpkHF1Tr02pYwASVLW3qBKqQqxHqUYcHLtRvgAP'+
				'yMhQxcZHGlFjrKzQQQAh+QQJDwA/ACwAAAAAEwAQAAAGhcCfcPgDGI3E5ND4aTaRSiGA0wRZ'+
				'Qc/otAoKebEfQFIDeAK8IiNWTNwCrGeAKL0ekjkZwGYT73j0YXYAFg4HCIcbC4oIEXmCCg0H'+
				'R3xGCBSOQmQKFmUhaR+eABmcdmQSU12oIVNsgqcSVACwYadjpkccR7VKGmQAD8DAUFG9vkca'+
				'UbbFyUEAIfkECQ8APwAsAAAAABMAEAAABonAn3D4AxiNxOTQ+Gk2kUohgNMEWUHP6LQKCnmx'+
				'H0BSA+AaRaLQMbn9gABegAj+FgvJ1M8GsOnAAR17AUN4HxkRCIkLHQuJBwMedwASHBkQCEd7'+
				'RgcCkT9klBkZZSFzH6UAAZ4aoFRTXa9qY5OUk66UYWOgtUYca0qsRg/Dw1BRrGRHABpRusjN'+
				'QQAh+QQJDwA/ACwAAAAAEwAQAAAGi8CfcPgDGI3E5ND4aTaRSiGA0wRZQc/otAoKebEfQFID'+
				'4IaMohAIuqR+rAAvQATAioVkN2gD6HTmABsZAB54Wx8bEQgICwsdiwcEF4VkElQZFItHFEcY'+
				'lACWHxmYZSF0H6aEPxqVbmEcXVOxQ5WhYaGgVHertRy+RxJHY2QAD8bGbEqsxEcaUcPLz0EA'+
				'IfkECQ8APwAsAAAAABMAEAAABonAn3D4AxiNxOTQ+Gk2kUohgNMEWUHP6LQKCnmxH0BSA+Aa'+
				'RaLQMbn9gABegAj+FgvJ1M8GsOnAAR17AUN4HxkRCIkLHQuJBwMedwASHBkQCEd7RgcCkT9k'+
				'lBkZZSFzH6UAAZ4aoFRTXa9qY5OUk66UYWOgtUYca0qsRg/Dw1BRrGRHABpRusjNQQA7';
			break;
		}
		case "puppy" : {	
			hico = "ilyasviel.net63.net/icones/puppy.png";
			//"www.noelshack.com/up/aac/puppy-639a02b417.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJFxEUBA0cMBsAAAE8' +
				'SURBVDjLjVNBSsQwFH2Rbiy4c13c6gFcCfYAI4zMBTzJ4B0Edw5zgkGYC2SoKxfiZphtmeJG' +
				'XAwIVWnkuUiTpknK+KCQ/37eS/p/vqgVEUOaiCBRKwqfS4aErLLAVLQ51yjxxU0BJCet+Oim' +
				'Z8Bqbo2MSbJXfDjuX+NzDlZZZ1IrQkpJAGSVkVVGADr+edEf2XG7qd1TKwJtEdkUsAkDYxJw' +
				'jkny/LQKqi2EwH84ADiIkfqgFl+PIRczeHsV+H3YgqPUnsbZBFiswdmk467PgMV6+B0AAEep' +
				'Xiw3wNUpsNxoocH3Cqr80GspJU0XyjtBdQtbcQDk/XEQNwX6XXANbDt3064DXmz29QyMidtS' +
				'I/BjI64VdRHPLy5F+zu2oKrcAu/jaOzOgnCn0byJPM8xBH8iRWycY4/L3NLHH8IKJjYnBhYZ' +
				'AAAAAElFTkSuQmCC';
			break;
		}
		case "v" : {	
			hico = "ilyasviel.net63.net/icones/v.png";
			//"www.noelshack.com/up/aac/v-d005704810.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJFxMHK8SmmL4AAAEY' +
				'SURBVDjLjZPNTcNAEIXfWJtIIFGBpYgOEi6cQLgESkgXqSFnGnAJKWGjIA5cMBfOli1XEMlI' +
				'ZKXJwdn17E8S3m29ep9nZ95Qbxgp3SqKLnrDFH5T54zcziIone4kSIXmww5Q9yfz3dIDcFs6' +
				'kIWoq+abV7+MfQluZw6iAODzfcvABfP0IYJ4TyiKAocdzuvva4AIELclSBFn9u9J/W58SEIZ' +
				'rimEyLNsYlcRcjRDH/alP4HA9L8KRKNSd6ZuhpFqrdk2sn4j5AsepyEnIoCmbjB5HgKVPT69' +
				'ePHsKnJ0ZwzMXTVaqDfscmCrAIB8kR7OzwcwX41xJrtMEgIA3+vYPF/FS0VyG2UmLEhKa43w' +
				'yZRa51S4QqPVEQFEkZW6PjetAAAAAElFTkSuQmCC';
			break;
		}
		case "Menu-secrets" : {	
			hico = "ilyasviel.net63.net/icones/Menu-secrets.png";
			//"www.noelshack.com/up/aac/menu-secrets-b9d5338773.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAFUAAAAUCAYAAAD88XGTAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJHAYCCNZa+xMAAADE' +
				'SURBVFjD7ZbRCsAgCEVt9P+/3J4GMdz0qsVg9zyNoZV21UQIIYSQD9O0n2OMYTq21pg+Z1I9' +
				'CX1L7Jv/ZZ+xQdbw2FnxovuJiBzR5EUVnrVB/BGBZM8805fI33EJERstuIiNpeone6+4liR1' +
				'RfCRdpPZK7POYQVxOc3fEfVVlWJlu6pYT4urWzfjbfqomjJKmX21CrifuyLJSJV0TyCeKYmq' +
				'0ZruOwZN5QCGp39FcHMbyZQborodb2ltDz7+CSGEkL9xAm8iqDJwbyHcAAAAAElFTkSuQmCC';
			break;
		}
		case "ouin" : {	
			hico = "ilyasviel.net63.net/icones/ouin.gif";
			//"www.noelshack.com/up/aac/ouin-d45cd6c812.gif";
			ico = 'data:image/gif;base64,'+
				'R0lGODlhEwATANU8AP///9GJAADj/b/5/wC/1f8AALPX/8nJyWSt/5mZmWZmZu/3/97u/zAt' +
				'GGuBmcHe/zArBuHv/5Gvz0hWZjAwMGZbDMHZ1dHcpfnrz2ZgMmROAFGMzycaACocAHmmz4Cx' +
				'zy8lAIZYATY2NrvJ2SQkJJeXlzAAAMHTz9Hn/3Nzc73Fzf70z5CfmWYAAFQ3AJmIEjxomf/8' +
				'5/PUmf/0pYm15uCTAf/5zvvDAMDAwP/wfv/jHgAAAP///wAAAAAAAAAAACH/C05FVFNDQVBF' +
				'Mi4wAwEAAAAh+QQFCgA8ACwAAAAAEwATAAAGeUCecMjbGY3E5NCoazaRSuHu1sxZc8/otJqz' +
				'ebG6XRK3q+68gDNWTNzqcmfvDmBbD8nUt9Vro9uFeFx7X388ZDV5V4qFh3l6ijo3bIaNYWWW' +
				'kZOAOzU1l0yRnmOHiDempqJKOGQ7Aa6uUFGrrEc4UaOzt7q7vL2+QkEAIfkEBQoAPAAsBgAK' +
				'AAYAAgAABgnAnW4n1N2KxCAAIfkEBQoAPAAsBwAKAAYAAgAABgnAnU63ExKNuyAAIfkEBQoA' +
				'PAAsBgAKAAcAAgAABgpAHW/HE+6IxmIQACH5BAUKADwALAYACgAGAAIAAAYJwJ1uJ9TdisQg' +
				'ACH5BAUKADwALAcACgAGAAIAAAYJwJ1OtxMSjbsgACH5BAUKADwALAYACgAHAAIAAAYKQB1v' +
				'xxPuiMZiEAAh+QQFCgA8ACwGAAoABgACAAAGCcCdbifU3YrEIAAh+QQFCgA8ACwHAAoABgAC' +
				'AAAGCcCdTrcTEo27IAAh+QQFMgA8ACwGAAoABwACAAAGCkAdb8cT7ojGYhAAIfkEBQAAPAAs' +
				'DAAGAAEAAQAABgPAXRAAIfkEBQAAPAAsCwAHAAMAAgAABgfAnWHHIwYBACH5BAUAADwALAsA' +
				'BwADAAMAAAYJQB6AtzPsiLwgACH5BAUAADwALAsACQADAAEAAAYFwB1iFwQAIfkEBQAAPAAs' +
				'DAAJAAIAAwAABgdAAw+x2/GCACH5BAUAADwALAsACgADAAMAAAYJQJ6Bt0PsiLwgACH5BAVk' +
				'ADwALAoACQAFAAQAAAYPwJ2BB9jtEMQdD2lQOnlBACH5BAUKADwALAYAAwAJAAsAAAYpQN6O' +
				'RxwSj8hj7ghIIptO227phCJzw52Otx0ajrfhlmewFhGIb9LICwIAIfkEBQoAPAAsBgAEAAkA' +
				'CwAABi7AXW7H2wGIvKRyyWwubc5cI9dsxBpNiAVySxYKJoll1VmCPicMk+PZSChNEjwIACH5' +
				'BAkKADwALAYABQAJAAsAAAYtwB1PSOQZj8ikMplb5jLNZGVWOe6uu4umdi0UWg6HLOliORKK' +
				'JIyGSiMVcF4QACH5BAkKADwALAAAAAATABMAAAZZQJ5wSCwaj8ikcslsKne5nW0HkOaUuaxt' +
				'C7Bdk1ntNqvUhc9fpM6M1pV1u/had1Pe4vjXrfbExxUhO30FhDsTgko4fhMjAAmJOJEpDxGO' +
				'TgkPlI+XCZtOSEEAIfkECQoAPAAsAAAAABMAEwAABopAnnDI2xmNxOTQqGs2kUrh7tbMWXPP' +
				'6PSZs9l2WN0uidtxd18AWJzcinPondqGHQvL1MHVawPo2XduV11eVoA8ZTVUOoODh4mLjI06' +
				'N3aIkE9MTZVkOzWKR0w3NZZ3iaFHpFE4ZUYFrzsipWSsqCoHUUSsrCULCwC4uUkHDL/BwkPE' +
				'xcfIQgfPSUEAIfkEBQAAPAAsAAAAABMAEwAABnlAnnDI2xmNxOTQqGs2kUrh7tbMWXPP6PSZ' +
				's9l2WN0uidtxd18AWJzcinPondqGHQvL1MHVawPo2XduV11eVoA8ZTVUOoODh4mLjI06N3aI' +
				'kE9MTZVkOzWKR0w3NZZ3iaFHpFE4ZUYFr0dRpq1HOLJErLm3u7y9vrtBACH5BAUAADwALAUA' +
				'BwAJAAEAAAYHQAFvSOQJggAh+QQFAAA8ACwEAAcACwACAAAGC8ABb0gkDgTFpCAIACH5BAUA' +
				'ADwALAMACAANAAIAAAYMwAFvSCzyBgKjUhAEACH5BAUAADwALAMACQANAAIAAAYMQB6BRywW' +
				'h0OjUhgEACH5BAUAADwALAMACwANAAEAAAYIQAJvSCzyCEEAIfkEBQAAPAAsAgAKAA8AAwAA' +
				'BhJAgoBHLBp5AgLhyCQul83iMggAIfkEBQAAPAAsAgAKAA8ABAAABhNAAW9ILBKFQqNRSFA6' +
				'm00nsRkEACH5BAXIADwALAIACwAPAAQAAAYWQAFvSCwShQKCsUgQNpXL4ZMHjUp5QQA7';
			break;
		}
		case "skin-select-noir" : {	
			hico = "www.noelshack.com/up/aac/skin-select-iphone-6c8c04f382.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHQ8yNeYZ3RsAAACH' +
				'SURBVBjTldExDoQgEIXhnwQ7qampvQLNnJyaC5hwAYyFhTUxbOVuSFaCr5vJN1PMKAARqXQS' +
				'QlAAWkSq955lWf7CGCNADSEoDXCe5918jLW2aoCcMyPRAMaYLjqOYxy/2tzgeZ4fwXVdLd62' +
				'Decc0zQ1sJRCSulbq5GnrOv6w/cdewP7vqsPjWQtFfcEXFAAAAAASUVORK5CYII=';
			break;
		}
		case "skin-select-ds" : {	
			hico = "ilyasviel.net63.net/icones/skin_select_ds.png";
			//"www.noelshack.com/up/aac/skin-select-ds-2a1255d435.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRILMmIH9SEAAACS' +
				'SURBVBjTY2RgYGA4ps/wnwEPsLrIwMgAU/hnbsN/XOBPY8x/mGEsDAwMDEz3LjH8bYrFZziD' +
				'iorKfxYGBgYGxiMbGZgZCAMWBgYGBgZZNfyqPlxHKP4vr4lf8WVkxbLqDAzUcAbjj6+oihmP' +
				'bWZg9ElmYODiQ1X57RMDw9IuhEZiIiXuqwpCMSwc8Wm4c+cOIwDcQ0CFQtHPfwAAAABJRU5E' +
				'rkJggg==';
			break;
		}
		case "skin-select-iphone" : {	
			hico = "ilyasviel.net63.net/icones/skin_select_iphone.png";
			//"www.noelshack.com/up/aac/skin-select-iphone-6c8c04f382.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHQ8yNeYZ3RsAAACH' +
				'SURBVBjTldExDoQgEIXhnwQ7qampvQLNnJyaC5hwAYyFhTUxbOVuSFaCr5vJN1PMKAARqXQS' +
				'QlAAWkSq955lWf7CGCNADSEoDXCe5918jLW2aoCcMyPRAMaYLjqOYxy/2tzgeZ4fwXVdLd62' +
				'Decc0zQ1sJRCSulbq5GnrOv6w/cdewP7vqsPjWQtFfcEXFAAAAAASUVORK5CYII=';
			break;
		}
		case "skin-select-pc" : {	
			hico = "ilyasviel.net63.net/icones/skin_select_pc.png";
			//"www.noelshack.com/up/aac/skin-select-pc-de8d69a948.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHREtGpYqYKYAAACD' +
				'SURBVBjTrdGxDcQgEETRj4REAVACFdCS66IDaMGSAxcBInJIB4iAi3yWg0MEN9lKbyfYFQDb' +
				'tg0m8d4Lbrjv+/iVEMK4yyRArZUY46wca+2QACklViIBtNZTdF3Xg40x/2texr33N84545xD' +
				'KfWCrTXO8/zOYuUpx3E8+L7jbKGUIj7FeEarOuoqbgAAAABJRU5ErkJggg==';
			break;
		}
		case "skin-select-ps2" : {	
			hico = "ilyasviel.net63.net/icones/skin_select_ps2.png";
			//"www.noelshack.com/up/aac/skin-select-ps2-25ecdc5b16.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHgIMKN63lgIAAACS' +
				'SURBVBjTY2RgYGBgCDn2nwEfWGPFyABT2LDlz39cIGbBn/8ww1gYGBgYLj1nYohd+Bev4Soq' +
				'Kv9ZGBgYGDZeZmRgYGBmIARYGBgYGNTE8Cu6/gxJsaY4fv9dRzZZXew/AzGAoDO+/mJEVbz5' +
				'CiNDsiUjAx8HqsJPPxgYuvYg+IzERIrKhTgkxdBwxKfhzp07jAAxREBWokDX9wAAAABJRU5E' +
				'rkJggg==';
			break;
		}
		case "skin-select-ps3" : {	
			hico = "ilyasviel.net63.net/icones/skin_select_ps3.png";
			//"www.noelshack.com/up/aac/skin-select-ps3-06381e6882.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRE5AqvoL6UAAACn' +
				'SURBVBjTY2RgYGBg0F7xnwEfuBrByMDAwMDCoL3iv7tXMMOklHtY1fm3KTPcYFjxn+FqBCML' +
				'AwMDw43HTAz+bcp4DZeTk/vPwsDAwPDw4V0GYgALAwMDAwOHAn5Vn84hFMuLM+NV+/AVksnK' +
				'UvgD4+FlJMWKErgVf/vFhOrmPeeYGEIdGBl4OFEVfvnOwLBmKyOcz0hMpMh9LkNSDA1HfBoe' +
				'PXrECACG0injH6GevgAAAABJRU5ErkJggg==';
			break;
		}
		case "skin-select-psp" : {	
			hico = "ilyasviel.net63.net/icones/skin_select_psp.png";
			//"www.noelshack.com/up/aac/skin-select-psp-acf29f9372.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRE2KPfL+rwAAACR' +
				'SURBVBjTjdEhDsJAEIXh/yVrWoHHbyBcgatAMEgOgcegOAjhDlyAAGaDQdc0qaMdBDS0oss+' +
				'N8k3k8mMADicjVg2c9HC7aO2oSyutbXDHMClEstbEx3uvTcHcCwEiH9xAJM8ju5dPMssHU9z' +
				'IyWfNbJhUDXq41Mh1mMxcn1YvmD3/NVKeYrfrzr4e8dYQwhBbyk2QJ2aWPfbAAAAAElFTkSu' +
				'QmCC';
			break;
		}
		case "skin-select-web" : {	
			hico = "ilyasviel.net63.net/icones/skin_select_web.png";
			//"www.noelshack.com/up/aac/skin-select-web-fcbc05cc50.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRE0KMX9mD4AAACJ' +
				'SURBVBjTY2RgYGA4lsbwnwEPsJrFwMgAU/jvQN1/XODf+qj/MMNYGBgYGBheX2H4vyEan+EM' +
				'Kioq/1kYGBgYGG9tZCAGQEwWVsOv6uF1hOL/wpoEzERSzCCkRiVn/P6Gpvj2FgZGg2QGBnY+' +
				'VIU/PzEwHO+CcxmJiZS4fSoIxbBwxKfhzp07jADXjD+jlgklkwAAAABJRU5ErkJggg==';
			break;
		}
		case "skin-select-wii" : {	
			hico = "ilyasviel.net63.net/icones/skin_select_wii.png";
			//"www.noelshack.com/up/aac/skin-select-wii-d12a850016.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRINBPvnxz4AAACa' +
				'SURBVBjTY2RgYGDYw2D4nwEPcGE4z8gAU/g7f/L/z58/Y8W/vSv/wwxjYWBgYGC+/ICBI6IN' +
				'n+EMSkpK/1kYGBgYvu07w0AMYGFgYGDglhbHr+rpJ4Ti/+qyBBTfRij+pyaNX/E+JGcwqOBW' +
				'zPj1B6qbmbadYmCIc2Vg4ONGVfnpKwPj4j0IjcRESprSR4RiWDji03Dv3j1GAJIuQG7EaFTY' +
				'AAAAAElFTkSuQmCC';
			break;
		}
		case "skin-select-x360" : {	
			hico = "ilyasviel.net63.net/icones/skin_select_x360.png";
			//"www.noelshack.com/up/aac/skin-select-x360-7127416f54.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9kJHRIOEiQeIawAAACU' +
				'SURBVBjTY2RgYGBgOKb/nwEfsLrIyABT2Ph77n9cIPZ303+YYSwMDAwMF5nvMcT9acZruIqK' +
				'yn8WBgYGho2MR6Da8AMWBgYGBjUGWbyKrjN8QCjW/C9PQPFlhGL1/7IMxACCzvjK+ANV8WbG' +
				'YwzJjD4MfAxcKAo/MXxj6GJYCuczEhMpKnFfkRRDwxGfhjt37jACAN3yQIh8WU6pAAAAAElF' +
				'TkSuQmCC';
			break;
		}
		case "Titre-modo" : {	
			hico = "ilyasviel.net63.net/icones/Titre-modo.png";
			//"www.noelshack.com/up/aac/titre-modo-1474038d50.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAADMAAAARCAYAAABwxZQXAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kJHhcxFfba8zYAAAAZ' +
				'dEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAACI0lEQVRIx9WXsU8UQRTGf7ND' +
				'XEJiCAWBRCyMgcLmYoW55qAjsbcjFhaU/CE2EmkotKGh1pBYQAjNqgUxZ2EkSCzAZNF4F073' +
				'2DldxuJmN3vr7t0shfFe8pK335tv572ZL7OzQkupGWI7W4oEwPQ2jADo1dWhbWZqbU3z9KHw' +
				'eY7QUmq9sjLMm4PY2IDHD0S3meVlht3E5mZXZoShFUFFEd+UYtJ1caXMxQFO223U5SUAruMw' +
				'MzZWiLtSoqKoMFfGRgBEEFgN/hIE3N7dZb9a5d7ERFLI22aTmufxYXGRr0qx4Hk9vP1qlUnX' +
				'5c7e3l/43fFx3p2fU8vhxHPYmgNAu23lyjRd8zxe+z6tVos3vp8UctxoJI28rFR4Uakk4z81' +
				'GsmkT+bmet5TK+CcNJvoILCrL94ZW5nR6SThwsEBz2ZneXR0lGChUkl8y3F6JZrK3Ujlflxc' +
				'FHPCEITouo1pKfVvsPL3oPvZVipfB11PPW9ZxFlOHfQvy9q0lNq56umxblZr3XbV/oFduZl5' +
				'4LMQzKewa6n42Hhe7jQVX+/DccsWVUZmhykJfDQSOMzIYidHijsZ+aTx7304Py3rimUmtJQ6' +
				'iiK77wxwYuKbZuWymDYr30ntyAwgzDhl4hgfBcICzmiJTZFSUqoZTLGYgoqw7M11ED4oZ9uM' +
				'c7YUCVniwyRyJspiIuOD8EE56wNgert7jZYlrw7/5f0sDvz7MPVquP9t/gAg5PNLm8P8iQAA' +
				'AABJRU5ErkJggg==';
			break;
		}
		case "avert" : {	
			hico = "ilyasviel.net63.net/icones/avert.png";
			//"www.noelshack.com/up/aac/avert-2a6302a433.png";
			ico = 'data:image/png;base64,' +
				'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAMCAYAAABbayygAAAAAXNSR0IArs4c6QAAAAZiS0dE' +
				'AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kKAw4iMsQbaqIAAACR' +
				'SURBVBjTjc5BDsIgEEDRXyHqfbybh/IwXsETGG2lLcIwdAMLTUB/Mrs3A0M+nzI17yB6iJ4U' +
				'3mgMaBKOlzBYAG5XvjNlZjUAWFbA0UxEC7y7PowVvuQHpMBn+AvuWAK9ZK4XR4FHG2oqME+J' +
				'ofe0FphWgw37JlyyAhGrcuj+URFgxKoI3hq8CABzVjwwkT8WNj2iUllbs4igAAAAAElFTkSu' +
				'QmCC';
			break;
		}
		case "css-page-debut" : {	
			hico = "image.jeuxvideo.com/css_img/defaut/page_debut.gif";
			ico = 'data:image/gif;base64,'+
				'R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZswAmQAAAAAAAAAAAAAA'+
				'AAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ+MKVDK5UT6A3CyZwWBAK1IRpClscJIIggDGYK'+
				'I8NA1O+t761ODEYgFEwj3ABRKBgoI9nP+ZxIi9SPxGKRRAAAOw==';
			break;
		}
		case "css-page-prec" : {	
			hico = "image.jeuxvideo.com/css_img/defaut/page_prec.gif";
			ico = 'data:image/gif;base64,'+
				'R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZswAmQAAAAAAAAAAAAAA'+
				'AAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ6MKVDK5UT6A3CyZwWBAIVIqNQHhyCqoOpuQhM'+
				'yAA9DMTNdgEXj1AwpQSIXsFAOQ6XzImNaIhKLBZJBAA7';
			break;
		}
		case "css-page-retour" : {	
			hico = "image.jeuxvideo.com/css_img/defaut/page_retour.gif";
			ico = 'data:image/gif;base64,'+
				'R0lGODlhDAAMALMAAP////7+/vf39/Hx8fDw8Obm5uXl5eDg4NXV1czMzJmZmWZmZswAmQAA'+
				'AAAAAAAAACH5BAUUAAwALAAAAAAMAAwAAAQ5kDFFK5UT6A2EypwmCAMVdmSpcMtCvIWpta1h'+
				'HDJNH/iKDoMCD2EaAYUHRIJiDA4Ty8nxGZVYLJIIADs=';
			break;
		}
		case "css-page-suiv" : {	
			hico = "image.jeuxvideo.com/css_img/defaut/page_suiv.gif";
			ico = 'data:image/gif;base64,'+
				'R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZswAmQAAAAAAAAAAAAAA'+
				'AAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ6MKVDK5UT6A3CyZwWBALFIR1ZHieiDuaGzMNA'+
				'xN2M2Deb0gRCwTQS7IIFA6Uo4CWVE0ETaYBKLBZJBAA7';
			break;
		}
		case "css-page-fin" : {	
			hico = "image.jeuxvideo.com/css_img/defaut/page_fin.gif";
			ico = 'data:image/gif;base64,'+
				'R0lGODlhDAAMALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmWZmZswAmQAAAAAAAAAAAAAA'+
				'AAAAAAAAACH5BAUUAAkALAAAAAAMAAwAAAQ+MKVDK5UT6A3CyZwWBAK1IRpClsepIoIwmCli'+
				'DwNBA/ZN6K3ODfErmEYIHKJQMFBGsRyh6ZxEi4aqxGKRRAAAOw==';
			break;
		}
		case "css-puce-prec" : {	
			hico = "image.jeuxvideo.com/css_img/defaut/puce_base.gif";
			ico = 'data:image/gif;base64,'+
				'R0lGODlhDAAPALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmVFRUcwAmQAAAAAAAAAAAAAA'+
				'AAAAAAAAACH5BAUUAAkALAAAAAAMAA8AAAQ+MMlJq60n6zwP+CAQHIkXfkEgZCeSCqsJIgg8'+
				'sACtIwOB7zSCz/QKEgqslwAhLBgyyt7R8CzZmlSSZLO5XCIAOw==';
			break;
		}
		case "css-puce-suiv" : {	
			hico = "image.jeuxvideo.com/css_img/defaut/puce_fleche_gauche.gif";
			ico = 'data:image/gif;base64,'+
				'R0lGODlhDAAPALMAAP////f39/Hx8ebm5uDg4NXV1czMzJmZmVFRUf///wAAAAAAAAAAAAAA'+
				'AAAAAAAAACH5BAUUAAkALAAAAAAMAA8AAARAMMlJq60n6zwP+CAQHIkXfkEgZCEiqqsJIEgq'+
				'CAM70/xA6Dwe4WcK0AY+QoFlQyQLhowNN4RGS7en4SrZbC6XCAA7';
			break;
		}
		case "css-puce-info" : {	
			hico = "image.jeuxvideo.com/css_img/defaut/publi_info.gif";
			ico = 'data:image/gif;base64,'+
				'R0lGODlhCgAKAMIHAAAAAJmZmWZmZszMzLOzs8DAwKampv///yH5BAEKAAcALAAAAAAKAAoA'+
				'AAMfeBc1U0Ed4uogq6oaqNuO9x2WBYZlhWnkaKSGNIVSAgA7';
			break;
		}
		case "" : {
			ico = '';
			break;
		}
	}
	
	var cont = context[0];
	if (GM.let("JVN:Secret:DebugMode:Img:Local",false)) {
		cont = "http://127.0.0.1/";
	}
	
	if (GM.let("JVN:Secret:DebugMode:Img:Base64",false)) {
		hico = ico;
	}
	
	if (mode == null || mode == 0)
		return ico;
	if (mode == 1)
		return ico;
	return (new Array(ico,ico));
}

var Create = {
	Element : function(type) {
		return $(document.createElement(type));
	},
	Image : function(id,src,alt,title,name) {
		var img = Create.Element("img");
		img.attr("id",id);
		img.attr("alt",alt);
		img.attr("title",title);
		img.attr("src",src);
		img.attr("name",name);
		return img;
	},
	Icone : function(id,icone,alt,title,name) {
		var img = Create.Element("img");
		var ico = Icone(icone,0);
		var aico = Icone(icone,1);
		img.attr("id",id);
		img.attr("alt",alt);
		img.attr("title",title);
		img.attr("name",name);
		img.attr("src",ico);
		img.attr("icone",aico);
		var onerror = document.createAttribute("onerror");
		onerror.nodeValue = "this.src = $(this).attr('icone');";
		img[0].setAttributeNode(onerror);
		return img;
	},
	Style : function(style) {	// Crée un style CSS
		var stl = document.createElement('style');
		stl.type = 'text/css';
		stl.appendChild(document.createTextNode(style));
		head = document.getElementsByTagName("head");
		if (head.length > 0)
			head[0].appendChild(stl);
		return $(stl);
	},
	Style2 : function(style,head) {	// Crée un style CSS
		var stl = document.createElement('style');
		stl.type = 'text/css';
		stl.appendChild(document.createTextNode(style));
		if (head!=null)
			head.appendChild(stl);
		return $(stl);
	},
	Script : function(script) {
		var scr = document.createElement('script');
		scr.type = 'text/javascript';
		scr.appendChild(document.createTextNode(script));
		head = document.getElementsByTagName("head");
		if (head.length > 0)
			head[0].appendChild(scr);
		return $(scr);
	},
	Script2 : function(script,head) {
		var scr = document.createElement('script');
		scr.type = 'text/javascript';
		scr.appendChild(document.createTextNode(script));
		if (head != null)
			head.appendChild(scr);
		return $(scr);
	},
	Option : function(id,value,text) {
		var option = Create.Element("option");
		option.attr("id",id);
		option.attr("value",value);
		option.attr("text",text);
		return option;
	},
	Menu2 : {
		Get : function() {
			var menu2 = $("#menu2");
			if (menu2.length == 0) {
				var page = $("#page",menu2);
				menu2 = Create.Element("div");
				menu2.attr("id","menu2");
				if (page.length > 0) {
					page.append(menu2);
					Create.Menu2.Vide();
				}
			}
			return menu2;
		},
		Vide : function() {
			var menu2 = Create.Menu2.Get();
			var rubrique = Create.Element("div");
			rubrique.attr("id","menu_rubriques");
			if (menu2.length != 0) {
				menu2.html("");
				menu2.append(rubrique);
			}
			return rubrique;
		},
		NewBloc : function(name,id,ico) {
			var menu = Create.Element("div");
			menu.attr("id",id);
			
			var n = 0;
			var rubrique = $("#menu_rubriques");
			if (rubrique != null) {
				n = $("#menu_rubriques > div").length;
				rubrique.append(menu);
			}
			
			var titre = Create.Element("h3");
			menu.append(titre);
			
			var span = Create.Element("span");
			span.text(name);
			titre.append(span);
			
			if (n>0) {
				var style  = "#menu2 #"+id+" {"+"\n";
				style += "background-color:#C7E3F1;"+"\n";
				style += "}";
				Create.Style(style);
			}
			
			var style  = "#"+id+" h3 {"+"\n";
			style += "background:transparent url("+ico+") no-repeat scroll 0 0;"+"\n";
			style += "}";
			Create.Style(style);
			
			var options = Create.Element("ul");
			menu.append(options);
			
			return menu;
		},
		NewItem : function(name,href,menu) {
			var a = Create.Element("a");
			a.attr("href",href);
			a.text(name);
			
			var li = Create.Element("li");
			li.append(a);
			
			var ul = $("ul",menu);
			if (ul.length > 0)
				ul.append(li);
			
			return li;
		}
	},
	Col1 : {
		Get : function() {
			var col1= $("#col1");
			if (col1.length == 0) {
				var page = $("#contenu");
				col1 = Create.Element("div");
				col1.attr("id","col1");
				if (page.length > 0) {
					page.append(col1);
					Create.Col1.Vide();
				}
			}
			return col1;
		},
		Vide : function() {
			var col1 = Create.Col1.Get();
			
			var titre = Create.Element("h2");
			titre.addClass("titre_page");
			
			var bloc1 = Create.Element("div");
			bloc1.addClass("bloc1");
			
			var inner = Create.Element("div");
			inner.addClass("bloc_inner");
			bloc1.append(inner);
			
			if (col1.length != 0) {
				col1.html("");
				col1.append(titre);
				col1.append(bloc1);
			}
			return titre;
		},
		NewBloc : function(name) {
			
			var p = Create.Element("p");
			p.addClass("alerte");
			p.css("font-size","125%");
			p.text(name);
			p.css("padding","4px");
			
			var table = Create.Element("table");
			p.append(table);
			table.css("width","100%");
			table.css("font-family","Tahoma,Arial,Helvetica,sans-serif");
			table.css("text-align","center");
			
			var tbody = Create.Element("tbody");
			table.append(tbody);
			
			
			var inner = $("#col1 .bloc_inner:first-child");
			if (inner.length > 0) {
				if ($("p",inner).length > 0)
					inner.append(Create.Element("br"));
				inner.append(p);
				inner.append(table);
			}
			
			return tbody;
		},
		NewItem : function(title,descr,element,href,menu,act) {
			if (act == null)
				act = true;
			var tr = Create.Element("tr");
			var padding = "1px 4px";
			
			var bool = Create.Element("td");
			tr.append(bool);
			var img = Create.Icone(element,"inactif","Inactif","","");
			if (act) {
				img.css("cursor","pointer");
				img.click(function() {
					var bool = GM.let(element,false);
					if (bool) {
						GM.del(element);
						this.src = Icone("inactif",1);
						$(this).attr("icone","inactif");
						this.alt = "Inactif";
					} else {
						GM.set(element,true);
						this.src = Icone("actif",1);
						$(this).attr("icone","actif");
						this.alt = "Active";
					}
				});
				var b = GM.let(element,false);
				if (b) {
					img.attr("src",Icone("actif",1));
					img.attr("icone","actif");
					img.attr("alt","actif");
				} else {
					img.attr("src",Icone("inactif",1));
					img.attr("icone","inactif");
					img.attr("alt","inactif");
				}
			}
			bool.append(img);
			bool.css("padding",padding);
			bool.css("width","50px");
			
			var edit = Create.Element("td");
			tr.append(edit);
			if (href != null) {
				var a = Create.Element("a");
				edit.append(a);
				a.attr("href",href);
				
				var img = Create.Icone("","edit","","Editer les propriétés avancées","");
				a.append(img);
			}
			edit.css("width","40px");
			edit.css("padding",padding);
			
			var titl = Create.Element("td");
			tr.append(titl);
			titl.text(descr);
			titl.css("padding",padding);
			
			if (menu.length > 0)
				menu.append(tr);
			
			return tr;
		},
		SecretEffect : function(key,title,descr,element,href,menu,act) {
			if ((key == null || GM.let(key,false)) || GM.let(element,false)) {
				var item = Create.Col1.NewItem(title,descr,element,href,menu,act);
				item.css("background-color","#DDEEFF");
				return item;
			} 
		},
		ReturnOption : function(href) {
			var a = Create.Element("a");
			a.attr("href",href);
			
			var img = Create.Icone("","retour","","Retour","");
			a.append(img);
			
			var inner = $("#col1 .bloc_inner:first-child");
			if (inner.length > 0) {
				inner.append(Create.Element("br"));
				inner.append(Create.Element("br"));
				inner.append(Create.Element("br"));
				inner.append(a);
			}
			
			return a;
		},
		Tableau : function(id,title,legend,text,line) {
			var p = Create.Element("p");
			p.addClass("alerte");
			p.css("font-size","125%");
			p.text(title);
			p.css("padding","4px");
			
			var div = Create.Element("div");
			div.html(legend);
			
			var tab = Create.Element("textarea");
			tab.text(text);
			tab.attr("id",id);
			tab.attr("rows",line);
			
			var inner = $("#col1 .bloc_inner:first-child");
			if (inner.length > 0) {
				inner.append(Create.Element("br"));
				inner.append(Create.Element("br"));
				inner.append(p);
				inner.append(Create.Element("br"));
				inner.append(div);
				inner.append(tab);
			}
			
			return tab;
		},
		TabMaJ : function(id,title,fun) {
			var button = Create.Icone(id,"MaJ","[Mise à jour]",title,"");
			button.css("cursor","pointer");
			button.click(fun);
			
			var inner = $("#col1 .bloc_inner:first-child");
			if (inner.length > 0) {
				inner.append(Create.Element("br"));
				inner.append(Create.Element("br"));
				inner.append(button);
			}
			
			return button;
		},
		Liste : function(id,title,legend) {
			var p = Create.Element("p");
			p.addClass("alerte");
			p.css("font-size","125%");
			p.text(title);
			p.css("padding","4px");
			
			var div = Create.Element("div");
			div.text(legend);
			
			var tab = Create.Element("table");
			tab.attr("id",id);
			var tbd = Create.Element("tbody");
			tab.append(tbd);
			
			var inner = $("#col1 .bloc_inner:first-child");
			if (inner.length > 0) {
				inner.append(Create.Element("br"));
				inner.append(Create.Element("br"));
				inner.append(p);
				inner.append(Create.Element("br"));
				inner.append(div);
				inner.append(tab);
			}
			
			return tab;
		},
		NewLine : function(tab) {
			var line = Create.Element('tr');
			var tbd = $("tbody",tab);
			if (tbd.length > 0) {
				tbd.append(line);
			} else {
				tab.append(line);
			}
			return line;
		}
	},
	Col2 : {
		Get : function() {
			var col2 = $("#col2");
			if (col2.length == 0) {
				var page = $("#contenu");
				col2 = Create.Element("div");
				col2.attr("id","col2");
				if (page != null) {
					page.append(col2);
					Create.Col2.Vide();
				}
			}
			return col2;
		},
		Vide : function() {
			
			var str  = "#liste_forums li {";
			str += "	position: relative;";
			str += "	padding-right: 20px;";
			str += "	cursor: move;";
			str += "}";
			str += "#liste_forums li span {";
			str += "	display: none;";
			str += "}";
			str += "#liste_forums li:hover {";
			str += "	background-color: #F5F5F5;";
			str += "}";
			str += "#liste_forums li:hover a.supp_pref {";
			str += "	display: block;";
			str += "	width: 10px;";
			str += "	height: 10px;";
			str += "	text-indent: 20px;";
			str += "	position: absolute;";
			str += "	top: 2px;";
			str += "	right: 0;";
			str += "	background: url(http://image.jeuxvideo.com/css_img/defaut/bt_forum_supp_pref.png) no-repeat top left;";
			str += "}";
			str += "#liste_forums li:hover a:hover {";
			str += "	background-position: left bottom;";
			str += "}";
			str += ".ui-sortable-helper {";
			str += "	background: none !important;";
			str += "}";
			str += ".ui-state-highlight {";
			str += "	height: 1.5em;";
			str += "}";
			
			Create.Style(str);
			
			var col2 = Create.Col2.Get();
			var bloc3 = Create.Element("div");
			bloc3.addClass("bloc3");
			
			var title = Create.Element("h3");
			bloc3.append(title);
			title.addClass("titre_bloc");
			
			var span = Create.Element("span");
			title.append(span);
			span.attr("id","bloc_forums_img");
			span.text("Mes liens préférés");
			
			var inner = Create.Element("div");
			bloc3.append(inner);
			inner.addClass("bloc_inner");
			
			var ul = Create.Element("ul");
			inner.append(ul);
			ul.attr("id","liste_forums");
			ul.addClass("liste_liens");
			
			var p = Create.Element("p");
			inner.append(p);
			p.addClass("lien_base");
			
			var a = Create.Element("a");
			p.append(a);
			a.attr("href","#");
			a.text("Ajouter un lien");
			a.click(function() {
				var href = prompt("Adresse du lien",self.location.href);
				if (href != null && href != "") {
					var name = prompt("Titre du lien",$("title").text());
					if (href != null && href != "") {
						var id = Save.New.Pref(href,name);
						Preferences.Add(href,name);
					}
				}
			});
			
			var p = Create.Element("p");
			inner.append(p);
			p.addClass("lien_base");
			
			var a = Create.Element("a");
			p.append(a);
			a.attr("href","http://www.jeuxvideo.com/forums.htm");
			a.text("Tous les forums");
			
			if (col2.length > 0) {
				col2.html("");
				col2.append(bloc3);
			}
			
			sort("#liste_forums",new Array(
				"delay:300",
				"items:'li'",
				"cursor:'move'",
				"update:function(e,ui) {"+
					"ui.item.css({'top':'0','left':'0'});"+
					// "Preferences.Reorder($('#liste_forums').sortable('toArray').join(','));"+
				"}"));
			
			return ul;
		},
		NewItem : function(id,href,name) {
			var liste = $("#liste_forums");
			var li = Create.Element("li");
			li.attr("id","link_"+id);
			
			var a = Create.Element("a");
			a.attr("href",href);
			a.text(name);
			li.append(a);
			
			var a = Create.Element("a");
			a.addClass("supp_pref");
			a.attr("forum",id);
			a.attr("href","#");
			a.attr("alt","Supprimer le lien vers "+name);
			a.attr("title","Supprimer le lien vers "+name);
			li.append(a);
			a.click(function() {
				Preferences.Remove($($(this).parent().get(0)).attr("id"));
			});
			
			var span = Create.Element("span");
			span.text("[Supprimer]");
			a.append(span);
			
			if (liste.length > 0)
				liste.append(li);
		}
	},
	NyuMenu : {
		Init : function(titre) {
			Create.Menu2.Vide();
			var title = Create.Col1.Vide();
			title.text(titre);
			return title;
		},
		NewBloc : function(name,id,ico) {
			var menu = new Array();
			menu[0] = Create.Menu2.NewBloc(name,id,ico);
			menu[1] = Create.Col1.NewBloc(name);
			return menu;
		},
		NewItem : function(title,descr,element,href,menu,bool) {
			var item = new Array();
			if (href != null)
				item[0] = Create.Menu2.NewItem(title,href,menu[0]);
			item[1] = Create.Col1.NewItem(title,descr,element,href,menu[1],bool);
			return item;
		},
		SecretEffect : function(key,title,descr,element,href,menu,act) {
			if ((key == null || GM.let(key,false)) || GM.let(element,false)) {
				var item = new Array();
				item[0] = Create.Menu2.NewItem(title,href,menu[0]);
				item[1] = Create.Col1.SecretEffect(key,title,descr,element,href,menu[1],act);
				return item;
			}
		}
	},
	Profil : {
		New : function(pseudo,date) {
			var global = $("#profil");
			var contenu = $("#profil p:first-child");
			
			var h1 = Create.Element("h1");
			h1.addClass("sexe_i");
			h1.attr("id","pseudo");
			h1.text(pseudo);
			Create.Style(".sexe_i, .sexe_i a {color:#888888;}");
			global.append(h1);
			
			var descrip = Create.Element("div");
			descrip.attr("id","descrip");
			global.append(descrip);
			
			var table = Create.Element("table");
			table.attr("cellspacing","1");
			table.attr("cellpadding","0");
			table.attr("summary","détail identité pseudo");
			table.attr("id","profil_tab0");
			descrip.append(table);
			
			var tbody = Create.Element("tbody");
			table.append(tbody);
			
			tbody.append(Create.Profil.Info("Age","0 ans"));
			tbody.append(Create.Profil.Info("Pays","Inconnu"));
			tbody.append(Create.Profil.Info("Membre depuis","0 jour"));
			tbody.append(Create.Profil.Info("Dernier passage",date));
			
			var img = Create.Element("img");
			img.attr("border","0");
			img.attr("id","avatar0");
			img.attr("alt","Avatar - "+pseudo);
			img.attr("src","http://image.jeuxvideo.com/avatars/default.jpg");
			descrip.append(img);
			
			var p = Create.Element("p");
			if (contenu.length > 0) {
				p.text(contenu.text());
				contenu.remove();
			}
			p.attr("id","cartevisite0");
			descrip.append(p);
			
			var clearfix = Create.Element("div");
			clearfix.addClass("clearfix");
			descrip.append(clearfix);
			
			global.append(Create.Profil.Barre("nbpost","Nombre de messages postés sur les forums : 0","messages",12,0,null));
			
		},
		Info : function(titre,val) {
			var tr = Create.Element("tr");
			
			var th = Create.Element("th");
			th.addClass("t1");
			th.attr("scope","row");
			th.text(titre);
			tr.append(th);
			
			var td = Create.Element("td");
			td.addClass("t2");
			td.text(val);
			tr.append(td)
			
			return tr;
		},
		Barre : function(id,titre,objet,height,width,src) {
			var div = Create.Element("div");
			div.attr("id",id);
			
			var p = Create.Element("p");
			div.append(p)
			
			var strong = Create.Element("strong");
			strong.html(titre);
			p.append(strong);
			
			var img = Create.Element("img");
			img.attr("height",height);
			img.attr("width",width);
			img.attr("alt","barre nombre "+objet);
			img.attr("src","http://image.jeuxvideo.com/pics/blank.gif");
			div.append(img);
			
			if (src != null)
				Create.Style("#"+id+" img {background:transparent url("+src+") repeat scroll left center;margin-top:5px;}");
			
			return div;
		}
	},
	Affichage : {
		Spoiler : function(element,bool) {
			var span_global = Create.Element("span");
			span_global.css("margin","1px");
			
			var img_suiv = Create.Icone("","css-page-suiv","","","");
			img_suiv.css("cursor","pointer");
			var img_prec = Create.Icone("","css-page-prec","","","");
			img_prec.css("cursor","pointer");
			
			if (bool) {
				img_prec.hide();
				element.hide();
			} else {
				img_suiv.hide();
				element.attr("src",element.attr("name"));
			}
			
			span_global.append(img_suiv);
			span_global.append(element);
			span_global.append(img_prec);
			element.css("clear","both");
			
			var onclick = document.createAttribute("onclick");
			var txt  = '$(this).hide();'+"\n";
				txt += '$(this.nextSibling).attr("src",$(this.nextSibling).attr("name"));'+"\n";
				txt += '$(this.nextSibling).show("slow",function() {'+"\n";
				txt += '	$(this.parentNode.lastChild).show();'+"\n";
				txt += '});';
			onclick.nodeValue = txt;
			img_suiv[0].setAttributeNode(onclick);
			
			var onclick = document.createAttribute("onclick");
			var txt  = '$(this).hide();'+"\n";
				txt += '$(this.previousSibling).hide("slow",function() {'+"\n";
				txt += '	$(this.parentNode.firstChild).show();'+"\n";
				txt += '	$(this).attr("src","");'+"\n";
				txt += 	'});';
			onclick.nodeValue = txt;
			img_prec[0].setAttributeNode(onclick);
			
			return span_global;
		},
		DirectImage : function(href) {
			var img = Create.Image("","","","",href);
			var maxwidth = parseInt($("#col1").css("width"));
			img.css("max-width",(maxwidth-10)+"px");
			return Create.Affichage.Spoiler(img,!(GM.let("JVN:Affichage:Images",false)));
		},
		Dailymotion : function(code) {
			var width = 480;
			var height = 332;
			var src = "http://www.dailymotion.com/swf/"+code+"&related=0";
			var allowFullScreen = true;
			var allowscriptaccess = 'always';
			
			var object = Create.Element("object");
			object.attr("width",width);
			object.attr("height",height);
			
			var para = Create.Element("para");
			para.attr("name","movie");
			para.attr("value",src);
			object.append(para);
			
			var para = Create.Element("para");
			para.attr("name","allowFullScreen");
			para.attr("value",allowFullScreen);
			object.append(para);
			
			var para = Create.Element("para");
			para.attr("name","allowscriptaccess");
			para.attr("value",allowscriptaccess);
			object.append(para);
			
			var embed = Create.Element("embed");
			embed.attr("src",src);
			embed.attr("type","application/x-shockwave-flash");
			embed.attr("allowscriptaccess",allowscriptaccess);
			embed.attr("allowfullscreen",allowFullScreen);
			embed.attr("width",width);
			embed.attr("height",height);
			object.append(embed);
			
			return Create.Affichage.Spoiler(object,!(GM.let("JVN:Affichage:Vidéos",false)));
		},
		Youtube : function(v) {
			var width = 560;
			var height = 340;
			var src = "http://www.youtube.com/v/"+v+"&hl=fr&fs=1&";
			var allowFullScreen = true;
			var allowscriptaccess = 'always';
			
			var object = Create.Element("object");
			object.attr("width",width);
			object.attr("height",height);
			
			var para = Create.Element("para");
			para.attr("name","movie");
			para.attr("value",src);
			object.append(para);
			
			var para = Create.Element("para");
			para.attr("name","allowFullScreen");
			para.attr("value",allowFullScreen);
			object.append(para);
			
			var para = Create.Element("para");
			para.attr("name","allowscriptaccess");
			para.attr("value",allowscriptaccess);
			object.append(para);
			
			var embed = Create.Element("embed");
			embed.attr("src",src);
			embed.attr("type","application/x-shockwave-flash");
			embed.attr("allowscriptaccess",allowscriptaccess);
			embed.attr("allowfullscreen",allowFullScreen);
			embed.attr("width",width);
			embed.attr("height",height);
			object.append(embed);
			
			return Create.Affichage.Spoiler(object,!(GM.let("JVN:Affichage:Vidéos",false)));
		}
	},
	ColorPicker : function(ori,pseudo) {
		var title = "Récupération d'une couleur";
		
		var content  = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">';
		content += "<html lang='fr' xmlns='http://www.w3.org/1999/xhtml' xml:lang='fr'>"+"\n";
		content += "<head>"+"\n"
		content += "</head>"+"\n"
		content += "<body>"+"\n"
		content += "</body>"+"\n"
		content += "</html>"+"\n"
		
		
		var color_picker = window.open('about:blank',title,'toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=420,height=250');
		color_picker.document.write(content);
		var head = color_picker.document.getElementsByTagName("head")[0];
		var body = color_picker.document.getElementsByTagName("body")[0];
		
		$(head).append(Create.Element('title').text(title));
		
		
		function HexaColor(dec,pos) {
			var hex = dec.toString(16);
			if (hex.length < 2)
				hex = "0" + hex;
			var hexa = "#";
			for (var j=0;j<3;j++) {
				if (j!=pos)
					hexa += "00";
				else
					hexa += hex;
			}
			return hexa
		}

		function a(el) {
			var split = el.id.split(":");
			document.getElementById(split[0]+":input").value = split[1];
			var hex = "";
			for (var j=0;j<3;j++) {
				var i = parseInt(document.getElementById(j+":input").value).toString(16).toUpperCase();
				if (i.length < 2)
					i = "0"+i;
				hex += i;
			}
			document.getElementById("input").value = hex;
			document.getElementById("show").style.backgroundColor = "#"+hex;
		}

		function b(el) {
			var val = parseInt(el.value);
			if (isNaN(val) || val < 0 || val > 255)
				val = 0;
			el.value = val;
			var hex = "";
			for (var j=0;j<3;j++) {
				var i = parseInt(document.getElementById(j+":input").value).toString(16).toUpperCase();
				if (i.length < 2)
					i = "0"+i;
				hex += i;
			}
			document.getElementById("input").value = hex;
			document.getElementById("show").style.backgroundColor = "#"+hex;
		}

		function c(el) {
			var v = new Array();
			var val = el.value;
			var hex = "";
			for (var i=0;i<3;i++) {
				v[i] = parseInt(el.value.substring(2*i,2*i+2),16);
				if (isNaN(v[i])) {
					v[i] = 0;
				}
				document.getElementById(i+":input").value = v[i];
				var j = v[i].toString(16).toUpperCase();
				if (j.length < 2)
					j = "0" + j;
				if (val != "")
					hex += j;
			}
			el.value = hex;
			document.getElementById("show").style.backgroundColor = "#"+el.value;
		}

		function ManualSliders(bloc,ori) {
			for (var j=0;j<3;j++) {
				var span = document.createElement('span');
				for(var i=0;i<256;i++) {
					var img = document.createElement('img');
					img.src = "http://127.0.0.1/image.jeuxvideo.com/pic/blank.gif";
					img.style.backgroundColor = HexaColor(i,j);
					img.style.width = "1px";
					img.style.height = "10px";
					img.style.cursor = "pointer";
					img.id = j+':'+i
					var onclick = document.createAttribute("onclick");
					var txt = a+';a(this);';
					onclick.nodeValue = txt;
					img.setAttributeNode(onclick);
					span.appendChild(img);
				}
				span.style.margin = "10px";
				
				var color = parseInt(ori.substring(2*j,2*j+2),16);
				if (isNaN(color))
					color = 0;
				
				var input = document.createElement('input');
				input.style.marginLeft = "5px";
				input.id = j+":input";
				input.maxLength = 3;
				input.value = color;
				input.style.width = "30px";
				var onblur = document.createAttribute("onblur");
				var txt = b+';b(this);';
				onblur.nodeValue = txt;
				input.setAttributeNode(onblur);
				
				bloc.appendChild(span);
				bloc.appendChild(input);
				bloc.appendChild(document.createElement('br'));
			}
		}

		var span = document.createElement('span');
		var style = document.createAttribute("style");
		var txt = 'float:left;';
		style.nodeValue = txt;
		span.setAttributeNode(style);
		span.style.background = "transparent url(http://image.jeuxvideo.com/css_img/defaut/popup_fond.gif) repeat scroll 0 0 !important"
		
		var img = document.createElement('img');
		img.id = "show";
		img.src = "http://127.0.0.1/image.jeuxvideo.com/pic/blank.gif";
		img.style.width = "70px";
		img.style.height = "70px";
		img.style.marginLeft = "10px";
		if (ori != "")
			img.style.backgroundColor = "#"+ori;
		
		var input = document.createElement('input');
		input.id = "input";
		input.maxLength = 6;
		input.value = ori;
		var onblur = document.createAttribute("onblur");
		var txt = c+';c(this);';
		onblur.nodeValue = txt;
		input.setAttributeNode(onblur);
		
		var button = document.createElement('input');
		button.id = pseudo;
		button.type = "button";
		button.value = "valider";
		
		body.style.width = "400px";
		body.style.textAlign = "center";
		body.style.background = "#BDBDBD url(http://image.jeuxvideo.com/css_img/defaut/body_bg.jpg) repeat-x scroll left top";
		body.appendChild(span);
		body.appendChild(img);
		body.appendChild(document.createElement('br'));
		body.appendChild(document.createElement('br'));
		body.appendChild(input);
		body.appendChild(document.createElement('br'));
		body.appendChild(document.createElement('br'));
		body.appendChild(button);
		
		ManualSliders(span,ori);
		
		$(button).click(function() {
			var check = color_picker.confirm("Choisir cette couleur ?");
			var pseudo = this.id;
			if (check) {
				var color = color_picker.document.getElementById('input').value;
				if (new RegExp("^[0-9A-Fa-f]{6}$").test(color))
					GM.set("JVN:Couleur:"+pseudo.toLowerCase(),color)
				else
					GM.del("JVN:Couleur:"+pseudo.toLowerCase());
				color_picker.close();
			}
		});
		
		return ori;
	}
}

var Load = {
	Script : function(type,src) {
		var scpt = document.createElement('script');
		scpt.src = src;
		scpt.type = type;
		var head = document.getElementsByTagName("head");
		if (head.length > 0)
			head[0].appendChild(scpt);
		return $(scpt);
	},
	Script2 : function(type,src,head) {
		var scpt = document.createElement('script');
		scpt.src = src;
		scpt.type = type;
		if (head != null)
			head.appendChild(scpt);
		return $(scpt);
	},
	Style : function(type,rel,href) {
		var link = document.createElement('link');
		link.type = type;
		link.rel = rel;
		link.href = href;
		var head = document.getElementsByTagName("head");
		if (head.length > 0)
			head[0].appendChild(link);
		return $(link);
	},
	Style2 : function(type,rel,href,head) {
		var link = document.createElement('link');
		link.type = type;
		link.rel = rel;
		link.href = href;
		if (head != null)
			head.appendChild(link);
		return $(link);
	},
	Page : function(last,modo,col,forum,topic,page,nb) {
		if (nb>0) {
			var html,need;
			if (topic == 0) {
				need = 25;
				html = context[0]+"www.jeuxvideo.com/forums/0-"+forum+"-0-0-0-"+page+"-0-0.htm"
			} else {
				need = 20;
				html = context[0]+"www.jeuxvideo.com/forums/1-"+forum+"-"+topic+"-"+page+"-0-0-0-0.htm"
			}
			getPage(html,
				function(response) {
					var span = Create.Element('span');
					var txt = ""+response.responseText;
					new RegExp("<body>").test(txt);
					txt = RegExp.rightContext;
					new RegExp("</body>").test(txt);
					txt = RegExp.leftContext;
					if (topic == 0) {
						// var span = Create.Element('span');
						// span.text(txt);
						// $("body").append(span);
						txt = txt.split('<tr class="tr');
						if (txt.length > 1) {
							var newel = $('<tr class="trinv"><td>'+page+'</td><td>'+(nb-1)+'</td><td title="'+html+'"></td></tr>');
							last.after(newel);
							last = newel;
						}
						for (var i=1;i<txt.length;i++) {
							newel = $('<tr class="tr' + txt[i].split('</tr>')[0] + '</tr>');
							last.after(newel);
							last = newel;
							Retouche.Topic(last[0],col,modo,i)
						}
						if (txt.length > need) {
							Load.Page(last,modo,col,forum,topic,page+25,nb-1);
						}
					} else {
						txt = txt.split('<div id="message_');
						if (txt.length > 1) {
							var newel = $('<div class="msg msg_invisible"><ul><li class="post" style="text-align:center;font-weight:bold;">Page '+page+' : '+(nb-1)+'</li></ul></div>');
							last.after(newel);
							last = newel;
						}
						for (var i=1;i<txt.length;i++) {
							newel = $('<div id="message_' + txt[i].split('</div>')[0] + '</div>');
							last.after(newel);
							last = newel;
							Retouche.Message(last[0],forum,modo);
						}
						if (txt.length > need) {
							Load.Page(last,modo,null,forum,topic,page+1,nb-1);
						}
					}
				},
				function(response) {Load.Page(last,modo,col,forum,topic,page,nb);},
				function(response) {});
		}
	}
}

function getPage(page,load,error,statechange) {
	GM_xmlhttpRequest({
		method:"GET",
		url:page,
		headers:{
			"User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
			"Accept":"text/xml"
		},
		onload:load,
		onerror:error,
		onreadystatechange:statechange
	});
}

var Skin = {
	console : function(name) {
		var style = "http://www.jeuxvideo.com/css/machines/homepage_"+name+".css";
		var style_loaded = $("#skin_loaded");
		if (style_loaded.length ==0) {
			style_loaded = Load.Style("text/css","stylesheet",style);
			style_loaded.attr("id","skin_loaded");
			GM.set("JVN:Skin",name);
		} else {
			style_loaded.attr("href",style);
		}
		GM.set("JVN:Skin",name);
	},
	JVN : {
		message : function(reponse,kicked) {
			var profil = reponse["profil"];
			var href = $(profil).attr("href");
			
			reponse["message"].css("clear","right");
			reponse["message"].css("padding-left","5px");
			
			var cl = "avatar";
			var li = Create.Element('li');
			li.attr("pseudo",reponse["pseudo"]);
			li.attr("id","Avatar-"+reponse["id"]);
			if (kicked)
				li.hide();
			li.addClass(cl);
			
			if ($("#style_"+cl).length == 0) {
				var style = "."+cl+" {";
				style +=	"border-right:1px dotted #333333;";
				style +=	"border-left:1px dotted #333333;";
				style +=	"border-bottom:1px dotted #333333;";
				style +=	"margin-right:5px;";
				style +=	"margin-bottom:5px;";
				style +=	"width:100px;";
				style +=	"height:110px;";
				style +=	"float:left;";
				style +=	"clear:left;";
				style +=	"text-align:center;";
				style +=	"padding:2px;";
				style += "}";
				Create.Style(style).attr("id","style_"+cl);
			}
			
			reponse["message"].before(li);
			
			reponse["ancre"].css("clear","both");
			
			var prec = GM.get("JVN:Secret:Skin:JVN:act:"+reponse["pseudo"].toLowerCase());
			var list = ($("."+cl+" [ava-img-pseudo]").length);
			var need = true;
			for(var i=0;i<list.length;i++) {
				if ($(this).attr("ava-img-pseudo")==reponse["pseudo"].toLowerCase()) {
					need = false
					i = list.length;
				}
			}
			if (need && (new RegExp("([0-9]{2}):([0-9]{2}) ([0-9]{2})/([0-9]{2})/([0-9]{4})").test(prec))) {
				var last_update = new Date();
				last_update.setHours(parseInt(RegExp.$1));
				last_update.setMinutes(parseInt(RegExp.$2));
				last_update.setDate(parseInt(RegExp.$3));
				last_update.setMonth(parseInt(RegExp.$4)-1);
				last_update.setYear(parseInt(RegExp.$5));
				need = ((new Date())-last_update > 2 * 24 * 60 * 60 * 1000);
			}
			
			var img = Create.Image('avatar-'+reponse["id"],'','',reponse["pseudo"],"");
			img.css("max-width","90px");
			img.css("max-height","90px");
			img.attr("ava-img-pseudo",reponse["pseudo"].toLowerCase());
			li.append(img);
			li.append(Create.Element('br'));
			var msg = $(Create.Element('span'));
			msg.css("font-size","75%");
			msg.css("font-style","italic");
			msg.attr("id","message-"+reponse["id"]);
			msg.attr("ava-msg-pseudo",reponse["pseudo"].toLowerCase());
			li.append(msg);
			
			if (Const.constantSkin(reponse["pseudo"],img,msg)) {
				msg.text(Const.special(reponse["pseudo"],Math.random(),"surnom"));
				if (need) {
					getPage(href,
						function(response) {	//load
							Skin.JVN.mess.loaded(li,response);
						},
						function(response) {	//error
							Skin.JVN.mess.notloaded(li);
						},
						function(response) {	//statechange
							
						}
					);
				} else {
					Skin.JVN.mess.notloaded(li);
				}
			}
		},
		mess : {
			loaded : function(li,response) {
				var pseudo = li.attr("pseudo");
				var id = li.attr("id").split("-")[1];
				var correct = true;
				GM.set("JVN:Secret:Skin:JVN:act:profile:"+pseudo.toLowerCase(),response.finalUrl);
				
				
				var profile = $(response.responseText);
				reponse = lecture.profil(profile);
				
				var img = $("img[ava-img-pseudo]");
				var src = "http://image.jeuxvideo.com/avatars/default.jpg";
				var ava = "";
				correct =  (pseudo.toLowerCase() == reponse["pseudo"].toLowerCase());
				if (correct && reponse["avatar"]!=null) {
					src = reponse["avatar"].attr("src");
					GM.set("JVN:Secret:Skin:JVN:act:avat:"+reponse["pseudo"].toLowerCase(),src);
					if (reponse["avatar"].parent()[0].tagName == 'A') {
						var attrib = reponse["avatar"].parent()[0].attributes;
						for (var i=0;i<attrib.length;i++) {
							if (attrib[i].nodeName == 'onclick') {
								if (new RegExp("popup_avatar\\('([^']+)','([^']+)'\\)").test(attrib[i].nodeValue)) {
									ava = RegExp.$1;
									GM.set("JVN:Secret:Skin:JVN:act:bigava:"+reponse["pseudo"].toLowerCase(),ava);
								}
								i = attrib.length;
							}
						}
					}
				}
				img.each(function(i) {
					if ($(this).attr("ava-img-pseudo")==pseudo.toLowerCase()) {
						this.src = src;
						if (ava.length > 0) {
							Avatar.link($(this),ava,pseudo);
							$(this).css("cursor","pointer");
							$(this).attr("title","Avatar de "+pseudo);
						}
					}
				});
				
				if (correct) {
					var maintenant = new Date();
					GM.set("JVN:Secret:Skin:JVN:act:"+reponse["pseudo"].toLowerCase(),
						Const.Numb(2,maintenant.getHours())+":"+
						Const.Numb(2,maintenant.getMinutes())+" "+
						Const.Numb(2,maintenant.getDate())+"/"+
						Const.Numb(2,maintenant.getMonth()+1)+"/"+
						Const.Numb(4,maintenant.getYear()+1900)
					);
				}
				
			},
			notloaded : function(li) {
				var pseudo = li.attr("pseudo");
				var id = li.attr("id").split("-")[1];
				var img = $("#avatar-"+id);
				var msg = $("#message-"+id);
				var src = GM.let("JVN:Secret:Skin:JVN:act:avat:"+pseudo.toLowerCase(),"http://image.jeuxvideo.com/avatars/default.jpg");
				img.attr("src",src);
				
				var bigava = GM.get("JVN:Secret:Skin:JVN:act:bigava:"+pseudo.toLowerCase());
				if (bigava != "") {
					Avatar.link(img,bigava,pseudo);
					img.css("cursor","pointer");
					img.attr("title","Avatar de "+pseudo);
				}
				
			}
		},
		profil : function(reponse) {
			GM.set("JVN:Secret:Skin:JVN:act:profile:"+reponse["pseudo"].toLowerCase(),location.href);
			
			if (reponse["avatar"]!=null) {
				GM.set("JVN:Secret:Skin:JVN:act:avat:"+reponse["pseudo"].toLowerCase(),reponse["avatar"].attr("src"));
				if (reponse["avatar"].parent()[0].tagName == 'A') {
					var attrib = reponse["avatar"].parent()[0].attributes;
					for (i=0;i<attrib.length;i++) {
						if (attrib[i].nodeName == 'onclick') {
							if (new RegExp("popup_avatar\\('([^']+)','([^']+)'\\)").test(attrib[i].nodeValue)) {
								GM.set("JVN:Secret:Skin:JVN:act:bigava:"+reponse["pseudo"].toLowerCase(),RegExp.$1);
							}
							i = attrib.length;
						}
					}
				}
			}
			
			if (reponse["messages"]!=null) {
				GM.set("JVN:Secret:Skin:JVN:act:mess:"+reponse["pseudo"].toLowerCase(),reponse["messages"]);
			}
			
			var maintenant = new Date();
			GM.set("JVN:Secret:Skin:JVN:act:"+reponse["pseudo"].toLowerCase(),
				Const.Numb(2,maintenant.getHours())+":"+
				Const.Numb(2,maintenant.getMinutes())+" "+
				Const.Numb(2,maintenant.getDate())+"/"+
				Const.Numb(2,maintenant.getMonth()+1)+"/"+
				Const.Numb(4,maintenant.getYear()+1900)
			);
		}
		
	}
}

var Modo = {
	ismod : function() {
		var a = $("a");
		var i = 0;
		var ismod = false;
		while (!ismod && i<a.length) {
			ismod = (new RegExp("[^0-9]4-([0-9]+)-([0-9]+)-([0-9]+)-([^-]+)-([0-9]+)-([0-9]+)-(.+)\\.htm").test(a[i++].href));
		}
		return ismod;
	},
	Menu : function() {
		var modo = Modo.ismod();
		if (modo && GM.let("JVN:Arme",false)) {
			var weapon = Create.Menu2.NewItem("Sulfater","javascript:;",menu);
			weapon.click(function() {
				check = confirm("Sulfater les messages sélectionnés ?")
				if (check)
					Modo.Arme.lock();
			});
			var masslock = Create.Menu2.NewItem("Tout viser","javascript:;",menu);
			masslock.click(function() {
				Modo.Arme.mass(true);
			});
			var massunlock = Create.Menu2.NewItem("Rien viser","javascript:;",menu);
			massunlock.click(function() {
				Modo.Arme.mass(false);
			});
		}
		return modo;
	},
	Arme : {
		aim : function(bool,id,save,activ) {
			var input = Create.Element('input');
			input.addClass("JVN-Arme");
			input.attr("type","checkbox");
			input.attr("save",save);
			input.val(id);
			if (activ) {
				if (bool) {
					input.attr("checked","checked");
				}
			} else {
				input.attr("disabled","disabled");
			}
			return input;
		},
		lock : function() {
			var aimed = $(".JVN-Arme");
			aimed.each(function(i) {
				if (this.checked)
					Modo.Arme.shoot(this.value,$(this).attr("save"));
			});
		},
		mass : function(bool) {
			var aimed = $(".JVN-Arme");
			aimed.each(function(i) {
				if (!(this.disabled))
					this.checked = bool;
			});
		},
		shoot : function(id,save) {
			var a = $("#"+id+" a");
			var suppr = "";
			for(var i=0;i<a.length;i++) {
				if (new RegExp("[^0-9]4-([^-]+)-([^-]+)-([^-]+)-([^-]+)-([^-]+)-([^-]+)-(.+)\\.htm").test(a[i].href)) {
					suppr = a[i].href;
					i = a.length;
				}
			}
			if (suppr != "") {
				var tag = $("#"+id)[0].tagName;
				GM.set("JVN:Arme:"+tag,GM.get("JVN:Arme:"+tag)+"<"+tag+" id='"+id+"'>"+save+"</"+tag+">");
				var destroy = window.open(location.href,id,'toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=520,height=570');
				destroy.location.href = suppr;
				$(destroy).ready(function() {
					this.close();
				});
			}
		}
	}
}

function Reload() {
	location.reload();
}

function Disconnect() {
	if (GM.let("JVN:Disconnect",false) || GM.let("JVN:Disconnect:Page",false)) {
		if (GM.let("JVN:Disconnect:Page",false)) {
			var compte = document.getElementById('compte');
			if (compte != null) {
				var a = compte.getElementsByTagName('a');
				for (var i=0;i<a.length;i++) {
					if (new RegExp("http://www.jeuxvideo.com/cgi-bin/admin/moncompte\\.cgi\\?oper=33").test(a[i].href)) {
						location.href = "http://www.jeuxvideo.com/cgi-bin/admin/logout.cgi?url="+location.href;
						i = a.length;
					}
				}
			}
		} else {
			if (GM.let("JVN:Disconnect:Page",false) && new RegExp("www\\.jeuxvideo\\.com/forums/(0|3|26)-").test(location.href)) {
				var a = document.getElementsByTagName('a');
				for(var i=0;i<a.length;i++) {
					a[i].href = "http://www.jeuxvideo.com/cgi-bin/admin/logout.cgi?url="+a[i].href;
				}
			} 
		}
	}
}

function sort(el,option) {
	if (option == null)
		option = new Array();
	if ($("#jQuery_jvc").length == 0)
		Load.Script("text/javascript","http://www.jeuxvideo.com/js/jquery-ui.js").attr("id","jQuery_jvc");
	if ($("#jQuery_core").length == 0)
		Load.Script("text/javascript","http://jqueryui.com/ui/ui.core.js").attr("id","jQuery_core");
	if ($("#jQuery_sort").length == 0)
		Load.Script("text/javascript","http://jqueryui.com/ui/ui.sortable.js").attr("id","jQuery_sort");
	str  = "$(function() {";
	str += "	$('"+el+"').sortable({";
	for (i=0;i<option.length-1;i++)
		str += "		"+option[i]+",";
	if (option.length>0)
		str += "		"+option[option.length-1];
	str += "	});";
	str += "	$('"+el+"').disableSelection();";
	str += "});";
	Create.Script(str);
}

function BackToFirstPage() {
	a = document.getElementsByTagName("a");
	for (i=0;i<a.length;i++) {
		if (new RegExp("forums/26-").test(a[i].href))
			a[i].href = a[i].href.replace("forums/26-","forums/0-");
	}
}

var Avatar = {
	clickable : function(avatar,pseudo) {
		var a = avatar.parent();
		if (a[0].tagName != 'A') {
			a = Create.Element('a').attr("href","javascript:;");
			avatar.before(a);
			a.append(avatar);
			a.css("cursor","pointer");
			
			Avatar.link(a,avatar.attr("src"),pseudo);
		}
		return a;
	},
	search : function(search) {
		$(search).each(function(i) {
			avatar = $(this).attr("avatar");
			pseudo = $(this).attr("pseudo");
			Avatar.link($(this),avatar,pseudo);
		});
	},
	link : function(element,src,pseudo) {
		var attrib = $(element)[0].attributes;
		for (i=0;i<attrib.length;i++) {
			$(element)[0].removeAttributeNode(attrib[i]);
		}
		$(element).attr("avatar",src);
		$(element).attr("pseudo",pseudo);
		function avatar(src,pseudo) {
			var ava = window.open('about:blank',pseudo,'toolbar=no,location=no,directories=no,status=no,scrollbars=no,resizable=yes,copyhistory=no,width=100,height=100');
			
			content  = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">';
			content += "<html lang='fr' xmlns='http://www.w3.org/1999/xhtml' xml:lang='fr'>"+"\n";
			content += "<head>"+"\n";
			content += "</head>"+"\n";
			content += "<body>"+"\n";
			content += "</body>"+"\n";
			content += "</html>"+"\n";
			
			ava.document.write(content);
			var htm = ava.document.getElementsByTagName("html")[0];
			var head = ava.document.getElementsByTagName("head")[0];
			var body = ava.document.getElementsByTagName("body")[0];
			
			var title = document.createElement('title');
			title.appendChild(document.createTextNode(pseudo));
			head.appendChild(title);
			
			var img = document.createElement('img');
			img.src = src;
			img.alt = pseudo;
			img.title = pseudo;
			
			var td = document.createElement('td');
			td.valign = "middle";
			td.align = "center";
			td.id = "imgcell";
			td.appendChild(img);
			
			var onclick = document.createAttribute("onclick");
			var txt  = "window.close();";
			onclick.nodeValue = txt;
			td.setAttributeNode(onclick);

			var table = document.createElement('table');
			table.width = "100%";
			table.height = "100%";
			table.cellspacing = "0";
			table.cellpadding = "0";
			table.border = "0";
			table.margin = "0pt";
			table.padding = "0pt";
			
			var tr = document.createElement('tr');
			tr.appendChild(td);
			table.appendChild(tr);
			
			$(body).css("margin","0pt").css("padding","0pt");
			body.appendChild(table);
			
			var onload = document.createAttribute("onload");
			var txt  = "mw = 800; mh = 600;";
				txt += 'this.style.maxWidth = mw+"px";';
				txt += 'this.style.maxHeight = mh+"px";';
				txt += "w = Math.min(this.width,mw);h = Math.min(this.height,mh);";
				txt += "window.resizeTo(Math.max(200,w + 18),h + 60);";
			onload.nodeValue = txt;
			img.setAttributeNode(onload);
			
		}
		
		var onclick = document.createAttribute("onclick");
		var txt  = avatar + ';avatar($(this).attr("avatar"),$(this).attr("pseudo"));';
		onclick.nodeValue = txt;
		$(element)[0].setAttributeNode(onclick);

		return $(element);
	}
}

var Kick = {
	make : function(groupemess,zone,Hide,Show,def) {
		groupemess = groupemess.toLowerCase();
		if (def == null)
			def = !(GM.let("JVN:Kick:"+groupemess,false));
		if (!(def)) {
			GM.del("JVN:Kick:"+groupemess);
			if (GM.let("JVN:Properties:Kick:NoReload",false)) {
				liste_p = $(zone);
				for (i=0;i<liste_p.length;i++) {
					id_c = $(liste_p[i]).attr("id");
					but = $("#Kick-"+id_c);
					if (but.length > 0) {
						g_c = Pseudonyme.groupe($(liste_p[i]).attr("pseudo"));
						if (g_c.toLowerCase() == groupemess) {
							but.attr("src",Icone("bluek",1));
							but.attr("alt","[K]");
							but.attr("title","Kicker "+groupemess);
							Show(id_c);
						}
					}
				}
			}
		} else {
			GM.set("JVN:Kick:"+groupemess,true);
			if (GM.let("JVN:Properties:Kick:NoReload",false)) {
				liste_p = $(zone);
				for (i=0;i<liste_p.length;i++) {
					id_c = $(liste_p[i]).attr("id");
					but = $("#Kick-"+id_c);
					if (but.length > 0) {
						g_c = Pseudonyme.groupe($(liste_p[i]).attr("pseudo"));
						if (g_c.toLowerCase() == groupemess) {
							but.attr("src",Icone("pinko",1));
							but.attr("alt","[O]");
							but.attr("title","Dékicker "+groupemess);
							Hide(id_c);
						}
					}
				}
			}
		}
		if (!(GM.let("JVN:Properties:Kick:NoReload",false)))
			Reload();
	}
}

var Save = {
	New : {
		Pref : function(href,name) {
			return name;
		}
	}
}

var Apercu = {
	formulaire : function(action,name,target) {
		var form = Create.Element('form');
		form.attr("action",action);
		form.attr("method","post");
		form.attr("name",name);
		form.attr("id",name);
		form.attr("target",target);
		return form;
	},
	input : function(name,value) {
		var input = Create.Element("input");
		input.attr("type","hidden");
		input.attr("name",name);
		input.attr("value",value);
		return input;
	},
	message : function(sign) {
		var form = Apercu.formulaire("http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi","post2","apercu");
		form.append(Apercu.input("newnom","Apercu-Sign"));
		form.append(Apercu.input("newsujet","Test d'aperçu d'une signature"));
		form.append(Apercu.input("yournewmessage","message"+sign));
		form.append(Apercu.input("modeappel","0"));
		form.append(Apercu.input("mode","14"));
		form.append(Apercu.input("forum","50"));
		return form;
	}
}

var Preferences = {
	Init : function() {
		Create.Col2.Vide();
		Preferences.Makelist();
	},
	Makelist : function() {
		n = GM.let("JVN:Préférences-n",0);
		for(i=0;i<n;i++) {
			href = GM.get("JVN:Préférences-link-"+i);
			name = GM.get("JVN:Préférences-name-"+i);
			Create.Col2.NewItem(i,href,name);
		}
		GM.unl("JVN:Préférences-n");
	},
	Add : function(href,name) {
		n = GM.let("JVN:Préférences-n",0);
		GM.set("JVN:Préférences-n",(n+1));
		GM.set("JVN:Préférences-link-"+n,href);
		GM.set("JVN:Préférences-name-"+n,name);
		Create.Col2.NewItem(n,href,name);
		GM.unl("JVN:Préférences-n");
	},
	Remove : function(id) {
		j = parseInt(id.substring(5,id.length));
		$("#link_"+j).remove();
		n = GM.let("JVN:Préférences-n",0);
		for(i=j+1;i<n;i++) {
			$("#link_"+i).attr("id","link_"+(i-1));
			href = GM.get("JVN:Préférences-link-"+i);
			name = GM.get("JVN:Préférences-name-"+i);
			GM.set("JVN:Préférences-link-"+(i-1),href);
			GM.set("JVN:Préférences-name-"+(i-1),name);
		}
		GM.set("JVN:Préférences-n",(n-1));
		GM.unl("JVN:Préférences-n");
	},
	Reorder : function(arr) {
		alert(arr);
	}
}

var GM = {
	arr : new Array(),
	get : function(ind) {
		if (this.arr[ind] == null) {
			this.arr[ind] = GM_getValue(ind,"");
		} 
		return this.arr[ind];
	},
	let : function(ind,val) {
		if (this.arr[ind] == null) {
			this.arr[ind] = GM_getValue(ind,val);
		} 
		return this.arr[ind];
	},
	set : function(ind,val) {
		this.arr[ind] = val;
		GM_setValue(ind,val);
	},
	del : function(ind) {
		this.arr[ind]=null;
		GM_deleteValue(ind);
	},
	lis : function() {
		return GM_listValues();
	},
	unl : function(ind) {
		this.arr[ind] = null;
	},
	log : function(str) {
		GM_log(str);
	}
}

var Connecteur = {
	Liste : function(key) {
		GM.unl(key+":n");
		n = GM.let(key+":n",0);
		liste = new Array();
		for (i=0;i<n;i++)
			liste.push(GM.get(key+":"+i));
		return liste;
	},
	Select : function(id,key,num) {
		num = parseInt(num);
		if (key == null) key = "";
		key = "JVN:Liste" + key;
		select = Create.Element('select');
		select.attr("id",id);
		select.attr("key",key)
		liste = Connecteur.Liste(key);
		
		option = Create.Element("option");
		option.val('');
		option.text('');
		select.append(option);
		
		for (i=0;i<liste.length;i++) {
			option = Create.Element("option");
			option.val(i);
			option.text(liste[i]);
			select.append(option);
			if (i==num)
				option.attr("selected","selected");
		}
		return select;
	},
	Pseudo : function(id,idp,idm,oth,key,num) {
		if (key == null) key = "";
		if (num == "last") num = GM.let("JVN:Liste"+key+":L",-1);
		p = Create.Element('p');
		p.append(Create.Element('label').attr('for',id).text(' * Liste : '));
		select = Connecteur.Select(id,key,num).attr("idp",idp).attr("idm",idm);
		p.append(select);
		
		add = Connecteur.Add(id)
		select.after(add);
		rmv = Connecteur.Remove(id)
		select.after(rmv);
		i = parseInt(num);
		key = "JVN:Liste" + key;
		if (select.val() != "") {
			add.hide();
			Connecteur.Change(key,i,idp,idm,id);
		} else{
			rmv.hide();
			Connecteur.Change(key,-1,idp,idm,id);
		}
		select.change(function() {
			id = $(this).attr("id");
			idp = $(this).attr("idp");
			idm = $(this).attr("idm");
			key = $(this).attr("key");
			i = this.selectedIndex - 1;
			Connecteur.Change(key,i,idp,idm,id);
			if (i>=0) GM.set(key+":L",i); else GM.del(key+":L");
		});
		
		className = "selector_"+id;
		p.addClass(className);
		if ($("#style_"+className).length == 0) {
			style  = "p."+className+" {margin:0.5em 0 !important; vertical-align:middle;}";
			style += "p."+className+" label {display:block;float:left;margin-top:3px;width:140px;}";
			style += "#"+id+" {width:150px;}";
			style += "p."+className+" a {vertical-align:middle; cursor:pointer; height:100%;}";
			style += "p."+className+" * {vertical-align:middle; height:100%;}";
			Create.Style(style).attr("id","style_"+className);
		}
		
		if (oth!=null && oth!="") {
			$(oth).hide();
			$("input",oth).removeAttr("checked");
		}
		return p;
	},
	Modo : function(id,psd,mdp,mail,mdp_modo,key) {
		if (key == null) key = "";
		tr = Create.Element('tr');
		tr.append(Create.Element('td').append(Create.Element('label').attr("for",id).text("Liste : ")))
		td = Create.Element('td');
		select = Connecteur.Select(id,key+":Modo",-1).attr("psd",psd).attr("mdp",mdp).attr("mail",mail).attr("mdp_modo",mdp_modo);
		td.append(select);
		tr.append(td);
		
		key = "JVN:Liste" + key + ":Modo";
		select.parent().after(Connecteur.ModoAdd(id));
		select.parent().after(Connecteur.ModoRemove(id).hide());
		Connecteur.ModoChange(key,-1,psd,mdp,mail,mdp_modo,id);
		
		select.change(function() {
			id = $(this).attr("id");
			psd = $(this).attr("psd");
			mdp = $(this).attr("mdp");
			mail = $(this).attr("mail");
			mdp_modo = $(this).attr("mdp_modo");
			key = $(this).attr("key");
			i = this.selectedIndex - 1;
			Connecteur.ModoChange(key,i,psd,mdp,mail,mdp_modo,id);
		});
		
		className = "selector_"+id;
		tr.addClass(className);
		if ($("#style_"+className).length == 0) {
			style += "#"+id+" {width:150px;}";
			style += "."+className+" a {vertical-align:middle; cursor:pointer; height:100%;}";
			style += "."+className+" * {vertical-align:middle; height:100%;}";
			Create.Style(style).attr("id","style_"+className);
		}
		
		return tr;
	},
	Change : function(key,i,idp,idm,id) {
		psd = GM.get(key+":"+i);
		mdp = GM.get(key+":"+psd.toLowerCase());
		$("#"+idp).val(psd);
		if (Pseudonyme.valide(psd)) $("#"+idp).parent().hide(); else $("#"+idp).parent().show();
		$("#"+idm).val(mdp);
		if (mdp.length == "" || mdp.length > 12) $("#"+idm).parent().show(); else $("#"+idm).parent().hide();
		i= parseInt(i);
		if (isNaN(i) || i < 0) {
			$("#Add-"+id).show();
			$("#Rmv-"+id).hide();
		} else {
			$("#Add-"+id).hide();
			$("#Rmv-"+id).show();
		}
	},
	ModoChange : function(key,i,psd,mdp,mail,mdp_modo,id) {
		pso = GM.get(key+":"+i+":pseudo");
		psw = GM.get(key+":"+pso.toLowerCase());
		mel = GM.get(key+":"+i+":mail");
		mdm = GM.get(key+":"+i+":mdp_modo");
		i= parseInt(i);
		if (isNaN(i) || i < 0) {
			$("#Add-"+id).show();
			$("#Rmv-"+id).hide();
		} else {
			$("#Add-"+id).hide();
			$("#Rmv-"+id).show();
		}
		$("#"+psd).val(pso);
		if (Pseudonyme.valide(pso)) $("#"+psd).parent().parent().hide(); else $("#"+psd).parent().parent().show();
		$("#"+mdp).val(psw);
		if (psw.length == "" || psw.length > 12) $("#"+mdp).parent().parent().show(); else $("#"+mdp).parent().parent().hide();
		$("#"+mail).val(mel);
		if (mel == "") $("#"+mail).parent().parent().show(); else $("#"+mail).parent().parent().hide();
		$("#"+mdp_modo).val(mdm);
		if (mdm == "") $("#"+mdp_modo).parent().parent().show(); else $("#"+mdp_modo).parent().parent().hide();
	},
	Add : function(id) {
		a = Create.Element('a').attr("select",id).attr("id","Add-"+id);
		a.append(Create.Icone("","green","[+]","Ajouter ce pseudonyme",""));
		
		a.click(function() {
			check = confirm("Ajouter ce pseudonyme ?");
			if (check) {
				id = $(this).attr("select");
				select = $("#"+id);
				idp = select.attr("idp");
				idm = select.attr("idm");
				psd = $("#"+idp).val();
				mdp = $("#"+idm).val();
				n = Pseudonyme.add(psd,mdp);
				if (n!=null) {
					select.append(Create.Element('option').val(n).text(psd));
					$("*:last-child",select).selected = true;
					key = select.attr("key");
					Connecteur.Change(key,n,idp,idm,id);
					GM.set(key+":L",n);
				}
			}
		});
		
		return a;
	},
	Remove : function(id) {
		a = Create.Element('a').attr("select",id).attr("id","Rmv-"+id);
		a.append(Create.Icone("","orange","[-]","Retirer ce pseudonyme",""));
		
		a.click(function() {
			check = confirm("Supprimer ce pseudonyme ?");
			if (check) {
				id = $(this).attr("select");
				select = $("#"+id);
				i = parseInt($(":selected",select).attr("value"));
				Pseudonyme.rmv(i);
				$(":selected",select).remove();
				$("*",select).each(function(e) {
					j = parseInt($(this).attr("value"));
					if (j > i)
						$(this).attr("value",j-1);
				});
				$("*:first-child",select).selected = true;
				idp = select.attr("idp");
				idm = select.attr("idm");
				key = select.attr("key");
				Connecteur.Change(key,-1,idp,idm,id);
				GM.del(key+":L");
			}
		});
		
		return a;
	},
	ModoAdd : function(id) {
		a = Create.Element('a').attr("select",id).attr("id","Add-"+id);
		a.append(Create.Icone("","green","[+]","Ajouter ce pseudonyme",""));
		
		a.click(function() {
			name = prompt("Ajouter l'accès à la modération de quel forum ?","");
			if (name != null) {
				id = $(this).attr("select");
				select = $("#"+id);
				psd = select.attr("psd");
				mdp = select.attr("mdp");
				mail = select.attr("mail");
				mdp_modo = select.attr("mdp_modo");
				pseudo = $("#"+psd).val();
				pass = $("#"+mdp).val();
				email = $("#"+mail).val();
				pass_mod = $("#"+mdp_modo).val();
				n = Pseudonyme.addModo(name,pseudo,pass,email,pass_mod);
				if (n!=null) {
					newop = Create.Element('option').val(n).text(name)
					select.append(newop);
					newop.selected = true;
					key = select.attr("key");
					Connecteur.ModoChange(key,n,psd,mdp,mail,mdp_modo,id);
				}
			}
		});
		
		return a;
	},
	ModoRemove : function(id) {
		a = Create.Element('a').attr("select",id).attr("id","Rmv-"+id);
		a.append(Create.Icone("","orange","[-]","Retirer ce pseudonyme",""));
		
		a.click(function() {
			check = confirm("Supprimer l'accès à la modération de ce forum ?")
			if (check) {
				id = $(this).attr("select");
				select = $("#"+id);
				i = parseInt($(":selected",select).attr("value"));
				Pseudonyme.rmvModo(i);
				$(":selected",select).remove();
				$("*",select).each(function(e) {
					j = parseInt($(this).attr("value"));
					if (j > i)
						$(this).attr("value",j-1);
				});
				$("*:first-child",select).selected = true;
				psd = select.attr("psd");
				mdp = select.attr("mdp");
				mail = select.attr("mail");
				mdp_modo = select.attr("mdp_modo");
				key = select.attr("key");
				Connecteur.ModoChange(key,-1,psd,mdp,mail,mdp_modo,id);
			}
		});
		
		return a;
	}
}

var Signature = {
	Apply : function(id,idp,idt) {
		form = $(document.getElementById(id));
		form.attr("sign_pseudo",idp);
		form.attr("sign_textarea",idt);
		form.submit(function() {
			var idp = $(this).attr("sign_pseudo");
			var idt = $(this).attr("sign_textarea");
			var key = "JVN:Sign";
			var psd = document.getElementById(idt).value;
			var sign = "";
			var prec = "";
			if (GM.let("JVN:Signature",false)) {
				sign = GM.get(key+":");
				if (GM.let("JVN:Signature:Pseudo",false))
					sign = GM.let(key+":"+psd.toLowerCase(),sign);
			}
			var message = document.getElementById(idt);
			var txt = message.value;
			if (prec != "")
				prec += ""; //
			if (sign != "")
				sign = "" + sign; //
			message.value = prec + txt + sign + " ";
		});
	},
	Limite : function(tab) {
		tab = $(tab);
		lim = parseInt(tab.attr("limit"));
		val = tab.val();
		if (val.length > lim)
			tab.val(val.substr(0,lim));
		val = tab.val();
		id = tab.attr("counter");
		l = val.length;
		counter = $("#"+id);
		counter.text(lim-l);
		if (l > lim * 0.75)
			counter.css("color","#FF0000 !important;");
		else
			counter.css("color","");
	}
}

var Pseudonyme = {
	valide : function(pseudo) {
		return new RegExp("^[-_a-zA-Z0-9]{3,15}$").test(pseudo.replace(new RegExp('\\[','gi'),'a').replace(new RegExp('\\]','gi'),'a'));
	},
	add : function(pseudo,mdp) {
		if (Pseudonyme.valide(pseudo)) {
			GM.unl("JVN:Liste:n");
			n = GM.let("JVN:Liste:n",0);
			GM.set("JVN:Liste:"+n,pseudo);
			GM.set("JVN:Liste:n",n+1);
			GM.set("JVN:Liste:"+pseudo.toLowerCase(),mdp);
			return n;
		} else {
			return null;
		}
	},
	rmv : function(i) {
		GM.unl("JVN:Liste:n");
		n = GM.let("JVN:Liste:n",0);
		if (i>=0 && i<n) {
			--n;
			pseudo = GM.get("JVN:Liste:"+i);
			pseudo = pseudo.toLowerCase();
			bool = true;
			for (j=i;j<n;j++) {
				newpseudo = GM.get("JVN:Liste:"+(j+1));
				GM.set("JVN:Liste:"+j,newpseudo);
				bool = (bool && (pseudo != newpseudo.toLowerCase()))
			}
			if (bool) {
				GM.del("JVN:Liste:"+pseudo.toLowerCase());
			}
			GM.del("JVN:Liste:"+n);
			if (n>1)
				GM.set("JVN:Liste:n",n);
			else
				GM.del("JVN:Liste:n");
		}
	},
	addModo : function(name,pseudo,pass,email,pass_mod) {
		if (Pseudonyme.valide(pseudo)) {
			GM.unl("JVN:Liste:Modo:n");
			n = GM.let("JVN:Liste:Modo:n",0);
			GM.set("JVN:Liste:Modo:"+n,name);
			GM.set("JVN:Liste:Modo:"+n+":pseudo",pseudo);
			GM.set("JVN:Liste:Modo:n",n+1);
			GM.set("JVN:Liste:Modo:"+pseudo.toLowerCase(),pass);
			GM.set("JVN:Liste:Modo:"+n+":mail",email);
			GM.set("JVN:Liste:Modo:"+n+":mdp_modo",pass_mod);
			return n;
		} else {
			return null;
		}
	},
	rmvModo : function(i) {
		GM.unl("JVN:Liste:Modo:n");
		n = GM.let("JVN:Liste:Modo:n",0);
		if (i>=0 && i<n) {
			--n;
			pseudo = GM.get("JVN:Liste:Modo:"+i);
			pseudo = pseudo.toLowerCase();
			bool = true;
			for (j=i;j<n;j++) {
				newpseudo = GM.get("JVN:Liste:Modo:"+(j+1)+":pseudo");
				GM.set("JVN:Liste:Modo:"+j,GM.get("JVN:Liste:Modo:"+(j+1)));
				GM.set("JVN:Liste:Modo:"+j+":pseudo",newpseudo);
				GM.set("JVN:Liste:Modo:"+j+":mail",GM.get("JVN:Liste:Modo:"+(j+1)+":mail"));
				GM.set("JVN:Liste:Modo:"+j+":mdp_modo",GM.get("JVN:Liste:Modo:"+(j+1)+":mdp_modo"));
				bool = (bool && (pseudo != newpseudo.toLowerCase()))
			}
			if (bool) {
				GM.del("JVN:Liste:Modo:"+pseudo.toLowerCase());
			}
			GM.del("JVN:Liste:Modo:"+n);
			GM.del("JVN:Liste:Modo:"+n+":pseudo");
			GM.del("JVN:Liste:Modo:"+n+":mail");
			GM.del("JVN:Liste:Modo:"+n+":mdp_modo");
			if (n>1)
				GM.set("JVN:Liste:Modo:n",n);
			else
				GM.del("JVN:Liste:Modo:n");
		}
	},
	groupe : function(pseudo) {
		psd = pseudo.toLowerCase();
		if (Pseudonyme.inGroupe(pseudo)) {
			return GM.let("groupe:"+psd,psd);
		} else {
			return psd;
		}
	},
	inGroupe : function(pseudo) {
		return ((GM.let("JVN:Groupement",false)) && (GM.get("groupe:"+pseudo.toLowerCase())!=""));
	},
	makeGroupe : function(pseudo,groupe) {
		psd = pseudo.toLowerCase();
		if (groupe == "") {
			GM.del("groupe:"+pseudo.toLowerCase());
			
			excl = GM.let("JVN:Exclusion:"+groupe,false);
			kick = GM.let("JVN:Kick:"+groupe,false);
			
			if (excl)
				GM.set("JVN:Exclusion:"+psd,excl);
			if (kick)
				GM.set("JVN:Kick:"+psd,kick);
		} else {
			GM.set("groupe:"+psd,groupe);
			
			groupe = groupe.toLowerCase();
			list_mess = GM.get("JVN:Avert:"+groupe)+GM.get("JVN:Avert:"+psd);
			val_avert = GM.let("JVN:Avert:Psd:"+groupe,0)+GM.let("JVN:Avert:Psd:"+psd,0);
			excl = (GM.let("JVN:Exclusion:"+groupe,false) || GM.let("JVN:Exclusion:"+psd,false));
			kick = (GM.let("JVN:Kick:"+groupe,false) || GM.let("JVN:Kick:"+psd,false));
			
			if (list_mess.length > 0)
				GM.set("JVN:Avert:"+groupe,list_mess);
			if (val_avert != 0)
				GM.set("JVN:Avert:Psd:"+groupe,val_avert);
			if (excl)
				GM.set("JVN:Exclusion:"+groupe,excl);
			if (kick)
				GM.set("JVN:Kick:"+groupe,kick);
			
			GM.del("JVN:Avert:"+psd);
			GM.del("JVN:Avert:Psd:"+psd);
			GM.del("JVN:Exclusion:"+psd);
			GM.del("JVN:Kick:"+psd);
		}
	},
	renameGroupe : function(groupe,newgroupe) {
		list = GM.lis();
		for (i=0;i<list.length;i++) {
			if (new RegExp("^groupe:(.*)$").test(list[i])) {
				if (groupe == GM.get(list[i])) {
					if (newgroupe == "")
						GM.del(list[i]);
					else
						GM.set(list[i],newgroupe);
				}
			}
		}
		if (newgroupe != "") {
			newgroupe = newgroupe.toLowerCase();
			GM.set("JVN:Avert:"+newgroupe,GM.get("JVN:Avert:"+groupe));
			GM.set("JVN:Avert:Psd:"+newgroupe,GM.get("JVN:Avert:Psd:"+groupe));
			GM.set("JVN:Exclusion:"+newgroupe,GM.get("JVN:Exclusion:"+groupe));
			GM.set("JVN:Kick:"+newgroupe,GM.get("JVN:Kick:"+groupe));
		}
		GM.del("JVN:Avert:"+groupe);
		GM.del("JVN:Avert:Psd:"+groupe);
		GM.del("JVN:Exclusion:"+groupe);
		GM.del("JVN:Kick:"+groupe);
	},
	mode : {
		tab : function(tab,r,key,ref,titre) {
			var code = Const.Coderef[ref];
			var line = Create.Col1.NewLine(tab).addClass(tab.attr("sep")).text(' ');
			line.text(titre);
			var line = Create.Col1.NewLine(tab);
			var top = new RegExp("^:T").test(ref);
			var affich = Pseudonyme.mode.ex(code,"pseudo","groupe");
			if (top) {
				line.addClass("tr2");
				var elem = affich;
			} else {
				var li = Create.Element('li').addClass("pseudo").append(affich);
				var ul = Create.Element('ul').append(li);
				var elem = Create.Element('div').addClass("msg").addClass("msg2").append(ul);
			}
			line.append(elem);
			var line = Create.Col1.NewLine(tab);
			var input_ref = Create.Element('input');
			input_ref.val(code);
			input_ref.attr("readOnly",true);
			input_ref.attr("reference",r);
			input_ref.attr("title","Valeur par défaut conseillée");
			line.append(input_ref);
			var line = Create.Col1.NewLine(tab);
			var input = Create.Element('input');
			input.val(GM.let(key+ref,code));
			input.attr("GM",key+ref);
			input.attr("valeur",r);
			line.append(input);
			var line = Create.Col1.NewLine(tab);
			var maj = Create.Icone("","MaJ","[MaJ]","Mettre à jour le champ","");
			maj.attr("MaJ",r);
			maj.css("cursor","pointer");
			line.append(maj);
			var line = Create.Col1.NewLine(tab);
			line.append(Create.Element('br'));
			
			maj.click(function() {
				check = confirm(this.title+" ?");
				if (check) {
					r = $(this).attr("MaJ");
					tab = this.parentNode.parentNode;
					inp = $("[valeur="+r+"]",tab);
					actu = inp.val();
					res = actu.split("<>");
					mod = parseInt(res[0]);
					def = $("[reference="+r+"]",tab).val();
					if (((mod != 0) && (mod != 1)) || res.length < 2 || actu == def) {
						inp.val(def);
						GM.del(inp.attr("GM"));
					} else {
						GM.set(inp.attr("GM"),actu);
					}
				}
			});
			
			return maj;
		},
		ex : function(code,pseudo,groupe) {
			code = code.replace(new RegExp("<<p>>","gi"),pseudo);
			code = code.replace(new RegExp("<<g>>","gi"),groupe);
			code = code.replace(new RegExp("<<c>>","gi"),Pseudonyme.color.get(pseudo,true));
			code = code.replace(new RegExp("<<cp>>","gi"),Pseudonyme.color.get(pseudo,false));
			code = code.replace(new RegExp("<<cg>>","gi"),Pseudonyme.color.get(groupe,false));
			code = code.split("<>");
			var mode = code.shift();
			if (mode != 0 && mode != 1) mode = 1;
			var affichage = "";
			var insert = new Array(groupe,pseudo);
			for (i=0;i<code.length;i++) {
				affichage += code[i];
				if (i+1<code.length) {
					affichage += Pseudonyme.color.write(insert[mode]);
					mode = 1 - mode;
				}
			}
			return affichage;
		},
		exline : function(tab,top,titre,code) {
			var line = Create.Col1.NewLine(tab);
			line.text(titre);
			var line = Create.Col1.NewLine(tab,top);
			var affich = Pseudonyme.mode.ex(code,"pseudo","groupe");
			if (top) {
				line.addClass("tr2");
				var elem = affich;
			} else {
				var li = Create.Element('li').addClass("pseudo").append(affich);
				var ul = Create.Element('ul').append(li);
				var elem = Create.Element('div').addClass("msg").addClass("msg2").append(ul);
			}
			line.append(elem);
			var line = Create.Col1.NewLine(tab);
			var input_ref = Create.Element('input');
			input_ref.val(code);
			input_ref.attr("readOnly",true);
			input_ref.attr("title","Valeur exemple");
			line.append(input_ref);
			var input_ref = Create.Element('input');
			line.append(Create.Element('br'));
			
			return affich;
		},
		replace : function(pic,pseudo,groupe,modo,inG,element) {
			if (GM.let("JVN:Mode",false)) {
				key = "JVN:Mode";
				if (pic) 	var tkey = ":T"; else var tkey = ":M";
				if (inG) 	var gkey = ":G"; else var gkey = ":NG";
				if (modo) 	var mkey = ":M"; else var mkey = ":NM";
				
				var code = GM.get(key+tkey+":perso"+mkey+":"+pseudo.toLowerCase());
				if (code=="") {
					code = GM.get(key+tkey+":group"+mkey+":"+groupe.toLowerCase());
					if (code=="") {
						code = GM.get(key+tkey+gkey+mkey);
						if (code=="") {
							code = Const.Coderef[tkey+gkey+mkey];
						}
					}
				}
				var affichage = Pseudonyme.mode.ex(code,pseudo,groupe);
				if (element != null && element.length > 0)
					element.replaceWith(affichage);
				return affichage;
			}
		}
	},
	color : {
		write : function(pseudo) {
			var psd = pseudo;
			var color = Pseudonyme.color.get(pseudo,true);
			if (GM.let("JVN:Couleur",false) && color != "")
				psd = "<font color='#"+color+"'>"+pseudo+"</font>";
			return psd;
		},
		get : function(pseudo,bool) {
			var def = "";
			if (bool)
				def = GM.get("JVN:Couleur:"+Pseudonyme.groupe(pseudo).toLowerCase());
			if (GM.let("JVN:Couleur",false))
				var col = GM.let("JVN:Couleur:"+pseudo.toLowerCase(),def);
			return col;
		}
	}
}

var Smiley = {
	initList : function() {
		list = new Array();
		list.push(new Array());
		list.push(new Array());
		return list;
	},
	searchAllSmil : function(id,pseudo,list) {
		if (list==null)
			list = Smiley.initList();
		Smiley.JVCSmil(list);
		Smiley.searchNewSmil(id,pseudo,list);
	},
	searchNewSmil : function(id,pseudo,list) {
		if (list==null)
			list = Smiley.initList();
		Smiley.searchRefSmil(list);
		Smiley.searchHiddenSmil(list);
		Smiley.searchSpecificSmil(pseudo,list);
		key = "JVN:Smileys";
		Smiley.Load(list,key,Smiley.add);
		Smiley.Load(list,key+":Code",Smiley.superAdd);
		// var element = document.getElementById(id).childNodes;
		// for(j=0;j<element.length;j++) {
			// if (element[j].nodeType == 3) {
				// Smiley.replace(list,element[j],j,element.length);
			// }
		// }
		var element = document.getElementById(id);
		element.innerHTML = Smiley.replace(list,element.innerHTML,-1,-1);
	},
	searchRefSmil : function(list) {
		reg = " (:?n+y+u+:?) ";	Smiley.superAdd(list,' <img src="'+Icone("nyu",1)+'" alt="<1>"/> ',reg);
		reg = " (:/) ";	Smiley.superAdd(list,' <img src="'+Icone("neutre",1)+'" alt="<1>"/> ',reg);
		reg = " (:shoot:) ";	Smiley.superAdd(list,' <img src="'+Icone("shoot",1)+'" alt="<1>"/> ',reg);
		reg = " (:yuu:) ";	Smiley.superAdd(list,' <img src="'+Icone("yuu",1)+'" alt="<1>"/> ',reg);
		reg = " (:puppy:) ";	Smiley.superAdd(list,' <img src="'+Icone("puppy",1)+'" alt="<1>"/> ',reg);
		reg = " (:null:) ";	Smiley.superAdd(list,' <img src="'+Icone("v",1)+'" alt="<1>"/> ',reg);
		reg = " (:ouin:) ";	Smiley.superAdd(list,' <img src="'+Icone("ouin",1)+'" alt="<1>"/> ',reg);
	},
	searchHiddenSmil : function(list) {
	},
	searchSpecificSmil : function(pseudo,list) {
	},
	Load : function(list,key,fun) {
		if (GM.let(key,false)) {
			GM.unl(key+":n");
			n = GM.let(key+":n",0);
			for (i=0;i<n;i++) {
				fun(list,GM.get(key+":rf-:"+i),GM.get(key+":cd-:"+i));
			}
		}
	},
	replace : function(list,textNode,pos,last) {
		for (var i=0;i<list[0].length;i++) {
			var reg = list[0][i];
			var newreg = reg;
			while (new RegExp("\\[#([0-9]+)\\]").test(newreg)) {
				var val = parseInt(RegExp.$1);
				if (isNaN(val)) {
					newreg = RegExp.leftContext + "[" + RegExp.$1 + "#]" + RegExp.rightContext;
				} else {
					newreg = RegExp.leftContext + String.fromCharCode(val) + RegExp.rightContext;
				}
			}
			var prec = "";
			var cour = " "+textNode.replace(new RegExp("</?br/?>","gi")," <br/> ").replace(new RegExp(String.fromCharCode(10),"g")," "+String.fromCharCode(10)+" ")+" ";
			while (new RegExp(newreg).test(cour)) {
				var save = new Array();
				save.push(RegExp.leftContext);
				save.push(RegExp.$1);
				save.push(RegExp.rightContext);
				
				cour = list[1][reg]; 
				for (var j=1;j<save.length-1;j++) {
					cour = cour.replace(new RegExp("<"+j+">","g"),save[j]);
				}
				
				if (new RegExp("<A>").test(cour)) {
					cour = cour.replace(new RegExp("<A>","g"),save[0]);
				} else {
					prec += save[0];
				}
				
				if (new RegExp("<L>").test(cour)) {
					cour = cour.replace(new RegExp("<L>","g"),save[save.length-1]);
				} else {
					cour += save[save.length-1];
				}
			}
			textNode = prec + cour;
		}
		return textNode;
	},
	add : function(list,href,code) {
		reg = " ("+Const.ConvertToRegExp(code)+") ";
		Smiley.superAdd(list,' <img src="'+href+'" alt="<1>"/> ',reg);
	},
	constAdd : function(list,ref,code) {
		Smiley.add(list,'http://image.jeuxvideo.com/smileys_img/'+ref+'.gif',code);
	},
	superAdd : function(list,html,reg) {
		list[0].push(reg);
		list[1][reg] = html;
	},
	newSmiley : function(href,code) {
		return Smiley.newCode("JVN:Smileys",href,code);
	},
	newCode : function(key,href,code) {
		GM.unl(key+":n");
		n = GM.let(key+":n",0);
		GM.set(key+":rf-:"+n,href);
		GM.set(key+":cd-:"+n,code);
		GM.set(key+":n",n+1);
		return n;
	},
	destroy : function(key,j) {
		GM.unl(key+":n");
		n = GM.let(key+":n",0);
		--n;
		for (i=j;i<n;i++) {
			nrf = GM.get(key+":rf-:"+(i+1));
			ncd = GM.get(key+":cd-:"+(i+1));
			if (nrf!="" && ncd!="") {
				GM.set(key+":rf-:"+i,nrf);
				GM.set(key+":cd-:"+i,ncd);
			}
		}
		GM.del(key+":rf-:"+n);
		GM.del(key+":cd-:"+n);
		if (n>1) {
			GM.set(key+":n",n);
		} else {
			GM.del(key+":n");
		}
	},
	JVCSmil : function(list) {
		Smiley.constAdd(list,1,":)");
		Smiley.constAdd(list,2,":question:");
		Smiley.constAdd(list,3,":g)");
		Smiley.constAdd(list,4,":d)");
		Smiley.constAdd(list,5,":cd:");
		Smiley.constAdd(list,6,":globe:");
		Smiley.constAdd(list,7,":p)");
		Smiley.constAdd(list,8,":malade:");
		Smiley.constAdd(list,9,":pacg:");
		Smiley.constAdd(list,10,":pacd:");
		Smiley.constAdd(list,11,":noel:");
		Smiley.constAdd(list,12,":o))");
		Smiley.constAdd(list,13,":snif2:");
		Smiley.constAdd(list,14,":-(");
		Smiley.constAdd(list,15,":-((");
		Smiley.constAdd(list,16,":mac:");
		Smiley.constAdd(list,17,":gba:");
		Smiley.constAdd(list,18,":hap:");
		Smiley.constAdd(list,19,":nah:");
		Smiley.constAdd(list,20,":snif:");
		Smiley.constAdd(list,21,":mort:");
		Smiley.constAdd(list,22,":ouch:");
		Smiley.constAdd(list,23,":-)))");
		Smiley.constAdd(list,24,":content:");
		Smiley.constAdd(list,25,":nonnon:");
		Smiley.constAdd(list,26,":cool:");
		Smiley.constAdd(list,27,":sleep:");
		Smiley.constAdd(list,28,":doute:");
		Smiley.constAdd(list,29,":hello:");
		Smiley.constAdd(list,30,":honte:");
		Smiley.constAdd(list,31,":-p");
		Smiley.constAdd(list,32,":lol:");
		Smiley.constAdd(list,33,":non2:");
		Smiley.constAdd(list,34,":monoeil:");
		Smiley.constAdd(list,35,":non:");
		Smiley.constAdd(list,36,":ok:");
		Smiley.constAdd(list,37,":oui:");
		Smiley.constAdd(list,38,":rechercher:");
		Smiley.constAdd(list,39,":rire:");
		Smiley.constAdd(list,40,":-D");
		Smiley.constAdd(list,41,":rire2:");
		Smiley.constAdd(list,42,":salut:");
		Smiley.constAdd(list,43,":sarcastic:");
		Smiley.constAdd(list,44,":up:");
		Smiley.constAdd(list,45,":(");
		Smiley.constAdd(list,46,":-)");
		Smiley.constAdd(list,47,"peur:");
		Smiley.constAdd(list,48,":bye:");
		Smiley.constAdd(list,49,":dpdr:");
		Smiley.constAdd(list,50,":fou:");
		Smiley.constAdd(list,51,":gne:");
		Smiley.constAdd(list,52,":dehors:");
		Smiley.constAdd(list,53,":fier:");
		Smiley.constAdd(list,54,":coeur:");
		Smiley.constAdd(list,55,":rouge:");
		Smiley.constAdd(list,56,":sors:");
		Smiley.constAdd(list,57,":ouch2:");
		Smiley.constAdd(list,58,":merci:");
		Smiley.constAdd(list,59,":svp:");
		Smiley.constAdd(list,60,":ange:");
		Smiley.constAdd(list,61,":diable:");
		Smiley.constAdd(list,62,":gni:");
		Smiley.constAdd(list,63,":spoiler:");
		Smiley.constAdd(list,64,":hs:");
		Smiley.constAdd(list,65,":desole:");
		Smiley.constAdd(list,66,":fete:");
		Smiley.constAdd(list,67,":sournois:");
		Smiley.constAdd(list,68,":hum:");
		Smiley.constAdd(list,69,":bravo:");
		Smiley.constAdd(list,70,":banzai:");
		Smiley.constAdd(list,71,":bave:");
	},
	newLine : function(line,key,k) {
		td = Create.Element('td');
		button = Create.Icone("","redX","[X]","Supprimer","").css("cursor","pointer");
		button.attr("num",k);
		button.attr("key",key);
		button.click(function() {
			check = confirm("Voulez-vous supprimer ce smiley ?")
			if (check) {
				Smiley.destroy($(this).attr("key"),parseInt($(this).attr("num")));
			}
		});
		td.append(button);
		line.append(td);
		
		td = Create.Element('td');
		td.text(GM.get(key+":cd-:"+k));
		line.append(td);
		
		td = Create.Element('td');
		img = Create.Element('img');
		img.attr("src",GM.get(key+":rf-:"+k));
		td.append(img);
		line.append(td);
	}
}

var Mess = {
	Hide : function(id) {
		$("#Hide-"+id).css("visibility","hidden");
		$("#Avatar-"+id).hide("slow");
		$("#"+id+"_post").hide("slow",function() {
			$("#Hide-"+id).css("visibility","");
			$("#Hide-"+id).hide();
			$("#Show-"+id).show();
		});
		$("#"+id+"_cens").show("slow",function() {});
	},
	Show : function(id) {
		$("#Show-"+id).css("visibility","hidden");
		$("#Avatar-"+id).show("slow");
		$("#"+id+"_post").show("slow",function() {});
		$("#"+id+"_cens").hide("slow",function() {
			$("#Show-"+id).css("visibility","");
			$("#Show-"+id).hide();
			$("#Hide-"+id).show();
		});
	},
	Visible : function(id,bool) {
		$("#"+"Visi-"+id).hide();
		$("#"+id).show();
		if (bool)
			location.href = location.href.split("#")[0]+"#"+id;
		$("#"+id).hide();
		$("#"+id).show("slow");
	},
	Destroy : function(id,bool) {
		$("#"+idmess).hide("slow", function() {
			$("#"+"Visi-"+id).show();
			if (bool)
				location.href = location.href.split("#")[0]+"#"+"Visi-"+id;
		});
	},
	Citer : function(id) {	//	lecteur de message
		var post = "";
		var element = document.getElementById(id+"_post").childNodes;
		for(i=0;i<element.length;i++) {
			if (element[i].nodeType == 3) {
				post += element[i].nodeValue.replace(new RegExp(String.fromCharCode(10),"gi"),"");
			} else {
				switch (element[i].tagName) {
					case 'IMG' :
						post += element[i].alt;
						break;
					case 'A' :
						post += element[i].href;
						break;
					case 'BR' :
						post += "\n";
						break;
					default : 
						if ($(element[i]).attr("alt")!=null && $(element[i]).attr("alt")!="") {
							post += $(element[i]).alt();
						} else {
							post += $(element[i]).text();
						}
						break;
				}
			}
		}
		return post;
	},
	applyCit : function(element) {
		element.focus(function() {
			var cit = GM.get("JVN:Citations:Citation");
			if (cit != "") {
				element.val(element.val()+cit);
				GM.del("JVN:Citations:Citation");
			}
		});
	},
	Zephyr : {
		Consonne : new Array("z","r","t","p","q","s","d","f","g","h","j","k","l","m","w","x","c","v","b","n"),
		Voyelle : new Array("a","e","y","u","i","o"),
		Prec : function(arr,car) {
			newcar = car;
			if (new RegExp("^["+arr.join("")+"]$","gi").test(car)) {
				l=0;
				newcar = arr[arr.length-1];
				while(arr[l]!=car && l<arr.length) {
					newcar = arr[l];
					l++;
				}
			}
			return newcar;
		},
		Suiv : function(arr,car) {
			newcar = car;
			if (new RegExp("^["+arr.join("")+"]$","gi").test(car)) {
				l=arr.length-1;
				newcar = arr[0];
				while(arr[l]!=car && l>=0) {
					newcar = arr[l];
					l--;
				}
			}
			return newcar;
		},
		Maj : function(car,newcar) {
			maj = new RegExp("^[A-Z]$").test(car);
			if (maj) {
				newcar = newcar.toUpperCase();
			}
			return newcar;
		},
		Convert : function(post,Alt) {
			var element = post.childNodes;
			for(j=0;j<element.length;j++) {
				if (element[j].nodeType == 3) {
					Z = element[j].nodeValue
					newZ = "";
					for(k=0;k<Z.length;k++) {
						car = Z[k].toLowerCase();
						car = Alt(Mess.Zephyr.Voyelle,car);
						car = Alt(Mess.Zephyr.Consonne,car);
						car = Mess.Zephyr.Maj(Z[k],car);
						newZ += car;
					}
					element[j].nodeValue = newZ;
				}
			}
		},
		Invert : function(post) {
			var element = post.childNodes;
			for(j=0;j<element.length;j++) {
				if (element[j].nodeType == 3) {
					var Z = element[j].nodeValue;
					var txt = new Array();
					for (k=0;k<Z.length;k++)
						txt.push(Z.charCodeAt(k));
					element[j].nodeValue = txt.join(" ");
				}
			}
		},
		Revert : function(post) {
			var element = post.childNodes;
			for(j=0;j<element.length;j++) {
				if (element[j].nodeType == 3) {
					var Z = element[j].nodeValue.split(" ");
					var txt = "";
					for (k=0;k<Z.length;k++)
						txt += String.fromCharCode(Z[k]);
					element[j].nodeValue = txt;
				}
			}
		}
	}
}

var Topic = {
	Hide : function(id) {
		sujet = $("#"+id+"_sujet");
		sujet.attr("title",sujet.text());
		temp = sujet.attr("name");
		sujet.attr("name",sujet.html());
		sujet.html(temp);
	},
	Show : function(id) {
		Topic.Hide(id);
		sujet = $("#"+id+"_sujet");
		sujet.attr("title","");
	},
	Visible : function(id) {
		$("#"+"Visi-"+id).hide();
		$("#"+id).show();
	},
	Destroy : function(id) {
		$("#"+"Visi-"+id).show();
		$("#"+id).hide();
	}
}

var Exclusion = {
	Bloc : function() {
		entree = $("#Exclusions ul:first-child");
		if (entree.length == 0) {
			Bloc = Create.Element("div");
			Bloc.attr("id","Exclusions");
			$("#col1").append(Bloc);
			Bloc.addClass("msg");
			Bloc.addClass("msg1");
			
			entree = Create.Element("ul");
			Bloc.append(entree);
			
			li = Create.Element("li");
			entree.append(li);
			li.css("color","#440088");
			li.css("font-weight","bold");
			li.text("Liste des exclusions");
			
			li = Create.Element("li");
			entree.append(li);
			li.addClass("post");
		}
		return entree;
	},
	New : function(groupe) {
		bloc = document.getElementById("Excl-"+groupe.toLowerCase());
		if (bloc == null) {
			entree = Exclusion.Bloc();
			bloc = Create.Element("li");
			bloc.css("font-weight","bold");
			entree.append(bloc);
			bloc.attr("id","Excl-"+groupe);
			bloc.text(" "+groupe + " ( ");
			span = Create.Element("span");
			span.text(0);
			span.css("font-weight","normal");
			span.css("font-style","italic");
			span.css("color","#660000");
			bloc.append(span);
			bloc.append($(document.createTextNode(" ) : ")));
			
			img_aut = Create.Icone("Aut-"+groupe,"green","[+]","Autoriser "+groupe,groupe.toLowerCase());
			img_aut.css("cursor","pointer");
			$(bloc).prepend(img_aut);
			
			img_aut.click(function() {
				check = confirm(this.title+" ?");
				if (check) {
					groupemess = this.name;
					GM.del("JVN:Exclusion:"+groupemess);
					Reload();
				}
			});
			
		}
		return bloc;	
	}
}

var Protection = {
	Add : function(value,key) {
		GM.unl(key+":n");
		n = GM.let(key+":n",0);
		if (new RegExp("##").test(value)) {
			value = value.split("##");
			mode = value.shift();
			value = value.join("##");
			GM.set(key+":mode|"+n,mode);
		}
		GM.set(key+":"+n,value);
		GM.set(key+":n",n+1);
	},
	Delete : function(href,key) {
		GM.unl(key+":n");
		n = GM.let(key+":n",0);
		j = -1;
		bool = false;
		while(!(bool) && ++j<n) {
			var reg = GM.get(key+":"+j);
			bool = new RegExp(reg,"gi").test(href);
		}
		if (bool) {
			value = reg;
			for (k=j+1;k<n;k++)
				GM.set(key+":"+(k-1),GM.get(key+":"+k));
			GM.set(key+":n",n-1);
			GM.del(key+":"+n);
			GM.del(key+":mode|"+n);
			return value;
		} else {
			return null;
		}
	},
	Test : function(href,key) {
		bool = false;
		GM.unl(key+":n");
		n = GM.let(key+":n",0);
		j = -1;
		while(!(bool) && ++j<n) {
			reg = GM.get(key+":"+j);
			bool = new RegExp(reg,"gi").test(href);
		}
		return new Array(bool,GM.get(key+":mode|"+j));
	},
	IsClosed : function(href) {
		return Protection.Test(href,"JVN:Protections");
	},
	IsProtected : function(href) {
		new RegExp("^([^:/]+:/+[^/#]+)(/?[^#]*/)?([^/#]*)(#.*)?$").exec(href);
		deb = RegExp.$1;
		crp = RegExp.$2;
		fin = RegExp.$3;
		ind = RegExp.$4;
		switch ((deb).toLowerCase()) {
			case "http://www.jeuxvideo.com" : {}
			case "http://www.jeuxvideo.com" : {
				new RegExp("([^?]*)(\\?.*)?").exec(fin);
				switch ((RegExp.$1).toLowerCase()) {
					case "vote.php" : {}
					case "avertir_moderateur.cgi" : {bool = false; break;}
					default : {bool = true; break;}
				}
				break;
			}
			default : {bool= false;break;}
		}
		key = "JVN:Protections:Unprotect";
		if (!(bool) && GM.let(key,false)) {
			bool = Protection.Test(href,key)[0];
		}
		return bool;
	},
	MakesHidden : function(a) {
		href = a.attr("href");
		if (Protection.IsProtected(href)) {
			a.addClass("hidden_link");
			if ($("#style_hidden_link").length == 0) {
				style = ".hidden_link, .hidden_link:hover {color:#000000 !important;cursor:default !important;}";
				Create.Style(style).attr("id","style_hidden_link");
			}
		}
	},
	UndirectLink : function(a) {
		key = "JVN:Protections:Undirect";
		if (GM.let(key,false)) {
			href = a.attr("href");
			bool = Protection.Test(href,key)[0];
			if (bool) {
				a.addClass("unsure_link");
				if ($("#style_unsure_link").length == 0) {
					style = ".unsure_link {color:#800000; font-style:italic;font-size:90%;}";
					Create.Style(style).attr("id","style_unsure_link");
				}
				a.click(function() {
					return window.confirm("/!\\ Êtes-vous sur de vouloir visiter ce lien ?");
				});
			}
		}
	},
	CloseLink : function(href) {
		if (href.length < 56)
			newref = href;
		else
			newref = href.substring(0,25)+"[...]"+href.substring(href.length-19,href.length);
		span = Create.Element("span");
		span.text(newref);
		span.attr("title",href);
		span.addClass("closedlink");
		if ($("#closedlink").length == 0) {
			style = ".closedlink {color:#220088; text-decoration:line-through; font-weight:lighter; font-size:80%;}";
			Create.Style(style).attr("id","closedlink");
		}
		return span;
	},
	OpenLink : function(href) {
		if (href.length < 56)
			newref = href;
		else
			newref = href.substring(0,24)+"<i>"+href[24]+"</i><span>"+href.substring(26,href.length-19)+"</span>"+href.substring(href.length-19,href.length);
		a = Create.Element("a");
		a.attr("href",href);
		a.attr("rel","nofollow")
		a.attr("target","_blank");
		a.html(newref);
		
		Protection.UndirectLink(a);
		
		return a;
	}
}

var lecture = {
	message : function(mess,modo) {
		var reponse = new Array();
		
		var id = mess.id;
		reponse["all"] = $(mess);
		reponse["id"] = id;
		
		Debug.TimeStamp("lecture"," "+id+" : begin");
		var li = mess.getElementsByTagName('li');
		if (li.length > 3) {
			reponse["entete"] = $(li[0]);
			var strong = li[0].getElementsByTagName('strong');
			if (strong.length>0) {
				reponse["pseudo"] = strong[0].innerHTML;
				reponse["modo"] = (strong[0].className == "moderateur");
			}
			var a = li[0].getElementsByTagName('a');
			var a2 = li[1].getElementsByTagName('a');
			if (a.length > 0) {
				reponse["profil"] = $(a[a.length-1]);
			}
			Debug.TimeStamp("lecture"," "+id+" : pseudo");
			if (modo && a.length>1) {
				reponse["supp"] = a[0];
				reponse["suppr"] = a[0].href;
				if (a2.length > 1)
					reponse["kick"] = a[0];
			}
			Debug.TimeStamp("lecture"," "+id+" : modo");
			
			reponse["encart"] = $(li[1]);
			new RegExp(Const.DateInTopicReg).exec(li[1].innerHTML);
			reponse["date"] = new Date();
				reponse["date"].setYear(parseInt(Const.No0(RegExp.$3)));
				reponse["date"].setMonth(jQuery.inArray(RegExp.$2, Const.mois));
				reponse["date"].setDate(parseInt(Const.No0(RegExp.$1)));
				reponse["date"].setHours(parseInt(Const.No0(RegExp.$4)));
				reponse["date"].setMinutes(parseInt(Const.No0(RegExp.$5)));
				reponse["date"].setSeconds(parseInt(Const.No0(RegExp.$6)));
			Debug.TimeStamp("lecture"," "+id+" : date");
			
			if (a2.length > 0)
				reponse["avert"] = $(a2[a2.length-1]);
			Debug.TimeStamp("lecture : avert");
			
			reponse["message"] = $(li[2]);
			reponse["post"] = li[2].innerHTML;
			Debug.TimeStamp("lecture"," "+id+" : message");
			
			reponse["ancre"] = $(li[3]);
			Debug.TimeStamp("lecture"," "+id+" : ancre");
			
			li[0].id = id+"_pseudo";
			li[1].id = id+"_date";
			li[2].id = id+"_post";
			li[3].id = id+"_ancre";
			Debug.TimeStamp("lecture"," "+id+" : id");
		}
		
		return reponse;
	},
	sujet : function(sujet,col,modo,i) {
		var reponse = new Array();
		
		reponse["all"] = $(sujet);
		Debug.TimeStamp("lecture"," "+i+" : begin");
		
		var a = sujet.getElementsByTagName('a');
		if (a.length > 0) {
			reponse["link"] = a[a.length-1].href;
			reponse["titre"] = a[a.length-1].innerHTML;
			new RegExp("([^0-9])([0-9]+)-([^-]+)-([^-]+)-([^-]+)-([^-]+)-([^-]+)-([^-]+)-(.+)\\.htm").test(reponse["link"]);
			reponse["context"] = RegExp.leftContext+RegExp.$1;
			reponse["mode"] = parseInt(RegExp.$2);
			reponse["forum"] = parseInt(RegExp.$3);
			reponse["topic"] = parseInt(RegExp.$4);
			reponse["pages"] = parseInt(RegExp.$5);
			reponse["k"] = RegExp.$6;
			reponse["index"] = parseInt(RegExp.$7);
			reponse["search"] = parseInt(RegExp.$8);
			reponse["key"] = RegExp.$9;
		}
		Debug.TimeStamp("lecture"," "+i+" : link");
		
		var elements = sujet.getElementsByTagName('td');
		
		reponse["icone"] = $(elements[col["icone"]])
		var img = elements[col["icone"]].getElementsByTagName('img');
		if (img.length > 0)
			reponse["type"] = img[0].src;
		Debug.TimeStamp("lecture"," "+i+" : icone");
		
		if (modo && a.length > 1) {
			reponse["moder"] = $(elements[col["moder"]]);
			reponse["suppr"] = a[0].href;
			new RegExp("[^0-9]([0-9]+)-([^-]+)-([^-]+)-([^-]+)-([^-]+)-([^-]+)-([^-]+)-(.+)\\.htm").test(reponse["suppr"]);
			reponse["x_mode"] = parseInt(RegExp.$1);
			reponse["x_forum"] = parseInt(RegExp.$2);
			reponse["x_topic"] = parseInt(RegExp.$3);
			reponse["x_pages"] = parseInt(RegExp.$4);
			reponse["x_k"] = RegExp.$5;
			reponse["x_index"] = parseInt(RegExp.$6);
			reponse["x_search"] = parseInt(RegExp.$7);
			reponse["x_key"] = RegExp.$8;
		}
		Debug.TimeStamp("lecture"," "+i+" : modo");
		
		reponse["sujet"] = $(elements[col["sujet"]]);
		Debug.TimeStamp("lecture"," "+i+" : titre");
		
		reponse["auteur"] = $(elements[col["auteur"]]);
		reponse["pseudo"] = elements[col["auteur"]].innerHTML;
		reponse["modo"] = new RegExp("topic_mod").test(elements[col["auteur"]].className);
		Debug.TimeStamp("lecture"," "+i+" : auteur");
		
		reponse["message"] = $(elements[col["message"]]);
		reponse["nombre"] = parseInt(elements[col["message"]].innerHTML);
		Debug.TimeStamp("lecture"," "+i+" : sujet");
		
		reponse["last"] = $(elements[col["last"]]);
		reponse["date"] = new Date()
		new RegExp(Const.DateInListeReg).exec(elements[col["last"]].innerHTML);
			reponse["date"].setYear(parseInt(Const.No0(RegExp.$3)));
			reponse["date"].setMonth(parseInt(Const.No0(RegExp.$2))-1);
			reponse["date"].setDate(parseInt(Const.No0(RegExp.$1)));
			reponse["date"].setHours(parseInt(Const.No0(RegExp.$4)));
			reponse["date"].setMinutes(parseInt(Const.No0(RegExp.$5)));
		Debug.TimeStamp("lecture"," "+i+" : date");
		
		return reponse;
	},
	colonnes : function(modo) {
		reponse = new Array();
		
		reponse["all"] = $("#liste_topics th");
		Debug.TimeStamp("lecture"," col : ");
		
		ico = $("#liste_topics th:first-child");
		ico.text("0");
		if (modo) {
			mod = $("#liste_topics th[class='col_moder']");
			mod.text("1");
		}
		Debug.TimeStamp("lecture"," col : modo");
		
		liste = $($("#liste_topics tr th").parent().get(0)).text().split("\n");
		reponse["icone"] = jQuery.inArray("0",liste)-1;
		reponse["moder"] = jQuery.inArray("1",liste)-1;
		reponse["sujet"] = jQuery.inArray("Sujet",liste)-1;
		reponse["auteur"] = jQuery.inArray("Auteur",liste)-1;
		reponse["message"] = jQuery.inArray("Nb",liste)-1;
		reponse["last"] = jQuery.inArray("Dernier Msg",liste)-1;
		Debug.TimeStamp("lecture"," col : colonnes");
		
		ico.text(" ");
		if (modo)
			mod.text(" ");
		Debug.TimeStamp("lecture"," col : restauration");
		
		return reponse;
	},
	profil : function(location) {
	
		var reponse = new Array();
		reponse["all"] = $("#profil",location);
		reponse["pseudonyme"] = $("#pseudo",location);
		reponse["mail"] = $("#pseudo a",location).attr("href");
		reponse["pseudo"] = reponse["pseudonyme"].text();
		reponse["avatar"] = $("#avatar0",location);
		reponse["prefs"] = $("#prefs",location);
		reponse["cdv"] = $("#cartevisite0",location);
		reponse["cdv_content"] = $("#cartevisite0",location).text();
		reponse["tab"] = $("#profil_tab0 tbody:first-child",location);
		reponse["nbpost"] = $("#nbpost",location);
		Debug.TimeStamp("lecture"," prof : profil base");
		
		if (reponse["tab"].length > 0) {	// Récupère les informations sur le tableau
			tr = $("tr",reponse["tab"]);
			tr.each(function (i) {
				bloc_titre = $("th",this);
				bloc_valeur = $("td",this);
				titre = bloc_titre.text();
				reponse[titre+" titre"]=bloc_titre;
				reponse[titre+" valeur"]=bloc_valeur;
				valeur = bloc_valeur.text();
				switch(titre) {
					case "Age" : {
						reponse["age"] = parseInt(valeur);
						break;
					}
					case "Pays" : {
						reponse["pays"] = valeur;
						break;
					}
					case "Membre depuis" : {
						reponse["anciennete"] = parseInt(valeur.replace(new RegExp("\\.","g"),""));
						break;
					}
					case "Dernier passage" : {
						new RegExp("([0-9]{2})/([0-9]{2})/([0-9]{4})").test(valeur);
						last = new Date();
						last.setDate(parseInt(RegExp.$1));
						last.setMonth(parseInt(RegExp.$2)-1);
						last.setYear(parseInt(RegExp.$3));
						reponse["date"] = last;
						break;
					}
					case "Msg. instant." : {
						reponse["messagerie"] = valeur;
						break;
					}
				}
			});
		}
		Debug.TimeStamp("lecture"," prof : profil tab");
		
		if (reponse["nbpost"].length > 0) {	// Récupère le nb de messages
			reponse["messages"] = parseInt(reponse["nbpost"].text().replace(new RegExp("[^0-9]","gi"),""));
		}
		Debug.TimeStamp("lecture"," prof : nb message");
		
		return reponse;
	}
}

var Retouche = {
	Message : function(mess,forum,modo) {
						Debug.TimeStamp("InMess"," : lecture");
		var reponse = lecture.message(mess,modo);
		var id = mess.id;
		var htmlsave = reponse["all"].html();
		
		if (reponse["ancre"].length > 0) {
							Debug.TimeStamp("InMess"," : Init");
			var groupe = Pseudonyme.groupe(reponse["pseudo"]);
			reponse["all"].attr("pseudo",reponse["pseudo"].toLowerCase());
			Pseudonyme.mode.replace(false,reponse["pseudo"],groupe,reponse["modo"],Pseudonyme.inGroupe(reponse["pseudo"]),$("strong",reponse["entete"]));
			var no_modo_style = (!(reponse["modo"]) || (GM.let("JVN:Secret:NoModoProtect",false)));
			var kicked = false;
			var aimed = false;
			
							Debug.TimeStamp("InMess"," : Fuseau");
			var dateact = reponse["date"];
			if (GM.let("JVN:Fuseau",false))
				dateact.setMinutes(dateact.getMinutes()+GM.let("JVN:Fuseau:Horaire",0));
			var datemess = Const.DateInTopic(dateact);
			if (GM.let("JVN:Fuseau",false)) {
				var children = reponse["encart"][0].childNodes;
				var i = -1;
				while (++i < children.length && !(new RegExp(Const.DateInTopicReg).test(children[i].nodeValue)));
				if (i < children.length)
					children[i].nodeValue = "Posté le \n" + datemess + " ";
			}
			
							Debug.TimeStamp("InMess"," : Censure");
			if(GM.let("JVN:Censure",false)) {
				img_hide = Create.Icone("Hide-"+id,"orange","[-]","Cacher le message",groupe.toLowerCase());
				img_hide.css("cursor","pointer");
				img_hide.css("margin-right","3px");
				reponse["entete"].append(img_hide);
				
				img_show = Create.Icone("Show-"+id,"green","[+]","Afficher le message",groupe.toLowerCase());
				img_show.css("cursor","pointer");
				img_show.css("margin-right","3px");
				img_show.hide();
				reponse["entete"].append(img_show);
				
				cens = Create.Element("li");
				span = Create.Element("span");
				span.css("font-style","italic");
				span.css("font-size","x-small");
				cens.css("text-align","center");
				span.text("Ce message a été censuré");
				cens.append(span);
				cens.attr("id",id+"_cens");
				cens.addClass("post");
				reponse["message"].after(cens);
				cens.hide();
				
				img_hide.click(function() {
					groupemess = this.name;
					idmess = this.id.split("-")[1];
					GM.set("JVN:Censure:"+forum+":"+idmess,true);
					if ((GM.let("JVN:Kick",false) && GM.let("JVN:Kick:"+groupemess,false)))
						GM.del("JVN:Censure:"+forum+":"+idmess);
					Mess.Hide(idmess);
				});
				img_show.click(function() {
					groupemess = this.name;
					idmess = this.id.split("-")[1];
					GM.set("JVN:Censure:"+forum+":"+idmess,false);
					if (!(GM.let("JVN:Kick",false) && GM.let("JVN:Kick:"+groupemess,false)))
						GM.del("JVN:Censure:"+forum+":"+idmess);
					Mess.Show(idmess);
				});
				
				if (GM.let("JVN:Kick",false) && no_modo_style) {
					if (GM.let("JVN:Kick:"+groupe.toLowerCase(),false))
						img_kick = Create.Icone("Kick-"+id,"pinko","[O]","Dékicker "+groupe,groupe.toLowerCase());
					else
						img_kick = Create.Icone("Kick-"+id,"bluek","[K]","Kicker "+groupe,groupe.toLowerCase());
					reponse["entete"].append(img_kick);
					img_kick.css("cursor","pointer");
					img_kick.css("margin-right","3px");
					
					img_kick.click(function() {
						check = confirm(this.title+" ?");
						if (check) {
							groupemess = this.name;
							idmess = this.id.split("-")[1];
							Kick.make(groupemess,".msg",Mess.Hide,Mess.Show,null);
						}
					});
				}
				
				if (GM.let("JVN:Censure:"+forum+":"+id,(GM.let("JVN:Kick",false) && GM.let("JVN:Kick:"+groupe.toLowerCase(),false))) && no_modo_style) {
					Mess.Hide(id);
					kicked = true;
				}
			}
			
							Debug.TimeStamp("InMess"," : Exclusions");
			if (GM.let("JVN:Exclusion",false) && no_modo_style) {
				if (GM.let("JVN:Exclusion:"+groupe.toLowerCase(),false)) {
					if (GM.let("JVN:Arme:Exclus",false))
						aimed = true;
					var img_excl = Create.Icone("Excl-"+id,"greenX","[X]","Masquer ce message",groupe.toLowerCase());
					reponse["entete"].append(img_excl);
					img_excl.css("cursor","pointer");
					img_excl.css("margin-right","3px");
					img_excl.click(function() {
						idmess = this.id.split("-")[1];
						Mess.Destroy(idmess,true);
					});
					
					reponse["all"].hide()
					reponse["all"].removeClass("msg1");
					reponse["all"].removeClass("msg2");
					reponse["all"].addClass("msg0");
					
					if ($("#style_msg0").length == 0) {
						style = ".msg0 {background-color:#000000;color:#FFFFFF;}";
						Create.Style(style).attr("id","style_msg0");
					}
					
					var bloc = Exclusion.New(groupe);
					
					var img_aff = Create.Icone("Visi-"+id,"profil","[?]","Afficher le message du "+datemess,groupe.toLowerCase());
					img_aff.css("cursor","pointer");
					var span = $("span",bloc);
					span.text(1+parseInt(span.text()));
					img_aff.css("margin","1px");
					$(bloc).append(img_aff);
					
					img_aff.click(function() {
						idmess = this.id.split("-")[1];
						Mess.Visible(idmess,true);
					});
					
					if (modo && GM.let("JVN:Modo:Exclusion",false)) {
						Mess.Visible(id,false);
					}
					
				} else {
					var img_excl = Create.Icone("Excl-"+id,"redX","[X]","Exclure "+groupe,groupe.toLowerCase());
					reponse["entete"].append(img_excl);
					img_excl.css("cursor","pointer");
					img_excl.css("margin-right","3px");
					
					img_excl.click(function() {
						check = confirm(this.title+" ?");
						if (check) {
							groupemess = this.name;
							GM.set("JVN:Exclusion:"+groupemess,true);
							Reload();
						}
					});
						
					
				}
			}
			
							Debug.TimeStamp("InMess"," : Citations");
			if (GM.let("JVN:Citations",false)) {
				img_cit = Create.Icone("Cit-"+id,"grayc","[C]","Citer le message","");
				img_cit.css("cursor","pointer");
				img_cit.css("margin-right","3px");
				reponse["entete"].append(img_cit);
				img_cit.attr("pseudo",reponse["pseudo"]);
				img_cit.attr("date",datemess);
				img_cit.click(function() {
					if (GM.let("JVN:Citations:Confirm",false))
						check = true;
					else
						check = confirm(this.title+" ?");
					if (check) {
						idmess = this.id.split("-")[1];
						citation  = location.href + "#" + idmess + "\n";
						citation += "| " + $(this).attr("pseudo") + "\n";
						citation += "| " + $(this).attr("date") + "\n";
						citation += "| " + Mess.Citer(idmess).split("\n").join("\n| ") + "\n";
						citation += "\n\n\n"
						GM.set("JVN:Citations:Citation",GM.get("JVN:Citations:Citation")+citation);
					}
				});
			}
			
							Debug.TimeStamp("InMess"," : Protections");
			if (GM.let("JVN:Protections",false)) {
				a = $("a",reponse["message"]);
				for(i=0;i<a.length;i++) {
					var href = $(a[i]).attr("href");
					
					Protection.UndirectLink($(a[i]));
					
					is_protected = Protection.IsProtected(href);
					if (!(is_protected)) {
						if (GM.let("JVN:Protections:Testeur",false)) {
							var img_test = Create.Icone("","css-page-retour","","Tester ce lien",href);
							img_test.css("cursor","pointer");
							img_test.addClass("JVN-LinkTest");
							img_test.css("margin","1px");
							img_test.attr("href",href);
							$(a[i]).before(img_test);
							img_test.click(function() {
								var href = $(this).attr("href");
								getPage(href,
									function(response) {
										alert("Accédé à : "+response.finalUrl+"\n\n"+response.responseText);
									},
									function(response) {
										alert("Echec du chargement de : "+response.finalUrl+"\n\n"+response.responseText);
									},
									function(response) {
									}
								);
							});
						}
						
						var img_protect = Create.Icone("","css-puce-info","","Interdire ce lien",href);
						img_protect.css("cursor","pointer");
						img_protect.addClass("JVN-Protect");
						img_protect.css("margin","1px");
						$(a[i]).before(img_protect);
						img_protect.click(function() {
							var href = Const.ConvertToRegExp(this.name);
							var value = prompt("Interdire ce lien ? (expressions régulières détectées)",href);
							if (value != null && value !="") {
								Protection.Add(value,"JVN:Protections");
								var value = value.split("##");
								var value = value[value.length - 1];
								$(".post a").each(function(i) {
									href = this.href;
									if (new RegExp(value,"gi").test(href)) {
										$(this).replaceWith(Protection.CloseLink(href));
									}
								});
								$(".JVN-Protect").each(function(i) {
									if (new RegExp(value,"gi").test(this.name)) {
										$(this).hide();
									}
								});
								$(".JVN-Unprotect").each(function(i) {
									if (new RegExp(value,"gi").test(this.name)) {
										$(this).show();
									}
								});
							}
						});
						img_protect.hide();
						
						img_unprotect = Create.Icone("","css-puce-info","","Autoriser ce lien",href);
						img_unprotect.css("cursor","pointer");
						img_unprotect.addClass("JVN-Unprotect");
						img_unprotect.css("margin","1px");
						$(a[i]).before(img_unprotect);
						img_unprotect.click(function() {
							var check = confirm("Êtes-vous sur de vouloir réautoriser ce type de lien ?");
							if (check) {
								var reg = Protection.Delete(this.name,"JVN:Protections");
								var reg = reg.split("##");
								var reg = reg[reg.length - 1];
								if (reg!=null) {
									$(".post .closedlink").each(function(i) {
										var href = this.title;
										if (new RegExp(reg,"gi").test(href)) {
											$(this).replaceWith(Protection.OpenLink(href));
										}
									});
									$(".JVN-Protect").each(function(i) {
										if (new RegExp(reg,"gi").test(this.name)) {
											$(this).show();
										}
									});
									$(".JVN-Unprotect").each(function(i) {
										if (new RegExp(reg,"gi").test(this.name)) {
											$(this).hide();
										}
									});
								}
							}
						});
						img_unprotect.hide();
						
						is_closed = Protection.IsClosed(href);
						
						if (is_closed[0]) {
							img_unprotect.show();
							$(a[i]).replaceWith(Protection.CloseLink(href));
							switch (is_closed[1]) {
								case "C" : {
									Mess.Hide(id);
									break;
								}
								case "D" : {
									
									break;
								}
								case "K" : {
									Kick.make(groupe,".msg",Mess.Hide,Mess.Show,true);
									break;
								}
								case "E" : {
									
									break;
								}
								case "Y" : {
									reponse["all"].attr("Yuki",true);
								}
								case "M" : {
									aimed = true;
									break;
								}
							}
							
						} else {
							img_protect.show();
						}
					}
					
				}
			}
			
							Debug.TimeStamp("InMess"," : Avertissements");
			if (GM.let("JVN:Avert",false)) {
				Alert = Create.Icone("Alert-"+reponse["id"],"redA","[A]","Poser un avertissement sur ce message",reponse["post"]);
				Alert.attr("date","Posté le \n"+datemess+" ");
				Alert.attr("pseudo",reponse["pseudo"]);
				reponse["encart"].append(document.createTextNode("\n "));
				reponse["encart"].append(Alert);
				Alert.css("cursor","pointer");
				Alert.css("margin-left","2px");
				Alert.click(function() {
					av = prompt("Quel degré d'avertissement poser ? (maximum:"+GM.let("JVN:Avert:Max",1000)+")","");
					av = parseInt(av);
					if (av!=null && !(isNaN(av)) && av!=0) {
						comment = prompt("Commentaire","");
						id = this.id.split("-")[1];
						grp = Pseudonyme.groupe($(this).attr("pseudo")).toLowerCase();
						content  = "<div id='"+id+"' class='msg msg2'><ul>";
						content += "<li class='pseudo'><strong>"+$(this).attr("pseudo")+"</strong><span class='val_avert'>"+av+"</span></li>";
						content += "<li class='date'>"+$(this).attr("date")+"</li>";
						content += "<li class='post'>"+this.name+"</li>";
						if (comment!=null && comment!="")
							content += "<li class='post' id='Comment_"+id+"'><strong>Commentaires :</strong><br/>"+comment+"</li>";
						content += "<li class='ancre'><a href='"+location.href+"#"+id+"'>Lien Permanent</a></li>";
						content += "</ul></div>";
						
						prec = GM.let("JVN:Avert:"+grp,"");
						GM.set("JVN:Avert:"+grp,prec+content);
						GM.set("JVN:Avert:Psd:"+grp,av+GM.let("JVN:Avert:Psd:"+grp,0));
					}
				});
			}
			
							Debug.TimeStamp("InMess"," : Smileys");
			if (GM.let("JVN:Smileys",false)) { // Interactif
				Smiley.searchNewSmil(id+"_post",reponse["pseudo"]);
			}
			
							Debug.TimeStamp("InMess"," : Affichage");
			if (GM.let("JVN:Affichage",false)) {	// Interactif
				$("a",reponse["message"]).each(function(i) {
					href = this.href;
					new RegExp("^([^:/]+:/+[^/#]+)(/?[^#]*/)?([^/#]*)(#.*)?$").test(href);
					if (new RegExp("^http://(www|fr)\\.youtube\\.com/watch\\?(.*&)*v=([^&]+)&?.*$","gi").test(href)) {
						$(this).after(Create.Affichage.Youtube(RegExp.$3));
					}
					if (new RegExp("^http://www\\.dailymotion\\.com/.*/([^/_]+)_[^/]+","gi").test(href)) {
						$(this).after(Create.Affichage.Dailymotion(RegExp.$1));
					}
					if (new RegExp("^http://.*\\.(jpeg|jpg|png|gif|bmp)$","gi").test(href)) {
						$(this).after(Create.Affichage.DirectImage(href));
					}
				});
			}
			
							Debug.TimeStamp("InMess"," : Spoiler");
			if (GM.let("JVN:Spoiler",false)) {	// Interactif
				var a = $("img",reponse["message"]);
				a.each(function(i) {
					var spoil_src = "http://image.jeuxvideo.com/smileys_img/63.gif";
					if (this.src == spoil_src) {
						if ($(this.parentNode).attr("type") != "spoil") {
							var spoil_control = Create.Element("span");
							var span = Create.Element("span").css("display","inline");
							span.attr("type","spoil");
							span.attr("alt",":spoil:");
							var sib = Create.Image("",spoil_src,":spoiler:","","");
							var ntr = Create.Image("",spoil_src,":spoiler:","","");
							$(this).before(spoil_control);
							spoil_control.append(ntr.hide());
							spoil_control.append(sib.hide());
							spoil_control.after(span.hide());
							$(this).css("cursor","pointer");
							sib.css("cursor","pointer");
							$(sib).click(function() {
								$(this).hide();
								$(this.previousSibling).show();
								$(this.parentNode.nextSibling).hide("slow",function() {
									$(this.previousSibling.childNodes[0]).show();
									$(this.previousSibling.childNodes[1]).hide();
								});
							});
							$(this).click(function() {
								$(this).hide();
								$(this.nextSibling).show();
								$(this.parentNode.nextSibling).show("slow",function() {
									$(this.previousSibling.childNodes[1]).hide();
									$(this.previousSibling.childNodes[2]).show();
								});
							});
							var bool = true;
							while (bool) {
								sib = this.nextSibling;
								if (sib != null) {
									span.append(sib);
									if ((sib.tagName == 'IMG') && (sib.src == spoil_src)) {
										bool = false;
									}
								} else {
									bool = false;
								}
							}
							spoil_control.prepend(this);
						}
					}
				});
			}
			
							Debug.TimeStamp("InMess"," : Zephyr");
			if (GM.let("JVN:Secret:Zephyr",false)) {	// Interactif
				traduct = Create.Icone("Trad:Zeph-"+id,"css-puce-prec","[>]","Traduction Zephyrien > Français","");
				traduct.css("cursor","pointer");
				traduct.css("margin-right","3px");
				reponse["entete"].append(traduct);
				traduct.click(function() {
					id = this.id.split("-")[1];
					if (id != null) {
						post = document.getElementById(id+"_post");
						if (post!=null)
							Mess.Zephyr.Convert(post,Mess.Zephyr.Prec);
					}
				});
				
				convert = Create.Icone("Conv:Zeph-"+id,"css-puce-suiv","[<]","Traduction Français > Zephyrien","");
				convert.css("cursor","pointer");
				convert.css("margin-right","3px");
				reponse["entete"].append(convert);
				convert.click(function() {
					id = this.id.split("-")[1];
					if (id != null) {
						post = document.getElementById(id+"_post");
						if (post!=null)
							Mess.Zephyr.Convert(post,Mess.Zephyr.Suiv);
					}
				});
				
			}
			
							Debug.TimeStamp("InMess"," : Arme");
			if (modo && GM.let("JVN:Arme",false)) {
				reponse["entete"].prepend(Modo.Arme.aim(aimed,reponse["id"],htmlsave,!(reponse["id"].split("_")[1] == param[2])));
			}
			
							Debug.TimeStamp("InMess"," : Skin");
			if (GM.let("JVN:Secret:Skin:JVN:act",false)) { // SKIN
				Skin.JVN.message(reponse,kicked);
			}
							Debug.TimeStamp("InMess"," : Fin");
		}
	},
	Colonnes : function(liste,col,modo) {
		
		if ($("#style_ico_colonne").length == 0) {
			var style = ".ico_colonne {width:11px;}";
			Create.Style(style).attr("id","style_ico_colonne");
		}
		
		if (GM.let("JVN:Exclusion",false)) {
			var newcol = Create.Element("th");
			newcol.attr("scope","col");
			newcol.addClass("ico_colonne");
			newcol.text(" ");
			$("th:eq("+col["icone"]+")",liste).after(newcol);
			if (!(GM.let("JVN:Liste:Exclusion",false)))
				newcol.hide();
		}
		
		if ((GM.let("JVN:Censure",false)) && (GM.let("JVN:Kick",false)) && (GM.let("JVN:Properties:Kick:List",false))) {
			var newcol = Create.Element("th");
			newcol.attr("scope","col");
			newcol.addClass("ico_colonne");
			newcol.text(" ");
			$("th:eq("+col["icone"]+")",liste).after(newcol);
		}
		
		if (GM.let("JVN:Formulaire",false)) {
			var newcol = Create.Element("th");
			newcol.attr("scope","col");
			newcol.addClass("ico_colonne");
			newcol.text(" ");
			$("th:eq("+col["icone"]+")",liste).after(newcol);
		}
		
		if (modo && GM.let("JVN:Arme",false)) {
			var newcol = Create.Element("th");
			newcol.attr("scope","col");
			newcol.addClass("ico_colonne");
			newcol.text(" ");
			$(liste).prepend(newcol);
		}
		
	},
	Topic : function(sujet,col,modo,i) {
		var reponse = lecture.sujet(sujet,col,modo,i);
		var htmlsave = reponse["all"].html();
		
		var id = "topic_"+reponse["topic"];
		reponse["all"].attr("id",id);
		reponse["sujet"].attr("id",id+"_sujet");
		
		var groupe = Pseudonyme.groupe(reponse["pseudo"]);
		reponse["all"].attr("pseudo",reponse["pseudo"].toLowerCase());
		reponse["auteur"] = Pseudonyme.mode.replace(true,reponse["pseudo"],groupe,reponse["modo"],Pseudonyme.inGroupe(reponse["pseudo"]),reponse["auteur"]);
		
		var dateact = reponse["date"];
		if (GM.let("JVN:Fuseau",false))
			dateact.setMinutes(dateact.getMinutes()+GM.let("JVN:Fuseau:Horaire",0));
		var datepic = Const.DateInListe(dateact);
		if (GM.let("JVN:Fuseau",false)) {
			reponse["last"].text(datepic);
		}
		var no_modo_style = (!(reponse["modo"]) || (GM.let("JVN:Secret:NoModoProtect",false)));
		var aimed = false;
		
		if (GM.let("JVN:Last",false)) {
			href  = reponse["context"];
			href += reponse["mode"] + "-";
			href += reponse["forum"] + "-";
			href += reponse["topic"] + "-";
			href += (Math.floor(reponse["nombre"]/20)+1) + "-";
			href += reponse["k"] + "-";
			href += reponse["index"] + "-";
			href += reponse["search"] + "-";
			href += reponse["key"] + ".htm";
			a = Create.Element("a");
			a.append($("*",reponse["icone"]));
			reponse["icone"].append(a);
			a.attr("href",href);
		}
		
		if (GM.let("JVN:Exclusion",false)) {
			td = Create.Element("td");
			if (no_modo_style) {
				if (GM.let("JVN:Exclusion:"+groupe.toLowerCase(),false)) {
					if (GM.let("JVN:Arme:Exclus",false))
						aimed = true;
					var img_excl = Create.Icone("Excl-"+id,"greenX","[X]","Masquer le sujet",groupe.toLowerCase());
					img_excl.css("cursor","pointer");
					img_excl.click(function() {
						id = this.id.split("-")[1];
						Topic.Destroy(id);
					});
					
					reponse["all"].addClass("topic_exclu");
					
					if ($("#style_topic_exclu")) {
						style = ".topic_exclu {background-color:#000000 !important; color:#FFFFFF !important;}";
						Create.Style(style).attr("id","style_topic_exclu");
					}
					
					bloc = Exclusion.New(groupe);
					
					img_aff = Create.Icone("Visi-"+id,"profil","[?]","Afficher le topic du "+datepic,groupe.toLowerCase());
					img_aff.css("cursor","pointer");
					span = $("span",bloc);
					span.text(1+parseInt(span.text()));
					img_aff.css("margin","1px");
					$(bloc).append(img_aff);
					
					img_aff.click(function() {
						id = this.id.split("-")[1];
						Topic.Visible(id);
					});
					
					Topic.Destroy(id);
					
					if (modo && GM.let("JVN:Modo:Exclusion",false)) {
						Topic.Visible(id);
					}
					
				} else {
					img_excl = Create.Icone("Excl-"+id,"redX","[X]","Exclure "+groupe,groupe.toLowerCase());
					img_excl.css("cursor","pointer");
					img_excl.click(function() {
						check = confirm(this.title+" ?");
						if (check) {
							groupe = this.name;
							GM.set("JVN:Exclusion:"+groupe,true);
							Reload();
						}
					});
				}
				
				td.append(img_excl);
			}
			td.addClass("ico_colonne");
			reponse["icone"].after(td);
			if (!(GM.let("JVN:Liste:Exclusion",false)))
				td.hide();
		}
		
		if ((GM.let("JVN:Censure",false)) && (GM.let("JVN:Kick",false))) {
			cens  = "<span class='topic_censure'>";
			cens += "Ce sujet a été censuré, cliquez ";
			cens += "<a href='"+reponse["link"]+"'>ici</a>";
			cens += " pour y accéder";
			reponse["sujet"].attr("name",cens);
			
			if ($("#style_topic_censure").length == 0) {
				style  = ".topic_censure {font-style:italic; font-size:x-small; text-align:center; display:inline;}\n";
				style += ".topic_censure a {font-size:95%; display:inline !important;}\n";
				Create.Style(style).attr("id","style_topic_censure");
			}
			
			if (GM.let("JVN:Kick:"+groupe.toLowerCase(),false))
				Topic.Hide(id);
			
			if (GM.let("JVN:Properties:Kick:List",false)) {
				td = Create.Element("td");
				if (no_modo_style) {
					if (GM.let("JVN:Kick:"+groupe,false))
						img_kick = Create.Icone("Kick-"+id,"pinko","[O]","Dékicker "+groupe,groupe.toLowerCase());
					else
						img_kick = Create.Icone("Kick-"+id,"bluek","[K]","Kicker "+groupe,groupe.toLowerCase());
					
					img_kick.css("cursor","pointer");
					
					img_kick.click(function() {
						check = confirm(this.title+" ?");
						if (check) {
							groupemess = this.name;
							idmess = this.id.split("-")[1];
							Kick.make(groupemess,".tr1, .tr2",Topic.Hide,Topic.Show,null);
						}
					});
					
					td.append(img_kick);
				}
				td.addClass("ico_colonne");
				reponse["icone"].after(td);
			}
		}
		
		if (GM.let("JVN:Formulaire",false)) {
			var td = Create.Element("td");
			
			href  = reponse["context"];
			href += 3 + "-";
			href += reponse["forum"] + "-";
			href += reponse["topic"] + "-";
			href += (Math.floor(reponse["nombre"]/20)+1) + "-";
			href += reponse["k"] + "-";
			href += reponse["index"] + "-";
			href += reponse["search"] + "-";
			href += reponse["key"] + ".htm#form_post";
			
			a = Create.Element("a");
			a.css("text-align","center");
			a.attr("href",href);
			td.append(a);
			
			ico_closed = "http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif";
			pin_closed = "http://image.jeuxvideo.com/pics/forums/topic_marque_off.gif";
			if (reponse["type"] == ico_closed || reponse["type"] == pin_closed) {
				if (GM.let("JVN:Formulaire:Off",false)) {
					img = Create.Icone("","rep_off","{}","","");
					a.append(img);
				}
			} else {
				img = Create.Icone("","rep","[]","","");
				a.append(img);
			}
			
			td.addClass("ico_colonne");
			reponse["icone"].after(td);
		}
		
		if (modo && GM.let("JVN:Arme",false)) {
			var td = Create.Element("td");
			td.append(Modo.Arme.aim(aimed,id,htmlsave,true));
			reponse["all"].prepend(td);
		}
		
	}
}

var Modif = {
	Messages : function(forum,modo) {
		var msg = $(".msg");
		msg.each(function(i) {
							Debug.TimeStamp("	","Begin Mess : "+this.id);
			Retouche.Message(this,forum,modo);
							Debug.TimeStamp("	","End Mess : "+this.id);
		});
		
		if (GM.let("JVN:Secret:Multipage",false) && msg.length >= 20)
			Load.Page($(msg[msg.length-1]),modo,null,param[1],parseInt(param[2]),parseInt(param[3])+1,GM.let("JVN:Secret:Multipage:mode1",0));
		
		a = Create.Element("a");
		img = Create.Icone("","Titre-modo","","Marquer ce sujet comme sujet de modération","");
		img.css("cursor","pointer");
		img.click(function() {
			alert(0);
		});
		a.append(img);
		
		if (modo && GM.let("JVN:Arme:Auto",false)) {
			Modo.Arme.lock();
		}
						Debug.TimeStamp("	","Done Weap");
	},
	Topics : function(modo) {
		var col = lecture.colonnes(modo);
		
		var style = "#liste_topics a.ltopic {width:100% !important;}";
		Create.Style(style);
		
		var tpc = $("#liste_topics tr");
		tpc.each(function(i) {
			if (i == 0) {
								Debug.TimeStamp("	","Begin Column : ");
				Retouche.Colonnes(this,col,modo);
								Debug.TimeStamp("	","End Column : ");
			} else {
								Debug.TimeStamp("	","Begin Topic : "+i);
				Retouche.Topic(this,col,modo,i);
								Debug.TimeStamp("	","End Topic : "+i);
			}
		});
		
		if (GM.let("JVN:Secret:Multipage",false) && param[6] == "0" && tpc.length >= 25)
			Load.Page($(tpc[tpc.length-1]),modo,col,param[1],0,parseInt(param[5])+25,GM.let("JVN:Secret:Multipage:mode0",0));
		
		if (modo && GM.let("JVN:Arme:Auto",false)) {
			Modo.Arme.lock();
		}
		
	},
	Profil : function() {
		
		var psd = $("#pseudo");
		var modifiable = GM.let("JVN:Profil",false);
		if (modifiable && psd.length == 0 && GM.let("JVN:ProfilBanni",false)) {
			Create.Profil.New(param[0],param[3]+"/"+param[2]+"/"+param[1]);
		}
		var psd = $("#pseudo");
		if (psd.length > 0) {
			var reponse = lecture.profil();
			
			var groupe = Pseudonyme.groupe(reponse["pseudo"].toLowerCase());
			
			if (Pseudonyme.inGroupe(reponse["pseudo"])) {
				titre_pseudo = Pseudonyme.color.write(groupe)+"<span style='font-size:75%;'> en tant que </span>"+Pseudonyme.color.write(reponse["pseudo"]);
			} else {
				titre_pseudo = Pseudonyme.color.write(reponse["pseudo"]);
			}
			reponse["pseudonyme"].html('');
			if (reponse["mail"] != undefined && reponse["mail"] != "") {
				var a = Create.Element('a');
				a.attr("href",reponse["mail"]);
				a.html("<span id='pseudonyme'>"+titre_pseudo+"</span>");
				reponse["pseudonyme"].append(a);
				if($("#style_img_psd").length==0) {
					var style = "#pseudo img {vertical-align:middle;}";
					style += "\n #pseudo span {text-decoration:underline;}";
					Create.Style(style).attr("id","style_img_psd");
				}
			} else {
				reponse["pseudonyme"].append("<span id='pseudonyme'>"+titre_pseudo+"</span>");
			}
			if ($("#style_id_pseudonyme").length == 0) {
				px = 25;
				style  = "#pseudonyme {padding-right:"+px+"px;padding-left:"+px+"px;}\n";
				px = 2;
				style += "#pseudo img {padding-right:"+px+"px;padding-left:"+px+"px;}\n";
				Create.Style(style).attr("id","style_id_pseudonyme");
			}
			
			if (GM.let("JVN:Avert",false)) {
				avertissements = Math.max(0,GM.let("JVN:Avert:Psd:"+groupe.toLowerCase(),0));
				if (avertissements > 0 || GM.let("JVN:Avert:Still",false)) {
					max_avert = GM.let("JVN:Avert:Max",1000);
					ratio = Math.min(1,avertissements/max_avert);
					id = "nbavert";
					barre_avert = Create.Profil.Barre(id,"Nombre d'avertissements reçus : <span id='Avert_Value'>"+avertissements+"</span> / "+max_avert,"avertissement",12,Math.floor(46*ratio)*10,Icone("avert",1)).attr("pseudo",reponse["pseudo"]);
					reponse["nbpost"].after(barre_avert);
					Create.Style("#profil #"+id+" {background:#EFF4FC none repeat scroll 0 0;border:1px solid #78B1E1;font-size:120%;margin:7px auto;padding:5px;text-align:left;width:458px;}");
					if (ratio>=0.5)
						Create.Style("#profil #"+id+" strong {color:#FF0000;}");
					if (ratio>=0.9)
						Create.Style("#profil #"+id+" strong {text-decoration:blink;}");
					barre_avert.click(function() {
						groupe = Pseudonyme.groupe($(this).attr("pseudo"));
						liste_avert = window.open('about:blank','avertissements','toolbar=no,location=no,directories=no,status=no,scrollbars=yes,resizable=yes,copyhistory=no,width=520,height=570');
						
						style  = "#avert_general {text-align:left; font-size:120%; width:480px; margin-left:15px;}\n";
						style += ".val_avert {margin-left:30px;color:#FF0000;font-weight:bold;}\n";
						
						content  = 	"<html><head>";
						content += 	"<title>Avertissements de "+groupe+"</title>";
						content += 	"<link type=\"text/css\" rel=\"stylesheet\" href=\"/css/defaut/forums.css\"/>";
						content += 	"<style type=\"text/css\">"+style+"</style>";
						content += 	"</head><body>";
						content += 	"<div id='avert_general'>";
						content += 	GM.let("JVN:Avert:"+groupe.toLowerCase(),"");
						content += "</div>";
						content += "</body></html>";
						liste_avert.document.write(content);
						
						general = $("#avert_general",liste_avert.document.getElementsByTagName("html")[0]);
						avert_maj = 0;
						$(".val_avert",general).each(function(i) {
							$(this).css("cursor","pointer");
							$(this).attr("title","Modifier la valeur de l'alerte");
							avert_maj += parseInt($(this).text());
							$(this).click(function() {
								val = parseInt($(this).text());
								av = liste_avert.prompt("Quel degré d'avertissement poser ? (0 : suppression de 'avertissement)\n(actuel : "+val+" / "+GM.let("JVN:Avert:Max",1000)+")",val);
								av = parseInt(av);
								if (av!=null && !(isNaN(av))) {
									newAvertval = GM.let("JVN:Avert:Psd:"+groupe.toLowerCase(),0)-val+av;
									GM.set("JVN:Avert:Psd:"+groupe.toLowerCase(),newAvertval);
									$("#Avert_Value").text(Math.max(0,newAvertval));
									if (av == 0) {
										$(this.parentNode.parentNode.parentNode).remove();
										GM.del("JVN:Avert:Psd:"+groupe.toLowerCase());
									} else {
										$(this).text(av)
									}
									cr = general.html();
									if (cr != "")
										GM.set("JVN:Avert:"+groupe.toLowerCase(),cr);
									else {
										GM.del("JVN:Avert:"+groupe.toLowerCase());
										liste_avert.close();
									}
								}
							});
						});
						GM.set("JVN:Avert:Psd:"+groupe.toLowerCase(),avert_maj);
					});
				}
			}
			
			if (GM.let("JVN:Mode",false)) {
				// img = Create.Image("Mode-"+reponse["pseudo"].toLowerCase(),Icone("yellowE"),"[E]","Editer le mode d'affichage de "+reponse["pseudo"],"");
				// img.css("cursor","pointer");
				// img.css("margin","1px");
				// reponse["pseudonyme"].prepend(img);
				// img.click(function() {
					// alert("non implemented");
				// });
			}
			
			if (GM.let("JVN:Couleur",false)) {
				img = Create.Icone("Color-"+reponse["pseudo"].toLowerCase(),"citer","[C]","Colorer "+reponse["pseudo"],reponse["pseudo"]);
				img.css("cursor","pointer");
				img.css("margin","1px");
				reponse["pseudonyme"].prepend(img);
				img.click(function() {
					color = Create.ColorPicker(GM.get("JVN:Couleur:"+this.name.toLowerCase()),this.name);
				});
			}
			
			if (GM.let("JVN:Groupement",false)) {
				img = Create.Icone("Grouper|"+reponse["pseudo"],"blueG","[G]","Grouper "+reponse["pseudo"],groupe);
				img.css("cursor","pointer");
				img.css("margin","1px");
				reponse["pseudonyme"].prepend(img);
				img.click(function() {
					pseudo = this.id.split("|")[1];
					groupe = "";
					if (Pseudonyme.inGroupe(pseudo))
						groupe = this.name;
					newgroupe = prompt("Placer "+pseudo+" dans quel groupement de pseudonymes ?",groupe);
					if (newgroupe != null) {
						Pseudonyme.makeGroupe(pseudo,newgroupe);
						if (newgroupe == "") {
							$("#pseudonyme").html(Pseudonyme.color.write(pseudo));
							newgroupe = Pseudonyme.groupe(pseudo);
							$("#Rename-"+groupe).hide();
							$("#Color-"+groupe).hide();
						} else {
							$("#pseudonyme").html(Pseudonyme.color.write(newgroupe)+"<span style='font-size:75%;'> en tant que </span>"+Pseudonyme.color.write(pseudo));
							$("#Rename-"+groupe).show();
							if (GM.let("JVN:Couleur",false))
								$("#Color-"+groupe).show();
						}
						this.name = newgroupe;
						$("#Rename-"+groupe).attr("id","Rename-"+newgroupe).attr("title","Renommer le groupement "+newgroupe);
						$("#Color-"+groupe).attr("id","Color-"+newgroupe).attr("title","Colorer le groupement "+newgroupe);
					}
				});
				
				img_rename = Create.Icone("Rename-"+groupe,"purpler","[R]","Renommer le groupement "+groupe,reponse["pseudo"]);
				img_rename.css("cursor","pointer");
				img_rename.css("margin","1px");
				reponse["pseudonyme"].append(img_rename);
				img_rename.hide();
				img_rename.click(function() {
					pseudo = this.name;
					groupe = this.id.split("-");
					groupe.shift();
					groupe.join("-");
					newgroupe = prompt(this.title+" ?",groupe);
					if (newgroupe != null) {
						Pseudonyme.renameGroupe(groupe,newgroupe);
						if (newgroupe == "") {
							$("#pseudonyme").html(Pseudonyme.color.write(pseudo));
							newgroupe = Pseudonyme.groupe(pseudo);
							$("#Rename-"+groupe).hide();
							$("#Color-"+groupe).hide();
						} else {
							$("#pseudonyme").html(Pseudonyme.color.write(newgroupe)+"<span style='font-size:75%;'> en tant que </span>"+Pseudonyme.color.write(pseudo));
							$("#Rename-"+groupe).show();
							if (GM.let("JVN:Couleur",false))
								$("#Color-"+groupe).show();
						}
						this.name = newgroupe;
						$("#Rename-"+groupe).attr("id","Rename-"+newgroupe).attr("title","Renommer le groupement "+newgroupe);
						$("#Color-"+groupe).attr("id","Color-"+newgroupe).attr("title","Colorer le groupement "+newgroupe);
					}
				});
				
				img_color_group = Create.Icone("Color-"+groupe,"grayc","[C]","Colorer le groupement "+groupe,reponse["pseudo"]);
				img_color_group.css("cursor","pointer");
				img_color_group.css("margin","1px");
				reponse["pseudonyme"].append(img_color_group);
				img_color_group.hide();
				img_color_group.click(function() {
					groupe = Pseudonyme.groupe(this.name);
					color = Create.ColorPicker(GM.get("JVN:Couleur:"+groupe.toLowerCase()),groupe);
				});
				
				if (Pseudonyme.inGroupe(reponse["pseudo"])) {
					img_rename.show();
					if (GM.let("JVN:Couleur",false)) {
						img_color_group.show();
					}
				}
			}
			
			if (modifiable) {
				
				if (GM.let("JVN:Ratio",false)) {
					reponse["tab"].append(Create.Profil.Info("Ratio",(reponse["messages"]/(1+reponse["anciennete"])).toFixed(2)+" mess/jour"));
				}
				
				if (GM.let("JVN:AvatarClickable",false)) {
					Avatar.clickable(reponse["avatar"],reponse["pseudo"]);
				}
				
				if (GM.let("JVN:Smileys:CDV",false)) {
					Smiley.searchAllSmil(reponse["cdv"].attr("id"),reponse["pseudo"]);
				}
				
			}
			
			{
				Const.constantProfil(reponse["pseudo"],reponse["avatar"],reponse["cdv"])
			}
			
		}
		
		if (GM.let("JVN:Secret:Skin:JVN:act",false)) { // SKIN
			Skin.JVN.profil(reponse);
		}
	}
	
}



				Debug.TimeStamp("","Begin of Script");
MaJ();

				Debug.TimeStamp("End"," MaJ - Begin Parse");

var mode = undefined;
var param = new Array();
var context = new Array();
idb = "JVN_block";//+"_Beta";
if ($("#"+idb).length == 0) {
	$("body").prepend("<input id='"+idb+"' type='hidden'></input>");
	var url = self.location.href;
	context = new Array();
	
	if (new RegExp("www\\.jeuxvideo\\.com/cgi-bin/jvforums/forums\\.cgi\\.?h?t?m?l?","gi").test(url)) {mode = "aperçu";}
	if (new RegExp("www\\.jeuxvideo\\.com/cgi-bin/jvforums/forums_profil\\.cgi\\.?[0-9]*\\.?h?t?m?l?\\?pxo=([^&]+)&dxo=([0-9]{4})\\-([0-9]{2})\\-([0-9]{2})&k=(.*)","gi").test(url)) {
		mode = "profil";
		param.push(RegExp.$1);
		param.push(RegExp.$2);
		param.push(RegExp.$3);
		param.push(RegExp.$4);
		param.push(RegExp.$5);
	}
	if (new RegExp("www\\.jeuxvideo\\.com/cgi-bin/jvforums/avertir_moderateur\\.cgi\\.?h?t?m?l?\\?mode=([0-9]+)&forum=([0-9]+)&topic=([0-9]+)&numero=([0-9]+)&page=([0-9]+)&k=([a-zA-Z0-9]+)","gi").test(url)) {
		mode = "avertir";
		param.push(parseInt(RegExp.$1));
		param.push(RegExp.$2);
		param.push(RegExp.$3);
		param.push(RegExp.$4);
		param.push(RegExp.$5);
		param.push(RegExp.$6);
	}
	if (new RegExp("www\\.jeuxvideo\\.com/smileys/legende\\.htm","gi").test(url)) {mode = "legende";}
	if (new RegExp("www\\.jeuxvideo\\.com/cgi-bin/admin/moncompte\\.cgi\\.?h?t?m?l?(.*)","gi").test(url)) {mode = "compte"; param.push(RegExp.$1); }
	if (new RegExp("www\\.jeuxvideo\\.com/cgi-bin/jvforums/moderation\\.cgi\\.?h?t?m?l?","gi").test(url)) {mode = "moderation";}
	if (new RegExp("forums_inex\\.htm","gi").test(url)) {mode = "inexistant";}
	if (new RegExp("www\\.jeuxvideo\\.com/cgi-bin/jvforums/kick_user\\.cgi\\.?h?t?m?l?\\?forum=([0-9]+)&topic=([0-9]+)&numero=([0-9]+)&page=([0-9]+)&k=([a-zA-Z0-9]+)","gi").test(url)) {
		mode = "kick";
		param.push(RegExp.$1);
		param.push(RegExp.$2);
		param.push(RegExp.$3);
		param.push(RegExp.$4);
		param.push(RegExp.$5);
	}
	if (new RegExp("www\\.jeuxvideo\\.com/avatars/view_avatar\\.htm\\?p=([^&]*)&url=(.*)","gi").test(url)) {mode = "avatar"; param.push(RegExp.$1);param.push(RegExp.$2); }
	if (new RegExp("www\\.jeuxvideo\\.com/forums/([0-9]+)\\-JVN\\-([^-]+)\\-([^-]+)\\-([^-]+)\\-([^-]+)\\-([^-]+)\\-(.+)\\.htm#?(.*)").test(url)) {
		mode = "Nyu";
		param.push(RegExp.$1);
		param.push(RegExp.$2);
		param.push(RegExp.$3);
		param.push(RegExp.$4);
		param.push(RegExp.$5);
		param.push(RegExp.$6);
		param.push(RegExp.$7);
		param.push(RegExp.$8);
	}
	if (new RegExp("www\\.jeuxvideo\\.com/forums/([0-9]+)\\-([0-9]+)\\-([^-]*)\\-([^-]*)\\-([^-]*)\\-([^-]*)\\-([^-]*)\\-(.*)\\.htm#?(.*)").test(url)) {
		mode = parseInt(RegExp.$1);
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
	
	context.push(RegExp.leftContext);
	context.push(RegExp.lastMatch);
	context.push(RegExp.rightContext);
}
				Debug.TimeStamp("End"," Parse - Begin Menu");

if (mode!=undefined) {

	menu = $("#menu_interactif");
	if (menu.length > 0) {
		Create.Menu2.NewItem("J.V.Nyu V1.1",context[0]+"www.jeuxvideo.com/forums/"+"0-JVN-0-0-0-0-0-0.htm",menu);
	}

					Debug.TimeStamp("End"," Menu - Begin Skin");

	skin = $("#select_skin");
	if (skin.length > 0 && GM.let("JVN:Secret:Skin",false)) {
		$("#select_skin img").click(function() {
			GM.del("JVN:Skin");
			$("#skin_loaded").attr("href","http://www.jeuxvideo.com/css/defaut/forums.css");
		});
		for (i=0;i<Const.machine.length;i++) {
			img = Create.Icone("skin-"+Const.machine[i],"skin-select-"+Const.machine[i],"Sélectionner la skin "+Const.machine[i],"","");
			onclick = document.createAttribute("onclick");
			onclick.nodeValue = "return switch_bleu();";
			img[0].setAttributeNode(onclick);
			img = $(img);
			skin.append(img);
			img.click(function() {
				name = this.id.split("-")[1];
				Skin.console(name);
			});
		}
		skin_name = GM.get("JVN:Skin");
		if (skin_name != "") Skin.console(skin_name);
	}

	if (GM.let("JVN:Secret:Skin:Multicolor",false)) {
		style  = 		"#menu_mc li a {background-position:left bottom !important;}";
		style += "\n"+	"#menu_mc a:hover {background-position:left top !important;}";
		Create.Style(style);
	} else {
		style  = 		"#menu_mc li a {background-position:left top !important;}";
		style += "\n"+	"#menu_mc a:hover {background-position:left bottom !important;}";
		Create.Style(style);
	}

	if (skin.length > 0 && GM.let("JVN:Secret:Skin:JVN",false)) {
		img = Create.Icone("","skin-select-noir","","Sélectionner la skin J.V.N.","");
		skin.append(img);
		img.click(function() {
			if (GM.let("JVN:Secret:Skin:JVN:act",false)) {
				GM.del("JVN:Secret:Skin:JVN:act");
			} else {
				GM.set("JVN:Secret:Skin:JVN:act",true);
			}
			Reload();
		});
	}

					Debug.TimeStamp("End"," Skin - Begin Mega Switch");

	switch(mode) {
		case 0 : {
			if (GM.let("JVN:Liste",false))
				Disconnect();
							Debug.TimeStamp("Done"," Disconnect");
			
			if (GM.let("JVN:Préférences",false))
				Preferences.Init();
							Debug.TimeStamp("Done"," Pref");
			
			if (GM.let("JVN:Statistiques",false))
				$("a",Create.Menu2.NewItem("Statistiques","http://jvstats.planet-shitfliez.net/stats/inflate.php?num="+param[1],$("#menu_interactif"))).attr("target","_blank");
							Debug.TimeStamp("Done"," Stats");
			
			var modo = Modo.Menu();
							Debug.TimeStamp("Done"," Modo");
			
			Modif.Topics(modo);
							Debug.TimeStamp("Done"," Topics");
			
			if (GM.let("JVN:Liste",false)) {
				last = "last";
				id = "select_psd";
				if (GM.let("JVN:Remind",false)) {
					a_last = Create.Element('a');
					img = Create.Icone("","purpler","[R]","Définir ce pseudonyme comme pseudonyme par défaut sur ce forum","");
					img.attr("select",id);
					img.attr("forum",param[1]);
					a_last.append(img);
					a_last.css("margin-left","3px");
					a_last.css("cursor","pointer");
					img.click(function() {
						check = confirm(this.title+" ?");
						if (check) {
							select = $("#"+$(this).attr("select"));
							forum = $(this).attr("forum");
							i = select[0].selectedIndex-1;
							if (i < 0) {
								GM.del("JVN:Remind:"+forum+":liste");
							} else {
								GM.set("JVN:Remind:"+forum+":liste",i);
							}
						}
					});
					last = GM.let("JVN:Remind:"+param[1]+":liste",last);
				}
				cnct = Connecteur.Pseudo(id,"newnom","mdpasse",".retenir_id","",last);
				$(".login").before(cnct);
				if (GM.let("JVN:Remind",false))
					cnct.append(a_last);
			}
							Debug.TimeStamp("Done"," Liste");
			
			Signature.Apply("post","newnom","newmessage");
							Debug.TimeStamp("Done"," Sig");
			
			if (GM.let("JVN:Citations",false))
				Mess.applyCit($("#newmessage"));
							Debug.TimeStamp("Done"," Cit");
			
			Image.apply();
							Debug.TimeStamp("Done"," Img");
			break;
		}
		case 1 : {
			if (GM.let("JVN:Liste",false))
				Disconnect();
							Debug.TimeStamp("Done"," Disconnect");
			
			if (GM.let("JVN:Préférences",false))
				Preferences.Init();
							Debug.TimeStamp("Done"," Pref");
			
			if (GM.let("JVN:Statistiques",false))
				$("a",Create.Menu2.NewItem("Statistiques","http://jvstats.planet-shitfliez.net/stats/inflate.php?num="+param[1],$("#menu_interactif"))).attr("target","_blank");
							Debug.TimeStamp("Done"," Stats");
			
			if (GM.let("JVN:LienPerm",false)) {
				if (new RegExp("^message_[0-9]+$").test(param[8])) {
					
					msg = $("#"+param[8]);
					msg.removeClass("msg1");
					msg.removeClass("msg2");
					msg.addClass("msg3");
					
					if ($("#style_lien_perm").length == 0) {
						style = ".msg3 {background-color:#EECCCC;border:3px solid #DDBBBB;}";
						Create.Style(style).attr("id","style_lien_perm");
					}
				}
			}
							Debug.TimeStamp("Done"," Lien Perm");
			
			var modo = Modo.Menu();
			
			Modif.Messages(param[1],modo);
							Debug.TimeStamp("Done"," Mess");
			
			if (GM.let("JVN:Retour",false))
				BackToFirstPage()	;
							Debug.TimeStamp("Done"," Back");
			
			Image.apply();
							Debug.TimeStamp("Done"," Img");
			break;
		}
		case 3 : {
			if (GM.let("JVN:Liste",false))
				Disconnect();
			
			if (GM.let("JVN:Préférences",false))
				Preferences.Init();
			if (GM.let("JVN:Statistiques",false))
				$("a",Create.Menu2.NewItem("Statistiques","http://jvstats.planet-shitfliez.net/stats/inflate.php?num="+param[1],$("#menu_interactif"))).attr("target","_blank");
			
			
			var modo = Modo.Menu();
			
			Modif.Messages(param[1],modo);
			
			if (GM.let("JVN:Retour",false))
				BackToFirstPage();
			if (GM.let("JVN:Liste",false)) {
				var last = "last";
				var id = "select_psd";
				if (GM.let("JVN:Remind",false)) {
					var a_last = Create.Element('a');
					var img = Create.Icone("","purpler","[R]","Définir ce pseudonyme comme pseudonyme par défaut sur ce sujet","");
					img.attr("select",id);
					img.attr("forum",param[1]);
					img.attr("topic",param[2]);
					a_last.append(img);
					a_last.css("margin-left","3px");
					a_last.css("cursor","pointer");
					img.click(function() {
						check = confirm(this.title+" ?");
						if (check) {
							var select = $("#"+$(this).attr("select"));
							var forum = $(this).attr("forum");
							var topic = $(this).attr("topic");
							var i = select[0].selectedIndex-1;
							if (i < 0) {
								GM.del("JVN:Remind:"+forum+":"+topic);
							} else {
								GM.set("JVN:Remind:"+forum+":"+topic,i);
							}
						}
					});
					last = GM.let("JVN:Remind:"+param[1]+":"+param[2],GM.let("JVN:Remind:"+param[1]+":liste",last));
				}
				var cnct = Connecteur.Pseudo(id,"newnom","mdpasse",".retenir_id","",last);
				$(".login").before(cnct);
				if (GM.let("JVN:Remind",false))
					cnct.append(a_last);
			}
			
			Signature.Apply("post","newnom","newmessage");
			
			if (GM.let("JVN:Citations",false))
				Mess.applyCit($("#newmessage"));
			Image.apply();
			break;
		}
		case "aperçu" : {
			$(".msg").each(function(i) {
				this.id = "message_0";
				Retouche.Message(this,0,false);
			});
			break;
		}
		case "profil" : {
			Modif.Profil();
			
			Image.apply();
			break;
		}
		case "avertir" : {
			if (GM.let("JVN:Liste",false)) {
				cnct = Connecteur.Pseudo("select_psd","pseudo","pass","","",0);
				$("#pseudo").parent().before(cnct);
			}
			
			Image.apply();
			break;
		}
		case "legende" : {
			key = "JVN:Smileys";
			if (GM.let(key,false)) {
				last = $("tbody tr:last-child");
				if (last.attr("class") == "tr1") c=1; else c=0;
				n = GM.let(key+":n",0);
				for (i=0;i<(n/4);i++) {
					tr = Create.Element('tr');
					tr.addClass('tr'+(c+1));
					last.after(tr);
					last = tr;
					c = 1-c;
					for (j=0;j<4;j++) {
						rf = GM.get(key+":rf-:"+(i*4+j));
						cd = GM.let(key+":cd-:"+(i*4+j));
						td = Create.Element('td');
						if (rf!="" && cd!="") {
							a = Create.Element('a');
							a.attr('href','javascript:passCode("newmessage","'+cd+'");');
							a.append(Create.Image("",rf,"","",""));
							td.append(a);
						}
						tr.append(td);
						td = Create.Element('td');
						if (rf!="" && cd!="")
							td.text(cd);
						tr.append(td);
					}
				}
			}
			
			Image.apply();
			break;
		}
		case "compte" : {
			
			Image.apply();
			break;
		}
		case "moderation" : {
			if (GM.let("JVN:Préférences",false))
				Preferences.Init();
			if (GM.let("JVN:Liste",false)) {
				cnct = Connecteur.Modo("select_psd","pseudo","mot_passe","mail","mot_passe_moder","");
				$("#pseudo").parent().parent().before(cnct);
			}
			
			Image.apply();
			break;
		}
		case "inexistant" : {
			if (GM.let("JVN:Préférences",false))
				Preferences.Init();
			
			Image.apply();
			break;
		}
		case "kick" : {
			
			Image.apply();
			break;
		}
		case "avatar" : {
			
			Image.apply();
			break;
		}
		case "Nyu" : {
			if (GM.let("JVN:Préférences",false))
				Preferences.Init();
			
			titre_menu = "JeuxVideo.Nyu v1.1";
			
			{
				act = (param[0] == "0");
				Create.NyuMenu.Init(titre_menu);
				
				str = "General";
				menu = Create.NyuMenu.NewBloc(str,"Menu_"+str.toLowerCase(),Icone("Menu-"+str.toLowerCase(),1));
				Create.NyuMenu.NewItem("Censure","Activer les censures","JVN:Censure",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-censurer-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Exclusion","Activer les exclusions","JVN:Exclusion",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-exclure-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Images","Activer les changements d'images","JVN:Images",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-images-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Smileys","Activer les changements relatifs aux smileys","JVN:Smileys",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-smileys-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Préférences","Activer le menu de préférences personnalisé","JVN:Préférences",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-preference-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Fuseau horaire","Activer le changement de fuseau horaire","JVN:Fuseau",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-horaire-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Statistiques","Activer le lien vers les statistiques de Fremen","JVN:Statistiques",null,menu,act);
				Create.NyuMenu.NewItem("Arme","Activer l'arme de modération","JVN:Arme",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-arme-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.SecretEffect(null,"Skin","Activer l'accès aux options de Skin","JVN:Secret:SkinJVN",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-skin-0-0-0-0-0.htm",menu,act);
				sort("#Menu_"+str.toLowerCase()+" ul",null);
				
				str = "Messages";
				menu = Create.NyuMenu.NewBloc(str,"Menu_"+str.toLowerCase(),Icone("Menu-"+str.toLowerCase(),1));
				Create.NyuMenu.NewItem("Citations","Activer les citations","JVN:Citations",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-citer-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Protections","Activer les protections","JVN:Protections",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-protection-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Affichage","Activer l'affichage direct des images et vidéos","JVN:Affichage",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-affichage-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Spoiler","Activer les balises spoiler","JVN:Spoiler",null,menu,act);
				Create.NyuMenu.NewItem("Retour","Activer le retour automatique en première page","JVN:Retour",null,menu,act);
				Create.NyuMenu.NewItem("Retour","Mettre en valeur les liens permanents","JVN:LienPerm",null,menu,act);
				sort("#Menu_"+str.toLowerCase()+" ul",null);
				
				str = "Topics";
				menu = Create.NyuMenu.NewBloc(str,"Menu_"+str.toLowerCase(),Icone("Menu-"+str.toLowerCase(),1));
				Create.NyuMenu.NewItem("Dernière page","Activer le lien vers la dernière page","JVN:Last",null,menu,act);
				Create.NyuMenu.NewItem("Formulaire","Activer le lien vers le formulaire de post","JVN:Formulaire",null,menu,act);
				sort("#Menu_"+str.toLowerCase()+" ul",null);
				
				str = "Profil";
				menu = Create.NyuMenu.NewBloc(str,"Menu_"+str.toLowerCase(),Icone("Menu-"+str.toLowerCase(),1));
				Create.NyuMenu.NewItem("Groupement","Activer les groupements de pseudonymes","JVN:Groupement",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-groupe-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Couleur","Activer la coloration des pseudonymes","JVN:Couleur",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-couleur-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Affichage","Activer les affichages personalisés de pseudonymes","JVN:Mode",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-mode-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Profil","Créer des profils personnalisés","JVN:Profil",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-profil-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Avertissement","Activer les avertissements de pseudonymes","JVN:Avert",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-avertissement-0-0-0-0-0.htm",menu,act);
				sort("#Menu_"+str.toLowerCase()+" ul",null);
				
				str = "Pseudonyme";
				menu = Create.NyuMenu.NewBloc(str,"Menu_"+str.toLowerCase(),Icone("Menu-"+str.toLowerCase(),1));
				Create.NyuMenu.NewItem("Liste","Activer la liste de pseudonymes","JVN:Liste",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-liste-0-0-0-0-0.htm",menu,act);
				Create.NyuMenu.NewItem("Signature","Activer les signatures","JVN:Signature",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-sign-0-0-0-0-0.htm",menu,act);
				sort("#Menu_"+str.toLowerCase()+" ul",null);
				
				if (GM.let("JVN:Secret:Access",false)) {
					str = "Secrets";
					menu = Create.NyuMenu.NewBloc(str,"Menu_"+str.toLowerCase(),Icone("Menu-"+str.toLowerCase(),1));
					Create.NyuMenu.SecretEffect(null,"Secrets","Activer l'accès aux options secrètes","JVN:Secret:Access",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-secrets-0-0-0-0-0.htm",menu,act);
				}
				
			}
			
			switch(param[0]) {
				case "0" : {
					break;
				}
				case "1" : {
					title = Create.Col1.Vide();
					switch(param[1]) {
						case "images" : {
							titre_menu += " : Options de remplacement d'images";
							menu = Create.Col1.NewBloc("Images");
							Create.Col1.NewItem("Images","Activer les changements d'images","JVN:Images",null,menu);
							
							key = "JVN:Img";
							
							id = "liste-smileys";
							tab = Create.Col1.Liste(id,"Liste des smileys","");
							list = GM.lis();
							line = Create.Col1.NewLine(tab);
							line.append(Create.Element('th'));
							line.append(Create.Element('th').text('origine'));
							line.append(Create.Element('th').text('nouvelle'));
							n = list.length;
							txt = "";
							l=0;
							for (i=0;i<n;i++) {
								if (new RegExp("^JVN:Img:(.*)$").test(list[i])) {
									ori = RegExp.$1;
									fin = GM.get("JVN:Img:"+ori);
									if (ori!=fin) {
										line = Create.Col1.NewLine(tab);
										Image.newLine(line,ori);
										txt += ori+"##"+fin+"\n";
										l++;
									}
								}
							}
							txt = txt.substr(0,txt.length-1);
							
							id = "new_img";
							tab = Create.Col1.Liste("new-image","Creer un nouveau regroupement","");
							line = Create.Col1.NewLine(tab);
							line.append(Create.Element('td').text(' '));
							line.append(Create.Element('td').text('Url d\'origine'));
							line.append(Create.Element('td').text('Url modifiée'));
							valid = Create.Element('input').attr("id",id).attr("type","button").attr("tab","liste-smileys").val('Valider');
							
							orign = Create.Element('input').attr("id",id+"-ori");
							newim = Create.Element('input').attr("id",id+"-fin");
							
							line = Create.Col1.NewLine(tab).css("width","95%");
							line.append(Create.Element('td').append(valid));
							line.append(Create.Element('td').append(orign));
							line.append(Create.Element('td').append(newim));
							
							valid.click(function() {
								check = confirm("Ajouter ce smiley ?");
								if (check) {
									id = this.id;
									ori = $("#"+id+"-ori").val();
									fin = $("#"+id+"-fin").val();
									$("#"+id+"-ori").val('');
									$("#"+id+"-fin").val('');
									GM.set("JVN:Img:"+ori,fin);
									tab = $(this).attr("tab");
									line = Create.Col1.NewLine($("#"+tab));
									Image.newLine(line,ori);
								}
							});
							
							if (GM.let("JVN:Secret:DebugMode",false)) {
								titre_tab = "Liste des images";
								legend = "Liste des regroupements d'images \"url_original##url_modifié\"";
								
								tab = Create.Col1.Tableau("image_debug",titre_tab,legend,txt,Math.min(Math.floor((l+1)*3/2-1/2),n+5)).attr("key",key);
								but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour la liste des smileys",function() {
									check = confirm(this.title+" ?");
									if (check) {
										id = this.id.split("-")[1];
										tab = $("#"+id);
										key = tab.attr("key");
										if (tab.length > 0) {
											list = tab.val().split("\n");
											lis = GM.lis();
											n = lis.length;
											for (k=0;k<n;k++) {
												if (new RegExp("^JVN:Img:(.*)$").test(lis[k]))
													GM.del(lis[k]);
											}
											n = list.length;
											for (k=0;k<n;k++) {
												fin = list[k].split("##");
												ori = fin.shift();
												fin = fin.join("##");
												if (ori!=fin)
													GM.set("JVN:Img:"+ori,fin);
											}
										}
									}
								});
								
								tab.keyup(function(e) {
									n = $(this).val().split("\n").length;
									$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
								});
							}
							
							
							break;
						}
						case "smileys" : {
							titre_menu += " : Options des smileys";
							menu = Create.Col1.NewBloc("Smileys");
							Create.Col1.NewItem("Smileys","Activer les changements relatifs aux smileys","JVN:Smileys",null,menu);
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("Smileys","Activer les smileys dans les CDV","JVN:Smileys:CDV",null,menu);
							Create.Col1.SecretEffect("JVN:Secret:SmilToCode","Code","Activer le remplacement d'une chaîne de caractère par du code HTML","JVN:Smileys:Code",null,menu);
							
							key = "JVN:Smileys";
							
							id = "liste-smileys";
							tab = Create.Col1.Liste(id,"Liste des smileys","");
							
							n = GM.let(key+":n",0);
							line = Create.Col1.NewLine(tab);
							line.append(Create.Element('th'));
							line.append(Create.Element('th').text('code'));
							line.append(Create.Element('th').text('smiley'));
							for (i=0;i<n;i++) {
								line = Create.Col1.NewLine(tab);
								Smiley.newLine(line,key,i);
							}
							
							tab = Create.Col1.Liste("new-smiley","Creer un nouveau smiley","");
							line = Create.Col1.NewLine(tab);
							line.append(Create.Element('td').text(' '));
							line.append(Create.Element('td').text('Code du smiley'));
							line.append(Create.Element('td').text('URL du smiley'));
							smil_vd = Create.Element('input').attr("id","new_smil").attr("type","button").attr("tab","liste-smileys").attr("key",key).val('Valider');
							smil_cd = Create.Element('input').attr("id","new_smil-cd");
							smil_rf = Create.Element('input').attr("id","new_smil-rf").css("width","95%");
							line = Create.Col1.NewLine(tab).css("width","95%");
							line.append(Create.Element('td').append(smil_vd));
							line.append(Create.Element('td').append(smil_cd));
							line.append(Create.Element('td').append(smil_rf).css("width","100%"));
							
							smil_vd.click(function() {
								check = confirm("Ajouter ce smiley ?");
								if (check) {
									id = this.id;
									cd = $("#"+id+"-cd").val();
									rf = $("#"+id+"-rf").val();
									if (cd!="" && rf!="") {
										$("#"+id+"-cd").val('');
										$("#"+id+"-rf").val('');
										n = Smiley.newSmiley(rf,cd);
										tab = $(this).attr("tab");
										key = $(this).attr("key");
										line = Create.Col1.NewLine($("#"+tab));
										Smiley.newLine(line,key,n);
									}
								}
							});
							
							if (GM.let("JVN:Secret:DebugMode",false)) {
								titre_tab = "Liste des smileys";
								
								n = GM.let(key+":n",0);
								txt = "";
								for (k=0;k<n;k++)
									txt += GM.get(key+":cd-:"+k)+"<>"+GM.get(key+":rf-:"+k)+"\n\n\n\n\n\n\n";
								txt = txt.substring(0,txt.length-1);
								
								legend = "";
								
								tab = Create.Col1.Tableau("smiley-debug",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5)).attr("key",key);
								but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour la liste des smileys",function() {
								check = confirm(this.title+" ?");
									if (check) {
										id = this.id.split("-")[1];
										tab = $("#"+id);
										key = tab.attr("key");
										if (tab.length > 0) {
											list = tab.val().split("\n");
											GM.unl(key+":n");
											n = GM.let(key+":n",0);
											for (k=0;k<n;k++)
												GM.del(key+":"+k);
											GM.del(key+":n");
											for (k=0;k<list.length;k++) {
												str = list[k].split("<>");
												html = str.pop();
												str = str.join("<>");
												if (html != "" && str != "")
													Smiley.newSmiley(html,str);
											}
										}
									}
								});
								
								tab.keyup(function(e) {
									n = $(this).val().split("\n").length;
									$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
								});
							}
							
							if (GM.let("JVN:Secret:SmilToCode",false)) {
								key = key +":Code";
								titre_tab = "Liste des codes HTML intégrés";
								
								n = GM.let(key+":n",0);
								txt = "";
								for (k=0;k<n;k++)
									txt += GM.get(key+":cd-:"+k)+"<>"+GM.get(key+":rf-:"+k)+"\n";
								txt = txt.substring(0,txt.length-1);
								
								legend = "Liste des codes HTML : \"str<>html\" où str est la chaine à remplacer et html le code";
								
								tab = Create.Col1.Tableau("protections",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5)).attr("key",key);
								but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour la liste des codes html intégrés",function() {
									check = confirm(this.title+" ?");
									if (check) {
										id = this.id.split("-")[1];
										tab = $("#"+id);
										key = tab.attr("key");
										if (tab.length > 0) {
											list = tab.val().split("\n");
											GM.unl(key+":n");
											n = GM.let(key+":n",0);
											for (k=0;k<n;k++) {
												GM.del(key+":cd-:"+k);
												GM.del(key+":rf-:"+k);
											}
											GM.del(key+":n");
											for (k=0;k<list.length;k++) {
												str = list[k].split("<>");
												html = str.pop();
												str = str.join("<>");
												if (html != "" && str != "")
													Smiley.newCode(key,html,str);
											}
										}
									}
								});
								
								tab.keyup(function(e) {
									n = $(this).val().split("\n").length;
									$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
								});
							}
							
							break;
						}
						case "preference" : {
							titre_menu += " : Options de la liste des préférences";
							menu = Create.Col1.NewBloc("Liste des préférencces personnalisée");
							Create.Col1.NewItem("Préférences","Activer le menu de préférences personnalisé","JVN:Préférences",null,menu);
							
							
							titre_tab = "Liste des préférences";
							
							GM.unl("JVN:Préférences-n");
							n = GM.let("JVN:Préférences-n",0);
							txt = "";
							for (k=0;k<n;k++) {
								txt += GM.get("JVN:Préférences-link-"+k) + "##" + GM.get("JVN:Préférences-name-"+k) + "\n";
							}
							txt = txt.substring(0,txt.length-1);
							
							legend = "Index des préférences : \"url##nom\"";
							
							tab = Create.Col1.Tableau("préférences",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour les préférences",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									if (tab.length > 0) {
										list = tab.val().split("\n");
										GM.unl("JVN:Préférences-n");
										n = GM.let("JVN:Préférences-n",0);
										for (k=0;k<n;k++) {
											GM.del("JVN:Préférences-link-"+k);
											GM.del("JVN:Préférences-name-"+k);
										}
										GM.del("JVN:Préférences-n");
										Create.Col2.Vide();
										for (k=0;k<list.length;k++) {
											name = list[k].split("##");
											href = name.shift();
											name = name.join("##");
											if (href!="" && name!="")
												Preferences.Add(href,name);
										}
									}
								}
							});
							
							tab.keyup(function(e) {
								n = $(this).val().split("\n").length;
								$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							});
							
							break;
						}
						case "horaire" : {
							titre_menu += " : Options de changement de fuseau horaire";
							menu = Create.Col1.NewBloc("Changement de fuseau horaire");
							Create.Col1.NewItem("Fuseau horaire","Activer le changement de fuseau horaire","JVN:Fuseau",null,menu);
							
							id = "horaire";
							tab = Create.Col1.Liste(id,"Décalage en minutes","");
							
							line = Create.Col1.NewLine(tab);
							input = Create.Element('input');
							input.attr("id","decalage");
							input.val(GM.let("JVN:Fuseau:Horaire",0));
							line.append(input);
							
							line = Create.Col1.NewLine(tab);
							valid = Create.Icone("","MaJ","[MaJ]","Mettre à joure le décalage horaire","");
							line.append(valid);
							
							valid.click(function() {
								check = confirm(this.title+" ?");
								if (check) {
									inp = $("#decalage");
									val = parseInt(inp.val());
									if (isNaN(val) || val == 0) {
										val = 0;
										GM.del("JVN:Fuseau:Horaire");
									} else {
										GM.set("JVN:Fuseau:Horaire",val);
									}
									inp.val(val);
								}
							});
							
							
							break;
						}
						case "arme" : {
							titre_menu += " : Options de l'Arme V1";
							menu = Create.Col1.NewBloc("Arme");
							Create.Col1.NewItem("Arme","Activer l'arme de modération","JVN:Arme",null,menu);
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("Auto","Activer le tir automatique","JVN:Arme:Auto",null,menu);
							Create.Col1.NewItem("Exclus","Viser les personnes exclues","JVN:Arme:Exclus",null,menu);
							
							Load.Style("text/css","stylesheet","/css/defaut/forums.css");
							
							var tab = Create.Col1.Liste("liste_topics","Liste des topics supprimés","");
							tab.html(GM.get("JVN:Arme:TR"));
							var videur = Create.Icone("","redS","[S]","Vider la liste","").css("cursor","pointer");
							videur.click(function() {
								var check = confirm(this.title+" ?");
								if (check) {
									GM.del("JVN:Arme:TR");
								}
							});
							tab.append(videur);
							
							Create.Col1.Liste("temp","","").css("display","none");
							
							var tab = Create.Col1.Liste("col","Liste des messages supprimés","").css("width","100%");
							tab.html(GM.get("JVN:Arme:DIV"));
							var videur = Create.Icone("","redS","[S]","Vider la liste","").css("cursor","pointer");
							videur.click(function() {
								var check = confirm(this.title+" ?");
								if (check) {
									GM.del("JVN:Arme:DIV");
								}
							});
							tab.append(videur);
							
							var j = 0;
							$("#liste_topics tr").each(function(i) {
								$(this).attr("class","");
								$(this).addClass("tr"+(1+j));
								j = 1 - j;
								var remover = Create.Icone("","redX","[X]","Supprimer le rappel","");
								remover.css("cursor","pointer");
								$(this).prepend(Create.Element('td').attr("name","destroyer").append(remover));
								remover.click(function() {
									$(this.parentNode.parentNode).remove();
									$("#temp").html($("#liste_topics tbody").html());
									$("#temp [name=destroyer]").each(function (i) {$(this).remove();});
									var save = $("#temp").html();
									if (save == "") {
										GM.del("JVN:Arme:TR");
									} else {
										GM.set("JVN:Arme:TR",save);
									}
									$("#temp").html('');
								});
							});
							
							var j = 0;
							$("#col div").each(function(i) {
								$(this).attr("class","");
								$(this).addClass("msg");
								$(this).addClass("msg"+(1+j));
								j = 1 - j;
								var remover = Create.Icone("","redX","[X]","Supprimer le rappel","destroyer");
								remover.css("cursor","pointer");
								$($("li",this)[0]).prepend(remover);
								remover.click(function() {
									$(this.parentNode.parentNode.parentNode).remove();
									$("#temp").html($("#col").html());
									$("#temp [name=destroyer]").each(function (i) {$(this).remove();});
									var save = $("#temp").html();
									if (save == "") {
										GM.del("JVN:Arme:DIV");
									} else {
										GM.set("JVN:Arme:DIV",save);
									}
									$("#temp").html('');
								});
							});
							
							if ($("#style_col").length==0) {
								style  = "#col {";
								style += "border:1px solid #DDDDDD;";
								style += "font-family:Tahoma,Arial,Helvetica,sans-serif;";
								style += "font-size:85%;";
								style += "margin:-10px 0;";
								style += "text-align:center;";
								style += "width:100%;";
								style += "}";
								style += "\n #col1 div {text-align:left;}";
								Create.Style(style).attr("id","style_col");
							}
							
							break;
						}
						case "censurer" : {
							titre_menu += " : Options de censure";
							menu = Create.Col1.NewBloc("Censure");
							Create.Col1.NewItem("Censure","Activer les censures","JVN:Censure",null,menu);
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("Kick","Activer les censures des pseudonymes","JVN:Kick",null,menu);
							Create.Col1.SecretEffect("JVN:Secret:NoReloadKick","Kick","Secret : Ne pas recharger automatiquement la page après la censure d'un pseudonyme","JVN:Properties:Kick:NoReload",null,menu);
							Create.Col1.SecretEffect("JVN:Secret:KickFromList","Kick","Secret : Permet de kicker depuis la liste des sujets","JVN:Properties:Kick:List",null,menu);
							
							titre_tab = "Liste des censures actives";
							
							lis = GM.lis();
							txt = "";
							n=0;
							for (k=0;k<lis.length;k++) {
								if (new RegExp("^JVN:Censure:(.*)$").test(lis[k])) {
									txt += RegExp.$1 + "\n";
									n++;
								}
							}
							txt = txt.substring(0,txt.length-1);
							
							legend = "Index des messages censurés, \"n:message_m\" où n est le n° du forum et m le n° du message";
							
							tab = Create.Col1.Tableau("kicks",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour les censures",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									if (tab.length > 0) {
										list = tab.val().split("\n");
										lis = GM.lis();
										for (k=0;k<lis.length;k++) {
											if (new RegExp("^JVN:Censure:(.*)$").test(lis[k])) {
												GM.del(lis[k]);
											}
										}
										for (k=0;k<list.length;k++) {
											if (new RegExp("^[0-9]+:message_[0-9]+$").test(list[k]))
												GM.set("JVN:Censure:"+list[k].toLowerCase(),true);
										}
									}
								}
							});
							
							tab.keyup(function(e) {
								n = $(this).val().split("\n").length;
								$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							});
							
							
							titre_tab = "Liste des kicks actifs";
							
							lis = GM.lis();
							txt = "";
							n=0;
							for (k=0;k<lis.length;k++) {
								if (new RegExp("^JVN:Kick:(.*)$").test(lis[k])) {
									txt += RegExp.$1 + "\n";
									n++;
								}
							}
							txt = txt.substring(0,txt.length-1);
							
							legend = "Noms des pseudos et groupes de pseudos kickés";
							
							tab = Create.Col1.Tableau("kicks",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour les kicks",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									if (tab.length > 0) {
										list = tab.val().split("\n");
										lis = GM.lis();
										for (k=0;k<lis.length;k++) {
											if (new RegExp("^JVN:Kick:(.*)$").test(lis[k])) {
												GM.del(lis[k]);
											}
										}
										for (k=0;k<list.length;k++) {
											if (list[k] != "")
												GM.set("JVN:Kick:"+list[k].toLowerCase(),true);
										}
									}
								}
							});
							
							tab.keyup(function(e) {
								n = $(this).val().split("\n").length;
								$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							});
							
							break;
						}
						case "exclure" : {
							titre_menu += " : Options d'exclusion";
							menu = Create.Col1.NewBloc("Exclusion");
							Create.Col1.NewItem("Exclusion","Activer les exclusions","JVN:Exclusion",null,menu);
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("Moderateur","Désactiver les exclusions en tant que modérateur","JVN:Modo:Exclusion",null,menu);
							Create.Col1.NewItem("Liste","Pouvoir exclure depuis la liste des sujets","JVN:Liste:Exclusion",null,menu);
							
							titre_tab = "Liste des exclusions actives";
							
							lis = GM.lis();
							txt = "";
							n=0;
							for (k=0;k<lis.length;k++) {
								if (new RegExp("^JVN:Exclusion:(.*)$").test(lis[k])) {
									txt += RegExp.$1 + "\n";
									n++;
								}
							}
							txt = txt.substring(0,txt.length-1);
							
							legend = "Noms des pseudos et groupes de pseudos exclus";
							
							tab = Create.Col1.Tableau("exclusions",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour les exclusions",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									if (tab.length > 0) {
										list = tab.val().split("\n");
										lis = GM.lis();
										for (k=0;k<lis.length;k++) {
											if (new RegExp("^JVN:Exclusion:(.*)$").test(lis[k])) {
												GM.del(lis[k]);
											}
										}
										for (k=0;k<list.length;k++) {
											if (list[k] != "")
												GM.set("JVN:Exclusion:"+list[k].toLowerCase(),true);
										}
									}
								}
							});
							
							tab.keyup(function(e) {
								n = $(this).val().split("\n").length;
								$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							});
							
							break;
						}
						case "citer" : {
							titre_menu += " : Options de citation";
							menu = Create.Col1.NewBloc("Citation");
							Create.Col1.NewItem("Citations","Activer les citations","JVN:Citations",null,menu);
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("NoConfirm","Enlève la confirmation avant la citation","JVN:Citations:Confirm",null,menu);
							
							break;
						}
						case "protection" : {
							titre_menu += " : Options de protections";
							menu = Create.Col1.NewBloc("Protections");
							Create.Col1.NewItem("Protections","Activer les protections","JVN:Protections",null,menu);
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("LinkWarning","Débloque la possibilités de marquer des liens comme dangereux sans les interdire (liens de redirections par exemple)","JVN:Protections:Undirect",null,menu);
							Create.Col1.SecretEffect("JVN:Secret:Protect","LinkProtect","Débloquer la possibilité de protéger des liens","JVN:Protections:Unprotect",null,menu);
							Create.Col1.SecretEffect("JVN:Secret:Protect:Testeur","LinkProtect","Débloquer la possibilité de tester le contenu des liens","JVN:Protections:Testeur",null,menu);
							
							key = "JVN:Protections";
							titre_tab = "Liste des protections actives";
							
							n = GM.let(key+":n",0);
							txt = "";
							for (k=0;k<n;k++) {
								mod = GM.get(key+":mode|"+k);
								if (mod != "")
									txt += mod + "##";
								txt += GM.get(key+":"+k)+"\n";
							}
							txt = txt.substring(0,txt.length-1);
							
							legend = "Expressions régulières detectant les sites interdits";
							
							tab = Create.Col1.Tableau("interdiction",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5)).attr("key",key);
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour les protections",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									key = tab.attr("key");
									if (tab.length > 0) {
										list = tab.val().split("\n");
										GM.unl(key+":n");
										n = GM.let(key+":n",0);
										for (k=0;k<n;k++)
											GM.del(key+":"+k);
										GM.del(key+":n");
										for (k=0;k<list.length;k++) {
											if (list[k] != "")
												Protection.Add(list[k],key);
										}
									}
								}
							});
							
							tab.keyup(function(e) {
								n = $(this).val().split("\n").length;
								$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							});
							
							if (GM.let("JVN:Secret:Protect",false)) {
								key = "JVN:Protections:Unprotect";
								titre_tab = "Liste des liens protégés";
								
								n = GM.let(key+":n",0);
								txt = "";
								for (k=0;k<n;k++)
									txt += GM.get(key+":"+k)+"\n";
								txt = txt.substring(0,txt.length-1);
								
								legend = "Expressions régulières detectant les sites protégés";
								
								tab = Create.Col1.Tableau("protections",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5)).attr("key",key);
								but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour la liste des liens protégés",function() {
									check = confirm(this.title+" ?");
									if (check) {
										id = this.id.split("-")[1];
										tab = $("#"+id);
										key = tab.attr("key");
										if (tab.length > 0) {
											list = tab.val().split("\n");
											GM.unl(key+":n");
											n = GM.let(key+":n",0);
											for (k=0;k<n;k++)
												GM.del(key+":"+k);
											GM.del(key+":n");
											for (k=0;k<list.length;k++) {
												if (list[k] != "")
													Protection.Add(list[k],key);
											}
										}
									}
								});
								
								tab.keyup(function(e) {
									n = $(this).val().split("\n").length;
									$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
								});
							}
							
							
							key = "JVN:Protections:Undirect";
							titre_tab = "Liste des liens dangereux";
							
							n = GM.let(key+":n",0);
							txt = "";
							for (k=0;k<n;k++)
								txt += GM.get(key+":"+k)+"\n";
							txt = txt.substring(0,txt.length-1);
							
							legend = "Expressions régulières detectant les sites dangereux";
							
							tab = Create.Col1.Tableau("danger",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5)).attr("key",key);
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour la liste des liens dangereux",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									key = tab.attr("key");
									if (tab.length > 0) {
										list = tab.val().split("\n");
										GM.unl(key+":n");
										n = GM.let(key+":n",0);
										for (k=0;k<n;k++) {
											GM.del(key+":"+k);
											GM.del(key+":mode|"+k);
										}
										GM.del(key+":n");
										for (k=0;k<list.length;k++) {
											if (list[k] != "")
												Protection.Add(list[k],key);
										}
									}
								}
							});
							
							tab.keyup(function(e) {
								n = $(this).val().split("\n").length;
								$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							});
							
							break;
						}
						case "affichage" : {
							titre_menu += " : Options d'Affichage";
							menu = Create.Col1.NewBloc("Affichage");
							Create.Col1.NewItem("Affichage","Activer l'affichage direct des images et vidéos","JVN:Affichage",null,menu);
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("Affichage","Afficher directement les images","JVN:Affichage:Images",null,menu);
							Create.Col1.NewItem("Affichage","Afficher directement les vidéos","JVN:Affichage:Vidéos",null,menu);
							break;
						}
						case "groupe" : {
							titre_menu += " : Liste de pseudonymes";
							menu = Create.Col1.NewBloc("Liste de pseudonymes");
							Create.Col1.NewItem("Groupement","Activer les groupements de pseudonymes","JVN:Groupement",null,menu);
							
							titre_tab = "Liste des groupes actifs";
							
							lis = GM.lis();
							txt = "";
							n=0;
							for (k=0;k<lis.length;k++) {
								if (new RegExp("^groupe:(.*)$").test(lis[k])) {
									txt += RegExp.$1 + ":" + GM.get(lis[k]) + "\n";
									n++;
								}
							}
							txt = txt.substring(0,txt.length-1);
							
							legend = "Noms des pseudos groupés : \"pseudo:groupe\"";
							
							tab = Create.Col1.Tableau("groupements",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour les groupements",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									if (tab.length > 0) {
										list = tab.val().split("\n");
										lis = GM.lis();
										for (k=0;k<lis.length;k++) {
											if (new RegExp("^groupe:(.*)$").test(lis[k])) {
												GM.del(lis[k]);
											}
										}
										for (k=0;k<list.length;k++) {
											groupe = list[k].split(":");
											pseudo = groupe.shift();
											groupe = groupe.join(":");
											tmp = pseudo.replace(new RegExp("\\[","gi"),"a");
											if (Pseudonyme.valide(pseudo) && groupe != "") {
												GM.set("groupe:"+pseudo.toLowerCase(),groupe);
											}
										}
									}
								}
							});
							
							tab.keyup(function(e) {
								n = $(this).val().split("\n").length;
								$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							});
							
							break;
						}
						case "couleur" : {
							titre_menu += " : Liste de pseudonymes";
							menu = Create.Col1.NewBloc("Liste de pseudonymes");
							Create.Col1.NewItem("Couleur","Activer la coloration des pseudonymes","JVN:Couleur",null,menu);
							
							
							titre_tab = "Liste des colorations actives";
							
							lis = GM.lis();
							txt = "";
							n=0;
							for (k=0;k<lis.length;k++) {
								if (new RegExp("^JVN:Couleur:(.*)$").test(lis[k])) {
									txt += GM.get(lis[k]) + ":" + RegExp.$1 + "\n";
									n++;
								}
							}
							txt = txt.substring(0,txt.length-1);
							
							legend = "Noms des pseudos colorés : \"couleur:pseudo (ou groupe)\"";
							
							tab = Create.Col1.Tableau("coloration",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour les colorations",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									if (tab.length > 0) {
										list = tab.val().split("\n");
										lis = GM.lis();
										for (k=0;k<lis.length;k++) {
											if (new RegExp("^JVN:Couleur:(.*)$").test(lis[k])) {
												GM.del(lis[k]);
											}
										}
										for (k=0;k<list.length;k++) {
											groupe = list[k].split(":");
											pseudo = groupe[1];
											couleur = groupe[0];
											if (pseudo != "" && new RegExp("^[0-9A-Fa-f]{6}$").test(couleur)) {
												GM.set("JVN:Couleur:"+pseudo.toLowerCase(),couleur.toUpperCase());
											}
										}
									}
								}
							});
							
							tab.keyup(function(e) {
								n = $(this).val().split("\n").length;
								$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							});
							
							break;
						}
						case "mode" : {
							titre_menu += " : Liste de pseudonymes";
							menu = Create.Col1.NewBloc("Liste de pseudonymes");
							Create.Col1.NewItem("Affichage","Activer les affichages personalisés de pseudonymes","JVN:Mode",null,menu);
							
							
							id = "JVN:Mode";
							cl = "separate";
							tab = Create.Col1.Liste(id,"Liste des codes par défaut","").attr("sep",cl);
							
							Load.Style("text/css","stylesheet","/css/defaut/forums.css");
							if ($("#style_"+cl).length == 0) {
								style = "."+cl+" {border-top:1px dotted #444444;padding:3px;margin:3px;height:20px}";
								Create.Style(style).attr("id","style_"+cl);
							}
							
							r=0;
							
							Pseudonyme.mode.tab(tab,r++,id,":M:NG:NM",'Message : Affichage de pseudonyme non groupé (default JVC)');
							Pseudonyme.mode.tab(tab,r++,id,":M:G:NM",'Message : Affichage de pseudonyme groupé');
							Pseudonyme.mode.tab(tab,r++,id,":M:NG:M",'Message : Affichage de modérateur non groupé (default JVC)');
							Pseudonyme.mode.tab(tab,r++,id,":M:G:M",'Message : Affichage de modérateur groupé');
							Pseudonyme.mode.exline(tab,false,'Message : Autre exemple',"0<><strong><></strong>");
							Pseudonyme.mode.exline(tab,false,'Message : Autre exemple',"0<><strong class='moderateur'><></strong>");
							Pseudonyme.mode.exline(tab,false,'Message : Autre exemple',"1<><strong><></strong> <i style='font-size:90%;'>(<>)</i>");
							Pseudonyme.mode.exline(tab,false,'Message : Autre exemple',"1<><strong class='moderateur'><></strong> <i style='font-size:90%;'>(<>)</i>");
							Create.Col1.NewLine(tab).append(Create.Element('br'));
							Pseudonyme.mode.tab(tab,r++,id,":T:NG:NM",'Topic : Affichage de pseudonyme non groupé (default JVC)');
							Pseudonyme.mode.tab(tab,r++,id,":T:G:NM",'Topic : Affichage de pseudonyme groupé');
							Pseudonyme.mode.tab(tab,r++,id,":T:NG:M",'Topic : Affichage de modérateur non groupé (default JVC)');
							Pseudonyme.mode.tab(tab,r++,id,":T:G:M",'Topic : Affichage de modérateur groupé');
							Pseudonyme.mode.exline(tab,true,'Topic : Autres exemples',"0<><strong class='pseudo'><></strong>");
							Pseudonyme.mode.exline(tab,true,'Topic : Autres exemples',"0<><strong class='pseudo topic_mod'><></strong>");
							
							titre_tab = "Liste des modes particuliers";
							
							lis = GM.lis();
							txt = "";
							n=0;
							for (k=0;k<lis.length;k++) {
								if (new RegExp("^JVN:Mode:([^:]+):perso:([^:]+):(.*)$").test(lis[k])) {
									txt += RegExp.$3 + "<>" + RegExp.$1 + "<>" + RegExp.$2 + "<>" + GM.get(lis[k]) + "\n";
									n++;
								}
								if (new RegExp("^JVN:Mode:([^:]+):group:([^:]+):(.*)$").test(lis[k])) {
									txt += "G<>" + ((RegExp.$3).split("<>").length - 1) + "<>" + RegExp.$3 + "<>";
									txt += RegExp.$1 + "<>" + RegExp.$2 + "<>" + GM.get(lis[k]) + "\n";
									n++;
								}
							}
							txt = txt.substring(0,txt.length-1);
							
							legend  = "Modes actifs : \"pseudo<>lieu<>modo<>début<>code HTML\"<br/>";
							legend += "lieu : T = liste de topics / autre = liste des messages<br/>";
							legend += "modo : M = connecté en tant que modérateur/ autre = non connecté en tant que modérateur<br/>";
							legend += "début : 0 = le premier <> dans le code sera le groupe / autre = le premier <> dans le code sera le pseudo<br/>";
							legend += "code HTML standard, la balise <> servant pour placer le pseudo ou le groupe";
							tab = Create.Col1.Tableau("modes",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour les modes",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									if (tab.length > 0) {
										list = tab.val().split("\n");
										lis = GM.lis();
										for (k=0;k<lis.length;k++) {
											if (new RegExp("^JVN:Mode:([^:]+):perso:([^:]+):(.*)$").test(lis[k])) {
												GM.del(lis[k]);
											}
										}
										for (k=0;k<list.length;k++) {
											valeurs = list[k].split("<>");
											pseudo = valeurs.shift();
											lieu = valeurs.shift();
											if (lieu != "T") lieu = "M";
											modo = valeurs.shift();
											if (modo != "M") modo = "NM";
											deb = valeurs.shift();
											if (deb != "0") deb = "1";
											code = valeurs.join("<>");
											if (Pseudonyme.valide(pseudo) && (code != "")) {
												GM.set("JVN:Mode:"+lieu+":perso:"+modo+":"+pseudo.toLowerCase(),deb+"<>"+code);
											} else {
												valeurs = list[k].split("<>");
												groupekey = valeurs.shift()
												n = parseInt(valeurs.shift());
												if (groupekey == "G" && !(isNaN(n) || n < 0)) {
													groupe = valeurs.shift();
													for (j=0;j<n;j++) {
														groupe += "<>" + valeurs.shift();
													}
													lieu = valeurs.shift();
													if (lieu != "T") lieu = "M";
													modo = valeurs.shift();
													if (modo != "M") modo = "NM";
													deb = valeurs.shift();
													if (deb != "0") deb = "1";
													code = valeurs.join("<>");
													if (code != "") {
														GM.set("JVN:Mode:"+lieu+":group:"+modo+":"+groupe.toLowerCase(),deb+"<>"+code);
													}
												}
											}
										}
									}
								}
							});
							
							tab.keyup(function(e) {
								n = $(this).val().split("\n").length;
								$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							});
							
							
							
							
							if ($("#style_jvn_mod_tab").length == 0) {
								style = "table input {width:100% !important;}";
								Create.Style(style).attr("id","style_jvn_mod_tab");
							}
							
							break;
						}
						case "liste" : {
							titre_menu += " : Liste de pseudonymes";
							menu = Create.Col1.NewBloc("Liste de pseudonymes");
							Create.Col1.NewItem("Liste","Activer la liste de pseudonymes","JVN:Liste",null,menu);
							
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("DisconnectAuto","Déconnecter automatiquement","JVN:Disconnect",null,menu);
							Create.Col1.NewItem("DisconnectManual","Déconnecter lors des changements de page","JVN:Disconnect:Page",null,menu);
							Create.Col1.SecretEffect("JVN:Secret:CleverRemind","CleverRemind","Se souvenir du pseudonyme utilisé sur un forum/topic sans affecter celui par défaut","JVN:Remind",null,menu);
							
							
							titre_tab = "Liste des pseudonymes disponibles";
							
							n = GM.let("JVN:Liste:n",0);
							txt = "";
							for (k=0;k<n;k++) {
								pseudo = GM.get("JVN:Liste:"+k)
								txt += pseudo+":"+GM.get("JVN:Liste:"+pseudo.toLowerCase())+"\n";
							}
							txt = txt.substring(0,txt.length-1);
							
							legend = "Liste de pseudonymes : \"pseudo\" ou \"pseudo:mdp\" ";
							
							tab = Create.Col1.Tableau("pseudos",titre_tab,legend,txt,Math.min(Math.floor((n+1)*3/2-1/2),n+5)).css("color","#FFFFFF");
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour la liste de pseudos",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									if (tab.length > 0) {
										list = tab.val().split("\n");
										GM.unl("JVN:Liste:n");
										n = GM.let("JVN:Liste:n",0);
										for (k=0;k<n;k++) {
											pseudo = GM.get("JVN:Liste:"+k);
											GM.del("JVN:Liste:"+k);
											GM.del("JVN:Liste:"+pseudo.toLowerCase());
										}
										GM.del("JVN:Liste:n");
										for (k=0;k<list.length;k++) {
											mdp = list[k].split(":");
											pseudo = mdp.shift();
											mdp = mdp.join(":");
											if (Pseudonyme.valide(pseudo))
												Pseudonyme.add(pseudo,mdp);
										}
									}
								}
							});
							
							tab.keyup(function(e) {
								n = $(this).val().split("\n").length;
								$(this).attr("rows",Math.min(Math.floor((n+1)*3/2-1/2),n+5));
							});
							break;
						}
						case "sign" : {
							titre_menu += " : Options des signatures";
							menu = Create.Col1.NewBloc("Signatures");
							Create.Col1.NewItem("Signature","Activer les signatures","JVN:Signature",null,menu);
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("SignPerso","Donner des signatures différentes aux pseudonymes listés","JVN:Signature:Pseudo",null,menu);
							
							key = "JVN:Sign";
							id_tab = "sign";
							id = "liste-pseudo";
							tab = Create.Col1.Liste(id,"Liste des pseudonymes","").css("width","100%");
							line = Create.Col1.NewLine(tab);
							select = Connecteur.Select("select","","").attr("key",key).attr("sign",id_tab);
							line.append(Create.Element('td').css("width","100%").css("text-align","center").append(select));
							
							lim = 100;
							if (GM.let("JVN:Secret:DoubleSig",false))
								lim *= 2;
							id = "counter";
							titre_tab = "";
							txt = GM.get(key+":");
							legend = "<div id='"+id+"'style='width:100%;text-align:center;text-size:110%;text-weight:bold;'>"+lim+"</div>";
							tab = Create.Col1.Tableau(id_tab,titre_tab,legend,txt,6).attr("limit",lim).attr("counter",id).attr("key",key).attr("pseudo","");
							but = Create.Col1.TabMaJ("MaJ-"+tab.attr("id"),"Mettre à jour la signature",function() {
								check = confirm(this.title+" ?");
								if (check) {
									id = this.id.split("-")[1];
									tab = $("#"+id);
									psd = tab.attr("pseudo");
									key = tab.attr("key");
									val = tab.val();
									if (val == "") {
										GM.del(key+":"+psd.toLowerCase());
									} else {
										GM.set(key+":"+psd.toLowerCase(),val);
									}
								}
							});
							
							var apercu = Create.Icone("Apercu-"+tab.attr("id"),'apercu',"Aperçu","Aperçu","");
							apercu.css("cursor","pointer");
							apercu.css("margin-right","10px");
							but.before(apercu);
							
							apercu.click(function() {
								var id = this.id.split("-")[1];
								var tab = $("#"+id);
								var sign = tab.val();
								var form = Apercu.message(sign);
								apercu.before(form);
								form.submit();
								form.remove();
							});
							
							
							Signature.Limite(tab);
							
							tab.keydown(function (e) {
								Signature.Limite(this);
							});
							
							tab.keyup(function (e) {
								Signature.Limite(this);
							});
							
							tab.keypress(function (e) {
								Signature.Limite(this);
							});
							
							select.change(function() {
								i = this.selectedIndex;
								psd = $("option",this).eq(i).text();
								key = $(this).attr("key");
								tab = $(this).attr("sign");
								$("#"+tab).val(GM.get(key+":"+psd.toLowerCase()));
								$("#"+tab).attr("pseudo",psd);
								Signature.Limite($("#"+tab));
							});
							
							break;
						}
						case "profil" : {
							titre_menu += " : Liste de pseudonymes";
							menu = Create.Col1.NewBloc("Liste de pseudonymes");
							Create.Col1.NewItem("Profil","Créer des profils personnalisés","JVN:Profil",null,menu);
							
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("Bannis","Créer un profil pour les pseudonymes bannis","JVN:ProfilBanni",null,menu);
							Create.Col1.NewItem("Ratio","Afficher le ratio de messages par jour","JVN:Ratio",null,menu);
							Create.Col1.NewItem("Avatar","Rendre l'avatar toujours cliquable","JVN:AvatarClickable",null,menu);
							
							break;
						}
						case "avertissement" : {
							titre_menu += " : Options d'avertissement";
							menu = Create.Col1.NewBloc("Censure");
							Create.Col1.NewItem("Avertissement","Activer les avertissements de pseudonymes","JVN:Avert",null,menu);
							menu = Create.Col1.NewBloc("Options facultatives");
							Create.Col1.NewItem("Kick","Voir la barre d'avertissement quand elle est nulle","JVN:Avert:Still",null,menu);
							break;
						}
						case "debug" : {
							titre_menu += " : Options de debug";
							menu = Create.Col1.NewBloc("Options de debug");
							Create.Col1.SecretEffect(null,"DebugMode","Débloquer le mode Debug","JVN:Secret:DebugMode",null,menu);
							Create.Col1.SecretEffect(null,"IMGlocal","Toujours charger les images depuis 127.0.0.1","JVN:Secret:DebugMode:Img:Local",null,menu);
							Create.Col1.SecretEffect(null,"IMGBase64","Toujours charger les images en base64","JVN:Secret:DebugMode:Img:Base64",null,menu);
							Create.Col1.SecretEffect(null,"TimeStamp","Activer le TimeLog","JVN:Secret:DebugMode:TimeLog",null,menu);
							Create.Col1.SecretEffect(null,"TimeStamp","Afficher les performances générales dans le TimeLog","JVN:Secret:DebugMode:TimeLog:End",null,menu);
							Create.Col1.SecretEffect(null,"TimeStamp","Afficher les performances de mode le TimeLog","JVN:Secret:DebugMode:TimeLog:Done",null,menu);
							Create.Col1.SecretEffect(null,"TimeStamp","Afficher les performances du parseur dans le TimeLog","JVN:Secret:DebugMode:TimeLog:lecture",null,menu);
							Create.Col1.SecretEffect(null,"TimeStamp","Afficher les performances de modification de message (intern) dans le TimeLog","JVN:Secret:DebugMode:TimeLog:InMess",null,menu);
							Create.Col1.SecretEffect(null,"TimeStamp","Afficher les performances de modification de message (extern) dans le TimeLog","JVN:Secret:DebugMode:TimeLog:	",null,menu);
							Create.Col1.SecretEffect(null,"DebugGroups","Charger les mises à jour de groupe en local","JVN:Secret:DebugMode:LocalGroups",null,menu);
							
							var tab = Create.Col1.Liste("lis","Log","");
							tab.html(GM.get("JVN:Secret:DebugMode:TimeLog:Log").replace(new RegExp(String.fromCharCode(10),"g"),"<br/>"));
							GM.del("JVN:Secret:DebugMode:TimeLog:Log")
							break;
						}
						case "secrets" : {
							titre_menu += " : Options secrètes";
							menu = Create.Col1.NewBloc("Options secrètes");
							
							Create.Col1.SecretEffect("JVN:All","AccessSecret","Débloquer la possibilité d'atteindre la page des options secretes depuis le menu principal","JVN:Secret:Access",null,menu);
							Create.Col1.SecretEffect("JVN:All","DebugMode","Débloquer le mode Debug","JVN:Secret:DebugMode",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-debug-0-0-0-0-0.htm",menu);
							Create.Col1.SecretEffect("JVN:All","NoReloadKick","Débloquer la possibilité de kicker sans recharger la page","JVN:Secret:NoReloadKick",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-censurer-0-0-0-0-0.htm",menu);
							Create.Col1.SecretEffect("JVN:All","KickFromList","Débloquer la possibilité de kicker depuis la liste des sujets","JVN:Secret:KickFromList",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-censurer-0-0-0-0-0.htm",menu);
							Create.Col1.SecretEffect("JVN:All","NoModoStyle","Débloquer la possibilité de kicker ou exclure un modérateur ou administrateur","JVN:Secret:NoModoProtect",null,menu);
							Create.Col1.SecretEffect("JVN:All","LinkProtect","Débloquer la possibilité de protéger des liens","JVN:Secret:Protect",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-protection-0-0-0-0-0.htm",menu);
							Create.Col1.SecretEffect("JVN:All","LinkProtect","Débloquer la possibilité de tester le contenu des liens","JVN:Secret:Protect:Testeur",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-protection-0-0-0-0-0.htm",menu);
							Create.Col1.SecretEffect("JVN:All","SmilToCode","Débloquer la possibilité de remplacer des chaînes dans les messages par du code HTML","JVN:Secret:SmilToCode",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-smileys-0-0-0-0-0.htm",menu);
							Create.Col1.SecretEffect("JVN:All","SkinConsole","Débloquer l'accès aux skins console","JVN:Secret:Skin",null,menu);
							Create.Col1.SecretEffect("JVN:All","Skin","Rendre multicolore les boutons console","JVN:Secret:Skin:Multicolor",null,menu);
							Create.Col1.SecretEffect("JVN:All","SkinJVN","Débloquer la skin JeuxVideo.Nyu","JVN:Secret:Skin:JVN",null,menu);
							Create.Col1.SecretEffect("JVN:All","FormOff","Rendre visible le formulaire de post des topics verrouillés","JVN:Formulaire:Off",null,menu);
							Create.Col1.SecretEffect("JVN:All","DoubleSig","Double la taille possible pour les signatures","JVN:Secret:DoubleSig",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-sign-0-0-0-0-0.htm",menu);
							Create.Col1.SecretEffect("JVN:All","CleverRemind","Débloque la possibilité d'enregistrer des pseudos par défaut sur les forums ou topics","JVN:Secret:CleverRemind",context[0]+"www.jeuxvideo.com/forums/"+"1-JVN-liste-0-0-0-0-0.htm",menu);
							Create.Col1.SecretEffect("JVN:All","Pseudo-avatars","Débloque la possibilité de créer des pseudos avatars sur différents éléments","JVN:Secret:PseudoAvatar",null,menu);
							Create.Col1.SecretEffect("JVN:All","Zephyr","Débloquer le traducteur Français <=> Zéphyrien","JVN:Secret:Zephyr",null,menu);
							
						}
						case "skin" : {
							titre_menu += " : Options de changement de skin";
							menu = Create.Col1.NewBloc("Changement de fuseau horaire");
							Create.Col1.NewItem("Skin","Activer l'accès aux options de Skin","JVN:Secret:SkinJVN",null,menu);
							menu = Create.Col1.NewBloc("Options facultatives (indépendantes de la fonction principale)");
							Create.Col1.NewItem("Multipage","Activer l'affichage de plusieurs pages","JVN:Secret:Multipage",null,menu);
							//Create.Col1.SecretEffect("JVN:Secret:SmilToCode","Code","Activer le remplacement d'une chaîne de caractère par du code HTML","JVN:Smileys:Code",null,menu);
							
							var id = "Multipage";
							var tab = Create.Col1.Liste(id,"Nombre de page à charger :","");
							var line = Create.Col1.NewLine(tab);
							var label = Create.Element('label');
							label.text('liste de sujets : ');
							var input = Create.Element('input');
							input.attr("id","mode0");
							input.val(GM.let("JVN:Secret:Multipage:mode0",0)+1);
							line.append(label);
							line.append(input);
							var line = Create.Col1.NewLine(tab);
							var label = Create.Element('label');
							label.text('pages de sujets : ');
							var input = Create.Element('input');
							input.attr("id","mode1");
							input.val(GM.let("JVN:Secret:Multipage:mode1",0)+1);
							line.append(label);
							line.append(input);
							
							line = Create.Col1.NewLine(tab);
							valid = Create.Icone("","MaJ","[MaJ]","Mettre à joure le nombre de page à charger","");
							line.append(valid);
							
							valid.click(function() {
								check = confirm(this.title+" ?");
								if (check) {
									var inp0 = document.getElementById('mode0');
									var val0 = parseInt(inp0.value)-1;
									var inp1 = document.getElementById('mode1');
									var val1 = parseInt(inp1.value)-1;
									if (isNaN(val0) || val0 <= 0) {
										val0 = 0;
										GM.del("JVN:Secret:Multipage:mode0");
									} else {
										GM.set("JVN:Secret:Multipage:mode0",val0);
									}
									inp0.value = val0+1;
									if (isNaN(val1) || val1 <= 0) {
										val1 = 0;
										GM.del("JVN:Secret:Multipage:mode1");
									} else {
										GM.set("JVN:Secret:Multipage:mode1",val1);
									}
									inp1.value = val1+1;
								}
							});
							
							
							break;
						}
					}
					title.text(titre_menu);
					Create.Col1.ReturnOption(context[0]+"www.jeuxvideo.com/forums/"+"0-JVN-0-0-0-0-0-0.htm");
					break;
				}
				case "42" : {
					title = Create.Col1.Vide();
					title.text("Icones inclues dans J.V.Nyu");
					Const.SeeIcone($("#col1 .bloc_inner:first-child"));
					break;
				}
				case "6" : {
					title = Create.Col1.Vide();
					if (param[1]=="unlock") {
						title.text("Unlock Hidden Functions");
						inner = $("#col1 .bloc_inner:first-child");
						if (inner.length > 0) {
							div = Create.Element("div");
							inner.append(div);
							
							ul = Create.Element("ul");
							ul.attr("id","puzzle");
							div.append(ul);
							
							style  = 		"#puzzle { list-style-type: none; margin: 0; padding: 0; font-family:'Trebuchet MS','Arial','Helvetica','Verdana','sans-serif'; font-size: x-small; }";
							style += "\n"+	"#puzzle li { margin: 1px; padding: 1px; float: left; text-align: center; }";
							
							Create.Style(style);
							
							hor = Math.max(2,Math.min(25,parseInt(param[2])));
							h= 15;
							a = parseInt(param[3]);
							b = parseInt(param[4]);
							
							$(function() {
								for (i=0;i<hor*hor;i++) {
									li = $(document.createElement('li'));
									li.attr("class","ui-state-default");
									li.attr("id",i);
									li.text(i);
									$("#puzzle").append(li);
									li.css("width",h+"px");
									li.css("height",h+"px");
									li.css("cursor","move");
									li.css("background-color","#000000");
									li.css("color","#FFFFFF");
									li.mouseover(function() {
										li = $(this);
										function change(li) {
											color = li.css("background-color");
											switch (color) {
												case "rgb(0, 0, 0)" : {
													li.css("background-color","#FFFFFF");
													li.css("color","#000000");
													break;
												}
												case "rgb(255, 255, 255)" : {
													li.css("background-color","#FF0000");
													li.css("color","#00FFFF");
													break;
												}
												case "rgb(255, 0, 0)" : {
													li.css("background-color","#00FF00");
													li.css("color","#FF00FF");
													break;
												}
												case "rgb(0, 255, 0)" : {
													li.css("background-color","#0000FF");
													li.css("color","#FFFF00");
													break;
												}
												case "rgb(0, 0, 255)" : {
													li.css("background-color","#00FFFF");
													li.css("color","#FF0000");
													break;
												}
												case "rgb(0, 255, 255)" : {
													li.css("background-color","#FF00FF");
													li.css("color","#00FF00");
													break;
												}
												case "rgb(255, 0, 255)" : {
													li.css("background-color","#FFFF00");
													li.css("color","#0000FF");
													break;
												}
												case "rgb(255, 255, 0)" : {
													li.css("background-color","#000000");
													li.css("color","#FFFFFF");
													break;
												}
											}
										}
										
										id = parseInt(li.attr("id"));
										if (true)
											change(li);
										else
											change($("#"+Math.floor(Math.random()*hor*hor)));
									});
								}
								sort("#puzzle",null);
								$("#puzzle").disableSelection();
								$("#puzzle").css("width",(hor*(h+4)+5)+"px");
								
								$('#button').click(function() {
									var arr = $('#puzzle').sortable('toArray');
								});
							});
							
							div = Create.Element("div");
							div.css("clear","both");
							div.css("margin-top",(hor*(h+4)+25)+"px");
							inner.append(div);
							
							div.append(Create.Icone("","edit","","",""));
							
							li = Create.Element("li");
							div.append(li);
							li.html("");
						}
					}
					break;
				}
			}
			
			break;
		}
		case "" : {
			break;
		}
	}

					Debug.TimeStamp("End"," Mega Switch - Begin Ava");

	if (GM.let("JVN:Secret:PseudoAvatar",false)) {
		Avatar.search(".jvn_create_avatar");
	}

					Debug.TimeStamp("End"," Ava - Begin Skin'");

	if (GM.let("JVN:Secret:Skin:JVN:act",false)) {
		//$("link[type=text/css]").remove();
		//Load.Style("text/css","stylesheet","http://127.0.0.1/jvncss/jvn.css");
	}

					Debug.TimeStamp("","End of Script");
	if (GM.let("JVN:Secret:DebugMode",false)) {
		var ending_date_jvn_test = new Date();
		var res = ending_date_jvn_test - begin_date_jvn_test;
		if (GM.let("JVN:All",false)) {
			var txt = "DEBUG MODE ON<br/>Time elapsed<br/>";
			txt += ".BB..II..UU."+"<br/>";
		} else {
			var txt = "DEBUG MODE ON<br/>Time elapsed<br/>";
		}
		txt += begin_date_jvn_test.toLocaleString()	+"."+Const.Numb(3,begin_date_jvn_test.getMilliseconds())	+"<br/>";
		txt += ending_date_jvn_test.toLocaleString()	+"."+Const.Numb(3,ending_date_jvn_test.getMilliseconds())	+"<br/>";
		txt += res;
		$("body").append(Create.Element("div").html(txt));
	}

}
