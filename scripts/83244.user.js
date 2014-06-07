// ==UserScript==
// @name           html4cc
// @namespace      http://www.jofree.de/
// @description    Erlaubt HTML Code im CC, wandelt Code im BBCode-Format in HTML um, z.B.: [h1]HTML4CC[/h1] wird zu <h1>HTML4CC</h1>. Umzuwandelnder Code muss zwischen den Markierungstags [html4cc], [h4c] oder [$] stehen.
// @include        http://www.schueler.cc/s,profil,anzeigen.php*
// @copyright      (c) 2010 J.-F. Salzmann
// ==/UserScript==

(function(){

try {

  var content = document.getElementById("ShowLastAlternative").parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML;
  
  var pattern = /\[(html4cc|h4c|\$)\](([a-zA-Z0-9\[\]\/"'=;:,$�!%&\(\)\{\}\?\\*+<> \r\n\t.]|.)*?)\[\/(html4cc|h4c|\$)\]/gim;
  content = content.replace(pattern,"<html4cc>$2</html4cc>");
  
  document.getElementById("ShowLastAlternative").parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML = content;
  
  var area = document.getElementsByTagName("html4cc");
  
  for(var i=0; i <= area.length-1; i++) {
  
   var content = area[i].innerHTML;
   
   var pattern=/<br>/gim;
   content = content.replace(pattern," ");
   
   var pattern=/\[([\/]{0,1})([\w]+)([^\]]*)\]/gim;
   content = content.replace(pattern,"<$1$2$3>");
   
   var pattern=/\[!--(([ \r\n\t]|.)*?)--\]/gim;
   content = content.replace(pattern,"<!--$2-->");
   
   var pattern = /&amp;/;
   content = content.replace(pattern,"&");
   
   area[i].innerHTML = content;
   
  }

} catch(e) {
}

})();