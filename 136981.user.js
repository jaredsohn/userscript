// ==UserScript==
// @name			Ikariam Upgrade Watcher
// @version			1.4.6
// @namespace		http://ikariam.org/
// @description		Attaches a simple icon on each building which show level and if upgradeable
// @author			Unknown (Update By omri12345678910 From fxp.co.il)
// @homepage		http://fxp.co.il
// @include			http://s*.ikariam.*/index.php*
// @include			http://m*.ikariam.*/index.php*
// @exclude			http://board.ikariam.*/
// @exclude			http://support.ikariam.*/*
// @exclude			http://support.*.ikariam.*/*

// ==/UserScript==

// Version Log:
//    v1.4.6 (2012) (by omri12345678910)
//      - Secured compatibility with Ikariam 4.5
//		v1.4.1 (2011) (by KeyKon)
//			- Fixed/added some bulding costs.
//			- Fixed problems with ressources over onemillion.
//      - Fixed problems with the InfoBox of Academy
//      - Reworked display of InfoBox
//
// 		v1.4.0 (3. September 2010)
//			- Added Support for the new dump building with costs till level 40. (by omri12345678910)
//
//		v1.3.2 (26. October 2009)
//			- Fixed icon and tooltip positioning for temple (thanks to Lordshinjo "http://userscripts.org/scripts/show/136981" for pointing out the problem).
//
//		v1.3.1 (16. October 2009)
//			- Fixed the building cost calculation has been revised in Ikariam version 0.32 which I did not know, so the calculation are all wrong. This is now fixed (thanks to RandomMan "http://userscripts.org/users/91016" for pointing out the problem).
//			- Fixed a bug with dot-notation problem for servers which uses such notation (thanks to malus "http://userscripts.org/users/109688" for posting the bug).
//			- For servers which are still at version 0.31, the "old" building cost calculation is still supported.
//
//		v1.3.0 (15. October 2009)
//			- Building cost database updated.
//			- Images are now linked in place.
//			- Ready for Ikariam version 0.32.
//			- Fixed a bug where the info box is not positioning correctly on palace or residence construction spot.
//			- Fixed a bug for servers which use dot-notation as thousand seperator in stead of comma (thanks to Carpediem "http://userscripts.org/users/100184" for pointing out the bug).
//
//		v1.2.2 (27. June 2009)
//			- Now supporting CreaseKit and Fluid (thanks to Kahil Young "http://userscripts.org/users/69426" for the suggestion and testing the mod in Fluid).
//
//		v1.2.1 (8. June 2009)
//			- Fixed a bug which caused no resource reduction when a reduction building is being upgrade.
//			- Improved positioning of the icons. Icon and info box at construction spot are now correctly positioned.
//
//		v1.2.0 (2. June 2009)
//			- New: Added icon and info box to construction spot (thanks to giangkid "http://userscripts.org/users/86129" for the suggestion).
//
//		v1.1.1 (26. May 2009)
//			- Fixed a bug when NOT using Black Canvas add-on to Firefox, the level indication is not centralized correctly.
//
//		v1.1.0 (25. May 2009)
//			- New: Added a info box which shows up when mouse over the icon, the box can be turned off in the options page.
//			- Fixed a bug where in a rare case, an icon is not shown on the wall.
//			- Fixed a bug which caused no sulfur reduction bonus.
//
//		v1.0.3 (17. May 2009)
//			- Fixed first time running check which caused unnecessarily research checks.
//
//		v1.0.2 (17. May 2009)
//			- Fixed the parsing of the building level correctly for different languages (thanks to oliezekat "http://userscripts.org/users/78627").
//			- Improved bureaucracy-spot check.
//
//		v1.0.1 (17. May 2009)
//			- Fixed bureaucracy-spot, not showing if you are not done with that research.
//			- Removed alert boxes which shows up at the start.
//
// 		v1.0.0 (16. May 2009)
//			- Release.

/******************************* Support for GreaseKit Start ********************************/
// 	This work-around functions to support GreaseKit is original created by
//	Jim Tuttle (http://userscripts.org/scripts/review/41441), hence his should have
//	the credit for the functions. Thanks to him.
//	I have fixed the GM_getValue to support for default value which was not in the original version.

if(typeof GM_getValue === "undefined") {
	GM_getValue = function(name, defaultValue){
		var nameEQ = escape("_greasekit" + name) + "=", ca = document.cookie.split(';');
		for (var i = 0, c; i < ca.length; i++) { 
			var c = ca[i]; 
			while (c.charAt(0) == ' ') c = c.substring(1, c.length); 
			if (c.indexOf(nameEQ) == 0) {
				var value = unescape(c.substring(nameEQ.length, c.length));
				//	alert(name + ": " + value);
				return value;
			}
		}
		if (defaultValue != null) {
			return defaultValue;
		} else {
			return null;	
		}
	};
}

if(typeof GM_setValue === "undefined") {
	GM_setValue = function( name, value, options ){ 
		options = (options || {}); 
		if ( options.expiresInOneYear ){ 
			var today = new Date(); 
			today.setFullYear(today.getFullYear()+1, today.getMonth, today.getDay()); 
			options.expires = today; 
		}
		var curCookie = escape("_greasekit" + name) + "=" + escape(value) + 
		((options.expires) ? "; expires=" + options.expires.toGMTString() : "") + 
		((options.path)    ? "; path="    + options.path : "") + 
		((options.domain)  ? "; domain="  + options.domain : "") + 
		((options.secure)  ? "; secure" : ""); 
		document.cookie = curCookie; 
	};
}
/******************************* Support for GreaseKit End **********************************/


// URL to icons
//var imgURL = "http://www.atdao.dk/public/images/";

var imgYes, imgNo, imgWait, imgUnknown, imgWood, imgWine, imgMarble, imgSulfur, imgCrystal, imgScrollLeft_1, imgScrollLeft_2, imgScrollLeft_3, imgScrollRight_1, imgScrollRight_2, imgScrollRight_3, imgScrollMiddle_1, imgScrollMiddle_2, imgScrollMiddle_3;

