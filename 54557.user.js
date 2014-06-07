// ==UserScript==
// @name          Newzbin Helper
// @description   Shows extra info for various categories on Nezbin. Caches content, and more!
// @include       http*://*.newzbin.com/*
// ==/UserScript==

// Coded by m4rc0 (klaas.vaak.temmes@gmail.com)

// Based on 
//			- Newzbin V3 IMDB Ratings with stars + descriptions (http://userscripts.org/scripts/show/23675)
//			- Newzbin IMDB Ratings (number), descriptions and rate filtering (with saving)http://userscripts.org/scripts/show/33755)
//			- NewzBin Poster Image Script (http://userscripts.org/scripts/show/38054)
//			- Google Enhanced black script (http://userscripts.org/scripts/show/12917)

// version 2.23.4 (12 september 2009)
//			- Rotten Tomatoes changed it's layout... changed script.

// version 2.23.3 (10 september 2009)
//			- !! FLUSH CACHE for the version !!
//			- optimized cache
//			- bugfix imdb
//			- bugfix rottentomatoes

// version 2.23 (6 september 2009)
//			- !! FLUSH CACHE for the version !!
//			- Added option to cache the boxshots or not. Default is no caching. 

// version 2.22 (4 september 2009)
//			- Added Gametrailers.com to FindOnTheWeb
//			- Added Colorpicker for report rating

// version 2.21 (1 september 2009)
//			- Category filter now has SavedSearches in front of categories
//			- Cleaned up code a little

// version 2.20 (31 august 2009)
//			- Fixed bug for unresponsive providers
//			- delayed popup FindOnTheWeb
//			- unresponsive providers with 404's, will not be hit 10 times.
//			- changed metacritic reference
//			- Added status indicator cache enabled - format: items_in_cache/num_of_cache_references/deleted_items - cache_size_in_bytes
//			- Added status indicator "hide bad reports" enabled
//			- Toggling setting in the menu will now refresh the page
//			- Changed the way how the script logs in at anidb.net


//== Constants
var const_imdb = 1;
var const_gamespot = 2;
var const_allmusic = 3;
var const_ign = 4;
var const_amazon_music = 5;
var const_amazon_games = 6;
var const_googlemusic = 7;
var const_discogs = 8;
var const_cduniverse = 9;
var const_tvrage = 10;
var const_anidb = 11;
var const_amazon_unknown = 12;
var const_amazon_tv = 13;
var const_amazon_movies = 14;
var const_zdnet = 15;
var const_amazon_books = 16;

var const_scriptFileURL = "http://userscripts.org/scripts/source/54557.user.js";
var const_scriptHomepageURL = "http://userscripts.org/scripts/show/54557"; 
var const_scriptVersionTimestap = 1252613927301;//GM_log(Date.now());
var const_scriptVersion = "2.23.5";

var const_anidbURL = "http://anidb.net/perl-bin/animedb.pl?show=main";

var CACHE_EXPIRE = 5 * 24 * 60 * 60 * 1000;
var CACHE_LEN = 1000;

var maxNumberRetriesReloadData = 10;

//=== Variables

var lightBoxEnabled = false;
var showFindOntheWebBox = true;

var reports = document.evaluate(
   "//tbody[@class='odd' or @class='odd-new' or @class='even' or @class='even-new']",
   document,
   null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
   null);

//Providers
var hideBadReport = GM_getValue("hideBadReport", true);
   
//IMDB   
var imdbLinkRegex = new RegExp("http:\/\/[a-z]+\.imdb\.com\/title\/tt([0-9]+)");
var imdbratingRegex = new RegExp("<b>([0-9]\.[0-9]+)\/10<\/b>[^>]+>([^<]+)votes<\/a>");
var imdbdescRegex = new RegExp("<h5>Plot:<\/h5>\\s+<div class=\"info-content\">\\s+([\\S\\s]+?)<\/div>");
var imdbcleancodeRegex = new RegExp("onClick=\"[\\s\\S]*';\""); 
var imdbgenreRegex = new RegExp("<h5>Genre:</h5>([\\s\\S]+?)more</a>");
var imdbcastRegex = new RegExp("<table class=\"cast\">[\\s\\S]*?</table>");
var imdbBoxshotRegex = new RegExp ("<a name=\"poster\" href=\"[^\"]+\" title=\"[^\"]+\"><img border=\"0\" alt=\"[^\"]+\" title=\"[^\"]+\" src=\"\([^\"]+\)\" \\/><\\/a>");

var enableGoodIMDBrating = GM_getValue("enableGoodIMDBrating", true);
var valueGoodIMDBrating = GM_getValue("valueGoodIMDBrating", "8");
var colorGoodIMDBrating = GM_getValue("colorGoodIMDBrating", "#CCFF99");

var enableBadIMDBrating = GM_getValue("enableBadIMDBrating", true);
var valueBadIMDBrating = GM_getValue("valueBadIMDBrating", "6");
var colorBadIMDBrating = GM_getValue("colorBadIMDBrating", "#FFCCFF");

//Rotten Tomatoes
var rottommeterRegex = new RegExp("<span class=\"percent\">([0-9]+)<\/span>");
var rottomreviewscountedRegex = new RegExp("<p>Reviews Counted:<span property=\"v:count\">[0-9]+<\/span><\/p>");
var rottomreviewsfreshRegex = new RegExp("<p id=\"tomatometer_data_fresh\">(Fresh:<span>[0-9]+<\/span>)<\/p>");
var rottomreviewsrottenRegex = new RegExp("<p id=\"tomatometer_data_rotten\">(Rotten:<span>[0-9]+<\/span>)<\/p>");
var rottomiconRegex = new RegExp("iconset iconset_rt_lg.([\\S]+)_lg");
var rottomratingRegex = new RegExp("<p>(Average Rating:<span>[0-9]\.?[0-9]?\/10)<\/span><\/p>");
var rottomconsensusRegex = new RegExp("<p id=\"consensus\"><span>Consensus:<\/span>([\\s\\S]+?)<\/p>");


var enableROTTOMinfo = GM_getValue("enableROTTOMinfo", true);

//Gamespot
var gamespotLinkRegex = new RegExp("http:\/\/[a-z.]+\.gamespot\.com(\/[a-zA-Z0-9\/+_-]+)(\.[a-z]+|)");
var gamespotRatingRegex = new RegExp ("score\">([0-9]\\.[0-9]+)<\\/a>");
var gamespotBoxshotRegex = new RegExp ("<img src=\"([\\S]+)\" alt=\"[0-9A-Za-z\\s-:;!\?,\\.'\(\)&]+Boxshot\" \/>");
var gamespotESRBRegex = new RegExp("<span class=\"label\">ESRB:<\\/span>[\\s]+<span class=\"data\">([^<]+)<\\/span>")
var gamespotDeveloperRegex = new RegExp("<li class=\"developer\">[\\s]+<span class=\"data\">[\\s]+<a href=\"\\/pages\\/company\\/index\\.php\\?company=[0-9]+\\\">([^<]+)<\\/a>");
var gamespotPublisherRegex = new RegExp("<li class=\"publisher\">[\\s]+<span class=\"data\">[\\s]+<a href=\"\\/pages\\/company\\/index\\.php\\?company=[0-9]+\\\">([^<]+)<\\/a>");
var gamespotDescriptionRegex = new RegExp("<p class=\"(?:product|review) deck\">([^<]+)<\\/p>");
var gamespotGenreRegex = new RegExp("<a href=\"\\/games.html\\?type=games\\&category=[^>]+>([^<]+)<\\/a>");
var gamespotVotesRegex = new RegExp("([0-9]+) vote");

var enableGoodGAMESPOTrating = GM_getValue("enableGoodGAMESPOTrating", true);
var valueGoodGAMESPOTrating = GM_getValue("valueGoodGAMESPOTrating", "8");
var colorGoodGAMESPOTrating = GM_getValue("colorGoodGAMESPOTrating", "#CCFF99");

var enableBadGAMESPOTrating = GM_getValue("enableBadGAMESPOTrating", true);
var valueBadGAMESPOTrating = GM_getValue("valueBadGAMESPOTrating", "6");
var colorBadGAMESPOTrating = GM_getValue("colorBadGAMESPOTrating", "#FFCCFF");

//Allmusic
var allmusicLinkRegex = new RegExp("http:\/\/(www\.)?allmusic\.com\/cg\/amg\.dll\\?p=amg\\&amp;sql=10:\\w+");
var allmusicRatingRegex = new RegExp("<td class=\"rating-stars\"><img src=\"[^\"]+\" alt=\"([0-9]\\.?[0-9]?) Stars\"");
var allmusicBoxshotRegex = new RegExp("http:\\/\\/image\\.allmusic\\.com\\/[^\"]+");
var allmusicLabelRegex = new RegExp("<span>Label<\/span>[\\s\\S]+?padding-left:5px;\">([^<]+)<\/td>");
var allmusicGenreRegex = new RegExp("<span>Genre<\/span>[\\s\\S]+?<ul><li><[^>]+>([\\S]+)<\/a><\/li>");
var allmusicReleaseDateRegex = new RegExp("<span>Release Date<\/span>[\\s\\S]+?padding-left:5px;\">([^<]+)<\/td>");
var allmusicRecordlengthRegex = new RegExp("<span>Time<\/span>[\\s\\S]+?padding-left:5px;\">([^<]+)<\/td>");
var allmusicIDRegex = new RegExp("10:\\w+");

var enableGoodALLMUSICrating = GM_getValue("enableGoodALLMUSICrating", true);
var valueGoodALLMUSICrating = GM_getValue("valueGoodALLMUSICrating", "8");
var colorGoodALLMUSICrating = GM_getValue("colorGoodALLMUSICrating", "#CCFF99");

var enableBadALLMUSICrating = GM_getValue("enableBadALLMUSICrating", true);
var valueBadALLMUSICrating = GM_getValue("valueBadALLMUSICrating", "6");
var colorBadALLMUSICrating = GM_getValue("colorBadALLMUSICrating", "#FFCCFF");

//IGN
var ignLinkRegex = new RegExp("http:\/\/[a-z.0-9]+\.com\/objects\/[0-9]+\/([0-9]+).html");
var ignRatingRegex = new RegExp("\"editorialRating\":\"([^\"]+)\"");
var ignDescriptionRegex =  new RegExp("<div class=\"contentBox\">[\\S\\s]+<p>([^<]+)<\/p>");
var ignGenreRegex =  new RegExp("<strong>Genre:<\/strong>[\\s\\S]+?<strong>([^<]+?)<\/strong>");
var ignPublisherRegex = new RegExp("<strong id=\"publisher\">[^>]+>([^<]+)<\/a>");
var ignDeveloperRegex = new RegExp("<strong id=\"developer\">[^>]+>([^<]+)<\/a>");
var ignESRBRegex = new RegExp("<strong>ESRB Rating:<\/strong>([^<]+)<br \/>")
var ignBoxshotRegex = new RegExp("<img id=\"gameDetailsBoxShotImg\" src=\"([^\"]+)\"");

var enableGoodIGNrating = GM_getValue("enableGoodIGNrating", true);
var valueGoodIGNrating = GM_getValue("valueGoodIGNrating", "8");
var colorGoodIGNrating = GM_getValue("colorGoodIGNrating", "#CCFF99");

var enableBadIGNrating = GM_getValue("enableBadIGNrating", true);
var valueBadIGNrating = GM_getValue("valueBadIGNrating", "6");
var colorBadIGNrating = GM_getValue("colorBadIGNrating", "#FFCCFF");

//Amazon
var amazonLinkRegex = new RegExp("http:\/\/[a-z]+\.amazon\.([a-z\.]{2,5}\/(?:[^\/]+\/)?dp\/[\\w-]+)");
var amazonRatingRegex = new RegExp("swSprite s_star_([0-9]_[0-9])");
var amazondescRegex = new RegExp("id=\"productDescription\">[\\S\\s]+?<div class=\"content\">([\\S\\s]+?)<\/div>");
var amazonLabelRegex = new RegExp("<[^>]+>Label:<[^>]+> ([^<]+)<\/li>");
var amazonReleaseDateRegex1 = new RegExp("<[^>]+>Audio CD<[^>]+> ([^<]+)<\/li>");
var amazonReleaseDateRegex2 = new RegExp("<[^>]+>Original Release Date:<[^>]+>([^<]+)<\/li>");
var amazonReleaseDateRegex3 = new RegExp("<[^>]+>DVD Release Date:<[^>]+>([^<]+)</li>");
var amazonBoxshotRegex = new RegExp("src=\"([^\"]+)\" id=\"prodImage\"");
var amazonGenreRegex =  new RegExp("<[^>]+>Genres:<[^>]+>[^>]+>([^<]+)<\/a>");
var amazonPublisherrRegex = new RegExp("<h1 class=\"parseasinTitle\">[\\s\\S]+?href[^>]+>([^<]+)<\/a>");
var amazonESRBRegex = new RegExp("<[^>]+>ESRB Rating:<[^>]+>[^>]+>([^<]+)<\/a>");
var amazonPEGIRegex = new RegExp(">PEGI<\/a> Rating: <\/b>([^<]+)<\/li>");
var amazonBBFCRegex = new RegExp(">BBFC<\/a> Rating: <\/b><img[^>]+>([^<]+)<\/li>");
var amazonVotesRegex = new RegExp("([0-9]+) customer review");
var amazonCastRegex = new RegExp("<b>Actors\\:<\/b>([\\S\\s]+?)<\/li>");

var enableGoodAMAZONrating = GM_getValue("enableGoodAMAZONrating", true);
var valueGoodAMAZONrating = GM_getValue("valueGoodAMAZONrating", "8");
var colorGoodAMAZONrating = GM_getValue("colorGoodAMAZONrating", "#CCFF99");

var enableBadAMAZONrating = GM_getValue("enableBadAMAZONrating", true);
var valueBadAMAZONrating = GM_getValue("valueBadAMAZONrating", "6");
var colorBadAMAZONrating = GM_getValue("colorBadAMAZONrating", "#FFCCFF");

//Google music
var googlemusicLinkRegex = new RegExp("http:\/\/[a-z]+\.google\.com\/musicl\\?lid=([\\w-]+)");
var googlemusicVotesRegex = new RegExp("([0-9]+) review");
var googlemusicReleaseDateRegex = new RegExp("<b>Year:<\/b>[^>]+>([^<]+)<\/font>");
var googlemusicBoxshotRegex = new RegExp("<img src=(http:\/\/froogle.google.com\/base_image[^\.]+.jpg)");

var enableGoodGOOGLEMUSICrating = GM_getValue("enableGoodGOOGLEMUSICrating", true);
var valueGoodGOOGLEMUSICrating = GM_getValue("valueGoodGOOGLEMUSICrating", "8");
var colorGoodGOOGLEMUSICrating = GM_getValue("colorGoodGOOGLEMUSICrating", "#CCFF99");

var enableBadGOOGLEMUSICrating = GM_getValue("enableBadGOOGLEMUSICrating", true);
var valueBadGOOGLEMUSICrating = GM_getValue("valueBadGOOGLEMUSICrating", "6");
var colorBadGOOGLEMUSICrating = GM_getValue("colorBadGOOGLEMUSICrating", "#FFCCFF");

//Discogs
var discogsLinkRegex = new RegExp("http:\/\/[a-z]+\.discogs\.com\/[^\/]+\/[\\S]+\/([0-9]+)");
var discogsRatingRegex = new RegExp("<td align=\"right\" valign=\"top\">Rating:<\/td>[\\s\\S]+?<b>([0-9]\.[0-9]+)<\/b>[^>]+>([0-9]+)");
var discogsLabelRegex = new RegExp("<td align=right>Label:<\/td><td>[\\s]+<[^>]+>([^<]+)<\/a>");
var discogsGenreRegex = new RegExp("<td align=right>Genre:<\/td><td>[\\s]+([^\\s]+)\\s+<\/td>");
var discogsReleaseDateRegex = new RegExp("<td align=right>Released:<\/td><td>([^<]+)<\/td>");
var discogsBoxshotRegex = new RegExp("<a href=\"\/viewimages\\?release=[0-9]+\">[^\"]+\"([^\"]+)");

var enableGoodDISCOGSrating = GM_getValue("enableGoodDISCOGSrating", true);
var valueGoodDISCOGSrating = GM_getValue("valueGoodDISCOGSrating", "8");
var colorGoodDISCOGSrating = GM_getValue("colorGoodDISCOGSrating", "#CCFF99");

var enableBadDISCOGSrating = GM_getValue("enableBadDISCOGSrating", true);
var valueBadDISCOGSrating = GM_getValue("valueBadDISCOGSrating", "6");
var colorBadDISCOGSrating = GM_getValue("colorBadDISCOGSrating", "#FFCCFF");

//CDuniverse
var cduniverseLinkRegex = new RegExp("http:\/\/[a-z]+\\.cduniverse\\.com\/productinfo\\.asp\\?pid=([0-9]+)");
var cduniverseRatingRegex = new RegExp("<img src='\/images\/stars[^']+' alt='([0-9]\.?[0-9]?) stars' border='0'>");
var cduniverseLabelRegex = new RegExp("<nobr>Label <\/nobr><\/td><td><[^>]+>([^<]+)<\/a><\/td>");
var cduniverseGenreRegex = new RegExp("<nobr>Category.<\/nobr>([\\S\\s]+)<nobr>Label.<\/nobr>");
var cduniverseReleaseDateRegex = new RegExp("<nobr>Release Date <\/nobr><\/td><td>([^<]+)<\/td>");
var cduniverseBoxshotRegex = new RegExp("http:\/\/cover[0-9]+\.cduniverse\.com\/[\\S]+\/[0-9]+\.jpg");
var cduniverseVotesRegex = new RegExp("([0-9]+) Customer Review");

var enableGoodCDUNIVERSErating = GM_getValue("enableGoodCDUNIVERSErating", true);
var valueGoodCDUNIVERSErating = GM_getValue("valueGoodCDUNIVERSErating", "8");
var colorGoodCDUNIVERSErating = GM_getValue("colorGoodCDUNIVERSErating", "#CCFF99");

var enableBadCDUNIVERSErating = GM_getValue("enableBadCDUNIVERSErating", true);
var valueBadCDUNIVERSErating = GM_getValue("valueBadCDUNIVERSErating", "6");
var colorBadCDUNIVERSErating = GM_getValue("colorBadCDUNIVERSErating", "#FFCCFF");

//TVrage
var tvrageLinkRegex1 = new RegExp("(http:\/\/([a-z]+\.)?tvrage\.com\/)(((?:shows\/)?[^\/]+)\/episodes\/[[0-9]+\/[0-9]+x[0-9]+)");
var tvrageLinkRegex2 = new RegExp("(http:\/\/([a-z]+\.)?tvrage\.com\/)(((?:shows\/)?[^\/|^\"]+))(\/episode_list\/[0-9]+)?");
var tvrageRatingRegex = new RegExp("<strong>([0-9\\.]+)\/10 \\((\\d+) Vote(?:s)? cast\\)");
var tvragedescRegex1 =  new RegExp("<div style='display:none' [^>^]+>(?:<center.*<\/center>)?([\\S\\s]+?)<\/div>");
//var tvragedescRegex2 =  new RegExp("<tr[\\s]+id='iconn1' >[\\S\\s]+?<\/table>([\\S\\s]+?)<br>");
var tvragedescRegex2 =  new RegExp("<tr[\\s]+id='iconn1' >[\\S\\s]+?<\/table>[\\S\\s]+?<br>[\\S\\s]+?<\/b>([\\S\\s]+?)<br>");
var tvragegenreRegex = new RegExp("<b>Genre: <\/b><\/td><td>([^<]+)<\/td>");
var tvrageBoxshotRegex = new RegExp("http://images\.tvrage\.com/shows/[0-9]+/[0-9]+\.[a-z]+");
var tvrageEpisodeSummaryRegex = new RegExp("<tr  id='ieconn2' >[\\s]+<td><table width='100%'><tr><td valign='top'><table width='100%'><tr><td>[\\s\\S]+?<br>[\\s\\S]+?<br>([\\s\\S]+?)<\/td><\/tr><tr><td>");

var enableGoodTVRAGErating = GM_getValue("enableGoodTVRAGErating", true);
var valueGoodTVRAGErating = GM_getValue("valueGoodTVRAGErating", "8");
var colorGoodTVRAGErating = GM_getValue("colorGoodTVRAGErating", "#CCFF99");

var enableBadTVRAGErating = GM_getValue("enableBadTVRAGErating", true);
var valueBadTVRAGErating = GM_getValue("valueBadTVRAGErating", "6");
var colorBadTVRAGErating = GM_getValue("colorBadTVRAGErating", "#FFCCFF");

//Anidb
var anidbLinkRegex1 = new RegExp("http:\/\/anidb.net\/a([0-9]+)");
var anidbLinkRegex2 = new RegExp("http:\/\/anidb.net\/perl-bin\/animedb\\.pl\\?show=anime\\&amp;aid=([0-9]+)");
var anidbRatingRegex = new RegExp("<th class=\"field\">Rating<\/th>[\\S\\s]+?aid=[0-9]+\">([0-9]+\\.[0-9]+)[^\\(]+\\(([0-9]+)\\)");
var anidbdescRegex =  new RegExp("<div class=\"desc\">[\\s]+([\\s\\S]+)<\/div><!--g_section info-->");
var anidbIDRegex1 = new RegExp("a([0-9]+)");
var anidbIDRegex2 = new RegExp("aid=([0-9]+)");
var anidbBoxshotRegex = new RegExp("http:\/\/img5\\.anidb\\.net\/pics\/anime\/[0-9]+\\.jp.?g");
var anidbgenreRegex = new RegExp("<th class=\"field\"><a href=\"animedb\\.pl\\?show=genren\">Categories<\/a><\/th>[\\s]+<[^>]+>([\\s\\S]+?)<\/a><\/td>");
var anidbReleaseDateRegex = new RegExp("<th class=\"field\">Year<\/th>[\\s]+<[^>]+>([^<]+)<\/td>");
var anidbLoggedInRegex = new RegExp("<li id=\"user-xauth\" class=\"user-xauth\" title=\"Login\"><button name=\"do.auth\" type=\"submit\" value=\"login\"><span>Login</span></button></li>");

var enableGoodANIDBrating = GM_getValue("enableGoodANIDBrating", true);
var valueGoodANIDBrating = GM_getValue("valueGoodANIDBrating", "8");
var colorGoodANIDBrating = GM_getValue("colorGoodANIDBrating", "#CCFF99");

var enableBadANIDBrating = GM_getValue("enableBadANIDBrating", true);
var valueBadANIDBrating = GM_getValue("valueBadANIDBrating", "6");
var colorBadANIDBrating = GM_getValue("colorBadANIDBrating", "#FFCCFF");

var anidbUsername = GM_getValue("anidbUsername", "");
var anidbPassword = GM_getValue("anidbPassword", "");

//ZDnet
var zdnetStripSearchStringRegex = new RegExp("([\\S\\s]+?)([v|V]\.?[0-9]+|[0-9]+)");
var zdnetdescRegex = new RegExp("<!-- \/\/dirSort -->[\\s\\S]+?<td width=\"99%\"><a[^>]+>[^<]+<\/a>([\\s\\S]+?)<");
var zdnetgenreRegex = new RegExp("<!-- \/\/dirSort -->[\\s\\S]+?<td width=\"99%\">[\\s\\S]+?<b>Tags:<\/b>[\\s]+([\\s\\S]+?)<cite>");
var zdnetreleasedateRegex = new RegExp("<!-- \/\/dirSort -->[\\s\\S]+?<td width=\"99%\">[\\s\\S]+?<cite>[\\s\\S]+<span>Date: <\/span>([^\\s]+)");
var zdnetdeveloperRegex = new RegExp("<!-- \/\/dirSort -->[\\s\\S]+?<td width=\"99%\">[\\s\\S]+?<cite>[\\s\\S]+<span>Company: <\/span>([^\\s]+)");


var zdnetabstractRegex =  new RegExp("<!-- \/\/dirSort -->[\\s\\S]+?<td width=\"99%\"><a href=\"([\\S]+)\">");


//Newzbin
var newzBinReportCategoryRegex = new RegExp("<a title=\"[^\"]+\" href=\"\/browse\/category\/.\/([a-z]+)\/\">[^<]+<\/a>");
var newzBinFaviconTitleRegex = new RegExp("http://[a-z]+\.([^//]+)");
var newzBinTitleRegex = new RegExp("<a href=\"\/browse\/post\/([0-9]+)\/\">([^>]+)<\/a>");
var newzBinSavedSearchesRegex = new RegExp("<optgroup label=\"SavedSearches\">[\\s\\S]+?<\/optgroup>");
var newzBinCategoriesRegex = new RegExp("<optgroup label=\"Categories\">[\\s\\S]+?<\/optgroup>");



//Userscript
var userscriptVersionRegex = new RegExp("__current_version\\:([0-9]+)\\|([^<]+)<");


//Cache
var CACHEEnable = GM_getValue("CACHEEnable",true);
var cache_items_deleted = GM_getValue("cache_items_deleted",0);
var cache_references = GM_getValue("cache_references",0);
var BOXSHOTCACHEEnable = GM_getValue("BOXSHOTCACHEEnable", false);

//Sabnzbd
var enableSABNZBD = GM_getValue("enableSABNZBD", false);
var sabnzbdURL = GM_getValue("sabnzbdURL", "http://192.168.1.6:8088/sabnzbd");
var sabnzbdAPIKEY = GM_getValue("sabnzbdAPIKEY", "");
var sabnzbdUsername = GM_getValue("sabnzbdUsername", "");
var sabnzbdPassword = GM_getValue("sabnzbdPassword", "");

//FindOnTheWeb
var fotwTHEPIRATEBAY = GM_getValue("fotwTHEPIRATEBAY", true);
var fotwNZBMATRIX = GM_getValue("fotwNZBMATRIX", true);
var fotwBTJUNKIE = GM_getValue("fotwBTJUNKIE", true);
var fotwGOOGLE = GM_getValue("fotwGOOGLE", true);
var fotwLASTFM = GM_getValue("fotwLASTFM", true);
var fotwYOUTUBE = GM_getValue("fotwYOUTUBE", true);
var fotwBLINKX = GM_getValue("fotwBLINKX ", true);
var fotwONDERTITELS = GM_getValue("fotwONDERTITELS", false);
var fotwNLONDERTITELS = GM_getValue("fotwNLONDERTITELS", false);
var fotwWIKIPEDIA = GM_getValue("fotwWIKIPEDIA", true);
var fotwZDNET = GM_getValue("fotwZDNET", true);
var fotwTVCOM = GM_getValue("fotwTVCOM", true);
var fotwVCDQ = GM_getValue("fotwVCDQ", true);
var fotwGAMERANKINGS = GM_getValue("fotwGAMERANKINGS", true);
var fotwMETACRITIC = GM_getValue("fotwMETACRITIC", true);
var fotwGAMETRAILERS = GM_getValue("fotwGAMETRAILERS", true);

