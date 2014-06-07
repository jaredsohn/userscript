// ==UserScript==
// @id             DS - Korridor Subscript
// @name           DS - Korridor Subscript
// @version        1
// @namespace      Landor Caeyran
// @author         Landor Caeyran
// @description    
// @include        http://de*.die-staemme.de/game.php*screen=map*
// @include        http://*beta.tribalwars.net/game.php*screen=map*
// ==/UserScript==



(function() {

  var start = new Date().getTime();
  var win = typeof(unsafeWindow) != "undefined" ? unsafeWindow : window;
  win.ScriptAPI.register( 'DS - Korridor', 8.2, 'Landor Caeyran', 'landor-caeyran@gmx.de' );
  
var Map = {
  init : function() { 
    Map.twmap = win.TWMap;
    setInterval(Map.watchMap,500);
  },
  createMapTopokorridorOverlay : function(canvas,sector) {
    Map.korridores = win.korridores;
    Map.korridorLines = win.korridorLines;
    Map.playerPlaces = win.playerPlaces;
    Map.players = win.players;
    Map.playerNames = win.playerNames;
        
    //Korridore
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.save();    
    
    ctx.lineWidth = 3;
    for( var i = 0; i < Map.korridores.length; i++ ) {
      ctx.strokeStyle = Map.korridores[i].color;
      var x = (Map.korridores[i].x - sector.x) * 5 + 0.5;
      var y = (Map.korridores[i].y - sector.y) * 5 + 0.5;
      ctx.beginPath();
      ctx.moveTo(x+Map.korridorLines[Map.korridores[i].korridor][0]*5,y+Map.korridorLines[Map.korridores[i].korridor][1]*5);
      for( var j = 2; j < Map.korridorLines[Map.korridores[i].korridor].length; j += 2) {
        ctx.lineTo(x+Map.korridorLines[Map.korridores[i].korridor][j]*5,y+Map.korridorLines[Map.korridores[i].korridor][j+1]*5);
        ctx.fillStyle = "orange";
        ctx.fillText(Map.korridores[i].text, x+Map.korridorLines[Map.korridores[i].korridor][j]*5, (y+Map.korridorLines[Map.korridores[i].korridor][j+1]*5));        
      };
      ctx.closePath();
      ctx.stroke();
    }	
    ctx.restore();
    
    ctx.lineWidth = 1;	
    for( var i = 0; i < Map.players.length; i++ ) {
      //Spielergebiete
      ctx.strokeStyle = Map.players[i].colorStroke;
      ctx.fillStyle = Map.players[i].colorPlayer;
    
      var x = (Map.players[i].x - sector.x) * 5 + 0.5;
      var y = (Map.players[i].y - sector.y) * 5 + 0.5;
      ctx.beginPath();
      ctx.moveTo(x+Map.playerPlaces[Map.players[i].player][0]*5,y+Map.playerPlaces[Map.players[i].player][1]*5);
      for( var j = 2; j < Map.playerPlaces[Map.players[i].player].length; j += 2) {
        ctx.lineTo(x+Map.playerPlaces[Map.players[i].player][j]*5,y+Map.playerPlaces[Map.players[i].player][j+1]*5);
      };
      ctx.fill(); 
      ctx.closePath();
      ctx.restore();		

      //Spielernamen
      ctx.beginPath();
      ctx.shadowColor = "#440a0a";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#0a0a0a";  
      ctx.font = "bold 15px sans-serif"; 
      ctx.textAlign = "center"; 
      ctx.textBaseline = "middle";	      
      ctx.fillText(Map.players[i].text, x+Map.playerNames[Map.players[i].player][0]*5, y+Map.playerNames[Map.players[i].player][1]*5);
      for( var j = 2; j < Map.playerNames[Map.players[i].player].length; j += 2) {
        ctx.fillText(Map.players[i].text, x+Map.playerNames[Map.players[i].player][j]*5, y+Map.playerNames[Map.players[i].player][j+1]*5);
      };
      ctx.fill(); 
      ctx.closePath();
      ctx.restore();
    };
  },
  updateOverlays : function() {
    for( var key in Map.twmap.minimap._visibleSectors ) {
      var sector = Map.twmap.minimap._visibleSectors[key];
      var el = $("LC_korridor_minimap_canvas_"+key);
      if( ! el ) {
        var canvas = ce("canvas");
        canvas.style.position = "absolute";
        canvas.width = "500";
        canvas.height = "500";
        canvas.style.zIndex = 1;
        canvas.className = "LC_korridor_minimap_canvas";
        canvas.id = "LC_korridor_minimap_canvas_"+key;
        Map.createMapTopokorridorOverlay(canvas,sector);
        sector.appendElement(canvas);
      }
    };  
  },
  watchMap : function() {
    var x = Map.twmap.map.pos[0];
    var y = Map.twmap.map.pos[1];
    if( !Map.twmap.scrolling && (Map.mopX != x || Map.mopY != y) ) {
      Map.updateOverlays();
      Map.mopX = x;
      Map.mopY = y;
    }
  },
};

run();
function run() {
  Map.init();
};


function $(id) {
  return document.getElementById(id);
};
function ce(name) {
  return document.createElement(name);
};

})();
