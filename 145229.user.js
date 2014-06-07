// ==UserScript==
// @name           FTN Grungy Category Icons Pack
// @namespace      FTN Grungy Category Icons Pack
// @author         TuNA
// @description    Grungy Category Icons Pack.
// @version        1.0
// @include        http*://feedthe.net/browse.php*
// ==/UserScript==
var imgs = document.getElementsByTagName('img')

for ( var i in imgs )
{

	for ( o = 1; o <5; o++)
	{
	
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_hd.png"){
		imgs[i].src = "http://www.pictureshack.us/images/83557_Movies-HD.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_tv_hd.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/8201_TV-HD.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_iso.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/51167_Games-PC.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_wii.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/33977_Games-WII.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_apps_iso.gif"){
		imgs[i].src = "http://i.imgur.com/GOiv6.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_dox.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/23793_DOX.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_dvdr.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/93512_Movies-DVDR.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_tv_sd.png"){
		imgs[i].src = "http://www.pictureshack.us/images/91512_TV-SD.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_ps3.png"){
		imgs[i].src = "http://www.pictureshack.us/images/59391_Games-PS3.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_xbox.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/87588_Games-Xbox.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_apps_rip.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/26417_Appz-RIP.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_xxx.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/27984_X.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_movies_sd.png"){
		imgs[i].src = "http://www.pictureshack.us/images/17926_Movies-SD.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_misc.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/73157_MISC.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_games_psp.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/711_Games-PSP.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_mvids.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/21528_MVIDS.png"
		}
		
		if (imgs[i].src == "https://feedthe.net/pic/default/categories/fTn_pHn/cat_music.gif"){
		imgs[i].src = "http://www.pictureshack.us/images/82296_Music.png"
		}
	}
	
}