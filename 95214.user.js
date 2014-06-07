// ==UserScript==
// @name           imdb2leech
// @namespace      http://userscripts.org/users/145873
// @description    Add links from IMDB movie pages to torrent sites -- easy downloading from IMDB
//
// Preference window for userscripts:
// @require        http://jerkface.net/software/45988.user.js
//
// @include        http://*.imdb.com/title/tt*
// @include        http://*.imdb.de/title/tt*
// @include        http://*.imdb.es/title/tt*
// @include        http://*.imdb.fr/title/tt*
// @include        http://*.imdb.it/title/tt*
// @include        http://*.imdb.pt/title/tt*
// ==/UserScript==
 
 
// Default preferences are stored in two places: defaults settings      
// for USP (here) and defaults for GM_getValue (below).  Make sure to  
// change both if you change one.                                      
try {
  USP.theScriptName = 'imdb2leech';
  USP.init({theName:'pirate_header_text', theText:'Header text:', theDefault:'Pirate this film'},
           {theName:'show_strikeout_links', theText:'Show crossed-out search misses?', theDefault:true},
           {theName:'debug_imdb2leech', theText:'Enable debugging code?', theDefault:true});
  GM_registerMenuCommand('Preferences for ~'+USP.theScriptName+'~', USP.invoke);
} catch (e) { };
 
// Default preferences are stored in two places: defaults settings for  
// USP (above), and defaults for GM_getValue (below).  Make sure to    
// change both if you change one.                                      
var show_strikeout_links = GM_getValue('show_strikeout_links', true);
var pirate_header_text = GM_getValue('pirate_header_text', 'Pirate this film') + ': ';
var debug_imdb2leech = GM_getValue('debug_imdb2leech', true);
var retard_cant_middle_click = false;
 
function add_link_areas()
{
  var action_box = document.getElementById('action-box');
  if (action_box) {
    var p = document.createElement('p');
    p.setAttribute('id', 'piratebox');
    action_box.insertBefore(p, action_box.firstChild);
  }
  var h1_list = document.getElementsByTagName('h1');
  if (h1_list) {
    var p = document.createElement('p');
    p.setAttribute('id', 'pirateheader');
    h1_list[0].parentNode.appendChild(p);
  }
}
 
function add_link(search_url, link_text, strikeout)
{
  var text = document.createTextNode(link_text);
  var a = document.createElement('a');
  a.setAttribute('href', search_url);
 
  if (retard_cant_middle_click)
    a.setAttribute('target', '_blank');
 
  if (strikeout) {
    var s = document.createElement('s');
    s.appendChild(text);
    a.appendChild(s);
  } else {
    a.appendChild(text);
  }
 
  var piratebox = document.getElementById('piratebox');
  if (piratebox) {
    if (!piratebox.hasChildNodes()) {
      piratebox.appendChild(document.createTextNode(pirate_header_text));
    }
    piratebox.appendChild(a.cloneNode(true));
    piratebox.appendChild(document.createTextNode(' '));
  }
  var pirateheader = document.getElementById('pirateheader');
  if (pirateheader) {
    if (!pirateheader.hasChildNodes()) {
      pirateheader.appendChild(document.createTextNode(pirate_header_text));
    }
    pirateheader.appendChild(a);
    pirateheader.appendChild(document.createTextNode(' '));
  }
}
 
function maybe_add_link(link_text, search_urls, search_fail_match)
{
  var search_url;
 
  if (typeof(search_urls) == 'object') {
    search_url = search_urls[0];
    search_urls.shift();
  } else {
    search_url = search_urls;
    search_urls = new Array;
  }
 
  var google_chrome = /chrome/.test(navigator.userAgent.toLowerCase());
  if (google_chrome) {
    add_link(search_url, link_text, false);
  } else {
    GM_xmlhttpRequest({
      method: 'GET',
      url: search_url,
      onload: function(responseDetails)
      {
        if (String(responseDetails.responseText).match(search_fail_match)) {
          if (search_urls.length) {
            maybe_add_link(link_text, search_urls, search_fail_match);
          } else {
            if (show_strikeout_links)
              add_link(search_url, link_text, true);
          }
        } else {
          add_link(search_url, link_text, false);
        }
 
        if (debug_imdb2leech) {
          GM_log([responseDetails.finalUrl + ' => ' + responseDetails.statusText,
                  "",
                  responseDetails.responseHeaders,
                  responseDetails.responseText
                 ].join("\n"));
        }
      }
    });
  }
}
 
