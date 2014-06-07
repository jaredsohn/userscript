// ==UserScript==
// @name          hide_akb_link
// @namespace     http://userscripts.org/users/kawaz
// @description   特定キーワードをテキストに含むリンクを隠す
// @version       1.0
// @match         http://*/
// @match         https://*/
// ==/UserScript==
(function(){
  var pattern = new RegExp("AKB");
  Array.prototype.slice.call(document.getElementsByTagName("a")).forEach(
    function(a) {
      if(a.innerText.match(pattern)) {
        a.style.display = "none";
      }
    }
  );
})();