// ==UserScript==
// @name          Planets.nu lock ship when marked ready
// @description   Prevents ship orders from being changed when ship is marked ready
// @include       http://planets.nu/home
// @include       http://planets.nu/games/*
// @include       http://play.planets.nu/*
// @include       http://*.planets.nu/*
// @version 0.4
// ==/UserScript==

/*------------------------------------------------------------------------------

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
vgaPlanets.prototype.setupAddOn("vgapLockReady");

// Set to -USERSCRIPT_ID to try and prevent note type collisions
vgaPlanets.prototype.addOns.vgapLockReady.notetype = -140301;

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
        if (note != null)
            return JSON.parse(note.body);
        else
            return null;
    };

// End Note Storage/Retrieval functions

old_ShipScreen_load = vgapShipScreen.prototype.load;
vgapShipScreen.prototype.load = function(ship) {
        old_ShipScreen_load.apply(this, arguments);
        if (ship.readystatus > 0 || ship.ownerid != vgap.player.id) {
            $("#ShipScreen *").not(".TitleBar *").not("#FleetContainer *").removeAttr("onclick");
            this.islocked = true;
        } else {
            this.islocked = false;
        }
    };
    
old_ShipScreen_setShipReadyCheckBox = vgapShipScreen.prototype.setShipReadyCheckBox;
vgapShipScreen.prototype.setShipReadyCheckBox = function(ship) {
        old_ShipScreen_setShipReadyCheckBox.apply(this, arguments);
        $("#ShipScreen").remove();
        this.load(this.ship);
    };
    
old_shipSelectorClick = vgapMap.prototype.shipSelectorClick;
vgapMap.prototype.shipSelectorClick = function(shift) {
    if (vgap.shipScreen.islocked) return;
    old_shipSelectorClick.apply(this, arguments);
}

old_hotkey = vgaPlanets.prototype.hotkey;
vgaPlanets.prototype.hotkey = function (ev) {


        if (!this.hotkeysOn)
            return;

        //f
        if (ev.keyCode == 70) {
            ev.preventDefault();
            /*
            if (vgap.planetScreenOpen)
                vgap.planetScreen.changeFriendly();
            else*/ if (vgap.shipScreenOpen && vgap.shipScreen.islocked)
                return;
            /*
            else if (vgap.starbaseScreenOpen)
                vgap.starbaseScreen.changeFriendly();
            */
        }

        //left arrow
        if (ev.keyCode == 37 && ((this.shipScreenOpen && vgap.shipScreen.islocked) || (this.planetScreenOpen && vgapPlanetScreen.islocked))) {
            return;
        }
        //up arrow
        if (ev.keyCode == 38 && ((this.shipScreenOpen && vgap.shipScreen.islocked) || (this.planetScreenOpen && vgapPlanetScreen.islocked))) {
            return;
        }
        //right arrow
        if (ev.keyCode == 39 && ((this.shipScreenOpen && vgap.shipScreen.islocked) || (this.planetScreenOpen && vgapPlanetScreen.islocked))) {
            return;
        }
        //down arrow
        if (ev.keyCode == 40 && ((this.shipScreenOpen && vgap.shipScreen.islocked) || (this.planetScreenOpen && vgapPlanetScreen.islocked))) {
            return;
        }
        //c and t
        if (ev.keyCode == 67 || ev.keyCode == 84) {
            if (this.shipScreenOpen && vgap.shipScreen.islocked)
                return;
            /*
            else if (this.planetScreenOpen)
                this.planetScreen.transfer();
            else if (this.starbaseScreenOpen)
                this.starbaseScreen.transfer();
            */
        }
        //w 
        if (ev.keyCode == 87 && this.shipScreenOpen && vgap.shipScreen.islocked) {
            return;
        }
        //n 
        if (ev.keyCode == 78 && this.shipScreenOpen && vgap.shipScreen.islocked) {
            return;
        }
        //e
        if (ev.keyCode == 69 && this.shipScreenOpen && vgap.shipScreen.islocked) {
            return;
        }
        //m
        if (ev.keyCode == 77) {
            if (this.shipScreenOpen && vgap.shipScreen.islocked)
                return;
        }

    /*
        //b
        if (ev.keyCode == 66 && this.planetScreenOpen) {
            this.planetScreen.build();
        }
        //a
        if (ev.keyCode == 65) {
            if (this.planetScreenOpen)
                this.planetScreen.taxRates();
            else if (this.shipScreenOpen)
                this.map.showRange();
        }

        //l
        if (ev.keyCode == 76 && this.starbaseScreenOpen) {
            this.starbaseScreen.raiseTech();
        }
        //d
        if (ev.keyCode == 68 && this.starbaseScreenOpen) {
            this.starbaseScreen.buildDefense();
        }
        //b
        if (ev.keyCode == 66 && this.starbaseScreenOpen) {
            this.starbaseScreen.enterSpaceDock();
        }
        
    */
    
    old_hotkey.apply(this, arguments);
    
    };
    


    
//
}
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);



/*
Exception: invalid label

*/
/*
Exception: unterminated string literal

*/