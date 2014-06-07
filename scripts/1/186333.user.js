// ==UserScript== 
// @name Background Change 
// @namespace https://jayeeurope.wufoo.com/forms/sff-car-donation-competition/
// @description yeaah 
// @include https://jayeeurope.wufoo.com/* 
// ==/UserScript== 

         
document.getElementById('Field1').value="Adam Mickiewicz";
document.getElementById('Field3').value="lol@gmail.com";
document.getElementById('Field5').value="Poland";
document.getElementById('Field2_3').checked = true;
setTimeout(function() {
document.forms[0].submit()


}, 100);

