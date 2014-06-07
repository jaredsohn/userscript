// ==UserScript==
// @name           Travian Link - T4
// @namespace      http://www.traviantrucchi.org
// @author         Dark Simon
// @description    Aggiunge alla tua schermata, sulla destra, una serie di link indispensabili.
// @version        1.0.2
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
links[0]= new Array('Edificio principal' , 'build.php?gid=15');
links[1]= new Array('Plaza de reuniones' , 'build.php?gid=16');
links[2]= new Array('Cuartel' , 'build.php?gid=19');
links[3]= new Array('Establo' , 'build.php?gid=20');
links[4]= new Array('Mercado' , 'build.php?gid=17');



var menu,elemB, elemUL, elemLI, elemA, elemDiv, elemDivHead, elemDivCenter, elemDivFoot;

var link = document.getElementById('side_info');

menu = document.createElement('div');
menu.setAttribute("style","left:9px; margin-top:-4px;position:relative;");
link.appendChild(menu)


elemDivHead = document.createElement('div');
elemDivHead.setAttribute("style","background-image: url(\"gpack/travian_Travian_4.0_Schnappi/img/layout/signVillagesTop-ltr.png\"); height: 68px;");
menu.appendChild(elemDivHead)

elemB  = document.createElement('b');
elemB.setAttribute("style","left: 18px; top: 20px; position: relative; padding-left: 20px;");
elemB.appendChild(document.createTextNode('Links:'));
elemDivHead.appendChild(elemB)


elemDivCenter = document.createElement('div');
elemDivCenter.setAttribute("style","background: url(\"gpack/travian_Travian_4.0_Schnappi/img/layout/signVillagesMiddle-ltr.png\") repeat-y scroll 0 bottom; position: relative; top: -28px;");
menu.appendChild(elemDivCenter)


elemUL = document.createElement('ul');
elemUL.setAttribute("style","list-style: none outside none; padding-left: 20px;");
elemDivCenter.appendChild(elemUL)

elemDivBottom = document.createElement('div');
elemDivBottom.setAttribute("style","background: url(\"gpack/travian_Travian_4.0_Schnappi/img/layout/signVillagesBottom-ltr.png\") no-repeat scroll 0 bottom; position: relative; top: -41px; padding-bottom: 20px;");
menu.appendChild(elemDivBottom)


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
