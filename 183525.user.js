// ==UserScript==
// @name           Ikariam Upgrade Watcher 2
// @version        2.7.0
// @namespace      ikariam
// @description    Attaches a simple icon on each building which show level and if upgradeable
// @author         Apollo ヅ
// @downloadURL    https://userscripts.org/scripts/source/132499.user.js
// @updateURL      https://userscripts.org/scripts/source/132499.meta.js
// @include        http://s*.ikariam.gameforge.com/*action=loginAvatar&*
// @include        http://s*.ikariam.gameforge.com/*view=city&*
// @include        http://s*.ikariam.gameforge.com/*&function=changeCurrentCity&*
//
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
//
// @require        http://code.jquery.com/jquery-2.0.3.min.js
//
// ==/UserScript==

// Version Log:
//		v2.7.0 (nov 18, 2013)
//			- Fix include.
//		v2.6.0 (oct 21, 2013)
//			- Add black market (Thx Valkazaar).
//			- Fix building costs errors (thx mrkokaney).
//			- Fix host detection bug (Thx Scavenger) and icon hide bug.
//		v2.5.3 (sept 12, 2013) new gameforge servers
//		v2.5.2 (aug 23, 2013) Regression fix: city change
//		v2.5.1 (aug 23, 2013)
//			- Fix: undeclared variable bug (thanks Qmegas)
//			- A lot of code cleanup
//			- GreaseKit support dropped. Please use TamperMonkey.
//		v2.5 (mrkokaney, aug 12, 2013)
//			- massive costs updates
//			- tables are now easier to be modified (maybe for future updates) as resources and levels are clearly seperated
//			- comments over the tables with building names and resources needed for the upgrades were modified
//			- jQuery upgrade
//		v2.4 (déc 17, 2012)		New building Pirate Fortress
//		v2.3.1 (déc 17, 2012)	Fix : Hanged when reloading the view before spirit was researched.
//		v2.3 (déc 16, 2012)		Fix : icon on position 16 can be hovered again.
//		v2.2 (déc 15, 2012)		Fix : building updates when changing from enemy to own city and vice-versa.
//		v2.1 (sept 10, 2012)
//			- Fix : reduction buildings detected even when they are in construction.
//			- Fix : CSS issue with firefox 15, the tooltip appeared as if it had no background.
//		v2.0.6 (july 31, 2012)	Fix : the port appeared not-upgradeable when busy.
//		v2.0.5 (june 24, 2012)
//			- massive update of the costs, thanks to Woeka and ManicMiner.
//			- Fix: detection of construction site (the GF changed it...)
//			- jQuery is now used in noConflict mode, to allow the use of multiple scripts in Chrome/Tampermonkey
//		v2.0.4 (may 25, 2012)
//			- right alignment of numbers, minor corrections on optician costs for levels 28-32
//			- palace constructionSite bugfix
//		v2.0.3 (may 9, 2012)	display gray icons in cities that are not your own.
//		v2.0.2 (may 5, 2012)
//			- Fix : displays also on the first city view after you login !
//			- Fix : proper display for small buildings using only wood.
//		v2.0.1 (may 5, 2012)	Thousands separator
//		v2.0.0 (may 5, 2012)
//			- New author :)
//			- Upgrade for ikariam v0.5.0
//			- Removed ajax use to find research levels : No network activity whatsoever.
//			- Removed support for older ikariam versions.
//			- show info box is not an option anymore (maybe back later... no time now)
//			- Uses jQuery (much easier...)
//------------------------------------------------------------------------------------------------------------------------------
//		Updates by michalis :
//		v1.4.2 (20. February 2011)	Added Support for museum with costs till level 21. 
//		v1.4.1 (16. September 2010)	Added Support for the new dump building with costs till level 40 and fix the problem with info box. 
//------------------------------------------------------------------------------------------------------------------------------
//		Original author Anh Tuan Nguyen Dao :
//		v1.3.2 (26. October 2009)	Fixed icon and tooltip positioning for temple (thanks to Lordshinjo "http://userscripts.org/users/114555" for pointing out the problem).
//		v1.3.1 (16. October 2009)
//			- Fixed the building cost calculation has been revised in Ikariam version 0.32 which I did not know, so the calculation are all wrong. This is now fixed (thanks to RandomMan "http://userscripts.org/users/91016" for pointing out the problem).
//			- Fixed a bug with dot-notation problem for servers which uses such notation (thanks to malus "http://userscripts.org/users/109688" for posting the bug).
//			- For servers which are still at version 0.31, the "old" building cost calculation is still supported.
//		v1.3.0 (15. October 2009)
//			- Building cost database updated.
//			- Images are now linked in place.
//			- Ready for Ikariam version 0.32.
//			- Fixed a bug where the info box is not positioning correctly on palace or residence construction spot.
//			- Fixed a bug for servers which use dot-notation as thousand seperator in stead of comma (thanks to Carpediem "http://userscripts.org/users/100184" for pointing out the bug).
//		v1.2.2 (27. June 2009)	Now supporting CreaseKit and Fluid (thanks to Kahil Young "http://userscripts.org/users/69426" for the suggestion and testing the mod in Fluid).
//		v1.2.1 (8. June 2009)
//			- Fixed a bug which caused no resource reduction when a reduction building is being upgrade.
//			- Improved positioning of the icons. Icon and info box at construction spot are now correctly positioned.
//		v1.2.0 (2. June 2009)	New: Added icon and info box to construction spot (thanks to giangkid "http://userscripts.org/users/86129" for the suggestion).
//		v1.1.1 (26. May 2009)	Fixed a bug when NOT using Black Canvas add-on to Firefox, the level indication is not centralized correctly.
//		v1.1.0 (25. May 2009)
//			- New: Added a info box which shows up when mouse over the icon, the box can be turned off in the options page.
//			- Fixed a bug where in a rare case, an icon is not shown on the wall.
//			- Fixed a bug which caused no sulfur reduction bonus.
//		v1.0.3 (17. May 2009)	Fixed first time running check which caused unnecessarily research checks.
//		v1.0.2 (17. May 2009)
//			- Fixed the parsing of the building level correctly for different languages (thanks to oliezekat "http://userscripts.org/users/78627").
//			- Improved bureaucracy-spot check.
//		v1.0.1 (17. May 2009)
//			- Fixed bureaucracy-spot, not showing if you are not done with that research.
//			- Removed alert boxes which shows up at the start.
//		v1.0.0 (16. May 2009)	Release.

