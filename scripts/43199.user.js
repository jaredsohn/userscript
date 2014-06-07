// ==UserScript==
// @name           Replace Team forum by tactics link
// @namespace      homepage
// @include        http://goallineblitz.com/game/home.pl
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

function replaceForumLink(player)
{
  var playerid, ind, ind2, orig;
  var photos = getElementsByClassName('player_photo', player);

  for (var i=0; i<photos.length; i++) {
    ind = photos[i].innerHTML.indexOf("player_id=");
    ind2 = photos[i].innerHTML.indexOf("\"", ind);
    playerid = photos[i].innerHTML.substring(ind+10, ind2);
  }

  var vitals = getElementsByClassName('player_vitals', player);
  var els = vitals[0].getElementsByTagName("*");

  for(var i=0,j=els.length; i<j; i++){
  
    ind=els[i].innerHTML.indexOf("Team Forum", 0);
    if (ind>=0) {
      ind2=els[i].innerHTML.indexOf("</a>", ind);
      orig = els[i].innerHTML;
//      els[i].innerHTML=orig.substring(0, ind) + "Player tactics" + orig.substring(ind2, orig.length);
      els[i].innerHTML=orig.substring(0, ind) + "Player tactics" + "</a>, <a href=\"http://goallineblitz.com/game/equipment.pl?player_id=" + playerid + "\">Equipment" + orig.substring(ind2, orig.length);

      ind=els[i].innerHTML.indexOf("/game/forum_thread_list.pl?team_id=", 0);
      if (ind>=0) {
        ind2=els[i].innerHTML.indexOf("\"", ind);
        orig = els[i].innerHTML;
        els[i].innerHTML=orig.substring(0, ind) + "http://goallineblitz.com/game/player_tactics.pl?player_id=" + playerid + orig.substring(ind2, orig.length);        
      }
    }
  }
}

window.setTimeout( function() {

  var players = getElementsByClassName('content_container player_box_vet', document);
  for (var i=0; i<players.length; i++) 
    replaceForumLink(players[i]);

  players = getElementsByClassName('content_container_sp player_box_vet', document);
  for (var i=0; i<players.length; i++) 
    replaceForumLink(players[i]);

}, 100);
