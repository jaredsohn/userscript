// ==UserScript==
// @name          Attaque point calculator - Xhodon
// @namespace     http://*.xhodon*.*/*.php*
// @description   Attaque point calculator
// @author       martic
// @version     1.8b
// @license     Creative Commons Attribution
// @include     http://*.xhodon*.*/*.php*
// ==/UserScript==


window.setInterval(function()
{
       var affichageHero = document.getElementById('send_hero_table');
       var affichageCdG = document.getElementById('follow_hero_');
       var calculCDGCcheck = document.getElementById('calculCDGCcheck');
       var totauxcheck = document.getElementById('totaux');
       var divScore = document.getElementById('highscore_table');
       var rankCheck = document.getElementById('checkNextRank');
       var totauxRCcheck = document.getElementById('checkcalcul');
       var affichageRC = document.getElementsByClassName('kbTable designedTable');

       if (divScore != null && rankCheck == null)
               if ( divScore.childNodes[0].rows[0].cells.length == 5)
                       nextRank();

       if (affichageCdG != null && calculCDGCcheck == null)
               calculCdG();

       if (affichageHero != null && totauxcheck == null)
               calculHero();

       if (affichageRC[0] != null && totauxRCcheck == null)
               calculRC(affichageRC);


}, 1 * 1000);

function calculCdG()
{
       //console.debug("Calcul CDG");

       var affichageCdG = document.getElementById('follow_hero_');
       affichageCdG.childNodes[1].innerHTML = affichageCdG.childNodes[1].innerHTML + '<div id="calculCDGCcheck"></div>';
       var calculCDGCcheck = document.getElementById('calculCDGCcheck');
       var totalPA = 0;
       var totalDEF = 0;
       var totalVIE = 0;
       var totalPOINT = 0;

       for (var i=3;i<affichageCdG.childNodes.length;i=i+2) {
               var creaturename = affichageCdG.childNodes[i].childNodes[1].rows[0].cells[0].childNodes[1].getAttribute('onmouseover').substr(16,affichageCdG.childNodes[i].childNodes[1].rows[0].cells[0].childNodes[1].getAttribute('onmouseover').length-19);

               var creaturecount = parseInt(affichageCdG.childNodes[i].childNodes[1].rows[0].cells[1].innerHTML.replace(/([.?*+^$[\]\\(){}-])/g,""));

               var creaturePoint = trouverPoint(creaturename);
               var creatureAttaque = trouverPA(creaturename);
               var creatureDef = trouverDEF(creaturename);
               var creatureVie = trouverVIE(creaturename);

               //console.debug(creaturename);
               //console.debug(creaturecount);
               //console.debug(creatureAttaque*creaturecount);

               totalPOINT = totalPOINT + creaturePoint * creaturecount;
               totalDEF = totalDEF + creatureDef * creaturecount;
               totalVIE = totalVIE + creatureVie * creaturecount;
               totalPA =  totalPA + creatureAttaque * creaturecount;

       }
       calculCDGCcheck.innerHTML = calculCDGCcheck.innerHTML + "PA : " + format(totalPA,0,".") + "<BR />"+ "DEF : " + format(totalDEF,0,".") + "<BR />"+ "VIE : " + format(totalVIE,0,".") + "<BR />";
}

function format(valeur,decimal,separateur) {
// formate un chiffre avec 'decimal' chiffres après la virgule et un separateur
       var deci=Math.round( Math.pow(10,decimal)*(Math.abs(valeur)-Math.floor(Math.abs(valeur)))) ;
       var val=Math.floor(Math.abs(valeur));
       if ((decimal==0)||(deci==Math.pow(10,decimal))) {val=Math.floor(Math.abs(valeur)); deci=0;}
       var val_format=val+"";
       var nb=val_format.length;
       for (var i=1;i<4;i++) {
               if (val>=Math.pow(10,(3*i))) {
                       val_format=val_format.substring(0,nb-(3*i))+separateur+val_format.substring(nb-(3*i));
               }
       }
       if (decimal>0) {
               var decim="";
               for (var j=0;j<(decimal-deci.toString().length);j++) {decim+="0";}
               deci=decim+deci.toString();
               val_format=val_format+"."+deci;
       }
       if (parseFloat(valeur)<0) {val_format="-"+val_format;}
       return val_format;
}

function nextRank()
{
       console.debug('Debut calcul rank');
       var divScore = document.getElementById('highscore_table');
       var tabScore = divScore.childNodes[0];
       var newCell = tabScore.rows[0].insertCell(-1);
       newCell.innerHTML = '';
       newCell.className = 'clear_last';
       tabScore.rows[0].cells[4].className = 'clear_middle';
       var newCell = tabScore.rows[1].insertCell(-1);
       newCell.innerHTML = 'Next';
       newCell.className = 'clear_last';

       for (var i=2;i<tabScore.rows.length;i++)
       {
               var nexRank = 0
               var row = tabScore.rows[i];
               var rank = parseInt(row.cells[0].innerHTML.substr(7,row.cells[0].innerHTML.indexOf(".")-7));

               if (rank <= 100)
               {
                       nexRank = Math.floor((rank-1)/10) +1;
               }else if (rank <= 300)
               {

                       nexRank = Math.floor((rank-101)/20) +11;
               }else if (rank <= 600)
               {

                       nexRank = Math.floor((rank-301)/30) +21;
               }else if (rank <= 1000)
               {

                       nexRank = Math.floor((rank-601)/40) +31;
               }else if (rank <= 1500)
               {

                       nexRank = Math.floor((rank-1001)/50) +41;
               }else
               {

                       nexRank = 'osef';
               }

               var newCell = row.insertCell(-1);
               newCell.innerHTML = nexRank;
               newCell.className = 'clear_last';
       }
       divScore.innerHTML = divScore.innerHTML + '<div id="checkNextRank"></div>';
}

