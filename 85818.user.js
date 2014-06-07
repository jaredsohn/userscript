// ==UserScript==
// @name           Google Translate to Statusbar
// @namespace      null
// @description    translates any text into your favorite language; simply mark the text snippet you would like to translate with your mouse and the result will appear in the statusbar
// @include        *
// ==/UserScript==

var targetLang="en";

var selectListener = function(e){
  var selection = window.getSelection().toString().trim();
  if (selection.length < 1) return;
  GM_xmlhttpRequest({
  method: "GET",
  url: "http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q="+selection+"&langpair=|"+targetLang,
  onload: function(resp) {
    var translation = JSON.parse(resp.responseText);
	window.status = translation.responseData.translatedText;
  }});
}

window.addEventListener("mouseup", selectListener, false);