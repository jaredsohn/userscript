// ==UserScript==
// @name          Planets.nu - Game Commentary Plugin
// @description   Adds commentary overlay to allow "rich" game commentary stored with game data
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.5
// ==/UserScript==

/*
Shift-c toggles shows/hides the overlay

Add View Link: adds a chunk of data to store the current zoom level and center point on the screen. In "view mode" this will be translated into a clickable link that will restore this viewpoint.

Add Object Link: adds an identifier for the current ship/base/planet of yours that is open. Uses the same format as the Message Links add-on: s#ID / p#ID / b#ID. In "view mode" this will be translated into a clickable link to the object, same as selecting it in the game. Links can also be typed in manually (for stuff you don't own, or for convenience).

Edit/Preview: toggle between "edit mode" (where you type) and "view mode" (where you see it with all the links added, etc.)

"V" Button: Locks solid visibility of the overlay, for easier readability/typing.

"X" Button: Hides commentart overlay

Commentary is saved with the game data for each turn, so is visible in the time machine, and by other players viewing the game once it ends.

*/
 
function wrapper () { // wrapper for injection


    var pluginName = "GameCommentary";
    var minToolkit = 4;
    
    if (!vgap) return;
    if (vgap.version < 3) return;
    
    if (!vgap.toolkit || !vgap.toolkit.version || vgap.toolkit.version < minToolkit) {
        var html = "<div class=ToolkitWarning style='width: 600px; height: 200px; position: absolute; top: 50%; left: 50%; margin-left: -310px; margin-top: -110px; padding: 20px; background-color: #888888'>";
        html    += "<div style='width: 100%; text-align: right;'><a onclick='$(\"div.ToolkitWarning\").remove(); return false;'><span style='padding: 5px; background-color: #aaaaaa; cursor: pointer;'>X</span></a></div>";
        html    += "WARNING: Toolkit Not Installed or Needs Update<br><br>";
        html    += "The plugin <span style='font-style: italic;'>" + pluginName + "</span> requires the Planets.nu Plugin Toolkit to be installed.<br><br>";
        html    += "To install the latest toolkit, click <a href='http://userscripts.org/scripts/source/179304.user.js' target='_blank'>HERE</a><br>";
        html    += "(You will need to exit any open game and refresh yout browser after installing)<br><br>";
        html    += "Note: If you have installed the latest toolkit and are still getting this error, you may need to adjust the script execution order so that the toolkit is run first.</div>";
        $("body").append(html);
        return;
    }
        
    var plugin = {
        name: pluginName,
        edits: [],
        
        processload: function () {
            if (!$("#GameCommentary").length) {
                this.buildCommentaryEntry();
            }
            if (this.gameid && this.gameid != vgap.game.id) {
                this.edits = [];
                this.saveforedits = false;
            }
            this.gameid = vgap.game.id;
            var cobj = this.loadObjectNote(0);
            var curredit = this.getEdit(vgap.game.turn);
            if (curredit) 
                $("#CommentText").val(curredit.c);
            else
                $("#CommentText").val("");
            if (cobj != null ) {
                for (var i = 0; i < cobj.length; i++) {
                    var comm = cobj[i];            
                    if (comm.t == vgap.game.turn) {
                        // This is the commentary stored with this turn 
                        if (!curredit) {
                            var text = comm.c;
                            $("#CommentText").val(text);
                        }
                    }
                    else {
                        // This is the edited commentary stored for a previous turn
                        var edit = this.getEdit(comm.t);
                        if (!edit) this.edits.push( {t: comm.t, c: comm.c, editturn: vgap.game.turn} );
                        else if (vgap.game.turn > edit.editturn) {
                            edit.c = comm.c;
                            edit.editturn = vgap.game.turn;
                        }
                    }
                }
            }
            
            if (this.saveforedits && !vgap.inHistory)
                this.saveCommentary();

            this.viewMode();
            
        },
        
        buildCommentaryEntry: function () {
            $("#GameCommentary").remove();
            var html = "<div id='GameCommentary' style='position: absolute; bottom: 0px; left: 420px; height: 250px; width: 100%; background-color: #222222; opacity: 0.5;'>";
            html += "<table style='width: 100%; height: 20px; color: cyan; text-align: center; padding: 3px;'><tr>";
            html += "<td style='background-color: #555555;' onclick='vgap.plugins.GameCommentary.addViewLink();'>Add View Link</td>";
            html += "<td style='background-color: #555555;' onclick='vgap.plugins.GameCommentary.addObjectLink();'>Add Object Link</td>";
            html += "<td style='background-color: #555555;' onclick='vgap.plugins.GameCommentary.togglePreview();'>Edit/Preview</td>";            
            html += "<td style='width: 20px; background-color: #555555;' onclick='vgap.plugins.GameCommentary.lockopaque = !vgap.plugins.GameCommentary.lockopaque;'>V</td>";
            html += "<td style='width: 20px; background-color: #555555' onclick='$(\"#GameCommentary\").hide();'>X</td>";            
            html += "</tr></table>";
            html += "<div id='CScrollPane' style='width: 100%; height:210px; display: none;'><div id='CommentView' style='width: 100%; color: #FFFFFF;'></div></div>";
            html += "<textarea id='CommentText' style='resize: none; width: 99%; height: 210px; background-color: #333333; border: 1px solid #555555; color: #FFFFFF;' onfocus='vgap.hotkeysOn = false;' onblur='vgap.hotkeysOn = true;' onchange='vgap.plugins.GameCommentary.saveCommentary();'></textarea>";
            html += "</div>";
            this.commentary = $(html).appendTo("#PlanetsContainer");
            this.commentary.width($(window).width() - 840);
            this.commentary.hover( function () {$("#GameCommentary").css("opacity", 1);}, function () {if (!vgap.plugins.GameCommentary.lockopaque) $("#GameCommentary").css("opacity", 0.5);}  );
        },
        
        insertCommentText: function (string) {
            var ctext = $("#CommentText");
            var index = ctext.prop("selectionStart");
            var val = ctext.val();        
            ctext.val( val.substring(0, index) + string + val.substring(index) );
            ctext.prop("selectionStart", index + string.length);
            ctext.focus();
            ctext.change();
        },
        
        addViewLink: function () {
            var offset = (vgap.lcOpen ? 200 / vgap.map.zoom : 0);
            var linktext = "##VL##" + vgap.map.zoom + "," + (vgap.map.centerX + offset) + "," + vgap.map.centerY + "##";
            this.insertCommentText(linktext);
        },
        
        addObjectLink: function () {
            if (vgap.shipScreenOpen)
                this.insertCommentText( "s#" + vgap.shipScreen.ship.id );
            else if (vgap.planetScreenOpen)
                this.insertCommentText( "p#" + vgap.planetScreen.planet.id );                
            else if (vgap.starbaseScreenOpen)
                this.insertCommentText( "b#" + vgap.starbaseScreen.starbase.planetid );               
        },
        
        previewCommentary: function () {
            var cview = $("#CommentView");
            var ctext = $("#CommentText").val();
            ctext = $( "<div />").text(ctext).html(); // clean
//            console.log(ctext);
            
            ctext = ctext.replace(/\n/g, "<br />");

//            console.log(ctext);            
            ctext = ctext.replace(/##VL##([0-9]*\.*[0-9]*),([0-9]*\.*[0-9]*),([0-9]*\.*[0-9]*)##/g, "<a onclick='vgap.showMap(); vgap.map.setZoom($1); vgap.map.centerMap($2,$3);' style='color: cyan;'>[Map View]</a>");
            ctext = ctext.replace(/([spb])#([0-9]{1,3})/gi, function (match, type, textid) {
                var id = parseInt(textid, 10);
                var jumpfunc = "";
                var mouseover = "";
                var target = null;
                switch (type.toUpperCase()) {
                    case "P":
                        target = vgap.getPlanet(id);
                        if (target != null) {
                            jumpfunc = ( vgap.player.id == target.ownerid ? "vgap.map.selectPlanet(" + id + ");" : "shtml.planetSurvey(" + id + ");" );
                        }
                        break;
                    case "S":
                        target = vgap.getShip(id);
                        if (target != null) {
                            jumpfunc = ( vgap.player.id == target.ownerid ? "vgap.map.selectShip(" + id + ");" : "shtml.shipSurvey(" + id + ");" );
                            mouseover = " onmouseover='vgap.showHover(" + id + ");' onmouseout='vgap.hideHover();'";
                        }
                        break;
                    case "B":
                        target = vgap.getStarbase(id);
                        if (target != null) {
                            target = vgap.getPlanet(target.planetid);
                            jumpfunc = ( vgap.player.id == target.ownerid ? "vgap.map.selectStarbase(" + id + ");" : "shtml.planetSurvey(" + id + ");" );
                        }
                        break;                         
                }
                if (target != null) {
                    var link = "<a style='color:cyan;' onclick='vgap.showMap();vgap.map.centerMap(" + target.x + ", " + target.y + ");" + jumpfunc + "return false;'" + mouseover + " >";
                    link += match.toUpperCase() + ": " + target.name + "</a>";
                    return link;
                }
                else
                    return match;
            });            
//            console.log(ctext);    
            if (ctext == "") ctext = "--- No Comments ---";
            cview.html( "<p>" + ctext + "</p>" );
            $("#CScrollPane").jScrollPane();
            
        },
        
        editMode: function () {
            $("#CScrollPane").hide();
            $("#CommentText").show();
        },
        
        viewMode: function () {
            $("#CommentText").hide();
            $("#CScrollPane").show();
            this.previewCommentary();
        },
        
        togglePreview: function () {
            if ($("#CScrollPane").is(":visible")) {
                this.editMode();
            }
            else {
                this.viewMode();
            }
        },
        
        saveCommentary: function () {
            console.log("SAVE");
            var text = $("#CommentText").val();        
            if (vgap.inHistory) {
                this.saveforedits = true;
                var edit = this.getEdit(vgap.game.turn);
                if (edit) {
                    edit.c = text;
                    edit.editturn = vgap.nowTurn;
                }
                else {
                    this.edits.push( {t: vgap.game.turn, c: text, editturn: vgap.nowTurn} );
                }
            }
            else {
                var saveObj = [{t: vgap.game.turn, c: text}];
                for (var i = 0; i < this.edits.length; i++) {
                    var edit = this.edits[i];
                    saveObj.push( {t: edit.t, c: edit.c} );
                }
                console.log(saveObj);
                this.saveObjectNote(0, saveObj);
                this.saveforedits = false;
            }
        },
        
        getEdit: function (turn) {
            for (var i = 0; i < this.edits.length; i++) {
                if (this.edits[i].t == turn) return this.edits[i];
            }
            return null;
        }
    }
    vgap.toolkit.registerPlugin(plugin);
    
    //END TOOLKIT HEADER
    
    var old_hotkey = vgaPlanets.prototype.hotkey;
    vgaPlanets.prototype.hotkey = function (ev) {
        if (vgap.hotkeysOn && ev.keyCode == 67 && ev.shiftKey) {
            $("#GameCommentary").toggle();
            if ($("#CScrollPane").is(":visible")) {
                vgap.plugins.GameCommentary.previewCommentary();
            }
        }
        else old_hotkey.apply(this, arguments);
    
    }
    



} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script); 
document.body.removeChild(script);