// ==UserScript==                                    
// @name          Kampfpunkteanzeige by Caraliran - Xhodon      
// @namespace     http://*.xhodon*.*/*.php*                                                
// @description   Kampfpunkte / Machtlisten Kalculator 
// @author	 Caraliran
// @version 	1.9a
// @license 	GPL v2
// @email          a.fue@freenet.de
// @exclude        http://forum.xhodon.*
// @exclude        http://wikide.xhodon.de/*
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
	calculCDGCcheck.innerHTML = calculCDGCcheck.innerHTML + "Angriff : " + format(totalPA,0,".") + "<BR />"+ "Verteidigung : " + format(totalDEF,0,".") + "<BR />"+ "Leben : " + format(totalVIE,0,".") + "<BR />";
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
				divTotPaAtt.innerHTML = 'Restkampfkraft beim Angreifer : ' +format(totalRCattaque,0,".") ;
			if ( mode == 0)
				divTotPaDef.innerHTML = 'Restkampfkraft beim Verteidiger : ' +format(totalRCattaque,0,".") ;
		
			var newRow = tab.insertRow(-1);
			var newCell = newRow.insertCell(0);
			newCell.innerHTML = 'Punkte vorn Kampf';
			newCell.className = 'white_first';
			newCell = newRow.insertCell(1);
			newCell.innerHTML = format(totalPointAvant,0,".");
			newCell.className = 'clear_middle';
			newCell.setAttribute('colspan',tab.rows[0].cells.length-1);
			
			newRow = tab.insertRow(-1);
			newCell = newRow.insertCell(0);
			newCell.innerHTML = 'Punkte nach Kampf';
			newCell.className = 'white_first';
			newCell = newRow.insertCell(1);
			newCell.innerHTML = format(totalPointApres,0,".");
			newCell.className = 'clear_middle';
			newCell.setAttribute('colspan',tab.rows[0].cells.length-1);
			
			newRow = tab.insertRow(-1);
			newCell = newRow.insertCell(0);
			newCell.innerHTML = 'Kampfpunkte Veränderung';
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
			newCell.innerHTML = 'Veränderung Punkte + XP';
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
			newCell.innerHTML = 'Angriffskraft Vor Kampf';
			newCell.className = 'white_first';
			newCell = newRow.insertCell(1);
			newCell.innerHTML = format(totalattaqueAvant,0,".");
			newCell.className = 'clear_middle';
			newCell.setAttribute('colspan',tab.rows[0].cells.length-1);
			
			newRow = tab.insertRow(-1);
			newCell = newRow.insertCell(0);
			newCell.innerHTML = 'Angriffskraft nach Kampf';
			newCell.className = 'white_first';
			newCell = newRow.insertCell(1);
			newCell.innerHTML = format(totalattaqueApres,0,".");
			newCell.className = 'clear_middle';
			newCell.setAttribute('colspan',tab.rows[0].cells.length-1);
			
			
			newRow = tab.insertRow(-1);
			newCell = newRow.insertCell(0);
			newCell.innerHTML = 'Veränderung Angriffkraft';
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
			newCell.innerHTML = 'Verteidigung vor Kampf';
			newCell.className = 'white_first';
			newCell = newRow.insertCell(1);
			newCell.innerHTML = format(totalDefAvant,0,".");
			newCell.className = 'clear_middle';
			newCell.setAttribute('colspan',tab.rows[0].cells.length-1);
			
			newRow = tab.insertRow(-1);
			newCell = newRow.insertCell(0);
			newCell.innerHTML = 'Verteidigung nach Kampf';
			newCell.className = 'white_first';
			newCell = newRow.insertCell(1);
			newCell.innerHTML = format(totalDefApres,0,".");
			newCell.className = 'clear_middle';
			newCell.setAttribute('colspan',tab.rows[0].cells.length-1);
			
			
			newRow = tab.insertRow(-1);
			newCell = newRow.insertCell(0);
			newCell.innerHTML = 'Veränderung Verteidigung';
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
			newCell.innerHTML = 'Leben vor Kampf';
			newCell.className = 'white_first';
			newCell = newRow.insertCell(1);
			newCell.innerHTML = format(totalVieAvant,0,".");
			newCell.className = 'clear_middle';
			newCell.setAttribute('colspan',tab.rows[0].cells.length-1);
			
			newRow = tab.insertRow(-1);
			newCell = newRow.insertCell(0);
			newCell.innerHTML = 'Leben nach Kampf';
			newCell.className = 'white_first';
			newCell = newRow.insertCell(1);
			newCell.innerHTML = format(totalVieApres,0,".");
			newCell.className = 'clear_middle';
			newCell.setAttribute('colspan',tab.rows[0].cells.length-1);
			
			
			newRow = tab.insertRow(-1);
			newCell = newRow.insertCell(0);
			newCell.innerHTML = 'Veränderung Lebenspunkte';
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
		message[0].innerHTML = 	message[0].innerHTML + '<div id="checkcalcul"></div>';
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
				if (Elems.length == 2){						
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
			divCreature.innerHTML = divCreature.innerHTML + '<div id="totaux"><br />Gesamtpunkte : '+format(totalPoint,0,".")+ '<br />Gesamt Angriff : ' + format(totalattaque,0,".")+ '<br />Gesamt Verteidigung : ' + format(totalDef,0,".") +'<br />Gesamt Lebenspunkte : ' + format(totalVie,0,".") +'</div>';
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
	if (creaturename.search("Kobold") != -1){creaturevie = 25;} 
	if (creaturename.search("Eiskrieger") != -1){creaturevie = 50;}
	if (creaturename.search("Kinder der Macht") != -1){creaturevie = 15;} 
	if (creaturename.search("Kriegerpriester") != -1){creaturevie = 65;} 
	if (creaturename.search("Axtschwingende Zwerge") != -1){creaturevie = 120;} 
	if (creaturename.search("Elfenbogenschützen") != -1){creaturevie = 64;} 
	if (creaturename.search("Doppelaxtzwerge") != -1){creaturevie = 182;} 
	if (creaturename.search("Baumriese") != -1){creaturevie = 144;} 
	if (creaturename.search("Elfenmagier") != -1){creaturevie = 163;} 
	if (creaturename.search("Dracheneier") != -1){creaturevie = 80;}
	if (creaturename.search("Einhornwagen") != -1){creaturevie = 20;} 
	if (creaturename.search("Hysterische Zentaurin") != -1){creaturevie = 19;} 
	if (creaturename.search("Feuerfeen") != -1){creaturevie = 23;} 
	if (creaturename.search("Wilde Zentauren") != -1){creaturevie = 31;} 
	if (creaturename.search("Singende Halbriesen") != -1){creaturevie = 280;} 
	if (creaturename.search("Steinwerfende Bergtrolle") != -1){creaturevie = 500;} 
	if (creaturename.search("Sturmfeen") != -1){creaturevie = 65;} 
	if (creaturename.search("Salamander") != -1){creaturevie = 3;} 
	if (creaturename.search("Wurzelwichte") != -1){creaturevie = 5;} 
	if (creaturename.search("Fleischhummeln") != -1){creaturevie = 2;} 
	if (creaturename.search("Skarabaeus") != -1){creaturevie = 8;}
	if (creaturename.search("Gnome") != -1){creaturevie = 10;} 
	if (creaturename.search("Irrlichter") != -1){creaturevie = 7;} 
	if (creaturename.search("Skrälinge") != -1){creaturevie = 15;} 
	if (creaturename.search("Warzengiftratten") != -1){creaturevie = 11;} 
	if (creaturename.search("Sylphen") != -1){creaturevie = 18;} 
	if (creaturename.search("Midgardschlangen") != -1){creaturevie = 25;} 
	if (creaturename.search("Nymphen") != -1){creaturevie = 28;} 
	if (creaturename.search("Schlingpflanzen") != -1){creaturevie = 47;} 
	if (creaturename.search("Meerjungfrauen") != -1){creaturevie = 30;} 
	if (creaturename.search("Werwölfe") != -1){creaturevie = 39;} 
	if (creaturename.search("Gorgonen") != -1){creaturevie = 31;} 
	if (creaturename.search("Harpien") != -1){creaturevie = 25;} 
	if (creaturename.search("Weißadler") != -1){creaturevie = 48;} 
	if (creaturename.search("Morlocks") != -1){creaturevie = 41;} 
	if (creaturename.search("Riesen Marokspinnen") != -1){creaturevie = 62;} 
	if (creaturename.search("Feuerteufel") != -1){creaturevie = 50;} 
	if (creaturename.search("Fenriswolf") != -1){creaturevie = 54;} 
	if (creaturename.search("Dämons") != -1){creaturevie = 37;} 
	if (creaturename.search("Horngolems") != -1){creaturevie = 58;} 
	if (creaturename.search("Sonnenpferde") != -1){creaturevie = 81;} 
	if (creaturename.search("Minotauren") != -1){creaturevie = 53;} 
	if (creaturename.search("Greifen") != -1){creaturevie = 66;} 
	if (creaturename.search("Blutalben") != -1){creaturevie = 72;} 
	if (creaturename.search("Zyklopen") != -1){creaturevie = 107;} 
	if (creaturename.search("Mantikoren") != -1){creaturevie = 122;} 
	if (creaturename.search("Behemoth") != -1){creaturevie = 156} 
	if (creaturename.search("Oger") != -1){creaturevie = 301;} 
	if (creaturename.search("Sandwürmer") != -1){creaturevie = 376;} 
	if (creaturename.search("Todesengel") != -1){creaturevie = 198;} 
	if (creaturename.search("Goldene Sphinx") != -1){creaturevie = 427;} 
	if (creaturename.search("Feuerstacheldrachen") != -1){creaturevie = 888;} 
	if (creaturename.search("Eisaugendrachen") != -1){creaturevie = 1365;} 
	if (creaturename.search("Schlangenhalsdrachen") != -1){creaturevie = 2180;} 

	
	return creaturevie;
}

