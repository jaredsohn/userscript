// ==UserScript==
// @name           Gmail Mute-able Label Links
// @namespace      jonathanasdf
// @description    Add -is:mute to Gmail label links
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// ==/UserScript==

var addScriptToPage = function() {
  var loadCount = 0;
  function testForGmonkey() {
    loadCount++;
    if (loadCount == 20) clearInterval(timerHandle);
    if (typeof(gmonkey) == 'object' && 'load' in gmonkey) {
      clearInterval(timerHandle);
      gmonkey.load(2, function(g) {
        var TK = g.getMastheadElement().ownerDocument.getElementsByClassName("TK");
        for (var i = 0; i < TK.length; i++) {
          var elm = TK[i];
          elm.addEventListener("click", function(event) {
            if (event.target.classList.contains("J-Ke")) {
              event.preventDefault();
              event.stopPropagation();
              window.location.href = event.target.href.replace(/#label\/(.+)$/, function(match, $1){
                return "#search/label:" + $1.replace(/\+/g, "-") + "+-is:mute";
              });	
            }
          }, true);
        }
      });
    }
  }
  var timerHandle = setInterval(testForGmonkey, 500);
};

s = document.createElement('script');
s.type = 'text/javascript';
s.textContent = '(' + addScriptToPage.toString() + ')()';
document.body.appendChild(s);