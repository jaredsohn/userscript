// ==UserScript==
// @name          OiNKPlus
// @author        Indieana AKA interonaut, indieana@mailpuppy.com  
// @namespace     http://www.myspace.com/interonaut
// @description   Enables easy artist discovery by adding similar artists, tags, short bio and last.fm & Myspace player to torrent details pages.
// @include       *waffles.fm/details.php*
// @include       *88.80.6.249/details.php*
// @include       *what.cd/torrents.php?id*
// @include       *what.cd/artist.php?id*
// @include       *tracker.beathau5.com/torrents.php?id*
// @include       *tracker.beathau5.com/artist.php?id*
// @include       *libble.com/torrents.php?id*
// @include       *libble.com/artist.php?id*
// @include       *208.89.219.120/torrents.php?id*
// @include       *208.89.219.120/artist.php?id*
// @include       *funkytorrents.com/details.php*
// @include       *213.248.54.223/details.php*
// @include       *mininova.org/tor/*
// @include       *87.233.147.140/tor/*
// @include       *thepiratebay.org/torrent/*
// @include       *83.140.176.146/tor/*
// @include       *scenetorrents.org/details.php*
// @include       *85.17.40.165/details.php*
// @include       *scenesound.org/details.php*
// @include       *85.24.152.69/details.php*
// @include       *kraytracker.com/?cls=5&id=*
// @include       *64.34.39.105/?cls=5&id=*
// @include       *arenabg.com/details.php?id=*
// @include       *85.14.6.83/details.php?id=*
// @include       *metal.iplay.ro/details.php?id=*
// @include       *84.247.80.243/details.php?id=*
// @include       *christiantorrents.com/details.php*
// @include       *85.11.33.12/details.php*
// @include       *tracker.vipv2.org/details.php*
// @include       *194.145.250.133/details.php*
// @include       *exodusmusic.org/details.php*
// @include       *111.111.111.111/details.php*
// @include       *indietorrents*/details.php*
// @include       *66.129.1.42/details.php*
// @include	  *www.torrentz.com/*
// @include	  *213.239.140.13/*
// @include 	  *ac-d-l-u-ge.org.uk/details.php*
// @include 	  *85.17.65.16/details.php*
// @include	  *rockbox.psychocydd.co.uk/details.php*
// @include	  *87.233.179.169/details.php*
// @include 	  *music-vid.com/details.php*


// @date          2011/08/04
// @version       23
// @since         2007/04/25
// ==/UserScript==
// 
// ------------------------------------------------------------------------
// Copyright (c) 2007-2008, indieana  AKA interonaut, indieana@mailpuppy.com
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//			- TODO add: related albums 
//			- TODO fix: better artist recognition on TPB,Mininova and Torrentz
//			- TODO add: DeepBassNine, MetaCritic support
// CHANGELOG

