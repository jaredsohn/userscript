// ==UserScript==
// @name          Rdio/Amazon
// @namespace     http://jeffpalm.com/rdio-amazon
// @description   Provides Amazon links for albums/songs not available on rd.io
// @include       *rdio.com/#*
// ==/UserScript==

(function() {

  function massage(s) {
    if (s) {
      s = s.replace(/_\d+$/,'');
      s = s.replace(/_/g,' ');
    }
    return s;
  }

  function getNameAndType() {
    var hash = document.location.hash.replace(/#/,'');
    var res;
    var artist = null;
    var album = null;
    if (res = hash.match(/\/artist\/([^\/]+)\/album\/([^\/]+)/)) {
      artist = res[1];
      album = res[2];
    } else if (res = hash.match(/\/artist\/([^\/]+)/)) {
      artist = res[1];
    }
    artist = massage(artist);
    album = massage(album);
    return {artist:artist, album:album};
  }

  function addClass(node,cls) {
    if (!!node.className) {
      node.className += ' ' + cls;
    } else {
      node.className = cls;
    }
  }
  
  function checkLinks() {
    var nat = getNameAndType();
    var artist = nat.artist;
    var album = nat.album;
    var artistPage = !album;
    var divs = document.getElementsByClassName('no_stream');
    for (var i=0; i<divs.length; i++) {
      var a = divs[i].getElementsByTagName('a')[0];
      if (!a.className || !a.className.match(/_seen_/)) {
	var res;
	if (res = a.href.match(/\/album\/([^\/]+)\/?/)) {
	  album = massage(res[1]);
	}
	var newA = document.createElement('a');
	newA.innerHTML = 'search';
	newA.href = '#';
	var alt = null;
	if (!!album && !!artist) {
	  alt = 'Search for ' + album + ' by ' + artist;
	} else if (!!artist) {
	  alt = 'Search for ' + artist;
	}
	if (alt) newA.alt = alt;
	newA.addEventListener('click',(function() {
	  var _artist = artist;
	  var _album = album;
	  return function(e) {
	    var keywords = '';
	    if (_artist) keywords += escape(_artist) + '+';
	    if (_album) keywords += escape(_album);
            var url = 'http://www.amazon.com/s/ref=nb_sb_ss_i_0_32?' +
	      'url=search-alias%3Ddigital-music&field-keywords=' + 
	      keywords + '&x=0&y=0&sprefix=' + keywords;
	    window.open(url,'__rdio_amazon__');
	  };
	})(),true);
	var p = a.parentNode;
	if (artistPage) {
	  p = p.nextSibling.nextSibling;
	}
	p.appendChild(newA);
	addClass(a,'_seen_');
      }
    }
  }

  function main() {
    setInterval(checkLinks,3000);
  }

  main();

})();