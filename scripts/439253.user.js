// ==UserScript==
// @name       Khimeros Forager X-Ray
// @namespace  http://provinite.tumblr.com/
// @version    0.1
// @description  enter something useful
// @match      http://www.khimeros.com/foraging.php*
// @copyright  2014, Prov
// ==/UserScript==


XMLHttpRequest.prototype.realOpen = XMLHttpRequest.prototype.open;


var showResults = function() {
    for (var i = 1; i <= 16; i++) {
        var o = document.getElementById('slot'+i);
    	if (o.innerHTML.substring(0, 4) != '<div')
        {
            o.style.border="1px solid black";
            if (o.getAttribute('rel') != 'null' && o.getAttribute('rel') != null && o.getAttribute('rel') != 'undefined')
            { 
                o.innerHTML = '<span style="font-size:14pt;font-weight:bold;text-align:center;color:white;">' + o.getAttribute('rel') + '</span>';
            	if (o.getAttribute('data-icon') != null && o.getAttribute('data-icon') != 'null' && o.getAttribute('data-icon') !== 'undefined')
            	{
        			o.style.background="url('/static/items/" + o.getAttribute('data-icon') +"') center no-repeat black";
            		o.style.opacity="0.7";
            	} 
            } else {
            	o.style.background="none";
                o.style.opacity="1";
            }
        }	
    }
};

function setName(i, name) { unsafeWindow.myNames[i] = name; }

var interval = setInterval(showResults, 2);


var myOpen = function(a, b, c) {
    //do whatever mucking around you want here, e.g.
    //changing the onload callback to your own version
    
    this.addEventListener("load", function(evt) {
        var response = JSON.parse(this.responseText);
        
        for (var i = 1; i <= 16; i++) {
            document.getElementById('slot'+i).setAttribute('rel', response[i].name);
            document.getElementById('slot'+i).setAttribute('data-icon', response[i].thumb);
        }
    });
    //call original
    this.realOpen (a, b, c);
}  


//ensure all XMLHttpRequests use our custom open method
XMLHttpRequest.prototype.open = myOpen ;