// ==UserScript==
// @name           TheMusikPlus
// @description    Adds similar artists, tags, short bio and last.fm & Myspace player to TheMusik.org torrent details pages.
// @include        http://www.themusik.org/details.php*
// ==/UserScript==
// 
// ------------------------------------------------------------------------
// Copyright (c) 2007, interonaut
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Versions
// 1	2007/04/25	Original version
//
// This script is for use with the torrent tracker site OiNK.me.uk
// It adds information to torrent details pages.
//
// ------------------------------------------------------------------------
// Features
// - data from last.fm
// 	similar artists, 
// 	tags, 
// 	short bio, 
// 	preview player
// 
// - data from Myspace.com
// 	preview player 
// 
// - links to external resources
// 	last.fm band site
// 	Myspace band site	
// ------------------------------------------------------------------------
// 
// IMPORTANT NOTICE:
// The script does not and will not do automatic searches on the OiNK site, 
// because it is very harmful to the site's performance. If you had the 
// great idea of implementing such a feature you are STRONGLY advised not to do so.
// 
// OiNKPlus is not related to OiNK in any way. Use at own risk.
// 
// Some functions were created by the Platypus extension.
// 
// The script may frequently break, therefore it will automatically check for updated 
// versions every now and then.
//
// The author does not claim the code to be elegant. Ok? Fine.
//
// Suggestions, feedback and contributions welcome.
// 
// If you wanna make me smile, add me as a friend or leave me a comment on Myspace:
// 
// http://www.myspace.com/interonaut
// ------------------------------------------------------------------------

var VERSION = 1;
var MATCH_RE = 0;
var REPLACE_STRING = 1;
var TYPE_HTML = 0;
var TYPE_XML = 1;
// while in beta, we want to notify users of updates fast
var UPDATE_INTERVAL_HOURS = 2;
var MAX_TAGS = 5;
var MAX_SIMILAR_ARTISTS = 25;

var CSS_CODE =		"table.placeholder 	{ width:100%; }									\
			 table.placeholder td 	{ text-align: left; vertical-align:top; border: solid #000000 0px; }		\
			 td.leftinfo 		{ width:200px; }								\
			 td.artistpicture div	{ text-align: right; }";
			

var INFO_PLACEHOLDER = 	"<table class=\"placeholder\">						\
			<tr>									\
				<td>								\
					<h1><div id=\"currentartist\"></div></h1><br> 		\
					<div id=\"morelink\"></div><br><br> 			\
					<b>Tags:</b>						\
					<div id=\"tags\"></div><br>				\
				</td>								\
				<td class=\"artistpicture\"> 					\
					<div id=\"artistpicture\"></div>			\
				</td>								\
			</tr>									\
			</table>								\
			<b>Abstract:</b><br>							\
			<div id=\"lastfmbio\">nothing found</div><br>				\
			<b>Available songs:</b><br>						\
			<div id=\"lastfmplayer\"></div><br>					\
			<div id=\"myspaceplayer\"></div><br>					\
			<b>External links:</b><br>						\
			<div id=\"external\"></div><br>";

var BASIC_LAYOUT = 	"<table class=\"placeholder\"> 						\
				<tr> 								\
					<td class=\"leftinfo\"> 				\
						<h2><div id=\"artist\"></div></h2><br>		\
						<b>Similar artists:</b><br>	 		\
						<div id=\"similarArtists\"></div> 		\
					</td> 							\
					<td> 					\
					<div id=\"artistinfo\">					\
					</div>							\
					</td> 							\
				</tr>								\
				<tr> 								\
					<td class=\"leftinfo\"> 				\
						<div id=\"updatenotify\"></div>			\
					</td> 							\
					<td>							\
					</td> 							\
				</tr>								\
			</table>";