//Images
var enabledStar = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPCAMAAAF/+oXTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAAe1BMVEUDAwHu5DPEvCq7syifmCKRix9VUhJHRA/x5zTPxi2wqCanoCSTjSCCfRx0bxlPTBEXFgWAehw2NAwGBQHh4eHQ0NDLy8vIyMi7u7u4uLizs7OioqKSkpKKiop/f393d3dsbGxqampfX19cXFxZWVlOTk4zMzMrKyvm5uZ5Mh5/AAAAKXRSTlP/////////////////////////////////////////////////////AFL0IIcAAAB4SURBVAgdBcFJYgEBAATADkIjljE3Ownq/y9MVYiGVIyj+HwEOfWUNDk7BwPyaNs+4tWvvgQQIDyfxG25vMmmbTexbtdi1s7E4XI5CBDgDgSuu+6uEPvFdtV2tV3sxe9327b9+RPuQ9t2uBPe08l8nE+mb4IjOOIfGrAU/nm1tBMAAAAASUVORK5CYII=' />";
var disabledStar = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAPCAMAAAAI/bVFAAAAAXNSR0IArs4c6QAAAHtQTFRF7uQzAwMBxLwqu7Mon5gikYsfVVISR0QP8ec0z8YtsKgmp6Akk40ggn0cdG8ZT0wRFxYFgHocNjQMBgUB4eHh0NDQy8vLyMjIu7u7uLi4s7OzoqKikpKSioqKf39/d3d3bGxsampqX19fXFxcWVlZTk5OMzMzKysr5ubmMcrJwAAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QcaCg8U5LTByAAAAG1JREFUCNdtzckOgCAMBNAiqHFBBXpywxX+/w+NRSMH59D0JZMMwE+WGJvaPswttvPzD9YUWBg73OjypkTEssk7gFXiG7kC7OmD+rirrCJULGwpkgqbpyCJk+R4kpks4Y40aj/B5PUY5vvoxrkAAD4Ht5yoW8UAAAAASUVORK5CYII=' />";;
var noBoxshot = "data:image/png;base64,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";
var gettingInfo = 'data:image/gif;base64,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';
var cacheInProgress = 'data:image/png;base64,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';
var cacheComplete = 'data:image/png;base64,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';
var SabnzbdLogo = "data:image/png;base64,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%3D";
var SabnzbdLogoDisabled = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAQCAQAAABjX+2PAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfZCAkSCQkDIZf/AAAA3klEQVQY023QsUoDURCF4e/ebNwiKVKJWFnaijbW2vluvoGP4LvYKWIliKiYLBFjzC47FpvoKp5ihuGfA2cmBTiKsVanZGDqKoEQ9uMyljGLKqqoYh7LuIhxhFBAYUepkNb+bNeWjmBo4dNCQshG6vViAQONd1NZUsoeXHegq6XGszeFwr1bNx4NfnCtVqk1Xtx5tVKKDT6JkQ9zK5WZwjk4dBwTxWmc2VOqNYYmhmhlBxpPUkjhj1oZbHe4XV/7t0fKm0fk79rNvbtpe66+sn9d+u62F+p3/zf5RpG+ANB6VjAuPcEAAAAAAElFTkSuQmCC';
var SabnzbdLogoAdded = 'data:image/png;base64,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';
var	tomato = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHHw4TDVZ/bLsAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAB9klEQVQoz5WSTUhUUQCFv/vmqWOOKJPhBIKhORQlOVGa69oUGInrIEoQB2oRQeCioEWL3EiQSxeBEAZR0T+pm4p+kEwzEZRSR7sz/kw6OvOcd9+9bSKnctO3O4tvcQ5H0NBVzl887w7Luw+vceBgE+evF4XYApErvrhVJx8vdCGnU8zdGEU0V9BcV0dL7eWxyranR3NFKzdM3e5meCzOmhDIMzWUNpaxMjTKpTet++6cHJZbisP7h2Rk/AuDHTMESw3tKQ/jKsIbFn3RCfKfvaev6p78Q0y0bpdVb99R7ddcvVKBf2adiw8S3D89Sc+xAJQEOPUxw4n+GPEWS/7uuFA6IG01iS9STNGecqwlh0xskcJHSQbLCqlJKgLrGnygdlezI3M8ZAGI+VnIF1gFNqKyDLcmiJsnSO7M59CEQ6Gj8fnABVLxOAA2AHl+SGXQiw7OhymMBpIKs+Jh/BYFQpDShqTRLFu+TdEcrkf3PwE7jV7KgtYwp7CXDMqGH8awrDXznoveG4bZX+N4Z89hrG3orwo94mBGsqiYx6olmBeGb55iPJthxHXY1R7dXDV0YSCkOjsxJUG8NUM6rVkwmmmjmHA3+JRe5bMNDV03iXQMhf55juxpkqq3l8XXr5AJyfesQ7I4QKD+CI1tUWqjL0NbXu5/+AknBeKmiexrfQAAAABJRU5ErkJggg==";
var	splat = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAYAAAC5tzfZAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kHHw4TI4qpYXQAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABtklEQVQoz52ST0iTcRzGP+9e3SZjk+nW3ii1w2R4aSk2Q0EkPEUOYtKoDjuoeNCTiHjqEp6UEEYRQQmCfw+KKF4ktYJKJfo3keGEWTp/OoK5mbXh9nabC7roc3sOD58v3+eRqBm0cUbl5ZrAqFs8W3BTZBWkhZe+4XLlfyFNrllcnaGu/juu2hSHzAGw/MQlHrXtikV/tfiHNNvvEAtbnXwMXeYkbKGqKkZsvxSAyQ/3abqjMjYxDXSeklaCkzR5ohjLNnCYfQTWJWQ5TZf3i7CVxFkPJEimY7x72iAAJGoGbXMDFWLqcxvm4l/Ef0roDRmMRjjJSAQ/qST2ZNS4naWIV8mSbndvKA9co0SCduxXM1gugc4MBYUqse1SfG5/NpAl+TwjQnGE0GklrBcyJP9IaGSVfFmDTg/Rgzx+bBqptPTQ3v9b0QCYLka4UatynJBZWTbhvGagWG/i9YvrHIaL8Nwso6vdwrfo49PvOQ0PWRofp/pKCyVKlELtEFanlnlkUjs+5l+9RF8Aoa855+V2tTbUKPwzzaSOEiTDlUyHGpXeezvi/ds33L3VSsfzY0U6z4z+Amsjm6y8tO2tAAAAAElFTkSuQmCC";
var	certifiedfresh = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAYAAACZ3F9/AAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kIExcoFjvZ+vkAAAKvSURBVCjPTcpJTxNhAIfx/ztLpy2dLggUsK1NihuWJhpcEAWD4oG4XDRxOWhMjB5cvoCfwAvEePGACUYTTUyMxoNGo0ETkYIGBFlEtEgrazemnXZm3pnXgzHxufwuD8F/XTsSqmiI0M5ASD+vm9Z2uwROJNzI7KzY9zMhvuh++qvw7yV/ieHW9ZXNmxqMXiqVWkdmKBo3ccgrgENi8Nh5aFn78HzSdu5qj3MCmAU51RTB3vZSKBbV3ii2YuT3CmFdnSJm0jJxihbCbgX9gyajBiPrpYrkyBfpQGbaOctfOCFyIT/t3tOudPxIMNYVk8ijoSB5HK/CQsIOt85jX1gj2ZLOdu8yPMqyUP9xkT7hZbnGf/qo974nEEHIW0Pyz7dB/FaNLW43wmsyvPFamNNVaOqqJaJXgl2UG98N4K4QlPkdYl0HBlfPMm1ilPiOtcGvJuHK5bD49RsKO4NYyVGskShQ/Mn8tZ9I0PNkpxDwMNfUkoqh+c8kEJ/CgC0M0yijVNJAU2XAKkCkOvjRHHyCTrZWl+BxMK8wtWQmD2of0OmMM3HGRiT3JDjLCaoC5oIGbkwE0TUkuJdovZxiPmqS91lzTlhS6Zi5ml5urDdruFY76LoU4OaQWaUo11HYVB75BI+9dob9IUrmUmJ6uWgbFp69TypHj1f2ZwTHybmIA8t5FV6eorDeBYswFNIGxBqCpEuGlikgmSqNPXg9n+Uu9bTEJm0Bt8XKOHRYBXgDi3keQVlFtLqICmKgTIHoxjxSeRVqla3hyu3dzcJa1jTyle6Oc/cMVNHij2KgfoCZFpVGFJOUKTSfzBsOuzD8MLlnpuSLtOz3B5DWDSH+VlG8zZ47lUXWN/5qMRXWuxcyF2/yVk5gVoGBcwjE1XvD7HecqI+0baj9/ss6kxlXi38A5SQ9x38FvysAAAAASUVORK5CYII=';
var tomatometer_bar_over_middle = 'data:image/gif;base64,R0lGODlhAQATAMQAANSQGOppAPBxAeNjANpdANBWAMZOALtFALhQFrZaLa9VL6lTNKNSOp9SQJxUR5lVS5hZUphbWf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABIALAAAAAABABMAAAUQoBRBj9Mwi5Igh1EQQyAAIQA7';
var tomatometer_bar_over_left = 'data:image/png;base64,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';
var tomatometer_bar_bg = 'data:image/gif;base64,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';
var spacer = 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAEBMgA7';
var searchReports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADOElEQVR42n2Tf0zUZRzHX8fxvbif3B3cCQdowOHUwGDhecuaIEvXcprOtogSy1o/lvbjjzZb1nIuXAuoZHm5haXH1pZarowtgbJo3prOLRBKjwgwjl93A7qDu+OOb88XYytdvbfn2bPP5/m8nufz+TyPSpOmIx6dQZEmTS/WEbSGdGbDU6SoU3FVbsHXdlpxVxesLD1aUr7O8KX3g1fnZblOMar+DyD04DLnqsbyyu235zlLCE6M41x5Jz93fsGp5nrVfwKEarLzi713b3oYo8nK5Pgoo8MDyCTR6XQk5yKc/8p7K0Boi81RdCZ9aRk5ebn8GQrQe6WLNHWCpTl2BgcHKFhehiSp8bWf+jfAbLFNZC93Z8haPfX7n8J9Vylmo4EfL/ioP9bK+s1P8FPrh3zW7GG1u4LLnWdVqpQUFEpjUek9LxoMmQTGRrjU+TlGWxb+kRjR2ShFdh2Zeomtu/djNC+hpWEPuYXFXO/rzpE0tw2rRKVDd6zZYOnyXcDjPUJtTQ3jogy5ehbo3/onyddGiM1O81LdaVqbX0NnyiAWmaoSN+hQ/Z37+xqjZU/vNT8DKVacWpicFUUVXnMGeL+5xtMuHTteeJeLbScJBn5HnSrtU6lUhxYBj5jsWS09V/0cvqLHZYGE8KSKMa+G73+Z4uC9USq2Pkk0MkPvxQ7UknQuOTe3UQHsM1mz3oojce7scX7QV+DrAaf1RgojMqxIXOe+zKu411aRbl0m0hldqI/ShButgE/Evp3rNqzn6/bv2NshAoOIdoFDA7tt7ZSvqeCVA2/T1HSU2MQEyGEltHAxBUXCSsa26h00vNdEX8RKIjJFevgy73g+RWvO5kTjQRJiU52nhdeffVSJefOfAEWyMkkGPQ/cX4Uk3kh/IE5oLMK8xsDmbZUceP4hLCY7J9s6eXxn7WM3A2rNNsfHyThYHPk4CkuQY2GmQ0Px3kvnDyuHv9zw0WBVWZHOtbqA7j9muBlAwSqXvKl6L4HffqXjjMc/HRrfLsxd5swcwtNBat9oRPw0eePaFQyNBm8FaPXGYxZ73q7h/p4lhcXusb5u34J9EfDcoSOMDfW740l513wy+cxfShM7AK2sxAgAAAAASUVORK5CYII=";
var FindSameArtist = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADGElEQVR42n2SXUxbZRjHf+eclhZaSkcBYSIrpa5toDA6Gj66SZzL2JxOiUadm16YGOOdFxrBmJhdzkQXNS5E47IoXhAzswUlu1ji/JhhS4yIM00QNNIORgcWCqWn5Xz4FmOySfR/8rw5ec77/73P+zxHstkd5PPrYJrYS52ouTWq7mpgcWEWi9VKR+/DjF/6HKGjvtCuD8IdMefo8OkBwzRPFpPS/wGEHt3hbz4Vvb/fW+9vZWkxhT/UxuR35zl35i3pPwFCb7Z1973S0rkfxWpnKTXH0s0Epq5hK3Niairfjg1vBQgd8QYiF3b39mNikPxjmtT8DIqmU2ZXuJFM0BiKYLNa+P7SudsAarauus6XbI7uk0tKHSSmf2Y5naLC6aCsNUZtY5jdvQeY/PIsF06dIBTbT/zKmCTKo0j5pqWrb6/LXU0mfZPF+VncFVXUxPro+H2K56cuc7HnMBOpNRyhMKffHRQWOyWoFTOQEQBpLNAWO6SqGW7dSOBrjhJs30t6+U9+1SVGPnubrjLhuS/KWv1OchYHucptLFy5xuTXX0mb9xB6wWKxDWlanmCkl3J3DYVsmqSrmq6pOF8sTLAsNpkaaOXgUhTWXz7BewOvu4qAThT5VY/n7n5PvQ82dIrVSOJRRSwUTH6R5/kts0qnmaPaAoUUlDwWZfin9IdFwEOVNfWjpS43amYFTS9gGsWhGMhiMitiHm/oG8RaQhwYv8pTVhvdG3nCsuhEpZt/rvCILCvni05TmMzNtMntMrsbccXXWW0Iohgq+vWr7IDw3wBZ4AzjU/H29B0ukabKC54mRvM/4Pbu5MXgMQ7e28Q7rz3JRi77vsSd2jxWFr211HrZXlHLsbkEaWc5+twsQ8Es0mrkMsvT16RcdtE09C0A3/Z7AjN1gTY0bzsjZwYJ7BHZJ3rQtx1Bmf2RTwZH2p/1RiaU5HV0rcC/ATT4dxkPHH9JOjsyNP1xfJzje/DTLD4cPgo9D3Kx6RkO+lySNCk6ra9tBQgdEtEq4uSAWILwkUfiuRoX3FqBOHSXwvjjYpy14r/4C22WNYyk2ZO4AAAAAElFTkSuQmCC";
var FindSameSerie = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC9ElEQVR42n2TXUxTZxjHf+e0tEWoRSs2OJhYagAr33RsM6aZ8YvgV6M3khgvjHhjjDdGSfRKY6ZRSbxwhi1mkO1uGKbZzDK/QjQavQBFY4yChCKCtJEilFNoz/E5wLJE3f5v3uR9n/c8v+fjfY9id2SQSMTBMHCkZ6JNjrPI8yWR4X6saWlUBzdz//plRDu9xeXNJdWrMq/+cuGIbhinTKPyfwDRtqU+f1Pgu1B+rq+UaOQtvuIyHt9pp+3SWeU/AaLTZd9sOOSvWStZOIi+HSQ6FMZIGbgWupjSJrh9peVTgGhLfmHl71XBEAY6g73PGX7Tg2roArczNNDHPIeFXI+Tew+eKFhscwBtIic7xzvgD6xRbekZhF92M/puCGemk4IVlSxdXk5pIEjX3+dp/skJiyoheuAy8eEGM42OlV9vWD0/K5sxcYq86ccla5+/CveSZehJlZGR19gtBtNKOtc6XrJtLbQ/+hXG9iEA5c/CslW1mjbGyOswXn+AoorVjEYixOOjUlkSVUZWBvzx2zP2NlbRfNLLse+fcKIxlppphGif1Wq/mEwmKKoM4sxajCbOYBWAgWq1ok68oKurgtafDXbtDvGwq5OvKlqvm4AaLOpht/uLkDvXC9MpzGwksxlnc9iI09ubwFZcx9TTu6yrW0DKU8PNS2f2m4BNCxfnXk2fn4U2FiOZmkKaLs767MWkNLTx9yTZjtavYs/zEtzYScdffjlssvxTwlZVtbQz42TGNM0G/2q9zEmOHtQ43rSe7nthSr/tlDDdcwBVBV2XtlLPJwqwd4+V5nN2FNcQvmUw4PCjPWvbIYdtykdfz4RVFJVsTw4jMcloUhr5ygP51XIyiGKV5qZisn40+xI/AniX5BX25BSsJL+ogunJCFdafhBzBka4iPZrOqGGhOw7y03C5wDk+cr12vqDyo22i/Q8vb9GTLfAJl5Om0zZ9jVA2o9yXXwWIKqVWWL+UJkuN+Ox6Jw5TZo2fUFg+2crnQV8AHpYMVMtQrQhAAAAAElFTkSuQmCC";
var FindSameSerieSeason = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADP0lEQVR42n2Ta0ybVRjHf+/bQttRSitjpaFFVi5dYVzSQgDBsJtZtsEQI8mmRj9oZMYPziyLftJoXMxc3IwzukFgZsPE4NjQRZikzCiwoUIUJCZLhp2AXGorWwtrub31lDhjtug/Oclznpznl+d2JI02gcXFOxCNotXpiYTnWW9Oxz87jjoujuKqGgY8FxDab3cWNeYXV+gvtX74qhKNHo05pf8DCD36YFbeiZKtdRnWrAICfh9ZzkJG+jpob3lX+k+A0DuF5TsP55XuEFloCfimCMxMEF1dQbNOT3QlQm9n6/0Aob0ZDtfn7qo6oihM/Xqd2ekx5Kgi4BqmJiewO13Eq1Vc85z/FyCyYEmx2CfzSrbJ8boEJm78zK25GRL1iWTnFWPPzGVzUTnff9VCc9MHFJXt4KcBj6RSxRGjfLu5bOfDBmMKQRHknx4nSdgbRWCaLYOwb5bBsXHCBgvp+W76G0XvQl5YDqbKMCsAUqejsGJXJBLkj99FiiLQ4dpK2D+Nd/QawU1bKHvmLSpzNeRnQ/BCH+d6Brl45uRu+cRo11odQg1qtebUysoim9xVmEQGk8N9JOx7jfpDL2AJ+HDnXOVq5dMclEJcP9JD80PbOPb8GSkGKEUlv5KcnFaXbLUjrSoEvUOE3I+x//1zOKY9HHqkRzzbw28H6lk6PUOgtZ7QvjYOvN79XQxQ/cAG6yWdwUgkFGR1YY5b8yFcH0exG+CzvQ2gKon1m4vSc+y+3YbGYKB7NMrJH1zcLaFWllUdiHEpsXGm2KhqGmeP7gqHS46ypM7mlxevEJ5aR7nnI1A6+WailCNfV/wNkEU/FeUTYT2xdrcUsP30MDW6L3hp40EWjFvwvf2j2M473By5iXtkif5Tn/JeUvU/GdzV2jaRZMJ57E8qzNCUYxXe9SipucgmvRhcN12Xi/AUdHC86XzzvQB7mi1zLNVs4kZNO9tz0nEaB3jD9iwqXVjMXsvl24/zpeZNhodC9Ha1SPcCsGW7lNrap6SzbccnI08OWqsdZhQtmONDzC0nomjA6/Ux1N9qxrjBdx9AaJc4+bEPxcvtEI7vTU7IrJTjTKK+AP7AcCPz/gaVMZXV5SX+ArzjReKg9s/aAAAAAElFTkSuQmCC";
var FindonTheWeb = "data:image/png;base64,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";
var generalError = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAFRklEQVR42sWWf2xTVRTHz23fa1+7tevasZVNVtnGNsXFFIEy2RLREWADhoKC6PwD/0EU/BETEzERE/EvE0ACWSRGQoQEJI75g4W4DIGaMkAWGS50Gz/WjI6WraU/1r729b3ruW9lSoCAfxBfcnZP173zOfec77l3BB7xQ/5XwKaZM21Gk6mppLq6zlZcXGnIy7Ox3yej0bGQ39/v93rdiXj8l+0XLoz9J8DbM2aUW4uKPn26oWF1ZW0tzwvCxBeUZt8iqi+lUtDv8Ui9XV0HQ4HAZzu93ssPBGysqHi/pr5+65zmZgOv16thCfu7bFD2GX2CPvukvo8gera9Xbzodm/+amBg230Bm8rLd9c2Nq6vrKsDDVEf0DBA1s8+jEJoFqDgT+biSvrdbnq6o6N1x+DghrsAGxyOj2fNm/f5EwsWgFajmTAMylYNA5E7N8sCM5MVBeTbK9ql48fhfHf3J7uuXftiEvDmtGkzywoLzz/T1KQzGI3AaTQUjUxfsgS0HEdHOjuJVi09megEZotBab7TSVjQkTNnaEaWSQb9ZCJBzx89Kl0LBmd97fP9pb6x3uH4zuV0rrVXVBCdVgtoVMdxpMDphOnLl9PIpUsk2NHByjUBUBRidrloYX09CXR3g6+jg6YzGZKWZUCjgcFBcrqnZ3/r0NDrpNxoNL5aWhp4sqYmJ9dkAgPPg8BxIOh0wOOaP3s2TFu1CmJ9fTDW3o61UcA0fz7YsJSjHg9cP3IE5EwGREmCJDP049Eo9PX2jrcNDxcxwJy3KivP2EtKaI5eT3IwsFGnowb09eizEpnmziXFa9ZAvLcX0oEAtS5cSELY0ODhw0RBYBpVlEynSQJlOy5JdFwUycj16/DNwMBc4jAYmj+orm7Lx+xzUZYmtBzUPQJAj8YhRIONNrpcYG9pUWsUPnkSQocOqbuRMOsUBk6KIozjGsc1lk5DGHeBc/EieUwQVn1YVfW9VRAoBicmDI4AahAEokMAz/NUy/PEtHgx2Jqb1R7Ezp4lY3v3UhmzljAY24GIWWPmEBVFigASRn+b1/sysfH8Cx9VVXVOzc2lZgSYEWDMAnjMnkOAZelSYluxAiKnToHo89GitWtJ7Nw5Gtyzh8j3AqRSxB+Pw5debwPRETJ1Y1nZZWdBgYDZTwIEhDEAZk2nrFxJbp04AdG2NjYPlEd5FrW00Gh3N/G3tkLmX4AYAqII6Ll5M7n76tVywgFwdVbrT6+VlS0qMBggC1BVVITqsa9eDaGuLriFNc8eHZDBrHWorpJ16yDsdoNv5061D1kAjCaTsP/KlWO/h8PL1Dko4Pnn1zkcx2YXFnIMgGqiqCDCAnDojx44QFjDiUYzOQdYe2pwudRBC3V2UhHrfrtEfwSD8rdDQ4uCktSlAnhCtDUm0/ZXSkvfqc7Ph1zWAwSwOWBNxmYTDQ7gJAAnWclkKCqIMBWh0SSWhWXvDYfpQZ9vV188/p6oKPLkASNoNMZnrdZ9jVOLX6qw5DEICDh0OjRstCrVLABwB8D0n8GhSjOZYslY8MuRCBz1+3/whEJvJBQlcddpakCI02LZsqyk5N3HzWadBcuCEMrhscEOvTvOIkWhCCApBISxyUOxmPTj8PCOPyORLeOynLjvfaDHVKfo9bUNdvvm5+z2hfmCoBUYgJXon2uHyHjmpBCAwTO/jYz82nnjxtbRVMqTZFt7mCsTS8aZeb5yls229CmLpbbCbC4rEIQ8totRUYwMRqNXLobDnp5Q6OeoJPUnZDnz0FfmvXaFCyoar4iJK1NmahVlWXnQu4/8v4q/AfqFuJpc+G2eAAAAAElFTkSuQmCC";
var reloadingData = "data:image/gif;base64,R0lGODlhEAAQAPQAAP////N6Cf36+PWXP/i+iPN9DvSNLfzp1/rRq/OFHvi3eveva/zw5PnIm/vgx/afTvamWwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAFUCAgjmRpnqUwFGwhKoRgqq2YFMaRGjWA8AbZiIBbjQQ8AmmFUJEQhQGJhaKOrCksgEla+KIkYvC6SJKQOISoNSYdeIk1ayA8ExTyeR3F749CACH5BAkKAAAALAAAAAAQABAAAAVoICCKR9KMaCoaxeCoqEAkRX3AwMHWxQIIjJSAZWgUEgzBwCBAEQpMwIDwY1FHgwJCtOW2UDWYIDyqNVVkUbYr6CK+o2eUMKgWrqKhj0FrEM8jQQALPFA3MAc8CQSAMA5ZBjgqDQmHIyEAIfkECQoAAAAsAAAAABAAEAAABWAgII4j85Ao2hRIKgrEUBQJLaSHMe8zgQo6Q8sxS7RIhILhBkgumCTZsXkACBC+0cwF2GoLLoFXREDcDlkAojBICRaFLDCOQtQKjmsQSubtDFU/NXcDBHwkaw1cKQ8MiyEAIfkECQoAAAAsAAAAABAAEAAABVIgII5kaZ6AIJQCMRTFQKiDQx4GrBfGa4uCnAEhQuRgPwCBtwK+kCNFgjh6QlFYgGO7baJ2CxIioSDpwqNggWCGDVVGphly3BkOpXDrKfNm/4AhACH5BAkKAAAALAAAAAAQABAAAAVgICCOZGmeqEAMRTEQwskYbV0Yx7kYSIzQhtgoBxCKBDQCIOcoLBimRiFhSABYU5gIgW01pLUBYkRItAYAqrlhYiwKjiWAcDMWY8QjsCf4DewiBzQ2N1AmKlgvgCiMjSQhACH5BAkKAAAALAAAAAAQABAAAAVfICCOZGmeqEgUxUAIpkA0AMKyxkEiSZEIsJqhYAg+boUFSTAkiBiNHks3sg1ILAfBiS10gyqCg0UaFBCkwy3RYKiIYMAC+RAxiQgYsJdAjw5DN2gILzEEZgVcKYuMJiEAOwAAAAAAAAAAAA==";
var hiddenBadReports = "data:image/png;base64,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";

var faviconThePiratebay = "data:image/ico;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA/////////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBAv7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////AAA=";
var faviconNZBmatrix = "data:image/ico;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAA////AJU2MQDgx7gAuHxbAJY3KwDr29IApldBAMGNcQD48+8A0KakAPjx7wC9hWYArmZSAMKPcgCsYk8Asm9XALp/XgCKHxoAtXNvAMaShgDBjXIApFFMAIMkGgDMnpIA9OvlANq6sgCfSTQAwIttAGsPDQD7+fkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEIDxoBAQEBAQEBAQEBAQEBERcbGxsLAQEBAQEBAQEBERERGxsbGxsbAQEBAQEBAxERERAbGxsbGxsBAQEBARERERERGxsbGxsbGAEBARwREREREQwbGxsbGxsBARkRERERERERDRsbGxsbGwEREREREREREREbGxsbGxsUCREREREREREFEhISEhISFgEOEREREREEEhISEhISEhMBAREREREREhISEhISEhIBAQEGERERBxISEhISEhIBAQEBARERERISEhISEhIKAQEBAQEBER0SEhISEhICAQEBAQEBARUSEhISEhISHgEBAf//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
var faviconBTjunkie = "data:image/ico;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAQAMAAAAAAAAAAAAAAAAAAAAAAADRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWD////////////////////////////////////////////////////////RnWDRnWD///////+ATTOATTOATTOATTOATTOATTP////////////////////////RnWDRnWD///////+ATTOATTOATTOATTOATTOATTOATTP////////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD///////////////////////+ATTOATTOATTOATTP////////////////RnWDRnWD////////////////////////////////////////////////////////RnWDRnWD///////////////////////////+ATTOATTP////////////////////RnWDRnWD///////////////////////////+ATTOATTP////////////////////RnWDRnWD////////////////////////////////////////////////////////RnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWDRnWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
var faviconGoogle = "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7PT7/3zF6/9Ptu//RbHx/0227/+Tzvb/9vv5/97h0f9JeBz/NHoA/z98Av9AfAD/PHsA/0F6AP8AAAAA/vz7/1+33/8Mp+z/FrHw/xWy8f8bs/T/Hqrx/3zE7v////7/t8qp/zF2A/87gwH/P4ID/z59AP8+egD/Q3kA/97s8v8botj/ELn3/wy58f8PtfL/D7Lw/xuz9P8vq+f/8/n///779v9KhR3/OYYA/0GFAv88hgD/QIAC/z17AP/0+/j/N6bM/wC07/8Cxf7/CsP7/wm+9v8Aqur/SrDb//7+/v///P7/VZEl/zSJAP87jQD/PYYA/0OBBf8+fQH///3//9Dp8/84sM7/CrDf/wC14/8CruL/KqnW/9ns8f/8/v//4OjX/z+GDf85kAD/PIwD/z2JAv8+hQD/PoEA/9C7pv/97uv////+/9Xw+v+w3ej/ls/e/+rz9///////+/z6/22mSf8qjQH/OJMA/zuQAP85iwL/PIgA/zyFAP+OSSL/nV44/7J+Vv/AkG7/7trP//7//f/9//7/6/Lr/2uoRv8tjQH/PJYA/zuTAP87kwD/PY8A/z2KAP89hAD/olkn/6RVHP+eSgj/mEgR//Ho3//+/v7/5Ozh/1GaJv8tlAD/OZcC/zuXAv84lAD/O5IC/z2PAf89iwL/OIkA/6hWFf+cTxD/pm9C/76ihP/8/v//+////8nav/8fdwL/NZsA/zeZAP83mgD/PJQB/zyUAf84jwD/PYsB/z6HAf+fXif/1r6s//79///58u//3r+g/+3i2v/+//3/mbiF/yyCAP87mgP/OpgD/zeWAP85lgD/OpEB/z+TAP9ChwH/7eHb/////v/28ej/tWwo/7tUAP+5XQ7/5M+5/////v+bsZn/IHAd/zeVAP89lgP/O5MA/zaJCf8tZTr/DyuK//3////9////0qmC/7lTAP/KZAT/vVgC/8iQWf/+//3///j//ygpx/8GGcL/ESax/xEgtv8FEMz/AALh/wAB1f///f7///z//758O//GXQL/yGYC/8RaAv/Ojlf/+/////////9QU93/BAD0/wAB//8DAP3/AAHz/wAA5f8DAtr///////v7+/+2bCT/yGMA/89mAP/BWQD/0q+D///+/////P7/Rkbg/wEA+f8AA/z/AQH5/wMA8P8AAev/AADf///7/P////7/uINQ/7lXAP/MYwL/vGIO//Lm3P/8/v//1dT2/woM5/8AAP3/AwH+/wAB/f8AAfb/BADs/wAC4P8AAAAA//z7/+LbzP+mXyD/oUwE/9Gshv/8//3/7/H5/zo/w/8AAdX/AgL6/wAA/f8CAP3/AAH2/wAA7v8AAAAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA==";
var faviconLastFM = "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAC2tuRIGRqt5wIDpf8CA6X/AgOl/wIDpf8CA6X/AgOl/wIDpf8CA6X/AgOl/wIDpf8CA6X/AgOl/xkaree2tuRIHR+x5QQGqf8EBqn/BAap/wQGqf8EBqn/BAap/wQGqf8EBqn/BAap/wQGqf8EBqn/BAap/wQGqf8EBqn/HR+x5QcLrv8HC67/Bwuu/wcLrf8HC6v/Bwut/wcLrv8HC67/Bwuu/wcLrf8HC6z/Bwur/wcLq/8HC63/Bwuu/wcLrv8KELT/ChCy/wkPqv8XHKf/Oj6x/x0iqP8JD6f/Cg+u/woPrf8JD6X/LzOt/zo+r/83O6//CQ+l/woPrv8KELP/DRW5/wwUrv+Mj8///Pz+////////////1NXt/x0krP9QVbr/3+Dx/////////////////+Lj8v88QbX/DRS1/xAZuv9bYMD//////6Gk1f8aIaj/NDqz/5aa1/8tNKv/9vf7/8zN6P8zOrD/Dxem/zg9qf/5+fz/p6ra/xAZtv8THrz/oqbZ//////8cJ7D/FB/C/xQfwv8SHbb/mp7V//z8/v81PbH/Ehyx/zM7t/+Ahcr//////5SZ1v8THr7/FiTB/7G14P/u7/j/FiK5/xgmzf8YJsz/GSW7/+bn9P/Hyuf/N0G0/9XX7v///////////6yw4P8sN8H/GCXK/xsqyv+an9r//Pz+/ys4vf8bK87/GyrL/1Zfxf//////eYDL/6yx3//39/v/aHDF/y46u/8YJrr/GinI/xwr0v8eMdf/TlrN//////+2uuP/MD7A/0hVxf/c3vH/7O34/yU0vf+rseH/6er2/zlFuf9HVMP/5Ob2/3mD3P8eMdf/Izjg/yE11v91gNj/9PX7////////////2dzy/05d0P8hNdX/P0/Q/9/h9P///////////+Lk9f8/T9L/Ijfe/yY96P8mPeb/JDre/yM30/9BUtT/N0nT/yM41v8lO+H/Jj3m/yU74v8jONb/RlfU/0NV1P8jONb/JTvi/yY95/8pQu7/KULu/ylC7v8pQu3/KUHs/ylB7P8pQu3/KULu/ylC7v8pQu7/KULt/ylB6/8pQev/KULt/ylC7v8pQu7/LEbz/yxG8/8sRvP/LEbz/yxG8/8sRvP/LEbz/yxG8/8sRvP/LEbz/yxG8/8sRvP/LEbz/yxG8/8sRvP/LEbz/0Fb9+cuSvf/Lkr3/y5K9/8uSvf/Lkr3/y5K9/8uSvf/Lkr3/y5K9/8uSvf/Lkr3/y5K9/8uSvf/Lkr3/0Fb9+fL0v0+W3L6yTBN+v8wTfr/ME36/zBN+v8wTfr/ME36/zBN+v8wTfr/ME36/zBN+v8wTfr/ME36/1ty+snL0v0+gAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAA==";
var faviconYouTube = "data:image/ico;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAADxIQACAjIQAPCv8AUlVTADAt/wBPUP8AZWT/AJ+ioAB8fP8Ara3/ANHU2gDQ0P8A4OL/APv+/QAAAAAA7pd3dnZ5ee7nVlVlVlN1buU+XOquqe0+5T5ceqesaT7lPlyap6rdPuU+Paquqs0+5T5mZdpTpV7jzuUz5TNanupTVVU1acyu7u7u7u7u7u7u4L4gLiAO7u7gvisrCA7u7uC+LhgLDu7uQE4gLgse7usIC+7u7u7u7g4O7u7u7u4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
var faviconBlinkx = "data:image/ico;base64,AAABAAIAICAQAAAAAADoAgAAJgAAABAQAAAAAAAAaAUAAA4DAAAoAAAAIAAAAEAAAAABAAQAAAAAAIACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAgAAAAICAAIAAAACAAIAAgIAAAMDAwACAgIAAAAD/AAD/AAAA//8A/wAAAP8A/wD//wAA////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8oAAAAEAAAACAAAAABAAgAAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAgAAAAICAAIAAAACAAIAAgIAAAMDAwADA3MAA8MqmAAQEBAAICAgADAwMABEREQAWFhYAHBwcACIiIgApKSkAVVVVAE1NTQBCQkIAOTk5AIB8/wBQUP8AkwDWAP/szADG1u8A1ufnAJCprQAAADMAAABmAAAAmQAAAMwAADMAAAAzMwAAM2YAADOZAAAzzAAAM/8AAGYAAABmMwAAZmYAAGaZAABmzAAAZv8AAJkAAACZMwAAmWYAAJmZAACZzAAAmf8AAMwAAADMMwAAzGYAAMyZAADMzAAAzP8AAP9mAAD/mQAA/8wAMwAAADMAMwAzAGYAMwCZADMAzAAzAP8AMzMAADMzMwAzM2YAMzOZADMzzAAzM/8AM2YAADNmMwAzZmYAM2aZADNmzAAzZv8AM5kAADOZMwAzmWYAM5mZADOZzAAzmf8AM8wAADPMMwAzzGYAM8yZADPMzAAzzP8AM/8zADP/ZgAz/5kAM//MADP//wBmAAAAZgAzAGYAZgBmAJkAZgDMAGYA/wBmMwAAZjMzAGYzZgBmM5kAZjPMAGYz/wBmZgAAZmYzAGZmZgBmZpkAZmbMAGaZAABmmTMAZplmAGaZmQBmmcwAZpn/AGbMAABmzDMAZsyZAGbMzABmzP8AZv8AAGb/MwBm/5kAZv/MAMwA/wD/AMwAmZkAAJkzmQCZAJkAmQDMAJkAAACZMzMAmQBmAJkzzACZAP8AmWYAAJlmMwCZM2YAmWaZAJlmzACZM/8AmZkzAJmZZgCZmZkAmZnMAJmZ/wCZzAAAmcwzAGbMZgCZzJkAmczMAJnM/wCZ/wAAmf8zAJnMZgCZ/5kAmf/MAJn//wDMAAAAmQAzAMwAZgDMAJkAzADMAJkzAADMMzMAzDNmAMwzmQDMM8wAzDP/AMxmAADMZjMAmWZmAMxmmQDMZswAmWb/AMyZAADMmTMAzJlmAMyZmQDMmcwAzJn/AMzMAADMzDMAzMxmAMzMmQDMzMwAzMz/AMz/AADM/zMAmf9mAMz/mQDM/8wAzP//AMwAMwD/AGYA/wCZAMwzAAD/MzMA/zNmAP8zmQD/M8wA/zP/AP9mAAD/ZjMAzGZmAP9mmQD/ZswAzGb/AP+ZAAD/mTMA/5lmAP+ZmQD/mcwA/5n/AP/MAAD/zDMA/8xmAP/MmQD/zMwA/8z/AP//MwDM/2YA//+ZAP//zABmZv8AZv9mAGb//wD/ZmYA/2b/AP//ZgAhAKUAX19fAHd3dwCGhoYAlpaWAMvLywCysrIA19fXAN3d3QDj4+MA6urqAPHx8QD4+PgA8Pv/AKSgoACAgIAAAAD/AAD/AAAA//8A/wAAAP8A/wD//wAA////AAoKCgrw7+34+O3v8AoKCgoKCvJuRUZAQEZvbvjsB/QKChpG6UBpt723akBARevs8r1AQEBo////CgoWQOnpbu/jQEBA7f////gO9EBA6UX4F0FARvjy//////9BQUDp7eNBQUBu7Af////zR0FBRrzjQUFAQG747O8HaUdHQY4K40dBQEZAQBdvampqR5QKChZHQUH485Tj4xYWt/QKCgoWR0dB+AoKCgoKCgoKCgoKFmpHQfgKCgoKCgoKCgoKChYXR0H4CgoKCgoKCgoKCgoWF2pHvAoKCgoKCgoKCgoKvRYWtwoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgrwDwAAwAEAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAADAAAABwAAB/8AAAf/AAAH/wAAB/8AAA//AAD//wAA";
var faviconOndertitels = "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzxcSJ1AEAuS3R0NhAAAAAAAAAAAAAAAA3zQwLV8LCdXQNzM5AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC+Ih5fRAkI+6scGFUAAAAA+nZyDWARD9eLKCakAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAVEWw/AAD9xR8aSIoeG6JsBQLD3TQvAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKsMCBJbBwS8UwcEyFkFA7tjBwS6QQUD+UEFA/o7BAL/ZwsIxG4GA5Z1AwGgrRMOPQAAAAAAAAAAAAAAAAAAAACaCwcXRwYD8DkFA/86BQP/OQUD/z8FA/89BQP/PwUD/zoEAv84BAP/MwQD/2QHBHUAAAAAAAAAAKEKBSBZBwStUQYEt0IFA/0+BQP/PwUD/z8FA/8/BQP/PwUD/z8FA/8/BQP/PwUD/zgEAv99DAh+AAAAAAAAAACEFRIrSwcE7EAFA/4+BQP/PwUD/z8FA/8/BQP/PwUD/z8FA/8/BQP/PwUD/z8FA/83BAP/gwsHewAAAAAAAAAAAAAAAHkNCQJ6CAVDQAUD/z4FA/8/BQP/PwUD/z8FA/8/BQP/PwUD/z8FA/8/BQP/OgQC/3YOCnEAAAAAAAAAAAAAAAAAAAAAlAoGKEIFA/o+BQP/QQUD6kAFA+NBBQPoQAUD5UAFA+BBBQPfPwUD/jwFA/9oBwVyAAAAAAAAAAAAAAAAwBINMVgGA8c9BQP/PwUD/0IFA9ZPBgQ7SwYEBkUFAwtKBQMKRgUDjT8FA/89BQP/RwYD73gEAXPeMy8B4BsVIE4HBeU3BAP/PwUD/z8FA/8+BQP/QgUD31cGBBwAAAAATAYEhz4FA/8/BQP/PwUD/zwFA/80AgH/kRsYhocUEYUzAwH/PwUD/z8FA/8/BQP/PwUD/z0FA/9MBgSFTwYDDkAFA+4+BQP/PwUD/z8FA/8/BQP/PQUD/0MDAvNcBgOkOgUD/z8FA/8/BQP/PwUD/z8FA/8+BQP/RQUDqUwFAy4/BQP/PwUD/z8FA/8/BQP/PwUD/z8FA/8/BQP/hQkGbjYEA/8/BQP/PwUD/z8FA/8/BQP/PAUD/0oGBHxRBgQMQAUD7T8FA/8/BQP/PwUD/z8FA/88BQP/QgQC7rINCBJXBgTWOgUD/z8FA/8/BQP/PQUD/0YFA91pCAUbAAAAAEUFA3k/BQP/PwUD/z8FA/8+BQP/OQUD/5AQDIYAAAAAkgoGI0YFA6o/BQPkQAUD4z8FA6psCAUlAAAAAAAAAAAAAAAASQYEZ0EFA9g/BQPsPQQC1FoLCW3yKCMB++/pEv3Pxuz+n6Pz4AeQBuAH9ASAByzggAd0+OAHC6LgB5IIw8O1N4GADnIAgEbMAIB+9oGA7VWBwMpXw+NsCA==";
var faviconNLondertitels = "data:image/ico;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAdHR0AHR4dACIhIgAlJSUALS4uAC8vLwA0NDQANTU1ADo7OwA7OzsAPT09AD4+PgBAQUEAQUFBAEJCQgBDQ0MASUlIAElKSgBMS0sAUVFRAFNSUgBUU1MAVVVVAFdXVwBXWFgAWlpaAGBeXwBoaGgAaWlpAGprawB1dnYAeHh4AIGBgQCCgoIAhoaGAImIhQAAdfgAiYmIAImJiQAAefkAi4yMAAB6+AAAevkAAHv4AAB7+QCOjo4AAH35AACB+QAAgvoAAIL7AAOD+gAGg/oAA4T4AAiH+QAJh/oACof6AAaI+AAMiPoADon6AAyK+QAPivkAm5ubABKO+AAdkPkApKKkAKenpwA0nvkARKT6AEyn+gCysrMAs7OzALe3uABZrvoAvr6+AMDAwADBwcEAb7n6AHC6/AB2vPsAdr36AHW9+wB2vfsAd738AMbGxgB9v/oAx8fHAH/C/ACDw/sAhMP7AITD/ACExPsAhMT8ANDQ0ADT0tIAoND7ANbX1gCo1PsAqdX7ANra2gDb3NwA4N/eAMHg/ADk5OQAwuL8AMLj/QDG4/0AxuP+AMfj/gDG5PwAxuT9AOjo6ADp6ekAz+f8ANPp+wDV6vsA1+v7AO3t7QDX6/wA2Ov9ANfs/ADV7P0A2Oz8ANbs/QDX7P0A2Oz9ANXs/wDv7+8A2+78AO/w7wDg8PwA3vD9AOfy/QDm8/sA9PT0AOj0/ADp9P0A7vf9APj4+AD4+fgA9Pj9APn5+QD9/f0A/P79AP3+/QD+/v0A/P7+AP3+/gD+/v4A//7+AP7+/wD///wA///9AP///gD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmZOTk5mZRiIgQYWZk5mZmZOZk40ZBi1LVT0NC3STmZmZjW4AXJmZk5OTmW8DSpmTk4kAjJOTk5OZmZOTmQRik5kOZIN5lJdzhotyenuCAplvEJlMMpdwJ1RnLDQzMSNFJUeZUDqYQzZYbCqBmZeAFRh+mU48hC83W20rdpSTmQwTiplSP0hEPlpqK3eVmZkNHGOZUTsvfzVXayl8mZOZD0YmmU85Qpg4WWkqdZOTUx+ZAZlNLmWWMFZoJHiZmQl0mUAefWGYmGBxh16ImUYbmZOZGiiZkpOPlY6VmUkFmZOTkZkhB12ZmZmZZhQWmY2Zk5KQmXQdCBESChdfmZOTkwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
var faviconWikipedia = "data:image/ico;base64,AAABAAEAEBAQAAEABAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAEAgQAhIOEAMjHyABIR0gA6ejpAGlqaQCpqKkAKCgoAPz9/AAZGBkAmJiYANjZ2ABXWFcAent6ALm6uQA8OjwAiIiIiIiIiIiIiI4oiL6IiIiIgzuIV4iIiIhndo53KIiIiB/WvXoYiIiIfEZfWBSIiIEGi/foqoiIgzuL84i9iIjpGIoMiEHoiMkos3FojmiLlUipYliEWIF+iDe0GoRa7D6GPbjcu1yIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
var faviconZDnet = "data:image/ico;base64,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";
var faviconTVcom = "data:image/ico;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAQAAAAkAAAAaAAAAKAAAAC4AAAAtAAAAHgAAAAsAAAAQAAAAJgAAACsAAAAbAAAABwAAAAAAAAAAAAAAAAAAAAkAAAAtAAAAXwAAAIAAAACMAAAAhgAAAFkAAAAmAAAAOgAAAHYAAACGAAAAWgAAABwAAAABAAAAAAAAAAAAAAAcChcobiJYq+UlYd76Knb//y18//8rbtTnAAAAPRk5Y4Y5lf//O5r//zZ+x+EAAAA3AAAABgAAAAAAAAAAAAAAKyhpu9kWdf//DIH//wuI//8Tiv//LnPb4wAAAEctb7nRH53//wyq//87pf//IS9BbQAAABMAAAAAAAAAAAAAADArff//DYX//xeD//8ugvb4MYDn1jJ61bICAgJWOJT1+xam//8Wrf//MKr//zJpo7sAAAAlAAAAAQAAAAAAAAAwKHv//xKL//8jgf//I099iQAAAA0AAAAiJVSIpi6c//8bq///HbD//yax//87mdzsAAAAPwAAAAkAAAAAAAAAMCiA//8Xjv//JIX//x1JdYkAAAASAAAAODGBy+Unov//Iqz//yev//8mtf//PrH//yM+WIAAAAAYAAAAEgAAAEIohv//KJ///ymN//8bRGqSAAAAMQ4dK2s1nv//OLP//z22//88oe71Qrv//0O5//81gLfPAAAALQAAAEgAAAB4KYv//yui//8pkP//FzxargAAAHMhWIXBNqX//zqx//86nu7zMny0rEG1//9Hv///QKnt9xAQEE8iYpvJH1SF4CqZ//8upv//LZ///yRmpuojYJHfMI/j+Tqv//86rf//OY3JxBhHak1Asv//TML//0S4//8vYIShJ5T//yeZ//8upP//Man//zSr//8xpP//MqT//zqv//9Btf//N6n//z5/q3UAAAAXPant5Uy+//9Kvf//PpvR1S2g//8pmv//K57//zWt//8xp///MqX//zCj//8xpf//Mqf//ziq+vZEREMTAAAABUCk4oc9tP//Prb//0G1+/Zra2sGCgoKNymf//83sf//KqD//yJUdYwgICAQhoaHCYyLiwqWlpUHAAAAAAAAAAAAAAAAra2tCLKysgq2tbUJAAAAAAAAACQoov//ObT//yqj//8cU3l9AAAACQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMLar//yil//8opf//KXalZAAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAMAAIAB8L+AAQAAgAEAAIAAbbmAAAAAgAAAAAAAAAAAAAAAAABxOgAAAAAAAAAAADj//4H///+B/3TM//8AAA==";
var faviconVCDQ = "data:image/ico;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAAGQAAABkAAAAAAAAAAAAAAAAAAAAAAAAAAABBQECAgIAAAAMBAwAAAAAAAAAAAAAAAAMBAwAAAAEBAQAAAAAAAAAAAACAgILBwsDBwMAAAAAAAAAAAANBQ0AAAAAAAACBgICAgIBAQEBAQEAAAACBgIAAAAKBgoAAAAAAAAAAAADAwMOCg4AAAAAAAAJBQkBAQEAAAABAQEAAAAJBQkCAgIAAAAAAAACBgIAAAABAQEAAAAMDAxAQEAgICAAAAAAAAAEBAQBAQECBgIBAQEAAAAAAAAAAAADAwMAAAAAAAAICAhiXmL9/f2yrrIBBQEBAQELBwsAAAABAQELBwsAAAAAAAACAgIAAAADBwMCBgIAAADHw8fW0tb//v8WDhYBAQECAgICBgIBAQEAAAAAAAAAAAALBwsAAAAAAAAAAAAiIiL4+PgwMDDn4+d1cXUAAAAAAAACAgIAAAAAAAACAgICAgIAAAAOCg4AAAAAAAB2cnbg4OAAAACHg4fS0tIAAAAAAAABAQEAAAACAgIAAAAAAAAAAAAAAAAAAAAAAADg4OCQkJAAAAAnIyf///8dHR0AAAABAQEAAAAAAAACAgICAgIDBwMAAAAAAAA/Oz///P8YGBgMBAwAAADWztaSlpIBAQEAAAALBwsEBAQAAAALBwsAAAAAAAAKBgqMjIzOzs4LBwsAAAAAAAB5dXnY2NgKBgoAAAAAAAAAAAAEBAQAAAAPCw8AAAAAAAA3MzcgICAAAAABAQEAAAASEhJOSk4AAAAAAAAOCg4AAAAAAAAJBQkJBQkCAgIMBAwAAAAAAAAAAAACAgIAAAAAAAAAAAANCQ0AAAAAAAAKBgoAAAACAgIAAAABAQEAAAAAAAADBwMAAAAAAAADBwMAAAADBwMAAAAMBAwAAAADBwMAAAAAAAAOCg4AAAAMBAwAAAAAAAAKBgoDAwMAAAANCQ0AAAABBQEAAAAAAAALBwsAAAAAAAAAAAAMBAwAAAACBgIAAAADBwMAAAAAAAAAAAABAQEAAAAAAAANBQ0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
var faviconGamerankings = "data:image/ico;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAMDcwADwyqYA8PDwAJn//wCZ1JkA/9SZAP/M/wCZmf8AMCIiABEAAAAiAAAARAAAAFUAAAB3AAAAiAAAAKoAAADdAAAA7gAAAAARAAAAIgAAAEQAAABVAAAAdwAAAIgAAACqAAAA3QAAAO4AAAAAEQAAACIAAABEAAAAVQAAAHcAAACQAAAAqgAAAN0AAADuADMAAABmAAAAmQAAAMwAAAAAMwAAMzMAAGYzAAChMwAAzDMAAP8zAAAAZgAAM2YAAGZmAACZZgAAzGYAAP9mAAAAmQAAM5kAAGaZAACZmQAAzJkAAP+ZAAAAzAAAM8wAAGbMAACZzAAAzMwAAP/MAAAz/wAAZv8AAJn/AADM/wAAAAAzADMAMwBmADMAmQAzAMwAMwD/ADMAADMzADszMwBmMzMAmTMzAMwzMwD/MzMAAGYzADNuMwBmZjMAmWYzAMxmMwD/ZjMAAJkzADOZMwBmmTMAmZkzAMyZMwD/mTMAAMwzADPMMwBmzDMAmcwzAMzMMwD/zDMAAP8zADP/MwBm/zMAmf8zAMz/MwD//zMAAABmADMAZgBmAGYAmQBmAMwAZgD/AGYAADNmADMzZgBmM2YAmTNmAMwzZgD/M2YAAGZmADNmZgBmZmYAmWZmAMxmZgD/ZmYAAJlmADOZZgBmmWYAmZlmAMyZZgD/mWYAAMxmADPMZgBmzGYAmcxmAMzMZgD/zGYAAP9mADP/ZgBm/2YAmf9mAMz/ZgD//2YAAACZADMAmQBmAJkAmQCZAMwAmQD/AJkAADOZADMzmQBmM5kAmTOZAMwzmQD/M5kAAGahADNmmQBmZpkAmWaZAMxmmQD/ZpkAAJmZADOZmQBmmZkAmZmZAMyZmQD/mZkAAMyZADPMmQBmzJkAmcyZAMzMmQD/zJkAAP+ZADP/mQBm/5kAmf+ZAMz/mQD//5kAAADMADMAzABmAMwAmQDMAMwAzAD/CNQAADPMADMzzABmM8wAmTPMAMwzzAD/M8wAAGbMADNmzABmZswAmWbMAMxmzAD/ZswAAJnMADOZzABmmcwAmZnMAMyZzAD/mcwAAMzMADPMzABmzMwAmczMAMzMzAD/zMwAAP/MADP/zABm/8wAmf/MAMz/zAD//8wAMwD/AGYA/wCZAP8AzAD/AAAz/wAzM/8AZjP/AJkz/wDMM/8A/zP/AABm/wAzZv8AZmb/AJlm/wDMZv8A/2b/AACZ/wDd3d0AzJn/AGbM/wAAAIgA/wDMAJkzAAAzZjMAAGaZADMzMwDw+/8ApKCgAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8AYjlV8jlV8jlV8jhVf9v//zkzOTM5MznyMjkzOTl/Cv9/CTk6XGJjYmKGCX8yW/b/W9s5OTNUW1tbWwfbW1sK/7AKYvI5/wr///9+Ctvy1QrUCoc5Ww7//wrb99vbOQf/1QjbOjj/CtWp938J2zlc9gqqCjlc1f9/WzphqgpcOQr/+PZiObAKCQoKCgr/2/IK/wkKjYdcqamGf4Wpf4WGCf/UhgeqVP////8K//8K////CqmGqYUK/woK//8KCgr///+qCasJCaoJCasJCQkJqv//hTk5OTM5OTM5MzkzW4b//9QKCodiYmJiYmJiOTIK////f1tUMlQyVDJUMjKp1QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
var faviconMetacritic = "data:image/ico;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAEgAAABIAAAAAAEAAAAAAAAzAAAAsp+fAJl/fwD///8A5d/fAE0gIADMv78AQBAQANnPzwBZMDAAv6+vAKWPjwDy7+8AmYCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJDAgHAAAAAAAAAAAAAAAJDAMDAgAAAAAAAAAAAAAJDAMDAQAAAAAAAAAAAAAJDAMDAQAAAAIHAAAAAAAJDAMDAQAAAAEDCAcAAAAFDAMDBAAAAAEDAwwJAAAAAAEMDAoAAAEDAwwJAAAAAAAABQYDCwYDAwwJAAAHAQcAAAACAwMDAwMJAAAHCAMIAAAAAAYDAwMLAAAHCAMDCAAAAAAACQkDAgAJCAMDCAcAAAAAAAAAAwMGAwMDCAcAAAAAAAAAAAEDAwMDBgcAAAAAAAAAAAAHCgMMDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
var faviconGametrailers = "data:image/ico;base64,AAABAAQAEBAQAAAAAAAoAQAARgAAABAQAAAAAAAAaAUAAG4BAAAgIBAAAAAAAOgCAADWBgAAICAAAAAAAACoCAAAvgkAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8AAP8AAAD//wD/AAAA/wD/AP//AAD///8AAAAAAAAAAAAAAEREREQAAAAETMzMxEAAAETMzMzMRAAEQAAAwAAEQAQP//AA/wxAAHcIdwB3DEAA/w//AP8MQAD/AAAA/wAABA///////wAEwAAAAAAAAARMzMzMzMRAAETMbubMRAAABEzMzMRAAAAARERERAAAAAAAAAAAAAD//wAA8A8AAOAHAADAAwAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAADAAwAA4AcAAPAPAAD//wAAKAAAABAAAAAgAAAAAQAIAAAAAABAAQAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAIAAAIAAAACAgACAAAAAgACAAICAAADAwMAAwNzAAPDKpgDU8P8AseL/AI7U/wBrxv8ASLj/ACWq/wAAqv8AAJLcAAB6uQAAYpYAAEpzAAAyUADU4/8Ascf/AI6r/wBrj/8ASHP/ACVX/wAAVf8AAEncAAA9uQAAMZYAACVzAAAZUADU1P8AsbH/AI6O/wBra/8ASEj/ACUl/wAAAP8AAADcAAAAuQAAAJYAAABzAAAAUADj1P8Ax7H/AKuO/wCPa/8Ac0j/AFcl/wBVAP8ASQDcAD0AuQAxAJYAJQBzABkAUADw1P8A4rH/ANSO/wDGa/8AuEj/AKol/wCqAP8AkgDcAHoAuQBiAJYASgBzADIAUAD/1P8A/7H/AP+O/wD/a/8A/0j/AP8l/wD/AP8A3ADcALkAuQCWAJYAcwBzAFAAUAD/1PAA/7HiAP+O1AD/a8YA/0i4AP8lqgD/AKoA3ACSALkAegCWAGIAcwBKAFAAMgD/1OMA/7HHAP+OqwD/a48A/0hzAP8lVwD/AFUA3ABJALkAPQCWADEAcwAlAFAAGQD/1NQA/7GxAP+OjgD/a2sA/0hIAP8lJQD/AAAA3AAAALkAAACWAAAAcwAAAFAAAAD/49QA/8exAP+rjgD/j2sA/3NIAP9XJQD/VQAA3EkAALk9AACWMQAAcyUAAFAZAAD/8NQA/+KxAP/UjgD/xmsA/7hIAP+qJQD/qgAA3JIAALl6AACWYgAAc0oAAFAyAAD//9QA//+xAP//jgD//2sA//9IAP//JQD//wAA3NwAALm5AACWlgAAc3MAAFBQAADw/9QA4v+xANT/jgDG/2sAuP9IAKr/JQCq/wAAktwAAHq5AABilgAASnMAADJQAADj/9QAx/+xAKv/jgCP/2sAc/9IAFf/JQBV/wAASdwAAD25AAAxlgAAJXMAABlQAADU/9QAsf+xAI7/jgBr/2sASP9IACX/JQAA/wAAANwAAAC5AAAAlgAAAHMAAABQAADU/+MAsf/HAI7/qwBr/48ASP9zACX/VwAA/1UAANxJAAC5PQAAljEAAHMlAABQGQDU//AAsf/iAI7/1ABr/8YASP+4ACX/qgAA/6oAANySAAC5egAAlmIAAHNKAABQMgDU//8Asf//AI7//wBr//8ASP//ACX//wAA//8AANzcAAC5uQAAlpYAAHNzAABQUADy8vIA5ubmANra2gDOzs4AwsLCALa2tgCqqqoAnp6eAJKSkgCGhoYAenp6AG5ubgBiYmIAVlZWAEpKSgA+Pj4AMjIyACYmJgAaGhoADg4OAPD7/wCkoKAAgICAAAAA/wAA/wAAAP//AP8AAAD/AP8A//8AAP///wCMjIyMjIyMjIyMjIyMjIyMjIuLenrt74zxjIyLi4uMjIyKeezw7+7t7e3v8e74i4yMi4uN8fHx8fDv8PHzjIuMjIvy8/T09PTz8/P09I3tjIzx8eLi4uLz8/Hi4vTzi4yM7+Tk8vDk5PHw5OTz84yNjO7///H////w7///8/PzjYzv///w8PDw8PD///Ly8oGM7er///////////////KNjOzu8vLy8vLy8vLy8vLyjYx67egHB+bm5uYHB+jseoyMennsB+Xl5eXl5QfseXqMjIuL+Ovn5uTk5ufqeYuLjIyLenqK6vf39/f3eXqLi4yMjIyMjIyMjIyMjIyMjIyMAAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//ygAAAAgAAAAQAAAAAEABAAAAAAAgAIAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAACAAACA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d3d4eXl6enqLi4yMjIyMi4uLi4uLjYx5eXh4eHh4d4Pn7O/xjY2NjY3xjIyLeop5eXl5+HqMjXp5eXl4hYTn7vGNjY2NjY2NjY2NjfGMenp6enqLi42MeXh4d4MJ6vGNje/s6+rq6urr7O+NjY3veXh4eYp6jI16eXiECeyNje/46+vq6urq6urr6+vu8Y2MeXl6i4uNjHl4dwnsjfHu7Pjr6+vr6+vr6+vr+Ozt8Y3veXl6eoyNenl46o3x7ezs7Pj46+vr6+v4+Pjs7Ozt8Y2LenqLjYx5eXnxje/u7u7u7u3t7e3t7ezt7e7u7u7u8Y3seXmMjYt6i43x8PHx8fHx8fHx8fDv7u/x8fHw7+7vjYx6eo2MiorxjfHz9PT09PT09PT08/Hy8/T09PPw7+/xjex5jI2LjI3x8eji4uLi4uXj4uf08vHl4uLv8/Hv7/CN73qNjHnvjfDw4+Li7+7r9+Pi4/Py8Oji4vjz8vDv8I3weIyNeoyN8O/m4+Pv8vHo5ePj8PLw5uPj6PPy8PDwjfF5jYx48Y3v7+fk5Ozy8vHq5OTs8vEH5OTl8/Lx8O/xjXeMjXnx8ezt9///5vDs7On//+fx8Qfj///v8vDt7PHxeI2MePHx6+vs4v//7///////4u/v6eT//+vy7+zrjY13jI158fHq6u7k///u8fDt+O/w8Ozt6f//5/Pw7u2NjYSNjHmM8ev37Qf//+vz8fDw8PDv7+/x///j9PLx8fPxg4yNeovx+Pfr6f//5e7u7u7u7u/u7u7l///s7+/x8/CEjYx56/Hu6OjqB+L/////////6/j//////////+7z7QmMjXmF8PH35+jv8vPz8/Pz8/Pz8/Pz8/Pz8/Pz8/LneI2Md4Lq8e7nB+bl5OPj4+Li4uLj4+Pk5eYH5+3x7YN3jI2EjuTv8e3m5eTj4+Pi4uLi4uLi4+Pk5ebt8fEHhHmNjHeO/+fw8ezk5OPj4uLi4uLi4uLj4+TkB/Hx6oN4eYyNeIOO4vfw7+rj4+Li4uLi4uLi4uLj4wfu8PgJeHp6jYx4d4OO4vft7Ojk4uLi4uLi4uLi4uPo7O3qg3d4eYqMjXp5eISPjubq6vfm4+Li4uLi4uPl6Pfq5494eXqLi42MeXl4eHd3gwkJ5+fm5eXk5OXl5gfnB+OPd3h5eXqLjI2Lenp5eXl5eXl4CQnk5OTk5OTk5IKPhHl5eouLjIyNjHqKeXl5eXl5eXh4eHh4eHh4hHeDg3d3eHmKeouLi4yNjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";


