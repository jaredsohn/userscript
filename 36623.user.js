// ==UserScript==
// @name           Discogs No Recommendations
// @namespace      http://www.discogs.com/
// @description    Removes recs div on Discogs
// @include        *.discogs.*
// @exclude        
// ==/UserScript==

document.getElementById('recs').innerHTML='';
document.getElementById('recs').style.visibility = 'hidden';
