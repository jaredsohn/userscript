// ==UserScript==
// @name           YT Search bar remover
// @namespace      http://flyne.monkey.googlepages.com/
// @description    Removes the search bar from embedded youtube videos
// @exclude        http://*.youtube.com/*
// ==/UserScript==

function getElementsByAttribute(tag, attrib, value, ele){
  if(ele) d = ele.getElementsByTagName(tag);
  else d = document.getElementsByTagName(tag);
  var cl = new Array()
  var j=0;
  for(var i=0;i<d.length;i++){
    if(d[i].getAttribute(attrib).toLowerCase().match(value.toLowerCase())){
      cl[j] = d[i];
      j++
    }
  }
  return cl;
}

yvids = getElementsByAttribute("embed", "src", "youtube.com")

for(var i=0; i<yvids.length; i++) {
  if(yvids[i].src.match('&')) yvids[i].src+=';showsearch=0'
  else yvids[i].src+="&showsearch=0"
}