function calculRC(RC)
{

       var creaturePoint = 0;
       var creatureQuatityAvant = 0;
       var creatureQuatityApres = 0;
       var creatureQuatityMorte = 0;
       var creatureQuatityConvertie = 0;
       var creatureAttaque = 0;
       var totalPointAvant = 0;
       var totalattaqueAvant = 0;
       var totalPointApres = 0;
       var totalattaqueApres = 0;
       var creatureDef = 0;
       var totalDefAvant = 0;
       var totalDefApres = 0;
       var creatureVie = 0;
       var totalVieAvant = 0;
       var totalVieApres = 0;
       var xp = 0
       var mode = -1;
       var modeavant = -1;
       var totalRCattaque = 0;

       var container =  document.getElementsByClassName('container');

       container[0].childNodes[4].innerHTML ='<div id="totalPAattaque">0</div><div id="totalPAdef">0</div><BR />';

       var divTotPaAtt = document.getElementById('totalPAattaque');
       var divTotPaDef = document.getElementById('totalPAdef');




       for each (var tab in RC) {

               if (tab.parentNode.className == 'container')
               {

                       if (container[0].childNodes[getIndex(tab)-5].nodeValue.indexOf("Expérience") != -1)
                       {
                               xp = parseInt(container[0].childNodes[getIndex(tab)-5].nodeValue.substr(container[0].childNodes[getIndex(tab)-5].nodeValue.indexOf("Expérience")+11,container[0].childNodes[getIndex(tab)-5].nodeValue.length-container[0].childNodes[getIndex(tab)-5].nodeValue.indexOf("Expérience")));
                       }

                       if (container[0].childNodes[getIndex(tab)-5].nodeValue.indexOf("Experience") != -1)
                       {
                               xp = parseInt(container[0].childNodes[getIndex(tab)-5].nodeValue.substr(container[0].childNodes[getIndex(tab)-5].nodeValue.indexOf("Experience")+11,container[0].childNodes[getIndex(tab)-5].nodeValue.length-container[0].childNodes[getIndex(tab)-5].nodeValue.indexOf("Experience")));
                       }

                       if(container[0].childNodes[getIndex(tab)-9].innerHTML && container[0].childNodes[getIndex(tab)-9].innerHTML.indexOf("Assaillant") != -1)
                               mode = 1;

                       if(container[0].childNodes[getIndex(tab)-9].innerHTML && container[0].childNodes[getIndex(tab)-9].innerHTML.indexOf("Attacker") != -1)
                               mode = 1;

                       if(container[0].childNodes[getIndex(tab)-8].innerHTML && container[0].childNodes[getIndex(tab)-8].innerHTML.indexOf("Défenseur") != -1)
                               mode = 0;

                       if(container[0].childNodes[getIndex(tab)-8].innerHTML && container[0].childNodes[getIndex(tab)-8].innerHTML.indexOf("Defender") != -1)
                               mode = 0;

                       totalPointAvant = 0;
                       totalattaqueAvant = 0;
                       totalPointApres = 0;
                       totalattaqueApres = 0;
                       totalDefAvant = 0;
                       totalDefApres = 0;
                       totalVieAvant = 0;
                       totalVieApres = 0;

                       for (var i=1;i<tab.rows.length;i++)
                       {
                               var row = tab.rows[i];
                               creaturePoint = trouverPoint(row.cells[0].innerHTML);
                               creatureAttaque = trouverPA(row.cells[0].innerHTML);
                               creatureDef = trouverDEF(row.cells[0].innerHTML);
                               creatureVie = trouverVIE(row.cells[0].innerHTML);
                               creatureQuatityAvant = parseInt(row.cells[1].innerHTML.replace(/([.?*+^$[\]\\(){}-])/g,""));
                               creatureQuatityApres = parseInt(row.cells[2].innerHTML.replace(/([.?*+^$[\]\\(){}-])/g,""));
                               creatureQuatityMorte = parseInt(row.cells[3].innerHTML.replace(/([.?*+^$[\]\\(){}-])/g,""));
                               if (row.cells[4] != null)
                                       creatureQuatityConvertie = parseInt(row.cells[4].innerHTML.replace(/([.?*+^$[\]\\(){}-])/g,""));
                               else
                                       creatureQuatityConvertie = 0
                               if (isNaN(creatureQuatityConvertie))
                                       creatureQuatityConvertie = 0

                               totalDefAvant = totalDefAvant + (creatureQuatityAvant * creatureDef);
                               totalVieAvant = totalVieAvant + (creatureQuatityAvant * creatureVie);
                               totalPointAvant = totalPointAvant + (creatureQuatityAvant * creaturePoint);
                               totalattaqueAvant = totalattaqueAvant + (creatureQuatityAvant * creatureAttaque);
                               totalPointApres = totalPointApres + ((creatureQuatityApres+creatureQuatityConvertie)* creaturePoint);
                               totalattaqueApres = totalattaqueApres + ((creatureQuatityApres+creatureQuatityConvertie) * creatureAttaque);
                               totalDefApres = totalDefApres + ((creatureQuatityApres+creatureQuatityConvertie) * creatureDef);
                               totalVieApres = totalVieApres + ((creatureQuatityApres+creatureQuatityConvertie) * creatureVie);

                       }

                       if (modeavant != mode)
                       {
                               totalRCattaque = 0;
                       }


                       totalRCattaque = totalRCattaque + totalattaqueApres;



                       if ( mode ==1 )
                               divTotPaAtt.innerHTML = 'Total des PA restant de l\'attaquant : ' +format(totalRCattaque,0,".") ;
                       if ( mode == 0)
                               divTotPaDef.innerHTML = 'Total des PA restant du défenseur : ' +format(totalRCattaque,0,".") ;

                       var newRow = tab.insertRow(-1);
                       var newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Points avant le combat';
                       newCell.className = 'white_first';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalPointAvant,0,".");
                       newCell.className = 'clear_middle';
                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);

                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Points après convertion';
                       newCell.className = 'white_first';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalPointApres,0,".");
                       newCell.className = 'clear_middle';
                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);

                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Points gagnés';
                       newCell.className = 'white_first';
                       newCell.style.fontWeight = 'bold';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalPointApres-totalPointAvant,0,".")+ " ("+Math.round(((totalPointApres-totalPointAvant)/totalPointAvant)*10000)/100+"%)";
                       newCell.className = 'clear_middle';
                       newCell.style.fontWeight = 'bold';
                       if (totalPointApres-totalPointAvant >= 0)
                               newCell.style.color = 'green';
                       else
                               newCell.style.color = 'red';
                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);

                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Points gagné + XP';
                       newCell.className = 'white_first';
                       newCell.style.fontWeight = 'bold';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalPointApres-totalPointAvant+xp,0,".");
                       newCell.className = 'clear_middle';
                       newCell.style.fontWeight = 'bold';
                       if (totalPointApres-totalPointAvant+xp >= 0)
                               newCell.style.color = 'green';
                       else
                               newCell.style.color = 'red';
                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);

                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Puissance d\'attaque avant';
                       newCell.className = 'white_first';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalattaqueAvant,0,".");
                       newCell.className = 'clear_middle';
                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);

                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Puissance d\'attaque après';
                       newCell.className = 'white_first';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalattaqueApres,0,".");
                       newCell.className = 'clear_middle';
                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);


                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Puissance d\'attaque gagné';
                       newCell.className = 'white_first';
                       newCell.style.fontWeight = 'bold';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalattaqueApres-totalattaqueAvant,0,".")+ " ("+Math.round(((totalattaqueApres-totalattaqueAvant)/totalattaqueAvant)*10000)/100+"%)";
                       newCell.className = 'clear_middle';
                       newCell.style.fontWeight = 'bold';
                       if (totalattaqueApres-totalattaqueAvant >= 0)
                               newCell.style.color = 'green';
                       else
                               newCell.style.color = 'red';

                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);


                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Défense avant';
                       newCell.className = 'white_first';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalDefAvant,0,".");
                       newCell.className = 'clear_middle';
                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);

                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Défense après';
                       newCell.className = 'white_first';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalDefApres,0,".");
                       newCell.className = 'clear_middle';
                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);


                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Défense gagné';
                       newCell.className = 'white_first';
                       newCell.style.fontWeight = 'bold';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalDefApres-totalDefAvant,0,".")+ " ("+Math.round(((totalDefApres-totalDefAvant)/totalDefAvant)*10000)/100+"%)";
                       newCell.className = 'clear_middle';
                       newCell.style.fontWeight = 'bold';
                       if (totalDefApres-totalDefAvant >= 0)
                               newCell.style.color = 'green';
                       else
                               newCell.style.color = 'red';

                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);

                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Total vie avant';
                       newCell.className = 'white_first';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalVieAvant,0,".");
                       newCell.className = 'clear_middle';
                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);

                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Total vie après';
                       newCell.className = 'white_first';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalVieApres,0,".");
                       newCell.className = 'clear_middle';
                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);


                       newRow = tab.insertRow(-1);
                       newCell = newRow.insertCell(0);
                       newCell.innerHTML = 'Total vie gagné';
                       newCell.className = 'white_first';
                       newCell.style.fontWeight = 'bold';
                       newCell = newRow.insertCell(1);
                       newCell.innerHTML = format(totalVieApres-totalVieAvant,0,".") + " ("+Math.round(((totalVieApres-totalVieAvant)/totalVieAvant)*10000)/100+"%)";
                       newCell.className = 'clear_middle';
                       newCell.style.fontWeight = 'bold';
                       if (totalVieApres-totalVieAvant >= 0)
                               newCell.style.color = 'green';
                       else
                               newCell.style.color = 'red';

                       newCell.setAttribute('colspan',tab.rows[0].cells.length-1);
                       modeavant = mode;
               }
       }


       var message = document.getElementsByClassName('message');
       if ( message.length > 0)
               message[0].innerHTML =  message[0].innerHTML + '<div id="checkcalcul"></div>';
}

