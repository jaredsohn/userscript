// ==UserScript==
// @name           Unpaginate MyAnimeList.net' Top Anime/Manga lists (microformat producer)
// @namespace      http://code.google.com/p/ecmanaut/
// @url            http://userscripts.org/scripts/source/57297.user.js
// @description    Marks up MyAnimeList.net' Top Anime/Manga lists with the pagination microformat.
// @require        http://updater.usotools.co.cc/57297.js?interval=1
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/$x$X.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/addmetainfo.js
// @require        http://ecmanaut.googlecode.com/svn/trunk/lib/gm/unpaginate.js
// @include        http://myanimelist.net/topmanga.php*
// @include        http://myanimelist.net/topanime.php*
// ==/UserScript==

// Note: This script does only half of the job, you must also install the "Unpaginate pagination microformated web pages" script -> http://userscripts.org/scripts/show/23175

unpaginate('//*[@id="rightcontent_nopad"]/div[3]/table/tbody/tr',
           '//*[@id="rightcontent_nopad"]/div/div[1]/a[starts-with(.,"Next")] | //*[@id="rightcontent_nopad"]/div[3]/div[@class="borderClass"]/a[starts-with(.,"Next")]',
           '//*[@id="rightcontent_nopad"]/div/div[@class="spaceit"]');

// "Check for updates" greasemonkey menu by USO Updater ( http://userscripts.org/guides/16 )
USO.updater.registerMenuUpdate();