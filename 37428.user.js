// ==UserScript==
// @name           Media Links
// @namespace      http://po-ru.com/
// @description    Replaces movie embed objects with links to download them.
// @include        *
// ==/UserScript==

(function(){
  var embeds = document.getElementsByTagName('embed');
  for (var i = 0; i < embeds.length; i++){
    var embed = embeds[i];
    if (embed.type == "application/x-mplayer2"){
      var p = document.createElement('p');
      p.className = "gm-media-links";
      var a = document.createElement('a');
      a.href = embed.src;
      a.title = embed.src;
      a.appendChild(document.createTextNode('Download video'));
      p.appendChild(a);
      embed.parentNode.replaceChild(p, embed);
    }
  };
})();
