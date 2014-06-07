// ==UserScript==
// @name            Add Torrents To uTorrent
// @namespace       http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description     Let's you download torrents using the uTorrent remotely, from your browser.
// @include         http://isohunt.com/torrent_details/*
// @include         http://thepiratebay.org/details.php?*
// @include         http://torrentreactor.net/view.php?*
// @include         http://www.mininova.org/*
// @include         http://www.torrentspy.com/*
// @include         http://ts.searching.com/*
// @include         *
// ==/UserScript==
 
// these four parameters need to be edited before using the script

// Server address
var host = "your.server.com"; 

// Server port
var port = "48658";

// Admin username
var username = "username"; 

// Admin password
var password = "password"; 

if (host == "") { alert('You need to configure the "Add Torrents To uTorrent" user script with your uTorrent WebUI parameters before using it.'); }



function scanLinks() {
  var links = getLinks();

  for (var i=0; i < links.length; i++){
      var link = links[i];
      if (match(link.href)) {
          var uTorrentLink = makeUTorrentLink(link);

          link.parentNode.insertBefore(uTorrentLink, link.nextSibling);
      }
  }
}

function makeUTorrentLink(link) {
    var uTorrentLink = document.createElement('a');
    uTorrentLink.setAttribute("href", makeUTorrentUrl(link.href));
    uTorrentLink.setAttribute("target", "_blank");
    uTorrentLink.style.paddingLeft = "5px";
    uTorrentLink.innerHTML = "<img src=\"" + image + "\" style='border: 0px' />";

    return uTorrentLink; 
}

function match(url) {

   // isohunt format
   if (url.match(/http:\/\/.*isohunt\.com\/download\//i)) {
       return true;
   }

   if (url.match(/\.torrent$/)) {
       return true;
   }

   if (url.match(/http:\/\/.*bt-chat\.com\/download\.php/)) {
       return true;
   }

   // TorrentReactor
   if (url.match(/http:\/\/dl\.torrentreactor\.net\/download.php\?/i)) {
       return true;
   }

   // Mininova
   if (url.match(/http:\/\/www\.mininova\.org\/get\//i)) {
       return true;
   }

   // Mininova
   if (url.match(/http:\/\/www\.mininova\.org\/get\//i)) {
       return true;
   }

   // TorrentSpy
   if (url.match(/http:\/\/ts\.searching\.com\/download\.asp\?/i)) {
       return true;
   }
   if (url.match(/http:\/\/www\.torrentspy\.com\/download.asp\?/i)) {
       return true;
   }

   // Seedler
   if (url.match(/http:\/\/.*seedler\.org\/download\.x\?/i)) {
       return true;
   }
   return false;
}

function makeUTorrentUrl(url) {
   var uTorrentUrl = "http://"+username+":"+password+"@"+host+":"+port+"/gui/"; 
   return uTorrentUrl + "?action=add-url&s=" + escape(url);
}

function getLinks() {
   var doc_links = document.links;
   var links = new Array();
   for (var i=0; i < doc_links.length; i++){
       links.push(doc_links[i]);
   }
   return links;
}

var image = "data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC2ASYCKLM78yqEz%2FRMFl%2F0TCZv80qU3%2FIow0vwtgEmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADUQUgF38kzzLAT%2F9A22T%2FQ95p%2F0fibv9I42%2F%2FReBr%2F0PdaP80wVL%2FGH8lzwNRBSAAAAAAAAAAAAAAAAADUQUgFYAi7yPCPf953Ij%2F%2F%2F%2F%2F%2FyzPSv8x01H%2FMdNR%2Fy7QTP8mykL%2FIsY8%2FyXDQP8VgSPvA1EFIAAAAAAAAAAAE3YfzxytMf8LrRr%2Fb9R6%2F%2F%2F%2F%2F%2F8ewzb%2FIsc8%2FyLHPP8fxDj%2FGcAw%2FxG5JP8LsBz%2FHLAy%2FxN3H88AAAAAB1gLYBqRKv8IkRT%2FCJ0V%2F2vLdP%2F%2F%2F%2F%2F%2FiNuR%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FiNyS%2F4bajv%2F%2F%2F%2F%2F%2FCKAV%2FwmUFf8blS3%2FB1gLYBBrGb8Ofxr%2FBoAP%2FweNEf9qwXL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2BE1Yz%2FhNWM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2Fa8Jy%2FweQEv8Ggw%2F%2FD4Ma%2FxBsGb8Qahn%2FBmQK%2Fw92Ff8VhB3%2Fdbx7%2F%2F%2F%2F%2F%2F%2BPzpT%2FHqAp%2Fx6gKf%2BPz5T%2F%2F%2F%2F%2F%2F3W9e%2F8Vhx7%2FD3kW%2FwZoC%2F8Rbhz%2FHGki%2FyVrJv8ldSn%2FJX4r%2F322gP%2F%2F%2F%2F%2F%2Fk8iX%2FyeTL%2F8nky%2F%2Fk8iX%2F%2F%2F%2F%2F%2F99t4D%2FJYAr%2FyV3Kf8lbSf%2FHm0l%2FyRiJv8vbzD%2FL3Aw%2Fy91Mv%2BCsIX%2F%2F%2F%2F%2F%2F5jCmv8whzX%2FMIc1%2F5jCmv%2F%2F%2F%2F%2F%2FgrGF%2Fy93Mv8vcTH%2FL28w%2FyVkKP8kXyb%2FOXY7%2Fzl2O%2F85djv%2FiK2J%2F%2F%2F%2F%2F%2F%2BcvZ7%2FOX08%2Fzl9PP%2Bcvp7%2F%2F%2F%2F%2F%2F4itif85djv%2FOXY7%2Fzl2O%2F8kXyb%2FI2Alv0R5Rv9Ffkf%2FRX5H%2F4%2Bykf%2F%2F%2F%2F%2F%2For%2Bj%2F0V%2BR%2F9Ffkf%2For%2Bj%2F%2F%2F%2F%2F%2F%2BPspH%2FRX5H%2F0V%2BR%2F9EeUb%2FI2Alvw9XEWBLd03%2FUYZT%2F1GHU%2F%2BXt5j%2F%2F%2F%2F%2F%2F6jDqf9Rh1P%2FUYdT%2F6jDqf%2F%2F%2F%2F%2F%2Fl7eY%2F1GHU%2F9RhlP%2FS3dN%2Fw9XEWAAAAAAMms0z12FX%2F9ej1%2F%2FXpBf%2F16QX%2F9ekF%2F%2FXpBf%2F16QX%2F9ekF%2F%2FXpBf%2F16QX%2F9ej1%2F%2FXYVf%2FzJrNM8AAAAAAAAAAANRBSBHeEjvao9r%2F2uVbP9rmWz%2Fa5ls%2F2uZbP9rmWz%2Fa5ls%2F2uZbP9rlmz%2Fao9r%2F0d4SO8DUQUgAAAAAAAAAAAAAAAAA1EFIEl7S895mHr%2FeZp6%2F3mdev95nnr%2FeZ56%2F3mdev95mnr%2FeZh6%2F0l7S88DUQUgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALWsvYE5%2FUL9ljmb%2FZY5m%2F2WOZv9ljmb%2FTn9Qvy1rL2AAAAAAAAAAAAAAAAAAAAAA8A8AAMADAACAAQAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAAIABAADAAwAA8A8AAA%3D%3D";


scanLinks();
