// ==UserScript== 
// @name aaa 
// @namespace https://jayeeurope.wufoo.com/forms/sff-car-donation-competition/
// @description yeaah 
// @include https://jayeeurope.wufoo.com/* 
// ==/UserScript== 

var i=1;  
while(i<15)
{i++;          
document.getElementById('Field1').value="Adam Mickiewicz";
document.getElementById('Field3').value="lol@gmail.com";
document.getElementById('Field5').value="Poland";
document.getElementById('Field2_3').checked = true;
setTimeout(function() {
document.forms[0].submit()


}, 100);
setTimeout(function() {
window.location.replace("https://jayeeurope.wufoo.com/forms/sff-car-donation-competition/");

}, 3000);
}
