// ==UserScript==
// @name					ModifiedScentMapNumbers
// @namespace 		http://iwitness.urbandead.info 
// @description		Creates numeric vlaues from scent map colors
// @include				http://*urbandead.com*
// @include				http://*urbandead.info*
// ==/UserScript==
//**************************************************
/* 
The target:  			<td style="background:#010D00">&nbsp;</td>
The desired result:	<td style="background:#010D00">r=01<br>g=D0</td>

document.body.innerHTML.replace = document.body.innerHTML.replace(/<td style="background:#(..)(..)(..)">&nbsp;<\/td>/g,'<td style="background:#$1$2$3"><small>r=$1<br>g=$2</small></td>');
*/

 var scentTable = null;
 var tables = document.getElementsByTagName('table');
 for (var i = 0, table; (table = tables[i]); i++) {
  if (table.className == "nt") {
   scentTable = table;
  }
 }
 if (scentTable) {	 
  var rgbFormat = /rgb\((\d+), (\d+), (\d+)\)/;
  var tds = scentTable.getElementsByTagName('td');
  for (var i = 0, td; (td = tds[i]); i++) {
   if (td.style && td.style.backgroundColor) {
    var matches = td.style.backgroundColor.match(rgbFormat);
    if (matches) {
     td.appendChild(document.createTextNode(matches[1]/5 + " Z - " + matches[2]/5 + " B"));
     td.style.color = "#FFFFFF";
     td.style.whiteSpace = "nowrap";
     td.style.fontSize = "14";
     td.style.color = "#3333ff";
    }
   }
  }
 }