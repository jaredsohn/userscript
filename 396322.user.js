// ==UserScript==
// @name       The Kings AutoSelector 2014 Update :|
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include     http://www.neopets.com/medieval/wiseking.phtml
// @include 	http://www.neopets.com/medieval/grumpyking.phtml
// @copyright  2012+, You
// ==/UserScript==

var elements = document.getElementsByTagName('select');
for(var i = 0; i < elements.length; ++i){
    var max = elements[i].length;
    var tempN = Math.floor((Math.random()*max)+2);
	elements[i].selectedIndex = tempN;
    //var test = elements[i].label;
    
    switch(elements[i][0].label)
    {
        case "Select part 1":
            elements[i].selectedIndex = 3;
            break;
        case "Select part 2":
            elements[i].selectedIndex = 8;
            break;
        case "Select part 3":
            elements[i].selectedIndex = 6;
            break;
        case "Select part 4":
            elements[i].selectedIndex = 1;
            break;
        case "Select part 5":
            elements[i].selectedIndex = 39;
            break;
        case "Select part 6":
            elements[i].selectedIndex = 117;
            break;
        case "Select part 7":
            elements[i].selectedIndex = 1;
            break;
        case "Select part 8":
            elements[i].selectedIndex = 32;
            break;
        case "Select part 9":
            elements[i].selectedIndex = 1;
            break;
        case "Select part 10":
            var last = elements[i].length;
            last = parseInt(last);
            elements[i].selectedIndex = last-1;
            break; 
    }
}
