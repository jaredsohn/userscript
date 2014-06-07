// ==UserScript==
// @name           kolorowe_avatarki v2
// @namespace      local
// @include        http://*fotka.pl/tv*
// @exclude        http://*fotka.pl/js/*
// @author         fotograf & djlukasz
// @version        1.0.1
// ==/UserScript==

if(document.getElementById("strona") == null) return;

var headID = document.getElementsByTagName('head')[0];
var style = document.createElement('style');   
    style.type = 'text/css';
style.innerHTML = '<!-- /* fp */ 
div#userlist_user_id_10675
, div#userlist_user_4033
, div#userlist_user_11945245
, div#userlist_user_15404202
, div#favlist_user_4033


{box-shadow: 4px 3px 0px #427A20} /* mod-tv */
 div#userlist_user_8977430

 
{box-shadow: 4px 3px 0px #666} /* mod-tv-chat */
 div#userlist_user_6504047, div#userlist_user_10049863
 
 
{box-shadow: 4px 3px 0px #666} /* ft */
 div#userlist_user_14068426, div#userlist_user_7769610, div#userlist_user_1240426, div#userlist_user_2248149

{box-shadow: 4px 3px 0px #ff0000} -->';
  headID.appendChild(style);
  
  
  
  
  