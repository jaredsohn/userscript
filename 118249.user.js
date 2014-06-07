// ==UserScript==
// @name           Ulatwienie korzystania z mPoster
// @description    Samo uzupelnia pole tekstu
// @namespace      http://darkwarez.pl
// @include        *http://darkwarez.pl/forum/posting.php?mode=reply*
// ==/UserScript==

function gup( name ){
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
var temat = document.getElementsByName("message")[0];
var nowa = gup('tresc');
var nowa2 = unescape(nowa.replace(/,/g, "%u00"));
temat.value = nowa2;
