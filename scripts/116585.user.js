// ==UserScript==
// @name           fs-contract
// @namespace      formspring
// @description    Replace smug smiley face with suffering
// @include        http://www.formspring.me/*
// @version        2.0
// @run-at         document-end
// ==/UserScript==


var img = 'http://i.imgur.com/6rnqz.png';

document.getElementById('follow_stream').addEventListener("DOMNodeInserted", incubator, false);

function incubator(event) {
  var tgt = document.getElementsByClassName('storyIcon');

  for (i=0;i<tgt.length;i++){
   if(tgt[i].getAttribute('width') == 24){
    tgt[i].setAttribute('src', img);
    tgt[i].setAttribute('width', 28);
    tgt[i].setAttribute('height', 28);
   }
  }
}