/* jshint multistr: true, newcap: false, curly: false, forin: false, jquery: true */
/* globals GM_addStyle, GM_getValue, GM_setValue, unsafeWindow, console */
var imgYes		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVHjatJbdK0NhHMd/Oy5ES5oUF/I2skySaBx5acWNXCrhwkuGC+IPIS4w5Qopl3JDLbOMFZLQxAy5mPKStJQL5vddz7RwZrPjV989ned0Pt+z55zn9z2aQCBAESqVVcYqYWlZWWL+huVnHbEOWE9KAI2CQQqrhSXP7y5IGx47Pb48kvvWHTxpyDCQLllHDfp66qzoeOcpJ2uF9RyNQTHLMrE5mTi1NU1vgbdI/5ASNAk0WDNAw3VDr3xoZZ1EMjA7Lhyti/tLZDuzUSxlLjRTe3kb1ebXLvOh7SeDUlZ/43ST5H24pL9UXlourQ+sYclmWIeYk8IeZlf3Uu+f4ShcCwZYgvlp0DxmH0/i5aF4CwywwAwZ6PC2WJ2zpFYJlgw2DCpntq3Sb29LLAUWmGDjx+D0Okntcl25MBTBICOeB6tU53ceDJkw0GKXql2CqZXonwsGfvQVtUsw/TC4xQ5UuwrS9Rh8MHDLebLqBqYcE4ZTGOz1V1ve0RXVKrDABBsG9+jnFrlPNQPBwua6D71Fq6P1I6/cauOGgwEWmOHNDpE3h34ezwPHtWCAFYrRb4HDQRMMnFg7K+4ccA4excAJD54ebrmJ6IrRRCbWXCzLXChofgv9VBH6VeGhf+w7Dp40Zhq/hv6OCP2naL8qlD5bssX8dbSfLR8CDACURMy5Nc8LLAAAAABJRU5ErkJggg==";
var imgWait		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH/SURBVHjatJbNSwJRFMWvg2DCGFKEComLCLIPMqIiWlW7qCSIiDYRLfof2rduGS0k2lS0CSvaVauQqEjpwyCCwkDDCkmhhNDuGd6EfahjTheOMG+c35l5b+aeZ8hms1SgrKw2VgtLZjnFeISVYp2xTlmJfABDHoNK1jCrx7/3JB2GkpRIvtNN5E05WeesIKvFSF2tFvL2VWd46IC1yXrRYtDEmln2P5hWtuOUyRR8QpIkA00M1tCk15bmw0XWRSGD/qPz5NjW/jMFgi9USnV7Kmmot4o6mi3rfLirjhtz/tPKGl1YjVIklqZSCzd0z9d1zFlG+fCRFVKeMGcxp2bnb6W/wNXCtWCAJZifBoNLGw9mnh4qt8AAC0zVoApvy9pOnPQqweoBGwadPCAVe1tKKbDABBs/7pPLFOldwbDCbICB/b6Mhc1Xd1GF6YCBjK9U7xJMWaJ/Lhik0Ff0LsFMwSBWazfpbuByKMwoDMLtjbLuBh63wryCwfH4QE0GXVG3eWcWmGBLojEd8IBuBoKFjHhU36LtqRFbmltt2XAwwAIzt9kh8nzo584yFhzXggGWGqM/Aof7uhI4pXZW3DngHDxfAue3yETwTHPLNaEraolMzLmYFp8aNMVC3ypCvzs39K/vXpWT9S7z99APiNBPaN1V5Nu2uNRepnXb8iHAALTTzrv1a76ZAAAAAElFTkSuQmCC";
var imgNo		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH6SURBVHjatJa7S8NgFMVvo7UGiq9JBxGnWkTEwYoPXFzFRelc6VDp0H/A2X9B7FDoXHQRVxfxgQ8QEalOUhx0EFu10NZq6jkxkfpIjTZeOP1ISn43373kns9VqVSkRrRBQ9AA5IW6jftXUB46hY6hnBXAZZGgBZqBxouplFLe3pZKNivPFxf6n40+n7ja28U9MSHNwaCGWzvQOvRgJ0E/FCnE455CIiGiaVIzFEXUcFjUSKSEqzh0VivBVHl3N1haXZWnrS35TTRNTopnbk7cY2MpXG5+l2AQWrifnVVeMhn5SzT09Ejr2hq3vAKd6Busaub8Yyz2ZziDz5JBlsF8TzBdWF5WUR6pN8ggi0yzRB1Yl+4CAeXHhtoNNL7j4ICwRe4gUEwmnYMzwNKZYPPHX97fF6ejfHjIpY8JOutprGXDLy+5dDGBV8NX6nQYTK8i/xxMkFcwVxwHvzHzTHDDL9DpaOjt5XLNBGn3yIjjCdzDw1zOmeCoORTS+HE4Vx9FdCbYpN5ynquhkGN8g0WPuDVfe0ONRksYtfWXBgyyyKwedrS8BOd5PQ3ns2SQZdroF8OB0eiG89vJyjcnHMZjaTjVxhPGyPUUkkl7lomaG2VJmEbzk+m3GaY/+sH00+k30/f7P5v+nmH6ObunCqtji9mgjN1jy6sAAwD9Hc4TcS9VxQAAAABJRU5ErkJggg==";
var imgUnknown	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHmSURBVHjatJYxT8JQFIUvXYgJGOJkQ0zDpoiIDCbGsWETSUjjbhz8MfwCBzcmQ0gQN9LRuBhERHQjjSE4MBBhYSne0zwIqMXW1pscmj5433m8tvc0MJlMaElFWHusHVaItSHG31gj1hPrgTWwAwRsDFZZx6zDWq0mNRoNGg6HZBiG9aWiKBQOhymVSlEmkzF56JZ1zfpwYrDNOi+Xy8FKpUKmaS77hyRJEuVyOcrn82M+vWA9LzNQm83mia7rVK/XyU2l02lSVZWSyeQVn+qzBcz9ZpelFYtF13AU5mAuGIK1YICLeVooFKRer0d/LcwFAyzBnBkclUqlFd4e8lpggAXm1GANd0u1WiW/SrAOwYbBPg9Iv90tbgosMMHGx1ar1SK/q91u47AJg3UvF9auut0uDjIMQnhK/S7BDEn0zwWDEfqK3yWYIxi8y7Lsu0E0GrWePRi8JBIJ3w3i8TgOrzC4z2azJrqib/vOLDDBBrWPfs4DvhkIFjKiP132jaZpY261nuFggAXmfLND5F2in3u54JgLBljTGP0WONzXrcBx21mxcsA5eBYC56fIRFicccsNois6iUzsudgWrPzRSehHROgfzId+p9OxvozFYl9D/06E/sDpW4Xda4sixg2nry2fAgwA7hjKmyGdaWoAAAAASUVORK5CYII=";
var imgWood		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAMCAYAAAC9QufkAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH9SURBVHjadJJNSNNxGMc///lvrb3828q1FJ1MKHCjlF4ouihJB4O69HJO8FCX6NC5a0XdeoGgc5ZEkIJ1iBpJRQmh4jxs2pZzm5ub/jfHxl7s3/6/sbJgz+V5+fF9nu/z/T1S6ttTtlsur2rBuWcUkmX6zlxBsdolmpjhf+Ce1p2cPD2Mu8/F/Mt7yKai1gwsN4ItaUaTJJVSyS7yHbt2E4+pvB99wn5Ht3Zw4LzUdHIhr/7jDdUi6Vyte3aNdOQrQf+41nRy+MdPPN1dwjsdGULTUfxhCKQLuCy/6N+Y1JtonsER2jo9goWkC6bvtZ4u4R+7jd3RxoOJVVrym9y6uI+FUEowKJvstBtVEV+9+0iAZV2kaOgzxbWIYPB4NERLzd+84aOz18viizf4zFmShTowXZT/0rbYIrglM7R7ReG6IcaJ4UsE5mbJb2Q4erafpS9BvJWseM/EEiSiYU2nLusC5TYLVIpZjDYLkVhdMN/hXlLRJRSbGbPLyKvn66LedaiHwMP79Axd1mQd2Pgahayg1mioOPayHC+Ig1EcVqaiW0xOrOA2QeunMWSb9RSR8OvaJRlZnklyZ0rj2OyCYGGoWsnMR/n4ISwGDDqr4KwBFYiX7XW19R3evR1nerHCiqqxmkhx7VwHRwYO8N0f+lPv2HapF4aO81uAAQAil+gxsz59XAAAAABJRU5ErkJggg==";
var imgWine		= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAYAAABSgIzaAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHGSURBVHjaYnx1ag4DOtj38OT/vefPM4iJMjDoyhgy2MmaM7AwMTAiq2FhwAKWnFgGpr//YmH4wXSP4SfTKwZPBl8UNUzomv78Y/gvIAYx78OrPwxf3/1jePLwBYbhGBpBThJXYYbzv7z7z2Dy3Q9DIyOyH1+/+/B/3oTdDFsunmeQU2cFi7Ebf2CQ0YCwHQRCGZzkzRlRbARpOrnkIsOD128YfPQNGfK1/BkaLKIZXh3mhtt8X3YDOODgGs/fePk/KLGLQYyPlyHR3JxBW0SMYcO1ywzzTxxnUDaTAWsC+ffh5d8MZ37thngJFBi/TzwF2wJS/P7zNwYFURGGwzdvMrz4+JlhUpcbw+79dxnUrdihNn9g2M6w+T/L+w8fGNp372JINrdkuPrmFcPqU2cYJJ7xMpQ7u4MVXr59GEyDQpdbCOKzZ/+OIeJx6/VrYNpFUwtMq8tIMtx88pzhxrnX8MARkUaENrP8N56Gjz9+MJjJyzOEm5kwCLFzMtx+85ph/YULDOefPmGYlFPKoH5eg+EYwxkGMQVmhm+f/zNE/KuERAcoREGmgKJCVUWVwS/GACOJgQLwDOcmhndMtxmSuKsYAAIMAHIKugpSnTR5AAAAAElFTkSuQmCC";
var imgMarble	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGoSURBVHjahFJdL8NgFH46XddtXZdN4yOWmBAXSCSEGy5dSvxB/8MdQUSQIBIuFqLD0q7ZlK5dt7a8+p6Jj2Tm3PT07Xue83xUsE63MahYqsAcYRRC4xLpdBrJISb8/C4OGg7fBCYWF1C/ucLxwQ1EgWFtuczKE8NfIIlBw5VmqteHXQQdH1G8fPe4Ar3WZP8CXOghtJExRP4LvJaLtufiLQZqOQ529mJGlzrrC8A111Fm2ZxCW4/2D8D7jc2tWH+PeRAE+JMBN0yWZahqHr7fQUbJYW5xhdhIchrFQv7X/b4SnBcbRq0Wuy7Tdi6jeneL6r1OIJqm4cF4JS/6AvDNk9MzKE3Nkn5ejboJv+1BkmRksgqdnVw9fcdIkZXWKbJ8oUAyLOORgNqdEE37FS3Xg+vYcD2fZorDxR7Ac6CwIbWETjxwdrgLMSnCcVyiOr+0Cnl8HO9Rl4YMo46cqpKR/E6Cbw4lDRk5iYZlovvpcBQGeKjquD4/JU8SYu+f4DLEpEQ9jzZhhiP0YpoWPXnOPL5ULIEXpyxEPlzbQk7J0pndbHz59SHAAPFG0oxdJVVKAAAAAElFTkSuQmCC";
var imgSulfur	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH0SURBVHjajJJNaxNRFIafGZNp08zEJE3EaFOTCNFaRFqUggURddWFKC5cCP4H8V+4cVNc6cK6caMuBEGQaoVGLA1aJVosbZqONmnMh81kMu1UM85MQYrU4IELF877de49QnnmLp3KK723PmRyDJy8JuzWFzuSg6LVNosMnx1hLjtltdtb1n8L+A8mLYkiohRDbxyiNxrk47sMf4vsKuCAjPIL2FpCil7GaL1lLf+K0sJLHtwZ75wgfPyKpcTT7BE0TO8oPitDfypKS9NpapvIXWXu3bpp3R+/bf0zQXXxKR5JRtkrYKwvs6HXiCfDyEoXP+omp88NUy8v83VlzvojIHp9luP+bfo6oUg3tdUc048maAtR8vN5egIBhkbTLtbn07h0dYDnDye2Ezjk4NExNPUJ4QOD/DSbzL7OkUjLmM0F1KXvtBoNO5Gfvn4FNV9zTzAkIe4kO69eKZWYfPyMUxcuumKLuYI7f7Wyibauc2ZsiC+fqrSaJqrawuPbtx/1zQ032sq8DdYrHDmRwN+tUvhcd53KRQ3ZJvT4I8TiEuljvWRn1kimDiO632VXvaZgCn0Mjpy3QSGaDdON7Tg5FYmFXHGnHANF9rh3YecqO/+vKLP2CqYw9ASGsbq9kaLszCo4fX+gQL2yQaX8i+zkFL8FGABBCeG3MCTxbAAAAABJRU5ErkJggg==";
var imgCrystal	= "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAMCAYAAAC9QufkAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAHdSURBVHjabFLPTxNREP62u12WbdfSLiVSa1OgGIEABWMImiByENFoAvwBXLh68MK/4cmb8Wi4kXA0Bi7EH5Sfxq5GGzCSIpTYlO12a9utD3aq1Y2dy8y8N9+bb755XGb9GRrZT+ZmCWEY160tSFyFa1QjNDp8uhdix3wQ0VAL0uId3JC+skgx+d8Drkbg7SxPvlCuwixb+PgritWMh9lsHODPeYktcvfZ88okS5bb6wVKE49iqUxFacPCk2UNb05EJ+10kYcpWZS84waQ9cnn0QblplVrlNLek7/UXHXS1gwfbnW1UiKLAr78MCFIMpjohSxweL2r4UPiLSYnRuGPz+Jf6q5e7ykuuIFuVab5bOtq9ZA/KZSQ2VmjONYzBL3i1IazVzW/cZndi3cipTM0N4lI7h9g+loMS5sp9Mt5DMRHsJw8JMCjKwb+KE9qDwWqePnpCBFVqYu0+z2PQFXH3fHbuBqUEQkotf17onXqLjt40OcnqmLFwGC7gottbUT58cxETSivG2MdKhbGY3ih6bA/D4G/GTxe6WGoahAre7nafs+7P+wLUZw4yDnmtO92dOXvzHNLBuu4OYWwWMJYLAi/r4W6LW7uY7AzjMOcCfP3OIWCgaxRpLozAQYAw+q/LLa8YygAAAAASUVORK5CYII=";
var imgScroll	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAJCAYAAAA2NNx1AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9wFCQkMAyatkzcAAAAdaVRYdENvbW1lbnQAAAAAAENyZWF0ZWQgd2l0aCBHSU1QZC5lBwAAATJJREFUKM+10j8vA3Ecx/H37+7X9jSSYnCVdBHtQNKh6WDC0HgEHoMHYDEYJRaLzSIsHoPEnzQi0ZOII40IEZaqgRCl1/rhej9rJSfR4DN/X8kn33wEwMLUqAZ4UZL6k2LZcQUdJMwbXy4Cza/S5oVf3dK10jzH++cUXUUmJZnIxVnb8Mhn09h2i8HsED0Ji2jc4L0ZUHtWAJwVHQpz64R5A18BGqFNtDbRgcAwjZ+3/MYLv17V6u6ISrlE5fKa/gFBX9LCOZCM5HMkEoLe9BhdVjdmTNJ683lVHgDe7QXJ4XHCvOTxBOUucrN3xbbbIJOSFPIWp8UG0fsytt0i8rCLTFiIuMFHM8Bre0VydjXUGxAAAlMGxCKCWERjdrSJcC92Vmb04abDn89tcnpJ/MfcPgHFJapS8yGUIAAAAABJRU5ErkJggg==';

GM_addStyle(
	'.iuwIcon { position: absolute; z-index: 499; padding-top: 5px; height: 19px; width: 24px; text-align: center; color:white; font-weight:bold; cursor:default } ' +
	'.iuwyes { background-image: url(' + imgYes + '); } ' +
	'.iuwno { background-image: url(' + imgNo + '); } ' +
	'.iuwwait { background-image: url(' + imgWait + '); } ' +
	'.iuwunknown { background-image: url(' + imgUnknown + '); } ' +
	'#iuwtooltip {position:absolute;line-height:19px; text-align:right; font-size:smaller;opacity:0.85;color:#333;display:none;z-index:499; font-weight:bold; border:solid #c3802d;	border-width:4px 10px 4px 11px;	-moz-border-image:url('+imgScroll+') 4 10 4 11 fill repeat; -webkit-border-image:url('+imgScroll+') 4 10 4 11 fill repeat; } ' +
	'.iuwgreen { color:green; } ' +
	'.iuwred   { color:red; } ' +
	'.iuwwood    { padding-left:20px; background:url(' + imgWood + ') 2px 50% no-repeat; } ' +
	'.iuwwine    { padding-left:20px; background:url(' + imgWine + ') 2px 50% no-repeat; } ' +
	'.iuwmarble  { padding-left:20px; background:url(' + imgMarble + ') 0 50% no-repeat; } ' +
	'.iuwcrystal { padding-left:20px; background:url(' + imgCrystal + ') 2px 50% no-repeat; } ' +
	'.iuwsulfur  { padding-left:20px; background:url(' + imgSulfur + ') 0 50% no-repeat; }'
);

