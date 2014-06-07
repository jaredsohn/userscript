// ==UserScript==
// @name           Qhuit + Prodcast
// @namespace      http://prodcast.fr/
// @author         Julien Chaumond
// @description    Add Prodcast social store plugins to a page.
// @include        http://store.qhuit.com/descriptif.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==


(function() {
  
  $("#contenu > table > tbody > tr:eq(1)").prepend("<td></td><td></td>");
  
  var buttons = document.createElement("div");
  buttons.style.marginTop = "30px";
  buttons.innerHTML = '<a href="http://prodca.st" class="prodcast-buttons" data-product="2953801200-social-commerce" data-merchant="Amazon-fr" style="color:white;">Prodcast</a>';
  
  var scriptB = document.createElement('script');
  scriptB.type = 'text/javascript';
  scriptB.src = 'http://prodcast.fr/prodcast-buttons.js';
  
  $("#contenu > table > tbody > tr:eq(1) > td:eq(2)").append(buttons);
  document.getElementsByTagName('head')[0].appendChild(scriptB);
  
  var feed = document.createElement("div");
  // Temp:
  feed.id = "prodcast-feed";
  feed.style.textAlign = "left";
  feed.style.marginTop = "30px";
  feed.style.fontSize = "15px";
  // feed.innerHTML = '<a href="http://prodca.st/product/2953801200-social-commerce" class="prodcast-feed" data-product="2953801200-social-commerce" data-merchant="Amazon-fr">Prodcast</a>';
  
  var scriptF = document.createElement('script');
  scriptF.type = 'text/javascript';
  scriptF.src = 'http://prodcast.fr/prodcast-feed.js';
  scriptF.innerHTML = '{"user":"2953801200-social-commerce","server":"prodca.st","background" : "transparent","headerBackground" : "transparent","headerColor" : "grey","evenBackground" : "transparent","oddBackground" : "transparent","width" : "372px","height" : "auto","thumbnailBorder" : "none","thumbnailSize" : 32,"border" : "none"}';
  
  $("#contenu > table > tbody > tr:eq(1) > td:eq(2)").append(feed);
  // Temp: 
  document.getElementById('prodcast-feed').appendChild(scriptF);
  
})();
