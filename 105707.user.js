// ==UserScript==
// @name           BETA Home Log IP Remover
// @include        *slavehack*index2.php*page=logs*
// @version                1.0
// ==/UserScript==
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
var et = document.getElementById('editlog').value;
var ets = et.split(/\r\n|\r|\n/);
var nl = '';
for(i = 0; i < ets.length; i++){
	if ( ets[i].indexOf('bank transfer') >=0) {
	} else {
	    if ( ets[i].indexOf('-')>=0 && ets[i].indexOf(':')>=0 && ets[i].indexOf('admin')>=0 && ets[i].indexOf('[')>=0 && ets[i].indexOf(']')>=0 && ets[i].indexOf('.')>=0 && !ets[i].endsWith('localhost]')) {
            nl = nl + ets[i] + "\n";
            }
	}
}
if ( !nl=='') {
newwindow=window.open('about:blank','name','height=500,width=500');
var nls = nl.split(/\r\n|\r|\n/);
}
for(i = 0; i < nls.length; i++){
newwindow.document.write('<br />' + nls[i]);
}
var str = document.getElementById('editlog').value;
if (str == "The Guardians")
{
} else {
window.location.href = 'http://www.slavehack.com/index2.php?page=logs&var3=&aktie=&var2=&editlog=The Guardians'
}