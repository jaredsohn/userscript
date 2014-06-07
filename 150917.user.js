// ==UserScript==

// @name        OGame Redesign : Empire Calculator
// @author      Antony
// @namespace   http://userscripts.org/users/useridnumber

// @include     http://uni*.ogame.*/game/index.php?page=*
// @exclude     http://uni*.ogame.*/game/index.php?page=message*

// @version     1.0

// ==/UserScript==


		var Version = '1.0';
		var start_time = (new Date()).getTime();
		var nomScript = 'Empire Calculator';
		var start_time = (new Date()).getTime();
		
		var pseudo   = document.getElementsByName('ogame-player-name')[0].content;
		var IdJoueur = document.getElementsByName('ogame-player-id')[0].content;
		var serveur  = document.getElementsByName('ogame-universe')[0].content;
		var domain   = '.ogame'+serveur.split('ogame')[1];
		var numeroUni = document.getElementsByTagName('title')[0].innerHTML;	
		
		var metal_res = document.getElementById('resources_metal').innerHTML.replace( /[^0-9-]/g, "") ;
		var cristal_res = document.getElementById('resources_crystal').innerHTML.replace( /[^0-9-]/g, "") ;
		var deut_res = document.getElementById('resources_deuterium').innerHTML.replace( /[^0-9-]/g, "");
				
		var planets = document.getElementById("rechts").getElementsByClassName("smallplanet");
		var IsMoon  = document.getElementsByName('ogame-planet-type')[0].content == 'moon' ;
		
		var numeroplanete = 0;
		var nbLune = 0;
		var testlabelPlanet = 'planetlink active tooltipRight js_hideTipOnMobile';;
		var testlabelLune = 'moonlink active';
		
		for ( var i=0; i < planets.length ; i++)
		{				
			// Planet active
			if( planets[i].innerHTML.indexOf(testlabelPlanet) > -1 || planets[i].innerHTML.indexOf(testlabelLune) > -1) // Si planete active
			{				
				var coord = document.getElementsByClassName('planet-koords')[i].innerHTML;	
				//alert(coord);
				if (IsMoon)
				{
					var coord = 'L'+document.getElementsByClassName('planet-koords')[i].innerHTML;
					//alert(coord);
				}
			}
		}

		
