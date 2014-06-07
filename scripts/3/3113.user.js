// ==UserScript==
// @author	  Paul Downey http://blog.whatfettle.com
// @name          Flyr from Flickr
// @description	  Adds a link to flyr against geotagged photos on Flickr
// @namespace     http://whatfettle.com/GreaseMonkey/FlyrFromFlickr
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// @version 0.1
// ==/UserScript==

// Tested with:
//    Firefox 1.5.1, GM 0.6.4 OSX
//    Firefox 1.0.7, GM 0.5.3 Windows XP
//
// Version History:


function GeocacheTagsInFlickr() 
{
    var thetags = document.getElementById("thetags");
    var nodes = thetags.getElementsByTagName("a");
    var exp = new RegExp("^geotagged$");
    var form = document.forms.namedItem("blog_form");    var input = form.elements.namedItem("photo");    var id = input.value;

    for (var i = 0; i < nodes.length; i++) 
    {
	var node = nodes[i];

	if (node.innerHTML.match(exp)) 
        { 
           n = document.createElement('a');
	   n.innerHTML = "<img height='10' width='17' src='data:image/gif;base64,"

	    +'R0lGODlhEQAKAPcAAP//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Z'
	    +'mf+ZZv+ZM/+ZAP9m//9mzP9mmf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8A'
	    +'Zv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczMZszMM8zMAMyZ/8yZzMyZmcyZZsyZ'
	    +'M8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswAM8wA'
	    +'AJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm'
	    +'/5lmzJlmmZlmZplmM5lmAJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/'
	    +'zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZm'
	    +'mWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAGYA/2YAzGYAmWYAZmYAM2YAADP//zP/zDP/mTP/'
	    +'ZjP/MzP/ADPM/zPMzDPMmTPMZjPMMzPMADOZ/zOZzDOZmTOZZjOZMzOZADNm/zNmzDNmmTNmZjNm'
	    +'MzNmADMz/zMzzDMzmTMzZjMzMzMzADMA/zMAzDMAmTMAZjMAMzMAAAD//wD/zAD/mQD/ZgD/MwD/'
	    +'AADM/wDMzADMmQDMZgDMMwDMAACZ/wCZzACZmQCZZgCZMwCZAABm/wBmzABmmQBmZgBmMwBmAAAz'
	    +'/wAzzAAzmQAzZgAzMwAzAAAA/wAAzAAAmQAAZgAAMwAAAP7J4f3f7fwAevut1v9PsQAA/gAA+AAA'
	    +'9wcG+QwL9xER+Rka+Scn+jw8/0NF+XNz/4aH+5WV+Z+g+rW2/NLS+lJW+6mr+sPF/sPE+8zN++Xn'
	    +'+/P0/s/d//n7/Pz9/f7//vz9+fv89///+////fv6+f77+f///////yH5BAEAAP8ALAAAAAARAAoA'
	    +'AAiHAAEIHEiwIEF26+TBm2ew4Lpw7dR5e9eQIKpw6eB1g4dunb516LJN2NZAYDlx6jSyazcu37h2'
	    +'2LRp4CbwHDl977qxY/cNHTh6MbH1E+hn3L6c8Pqh+mZOX9CB6JrGIxdPX7pv7gBg04CNYL5++PLp'
	    +'09cOHEN79eoR1HdP4D5+6NzpE3ivLYCAADs='
	    +"'/>";

	   n.href = "http://flyr.whatfettle.com/maps?ids="+id;
                     node.parentNode.insertBefore(n, node.nextSibling);

	   nbsp = document.createTextNode(' ');
           node.parentNode.insertBefore(nbsp, node.nextSibling);

	}
    }
}

GeocacheTagsInFlickr(); 
