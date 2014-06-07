// Kids View!
// by    [ 6a159d036ab57cbcc4792bdb7558aa87 ]
// email [ cc4f81976a953f51937c812f575e71d9 ]
// version 0.2 BETA!
// 2007-05-11
// Copyright (c) 2007, DWL
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Kids View!", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Kids View!
// @namespace     guru 
// @description   view kids web bbs
// @include       http://kids.kornet.net/*
// @include       http://kidsb.net/*
// ==/UserScript==


/*
allLinks = document.getElementsByTagName('a');

for(i=0; i<allLinks.length; i++)
{
  	me = allLinks[i];

	if(encodeURIComponent(me.textContent) == "%C7%D4%BA%B8%BD%B4")
	{
		logo = document.createElement('img');
		logo.src = 'http://ib.emimg.com/photo/adult_50.gif';
		me.insertBefore(logo, me.firstChild);
	}
}
*/

(function() {
// Constants
var glIsMain=false;
var idx = 4;
var allLinks = document.getElementsByTagName('a');

m = allLinks[idx]
m.textContent = m.textContent.replace("***","");

window.addEventListener('keydown', keyHandler, false);

function keyHandler(event) {
    
  if ( event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return false;
  }

  if(event.keyCode == 79) // o
  {
	document.location.href="http://www.google.com";
  }
 
  if(event.keyCode == 77) // m
  {
	if( document.body.style.display == "none")
		document.body.style.display = "block";
	else
		document.body.style.display = "none";
  }

/*
  if(event.keyCode == 76) // l
  {
	var temp = new Array();

	for(i=0; i<allLinks.length; i++)
		temp.push( allLinks[i].textContent );
	temp.sort();
	for(i=0; i<temp.length; i++)
		document.body.innerHTML += temp[i]+"<br>";
  }
*/

  if(event.keyCode == 71) // g
	document.location.href = allLinks[idx].href;

  if(event.keyCode == 80) // p
	document.location.href = allLinks[4].href;

  if(event.keyCode == 78) // n
	document.location.href = allLinks[3].href;

  if(event.keyCode == 74 || event.keyCode == 75) // j,k
  {
	idx = idx % allLinks.length;
  	me = allLinks[idx];
	me.textContent = me.textContent.replace("***","");
  }

  if (event.keyCode == 74) idx++;
  if (event.keyCode == 75) idx--;

  if(idx<0) idx = allLinks.length-1;

  if(event.keyCode == 74 || event.keyCode == 75)
  {
	idx = idx % allLinks.length;
  	me = allLinks[idx];
	me.textContent = "***"+me.textContent;
  }

  return false;
}

})();
