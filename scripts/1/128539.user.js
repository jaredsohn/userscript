// ==UserScript==
// @name           beatport_now_playing_local_db_check
// @namespace      local
// @description    Checks Beatport's now-playing song against a local mysql/apache2 webservice and flags the title with an '*' 
//                 if a match is found.  This helps in preventing double or tripple buying songs that are listed as "original mix" but really 
//                 are just re-releases of the same song.  Also helps preventing duplicate buys if you're purchasing from multiple vendors.  
//
// 		   For this to work you will need to setup your own php process that can take the request, do a lookup/search off 
//                 the passed in title, and then respond with xml containg a count of matches: <Matches>99</Matches>.  
//                 This search is not verying complex and probably should include artist and remixer info but for now is all I need.  
// @author         Riley Brazal
// @include        http://www.beatport.com/*
// ==/UserScript==
var nowPlaying = document.getElementById("player-item");
nowPlaying.addEventListener('load', 
                              function (){ 
                                var tn=document.getElementById("now-playing").getElementsByClassName("trackName txt-uppercase");
                                var track = tn[0].text;
                                 if (track.substring(0,1) != "*") 
                                    {
                                     track = track.substring(0,track.indexOf("(")).replace("&","and");
                                     if (isInDB(track)) 
                                     {
                                     tn[0].innerHTML =  tn[0].innerHTML; 
                                     }
                                     }  
// debug ----->        alert("mdata2: " + bs[0].innerHTML);
                                },
                          true);

function isInDB(s)
{
    var found="0";
    var sc = 'http://192.168.1.104/songdbcheck/songdbcheck.php?sn=';
		GM_xmlhttpRequest({method:'GET', url: sc + s,
			onload:function(results) {
			if (results.responseText.indexOf("0") == -1) 
			{
				found="1";
        var tn=document.getElementById("now-playing").getElementsByClassName("trackName txt-uppercase");
        if (tn[0].innerHTML.substring(0,1) != "*"){
           tn[0].innerHTML = "*" + tn[0].innerHTML; 
         }
			} 
			}
   });
  
   if (found=="1") 
   { 
   	return true;
  }
  else 
  	{
  	return false;
  }

}
