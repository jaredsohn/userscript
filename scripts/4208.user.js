// ==UserScript==
// @name           Hug Rinacat without leaving her page
// @namespace      http://pile0nades.deviantart.com/
// @description    Allows giving Rinacat hugs without leaving her page
// @include        http://rinacat.deviantart.com/*
// ==/UserScript==

(function() {

  // get hugs link
  var hug = get("//a[@href='http://www.toxin.org/cgi-bin/hugs.cgi?&HUGS=yes&hug=rinacat']").snapshotItem(0);
  if(!hug) return;
  hug.addEventListener('click', hugRina, true);

  // get hug counter
  var hugcount = get("//img[@src='http://www.toxin.org/cgi-bin/count_hugs.cgi?hug=rinacat']").snapshotItem(0);

  // hug Rina
  function hugRina(event) {
    GM_xmlhttpRequest({
      method: 'GET',
      url: hug.href,
      onload: function() {
        // update the hug counter image
        hugcount.src = "http://www.toxin.org/cgi-bin/count_hugs.cgi?hug=rinacat&r=" + Math.floor(Math.random()*1000000);
      },
      onerror: function() {
        alert("It didn't work!");
      }
    });
    event.stopPropagation();
    event.preventDefault();
  }

  // xpath function
  function get(query) {
    return document.evaluate(
      query,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
  }
  
})();