// Inject the different Settingpopups
strIMDBsettings = "<table><tr><td colspan=\"2\"><b>Settings IMDB Links</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable good rating: </td><td><input type=\"checkbox\" name=\"chkEnableGoodratingIMDB\" id=\"chkEnableGoodratingIMDB\" /></td></tr><tr><td>Mark good with rating: </td><td><input style=\"width:20px;\" id=\"txtHighIMDBrating\" type=\"text\" name=\"txtHighIMDBrating\" value=\"\" /></td></tr><tr><td>Color good rating: </td><td><input style=\"width:60px;\" id=\"txtHighIMDBcolor\" type=\"text\" name=\"txtHighIMDBcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable bad rating: </td><td><input type=\"checkbox\" name=\"chkEnableBadratingIMDB\" id=\"chkEnableBadratingIMDB\" /></td></tr><tr><td>Mark bad with rating: </td><td><input style=\"width:20px;\" id=\"txtLowIMDBrating\" type=\"text\" name=\"txtLowIMDBrating\" value=\"\" /></td></tr><tr><td>Color bad rating: </td><td><input style=\"width:60px;\" id=\"txtLowIMDBcolor\" type=\"text\" name=\"txtLowIMDBcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable Rotten tomatoes info:</td><td><input type=\"checkbox\" name=\"chkEnableROTTOMinfo\" id=\"chkEnableROTTOMinfo\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okIMDBsettings\"></td><td align=\"right\" id=\"cancelIMDBsettings\"></td></tr></table>";
strGAMESPOTsettings = "<table><tr><td colspan=\"2\"><b>Settings GAMESPOT Links</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable good rating: </td><td><input type=\"checkbox\" name=\"chkEnableGoodratingGAMESPOT\" id=\"chkEnableGoodratingGAMESPOT\" /></td></tr><tr><td>Mark good with rating: </td><td><input style=\"width:20px;\" id=\"txtHighGAMESPOTrating\" type=\"text\" name=\"txtHighGAMESPOTrating\" value=\"\" /></td></tr><tr><td>Color good rating: </td><td><input style=\"width:60px;\" id=\"txtHighGAMESPOTcolor\" type=\"text\" name=\"txtHighGAMESPOTcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable bad rating: </td><td><input type=\"checkbox\" name=\"chkEnableBadratingGAMESPOT\" id=\"chkEnableBadratingGAMESPOT\" /></td></tr><tr><td>Mark bad with rating: </td><td><input style=\"width:20px;\" id=\"txtLowGAMESPOTrating\" type=\"text\" name=\"txtLowGAMESPOTrating\" value=\"\" /></td></tr><tr><td>Color bad rating: </td><td><input style=\"width:60px;\" id=\"txtLowGAMESPOTcolor\" type=\"text\" name=\"txtLowGAMESPOTcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okGAMESPOTsettings\"></td><td align=\"right\" id=\"cancelGAMESPOTsettings\"></td></tr></table>";
strALLMUSICsettings = "<table><tr><td colspan=\"2\"><b>Settings ALLMUSIC Links</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable good rating: </td><td><input type=\"checkbox\" name=\"chkEnableGoodratingALLMUSIC\" id=\"chkEnableGoodratingALLMUSIC\" /></td></tr><tr><td>Mark good with rating: </td><td><input style=\"width:20px;\" id=\"txtHighALLMUSICrating\" type=\"text\" name=\"txtHighALLMUSICrating\" value=\"\" /></td></tr><tr><td>Color good rating: </td><td><input style=\"width:60px;\" id=\"txtHighALLMUSICcolor\" type=\"text\" name=\"txtALLMUSICPOTcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable bad rating: </td><td><input type=\"checkbox\" name=\"chkEnableBadratingALLMUSIC\" id=\"chkEnableBadratingALLMUSIC\" /></td></tr><tr><td>Mark bad with rating: </td><td><input style=\"width:20px;\" id=\"txtLowALLMUSICrating\" type=\"text\" name=\"txtLowALLMUSICrating\" value=\"\" /></td></tr><tr><td>Color bad rating: </td><td><input style=\"width:60px;\" id=\"txtLowALLMUSICcolor\" type=\"text\" name=\"txtLowALLMUSICcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okALLMUSICsettings\"></td><td align=\"right\" id=\"cancelALLMUSICsettings\"></td></tr></table>";
strIGNsettings = "<table><tr><td colspan=\"2\"><b>Settings IGN Links</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable good rating: </td><td><input type=\"checkbox\" name=\"chkEnableGoodratingIGN\" id=\"chkEnableGoodratingIGN\" /></td></tr><tr><td>Mark good with rating: </td><td><input style=\"width:20px;\" id=\"txtHighIGNrating\" type=\"text\" name=\"txtHighIGNrating\" value=\"\" /></td></tr><tr><td>Color good rating: </td><td><input style=\"width:60px;\" id=\"txtHighIGNcolor\" type=\"text\" name=\"txtHighIGNcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable bad rating: </td><td><input type=\"checkbox\" name=\"chkEnableBadratingIGN\" id=\"chkEnableBadratingIGN\" /></td></tr><tr><td>Mark bad with rating: </td><td><input style=\"width:20px;\" id=\"txtLowIGNrating\" type=\"text\" name=\"txtLowIGNrating\" value=\"\" /></td></tr><tr><td>Color bad rating: </td><td><input style=\"width:60px;\" id=\"txtLowIGNcolor\" type=\"text\" name=\"txtLowIGNcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okIGNsettings\"></td><td align=\"right\" id=\"cancelIGNsettings\"></td></tr></table>";
strAMAZONsettings = "<table><tr><td colspan=\"2\"><b>Settings AMAZON Links</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable good rating: </td><td><input type=\"checkbox\" name=\"chkEnableGoodratingAMAZON\" id=\"chkEnableGoodratingAMAZON\" /></td></tr><tr><td>Mark good with rating: </td><td><input style=\"width:20px;\" id=\"txtHighAMAZONrating\" type=\"text\" name=\"txtHighAMAZONrating\" value=\"\" /></td></tr><tr><td>Color good rating: </td><td><input style=\"width:60px;\" id=\"txtHighAMAZONcolor\" type=\"text\" name=\"txtHighAMAZONcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable bad rating: </td><td><input type=\"checkbox\" name=\"chkEnableBadratingAMAZON\" id=\"chkEnableBadratingAMAZON\" /></td></tr><tr><td>Mark bad with rating: </td><td><input style=\"width:20px;\" id=\"txtLowAMAZONrating\" type=\"text\" name=\"txtLowAMAZONrating\" value=\"\" /></td></tr><tr><td>Color bad rating: </td><td><input style=\"width:60px;\" id=\"txtLowAMAZONcolor\" type=\"text\" name=\"txtLowAMAZONcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okAMAZONsettings\"></td><td align=\"right\" id=\"cancelAMAZONsettings\"></td></tr></table>";
strGOOGLEMUSICsettings = "<table><tr><td colspan=\"2\"><b>Settings GOOGLE MUSIC Links</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable good rating: </td><td><input type=\"checkbox\" name=\"chkEnableGoodratingGOOGLEMUSIC\" id=\"chkEnableGoodratingGOOGLEMUSIC\" /></td></tr><tr><td>Mark good with rating: </td><td><input style=\"width:20px;\" id=\"txtHighGOOGLEMUSICrating\" type=\"text\" name=\"txtHighGOOGLEMUSICrating\" value=\"\" /></td></tr><tr><td>Color good rating: </td><td><input style=\"width:60px;\" id=\"txtHighGOOGLEMUSICcolor\" type=\"text\" name=\"txtGOOGLEMUSICPOTcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable bad rating: </td><td><input type=\"checkbox\" name=\"chkEnableBadratingGOOGLEMUSIC\" id=\"chkEnableBadratingGOOGLEMUSIC\" /></td></tr><tr><td>Mark bad with rating: </td><td><input style=\"width:20px;\" id=\"txtLowGOOGLEMUSICrating\" type=\"text\" name=\"txtLowGOOGLEMUSICrating\" value=\"\" /></td></tr><tr><td>Color bad rating: </td><td><input style=\"width:60px;\" id=\"txtLowGOOGLEMUSICcolor\" type=\"text\" name=\"txtLowGOOGLEMUSICcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okGOOGLEMUSICsettings\"></td><td align=\"right\" id=\"cancelGOOGLEMUSICsettings\"></td></tr></table>";
strDISCOGSsettings = "<table><tr><td colspan=\"2\"><b>Settings GOOGLE MUSIC Links</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable good rating: </td><td><input type=\"checkbox\" name=\"chkEnableGoodratingDISCOGS\" id=\"chkEnableGoodratingDISCOGS\" /></td></tr><tr><td>Mark good with rating: </td><td><input style=\"width:20px;\" id=\"txtHighDISCOGSrating\" type=\"text\" name=\"txtHighDISCOGSrating\" value=\"\" /></td></tr><tr><td>Color good rating: </td><td><input style=\"width:60px;\" id=\"txtHighDISCOGScolor\" type=\"text\" name=\"txtDISCOGSPOTcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable bad rating: </td><td><input type=\"checkbox\" name=\"chkEnableBadratingDISCOGS\" id=\"chkEnableBadratingDISCOGS\" /></td></tr><tr><td>Mark bad with rating: </td><td><input style=\"width:20px;\" id=\"txtLowDISCOGSrating\" type=\"text\" name=\"txtLowDISCOGSrating\" value=\"\" /></td></tr><tr><td>Color bad rating: </td><td><input style=\"width:60px;\" id=\"txtLowDISCOGScolor\" type=\"text\" name=\"txtLowDISCOGScolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okDISCOGSsettings\"></td><td align=\"right\" id=\"cancelDISCOGSsettings\"></td></tr></table>";
strCDUNIVERSEsettings = "<table><tr><td colspan=\"2\"><b>Settings GOOGLE MUSIC Links</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable good rating: </td><td><input type=\"checkbox\" name=\"chkEnableGoodratingCDUNIVERSE\" id=\"chkEnableGoodratingCDUNIVERSE\" /></td></tr><tr><td>Mark good with rating: </td><td><input style=\"width:20px;\" id=\"txtHighCDUNIVERSErating\" type=\"text\" name=\"txtHighCDUNIVERSErating\" value=\"\" /></td></tr><tr><td>Color good rating: </td><td><input style=\"width:60px;\" id=\"txtHighCDUNIVERSEcolor\" type=\"text\" name=\"txtCDUNIVERSEPOTcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable bad rating: </td><td><input type=\"checkbox\" name=\"chkEnableBadratingCDUNIVERSE\" id=\"chkEnableBadratingCDUNIVERSE\" /></td></tr><tr><td>Mark bad with rating: </td><td><input style=\"width:20px;\" id=\"txtLowCDUNIVERSErating\" type=\"text\" name=\"txtLowCDUNIVERSErating\" value=\"\" /></td></tr><tr><td>Color bad rating: </td><td><input style=\"width:60px;\" id=\"txtLowCDUNIVERSEcolor\" type=\"text\" name=\"txtLowCDUNIVERSEcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okCDUNIVERSEsettings\"></td><td align=\"right\" id=\"cancelCDUNIVERSEsettings\"></td></tr></table>";
strTVRAGEsettings = "<table><tr><td colspan=\"2\"><b>Settings GOOGLE MUSIC Links</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable good rating: </td><td><input type=\"checkbox\" name=\"chkEnableGoodratingTVRAGE\" id=\"chkEnableGoodratingTVRAGE\" /></td></tr><tr><td>Mark good with rating: </td><td><input style=\"width:20px;\" id=\"txtHighTVRAGErating\" type=\"text\" name=\"txtHighTVRAGErating\" value=\"\" /></td></tr><tr><td>Color good rating: </td><td><input style=\"width:60px;\" id=\"txtHighTVRAGEcolor\" type=\"text\" name=\"txtTVRAGEPOTcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable bad rating: </td><td><input type=\"checkbox\" name=\"chkEnableBadratingTVRAGE\" id=\"chkEnableBadratingTVRAGE\" /></td></tr><tr><td>Mark bad with rating: </td><td><input style=\"width:20px;\" id=\"txtLowTVRAGErating\" type=\"text\" name=\"txtLowTVRAGErating\" value=\"\" /></td></tr><tr><td>Color bad rating: </td><td><input style=\"width:60px;\" id=\"txtLowTVRAGEcolor\" type=\"text\" name=\"txtLowTVRAGEcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okTVRAGEsettings\"></td><td align=\"right\" id=\"cancelTVRAGEsettings\"></td></tr></table>";
strANIDBsettings = "<table><tr><td colspan=\"2\"><b>Settings ANIDB Links</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable good rating: </td><td><input type=\"checkbox\" name=\"chkEnableGoodratingANIDB\" id=\"chkEnableGoodratingANIDB\" /></td></tr><tr><td>Mark good with rating: </td><td><input style=\"width:20px;\" id=\"txtHighANIDBrating\" type=\"text\" name=\"txtHighANIDBrating\" value=\"\" /></td></tr><tr><td>Color good rating: </td><td><input style=\"width:60px;\" id=\"txtHighANIDBcolor\" type=\"text\" name=\"txtHighANIDBcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable bad rating: </td><td><input type=\"checkbox\" name=\"chkEnableBadratingANIDB\" id=\"chkEnableBadratingANIDB\" /></td></tr><tr><td>Mark bad with rating: </td><td><input style=\"width:20px;\" id=\"txtLowANIDBrating\" type=\"text\" name=\"txtLowANIDBrating\" value=\"\" /></td></tr><tr><td>Color bad rating: </td><td><input style=\"width:60px;\" id=\"txtLowANIDBcolor\" type=\"text\" name=\"txtLowANIDBcolor\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Username: </td><td><input style=\"width:100px;\" id=\"txtANIDBUsername\" type=\"text\" name=\"txtANIDBUsername\" value=\"\" /></td></tr><tr><td>Password: </td><td><input style=\"width:100px;\" id=\"txtANIDBPassword\" type=\"text\" name=\"txtANIDBPassword\" value=\"\" /></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okANIDBsettings\"></td><td align=\"right\" id=\"cancelANIDBsettings\"></td></tr></table>";

strCACHEInformation = "<table><tr><td colspan=\"2\"><b>Cache information</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Items in cache:</td><td id=\"items_in_cache\"></td></tr><tr><td>Total Bytes:</td><td id=\"total_bytes\"></td></tr><tr><td>Average size:</td><td id=\"average_size\"></td></tr><tr><td>Encoding time (ms):</td><td id=\"encoding_time\"></td></tr><tr><td>Decoding time (ms):</td><td id=\"decoding_time\"></td></tr><tr><td>Total deleted items:</td><td id=\"total_deleted_items\"></td></tr><tr><td>Total cache references:</td><td id=\"total_cache_references\"></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td align=\"center\" colspan=\"2\" id=\"closeCACHEInformation\"></td></tr></table>";
strCachedContent = "<table><tr><td><b>Cache content</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Raw</td></tr><tr><td><div id=\"rawcachedcontent\" style=\"border:1px; border-style: solid; width:600px; height:200px; background-color:#ffffff; overflow:auto;\"></div></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Formatted</td></tr><tr><td><div id=\"formatedcachedcontent\" style=\"border:1px; border-style: solid; width:600px; height:300px; background-color:#ffffff; overflow:auto;\"></div></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td align=\"center\" colspan=\"2\" id=\"closeCACHEDContent\"></td></tr></table>";
strSabnzbdSetting = "<table><tr><td colspan=\"2\"><b>Settings Sabnzbd</b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Enable Sabnzbd</td><td><input type=\"checkbox\" name=\"chkEnableSABNZBD\" id=\"chkEnableSABNZBD\" /></td></tr><tr><td>Sabnzbd URL: </td><td><input style=\"width:250px;\" id=\"txtSabnzbURL\" type=\"text\" name=\"txtSabnzbURL\" value=\"\" /></td></tr><tr><td>API Key:  </td><td><input style=\"width:250px;\" id=\"txtSabnzbdAPIKEY\" type=\"text\" name=\"txtSabnzbdAPIKEY\" value=\"\" /></td></tr><tr><td>Username: </td><input style=\"width:250px;\" id=\"txtSabnzbdUsername\" type=\"text\" name=\"txtSabnzbdUsername\" value=\"\" /><td></td></tr><tr><td>Password: </td><input style=\"width:250px;\" id=\"txtSabnzbdPassword\" type=\"text\" name=\"txtSabnzbdPassword\" value=\"\" /><td></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okSABNZBDsettings\"></td><td align=\"right\" id=\"cancelSABNZBDsettings\"></td></tr></table>";
strScriptUpdate = "<table><tr><td colspan=\"2\"><b>Newzbin Helper</b></td></tr><tr><td colspan=\"2\"><b style=\"color:red\"><blink>New version available</blink></b></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td>Installed version: </td><td>"+const_scriptVersion+"</td></tr><tr><td>Remote version: </td><td id='remoteScriptVersion'></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td colspan=\"2\"><a target=\"_blank\" href=\""+const_scriptHomepageURL+"\">Open script homepage</a></td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td colspan=\"2\">Do you want to update the script?</td></tr><tr><td colspan=\"2\"><hr style=\"border: 1px solid #fff;\" /></td></tr><tr><td id=\"okScriptUpdate\"></td><td align=\"right\" id=\"cancelScriptUpdate\"></td></tr></table>";

strFindOnTheWeb  = "<table><tr><td colspan=\"7\"><b>Find on the web<b></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\"><hr style=\"border: 1px solid #fff;\" /></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\" style=\"font-size: 8pt; font-weight: bold;\">:: games & consoles ::</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableGAMERANKINGS\" id=\"chkEnableGAMERANKINGS\" /></td><td><img src='"+faviconGamerankings+"'/></td><td>Gamerankings.com</td><td>&nbsp;</td><td><input type=\"checkbox\" name=\"chkEnableGAMETRAILERS\" id=\"chkEnableGAMETRAILERS\" /></td><td><img src='"+faviconGametrailers+"'/></td><td>Gametrailers.com</td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\"><hr style=\"border: 1px solid #fff;\" /></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\" style=\"font-size: 8pt; font-weight: bold;\">:: tv ::</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableTVCOM\" id=\"chkEnableTVCOM\" /></td><td><img src='"+faviconTVcom+"'/></td><td>TV.com</td><td>&nbsp;</td><td></td><td></td><td></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\"><hr style=\"border: 1px solid #fff;\" /></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\" style=\"font-size: 8pt; font-weight: bold;\">:: music ::</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableLASTFM\" id=\"chkEnableLASTFM\" /></td><td><img src='"+faviconLastFM+"'/></td><td>Last.fm</td><td>&nbsp;</td><td></td><td></td><td></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\"><hr style=\"border: 1px solid #fff;\" /></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\" style=\"font-size: 8pt; font-weight: bold;\">:: movies ::</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableONDERTITELS\" id=\"chkEnableONDERTITELS\" /></td><td><img src='"+faviconOndertitels+"'/></td><td>Ondertitels.com</td><td>&nbsp;</td><td><input type=\"checkbox\" name=\"chkEnableNLONDERTITELS\" id=\"chkEnableNLONDERTITELS\" /></td><td><img src='"+faviconNLondertitels+"'/></td><td>NLondertitels.com</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableVCDQ\" id=\"chkEnableVCDQ\" /></td><td><img src='"+faviconVCDQ+"'/></td><td>Vcdq.com</td><td>&nbsp;</td><td></td><td></td><td></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\"><hr style=\"border: 1px solid #fff;\" /></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\" style=\"font-size: 8pt; font-weight: bold;\">:: applications ::</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableZDNET\" id=\"chkEnableZDNET\" /></td><td><img src='"+faviconZDnet+"'/></td><td>ZDnet.com</td><td>&nbsp;</td><td></td><td></td><td></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\"><hr style=\"border: 1px solid #fff;\" /></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\" style=\"font-size: 8pt; font-weight: bold;\">:: video reference ::</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableYOUTUBE\" id=\"chkEnableYOUTUBE\" /></td><td><img src='"+faviconYouTube+"'/></td><td>Youtube.com</td><td>&nbsp;</td><td><input type=\"checkbox\" name=\"chkEnableBLINKX\" id=\"chkEnableBLINKX\" /></td><td><img src='"+faviconBlinkx+"'/></td><td>Blinkx.com</td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\"><hr style=\"border: 1px solid #fff;\" /></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\" style=\"font-size: 8pt; font-weight: bold;\">:: index sites ::</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableTHEPIRATEBAY\" id=\"chkEnableTHEPIRATEBAY\" /></td><td><img src='"+faviconThePiratebay+"'/></td><td>Thepriratebay.org</td><td>&nbsp;</td><td><input type=\"checkbox\" name=\"chkEnableNZBMATRIX\" id=\"chkEnableNZBMATRIX\" /></td><td><img src='"+faviconNZBmatrix+"'/></td><td>NZBMatrix.com</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableBTJUNKIE\" id=\"chkEnableBTJUNKIE\" /></td><td><img src='"+faviconBTjunkie+"'/></td><td>BTjunkie.org</td><td>&nbsp;</td><td></td><td></td><td></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\"><hr style=\"border: 1px solid #fff;\" /></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\" style=\"font-size: 8pt; font-weight: bold;\">:: general ::</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableGOOGLE\" id=\"chkEnableGOOGLE\" /></td><td><img src='"+faviconGoogle+"'/></td><td>Google.com</td><td>&nbsp;</td><td><input type=\"checkbox\" name=\"chkEnableWIKIPEDIA\" id=\"chkEnableWIKIPEDIA\" /></td><td><img src='"+faviconWikipedia+"'/></td><td>Wikipedia.org</td></tr>";
strFindOnTheWeb += "<tr><td><input type=\"checkbox\" name=\"chkEnableMETACRITIC\" id=\"chkEnableMETACRITIC\" /></td><td><img src='"+faviconMetacritic+"'/></td><td>Metacritic.com</td><td>&nbsp;</td><td></td><td></td><td></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"7\"><hr style=\"border: 1px solid #fff;\" /></td></tr>";
strFindOnTheWeb += "<tr><td colspan=\"3\" id=\"okFindOnTheWebsettings\"></td><td>&nbsp;</td><td colspan=\"3\" align=\"right\" id=\"cancelFindOnTheWebsettings\"></td></tr>";
strFindOnTheWeb += "<table>";


