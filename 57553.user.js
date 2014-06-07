// ==UserScript==
// @name           Dummy Pos Button
// @namespace      GLB
// @include        http://goallineblitz.com/game/replay.pl?game_id=*
// ==/UserScript==

function getElementsByClassName(classname, par){
  var a=[];   
  var re = new RegExp('\\b' + classname + '\\b');      
  var els = par.getElementsByTagName("*"); 
  for(var i=0,j=els.length; i<j; i++){       
    if(re.test(els[i].className)){  
      a.push(els[i]);
    }
  }
  return a;
};

var controls = document.getElementById('controls')
var buttons = getElementsByClassName('button left', document)
if (buttons.length == 9) {
var clear = controls.getElementsByTagName('div')
controls.removeChild(clear[0])
controls.innerHTML = controls.innerHTML + '<a class="button left" href="'+document.location.href+'"><span>Next Pos >></span></a>'
controls.appendChild(clear[0])
}