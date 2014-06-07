// ==UserScript==
// @name           Optimus Prime's Category Icon Classical Pack
// @namespace      Optimus Prime's Category Icon Classical Pack
// @author         Icons by Optimus Prime, Script by TuNA
// @description    Optimus Prime's Category Icon Classical Pack
// @version        1.0
// @include        http*://feedthe.net/*
// ==/UserScript==
var imgs = document.getElementsByTagName('img')

for ( var i in imgs )
{

	for ( o = 1; o <5; o++)
	{
	
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_hd.png"){
		imgs[i].src = "http://i.imgur.com/ET4wLbe.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_tv_hd.gif"){
		imgs[i].src = "http://i.imgur.com/LzZQHLe.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_iso.gif"){
		imgs[i].src = "http://i.imgur.com/BAhpoRU.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_wii.gif"){
		imgs[i].src = "http://i.imgur.com/qxZkN4s.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_apps_iso.gif"){
		imgs[i].src = "http://i.imgur.com/KpltQe6.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_dox.gif"){
		imgs[i].src = "http://i.imgur.com/vYTaHj8.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_dvdr.gif"){
		imgs[i].src = "http://i.imgur.com/EH9h8Rs.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_tv_sd.png"){
		imgs[i].src = "http://i.imgur.com/QaHddwN.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_ps3.png"){
		imgs[i].src = "http://i.imgur.com/VoIBa35.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_xbox.gif"){
		imgs[i].src = "http://i.imgur.com/kCnA9aS.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_apps_rip.gif"){
		imgs[i].src = "http://i.imgur.com/T7upY3Y.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_xxx.gif"){
		imgs[i].src = "http://i.imgur.com/M1i1jOE.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_xvid.gif"){
		imgs[i].src = "http://i.imgur.com/wdVa8DP.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_misc.gif"){
		imgs[i].src = "http://i.imgur.com/ZGIb0eJ.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_psp.gif"){
		imgs[i].src = "http://i.imgur.com/n97XXyx.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_mvids.gif"){
		imgs[i].src = "http://i.imgur.com/Oe0tUii.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_music.gif"){
		imgs[i].src = "http://i.imgur.com/YR3WRoL.png"
		}
	}
	
}