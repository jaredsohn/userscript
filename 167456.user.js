// ==UserScript==
// @name           OptimusPrime's Category Icon Woodgrain Pack
// @namespace      OptimusPrime's Category Icon Woodgrain Pack
// @author         Icons by Optimus Prime, Script by TuNA
// @description    OptimusPrime's Category Icon Woodgrain Pack
// @version        1.0
// @include        http*://feedthe.net/*
// ==/UserScript==
var imgs = document.getElementsByTagName('img')

for ( var i in imgs )
{

	for ( o = 1; o <5; o++)
	{
	
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_hd.png"){
		imgs[i].src = "http://i.imgur.com/sDSZvJu.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_tv_hd.gif"){
		imgs[i].src = "http://i.imgur.com/icsszF4.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_iso.gif"){
		imgs[i].src = "http://i.imgur.com/JkKKNlL.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_wii.gif"){
		imgs[i].src = "http://i.imgur.com/OuX55mh.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_apps_iso.gif"){
		imgs[i].src = "http://i.imgur.com/heOYkHA.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_dox.gif"){
		imgs[i].src = "http://i.imgur.com/fbxs8XI.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_dvdr.gif"){
		imgs[i].src = "http://i.imgur.com/sPKE4w9.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_tv_sd.png"){
		imgs[i].src = "http://i.imgur.com/qNzRJiN.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_ps3.png"){
		imgs[i].src = "http://i.imgur.com/UGI0r4e.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_xbox.gif"){
		imgs[i].src = "http://i.imgur.com/GH4G1AK.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_apps_rip.gif"){
		imgs[i].src = "http://i.imgur.com/Lwl0661.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_xxx.gif"){
		imgs[i].src = "http://i.imgur.com/F1NJLaQ.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_xvid.gif"){
		imgs[i].src = "http://i.imgur.com/OafJ9lg.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_misc.gif"){
		imgs[i].src = "http://i.imgur.com/NPjh0FF.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_psp.gif"){
		imgs[i].src = "http://i.imgur.com/E0SSXQT.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_mvids.gif"){
		imgs[i].src = "http://i.imgur.com/J4E6co1.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_music.gif"){
		imgs[i].src = "http://i.imgur.com/CLNMS0G.png"
		}
	}
	
}