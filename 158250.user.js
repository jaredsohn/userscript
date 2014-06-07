// ==UserScript==
// @name        Scroogle
// @namespace   org.will
// @description Removes Google URLs for http://, https:// on any Google domain
// @include     https://www.google.com.br*/*
// @include     https://www.google.com*/*
// @include     http://www.google.com.br*/*
// @include     http://www.google.com*/*
// @include     https://encrypted.google.com*/*
// @include     http://search.yahoo.com*/*
// @version     0.1
// ==/UserScript==

function Scroogle() {
  var debug = false
  var log = function(obj) { if (debug === true) console.log(obj); }
  var url = document.location.href;
  
  var cleanGoogle = function() {
    var links = document.getElementsByClassName('r');
    log(links);

    var length = links.length;
    for (i = 0 ; i < length ; i++) 
    {
      var link = links[i];
      var href = link.children[0].href;
      log(href);
      
      // plus three to jump to after the '?q=' part
      var startIndex = href.indexOf("?q=") + 3;
      var startString = href.substr(startIndex);
      var endIndex = startString.indexOf("&");
      var endString = startString.substring(0, endIndex);
      
      log(link.children[0].href);
      log(startIndex);
      log(startString);
      log(endIndex);
      log(endString);
      
      links[i].children[0].href = endString;
    }
  }
  
  var cleanYahoo = function() {
    var links = document.getElementsByClassName('yschttl spt');
    var length = links.length;
    for (i = 0; i < length; i++) 
    {
      var link = links[i];
      var href = link.href;
      var startIndex = href.indexOf('/**');
      var urlDestination = href.substr(startIndex + 3);
      var decodedUrl = decodeURIComponent ( urlDestination );
      link.href = decodedUrl;
    }
  }
  
  this.cleanRedirect = function() {
    if (url.indexOf('google.com') != -1) {
      cleanGoogle();
    } 
    else if (url.indexOf('yahoo.com') != -1) {
      cleanYahoo();
    }
    else log('neither "google.com" nor "yahoo.com" were found in the location');
  }
}

new Scroogle().cleanRedirect()
