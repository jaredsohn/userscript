// ==UserScript==
// @name           Service buttons on friendfeed everyone's page
// @namespace      http://userscripts.org/scripts/show/34614
// @include        http://friendfeed.com/public*
// @description    Adds a frame to the everyone page with clickable favicons to view that service only.
// @version        0.3
// ==/UserScript==

var gmScript_url = "http://userscripts.org/scripts/source/34614.user.js";
var gmScript_name = "Service buttons on friendfeed everyone page";
var gmScript_version = 0.3;

//All friendfeed services.
var services = new Array("blog", "tumblr", "delicious", "diigo", 
						 "furl", "googleshared", "magnolia", "misterwong", 
						 "stumbleupon", "goodreads", "librarything", "digg", 
						 "googlereader", "mixx", "reddit", "flickr", "picasa",
 						 "smugmug", "zooomr", "googletalk", "identica", "jaiku",
						 "plurk", "pownce", "twitter", "ilike", "lastfm", "pandora", 
						 "seesmic", "vimeo", "youtube", "disqus", "intensedebate", 
						 "amazon", "linkedin", "netflix", "polyvore", "slideshare", 
						 "tipjoy", "upcoming", "yelp", "internal", "brightkite", 
						 "netvibes","facebook", "joost", "backtype", "twine", "wakoopa");

//needed HTML for the frame.					 
var frame = new Array();
frame[0] = '<div class="profilebox graybox"><div class="t"><div class="b"><div class="l"><div class="r"><div class="tr"><div class="tl"><div class="br"><div class="bl"><div class="section stats"><h4><a href="http://friendfeed.com/public">All Services</a></h4>'
frame[1] = '</div></div></div></div></div></div></div></div></div></div>';

//needed HTML for the favicons
var fav = new Array();
fav[0] = '<a title="';
fav[1] = '" href="/public?service=';
fav[2] = '"><img style="margin-right:6px; margin-bottom:5px" src="/static/images/icons/';
fav[3] = '.png" alt="FriendFeed" ></a>';

function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.
    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}

//Make the favicons links.
function buildFavLinks(){
	var str = '';
	var len = services.length;
	
	services.sort();
	for(var i=0; i<len; i++)
	{
		str += fav[0]+services[i]+fav[1]+services[i]+fav[2]+services[i]+fav[3];
	}
	return str;
}

//Put the whole thing toghether and put it in place.
function build(){
	$('#mainmainsizer').before(frame[0]+buildFavLinks()+frame[1]);
}

function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { 
		window.setTimeout(GM_wait,100); 
	}else{ 
		$ = unsafeWindow.jQuery; 
		build(); 
	}
}

autoUpdateFromUserscriptsDotOrg(
	{
		name: gmScript_name,
		url: gmScript_url,
		version: gmScript_version,
	}
);

GM_wait();