function trouverDEF(creaturename){
	var creaturedef = 0;
	if (creaturename.search("Kobold") != -1){creaturedef = 1;} 
	if (creaturename.search("Eiskrieger") != -1){creaturedef = 3;}
	if (creaturename.search("Kinder der Macht") != -1){creaturedef = 3;} 
	if (creaturename.search("Kriegerpriester") != -1){creaturedef = 4;} 
	if (creaturename.search("Axtschwingende Zwerge") != -1){creaturedef = 7;} 
	if (creaturename.search("Elfenbogenschützen") != -1){creaturedef = 17;} 
	if (creaturename.search("Doppelaxtzwerge") != -1){creaturedef = 8;} 
	if (creaturename.search("Baumriese") != -1){creaturedef = 32;} 
	if (creaturename.search("Elfenmagier") != -1){creaturedef = 36;} 
	if (creaturename.search("Dracheneier") != -1){creaturedef = 1;}
	if (creaturename.search("Einhornwagen") != -1){creaturedef = 0;} 
	if (creaturename.search("Hysterische Zentaurin") != -1){creaturedef = 4;} 
	if (creaturename.search("Feuerfeen") != -1){creaturedef = 19;} 
	if (creaturename.search("Wilde Zentauren") != -1){creaturedef = 8;} 
	if (creaturename.search("Singende Halbriesen") != -1){creaturedef = 14;} 
	if (creaturename.search("Steinwerfende Bergtrolle") != -1){creaturedef = 24;} 
	if (creaturename.search("Sturmfeen") != -1){creaturedef = 8;} 
	if (creaturename.search("Salamander") != -1){creaturedef = 1;} 
	if (creaturename.search("Wurzelwichte") != -1){creaturedef = 1;} 
	if (creaturename.search("Fleischhummeln") != -1){creaturedef = 2;} 
	if (creaturename.search("Skarabaeus") != -1){creaturedef = 3;}
	if (creaturename.search("Gnome") != -1){creaturedef = 2;} 
	if (creaturename.search("Irrlichter") != -1){creaturedef = 2;} 
	if (creaturename.search("Skrälinge") != -1){creaturedef = 3;} 
	if (creaturename.search("Warzengiftratten") != -1){creaturedef = 5;} 
	if (creaturename.search("Sylphen") != -1){creaturedef = 5;} 
	if (creaturename.search("Midgardschlangen") != -1){creaturedef = 7;} 
	if (creaturename.search("Nymphen") != -1){creaturedef = 11;} 
	if (creaturename.search("Schlingpflanzen") != -1){creaturedef = 2;} 
	if (creaturename.search("Meerjungfrauen") != -1){creaturedef = 5;} 
	if (creaturename.search("Werwölfe") != -1){creaturedef = 6;} 
	if (creaturename.search("Gorgonen") != -1){creaturedef = 8;} 
	if (creaturename.search("Harpien") != -1){creaturedef = 12;} 
	if (creaturename.search("Weißadler") != -1){creaturedef = 10;} 
	if (creaturename.search("Morlocks") != -1){creaturedef = 12;} 
	if (creaturename.search("Riesen Marokspinnen") != -1){creaturedef = 16;} 
	if (creaturename.search("Feuerteufel") != -1){creaturedef = 14;} 
	if (creaturename.search("Fenriswolf") != -1){creaturedef = 13;} 
	if (creaturename.search("Dämons") != -1){creaturedef = 25;} 
	if (creaturename.search("Horngolems") != -1){creaturedef = 19;} 
	if (creaturename.search("Sonnenpferde") != -1){creaturedef = 17;} 
	if (creaturename.search("Minotauren") != -1){creaturedef = 24;} 
	if (creaturename.search("Greifen") != -1){creaturedef = 21;} 
	if (creaturename.search("Blutalben") != -1){creaturedef = 28;} 
	if (creaturename.search("Zyklopen") != -1){creaturedef = 36;} 
	if (creaturename.search("Mantikoren") != -1){creaturedef = 35;} 
	if (creaturename.search("Behemoth") != -1){creaturedef = 51;} 
	if (creaturename.search("Oger") != -1){creaturedef = 42;} 
	if (creaturename.search("Sandwürmer") != -1){creaturedef = 57;} 
	if (creaturename.search("Todesengel") != -1){creaturedef = 83;} 
	if (creaturename.search("Goldene Sphinx") != -1){creaturedef = 75;} 
	if (creaturename.search("Feuerstacheldrachen") != -1){creaturedef = 147;} 
	if (creaturename.search("Eisaugendrachen") != -1){creaturedef = 213;} 
	if (creaturename.search("Schlangenhalsdrachen") != -1){creaturedef = 263;} 
	
	return creaturedef;
}

