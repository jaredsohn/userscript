// ==UserScript==
// @name           GLB Team Page Forum Link
// @namespace      KHMI - Greasemonkey
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// @include        http://goallineblitz.com/game/roster.pl?team_id=*
// @include        http://goallineblitz.com/game/depth_chart.pl?team_id=*
// @include        http://goallineblitz.com/game/team_player_stats.pl?team_id=*
// @include        http://goallineblitz.com/game/stadium.pl?team_id=*
// ==/UserScript==

var timeout = 0;

window.setTimeout( function() {
   var url = window.location.href;
   var re = /team_id=(\d{1,7})/;
   var matches = url.match(re);
   var teamId = matches[1];

   // add pop up link
   var link = document.createElement('a');
   link.setAttribute('href', 'http://goallineblitz.com/game/forum_thread_list.pl?team_id=' + teamId);
   link.innerHTML = "Team Forum";

   // subhead_link_bar
   var subhead_link_bar = getElementsByClassName("subhead_link_bar", document);
   subhead_link_bar[0].innerHTML = subhead_link_bar[0].innerHTML + " | ";
   subhead_link_bar[0].appendChild(link);
},timeout);

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