function calculHero(){
       var creaturePoint = 0;
       var creatureQuatity = 0;
       var creatureAttaque = 0;
       var creatureDef = 0;
       var creatureVie = 0;
       var totalDef = 0;
       var totalPoint = 0;
       var totalattaque = 0;
       var totalVie = 0;
       var creature = document.getElementById('hero_unit_load_list');
       if (creature)
       {
               if (creature.hasChildNodes())
               {
                       var creaturePoint = 0;
                       var creatures = creature.childNodes;
                       for each (var item in creatures) {
                               var Elems = item.childNodes;
                               if (Elems != null && Elems.length == 2){
                                       creaturePoint = trouverPoint(Elems[0].innerHTML);
                                       creatureAttaque = trouverPA(Elems[0].innerHTML);
                                       creatureDef = trouverDEF(Elems[0].innerHTML);
                                       creatureVie = trouverVIE(Elems[0].innerHTML);
                                       creatureQuatity = parseInt(Elems[1].nodeValue.replace(/([.?*+^$[\]\\(){}-])/g,""));
                                       totalPoint = totalPoint + (creatureQuatity * creaturePoint);
                                       totalattaque = totalattaque + (creatureQuatity * creatureAttaque);
                                       totalDef = totalDef + (creatureQuatity * creatureDef);
                                       totalVie = totalVie + (creatureQuatity * creatureVie);
                               }
                       }
                       //console.debug(totalPoint);
                       //console.debug(totalattaque);
                       var divCreature = document.getElementById('hero_right');
                       divCreature.innerHTML = divCreature.innerHTML + '<div id="totaux"><br />Total points : '+format(totalPoint,0,".")+ '<br />Total attaque : ' + format(totalattaque,0,".")+ '<br />Total défense : ' + format(totalDef,0,".") +'<br />Total vie : ' + format(totalVie,0,".") +'</div>';
               }
       }
}

function getIndex( el )
{
       for ( var index = 0;
               index < el.parentNode.childNodes.length; index++ )
       {
               if ( el == el.parentNode.childNodes[ index ] )
               {
                       return index;
               }
       }
       return -1;
}

