// ==UserScript==
// @name           Groove
// @namespace      unlock.grooveshark.german.shyper
// @description    Groove
// @include        http://grooveshark.com/
// @include        http://w69b-groove.appspot.com/
// ==/UserScript==
 
function groove_de_set_body(body){
  document.close();
  document.open();
  document.write(body);
  document.close();
}
if(!groove_de_run){
  var groove_de_run = true;
  var xhr = GM_xmlhttpRequest({
    method: "GET",
    url: "http://w69b-groove.appspot.com/",
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7",
      "Host": "w69b-groove.appspot.com",
      "Origin": "chrome-extension://docdgimmdejoiemdafcgeodchlbllgac",
      "Accept": "*/*",
      "Referer": "http://grooveshark.com/",
      "Accept-Encoding": "gzip,deflate,sdch",
      "Accept-Language": "en-US,en;q=0.8",
      "Accept-Charset": "ISO-8859-1,utf-8;q=0.7,*;q=0.3"
    },
    onload: function(response) {
      groove_de_set_body(response.responseText);
    }
  });
}
 