// ==UserScript==
// @name           test
// @namespace      test namespace
// @description    c'est un test
// @include        http://*ogame.fr/game/index.php?page=resources*
// @include        http://*ogame.fr/game/index.php?page=station*
// @include        http://*ogame.fr/game/index.php?page=research*
// @include        http://*ogame.fr/game/index.php?page=shipyard*
// @include        http://*ogame.fr/game/index.php?page=defense*
// ==/UserScript==

alert(' Test 1 ');

//copie de OGame Time



	//****************************************************************************************************
	//*************************************** Resources disponible ***************************************
	//****************************************************************************************************
	if(document.getElementById("resources_metal").innerHTML.indexOf('.') >= 0){
	// globalMetal = total metal sur planete selectionnee
		var globalMetal = Math.ceil(parseFloat(document.getElementById("resources_metal").innerHTML)*1000);
	}else{
		var globalMetal = Math.ceil(parseFloat(document.getElementById("resources_metal").innerHTML));
	}
	if(document.getElementById("resources_crystal").innerHTML.indexOf('.') >= 0){
	// globalCristal = total cristal sur planete selectionnee
		var globalCristal = Math.ceil(parseFloat(document.getElementById("resources_crystal").innerHTML)*1000);
	}else{
		var globalCristal = Math.ceil(parseFloat(document.getElementById("resources_crystal").innerHTML));
	}
	if(document.getElementById("resources_deuterium").innerHTML.indexOf('.') >= 0){
	// globalDeut = total deut sur planete selectionnee
		var globalDeut = Math.ceil(parseFloat(document.getElementById("resources_deuterium").innerHTML)*1000);
	}else{
		var globalDeut = Math.ceil(parseFloat(document.getElementById("resources_deuterium").innerHTML));
	}
	//****************************************************************************************************

ressources = 'Ressource:    ';
ressources += "/n" ;
ressources += 'Metal = ';
ressources += globalMetal ;
ressources += '    Cristal = ';
ressources += globalCristal ;
ressources += '    Deut = ';
ressources += globalDeut ;
alert(ressources);

	//****************************************************************************************************
	//*************************************** Resources par heure ***************************************
	//****************************************************************************************************
	var prodMetal = document.getElementById('metal_box').getAttribute('title').substring(document.getElementById('metal_box').getAttribute('title').indexOf('(')+2, document.getElementById('metal_box').getAttribute('title').indexOf(')'));
	if(prodMetal.indexOf('.') >= 0){	
		prodMetal = parseFloat(prodMetal)*1000;
	}else{
		prodMetal = parseFloat(prodMetal);
	}
	
	var prodCristal = document.getElementById('crystal_box').getAttribute('title').substring(document.getElementById('crystal_box').getAttribute('title').indexOf('(')+2, document.getElementById('crystal_box').getAttribute('title').indexOf(')'));
	if(prodCristal.indexOf('.') >= 0){	
		prodCristal = parseFloat(prodCristal)*1000;
	}else{
		prodCristal = parseFloat(prodCristal);
	}
	
	var prodDeut = document.getElementById('deuterium_box').getAttribute('title').substring(document.getElementById('deuterium_box').getAttribute('title').indexOf('(')+2, document.getElementById('deuterium_box').getAttribute('title').indexOf(')'));
	if(prodDeut.indexOf('.') >= 0){	
		prodDeut = parseFloat(prodDeut)*1000;
	}else{
		prodDeut = parseFloat(prodDeut);
	}	
	//****************************************************************************************************
	
