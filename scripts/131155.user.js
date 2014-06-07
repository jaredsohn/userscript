// ==UserScript==
// @name           zeroline
// @namespace      mansionhillvets.co.uk
// @description    zero line
// @include        /^http://www\.vet-one4\.net:8080/mhill/servlet/GemVetOne\?module=GemFinancial&method=doInvoiceOverview.*?print=yes$/
// @include        /^https://www\.vet-one[0-9]+\.net:18443/mhill/servlet/GemVetOne\?module=GemFinancial&method=doInvoiceOverview.*?print=yes$/
// ==/UserScript==

inv=document.getElementsByTagName("table")[8];
var len=inv.rows.length-2;
for (r=0;r<len;r=r+2){
row=inv.getElementsByTagName("tr")[r];
cell=row.getElementsByTagName("td")[1];
if(/^0  x/.test(cell.innerHTML)) {inv.deleteRow(r);inv.deleteRow(r);r=r-2;len=inv.rows.length-2;}
}