// REMEMBER TO UPDATE VERSION NUMBER VAR :)
//
// 23	2011/11/23	-	Sepulcrum: Fixed parsing songs from myspace page.
// 22	2011/08/05	-	Sepulcrum: Changed myspace search results parsing to use the first result that contains the search term in the myspace page title rather than the first result on the page
//						Sepulcrum: Display the found artist and link to the myspace profile that the songs were extracted from
// 21   2011/08/04  - newstarshipsmell: Removed shellife.eu/67.228.39.196 from the inclusion list (shellife site update broke the script long ago; they have their own site-specific OiNKPlus fork now.)
//                    Updated favicons for MySpace, Hypem, Shellife and Libble
//                    Changed searchlinks for AllMusic (old google:site string was broken, replaced with regular artist search), What.CD (artists.php instead of torrents.php), Waffles.fm (sorts results by year descending), and Shellife.eu (exact matches only.)
//                    Added external links for Facebook (only searches Music Pages, i.e. won't return Groups for older/inactive bands), BandCamp (onsite search is just a google:site+"query" string, same here), and MusicBrainz (artist search.)
// 20	  2011/07/21	- Sepulcrum: Exclude myspace charts tracks 
// 19	  2011/07/15	- gondaba: 	 Got MySpace functionality back by adding the tracks as links that can be played/paused on click
//						- Sepulcrum: Changed to get the songs from the artists Songs page so we get them all
// 18	  2011/04/06	- Sepulcrum: Fixed parsing myspace results page
//									 Commented out lastfm player code as it hasn't worked in a long time
//									 Removed metalbits and stmusic links
//									 Added external links for Grooveshark and Soundcloud
//								 	 Updated update-notifier link so there should now be update notifications
//									 Chrome: Use localstorage instead of cookes for GM_getValue, GM_setValue functions
// 17	  2011/02/25 	- Sepulcrum: Changed the myspace player scraper to just pull the div tag for bandMusicPlayer and inject that into the page rather than extracting the flashvars and using the swf hosted on naptoon
//
// 16	  2011/01/11  	- Sepulcrum: Fixed not finding artist page correctly from results
//
// 15	  2010/11/22  	- Sepulcrum: Changed myspace search url to search music artists rather than the whole of myspace
//
// 14	  2010/11/16  	- Sepulcrum: Fixed myspace player support
//						  Sepulcrum: Changed to use myspace search instead of google as google keeps focing us to use captchas every now and then
//
// 13	  2010/04/16  	- add: support for music-vid.com (Sepulcrum)
//                      - change: Removed ScT (R.I.P.) 
//                      - fix: replaced what.cd artist search (it's it's now ID based) with torrent search
// 12	  2009/01/28	- fix: MySpace player fix, thanks gondaba for the fix
// 11	  2008/09/30	- fix: yet another MySpace player fix (these guys change their player code like panties)
//			- add: site support for Rockbox, Shellife/MBT and Acid-Lounge
// 10	  2008/09/19	- fix: MySpace player broken
// 9	  2008/09/03	- change: tidied up layout
//			- change: switched to new last.fm api	 
//			- add: What.cd SSL support
//			- change: Use exact artist search where possible
// 8 	  2008/06/13  	- fix: indietorrents.com domain recognition
//			- add: OiNKPlus shown on artist pages on What.cd
//			- add: what.cd https browsing
//			- add: support for torrentz
//			- fix: OiNKPlus shown above comments on What
//			- fix: OiNKPlus shown above artist info on TPB
// 7 	  2008/04/16	- fix: phrase quotes on The Pirate Bay 
//			- add: Gazelle support
//			- fix: fixed Google search since MySpace player wouldn't show in rare cases 
// 6	  2008/03/21
//			- add: support for indietorrents, metalbits finally
//			- fix: ct support
//			- fix: MySpace player working again
//			- change: read more abstract is now shown inline instead of external page
//			- fix: load similar will now not reload present artist information
// 4	  2008/02/06
//			Same as 3.02, considered stabe now
// 3.0.2  2008/01/21 New site support
//			- add: support for SceneTorrents, SoftMp3.org, KrayTracker, arenabg.com, MetalTorrents, TheMusik.org, WLM, vipv2.org
//			- fix: Improved MySpace google search query
//			- fix: oinkplus not showing up on unrcognzied artists
//			- change: update ip addresses of several trackers, welcome to sweden!
//			- change: TPB allows phrase search
//			- change: new categories on waffles
//			- fix: extreme lag caused by caching, caching disabled now
//			- change: More on these sites
//			- add: external link to PureVolume
//			- change: shorten external links names
//			- fix: search query on waffles changed
//			- fix: what.cd suppport, what.cd details page structure changed
//			- change: removed prototype framework at cost of ugly code
// 3.0.1  2007/11/20 small bugfix
//			- fix: what.cd site layout changed			
// 3  2007/11/08 	Second beta, the HyDrA Release
//			- add: support for various sites including Waffles.fm, What.cd, Stmusic.org, Libble.com, ThePirateBay.org, Mininova.org and FunkyTorrents.com
//			- add: search bar to lookup artist with Oinkplus
//			- add: new browsing capabilities by navigating deep into similar artists (browsing history)
//			- add: new external links to Hypemachine, SeeqPod, RIAA Radar and Pandora
// 			- fix: avoid sending referer for flash content and artist logo
// 							Thanks and credits to Drew McLellan for Flash Satay and Marcus Granado for binary XHR [http://mgran.blogspot.com]
//			- fix: speed up by not loading unneccessary images and objects in fetched html,intepret code as plain text instead	
//			- fix: remove script tags or embedded stuff in abstracts, less ressource consuming and better security
//			- fix: small toggle icons are now hard-coded base64 encoded data streams
//			- fix: abstracts now showing up again
//			- fix: don't show Oinkplus in Apps etc.
//			- fix: smaller bugfixes and code improvements	
// 2	2007/06/03	Beta test ended, first stable version
//				minor bugfixes, added display toggle
//				added more external links
// 1	2007/04/25	Original version - beta
//
// This script is for use with several torrent trackers
// It adds information to torrent details pages.
// ------------------------------------------------------------------------
//
// FEATURES
// - data from last.fm
// 	similar artists, 
// 	tags, 
// 	short bio, 
// 	preview player
// 
// - data from Myspace.com
// 	preview player 
// 
// - links to external ressources
// 	last.fm, myspace, imeem, foxytunes, allmusic, wikipedia, discogs, google, amazon and others
// 	
// ------------------------------------------------------------------------
// 
// IMPORTANT NOTICE
// The script does not and will not do automatic searches on the site it runs on, 
// because it is very harmful to the site's performance. If you had the 
// great idea of implementing such a feature you are STRONGLY advised not to do so.
// OiNKPlus is not related to the supported sites in any way. Use at own risk.
// Some functions were created by the Platypus extension.
// The script may frequently break, therefore it will automatically check for updated 
// versions every now and then.
// The author does not claim the code to be elegant. 
// Ok? Fine.
// Suggestions, feedback and contributions welcome.
//
//
// FUTURE DEVELOPMENT
// If you would like to see this script to work with another site not supported yet,
// like another public or private tracker, get in contact with me (indieana@mailpuppy.com), 
// I will gladly port it to that site. Please remind, that I need to be invited, if 
// the site is private, though.
// Please refrain from simple tinkering to make it work with other sites, in case you 
// don't want to seriously maintain the script. This rushing ahead attitude has shown to 
// result in a lot of confusion among users and unsupported or even buggy code in the past.
// On the other hand, the GPL license gives you all the freedom, for example if you seriously want
// to improve the script. Please let me know, I would love that and I'm curious!
//
//
// CREDITS
// * My greatest respect goes to oinkylicious Alan, for selflessly driving the amazing
// community that OiNK was. His excellent vision and talent of leadership have impressed
// and motivated me eversince I have been a proud member of the site. It was for his
// generous front paging to get the word about Oinkplus spread and opening it up to
// a broader audience.
// * Many thanks go also out to the fellow OiNKers, that provided suggestions, bug fixes,
// spread the word or even went as far as porting the script to other browsers. Thanks go to
// Eighty, ar33ome3, )deckstream(, evilman, lhnz, the_e_male among all the other dedicated users
// that found very nice words and placed themselves in a 1000 replies O+ thread :)
// * Thanks to the codemonkeys, that open up their code, especially those,
// that code/libraries the script makes use of. The is remarked in the code. 
// * Love is sent out to the wonderful people over at Last.fm that provide the excellent, reliable
// webservice, this script relies on. Sign up for their great subscription service!
// * At last lovely greetings to everyone supporting the hydra!
//
// Enough pathos,
// have fun!
//
// ------------------------------------------------------------------------
// Developed under Kubuntu Linux, Kate
// ------------------------------------------------------------------------
(function () {

// -- [Main] --------------------------------------------------------------------------------------

function main() {

  EventNotifier = {
    observers: new Array(),
    
    /*
      Function: addObserver
        Registers a new object as observer
        
      Parameters:
        observer - Observer (should implement message function to be notified)
        sender   - Sender object (default:null) If not null, observer will only received message from this object
    */
    addObserver: function(observer, sender) {
      sender = sender || null;
      this.removeObserver(observer);
      this.observers.push({observer:observer, sender:sender});
    },
    
    /*
      Function: removeObserver
        Unregisters an observer
        
      Parameters:
        observer - Observer 
    */
    removeObserver: function(observer) {  
      //this.observers = this.observers.reject( function(o) { return o.observer == observer });
      var results = [];
      this.observers.forEach(
	function(o) {
		if (o.observer != observer) {
		 results.push(o);
		}
	});
       this.observers = results;
    },
    
    /*
      Function: send
        Send a new message to all registered observers
        
      Parameters:
        sender    - Sender object (can be null)
        eventName - Event name (observers have to implement this method)
        options   - Object or Hash table (for multiple options) of sending event  (default null)
    */
    send: function(sender, eventName, options) {  
      options = options || null;
      this.observers.forEach( function(o) {
        if ((o.sender == null || o.sender == sender) && o.observer[eventName]) 
          o.observer[eventName](sender, options);
      });
    }
  }
  
  function deserialize(name, def) {
    return eval(GM_getValue(name, (def || '({})')));
  }

  function serialize(name, val) {
    GM_setValue(name, uneval(val));
  }
  
	var VERSION = 23;
	var CACHE_NAME = "OINKPLUS_CACHE";
	GM_setValue(CACHE_NAME,0);
	var CACHE_SIZE = 75;
	var M_RE = 0;
	var R_STRING = 1;
	var TYPE_HTML = 0;
	var TYPE_XML = 1;
	var TYPE_BINARY=2;
	var UPDATE_INTERVAL_HOURS = 2;
	var MAX_TAGS = 5;
	var MAX_SIMILAR_ARTISTS = 25;
	var MAX_BIO_LENGTH = 450;

	var UNLOADED = 0;
	var LOADING = 1;
	var LOADED = 2;
	var CACHED = 3;
	var FAILED = 4;

	var TOGGLEABLE = true;
	var NON_TOGGLEABLE = false;

	var RESOURCE_LOAD_TIMEOUT = 10000;
	
	var CSS_CODE =		".OinkPlus { position:relative; max-width:1300px; }\
				.explore  { text-decoration:none; } \
				.leftinfo {clear:both;}\
				.floatright { border: solid #000000 0px;float:right;margin:0pt 0pt 10px 10px;padding:2px;text-align: left;} 	\
				.floatleft { border: solid #000000 0px;float:left;text-align: left; width:140px;  } \
				.floatleft-small { border: solid #000000 0px;float:left;text-align: left;   } \
				.floatmiddle { border: solid #000000 0px;text-align: left; margin-left:140px;} ";	

	var BASIC_LAYOUT = 	"<div id=\"OinkPlus\" class=\"OinkPlus\"><div class=\"floatleft\"><h2><div id=\"ArtistName\"></div></h2>		\
													<div id=\"toggleLastFMSimilar\"></div>&nbsp;<b>Similar artists:</b><br>				\
													<div id=\"LastFMSimilar\"></div> 		\
													<br> \
													<div id=\"toggleHistory\"></div>&nbsp;<b>Browsing History:</b><br>				\
													<div id=\"History\"></div><br> 		\
												</div>										\
												<div id=\"artistinfo\" class=\"floatmiddle\">\
													<div class=\"floatright\">	\
														<div id=\"ArtistSearchField\"></div><br>					\
														<div id=\"ArtistImage\"></div><br>			\
													<b>External links:</b><br>						\
													<div id=\"ExternalLinks\"></div><br>\
													<b>Elsewhere:</b><br>						\
													<div id=\"HydraLinks\"></div><br>\
													</div><div id=\"ArtistTitle\"></div><div class=\"floatleft-small\"><img src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAJCAYAAAACTR1pAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJlJREFUeNpi%2FP%2F%2FPwMMMHUcqwNSjQyEwT5GmEaopnAgPgfE3whoTGNC1sTJwnRhQ7CGIRE2MrDANEnzsl3ZGa7lqCXCJQnkHyWkkQnqp3O5xpJSUE1EAZDGJiA2mnz2%2BdNrb749J1rjvwqreiC95unnX7qmCy7t3Xr3%2FTViNCKHKsjJIUB8Boh%2FEApVRrR4BGmuI8LCHQABBgC0YDp2HRMWcAAAAABJRU5ErkJggg%3D%3D\" style=\"vertical-align:bottom; margin-top:5px; margin-right:5px; !important;\" > </div>						\
													<div id=\"LastFMTags\"></div><br>				\
													<div id=\"toggleLastFMBio\"></div>&nbsp;<b>Abstract:</b><br>							\
													<div id=\"LastFMBio\"></div><br>				\		\
													<!-- <div id=\"toggleLastFMPlayer\"></div>&nbsp;<b>Last.fm Player:</b><br> -->				\
													<!-- <div id=\"LastFMPlayer\"></div><br>	-->													\
													<div id=\"toggleMySpacePlayer\"></div>&nbsp;<b>MySpace Player:</b><br>				\
													<div id=\"MySpacePlayer\"></div><br>			\
</div>							\
												<div id=\"UpdateNotify\" class=\"leftinfo\"></div>			\
											</div>";
	
	var NAME			= "OiNKPlus";
	var UPDATE_MESSAGE 		= "<a href=\"%s\">A <font color=\"red\">new version</font> of " + NAME + " is available.</a>";
	var RELEASE_INFORMATION_URL 	= "http://mdclan.org/test/oinkplus.xml";
	var LASTFM_API_KEY		= "d59606ef7ebd81333fd9f66cae4f8fe7";
	var LASTFM_ARTIST_URL 		= "http://www.last.fm/music/%s";
	var LASTFM_INFO_URL 		= "http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=%s&api_key=" + LASTFM_API_KEY;
	var REDIR 					=	"http://anonym.to/?";
	var LASTFM_LINK 		= "<a href=\""+ REDIR + "http://www.last.fm/music/%s\" target=\"_blank\"><img title=\"Last.fm\" src=\"data:image/x-ms-bmp,BM6%03%00%00%00%00%00%006%00%00%00(%00%00%00%10%00%00%00%10%00%00%00%01%00%18%00%00%00%00%00%00%03%00%00%12%0B%00%00%12%0B%00%00%00%00%00%00%00%00%00%00%FF%FF%FFJ%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9%FF%FF%FFJ%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9l9%DF%CB%BD%F3%EB%E5%FB%ED%E8%FB%E0%D7%F8%94s%E8J%00%D9J%00%D9%AD%93%ED%E7%E0%F9%E8%E2%FA%CB%BD%F3e0%DEJ%00%D9J%00%D9i5%DF%EF%EA%FC%CE%BF%F4xK%E2k8%DF%A5%8A%EB%F7%F4%FDwJ%E2%8Ae%E6%F0%EC%FC%84%5D%E4l%3B%E0%D1%C4%F5%D1%C3%F4J%00%D9J%00%D9%C6%B6%F3%CB%BD%F3J%00%D9J%00%D9J%00%D9J%00%D9tF%E1e0%DE%DF%D6%F8%9B%7C%E9J%00%D9J%00%D9%8Cg%E6%E9%E3%FAJ%00%D9J%00%D9%E8%E2%FA%8Ad%E5J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9%94r%E8%EC%E6%FBV%17%DBe0%DE%AC%92%ED%F2%EE%FC%BD%A9%F0J%00%D9J%00%D9%E7%E0%F9%8Di%E6J%00%D9J%00%D9J%00%D9J%00%D9L%06%DA%DD%D3%F8%B1%9A%EE%A0%82%EA%F2%EE%FC%D1%C4%F5%94s%E8P%0F%DAJ%00%D9J%00%D9%C2%AF%F2%D2%C5%F5J%00%D9J%00%D9J%00%D9J%00%D9%90n%E7%EE%E9%FBzN%E3%EE%E9%FBwJ%E2J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9b%2B%DD%E6%DE%F9%D9%CE%F7%8Bf%E6%7CR%E3%B3%9C%EE%F8%F7%FD%94r%E8R%12%DB%EB%E5%FB%9E%80%EA%87a%E5%B8%A3%EFT%16%DBJ%00%D9J%00%D9J%00%D9%60(%DD%BF%AC%F1%EA%E4%FA%EE%E9%FB%DB%D1%F7%88b%E5J%00%D9J%00%D9%86_%E5%DD%D2%F8%E3%DA%F8%A6%8B%ECJ%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9%FF%FF%FFJ%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9J%00%D9%FF%FF%FF\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var LASTFM_BIO_URL  =	"http://www.last.fm/music/%s/%2bwiki";
	var LASTFM_BIO_LINK = "<a href=\""+ REDIR + "http://www.last.fm/music/%s/%2bwiki\" target=\"_blank\">read more</a>";
	var MYSPACE_URL			= "http://www.myspace.com/search/Music?q=%s&musictype=1";
	var MYSPACE_LINK		= "<a href=\""+ REDIR + MYSPACE_URL + "\" target=\"_blank\"><img title=\"MySpace\" src=\"data:image/x-icon;base64,R0lGODlhEAAQAPcAAP//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Zmf+ZZv+ZM/+ZAP9m//9mzP9mmf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8AZv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczMZszMM8zMAMyZ/8yZzMyZmcyZZsyZM8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswAM8wAAJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm/5lmzJlmmZlmZplmM5lmAJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZmmWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAGYA/2YAzGYAmWYAZmYAM2YAADP//zP/zDP/mTP/ZjP/MzP/ADPM/zPMzDPMmTPMZjPMMzPMADOZ/zOZzDOZmTOZZjOZMzOZADNm/zNmzDNmmTNmZjNmMzNmADMz/zMzzDMzmTMzZjMzMzMzADMA/zMAzDMAmTMAZjMAMzMAAAD//wD/zAD/mQD/ZgD/MwD/AADM/wDMzADMmQDMZgDMMwDMAACZ/wCZzACZmQCZZgCZMwCZAABm/wBmzABmmQBmZgBmMwBmAAAz/wAzzAAzmQAzZgAzMwAzAAAA/wAAzAAAmQAAZgAAMwAAALy8vLOzs6qqqmlpaU1NTQ4ODggICAICAv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAOAALAAAAAAQABAAAAhwALVxG0iwYEGBrK4pXMhQIauBDSMuhCgxIsWKDCFi27aRIyts3BRiuwYRAIBsJlEGAuAN28iSga4BiAlA5sqYMG3KvOayJsmQM3UCYLXt5LefQmkmDIoUo8+mElll66bwIsaq3BJevfZQoMGvA7UFBAA7\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var LASTFM_TAGS_URL 		= "http://ws.audioscrobbler.com/1.0/artist/%s/toptags.xml";
	var LASTFM_SIMILAR_URL 		= "http://ws.audioscrobbler.com/1.0/artist/%s/similar.xml";
	var LASTFM_ALBUMS_URL  = "http://ws.audioscrobbler.com/1.0/artist/%s/topalbums.xml";
	var WIKIPEDIA_URL		= REDIR + "http://www.google.com/search?&q=site:en.wikipedia.org+intitle:%22%s - %22&btnI";
	var WIKIPEDIA_LINK		= "<a href=\""+ WIKIPEDIA_URL + "\" target=\"_blank\"><img title=\"Wikipedia\" src=\"data:image/gif,GIF89a%10%00%10%00%F3%00%00%04%02%04%19%18%19(((%3C%3A%3CHGHWXWijiz%7Bz%84%83%84%98%98%98%A9%A8%A9%B9%BA%B9%C8%C7%C8%D8%D9%D8%E9%E8%E9%FC%FD%FC!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%10%00%00%04p%F0%C9I%AB%BD8%CFU%C8z%0Aq4%CFQ4%8DQ%3C%88%F0%3D%84%D08H%F28%86%DD%04%86%F3%24%01%05%C3%20%C1M%0A%01%C6%A3%11C(%24%8B'4%80%90%24%00%AB%1B%E2%25!%10H%8D%01A%D28T%10%80g%D8%F5%B3U%04%05%87%C20%20%22%7C%E7%C1AQ%16%24%AA%16%0A%02%02O%0B%83J%17%5E%24%0F%06%02%19%0B%88K%5C%1A%17%11%00%3B\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var ALLMUSIC_URL		= REDIR + "http://www.allmusic.com/search/artist/%22%s%22";
	var ALLMUSIC_LINK		= "<a href=\""+ ALLMUSIC_URL + "\" target=\"_blank\"><img title=\"AllMusic\" src=\"data:image/gif,GIF89a%10%00%10%00%F6W%00%7D%8F%A3%82%94%A8%83%95%A9%85%96%A9%85%96%AA%85%97%AA%86%97%AA%87%98%AB%88%98%AB%88%99%AB%89%99%AC%89%9A%AC%8A%9A%AC%8A%9A%AD%8A%9B%AD%8B%9B%AD%8B%9B%AE%8B%9C%AE%8C%9C%AE%8C%9C%AF%8D%9D%AF%8E%9E%AF%90%A0%B1%91%A0%B2%91%A1%B2%93%A2%B3%93%A3%B4%94%A3%B4%95%A4%B5%97%A6%B6%98%A6%B6%98%A7%B7%99%A8%B8%9D%AA%BA%9E%AC%BB%9F%AD%BC%A2%AF%BE%A4%B1%C0%A7%B3%C1%A8%B4%C2%A8%B5%C2%A9%B5%C3%AA%B6%C3%AD%B8%C5%AE%BA%C6%AF%BA%C7%B1%BC%C9%B7%C1%CC%B9%C3%CE%BA%C3%CE%BC%C6%D0%BE%C7%D1%BF%C8%D2%C3%CC%D5%C4%CC%D5%C4%CC%D6%C5%CD%D6%C9%D0%D9%C9%D1%D9%CA%D1%D9%CA%D2%DA%CB%D3%DB%CF%D6%DD%D1%D7%DE%D7%DD%E4%D8%DE%E4%DB%E0%E6%DE%E2%E8%DF%E3%E8%E0%E5%EA%E1%E6%EA%E2%E6%EB%E3%E7%EB%E4%E8%EC%E4%E8%ED%E5%E9%ED%E9%EC%EF%EB%EE%F1%EC%EF%F2%ED%EF%F2%EE%F0%F3%F2%F3%F5%F3%F5%F6%F3%F5%F7%F9%FA%FB%FC%FD%FD%FE%FE%FE%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00X%00%2C%00%00%00%00%10%00%10%00%00%07%B1%80XX%14%84%85%86%84%82%83%87%8B%88%8C%14%0B%07%84%04%0F%8E%14%0D)0%12%175%22%94%84%12%0B%0A%94%069M%0F%1BW.%09%84%13%16%25*%1D%0A%068K%A7T-%AB%96%3ESNQ'%01%B4%B6%B8%9F%24%1B%17CE%027%B5%1B%B7%B9%0D%1F%3DBLF%066%CC%CE%14%0F%1CPD!%3CG%056I%0C%CD%2B%AB%0A*U%18%00%3AJ%036M%15%1AV2%91%10%1DOH%3FPR%1E(U%808%08r%85%05%02%0A%0E%40%EC%A0%91%E1%C5%88%04'bD%C00%C3D%03B%0E%08%1C%88p%80%92%82H%12%0C%5CTT%C9%90%A0%92%85%B0%04%02%00%3B\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var FOXYTUNES_URL		= REDIR + "http://www.foxytunes.com/artist/%s";
	var FOXYTUNES_LINK		= "<a href=\""+ FOXYTUNES_URL + "\" target=\"_blank\"><img title=\"Foxytunes\" src=\"data:image/x-icon,%00%00%01%00%01%00%10%10%00%00%01%00%20%00h%04%00%00%16%00%00%00(%00%00%00%10%00%00%00%20%00%00%00%01%00%20%00%00%00%00%00%00%00%00%00%13%0B%00%00%13%0B%00%00%00%00%00%00%00%00%00%00%FF%FF%FF%2F%87%B1%F8~%3A%7C%EE%ED%3E%7F%F0%F0%40%80%F0%E9l%9D%F4%9F%80%92%AFI___1666%26%17%17%17%18%00%00%00%0B%00%00%00%02%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%FF%FF%FF%3D2u%E9%E4%1Cf%E5%FFQ%8D%F3%FCY%8D%E6%D0Y%8F%EE%EF%B0%B9%D0%D9%D2%C7%C0%DE%C0%B7%AF%D4%99%90%8A%AF%5BVRb%00%00%00%18%00%00%00%04%00%00%00%00%00%00%00%00%00%00%00%00%FF%FF%FFF%3C%7C%EA%DC%1Cf%E5%FFN%88%EE%F8%A2%B9%E3%ECf%99%F1%FE%D6%DA%EA%FF%F1%E5%DD%FF%E9%DC%D4%FF%D8%CB%C4%FF%A6%9C%96%E9b%5CY%92%00%00%00!%00%00%00%06%00%00%00%00%00%00%00%00%FD%FD%FDM%CD%DA%F1%87%8C%AD%E6%D4%C6%D5%F1%FA%8D%B1%F1%FF%81%AA%F3%FF%DC%DE%EA%FF%F2%E6%DF%FF%E9%DD%D5%FF%D9%CC%C5%FF%BB%B0%A9%FF%94%8C%86%FF_YV%B1%00%00%00!%00%00%00%04%00%00%00%00%EA%EE%F6a%88%AA%E4%C2J%85%EB%FEd%96%EE%FF%3Az%E9%FF%5B%92%F1%FF%AC%C4%F1%FF%D5%D6%E3%FF%E3%D7%D0%FF%CC%C1%BA%FF%A9%9F%99%FF%7Fxs%FF%94%8C%86%FF%60%5BW%91%00%00%00%17%00%00%00%02%80%A8%EB%A8N%88%EB%F9%A8%C3%F5%FFw%A4%F2%FF%5D%92%ED%FF%80%A9%F0%FF6y%EB%FF%BB%C8%E5%FF%D3%CA%C5%FF%B1%A9%A3%FF%84~y%FF%A8%9E%98%FF%BB%B0%A9%FF%A8%9E%98%EB%5BVRa%00%00%00%0B)o%E6%F5%94%BA%FC%FEV%8D%EB%FF%C9%DB%FB%FFr%A0%F0%FF%BF%D1%F4%FF%1Cf%E5%FF%9A%AE%D5%E6%A7%A4%A1%D3%A1%9B%98%F9%B3%AB%A5%FF%CB%BF%B7%FF%D9%CC%C4%FF%D8%CB%C3%FF%9A%91%8B%AF%00%00%00%17%1Cf%E5%FF%8A%B3%FA%FF(n%E6%FFn%9F%F2%FFO%89%ED%FFI%85%EC%FF%23k%E6%FF%8B%A9%DD%99%8E%8E%8EP%81%7D%7B%A1%D0%C6%C0%FE%E0%D3%CA%FF%E9%DB%D2%FF%E9%DB%D2%FF%BE%B3%AB%D2%00%00%00%1F1t%E5%F0A%80%EB%FF%9B%BD%F8%FF(n%E6%FF%1Cf%E5%FF%25l%E6%FFe%94%E5%E0%B2%C9%F2k%D2%D2%D20YXW_%DB%CF%C7%FB%EC%DE%D5%FF%F1%E3%D9%FF%F0%E2%D8%FF%CC%C0%B8%DA%00%00%00!z%A1%E3%B8%1Cf%E5%FFC%81%EC%FF%92%B6%F5%FF%98%B9%F3%FF%C3%CA%DA%FF%A2%A8%B4%C8%A8%A8%A8_vvvF%8F%88%83%9F%EA%DD%D4%FE%F2%E4%DA%FF%F4%E6%DC%FF%F4%E6%DC%FF%C1%B6%AE%C5%00%00%00%1C%DA%DA%DAsY%8B%E2%F6%1Cf%E5%FF%1Cf%E5%FF%83%AC%F4%FF%AE%BC%D7%FF%C0%BD%BF%FB%B2%AD%A8%D5%B4%AC%A6%CF%E3%D6%CE%F8%F2%E4%DA%FF%F4%E6%DC%FF%F5%E8%DE%FF%EF%E3%D9%FB%A2%99%92%8E%00%00%00%11%E7%E7%E7W%C2%C4%CA%B1%8B%AB%E1%FE%1Cf%E5%FF%25l%E7%FF%92%B4%EF%FF%C7%CC%DB%FF%E7%DD%D6%FF%EE%E1%D9%FF%F3%E5%DB%FF%F4%E6%DC%FF%F4%E6%DC%FF%F5%E8%DF%FF%C4%BA%B2%C9JFC5%00%00%00%06%F9%F9%F9%3C%D6%D6%D6o%C0%C3%C9%D6V%8B%E6%FF%25l%E6%FF8z%EC%FF%B7%C8%EA%FF%EB%E3%DE%FF%F2%E6%DD%FF%F4%E7%DD%FF%F4%E6%DD%FF%F4%E7%DE%FF%E3%D7%CF%ED%5DYUO%00%00%00%0C%00%00%00%01%FF%FF%FF%2B%F1%F1%F1M%C5%CE%DD%87%3D%7B%E5%FA%93%B4%ED%FE%1Cf%E5%FF%A9%C1%F0%FF%E3%E0%E4%FF%F4%E8%E0%FF%F5%EA%E1%FF%F6%EB%E2%FF%DA%D1%CA%E1nhe%5C%00%00%00%11%00%00%00%01%00%00%00%00%FF%FF%FF%1F%FF%FF%FF%3A%DB%E5%F5d%2Fs%E7%F2p%A0%F5%F8L%85%E7%F9%86%AB%EB%F9%DD%DD%E4%F8%E9%E0%DB%F3%D5%CD%C7%DA%A8%A1%9C%999648%00%00%00%0E%00%00%00%02%00%00%00%00%00%00%00%00%FF%FF%FF%16%FF%FF%FF-%FF%FF%FFDA%80%EB%D5'n%E8%FD%22j%E7%FF~%A5%E8%A8%8C%94%A2%5Cjjj%3F%3F%3F%3F*%00%00%00%13%00%00%00%06%00%00%00%01%00%00%00%00%00%00%00%00%00%00%00%00%C3%FF%00%00%80%3F%00%00%80%0F%00%00%80%07%00%00%80%03%00%00%00%03%00%00%00%01%00%00%00%81%00%00%01%C1%00%00%01%81%00%00%80%01%00%00%80%03%00%00%C0%07%00%00%C0%0F%FF%FF%E0%1F%FF%FF%E1%FF%FF%FF\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var IMEEM_URL			= REDIR + "http://www.imeem.com/tag/?q=%s&f=music";
	var IMEEM_LINK			= "<a href=\""+ IMEEM_URL + "\" target=\"_blank\"><img title=\"Imeem\" src=\"data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMCAwMDYQMDAygAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcHB2EiIiLNBwcHnQcHBzYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALCwskCwsLYwsLC4ILCwuiY2Nj9VZWVusuLi7RCwsLhwsLCw0AAAAAAAAAAAAAAAAAAAAAAAAAABAQEA0QEBBwJiYmy0hISOBWVlbrYmJi9Wpqav9qamr%2FbW1t%2F0VFRd4QEBCkEBAQFAAAAAAAAAAAAAAAABUVFRQVFRWkR0dH3m9vb%2F9vb2%2F%2Fb29v%2F2pqav9gYGD%2FYGBg%2F2pqav9vb2%2F%2FSkpK4BUVFZkVFRUHAAAAAAAAAAAbGxuHTExM4G9vb%2F9vb2%2F%2Fb29v%2F29vb%2F%2F%2F%2F%2F%2F%2F9fX1%2F1tbW%2F9oaGj%2Fb29v%2F29vb%2F9GRkbcGxsbXAAAAAAhISErNzc3zW9vb%2F9vb2%2F%2Fb29v%2F29vb%2F9vb2%2F%2F%2F%2F%2F%2F%2F%2FX19f9bW1v%2FaGho%2F29vb%2F9vb2%2F%2FaWlp%2BCEhIa8hISECJycnalRUVOJvb2%2F%2Fb29v%2F29vb%2F9vb2%2F%2Fb29v%2F%2F%2F%2F%2F%2F%2F19fX%2FW1tb%2F2hoaP9vb2%2F%2Fb29v%2F29vb%2F84ODjLJycnJC4uLoBdXV3qb29v%2F29vb%2F9vb2%2F%2Fb29v%2F29vb%2F%2F%2F%2F%2F%2F%2F9vb2%2F2BgYP9qamr%2Fb29v%2F29vb%2F9vb2%2F%2FRUVF0i4uLjg0NDR%2BX19f6W9vb%2F9vb2%2F%2Fb29v%2F29vb%2F9vb2%2F%2F%2F%2F%2F%2F%2F%2Fb29v9nZ2f%2FbGxs%2F29vb%2F9vb2%2F%2Fb29v%2F0dHR9A0NDQxOzs7Y1paWuBvb2%2F%2Fb29v%2F29vb%2F9vb2%2F%2Fb29v%2F2tra%2F9jY2P%2FY2Nj%2F2pqav9vb2%2F%2Fb29v%2F29vb%2F9CQkLGOzs7FEdHRx9PT0%2FKb29v%2F29vb%2F9vb2%2F%2Fb29v%2F3Fxcf%2FDw8P%2Fx8fH%2F2NjY%2F9oaGj%2Fb29v%2F29vb%2F9kZGTqR0dHlwAAAAAAAAAAU1NTfmNjY99vb2%2F%2Fb29v%2F29vb%2F99fX3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F99fX3%2FbGxs%2F29vb%2F9ubm77XFxc0FNTUzEAAAAAAAAAAF9fXxBfX1%2BkaGho329vb%2F9vb2%2F%2Fb29v%2F5mZmf%2BdnZ3%2FbW1t%2F29vb%2F9tbW33Z2dn2V9fX2UAAAAAAAAAAAAAAAAAAAAAampqEmpqapBsbGzUbm5u7G9vb%2F1vb2%2F%2Fb29v%2F29vb%2FhtbW3iampqu2pqalgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcnJyP3JycodycnK7cnJyv3Jycr9ycnKrcnJybnJychkAAAAAAAAAAAAAAAAAAAAA%2FH8AAP4f8L%2FwBwAAwAMAAIAB6pCAAQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAgAH%2F%2F4AD%2F%2F%2FABwAA8A8AAA%3D%3D\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var DISCOGS_URL			= REDIR + "http://www.discogs.com/artist/%s";
	var DISCOGS_LINK		= "<a href=\""+ DISCOGS_URL + "\" target=\"_blank\"><img title=\"Discogs\" src=\"data:image/x-icon,%00%00%01%00%01%00%10%10%00%00%01%00%20%00h%04%00%00%16%00%00%00(%00%00%00%10%00%00%00%20%00%00%00%01%00%20%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%18%18%18%40111%80%1E%1E%1E%FF%24%24%24%FF%0C%0C%0C%FF%0C%0C%0C%FF%00%00%00%80%00%00%00%40%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00D%3F%3F%BF%A8%A5%A5%FF%7Dzz%FFRVV%FF777%FF%1E%1E%1E%FF%18%18%18%FF%0C%0C%0C%FF%00%00%00%FF%00%00%00%BF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%18%18%18%FF%5CZZ%FF%CA%C0%C0%FF%8E%84%84%FFBDD%FF111%FF%1E%1E%1E%FF%18%18%18%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%00%00%00%00%00%00%00%00%00%10%10%10%BF777%FFLPP%FF%5CZZ%FF%DE%DA%DA%FFVTT%FF%24%24%24%FF%18%18%18%FF%12%12%12%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%BF%00%00%00%00%18%18%18%40%12%12%12%FF777%FF111%FFLPP%FFw%7C%7C%FFq%5C%5C%FF%10%3EB%FF%148%3C%FF%16%0C%0C%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%40%00%00%00%80%18%18%18%FF%18%18%18%FF777%FF%2B%2B%2B%FF%2079%FF%0C%9E%A9%FF%00%BD%C6%FF%00%B7%C2%FF%02%B1%BC%FF%0C59%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%80%12%12%12%FF%06%06%06%FF%12%12%12%FF%18%18%18%FF%18%18%18%FF%08%88%90%FF%00%C2%CE%FF%00%E7%F7%FF%00%E7%F7%FF%00%D6%E6%FF%02%AB%B7%FF%06%06%06%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%0C%0C%0C%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%0C%0C%0C%FF%00%B7%C2%FF%00%E7%F7%FF!%C0%CA%FF!%B5%BE%FF%00%E7%F7%FF%00%BD%C6%FF%18%18%18%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%0C%0C%0C%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%06%06%06%FF%02%A0%AB%FF%00%DC%EB%FF%00%DC%EB%FF%00%DC%EB%FF%00%DC%EB%FF%00%B7%C2%FF%22%18%18%FF%18%18%18%FF%0C%0C%0C%FF%0C%0C%0C%FF%00%00%00%FF%10%10%10%BF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%0E_e%FF%00%C2%CE%FF%00%D2%DE%FF%00%D2%DE%FF%00%CC%DA%FF%0Eks%FF%22%18%18%FF%1E%1E%1E%FF%18%18%18%FF%18%18%18%FF%00%00%00%BF%0C%0C%0C%80%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%08HN%FF%04%90%98%FF%0E%84%8A%FF7X%5C%FFLHH%FF777%FF777%FF%24%24%24%FF%18%18%18%FF%00%00%00%80%00%00%00%00%06%06%06%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%00%00%00%FF%10%06%06%FF%1C%12%12%FF%2F%24%24%FF%96%8E%8E%FF%A0%98%98%FFRNN%FF777%FF777%FF%18%18%18%FF%00%00%00%00%00%00%00%00%00%00%00%40%00%00%00%FF%00%00%00%FF%00%00%00%FF%06%06%06%FF%18%18%18%FF%1E%1E%1E%FF777%FFmee%FF%C8%CA%CA%FFkee%FFHJJ%FF%25%25%25%FF%00%00%00%40%00%00%00%00%00%00%00%00%00%00%00%00111%BF%00%00%00%FF%00%00%00%FF%12%12%12%FF%18%18%18%FF%18%18%18%FF%2B%2B%2B%FF777%FF%A2%9C%9C%FF%D0%C8%C8%FF%3B%3E%3E%FF%16%08%08%BF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%40%0C%0C%0C%FF%0C%0C%0C%FF%18%18%18%FF%1E%1E%1E%FF%24%24%24%FF%24%24%24%FFBDD%FFwoo%FF111%40%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%18%18%18%80%1E!!%BF%25%25%25%FF%25%25%25%FF%1E!!%BF%18%18%18%80%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%F8%1F%00%00%E0%07%00%00%C0%03%00%00%80%01%00%00%80%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%80%01%00%00%C0%03%00%00%C0%03%00%00%F0%0F%00%00%F8%1F%00%00\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var GOOGLE_URL			= REDIR + "http://www.google.com/search?&q=%22%s%22";
	var GOOGLE_LINK			= "<a href=\""+ GOOGLE_URL + "\" target=\"_blank\"><img title=\"Google\" src=\"data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC1tbUFHBwcFQAAABoAAAAaAAAAFgAAAA8AAAAWBAAAGwIAABoAAAAXAAAAGQAAABkAAAAaAAAAGg0NDRiOjo4JJiYmDwAAABQAAAATAAAADQwCAR1YFRB4nCsqua0yLMSbLCyxYxoYfBgFAiwDAQAUAAAAEgAAABMAAAAUBwcHEhQUFA0AAAAOAAAACxMEARayLy%2FF7T9C%2F640K7FuJR1pZiMgYpczMZqeLSzBIAcFPQEBABAAAAANAAAADgAAAA4XFxcJAAAACgAAAABbKSNY%2F1ZO%2F3MdHY8AAAAAAAAAAAAAAAAAAAAAjzc2lHwdG7oDAAAVAAAACAAAAAoAAAAKFxcXBgAAAAcAAAAAVj43Tfx6df87BQFmAQIAAgAAAAQAAAAEAAAAAI0vJomvLCftCwEAHQAAAAQAAAAHAAAABxEREQQAAAAEAAAAAwYEAAi4bVm0uT8%2F4UwOC1wnBgMlFAQAEF4YGmnwQ0X8niQfxQEAAAgAAAADAAAABAAAAAQzMzMCHh4eAh8fHwMAAAAAKSglBJVbWGfQX16qxktJsLItKNTqP0X%2F5DxE8VklJTsAAAAAHx8fAh8fHwIfHx8C7%2B%2FvBO3t7QTt7e0E7e3tBOrr6wIAAAAAAAAAALWHgkH%2BVFD%2FxjI226J1dDYAAAAA7e7uBO3t7QTt7e0E7e3tBP%2F%2F%2Fwn%2F%2F%2F8K%2F%2F%2F%2FCv%2F%2F%2Fwv%2F%2F%2F8Eybi3HHw1LHeySkjC%2Fnd2%2F34iIZ1rbGkJ8fHxCv%2F%2F%2Fwr%2F%2F%2F8K%2F%2F%2F%2FCv%2F%2F%2Fwr%2F%2F%2F8R%2F%2F%2F%2FE%2F%2F%2F%2FxP%2F%2F%2F8P9OTiHtFGSNHPKS%2F%2F15KSeP7k4Evgb3DOXh4cjouJiCD9%2Ff4R%2F%2F%2F%2FE%2F%2F%2F%2FxP%2F%2F%2F8T%2F%2F%2F%2FGf%2F%2F%2Fxv%2F%2F%2F8b%2F%2F%2F%2FDvu3rnbrNCn%2Fo1NTk9%2Fr6wn%2F%2F%2F8C%2F9fXaqskJf9kTUxX7e%2FvGP%2F%2F%2Fxr%2F%2F%2F8b%2F%2F%2F%2FG%2F%2F%2F%2FyH%2F%2F%2F8k%2F%2F%2F%2FJP%2F%2F%2Fxb%2F0MyT00JA%2F5Byblv7%2F%2F8d%2F%2F%2F%2FFv7Ix3XUNjH%2FhFhVee%2Fz8x3%2F%2F%2F8j%2F%2F%2F%2FJP%2F%2F%2FyT%2F%2F%2F8o%2F%2F%2F%2FLf%2F%2F%2Fyz%2F%2F%2F8j%2F%2FDmZNphWv%2BOa2ll4urpJPHy8iLwcWDF0zEn%2B7edm1f%2F%2F%2F8m%2F%2F%2F%2FLP%2F%2F%2Fyz%2F%2F%2F8s%2F%2F%2F%2FMP%2F%2F%2FzX%2F%2F%2F80%2F%2F%2F%2FM%2F%2F%2F%2Fy77u7KoxlhZyrV%2Ff3XSc3Oy7z83%2F7w5NtymioZg5OHgOf%2F%2F%2FzP%2F%2F%2F80%2F%2F%2F%2FNf%2F%2F%2Fyv%2F%2F%2F89%2F%2F%2F%2FOv%2F%2F%2Fzr%2F%2F%2F84%2F%2F%2F%2FM%2F%2FT0m%2F3oaGk%2FbS0uv24ubPujouw2oqIoO3j40r%2F%2F%2F83%2F%2F%2F%2FPP%2F%2F%2FzP%2F%2F%2F8K%2F%2F%2F%2FMf%2F%2F%2Fz7%2F%2F%2F89%2F%2F%2F%2FPf%2F%2F%2Fz3%2F%2F%2F80%2F%2F%2F%2FMf%2F%2F%2FzH%2F%2F%2F8x%2F%2F%2F%2FMf%2F%2F%2FzX%2F%2F%2F88%2F%2F%2F%2FPv%2F%2F%2Fzf%2F%2F%2F8SAAAAAAAAAAAAAAAAI8AAACBAAAAAAAAAEAgAAAYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var AMAZON_URL			= "http://www.amazon.com/gp/search?ie=UTF8&keywords=%22%s%22&index=music&linkCode=ur2&camp=1789&creative=9325";
	var AMAZON_LINK			= "<a href=\""+ AMAZON_URL + "\" target=\"_blank\"><img title=\"Amazon\" src=\"data:image/gif,GIF89a%10%00%10%00%F4%1F%00755C%3C5NC6ZJ6fR7qY7%7D%608DBBPNN%5D%5B%5Bihhvtt%88g8%94n9%A0u9%B7%83%3A%C3%8B%3A%CE%92%3B%DA%99%3B%E5%A0%3C%F1%A7%3C%82%81%81%8F%8D%8D%9B%9A%9A%A8%A7%A7%B4%B3%B3%EA%C1%85%CA%CA%CA%DA%D9%D9%E6%E6%E6%F3%F2%F2%FF%FF%FF!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%10%00%00%05%7B%E0%05%00%88r%8Ch*%26%DC%E7fi%0Cl_%D7~%8B%8Cn%1B%02%B8%22%1D%E0p%D9x%80B%40%CB%83A%EA%12%AE%9CS%A6%006%3F%9Cd%C7U%C3%02%0C%8F%09%85%12%11%90.%97%0A%C0r(%40%20%8D0%85%90%04%08%1A%01%08%25%A0%13%18%F4%13%02%12%11)%03%05%0E%11c%14%0F%02%03%14%06%00%10%12%8A%8A%10t%00%88%23%94%14%12%0Ef(%0C%7C%00%1A%10%0E%06%9FB%15!%00%3B\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var HYPEMACHINE_URL = REDIR + "http://hypem.com/search/%s/1/";
	var HYPEMACHINE_LINK = "<a href=\""+ HYPEMACHINE_URL + "\" target=\"_blank\"><img title=\"HypeMachine\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVQ4jaVT3WtScRg+0lV/gLCxBg2DWDH6gC5WxFgQZBA1IkZUFzHoqrshsV1KDiTYwIkYDSM2NoSiebIMiSKHLTmMMURN1lnuyHRHPX6dHe18/Z5uIjy6EdEP3pv3+T3Pw/vyPhQA0/8U1d6YmpowB4PLF2OxL2OJRGI8lUiMM0xsLBwOD7lcLvOBAtPTj3uiqyuPdnayTL1erymKoquqCk3ToCgKJEkSC4VdJh7fmPD5fL0GgYWF5+e2ttjPsizr+MtTVVXP5XaioVBoEICJmn06PbCVYRldb+ESAiJJgKb9ZmkAIS0wAc/vbgQCgTMUw3x9oSiKwUWm36J28zaabi/kV8sQHzyEHHxn+KPrOja/p19T2ew23woQUURtZBQlcy/KlhMoHz+FkrkXNet1kHLFIFIsFpoUz/OGuUmjgfrd+xC6jkI4cgxCjwVCVx9qV2+AVIwC1WoVVDKZVNsXpXyKoHL2PITuPgjdfSj3n8ZP/8uOhRYKvEi9oemYJElGhBAoHz6iOnwF1UtWyIEgoBp9/uzA4XBcjkQim41Go8NBY39A3+Y6+oQQZDlu0+/3X6AAmJwOxzBN0yv5fL5jnHbi3t4evqVSqcXFxWtovUSbzWZJp9PrsiyD47gmy7LNfC6nl4pF8DyvZzIZcX1tLR6k6SdOp7Mf7af8zOsdXY1G0+9DIb/b7R6ZmZmxzs3N3VtaWhqbn5+/4/F4hiYnJ7spijqE/bJgt9tP2u32gVuDg4exT+oOqo40/mv9ArXTOeQH2AX8AAAAAElFTkSuQmCC\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var SEEQPOD_URL 		= REDIR + "http://www.seeqpod.com/music/?query=%s&query_unused=&command=q";
	var SEEQPOD_LINK    = "<a href=\""+ SEEQPOD_URL + "\" target=\"_blank\"><img title=\"Seeqpod\" src=\"data:image/x-icon,%00%00%01%00%01%00%10%10%00%00%01%00%08%00h%05%00%00%16%00%00%00(%00%00%00%10%00%00%00%20%00%00%00%01%00%08%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%01%00%00%00%00%00%00%FF%FF%FF%00%CC%FF%FF%00%99%FF%FF%00f%FF%FF%003%FF%FF%00%00%FF%FF%00%FF%CC%FF%00%CC%CC%FF%00%99%CC%FF%00f%CC%FF%003%CC%FF%00%00%CC%FF%00%FF%99%FF%00%CC%99%FF%00%99%99%FF%00f%99%FF%003%99%FF%00%00%99%FF%00%FFf%FF%00%CCf%FF%00%99f%FF%00ff%FF%003f%FF%00%00f%FF%00%FF3%FF%00%CC3%FF%00%993%FF%00f3%FF%0033%FF%00%003%FF%00%FF%00%FF%00%CC%00%FF%00%99%00%FF%00f%00%FF%003%00%FF%00%00%00%FF%00%FF%FF%CC%00%CC%FF%CC%00%99%FF%CC%00f%FF%CC%003%FF%CC%00%00%FF%CC%00%FF%CC%CC%00%CC%CC%CC%00%99%CC%CC%00f%CC%CC%003%CC%CC%00%00%CC%CC%00%FF%99%CC%00%CC%99%CC%00%99%99%CC%00f%99%CC%003%99%CC%00%00%99%CC%00%FFf%CC%00%CCf%CC%00%99f%CC%00ff%CC%003f%CC%00%00f%CC%00%FF3%CC%00%CC3%CC%00%993%CC%00f3%CC%0033%CC%00%003%CC%00%FF%00%CC%00%CC%00%CC%00%99%00%CC%00f%00%CC%003%00%CC%00%00%00%CC%00%FF%FF%99%00%CC%FF%99%00%99%FF%99%00f%FF%99%003%FF%99%00%00%FF%99%00%FF%CC%99%00%CC%CC%99%00%99%CC%99%00f%CC%99%003%CC%99%00%00%CC%99%00%FF%99%99%00%CC%99%99%00%99%99%99%00f%99%99%003%99%99%00%00%99%99%00%FFf%99%00%CCf%99%00%99f%99%00ff%99%003f%99%00%00f%99%00%FF3%99%00%CC3%99%00%993%99%00f3%99%0033%99%00%003%99%00%FF%00%99%00%CC%00%99%00%99%00%99%00f%00%99%003%00%99%00%00%00%99%00%FF%FFf%00%CC%FFf%00%99%FFf%00f%FFf%003%FFf%00%00%FFf%00%FF%CCf%00%CC%CCf%00%99%CCf%00f%CCf%003%CCf%00%00%CCf%00%FF%99f%00%CC%99f%00%99%99f%00f%99f%003%99f%00%00%99f%00%FFff%00%CCff%00%99ff%00fff%003ff%00%00ff%00%FF3f%00%CC3f%00%993f%00f3f%0033f%00%003f%00%FF%00f%00%CC%00f%00%99%00f%00f%00f%003%00f%00%00%00f%00%FF%FF3%00%CC%FF3%00%99%FF3%00f%FF3%003%FF3%00%00%FF3%00%FF%CC3%00%CC%CC3%00%99%CC3%00f%CC3%003%CC3%00%00%CC3%00%FF%993%00%CC%993%00%99%993%00f%993%003%993%00%00%993%00%FFf3%00%CCf3%00%99f3%00ff3%003f3%00%00f3%00%FF33%00%CC33%00%9933%00f33%00333%00%0033%00%FF%003%00%CC%003%00%99%003%00f%003%003%003%00%00%003%00%FF%FF%00%00%CC%FF%00%00%99%FF%00%00f%FF%00%003%FF%00%00%00%FF%00%00%FF%CC%00%00%CC%CC%00%00%99%CC%00%00f%CC%00%003%CC%00%00%00%CC%00%00%FF%99%00%00%CC%99%00%00%99%99%00%00f%99%00%003%99%00%00%00%99%00%00%FFf%00%00%CCf%00%00%99f%00%00ff%00%003f%00%00%00f%00%00%FF3%00%00%CC3%00%00%993%00%00f3%00%0033%00%00%003%00%00%FF%00%00%00%CC%00%00%00%99%00%00%00f%00%00%003%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%D7%D7%D7%D7%D7%2B%81%AC%AC%81V%D7%D7%D7%D7%D7%D7%D7%D7%2B%AC%D7%D7%D7%AD%D7%D7%ACV%D7%D7%D7%D7%D7V%D7%D7%83.%04%82.X%AD%D7%81%D7%D7%D7%2B%D7%D7.%04%03%03%82%AD%03%0A%AD%D7V%D7%D7%81%D7X%04%03X%AC%02%ADX%04.%AD%D6%D7%2B%D7%AD%04%04.-%D7WW%AD%04%04X%D7VV%D7_%04%0A%D7XX%AD-%D7.%04.%D7%81%81%D74%04%03X%82-%AC%09%AC.%04%04%D7%AC%81%D7.%02%01%2CW%08%81%02%81%2C%03%04%D7%ACV%D7W%01%01V%07%2C%81%08%81%2C%02.%D7%81%2B%D7%5D%02%01%01%01V%2C%2C%81%02%03X%D7V%D7%AC%AC%2C%02%01%2B%2B%02%81%2C%03.%D7%D7%D7%D7%2B%D7%81%2C%02%01%01WW%03.%AD%D7V%D7%D7%D7V%D7%ACWW-%82%5E%89%D7%D7%81%D7%D7%D7%D7%D7%2B%AC%D7%D7%D7%D7%D7%D7%ACV%D7%D7%D7%D7%D7%D7%D7%D7%2BV%81%81V%2B%D7%D7%D7%D7%D7%F8%1F%00%00%E0%07%00%00%C0%03%00%00%80%01%00%00%80%01%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%80%01%00%00%80%01%00%00%C0%03%00%00%E0%07%00%00%F8%1F%00%00\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var PANDORA_URL 		= REDIR + "http://www.pandora.com/music/artist/%s";
	var PANDORA_LINK 		= "<a href=\""+ PANDORA_URL + "\" target=\"_blank\"><img title=\"Pandora\" src=\"data:image/jpg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00H%00H%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.'%20%22%2C%23%1C%1C(7)%2C01444%1F'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%10%00%10%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%F4%3B%86%8E%CE%CFD%10%D9%E9%A4%DDI%05%BC%86%E2%D09%F9%E3%DC_%20%8C%F4%EFR%09-.a%D6%ED%1FO%B02%D9%2B%A2%DC%5B%DB%AA%AB~%E8%B0%239!%81%E0%F3%D6%A0%D4%22%8BS%D3tH%E3%BA%D2%CA%5B4%13L%977AI%DA%9BJ%E3%07%D7%BF%A5k%DD%5C%E9%91h%F7QCsb%9F%E8%F2%05%8E)%93%19*x%00%1FZ%E9oc%9D%23%FF%D9\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var RIAARADAR_URL		= REDIR + "http://www.riaaradar.com/search.asp?searchtype=ArtistSearch&keyword=%s";
	var RIAARADAR_LINK  = "<a href=\""+ RIAARADAR_URL + "\" target=\"_blank\"><img title=\"RIAARadar\" src=\"data:image/x-ms-bmp,BM6%04%00%00%00%00%00%006%00%00%00(%00%00%00%10%00%00%00%10%00%00%00%01%00%20%00%00%00%00%00%00%04%00%00%13%0B%00%00%13%0B%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%80%00%00%00%BF%00%00%00%FF%00%00%00%FF%00%00%00%BF%00%00%00%80%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%80%00%00%00%FF%40%40%40%FF%90%90%90%FF%A8%A8%A8%FF%AC%AC%AC%FF%94%94%94%FFIII%FF%00%00%00%FF%00%00%00%80%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%BF%20%20%20%FF%AC%AC%AC%FF%9F%9F%9F%FF%9E%9E%9E%FFjjj%FF%85%85%85%FF%9C%9C%9C%FF%B0%B0%B0%FF%AC%AC%AC%FF%24%24%24%FF%00%00%00%BF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%80%20%20%20%FF%B0%B0%B0%FF%19%19%19%FF%00%00%00%FF%80%80%80%FFppp%FF%8E%8E%8E%FF%A8%A8%A8%FF%80%80%80%FF%10%10%10%FF%AC%AC%AC%FF%24%24%24%FF%00%00%00%80%00%00%00%00%00%00%00%00%00%00%00%FF%B0%B0%B0%FF%A4%A4%A4%FF%98%98%98%FF%94%94%94%FF%A5%A5%A5%FF%AB%AB%AB%FF%9D%9D%9D%FF%9D%9D%9D%FF%A0%A0%A0%FF%91%91%91%FF%98%98%98%FF%B8%B8%B8%FF%00%00%00%FF%00%00%00%00%00%00%00%80DDD%FFppp%FF%D8%D8%D8%FF%80%80%80%FF%A1%A1%A1%FF%8C%8C%8C%FF%A0%A0%A0%FF%A4%A4%A4%FF%94%94%94%FF%B0%B0%B0%FF%8F%8F%8F%FF%C8%C8%C8%FFddd%FFIII%FF%00%00%00%80%00%00%00%80%90%90%90%FF%10%10%10%FF%BA%BA%BA%FF%A0%A0%A0%FF%87%87%87%FFttt%FF%A9%A9%A9%FF%B2%B2%B2%FFXXX%FF%9C%9C%9C%FF%8C%8C%8C%FF%B0%B0%B0%FF'''%FF%94%94%94%FF%00%00%00%BF%00%00%00%FF%C3%C3%C3%FF%D0%D0%D0%FF%E8%E8%E8%FF%E0%E0%E0%FF%E0%E0%E0%FF%E4%E4%E4%FF%F0%F0%F0%FF%EC%EC%EC%FF%E4%E4%E4%FF%E8%E8%E8%FF%EC%EC%EC%FF%E8%E8%E8%FF%D0%D0%D0%FF%BB%BB%BB%FF%00%00%00%FF%00%00%00%FF%B0%B0%B0%FF%00%00%00%FF%00%00%00%FFttt%FF%A8%A8%A8%FFDDD%FFxxx%FF%A4%A4%A4%FF%A0%A0%A0%FF%9A%9A%9A%FF%B0%B0%B0%FF%00%00%00%FF%00%00%00%FF%AC%AC%AC%FF%00%00%00%FF%00%00%00%80%94%94%94%FF%14%14%14%FF%00%00%00%FFlll%FF%DC%DC%DC%FF%2C%2C%2C%FFppp%FF%B1%B1%B1%FF%84%84%84%FF%94%94%94%FF%B4%B4%B4%FF%00%00%00%FF%14%14%14%FF%90%90%90%FF%00%00%00%BF%0D%0D%0D%C0DDD%FFppp%FF%00%00%00%FFppp%FF%B5%B5%B5%FFPPP%FFppp%FF%9F%9F%9F%FFhhh%FFxxx%FF%98%98%98%FF%00%00%00%FFppp%FFDDD%FF%00%00%00%80LLL%FF%00%00%00%FF%AC%AC%AC%FF%19%19%19%FFppp%FF%CF%CF%CF%FFEEE%FFttt%FF%88%88%88%FFTTT%FFYYY%FF%7C%7C%7C%FF%19%19%19%FF%AC%AC%AC%FF%00%00%00%FF%00%00%00%00LLL%FF%14%14%14%FF%20%20%20%FF%B4%B4%B4%FF%24%24%24%FF%14%14%14%FF%04%04%04%FF%0C%0C%0C%FF%0C%0C%0C%FF%04%04%04%FF%08%08%08%FF!!!%FF%AF%AF%AF%FF%20%20%20%FF%00%00%00%80%00%00%00%00111%80MMM%FF%25%25%25%FF%20%20%20%FF%AC%AC%AC%FFmmm%FF%18%18%18%FF%00%00%00%FF%00%00%00%FF%18%18%18%FFmmm%FF%AC%AC%AC%FF%20%20%20%FF%00%00%00%BF%00%00%00%00%00%00%00%00%00%00%00%00VVV%BFXXX%FF%0E%0E%0E%FF%00%00%00%FFIII%FF%90%90%90%FF%B0%B0%B0%FF%B0%B0%B0%FF%90%90%90%FF%40%40%40%FF%00%00%00%FF%00%00%00%40%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00)))%80HHH%FFHHH%FF%0D%0D%0D%C0%00%00%00%80%00%00%00%FF%00%00%00%FF%00%00%00%80%00%00%00%80%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var PUREVOLUME_URL  = REDIR + "http://www.google.com/search?&q=site:purevolume.com+intitle:%22%s%22+-inurl:videos+-inurl:photos+-inurl:shows&btnI";
	var PUREVOLUME_LINK = "<a href=\""+ PUREVOLUME_URL + "\" target=\"_blank\"><img title=\"PureVolume\" src=\"data:image/gif,GIF89a%10%00%10%00%B3%00%00000!!!(((%25%25%25%2C%2C%2C%3A%3A%3A777%3D%3D%3D%40%40%40%1E%1E%1E%1B%1B%1B%18%18%18BBB%00%8E%E8333%14%14%14!%F9%04%00%00%00%00%00%2C%00%00%00%00%10%00%10%00%00%04_%F0%C9I%ABd8k-%91%FF%20(%1DdY6%A6T%ACk%C3%BA%ACd%CCsC%DB%B4%E4%EC%8D%D3%F3%BB%9D%04%40l%00%8CH%22QBh6%08%CFh%B3)%11X%1B%02%AC%D6j%95%0C%BE%8DAx%FC%FDJ%02%E8F%40%CDF%A3%25%89%B8%7C%3E%97(%EE%F8%7C%5E%B2%E8%FB%FF%7F%16%82%14%11%00%3B\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var YOUTUBE_URL	    = REDIR + "http://www.youtube.com/results?search_query=%22%s%22&search_type=&aq=f";
	var YOUTUBE_LINK = "<a href=\""+ YOUTUBE_URL + "\" target=\"_blank\"><img title=\"YouTube\" src=\"data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4OD%2F%2F9paf%2F%2Fbm7%2F%2F2Fh%2F%2F9ZWf%2F%2FWlr%2F%2F1pa%2F%2F9WVv%2F%2FZGT%2F%2F3Bw%2F%2F9jY%2F%2F%2FgoL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F11d%2F%2F8sLP%2F%2FQUH%2F%2Fygo%2F%2F84OP%2F%2FRET%2F%2Fy4u%2F%2F8xMf%2F%2FUVH%2F%2Fy4u%2F%2F8PD%2F%2F%2FZWX%2F%2Fx0d%2F%2F9aWv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F88PP%2F%2FCgr%2F%2F%2F%2F%2F%2F%2F8zM%2F%2F%2F1NT%2F%2F%2F%2F%2F%2F%2F%2Blpf%2F%2Fubn%2F%2F%2F%2F%2F%2F%2F%2Burv%2F%2FfHz%2F%2F%2F%2F%2F%2F%2F%2Fg4P%2F%2FFhb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FMzP%2F%2FwoK%2F%2F%2F%2F%2F%2F%2F%2FNDT%2F%2F8vL%2F%2F9ycv%2F%2FpaX%2F%2F7Cw%2F%2F9jY%2F%2F%2Fs7P%2F%2F8nJ%2F%2F9XV%2F%2F%2FeXn%2F%2FyIi%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FzMz%2F%2F8LC%2F%2F%2F%2B%2Fv%2F%2FzMz%2F%2F%2FGxv%2F%2FhYX%2F%2F6Ki%2F%2F%2BsrP%2F%2FW1v%2F%2F6ys%2F%2F%2B3t%2F%2F%2F2tr%2F%2F93d%2F%2F8PD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F80NP%2F%2FAgL%2F%2F%2Fb2%2F%2F8nJ%2F%2F%2F5ub%2F%2F56e%2F%2F%2B5uf%2F%2FoaH%2F%2F%2B%2Fv%2F%2F%2B5uf%2F%2FoKD%2F%2F%2BLi%2F%2F%2Ff3%2F%2F%2FAgL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FMzP%2F%2FwUF%2F%2F%2F%2F%2F%2F%2F%2FSkr%2F%2F0pK%2F%2F9NTf%2F%2FNTX%2F%2F97e%2F%2F%2Bysv%2F%2FNzf%2F%2FxIS%2F%2F%2Bmpv%2F%2FKyv%2F%2Fz09%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FxkZ%2F%2F%2FY2P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8nJ%2F%2F%2FEBD%2F%2FwAA%2F%2F%2Fy8v%2F%2FLy%2F%2F%2FwAA%2F%2F8mJv%2F%2FHh7%2F%2F6mp%2F%2F92dv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Bvr%2F%2F%2FJib%2F%2FxMS%2F%2F8eIP%2F%2FMzP%2F%2FzY2%2F%2F84OP%2F%2FHh%2F%2F%2Fy4u%2F%2F9XV%2F%2F%2Fhoj%2F%2F8LC%2F%2F%2FR0f%2F%2Fqqr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAAAA%2F8zMzP%2Fu7u7%2FIiIi%2FwAAAP8iIiL%2F%2F%2F%2F%2F%2FzMzM%2F8AAAD%2FAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwAAAP%2FMzMz%2F%2F%2F%2F%2F%2FyIiIv%2Fu7u7%2FERER%2F7u7u%2F8AAAD%2FiIiI%2FxEREf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2B7u7v8AAAD%2FzMzM%2F%2F%2F%2F%2F%2F8iIiL%2F7u7u%2FxEREf%2B7u7v%2FAAAA%2F8zMzP8RERH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F93d3f%2FAAAA%2F1VVVf%2Fu7u7%2FIiIi%2FwAAAP8iIiL%2F%2F%2F%2F%2F%2FwAAAP%2FMzMz%2FERER%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fd3d3%2FAAAA%2F4iIiP8AAAD%2F3d3d%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwAAAP%2F%2F%2F%2F%2F%2FAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D%3D\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var RATEYOURMUSIC_URL = REDIR + "http://www.google.com/search?&q=site:rateyourmusic.com+inurl:artist+intitle:%22Albums+by%22+intitle:%22%s%22&btnI";
	var RATEYOURMUSIC_LINK = "<a href=\""+ RATEYOURMUSIC_URL + "\" target=\"_blank\"><img title=\"RateYourMusic\" src=\"data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F4QAWRXhpZgAATU0AKgAAAAgAAAAAAAD%2F%2FgATQ3JlYXRlZCB3aXRoIEdJTVD%2F2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH%2F2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH%2FwAARCAAQABADASIAAhEBAxEB%2F8QAFQABAQAAAAAAAAAAAAAAAAAACQj%2FxAAeEAABBQEBAAMAAAAAAAAAAAAGAgMEBQcIAQkWF%2F%2FEABUBAQEAAAAAAAAAAAAAAAAAAAQH%2F8QAIBEAAgMAAgIDAQAAAAAAAAAAAQMCBAURIQYTAAcSFP%2FaAAwDAQACEQMRAD8Ae0RChwHrGqsermYqfGWWpc5TbSrO1Wx68tMm1nIbbcmPeOSZC20q8THiePrYgsRYnjcdBScI25ltmCZzlWuEszU9BreF%2BI%2BkxncS1bDOjTE9Jiurxvc%2F0G4hQXVGf0syx0pmRz6QxGuykINxyqMqi%2B1III9o1OePktwrvXsQ0ysj427uhcnjwUHXA%2Fo%2BNkuqanz5LjHkm%2FdfeKkGuWDtvZad5b1keHR%2BjxMxAh5w0Kx7OjaTaaWWwa5FM0%2FLuPubc%2BxsKIxYpMg%2FKssBLs9GaGnH0HRLnmVB%2BNQNQL1RpF7X%2B3ChvOxmvj1VtfEtzEpqgWFPZz9DXQp0aN0PHvsOnuKspGw7zfQ1qz3WXV9GLsp1SyS65razVfzzy7FdkZOfGwzPs0ZBkJ2anqYXTbUkog%2BsVorkBEGHExIdRWsHn9gjocCYl11LkfP%2F2Q%3D%3D\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var GROOVESHARK_URL = REDIR + "http://listen.grooveshark.com/search?q=%22%s%22";
	var GROOVESHARK_LINK = "<a href=\""+ GROOVESHARK_URL + "\" target=\"_blank\"><img title=\"Grooveshark\" src=\"data:image/jpeg;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADmqDhI3IMQ59p9Cv/LRwj/2n0K/9p9Cv/JRQj/zVAI/9p9Cv/afQr/zVAI/81QCP/NUAj/0FsJ/8tNDOfeii1I1FgO5OKNL//uvFD/7LVL/+68UP/mnzz/7rxQ/+afPP/opUD/7rxQ/+ilQP/opUD/5p88/+afPP/pqjv/0lQO5ON9Cv/rpUH/8b9Y//G/WP/xv1j/8b9Y/+ulQf/xv1j/66VB/+2uSf/rpUH/7KpG//G/WP/xv1j/8b9Y/+WHC//mfQr/9cRg//O9Wv/75pn/++iD//fQa//1xGD/8KtI//ndi//76IP/++aZ//O9Wv/ytlP/8rlV//rkkf/531D/yNmC//fBYf/W04j/fH5b/1NWQf+kpnf/+tp9//vjnP+Vl2j/U1ZB/3x+W//W04j/+dF5/9/cov9wclL/Cj6m/wY/z//a4Kr/LlBw/xQbLP8TFCH/EBIg/4OBYf+EgmL/EBIg/xMUIf8SEyH/ICMp/9/cq/8uabf/KIfm/wQr0/8GWuD/Wazi/0uq7/9AkdD/GSA7/xQUK/8nKDb/Jic1/xQUK/8UFCv/FBQr/yRQf/9Mmt7/MZfr/zme7P8EPtn/BmHk/0uu8f9Qs/L/Sazx/zdyp/8SEjX/ERE0/xERNP8SEjX/EhI1/xs1Yf85oev/MJnt/zSe7v80nu7/BE7g/wVy6v9UtvT/bsv3/1q59P9Jp+X/ERE//xERQP8REUD/ERFA/xUhU/80l9//Pqnx/zel8f83pvH/PKjy/wVq6P8GkO//etD5/5Dn/P+H2vr/cMv3/xETT/8PD0z/EBBN/xUiYv89n93/PLD0/0Ky9f88rvP/VcD3/1W69v8Ecez/BZ/z/3PN+f+W3Pv/YMX4/2jJ+f8RFF3/EBBb/x09i/9Fsuf/Rb/4/0K79/9Iuvj/UsH4/3HS+v9Pu/f/A3rv/wSj9f950fr/j9n7/4jW+/920vr/HjOI/0GUyv9Zz/n/Us/7/1jO+v9a0Pv/bdT7/4nj/P+N6f3/Zs/6/wOb9f8Dpvn/fNT8/4PW/P+N2v3/oOH9/5Pg/f9s3fz/Zt79/2Xe/f9l3Pz/dtv9/37a/P+F3/3/keX9/2PN/P8Cj/f/Aq75/5vf/f+P3fz/l+D9/6Xl/f+w6v7/ker+/2rp/v9q6f7/ier+/3/k/v993v3/etv9/4Pd/f901/3/Apb5/yW6+Oar5v7//////////////////////////////////////////////////P///+D////k////g9/+/wqc8+bI5vI2Tr/1xynB//8zyf//WdX//0vf//9L6f//ifH//4Hx//9H6f//M93//wXN//8Avf//AK///xel6sSkzuIvAAAAAAAAAAAAACofAAAAAAAAW0gAAHQgAABobgAAc2gAAGRlAAAtYwAAcHUAAHIuAABjYQAAIFsAAG5kAAAEAA==\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\"></a>";
	var SOUNDCLOUD_URL = REDIR + "http://soundcloud.com/search?q=%22%s%22";
	var SOUNDCLOUD_LINK = "<a href=\""+ SOUNDCLOUD_URL + "\" target=\"_blank\"><img title=\"SoundCloud\" src=\"data:image/jpeg;base64,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\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\" height=16 width=16></a>";
	var FACEBOOK_URL = REDIR + "http://www.facebook.com/search/?init=srp&sfxp=&q=%s&o=65&c1=19";
	var FACEBOOK_LINK = "<a href=\""+ FACEBOOK_URL + "\" target=\"_blank\"><img title=\"Facebook\" src=\"data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKx5Yf+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+seWH/AAAAAAAAAACeYkX/tIRt/7SEbf+0hG3/tIRt/7SEbf+0hG3/tIRt////////////tIRt/7SEbf+0hG3/nmJF/wAAAAAAAAAAnmJF/7SEbf+0hG3/tIRt/7SEbf+0hG3/tIRt/7SEbf///////////7SEbf+0hG3/tIRt/55iRf8AAAAAAAAAAJhZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv///////////+YWTv/mFk7/5hZO/+YWTv/AAAAAAAAAACYWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7////////////mFk7/5hZO/+YWTv/mFk7/wAAAAAAAAAAmFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO////////////5hZO/+YWTv/mFk7/5hZO/8AAAAAAAAAAJhZO/+YWTv/mFk7/5hZO/+YWTv/mFk7//Tu6//07uv////////////07uv/9O7r/5hZO/+YWTv/AAAAAAAAAACYWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/////////////////////////////////+YWTv/mFk7/wAAAAAAAAAAmFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO////////////5hZO/+YWTv/mFk7/5hZO/8AAAAAAAAAAJhZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv///////////+YWTv/mFk7/5hZO/+YWTv/AAAAAAAAAACYWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7//Tu6/////////////////+YWTv/mFk7/wAAAAAAAAAAmFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+reGD/9O7r////////////mFk7/5hZO/8AAAAAAAAAAJhZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/AAAAAAAAAACseWH/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/mFk7/5hZO/+YWTv/rHlh/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//+bvIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAA//8AAA==\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\" height=16 width=16></a>";
	var BANDCAMP_URL = REDIR + "http://www.google.com/search?q=site%3Abandcamp.com+%22%s%22";
	var BANDCAMP_LINK = "<a href=\""+ BANDCAMP_URL + "\" target=\"_blank\"><img title=\"BandCamp\" src=\"data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAComWG0qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/KiZYTAAAAAAAAAAAAAAAAAAAAAAqJlhJ6iZYfyomWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWG6AAAAAAAAAAAAAAAAAAAAAAAAAAComWGWqJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYUsAAAAAAAAAAAAAAAAAAAAAqJlhEqiZYfComWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWHYqJlhAwAAAAAAAAAAAAAAAAAAAAComWF4qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYWkAAAAAAAAAAAAAAAAAAAAAqJlhBqiZYduomWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWHtqJlhDAAAAAAAAAAAAAAAAAAAAAComWFaqJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYYcAAAAAAAAAAAAAAAAAAAAAAAAAAKiZYcOomWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWH5qJlhIQAAAAAAAAAAAAAAAAAAAAComWE8qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYf+omWH/qJlh/6iZYaUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD//wAAAB8AAIAPAACADwAAwAcAAOAHAADgAwAA8AEAAPABAAD4AAAA//8AAP//AAD//////////w==\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\" height=16 width=16></a>";
	var MUSICBRAINZ_URL = REDIR + "http://musicbrainz.org/search/textsearch.html?query=%s&type=artist&an=1&as=1";
	var MUSICBRAINZ_LINK = "<a href=\""+ MUSICBRAINZ_URL + "\" target=\"_blank\"><img title=\"MusicBrainz\" src=\"data:image/x-icon;base64,R0lGODlhEAAQAPcAAAUFBRsbJSUlMEVQRVBQZWVlW3Bwe3BwsJubkKWlpbCFO7u7u9DQxdDb0PvFZfv7+wEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQAAACH5BAEAAP8ALAAAAAAQABAAQAiPAP8dGEiQYAAAAwQcEEgQwAMACBs8mAig4EAACyY+aFDAYcUDACRqBOCgpEmTFgUAEIBA40OLIB8cFECAgMeBDhQc9BggwUQEAgSUVLByAIAAJ5M6gHlAZQADEj8WFDAgo8uXFh0+AHr0ZtaHBHZ6PelRgMsGJHM+XbAArUqIK02G1DgAqdKS/3IquHvyX0AAOw==\" style=\"border-width: 0px; padding: 1px 1px 1px 1px;\" height=16 width=16></a>";


	
	// base64 encoded pics
	var TOGGLE_IMG_PLUS		= "data:image/gif;base64,R0lGODlhCQAJAIAAAOLn7UtjfCwAAAAACQAJAAACEYyPoAu28aCSDSJLc44s3lMAADs%3D";
	var TOGGLE_IMG_MINUS		= "data:image/gif;base64,R0lGODlhCQAJAIAAAOLn7UtjfCwAAAAACQAJAAACEIyPoAvG614L80x5ZXyohwIAOw%3D%3D";
	var SPINNER_IMG       = "data:image/gif;base64,R0lGODlhEAAQAPMAAP%2F%2F%2FwAAAAAAAIKCgnJycqioqLy8vM7Ozt7e3pSUlOjo6GhoaAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJCgAAACwAAAAAEAAQAAAEKxDISau9OE%2FBu%2F%2FcQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv%2FXJEMxIFg4VieV0qaqCC%2BrOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2F9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo%2BUCAAh%2BQQJCgAAACwAAAAAEAAQAAAEMRDISau9OE%2FBu%2F%2BcghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FnKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FHKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv%2FnKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2FxymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo%2FICAAh%2BQQJCgAAACwAAAAAEAAQAAAEJhDISau9OE%2FBu%2F%2BcthBDEmZjeWKpKYikC6svGq9XC%2B6e5v%2FAICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7%2Fxy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo%2FICAAh%2BQQJCgAAACwAAAAAEAAQAAAEMRDISau9OE%2FBu%2F%2BctRBDUhgHElZjeaYr1ZqoKogkDd9s%2Fto4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FHLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv%2FnLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv%2F3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA%3D";

	var SEARCH_IMG = "data:image/gif;base64,R0lGODlhDgAOANUAAPr6%2Bri4uPLy8vz8%2FMbGxtjY2Pf3997e3vv7%2B9bW1rq6utPT07u7u7S0tLKystzc3NDQ0MPDw7CwsO%2Fv783NzczMzNTU1PT09NXV1ezs7LW1tc%2FPz7Ozs%2FPz86mpqevr6%2Fb29v39%2Fbm5uf7%2B%2Fqampv%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAOAA4AAAZvwJJwSCwOB6GRcmm0MDwMzMVYIpCuV0KnuCCJEp9EgLQoikgFA8BQ8I6IHlInVAp1SB768PwYPrwDRBAkCgcABwokFHpCGRFYWA4gRAgfGwEeARUOJA2TQiMIIAITAh0fDSQanyVvRAAfHBICVFRBADs%3D";

	var EXPLORE_SIMILAR_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAAK%2FINwWK6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAAASAAAAEgARslrPgAAAOFJREFUOMvVUqFuw1AMvE7VpHxAQHDA0Da4gf5DUL4kLN%2FzWFDQAwNT2camRQMJHA0NsC9O3lCrri3oFtSTLFuWfD75vAohYAluFk1fH0FZli9FUdz%2Bm0BVNyLyddhbhRDgnAsAYGYwM5AESagqVBUiAlVFHMcgia7rPp1zjwCw3jGlaYp5njFN068ws5M8DMNDlmXvdV0%2FrQ837wiOh47rcRxBctwrMDM0TXNWtohARBBFEZIkQd%2F3aNv2w3u%2F2d%2FgEuR5%2FkzyleS39%2F7uzy5UVfVGcmtm9ycuLMGVvfI5%2FADcE8BIG7ekhwAAACJ6VFh0U29mdHdhcmUAAHjac0zJT0pV8MxNTE8NSk1MqQQAL5wF1K4MqU0AAAAASUVORK5CYII%3D";
	// Array(match_re, replace_string)
	var ARTIST_RE 			= new Array(/http:\/\/oink\.me\.uk\/search\.php\?artist=(.*)/, 	'$1');
	var ARTIST_BIO_RE 		= new Array(/\/music\/(.*)\/\+wiki/, 				'http://www.last.fm/music/$1/+wiki');
	var LASTFM_LINK_RE 		= new Array(/\/music\/(.*)/, 					'http://www.last.fm/music/$1');
	var artist;

	var FLASH_CONTAINER_URL = "http://www.naptoon.com/oinkplus/c.swf";
	
	var FLASH_CONTAINER = "<object type=\"application/x-shockwave-flash\" data=\"" + FLASH_CONTAINER_URL + "?path=%MOVIE\"  width=\"%WIDTH\" height=\"%HEIGHT\" ><param name=\"movie\" value=\"" + FLASH_CONTAINER_URL + "?path=%MOVIE\"  quality=\"high\" allowscriptaccess=\"always\"/></object>";
	
	//var cache = new Cache(CACHE_SIZE);

	var date = new Date();
	installTime = GM_getValue('installTime', 0);
	if (installTime == 0){ 
		installTime = date.getTime() + "";
		GM_setValue('installTime',installTime);
	}



var site_functions =({ 
what:	{	
				name:	"What.cd", 
				url:	{		0:"what.cd/torrents.php\\?id=",
							1:"what.cd/artist.php\\?id="	
							},
				searchurl: "http://what.cd/artist.php?artistname=%s",
				css: ".artistHeadline {font-size: 10pt;text-align:left;} \
				     font-size: 10pt !important;}",
				version:"1",
				isAudioRelease: "var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"heading\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(Apps|Comics|E-books|E-learning videos)\"))) \
													return false; \
												break; \
											}	\
										} \
										return true",
				hook: "var divs = document.getElementsByTagName(\"div\");\
										var centertable; \
										for (var i = 0; i < divs.length; i++){ \
											if (divs[i].className == \"main_column\") {\
												centertable =  divs[i]; \
												break; \
											}	\
										} \
										hook = centertable.firstChild.nextSibling.nextSibling.nextSibling;\
										myDiv = document.createElement(\"div\"); \
										myDiv.className = 'box'; \
										myHeadline = document.createElement(\"div\");\
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										myHeadline.appendChild(toggleDiv);\
										myHeadline.appendChild(document.createTextNode(' '));\
										myBoldText = document.createElement('b'); \
										myBoldText.textContent = 'OiNKPlus'; \
										myHeadline.appendChild(myBoldText);\
										myHeadline.className='head'; \
										myDiv.appendChild(myHeadline);\
										myNode = document.createElement(\"div\"); \
										myNode.className = 'OiNK'; \
										myNode.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										myDiv.appendChild(myNode); \
										hook.parentNode.insertBefore(myDiv, hook.nextSibling); \
										seperator = document.createElement(\"div\"); \
										seperator.setAttribute('style','clear: both');\
										hook.parentNode.insertBefore(seperator, myDiv.nextSibling);",
				findArtist: "var h2s = document.getElementsByTagName(\"h2\");   \
											if (h2s.length > 0) {   \
												var str = h2s[0].textContent;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
												else return str.replace(/^\\s+|\\s+$/g,\"\"); \
											} \
											return '';",
				morelink: "/artist.php?name=%s",
				icon: "data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsrKwAsLCwALGxsQC3t7cAuLi4AL%2B%2FvwDBwsEAwsLCAM7OzgDPz88A0NDQANLS0gDV1NUA1dXUANTV1QDV1tYA1tbWANnZ2QDb2toA29rbAN3d3QDe3d4A3d7eAN%2Ff3wDf4N8A4uLiAOPi4gDk5OQA5OXlAObm5gDn5%2BcA6OnoAOnp6QDr6usA7OzsAO3s7ADu7u0A7e7uAO7u7gDx8fEA8vLyAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAkCAAAAABQUAAAAAAIJFBQCAwoODQAUFAAQEAsEAhQUAAwREREAFBQAEhMSDwAUFAAWFQAAABQUAAAAFxgAFBQAGRoFFBQUFBQUBRscABQUAB4eAAAAFBQAAAAgIAAUFAAdIyMjABQUACQlJh8AFBQBBiEnJwAUFAAoKCIHARQUCAEAAAAAFBQAAAAAAQgUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%3D"
	},
	wafflesfm:	{	
				name:	"Waffles.fm", 
				url:	{		0: "waffles.fm/details.php",
							1: "88.80.6.249/details.php"
							},
				searchurl: "http://waffles.fm/browse.php?artist=%s&s=year&d=desc",
				css: "",
				version:"1",
				isAudioRelease: "var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"heading\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(Apps|Components|eBook)\"))) \
													return false; \
												break; \
											}	\
										} \
										return true",
				hook: "var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"rowhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
											} \
											return '';",
				morelink: "/browse.php?q=%2Bartist%3A%22%s%22",
				icon: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09tEXtX-Index%000%B4%C3%9Cb%00%00%00%86IDAT8%8Dcd%60%60%60XQ%C7%FF%9F%81%0C%10%D1%F4%91%91eE%1D%FF%7F%2F%EF%3F%0C%0C%0C%0C%0C%DB%B6%B20%90%C2%5E%C1%C0%FF%9F%09f%DA%E53%BF%18%C8a3%92%EB%7C%18%60b%60%60%60%F0%F2%FE%03wVD%D3G%86%88%A6%8F%0C%C4%8Ac%F5%C2%D1%A9%ACX%9D%8DM%9C%FA%5E%20%95M%FDX%80%05%14.%B0%A2%8E%1F%BF%17%3E%9D%E4%C6%A9%19%26GR%2C%20k%A6OB%A2%7F%2C00P%96%9D%011f%9B%8E%FA%CB3%86%00%00%00%00IEND%AEB%60%82"
	},
	musicvids:	{	
				name:	"musicvids", 
				url:	{		0: "music-vid.com/details.php"
							},
				searchurl: "http://music-vid.com/browse.php?search=%s&searchtype=1",
				css: "",
				version:"1",
				isAudioRelease: "return true",
				hook: "var centertable = document.getElementById(\"oinkpluslocation\");\
						document.getElementById('spam').innerHTML='';\
						centertable.style.dispay='inline';\
						var new_row = document.createElement('div');\
						toggleDiv = document.createElement(\"div\"); \
						toggleDiv.id = \"toggleOiNKPlus\"; \
						new_row.appendChild(document.createElement('div'));\
						new_row.firstChild.appendChild(toggleDiv);\
						new_row.firstChild.appendChild(document.createTextNode(' ' + 'Oinkplus'));\
						var div = document.createElement('div');\
						div.id = 'OiNKPlus';\
						new_row.firstChild.appendChild(div);\
						centertable.appendChild(new_row);\
						",
				findArtist: "var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												return h1s[0].getElementsByTagName('b')[0].innerHTML; \
											} \
											return '';",
				morelink: "/browse.php?searchtype=1&search=%s",
				icon: "data:image/x-icon;base64,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4ACAYAAAgGAgAIBgQACAYGAAgGCAAIBgoACAYMAAgGDgAICAAACAgCAAgIBAAICAYACAgIAAgICgAICAwACAgOAAgKAAAICgIACAoEAAgKBgAICggACAoKAAgKDAAICg4ACAwAAAgMAgAIDAQACAwGAAgMCAAIDAoACAwMAAgMDgAIDgAACA4CAAgOBAAIDgYACA4IAAgOCgAIDgwACA4OAAwAAAAMAAIADAAEAAwABgAMAAgADAAKAAwADAAMAA4ADAIAAAwCAgAMAgQADAIGAAwCCAAMAgoADAIMAAwCDgAMBAAADAQCAAwEBAAMBAYADAQIAAwECgAMBAwADAQOAAwGAAAMBgIADAYEAAwGBgAMBggADAYKAAwGDAAMBg4ADAgAAAwIAgAMCAQADAgGAAwICAAMCAoADAgMAAwIDgAMCgAADAoCAAwKBAAMCgYADAoIAAwKCgAMCgwADAoOAAwMAAAMDAIADAwEAAwMBgAMDAgADAwKAA8Pv/AKSgoACAgIAAAAD/AAD/AAAA//8A/wAAAP8A/wD//wAA////AC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLx0SLi8SLx0SLi8dExMvLy8VAB4eAC4dAB4vEgAALy8vHQAeHQAdHQAeL0kAAC4vLx0AHhMAEx0AHi8AEgAeLy8dAB4AEhIdAB4vABMAHS8vHQAdABMAHQAeHgAdAB0vLx0AEwAeABMAHh0AHgoSLy8dABIALwAAAB4dAB4SEi8vHQAAEi8AAAAeEwAvEwAvLx0AABMvEgAAHhIALx0ALi8dAAAdLxMAAB4SAC8dAB4vHh0bLi8eHR0uHR0vLh0eLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
	},	
	funkytorrents:	{	
				name:	"FunkyTorrents", 
				url:	{		0: "funkytorrents.com/details.php",
							1: "213.248.54.223/details.php*"
							},
				searchurl1: "http://funkytorrents.com/browse.php?search=%s",
				searchurl: null,
				css: "",
				version:"1",
				isAudioRelease: "var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"heading\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(Apps|Movie|eBooks|Music Vids)\"))) \
													return false; \
												break; \
											}	\
										} \
										return true",
				hook: "var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"rowhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
											} \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split('-').length > 1) {  \
													return str.split('-')[0].replace(/^\\s+|\\s+$/g,\"\").replace(/_/g,\" \"); \
												} \
											} \
											return '';",
				morelink: "/browse.php?search=%s\">% FunkyTorrents"
	},
  mininova:	{	
				name:	"Mininova", 
				url:	{		0: "mininova.org/tor/",
							1: "87.233.147.140/tor/"
							},
				searchurl: "http://mininova.org/search/%22%s%22/5/seeds",
				css: "",
				version:"1",
				isAudioRelease: "var hints = [\': Music &gt;\']; \
												 for (var i= 0; i< hints.length; i++)   \
													if (document.getElementsByTagName(\'title\')[0].innerHTML.indexOf(hints[i]) > 0) { \
															return true; \
													} \
													return false;",
				hook: "			myDiv = document.createElement(\"div\"); \
										myHeadline = document.createElement(\"h2\");\
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										myHeadline.appendChild(toggleDiv);\
										myHeadline.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										myDiv.appendChild(myHeadline);\
										myDiv.appendChild(document.createElement('br')); \
										myNode = document.createElement(\"div\"); \
										myNode.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										myDiv.appendChild(myNode); \
										document.getElementById(\"content\").appendChild(document.createElement('br')); \
										document.getElementById(\"content\").appendChild(myDiv);",
				findArtist: "var title = document.getElementsByTagName(\'title\')[0].innerHTML; \
											title = title.replace(' - Mininova', ''); \
											if (title.indexOf(\"-\") < 0 ) return null; \
											var myartist = title.replace(/\\[.*?\\]/g,\"\").replace(/_/g,' ').split(\"-\")[0]; \
											return myartist.replace(/(^( )*)|(( )*$)/g,\"\").replace(/[ ]{2,}/gi,\" \");",
				morelink:   "/search/%22%s%22/5/seeds",
				icon: "data:image/x-icon;base64,AAABAAEAEBAQAAAAAAAoAQAAFgAAACgAAAAQAAAAIAAAAAEABAAAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA%2F%2F%2F%2FAOJwNgDws5QAh0ogAPjZygDpkmYA9MmzAOaATQDsonwA%2B%2BriAO6riQDyvKIA5HY%2FAPni1gDnh1cARERERERERERBERERERERFEEREREREREUQRERERERERRBInHiLhciFEEiceIuFyIUQSJx4i4XIhRBIsHiJRciFEEiYXIjEygUQSIv0tJtKxRBiMYoVY2aFEEREREREREUQRERERERERRBERERERERFEEREREREREUREREREREREQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
			},
  thepiratebay:	{	
				name:	"ThePirateBay", 
				url:	{		0: "thepiratebay.org/torrent/",
							3: "83.140.176.146/torrent/"
							},
				searchurl: "http://thepiratebay.org/s/?q=%s&audio=on&searchTitle=on&page=0&orderby=7",
				css: ".artistHeadline {font-size: 12pt;}\
				      h2 {clear:none !important; text-align:left !important;}",
				version:"1",
				isAudioRelease: "var hints = [\'/browse/101\']; \
												 for (var i= 0; i< hints.length; i++)   \
													if (document.getElementById(\"details\").innerHTML.indexOf(hints[i]) > 0) { \
															return true; \
													} \
													return false;",
				hook: "			myDiv = document.createElement(\"div\"); \
										myHeadline = document.createElement(\"h4\");\
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										myHeadline.appendChild(toggleDiv);\
										myHeadline.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										myDiv.appendChild(myHeadline);\
										myDiv.appendChild(document.createElement('br')); \
										myNode = document.createElement(\"div\"); \
										myNode.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										myDiv.appendChild(myNode); \
										var divs = document.getElementsByTagName(\"div\");\
										var nfoDiv; \
										for (var i = 0; i < divs.length; i++){ \
											if (divs[i].className == \"nfo\") {\
												nfoDiv =  divs[i]; \
												break; \
											}	\
										} \
										nfoDiv.parentNode.insertBefore(myDiv, nfoDiv.nextSibling);",
				findArtist: "var title = document.getElementsByTagName(\'title\')[0].textContent.replace(/\(download torrent\) - TPB/,\"\"); \
											if (title.indexOf(\"-\") < 0 ) return null; \
											var myartist = title.replace(/\\[.*?\\]/g,\"\").replace(/_/g,' ').split(\"-\")[0]; \
											return myartist.replace(/(^( )*)|(( )*$)/g,\"\").replace(/[ ]{2,}/gi,\" \");",
				morelink:   "/s/?q=%s&audio=on&searchTitle=on&page=0&orderby=7",
				icon: "data:image/x-icon;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FPz8vb297Ozs%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F4uLiSUlJ3d3d%2F%2F%2F%2F%2F%2F%2F%2F8%2FPzEhIScnJy8fHx%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8fHxwsLCWFhYAAAAyMjI%2F%2F%2F%2F%2F%2F%2F%2F5%2BfnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8%2FYGBgjo6O0dHR%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F7%2B%2FvxcXFnZ2dg4ODExMTQEBAv7%2B%2FAAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6%2BvsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB%2Fv7%2B%2FPz8%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FnJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2%2Bvr6%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Frq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fr6%2BvAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fq6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2Fv7%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FAAA%3D"
			},
	scenesound:	{	
				name:	"scenesound3", 
				url:	{		0: "scenesound.org/details.php",
							},
				searchurl: "http://scenesound.org/browse.php?search=%s",
				css: "",
				version:"1",
				isAudioRelease: "return true;",
				hook: "var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"rowhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var as = document.getElementsByTagName(\"a\");   \
											for (var i = 0; i < as.length; i++){ \
												if (as[i].className == \"index\") { \
													str =  as[i].firstChild.innerHTML; \
													break; \
												}	\
											} \
											str = str.replace(/\\[[^\\]]*\\]/g, '');  \
											if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
											} \
											if (str.split('-').length > 1) {  \
													return str.split('-')[0].replace(/^\\s+|\\s+$/g,\"\").replace(/_/g,\" \"); \
												} \
											return '';",
				morelink: "/browse.php?search=%s",
				icon: "data:image/x-icon;base64,AAABAAIACAgAAAEAIABIAQAAJgAAABAQAAABACAAaAQAAG4BAAAoAAAACAAAABAAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYGBf8AAAAACAkIvwYGBv8GBgb%2FDQ0N%2FwAAAP8AAAAAEBEP%2FwAAAAAAAAAADA0M%2FwwNDf8ODg7%2FAQEB%2F4mMioBISEj%2FExQSQAAAAAAAAAAAISIhvwICAv8ODg7%2Fn6CggKampv8wMC6AAAAAAAAAAAAAAAC%2FAAAA%2FwoLC%2F8AAAAALS8rQAAAAAAeIB5ACAgI%2FwAAAP8AAAD%2FGRoa%2FwAAAAAAAAAAAAAAAAAAAAAAAAD%2FAAAA%2FwAAAP8KCwq%2FAAAAAAAAAAAAAAAAAAAAAAkJCb8AAAD%2FAAAA%2FyQmJIAAAAAAAAAAAAAAAAAAAAAAAAAAAA0ODUARERGAAAAAAKAAAACwAAAAOAAAABgAAADwAAAA8AAAAPAAAAD9AAAAKAAAABAAAAAgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgICgAgICEAAAAAAAAAAAAsLCkAAAACAAwMDgAsLC4AEBAWADAwMgBISEoABAQGAAAAAgAAAAEAAAAAAAAAAAAQEBP8MDAuAAAAAAAAAAAAODw5AAgIC%2FwMDA%2F8NDg7%2FCAgI%2FwkJCf8SEhL%2FAgIC%2FwAAAP8AAACAAAAAAAAAAAAICAj%2FFhgWgAAAAAAAAAAAAAAAABYXFr8CAgL%2FDAwM%2FxISEv8EBAT%2FDg8P%2FwwMDP8BAQH%2FAAAAgAAAAAAAAAAACAgH%2FxweGoAAAAAAAAAAAAAAAAAAAAAAERIQvwgICP8QEBD%2FAgIC%2FwoKCv8UFBT%2FAwMD%2FwAAAIAAAAAAJCUkgAoKCv8MDQyAAAAAAAAAAAAAAAAAAAAAAAAAAAAjJCNAHR4evwUFBf8DAwP%2FEBEQ%2Fw4ODv8CAgKAAAAAALS2tP%2BCgoP%2FHx4e%2FxYXFUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASEhL%2FAQEB%2FwoKCv8VFRX%2FBAQEgMDAwID19vX%2F6Ojo%2F2xrbP8eIB6AAAAAAAAAAAAAAAAAAAAAAAAAAAAlJiVACQkJ%2FwAAAP8FBQX%2FDg4O%2FwYGBoCJi4lAfn9%2B%2F5mZmf%2BBgoH%2FS01KvwAAAAAAAAAAAAAAAAAAAAAAAAAAEBIR%2FwAAAP8AAAD%2FAgIC%2FwoLCv8MDgyAAAAAAC8xMEBQUE%2BAgYKBQAAAAAAAAAAAAAAAAAAAAAAUFhSACwsKvwAAAP8AAAD%2FAAAA%2FwMDA%2F8MDQz%2FDhAQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaHBq%2FBgcG%2FwAAAP8AAAD%2FAAAA%2FwAAAP8HBwf%2FHh4e%2FyYmJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBoYgAEBAf8AAAD%2FAAAA%2FwAAAP8AAAD%2FAgIC%2FxESEv8aHByAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgL%2FAAAA%2FwAAAP8AAAD%2FAAAA%2FwAAAP8MDQ2%2FAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAsK%2FwAAAP8AAAD%2FAAAA%2FwAAAP8GBwb%2FGBkYgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYF0AFBQX%2FAQEB%2FwAAAP8AAAD%2FCwwL%2FyIjIkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgZGL8ICQj%2FCAgI%2FxQUFIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHh8eQBseG0AAAAAAAAAAAAAAAADeAQAAzgAAAM4AAADPAAAAj8AAAI%2FgAAAH4AAAh8AAAN8AAAD%2BAAAA%2FgAAAP8BAAD%2FAQAA%2F4MAAP%2FDAAD%2F%2FwAA"
	},
  kraytracker:	{	
				name:	"Kraytracker", 
				url:	{		0: "kraytracker.com/\\?cls=5\&id=",
							1: "64.34.39.105/\\?cls=5\&id="
							},
				searchurl: "http://kraytracker.com/?cls=2&act=audio&orderby=added&sortby=desc&artist=%s",
				css: ".artistHeadline {font-size: 12pt;} \
							.OiNKPlusHeadline {text-align:left }",
				version:"1",
				isAudioRelease: "var tds = document.getElementsByTagName(\"td\");\
													for (var i = 0; i < tds.length; i++){ \
														if (tds[i].className == \"td_dark\" && tds[i].innerHTML.indexOf(\"Artist\") > -1) { \
															return true; \
															break; \
														}	\
													} \
													return false;",
				hook: "			myDiv = document.createElement(\"div\"); \
										myHeadline = document.createElement(\"h4\");\
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										myHeadline.appendChild(toggleDiv);\
										myHeadline.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										myHeadline.className = \"OiNKPlusHeadline\"; \
										myDiv.appendChild(myHeadline);\
										myDiv.appendChild(document.createElement('br')); \
										myNode = document.createElement(\"div\"); \
										myNode.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										myDiv.appendChild(myNode); \
										var tds = document.getElementsByTagName(\"table\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"main\") {\
												centertable =  tds[i].parentNode.parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(myDiv);\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var title = document.getElementsByTagName(\'title\')[0].innerHTML; \
											title = title.replace('Kraytracker / ', ''); \
											if (title.indexOf(\"-\") < 0 ) return null; \
											var myartist = title.replace(/\\[.*?\\]/g,\"\").replace(/_/g,' ').split(\" - \")[0]; \
											return myartist.replace(/(^( )*)|(( )*$)/g,\"\").replace(/[ ]{2,}/gi,\" \");",
				morelink:   "/?cls=2&act=audio&orderby=added&sortby=desc&artist=%s",
				icon: "data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAODg4ODg4ODg4PDw8ODg4ODg4PDw8ODg4ODg4ODg4ODg4NDQ0PDw8ODg4ODg4ODg4ODg7%2F%2F%2F%2F%2F%2F%2F%2F%2B%2Fv7Z2dk9PT25ubn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FLy8sgICBAQED%2F%2F%2F8ODg4PDw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FX19c%2BPj66urr%2B%2Fv7%2F%2F%2F%2F%2B%2Fv7KysoiIiJAQED%2F%2F%2F%2F%2F%2F%2F8ODg4NDQ3%2F%2F%2F%2F%2B%2Fv7%2F%2F%2F%2FX19c%2FPz%2Ff39%2F%2F%2F%2F%2Fh4eF1dXUiIiJAQEDq6ur%2F%2F%2F%2F%2F%2F%2F8ODg4PDw%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2B1tbUxMTH09PT9%2Ff1XV1cBAQE1NTXd3d3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8ODg4ODg7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2BcnJxWVlb%2B%2Fv6bm5sgICBra2vl5eX%2F%2F%2F%2F%2B%2Fv7%2F%2F%2F%2F%2B%2Fv4PDw8PDw%2F%2F%2F%2F%2F6%2Bvr%2B%2Fv50dHSSkpK2trYVFRWdnZ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8ODg4ODg7%2F%2F%2F%2Fv7%2B%2FU1NRBQUFsbGxKSkqurq7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8ODg4ODg7%2F%2F%2F%2F%2F%2F%2F%2FLy8shISEnJyfQ0ND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8PDw8PDw%2F%2B%2Fv7%2F%2F%2F%2F09PROTk49PT3a2tr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F%2B%2Fv7%2F%2F%2F8ODg4ODg7%2F%2F%2F%2F%2F%2F%2F%2FT09NDQ0OsrKxYWFi8vLz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8PDw8ODg7%2B%2Fv7%2F%2F%2F%2B9vb0dHR3h4eHFxcVCQkKrq6v%2F%2F%2F%2F9%2Ff3%2F%2F%2F%2F%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F8ODg4ODg7%2F%2F%2F%2F%2F%2F%2F%2FDw8N4eHj19fX%2F%2F%2F%2FGxsYoKCiOjo7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8PDw8ODg7%2F%2F%2F%2F%2B%2Fv79%2Ff3%2F%2F%2F%2F%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2B1tbUMDAxxcXHx8fH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8ODg4ODg7%2B%2Fv7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2B6urpHR0efn5%2F%2B%2Fv7%2B%2Fv7%2F%2F%2F8PDw8ODg4ODg4PDw8ODg4NDQ0PDw8PDw8PDw8NDQ0ODg4ODg4NDQ0ODg4ODg4NDQ0ODg4AAP%2F%2FAAD%2F%2FwAA%2F%2F8AAP%2F%2FAAD%2F%2FwAA%2F%2F8AAP%2F%2FAAD%2F%2FwAA%2F%2F8AAP%2F%2FAAD%2F%2FwAA%2F%2F8AAP%2F%2FAAD%2F%2FwAAAAAAAAAA"
			},
	arenabg:	{	
				name:	"ArenaBG", 
				url:	{		0: "arenabg.com/details.php\\?id=",
							1: "85.14.6.83/details.php\\?id="
							},
				searchurl: null,
				css: "",
				version:"1",
				isAudioRelease: "var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"lista\" && tds[i].textContent.match(new RegExp(\"Category\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(Music/)\"))) \
													return true; \
												break; \
											}	\
										} \
										return false",
				hook: "var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"lista\" && tds[i].textContent.match(new RegExp(\"Category\"))) {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var title = document.getElementsByTagName(\'title\')[0].innerHTML; \
											title = title.replace('ArenaBG.com - ', ''); \
											title = title.replace(' - Torrent Details', ''); \
											if (title.indexOf(\"-\") < 0 ) return null; \
											str = title; \
											str = str.replace(/\\[[^\\]]*\\]/g, '');  \
											if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
											} \
											if (str.split('-').length > 1) {  \
													return str.split('-')[0].replace(/^\\s+|\\s+$/g,\"\").replace(/_/g,\" \"); \
												} \
											return '';",
				morelink: "/torrents.php?search=%s&category=23&active=1\">% ArenaBG"
	},
 	metaltorrents:	{	
				name:	"Romanian MetalTorrents", 
				url:	{		0:"metal.iplay.ro/details.php\\?id=", 
							1:"84.247.80.243/details.php\\?id="
							},
				searchurl: null,
				css: "",
				version:"1",
				isAudioRelease: "var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"heading\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(VA|rmtva|elearn|dvdr|discgrr)\"))) \
													return false; \
												break; \
											}	\
										} \
										return true",
				hook: "var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"rowhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										new_row.firstChild.innerHTML = \"\"; \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(' - RMT', ''); \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
											if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
											} \
											if (str.split('-').length > 1) {  \
													return str.split('-')[0].replace(/^\\s+|\\s+$/g,\"\").replace(/_/g,\" \"); \
												} \
											return ''; \
											} \
											return '';",
				morelink: "/browse.php?search=%s&cat=0",
				icon: "http://metal.iplay.ro/favicon.ico"
	},
	ct:	{	
				name:	"ChristianTorrents", 
				url:	{				0: "christiantorrents.com/details.php",
									1: "85.11.33.12/details.php"
							},
				searchurl: null,
				css: ".artistHeadline {font-size: 10pt;}",
				version:"1",
				isAudioRelease: "var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"heading\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(Appz|Debates|e-Books|Gaither|Lectures|Misc|Movies|Scores|Sermons)\"))) \
													return false; \
												break; \
											}	\
										} \
										return true",
				hook: "var tds = document.getElementsByTagName(\"table\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"coltable\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												centertable =  tds[i].firstChild; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
											} \
											return '';",
				morelink: "/browse.php?search=%22%s%22&nameonly=true\">% CT"
	},
	ex:	{	
				name:	"Ex", 
				url:	{				0: "exodusmusic.org/details.php",
									1: "111.111.111.111/details.php"
							},
				searchurl: null,
				css: ".artistHeadline {font-size: 10pt;}",
				version:"1",
				isAudioRelease: "return true",
				hook: "var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"colhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"colhead\") {\
												var str = tds[i].textContent.replace(/Details for: /,'');     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
											} \
										}\
											return '';",
				morelink: "/browse.php?search=%s\">% Exigo"
	},
	indietorrents:	{	
				name:	"Indietorrents", 
					url:	{		0: "indietorrents.com/details.php",
								1: "66.129.1.42/details.php"
							},
				searchurl: "http://www.indietorrents.com/browse.php?search=%s",
				css: "",
				version:"1",
				isAudioRelease: "return true;",
				hook: "var tds = document.getElementsByTagName(\"td\");\
										var centertable; \
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"rowhead\") {\
												centertable =  tds[i].parentNode.parentNode; \
												break; \
											}	\
										} \
										var new_row = centertable.lastChild.previousSibling.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = centertable.lastChild.previousSibling.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var h1s = document.getElementsByTagName(\"h1\");   \
											if (h1s.length > 0) {   \
												var str = h1s[0].innerHTML;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
											} \
											return '';",
				morelink: "browse.php?search=%s",
				icon: "data:image/x-ms-bmp;base64,Qk02BAAAAAAAADYAAAAoAAAAEAAAABAAAAABACAAAAAAAAAEAAATCwAAEwsAAAAAAAAAAAAAXGK%2F%2F42Wz%2F%2BIkc3%2Fho%2FM%2F46Xz%2F%2BJks3%2FiJHN%2F4mRzf%2BJkc3%2FiJHN%2F4mSzf%2BOl8%2F%2Fho%2FM%2F4mRzf%2BLlM7%2FV129%2F4OLzP%2Fs%2Bu7%2F6vjt%2F6y21%2F%2Btt9j%2F6%2Fjt%2F%2Bf17P%2Fj8ev%2F4%2FHr%2F%2Bb07P%2Fs%2Bu7%2FsbzZ%2F6iy1v%2Fp9%2Bz%2F6fft%2F3mAx%2F9%2Bhsr%2F4O7q%2F97r6f%2B4w9z%2FO0K0%2F4GMyv%2FV3uX%2F3uzp%2F97s6f%2FY5Ob%2Fho3L%2FztAs%2F%2Bxu9r%2F3%2B3q%2F93r6f91fMb%2FfobK%2F%2BDu6v%2Fa5%2Bj%2F2OPn%2F1hgvf8pWrf%2FXXjC%2F8TJ3%2F%2FH0%2BH%2FY2a%2F%2Fys9sf9SZr3%2F1eDl%2F9ro6P%2Fd6%2Bn%2FdXzG%2F36Gyv%2Fg7ur%2F2OXn%2F%2BHu6v%2BHjMv%2FL0e0%2FyuPwv9FeMD%2FSUu3%2FzI4sf8ta7r%2FgI%2FL%2F%2BDs6f%2FZ5uf%2F3evp%2F3V8xv9%2Bhsr%2F4O7q%2F9jl5%2F%2Fe7On%2Fu8bd%2Fz04sv81Y7r%2FLprG%2FzY5sv80db7%2FNnq%2F%2F7W62v%2Ff7er%2F2ebn%2F93r6f91fMb%2FfobK%2F%2BDu6v%2Fa5%2Bj%2F4%2B7q%2F7a%2F2%2F8%2FUrf%2FNz%2Bz%2Fzdwvf83Xbn%2FMonC%2FztSt%2F%2ByuNn%2F4%2FDq%2F9vo6P%2Fd6%2Bn%2FdXzG%2F36Gyv%2Fm9Oz%2F2uTn%2F5Oi0f88hML%2FLaHH%2FzOJwf86Wbf%2FOl64%2FzlNtv83NrH%2FQD60%2F5GYz%2F%2Fa5uf%2F4%2FHr%2F3V8xv%2BCisv%2Fxc%2Fg%2F153wv8nbLr%2FKnK9%2FzBauP82RrT%2FN2e7%2FzhXt%2F8ygsD%2FLXu%2F%2FyxduP8pQLH%2FX2a%2B%2F8LN3%2F94f8f%2FbHLD%2F3mBx%2F9aa7%2F%2FYW7B%2F2Nlv%2F9jYb%2F%2FQk%2B3%2FzCTxP82Q7T%2FQ1C4%2F1%2BHxv9hhsb%2FYH7E%2F1tnv%2F93fcb%2FZGnB%2F3qCyf%2Fc6un%2F2OTn%2F9jj5%2F%2FY5ef%2F3%2Bvp%2F3%2BPy%2F8piMH%2FLz6y%2F4CEyf%2Fg6ej%2F2eLm%2F9ji5v%2FZ5ef%2F2efo%2F3F4xf9%2Fh8r%2F4vDr%2F9rn6P%2Fa5%2Bj%2F2efo%2F%2BDt6v%2B1vNr%2FNHO9%2FzVItP%2Bxudn%2F4e7q%2F9nn6P%2Fa5%2Bj%2F2%2Bjo%2F9%2Ft6v92fcb%2FfobK%2F%2BDu6v%2FY5ef%2F2OXn%2F9jl5%2F%2Fa5%2Bj%2F1t7l%2F1Byv%2F9IWLn%2F0t3l%2F9rn6P%2FY5ef%2F2OXn%2F9nm5%2F%2Fd6%2Bn%2FdXzG%2F36Gyv%2Fg7ur%2F2OXn%2F9jl5%2F%2FY5ef%2F2eXn%2F%2BHu6v96hsj%2FbnjE%2F9%2Fs6f%2FY5ef%2F2OXn%2F9jl5%2F%2FZ5uf%2F3evp%2F3V8xv%2BCisv%2F6vjt%2F%2BHv6v%2Fh7%2Br%2F4e%2Fq%2F%2BHv6v%2Fn9Oz%2FvMXc%2F7G72v%2Fn9u3%2F4e7q%2F%2BHu6v%2Fh7ur%2F4vDq%2F%2Bb17P94gMf%2FYmjB%2F5ul0%2F%2BWn9L%2Flp%2FS%2F5af0v%2BWn9L%2Flp%2FR%2F5af0f%2BWoNH%2FmKLS%2F5ii0v%2BYotL%2FmKLS%2F5mi0v%2BbpdT%2FXWO%2F%2Fw%3D%3D"
	},	
  	torrentz:	{	
				name:	"Torrentz.com", 
				url:	{		0: "www.torrentz.com/",
							1: "213.239.140.13/"
							},
				searchurl: "http://www.torrentz.com/search?q=%s+music",
				css: ".OiNK {float: left !important;} \
				      .OinkPlus {float: left !important; min-width:700px;} \
				     .artistHeadline {font-size: 10pt;}",
				version:"1",
				isAudioRelease: "var divs = document.getElementsByTagName(\"div\");\
										for (var i = 0; i < divs.length; i++){ \
											if (divs[i].className == \"download\") {\
												if (divs[i].textContent.match(new RegExp(\"(audio|music)\"))) \
													return true; \
												break; \
											}	\
										} \
										return false;",
				hook: "			myDiv = document.createElement(\"div\"); \
										myDiv.className = 'results'; \
										myDiv.setAttribute('style','position: relative'); \
										myHeadline = document.createElement(\"h2\");\
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										myHeadline.appendChild(toggleDiv);\
										myHeadline.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										myDiv.appendChild(myHeadline);\
										myNode = document.createElement(\"div\"); \
										myNode.className = 'OiNK'; \
										myNode.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										myDiv.appendChild(myNode); \
										var divs = document.getElementsByTagName(\"div\");\
										var filesDiv; \
										for (var i = 0; i < divs.length; i++){ \
											if (divs[i].className == \"download\") {\
												filesDiv = divs[i]; \
												break;\
											} \
										} \
										filesDiv.parentNode.insertBefore(myDiv, filesDiv.nextSibling);\
										seperator = document.createElement(\"div\"); \
										seperator.setAttribute('style','clear: both');\
										filesDiv.parentNode.insertBefore(seperator, myDiv.nextSibling);\
										",
				findArtist: "var title = document.getElementsByTagName('title')[0].innerHTML; \
											title = title.replace(/Torrent Download/,'');\
											if (title.indexOf(\"-\") < 0 ) return null; \
											var myartist = title.replace(/\\[.*?\\]/g,\"\").replace(/_/g,' ').split(\"-\")[0]; \
											return myartist.replace(/(^( )*)|(( )*$)/g,\"\").replace(/[ ]{2,}/gi,\" \");",
				morelink:   "/search?q=%s+music",
				icon: "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%10%00%00%00%10%08%06%00%00%00%1F%F3%FFa%00%00%00%09tEXtX-Index%000%B4%C3%9Cb%00%00%02gIDAT8%8D%7D%93MH%94Q%14%86%9F%7B%BFO%9D%D1I'f%9C)%A7%1AQ%D34%14%954%2BR%A2%1F%C8%8A%90%021!%E8%07j%D3%A2%16%B5hQ%9B6%82-%2B%0DZ%BA%0A%826AP%9B%C8%12%C3%92%D2I%07%C9%B1%1C5u%FCiR%E7%EF%BB-F%C7%A6%91%DE%D5%E5%BE%E7%3C%9Cs%EE%3DB)%A5XU(%1C%E1M%EF%17%DE%F6y%18%F0%FA%08%87%A38%EDVj*%8A9z%A0%0A%B7%CB%C1%BF%12k%80%D1%1FS%3Cx%DC%85%F2%F6!%94%C1%07%E1%C2%102%11h%C94%D1%7C%A2%9E%96S%0D%E8R%C2%DC%24%CCM%A2%03%8C%F9%A7io%7FH%E9D%0F%83%C2%C9%B5X%0FC%BA%9D%05%CC%09%40pi%85'O_%22%97%179g%F6!%B2%B2%E1P%2B%22%14%8E%A8%EB%F7%3A9%EC%E9%E2%9Dt%D3%2B%B7oT%26Ej%86%E3%C60%85j%16%D5z%87%CA%D3%CD%00%E8%EF%3F%7D%C53%F2%9D%F3%2C%D2h%0C1%87%99%08%12%13Q%9C%04%A96%FCT)%3F!4%5E%C8%12%3A%B4Zv~%0Cp%BF1Jz%9A%8E%DE%DD7%88a(%3A%E5%5En%C7%5E%D3%11%7B%86%81%40%C7%40%00%9Fq%D2%A6%D5%E3%15v%C2B%07%C0%EB%F33%F13%80%DB%E5%40%EF%F7%7C%03%60D%DA%B8%2C%CEP%AE%26%B1%B2%CC%DD%D8%2B%00%9E%CBR%06%E4%96%A4%96B%E1%08%DE%D1q%DC.%07r9%14N%18%86%90%F4%CB%3C%DCj%1E%01%18%40%B7t%A7%CC%04%60!%B8%04%80%B4d%9A%93%1D%A5%A83%C6%00%18%C6%CEo%91%B1!%20gSV%1CPUV%90d8%08%92%CF%3C%00%1E%91%FAq%00L%19%E9%EC*%D8%16%074%D4%96%A3kZ%C2%CCW%F1w%F8%1F%A0%BC%C4%CD%D6%DC%CD(%A5%90%95e%05%EC)%2FJ%98yj%11%B1z%9E%17%A6%94%E4%F44%9D%96%93%0Dh%9A%86%10%02%A9k%1A7.6Q%B8%23%3E%E9b5%93%086%90I%C9R%08%AE%B64RYV%B8~%07%E0%B0Yi%BBu%89%835%BBI_%EF%06Ab%CFp%D8r%B8y%E5%2CM%C7%F6!%85X%8F%F9%7B%1B%A3%81)%22%ED%170%CF%FA%20%16%E5%91%E5%08%E3%EE%3Aj%2B%8A%D9_%5D%8A%CD%9A%9D%D2%D2%3A%E0W%00%16%A6!'%17%CC%16%08%AF%80%D4%C0%94%B5%E1%20%D7%F4%07%FB%FD%D7%18M%3F%B4%1A%00%00%00%00IEND%AEB%60%82"
			},
	shellife:	{	
				name:	"Shellife/My Bloody Tracker", 
				url:	{		0: "shellife.eu/details.php",
							1: "67.228.39.196/details.php"
							},
				searchurl: "http://shellife.eu/browse.php?search=%s&cat=1&exact=1",
				css: "",
				version:"1",
				isAudioRelease: "return true;",
				hook: "	hookNode = document.evaluate(\"//tr//tr//tr//tr[contains(self::node(),'Thanks by:')]/parent::*/tr[position() = last()]\", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; \
					var new_row = hookNode.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = hookNode.parentNode; \
										parent.appendChild(new_row);",
				findArtist: " return document.evaluate(\"//h2/a[1]/b\", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent;",
				morelink: "/browse.php?search=&s&cat=1",
				icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACa0lEQVQ4jX3T30+ScRTHcf+o5u9ya866q5gXrhunde9aaTNbd66L/FUiQ6eVzhzamKDiRK1Jlg9oGCCoCPLIo/gAGvAYukH5fXfVhRM71+e8trPzOUUUKCEE+Xwet3sdk2mCgYEhNE0r1EpRoWFJcmIyTbAirbIdDPHd7cG9/gMhxP+BbDbLyPAoTpebeOKIVDpDKpUhmTzGH9gim81eDeRyOfr6jHxZlpD3FNJpjUzmBE37RSZzgqIckMvlCgNCCEymCRYWlwjuhNnwbxI7VPmZypBOp0mnNaLK/tUrRKMKwyNjyHsKscM4oXAEjzfAQUwlkTxG3lNQ1fjVgNk8iXvdgxpPsn9wyHYwxIrkwuPdQI0nicXUgsMARUII3r0fIbwrE08cEZGj+DYCLH+V0OuNtLW9QK83sLW1RT7/uzDQ0fkaf2CbiBwlFI7g9fnp6emlquom1dU19BmMLMx/xuFY5vz8z2Wgq/sNG/5NdkK7bAdDeH1+GhoeUFlxndKScpqaHrG25mbGNkckIl9Yp0gIweDgWzxeP8GdMPKeQnhXprHxIeVllRRfK6Gy4gazs3PYbHP4fP6LAIDVOsWMzU5EjnKoJlDjSdrbX1JeWkFpcRl379zD4VjGbv+E07l6+QqadsLjJy309w/xbcWFohzQ3PyUWzW30elq6XjVhX1+Eat1mkBgs3CQJEmiru4+Ol0t9fUNtD57Tq/ewPDIKBMfzZjNFiyWac7Ozi4D/xCXy0VraxsGwwDNLa306g10dHbzYWycmZlZolHlUh4uPJMQAk3TMJsnGRsbx2AwYrFOsbTk4PT0tGCY/gKeZ3zk0q3/+QAAAABJRU5ErkJggg=="
	},
	acidl:	{	
				name:	"Acid-L", 
				url:	{		0: "ac-d-l-u-e.org.uk/details.php",
							1: "85.17.65.16/details.php"
							},
				searchurl: null,
				css: "",
				version:"1",
				isAudioRelease: " node = document.evaluate(\"//tr//tr[contains(self::node(),'Type')]]\", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; \
						if (node.textContent.match(new RegExp(\"(Soundtracks)\")))  return true;\
						 else return false;",
				hook: "hookNode = document.evaluate(\"//tr//tr[contains(self::node(),'Thanks by:')]/parent::*/tr[position() = last()]\", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; \
					var new_row = hookNode.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = hookNode.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var title = document.getElementsByTagName(\'title\')[0].innerHTML; \
											title = title.replace('Acid Lounge :: Details for torrent \"', ''); \
											if (title.indexOf(\"-\") < 0 ) return null; \
											str = title; \
											str = str.replace(/\\[[^\\]]*\\]/g, '');  \
											if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
											} \
											if (str.split('-').length > 1) {  \
													return str.split('-')[0].replace(/^\\s+|\\s+$/g,\"\").replace(/_/g,\" \"); \
												} \
											return '';",
				morelink: "/browse.php?search=%s&cat=35",
				icon: ""
	},
	rockbox:	{	
				name:	"Rockbox", 
				url:	{		0: "rockbox.psychocydd.co.uk/details.php",
							1: "87.233.179.169/details.php"
					},
				searchurl: "http://rockbox.psychocydd.co.uk/torrents.php?search=%s",
				css: "",
				version:"1",
				isAudioRelease: " return true;",
				hook: "hookNode = document.evaluate(\"//tr//tr//tr[contains(self::node(),'Added:')]/parent::*/tr[position() = last()]\", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; \
					var new_row = hookNode.cloneNode(true); \
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										if (new_row.firstChild.hasChildNodes()){ \
												new_row.firstChild.innerHTML = '';\
										} \
										new_row.firstChild.appendChild(toggleDiv);\
										new_row.firstChild.appendChild(document.createTextNode(' ' + 'OiNKPlus'));\
										new_row.firstChild.nextSibling.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										var parent = hookNode.parentNode; \
										parent.appendChild(new_row);",
				findArtist: "var hint = document.evaluate(\"//tr//tr//tr[contains(self::node(),'Torrent:')]//a[2]\", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue; \
											str = hint.textContent; \
											str = str.replace(/\\[[^\\]]*\\]/g, '');  \
											if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
											} \
											if (str.split('-').length > 1) {  \
													return str.split('-')[0].replace(/^\\s+|\\s+$/g,\"\").replace(/_/g,\" \"); \
												} \
											return ''; ",
				morelink: "/torrents.php?search=%s",
				icon: "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F4QAWRXhpZgAATU0AKgAAAAgAAAAAAAD%2F2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH%2F2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH%2FwAARCAAQABADASIAAhEBAxEB%2F8QAFgABAQEAAAAAAAAAAAAAAAAACggJ%2F8QAIBAAAwADAQABBQAAAAAAAAAABAUGAgMHAQgACRIUFv%2FEABQBAQAAAAAAAAAAAAAAAAAAAAf%2FxAAdEQADAQEAAgMAAAAAAAAAAAACAwQBBQAGERMU%2F9oADAMBAAIRAxEAPwC6ft7Wt8w6P0%2Bfyu01TxuMyF3aS8vJXzXyhaNHImhEMGw2FZtnQo7TTvBZrdko7CmSUbN6nFJfvSc8NK%2BHPs34U4EhBtapVpWKaTCjvKHtUusE0WhSlt%2FOyFhcaJsuoWYDr9a6fZstpDjBUiQn5snYNAtY%2FRs6Tq0iy7lxvmMjSI%2BWdZiZUhO3sL1YfoxpNdY8%2FJHNEaxs9mLbDVtzIcls344y7Qw83Cb1rQNk49HQj8dYfnHxv48QKBbWXVVlHXL15s5atxHgpNZWVxOQhfKkoO9YkiwARXDNsqnU6xIi1LvBv1FAAe30LWVdXso4Xb1LataZtOsoVI2UZpn%2FADlJMJhv295ECn6KhUYFhkCxEiDxPg9fb3fUJ6i52y7TPHzec43hS2%2ByE9EaSVPLOMis%2FRQifXfaRCzFtYzRZSz%2F2Q%3D%3D"
	},
BH5:	{	
				name:	"BH5", 
				url:	{		0:"tracker.beathau5.com/torrents.php\\?id=",
							1:"tracker.beathau5.com/artist.php\\?id="	
							},
				searchurl: "https://tracker.beathau5.com/artist.php?artistname=%s",
				css: ".artistHeadline {font-size: 10pt;text-align:left;} \
				     font-size: 10pt !important;}",
				version:"1",
				isAudioRelease: "var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"heading\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(App|Comics|E-books|E-learning videos)\"))) \
													return false; \
												break; \
											}	\
										} \
										return true",
				hook: "var divs = document.getElementsByTagName(\"div\");\
										var centertable; \
										for (var i = 0; i < divs.length; i++){ \
											if (divs[i].className == \"main_column\") {\
												centertable =  divs[i]; \
												break; \
											}	\
										} \
										hook = centertable.firstChild.nextSibling.nextSibling.nextSibling;\
										myDiv = document.createElement(\"div\"); \
										myDiv.className = 'box'; \
										myHeadline = document.createElement(\"div\");\
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										myHeadline.appendChild(toggleDiv);\
										myHeadline.appendChild(document.createTextNode(' '));\
										myBoldText = document.createElement('b'); \
										myBoldText.textContent = 'OiNKPlus'; \
										myHeadline.appendChild(myBoldText);\
										myHeadline.className='head'; \
										myDiv.appendChild(myHeadline);\
										myNode = document.createElement(\"div\"); \
										myNode.className = 'OiNK'; \
										myNode.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										myDiv.appendChild(myNode); \
										hook.parentNode.insertBefore(myDiv, hook.nextSibling); \
										seperator = document.createElement(\"div\"); \
										seperator.setAttribute('style','clear: both');\
										hook.parentNode.insertBefore(seperator, myDiv.nextSibling);",
				findArtist: "var h2s = document.getElementsByTagName(\"h2\");   \
											if (h2s.length > 0) {   \
												var str = h2s[0].textContent;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
												else return str.replace(/^\\s+|\\s+$/g,\"\"); \
											} \
											return '';",
				morelink: "/artist.php?name=%s",
				icon: "http://i.imgur.com/kT4i2ii.png"
	},
libble:	{	
				name:	"Libble.com", 
				url:	{		0:"libble.com/torrents.php\\?id=",
							1:"libble.com/artist.php\\?id=",
							2:"208.89.219.120/torrents.php\\?id=",
							3:"208.89.219.120/artist.php\\?id="
							},
				searchurl: "http://libble.com/artist.php?name=%s",
				css: ".artistHeadline {font-size: 10pt;text-align:left;} \
				     font-size: 10pt !important;}",
				version:"1",
				isAudioRelease: "var tds = document.getElementsByTagName(\"td\");\
										for (var i = 0; i < tds.length; i++){ \
											if (tds[i].className == \"heading\" && tds[i].textContent.match(new RegExp(\"Type\"))) {\
												typeFieldContent = tds[i].nextSibling.textContent; \
												if (typeFieldContent.match(new RegExp(\"(App|Comics|E-books|E-learning videos)\"))) \
													return false; \
												break; \
											}	\
										} \
										return true",
				hook: "var divs = document.getElementsByTagName(\"div\");\
										var centertable; \
										for (var i = 0; i < divs.length; i++){ \
											if (divs[i].className == \"main_column\") {\
												centertable =  divs[i]; \
												break; \
											}	\
										} \
										hook = centertable.firstChild.nextSibling.nextSibling.nextSibling;\
										myDiv = document.createElement(\"div\"); \
										myDiv.className = 'box'; \
										myHeadline = document.createElement(\"div\");\
										toggleDiv = document.createElement(\"div\"); \
										toggleDiv.id = \"toggleOiNKPlus\"; \
										myHeadline.appendChild(toggleDiv);\
										myHeadline.appendChild(document.createTextNode(' '));\
										myBoldText = document.createElement('b'); \
										myBoldText.textContent = 'OiNKPlus'; \
										myHeadline.appendChild(myBoldText);\
										myHeadline.className='head'; \
										myDiv.appendChild(myHeadline);\
										myNode = document.createElement(\"div\"); \
										myNode.className = 'OiNK'; \
										myNode.innerHTML = '<div id=\"OiNKPlus\"></div>';\
										myDiv.appendChild(myNode); \
										hook.parentNode.insertBefore(myDiv, hook.nextSibling); \
										seperator = document.createElement(\"div\"); \
										seperator.setAttribute('style','clear: both');\
										hook.parentNode.insertBefore(seperator, myDiv.nextSibling);",
				findArtist: "var h2s = document.getElementsByTagName(\"h2\");   \
											if (h2s.length > 0) {   \
												var str = h2s[0].textContent;     \
												str = str.replace(/\\[[^\\]]*\\]/g, '');  \
												if (str.split(' - ').length > 1) {  \
													return str.split(' - ')[0].replace(/^\\s+|\\s+$/g,\"\"); \
												} \
												else return str.replace(/^\\s+|\\s+$/g,\"\"); \
											} \
											return '';",
				morelink: "/artist.php?name=%s",
				icon: "data:image/x-icon;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAAAABMLAAATCwAAAAEAAAAAAACURgQArG4sAOTKtACcWgwA7N7UAKRiJADk1sQAnFIEALSCTACkYhwA9OrkANS6nACkXhwAlE4EAMymhADk0rwAnFoUAOzm3ACkaiQA7N7MALyKVADMpnwAtH5MAOTOvADs2swAnFIMAPTu7ACkXhQAlEoEAMyifACscjQA5M60AKRmJADs2sQAtIZMAKRmHAD07uQAnE4EAPTm3ACsaiwAnFYMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJQ0lDSUNJQ0lDSUNJQ0lDQ0lDSUNJQ0lDSUNJQ0lDSUNJRwAHBwcHBwcHBwcHBwlJRwDJyMDIAkoIyAoIyAHDQcAFBEPHSQmDiQKFSYaFAAHAAgTFwkFBQcgIBkjIAcNDQAWIR8QABwlAAAlABwcJQcAIgQGCRwlDQcNJQ0lJQ0lAAgYHwwADSUNJQ0lDSUNBwAWIQIbHCUNJQ0lDSUNJQcAFCQECQANJQ0NJQ0lDSUNHBAeAQ0NDRwNJQ0lDSUNJQ0cABwNHAcdBw0lDSUcJQ0cEAccHBwoFygADRwHAxwDGSISGQMoCR8JKCgZHggZCwYEBhgGBhgRGAYYBhgYBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
	},
});




var RessourceLoader = {
	ressources: new Array(),
	index: 0,
	callback: "",
	addRessource: function(res, save) {
		save = save==false?false:true;
		this.ressources.push(res);
		window.setTimeout( function () {EventNotifier.send(null, "removeOnTimeout", {ressource: res })}, RESOURCE_LOAD_TIMEOUT, false);
	},
	isRessourceLoading: function(res) {
    for(var i = 0, length = this.ressources.length; i < length; i++){
      if (res.url == this.ressources[i].url) {
        return true;  
      }
    } 
    return false;
	},
	load: function(callback) {
		this.callback = callback;
		this.loadRessource(this.ressources[this.index++]);	
	},
	loadNext: function() {
		if(this.index < this.ressources.length) this.loadRessource(this.ressources[this.index++]);
		else this.callback();
	},
	loadRessource: function(res, res_type) {
    if (!this.isRessourceLoading(res)){
      	this.addRessource(res, true);
      
	if(!GM_getValue("ressource_"+res.url, "")) {
        	GM_xmlhttpRequest({
			method:	'GET',
			overrideMimeType: "text/plain;" + ((res_type == TYPE_BINARY)?" charset=x-user-defined":""),
			url:	res.url,
			headers: {'Accept-Language': 'en-us,en;q=0.5' },
			onload:	function(data) {
			if(res.save) GM_setValue("ressource_"+res.url,  data.responseText );
				RessourceLoader.announceLoad(res, data.responseText );
			}
		});
      	} else {
		//console.('Error: ' + res.url + ' is cached?!');
		RessourceLoader.announceLoad(res, GM_getValue("ressource_"+res.url));
      }
    } 
	else {
		//console.(res.url + ' is already loading');
	}
	},	
	announceLoad: function(res, data) {
		//console.(res.url + ' announcing load');
		//this.ressources = this.ressources.reject( function(o) { return (o.url == res.url); });
		var results = [];
		this.ressources.forEach(
			function(o) {
				if (o.url == res.url) {
				results.push(o);
				}
			});
		this.ressources = results;

		EventNotifier.send(null, "onRessourceLoaded", {ressource: res, content: data  });	
		//this.loadNext();
	},
	removeOnTimeout: function (sender, e){
		//this.ressources = this.ressources.reject( function(o) {  return (o.url == e.ressource.url)});
		var results = [];
		this.ressources.forEach(
			function(o) {
				if (o.url == e.ressource.url) {
				results.push(o);
				}
			});
		this.ressources = results;
	}
}
EventNotifier.addObserver(RessourceLoader);
	// class Widget
	function Widget(name, res, toggleable){
		this._name = name;
		this._ressource = res;
		this._toggleable = toggleable;
		this._state = UNLOADED;	
		this._content = '';
		this._scrapedObject;
		this._currentArtist = '';
		this._contentNode;
		if (toggleable) {
			var togglelink = document.createElement('a');
			if (this.isVisible()) 
				togglelink.innerHTML = "<img src=\""+TOGGLE_IMG_MINUS	+"\" border=0>";
			else	{
				togglelink.innerHTML = "<img src=\""+TOGGLE_IMG_PLUS	+"\" border=0>";
				this.hide();
			}
			togglelink.href= '#';
			togglelink.id = "toggle"+this._name;
			togglelink.addEventListener("click", function (e) {EventNotifier.send(null, "onToggle", {toggleId: this.id }); e.preventDefault();}, false);
			$("toggle"+this._name).parentNode.replaceChild(togglelink, $("toggle"+this._name));
		}	
		EventNotifier.addObserver(this);
		

		this.load();
	};
	
	Widget.prototype.getName = function() {
		return this._name;
	};
	
	Widget.prototype.onToggle =  function(sender, e) {
		if (e.toggleId == "toggle"+this._name ){
			this.toggle();
		}
	};

	Widget.prototype.prepareRessourceUrl = function (artistname) {
					// should be implemented by the Widget
	};

	Widget.prototype.isVisible = function() {
		return (GM_getValue('visible'+this._name+'', 1) == 1);
	};
	
	Widget.prototype.isEnabled = function() {
		return (GM_getValue('enable'+this._name+'', 1) == 1);
	};
	
	Widget.prototype.Enable = function() {
		GM_setValue('enable'+this._name+'', 1);
	};
	
	Widget.prototype.Disable = function() {
		GM_setValue('enable'+this._name+'', 0);
	};
	
	Widget.prototype.toggle = function() {
		if (this.isVisible()){
			this.hide();
			$("toggle"+this._name).innerHTML = "<img src=\""+TOGGLE_IMG_PLUS	+"\" border=0>";
		} else {
			this.show();
			$("toggle"+this._name).innerHTML = "<img src=\""+TOGGLE_IMG_MINUS	+"\" border=0>";
		}
	};
	
	Widget.prototype.hide = function (){
		$(this._name).style.display = 'none';
		GM_setValue('visible'+this._name+'', 0);
	};
	
	Widget.prototype.show = function (){
		$(this._name).style.display = 'block';
		GM_setValue('visible'+this._name+'', 1);
		this.render();
	};
	
	Widget.prototype.load = function (){
		this._state = LOADING;
		// implement data request here
	};
	
	Widget.prototype.onArtistChange = function(sender, e) {
		if(sender != this._name && this._currentArtist != e.artistname) {
			this._state = LOADING;
			this.render();
			this._currentArtist = e.artistname;
			if (this._ressource != null) {
				var tempRessource = {key: this._ressource.key, url: this._ressource.url, save: this._ressource.save, artistname: e.artistname};
				tempRessource.url = this.prepareRessourceUrl(e.artistname);
				//var cachedContent = cache.getItem("cache_widget_" + this._name + "_" + this._currentArtist);
				var cachedContent = null;
				if (cachedContent == null){
					//console.(this._name + " contentUnCached for " + this._currentArtist); 
					RessourceLoader.loadRessource(tempRessource);
				}
				else {
					//console.(this._name + " contentCached for " + this._currentArtist); 
					this._state = CACHED;
					this._scrapedObject = cachedContent;
					this.createNodeFromScrapedContent();
					this.render();
				}
			}
			else {
				this._state = LOADED;
				this._scrapedObject = cachedContent;
				this.createNodeFromScrapedContent();
				this.render();
			}
		}
	};

	Widget.prototype.onRessourceLoaded = function (sender, e){
		if (this._ressource != null && this._ressource.key == e.ressource.key && this._currentArtist == e.ressource.artistname) {
			//alert(this._name + " contentLoaded for " + this._currentArtist); 
			this._state = LOADED;
			this._content = e.content;
			this._scrapedObject = this.scraperImpl();
			//cache.setItem("cache_widget_" + this._name + "_" + this._currentArtist, this._scrapedObject);
			this.createNodeFromScrapedContent();
			this.render();
		}
	};
	

	Widget.prototype.render = function (){
		if (this._state == CACHED || this._state == LOADED) {
			if ($(this._name).hasChildNodes()){
				//console.(this._name  + 'has Child node, state' + this._state);
				$(this._name).replaceChild(this._contentNode, $(this._name).firstChild);	
			}
			else $(this._name).appendChild(this._contentNode);
		}
		if (this._state == LOADING) {
				$(this._name).innerHTML = "<img src=\""+ SPINNER_IMG	+"\" border=0>";
		}
		if (this._state == FAILED) {
				$(this._name).innerHTML = "n/a";
		}
	};

	Widget.prototype.createNodeFromScrapedContent = function (){
		var node = document.createElement("div");
		node.innerHTML = this._scrapedObject;
		this._contentNode = node;
	};
  
	// end of class Widget
	
	function a(artist){
		EventNotifier.send("global", "onArtistChange", {artistname: artist, albumname: null  });
	}

		
	function addWidgets(artist){
      
 			/* 
			* Widget for OiNKPlus container 
			*/
			OiNKPlusRessource = null;
			wOiNKPlus =  new Widget("OiNKPlus", OiNKPlusRessource, TOGGLEABLE );
			wOiNKPlus.createNodeFromScrapedContent = function () {
					tempContent = BASIC_LAYOUT;
					var node = document.createElement("div");
					node.innerHTML = tempContent;
					this._contentNode = node;
			};
			wOiNKPlus.onArtistChange = function () {
					// overwritten to do nothing
			};
			wOiNKPlus.createNodeFromScrapedContent();
			wOiNKPlus._state = LOADED;
			wOiNKPlus.render();
			// Widget for OiNKPlus container 
      
		 /* 
			* Widget for Artist Name 
			*/
			ArtistNameRessource = null;
			wArtistName =  new Widget("ArtistName", ArtistNameRessource, NON_TOGGLEABLE );
			wArtistName.createNodeFromScrapedContent = function () {
					var myLink = document.createElement('a');
					myLink.innerHTML = this._currentArtist;
					myLink.id = this._currentArtist;
					myLink.href = '#';
					myLink.addEventListener("click", function (e) {EventNotifier.send("LastFMSimilar", "onArtistChange", {artistname: this.id, albumname: null  }); e.preventDefault();} , false);
					this._contentNode = myLink;
			};
			wArtistName.onArtistChange = function (sender, e) {
					if(sender == "global") {
						this._currentArtist = e.artistname;	
						this.createNodeFromScrapedContent();
						this._state = LOADED;
						this.render();
					}
			};
			wArtistName._currentArtist = artist;
			wArtistName.createNodeFromScrapedContent();
			wArtistName._state = LOADED;
			wArtistName.render();
			
			// Widget for Artist Name

			/* 
			* Widget for Artist Title and More Link 
			*/
			ArtistTitleRessource = null;
			wArtistTitle =  new Widget("ArtistTitle", ArtistTitleRessource, NON_TOGGLEABLE );
			wArtistTitle.createNodeFromScrapedContent = function () {
					// TODO encodeURIComponent 
					//var tempContent = '<h1>' + this._currentArtist + '</h1>';
					artistHeadline = document.createElement("h2");
					artistHeadline.className = "artistHeadline";
					var myArtistLink = document.createElement('a');
					myArtistLink.innerHTML = this._currentArtist + " ";
					myArtistLink.href = MORE_LINK.replace(/%s/, this._currentArtist.replace(/&/g, '%26'));
					artistHeadline.appendChild(myArtistLink);
					var myLink = document.createElement('a');
					myLink.innerHTML = "<font size=-2>[ load similar ]</font>";
					myLink.id = this._currentArtist;
					myLink.href = '#';
					myLink.className = "explore";
					myLink.addEventListener("click", function (e) {EventNotifier.send("global", "onArtistChange", {artistname: this.id, albumname: null  }); e.preventDefault();} , false);
					artistHeadline.appendChild(myLink);
					var node = document.createElement("div");
					node.appendChild(artistHeadline);
					this._contentNode = node;
			};
			// Widget for Artist Title and More Link
		
			/*
			* Widget for artist search field
			*/
			ArtistSearchFieldRessource = null;
			wArtistSearchField =  new Widget("ArtistSearchField", ArtistSearchFieldRessource, NON_TOGGLEABLE);
			wArtistSearchField.createNodeFromScrapedContent = function () {
					logmsg('ArtistSearchField');
					var searchField = document.createElement("input");
					searchField.value = 'search for artist';
					var baseStyle = 'background:#FFFFFF url('+SEARCH_IMG+') no-repeat scroll left center; border:1px solid #7E1325; font-size:11px;padding:1px 4px 2px 16px;width:110px;';
					searchField.setAttribute('style', baseStyle + 'color:grey');
					searchField.addEventListener("click", function (e) { if (this.value == 'search for artist') {this.value = ''; searchField.setAttribute('style',baseStyle);}}, false);
					searchField.addEventListener("keypress", function (e) { if (e.keyCode == 13) EventNotifier.send("global", "onArtistChange", {artistname: this.value.replace(/^\s+|\s+$/g,""), albumname: null  })}, false);
					var node = document.createElement("div");
					node.style.textAlign = "right";
					node.appendChild(searchField);
					this._contentNode = node;
					
			};
			wArtistSearchField.onArtistChange(null, {artistname: null, albumname: null  });
			// Widget for artist search field
			/* 
			* Widget for Last.fm Artist Image 
			*/
			LFMArtistInfoRessource = {key: "LastFMArtistInfo", url: LASTFM_INFO_URL, save: false};

			LFMArtistPageRessource = {key: "LastFMArtistPage", url: LASTFM_ARTIST_URL, save: false};
			wLFMArtistImage =  new Widget("ArtistImage", LFMArtistInfoRessource, NON_TOGGLEABLE);
					  wLFMArtistImage.prepareRessourceUrl = function (artistname) {
							  return this._ressource.url.replace(/%s/, artistname.replace(/&/g, '%26').replace(/\//g, '%2F').replace(/\?/,"%3F"));
					  };
					  wLFMArtistImage.scraperImpl = function () {
									  return "<img src=\"" + buildDataScheme(this._content, 'data:image/jpeg;base64,')  + "\" border=1>";
					  };
			wLFMArtistImage.onRessourceLoaded = function (sender, e){
			    if (this._ressource != null && e.ressource.key == 'LastFMArtistInfo' && this._currentArtist == e.ressource.artistname) {
				  //var imgUrl = e.content.extract("<div class=\"imgHolder\">","</div>").replace(/.*src=\"(.*)\" alt=.*/,'$1');
				  	var parser = new DOMParser();
					result = parser.parseFromString(e.content, "application/xml");
					var entries = result.getElementsByTagName('image');
					var arr = [];
					for (var i = 0; i < entries.length; i++)
						if (entries[i].getAttribute("size") == "large" ) {
							arr.push(entries[i].textContent);
						}
					
					var imgUrl = arr[0]; 
				// Subsequent Ressource
									  if (imgUrl.search(/^http/) >= 0) {
										  LFMArtistImageRessource = {key: "LastFMArtistImage", url: imgUrl, save: false, artistname: e.ressource.artistname};
				  RessourceLoader.loadRessource(LFMArtistImageRessource, TYPE_BINARY);
									  } else {
										  this._state = FAILED;
				  this.render();
									  }
			    }
			    if (this._ressource != null &&  e.ressource.key == 'LastFMArtistImage' && this._currentArtist == e.ressource.artistname) {
										  this._state = LOADED;
										  this._content = e.content;
										  this._scrapedObject = this.scraperImpl();
										  //cache.setItem("cache_widget_" + this._name + "_" + this._currentArtist, this._scrapedObject);
										  this.createNodeFromScrapedContent();
										  this.render();
			    }

			};
			// Widget for Last.fm Artist Image
 
			/* 
			* Widget for Last.fm Abstracts 
			*/
			wLFMBio =  new Widget("LastFMBio", LFMArtistInfoRessource, TOGGLEABLE);
			wLFMBio.prepareRessourceUrl = function (artistname) {
					return this._ressource.url.replace(/%s/, artistname.replace(/&/g, '%26').replace(/\//g, '%2F').replace(/\?/,"%3F"));
			};
			wLFMBio.scraperImpl = function () {
					var parser = new DOMParser();
					result = parser.parseFromString(this._content, "application/xml");
					var entries = result.getElementsByTagName('summary');
					var arr = [];
					for (var i = 0; i < entries.length; i++)
							arr.push(entries[i].textContent);
					
					var summary = arr[0]; 
					cleanedBio = basicClean(summary);
					return cleanedBio;
			};
			wLFMBio.createNodeFromScrapedContent = function (){
					var node = document.createElement("div");
					node.innerHTML = this._scrapedObject;
					encodedArtistName = this._currentArtist.replace(/&/g, '%252526').replace(/\//g, '%25252F').replace(/\?/,"%25253F");
					textContent = node.textContent;
					var maxLength = 450;
					if (textContent.length > MAX_BIO_LENGTH){	
						logmsg('bio longer than maximum length');
						textContent = textContent.replace(/\(read more\)/, "");
						sentences = textContent.split(".");
						var out = "";
						logmsg('got ' + sentences.length + ' sentences');
						for (i = 0; out.length < MAX_BIO_LENGTH && i < sentences.length; i++){
							out += sentences[i] + ".";
						}
						//textContent = out + new String(" (read more)");
						textContent = out;	
					}
					//textContent = textContent.replace(/read more/, LASTFM_BIO_LINK.replace(/%s/, encodedArtistName));
					node.innerHTML = textContent;
					if (textContent.length > MAX_BIO_LENGTH) {
						var readmorelink = document.createElement('a');
						readmorelink.innerHTML = "read more";
						readmorelink.href= '#';
						readmorelink.id = this._currentArtist;
						readmorelink.addEventListener("click", function (e) { EventNotifier.send("LastFMBio", "onReadMore", {artistname: this.id, albumname: null  }); e.preventDefault();}, false);
						node.appendChild(document.createTextNode(" ("));
						node.appendChild(readmorelink);
						node.appendChild(document.createTextNode(")"));
						node.appendChild(document.createElement("br"));	
					}
					this._contentNode = node;
			};
			wLFMBio.scraperImplBio = function () {
					var parser = new DOMParser();
					result = parser.parseFromString(this._content, "application/xml");
					var entries = result.getElementsByTagName('content');
					var arr = [];
					for (var i = 0; i < entries.length; i++)
							arr.push(entries[i].textContent);
					
					var bio = arr[0]; 
					cleanedBio = basicClean(bio);
					return cleanedBio;
			};
			wLFMBio.onRessourceLoaded = function (sender, e){
				if (this._ressource != null && this._ressource.key == e.ressource.key && this._currentArtist == e.ressource.artistname) {
					this._state = LOADED;
					this._content = e.content;
					this._scrapedObject = this.scraperImpl();
					this.createNodeFromScrapedContent();
					this.render();
				}
				if (this._ressource != null && e.ressource.key == "LastFMArtistBio" ) {
					
				}
			};
			wLFMBio.onReadMore =  function (sender, e){
				this._state = LOADED;
				this._scrapedObject = this.scraperImplBio();
				//this.createNodeFromScrapedContent();
				var node = document.createElement("div");
				node.innerHTML = this._scrapedObject.replace(/<br \/>/g, "%%br%%");
				logmsg(node.textContent);
				textContent = node.textContent;
				node.innerHTML = textContent.replace(/%%br%%/g, "<br />");
				this._contentNode = node;
				this.render();
			};


			// Widget for Last.fm Abstracts

			/* 
			* Widget for Last.fm Player 
			*/
			/*wLFMPlayer =  new Widget("LastFMPlayer", LFMArtistPageRessource, TOGGLEABLE);
			wLFMPlayer.prepareRessourceUrl = function (artistname) {
					return this._ressource.url.replace(/%s/, artistname.replace(/&/g, '%2526').replace(/\//g, '%252F').replace(/\?/,"%3F"));
			};
			wLFMPlayer.scraperImpl = function () {
						var lfmPlayerCode = this._content.extract("<div id=\"flashContainer\">", "</div>").extract("<object", "</object>");
						if (lfmPlayerCode !='') {
							var movieUrl = lfmPlayerCode.extractInner("data=\"", "\"");
							var flashVars = lfmPlayerCode.extractInner("flashvars\" value=\"", "\"");
							//alert(movieUrl + "\n" + flashVars);
							return getFlashContainerCode(300, 266, movieUrl + '?flashVars=' + encodeURIComponent(flashVars.replace(/&amp;/g,'&')));
						}
						else return 'n/a';
			};*/
			// Widget for Last.fm Player

			/* 
			* Widget for Last.fm Tags PROPOSED
			*
			LFMTagsWebserviceRessource = {key: "LastFMTagsWebservice", url: LASTFM_TAGS_URL, save: false};
			wLFMTags =  new Widget("LastFMTags", LFMArtistInfoRessource, NON_TOGGLEABLE);
			wLFMTags.prepareRessourceUrl = function (artistname) {
					return this._ressource.url.replace(/%s/, artistname.replace(/&/g, '%26').replace(/\//g, '%2F').replace(/\?/,"%3F"));
			};
			wLFMTags.scraperImpl = function () {
					var parser = new DOMParser();
					result = parser.parseFromString(this._content, "application/xml");
					var entries = result.getElementsByTagName('tag');
					var arr = [];
					for (var i = 0;i < MAX_TAGS && i < entries.length; i++)
						arr.push(entries[i].getElementsByTagName('name')[0].textContent);
					 var text = arr.join(', ') + '';
					 return text + 'test';
			};
			// Widget for Last.fm Tags
			*/
			/* 
			* Widget for Last.fm Tags 
			*/
			LFMTagsWebserviceRessource = {key: "LastFMTagsWebservice", url: LASTFM_TAGS_URL, save: false};
			wLFMTags =  new Widget("LastFMTags", LFMTagsWebserviceRessource, NON_TOGGLEABLE);
			wLFMTags.prepareRessourceUrl = function (artistname) {
					return this._ressource.url.replace(/%s/, artistname.replace(/&/g, '%2526').replace(/\//g, '%252F').replace(/\?/,"%3F"));
			};
			wLFMTags.scraperImpl = function () {
					var parser = new DOMParser();
					result = parser.parseFromString(this._content, "application/xml");
					var entries = result.getElementsByTagName('tag');
					var arr = [];
					for (var i = 0;i < MAX_TAGS && i < entries.length; i++)
						arr.push(entries[i].getElementsByTagName('name')[0].textContent);
					 var text = arr.join(', ') + '';
					 return text;
			};
			// Widget for Last.fm Tags

			/* 
			* Widget for Last.fm Similar Artists 
			*/
			
			LFMSimilarWebserviceRessource = {key: "LastFMSimilarWebservice", url: LASTFM_SIMILAR_URL, save: false};
			wLFMSimilar =  new Widget("LastFMSimilar", LFMSimilarWebserviceRessource, TOGGLEABLE);
			wLFMSimilar.prepareRessourceUrl = function (artistname) {
					return this._ressource.url.replace(/%s/, artistname.replace(/&/g, '%2526').replace(/\//g, '%252F').replace(/\?/,"%3F"));
			};
			wLFMSimilar.scraperImpl = function () {
					var parser = new DOMParser();
					result = parser.parseFromString(this._content, "application/xml");
					var entries = result.getElementsByTagName('artist');
					var arr = [];
					for (var i = 0; i < MAX_SIMILAR_ARTISTS && i < entries.length; i++) {
						arr.push(entries[i].getElementsByTagName('name')[0].textContent);
					}
					return arr;
			};
			wLFMSimilar.createNodeFromScrapedContent = function () {
				var node = document.createElement("div");
				for (var i = 0; i < this._scrapedObject.length; i++) {
						var artistname = this._scrapedObject[i];
						var artistlink = document.createElement('a');
						artistlink.innerHTML = artistname;
						artistlink.href= '#';
						artistlink.id = artistname;
						artistlink.addEventListener("click", function (e) { EventNotifier.send("LastFMSimilar", "onArtistChange", {artistname: this.id, albumname: null  }); e.preventDefault();}, false);
						node.appendChild(artistlink);
						node.appendChild(document.createElement("br"));	
					}
				this._contentNode = node;	
			};
			
			// Widget for Last.fm Similar

			/* 
			* Widget for (simple) Browsing History 
			*/
		
			BrowsingHistoryRessource = null;
			wBrowsingHistory =  new Widget("History", BrowsingHistoryRessource, TOGGLEABLE);
			wBrowsingHistory.onArtistChange = function(sender, e) {
				if(sender == "global") {
						this._currentArtist = e.artistname;
						this._state = LOADED;
						this.createNodeFromScrapedContent();
						this.render();
				}
			};
			wBrowsingHistory.createNodeFromScrapedContent = function () {
				// init
				if(this._scrapedObject == null) {
					logmsg('scraped Object null');
					this._scrapedObject = new Array();	
				}
				logmsg('got artist: ' + this._currentArtist);	
				var found = false;
				this._scrapedObject.forEach(function (o) { if (o == this._currentArtist) {found = true;}}, this);
				if (!found)
					this._scrapedObject.push(this._currentArtist);
				var node = document.createElement("div");
				for (var i = 0; i < this._scrapedObject.length; i++) {
						var artistname = this._scrapedObject[i];
						var artistlink = document.createElement('a');
						artistlink.innerHTML = artistname;
						artistlink.href= '#';
						artistlink.id = artistname;
						artistlink.addEventListener("click", function (e) { EventNotifier.send("global", "onArtistChange", {artistname: this.id, albumname: null  }); e.preventDefault();}, false);
						node.appendChild(artistlink);
						node.appendChild(document.createElement("br"));	
					}
				this._contentNode = node;
				this._cachedContent = this._scrapedObject;	
			};
			
			// Widget for Browsing History
			
			
			/* 
			* Widget for MySpace Player 
			*/
			MSPArtistPageRessource = {key: "MySpaceArtistPage", url: MYSPACE_URL, save: false};
			wMSPPlayer =  new Widget("MySpacePlayer", MSPArtistPageRessource, TOGGLEABLE);
			wMSPPlayer.prepareRessourceUrl = function (artistname) {
					return this._ressource.url.replace(/%s/, artistname.replace(/&/g, '%26').replace(/\?/,"%3F"));
			};

		
			wMSPPlayer.scraperImpl = function () {
					var template = '<br><object style="visibility:hidden" width="1" height="1" type="application/x-shockwave-flash" data="http://www.myspace.com/music/services/embed/ptype=30,spacejam=1" id="persistentPlayer" style="visibility: visible;"><param name="allowScriptAccess" value="always"></object>';
					template += "<script>function Play(var songid, var paused){ if(paused==0) document.getElementById(songid).getElementsByTagName('a').innerText=\"<b>\" + document.getElementById(songid).getElementsByTagName('b').innerText + \"</i>\"; if(paused==1) document.getElementById(songid).getElementsByTagName('a').innerText=\"<i>\" + document.getElementById(songid).getElementsByTagName('a').innerText + \"</i>\";}</script>";
					
					var tmp = this._content.extractInner("<a class=\"userLink\" href=", "</a>");
					var artist = tmp.replace(/"\/\w+">/, '')
					var artst_url = "http://anonym.to?http://www.myspace.com" + tmp.match(/"(\/\w+)">/, '')[1]
					template += "Found artist: <a target='_blank' href='"+artst_url+"'>"+artist+"</a><br><br>";
					
					
					var matches = this._content.extract('<h3 class="moduleHead">All Songs</h3>', '<div id="Charts">').match(/<a href\=".+?\/music\/songs\/.+?">.+?<\/a>/gmi);
					
					if(matches == null)
						return 'n/a';
					for(var i=0;i<matches.length;i++) {
						var song_regex = /href\=".+?\/music\/songs\/.+?\-(\d+)">(.+?)<\/a>/gmi;
						var match = song_regex.exec(matches[i]);
					  
						var link = "<div class='oink_myspace' id='"+match[1]+"'>";
						link += ">&nbsp;&nbsp;&nbsp;&nbsp;";
						link += "<a href='javascript:void(0);' onclick=\"javascript:if(window.currentTrack && window.currentTrack == "+match[1]+") { document.getElementById('persistentPlayer').pauseCurrentTrack();Play("+match[1]+", 1); window.currentTrack=null; } else { document.getElementById('persistentPlayer').playSong("+match[1]+");window.currentTrack="+match[1]+"; Play("+match[1]+", 0);}; return false;\">";
						//link += "<img src='data:image/jpg;base64,">
						link += match[2];
						link += "</a></div>";
					    
						template += link;
					}
					return template;
			};
	
			wMSPPlayer.onRessourceLoaded = function (sender, e){
			    if (this._ressource != null && e.ressource.key == 'MySpaceArtistPage' && this._currentArtist == e.ressource.artistname) {
				  googleResultPage = e.content.replace(/ target=_blank/,"");
				  
				  var mspUrl = "";
				  
				  var tmp = googleResultPage.extract("<div class=\"searchResults \"", "</body>");
				  var re = /a class='beacon' href='\/(\w+)\/music'>(.*)<\/a>/g;
				  var match;
				  while(match = re.exec(tmp)){
					var artist = match[2].replace(/<(\/)?\w+>/g, '');
					if(artist.toLowerCase().indexOf(e.ressource.artistname.toLowerCase()) > -1){
						mspUrl = "http://www.myspace.com/" + match[1] + "/music/songs";
						break;
					}
				  }
				  
				// Subsequent Ressource
				  if (mspUrl.search(/^http/) >= 0) {
					  MSPPageRessource = {key: "MySpacePage", url: mspUrl, save: false, artistname: e.ressource.artistname};
						RessourceLoader.loadRessource(MSPPageRessource, TYPE_HTML);
						
				  } else {
					  this._state = FAILED;
					  this.render();
				  }
				}
				 if (this._ressource != null &&  e.ressource.key == 'MySpacePage' && this._currentArtist == e.ressource.artistname) {
										  this._state = LOADED;
										  this._content = e.content;
										  this._scrapedObject = this.scraperImpl();
										  //cache.setItem("cache_widget_" + this._name + "_" + this._currentArtist, this._scrapedObject);
										  this.createNodeFromScrapedContent();
										  this.render();										 
			    }

			};
			// Widget for MySpace Player
		
			/* 
			* Widget for External Links 
			*/
			ExternalLinksRessource = null;
			wExternalLinks =  new Widget("ExternalLinks", ExternalLinksRessource, NON_TOGGLEABLE);
			wExternalLinks.prepareRessourceUrl = function (artistname) {
					// nothing to do
			};
			wExternalLinks.createNodeFromScrapedContent = function () {
					var arr = [];
					var artist = this._currentArtist;
					arr.push(this.getExternalLink(artist, LASTFM_LINK).replace(/%26/g, '%252526').replace(/%2F/g, '%25252F'));
					arr.push(this.getExternalLink(artist, WIKIPEDIA_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, ALLMUSIC_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, FOXYTUNES_LINK).replace(/%2F/g, '%252F').replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, IMEEM_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist.replace(/^(The) (.*)/,'$2, $1'), DISCOGS_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, GOOGLE_LINK).replace(/%26/g, '%2526'));
					arr.push('<br>');
					arr.push(this.getExternalLink(artist, AMAZON_LINK));
					arr.push(this.getExternalLink(artist, MYSPACE_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, HYPEMACHINE_LINK).replace(/%26/g, '%252526'));
					arr.push(this.getExternalLink(artist, SEEQPOD_LINK).replace(/%26/g, '%252526').replace(/%2F/g, '%252F'));
					arr.push(this.getExternalLink(artist, PANDORA_LINK).replace(/%26/g, '%252526').replace(/%2F/g, '%252F'));
					arr.push(this.getExternalLink(artist, RIAARADAR_LINK).replace(/%26/g, '%252526').replace(/%2F/g, '%252F'));
					arr.push(this.getExternalLink(artist, PUREVOLUME_LINK).replace(/%26/g, '%2526'));
					arr.push('<br>');
					arr.push(this.getExternalLink(artist, YOUTUBE_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, RATEYOURMUSIC_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, GROOVESHARK_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, SOUNDCLOUD_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, FACEBOOK_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, BANDCAMP_LINK).replace(/%26/g, '%2526'));
					arr.push(this.getExternalLink(artist, MUSICBRAINZ_LINK).replace(/%26/g, '%2526'));
					var node = document.createElement("div");
					node.innerHTML = arr.join('') + '';
					this._contentNode = node;
			};
			
			wExternalLinks.getExternalLink = function (artist, mylink) {
        return mylink.replace(/%s/, encodeURIComponent(artist.replace(/\?/,"%3F")));
      };
			// Widget for External Links

			/* 
			* Widget for Hydra Links 
			*/
			HydraLinksRessource = null;
			wHydraLinks =  new Widget("HydraLinks", HydraLinksRessource, NON_TOGGLEABLE);
			wHydraLinks.prepareRessourceUrl = function (artistname) {
					// nothing to do
			};
			wHydraLinks.createNodeFromScrapedContent = function () {
					var arr = [];
					var artist = this._currentArtist;
					SITES = site_functions;
					count = 0;
					for (var sitename in SITES){
						
						mySITE = SITES[sitename];
						searchurl = mySITE["searchurl"];
						name = mySITE["name"];
						icon = mySITE["icon"];
						if (searchurl != null) { 
							count = count +1;
							arr.push(this.getExternalLink(artist, searchurl, name,icon));
							if (count % 7 == 0) arr.push('<br>');
						}
					}

					var node = document.createElement("div");
					node.innerHTML = arr.join('') + '';
					this._contentNode = node;
			};
			
			wHydraLinks.getExternalLink = function (artist, mylink, name, icon) {
        return '<a href="' + mylink.replace(/%s/, encodeURIComponent(artist.replace(/\?/,"%3F"))) +'" target="_blank"><img src=\"' + icon + '\" style=\"width: 16px; height:16px;border-width: 0px; padding: 1px 1px 1px 1px;\" title=\"' + name + '\"></a>';
      };
			// Widget for HydraLinks

			/* 
			* Widget for Update Notfication 
			*/
			UpdateServiceRessource = {key: "UpdateService", url: RELEASE_INFORMATION_URL, save: false};
			wUpdateNotify =  new Widget("UpdateNotify", UpdateServiceRessource, NON_TOGGLEABLE);
			wUpdateNotify.prepareRessourceUrl = function (artistname) {
					  // avoid caching
						var rnd = Math.random(); 
						return this._ressource.url + "?rnd=" + rnd + "&installTime=" + installTime;
			};
			wUpdateNotify.onArtistChange = function(sender, e) {
					this._state = LOADING;
					this.render();
					this._currentArtist = null;
					var tempRessource = {key: this._ressource.key, url: this._ressource.url, save: this._ressource.save, artistname: null};
					tempRessource.url = this.prepareRessourceUrl(null);
					if ( GM_getValue('latestversion', 0) > VERSION) {
							logmsg('newer latest version available');
							this._state = LOADED;
							this._scrapedObject =  UPDATE_MESSAGE.replace(/%s/, GM_getValue('latestversionurl'));
							this.createNodeFromScrapedContent();
							this.render();
					} 
					else {
							logmsg('no newer vesion available');
							this._state = LOADED;
							this._scrapedObject =  "";
							this.createNodeFromScrapedContent();
							this.render();
					}
					var date = new Date();
					currentTime = Math.round(date.getTime() / (1000 * 60 * 60));
					lastcheckTime = GM_getValue('lastcheck', 0);
					if ((currentTime - lastcheckTime) > UPDATE_INTERVAL_HOURS){ 
						logmsg('loading UpdateNotify Ressource');
						RessourceLoader.loadRessource(tempRessource);
						GM_setValue('lastcheck',currentTime);
					}
					logmsg('cT: ' + currentTime);
					logmsg('lastcT: ' + lastcheckTime);
					logmsg((currentTime - lastcheckTime) + " > " + UPDATE_INTERVAL_HOURS);
			};
			wUpdateNotify.scraperImpl = function () {
						var parser = new DOMParser();
						result = parser.parseFromString(this._content, "application/xml");
						var date = new Date();
						currentTime = Math.round(date.getTime() / (1000 * 60 * 60));
						GM_setValue('lastcheck',currentTime);
						var releases = result.getElementsByTagName('release');
						var latest_version = releases[0].getAttribute('version');
						var latest_version_url = releases[0].getElementsByTagName('url')[0].textContent;
						GM_setValue('latestversion', latest_version);
						GM_setValue('latestversionurl', latest_version_url);
						logmsg('latesversion: ' + latest_version);
						if ( latest_version > VERSION) {
							logmsg('received information of newer version');
							return UPDATE_MESSAGE.replace(/%s/, GM_getValue('latestversionurl'));
						}
						logmsg('received information of up to date version');
						return "";
			};
			// Widget for Update Notification
			
	}
	
	// helper functions
	
	function $() {
		var elements = new Array();
		for (var i = 0; i < arguments.length; i++) {
			var element = arguments[i];
			if (typeof element == 'string')
				element = document.getElementById(element);
			if (arguments.length == 1)
				return element;
			elements.push(element);
		}
		return elements;
	}
	

  function basicClean(myString) {
       
				do {
					oldstring = myString;
					//var regexp0=new RegExp("<(object)[^>]*>.*<\/(object)>","i");
					var regexp0=new RegExp("<script[^>]*>[^<]*<\/script>","gi");
					var regexp1=new RegExp("<span class=\"wiki_continued\".*","i");
					var regexp2=new RegExp("<object[^>]*>.*<\/object>","i");
					//var regexp1=new RegExp("<(span).*?<\/(span)>","i");
					//regexp2 = new RegExp('<script.*?.*?</script>',"gi");
					//myString = myString.replace(regexp0,"");
					myString = myString.replace(regexp0,"");
					myString = myString.replace(regexp1,"");
					//myString = myString.replace(regexp1,"");
					myString = myString.replace(regexp2,"");
				} while (oldstring != myString);
        return myString;
   }
   

	function translateToBinaryString(text){
		var out='';
		for(i=0;i<text.length;i++){
			//*bugfix* by Marcus Granado 2006 [http://mgran.blogspot.com] adapted by Thomas Belot
			out+=String.fromCharCode(text.charCodeAt(i) & 0xff);
		}
		return out;
	}
	
	function buildDataScheme(responseText, dataScheme){
		//translating the text to a valid binary stream
		var stream = translateToBinaryString(responseText);
		//translating the binaryStream to Base64
		dataScheme+=window.btoa(stream);
		return dataScheme
	}
	
	// aaBBBcccDDDee.extract('BB','DD') returns BBBcccDD
	String.prototype.extract = function(startString, endString){
		var start = this.indexOf(startString);
		if (start == -1) {
			return '';
		}
		var choppedContent = this.substr(start);
		var end = choppedContent.indexOf(endString, startString.length);
		if (end == -1) {
			return '';
		}
		var extractedContent = choppedContent.substring(0, end+endString.length);	
		if (extractedContent.length > 0) return extractedContent
		else return '';
	}
	
	// aaBBBcccDDDee.extractInner('BB','DD') returns Bccc
	String.prototype.extractInner = function(startString, endString){
		var outerContent = this.extract(startString, endString);
		if (outerContent != '')
      var innerContent = outerContent.substring(startString.length, outerContent.length-endString.length);
		else return '';		
		return innerContent;
	}
	
	function getFlashContainerCode(width, height, movieUrl){
		return FLASH_CONTAINER.replace('%WIDTH', width).replace('%HEIGHT', height).replace('%MOVIE', movieUrl);
	}
	
	// Platypus functions and other html modification functions
	
	function notifyUpdate(){
		$("updatenotify").innerHTML = UPDATE_MESSAGE.replace(/%s/, GM_getValue('latestversionurl'));;
	}
	
	function modify_single_url(doc, match_re, replace_string, node) {
		if (node.href) 
			node.href = node.href.replace(match_re, replace_string);
	}
	
	function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
		match_re = new RegExp(match_re);
		if (global_flag) {
			var allurls = doc.getElementsByTagName('A');
			for(var i = 0, url; url = allurls[i]; i++)
			modify_single_url(doc, match_re, replace_string, url);
		} 
		else modify_single_url(doc, match_re, replace_string, node);
	}
	
	function insertAfter(newNode, target) {
		var parent = target.parentNode;
		var refChild = target.nextSibling;
		if(refChild != null)
			parent.insertBefore(newNode, refChild);
		else parent.appendChild(newNode);
	}
	
	function find_table(){
		var tds = document.getElementsByTagName("td");
		for (var i = 0; i < tds.length; i++)
			if (tds[i].className == "rowhead")
				return tds[i].parentNode.parentNode;
	}
	
	function find_it(doc, node, match_re, replace_string) {
		match_re = new RegExp(match_re);
		if( node != null) 
			return node.innerHTML.replace(match_re, replace_string);
		else return null;
	}
	
	function addGlobalStyle(css) {
		var head, style;
		head = document.getElementsByTagName('head')[0];
		if (!head) 
			return;
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}
	

	var DEBUG = false;
	function logmsg(message) {
		if (DEBUG) {
			console.log(message);
		}
	}
	
	function findMatchingSite(){
		SITES = site_functions;
		Finish: for (var sitename in SITES){
					logmsg(sitename);
					mySITE = SITES[sitename];
					url_res = mySITE["url"];
					var found = false;
					for (var elemI in url_res){
						var site_url_re = new RegExp(url_res[elemI]);							
						if ( location.href.match(site_url_re))	{
							logmsg(mySITE["name"] + " matched.");
							find_artist_name = new Function(mySITE["findArtist"]);
							logmsg(find_artist_name());
							MORE_LINK = mySITE["morelink"];
							logmsg("More link: " + MORE_LINK); 
							hook = new Function(mySITE["hook"]);
							isAudioRelease = new Function(mySITE["isAudioRelease"]);
							if (isAudioRelease()) {
								logmsg("This is an Audio release.");
								hook();
								logmsg("Hook installed");
								addGlobalStyle(CSS_CODE);
								addGlobalStyle(mySITE["css"]);
								artist = find_artist_name();
								
								if (artist != null) artist = artist.replace(/&amp;/,"&");	
								if (artist == null || artist.toLowerCase().indexOf('various') > -1 || artist.match(new RegExp("^VA.*"))) {
									logmsg('no artist to process');
									artist = null;
									addWidgets(artist);
									// TODO
									$("ArtistTitle").innerHTML = "<b>Sorry, the artist name could not be parsed.<br>However, you can still use the search box to the right.</b>";
									return;
								}
								addWidgets(artist);
								a(artist);
								break Finish;
							}
							else logmsg("This is not an audio release.");
							found = true;
							break Finish;
						}	
					}
					if (!found) logmsg(mySITE["name"] + " didn't match.");
		}			
	}	


	// here we go
	function do_it_baby() {
		//console.log('do it baby');
		/*
		artist = find_artist_name();	
		if (artist == null || artist == "Various Artists") return;
		//console.log('found artist: ' + artist);
		addGlobalStyle(CSS_CODE);
		centertable = find_table();
		//console.log('here am i');
		appendTableRow(window.document,centertable.lastChild.previousSibling);
		
		//check_for_new_version_init();
		addWidgets(artist);
		a(artist);
		*/
		//check_for_new_version_init();
		findMatchingSite();
		
	}
	
	do_it_baby();
	

	
	
} // main()


if(!window.GM_setValue)
{
	window.GM_setValue = function(valuename, value) { localStorage.setItem(valuename, value);; };
}
if(!window.GM_getValue)
{
	window.GM_getValue = function(name) { return localStorage.getItem(name); };
}

main();

})();

// here be monsters
//.user.js