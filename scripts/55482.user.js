scr_meta=<><![CDATA[
// ==UserScript==
// @name           Przycisk wyzwij w profilach graczy by peterek
// @version        v0.1
// @namespace      http://userscripts.org/users/103378
// @include        http://s*.metaldamage.*/game/player.php*?p=*
// ==/UserScript==
]]></>.toString();

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

function przycisk_wyzwij() {
	if ( content = document.getElementById('content') ) {
		content.innerHTML = content.innerHTML + '<form action="robbery.php" method="POST"><input type="hidden" name=uja value="'+getURLParam('p')+'"><input type="submit" class=input value="wyzwij"></p></form>';
	} else { window.setTimeout(przycisk_wyzwij, 150); }
}
if (getURLParam('p') > 0) {
przycisk_wyzwij();
}