// ==UserScript==
// @name           przelaczanie stron rankingu
// @version        v0.1
// @namespace      http://userscripts.org/users/103378
// @include        http://s*.metaldamage.onet.pl/game/highscore.php*
// ==/UserScript==

function getURLParam(strParamName){
  var strReturn = "";
  var strHref = window.location.href;
  if ( strHref.indexOf("?") > -1 ){
    var strQueryString = strHref.substr(strHref.indexOf("?")).toLowerCase();
    var aQueryString = strQueryString.split("&");
    for ( var iParam = 0; iParam < aQueryString.length; iParam++ ){
      if (
aQueryString[iParam].indexOf(strParamName + "=") > -1 ){
        var aParam = aQueryString[iParam].split("=");
        strReturn = aParam[1];
        break;
      }
    }
  }
  return strReturn;
}

var nastepna = getURLParam('a')-(-1);
var poprzednia = getURLParam('a')-1;

function przyciski() {
	if ( content = document.getElementById('content') ) {
		content.innerHTML = content.innerHTML + '<a href="highscore.php?a='+poprzednia+'&s='+getURLParam('s')+'&o='+getURLParam('o')+'">Poprzednia</a> | <a href="highscore.php?a='+nastepna+'&s='+getURLParam('s')+'&o='+getURLParam('o')+'">Następna</a>';
	} else { window.setTimeout(przyciski, 150); }
}
if (getURLParam('a') > 0) {
przyciski();
}