// ==UserScript==
// @name           BisTV
// @namespace      BisTV Free
// @description	   BisTV Free TV
// @include http://www.abweb.com/BIS-TV-Online/bistvo-tele-sur-pc.aspx
// ==/UserScript==
 
function main() {
var cat = document.getElementById("ctl00_ContentPlaceHolder1_ddlMenu_deroul"),
	link1 = document.createElement("a"),
	link2 = document.createElement("a"),
	link3 = document.createElement("a"),
	link4 = document.createElement("a"),
	link5 = document.createElement("a"),
	link6 = document.createElement("a"),
	link7 = document.createElement("a"),
	link8 = document.createElement("a"),
	link9 = document.createElement("a"),
	link10 = document.createElement("a"),
	link11 = document.createElement("a"),
	link12 = document.createElement("a"),
	link13 = document.createElement("a"),
	link14 = document.createElement("a"),
	link15 = document.createElement("a"),
	link16 = document.createElement("a"),
	link17 = document.createElement("a"),
	link18 = document.createElement("a"),
	link19 = document.createElement("a"),
	link20 = document.createElement("a"),
	link21 = document.createElement("a"),
	link22 = document.createElement("a"),
	link23 = document.createElement("a"),
	link24 = document.createElement("a"),
	link25 = document.createElement("a"),
	holderDiv = document.createElement("div");
link1.textContent = "Cine FX";
link1.href = "javascript:ChangeChannel('cinefx','47124|1023467116|#0');";
link1.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-FX/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link2.textContent = "Cine Polar";
link2.href = "javascript:ChangeChannel('cinepolar','47124|1023467116|#0');";
link2.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-Polar/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link3.textContent = "Action";
link3.href = "javascript:ChangeChannel('action','47124|1023467116|#0');";
link3.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-Action/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link4.textContent = "RTL9";
link4.href = "javascript:ChangeChannel('rtl9','47124|1023467116|#0');";
link4.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-rtl9new/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link5.textContent = "AB1";
link5.href = "javascript:ChangeChannel('ab1','47124|1023467116|#0');";
link5.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-ab1/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link6.textContent = "AB Moteurs";
link6.href = "javascript:ChangeChannel('abmoteurs','47124|1023467116|#0');";
link6.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-moteurs/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link7.textContent = "Mangas";
link7.href = "javascript:ChangeChannel('mangas','47124|1023467116|#0');";
link7.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-Mangas/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link8.textContent = "Chasse Pêche";
link8.href = "javascript:ChangeChannel('chasseetpeche','47124|1023467116|#0');";
link8.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-Chasse/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link9.textContent = "Encyclo";
link9.href = "javascript:ChangeChannel('encyclopedia','47124|1023467116|#0');";
link9.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-Encyclo/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link10.textContent = "Toute l histoire";
link10.href = "javascript:ChangeChannel('toutelhistoire','47124|1023467116|#0');";
link10.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-histoire/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link11.textContent = "Animaux";
link11.href = "javascript:ChangeChannel('animaux','47124|1023467116|#0');";
link11.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-animaux/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link12.textContent = "Escales";
link12.href = "javascript:ChangeChannel('escales','47124|1023467116|#0');";
link12.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-escales/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link13.textContent = "AB3";
link13.href = "javascript:ChangeChannel('ab4','47124|1023467116|#0');";
link13.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-ab3/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link14.textContent = "Arte";
link14.href = "javascript:ChangeChannel('AB34','47124|1023467116|#0');";
link14.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/ext/chaine-Arte/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link15.textContent = "Gulli";
link15.href = "javascript:ChangeChannel('AB35','47124|1023467116|#0');";
link15.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/ext/chaine-Gulli/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link16.textContent = "Direct8";
link16.href = "javascript:ChangeChannel('ab26','47124|1023467116|#0');";
link16.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/ext/chaine-Direct8/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link17.textContent = "Africable";
link17.href = "javascript:ChangeChannel('ab19','47124|1023467116|#0');";
link17.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/ext/chaine-africable/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link18.textContent = "Golf Channel";
link18.href = "javascript:ChangeChannel('ab25','47124|1023467116|#0');";
link18.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-golfchannel-tv/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link19.textContent = "Kids & Co";
link19.href = "javascript:ChangeChannel('ab29','47124|1023467116|#0');";
link19.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/chaine-kids-and-co/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link20.textContent = "France 4";
link20.href = "javascript:ChangeChannel('ab31','47124|1023467116|#0');";
link20.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/ext/chaine-France4/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link21.textContent = "France O";
link21.href = "javascript:ChangeChannel('ab33','47124|1023467116|#0');";
link21.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/ext/chaine-franceo/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link22.textContent = "France 3";
link22.href = "javascript:ChangeChannel('ab21','47124|1023467116|#0');";
link22.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/ext/chaine-france3/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link23.textContent = "France 2";
link23.href = "javascript:ChangeChannel('ab22','47124|1023467116|#0');";
link23.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/ext/chaine-france2/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link24.textContent = "France 5";
link24.href = "javascript:ChangeChannel('ab23','47124|1023467116|#0');";
link24.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/ext/chaine-france5/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

link25.textContent = "LCP";
link25.href = "javascript:ChangeChannel('ab27','47124|1023467116|#0');";
link25.setAttribute("style", "background-image:url(http://www.abweb.com/upload/ressources/ext/chaine-lcp/images/chaine_liste.gif); text-decoration:none; color:#000; padding-top:11px; width:129px; background-repeat:no-repeat; text-align:right;");

//Cine FX
holderDiv.appendChild(link1);
//Cine Polar
holderDiv.appendChild(link2);
//Action
holderDiv.appendChild(link3);
//RTL9
holderDiv.appendChild(link4);
//AB1
holderDiv.appendChild(link5);
//AB3
holderDiv.appendChild(link13);
//Mangas
holderDiv.appendChild(link7);
//Gulli
holderDiv.appendChild(link15);
//Kids & co
holderDiv.appendChild(link19);
//Encyclo
holderDiv.appendChild(link9);
//Histoire
holderDiv.appendChild(link10);
//Animaux
holderDiv.appendChild(link11);
//Escales
holderDiv.appendChild(link12);
//Chasse & peche
holderDiv.appendChild(link8);
//AB Moteurs
holderDiv.appendChild(link6);
//Golf Channel
holderDiv.appendChild(link18);
//France 2
holderDiv.appendChild(link23);
//France 3
holderDiv.appendChild(link22);
//France 4
holderDiv.appendChild(link20);
//France 5
holderDiv.appendChild(link24);
//france O
holderDiv.appendChild(link21);
//LCP
holderDiv.appendChild(link25);
//Arte
holderDiv.appendChild(link14);
//Direct8
holderDiv.appendChild(link16);
//Africable
holderDiv.appendChild(link17);

cat.insertBefore(holderDiv, cat.firstChild);
}

window.addEventListener('load', main, false);