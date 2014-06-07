// ==UserScript==
// @name           Daisy Owl alt-text
// @namespace      http://flyne.monkey.googlepages.com/
// @description    Displays alt-text below image on daisyowl.com
// @include        http://www.daisyowl.com/comic/*
// @include        http://www.daisyowl.com/
// ==/UserScript==

function getElementsByAttribute(tag, attrib, value, ele){
  if(ele) d = ele.getElementsByTagName(tag);
  else d = document.getElementsByTagName(tag);
  var cl = new Array()
  var j=0;
  for(var i=0;i<d.length;i++){
    if(d[i].getAttribute(attrib).match(value)){
      cl[j] = d[i];
      j++
    }
  }
  return cl;
}


imgele = getElementsByAttribute('img', 'src', '/comic_images/')[0]
//alert(imgele.title)
var cele = document.createElement('center')
//var tele = document.createTextNode("\n" + imgele.title)
//cele.appendChild(tele)
cele.innerHTML="<font size=4>" + imgele.title + "</font>"
imgele.parentNode.appendChild(cele)