// ==UserScript==
// @name			Ikariam Upgrade Watcher
// @version			1.5.0
// @namespace		http://ikariam.org/
// @description		Attaches a simple icon on each building which show level and if upgradeable
// @author			Anh Tuan Nguyen Dao (http://www.atdao.dk) (Update by KeyKon and Woeka)
// @homepage		http://www.atdao.dk/projects/scripts/ikariam-upgrade-watcher

// @include			http://s*.ikariam.*/index.php*
// @exclude			http://board.ikariam.*/
// @exclude			http://support.ikariam.*/*
// @exclude			http://support.*.ikariam.*/*

// ==/UserScript==

// Version Log:
//      v1.5.0 (5. November 2011)
//      - Updated all data for missing building levels with information from http://http://ikariam.wikia.com (by Woeka)
//
//		v1.4.0 (3. September 2010)
//      - Added Support for the new dump building with costs till level 40. (by KeyKon)
//
//		v1.3.2 (26. October 2009)
//			- Fixed icon and tooltip positioning for temple (thanks to Lordshinjo "http://userscripts.org/users/114555" for pointing out the problem).
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

// update check
var SUC_script_num = 63338; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000               <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

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
		}
		if (document.getElementById('value_wine')) {
			wine = document.getElementById('value_wine').textContent.replace(",","");
			wine = wine.replace(".","");
		}
		if (document.getElementById('value_marble')) {
			marble = document.getElementById('value_marble').textContent.replace(",","");
			marble = marble.replace(".","");
		}
		if (document.getElementById('value_crystal')) {
			crystal = document.getElementById('value_crystal').textContent.replace(",","");
			crystal = crystal.replace(".","");
		}
		if (document.getElementById('value_sulfur')) {
			sulfur = document.getElementById('value_sulfur').textContent.replace(",","");
			sulfur = sulfur.replace(".","");
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
				
				// 3 special cases, uses more than wood and marble			
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
	
	obj.innerHTML = '<div id="'+ id +'" style="position: absolute; z-index: 501; padding-top: 5px; height: 19px; width: 24px; text-align: center; top: ' + top + 'px; right: '+ right +'px; background-image: url(\'' + newImg + '\');">'+ level +'</div>';
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
		}
		if (document.getElementById('value_wine')) {
			curWine = document.getElementById('value_wine').textContent.replace(",","");
			curWine = curWine.replace(".","");
		}
		if (document.getElementById('value_marble')) {
			curMarble = document.getElementById('value_marble').textContent.replace(",","");
			curMarble = curMarble.replace(".","");
		}
		if (document.getElementById('value_crystal')) {
			curCrystal = document.getElementById('value_crystal').textContent.replace(",","");
			curCrystal = curCrystal.replace(".","");
		}
		if (document.getElementById('value_sulfur')) {
			curSulfur = document.getElementById('value_sulfur').textContent.replace(",","");
			curSulfur = curSulfur.replace(".","");
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
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgScrollLeft_2 + '\'); height: 102px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgWood + '" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorWine + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgWine + '" /> '+ estWine +'</div><div style="margin-top: -4px; color: ' + colorMarble + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgMarble + '" /> '+ estMarble +'</div><div style="margin-top: -4px; color: ' + colorCrystal + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgCrystal + '" /> '+ estCrystal +'</div><div style="margin-top: -4px; color: ' + colorSulfur + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgSulfur + '" /> '+ estSulfur +'</div></div><div class="after" style="background-image: url(\'' + imgScrollRight_2 + '\'); height: 102px; float: left;"></div>';
		
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
		}
		if (document.getElementById('value_marble')) {
			curMarble = document.getElementById('value_marble').textContent.replace(",","");
			curMarble = curMarble.replace(".","");
		}
		if (document.getElementById('value_crystal')) {
			curCrystal = document.getElementById('value_crystal').textContent.replace(",","");
			curCrystal = curCrystal.replace(".","");
		}
		if (document.getElementById('value_sulfur')) {
			curSulfur = document.getElementById('value_sulfur').textContent.replace(",","");
			curSulfur = curSulfur.replace(".","");
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
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgScrollLeft_3 + '\'); height: 82px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgWood + '" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorMarble + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgMarble + '" /> '+ estMarble +'</div><div style="margin-top: -4px; color: ' + colorCrystal + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgCrystal + '" /> '+ estCrystal +'</div><div style="margin-top: -4px; color: ' + colorSulfur + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgSulfur + '" /> '+ estSulfur +'</div></div><div class="after" style="background-image: url(\'' + imgScrollRight_3 + '\'); height: 82px; float: left;"></div>';
		
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
		
		estRes2 = curRes2 - res2;
		
		if (estWood >= 0) { colorWood = "green"; } else { colorWood = "red"; }
		if (estRes2 >= 0) {	colorRes2 = "green"; } else { colorRes2 = "red"; }
		
		div.innerHTML = '<div class="before" style="background-image: url(\'' + imgScrollLeft_1 +'\'); height: 46px; float: left;"></div><div style="float: left;"><div style="color: ' + colorWood + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + imgWood + '" /> '+ estWood +'</div><div style="margin-top: -4px; color: ' + colorRes2 + '; text-align: left;"><img style="vertical-align: middle; margin-right: 2px;" src="' + newImg + '" /> '+ estRes2 +'</div></div><div class="after" style="background-image: url(\'' + imgScrollRight_1 +'\'); height: 46px; float: left;"></div>';
		
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
			{ "x" : 50, "y" : 60 },
			{ "x" : 20, "y" : 12 },
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
			{ "x" : 18, "y" : -40 },	// special for colony and palace
		]		
	};

	// All index start with level 2
	BUILDINGS = {
		// palace, wood, wine, marble, crystal, sulfur
		"palace" : [
			{ 'wood' : 5823, 'wine' : 0, 'marble' : 1433, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 16048, 'wine' : 0, 'marble' : 4546, 'crystal' : 0, 'sulfur' : 3088}, // level 3
			{ 'wood' : 36496, 'wine' : 10898, 'marble' : 10770, 'crystal' : 0, 'sulfur' : 10300}, // level 4
			{ 'wood' : 77392, 'wine' : 22110, 'marble' : 23218, 'crystal' : 21188, 'sulfur' : 24725}, // level 5
			{ 'wood' : 159184, 'wine' : 44534, 'marble' : 48114, 'crystal' : 42400, 'sulfur' : 53573}, // level 6
			{ 'wood' : 322768, 'wine' : 89382, 'marble' : 97906, 'crystal' : 84824, 'sulfur' : 111269}, // level 7
			{ 'wood' : 649936, 'wine' : 179078, 'marble' : 197490, 'crystal' : 169672, 'sulfur' : 226661}, // level 8
			{ 'wood' : 1304272, 'wine' : 358470, 'marble' : 396658, 'crystal' : 339368, 'sulfur' : 457445}, // level 9
			{ 'wood' : 2612944, 'wine' : 717254, 'marble' : 794994, 'crystal' : 678760, 'sulfur' : 919013}, // level 10
			{ 'wood' : 4743517, 'wine' : 1434821, 'marble' : 1591666, 'crystal' : 1357543, 'sulfur' : 1842149}, // level 11
			{ 'wood' : 10464974, 'wine' : 2869957, 'marble' : 3185009, 'crystal' : 2715112, 'sulfur' : 3688421}, // level 12
		],
		
		// palaceColony, wood, wine, marble, crystal, sulfur
		"palaceColony" : [
			{ 'wood' : 5823, 'wine' : 0, 'marble' : 1433, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 16048, 'wine' : 0, 'marble' : 4546, 'crystal' : 0, 'sulfur' : 3088}, // level 3
			{ 'wood' : 36496, 'wine' : 10898, 'marble' : 10770, 'crystal' : 0, 'sulfur' : 10300}, // level 4
			{ 'wood' : 77392, 'wine' : 22110, 'marble' : 23218, 'crystal' : 21188, 'sulfur' : 24725}, // level 5
			{ 'wood' : 159184, 'wine' : 44534, 'marble' : 48114, 'crystal' : 42400, 'sulfur' : 53573}, // level 6
			{ 'wood' : 322768, 'wine' : 89382, 'marble' : 97906, 'crystal' : 84824, 'sulfur' : 111269}, // level 7
			{ 'wood' : 649936, 'wine' : 179078, 'marble' : 197490, 'crystal' : 169672, 'sulfur' : 226661}, // level 8
			{ 'wood' : 1304272, 'wine' : 358470, 'marble' : 396658, 'crystal' : 339368, 'sulfur' : 457445}, // level 9
			{ 'wood' : 2612944, 'wine' : 717254, 'marble' : 794994, 'crystal' : 678760, 'sulfur' : 919013}, // level 10
			{ 'wood' : 4743517, 'wine' : 1434821, 'marble' : 1591666, 'crystal' : 1357543, 'sulfur' : 1842149}, // level 11
			{ 'wood' : 10464974, 'wine' : 2869957, 'marble' : 3185009, 'crystal' : 2715112, 'sulfur' : 3688421}, // level 12
		],
				
		// dump, wood, marble, crystal, sulfur
		"dump" : [
			{ 'wood' : 1152, 'wine' : 0, 'marble' : 932, 'crystal' : 1146, 'sulfur' : 845}, // level 2
			{ 'wood' : 1766, 'wine' : 0, 'marble' : 1445, 'crystal' : 1668, 'sulfur' : 1398}, // level 3
			{ 'wood' : 2504, 'wine' : 0, 'marble' : 2051, 'crystal' : 2278, 'sulfur' : 2061}, // level 4
			{ 'wood' : 3388, 'wine' : 0, 'marble' : 2762, 'crystal' : 2991, 'sulfur' : 2858}, // level 5
			{ 'wood' : 4450, 'wine' : 0, 'marble' : 3609, 'crystal' : 3526, 'sulfur' : 3813}, // level 6
			{ 'wood' : 5724, 'wine' : 0, 'marble' : 4604, 'crystal' : 4803, 'sulfur' : 4960}, // level 7
			{ 'wood' : 7253, 'wine' : 0, 'marble' : 5778, 'crystal' : 5946, 'sulfur' : 6336}, // level 8
			{ 'wood' : 9088, 'wine' : 0, 'marble' : 7164, 'crystal' : 7283, 'sulfur' : 7987}, // level 9
			{ 'wood' : 11289, 'wine' : 0, 'marble' : 8799, 'crystal' : 8847, 'sulfur' : 9968}, // level 10
			{ 'wood' : 13931, 'wine' : 0, 'marble' : 10728, 'crystal' : 10678, 'sulfur' : 12346}, // level 11
			{ 'wood' : 17101, 'wine' : 0, 'marble' : 13005, 'crystal' : 12819, 'sulfur' : 15199}, // level 12
			{ 'wood' : 20905, 'wine' : 0, 'marble' : 15691, 'crystal' : 15324, 'sulfur' : 18623}, // level 13
			{ 'wood' : 25470, 'wine' : 0, 'marble' : 18862, 'crystal' : 18257, 'sulfur' : 22731}, // level 14
			{ 'wood' : 30948, 'wine' : 0, 'marble' : 22602, 'crystal' : 21687, 'sulfur' : 27661}, // level 15
			{ 'wood' : 37522, 'wine' : 0, 'marble' : 27016, 'crystal' : 25700, 'sulfur' : 33578}, // level 16
			{ 'wood' : 45410, 'wine' : 0, 'marble' : 32225, 'crystal' : 30395, 'sulfur' : 40677}, // level 17
			{ 'wood' : 54876, 'wine' : 0, 'marble' : 38371, 'crystal' : 35889, 'sulfur' : 49197}, // level 18
			{ 'wood' : 66236, 'wine' : 0, 'marble' : 45623, 'crystal' : 42316, 'sulfur' : 59420}, // level 19
			{ 'wood' : 79867, 'wine' : 0, 'marble' : 54181, 'crystal' : 49837, 'sulfur' : 71688}, // level 20
			{ 'wood' : 96223, 'wine' : 0, 'marble' : 64278, 'crystal' : 58635, 'sulfur' : 86409}, // level 21
			{ 'wood' : 115852, 'wine' : 0, 'marble' : 76194, 'crystal' : 68929, 'sulfur' : 104076}, // level 22
			{ 'wood' : 139407, 'wine' : 0, 'marble' : 90256, 'crystal' : 80973, 'sulfur' : 125274}, // level 23
			{ 'wood' : 167672, 'wine' : 0, 'marble' : 106847, 'crystal' : 95065, 'sulfur' : 150714}, // level 24
			{ 'wood' : 201592, 'wine' : 0, 'marble' : 126424, 'crystal' : 111553, 'sulfur' : 181241}, // level 25
			{ 'wood' : 242293, 'wine' : 0, 'marble' : 149528, 'crystal' : 130843, 'sulfur' : 217872}, // level 26
			{ 'wood' : 291136, 'wine' : 0, 'marble' : 176787, 'crystal' : 153414, 'sulfur' : 261830}, // level 27
			{ 'wood' : 349749, 'wine' : 0, 'marble' : 208956, 'crystal' : 179821, 'sulfur' : 314581}, // level 28
			{ 'wood' : 420081, 'wine' : 0, 'marble' : 246913, 'crystal' : 201716, 'sulfur' : 377881}, // level 29
			{ 'wood' : 504483, 'wine' : 0, 'marble' : 291702, 'crystal' : 246864, 'sulfur' : 453842}, // level 30
			{ 'wood' : 605763, 'wine' : 0, 'marble' : 344555, 'crystal' : 289157, 'sulfur' : 544994}, // level 31
			{ 'wood' : 727300, 'wine' : 0, 'marble' : 406921, 'crystal' : 338642, 'sulfur' : 654378}, // level 32
			{ 'wood' : 873143, 'wine' : 0, 'marble' : 480512, 'crystal' : 396536, 'sulfur' : 785637}, // level 33
			{ 'wood' : 1048157, 'wine' : 0, 'marble' : 567350, 'crystal' : 464274, 'sulfur' : 943149}, // level 34
			{ 'wood' : 1258171, 'wine' : 0, 'marble' : 669817, 'crystal' : 543528, 'sulfur' : 1132163}, // level 35
			{ 'wood' : 1510191, 'wine' : 0, 'marble' : 790730, 'crystal' : 636253, 'sulfur' : 1358979}, // level 36
			{ 'wood' : 1812613, 'wine' : 0, 'marble' : 933408, 'crystal' : 744742, 'sulfur' : 1631159}, // level 37
			{ 'wood' : 2175519, 'wine' : 0, 'marble' : 1101767, 'crystal' : 871676, 'sulfur' : 1957774}, // level 38
			{ 'wood' : 2611007, 'wine' : 0, 'marble' : 1300431, 'crystal' : 1020187, 'sulfur' : 2349714}, // level 39
			{ 'wood' : 3133592, 'wine' : 0, 'marble' : 1534855, 'crystal' : 1193945, 'sulfur' : 2820041}, // level 40
		],
    
		// academy, wood, crystal
		"academy" : [
			{ 'wood' : 68, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 115, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 263, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 382, 'wine' : 0, 'marble' : 0, 'crystal' : 225, 'sulfur' : 0}, // level 5
			{ 'wood' : 626, 'wine' : 0, 'marble' : 0, 'crystal' : 428, 'sulfur' : 0}, // level 6
			{ 'wood' : 982, 'wine' : 0, 'marble' : 0, 'crystal' : 744, 'sulfur' : 0}, // level 7
			{ 'wood' : 1330, 'wine' : 0, 'marble' : 0, 'crystal' : 1089, 'sulfur' : 0}, // level 8
			{ 'wood' : 2004, 'wine' : 0, 'marble' : 0, 'crystal' : 1748, 'sulfur' : 0}, // level 9
			{ 'wood' : 2665, 'wine' : 0, 'marble' : 0, 'crystal' : 2454, 'sulfur' : 0}, // level 10
			{ 'wood' : 3916, 'wine' : 0, 'marble' : 0, 'crystal' : 3786, 'sulfur' : 0}, // level 11
			{ 'wood' : 5156, 'wine' : 0, 'marble' : 0, 'crystal' : 5216, 'sulfur' : 0}, // level 12
			{ 'wood' : 7446, 'wine' : 0, 'marble' : 0, 'crystal' : 7862, 'sulfur' : 0}, // level 13
			{ 'wood' : 9753, 'wine' : 0, 'marble' : 0, 'crystal' : 10729, 'sulfur' : 0}, // level 14
			{ 'wood' : 12751, 'wine' : 0, 'marble' : 0, 'crystal' : 14599, 'sulfur' : 0}, // level 15
			{ 'wood' : 18163, 'wine' : 0, 'marble' : 0, 'crystal' : 21627, 'sulfur' : 0}, // level 16
			{ 'wood' : 23691, 'wine' : 0, 'marble' : 0, 'crystal' : 29321, 'sulfur' : 0}, // level 17
			{ 'wood' : 33451, 'wine' : 0, 'marble' : 0, 'crystal' : 43020, 'sulfur' : 0}, // level 18
			{ 'wood' : 43571, 'wine' : 0, 'marble' : 0, 'crystal' : 58213, 'sulfur' : 0}, // level 19
			{ 'wood' : 56728, 'wine' : 0, 'marble' : 0, 'crystal' : 78724, 'sulfur' : 0}, // level 20
			{ 'wood' : 73832, 'wine' : 0, 'marble' : 0, 'crystal' : 106414, 'sulfur' : 0}, // level 21
			{ 'wood' : 103459, 'wine' : 0, 'marble' : 0, 'crystal' : 154857, 'sulfur' : 0}, // level 22
			{ 'wood' : 144203, 'wine' : 0, 'marble' : 0, 'crystal' : 224146, 'sulfur' : 0}, // level 23
			{ 'wood' : 175058, 'wine' : 0, 'marble' : 0, 'crystal' : 282571, 'sulfur' : 0}, // level 24
			{ 'wood' : 243930, 'wine' : 0, 'marble' : 0, 'crystal' : 408877, 'sulfur' : 0}, // level 25
			{ 'wood' : 317207, 'wine' : 0, 'marble' : 0, 'crystal' : 552140, 'sulfur' : 0}, // level 26
			{ 'wood' : 439967, 'wine' : 0, 'marble' : 0, 'crystal' : 795252, 'sulfur' : 0}, // level 27
			{ 'wood' : 536309, 'wine' : 0, 'marble' : 0, 'crystal' : 1006646, 'sulfur' : 0}, // level 28
			{ 'wood' : 743789, 'wine' : 0, 'marble' : 0, 'crystal' : 1449741, 'sulfur' : 0}, // level 29
			{ 'wood' : 1027469, 'wine' : 0, 'marble' : 0, 'crystal' : 2079650, 'sulfur' : 0}, // level 30
			{ 'wood' : 1257244, 'wine' : 0, 'marble' : 0, 'crystal' : 2642546, 'sulfur' : 0}, // level 31
			{ 'wood' : 1736681, 'wine' : 0, 'marble' : 0, 'crystal' : 3790481, 'sulfur' : 0}, // level 32
		],
		
		// temple, wood, crystal 
		"temple" : [
			{ 'wood' : 228, 'wine' : 0, 'marble' : 189, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 333, 'wine' : 0, 'marble' : 290, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 465, 'wine' : 0, 'marble' : 423, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 598, 'wine' : 0, 'marble' : 567, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 760, 'wine' : 0, 'marble' : 752, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 958, 'wine' : 0, 'marble' : 989, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1197, 'wine' : 0, 'marble' : 1290, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 1432, 'wine' : 0, 'marble' : 1610, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 1773, 'wine' : 0, 'marble' : 2080, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 2112, 'wine' : 0, 'marble' : 2586, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 2512, 'wine' : 0, 'marble' : 3210, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 3082, 'wine' : 0, 'marble' : 4109, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 3655, 'wine' : 0, 'marble' : 5084, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 4458, 'wine' : 0, 'marble' : 6471, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 5126, 'wine' : 0, 'marble' : 7765, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 6232, 'wine' : 0, 'marble' : 9850, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 7167, 'wine' : 0, 'marble' : 11821, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 8687, 'wine' : 0, 'marble' : 14952, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 10247, 'wine' : 0, 'marble' : 18402, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 11784, 'wine' : 0, 'marble' : 22082, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 14228, 'wine' : 0, 'marble' : 27824, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 16752, 'wine' : 0, 'marble' : 34183, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 19265, 'wine' : 0, 'marble' : 41020, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 23156, 'wine' : 0, 'marble' : 51514, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 26663, 'wine' : 0, 'marble' : 61817, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 32026, 'wine' : 0, 'marble' : 77477, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 36830, 'wine' : 0, 'marble' : 92972, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 43256, 'wine' : 0, 'marble' : 113941, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 50782, 'wine' : 0, 'marble' : 139576, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 59591, 'wine' : 0, 'marble' : 170910, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 68528, 'wine' : 0, 'marble' : 205093, 'crystal' : 0, 'sulfur' : 0}, // level 32			
		],
		
		// townHall, wood, marble
		"townHall" : [
			{ 'wood' : 158, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 335, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 622, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 923, 'wine' : 0, 'marble' : 285, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 1390, 'wine' : 0, 'marble' : 550, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 2015, 'wine' : 0, 'marble' : 936, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 2706, 'wine' : 0, 'marble' : 1411, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 3661, 'wine' : 0, 'marble' : 2091, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 4776, 'wine' : 0, 'marble' : 2945, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 6173, 'wine' : 0, 'marble' : 4072, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 8074, 'wine' : 0, 'marble' : 5664, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 10281, 'wine' : 0, 'marble' : 7637, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 13023, 'wine' : 0, 'marble' : 10214, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 16424, 'wine' : 0, 'marble' : 13575, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 20986, 'wine' : 0, 'marble' : 18254, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 25423, 'wine' : 0, 'marble' : 23250, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 32285, 'wine' : 0, 'marble' : 31022, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 40232, 'wine' : 0, 'marble' : 40599, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 49286, 'wine' : 0, 'marble' : 52216, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 61207, 'wine' : 0, 'marble' : 68069, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 74804, 'wine' : 0, 'marble' : 87316, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 93956, 'wine' : 0, 'marble' : 115101, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 113035, 'wine' : 0, 'marble' : 145326, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 141594, 'wine' : 0, 'marble' : 191053, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 170213, 'wine' : 0, 'marble' : 241039, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 210011, 'wine' : 0, 'marble' : 312128, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 258875, 'wine' : 0, 'marble' : 403824, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 314902, 'wine' : 0, 'marble' : 515592, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 387655, 'wine' : 0, 'marble' : 666227, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 471194, 'wine' : 0, 'marble' : 850031, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 572580, 'wine' : 0, 'marble' : 1084292, 'crystal' : 0, 'sulfur' : 0}, // level 32
			{ 'wood' : 695615, 'wine' : 0, 'marble' : 1382826, 'crystal' : 0, 'sulfur' : 0}, // level 33
			{ 'wood' : 854728, 'wine' : 0, 'marble' : 1783721, 'crystal' : 0, 'sulfur' : 0}, // level 34
			{ 'wood' : 1037814, 'wine' : 0, 'marble' : 2273685, 'crystal' : 0, 'sulfur' : 0}, // level 35
			{ 'wood' : 1274043, 'wine' : 0, 'marble' : 2930330, 'crystal' : 0, 'sulfur' : 0}, // level 36
			{ 'wood' : 1714396, 'wine' : 0, 'marble' : 3692589, 'crystal' : 0, 'sulfur' : 0}, // level 37
			{ 'wood' : 1876185, 'wine' : 0, 'marble' : 4756439, 'crystal' : 0, 'sulfur' : 0}, // level 38
			{ 'wood' : 2276285, 'wine' : 0, 'marble' : 6058680, 'crystal' : 0, 'sulfur' : 0}, // level 39
			{ 'wood' : 2761291, 'wine' : 0, 'marble' : 7716365, 'crystal' : 0, 'sulfur' : 0}, // level 40
			{ 'wood' : 3384433, 'wine' : 0, 'marble' : 9929883, 'crystal' : 0, 'sulfur' : 0}, // level 41
			{ 'wood' : 4061703, 'wine' : 0, 'marble' : 12512054, 'crystal' : 0, 'sulfur' : 0}, // level 42
			{ 'wood' : 4975980, 'wine' : 0, 'marble' : 16094037, 'crystal' : 0, 'sulfur' : 0}, // level 43
			{ 'wood' : 6032502, 'wine' : 0, 'marble' : 20485822, 'crystal' : 0, 'sulfur' : 0}, // level 44
			{ 'wood' : 7312522, 'wine' : 0, 'marble' : 26073281, 'crystal' : 0, 'sulfur' : 0}, // level 45
			{ 'wood' : 8861330, 'wine' : 0, 'marble' : 33181278, 'crystal' : 0, 'sulfur' : 0}, // level 46
			{ 'wood' : 10846841, 'wine' : 0, 'marble' : 42636728, 'crystal' : 0, 'sulfur' : 0}, // level 47
			{ 'wood' : 13016620, 'wine' : 0, 'marble' : 53722706, 'crystal' : 0, 'sulfur' : 0}, // level 48
		],

		// architect, wood, marble
		"architect" : [
			{ 'wood' : 291, 'wine' : 0, 'marble' : 160, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 413, 'wine' : 0, 'marble' : 222, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 555, 'wine' : 0, 'marble' : 295, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 720, 'wine' : 0, 'marble' : 379, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 911, 'wine' : 0, 'marble' : 475, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 1133, 'wine' : 0, 'marble' : 587, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1390, 'wine' : 0, 'marble' : 716, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 1689, 'wine' : 0, 'marble' : 865, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 2035, 'wine' : 0, 'marble' : 1036, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 2437, 'wine' : 0, 'marble' : 1233, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 2902, 'wine' : 0, 'marble' : 1460, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 3443, 'wine' : 0, 'marble' : 1722, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 4070, 'wine' : 0, 'marble' : 2023, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 4797, 'wine' : 0, 'marble' : 2369, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 5640, 'wine' : 0, 'marble' : 2767, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 6618, 'wine' : 0, 'marble' : 3226, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 7754, 'wine' : 0, 'marble' : 3752, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 9070, 'wine' : 0, 'marble' : 4358, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 10598, 'wine' : 0, 'marble' : 5056, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 12369, 'wine' : 0, 'marble' : 5857, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 14424, 'wine' : 0, 'marble' : 6777, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 16807, 'wine' : 0, 'marble' : 7836, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 19573, 'wine' : 0, 'marble' : 9052, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 22780, 'wine' : 0, 'marble' : 10448, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 26501, 'wine' : 0, 'marble' : 12054, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 30817, 'wine' : 0, 'marble' : 13899, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 35825, 'wine' : 0, 'marble' : 16017, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 41631, 'wine' : 0, 'marble' : 18450, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 48371, 'wine' : 0, 'marble' : 21245, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 56185, 'wine' : 0, 'marble' : 24454, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 65251, 'wine' : 0, 'marble' : 28141, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// safehouse, wood, marble
		"safehouse" : [
			{ 'wood' : 248, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 402, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 578, 'wine' : 0, 'marble' : 129, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 779, 'wine' : 0, 'marble' : 197, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 1007, 'wine' : 0, 'marble' : 275, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 1267, 'wine' : 0, 'marble' : 366, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1564, 'wine' : 0, 'marble' : 471, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 1903, 'wine' : 0, 'marble' : 593, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 2288, 'wine' : 0, 'marble' : 735, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 2728, 'wine' : 0, 'marble' : 900, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 3230, 'wine' : 0, 'marble' : 1090, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 3801, 'wine' : 0, 'marble' : 1312, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 4453, 'wine' : 0, 'marble' : 1569, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 5195, 'wine' : 0, 'marble' : 1866, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 6042, 'wine' : 0, 'marble' : 2212, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 7008, 'wine' : 0, 'marble' : 2613, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 8108, 'wine' : 0, 'marble' : 3078, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 9363, 'wine' : 0, 'marble' : 3617, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 10793, 'wine' : 0, 'marble' : 4243, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 12423, 'wine' : 0, 'marble' : 4968, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 14282, 'wine' : 0, 'marble' : 5810, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 16401, 'wine' : 0, 'marble' : 6787, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 18816, 'wine' : 0, 'marble' : 7919, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 21570, 'wine' : 0, 'marble' : 9233, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 24709, 'wine' : 0, 'marble' : 10758, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 28288, 'wine' : 0, 'marble' : 12526, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 32368, 'wine' : 0, 'marble' : 14577, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 37019, 'wine' : 0, 'marble' : 16956, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 42321, 'wine' : 0, 'marble' : 19716, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 48365, 'wine' : 0, 'marble' : 22917, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 55255, 'wine' : 0, 'marble' : 26631, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		//wall, wood, marble
		"wall" : [
			{ 'wood' : 361, 'wine' : 0, 'marble' : 203, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 657, 'wine' : 0, 'marble' : 516, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 1012, 'wine' : 0, 'marble' : 892, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 1439, 'wine' : 0, 'marble' : 1344, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 1951, 'wine' : 0, 'marble' : 1885, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 2565, 'wine' : 0, 'marble' : 2535, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 3302, 'wine' : 0, 'marble' : 3315, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 4186, 'wine' : 0, 'marble' : 4251, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 5247, 'wine' : 0, 'marble' : 5374, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 6521, 'wine' : 0, 'marble' : 6721, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 8049, 'wine' : 0, 'marble' : 8338, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 9882, 'wine' : 0, 'marble' : 10279, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 12083, 'wine' : 0, 'marble' : 12608, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 14724, 'wine' : 0, 'marble' : 15402, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 17892, 'wine' : 0, 'marble' : 18755, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 21695, 'wine' : 0, 'marble' : 22779, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 26258, 'wine' : 0, 'marble' : 27607, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 31733, 'wine' : 0, 'marble' : 33402, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 38304, 'wine' : 0, 'marble' : 40355, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 46189, 'wine' : 0, 'marble' : 48699, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 55650, 'wine' : 0, 'marble' : 58711, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 67004, 'wine' : 0, 'marble' : 70726, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 80629, 'wine' : 0, 'marble' : 85144, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 96979, 'wine' : 0, 'marble' : 102446, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 116599, 'wine' : 0, 'marble' : 123208, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 140143, 'wine' : 0, 'marble' : 148122, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 168395, 'wine' : 0, 'marble' : 178019, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 202298, 'wine' : 0, 'marble' : 213896, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 242982, 'wine' : 0, 'marble' : 256948, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 291802, 'wine' : 0, 'marble' : 308610, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 350387, 'wine' : 0, 'marble' : 370605, 'crystal' : 0, 'sulfur' : 0}, // level 32
			{ 'wood' : 420689, 'wine' : 0, 'marble' : 444998, 'crystal' : 0, 'sulfur' : 0}, // level 33
			{ 'wood' : 505049, 'wine' : 0, 'marble' : 534270, 'crystal' : 0, 'sulfur' : 0}, // level 34
			{ 'wood' : 606284, 'wine' : 0, 'marble' : 641397, 'crystal' : 0, 'sulfur' : 0}, // level 35
			{ 'wood' : 727765, 'wine' : 0, 'marble' : 769949, 'crystal' : 0, 'sulfur' : 0}, // level 36
			{ 'wood' : 873541, 'wine' : 0, 'marble' : 924213, 'crystal' : 0, 'sulfur' : 0}, // level 37
			{ 'wood' : 1048473, 'wine' : 0, 'marble' : 1109328, 'crystal' : 0, 'sulfur' : 0}, // level 38
			{ 'wood' : 1258393, 'wine' : 0, 'marble' : 1331467, 'crystal' : 0, 'sulfur' : 0}, // level 39
			{ 'wood' : 1510294, 'wine' : 0, 'marble' : 1598031, 'crystal' : 0, 'sulfur' : 0}, // level 40
			{ 'wood' : 1812577, 'wine' : 0, 'marble' : 1917913, 'crystal' : 0, 'sulfur' : 0}, // level 41
			{ 'wood' : 2175317, 'wine' : 0, 'marble' : 2301767, 'crystal' : 0, 'sulfur' : 0}, // level 42
			{ 'wood' : 2610603, 'wine' : 0, 'marble' : 2762392, 'crystal' : 0, 'sulfur' : 0}, // level 43
			{ 'wood' : 3132948, 'wine' : 0, 'marble' : 3315144, 'crystal' : 0, 'sulfur' : 0}, // level 44
			{ 'wood' : 3759764, 'wine' : 0, 'marble' : 3978446, 'crystal' : 0, 'sulfur' : 0}, // level 45
			{ 'wood' : 4511941, 'wine' : 0, 'marble' : 4774409, 'crystal' : 0, 'sulfur' : 0}, // level 46
			{ 'wood' : 5414554, 'wine' : 0, 'marble' : 5729565, 'crystal' : 0, 'sulfur' : 0}, // level 47
			{ 'wood' : 6497687, 'wine' : 0, 'marble' : 6875750, 'crystal' : 0, 'sulfur' : 0}, // level 48
		],

		// shipyard, wood, marble
		"shipyard" : [
			{ 'wood' : 202, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 324, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 477, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 671, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 914, 'wine' : 0, 'marble' : 778, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 1222, 'wine' : 0, 'marble' : 1052, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1609, 'wine' : 0, 'marble' : 1397, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 2096, 'wine' : 0, 'marble' : 1832, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 2711, 'wine' : 0, 'marble' : 2381, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 3485, 'wine' : 0, 'marble' : 3070, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 4459, 'wine' : 0, 'marble' : 3941, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 5688, 'wine' : 0, 'marble' : 5037, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 7238, 'wine' : 0, 'marble' : 6420, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 9190, 'wine' : 0, 'marble' : 8161, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 11648, 'wine' : 0, 'marble' : 10354, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 14746, 'wine' : 0, 'marble' : 13118, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 18649, 'wine' : 0, 'marble' : 16601, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 23568, 'wine' : 0, 'marble' : 20989, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 29765, 'wine' : 0, 'marble' : 26517, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 37573, 'wine' : 0, 'marble' : 33484, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 47412, 'wine' : 0, 'marble' : 42261, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 59808, 'wine' : 0, 'marble' : 53321, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 75428, 'wine' : 0, 'marble' : 67256, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 95108, 'wine' : 0, 'marble' : 84814, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 119906, 'wine' : 0, 'marble' : 106938, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 151151, 'wine' : 0, 'marble' : 134814, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 190520, 'wine' : 0, 'marble' : 169937, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 240124, 'wine' : 0, 'marble' : 214192, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 302626, 'wine' : 0, 'marble' : 269954, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 381378, 'wine' : 0, 'marble' : 340214, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 480605, 'wine' : 0, 'marble' : 428741, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// port, wood, marble
		"port" : [
			{ 'wood' : 150, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 274, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 429, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 637, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 894, 'wine' : 0, 'marble' : 176, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 1207, 'wine' : 0, 'marble' : 326, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1645, 'wine' : 0, 'marble' : 540, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 2106, 'wine' : 0, 'marble' : 791, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 2735, 'wine' : 0, 'marble' : 1138, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 3537, 'wine' : 0, 'marble' : 1598, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 4492, 'wine' : 0, 'marble' : 2176, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 5689, 'wine' : 0, 'marble' : 2928, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 7103, 'wine' : 0, 'marble' : 3859, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 8850, 'wine' : 0, 'marble' : 5051, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 11094, 'wine' : 0, 'marble' : 6628, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 13731, 'wine' : 0, 'marble' : 8566, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 17062, 'wine' : 0, 'marble' : 11089, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 21097, 'wine' : 0, 'marble' : 14265, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 25965, 'wine' : 0, 'marble' : 18241, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 31810, 'wine' : 0, 'marble' : 23197, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 39190, 'wine' : 0, 'marble' : 29642, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 47998, 'wine' : 0, 'marble' : 37636, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 58713, 'wine' : 0, 'marble' : 47703, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 71955, 'wine' : 0, 'marble' : 60556, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 87627, 'wine' : 0, 'marble' : 76366, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 94250, 'wine' : 0, 'marble' : 85042, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 130776, 'wine' : 0, 'marble' : 122156, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 159019, 'wine' : 0, 'marble' : 153753, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 193937, 'wine' : 0, 'marble' : 194089, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 235849, 'wine' : 0, 'marble' : 244300, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 286514, 'wine' : 0, 'marble' : 307174, 'crystal' : 0, 'sulfur' : 0}, // level 32
			{ 'wood' : 348718, 'wine' : 0, 'marble' : 386955, 'crystal' : 0, 'sulfur' : 0}, // level 33
			{ 'wood' : 423990, 'wine' : 0, 'marble' : 486969, 'crystal' : 0, 'sulfur' : 0}, // level 34
			{ 'wood' : 513947, 'wine' : 0, 'marble' : 610992, 'crystal' : 0, 'sulfur' : 0}, // level 35
			{ 'wood' : 625160, 'wine' : 0, 'marble' : 769302, 'crystal' : 0, 'sulfur' : 0}, // level 36
			{ 'wood' : 758178, 'wine' : 0, 'marble' : 965792, 'crystal' : 0, 'sulfur' : 0}, // level 37
			{ 'wood' : 919693, 'wine' : 0, 'marble' : 1212790, 'crystal' : 0, 'sulfur' : 0}, // level 38
			{ 'wood' : 1116013, 'wine' : 0, 'marble' : 1523570, 'crystal' : 0, 'sulfur' : 0}, // level 39
			{ 'wood' : 1353517, 'wine' : 0, 'marble' : 1913072, 'crystal' : 0, 'sulfur' : 0}, // level 40
			{ 'wood' : 1642274, 'wine' : 0, 'marble' : 2403313, 'crystal' : 0, 'sulfur' : 0}, // level 41
			{ 'wood' : 1990223, 'wine' : 0, 'marble' : 3015688, 'crystal' : 0, 'sulfur' : 0}, // level 42
			{ 'wood' : 2411061, 'wine' : 0, 'marble' : 3782992, 'crystal' : 0, 'sulfur' : 0}, // level 43
			{ 'wood' : 2923228, 'wine' : 0, 'marble' : 4749576, 'crystal' : 0, 'sulfur' : 0}, // level 44
			{ 'wood' : 3541580, 'wine' : 0, 'marble' : 5959026, 'crystal' : 0, 'sulfur' : 0}, // level 45
			{ 'wood' : 4291523, 'wine' : 0, 'marble' : 7478200, 'crystal' : 0, 'sulfur' : 0}, // level 46
		],

		// glassblowing, wood, marble
		"glassblowing" : [
			{ 'wood' : 467, 'wine' : 0, 'marble' : 116, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 718, 'wine' : 0, 'marble' : 255, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 1045, 'wine' : 0, 'marble' : 436, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 1469, 'wine' : 0, 'marble' : 671, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 2021, 'wine' : 0, 'marble' : 977, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 2738, 'wine' : 0, 'marble' : 1375, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 3671, 'wine' : 0, 'marble' : 1892, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 4883, 'wine' : 0, 'marble' : 2564, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 6459, 'wine' : 0, 'marble' : 3437, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 8508, 'wine' : 0, 'marble' : 4572, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 11172, 'wine' : 0, 'marble' : 6049, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 14634, 'wine' : 0, 'marble' : 7968, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 19135, 'wine' : 0, 'marble' : 10462, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 24987, 'wine' : 0, 'marble' : 13705, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 32594, 'wine' : 0, 'marble' : 17921, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 42483, 'wine' : 0, 'marble' : 23402, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 55339, 'wine' : 0, 'marble' : 30527, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 72050, 'wine' : 0, 'marble' : 39790, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 93778, 'wine' : 0, 'marble' : 51830, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 122021, 'wine' : 0, 'marble' : 67485, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 158740, 'wine' : 0, 'marble' : 87835, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 206471, 'wine' : 0, 'marble' : 114290, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 268524, 'wine' : 0, 'marble' : 148680, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 349194, 'wine' : 0, 'marble' : 193389, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 454063, 'wine' : 0, 'marble' : 251512, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 590392, 'wine' : 0, 'marble' : 327069, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 767620, 'wine' : 0, 'marble' : 425294, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 998018, 'wine' : 0, 'marble' : 552986, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 1297536, 'wine' : 0, 'marble' : 718988, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 1686906, 'wine' : 0, 'marble' : 934789, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 2193089, 'wine' : 0, 'marble' : 1215330, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// warehouse, wood, marble
		"warehouse" : [
			{ 'wood' : 288, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 442, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 626, 'wine' : 0, 'marble' : 96, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 847, 'wine' : 0, 'marble' : 211, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 1113, 'wine' : 0, 'marble' : 349, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 1431, 'wine' : 0, 'marble' : 515, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1813, 'wine' : 0, 'marble' : 714, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 2272, 'wine' : 0, 'marble' : 953, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 2822, 'wine' : 0, 'marble' : 1240, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 3483, 'wine' : 0, 'marble' : 1584, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 4275, 'wine' : 0, 'marble' : 1997, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 5226, 'wine' : 0, 'marble' : 2492, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 6368, 'wine' : 0, 'marble' : 3086, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 7737, 'wine' : 0, 'marble' : 3800, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 9380, 'wine' : 0, 'marble' : 4656, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 11353, 'wine' : 0, 'marble' : 5683, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 13719, 'wine' : 0, 'marble' : 6915, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 16559, 'wine' : 0, 'marble' : 8394, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 19967, 'wine' : 0, 'marble' : 10169, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 24056, 'wine' : 0, 'marble' : 12299, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 28963, 'wine' : 0, 'marble' : 14855, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 34852, 'wine' : 0, 'marble' : 17922, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 41918, 'wine' : 0, 'marble' : 21602, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 50398, 'wine' : 0, 'marble' : 26019, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 60574, 'wine' : 0, 'marble' : 31319, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 72784, 'wine' : 0, 'marble' : 37678, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 87437, 'wine' : 0, 'marble' : 45310, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 105021, 'wine' : 0, 'marble' : 54468, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 126121, 'wine' : 0, 'marble' : 65458, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 151441, 'wine' : 0, 'marble' : 78645, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 181825, 'wine' : 0, 'marble' : 94471, 'crystal' : 0, 'sulfur' : 0}, // level 32
			{ 'wood' : 218286, 'wine' : 0, 'marble' : 113461, 'crystal' : 0, 'sulfur' : 0}, // level 33
			{ 'wood' : 262039, 'wine' : 0, 'marble' : 136249, 'crystal' : 0, 'sulfur' : 0}, // level 34
			{ 'wood' : 314543, 'wine' : 0, 'marble' : 163595, 'crystal' : 0, 'sulfur' : 0}, // level 35
			{ 'wood' : 377548, 'wine' : 0, 'marble' : 196409, 'crystal' : 0, 'sulfur' : 0}, // level 36
			{ 'wood' : 453153, 'wine' : 0, 'marble' : 235787, 'crystal' : 0, 'sulfur' : 0}, // level 37
			{ 'wood' : 543880, 'wine' : 0, 'marble' : 283041, 'crystal' : 0, 'sulfur' : 0}, // level 38
			{ 'wood' : 652752, 'wine' : 0, 'marble' : 339745, 'crystal' : 0, 'sulfur' : 0}, // level 39
			{ 'wood' : 783398, 'wine' : 0, 'marble' : 407790, 'crystal' : 0, 'sulfur' : 0}, // level 40
		],

		// museum, wood, marble
		"museum" : [
			{ 'wood' : 1435, 'wine' : 0, 'marble' : 1190, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 2748, 'wine' : 0, 'marble' : 2573, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 4716, 'wine' : 0, 'marble' : 4676, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 7669, 'wine' : 0, 'marble' : 7871, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 12099, 'wine' : 0, 'marble' : 12729, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 18744, 'wine' : 0, 'marble' : 20112, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 28710, 'wine' : 0, 'marble' : 31335, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 43661, 'wine' : 0, 'marble' : 48394, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 66086, 'wine' : 0, 'marble' : 74323, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 99724, 'wine' : 0, 'marble' : 113736, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 150181, 'wine' : 0, 'marble' : 173643, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 225866, 'wine' : 0, 'marble' : 264701, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 339394, 'wine' : 0, 'marble' : 403110, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 509686, 'wine' : 0, 'marble' : 613492, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 765124, 'wine' : 0, 'marble' : 933272, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 1148280, 'wine' : 0, 'marble' : 1419338, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 1723016, 'wine' : 0, 'marble' : 2158157, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 2585120, 'wine' : 0, 'marble' : 3281164, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 3878276, 'wine' : 0, 'marble' : 4988136, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 5818008, 'wine' : 0, 'marble' : 7582730, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 8727680, 'wine' : 0, 'marble' : 11526750, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 0, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 0, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 24
		],

		// workshop, wood, marble
		"workshop" : [
			{ 'wood' : 383, 'wine' : 0, 'marble' : 167, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 569, 'wine' : 0, 'marble' : 251, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 781, 'wine' : 0, 'marble' : 349, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 1023, 'wine' : 0, 'marble' : 461, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 1299, 'wine' : 0, 'marble' : 592, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 1613, 'wine' : 0, 'marble' : 744, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1972, 'wine' : 0, 'marble' : 920, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 2380, 'wine' : 0, 'marble' : 1125, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 2846, 'wine' : 0, 'marble' : 1362, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 3377, 'wine' : 0, 'marble' : 1637, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 3982, 'wine' : 0, 'marble' : 1956, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 4672, 'wine' : 0, 'marble' : 2326, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 5458, 'wine' : 0, 'marble' : 2755, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 6355, 'wine' : 0, 'marble' : 3253, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 7377, 'wine' : 0, 'marble' : 3831, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 8542, 'wine' : 0, 'marble' : 4500, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 9870, 'wine' : 0, 'marble' : 5279, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 11385, 'wine' : 0, 'marble' : 6180, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 13111, 'wine' : 0, 'marble' : 7226, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 15078, 'wine' : 0, 'marble' : 8439, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 17321, 'wine' : 0, 'marble' : 9847, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 19481, 'wine' : 0, 'marble' : 11477, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 22796, 'wine' : 0, 'marble' : 13373, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 26119, 'wine' : 0, 'marble' : 15570, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 29909, 'wine' : 0, 'marble' : 18118, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 34228, 'wine' : 0, 'marble' : 21074, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 39153, 'wine' : 0, 'marble' : 24503, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 44766, 'wine' : 0, 'marble' : 28481, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 51166, 'wine' : 0, 'marble' : 33095, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 58462, 'wine' : 0, 'marble' : 38447, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 66778, 'wine' : 0, 'marble' : 44656, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// forester, wood, marble
		"forester" : [
			{ 'wood' : 430, 'wine' : 0, 'marble' : 104, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 664, 'wine' : 0, 'marble' : 237, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 968, 'wine' : 0, 'marble' : 410, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 1364, 'wine' : 0, 'marble' : 635, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 1878, 'wine' : 0, 'marble' : 928, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 2546, 'wine' : 0, 'marble' : 1309, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 3415, 'wine' : 0, 'marble' : 1803, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 4544, 'wine' : 0, 'marble' : 2446, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 6013, 'wine' : 0, 'marble' : 3282, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 7922, 'wine' : 0, 'marble' : 4368, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 10403, 'wine' : 0, 'marble' : 5781, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 13629, 'wine' : 0, 'marble' : 7617, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 17823, 'wine' : 0, 'marble' : 10422, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 23274, 'wine' : 0, 'marble' : 13108, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 30362, 'wine' : 0, 'marble' : 17142, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 39574, 'wine' : 0, 'marble' : 22386, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 51552, 'wine' : 0, 'marble' : 29204, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 67123, 'wine' : 0, 'marble' : 38068, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 87363, 'wine' : 0, 'marble' : 49589, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 113680, 'wine' : 0, 'marble' : 64569, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 147889, 'wine' : 0, 'marble' : 84041, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 192360, 'wine' : 0, 'marble' : 109337, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 250173, 'wine' : 0, 'marble' : 142266, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 325258, 'wine' : 0, 'marble' : 185046, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 423034, 'wine' : 0, 'marble' : 240663, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 550049, 'wine' : 0, 'marble' : 312965, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 715169, 'wine' : 0, 'marble' : 406956, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 929826, 'wine' : 0, 'marble' : 529144, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 1208878, 'wine' : 0, 'marble' : 687989, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 1571647, 'wine' : 0, 'marble' : 894489, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 2043246, 'wine' : 0, 'marble' : 1162937, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// optician, wood, marble
		"optician" : [
			{ 'wood' : 188, 'wine' : 0, 'marble' : 35, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 269, 'wine' : 0, 'marble' : 96, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 362, 'wine' : 0, 'marble' : 167, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 471, 'wine' : 0, 'marble' : 249, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 597, 'wine' : 0, 'marble' : 345, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 742, 'wine' : 0, 'marble' : 455, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 912, 'wine' : 0, 'marble' : 584, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 1108, 'wine' : 0, 'marble' : 733, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 1335, 'wine' : 0, 'marble' : 905, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 1600, 'wine' : 0, 'marble' : 1106, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 1906, 'wine' : 0, 'marble' : 1338, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 2261, 'wine' : 0, 'marble' : 1608, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 2673, 'wine' : 0, 'marble' : 1921, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 3152, 'wine' : 0, 'marble' : 2283, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 3706, 'wine' : 0, 'marble' : 2704, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 4348, 'wine' : 0, 'marble' : 3191, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 5096, 'wine' : 0, 'marble' : 3759, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 5962, 'wine' : 0, 'marble' : 4416, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 6966, 'wine' : 0, 'marble' : 5178, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 8131, 'wine' : 0, 'marble' : 6062, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 9482, 'wine' : 0, 'marble' : 7087, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 11050, 'wine' : 0, 'marble' : 8276, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 12868, 'wine' : 0, 'marble' : 9656, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 14978, 'wine' : 0, 'marble' : 11257, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 17424, 'wine' : 0, 'marble' : 13113, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 20262, 'wine' : 0, 'marble' : 15267, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 23553, 'wine' : 0, 'marble' : 17762, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 27373, 'wine' : 0, 'marble' : 20662, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 31804, 'wine' : 0, 'marble' : 24024, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 36943, 'wine' : 0, 'marble' : 27922, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 42904, 'wine' : 0, 'marble' : 32447, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// barracks, wood, marble,
		"barracks" : [
			{ 'wood' : 114, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 195, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 296, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 420, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 574, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 766, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1003, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 1297, 'wine' : 0, 'marble' : 178, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 1662, 'wine' : 0, 'marble' : 431, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 2115, 'wine' : 0, 'marble' : 745, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 2676, 'wine' : 0, 'marble' : 1134, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 3371, 'wine' : 0, 'marble' : 1616, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 4234, 'wine' : 0, 'marble' : 2214, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 5304, 'wine' : 0, 'marble' : 2956, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 6630, 'wine' : 0, 'marble' : 3875, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 8275, 'wine' : 0, 'marble' : 5015, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 10314, 'wine' : 0, 'marble' : 6429, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 12843, 'wine' : 0, 'marble' : 8183, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 15979, 'wine' : 0, 'marble' : 10357, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 19868, 'wine' : 0, 'marble' : 13052, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 24690, 'wine' : 0, 'marble' : 16395, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 30669, 'wine' : 0, 'marble' : 20540, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 38083, 'wine' : 0, 'marble' : 25680, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 47277, 'wine' : 0, 'marble' : 32054, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 58676, 'wine' : 0, 'marble' : 39957, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 72812, 'wine' : 0, 'marble' : 49757, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 90341, 'wine' : 0, 'marble' : 61909, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 112076, 'wine' : 0, 'marble' : 76977, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 139028, 'wine' : 0, 'marble' : 95661, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 172448, 'wine' : 0, 'marble' : 118830, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 213889, 'wine' : 0, 'marble' : 147560, 'crystal' : 0, 'sulfur' : 0}, // level 32
			{ 'wood' : 265276, 'wine' : 0, 'marble' : 183185, 'crystal' : 0, 'sulfur' : 0}, // level 33
			{ 'wood' : 328996, 'wine' : 0, 'marble' : 227359, 'crystal' : 0, 'sulfur' : 0}, // level 34
			{ 'wood' : 408008, 'wine' : 0, 'marble' : 282136, 'crystal' : 0, 'sulfur' : 0}, // level 35
			{ 'wood' : 505984, 'wine' : 0, 'marble' : 350059, 'crystal' : 0, 'sulfur' : 0}, // level 36
			{ 'wood' : 627473, 'wine' : 0, 'marble' : 434282, 'crystal' : 0, 'sulfur' : 0}, // level 37
			{ 'wood' : 778119, 'wine' : 0, 'marble' : 538720, 'crystal' : 0, 'sulfur' : 0}, // level 38
			{ 'wood' : 964922, 'wine' : 0, 'marble' : 668222, 'crystal' : 0, 'sulfur' : 0}, // level 39
			{ 'wood' : 1196557, 'wine' : 0, 'marble' : 828807, 'crystal' : 0, 'sulfur' : 0}, // level 40
			{ 'wood' : 1483783, 'wine' : 0, 'marble' : 1027931, 'crystal' : 0, 'sulfur' : 0}, // level 41
			{ 'wood' : 1839946, 'wine' : 0, 'marble' : 1274846, 'crystal' : 0, 'sulfur' : 0}, // level 42
			{ 'wood' : 2281587, 'wine' : 0, 'marble' : 1581018, 'crystal' : 0, 'sulfur' : 0}, // level 43
			{ 'wood' : 2829222, 'wine' : 0, 'marble' : 2122555, 'crystal' : 0, 'sulfur' : 0}, // level 44
			{ 'wood' : 3508289, 'wine' : 0, 'marble' : 2431446, 'crystal' : 0, 'sulfur' : 0}, // level 45
			{ 'wood' : 4350331, 'wine' : 0, 'marble' : 3015203, 'crystal' : 0, 'sulfur' : 0}, // level 46
			{ 'wood' : 5394464, 'wine' : 0, 'marble' : 3739063, 'crystal' : 0, 'sulfur' : 0}, // level 47
			{ 'wood' : 6689190, 'wine' : 0, 'marble' : 4636648, 'crystal' : 0, 'sulfur' : 0}, // level 48
			{ 'wood' : 8294650, 'wine' : 0, 'marble' : 5749655, 'crystal' : 0, 'sulfur' : 0}, // level 49
			{ 'wood' : 10285420, 'wine' : 0, 'marble' : 7129783, 'crystal' : 0, 'sulfur' : 0}, // level 50
		],

		// carpentering, wood, marble
		"carpentering" : [
			{ 'wood' : 122, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 191, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 274, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 372, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 486, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 620, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 777, 'wine' : 0, 'marble' : 359, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 962, 'wine' : 0, 'marble' : 444, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 1178, 'wine' : 0, 'marble' : 546, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 1432, 'wine' : 0, 'marble' : 669, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 1730, 'wine' : 0, 'marble' : 816, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 2078, 'wine' : 0, 'marble' : 993, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 2486, 'wine' : 0, 'marble' : 1205, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 2964, 'wine' : 0, 'marble' : 1459, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 3524, 'wine' : 0, 'marble' : 1765, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 4178, 'wine' : 0, 'marble' : 2131, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 4945, 'wine' : 0, 'marble' : 2571, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 5841, 'wine' : 0, 'marble' : 3097, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 6890, 'wine' : 0, 'marble' : 3731, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 8117, 'wine' : 0, 'marble' : 4490, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 9550, 'wine' : 0, 'marble' : 5402, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 11229, 'wine' : 0, 'marble' : 6496, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 13190, 'wine' : 0, 'marble' : 7809, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 15484, 'wine' : 0, 'marble' : 9383, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 18167, 'wine' : 0, 'marble' : 11273, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 21299, 'wine' : 0, 'marble' : 13543, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 24946, 'wine' : 0, 'marble' : 16263, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 29245, 'wine' : 0, 'marble' : 19531, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 34247, 'wine' : 0, 'marble' : 23450, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 40096, 'wine' : 0, 'marble' : 28154, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 46930, 'wine' : 0, 'marble' : 33798, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// embassy, wood, marble
		"embassy" : [
			{ 'wood' : 415, 'wine' : 0, 'marble' : 342, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 623, 'wine' : 0, 'marble' : 571, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 873, 'wine' : 0, 'marble' : 850, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 1173, 'wine' : 0, 'marble' : 1190, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 1532, 'wine' : 0, 'marble' : 1606, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 1964, 'wine' : 0, 'marble' : 2112, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 2482, 'wine' : 0, 'marble' : 2730, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 3103, 'wine' : 0, 'marble' : 3484, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 3849, 'wine' : 0, 'marble' : 4404, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 4743, 'wine' : 0, 'marble' : 5527, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 5817, 'wine' : 0, 'marble' : 6896, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 7105, 'wine' : 0, 'marble' : 8566, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 8651, 'wine' : 0, 'marble' : 10604, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 10507, 'wine' : 0, 'marble' : 13090, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 12733, 'wine' : 0, 'marble' : 16123, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 15610, 'wine' : 0, 'marble' : 19824, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 18498, 'wine' : 0, 'marble' : 24339, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 22457, 'wine' : 0, 'marble' : 29846, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 27074, 'wine' : 0, 'marble' : 36564, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 32290, 'wine' : 0, 'marble' : 45216, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 39261, 'wine' : 0, 'marble' : 54769, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 47240, 'wine' : 0, 'marble' : 66733, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 56812, 'wine' : 0, 'marble' : 81859, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 70157, 'wine' : 0, 'marble' : 104537, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 84318, 'wine' : 0, 'marble' : 129580, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 101310, 'wine' : 0, 'marble' : 158759, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 121979, 'wine' : 0, 'marble' : 193849, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 146503, 'wine' : 0, 'marble' : 236659, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 175932, 'wine' : 0, 'marble' : 288888, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 222202, 'wine' : 0, 'marble' : 358869, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 266778, 'wine' : 0, 'marble' : 437985, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// stonemason, wood, marble
		"stonemason" : [
			{ 'wood' : 467, 'wine' : 0, 'marble' : 116, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 718, 'wine' : 0, 'marble' : 255, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 1045, 'wine' : 0, 'marble' : 436, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 1469, 'wine' : 0, 'marble' : 671, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 2021, 'wine' : 0, 'marble' : 977, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 2738, 'wine' : 0, 'marble' : 1375, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 3671, 'wine' : 0, 'marble' : 1892, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 4883, 'wine' : 0, 'marble' : 2564, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 6459, 'wine' : 0, 'marble' : 3437, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 8508, 'wine' : 0, 'marble' : 4572, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 11172, 'wine' : 0, 'marble' : 6049, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 14634, 'wine' : 0, 'marble' : 7968, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 19135, 'wine' : 0, 'marble' : 10462, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 24987, 'wine' : 0, 'marble' : 13705, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 32594, 'wine' : 0, 'marble' : 17921, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 42483, 'wine' : 0, 'marble' : 23402, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 55339, 'wine' : 0, 'marble' : 30527, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 72050, 'wine' : 0, 'marble' : 39790, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 93778, 'wine' : 0, 'marble' : 51830, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 122021, 'wine' : 0, 'marble' : 67485, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 158740, 'wine' : 0, 'marble' : 87835, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 206471, 'wine' : 0, 'marble' : 114290, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 268524, 'wine' : 0, 'marble' : 148680, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 349194, 'wine' : 0, 'marble' : 193389, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 454063, 'wine' : 0, 'marble' : 251512, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 590393, 'wine' : 0, 'marble' : 327069, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 767620, 'wine' : 0, 'marble' : 425294, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 998018, 'wine' : 0, 'marble' : 552986, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 1297536, 'wine' : 0, 'marble' : 718988, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 1686906, 'wine' : 0, 'marble' : 934789, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 2193089, 'wine' : 0, 'marble' : 1215330, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// fireworker, wood, marble
		"fireworker" : [
			{ 'wood' : 353, 'wine' : 0, 'marble' : 212, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 445, 'wine' : 0, 'marble' : 302, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 551, 'wine' : 0, 'marble' : 405, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 673, 'wine' : 0, 'marble' : 526, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 813, 'wine' : 0, 'marble' : 665, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 974, 'wine' : 0, 'marble' : 827, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1159, 'wine' : 0, 'marble' : 1015, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 1373, 'wine' : 0, 'marble' : 1233, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 1618, 'wine' : 0, 'marble' : 1486, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 1899, 'wine' : 0, 'marble' : 1779, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 2223, 'wine' : 0, 'marble' : 2120, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 2596, 'wine' : 0, 'marble' : 2514, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 3025, 'wine' : 0, 'marble' : 2972, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 3517, 'wine' : 0, 'marble' : 3503, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 4084, 'wine' : 0, 'marble' : 4119, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 4736, 'wine' : 0, 'marble' : 4834, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 5485, 'wine' : 0, 'marble' : 5662, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 6346, 'wine' : 0, 'marble' : 6623, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 7338, 'wine' : 0, 'marble' : 7738, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 8478, 'wine' : 0, 'marble' : 9032, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 9790, 'wine' : 0, 'marble' : 10534, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 11297, 'wine' : 0, 'marble' : 12275, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 13030, 'wine' : 0, 'marble' : 13355, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 14990, 'wine' : 0, 'marble' : 16636, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 17317, 'wine' : 0, 'marble' : 19354, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 19954, 'wine' : 0, 'marble' : 22507, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 22986, 'wine' : 0, 'marble' : 26163, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 26472, 'wine' : 0, 'marble' : 30404, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 30484, 'wine' : 0, 'marble' : 35325, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 35096, 'wine' : 0, 'marble' : 41033, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 40398, 'wine' : 0, 'marble' : 47652, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// winegrower, wood, marble
		"winegrower" : [
			{ 'wood' : 467, 'wine' : 0, 'marble' : 116, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 718, 'wine' : 0, 'marble' : 255, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 1045, 'wine' : 0, 'marble' : 436, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 1469, 'wine' : 0, 'marble' : 671, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 2021, 'wine' : 0, 'marble' : 977, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 2738, 'wine' : 0, 'marble' : 1375, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 3671, 'wine' : 0, 'marble' : 1892, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 4883, 'wine' : 0, 'marble' : 2564, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 6459, 'wine' : 0, 'marble' : 3437, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 8508, 'wine' : 0, 'marble' : 4572, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 11172, 'wine' : 0, 'marble' : 6049, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 14634, 'wine' : 0, 'marble' : 7968, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 19135, 'wine' : 0, 'marble' : 10462, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 24987, 'wine' : 0, 'marble' : 13705, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 32594, 'wine' : 0, 'marble' : 17921, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 42483, 'wine' : 0, 'marble' : 23402, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 55339, 'wine' : 0, 'marble' : 30527, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 72050, 'wine' : 0, 'marble' : 39790, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 93778, 'wine' : 0, 'marble' : 51830, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 122021, 'wine' : 0, 'marble' : 67485, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 158740, 'wine' : 0, 'marble' : 87835, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 206471, 'wine' : 0, 'marble' : 114290, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 268524, 'wine' : 0, 'marble' : 148680, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 349194, 'wine' : 0, 'marble' : 193389, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 454063, 'wine' : 0, 'marble' : 251512, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 590392, 'wine' : 0, 'marble' : 520887, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 767620, 'wine' : 0, 'marble' : 425294, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 998018, 'wine' : 0, 'marble' : 552986, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 1297536, 'wine' : 0, 'marble' : 718988, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 1686906, 'wine' : 0, 'marble' : 934789, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 2193089, 'wine' : 0, 'marble' : 1215330, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// vineyard, wood, marble
		"vineyard" : [
			{ 'wood' : 423, 'wine' : 0, 'marble' : 198, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 520, 'wine' : 0, 'marble' : 285, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 631, 'wine' : 0, 'marble' : 387, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 758, 'wine' : 0, 'marble' : 504, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 905, 'wine' : 0, 'marble' : 640, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 1074, 'wine' : 0, 'marble' : 798, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1269, 'wine' : 0, 'marble' : 981, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 1492, 'wine' : 0, 'marble' : 1194, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 1749, 'wine' : 0, 'marble' : 1440, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 2045, 'wine' : 0, 'marble' : 1726, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 2384, 'wine' : 0, 'marble' : 2058, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 2775, 'wine' : 0, 'marble' : 2443, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 3225, 'wine' : 0, 'marble' : 2889, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 3741, 'wine' : 0, 'marble' : 3407, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 4336, 'wine' : 0, 'marble' : 4008, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 5019, 'wine' : 0, 'marble' : 4705, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 5813, 'wine' : 0, 'marble' : 5513, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 6875, 'wine' : 0, 'marble' : 6450, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 7941, 'wine' : 0, 'marble' : 7537, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 8944, 'wine' : 0, 'marble' : 8800, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 10319, 'wine' : 0, 'marble' : 10263, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 11900, 'wine' : 0, 'marble' : 11961, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 13718, 'wine' : 0, 'marble' : 13930, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 15809, 'wine' : 0, 'marble' : 16214, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 18215, 'wine' : 0, 'marble' : 18864, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 20978, 'wine' : 0, 'marble' : 21938, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 24159, 'wine' : 0, 'marble' : 25503, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 27816, 'wine' : 0, 'marble' : 29639, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 32021, 'wine' : 0, 'marble' : 34437, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 36857, 'wine' : 0, 'marble' : 40002, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 42419, 'wine' : 0, 'marble' : 46457, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],

		// tavern, wood, marble, missing lvl 48
		"tavern" : [
			{ 'wood' : 222, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 367, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 541, 'wine' : 0, 'marble' : 94, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 750, 'wine' : 0, 'marble' : 122, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 1001, 'wine' : 0, 'marble' : 158, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 1302, 'wine' : 0, 'marble' : 206, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 1663, 'wine' : 0, 'marble' : 267, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 2097, 'wine' : 0, 'marble' : 348, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 2617, 'wine' : 0, 'marble' : 452, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 3241, 'wine' : 0, 'marble' : 587, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 3990, 'wine' : 0, 'marble' : 764, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 4888, 'wine' : 0, 'marble' : 993, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 5967, 'wine' : 0, 'marble' : 1290, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 7261, 'wine' : 0, 'marble' : 1677, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 8814, 'wine' : 0, 'marble' : 2181, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 10678, 'wine' : 0, 'marble' : 2835, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 12914, 'wine' : 0, 'marble' : 3685, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 15598, 'wine' : 0, 'marble' : 4791, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 18818, 'wine' : 0, 'marble' : 6228, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 22683, 'wine' : 0, 'marble' : 8097, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 27320, 'wine' : 0, 'marble' : 10526, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 32885, 'wine' : 0, 'marble' : 13684, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 39562, 'wine' : 0, 'marble' : 17789, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 47576, 'wine' : 0, 'marble' : 23125, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 57192, 'wine' : 0, 'marble' : 30063, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 68731, 'wine' : 0, 'marble' : 39082, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 82578, 'wine' : 0, 'marble' : 50806, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 99194, 'wine' : 0, 'marble' : 66048, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 119134, 'wine' : 0, 'marble' : 85862, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 143061, 'wine' : 0, 'marble' : 111621, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 171774, 'wine' : 0, 'marble' : 145107, 'crystal' : 0, 'sulfur' : 0}, // level 32
			{ 'wood' : 206230, 'wine' : 0, 'marble' : 188640, 'crystal' : 0, 'sulfur' : 0}, // level 33
			{ 'wood' : 247577, 'wine' : 0, 'marble' : 245232, 'crystal' : 0, 'sulfur' : 0}, // level 34
			{ 'wood' : 297193, 'wine' : 0, 'marble' : 318801, 'crystal' : 0, 'sulfur' : 0}, // level 35
			{ 'wood' : 356732, 'wine' : 0, 'marble' : 414441, 'crystal' : 0, 'sulfur' : 0}, // level 36
			{ 'wood' : 428179, 'wine' : 0, 'marble' : 538774, 'crystal' : 0, 'sulfur' : 0}, // level 37
			{ 'wood' : 513916, 'wine' : 0, 'marble' : 700406, 'crystal' : 0, 'sulfur' : 0}, // level 38
			{ 'wood' : 616800, 'wine' : 0, 'marble' : 910528, 'crystal' : 0, 'sulfur' : 0}, // level 39
			{ 'wood' : 740261, 'wine' : 0, 'marble' : 1183686, 'crystal' : 0, 'sulfur' : 0}, // level 40
			{ 'wood' : 88413, 'wine' : 0, 'marble' : 1538791, 'crystal' : 0, 'sulfur' : 0}, // level 41
			{ 'wood' : 1066197, 'wine' : 0, 'marble' : 2000428, 'crystal' : 0, 'sulfur' : 0}, // level 42
			{ 'wood' : 1279538, 'wine' : 0, 'marble' : 2600558, 'crystal' : 0, 'sulfur' : 0}, // level 43
			{ 'wood' : 1535545, 'wine' : 0, 'marble' : 3380726, 'crystal' : 0, 'sulfur' : 0}, // level 44
			{ 'wood' : 1842756, 'wine' : 0, 'marble' : 4394943, 'crystal' : 0, 'sulfur' : 0}, // level 45
			{ 'wood' : 2211407, 'wine' : 0, 'marble' : 5713425, 'crystal' : 0, 'sulfur' : 0}, // level 46
			{ 'wood' : 2653789, 'wine' : 0, 'marble' : 7427454, 'crystal' : 0, 'sulfur' : 0}, // level 47
			{ 'wood' : 0, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 48
		],

		// alchemist, wood, marble
		"alchemist" : [
			{ 'wood' : 467, 'wine' : 0, 'marble' : 116, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 718, 'wine' : 0, 'marble' : 255, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 1045, 'wine' : 0, 'marble' : 436, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 1469, 'wine' : 0, 'marble' : 671, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 2021, 'wine' : 0, 'marble' : 977, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 2738, 'wine' : 0, 'marble' : 1375, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 3671, 'wine' : 0, 'marble' : 1892, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 4883, 'wine' : 0, 'marble' : 2564, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 6459, 'wine' : 0, 'marble' : 3437, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 8508, 'wine' : 0, 'marble' : 4572, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 11172, 'wine' : 0, 'marble' : 6049, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 14634, 'wine' : 0, 'marble' : 7968, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 19135, 'wine' : 0, 'marble' : 10462, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 24987, 'wine' : 0, 'marble' : 13705, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 32594, 'wine' : 0, 'marble' : 17921, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 42483, 'wine' : 0, 'marble' : 23402, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 55339, 'wine' : 0, 'marble' : 30527, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 72050, 'wine' : 0, 'marble' : 39790, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 93778, 'wine' : 0, 'marble' : 51830, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 122021, 'wine' : 0, 'marble' : 67485, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 158740, 'wine' : 0, 'marble' : 87835, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 206471, 'wine' : 0, 'marble' : 114289, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 268524, 'wine' : 0, 'marble' : 148680, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 349194, 'wine' : 0, 'marble' : 193389, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 454063, 'wine' : 0, 'marble' : 251512, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 590392, 'wine' : 0, 'marble' : 327069, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 767620, 'wine' : 0, 'marble' : 425294, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 998018, 'wine' : 0, 'marble' : 55298, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 1297536, 'wine' : 0, 'marble' : 718988, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 1686906, 'wine' : 0, 'marble' : 934789, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 2193089, 'wine' : 0, 'marble' : 1215330, 'crystal' : 0, 'sulfur' : 0}, // level 32
		],
		
		// branchOffice, 
		"branchOffice" : [
			{ 'wood' : 173, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 2
			{ 'wood' : 346, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 3
			{ 'wood' : 581, 'wine' : 0, 'marble' : 0, 'crystal' : 0, 'sulfur' : 0}, // level 4
			{ 'wood' : 896, 'wine' : 0, 'marble' : 540, 'crystal' : 0, 'sulfur' : 0}, // level 5
			{ 'wood' : 1314, 'wine' : 0, 'marble' : 792, 'crystal' : 0, 'sulfur' : 0}, // level 6
			{ 'wood' : 1863, 'wine' : 0, 'marble' : 1123, 'crystal' : 0, 'sulfur' : 0}, // level 7
			{ 'wood' : 2580, 'wine' : 0, 'marble' : 1555, 'crystal' : 0, 'sulfur' : 0}, // level 8
			{ 'wood' : 3509, 'wine' : 0, 'marble' : 2115, 'crystal' : 0, 'sulfur' : 0}, // level 9
			{ 'wood' : 4706, 'wine' : 0, 'marble' : 2837, 'crystal' : 0, 'sulfur' : 0}, // level 10
			{ 'wood' : 6241, 'wine' : 0, 'marble' : 3762, 'crystal' : 0, 'sulfur' : 0}, // level 11
			{ 'wood' : 8203, 'wine' : 0, 'marble' : 4945, 'crystal' : 0, 'sulfur' : 0}, // level 12
			{ 'wood' : 10699, 'wine' : 0, 'marble' : 6450, 'crystal' : 0, 'sulfur' : 0}, // level 13
			{ 'wood' : 13866, 'wine' : 0, 'marble' : 8359, 'crystal' : 0, 'sulfur' : 0}, // level 14
			{ 'wood' : 17872, 'wine' : 0, 'marble' : 10774, 'crystal' : 0, 'sulfur' : 0}, // level 15
			{ 'wood' : 22926, 'wine' : 0, 'marble' : 13820, 'crystal' : 0, 'sulfur' : 0}, // level 16
			{ 'wood' : 29286, 'wine' : 0, 'marble' : 17654, 'crystal' : 0, 'sulfur' : 0}, // level 17
			{ 'wood' : 37272, 'wine' : 0, 'marble' : 22469, 'crystal' : 0, 'sulfur' : 0}, // level 18
			{ 'wood' : 47283, 'wine' : 0, 'marble' : 28503, 'crystal' : 0, 'sulfur' : 0}, // level 19
			{ 'wood' : 59806, 'wine' : 0, 'marble' : 36051, 'crystal' : 0, 'sulfur' : 0}, // level 20
			{ 'wood' : 75446, 'wine' : 0, 'marble' : 45481, 'crystal' : 0, 'sulfur' : 0}, // level 21
			{ 'wood' : 94954, 'wine' : 0, 'marble' : 57240, 'crystal' : 0, 'sulfur' : 0}, // level 22
			{ 'wood' : 119245, 'wine' : 0, 'marble' : 71883, 'crystal' : 0, 'sulfur' : 0}, // level 23
			{ 'wood' : 149453, 'wine' : 0, 'marble' : 90092, 'crystal' : 0, 'sulfur' : 0}, // level 24
			{ 'wood' : 186977, 'wine' : 0, 'marble' : 112712, 'crystal' : 0, 'sulfur' : 0}, // level 25
			{ 'wood' : 233530, 'wine' : 0, 'marble' : 121067, 'crystal' : 0, 'sulfur' : 0}, // level 26
			{ 'wood' : 291225, 'wine' : 0, 'marble' : 175556, 'crystal' : 0, 'sulfur' : 0}, // level 27
			{ 'wood' : 362658, 'wine' : 0, 'marble' : 218617, 'crystal' : 0, 'sulfur' : 0}, // level 28
			{ 'wood' : 451015, 'wine' : 0, 'marble' : 271878, 'crystal' : 0, 'sulfur' : 0}, // level 29
			{ 'wood' : 560208, 'wine' : 0, 'marble' : 337705, 'crystal' : 0, 'sulfur' : 0}, // level 30
			{ 'wood' : 695038, 'wine' : 0, 'marble' : 418983, 'crystal' : 0, 'sulfur' : 0}, // level 31
			{ 'wood' : 861391, 'wine' : 0, 'marble' : 519260, 'crystal' : 0, 'sulfur' : 0}, // level 32
		]
	};
}