var match = String(document.URL).match(/tt([0-9]*)\/?$/);
if (match) {
  var tt = 'tt' + match[1];
  var nott = match[1];
 
  add_link_areas();
 
  maybe_add_link('CG', Array('http://cinemageddon.net/browse.php?search=' + tt,
                             'http://cinemageddon.net/browse.php?descr=1&search=t' + nott),
                 /<h2>Nothing found!<\/h2>|<h1>Not logged in!<\/h1>/);
  maybe_add_link('TPB', 'https://thepiratebay.org/search/' + tt,
                 /No hits. Try adding an asterisk in you search phrase.<\/h2>/);
  maybe_add_link('D', 'http://www.demonoid.me/files/?query=' + tt, /<b>No torrents found<\/b>|We are currently performing the daily site maintenance.<br>/);
  maybe_add_link('KG', 'http://www.karagarga.net/browse.php?search_type=imdb&search=' + nott,
                 /<h2>Nothing found!<\/h2>|<h1>Not logged in!<\/h1>/);
  maybe_add_link('Tik', 'http://cinematik.net/browse.php?srchdtls=1&incldead=1&search=' + tt,
                 /The page you tried to view can only be used when you're logged in|<h2>Nothing found!<\/h2>/);
  maybe_add_link('SM', Array('http://www.surrealmoviez.info/advanced_search.php?simdb=' + tt,
                             'http://www.surrealmoviez.info/search.php?stext=' + tt),
                 /0 Movies found matching search criteria|You need to be logged in to view this page/);
  maybe_add_link('ILC', 'http://www.iloveclassics.com/browse.php?incldead=1&searchin=2&search=' + tt,
                 /Try again with a refined search string|<h1>Not logged in!<\/h1>/);
  maybe_add_link('Goem', 'http://goem.org/browse.php?s_type=2&cat=0&search=' + tt,
                 /Try again with a refined searchstring|<h1>Note: You need cookies enabled to log in.<\/h1>/);
  maybe_add_link('x264', 'http://sceneaccess.org/browse?method=1&search=' + tt,
                 /Try again with a refined search string.|<h1>Note: Three (3) failed login attempts will result in a temporary security lockout.<\/h1>/);
  maybe_add_link('SCC', 'http://x264.me/browse.php?incldead=0&xtype=0&stype=3&search=' + tt,
                 /Try again with a refined search string.|<h1>Forgot your password?<\/h1>/);
  maybe_add_link('ADVD', 'http://asiandvdclub.org/browse.php?descr=1&btnSubmit=Submit&search=' + tt,
                 /Your search returned zero results|<h1>You need cookies enabled to log in.<\/h1>/);
  maybe_add_link('NZB',
    'http://0000000000nzbmatrix.com/nzb-search.php?cat=0&searchin=weblink&maxage=0&grp=&larger=0&smaller=0&minhits=0&maxhits=0&sort=0&type=asc&search=' + tt,
    /^$|The search found no results, please try again\./); // When not logged in, NZB returns an empty page with a "refresh: 0; url=..." HTTP header.
 
  var title = document.title;
  //var search_string = title.replace(/ +\(.*/, '').replace(/[^a-zA-Z0-9]/g, ' ').replace(/ +/g, '+');
  var search_string = title.replace(/ +\(.*/, '').replace(/ +/g, '+');
 
  maybe_add_link('PTP', 'http://passthepopcorn.me/torrents.php?imdb=' + tt, /<h2>Your search did not match anything.<\/h2>/);
  maybe_add_link('BitHD', 'http://www.bit-hdtv.com/torrents.php?cat=0&description_search=1&search=' + tt, /<h2>No match!<\/h2>/);
  maybe_add_link('RevTT', 'https://www.revolutiontt.net/browse.php?search=' + tt, /<h2>Nothing found!<\/h2>/);
  maybe_add_link('Avax', 'http://0000000000avaxsearch.com/avaxhome_search?a=&exact=1&c=54&l=&sort_by=relevance&commit=Search&q=' + search_string,
    /raquo;, found 0 post\(s\)./); // This doesn't work right for unicode titles.  C.f. http://akas.imdb.com/title/tt0090985/
  /*
  // I don't have an account on TehC.  Some guy who doesn't know what "." means in regexes wrote the following:
  maybe_add_link('TehC', 'http://tehconnection.eu/torrents.php?searchstr=' + search_string,
     /You will be banned for 6 hours after your login attempts run out.|<h2>No Search Results, try reducing your search options.<\/h2>/);
  */
}
