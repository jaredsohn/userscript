// ==UserScript==
// @name          Google cache quick-find
// @description   Links together search terms in a page from Google cache
// @include       *?q=cache:*
// ==/UserScript==

// Written by Crosbie Smith
// Licensed under the GNU General Public License (GPL)
//
// Version 1.1  - 20th February 2009
//
// 1.1 Hacks for changes in cache page layout

var counts = new Object();

var cells, thiscell, pageLink;
cells= document.getElementsByTagName('span');
for (var i = 0; i < cells.length; i++) {
    thiscell = cells[i];
 var style = thiscell.getAttribute('style');



if (style  != null) {



 //GM_log('Style: ' + style);
 style.match(/(\d+), (\d+), (\d+)/);
 var $colr = new Number(RegExp.$1);
		var $colg = new Number(RegExp.$2);
		var $colb = new Number(RegExp.$3);
		var color =
			($colr).toString(16) + ($colg).toString(16) + ($colb).toString(16);
  //GM_log('Color: ' + color);


  
 

    
				counts[color] = 1;
		var link = location.href  + '#' + color + "_1";
		thiscell.innerHTML =
			'<a href=' + link + " style='text-decoration: none; color: #000;'>"  + thiscell.innerHTML + "</a>";
               //GM_log('Link: ' + link);

    
}

    
}
//GM_log('zoom');

// add anchors as appropriate
var allLinks, thisLink, pageLink;
allLinks = document.getElementsByTagName('b');
for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
 var style = thisLink.getAttribute('style');



if (style  != null) {



 //GM_log('Style: ' + style);
 style.match(/(\d+), (\d+), (\d+)/);
 var $colr = new Number(RegExp.$1);
		var $colg = new Number(RegExp.$2);
		var $colb = new Number(RegExp.$3);
		var color =
			 ($colr).toString(16) + ($colg).toString(16) + ($colb).toString(16);
  //GM_log('Zolor: ' + color);
		var count = counts[color]++;
        thisLink.innerHTML = "<a name='" + color + "_" + count +
			"' href='" + location.href  + '#' + color + "_" + (count+1) +
			"' style='text-decoration: none; color: #000; '>" +
			thisLink.innerHTML + "</a>";
    }
}