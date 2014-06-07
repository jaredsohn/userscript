// ==UserScript==
// @name	  OGame FR : Empire 
// @author 	  Flater
// @description   OGame FR : Empire
// @language FR / May be others languages
// @include	  http://ogame*.de/game/*
// @include	  http://game*.de/game/*
// @include	  http://*.ogame.de/game/*
// @exclude	   
// ==/UserScript== 

////////////////////////////////////////////| 
//           OGame - Imperium				|
////////////////04 June 2007////////////////|
//				Visitez						|
//http://userscripts.org/users/19231;scripts|
//			ou contactez moi par mail		|
//flater_@hotmail.com						|
//											|
//		pour indiquer un quelconque bug		|
//											|
//											|
////////////////////////////////////////////
	
//////////  Languae's variable  , change according your language ( french in default ) ////////
	var name_view = 'Vue d\'ensemble de votre empire' ;                               /////////
	var name_resources = GM_getValue('name_resources') ;					         //////////
	GM_setValue('name_empire' , 'Empire') ;                                         ///////////
	GM_setValue('1_0_1' , 'Nom') ;											       ////////////
///////////////////////////////////////////////////////////////////////////////////////////////


	var verif_session = location.search.split('&')[0].split('session=')[1] ;

	if (location.pathname == '/game/overview.php' || location.pathname == '/game/index.php')
	{
		var nb_tr_position = xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]').getElementsByTagName('tr').length -xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[4]/TH[3]').getElementsByTagName('tr').length -1  ;
		var nb_tr_cases = nb_tr_position - 2 ;
		var nb_tr_img = nb_tr_position - 3 ;
		GM_setValue('location_formate' , document.getElementsByTagName('link')[1].href) ;
		GM_setValue('location_host' , location.host) ;
		GM_setValue('session' , location.search.split('&')[0].split('session=')[1]) ;
		GM_setValue('2_0_1' , xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR['+nb_tr_position+']/TH[1]').innerHTML) ;
		GM_setValue('3_0_1' , xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR['+nb_tr_cases+']/TH[2]').childNodes[4].nodeValue.split(' ')[1].substring(0,1).toUpperCase()+xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR['+nb_tr_cases+']/TH[2]').childNodes[4].nodeValue.split(')')[0].substring(2,xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR['+nb_tr_cases+']/TH[2]').childNodes[4].nodeValue.split(')')[0].length)) ;
		GM_setValue('4_0_1' , xpath('/HTML[1]/BODY[1]/CENTER[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[2]/I[1]/B[1]/FONT[1]').innerHTML) ;
		GM_setValue('5_0_1' , xpath('/HTML[1]/BODY[1]/CENTER[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[3]/I[1]/B[1]/FONT[1]').innerHTML) ;
		GM_setValue('6_0_1' , xpath('/HTML[1]/BODY[1]/CENTER[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[4]/I[1]/B[1]/FONT[1]').innerHTML) ;
		GM_setValue('7_0_1' , xpath('/HTML[1]/BODY[1]/CENTER[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[2]/TD[5]/I[1]/B[1]/FONT[1]').innerHTML) ;
		var planet = document.getElementsByTagName('option') ;
		var planet_type ;
		var nb_planet_type = 0;
		var nb_planet_type_1 = 0;
		var nb_planet_type_3 = 0;

		for (a=0 ; a<planet.length ; a++)
		{
			
			var option_text = planet[a].firstChild.nodeValue ;
			var id_cp = planet[a].value.split('&')[1].split('cp=')[1] ;
			var indice ;

			if (option_text.indexOf('(') == -1)
			{
				nb_planet_type_1 ++ ;
				planet_type = 1 ;
				indice = nb_planet_type_1 ;

			}
			else
			{
				nb_planet_type_3 ++ ;
				planet_type = 3 ;
				indice = nb_planet_type_3 ;
			}
			GM_setValue('cp_'+indice+'_'+planet_type , planet[a].value.split('&')[1].split('cp=')[1]) ;
			GM_setValue('cp_'+planet[a].value.split('&')[1].split('cp=')[1] , indice) ;
			if (planet[a].selected == true)
			{
				GM_setValue('name_planet_type_'+planet_type , xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/A[1]').firstChild.nodeValue.split('"')[0]) ;
				GM_setValue('0_'+indice+'_'+planet_type , '<a href="http://'+GM_getValue("location_host")+'/game/overview.php?session='+GM_getValue("session")+'&cp='+GM_getValue("cp_"+indice+"_"+planet_type)+'"><img src="'+xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR['+nb_tr_img+']/TH[2]/IMG[1]').src+'" border="0" height="71" width="75"></a>') ;
				GM_setValue('1_'+indice+'_'+planet_type , '<a href="'+xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/A[1]').href+'">'+xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/A[1]').firstChild.nodeValue.split('"')[1])+'</a>' ;
				GM_setValue('2_'+indice+'_'+planet_type , xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR['+nb_tr_position+']/TH[2]').innerHTML) ;
				GM_setValue('3_'+indice+'_'+planet_type , '<a title="'+xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR['+nb_tr_cases+']/TH[2]/A[1]').title+'">'+xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR['+nb_tr_cases+']/TH[2]/A[1]').firstChild.nodeValue+'</a>/<a title="'+xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR['+nb_tr_cases+']/TH[2]/A[2]').title+'">'+xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR['+nb_tr_cases+']/TH[2]/A[2]').firstChild.nodeValue+'</a>') ;
				GM_setValue('4_'+indice+'_'+planet_type , '<a href="http://'+GM_getValue("location_host")+'/game/resources.php?session='+GM_getValue("session")+'&cp='+GM_getValue("cp_"+indice+"_"+planet_type)+'&planettype='+planet_type+'">'+xpath('/HTML[1]/BODY[1]/CENTER[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[3]/TD[2]').innerHTML+'</a>') ;
				GM_setValue('5_'+indice+'_'+planet_type , '<a href="http://'+GM_getValue("location_host")+'/game/resources.php?session='+GM_getValue("session")+'&cp='+GM_getValue("cp_"+indice+"_"+planet_type)+'&planettype='+planet_type+'">'+xpath('/HTML[1]/BODY[1]/CENTER[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[3]/TD[3]').innerHTML+'</a>') ;
				GM_setValue('6_'+indice+'_'+planet_type , '<a href="http://'+GM_getValue("location_host")+'/game/resources.php?session='+GM_getValue("session")+'&cp='+GM_getValue("cp_"+indice+"_"+planet_type)+'&planettype='+planet_type+'">'+xpath('/HTML[1]/BODY[1]/CENTER[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[3]/TD[4]').innerHTML+'</a>') ;
				GM_setValue('7_'+indice+'_'+planet_type , xpath('/HTML[1]/BODY[1]/CENTER[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[3]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]/TBODY[1]/TR[3]/TD[5]').innerHTML) ;
			}						
		}
		GM_setValue('nb_planet_type_1' , nb_planet_type_1);
		GM_setValue('nb_planet_type_3' , nb_planet_type_3);
		//xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]').innerHTML = 
		}

	if (location.pathname == '/game/leftmenu.php')
	{
		var trClone = xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]').cloneNode(true) ;
		trClone.getElementsByTagName('a')[0].innerHTML = GM_getValue('name_empire') ;
		trClone.getElementsByTagName('a')[0].href = 'imperium.php?session='+verif_session+'&planettype=1' ;
		document.getElementsByTagName('tbody')[0].insertBefore(trClone , xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[3]')) ;
		GM_setValue('name_resources' , xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[5]/TD[1]/DIV[1]/FONT[1]/A[1]').innerHTML) ;
	}

	if (location.pathname == '/game/imperium.php')
	{
		GM_setValue('0_0_1' , '') ;
		var planet_type = location.search.split('planettype=')[1] ;
		var nb_tr ;
		var nb_planet ;
		if (planet_type == 1)
		{
			nb_planet = GM_getValue('nb_planet_type_1') ;
		}
		else
		{
			nb_planet = GM_getValue('nb_planet_type_3') ;
		}

		document.getElementsByTagName('head')[0].innerHTML = '<link rel="stylesheet" type="text/css" href="'+GM_getValue('location_formate')+'"><meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">';
		document.getElementsByTagName('body')[0].innerHTML = '<center><table border="0" cellpadding="0" cellspacing="1" width="750"><tbody><tr height="20" valign="left"><td class="c" colspan="10"><center>'+name_view+' by <a href="mailto:flater_@hotmail.com">Flater</a></center></td></tr><tr height="20"><th colspan="5"><a href="http://'+GM_getValue('location_host')+'/game/imperium.php?session='+GM_getValue('session')+'&planettype=1">'+GM_getValue('name_planet_type_1')+'</a></th><th colspan="5"><a href="http://'+GM_getValue('location_host')+'/game/imperium.php?session='+GM_getValue('session')+'&planettype=3">'+GM_getValue('name_planet_type_3')+'</a></th></tr></tbody></table><script type="text/javascript" src="js/wz_tooltip.js"></script></center>';

		for (a=0 ; a<4 ; a++)
		{
			var text = '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(a+'_0_1')+'</font></th>' ;
			for (b=1 ; b<nb_planet+1 ; b++ )
			{
				var id = a+'_'+b+'_'+planet_type ;
				if (GM_getValue(id) == undefined || GM_getValue('name_planet_type_3') == undefined)
				{
					GM_setValue(id,'-') ;
					GM_setValue('name_planet_type_3' , '-') ;
				}
				text += '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(id)+'</font></th>' ;
			}
			document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" >'+text+'</tr>' ;
		}

		if (GM_getValue('view_resources') == '1')
		{
			document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" valign="left"><td class="c" colspan="10">'+name_resources+'</td></tr>' ;
			for (a=4;a<8 ;a++ )
			{
				var text = '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(a+'_0_1')+'</font></th>' ;
				for (b=1 ; b<nb_planet+1 ; b++ )
				{
					var id = a+'_'+b+'_'+planet_type ;
					if (GM_getValue(id) == undefined)
					{
						GM_setValue(id,'-');
					}
					text += '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(id)+'</font></th>' ;
				}
				document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" >'+text+'</tr>' ;
			}

		}

		if (GM_getValue('view_buildings') == 1)
		{
			document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" valign="left"><td class="c" colspan="10">'+GM_getValue(GM_getValue('nb_tr_1')+'_0_1')+'</td></tr>' ;
			for (a=GM_getValue('nb_tr_1')+1 ; a<GM_getValue('nb_tr_2')-1 ; a++)
			{
				var text = '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(a+'_0_1')+'</font></th>' ;
				for (b=1 ; b<nb_planet+1 ; b++ )
				{
					var id = a+'_'+b+'_'+planet_type ;
					if (GM_getValue(id) == undefined)
					{
						GM_setValue(id,'-');
					}
					text += '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(id)+'</font></th>' ;
				}
				document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" >'+text+'</tr>' ;
			}
		}

		if (GM_getValue('view_reseach') == 1)
		{
			document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" valign="left"><td class="c" colspan="10">'+GM_getValue(GM_getValue('nb_tr_2')+'_0_1')+'</td></tr>' ;
			for (a=GM_getValue('nb_tr_2')+1 ; a<GM_getValue('nb_tr_3')-1 ; a++)
			{
				var text = '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(a+'_0_1')+'</font></th>' ;
				for (b=1 ; b<nb_planet+1 ; b++ )
				{
					var id = a+'_'+b+'_'+planet_type ;
					if (GM_getValue(id) == undefined)
					{
						GM_setValue(id,'-');
					}
					text += '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(id)+'</font></th>' ;
				}
				document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" >'+text+'</tr>' ;
			}
		}

		if (GM_getValue('view_ships') == 1)
		{
			document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" valign="left"><td class="c" colspan="10">'+GM_getValue(GM_getValue('nb_tr_3')+'_0_1')+'</td></tr>' ;
			for (a=GM_getValue('nb_tr_3')+1 ; a<GM_getValue('nb_tr_4')-1 ; a++)
			{
				var text = '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(a+'_0_1')+'</font></th>' ;
				for (b=1 ; b<nb_planet+1 ; b++ )
				{
					var id = a+'_'+b+'_'+planet_type ;
					if (GM_getValue(id) == undefined)
					{
						GM_setValue(id,'-');
					}
					text += '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(id)+'</font></th>' ;
				}
				document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" >'+text+'</tr>' ;
			}
		}

		if (GM_getValue('view_defense') == 1)
		{
			document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" valign="left"><td class="c" colspan="10">'+GM_getValue(GM_getValue('nb_tr_4')+'_0_1')+'</td></tr>' ;
			for (a=GM_getValue('nb_tr_4')+1 ; a<GM_getValue('nb_tr_5')-1 ; a++)
			{
				var text = '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(a+'_0_1')+'</font></th>' ;
				for (b=1 ; b<nb_planet+1 ; b++ )
				{
					var id = a+'_'+b+'_'+planet_type ;
					if (GM_getValue(id) == undefined)
					{
						GM_setValue(id,'-');
					}
					text += '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(id)+'</font></th>' ;
				}
				document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" >'+text+'</tr>' ;
			}
		}

		if (GM_getValue('view_mond_buildings') == 1 && planet_type == 3)
		{
			document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" valign="left"><td class="c" colspan="10">'+GM_getValue(GM_getValue('nb_tr_5')+'_0_1')+'</td></tr>' ;
			for (a=GM_getValue('nb_tr_5')+1 ; a<GM_getValue('nb_tr_6')-1 ; a++)
			{
				var text = '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(a+'_0_1')+'</font></th>' ;
				for (b=1 ; b<nb_planet+1 ; b++ )
				{
					var id = a+'_'+b+'_'+planet_type ;
					if (GM_getValue(id) == undefined)
					{
						GM_setValue(id,'-');
					}
					text += '<th class="c" width="75"><font color="BEBEBE">'+GM_getValue(id)+'</font></th>' ;
				}
				document.getElementsByTagName('tbody')[0].innerHTML += '<tr height="20" >'+text+'</tr>' ;
			}
		}		
	}
	
	if (location.pathname == '/game/techtree.php' && verif_session == GM_getValue('session'))
	{
			GM_setValue('name_buildings' , xpath('/HTML[1]/BODY[1]/CENTER[3]/TABLE[1]/TBODY[1]/TR[1]/TD[1]').innerHTML) ;
			GM_setValue('name_research' , xpath('/HTML[1]/BODY[1]/CENTER[3]/TABLE[1]/TBODY[1]/TR[16]/TD[1]').innerHTML) ;
			GM_setValue('name_ships' , xpath('/HTML[1]/BODY[1]/CENTER[3]/TABLE[1]/TBODY[1]/TR[32]/TD[1]').innerHTML) ;
			GM_setValue('name_defenses' , xpath('/HTML[1]/BODY[1]/CENTER[3]/TABLE[1]/TBODY[1]/TR[47]/TD[1]').innerHTML) ;
			GM_setValue('name_mond_buildings' , xpath('/HTML[1]/BODY[1]/CENTER[3]/TABLE[1]/TBODY[1]/TR[58]/TD[1]').innerHTML) ;

			var tab = xpath('/HTML[1]/BODY[1]/CENTER[3]/TABLE[1]').getElementsByTagName('tr') ;
			var tr = xpath('/HTML[1]/BODY[1]/CENTER[3]/TABLE[1]') ;
			var b = 0 ;
			var c = 1 ;
			for (a=0 ; a<tab.length ; a++)
			{
				b = a + 8 ;
				if (tab[a].getElementsByTagName('a').length != 0)
				{
					GM_setValue('gid_'+tab[a].getElementsByTagName('a')[0].href.split('&gid=')[1] , a+1) ;
					GM_setValue(b+'_0_1' , '<a href="http://'+GM_getValue('location_host')+'/game/infos.php?session='+GM_getValue('session')+'&gid='+tab[a].getElementsByTagName('a')[0].href.split('&gid=')[1]+'">'+tab[a].getElementsByTagName('a')[0].text+'</a>' ) ;
				}
				else
				{
					GM_setValue(b+'_0_1' , tab[a].firstChild.firstChild.nodeValue) ;
					GM_setValue('nb_tr_'+c , b);
					c++ ;
				}
			}
	}

	if ((location.pathname == '/game/b_building.php' || location.pathname == '/game/buildings.php') && verif_session == GM_getValue('session'))
	{
		var option = document.getElementsByTagName('option') ;
		var indice ;
		var id ;
		var planet_type ;
		var ahref ;
		for (a=0 ; a<option.length ; a++)
		{

			if (option[a].selected == true)
			{
				if (option[a].firstChild.nodeValue.indexOf('(') == -1)
				{
					planet_type = 1 ;
				}
				else
				{
					planet_type = 3 ;
				}
				indice = GM_getValue('cp_'+option[a].value.split('&')[1].split('cp=')[1]) ;
			}
		}
		if (location.pathname.split('/')[2] == 'b_building.php')
		{
			ahref = '<a style="cursor: pointer;" onclick="document.location.href=\''+location.pathname.split('/')[2]+'?session='+GM_getValue('session')+'&cp='+GM_getValue('cp_'+indice+'_'+planet_type)+'\'" ondblclick="document.location.href=\''+location.pathname.split('/')[2]+'?session='+GM_getValue('session')+'&cp='+GM_getValue('cp_'+indice+'_'+planet_type)+'&bau=1&imperium=1&planettype='+planet_type+'\'" title="Clic simple: Menu batiments, Double-clic: Construire un batiment">' ;
		}
		else
		{
			ahref = '<a href="http://'+location.host+location.pathname+'?session='+GM_getValue('session')+'&cp='+GM_getValue('cp_'+indice+'_'+planet_type)+'&mode='+location.href.split('&mode=')[1]+'&planettype='+planet_type+'">' ;
		}
		var tab ;
		var nb_tr ;
		if (location.href.split('&mode=')[1] == 'Flotte' || location.href.split('&mode=')[1] == 'Verteidigung' )
		{
			tab = xpath('/HTML[1]/BODY[1]/CENTER[1]/FORM[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]') ;
			nb_tr = tab.getElementsByTagName('tr').length-1 ;
		}
		else 
		{
			tab = xpath('/HTML[1]/BODY[1]/CENTER[1]/TABLE[1]/TBODY[1]/TR[1]/TD[1]/TABLE[1]') ;
			nb_tr = tab.getElementsByTagName('tr').length ;
		}
		for (b=0 ; b<nb_tr ; b++)
			{	
				var colour ;
				if (tab.getElementsByTagName('tr')[b].getElementsByTagName('td')[2].innerHTML != '')
				{
					if (tab.getElementsByTagName('tr')[b].getElementsByTagName('td')[2].getElementsByTagName('input').length > 0 || tab.getElementsByTagName('tr')[b].getElementsByTagName('td')[2].getElementsByTagName('font')[0].color == '#00ff00')
					{
						colour = 'lime' ;
					}
					else
					{
						colour = 'red' ;
					}
				}
				var text = tab.getElementsByTagName('tr')[b].getElementsByTagName('td')[1].childNodes[1] ;
				var gid = tab.getElementsByTagName('tr')[b].getElementsByTagName('td')[1].getElementsByTagName('a')[0].href.split('&gid=')[1] ;
				var indice_1 = GM_getValue('gid_'+gid)+7 ;
				id = indice_1+'_'+indice+'_'+planet_type ;
				var valeur = tab.getElementsByTagName('tr')[b].getElementsByTagName('td')[1].childNodes[1].nodeValue;
				if (text.nodeName == '#text' )
				{

					if (isFinite(tab.getElementsByTagName('tr')[b].getElementsByTagName('td')[1].childNodes[1].nodeValue.split(' ')[2]) == true)
					{
						GM_setValue(id , ahref+'<font color="'+colour+'">'+valeur.split(' ')[2]+'</font></a>') ;//
					}
					else
					{
						GM_setValue(id , '<a><font color="'+colour+'">'+valeur.split(' ')[1].split('(')[1]+'</font></a>') ;
					}
				}
				else
				{
					GM_setValue(id , '-') ;
				}
			}
	}

	if (location.pathname == '/game/options.php')
	{
		var B_sv = xpath_1("//input[@type='submit']") ;
		if(B_sv.snapshotLength > 0)
		{
			B_sv = B_sv.snapshotItem(0).value ;
		} 
		else 
		{
			B_sv = "  Save   " ;
		}
		var view_resources = checker('view_resources','1');
		var view_buildings = checker('view_buildings','1');
		var view_reseach = checker('view_reseach','1');
		var view_ships = checker('view_ships','1');
		var view_defense = checker('view_defense','1');
		var view_mond_buildings = checker('view_mond_buildings','1');
		
		var empire_options = document.createElement('table') ;
			empire_options.width = '519px' ;
			empire_options.innerHTML = '<tr><br></tr><tr><td class="c" colspan="6">Menu '+GM_getValue('name_empire')+' ( Affichage )</td></tr><tr><th>'+name_resources+'</th><th>'+GM_getValue(GM_getValue('nb_tr_1')+'_0_1')+'</th><th>'+GM_getValue(GM_getValue('nb_tr_2')+'_0_1')+'</th><th>'+GM_getValue(GM_getValue('nb_tr_3')+'_0_1')+'</th><th>'+GM_getValue(GM_getValue('nb_tr_4')+'_0_1')+'</th><th>'+GM_getValue(GM_getValue('nb_tr_5')+'_0_1')+'</th></tr><tr><th><input type="checkbox" id="view_resources" value="'+view_resources+'" '+togglecheck(view_resources)+' onclick="javascript: if(this.value == \'0\'){this.value = \'1\';} else {this.value = \'0\';}"></th><th><input type="checkbox" id="view_buildings" value="'+view_buildings+'" '+togglecheck(view_buildings)+' onclick="javascript: if(this.value == \'0\'){this.value = \'1\';} else {this.value = \'0\';}"></th><th><input type="checkbox" id="view_reseach" value="'+view_reseach+'" '+togglecheck(view_reseach)+' onclick="javascript: if(this.value == \'0\'){this.value = \'1\';} else {this.value = \'0\';}"></th><th><input type="checkbox" id="view_ships" value="'+view_ships+'" '+togglecheck(view_ships)+' onclick="javascript: if(this.value == \'0\'){this.value = \'1\';} else {this.value = \'0\';}"></th><th><input type="checkbox" id="view_defense" value="'+view_defense+'" '+togglecheck(view_defense)+' onclick="javascript: if(this.value == \'0\'){this.value = \'1\';} else {this.value = \'0\';}"></th><th><input type="checkbox" id="view_mond_buildings" value="'+view_mond_buildings+'" '+togglecheck(view_mond_buildings)+' onclick="javascript: if(this.value == \'0\'){this.value = \'1\';} else {this.value = \'0\';}"></th></tr><tr><th colspan="6"><input id="saveall" value="'+B_sv+'" type="submit"></th></tr>';
			xpath('/HTML[1]/BODY[1]/CENTER[2]/FORM[1]').appendChild(empire_options) ;
			document.getElementById("saveall").addEventListener("click", saver, false);
	}

	function xpath(query) 
		{
			return document.evaluate(query, document, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		}
	function xpath_1(query) 
		{
			return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		}

	function saver()
		{
			GM_setValue('view_resources' , (document.getElementById('view_resources').value)) ;
			GM_setValue('view_buildings' , (document.getElementById('view_buildings').value)) ;
			GM_setValue('view_reseach' , (document.getElementById('view_reseach').value)) ;
			GM_setValue('view_ships' , (document.getElementById('view_ships').value)) ;	
			GM_setValue('view_defense' , (document.getElementById('view_defense').value)) ;
			GM_setValue('view_mond_buildings' , (document.getElementById('view_mond_buildings').value)) ;
		}
	function togglecheck(str)
		{
			if(str == '1')
			{
				return 'checked="checked"';
			} 
			else if(str == '0')
			{
				return '0';
			} 
		}
	function checker(vartitle, vardefault)
		{
			var temp = GM_getValue(vartitle);
			if (temp == undefined)
			{ 
				return vardefault ;
			} 
			else 
			{
				return temp ;
			}
		}