// ==UserScript==
// @name           Affiche Google maps
// @namespace      http://nantes.onvasortir.com
// @include        http://*/sortie_read.php
// ==/UserScript==


var oDiv = document.getElementsByTagName("div");
//	GM_log(oAnchors[0].getAttribute ('onmouseover'));

//	for (var i = 1; i < oDiv.length; i++) 
//		if (oDiv[i].innerHTML.indexOf('Hall')>=0)
//		GM_log(i+ ' : '+oDiv[i].innerHTML);
		var ligne = oDiv[68].getElementsByTagName('td');
  	for (var i = 1; i < ligne.length; i++) 
  	if (ligne[i].innerHTML.indexOf('<b>Adresse exacte')==0)
  	{
			GM_log(ligne[i+1].innerHTML);
//			ligne[i+1].innerHTML="<a onmouseover=\"Tip('<table width=300><tr><td align=justify><B><U>Le commentaire :</U></B><BR><BR>Note : Utilisez des mots clés dans les commentaires pour faciliter la sélection.</td></tr></table>');\">"+ligne[i+1].innerHTML+"</a>";
				ligne[i+1].innerHTML="<a onmouseover=\"Tip('<iframe width=\'425\' height=\'350\' frameborder=\'0\' scrolling=\'no\' marginheight=\'0\' marginwidth=\'0\' src=\'http://maps.google.fr/maps?f=q&amp;hl=fr&amp;geocode=&amp;q=Le+Cascabel+1+rue+Kerv%C3%A9gan+44000+NANTES+&amp;sll=47.15984,2.988281&amp;sspn=19.580062,39.550781&amp;ie=UTF8&amp;ll=47.21373,-1.553333&amp;spn=0.006295,0.006295&amp;output=embed&amp;s=AARTsJp1xBenXYHOI7Ns7A3Gw6Sw-YRKLQ\'></iframe><br />');\">"+ligne[i+1].innerHTML+"</a>";
		}
//			var Adresse=ligne[20].getElementsByTagName('td')[0].innerHTML;
//			GM_log(Adresse);
//		GM_log(oDiv[68].getElementsByTagName('tr').length);
	//ic