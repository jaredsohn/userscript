// ==UserScript==
// @name           Player Count
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
};

var players = getElementsByClassName('large_title_bar playerhead', document)
var playercount = players.length
var title = getElementsByClassName('medium_head subhead_head', document)
title[0].innerHTML = title[0].innerHTML + ' (' + playercount + ')'
var gmbox = document.getElementById('gm_teams')
var gms = getElementsByClassName('large_title_bar teamhead', gmbox)
var gmcount = gms.length
var gmtitle = getElementsByClassName('medium_head', document)
gmtitle[1].innerHTML = gmtitle[1].innerHTML + ' (' + gmcount + ')'