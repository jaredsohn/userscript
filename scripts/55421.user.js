// ==UserScript==
// @name           CoCo
// @include        http://apps.facebook.com/friendsforsale/users/show/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function catchCoins(){
  var divs = document.getElementsByTagName('div');
  var re = new RegExp('coin');
  var coin;
  for(var i=0; i<divs.length; i++){
    if(divs[i].id.match(re)){
      coin = divs[i];
    }
  }
  if(coin){
    var nodes = coin.childNodes;
    link = nodes[0];
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, false, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(evt);
  }
  var url = window.location['href'];
  url = url.split('/');
  var id= parseInt(url[url.length-1]);
  var id=id+1;
  var newHref = url[0];
  for(var i=1; i<url.length-1; i++){
    newHref += "/"+url[i];
  }
  newHref += "/"+id;
  window.location.href=newHref;
}

window.onload = function main(){
  catchCoins();
}