imgYes				= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVHjatJbdK0NhHMd/Oy5ES5oUF/I2skySaBx5acWNXCrhwkuGC+IPIS4w5Qopl3JDLbOMFZLQxAy5mPKStJQL5vddz7RwZrPjV989ned0Pt+z55zn9z2aQCBAESqVVcYqYWlZWWL+huVnHbEOWE9KAI2CQQqrhSXP7y5IGx47Pb48kvvWHTxpyDCQLllHDfp66qzoeOcpJ2uF9RyNQTHLMrE5mTi1NU1vgbdI/5ASNAk0WDNAw3VDr3xoZZ1EMjA7Lhyti/tLZDuzUSxlLjRTe3kb1ebXLvOh7SeDUlZ/43ST5H24pL9UXlourQ+sYclmWIeYk8IeZlf3Uu+f4ShcCwZYgvlp0DxmH0/i5aF4CwywwAwZ6PC2WJ2zpFYJlgw2DCpntq3Sb29LLAUWmGDjx+D0Okntcl25MBTBICOeB6tU53ceDJkw0GKXql2CqZXonwsGfvQVtUsw/TC4xQ5UuwrS9Rh8MHDLebLqBqYcE4ZTGOz1V1ve0RXVKrDABBsG9+jnFrlPNQPBwua6D71Fq6P1I6/cauOGgwEWmOHNDpE3h34ezwPHtWCAFYrRb4HDQRMMnFg7K+4ccA4excAJD54ebrmJ6IrRRCbWXCzLXChofgv9VBH6VeGhf+w7Dp40Zhq/hv6OCP2naL8qlD5bssX8dbSfLR8CDACURMy5Nc8LLAAAAABJRU5ErkJggg==";
//imgYes      = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABnRSTlMAnwCfAADLv0idAAABt0lEQVR42q2VXUvCUByHn52ylWZTGr2tC1sGCVkXChEUdC1e9A37EuIXKIiCCeFFSm+LkCi2i2WzlphdTKksSVvP1Xbg/+yc3+B3pP19vqMobGyg673rV1ecnuI4P4yM9rxHo+TzyDItqIDb5N4BmFWIhFjR0XU8j0KBev3LoPR5R6kUm5vU4cDijZ8RsKMSheNjzs4+1kf29jpPu7usrXEOhkWbvrThpoEUZn2RWAzT/PgAQDpNIsHRM1WLQahaHD2TSJBOfxIpCpkMFbBdBsd2qUAmg6J0Rbkcj3BhMSwXFo+QywGIeBxZ5nB4i8+hhSwTjyOyWV7o+49+5Q1eIJtFaBqXf9YAcN1G0xCA5QYSPTx1w268BhL544J/QgDhsUAKf1wAaiSQaGYSQNRqLAc735JErYYolRgPEJWAcSiVELaN57Gt/lG0reJ52DYCKBaZguTwrqTKFBSL3bAdB8NgFaaHSX06wioYRqd5O+GUy5gmWxOD7iupsjWBaVIuf2tI06TVYn2BuTC3jb4l6VetBobByUmfzvZLLp8nFKIF5+A2uXMA5v3yhxFoNikUeu8S6b+uo3d+05LRgcu7PgAAAABJRU5ErkJggg==";
imgWait				= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH/SURBVHjatJbNSwJRFMWvg2DCGFKEComLCLIPMqIiWlW7qCSIiDYRLfof2rduGS0k2lS0CSvaVauQqEjpwyCCwkDDCkmhhNDuGd6EfahjTheOMG+c35l5b+aeZ8hms1SgrKw2VgtLZjnFeISVYp2xTlmJfABDHoNK1jCrx7/3JB2GkpRIvtNN5E05WeesIKvFSF2tFvL2VWd46IC1yXrRYtDEmln2P5hWtuOUyRR8QpIkA00M1tCk15bmw0XWRSGD/qPz5NjW/jMFgi9USnV7Kmmot4o6mi3rfLirjhtz/tPKGl1YjVIklqZSCzd0z9d1zFlG+fCRFVKeMGcxp2bnb6W/wNXCtWCAJZifBoNLGw9mnh4qt8AAC0zVoApvy9pOnPQqweoBGwadPCAVe1tKKbDABBs/7pPLFOldwbDCbICB/b6Mhc1Xd1GF6YCBjK9U7xJMWaJ/Lhik0Ff0LsFMwSBWazfpbuByKMwoDMLtjbLuBh63wryCwfH4QE0GXVG3eWcWmGBLojEd8IBuBoKFjHhU36LtqRFbmltt2XAwwAIzt9kh8nzo584yFhzXggGWGqM/Aof7uhI4pXZW3DngHDxfAue3yETwTHPLNaEraolMzLmYFp8aNMVC3ypCvzs39K/vXpWT9S7z99APiNBPaN1V5Nu2uNRepnXb8iHAALTTzrv1a76ZAAAAAElFTkSuQmCC";
imgNo				= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH6SURBVHjatJa7S8NgFMVvo7UGiq9JBxGnWkTEwYoPXFzFRelc6VDp0H/A2X9B7FDoXHQRVxfxgQ8QEalOUhx0EFu10NZq6jkxkfpIjTZeOP1ISn43373kns9VqVSkRrRBQ9AA5IW6jftXUB46hY6hnBXAZZGgBZqBxouplFLe3pZKNivPFxf6n40+n7ja28U9MSHNwaCGWzvQOvRgJ0E/FCnE455CIiGiaVIzFEXUcFjUSKSEqzh0VivBVHl3N1haXZWnrS35TTRNTopnbk7cY2MpXG5+l2AQWrifnVVeMhn5SzT09Ejr2hq3vAKd6Busaub8Yyz2ZziDz5JBlsF8TzBdWF5WUR6pN8ggi0yzRB1Yl+4CAeXHhtoNNL7j4ICwRe4gUEwmnYMzwNKZYPPHX97fF6ejfHjIpY8JOutprGXDLy+5dDGBV8NX6nQYTK8i/xxMkFcwVxwHvzHzTHDDL9DpaOjt5XLNBGn3yIjjCdzDw1zOmeCoORTS+HE4Vx9FdCbYpN5ynquhkGN8g0WPuDVfe0ONRksYtfWXBgyyyKwedrS8BOd5PQ3ns2SQZdroF8OB0eiG89vJyjcnHMZjaTjVxhPGyPUUkkl7lomaG2VJmEbzk+m3GaY/+sH00+k30/f7P5v+nmH6ObunCqtji9mgjN1jy6sAAwD9Hc4TcS9VxQAAAABJRU5ErkJggg==";
imgUnknown			= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHmSURBVHjatJYxT8JQFIUvXYgJGOJkQ0zDpoiIDCbGsWETSUjjbhz8MfwCBzcmQ0gQN9LRuBhERHQjjSE4MBBhYSne0zwIqMXW1pscmj5433m8tvc0MJlMaElFWHusHVaItSHG31gj1hPrgTWwAwRsDFZZx6zDWq0mNRoNGg6HZBiG9aWiKBQOhymVSlEmkzF56JZ1zfpwYrDNOi+Xy8FKpUKmaS77hyRJEuVyOcrn82M+vWA9LzNQm83mia7rVK/XyU2l02lSVZWSyeQVn+qzBcz9ZpelFYtF13AU5mAuGIK1YICLeVooFKRer0d/LcwFAyzBnBkclUqlFd4e8lpggAXm1GANd0u1WiW/SrAOwYbBPg9Iv90tbgosMMHGx1ar1SK/q91u47AJg3UvF9auut0uDjIMQnhK/S7BDEn0zwWDEfqK3yWYIxi8y7Lsu0E0GrWePRi8JBIJ3w3i8TgOrzC4z2azJrqib/vOLDDBBrWPfs4DvhkIFjKiP132jaZpY261nuFggAXmfLND5F2in3u54JgLBljTGP0WONzXrcBx21mxcsA5eBYC56fIRFicccsNois6iUzsudgWrPzRSehHROgfzId+p9OxvozFYl9D/06E/sDpW4Xda4sixg2nry2fAgwA7hjKmyGdaWoAAAAASUVORK5CYII=";
imgWood				= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAMCAYAAAC9QufkAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVHjadJJNSNNxGMc///lvrb3828q1FJ1MKHCjlF4ouihJB4O69HJO8FCX6NC5a0XdeoGgc5ZEkIJ1iBpJRQmh4jxs2pZzm5ub/jfHxl7s3/6/sbJgz+V5+fF9nu/z/T1S6ttTtlsur2rBuWcUkmX6zlxBsdolmpjhf+Ce1p2cPD2Mu8/F/Mt7yKai1gwsN4ItaUaTJJVSyS7yHbt2E4+pvB99wn5Ht3Zw4LzUdHIhr/7jDdUi6Vyte3aNdOQrQf+41nRy+MdPPN1dwjsdGULTUfxhCKQLuCy/6N+Y1JtonsER2jo9goWkC6bvtZ4u4R+7jd3RxoOJVVrym9y6uI+FUEowKJvstBtVEV+9+0iAZV2kaOgzxbWIYPB4NERLzd+84aOz18viizf4zFmShTowXZT/0rbYIrglM7R7ReG6IcaJ4UsE5mbJb2Q4erafpS9BvJWseM/EEiSiYU2nLusC5TYLVIpZjDYLkVhdMN/hXlLRJRSbGbPLyKvn66LedaiHwMP79Axd1mQd2Pgahayg1mioOPayHC+Ig1EcVqaiW0xOrOA2QeunMWSb9RSR8OvaJRlZnklyZ0rj2OyCYGGoWsnMR/n4ISwGDDqr4KwBFYiX7XW19R3evR1nerHCiqqxmkhx7VwHRwYO8N0f+lPv2HapF4aO81uAAQAil+gxsz59XAAAAABJRU5ErkJggg==";
imgWine				= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHGSURBVHjaYnx1ag4DOtj38OT/vefPM4iJMjDoyhgy2MmaM7AwMTAiq2FhwAKWnFgGpr//YmH4wXSP4SfTKwZPBl8UNUzomv78Y/gvIAYx78OrPwxf3/1jePLwBYbhGBpBThJXYYbzv7z7z2Dy3Q9DIyOyH1+/+/B/3oTdDFsunmeQU2cFi7Ebf2CQ0YCwHQRCGZzkzRlRbARpOrnkIsOD128YfPQNGfK1/BkaLKIZXh3mhtt8X3YDOODgGs/fePk/KLGLQYyPlyHR3JxBW0SMYcO1ywzzTxxnUDaTAWsC+ffh5d8MZ37thngJFBi/TzwF2wJS/P7zNwYFURGGwzdvMrz4+JlhUpcbw+79dxnUrdihNn9g2M6w+T/L+w8fGNp372JINrdkuPrmFcPqU2cYJJ7xMpQ7u4MVXr59GEyDQpdbCOKzZ/+OIeJx6/VrYNpFUwtMq8tIMtx88pzhxrnX8MARkUaENrP8N56Gjz9+MJjJyzOEm5kwCLFzMtx+85ph/YULDOefPmGYlFPKoH5eg+EYwxkGMQVmhm+f/zNE/KuERAcoREGmgKJCVUWVwS/GACOJgQLwDOcmhndMtxmSuKsYAAIMAHIKugpSnTR5AAAAAElFTkSuQmCC";
imgMarble			= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGoSURBVHjahFJdL8NgFH46XddtXZdN4yOWmBAXSCSEGy5dSvxB/8MdQUSQIBIuFqLD0q7ZlK5dt7a8+p6Jj2Tm3PT07Xue83xUsE63MahYqsAcYRRC4xLpdBrJISb8/C4OGg7fBCYWF1C/ucLxwQ1EgWFtuczKE8NfIIlBw5VmqteHXQQdH1G8fPe4Ar3WZP8CXOghtJExRP4LvJaLtufiLQZqOQ529mJGlzrrC8A111Fm2ZxCW4/2D8D7jc2tWH+PeRAE+JMBN0yWZahqHr7fQUbJYW5xhdhIchrFQv7X/b4SnBcbRq0Wuy7Tdi6jeneL6r1OIJqm4cF4JS/6AvDNk9MzKE3Nkn5ejboJv+1BkmRksgqdnVw9fcdIkZXWKbJ8oUAyLOORgNqdEE37FS3Xg+vYcD2fZorDxR7Ac6CwIbWETjxwdrgLMSnCcVyiOr+0Cnl8HO9Rl4YMo46cqpKR/E6Cbw4lDRk5iYZlovvpcBQGeKjquD4/JU8SYu+f4DLEpEQ9jzZhhiP0YpoWPXnOPL5ULIEXpyxEPlzbQk7J0pndbHz59SHAAPFG0oxdJVVKAAAAAElFTkSuQmCC";
imgSulfur			= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVHjajJJNaxNRFIafGZNp08zEJE3EaFOTCNFaRFqUggURddWFKC5cCP4H8V+4cVNc6cK6caMuBEGQaoVGLA1aJVosbZqONmnMh81kMu1UM85MQYrU4IELF877de49QnnmLp3KK723PmRyDJy8JuzWFzuSg6LVNosMnx1hLjtltdtb1n8L+A8mLYkiohRDbxyiNxrk47sMf4vsKuCAjPIL2FpCil7GaL1lLf+K0sJLHtwZ75wgfPyKpcTT7BE0TO8oPitDfypKS9NpapvIXWXu3bpp3R+/bf0zQXXxKR5JRtkrYKwvs6HXiCfDyEoXP+omp88NUy8v83VlzvojIHp9luP+bfo6oUg3tdUc048maAtR8vN5egIBhkbTLtbn07h0dYDnDye2Ezjk4NExNPUJ4QOD/DSbzL7OkUjLmM0F1KXvtBoNO5Gfvn4FNV9zTzAkIe4kO69eKZWYfPyMUxcuumKLuYI7f7Wyibauc2ZsiC+fqrSaJqrawuPbtx/1zQ032sq8DdYrHDmRwN+tUvhcd53KRQ3ZJvT4I8TiEuljvWRn1kimDiO632VXvaZgCn0Mjpy3QSGaDdON7Tg5FYmFXHGnHANF9rh3YecqO/+vKLP2CqYw9ASGsbq9kaLszCo4fX+gQL2yQaX8i+zkFL8FGABBCeG3MCTxbAAAAABJRU5ErkJggg==";
imgCrystal			= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAMCAYAAAC9QufkAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVHjabFLPTxNREP62u12WbdfSLiVSa1OgGIEABWMImiByENFoAvwBXLh68MK/4cmb8Wi4kXA0Bi7EH5Sfxq5GGzCSIpTYlO12a9utD3aq1Y2dy8y8N9+bb755XGb9GRrZT+ZmCWEY160tSFyFa1QjNDp8uhdix3wQ0VAL0uId3JC+skgx+d8Drkbg7SxPvlCuwixb+PgritWMh9lsHODPeYktcvfZ88okS5bb6wVKE49iqUxFacPCk2UNb05EJ+10kYcpWZS84waQ9cnn0QblplVrlNLek7/UXHXS1gwfbnW1UiKLAr78MCFIMpjohSxweL2r4UPiLSYnRuGPz+Jf6q5e7ykuuIFuVab5bOtq9ZA/KZSQ2VmjONYzBL3i1IazVzW/cZndi3cipTM0N4lI7h9g+loMS5sp9Mt5DMRHsJw8JMCjKwb+KE9qDwWqePnpCBFVqYu0+z2PQFXH3fHbuBqUEQkotf17onXqLjt40OcnqmLFwGC7gottbUT58cxETSivG2MdKhbGY3ih6bA/D4G/GTxe6WGoahAre7nafs+7P+wLUZw4yDnmtO92dOXvzHNLBuu4OYWwWMJYLAi/r4W6LW7uY7AzjMOcCfP3OIWCgaxRpLozAQYAw+q/LLa8YygAAAAASUVORK5CYII=";
imgScrollLeft_1		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAuCAYAAAAcEfjaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEPSURBVHjaYmQAgtZg8/8g+tMPFobP738wTDt2lpEBB2BC4f37z0AIMP55svP/h6NNDOeOXGfYe/YHg6oMC4O9IRfDvK1fGIx1VRjExf8yKOoqMwjwczCwcTEBbfjzA6jvPwPjf2aG/yD8j5GBiZkJjw2fn/z/8fIMw6OLRxke3brLICbJyCAkwcFw7DgLg5axIQM/PyODoIotAycHDwMzOwsDEwOJYFTDqIZRDaMaRjWMahiuGlgY3p5n+HG2i+HxwTsMu85+BdfTzsYcDJf3fmVge3URXE+zvtnPwAKspxnB9TTDP1Dty8DM8o+BnZURiP8zMDPiaQnsnl34/9SOYwxEtzVcU/sZSWlrAAQYAKhSVaS8GpLcAAAAAElFTkSuQmCC";
imgScrollRight_1	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAuCAYAAAAcEfjaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADpSURBVHjaYmTAA1qDzf+D6E8/WBg+v//BMO3YWUYmBmLAv/9wJuOvY1Fg3q9v/xg+fPwBFry69xiDc9Vihg9HmxjOHbnOsPfsDwZVGRYGe0MuBtw2/AFp/s/A+J+Z4T8I/2NkYGJmYmD88+Ue2Ia/P/8wfP/xBaz2y9MbDBKadgw/Xp5heHTxKMOjW3cZxCQZGYQkOBiI8wMSGNUwqmFUw6iGUQ2jGoarBpZ/l2rAjN/AevoLUj0tUTaX4cfZLobHB+8w7Dr7FVxPOxvjrUX/gep9BmaWfwzsrIxA/J+BmREkQuu2BkCAAQA7Pl6Fy9SDcAAAAABJRU5ErkJggg==";
imgScrollMiddle_1	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAuCAYAAADp73NqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAmSURBVHjaYvj//z8DA5j4dSzqPxMDCPz5cg/CGooEkj/gfgMIMAB2KxZChMiVfwAAAABJRU5ErkJggg==";
imgScrollLeft_2		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABmCAYAAAD/GnDbAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEgSURBVHja7Ni9SgNREIbhd3ZPkjUIqxZGwUaMjZAibGElFuIVeA1egLcg2NjY2QjeheAPQQQTQVwlWAREm5hGURRjYIu4x802YhGNlc18MByGw8P0n5BkY2Xe9t63yNB+idiuhUKfON+22PJbpNs6sK/VdS5PG1TCiNkpw2I5z+7eO0GpSKHwwXRphhHfI5t3kgvdKHEWsS62N7HguM4PF9otGz1c0KxXad7cMT4pjE141M4Mc0EZ3xdGiwsMecO4OYPDH6NAgQIFChQoUKBAgQIFChQoUKDg/4Dh+Yoo3OT+5JbDsJP2S0uBx3WlQ/axnvZLmadjjO8hab9EnDjBNTG5jCRjcaX/BTnaWbPn+7V0GagjW17d+vocoCP7FGAAffVWFCyKGPAAAAAASUVORK5CYII=";
imgScrollRight_2	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABmCAYAAAD/GnDbAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEBSURBVHja7Ni/agJBEAbwb+5OIpYpwgm2KVJKinRJ4SOky4NYBCvBxgews8pbCBaBeJUXSCAkhGhhsLDy32k25tzV2yLY5LAQ0nwDw84O+2PYdgQpUbu+MMk5Ux7mY4VGEIqDfUKb31JWwY29rZYak6myzZd2gNLtHSadKh4fXtEOFU4LHq6KOfw9IU6wgRgXJkktcFwHEkd9O2H9HeNLRfZtNHyDf3YJNepi8NTB4L2Hk7zg2M9ivz/sBAEBAQEBAQEBAQEBAQEBAQHB/wFPP1ds8bPUiHb2S365CRXW8Xn/gVa4sPul0nnq9kdvU+B6GkcZ2aaBK0knJQ6yI9sIMADZCV71Yy13bQAAAABJRU5ErkJggg==";
imgScrollMiddle_2	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABmCAYAAAAK5PtrAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAtSURBVHjaYv7//z8DEwMQMP0+Hv0fzGL48+UehDVKDB+C4dexKGj8wuMcIMAAUqQQxLAX0V0AAAAASUVORK5CYII=";
imgScrollLeft_3		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABSCAYAAABg8TVgAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD4SURBVFhHY/zzZOf/D0ebGM4duc6w9+wPBlUZFgZ7Qy6GeVu/MBjrqjCIi/9lUNRVZhDg52Bg42JiYPjzYOP/Nyut/u/OEf1fZsn7f3YI//+7XVL/K214/q/JNPh/uEH3/5O1Af+/7In4/+tY1H+GP5+f/P9yZ8P/a2tL/+9oD/p/bkHw/wc7ov8vq4//f2HThP/3D078/+Hpuf8/3976/+fLvVENo6E0mjRG88NoqTFaVI7WD6OV4mjTYbS9NNpIHG0Zj/YfRjtNQ6Gn+GAzuHu8M0vsf5E59//pwfz/b7WJ4+keg/vT1v/35ImAFc2L4Pt/tx23BgAm/iVH1fnb5AAAAABJRU5ErkJggg==";
imgScrollRight_3	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAABSCAYAAABg8TVgAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADnSURBVFhHY/x1LOo/AxD8+vaP4cPHHyAmw9W9xxicqxYzfDjaxHDuyHWGvWd/MKjKsDDYG3IBFQI1gPCXPRH/n6wNAOOdWWL//zzY+P/NSqv/u3NE/5dZ8v6fHcL//26X1H+GP1/u/Qfhn29v/f/w9BwYPzm17P+fz0/+f7mz4f+1taX/d7QH/T+3IPj/gx3RoxpGQ2k0aYzmh9FSY7SoHK0fRivF0abDaHtptJE42jIe7T+MdpqGQE8Rd/d4M7h7DOoqF5lz/58ezP//Vpv4fwL9aev/e/JE/lfa8PyfF8H3/267+H8AIETKRccdPvAAAAAASUVORK5CYII=";
imgScrollMiddle_3	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABSCAYAAACVD77QAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAaSURBVChTY/h1LOo/A5j48+XeKDHgYQCPDwBlWjTqaqkD+QAAAABJRU5ErkJggg==";