alert('2');

	//****************************************************************************************************
	//*************************************** Cout des batiments ***************************************
	//****************************************************************************************************
	var url = location.href;
	
	if ((url.indexOf('page=resources',0))>=0){
	
		//******************* Page Resources *******************//
		var coutBati = new Array(new Array(60,15,0),new Array(48,24,0),new Array(225,75,0),new Array(75,30,0),new Array(900,360,180),new Array(0,2000,500),new Array(1000,0,0),new Array(1000,500,0),new Array(1000,1000,0));
		var exposant = new Array(1.5,1.6,1.5,1.5,1.8,1,2,2,2);
		
	} else if ((url.indexOf('page=research',0))>=0){
	
		//******************* Page Recherche *******************//
		var coutBati = new Array(new Array(0,800,400),new Array(200,100,0),new Array(1000,300,100),new Array(0,4000,2000),new Array(2000,4000,1000),new Array(400,0,600),new Array(2000,4000,600),new Array(10000,20000,6000),new Array(200,1000,200),new Array(0,400,600),new Array(4000,8000,4000),new Array(240,400,160),new Array(0,0,0),new Array(800,200,0),new Array(200,600,0),new Array(1000,0,0));	
		var exposant = new Array(2,2,2,2,2,2,2,2,2,2,1.75,2,3,2,2,2);
		
	} else if ((url.indexOf('page=shipyard',0))>=0){
	
		//******************* Page Chantier Spatial *******************//
		var coutBati = new Array(new Array(3000,1000,0),new Array(6000,4000,0),new Array(20000,7000,2000),new Array(45000,15000,0),new Array(30000,40000,15000),new Array(50000,25000,15000),new Array(60000,50000,15000),new Array(5000000,4000000,1000000),new Array(2000,2000,0),new Array(6000,6000,0),new Array(10000,20000,10000),new Array(10000,6000,2000),new Array(0,1000,0),new Array(0,2000,500));	
		var exposant = new Array(1,1,1,1,1,1,1,1,1,1,1,1,1,1);
		
	} else if ((url.indexOf('page=defense',0))>=0){
	
		//******************* Page Defense *******************//
		var coutBati = new Array(new Array(2000,0,0),new Array(1500,500,0),new Array(6000,2000,0),new Array(20000,15000,0),new Array(2000,6000,0),new Array(50000,50000,30000),new Array(10000,10000,0),new Array(50000,50000,0),new Array(8000,2000,0),new Array(12500,2500,10000));	
		var exposant = new Array(1,1,1,1,1,1,1,1,1,1);
		
	} else if ((url.indexOf('page=station',0))>=0){
	
		//******************* Page installations *******************//
		var coutBati = new Array(new Array(400,120,200),new Array(400,200,100),new Array(200,400,200),new Array(20000,40000,0),new Array(20000,20000,1000),new Array(1000000,500000,100000),new Array(0,50000,1000000));
	var exposant = new Array(2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2);
		
	}	
	//****************************************************************************************************
	
alert('3');
	
	var niveaux = document.getElementsByClassName('level');
	
	for(var i = 0 ; i < coutBati.length ; i++){
		textlabel = niveaux[i].getElementsByClassName('textlabel')[0];
		if(typeof(textlabel) != "undefined"){				
			n = parseFloat(niveaux[i].innerHTML.replace(textlabel.innerHTML, '').replace(/<span class="textlabel"><\/span>/i, ''));
			metal = Math.floor(coutBati[i][0] * Math.pow(exposant[i], n));
			cristal = Math.floor(coutBati[i][1] * Math.pow(exposant[i], n));
			deut = Math.floor(coutBati[i][2] * Math.pow(exposant[i], n));
			
			time = 0;
			if(metal > globalMetal){
				time = (metal - globalMetal) / prodMetal;
			}
			if(cristal > globalCristal){				
				if(time < (cristal - globalCristal) / prodCristal){
					time = (cristal - globalCristal) / prodCristal;
				}
			}
			if(deut > globalDeut){
				if(time < (deut - globalDeut) / prodDeut){
					time = (deut - globalDeut) / prodDeut;
				}
			}
			if(time != 0){
				var sec = time*3600;				
				j = Math.floor(sec / 86400);
				h = Math.floor((sec - (j * 86400)) / 3600);
				mn = Math.floor((sec - (j * 86400) - (h * 3600)) / 60);
				sec = Math.floor(sec - (j * 86400) - (h * 3600) - (mn * 60));
				
				chaine = '<span style="position:absolute;float:left;top:2px;left:0px;width:100%;text-align:center;color:white;" >';
				if(j > 0){
					chaine += j+'j ' + h+'h ' + mn+'m ' + sec+'s';
				}else{
					if(h > 0){
						chaine += h+'h ' + mn+'m ' + sec+'s';
					}else{
						if(mn > 0){
							chaine += mn+'m ' + sec+'s';
						}else{
							chaine += sec+'s';
						}
					}
				}
				chaine += '</span>';
				document.getElementsByClassName('detail_button')[i].innerHTML = chaine + document.getElementsByClassName('detail_button')[i].innerHTML;
			}
		}
	}

alert('4');

//ressources = 'Metal =';