/* globals top, document, setTimeout */
var IUW = (function() {
	"use strict";

	// Server host and hostname
	var host = top.location.host.replace(/\.ikariam\.gameforge\.com/, '');

	// Materials reduction from researches
	var pulley = GM_getValue(host + "_iuw_pulley", false),
		geometry = GM_getValue(host + "_iuw_geometry", false),
		spirit = GM_getValue(host + "_iuw_spirit", false);

	var icons = [];
	var redCoef = null;			// reduction coefficients

	var screen = null,
		spot = null,
		ownCity = true;

	// Startup - called once on page load.
	function init() {
		screen = unsafeWindow.ikariam.getScreen();
		spot = screen.data.position;

		// Create all 18 icons.
		for(var i = 0; i < spot.length; i++) {
			icons.push( new IUWIcon(i) );
		}

		// When we get a new popup (changeView event), we may deduce info about researches and building prices.
		// We do this only if the last building research (Spirit Level) isn't complete.
		// Once Spirit Level has been completed, we don't need anymore research info.
		if(!spirit) {
			unsafeWindow.ajax.Responder.IUW_IkaChangeView = unsafeWindow.ajax.Responder.changeView;
			unsafeWindow.ajax.Responder.changeView = function(params) {
				unsafeWindow.ajax.Responder.IUW_IkaChangeView(params);
				var id = params[0];
				var div = document.getElementById('buildingUpgrade');
				if(div) {
					checkResearch(div, id);			
				}
			};
		}

		// Some important data may have changed. Check if the building icons need to be refreshed.
		var screenUpdate = screen.update;
		screen.update = function(data) {
			screenUpdate.call(screen, data);
			reload();
		};

	}

	// We inspect the building upgrade popup to check for pricing distorsion
	// and deduce which researches are completed.
	//
	// @param buildingUpgradeDiv a DOM object containing all the info - used to restrict DOM lookups.
	// @param buildingType string the building type,  used as key in the BUILDINGS database.
	function checkResearch(buildingUgradeDiv, buildingType) {
		// Buliding level
		var level = IUW.$('ul.actions li:eq(1)', buildingUgradeDiv).text();	// 3 action list elements : upgrade, level, downgrade
		if(!level) return;
		level = parseInt(level.replace(/[^0-9]/g, ''), 10);

		// wood price - actual price displayed on screen, with all reductions
		var wood = IUW.$('li.wood', buildingUgradeDiv).text();
		if(!wood) return;
		wood = parseInt(wood.replace(/[^0-9]/g, ''), 10);

		// wood price - base price from DB without any reductions
		var prices = IUW.BUILDINGS[buildingType];
		if(!prices) return;
		var baseWood = prices[level-1].wood;

		// minus the reductions we know about
		var theoretical = Math.floor(baseWood * redCoef.wood);

		// Match ?
		if(theoretical > wood) {		// theoretical price is never underestimated, since all you get in the game are reductions
			// difference between old and new reduction. Can be 2, 4, 6, 8, 12, 14
			// Pulley +2
			// Geometry +4
			// Spirit +8
			var difference = Math.round((theoretical - wood)/baseWood*100);	// in percent
			if(difference >= 2)
				pulley = true;
			if(difference >= 4)
				geometry = true;
			if(difference >= 8)
				spirit = true;
			// Erreur : Greasemonkey access violation: unsafeWindow cannot call GM_setValue.
			setTimeout(saveResearchLevels, 0);		
		}
	}

	function saveResearchLevels() {
		GM_setValue(host + "_iuw_pulley", pulley);
		GM_setValue(host + "_iuw_geometry", geometry);
		GM_setValue(host + "_iuw_spirit", spirit);
	}

	// updates reduction coefficients redCoef.
	// This method is called on several occasions.
	function getReductions() {
		// Just in case ikariam creates new objects every now and then.
		screen = unsafeWindow.ikariam.getScreen();
		spot = screen.data.position;

		// Reduced materials
		var redAll = 0, redWood = 0, redWine = 0, redMarble = 0, redCrystal = 0, redSulfur = 0;
		
		// Assigning reductions in %
		if (pulley)   { redAll = 2;          }
		if (geometry) { redAll = redAll + 4; }
		if (spirit)   { redAll = redAll + 8; }

		// We check if the user has built some material reduction buildings
		for (var i = 0; i < spot.length; i++) {
			// 'carpenter' or 'carpentering constructionSite' or 'buildingGround shore' or 'buildingGround land' or 'buildingGround wall' ...
			var buildingType = spot[i].building.split(/ /)[0];
			switch (buildingType) {
				case 'architect':
					redMarble = parseInt(spot[i].level, 10);
					break;
				case 'optician':
					redCrystal = parseInt(spot[i].level, 10);
					break;
				case 'carpentering':
					redWood = parseInt(spot[i].level, 10);
					break;
				case 'vineyard':
					redWine = parseInt(spot[i].level, 10);
					break;
				case 'fireworker':
					redSulfur = parseInt(spot[i].level, 10);
					break;
			}
		}

		// Setting the material reduction coefficients
		redCoef = {
			wood    : 1 - (redWood    + redAll)/100,
			wine    : 1 - (redWine    + redAll)/100,
			marble  : 1 - (redMarble  + redAll)/100,
			crystal : 1 - (redCrystal + redAll)/100,
			sulfur  : 1 - (redSulfur  + redAll)/100
		};
	}

	/**
	 * Main function : loops through building locations, retrieves building types and levels,
	 * and updates their icon accordingly.
	 * This method is called on several occasions.
	 */
	function updateIcons() {
		// Bureaucracy
		var lockedPosition = screen.data.lockedPosition ? screen.data.lockedPosition[0] : -1;

		// Info about each building/spot
		var level, busy, underConstruction, upLevel, posTop, posRight;
		var cityBusy = (IUW.$('.constructionSite').length > 0);		// 2 divs if under construction

		// Updating the icon for each building
		for (var i = 0; i < spot.length; i++) {

			// Check for bureaucracy spot
			if (i === lockedPosition) {
				// If the research have not been done
				// we skip skip the position 13
				icons[i].hide();
				continue;
			}

			// Gets the level of a building
			level = spot[i].level;
			underConstruction = false;		// detected later
			var buildingType = spot[i].building;
			// Busy buildings : port, workshop, shipyard, barracks, hideout(?)
			busy = spot[i].isBusy && (buildingType !== 'port');		// 'port constructionSite' ⇒ busy too because cityBusy = true
			busy = busy || cityBusy;

			if(buildingType.substr(0, 15) === 'buildingGround ')	{		// buildingGround land, buildingGround shore
				icons[i].hide();
				continue;
			}
			else if(buildingType.substr(-17) === ' constructionSite')	{ // palace constructionSite
				buildingType = buildingType.substr(0, buildingType.length-17);
				underConstruction = true;
			}

			// The upgrade level
			// Note: because the database starts with lvl 2 of all buildings,
			// and the index starts with 0, we have to get one level below
			if (underConstruction) {
				// If we find a contruction spot, we would like to see the level after the construction
				upLevel = parseInt(level, 10);

				// Positioning for construction spot
				posTop = IUW.POSITIONS.constructionSite.y;
				posRight = IUW.POSITIONS.constructionSite.x;

			}
			else if (IUW.POSITIONS.hasOwnProperty(buildingType) && IUW.BUILDINGS.hasOwnProperty(buildingType)) {
				// Positioning for other buildings
				upLevel = parseInt(level, 10) - 1;
				var POS = IUW.POSITIONS[buildingType];
				// Ports on the right spot have a different image
				if(i === 2) {
					POS = IUW.POSITIONS[buildingType+'2'];
				}
				posTop = POS.y;
				posRight = POS.x;
			}
			else {
				console.warn('Ikariam Upgrade Watcher 2 : unknown building '+buildingType);
				icons[i].hide();
				continue;
			}

			// Is the building known in DB ?
			// If the level is out of bound in DB, we make the icon black.
			var requirements = null;

			if(ownCity) {
				// Get basic resource requirements in the DB
				var basicRequirements = IUW.BUILDINGS[buildingType][upLevel];
				if(basicRequirements) {
					// And apply deductions
					requirements = {
						wood    : Math.floor( basicRequirements.wood    * redCoef.wood   ),		// all buildings require wood
						wine    : Math.floor( basicRequirements.wine    * redCoef.wine   ),		// NaN for unused materials
						marble  : Math.floor( basicRequirements.marble  * redCoef.marble ),
						crystal : Math.floor( basicRequirements.crystal * redCoef.crystal),
						sulfur  : Math.floor( basicRequirements.sulfur  * redCoef.sulfur )
					};
				}
			}

			// Updates the icon
			icons[i].update(posTop, posRight, busy, level, requirements);

		}  // end of iteration through buildings
	}

	function reload () {
		// Get each building/spot from the new building list
		spot = screen.data.position;

		// Is this our city ?
		ownCity = (screen.data.ownerId === unsafeWindow.ikariam.model.avatarId);

		if(ownCity) {
			getReductions();
		}

		// Own city or not :
		updateIcons();
	}

	// Public
	return {
		init: init,
		reload: reload
	};
})();


IUW.$ = jQuery.noConflict(true);
IUW.$(function(){
	"use strict";
	IUW.init();
	IUW.reload();
});


//---------------------------- CLASSES ----------------------------//
/**
 * Creates an icon to attach a building
 * @param object obj
 * @param int     position building position spot number
 * @param integer position top
 * @param integer position right
 * @param string  img = 'wait', 'yes', 'no', unknown'
 * @param integer level
 * @param req     array [wood, wine, marble, crystal, sulfur]
 * @return void
 */
var IUWIcon = function(position) {
	"use strict";

	this.position = position;		// position number in the city, from 0 to 16
	this.level = 0;					// building level
	this.requirements = null;		// { wood, wine, marble, wrystal, sulfur }
	this.top = 0;
	this.right = 0;

	this.createDiv();
	this.icon = IUW.$('#iuwIcon'+this.position);		// for faster access
	this.setTooltip();
};

IUWIcon.prototype.hide = function() {
	"use strict";
	this.icon.hide();
};

// Updates the icon position, class and text
IUWIcon.prototype.update = function(top, right, busy, level, req) {
	"use strict";
	this.level = level;				// building level
	this.requirements = req;		// { wood, wine, marble, crystal, sulfur }
	this.top = top;
	this.right = right;

	// position
	// icon#16 is positionned relative to the global #locations container. See IUWIcon.prototype.createDiv
	if(this.position === 16) {
		this.icon.css('top', this.top + 319);
		this.icon.css('left', 1088 + 86 - 24 - this.right);	// #position16.left - #position16.width - this.width = 1088 + 86 - 24.
	}
	else {
		this.icon.css('top', this.top);
		this.icon.css('right', this.right);
	}

	// class
	// no.png = red
	// yes.png = green
	// wait.png = blue
	// unknown.png = grey
	this.icon.show();
	var img = 'no';
	if(!this.requirements) {
		img = 'unknown';
	}
	else if(hasEnoughResources(this.requirements)) {
		img = busy ? "wait": 'yes';
	}
	this.icon.removeClass('iuwyes iuwno iuwwait iuwunknown').addClass('iuw'+img);

	// text : building level
	this.icon.text(this.level);
};

// Create the empty icon div.
IUWIcon.prototype.createDiv = function() {
	"use strict";
	if(this.position === 16) {
		// #position16 has a z-index below that of #position10, which prevents the icon to get the mouseover event.
		// So in order to have icon#16 above #position10, we must not create it inside #position16 container.
		// It will have to be positionned relative to the #locations container, not #position16, obviously.
		IUW.$('#position16').after('<div id="iuwIcon16" class="iuwIcon" style="display:none"></div>');
	}
	else {
		IUW.$('#position'+this.position).append('<div id="iuwIcon'+ this.position +'" class="iuwIcon" style="display:none"></div>');
	}
};

IUWIcon.prototype.info = function() {
	"use strict";
	// Get current resources
	var ikares = unsafeWindow.ikariam.model.currentResources;
	var curRes = {
		wood   :ikares.resource,
		wine   :ikares[1],
		marble :ikares[2],
		crystal:ikares[3],
		sulfur :ikares[4]
	};

	// Estimating the resource status
	var html = '';
	for(var name in this.requirements) {
		// Process only required resources
		var required = this.requirements[name];
		if(required) {
			var current = curRes[name];
			var estimated = current - required;
			// Adding color to the values
			// Red if negative
			// Green if 0 or positive
			var color = (estimated >= 0) ? "iuwgreen": 'iuwred';
			html += '<div class="iuw' + name + ' ' + color + '">'+ estimated.toLocaleString() +'</div>';
		}
	}
	
	return html;
};

IUWIcon.prototype.setTooltip = function() {
	"use strict";
	var xOffset = 10;
	var yOffset = 0;
	var self = this;
	this.icon.hover(
		function(e){
			if(!self.requirements)		// unknown.png (maximum level building)
				return;
			var tooltip = IUW.$("#iuwtooltip");
			if(tooltip.length === 0) {
				IUW.$("body").append('<div id="iuwtooltip"></div>');
				tooltip = IUW.$("#iuwtooltip");
			}
			tooltip
				.html(self.info())
				.css("top",(e.pageY - yOffset) + "px")
				.css("left",(e.pageX + xOffset) + "px")
				.stop(true, true)
				.fadeIn("fast");
		},
		function(){
			IUW.$("#iuwtooltip").stop(true, true).fadeOut("fast");
		}
	);
	this.icon.mousemove(function(e){
		IUW.$("#iuwtooltip")
			.css("top",(e.pageY - yOffset) + "px")
			.css("left",(e.pageX + xOffset) + "px");
	});
};

//---------------------------- FUNCTIONS ----------------------------//
function hasEnoughResources(requirements) {
	"use strict";
	// Get the resources we have in town
	var current = unsafeWindow.ikariam.model.currentResources;
	return (
		(isNaN(requirements.wood)    || (current.resource >= requirements.wood)) &&
		(isNaN(requirements.wine)    || (current[1] >= requirements.wine)) &&
		(isNaN(requirements.marble)  || (current[2] >= requirements.marble)) &&
		(isNaN(requirements.crystal) || (current[3] >= requirements.crystal)) &&
		(isNaN(requirements.sulfur)  || (current[4] >= requirements.sulfur))
	);
}


//---------------------------- DATABASE ----------------------------//

// Positions for each icon. Some of these won't work for left-to-right
// writing countries, where the icons are reversed.
IUW.POSITIONS = {
	academy:	{ x:50, y:38 },
	alchemist:	{ x:50, y:40 },
	architect:	{ x:60, y:35 },
	barracks:	{ x:32, y:40 },
	blackMarket: { x:-5, y:20 },
	branchOffice:{ x:50, y:45 },
	carpentering:{ x:30, y:30 },
	constructionSite:{ x:85, y:48 }, // (left side)  or { x:35, y:65 } for below
	dump:		{ x:40, y:40 },
	embassy:	{ x:40, y:40 },
	fireworker:	{ x:40, y:40 },
	forester:	{ x:45, y:30 },
	glassblowing:{ x:50, y:37 },
	museum:		{ x:45, y:40 },
	optician:	{ x:46, y:38 },
	port:		{ x:-40, y:50 }, // left side
	port2:		{ x:95, y:55 }, // right side
	palace:		{ x:60, y:40 },
	palaceColony:{ x:60, y:40 },
	pirateFortress: { x:70, y:-60 },
	safehouse:	{ x:25, y:35 },
	shipyard:	{ x:70, y:40 }, // left side
	shipyard2:	{ x:30, y:40 }, // right side
	stonemason:	{ x:50, y:30 },
	tavern:		{ x:30, y:35 },
	temple:		{ x:26, y:30 },
	townHall:	{ x:35, y:45 },
	vineyard:	{ x:50, y:34 },
	wall:		{ x:20, y:30 },
	warehouse:	{ x:60, y:43 },
	winegrower:	{ x:25, y:40 },
	workshop:	{ x:45, y:35 }
};

