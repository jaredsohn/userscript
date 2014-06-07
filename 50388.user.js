scr_meta=<><![CDATA[
// ==UserScript==
// @name           Download Songs from Project Playlist
// @namespace      sizzlemctwizzle
// @description    This script allows you to download ALL SONGS on playlist.com by using a different method than all those other scripts that just use the visible url. Now provides links to download an entire playlist!!!
// @version        2.2.1
// @include        *.playlist.com/*
// ==/UserScript==
]]></>;

// Things have gotten fairly complex =[
function getSongs() {
  var links = document.evaluate(
				'//a[@class="blog"]',
				document, 
				null, 
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var original = document.evaluate(
				   '//span[@class="url"]',
				   document, 
				   null,
				   XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if (unsafeWindow.trackdata) {
    for (var i = 0; i < links.snapshotLength; i ++) { // CDN Urls
      link = links.snapshotItem(i);
      sbox = new Array(255);
      mykey = new Array(255);
      link.href = decrypt(unsafeWindow.trackdata[i].song_url, 'sdf883jsdf22');
      link.innerHTML = "Download song";
    }
  }
  for (var j = 0; j < original.snapshotLength; j++) { // Original Site Urls
      span = original.snapshotItem(j);
      url = span.getAttribute('title');
      span.innerHTML = '<a href="'+url+'">'+span.innerHTML+'</a>';
      if ((url.substr(url.length-4, url.length) == ".mp3") & (span.innerHTML.indexOf('(MP3)') == -1)) span.innerHTML += ' (MP3)';
  }
}

function parseSongs(responseText, id) {
    var parser = new DOMParser();
    var dom = parser.parseFromString(responseText, 'application/xml');
    var locations = dom.getElementsByTagName('location');
    var titles = dom.getElementsByTagName('annotation');
    var originals = dom.getElementsByTagName('originallocation');
    $('progress_'+id).style.display = 'none';
    for (var i = 0; i < locations.length; i ++) {
      sbox = new Array(255);
      mykey = new Array(255);
      location = decrypt(locations[i].textContent, 'sdf883jsdf22');
      title = titles[i].textContent;
      original = originals[i].textContent;
      result = document.createElement('li');
      result.innerHTML += title;
      result.innerHTML += ' <a href="'+location+'">(download)</a>';
      result.innerHTML += '<p class="loc"><a href="'+original+'" title="'+original+'">'+(original.length > 40 ? original.substring(0,40) + '...' : original)+ '</a></p>';
      $('results_'+id).appendChild(result);
    }
  }

  function grabSongs(playlist_id) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://pl.playlist.com/pl.php?e=1&playlist='+playlist_id+'&app=wid_si',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(responseDetails) { parseSongs(responseDetails.responseText, playlist_id); }
      });
  }

function getPid(i) {
  params = $('downlink_'+i).parentNode.getElementsByTagName('param');
     for (var j = 0; j < params.length; j ++) {
       if (params[j].getAttribute('name') == 'flashvars') return params[j].getAttribute('value').split('playlist_id=')[1].split('&')[0];
	 }
}

// Get the download links for an entire playlist
function showPlaylist(holder, id, height, width) {
  var minisearch = document.createElement('div');
  minisearch.className = 'minisearch';
  minisearch.id = 'minisearch_'+id;
  minisearch.setAttribute('style', 'height:'+(height-22)+'px; width:'+(width-22)+'px;');
  minisearch.innerHTML = '<input type="button" class="minisearch_close" onclick="document.getElementById(\'minisearch_'+id+'\').parentNode.removeChild(document.getElementById(\'minisearch_'+id+'\'));" value="X"/>'+
'<div class="minisearch_summary" style="height:'+(height-50)+'px; width:'+(width-35)+'px;">'+
'<div class="minisearch_progress" id="progress_'+id+'">'+
'<img src="http://images.playlist.com/static10/img/elements/indicator_vlarge.gif" alt="AJAX Progress" class="ap_vlarge"/>'+
'</div><div class="minisearch_resc"><ul id="results_'+id+'" class="minisearch_results"></ul>'+
'</div></div>';
  minisearch.style.display = 'block';
  insertAfter(minisearch, holder);
  $('progress_'+id).style.display = 'block';
  grabSongs(id);
}

function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling);}
function $(element) { return document.getElementById(element); }

function hexToChars (hex) {
          var a = new Array();
          var b = (hex.substr(0, 2) == '0x') ? 2 : 0;
          while (b < hex.length) {
            a.push(parseInt(hex.substr(b, 2), 16));
            b += 2;
          }
          return a;
}

function charsToStr (chars) {
          var a = '';
          var b = 0;
          while (b < chars.length) {
            a += String.fromCharCode(chars[b]);
            ++b;
          }
          return a;
}

function strToChars (str) {
          var a = new Array();
          var b = 0;
          while (b < str.length) {
            a.push(str.charCodeAt(b));
            ++b;
          }
          return a;
}

