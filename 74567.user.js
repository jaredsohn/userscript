// ==UserScript==
// @name           Selection_Amis_par_tag
// @namespace      http://bordeaux.onvasortir.com
// @description    Sélection une liste d'amis sur un tag 1.03
// @include        http://*/vue_profil_amis.php
// ==/UserScript==

function Maj_Amis(Tag, Check, Veille) {
var formu = document.getElementsByTagName('form')
if (formu.length>0)
{
	var Elt=formu[0].parentNode.getElementsByTagName('tr')
	var oAnchors = Elt[0].getElementsByTagName("a");
	for (var i = 1; i < Elt.length; i++) {
		var Ctrl=Elt[i].getElementsByTagName('input');
		var Com = Elt[i].getElementsByTagName('span');
    	if (((Ctrl.length==1) && (Com.length==2))&&(Com[1].innerHTML.indexOf(Tag)>=0)){
			if (Check) Ctrl[0].checked=true;
			if (Veille) unsafeWindow.ChangerVeille(Elt[i].getElementsByTagName("img")[0].id.slice(5));
		}
	}
}
else
		GM_log('pas de form');
}		
var formu = document.getElementsByTagName('form')
if (formu.length>0)
{

	var Elt=formu[0].parentNode.getElementsByTagName('tr')
	var titre = Elt[0].getElementsByTagName("td");
	var oAnchors = Elt[0].getElementsByTagName("a");
    oAnchors[0].addEventListener("click", function() {var tag=prompt('Sélection sur le tag : ','sympa'); Maj_Amis(tag,false,true); }, false);

	var icone_com=document.createElement("a");
	icone_com.innerHTML="<a onmouseover=\"Tip('<table width=300><tr><td align=justify><B><U>Le commentaire :</U></B><BR><BR>Note : Utilisez des mots clés dans les commentaires pour faciliter la sélection.</td></tr></table>');\"><img border=0 src='help.gif'></a>";
	icone_com.addEventListener("click", function() {var tag=prompt('Sélection sur le tag : ','sympa'); Maj_Amis(tag,true,false); }, false);
	titre[4].innerHTML+="<BR>";
	titre[4].appendChild(icone_com);
    
}