// ==UserScript==
// @name           latestpost
// @namespace      tmb
// @description    goto latest post (only)
// @include        http*://*themixingbowl.org/forum/*
// @include        http*://*tmb.dj/forum/*
// ==/UserScript==

  var lastpst = document.getElementsByClassName('lastposter');

  for (var i=0; i < lastpst.length; i++){
    l = lastpst[i].getElementsByTagName('a')[1];
    ln = l.href.replace(/(?:.*?)#([0-9]{6})/,'/post/view/$1');
    
    links = document.createElement('a');
    links.href = ln;
    
    img = document.createElement('img');
    img.src = "/static/img/silk/zoom.png";
    img.setAttribute('height',10);
    img.setAttribute('style','padding-left:9px');
    links.appendChild(img);

    lastpst[i].appendChild(links);
  }