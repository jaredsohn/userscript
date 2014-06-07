// ==UserScript==
// @name           [T4] My Travian Links(ITA)
// @namespace      http://userscripts.org/users/59418
// @author         http://www.travianutility.com
// @description    Aggiunge alla tua schermata, sulla destra, una serie di link indispensabili.
// @version        4.1.9
// @include        http://*.travian.*php*
// @exclude 	   http://*.travian.*/login.php*
// @exclude        http://*.travian.*/logout.php*
// @exclude 	   http://*.travian.*/chat.php*
// @exclude 	   http://forum.travian.*
// @exclude 	   http://*.travian.*/index.php*
// @exclude 	   http://*.travian.*/manual.php*
// ==/UserScript==

// Creazione link
links = new Array();
links[0]= new Array('Palazzo Pubblico' , 'build.php?id=26');
links[1]= new Array('Base Militare' , 'build.php?id=39');
links[2]= new Array('Caserma' , 'build.php?id=30');
links[3]= new Array('Scuderia' , 'build.php?id=25');
links[4]= new Array('Mercato' , 'build.php?id=24');
links[5]= new Array('Mappa' , ' http://travmap.shishnet.org/?lang=it');
links[6]= new Array('Travian Utility' , 'http://www.travianutility.com/');
links[5]= new Array('Beautiful Report' , ' http://travianreports.com/it');
links[6]= new Array('Nuove versioni' , 'http://userscripts.org/scripts/source/32924.user.js');



var menu,elemB, elemUL, elemLI, elemA, elemDiv, elemDivHead, elemDivCenter, elemDivFoot;

var link = document.getElementById('side_info');

menu = document.createElement('div');
menu.setAttribute("style","left:12px; margin-top:-6px;position:relative;");
link.appendChild(menu)


elemDivHead = document.createElement('div');
elemDivHead.setAttribute("style","background-image: url(\"gpack/travian_Travian_4.0_Grisu/img/layout/signVillagesTop-ltr.png\"); height: 68px;");
menu.appendChild(elemDivHead)

elemB  = document.createElement('b');
elemB.setAttribute("style","left: 18px; top: 20px; position: relative; padding-left: 20px;");
elemB.appendChild(document.createTextNode('Links:'));
elemDivHead.appendChild(elemB)


elemDivCenter = document.createElement('div');
elemDivCenter.setAttribute("style","background: url(\"gpack/travian_Travian_4.0_Grisu/img/layout/signVillagesBottom_none-ltr.png\") repeat-y scroll 0 bottom; position: relative; top: -28px; padding-bottom: 20px;");
menu.appendChild(elemDivCenter)



elemUL = document.createElement('ul');
elemUL.setAttribute("style","list-style: none outside none; padding-left: 20px;");
elemDivCenter.appendChild(elemUL)

//stampa

for(i=0;i<links.length;i++)
{
 elemLI = document.createElement('li');

    elemA = document.createElement('a');
	elemA.setAttribute("style","font-weight: normal;");
	elemA.href = links[i][1];
	elemA.appendChild(document.createTextNode(links[i][0]));

    elemLI.appendChild(elemA);

 elemUL.appendChild(elemLI);
};