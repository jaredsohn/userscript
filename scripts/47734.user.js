// ==UserScript==
// @name          Kotobank Pseudorandom Jumper
// @namespace     http://d.hatena.ne.jp/Koumei_S/
// @description	  jumps to link which is selected randomly from current page
// @include       http://kotobank.jp/*
// @version       1.0
// ==/UserScript==

(function(){
  var need2links = true;
  var need3links = true;
  var candidates = new Array;
  var current=String(document.location).match(/\/word\/(.+)$/) ? String(document.location).match(/\/word\/(.+)$/)[1] : "^z";
  for(i=0;i<document.links.length;i++){
    link=String(document.links[i]);
    if(link.match(/^http:\/\/kotobank\.jp\/word\//)){
      if(link.match(current)){
        ;
      }
      else{
        candidates.push(link);
      }
    }
  }
  if(candidates.length==0){
    location.href="http://kotobank.jp/";
  }
  else{
    var header = document.evaluate('id("unitAccessRanking")/div[2]/div/div/dl', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
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
    spl_link.setAttribute('title', 'Kotobank Pseudorandom Jumper [shift-alt-' + keycode + ']');
    spl_link.setAttribute('accesskey', keycode);
    spl_link.innerHTML = '<p class="more">Jump! [shift-alt-' + keycode + ']</div>';
    head.parentNode.insertBefore(spl_link, head.nextSibling);
    return spl_link;
  }
})();