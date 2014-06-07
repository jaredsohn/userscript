// ==UserScript==
// @name           OGame RE
// @namespace      OGame RE
// @include        http://*.ogame.de/game/index.php?page=resources&session=*
// @include        http://*.ogame.de/game/index.php?page=station&session=*
// ==/UserScript==

alert('test');

document.body.innerHTML = document.body.innerHTML.replace(
/session=.*/ig,function(s){ session = s.replace('session=','').replace('" class="tipsStandard" title="|Patchnotes">',''); return s; });

document.body.innerHTML = document.body.innerHTML.replace(
/type=.*token=.*/ig,
function(s){ token = s.replace('type=','').replace('&amp;menge=1&amp;token=','').replace('">',''); return s; });

alert("http://uni105.ogame.de/game/index.php?page=shipyard&session=" +session+ "&modus=1&type=202&menge=1&token=" + token);

location.href = "http://uni105.ogame.de/game/index.php?page=shipyard&session=" +session+ "&modus=2&type=202&menge=1&token=" + token;