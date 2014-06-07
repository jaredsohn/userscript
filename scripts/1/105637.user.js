// ==UserScript==
// @name           Home Log IP Remover
// @include        *slavehack*index2.php*page=logs*
// @version                2.0
// ==/UserScript==
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var et = document.getElementById('editlog').value;
var ets = et.split(/\r\n|\r|\n/);
var nl = '';
for(i = 0; i < ets.length; i++){
	if ( ets[i].indexOf('bank') >=0) {
	} else {
	    if ( ets[i].indexOf('-')>=0 && ets[i].indexOf(':')>=0 && ets[i].indexOf('admin')>=0 && ets[i].indexOf('[')>=0 && ets[i].indexOf(']')>=0 && ets[i].indexOf('.')>=0 && !ets[i].endsWith('localhost]')) {
            nl = nl + ets[i] + "<br />";
            }
	}
}
if ( !nl=='') {
try
  {
var newWindow = window.open('data:text/html;charset=utf-8,' + encodeURI(nl), '_blank', 'height=500, width=500');
  }
catch(err)
  {
 alert(err);
  }
}
if (et == "The Guardians")
{
} else {
window.location.href = 'http://www.slavehack.com/index2.php?page=logs&var3=&aktie=&var2=&editlog=The Guardians'
}