//== Objects	
function providerData (){
	this.timestamp = null;
	this.ratingInfo = null;
	this.description = null;
	this.castMembers = null;
	this.genreInfo = null;
	this.boxshot = null;
	this.rottomInfo = null;
	this.providerType = null;
	this.boxshotURL = null;
	this.publisher = null;
	this.developer = null;
	this.contentrating = null;
	this.label = null;
	this.releasedate = null;
	this.recordlength = null;
	this.episodedescription = null;
	this.targeturl = null;
	this.votes = null;
	this.consensus = null;
	this.category = null;
	
	this.encodeValue = function(value) {
		if (!value) return "";
		if (typeof(value) == "string") value = value.replace(/\|/g, "%7C");
		return value.toString();
	}
	
	this.decodeValue = function(value) {
		if (value == "") return null;
		return value.replace(/%7C/g, "|");
	}
	
	
	this.update = function(key)
	{
		this.timestamp = new Date().getTime();
		objCache[key] = this.addCache();
	}
	
	this.addCache = function()
	{
		var dataSet = new Array();
		dataSet.push(this.encodeValue(this.timestamp.toString()));
		dataSet.push(this.encodeValue(this.ratingInfo));
		dataSet.push(this.encodeValue(this.description));
		dataSet.push(this.encodeValue(this.castMembers));
		dataSet.push(this.encodeValue(this.genreInfo));
		dataSet.push(this.encodeValue(this.boxshot));
		dataSet.push(this.encodeValue(this.rottomInfo));
		dataSet.push(this.encodeValue(this.providerType));
		dataSet.push(this.encodeValue(this.boxshotURL));
		dataSet.push(this.encodeValue(this.publisher));
		dataSet.push(this.encodeValue(this.developer));
		dataSet.push(this.encodeValue(this.contentrating));
		dataSet.push(this.encodeValue(this.label));
		dataSet.push(this.encodeValue(this.releasedate));
		dataSet.push(this.encodeValue(this.recordlength));
		dataSet.push(this.encodeValue(this.episodedescription));
		dataSet.push(this.encodeValue(this.targeturl));
		dataSet.push(this.encodeValue(this.votes));
		dataSet.push(this.encodeValue(this.consensus));
		dataSet.push(this.encodeValue(this.category));

		return dataSet.join ("|");
	}

	this.readCache = function(strCache) 
	{
		var dataSet = strCache.split("|");
		this.timestamp = parseInt(this.decodeValue(dataSet[0]));
		this.ratingInfo = this.decodeValue(dataSet[1]);
		this.description = this.decodeValue(dataSet[2]);
		this.castMembers = this.decodeValue(dataSet[3]);
		this.genreInfo = this.decodeValue(dataSet[4]);
		this.boxshot = this.decodeValue(dataSet[5]);
		this.rottomInfo = this.decodeValue(dataSet[6]);
		this.providerType = this.decodeValue(dataSet[7]);
		this.boxshotURL = this.decodeValue(dataSet[8]);
		this.publisher = this.decodeValue(dataSet[9]);
		this.developer = this.decodeValue(dataSet[10]);
		this.contentrating = this.decodeValue(dataSet[11]);
		this.label = this.decodeValue(dataSet[12]);
		this.releasedate = this.decodeValue(dataSet[13]);
		this.recordlength = this.decodeValue(dataSet[14]);
		this.episodedescription = this.decodeValue(dataSet[15]);
		this.targeturl = this.decodeValue(dataSet[16]);
		this.votes = this.decodeValue(dataSet[17]);
		this.consensus = this.decodeValue(dataSet[18]);
		this.category = this.decodeValue(dataSet[19]);
	}
}

function Report (){
	this.ratingInfo = null;
	this.description = null;
	this.castMembers = null;
	this.genreInfo = null;
	this.boxshot = null;
	this.rottomInfo = null;
	this.providerType = null;
	this.boxshotURL = null;
	this.publisher = null;
	this.developer = null;
	this.contentrating = null;
	this.label = null;
	this.releasedate = null;
	this.recordlength = null;
	this.episodedescription = null;
	this.targeturl = null;
	this.votes = null;
	this.consensus = null;
	this.category = null;
	
	this.valueGoodrating = null;
	this.colorGoodrating = null;
	this.enableGoodrating = null;

	this.valueBadrating = null;
	this.colorBadrating = null;
	this.enableBadrating = null;
	
	this.show = function(reportbody, providerdata, cached, key, gUID)
	{
		this.ratingInfo = providerdata.ratingInfo;
		this.description = providerdata.description;
		this.castMembers = providerdata.castMembers;
		this.genreInfo = providerdata.genreInfo;
		this.boxshot = providerdata.boxshot;
		this.rottomInfo = providerdata.rottomInfo;
		this.providerType = providerdata.providerType;
		this.boxshotURL = providerdata.boxshotURL;
		this.publisher = providerdata.publisher;
		this.developer = providerdata.developer;
		this.contentrating = providerdata.contentrating;
		this.label = providerdata.label;
		this.releasedate = providerdata.releasedate;
		this.recordlength = providerdata.recordlength;
		this.episodedescription = providerdata.episodedescription;
		this.targeturl = providerdata.targeturl;
		this.votes = providerdata.votes;
		this.consensus = providerdata.consensus;
		this.category = providerdata.category;
	
		if (this.providerType == const_imdb)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Plot:</b> " + this.description + "</div>";
			extraInfo += "<div><b>Genre: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div><b>Cast: </b>" + this.castMembers + "</div>";
			extraInfo += "<div style=\"display: none;\"id='rottenconsensus"+gUID+"'><b>Consensus:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div style=\"width: 450px; display: none;\" id='rottentomato"+gUID+"'><b>Tomatometer:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";

			var faviconIMG = 'http://www.imdb.org/favicon.ico';
		}
		else if (this.providerType == const_gamespot)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Description: </b>" + this.description + "</div>";
			extraInfo += "<div><b>Genre: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div><b>Publisher: </b>" + this.publisher + "</div>";
			extraInfo += "<div><b>Developer: </b>" + this.developer + "</div>";
			extraInfo += "<div><b>Content rating: </b>" + this.contentrating + "</div>";
			
			var faviconIMG = 'http://www.gamespot.com/favicon.ico';
		}
		else if (this.providerType == const_allmusic)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Label: </b>" + this.label + "</div>";
			extraInfo += "<div><b>Genre: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div><b>Release date: </b>" + this.releasedate + "</div>";
			extraInfo += "<div><b>Record length: </b>" + this.recordlength + "</div>";
		
			var faviconIMG = 'http://www.allmusic.com/favicon.ico'; 
		}
		else if (this.providerType == const_ign)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Description: </b>" + this.description + "</div>";
			extraInfo += "<div><b>Genre: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div><b>Publisher: </b>" + this.publisher + "</div>";
			extraInfo += "<div><b>Developer: </b>" + this.developer + "</div>";
			extraInfo += "<div><b>Content rating: </b>" + this.contentrating + "</div>";

			var faviconIMG = 'http://www.ign.com/favicon.ico'; 
		}
		else if (this.providerType == const_amazon_music)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Description: </b>" + this.description + "</div>";
			extraInfo += "<div><b>Label: </b>" + this.label + "</div>";
			extraInfo += "<div><b>Genre: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div><b>Release date: </b>" + this.releasedate + "</div>";

			var faviconIMG = 'http://www.amazon.com/favicon.ico'; 
		}
		else if (this.providerType == const_amazon_games)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Description: </b>" + this.description + "</div>";
			extraInfo += "<div><b>Publisher: </b>" + this.publisher + "</div>";
			extraInfo += "<div><b>Content rating: </b>" + this.contentrating + "</div>";

			var faviconIMG = 'http://www.amazon.com/favicon.ico'; 
		}
		else if (this.providerType == const_amazon_tv)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Plot: </b>" + this.description + "</div>";

			var faviconIMG = 'http://www.amazon.com/favicon.ico'; 
		}
		else if (this.providerType == const_amazon_movies)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Plot: </b>" + this.description + "</div>";
			extraInfo += "<div><b>Genre: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div><b>Cast: </b>" + this.castMembers + "</div>";

			var faviconIMG = 'http://www.amazon.com/favicon.ico'; 
		}
		else if (this.providerType == const_amazon_books)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Description: </b>" + this.description + "</div>";
			extraInfo += "<div><b>Cast: </b>" + this.castMembers + "</div>";

			var faviconIMG = 'http://www.amazon.com/favicon.ico'; 
		}
		else if (this.providerType == const_amazon_unknown)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Description: </b>" + this.description + "</div>";
			extraInfo += "<div><b>Category: </b><blink>Unknown</blink></div>";

			var faviconIMG = 'http://www.amazon.com/favicon.ico'; 
		}
		else if (this.providerType == const_googlemusic)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Release date: </b>" + this.releasedate + "</div>";
		
			var faviconIMG = 'http://www.google.com/favicon.ico'; 
		}
		else if (this.providerType == const_discogs)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Label: </b>" + this.label + "</div>";
			extraInfo += "<div><b>Genre: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div><b>Release date: </b>" + this.releasedate + "</div>";

			var faviconIMG = 'http://www.discogs.com/images/favicon.ico'; 
		}
		else if (this.providerType == const_cduniverse)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Label: </b>" + this.label + "</div>";
			extraInfo += "<div><b>Genre: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div><b>Release date: </b>" + this.releasedate + "</div>";

			var faviconIMG = 'http://www.cduniverse.com/favicon.ico'; 
		}
		else if (this.providerType == const_tvrage)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Plot:</b> " + this.description + "</div>";
			extraInfo += "<div><b>Genre: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div id='episodesummary"+gUID+"'><b>Episode summary: </b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";

			var faviconIMG = 'http://www.tvrage.com/favicon.ico'; 
		}
		else if (this.providerType == const_anidb)
		{
			var extraInfo =  "<div id='rating"+gUID+"'><b>Rating:</b>&nbsp;<img src='"+gettingInfo+"' alt='checking' /></div>";
			extraInfo += "<div><b>Plot:</b> " + this.description + "</div>";
			extraInfo += "<div><b>Genre: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div><b>Release date: </b>" + this.releasedate + "</div>";

			var faviconIMG = 'http://anidb.net/favicon.ico';
		}
		else if (this.providerType == const_zdnet)
		{
			var extraInfo = "<div><b>Description:</b> " + this.description + "</div>";
			extraInfo += "<div><b>Tags: </b>" + this.genreInfo + "</div>";
			extraInfo += "<div><b>Release date: </b>" + this.releasedate + "</div>";
			extraInfo += "<div><b>Developer: </b>" + this.developer + "</div>";

			var faviconIMG = 'http://downloads.zdnet.com/images/zd.favicon.ico';
		}


		var extrainfoTR = document.getElementById('TR'+gUID);
		extrainfoTR.innerHTML = "<td colspan='2' align='center' id='boxshot"+gUID+"'><img src='"+gettingInfo+"' alt='checking' /></td><td id='tdFaviconCache"+gUID+"' valign='bottom'></td><td colspan='3'>" + extraInfo + "</td>";

		highlightReport(reportbody, this.ratingInfo, this.valueGoodrating, this.enableGoodrating, this.colorGoodrating, this.valueBadrating, this.enableBadrating, this.colorBadrating, gUID, faviconIMG, cached);
		
		var a_refreshReport = document.createElement("a");
		a_refreshReport.href = "javascript:void(null);";
		a_refreshReport.id = 'a_refreshReport'+gUID;
		var strTargetUrl = this.targeturl;
		var providerType = this.providerType;
		var category = this.category;
		a_refreshReport.addEventListener('click', function(){

			var currTDboxshot = document.getElementById('boxshot'+gUID);
			var currentColor = currTDboxshot.style.backgroundColor;

			var firstTD = document.createElement("td");
			firstTD.style.backgroundColor = currentColor;
			firstTD.colSpan = 2;
			firstTD.align = 'center';
			firstTD.id = 'boxshot'+gUID;
			
			var secondTD = document.createElement("td");
			secondTD.style.backgroundColor = currentColor;
			secondTD.colSpan = 4;
			
			var checkingImage = document.createElement("img");
			checkingImage.src = gettingInfo;
			checkingImage.alt = 'checking';
			
			while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
			
			firstTD.appendChild(checkingImage);
			extrainfoTR.appendChild(firstTD);
			extrainfoTR.appendChild(secondTD);

			switch(parseFloat(providerType)) {
				case const_imdb:
					getInfoIMDB(reportbody,strTargetUrl, category, gUID, false, maxNumberRetriesReloadData);
					break;
				case const_gamespot:
					getInfoGamespot(reportbody, strTargetUrl, category, gUID, false), maxNumberRetriesReloadData;
					break;
				case const_allmusic:
					getInfoAllMusic(reportbody, strTargetUrl, category, gUID, false, maxNumberRetriesReloadData);
					break;
				case const_ign:
					getInfoIGN(reportbody, strTargetUrl, category, gUID, false, maxNumberRetriesReloadData);
					break;
				case const_amazon_music: case const_amazon_tv: case const_amazon_games: case const_amazon_movies: case const_amazon_books:
					getInfoAmazon(reportbody, strTargetUrl, category, gUID, false, maxNumberRetriesReloadData);
					break;
				case const_googlemusic:
					getInfoGoogleMusic(reportbody, strTargetUrl, category, gUID, false, maxNumberRetriesReloadData);
					break;
				case const_discogs:
					getInfoDiscogs(reportbody, strTargetUrl, category, gUID, false, maxNumberRetriesReloadData);
					break;
				case const_cduniverse:
					getInfoCDuniverse(reportbody, strTargetUrl, category, gUID, false, maxNumberRetriesReloadData);
					break;
				case const_tvrage:
					getInfoTVrage(reportbody, strTargetUrl, category, gUID, false, maxNumberRetriesReloadData);
					break;
				case const_anidb:
					getInfoANIDB(reportbody,strTargetUrl, category, gUID, false, maxNumberRetriesReloadData);
					break;
				case const_zdnet:
					getInfoZDNET(reportbody,'http://downloads.zdnet.com/search.aspx?q=', category, gUID, false, maxNumberRetriesReloadData);
					break;
			}
		}, false);
		
		var faviconTitleMatch = faviconIMG.match(newzBinFaviconTitleRegex);	
		var img_favicon = document.createElement("img");
		img_favicon.id = "favicon"+gUID;
		img_favicon.src = faviconIMG;
		img_favicon.title = "Refresh data from " + faviconTitleMatch[1];


		var img_spacer = document.createElement("img");
		img_spacer.width = "5";
		img_spacer.src = spacer;

		a_refreshReport.appendChild(img_favicon);
		
		var tagtdFaviconCache = document.getElementById('tdFaviconCache'+gUID);
		tagtdFaviconCache.appendChild(a_refreshReport);
		tagtdFaviconCache.appendChild(img_spacer);
		
		if (cached) {
			var tagCacheicon = document.createElement("img");
			tagCacheicon.id = "cache"+gUID;
			tagCacheicon.width = "19";
			tagCacheicon.src = cacheComplete;
			tagCacheicon.title = 'Completely cached'
			tagtdFaviconCache.appendChild(tagCacheicon);
		}
		
		if(this.providerType != const_zdnet){
			if (this.ratingInfo != null)
			{
				var ratingDiv = document.getElementById('rating'+gUID);

				if (this.ratingInfo == "N/A")
				{
					var strRatingInfo = "<b>Rating: </b>" + this.ratingInfo;
					ratingDiv.innerHTML = strRatingInfo;
				}
				else
				{
					var starRating = createRating(this.ratingInfo);
					var strRatingInfo = "<b>Rating: </b>" + starRating + "&nbsp;&nbsp;&nbsp;&nbsp;<b>" + this.ratingInfo + "/10</b>";
					if (this.votes != null){strRatingInfo += "&nbsp;("+this.votes+"&nbsp;votes)";}
					ratingDiv.innerHTML = strRatingInfo;
				}
			}
			else if (this.ratingInfo == null && cached)
			{
				GetIGNScore(reportbody, key, gUID, true);
				tagCacheicon.src =   cacheInProgress;
				tagCacheicon.title = 'Caching in progress';
			}
		}
			
		if (this.providerType == const_tvrage)
		{
			if (this.episodedescription != null)
			{
				var episodesummaryDiv = document.getElementById('episodesummary'+gUID);
				var strEpisodeSummary = "<b>Episode summary: </b>" + this.episodedescription;
				episodesummaryDiv.innerHTML = strEpisodeSummary;

				}
			else if (this.episodedescription == null && cached)
			{
				GetTVRAGEEpisodeSummary(this.targeturl, key, gUID)
				tagCacheicon.src =   cacheInProgress;
				tagCacheicon.title = 'Caching in progress';
			}
	
		}

		if (this.providerType == const_imdb)
		{
			var dataRottenTomatoes = document.getElementById('rottentomato'+gUID)
			var dataRottenConsensus = document.getElementById('rottenconsensus'+gUID)
			if (enableROTTOMinfo){dataRottenTomatoes.style.display = 'block';dataRottenConsensus.style.display = 'block';}
		
			if (this.rottomInfo != null)
			{
				var dataSet = this.rottomInfo.split("|");

				var dataRottenTomatoesinnerHTML = "<b>Tomatometer: </b>" + dataSet[0];

				if (dataSet.length > 1)
				{
					var rtIcon = "<img src='" + eval(dataSet[5]) + "' title='"+dataSet[5]+"' />";

					dataRottenTomatoesinnerHTML += "%&nbsp;" + rtIcon + "&nbsp;";
					dataRottenTomatoesinnerHTML += "<div style=\"position: relative; top: -13px; left:190px; overflow: hidden; clear: both; width: 107px; height: 13px; margin-left: 5px;  background: url("+tomatometer_bar_bg+") no-repeat left top;\">";
					dataRottenTomatoesinnerHTML += "<img style=\"float: left; height: 12px; width: 6px;\"  src=\""+tomatometer_bar_over_left+"\">";
					dataRottenTomatoesinnerHTML += "<img style=\"float: left; height: 12px; width: " + dataSet[0] + "px;\"  src=\""+tomatometer_bar_over_middle+"\">";
					dataRottenTomatoesinnerHTML += "</div>";
					dataRottenTomatoesinnerHTML += "<div style=\"position: relative; top: -26px; left:310px;  font-size: 7pt;\">" + dataSet[1] + "&nbsp;&nbsp;<img src='" + tomato + "' />" + dataSet[2] + "&nbsp;&nbsp;<img src='" + splat + "' />" + dataSet[3] + "&nbsp;&nbsp;" + dataSet[4] + " | <a target='_blank' href='http://www.rottentomatoes.com/alias?type=imdbid&s=" + key + "'>more</a></div>";
				}

				dataRottenTomatoes.innerHTML = dataRottenTomatoesinnerHTML;
			}

			if (this.consensus != null)
			{
				dataRottenConsensus.innerHTML = "<b>Consensus: </b>" + this.consensus
			}

			if ((this.rottomInfo == null || this.consensus == null) && cached)
			{
				GetRottenTomatoesInfo('http://www.rottentomatoes.com/alias?type=imdbid&s=' + key, key, gUID); // haal de achterstallige data op.
				tagCacheicon.src =   cacheInProgress;
				tagCacheicon.title = 'Caching in progress'
			}
		}

		
		if (this.boxshot != null && cached)
		{
			if (this.boxshot != "error")
			{
				var a_Boxshot = document.createElement("a");
				a_Boxshot.href = "javascript:void(null)";
				a_Boxshot.addEventListener('click', function(){
					
					showLightBox(this.childNodes[0].width, this.childNodes[0].height, this.childNodes[0].src);
					
				}, false);
				
				var img_Boxshot = document.createElement("img");
				img_Boxshot.width = "94";
				img_Boxshot.src = "data:image/jpeg;base64," + this.boxshot;

				a_Boxshot.appendChild(img_Boxshot);

				var parentBoxshotIMG = document.getElementById('boxshot'+gUID)
				while (parentBoxshotIMG.hasChildNodes()){parentBoxshotIMG.removeChild(parentBoxshotIMG.firstChild);}
				parentBoxshotIMG.appendChild(a_Boxshot);
			}
			else
			{
				var img_Boxshot = document.createElement("img");
				img_Boxshot.src = noBoxshot;
				
				var parentBoxshotIMG = document.getElementById('boxshot'+gUID)
				while (parentBoxshotIMG.hasChildNodes()){parentBoxshotIMG.removeChild(parentBoxshotIMG.firstChild);}
				parentBoxshotIMG.appendChild(img_Boxshot);
			}
		}
		else if (this.boxshot == null && cached)
		{
			if (this.boxshotURL == null){this.boxshotURL = "";}
			loadBoxshotImage(this.boxshotURL, key, gUID);
			if (BOXSHOTCACHEEnable){
				tagCacheicon.src =   cacheInProgress;
				tagCacheicon.title = 'Caching in progress'
			}
		}
		
		showTitleIcons (reportbody, this.category, gUID);
		insertSabnzbdIcon(reportbody, gUID);
		insertFindonTheWebIcon(reportbody, this.category, gUID);
		

	}
}

var Base64 = {

    // private property
    _keyStr :
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = new Array();
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {

            chr1 = input.charCodeAt(i++) & 0xff;
            chr2 = input.charCodeAt(i++) & 0xff;
            chr3 = input.charCodeAt(i++) & 0xff;

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output.push(this._keyStr.charAt(enc1));
            output.push(this._keyStr.charAt(enc2));
            output.push(this._keyStr.charAt(enc3));
            output.push(this._keyStr.charAt(enc4));
        }

        return output.join("");
    }
}



//== Functions
function sleep(value){
	value = value * 1000;
	var sleeping = true;
	var now = new Date();
	var alarm;
	var startingMSeconds = now.getTime();
	while(sleeping){
		alarm = new Date();
		alarmMSeconds = alarm.getTime();
		if(alarmMSeconds - startingMSeconds > value){ sleeping = false; }
	}        
}

function trim(value) {
  value = value.replace(/^\s+/,'');
  value = value.replace(/\s+$/,'');
  return value;
}

function stripHTML(oldString){

  return oldString.replace(/<[^>]+>/g, "");
  
}

function right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function left(str, n){
	if (n <= 0)
	    return "";
	else if (n > String(str).length)
	    return str;
	else
	    return String(str).substring(0,n);
}

function S4() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function guid() {
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function getPageScroll(){

	var yScroll;

	if (self.pageYOffset) {
		yScroll = self.pageYOffset;
	} else if (document.documentElement && document.documentElement.scrollTop){	 // Explorer 6 Strict
		yScroll = document.documentElement.scrollTop;
	} else if (document.body) {// all other Explorers
		yScroll = document.body.scrollTop;
	}

	arrayPageScroll = new Array('',yScroll);
	return arrayPageScroll;
}

function getPageSize(){
	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}


	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
	return arrayPageSize;
}

function cleanTitle(value){
	value = value.replace(/&amp;/g,'&');
	value = trim(value.replace('(Passworded)',''));
	value = trim(value.replace('(Password Protected)',''));
	value = trim(value.replace('(Virus)',''));
	value = trim(value.replace('(Virus Found)',''));
	value = trim(value.replace('(trojan)',''));
	
	return value;
}

