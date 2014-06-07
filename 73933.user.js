// ==UserScript==
// @name           Infolink-Script
// @namespace      http://www.die-staemme.de
// @description    Macht Aktenlinks in der Dorf-,Spieler-, und Stammesinfo.
// @include        http://*.die-staemme.de/*game.php*
// @exclude        http://forum.die-staemme.de/*
// ==/UserScript==


/*******PREMIUM ACCOUNT ÜBERPRÜFEN*******/

var prem, notes, head_id, head_a;
head_id = document.getElementById('menu_row');
head_a = head_id.getElementsByTagName('a');
if (head_a[head_a.length - 2].innerHTML != 'Notizen') {  
  prem = GM_getValue('PA');  
  if (prem != 'false') {
    alert('Das "Infolink-Script" kann leider nur mit einem Premium Account benutzt werden. Um dieses Script nutzen zu können kaufen Sie sich bitte einen Premium Account.');
    GM_setValue('PA', 'false');
  }
} else {

  
/*******GAME_DATA AUSLESEN*******/  
  
  if (typeof(unsafeWindow) != 'undefined') {
	  game_data = unsafeWindow.game_data;
  } else {
  	var script = document.createElement("script");
  	script.type = "application/javascript";
  	script.textContent = 	"var input=document.createElement('input');" + 
  							"input.type='hidden';" + 
  							"input.value=JSON.encode(game_data);"  + 
  							"input.id='game_data';" + 
  							"document.body.appendChild(input);";
	  document.body.appendChild(script);
  	document.body.removeChild(script);
  	
  	eval("game_data=" + document.getElementById("game_data").value + ";");
  }
  
/*******WICHTIGE VARIABLEN SETZEN*******/
  
  var info, id, world, market, serv;
  info = game_data['screen']; 
  id = document.location.search.match(/id=(\d+)/)[1];
  world = game_data['world'];
  market = game_data['market'];
  serv = world.split(market);

/*******LINKS SETZEN*******/ 
  
  var vis, plus, stats, real, webtool, tr, ltr; 
  vis = document.getElementsByClassName('vis');

  switch (info) {
    case "info_village": //Links bei Dorfinfo,
      tr = vis[0].getElementsByTagName('tr');
      ltr = tr.length - 1;
      input = tr[ltr].getElementsByTagName('input');
      if (input[0]) {
        stats = vis[0].insertRow(tr.length - 1);
        plus = vis[0].insertRow(tr.length - 1);
        webtool = vis[0].insertRow(tr.length - 1);
      } else {
        stats = vis[0].insertRow(-1);
        plus = vis[0].insertRow(-1);
        webtool = vis[0].insertRow(-1)
      }
      plus.innerHTML = '<td colspan="2"><a href="http://' + world + '.twplus.org/file/village/' + id + '/" target="_blank">» - Dorfakte</a> (TW Plus)</td>';
      stats.innerHTML = '<td colspan="2"><a href="http://de.twstats.com/' + world + '/index.php?page=village&id=' + id + '" target="_blank">» - Dorfakte</a> (TW Stats)</td>';
      break;
    case "info_player": //Spielerinfo
      stats = vis[0].getElementsByTagName('tr');
      stats[stats.length - 1].innerHTML = '<td colspan="2"><a href="http://www.twstats.com/in/' + world + '/player/' + id + '" target="_blank">» - Spielerakte</a> (TW Stats)</td>';
      plus = vis[0].insertRow(-1);
      plus.innerHTML = '<td colspan="2"><a href="http://' + world + '.twplus.org/file/player/' + id + '/" target="_blank">» - Spielerakte</a> (TW Plus)</td>';
      real = vis[0].insertRow(-1);
      real.innerHTML = '<td colspan="2"><a href="http://www.dsreal.de/index.php?tool=akte&mode=player&world=' + world + '&id=' + id + '" target="_blank">» - Spielerakte</a> (DS Real)</td>';
      if (serv[1] < 55) {
        webtool = vis[0].insertRow(-1);
        webtool.innerHTML = '<td colspan="2"><a href="http://de.my-webtool.com/games/die-staemme/' + world + '/users/' + id + '" target="_blank">» - Spielerakte</a> (myWebtool)</td>';
      }
      break;
    case "info_ally":   //und Stammesinfo setzen.
      stats = vis[0].getElementsByTagName('tr');
      stats[stats.length - 2].innerHTML = '<td colspan="2"><a href="http://www.twstats.com/in/' + world + '/tribe/' + id + '" target="_blank">» - Stammesakte</a> (TW Stats)</td>';
      plus = vis[0].insertRow(stats.length - 1);
      plus.innerHTML = '<td colspan="2"><a href="http://' + world + '.twplus.org/file/ally/' + id + '/" target="_blank">» - Stammesakte</a> (TW Plus)</td>';
      real = vis[0].insertRow(stats.length - 1);
      real.innerHTML = '<td colspan="2"><a href="http://www.dsreal.de/index.php?tool=akte&mode=ally&world=' + world + '&id=' + id + '" target="_blank">» - Stammesakte</a> (DS Real)</td>';
      if (serv[1] < 55) {
        webtool = vis[0].insertRow(tr.length - 1);
        webtool.innerHTML = '<td colspan="2"><a href="http://de.my-webtool.com/games/die-staemme/' + world + '/allies/' + id + '" target="_blank">» - Stammesakte</a> (myWebtool)</td>';
      }
      break;
  }
}

