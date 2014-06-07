// ==UserScript==
// @name       League of Legends ranked teams members
// @version    0.1
// @description  jump to soloQ LADDER from team members page
// @include    http://competitive.*.leagueoflegends.com/ladders/*/current/ranked_team_*
// @copyright  2012, fixit
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==
    $(document).ready( function() {
        var regexp=/ladders\/(.*)\/current/i;
        tmp= (regexp.exec(document.URL));
        var newURL="http://competitive."+tmp[1]+".leagueoflegends.com/ladders/"+tmp[1]+"/current/rankedsolo5x5?summoner_name=";
      $(document).on("click", "div.member", function(){ 
            tmp=newURL+encodeURIComponent(jQuery.trim($(this).text()));
            GM_openInTab(tmp);
        });
    });