// ==UserScript==
// @name           Total tourney teams
// @namespace      GLB 
// @include        http://goallineblitz.com/game/tournament.pl?tournament_id=*
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
};var teams = getElementsByClassName('involved_team', document)
var teamcount = teams.length
var title = getElementsByClassName('subhead_link_bar', document)
title[0].innerHTML = title[0].innerHTML + '<span style="padding-left:20px"><font size="2"><b><font color="#FFFF00">Total teams (' + teamcount + ') '