var NAME			= "TheMusikPlus";
var UPDATE_MESSAGE 		= "<a href=\"%s\">A new version of " + NAME + " is available.</a>";
var RELEASE_INFORMATION_URL 	= "";
var LASTFM_ARTIST_URL 		= "http://www.last.fm/music/%s";
var LASTFM_LINK 		= "<a href=\"http://www.last.fm/music/%s\">Last.fm</a>";
var MYSPACE_URL			= "http://www.google.com/search?&q=site:myspace.com+%22%s%22&btnI";
var MYSPACE_LINK		= "<a href=\""+ MYSPACE_URL + "\">Myspace Band Site</a>";
var LASTFM_TAGS_URL 		= "http://ws.audioscrobbler.com/1.0/artist/%s/toptags.xml";
var LASTFM_SIMILAR_URL 		= "http://ws.audioscrobbler.com/1.0/artist/%s/similar.xml";
var MORE_LINK 			= "More from <b><a href=\"/browse.php?search=%s&incldead=1\">%s</a></b> on TheMusik";

var ARTIST_NAME_XPATH 		= '/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[3]/TD[1]/H1[1]';
var LAST_TABLE_ROW_XPATH 	= '/HTML[1]/BODY[1]/TABLE[2]/TBODY[1]/TR[3]/TD[1]/TABLE[2]/TBODY[1]/TR[18]';


// Array(match_re, replace_string)
var ARTIST_RE 			= new Array(/http:\/\/themusik\.org\/search\.php\?artist=(.*)/, 	'$1');
var ARTIST_BIO_RE 		= new Array(/.*\/music\/(.*)\/\+wiki/, 				'http://www.last.fm/music/$1/+wiki');
var LASTFM_LINK_RE 		= new Array(/.*\/music\/(.*)/, 					'http://www.last.fm/music/$1');

var similarArtists = new Array();

var artist;

function a(artist){
	addDetailsForArtist(artist, false)
}

var functions = new Array (	function () { a(similarArtists[0]);   },function () { a(similarArtists[1]);   },
				function () { a(similarArtists[2]);   },function () { a(similarArtists[3]);   },
				function () { a(similarArtists[4]);   },function () { a(similarArtists[5]);   },
				function () { a(similarArtists[6]);   },function () { a(similarArtists[7]);   },
				function () { a(similarArtists[8]);   },function () { a(similarArtists[9]);   },	
				function () { a(similarArtists[10]);   },function () { a(similarArtists[11]);   },
				function () { a(similarArtists[12]);   },function () { a(similarArtists[13]);   },
				function () { a(similarArtists[14]);   },function () { a(similarArtists[15]);   },
				function () { a(similarArtists[16]);   },function () { a(similarArtists[17]);   },
				function () { a(similarArtists[18]);   },function () { a(similarArtists[19]);   },
				function () { a(similarArtists[20]);   },function () { a(similarArtists[21]);   },
				function () { a(similarArtists[22]);   },function () { a(similarArtists[23]);   },
				function () { a(similarArtists[24]);   },function () { a(similarArtists[25]);   }

);


function parseMySpacePage(myspacePage){	
	avoidLoadingImages(myspacePage);
	var embObjects = myspacePage.getElementsByTagName("object");
	for (var i = 0; i < embObjects.length; i++){
		if (embObjects[i].id == 'mp3player') {
			player = document.getElementById("myspaceplayer");
			player.innerHTML ="<object>" +embObjects[i].innerHTML + "</object>";
			disableAutoplay();
			printExternalLink(document.getElementById("currentartist").firstChild.innerHTML, MYSPACE_LINK);
		}
	}
}


function parseLastFMPage(lastFMPage){
	document.getElementById("lastfmbio").innerHTML = lastFMPage.getElementsByTagName("div")[17].innerHTML;	
	modify_single_url(window.document, ARTIST_BIO_RE[MATCH_RE], ARTIST_BIO_RE[REPLACE_STRING], document.getElementById("lastfmbio").lastChild.previousSibling); 
	
	var divs = lastFMPage.getElementsByTagName("div");
	for (var i = 0; i < divs.length; i++){
		if (divs[i].id == 'flashContainer') {
			document.getElementById("lastfmplayer").innerHTML = divs[i].lastChild.previousSibling.innerHTML.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
		}
		if (divs[i].className == 'imgHolder') {
			document.getElementById("artistpicture").innerHTML = divs[i].innerHTML;
			modify_single_url(window.document, LASTFM_LINK_RE[MATCH_RE], LASTFM_LINK_RE[REPLACE_STRING], document.getElementById("artistpicture").getElementsByTagName("a")[0]);
		}
	}
}

