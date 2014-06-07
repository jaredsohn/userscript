// ==UserScript==
// @name        Anime ddlink
// @description	Spice up the AniDB main page, watch or download the most recent titles.

// @author	anime_sites

// @include     http://anidb.net/

// @include	http://anidb.net/perl-bin/animedb.pl?show=main
// @include	http://zeroanime.net/
// @version     0.02

// @grant GM_xmlhttpRequest
// @history 	0.02.4	Watchanimeon.com links are ready.
// @history 	0.02.3	Chrome ready: DOMParser unsupported resulted null. -facepalm-
// @history	0.02.2	Matching titles and pictures doesn't works if there are two running series with similar names
// @history	0.02.1	There are some obvious mistakes because the script can't read in English nor Japanese
// ==/UserScript==

(function(DOMParser) {
    "use strict";
  
    var
      DOMParser_proto = DOMParser.prototype
    , real_parseFromString = DOMParser_proto.parseFromString
    ;
  
    // Firefox/Opera/IE throw errors on unsupported types
    try {
        // WebKit returns null on unsupported types
        if ((new DOMParser).parseFromString("", "text/html")) {
            // text/html parsing is natively supported
            return;
        }
    } catch (ex) {}
  
    DOMParser_proto.parseFromString = function(markup, type) {
        if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
            var
              doc = document.implementation.createHTMLDocument("")
            ;
  
            doc.body.innerHTML = markup;
            return doc;
        } else {
            return real_parseFromString.apply(this, arguments);
        }
    };
}(DOMParser));


var count = {
  i: 0,
  more: function() {
    this.i += 1;
    if (this.i == 3) {
      if (window.location.host == 'anidb.net') document.getElementById('latestnews').getElementsByTagName('div')[0].innerHTML = (Number(s_kanji.length) + Number(s_name.length)) + ' release loading...';

	//subbed Anime, foreign subtitles, RAW, Batch, H-anime
      var category = [1, 10, 7, 11, 12];

      for (var j = 0; j < category.length; j += 1) {
	//Subbed Anime
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://tokyotosho.info/?cat=" + category[j],
	  onload: function(response) {
	    var responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
	    Toshokan(responseXML);
	    torrent_count.more();
	  }
	});
      }; //--category end

	//subbed Anime, foreign subtitles, RAW, 
        category = ['1_37', '1_38', '1_11'];

      for (var j = 0; j < category.length; j += 1) {
	//Subbed Anime
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://www.nyaa.eu/?page=search&cats=" + category[j],
	  onload: function(response) {
	    var responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
	    Nyaa(responseXML);
	    torrent_count.more();
	  }
	});
      }; //--category end
        
	//Watch Anime
	GM_xmlhttpRequest({
	  method: "GET",
	  url: "http://www.watchanimeon.com/latest-anime-episodes/",
	  onload: function(response) {
	    var responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
	    WatchAnimeOn(responseXML);
	    torrent_count.more();
	  }
	}); //--category end

    };
  }
};

