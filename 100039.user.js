// ==UserScript==
// @name           Adds disqus comments to any site
// @description    Adds disqus comments to any site
// @include        *
// ==/UserScript==

if(!document.getElementById('disqus_thread'))
{
  var disqusContainer = document.createElement("div");
  disqusContainer.id = "disqus_thread";
  disqusContainer.setAttribute("style", "padding : 40px 0;");

  var script = document.createElement("script");
  script.src = "http://disqus.com/forums/chickerino/embed.js";
  document.body.appendChild(script);
}