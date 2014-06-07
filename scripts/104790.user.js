// ==UserScript==
// @name           Poyz and Pirlz + Prodcast
// @namespace      http://prodcast.fr/
// @author         Julien Chaumond
// @description    Add Prodcast social store plugins to a page.
// @include        http://store.poyzandpirlz.com/descriptif.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


(function() {
  
  var buttons = document.createElement("div");
  buttons.style.textAlign = "left";
  buttons.innerHTML = '<a href="http://prodca.st" class="prodcast-buttons" data-product="2953801200-social-commerce" data-merchant="Amazon-fr">Prodcast</a>';
  
  var scriptB = document.createElement('script');
  scriptB.type = 'text/javascript';
  scriptB.src = 'http://prodcast.fr/prodcast-buttons.js';
  
  $("form > table:eq(3) > tbody > tr > td > table > tbody > tr > td:eq(1) ").append(buttons);
  document.getElementsByTagName('head')[0].appendChild(scriptB);
  
  var feed = document.createElement("div");
  // Temp:
  feed.id = "prodcast-feed";
  feed.style.textAlign = "left";
  feed.style.marginTop = "30px";
  feed.style.fontSize = "15px";
  feed.style.color = "white";
  // feed.innerHTML = '<a href="http://prodca.st/product/2953801200-social-commerce" class="prodcast-feed" data-product="2953801200-social-commerce" data-merchant="Amazon-fr">Prodcast</a>';
  
  var scriptF = document.createElement('script');
  scriptF.type = 'text/javascript';
  scriptF.src = 'http://prodcast.fr/prodcast-feed.js';
  scriptF.innerHTML = '{"user":"2953801200-social-commerce","server":"prodca.st","background" : "transparent","headerBackground" : "transparent","headerColor" : "grey","evenBackground" : "transparent","oddBackground" : "transparent","width" : "auto","height" : "auto","thumbnailBorder" : "none","thumbnailSize" : 32,"border" : "none"}';
  
  $("form > table:eq(3) > tbody > tr > td > table > tbody > tr > td:eq(1) ").append(feed);
  // Temp:
  document.getElementById('prodcast-feed').appendChild(scriptF);
  
})();
