// ==UserScript==
// @name           Zeneletöltés a startmobil.com ról
// @namespace      startmobil
// @include        http://www.momu.hu/mobil/step1.php?*
// ==/UserScript==
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}
var zeneid = gup('mp3');
location.href='http://www.telko.hu/mp3edit/momu_file/' + zeneid + '.mp3'