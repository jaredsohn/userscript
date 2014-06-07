// ==UserScript==
// @name	  OGame FR : Rajoute lien porte de saut et supprime icones officiers , bannière et textes commandant
// @author 	  Flater
// @description   OGame FR : OGame FR : Rajoute lien porte de saut et supprime icones officiers , bannière et textes commandant
// @language FR
// @include	  http://ogame*.de/game/*
// @exclude	   
// ==/UserScript==    

		var icon = document.getElementsByTagName('img') ;
		var texte = document.getElementsByTagName('tr') ;
		var banner = document.getElementsByTagName('a') ;
		var session_id = location.search.split('&')[0].split('=')[1] ;
		var position_name = 'Technologies' ;
		var e = 0 ;

		
		for (a=0 ; a<banner.length ; a++ )
		{
			if (banner[a].id == 'combox')
			{
				banner[a].style.display = 'none' ;
			}
		}
		var icon1 = 'http://' + location.host + '/game/img/commander_ikon_un.gif' ;
		for (b=0 ; b<icon.length ; b++)
		{
			if (icon[b].src == icon1)
			{
				for (c=0 ; c<5 ; c++)
				{
					icon[b+c].style.display = 'none' ;
				}
			}
		
		}
		for (d=0 ; d<texte.length ; d++)
		{
			
			if (texte[d].getElementsByTagName('font')[0])
			{
				if (texte[d].getElementsByTagName('font')[0].innerHTML == 'Infos Commandant')
				{
					for (e=0 ; e<3 ; e++)
					{
						texte[d+e].style.display = 'none' ;
					}
				}
				if (texte[d].getElementsByTagName('a')[0].text == position_name && e<1)
				{
					var trClone = texte[d].cloneNode(true) ;
					trClone.getElementsByTagName('a')[0].innerHTML = 'Porte de saut' ;
					trClone.getElementsByTagName('a')[0].href = 'infos.php?session='+session_id+'&gid=43' ;
					document.getElementsByTagName('tbody')[0].insertBefore(trClone ,texte[d]);
					e++ ;
				}
				
			}
		}