// ==UserScript==
// @name           gwTank
// @namespace      http://userscripts.org/users/krychek
// @include        http://www.ganjawars.ru/wargroup.php?war=armed*
// @author         Alex Krychek
// ==/UserScript==

(function() {
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow:window;

var tdinf = root.document.getElementsByTagName('table')[1].getElementsByTagName('tr')[1].getElementsByTagName('td')[1];
var secout = (4 - tdinf.innerHTML.substr(4,2) % 5) * 60;
if(secout <= 0) secout = 5;

var tr = root.document.getElementsByTagName('table')[8].getElementsByTagName('tr');
for(var i=tr.length-1; i>0; i--) {
  var aMember = tr[i].getElementsByTagName('td')[7].getElementsByTagName('a');
  if(/Немецкий танк/.test(aMember[0].innerHTML))
    root.location = aMember[aMember.length-1].href;
}

setTimeout('window.location.reload()', secout*1000);

})();