// ==UserScript==
// @name           GLB Player/Gm Count for season 14
// @namespace      GLB 
// @include        http://goallineblitz.com/game/home.pl*
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
};var players = getElementsByClassName('list_name', document)
var playercount = players.length
var title = getElementsByClassName('medium_head', document)
title[0].innerHTML = title[0].innerHTML + '<span style="padding-left:20px"><font size="2"><font color="#003080">Players (' + playercount + ') '

var gm = getElementsByClassName('team_content', document)
var gmcount = gm.length
var title = getElementsByClassName('medium_head', document)
title[0].innerHTML = title[0].innerHTML + '<font size="2"><font color="#003080">GM (' + gmcount + ')'