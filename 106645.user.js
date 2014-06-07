// ==UserScript==
// @name           add IMDb rating Salih
// @author         Ali
// @description    Adds movie ratings and number of voters to any imdb link. Modified version of http://userscripts.org/scripts/show/9174
// @include        *
// @exclude        http://*imdb*
// @version        20110904
// @namespace      http://userscripts.org/scripts/show/96884
// ==/UserScript==

var ari=0;
function addRatings(){
var links = document.links;
var r=0;
for (i = 0; i < links.length; i++) { 
  if (links[i].href.indexOf("/title/") != -1 && links[i].href.indexOf("imdb.") != -1){
r++; 
if(r<=ari) continue;
if(r>(40)){ /*links[i].parentNode.insertBefore(document.createElement("a"), links[i]).innerHTML='<a href="javascript:addRatings();">[continue] </a>'; */ break; } 
ari++; 
    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: links[i].href,
      onload: function (i) {return function(result) {
      rating = result.responseText.match(/Users rated this (.*)\/10 /); // Salih AYDIN 
      votes = result.responseText.match(/\((.*) votes\) - click stars to rate/); //Salih AYDIN modified as IMDB changed their site
;
        links[i].parentNode.insertBefore(document.createElement("a"), links[i]).innerHTML = (rating ? "<b> [" + rating[1] + " - "+votes[1]+"] </b>" : "<b style='color: red;'>[NA] </b>&nbsp;");
      }}(i)
    });
  }
}
}
addRatings();