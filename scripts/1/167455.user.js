// ==UserScript==
// @name           OptimusPrime's Category Icon Modern Pack
// @namespace      OptimusPrime's Category Icon Modern Pack
// @author         Icons by Optimus Prime, Script by TuNA
// @description    OptimusPrime's Category Icon Modern Pack
// @version        1.0
// @include        http*://feedthe.net/*
// ==/UserScript==
var imgs = document.getElementsByTagName('img')

for ( var i in imgs )
{

	for ( o = 1; o <5; o++)
	{
	
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_hd.png"){
		imgs[i].src = "http://i.imgur.com/yHdA7Eu.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_tv_hd.gif"){
		imgs[i].src = "http://i.imgur.com/frbgGp1.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_iso.gif"){
		imgs[i].src = "http://i.imgur.com/c59iipm.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_wii.gif"){
		imgs[i].src = "http://i.imgur.com/cPk0r1I.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_apps_iso.gif"){
		imgs[i].src = "http://i.imgur.com/G4JraPG.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_dox.gif"){
		imgs[i].src = "http://i.imgur.com/49qtQqb.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_dvdr.gif"){
		imgs[i].src = "http://i.imgur.com/dUC9TIE.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_tv_sd.png"){
		imgs[i].src = "http://i.imgur.com/eYmGTEK.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_ps3.png"){
		imgs[i].src = "http://i.imgur.com/P3XfB8d.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_xbox.gif"){
		imgs[i].src = "http://i.imgur.com/QbIibDP.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_apps_rip.gif"){
		imgs[i].src = "http://i.imgur.com/sOKQvO8.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_xxx.gif"){
		imgs[i].src = "http://i.imgur.com/eh8cM9W.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_xvid.gif"){
		imgs[i].src = "http://i.imgur.com/Gt80ase.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_misc.gif"){
		imgs[i].src = "http://i.imgur.com/kg1GxIg.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_psp.gif"){
		imgs[i].src = "http://i.imgur.com/IvdYHIB.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_mvids.gif"){
		imgs[i].src = "http://i.imgur.com/2rQDaAQ.jpg"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_music.gif"){
		imgs[i].src = "http://i.imgur.com/DcvAKlC.jpg"
		}
	}
	
}