function trouverVIE(creaturename){
       var creaturevie = 0;
       if (creaturename.search("Farfadet") != -1){creaturevie = 25;}
       if (creaturename.search("Goblins") != -1){creaturevie = 25;}
       if (creaturename.search("Guerrier de glace") != -1){creaturevie = 50;}
       if (creaturename.search("Ice Warrior") != -1){creaturevie = 50;}
       if (creaturename.search("Enfants du pouvoir") != -1){creaturevie = 15;}
       if (creaturename.search("Children of Power") != -1){creaturevie = 15;}
       if (creaturename.search("Prêtre de guerre") != -1){creaturevie = 65;}
       if (creaturename.search("Warrior Priests") != -1){creaturevie = 65;}
       if (creaturename.search("Nains aux haches oscillantes") != -1){creaturevie = 120;}
       if (creaturename.search("Axe Swinging Dwarves") != -1){creaturevie = 120;}
       if (creaturename.search("Archers elfiques") != -1){creaturevie = 58;}
       if (creaturename.search("Elf Rangers") != -1){creaturevie = 64;}
       if (creaturename.search("Nains aux haches doubles") != -1){creaturevie = 165;}
       if (creaturename.search("Doubleedged Axe Dwarves") != -1){creaturevie = 182;}
       if (creaturename.search("Les Géants arboricoles") != -1){creaturevie = 120;}
       if (creaturename.search("Tree Giants") != -1){creaturevie = 144;}
       if (creaturename.search("Mages elfiques") != -1){creaturevie = 125;}
       if (creaturename.search("Elf Mages") != -1){creaturevie = 163;}
       if (creaturename.search("Œuf de Dragon") != -1){creaturevie = 80;}
       if (creaturename.search("Dragon Eggs") != -1){creaturevie = 80;}
       if (creaturename.search("Chariots de licorne") != -1){creaturevie = 20;}
       if (creaturename.search("Unicorn Carts") != -1){creaturevie = 20;}
       if (creaturename.search("Centaure hystérique") != -1){creaturevie = 19;}
       if (creaturename.search("Hysterical Centauride") != -1){creaturevie = 19;}
       if (creaturename.search("Fées de feu") != -1){creaturevie = 23;}
       if (creaturename.search("Fire Fairies") != -1){creaturevie = 23;}
       if (creaturename.search("Centaures sauvages") != -1){creaturevie = 31;}
       if (creaturename.search("Wild Centaurs") != -1){creaturevie = 31;}
       if (creaturename.search("Demi-géants chanteurs") != -1){creaturevie = 280;}
       if (creaturename.search("Singing Half Giants") != -1){creaturevie = 336;}
       if (creaturename.search("Trolls jeteurs de pierres") != -1){creaturevie = 500;}
       if (creaturename.search("Stone Throwing Trolls") != -1){creaturevie = 650;}
       if (creaturename.search("Fées d'orage") != -1){creaturevie = 65;}
       if (creaturename.search("Storm Fairies") != -1){creaturevie = 65;}
       if (creaturename.search("Salamandres") != -1){creaturevie = 4;}
       if (creaturename.search("Salamanders") != -1){creaturevie = 4;}
       if (creaturename.search("Freluquets de racine") != -1){creaturevie = 8;}
       if (creaturename.search("Root Wights") != -1){creaturevie = 8;}
       if (creaturename.search("Bourdons carnivores") != -1){creaturevie = 12;}
       if (creaturename.search("Meat Bumblebees") != -1){creaturevie = 12;}
       if (creaturename.search("Les scarabées") != -1){creaturevie = 16;}
       if (creaturename.search("Scarabs") != -1){creaturevie = 16;}
       if (creaturename.search("Gnomes") != -1){creaturevie = 20;}
       if (creaturename.search("Lumières trompeuses") != -1){creaturevie = 24;}
       if (creaturename.search("Will-O'-The-Wisps") != -1){creaturevie = 24;}
       if (creaturename.search("Skrälings") != -1){creaturevie = 28;}
       if (creaturename.search("Skraelings") != -1){creaturevie = 28;}
       if (creaturename.search("Rats aux verrues empoisonnées") != -1){creaturevie = 32;}
       if (creaturename.search("Wart Venom Rats") != -1){creaturevie = 32;}
       if (creaturename.search("Sylphes") != -1){creaturevie = 36;}
       if (creaturename.search("Sylphs") != -1){creaturevie = 36;}
       if (creaturename.search("Serpents Midgard") != -1){creaturevie = 40;}
       if (creaturename.search("Midgard Snakes") != -1){creaturevie = 40;}
       if (creaturename.search("Nymphes") != -1){creaturevie = 44;}
       if (creaturename.search("Nymphs") != -1){creaturevie = 44;}
       if (creaturename.search("Plantes grimpantes") != -1){creaturevie = 48;}
       if (creaturename.search("Climbing Plants") != -1){creaturevie = 48;}
       if (creaturename.search("Sirènes") != -1){creaturevie = 52;}
       if (creaturename.search("Mermaids") != -1){creaturevie = 52;}
       if (creaturename.search("Loup-garou") != -1){creaturevie = 56;}
       if (creaturename.search("Werewolves") != -1){creaturevie = 56;}
       if (creaturename.search("Gorgones") != -1){creaturevie = 60;}
       if (creaturename.search("Gorgons") != -1){creaturevie = 66;}
       //Fr if (creaturename.search("Harpies") != -1){creaturevie = 64;}
       if (creaturename.search("Harpies") != -1){creaturevie = 70;}
       if (creaturename.search("Aigles blancs") != -1){creaturevie = 68;}
       if (creaturename.search("Bald Eagles") != -1){creaturevie = 88;}
       //Fr if (creaturename.search("Morlocks") != -1){creaturevie = 72;}
       if (creaturename.search("Morlocks") != -1){creaturevie = 100;}
       if (creaturename.search("Araignées Marok géantes") != -1){creaturevie = 76;}
       if (creaturename.search("Giant Marok Spiders") != -1){creaturevie = 110;}
       if (creaturename.search("Diables de feu") != -1){creaturevie = 80;}
       if (creaturename.search("Fire Devils") != -1){creaturevie = 90;}
       if (creaturename.search("Loup de Fenris") != -1){creaturevie = 88;}
       if (creaturename.search("Fenrir Wolves") != -1){creaturevie = 120;}
       if (creaturename.search("Daimons") != -1){creaturevie = 100;}
       if (creaturename.search("Demons") != -1){creaturevie = 130;}
       if (creaturename.search("Golems de corne") != -1){creaturevie = 112;}
       if (creaturename.search("Horn Golems") != -1){creaturevie = 140;}
       if (creaturename.search("Cheveaux de soleil") != -1){creaturevie = 120;}
       if (creaturename.search("Sun Horses") != -1){creaturevie = 150;}
       if (creaturename.search("Minautaures") != -1){creaturevie = 128;}
       if (creaturename.search("Minotaurs") != -1){creaturevie = 170;}
       if (creaturename.search("Greifs") != -1){creaturevie = 140;}
       if (creaturename.search("Gryphons") != -1){creaturevie = 190;}
       if (creaturename.search("Lutins de sang") != -1){creaturevie = 152;}
       if (creaturename.search("Blood Alps") != -1){creaturevie = 210;}
       if (creaturename.search("Cyclopes") != -1){creaturevie = 160;}
       if (creaturename.search("Mantikors") != -1){creaturevie = 180;}
       if (creaturename.search("Manticores") != -1){creaturevie = 230;}
       //Fr if (creaturename.search("Behemoth") != -1){creaturevie = 200;}
       if (creaturename.search("Behemoth") != -1){creaturevie = 260;}
       //Fr if (creaturename.search("Ogres") != -1){creaturevie = 240;}
       if (creaturename.search("Ogres") != -1){creaturevie = 300;}
       if (creaturename.search("Vers de sable") != -1){creaturevie = 300;}
       if (creaturename.search("Sand Worms") != -1){creaturevie = 390;}
       if (creaturename.search("Anges de mort") != -1){creaturevie = 400;}
       if (creaturename.search("Death Angels") != -1){creaturevie = 400;}
       if (creaturename.search("Sphinx d'or") != -1){creaturevie = 480;}
       if (creaturename.search("Golden Sphinxes") != -1){creaturevie = 630;}
       if (creaturename.search("Dragons aux épines de feu") != -1){creaturevie = 600;}
       if (creaturename.search("Fire Sting Dragons") != -1){creaturevie = 700;}
       if (creaturename.search("Dragons aux yeux de glace") != -1){creaturevie = 800;}
       if (creaturename.search("Ice Eye Dragons") != -1){creaturevie = 920;}
       if (creaturename.search("Dragons au cou de serpent") != -1){creaturevie = 1000;}
       if (creaturename.search("Snake Neck Dragons") != -1){creaturevie = 1200;}

       return creaturevie;
}

