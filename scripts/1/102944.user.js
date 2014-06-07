// ==UserScript==
// @name           [WOD] AntiBanniere
// @namespace      *.world-of-dungeons.*
// @description    Masque la bannière de pub
// @include        http://*.world-of-dungeons.fr*
// ==/UserScript==

var bBanniereMasquee = false
var oTdBanniere = document.getElementById('gadgettable-padding-top');
if (oTdBanniere) {oTdBanniere.setAttribute('style', 'display:none;');bBanniereMasquee = true;}

if (bBanniereMasquee==false)
	{var DivList = document.getElementsByTagName('div'); 
	for(var i = 0; i < DivList.length; i++)
		{
		if (DivList[i].style.display == 'block' && bBanniereMasquee==false)
			{DivList[i].style.display = 'none';bBanniereMasquee = true;break;}
		}
	}