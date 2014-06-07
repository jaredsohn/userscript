// ==UserScript==
// @name           Travian Internal Links(ITA)
// @namespace      http://travianeasy.altervista.org
// @author         Rayl
// @description    Aggiunge alla schermata del gioco alcuni link interni che potrebbero tornare utili
// @version        1.2
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
links[0]= new Array('Spade Verdi' , 'allianz.php?s=3&f=1');
links[1]= new Array('Spade Gialle' , 'allianz.php?s=3&f=2');
links[2]= new Array('Spade Rosse' , 'allianz.php?s=3&f=3');
links[3]= new Array('Scudi Verdi' , 'allianz.php?s=3&f=4');
links[4]= new Array('Scudi Gialli' , 'allianz.php?s=3&f=5');
links[5]= new Array('Scudi Rossi' , 'allianz.php?s=3&f=6');
links[6]= new Array('Scudi Grigi' , 'allianz.php?s=3&f=7');
links[7]= new Array('Spy Go Verde' , 'allianz.php?s=3&f=15');
links[8]= new Array('Spy Go Gialla' , 'allianz.php?s=3&f=16');
links[9]= new Array('Spy Go Rossa' , 'allianz.php?s=3&f=17');
links[10]= new Array('Spy On Verde' , 'allianz.php?s=3&f=18');
links[11]= new Array('Spy On Gialla' , 'allianz.php?s=3&f=19');
links[12]= new Array('Attacchi caserma' , 'build.php?id=39&k&attack');
links[13]= new Array('Travian Report' , ' http://travian-reports.net/it/');
links[14]= new Array('Tempi di percorrenza' , ' http://www.javaschubla.de/travian/wegerechner.php?lang=it');
links[15]= new Array('Pianificatore' , ' http://www.travian-planner.com/it/');
links[16]= new Array('Travian Easy' , ' http://travianeasy.altervista.org/');
links[17]= new Array('Aggiorna Script' , 'http://userscripts.org/scripts/source/114410.user.js');

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

