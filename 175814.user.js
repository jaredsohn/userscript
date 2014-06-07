// ==UserScript==
// @name           IOI Uppercase Forcer
// @namespace      http://www.Tenfold.co.nr
// @description    Forces uppercase in all text fields for IOI
// @include        http://btvxmdioisrv.btv.ibm.com/ioi/portal/screen/facade.Home
// @include        https://deptbosv.btv.ibm.com/HoldForm/HoldFormNewLot.php
// @include        http://btvxmdioisrv.btv.ibm.com/ioi/portal/screen/lot*
// @include        http://fcsprod0.btv.ibm.com:10473/w3Inventory/openRepairTicketatTool.do
// ==/UserScript==

var inputs, i, box;

function convert() {
this.value = this.value.toUpperCase();
}

inputs = document.getElementsByTagName("input");
for(i=0; i<inputs.length; i++) {
box = inputs[i];
if(box.type == "text") {
box.addEventListener('change', convert, false);
}
}