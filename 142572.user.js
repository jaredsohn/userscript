// ==UserScript==
// @name			hwmUpper
// @namespace		hwm
//@version			0.0.1
// @description		hwm_upper
// @include		http://www.heroeswm.ru/forum.php*
// ==/UserScript==


function upper(){
var pTable = document.getElementsByClassName('table3 forum c_darker td_bordered');
var tbody = pTable.firstChild;
var chN = tbody.ChildrenNodes;


for(i=0; i<chN.length;i++){
  
  alert(chN[chN.length-1].className);
  
}     



}

upper();