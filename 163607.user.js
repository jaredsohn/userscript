// ==UserScript==
// @name       OGame:SpioSaver
// @namespace  http://userscripts.org/scripts/show/163607
// @version    0.1
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
    
    var zeroDate = new Date(0);
    var url = document.location.href;
    
    
    var CSS = '';
    CSS += '.OGATabButton {color: #848484;}';
    CSS += '.OGATabButton .aktiv {color: #f1f1f1;}';
    CSS += '.OGATable_br td { padding: 0 !important;}';
    CSS += '.OGATable_br th {background-color: #23282D; color:  #6F9FC8;}';
    CSS += 'a.espionage.OGA > span {background-position:0 -528px;!important;}';
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
    
    if (localObj.TECH === undefined || $.isEmptyObject(localObj.TECH)) {
        
        try { if (console) console.log('load: /game/index.php?page=techtree&tab=3'); } catch(e) {}
        ready = false;
        $.get('index.php?page=techtree&tab=3',function(xml){
            //GM_log(xml);
            localObj.TECH = {
                A109:	 [$.trim($(xml).find('.item > a[href$="techID=109"]').text())],									// waffentechnik
                A110:	 [$.trim($(xml).find('.item > a[href$="techID=110"]').text())],									// schildtechnik
                A111:	 [$.trim($(xml).find('.item > a[href$="techID=111"]').text())],									// raumschiffpanzerung
                A115:	 [$.trim($(xml).find('.item > a[href$="techID=115"]').text())],									// verbrennungstriebwerk
                A117:	 [$.trim($(xml).find('.item > a[href$="techID=117"]').text())],									// impulstriebwerk
                A118:	 [$.trim($(xml).find('.item > a[href$="techID=118"]').text())],									// hyperraumantrieb
                A124:	 [$.trim($(xml).find('.item > a[href$="techID=124"]').text())],									// astrophysik
                A202:	 [$.trim($(xml).find('.item > a[href$="techID=202"]').text()),2000,2000,0,'f',5000],			// kleiner transporter
                A203:	 [$.trim($(xml).find('.item > a[href$="techID=203"]').text()),6000,6000,0,'f',25000],			// großer transporter
                A204:	 [$.trim($(xml).find('.item > a[href$="techID=204"]').text()),3000,1000,0,'f',50],				// leichter jaeger
                A205:	 [$.trim($(xml).find('.item > a[href$="techID=205"]').text()),6000,4000,0,'f',100],				// schwerer jaeger
                A206:	 [$.trim($(xml).find('.item > a[href$="techID=206"]').text()),20000,7000,2000,'f',800],			// kreuzer
                A207:	 [$.trim($(xml).find('.item > a[href$="techID=207"]').text()),45000,15000,0,'f',1500],			// schlachtschiff
                A208:	 [$.trim($(xml).find('.item > a[href$="techID=208"]').text()),10000,20000,10000,'f',7500],		// kolonieschiff
                A209:	 [$.trim($(xml).find('.item > a[href$="techID=209"]').text()),10000,6000,2000,'f',20000],		// recycler
                A210:	 [$.trim($(xml).find('.item > a[href$="techID=210"]').text()),0,1000,0,'f'],					// spionagesonde
                A211:	 [$.trim($(xml).find('.item > a[href$="techID=211"]').text()),50000,25000,15000,'f',500],		// bomber
                A212:	 [$.trim($(xml).find('.item > a[href$="techID=212"]').text()),0,2000,500,'f'],					// solarsatellit
                A213:	 [$.trim($(xml).find('.item > a[href$="techID=213"]').text()),60000,50000,15000,'f',2000],		// zerstoerer
                A214:	 [$.trim($(xml).find('.item > a[href$="techID=214"]').text()),5000000,4000000,1000000,'f',1000000],	// todesstern
                A215:	 [$.trim($(xml).find('.item > a[href$="techID=215"]').text()),30000,40000,15000,'f',750],		// schlachtkreuzer
                A502:	 [$.trim($(xml).find('.item > a[href$="techID=502"]').text())],									// abfangrakete
                A503:	 [$.trim($(xml).find('.item > a[href$="techID=503"]').text())],									// interplanetarrakete
                A401:	 [$.trim($(xml).find('.item > a[href$="techID=401"]').text()),2000,0,0,'d',20],					// raketenwerfer
                A402:	 [$.trim($(xml).find('.item > a[href$="techID=402"]').text()),1500,500,0,'d',20],				// leichtes laserfeschuetz
                A403:	 [$.trim($(xml).find('.item > a[href$="techID=403"]').text()),6000,2000,0,'d',80],				// schweres lasergeschuetz
                A404:	 [$.trim($(xml).find('.item > a[href$="techID=404"]').text()),20000,15000,2000,'d',350],		// gaußkanone
                A405:	 [$.trim($(xml).find('.item > a[href$="techID=405"]').text()),2000,6000,0,'d',80],				// ionengeschuetz
                A406:	 [$.trim($(xml).find('.item > a[href$="techID=406"]').text()),50000,50000,30000,'d',1000],		// plasmawerfer
                A407:	 [$.trim($(xml).find('.item > a[href$="techID=407"]').text()),10000,10000,0,'d',200],			// kleine schildkuppel
                A408:	 [$.trim($(xml).find('.item > a[href$="techID=408"]').text()),50000,50000,0,'d',1000]			// große schildkuppel
            }; 
        }).complete(function(){
            setTimeout(function(){ setValue(prefix(), localObj); }, 0);
        });
    }
    
    // == main ==
    w.$(document).ajaxSuccess(ajaxTest);
    
    
    if (url.indexOf('page=messages') >= 0)
    {
        appendMessageTab();
    }
    
    function ajaxTest(event, XMLHttpRequest, ajaxOptions) {
        console.log(ajaxOptions.url, ajaxOptions.type, event, XMLHttpRequest, ajaxOptions);
        // alarm('wtf');
        if (ajaxOptions.url.indexOf("page=showmessage&ajax=1&msg_id") >= 0 && ajaxOptions.type == 'GET'){
            var cat = getParameterByName(ajaxOptions.url, 'cat');
            if ( cat == 7 ){
                var msg = $('div.showmessage');
                var msg_id = msg.attr( 'data-message-id' );
                parceSpioReport(msg_id, msg);
            }
        }
        
        if (ajaxOptions.url.indexOf("page=messages") >= 0 && ajaxOptions.type == 'POST'){
            var msgs = $('tr[id^="spioDetails_"]');
            if (msgs.size() > 0) {
                msgs.each(function(i){
                    var msg_id = $(this).attr('id').replace(/spioDetails_/,'');
                    parceSpioReport(msg_id, this);
                });
            }   
        }
        
        if (ajaxOptions.url.indexOf("page=galaxyContent&ajax=1") >= 0 && ajaxOptions.type == 'POST'){
            galaxySpio();
        }
        
    }
    
    
    function loadXMLDoc(playername)
    {
        var xmlhttp;
        var idd = -1;
        xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function()
        {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
            {
                var xmlDoc = xmlhttp.responseXML;
                var plr = xmlDoc.getElementsByName(playername)[0];
                idd = plr.getAttribute('id');
            }
        }
        xmlhttp.open("GET","/api/players.xml", false);
        xmlhttp.send();
        return idd
    }
    
    function prefix() {
        var tag = "OGA_SPIO";
        var uni = getMetaContent("ogame-universe");
        var pid = getMetaContent("ogame-player-id");
        return tag + '_' + uni + '_' + pid + '_';
    }
    
    //==============helpers
    function getParameterByName(url, name)
    {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        if(results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
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
    
    function formatNumber(value, format){
        if (format === undefined) format = 'long';
        var parts = /([+-]*)([\d]+)([\.,\d]*)/.exec( (value) ? value.toString() : '' );
        if (parts && parts.length === 4) {
            if (format == 'long') {
                return parts[1] + parts[2].split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('') + parts[3];
            } else if (format == 'normal') {
                return value;
            } else if (format == 'short') {
                var v = parseInt(parts[2],10);
                var abk = '';
                if (parts[2].length > 7) {
                    v = Math.ceil(v / 1000000);
                    abk = ' M';
                } else if (parts[2].length > 4) {
                    v = Math.ceil(v / 1000);
                    abk = ' k';
                }
                parts[2] = '' + v;
                return parts[1] + parts[2].split('').reverse().join('').match(/.{1,3}/g).join('.').split('').reverse().join('') + abk;
            }
        }
        return '0';
    };
    
    function setValue(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
        //  GM_setValue(key, JSON.stringify(value));
    }
    
    // GM getValue erweiterung mit JSON
    function getValue(key, def) {
        var value = localStorage.getItem(key);
        if (value === undefined) return def;
        return JSON.parse(value);
    } 
    
    function toLocaleFormat(date, format) {
        var tmpdate = new Date(date)
        var f = {y : tmpdate.getFullYear(), m : tmpdate.getMonth() + 1,d : tmpdate.getDate(),H : tmpdate.getHours(),M : tmpdate.getMinutes(),S : tmpdate.getSeconds()}
        for(var k in f) 
            format = format.replace('%' + k, f[k] < 10 ? "0" + f[k] : f[k]);
        return format;
    };
    
    function hasClass(el, cssClass) {
        return el.className && new RegExp("(^|\\s)" + cssClass + "(\\s|$)").test(el.className);
    }
    /*=========================================================================================================*/
    
    
    function parceSpioReport(msg_id, spioreport)
    {
        try{
            
            var msg = $(spioreport).find('.read.messagebox div.note, div#showSpyReportsNow'); //popup and in messages
            
            if (msg.length > 0) {
                
                var MSG = document.getElementById('TR'+msg_id);
                var date = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec( MSG.getElementsByClassName('date')[0].innerHTML );
                var target = /\[(\d+:\d+:\d+)\].*?<span.*>(\w+)<\/span>/.exec(msg.find ('table.material tr:eq(0) th').html());
                
                var rc = new Object();
                rc.ID = msg_id;	
                rc.DATE = new Date(date[3], parseInt(date[2])-1, date[1], date[4], date[5], date[6]).toJSON();
                rc.COORDS = target[1];
                
                var apiPlyrId = loadXMLDoc(target[2]);
                if (apiPlyrId == -1) return;
                rc.PLAYERID = apiPlyrId;
                rc.PLAYERNAME = target[2];
                
                rc.R1 = parseInt(msg.find('table.material table td:eq(1)').html().replace(/\./g,''));	// metall
                rc.R2 = parseInt(msg.find('table.material table td:eq(3)').html().replace(/\./g,''));	// kristall
                rc.R3 = parseInt(msg.find('table.material table td:eq(5)').html().replace(/\./g,''));	// deuterium
                rc.R4 = parseInt(msg.find('table.material table td:eq(7)').html().replace(/\./g,''));	// energie
                rc.FDB = msg.find('table.fleetdefbuildings').length;									// anzahl abschnitte (fleet, defence, buildings, research)
                rc.FLEETLIST = new Array();
                rc.DEFENCELIST = new Array();
                
                msg.find('table.fleetdefbuildings.spy td[class="key"]').each(function(){
                    var key = $.trim($(this).text());
                    var value = parseInt($(this).next().text().replace(/\./g,''),10);
                    
                    for (var item in localObj.TECH) {
                        if (localObj.TECH[item][0] == key) {
                            if (localObj.TECH[item].length > 1) {
                                if (localObj.TECH[item][4] == 'f') {
                                    rc.FLEETLIST.push([item, value]);
                                } else if (localObj.TECH[item][4] == 'd') {
                                    rc.DEFENCELIST.push([item, value]);
                                }
                            }
                        }
                    }
                });
                
                appendReport(rc);
                
            }
        } catch(e) {  GM_log(e.message ); };
    }
    
    function appendReport(report)
    {
        
        /*   var playerObj = new Object();
        playerObj.PLAYERID = 0;
        playerObj.PLAYERNAME = 0;
        playerObj.PLAYERSTATUS = 0;
        playerObj.PLAYERALLIANCE = 0;
        playerObj.TECHLIST = new Array();*/
        
        var length = localObj.PLANETS.length,
            element = null,
            isNew = true,
            index = -1;
        
        for (var i = 0; i < length; i++) {
            element = localObj.PLANETS[i];
            if (report.COORDS == element.COORDS)
            {
                isNew = false;
                if (report.PLAYERID == element.PLAYERID) //update
                {
                    GM_log(report.ID+" UPDATE_TRY "+report.COORDS +' '+ report.FDB +" date old "+ element.DATELASTSCAN_RES +" date new "+ report.DATE)
                    if (report.FDB >= 0 && new Date(element.DATELASTSCAN_RES) < new Date(report.DATE))
                    {
                        GM_log(report.ID+" UPDATE_RES "+report.COORDS +" date old " +element.DATELASTSCAN_RES  +" date new " +report.DATE )
                        element.DATELASTSCAN_RES = report.DATE; 
                        element.RESOURCELIST = [report.R1, report.R2, report.R3, report.R4];
                    }
                    if (report.FDB >= 1 && new Date(element.DATELASTSCAN_FLE) < new Date(report.DATE))
                    {    
                        GM_log(report.ID+" UPDATE_FLE "+report.COORDS +" date old " +element.DATELASTSCAN_FLE  +" date new " +report.DATE )
                        element.DATELASTSCAN_FLE = report.DATE; 
                        element.FLEETLIST = report.FLEETLIST;
                    }    
                    if (report.FDB >= 2 && new Date(element.DATELASTSCAN_DEF) < new Date(report.DATE))
                    {          
                        GM_log(report.ID+" UPDATE_DEF "+report.COORDS +" date old " +element.DATELASTSCAN_DEF  +" date new " +report.DATE )
                        element.DATELASTSCAN_DEF = report.DATE;
                        element.DEFENCELIST = report.DEFENCELIST;
                    }
                    
                    localStorage.setItem(prefix(), JSON.stringify(localObj));
                    break;
                } else { 
                    GM_log(report.ID+" RECREATE "+report.COORDS)
                    //remove  full update
                    removePlanet(element); 
                    isNew = true;
                    break;
                }
            }
            //not found create new
        }
        
        
        if (isNew == true)
        {
            
            var planetObj = new Object();
            planetObj.COORDS = '0:0:0';
            planetObj.PLAYERID = 0;
            planetObj.DATELASTSCAN_RES = zeroDate; 
            planetObj.DATELASTSCAN_FLE = zeroDate; 
            planetObj.DATELASTSCAN_DEF = zeroDate;
            planetObj.DATELASTSCAN_BLD = zeroDate; 
            planetObj.DATELASTSCAN_TEC = zeroDate; 
            planetObj.RESOURCELIST = new Array();
            planetObj.FLEETLIST = new Array();
            planetObj.DEFENCELIST = new Array();
            planetObj.BLDGLIST = new Array();
            
            
            GM_log(report.ID+" NEW "+report.COORDS+' '+report.FDB);
            GM_log(planetObj);
            if (report.FDB >= 0)
            {
                planetObj.COORDS = report.COORDS;
                planetObj.PLAYERID = report.PLAYERID;
                planetObj.DATELASTSCAN_RES = report.DATE; 
                planetObj.RESOURCELIST = [report.R1, report.R2, report.R3, report.R4];
            }
            if (report.FDB >= 1)
            {    
                planetObj.DATELASTSCAN_FLE = report.DATE; 
                planetObj.FLEETLIST = report.FLEETLIST;
                
            }    
            if (report.FDB >= 2)
            {          
                planetObj.DATELASTSCAN_DEF = report.DATE;
                planetObj.DEFENCELIST = report.DEFENCELIST;
            }
            //  GM_log(planetObj);
            localObj.PLANETS.push(planetObj);
            localStorage.setItem(prefix(), JSON.stringify(localObj));
        }  
    }
    
    function removePlanet(report)
    {
        position = localObj.PLANETS.indexOf(report);
        if ( ~position )
        {
            localObj.PLANETS.splice(position, 1);
            localStorage.setItem(prefix(), JSON.stringify(localObj));
        }
    }
    
    function getPlanet(pos)
    {
        var length = localObj.PLANETS.length,
            element = null;
        
        for (var i = 0; i < length; i++) {
            element = localObj.PLANETS[i];
            //  GM_log(pos+' '+element.COORDS);
            if (element.COORDS == pos) {
                GM_log(pos+' == '+element.COORDS);
                return element;
            }
        }
        
    } 
    /**************************************************** GUI***************************************************** */ 
    
    
    function appendMessageTab()
    {
        var	Element = document.createElement('li'); 
        Element.className = 'msgNavi OGATabButton';
        var ElementInner =  "SReports";
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
    }
    
    
    function createTable(parent)
    {
        var DataArray =  localObj.PLANETS;
        
        var table = document.createElement('table');
        table.className = 'OGATable_br';
        
        for (var j = 0, length = DataArray.length; j < length; j++){
            
            var report = DataArray[j];
            
            var row = document.createElement('tr');
            var outhtml='';
            outhtml+="<td>"+report.COORDS+"</td>";
            outhtml+="<td>"+report.PLAYERID+"</td>";
            
            outhtml+="<td>"+toLocaleFormat(report.DATELASTSCAN_RES, "%H:%M:%S")+"</td>";
            outhtml+="<td>"+report.RESOURCELIST.length+"</td>";
            
            outhtml+="<td>"+toLocaleFormat(report.DATELASTSCAN_FLE, "%H:%M:%S")+"</td>";
            outhtml+="<td>"+report.FLEETLIST.length+"</td>";
            
            outhtml+="<td>"+toLocaleFormat(report.DATELASTSCAN_DEF, "%H:%M:%S")+"</td>";
            outhtml+="<td>"+report.DEFENCELIST.length+"</td>";
            
            row.innerHTML=outhtml;
            
            table.appendChild(row);
        }
        
        parent.appendChild(table);
    }
    
    function galaxySpio()
    {
        function getAge(dateDate, nowDate)
        {
            var ageInMilliseconds = nowDate.getTime() - dateDate.getTime();
            var ageDays = Math.floor(ageInMilliseconds / 86400000);
            var ageHours = Math.floor(ageInMilliseconds / 3600000) - (ageDays * 24);
            var ageMinutes = Math.floor(ageInMilliseconds / 60000) - (ageDays * 1440) - (ageHours * 60);
            var ageSeconds = Math.floor(ageInMilliseconds / 1000) - (ageDays * 86400) - (ageHours * 3600) - (ageMinutes * 60);
            var AGE = '';		
            if (ageDays > 0) AGE += ageDays + 'd ';
            if (ageHours > 0) AGE += ageHours + 'h ';
            if (ageMinutes > 0) AGE += ageMinutes + 'm ';
            if (ageSeconds > 0) AGE += ageSeconds + 's';
            return AGE;
        }
        
        var galaxytable = document.getElementById("galaxytable");
        var data_galaxy = galaxytable.getAttribute('data-galaxy');
        var data_system = galaxytable.getAttribute('data-system');
        
        var rowCount = document.getElementsByClassName('row').length;
        var rows = document.getElementsByClassName('row');   
        
        var ogameClock = /([0-9]+)\.([0-9]+)\.([0-9]+)\s([0-9]+):([0-9]+):([0-9]+)/.exec($('.OGameClock').html().replace(/<span>/g,'').replace(/<\/span>/g,''));
        var ogameClockDate = new Date(ogameClock[3],parseInt(ogameClock[2])-1,ogameClock[1],ogameClock[4],ogameClock[5],ogameClock[6]);
        
        
        for (var i = 0 ; i < rowCount ; i++)
        {

            var planeticon = rows[i].getElementsByClassName('microplanet')[0];
            var isEmpty = hasClass(planeticon, "planetEmpty");
            if (isEmpty) continue; 
            var	position = i+1;
            var planet = getPlanet(data_galaxy+':'+data_system+':'+position);
            //   GM_log(data_galaxy+':'+data_system+':'+position);
            if (planet != undefined)
            {
                
                var elementInner = '<div class="htmlTooltip"><h1>Espionage</h1><div class="splitLine"></div><table cellpadding="0" cellspacing="0" class="fleetinfo">';
                elementInner += "<tr><th>Resources: </th><th>" + " [" + getAge(new Date(planet.DATELASTSCAN_RES), ogameClockDate)+"]" + "</th></tr>";
                elementInner += "<tr><td>m:</td><td>" + planet.RESOURCELIST[0] +"</td></tr>";
                elementInner += "<tr><td>c:</td><td>" + planet.RESOURCELIST[1] +"</td></tr>";
                elementInner += "<tr><td>d:</td><td>" + planet.RESOURCELIST[2] +"</td></tr>";
                
                if ( new Date(planet.DATELASTSCAN_FLE).getTime() !=  zeroDate.getTime())
                {
                    if ( planet.FLEETLIST.length >  0 )
                    {  
                        elementInner += "<tr><th> Fleet: </th><th>" +" ["+getAge(new Date(planet.DATELASTSCAN_FLE), ogameClockDate)+"]" + "</th></tr>";
                        for (var item in planet.FLEETLIST) {
                            var key = planet.FLEETLIST[item][0];
                            var keyName = localObj.TECH[key][0];
                            var value = planet.FLEETLIST[item][1];
                            elementInner += "<tr><td>"+keyName +": "+"</td><td>"+ value +"</td></tr>";
                        }
                    }
                    else {
                        elementInner += "<tr><th> Fleet: </th><th>" + " ["+getAge(new Date(planet.DATELASTSCAN_FLE), ogameClockDate)+"]" + "</th></tr>";
                        elementInner += "<tr><td colspan='2'>nothing" +"</td></tr>";
                    }
                }else{ //nodata
                    elementInner += "<tr><th> Fleet: </th><th> NO DATA" + "</th></tr>";
                }
                
                if (new Date(planet.DATELASTSCAN_DEF).getTime() != zeroDate.getTime())
                {
                    if ( planet.DEFENCELIST.length >  0 )
                    {  
                        elementInner += "<tr><th> Defence: </th><th>" + " ["+getAge(new Date(planet.DATELASTSCAN_DEF), ogameClockDate)+"]" + "</th></tr>";
                        for (var item in planet.DEFENCELIST) {
                            var key = planet.DEFENCELIST[item][0];
                            var keyName = localObj.TECH[key][0];
                            var value = planet.DEFENCELIST[item][1];
                            elementInner += "<tr><td>"+keyName +": "+"</td><td>"+  value +"</td></tr>";
                        }
                    }
                    else {
                        elementInner += "<tr><th> Defence: </th><th>" + " ["+getAge(new Date(planet.DATELASTSCAN_DEF), ogameClockDate)+"]" + "</th></tr>";
                        elementInner += "<tr><td colspan='2'>nothing" +"</td></tr>";
                    }
                }else{ //nodata
                    elementInner += "<tr><th> Defence: </th><th> NO DATA" + "</th></tr>";
                }

                var action =  $(rows[i]).find('a.espionage');
                
                if (action.length == 0 )
                {
                    var span =  $(rows[i]).find('td.action span:first')[0];
                    action = $("<a/>").addClass("espionage icon").attr('title',"");
                    $(span).append(action);
                }
                
                $(action).replaceWith($(action).attr('title',elementInner).addClass('OGAicon tooltipHTML OGA'));
                
            }
        }
    }
    
    
})(window);