/*		for ( var i=0; i < document.getElementsByClassName('planet-koords').length ; i++) 
		{
			var test = planets[i].innerHTML.replace( /[^0-9<]/g, "").split("<");
			if ( test.length != 11 ) {}
			else {
				var num_lune = test[9].split("16")[0];
				GM_setValue('num_lune'+i+serveur+pseudo, num_lune)
			}
		}*/
		
		
		
		
		GM_setValue('resPla'+coord+serveur, start_time+'|'+metal_res+'|'+cristal_res+'|'+deut_res );	
		// alert(GM_getValue('resPla'+coord+serveur, '0')); // if ( id('planet').id('planet_as_moon') )
		
		/*****************************************************   Les fonctions de bases  **********************************************************/

		function addPoints(nombre) // il s'agit d'un séparateur de millier  ==> by Vulca <==
		{
			var signe = '';
			if (nombre<0)
			{
				nombre = Math.abs(nombre);
				signe = '-';
			}
			nombre=parseInt(nombre);
			var str = nombre.toString(), n = str.length;
			if (n <4) {return signe + nombre;}
			else
			{
			return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
			}
		}
		
		function color_background_input() 
		{
			for ( var i=0; i < document.getElementsByClassName('couleur').length ; i++ )
			{document.getElementsByClassName('couleur')[i].style.background = '#'+document.getElementsByClassName('couleur')[i].value}
			for ( var i=0; i < document.getElementsByClassName('qte_x').length ; i++ )
			{document.getElementsByClassName('qte_x')[i].style.color = '#'+document.getElementsByClassName('couleur')[i].value}
		}
		
		function fadeBoxx(message, failed, temps) // Il s'agit d'affiché un message de façon temporaire sur la page  ==> by Snaquekiller <==
		{	
					/*var $; 
					try { $ = unsafeWindow.$; } 
					catch(e) { $ = window.$; } 
					
					var unsafe = window;
					try {unsafe = unsafeWindow} catch (e) {}
					unsafe.tb_remove();

					if (failed)
					{
						$("#fadeBoxStyle").attr("class", "failed");
					}
					else
					{
						$("#fadeBoxStyle").attr("class", "success");
					}
						$("#fadeBoxContent").html(message);
						$("#fadeBox").stop(false, true).show().fadeOut(temps);*/
		}
		
		function trim(string)
		{
			return string.replace(/(^\s*)|(\s*$)/g,'');
		} 
		
		function oui_non_en_checked(oui_non)
		{
			if (oui_non == "true" || oui_non == true ) {return "checked";} else {return "unchecked";}
		}

		function decheck(check)
		{
			return "unchecked"; //if (check == 'checked') return "unchecked"; else return "checked";
		}
		
		
		function enreg_option_all()
		{
			fadeBoxx('Options enregistrés', 0, 5000);
			var Ch_Options = new Array();
			var Block = document.getElementsByClassName('ORCOptions_check');
				for (var f=0 ; f < Block.length ; f++ )
					{
						Ch_Options[parseInt(Block[f].alt)] = oui_non_en_checked(Block[f].checked)
					}
					GM_setValue('options_check'+serveur+pseudo, Ch_Options.join(';')+';');
					
			
			var Option_check_Sauvegarde = GM_getValue('options_check'+serveur+pseudo, ';checked;unchecked;unchecked;checked;checked;checked;unchecked;'); // Prod totale + nb gt (add last option)
			var Option_check = Option_check_Sauvegarde.split(/;/);  //var option_check1 = Option_check[1];alert(option_check1);
			
			if ( Option_check[3] == 'checked' )
			{
				GM_deleteValue('r_nbr_m'+serveur+pseudo);
				GM_deleteValue('r_nbr_c'+serveur+pseudo);
				GM_deleteValue('r_nbr_d'+serveur+pseudo);
				GM_deleteValue('r_date_m'+serveur+pseudo);
				GM_deleteValue('r_date_c'+serveur+pseudo);
				GM_deleteValue('r_date_d'+serveur+pseudo);
			}
			var nbr_p_modif = document.getElementsByClassName('nbr_p')[0].value;
			if (nbr_p_modif.replace( /[^0-9-]/g, "")==0){}
			else
			{
				GM_setValue('nbr_p_save'+serveur+pseudo, nbr_p_modif); // enregistre
			}
			
			var Qte_n_Options = new Array();
			var Block2 = document.getElementsByClassName('nbr_n');
				for (var i=0 ; i < Block2.length ; i++ )
				{
					Qte_n_Options[parseInt(Block2[i].alt)] = Block2[i].value.replace( /[^0-9-]/g, "");
				}
				GM_setValue('nbr_n_save'+serveur+pseudo, Qte_n_Options.join(';')+';');
			
			var Qte_i_Options = new Array();
			var Block2 = document.getElementsByClassName('nbr_i');
				for (var i=0 ; i < Block2.length ; i++ )
				{
					Qte_i_Options[parseInt(Block2[i].alt)] = Block2[i].value.replace( /[^0-9-]/g, "");
				}
				GM_setValue('nbr_i_save'+serveur+pseudo, Qte_i_Options.join(';')+';');    // alert(Qte_i_Options.join(';')+';');

			var Co_Options = new Array();
			var Block2 = document.getElementsByClassName('couleur');
				for (var i=0 ; i < Block2.length ; i++ )
				{
					Co_Options[parseInt(Block2[i].alt)] = Block2[i].value;
				}
				GM_setValue('options_color'+serveur+pseudo, Co_Options.join(';')+';');    //alert(COptions.join(';')+';');
		}

		function enreg_option_nbr_p()
		{
			var nbr_p_modif = document.getElementsByClassName('nbr_p')[0].value;
			if (nbr_p_modif.replace( /[^0-9-]/g, '') == 0)
			{
				fadeBoxx('Entrez uniquement des chiffres !', 1, 5000);
			}
			else if (nbr_p_modif == GM_getValue('nbr_p_save'+serveur+pseudo , ''))
			{
				fadeBoxx('Nombre de planète identique au précédent !', 1, 5000);
			}
			else
			{
				GM_setValue('nbr_p_save'+serveur+pseudo, nbr_p_modif) // enregistre
				fadeBoxx('Nombre de planète enregistré avec succès !', 0, 5000);
			}
		}
		
		function display()
		{
			var Option_check = GM_getValue('options_check'+serveur+pseudo, ';checked;unchecked;unchecked;checked;checked;checked;unchecked;').split(/;/); // Prod totale + nb gt (add last option)
			/*if (  id('TITRE_OPTIONS').style.display == '' )
				{
					if (!id(prix_m)){}
					else if ( id(prix_m) =! 0 )
					{
						var prix = id(prix_m)/9
						alert(prix)
					}
				}*/
			var cellule = [id('TITRE_SCRIPT'), id('CORPS_SCRIPT'), id('TITRE_OPTIONS'), id('CORPS_OPTIONS')];
			
			for ( var i = 0 ; i < cellule.length ; i++ )
				{
					if (cellule[i].style.display == 'none')
					{
						cellule[i].style.display = '';
					}
					else
					{
						cellule[i].style.display = 'none';
					}
				}
			if ( id('TITRE_SCRIPT').style.display == '' )
				{
					active_interval(EmpireCalculator, 2000);
				}
			else
				{
					stop_interval(EmpireCalculator, 2000);
				}
		}
		
		function active_interval(fonction, time)
		{
			if ( interval_EmpireCalculator == "" )
			{
				interval_EmpireCalculator = setInterval(fonction, time);
			}
		}
		
		function stop_interval(fonction, time)
		{
			if ( interval_EmpireCalculator != "" )
			{
				clearInterval(interval_EmpireCalculator);
				interval_EmpireCalculator = "";
				//alert('inactive');
			}
		}
		
		function active_clic()
		{
			/*************   Fonction à faire lors d'un clic   **********/

			id('OPEN_OPTIONS').addEventListener("click", function(event)
				{
					display();
				}, true);
			id('ESC_OPTIONS').addEventListener("click", function(event)
				{
					display();
				}, true);
			id('CLOSE_OPTIONS').addEventListener("click", function(event)
				{
					display();
				}, true);
			id('enreg_modif_nbr_p').addEventListener("click", function(event)
				{
					enreg_option_nbr_p();
				}, true);
			id('enreg_options').addEventListener("click", function(event)
				{
					enreg_option_all();
				}, true);	
			id('TITLE_RECORDS').addEventListener("mouseover", function(event)
				{
					stop_interval(EmpireCalculator, 2000);
				},true);
			id('OPEN_OPTIONS').addEventListener("mouseover", function(event)
				{
					stop_interval(EmpireCalculator, 2000);
				},true);
			id('last_version').addEventListener("mouseover", function(event)
				{
					stop_interval(EmpireCalculator, 2000);
				},true);
			id('CORPS_SCRIPT').addEventListener("mouseover", function(event)
				{
					active_interval(EmpireCalculator, 2000);
				},true);
			if ( id('gif_de_danger') )
			{
			id('gif_de_danger').addEventListener("mouseover", function(event)
				{
					stop_interval(EmpireCalculator, 2000);
				},true);
			id('gif_de_danger2').addEventListener("mouseover", function(event)
				{
					stop_interval(EmpireCalculator, 2000);
				},true);
			}
			if ( id('MaJ') )
			{
			/* ******************************A Jours apres clique ********************************/
			id('MaJ').addEventListener("click", function(event) 
				{
					GM_setValue(nomScript+"aJours",true);
					GM_setValue(nomScript+"dateMaJ",Date.parse(new Date()) / 1000);
				}, true);
			}
			if ( id('Nouvelle MaJ Dispo') )
			{
			id('Nouvelle MaJ Dispo').addEventListener("mouseover", function(event)
				{
					stop_interval(EmpireCalculator, 2000);
				},true);
			}
		}
		
		function id(nom_id)
		{
			var d_gEBI = document.getElementById(nom_id);
			return d_gEBI;
		}

	
	function EmpireCalculator() // Cette fonction fait les calculs et s'occupe de l'affichage des variables
	{
		
		/*****************************************************   Mise à jour des données   ********************************************************/
		
		var cl = ["7FFF00", "FFA500", "DC143C", "6F9FC8", "000000", "008000"]; // Vert clair, orange, rouge, bleu ciel#3B4FD2, noir, ...
		// ... vert foncé. (Vous pouvez changer les couleurs à votre guise)
		var Option_check = GM_getValue('options_check'+serveur+pseudo, ';checked;unchecked;unchecked;checked;checked;checked;unchecked;').split(/;/); // // Prod totale + nb gt (add last option)
		var option_color = GM_getValue('options_color'+serveur+pseudo, ';7FFF00;FFA500;DC143C;').split(/;/);
		
		if (id('newDivIFC'))
		{
		var start_time = (new Date()).getTime();
		var DATA = unsafeWindow.ifcDATA;
		var numPla = DATA.info.numeroPlanete;
		
		var totMet = 0;
		var totCri = 0;
		var totDeut = 0;	
		var table = "<tr style='height: 5px;'></tr>";
		
		// Prod totale
		prodTotMet = 0;
		prodTotCry = 0;
		prodTotDeut = 0;
		
		var f=0	;
		
		for ( var i=0; i< DATA.planet.length; i++) 
		{		
			var coord = document.getElementsByClassName('planet-koords')[f].innerHTML;
			if (i < DATA.planet.length -1)
			{
				if (DATA.planet[i+1].moon == 'false') f++;
			}

			if (DATA.planet[i].moon == 'false') 
			{
				var res = GM_getValue('resPla'+coord+serveur, start_time+'|0|0|0' ).split('|');
				var nivCEF = DATA.planet[i].building['cef'] ;
				
				var capa = new Array (Math.floor(2.5*Math.exp((20 * DATA.planet[i].building.hmet / 33))) * 5000,
						+ Math.floor(2.5*Math.exp((20 * DATA.planet[i].building.hcri / 33))) * 5000,
						+ Math.floor(2.5*Math.exp((20 * DATA.planet[i].building.hdet / 33))) * 5000 );
				var newRes = new Array( (start_time-res[0])/(1000*3600)*DATA.planet[i].resource.prod.m ,
						+ (start_time-res[0])/(1000*3600)*DATA.planet[i].resource.prod.c,
						+ (start_time-res[0])/(1000*3600)*(DATA.planet[i].resource.prod.d));
				
				// Prod totale
				prodTotMet += DATA.planet[i].resource.prod.m;
				prodTotCry += DATA.planet[i].resource.prod.c;
				prodTotDeut += DATA.planet[i].resource.prod.d;
				
				var trop = new Array('color:#FF0000;', 'color:#FF0000;','color:#FF0000;');
				var Met = parseInt(res[1]);
				if (Met+newRes[0] < capa[0] ) {Met+= newRes[0]; trop[0]='';}
				else if (Met < capa[0]) Met= capa[0];
				
				var Cri = parseInt(res[2]) ;
				if (Cri+newRes[1] < capa[1] ) {Cri+= newRes[1]; trop[1]='';}
				else if (Cri < capa[1]) Cri= capa[1];
					
				var Deut = parseInt(res[3]) ;
				if (Deut+newRes[2] < capa[2] ) { Deut+= newRes[2]; trop[2]='';}
				else if (Deut < capa[2]) Deut= capa[2];
				
				var nbGt = Math.ceil(( parseInt(Met) + parseInt(Cri) + parseInt(Deut) ) / 25000); // Nb gt
				
				var info_planet = DATA.planet[i].name.split('[');
				var nom_planet = info_planet[0];
				var coord_planet = '['+info_planet[1];
				table +="<tr>"
					  +		"<td style='width:8px;'></td>"
					  +		"<td style='border:1px solid black;'><font color=#"+cl[3]+">"+nom_planet+"</font></td>"
					  +		"<td style='border:1px solid black;'><font color=#"+cl[3]+">"+coord_planet+"</td>"
					  +		( (Option_check[7] == 'checked') ? "<td style='border:1px solid black;'><font>"+addPoints(nbGt)+"</td>" : "" ) // Nb gt
					  + 	"<td style='"+trop[0]+";border:1px solid black;'>"+addPoints(Met)+"</td>"
					  + 	"<td style='"+trop[1]+";border:1px solid black;'>"+addPoints(Cri)+"</td>"
					  +		"<td style='"+trop[2]+";border:1px solid black;'>"+addPoints(Deut)+"</td>"
					  + "</tr>"
					
				totMet += Met;
				totCri += Cri ;
				totDeut += Deut;
					
				//	alert(parseInt(res[1]) +'  '+ (start_time-res[0])/(1000*3600)*DATA.planet[i].resource.prod.m );
			}
			
			else 
			{
				if ( n != null ) { var n = n + 1 }
				else { var n = 0 }
				coord = 'L'+coord;
					
				var res = GM_getValue('resPla'+coord+serveur, start_time+'|0|0|0' ).split('|');
				var info_lune = DATA.planet[i].name.split('[');
				var nom_lune = info_lune[0];
				var coord_lune = '['+info_lune[1];
				
				var numéro_lune = GM_getValue('num_lune'+n+serveur+pseudo, '2');
				
				var nbGt = Math.ceil(( parseInt(res[1]) + parseInt(res[2]) + parseInt(res[3]) ) / 25000); // Nb gt
				
				table += "<tr style='font-size:10px';>"
					  +		"<td style='width:8px;'></td>"
					  +		"<td style='border:1px solid black;"
					  +		"background-image: url(http://uni63.ogame.fr/game/img/planets/moon/moon_"+numéro_lune+"_small.gif);"
					  +			"background-repeat:no-repeat;background-position:right;padding-right: 15px;'>"
					  +			"<font color=#"+cl[3]+">"+nom_lune+"</font>"
					  +		"</td>"
					  +		"<td style='border:1px solid black;'><font color=#"+cl[3]+">"+coord_lune+"</td>"
					  +		( (Option_check[7] == 'checked') ? "<td style='border:1px solid black;'><font>"+addPoints(nbGt)+"</td>" : "" ) // Nb gt
					  +		"<td style='color:#FFFFFF;border:1px solid black;'>"+addPoints(res[1])+"</td>"
					  +		"<td style='color:#FFFFFF;border:1px solid black;'>"+addPoints(res[2])+"</td>"
					  +		"<td style='color:#FFFFFF;border:1px solid black;'>"+addPoints(res[3])+"</td>"
					  +  "</tr>"
				
				if ( Option_check[5] == 'checked' )
				{
					totMet += parseInt(res[1]);
					totCri += parseInt(res[2]);
					totDeut += parseInt(res[3]);
				}
			}
		}
				  
		GM_setValue('nbr_m'+serveur+pseudo, addPoints(totMet))
		GM_setValue('nbr_c'+serveur+pseudo, addPoints(totCri))
		GM_setValue('nbr_d'+serveur+pseudo, addPoints(totDeut))
		
		var nbr_metal = GM_getValue('nbr_m'+serveur+pseudo , '1');
		var nbr_cristal = GM_getValue('nbr_c'+serveur+pseudo , '1');
		var nbr_deut = GM_getValue('nbr_d'+serveur+pseudo , '1');
		
		var nbr_p = GM_getValue('nbr_p_save'+serveur+pseudo, 1);
		var metal = Math.round(parseInt(nbr_metal.replace( /[^0-9-]/g, "")) / nbr_p); // A partir de la var "nbrmetal", on garde ...
		// ... uniquement les chiffres, on transforme ensuite en nombre, on divise par 9, on arrondi à l'entier le plus proche et ...
		// ... enfin on utilise le séparateur de millier
		var cristal = Math.round(parseInt(nbr_cristal.replace( /[^0-9-]/g, "")) / nbr_p); // De même pour le cristal
		var deut = Math.round(parseInt(nbr_deut.replace( /[^0-9-]/g, "")) / nbr_p); // De même pour le deut
		
		var nbr_i = GM_getValue('nbr_i_save'+serveur+pseudo, ';6000000;4000000;2000000;').split(/;/);
		var nbr_i_m = parseInt(nbr_i[1]);
		var nbr_i_c = parseInt(nbr_i[2]);
		var nbr_i_d = parseInt(nbr_i[3]);
		
		var nbr_n = GM_getValue('nbr_n_save'+serveur+pseudo, ';3000000;2000000;1000000;').split(/;/);
		var nbr_n_m = parseInt(nbr_n[1]);
		var nbr_n_c = parseInt(nbr_n[2]);
		var nbr_n_d = parseInt(nbr_n[3]);
		
		if (parseInt(nbr_metal.replace( /[^0-9-]/g, "")) >= nbr_i_m ) // Si le nombre de metal total dépasse 18.000.000
			{var clm = option_color[3]} // La var clm (couleur metal) sera cl [2] soit du rouge
		else if (parseInt(nbr_metal.replace( /[^0-9-]/g, "")) >= nbr_n_m ) // Sinon si le nombre de metal total dépasse 14.000.000
			{var clm = option_color[2]} // La var clm (couleur metal) sera cl [1] soit du orange
		else // Sinon
			{var clm = option_color[1]} // La var clm (couleur metal) sera cl [0] soit du vert
		if (parseInt(nbr_cristal.replace( /[^0-9-]/g, "")) >= nbr_i_c )
			{var clc = option_color[3]}
		else if (parseInt(nbr_cristal.replace( /[^0-9-]/g, "")) >= nbr_n_c )
			{var clc = option_color[2]}
		else
			{var clc = option_color[1]}
		if (parseInt(nbr_deut.replace( /[^0-9-]/g, "")) >= nbr_i_d )
			{var cld = option_color[3]}
		else if (parseInt(nbr_deut.replace( /[^0-9-]/g, "")) >= nbr_n_d )
			{var cld = option_color[2]}
		else
			{var cld = option_color[1]}
		
		var Clock = id("bar").innerHTML.split("OGameClock")[1];
		var date = Clock.split("<span>")[0].split('">')[1];
		var heure = Clock.split("<span>")[1].split("</span>")[0];

		var r_nbr_m_Enregistre = GM_getValue('r_nbr_m'+serveur+pseudo , '1');
		if (parseInt(nbr_metal.replace( /[^0-9-]/g, ""))>parseInt(r_nbr_m_Enregistre.replace( /[^0-9-]/g, "")))
		{
			var r_date_m_Enregistre = date+"à "+heure;
				GM_setValue('r_date_m'+serveur+pseudo, r_date_m_Enregistre) // enregistre
			var r_nbr_m_Enregistre = nbr_metal;
				GM_setValue('r_nbr_m'+serveur+pseudo, r_nbr_m_Enregistre)
		}

		var r_nbr_c_Enregistre = GM_getValue('r_nbr_c'+serveur+pseudo , '1');
		if (parseInt(nbr_cristal.replace( /[^0-9-]/g, ""))>parseInt(r_nbr_c_Enregistre.replace( /[^0-9-]/g, "")))
		{
			var r_date_c_Enregistre = date+"à "+heure;
				GM_setValue('r_date_c'+serveur+pseudo, r_date_c_Enregistre)
			var r_nbr_c_Enregistre = nbr_cristal;
				GM_setValue('r_nbr_c'+serveur+pseudo, r_nbr_c_Enregistre)
		}

		var r_nbr_d_Enregistre = GM_getValue('r_nbr_d'+serveur+pseudo , '1');
		if (parseInt(nbr_deut.replace( /[^0-9-]/g, ""))>parseInt(r_nbr_d_Enregistre.replace( /[^0-9-]/g, "")))
		{
			var r_date_d_Enregistre = date+"à "+heure;
				GM_setValue('r_date_d'+serveur+pseudo, r_date_d_Enregistre)
			var r_nbr_d_Enregistre = nbr_deut;
				GM_setValue('r_nbr_d'+serveur+pseudo, r_nbr_d_Enregistre)
		}
		
		var records = '|<font color=#'+cl[3]+'>Records de : <br></font>'
					+  '<font color=#'+cl[3]+'>¤ Métal : </font><font color=#'+cl[1]+'>'+GM_getValue('r_nbr_m'+serveur+pseudo , 1)+'</font>'
					+  '<font color=#'+cl[5]+'> le '+GM_getValue('r_date_m'+serveur+pseudo , '01/01/2011 à 10:10:10')+'</font><br>'
					+  '<font color=#'+cl[3]+'>¤ Cristal : </font><font color=#'+cl[1]+'>'+GM_getValue('r_nbr_c'+serveur+pseudo , 1)+'</font>'
					+  '<font color=#'+cl[5]+'> le '+GM_getValue('r_date_c'+serveur+pseudo , '01/01/2011 à 10:10:10')+'</font><br>'
					+  '<font color=#'+cl[3]+'>¤ Deut : </font><font color=#'+cl[1]+'>'+GM_getValue('r_nbr_d'+serveur+pseudo , 1)+'</font>'
					+  '<font color=#'+cl[5]+'> le '+GM_getValue('r_date_d'+serveur+pseudo , '01/01/2011 à 10:10:10')+'</font>'
		
		if ( Option_check[1] != 'checked' )
		{
			var table = '';
		}
		
		if ( Option_check[2] == 'checked' )
		{
			var r_d_m = GM_getValue('r_date_m'+serveur+pseudo , '01.01.2011 à 10:10:10').split('à');
			var r_d_c = GM_getValue('r_date_c'+serveur+pseudo , '01.01.2011 à 10:10:10').split('à');
			var r_d_d = GM_getValue('r_date_d'+serveur+pseudo , '01.01.2011 à 10:10:10').split('à');
			var aff_records = "<tr style='height: 5px'></tr>"
							+ "<tr style='height: 25px'>"
							+	"<td rowspan='3' style='width:8px;'>"
							+	"<td colspan='2'  style='border:1px solid black;'><font color=#"+cl[3]+">"
							+		"Records de l'Empire :</font></td>"
							+	"<td style='color:#"+cl[1]+";border:1px solid black;'>"+GM_getValue('r_nbr_m'+serveur+pseudo , 1)+"</td>"
							+	"<td style='color:#"+cl[1]+";border:1px solid black;'>"+GM_getValue('r_nbr_c'+serveur+pseudo , 1)+"</td>"
							+	"<td style='color:#"+cl[1]+";border:1px solid black;'>"+GM_getValue('r_nbr_d'+serveur+pseudo , 1)+"</td>"
							+ "</tr>"
							+ "<tr style='height: 15px'>"
							+	"<td colspan='2' style='border:1px solid black;'><font color=#"+cl[3]+">Atteints le :</font></td>"
							+	"<td style='color:#"+cl[5]+";border:1px solid black;'>"+r_d_m[0]+"</td>"
							+	"<td style='color:#"+cl[5]+";border:1px solid black;'>"+r_d_c[0]+"</td>"
							+	"<td style='color:#"+cl[5]+";border:1px solid black;'>"+r_d_d[0]+"</td>"
							+ "</tr>"
							+ "<tr style='height: 15px'>"
							+	"<td colspan='2' style='border:1px solid black'><font color=#"+cl[3]+">à :</font></td>"
							+	"<td style='color:#"+cl[5]+";border:1px solid black;'>"+r_d_m[1]+"</td>"
							+	"<td style='color:#"+cl[5]+";border:1px solid black;'>"+r_d_c[1]+"</td>"
							+	"<td style='color:#"+cl[5]+";border:1px solid black;'>"+r_d_d[1]+"</td>"
							+ "</tr>"
		}
		else
		{
			var aff_records = '';
		}
		
		if ( Option_check[4] == 'checked' )
		{
			if ( clm == option_color[3] || clc == option_color[3] || cld == option_color[3] )
			{
				if ( !id('gif_de_danger') )
				{
					var gif_danger = ["<img id=gif_de_danger title='|ATTENTION TROP DE RESSOURCES !' src='./img/galaxy/activity.gif'>",
								  "<img id=gif_de_danger2 title='|ATTENTION TROP DE RESSOURCES !' src='./img/galaxy/activity.gif'>"];
				}
				else
				{
					var gif_danger = ['',''];
				}
			}
			else
			{
				var gif_danger = ['',''];
			}
		}
		else
		{
			var gif_danger = ['',''];
		}
		
		// Start Prod totale
		if ( Option_check[6] == 'checked' )
		{
			var r_d_m = GM_getValue('r_date_m'+serveur+pseudo , '01.01.2011 à 10:10:10').split('à');
			var r_d_c = GM_getValue('r_date_c'+serveur+pseudo , '01.01.2011 à 10:10:10').split('à');
			var r_d_d = GM_getValue('r_date_d'+serveur+pseudo , '01.01.2011 à 10:10:10').split('à');
			var aff_prod_tot = "<tr style='height: 5px'></tr>"
							+ "<tr style='height: 25px'>"
							+	"<td rowspan='3' style='width:8px;'>"
							+	"<td colspan='" + ( (Option_check[7] == 'checked') ? 3 : 2 ) + "'  style='border:1px solid black;'><font color=#"+cl[3]+">" // Ng gt
							+		"Production totale par heure :</font></td>"
							+	"<td style='border:1px solid black;'>"+addPoints(prodTotMet)+"</td>"
							+	"<td style='border:1px solid black;'>"+addPoints(prodTotCry)+"</td>"
							+	"<td style='border:1px solid black;'>"+addPoints(prodTotDeut)+"</td>"
							+ "</tr>"
							+ "<tr style='height: 15px'>"
							+	"<td colspan='" + ( (Option_check[7] == 'checked') ? 3 : 2 ) + "' style='border:1px solid black;'><font color=#"+cl[3]+">Production totale par jour :</font></td>" // Nb gt
							+	"<td style='border:1px solid black;'>"+addPoints(prodTotMet*24)+"</td>"
							+	"<td style='border:1px solid black;'>"+addPoints(prodTotCry*24)+"</td>"
							+	"<td style='border:1px solid black;'>"+addPoints(prodTotDeut*24)+"</td>"
							+ "</tr>"
							+ "<tr style='height: 15px'>"
							+	"<td colspan='" + ( (Option_check[7] == 'checked') ? 3 : 2 ) + "' style='border:1px solid black'><font color=#"+cl[3]+">Production totale par semaine :</font></td>" // Nb gt
							+	"<td style='border:1px solid black;'>"+addPoints(prodTotMet*168)+"</td>"
							+	"<td style='border:1px solid black;'>"+addPoints(prodTotCry*168)+"</td>"
							+	"<td style='border:1px solid black;'>"+addPoints(prodTotDeut*168)+"</td>"
							+ "</tr>"
		}
		else
		{
			var aff_prod_tot = '';
		}
		// End Prod totale
		
		/**************************************************   Recherche de MaJ by Vulca   ********************************************************/
		/*if ( parseInt(GM_getValue(nomScript+"dateMaJ",0)) < Date.parse(new Date()) / 1000 ) 
			{
				//alert('recherche maj');
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/102627.meta.js',
					
					onload: function(response) 
					{
						var PageUserScript = response.responseText;
						
						var Derniere_Version = trim(PageUserScript.split('@version')[1].split('// @author')[0]);
						Version=Version+'';
							
						if (Derniere_Version.length < 10 && Derniere_Version.length > 2 ) // Verifie site pas down
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
		
		if ( GM_getValue(nomScript+"aJours") == false )
		{
			var stylenew = '';
			var affiche = '';	
			affiche	+="<tr style='height: 5px'></tr>"
					+"<tr id='Nouvelle MaJ Dispo' style='height: 55px'>"
					+	"<td></td>"
					+	"<td style='border:1px solid black;'><img src='http://uni42.ogame.org/game/img/icons/exclaim-red.gif'></td>"
					+	"<td colspan='3' id='MaJ' style='border:1px solid black;'>"
					+		"Il y a une nouvelle version disponible :</br>"
					+		"<font size='1'>"
					+		"- Icônes lunes correspondants au compte</br></font>"
					+		"<a href='http://userscripts.org/scripts/source/102627.user.js'>Cliquez ici pour l\'installer</a>"
					+	"</td>"
					+	"<td style='border:1px solid black;'><img src='http://uni42.ogame.org/game/img/icons/exclaim-red.gif'></td>"
					+"</tr>"		
		}
		else { var affiche = ''; }*/
		var affiche = '';
		
		/***************************************************   Affichage des données   ************************************************************/
		
		tableau.setAttribute("style", "text-align:center;font-size:12px;font-weight:400;line-height:20px;");
		tableau.innerHTML = "<br><TABLE id=HEADER style=\"background-image: url('http://gf3.geo.gfsrv.net/cdn8f/62eceae400fa8116762698d86f12c9.gif');width: 670px;\">"
							+"<TR id=TITRE_SCRIPT class=TITRE>"
								+"<td style='width:50px;'>"
									+"<img id=TITLE_RECORDS title='"+records+"' style='cursor:pointer;float:left;"
									+"margin-top:2px;position:relative;margin-left:36px;' src=http://files.codes-sources.com/bfile/ViewSourceBIN.ashx?ID=21501&f=Quotes%5Cicones%5Cfermer.ico>"
								+"</td>"
								+"<td style='color:#"+cl[3]+";line-height:23px;vertical-align:middle;width:610px;font-weight:bold;font-size:11px;"
									+"padding-top:1px;'>"+gif_danger[0]+" RESSOURCES DE L'EMPIRE "+gif_danger[1]
								+"</td>"
								+"<td style='width:50px;'>"
									+"<img id=OPEN_OPTIONS title='|OUVRIR LES OPTIONS' style='cursor:pointer;float:right;position:relative;"
									+"margin-top:2px;margin-right:36px;' src=http://gf3.geo.gfsrv.net/cdne7/1f57d944fff38ee51d49c027f574ef.gif>"
								+"</td>"
							+"</TR>"
						+"</TABLE>"
						+"<TABLE id=CORPS_SCRIPT class=CALCUL style=\"background-image: url('http://gf1.geo.gfsrv.net/cdn03/db530b4ddcbe680361a6f837ce0dd7.gif');"
									+"width: 670px;vertical-align: baseline;\">"
							+"<tr style='height:5px'></tr>"
							+"<tr class=TypesRes style='height: 40px;'>"
								+"<td rowspan='3' style='width:8px;'></td>"
								+"<td style='width:153px;'></td>"
								+"<td style='width:76px;'></td>"
								+	( (Option_check[7] == 'checked') ? "<td style='border:1px solid black;'>Nb GT</td>" : "" ) // Nb gt
								+"<td style='width:134px;border:1px solid black;'><img border=0 src=http://gf3.geo.gfsrv.net/cdn59/ccdb3fc0cb8f7b4fc8633f5f5eaa86.gif></td>"
								+"<td style='width:134px;border:1px solid black;'><img border=0 src=http://gf2.geo.gfsrv.net/cdna9/452d7fd11d754e0f09ec2b2350e063.gif></td>"
								+"<td style='width:134px;border:1px solid black;'><img border=0 src=http://gf1.geo.gfsrv.net/cdn9c/e37d45b77518ddf8bbccd5e772a395.gif></td>"
								+"<td rowspan='3' style='width:10px;'></td>"
							+"</tr>"
							+"<tr class=AllRes style='height: 25px;'>"
								+"<td colspan='2' style='border:1px solid black;'><font color=#"+cl[3]+">"
									+"Total des ressources :</font></td>"
								+ ( (Option_check[7] == 'checked') ? "<td style='border:1px solid black;'>"+addPoints(Math.ceil((totMet + totCri + totDeut) / 25000))+"</td>" : "" )// Nb gt
								+"<td style='border:1px solid black;'><font color=#"+clm+">"+addPoints(totMet)+"</font></td>"
								+"<td style='border:1px solid black;'><font color=#"+clc+">"+addPoints(totCri)+"</font></td>"
								+"<td style='border:1px solid black;'><font color=#"+cld+">"+addPoints(totDeut)+"</font></td>"
							+"</tr>"
							+"<tr class=Moy/P style='height: 25px;'>"
								+"<td colspan='2' style='border:1px solid black;'><font color=#"+cl[3]+">"
									+"Moyenne par planète :</font></td>"
								+ ( (Option_check[7] == 'checked') ? "<td style='border:1px solid black;'>"+addPoints(Math.ceil((metal + cristal + deut) / 25000))+"</td>" : "" )// Nb gt
								+"<td style='border:1px solid black;'><font color=#"+clm+">"+addPoints(metal)+"</font></td>"
								+"<td style='border:1px solid black;'><font color=#"+clc+">"+addPoints(cristal)+"</font></td>"
								+"<td style='border:1px solid black;'><font color=#"+cld+">"+addPoints(deut)+"</font></td>"
							+"</tr>"
							+table
							+aff_records
							+aff_prod_tot // Prod totale
							+affiche
							+"<tr style='height:5px'></tr>"
						+"</TABLE>"
		
		/************************************   Options à afficher après un clic sur l'icone paramètre   ******************************************/
			/*
		Projets futurs :
		
		- Afficher le coût d'une mine de métal/cristal/deut au niveau xx.
		- Afficher la différence entre le coût d'une mine et les ressources actuelles de l'empire.
		- Exporter les records de ressources pour les forums.
				
			*/
		
		tableau.innerHTML = tableau.innerHTML+""
						+"<TABLE class=HEADER style=\"background-image: url('http://gf3.geo.gfsrv.net/cdn8f/62eceae400fa8116762698d86f12c9.gif');width: 670px;\">"
							+"<TR id=TITRE_OPTIONS class=TITRE style='display:none'>"
								+"<td style='width:50px;'></td>"
								+"<td style='color:#"+cl[3]+";line-height:23px;vertical-align:middle;width:610px;font-weight:bold;font-size:11px;"
								+	"padding-top:1px;'> OPTIONS DU SCRIPT </td>"
								+"<td style='width:50px;'>"
								+	"<img id=CLOSE_OPTIONS title='|FERMER LES OPTIONS' style='cursor:pointer;float:right;position:relative;"
								+	"margin-top:4px;margin-right:36px;' src=http://files.codes-sources.com/bfile/ViewSourceBIN.ashx?ID=21501&f=Quotes%5Cicones%5Cfermer.ico></td>"
							+"</TR>"
						+"</TABLE>"
						+"<TABLE id=CORPS_OPTIONS className=Options style=\"background-image: url('http://gf1.geo.gfsrv.net/cdn03/db530b4ddcbe680361a6f837ce0dd7.gif');"
									+"display:none;width:670px;vertical-align: baseline;\">"
							+"<tr style='height:5px'></tr>"
							+"<tr id=option_nbr_p style='height: 25px;'>"
								+"<td rowspan='16' style='width:8px;'></td>"
								+"<td style='width:206px;border:1px solid black;'><font color=#"+cl[3]+">Nombre de planète :</font></td>"
								+"<td style='width:207px;border:1px solid black;'>"
									+"<input type='number' id='nbr_p' class='nbr_p' maxlength='2' value="+nbr_p+" style='width:20px; "
									+"background-color:transparent; color:#999999; text-align:center;' onClick='javascript:this.select()'>"
								+"</td>"
								+"<td style='width:207px;border:1px solid black;'>"
									+"<img id=enreg_modif_nbr_p title='|SAUVEGARDER LE NOMBRE DE PLANETE' style='cursor:pointer;"
										+"float:center;position:relative;margin-top:0px;margin-right:0px;' height=11 width=14 "
										+"src=/game/img/navigation/icon-max-small-hover.gif>"
								+"</td>"
								+"<td rowspan='15' style='width:10px;'></td>"
							+"</tr>"
							/*+"<tr id=option_prix_construction_futur style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Prix :</font></td>"
								+"<td style='border:1px solid black;'>"
									+"<input type=text id=prix_m class=nbr_n alt='1' value=0 style='width:70px;"
									+"background-color:transparent; color:#999999; text-align:center;'>"
								+"</td>"
								+"<td style='border:1px solid black;'>"
									+"<input type=text id=prix_c class=nbr_n alt='1' value=0 style='width:70px;"
									+"background-color:transparent; color:#999999; text-align:center;'>"
								+"</td>"
							+"</tr>"*/
							+"<tr id=option_qte_n_i style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Quantités :</font></td>"
								+"<td class=qte_x style='color:#"+option_color[1]+";border:1px solid black;'>Normale</font></td>"
								+"<td class=qte_x style='color:#"+option_color[2]+";border:1px solid black;'>Importante</font></td>"
								//+"</td>"
							+"</tr>"
							+"<tr id=option_nbr_m style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Quantité Métal :</font></td>"
								+"<td style='color:#999999; font-weight:400;border:1px solid black;'> de 0 à :"
								+"<input type=text id=nbr_n_m class=nbr_n alt='1' value="+addPoints(nbr_n_m)+" style='width:70px;"
									+"background-color:transparent; color:#999999; text-align:center;'>"
								+"</td>"
								+"<td style='color:#999999; font-weight:400;border:1px solid black;'> de "+addPoints(nbr_n_m)+" à :"
								+"<input type=text id=nbr_i_m class=nbr_i alt='1' value="+addPoints(nbr_i_m)+" style='width:70px;"
									+"background-color:transparent; color:#999999; text-align:center;'>"
								+"</td>"
							+"</tr>"
							+"<tr id=option_nbr_c style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Quantité Cristal :</font></td>"
								+"<td style='color:#999999; font-weight:400;border:1px solid black;'> de 0 à :"
								+"<input type=text id=nbr_n_c class=nbr_n alt='2' value="+addPoints(nbr_n_c)+" style='width:70px;"
									+"background-color:transparent; color:#999999; text-align:center;'>"
								+"</td>"
								+"<td style='color:#999999; font-weight:400;border:1px solid black;'> de "+addPoints(nbr_n_c)+" à :"
								+"<input type=text id=nbr_i_c class=nbr_i alt='2' value="+addPoints(nbr_i_c)+" style='width:70px;"
									+"background-color:transparent; color:#999999; text-align:center;'>"
								+"</td>"
							+"</tr>"
							+"<tr id=option_nbr_d style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Quantité Deutérium :</font></td>"
								+"<td style='color:#999999; font-weight:400;border:1px solid black;'> de 0 à :"
								+"<input type=text id=nbr_n_d class=nbr_n alt='3' value="+addPoints(nbr_n_d)+" style='width:70px;"
									+"background-color:transparent; color:#999999; text-align:center;'>"
								+"</td>"
								+"<td style='color:#999999; font-weight:400;border:1px solid black;'> de "+addPoints(nbr_n_d)+" à :"
								+"<input type=text id=nbr_i_d class=nbr_i alt='3' value="+addPoints(nbr_i_d)+" style='width:70px;"
									+"background-color:transparent; color:#999999; text-align:center;'>"
								+"</td>"
							+"</tr>"
							+"<tr id=option_color_norm style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Quantité normale :</font></td>"
								+"<td style='border:1px solid black;'><input class='couleur' alt='1' maxlength=6 value="+option_color[1]+" "
								+	"type=text size=6 style='text-align:center;border:1px solid black;'></td>"
								+"<td rowspan='10' style='border:1px solid black;'</td>"
							+"</tr>"
							+"<tr id=option_color_imp style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Qantité importante :</font></td>"
								+"<td style='border:1px solid black;'><input class='couleur' alt='2' maxlength=6 value="+option_color[2]+" "
								+	"type=text size=6 style='text-align:center;border:1px solid black;'></td>"
							+"</tr>"
							+"<tr id=option_color_t_imp style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Qté très importante :</font></td>"
								+"<td style='border:1px solid black;'><input class='couleur' alt='3' maxlength=6 value="+option_color[3]+" "
								+	"type=text size=6 style='text-align:center;border:1px solid black;'></td>"
							+"</tr>"
							+"<tr id=option_Aff_res_pla style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Ressources par planète :</font></td>"
								+"<td style='border:1px solid black;'>"
								+	"<input type=checkbox class=ORCOptions_check alt='1' "+Option_check[1]+" style=cursor:pointer;>"
								+"</td>"
							+"</tr>"
							+"<tr id=option_Aff_ligne_rec style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Ligne avec records :</font></td>"
								+"<td style='border:1px solid black;'>"
								+	"<input type=checkbox class=ORCOptions_check alt='2' "+Option_check[2]+" style=cursor:pointer;>"
								+"</td>"
							+"</tr>"
							+"<tr id=option_eff_rec style='height: 25px;'>"
								+"<td style='border:1px solid black;'><font color=#"+cl[3]+">Effacer les records :</font></td>"
								+"<td style='border:1px solid black;'>"
								+	"<input type=checkbox class=ORCOptions_check alt='3' "+decheck(Option_check[3])+" style=cursor:pointer;>"
								+"</td>"
							+"</tr>"
							+"<tr style='height: 25px;'>"
								+"<td id=option_aff_danger title='|Le gif de danger apparaît si un type de ressources est en quantité très "
								+	"importante' style='border:1px solid black;'>"
								+"<font color=#"+cl[3]+" position=static>Afficher le gif : </font>"
								+	"<img src='./img/galaxy/activity.gif' "
								+	"style='float:right;position:relative;margin-top:3px;margin-right:20px;cursor:pointer;'>"
								+"</td>"
								+"<td style='border:1px solid black;'>"
								+	"<input type=checkbox class=ORCOptions_check alt='4' "+Option_check[4]+" style='cursor:pointer;'>"
								+"</td>"
							+"</tr>"
							+"<tr style='height: 25px;'>"
								+"<td  id=option_res_lune title='|Si vous cochez cette option, les ressources présentent sur les lunes seront "
								+	"comptés dans les ressources totales de l`Empire' style='border:1px solid black;'>"
								+	"<font color=#"+cl[3]+">Compter les ressources </br> lunaires :</font>"
								+"</td>"
								+"<td style='border:1px solid black;'>"
								+	"<input type=checkbox class=ORCOptions_check alt='5' "+Option_check[5]+" style='cursor:pointer;'>"
								+"</td>"
							+"</tr>"
							// Start Prod totale
							+"<tr style='height: 25px;'>"
								+"<td  id=option_res_tot title='|Si vous cochez cette option, la production totale de votre empire sera "
								+	"afficher par heure, jour et semaine' style='border:1px solid black;'>"
								+	"<font color=#"+cl[3]+">Production totale :</font>"
								+"</td>"
								+"<td style='border:1px solid black;'>"
								+	"<input type=checkbox class=ORCOptions_check alt='6' "+Option_check[6]+" style='cursor:pointer;'>"
								+"</td>"
							+"</tr>"
							// End Prod totale
							// Start nb GT
							+"<tr style='height: 25px;'>"
								+"<td  id=option_nb_gt title='|Si vous cochez cette option, Le nombre de grand transporteur "
								+	"nécéssaire pour vidé vos planètes sera affiché' style='border:1px solid black;'>"
								+	"<font color=#"+cl[3]+">Nombre GT :</font>"
								+"</td>"
								+"<td style='border:1px solid black;'>"
								+	"<input type=checkbox class=ORCOptions_check alt='7' "+Option_check[7]+" style='cursor:pointer;'>"
								+"</td>"
							+"</tr>"
							// End nb GT
							+"<tr style='height:5px;'></tr>"
							+"<tr id=option_enreg_all style='height: 35px;'>"
								+'<td></td>' // Solution banquale suite a un décalage provoqué par l'ajout de l'option des gt... je ne comprend pas d'ou vien se décalage
								+"<td style='border:1px solid black;'>"
								+	"<img src='./img/navigation/icon-max-small-off.gif' style='margin-bottom:0px;'>"
								+	"<img src='./img/navigation/icon-max-small-off.gif' style='margin-bottom:0px;margin-left:16px;'>"
								+"</td>"
								+"<td style='border:1px solid black;'>"
								+	"<img id=enreg_options class='save type' title='|SAUVEGARDER TOUTES LES OPTIONS' style='cursor:pointer;"
								+	"position:relative;margin-bottom:2px;' src=http://vulca.projet-alternative.fr/images/disc.png>"
								+"</td>"
								+"<td style='border:1px solid black;'>"
								+	"<img id=ESC_OPTIONS title='|REVENIR AU SCRIPT' style='cursor:pointer;"
								+	"float:right;position:relative;margin-bottom:2px;margin-right:20px;' src='./img/icons/recall.gif'>"
								+"</td>"
							+"</tr>"
						+"</TABLE>"

		/*******************************************************   Bas du tableau   ***************************************************************/
							
						+"<TABLE class=BOTTOM style=\"background-image: url('http://gf3.geo.gfsrv.net/cdnbe/997fd607a76c0b713e24cb7f2d41f5.png');width: 669px;height: 29px;\">" 
							+"<tr style='height:10px;'>"
								+"<td id='last_version' style='font-size:9px;color:#848484;font-style:italic;text-decoration:underline;"
									+"font-weight:bold;vertical-align:top' title='|Version actuelle du script'>"+nomScript+" "+Version+""
								+"</td>"
							+"</tr>"
						+"</TABLE>"
						+"<TABLE style=\"width: 669px;height: 10px;\">" 
						+"</TABLE>"
		
					/* 
		/game/img/layout/attacker_alert.gif = alert attack             /game/img/navigation/icon-max-small-hover.gif = fleche orange vers la droite
		/game/img/navigation/icon-help.gif = aide                      /game/img/cluetip/wait.gif
		/game/img/icons/recall.gif = retour                            /game/img/navigation/network-delete-icon.gif = icone supprimer
		/game/img/layout/ajaxloading.gif = attente                     /game/img/navigation/frage_b.gif = points d'interro
		/game/img/navigation/frage_a.gif = points d'interro			   /game/img/icons/grow.gif = aggrandir une fenetre
		/game/img/icons/refresh.gif = raffraîchir
					*/
		active_clic();
		
		/*var id_title_court = ['OPEN_OPTIONS','CLOSE_OPTIONS','ESC_OPTIONS','last_version']
			for ( var i=0; i < id_title_court.length; i++)
			{
				var script = document.createElement('script');
					script.setAttribute("type","text/javascript");
					script.text = "$('#"+id_title_court[i]+"').cluetip({"
								+"splitTitle:'|',"
								+"showTitle:false,width:150,positionBy:'bottomTop',leftOffset:20,"
								+"topOffset:15,cluezIndex:9997,hoverIntent:{sensitivity:1,interval:350,timeout:100}});";
				tableau.appendChild(script);
			}
		
		if ( ! id('gif_de_danger') )
		{
			var id_title_long = ['TITLE_RECORDS','enreg_modif_nbr_p','option_aff_danger','enreg_options','option_res_lune','option_res_tot','option_nb_gt'] // Ressource total + Nb gt
		}
		else
		{
			var id_title_long = 
			['TITLE_RECORDS','enreg_modif_nbr_p','option_aff_danger','enreg_options','option_res_lune','gif_de_danger','gif_de_danger2','option_res_tot','option_nb_gt'] // Ressource total + Nb gt
		}
			for ( var i=0; i < id_title_long.length; i++)
			{
				var script = document.createElement('script');
					script.setAttribute("type","text/javascript");
					script.setAttribute("language","javascript");
					script.text = "$('#"+id_title_long[i]+"').cluetip({"
								+"splitTitle:'|',"
								+"showTitle:false,width:300,positionBy:'bottomTop',leftOffset:20,"
								+"topOffset:15,cluezIndex:9997,hoverIntent:{sensitivity:1,interval:350,timeout:100}});";
				tableau.appendChild(script);
			}*/
		}
	} // OgResCalcFunc

	/******************************************************   Lancement du scipt   ****************************************************************/
	
	var tableau = document.createElement("div"); // On crée un nouveau élément 'div'
		tableau.id = "EmpireCalculator"; // On lui attribue un 'id' nommé 'OgResCalc'
	id('inhalt').appendChild(tableau);
		
	//id('EmpireCalculator').insertBefore(tableau, id('IFC_table')); // On le place sur la page   <==>   id('OgResCalc').appendChild(newElement);
	
	EmpireCalculator(); // Fonction à faire
	setInterval(color_background_input, 500);
	var interval_EmpireCalculator = setInterval(EmpireCalculator, 2000);