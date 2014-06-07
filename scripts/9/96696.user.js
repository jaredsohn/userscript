// ==UserScript==
// @name           Galaxy Marker for Ogame Redesigned
// @namespace      Vulca - Wishkas
// @version        1.9c
// @author         Vulca - Wishkas
// @description    Galaxy Marker - Multiple options marker
// @include        http://*.ogame*/game/index.php?page=galaxy*
// @include        http://*.ogame.*/game/index.php?page=messages*
// @include        http://*.ogame.*/game/index.php?page=*raidefacil=scriptOptions*
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==


if (document.getElementById('playerName') || (location.href.indexOf('page=showmessage',0))>=0) // Si c'est un univers Redesign
{ 
	var Version = '1.8c';
	
	if (navigator.userAgent.indexOf('Firefox')>-1)  {var FireFox = true; var nomScript='';}
	else 											{var FireFox = false;var nomScript='MarqueurGalaxieRedesign';}
	if (navigator.userAgent.indexOf('Opera')>-1) 	var Opera = true;
	else 											var Opera = false;
	var AJours = GM_getValue(nomScript+"aJours",true);
	
	

	if(!FireFox) 
	{
		function GM_getValue(key,defaultVal) 
		{
			var retValue = localStorage.getItem(key);
			if ( !retValue ) 
			{
				return defaultVal;
			}
			return retValue;
		}

		function GM_setValue(key,value) 
		{
			localStorage.setItem(key, value);
		}
	}
	
	function stripHTML(txt)
	{ 
		return txt.replace(/<\S[^><]*>/g, "")
	}

	function trim(string)
	{
		return string.replace(/(^\s*)|(\s*$)/g,'');
	} 
			
	function eventlist( i, galaxie , systeme, f)
	{
		document.getElementsByClassName('row')[i].getElementsByClassName(listeLettre[f])[0].addEventListener("click", function(event) 
		{		
			//var nbSauv = parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i , '4'));
			//var nbSauv = parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i+';'+f , 0));
			var nbSauv = parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i+';'+f,'0'));
			//alert(nbSauv);
			
			if(nbSauv ==1)
				{
				GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i+';'+f ,0)
				document.getElementsByClassName('row')[i].getElementsByClassName(listeLettre[f])[0].style.backgroundColor='#'+ color_inactiv[f];
				}
			else{
				GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i+';'+f ,1)
				document.getElementsByClassName('row')[i].getElementsByClassName(listeLettre[f])[0].style.backgroundColor='#'+ color_activ[f];
				}
			//if (nbSauv == f )	
			//{
			//	document.getElementsByClassName('row')[i].getElementsByClassName(listeLettre[f])[0].style.backgroundColor='#'+ color_inactiv[f];
			
			//	GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i ,'4');
			//	GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i ,newval);
			//}
			//else 
			//{
			//	if(f==0){newval=(newval+1000)};
			//	if(f==1){newval=(newval+0100)};
			//	if(f==2){newval=(newval+0010)};
			//	if(f==3){newval=(newval+0001)};
			//	document.getElementsByClassName('row')[i].getElementsByClassName(listeLettre[f])[0].style.backgroundColor='#'+ color_activ[f];
				//if(!checkMult)
				//{
				//for (var k = 0 ; k<4; k++) 
				//{
				//	if (k != f)
				//		document.getElementsByClassName('row')[i].getElementsByClassName(listeLettre[k])[0].style.backgroundColor='#'+ color_inactiv[k];
				//}
				//}
			//GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i ,f);
			//}
		}, true);
	}
	
	function eventlist1case (i ,galaxie , systeme)
	{
		document.getElementsByClassName('row')[i].getElementsByClassName('E')[0].addEventListener("click", function(event) 
		{
			var k = parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i , '4'));
	
			document.getElementsByClassName('row')[i].getElementsByClassName('E')[0].style.backgroundColor='#'+ color_activ[(k+1)%5];
			GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i ,(k+1)%5);
			
		}, true);
	}

	function change()
	{
		if(uneCase) uneCase=false;
		else uneCase = true;
		
		GM_setValue(nomScript+'affichage1case'+serveur,uneCase);
		
		var marqueur = document.getElementsByClassName('marqueur');
		var nbAsup=marqueur.length;
		for (var n = 0 ; n<nbAsup ; n++)
		{
			marqueur[0].parentNode.removeChild(marqueur[0]);
		}
	
		affiche_script() ;
	}