function trouverDEF(creaturename){
       var creaturedef = 0;
       if (creaturename.search("Farfadet") != -1){creaturedef = 1;}
       if (creaturename.search("Goblins") != -1){creaturedef = 1;}
       if (creaturename.search("Guerrier de glace") != -1){creaturedef = 3;}
       if (creaturename.search("Ice Warrior") != -1){creaturedef = 3;}
       if (creaturename.search("Enfants du pouvoir") != -1){creaturedef = 3;}
       if (creaturename.search("Children of Power") != -1){creaturedef = 3;}
       if (creaturename.search("Prêtre de guerre") != -1){creaturedef = 4;}
       if (creaturename.search("Warrior Priests") != -1){creaturedef = 4;}
       if (creaturename.search("Nains aux haches oscillantes") != -1){creaturedef = 7;}
       if (creaturename.search("Axe Swinging Dwarves") != -1){creaturedef = 7;}
       if (creaturename.search("Archers elfiques") != -1){creaturedef = 17;}
       if (creaturename.search("Elf Rangers") != -1){creaturedef = 19;}
       if (creaturename.search("Nains aux haches doubles") != -1){creaturedef = 8;}
       if (creaturename.search("Doubleedged Axe Dwarves") != -1){creaturedef = 9;}
       if (creaturename.search("Les géants arboricoles") != -1){creaturedef = 32;}
       if (creaturename.search("Tree Giants") != -1){creaturedef = 38;}
       if (creaturename.search("Mages elfiques") != -1){creaturedef = 36;}
       if (creaturename.search("Elf Mages") != -1){creaturedef = 47;}
       if (creaturename.search("Œuf de Dragon") != -1){creaturedef = 1;}
       if (creaturename.search("Dragon Eggs") != -1){creaturedef = 1;}
       if (creaturename.search("Chariots de licorne") != -1){creaturedef = 0;}
       if (creaturename.search("Unicorn Carts") != -1){creaturedef = 0;}
       if (creaturename.search("Centaure hystérique") != -1){creaturedef = 4;}
       if (creaturename.search("Hysterical Centauride") != -1){creaturedef = 4;}
       if (creaturename.search("Fées de feu") != -1){creaturedef = 19;}
       if (creaturename.search("Fire Fairies") != -1){creaturedef = 19;}
       if (creaturename.search("Centaures sauvages") != -1){creaturedef = 8;}
       if (creaturename.search("Wild Centaurs") != -1){creaturedef = 8;}
       if (creaturename.search("Les demi-géants chanteurs") != -1){creaturedef = 14;}
       if (creaturename.search("Singing Half Giants") != -1){creaturedef = 17;}
       if (creaturename.search("Trolls jeteurs de pierres") != -1){creaturedef = 24;}
       if (creaturename.search("Stone Throwing Trolls") != -1){creaturedef = 31;}
       if (creaturename.search("Fées d'orage") != -1){creaturedef = 8;}
       if (creaturename.search("Storm Fairies") != -1){creaturedef = 8;}
       if (creaturename.search("Salamandres") != -1){creaturedef = 1;}
       if (creaturename.search("Salamanders") != -1){creaturedef = 1;}
       if (creaturename.search("Freluquets de racine") != -1){creaturedef = 2;}
       if (creaturename.search("Root Wights") != -1){creaturedef = 1;}
       if (creaturename.search("Bourdons carnivores") != -1){creaturedef = 3;}
       if (creaturename.search("Meat Bumblebees") != -1){creaturedef = 2;}
       if (creaturename.search("Les scarabées") != -1){creaturedef = 4;}
       if (creaturename.search("Scarabs") != -1){creaturedef = 2;}
       //Fr if (creaturename.search("Gnomes") != -1){creaturedef = 5;}
       if (creaturename.search("Gnomes") != -1){creaturedef = 3;}
       if (creaturename.search("Lumières trompeuses") != -1){creaturedef = 6;}
       if (creaturename.search("Will-O'-The-Wisps") != -1){creaturedef = 3;}
       if (creaturename.search("Skrälings") != -1){creaturedef = 7;}
       if (creaturename.search("Skraelings") != -1){creaturedef = 4;}
       if (creaturename.search("Rats aux verrues empoisonnées") != -1){creaturedef = 8;}
       if (creaturename.search("Wart Venom Rats") != -1){creaturedef = 4;}
       if (creaturename.search("Sylphes") != -1){creaturedef = 9;}
       if (creaturename.search("Sylphs") != -1){creaturedef = 5;}
       if (creaturename.search("Serpents Midgard") != -1){creaturedef = 10;}
       if (creaturename.search("Midgard Snakes") != -1){creaturedef = 5;}
       if (creaturename.search("Nymphes") != -1){creaturedef = 11;}
       if (creaturename.search("Nymphs") != -1){creaturedef = 6;}
       if (creaturename.search("Plantes grimpantes") != -1){creaturedef = 12;}
       if (creaturename.search("Climbing Plants") != -1){creaturedef = 7;}
       if (creaturename.search("Sirènes") != -1){creaturedef = 13;}
       if (creaturename.search("Mermaids") != -1){creaturedef = 8;}
       if (creaturename.search("Loup-garou") != -1){creaturedef = 14;}
       if (creaturename.search("Werewolves") != -1){creaturedef = 9;}
       if (creaturename.search("Gorgones") != -1){creaturedef = 15;}
       if (creaturename.search("Gorgons") != -1){creaturedef = 10;}
       //Fr if (creaturename.search("Harpies") != -1){creaturedef = 16;}
       if (creaturename.search("Harpies") != -1){creaturedef = 11;}
       if (creaturename.search("Aigles blancs") != -1){creaturedef = 17;}
       if (creaturename.search("Bald Eagles") != -1){creaturedef = 12;}
       //Fr if (creaturename.search("Morlocks") != -1){creaturedef = 18;}
       if (creaturename.search("Morlocks") != -1){creaturedef = 13;}
       if (creaturename.search("Araignées Marok géantes") != -1){creaturedef = 19;}
       if (creaturename.search("Giant Marok Spiders") != -1){creaturedef = 14;}
       if (creaturename.search("Diables de feu") != -1){creaturedef = 20;}
       if (creaturename.search("Fire Devils") != -1){creaturedef = 15;}
       if (creaturename.search("Loup de Fenris") != -1){creaturedef = 22;}
       if (creaturename.search("Fenrir Wolves") != -1){creaturedef = 16;}
       if (creaturename.search("Daimons") != -1){creaturedef = 25;}
       if (creaturename.search("Demons") != -1){creaturedef = 17;}
       if (creaturename.search("Golems de corne") != -1){creaturedef = 28;}
       if (creaturename.search("Horn Golems") != -1){creaturedef = 18;}
       if (creaturename.search("Cheveaux de soleil") != -1){creaturedef = 30;}
       if (creaturename.search("Sun Horses") != -1){creaturedef = 19;}
       if (creaturename.search("Minautaures") != -1){creaturedef = 32;}
       if (creaturename.search("Minotaurs") != -1){creaturedef = 20;}
       if (creaturename.search("Greifs") != -1){creaturedef = 35;}
       if (creaturename.search("Gryphons") != -1){creaturedef = 22;}
       if (creaturename.search("Lutins de sang") != -1){creaturedef = 38;}
       if (creaturename.search("Blood Alps") != -1){creaturedef = 23;}
       //Fr if (creaturename.search("Cyclopes") != -1){creaturedef = 40;}
       if (creaturename.search("Cyclopes") != -1){creaturedef = 25;}
       if (creaturename.search("Mantikors") != -1){creaturedef = 45;}
       if (creaturename.search("Manticores") != -1){creaturedef = 28;}
       //Fr if (creaturename.search("Behemoth") != -1){creaturedef = 50;}
       if (creaturename.search("Behemoth") != -1){creaturedef = 35;}
       //Fr if (creaturename.search("Ogres") != -1){creaturedef = 60;}
       if (creaturename.search("Ogres") != -1){creaturedef = 40;}
       if (creaturename.search("Vers de sable") != -1){creaturedef = 75;}
       if (creaturename.search("Sand Worms") != -1){creaturedef = 50;}
       if (creaturename.search("Anges de mort") != -1){creaturedef = 100;}
       if (creaturename.search("Death Angels") != -1){creaturedef = 60;}
       if (creaturename.search("Sphinx d'or") != -1){creaturedef = 120;}
       if (creaturename.search("Golden Sphinxes") != -1){creaturedef = 80;}
       if (creaturename.search("Dragons aux épines de feu") != -1){creaturedef = 150;}
       if (creaturename.search("Fire Sting Dragons") != -1){creaturedef = 100;}
       if (creaturename.search("Dragons aux yeux de glace") != -1){creaturedef = 200;}
       if (creaturename.search("Ice Eye Dragons") != -1){creaturedef = 150;}
       if (creaturename.search("Dragons au cou de serpent") != -1){creaturedef = 250;}
       if (creaturename.search("Snake Neck Dragons") != -1){creaturedef = 200;}

       return creaturedef;
}

