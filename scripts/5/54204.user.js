// ==UserScript==
// @name           Omniture
// @namespace      test
// @include        http://yellowpages.aol.com/
// ==/UserScript==
GM_xmlhttpRequest({
  method: 'GET',
      url: url,
      headers: {
      'User-agent':window.navigator.userAgent,
      'Accept': 'application/atom+xml,application/xml,text/xml',
      },
      onload: function(responseDetails) {
      var doc = document.implementation.createDocument('','',null);
      var html = document.createElement('html');
      html.innerHTML = responseDetails.responseText;
      doc.appendChild(html);
    }
  });