function cleanSearchString(value){
	var searchStringFull = value.match(/[^\(]+/);
	searchStringFull = trim(searchStringFull[0].replace(/&amp;/g,'&'));
	searchString = searchStringFull.split(" - ");
	if (trim(searchString[0]) == "VA"){searchString = searchString[1];}else{searchString = searchString[0];}
	searchString = trim(searchString);
	
	arraySearchString = new Array(searchStringFull,searchString)
	
	return arraySearchString

}

function createRating(rating){
		var star = "";
		for (var x = 0; x < Math.round(parseFloat(rating)); x++)
		{
			star += enabledStar;
		}
		if (Math.round(parseFloat(rating)) < 10)
		{
			for (var x = 0; x < (10 - Math.round(parseFloat(rating))); x++)
			{
				star += disabledStar;
			}
		}
	
		return star;
	}

function HidePopup(PopupWindow,doAction) {
		if(PopupWindow.length < 1) { return; }
		
		document.getElementById(PopupWindow).style.display = "none";
		document.getElementById('colorpicker201').style.display = "none";

		
		if ( doAction == 'ok' && PopupWindow == 'IMDBSettingsPopup')
		{
			GM_setValue("enableGoodIMDBrating",document.getElementById('chkEnableGoodratingIMDB').checked);
			GM_setValue("valueGoodIMDBrating",document.getElementById('txtHighIMDBrating').value);
			GM_setValue("colorGoodIMDBrating",document.getElementById('txtHighIMDBcolor').value);

			GM_setValue("enableBadIMDBrating",document.getElementById('chkEnableBadratingIMDB').checked);
			GM_setValue("valueBadIMDBrating",document.getElementById('txtLowIMDBrating').value);
			GM_setValue("colorBadIMDBrating",document.getElementById('txtLowIMDBcolor').value);

			GM_setValue("enableROTTOMinfo",document.getElementById('chkEnableROTTOMinfo').checked);

			window.location.reload();
			}
		else if ( doAction == 'ok' && PopupWindow == 'GAMESPOTSettingsPopup')
		{
			GM_setValue("enableGoodGAMESPOTrating",document.getElementById('chkEnableGoodratingGAMESPOT').checked);
			GM_setValue("valueGoodGAMESPOTrating",document.getElementById('txtHighGAMESPOTrating').value);
			GM_setValue("colorGoodGAMESPOTrating",document.getElementById('txtHighGAMESPOTcolor').value);

			GM_setValue("enableBadGAMESPOTrating",document.getElementById('chkEnableBadratingGAMESPOT').checked);
			GM_setValue("valueBadGAMESPOTrating",document.getElementById('txtLowGAMESPOTrating').value);
			GM_setValue("colorBadGAMESPOTrating",document.getElementById('txtLowGAMESPOTcolor').value);
			
			window.location.reload();
		}
		else if ( doAction == 'ok' && PopupWindow == 'ALLMUSICSettingsPopup')
		{
			GM_setValue("enableGoodALLMUSICrating",document.getElementById('chkEnableGoodratingALLMUSIC').checked);
			GM_setValue("valueGoodALLMUSICrating",document.getElementById('txtHighALLMUSICrating').value);
			GM_setValue("colorGoodALLMUSICrating",document.getElementById('txtHighALLMUSICcolor').value);

			GM_setValue("enableBadALLMUSICrating",document.getElementById('chkEnableBadratingALLMUSIC').checked);
			GM_setValue("valueBadALLMUSICrating",document.getElementById('txtLowALLMUSICrating').value);
			GM_setValue("colorBadALLMUSICrating",document.getElementById('txtLowALLMUSICcolor').value);
			
			window.location.reload();
		}
		else if ( doAction == 'ok' && PopupWindow == 'SABNZBDSettingsPopup')
		{
			
			if (right(document.getElementById('txtSabnzbURL').value,1) != "/"){document.getElementById('txtSabnzbURL').value += '/';}
			GM_setValue("enableSABNZBD",document.getElementById('chkEnableSABNZBD').checked);
			GM_setValue("sabnzbdURL",document.getElementById('txtSabnzbURL').value);
			GM_setValue("sabnzbdAPIKEY",document.getElementById('txtSabnzbdAPIKEY').value);
			GM_setValue("sabnzbdUsername",document.getElementById('txtSabnzbdUsername').value);
			GM_setValue("sabnzbdPassword",document.getElementById('txtSabnzbdPassword').value);
			
			window.location.reload();
		}
		else if ( doAction == 'ok' && PopupWindow == 'IGNSettingsPopup')
		{
			GM_setValue("enableGoodIGNrating",document.getElementById('chkEnableGoodratingIGN').checked);
			GM_setValue("valueGoodIGNrating",document.getElementById('txtHighIGNrating').value);
			GM_setValue("colorGoodIGNrating",document.getElementById('txtHighIGNcolor').value);

			GM_setValue("enableBadIGNrating",document.getElementById('chkEnableBadratingIGN').checked);
			GM_setValue("valueBadIGNrating",document.getElementById('txtLowIGNrating').value);
			GM_setValue("colorBadIGNrating",document.getElementById('txtLowIGNcolor').value);
			
			window.location.reload();
		}
		else if ( doAction == 'ok' && PopupWindow == 'AMAZONSettingsPopup')
		{
			GM_setValue("enableGoodAMAZONrating",document.getElementById('chkEnableGoodratingAMAZON').checked);
			GM_setValue("valueGoodAMAZONrating",document.getElementById('txtHighAMAZONrating').value);
			GM_setValue("colorGoodAMAZONrating",document.getElementById('txtHighAMAZONcolor').value);

			GM_setValue("enableBadAMAZONrating",document.getElementById('chkEnableBadratingAMAZON').checked);
			GM_setValue("valueBadAMAZONrating",document.getElementById('txtLowAMAZONrating').value);
			GM_setValue("colorBadAMAZONNrating",document.getElementById('txtLowAMAZONcolor').value);
			
			window.location.reload();
		}
		else if ( doAction == 'ok' && PopupWindow == 'GOOGLEMUSICSettingsPopup')
		{
			GM_setValue("enableGoodGOOGLEMUSICrating",document.getElementById('chkEnableGoodratingGOOGLEMUSIC').checked);
			GM_setValue("valueGoodGOOGLEMUSICrating",document.getElementById('txtHighGOOGLEMUSICrating').value);
			GM_setValue("colorGoodGOOGLEMUSICrating",document.getElementById('txtHighGOOGLEMUSICcolor').value);

			GM_setValue("enableBadGOOGLEMUSICrating",document.getElementById('chkEnableBadratingGOOGLEMUSIC').checked);
			GM_setValue("valueBadGOOGLEMUSICrating",document.getElementById('txtLowGOOGLEMUSICrating').value);
			GM_setValue("colorBadGOOGLEMUSICrating",document.getElementById('txtLowGOOGLEMUSICcolor').value);
			
			window.location.reload();
		}
		else if ( doAction == 'ok' && PopupWindow == 'DISCOGSSettingsPopup')
		{
			GM_setValue("enableGoodDISCOGSrating",document.getElementById('chkEnableGoodratingDISCOGS').checked);
			GM_setValue("valueGoodDISCOGSrating",document.getElementById('txtHighDISCOGSrating').value);
			GM_setValue("colorGoodDISCOGSrating",document.getElementById('txtHighDISCOGScolor').value);

			GM_setValue("enableBadDISCOGSrating",document.getElementById('chkEnableBadratingDISCOGS').checked);
			GM_setValue("valueBadDISCOGSrating",document.getElementById('txtLowDISCOGSrating').value);
			GM_setValue("colorBadDISCOGSrating",document.getElementById('txtLowDISCOGScolor').value);
			
			window.location.reload();
		}
		else if ( doAction == 'ok' && PopupWindow == 'CDUNIVERSESettingsPopup')
		{
			GM_setValue("enableGoodCDUNIVERSErating",document.getElementById('chkEnableGoodratingCDUNIVERSE').checked);
			GM_setValue("valueGoodCDUNIVERSErating",document.getElementById('txtHighCDUNIVERSErating').value);
			GM_setValue("colorGoodCDUNIVERSErating",document.getElementById('txtHighCDUNIVERSEcolor').value);

			GM_setValue("enableBadCDUNIVERSErating",document.getElementById('chkEnableBadratingCDUNIVERSE').checked);
			GM_setValue("valueBadCDUNIVERSErating",document.getElementById('txtLowCDUNIVERSErating').value);
			GM_setValue("colorBadCDUNIVERSErating",document.getElementById('txtLowCDUNIVERSEcolor').value);
			
			window.location.reload();
		}
		else if ( doAction == 'ok' && PopupWindow == 'TVRAGESettingsPopup')
		{
			GM_setValue("enableGoodTVRAGErating",document.getElementById('chkEnableGoodratingTVRAGE').checked);
			GM_setValue("valueGoodTVRAGErating",document.getElementById('txtHighTVRAGErating').value);
			GM_setValue("colorGoodTVRAGErating",document.getElementById('txtHighTVRAGEcolor').value);

			GM_setValue("enableBadTVRAGErating",document.getElementById('chkEnableBadratingTVRAGE').checked);
			GM_setValue("valueBadTVRAGErating",document.getElementById('txtLowTVRAGErating').value);
			GM_setValue("colorBadTVRAGErating",document.getElementById('txtLowTVRAGEcolor').value);
			
			window.location.reload();
		}
		else if ( doAction == 'ok' && PopupWindow == 'ScriptUpdatePopup')
		{
			GM_setValue("showScriptUpdatePopup", false);
			window.location.href = const_scriptFileURL; 
		}
		else if ( doAction == 'cancel' && PopupWindow == 'ScriptUpdatePopup')
		{
			GM_setValue("showScriptUpdatePopup", false);
		}
		else if ( doAction == 'ok' && PopupWindow == 'ANIDBSettingsPopup')
		{
			GM_setValue("enableGoodANIDBrating",document.getElementById('chkEnableGoodratingANIDB').checked);
			GM_setValue("valueGoodANIDBrating",document.getElementById('txtHighANIDBrating').value);
			GM_setValue("colorGoodANIDBrating",document.getElementById('txtHighANIDBcolor').value);

			GM_setValue("enableBadANIDBrating",document.getElementById('chkEnableBadratingANIDB').checked);
			GM_setValue("valueBadANIDBrating",document.getElementById('txtLowANIDBrating').value);
			GM_setValue("colorBadANIDBrating",document.getElementById('txtLowANIDBcolor').value);

			GM_setValue("anidbUsername",document.getElementById('txtANIDBUsername').value);
			GM_setValue("anidbPassword",document.getElementById('txtANIDBPassword').value);

			window.location.reload();
		}
		else if ( doAction == 'ok' && PopupWindow == 'FindOnTheWebSettingsPopup')
		{
			GM_setValue("fotwTHEPIRATEBAY",document.getElementById('chkEnableTHEPIRATEBAY').checked);
			GM_setValue("fotwNZBMATRIX",document.getElementById('chkEnableNZBMATRIX').checked);
			GM_setValue("fotwBTJUNKIE",document.getElementById('chkEnableBTJUNKIE').checked);
			GM_setValue("fotwGOOGLE",document.getElementById('chkEnableGOOGLE').checked);
			GM_setValue("fotwLASTFM",document.getElementById('chkEnableLASTFM').checked);
			GM_setValue("fotwYOUTUBE",document.getElementById('chkEnableYOUTUBE').checked);
			GM_setValue("fotwBLINKX",document.getElementById('chkEnableBLINKX').checked);
			GM_setValue("fotwONDERTITELS",document.getElementById('chkEnableONDERTITELS').checked);
			GM_setValue("fotwNLONDERTITELS",document.getElementById('chkEnableNLONDERTITELS').checked);
			GM_setValue("fotwWIKIPEDIA",document.getElementById('chkEnableWIKIPEDIA').checked);
			GM_setValue("fotwZDNET",document.getElementById('chkEnableZDNET').checked);
			GM_setValue("fotwTVCOM",document.getElementById('chkEnableTVCOM').checked);
			GM_setValue("fotwVCDQ",document.getElementById('chkEnableVCDQ').checked);
			GM_setValue("fotwGAMERANKINGS",document.getElementById('chkEnableGAMERANKINGS').checked);
			GM_setValue("fotwMETACRITIC",document.getElementById('chkEnableMETACRITIC').checked);
			GM_setValue("fotwGAMETRAILERS",document.getElementById('chkEnableGAMETRAILERS').checked);

			window.location.reload();
		}

	}

function ShowPopup(PopupWindow){
		if(PopupWindow.length < 1) { return; }
		
		//Hide all popups
		document.getElementById('colorpicker201').style.display = "none";
		document.getElementById('IMDBSettingsPopup').style.display = "none";
		document.getElementById('GAMESPOTSettingsPopup').style.display = "none";
		document.getElementById('ALLMUSICSettingsPopup').style.display = "none";
		document.getElementById('CACHEInformationPopup').style.display = "none";
		document.getElementById('CACHEDContentPopup').style.display = "none";
		document.getElementById('SABNZBDSettingsPopup').style.display = "none";
		document.getElementById('IGNSettingsPopup').style.display = "none";
		document.getElementById('AMAZONSettingsPopup').style.display = "none";
		document.getElementById('GOOGLEMUSICSettingsPopup').style.display = "none";
		document.getElementById('DISCOGSSettingsPopup').style.display = "none";
		document.getElementById('CDUNIVERSESettingsPopup').style.display = "none";
		document.getElementById('TVRAGESettingsPopup').style.display = "none";
		document.getElementById('ScriptUpdatePopup').style.display = "none";
		document.getElementById('ANIDBSettingsPopup').style.display = "none";
		document.getElementById('FindOnTheWebSettingsPopup').style.display = "none";

		if ( PopupWindow == 'IMDBSettingsPopup' )
		{
			document.getElementById('chkEnableGoodratingIMDB').checked = GM_getValue("enableGoodIMDBrating", true);
			document.getElementById('txtHighIMDBrating').value = GM_getValue("valueGoodIMDBrating", "8");
			document.getElementById('txtHighIMDBcolor').value = GM_getValue("colorGoodIMDBrating", "#CCFF99");
			document.getElementById('txtHighIMDBcolor').style.backgroundColor = GM_getValue("colorGoodIMDBrating", "#CCFF99");
			
			document.getElementById('chkEnableBadratingIMDB').checked = GM_getValue("enableBadIMDBrating", true);
			document.getElementById('txtLowIMDBrating').value =  GM_getValue("valueBadIMDBrating", "6");
			document.getElementById('txtLowIMDBcolor').value =  GM_getValue("colorBadIMDBrating", "#FFCCFF");
			document.getElementById('txtLowIMDBcolor').style.backgroundColor =  GM_getValue("colorBadIMDBrating", "#FFCCFF");

			document.getElementById('chkEnableROTTOMinfo').checked = GM_getValue("enableROTTOMinfo", true);
		}
//		else if ( PopupWindow == 'ScriptUpdatePopup' )
//		{
//		}
		else if ( PopupWindow == 'GAMESPOTSettingsPopup' )
		{
			document.getElementById('chkEnableGoodratingGAMESPOT').checked = GM_getValue("enableGoodGAMESPOTrating", true);
			document.getElementById('txtHighGAMESPOTrating').value = GM_getValue("valueGoodGAMESPOTrating", "8");
			document.getElementById('txtHighGAMESPOTcolor').value = GM_getValue("colorGoodGAMESPOTrating", "#CCFF99");
			document.getElementById('txtHighGAMESPOTcolor').style.backgroundColor = GM_getValue("colorGoodGAMESPOTrating", "#CCFF99");

			document.getElementById('chkEnableBadratingGAMESPOT').checked = GM_getValue("enableBadGAMESPOTrating", true);
			document.getElementById('txtLowGAMESPOTrating').value =  GM_getValue("valueBadGAMESPOTrating", "6");
			document.getElementById('txtLowGAMESPOTcolor').value =  GM_getValue("colorBadGAMESPOTrating", "#FFCCFF");
			document.getElementById('txtLowGAMESPOTcolor').style.backgroundColor =  GM_getValue("colorBadGAMESPOTrating", "#FFCCFF");
		}
		else if ( PopupWindow == 'ALLMUSICSettingsPopup' )
		{
			document.getElementById('chkEnableGoodratingALLMUSIC').checked = GM_getValue("enableGoodALLMUSICrating", true);
			document.getElementById('txtHighALLMUSICrating').value = GM_getValue("valueGoodALLMUSICrating", "8");
			document.getElementById('txtHighALLMUSICcolor').value = GM_getValue("colorGoodALLMUSICrating", "#CCFF99");
			document.getElementById('txtHighALLMUSICcolor').style.backgroundColor = GM_getValue("colorGoodALLMUSICrating", "#CCFF99");

			document.getElementById('chkEnableBadratingALLMUSIC').checked = GM_getValue("enableBadALLMUSICrating", true);
			document.getElementById('txtLowALLMUSICrating').value =  GM_getValue("valueBadALLMUSICrating", "6");
			document.getElementById('txtLowALLMUSICcolor').value =  GM_getValue("colorBadALLMUSICrating", "#FFCCFF");
			document.getElementById('txtLowALLMUSICcolor').style.backgroundColor =  GM_getValue("colorBadALLMUSICrating", "#FFCCFF");
		}
		else if ( PopupWindow == 'CACHEInformationPopup' )
		{
			var i = 0;
			for (key in objCache) i++;
			var start = new Date().getTime();
			var str = objCache.toSource();
			var end = new Date().getTime();
			var ms = end - start;
			var bytes = str.length;
			var avg = bytes/i;
			if (avg == 'infinity'){avg=0;}

			document.getElementById('items_in_cache').innerHTML = i;
			document.getElementById('total_bytes').innerHTML = str.length;
			document.getElementById('average_size').innerHTML = avg;
			document.getElementById('encoding_time').innerHTML = ms;
			document.getElementById('decoding_time').innerHTML = decodingTime;
			document.getElementById('total_deleted_items').innerHTML = cache_items_deleted;
			document.getElementById('total_cache_references').innerHTML = cache_references;
		}
		else if ( PopupWindow == 'CACHEDContentPopup' )
		{
			document.getElementById('rawcachedcontent').innerHTML = objCache.toSource();
			
			var bgColor="#FFFFFF";
			strFormattedCache = "<table>"
			for (var key in objCache) {
				var providerdata = new providerData();
				providerdata.readCache(objCache[key]);
					strFormattedCache += "<tr bgcolor=\"" + bgColor + "\"><td><img width='94px' src='data:image/jpeg;base64," + providerdata.boxshot + "' /></td>";
					strFormattedCache += "<td><table>";
					strFormattedCache += "<tr><td valign=\"top\">timestamp</td><td>" + providerdata.timestamp + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">rating</td><td>" + providerdata.ratingInfo + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">description</td><td>" + providerdata.description + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">cast</td><td>" + providerdata.castMembers + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">genre</td><td>" + providerdata.genreInfo + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">rotten tomatoes</td><td>" + providerdata.rottomInfo + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">provider</td><td>" + providerdata.providerType + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">boxshot URL</td><td>" + providerdata.boxshotURL + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">publisher</td><td>" + providerdata.publisher + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">developer</td><td>" + providerdata.developer + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">contentrating</td><td>" + providerdata.contentrating + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">label</td><td>" + providerdata.label + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">releasedate</td><td>" + providerdata.releasedate + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">recordlength</td><td>" + providerdata.recordlength + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">episodedescription</td><td>" + providerdata.episodedescription + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">targeturl</td><td>" + providerdata.targeturl + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">votes</td><td>" + providerdata.votes + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">consensus</td><td>" + providerdata.consensus + "</td></tr>";
					strFormattedCache += "<tr><td valign=\"top\">category</td><td>" + providerdata.category + "</td></tr>";
					strFormattedCache += "</table></td></tr>";

				if ( bgColor == "#FFFFFF" ) { bgColor = "#EEEEEE"}
				else {bgColor = "#FFFFFF"}
			
			}
			strFormattedCache += "</table>"
			
			document.getElementById('formatedcachedcontent').innerHTML = strFormattedCache;
		}
		else if ( PopupWindow == 'SABNZBDSettingsPopup' )
		{
			document.getElementById('chkEnableSABNZBD').checked = GM_getValue("enableSABNZBD", false);
			document.getElementById('txtSabnzbURL').value = GM_getValue("sabnzbdURL", "http://192.168.1.6:8088/sabnzbd");
			document.getElementById('txtSabnzbdAPIKEY').value = GM_getValue("sabnzbdAPIKEY", "");
			document.getElementById('txtSabnzbdUsername').value =  GM_getValue("sabnzbdUsername", "");
			document.getElementById('txtSabnzbdPassword').value =  GM_getValue("sabnzbdPassword", "");
		}
		else if ( PopupWindow == 'IGNSettingsPopup' )
		{
			document.getElementById('chkEnableGoodratingIGN').checked = GM_getValue("enableGoodIGNrating", true);
			document.getElementById('txtHighIGNrating').value = GM_getValue("valueGoodIGNrating", "8");
			document.getElementById('txtHighIGNcolor').value = GM_getValue("colorGoodIGNrating", "#CCFF99");
			document.getElementById('txtHighIGNcolor').style.backgroundColor = GM_getValue("colorGoodIGNrating", "#CCFF99");

			document.getElementById('chkEnableBadratingIGN').checked = GM_getValue("enableBadIGNrating", true);
			document.getElementById('txtLowIGNrating').value =  GM_getValue("valueBadIGNrating", "6");
			document.getElementById('txtLowIGNcolor').value =  GM_getValue("colorBadIGNrating", "#FFCCFF");
			document.getElementById('txtLowIGNcolor').style.backgroundColor =  GM_getValue("colorBadIGNrating", "#FFCCFF");
		}
		else if ( PopupWindow == 'AMAZONSettingsPopup' )
		{
			document.getElementById('chkEnableGoodratingAMAZON').checked = GM_getValue("enableGoodAMAZONrating", true);
			document.getElementById('txtHighAMAZONrating').value = GM_getValue("valueGoodAMAZONrating", "8");
			document.getElementById('txtHighAMAZONcolor').value = GM_getValue("colorGoodAMAZONrating", "#CCFF99");
			document.getElementById('txtHighAMAZONcolor').style.backgroundColor = GM_getValue("colorGoodAMAZONrating", "#CCFF99");

			document.getElementById('chkEnableBadratingAMAZON').checked = GM_getValue("enableBadAMAZONrating", true);
			document.getElementById('txtLowAMAZONrating').value =  GM_getValue("valueBadAMAZONrating", "6");
			document.getElementById('txtLowAMAZONcolor').value =  GM_getValue("colorBadAMAZONrating", "#FFCCFF");
			document.getElementById('txtLowAMAZONcolor').style.backgroundColor =  GM_getValue("colorBadAMAZONrating", "#FFCCFF");
		}
		else if ( PopupWindow == 'GOOGLEMUSICSettingsPopup' )
		{
			document.getElementById('chkEnableGoodratingGOOGLEMUSIC').checked = GM_getValue("enableGoodGOOGLEMUSICrating", true);
			document.getElementById('txtHighGOOGLEMUSICrating').value = GM_getValue("valueGoodGOOGLEMUSICrating", "8");
			document.getElementById('txtHighGOOGLEMUSICcolor').value = GM_getValue("colorGoodGOOGLEMUSICrating", "#CCFF99");
			document.getElementById('txtHighGOOGLEMUSICcolor').style.backgroundColor = GM_getValue("colorGoodGOOGLEMUSICrating", "#CCFF99");

			document.getElementById('chkEnableBadratingGOOGLEMUSIC').checked = GM_getValue("enableBadGOOGLEMUSICrating", true);
			document.getElementById('txtLowGOOGLEMUSICrating').value =  GM_getValue("valueBadGOOGLEMUSICrating", "6");
			document.getElementById('txtLowGOOGLEMUSICcolor').value =  GM_getValue("colorBadGOOGLEMUSICrating", "#FFCCFF");
			document.getElementById('txtLowGOOGLEMUSICcolor').style.backgroundColor =  GM_getValue("colorBadGOOGLEMUSICrating", "#FFCCFF");
		}
		else if ( PopupWindow == 'DISCOGSSettingsPopup' )
		{
			document.getElementById('chkEnableGoodratingDISCOGS').checked = GM_getValue("enableGoodDISCOGSrating", true);
			document.getElementById('txtHighDISCOGSrating').value = GM_getValue("valueGoodDISCOGSrating", "8");
			document.getElementById('txtHighDISCOGScolor').value = GM_getValue("colorGoodDISCOGSrating", "#CCFF99");
			document.getElementById('txtHighDISCOGScolor').style.backgroundColor = GM_getValue("colorGoodDISCOGSrating", "#CCFF99");

			document.getElementById('chkEnableBadratingDISCOGS').checked = GM_getValue("enableBadDISCOGSrating", true);
			document.getElementById('txtLowDISCOGSrating').value =  GM_getValue("valueBadDISCOGSrating", "6");
			document.getElementById('txtLowDISCOGScolor').value =  GM_getValue("colorBadDISCOGSrating", "#FFCCFF");
			document.getElementById('txtLowDISCOGScolor').style.backgroundColor =  GM_getValue("colorBadDISCOGSrating", "#FFCCFF");
		}
		else if ( PopupWindow == 'CDUNIVERSESettingsPopup' )
		{
			document.getElementById('chkEnableGoodratingCDUNIVERSE').checked = GM_getValue("enableGoodCDUNIVERSErating", true);
			document.getElementById('txtHighCDUNIVERSErating').value = GM_getValue("valueGoodCDUNIVERSErating", "8");
			document.getElementById('txtHighCDUNIVERSEcolor').value = GM_getValue("colorGoodCDUNIVERSErating", "#CCFF99");
			document.getElementById('txtHighCDUNIVERSEcolor').style.backgroundColor = GM_getValue("colorGoodCDUNIVERSErating", "#CCFF99");

			document.getElementById('chkEnableBadratingCDUNIVERSE').checked = GM_getValue("enableBadCDUNIVERSErating", true);
			document.getElementById('txtLowCDUNIVERSErating').value =  GM_getValue("valueBadCDUNIVERSErating", "6");
			document.getElementById('txtLowCDUNIVERSEcolor').value =  GM_getValue("colorBadCDUNIVERSErating", "#FFCCFF");
			document.getElementById('txtLowCDUNIVERSEcolor').style.backgroundColor =  GM_getValue("colorBadCDUNIVERSErating", "#FFCCFF");
		}
		else if ( PopupWindow == 'TVRAGESettingsPopup' )
		{
			document.getElementById('chkEnableGoodratingTVRAGE').checked = GM_getValue("enableGoodTVRAGErating", true);
			document.getElementById('txtHighTVRAGErating').value = GM_getValue("valueGoodTVRAGErating", "8");
			document.getElementById('txtHighTVRAGEcolor').value = GM_getValue("colorGoodTVRAGErating", "#CCFF99");
			document.getElementById('txtHighTVRAGEcolor').style.backgroundColor = GM_getValue("colorGoodTVRAGErating", "#CCFF99");

			document.getElementById('chkEnableBadratingTVRAGE').checked = GM_getValue("enableBadTVRAGErating", true);
			document.getElementById('txtLowTVRAGErating').value =  GM_getValue("valueBadTVRAGErating", "6");
			document.getElementById('txtLowTVRAGEcolor').value =  GM_getValue("colorBadTVRAGErating", "#FFCCFF");
			document.getElementById('txtLowTVRAGEcolor').style.backgroundColor =  GM_getValue("colorBadTVRAGErating", "#FFCCFF");
		}
		else if ( PopupWindow == 'ANIDBSettingsPopup' )
		{
			document.getElementById('chkEnableGoodratingANIDB').checked = GM_getValue("enableGoodANIDBrating", true);
			document.getElementById('txtHighANIDBrating').value = GM_getValue("valueGoodANIDBrating", "8");
			document.getElementById('txtHighANIDBcolor').value = GM_getValue("colorGoodANIDBrating", "#CCFF99");
			document.getElementById('txtHighANIDBcolor').style.backgroundColor = GM_getValue("colorGoodANIDBrating", "#CCFF99");

			document.getElementById('chkEnableBadratingANIDB').checked = GM_getValue("enableBadANIDBrating", true);
			document.getElementById('txtLowANIDBrating').value =  GM_getValue("valueBadANIDBrating", "6");
			document.getElementById('txtLowANIDBcolor').value =  GM_getValue("colorBadANIDBrating", "#FFCCFF");
			document.getElementById('txtLowANIDBcolor').style.backgroundColor =  GM_getValue("colorBadANIDBrating", "#FFCCFF");

			document.getElementById('txtANIDBUsername').value =  GM_getValue("anidbUsername", "");
			document.getElementById('txtANIDBPassword').value =  GM_getValue("anidbPassword", "");
		}
		else if ( PopupWindow == 'FindOnTheWebSettingsPopup' )
		{
			document.getElementById('chkEnableTHEPIRATEBAY').checked = GM_getValue("fotwTHEPIRATEBAY", true);
			document.getElementById('chkEnableNZBMATRIX').checked = GM_getValue("fotwNZBMATRIX", true);
			document.getElementById('chkEnableBTJUNKIE').checked = GM_getValue("fotwBTJUNKIE", true);
			document.getElementById('chkEnableGOOGLE').checked = GM_getValue("fotwGOOGLE", true);
			document.getElementById('chkEnableLASTFM').checked = GM_getValue("fotwLASTFM", true);
			document.getElementById('chkEnableYOUTUBE').checked = GM_getValue("fotwYOUTUBE", true);
			document.getElementById('chkEnableBLINKX').checked = GM_getValue("fotwBLINKX", true);
			document.getElementById('chkEnableONDERTITELS').checked = GM_getValue("fotwONDERTITELS", false);
			document.getElementById('chkEnableNLONDERTITELS').checked = GM_getValue("fotwNLONDERTITELS", false);
			document.getElementById('chkEnableWIKIPEDIA').checked = GM_getValue("fotwWIKIPEDIA", true);
			document.getElementById('chkEnableZDNET').checked = GM_getValue("fotwZDNET", true);
			document.getElementById('chkEnableTVCOM').checked = GM_getValue("fotwTVCOM", true);
			document.getElementById('chkEnableVCDQ').checked = GM_getValue("fotwVCDQ", true);
			document.getElementById('chkEnableGAMERANKINGS').checked = GM_getValue("fotwGAMERANKINGS", true);
			document.getElementById('chkEnableMETACRITIC').checked = GM_getValue("fotwMETACRITIC", true);
			document.getElementById('chkEnableGAMETRAILERS').checked = GM_getValue("fotwGAMETRAILERS", true);
		}
	
		//Show wanted popup
		document.getElementById(PopupWindow).style.display = "block";
	}

function addPopupWindow(popupBody,popupID,okButtonID,cancelButtonID){

		var settingsPopupWindow = document.createElement("div");
		settingsPopupWindow.innerHTML = popupBody;
		settingsPopupWindow.style.background = "#fff";
		settingsPopupWindow.style.border= "2px solid #000";
		settingsPopupWindow.style.padding = "5px";
		settingsPopupWindow.style.position = "absolute";
		settingsPopupWindow.style.top = "5%";
		settingsPopupWindow.style.left = "25%";
		settingsPopupWindow.style.display = "none";
		settingsPopupWindow.id = popupID;
		
		var okSettingsButton = document.createElement("a");
		okSettingsButton.href = "javascript:void(null)";
		okSettingsButton.innerHTML = '<strong>ok</strong>';
		okSettingsButton.addEventListener('click',function(){HidePopup(popupID,'ok');}, false);

		var cancelSettingsButton = document.createElement("a");
		cancelSettingsButton.href = "javascript:void(null)";
		cancelSettingsButton.innerHTML = '<strong>cancel</strong>';
		cancelSettingsButton.addEventListener('click',function(){HidePopup(popupID,'cancel');}, false);

		document.getElementById("newzbin").appendChild(settingsPopupWindow);
		document.getElementById(okButtonID).appendChild(okSettingsButton);
		if (cancelButtonID != null){
			document.getElementById(cancelButtonID).appendChild(cancelSettingsButton);
		}
	}

function flushCache() {

	document.getElementById('CACHEInformationPopup').style.display = "none";
	
	var answer = confirm("Are you sure you want to flush all cache?");
	if (answer)
	{
		flushCacheSetValues();
	}
}

function flushCacheSetValues(){
	objCache = {};
	GM_setValue("objCache", objCache.toSource());
	
	cache_items_deleted = 0;
	GM_setValue("cache_items_deleted", cache_items_deleted);
	
	cache_references = 0;
	GM_setValue("cache_references", cache_references);
}

function highlightReport(reportbody, currentRating, valueGoodrating, enableGoodrating, colorGoodrating, valueBadrating, enableBadrating, colorBadrating, gUID, faviconIMG, cached){
	
		if (!isNaN(currentRating) && currentRating != null){
			var reportTitle = reportbody.innerHTML.match(newzBinTitleRegex);

			if (parseFloat(currentRating) >= valueGoodrating && enableGoodrating)
			{
				var alltd = reportbody.getElementsByTagName("td");
				for (var i = 0; i < alltd.length; i++)
				{     
					curtd = alltd[i];
					curtd.style.backgroundColor = colorGoodrating;
				} 
			}
			else if (parseFloat(currentRating) <= valueBadrating && parseFloat(currentRating) > 0 && enableBadrating)
			{
				
				var trHideRow = document.getElementById('trHideRow'+gUID);
				if (hideBadReport && trHideRow == null)
				{
					var alltr = reportbody.getElementsByTagName("tr");
					for (var i = 0; i < alltr.length; i++)
					{
						curtr = alltr[i]
						curtr.style.display = "none";
					}
					reportbodyInnerHTML  = "<tr id='trHideRow"+gUID+"' style=\"opacity: .5; filter: alpha(opacity=.5); -moz-opacity: .5; -khtml-opacity: .5; font-size: 7pt;\"><td colspan=\"2\"></td><td><img src='"+faviconIMG+"'/>";
					if (cached){reportbodyInnerHTML += "<img width='5px' src='"+spacer+"' /><img width='19px' src='"+cacheComplete+"' />";}
					reportbodyInnerHTML += "</td><td colspan=\"2\" >"+reportTitle[2]+"</td>";
					reportbodyInnerHTML += "<td><a href=\"javascript:void(null);\" onclick=\"javascript:var reportbody = document.getElementById('"+reportTitle[1]+"-tbody');";
					reportbodyInnerHTML += "var alltr = reportbody.getElementsByTagName('tr');";
					reportbodyInnerHTML += "for (var i = 0; i < alltr.length; i++){curtr = alltr[i];curtr.style.display = 'table-row';}";
					reportbodyInnerHTML += "this.parentNode.parentNode.style.display='none';";
					reportbodyInnerHTML += "\">show hidden report</a></td></tr>";
				
					reportbody.innerHTML += reportbodyInnerHTML;
				}

				var alltd = reportbody.getElementsByTagName("td");
				for (var i = 0; i < alltd.length; i++)
				{     
					curtd = alltd[i];
					curtd.style.backgroundColor = colorBadrating;
				}
			}
		}
	}

	
	
	
//-- Menu
function ShowHelperMenu(){
		var menucount = 0;
		var CACHEInformation = false;
		var CACHEDContent = false;
		var CACHEFlush = false;
		var IMDBSettings = false;
		var GAMESPOTSettings = false;
		var ALLMUSICSettings = false;
		var SABNZBDSettings =  false;
		var SABNZBDopenqueue = false
		var IGNSettings = false;
		var AMAZONSettings = false;
		var GOOGLEMUSICSettings = false;
		var DISCOGSSettings = false;
		var CDUNIVERSESettings = false;
		var TVRAGESettings = false;
		var ANIDBSettings = false;
		var FindOnTheWeb = false;
		
		var mainMenu = document.getElementById("mnMain");
		var HelperTab = document.createElement("li");
		var HelperMenu = document.createElement("a");
		HelperMenu.id = "HelperMenu_out";
		HelperMenu.href = "javascript:void(null);";
		HelperMenu.addEventListener('click',function () {document.getElementById("mnHelperMenu").blur();	document.getElementById("mnHelperMenu").style.visibility = "hidden";}, false);
		HelperMenu.innerHTML='Helper';

		var divHeader = document.getElementById("header");
		var HelperMenuList = document.createElement("ul");
		HelperMenuList.id = "mnHelperMenu";
		HelperMenuList.className = "tabMenu";

		var SabnzbdMenu = createSubMenu ("Sabnzbd", HelperMenuList, divHeader, menucount++, "Sabnzbd configuration");
		addMenuItem("Enable Sabnzbd", "Enable Sabnzbd integration", setVal, SabnzbdMenu, "enableSABNZBD", "", enableSABNZBD);
		addMenuItem("Show sabnzbd queue", "Show the sabnzbd queue", window.open, SabnzbdMenu, SABNZBDopenqueue, sabnzbdURL+"/queue/" , SABNZBDopenqueue);
		addMenuItem("Settings Sabnzbd", "Change settings for Sabnzbd", ShowPopup, SabnzbdMenu, "SABNZBDSettings", "SABNZBDSettingsPopup", SABNZBDSettings);
		
		var CacheMenu = createSubMenu("Cache", HelperMenuList, divHeader, menucount++, "Cache configuration");
		addMenuItem("Enable cache", "Enable caching feature", setVal, CacheMenu, "CACHEEnable", "", CACHEEnable);
		if (CACHEEnable == true){
			addMenuItem("Cache boxshots", "Enable boxshot caching", setVal, CacheMenu, "BOXSHOTCACHEEnable", "", BOXSHOTCACHEEnable);
		}
		addMenuItem("Show cache info", "Show cache usage information", ShowPopup, CacheMenu, "CACHEInformation", "CACHEInformationPopup",CACHEInformation);
		addMenuItem("Show cached content", "Show cached content", ShowPopup, CacheMenu, "CACHEDContent", "CACHEDContentPopup",CACHEDContent);
		addMenuItem("Flush cache", "Flush all cache data", flushCache, CacheMenu, "CACHEFlush", "",CACHEFlush);
		
		//			 title				hint							  callback	 parent			 idMenuItem       parametercallback, bold/normal
		var ProviderMenu = createSubMenu("Providers", HelperMenuList, divHeader, menucount++, "Providers");
		addMenuItem("Hide bad reports", "Hide bad reports", setVal, ProviderMenu, "hideBadReport", "", hideBadReport);
		addMenuItem("Settings ALLMUSIC", "Change settings for ALLMUSIC reports", ShowPopup, ProviderMenu, "ALLMUSICSettings","ALLMUSICSettingsPopup", ALLMUSICSettings);
		addMenuItem("Settings AMAZON", "Change settings for AMAZON reports", ShowPopup, ProviderMenu, "AMAZONSettings","AMAZONSettingsPopup",AMAZONSettings);
		addMenuItem("Settings ANIDB", "Change settings for ANIDB reports", ShowPopup, ProviderMenu, "ANIDBSettings","ANIDBSettingsPopup",ANIDBSettings);
		addMenuItem("Settings CDUNIVERSE", "Change settings for CDUNIVERSE reports", ShowPopup, ProviderMenu, "CDUNIVERSESettings","CDUNIVERSESettingsPopup",CDUNIVERSESettings);
		addMenuItem("Settings DISCOGS", "Change settings for DISCOGS reports", ShowPopup, ProviderMenu, "DISCOGSSettings","DISCOGSSettingsPopup",DISCOGSSettings);
		addMenuItem("Settings GAMESPOT", "Change settings for GAMESPOT reports", ShowPopup, ProviderMenu, "GAMESPOTSettings","GAMESPOTSettingsPopup",GAMESPOTSettings);
		addMenuItem("Settings GOOGLE", "Change settings for GOOGLE MUSIC reports", ShowPopup, ProviderMenu, "GOOGLEMUSICSettings","GOOGLEMUSICSettingsPopup",GOOGLEMUSICSettings);
		addMenuItem("Settings IGN", "Change settings for IGN reports", ShowPopup, ProviderMenu, "IGNSettings","IGNSettingsPopup",IGNSettings);
		addMenuItem("Settings IMDB", "Change settings for IMDB reports", ShowPopup, ProviderMenu, "IMDBSettings","IMDBSettingsPopup",IMDBSettings);
		addMenuItem("Settings TVRAGE", "Change settings for TVRAGE reports", ShowPopup, ProviderMenu, "TVRAGESettings","TVRAGESettingsPopup",TVRAGESettings);

		addMenuItem("Find on the web", "Select references on the web", ShowPopup, HelperMenuList, "FindOnTheWeb", "FindOnTheWebSettingsPopup",FindOnTheWeb);

		HelperTab.appendChild(HelperMenu);
		mainMenu.appendChild(HelperTab);
		divHeader.appendChild(HelperMenuList);

		// Add menu and subs to Newzbin's CSSMenu function, uses location hack to escape GM sandbox
		location.href = "javascript:void(menuList[menuCount++] = new CSSMenu('mnHelperMenu', 'HelperMenu_out'))";
	}

function createSubMenu(title, menu, divHeader, count, tooltip) {
	menu.innerHTML += '<li class="parent"><a id="trSubMenu'+title+'" href="javascript:void(null)" title="'+tooltip+'">'+title+'</a></li>';
	var SubMenu = document.createElement("ul");
	SubMenu.id = "mnSubMenu"+title;
	SubMenu.className = "tabMenu";
	divHeader.appendChild(SubMenu);
	location.href = "javascript:void(menuList["+count+"] = new CSSMenu('mnSubMenu"+title+"', 'trSubMenu"+title+"','"+menu.id+"'))";
	
	return SubMenu;
}

function addMenuItem(title, hint, callback, menu, id, parametercallback, selected) {
		var li = document.createElement("li");
		var a = document.createElement("a");
		li.appendChild(a);
		a.id = id;
		a.href = "javascript:void(null)";
		a.innerHTML = title;
		if (parametercallback != "") {a.addEventListener('click', function(){callback(parametercallback);}, false);}
		else {a.addEventListener('click', callback, false);}
		a.title = hint;
		if (selected) a.style.fontWeight = 'bold';
		menu.appendChild(li);
		return a;
	}	

function setVal() {
	var s = this.id;
	var v = !eval(s);
	this.style.fontWeight = v?'bold':'normal';
	eval(s+'='+v);
	GM_setValue(s, v);
	
	if (s == "BOXSHOTCACHEEnable"){
		flushCacheSetValues();
	}
	
	window.location.reload();
}
	
	
	
	
//-- Colorpicker
function initColorPicker(){
	
	var head = document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = ".colorpicker201{visibility:hidden;display:none;position:absolute;background:#FFF;border:solid 1px #CCC;padding:4px;z-index:999;filter:progid:DXImageTransform.Microsoft.Shadow(color=#D0D0D0,direction=135);}.o5582brd{padding:0;width:12px;height:14px;border-bottom:solid 1px #DFDFDF;border-right:solid 1px #DFDFDF;}a.o5582n66,.o5582n66,.o5582n66a{font-family:arial,tahoma,sans-serif;text-decoration:underline;font-size:9px;color:#666;border:none;}.o5582n66,.o5582n66a{text-align:center;text-decoration:none;}a:hover.o5582n66{text-decoration:none;color:#FFA500;cursor:pointer;}.a01p3{padding:1px 4px 1px 2px;background:whitesmoke;border:solid 1px #DFDFDF;}";
    head.appendChild(style);
	
	var divColorPicker = document.createElement("div");
	divColorPicker.setAttribute('class', 'colorpicker201'); 
	divColorPicker.setAttribute('id', 'colorpicker201'); 
	document.getElementById("newzbin").appendChild(divColorPicker);

	var txtHighIMDBcolor = document.getElementById('txtHighIMDBcolor');
	txtHighIMDBcolor.addEventListener('focus', function(){showColorGrid2('txtHighIMDBcolor','txtHighIMDBcolor');}, false);	
	var txtLowIMDBcolor = document.getElementById('txtLowIMDBcolor');
	txtLowIMDBcolor.addEventListener('focus', function(){showColorGrid2('txtLowIMDBcolor','txtLowIMDBcolor');}, false);	

	var txtHighGAMESPOTcolor = document.getElementById('txtHighGAMESPOTcolor');
	txtHighGAMESPOTcolor.addEventListener('focus', function(){showColorGrid2('txtHighGAMESPOTcolor','txtHighGAMESPOTcolor');}, false);	
	var txtLowGAMESPOTcolor = document.getElementById('txtLowGAMESPOTcolor');
	txtLowGAMESPOTcolor.addEventListener('focus', function(){showColorGrid2('txtLowGAMESPOTcolor','txtLowGAMESPOTcolor');}, false);	

	var txtHighALLMUSICcolor = document.getElementById('txtHighALLMUSICcolor');
	txtHighALLMUSICcolor.addEventListener('focus', function(){showColorGrid2('txtHighALLMUSICcolor','txtHighALLMUSICcolor');}, false);	
	var txtLowALLMUSICcolor = document.getElementById('txtLowALLMUSICcolor');
	txtLowALLMUSICcolor.addEventListener('focus', function(){showColorGrid2('txtLowALLMUSICcolor','txtLowALLMUSICcolor');}, false);	

	var txtHighIGNcolor = document.getElementById('txtHighIGNcolor');
	txtHighIGNcolor.addEventListener('focus', function(){showColorGrid2('txtHighIGNcolor','txtHighIGNcolor');}, false);	
	var txtLowIGNcolor = document.getElementById('txtLowIGNcolor');
	txtLowIGNcolor.addEventListener('focus', function(){showColorGrid2('txtLowIGNcolor','txtLowIGNcolor');}, false);	

	var txtHighAMAZONcolor = document.getElementById('txtHighAMAZONcolor');
	txtHighAMAZONcolor.addEventListener('focus', function(){showColorGrid2('txtHighAMAZONcolor','txtHighAMAZONcolor');}, false);	
	var txtLowAMAZONcolor = document.getElementById('txtLowAMAZONcolor');
	txtLowAMAZONcolor.addEventListener('focus', function(){showColorGrid2('txtLowAMAZONcolor','txtLowAMAZONcolor');}, false);	

	var txtHighGOOGLEMUSICcolor = document.getElementById('txtHighGOOGLEMUSICcolor');
	txtHighGOOGLEMUSICcolor.addEventListener('focus', function(){showColorGrid2('txtHighGOOGLEMUSICcolor','txtHighGOOGLEMUSICcolor');}, false);	
	var txtLowGOOGLEMUSICcolor = document.getElementById('txtLowGOOGLEMUSICcolor');
	txtLowGOOGLEMUSICcolor.addEventListener('focus', function(){showColorGrid2('txtLowGOOGLEMUSICcolor','txtLowGOOGLEMUSICcolor');}, false);	

	var txtHighDISCOGScolor = document.getElementById('txtHighDISCOGScolor');
	txtHighDISCOGScolor.addEventListener('focus', function(){showColorGrid2('txtHighDISCOGScolor','txtHighDISCOGScolor');}, false);	
	var txtLowDISCOGScolor = document.getElementById('txtLowDISCOGScolor');
	txtLowDISCOGScolor.addEventListener('focus', function(){showColorGrid2('txtLowDISCOGScolor','txtLowDISCOGScolor');}, false);	

	var txtHighCDUNIVERSEcolor = document.getElementById('txtHighCDUNIVERSEcolor');
	txtHighCDUNIVERSEcolor.addEventListener('focus', function(){showColorGrid2('txtHighCDUNIVERSEcolor','txtHighCDUNIVERSEcolor');}, false);	
	var txtLowCDUNIVERSEcolor = document.getElementById('txtLowCDUNIVERSEcolor');
	txtLowCDUNIVERSEcolor.addEventListener('focus', function(){showColorGrid2('txtLowCDUNIVERSEcolor','txtLowCDUNIVERSEcolor');}, false);	

	var txtHighTVRAGEcolor = document.getElementById('txtHighTVRAGEcolor');
	txtHighTVRAGEcolor.addEventListener('focus', function(){showColorGrid2('txtHighTVRAGEcolor','txtHighTVRAGEcolor');}, false);	
	var txtLowTVRAGEcolor = document.getElementById('txtLowTVRAGEcolor');
	txtLowTVRAGEcolor.addEventListener('focus', function(){showColorGrid2('txtLowTVRAGEcolor','txtLowTVRAGEcolor');}, false);	

	var txtHighANIDBcolor = document.getElementById('txtHighANIDBcolor');
	txtHighANIDBcolor.addEventListener('focus', function(){showColorGrid2('txtHighANIDBcolor','txtHighANIDBcolor');}, false);	
	var txtLowANIDBcolor = document.getElementById('txtLowANIDBcolor');
	txtLowANIDBcolor.addEventListener('focus', function(){showColorGrid2('txtLowANIDBcolor','txtLowANIDBcolor');}, false);	
}

function showColorGrid2(OBjElem,Sam){
	var objX=new Array('00','33','66','99','CC','FF');

	var table_ColorPicker = document.createElement("table");
	table_ColorPicker.style.backgroundColor = "#FFFFFF";
	table_ColorPicker.style.padding = "2px";
	table_ColorPicker.style.border = "0px solid #F0F0F0";
	table_ColorPicker.setAttribute("border", "0");
	table_ColorPicker.setAttribute("cellpadding", "0");
	table_ColorPicker.setAttribute("cellspacing", "0");
	
	var tr_ColorPicker = document.createElement("tr");

	var td_ColorPicker = document.createElement("td");
	td_ColorPicker.colSpan = 36;
	td_ColorPicker.align = "left";
	td_ColorPicker.style.fontSize = "10px";
	td_ColorPicker.style.backgroundColor = "#6666CC";
	td_ColorPicker.style.color = "#FFF";
	td_ColorPicker.innerHTML = "&nbsp;Chromatic Selection Palette";
	tr_ColorPicker.appendChild(td_ColorPicker);

	table_ColorPicker.appendChild(tr_ColorPicker);

	var tr_ColorPicker = document.createElement("tr");

	var td_ColorPicker = document.createElement("td");
	td_ColorPicker.colSpan = 36;
	td_ColorPicker.align = "center";
	td_ColorPicker.style.margin = 0;
	td_ColorPicker.style.padding = "2px";
	td_ColorPicker.style.height = "12px";
	
	var input_ColorPicker = document.createElement("input");
	input_ColorPicker.setAttribute("class", "o5582n66");
	input_ColorPicker.setAttribute("type", "text");
	input_ColorPicker.setAttribute("size", "12");
	input_ColorPicker.setAttribute("id", "o5582n66");
	input_ColorPicker.setAttribute("value", "#FFFFFF");
	td_ColorPicker.appendChild(input_ColorPicker);
	
	var input_ColorPicker = document.createElement("input");
	input_ColorPicker.style.width = "14px";
	input_ColorPicker.style.border = "1px solid #666";
	input_ColorPicker.setAttribute("class", "o5582n66a");
	input_ColorPicker.setAttribute("type", "text");
	input_ColorPicker.setAttribute("size", "2");
	input_ColorPicker.setAttribute("id", "o5582n66a");
	input_ColorPicker.setAttribute("value", "");
//	input_ColorPicker.addEventListener('click', function(){
//			alert("click on selected swatch below...");
//		}, false);
	td_ColorPicker.appendChild(input_ColorPicker);
		
	var span_ColorPicker = document.createElement("span");
	span_ColorPicker.innerHTML = "&nbsp;|&nbsp;";
	td_ColorPicker.appendChild(span_ColorPicker);
	
	var a_ColorPicker = document.createElement("a");
	a_ColorPicker.href = "javascript:void(null)";
	a_ColorPicker.setAttribute("class", "o5582n66");
	a_ColorPicker.addEventListener('click', function(){
			putOBJxColor2(OBjElem,Sam,'');
		}, false);
		
	var span_ColorPicker = document.createElement("span");
	span_ColorPicker.innerHTML = "NO COLOR";
	span_ColorPicker.setAttribute("class", "a01p3");
	a_ColorPicker.appendChild(span_ColorPicker);
	td_ColorPicker.appendChild(a_ColorPicker);
		
	var span_ColorPicker = document.createElement("span");
	span_ColorPicker.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
	td_ColorPicker.appendChild(span_ColorPicker);

	var a_ColorPicker = document.createElement("a");
	a_ColorPicker.href = "javascript:void(null)";
	a_ColorPicker.setAttribute("class", "o5582n66");
	a_ColorPicker.addEventListener('click', function(){
			putOBJxColor2(OBjElem,Sam,'x');
		}, false);

	var span_ColorPicker = document.createElement("span");
	span_ColorPicker.innerHTML = "CLOSE";
	span_ColorPicker.setAttribute("class", "a01p3");
	a_ColorPicker.appendChild(span_ColorPicker);
	td_ColorPicker.appendChild(a_ColorPicker);
	tr_ColorPicker.appendChild(td_ColorPicker);

	table_ColorPicker.appendChild(tr_ColorPicker);

	for(o=0;o<6;o++){
		var tr_ColorPicker = document.createElement("tr");
		for(y=0;y<6;y++){
			for(x=0;x<6;x++){
				var grid='';
				grid=objX[o]+objX[y]+objX[x];
				var td_ColorPicker = document.createElement("td");
				td_ColorPicker.setAttribute("class", "o5582brd");
				td_ColorPicker.style.backgroundColor = '#'+grid;
				td_ColorPicker.title = '#'+grid;
				
				
				var a_ColorPicker = document.createElement("a");
				a_ColorPicker.href = "javascript:void(null)";
				a_ColorPicker.setAttribute("class", "o5582n66");
				a_ColorPicker.id = grid;
				a_ColorPicker.addEventListener('click', function(){
					putOBJxColor2(OBjElem,Sam,'#'+this.id);
				}, false);
				
				a_ColorPicker.addEventListener('mouseover', function(){
					document.getElementById("o5582n66").value='#'+this.id;
					document.getElementById("o5582n66a").style.backgroundColor='#'+this.id;
				}, false);
				
				var div_ColorPicker = document.createElement("div");
				div_ColorPicker.style.width = "12px";
				div_ColorPicker.style.height = "14px";
				
				a_ColorPicker.appendChild(div_ColorPicker);
				td_ColorPicker.appendChild(a_ColorPicker);
				tr_ColorPicker.appendChild(td_ColorPicker);
			}
			
		}
		table_ColorPicker.appendChild(tr_ColorPicker);
	}
	
	var ttop=getTop2();
	setCCbldSty2('colorpicker201','tp',ttop);
	var lleft=getLeft2();
	setCCbldSty2('colorpicker201','lf',lleft);
	setCCbldSty2('colorpicker201','vs','visible');
	setCCbldSty2('colorpicker201','ds','block');

	var colorpicker201 = document.getElementById('colorpicker201')
	while (colorpicker201.hasChildNodes()){colorpicker201.removeChild(colorpicker201.firstChild);}
	colorpicker201.appendChild(table_ColorPicker);
}

function getScrollY(){
	var scrOfX = 0,scrOfY=0;
	if(typeof(window.pageYOffset)=='number'){
		scrOfY=window.pageYOffset;
		scrOfX=window.pageXOffset;
	}
	else if(document.body&&(document.body.scrollLeft||document.body.scrollTop)){
		scrOfY=document.body.scrollTop;
		scrOfX=document.body.scrollLeft;
	}
	else if(document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)){
		scrOfY=document.documentElement.scrollTop;
		scrOfX=document.documentElement.scrollLeft;
	}
	return scrOfY;
}

