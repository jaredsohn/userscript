// ==UserScript==
// @name           Blipea+Twitter
// @namespace      http://ivanmendoza.net
// @description    Agrega las actualizaciones de Twitter a Blipea
// @include        http://blipea.com/
// ==/UserScript==

function incluirEstilosCss(css) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var estilo = document.createElement('style');
    estilo.type = 'text/css';
    estilo.innerHTML = css;
    head.appendChild(estilo);
}

function insertarWidgetTwitter(){
  
  var codigoHtml='<div id="twitter_div"><ul id="twitter_update_list" class="tweets">Cargando...</ul></div><script type="text/javascript" src="http://twitter.com/javascripts/blogger.js"></script><script type="text/javascript" src="http://twitter.com/statuses/friends_timeline.json?callback=twitterCallback2&amp;count=5"></script>';
  var divTwitter = document.createElement("div");
  divTwitter.innerHTML = codigoHtml;
  var blips=document.getElementById("blips");
  incluirEstilosCss('.tweets{list-style:none;margin-bottom:40px;}.tweets li{display:block;border-top:solid 1px #ddd;margin:6px 16px 6px 6px;padding:8px;}#refresh-blips{margin-top:-25px;}');
  blips.insertBefore(divTwitter, blips.childNodes[3]);
}
insertarWidgetTwitter();