// Server host and hostname
var host = top.location.host;
var hostname = top.location.hostname.split(".");

// Game version
var version = GM_getValue(host + "_iuw_version", '');

// Materials reduction from researches
var pulley = GM_getValue(host + "_iuw_pulley", false);
var geometry = GM_getValue(host + "_iuw_geometry", false);
var spirit = GM_getValue(host + "_iuw_spirit", false);

// Var for showing info box or not, default true
var showInfoBox = GM_getValue(host + "_iuw_infobox", true);

// If spot/pos 13 is available
var bureaucracy = GM_getValue(host + "_iuw_bureaucracy", false);

// First timer var
var firstTimer = GM_getValue(host + "_iuw_first_timer", true);

// Gets the view
var view = getView();

// Helper var to check if we should skip the checking the research
var skipResearch = GM_getValue(host + "_iuw_skip_research", false);

// Extracting action
var uri = top.location.search, action = getAction(uri);

// Just after login
if (action == "loginAvatar" && skipResearch == false) {

	// Do syncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), false);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// gets the game version
	getGameVersion();
	
	// Not first time anymore
	firstTimer = false;
	
}

// When user clicks on academy or research advisor
if ((view == "academy" || view == "researchAdvisor") && skipResearch == false) {
	
	// Do asyncronized request
	// Check researches, pulley, geometry, spirit, bureaucracy
	getResearch(host, getCityId(), true);
	GM_setValue(host + "_iuw_first_timer", false);
	
	// Not first time anymore
	firstTimer = false;
	
}

// Options view
if (view == "options") {

	// Getting the URI
	var uri = top.location.search.split("&");
	
	// If the setting is set, we assign the new settings
	if (isDefined(uri[1])) {
		
		var pos = uri[1].indexOf("=");
		var setting = uri[1].substr(pos+1);
		
		if (setting == "false") {
		
			showInfoBox = false;
			GM_setValue(host + "_iuw_infobox", false);
			
		} else if (setting == "true") {
		
			showInfoBox = true;
			GM_setValue(host + "_iuw_infobox", true);
			
		}
		
	}

	// Creating the setting panel for this mod
	var settingPanel = document.createElement("div"), child;
	var checkedYes ="", checkedNo = "";
	
	settingPanel.className = "contentBox01h";
	
	if (showInfoBox) {
		checkedYes = 'checked';
	} else {
		checkedNo = 'checked';
	}

    child = '<h3 class="header"><span class="textLabel">Ikariam Upgrade Watcher</span></h3><div class="content"><form action="index.php" method="GET"><input type=hidden name=view value="options"><table cellpadding="0" cellspacing="0"><tr><th>Show info box</th><td><input type="radio" name="iuwInfoBox" value="true" '+checkedYes+'> Yes<br><input type="radio" name="iuwInfoBox" value="false" '+checkedNo+'> No</td></tr></table><div class="centerButton"><input class="button" type="submit" value="Save Setting" /></div></form></div><div class="footer"></div></div>';
	
	settingPanel.innerHTML = child;
	
	// Inserting the setting panel before the vacation mode setting
	document.getElementById("mainview").insertBefore(settingPanel, document.getElementById("vacationMode"));

}

// When city is shown
if (view == "city") {

	// If it is the mod is running for the first time,
	// we check the research
	if (firstTimer) {
		
		// Do syncronized request
		// Check researches, pulley, geometry, spirit, bureaucracy
		getResearch(host, getCityId(), false);
		GM_setValue(host + "_iuw_first_timer", false);
		
		// gets the game version
		getGameVersion();
		
	}
	
	// Getting the list of buildings
	var buildingList = document.getElementById('locations');
	
	// If we find a list of buildings, then we start adding icon to each building
	if (buildingList) {
				
		// Ressource variables
		var wood, wine, marble, crystal, sulfur;
	
		// Get the resources we have in town
		if (document.getElementById('value_wood')) {
			wood = document.getElementById('value_wood').textContent.replace(",","");
      wood = wood.replace(".","");
			if (wood.match("k")) {
				wood = wood.replace("k","");
				wood = wood*1000;
			}
		}
		if (document.getElementById('value_wine')) {
			wine = document.getElementById('value_wine').textContent.replace(",","");
			wine = wine.replace(".","");
      if (wine.match("k")) {
				wine = wine.replace("k","");
				wine = wine*1000;
			}
		}
		if (document.getElementById('value_marble')) {
			marble = document.getElementById('value_marble').textContent.replace(",","");
			marble = marble.replace(".","");
      if (marble.match("k")) {
				marble = marble.replace("k","");
				marble = marble*1000;
			}
		}
		if (document.getElementById('value_crystal')) {
			crystal = document.getElementById('value_crystal').textContent.replace(",","");
			crystal = crystal.replace(".","");
      if (crystal.match("k")) {
				crystal = crystal.replace("k","");
				crystal = crystal*1000;
			}
		}
		if (document.getElementById('value_sulfur')) {
			sulfur = document.getElementById('value_sulfur').textContent.replace(",","");
			sulfur = sulfur.replace(".","");
      if (sulfur.match("k")) {
				sulfur = sulfur.replace("k","");
				sulfur = sulfur*1000;
			}
		}
	
		// Get each building/spot from the building list
		var spot = buildingList.getElementsByTagName('li');
		
		// Info about each building/spot
		var building, level, upLevel, posTop, posRight, img, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur;
		
		// If the town is constructing or upgrading a building
		var construction = false;
		
		// Reduced materials
		var redAll = 0, redWood = 0, redWine = 0, redMarble = 0, redCrystal = 0, redSulfur = 0;
		
		// Assigning reductions in %
		if (pulley) { redAll = 2; }
		if (geometry) { redAll = redAll + 4; }
		if (spirit) { redAll = redAll + 8; }
		redAll = (100 - redAll) / 100;
		
		// We check if the user has built some material reduction buildings
		for (var i = 0; i < spot.length; i++) {
			
			building = spot[i].getElementsByTagName('div');
			
			if (isDefined(building, 0) && building[0].className != 'flag') {
			
				if (building[0].className == 'constructionSite') {
					
					construction = true;
					
				}
				
				switch (spot[i].className) {
					case 'architect':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redMarble = parseInt(level);
						break;
					case 'optician':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redCrystal = parseInt(level);
						break;
					case 'carpentering':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWood = parseInt(level);
						break;
					case 'vineyard':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redWine = parseInt(level);
						break;
					case 'fireworker':
						level = spot[i].getElementsByTagName('a');
						level = getBuildingLevel(level[0].title);
						redSulfur = parseInt(level);
						break;
				}
				
			}
			
		}
		
		// Setting the material reduction in percent
		redWood = (100 - redWood) / 100;
		redWine = (100 - redWine) / 100;
		redMarble = (100 - redMarble) / 100;
		redCrystal = (100 - redCrystal) / 100;
		redSulfur = (100 - redSulfur) / 100;
		
		// Variable for database
		var POSITIONS, BUILDINGS;
		
		// Loadinng DB
		loadDB();
	
		// Creating the icon for each building
		for (var i = 0; i < spot.length; i++) {
	
			building = spot[i].getElementsByTagName('div');
			
			// Check for bureaucracy spot
			if (i == 13) {
								
				if (!bureaucracy) {
					
					// If the research have not been done
					// we skip skip the position 13
					continue;
					
				}
			
			}
			
			if (isDefined(building, 0) && building[0].className != 'flag') {		
				
				// Gets the level of a building
				level = spot[i].getElementsByTagName('a');
				level = getBuildingLevel(level[0].title);
				
				// Defines some style
				building[0].style.fontWeight = 'bold';
				building[0].style.color = 'white';
				
				// Default image to use is no.png
				// no.png = red
				// yes.png = green
				// wait.png = blue
				// unknown.png = grey
				img = 'no';
				
				var buildingType = spot[i].className;
				var iconId = "iuwIcon" + i;
				var posTop, posRight, posInfoTop, posInfoLeft;
				
				// The upgrade level
				// Note: because the database starts with lvl 2 of all buildings,
				// and the index starts with 0, we have to get one level below
				if (building[0].className == 'constructionSite') {
					// If we find a contruction spot, we would like to see the level after the construction
					upLevel = parseInt(level);
					
					// Positioning for construction spot
					posTop = POSITIONS['constructionSite'][0]["y"];
					posRight = POSITIONS['constructionSite'][0]["x"];
					
					if (buildingType == 'palace' || buildingType == 'palaceColony') {
						// positioning of the info box for palace/colony is different than other
						posInfoTop = POSITIONS['constructionSite'][2]["y"];
						posInfoLeft = POSITIONS['constructionSite'][2]["x"];
					} else {
						posInfoTop = POSITIONS['constructionSite'][1]["y"];
						posInfoLeft = POSITIONS['constructionSite'][1]["x"];
					}
					
				} else if (isDefined(POSITIONS[buildingType]) && isDefined(BUILDINGS[buildingType])) {
				
					// Positioning for other buildings
					upLevel = parseInt(level) - 1;
					posTop = POSITIONS[buildingType][0]["y"];
					posRight = POSITIONS[buildingType][0]["x"];
					posInfoTop = POSITIONS[buildingType][1]["y"];
					posInfoLeft = POSITIONS[buildingType][1]["x"];
				}
				
				// 5 special cases, uses more than wood and marble			
				switch (buildingType) {
					case 'palace':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
								reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
								reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * (redAll + redMarble - 1));
								reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * (redAll + redWine - 1));
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * (redAll + redCrystal - 1));
								reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * (redAll + redSulfur - 1));
							}
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					case 'palaceColony':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
								reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * redAll * redWine);
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
								reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * (redAll + redMarble - 1));
								reqWine = Math.floor(BUILDINGS[buildingType][upLevel]["wine"] * (redAll + redWine - 1));
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * (redAll + redCrystal - 1));
								reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * (redAll + redSulfur - 1));
							}
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && wine >= reqWine && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventPalace(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
				  
					case 'dump':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
								reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * redAll * redSulfur);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * (redAll + redMarble - 1));
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * (redAll + redCrystal - 1));
								reqSulfur = Math.floor(BUILDINGS[buildingType][upLevel]["sulfur"] * (redAll + redSulfur - 1));
							}
							
							//DEBUG(buildingType, upLevel, reqWood, reqWine, reqMarble, reqCrystal, reqSulfur);
							
							if (wood >= reqWood && marble >= reqMarble && crystal >= reqCrystal && sulfur >= reqSulfur) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDump(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqMarble, reqCrystal, reqSulfur);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
          
					case 'academy':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * (redAll + redCrystal - 1));
							}
							
							//DEBUG(buildingType, upLevel , reqWood, 0, 0, reqCrystal, 0);
							
							if (wood >= reqWood && crystal >= reqCrystal) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqCrystal, true);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
					
					case 'temple':
						
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * redAll * redCrystal);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqCrystal = Math.floor(BUILDINGS[buildingType][upLevel]["crystal"] * (redAll + redCrystal - 1));
							}
							
							//DEBUG(buildingType, upLevel , reqWood, 0, 0, reqCrystal, 0);
							
							if (wood >= reqWood && crystal >= reqCrystal) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqCrystal, true);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
					break;
						
					default:
					
						// If the level is out of bound in DB, we make the icon black
						if (isDefined(BUILDINGS[buildingType][upLevel]) && BUILDINGS[buildingType][upLevel]["wood"] != 0) {
						
							// version 0.3.1 uses the "wrong" calculation
							if (version == 'v.0.3.1') {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * redAll * redWood);
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * redAll * redMarble);
							} else {
								reqWood = Math.floor(BUILDINGS[buildingType][upLevel]["wood"] * (redAll + redWood - 1));
								reqMarble = Math.floor(BUILDINGS[buildingType][upLevel]["marble"] * (redAll + redMarble - 1));
							}
															
							//DEBUG(buildingType, (upLevel+2), reqWood, 0, reqMarble, 0, 0);
							
							if (wood >= reqWood && marble >= reqMarble) {
								
								// If there is a construction in the town, we make all upgradeable icon blue
								if (construction) {
									img = 'wait';
								} else {
									img = 'yes';
								}
								
							}
							
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
							if (showInfoBox) {
								// Adding the event to the icon
								addOnMouseOverEventDefault(iconId, building[0], posInfoTop, posInfoLeft, reqWood, reqMarble);
							}
							
							if (buildingType == 'townHall') {
								//alert(height);
							}
							
						} else {
						
							img = 'unknown';
							// Creates the icon
							createIcon(building[0], iconId, posTop, posRight, img, level);
							
						}
						
					break;
				}
			}
	
		}
	}
}

//---------------------------- FUNCTIONS ----------------------------//

/**
 * Creates an icon to attach a building
 * @param object obj
 * @param string icon id
 * @param integer position top
 * @param integer position right
 * @param string images
 * @param integer level
 * @return void
 */
function createIcon(obj, id, top, right, img, level) {
	var newImg = '';
	
	// no.png = red
	// yes.png = green
	// wait.png = blue
	// unknown.png = grey
	
	switch (img) {
		case 'yes':
			newImg = imgYes;
			break;
			
		case 'no':
			newImg = imgNo;
			break;
			
		case 'wait':
			newImg = imgWait;
			break;
			
		case 'unknown':
			newImg = imgUnknown;
			break;
			
		default:
			newImg = imgNo;
			break;
	}
	
	obj.innerHTML = '<div id="'+ id +'" style="position: absolute; z-index: 502; padding-top: 5px; height: 19px; width: 24px; text-align: center; top: ' + top + 'px; right: '+ right +'px; background-image: url(\'' + newImg + '\');">'+ level +'</div>';
}

