// ==UserScript==
// @name          Old Color Picker for Notes Screen
// @description   brings back the old color picker for the notes screen
// @namespace     Planets.nu
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://*.planets.nu/*
// @grant         none
// @version 0.5
// ==/UserScript==

// 0.4 added "Delete Note" Button
// 0.3 changed not to disturb Beefer's Planets.nu map drawing 
// 0.2 works now ;) + actual color shown in newpicker's box
// 0.1 Created




function wrapper () { // wrapper for injection
vgapMap.prototype.noteColors=["ff0000", "ff00ff", "ffffff", "0000ff", "00ff00", "00ffff", "ffff00", "ff6600", "ffccff", "669966", "666699"];


if (typeof vgapMap.prototype.chooseColor=="undefined") {
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
    }
};

var chooseColorOld=vgapMap.prototype.chooseColor;

vgapMap.prototype.chooseColor= function (index) {
	chooseColorOld.apply(this, arguments);
	$("#selectednotecolor").css("background-color", (vgap.selectedColor?"#"+vgap.selectedColor:""));
        
    }

vgapMap.prototype.editNote= function (id, noteType) {
        vgap.hotkeysOn = false;
        vgap.editNoteOpen = true;
        var obj = null;
        if (noteType == 1 || noteType == 3)
            obj = vgap.getPlanet(id);
        else
            obj = vgap.getShip(id);

        var baseText = "";
        if (noteType == 3)
            baseText = " - Starbase ";

        var note = vgap.getNote(id, noteType);
        note.changed = 1;

        var html = "<div id='PlanetSurvey'>";
        html += "<div class='DarkBar'>" + obj.id + ": " + obj.name + baseText + " - Notes</div>";

        html += "<textarea id='EditNote'>" + note.body + "</textarea>";
        html += "<div class='DarkBar'>Custom Color</div>";

        vgap.selectedColor = note.color;

	//Old Colors
        html += "<div class='NoteColor";
        if (note.color == "")
            html += " SelectedColor";
        html += "' id='NColor' style='width: 16px; height: 16px;float: left; margin: 5px 5px 0 0;' onclick='vgap.map.chooseColor(" + -1 + ");'></div>";
        for (var i = 0; i < this.noteColors.length; i++) {
            var color = this.noteColors[i];
            html += "<div class='NoteColor";
            if (note.color == color)
                html += " SelectedColor";
            html += "' id='NColor" + i + "' style='background-color:#" + color + "; width: 16px; height: 16px; float: left; margin: 5px 5px 0 0;' onclick='vgap.map.chooseColor(" + i + ");'></div>";
        }
	html += "<hr class='clr'/>";	
	
	//New Colors
	html += "<div id='NoteColorSelection'>";
        html += "<div onclick=\"colorPicker.show('selectednotecolor');\" id=\"selectednotecolor\" class='NoteColor' style='background-color:#" + note.color + ";'></div>";
        html += "</div>";
        
	html += "<hr class='clr'/>";
	
        html += "<a class='MoreBack' onclick='vgap.saveNote(" + id + ", " + noteType + ");return false;'>OK</a>";
        html += "<a class='MoreBack' onclick='$(\"#EditNote\").val(null);vgap.saveNote(" + id + ", " + noteType + ");return false;'>Delete Note</a>";
        vgap.more.empty();
        $(html).appendTo(vgap.more);
        vgap.showMore(300);
    }

}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";
document.body.appendChild(script);