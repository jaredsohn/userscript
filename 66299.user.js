// ==UserScript==
// @name           TehConnection - AutoPoster
// @namespace      GLaDOSDan
// @description    Auto-grabs the poster for a movie at tehconnection
// @include        http*://*tehconnection.eu/upload.php*
// ==/UserScript==


window.poster_api = function(){
var imdbnumb = document.getElementById('imdb_number').value;
GM_xmlhttpRequest({
method: 'GET',
url: 'http://gladosdan.com/tc/poster.php?imdb=' + imdbnumb + '&urlonly=true',
onload: function(response) {
document.getElementById('image').value = response.responseText;
}
});
}


var autofill = document.getElementById('autofill');
autofill.addEventListener("click", poster_api, true);

