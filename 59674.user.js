// ==UserScript==
// @name           Anonymouse Google Helper
// @namespace      http://userscripts.org
// @description    Keeps you on the raw ip address of googles webserver, so they can't track you w/ cookies.
// @include        http://74.125.67.100/webhp?hl=en
// @include        http://74.125.67.101/webhp?hl=en
// @include        http://74.125.67.102/webhp?hl=en
// ==/UserScript==

(function() {
  var ip_grabber = /[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/;
  var ip = ip_grabber.exec(window.location.href);
  re = new RegExp('(www|images|video|maps|news|mail).google.com', 'i');
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; ++i)
      //alert('nnew - ' + links[i].href);
    links[i].href = (links[i].href).replace(re, ip);
  for (var i = 0; i < document.forms.length; ++i)
    document.forms[i].action = document.forms[i].action.replace(re, ip);
  //alert('done - \n' + document.forms[0].action);
})();
