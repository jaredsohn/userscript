// ==UserScript==
// @name           Redirect Remover
// @namespace      main
// @description    Removes redirections from anchors.
// @grant          none
// @include        http://*
// @exclude        http://*.google.hu/*
// @exclude        http://*.google.com/*
// @exclude        http://*.yahoo.com/*
// ==/UserScript==



var anchors = document.getElementsByTagName ("a");

for (var i=0; i < anchors.length; i++) {
  if (anchors[i].href !== undefined)
    anchors[i].href = remove_redirect (anchors[i].href);
}



function remove_redirect (uri)
{
  var new_uri = "";

  if (/^.+(http:\/\/[^&]*)/.test (uri))
    new_uri = RegExp.lastParen;
  else if (/^.+(http%3A%2F%2F[^&]*)/.test (uri))
    new_uri = unescape(RegExp.lastParen);
  else if (/^.+(aHR0cDov[A-Za-z0-9+/=]*)/.test (uri))
    new_uri = atob(RegExp.lastParen);
  else if (/^.+(aHR0cCUzQSUyRiUy[A-Za-z0-9+/=]*)/.test (uri))
    new_uri = unescape(atob(RegExp.lastParen));

  if (new_uri != "") {
    if (/^(.*?)\?/.test (new_uri))                     new_uri = RegExp.lastParen;  // remove ?... from the end
    if (/^(.*\/)index\.(?:html|php)$/.test (new_uri))  new_uri = RegExp.lastParen;  // remove index.(html|php)

    return new_uri;
  } else {
    return uri;
  }
}