/**
 * Creates a info box and attach it to an event to an icon (Palace, Residens)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function addOnMouseOverEventPalace(id, target, posTop, posLeft, resWood, resWine, resMarble, resCrystal, resSulfur) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curWine, curMarble, curCrystal, curSulfur, colorWood, colorWine, colorMarble, colorCrystal, colorSulfur;
	var estWood, estWine, estMarble, estCrystal, estSulfur;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgScrollMiddle_2 + "')";
	div.style.height = "102px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";	
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
	
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) {
			curWood = document.getElementById('value_wood').textContent.replace(",","");
			curWood = curWood.replace(".","");
			if (curWood.match("k")) {
				curWood = curWood.replace("k","");
				curWood = curWood*1000;
			}
		}
		if (document.getElementById('value_wine')) {
			curWine = document.getElementById('value_wine').textContent.replace(",","");
			curWine = curWine.replace(".","");
      if (curWine.match("k")) {
				curWine = curWine.replace("k","");
				curWine = curWine*1000;
			}
		}
		if (document.getElementById('value_marble')) {
			curMarble = document.getElementById('value_marble').textContent.replace(",","");
			curMarble = curMarble.replace(".","");
      if (curMarble.match("k")) {
				curMarble = curMarble.replace("k","");
				curMarble = curMarble*1000;
			}
		}
		if (document.getElementById('value_crystal')) {
			curCrystal = document.getElementById('value_crystal').textContent.replace(",","");
			curCrystal = curCrystal.replace(".","");
      if (curCrystal.match("k")) {
				curCrystal = curCrystal.replace("k","");
				curCrystal = curCrystal*1000;
			}
		}
		if (document.getElementById('value_sulfur')) {
			curSulfur = document.getElementById('value_sulfur').textContent.replace(",","");
			curSulfur = curSulfur.replace(".","");
      if (curSulfur.match("k")) {
				curSulfur = curSulfur.replace("k","");
				curSulfur = curSulfur*1000;
			}
		}
		
		// Estimating the resource status
		estWood = curWood - resWood;
		estWine = curWine - resWine;
		estMarble = curMarble - resMarble;
		estCrystal = curCrystal - resCrystal;
		estSulfur = curSulfur - resSulfur;
		
		// Adding color to the values
		// Red if negative
		// Green if 0 or positive
		if (estWood >= 0) {	colorWood = "green"; } else { colorWood = "red"; }
		if (estWine >= 0) {	colorWine = "green"; } else { colorWine = "red"; }
		if (estMarble >= 0) { colorMarble = "green"; } else { colorMarble = "red"; }
		if (estCrystal >= 0) { colorCrystal = "green"; } else { colorCrystal = "red"; }
		if (estSulfur >= 0) { colorSulfur = "green"; } else { colorSulfur = "red"; }
		
		// Nasty, ugly HTML for the info box
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgScrollLeft_2 + '\'); height: 102px; float: left;"></div><div style="float: left; width: 67px;"><div style="float: left; text-align: left;" ><img style="vertical-align: middle;" src="' + imgWood + '" /></div><div style="color: ' + colorWood + '; text-align: right;">'+ number_format(estWood,0,",",".") +'</div><div style="float: left; text-align: left; margin-top: -4px;" ><img style="vertical-align: middle;" src="' + imgWine + '" /></div><div style="margin-top: -4px; color: ' + colorWine + '; text-align: right;">'+ number_format(estWine,0,",",".") +'</div><div style="float: left; text-align: left; margin-top: -4px;" ><img style="vertical-align: middle;" src="' + imgMarble + '" /></div><div style="margin-top: -4px; color: ' + colorMarble + '; text-align: right;">'+ number_format(estMarble,0,",",".") +'</div><div style="float: left; text-align: left; margin-top: -4px;" ><img style="vertical-align: middle;" src="' + imgCrystal + '" /></div><div style="margin-top: -4px; color: ' + colorCrystal + '; text-align: right;">'+ number_format(estCrystal,0,",",".") +'</div><div style="float: left; text-align: left; margin-top: -4px;" ><img style="vertical-align: middle;" src="' + imgSulfur + '" /></div><div style="margin-top: -4px; color: ' + colorSulfur + '; text-align: right;">'+ number_format(estSulfur,0,",",".") +'</div></div><div class="after" style="background-image: url(\'' + imgScrollRight_2 + '\'); height: 102px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}

/**
 * Creates a info box and attach it to an event to an icon (Palace, Residens)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function addOnMouseOverEventDump(id, target, posTop, posLeft, resWood, resMarble, resCrystal, resSulfur) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curMarble, curCrystal, curSulfur, colorWood, colorMarble, colorCrystal, colorSulfur;
	var estWood, estMarble, estCrystal, estSulfur;
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgScrollMiddle_3 + "')";
	div.style.height = "82px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";	
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
	
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) {
			curWood = document.getElementById('value_wood').textContent.replace(",","");
			curWood = curWood.replace(".","");
			if (curWood.match("k")) {
				curWood = curWood.replace("k","");
				curWood = curWood*1000;
			}
		}
		if (document.getElementById('value_marble')) {
			curMarble = document.getElementById('value_marble').textContent.replace(",","");
			curMarble = curMarble.replace(".","");
      if (curMarble.match("k")) {
				curMarble = curMarble.replace("k","");
				curMarble = curMarble*1000;
			}
		}
		if (document.getElementById('value_crystal')) {
			curCrystal = document.getElementById('value_crystal').textContent.replace(",","");
			curCrystal = curCrystal.replace(".","");
      if (curCrystal.match("k")) {
				curCrystal = curCrystal.replace("k","");
				curCrystal = curCrystal*1000;
			}
		}
		if (document.getElementById('value_sulfur')) {
			curSulfur = document.getElementById('value_sulfur').textContent.replace(",","");
			curSulfur = curSulfur.replace(".","");
      if (curSulfur.match("k")) {
				curSulfur = curSulfur.replace("k","");
				curSulfur = curSulfur*1000;
			}
		}
		
		// Estimating the resource status
		estWood = curWood - resWood;
		estMarble = curMarble - resMarble;
		estCrystal = curCrystal - resCrystal;
		estSulfur = curSulfur - resSulfur;
		
		// Adding color to the values
		// Red if negative
		// Green if 0 or positive
		if (estWood >= 0) {	colorWood = "green"; } else { colorWood = "red"; }
		if (estMarble >= 0) { colorMarble = "green"; } else { colorMarble = "red"; }
		if (estCrystal >= 0) { colorCrystal = "green"; } else { colorCrystal = "red"; }
		if (estSulfur >= 0) { colorSulfur = "green"; } else { colorSulfur = "red"; }
		
		// Nasty, ugly HTML for the info box
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgScrollLeft_3 + '\'); height: 82px; float: left;"></div><div style="float: left; width: 65px;"><div style="float: left; text-align: left;" ><img style="vertical-align: middle; margin-right: 2px;" src="' + imgWood + '" /></div><div style="color: ' + colorWood + '; text-align: right;">'+ number_format(estWood,0,",",".") +'</div><div style="float: left; text-align: left; margin-top: -4px;" ><img style="vertical-align: middle; margin-right: 2px;" src="' + imgMarble + '" /></div><div style="margin-top: -4px; color: ' + colorMarble + '; text-align: right;">'+ number_format(estMarble,0,",",".") +'</div><div style="float: left; text-align: left; margin-top: -4px;" ><img style="vertical-align: middle; margin-right: 2px;" src="' + imgCrystal + '" /></div><div style="margin-top: -4px; color: ' + colorCrystal + '; text-align: right;">'+ number_format(estCrystal,0,",",".") +'</div><div style="float: left; text-align: left; margin-top: -4px;" ><img style="vertical-align: middle; margin-right: 2px;" src="' + imgSulfur + '" /></div><div style="margin-top: -4px; color: ' + colorSulfur + '; text-align: right;">'+ number_format(estSulfur,0,",",".") +'</div></div><div class="after" style="background-image: url(\'' + imgScrollRight_3 + '\'); height: 82px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}

/**
 * Creates a info box and attach it to an event to an icon (Academy, other 2 resource requied buildings)
 * @param string id
 * @param object target
 * @param string building type
 * @param integer wood
 * @param integer second resource
 * @param boolean if second resource is crystal
 * @return void
 */
function addOnMouseOverEventDefault(id, target, posTop, posLeft, resWood, res2, isCrystal) {
	var element = document.getElementById(id);
	var div = document.createElement("div");
	var curWood, curRes2, colorWood, colorRes2;
	var estWood, estRes2, resIcon2;
	var newImg = '';
	
	// Styles for the info box
	div.className = "timetofinish";
	div.style.backgroundImage = "url('" + imgScrollMiddle_1 + "')";
	div.style.height = "46px";
	div.style.zIndex = "502";
	div.style.position = 'absolute';

	// Positioning each box
	div.style.top = posTop + "px";
	div.style.left = posLeft + "px";
	
	// add on mouse over event
	element.addEventListener('mouseover', function(event) {
		
		// To get up-to-date resource values, we retrieve the value on each event
		if (document.getElementById('value_wood')) {
			curWood = document.getElementById('value_wood').textContent.replace(",","");
			curWood = curWood.replace(".","");
			if (curWood.match("k")) {
				curWood = curWood.replace("k","");
				curWood = curWood*1000;
			}
		}		
		// Estimating the wood status
		estWood = curWood - resWood;
		
		// In order to re-use this function, there is a crystal check
		if (isCrystal) {
	
			if (document.getElementById('value_crystal')) {
				curRes2 = document.getElementById('value_crystal').textContent.replace(",","");
				curRes2 = curRes2.replace(".","");
			}
			
			resIcon2 = "glass";
			newImg = imgCrystal;
		
		} else {
		
			if (document.getElementById('value_marble')) {
				curRes2 = document.getElementById('value_marble').textContent.replace(",","");
				curRes2 = curRes2.replace(".","");
			}
			
			resIcon2 = "marble";
			newImg = imgMarble;
		}
    
    if (curRes2.match("k")) {
			curRes2 = curRes2.replace("k","");
  		curRes2 = curRes2*1000;
	  }
		
		estRes2 = curRes2 - res2;
		
		if (estWood >= 0) { colorWood = "green"; } else { colorWood = "red"; }
		if (estRes2 >= 0) {	colorRes2 = "green"; } else { colorRes2 = "red"; }
		
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgScrollLeft_1 +'\'); height: 46px; float: left;"></div><div style="float: left; width: 65px;"><div style="float: left; text-align: left;" ><img style="vertical-align: middle;" src="' + imgWood + '" /></div><div style="color: ' + colorWood + '; text-align: right;">'+ number_format(estWood,0,",",".") +'</div><div style="float: left; text-align: left; margin-top: -4px;" ><img  style="vertical-align: middle; align: left;" src="' + newImg + '" /></div><div style="margin-top: -4px; color: ' + colorRes2 + '; text-align: right;">'+ number_format(estRes2,0,",",".") +'</div></div><div class="after" style="background-image: url(\'' + imgScrollRight_1 +'\'); height: 46px; float: left;"></div>';
		
		target.appendChild(div);
	
	}, false);
	
	// add on mouse out event
	element.addEventListener('mouseout', function(event) {
		target.removeChild(div);
	}, false);

}


/**
 * Outputs upgrade values for a building
 * @param string building
 * @param integer level
 * @param integer wood
 * @param integer wine
 * @param integer marble
 * @param integer crystal
 * @param integer sulfur
 * @return void
 */
function DEBUG(build, lvl, wd, wn, m, c, s) {
	alert(build + " " + lvl + "\r\nwood: " + wd + "\r\nwine: " + wn + "\r\nmarble: " + m + "\r\ncrystal: " + c + "\r\nsulfur: " + s);
}

/**
 * Extracts the action value from URI
 * @param string uri
 * @return string
 */
function getAction(uri) {
	var pos, action;
	
	pos = uri.indexOf("&");
	
	action = uri.substr(8, (pos - 8));
	
	return action;	
}

/**
 * Gets the id of the body-tag which determines the view
 * @return string
 */
function getView() {
	var obj = document.getElementsByTagName("body");
	return obj[0].id;
}

/**
 * Extracts a building level from a given text
 * @param txt
 * @return integer
 */
function getBuildingLevel(txt) {
	var level;
	
	level = getIntValue(txt, '?');
	
	return level;
}

/**
 * Checks if a giving object is defined
 * @param object
 * @param variable
 * @return boolean
 */
function isDefined(object, variable) {
	if (variable != null) {
		return (typeof(eval(object)[variable]) != 'undefined');
	} else {
		return (typeof(eval(object)) != 'undefined');
	}
}

/**
 * Using XMLHttpRequest protocol to get the research list
 * @param url
 * @param id
 * @return void
 */
