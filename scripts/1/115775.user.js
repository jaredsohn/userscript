// ==UserScript==
// @name Anti BBA
// @description a message of hello world
// @include *
// ==/UserScript==


var otitle;
otitle = document.title
document.title = GM_getValue(document.URL);
if (document.title == "undefined"){
	document.title = otitle;
	if (document.title == "Access Denied"){
		var debug = 0;
  if ( debug > 0 ) {
    alert(  "Hash:     "+location.hash+
          "\nHost:     "+location.host+
          "\nHostname: "+location.hostname+
          "\nHREF:     "+location.href+
          "\nPathname: "+location.pathname+
          "\nPort:     "+location.port+
          "\nProtocol: "+location.protocol+
	  "\n"+
	  "\nNew Location: "+location.href.replace(/http\:/, 'https:'));
  };
  location.href = location.href.replace(/http\:/, 'https:');
	}
}