function initialize (pwd) {
          var a = 0;
          var b;
          var c = pwd.length;
          var d = 0;
          while (d <= 255) {
            mykey[d] = pwd[d % c];
            sbox[d] = d;
            ++d;
          }
          d = 0;
          while (d <= 255) {
            a = (a + sbox[d] + mykey[d]) % 256;
            b = sbox[d];
            sbox[d] = sbox[a];
            sbox[a] = b;
            ++d;
          }
}

function calculate (plaintxt, psw) {
          initialize(psw);
          var a = 0;
          var b = 0;
          var c = new Array();
          var d;
          var e;
          var f;
          var g = 0;
          while (g < plaintxt.length) {
            a = (a + 1) % 256;
            b = (b + sbox[a]) % 256;
            e = sbox[a];
            sbox[a] = this.sbox[b];
            sbox[b] = e;
            var h = (sbox[a] + sbox[b]) % 256;
            d = sbox[h];
            f = plaintxt[g] ^ d;
            c.push(f);
            ++g;
          }
          return c;
}

function decrypt(src, key) {
          var plaintxt = hexToChars(src);
          var psw = strToChars(key);
          var chars = calculate(plaintxt, psw);
          return charsToStr(chars);
}

// A little process that is required to work on Playlist Beta
function process() {
    results.removeEventListener('DOMNodeInserted', process, false);
    getSongs();
    results.addEventListener("DOMNodeInserted", process, false);
  }

if (/.*\.playlist\.com\/searchbeta\/tracks.*/.test(document.location.href)) {
var results = document.getElementById("resultsRow") || document.getElementById("results");
(results.id == "results") ? getSongs() : process();
 }

// Style to display results
var css = ".minisearch {"+
	"position: absolute;"+
	"z-index: 1;"+
	"background-color: white;"+
	"border: solid #8CAFDF 1px;"+
	"font-size: 1.0em;"+
	"display: none;"+
	"padding:10px;"+
"}"+
".minisearch_close {"+
	"float: right;"+
	"width:2em;"+
	"background: #000000;"+
	"border:0;"+
	"color: #ffffff;"+
"}"+
".minisearch_summary {"+
	"margin-top: 1em;"+
	"clear: both;"+
	"padding: 1em;"+
	"overflow: auto;"+
	"height: 16em;"+
"}"+
".minisearch_results {"+
	"padding: 0;"+
	"margin: 0;"+
	"list-style-type: none;"+
"}"+
".minisearch_results li {"+
	"line-height: 1.2em;"+
	"vertical-align: middle;"+
	"padding: 0.5em 0;"+
"}"+
".minisearch_results img {"+
	"width: 16px;"+
	"height: 16px;"+
	"vertical-align: middle;"+
"}"+
".minisearch_resc {"+
	"display: block;"+
	"padding: 0.5em 0 0 0;"+
"}"+
".minisearch_resc p {"+
	"margin: 0;"+
"}"+
".minisearch .loc {"+
	"margin: 0;"+
	"color: #000000;"+
	"font-size: 0.8em;"+
"}"+
".minisearch_progress {"+
	"text-align: center;"+
"}"+
".minisearch .ap_vlarge {"+
	"vertical-align: middle;"+
"}"+
".player_container_mini {"+
	"display: none;"+
	"width: 16px;"+
	"height: 16px;"+
	"float: left;"+
	"margin: 0 5px 0 0;"+
"}";
GM_addStyle(css);

// Display download links for playlists
var players = document.evaluate(
				'//object[contains(@data, "http://static.pplaylist.com/players/mp3player")]',
				document, 
				null, 
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < players.snapshotLength; i ++) {
  player = players.snapshotItem(i);
 link = document.createElement('a');
 link.href = "#";
 txt = document.createTextNode("Download");
 link.appendChild(txt);
 link.setAttribute('style', 'left: 370px ! important; top: 330px ! important; background-color:#FFFFFF ! important;');
 link.setAttribute('title', 'Click here to get download links for the entire playlist');
 link.id = "downlink_"+i;
 link.addEventListener('click',function (e) {
     showPlaylist(e.target, getPid(e.target.id.split('downlink_')[1]), player.getAttribute('height'),  player.getAttribute('width'));
     e.preventDefault();
   },false);
 player.parentNode.insertBefore(link, player);
 }

// Force playlist to open in a new page on profiles
var alts = document.evaluate(
				'//a[@target="_top"]',
				document, 
				null, 
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < alts.snapshotLength; i ++) {
  alts.snapshotItem(i).setAttribute('onclick', "return true;");
 }

CheckScriptForUpdate = {
 name: /\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],
 id: '36704',
 days: 2,
 time: new Date().getTime() | 0,
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Do you want to turn off auto updating for this script?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');});
	alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response) alert('No updates available for '+this.name);
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) {
      this.call();
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    } else {
      GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);});
    }
    }
};
if (self.location == top.location) CheckScriptForUpdate.check();