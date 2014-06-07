// ==UserScript==
// @name       Neocola Clicker
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.neopets.com/moon/neocola2.phtml
// @copyright  2012+, You
// ==/UserScript==

var elements = document.getElementsByTagName('select');
for(var i = 0; i < elements.length; ++i){
    var max = elements[i].length;
    max = parseInt(max)
    max = max-1;
    var tempN = Math.floor((Math.random()*max)+1);
	elements[i].selectedIndex = tempN;
}
var butt = document.getElementsByTagName('input');

for(var j = 0; j < butt.length; ++j) {
 	if (butt[j].value == "Continue to your doom...")
    {
        setTimeout(1750);
        butt[j].click();   
    }
    
    
}
console.log(butt);