function trouverPA(creaturename){
       var creatureatatque = 0;
       var creaturePoint = 0;
       if (creaturename.search("Farfadet") != -1){creaturePoint = 5;creatureatatque = 1;}
       if (creaturename.search("Goblins") != -1){creaturePoint = 5;creatureatatque = 1;}
       if (creaturename.search("Guerrier de glace") != -1){creaturePoint = 10;creatureatatque = 2;}
       if (creaturename.search("Ice Warrior") != -1){creaturePoint = 10;creatureatatque = 2;}
       if (creaturename.search("Enfants du pouvoir") != -1){creaturePoint = 6;creatureatatque = 3;}
       if (creaturename.search("Children of Power") != -1){creaturePoint = 6;creatureatatque = 3;}
       if (creaturename.search("Prêtre de guerre") != -1){creaturePoint = 17;creatureatatque = 4;}
       if (creaturename.search("Warrior Priests") != -1){creaturePoint = 19;creatureatatque = 4;}
       if (creaturename.search("Nains aux haches oscillantes") != -1){creaturePoint = 32;creatureatatque = 6;}
       if (creaturename.search("Axe Swinging Dwarves") != -1){creaturePoint = 35;creatureatatque = 6;}
       if (creaturename.search("Archers elfiques") != -1){creaturePoint = 36;creatureatatque = 15;}
       if (creaturename.search("Elf Rangers") != -1){creaturePoint = 40;creatureatatque = 17;}
       if (creaturename.search("Nains aux haches doubles") != -1){creaturePoint = 43;creatureatatque = 9;}
       if (creaturename.search("Doubleedged Axe Dwarves") != -1){creaturePoint = 49;creatureatatque = 10;}
       if (creaturename.search("Les géants arboricoles") != -1){creaturePoint = 70;creatureatatque = 32;}
       if (creaturename.search("Tree Giants") != -1){creaturePoint = 77;creatureatatque = 38;}
       if (creaturename.search("Mages elfiques") != -1){creaturePoint = 108;creatureatatque = 36;}
       if (creaturename.search("Elf Mages") != -1){creaturePoint = 122;creatureatatque = 47;}
       if (creaturename.search("Œuf de Dragon") != -1){creaturePoint = 2251;creatureatatque = 1;}
       if (creaturename.search("Dragon Eggs") != -1){creaturePoint = 2251;creatureatatque = 1;}
       if (creaturename.search("Chariots de licorne") != -1){creaturePoint = 7;creatureatatque = 0;}
       if (creaturename.search("Unicorn Carts") != -1){creaturePoint = 7;creatureatatque = 0;}
       if (creaturename.search("Centaure hystérique") != -1){creaturePoint = 11;creatureatatque = 4;}
       if (creaturename.search("Hysterical Centauride") != -1){creaturePoint = 12;creatureatatque = 4;}
       if (creaturename.search("Fées de feu") != -1){creaturePoint = 30;creatureatatque = 19;}
       if (creaturename.search("Fire Fairies") != -1){creaturePoint = 30;creatureatatque = 19;}
       if (creaturename.search("Centaures sauvages") != -1){creaturePoint = 21;creatureatatque = 9;}
       if (creaturename.search("Wild Centaurs") != -1){creaturePoint = 23;creatureatatque = 9;}
       if (creaturename.search("Les demi-géants chanteurs") != -1){creaturePoint = 96;creatureatatque = 13;}
       if (creaturename.search("Singing Half Giants") != -1){creaturePoint = 105;creatureatatque = 16;}
       if (creaturename.search("Trolls jeteurs de pierres") != -1){creaturePoint = 135;creatureatatque = 26;}
       if (creaturename.search("Stone Throwing Trolls") != -1){creaturePoint = 154;creatureatatque = 34;}
       if (creaturename.search("Fées d'orage") != -1){creaturePoint = 33;creatureatatque = 1;}
       if (creaturename.search("Storm Fairies") != -1){creaturePoint = 33;creatureatatque = 1;}
       if (creaturename.search("Salamandres") != -1){creaturePoint = 2;creatureatatque = 0;}
       if (creaturename.search("Salamanders") != -1){creaturePoint = 1;creatureatatque = 1;}
       if (creaturename.search("Freluquets de racine") != -1){creaturePoint = 4;creatureatatque = 1;}
       if (creaturename.search("Root Wights") != -1){creaturePoint = 1;creatureatatque = 1;}
       if (creaturename.search("Bourdons carnivores") != -1){creaturePoint = 6;creatureatatque = 1;}
       if (creaturename.search("Meat Bumblebees") != -1){creaturePoint = 0;creatureatatque = 2;}
       if (creaturename.search("Les scarabées") != -1){creaturePoint = 8;creatureatatque = 2;}
       if (creaturename.search("Scarabs") != -1){creaturePoint = 0;creatureatatque = 2;}
       //Fr if (creaturename.search("Gnomes") != -1){creaturePoint = 10;creatureatatque = 2;}
       if (creaturename.search("Gnomes") != -1){creaturePoint = 1;creatureatatque = 3;}
       if (creaturename.search("Lumières trompeuses") != -1){creaturePoint = 12;creatureatatque = 3;}
       if (creaturename.search("Will-O'-The-Wisps") != -1){creaturePoint = 1;creatureatatque = 3;}
       if (creaturename.search("Skrälings") != -1){creaturePoint = 14;creatureatatque = 3;}
       if (creaturename.search("Skraelings") != -1){creaturePoint = 1;creatureatatque = 4;}
       if (creaturename.search("Rats aux verrues empoisonnées") != -1){creaturePoint = 16;creatureatatque = 4;}
       if (creaturename.search("Wart Venom Rats") != -1){creaturePoint = 1;creatureatatque = 4;}
       if (creaturename.search("Sylphes") != -1){creaturePoint = 18;creatureatatque = 4;}
       if (creaturename.search("Sylphs") != -1){creaturePoint = 1;creatureatatque = 5;}
       if (creaturename.search("Serpents Midgard") != -1){creaturePoint = 20;creatureatatque = 5;}
       if (creaturename.search("Midgard Snakes") != -1){creaturePoint = 2;creatureatatque = 5;}
       if (creaturename.search("Nymphes") != -1){creaturePoint = 22;creatureatatque = 5;}
       if (creaturename.search("Nymphs") != -1){creaturePoint = 2;creatureatatque = 6;}
       if (creaturename.search("Plantes grimpantes") != -1){creaturePoint = 24;creatureatatque = 6;}
       if (creaturename.search("Climbing Plants") != -1){creaturePoint = 2;creatureatatque = 7;}
       if (creaturename.search("Sirènes") != -1){creaturePoint = 26;creatureatatque = 6;}
       if (creaturename.search("Mermaids") != -1){creaturePoint = 2;creatureatatque = 8;}
       if (creaturename.search("Loup-garou") != -1){creaturePoint = 28;creatureatatque = 7;}
       if (creaturename.search("Werewolves") != -1){creaturePoint = 2;creatureatatque = 9;}
       if (creaturename.search("Gorgones") != -1){creaturePoint = 30;creatureatatque = 7;}
       if (creaturename.search("Gorgons") != -1){creaturePoint = 3;creatureatatque = 10;}
       //Fr if (creaturename.search("Harpies") != -1){creaturePoint = 32;creatureatatque = 8;}
       if (creaturename.search("Harpies") != -1){creaturePoint = 3;creatureatatque = 11;}
       if (creaturename.search("Aigles blancs") != -1){creaturePoint = 34;creatureatatque = 8;}
       if (creaturename.search("Bald Eagles") != -1){creaturePoint = 3;creatureatatque = 12;}
       //Fr if (creaturename.search("Morlocks") != -1){creaturePoint = 36;creatureatatque = 9;}
       if (creaturename.search("Morlocks") != -1){creaturePoint = 3;creatureatatque = 13;}
       if (creaturename.search("Araignées Marok géantes") != -1){creaturePoint = 38;creatureatatque = 9;}
       if (creaturename.search("Giant Marok Spiders") != -1){creaturePoint = 4;creatureatatque = 14;}
       if (creaturename.search("Diables de feu") != -1){creaturePoint = 40;creatureatatque = 10;}
       if (creaturename.search("Fire Devils") != -1){creaturePoint = 4;creatureatatque = 15;}
       if (creaturename.search("Loup de Fenris") != -1){creaturePoint = 44;creatureatatque = 11;}
       if (creaturename.search("Fenrir Wolves") != -1){creaturePoint = 4;creatureatatque = 16;}
       if (creaturename.search("Daimons") != -1){creaturePoint = 50;creatureatatque = 12;}
       if (creaturename.search("Demons") != -1){creaturePoint = 5;creatureatatque = 17;}
       if (creaturename.search("Golems de corne") != -1){creaturePoint = 56;creatureatatque = 14;}
       if (creaturename.search("Horn Golems") != -1){creaturePoint = 5;creatureatatque = 18;}
       if (creaturename.search("Cheveaux de soleil") != -1){creaturePoint = 60;creatureatatque = 15;}
       if (creaturename.search("Sun Horses") != -1){creaturePoint = 6;creatureatatque = 19;}
       if (creaturename.search("Minautaures") != -1){creaturePoint = 64;creatureatatque = 16;}
       if (creaturename.search("Minotaurs") != -1){creaturePoint = 6;creatureatatque = 20;}
       if (creaturename.search("Greifs") != -1){creaturePoint = 70;creatureatatque = 17;}
       if (creaturename.search("Gryphons") != -1){creaturePoint = 7;creatureatatque = 22;}
       if (creaturename.search("Lutins de sang") != -1){creaturePoint = 76;creatureatatque = 19;}
       if (creaturename.search("Blood Alps") != -1){creaturePoint = 7;creatureatatque = 23;}
       //Fr if (creaturename.search("Cyclopes") != -1){creaturePoint = 80;creatureatatque = 20;}
       if (creaturename.search("Cyclopes") != -1){creaturePoint = 8;creatureatatque = 25;}
       if (creaturename.search("Mantikors") != -1){creaturePoint = 90;creatureatatque = 22;}
       if (creaturename.search("Manticores") != -1){creaturePoint = 9;creatureatatque = 28;}
       //Fr if (creaturename.search("Behemoth") != -1){creaturePoint = 100;creatureatatque = 25;}
       if (creaturename.search("Behemoth") != -1){creaturePoint = 10;creatureatatque = 35;}
       //Fr if (creaturename.search("Ogres") != -1){creaturePoint = 120;creatureatatque = 30;}
       if (creaturename.search("Ogres") != -1){creaturePoint = 12;creatureatatque = 40;}
       if (creaturename.search("Vers de sable") != -1){creaturePoint = 150;creatureatatque = 37;}
       if (creaturename.search("Sand Worms") != -1){creaturePoint = 15;creatureatatque = 50;}
       if (creaturename.search("Anges de mort") != -1){creaturePoint = 200;creatureatatque = 50;}
       if (creaturename.search("Death Angels") != -1){creaturePoint = 20;creatureatatque = 60;}
       if (creaturename.search("Sphinx d'or") != -1){creaturePoint = 240;creatureatatque = 60;}
       if (creaturename.search("Golden Sphinxes") != -1){creaturePoint = 24;creatureatatque = 80;}
       if (creaturename.search("Dragons aux épines de feu") != -1){creaturePoint = 300;creatureatatque = 75;}
       if (creaturename.search("Fire Sting Dragons") != -1){creaturePoint = 30;creatureatatque = 100;}
       if (creaturename.search("Dragons aux yeux de glace") != -1){creaturePoint = 400;creatureatatque = 100;}
       if (creaturename.search("Ice Eye Dragons") != -1){creaturePoint = 40;creatureatatque = 150;}
       if (creaturename.search("Dragons au cou de serpent") != -1){creaturePoint = 500;creatureatatque = 125;}
       if (creaturename.search("Snake Neck Dragons") != -1){creaturePoint = 50;creatureatatque = 200;}

       return creatureatatque;
}

