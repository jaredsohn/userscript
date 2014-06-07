// ==UserScript==
// @name          Planets.nu map drawing
// @description   Allows marking up map with circles, lines, points, and text
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 1
// ==/UserScript==

/*------------------------------------------------------------------------------
Creates 2 new map tools:

"Draw" - Allows drawing various things on map. Once "Draw" is selected, clicks
    on the map will draw instead of accessing ships, setting waypoints etc.
    You can also use the options at top to create/rename/delete separate layers
    to organize your drawn objects. To exit "Draw" mode, click "Starmap".
    
"Layers" - Brings up a list of all the layers you have created with the "Draw"
    tool above. Each has a checkbox which can be used to show or hide that
    particular layer.
    
NOTE: "snap waypoints" under the point settings will override snapping to other
    ships' waypoints, if a click is near both.
    
(ver 0.6) fix for client vgap2.js ver 1.30
(ver 0.7) fix for using time machine
(ver 0.7) patch for changes to note color functions
(ver 0.8) fixes color selector box size
(ver 0.9) fixes new color box position issue
(ver 0.10)adds basic editing tools
(ver 0.13)update for new .nu version (3+)
------------------------------------------------------------------------------*/


function wrapper () { // wrapper for injection

vgaPlanets.prototype.setupAddOn = function (addOnName) {
        if (vgaPlanets.prototype.addOns == null) vgaPlanets.prototype.addOns = {};
        vgaPlanets.prototype.addOns[addOnName] = {};
        var settings = localStorage.getItem(addOnName + ".settings");
        if (settings != null)
            vgaPlanets.prototype.addOns[addOnName].settings = JSON.parse(settings);
        else
            vgaPlanets.prototype.addOns[addOnName].settings = {};
        vgaPlanets.prototype.addOns[addOnName].saveSettings = function () {
            localStorage.setItem(addOnName + ".settings", JSON.stringify(vgaPlanets.prototype.addOns[addOnName].settings));
        }
        vgaPlanets.prototype.addOns[addOnName].current = {};
    };
vgaPlanets.prototype.setupAddOn("vgapMapMarkUp");

// Set to -USERSCRIPT_ID to try and prevent note type collisions
vgaPlanets.prototype.addOns.vgapMapMarkUp.notetype = -133919;

// END Add-On Header

// Note Storage/Retrieval functions
vgaPlanets.prototype.saveObjectAsNote = function (id, type, obj) {
        var note = this.getNote(id, type);
        if (note == null)
            note = this.addNote(id, type);
        note.changed = 1;
        note.body = JSON.stringify(obj);
    };
    
vgaPlanets.prototype.getObjectFromNote = function (id, type) {
        var note = this.getNote(id, type);
        if (note != null && note.body != "")
            return JSON.parse(note.body);
        else
            return null;
    };

// End Note Storage/Retrieval functions


if (vgap.version < 3) {
    
    vgapMap.prototype.noteColors = ["ff0000", "ff00ff", "ffffff", "0000ff", "00ff00", "00ffff", "ffff00", "ff6600", "ffccff", "669966", "666699"];
    
    vgapMap.prototype.chooseColor = function (index) {
            $(".NoteColor").removeClass("SelectedColor");
            if (index == -1) {
                $("#NColor").addClass("SelectedColor");
                vgap.selectedColor = "";
            }
            else {
                $("#NColor" + index).addClass("SelectedColor");
                vgap.selectedColor = this.noteColors[index];
            }
        };
    
    vgaPlanets.prototype.addOns.vgapMapMarkUp.showOverlayFilter = function () {
            html = "<div id='OverlayFilter'><table>";
            for (var i=0; i<vgap.addOns.vgapMapMarkUp.overlays.length; i++) {
                var overlay = vgap.addOns.vgapMapMarkUp.overlays[i];
                html += "<tr><td><input type='checkbox' " + (overlay.active ? "checked " : "") + "onchange='vgap.addOns.vgapMapMarkUp.overlays[" + i + "].active=!vgap.addOns.vgapMapMarkUp.overlays[" + i + "].active;vgap.map.drawOverlays();'></input></td><td>" + overlay.name + "</td></tr>";
            }
            html += "</table></div>";
            //$("#PlanetsMenu").append(html);
            
            var inMore = vgap.planetScreenOpen || vgap.shipScreenOpen || vgap.starbaseScreenOpen;
            if (inMore) {
                html = "<h1>Select Layers:</h1>" + html;
                html += "<a class='MoreBack' onclick='vgap.closeMore();vgap.more.empty();return false;'>OK</a>";
                vgap.more.empty();
                $(html).appendTo(vgap.more);
    
                $("#OverlayFilter").height($(window).height() - 100);
                vgap.showMore(300);
            }
            else {
                html = "<div class='TitleBar'><div class='CloseScreen' onclick='vgap.closeLeft();vgap.lc.empty();'></div><div class='TopTitle'>Select Layers:</div></div>" + html;
                vgap.lc.empty();
                $(html).appendTo(vgap.lc);
                vgap.openLeft();
                $("#OverlayFilter").height($(window).height() - 40);
                $("#OverlayFilter").width(380);
            }
            $("#OverlayFilter").jScrollPane();        
        };
    
    vgaPlanets.prototype.addOns.vgapMapMarkUp.deleteOverlay = function (index) {
            if (index == null)
                index = vgap.addOns.vgapMapMarkUp.current.overlayid;
            vgap.addOns.vgapMapMarkUp.overlays.splice(index, 1);
            if (vgap.addOns.vgapMapMarkUp.current.overlayid == index)
                vgap.addOns.vgapMapMarkUp.current.overlayid = 0;
            vgap.saveObjectAsNote(0, vgap.addOns.vgapMapMarkUp.notetype, vgap.addOns.vgapMapMarkUp.overlays);
            vgap.map.drawOverlays();
            if ($("#OverlayFilter").length)
                vgap.addOns.vgapMapMarkUp.showOverlayFilter();
                
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.newOverlay = function () {
            vgap.addOns.vgapMapMarkUp.overlays.push({active: true, name: "New Layer", markups: []});
            vgap.addOns.vgapMapMarkUp.current.overlayid = vgap.addOns.vgapMapMarkUp.overlays.length-1;
            vgap.saveObjectAsNote(0, vgap.addOns.vgapMapMarkUp.notetype, vgap.addOns.vgapMapMarkUp.overlays);
            //vgap.map.drawOverlays();
            if ($("#OverlayFilter").length)
                vgap.addOns.vgapMapMarkUp.showOverlayFilter();
                
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.showOverlayNameEdit = function (index) {
            if (index == null)
                index = vgap.addOns.vgapMapMarkUp.current.overlayid;
            vgap.hotkeysOn = false;
            html = "<div>Layer Name: <input id='LayerNameBox' type='textbox' size='30' value='" + vgap.addOns.vgapMapMarkUp.overlays[index].name + "'></input></div>";
            $("#DrawToolsContainer").html(html);
            $("#LayerNameBox").focus().select().change( function () {
                vgap.addOns.vgapMapMarkUp.overlays[index].name = $("#LayerNameBox").val();
                vgap.hotkeysOn = true;
                vgap.saveObjectAsNote(0, vgap.addOns.vgapMapMarkUp.notetype, vgap.addOns.vgapMapMarkUp.overlays);
                vgap.addOns.vgapMapMarkUp.showDrawTools();
                if ($("#OverlayFilter").length)
                    vgap.addOns.vgapMapMarkUp.showOverlayFilter();
            });
        };
    
    vgaPlanets.prototype.addOns.vgapMapMarkUp.showDrawTools = function () {
            var addon = vgap.addOns.vgapMapMarkUp;
            if (vgap.addOns.vgapMapMarkUp.overlays.length < 1)
               vgap.addOns.vgapMapMarkUp.overlays.push( {active: true, name: "New Layer", markups: []} );
            if (vgap.addOns.vgapMapMarkUp.current.overlayid == null)
                vgap.addOns.vgapMapMarkUp.current.overlayid = 0;           
            vgap.map.conClosing = true;
            this.toolsOpen = false;
            setTimeout(function () { vgap.map.conClosing = false; }, 100);
            var margin = "-" + vgap.map.controls.height() + "px";
            vgap.map.controls.css("marginTop", margin);
            
            var current = vgap.addOns.vgapMapMarkUp.current.markup;
            if (current == null)
                var type = "circle";
            else
                var type = vgap.addOns.vgapMapMarkUp.current.markup.type;
            $("#DrawToolsContainer").remove();
            html =  "<li id='DrawToolsContainer'><div id='ToolSelector'><table>"; // style='border: 1px solid #000000;'>";
            
            html += "<td>Current Layer <select id='OverlaySelect' onchange='vgap.addOns.vgapMapMarkUp.current.overlayid=parseInt($(\"#OverlaySelect\").val());vgap.addOns.vgapMapMarkUp.showDrawTools();'>";
            var overlays = vgap.addOns.vgapMapMarkUp.overlays;
            for (i=0; i<overlays.length; i++) {
                html += "<option " + "value=" + i + " " + (i==vgap.addOns.vgapMapMarkUp.current.overlayid ? "selected" : "") +">" + i +": " + overlays[i].name + "</option>";
            }
            html += "</select></td>";
            
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.showOverlayNameEdit();'><span style='background: #666666; padding: 5px;'> Name </span></td>";
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.deleteOverlay();vgap.addOns.vgapMapMarkUp.showDrawTools();'><span style='background: #666666; padding: 5px;'> Delete Layer </span></td>";
            var overlay = overlays[addon.current.overlayid];
            if (overlay.markups != null && overlay.markups.length > 0)
                html += "<td onclick='vgap.addOns.vgapMapMarkUp.showObjectSelect(0);'><span style='background: #666666; padding: 5px;'> Edit Layer </span></td>";
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.newOverlay(); vgap.addOns.vgapMapMarkUp.showDrawTools();' ><span style='background: #666666; padding: 5px;'> New Layer </span><//td><td>";
            
            html += "<input name='drawtool' value='circle' type='radio' " + (type == "circle" ? "checked" : "") + ">Circle</input>";
            html += "<input name='drawtool' value='line' type='radio' " + (type == "line" ? "checked" : "") + ">Line</input>";
            html += "<input name='drawtool' value='point' type='radio' " + (type == "point" ? "checked" : "") + ">Point</input>";
            html += "<input name='drawtool' value='text' type='radio' " + (type == "text" ? "checked" : "") + ">Text</input>";
            
            html += "</td></table></div></li>";
            $("#PlanetsMenu").prepend(html);
            
            $("body").css("cursor", "crosshair");
            vgaPlanets.prototype.addOns.vgapMapMarkUp.isDrawMode = true;
            vgaPlanets.prototype.addOns.vgapMapMarkUp.current.markup = null;
    
            
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.showObjectSelect = function (index) {
            var addon = vgap.addOns.vgapMapMarkUp;
            var overlay = addon.overlays[addon.current.overlayid];
            
            addon.current.selectedid = index;
            vgap.map.drawOverlays();
            
            var html = "<table>"
            html += "<td>Layer " + addon.current.overlayid + ": " + overlay.name + "</td>";
            html += "<td><a class='rNavLeft' onclick='vgap.addOns.vgapMapMarkUp.showObjectSelect(" + ((index-1 + overlay.markups.length) % overlay.markups.length) + ");'></a></td>";
            html += "<td>" + (index + 1) + " / " + overlay.markups.length + "</td>";
            html += "<td><a class='rNavRight' onclick='vgap.addOns.vgapMapMarkUp.showObjectSelect(" + ((index+1) % overlay.markups.length) + ");'></a></td>";
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.editMarkup();' ><span style='background: #666666; padding: 5px;'> Edit </span><//td>";
            //html += "<td onclick='' ><span style='background: #666666; padding: 5px;'> Delete </span><//td>";
            html += "</table>";
            $("#DrawToolsContainer").html(html);    
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.editMarkup = function () {
            var addon = vgap.addOns.vgapMapMarkUp;
            var overlay = addon.overlays[addon.current.overlayid];
            var markup = overlay.markups.splice(addon.current.selectedid,1)[0];
            addon.current.markup = markup;
            addon.current.selectedid = null;
            vgap.map.drawOverlays();
            addon.showMarkupParams(markup);        
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.showMarkupParams = function (markup) {
            var html = "<table>"
            switch (markup.type) {
                case "circle":
                    html += "<td>X:</td><td><input id='Xbox' type='textbox' size='4' maxlength='4' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.x + "'></input></td>";
                    html += "<td>Y:</td><td><input id='Ybox' type='textbox' size='4' maxlength='4' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.y + "'></input></td>";
                    html += "<td>Radius:</td><td><input id='Rbox' type='textbox' size='4' maxlength='4' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.r + "'></input></td>";
                    var focusID = "#Rbox";
                    break;
                case "point":
                     html += "<td>Snap Waypoints</td><td><input id='Scheckbox' type='checkbox' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' " + (markup.snapto ? "checked" : "") + "></input></td>";               
                case "text":
                    html += "<td>X:</td><td><input id='Xbox' type='textbox' size='4' maxlength='4' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.x + "'></input></td>";
                    html += "<td>Y:</td><td><input id='Ybox' type='textbox' size='4' maxlength='4' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.y + "'></input></td>";
                    html += "<td>Text:</td><td><input id='Tbox' type='textbox' size='30' onfocus='vgap.hotkeysOn=false;' onblur='vgap.hotkeysOn=true;' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.text + "'></input></td>";
                    var focusID = "#Tbox";
                    vgap.hotkeysOn = false;
                    break;
                case "line":
                    html += "<td onclick='vgap.addOns.vgapMapMarkUp.current.markup.points.pop(); vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' ><span style='background: #666666; padding: 5px;'> Delete Last Segment </span><//td>";
                    break;
            }
            
            html += "<td><div id='NoteColorSelection' style='height: 30px;'><table>";
            /*
            html += "<div class='NoteColor";
            if (note.color == "")
                html += " SelectedColor";
            */
            //html += "' id='NColor' onclick='vgap.map.chooseColor(" + -1 + ");'></div>";
            
            for (var i = 0; i < vgap.map.noteColors.length; i++) {
                var color = vgap.map.noteColors[i];
                html += "<td><div class='NoteColor";
                if (markup.color == color)
                    html += " SelectedColor";
                html += "' id='NColor" + i + "' style='background-color:#" + color + "; width: 20px; height: 20px;' onclick='vgap.map.chooseColor(" + i + ");vgap.addOns.vgapMapMarkUp.current.markup.color=\"#\"+vgap.selectedColor;vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();'></div></td>";
            }
            html += "</table></div></td>";
            
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.showDrawTools();vgap.map.drawOverlays();'>Delete</td>";
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.saveCurrentMarkup();vgap.addOns.vgapMapMarkUp.showDrawTools();'>Save</td>";        
            html += "</table>";
            $("#DrawToolsContainer").html(html);
            if (focusID != null) {
                $(focusID).focus().select();
            }
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.updateCurrentMarkup = function () {
            var markup = vgap.addOns.vgapMapMarkUp.current.markup;
            if (markup.color == null || markup.color == "")
                markup.color = "white";
            switch (markup.type) {
                case "circle":
                    markup.x = parseInt($("#Xbox").val());
                    markup.y = parseInt($("#Ybox").val());
                    markup.r = parseInt($("#Rbox").val());
                case "line":
                    markup.attr.stroke = markup.color;
                    break;
                case "point":
                    markup.attr.stroke = markup.color;
                    markup.x = parseInt($("#Xbox").val());
                    markup.y = parseInt($("#Ybox").val());
                    markup.text = $("#Tbox").val();
                    markup.snapto = $("#Sbox").val();
                    break;
                case "text":
                    markup.attr.fill = markup.color;
                    markup.x = parseInt($("#Xbox").val());
                    markup.y = parseInt($("#Ybox").val());
                    markup.text = $("#Tbox").val();
                    break;            
            }
            vgap.map.drawOverlays();
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.saveCurrentMarkup = function () {
            var markup = vgap.addOns.vgapMapMarkUp.current.markup;
            vgap.addOns.vgapMapMarkUp.overlays[vgap.addOns.vgapMapMarkUp.current.overlayid].markups.push( markup );
            vgap.saveObjectAsNote(0, vgap.addOns.vgapMapMarkUp.notetype, vgap.addOns.vgapMapMarkUp.overlays);
        };
        
    vgapMap.prototype.drawOffsetText = function (x, y, text, dx, dy, attr, paperset) {
            if (paperset == null)
                paperset = this.canvas;
            paperset.push(this.paper.text(this.screenX(x) + dx, this.screenY(y) + dy, text).attr(attr));
        }
    
    vgapMap.prototype.drawCrosshair = function (x, y, armsize, attr, paperset) {
            if (paperset == null)
                paperset = this.canvas;
            paperset.push(this.paper.path("M" + (this.screenX(x)-armsize) + " " + this.screenY(y) + "L" + (this.screenX(x)+armsize) + " " + this.screenY(y)).attr(attr));
            paperset.push(this.paper.path("M" + this.screenX(x) + " " + (this.screenY(y)-armsize) + "L" + this.screenX(x) + " " + (this.screenY(y)+armsize)).attr(attr));
        };
        
    vgapMap.prototype.drawScaledCircle = function (x, y, radius, attr, paperset) {
            radius *= this.zoom
            if (radius <= 1)
                radius = 1;
            if (paperset == null)
                paperset = this.canvas;
            paperset.push(this.paper.circle(this.screenX(x), this.screenY(y), radius).attr(attr));
        };
        
    vgapMap.prototype.drawScaledLine = function (x1, y1, x2, y2, attr, paperset) {
            if (paperset == null)
                paperset = this.canvas;
            paperset.push(this.paper.path("M" + this.screenX(x1) + " " + this.screenY(y1) + "L" + this.screenX(x2) + " " + this.screenY(y2)).attr(attr));
        };
        
    vgapMap.prototype.drawOverlays = function () {
            var addon = vgap.addOns.vgapMapMarkUp;
            this.overlays.remove();
            this.overlays = this.paper.set(); //fix for client 1.97
            //console.log(vgap.addOns.vgapMapMarkUp.overlays.length);
            if (addon.current.selectedid != null ) {
                this.drawMarkup(addon.overlays[addon.current.overlayid].markups[addon.current.selectedid]);
            }
            else {
            
                for (var i=0; i<vgap.addOns.vgapMapMarkUp.overlays.length; i++) {
                    var overlay = vgap.addOns.vgapMapMarkUp.overlays[i];
                    //console.log(overlay.active);
                    if (overlay.active) {
                        //console.log(overlay);
                        var markups = overlay.markups;
                        for (var j=0; j<markups.length; j++) {
                            this.drawMarkup(markups[j]);
                        }
                    }
                }
                if (vgap.addOns.vgapMapMarkUp.isDrawMode && vgap.addOns.vgapMapMarkUp.current.markup != null) {
                    this.drawMarkup(vgap.addOns.vgapMapMarkUp.current.markup);
                }
            }
        };
        
    vgapMap.prototype.drawMarkup = function (markup) {
            switch (markup.type) {
                case "circle":
                    this.drawScaledCircle(markup.x, markup.y, markup.r, markup.attr, this.overlays);
                    return;
                case "line":
                    var points = markup.points;
                    if (points.length == 1) {
                        var p1 = points[0];
                        this.drawCrosshair(p1.x, p1.y, 5, markup.attr, this.overlays);
                    }
                    else {
                        for (var i=1; i<points.length; i++) {
                            var p1 = points[i-1];
                            var p2 = points[i];
                            this.drawScaledLine(p1.x, p1.y, p2.x, p2.y, markup.attr, this.overlays);
                        }
                    }
                    return;
                case "point":
                    this.drawCrosshair(markup.x, markup.y, 5, markup.attr, this.overlays);
                    this.drawOffsetText(markup.x, markup.y, markup.text, 0, 12, {fill: markup.attr.stroke}, this.overlays);
                    return;
                case "text":
                    this.drawOffsetText(markup.x, markup.y, markup.text, 0, 0, markup.attr, this.overlays);
                    return;                 
            }
        };
        
    
    var old_processLoad = vgaPlanets.prototype.processLoad; 
    vgaPlanets.prototype.processLoad = function (result) {
    
            old_processLoad.apply(this, arguments);
            
            if (result.success) {
                var overlays = this.getObjectFromNote(0, vgap.addOns.vgapMapMarkUp.notetype);
                if (overlays == null)
                    overlays = [];
                this.addOns.vgapMapMarkUp.overlays = overlays;
            }        
        };
        
    var old_loadControls = vgapMap.prototype.loadControls; 
    vgapMap.prototype.loadControls = function () {
    
            old_loadControls.apply(this, arguments);
            
            var additem = "<li onclick='vgap.addOns.vgapMapMarkUp.showDrawTools();'>Draw</li>";
            additem += "<li onclick='vgap.addOns.vgapMapMarkUp.showOverlayFilter();'>Layers</li>";
            
            //$("#MapTools").append(additem);
            $("#MapTools > li:contains('Clear (x)')").before(additem);
    
            var height = this.controls.height() - this.toolsMenu.height();
            this.controls.css("marginTop", "-" + this.controls.height() + "px");
        
        };
        
    var old_showMap = vgaPlanets.prototype.showMap; 
    vgaPlanets.prototype.showMap = function () {
    
            old_showMap.apply(this, arguments);
            
            $("#DrawToolsContainer").remove();
            vgap.addOns.vgapMapMarkUp.isDrawMode = false;
            vgap.addOns.vgapMapMarkUp.current.selectedid = null;
            vgaPlanets.prototype.addOns.vgapMapMarkUp.current.markup = null;
            vgap.map.drawOverlays();
            
        };
        
    var old_showDashboard = vgaPlanets.prototype.showDashboard; 
    vgaPlanets.prototype.showDashboard = function () {
    
            $("#DrawToolsContainer").remove();
            vgap.addOns.vgapMapMarkUp.isDrawMode = false;
            vgaPlanets.prototype.addOns.vgapMapMarkUp.current.markup = null;        
    
            old_showDashboard.apply(this, arguments);
            
        };
        
    var old_draw = vgapMap.prototype.draw; 
    vgapMap.prototype.draw = function () {
    
            old_draw.apply(this, arguments);
            
            this.drawOverlays();
            
        };
        
    var old_click = vgapMap.prototype.click; 
    vgapMap.prototype.click = function (shift) {
            
            if (vgap.addOns.vgapMapMarkUp.isDrawMode) {
                if (vgap.addOns.vgapMapMarkUp.current.markup == null)
                    var type = $("@name='drawtool':checked").val();
                else
                    var type = vgap.addOns.vgapMapMarkUp.current.markup.type; 
                switch (type) {
                    case "circle":
                        var markup = {type: type, x: this.x, y: this.y, r: 81, attr: {stroke: "white"}};
                        break;
                    case "line":
                        var markup = vgap.addOns.vgapMapMarkUp.current.markup;
                        if (markup == null)
                            var markup = {type: type, points: [{x: this.x, y: this.y}], attr: {stroke: "white"}};
                        else
                            markup.points.push({x: this.x, y: this.y});
                        break;
                    case "point":
                        var markup = {type: type, x: this.x, y: this.y, text: "", snapto: true, attr: {stroke: "white"}};
                        break;
                    case "text":
                        var markup = {type: type, x: this.x, y: this.y, text: "", attr: {fill: "white"}};
                        break;                    
                    default:
                        var markup = null;
                }
                if (markup != null) {
                    vgap.addOns.vgapMapMarkUp.current.markup = markup;
                    vgap.addOns.vgapMapMarkUp.showMarkupParams( markup );
                    this.drawOverlays();
                    //vgap.addOns.vgapMapMarkUp.overlays[0].markups.push( markup );
                    //this.drawMarkup(markup);
                    //this.drawScaledCircle(this.x, this.y, 81, {stroke: "white"}, vgap.map.overlays);
                }
            }
            else {
                old_click.apply(this, arguments);
            }
    
        };
        
    var old_load = vgapMap.prototype.load; 
    vgapMap.prototype.load = function () {      
    
            old_load.apply(this, arguments);
            
            if (this.overlays != null) this.overlays.remove();
            this.overlays = this.paper.set();
            this.drawOverlays();
    
        };
        
    var old_shipSelectorClick = vgapMap.prototype.shipSelectorClick;
    vgapMap.prototype.shipSelectorClick = function (shift) {
    
            old_shipSelectorClick.apply(this, arguments);
            
            var ship = this.activeShip;
    
            var tx = ship.targetx;
            var ty = ship.targety;
            
            var overlays = vgap.addOns.vgapMapMarkUp.overlays;
            if (ship.target == null && overlays != null) {
                //snap to MAP POINT if near one
                for (var i = 0; i < overlays.length; i++) {
                    var overlay = overlays[i];
                    if (overlay.active) {
                        for (j=0; j<overlay.markups.length; j++) {
                            var markup = overlay.markups[j];
                            if (markup.type == "point" && markup.snapto) {
                                if (this.getDist(tx, ty, markup.x, markup.y) < (10 / this.zoom)) {
                                    ship.targetx = markup.x;
                                    ship.targety = markup.y;
                                    this.draw();                  
                                    vgap.shipScreen.loadMovement();                            
                                    return;
                                }
                            }
                        }
                    }
                }
            }
            
            /*
            //reset waypoints - targetx is the first waypoint and waypoints holds additional ones.
            if (!shift || (ship.x == ship.targetx && ship.y == ship.targety)) {
                ship.targetx = tx;
                ship.targety = ty;
                ship.waypoints = new Array();
            }
            else
                ship.waypoints.push({ x: tx, y: ty });
            */
    
        };
        
}




/////////////////////////////////////////////////////////////////////////////////////
else /*NEW VERSION*/ {
/////////////////////////////////////////////////////////////////////////////////////

    vgapMap.prototype.noteColors = ["ff0000", "ff00ff", "ffffff", "0000ff", "00ff00", "00ffff", "ffff00", "ff6600", "ffccff", "669966", "666699"];
    
    vgapMap.prototype.chooseColor = function (index) {
            $(".NoteColor").removeClass("SelectedColor");
            if (index == -1) {
                $("#NColor").addClass("SelectedColor");
                vgap.selectedColor = "";
            }
            else {
                $("#NColor" + index).addClass("SelectedColor");
                vgap.selectedColor = this.noteColors[index];
            }
        };
    
    vgaPlanets.prototype.addOns.vgapMapMarkUp.showOverlayFilter = function () {
            var html = "<div id='OverlayFilter'><table>";
            for (var i=0; i<vgap.addOns.vgapMapMarkUp.overlays.length; i++) {
                var overlay = vgap.addOns.vgapMapMarkUp.overlays[i];
                html += "<tr><td><input type='checkbox' " + (overlay.active ? "checked " : "") + "onchange='vgap.addOns.vgapMapMarkUp.overlays[" + i + "].active=!vgap.addOns.vgapMapMarkUp.overlays[" + i + "].active;vgap.map.draw(); vgap.saveObjectAsNote(0, vgap.addOns.vgapMapMarkUp.notetype, vgap.addOns.vgapMapMarkUp.overlays);'></input></td><td>" + overlay.name + "</td></tr>";
            }
            html += "</table></div>";
            //$("#PlanetsMenu").append(html);
            
            var inMore = vgap.planetScreenOpen || vgap.shipScreenOpen || vgap.starbaseScreenOpen;
            if (inMore) {
                html = "<h1>Select Layers:</h1>" + html;
                html += "<a class='MoreBack' onclick='vgap.closeMore();vgap.more.empty();return false;'>OK</a>";
                vgap.more.empty();
                $(html).appendTo(vgap.more);
    
                $("#OverlayFilter").height($(window).height() - 100);
                vgap.showMore(300);
            }
            else {
                html = "<div class='TitleBar'><div class='CloseScreen' onclick='vgap.closeLeft();vgap.lc.empty();'></div><div class='TopTitle'>Select Layers:</div></div>" + html;
                vgap.lc.empty();
                $(html).appendTo(vgap.lc);
                vgap.openLeft();
                $("#OverlayFilter").height($(window).height() - 40);
                $("#OverlayFilter").width(380);
            }
            $("#OverlayFilter").jScrollPane();        
        };
    
    vgaPlanets.prototype.addOns.vgapMapMarkUp.deleteOverlay = function (index) {
            if (index == null)
                index = vgap.addOns.vgapMapMarkUp.current.overlayid;
            vgap.addOns.vgapMapMarkUp.overlays.splice(index, 1);
            if (vgap.addOns.vgapMapMarkUp.current.overlayid == index)
                vgap.addOns.vgapMapMarkUp.current.overlayid = 0;
            vgap.saveObjectAsNote(0, vgap.addOns.vgapMapMarkUp.notetype, vgap.addOns.vgapMapMarkUp.overlays);
            vgap.map.draw();
            if ($("#OverlayFilter").length)
                vgap.addOns.vgapMapMarkUp.showOverlayFilter();
                
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.newOverlay = function () {
            vgap.addOns.vgapMapMarkUp.overlays.push({active: true, name: "New Layer", markups: []});
            vgap.addOns.vgapMapMarkUp.current.overlayid = vgap.addOns.vgapMapMarkUp.overlays.length-1;
            vgap.saveObjectAsNote(0, vgap.addOns.vgapMapMarkUp.notetype, vgap.addOns.vgapMapMarkUp.overlays);
            //vgap.map.drawOverlays();
            if ($("#OverlayFilter").length)
                vgap.addOns.vgapMapMarkUp.showOverlayFilter();
                
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.showOverlayNameEdit = function (index) {
            if (index == null)
                index = vgap.addOns.vgapMapMarkUp.current.overlayid;
            vgap.hotkeysOn = false;
            var html = "<div>Layer Name: <input id='LayerNameBox' type='textbox' size='30' value='" + vgap.addOns.vgapMapMarkUp.overlays[index].name + "'></input></div>";
            $("#DrawToolsContainer").html(html);
            $("#LayerNameBox").focus().select().change( function () {
                vgap.addOns.vgapMapMarkUp.overlays[index].name = $("#LayerNameBox").val();
                vgap.hotkeysOn = true;
                vgap.saveObjectAsNote(0, vgap.addOns.vgapMapMarkUp.notetype, vgap.addOns.vgapMapMarkUp.overlays);
                vgap.addOns.vgapMapMarkUp.showDrawTools();
                if ($("#OverlayFilter").length)
                    vgap.addOns.vgapMapMarkUp.showOverlayFilter();
            });
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.resetDrawTools = function () {
            
            $("#DrawToolsContainer").remove();
            vgap.addOns.vgapMapMarkUp.isDrawMode = false;
            vgap.addOns.vgapMapMarkUp.current.selectedid = null;
            vgaPlanets.prototype.addOns.vgapMapMarkUp.current.markup = null;

            
        };        
    
    vgaPlanets.prototype.addOns.vgapMapMarkUp.showDrawTools = function () {
            var addon = vgap.addOns.vgapMapMarkUp;
            if (vgap.addOns.vgapMapMarkUp.overlays.length < 1)
               vgap.addOns.vgapMapMarkUp.overlays.push( {active: true, name: "New Layer", markups: []} );
            if (vgap.addOns.vgapMapMarkUp.current.overlayid == null)
                vgap.addOns.vgapMapMarkUp.current.overlayid = 0;           
/*
            vgap.map.conClosing = true;
            this.toolsOpen = false;
            setTimeout(function () { vgap.map.conClosing = false; }, 100);
            var margin = "-" + vgap.map.controls.height() + "px";
            vgap.map.controls.css("marginTop", margin);
*/
            
            var current = vgap.addOns.vgapMapMarkUp.current.markup;
            if (current == null)
                var type = "circle";
            else
                var type = vgap.addOns.vgapMapMarkUp.current.markup.type;
            $("#DrawToolsContainer").remove();
            var html =  "<li id='DrawToolsContainer'><div id='ToolSelector'><table>"; // style='border: 1px solid #000000;'>";
            
            html += "<td>Current Layer <select id='OverlaySelect' onchange='vgap.addOns.vgapMapMarkUp.current.overlayid=parseInt($(\"#OverlaySelect\").val());vgap.addOns.vgapMapMarkUp.showDrawTools();'>";
            var overlays = vgap.addOns.vgapMapMarkUp.overlays;
            for (i=0; i<overlays.length; i++) {
                html += "<option " + "value=" + i + " " + (i==vgap.addOns.vgapMapMarkUp.current.overlayid ? "selected" : "") +">" + i +": " + overlays[i].name + "</option>";
            }
            html += "</select></td>";
            
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.showOverlayNameEdit();'><span style='background: #666666; padding: 5px;'> Name </span></td>";
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.deleteOverlay();vgap.addOns.vgapMapMarkUp.showDrawTools();'><span style='background: #666666; padding: 5px;'> Delete Layer </span></td>";
            var overlay = overlays[addon.current.overlayid];
            if (overlay.markups != null && overlay.markups.length > 0)
                html += "<td onclick='vgap.addOns.vgapMapMarkUp.showObjectSelect(0);'><span style='background: #666666; padding: 5px;'> Edit Layer </span></td>";
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.newOverlay(); vgap.addOns.vgapMapMarkUp.showDrawTools();' ><span style='background: #666666; padding: 5px;'> New Layer </span><//td><td>";
            
            html += "<input name='drawtool' value='circle' type='radio' " + (type == "circle" ? "checked" : "") + ">Circle</input>";
            html += "<input name='drawtool' value='line' type='radio' " + (type == "line" ? "checked" : "") + ">Line</input>";
            html += "<input name='drawtool' value='point' type='radio' " + (type == "point" ? "checked" : "") + ">Point</input>";
            html += "<input name='drawtool' value='text' type='radio' " + (type == "text" ? "checked" : "") + ">Text</input>";
            html += "<td><a class='rNavRight' onclick='vgap.addOns.vgapMapMarkUp.resetDrawTools();'></a></td>";            
            html += "</td></table></div></li>";
            $("#PlanetsMenu").prepend(html);
            
            $("body").css("cursor", "crosshair");
            vgaPlanets.prototype.addOns.vgapMapMarkUp.isDrawMode = true;
            vgaPlanets.prototype.addOns.vgapMapMarkUp.current.markup = null;
    
            
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.showObjectSelect = function (index) {
            var addon = vgap.addOns.vgapMapMarkUp;
            var overlay = addon.overlays[addon.current.overlayid];
            
            addon.current.selectedid = index;
            vgap.map.draw();
            
            var html = "<table>"
            html += "<td>Layer " + addon.current.overlayid + ": " + overlay.name + "</td>";
            html += "<td><a class='rNavLeft' onclick='vgap.addOns.vgapMapMarkUp.showObjectSelect(" + ((index-1 + overlay.markups.length) % overlay.markups.length) + ");'></a></td>";
            html += "<td>" + (index + 1) + " / " + overlay.markups.length + "</td>";
            html += "<td><a class='rNavRight' onclick='vgap.addOns.vgapMapMarkUp.showObjectSelect(" + ((index+1) % overlay.markups.length) + ");'></a></td>";
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.editMarkup();' ><span style='background: #666666; padding: 5px;'> Edit </span><//td>";
            //html += "<td onclick='' ><span style='background: #666666; padding: 5px;'> Delete </span><//td>";
            html += "<td><a class='rNavRight' onclick='vgap.addOns.vgapMapMarkUp.resetDrawTools();'></a></td>";
            html += "</table>";
            $("#DrawToolsContainer").html(html);    
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.editMarkup = function () {
            var addon = vgap.addOns.vgapMapMarkUp;
            var overlay = addon.overlays[addon.current.overlayid];
            var markup = overlay.markups.splice(addon.current.selectedid,1)[0];
            addon.current.markup = markup;
            addon.current.selectedid = null;
            vgap.map.draw();
            addon.showMarkupParams(markup);        
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.showMarkupParams = function (markup) {
            var html = "<table>"
            switch (markup.type) {
                case "circle":
                    html += "<td>X:</td><td><input id='Xbox' type='textbox' size='4' maxlength='4' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.x + "'></input></td>";
                    html += "<td>Y:</td><td><input id='Ybox' type='textbox' size='4' maxlength='4' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.y + "'></input></td>";
                    html += "<td>Radius:</td><td><input id='Rbox' type='textbox' size='4' maxlength='4' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.r + "'></input></td>";
                    var focusID = "#Rbox";
                    break;
                case "point":
                     html += "<td>Snap Waypoints</td><td><input id='Scheckbox' type='checkbox' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' " + (markup.snapto ? "checked" : "") + "></input></td>";               
                case "text":
                    html += "<td>X:</td><td><input id='Xbox' type='textbox' size='4' maxlength='4' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.x + "'></input></td>";
                    html += "<td>Y:</td><td><input id='Ybox' type='textbox' size='4' maxlength='4' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.y + "'></input></td>";
                    html += "<td>Text:</td><td><input id='Tbox' type='textbox' size='30' onfocus='vgap.hotkeysOn=false;' onblur='vgap.hotkeysOn=true;' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' value='" + markup.text + "'></input></td>";
                    var focusID = "#Tbox";
                    vgap.hotkeysOn = false;
                    break;
                case "line":
                    html += "<td onclick='vgap.addOns.vgapMapMarkUp.current.markup.points.shift(); vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' ><span style='background: #666666; padding: 5px;'> Delete First </span><//td>";                
                    html += "<td onclick='vgap.addOns.vgapMapMarkUp.current.markup.points.pop(); vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();' ><span style='background: #666666; padding: 5px;'> Delete Last </span><//td>";
                    break;
            }
            
            
            // Zoom Levels
            html += "<td>Zmin:<select id='ZoomMin' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();'>";
            html += "<option value=0>None</option>";
            html += "<option value=-1>Curr</option>";            
            for (var i=0; i<vgap.map.zoomlevels.length; i++) {
                var zl = vgap.map.zoomlevels[i];
                html += "<option value=" + zl + (markup.zmin && markup.zmin == zl ? " selected" : "") + ">" + Math.round(zl * 100) + "</option>";
            }
            html += "</select></td><td>Zmax:<select id='ZoomMax' onchange='vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();'>";
            html += "<option value=0>None</option>";
            html += "<option value=-1>Curr</option>";            
            for (var i=0; i<vgap.map.zoomlevels.length; i++) {
                var zl = vgap.map.zoomlevels[i];
                html += "<option value=" + zl + (markup.zmax && markup.zmax == zl ? " selected" : "") + ">" + Math.round(zl * 100) + "</option>";
            }            
            html += "</select></td>";            
            
            
            html += "<td><div id='NoteColorSelection' style='height: 20px; margin: 0px'><table>";
            /*
            html += "<div class='NoteColor";
            if (note.color == "")
                html += " SelectedColor";
            */
            //html += "' id='NColor' onclick='vgap.map.chooseColor(" + -1 + ");'></div>";
            
            for (var i = 0; i < vgap.map.noteColors.length; i++) {
                var color = vgap.map.noteColors[i];
                html += "<td><div class='NoteColor";
                if (markup.color == color)
                    html += " SelectedColor";
                html += "' id='NColor" + i + "' style='background-color:#" + color + "; width: 20px; height: 20px;' onclick='vgap.map.chooseColor(" + i + ");vgap.addOns.vgapMapMarkUp.current.markup.color=\"#\"+vgap.selectedColor;vgap.addOns.vgapMapMarkUp.updateCurrentMarkup();'></div></td>";
            }
            html += "</table></div></td>";
            
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.showDrawTools();vgap.map.draw();vgap.saveObjectAsNote(0, vgap.addOns.vgapMapMarkUp.notetype, vgap.addOns.vgapMapMarkUp.overlays);'>Delete</td>";
            html += "<td onclick='vgap.addOns.vgapMapMarkUp.saveCurrentMarkup();vgap.addOns.vgapMapMarkUp.showDrawTools();'>Save</td>";
            html += "<td><a class='rNavRight' onclick='vgap.addOns.vgapMapMarkUp.resetDrawTools();'></a></td>";
            html += "</table>";
            $("#DrawToolsContainer").html(html);
            if (focusID != null) {
                $(focusID).focus().select();
            }
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.updateCurrentMarkup = function () {
            var markup = vgap.addOns.vgapMapMarkUp.current.markup;
            if (markup.color == null || markup.color == "")
                markup.color = "white";
            markup.zmin = parseFloat($("#ZoomMin").val());
            markup.zmax = parseFloat($("#ZoomMax").val());            
            switch (markup.type) {
                case "circle":
                    markup.x = parseFloat($("#Xbox").val());
                    markup.y = parseFloat($("#Ybox").val());
                    markup.r = parseFloat($("#Rbox").val());
                case "line":
                    markup.attr.stroke = markup.color;
                    break;
                case "point":
                    markup.attr.stroke = markup.color;
                    markup.x = parseFloat($("#Xbox").val());
                    markup.y = parseFloat($("#Ybox").val());
                    markup.text = $("#Tbox").val();
                    markup.snapto = $("#Sbox").val();
                    break;
                case "text":
                    markup.attr.fill = markup.color;
                    markup.x = parseFloat($("#Xbox").val());
                    markup.y = parseFloat($("#Ybox").val());
                    markup.text = $("#Tbox").val();
                    break;            
            }
            vgap.map.draw();
        };
        
    vgaPlanets.prototype.addOns.vgapMapMarkUp.saveCurrentMarkup = function () {
            var markup = vgap.addOns.vgapMapMarkUp.current.markup;
            
            if (markup.zmin) {
                if      (markup.zmin == 0 ) delete markup.zmin;
                else if (markup.zmin == -1) markup.zmin = vgap.map.zoom;
            }
            
            if (markup.zmax) {
                if      (markup.zmax == 0 ) delete markup.zmax;
                else if (markup.zmax == -1) markup.zmax = vgap.map.zoom;            
            }
            
            vgap.addOns.vgapMapMarkUp.overlays[vgap.addOns.vgapMapMarkUp.current.overlayid].markups.push( markup );
            vgap.saveObjectAsNote(0, vgap.addOns.vgapMapMarkUp.notetype, vgap.addOns.vgapMapMarkUp.overlays);
        };
        
    vgapMap.prototype.drawOffsetText = function (x, y, text, dx, dy, attr, paperset) {
            if (paperset == null)
                paperset = this.ctx;
            if (!vgap.map.isVisible(x, y, Math.max(10, paperset.measureText(text).width) / 2 / this.zoom)) return;
            paperset.fillStyle = attr.fill;
            paperset.textAlign = "center";
            paperset.textBaseline = "middle";
            paperset.fillText(text, this.screenX(x) + dx, this.screenY(y) + dy);
        }
    
    vgapMap.prototype.drawCrosshair = function (x, y, armsize, attr, paperset) {
            if (!vgap.map.isVisible(x, y, armsize / this.zoom)) return;    
            if (paperset == null)
                paperset = this.ctx;
            paperset.strokeStyle = attr.stroke;
            paperset.beginPath();
            paperset.moveTo(this.screenX(x)-armsize, this.screenY(y));
            paperset.lineTo(this.screenX(x)+armsize, this.screenY(y));
            paperset.moveTo(this.screenX(x), this.screenY(y)-armsize);
            paperset.lineTo(this.screenX(x), this.screenY(y)+armsize);
            paperset.stroke();
        };
        
    vgapMap.prototype.drawScaledCircle = function (x, y, radius, attr, paperset) {
            if (!vgap.map.isVisible(x, y, radius)) return;
            radius *= this.zoom
            if (radius <= 1)
                radius = 1;
            if (paperset == null)
                paperset = this.ctx;
            paperset.strokeStyle = attr.stroke;
            paperset.beginPath();
            paperset.arc(this.screenX(x), this.screenY(y), radius, 0, Math.PI*2, false);
            paperset.stroke();
        };
        
    vgapMap.prototype.drawScaledLine = function (x1, y1, x2, y2, attr, paperset) {
            if (!vgap.map.isVisible((x1 + x2) / 2, (y1 + y2) / 2, Math.max( Math.abs(x2-x1), Math.abs(y2-y1) ) / 2)) return;
            if (paperset == null)
                paperset = this.ctx;
            paperset.strokeStyle = attr.stroke;
            paperset.beginPath();            
            paperset.moveTo(this.screenX(x1), this.screenY(y1));
            paperset.lineTo(this.screenX(x2), this.screenY(y2));
            paperset.stroke();
        };
        
    vgapMap.prototype.drawOverlays = function () {
            var addon = vgap.addOns.vgapMapMarkUp;
            //this.overlays.clearRect(0, 0, vgap.map.canvas.width, vgap.map.canvas.height );
            //this.overlays = this.paper.set(); //fix for client 1.97
            //console.log(vgap.addOns.vgapMapMarkUp.overlays.length);
            if (addon.current.selectedid != null ) {
                this.drawMarkup(addon.overlays[addon.current.overlayid].markups[addon.current.selectedid]);
            }
            else {
            
                for (var i=0; i<addon.overlays.length; i++) {
                    var overlay = addon.overlays[i];
                    //console.log(overlay.active);
                    if (overlay.active) {
                        //console.log(overlay);
                        var markups = overlay.markups;
                        for (var j=0; j<markups.length; j++) {
                            this.drawMarkup(markups[j]);
                        }
                    }
                }
                if (addon.isDrawMode && addon.current.markup != null) {
                    this.drawMarkup(addon.current.markup);
                }
            }
        };
        
    vgapMap.prototype.drawMarkup = function (markup) {
            if (markup.zmin && vgap.map.zoom < markup.zmin && markup.zmin > 0) return;
            if (markup.zmax && vgap.map.zoom > markup.zmax && markup.zmax > 0) return;            
            this.overlays.lineWidth = 1;
            switch (markup.type) {
                case "circle":
                    this.drawScaledCircle(markup.x, markup.y, markup.r, markup.attr, this.overlays);
                    return;
                case "line":
                    var points = markup.points;
                    if (points.length == 1) {
                        var p1 = points[0];
                        this.drawCrosshair(p1.x, p1.y, 5, markup.attr, this.overlays);
                    }
                    else {
                        for (var i=1; i<points.length; i++) {
                            var p1 = points[i-1];
                            var p2 = points[i];
                            this.drawScaledLine(p1.x, p1.y, p2.x, p2.y, markup.attr, this.overlays);
                        }
                    }
                    return;
                case "point":
                    this.drawCrosshair(markup.x, markup.y, 5, markup.attr, this.overlays);
                    if (markup.text != "")
                        this.drawOffsetText(markup.x, markup.y, markup.text, 0, 12, {fill: markup.attr.stroke}, this.overlays);
                    return;
                case "text":
                    this.drawOffsetText(markup.x, markup.y, markup.text, 0, 0, markup.attr, this.overlays);
                    return;                 
            }
        };
        
/*        
    var old_loadControls = vgapMap.prototype.loadControls; 
    vgapMap.prototype.loadControls = function () {
    
            old_loadControls.apply(this, arguments);
            
            var additem = "<li onclick='vgap.addOns.vgapMapMarkUp.showDrawTools();'>Draw</li>";
            additem += "<li onclick='vgap.addOns.vgapMapMarkUp.showOverlayFilter();'>Layers</li>";
            
            //$("#MapTools").append(additem);
            $("#MapTools > li:contains('Clear (x)')").before(additem);
    
            var height = this.controls.height() - this.toolsMenu.height();
            this.controls.css("marginTop", "-" + this.controls.height() + "px");
        
        };
*/            
    
        
    var old_click = vgapMap.prototype.click; 
    vgapMap.prototype.click = function (e) {
            
            if (vgap.addOns.vgapMapMarkUp.isDrawMode) {
                if (vgap.addOns.vgapMapMarkUp.current.markup == null)
                    var type = $("input[name='drawtool']:checked").val();
                else
                    var type = vgap.addOns.vgapMapMarkUp.current.markup.type; 
                switch (type) {
                    case "circle":
                        var markup = {type: type, x: this.x, y: this.y, r: 81, attr: {stroke: "white"}};
                        break;
                    case "line":
                        var markup = vgap.addOns.vgapMapMarkUp.current.markup;
                        if (markup == null)
                            var markup = {type: type, points: [{x: this.x, y: this.y}], attr: {stroke: "white"}};
                        else
                            markup.points.push({x: this.x, y: this.y});
                        break;
                    case "point":
                        var markup = {type: type, x: this.x, y: this.y, text: "", snapto: true, attr: {stroke: "white"}};
                        break;
                    case "text":
                        var markup = {type: type, x: this.x, y: this.y, text: "", attr: {fill: "white"}};
                        break;                    
                    default:
                        var markup = null;
                }
                if (markup != null) {
                    vgap.addOns.vgapMapMarkUp.current.markup = markup;
                    vgap.addOns.vgapMapMarkUp.showMarkupParams( markup );
                    this.draw();
                    //vgap.addOns.vgapMapMarkUp.overlays[0].markups.push( markup );
                    //this.drawMarkup(markup);
                    //this.drawScaledCircle(this.x, this.y, 81, {stroke: "white"}, vgap.map.overlays);
                }
            }
            else {
                old_click.apply(this, arguments);
            }
    
        };
        
    var old_shipSelectorClick = vgapMap.prototype.shipSelectorClick;
    vgapMap.prototype.shipSelectorClick = function (shift) {
    
            old_shipSelectorClick.apply(this, arguments);
            
            var ship = this.activeShip;
    
            var tx = ship.targetx;
            var ty = ship.targety;
            
            var overlays = vgap.addOns.vgapMapMarkUp.overlays;
            if (ship.target == null && overlays != null) {
                //snap to MAP POINT if near one
                for (var i = 0; i < overlays.length; i++) {
                    var overlay = overlays[i];
                    if (overlay.active) {
                        for (j=0; j<overlay.markups.length; j++) {
                            var markup = overlay.markups[j];
                            if (markup.type == "point" && markup.snapto) {
                                if (Math.dist(tx, ty, markup.x, markup.y) < (10 / this.zoom)) {
                                    ship.targetx = markup.x;
                                    ship.targety = markup.y;
                                    vgap.loadWaypoints();
                                    this.draw();
                                    vgap.shipScreen.screen.refresh();                           
                                    return;
                                }
                            }
                        }
                    }
                }
            }
            
            /*
            //reset waypoints - targetx is the first waypoint and waypoints holds additional ones.
            if (!shift || (ship.x == ship.targetx && ship.y == ship.targety)) {
                ship.targetx = tx;
                ship.targety = ty;
                ship.waypoints = new Array();
            }
            else
                ship.waypoints.push({ x: tx, y: ty });
            */
    
        };
    
	
	/*
	 *  Specify your plugin
	 *  You need to have all those methods defined or errors will be thrown. 
	 *  I inserted the print-outs in order to demonstrate when each method is 
	 *  being called. Just comment them out once you know your way around. 
	 *  
	 *  For any access to plugin class variables and methods from inside these
	 *  reserved methods, "vgap.plugins["nameOfMyPlugin"].my_variable" has to be 
	 *  used instead of "this.my_variable". 
	 */
	var plugin = {
			
			/*
			 * processload: executed whenever a turn is loaded: either the current turn or
			 * an older turn through time machine 
			 */
			processload: function() {
//				console.log("ProcessLoad: plugin called.");
                var overlays = vgap.getObjectFromNote(0, vgap.addOns.vgapMapMarkUp.notetype);
                    if (overlays == null)
                        overlays = [];
                    vgap.addOns.vgapMapMarkUp.overlays = overlays;
			},	
			
			/*
			 * loaddashboard: executed to rebuild the dashboard content after a turn is loaded
			 */
			loaddashboard: function() {
//				console.log("LoadDashboard: plugin called.");
			},

			/*
			 * showdashboard: executed when switching from starmap to dashboard
			 */
			showdashboard: function() {
//				console.log("ShowDashboard: plugin called.");
				vgap.addOns.vgapMapMarkUp.resetDrawTools();				
			},
			
			/*
			 * showsummary: executed when returning to the main screen of the dashboard
			 */
			showsummary: function() {
//				console.log("ShowSummary: plugin called.");
			},
			
			/*
			 * loadmap: executed after the first turn has been loaded to create the map
			 * as far as I can tell not executed again when using time machine
			 */
			loadmap: function() {
//				console.log("LoadMap: plugin called.");
            
                //if (this.overlays != null) this.overlays.remove();
                //vgap.map.overlays_canvas = document.createElement("canvas");
                // vgap.map.overlays = vgap.map.overlays_canvas.getContext("2d");
                if (!vgap.map.zoomlevels) vgap.map.zoomlevels = [
                    0.2,
                    0.6,
                    1,
                    1.5,
                    2.3,
                    3.4,
                    5.1,
                    7.6,
                    11.4,
                    17.1,
                    25.7,
                    38.5,
                    57.8,
                    86.7,
                    130.1,
                    195.1,
                    292.6,
                    438.9,
                    658.3
                ];
                //vgap.map.drawOverlays();
                vgap.map.addMapTool("Draw", "ShowMinerals", vgap.addOns.vgapMapMarkUp.showDrawTools);
                vgap.map.addMapTool("Layers", "ShowMinerals", vgap.addOns.vgapMapMarkUp.showOverlayFilter);
                
    
			},
			
			/*
			 * showmap: executed when switching from dashboard to starmap
			 */
			showmap: function() {
//				console.log("ShowMap: plugin called.");
				vgap.addOns.vgapMapMarkUp.resetDrawTools();								
			},
			
			/*
			 * draw: executed on any click or drag on the starmap
			 */			
			draw: function() {
//				console.log("Draw: plugin called.");
				//vgap.map.overlays.width = vgap.map.canvas.width;
        		//vgap.map.overlays.height = vgap.map.canvas.height;
        		vgap.map.overlays = vgap.map.canvas.getContext("2d");
				vgap.map.drawOverlays();
			},		
			
			/*
			 * loadplanet: executed a planet is selected on dashboard or starmap
		 	 * loadstarbase: executed a planet is selected on dashboard or starmap
			 * Inside the function "load" of vgapPlanetScreen (vgapPlanetScreen.prototype.load) the normal planet screen 
			 * is set up. You can find the function in "nu.js" if you search for 'vgap.callPlugins("loadplanet");'.
			 * 
			 * Things accessed inside this function several variables can be accessed. Elements accessed as "this.X" 
			 * can be accessed here as "vgap.planetScreen.X".
			 */
			loadplanet: function() {
//				console.log("LoadPlanet: plugin called.");
//				console.log("Planet id: " + vgap.planetScreen.planet.id);
			},
			
			/*
			 * loadstarbase: executed a planet is selected on dashboard or starmap
			 * Inside the function "load" of vgapStarbaseScreen (vgapStarbaseScreen.prototype.load) the normal starbase screen 
			 * is set up. You can find the function in "nu.js" if you search for 'vgap.callPlugins("loadstarbase");'.
			 * 
			 * Things accessed inside this function several variables can be accessed. Elements accessed as "this.X" 
			 * can be accessed here as "vgap.starbaseScreen.X".
			 */
			loadstarbase: function() {
//				console.log("LoadStarbase: plugin called.");
//				console.log("Starbase id: " + vgap.starbaseScreen.starbase.id + " on planet id: " + vgap.starbaseScreen.planet.id);
			},
			
			/*
			 * loadship: executed a planet is selected on dashboard or starmap
			 * Inside the function "load" of vgapShipScreen (vgapShipScreen.prototype.load) the normal ship screen 
			 * is set up. You can find the function in "nu.js" if you search for 'vgap.callPlugins("loadship");'.
			 * 
			 * Things accessed inside this function several variables can be accessed. Elements accessed as "this.X" 
			 * can be accessed here as "vgap.shipScreen.X".
			 */
			loadship: function() {
//				console.log("LoadShip: plugin called.");
			},
			
			// END PLUGIN FUNCS
			
        			
			
			
	};
		
	// register your plugin with NU
	vgap.registerPlugin(plugin, "MapMarkUp");
	
}
	
	
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script);        
