// ==UserScript==
// @name           FuckWall
// @namespace      mailto:guands@live.com?subject=fuckwall
// @description    Use HTTPS instead of HTTP while possible
// @version        0.30
// @author         Victor (DS G)
// @include        https://encrypted.google.com/*
// @include        https://www.google.com/*
// @include        http://www.google.com/*
// @include        http://webcache.googleusercontent.com/*
// @include        http://code.google.com/*
// @include        http://docs.google.com/*
// @include        http://groups.google.com/*
// @include        http://maps-api-ssl.google.com/*
// @include        http://sites.google.com/*
// ==/UserScript==

//--------------------Settings--------------------
var gSearchHomeSecure = true;  //Google Web Search homepage
var gSearchQuerySecure = true;  //Google Web Search result page
var gSearchSecureHost = 'encrypted.google.com';
var gCacheSecure = true;  //Google Web Cache
var gCacheHost = 'webcache.googleusercontent.com';
var gWwwSvcSecure = true;  //Google services under www.google.com but search
var gSubSvcSecure = true;  //Google services under subdomains of google.com but search

//common variables
var l = location.href;
var h = location.host;
var p = location.pathname;

//----------HTTPS for Google Web Search-----------
function inArray(item, array) {
  for (var i = 0; i < array.length; i++) {
    if (item === array[i]) return true;
  }
  return false;
}

//force https for search homepage (planned)

//force https for search result page
if (gSearchQuerySecure && RegExp('^http://www.google.com/[^#]+[?&]q=').test(l)) {
  if (inArray(p, ['/search', '/cse', '/m', '/m/', '/pda', '/pda/', '/xhtml', '/xhtml/']))
    location.replace(l.replace(/http:/, 'https:'));
  else if (inArray(p, ['/custom']))
    location.replace(l.replace('http://' + h + p, 'https://' + h + '/cse'));
  else if (inArray(p, ['/default', '/wapsearch']))
    location.replace(l.replace('http://' + h + p, 'https://' + h + '/search'));
}

//adapt 'cse' search page for it to work esp. for https search
if (h == 'www.google.com' && p == '/cse') {
  try {var links = document.getElementById('navbar').getElementsByTagName('a');
  } catch (e) {var links = document.getElementsByTagName('a');}
  for (var i = 0; i < links.length; i++) {
    if (links[i].href) links[i].href = links[i].href.replace(h + '/custom', h + p);
  }
  var forms = document.getElementsByTagName('form');
  for (var i = 0; i < forms.length; i++) {
    forms[i].action = forms[i].action.replace(h + '/custom', h + p);
  }
}

//-----------HTTPS for Google Web Cache-----------
if (gCacheSecure) {
  //secure cache links in search results
  if (h == gSearchSecureHost || h == 'www.google.com') {
    //find cache links by class name of parent nodes
    var done;
    if (p == '/search') {
      var refNodes = document.getElementsByClassName('gl');
      for (var i = 0; i < refNodes.length; i++) {
        try {
          var cacheNode = refNodes[i].firstElementChild;
          if (cacheNode.href.indexOf('cache') > 0) {
            cacheNode.href = cacheNode.href.replace(/http:/, 'https:');
            cacheNode.removeAttribute('onmousedown');
            done = true;
          }
        } catch (e) {}
      }
    }
    else if (p == '/cse' || p == '/custom') {
      var cacheNodes = document.getElementsByClassName('fl');
      for (var i = 0; i < cacheNodes.length; i++) {
        if (cacheNodes[i].href && cacheNodes[i].href.indexOf('cache') > 0) {
          cacheNodes[i].href = cacheNodes[i].href.replace(/http:/, 'https:');
          done = true;
        }
      }
    }
    //find cache links by cache host name
    if (!done) {
      var allLinks = document.links;
      for (var i = 0; i < allLinks.length; i++) {
        if (allLinks[i].href.indexOf('http://' + gCacheHost) != -1) {
          allLinks[i].href = allLinks[i].href.replace('http://' + gCacheHost, 'https://' + gCacheHost);
          allLinks[i].removeAttribute('onmousedown');
        }
      }
    }
  }
  //force https for cache in address bar
  else if (l.indexOf('http://' + gCacheHost) == 0) location.replace(l.replace(/http:/, 'https:'));
}

//-------HTTPS for Google's other services (temp code)--------
if (location.protocol == 'http:') {
  switch (h) {
    case 'code.google.com':
    case 'docs.google.com':
    case 'groups.google.com':
    case 'sites.google.com':
      location.replace(l.replace(/http:/, 'https:'));
  }
}
