// ==UserScript==
// @name        OGame: Variación del TOP en galaxia
// @description En la vista de galaxia, muestra si el jugador subió o bajó posiciones desde la ultima vez que visitaste su sistema solar.
// @include     http://*.ogame.gameforge.com/game/index.php?page=galaxy*
// @namespace   variacion-top-galaxia
// @downloadURL https://userscripts.org/scripts/source/161962.user.js
// @updateURL   http://userscripts.org/scripts/source/161962.meta.js 
// @version     1.7
// @date        2013-12-04
// @require     http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==

if((typeof(oGameVersionCheck) != "undefined")) {
	oGameVersionCheck('Variación del TOP en galaxia','5.6.99.99','http://userscripts.org/scripts/show/161962');
}

function getGalaxy() {
    if (document.getElementById('galaxytable') != null && document.getElementById('divgalaxydata') == null) {
            
        var info = document.getElementById("colonized");
        info.innerHTML = info.innerHTML + '&nbsp;|&nbsp;'
        var button = document.createElement('span');
        button.className = 'tooltip';
        button.appendChild(document.createTextNode( 'Reiniciar clasificación (' + GM_getValue("date") + ')' ));
        button.title = "Click para reiniciar todas las clasificaciones (inclusive otros sistemas solares)";
        button.onclick = function() {
                              var keys = GM_listValues();
                              for (var i=0, key=null; key=keys[i]; i++) {
                                GM_deleteValue(key);
                              }
                              var dt = new Date().toLocaleDateString();
                              GM_setValue("date", dt);
                              alert('Variaciones reiniciadas');
                         };
        button.style.cursor ="pointer";
        info.appendChild(button);
        
        var link = document.createElement("div");
        link.id = "divgalaxydata";
        document.getElementById('galaxytable').getElementsByTagName('tr')[18].appendChild(link);
        
        if (document.getElementById('galaxytable').getElementsByClassName('bdaySlot')[0] != undefined) {
            var i = 5;
        } else {
            var i = 4;
        }
        
        var id;
        
        var players = eval(GM_getValue("players"));
        if( players == 'undefined' || players == null) { 
          players = new Object();
        }
        
        while (i < 19) {
            var idDiv  = document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByTagName('td')[7];
            var idRank = document.getElementById('galaxytable').getElementsByTagName('tr')[i].getElementsByTagName('td')[8];

            if (idDiv.innerHTML.indexOf('<div id="player') > -1) {
                var id = (idDiv.innerHTML.split('<div id="player'))[1].split('"');
                if (id[0] != "") {
                   id = id[0];
                   var rank = (document.getElementById('player'+id)
                                .getElementsByTagName('li')[0]
                                  .getElementsByTagName('a')[0]).innerHTML;

                    if(isNaN(rank)){
                      rank = 0;
                    }  
                    
                    if(players[id] == 'undefined' || players[id] == null) { 
                      players[id] = rank;
                    }

                   var variation = rank - players[id];

                   var span = document.createElement('span');
                   span.appendChild(document.createTextNode( variation ));
                   span.title = "Click para reiniciar la clasificación de este jugador";
                   span.className = 'tooltip';
                   span.id = id;
                   
                   span.onclick = function() { 
                      this.innerHTML = '0';
                      var players = eval(GM_getValue("players"));
                      if( players == 'undefined' || players == null) { 
                        players = new Object();
                      }
                      players[this.id] = null;
                      GM_setValue("players", players.toSource() ); 
                      this.style.color ="lime"; 
                      alert('La variación de TOP del jugador fue reiniciada');
                   };
                   
                   span.style.cursor ="pointer";
                     
                   if( variation < 0) {
                     span.style.color ="red";
                   } else { 
                     span.style.color ="lime";
                   }
                    
                   var player = document.getElementById('player'+id[0]);
                   idRank.appendChild(span);
                }
            }
            i = i + 1;
        }
        
        GM_setValue("players", players.toSource() );

    }
}

setInterval(getGalaxy, 1000);