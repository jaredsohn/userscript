// ==UserScript==
// @name           life.com.ua: get SMS from URL
// @namespace      j2ck
// @include        https://www.life.com.ua/sms/smsFree.html*
// ==/UserScript==
function getQueryParams(sourceString) {
var result = [];
sourceString.split(/&(amp;)?/)
.filter(function(el) {return el;})
.forEach(function(el) {
var temp = el.split(/=/);
result[temp[0]] = temp[1];
if (temp.length> 2) {
 for(var i= 2; i< temp.length; i++) {
   result[temp[0]] += "=" + temp[i];
 }
}
} );
 return result;
}
var queryParams = getQueryParams(window.location.search.replace(/^\?/, ''));
document.getElementById('text').value = queryParams['message'];
document.getElementById('smsPrefix').value = queryParams['smsPrefix'];
document.getElementById('smsNumber').value = queryParams['smsNumber'];