function trouverPA(creaturename){
	var creatureatatque = 0;	
	var creaturePoint = 0;
	if (creaturename.search("Kobold") != -1){creaturePoint = 5;creatureatatque = 1;} 
	if (creaturename.search("Eiskrieger") != -1){creaturePoint = 10;creatureatatque = 2;}
	if (creaturename.search("Kinder der Macht") != -1){creaturePoint = 6;creatureatatque = 3;} 
	if (creaturename.search("Kriegerpriester") != -1){creaturePoint = 17;creatureatatque = 4;} 
	if (creaturename.search("Axtschwingende Zwerge") != -1){creaturePoint = 32;creatureatatque = 6;} 
	if (creaturename.search("Elfenbogenschützen") != -1){creaturePoint = 36;creatureatatque = 15;} 
	if (creaturename.search("Doppelaxtzwerge") != -1){creaturePoint = 43;creatureatatque = 9;} 
	if (creaturename.search("Baumriese") != -1){creaturePoint = 70;creatureatatque = 32;} 
	if (creaturename.search("Elfenmagier") != -1){creaturePoint = 108;creatureatatque = 36;} 
	if (creaturename.search("Dracheneier") != -1){creaturePoint = 2251;creatureatatque = 1;}
	if (creaturename.search("Einhornwagen") != -1){creaturePoint = 7;creatureatatque = 0;} 
	if (creaturename.search("Hysterische Zentaurin") != -1){creaturePoint = 11;creatureatatque = 4;} 
	if (creaturename.search("Feuerfeen") != -1){creaturePoint = 30;creatureatatque = 20;} 
	if (creaturename.search("Wilde Zentauren") != -1){creaturePoint = 21;creatureatatque = 9;} 
	if (creaturename.search("Singende Halbriesen") != -1){creaturePoint = 96;creatureatatque = 13;} 
	if (creaturename.search("Steinwerfende Bergtrolle") != -1){creaturePoint = 135;creatureatatque = 26;} 
	if (creaturename.search("Sturmfeen") != -1){creaturePoint = 33;creatureatatque = 1;} 
	if (creaturename.search("Salamander") != -1){creaturePoint = 2;creatureatatque = 1;} 
	if (creaturename.search("Wurzelwichte") != -1){creaturePoint = 2;creatureatatque = 1;} 
	if (creaturename.search("Fleischhummeln") != -1){creaturePoint = 2;creatureatatque = 2;} 
	if (creaturename.search("Skarabaeus") != -1){creaturePoint = 5;creatureatatque = 3;}
	if (creaturename.search("Gnome") != -1){creaturePoint = 5;creatureatatque = 2;} 
	if (creaturename.search("Irrlichter") != -1){creaturePoint = 5;creatureatatque = 2;} 
	if (creaturename.search("Skrälinge") != -1){creaturePoint = 7;creatureatatque = 3;} 
	if (creaturename.search("Warzengiftratten") != -1){creaturePoint = 7;creatureatatque = 5;} 
	if (creaturename.search("Sylphen") != -1){creaturePoint = 9;creatureatatque = 5;} 
	if (creaturename.search("Midgardschlangen") != -1){creaturePoint = 14;creatureatatque = 7;} 
	if (creaturename.search("Nymphen") != -1){creaturePoint = 11;creatureatatque = 4;} 
	if (creaturename.search("Schlingpflanzen") != -1){creaturePoint = 11;creatureatatque = 2;} 
	if (creaturename.search("Meerjungfrauen") != -1){creaturePoint = 14;creatureatatque = 5;} 
	if (creaturename.search("Werwölfe") != -1){creaturePoint = 16;creatureatatque = 6;} 
	if (creaturename.search("Gorgonen") != -1){creaturePoint = 16;creatureatatque = 8;} 
	if (creaturename.search("Harpien") != -1){creaturePoint = 18;creatureatatque = 12;} 
	if (creaturename.search("Weißadler") != -1){creaturePoint = 23;creatureatatque = 10;} 
	if (creaturename.search("Morlocks") != -1){creaturePoint = 23;creatureatatque = 12;} 
	if (creaturename.search("Riesen Marokspinnen") != -1){creaturePoint = 34;creatureatatque = 16;} 
	if (creaturename.search("Feuerteufel") != -1){creaturePoint = 27;creatureatatque = 14;} 
	if (creaturename.search("Fenriswolf") != -1){creaturePoint = 27;creatureatatque = 13;} 
	if (creaturename.search("Dämons") != -1){creaturePoint = 32;creatureatatque = 25;} 
	if (creaturename.search("Horngolems") != -1){creaturePoint = 35;creatureatatque = 19;} 
	if (creaturename.search("Sonnenpferde") != -1){creaturePoint = 39;creatureatatque = 17;} 
	if (creaturename.search("Minotauren") != -1){creaturePoint = 36;creatureatatque = 24;} 
	if (creaturename.search("Greifen") != -1){creaturePoint = 39;creatureatatque = 21;}
	if (creaturename.search("Blutalben") != -1){creaturePoint = 66;creatureatatque = 28;} 
	if (creaturename.search("Zyklopen") != -1){creaturePoint = 67;creatureatatque = 36;} 
	if (creaturename.search("Mantikoren") != -1){creaturePoint = 68;creatureatatque = 35;} 
	if (creaturename.search("Behemoth") != -1){creaturePoint = 93;creatureatatque = 51;} 
	if (creaturename.search("Oger") != -1){creaturePoint = 118;creatureatatque = 42;} 
	if (creaturename.search("Sandwürmer") != -1){creaturePoint = 155;creatureatatque = 57;} 
	if (creaturename.search("Todesengel") != -1){creaturePoint = 134;creatureatatque = 83;} 
	if (creaturename.search("Goldene Sphinx") != -1){creaturePoint = 189;creatureatatque = 75;} 
	if (creaturename.search("Feuerstacheldrachen") != -1){creaturePoint = 380;creatureatatque = 147;} 
	if (creaturename.search("Eisaugendrachen") != -1){creaturePoint = 566;creatureatatque = 213;} 
	if (creaturename.search("Schlangenhalsdrachen") != -1){creaturePoint = 793;creatureatatque = 263;}
	
	return creatureatatque;
}

