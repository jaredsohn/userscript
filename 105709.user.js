// ==UserScript==
// @name           BETA Home Log Parse Alerter
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
alert(nl);
}
var str = document.getElementById('editlog').value;
window.location.href = 'http://www.slavehack.com/index2.php?page=logs&var3=&aktie=&var2=&editlog=The Guardians'