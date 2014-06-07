// ==UserScript==
// @name           SF Header Links
// @namespace      clmhdrlinks
// @include        https://*.salesforce.com/*
// ==/UserScript==

var host = location.host;
if (document.getElementById('userNav') != null) {
    var links = document.getElementById('userNav').parentNode;

    var setupLink = document.createElement('a');
      setupLink.href = 'https://'+host+'/ui/setup/Setup';
      setupLink.appendChild(document.createTextNode('Setup'));
    links.appendChild(setupLink);

    var logoutLink = document.createElement('a');
      logoutLink.href = 'https://'+host+'/secur/logout.jsp';
      logoutLink.appendChild(document.createTextNode('Logout'));
    links.appendChild(logoutLink);
}