function trouverPoint(creaturename)
{	
	var creaturePoint = 0;
	if (creaturename.search("Kobold") != -1){creaturePoint = 5;} 
	if (creaturename.search("Eiskrieger") != -1){creaturePoint = 10;}
	if (creaturename.search("Kinder der Macht") != -1){creaturePoint = 6;} 
	if (creaturename.search("Kriegerpriester") != -1){creaturePoint = 17;} 
	if (creaturename.search("Axtschwingende Zwerge") != -1){creaturePoint = 32;} 
	if (creaturename.search("Elfenbogenschützen") != -1){creaturePoint = 36;} 
	if (creaturename.search("Doppelaxtzwerge") != -1){creaturePoint = 43;} 
	if (creaturename.search("Baumriese") != -1){creaturePoint = 70;} 
	if (creaturename.search("Dracheneier") != -1){creaturePoint = 2251;}
	if (creaturename.search("Einhornwagen") != -1){creaturePoint = 7;} 
	if (creaturename.search("Hysterische Zentaurin") != -1){creaturePoint = 11;} 
	if (creaturename.search("Feuerfeen") != -1){creaturePoint = 30;} 
	if (creaturename.search("Wilde Zentauren") != -1){creaturePoint = 21;} 
	if (creaturename.search("Singende Halbriesen") != -1){creaturePoint = 96;} 
	if (creaturename.search("Steinwerfende Bergtrolle") != -1){creaturePoint = 135;} 
	if (creaturename.search("Sturmfeen") != -1){creaturePoint = 33;} 
	if (creaturename.search("Salamander") != -1){creaturePoint = 2;} 
	if (creaturename.search("Wurzelwichte") != -1){creaturePoint = 1;} 
	if (creaturename.search("Fleischhummeln") != -1){creaturePoint = 2;} 
	if (creaturename.search("Skarabaeus") != -1){creaturePoint = 5;}
	if (creaturename.search("Gnome") != -1){creaturePoint = 5;} 
	if (creaturename.search("Irrlichter") != -1){creaturePoint = 5;} 
	if (creaturename.search("Skrälinge") != -1){creaturePoint = 7;} 
	if (creaturename.search("Warzengiftratten") != -1){creaturePoint = 5;} 
	if (creaturename.search("Sylphen") != -1){creaturePoint = 5;} 
	if (creaturename.search("Midgardschlangen") != -1){creaturePoint = 14;} 
	if (creaturename.search("Nymphen") != -1){creaturePoint = 11;} 
	if (creaturename.search("Schlingpflanzen") != -1){creaturePoint = 11;} 
	if (creaturename.search("Meerjungfrauen") != -1){creaturePoint = 14;} 
	if (creaturename.search("Werwölfe") != -1){creaturePoint = 16;} 
	if (creaturename.search("Gorgonen") != -1){creaturePoint = 16;} 
	if (creaturename.search("Harpien") != -1){creaturePoint = 18;} 
	if (creaturename.search("Weißadler") != -1){creaturePoint = 23;} 
	if (creaturename.search("Morlocks") != -1){creaturePoint = 23;} 
	if (creaturename.search("Riesen Marokspinnen") != -1){creaturePoint = 34;} 
	if (creaturename.search("Feuerteufel") != -1){creaturePoint = 27;} 
	if (creaturename.search("Fenriswolf") != -1){creaturePoint = 27;} 
	if (creaturename.search("Dämons") != -1){creaturePoint = 32;} 
	if (creaturename.search("Horngolems") != -1){creaturePoint = 35;} 
	if (creaturename.search("Sonnenpferde") != -1){creaturePoint = 39;} 
	if (creaturename.search("Minotauren") != -1){creaturePoint = 36;} 
	if (creaturename.search("Greifen") != -1){creaturePoint = 39;}
	if (creaturename.search("Blutalben") != -1){creaturePoint = 66;} 
	if (creaturename.search("Zyklopen") != -1){creaturePoint = 67;} 
	if (creaturename.search("Mantikoren") != -1){creaturePoint = 68;} 
	if (creaturename.search("Behemoth") != -1){creaturePoint = 93;} 
	if (creaturename.search("Oger") != -1){creaturePoint = 118;} 
	if (creaturename.search("Sandwürmer") != -1){creaturePoint = 155;} 
	if (creaturename.search("Todesengel") != -1){creaturePoint = 134;} 
	if (creaturename.search("Goldene Sphinx") != -1){creaturePoint = 189;} 
	if (creaturename.search("Feuerstacheldrachen") != -1){creaturePoint = 380;} 
	if (creaturename.search("Eisaugendrachen") != -1){creaturePoint = 566;} 
	if (creaturename.search("Schlangenhalsdrachen") != -1){creaturePoint = 793;}
	
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