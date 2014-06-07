// ==UserScript==
// @name           Tutoren-Zusatzskript
// @description    Zusatzskript für Tutoren zur Anzeige freizuschaltender Themen
// @include        http://www.feuerwache.net/*
// @include        http://www.polizeiwache.net/*
// @author         Haruspex
// @version        2012-05-27 12:12
// ==/UserScript==

if (document.location.href.match("polizeiwache")) var link="http://www.polizeiwache.net/forum";
else var link="http://www.feuerwache.net/forum";


GM_xmlhttpRequest({
  method: "GET",
  url: link,
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/html"            // If not specified, browser defaults will be used.
  },
  onload: function(response) {
    // Inject responseXML into existing Object (only appropriate for XML content).
    if (!response.responseXML) {
      response.responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/html");
    }

	var source=response.responseText;
	console.log(source);
	//alert(source);
    GM_log([
      response.status,
      response.statusText,
      response.readyState,
      response.responseHeaders,
      response.responseText,
      response.finalUrl,
      response.responseXML
    ].join("\n"));

	//alert(response.responseXML.getElementsByClassName("forumContent")[0].innerHTML);
	//alert(response.responseXML.getElementsByClassName("form_info")[0]);
	
	if ( response.responseXML.getElementsByClassName("form_info")[0]) {
		document.getElementById("footer").innerHTML+='<div id="tutoren" style="position:fixed;bottom:50px;left:20px;max-width:170px;padding:10px;background-color:#FFFFFF;border:3px dotted #0D2A44;color:#0D2A44;">'+response.responseXML.getElementsByTagName("h1")[0].innerHTML+'</div>';
	};
  }
});