function getTop2(){
	csBrHt=0;
	if(typeof(window.innerWidth)=='number'){
		csBrHt=window.innerHeight;
	}
	else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){
		csBrHt=document.documentElement.clientHeight;
	}
	else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){
		csBrHt=document.body.clientHeight;
	}
	ctop=((csBrHt/2)-115)+getScrollY();
	return ctop;
}

function getLeft2(){
	var csBrWt=0;
	if(typeof(window.innerWidth)=='number'){
		csBrWt=window.innerWidth;
	}
	else if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){
		csBrWt=document.documentElement.clientWidth;
	}
	else if(document.body&&(document.body.clientWidth||document.body.clientHeight)){
		csBrWt=document.body.clientWidth;
	}
	
	cleft=(csBrWt/2)-125;
	return cleft;
}

function setCCbldID2(objID,val){
	document.getElementById(objID).value=val;
}

function setCCbldSty2(objID,prop,val){
	switch(prop){
		case "bc":
			if(objID!='none'){
				document.getElementById(objID).style.backgroundColor=val;
			};
			break;
		case "vs":
			document.getElementById(objID).style.visibility=val;
			break;
		case "ds":
			document.getElementById(objID).style.display=val;
			break;
		case "tp":
			document.getElementById(objID).style.top=val+'px';
			break;
		case "lf":
			document.getElementById(objID).style.left=val+'px';
			break;
	}
}

function putOBJxColor2(OBjElem,Samp,pigMent){
	if(pigMent!='x'){
		setCCbldID2(OBjElem,pigMent);
		setCCbldSty2(Samp,'bc',pigMent);
	}
	
	setCCbldSty2('colorpicker201','vs','hidden');
	setCCbldSty2('colorpicker201','ds','none');
}




//-- enhanced window
function insertSabnzbdIcon(reportbody, gUID){
	var reportID = reportbody.innerHTML.match(newzBinTitleRegex);
	var img_sabnzbd = document.getElementById("img_sabnzbd"+gUID);
	
	if (!img_sabnzbd){
		if (reportID != null){
			var parentIconbar = document.getElementById('url'+reportID[1]).parentNode;

			if ( enableSABNZBD )
			{
				if (right(sabnzbdURL,1) != "/"){sabnzbdURL += '/'; GM_setValue("sabnzbdURL",sabnzbdURL);}
				var a_sabnzbd = document.createElement("a");
				a_sabnzbd.href = "javascript:void(null)";
				a_sabnzbd.id = gUID;
				a_sabnzbd.addEventListener('click', function(){
					var fakeImage = new Image(); 
					fakeImage.src= sabnzbdURL + "api?mode=addid&name=" + reportID[1] + "&ma_username=" + escape(sabnzbdUsername) + "&ma_password=" + escape(sabnzbdPassword) + "&apikey=" + sabnzbdAPIKEY; 
					var sabnzbdLogo = document.getElementById("img_sabnzbd"+this.id);

					sabnzbdLogo.src = SabnzbdLogoAdded;
					sabnzbdLogo.title = "Report added to sabnzbd queue";
					
				}, false);
				
				var img_sabnzbd = document.createElement("img");
				img_sabnzbd.id = "img_sabnzbd"+gUID;
				img_sabnzbd.src = SabnzbdLogo;
				img_sabnzbd.title = "Queue report for sabnzbd";
			}
			else
			{
				var a_sabnzbd = document.createElement("a");
				a_sabnzbd.href = "javascript:void(null)";
				a_sabnzbd.addEventListener('click', function(){
				
					ShowPopup('SABNZBDSettingsPopup');
					
				}, false);
				
				var img_sabnzbd = document.createElement("img");
				img_sabnzbd.id = "img_sabnzbd"+gUID;
				img_sabnzbd.src = SabnzbdLogoDisabled;
				img_sabnzbd.title = "Sabnzbd disabled";
			}

			var img_spacer = document.createElement("img");
			img_spacer.width = "5";
			img_spacer.src = spacer;

			a_sabnzbd.appendChild(img_sabnzbd);
			parentIconbar.appendChild(a_sabnzbd);
			parentIconbar.appendChild(img_spacer);
		}
	}
}
	
function ShowStatusBar(){

	
	var ShowStatusBar = document.createElement("div");
	ShowStatusBar.style.backgroundColor = "#fff";
	ShowStatusBar.style.padding = "5px";
	ShowStatusBar.style.position = "absolute";
	ShowStatusBar.style.top = "0%";
	ShowStatusBar.style.left = "60%";
	ShowStatusBar.style.display = "block";
	ShowStatusBar.id = "ShowStatusBar";

	if(hideBadReport){
		var img_hiddenBadReports = document.createElement("img");
		img_hiddenBadReports.src = hiddenBadReports;
		img_hiddenBadReports.width = "16";
		img_hiddenBadReports.title = "Hide Bad reports enabled";

		var img_spacer = document.createElement("img");
		img_spacer.width = "5";
		img_spacer.src = spacer;
		
		ShowStatusBar.appendChild(img_hiddenBadReports);
		ShowStatusBar.appendChild(img_spacer);
	}

	if(CACHEEnable){
		var img_Cache = document.createElement("img");
		img_Cache.src = cacheComplete;
		img_Cache.width = "16";
		img_Cache.title = "Cache enabled";

		var img_spacer = document.createElement("img");
		img_spacer.width = "5";
		img_spacer.src = spacer;
		
		var itemsInCache = 0;
		for (key in objCache) itemsInCache++;

		var str = objCache.toSource();
		var bytes = str.length.toString();

		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(bytes)) {
			bytes = bytes.replace(rgx, '$1' + '.' + '$2');
		}

		var span_NumOfCachedItems = document.createElement("span");
		span_NumOfCachedItems.id = "span_NumOfCachedItems";
		span_NumOfCachedItems.innerHTML = "<small>"+itemsInCache+"/"+cache_references+"/"+cache_items_deleted+"</small>"

		var span_NumOfBytes = document.createElement("span");
		span_NumOfBytes.innerHTML = "<small>&nbsp;-&nbsp;"+bytes+" Bytes</small>"
		
		ShowStatusBar.appendChild(img_Cache);
		ShowStatusBar.appendChild(img_spacer);
		ShowStatusBar.appendChild(span_NumOfCachedItems);
		ShowStatusBar.appendChild(span_NumOfBytes);
	}
	

	document.getElementById("newzbin").appendChild(ShowStatusBar);

}	

function SavedSearchesFirst(){


	var categoryFilter = document.evaluate("//html//body//div[2]//form//fieldset//select",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);	
	if (categoryFilter.snapshotItem(1) != null){

		var savedSearches = categoryFilter.snapshotItem(1).innerHTML.match(newzBinSavedSearchesRegex);
		if (savedSearches != null){
			var Categories = categoryFilter.snapshotItem(1).innerHTML.match(newzBinCategoriesRegex);
			categoryFilter.snapshotItem(1).innerHTML = categoryFilter.snapshotItem(1).innerHTML.replace(newzBinSavedSearchesRegex,"");
			categoryFilter.snapshotItem(1).innerHTML = categoryFilter.snapshotItem(1).innerHTML.replace(newzBinCategoriesRegex,"");
			categoryFilter.snapshotItem(1).innerHTML += savedSearches;
			categoryFilter.snapshotItem(1).innerHTML += Categories;
		}
	}
	

}	




	
//-- TitleIcons	
function showTitleIcons (reportbody, category, gUID){
	var reportTitle = reportbody.innerHTML.match(newzBinTitleRegex);
	if (reportTitle != null){

	var alltd = reportbody.getElementsByTagName("td");
		var tdTitle = alltd[3];

//---- All				
		var img_searchReports = document.getElementById('img_searchReports'+gUID);
		
		
		if (img_searchReports == null){

			var searchString = cleanTitle(reportTitle[2]);

			var img_searchReports = document.createElement("img");
			img_searchReports.src = searchReports;
			img_searchReports.title = "Find the same title " + searchString + " on Newzbin";
			img_searchReports.id = 'img_searchReports'+gUID;
			
			var a_Search = document.createElement("a");
			a_Search.href = "javascript:void(null)";
			a_Search.addEventListener('click', function(){

					window.location = "/search/query/?q="+escape(searchString)+"&area=-1&fpn=p&searchaction=Go&areadone=-1";

				}, false);

			a_Search.appendChild(img_searchReports);

			tdTitle.insertBefore(a_Search, tdTitle.firstChild)				
		}	

//---- MUSIC
		if (category == "music"){
			

			var img_FindSameArtist = document.getElementById('img_FindSameArtist'+gUID);
			if (img_FindSameArtist == null){

				var artist = reportTitle[2].split(" - ")
				artist = trim(artist[0]);
				artist = artist.replace(/&amp;/g,'&')

				var img_spacer = document.createElement("img");
				img_spacer.width = "5";
				img_spacer.src = spacer;

				var img_FindSameArtist = document.createElement("img");
				img_FindSameArtist.src = FindSameArtist;
				img_FindSameArtist.title = "Find more of the artist " + artist + " on Newzbin";
				img_FindSameArtist.id = 'img_FindSameArtist'+gUID;

				var a_FindSameArtist = document.createElement("a");
				a_FindSameArtist.href = "javascript:void(null)";
				a_FindSameArtist.addEventListener('click', function(){

						window.location = "/search/query/?q="+escape(artist)+"&area=c.7&fpn=p&searchaction=Go&category=7&areadone=c.7";

					}, false);

				a_FindSameArtist.appendChild(img_FindSameArtist);

				tdTitle.insertBefore(img_spacer, tdTitle.firstChild)				
				tdTitle.insertBefore(a_FindSameArtist, tdTitle.firstChild)				

			}
		}

//---- TV
		if (category == "tv"){

			var img_FindSameSerie = document.getElementById('img_FindSameSerie'+gUID);
			if (img_FindSameSerie == null){
			
			
				var serieseaon = reportTitle[2].match(/([\s\S]+?) - ([0-9]+)x/);
				if (serieseaon){
					var img_spacer = document.createElement("img");
					img_spacer.width = "5";
					img_spacer.src = spacer;
				
					var img_FindSameSerieSeason = document.createElement("img");
					img_FindSameSerieSeason.src = FindSameSerieSeason;
					img_FindSameSerieSeason.title = "Find all episodes of serie "+serieseaon[1]+" for season "+serieseaon[2]+" on Newzbin";
					img_FindSameSerieSeason.id = 'img_FindSameSerieSeason'+gUID;

					var a_FindSameSerieSeason = document.createElement("a");
					a_FindSameSerieSeason.href = "javascript:void(null)";
					a_FindSameSerieSeason.addEventListener('click', function(){

							window.location = "/search/query/?q=\""+escape(serieseaon[1]+" - "+serieseaon[2])+"x\"&area=c.8&fpn=p&searchaction=Go&category=8&areadone=c.8";

						}, false);

					a_FindSameSerieSeason.appendChild(img_FindSameSerieSeason);

					tdTitle.insertBefore(img_spacer, tdTitle.firstChild)				
					tdTitle.insertBefore(a_FindSameSerieSeason, tdTitle.firstChild)				
				}

				var serie = reportTitle[2].split(" - ");
				serie = trim(serie[0]);
				serie = serie.replace(/&amp;/g,'&');

				var img_spacer = document.createElement("img");
				img_spacer.width = "5";
				img_spacer.src = spacer;
				
				var img_FindSameSerie = document.createElement("img");
				img_FindSameSerie.src = FindSameSerie;
				img_FindSameSerie.title = "Find more of the serie "+serie+" on Newzbin";
				img_FindSameSerie.id = 'img_FindSameSerie'+gUID;

				var a_FindSameSerie = document.createElement("a");
				a_FindSameSerie.href = "javascript:void(null)";
				a_FindSameSerie.addEventListener('click', function(){

						window.location = "/search/query/?q="+escape(serie)+"&area=c.8&fpn=p&searchaction=Go&category=8&areadone=c.8";

					}, false);

				a_FindSameSerie.appendChild(img_FindSameSerie);

				tdTitle.insertBefore(img_spacer, tdTitle.firstChild)				
				tdTitle.insertBefore(a_FindSameSerie, tdTitle.firstChild)				
			}	
		}
	}
}



//-- Lightbox
function initLightBox() {
	var lightBox = document.createElement("div");
	lightBox.style.padding = "15px";
	lightBox.style.display = "none";
	lightBox.style.position = "absolute";
	lightBox.style.border = "2px solid #000";
	lightBox.style.backgroundColor = "#fff";
	lightBox.style.zIndex = "1002";
	lightBox.style.overflow = "auto";
	lightBox.id = "lightBox";
	lightBox.addEventListener('click', function(){
		if (lightBoxEnabled){
			document.getElementById('lightBox').style.display='none';
			document.getElementById('fadeBox').style.display='none';						
		}
	}, false);

	var fadeBox = document.createElement("div");
	fadeBox.style.display = "none";
	fadeBox.style.position = "absolute";
	fadeBox.style.top = "0%";
	fadeBox.style.left = "0%";
	fadeBox.style.width = "100%";
	fadeBox.style.height = "100%";
	fadeBox.style.backgroundColor = "#000";
	fadeBox.style.zIndex = "1001";
	fadeBox.style.opacity = .6;
	fadeBox.id = "fadeBox";
	fadeBox.addEventListener('click', function(){
		if (lightBoxEnabled){
			document.getElementById('lightBox').style.display='none';
			document.getElementById('fadeBox').style.display='none';						
		}
	}, false);

	document.getElementById("newzbin").appendChild(lightBox);
	document.getElementById("newzbin").appendChild(fadeBox);

}
	
function showLightBox(width, height, source) {	
	var arrayPageSize = getPageSize();
	var arrayPageScroll = getPageScroll();

	var img_BoxshotBig = document.createElement("img");
	img_BoxshotBig.src = source;

	if (width > height)
	{
		var img_BoxshotBigWidth = arrayPageSize[2]*0.7;
		var img_BoxshotBigHeight = img_BoxshotBigWidth*(height/width);
	}
	else
	{
		var img_BoxshotBigHeight = arrayPageSize[3]*0.7;
		var img_BoxshotBigWidth = img_BoxshotBigHeight/(height/width);
	}
	
	img_BoxshotBig.width = img_BoxshotBigWidth;
	img_BoxshotBig.heigth = img_BoxshotBigHeight;
	
	var lightBOX = document.getElementById('lightBox'); 
	lightBOX.style.top = (arrayPageScroll[1] + ((arrayPageSize[3] - img_BoxshotBigHeight) / 2) + 'px');
	lightBOX.style.left = (((arrayPageSize[0] - img_BoxshotBigWidth) / 2) + 'px');
	lightBOX.style.width = img_BoxshotBigWidth + 20;
	lightBOX.style.height = img_BoxshotBigHeight + 20;

	while (lightBOX.hasChildNodes()){lightBOX.removeChild(lightBOX.firstChild);}
	lightBOX.appendChild(img_BoxshotBig);
	lightBOX.style.display='block';
	
	var fadeBOX = document.getElementById('fadeBox'); 
	fadeBOX.style.top = (arrayPageScroll[1] + 'px');
	fadeBOX.style.display='block';

	lightBoxEnabled = true;
}




//-- Reference box
function initFindOntTheWebBox(){
	
	var findOntheWebBox = document.createElement("div");
	findOntheWebBox.style.position = "absolute";
	findOntheWebBox.style.display = "none";
	findOntheWebBox.style.padding = "5px";
	findOntheWebBox.style.border = "1px solid #000";
	findOntheWebBox.style.backgroundColor = "#fff";
	findOntheWebBox.id = "findOntheWebBox";
	
	document.getElementById("newzbin").appendChild(findOntheWebBox);
}

function insertFindonTheWebIcon(reportbody, category, gUID){
	var reportID = reportbody.innerHTML.match(newzBinTitleRegex);
	var img_findontheweb = document.getElementById("img_findontheweb"+gUID);

	if (!img_findontheweb){
		if (reportID != null){
			var parentIconbar = document.getElementById('url'+reportID[1]).parentNode;

			var reportTitle = reportbody.innerHTML.match(newzBinTitleRegex);
			if (reportTitle != null){

				var a_findontheweb = document.createElement("a");
				a_findontheweb.href = "javascript:void(null)";
				
				var img_findontheweb = document.createElement("img");
				img_findontheweb.id = "img_findontheweb"+gUID;
				img_findontheweb.src = FindonTheWeb;
				img_findontheweb.width = 15;
				img_findontheweb.title = "Find report on the web";
				
				img_findontheweb.addEventListener('mouseover', function(){

					var findOntheWebBox = document.getElementById("findOntheWebBox");
					while (findOntheWebBox.hasChildNodes()){findOntheWebBox.removeChild(findOntheWebBox.firstChild);}

					var arrSearchString = cleanSearchString(reportTitle[2]);
					var searchStringFull = arrSearchString[0];
					var searchString = arrSearchString[1];

					var divURL = document.createElement("div");
					divURL.style.fontSize = "8pt";
					divURL.style.fontWeight = "bold";
					divURL.style.textAlign = "right";
					divURL.innerHTML = "Find " + searchStringFull + " on:";
					findOntheWebBox.appendChild(divURL);
					var referenceBoxHeight = 18;
					var divURL = document.createElement("div");
					divURL.style.height = "8px";
					findOntheWebBox.appendChild(divURL);
					referenceBoxHeight += 8;

//-- GAMES & CONSOLES
					if (category == "games" || category == "consoles"){
					
						if(fotwMETACRITIC || fotwGAMERANKINGS || fotwGAMETRAILERS){
							var divURL = document.createElement("div");
							divURL.style.fontSize = "7pt";
							divURL.style.fontWeight = "bold";
							divURL.innerHTML = ":: games & consoles ::";
							divURL.style.padding = "3px";
							divURL.style.textAlign = "right";
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}
						
						if(fotwGAMERANKINGS){
							
							var divURL = document.createElement("div");
							findOnTheWeb(divURL, category, searchString, "Gamerankings.com", faviconGamerankings, "http://www.gamerankings.com/browse.html?numrev=3&search=", '', gUID);
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}

						if(fotwGAMETRAILERS){
							
							var divURL = document.createElement("div");
							findOnTheWeb(divURL, category, searchString, "Gametrailers.com", faviconGametrailers, "http://www.gametrailers.com/search.php?s=", '', gUID);
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}
					}

//-- TV
					if (category == "tv"){
					
						if(fotwMETACRITIC || fotwTVCOM){
							var divURL = document.createElement("div");
							divURL.style.fontSize = "7pt";
							divURL.style.fontWeight = "bold";
							divURL.innerHTML = ":: tv ::";
							divURL.style.padding = "3px";
							divURL.style.textAlign = "right";
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}
						
						if(fotwTVCOM){
							
							var divURL = document.createElement("div");
							findOnTheWeb(divURL, category, searchString, "TV.com", faviconTVcom, "http://www.tv.com/search.php?type=11&stype=all&tag=search%3Bfrontdoor&qs=", '', gUID);
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}
					}
//-- Applications
					if (category == "apps"){
					
						if(fotwZDNET){
							var divURL = document.createElement("div");
							divURL.style.fontSize = "7pt";
							divURL.style.fontWeight = "bold";
							divURL.innerHTML = ":: applications ::";
							divURL.style.padding = "3px";
							divURL.style.textAlign = "right";
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}
						
						if(fotwZDNET){
							
							var searchstringMatch = searchString.match(zdnetStripSearchStringRegex);
							if (searchstringMatch){searchString = trim(searchstringMatch[1]);}
							
							var divURL = document.createElement("div");
							findOnTheWeb(divURL, category, searchString, "ZDnet.com", faviconZDnet, "http://downloads.zdnet.com/search.aspx?q=", '', gUID);
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}
					}
					
//-- Movies
					if (category == "movies"){
					
						if(fotwMETACRITIC || fotwONDERTITELS|| fotwNLONDERTITELS || fotwVCDQ){
							var divURL = document.createElement("div");
							divURL.style.fontSize = "7pt";
							divURL.style.fontWeight = "bold";
							divURL.innerHTML = ":: movies ::";
							divURL.style.padding = "3px";
							divURL.style.textAlign = "right";
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}
						
						if(fotwONDERTITELS){
							var divURL = document.createElement("div");
							findOnTheWeb(divURL, category, searchString, "Ondertitel.com", faviconOndertitels, "http://www.ondertitel.com/?type=&p=zoek&trefwoord=", '', gUID);
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}

						if(fotwNLONDERTITELS){
							var divURL = document.createElement("div");
							findOnTheWeb(divURL, category, searchString, "NLondertitel.com", faviconNLondertitels, "http://www.nlondertitels.com/search/q/", '/1', gUID);
							findOntheWebBox.appendChild(divURL);
						}	referenceBoxHeight += 18;

						if(fotwVCDQ){
							var divURL = document.createElement("div");
							findOnTheWeb(divURL, category, searchString, "Vcdq.com", faviconVCDQ, "http://www.vcdq.com/index.php?searchstring=", '', gUID);
							findOntheWebBox.appendChild(divURL);
						}	referenceBoxHeight += 18;
					}
//-- Music
					if (category == "music"){

						if(fotwMETACRITIC || fotwLASTFM){
							var divURL = document.createElement("div");
							divURL.style.fontSize = "7pt";
							divURL.style.fontWeight = "bold";
							divURL.innerHTML = ":: music ::";
							divURL.style.padding = "3px";
							divURL.style.textAlign = "right";
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}
						
						if(fotwLASTFM){
							var divURL = document.createElement("div");
							findOnTheWeb(divURL, category, searchString, "Last.fm", faviconLastFM, "http://www.last.fm/search?m=all&q=", '', gUID);
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}
					}

//-- Books
					if (category == "books"){

						if(fotwMETACRITIC){
							var divURL = document.createElement("div");
							divURL.style.fontSize = "7pt";
							divURL.style.fontWeight = "bold";
							divURL.innerHTML = ":: books ::";
							divURL.style.padding = "3px";
							divURL.style.textAlign = "right";
							findOntheWebBox.appendChild(divURL);
							referenceBoxHeight += 18;
						}
					}
//--Multiple		
					if (category == "music" || category == "tv" || category == "movies" || category == "games" || category == "consoles" || category == "books"){
						if(fotwMETACRITIC){
							if(fotwMETACRITIC){
								var divURL = document.createElement("div");
								findOnTheWeb(divURL, category, searchString, "Metacritic.com", faviconMetacritic, "http://www.metacritic.com/search/process?sort=relevance&termtype=all&ts=", selectCategoryMetacritic(category),gUID);
								findOntheWebBox.appendChild(divURL);
								referenceBoxHeight += 18;
							}
						}
					}
					
//--video reference
					if(fotwYOUTUBE || fotwBLINKX){
						var divURL = document.createElement("div");
						divURL.style.fontSize = "7pt";
						divURL.style.fontWeight = "bold";
						divURL.innerHTML = ":: video reference ::";
						divURL.style.padding = "3px";
						divURL.style.textAlign = "right";
						findOntheWebBox.appendChild(divURL);
						referenceBoxHeight += 18;
					}
					
					if(fotwYOUTUBE){
						var divURL = document.createElement("div");
						findOnTheWeb(divURL, category, searchStringFull, "Youtube.com", faviconYouTube, "http://www.youtube.com/results?search_query=", '', gUID);
						findOntheWebBox.appendChild(divURL);
						referenceBoxHeight += 18;
					}
					
					if(fotwBLINKX){
						var divURL = document.createElement("div");
						findOnTheWeb(divURL, category, searchStringFull, "Blinkx.com", faviconBlinkx, "http://www.blinkx.com/videos/", '', gUID);
						findOntheWebBox.appendChild(divURL);
						referenceBoxHeight += 18;
					}
//--index sites				
					if(fotwTHEPIRATEBAY || fotwNZBMATRIX || fotwBTJUNKIE){
						var divURL = document.createElement("div");
						divURL.style.fontSize = "7pt";
						divURL.style.fontWeight = "bold";
						divURL.innerHTML = ":: index sites ::";
						divURL.style.padding = "3px";
						divURL.style.textAlign = "right";
						findOntheWebBox.appendChild(divURL);
						referenceBoxHeight += 18;
					}

					if(fotwNZBMATRIX){
						var divURL = document.createElement("div");
						findOnTheWeb(divURL, category, searchString, "NZBMatrix.com", faviconNZBmatrix, "http://nzbmatrix.com/nzb-search.php?sort=6&type=desc&search=", selectCategoryNZBMatrix(category), gUID);
						findOntheWebBox.appendChild(divURL);
						referenceBoxHeight += 18;
					}

					if(fotwTHEPIRATEBAY){
						var divURL = document.createElement("div");
						findOnTheWeb(divURL, category, searchString, "Thepiratebay.org", faviconThePiratebay, "http://thepiratebay.org/search/", selectCategoryThePirateBay(category), gUID);
						findOntheWebBox.appendChild(divURL);
						referenceBoxHeight += 18;
					}

					if(fotwBTJUNKIE){
						var divURL = document.createElement("div");
						findOnTheWeb(divURL, category, searchString, "BTjunkie.org", faviconBTjunkie, "http://btjunkie.org/search?q=", selectCategoryBTjunkie(category), gUID);
						findOntheWebBox.appendChild(divURL);
						referenceBoxHeight += 18;
					}
//--general				
					if(fotwGOOGLE || fotwWIKIPEDIA){
						var divURL = document.createElement("div");
						divURL.style.fontSize = "7pt";
						divURL.style.fontWeight = "bold";
						divURL.innerHTML = ":: general ::";
						divURL.style.padding = "3px";
						divURL.style.textAlign = "right";
						findOntheWebBox.appendChild(divURL);
						referenceBoxHeight += 18;
					}

					if(fotwGOOGLE){
						var divURL = document.createElement("div");
						findOnTheWeb(divURL, category, searchStringFull, "Google.com", faviconGoogle, "http://www.google.com/search?hl=en&source=hp&q=", '',gUID);
						findOntheWebBox.appendChild(divURL);
						referenceBoxHeight += 18;
					}
					
					if(fotwWIKIPEDIA){
						var divURL = document.createElement("div");
						findOnTheWeb(divURL, category, searchStringFull, "Wikipedia.org", faviconWikipedia, "http://en.wikipedia.org/w/index.php?go=Go&title=Special%253ASearch&search=", '',gUID);
						findOntheWebBox.appendChild(divURL);
						referenceBoxHeight += 18;
					}

					
					findOntheWebBox.style.left = (this.x) + "px";
					findOntheWebBox.style.top = Math.min(this.y, window.pageYOffset + window.innerHeight - (10+8+referenceBoxHeight) ) + "px";

					
					//findOntheWebBox.style.display = 'block';
					showFindOntheWebBox = true;

					setTimeout(function(){
						if (showFindOntheWebBox){
							var findOntheWebBox = document.getElementById("findOntheWebBox");
							findOntheWebBox.style.display = 'block';
						}
						
					},100);

					findOntheWebBox.addEventListener('blur', function(){
					
						this.style.display = 'none';
					
					}, false);
					
					findOntheWebBox.addEventListener('mouseout', function(e){
						if (!e) var e = window.event;
						var reltg = (e.relatedTarget) ? e.relatedTarget : e.toElement;
						if (reltg != null){
							while (reltg.tagName != 'BODY'){
							if (reltg.id == this.id){return;}
							reltg = reltg.parentNode;
							}
						
							this.style.display = 'none';
						}
					}, false);	
				
				}, false);

				img_findontheweb.addEventListener('mouseout', function(){
					showFindOntheWebBox = false;
				}, false);

				a_findontheweb.appendChild(img_findontheweb);
				parentIconbar.appendChild(a_findontheweb);
			}
		}
	}
}

function findOnTheWeb(targetDiv, category, searchString, site, favicon, searhURL, searchURLsuffix, gUID){

	var img_favicon = document.getElementById('img_'+site+gUID);
	if (img_favicon == null){
		
		var linkTitle = "Find "+searchString+" on " + site;
		
		var img_favicon = document.createElement("img");
		img_favicon.src = favicon;
		img_favicon.title = linkTitle;
		img_favicon.id = 'img_'+site+gUID;

		searchString = searchString.replace(/\s/g,'+');
		var targetURL = searhURL+escape(searchString)+searchURLsuffix;	

		var a_faviconLinkIcon = document.createElement("a");
		a_faviconLinkIcon.href = "javascript:void(null)";
		a_faviconLinkIcon.addEventListener('click', function(){

				window.open(targetURL);
				this.parentNode.parentNode.style.display = "none";
				
			}, false);
		
		a_faviconLinkIcon.appendChild(img_favicon);
		targetDiv.appendChild(a_faviconLinkIcon);

		var img_spacer = document.createElement("img");
		img_spacer.width = "5";
		img_spacer.src = spacer;
		targetDiv.appendChild(img_spacer);
		
		var a_faviconLink = document.createElement("a");
		a_faviconLink.href = "javascript:void(null)";
		a_faviconLink.innerHTML = site;
		a_faviconLink.style.fontSize = '8pt';
		a_faviconLink.title = linkTitle;
		a_faviconLink.addEventListener('click', function(){

				window.open(targetURL);
				this.parentNode.parentNode.style.display = "none";

			}, false);
		
		targetDiv.appendChild(a_faviconLink);
	}
}

function selectCategoryThePirateBay(category){
		switch(category) {
			case "music":
				var catalog = "/0/99/100";
				break;
			case "movies": case "tv": case "anime":
				var catalog = "/0/99/200";
				break;
			case "apps":
				var catalog = "/0/99/300";
				break;
			case "games": case "consoles":
				var catalog = "/0/99/400";
				break;
			default:
				var catalog = "/0/99/0";
			}

			return catalog;
}

function selectCategoryBTjunkie(category){
		switch(category) {
			case "music":
				var catalog = "&c=1";
				break;
			case "movies": 
				var catalog = "&c=6";
				break;
			case "tv": 
				var catalog = "&c=4";
				break;
			case "anime":
				var catalog = "&c=7";
				break;
			case "apps":
				var catalog = "&c=3";
				break;
			case "games": case "consoles":
				var catalog = "&c=2";
				break;
			default:
				var catalog = "&c=0";
			}
			
			return catalog;
}

function selectCategoryNZBMatrix(category){
		switch(category) {
			case "music":
				var catalog = "&cat=music-all";
				break;
			case "movies":  
				var catalog = "&cat=movies-all";
				break;
			case "anime":
				var catalog = "&cat=28";
				break;
			case "tv":
				var catalog = "&cat=tv-all";
				break;
			case "apps":
				var catalog = "&cat=apps-all";
				break;
			case "games": case "consoles":
				var catalog = "&cat=games-all";
				break;
			default:
				var catalog = "&cat=0";
			}
			
			return catalog;
}

function selectCategoryMetacritic(category){
		switch(category) {
			case "music":
				var catalog = "&ty=2";
				break;
			case "movies": case "anime":
				var catalog = "&ty=1";
				break;
			case "tv":
				var catalog = "&ty=6";
				break;
			case "games": case "consoles":
				var catalog = "&ty=3"
				break;
			case "books":
				var catalog = "&ty=4"
				break;
			default:
				var catalog = "&ty=0";
			}
			
			return catalog;
}



//-- Extra info functions
function GetIGNScore(reportbody, key, gUID, cached){
	var URL = "http://websvc.ign.com/objectWebService?entityid="+key+"&format=json&callback=drawScoresBox";
	
	GM_xmlhttpRequest( {
		method:"GET",url:URL,headers: {Referer:URL,"User-agent":"Mozilla/4.0 (compatible)"}, 
		overrideMimeType:'text/plain; charset=x-user-defined',
		onload:function(responseDetails) {
			
			
			if(responseDetails.status==200) {

				var RatingMatch = responseDetails.responseText.match(ignRatingRegex);
				if (RatingMatch != null) {var rating = parseFloat(RatingMatch[1]);}
				else{var rating = "N/A";}
			}
			else {var rating = "N/A";}

			var providerdata = new providerData();
			providerdata.readCache(objCache[key]);
			providerdata.ratingInfo = rating;
			providerdata.update(key);
			
			if (rating == "N/A" )
			{
				var divRating = document.getElementById('rating'+gUID);
				divRating.innerHTML = "<b>Rating: </b>" + rating + "</b>";
			}
			else
			{
				var starRating = createRating(rating);
				var divRating = document.getElementById('rating'+gUID);
				divRating.innerHTML = "<b>Rating: </b>" + starRating + "&nbsp;&nbsp;&nbsp;&nbsp;<b>" + rating + "/10</b>";
				highlightReport(reportbody, rating, valueGoodIGNrating, enableGoodIGNrating, colorGoodIGNrating, valueBadIGNrating, enableBadIGNrating, colorBadIGNrating, gUID, 'http://www.ign.com/favicon.ico', cached)
			}
		},
		onerror:function(response) {
			var rating = "N/A";

			var divRating = document.getElementById('rating'+gUID);
			divRating.innerHTML = "<b>Rating: </b>" + rating;

			var providerdata = new providerData();
			providerdata.readCache(objCache[key]);
			providerdata.ratingInfo = rating;
			providerdata.update(key);
		}
	});
}

function GetTVRAGEEpisodeSummary(URL, key, gUID){
	
	GM_xmlhttpRequest( {
		method:"GET",url:URL,headers: {Referer:URL,"User-agent":"Mozilla/4.0 (compatible)"}, 
		overrideMimeType:'text/plain; charset=x-user-defined',
		onload:function(responseDetails) {
			
			
			if(responseDetails.status==200) {

				var episodeSummaryMatch = responseDetails.responseText.match(tvrageEpisodeSummaryRegex);
				if (episodeSummaryMatch != null) {
					var episodeSummary = trim(stripHTML(episodeSummaryMatch[1]))
					if (episodeSummary.length > 500) {episodeSummary = episodeSummary.substr(0, 500) + "...";}
				} 
				else {var episodeSummary = "N/A";}
			}
			else {var episodeSummary = "N/A";}

			var providerdata = new providerData();
			providerdata.readCache(objCache[key]);
			providerdata.episodedescription = episodeSummary;
			providerdata.update(key);
			
			var episodesummaryDiv = document.getElementById('episodesummary'+gUID);
			episodesummaryDiv.innerHTML = "<b>Episode summary: </b>" + episodeSummary;
		},

		onerror:function(response) {
			var episodeSummary = "N/A";

			var episodesummaryDiv = document.getElementById('episodesummary'+gUID);
			episodesummaryDiv.innerHTML = "<b>Episode summary: </b>" + episodeSummary;

			var providerdata = new providerData();
			providerdata.readCache(objCache[key]);
			providerdata.episodedescription = episodeSummary;
			providerdata.update(key);
		}
	});
}

