// ==UserScript==
// @name Load Sound
// @namespace aleksandr.pasechnik.com
// @include *
// ==/UserScript==

window.addEventListener("load", function(e) {
  console.log('ringing?');
  function EvalSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.Play();
  }
  var newembed = document.createElement('embed');
  newembed.setAttribute('src','http://localhost/Purr.aiff');
  newembed.setAttribute('autostart','false');
  newembed.setAttribute('id','sound1');
  newembed.setAttribute('enablejavascript','true');
  newembed.setAttribute('hidden', 'true');
  document.body.appendChild(newembed);
  EvalSound('sound1');
}, false);