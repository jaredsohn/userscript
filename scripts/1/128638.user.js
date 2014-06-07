// ==UserScript==
// @name           ORLYDB
// @namespace      http://userscripts.org/users/440142
// @description    Adds Binsearch links
// @include        http://www.orlydb.com/*
// @include        https://secure.orlydb.com/*
// ==/UserScript==

var ORLYDB_CSS_REPLACE =
  'span.release a {'
  + 'color:black;'
  + 'text-decoration:none;}';

var ORLYDB_CSS_HIGHLIGHT =
  'span.release a.greasemonkey-highlight {'
  + 'background:yellow;}';

var ORLYDB_CSS_ADD =
  'span.release a.greasemonkey-button {'
  + 'padding:0 5px;'
  + 'height:14px;'
  + 'background:#6C6;'
  + 'border-radius:7px;'
  + 'color:black;'
  + 'font-size:10px;'
  + 'text-decoration:none;}';

var ORLYDB_CSS_ADBLOCK =
  'a[href="http://www2.filedroid.net/AF_TA/rel/index.cfm?TAD=426567"] {'
  + 'display:none !important;}';

var ORLYDB_BINSEARCH = 'http://www.binsearch.info/?q=';
var ORLYDB_MYSTERBIN = 'http://www.mysterbin.com/search?q=';

document.styleSheets [0].insertRule (ORLYDB_CSS_REPLACE,   0);
document.styleSheets [0].insertRule (ORLYDB_CSS_ADD,       0);
document.styleSheets [0].insertRule (ORLYDB_CSS_HIGHLIGHT, 0);
//document.styleSheets [0].insertRule (ORLYDB_CSS_ADBLOCK,   0);

function createLink (name, href, c)
{
  var a = document.createElement ('a');
  a.setAttribute ('href', href);
  a.setAttribute ('class', c || null);
  a.innerHTML = name;
  return a;
}

function add (span, name, href)
{
  var link = createLink (name, href, 'greasemonkey-button');
  var spacer = document.createTextNode (' ');
  span.insertBefore (link,   span.lastChild);
  span.insertBefore (spacer, span.lastChild);
}

function replace (span, release, prefix)
{
  var groups = ['LOST', 'FHD', 'AYMO', 'ULSHD', 'ROUGH', 'PURE', '4kHD',
                'CiNEFiLE', 'SiNNERS', 'MELiTE', 'AMIABLE', 'REFiNED',
                'SECTOR7', 'Felony', 'Japhson',
                'SAiNTS', 'REWARD', 'HAGGiS',
                'LOL', 'DIMENSION', '2HD', 'IMMERSE', 'ASAP', 'FQM', 'ORENJI'];
  var regex = new RegExp ('-(' + groups.join ('|') + ')$');
  var highlight = regex.test (release) ? 'greasemonkey-highlight' : '';
  var link = createLink (release, prefix + release, highlight);
  span.replaceChild (link, span.lastChild);
}

function main ()
{
  var releases = document.getElementsByClassName ('release');
  for (var i in releases)
  {
    var span    = releases [i];
    var release = span.innerHTML;
    replace (span, release, ORLYDB_BINSEARCH);
    //add (span, 'BS', ORLYDB_BINSEARCH + release);
    //add (span, 'MB', ORLYDB_MYSTERBIN + release);
  }
}

main ();

