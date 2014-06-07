// ==UserScript==
// @name          XHR without barriers -- test
// @description   Scripting is fun
// @include       *
// @grant         GM_xmlhttpRequest
// ==/UserScript==


GM_xmlhttpRequest({
  method: "GET",
  url: "http://www.example.net/",
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onload: function(response) {
    var responseXML = null;
    // Inject responseXML into existing Object (only appropriate for XML content).
    if (!response.responseXML) {
      responseXML = new DOMParser()
        .parseFromString(response.responseText, "text/xml");
    }

    console.log([
      response.status,
      response.statusText,
      response.readyState,
      response.responseHeaders,
      response.responseText,
      response.finalUrl,
      responseXML
    ].join("\n"));
  }
});