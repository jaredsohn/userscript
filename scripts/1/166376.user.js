// ==UserScript== 
// @name TPM BATTLE BOT 
// @namespace XxEdogxX
// @description 
// @include http://tpmrpg.net/Battle.php#Form  
// ==/UserScript== 
// check for buttons every (1000ms / 1 second) 
var interval = setInterval(function() { 
// get elements 
var elements = document.querySelectorAll('input[type="button"]'); 
var val, i; 
//--- Note that the contains() text is case-sensitive. 
// loop through all elements 
for (i = 0; i < elements.length; i++) { 
// shorten value for easier use 
val = elements[i].value; 
if (val == 'Continue' || val == 'Restart Battle' || val == 'Proceed' || val == ' Attack ' || val == 'Fight Again || val == 'Battle Again || val == 'Progress || val == 'Search'''') { 
// click element 
elements[i].click(); 
} 
} 
}, 10);