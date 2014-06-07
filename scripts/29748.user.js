// ==UserScript==
// @name           GLB Add PBP Link to Schedule and Scores
// @namespace      KHMI - Greasemonkey
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// ==/UserScript==

// <td><a href="/game/game.pl?game_id=46936">L 9-16</a></td>

// schedule_date_value
var schedule_date_value = getElementsByClassName("schedule_date_value", document);

for(var i = 0;i < schedule_date_value.length;i++){
   var re = /game_id=(.+)">(.+)<\/a>/;
   var matches = schedule_date_value[i].parentNode.childNodes[5].innerHTML.match(re);
   if(matches != undefined){
      var a = document.createElement('a');
      a.setAttribute('href', 'http://goallineblitz.com/game/game.pl?game_id=' + matches[1] + '&mode=pbp');
      a.innerHTML = '?';
      schedule_date_value[i].parentNode.childNodes[5].innerHTML = schedule_date_value[i].parentNode.childNodes[5].innerHTML + "&nbsp;";
      schedule_date_value[i].parentNode.childNodes[5].appendChild(a);
   }
}

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