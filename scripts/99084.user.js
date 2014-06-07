// ==UserScript== 
// @name 40 Time Link 
// @namespace fourty 
// @copyright 2010, Jdog 
// @license (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/ 
// @version 12.26.10 
// @include http://beta.pigskinempire.com/player.asp?id=* 
// ==/UserScript== 

window.setTimeout( 
function() { 
main(); 
}, 
100 
); 

function main(){ 
var url = window.location.search; 
var link = "http://beta.pigskinempire.com/prospect.asp" + url + "&v=info&m=P" 

var list = document.getElementsByTagName("ul")[3]; 
var li = document.createElement("li"); 
var a = document.createElement("a"); 
a.href = link; 
a.innerHTML = "40 TIME"; 
a.target = "_blank"; 
li.appendChild(a); 
list.appendChild(li); 

} 
