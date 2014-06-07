// ==UserScript==
// @name           Magnet Catcher
// @description    Magnet Catcher helps you catch torrents and turn them into magnet links.
// @version        0.42
// @namespace      http://userscripts.org/users/vovcacik
// @license        Creative Commons Attribution-Share Alike http://creativecommons.org/licenses/by-sa/3.0/
// @grant          none
// @include        http://*btdigg.org/*
// @include        http://*thepiratebay.se/*
// @include        http://*thepiratebay.org/*
// @include        http://*torrentz.eu/*
// @include        http://*torrentz.com/*
// @include        http://*1337x.org/*
// @include        http://*kat.ph/*
// @include        http://*kickasstorrents.com/*
// @include        http://*eztv.it/*
// @include        http://*newtorrents.info/*
// @include        http://*fenopy.eu/*
// @include        http://*isohunt.com/*
// @include        http://*mininova.org/*
// @include        http://*yourbittorrent.com/*
// @include        http://*h33t.com/*
// @include        http://*fulldls.com/*
// @include        http://*torrentbit.net/*
// @include        http://*limetorrents.com/*
// @include        http://*bitsnoop.com/*
// @include        http://*torrentcrazy.com/*
// @include        http://*btjunkie.org/* 
// @include        http://*monova.org/*
// @include        http://*extratorrent.com/*
// @include        http://*alivetorrents.com/*
// @include        http://*torrentpump.com/*
// @include        http://*torrenthound.com/*
// @include        http://*seedpeer.com/*
// @include        http://*torrentzap.com/*
// @include        http://*yourbittorrent.com/*
// @include        http://*torrentreactor.to/*
// @include        http://*torrentreactor.net/*
// @include        http://*rarbg.com/*
// @include        http://*mac-torrents.com/*
// @include        http://*torrentfunk.com/*
// @include        http://*btscene.com/*
// @include        http://*cinematorrents.com/*
// @include        http://*alivetorrents.com/*
// @include        http://*bitenova.org/*
// @include        http://*torrentbit.net/*
// @include        http://*torrentmatrix.com/*
// @include        http://*sumotorrent.com/*
// @include        http://*linuxtracker.org/*
// ==/UserScript==

// README
//   Magnet Catcher works on any site. There are included the most popular ones
//   but don't worry about adding your own or even include * (all sites).
//   jQuery is used to do the hard work. Script is safe and stable.
// CHANGELOG:
// 0.42
//   + three new trackers added (openbittorrent.com, publicbt.com, istole.it, ccc.de)
// 0.41
//   + minor improvement of the hash regular expression
//   + new torrent sites included
//   + @grant metadata added
// 0.4
//   + magnet downloads are now named after the source webpage's title, which is somewhat more informative than bt info hash.
//   + magnet uri now contains default tracker address of openbittorrent, which improves startup time and average speed.
// 0.31
//   + bug causing crashes in Firefox 5 fixed. Culprit: re() function call rewritten to re.exec() on lines 103, 113.
// 0.3
//   + support for Opera and Google Chrome
//   + changed jquery source to minified version
//   + support for base32 hashes
//   + added best torrent sites into included sites
//   + magnet links are now appended to site links (were put after)
// 0.2
//   + removed bug in regexp - does not match hashes longer than 40 letters anymore
//   + better handling of textual end leaf (non-anchor nodes)
//   + default set of servers has been inspected
//   + other minor improvements
// 0.1
//   + initial version

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// All the magic is here
function main() {
  var re = /(?:^|[^a-z0-9])([a-f0-9]{40}|[a-z2-7]{32})(?:[^a-z0-9]|$)/im;
  
  /**
   * This function will create anchor as icon linking magnet protocol to 
   * provided hash.    
   */     
  function makeMagnet(hash) {
    openbittorrent="udp://tracker.openbittorrent.com:80";
    publicbt="udp://tracker.publicbt.com:80";
    istole="udp://tracker.istole.it:6969";
    ccc="udp://tracker.ccc.de:80";
    name=document.title; //display name
    return "<a href=magnet:?xt=urn:btih:"+hash+"&dn="+encodeURIComponent(name)+"&tr="+encodeURIComponent(openbittorrent)+"&tr="+encodeURIComponent(publicbt)+"&tr="+encodeURIComponent(istole)+"&tr="+encodeURIComponent(ccc)+"><img src='data:image/gif;base64,R0lGODlhDgAOAPcAAAAAAGNjY97e3v8AAP8ICP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////yH5BAEAAAUALAAAAAAOAA4AAAhhAAEIHFigwMCDAhIKAFAQgMKFDhUyNPhQYMWGFQEMGEAAQICCAQAQGClwY8eCDUd21MhxYkqSLE+iFAlz4wCPIGmutHlzoMqOAXja/EkgQEihHFXiDMnS5MqPKI0eNIoyIAA7' alt='Magnet link' border='0' width='14' height='14'/></a>";
  }
  
  /**
   * When parent has no child that matches regex "re" we can consider the parent
   * as end leaf.  
   */             
  function hasNoRelevantChild(parent){
    var children = $(parent).children();
    if (children.size()==0) return true;
    for (i=0;i<children.size();i++){
      if (re.test($(children[i]).text())) return false;
    }
    return true;
  }
  
  if(re.test($("body").html())) {
    // all anchor nodes
    $("a").each(function() {
      var self = this;
      var href = $(self).attr("href");
      if(re.test(href)){
        hash = re.exec(href)[1]; 
        $(self).append(makeMagnet(hash));
      }
    });

    // all other nodes
    $("*").each(function() {
      var self = this;
      var text = $(self).text();
      if(re.test(text) && hasNoRelevantChild(self)){
        hash = re.exec(text)[1];
        $(self).append(makeMagnet(hash));
      }
    });
  }
}

// load jQuery and execute the main function
addJQuery(main);