function GetRottenTomatoesInfo(InfoURL, key, gUID) {
	var URL = InfoURL;
		
	GM_xmlhttpRequest( {
		method:"GET",url:InfoURL,headers: {Referer:URL,"User-agent":"Mozilla/4.0 (compatible)"}, 
		overrideMimeType:'text/plain; charset=x-user-defined',
		onload:function(responseDetails) {

			if(responseDetails.status==200) {

				var tomatometerMatch = responseDetails.responseText.match(rottommeterRegex);
				var rottomreviewscountedMatch = responseDetails.responseText.match(rottomreviewscountedRegex);
				var rottomreviewsfreshMatch = responseDetails.responseText.match(rottomreviewsfreshRegex);
				var rottomreviewsrottenMatch = responseDetails.responseText.match(rottomreviewsrottenRegex);
				var rottomratingMatch = responseDetails.responseText.match(rottomratingRegex);
				var rottomiconMatch = responseDetails.responseText.match(rottomiconRegex);
				var rottomconsensusMatch = responseDetails.responseText.match(rottomconsensusRegex);


				if (tomatometerMatch)
				{
					var strRottenTom = tomatometerMatch[1] + "|" + rottomreviewscountedMatch[1] + "|" + rottomreviewsfreshMatch[1] + "|" + rottomreviewsrottenMatch[1] + "|" + rottomratingMatch[1] + "|" + rottomiconMatch[1];

					var rtIcon = "<img src='" + eval(rottomiconMatch[1]) + "' title='"+rottomiconMatch[1]+"' />";
					
					var dataRottenTomatoesInnerHTML  = "<b>Tomatometer: </b>" + tomatometerMatch[1] + "%&nbsp;" + rtIcon + "&nbsp;";
					dataRottenTomatoesInnerHTML += "<div style=\"position: relative; top: -13px; left:190px; overflow: hidden; clear: both; width: 107px; height: 13px; margin-left: 5px;  background: url("+tomatometer_bar_bg+") no-repeat left top;\">";
					dataRottenTomatoesInnerHTML += "<img style=\"float: left; height: 12px; width: 6px;\"  src=\""+tomatometer_bar_over_left+"\">";
					dataRottenTomatoesInnerHTML += "<img style=\"float: left; height: 12px; width: " + tomatometerMatch[1] + "px;\"  src=\""+tomatometer_bar_over_middle+"\">";
					dataRottenTomatoesInnerHTML += "</div>";
					dataRottenTomatoesInnerHTML += "<div style=\"position: relative; top: -26px; left:310px;  font-size: 7pt\">" + rottomreviewscountedMatch[1] + "&nbsp;&nbsp;<img src='" + tomato + "' />" + rottomreviewsfreshMatch[1] + "&nbsp;&nbsp;<img src='" + splat + "' />" + rottomreviewsrottenMatch[1] + "&nbsp;&nbsp;" + rottomratingMatch[1] + " | <a target='_blank' href='" + URL + "'>more</a></div>";
				}
				else 
				{
					var strRottenTom = "N/A";
					var dataRottenTomatoesInnerHTML = "<b>Tomatometer: </b> " + strRottenTom;
				}
				
				if (rottomconsensusMatch)
				{
					var strConsensus = rottomconsensusMatch[1];
					var dataConsensusInnerHTML = "<b>Consensus: </b> " + strConsensus;
				}
				else
				{
					var strConsensus = "N/A";
					var dataConsensusInnerHTML = "<b>Consensus: </b> " + strConsensus;
				}
			}
			else 
			{
				var strRottenTom = "N/A";
				var dataRottenTomatoesInnerHTML = "<b>Tomatometer: </b> " + strRottenTom;
			}

			var dataConsensus = document.getElementById('rottenconsensus'+gUID)
			dataConsensus.innerHTML = dataConsensusInnerHTML;

			var dataRottenTomatoes = document.getElementById('rottentomato'+gUID)
			dataRottenTomatoes.innerHTML = dataRottenTomatoesInnerHTML;

			var providerdata = new providerData();
			if (objCache[key]){providerdata.readCache(objCache[key]);}
			providerdata.rottomInfo = strRottenTom;
			providerdata.consensus = strConsensus;
			providerdata.update(key);
		},

		onerror:function(response) {
			var strRottenError = "N/A";

			var dataRottenTomatoes = document.getElementById('rottentomato'+gUID)
			dataRottenTomatoes.innerHTML = "<b>Tomatometer: </b> " + strRottenError;

			var dataConsensus1 = document.getElementById('rottenconsensus'+gUID)
			dataConsensus1.innerHTML = "<b>Consensus: </b> " + strRottenError;

			var providerdata = new providerData();
			if ( objCache[key] != "undefined"){
				providerdata.readCache(objCache[key]);
			}
			providerdata.rottomInfo = strRottenError;
			providerdata.consensus = strRottenError;
			providerdata.update(key);
		}
	});
}

function loadBoxshotImage(URL, key, gUID) {

	if ( URL != "" && !URL.match('boxart_547.jpg')) // URL is not empty and not the default image from IGN.com
	{
		GM_xmlhttpRequest( {
			method:"GET",url:URL,headers: {Referer:URL,"User-agent":"Mozilla/4.0 (compatible)"}, 
			overrideMimeType:'text/plain; charset=x-user-defined',
			onload:function(response) {

				if(response.status==200) {

					var text = response.responseText;
					var b64 = Base64.encode(text);

					var img_Boxshot = document.createElement("img");
					img_Boxshot.width = "94";
					img_Boxshot.src = "data:image/jpeg;base64," + b64;

					var a_Boxshot = document.createElement("a");
					a_Boxshot.href = "javascript:void(null)";
					a_Boxshot.addEventListener('click', function(){
						
						showLightBox(img_Boxshot.width,img_Boxshot.height,'data:image/jpeg;base64,' + b64);
						
					}, false);

					a_Boxshot.appendChild(img_Boxshot);

					var parentBoxshotIMG = document.getElementById('boxshot'+gUID)
					while (parentBoxshotIMG.hasChildNodes()){parentBoxshotIMG.removeChild(parentBoxshotIMG.firstChild);}
					parentBoxshotIMG.appendChild(a_Boxshot);

				}
				else {
					var img_Boxshot = document.createElement("img");
					img_Boxshot.src = noBoxshot;

					var parentBoxshotIMG = document.getElementById('boxshot'+gUID)
					while (parentBoxshotIMG.hasChildNodes()){parentBoxshotIMG.removeChild(parentBoxshotIMG.firstChild);}
					parentBoxshotIMG.appendChild(img_Boxshot);

					var b64 = "error";
				}
				
				if (BOXSHOTCACHEEnable){
					var providerdata = new providerData();
					providerdata.readCache(objCache[key]);
					providerdata.boxshot = b64;
					providerdata.update(key);
				}
				
			},

			onerror:function(response) {
				var img_Boxshot = document.createElement("img");
				img_Boxshot.src = noBoxshot;

				var parentBoxshotIMG = document.getElementById('boxshot'+gUID)
				while (parentBoxshotIMG.hasChildNodes()){parentBoxshotIMG.removeChild(parentBoxshotIMG.firstChild);}
				parentBoxshotIMG.appendChild(img_Boxshot);

				if (BOXSHOTCACHEEnable){
					var strResponse = "error";
					var providerdata = new providerData();
					providerdata.readCache(objCache[key]);
					providerdata.boxshot = strResponse;
					providerdata.update(key);
				}
			}
		});
	}
	else
	{
		var strResponse = "error";
		var providerdata = new providerData();
		providerdata.readCache(objCache[key]);
		providerdata.boxshot = strResponse;
		providerdata.update(key);

		var boxShotIMG = document.getElementById('boxshot'+gUID);
		boxShotIMG.innerHTML = "<img src='" + noBoxshot + "' />";
	}
}

function checkVersionScript() {
	GM_xmlhttpRequest({
		method: "GET",
		url: const_scriptHomepageURL,
		onload: function(response) {
			if ((response.readyState == 4) && (response.status == 200)) {

				// Gets the remote version from the response and makes sure it is a number
				var responseMatch = response.responseText.match(userscriptVersionRegex);
				var remoteVersion = (responseMatch === null) ? NaN : parseInt(responseMatch[1], 10);
				if (isNaN(remoteVersion)) return;
				
				// Get the remote value for displaying and update the popup.
				var remoteScriptVersion = document.getElementById('remoteScriptVersion');
				remoteScriptVersion.innerHTML = responseMatch[2];

				// Get the previous stored remote version and check if it's older than the current remote version, if so... enable the popup.
				
				var showScriptUpdatePopup = GM_getValue("showScriptUpdatePopup", true);
				var scriptLastRemoteVersion = GM_getValue("scriptLastRemoteVersion", "0")
				if (remoteVersion > scriptLastRemoteVersion){
					var showScriptUpdatePopup = true;
					GM_setValue("showScriptUpdatePopup", showScriptUpdatePopup);
				}

				// Saves the more recent version according to the server and shows the update notice if the server version is newer
				GM_setValue("scriptLastRemoteVersion", remoteVersion.toString());
				if (remoteVersion > const_scriptVersionTimestap && showScriptUpdatePopup) {ShowPopup('ScriptUpdatePopup');}
			}
		}
	});
}

function checkAnidbLoggedIn(){
	if (anidbUsername != "" && anidbPassword != ""){
		GM_xmlhttpRequest({
			method: "GET",
			url: const_anidbURL,
			onload: function(response) {

				if ((response.readyState == 4) && (response.status == 200)) {

					var responseMatch = response.responseText.match(anidbLoggedInRegex);
					if (responseMatch){
						anidbLoggedIn = true;
						var fakeImage = new Image(); 
						fakeImage.src = "http://anidb.net/perl-bin/animedb.pl?show=main&xuser="+anidbUsername+"&xpass="+anidbPassword+"&xdoautologin=on&xkeepoldcookie=on&do.auth.x=Login";
					}
				}
			}
		});
	}
}




