// ==UserScript==

// @name          Webmonkey's Floating Menu

// @namespace     http://www.webmonkey.com

// @description   A Greasemonkey script that finds h2 tags and creates a floating menu of them.

// @include       *

// ==/UserScript==



var headers = document.getElementsByTagName('h2');

var menu = '';

for (i=0; i<headers.length; i++)

{

  // Determine menu text

  var thismenu = headers[i].innerHTML;

  thismenu = thismenu.replace(/<[^>]*>/g, ''); // Remove HTML tags

  thismenu = thismenu.replace(/[[^]]*]/g, ''); // Remove anything within square brackets



  // Create menu item

  var thisid = headers[i].id;

  if (thisid == '')

  {

    thisid = 'h2header' + i;

    headers[i].id = thisid;

  }

  menu += '<li><a href="#' + thisid + '"">' + thismenu + '</a></li>';

}



// Create menu

if (menu != '')

{

  menuobj = document.createElement('ol');

  menuobj.style.position = 'fixed';

  menuobj.style.top = '10px';

  menuobj.style.left = '10px';

  menuobj.style.padding = '20px';

  menuobj.style.backgroundColor = '#fff';

  menuobj.innerHTML = menu;

  body = document.getElementsByTagName('body')[0];

  body.appendChild(menuobj);

}