var torrent_count = {
  i: 0,
  more: function() {
    this.i += 1;
    if (this.i == 9 && window.location.host == 'anidb.net') {
	if (magnet.length == 0) document.getElementById('latestnews').getElementsByTagName('div')[0].innerHTML = 'No ddl content available. @#!';
	var br   = document.createElement('br');
	document.getElementById('latestnews').getElementsByTagName('div')[0].appendChild( br );
        var copy = document.getElementsByClassName('g_odd g_bubble stripe')[3].innerHTML;
	for (var j = 0; j < magnet.length; j += 1) {
	      var similar = document.createElement('div')
	      similar.innerHTML     = copy;
	      similar.className   += 'g_odd g_bubble stripe';
	      similar.getElementsByTagName('img')[0].src = s_img[compare_batch( link_name[j], s_name )-1];
	      similar.getElementsByTagName('img')[0].style.width = "50px";
	      var delete_img = similar.getElementsByTagName('img')[1].parentNode;
	      delete_img.removeChild( similar.getElementsByTagName('img')[1] );
              var series_name = s_name[compare_batch( link_name[j], s_name )-1];
	      var link = document.createElement('a');
	      link.href 	= magnet[j];
	      link.textContent 	= link_name[j] + ' | ' + series_name;
	      similar.getElementsByClassName('data')[0].removeChild ( similar.getElementsByClassName('data')[0].childNodes[1] );
	      if ( watch[ series_name ] != undefined) {
                var link_watch = document.createElement('a');
                link_watch.href= watch[ series_name ];
                link_watch.textContent = "[Watch]";
                similar.getElementsByClassName('data')[0].appendChild( link_watch );
              }; 
	      similar.getElementsByClassName('data')[0].appendChild( link );
	      document.getElementById('latestnews').getElementsByTagName('div')[0].appendChild( similar );
	};
    };
    if (this.i == 9 && window.location.host == 'zeroanime.net') {
	div = document.createElement('div');
	div.style.width = "150px";
	document.getElementsByClassName('wrap')[0].innerHTML = ''
	document.getElementsByClassName('ad160')[0].innerHTML = ''
	document.getElementsByClassName('ad160')[0].appendChild( div );
	if (magnet.length == 0) div.innerHTML = 'No ddl content available. @#!';
	for (var j = 0; j < magnet.length; j += 1) {
		var br   = document.createElement('br');
		var link = document.createElement('a');
		link.href 	= magnet[j];
		link.textContent= link_name[j] + ' | ' + s_name[compare_batch( link_name[j], s_name )-1]+'';
		div.appendChild( link );
		div.appendChild( br );
		var br   = document.createElement('br');
		div.appendChild( br );
	};
    };
  }
};


