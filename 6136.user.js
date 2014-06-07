// ==UserScript==
// @name         Try This Search On
// @author       Vaughan Chandler
// @namespace    http://userscripts.org/people/14536
// @description  Provides useful links to search engines based on the page that you're viewing or the search that you're performing.
// @include      *
// ==/UserScript==

// Last updated 2009-01-13

(function() {

// Frames should not get search bars
if (top!=self) { return; }

//
// USER CONFIGURABLE VARIABLES
//

// Should the referrer be checked?
var checkRef = false;

// Should amazon links contain affilate IDs?
var affiliateLinks = true;

// Set this to true if you are using a high resolution or wide screen, the script will try to make better use of the available space
// 0 = force low resolution, 1 = force high resolution, 2 = automatic (default)
var highres = 2;

// Should we strip 'keywords'? For example, if searching for "Music by Green Day" should the script give you links to search for just "Green Day"
var stripKeywords = true;

//
// END OF USER CONFIGURABLE VARIABLES !!!
//

//
// NON-USER-CONFIGURATION VARIABLES
//

// Timestamp of the last version release, used to check for new versions and to determine if to overwrite scriptvals
// javascript: var d = new Date(); window.alert(d.getTime());
var version_timestamp = 1231894315873;

// Are we using a widescreen or a monitor with a high resolution?
var widescreen = false;
switch(highres) {
	case 1: widescreen = true; break;
	case 2: widescreen = screen.width>1024;
}

// How many characters of the query should be shown in front of the search engine links?
var maxchars = widescreen ? 25 : 15;

// Force certain sites to use specific variables
spec='alexa.com:q;'+
	'answers.com:s;'+
	'baidu:wd;'+
	'bbc.co.uk:q;'+
	'bestbuy.com:st;'+
	'break.com:s;'+
	'digg.com:s;'+
	'fark.com:qq;'+
	'geizhals.at:fs;'+
	'isohunt.com:ihq;'+
	'jinx.com:name;'+
	'megavideo.com:s;'+
	'metacritic.com:ts;'+
	'msnbc.msn.com:q;'+
	'newegg.com:description;'+
	'newscorp.com:keys;'+
	'newsgarbage.com:ss;'+
	'real.com:music_search_q;'+
	'rockyou.com:s_tsearch;'+
	'search.ebay.com:satitle;'+
	'search.org:yider;'+
	'sitelogic.co.uk:s;'+
	'slide.com:qry;'+
	'sourceforge.net:words;'+
	'thinkgeek.com:t;'+
	'torrentreactor.net:words;';
specs=spec.split(';')

// Exclude sites
excludes=/^https?:\/\/(portableapps\.com\/search\/node|mail\.google\.com\/.*)$/;

// The engines themselves - the "special" engines are based on these and are defined in makeBar()
var engines = {
	// Bit Torrent
	'btjunkie'			: new engine('btjunkie','','http://btjunkie.org/search?q=%s'),
	'demonoid'			: new engine('Demonoid','','http://www.demonoid.com/files/?query=%s'),
	'isohunt'			: new engine('isoHunt','','http://isohunt.com/torrents/?ihq=%s'),
	'mininova'			: new engine('Mininova','','http://www.mininova.org/search/?search=%s'),
	'seedpeer'			: new engine('Seedpeer','','http://www.seedpeer.com/search.php?search=%s'),
	'thepiratebay'		: new engine('The Pirate Bay','','http://thepiratebay.org/search/%s/'),
	'torrentbox'		: new engine('TorrentBox','','http://torrentbox.com/torrents-search.php?search=%s'),
	'torrentreactor'	: new engine('TorrentReactor','','http://www.torrentreactor.net/search.php?words=%s'),
	'torrentz'			: new engine('Torrentz','','http://www.torrentz.com/search?q=%s'),
	// General
	'askweb'			: new engine('Ask','','http://www.ask.com/web?q=%s'),
	'dmoz'				: new engine('dmoz','','http://search.dmoz.org/cgi-bin/search?search=%s'),
	'googleweb'			: new engine('Google','','http://www.google.com/search?q=%s'),
	'liveweb'			: new engine('Live','','http://search.live.com/results.aspx?q=%s'),
	'yahooweb'			: new engine('Yahoo','','http://search.yahoo.com/search?p=%s'),
	'wikipedia'			: new engine('Wikipedia','','http://en.wikipedia.org/wiki/Special:Search?search=%s'),
	// Images
	'askimages'			: new engine('IMG','Ask Images','http://images.ask.com/pictures?q=%s'),
	'devilfinder'		: new engine('DevilFinder','','http://images.devilfinder.com/go.php?q=%s'),
	'flickr'			: new engine('Flickr','','http://www.flickr.com/search/?q=%s'),
	'googleimages'		: new engine('IMG','Google Images','http://images.google.com/images?q=%s'),
	'liveimages'		: new engine('IMG','Live Images','http://search.live.com/images/results.aspx?q=%s'),
	'photobucket'		: new engine('Photobucket','','http://photobucket.com/images/%s/'),
	'yahooimages'		: new engine('IMG','Yahoo Images','http://images.search.yahoo.com/search/images?p=%s'),
	// Movies
	'fandango'			: new engine('Fandango','','http://www.fandango.com/GlobalSearch.aspx?tab=Movies+Theaters+Video&q=%s&repos=Movies'),
	'flixster'			: new engine('Flixster','','http://www.flixster.com/movies.do?movieAction=doMovieSearch&search=%s'),
	'imdb'				: new engine('IMDB','','http://www.imdb.com/find?s=all&q=%s'),
	'rottentomatoes'	: new engine('Rotten Tomatoes','','http://www.rottentomatoes.com/search/full_search.php?search=%s'),
	'yahoomovies'		: new engine('Yahoo Movies','','http://movies.yahoo.com/mv/search?p=%s'),
	// Music
	'aolmusic'			: new engine('AOL Music','','http://search.music.aol.com/search/%s'),
	'lastfm'			: new engine('Last.fm','','http://www.last.fm/music?m=all&q=%s'),
	'realmusic'			: new engine('Real','','http://europe.real.com/music/search/?music_search_qt=artist&music_search_q=%s'),
	'yahoomusic'		: new engine('Yahoo Music','','http://search.music.yahoo.com/search/?p=%s'),
	// News
	'asknews'			: new engine('NEWS','Ask News','http://news.ask.com/news?q=%s'),
	'bbc'				: new engine('BBC','','http://search.bbc.co.uk/cgi-bin/search/results.pl?q=%s&go.x=0&go.y=0&go=go&edition=i'),
	'cbc'				: new engine('CBC','','http://search.cbc.ca/search?ie=UTF-8&site=CBC&output=xml_no_dtd&client=CBC&lr=&getfields=description&proxystylesheet=CBC&oe=UTF-8&searchWeb=cbc&q=%s'),
	'cnn'				: new engine('CNN','','http://search.cnn.com/search.jsp?query=%s'),
	'foxnews'			: new engine('Fox News','','http://search2.foxnews.com/search?ie=UTF-8&oe=UTF-8&client=my_frontend&proxystylesheet=my_frontend&output=xml_no_dtd&site=story&getfields=*&filter=0&sort=date%3AD%3AS%3Ad1&q=%s&qstr=&realm=fnc&random='),
	'googlenews'		: new engine('NEWS','Google News','http://news.google.com/news?q=%s'),
	'livenews'			: new engine('NEWS','Live News','http://search.live.com/news/results.aspx?q=%s'),
	'msnbc'				: new engine('MSNBC','','http://www.msnbc.msn.com/?search=MSNBC&q=%s&submit=Search&id=11881780&FORM=AE&os=0&gs=1&p=1'),
	'slashdot'			: new engine('Slashdot','','http://slashdot.org/search.pl?query=%s'),
	'yahoonews'			: new engine('NEWS','Yahoo News','http://news.search.yahoo.com/search/news?p=%s'),
	// Shopping
	'amazoncom'			: new engine('Amazon.com','','http://www.amazon.com/gp/search?ie=UTF8&amp;keywords=%s'+(affiliateLinks?'&amp;tag=firemanbiff-20':'')+'&amp;index=blended&amp;linkCode=ur2&amp;camp=1789&amp;creative=9325'),
	'amazonca'			: new engine('CA','Amazon.ca','http://www.amazon.ca/gp/search?ie=UTF8&amp;keywords=%s'+(affiliateLinks?'&amp;tag=biffslyricsar-20':'')+'&amp;index=blended&amp;linkCode=ur2&amp;camp=15121&amp;creative=330641'),
	'amazonuk'			: new engine('UK','Amazon.co.uk','http://www.amazon.co.uk/gp/search?ie=UTF8&amp;keywords=%s'+(affiliateLinks?'&amp;tag=biffslyricsar-21':'')+'&amp;index=blended&amp;linkCode=ur2&amp;camp=1634&amp;creative=6738'),
	'ebay'				: new engine('eBay','','http://search.ebay.com/search/search.dll?satitle=%s'),
	'googleproducts'	: new engine('PROD','Google Products','http://www.google.com/products?q=%s'),
	'yahooshopping'		: new engine('Yahoo Shopping','','http://shopping.yahoo.com/search?p=%s'),
	// Tech Shopping
	'newegg'			: new engine('Newegg','','http://www.newegg.com/Product/ProductList.aspx?Submit=ENE&DEPA=0&Description=%s'),
	'thinkgeek'			: new engine('ThinkGeek','','http://www.thinkgeek.com/brain/whereisit.cgi?t=%s'),
	'tigerdirect'		: new engine('TigerDirect','','http://www.tigerdirect.com/applications/SearchTools/search.asp?keywords=%s'),
	// Videos
	'break'				: new engine('Break','','http://my.break.com/Content/Search/Search.aspx?s=%s&SearchType=Main'),
	'dailymotion'		: new engine('DailyMotion','','http://www.dailymotion.com/relevance/search/%s'),
	'googlevideos'		: new engine('VID','Google Videos','http://video.google.com/videosearch?q=%s'),
	'justintv'			: new engine('Justin.tv','','http://www.justin.tv/search?q=%s'),
	'livevideos'		: new engine('VID','Live Videos','http://search.live.com/video/results.aspx?q=%s'),
	'megavideo'			: new engine('Megavideo','','http://www.megavideo.com/?c=search&s=%s'),
	'metacafe'			: new engine('Metacafe','','http://www.metacafe.com/tags/%s/'),
	'yahoovideos'		: new engine('VID','Yahoo Videos','http://video.search.yahoo.com/search/video?p=%s'),
	'youtube'			: new engine('YouTube','','http://www.youtube.com/results?search_query=%s')
}

// Define regexes for determining search types
var torrentSites =			/^https?:\/\/([^\/]*(btjunkie|mininova|thepiratebay)\.org\/|[^\/]*(demonoid|isohunt|seedpeer)\.com\/|[^\/]*(isohunt)\.net\/|.*torrent.*)/i;
var torrentQueries =		/(\b|%20)(bit-?)?torr?ents?\b/i;
var videoSites =			/^https?:\/\/(videos?\.|[^\/]*(break|dailymotion|ifilm|metacafe|spike|youtube)\.com\/|[^\/]*justin\.tv\/|.*video\.com|.*\/videos?[\/\.])/i;
var videoQueries =			/(\b|%20)(vid(eo)?s?|avi|mpe?g)((\b.|%20)of)?\b/i;
var imageSites =			/^https?:\/\/((image|photo)s?\.|[^\/]*(flickr|photobucket|rockyou|slide)\.com\/|[^\/]*(commons.wikimedia)\.org\/|[^\/]*imdb\.com\/gallery\/|.*\/(image|pic(ture)?|photo)s?[\/\.])/i;
var imageQueries =			/(\b|%20)(images?|pic(ture)?s?|photos?|jpe?g|png|gif)((\b.|%20)of)?\b/i;
var newsSites =				/^https?:\/\/(news\.|[^\/]*(cnn|foxnews|msnbc\.msn)\.com\/|[^\/]*(slashdot)\.org\/|[^\/]*(bbc)\.co\.uk\/|[^\/]*(cbc)\.ca\/|.*\/news[\/\.])/i;
var newsQueries =			/(\b|%20)news((\b.|%20)about)?\b/i;
var movieSites =			/^https?:\/\/((film|movie)s?\.|[^\/]*movie\.|[^\/]*(fandango|flixster|imdb|rottentomatoes)\.com\/|.*\/(film|movie)s?[\/\.])/i;
var movieQueries =			/(\b|%20)(film|movie)s? ?((\b.|%20)(starring|with))?\b/i;
var musicSites =			/^https?:\/\/([^\/]*(last.fm)\/|((search\.)?music|songs?|tunes?)\.|[^\/]*(music|mp3s?)\.|[^\/]*(rhapsody|ubl)\.com\/|.*\/(music|songs?|tunes?)[\/\.\?])/i;
var musicQueries =			/(\b|%20)(music|songs?|tunes?|mp3s?|vorbis)((\b.|%20)(by|of))?\b/i;
var shoppingSites =			/^https?:\/\/((shop(ping)?|store|buy|purchase)\.|[^\/]*(ebay|jinx)\.com\/|[^\/]*amazon\.c(om|a|o\.uk)\/|[^\/]*geizhals\.at\/|[^\/]*google\.[^\/]+\/products\?|.*\/(shop(ping)?|store|buy|purchase)[\/\.])/i;
var shoppingQueries =		/(\b|%20)(shop(ping)?|store|buy|purchase)\b/i;
var techShoppingSites =		/^https?:\/\/[^\/]*(bestbuy|circuitcity|newegg|thinkgeek|tigerdirect)\.com\//i;
//var techShoppingQueries =	/(\b|%20)\b/i; // No ideas about what to put here yet...

//
// HELPER FUNCTIONS
//

String.prototype.trim = function() { return this.replace(/^(\s|%20)*|(\s|%20)*$/g, ''); }

String.prototype.plusToSpace = function(chars) { return this.replace(/\+/g, ' '); }

String.prototype.minusToSpace = function(chars) { return this.replace(/-/g, ' '); }

function $(id) { return document.getElementById(id); }

function show(id) {  $(id).style.display = 'inline'; }

function hide(id) {  $(id).style.display = 'none'; }

function swap(id) { $(id).style.display = document.defaultView.getComputedStyle($(id), null).getPropertyValue('display')=='none' ? 'inline' : 'none'; }

//
// CLASS(ES)
//

//
// THE ENGINE CLASS USED TO DEFINE THE SEARCH ENGINES AND TO BUILD LINKS
//
function engine(sname,name,address) {
	this.sname = sname;
	this.name = name=='' ? sname : name;
	this.address = address;
	this.completeLink = function() {
		return '<a href="'+address.replace('%s',q)+'" title="Search '+this.name+' for: '+getTitleQ()+'" style="text-decoration:none ! important;"><span class="TTSOShort" style="font:bold 10px arial ! important; color:#003366 ! important;">'+this.sname+'</span><span class="TTSOLong" style="font:bold 12px arial ! important; color:#003366 ! important;">'+this.name+'</span></a>';
	}
}

//
// MAIN FUNCTIONS
//

//
// FIGURE OUT WHAT WE'RE SEARCHING FOR BASED ON THE GLOBAL VARIABLE "url"
//
function getQ() {

	if (url.match(excludes)) { return ''; }

	var q='';
	var params;
	var domain
	if (url.indexOf('?')!=-1) {
		params = url.split('?')[1].split('&');
		domain = url.toLowerCase().split('/')[2];
		if (domain.match(/^(.*\.)?yahoo\./)) { for (var i=0; i<params.length; i++) { if (params[i].split('=')[0].toLowerCase()=='p') { q=params[i].split('=')[1]; break; } } }
		for (var i=0; i<specs.length; i++) { if (domain.indexOf(specs[i].split(':')[0])!=-1) { for (var j=0; j<params.length; j++) { if (params[j].split('=')[0].toLowerCase()==specs[i].split(':')[1]) { q=params[j].split('=')[1]; break; } } break; } }
	}
	if (q=='') {
		if ((m = url.match(/\/(wiki)\/([^\/#\?]*)/i)) && url.toLowerCase().indexOf(':search?')==-1) {
			if (m[2].indexOf(':')!=-1) {
				buf = m[2].split(':');
				type = buf[0].toLowerCase();
				if (type=='talk') { q=buf[1].replace(/_/g,' '); }
				else { q = ''; }
			} else {
				if (m[2].toLowerCase()!='main_page') { q=m[2].replace(/_/g,' '); }
			}
		}
		else if (m = url.match(/\/(moin)\/([^\/]*)\/?/i)) { q=m[2].replace(/([A-Z])/g,' $1'); }
		else if (m = url.match(/answers\.com\/(topic\/)?([^\/\?]+)/i)) { q=m[2].minusToSpace(); }
		else if (m = url.match(/a9\.com\/([^\?]+)/)) { q=m[1]; }
		else if (m = url.match(/del\.icio\.us\/(tag|popular)\/([^\/#\?]+)/)) { q=m[2]; }
		else if (m = url.match(/photobucket\.com\/(images|videos)\/([^\/#\?]+)/)) { q=m[2]; }
		else if (m = url.match(/stumbleupon\.com\/tag\/([^\/#\?]+)/)) { q=m[1].minusToSpace(); }
		else if (m = url.match(/flixster\.com\/(movie|actor)\/([^\/#\?]+)/)) { q=m[2].minusToSpace(); }
		else if (m = url.match(/(last.fm|lastfm\.[a-z]{2,3})\/(.+\/)?music\/([^\+][^\/#\?]+)\/([^\+][^\/#\?]+|_)\/([^\+][^\/#\?]+)/)) { q=m[5]; } // Track
		else if (m = url.match(/(last.fm|lastfm\.[a-z]{2,3})\/(.+\/)?music\/([^\+][^\/#\?]+)\/([^\+][^\/#\?]+)/)) { q=m[4]; } // Album
		else if (m = url.match(/(last.fm|lastfm\.[a-z]{2,3})\/(.+\/)?music\/([^\+][^\/#\?]+)/)) { q=m[3]; } // Artist
		else if (m = url.match(/(last.fm|lastfm\.[a-z]{2,3})\/.*\btag=([^&]*)/)) { q=m[2]; } // Tags
		else if (m = url.match(/dailymotion\.com\/.*\/search\/([^\/]*)/)) { q=decodeURIComponent(m[1]); }
		else if (m = url.match(/vimeo\.com\/.*\/search:([^\/#\?]+)/)) { q=m[1]; }
		else if (m = url.match(/seedpeer\.com\/search\/([^\.\/#\?]+)/)) { q=m[1].minusToSpace(); }
		else if (m = url.match(/imdb\.com\/(gallery|name|title|media)/)) {
			q = escape(document.title.replace(/ - .+$/,'').replace(/\((\d\d\d\d|[IVX]*)\).*$/,'').replace(/^(All )?Photos (of|from)\s/,'').replace(/\sPhotos$/,'').replace(/^"|"\s*$/g,''));
			if (q.toLowerCase().indexOf('imdb')!=-1 || q.toLowerCase().indexOf('wireimage.com')!=-1) { q=''; }
		}
		else if (url.match(/billboard\.com\/bbcom\/bio\/index\.jsp\?pid=/)) { q = document.title.split(' - ')[2]; } // Artist
		else if (url.match(/billboard\.com\/bbcom\/discography\/index\.jsp\?aid=/)) { q = document.title.split(' - ')[3]; } // Album
		else if (m = url.match(/all(music|movie|game)\.com\/cg\/a[gmv]g.dll/)) { if (m = document.title.match(/^all(music|movie|game) \(\(\(([^>\[]+)/)) { q=m[2]; } }
		if (q=='') {
			if (url.indexOf('?')!=-1) {
				for (var i=0; i<params.length; i++) { if (m = params[i].match(/^(q(uery|t)?|search_?(terms?|string|query)?|(field-)?keywords?|terms?|as_q)=(.*)$/i)) { q=m[5]; break; } }
			}
			else if (m = url.match(/\/(keywords|search(\/node)?|tags?)\/([^\/#\?]+)/)) { q=m[3]; }
		}
	}
	if (m = q.match(/(.*)\.(html?|php\d?)$/)) { q=m[1]; }
	return q.trim();
}

//
// RETURN THE SEARCH QUERY IN A FORMAT SUITABLE FOR USE IN TITLE ATTRIBUTES
//
function getTitleQ() { return decodeURIComponent(q.plusToSpace()).trim().replace(/"/g,'&quot;'); }

//
// RETURN THE SEARCH QUERY IN A FORMAT SUITABLE FOR DISPLAYING AND POSSIBLY TRUNCATED
//
function getDisplayQ() {
	var buffer = decodeURIComponent(q.plusToSpace()).trim();
	if (buffer.length>maxchars+1) { return buffer.substring(0,maxchars).trim() + '<span style="font-weight:normal ! important; font-size:9px ! important;">...</span>';	}
	return buffer;
}

//
// CREATE A HUMAN-READABLE LIST OF IDS FOR ALL BUILT-IN SEARCH ENGINES
//
function listEngines() {
	var list = Array();
	for (var id in engines) { list.push(id); }
	return list.sort().join(', ');
}

//
// GET LINK CODE FOR THE SPECIFIED SEARCH ENGINE (AS ANCHOR ELEMENTS NOT RAW URLS. CUSTOM ENGINES OVERRIDE BUILT-IN ENGINES)
//
function getLink(id) {
	var regex = new RegExp(" ~ " + id + ", ([^~]+), ([^~]+) ~ ");
	if (m = regex.exec(customEngines)) {
		var e = new engine(m[1],'',m[2]);
		return e.completeLink();
	}
	if (engines[id]) { return engines[id].completeLink(); }
	return '';
}

//
// SHORTCUT FOR MAKING LINKS TO SEARCH ENGINES WITH MULTIPLE SEARCH TYPES
//
function makeMultiEngine(eng) {
	var e = eng.split(',');
	var code = getLink(e[0]) + ' <span class="TTSOSup" style="font-size:10px ! important; color:#666666 ! important; vertical-align:top ! important; font-weight:normal ! important;">(';
	for (var i=1; i<e.length; i++) {
		code = code + getLink(e[i]) + (i<e.length-1 ? ' | ' : '');
	}
	return code + ')</span>';
}

//
// CREATE THE CODE WITH LINKS TO THE SEARCH ENGINES
//
function makeBar(s, q) {
	s = s.replace(/__([^_]+)__/g, (widescreen ? '_$1_' : '')).replace(/\s+/g, ' ');
	s = '<span class="TTSOLink">' + s.replace(/_(\)?) _/g,'_$1</span> <span class="TTSOLink">_') + '</span>';
	for (var i=0, buf=s.split('_'), s=''; i<buf.length; i++) {
		if (i%2==0) { s = s + buf[i]; }
		else {
			switch (buf[i]) {
				case 'amazon': s = s + makeMultiEngine('amazoncom,amazonca,amazonuk'); break;
				case 'ask': s = s + makeMultiEngine('askweb,askimages,asknews'); break;
				case 'google': s = s + makeMultiEngine('googleweb,googleimages,googlenews,googlevideos'); break;
				case 'live': s = s + makeMultiEngine('liveweb,liveimages,livenews,livevideos'); break;
				case 'yahoo': s = s + makeMultiEngine('yahooweb,yahooimages,yahoonews,yahoovideos'); break;
				default: s = s + getLink(buf[i]);
			}
		}
	}
	return s;
}

//
// WRITE DEFAULT SETTINGS AS SCRIPTVALS (ABOUT:CONFIG)
//
function writeDefaults() {
	GM_setValue('format-general', '_amazon_ _ask_ _google_ _live_ __thepiratebay__ _yahoo_ _youtube_ _wikipedia_');
	GM_setValue('format-torrent', '_btjunkie_ _demonoid_ _isohunt_ _mininova_ _seedpeer_ _thepiratebay_ _torrentbox_ _torrentreactor_ _torrentz_');
	GM_setValue('format-video', '_amazon_ _break_ _dailymotion_ _justintv_ _googlevideos_ _livevideos_ _megavideo_ _metacafe_ _yahoovideos_ _youtube_');
	GM_setValue('format-image', '_amazon_ _askimages_ _devilfinder_ _flickr_ _googleimages_ _liveimages_ _photobucket_ _yahooimages_');
	GM_setValue('format-news', '_asknews_ _bbc_ _cbc_ _cnn_ _foxnews_ _googlenews_ _livenews_ _msnbc_ _slashdot_ _yahoonews_');
	GM_setValue('format-movie', '_amazon_ _fandango_ _flixster_ _imdb_ _rottentomatoes_ _yahoomovies_');
	GM_setValue('format-music', '_amazon_ _aolmusic_ _lastfm_ _realmusic_ _yahoomusic_');
	GM_setValue('format-shopping', '_amazon_ _ebay_ _googleproducts_ _yahooshopping_');
	GM_setValue('format-tech-shopping', '_amazon_ _newegg_ _thinkgeek_ _tigerdirect_');
	GM_setValue('custom-engines', ' ~ google100, Google 100, http://www.google.com/search?hl=en&q=%s&num=100 ~ ');
	GM_setValue('version-timestamp', version_timestamp+'');
	GM_setValue('restore-defaults', false);
	GM_setValue('position', 'bottom');
}

//
// CHECK FOR UPDATES (originally based on code by Jarett - http://userscripts.org/users/38602)
//
function TTSOUpdateCheck(forced) {if((forced)||(parseInt(GM_getValue("last-update", "0")) + 86400000 <= (new Date().getTime()))) {try {GM_xmlhttpRequest({method: "GET",url: "http://userscripts.org/scripts/review/6136?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(xhrResponse) {GM_setValue("last-update", new Date().getTime() + ""); var rt = xhrResponse.responseText.replace(/&nbsp;?/gm, " ").replace(/<li>/gm, "\n").replace(/<[^>]*>/gm, ""); if (parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(rt)[1]) > version_timestamp) {if (confirm("There is an update available for Try This Search On\nWould you like to go to the install page now?")) {GM_openInTab("http://userscripts.org/scripts/show/6136");} } else if (forced) {alert("No update is available for Try This Search On.");}}});} catch (err) {if (forced) {alert("An error occurred while checking for updates:\n" + err);}}}}


//
// GENERAL CODE
//

// Try to figure out the search query, possibly check the referring URL
// If there's no query, there's no point going any further, now is there?
var url = location.href;
var q = getQ();
if (q=='' &&  checkRef) {
	url = document.referrer;
	q = getQ();
}
if (q=='') { return; }

// See if we need to write the default vaules to script vals
// This should happen on initial install, after updates, or on request
if (GM_getValue('restore-defaults', false) || GM_getValue('version-timestamp',0) < version_timestamp) { writeDefaults(); }
var customEngines = GM_getValue('custom-engines','');

// Determine if we can show links to search engines more relevant to the search type
var searchFormat = '';
if (url.match(torrentSites) || q.match(torrentQueries)) {
	if (stripKeywords) { q2=q.replace(torrentQueries,''); }
	searchFormat=GM_getValue('format-torrent');
} else if (url.match(videoSites) || q.match(videoQueries)) {
	if (stripKeywords) { q2=q.replace(videoQueries,''); }
	searchFormat=GM_getValue('format-video');
} else if (url.match(imageSites) || q.match(imageQueries)) {
	if (stripKeywords) { q2=q.replace(imageQueries,''); }
	searchFormat=GM_getValue('format-image');
} else if (url.match(newsSites) || q.match(newsQueries)) {
	if (stripKeywords) { q2=q.replace(newsQueries,''); }
	searchFormat=GM_getValue('format-news');
} else if (url.match(movieSites) || q.match(movieQueries)) {
	if (stripKeywords) { q2=q.replace(movieQueries,''); }
	searchFormat=GM_getValue('format-movie');
} else if (url.match(musicSites) || q.match(musicQueries)) {
	if (stripKeywords) { q2=q.replace(musicQueries,''); }
	searchFormat=GM_getValue('format-music');
} else if (url.match(shoppingSites) || q.match(shoppingQueries)) {
	if (stripKeywords) { q2=q.replace(shoppingQueries,''); }
	searchFormat=GM_getValue('format-shopping');
} else if (url.match(techShoppingSites)) { q2=q; searchFormat=GM_getValue('format-tech-shopping'); }

// Get the code for the search engine links
if (searchFormat != '') {
	var qBuffer;
	if (stripKeywords) { qBuffer = q; q = q2.replace(/\+$/,'').trim(); }
	searchCode = '<span id="TTSOContext" style=""> Find <span title="' + getTitleQ() + '">\"' + getDisplayQ() + '\"</span> on: ' + makeBar(searchFormat, q)+'</span>';
	if (stripKeywords) { q = qBuffer; }
	searchCode = searchCode  + '<span id="TTSOGeneral" style="display:none;"> Find <span title="' + getTitleQ() + '">\"' + getDisplayQ() + '\"</span> on: ' + makeBar(GM_getValue('format-general'),q) + '</span><a id="TTSOSwap">swap</a>';
}
else { searchCode = ' Find <span title="' + getTitleQ() + '">\"' + getDisplayQ() + '\"</span> on: ' + makeBar(GM_getValue('format-general'), q); }

// Add styles (most are defined here but some are defined inline to force their use)
style=''+
	(GM_getValue('position')=='top' ?
		'body { padding-top:25px; } #TTSOBar { border-bottom:1px solid #666666; position:absolute; top:0; bottom:auto; }'
	:
		'body { padding-bottom:25px; } #TTSOBar { border-top:1px solid #666666; position:fixed; top:auto; bottom:0; }'
	)+
	'#TTSOBar { left:0; right:0; color:#000000; padding:2px; background:#cccccc; z-index:99999; opacity:0.95; margin:0; vertical-align:bottom; text-align:left; } '+
	'#TTSOBar, #TTSOBar #TTSOContext, #TTSOBar #TTSOGeneral, #TTSOBar #TTSOContext span, #TTSOBar #TTSOGeneral span { color:black; font:bold 12px arial; }'+
	'#TTSOBar a { overflow:hidden; cursor:pointer; }'+
	'#TTSOBar a:hover { text-decoration:underline; color:#003399; background:#cccccc; }'+
	'#TTSOBar .TTSOLink { padding:0 3px; }'+
	'#TTSOBar .TTSOLink .TTSOShort { display:none; }'+
	'#TTSOBar .TTSOLink .TTSOSup, #TTSOBar .TTSOLink .TTSOSup a { font-size:10px; }'+
	'#TTSOBar .TTSOLink .TTSOSup .TTSOShort { display:inline; }'+
	'#TTSOBar .TTSOLink .TTSOSup .TTSOLong { display:none; }'+
	'#TTSOBar #TTSOClose, #TTSOBar #TTSOSwap, #TTSOBar #TTSOConfig { color:red; background:#cccccc; position:absolute; bottom:2px; padding:1px; }'+
	'#TTSOBar #TTSOClose:hover, #TTSOBar #TTSOSwap:hover, #TTSOBar #TTSOConfig:hover { color:red; text-decoration:none; }'+
	'#TTSOBar #TTSOClose { right:2px; }'+
	'#TTSOBar #TTSOConfig { right:15px; }'+
	'#TTSOBar #TTSOSwap { right:27px; }'+
	'#TTSOConfigDiv { padding:10px; margin:10px; background:white; color:black; text-align:left; font:normal 14px arial; border:3px double #666666; position:absolute; top:0; left:0; right:0; z-index:9999999; }'+
	'#TTSOConfigDiv table { border:none; }'+
	'#TTSOConfigDiv a { text-decoration:none; color:blue; background:white; font:normal 14px arial; }'+
	'#TTSOConfigDiv input, #TTSOConfigDiv #TTSO-custom-engines { font:normal 14px arial; color:black; background:white; }'+
	'#TTSOConfigDiv input.text, #TTSOConfigDiv #TTSO-custom-engines { width:' + (widescreen ? '700' : '500') + 'px; }'+
	'#TTSOConfigDiv #TTSO-custom-engines { height:100px; }'+
	'#TTSOConfigDiv td { border:none; padding:1px; color:black; background:white; text-align:right; font:normal 14px arial; }'
	;
GM_addStyle(style.replace(/;/g, ' ! important;'));

// Create search bar and add it to the page
var d = document.createElement('div');
d.id='TTSOBar';
d.style.font='bold 12px arial';
d.innerHTML = searchCode + '<a id="TTSOConfig">?</a> <a id="TTSOClose">x</a>';
document.body.appendChild(d);

// Create configuration popup and add it to the page
var config = document.createElement('div');
config.id = 'TTSOConfigDiv';
config.style.display = 'none';
config.innerHTML = '<b>Try This Search On</b> - Configuration<br /><br />'+
					'The values in the text boxes below determine which search engines are linked to from the search bar. Search engines are identified by surrounding their ID with underscores (eg _wikipedia_). There are also a few "Special" search engines - for example, _google_ adds links to do web, image, news, and video searches. You can also define your own custom search engines below by putting the id, name and url separated by a comma then a space. Each custom search engine must start on a new line.<br /><br />'+
					'For a list of IDs for built-in engines <a href="#" onclick="var engList = window.open(\'\',\'name\',\'width=500,height=400,scrollbars=yes\'); engList.document.write(\'<b>Built-in Engines</b>:<br /><br />' + listEngines() + '<br /><br /><b>Special Engines</b>:<br /><br />amazon, ask, google, live, yahoo\'); return false;">click here</a>, or visit the <a href="http://userscripts.org/scripts/show/6136" target="blank">UserScripts.org page for this script</a> to get more detailed insructions.<br /><br />'+
					'<table>'+
					'<tr><td>General Search:</td><td><input type="text" class="text" id="TTSO-format-general" value="' + GM_getValue('format-general') + '" /></td></tr>'+
					'<tr><td>Image Search:</td><td><input type="text" class="text" id="TTSO-format-image" value="' + GM_getValue('format-image') + '" /></td></tr>'+
					'<tr><td>Movies Search:</td><td><input type="text" class="text" id="TTSO-format-movies" value="' + GM_getValue('format-movie') + '" /></td></tr>'+
					'<tr><td>Music Search:</td><td><input type="text" class="text" id="TTSO-format-music" value="' + GM_getValue('format-music') + '" /></td></tr>'+
					'<tr><td>News Search:</td><td><input type="text" class="text" id="TTSO-format-news" value="' + GM_getValue('format-news') + '" /></td></tr>'+
					'<tr><td>Shopping Search:</td><td><input type="text" class="text" id="TTSO-format-shopping" value="' + GM_getValue('format-shopping') + '" /></td></tr>'+
					'<tr><td>Tech Shopping Search:</td><td><input type="text" class="text" id="TTSO-format-tech-shopping" value="' + GM_getValue('format-tech-shopping') + '" /></td></tr>'+
					'<tr><td>Torrent Search:</td><td><input type="text" class="text" id="TTSO-format-torrent" value="' + GM_getValue('format-torrent') + '" /></td></tr>'+
					'<tr><td>Video Search:</td><td><input type="text" class="text" id="TTSO-format-video" value="' + GM_getValue('format-video') + '" /></td></tr>'+
					'<tr><td>Custom Engines:</td><td><textarea id="TTSO-custom-engines">' + GM_getValue('custom-engines').replace(/ ~ /g,'\n') + '</textarea></td></tr>'+
					'<tr><td>Bar Position:</td><td style="text-align:left ! important;"><select id="TTSO-position"><option value="top">Top</option><option value="bottom">Bottom</option></select></td></tr>'+
					'</table>'+
					'<br /><input type="button" id="TTSOSaveConfig" value="Save" /> <input type="button" id="TTSORestoreDefaults" value="Restore Defaults" /> <input type="button" id="TTSOUpdateCheck" value="Check for Updates" /> <input type="button" id="TTSOCloseConfig" value="Close" />';
document.body.insertBefore(config, document.body.firstChild);
$('TTSO-position').value = GM_getValue('position', 'bottom');

//
// ADD LISTENERS
//

// Swap between general and context search engine links
if (searchFormat != '') { 
	$('TTSOBar').addEventListener('mouseover', function(e) {
		if (e.shiftKey) {
			hide('TTSOContext');
			show('TTSOGeneral');
		} else if (e.altKey) {
			show('TTSOContext');
			hide('TTSOGeneral');
		}
	}, false);
	$('TTSOSwap').addEventListener('click', function(e) {
		swap('TTSOContext');
		swap('TTSOGeneral');
	}, false);
}

// Close the search bar
$('TTSOClose').addEventListener('click', function(e) { hide("TTSOBar"); }, false);

// Show/hide the configuration popup
$('TTSOConfig').addEventListener('click', function(e) {
	swap("TTSOConfigDiv");
	window.scroll(0,0);
}, false);

// Close configuration popup
$('TTSOCloseConfig').addEventListener('click', function(e) { hide('TTSOConfigDiv'); }, false);

// Manual check for updates
$('TTSOUpdateCheck').addEventListener('click', function(e) { TTSOUpdateCheck(true); }, false);

// Restore default search engines settings (scriptsvals)
$('TTSORestoreDefaults').addEventListener('click', function(e) {
	if (window.confirm('Are you sure you want to restore all the default settings?\nYou will lose any customizations you have made.')) {
		GM_setValue('restore-defaults', true);
		window.alert('All options will be set to default values on your next search.');
	}
}, false);

// Save configuration changes
$('TTSOSaveConfig').addEventListener('click', function(e) {
	var inputs = $('TTSOConfigDiv').getElementsByTagName('input');
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].type!='text') { continue; }
		GM_setValue(inputs[i].id.replace(/TTSO-/,''), inputs[i].value);
	}
	GM_setValue('custom-engines', ' ~ ' + $('TTSO-custom-engines').value.replace(/^\s+|\s+$/g,'').replace(/\r*\n\r*/g,' ~ ') + ' ~ ');
	GM_setValue('position', $('TTSO-position').options[$('TTSO-position').selectedIndex].value);
	window.alert('Configuration saved');
}, false);

//
// MISC CODE
//

// Check for updates if 24 hours has passed since the last check
TTSOUpdateCheck(false);

}) ();
