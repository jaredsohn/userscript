// ==UserScript==
// @id             www.tv.com-e219b52b-14e9-406f-8a1b-f3ee58ccedc5@scriptish
// @name           add TV.com rating and votes by Salih
// @namespace      http://userscripts.org/scripts/show/96884
// @author         Salih AYDIN
// @description    Adds movie ratings and number of voters to any tv.com link
// @grant          GM_xmlhttpRequest
// @include        *
// ==/UserScript==
var ari=0;
function addRatings(){
var links = document.links;
var r=0;
for (i = 0; i < links.length; i++) { 
  if (links[i].href.indexOf("/shows/") != -1 && links[i].href.indexOf("tv.") != -1){
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
      votes = result.responseText.match(/itemprop\=\"ratingCount\"\>(.*)\<\/div\>/); // Salih AYDIN 
      rating = result.responseText.match(/itemprop\=\"ratingValue\"\>(.*)\<\/div\>/); //Salih AYDIN 
;
        links[i].parentNode.insertBefore(document.createElement("a"), links[i]).innerHTML = (rating ? "<b> [tv -" + rating[1] + " - "+votes[1]+"] </b>" : "<b style='color: red;'>[NA] </b>&nbsp;");
      }}(i)
    });
  }
}
}
addRatings();