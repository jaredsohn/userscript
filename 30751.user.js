// ==UserScript==
// @name           GLB Add Full season stats to Team page for players
// @namespace      Darwood - Greasemonkey
// @include        http://goallineblitz.com/game/team.pl?team_id=*
// ==/UserScript==

// schedule_date_value
var schedule_date_value = getElementsByClassName("lineup_player", document);

for(var i = 0;i < schedule_date_value.length;i++){
   var re = /player_id=(.+)">(.+)<\/a>/;
   var matches = schedule_date_value[i].parentNode.childNodes[3].innerHTML.match(re);
   if(matches != undefined){
      var a = document.createElement('a');
      var b = document.createElement('a');
      a.setAttribute('href', 'http://goallineblitz.com/game/full_player_stats.pl?player_id=' + matches[1] + '&playoffs=0');
      a.innerHTML = '<img src="http://ilgiornale.onemeet.net/brand/ilgiornale/images/ic_stat.gif" border="0" width="12" height="12" title="Full season stats">';
      schedule_date_value[i].parentNode.childNodes[3].innerHTML = schedule_date_value[i].parentNode.childNodes[3].innerHTML + "&nbsp;";
      schedule_date_value[i].parentNode.childNodes[3].appendChild(a);
      b.setAttribute('href', 'http://goallineblitz.com/game/player_game_log.pl?player_id=' + matches[1]);
      b.innerHTML = '<img src="http://www.bodybuildinglog.com/cms/articleimages/250/log-icon.gif" border="0" width="12" height="12" title="Game log">';
      schedule_date_value[i].parentNode.childNodes[3].innerHTML = schedule_date_value[i].parentNode.childNodes[3].innerHTML + "&nbsp;";
      schedule_date_value[i].parentNode.childNodes[3].appendChild(b);
      //http://digioxy.com/Portals/0/LiveJournalLogo.gif
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

