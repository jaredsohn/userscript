// ==UserScript==
// @name           Modern Category Icons Pack
// @namespace      Modern Category Icons Pack
// @author         TuNA
// @description    Icon Pack for The Modern Style Sheet.
// @version        1.0
// @include        http*://feedthe.net/browse.php*
// ==/UserScript==
var imgs = document.getElementsByTagName('img')

for ( var i in imgs )
{

	for ( o = 1; o <5; o++)
	{
	
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_hd.png"){
		imgs[i].src = "http://i.imgur.com/rSUq5.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_tv_hd.gif"){
		imgs[i].src = "http://i.imgur.com/ifCE0.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_iso.gif"){
		imgs[i].src = "http://i.imgur.com/WBCTC.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_wii.gif"){
		imgs[i].src = "http://i.imgur.com/1vAGj.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_apps_iso.gif"){
		imgs[i].src = "http://i.imgur.com/xOu2h.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_dox.gif"){
		imgs[i].src = "http://i.imgur.com/onrk1.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_dvdr.gif"){
		imgs[i].src = "http://i.imgur.com/5z7EN.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_tv_sd.png"){
		imgs[i].src = "http://i.imgur.com/aDH4f.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_ps3.png"){
		imgs[i].src = "http://i.imgur.com/MskT5.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_xbox.gif"){
		imgs[i].src = "http://i.imgur.com/kQhVz.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_apps_rip.gif"){
		imgs[i].src = "http://i.imgur.com/zdZGm.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_xxx.gif"){
		imgs[i].src = "http://i.imgur.com/xvirZ.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_sd.png"){
		imgs[i].src = "http://i.imgur.com/z7wf38r.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_misc.gif"){
		imgs[i].src = "http://i.imgur.com/ZHarq.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_psp.gif"){
		imgs[i].src = "http://i.imgur.com/ehagm.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_mvids.gif"){
		imgs[i].src = "http://i.imgur.com/uQi4z.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_music.gif"){
		imgs[i].src = "http://i.imgur.com/baQqD.png"
		}
	}
	
}