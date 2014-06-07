// ==UserScript==
// @name           Team Forum Tab
// @namespace      GLB
// @include        http://goallineblitz.com/game/team.pl?team_id=*
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

var toolbar = getElementsByClassName('subhead_link_bar', document)
var link = window.location.href
var id = link.split('team_id=', 2)
var link = document.createElement('a');
link.setAttribute('href', 'http://goallineblitz.com/game/forum_thread_list.pl?team_id=' + id[1]);
link.innerHTML = 'Team Forum'
toolbar[0].appendChild(link)