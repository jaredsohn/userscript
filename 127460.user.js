// ==UserScript==
// @name          MaisEV Helper
// @include       http://www.maisev.com/forum/
// ==/UserScript==


var qsParm = new Array();
function qs() {
  var query = window.location.search.substring(1);
  var parms = query.split('&');
  for (var i=0; i<parms.length; i++) {
    var pos = parms[i].indexOf('=');
    if (pos > 0) {
      var key = parms[i].substring(0,pos);
      var val = parms[i].substring(pos+1);
      qsParm[key] = val;
    }
  }
}

try {
  var ourDiv = document.getElementById("above_postlist");
  qs();
  var q = qsParm['q']
  ourDiv.innerHTML = "<a href=http://www.maisev.com/forum/usercp.php">Painel de Controle</a><br />" + ourDiv.innerHTML;
} catch (e) {
}