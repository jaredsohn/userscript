// ==UserScript==
// @name           Roster Size
// @namespace      GLB
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
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

var players1 = getElementsByClassName('alternating_color1', document)
var players2 = getElementsByClassName('alternating_color2', document)
var playercount = players1.length + players2.length
var title = getElementsByClassName('medium_head', document)[0]
title.innerHTML = "Roster ("+playercount+"/55)<br>Offense Roster"