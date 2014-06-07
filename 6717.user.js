// ==UserScript==
// @name Ogame - fleet
// @spacename a.galli85@gmail.com
// @description Aggiunge un menu sotto gli altri con le principali funzioni amministrative
// @include http://ogame*.de/game/leftmenu.php*
// @include http://*.gfsrv.net/game/leftmenu.php*
// ==/UserScript==
(function() {
	/* Codice originale di: Lord Mokuba*/
	/* in via di modifica da cabal
	/* versione alpha iniziale
	
	//
	// sessione
	//
	var Session = document.body.innerHTML.substr(document.body.innerHTML.indexOf("session=") + 8,12);
	//
	// elenco righe
	//
	var trs = document.getElementsByTagName('tr');
	//
	// eliminazione riche
	//
	for (var i = 0; i < trs.length; i++) {
		
		if(trs[i].innerHTML.indexOf("Commander Info</font>") != -1){
			// borramos el anuncio de Commandante
			trs[i].parentNode.removeChild(trs[i]);
		}
		else if(trs[i].innerHTML.indexOf("Aiuto") != -1){
			trs[i].parentNode.removeChild(trs[i]);
		}
		else if (trs[i].innerHTML.indexOf("Regole") != -1){
			trs[i].parentNode.removeChild(trs[i]);
		}
	}	
							///////////////////////////////////////////
							///////////////////////////////////////////
							////	                               ////
							////  MENU amministrazione             ////
							////				       ////
							///////////////////////////////////////////
							///////////////////////////////////////////

	////...Separatore
	trs[trs.length-1].innerHTML ='<tr><td align="left"><img src="http://digilander.libero.it/alga85/ogame/SeleneSkin/gfx/user-menu.jpg" width="110" height="19"></td></tr>'+
	
	////...circolare
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=17" target="Hauptframe">Messaggio Circolare</font></div></td></tr>'+
	
	////...Amministra Alleanza
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=5" target="Hauptframe">Amministra Ally</a></font></div></td></tr>'+

	////...Amministra i Membri
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=7&sort1=3&sort2=0" target="Hauptframe">Amministra Membri</a></font></div></td></tr>'+
	
	////...lista membri e ban
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=4&sort1=3&sort2=0" target="Hauptframe">Lista Membri</a></font></div></td></tr>'+
	
	////.. Top 100 Alleanze
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="stat.php?session=' + Session + '&start=1&who=ally" target="Hauptframe">Top 100 Alleanze</a></font></div></td></tr>'+
      	
	////...lista ban
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="pranger.php" target="Hauptframe">Lista Ban</a></font></div></td></tr>'+
		////...Separatore
	trs[trs.length-1].innerHTML ='<tr><td align="left"><img src="http://digilander.libero.it/alga85/ogame/SeleneSkin/gfx/user-menu.jpg" width="110" height="19"></td></tr>'+
	
	////...Fleet
	'<tr><td><div align="center"><font color="#FFFFFF"><a href="allianzen.php?session=' + Session + '&a=17" target="Hauptframe">Fleet Save</font></div></td></tr>'+

	////...forum Selene uni 22
	////'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://selene.forumfree.net/" target="Hauptframe">Selene Forum</a></font></div></td></tr>'+
	
	////...forum seleneJ
	////'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://selene.forumfree.org/" target="Hauptframe">SeleneCR & J Forum</a></font></div></td></tr>'+
	
	////...forum VxSelene
	////'<tr><td><div align="center"><font color="#FFFFFF"><a href="http://seleneu17.forumfree.org/" target="Hauptframe">VxSelene & VxS AC Forum</a></font></div></td></tr>'+

	
	'';

})();

