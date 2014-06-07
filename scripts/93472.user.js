// ==UserScript==
// @name           Tengaged Everybody Red Nose 
// @namespace      http://www.latinsud.com
// @include        http://www.tengaged.*/*
// @version        1.0
// ==/UserScript==


function
findPos (obj)
{
  var curleft = curtop = 0;
  if (obj.offsetParent)
    {
      do
	{
	  curleft += obj.offsetLeft;
	  curtop += obj.offsetTop;
	}
      while (obj = obj.offsetParent);
    }
  return[curleft, curtop];
}

imgs = document.body.getElementsByTagName ('img');
for (i = imgs.length-1; i >=0; i--)
  {
    im = imgs[i];
    pos = findPos (im);
if (!im.src.match(/img_a\/av\..*.jpg\?id=/)) continue;
    var img_src =
      'data:image/png;base64,' +
      'iVBORw0KGgoAAAANSUhEUgAAAIwAAAChAQMAAAAvPMWVAAAAAXNSR0IArs4c6QAAAAZQTFRFtvCP/wAA'
      +
      'KmKLegAAAAF0Uk5TAEDm2GYAAAA7SURBVEjHY2AYBaNgFIyCUUAisG/AEPr/AFPoA7oII6YQ8/8fdBbC'
      + '4ggGbEIPiPH2KBgFo2AUjIKhAADrUBjXDkwBfQAAAABJRU5ErkJggg==';
    var img_node = document.createElement ('img');
    img_node.src = img_src;
    img_node.width = im.width;
    img_node.height = im.height;
    img_node.style.position='absolute'; img_node.style.top=(pos[1]-2)+"px"; img_node.style.left=pos[0]+"px";
    document.body.appendChild (img_node);
  }