function trouverPoint(creaturename)
{
       var creaturePoint = 0;
       if (creaturename.search("Farfadet") != -1){creaturePoint = 5;}
       if (creaturename.search("Goblins") != -1){creaturePoint = 5;}
       if (creaturename.search("Guerrier de glace") != -1){creaturePoint = 10;}
       if (creaturename.search("Ice Warrior") != -1){creaturePoint = 10;}
       if (creaturename.search("Enfants du pouvoir") != -1){creaturePoint = 6;}
       if (creaturename.search("Children of Power") != -1){creaturePoint = 6;}
       if (creaturename.search("Prêtre de guerre") != -1){creaturePoint = 17;}
       if (creaturename.search("Warrior Priests") != -1){creaturePoint = 19;}
       if (creaturename.search("Nains aux haches oscillantes") != -1){creaturePoint = 32;}
       if (creaturename.search("Axe Swinging Dwarves") != -1){creaturePoint = 35;}
       if (creaturename.search("Archers elfiques") != -1){creaturePoint = 36;}
       if (creaturename.search("Elf Rangers") != -1){creaturePoint = 40;}
       if (creaturename.search("Nains aux haches doubles") != -1){creaturePoint = 43;}
       if (creaturename.search("Doubleedged Axe Dwarves") != -1){creaturePoint = 49;}
       if (creaturename.search("Les géants arboricoles") != -1){creaturePoint = 70;}
       if (creaturename.search("Tree Giants") != -1){creaturePoint = 77;}
       if (creaturename.search("Mages elfiques") != -1){creaturePoint = 108;}
       if (creaturename.search("Elf Mages") != -1){creaturePoint = 122;}
       if (creaturename.search("Œuf de Dragon") != -1){creaturePoint = 2251;}
       if (creaturename.search("Dragon Eggs") != -1){creaturePoint = 2251;}
       if (creaturename.search("Chariots de licorne") != -1){creaturePoint = 7;}
       if (creaturename.search("Unicorn Carts") != -1){creaturePoint = 7;}
       if (creaturename.search("Centaure hystérique") != -1){creaturePoint = 11;}
       if (creaturename.search("Hysterical Centauride") != -1){creaturePoint = 12;}
       if (creaturename.search("Fées de feu") != -1){creaturePoint = 30;}
       if (creaturename.search("Fire Fairies") != -1){creaturePoint = 30;}
       if (creaturename.search("Centaures sauvages") != -1){creaturePoint = 21;}
       if (creaturename.search("Wild Centaurs") != -1){creaturePoint = 23;}
       if (creaturename.search("Les demi-géants chanteurs") != -1){creaturePoint = 96;}
       if (creaturename.search("Singing Half Giants") != -1){creaturePoint = 105;}
       if (creaturename.search("Trolls jeteurs de pierres") != -1){creaturePoint = 135;}
       if (creaturename.search("Stone Throwing Trolls") != -1){creaturePoint = 154;}
       if (creaturename.search("Fées d'orage") != -1){creaturePoint = 33;}
       if (creaturename.search("Storm Fairies") != -1){creaturePoint = 33;}
       if (creaturename.search("Salamandres") != -1){creaturePoint = 2;}
       if (creaturename.search("Salamanders") != -1){creaturePoint = 1;}
       if (creaturename.search("Freluquets de racine") != -1){creaturePoint = 4;}
       if (creaturename.search("Root Wights") != -1){creaturePoint = 1;}
       if (creaturename.search("Bourdons carnivores") != -1){creaturePoint = 6;}
       if (creaturename.search("Meat Bumblebees") != -1){creaturePoint = 0;}
       if (creaturename.search("Les scarabées") != -1){creaturePoint = 8;}
       if (creaturename.search("Scarabs") != -1){creaturePoint = 0;}
       //Fr if (creaturename.search("Gnomes") != -1){creaturePoint = 10;}
       if (creaturename.search("Gnomes") != -1){creaturePoint = 1;}
       if (creaturename.search("Lumières trompeuses") != -1){creaturePoint = 12;}
       if (creaturename.search("Will-O'-The-Wisps") != -1){creaturePoint = 1;}
       if (creaturename.search("Skrälings") != -1){creaturePoint = 14;}
       if (creaturename.search("Skraelings") != -1){creaturePoint = 1;}
       if (creaturename.search("Rats aux verrues empoisonnées") != -1){creaturePoint = 16;}
       if (creaturename.search("Wart Venom Rats") != -1){creaturePoint = 1;}
       if (creaturename.search("Sylphes") != -1){creaturePoint = 18;}
       if (creaturename.search("Sylphs") != -1){creaturePoint = 1;}
       if (creaturename.search("Serpents Midgard") != -1){creaturePoint = 20;}
       if (creaturename.search("Midgard Snakes") != -1){creaturePoint = 2;}
       if (creaturename.search("Nymphes") != -1){creaturePoint = 22;}
       if (creaturename.search("Nymphs") != -1){creaturePoint = 2;}
       if (creaturename.search("Plantes grimpantes") != -1){creaturePoint = 24;}
       if (creaturename.search("Climbing Plants") != -1){creaturePoint = 2;}
       if (creaturename.search("Sirènes") != -1){creaturePoint = 26;}
       if (creaturename.search("Mermaids") != -1){creaturePoint = 2;}
       if (creaturename.search("Loup-garou") != -1){creaturePoint = 28;}
       if (creaturename.search("Werewolves") != -1){creaturePoint = 2;}
       if (creaturename.search("Gorgones") != -1){creaturePoint = 30;}
       if (creaturename.search("Gorgons") != -1){creaturePoint = 3;}
       //Fr if (creaturename.search("Harpies") != -1){creaturePoint = 32;}
       if (creaturename.search("Harpies") != -1){creaturePoint = 3;}
       if (creaturename.search("Aigles blancs") != -1){creaturePoint = 34;}
       if (creaturename.search("Bald Eagles") != -1){creaturePoint = 3;}
       //Fr if (creaturename.search("Morlocks") != -1){creaturePoint = 36;}
       if (creaturename.search("Morlocks") != -1){creaturePoint = 3;}
       if (creaturename.search("Araignées Marok géantes") != -1){creaturePoint = 38;}
       if (creaturename.search("Giant Marok Spiders") != -1){creaturePoint = 4;}
       if (creaturename.search("Diables de feu") != -1){creaturePoint = 40;}
       if (creaturename.search("Fire Devils") != -1){creaturePoint = 4;}
       if (creaturename.search("Loup de Fenris") != -1){creaturePoint = 44;}
       if (creaturename.search("Fenrir Wolves") != -1){creaturePoint = 4;}
       if (creaturename.search("Daimons") != -1){creaturePoint = 50;}
       if (creaturename.search("Demons") != -1){creaturePoint = 5;}
       if (creaturename.search("Golems de corne") != -1){creaturePoint = 56;}
       if (creaturename.search("Horn Golems") != -1){creaturePoint = 5;}
       if (creaturename.search("Cheveaux de soleil") != -1){creaturePoint = 60;}
       if (creaturename.search("Sun Horses") != -1){creaturePoint = 6;}
       if (creaturename.search("Minautaures") != -1){creaturePoint = 64;}
       if (creaturename.search("Minotaurs") != -1){creaturePoint = 6;}
       if (creaturename.search("Greifs") != -1){creaturePoint = 70;}
       if (creaturename.search("Gryphons") != -1){creaturePoint = 7;}
       if (creaturename.search("Lutins de sang") != -1){creaturePoint = 76;}
       if (creaturename.search("Blood Alps") != -1){creaturePoint = 7;}
       //Fr if (creaturename.search("Cyclopes") != -1){creaturePoint = 80;}
       if (creaturename.search("Cyclopes") != -1){creaturePoint = 8;}
       if (creaturename.search("Mantikors") != -1){creaturePoint = 90;}
       if (creaturename.search("Manticores") != -1){creaturePoint = 9;}
       //Fr if (creaturename.search("Behemoth") != -1){creaturePoint = 100;}
       if (creaturename.search("Behemoth") != -1){creaturePoint = 10;}
       //Fr if (creaturename.search("Ogres") != -1){creaturePoint = 120;}
       if (creaturename.search("Ogres") != -1){creaturePoint = 12;}
       if (creaturename.search("Vers de sable") != -1){creaturePoint = 150;}
       if (creaturename.search("Sand Worms") != -1){creaturePoint = 15;}
       if (creaturename.search("Anges de mort") != -1){creaturePoint = 200;}
       if (creaturename.search("Death Angels") != -1){creaturePoint = 20;}
       if (creaturename.search("Sphinx d'or") != -1){creaturePoint = 240;}
       if (creaturename.search("Golden Sphinxes") != -1){creaturePoint = 24;}
       if (creaturename.search("Dragons aux épines de feu") != -1){creaturePoint = 300;}
       if (creaturename.search("Fire Sting Dragons") != -1){creaturePoint = 30;}
       if (creaturename.search("Dragons aux yeux de glace") != -1){creaturePoint = 400;}
       if (creaturename.search("Ice Eye Dragons") != -1){creaturePoint = 40;}
       if (creaturename.search("Dragons au cou de serpent") != -1){creaturePoint = 500;}
       if (creaturename.search("Snake Neck Dragons") != -1){creaturePoint = 50;}

       return creaturePoint;
}

function getElementsByClassName(classname, node) {
 if(!node) node = document.getElementsByTagName("body")[0];
 var a = [];
 var re = new RegExp('\\b' + classname + '\\b');
 var els = node.getElementsByTagName("*");
 for(var i=0,j=els.length; i<j; i++)
 if(re.test(els[i].className))a.push(els[i]);
 return a;
}