var url = location.href;
	if (document.getElementById('playerName'))
	{
		var serveur = url.split('/')[2];
		var numeroUni = document.getElementsByTagName('title')[0].innerHTML;	
	
		if( ! parseInt(numeroUni.replace( /[^0-9]/g, "")) > 0 )
		{
			var adress = location.href.split('/')[2].split('.');
				adress[0]='';adress[1]='';
				
			serveur = (numeroUni+'.ogame'+adress.join('.').replace( '..', ".")).toLowerCase();
		}
		
		GM_setValue(url.split('/')[2], serveur);
	}
	else var serveur = GM_getValue(url.split('/')[2], url.split('/')[2]);
	
	
	var listeOption = GM_getValue(nomScript+'option1.2'+serveur, 'B;F;A;S;FF0000;00FF00;0000FF;FFFF00;000000;000000;000000;000000;no;').split(';');
	
	var uneCase = Boolean(GM_getValue(nomScript+'affichage1case'+serveur,false));
	
	var listeLettreaff = new Array(listeOption[0],listeOption[1],listeOption[2],listeOption[3]);
	var listeLettre = new Array('B','F','A','S','0');
	
	var color_activ = new Array(listeOption[4],listeOption[5],listeOption[6],listeOption[7], listeOption[8]);
	var color_inactiv = new Array(listeOption[8],listeOption[9],listeOption[10],listeOption[11]);
	
	//listeOption[12]='yes';	
	if (listeOption[12] == 'yes') 	var checkMult = true;
	else 							var checkMult = false;
	
	
		

	
	var color_border= '#5E59A8';
	var option = true;
	

	
	// ********************** Options *******************************/
	
	if (document.getElementById('playerName'))
	{
		var aff_option ='<li><span class="menu_icon"><img class="mouseSwitch" src="http://www.vulca.projet-alternative.fr/infoCompte/image/logo.gif" rel="http://www.vulca.projet-alternative.fr/infoCompte/image/logo.gif" height="29" width="38"></span><a id="option_galax" class="menubutton " href="" accesskey="" target="_self">';
		if(serveur.indexOf('ogame.com.es')>-1) 
			{aff_option += '<span class="textlabel">Marcador Galaxia</span></a></li>';}
		else{aff_option += '<span class="textlabel">Marqueur galaxy</span></a></li>';}
					
		var sp1 = document.createElement("span");
		sp1.setAttribute("id", "option_g");
		var sp1_content = document.createTextNode('');
		sp1.appendChild(sp1_content);				
		var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
		var parentDiv = sp2.parentNode;
		parentDiv.insertBefore(sp1, sp2.nextSibling);
		var tableau = document.createElement("span");
		tableau.innerHTML = aff_option;
		document.getElementById('option_g').insertBefore(tableau, document.getElementById('option_g').firstChild);

		var optionLang = new Array('Name of the box number ', 'color of the activ box number ' , 'color of the inactiv box number ', 'allow checking more than one boxe ("yes" or "no")' );
		
		if (serveur.indexOf('ogame.fr')>-1) optionLang = new Array('Nom de la case numéro ', 'couleur de la case active numéro ' , 'couleur de la case inactive numéro ', 'Permettre de cocher plusieurs cases');
		if (serveur.indexOf('ogame.com.es')>-1) optionLang = new Array('Nombre de Opción ', 'Color Activo para Opción ' , 'Color Desactivado para Opción ', 'Permitir chequeo multiple de opciones');
		// Option du script
		var startOption = true;		
		document.getElementById('option_galax').addEventListener("click", function(event) 
		{
			if(startOption)
			{
				startOption = false;
				for (var i = 0 ; i<listeOption.length -2; i++)
				{	
					listeOption[i] = prompt(optionLang[Math.floor(i/4)] + (i%4+1), listeOption[i] );
				}
				//listeOption[12] = prompt(optionLang[3], listeOption[12] );
				GM_setValue(nomScript+'option1.2'+serveur, listeOption.join(';'));
				
			}
		}, true);	
	}
	
	
	
	function affiche_script()  
	{
		if(uneCase) var affi = ' switch<input style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_inactiv[0]+';" value="'+listeLettreaff[0]+'"  type="button"><input style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_inactiv[1]+';" value="'+listeLettreaff[1]+'" type="button"><input  style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_inactiv[2]+';" value="'+listeLettreaff[2]+'" type="button"><input style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_inactiv[3]+';" value="'+listeLettreaff[3]+'" type="button">';
		else var affi = ' switch<input style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_inactiv[0]+';"  type="button" >';
		
		
		
			var	x = document.createElement('span');
			x.innerHTML=affi;
			x.setAttribute("id","changeCase");
			x.setAttribute("style","cursor:pointer;");
			x.setAttribute("class","marqueur");
			document.getElementById('galaxyheadbg2').getElementsByTagName('th')[1].appendChild(x);		
				
		var galaxie = parseInt(document.getElementById('galaxy_input').value)-1;
		var systeme = parseInt(document.getElementById('system_input').value)-1;
	
			document.getElementById("changeCase").addEventListener("click", function(event) 
			{
				change();
			}, true);	
		
			for (var i = 0 ; i<document.getElementsByClassName('row').length ; i++)
			{
				if (document.getElementsByClassName('row')[i].getElementsByClassName('planetname')[0])
				{
					if (!uneCase)
					{
						var aff ='';
						for (var f = 0 ; f<4; f++)
						{
							//var k =parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i ,'4'));
							var k = parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i+';'+f ,'0'));
							
							//if(k == f)
							if(k == 1)
									aff += '<input class="'+listeLettre[f]+'" style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_activ[f]+';" value="'+listeLettreaff[f]+'" type="button">';
							else 	aff += '<input class="'+listeLettre[f]+'" style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px; color:#FFFFFF; background-color:#'+color_inactiv[f]+';" value="'+listeLettreaff[f]+'" type="button">';
						}				
						
						var nomPlanete = trim(stripHTML(document.getElementsByClassName('row')[i].getElementsByClassName('planetname')[0].innerHTML));
						var lengthNom = nomPlanete.length;
						if (document.getElementsByClassName('row')[i].getElementsByClassName('planetname')[0].getElementsByClassName('ajaxTips thickbox phalanxlink')[0])
							lengthNom+=2; // Si image phalange
						 
						if (lengthNom> 10) 
						{
							document.getElementsByClassName('row')[i].getElementsByClassName('planetname')[0].setAttribute("style","font-size:10px;");
						}
						if (lengthNom> 14) 
						{
							document.getElementsByClassName('row')[i].getElementsByClassName('planetname')[0].setAttribute("style","font-size:8.4px;");
						}
							
						var	y = document.createElement('span');
						y.innerHTML=aff;
						y.setAttribute("style","float:right;");
						y.setAttribute("class","marqueur");
						
						document.getElementsByClassName('row')[i].getElementsByClassName('planetname')[0].appendChild(y);
							
						eventlist(i, galaxie, systeme ,0 );
						eventlist(i, galaxie, systeme ,1 );
						eventlist(i, galaxie, systeme ,2 );
						eventlist(i, galaxie, systeme ,3 );
					
					}
					else
					{
						var info = parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i , '4'));

						//enregistrement 1.1
							if(isNaN(info)) { var L = GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i , '4'); for(var q=0 ; q<3;q++) {if ( L == listeLettre[q]) {k=q; GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+i , k);}}}
			
						
						var aff = '<input class="E" style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_activ[info]+';" value="" type="button">';
								var	y = document.createElement('span');
								y.innerHTML=aff;
								y.setAttribute("style","float:right;");
								y.setAttribute("class","marqueur");
								document.getElementsByClassName('row')[i].getElementsByClassName('planetname')[0].appendChild(y);						
								eventlist1case (i,galaxie,systeme);
					}
				}
			}
		

		// Recherche des maj
		if (!AJours && !document.getElementById('MAJ gal'))
		{
			var aff_newVersion ='<li><span class="menu_icon"><img class="mouseSwitch" src="http://vulca.evoserv.net/infoCompte/image/logo.gif" rel="http://vulca.evoserv.net/infoCompte/image/logo.gif" height="29" width="38"></span><a id="MaJ" class="menubutton " href="http://userscripts.org/scripts/source/66619.user.js" accesskey="" target="_self">';
			aff_newVersion += '<span class="textlabel">!!MaJ!! M.G.</span></a></li>';
				
			var sp1 = document.createElement("span");
			sp1.setAttribute("id", "MAJ gal");
			var sp1_content = document.createTextNode('');
			sp1.appendChild(sp1_content);				
			
			var sp2 = document.getElementById('menuTable').getElementsByTagName('li')[10];
			var parentDiv = sp2.parentNode;
			parentDiv.insertBefore(sp1, sp2.nextSibling);
			var tableau = document.createElement("span");
			tableau.innerHTML = aff_newVersion;
			document.getElementById('MAJ gal').insertBefore(tableau, document.getElementById('MAJ gal').firstChild);
			
			/* ******************************A Jours apres clique ********************************/
			document.getElementById("MaJ").addEventListener("click", function(event) 
			{
				GM_setValue(nomScript+"aJours",true);
				GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
			}, true);		
		}
	}
	function biz( galaxie,systeme,position,f , n)
	{
			document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f)[n].addEventListener("click", function(event) 
			{
				var nbRc2 = document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f).length ;
				//var k = parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+position ,'4'));
				
					
				for (var n2 = 0 ; n2 < nbRc2 ; n2++)
				{
				
					var k = parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+position+';'+f,'0'));				
					//if(k == f)
					if(k == 1)
					{	
						document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f)[n2].style.backgroundColor='#'+ color_inactiv[f];
						//GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+position ,'4');
						GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+position+';'+f ,'0');	
					}
					else 	
					{
						document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f)[n2].style.backgroundColor='#'+ color_activ[f];
						//for (var e = 0 ; e<4; e++) 
						//{
							//if (e != f)
						//	if (e != 1)
						//		document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+e)[n2].style.backgroundColor='#'+ color_inactiv[e];
						//}
						//GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+position ,f);
						GM_setValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+position+';'+f ,1);
					}
					
					
				}
			}, true);
		
		
		
	}
	
	function afficheMessage()
	{		
		var table = document.getElementsByClassName('area')[0];
		if (!table || table.getAttribute("done123111") == "done") return;
		table.setAttribute("done123111","done"); 

		var lieuCoord = document.getElementsByClassName('area');
		
		for (var i =0 ; i< lieuCoord.length ; i++)
		{
			if(lieuCoord[i].getElementsByTagName('a')[0])
			{
				var coord = lieuCoord[i].getElementsByTagName('a')[0].innerHTML;
				var galaxie = parseInt(coord.split(':')[0].replace('[','')) -1;
				var systeme = parseInt(coord.split(':')[1] ) -1;
				var position = parseInt(coord.split(':')[2].replace(']','')) -1;

				for (var f = 0 ; f<4; f++)
				{
					//var k =parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+position ,'4'));
					var k =parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+position+';'+f ,'0'));
						
					//if(k == f)
					if(k == 1)
					{
						var newElement = document.createElement("span"); // On crée un nouvelle élément div
						newElement.innerHTML = '<input class="GalMarq'+galaxie+';'+systeme+';'+position+';'+f+'"  style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_activ[f]+';" value="'+listeLettreaff[f]+'" type="button">';
						document.getElementsByClassName('area')[i].insertBefore(newElement, document.getElementsByClassName('area')[i].getElementsByTagName('a')[0]); // On l'affiche
						
						var numRc = document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f).length -1;
						biz(galaxie,systeme,position,f , numRc);
					}
					else 	
					{
					var newElement = document.createElement("span"); // On crée un nouvelle élément div
						newElement.innerHTML = '<input class="GalMarq'+galaxie+';'+systeme+';'+position+';'+f+'" style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px; color:#FFFFFF; background-color:#'+color_inactiv[f]+';" value="'+listeLettreaff[f]+'" type="button">';
						document.getElementsByClassName('area')[i].insertBefore(newElement, document.getElementsByClassName('area')[i].getElementsByTagName('a')[0]); // On l'affiche

						var numRc = document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f).length -1;
						biz( galaxie,systeme,position,f, numRc );
					}
				}
				
				var newElement = document.createElement("span"); // On crée un nouvelle élément div
					newElement.innerHTML = ' ';
					document.getElementsByClassName('area')[i].insertBefore(newElement, document.getElementsByClassName('area')[i].getElementsByTagName('a')[0]); // On l'affiche

			}
		}		
	}
	
	
	function afficheSifirst()
	{
		var table = document.getElementById('galaxyheadbg2').getElementsByTagName('th')[1];
			if (!table || table.getAttribute("done14111") == "done") return;
				table.setAttribute("done14111","done");
		

		affiche_script();
	}

	
	// Page galaxie
	if (location.href.indexOf('page=galaxy')>-1)
	{
		if(!FireFox && !Opera)
		{
			setInterval(afficheSifirst,500);
		}
		else
		{		
			function safeWrap(f) 
			{
				return function() 
				{
					setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
				};
			}
			var $; //Récupération de jQuery dans le contexte de la page
			try { $ = unsafeWindow.$; } //compatible Greasemonkey
			catch(e) { $ = window.$; } //autres navigateurs (Opera...)
			//la division dans lequel le résultat de la requête ajax est placé a l'id galaxyContent
			$("#galaxyContent").ajaxSuccess(safeWrap(function(e,xhr,settings){
				//l'url de la requête ajax contient page=galaxyContent
				if (settings.url.indexOf("page=galaxyContent") == -1) return;
				
				affiche_script();
				
			}));	
		}
	}
	
	else if (location.href.indexOf('page=messages')>-1 || (location.href.indexOf('page=showmessage',0)>=0 && document.getElementsByClassName('fragment spy2')[0]))
	{
		setInterval(afficheMessage,500);
	}
	
	
	if (location.href.indexOf('raidefacil=scriptOptions')>-1)
	{
	
		var coord = document.getElementsByClassName('coordonee');
		
		for(var i = 0 ; i< coord.length ; i++)
		{
				document.getElementsByClassName('marqueur')[i].style.width = '60px';
				var galaxie = parseInt(coord[i].getElementsByTagName('a')[0].innerHTML.split(':')[0].replace('[','')) -1;
				var systeme = parseInt(coord[i].getElementsByTagName('a')[0].innerHTML.split(':')[1] ) -1;
				var position = parseInt(coord[i].getElementsByTagName('a')[0].innerHTML.split(':')[2].replace( /[^0-9]/g, "")) -1;

				for (var f = 0 ; f<4; f++)
				{
					var k =parseInt(GM_getValue(nomScript+'infoCoord'+serveur+';'+galaxie+';'+systeme+';'+position ,'4'));
						
					if(k == f)
					{
						
						var newElement = document.createElement("span"); // On crée un nouvelle élément div
						newElement.innerHTML = '<input class="GalMarq'+galaxie+';'+systeme+';'+position+';'+f+'"  style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px;color:#FFFFFF; background-color:#'+color_activ[f]+';" value="'+listeLettreaff[f]+'" type="button">';
						document.getElementsByClassName('marqueur')[i].insertBefore(newElement, document.getElementsByClassName('marqueur')[i].getElementsByTagName('td')[0]); // On l'affiche
						
						var numRc = document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f).length -1;
						biz(galaxie,systeme,position,f , numRc)
					}
					else 	
					{
					var newElement = document.createElement("span"); // On crée un nouvelle élément div
						newElement.innerHTML = '<input class="GalMarq'+galaxie+';'+systeme+';'+position+';'+f+'" style="cursor:pointer;border: solid '+color_border+' 1px; width: 15px; color:#FFFFFF; background-color:#'+color_inactiv[f]+';" value="'+listeLettreaff[f]+'" type="button">';
						document.getElementsByClassName('marqueur')[i].insertBefore(newElement, document.getElementsByClassName('marqueur')[i].getElementsByTagName('td')[0]); // On l'affiche

						var numRc = document.getElementsByClassName('GalMarq'+galaxie+';'+systeme+';'+position+';'+f).length -1;
						biz( galaxie,systeme,position,f, numRc )
					}
				}
		}	
	}
	
	if(FireFox) 
	{
		// recherche des MaJ
		if (parseInt(GM_getValue(nomScript+"dateMaJ",0))+2 < Date.parse(new Date()) / 1000 ) 
		{
			GM_xmlhttpRequest(
					{
						method: 'GET',
						url: 'http://userscripts.org/scripts/show/66619',
						
						onload: function(response) 
						{
							var PageUserScript = response.responseText;
							
							var Derniere_Version = trim(PageUserScript.substring(PageUserScript.indexOf('<b>Version:</b>')+15, PageUserScript.indexOf('<br />', PageUserScript.indexOf('<b>Version:</b>'))));
							
							Version=Version+'';
							
							if (Derniere_Version.length < 10 && Derniere_Version.length > 2) 
							{
								if (Derniere_Version != Version ) 
								{					
									GM_setValue(nomScript+"aJours",false);
									GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
								}
								else 
								{				
									GM_setValue(nomScript+"aJours",true);
									GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
								}
							}
						}
					});	
		}
	}

}