function parseLastFMTags(dom){
	var entries = dom.getElementsByTagName('tag');
	var title = '';						
	for (var i = 0; i < MAX_TAGS && i < entries.length; i++) {
		var tag = entries[i].getElementsByTagName('name')[0].textContent;
		document.getElementById("tags").innerHTML = document.getElementById("tags").innerHTML +  tag + ", " ;
	}
}

function parseLastFMSimilar(dom){
	var entries = dom.getElementsByTagName('artist');
	var title;
	var div = document.createElement('div');
	var artistname;
	for (var i = 0; i < MAX_SIMILAR_ARTISTS && i < entries.length; i++) {
		
		artistname = entries[i].getElementsByTagName('name')[0].textContent;
		similarArtists[i] = artistname;
		var artistlink = document.createElement('a');
 		artistlink.innerHTML = artistname;
		artistlink.href= "javascript:return false;";
		artistlink.id = artistname;
		// ugly:
 		artistlink.addEventListener("click", functions[i], false);
		// doesn't work: artistlink.addEventListener("click", function () { a(artistname); }, false);
		div.appendChild(artistlink);
		div.appendChild(document.createElement("<br>"));	
	}
	document.getElementById("similarArtists").appendChild(div);
	
}


function do_http_request(url, res_type, callbackFunc){
	GM_xmlhttpRequest({
		method: "GET",
			url: url,
		onload: function(res) {
			var result;
			if (res_type == TYPE_HTML) {
				
				var range = document.createRange();
				range.selectNode(document.body);
				var parsedHTML = range.createContextualFragment(res.responseText);
				result = document.createElement("div");
				result.appendChild(parsedHTML);
			} else
			if (res_type == TYPE_XML) {
				
				var parser = new DOMParser();
				result = parser.parseFromString(res.responseText, "application/xml");
			}

			callbackFunc(result);							
		}
	});
	
}


function addDetailsForArtist(artist, originalArtist){
	
	document.getElementById("artistinfo").innerHTML = INFO_PLACEHOLDER;
	
	var wikilink = document.createElement('a');
 	wikilink.innerHTML = artist;
	wikilink.href= "http://en.wikipedia.org/wiki/search?search="+artist;
	document.getElementById("currentartist").appendChild(wikilink);
	
	document.getElementById("morelink").innerHTML 	= MORE_LINK.replace(/%s/, artist.replace(/&amp;/g, '%26')).replace(/%s/, artist);

	do_http_request( LASTFM_ARTIST_URL.replace(/%s/, artist.replace(/&amp;/g, '%2526')), TYPE_HTML, parseLastFMPage);
	do_http_request( MYSPACE_URL.replace(/%s/, artist.replace(/&amp;/g, '&'))	, TYPE_HTML, parseMySpacePage);
	do_http_request( LASTFM_TAGS_URL.replace(/%s/, artist.replace(/&amp;/g, '%2526'))	, TYPE_XML,  parseLastFMTags);

	if (originalArtist)
		do_http_request(LASTFM_SIMILAR_URL.replace(/%s/, artist.replace(/&amp;/g, '%2526')), TYPE_XML, parseLastFMSimilar);

	printExternalLink(artist, LASTFM_LINK);
}


// yes, sometimes we want to check for updates

function check_for_new_version_init(){

	if ( GM_getValue('latestversion', 0) > VERSION) {
		notifyUpdate();
	} 
	
	var date = new Date();
	currentTime = Math.round(date.getTime() / (1000 * 60 * 60));
	lastcheckTime = GM_getValue('lastcheck', 0);
	
	if ((currentTime - lastcheckTime) > UPDATE_INTERVAL_HOURS){ 
		do_http_request(RELEASE_INFORMATION_URL, TYPE_XML, check_for_new_version_cont);
		GM_setValue('lastcheck',currentTime);
	}
}