function compare_release( filename, episode ) {
  var bracket = filename.match(/[\]\)]([^\[\(]+)/);
  if ( bracket != undefined && bracket.length > 1 ) { bracket = bracket[1]; 
   } else { bracket = filename; }
  var tag     = episode.match(/[^ \.,:\-\"]+/g);
  var number  = bracket.match(/[0-9]+/g);
  var found = 0; 
  var bug     = 0;
  var bracket_tag = bracket.match(/[^ \.,:\-\"]+/g); //DONE v0.02.2: titles and pictures
  for (var i = 0; i < tag.length; i += 1) {
    if ( isNaN(tag[i]) ) if ( filename.indexOf(tag[i]) == -1 ) found += 1;
  //  if ( isNaN(tag[i]) && tag[i].length < 3 ) { bug = +1; }; //Overengineering :P
    if ( i == 0 && bracket_tag != null && isNaN(tag[i]) && tag[i] != bracket_tag[i])   return false; //DONE v0.02.1: first word matches
    if (!isNaN(tag[i]) && number == null)			return false;
    if (!isNaN(tag[i]) ) if ( number.indexOf(tag[i])   == -1 ) return false;
  };
  if (found + bug > 0 || tag.length == found) return false; 
  return true;
  //WHERE filename > episode  
};

function compare_batch( filename, s_episode ) {
  for (var k = 0; k < s_episode.length; k += 1) {
    var t = s_episode[k];
    if ( compare_release(filename,t) ) return k+1;
  };
  return false;
};

var magnet = [];
var link_name = [];
var magnet_all = [];
var link_name_all = [];
var watch  = {};
function Toshokan(responseXML) {
  var desc_top = responseXML.getElementsByClassName('desc-top'); var seeder = responseXML.getElementsByClassName('stats'); for (i = 0; i < seeder.length; i += 1) if ( Number(seeder[i].textContent.match(/[0-9]+/)[0]) > 1 ) { if (compare_batch(desc_top[i].getElementsByTagName('a')[1].textContent, s_name)) { 
	magnet.push( desc_top[i].getElementsByTagName('a')[0].toString() );  
	link_name.push( desc_top[i].getElementsByTagName('a')[1].textContent );
       							};
	magnet_all.push( desc_top[i].getElementsByTagName('a')[0].toString() );
	link_name_all.push( desc_top[i].getElementsByTagName('a')[1].textContent )
	};
};

function Nyaa(responseXML) {
	var row = responseXML.getElementsByClassName('tlistsn'); var download = responseXML.getElementsByClassName('tlistdownload'); for (var i = 0; i < download.length; i += 1) if ( download[i].parentNode.getElementsByClassName('tlistsn')[0] != undefined && Number(download[i].parentNode.getElementsByClassName('tlistsn')[0].textContent) > 1 ) { 
	var link = download[i].parentNode.getElementsByClassName('tlistname')[0].textContent ;
	if (compare_batch( link, s_name )) {
	  magnet.push( download[i].getElementsByTagName('a')[0].toString() );
	  link_name.push( link );
	}
				 }
};

function WatchAnimeOn(responseXML) {
	var row = responseXML.getElementsByClassName('sip-list')[0].getElementsByTagName('a'); for (var i = 0; i < row.length; i += 1) { 
	var link = row[i].textContent;
        var index= compare_batch( row[i].textContent, s_name );
	if (index) watch[ s_name[index-1] ] = row[i].toString();
				 }
};

var s_kanji = [];
var s_name  = [];
var s_img   = [];
//Running
GM_xmlhttpRequest({
  method: "GET",
  url: "http://anidb.net/perl-bin/animedb.pl?show=calendar",
  onload: function(response) {
    responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
    var img   = responseXML.getElementsByClassName('image');
    var kanji = responseXML.getElementsByClassName('kanji'); for (i = 0; i < kanji.length; i += 1) { s_name.push( kanji[i].textContent.match(/^[^\(\)\[\]]+/)[0].trim() ); s_img.push( img[i].getElementsByTagName('img')[0].src ); };
    var name  = responseXML.getElementsByClassName('name-colored'); for (i = 0; i < name.length; i += 1) { s_name.push( name[i].textContent.match(/^[^\(\)\[\]]+/)[0].trim() ); s_img.push( img[i].getElementsByTagName('img')[0].src ); };
    count.more();
  }
});


//Anime series in previous month
date = new Date(); month = date.getMonth(); year = date.getFullYear();
if (month == 1) { month = 12; year -= 1; } else { month -= 1; }
GM_xmlhttpRequest({
  method: "GET",
  url: "anidb.net/perl-bin/animedb.pl?show=calendar&last.anime.month="+month+"&last.anime.year="+year,
  onload: function(response) {
    responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
    var img   = responseXML.getElementsByClassName('image');
    var kanji = responseXML.getElementsByClassName('kanji'); for (i = 0; i < kanji.length; i += 1) { s_name.push( kanji[i].textContent.match(/^[^\(\)\[\]]+/)[0].trim() ); s_img.push( img[i].getElementsByTagName('img')[0].src ); };
    var name  = responseXML.getElementsByClassName('name-colored'); for (i = 0; i < name.length; i += 1) { s_name.push( name[i].textContent.match(/^[^\(\)\[\]]+/)[0].trim() ); s_img.push( img[i].getElementsByTagName('img')[0].src ); };
    count.more();
  }
});


//Upcoming anime series
GM_xmlhttpRequest({
  method: "GET",
  url: "http://anidb.net/perl-bin/animedb.pl?show=calendar&do=schedule",
  onload: function(response) {
    responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
    var img   = responseXML.getElementsByClassName('image');
    var box = responseXML.getElementsByClassName('data'); for (var i = 0; i < box.length; i += 1) { release=box[i].getElementsByClassName('date'); ep=''; if (release.length > 0) ep = release[0].textContent; if (ep.match(/ep ([1-9]+)/) != undefined) { ep = ep.match(/ep ([1-9]+)/)[1]; } else { ep = ''; } s_name.push( box[i].parentNode.getElementsByClassName('name-colored')[0].textContent.match(/^[^\(\)\[\]]+/)[0].trim() + ' ' + ep );
	s_img.push( img[i].getElementsByTagName('img')[0].src );
	 kanji = box[i].getElementsByClassName('kanji'); if (kanji.length > 0) { 
		s_name.push( kanji[0].textContent.match(/^[^\(\)\[\]]+/)[0].trim() + ' ' + ep );
		s_img.push( img[i].getElementsByTagName('img')[0].src );
										}
	};
    count.more();
  }
});