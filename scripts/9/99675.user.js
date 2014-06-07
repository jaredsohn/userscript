// ==UserScript==
// @name          nodejsinfo-skip
// @namespace     http://userscripts.org/users/kawaz
// @description   node-js.infoをスキップして元記事に飛ぶ
// @include       http://node-js.info*
// ==/UserScript==
(function(){
  location.replace(document.querySelector("#content font a").href);
})();