function check_for_new_version_cont(dom){
	var date = new Date();
	currentTime = Math.round(date.getTime() / (1000 * 60 * 60));
	GM_setValue('lastcheck',currentTime);

	var releases = dom.getElementsByTagName('release');
	var latest_version = releases[0].getAttribute('version');
	var latest_version_url = releases[0].getElementsByTagName('url')[0].textContent;
	GM_setValue('latestversion', latest_version);
	GM_setValue('latestversionurl', latest_version_url);
	if ( latest_version > VERSION) {
		notifyUpdate();
	}
}

// Platypus functions and other html modification functions

function avoidLoadingImages(node){
	var imgs = node.getElementsByTagName('img');
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].src = '';
	}
}

function disableAutoplay(){
	player = document.getElementById("myspaceplayer");
	player.getElementsByTagName('embed')[0].src = player.getElementsByTagName('embed')[0].src.replace(/&a=0/, "&a=1");
	player.getElementsByTagName('param')[3].value = player.getElementsByTagName('param')[3].value.replace(/&a=0/, "&a=1");
	player.getElementsByTagName('param')[4].value = player.getElementsByTagName('param')[4].value.replace(/&a=0/, "&a=1");
			
}

function printExternalLink(artist, mylink){
	div =document.getElementById("external");
	div.innerHTML += "- " + mylink.replace(/%s/, artist) + "<br>";
}

function insertArtistLink(artist){
	var mylink = document.createElement('a');
 	mylink.innerHTML = artist;
	mylink.href= "javascript:return false;";
 	mylink.addEventListener("click", function () { a(artist); }, false);
	document.getElementById("artist").appendChild(mylink);		
}


function notifyUpdate(){
	document.getElementById("updatenotify").innerHTML = UPDATE_MESSAGE.replace(/%s/, GM_getValue('latestversionurl'));;
}

function modify_single_url(doc, match_re, replace_string, node) {
    if (node.href) {
node.href = node.href.replace(match_re, replace_string);
    };
};
function do_modify_url_it(doc, node, match_re, replace_string, global_flag) {
    match_re = new RegExp(match_re);
    if (global_flag) {
var allurls = doc.getElementsByTagName('A');
for(var i = 0, url; url = allurls[i]; i++)
  modify_single_url(doc, match_re, replace_string, url);
    } else {
modify_single_url(doc, match_re, replace_string, node);
    };
};

function insertAfter(newNode, target) {
    var parent = target.parentNode;
    var refChild = target.nextSibling;
    if(refChild != null)
parent.insertBefore(newNode, refChild);
    else
parent.appendChild(newNode);
};

function find_table(){
	var tds = document.getElementsByTagName("td");
	for (var i = 0; i < tds.length; i++){
		if (tds[i].className == "rowhead")
			return tds[i].parentNode.parentNode;
	}
}

function appendTableRow(doc, element){
	var new_row = element.cloneNode(true);
	new_row.firstChild.innerHTML = NAME;
	new_row.firstChild.nextSibling.innerHTML = BASIC_LAYOUT;
	insertAfter(new_row,element);
	
}

function find_it(doc, node, match_re, replace_string) {
  match_re = new RegExp(match_re);
    if( node != null) 
    	return node.innerHTML.replace(match_re, replace_string);
    else 
	return null;

}

function find_artist_name() {
  var as = document.getElementsByTagName("h1");
  var title = as[0].innerHTML;	
  var name = title.split(" - ");
  
  return name[0];
  
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


// here we go
function do_it_baby() {
	
	addGlobalStyle(CSS_CODE);
	centertable = find_table();
	
        appendTableRow(window.document,centertable.lastChild.previousSibling);

	artist = find_artist_name();

	//artist = find_it( window.document,document.evaluate(ARTIST_NAME_XPATH, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,ARTIST_RE[MATCH_RE],ARTIST_RE[REPLACE_STRING]);
	
	if (artist == null || artist == "Various Artists") return;

	//appendTableRow(window.document, document.evaluate(LAST_TABLE_ROW_XPATH, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue);

	//check_for_new_version_init();

	insertArtistLink(artist);
	
	addDetailsForArtist(artist, true);	

}; 

do_it_baby();




// here be monsters


//.user.js