// ==UserScript==
// @name       		OGame:FavoriteCoordinates
// @version   		0.8.9b
// @namespace       http://userscripts.org/scripts/show/162780
// @updateURL 		http://userscripts.org/scripts/source/162780.meta.js
// @downloadURL 	https://userscripts.org/scripts/source/162780.user.js
// @include    		http://*.ogame.*/game/index.php?*page=*
// @copyright  		2012+, mazzay
// ==/UserScript==

(function (window, undefined) { 
    var w =(typeof unsafeWindow != undefined) ? unsafeWindow :  window;
    var $ = jQuery = w.jQuery;
    if (w.self != w.top ) { return; }
    if ( !$ ){ return; }
    
    var document = w.document;
    var localStorage = w.localStorage;
    var url = document.location.href;
    
    var colors = ["white", "green", "red", "blue"];
    var colors_bg = ["none", "#222D1D", "#2D1D1D", "#1D1D2D"];
    var types = ["empty", "marked", "prey", "bunker"];
    
    var CSS = '';
    CSS += 'a.OGAicon, a.OGAicon:hover  {';
    CSS += 'display: block;';
    CSS += 'float: left;';
    CSS += 'width: 16px;';
    CSS += 'margin-right: 1px;';
    CSS += 'margin-top: 1px;';
    CSS += 'margin-bottom: 1px;';
    CSS += 'line-height: 16px;';
    CSS += 'font-weight: bold;';
    CSS += 'text-align: center;';
    CSS += 'text-decoration: none !important;';
    CSS += 'color: #FFFFFF;';
    CSS += 'background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAADlJREFUOE9jYLcKYcjrnPefHAzSS7ZmmIWjBsz7PwjCoGnO+v+UYAZKNIP0jhpAjTAAZUlyYwKkFwBL+Kez49LIAgAAAABJRU5ErkJggg%3D%3D);';
    CSS += '}';
    CSS += '.OGATable_coords table{width: 100%; border:1px solid red;}';
    CSS += '.OGATable_coords th{background-color: #23282D; color:  #6F9FC8;}';
    CSS += '.ui-dialog .ui-dialog-buttonpane.OGA_dialog-buttonpane {background-color: #000000; margin:0;}';
    CSS += '.OGA_textarea{ width: 500px; }';
    CSS += '#galaxy #galaxytable td.position{ text-align: center; }';

    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = CSS;
    document.head.appendChild(css);
    
    // StoreObject
    var localObj;
    localObj = JSON.parse(  localStorage.getItem( prefix()));
    if (localObj == null) {
        localObj = {};
        localObj.isCollapsed = true;
        localObj.Marks = [];
    }
    
    var objMark = function(x, y, z, type) {
        this.coords = x+':'+y+':'+z;
        this.x = x;
        this.y = y;
        this.z = z; 
        this.type = type;
    }
    
    function appendMark(mark) {
        var length = localObj.Marks.length, element = null, isNew = true;
        
        for (var i = 0; i < length; i++) {
            element = localObj.Marks[i];
            if (mark.coords == element.coords) { isNew = false; }
        }
        
        if (isNew == true) {
            localObj.Marks.push(mark);
            localStorage.setItem(prefix(), JSON.stringify(localObj));
        } 
    }
    
    function removeMark(mark) {
        var position = $.inArray( mark, localObj.Marks );
        if ( ~position ) {
            localObj.Marks.splice(position, 1);
            localStorage.setItem(prefix(), JSON.stringify(localObj));
        }
    }
    
    // == main ==
    w.$(document).ajaxSuccess(ajaxGalaxy);
    createHeader();
    createTable();
    
    // == Galaxy marks ==
    function ajaxGalaxy(event, XMLHttpRequest, ajaxOptions) {
        if (ajaxOptions.url.indexOf("page=galaxyContent") > -1) {
            process_Galaxy();
        }
    }
    
    function prefix() {
        var tag = "OGA_COORDS";
        var uni = getMetaContent("ogame-universe");
        var pid = getMetaContent("ogame-player-id");
        return tag + '_' + uni + '_' + pid + '_';
    }
    
    function timeTravelTo(x1, y1, z1) {
        
        var curplanet = getMetaContent('ogame-planet-coordinates');
        var curplanetArr = curplanet.split(':');
        return timeTravelSec(x1, y1, z1, curplanetArr[0], curplanetArr[1], curplanetArr[2], 1, 100);
    }
    
    function timeTravelSec(x1, y1, z1, x2, y2, z2, speed, speedpercent) {
        var result = 0;
        if (x1 != x2) { //galaxy 
            var dx = Math.abs(x1 - x2);
            var result = 10 + Math.sqrt(35000 / speedpercent * (((dx) * 20000000) / speed) );
        } else {  
            if (y1 != y2) {//system
                var dy = Math.abs(y1 - y2);
                var result = 10 + Math.sqrt(35000 / speedpercent * ((2700000 + (dy) * 95000) / speed) );
            } else {  //inside
                var dz = Math.abs(z1 - z2);
                var result = 10 + Math.sqrt(35000 / speedpercent * ((1000000 + (dz) * 5000) / speed) );
            }
        } 
        return result;
    }
    
    function getState(x, y, z) {
        var result = -1;
        $.each(localObj.Marks, function(i, b) {  
            if (b.x==x&&b.y==y&&b.z==z){
                result = b.type;
                return;
            }
        });
        
        return result;
    }
    
    function process_Galaxy() {
        
        var galaxytable = document.getElementById("galaxytable");
        var data_galaxy = galaxytable.getAttribute('data-galaxy');
        var data_system = galaxytable.getAttribute('data-system');
        
        var rowCount = document.getElementsByClassName('row').length;
        var rows = document.getElementsByClassName('row');      
        
        for (var i = 0 ; i < rowCount ; i++)
        {    
            var	position = rows[i].getElementsByClassName('position')[0];
            var planeticon = rows[i].getElementsByClassName('microplanet')[0];
            var isEmpty = hasClass(planeticon, "planetEmpty");
            var data_position = position.innerHTML;
   
            var colorIndex = getState(data_galaxy, data_system, data_position);
            if (colorIndex > -1)
            { 
                var	posElement = document.createElement('span'); 
                posElement.setAttribute('style', 'text-align:center');
                var posElementInner = "<b>[" + position.innerHTML + "]</b>";
                posElement.setAttribute('style', 'color:'+ colors[colorIndex]);
                posElement.setAttribute("class", "posElement" + data_position);
                posElement.innerHTML = posElementInner;
                position.innerHTML = "";
                position.appendChild(posElement);
            }
            //    position.addEventListener('click', function(Element, x, y, z) { return function() { onClick(x, y, z) }}(position, data_galaxy, data_system, data_position));
        }
    }
    
    function createHeader()
    {
        var root = document.getElementById('links');
        var header = document.createElement("div");
        header.setAttribute('style', 'background: #23282D; border: 1px solid black; min-height: 18px; overflow: visible; width: 100%;');
        header.innerHTML = "<table style='width:100%'><tr><th><span class='btn1'></span><span class='btn2'></span><span class='btn3'></span></th><th><span class='btn6'></span></th></tr><table>";
        root.appendChild(header);
        
        var importElement = $('<span/>').text(' imp ').click(function() { ImportDialog(); });
        var exportElement = $('<span/>').text(' exp ').click(function() { ExportDialog(); });
        var appendElement = $('<a/>').attr('href','javascript:void(0)').addClass("OGAicon").text('+').click(function() { AppendDialog(); });
        var resizer = $('<span/>').addClass("OGAicon").text('^').attr('id', "resizer" ).click(function () {
            var elem   = $('#OGA_coordstable'); 
            localObj.isCollapsed = ( elem.is(':visible') ) ? true : false;
            localStorage.setItem(prefix(), JSON.stringify(localObj));
            elem.slideToggle('slow');
        });
        
        $('span.btn1').first().replaceWith(appendElement);
        $('span.btn2').first().replaceWith(exportElement);
        $('span.btn3').first().replaceWith(importElement);
        $('span.btn6').first().replaceWith(resizer);
    }
    
    function createTable()
    {
        function compare(a,b) {
            if (a.time == b.time) {
                if (a.x == b.x){        
                    if (a.y == b.y){   
                        if (a.z == b.z){
                            return 0;
                        } else{ return (a.z > b.z) ? 1 : -1; } 
                    } else{ return (a.y > b.y) ? 1 : -1; } 
                } else{ return (a.x > b.x) ? 1 : -1; } 
            } else { return (a.time > b.time) ? 1 : -1; }
            return 0;
        }
        
        var isShown = (localObj.isCollapsed) ? 'none' : 'block';
        $("#OGA_coordstable").remove();
        
        var root = document.getElementById('links');
        var table = document.createElement("table");
        table.className = "OGATable_coords";
        
        var DataArray =  localObj.Marks;
        var rows = [];
        
        for (var j = 0, length = DataArray.length; j < length; j++){
            var mark = DataArray[j], x = mark.x, y = mark.y, z = mark.z;
            var timeT = timeTravelTo(x, y, z);
            
            var showElement = '<a href="javascript:showGalaxy('+x+','+y+','+z+')" >['+x+':'+y+':'+z+']</a>';
            var attackElement = '<a href="index.php?page=fleet1&galaxy='+x+'&system='+y+'&position='+z+'&type=1&mission=1" class="OGAicon">A</a>';
            var scanElement = $('<a/>').attr('href', 'javascript:void(0)').addClass("OGAicon").addClass("mark_x"+x+'y'+y+'z'+z).text('S').click(function(xx, yy, zz) { return function() { sendShipz(6, xx, yy, zz, 1, 1, w.miniFleetToken); } }(x, y, z));
            var delElement = $('<a/>').attr('href', 'javascript:void(0)').addClass("icon icon_trash").click(function(m) { return function() { if (confirm("question_sure")) { removeMark(m); createTable();} } }(mark));
            var markElement = $('<a/>').attr('href', 'javascript:void(0)').addClass("OGAicon").text('M').click(function(m) { return function() {  m.type = (m.type >= types.length - 1) ? 0 : ++m.type; localStorage.setItem(prefix(), JSON.stringify(localObj));  createTable(); } }(mark));
            
            markElement.css('color', colors[mark.type]);
            
            var rowElmnt = document.createElement('tr');
            rowElmnt.setAttribute('style', 'background: '+colors_bg[mark.type]+';border: 1px solid black;');
            var row = '';
            row += '<td class="Dbtn" align="right"></td>';
            row += '<td style="width: 100%;">'+ showElement + '</td>';
            row += '<td >'+ '' + '</td>';
            
            row += '<td class="Mbtn" align="right"></td>';
            row += '<td class="Abtn" align="right">'+ attackElement + '</td>';
            row += '<td class="Sbtn" align="right"></td>';
            rowElmnt.innerHTML = row;
            $(rowElmnt).find('.Sbtn').first().append(scanElement);
            $(rowElmnt).find('.Dbtn').first().append(delElement);
            $(rowElmnt).find('.Mbtn').first().append(markElement);
            
            var rowItem = {time: timeT, x: parseInt(x), y: parseInt(y), z: parseInt(z), element: rowElmnt};
            
            rows.push(rowItem);
        }
        
        rows.sort(compare);
        rows.forEach(function(e) {  table.appendChild( e.element ); });
        
        var div = document.createElement("div");
        div.setAttribute('id', 'OGA_coordstable');
        div.setAttribute('style', 'background: #0D1014; display:'+isShown+'; border: 1px solid black; min-height: 50px; overflow: visible;  width: 100%;'/* overflow:scroll; height:280px;width:100%;overflow:auto'*/);
        // console.log(isShown);
        div.appendChild(table);
        root.appendChild(div);
    }
    
    function sendShipz(j,k,l,g,q,p,t){
        
        /*  function d(a) {
        w.shipsendingDone = 1;
        }
        w.displayMessage = typeof(w.displayMessage) == 'undefined' ? d : w.displayMessage;
        w.shipsendingDone = typeof(w.shipsendingDone) == 'undefined' ? 1 : w.shipsendingDone;
        w.sendShips(6, xx, yy, zz, 1, 1);
        */
        /// OR
        
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
        var posEl = document.getElementsByClassName('mark_x'+x+'y'+y+'z'+z)[0];
        if (result == true) {
            posEl.setAttribute('style','color: #00FF00 !important;');
        } else {
            posEl.setAttribute('style','color: #FF0000 !important;');
        }
    }
    
    
    function hasClass(el, cssClass) {
        return el.className && new RegExp("(^|\\s)" + cssClass + "(\\s|$)").test(el.className);
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
    
    var dialog_export = document.createElement("div");
    dialog_export.setAttribute('id', 'OGA_dialog_export');
    dialog_export.setAttribute('title', 'Export dialog');
    dialog_export.setAttribute('style', 'display:none');
    dialog_export.innerHTML = "<p></p><div class='areaWrap'><textarea class='OGA_textarea'></textarea></div>"
    $('body').append(dialog_export);
    
    var dialog_import = document.createElement("div");
    dialog_import.setAttribute('id', 'OGA_dialog_import');
    dialog_import.setAttribute('title', 'Import Dialog');
    dialog_import.setAttribute('style', 'display:none');
    dialog_import.innerHTML = "<p></p><div class='areaWrap'><textarea class='OGA_textarea'></textarea></div>"
    $('body').append(dialog_import);
    
    function ExportDialog() {
        var expVal = JSON.stringify(localObj);
        
        $( "#OGA_dialog_export" ).dialog({
            position: 'center',
            width:'auto',
            height: 'auto',
            resizable: false,
            buttons: {
                Close: function() {
                    $( this ).dialog( "close" );
                }
            },
            create:function () {
                $( this ).closest(".ui-dialog").find(".OGA_textarea").first().markItUp({nameSpace: "text",  markupSet:  []});
                $( this ).closest(".ui-dialog").find(".ui-dialog-buttonpane").addClass("OGA_dialog-buttonpane"); 
            },
            open: function( event, ui ) {
                $( this ).closest(".ui-dialog").find(".OGA_textarea").val(expVal);     
            }
        });
        
    }
    
    function ImportDialog() {
        $( "#OGA_dialog_import" ).dialog({
            position: 'center',
            width:'auto',
            height: 'auto',
            resizable: false,
            buttons: {
                Cancel: function() {
                    $( this ).dialog( "close" );
                },
                Ok: function() {
                    var importString = $( this ).closest(".ui-dialog").find(".OGA_textarea").val();
                    if (importString)
                    {
                        var obj = JSON.parse(importString);
                        if(typeof obj == 'object' ){
                            if (obj.hasOwnProperty("Marks")) {
                                var isValid = false; 
                                for (var j = 0, length = obj.Marks.length; j < length; j++){
                                    var mark = obj.Marks[j];
                                    var isOk = mark.hasOwnProperty("type")&&mark.hasOwnProperty("coords")&&mark.hasOwnProperty("x")&&mark.hasOwnProperty("y")&& mark.hasOwnProperty("z");
                                    if (!isOk) {
                                        isValid = false; 
                                        break;
                                    }
                                    isValid = true;
                                    
                                    //      console.log(isValid);
                                }
                                if (isValid) {
                                    localObj = obj;
                                    localStorage.setItem(prefix(), JSON.stringify(localObj));
                                    createTable();
                                }
                            }
                        }
                    }
                    $( this ).dialog( "close" );
                }
            },
            create:function () {
                $( this ).closest(".ui-dialog").find(".OGA_textarea").first().markItUp({nameSpace: "text",  markupSet:  []});
                $(this).closest(".ui-dialog").find(".ui-dialog-buttonpane").addClass("OGA_dialog-buttonpane"); 
            },
            open: function( event, ui ) {
                $( this ).closest(".ui-dialog").find("#OGA_textarea_impexp").val("");
            }
        });
    }
    
    function AppendDialog() {   
        var retVal = w.prompt("AppendDialog : ", "");
        if (retVal) {
            var appendString = retVal.replace(/[\D]/g,' ').trim().split(' ');
            
            if (appendString.length == 3 ) {
                var obj = new objMark(appendString[0], appendString[1], appendString[2], 0);
                appendMark(obj);
                createTable();
            }
        }
    }
    
})(window);
