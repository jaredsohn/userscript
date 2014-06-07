// ==UserScript==
// @name           Pigskin Empire: Free Agent Offered Count
// @copyright      2011, Jdog
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        3.2.11
// @include        http://beta.pigskinempire.com/contracts.asp?v=O
// @description    Posts your total offers on your offered page
// ==/UserScript==

window.setTimeout(function(){
	main();
},100
);




function main()
{
	
var table = document.getElementById("theTable");
var location = document.getElementsByTagName("table")[0];

var newElement = document.createElement("b");
newElement.innerHTML = "Offered: " + (table.rows.length - 1);
location.appendChild(newElement);

}

