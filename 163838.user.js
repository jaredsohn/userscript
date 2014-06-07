// ==UserScript==
// @name        OGame: Todas las clasificaciones en un tooltip
// @description OGame: Todas las clasificaciones en un tooltip que aparece al posar el mouse sobre la opción "Clasiciaciones" en el menú. (Requiere cerrar sesión y volver a iniciar para que haga la primera carga de datos)
// @namespace   sidney-clasificacion_en_tooltip
// @include     http://*.ogame.*/game/index.php?page=*
// @downloadURL https://userscripts.org/scripts/source/163838.user.js
// @updateURL   http://userscripts.org/scripts/source/163838.meta.js 
// @version     1.3
// @require     http://userscripts.org/scripts/source/118453.user.js
// ==/UserScript==

window.addEventListener("load", function(e) {
  
  if((typeof(oGameVersionCheck) != "undefined")) {
  	oGameVersionCheck('Todas las clasificaciones en un tooltip','5.6.99.99','http://userscripts.org/scripts/show/163838');
  }
  
  function getMetaContent(mn){
    var m = document.getElementsByTagName('meta');
    for(var i in m){
     if(m[i].name == mn){
       return m[i].content;
     }
    }
    return "";
  }  

  function formatNumber(num) {
      return ("" + num).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, function($1) { return $1 + "." });
  }

  function getData(_universe, _playerID, _type){
    
    GM_xmlhttpRequest({
      method: "POST",
      url: "http://" + _universe + "/api/highscore.xml?category=1&type=" + _type,  /*  "http://" + universe + "/api/highscore.xml?category=1&type=0"  */
      data: "category=1&type=" + _type,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      
      onload: function(response) {
          if (response.responseText.indexOf(_playerID) > -1) {
            var top = response.responseText.split('id="' + _playerID + '"')[0];
                top = parseInt(top.substring(top.lastIndexOf('<player position="') + 18));
            var puntaje = response.responseText.split('id="' + _playerID + '"')[1];
                puntaje = (puntaje.split('score="')[1]).split('"')[0];
            var clasificacion = formatNumber(top) + ' (' + formatNumber(puntaje) + ')';
            
            if(_type == 3){
              var naves = response.responseText.split('id="' + _playerID + '"')[1];
                  naves = formatNumber((naves.split('ships="')[1]).split('"')[0]);
            }
            
            var key = _universe + _type;
            var keyShips = _universe + 'ships';
            setTimeout((function(){
                GM_setValue(key, clasificacion);
                GM_setValue('timestamp', new Date().toLocaleTimeString());
                if(_type == 3){
                  GM_setValue(keyShips, naves);
                }
                updateData(universe);
            }),0);
          }    
      }
    });  

  }
  
  function updateData(_universe) {
    var timestamp = GM_getValue('timestamp');
    
    var html =  "<u>General</u>:               "+ GM_getValue(_universe + '0')    +"<br />"+
                "<u>Economía</u>:              "+ GM_getValue(_universe + '1')    +"<br />"+
                "<u>Investigación</u>:         "+ GM_getValue(_universe + '2')    +"<br />"+
                "<u>Militar</u>:               "+ GM_getValue(_universe + '3')    +"<br />"+
                "- <u>Naves</u>:               "+ GM_getValue(_universe + 'ships')+"<br />"+
                "- <u>Militar Construidos</u>: "+ GM_getValue(_universe + '5')    +"<br />"+
                "- <u>Militar Destruidos</u>:  "+ GM_getValue(_universe + '6')    +"<br />"+
                "- <u>Militar Perdidos</u>:    "+ GM_getValue(_universe + '4')    +"<br />"+
                "<u>Honor</u>:                 "+ GM_getValue(_universe + '7')    +"<br /><br />" +
                "Actualizado: " + timestamp;
    
    document.getElementById('bar').innerHTML = (document.getElementById('bar').innerHTML).replace('index.php?page=highscore"', 'index.php?page=highscore" title="'+ html +'" class="tooltipCustom" style="color: lime !important;"');        
  }
  
  var playerID = getMetaContent("ogame-player-id"); 
  var universe = getMetaContent("ogame-universe");

  updateData(universe);

  if (document.location.href.indexOf ("/game/index.php?page=overview") > 0 || document.location.href.indexOf ("/game/index.php?page=highscore") > 0){
    for (var i=0;i<=7;i++){
      getData(universe, playerID, i);
    }
  }

}, false); 