// All building costs. These are base costs, without any reduction. That's why they
// DON'T match the costs you can see in the online help. When you have completed all the researches,
// the costs you see in the help are 14 % less than these.
// So Cost Here * 0.86 = Cost seen in the help when you have completed all research.
// All indexes start with level 2
IUW.BUILDINGS = {
	// Academy
	// Type of resources needed: Wood, Crystal
	"academy": [
		{ "wood": 68 },                          // level 2
		{ "wood": 115 },                         // level 3
		{ "wood": 263 },                         // level 4
		{ "wood": 382,     "crystal": 225 },     // level 5
		{ "wood": 626,     "crystal": 428 },     // level 6
		{ "wood": 982,     "crystal": 744 },     // level 7
		{ "wood": 1330,    "crystal": 1089 },    // level 8
		{ "wood": 2004,    "crystal": 1748 },    // level 9
		{ "wood": 2665,    "crystal": 2454 },    // level 10
		{ "wood": 3916,    "crystal": 3786 },    // level 11
		{ "wood": 5156,    "crystal": 5216 },    // level 12
		{ "wood": 7446,    "crystal": 7862 },    // level 13
		{ "wood": 9753,    "crystal": 10729 },   // level 14
		{ "wood": 12751,   "crystal": 14599 },   // level 15
		{ "wood": 18163,   "crystal": 21627 },   // level 16
		{ "wood": 23691,   "crystal": 29322 },   // level 17
		{ "wood": 33451,   "crystal": 43020 },   // level 18
		{ "wood": 43572,   "crystal": 58213 },   // level 19
		{ "wood": 56729,   "crystal": 78724 },   // level 20
		{ "wood": 73833,   "crystal": 106414 },  // level 21
		{ "wood": 103459,  "crystal": 154857 },  // level 22
		{ "wood": 144203,  "crystal": 224146 },  // level 23
		{ "wood": 175058,  "crystal": 282572 },  // level 24
		{ "wood": 243930,  "crystal": 408877 },  // level 25
		{ "wood": 317208,  "crystal": 552141 },  // level 26
		{ "wood": 439968,  "crystal": 795252 },  // level 27
		{ "wood": 536310,  "crystal": 1006648 }, // level 28
		{ "wood": 743789,  "crystal": 1449741 }, // level 29
		{ "wood": 1027470, "crystal": 2079651 }, // level 30
		{ "wood": 1257246, "crystal": 2642548 }, // level 31
		{ "wood": 1736683, "crystal": 3790483 }  // level 32
	],

	// Alchemist's Tower
	// Type of resources needed: Wood, Marble
	"alchemist": [
		{ "wood": 467,     "marble": 116 },     // level 2
		{ "wood": 718,     "marble": 255 },     // level 3
		{ "wood": 1045,    "marble": 436 },     // level 4
		{ "wood": 1469,    "marble": 671 },     // level 5
		{ "wood": 2021,    "marble": 977 },     // level 6
		{ "wood": 2738,    "marble": 1375 },    // level 7
		{ "wood": 3671,    "marble": 1892 },    // level 8
		{ "wood": 4883,    "marble": 2564 },    // level 9
		{ "wood": 6459,    "marble": 3437 },    // level 10
		{ "wood": 8508,    "marble": 4572 },    // level 11
		{ "wood": 11172,   "marble": 6049 },    // level 12
		{ "wood": 14634,   "marble": 7968 },    // level 13
		{ "wood": 19135,   "marble": 10462 },   // level 14
		{ "wood": 24987,   "marble": 13705 },   // level 15
		{ "wood": 32594,   "marble": 17921 },   // level 16
		{ "wood": 42483,   "marble": 23402 },   // level 17
		{ "wood": 55339,   "marble": 30527 },   // level 18
		{ "wood": 72050,   "marble": 39790 },   // level 19
		{ "wood": 93778,   "marble": 51830 },   // level 20
		{ "wood": 122021,  "marble": 67485 },   // level 21
		{ "wood": 158740,  "marble": 87835 },   // level 22
		{ "wood": 206471,  "marble": 114289 },  // level 23
		{ "wood": 268524,  "marble": 148680 },  // level 24
		{ "wood": 349194,  "marble": 193389 },  // level 25
		{ "wood": 454063,  "marble": 251512 },  // level 26
		{ "wood": 590393,  "marble": 327069 },  // level 27
		{ "wood": 767620,  "marble": 425294 },  // level 28
		{ "wood": 998018,  "marble": 552986 },  // level 29
		{ "wood": 1297536, "marble": 718988 },  // level 30
		{ "wood": 1686906, "marble": 934789 },  // level 31
		{ "wood": 2193089, "marble": 1215330 }  // level 32
	],

	// Architect's office
	// Type of resources needed: Wood, Marble
	"architect": [
		{ "wood": 291,     "marble": 160 },     // level 2
		{ "wood": 413,     "marble": 222 },     // level 3
		{ "wood": 555,     "marble": 295 },     // level 4
		{ "wood": 720,     "marble": 379 },     // level 5
		{ "wood": 911,     "marble": 475 },     // level 6
		{ "wood": 1133,    "marble": 587 },     // level 7
		{ "wood": 1390,    "marble": 716 },     // level 8
		{ "wood": 1689,    "marble": 865 },     // level 9
		{ "wood": 2035,    "marble": 1036 },    // level 10
		{ "wood": 2437,    "marble": 1233 },    // level 11
		{ "wood": 2902,    "marble": 1460 },    // level 12
		{ "wood": 3443,    "marble": 1722 },    // level 13
		{ "wood": 4070,    "marble": 2023 },    // level 14
		{ "wood": 4797,    "marble": 2369 },    // level 15
		{ "wood": 5640,    "marble": 2767 },    // level 16
		{ "wood": 6618,    "marble": 3226 },    // level 17
		{ "wood": 7754,    "marble": 3752 },    // level 18
		{ "wood": 9070,    "marble": 4358 },    // level 19
		{ "wood": 10598,   "marble": 5056 },    // level 20
		{ "wood": 12369,   "marble": 5857 },    // level 21
		{ "wood": 14424,   "marble": 6778 },    // level 22
		{ "wood": 16807,   "marble": 7836 },    // level 23
		{ "wood": 19573,   "marble": 9052 },    // level 24
		{ "wood": 22780,   "marble": 10448 },   // level 25
		{ "wood": 26501,   "marble": 12054 },   // level 26
		{ "wood": 30817,   "marble": 13899 },   // level 27
		{ "wood": 35826,   "marble": 16289 },   // level 28
		{ "wood": 41631,   "marble": 18450 },   // level 29
		{ "wood": 48371,   "marble": 21246 },   // level 30
		{ "wood": 56185,   "marble": 24455 },   // level 31
		{ "wood": 65251,   "marble": 28141 }    // level 32
	],

	// Barracks
	// Type of resources needed: Wood, Marble
	"barracks": [
		{ "wood": 114 },                        // level 2
		{ "wood": 195 },                        // level 3
		{ "wood": 296 },                        // level 4
		{ "wood": 420 },                        // level 5
		{ "wood": 574 },                        // level 6
		{ "wood": 766 },                        // level 7
		{ "wood": 1003 },                       // level 8
		{ "wood": 1297,    "marble": 178 },     // level 9
		{ "wood": 1662,    "marble": 431 },     // level 10
		{ "wood": 2115,    "marble": 745 },     // level 11
		{ "wood": 2676,    "marble": 1134 },    // level 12
		{ "wood": 3371,    "marble": 1616 },    // level 13
		{ "wood": 4234,    "marble": 2214 },    // level 14
		{ "wood": 5304,    "marble": 2956 },    // level 15
		{ "wood": 6630,    "marble": 3875 },    // level 16
		{ "wood": 8275,    "marble": 5015 },    // level 17
		{ "wood": 10314,   "marble": 6429 },    // level 18
		{ "wood": 12843,   "marble": 8183 },    // level 19
		{ "wood": 15979,   "marble": 10357 },   // level 20
		{ "wood": 19868,   "marble": 13052 },   // level 21
		{ "wood": 24690,   "marble": 16395 },   // level 22
		{ "wood": 30669,   "marble": 20540 },   // level 23
		{ "wood": 38083,   "marble": 25680 },   // level 24
		{ "wood": 47277,   "marble": 32054 },   // level 25
		{ "wood": 58676,   "marble": 39957 },   // level 26
		{ "wood": 72812,   "marble": 49757 },   // level 27
		{ "wood": 90341,   "marble": 61909 },   // level 28
		{ "wood": 112076,  "marble": 76977 },   // level 29
		{ "wood": 139028,  "marble": 95661 },   // level 30
		{ "wood": 172448,  "marble": 118830 },  // level 31
		{ "wood": 213889,  "marble": 147560 },  // level 32
		{ "wood": 265276,  "marble": 183185 },  // level 33
		{ "wood": 328996,  "marble": 227359 },  // level 34
		{ "wood": 408008,  "marble": 282136 },  // level 35
		{ "wood": 505984,  "marble": 350059 },  // level 36
		{ "wood": 627473,  "marble": 434283 },  // level 37
		{ "wood": 778120,  "marble": 538721 },  // level 38
		{ "wood": 964923,  "marble": 668224 },  // level 39
		{ "wood": 1196558, "marble": 828808 },  // level 40
		{ "wood": 1483785, "marble": 1027932 }, // level 41
		{ "wood": 1839947, "marble": 1274847 }, // level 42
		{ "wood": 2281588, "marble": 1581020 }, // level 43
		{ "wood": 2829223, "marble": 1960675 }, // level 44
		{ "wood": 3508290, "marble": 2431447 }, // level 45
		{ "wood": 4350333, "marble": 3015205 }, // level 46
		{ "wood": 5394466, "marble": 3739064 }, // level 47
		{ "wood": 6689191, "marble": 4636650 }, // level 48
		{ "wood": 8294651, "marble": 5749656 }  // level 49 max
	],

	// BlackMarket
	// Type of resources needed: Wood, Marble
	"blackMarket": [
		{ "wood": 887,    "marble": 525},   // level 2
		{ "wood": 1360,   "marble": 807},   // level 3
		{ "wood": 1890,   "marble": 1126},  // level 4
		{ "wood": 2516,   "marble": 1509},  // level 5
		{ "wood": 3288,   "marble": 1988},  // level 6
		{ "wood": 4263,   "marble": 2601},  // level 7
		{ "wood": 5505,   "marble": 3390},  // level 8
		{ "wood": 7086,   "marble": 4403},  // level 9
		{ "wood": 9086,   "marble": 5693},  // level 10
		{ "wood": 11590,  "marble": 7315},  // level 11
		{ "wood": 14691,  "marble": 9331},  // level 12
		{ "wood": 18489,  "marble": 11807}, // level 13
		{ "wood": 23088,  "marble": 14812}, // level 14
		{ "wood": 28600,  "marble": 18420}, // level 15
		{ "wood": 35143,  "marble": 22708}, // level 16
		{ "wood": 42839,  "marble": 27757}, // level 17
		{ "wood": 51820,  "marble": 33654}, // level 18
		{ "wood": 62218,  "marble": 40486}, // level 19
		{ "wood": 74175,  "marble": 48348}, // level 20
		{ "wood": 87838,  "marble": 57334}, // level 21
		{ "wood": 103356, "marble": 67546}, // level 22
		{ "wood": 120888, "marble": 79087}, // level 23
		{ "wood": 140596, "marble": 92064}, // level 24
		{ "wood": 162647, "marble": 106587} // level 25 
	 ],

	// Trading post
	// Type of resources needed: Wood, Marble
	"branchOffice": [
		{ "wood": 173 },                        // level 2
		{ "wood": 346 },                        // level 3
		{ "wood": 581 },                        // level 4
		{ "wood": 896,     "marble": 540 },     // level 5
		{ "wood": 1314,    "marble": 792 },     // level 6
		{ "wood": 1863,    "marble": 1123 },    // level 7
		{ "wood": 2580,    "marble": 1555 },    // level 8
		{ "wood": 3509,    "marble": 2115 },    // level 9
		{ "wood": 4706,    "marble": 2837 },    // level 10
		{ "wood": 6241,    "marble": 3762 },    // level 11
		{ "wood": 8203,    "marble": 4945 },    // level 12
		{ "wood": 10699,   "marble": 6450 },    // level 13
		{ "wood": 13866,   "marble": 8359 },    // level 14
		{ "wood": 17872,   "marble": 10774 },   // level 15
		{ "wood": 22926,   "marble": 13820 },   // level 16
		{ "wood": 29286,   "marble": 17654 },   // level 17
		{ "wood": 37272,   "marble": 22469 },   // level 18
		{ "wood": 47283,   "marble": 28503 },   // level 19
		{ "wood": 59806,   "marble": 36051 },   // level 20
		{ "wood": 75447,   "marble": 45482 },   // level 21
		{ "wood": 94954,   "marble": 57240 },   // level 22
		{ "wood": 119245,  "marble": 71883 },   // level 23
		{ "wood": 149453,  "marble": 90092 },   // level 24
		{ "wood": 186977,  "marble": 112712 },  // level 25
		{ "wood": 233530,  "marble": 121067 },  // level 26
		{ "wood": 291225,  "marble": 175556 },  // level 27
		{ "wood": 362658,  "marble": 218617 },  // level 28
		{ "wood": 451015,  "marble": 271878 },  // level 29
		{ "wood": 560208,  "marble": 337705 },  // level 30
		{ "wood": 695038,  "marble": 418983 },  // level 31
		{ "wood": 861391,  "marble": 519260 }   // level 32
	],

	// Carpenter
	// Type of resources needed: Wood, Marble
	"carpentering": [
		{ "wood": 122 },                        // level 2
		{ "wood": 191 },                        // level 3
		{ "wood": 274 },                        // level 4
		{ "wood": 372 },                        // level 5
		{ "wood": 486 },                        // level 6
		{ "wood": 620 },                        // level 7
		{ "wood": 777,     "marble": 359 },     // level 8
		{ "wood": 962,     "marble": 444 },     // level 9
		{ "wood": 1178,    "marble": 546 },     // level 10
		{ "wood": 1432,    "marble": 669 },     // level 11
		{ "wood": 1730,    "marble": 816 },     // level 12
		{ "wood": 2078,    "marble": 993 },     // level 13
		{ "wood": 2486,    "marble": 1205 },    // level 14
		{ "wood": 2964,    "marble": 1459 },    // level 15
		{ "wood": 3524,    "marble": 1765 },    // level 16
		{ "wood": 4178,    "marble": 2131 },    // level 17
		{ "wood": 4945,    "marble": 2571 },    // level 18
		{ "wood": 5841,    "marble": 3097 },    // level 19
		{ "wood": 6890,    "marble": 3731 },    // level 20
		{ "wood": 8117,    "marble": 4490 },    // level 21
		{ "wood": 9550,    "marble": 5402 },    // level 22
		{ "wood": 11229,   "marble": 6496 },    // level 23
		{ "wood": 13190,   "marble": 7809 },    // level 24
		{ "wood": 15484,   "marble": 9383 },    // level 25
		{ "wood": 18166,   "marble": 11274 },   // level 26
		{ "wood": 21299,   "marble": 13543 },   // level 27
		{ "wood": 24963,   "marble": 16265 },   // level 28
		{ "wood": 29245,   "marble": 19531 },   // level 29
		{ "wood": 34247,   "marble": 23450 },   // level 30
		{ "wood": 40096,   "marble": 28154 },   // level 31
		{ "wood": 46930,   "marble": 33798 }    // level 32
	],

	// Dump
	// Type of resources needed: Wood, Marble, Crystal, Sulfur
	"dump": [
		{ "wood": 1152,    "marble": 932,     "crystal": 1146,    "sulfur": 845 },     // level 2
		{ "wood": 1766,    "marble": 1445,    "crystal": 1668,    "sulfur": 1398 },    // level 3
		{ "wood": 2504,    "marble": 2050,    "crystal": 2278,    "sulfur": 2061 },    // level 4
		{ "wood": 3388,    "marble": 2762,    "crystal": 2991,    "sulfur": 2857 },    // level 5
		{ "wood": 4450,    "marble": 3609,    "crystal": 3526,    "sulfur": 3813 },    // level 6
		{ "wood": 5724,    "marble": 4604,    "crystal": 4803,    "sulfur": 4960 },    // level 7
		{ "wood": 7253,    "marble": 5778,    "crystal": 5946,    "sulfur": 6336 },    // level 8
		{ "wood": 9088,    "marble": 7164,    "crystal": 7283,    "sulfur": 7987 },    // level 9
		{ "wood": 11289,   "marble": 8799,    "crystal": 8847,    "sulfur": 9968 },    // level 10
		{ "wood": 13931,   "marble": 10728,   "crystal": 10678,   "sulfur": 12346 },   // level 11
		{ "wood": 17101,   "marble": 13005,   "crystal": 12819,   "sulfur": 15199 },   // level 12
		{ "wood": 20905,   "marble": 15691,   "crystal": 15325,   "sulfur": 18623 },   // level 13
		{ "wood": 25470,   "marble": 18862,   "crystal": 18257,   "sulfur": 22731 },   // level 14
		{ "wood": 30948,   "marble": 22602,   "crystal": 21687,   "sulfur": 27661 },   // level 15
		{ "wood": 37522,   "marble": 27016,   "crystal": 25700,   "sulfur": 33578 },   // level 16
		{ "wood": 45410,   "marble": 32225,   "crystal": 30395,   "sulfur": 40677 },   // level 17
		{ "wood": 54876,   "marble": 38371,   "crystal": 35889,   "sulfur": 49197 },   // level 18
		{ "wood": 66236,   "marble": 45623,   "crystal": 42316,   "sulfur": 59420 },   // level 19
		{ "wood": 79867,   "marble": 54181,   "crystal": 49837,   "sulfur": 71688 },   // level 20
		{ "wood": 96223,   "marble": 64278,   "crystal": 58635,   "sulfur": 86409 },   // level 21
		{ "wood": 115852,  "marble": 76194,   "crystal": 68929,   "sulfur": 104076 },  // level 22
		{ "wood": 139407,  "marble": 90256,   "crystal": 80973,   "sulfur": 125274 },  // level 23
		{ "wood": 167672,  "marble": 106847,  "crystal": 95065,   "sulfur": 150714 },  // level 24
		{ "wood": 201592,  "marble": 126424,  "crystal": 111553,  "sulfur": 181241 },  // level 25
		{ "wood": 242293,  "marble": 149528,  "crystal": 130843,  "sulfur": 217872 },  // level 26
		{ "wood": 291136,  "marble": 176787,  "crystal": 153414,  "sulfur": 261830 },  // level 27
		{ "wood": 349749,  "marble": 208956,  "crystal": 179821,  "sulfur": 314581 },  // level 28
		{ "wood": 420081,  "marble": 246913,  "crystal": 201716,  "sulfur": 377881 },  // level 29
		{ "wood": 504483,  "marble": 291702,  "crystal": 246864,  "sulfur": 453842 },  // level 30
		{ "wood": 605763,  "marble": 344555,  "crystal": 289157,  "sulfur": 544994 },  // level 31
		{ "wood": 727300,  "marble": 406921,  "crystal": 338642,  "sulfur": 654378 },  // level 32
		{ "wood": 873143,  "marble": 480512,  "crystal": 396536,  "sulfur": 785637 },  // level 33
		{ "wood": 1048157, "marble": 567350,  "crystal": 464274,  "sulfur": 943149 },  // level 34
		{ "wood": 1258171, "marble": 669817,  "crystal": 543528,  "sulfur": 1132163 }, // level 35
		{ "wood": 1510191, "marble": 790730,  "crystal": 636253,  "sulfur": 1358979 }, // level 36
		{ "wood": 1812613, "marble": 933408,  "crystal": 744742,  "sulfur": 1631159 }, // level 37
		{ "wood": 2175519, "marble": 1101767, "crystal": 871676,  "sulfur": 1957774 }, // level 38
		{ "wood": 2611007, "marble": 1300431, "crystal": 1020187, "sulfur": 2349714 }, // level 39
		{ "wood": 3133592, "marble": 1534855, "crystal": 1193945, "sulfur": 2820041 }  // level 40
	],

	// Embassy
	// Type of resources needed: Wood, Marble
	"embassy": [
		{ "wood": 415,     "marble": 342 },     // level 2
		{ "wood": 623,     "marble": 571 },     // level 3
		{ "wood": 873,     "marble": 850 },     // level 4
		{ "wood": 1173,    "marble": 1190 },    // level 5
		{ "wood": 1532,    "marble": 1606 },    // level 6
		{ "wood": 1964,    "marble": 2112 },    // level 7
		{ "wood": 2482,    "marble": 2730 },    // level 8
		{ "wood": 3103,    "marble": 3484 },    // level 9
		{ "wood": 3849,    "marble": 4404 },    // level 10
		{ "wood": 4743,    "marble": 5527 },    // level 11
		{ "wood": 5817,    "marble": 6896 },    // level 12
		{ "wood": 7105,    "marble": 8566 },    // level 13
		{ "wood": 8651,    "marble": 10604 },   // level 14
		{ "wood": 10507,   "marble": 13090 },   // level 15
		{ "wood": 12733,   "marble": 16123 },   // level 16
		{ "wood": 15404,   "marble": 19824 },   // level 17
		{ "wood": 18610,   "marble": 24339 },   // level 18
		{ "wood": 22457,   "marble": 29846 },   // level 19
		{ "wood": 27074,   "marble": 36566 },   // level 20
		{ "wood": 32614,   "marble": 44764 },   // level 21
		{ "wood": 39261,   "marble": 54765 },   // level 22
		{ "wood": 47239,   "marble": 66967 },   // level 23
		{ "wood": 56811,   "marble": 81853 },   // level 24
		{ "wood": 68299,   "marble": 100014 },  // level 25
		{ "wood": 82084,   "marble": 122170 },  // level 26
		{ "wood": 98625,   "marble": 149201 },  // level 27
		{ "wood": 118475,  "marble": 182178 },  // level 28
		{ "wood": 142295,  "marble": 222411 },  // level 29
		{ "wood": 170879,  "marble": 271495 },  // level 30
		{ "wood": 205180,  "marble": 331377 },  // level 31
		{ "wood": 246341,  "marble": 404433 }   // level 32
	],

	// Firework Test Area
	// Type of resources needed: Wood, Marble
	"fireworker": [
		{ "wood": 353,     "marble": 212 },     // level 2
		{ "wood": 445,     "marble": 302 },     // level 3
		{ "wood": 551,     "marble": 405 },     // level 4
		{ "wood": 673,     "marble": 526 },     // level 5
		{ "wood": 813,     "marble": 665 },     // level 6
		{ "wood": 974,     "marble": 827 },     // level 7
		{ "wood": 1159,    "marble": 1015 },    // level 8
		{ "wood": 1373,    "marble": 1233 },    // level 9
		{ "wood": 1618,    "marble": 1486 },    // level 10
		{ "wood": 1899,    "marble": 1779 },    // level 11
		{ "wood": 2223,    "marble": 2120 },    // level 12
		{ "wood": 2596,    "marble": 2514 },    // level 13
		{ "wood": 3025,    "marble": 2972 },    // level 14
		{ "wood": 3517,    "marble": 3503 },    // level 15
		{ "wood": 4084,    "marble": 4119 },    // level 16
		{ "wood": 4736,    "marble": 4834 },    // level 17
		{ "wood": 5485,    "marble": 5662 },    // level 18
		{ "wood": 6346,    "marble": 6623 },    // level 19
		{ "wood": 7338,    "marble": 7738 },    // level 20
		{ "wood": 8478,    "marble": 9032 },    // level 21
		{ "wood": 9790,    "marble": 10534 },   // level 22
		{ "wood": 11297,   "marble": 12275 },   // level 23
		{ "wood": 13030,   "marble": 13355 },   // level 24
		{ "wood": 14990,   "marble": 16636 },   // level 25
		{ "wood": 17317,   "marble": 19354 },   // level 26
		{ "wood": 19954,   "marble": 22507 },   // level 27
		{ "wood": 22986,   "marble": 26163 },   // level 28
		{ "wood": 26472,   "marble": 30404 },   // level 29
		{ "wood": 30484,   "marble": 35325 },   // level 30
		{ "wood": 35096,   "marble": 41033 },   // level 31
		{ "wood": 40399,   "marble": 47652 }    // level 32
	],

	// Forester's House
	// Type of resources needed: Wood, Marble
	"forester": [
		{ "wood": 430,     "marble": 104 },     // level 2
		{ "wood": 664,     "marble": 237 },     // level 3
		{ "wood": 968,     "marble": 410 },     // level 4
		{ "wood": 1364,    "marble": 635 },     // level 5
		{ "wood": 1878,    "marble": 928 },     // level 6
		{ "wood": 2546,    "marble": 1309 },    // level 7
		{ "wood": 3415,    "marble": 1803 },    // level 8
		{ "wood": 4544,    "marble": 2446 },    // level 9
		{ "wood": 6013,    "marble": 3282 },    // level 10
		{ "wood": 7922,    "marble": 4368 },    // level 11
		{ "wood": 10403,   "marble": 5781 },    // level 12
		{ "wood": 13629,   "marble": 7617 },    // level 13
		{ "wood": 17823,   "marble": 10004 },   // level 14
		{ "wood": 23274,   "marble": 13108 },   // level 15
		{ "wood": 30362,   "marble": 17142 },   // level 16
		{ "wood": 39574,   "marble": 22386 },   // level 17
		{ "wood": 51552,   "marble": 29204 },   // level 18
		{ "wood": 67123,   "marble": 38068 },   // level 19
		{ "wood": 87363,   "marble": 49589 },   // level 20
		{ "wood": 113680,  "marble": 64569 },   // level 21
		{ "wood": 147889,  "marble": 84041 },   // level 22
		{ "wood": 192360,  "marble": 109356 },  // level 23
		{ "wood": 250173,  "marble": 142266 },  // level 24
		{ "wood": 325330,  "marble": 185046 },  // level 25
		{ "wood": 423034,  "marble": 240663 },  // level 26
		{ "wood": 550049,  "marble": 312965 },  // level 27
		{ "wood": 715169,  "marble": 406956 },  // level 28
		{ "wood": 929826,  "marble": 529144 },  // level 29
		{ "wood": 1208878, "marble": 687989 },  // level 30
		{ "wood": 1571647, "marble": 894489 },  // level 31
		{ "wood": 2043246, "marble": 1162937 }  // level 32
	],

	// Glassblower
	// Type of resources needed: Wood, Marble
	"glassblowing": [
		{ "wood": 467,     "marble": 116 },     // level 2
		{ "wood": 718,     "marble": 255 },     // level 3
		{ "wood": 1045,    "marble": 436 },     // level 4
		{ "wood": 1469,    "marble": 671 },     // level 5
		{ "wood": 2021,    "marble": 977 },     // level 6
		{ "wood": 2738,    "marble": 1375 },    // level 7
		{ "wood": 3671,    "marble": 1892 },    // level 8
		{ "wood": 4883,    "marble": 2564 },    // level 9
		{ "wood": 6459,    "marble": 3437 },    // level 10
		{ "wood": 8508,    "marble": 4572 },    // level 11
		{ "wood": 11172,   "marble": 6049 },    // level 12
		{ "wood": 14634,   "marble": 7968 },    // level 13
		{ "wood": 19135,   "marble": 10462 },   // level 14
		{ "wood": 24987,   "marble": 13705 },   // level 15
		{ "wood": 32594,   "marble": 17921 },   // level 16
		{ "wood": 42483,   "marble": 23402 },   // level 17
		{ "wood": 55339,   "marble": 30527 },   // level 18
		{ "wood": 72050,   "marble": 39790 },   // level 19
		{ "wood": 93778,   "marble": 51830 },   // level 20
		{ "wood": 122021,  "marble": 67485 },   // level 21
		{ "wood": 158740,  "marble": 87835 },   // level 22
		{ "wood": 206471,  "marble": 114289 },  // level 23
		{ "wood": 268524,  "marble": 148680 },  // level 24
		{ "wood": 349194,  "marble": 193389 },  // level 25
		{ "wood": 454063,  "marble": 251512 },  // level 26
		{ "wood": 590393,  "marble": 327069 },  // level 27
		{ "wood": 767620,  "marble": 425294 },  // level 28
		{ "wood": 998018,  "marble": 552986 },  // level 29
		{ "wood": 1297536, "marble": 718988 },  // level 30
		{ "wood": 1686906, "marble": 934789 },  // level 31
		{ "wood": 2193089, "marble": 1215330 }  // level 32
	],

	// Museum
	// Type of resources needed: Wood, Marble
	"museum": [
		{ "wood": 1435,    "marble": 1190 },    // level 2
		{ "wood": 2748,    "marble": 2573 },    // level 3
		{ "wood": 4716,    "marble": 4676 },    // level 4
		{ "wood": 7669,    "marble": 7871 },    // level 5
		{ "wood": 12099,   "marble": 12729 },   // level 6
		{ "wood": 18744,   "marble": 20112 },   // level 7
		{ "wood": 28710,   "marble": 31335 },   // level 8
		{ "wood": 43661,   "marble": 48394 },   // level 9
		{ "wood": 66086,   "marble": 74323 },   // level 10
		{ "wood": 99724,   "marble": 113736 },  // level 11
		{ "wood": 150181,  "marble": 173643 },  // level 12
		{ "wood": 225866,  "marble": 264701 },  // level 13
		{ "wood": 339394,  "marble": 403110 },  // level 14
		{ "wood": 509686,  "marble": 613492 },  // level 15
		{ "wood": 765124,  "marble": 933272 },  // level 16
		{ "wood": 1148281, "marble": 1419338 }, // level 17
		{ "wood": 1723017, "marble": 2158158 }, // level 18
		{ "wood": 2585121, "marble": 3281165 }, // level 19
		{ "wood": 3878276, "marble": 4988136 }, // level 20
		{ "wood": 5818009, "marble": 7582731 }  // level 21
	],

	// Optician's
	// Type of resources needed: Wood, Marble
	"optician": [
		{ "wood": 188,     "marble": 35 },      // level 2
		{ "wood": 269,     "marble": 96 },      // level 3
		{ "wood": 362,     "marble": 167 },     // level 4
		{ "wood": 471,     "marble": 249 },     // level 5
		{ "wood": 597,     "marble": 345 },     // level 6
		{ "wood": 742,     "marble": 455 },     // level 7
		{ "wood": 912,     "marble": 584 },     // level 8
		{ "wood": 1108,    "marble": 733 },     // level 9
		{ "wood": 1335,    "marble": 905 },     // level 10
		{ "wood": 1600,    "marble": 1106 },    // level 11
		{ "wood": 1906,    "marble": 1338 },    // level 12
		{ "wood": 2261,    "marble": 1608 },    // level 13
		{ "wood": 2673,    "marble": 1921 },    // level 14
		{ "wood": 3152,    "marble": 2283 },    // level 15
		{ "wood": 3706,    "marble": 2704 },    // level 16
		{ "wood": 4348,    "marble": 3191 },    // level 17
		{ "wood": 5096,    "marble": 3759 },    // level 18
		{ "wood": 5962,    "marble": 4416 },    // level 19
		{ "wood": 6966,    "marble": 5178 },    // level 20
		{ "wood": 8131,    "marble": 6062 },    // level 21
		{ "wood": 9482,    "marble": 7087 },    // level 22
		{ "wood": 11050,   "marble": 8276 },    // level 23
		{ "wood": 12868,   "marble": 9656 },    // level 24
		{ "wood": 14978,   "marble": 11257 },   // level 25
		{ "wood": 17424,   "marble": 13113 },   // level 26
		{ "wood": 20262,   "marble": 15267 },   // level 27
		{ "wood": 23553,   "marble": 17762 },   // level 28
		{ "wood": 27373,   "marble": 20662 },   // level 29
		{ "wood": 31804,   "marble": 24024 },   // level 30
		{ "wood": 36943,   "marble": 27922 },   // level 31
		{ "wood": 42904,   "marble": 32447 }    // level 32
	],

	// Palace
	// Type of resources needed: Wood, Wine, Marble, Crystal, Sulfur
	"palace": [
		{ "wood": 5824,    "marble": 1434 },                                                            // level 2
		{ "wood": 16048,   "marble": 4546,    "sulfur": 3089 },                                         // level 3
		{ "wood": 36496,   "marble": 10770,   "sulfur": 10301,   "wine": 10898 },                       // level 4
		{ "wood": 77392,   "marble": 23218,   "sulfur": 24725,   "wine": 22110,   "crystal": 21188 },   // level 5
		{ "wood": 159184,  "marble": 48114,   "sulfur": 53573,   "wine": 44534,   "crystal": 42400 },   // level 6
		{ "wood": 322768,  "marble": 97906,   "sulfur": 111269,  "wine": 89382,   "crystal": 84824 },   // level 7
		{ "wood": 649936,  "marble": 197490,  "sulfur": 226661,  "wine": 179078,  "crystal": 169672 },  // level 8
		{ "wood": 1304272, "marble": 396658,  "sulfur": 457445,  "wine": 358470,  "crystal": 339368 },  // level 9
		{ "wood": 2612944, "marble": 794994,  "sulfur": 919013,  "wine": 717254,  "crystal": 678760 },  // level 10
		{ "wood": 4743518, "marble": 1591666, "sulfur": 1842149, "wine": 1434822, "crystal": 1357544 }  // level 11 max
	],
	
	// Governor's Residence
	// Type of resources needed: Wood, Wine, Marble, Crystal, Sulfur
	"palaceColony": [
		{ "wood": 5824,    "marble": 1434 },                                                            // level 2
		{ "wood": 16048,   "marble": 4546,    "sulfur": 3089 },                                         // level 3
		{ "wood": 36496,   "marble": 10770,   "sulfur": 10301,   "wine": 10898 },                       // level 4
		{ "wood": 77392,   "marble": 23218,   "sulfur": 24725,   "wine": 22110,   "crystal": 21188 },   // level 5
		{ "wood": 159184,  "marble": 48114,   "sulfur": 53573,   "wine": 44534,   "crystal": 42400 },   // level 6
		{ "wood": 322768,  "marble": 97906,   "sulfur": 111269,  "wine": 89382,   "crystal": 84824 },   // level 7
		{ "wood": 649936,  "marble": 197490,  "sulfur": 226661,  "wine": 179078,  "crystal": 169672 },  // level 8
		{ "wood": 1304272, "marble": 396658,  "sulfur": 457445,  "wine": 358470,  "crystal": 339368 },  // level 9
		{ "wood": 2612944, "marble": 794994,  "sulfur": 919013,  "wine": 717254,  "crystal": 678760 },  // level 10
		{ "wood": 4743518, "marble": 1591666, "sulfur": 1842149, "wine": 1434822, "crystal": 1357544 }  // level 11 max
	],

	// Pirate Fortress
	// Type of resources needed: Wood, Marble
	pirateFortress: [
		{ "wood": 906,     "marble": 505 },     // level 2
		{ "wood": 1389,    "marble": 783 },     // level 3
		{ "wood": 1935,    "marble": 1112 },    // level 4
		{ "wood": 2593,    "marble": 1534 },    // level 5
		{ "wood": 3427,    "marble": 2103 },    // level 6
		{ "wood": 4516,    "marble": 2883 },    // level 7
		{ "wood": 5950,    "marble": 3949 },    // level 8
		{ "wood": 7834,    "marble": 5388 },    // level 9
		{ "wood": 10284,   "marble": 7296 },    // level 10
		{ "wood": 13430,   "marble": 9782 },    // level 11
		{ "wood": 17415,   "marble": 12964 },   // level 12
		{ "wood": 22394,   "marble": 16970 },   // level 13
		{ "wood": 28534,   "marble": 21938 },   // level 14
		{ "wood": 36015,   "marble": 28019 },   // level 15
		{ "wood": 45029,   "marble": 35370 },   // level 16
		{ "wood": 55779,   "marble": 44162 },   // level 17
		{ "wood": 68482,   "marble": 54573 },   // level 18
		{ "wood": 83366,   "marble": 66793 },   // level 19
		{ "wood": 100671,  "marble": 81020 },   // level 20
		{ "wood": 120648,  "marble": 97463 },   // level 21
		{ "wood": 143562,  "marble": 116341 },  // level 22
		{ "wood": 169686,  "marble": 137883 },  // level 23
		{ "wood": 199309,  "marble": 162325 },  // level 24
		{ "wood": 232729,  "marble": 189915 },  // level 25
		{ "wood": 270255,  "marble": 220912 },  // level 26
		{ "wood": 312210,  "marble": 255580 },  // level 27
		{ "wood": 358926,  "marble": 294197 },  // level 28
		{ "wood": 410748,  "marble": 337048 },  // level 29
		{ "wood": 468032,  "marble": 384429 }   // level 30
	],

	// Trading port
	// Type of resources needed: Wood, Marble
	"port": [
		{ "wood": 150 },                        // level 2
		{ "wood": 274 },                        // level 3
		{ "wood": 429 },                        // level 4
		{ "wood": 637 },                        // level 5
		{ "wood": 894,     "marble": 176 },     // level 6
		{ "wood": 1207,    "marble": 326 },     // level 7
		{ "wood": 1645,    "marble": 540 },     // level 8
		{ "wood": 2106,    "marble": 791 },     // level 9
		{ "wood": 2735,    "marble": 1138 },    // level 10
		{ "wood": 3537,    "marble": 1598 },    // level 11
		{ "wood": 4492,    "marble": 2176 },    // level 12
		{ "wood": 5689,    "marble": 2928 },    // level 13
		{ "wood": 7103,    "marble": 3859 },    // level 14
		{ "wood": 8849,    "marble": 5051 },    // level 15
		{ "wood": 11094,   "marble": 6628 },    // level 16
		{ "wood": 13731,   "marble": 8566 },    // level 17
		{ "wood": 17062,   "marble": 11089 },   // level 18
		{ "wood": 21097,   "marble": 14265 },   // level 19
		{ "wood": 25965,   "marble": 18241 },   // level 20
		{ "wood": 31810,   "marble": 23197 },   // level 21
		{ "wood": 39190,   "marble": 29642 },   // level 22
		{ "wood": 47998,   "marble": 37636 },   // level 23
		{ "wood": 58713,   "marble": 47703 },   // level 24
		{ "wood": 71955,   "marble": 60556 },   // level 25
		{ "wood": 87627,   "marble": 76367 },   // level 26
		{ "wood": 107102,  "marble": 96639 },   // level 27
		{ "wood": 130776,  "marble": 122156 },  // level 28
		{ "wood": 159019,  "marble": 153754 },  // level 29
		{ "wood": 193938,  "marble": 194089 },  // level 30
		{ "wood": 235849,  "marble": 244300 },  // level 31
		{ "wood": 286515,  "marble": 307174 },  // level 32
		{ "wood": 348718,  "marble": 386956 },  // level 33
		{ "wood": 423990,  "marble": 486969 },  // level 34
		{ "wood": 513947,  "marble": 610992 },  // level 35
		{ "wood": 625160,  "marble": 769302 },  // level 36
		{ "wood": 758178,  "marble": 965792 },  // level 37
		{ "wood": 919693,  "marble": 1212790 }, // level 38
		{ "wood": 1116013, "marble": 1523570 }, // level 39
		{ "wood": 1353517, "marble": 1913073 }, // level 40
		{ "wood": 1642275, "marble": 2403314 }, // level 41
		{ "wood": 1990224, "marble": 3015689 }, // level 42
		{ "wood": 2411062, "marble": 3782993 }, // level 43
		{ "wood": 2923229, "marble": 4749576 }, // level 44
		{ "wood": 3541580, "marble": 5959027 }, // level 45
		{ "wood": 4291524, "marble": 7478201 }, // level 46
		{ "wood": 5199343, "marble": 9383420 }  // level 47 max
	],

	//Hideout
	// Type of resources needed: Wood, Marble
	"safehouse": [
		{ "wood": 248 },                        // level 2
		{ "wood": 402 },                        // level 3
		{ "wood": 578,     "marble": 129 },     // level 4
		{ "wood": 779,     "marble": 197 },     // level 5
		{ "wood": 1007,    "marble": 275 },     // level 6
		{ "wood": 1267,    "marble": 366 },     // level 7
		{ "wood": 1564,    "marble": 471 },     // level 8
		{ "wood": 1903,    "marble": 593 },     // level 9
		{ "wood": 2288,    "marble": 735 },     // level 10
		{ "wood": 2728,    "marble": 900 },     // level 11
		{ "wood": 3230,    "marble": 1090 },    // level 12
		{ "wood": 3801,    "marble": 1312 },    // level 13
		{ "wood": 4453,    "marble": 1569 },    // level 14
		{ "wood": 5195,    "marble": 1866 },    // level 15
		{ "wood": 6042,    "marble": 2212 },    // level 16
		{ "wood": 7008,    "marble": 2613 },    // level 17
		{ "wood": 8108,    "marble": 3078 },    // level 18
		{ "wood": 9363,    "marble": 3617 },    // level 19
		{ "wood": 10793,   "marble": 4243 },    // level 20
		{ "wood": 12423,   "marble": 4968 },    // level 21
		{ "wood": 14282,   "marble": 5810 },    // level 22
		{ "wood": 16401,   "marble": 6787 },    // level 23
		{ "wood": 18816,   "marble": 7919 },    // level 24
		{ "wood": 21570,   "marble": 9233 },    // level 25
		{ "wood": 24709,   "marble": 10758 },   // level 26
		{ "wood": 28288,   "marble": 12526 },   // level 27
		{ "wood": 32368,   "marble": 14577 },   // level 28
		{ "wood": 37019,   "marble": 16956 },   // level 29
		{ "wood": 42321,   "marble": 19716 },   // level 30
		{ "wood": 48365,   "marble": 22917 },   // level 31
		{ "wood": 55255,   "marble": 26631 }    // level 32
	],

	// Shipyard
	// Type of resources needed: Wood, Marble
	"shipyard": [
		{ "wood": 202 },                        // level 2
		{ "wood": 324 },                        // level 3
		{ "wood": 477 },                        // level 4
		{ "wood": 671 },                        // level 5
		{ "wood": 914,     "marble": 778 },     // level 6
		{ "wood": 1222,    "marble": 1052 },    // level 7
		{ "wood": 1609,    "marble": 1397 },    // level 8
		{ "wood": 2096,    "marble": 1832 },    // level 9
		{ "wood": 2711,    "marble": 2381 },    // level 10
		{ "wood": 3485,    "marble": 3071 },    // level 11
		{ "wood": 4460,    "marble": 3942 },    // level 12
		{ "wood": 5689,    "marble": 5038 },    // level 13
		{ "wood": 7238,    "marble": 6420 },    // level 14
		{ "wood": 9190,    "marble": 8161 },    // level 15
		{ "wood": 11648,   "marble": 10354 },   // level 16
		{ "wood": 14746,   "marble": 13118 },   // level 17
		{ "wood": 18649,   "marble": 16601 },   // level 18
		{ "wood": 23568,   "marble": 20989 },   // level 19
		{ "wood": 29765,   "marble": 26517 },   // level 20
		{ "wood": 37573,   "marble": 33484 },   // level 21
		{ "wood": 47412,   "marble": 42261 },   // level 22
		{ "wood": 59808,   "marble": 53321 },   // level 23
		{ "wood": 75428,   "marble": 67256 },   // level 24
		{ "wood": 95108,   "marble": 84814 },   // level 25
		{ "wood": 119906,  "marble": 106938 },  // level 26
		{ "wood": 151151,  "marble": 134814 },  // level 27
		{ "wood": 190520,  "marble": 169937 },  // level 28
		{ "wood": 240124,  "marble": 214192 },  // level 29
		{ "wood": 302626,  "marble": 269954 },  // level 30
		{ "wood": 381378,  "marble": 340214 },  // level 31
		{ "wood": 480605,  "marble": 428741 }   // level 32
	],

	//Stonemason
	// Type of resources needed: Wood, Marble
	"stonemason": [
		{ "wood": 467,     "marble": 116 },     // level 2
		{ "wood": 718,     "marble": 255 },     // level 3
		{ "wood": 1045,    "marble": 436 },     // level 4
		{ "wood": 1469,    "marble": 671 },     // level 5
		{ "wood": 2021,    "marble": 977 },     // level 6
		{ "wood": 2738,    "marble": 1375 },    // level 7
		{ "wood": 3671,    "marble": 1892 },    // level 8
		{ "wood": 4883,    "marble": 2564 },    // level 9
		{ "wood": 6459,    "marble": 3437 },    // level 10
		{ "wood": 8508,    "marble": 4572 },    // level 11
		{ "wood": 11172,   "marble": 6049 },    // level 12
		{ "wood": 14634,   "marble": 7968 },    // level 13
		{ "wood": 19135,   "marble": 10462 },   // level 14
		{ "wood": 24987,   "marble": 13705 },   // level 15
		{ "wood": 32594,   "marble": 17921 },   // level 16
		{ "wood": 42483,   "marble": 23402 },   // level 17
		{ "wood": 55339,   "marble": 30527 },   // level 18
		{ "wood": 72050,   "marble": 39790 },   // level 19
		{ "wood": 93778,   "marble": 51830 },   // level 20
		{ "wood": 122021,  "marble": 67485 },   // level 21
		{ "wood": 158740,  "marble": 87835 },   // level 22
		{ "wood": 206471,  "marble": 114289 },  // level 23
		{ "wood": 268524,  "marble": 148680 },  // level 24
		{ "wood": 349194,  "marble": 193389 },  // level 25
		{ "wood": 454063,  "marble": 251512 },  // level 26
		{ "wood": 590393,  "marble": 327069 },  // level 27
		{ "wood": 767620,  "marble": 425294 },  // level 28
		{ "wood": 998018,  "marble": 552986 },  // level 29
		{ "wood": 1297536, "marble": 718988 },  // level 30
		{ "wood": 1686906, "marble": 934789 },  // level 31
		{ "wood": 2193089, "marble": 1215330 }  // level 32
	],

	//Tavern
	// Type of resources needed: Wood, Marble
	"tavern": [
		{ "wood": 222 },                        // level 2
		{ "wood": 367 },                        // level 3
		{ "wood": 541,     "marble": 94 },      // level 4
		{ "wood": 750,     "marble": 122 },     // level 5
		{ "wood": 1001,    "marble": 158 },     // level 6
		{ "wood": 1302,    "marble": 206 },     // level 7
		{ "wood": 1663,    "marble": 267 },     // level 8
		{ "wood": 2097,    "marble": 348 },     // level 9
		{ "wood": 2617,    "marble": 452 },     // level 10
		{ "wood": 3241,    "marble": 587 },     // level 11
		{ "wood": 3990,    "marble": 764 },     // level 12
		{ "wood": 4888,    "marble": 993 },     // level 13
		{ "wood": 5967,    "marble": 1290 },    // level 14
		{ "wood": 7261,    "marble": 1677 },    // level 15
		{ "wood": 8814,    "marble": 2181 },    // level 16
		{ "wood": 10678,   "marble": 2835 },    // level 17
		{ "wood": 12914,   "marble": 3685 },    // level 18
		{ "wood": 15598,   "marble": 4791 },    // level 19
		{ "wood": 18818,   "marble": 6228 },    // level 20
		{ "wood": 22683,   "marble": 8097 },    // level 21
		{ "wood": 27320,   "marble": 10526 },   // level 22
		{ "wood": 32885,   "marble": 13684 },   // level 23
		{ "wood": 39562,   "marble": 17789 },   // level 24
		{ "wood": 47576,   "marble": 23125 },   // level 25
		{ "wood": 57192,   "marble": 30063 },   // level 26
		{ "wood": 68731,   "marble": 39082 },   // level 27
		{ "wood": 82578,   "marble": 50806 },   // level 28
		{ "wood": 99194,   "marble": 66048 },   // level 29
		{ "wood": 119134,  "marble": 85862 },   // level 30
		{ "wood": 143061,  "marble": 111621 },  // level 31
		{ "wood": 171774,  "marble": 145107 },  // level 32
		{ "wood": 206230,  "marble": 188640 },  // level 33
		{ "wood": 247577,  "marble": 245232 },  // level 34
		{ "wood": 297193,  "marble": 318801 },  // level 35
		{ "wood": 356732,  "marble": 414441 },  // level 36
		{ "wood": 428179,  "marble": 538774 },  // level 37
		{ "wood": 513916,  "marble": 700406 },  // level 38
		{ "wood": 616800,  "marble": 910528 },  // level 39
		{ "wood": 740261,  "marble": 1183686 }, // level 40
		{ "wood": 888413,  "marble": 1538791 }, // level 41
		{ "wood": 1066197, "marble": 2000428 }, // level 42
		{ "wood": 1279538, "marble": 2600558 }, // level 43
		{ "wood": 1535545, "marble": 3380726 }, // level 44
		{ "wood": 1842756, "marble": 4394943 }, // level 45
		{ "wood": 2211407, "marble": 5713425 }, // level 46
		{ "wood": 2653789, "marble": 7427454 }  // level 47 max
	],
	
	// Temple
	// Type of resources needed: Wood, Crystal
	"temple": [
		{ "wood": 228,     "crystal": 190 },     // level 2
		{ "wood": 333,     "crystal": 290 },     // level 3
		{ "wood": 465,     "crystal": 423 },     // level 4
		{ "wood": 598,     "crystal": 567 },     // level 5
		{ "wood": 760,     "crystal": 752 },     // level 6
		{ "wood": 958,     "crystal": 989 },     // level 7
		{ "wood": 1197,    "crystal": 1290 },    // level 8
		{ "wood": 1432,    "crystal": 1610 },    // level 9
		{ "wood": 1773,    "crystal": 2080 },    // level 10
		{ "wood": 2112,    "crystal": 2586 },    // level 11
		{ "wood": 2512,    "crystal": 3210 },    // level 12
		{ "wood": 3082,    "crystal": 4109 },    // level 13
		{ "wood": 3655,    "crystal": 5084 },    // level 14
		{ "wood": 4458,    "crystal": 6471 },    // level 15
		{ "wood": 5126,    "crystal": 7765 },    // level 16
		{ "wood": 6232,    "crystal": 9851 },    // level 17
		{ "wood": 7167,    "crystal": 11821 },   // level 18
		{ "wood": 8688,    "crystal": 14952 },   // level 19
		{ "wood": 10247,   "crystal": 18402 },   // level 20
		{ "wood": 11784,   "crystal": 22082 },   // level 21
		{ "wood": 14229,   "crystal": 27824 },   // level 22
		{ "wood": 16753,   "crystal": 34184 },   // level 23
		{ "wood": 19266,   "crystal": 41020 },   // level 24
		{ "wood": 23156,   "crystal": 51514 },   // level 25
		{ "wood": 26664,   "crystal": 61817 },   // level 26
		{ "wood": 32027,   "crystal": 77477 },   // level 27
		{ "wood": 36831,   "crystal": 92972 },   // level 28
		{ "wood": 43257,   "crystal": 113941 },  // level 29
		{ "wood": 50782,   "crystal": 139577 },  // level 30
		{ "wood": 59591,   "crystal": 170911 },  // level 31
		{ "wood": 68529,   "crystal": 205093 }   // level 32
	],


	// Town Hall
	// Type of resources needed: Wood, Marble
	"townHall": [
		{ "wood": 158 },                        // level 2
		{ "wood": 335 },                        // level 3
		{ "wood": 623 },                        // level 4
		{ "wood": 923,     "marble": 285 },     // level 5
		{ "wood": 1390,    "marble": 551 },     // level 6
		{ "wood": 2015,    "marble": 936 },     // level 7
		{ "wood": 2706,    "marble": 1411 },    // level 8
		{ "wood": 3661,    "marble": 2091 },    // level 9
		{ "wood": 4776,    "marble": 2945 },    // level 10
		{ "wood": 6173,    "marble": 4072 },    // level 11
		{ "wood": 8074,    "marble": 5664 },    // level 12
		{ "wood": 10281,   "marble": 7637 },    // level 13
		{ "wood": 13023,   "marble": 10214 },   // level 14
		{ "wood": 16424,   "marble": 13575 },   // level 15
		{ "wood": 20986,   "marble": 18254 },   // level 16
		{ "wood": 25423,   "marble": 23250 },   // level 17
		{ "wood": 32285,   "marble": 31022 },   // level 18
		{ "wood": 40232,   "marble": 40599 },   // level 19
		{ "wood": 49286,   "marble": 52216 },   // level 20
		{ "wood": 61207,   "marble": 68069 },   // level 21
		{ "wood": 74804,   "marble": 87316 },   // level 22
		{ "wood": 93956,   "marble": 115101 },  // level 23
		{ "wood": 113035,  "marble": 145326 },  // level 24
		{ "wood": 141594,  "marble": 191053 },  // level 25
		{ "wood": 170213,  "marble": 241039 },  // level 26
		{ "wood": 210011,  "marble": 312128 },  // level 27
		{ "wood": 258875,  "marble": 403825 },  // level 28
		{ "wood": 314902,  "marble": 515593 },  // level 29
		{ "wood": 387657,  "marble": 666229 },  // level 30
		{ "wood": 471194,  "marble": 850031 },  // level 31
		{ "wood": 572581,  "marble": 1084293 }, // level 32
		{ "wood": 695617,  "marble": 1382827 }, // level 33
		{ "wood": 854729,  "marble": 1783721 }, // level 34
		{ "wood": 1037816, "marble": 2273687 }, // level 35
		{ "wood": 1274043, "marble": 2930330 }, // level 36
		{ "wood": 1529212, "marble": 3692591 }, // level 37
		{ "wood": 1876201, "marble": 4756439 }, // level 38
		{ "wood": 2276286, "marble": 6058643 }, // level 39
		{ "wood": 2761291, "marble": 7716366 }  // level 40 max
	],

	// Wine Press
	// Type of resources needed: Wood, Marble
	"vineyard": [
		{ "wood": 423,     "marble": 198 },     // level 2
		{ "wood": 520,     "marble": 285 },     // level 3
		{ "wood": 631,     "marble": 387 },     // level 4
		{ "wood": 758,     "marble": 504 },     // level 5
		{ "wood": 905,     "marble": 640 },     // level 6
		{ "wood": 1074,    "marble": 798 },     // level 7
		{ "wood": 1269,    "marble": 981 },     // level 8
		{ "wood": 1492,    "marble": 1194 },    // level 9
		{ "wood": 1749,    "marble": 1440 },    // level 10
		{ "wood": 2045,    "marble": 1726 },    // level 11
		{ "wood": 2384,    "marble": 2058 },    // level 12
		{ "wood": 2775,    "marble": 2443 },    // level 13
		{ "wood": 3225,    "marble": 2889 },    // level 14
		{ "wood": 3741,    "marble": 3407 },    // level 15
		{ "wood": 4336,    "marble": 4008 },    // level 16
		{ "wood": 5019,    "marble": 4705 },    // level 17
		{ "wood": 5813,    "marble": 5513 },    // level 18
		{ "wood": 6875,    "marble": 6450 },    // level 19
		{ "wood": 7941,    "marble": 7537 },    // level 20
		{ "wood": 8944,    "marble": 8800 },    // level 21
		{ "wood": 10319,   "marble": 10263 },   // level 22
		{ "wood": 11900,   "marble": 11961 },   // level 23
		{ "wood": 13718,   "marble": 13930 },   // level 24
		{ "wood": 15809,   "marble": 16214 },   // level 25
		{ "wood": 18215,   "marble": 18864 },   // level 26
		{ "wood": 20978,   "marble": 21938 },   // level 27
		{ "wood": 24159,   "marble": 25503 },   // level 28
		{ "wood": 27816,   "marble": 29639 },   // level 29
		{ "wood": 32021,   "marble": 34437 },   // level 30
		{ "wood": 36857,   "marble": 40002 },   // level 31
		{ "wood": 42419,   "marble": 46457 }    // level 32
	],
	
	//Town Wall
	// Type of resources needed: Wood, Marble
	"wall": [
		{ "wood": 361,     "marble": 203 },     // level 2
		{ "wood": 657,     "marble": 516 },     // level 3
		{ "wood": 1012,    "marble": 892 },     // level 4
		{ "wood": 1439,    "marble": 1344 },    // level 5
		{ "wood": 1951,    "marble": 1885 },    // level 6
		{ "wood": 2565,    "marble": 2535 },    // level 7
		{ "wood": 3302,    "marble": 3315 },    // level 8
		{ "wood": 4186,    "marble": 4251 },    // level 9
		{ "wood": 5247,    "marble": 5374 },    // level 10
		{ "wood": 6521,    "marble": 6721 },    // level 11
		{ "wood": 8049,    "marble": 8338 },    // level 12
		{ "wood": 9882,    "marble": 10279 },   // level 13
		{ "wood": 12083,   "marble": 12608 },   // level 14
		{ "wood": 14724,   "marble": 15402 },   // level 15
		{ "wood": 17892,   "marble": 18755 },   // level 16
		{ "wood": 21695,   "marble": 22779 },   // level 17
		{ "wood": 26258,   "marble": 27607 },   // level 18
		{ "wood": 31733,   "marble": 33402 },   // level 19
		{ "wood": 38304,   "marble": 40355 },   // level 20
		{ "wood": 46189,   "marble": 48699 },   // level 21
		{ "wood": 55650,   "marble": 58711 },   // level 22
		{ "wood": 67004,   "marble": 70726 },   // level 23
		{ "wood": 80629,   "marble": 85144 },   // level 24
		{ "wood": 96979,   "marble": 102446 },  // level 25
		{ "wood": 116599,  "marble": 123208 },  // level 26
		{ "wood": 140143,  "marble": 148122 },  // level 27
		{ "wood": 168395,  "marble": 178019 },  // level 28
		{ "wood": 202298,  "marble": 213896 },  // level 29
		{ "wood": 242982,  "marble": 256948 },  // level 30
		{ "wood": 291802,  "marble": 308610 },  // level 31
		{ "wood": 350387,  "marble": 370605 },  // level 32
		{ "wood": 420688,  "marble": 444998 },  // level 33
		{ "wood": 505049,  "marble": 534270 },  // level 34
		{ "wood": 606284,  "marble": 641397 },  // level 35
		{ "wood": 727765,  "marble": 769949 },  // level 36
		{ "wood": 873541,  "marble": 924213 },  // level 37
		{ "wood": 1048473, "marble": 1109328 }, // level 38
		{ "wood": 1258393, "marble": 1331467 }, // level 39
		{ "wood": 1510294, "marble": 1598031 }, // level 40
		{ "wood": 1812577, "marble": 1917913 }, // level 41
		{ "wood": 2175317, "marble": 2301767 }, // level 42
		{ "wood": 2610603, "marble": 2762392 }, // level 43
		{ "wood": 3132948, "marble": 3315144 }, // level 44
		{ "wood": 3759764, "marble": 3978446 }, // level 45
		{ "wood": 4511941, "marble": 4774409 }, // level 46
		{ "wood": 5414554, "marble": 5729565 }, // level 47
		{ "wood": 6497687, "marble": 6875750 }  // level 48
	],

	// Warehouse
	// Type of resources needed: Wood, Marble
	"warehouse": [
		{ "wood": 288 },                        // level 2
		{ "wood": 442 },                        // level 3
		{ "wood": 626,     "marble": 96 },      // level 4
		{ "wood": 847,     "marble": 211 },     // level 5
		{ "wood": 1113,    "marble": 349 },     // level 6
		{ "wood": 1431,    "marble": 515 },     // level 7
		{ "wood": 1813,    "marble": 714 },     // level 8
		{ "wood": 2272,    "marble": 953 },     // level 9
		{ "wood": 2822,    "marble": 1240 },    // level 10
		{ "wood": 3483,    "marble": 1584 },    // level 11
		{ "wood": 4275,    "marble": 1997 },    // level 12
		{ "wood": 5226,    "marble": 2492 },    // level 13
		{ "wood": 6368,    "marble": 3086 },    // level 14
		{ "wood": 7737,    "marble": 3800 },    // level 15
		{ "wood": 9380,    "marble": 4656 },    // level 16
		{ "wood": 11353,   "marble": 5683 },    // level 17
		{ "wood": 13719,   "marble": 6915 },    // level 18
		{ "wood": 16559,   "marble": 8394 },    // level 19
		{ "wood": 19967,   "marble": 10169 },   // level 20
		{ "wood": 24056,   "marble": 12299 },   // level 21
		{ "wood": 28963,   "marble": 14855 },   // level 22
		{ "wood": 34852,   "marble": 17922 },   // level 23
		{ "wood": 41918,   "marble": 21602 },   // level 24
		{ "wood": 50398,   "marble": 26019 },   // level 25
		{ "wood": 60574,   "marble": 31319 },   // level 26
		{ "wood": 72784,   "marble": 37678 },   // level 27
		{ "wood": 87437,   "marble": 45310 },   // level 28
		{ "wood": 105021,  "marble": 54468 },   // level 29
		{ "wood": 126121,  "marble": 65458 },   // level 30
		{ "wood": 151441,  "marble": 78645 },   // level 31
		{ "wood": 181825,  "marble": 94471 },   // level 32
		{ "wood": 218286,  "marble": 113461 },  // level 33
		{ "wood": 262039,  "marble": 136249 },  // level 34
		{ "wood": 314543,  "marble": 163595 },  // level 35
		{ "wood": 377548,  "marble": 196409 },  // level 36
		{ "wood": 453153,  "marble": 235787 },  // level 37
		{ "wood": 543880,  "marble": 283041 },  // level 38
		{ "wood": 652752,  "marble": 339745 },  // level 39
		{ "wood": 783398,  "marble": 407790 }   // level 40
	],

	// Winegrower
	// Type of resources needed: Wood, Marble
	"winegrower": [
		{ "wood": 467,     "marble": 116 },     // level 2
		{ "wood": 718,     "marble": 255 },     // level 3
		{ "wood": 1045,    "marble": 436 },     // level 4
		{ "wood": 1469,    "marble": 671 },     // level 5
		{ "wood": 2021,    "marble": 977 },     // level 6
		{ "wood": 2738,    "marble": 1375 },    // level 7
		{ "wood": 3671,    "marble": 1892 },    // level 8
		{ "wood": 4883,    "marble": 2564 },    // level 9
		{ "wood": 6459,    "marble": 3437 },    // level 10
		{ "wood": 8508,    "marble": 4572 },    // level 11
		{ "wood": 11172,   "marble": 6049 },    // level 12
		{ "wood": 14634,   "marble": 7968 },    // level 13
		{ "wood": 19135,   "marble": 10462 },   // level 14
		{ "wood": 24987,   "marble": 13705 },   // level 15
		{ "wood": 32594,   "marble": 17921 },   // level 16
		{ "wood": 42483,   "marble": 23402 },   // level 17
		{ "wood": 55339,   "marble": 30527 },   // level 18
		{ "wood": 72050,   "marble": 39790 },   // level 19
		{ "wood": 93778,   "marble": 51830 },   // level 20
		{ "wood": 122021,  "marble": 67485 },   // level 21
		{ "wood": 158740,  "marble": 87835 },   // level 22
		{ "wood": 206471,  "marble": 114289 },  // level 23
		{ "wood": 268524,  "marble": 148680 },  // level 24
		{ "wood": 349194,  "marble": 193389 },  // level 25
		{ "wood": 454063,  "marble": 251512 },  // level 26
		{ "wood": 590393,  "marble": 327069 },  // level 27
		{ "wood": 767620,  "marble": 425294 },  // level 28
		{ "wood": 998018,  "marble": 552986 },  // level 29
		{ "wood": 1297536, "marble": 718988 },  // level 30
		{ "wood": 1686906, "marble": 934789 },  // level 31
		{ "wood": 2193089, "marble": 1215330 }  // level 32
	],

	// Workshop
	// Type of resources needed: Wood, Marble
	"workshop": [
		{ "wood": 383,     "marble": 167 },     // level 2
		{ "wood": 569,     "marble": 251 },     // level 3
		{ "wood": 781,     "marble": 349 },     // level 4
		{ "wood": 1023,    "marble": 461 },     // level 5
		{ "wood": 1299,    "marble": 592 },     // level 6
		{ "wood": 1613,    "marble": 744 },     // level 7
		{ "wood": 1971,    "marble": 920 },     // level 8
		{ "wood": 2380,    "marble": 1125 },    // level 9
		{ "wood": 2846,    "marble": 1362 },    // level 10
		{ "wood": 3377,    "marble": 1637 },    // level 11
		{ "wood": 3982,    "marble": 1956 },    // level 12
		{ "wood": 4671,    "marble": 2326 },    // level 13
		{ "wood": 5457,    "marble": 2755 },    // level 14
		{ "wood": 6355,    "marble": 3253 },    // level 15
		{ "wood": 7377,    "marble": 3831 },    // level 16
		{ "wood": 8542,    "marble": 4500 },    // level 17
		{ "wood": 9870,    "marble": 5279 },    // level 18
		{ "wood": 11385,   "marble": 6180 },    // level 19
		{ "wood": 13111,   "marble": 7226 },    // level 20
		{ "wood": 15078,   "marble": 8439 },    // level 21
		{ "wood": 17321,   "marble": 9847 },    // level 22
		{ "wood": 19481,   "marble": 11478 },   // level 23
		{ "wood": 22796,   "marble": 13373 },   // level 24
		{ "wood": 26119,   "marble": 15570 },   // level 25
		{ "wood": 29909,   "marble": 18118 },   // level 26
		{ "wood": 34228,   "marble": 21074 },   // level 27
		{ "wood": 39153,   "marble": 24503 },   // level 28
		{ "wood": 44766,   "marble": 28481 },   // level 29
		{ "wood": 51166,   "marble": 33095 },   // level 30
		{ "wood": 58462,   "marble": 38447 },   // level 31
		{ "wood": 66778,   "marble": 44656 }    // level 32
	]
};