function getResearch(url, id, asyn) {
	xmlhttp=null;
	
	if (window.XMLHttpRequest) {// code for all new browsers
		xmlhttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {// code for IE5 and IE6
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	if (xmlhttp != null) {
	
		xmlhttp.open("GET", 'http://' + url + "/index.php?view=researchOverview&id=" + id, asyn);
		xmlhttp.send(null);
		
		if (asyn == true) {
			xmlhttp.onreadystatechange = stateChange;
		} else {
			stateChange();
		}
		
	} else {
		alert("Your browser does not support XMLHTTP.");
	}
}

function stateChange() {
	if (xmlhttp.readyState == 4) {// 4 = "loaded"
		if (xmlhttp.status == 200) {// 200 = OK
			checkResearch(xmlhttp.responseText);
		} else {
			alert("Problem retrieving data");
		}
	}
}

/**
 * Gets the city ID
 * @return integer
 */
function getCityId() {
	var div = document.getElementById('changeCityForm');
	var a = div.getElementsByTagName('a');	
	var id = a[4].href, pos;

	pos = id.indexOf('id=') + 3;
	id = id.substr(pos);
	
	return parseInt(id);
}

/**
 * Check if some researches have been done (pulley, geometry, spirit, bureaucracy)
 * 
 * @param txt
 * @return void
 */
function checkResearch(txt) {
	var pattern = /<li class="([a-z]+)">[\r\n]+.+<a href="\?view=researchDetail&id=[0-9]+&position=[0-9]&researchId=(2020|2060|2100|2110)+"/g;	
	var matches = txt.match(pattern);
	
	// Pulley ID: 2020
	if (matches[0].indexOf('unexplored') == -1) {
		pulley = true;
		GM_setValue(host + "_iuw_pulley", true);
	}
	
	// Geometry ID: 2060
	if (matches[1].indexOf('unexplored') == -1) {
		geometry = true;
		GM_setValue(host + "_iuw_geometry", true);
	}
	
	// Spirit ID: 2100
	if (matches[2].indexOf('unexplored') == -1) {
		spirit = true;
		GM_setValue(host + "_iuw_spirit", true);
	}
	
	// Bureaucracy ID: 2110
	if (matches[3].indexOf('unexplored') == -1) {
		bureaucracy = true;
		GM_setValue(host + "_iuw_bureaucracy", true);
	}
	
	// If all needed research are done, no reason to check it again
	if (pulley && geometry && spirit && bureaucracy) {
		GM_setValue(host + "_iuw_skip_research", true);
	}
	
	//alert("pulley: " + pulley + "\r\ngeometry: " + geometry + "\r\nspirit: " + spirit + "\r\nbureaucracy: " + bureaucracy);
}

//Contributed by oliezekat
/**
 * Extracts number from string
 * @param str
 * @param defaultValue
 * @return integer
 */
function getIntValue(str, defaultValue) {
	var temp = ""+str;
	
	temp = temp.replace(/[^-0-9]+/g, "");
	temp = parseInt(temp);
	
	if (defaultValue != undefined && (temp == undefined || (""+temp == "NaN"))) {
		return defaultValue;
	}
	
	return temp;
}

/**
 * Get server game version
 * @return string
 */
function getGameVersion() {
	var toolbar = document.getElementById('GF_toolbar');
	var li =	toolbar.getElementsByTagName('li');

	for (var i = 0; i < li.length; i++) {
		if (li[i].className == 'version') {
			
			var tmp = li[i].getElementsByTagName('span')[0];
			GM_setValue(host + "_iuw_version", tmp.innerHTML);
			version = tmp.innerHTML;
			
			break;
		}
	}
	
}



// Formats a number with grouped thousands
// discuss at: http://phpjs.org/functions/number_format    // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
// by: Amirouche
/**
 * Display numbers in a nicer way
 * @return string
 */
function number_format (number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');    }
    return s.join(dec);
}


//---------------------------- IMAGES ------------------------------//


//---------------------------- DATABASE ----------------------------//

function loadDB() {
	// positions for each icon
	POSITIONS = {
		// palace
		"palace" : [
			{ "x" : 40, "y" : 70 },		// positioning the icon
			{ "x" : 10, "y" : 96 },		// positioning the info box
		],
		
		// palaceColony
		"palaceColony" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 10, "y" : 96 },
		],
		
    // dump
		"dump" : [
			{ "x" : 40, "y" : 56 },
			{ "x" : 10, "y" : 86 },
		],
    
		// academy
		"academy" : [
			{ "x" : 50, "y" : 65 },
			{ "x" : 10, "y" : 15 },
		],
		
		// townHall
		"townHall" : [
			{ "x" : 35, "y" : 85 },
			{ "x" : 10, "y" : 38 },
		],

		// architect
		"architect" : [
			{ "x" : 50, "y" : 65 },
			{ "x" : 22, "y" : 18 },
		],

		// safehouse
		"safehouse" : [
			{ "x" : 40, "y" : 42 },
			{ "x" : -6, "y" : -6 },
		],

		//wall
		"wall" : [
			{ "x" : 150, "y" : 40 },
			{ "x" : 500, "y" : 64 },
		],

		// shipyard
		"shipyard" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// port
		"port" : [
			{ "x" : 40, "y" : 70 },
			{ "x" : 60, "y" : 24 },
		],

		// glassblowing
		"glassblowing" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// warehouse
		"warehouse" : [
			{ "x" : 60, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// museum
		"museum" : [
			{ "x" : 45, "y" : 60 },
			{ "x" : 6, "y" : 12 },
		],

		// workshop
		"workshop" : [
			{ "x" : 30, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// forester
		"forester" : [
			{ "x" : 45, "y" : 50 },
			{ "x" : 26, "y" : 3 },
		],

		// optician
		"optician" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// barracks
		"barracks" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],

		// carpentering
		"carpentering" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 16, "y" : 12 },
		],

		// embassy
		"embassy" : [
			{ "x" : 40, "y" : 60 },
			{ "x" : 0, "y" : 12 },
		],
		
		// stonemason
		"stonemason" : [
			{ "x" : 50, "y" : 50 },
			{ "x" : 16, "y" : 3 },
		],

		// fireworker
		"fireworker" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 22, "y" : 12 },
		],

		// winegrower
		"winegrower" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],

		// vineyard
		"vineyard" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 26, "y" : 12 },
		],

		// tavern
		"tavern" : [
			{ "x" : 40, "y" : 50 },
			{ "x" : 20, "y" : 3 },
		],

		// alchemist
		"alchemist" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
		],
		
		// branchOffice
		"branchOffice" : [
			{ "x" : 50, "y" : 60 },
			{ "x" : 10, "y" : 12 },
		],
		
		// temple
		"temple" : [
			{ "x" : 26, "y" : 50 },
			{ "x" : -8, "y" : 3 },
		],
		
		// construction spot
		"constructionSite" : [
			{ "x" : 45, "y" : 59 },
			{ "x" : 18, "y" : 15 },
			{ "x" : 18, "y" : -40 },	// special for colony and palace and dump
		]		
	};

	// All index start with level 2
	BUILDINGS = {
		// palace, wood, wine, marble, crystal, sulfur
		"palace" : [
			{ "wood" : 5823, "wine" : 0, "marble" : 1433, "crystal" : 0, "sulfur" : 0 },	// 2
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3088 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10300 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 },	// 10
			{ "wood" : 4743517, "wine" : 1434821, "marble" : 1591666, "crystal" : 1357543, "sulfur" : 1842149 },
		],
		
		// palaceColony, wood, wine, marble, crystal, sulfur
		"palaceColony" : [
			{ "wood" : 5823, "wine" : 0, "marble" : 1433, "crystal" : 0, "sulfur" : 0 },	// 2
			{ "wood" : 16048, "wine" : 0, "marble" : 4546, "crystal" : 0, "sulfur" : 3088 },
			{ "wood" : 36496, "wine" : 10898, "marble" : 10770, "crystal" : 0, "sulfur" : 10300 },
			{ "wood" : 77392, "wine" : 22110, "marble" : 23218, "crystal" : 21188, "sulfur" : 24725 },
			{ "wood" : 159184, "wine" : 44534, "marble" : 48114, "crystal" : 42400, "sulfur" : 53573 },
			{ "wood" : 322768, "wine" : 89382, "marble" : 97906, "crystal" : 84824, "sulfur" : 111269 },
			{ "wood" : 649936, "wine" : 179078, "marble" : 197490, "crystal" : 169672, "sulfur" : 226661 },
			{ "wood" : 1304272, "wine" : 358470, "marble" : 396658, "crystal" : 339368, "sulfur" : 457445 },
			{ "wood" : 2612944, "wine" : 717254, "marble" : 794994, "crystal" : 678760, "sulfur" : 919013 },	// 10
			{ "wood" : 4743517, "wine" : 1434821, "marble" : 1591666, "crystal" : 1357543, "sulfur" : 1842149 },
		],
				
		// dump, wood, marble, crystal, sulfur
		"dump" : [
			{ "wood" : 1152, "marble" : 932, "crystal" : 1146, "sulfur" : 845 },	// 2
			{ "wood" : 1766, "marble" : 1445, "crystal" : 1668, "sulfur" : 1398 },
			{ "wood" : 2504, "marble" : 2051, "crystal" : 2278, "sulfur" : 2061 },
			{ "wood" : 3388, "marble" : 2762, "crystal" : 2991, "sulfur" : 2858 },
			{ "wood" : 4450, "marble" : 3609, "crystal" : 3526, "sulfur" : 3813 },
			{ "wood" : 5724, "marble" : 4604, "crystal" : 4803, "sulfur" : 4960 },
			{ "wood" : 7253, "marble" : 5778, "crystal" : 5946, "sulfur" : 6336 },
			{ "wood" : 9088, "marble" : 7164, "crystal" : 7283, "sulfur" : 7987 },
			{ "wood" : 11289, "marble" : 8799, "crystal" : 8847, "sulfur" : 9968 },	// 10

			{ "wood" : 13931, "marble" : 10728, "crystal" : 10678, "sulfur" : 12346 },
			{ "wood" : 17101, "marble" : 13005, "crystal" : 12819, "sulfur" : 15199 },
			{ "wood" : 20905, "marble" : 15691, "crystal" : 15324, "sulfur" : 18623 },
			{ "wood" : 25470, "marble" : 18862, "crystal" : 18257, "sulfur" : 22731 },
			{ "wood" : 30948, "marble" : 22602, "crystal" : 21687, "sulfur" : 27661 },
			{ "wood" : 37522, "marble" : 27016, "crystal" : 25700, "sulfur" : 33578 },
			{ "wood" : 45410, "marble" : 32225, "crystal" : 30395, "sulfur" : 40677 },
			{ "wood" : 54876, "marble" : 38371, "crystal" : 35889, "sulfur" : 49197 },
			{ "wood" : 66236, "marble" : 45623, "crystal" : 42316, "sulfur" : 59420 },
			{ "wood" : 79867, "marble" : 54181, "crystal" : 49837, "sulfur" : 71688 },	// 20

			{ "wood" : 96223, "marble" : 64278, "crystal" : 58635, "sulfur" : 86409 },
			{ "wood" : 115852, "marble" : 76194, "crystal" : 68929, "sulfur" : 104076 },
			{ "wood" : 139407, "marble" : 90256, "crystal" : 80973, "sulfur" : 125274 },
			{ "wood" : 167672, "marble" : 106847, "crystal" : 95065, "sulfur" : 150714 },
			{ "wood" : 201592, "marble" : 126424, "crystal" : 111553, "sulfur" : 181241 },
			{ "wood" : 242293, "marble" : 149528, "crystal" : 130843, "sulfur" : 217872 },
			{ "wood" : 291136, "marble" : 176787, "crystal" : 153414, "sulfur" : 261830 },
			{ "wood" : 349749, "marble" : 208956, "crystal" : 179821, "sulfur" : 314581 },
			{ "wood" : 420081, "marble" : 246913, "crystal" : 201716, "sulfur" : 377881 },
			{ "wood" : 504483, "marble" : 291702, "crystal" : 246864, "sulfur" : 453842 },	// 30

			{ "wood" : 605763, "marble" : 344555, "crystal" : 289157, "sulfur" : 544994 },
			{ "wood" : 727300, "marble" : 406921, "crystal" : 338642, "sulfur" : 654378 },
			{ "wood" : 873143, "marble" : 480512, "crystal" : 396536, "sulfur" : 785637 },
			{ "wood" : 1048157, "marble" : 567350, "crystal" : 464274, "sulfur" : 943149 },
			{ "wood" : 1258171, "marble" : 669817, "crystal" : 543528, "sulfur" : 1132163 },
			{ "wood" : 1510191, "marble" : 790730, "crystal" : 636253, "sulfur" : 1358979 },
			{ "wood" : 1812613, "marble" : 933408, "crystal" : 744742, "sulfur" : 1631159 },
			{ "wood" : 2175519, "marble" : 1101767, "crystal" : 871676, "sulfur" : 1957774 },
			{ "wood" : 2611007, "marble" : 1300431, "crystal" : 1020187, "sulfur" : 2349714 },
			{ "wood" : 3133592, "marble" : 1534855, "crystal" : 1193945, "sulfur" : 2820041 },	// 40
		],
    
		// academy, wood, crystal
		"academy" : [
			{ "wood" : 68, "crystal" : 0 },	// 2
			{ "wood" : 115, "crystal" : 0 },
			{ "wood" : 263, "crystal" : 0 },
			{ "wood" : 382, "crystal" : 225 },
			{ "wood" : 626, "crystal" : 428 },
			{ "wood" : 982, "crystal" : 744 },
			{ "wood" : 1330, "crystal" : 1089 },
			{ "wood" : 2004, "crystal" : 1748 },
			{ "wood" : 2665, "crystal" : 2454 },	// 10

			{ "wood" : 3916, "crystal" : 3786 },
			{ "wood" : 5156, "crystal" : 5216 },
			{ "wood" : 7446, "crystal" : 7862 },
			{ "wood" : 9753, "crystal" : 10729 },
			{ "wood" : 12751, "crystal" : 14599 },
			{ "wood" : 18163, "crystal" : 21627 },
			{ "wood" : 23691, "crystal" : 29321 },
			{ "wood" : 33451, "crystal" : 43020 },
			{ "wood" : 43571, "crystal" : 58213 },
			{ "wood" : 56729, "crystal" : 78724 },	// 20

			{ "wood" : 73832, "crystal" : 106414 },
			{ "wood" : 103459, "crystal" : 154857 },
			{ "wood" : 144203, "crystal" : 224146 },
			{ "wood" : 175058, "crystal" : 282571 },
			{ "wood" : 243930, "crystal" : 408877 },
			{ "wood" : 317208, "crystal" : 552141 },
			{ "wood" : 439967, "crystal" : 795252 },
			{ "wood" : 536310, "crystal" : 1006647 },
			{ "wood" : 743789, "crystal" : 1449741 },
			{ "wood" : 1027469, "crystal" : 2079650 },	// 30

			{ "wood" : 1257244, "crystal" : 2642546 },
			{ "wood" : 1736681, "crystal" : 3790481 },
		],
		
		// temple, wood, crystal 
		"temple" : [
			{ "wood" : 228, "crystal" : 189 },	// 2
			{ "wood" : 333, "crystal" : 290 },
			{ "wood" : 465, "crystal" : 423 },
			{ "wood" : 598, "crystal" : 566 },
			{ "wood" : 760, "crystal" : 752 },
			{ "wood" : 958, "crystal" : 988 },
			{ "wood" : 1197, "crystal" : 1290 },
			{ "wood" : 1432, "crystal" : 1610 },
			{ "wood" : 1773, "crystal" : 2080 },	// 10

			{ "wood" : 2112, "crystal" : 2586 },
			{ "wood" : 2512, "crystal" : 3210 },
			{ "wood" : 3082, "crystal" : 4109 },
			{ "wood" : 3655, "crystal" : 5084 },
			{ "wood" : 4458, "crystal" : 6471 },
			{ "wood" : 5126, "crystal" : 7765 },
			{ "wood" : 6232, "crystal" : 9850 },
			{ "wood" : 7167, "crystal" : 11821 },
			{ "wood" : 8687, "crystal" : 14952 },
			{ "wood" : 10247, "crystal" : 18402 },	// 20

			{ "wood" : 11784, "crystal" : 22082 },
			{ "wood" : 14228, "crystal" : 27824 },
			{ "wood" : 16752, "crystal" : 34183 },
			{ "wood" : 19265, "crystal" : 41020 },
			{ "wood" : 23156, "crystal" : 51514 },
			{ "wood" : 26663, "crystal" : 61817 },
			{ "wood" : 32026, "crystal" : 77477 },
			{ "wood" : 36830, "crystal" : 92972 },
			{ "wood" : 43256, "crystal" : 113941 },
			{ "wood" : 50782, "crystal" : 139576 },	// 30

			{ "wood" : 59591, "crystal" : 170910 },
			{ "wood" : 68528, "crystal" : 205093 },
		],
		
		// townHall, wood, marble
		"townHall" : [
			{ "wood" : 158, "marble" : 0 },	// 2
			{ "wood" : 335, "marble" : 0 },
			{ "wood" : 623, "marble" : 0 },
			{ "wood" : 923, "marble" : 285 },
			{ "wood" : 1390, "marble" : 551 },
			{ "wood" : 2015, "marble" : 936 },
			{ "wood" : 2706, "marble" : 1411 },
			{ "wood" : 3661, "marble" : 2091 },
			{ "wood" : 4776, "marble" : 2945 },	// 10

			{ "wood" : 6173, "marble" : 4072 },
			{ "wood" : 8074, "marble" : 5664 },
			{ "wood" : 10281, "marble" : 7637 },
			{ "wood" : 13023, "marble" : 10214 },
			{ "wood" : 16424, "marble" : 13575 },
			{ "wood" : 20986, "marble" : 18254 },
			{ "wood" : 25423, "marble" : 23250 },
			{ "wood" : 32285, "marble" : 31022 },
			{ "wood" : 40232, "marble" : 40599 },
			{ "wood" : 49286, "marble" : 52216 },	// 20

			{ "wood" : 61207, "marble" : 68069 },
			{ "wood" : 74804, "marble" : 87316 },
			{ "wood" : 93956, "marble" : 115101 },
			{ "wood" : 113035, "marble" : 145326 },
			{ "wood" : 141594, "marble" : 191052 },
			{ "wood" : 170213, "marble" : 241039 },
			{ "wood" : 210011, "marble" : 312128 },
			{ "wood" : 258875, "marble" : 403825 },
			{ "wood" : 314902, "marble" : 515593 },
			{ "wood" : 387656, "marble" : 666228 },	// 30

			{ "wood" : 471194, "marble" : 850031 },
			{ "wood" : 572580, "marble" : 1084292 },
			{ "wood" : 695615, "marble" : 1382826 },
			{ "wood" : 854728, "marble" : 1783721 },
			{ "wood" : 1037814, "marble" : 2273685 },
			{ "wood" : 1274043, "marble" : 2930330 },
			{ "wood" : 1714396, "marble" : 3692589 },
			{ "wood" : 1876185, "marble" : 4756439 },
			{ "wood" : 2276285, "marble" : 6058680 },
			{ "wood" : 2761291, "marble" : 7716365 },	// 40

			{ "wood" : 3384433, "marble" : 9929883 },
			{ "wood" : 4061703, "marble" : 12512054 },
			{ "wood" : 4975980, "marble" : 16094037 },
			{ "wood" : 6032502, "marble" : 20485822 },
			{ "wood" : 7312522, "marble" : 26073281 },
			{ "wood" : 8861330, "marble" : 33181278 },
			{ "wood" : 10846841, "marble" : 42636728 },
			{ "wood" : 13016620, "marble" : 53722706 },
		],

		// architect, wood, marble
		"architect" : [
			{ "wood" : 291, "marble" : 160 },	// 2
			{ "wood" : 413, "marble" : 222 },
			{ "wood" : 555, "marble" : 295 },
			{ "wood" : 720, "marble" : 379 },
			{ "wood" : 911, "marble" : 475 },
			{ "wood" : 1133, "marble" : 587 },
			{ "wood" : 1390, "marble" : 716 },
			{ "wood" : 1689, "marble" : 865 },
			{ "wood" : 2035, "marble" : 1036 },	// 10

			{ "wood" : 2437, "marble" : 1233 },
			{ "wood" : 2902, "marble" : 1460 },
			{ "wood" : 3443, "marble" : 1722 },
			{ "wood" : 4070, "marble" : 2023 },
			{ "wood" : 4797, "marble" : 2369 },
			{ "wood" : 5640, "marble" : 2767 },
			{ "wood" : 6618, "marble" : 3226 },
			{ "wood" : 7754, "marble" : 3752 },
			{ "wood" : 9070, "marble" : 4358 },
			{ "wood" : 10598, "marble" : 5056 },	// 20

			{ "wood" : 12369, "marble" : 5857 },
			{ "wood" : 14424, "marble" : 6778 },
			{ "wood" : 16807, "marble" : 7836 },
			{ "wood" : 19573, "marble" : 9052 },
			{ "wood" : 22780, "marble" : 10448 },
			{ "wood" : 26501, "marble" : 12054 },
			{ "wood" : 30817, "marble" : 13899 },
			{ "wood" : 35826, "marble" : 16289 },
			{ "wood" : 41631, "marble" : 18450 },
			{ "wood" : 48371, "marble" : 21246 },	// 30

			{ "wood" : 56185, "marble" : 24455 },
			{ "wood" : 65251, "marble" : 28141 },
		],

		// safehouse, wood, marble
		"safehouse" : [
			{ "wood" : 248, "marble" : 0 },	// 2
			{ "wood" : 402, "marble" : 0 },
			{ "wood" : 578, "marble" : 129 },
			{ "wood" : 779, "marble" : 197 },
			{ "wood" : 1007, "marble" : 275 },
			{ "wood" : 1267, "marble" : 366 },
			{ "wood" : 1564, "marble" : 471 },
			{ "wood" : 1903, "marble" : 593 },
			{ "wood" : 2288, "marble" : 735 },	// 10

			{ "wood" : 2728, "marble" : 900 },
			{ "wood" : 3230, "marble" : 1090 },
			{ "wood" : 3801, "marble" : 1312 },
			{ "wood" : 4453, "marble" : 1569 },
			{ "wood" : 5195, "marble" : 1866 },
			{ "wood" : 6042, "marble" : 2212 },
			{ "wood" : 7008, "marble" : 2613 },
			{ "wood" : 8108, "marble" : 3078 },
			{ "wood" : 9363, "marble" : 3617 },
			{ "wood" : 10793, "marble" : 4243 },	// 20

			{ "wood" : 12423, "marble" : 4968 },
			{ "wood" : 14282, "marble" : 5810 },
			{ "wood" : 16401, "marble" : 6787 },
			{ "wood" : 18816, "marble" : 7919 },
			{ "wood" : 21570, "marble" : 9233 },
			{ "wood" : 24709, "marble" : 10758 },
			{ "wood" : 28288, "marble" : 12526 },
			{ "wood" : 32368, "marble" : 14577 },
			{ "wood" : 37019, "marble" : 16956 },
			{ "wood" : 42321, "marble" : 19716 },	// 30

			{ "wood" : 48365, "marble" : 22917 },
			{ "wood" : 55255, "marble" : 26631 },
		],

		//wall, wood, marble
		"wall" : [
			{ "wood" : 361, "marble" : 203 },	// 2
			{ "wood" : 657, "marble" : 516 },
			{ "wood" : 1012, "marble" : 892 },
			{ "wood" : 1439, "marble" : 1344 },
			{ "wood" : 1951, "marble" : 1885 },
			{ "wood" : 2565, "marble" : 2535 },
			{ "wood" : 3302, "marble" : 3315 },
			{ "wood" : 4186, "marble" : 4251 },
			{ "wood" : 5247, "marble" : 5374 },	// 10

			{ "wood" : 6521, "marble" : 6721 },
			{ "wood" : 8049, "marble" : 8338 },
			{ "wood" : 9882, "marble" : 10279 },
			{ "wood" : 12083, "marble" : 12608 },
			{ "wood" : 14724, "marble" : 15402 },
			{ "wood" : 17892, "marble" : 18755 },
			{ "wood" : 21695, "marble" : 22779 },
			{ "wood" : 26258, "marble" : 27607 },
			{ "wood" : 31733, "marble" : 33402 },
			{ "wood" : 38304, "marble" : 40355 },	// 20

			{ "wood" : 46189, "marble" : 48699 },
			{ "wood" : 55650, "marble" : 58711 },
			{ "wood" : 67004, "marble" : 70726 },
			{ "wood" : 80629, "marble" : 85144 },
			{ "wood" : 96979, "marble" : 102446 },
			{ "wood" : 116599, "marble" : 123208 },
			{ "wood" : 140143, "marble" : 148122 },
			{ "wood" : 168395, "marble" : 178019 },
			{ "wood" : 202298, "marble" : 213896 },
			{ "wood" : 242982, "marble" : 256948 },	// 30

			{ "wood" : 291802, "marble" : 308610 },
			{ "wood" : 350387, "marble" : 370605 },
			{ "wood" : 420689, "marble" : 444998 },
			{ "wood" : 505049, "marble" : 534270 },
			{ "wood" : 606284, "marble" : 641397 },
			{ "wood" : 727765, "marble" : 769949 },
			{ "wood" : 873541, "marble" : 924213 },
			{ "wood" : 1048473, "marble" : 1109328 },
			{ "wood" : 1258393, "marble" : 1331467 },
			{ "wood" : 1510294, "marble" : 1598031 },	// 40

			{ "wood" : 1812577, "marble" : 1917913 },
			{ "wood" : 2175317, "marble" : 2301767 },
			{ "wood" : 2610603, "marble" : 2762392 },
			{ "wood" : 3132948, "marble" : 3315144 },
			{ "wood" : 3759764, "marble" : 3978446 },
			{ "wood" : 0, "marble" : 0 }, //??
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
		],

		// shipyard, wood, marble ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		"shipyard" : [
			{ "wood" : 202, "marble" : 0 },
			{ "wood" : 324, "marble" : 0 },
			{ "wood" : 477, "marble" : 0 },
			{ "wood" : 671, "marble" : 0 },
			{ "wood" : 914, "marble" : 778 },
			{ "wood" : 1222, "marble" : 1052 },
			{ "wood" : 1609, "marble" : 1397 },
			{ "wood" : 2096, "marble" : 1832 },
			{ "wood" : 2711, "marble" : 2381 },
			{ "wood" : 3485, "marble" : 3070 },
			{ "wood" : 4459, "marble" : 3941 },
			{ "wood" : 5688, "marble" : 5037 },
			{ "wood" : 7238, "marble" : 6420 },
			{ "wood" : 9190, "marble" : 8161 },
			{ "wood" : 11648, "marble" : 10354 },
			{ "wood" : 14746, "marble" : 13118 },	// level 17
			{ "wood" : 18650, "marble" : 16601 },
			{ "wood" : 23568, "marble" : 20989 },
			{ "wood" : 29765, "marble" : 26517 },
			{ "wood" : 37573, "marble" : 33484 },
			{ "wood" : 47412, "marble" : 42261 },
			{ "wood" : 59808, "marble" : 53321 },
			{ "wood" : 75428, "marble" : 67256 },
			{ "wood" : 95108, "marble" : 84814 },	// level 25
			{ "wood" : 119906, "marble" : 106938 },
			{ "wood" : 151151, "marble" : 134814 },
			{ "wood" : 190520, "marble" : 169937 },
			{ "wood" : 240124, "marble" : 214192 },
			{ "wood" : 302626, "marble" : 269954 },
			{ "wood" : 381378, "marble" : 340214 },
			{ "wood" : 480605, "marble" : 428741 },	// level 32
		],

		// port, wood, marble
		"port" : [
			{ "wood" : 150, "marble" : 0 },	// 2
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 429, "marble" : 0 },
			{ "wood" : 637, "marble" : 0 },
			{ "wood" : 894, "marble" : 176 },
			{ "wood" : 1207, "marble" : 326 },
			{ "wood" : 1645, "marble" : 540 },
			{ "wood" : 2106, "marble" : 791 },
			{ "wood" : 2735, "marble" : 1138 },	// 10

			{ "wood" : 3537, "marble" : 1598 },
			{ "wood" : 4492, "marble" : 2176 },
			{ "wood" : 5689, "marble" : 2928 },
			{ "wood" : 7103, "marble" : 3859 },
			{ "wood" : 8849, "marble" : 5051 },
			{ "wood" : 11094, "marble" : 6628 },
			{ "wood" : 13731, "marble" : 8566 },
			{ "wood" : 17062, "marble" : 11089 },
			{ "wood" : 21097, "marble" : 14265 },
			{ "wood" : 25965, "marble" : 18241 },	// 20

			{ "wood" : 31810, "marble" : 23197 },
			{ "wood" : 39190, "marble" : 29642 },
			{ "wood" : 47998, "marble" : 37636 },
			{ "wood" : 58713, "marble" : 47703 },
			{ "wood" : 71955, "marble" : 60556 },
			{ "wood" : 87627, "marble" : 76367 },
			{ "wood" : 107102, "marble" : 96639 },
			{ "wood" : 130776, "marble" : 122156 },
			{ "wood" : 159019, "marble" : 153754 },
			{ "wood" : 193938, "marble" : 194089 },	// 30

			{ "wood" : 235849, "marble" : 244300 },
			{ "wood" : 286515, "marble" : 307174 },
			{ "wood" : 348718, "marble" : 386955 },
			{ "wood" : 423990, "marble" : 486969 },
			{ "wood" : 513947, "marble" : 610992 },
			{ "wood" : 625160, "marble" : 769302 },
			{ "wood" : 758178, "marble" : 965792 },
			{ "wood" : 919693, "marble" : 1212790 },
			{ "wood" : 1116013, "marble" : 1523570 },
			{ "wood" : 1353517, "marble" : 1913072 },	// 40

			{ "wood" : 1642274, "marble" : 2403313 },
			{ "wood" : 1990223, "marble" : 3015688 },
			{ "wood" : 2411061, "marble" : 3782992 },
			{ "wood" : 2923228, "marble" : 4749576 },
			{ "wood" : 3541580, "marble" : 5959026 },
			{ "wood" : 0, "marble" : 0 }, //??
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
		],

		// glassblowing, wood, marble
		"glassblowing" : [
			{ "wood" : 467, "marble" : 116 },	// 2
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },	// 10

			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },	// 20

			{ "wood" : 122021, "marble" : 67485 },
			{ "wood" : 158740, "marble" : 87835 },
			{ "wood" : 206471, "marble" : 114289 },
			{ "wood" : 268524, "marble" : 148680 },
			{ "wood" : 349194, "marble" : 193389 },
			{ "wood" : 454063, "marble" : 251512 },
			{ "wood" : 590393, "marble" : 327069 },
			{ "wood" : 767620, "marble" : 425294 },
			{ "wood" : 998018, "marble" : 552986 },
			{ "wood" : 1297536, "marble" : 718988 },	// 30

			{ "wood" : 1686906, "marble" : 934789 },
			{ "wood" : 2193089, "marble" : 1215330 },
		],

		// warehouse, wood, marble
		"warehouse" : [
			{ "wood" : 288, "marble" : 0 },	// 2
			{ "wood" : 442, "marble" : 0 },
			{ "wood" : 626, "marble" : 96 },
			{ "wood" : 847, "marble" : 211 },
			{ "wood" : 1113, "marble" : 349 },
			{ "wood" : 1431, "marble" : 515 },
			{ "wood" : 1813, "marble" : 714 },
			{ "wood" : 2272, "marble" : 953 },
			{ "wood" : 2822, "marble" : 1240 },	// 10

			{ "wood" : 3483, "marble" : 1584 },
			{ "wood" : 4275, "marble" : 1997 },
			{ "wood" : 5226, "marble" : 2492 },
			{ "wood" : 6368, "marble" : 3086 },
			{ "wood" : 7737, "marble" : 3800 },
			{ "wood" : 9380, "marble" : 4656 },
			{ "wood" : 11353, "marble" : 5683 },
			{ "wood" : 13719, "marble" : 6915 },
			{ "wood" : 16559, "marble" : 8394 },
			{ "wood" : 19967, "marble" : 10169 },	// 20

			{ "wood" : 24056, "marble" : 12299 },
			{ "wood" : 28963, "marble" : 14855 },
			{ "wood" : 34852, "marble" : 17922 },
			{ "wood" : 41918, "marble" : 21602 },
			{ "wood" : 50398, "marble" : 26019 },
			{ "wood" : 60574, "marble" : 31319 },
			{ "wood" : 72784, "marble" : 37678 },
			{ "wood" : 87437, "marble" : 45310 },
			{ "wood" : 105021, "marble" : 54468 },
			{ "wood" : 126121, "marble" : 65458 },	// 30

			{ "wood" : 151441, "marble" : 78645 },
			{ "wood" : 181825, "marble" : 94471 },
			{ "wood" : 218286, "marble" : 113461 },
			{ "wood" : 262039, "marble" : 136249 },
			{ "wood" : 314543, "marble" : 163595 },
			{ "wood" : 377548, "marble" : 196409 },
			{ "wood" : 453153, "marble" : 235787 },
			{ "wood" : 543880, "marble" : 283041 },
			{ "wood" : 652752, "marble" : 339745 },
			{ "wood" : 783398, "marble" : 407790 },	// 40
		],

		// museum, wood, marble
		"museum" : [
			{ "wood" : 1435, "marble" : 1190 },	// 2
			{ "wood" : 2748, "marble" : 2573 },
			{ "wood" : 4716, "marble" : 4676 },
			{ "wood" : 7669, "marble" : 7871 },
			{ "wood" : 12099, "marble" : 12729 },
			{ "wood" : 18744, "marble" : 20112 },
			{ "wood" : 28710, "marble" : 31335 },
			{ "wood" : 43661, "marble" : 48394 },
			{ "wood" : 66086, "marble" : 74323 },	// 10

			{ "wood" : 99724, "marble" : 113736 },
			{ "wood" : 150181, "marble" : 173643 },
			{ "wood" : 225866, "marble" : 264701 },
			{ "wood" : 339394, "marble" : 403110 },
			{ "wood" : 509686, "marble" : 613492 },
			{ "wood" : 765124, "marble" : 933272 },
			{ "wood" : 1148280, "marble" : 1419338 },
			{ "wood" : 1723016, "marble" : 2158157 },
			{ "wood" : 2585120, "marble" : 3281164 },
			{ "wood" : 3878276, "marble" : 4988135 },	// 20

			{ "wood" : 5818007, "marble" : 7582730 },
			{ "wood" : 8727680, "marble" : 11526750 },
			{ "wood" : 13091900, "marble" : 17521100 },
			{ "wood" : 0, "marble" : 0 }, //??
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
			{ "wood" : 0, "marble" : 0 },
		],

		// workshop, wood, marble----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		"workshop" : [
			{ "wood" : 383, "marble" : 167 },
			{ "wood" : 569, "marble" : 251 },
			{ "wood" : 781, "marble" : 349 },
			{ "wood" : 1023, "marble" : 461 },
			{ "wood" : 1299, "marble" : 592 },
			{ "wood" : 1613, "marble" : 744 },
			{ "wood" : 1972, "marble" : 920 },
			{ "wood" : 2380, "marble" : 1125 },
			{ "wood" : 2846, "marble" : 1362 },
			{ "wood" : 3377, "marble" : 1637 },
			{ "wood" : 3982, "marble" : 1956 },
			{ "wood" : 4672, "marble" : 2326 },
			{ "wood" : 5458, "marble" : 2755 },
			{ "wood" : 6355, "marble" : 3253 },
			{ "wood" : 7377, "marble" : 3831 },
			{ "wood" : 8542, "marble" : 4500 },
			{ "wood" : 9870, "marble" : 5279 },
			{ "wood" : 11385, "marble" : 6180 },
			{ "wood" : 13111, "marble" : 7226 },
			{ "wood" : 15078, "marble" : 8439 },
			{ "wood" : 17714, "marble" : 9776 },
			{ "wood" : 19481, "marble" : 11477 },
			{ "wood" : 22796, "marble" : 13373 },
			{ "wood" : 26119, "marble" : 15570 },
			{ "wood" : 29909, "marble" : 18118 },
			{ "wood" : 34228, "marble" : 21074 },
			{ "wood" : 39153, "marble" : 24503 },
			{ "wood" : 44766, "marble" : 28481 },
			{ "wood" : 51166, "marble" : 33095 },
			{ "wood" : 58462, "marble" : 38447 },	// level 31
			{ "wood" : 66778, "marble" : 44656 },	// level 32
		],

		// forester, wood, marble
		"forester" : [
			{ "wood" : 430, "marble" : 104 },	// 2
			{ "wood" : 664, "marble" : 237 },
			{ "wood" : 968, "marble" : 410 },
			{ "wood" : 1364, "marble" : 635 },
			{ "wood" : 1878, "marble" : 928 },
			{ "wood" : 2546, "marble" : 1309 },
			{ "wood" : 3415, "marble" : 1803 },
			{ "wood" : 4544, "marble" : 2446 },
			{ "wood" : 6013, "marble" : 3282 },	// 10

			{ "wood" : 7922, "marble" : 4368 },
			{ "wood" : 10403, "marble" : 5781 },
			{ "wood" : 13629, "marble" : 7617 },
			{ "wood" : 17823, "marble" : 10422 },
			{ "wood" : 23274, "marble" : 13108 },
			{ "wood" : 30362, "marble" : 17142 },
			{ "wood" : 39574, "marble" : 22386 },
			{ "wood" : 51552, "marble" : 29204 },
			{ "wood" : 67123, "marble" : 38068 },
			{ "wood" : 87363, "marble" : 49589 },	// 20

			{ "wood" : 113680, "marble" : 64569 },
			{ "wood" : 147889, "marble" : 84041 },
			{ "wood" : 192360, "marble" : 109356 },
			{ "wood" : 250173, "marble" : 142266 },
			{ "wood" : 325258, "marble" : 185046 },
			{ "wood" : 423034, "marble" : 240663 },
			{ "wood" : 550049, "marble" : 312965 },
			{ "wood" : 715169, "marble" : 406956 },
			{ "wood" : 929826, "marble" : 529144 },
			{ "wood" : 1208878, "marble" : 687989 },	// 30

			{ "wood" : 1571647, "marble" : 894489 },
			{ "wood" : 2043246, "marble" : 1162937 },
		],

		// optician, wood, marble
		"optician" : [
			{ "wood" : 188, "marble" : 35 },	// 2
			{ "wood" : 269, "marble" : 96 },
			{ "wood" : 362, "marble" : 167 },
			{ "wood" : 471, "marble" : 249 },
			{ "wood" : 597, "marble" : 345 },
			{ "wood" : 742, "marble" : 455 },
			{ "wood" : 912, "marble" : 584 },
			{ "wood" : 1108, "marble" : 733 },
			{ "wood" : 1335, "marble" : 905 },	// 10

			{ "wood" : 1600, "marble" : 1106 },
			{ "wood" : 1906, "marble" : 1338 },
			{ "wood" : 2261, "marble" : 1608 },
			{ "wood" : 2673, "marble" : 1921 },
			{ "wood" : 3152, "marble" : 2283 },
			{ "wood" : 3706, "marble" : 2704 },
			{ "wood" : 4348, "marble" : 3191 },
			{ "wood" : 5096, "marble" : 3759 },
			{ "wood" : 5962, "marble" : 4416 },
			{ "wood" : 6966, "marble" : 5178 },	// 20

			{ "wood" : 8131, "marble" : 6062 },
			{ "wood" : 9482, "marble" : 7087 },
			{ "wood" : 11050, "marble" : 8276 },
			{ "wood" : 12868, "marble" : 9656 },
			{ "wood" : 14978, "marble" : 11257 },
			{ "wood" : 17424, "marble" : 13113 },
			{ "wood" : 20262, "marble" : 15267 },
			{ "wood" : 23553, "marble" : 17762 },
			{ "wood" : 27373, "marble" : 20662 },
			{ "wood" : 31804, "marble" : 24024 },	// 30

			{ "wood" : 36943, "marble" : 27922 },
			{ "wood" : 42904, "marble" : 32447 },
		],

		// barracks, wood, marble----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		"barracks" : [
			{ "wood" : 114, "marble" : 0 },
			{ "wood" : 195, "marble" : 0 },
			{ "wood" : 296, "marble" : 0 },
			{ "wood" : 420, "marble" : 0 },
			{ "wood" : 574, "marble" : 0 },
			{ "wood" : 766, "marble" : 0 },
			{ "wood" : 1003, "marble" : 0 },
			{ "wood" : 1297, "marble" : 178 },
			{ "wood" : 1662, "marble" : 431 },
			{ "wood" : 2115, "marble" : 745 },
			{ "wood" : 2676, "marble" : 1134 },
			{ "wood" : 3371, "marble" : 1616 },
			{ "wood" : 4234, "marble" : 2214 },
			{ "wood" : 5304, "marble" : 2956 },
			{ "wood" : 6630, "marble" : 3875 },
			{ "wood" : 8275, "marble" : 5015 },
			{ "wood" : 10314, "marble" : 6429 },
			{ "wood" : 12843, "marble" : 8183 },
			{ "wood" : 15979, "marble" : 10357 },
			{ "wood" : 19868, "marble" : 13052 },
			{ "wood" : 24690, "marble" : 16395 },
			{ "wood" : 30669, "marble" : 20540 },
			{ "wood" : 38083, "marble" : 25680 },
			{ "wood" : 47277, "marble" : 32054 },	// level 25
			{ "wood" : 58676, "marble" : 39957 },
			{ "wood" : 72812, "marble" : 49757 },
			{ "wood" : 90341, "marble" : 61909 },
			{ "wood" : 112076, "marble" : 76977 },
			{ "wood" : 139028, "marble" : 95661 },
			{ "wood" : 172448, "marble" : 118830 },	// level 31
			{ "wood" : 213889, "marble" : 147560 },
			{ "wood" : 265276, "marble" : 183185 },
			{ "wood" : 328996, "marble" : 227359 },
			{ "wood" : 408008, "marble" : 282136 },
			{ "wood" : 505984, "marble" : 350059 },	// level 36
		],

		// carpentering, wood, marble----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		"carpentering" : [
			{ "wood" : 122, "marble" : 0 },
			{ "wood" : 192, "marble" : 0 },
			{ "wood" : 274, "marble" : 0 },
			{ "wood" : 372, "marble" : 0 },
			{ "wood" : 486, "marble" : 0 },
			{ "wood" : 620, "marble" : 0 },
			{ "wood" : 777, "marble" : 359 },
			{ "wood" : 962, "marble" : 444 },
			{ "wood" : 1178, "marble" : 546 },
			{ "wood" : 1432, "marble" : 669 },
			{ "wood" : 1730, "marble" : 816 },
			{ "wood" : 2078, "marble" : 993 },
			{ "wood" : 2486, "marble" : 1205 },
			{ "wood" : 2964, "marble" : 1459 },
			{ "wood" : 3524, "marble" : 1765 },
			{ "wood" : 4178, "marble" : 2131 },
			{ "wood" : 4944, "marble" : 2571 },
			{ "wood" : 5841, "marble" : 3097 },
			{ "wood" : 6890, "marble" : 3731 },
			{ "wood" : 8117, "marble" : 4490 },
			{ "wood" : 9550, "marble" : 5402 },
			{ "wood" : 11229, "marble" : 6496 },
			{ "wood" : 13190, "marble" : 7809 },
			{ "wood" : 15484, "marble" : 9383 },
			{ "wood" : 18167, "marble" : 11273 },
			{ "wood" : 21299, "marble" : 13543 },
			{ "wood" : 24946, "marble" : 16263 },
			{ "wood" : 29245, "marble" : 19531 },
			{ "wood" : 34247, "marble" : 23450 },
			{ "wood" : 40096, "marble" : 28154 },
			{ "wood" : 46930, "marble" : 33798 }	// level 32
		],

		// embassy, wood, marble
		"embassy" : [
			{ "wood" : 415, "marble" : 342 },	// 2
			{ "wood" : 623, "marble" : 571 },
			{ "wood" : 873, "marble" : 850 },
			{ "wood" : 1173, "marble" : 1190 },
			{ "wood" : 1532, "marble" : 1606 },
			{ "wood" : 1964, "marble" : 2112 },
			{ "wood" : 2482, "marble" : 2730 },
			{ "wood" : 3103, "marble" : 3484 },
			{ "wood" : 3849, "marble" : 4404 },	// 10

			{ "wood" : 4743, "marble" : 5527 },
			{ "wood" : 5817, "marble" : 6896 },
			{ "wood" : 7105, "marble" : 8566 },
			{ "wood" : 8651, "marble" : 10604 },
			{ "wood" : 10507, "marble" : 13090 },
			{ "wood" : 12733, "marble" : 16123 },
			{ "wood" : 15610, "marble" : 19824 },
			{ "wood" : 18498, "marble" : 24339 },
			{ "wood" : 22457, "marble" : 29846 },
			{ "wood" : 27074, "marble" : 36564 },	// 20

			{ "wood" : 32290, "marble" : 45216 },
			{ "wood" : 33764, "marble" : 47097 },
			{ "wood" : 47240, "marble" : 66967 },
			{ "wood" : 56812, "marble" : 81859 },
			{ "wood" : 70157, "marble" : 104537 },
			{ "wood" : 84318, "marble" : 129580 },
			{ "wood" : 101310, "marble" : 158759 },
			{ "wood" : 121979, "marble" : 193849 },
			{ "wood" : 146503, "marble" : 236659 },
			{ "wood" : 175932, "marble" : 288888 },	// 30

			{ "wood" : 222202, "marble" : 358869 },
			{ "wood" : 266778, "marble" : 437985 },
		],

		// stonemason, wood, marble----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		"stonemason" : [
			{ "wood" : 467, "marble" : 116 },
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },
			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },
			{ "wood" : 122021, "marble" : 67485 },
			{ "wood" : 158740, "marble" : 87833 },
			{ "wood" : 206471, "marble" : 114289 },
			{ "wood" : 268524, "marble" : 148680 },	// level 24
			{ "wood" : 349193, "marble" : 193389 },	// level 25
		],

		// fireworker, wood, marble
		"fireworker" : [
			{ "wood" : 353, "marble" : 212 },	// 2
			{ "wood" : 445, "marble" : 302 },
			{ "wood" : 551, "marble" : 405 },
			{ "wood" : 673, "marble" : 526 },
			{ "wood" : 813, "marble" : 665 },
			{ "wood" : 974, "marble" : 827 },
			{ "wood" : 1159, "marble" : 1015 },
			{ "wood" : 1373, "marble" : 1233 },
			{ "wood" : 1618, "marble" : 1486 },	// 10

			{ "wood" : 1899, "marble" : 1779 },
			{ "wood" : 2223, "marble" : 2120 },
			{ "wood" : 2596, "marble" : 2514 },
			{ "wood" : 3025, "marble" : 2972 },
			{ "wood" : 3517, "marble" : 3503 },
			{ "wood" : 4084, "marble" : 4119 },
			{ "wood" : 4736, "marble" : 4834 },
			{ "wood" : 5485, "marble" : 5662 },
			{ "wood" : 6346, "marble" : 6623 },
			{ "wood" : 7338, "marble" : 7738 },	// 20

			{ "wood" : 8478, "marble" : 9032 },
			{ "wood" : 9790, "marble" : 10534 },
			{ "wood" : 11297, "marble" : 12275 },
			{ "wood" : 13030, "marble" : 13355 },
			{ "wood" : 14990, "marble" : 16636 },
			{ "wood" : 17317, "marble" : 19354 },
			{ "wood" : 19954, "marble" : 22507 },
			{ "wood" : 22986, "marble" : 26163 },
			{ "wood" : 26472, "marble" : 30404 },
			{ "wood" : 30484, "marble" : 35325 },	// 30

			{ "wood" : 35096, "marble" : 41033 },
			{ "wood" : 40399, "marble" : 47652 },
		],

		// winegrower, wood, marble
		"winegrower" : [
			{ "wood" : 467, "marble" : 116 },	// 2
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },	// 10

			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },	// 20

			{ "wood" : 122021, "marble" : 67485 },
			{ "wood" : 158740, "marble" : 87835 },
			{ "wood" : 206471, "marble" : 114289 },
			{ "wood" : 268524, "marble" : 148680 },
			{ "wood" : 349194, "marble" : 193389 },
			{ "wood" : 454063, "marble" : 251512 },
			{ "wood" : 590393, "marble" : 327069 },
			{ "wood" : 767620, "marble" : 425294 },
			{ "wood" : 998018, "marble" : 552986 },
			{ "wood" : 1297536, "marble" : 718988 },	// 30

			{ "wood" : 1686906, "marble" : 934789 },
			{ "wood" : 2193089, "marble" : 1215330 },
		],

		// vineyard, wood, marble
		"vineyard" : [
			{ "wood" : 423, "marble" : 198 },	// 2
			{ "wood" : 520, "marble" : 285 },
			{ "wood" : 631, "marble" : 387 },
			{ "wood" : 758, "marble" : 504 },
			{ "wood" : 905, "marble" : 640 },
			{ "wood" : 1074, "marble" : 798 },
			{ "wood" : 1269, "marble" : 981 },
			{ "wood" : 1492, "marble" : 1194 },
			{ "wood" : 1749, "marble" : 1440 },	// 10

			{ "wood" : 2045, "marble" : 1726 },
			{ "wood" : 2384, "marble" : 2058 },
			{ "wood" : 2775, "marble" : 2443 },
			{ "wood" : 3225, "marble" : 2889 },
			{ "wood" : 3741, "marble" : 3407 },
			{ "wood" : 4336, "marble" : 4008 },
			{ "wood" : 5019, "marble" : 4705 },
			{ "wood" : 5813, "marble" : 5513 },
			{ "wood" : 6875, "marble" : 6450 },
			{ "wood" : 7941, "marble" : 7537 },	// 20

			{ "wood" : 8944, "marble" : 8800 },
			{ "wood" : 10319, "marble" : 10263 },
			{ "wood" : 11900, "marble" : 11961 },
			{ "wood" : 13718, "marble" : 13930 },
			{ "wood" : 15809, "marble" : 16214 },
			{ "wood" : 18215, "marble" : 18864 },
			{ "wood" : 20978, "marble" : 21938 },
			{ "wood" : 24159, "marble" : 25503 },
			{ "wood" : 27816, "marble" : 29639 },
			{ "wood" : 32021, "marble" : 34437 },	// 30

			{ "wood" : 36857, "marble" : 40002 },
			{ "wood" : 42419, "marble" : 46457 },
		],

		// tavern, wood, marble
		"tavern" : [
			{ "wood" : 222, "marble" : 0 },	// 2
			{ "wood" : 367, "marble" : 0 },
			{ "wood" : 541, "marble" : 94 },
			{ "wood" : 750, "marble" : 122 },
			{ "wood" : 1001, "marble" : 158 },
			{ "wood" : 1302, "marble" : 206 },
			{ "wood" : 1663, "marble" : 267 },
			{ "wood" : 2097, "marble" : 348 },
			{ "wood" : 2617, "marble" : 452 },	// 10

			{ "wood" : 3241, "marble" : 587 },
			{ "wood" : 3990, "marble" : 764 },
			{ "wood" : 4888, "marble" : 993 },
			{ "wood" : 5967, "marble" : 1290 },
			{ "wood" : 7261, "marble" : 1677 },
			{ "wood" : 8814, "marble" : 2181 },
			{ "wood" : 10678, "marble" : 2835 },
			{ "wood" : 12914, "marble" : 3685 },
			{ "wood" : 15598, "marble" : 4791 },
			{ "wood" : 18818, "marble" : 6228 },	// 20

			{ "wood" : 22683, "marble" : 8097 },
			{ "wood" : 27320, "marble" : 10526 },
			{ "wood" : 32885, "marble" : 13684 },
			{ "wood" : 39562, "marble" : 17789 },
			{ "wood" : 47576, "marble" : 23125 },
			{ "wood" : 57192, "marble" : 30063 },
			{ "wood" : 68731, "marble" : 39082 },
			{ "wood" : 82578, "marble" : 50806 },
			{ "wood" : 99194, "marble" : 66048 },
			{ "wood" : 119134, "marble" : 85862 },	// 30

			{ "wood" : 143061, "marble" : 111621 },
			{ "wood" : 171774, "marble" : 145107 },
			{ "wood" : 206230, "marble" : 188640 },
			{ "wood" : 247577, "marble" : 245232 },
			{ "wood" : 297193, "marble" : 318801 },
			{ "wood" : 356732, "marble" : 414441 },
			{ "wood" : 428179, "marble" : 538774 },
			{ "wood" : 513916, "marble" : 700406 },
			{ "wood" : 616800, "marble" : 910528 },
			{ "wood" : 740261, "marble" : 1183686 },	// 40

			{ "wood" : 888413, "marble" : 1538791 },
			{ "wood" : 1066197, "marble" : 2000428 },
			{ "wood" : 1279538, "marble" : 2600558 },
			{ "wood" : 1535545, "marble" : 3380725 },
			{ "wood" : 1842756, "marble" : 4394943 },
			{ "wood" : 2211407, "marble" : 5713425 },
			{ "wood" : 2653789, "marble" : 7427454 },
			{ "wood" : 0, "marble" : 0 }, //??
		],

		// alchemist, wood, marble
		"alchemist" : [
			{ "wood" : 467, "marble" : 116 },	// 2
			{ "wood" : 718, "marble" : 255 },
			{ "wood" : 1045, "marble" : 436 },
			{ "wood" : 1469, "marble" : 671 },
			{ "wood" : 2021, "marble" : 977 },
			{ "wood" : 2738, "marble" : 1375 },
			{ "wood" : 3671, "marble" : 1892 },
			{ "wood" : 4883, "marble" : 2564 },
			{ "wood" : 6459, "marble" : 3437 },	// 10

			{ "wood" : 8508, "marble" : 4572 },
			{ "wood" : 11172, "marble" : 6049 },
			{ "wood" : 14634, "marble" : 7968 },
			{ "wood" : 19135, "marble" : 10462 },
			{ "wood" : 24987, "marble" : 13705 },
			{ "wood" : 32594, "marble" : 17921 },
			{ "wood" : 42483, "marble" : 23402 },
			{ "wood" : 55339, "marble" : 30527 },
			{ "wood" : 72050, "marble" : 39790 },
			{ "wood" : 93778, "marble" : 51830 },	// 20

			{ "wood" : 122021, "marble" : 67485 },
			{ "wood" : 158740, "marble" : 87835 },
			{ "wood" : 206471, "marble" : 114289 },
			{ "wood" : 268524, "marble" : 148680 },
			{ "wood" : 349194, "marble" : 193389 },
			{ "wood" : 454063, "marble" : 251512 },
			{ "wood" : 590393, "marble" : 327069 },
			{ "wood" : 767620, "marble" : 425294 },
			{ "wood" : 998018, "marble" : 552986 },
			{ "wood" : 1297536, "marble" : 718988 },	// 30

			{ "wood" : 1686906, "marble" : 934789 },
			{ "wood" : 2193089, "marble" : 1215330 },
		],
		
		// branchOffice, wood, marble
		"branchOffice" : [
			{ "wood" : 173, "marble" : 0 },	// 2
			{ "wood" : 346, "marble" : 0 },
			{ "wood" : 581, "marble" : 0 },
			{ "wood" : 896, "marble" : 540 },
			{ "wood" : 1314, "marble" : 792 },
			{ "wood" : 1863, "marble" : 1123 },
			{ "wood" : 2580, "marble" : 1555 },
			{ "wood" : 3509, "marble" : 2115 },
			{ "wood" : 4706, "marble" : 2837 },	// 10

			{ "wood" : 6241, "marble" : 3762 },
			{ "wood" : 8203, "marble" : 4945 },
			{ "wood" : 10699, "marble" : 6450 },
			{ "wood" : 13866, "marble" : 8359 },
			{ "wood" : 17872, "marble" : 10774 },
			{ "wood" : 22926, "marble" : 13820 },
			{ "wood" : 29286, "marble" : 17654 },
			{ "wood" : 37272, "marble" : 22469 },
			{ "wood" : 47283, "marble" : 28503 },
			{ "wood" : 59806, "marble" : 36051 },	// 20

			{ "wood" : 75447, "marble" : 45482 },
			{ "wood" : 94954, "marble" : 57240 },
			{ "wood" : 119245, "marble" : 71883 },
			{ "wood" : 149453, "marble" : 90092 },
			{ "wood" : 186977, "marble" : 112712 },
			{ "wood" : 233530, "marble" : 121067 },
			{ "wood" : 291225, "marble" : 175556 },
			{ "wood" : 362658, "marble" : 218617 },
			{ "wood" : 451015, "marble" : 271878 },
			{ "wood" : 560208, "marble" : 337705 },	// 30

			{ "wood" : 695038, "marble" : 418983 },
			{ "wood" : 861391, "marble" : 446564 },
		]
	};
}