// ==UserScript==
// @name            anonisim
// @description     Свободные комментарии на сайтах reporter-ua.com, timeszp.com и panoptikon.org
// @version         0.94
// @downloadURL     https://www.googledrive.com/host/0B-hrEotE8GXLaDdJLUlrN2dNZ0U/anonisim.user.js
// @updateURL       https://www.googledrive.com/host/0B-hrEotE8GXLaDdJLUlrN2dNZ0U/anonisim.meta.js
// @run-at          document-end
// @match           http://reporter-ua.com/*
// @match           http://timeszp.com/news/*
// @match           http://timesua.com/news/*
// @match           http://timeszp.com/current/*
// @match           http://timesua.com/current/*
// @match           http://timeszp.com/articles/*
// @match           http://timesua.com/articles/*
// @match           http://panoptikon.org/articles/*
// ==/UserScript==

anonisimS = false;
if(document.getElementsByClassName("block block-simpleads")[0]){
 var ads = document.getElementsByClassName("block block-simpleads");
 for(var i = 0; i < ads.length; i++) {
 	ads[i].innerHTML = '';
 } 
}

if(document.getElementsByClassName("share-post")[0]){document.getElementsByClassName("share-post")[0].outerHTML = '<div id="disqus_thread"></div>'; anonisimS=true;}

if(document.getElementById("rt-n-23027")){document.getElementById("rt-n-23027").outerHTML = '<div class="full_news_comment"><div id="disqus_thread"></div></div>'; anonisimS=true;}

if(document.getElementById("show-comment")){
    var comm = document.getElementById("show-comment");
    var pan = document.createElement('div');
    pan.innerHTML = '<div id="disqus_thread"></div>';
    document.getElementById("topstory-txt").insertBefore(pan, document.getElementById("show-comment")); 
    anonisimS=true;
}

if(anonisimS){
  var anonisim = document.createElement('script');
  anonisim.type = 'text/javascript';
  anonisim.text = "var disqus_shortname = 'repa'; (function() {var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true; dsq.src = 'http://' + disqus_shortname + '.disqus.com/embed.js';(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);})();";
  document.getElementsByTagName("body")[0].appendChild(anonisim);
}
