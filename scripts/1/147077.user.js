// ==UserScript==
// @name           Resources on transit, by coord and by mission
// @namespace      Snaquekiller && benneb
// @version 2.0.6
// @updateURL      http://userscripts.org/scripts/source/147077.meta.js
// @downloadURL    https://userscripts.org/scripts/source/147077.user.js
// @grant		   GM_getValue
// @grant		   GM_setValue
// @include        http://*.ogame.*/game/index.php?*page=overview*
// ==/UserScript==
	/** tableau de base **/
	var color_metal     = '#7F1616;';
	var color_cristal   = '#165A7F';
	var color_deut      = '#1C871B';
	var color_point_vol = '#1B7A87';
	var color_pourcent  = '#661B87';
	var color_nombre    = '#871B61';
	/** autre tableau **/
	var tableau_info_plus       = "none";//none pour pas afficher et block pour afficher
	var tableau_head_color      = "#404444";
	var tableau_premiere_colone = "#727C7C";
	var tableau_autre_colone    = "#6F996E";
	
	var isFirefox		= (window.navigator.userAgent.indexOf('Firefox') > -1 ) ? true : false,
		isChrome		= (window.navigator.userAgent.indexOf('Chrome') > -1 ) ? true : false,
		isSafari 		= (window.navigator.userAgent.indexOf('Safari') > -1 ) ? true : false,
		isGM			= (typeof GM_getResourceURL === 'function'),
		isChromeTM		= (isChrome && isGM);
	
	//function
	{
		if (isChrome)
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
			
			function GM_deleteValue(value) 
			{
				localStorage.removeItem(value);
			}
			function GM_log(value)
			{
				console.log(value);
			}
		}
		function addPoints(nombre){
			if (nombre == '?' || nombre==0) {return nombre;} 
			else 
			{
				var signe = '';
				if (nombre<0)
				{
					nombre = Math.abs(nombre);
					signe = '-';
				}
				var str = nombre.toString(), n = str.length;
				if (n <4) {return signe + nombre;} 
				else 
				{
					return  signe + (((n % 3) ? str.substr(0, n % 3) + '.' : '') + str.substr(n % 3).match(new RegExp('[0-9]{3}', 'g')).join('.'));
				}
			}
		}
		function trim(string)		{return string.replace(/(^\s*)|(\s*$)/g,'');} 
	}
	//injected css , for antigame
	var css = "html body#overview.ogame div.contentBoxBody div#boxBG div#box div#contentWrapper div#eventboxContent div#eventListWrap div#eventHeader a span.icon {display:none}";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = document.getElementsByTagName("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			node.appendChild(document.createTextNode(css));
			heads[0].appendChild(node); 
		}
	}
	
	
	var serveur = document.getElementsByName('ogame-universe')[0].content;
	var langue =document.getElementsByName('ogame-language')[0].content;
	var text = 
	{
			m: 'Metal',
			c: 'Crystal',
			d: 'Deuterium',
			attaquer:'Attack',
			stationner:'Deployment',
			recyclage:'Recycle debris field',
			transport:'Transport',
			colonisation:'Colonization',
			expedition:'Expedition',
			detruire:'Moon Destruction',
			groupee:'ACS Attack',
			coordonee:'Coord',
			missions:'Missions',
			plus_info:'More infos'
	}
	if ( langue == 'fr')	
	{
		text = 
		{
			m: 'Metal',
			c: 'Cristal',
			d: 'Deuterium',
			attaquer:'Attaquer',
			stationner:'Stationner',
			recyclage:'Recyclage',
			transport:'Transport',
			colonisation:'Colonisation',
			expedition:'Expedition',
			detruire:'Détruire',
			groupee:'Attaque groupée',
			coordonee:'Coord',
			missions:'Missions',
			plus_info:'plus d\'infos'
		}
	}
		
	
	var nombre_planette_surcombien = document.getElementById('countColonies').getElementsByTagName('span')[0].innerHTML.split('/');
	if(unsafeWindow.ifcDATA && (isFirefox	||	isChromeTM	)){//merci vulca pour infocompte
	
		var DATA = unsafeWindow.ifcDATA;
		var nb_point_flotte = parseInt(DATA.info.pointsFleet.replace( /[^0-9-]/g, ""));
		GM_setValue('point_fleet'+ serveur, ''+nb_point_flotte+'');
	}
	else
	{
		var DATA = new Array();DATA.info = new Array();	
		DATA.info = {pointsFleet : GM_getValue('point_fleet'+ serveur, '1')}	
		unsafeWindow.ifcDATA = DATA;
	}
		
	function afficher_info(metal_sc, cristal_sc, deut_sc, point_total_sc, nb_total_sc, type_mission, coordonee_rajout)
	{
		if(!document.getElementById('metal_sc_f')){
			var text_de_base = '<style type="text/css"> .metal_sc_m, .cristal_sc_m, .deut_sc_m{background-color:'+ tableau_autre_colone +';}'
				+' #tableau_mission, #tableau_coord{text-align: center;border: 2px inset #1B2323;position:relative;left:15%;width:70%;border-collapse:separate;}'
				+' .mission_sc, .coordonee_sc{background-color:'+ tableau_premiere_colone +';}'
				+'</style>'		
				+'<br/><div style="text-align: center;"><span style="color:'+ color_metal +';">'+text.m+' : </span> <span id="metal_sc_f">0</span>'
				+'  \n<span style="color:'+ color_cristal +';">'+text.c+' : </span> <span id="cristal_sc_f">0</span>'
				+'  \n<span style="color:'+ color_deut +';">'+text.d+' : </span> <span id="deut_sc_f">0</span>';
				
			if ( langue == 'fr')	
			{
				text_de_base +='  \n<br/><span style="color:'+ color_point_vol +';">Point en vol : </span> <span id="point_sc_f">0</span>'
				+'  \n<span style="color:'+ color_pourcent +';">Pourcentage : </span> <span id="pourc_sc_f">0</span>'
				+'  \n<span style="color:'+ color_nombre +';">Nombre de vaisseau : </span> <span id="nb_total_sc_f">0</span>';
			}
				text_de_base +='</div><span id="array_deja_fait" style="display:none;"></span>'
				+'<div style="text-decoration:underline;cursor:pointer;text-align: center;" id="plus_info">'+text.plus_info+'</div><br/><div id="tableau_anexe"><table id="tableau_coord">'
					+'<tr style="background-color:'+ tableau_head_color +';"><th>'+text.coordonee+'</th><th>'+text.m+'</th><th>'+text.c+'</th><th>'+text.d+'</th></tr></table><br/>'
				+'<table id="tableau_mission">'
					+'<tr style="background-color:'+ tableau_head_color +';"><th>'+text.missions+'</th><th>'+text.m+'</th><th>'+text.c+'</th><th>'+text.d+'</th></tr></table><br/></div>';
				var div_final = document.createElement('div');
				//div_final.setAttribute('style','display:block;background:url("http://'+serveur+'/game/img/layout/eventList-body.gif") repeat-y scroll 5px 0px;background-color: transparent;background-clip: border-box;background-origin: padding-box;background-size: auto auto;');
				div_final.setAttribute('id','final_sc');
				div_final.innerHTML = text_de_base;
				
				//document.getElementById('inhalt').insertBefore(div_final, document.getElementById('inhalt').firstChild);
				document.getElementById('eventListWrap').appendChild(div_final);
				document.getElementById('eventListWrap').removeChild(document.getElementById('eventFooter'));
				 
				document.getElementById('tableau_anexe').style.display = tableau_info_plus;
				document.getElementById('plus_info').addEventListener("click", function(event) 
				{
					var cellule = document.getElementById('tableau_anexe');
					if (cellule.style.display == 'none'){cellule.style.display = 'block';}
					else {cellule.style.display = 'none';}
				}, true);
		}
		{	/***** tableau de base, point , metal cristal deut  total ***/
			var array_nb_point = document.getElementById('array_deja_fait').innerHTML;
			var nb_total_metal = parseInt(document.getElementById('metal_sc_f').innerHTML.replace(/[^0-9-]/g, ""));
			var nb_total_cristal = parseInt(document.getElementById('cristal_sc_f').innerHTML.replace(/[^0-9-]/g, ""))
			var nb_total_deut = parseInt(document.getElementById('deut_sc_f').innerHTML.replace(/[^0-9-]/g, ""))
			if ( langue == 'fr')	
			{
			var nb_total_point = parseInt(document.getElementById('point_sc_f').innerHTML.replace(/[^0-9-]/g, ""))
			var nb_total_vaisseau = parseInt(document.getElementById('nb_total_sc_f').innerHTML.replace(/[^0-9-]/g, ""))
			}	
			// on recupere les info infocomptes					
			if(unsafeWindow.ifcDATA && (isFirefox	||	isChromeTM	)){
				var DATA = unsafeWindow.ifcDATA;
				var nb_point_flotte = parseInt(DATA.info.pointsFleet.replace( /[^0-9-]/g, ""));
			}
			else{var nb_point_flotte = 1;}
								
			nb_total_metal = nb_total_metal + parseInt(metal_sc);
			document.getElementById('metal_sc_f').innerHTML = addPoints(nb_total_metal);
			
			nb_total_cristal = nb_total_cristal + parseInt(cristal_sc);
			document.getElementById('cristal_sc_f').innerHTML = addPoints(nb_total_cristal);
			
			nb_total_deut = nb_total_deut + parseInt(deut_sc);
			document.getElementById('deut_sc_f').innerHTML = addPoints(nb_total_deut);
			if ( langue == 'fr')	
			{
			nb_total_point = nb_total_point + parseInt(point_total_sc);
			document.getElementById('point_sc_f').innerHTML = addPoints(nb_total_point);
			
			if(nb_point_flotte != 1){document.getElementById('pourc_sc_f').innerHTML = (Math.round((nb_total_point/nb_point_flotte)*1000))/10;}
			else{document.getElementById('pourc_sc_f').innerHTML = '?';}
			
			nb_total_vaisseau = nb_total_vaisseau + parseInt(nb_total_sc);	
			document.getElementById('nb_total_sc_f').innerHTML = addPoints(nb_total_vaisseau);
			}
		}
		
		/**** tableau par rapport au coordonée et par rapport au mission ***/
		var coordonee_rajout2 = coordonee_rajout.replace(/[\[\]:]/g,"_");
		if(metal_sc != 0 || cristal_sc != 0 || deut_sc != 0){
			if(!document.getElementById(type_mission)){
				var a_rajouter_au_div = '<td class="mission_sc" >'+ type_mission +'</td>'
				+'<td class="metal_sc_m">'+ addPoints(metal_sc) +'</td><td class="cristal_sc_m">'+ addPoints(cristal_sc) +'</td><td class="deut_sc_m">'+ addPoints(deut_sc) +'</td>';
				var tr_intermediaire = document.createElement('tr');
					tr_intermediaire.setAttribute('id', type_mission);
					tr_intermediaire.innerHTML = a_rajouter_au_div;
				document.getElementById('tableau_mission').appendChild(tr_intermediaire);
			}
			else{
				var met_interm = parseInt(document.getElementById(type_mission).getElementsByClassName('metal_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
				var cri_interm = parseInt(document.getElementById(type_mission).getElementsByClassName('cristal_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
				var deut_interm = parseInt(document.getElementById(type_mission).getElementsByClassName('deut_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
			
				document.getElementById(type_mission).getElementsByClassName('metal_sc_m')[0].innerHTML = addPoints(metal_sc + met_interm);
				document.getElementById(type_mission).getElementsByClassName('cristal_sc_m')[0].innerHTML = addPoints(cristal_sc + cri_interm);
				document.getElementById(type_mission).getElementsByClassName('deut_sc_m')[0].innerHTML = addPoints(deut_sc + deut_interm);
			}
			
			if(!document.getElementById(coordonee_rajout2)){
				var a_rajouter_au_div2 = '<td class="coordonee_sc">'+ coordonee_rajout +'</td>'
				+'<td class="metal_sc_m">'+ addPoints(metal_sc) +'</td><td class="cristal_sc_m">'+ addPoints(cristal_sc) +'</td><td class="deut_sc_m">'+ addPoints(deut_sc) +'</td>';
				var tr_intermediaire2 = document.createElement('tr');
					tr_intermediaire2.setAttribute('id', coordonee_rajout2);
					tr_intermediaire2.innerHTML = a_rajouter_au_div2;
				document.getElementById('tableau_coord').appendChild(tr_intermediaire2);
			}
			else{
				var met_interm2 = parseInt(document.getElementById(coordonee_rajout2).getElementsByClassName('metal_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
				var cri_interm2 = parseInt(document.getElementById(coordonee_rajout2).getElementsByClassName('cristal_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
				var deut_interm2 = parseInt(document.getElementById(coordonee_rajout2).getElementsByClassName('deut_sc_m')[0].innerHTML.replace( /[^0-9-]/g, ""));
			
				document.getElementById(coordonee_rajout2).getElementsByClassName('metal_sc_m')[0].innerHTML = addPoints(metal_sc + met_interm2);
				document.getElementById(coordonee_rajout2).getElementsByClassName('cristal_sc_m')[0].innerHTML = addPoints(cristal_sc + cri_interm2);
				document.getElementById(coordonee_rajout2).getElementsByClassName('deut_sc_m')[0].innerHTML = addPoints(deut_sc + deut_interm2);
			}
		}
	}
	function recupere_info_title(eventRow, type_mission, coordonee_rajout)
	{
		if( document.getElementsByClassName('ago_eventlist_activity').length > 0 )//antigame
		{
			var nb_td = 7;
		}
		else
		{
			var nb_td = 6;
		}
		var contenu = document.getElementById(eventRow).getElementsByTagName('td')[nb_td].firstElementChild.title;
		var doc = document.implementation.createDocument ('http://www.w3.org/1999/xhtml', 'html',  null);
		var filtre = contenu.split('&nbsp;').join('');;
			doc.documentElement.innerHTML = '<body>'+filtre+'</body>';
		var respTable_tr = doc.getElementsByTagName('tr');
		var point_total = 0;
		var nb_total = 0;		
		var metal = 0;
		var cristal = 0;
		var deut = 0;
		if ( langue == 'fr')	
		{	
		vari = { pt: 'Petit transporteur:',gt: 'Grand transporteur:',cle: 'Chasseur léger:',clo: 'Chasseur lourd:',cro: 'Croiseur:',vb: 'Vaisseau de bataille:',vc: 'Vaisseau de colonisation:',rec: 'Recycleur:',esp: 'Sonde d`espionnage:',bb: 'Bombardier:',sat: 'Satellite solaire',dest: 'Destructeur:',edlm: 'Étoile de la mort:',tra: 'Traqueur:'}
		
		//on est dans la partie vaiseaux
		var vaisseau_perte = new Array('4', '12', '4', '10', '29', '60', '40', '18', '1' ,'90', '125', '10000', '85');
		var vaisseau = new Array(vari.pt, vari.gt, vari.cle, vari.clo, vari.cro, vari.vb, vari.vc, vari.rec, vari.esp, vari.bb, vari.dest, vari.edlm, vari.tra);
		
		}
		
		for(var u=1; u<(respTable_tr.length -4);u++)
		{
			if ( langue == 'fr')	
			{
				var type_vaisseau = respTable_tr[u].getElementsByTagName('td')[0].innerHTML;
				if(type_vaisseau != '&nbsp;'){
					for(var k=0; k<vaisseau.length ; k++)
					{
						if(type_vaisseau == vaisseau[k])
						{
							var nb_vaisseau_type = respTable_tr[u].getElementsByTagName('td')[1].innerHTML.replace( /[^0-9-]/g, "");
							point_total = point_total + parseInt(vaisseau_perte[k])*parseInt(nb_vaisseau_type);
							nb_total = nb_total + parseInt(nb_vaisseau_type);
						}
					}
				}
			}
		}
        
        metal = metal + parseInt((respTable_tr[(u+1)].getElementsByTagName('td')[1].textContent.replace( /[^0-9-]/g, "")));
		cristal = cristal + parseInt((respTable_tr[(u+2)].getElementsByTagName('td')[1].textContent.replace( /[^0-9-]/g, "")));
		deut = deut + parseInt((respTable_tr[(u+3)].getElementsByTagName('td')[1].textContent.replace( /[^0-9-]/g, "")));	
		afficher_info(metal, cristal, deut, point_total, nb_total, type_mission, coordonee_rajout);					
		
	}
		
	function parsess() 
	{
		var elm = document.createElement('div');
			elm.innerHTML = "<div id='eventListWrap'>"+document.getElementById('eventListWrap').innerHTML+"</div>";
		var type_mission = "";
			
		if(elm.getElementsByClassName("eventFleet")){
			var eventFleet = elm.getElementsByClassName("eventFleet");		
			var nbdetailfleet = "";
			var id_deja_fait = "";
			
			for(i=0 ; i< eventFleet.length ; i++)
			{
				var elem = eventFleet[i];
				
				var reserve = eventFleet[i].getElementsByClassName("icon_movement_reserve").length > 0;
				if (( elem.innerHTML.indexOf("cd360bccfc35b10966323c56ca8aac")  != -1) || elem.innerHTML.indexOf("icon-angriff")  != -1) type_mission = text.attaquer;
				if (( elem.innerHTML.indexOf("4dab966bded2d26f89992b2c6feb4c")  != -1) || elem.innerHTML.indexOf("icon-stationieren")  != -1) type_mission = text.stationner;
				if (( elem.innerHTML.indexOf("26dd1bcab4f77fe67aa47846b3b375")  != -1) || elem.innerHTML.indexOf("icon-tf-abbauen")    != -1)   type_mission = text.recyclage;
				if (( elem.innerHTML.indexOf("2af2939219d8227a11a50ff4df7b51")  != -1) || elem.innerHTML.indexOf("icon-transport")  != -1) type_mission = text.transport;
				if (( elem.innerHTML.indexOf("0bbcbc3a6d6b102c979413d82bac47")  != -1) || elem.innerHTML.indexOf("icon-kolonisieren")  != -1) type_mission = text.colonisation;
				if (( elem.innerHTML.indexOf("892b08269e0e0bbde60b090099f547")  != -1) || elem.innerHTML.indexOf("icon-expedition")  != -1) type_mission = text.expedition;
				if (  elem.innerHTML.indexOf("575dfbbe877f58d6c09120ffbcaabe")  != -1) type_mission = text.detruire;
				if (  elem.innerHTML.indexOf("87d615c4fb395b75ec902b66b7757e")  != -1) type_mission = text.groupée;
				
				var eventRow = elem.id;	
				var eventID = parseInt(elem.id.split('eventRow-')[1]);
				var coordone_origin = elem.getElementsByClassName('coordsOrigin')[0].getElementsByTagName('a')[0].innerHTML;	
				var dest_origin = elem.getElementsByClassName('destCoords')[0].getElementsByTagName('a')[0].innerHTML;	
				
				if(type_mission == text.recyclage && reserve){
					recupere_info_title(eventRow,  type_mission, coordone_origin);
				}
					 
				else if(type_mission == text.transport && !reserve){
					id_deja_fait = id_deja_fait +";"+ eventID;
					recupere_info_title(eventRow,  type_mission, dest_origin);
					
				}
				else if(type_mission == text.transport && reserve){
					if(id_deja_fait.indexOf((eventID-1)) == -1){
						id_deja_fait = id_deja_fait +";"+ eventID;
						recupere_info_title(eventRow,  type_mission, coordone_origin);
					}
				}
				else if(type_mission == text.stationner && !reserve){
					recupere_info_title(eventRow, type_mission, dest_origin);
					
				}
				else if(type_mission == text.stationner && reserve){
					recupere_info_title(eventRow,  type_mission, coordone_origin);
					
				}
				else if(type_mission == text.colonisation && !reserve){					
					id_deja_fait = id_deja_fait +";"+ eventID;
					recupere_info_title(eventRow,  type_mission, dest_origin);
					
				}
				else if(type_mission == text.colonisation && reserve){
					if(id_deja_fait.indexOf((eventID-1)) == -1){
						id_deja_fait = id_deja_fait +";"+ eventID;					
						recupere_info_title(eventRow,  type_mission, coordone_origin);
					}
				}
				else if(type_mission == text.attaquer && reserve){
					recupere_info_title(eventRow,  type_mission, coordone_origin);
					
				}
				else if(type_mission == text.expedition && reserve){
					recupere_info_title(eventRow,  type_mission, coordone_origin);
					
				}
				else if(type_mission == text.detruire && reserve){
					recupere_info_title(eventRow,  type_mission, coordone_origin);
				}
			
				else if(type_mission == text.groupee && reserve)
				{
					recupere_info_title(eventRow,  type_mission, coordone_origin);
				}
			}
			
			setTimeout( function() { 
				
				var sc_m = document.getElementsByClassName('coordonee_sc');
				var coord = '['+document.getElementsByName('ogame-planet-coordinates')[0].content+']';
				var m_pla = parseInt(document.getElementById("resources_metal").innerHTML.replace(/\D/g, ''));
				var c_pla = parseInt(document.getElementById("resources_crystal").innerHTML.replace(/\D/g, ''));
				var d_pla = parseInt(document.getElementById("resources_deuterium").innerHTML.replace(/\D/g, ''));
				
				for (var di = 0 ; di < sc_m.length ; di++)
				{
					if( trim(sc_m[di].innerHTML) == coord )
					{
						var met_interm2 = parseInt(document.getElementsByClassName('metal_sc_m')[di].innerHTML.replace( /[^0-9-]/g, ""));
						var cri_interm2 = parseInt(document.getElementsByClassName('cristal_sc_m')[di].innerHTML.replace( /[^0-9-]/g, ""));
						var deut_interm2 = parseInt(document.getElementsByClassName('deut_sc_m')[di].innerHTML.replace( /[^0-9-]/g, ""));
						
						document.getElementsByClassName('metal_sc_m')[di].innerHTML   = "<span style='background-color:black' title='"+addPoints(m_pla + met_interm2)+"' class='tooltipRight js_hideTipOnMobile'>"+addPoints(met_interm2)+"</span>"; 
						document.getElementsByClassName('cristal_sc_m')[di].innerHTML = "<span style='background-color:black' title='"+addPoints(c_pla + cri_interm2)+"' class='tooltipRight js_hideTipOnMobile'>"+addPoints(cri_interm2)+"</span>"; 
						document.getElementsByClassName('deut_sc_m')[di].innerHTML    = "<span style='background-color:black' title='"+addPoints(d_pla + deut_interm2)+"' class='tooltipRight js_hideTipOnMobile'>"+addPoints(deut_interm2)+"</span>"; 
						
						return ;
					}
				}
			}, 1000); 
			
			var element = document.getElementById("refresh");
			if (element && element.parentNode) {
				element.parentNode.removeChild(element);
			}
		}	
	}	
	function header()
	{	
		var eventHeader = document.getElementById('eventHeader');
		if( eventHeader != null )
		{
			var inner = eventHeader.innerHTML;
						eventHeader.innerHTML = "<div id='refresh' style='float:left;padding-top:7px;cursor:pointer' ><img src='http://www.projet-alternative.fr/images/upload/141.png' /></div>"+inner;
						document.getElementById("refresh").addEventListener("click", parsess, true);
		}
		
	}
	setTimeout( function() { 
		if(document.getElementById("eventboxContent").style.display == "none")
		{
			var node = document.getElementById("eventClass");
			if (!node) return;
				
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent('click', true, true, unsafeWindow,  0, 0, 0, 0, 0, false, false, false, false, 0, null);
				
			if (evt) node.dispatchEvent(evt);    
			
		}
	}, 300); 
	setTimeout(header,1000);