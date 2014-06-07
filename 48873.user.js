// ==UserScript==
// @name          	CommuniGate Redirect Remover
// @description   	Removes the redirect in CGPs WebMails (and wherever the same syntax is used: http://server/Redirect/otherserver/path)
// @version		1.3
// @namespace      	http://projects.izzysoft.de/
// @include
// ==/UserScript==

// Some declarations
var allHrefs, thisHref, ar;
var numHtmls = 0;
var allHrefs = document.getElementsByTagName('a');
var searchterm  = /https?:\/\/.*?\/Redirect\/(.*)/,
    ssearchterm = /https?:\/\/.*?\/SRedirect\/(.*)/;

// Loop through the list of HREFs
for (var i = 0; i < allHrefs.length; i++) {
  thisHref = allHrefs[i];
  var url = thisHref.href;
  if ((ar = CGMatch(url))) {thisHref.href = ar;}
}

// Check (and replace) redirects
function CGMatch(url) {
  if (searchterm.test(url)) url = url.replace(searchterm,'http://$1');
  else if (ssearchterm.test(url)) url = url.replace(ssearchterm,'https://$1');
  else return false;
  var anch = /^(https*:\/\/)anchor\/(.+?)\/(.*)$/i;
  if (anch.test(url)) return url.replace(anch,'$1$3#$2');
  else return url;
}
