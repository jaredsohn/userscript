// ==UserScript==
// @name       OGame:GalaxyMap
// @namespace  http://userscripts.org/scripts/show/163652
// @version    0.1.1
// @description  enter something useful
// @include    http://*.ogame.*/game/index.php?*page=*
// @copyright  2012+, mazzay
// ==/UserScript==


(function (window, undefined) {  // нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    if (w.self != w.top) {
        return;
    }  
    
    var $ = jQuery = w.jQuery;
    if ( !$ ) return;
    
    var document = w.document;
    var localStorage = w.localStorage;
    
    var url = document.location.href;
    
    var indexedDB = w.indexedDB || w.webkitIndexedDB || w.mozIndexedDB || w.msIndexedDB;
    var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
    
    
    var CSS = '';
    CSS += '.OGATabButton {color: #848484;}';
    CSS += '.OGATabButton .aktiv {color: #f1f1f1;}';
    CSS += '.OGATable_gmap {border:1px solid red; width:100px; }';
    CSS += '.OGATable_gmap .system {width:5px; height:5px; background-color: #23FF2D;}';
    CSS += '.OGATable_gmap .planet {width:5px; height:5px; background-color: #FF282D;}';
    CSS += '.OGATable_gmap td { padding: 0 !important;}';
    CSS += '.OGATable_gmap th {background-color: #23282D; color:  #6F9FC8;}';
    CSS += 'a.espionage.OGA > span {background-position:0 -528px;!important;}';
    
    CSS += 'table.grid, table.zgrid { border-spacing:0 !important; padding:0 !important;  border: none;  width: 100% !important;  }';
    CSS += '.grid .row{ padding:0 !important;  }';
    CSS += '.gridsys  { border: 1px solid black; padding:0 !important; }';
    CSS += '.gridpos  { width:8px !important; height:8px !important; padding:0 !important; background-color: #14191F; }';
    
    CSS += '.gridpos.exists {background-color: #3C4147 }';
    CSS += '.gridpos.exists.a {background-color: #E37000 }';
    CSS += '.gridpos.exists.null {background-color: #052D12 }';
    CSS += '.gridpos.exists.v {background-color: #14191F }';
    CSS += '.gridpos.exists.vI {background-color: #14191F }';
    CSS += '.gridpos.exists.vIb {background-color: #14191F }';
    CSS += '.gridpos.exists.vib {background-color: #14191F }';
    CSS += '.gridpos.exists.I {background-color: #78CC02 }';
    CSS += '.gridpos.exists.i {background-color: #78CC02 }';
    CSS += '.gridpos.exists.fail {background-color: #FFFFFF }';
    CSS += '.gridpos.exists.newbie {background-color: #0000FF }';
    
    CSS += '.gridpos.null {background-color: #3CCC47 }';
    CSS += ' td.gridpos:hover { background-color: #40FF48; }';
    CSS += ' td.gridpos.exists:hover { background-color: #40FF48; }';
    
    var css = document.createElement("style");
    
    
    css.type = "text/css";
    css.innerHTML = CSS;
    document.head.appendChild(css);
    
    var localObj;
    
    localObj = JSON.parse(  localStorage.getItem( prefix()));
    if (localObj == null)
    {
        localObj = {};
        localObj.PLAYERS = {}; // id name  //planets[] //raitings[] ships // techs[]
        localObj.PLANETS = []; // id coord isMoon playerId  Defence[]
        localObj.FLEET = {}; // planetId  playerId  Fleet[]
        localObj.TECH = {};
    }
    
    if (url.indexOf('page=messages') >= 0)
    {
        appendMessageTab();
    }
    
    function prefix() {
        
        
        var tag = "OGA_GMAP";
        var uni = getMetaContent("ogame-universe");
        var pid = getMetaContent("ogame-player-id");
        return tag + '_' + uni + '_' + pid + '_';
    }
    
    function getMetaContent(name) { 
        var metas = document.getElementsByTagName('meta'); 
        for (i=0; i<metas.length; i++) { 
            if (metas[i].getAttribute("name") == name) { 
                return metas[i].getAttribute("content"); 
            } 
        } 
        return "";
    } 
    
    function loadXMLDoc()
    {
        var xmlhttp;
        var planetsmap = new Object();
        var playersmap = new Object();
        
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                var xmlDoc = xmlhttp.responseXML;
                var players = xmlDoc.getElementsByTagName('player');
                
                for (var i = 0, length = players.length; i < length; i++) {
                    
                    var id = players[i].getAttribute('id');
                    var namep = players[i].getAttribute('name');
                    var status = players[i].getAttribute('status');
                    
                    playersmap[id] = [namep, status]
                }
            }
        }
        xmlhttp.open("GET","/api/players.xml", false);
        xmlhttp.send();
        
        
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                var xmlDoc = xmlhttp.responseXML;
                var planets = xmlDoc.getElementsByTagName('planet');
                
                for (var i = 0, length = planets.length; i < length; i++) {
                    
                    var coords =  planets[i].getAttribute('coords');
                    var name =  planets[i].getAttribute('name');
                    var playerid =  planets[i].getAttribute('player');
                    var pl = playersmap[playerid];
                    var status = 'fail';
                    if (pl == undefined)
                    {
                        //newbie there old deleted
                        // GM_log(pl+' newbie '+playerid);
                        status = "newbie";
                        continue;
                        
                    }else{
                        //  GM_log(pl+' '+playersmap[playerid][1]);
                        // var status = typeof(playersmap[playerid][1]) == 'undefined' ? 'none' : playersmap[playerid][1];
                        status = playersmap[playerid][1];// (typeof playersmap[playerid][1] === 'undefined') ? 'none' : playersmap[playerid][1];
                    }
                    updateGMap(coords, name, status);
                }
            }
            
        }
        xmlhttp.open("GET","/api/universe.xml", false);
        xmlhttp.send();
        
        /*  GM_log(planets.length);
        GM_log(players.length);
        for (var i = 0, length = planets.length; i < length; i++) {
        
        var coords =  planets[i].getAttribute('coords');
        var name =  planets[i].getAttribute('name');
        var playerid =  planets[i].getAttribute('player');
        GM_log(coords+' '+ playerid);
        for (var j = 0, plength = players.length; j < plength; j++) {
        var id =  planets[j].getAttribute('id');
        var namep =  planets[j].getAttribute('name');
        var status =  planets[j].getAttribute('status');
        
        if (id == playerid)
        {
        GM_log(coords+' '+ name+' '+ status);
        //  updateGMap(coords, name, status);
        //  break;
        }
        
        }
        
        }
        */
        
        //  http://uni670.ogame.org/api/players.xml - Updateinterval 1 day
        //	http://uni670.ogame.org/api/universe.xml - Updateinterval 1 week
        // return idd
    }
    
    
    function updateGMap(coords , name, status )
    {
        var CoordArr = coords.split(':');
        var planet = document.getElementById('x'+CoordArr[0]+'y'+CoordArr[1]+'z'+CoordArr[2]);
        if (planet != null){
            planet.className += " tooltip" + " exists" + " "+status;
            planet.setAttribute('title', coords+'<BR>'+name);
            planet.addEventListener('dblclick', function(){
                
               // alert(status);
                // this.style.background = 'green';
                sendShipz(6, CoordArr[0], CoordArr[1], CoordArr[2], 1, 1, w.miniFleetToken);
                
            }, false);
        }else{
            //skip another galaxy
            //  GM_log(coords +' '+planet);
        }
    }
    
    function appendMessageTab()
    {
        var	Element = document.createElement('li'); 
        Element.className = 'msgNavi OGATabButton';
        var ElementInner =  "GMap";
        Element.innerHTML = ElementInner;
        Element.addEventListener('click', function(e) { return function() {showContent(e); }}(Element));
        
        var tabbar = document.getElementById('tab-msg');
        tabbar.appendChild(Element);
        
    }
    
    function showContent(e)
    {
        //activate tab button
        var tabbar = document.getElementById('tab-msg');
        var li = tabbar.getElementsByTagName('li');
        for (var i = 0, length = li.length; i < length; i++) {
            li[i].className = 'msgNavi'; 
        }
        
        e.className = 'msgNavi aktiv OGATabButton';
        
        var content = document.getElementById('messageContent');
        content.innerHTML='';
        
        createTable(content);
        
        loadXMLDoc();
    }
    
    function createTable(parent)
    {
        // genDivs(22);
        genTabls(22);
        function genDivs(v){ 
            var e = document.createElement('div');
            for(var i = 0; i < v; i++){ 
                var row = document.createElement("div"); 
                row.className = "row"; 
                for(var x = 1; x <= v; x++){ 
                    var cell = document.createElement("div"); 
                    cell.className = "gridsquare"; 
                    cell.innerText = (i * v) + x;
                    row.appendChild(cell); 
                } 
                e.appendChild(row); 
            } 
            document.getElementById("messageContent").appendChild(e);
            
        }
        
        function genTabls(v){ 
            var e = document.createElement('table');
            e.className = "grid";
            
            var gala = getMetaContent("ogame-planet-coordinates").split(':')[0];
            
            var cols = 20;
            var rows = 25;
            var points = 4;
            for(var y = 0; y < rows; y++){ 
                var row = document.createElement("tr"); 
                row.className = "row"; 
                for(var x = 1; x <= cols; x++){ 
                    var cell = document.createElement("td"); 
                    cell.className = "gridsys"; 
                    var zt = document.createElement('table');
                    zt.className = "zgrid";
                    for(var i = 0; i < points; i++){ 
                        var zrow = document.createElement("tr"); 
                        zrow.className = "zrow";
                        for(var j = 1; j <= points; j++){ 
                            var zcell = document.createElement("td"); 
                            zcell.setAttribute("id", 'x'+gala+'y'+(x + y * cols)+'z'+(i * points + j));
                            zcell.className = "gridpos"; 
                            
                            zrow.appendChild(zcell); 
                        }
                        zt.appendChild(zrow);
                    } 
                    cell.appendChild(zt);
                    row.appendChild(cell);
                } 
                e.appendChild(row); 
            } 
            document.getElementById("messageContent").appendChild(e);
        } 
        
    }
    
    
    ////////////////////////////////////////////////
    
    function sendShipz(j,k,l,g,q,p,t){
        
        w.shipsendingDone = typeof(w.shipsendingDone) == 'undefined' ? 1 : w.shipsendingDone;
        
        if(w.shipsendingDone == 1){
            var miniFleetLink="index.php?page=minifleet&ajax=1";
            w.shipsendingDone=0;
            sendString="";
            params=new Object();
            params.mission=j;
            params.galaxy=k;
            params.system=l;
            params.position=g;
            params.type=q;
            params.shipCount=p;
            params.token=t;
            w.$.post(miniFleetLink, params, function(a)
                     {
                         w.shipsendingDone = 1;
                         w.miniFleetToken=a.newToken;
                         
                         if (a.response.success == true)
                         {
                             updateSpioStatus(k, l, g, true);
                         }else{
                             updateSpioStatus(k, l, g, false);
                         }
                     }, "json")
        }
    }
    
    function updateSpioStatus(x,y,z, result)
    {
        //  console.log(x,y,z, result);
        
        console.log("upd", x,y,z, result);
        var posEl = document.getElementById('x'+x+'y'+y+'z'+z);
        if (result == true)
        {
            posEl.setAttribute('style','background-color: #00FF00 !important;');
        }else
            posEl.setAttribute('style','background-color: #FF0000 !important;');
    }
    
    
    
})(window);
