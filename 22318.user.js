// Neopets - Favourites in the Games Room
// by nungryscpro (nungryscpro@yahoo.com)
//
// ==UserScript==
// @name           Neopets - Favourites in the Games Room
// @namespace      http://userscripts.org/users/22349
// @description    V 1.01 - Places your favorite games in the games room beneath the games search
// @include        http://www.neopets.com/games/arcade.phtml*
// @include        http://neopets.com/games/arcade.phtml*
// @version        1.01
// @updated        2009.05.27 
// ==/UserScript==
//

(function(){
  thisDiv = document.getElementById('top_300');
  favsmod = document.createElement('div');
  favsmod.innerHTML = '<div id="favs_dl" style="display: none;"></div><div class="rcModuleWrapper gamesRoomDarkModule"> \
<div class="rcModuleHeader"><div class="rcModuleTopLeft"></div><div class="rcModuleTopRight"></div> \
<div class="rcModuleHeaderBg"></div><div class="rcModuleHeaderOuter"><div class="rcModuleHeaderContent"> \
<a href="favorites.phtml"><div style="width: 100%;">Favourite Games</div></a></div> \
<a class="moreLink" href="favorites.phtml"><b><span class="pointer">»</span></b></a></div></div> \
<div class="rcModuleContentOuter"><div class="rcModuleContent"><div class="rcModuleContentInner" id="dafavs" style="height:245px;"> \
<div style="text-align:center;"><br><br><br><img src="http://images.neopets.com/pound/pound_load_anim.gif" \
title="Loading..." width="150" height="150" ></div></div></div></div><div class="rcModuleBottom"><div class="rcModuleBottomLeft"></div> \
<div class="rcModuleBottomRight"></div></div></div>';
	thisDiv.parentNode.insertBefore(favsmod, thisDiv);	
  thisDiv.parentNode.removeChild(thisDiv);

  GM_xmlhttpRequest({
    method: 'GET',url: 'http://www.neopets.com/games/favorites.phtml',
    headers: {
      'User-agent': 'Mozilla/4.0 (compatible)',
      'Accept': 'application/atom+xml,application/xml,text/xml',
      'Referer': 'http://www.neopets.com/games/arcade.phtml',
    },
    onload: function(responseDetails){
      favtext = responseDetails.responseText;
      if (favtext.match('remove_id')){
        favtext = favtext.split('<td class="content">')[1];
        favtext = favtext.split('<CENTER>')[1].split('</CENTER>')[0];
        favs_dl = document.getElementById('favs_dl');
        favs_dl.innerHTML = favtext;

        image = favtext.match(/_(\d+)\.gif/g);
        divtext = '<div style="text-align:center; height:238px; overflow:auto;"><center>\
<table border="0" cellspacing="0" cellpadding="1"><tbody>';
        whichtd = "0"
        for (var m = 0; m < image.length; m++){
          fgi = image[m].replace(/(_)|(\.gif)/g, '');
          fgt = favs_dl.getElementsByTagName('table')[m+1].getElementsByTagName('td')[0].textContent;
          fgp = favs_dl.getElementsByTagName('table')[m+1].getElementsByTagName('td')[1].innerHTML.split('<br>')[0];

          if (whichtd == "0"){divtext += '<tr>';}
          divtext += '<td><table style="border-style:solid; border-width:1px; padding:3px; \
margin-right:4px; width:128px;';
          if (m > 1){divtext += ' margin-top:2px;';} 
          divtext+= '"><tbody<tr><td><a href="/games/play.phtml?game_id='+fgi+'"><img \
src="http://images.neopets.com/games/clicktoplay/tm_'+fgi+'.gif" title="'+fgt+'"style=\
"border: 1px solid rgb(0, 0, 0); margin-right: 4px;" align="left" border="0" height="60" \
width="60"></a> <div style="text-align:center;">'+fgp+'<br><span class="medText">plays<br>\
today</span></div></td></tr></tbody></table></td>';
          if (image.length == 1){divtext += '<td width="128"> </td></tr>';}
          else if (m == image.length-1 && whichtd == "0"){divtext += '<td> </td></tr>';} 
          else if (whichtd == "1"){
            divtext += '</tr>';
            whichtd = "0";
          }
          else {whichtd = "1";}
        }
        divtext += '</tbody></table></center></div>';
        document.getElementById('dafavs').innerHTML = divtext;
      }
      else {
        document.getElementById('dafavs').innerHTML = '<div style="text-align:center;"><b \
style="color: rgb(255, 0, 0);">There are no games in your favourites list!</b></div>';
      }
    }
  });
})();