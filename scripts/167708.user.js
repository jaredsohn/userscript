// ==UserScript==
// @name       RDIO To Spotify and Google Music
// @namespace  http://do.whatever.you.like.with.it/
// @version    0.3
// @description  Adds links to open new releases in Spotify and Google Music since RDIO has a good new release list.
// @match      http://www.rdio.com/*
// @copyright  2013+, Me
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
    var divs = document.getElementsByClassName('Album');
    for (var i=0; i<divs.length; i++) {
    var a = divs[i].getElementsByTagName('a')[0];
    if (!a.className || !a.className.match(/_seen_/)) {
        var res;
        if (res = a.href.match(/\/album\/([^\/]+)\/?/)) {
          album = massage(res[1]);
        }
        
        var newA = document.createElement('a');
        newA.innerHTML = 'Spotify &nbsp; ';
        newA.href = '#';
              
        var newAb = document.createElement('a');
        newAb.innerHTML = '  &nbsp; GoogleMusic';
        newAb.href = '#';
              
        newA.addEventListener('click',(function() {
          var _artist = artist;
          var _album = escape(album);
          return function(e) {
            var keywords = '';
            if (_artist) keywords += escape(_artist) + '+';
            if (_album) keywords += escape(_album);
                var url = 'spotify:search:album:'+_album;
            window.open(url,'_self');
          };
        })(),true);
              
        newAb.addEventListener('click',(function() {
          var _artist = artist;
          var _album = album;
          return function(e) {
            var keywords = '';
            if (_artist) keywords += escape(_artist) + '+';
            if (_album) keywords += escape(_album);
                var url = 'https://play.google.com/music/listen?u=0#/sr/'+_album;
            window.open(url,'_self');
          };
        })(),true);
                      
		var p = a.parentNode;

        p.style.marginTop= "-7px";
        p.appendChild(newA);
        p.appendChild(newAb);
              
        if (artistPage) {
          p = p.nextSibling.nextSibling;
        }
          
		addClass(a,'_seen_');
      }
    }
  }

  function main() {
    setInterval(checkLinks,3000);
  }

  main();

})();