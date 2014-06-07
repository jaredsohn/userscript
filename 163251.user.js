// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      file:///C:/Users/Kartalonus/Desktop/esda.html
// @copyright  2012+, You
// ==/UserScript==

var pilihan = prompt("Masukkan pilihan\n1. A\n2. B\n3. C");
var nilai;
if(pilihan=='A'||pilihan=='a'||pilihan=='1')
    nilai = 'A';
else if(pilihan=='B'||pilihan=='b'||pilihan=='2')
     nilai = 'B';
else if(pilihan=='C'||pilihan=='c'||pilihan=='3')
    nilai = 'C';

var allElems = document.getElementsByTagName('input');
for (i = 0; i < allElems.length; i++) {
    if (allElems[i].type == 'radio' && allElems[i].value == nilai) {
        allElems[i].checked = true;
    }
}