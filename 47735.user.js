// ==UserScript==
// @name          100yahoo Pseudorandom Jumper
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  jumps to link which is selected randomly from current page
// @include       http://100.yahoo.co.jp/*
// @version       1.0
// ==/UserScript==

(function(){
  var need2links = true;
  var need3links = false;
  var candidates = new Array;
  var current=String(document.location).match(/\/detail\/(.+)\//) ? String(document.location).match(/\/detail\/(.+)\//)[1] : "^z";
  for(i=0;i<document.links.length;i++){
    link=String(document.links[i]);
    if(link.match(/^http:\/\/100\.yahoo\.co\.jp\/detail\//)){
      if(link.match(/%EF%BC%BB%E7%94%BB%E5%83%8F%EF%BC%BD/) || link.match(current)){
        ;
      }
      else{
        candidates.push(link);
      }
    }
  }
  if(candidates.length==0){
    location.href="http://100.yahoo.co.jp/";
  }
  else{
    var header = document.evaluate('//h1', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    var fornextgen = generatelink(header, 'x');
    if(need2links || need3links){
      fornextgen = generatelink(fornextgen, 'c');
    }
    if(need3links){
      fornextgen = generatelink(fornextgen, 'v');
    }
  }
  function generatelink(head, keycode){
    var spl_link = document.createElement('a');
    spl_link.setAttribute('href', candidates[Math.floor(candidates.length*Math.random())]);
    spl_link.setAttribute('title', '100yahoo Pseudorandom Jumper [shift-alt-' + keycode + ']');
    spl_link.setAttribute('accesskey', keycode);
    if(keycode == 'x'){
      spl_link.innerHTML = '<br><div align="right">Jump! [shift-alt-' + keycode + ']</div>';
    }
    else{
      spl_link.innerHTML = '<div align="right">Jump! [shift-alt-' + keycode + ']</div>';
    }
		head.parentNode.insertBefore(spl_link, head.nextSibling);
    return spl_link;
  }
})();