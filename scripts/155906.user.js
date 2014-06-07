// ==UserScript==
// @name This is my test script
// @namespace http://www.jeno.com
// @description Just testing greasemonkey....
// @include *
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// ==/UserScript==

var headers = document.getElementsByTagName('h2');
var menu = '';

for (i = 0; i<headers.length; i++) {
  var thismenu = headers[i].innerHTML;
  thismenu = thismenu.replace(/<[^>]*>/g, '');
  var thisid = headers[i].id;
  if(thisid == '') {
    thisid = 'h2header' + i;
    headers[i].id = thisid;
  }
  menu += '<li><a href="#' + thisid + '">' + thismenu + '</a></li>';
}

if(menu != '') {
  container = document.createElement('div');
  container.id = "zsoltijenobela";
  menuobj = document.createElement('ul');
  mst = container.style;
  mst.position = 'fixed';
  mst.left = '0px';
  mst.top = '0px';
  mst.width = '100%';
  mst.padding = '0px';
  mst.backgroundColor = '#fff';
  menuobj.innerHTML = menu;
  container.appendChild(menuobj);
  body = document.getElementsByTagName('body')[0];
  body.insertBefore(container, body.firstChild);
  body.style.paddingTop = $(document.getElementById('zsoltijenobela')).height();
}