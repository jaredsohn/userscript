// ==UserScript==
// @name        youtube.com : playlist randomizer
// @namespace   tukkek
// @include     *www.youtube.com/playlist?list=*
// @version     1
// @grant       GM_registerMenuCommand
// ==/UserScript==
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};
GM_registerMenuCommand('Randomize',function(){
  var links=document.querySelectorAll('.pl-video-title a');
  var shuffled=[];
  for(var i=0;i<links.length;i++){
    shuffled[i]=links[i];
  }
  shuffled=shuffle(shuffled);
  var add='';
  for(var i=0;i<links.length;i++){
    shuffled[i].target='_blank';
    add+=shuffled[i].outerHTML+'<br/>';
  }
  document.body.innerHTML+=add;
},'T');