// Providers	
function getInfoIMDB(imdbBody, imdbLink, category, gUID, cacheEnabled, recurssiveCounter){
	var keyIMDB = imdbLink.match(imdbLinkRegex);

	
	if (objCache[keyIMDB[1]] && cacheEnabled)
	{

		cache_references++;
		
		var providerdata = new providerData();
		providerdata.readCache(objCache[keyIMDB[1]]);
		providerdata.update(keyIMDB[1]);
		
		var report = new Report();
		report.valueGoodrating = valueGoodIMDBrating;
		report.colorGoodrating = colorGoodIMDBrating;
		report.enableGoodrating = enableGoodIMDBrating;
		report.valueBadrating = valueBadIMDBrating;
		report.colorBadrating = colorBadIMDBrating;
		report.enableBadrating = enableBadIMDBrating;

		report.show (imdbBody, providerdata,true,keyIMDB[1], gUID);
	}
	else
	{

		GM_xmlhttpRequest({
		  method: 'GET',
		  url: imdbLink,
		  headers: {'Referer': imdbLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
		  {
			if (responseDetails.status == 200)
			{

				var ratingMatch = responseDetails.responseText.match(imdbratingRegex);
				var descMatch = responseDetails.responseText.match(imdbdescRegex);
				var genreMatch = responseDetails.responseText.match(imdbgenreRegex);
				var castMatch = responseDetails.responseText.match(imdbcastRegex);
				var boxshotMatch = responseDetails.responseText.match(imdbBoxshotRegex);

				if (ratingMatch){var rating = parseFloat(ratingMatch[1]); var votes = trim(ratingMatch[2]);}
				else{var rating = "N/A"; votes = "N/A";}

				var description = "N/A";
				if (descMatch)
				{
					description = descMatch[1].replace('href=\"/', ' target=\"_blank\" href=\"http://www.imdb.com/');
					description = description.replace('href=\"synopsis\"', ' target=\"_blank\" href=\"' + imdbLink + 'synopsis\"');
					description = description.replace(/class=\"tn15more inline\"/g,''); // cleanup code
					description = description.replace(imdbcleancodeRegex,''); // cleanup code
					description = trim(description);
				}
				
				var castMembers = "N/A";
				if(castMatch)
				{
					castMatch = castMatch[0].replace(/<td class="hs">[\s\S]*?<\/td>/g,'');
					castMatch = castMatch.replace(/<td class="ddd">[\s\S]*?<\/td>/g,'');
					castMatch = castMatch.replace(/<td class="char">[\s\S]*?<\/td>/g,'');

					var parser = new DOMParser();
					var dom = parser.parseFromString(castMatch,"application/xml");
					var entries=dom.getElementsByTagName("a");
					castMembers = '';
					for (var i = 0; i < entries.length; i=i+1) {
						if (castMembers != ''){castMembers += ', ';}
						castMembers = castMembers + entries[i].textContent;
					}
					
					if (castMembers.length > 500) {
						castMembers = castMembers.substr(0, 500) + "...";
					}

					castMembers = castMembers + "&nbsp;|&nbsp;<a target=\"_blank\" href=\"" + imdbLink + "fullcredits#cast\">more</a>";
				}

				var genreInfo = "N/A";
				if(genreMatch){genreInfo = trim(stripHTML(genreMatch[1].replace(/\s\|/g,',')));}

				if (boxshotMatch != null) {var boxshotURL = boxshotMatch[1];}
				else {var boxshotURL = "";}

				var providerdata = new providerData();
				providerdata.category = category;
				providerdata.ratingInfo = rating;
				providerdata.votes = votes;
				providerdata.description = description;
				providerdata.castMembers = castMembers;
				providerdata.genreInfo = genreInfo;
				providerdata.providerType = const_imdb;
				providerdata.boxshotURL = boxshotURL;
				providerdata.targeturl = imdbLink;
				providerdata.update(keyIMDB[1]);

				var report = new Report();
				report.valueGoodrating = valueGoodIMDBrating;
				report.colorGoodrating = colorGoodIMDBrating;
				report.enableGoodrating = enableGoodIMDBrating;
				report.valueBadrating = valueBadIMDBrating;
				report.colorBadrating = colorBadIMDBrating;
				report.enableBadrating = enableBadIMDBrating;

				report.show(imdbBody, providerdata,false,keyIMDB[1], gUID);

				loadBoxshotImage(boxshotURL, keyIMDB[1], gUID);
				GetRottenTomatoesInfo('http://www.rottentomatoes.com/alias?type=imdbid&s=' + keyIMDB[1], keyIMDB[1], gUID);
			}
			else
			{
				var extrainfoTR = document.getElementById('TR'+gUID);
				if (recurssiveCounter > 0){
					extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
					sleep(0.1);
					if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
					getInfoIMDB(imdbBody, imdbLink, category, gUID, cacheEnabled, recurssiveCounter-1);
				}
				else {
					extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

					if (left(responseDetails.status,1) != "4"){
						var a_refreshReport = document.createElement("a");
						a_refreshReport.href = "javascript:void(null);";
						a_refreshReport.id = 'a_refreshReport'+gUID;
						a_refreshReport.innerHTML = "Reload data";
						a_refreshReport.addEventListener('click', function(){

							var currTDboxshot = document.getElementById('boxshot'+gUID);
							var currentColor = currTDboxshot.style.backgroundColor;

							var firstTD = document.createElement("td");
							firstTD.style.backgroundColor = currentColor;
							firstTD.colSpan = 2;
							firstTD.align = 'center';
							firstTD.id = 'boxshot'+gUID;
							
							var secondTD = document.createElement("td");
							secondTD.style.backgroundColor = currentColor;
							secondTD.colSpan = 4;
							
							var checkingImage = document.createElement("img");
							checkingImage.src = gettingInfo;
							checkingImage.alt = 'checking';
							
							while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
							
							firstTD.appendChild(checkingImage);
							extrainfoTR.appendChild(firstTD);
							extrainfoTR.appendChild(secondTD);

							getInfoIMDB(imdbBody,imdbLink, category, gUID, false, 0);

						}, false);
						
						var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
						server_unresponsive.appendChild(a_refreshReport);
					}
						
					showTitleIcons (imdbBody, category, gUID);
					insertSabnzbdIcon(imdbBody, gUID);
					insertFindonTheWebIcon(imdbBody, category, gUID);
					
				}
			}
		  }
	   });
	}
}

function getInfoGamespot(gamespotBody, gamespotLink, category, gUID, cacheEnabled, recurssiveCounter){

	var keyGAMESPOT = gamespotLink.match(gamespotLinkRegex);
	
	if (objCache[keyGAMESPOT[1]] && cacheEnabled)
	{
		cache_references++;

		var providerdata = new providerData();
		providerdata.readCache(objCache[keyGAMESPOT[1]]);
		providerdata.update(keyGAMESPOT[1]);
		
		var report = new Report();
		report.valueGoodrating = valueGoodGAMESPOTrating;
		report.colorGoodrating = colorGoodGAMESPOTrating;
		report.enableGoodrating = enableGoodGAMESPOTrating;
		report.valueBadrating = valueBadGAMESPOTrating;
		report.colorBadrating = colorBadGAMESPOTrating;
		report.enableBadrating = enableBadGAMESPOTrating;
		report.show (gamespotBody, providerdata,true,keyGAMESPOT[1], gUID);
	}
	else
	{

		GM_xmlhttpRequest({
		  method: 'GET',
		  url: gamespotLink,
		  headers: {'Referer': gamespotLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
			{
				if (responseDetails.status == 200)
				{
					var ratingMatch = responseDetails.responseText.match(gamespotRatingRegex);
					var votesMatch = responseDetails.responseText.match(gamespotVotesRegex);
					var descMatch = responseDetails.responseText.match(gamespotDescriptionRegex);
					var genreMatch = responseDetails.responseText.match(gamespotGenreRegex);
					var publisherMatch = responseDetails.responseText.match(gamespotPublisherRegex);
					var developerMatch = responseDetails.responseText.match(gamespotDeveloperRegex);
					var esrbMatch = responseDetails.responseText.match(gamespotESRBRegex);
					var boxshotMatch = responseDetails.responseText.match(gamespotBoxshotRegex);
	
					if (ratingMatch){var rating = parseFloat(ratingMatch[1]);}
					else{var rating = "N/A";}

					if (votesMatch){var votes = votesMatch[1];}
					else{var votes = "N/A";}
					
					if (descMatch){description = descMatch[1];}
					else{description = "N/A"}

					if (genreMatch){genreInfo = genreMatch[1];}
					else{genreInfo = "N/A"}

					if (publisherMatch){publisher = publisherMatch[1];}
					else{publisher = "N/A"}

					if (developerMatch){developer = developerMatch[1];}
					else{developer = "N/A"}

					if (esrbMatch){contentrating = esrbMatch[1];}
					else{contentrating = "N/A"}

					if (boxshotMatch != null) {var boxshotURL = boxshotMatch[1];}
					else {var boxshotURL = "";}

					var providerdata = new providerData();
					providerdata.category = category;
					providerdata.ratingInfo = rating;
					providerdata.votes = votes;
					providerdata.description = description;
					providerdata.genreInfo = genreInfo;
					providerdata.providerType = const_gamespot;
					providerdata.publisher = publisher;
					providerdata.developer = developer;
					providerdata.contentrating = contentrating;
					providerdata.boxshotURL = boxshotURL;
					providerdata.targeturl = gamespotLink;
					providerdata.update(keyGAMESPOT[1]);

					var report = new Report();
					report.valueGoodrating = valueGoodGAMESPOTrating;
					report.colorGoodrating = colorGoodGAMESPOTrating;
					report.enableGoodrating = enableGoodGAMESPOTrating;
					report.valueBadrating = valueBadGAMESPOTrating;
					report.colorBadrating = colorBadGAMESPOTrating;
					report.enableBadrating = enableBadGAMESPOTrating;
					report.show (gamespotBody, providerdata, false, keyGAMESPOT[1], gUID);

					loadBoxshotImage(boxshotURL, keyGAMESPOT[1], gUID);
				}
				else
				{
					var extrainfoTR = document.getElementById('TR'+gUID);
					if (recurssiveCounter > 0){
						extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
						sleep(0.1);
						if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
						getInfoGamespot(gamespotBody, gamespotLink, category, gUID, cacheEnabled, recurssiveCounter-1);
					}
					else {
						extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

						if (left(responseDetails.status,1) != "4"){
							var a_refreshReport = document.createElement("a");
							a_refreshReport.href = "javascript:void(null);";
							a_refreshReport.id = 'a_refreshReport'+gUID;
							a_refreshReport.innerHTML = "Reload data";
							a_refreshReport.addEventListener('click', function(){

								var currTDboxshot = document.getElementById('boxshot'+gUID);
								var currentColor = currTDboxshot.style.backgroundColor;

								var firstTD = document.createElement("td");
								firstTD.style.backgroundColor = currentColor;
								firstTD.colSpan = 2;
								firstTD.align = 'center';
								firstTD.id = 'boxshot'+gUID;
								
								var secondTD = document.createElement("td");
								secondTD.style.backgroundColor = currentColor;
								secondTD.colSpan = 4;
								
								var checkingImage = document.createElement("img");
								checkingImage.src = gettingInfo;
								checkingImage.alt = 'checking';
								
								while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
								
								firstTD.appendChild(checkingImage);
								extrainfoTR.appendChild(firstTD);
								extrainfoTR.appendChild(secondTD);

								getInfoGamespot(gamespotBody,gamespotLink, category, gUID, false, 0);

							}, false);
							
							var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
							server_unresponsive.appendChild(a_refreshReport);
						}
						
						showTitleIcons (gamespotBody, category, gUID);
						insertSabnzbdIcon(gamespotBody, gUID);
						insertFindonTheWebIcon(gamespotBody, category, gUID);
						
					}
				}
			}
		});
	}
}

function getInfoAllMusic(allmusicBody, allmusicLink, category, gUID, cacheEnabled, recurssiveCounter){

	var keyALLMUSIC = allmusicLink.match(allmusicIDRegex);

	if (objCache[keyALLMUSIC] && cacheEnabled)
	{
		cache_references++;

		var providerdata = new providerData();
		providerdata.readCache(objCache[keyALLMUSIC]);
		providerdata.update(keyALLMUSIC);
		
		var report = new Report();
		report.valueGoodrating = valueGoodALLMUSICrating;
		report.colorGoodrating = colorGoodALLMUSICrating;
		report.enableGoodrating = enableGoodALLMUSICrating;
		report.valueBadrating = valueBadALLMUSICrating;
		report.colorBadrating = colorBadALLMUSICrating;
		report.enableBadrating = enableBadALLMUSICrating;
		report.show (allmusicBody, providerdata,true,keyALLMUSIC, gUID);
	}
	else
	{
	   GM_xmlhttpRequest({
		  method: 'GET',
		  url: allmusicLink,
		  headers: {'Referer': allmusicLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
			{
				if (responseDetails.status == 200)
				{

					var ratingMatch = responseDetails.responseText.match(allmusicRatingRegex);
					var boxshotMatch = responseDetails.responseText.match(allmusicBoxshotRegex);
					var labelMatch = responseDetails.responseText.match(allmusicLabelRegex);
					var genreMatch = responseDetails.responseText.match(allmusicGenreRegex);
					var releasedateMatch = responseDetails.responseText.match(allmusicReleaseDateRegex);
					var recordlengthMatch = responseDetails.responseText.match(allmusicRecordlengthRegex);

					if (ratingMatch){var rating = parseFloat(ratingMatch[1])*2;}
					else{var rating = "N/A";}

					if (labelMatch){var label = labelMatch[1];}
					else{var label = "N/A"}

					if (genreMatch){var genreInfo = genreMatch[1];}
					else{var genreInfo = "N/A"}

					if (releasedateMatch){var releasedate = releasedateMatch[1];}
					else{var releasedate = "N/A"}

					if (recordlengthMatch){var recordlength = recordlengthMatch[1];}
					else{var recordlength = "N/A"}

					if (boxshotMatch != null) {var boxshotURL = boxshotMatch[0];}
					else {var boxshotURL = "";}

					var providerdata = new providerData();
					providerdata.category = category;
					providerdata.ratingInfo = rating;
					providerdata.genreInfo = genreInfo;
					providerdata.providerType = const_allmusic;
					providerdata.label = label;
					providerdata.releasedate = releasedate;
					providerdata.recordlength = recordlength;
					providerdata.boxshotURL = boxshotURL;
					providerdata.targeturl = allmusicLink;
					providerdata.update(keyALLMUSIC);

					var report = new Report();
					report.valueGoodrating = valueGoodALLMUSICrating;
					report.colorGoodrating = colorGoodALLMUSICrating;
					report.enableGoodrating = enableGoodALLMUSICrating;
					report.valueBadrating = valueBadALLMUSICrating;
					report.colorBadrating = colorBadALLMUSICrating;
					report.enableBadrating = enableBadALLMUSICrating;
					report.show (allmusicBody, providerdata,false,keyALLMUSIC, gUID);

					loadBoxshotImage(boxshotURL, keyALLMUSIC, gUID);
				}
				else
				{
					var extrainfoTR = document.getElementById('TR'+gUID);
					if (recurssiveCounter > 0){
						extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
						sleep(0.1);
						if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
						getInfoAllmusic(allmusicBody, allmusicLink, category, gUID, cacheEnabled, recurssiveCounter-1);
					}
					else {
						extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

						if (left(responseDetails.status,1) != "4"){
							var a_refreshReport = document.createElement("a");
							a_refreshReport.href = "javascript:void(null);";
							a_refreshReport.id = 'a_refreshReport'+gUID;
							a_refreshReport.innerHTML = "Reload data";
							a_refreshReport.addEventListener('click', function(){

								var currTDboxshot = document.getElementById('boxshot'+gUID);
								var currentColor = currTDboxshot.style.backgroundColor;

								var firstTD = document.createElement("td");
								firstTD.style.backgroundColor = currentColor;
								firstTD.colSpan = 2;
								firstTD.align = 'center';
								firstTD.id = 'boxshot'+gUID;
								
								var secondTD = document.createElement("td");
								secondTD.style.backgroundColor = currentColor;
								secondTD.colSpan = 4;
								
								var checkingImage = document.createElement("img");
								checkingImage.src = gettingInfo;
								checkingImage.alt = 'checking';
								
								while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
								
								firstTD.appendChild(checkingImage);
								extrainfoTR.appendChild(firstTD);
								extrainfoTR.appendChild(secondTD);

								getInfoAllmusic(allmusicBody,allmusicLink, category, gUID, false, 0);

							}, false);
							
							var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
							server_unresponsive.appendChild(a_refreshReport);
						}
						
						showTitleIcons (allmusicBody, category, gUID);
						insertSabnzbdIcon(allmusicBody, gUID);
						insertFindonTheWebIcon(allmusicBody, category, gUID);
						
					}
				}
			}
		});
	}
}

function getInfoIGN(ignBody, ignLink, category, gUID, cacheEnabled, recurssiveCounter){
	var keyIGN = ignLink.match(ignLinkRegex);

	if (objCache[keyIGN[1]] && cacheEnabled)
	{
		cache_references++;

		var providerdata = new providerData();
		providerdata.readCache(objCache[keyIGN[1]]);
		providerdata.update(keyIGN[1]);

		var report = new Report();
		report.valueGoodrating = valueGoodIGNrating;
		report.colorGoodrating = colorGoodIGNrating;
		report.enableGoodrating = enableGoodIGNrating;
		report.valueBadrating = valueBadIGNrating;
		report.colorBadrating = colorBadIGNrating;
		report.enableBadrating = enableBadIGNrating;
		report.show (ignBody, providerdata,true,keyIGN[1], gUID);

	}
	else
	{
	   GM_xmlhttpRequest({
		  method: 'GET',
		  url: ignLink,
		  headers: {'Referer': ignLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
			{
				if (responseDetails.status == 200)
				{
					var descMatch = responseDetails.responseText.match(ignDescriptionRegex);
					var genreMatch = responseDetails.responseText.match(ignGenreRegex);
					var publisherMatch = responseDetails.responseText.match(ignPublisherRegex);
					var developerMatch = responseDetails.responseText.match(ignDeveloperRegex);
					var esrbMatch = responseDetails.responseText.match(ignESRBRegex);
					var boxshotMatch = responseDetails.responseText.match(ignBoxshotRegex);
	
					if (descMatch){var description = descMatch[1];}
					else{var description = "N/A"}

					if (genreMatch){var genreInfo = genreMatch[1];}
					else{var genreInfo = "N/A"}

					if (publisherMatch){var publisher = publisherMatch[1];}
					else{var publisher = "N/A"}

					if (developerMatch){var developer = developerMatch[1];}
					else{var developer = "N/A"}

					if (esrbMatch){var contentrating = trim(esrbMatch[1]);}
					else{var contentrating = "N/A"}

					if (boxshotMatch != null) {var boxshotURL = boxshotMatch[1];}
					else {var boxshotURL = "";}

					var providerdata = new providerData();
					providerdata.category = category;
					providerdata.description = description;
					providerdata.genreInfo = genreInfo;
					providerdata.providerType = const_ign;
					providerdata.publisher = publisher;
					providerdata.developer = developer;
					providerdata.contentrating = contentrating;
					providerdata.boxshotURL = boxshotURL;
					providerdata.targeturl = ignLink;
					providerdata.update(keyIGN[1]);

					var report = new Report();
					report.valueGoodrating = valueGoodIGNrating;
					report.colorGoodrating = colorGoodIGNrating;
					report.enableGoodrating = enableGoodIGNrating;
					report.valueBadrating = valueBadIGNrating;
					report.colorBadrating = colorBadIGNrating;
					report.enableBadrating = enableBadIGNrating;
					report.show (ignBody, providerdata,false,keyIGN[1], gUID);
					
					loadBoxshotImage(boxshotURL, keyIGN[1], gUID);
					GetIGNScore(ignBody, keyIGN[1], gUID, false);
				}
				else
				{
					var extrainfoTR = document.getElementById('TR'+gUID);
					if (recurssiveCounter > 0){
						extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
						sleep(0.1);
						if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
						getInfoIGN(ignBody, ignLink, category, gUID, cacheEnabled, recurssiveCounter-1);
					}
					else {
						extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

						if (left(responseDetails.status,1) != "4"){
							var a_refreshReport = document.createElement("a");
							a_refreshReport.href = "javascript:void(null);";
							a_refreshReport.id = 'a_refreshReport'+gUID;
							a_refreshReport.innerHTML = "Reload data";
							a_refreshReport.addEventListener('click', function(){

								var currTDboxshot = document.getElementById('boxshot'+gUID);
								var currentColor = currTDboxshot.style.backgroundColor;

								var firstTD = document.createElement("td");
								firstTD.style.backgroundColor = currentColor;
								firstTD.colSpan = 2;
								firstTD.align = 'center';
								firstTD.id = 'boxshot'+gUID;
								
								var secondTD = document.createElement("td");
								secondTD.style.backgroundColor = currentColor;
								secondTD.colSpan = 4;
								
								var checkingImage = document.createElement("img");
								checkingImage.src = gettingInfo;
								checkingImage.alt = 'checking';
								
								while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
								
								firstTD.appendChild(checkingImage);
								extrainfoTR.appendChild(firstTD);
								extrainfoTR.appendChild(secondTD);

								getInfoIGN(ignBody,ignLink, category, gUID, false, 0);

							}, false);
							
							var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
							server_unresponsive.appendChild(a_refreshReport);
						}
						
						showTitleIcons (ignBody, category, gUID);
						insertSabnzbdIcon(ignBody, gUID);
						insertFindonTheWebIcon(ignBody, category, gUID);
						
					}
				}
			}
		});
	}
}

function getInfoAmazon(amazonBody, amazonLink, category, gUID, cacheEnabled, recurssiveCounter){
	var keyAMAZON = amazonLink.match(amazonLinkRegex);

	if (objCache[keyAMAZON[1]] && cacheEnabled)
	{
		cache_references++;

		var providerdata = new providerData();
		providerdata.readCache(objCache[keyAMAZON[1]]);
		providerdata.update(keyAMAZON[1]);

		var report = new Report();
		report.valueGoodrating = valueGoodAMAZONrating;
		report.colorGoodrating = colorGoodAMAZONrating;
		report.enableGoodrating = enableGoodAMAZONrating;
		report.valueBadrating = valueBadAMAZONrating;
		report.colorBadrating = colorBadAMAZONrating;
		report.enableBadrating = enableBadAMAZONrating;
		report.show (amazonBody, providerdata,true,keyAMAZON[1], gUID);
	
	}
	else
	{
	   GM_xmlhttpRequest({
		  method: 'GET',
		  url: amazonLink,
		  headers: {'Referer': amazonLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
			{
				if (responseDetails.status == 200)
				{
					var ratingMatch = responseDetails.responseText.match(amazonRatingRegex);
					var votesMatch = responseDetails.responseText.match(amazonVotesRegex);
					var descMatch = responseDetails.responseText.match(amazondescRegex);
					var genreMatch = responseDetails.responseText.match(amazonGenreRegex);
					var castMatch = responseDetails.responseText.match(amazonCastRegex);

					var labelMatch = responseDetails.responseText.match(amazonLabelRegex);
					var releasedateMatch1 = responseDetails.responseText.match(amazonReleaseDateRegex1);
					var releasedateMatch2 = responseDetails.responseText.match(amazonReleaseDateRegex2);
					var releasedateMatch3 = responseDetails.responseText.match(amazonReleaseDateRegex3);
					
					var publisherMatch = responseDetails.responseText.match(amazonPublisherrRegex);
					var esrbMatch = responseDetails.responseText.match(amazonESRBRegex);
					var pegiMatch = responseDetails.responseText.match(amazonPEGIRegex);
					var bbfcMatch = responseDetails.responseText.match(amazonBBFCRegex);
					
					var boxshotMatch = responseDetails.responseText.match(amazonBoxshotRegex);
	
					if (ratingMatch){
						var rating = ratingMatch[1];
						rating = rating.replace("_",".");
						rating = parseFloat(rating)*2;						
					}
					else{var rating = "N/A";}

					if (votesMatch){var votes = votesMatch[1];}
					else{var votes = "N/A";}

					if (descMatch){
						var description = descMatch[1];
						description = description.replace(/<b>[^<^]+<\/b><br \/>/g, "");
						description = description.replace(/<[^>]+>/g, "");
						if (description.length > 500) {
							description = trim(description.substr(0, 500)) + "...";
						}
					}
					else{var description = "N/A"}

					if (genreMatch){var genreInfo = genreMatch[1];}
					else{var genreInfo = "N/A"}

					var castMembers = "N/A";
					if(castMatch){castMembers = stripHTML(castMatch[1]);}

					
					if (labelMatch){var label = labelMatch[1];}
					else{var label = "N/A"}

					var releasedate = "N/A"
					if (releasedateMatch1){releasedate = trim(releasedateMatch1[1]);}
					if (releasedateMatch2){releasedate = trim(releasedateMatch2[1]);}
					if (releasedateMatch3){releasedate = trim(releasedateMatch3[1]);}

					if (publisherMatch){var publisher = publisherMatch[1];}
					else{var publisher = "N/A"}

					var contentrating = "N/A";
					if (pegiMatch){contentrating = trim(pegiMatch[1]);}
					if (bbfcMatch){contentrating = trim(bbfcMatch[1]);}
					if (esrbMatch){contentrating = trim(esrbMatch[1]);}

					if (boxshotMatch != null) {var boxshotURL = boxshotMatch[1];}
					else {var boxshotURL = "";}

					var providerdata = new providerData();
					providerdata.ratingInfo = rating;
					providerdata.votes = votes;
					providerdata.description = description;
					providerdata.genreInfo = genreInfo;
					providerdata.castMembers = castMembers;

					providerdata.label = label;
					providerdata.releasedate = releasedate;

					if (category == "music"){
						providerdata.providerType = const_amazon_music; 
						providerdata.category = category;
					}
					else if (category == "tv"){
						providerdata.providerType = const_amazon_tv; 
						providerdata.category = category;
					}
					else if(category == "games" || category == "consoles"){
						providerdata.providerType = const_amazon_games;
						providerdata.category = category;
					}
					else if(category == "movies"){
						providerdata.providerType = const_amazon_movies;
						providerdata.category = category;
					}
					else if(category == "books"){
						providerdata.providerType = const_amazon_books;
						providerdata.category = category;
					}
					else {
						providerdata.providerType = const_amazon_unknown;
						providerdata.category = "unknown";
					}		
					
					providerdata.publisher = publisher;
					providerdata.contentrating = contentrating;

					providerdata.boxshotURL = boxshotURL;
					providerdata.targeturl = amazonLink;
					providerdata.update(keyAMAZON[1]);

					var report = new Report();
					report.valueGoodrating = valueGoodAMAZONrating;
					report.colorGoodrating = colorGoodAMAZONrating;
					report.enableGoodrating = enableGoodAMAZONrating;
					report.valueBadrating = valueBadAMAZONrating;
					report.colorBadrating = colorBadAMAZONrating;
					report.enableBadrating = enableBadAMAZONrating;
					report.show (amazonBody, providerdata,false,keyAMAZON[1], gUID);
					
					loadBoxshotImage(boxshotURL, keyAMAZON[1], gUID);
				}
				else
				{
					var extrainfoTR = document.getElementById('TR'+gUID);
					if (recurssiveCounter > 0){
						extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
						sleep(0.1);
						if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
						getInfoAmazon(amazonBody, amazonLink, category, gUID, cacheEnabled, recurssiveCounter-1);
					}
					else {
						extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

						if (left(responseDetails.status,1) != "4"){
							var a_refreshReport = document.createElement("a");
							a_refreshReport.href = "javascript:void(null);";
							a_refreshReport.id = 'a_refreshReport'+gUID;
							a_refreshReport.innerHTML = "Reload data";
							a_refreshReport.addEventListener('click', function(){

								var currTDboxshot = document.getElementById('boxshot'+gUID);
								var currentColor = currTDboxshot.style.backgroundColor;

								var firstTD = document.createElement("td");
								firstTD.style.backgroundColor = currentColor;
								firstTD.colSpan = 2;
								firstTD.align = 'center';
								firstTD.id = 'boxshot'+gUID;
								
								var secondTD = document.createElement("td");
								secondTD.style.backgroundColor = currentColor;
								secondTD.colSpan = 4;
								
								var checkingImage = document.createElement("img");
								checkingImage.src = gettingInfo;
								checkingImage.alt = 'checking';
								
								while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
								
								firstTD.appendChild(checkingImage);
								extrainfoTR.appendChild(firstTD);
								extrainfoTR.appendChild(secondTD);

								getInfoAmazon(amazonBody, amazonLink, category, gUID, false, 0);

							}, false);
							
							var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
							server_unresponsive.appendChild(a_refreshReport);
						}
						
						showTitleIcons (amazonBody, category, gUID);
						insertSabnzbdIcon(amazonBody, gUID);
						insertFindonTheWebIcon(amazonBody, category, gUID);
						
					}
				}
			}
		});
	}
}

function getInfoGoogleMusic(googlemusicBody, googlemusicLink, category, gUID, cacheEnabled, recurssiveCounter){

	var keyGOOGLEMUSIC = googlemusicLink.match(googlemusicLinkRegex);

	if (objCache[keyGOOGLEMUSIC[1]] && cacheEnabled)
	{
		cache_references++;

		var providerdata = new providerData();
		providerdata.readCache(objCache[keyGOOGLEMUSIC[1]]);
		providerdata.update(keyGOOGLEMUSIC[1]);
		
		var report = new Report();
		report.valueGoodrating = valueGoodGOOGLEMUSICrating;
		report.colorGoodrating = colorGoodGOOGLEMUSICrating;
		report.enableGoodrating = enableGoodGOOGLEMUSICrating;
		report.valueBadrating = valueBadGOOGLEMUSICrating;
		report.colorBadrating = colorBadGOOGLEMUSICrating;
		report.enableBadrating = enableBadGOOGLEMUSICrating;
		report.show (googlemusicBody, providerdata,true,keyGOOGLEMUSIC[1], gUID);
	}
    else
	{
	   GM_xmlhttpRequest({
		  method: 'GET',
		  url: googlemusicLink,
		  headers: {'Referer': googlemusicLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
			{
				if (responseDetails.status == 200)
				{

					var ratingMatch = responseDetails.responseText.match(/showtimes-star-on.gif/g);
					var votesMatch = responseDetails.responseText.match(googlemusicVotesRegex);
					var releasedateMatch = responseDetails.responseText.match(googlemusicReleaseDateRegex);
					var boxshotMatch = responseDetails.responseText.match(googlemusicBoxshotRegex);

					
					if (ratingMatch){var rating = ratingMatch.length*2;}
					else{var rating = "N/A";}

					if (votesMatch){var votes = votesMatch[1];}
					else{var votes = "N/A";}

					if (releasedateMatch){var releasedate = releasedateMatch[1];}
					else{var releasedate = "N/A"}

					if (boxshotMatch != null) {var boxshotURL = boxshotMatch[1];}
					else {var boxshotURL = "";}

					var providerdata = new providerData();
					providerdata.category = category;
					providerdata.ratingInfo = rating;
					providerdata.votes = votes;
					providerdata.providerType = const_googlemusic;
					providerdata.releasedate = releasedate;
					providerdata.boxshotURL = boxshotURL;
					providerdata.targeturl = googlemusicLink;
					providerdata.update(keyGOOGLEMUSIC[1]);

					var report = new Report();
					report.valueGoodrating = valueGoodGOOGLEMUSICrating;
					report.colorGoodrating = colorGoodGOOGLEMUSICrating;
					report.enableGoodrating = enableGoodGOOGLEMUSICrating;
					report.valueBadrating = valueBadGOOGLEMUSICrating;
					report.colorBadrating = colorBadGOOGLEMUSICrating;
					report.enableBadrating = enableBadGOOGLEMUSICrating;
					report.show (googlemusicBody, providerdata,false,keyGOOGLEMUSIC[1], gUID);

					loadBoxshotImage(boxshotURL, keyGOOGLEMUSIC[1], gUID);
				}
				else
				{
					var extrainfoTR = document.getElementById('TR'+gUID);
					if (recurssiveCounter > 0){
						extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
						sleep(0.1);
						if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
						getInfoGoogleMusic(googlemusicBody, googlemusicLink, category, gUID, cacheEnabled, recurssiveCounter-1);
					}
					else {
						extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

						if (left(responseDetails.status,1) != "4"){
							var a_refreshReport = document.createElement("a");
							a_refreshReport.href = "javascript:void(null);";
							a_refreshReport.id = 'a_refreshReport'+gUID;
							a_refreshReport.innerHTML = "Reload data";
							a_refreshReport.addEventListener('click', function(){

								var currTDboxshot = document.getElementById('boxshot'+gUID);
								var currentColor = currTDboxshot.style.backgroundColor;

								var firstTD = document.createElement("td");
								firstTD.style.backgroundColor = currentColor;
								firstTD.colSpan = 2;
								firstTD.align = 'center';
								firstTD.id = 'boxshot'+gUID;
								
								var secondTD = document.createElement("td");
								secondTD.style.backgroundColor = currentColor;
								secondTD.colSpan = 4;
								
								var checkingImage = document.createElement("img");
								checkingImage.src = gettingInfo;
								checkingImage.alt = 'checking';
								
								while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
								
								firstTD.appendChild(checkingImage);
								extrainfoTR.appendChild(firstTD);
								extrainfoTR.appendChild(secondTD);

								getInfoGoogleMusic(googlemusicBody, googlemusicLink, category, gUID, false, 0);

							}, false);
							
							var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
							server_unresponsive.appendChild(a_refreshReport);
						}
						
						showTitleIcons (googlemusicBody, category, gUID);
						insertSabnzbdIcon(googlemusicBody, gUID);
						insertFindonTheWebIcon(googlemusicBody, category, gUID);
						
					}
				}
			}
		});	
	}
}	

function getInfoDiscogs(discogsBody, discogsLink, category, gUID, cacheEnabled, recurssiveCounter){
	var keyDISCOGS = discogsLink.match(discogsLinkRegex);

	if (objCache[keyDISCOGS[1]] && cacheEnabled)
	{
		cache_references++;

		var providerdata = new providerData();
		providerdata.readCache(objCache[keyDISCOGS[1]]);
		providerdata.update(keyDISCOGS[1]);
		
		var report = new Report();
		report.valueGoodrating = valueGoodDISCOGSrating;
		report.colorGoodrating = colorGoodDISCOGSrating;
		report.enableGoodrating = enableGoodDISCOGSrating;
		report.valueBadrating = valueBadDISCOGSrating;
		report.colorBadrating = colorBadDISCOGSrating;
		report.enableBadrating = enableBadDISCOGSrating;
		report.show (discogsBody, providerdata,true,keyDISCOGS[1], gUID);
	}
	else
	{
	   GM_xmlhttpRequest({
		  method: 'GET',
		  url: discogsLink,
		  headers: {'Referer': discogsLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
			{
				if (responseDetails.status == 200)
				{

					var ratingMatch = responseDetails.responseText.match(discogsRatingRegex);
					var labelMatch = responseDetails.responseText.match(discogsLabelRegex);
					var genreMatch = responseDetails.responseText.match(discogsGenreRegex);
					var releasedateMatch = responseDetails.responseText.match(discogsReleaseDateRegex);
					var boxshotMatch = responseDetails.responseText.match(discogsBoxshotRegex);
					
					if (ratingMatch){var rating = parseFloat(ratingMatch[1])*2;var votes = ratingMatch[2];}
					else{var rating = "N/A"; votes = "N/A";}

					if (labelMatch){var label = labelMatch[1];}
					else{var label = "N/A"}

					if (genreMatch){var genreInfo = genreMatch[1];}
					else{var genreInfo = "N/A"}

					if (releasedateMatch){var releasedate = releasedateMatch[1];}
					else{var releasedate = "N/A"}

					if (boxshotMatch != null) {var boxshotURL = boxshotMatch[1];}
					else {var boxshotURL = "";}

					var providerdata = new providerData();
					providerdata.category = category;
					providerdata.ratingInfo = rating;
					providerdata.votes = votes;
					providerdata.genreInfo = genreInfo;
					providerdata.providerType = const_discogs;
					providerdata.label = label;
					providerdata.releasedate = releasedate;
					providerdata.boxshotURL = boxshotURL;
					providerdata.targeturl = discogsLink;
					providerdata.update(keyDISCOGS[1]);

					var report = new Report();
					report.valueGoodrating = valueGoodDISCOGSrating;
					report.colorGoodrating = colorGoodDISCOGSrating;
					report.enableGoodrating = enableGoodDISCOGSrating;
					report.valueBadrating = valueBadDISCOGSrating;
					report.colorBadrating = colorBadDISCOGSrating;
					report.enableBadrating = enableBadDISCOGSrating;
					report.show (discogsBody, providerdata,false,keyDISCOGS[1], gUID);

					loadBoxshotImage(boxshotURL, keyDISCOGS[1], gUID);
				}
				else
				{
					var extrainfoTR = document.getElementById('TR'+gUID);
					if (recurssiveCounter > 0){
						extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
						sleep(0.1);
						if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
						getInfoDiscogs(discogsBody, discogsLink, category, gUID, cacheEnabled, recurssiveCounter-1);
					}
					else {
						extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

						if (left(responseDetails.status,1) != "4"){
							var a_refreshReport = document.createElement("a");
							a_refreshReport.href = "javascript:void(null);";
							a_refreshReport.id = 'a_refreshReport'+gUID;
							a_refreshReport.innerHTML = "Reload data";
							a_refreshReport.addEventListener('click', function(){

								var currTDboxshot = document.getElementById('boxshot'+gUID);
								var currentColor = currTDboxshot.style.backgroundColor;

								var firstTD = document.createElement("td");
								firstTD.style.backgroundColor = currentColor;
								firstTD.colSpan = 2;
								firstTD.align = 'center';
								firstTD.id = 'boxshot'+gUID;
								
								var secondTD = document.createElement("td");
								secondTD.style.backgroundColor = currentColor;
								secondTD.colSpan = 4;
								
								var checkingImage = document.createElement("img");
								checkingImage.src = gettingInfo;
								checkingImage.alt = 'checking';
								
								while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
								
								firstTD.appendChild(checkingImage);
								extrainfoTR.appendChild(firstTD);
								extrainfoTR.appendChild(secondTD);

								getInfoDiscogs(discogsBody, discogsLink, category, gUID, false, 0);

							}, false);
							
							var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
							server_unresponsive.appendChild(a_refreshReport);
						}
						
						showTitleIcons (discogsBody, category, gUID);
						insertSabnzbdIcon(discogsBody, gUID);
						insertFindonTheWebIcon(discogsBody, category, gUID);
						
					}
				}
			}
		});
	}
}

function getInfoCDuniverse(cduniverseBody, cduniverseLink, category, gUID, cacheEnabled, recurssiveCounter){

	var keyCDUNIVERSE = cduniverseLink.match(cduniverseLinkRegex);

	if (objCache[keyCDUNIVERSE[1]] && cacheEnabled)
	{
		cache_references++;

		var providerdata = new providerData();
		providerdata.readCache(objCache[keyCDUNIVERSE[1]]);
		providerdata.update(keyCDUNIVERSE[1]);
		
		var report = new Report();
		report.valueGoodrating = valueGoodCDUNIVERSErating;
		report.colorGoodrating = colorGoodCDUNIVERSErating;
		report.enableGoodrating = enableGoodCDUNIVERSErating;
		report.valueBadrating = valueBadCDUNIVERSErating;
		report.colorBadrating = colorBadCDUNIVERSErating;
		report.enableBadrating = enableBadCDUNIVERSErating;
		report.show (cduniverseBody, providerdata,true,keyCDUNIVERSE[1], gUID);
	}
	else
	{
	   GM_xmlhttpRequest({
		  method: 'GET',
		  url: cduniverseLink,
		  headers: {'Referer': cduniverseLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
			{
				if (responseDetails.status == 200)
				{

					var ratingMatch = responseDetails.responseText.match(cduniverseRatingRegex);
					var votesMatch = responseDetails.responseText.match(cduniverseVotesRegex);
					var labelMatch = responseDetails.responseText.match(cduniverseLabelRegex);
					var genreMatch = responseDetails.responseText.match(cduniverseGenreRegex);
					var releasedateMatch = responseDetails.responseText.match(cduniverseReleaseDateRegex);
					var boxshotMatch = responseDetails.responseText.match(cduniverseBoxshotRegex);

					if (ratingMatch){var rating = parseFloat(ratingMatch[1])*2;}
					else{var rating = "N/A";}

					if (votesMatch){var votes = votesMatch[1];}
					else{var votes = "N/A";}

					if (labelMatch){var label = labelMatch[1];}
					else{var label = "N/A"}

					if (genreMatch){var genreInfo = stripHTML(genreMatch[1]);}
					else{var genreInfo = "N/A"}

					if (releasedateMatch){var releasedate = releasedateMatch[1];}
					else{var releasedate = "N/A"}

					if (boxshotMatch != null) {var boxshotURL = boxshotMatch[0];}
					else {var boxshotURL = "";}

					var providerdata = new providerData();
					providerdata.category = category;
					providerdata.ratingInfo = rating;
					providerdata.votes = votes;
					providerdata.genreInfo = genreInfo;
					providerdata.providerType = const_cduniverse;
					providerdata.label = label;
					providerdata.releasedate = releasedate;
					providerdata.boxshotURL = boxshotURL;
					providerdata.targeturl = cduniverseLink;
					providerdata.update(keyCDUNIVERSE[1]);

					var report = new Report();

					report.valueGoodrating = valueGoodCDUNIVERSErating;
					report.colorGoodrating = colorGoodCDUNIVERSErating;
					report.enableGoodrating = enableGoodCDUNIVERSErating;
					report.valueBadrating = valueBadCDUNIVERSErating;
					report.colorBadrating = colorBadCDUNIVERSErating;
					report.enableBadrating = enableBadCDUNIVERSErating;
					report.show (cduniverseBody, providerdata,false,keyCDUNIVERSE[1], gUID);

					loadBoxshotImage(boxshotURL, keyCDUNIVERSE[1], gUID);
				}
				else
				{
					var extrainfoTR = document.getElementById('TR'+gUID);
					if (recurssiveCounter > 0){
						extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
						sleep(0.1);
						if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
						getInfoCDuniverse(cduniverseBody, cduniverseLink, category, gUID, cacheEnabled, recurssiveCounter-1);
					}
					else {
						extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

						if (left(responseDetails.status,1) != "4"){
							var a_refreshReport = document.createElement("a");
							a_refreshReport.href = "javascript:void(null);";
							a_refreshReport.id = 'a_refreshReport'+gUID;
							a_refreshReport.innerHTML = "Reload data";
							a_refreshReport.addEventListener('click', function(){

								var currTDboxshot = document.getElementById('boxshot'+gUID);
								var currentColor = currTDboxshot.style.backgroundColor;

								var firstTD = document.createElement("td");
								firstTD.style.backgroundColor = currentColor;
								firstTD.colSpan = 2;
								firstTD.align = 'center';
								firstTD.id = 'boxshot'+gUID;
								
								var secondTD = document.createElement("td");
								secondTD.style.backgroundColor = currentColor;
								secondTD.colSpan = 4;
								
								var checkingImage = document.createElement("img");
								checkingImage.src = gettingInfo;
								checkingImage.alt = 'checking';
								
								while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
								
								firstTD.appendChild(checkingImage);
								extrainfoTR.appendChild(firstTD);
								extrainfoTR.appendChild(secondTD);

								getInfoCDuniverse(cduniverseBody, cduniverseLink, category, gUID, false, 0);

							}, false);
							
							var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
							server_unresponsive.appendChild(a_refreshReport);
						}
						
						showTitleIcons (cduniverseBody, category, gUID);
						insertSabnzbdIcon(cduniverseBody, gUID);
						insertFindonTheWebIcon(cduniverseBody, category, gUID);
						
					}
				}
			}
		});
	}
}

function getInfoTVrage(tvrageBody, tvrageEpisodeLink, category, gUID, cacheEnabled, recurssiveCounter){

	var keyTVRAGE = tvrageEpisodeLink.match(tvrageLinkRegex1);
	if (!keyTVRAGE){var keyTVRAGE = tvrageEpisodeLink.match(tvrageLinkRegex2);}

	var key = keyTVRAGE[3];
	var tvrageLink = keyTVRAGE[1]+keyTVRAGE[4];

	if (objCache[key] && cacheEnabled)
	{
		cache_references++;

		var providerdata = new providerData();
		providerdata.readCache(objCache[key]);
		providerdata.update(key);
		
		var report = new Report();
		report.valueGoodrating = valueGoodTVRAGErating;
		report.colorGoodrating = colorGoodTVRAGErating;
		report.enableGoodrating = enableGoodTVRAGErating;
		report.valueBadrating = valueBadTVRAGErating;
		report.colorBadrating = colorBadTVRAGErating;
		report.enableBadrating = enableBadTVRAGErating;
		report.show (tvrageBody, providerdata,true,key, gUID);
	}
	else
	{
		GM_xmlhttpRequest({
		  method: 'GET',
		  url: tvrageLink,
		  headers: {'Referer': tvrageLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
			{
				if (responseDetails.status == 200)
				{
					var ratingMatch = responseDetails.responseText.match(tvrageRatingRegex);
					var descMatch = responseDetails.responseText.match(tvragedescRegex1);
					if (!descMatch) {descMatch = responseDetails.responseText.match(tvragedescRegex2);GM_log("ok");}
 					var genreMatch = responseDetails.responseText.match(tvragegenreRegex);
					var boxshotMatch = responseDetails.responseText.match(tvrageBoxshotRegex);
					
					

					if (ratingMatch){var rating = parseFloat(ratingMatch[1]); votes = ratingMatch[2];}
					else{var rating = "N/A"; votes = "N/A";}

					if (descMatch) {
						var description = descMatch[1];
						description = description.replace(/<[^>]+>/g, "");
						if (description.length > 500) {
							description = trim(description.substr(0, 500)) + "...";
						}
					}

					var genreInfo = "N/A";
					if(genreMatch){genreInfo = genreMatch[1];}

					if (boxshotMatch != null) {var boxshotURL = boxshotMatch[0];}
					else {var boxshotURL = "";}

					var providerdata = new providerData();
					providerdata.category = category;
					providerdata.ratingInfo = rating;
					providerdata.votes = votes;
					providerdata.description = description;
					providerdata.genreInfo = genreInfo;
					providerdata.boxshotURL = boxshotURL;
					providerdata.providerType = const_tvrage;
					providerdata.targeturl = tvrageEpisodeLink;
					providerdata.update(key);

					var report = new Report();
					report.valueGoodrating = valueGoodTVRAGErating;
					report.colorGoodrating = colorGoodTVRAGErating;
					report.enableGoodrating = enableGoodTVRAGErating;
					report.valueBadrating = valueBadTVRAGErating;
					report.colorBadrating = colorBadTVRAGErating;
					report.enableBadrating = enableBadTVRAGErating;
					report.show (tvrageBody, providerdata,false,key, gUID);

					loadBoxshotImage(boxshotURL, key, gUID);
					GetTVRAGEEpisodeSummary(tvrageEpisodeLink, key, gUID)
				}
				else
				{
					var extrainfoTR = document.getElementById('TR'+gUID);
					if (recurssiveCounter > 0){
						extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
						sleep(0.1);
						if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
						getInfoTVrage(tvrageBody, tvrageEpisodeLink, category, gUID, cacheEnabled, recurssiveCounter-1);
					}
					else {
						extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

						if (left(responseDetails.status,1) != "4"){
							var a_refreshReport = document.createElement("a");
							a_refreshReport.href = "javascript:void(null);";
							a_refreshReport.id = 'a_refreshReport'+gUID;
							a_refreshReport.innerHTML = "Reload data";
							a_refreshReport.addEventListener('click', function(){

								var currTDboxshot = document.getElementById('boxshot'+gUID);
								var currentColor = currTDboxshot.style.backgroundColor;

								var firstTD = document.createElement("td");
								firstTD.style.backgroundColor = currentColor;
								firstTD.colSpan = 2;
								firstTD.align = 'center';
								firstTD.id = 'boxshot'+gUID;
								
								var secondTD = document.createElement("td");
								secondTD.style.backgroundColor = currentColor;
								secondTD.colSpan = 4;
								
								var checkingImage = document.createElement("img");
								checkingImage.src = gettingInfo;
								checkingImage.alt = 'checking';
								
								while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
								
								firstTD.appendChild(checkingImage);
								extrainfoTR.appendChild(firstTD);
								extrainfoTR.appendChild(secondTD);

								getInfoTVrage(tvrageBody, tvrageEpisodeLink, category, gUID, false, 0);

							}, false);
							
							var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
							server_unresponsive.appendChild(a_refreshReport);
						}
						
						showTitleIcons (tvrageBody, category, gUID);
						insertSabnzbdIcon(tvrageBody, gUID);
						insertFindonTheWebIcon(tvrageBody, category, gUID);
						
					}
				}
			}
		});
	}
}

function getInfoANIDB(anidbBody, anidbLink, category, gUID, cacheEnabled, recurssiveCounter){

	var keyANIDB = anidbLink.match(anidbIDRegex1);
	if (!keyANIDB){var keyANIDB = anidbLink.match(anidbIDRegex2);}

	if (objCache[keyANIDB[1]] && cacheEnabled)
	{
		cache_references++;
		
		var providerdata = new providerData();
		providerdata.readCache(objCache[keyANIDB[1]]);
		providerdata.update(keyANIDB[1]);
		
		var report = new Report();
		report.valueGoodrating = valueGoodANIDBrating;
		report.colorGoodrating = colorGoodANIDBrating;
		report.enableGoodrating = enableGoodANIDBrating;
		report.valueBadrating = valueBadANIDBrating;
		report.colorBadrating = colorBadANIDBrating;
		report.enableBadrating = enableBadANIDBrating;
		report.show (anidbBody, providerdata,true,keyANIDB[1], gUID);
	}
	else
	{
		GM_xmlhttpRequest({
		  method: 'GET',
		  url: anidbLink,
		  headers: {'Referer': anidbLink, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
			  {
				if (responseDetails.status == 200)
				{
					var providerdata = new providerData();

					var ratingMatch = responseDetails.responseText.match(anidbRatingRegex);
					var descMatch = responseDetails.responseText.match(anidbdescRegex);

					var genreMatch = responseDetails.responseText.match(anidbgenreRegex);
					
					var releasedateMatch = responseDetails.responseText.match(anidbReleaseDateRegex);
					var boxshotMatch = responseDetails.responseText.match(anidbBoxshotRegex);

					if (ratingMatch){var rating = parseFloat(ratingMatch[1]); var votes = ratingMatch[2];}
					else{var rating = "N/A"; votes = "N/A";}

					var description = "N/A";
					if (descMatch)
					{
						description = stripHTML(descMatch[1]);
						if (description.length > 500) {
							description = trim(description.substr(0, 500)) + "...";
						}
					}

					if (genreMatch){var genreInfo = stripHTML(genreMatch[1]).replace("- similar","");}
					else{var genreInfo = "N/A"}

					if (releasedateMatch){var releasedate = releasedateMatch[1];}
					else{var releasedate = "N/A"}

					if (boxshotMatch != null) {var boxshotURL = boxshotMatch[0];}
					else {var boxshotURL = "";}

					providerdata.category = category;

					providerdata.providerType = const_anidb;
					providerdata.ratingInfo = rating;
					providerdata.votes = votes;
					providerdata.description = description;
					providerdata.genreInfo = genreInfo;
					providerdata.releasedate = releasedate;
					providerdata.boxshotURL = boxshotURL;
					providerdata.targeturl = anidbLink;
					providerdata.update(keyANIDB[1]);

					var report = new Report();
					report.valueGoodrating = valueGoodANIDBrating;
					report.colorGoodrating = colorGoodANIDBrating;
					report.enableGoodrating = enableGoodANIDBrating;
					report.valueBadrating = valueBadANIDBrating;
					report.colorBadrating = colorBadANIDBrating;
					report.enableBadrating = enableBadANIDBrating;
					report.show (anidbBody, providerdata,false,keyANIDB[1], gUID);

					loadBoxshotImage(boxshotURL, keyANIDB[1], gUID);
				}
				else
				{
					var extrainfoTR = document.getElementById('TR'+gUID);
					if (recurssiveCounter > 0){
						extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
						sleep(0.1);
						if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
						getInfoANIDB(anidbBody, anidbLink, category, gUID, cacheEnabled, recurssiveCounter-1);
					}
					else {
						extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

						if (left(responseDetails.status,1) != "4"){
							var a_refreshReport = document.createElement("a");
							a_refreshReport.href = "javascript:void(null);";
							a_refreshReport.id = 'a_refreshReport'+gUID;
							a_refreshReport.innerHTML = "Reload data";
							a_refreshReport.addEventListener('click', function(){

								var currTDboxshot = document.getElementById('boxshot'+gUID);
								var currentColor = currTDboxshot.style.backgroundColor;

								var firstTD = document.createElement("td");
								firstTD.style.backgroundColor = currentColor;
								firstTD.colSpan = 2;
								firstTD.align = 'center';
								firstTD.id = 'boxshot'+gUID;
								
								var secondTD = document.createElement("td");
								secondTD.style.backgroundColor = currentColor;
								secondTD.colSpan = 4;
								
								var checkingImage = document.createElement("img");
								checkingImage.src = gettingInfo;
								checkingImage.alt = 'checking';
								
								while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
								
								firstTD.appendChild(checkingImage);
								extrainfoTR.appendChild(firstTD);
								extrainfoTR.appendChild(secondTD);

								 getInfoANIDB(anidbBody, anidbLink, category, gUID, false, 0);

							}, false);
							
							var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
							server_unresponsive.appendChild(a_refreshReport);
						}
						
						showTitleIcons (anidbBody, category, gUID);
						insertSabnzbdIcon(anidbBody, gUID);
						insertFindonTheWebIcon(anidbBody, category, gUID);
						
					}
				}
			}
	   });
	}
}

function getInfoZDNET(zdnetBody, zdnetLink, category, gUID, cacheEnabled, recurssiveCounter){

	var reportTitle = zdnetBody.innerHTML.match(newzBinTitleRegex);
	var arrSearchString = cleanSearchString(reportTitle[2]);
	var searchString = arrSearchString[1];

	var searchstringMatch = searchString.match(zdnetStripSearchStringRegex);
	if (searchstringMatch){searchString = trim(searchstringMatch[1]);}
	
	var keyZDNET = searchString.replace(/\s/g,'_');

	if (objCache[keyZDNET] && cacheEnabled)
	{
		cache_references++;

		var providerdata = new providerData();
		providerdata.readCache(objCache[keyZDNET]);
		providerdata.update(keyZDNET);
		
		var report = new Report();
		report.show (zdnetBody, providerdata,true,keyZDNET, gUID);
	}
	else
	{
		zdnetLinkComplete = zdnetLink + searchString;

		GM_xmlhttpRequest({
		  method: 'GET',
		  url: zdnetLinkComplete,
		  headers: {'Referer': zdnetLinkComplete, 'Accept': 'application/atom+xml,application/xml,text/xml', 'User-agent': 'Mozilla/4.0 (compatible)'},
		  onload: function (responseDetails)
			  {
				if (responseDetails.status == 200)
				{

					var descMatch = responseDetails.responseText.match(zdnetdescRegex);
					var abstractMatch = responseDetails.responseText.match(zdnetabstractRegex);
					var genreMatch = responseDetails.responseText.match(zdnetgenreRegex);
					var releasedateMatch = responseDetails.responseText.match(zdnetreleasedateRegex);
					var developerMatch = responseDetails.responseText.match(zdnetdeveloperRegex);

					
					var description = "N/A";
					if (descMatch){description = stripHTML(trim(descMatch[1])) + " | <a target=\"_blank\" href=\"http://downloads.zdnet.com"+abstractMatch[1]+"\">more</a>";}

					var genreInfo = "N/A";
					if (genreMatch){genreInfo = stripHTML(genreMatch[1]);}
					
					var releasedate = "N/A";
					if (releasedateMatch){releasedate = releasedateMatch[1];}

					var developer = "N/A";
					if(developerMatch){developer = developerMatch[1];}

					var providerdata = new providerData();
					providerdata.category = category;
					providerdata.providerType = const_zdnet;
					providerdata.description = description;
					providerdata.genreInfo = genreInfo;
					providerdata.releasedate = releasedate;
					providerdata.developer = developer;
					providerdata.targeturl = zdnetLink;
					providerdata.boxshotURL = "";
					providerdata.update(keyZDNET);

					var report = new Report();
					report.show (zdnetBody, providerdata,false,keyZDNET, gUID);

					loadBoxshotImage("", keyZDNET, gUID);

				}
				else
				{
					var extrainfoTR = document.getElementById('TR'+gUID);
					if (recurssiveCounter > 0){
						extrainfoTR.innerHTML = "<td colspan='2'></td><td align='right'><img src='"+reloadingData+"' title='reloading data' /></td><td colspan='3'>Problem to retrieve data. Retrying "+recurssiveCounter+" times</td>";
						sleep(0.1);
						if(left(responseDetails.status,1) == "4"){recurssiveCounter=1;}
						getInfoZDNET(zdnetBody, zdnetLink, category, gUID, cacheEnabled, recurssiveCounter-1);
					}
					else {
						extrainfoTR.innerHTML = "<td colspan='2' id='boxshot"+gUID+"'></td><td align='right'><img width='15px' src='"+generalError+"' title='Problem to retrieve data' /></td><td id='server_unresponsive"+gUID+"' colspan='3'>Failed to retrieve data. <small>(error code "+responseDetails.status+")</small> </td>";

						if (left(responseDetails.status,1) != "4"){
							var a_refreshReport = document.createElement("a");
							a_refreshReport.href = "javascript:void(null);";
							a_refreshReport.id = 'a_refreshReport'+gUID;
							a_refreshReport.innerHTML = "Reload data";
							a_refreshReport.addEventListener('click', function(){

								var currTDboxshot = document.getElementById('boxshot'+gUID);
								var currentColor = currTDboxshot.style.backgroundColor;

								var firstTD = document.createElement("td");
								firstTD.style.backgroundColor = currentColor;
								firstTD.colSpan = 2;
								firstTD.align = 'center';
								firstTD.id = 'boxshot'+gUID;
								
								var secondTD = document.createElement("td");
								secondTD.style.backgroundColor = currentColor;
								secondTD.colSpan = 4;
								
								var checkingImage = document.createElement("img");
								checkingImage.src = gettingInfo;
								checkingImage.alt = 'checking';
								
								while (extrainfoTR.hasChildNodes()){extrainfoTR.removeChild(extrainfoTR.firstChild);}
								
								firstTD.appendChild(checkingImage);
								extrainfoTR.appendChild(firstTD);
								extrainfoTR.appendChild(secondTD);

								getInfoZDNET(zdnetBody, zdnetLink, category, gUID, false, 0);

							}, false);
							
							var server_unresponsive = document.getElementById("server_unresponsive"+gUID);
							server_unresponsive.appendChild(a_refreshReport);
						}
						
						showTitleIcons (zdnetBody, category, gUID);
						insertSabnzbdIcon(zdnetBody, gUID);
						insertFindonTheWebIcon(zdnetBody, category, gUID);
						
					}
				}
			}
	   });
	}
}

//----- INIT

// Setup cacheobject
var start = new Date().getTime();
var objCache = eval(GM_getValue("objCache")) || {};
var end = new Date().getTime();
var decodingTime = end - start;

//Events
window.addEventListener("unload", function() {

	var total = 0;
	//var deleted = 0;
	var now = new Date().getTime();

	for (var key in objCache) {
		if (!objCache[key]) {
			alert("Inconsistent cache state! Cache has to be purged.");
			GM_setValue("objCache", "");
			return;
		}
	
		var timestamp = parseInt(objCache[key].substr(0, 13));
		if (timestamp + CACHE_EXPIRE < now) {
			delete objCache[key];
			cache_items_deleted++;
		}
		total++;
	}

	if (total > CACHE_LEN) {
		// remove first n entries
		var n = total - CACHE_LEN;
		var i = 0;
		for (var key in objCache) {
			if (i < n) {
				delete objCache[key];
				cache_items_deleted++;
			}
			i++;
		}
	}

 	//----- Set Cache
	GM_setValue("objCache", objCache.toSource());
	//----- Set total deleted items
	GM_setValue("cache_items_deleted", cache_items_deleted);
	//----- Ser total cache references
	GM_setValue("cache_references", cache_references);

}, false);

window.addEventListener('scroll', function(){
	if (lightBoxEnabled){
		document.getElementById('lightBox').style.display='none';
		document.getElementById('fadeBox').style.display='none';						
	}
}, false);
 
// Show helper menu as part of the mainenu	
ShowHelperMenu();
ShowStatusBar();

addPopupWindow(strIMDBsettings,'IMDBSettingsPopup','okIMDBsettings','cancelIMDBsettings');
addPopupWindow(strGAMESPOTsettings,'GAMESPOTSettingsPopup','okGAMESPOTsettings','cancelGAMESPOTsettings');
addPopupWindow(strALLMUSICsettings,'ALLMUSICSettingsPopup','okALLMUSICsettings','cancelALLMUSICsettings');
addPopupWindow(strCACHEInformation,'CACHEInformationPopup','closeCACHEInformation',null);
addPopupWindow(strCachedContent,'CACHEDContentPopup','closeCACHEDContent',null);
addPopupWindow(strSabnzbdSetting,'SABNZBDSettingsPopup','okSABNZBDsettings','cancelSABNZBDsettings');
addPopupWindow(strIGNsettings,'IGNSettingsPopup','okIGNsettings','cancelIGNsettings');
addPopupWindow(strAMAZONsettings,'AMAZONSettingsPopup','okAMAZONsettings','cancelAMAZONsettings');
addPopupWindow(strGOOGLEMUSICsettings,'GOOGLEMUSICSettingsPopup','okGOOGLEMUSICsettings','cancelGOOGLEMUSICsettings');
addPopupWindow(strDISCOGSsettings,'DISCOGSSettingsPopup','okDISCOGSsettings','cancelDISCOGSsettings');
addPopupWindow(strCDUNIVERSEsettings,'CDUNIVERSESettingsPopup','okCDUNIVERSEsettings','cancelCDUNIVERSEsettings');
addPopupWindow(strTVRAGEsettings,'TVRAGESettingsPopup','okTVRAGEsettings','cancelTVRAGEsettings');
addPopupWindow(strScriptUpdate,'ScriptUpdatePopup','okScriptUpdate','cancelScriptUpdate');
addPopupWindow(strANIDBsettings,'ANIDBSettingsPopup','okANIDBsettings','cancelANIDBsettings');
addPopupWindow(strFindOnTheWeb,'FindOnTheWebSettingsPopup','okFindOnTheWebsettings','cancelFindOnTheWebsettings');

initColorPicker();


//----- MAIN LOOP

checkAnidbLoggedIn();

var thSize = document.evaluate("//html//body//div[3]//form//table//thead//tr//th[2]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);	
if (thSize.snapshotItem(0) != null){thSize.snapshotItem(0).style.width='150px';}

for (var i = 0; i < reports.snapshotLength; i++)
{
	var gUID = guid();
	var reportBody = reports.snapshotItem(i);
	var strCheckingInfo = "<tr id='TR"+gUID+"'><td colspan='2' align='center'><img src='"+gettingInfo+"' alt='checking' /></td><td  colspan='4'></td></tr>";

	var reportCategory = reportBody.innerHTML.match(newzBinReportCategoryRegex);
	if (reportCategory != null){
	
		var linkMatch = false;
		
		var imdbLink = reportBody.innerHTML.match(imdbLinkRegex);
		if (imdbLink){
			reportBody.innerHTML += strCheckingInfo;
			getInfoIMDB(reportBody, imdbLink[0].toString(), reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
			}

		var gamespotLink = reportBody.innerHTML.match(gamespotLinkRegex);
		if (gamespotLink){
			reportBody.innerHTML += strCheckingInfo;
			getInfoGamespot(reportBody, gamespotLink[0].toString(), reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
			}

		var allmusicLink = reportBody.innerHTML.match(allmusicLinkRegex);
		if (allmusicLink){
			reportBody.innerHTML += strCheckingInfo;
			getInfoAllMusic(reportBody, allmusicLink[0].toString().replace(/&amp;/g,'&'), reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
			}
			
		var ignLink = reportBody.innerHTML.match(ignLinkRegex);
		if (ignLink){
			reportBody.innerHTML += strCheckingInfo;
			getInfoIGN(reportBody, ignLink[0].toString(), reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
			}

		var amazonLink = reportBody.innerHTML.match(amazonLinkRegex);
		if (amazonLink){
			reportBody.innerHTML += strCheckingInfo;
			getInfoAmazon(reportBody, amazonLink[0].toString(), reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
		}
		
		var googlemusicLink = reportBody.innerHTML.match(googlemusicLinkRegex);
		if (googlemusicLink){
			reportBody.innerHTML += strCheckingInfo;
			getInfoGoogleMusic(reportBody, googlemusicLink[0].toString(), reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
			}

		var discogsLink = reportBody.innerHTML.match(discogsLinkRegex);
		if (discogsLink){
			reportBody.innerHTML += strCheckingInfo;
			getInfoDiscogs(reportBody, discogsLink[0].toString(), reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
			}

		var cduniverseLink = reportBody.innerHTML.match(cduniverseLinkRegex);
		if (cduniverseLink){
			reportBody.innerHTML += strCheckingInfo;
			getInfoCDuniverse(reportBody, cduniverseLink[0].toString(), reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
			}
		
		var tvrageLink = reportBody.innerHTML.match(tvrageLinkRegex1);
		if (!tvrageLink){var tvrageLink = reportBody.innerHTML.match(tvrageLinkRegex2);}
		if (tvrageLink){
			reportBody.innerHTML += strCheckingInfo;
			getInfoTVrage(reportBody, tvrageLink[0].toString(), reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
			}
		
		var anidbLink = reportBody.innerHTML.match(anidbLinkRegex1);
		if (!anidbLink){anidbLink = reportBody.innerHTML.match(anidbLinkRegex2);}
		if (anidbLink){
			reportBody.innerHTML += strCheckingInfo;
			getInfoANIDB(reportBody, anidbLink[0].toString().replace(/&amp;/g,'&'), reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
			}

		if (reportCategory[1] == "apps" && linkMatch == false){
			reportBody.innerHTML += strCheckingInfo;
			getInfoZDNET(reportBody, 'http://downloads.zdnet.com/search.aspx?q=', reportCategory[1], gUID, CACHEEnable, maxNumberRetriesReloadData);
			linkMatch = true;
		}
		
		if (linkMatch == false){
			showTitleIcons (reportBody, reportCategory[1], gUID);
			insertSabnzbdIcon(reportBody, gUID);
			insertFindonTheWebIcon(reportBody, reportCategory[1], gUID);
			
		}
	}
}
initLightBox();
initFindOntTheWebBox();
SavedSearchesFirst();
checkVersionScript();

