// ==UserScript==
// @name          Planets.nu Plugin Toolkit
// @description   Library of useful functions to be used by other planets.nu userscripts
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.4
// ==/UserScript==

/*
Version Notes
0.2     Fix local save function names in template and make names more consistent
        Small change to testChange function to exclude stock changes with notes
0.3     Add vgap.addMessageType
        Add vgap.mineFieldRadius
        Add vgap.guessBeamsFromSweep
        Add version to toolkit, so plugins can check if user needs to update
0.4     Add note storage utility funcs to pluginTemplate
*/
 
function wrapper () { // wrapper for injection

var VERSION = 4; // Use userscript version * 10


// Install better callPlugins function:
// - Doesn't require all functions to be defined
// - Calls plugin functions in plugin context, if plugin.useOwnContext == true
//   (default for toolkit plugins)
vgaPlanets.prototype.callPlugins = function (func) {
    for (var i = 0; i < vgap.plugins.length; i++) {
        var plugin = vgap.plugins[i];
        if (typeof plugin[func] === "function") {
            if (plugin.useOwnContext)
                plugin[func].call(plugin);
            else
                plugin[func].call();
        }
    }
}

// Add Message Type Function - adds a messsage type to the vgap.messageTypes array
// Returns the index assigned to the message type. Scripts should store this as it might not
// always be the same if multiple scripts are building custom messages
vgaPlanets.prototype.addMessageType = function (name) {
    return vgap.messageTypes.push(name) - 1;
}

// Utlity function to return radius of minefield given number of mines
vgaPlanets.prototype.minefieldRadius = function (mines) {
    return Math.floor(Math.sqrt(mines));
}

// Attempts to guess possible beam combinations given an amount of mines swept
vgaPlanets.prototype.guessBeamsFromSweep = function (mines, isweb) {
    var results = [];
    var mult = 4;
    if (isweb) mult = 3;
    if (mines % mult) return results;
    
    mines = Math.abs(mines) / mult;
    
    for (var id = 10; id >= 1; id--) {
        var power = id * id;
        if (mines % power == 0) {
            var count = mines / power;
            if (count > 0 && count <= 10) results.push( {beamid: id, count: count} );
        }
    }
    
    return results;
}

//
// START Storage Functions
//

// Local Storage
vgaPlanets.prototype.saveObjectLocal = function (key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
}

vgaPlanets.prototype.loadObjectLocal = function (key) {
    var val = localStorage.getItem(key);
    if (val == null) return null;
    return JSON.parse(val);
}

// Game Notes
vgaPlanets.prototype.saveObjectNote = function (id, type, obj) {
    var note = this.getNote(id, type);
    if (note == null)
        note = this.addNote(id, type);
    note.changed = 1;
    note.body = JSON.stringify(obj);
}
    
vgaPlanets.prototype.loadObjectNote = function (id, type) {
    var note = this.getNote(id, type);
    if (note != null && note.body != "")
        return JSON.parse(note.body);
    else
        return null;
}

//Aliases to old function names for legacy scripts
vgaPlanets.prototype.saveObjectAsNote  = vgaPlanets.prototype.saveObjectNote;
vgaPlanets.prototype.getObjectFromNote = vgaPlanets.prototype.loadObjectNote;

// Local File

vgaPlanets.prototype.getObjectExportLink = function (obj, filename) {
    var link = $( "<a/>", {
        href: "file://" + filename,
        text: filename,
        download: filename,
        title: filename,
        click: function(ev) { $(this).attr("href", "data:," + JSON.stringify(obj)); return true; }
    });
    return link;
}

//
// END Storage Functions
//
 
//
// START Bundle Save
//
 
vgapSaveBundle = function (id) {
    this.id = id;
    this.data = new dataObject();
    this.objs = [];
}
vgapSaveBundle.prototype = {
    add: function(obj) {
        this.objs.push(obj);
    },
    datalength: function() {
        return this.data.data.length;
    },
    merge: function(bundle) {
        this.data.data += bundle.data.data;
        this.objs = this.objs.concat(bundle.objs);
    },
    save: function(callback) {
    
        if (!callback)
            callback = function (result) {vgap.processBundle(result)};
        var out = new dataObject();
        out.add("gameid", vgap.gameId);
        out.add("playerid", vgap.player.id);
        out.add("turn", vgap.settings.turn);
        out.add("version", vgap.version);
        out.add("savekey", vgap.savekey);
        out.add("apikey", vgap.apikey);
        out.add("saveindex", 2);
        var keys = 7;
        keys++; //keycount=

        if (typeof WinJS == 'undefined')
            keys += 2; //2 for jsoncallback=? and jquery unique id
        else
            keys += 1; //random cache preventer

        if (nu.isfacebook)
            keys -= 2;
        out.data += this.data.data;
            keys += this.objs.length;
        out.add("keycount", keys);

        vgap.request("/game/save", out, callback);
    }
}

vgaPlanets.prototype.processBundle = function (result) {
    var bundle = vgap.savebundles.shift();
    if (result) {
        if (result.success) {
            console.log("bundle OK");
            //mark completed things as saved.
            for (var i = 0; i < bundle.objs.length; i++) {
                var obj = bundle.objs[i];
                if (obj === "Relations") {
                    if (this.relationChanged == 2) this.relationChanged = 0;
                }
                else {
                    if (obj.changed == 2) obj.changed = 0;
                }
            }
        }
        else {
            if (result.error == "INVALID SAVE KEY")
                vgap.disabled();
            else if (result.error.toLowerCase().indexOf("data validation error") >= 0) {
                alert("A data validation error has occured. This is most likely caused by a disconnection or failed save. You will need to reload your turn to prevent any data from being corrupted.");
                this.readOnly = true;
                this.indicator.text("Read Only");
                this.indicateOn();
            }
            else
                alert(result.error);
        }
        if (this.disconnect) {
            this.disconnect = false;
            this.indicateOff();
        }
    }
    else {
        //We appear to be disconnected from the internet.  Warn the user.
        vgap.disconnected();
    }
    
    this.sendBundles()
}            

vgaPlanets.prototype.getSaveBundle = function(id) {
    var bundle = null;
    // If no id, just make a new blank bundle
    if (typeof id === "undefined" || id == null)
        bundle = new vgapSaveBundle(null);
    
    // otherwise, look through the current list and return match if found
    else for (var i = 0; i < this.savebundles.length; i++ && bundle == null) {
        var b = this.savebundles[i];
        if (b.id === id)
            return b;
    }
    
    // not found, id specified, make new bundle with that id
    bundle = new vgapSaveBundle(id);
    
    // if we made it this far, should be a new bundle. Add it to the list and return it.
    this.savebundles.push(bundle);
    return(bundle);
}


// Goes through all saveable objects, and bundles them up according to data validation
// requirements. ie. Everything in the same location is saved together.
// Result is a populated vgap.savebundles array with items that can be saved directly
// via vgap.bundleSave(), or packed farther with vgap.bundlePack()
vgaPlanets.prototype.buildBundles = function () {       
            
    vgap.savebundles = [];

    //order of these sets is important because of data validation code.
    for (var i = 0; i < this.myships.length; i++) {
        if (this.myships[i].changed > 0) {
            var bundle;
            var ship = this.myships[i];
            //data validation: if we save a ship, we always save our own planet if at same location
            var planet = vgap.planetAt(ship.x, ship.y);
            if (planet != null && planet.ownerid == ship.ownerid) {
                planet.changed = 1;                
                bundle = vgap.getSaveBundle(planet.id);
            }
            else {
                bundle = vgap.getSaveBundle(ship.x + "-" + ship.y);
            }
            bundle.add(ship);
            bundle.data.add("Ship" + ship.id, this.serializeShip(ship), false);
            ship.changed = 2;
        }
    }
    for (var i = 0; i < this.stock.length; i++) {
        var item = this.stock[i];
        if (item.changed > 0 && !item.inserted) {
            //data validation: if we save a stock, we always save the planet
            var starbase = vgap.getStarbaseById(item.starbaseid);
            var planet = vgap.getPlanet(starbase.planetid);
            planet.changed = 1;
            var bundle = vgap.getSaveBundle(planet.id);
            bundle.add(item);
            bundle.data.add("Stock" + item.id, this.serializeStock(item), false);
            item.changed = 2;
        }
    }
    for (var i = 0; i < this.myplanets.length; i++) {
        if (this.myplanets[i].changed > 0) {
            var planet = this.myplanets[i];
            var bundle = vgap.getSaveBundle(planet.id);
            bundle.add(planet);                
            bundle.data.add("Planet" + planet.id, this.serializePlanet(planet), false);
            planet.changed = 2;

            //data validation: if we save a planet, we always save the starbase as well
            var starbase = vgap.getStarbase(planet.id);
            if (starbase != null)
                starbase.changed = 1;
        }
    }
    for (var i = 0; i < this.mystarbases.length; i++) {
        if (this.mystarbases[i].changed > 0) {
            var starbase = this.mystarbases[i];
            var bundle = vgap.getSaveBundle(starbase.planetid);
            bundle.add(starbase);                  
            bundle.data.add("Starbase" + starbase.id, this.serializeStarbase(starbase), false);
            starbase.changed = 2;
        }
    }
    for (var i = 0; i < this.notes.length; i++) {
        if (this.notes[i].changed > 0) {
            var bundle = vgap.getSaveBundle();
            bundle.add(this.notes[i]);             
            bundle.data.add("Note" + this.notes[i].targetid + this.notes[i].targettype, this.serializeNote(this.notes[i]), false);
            this.notes[i].changed = 2;
        }
    }
    if (this.relationChanged > 0) {
        var bundle = vgap.getSaveBundle("Relations");        
        for (var i = 0; i < this.relations.length; i++) {
            bundle.add("Relations");
            bundle.data.add("Relation" + this.relations[i].id, this.serializeRelation(this.relations[i]), false);
        }
        this.relationChanged = 2;
    }
    console.log("BUILD: " + this.savebundles.length);
}

vgaPlanets.prototype.packBundles = function(sizelimit) {
    if (!sizelimit) sizelimit = this.bundlesize;
    if (!sizelimit) sizelimit = 15500;
    var packed = [];
    while (this.savebundles.length > 0) {
        var bundle = this.savebundles.shift();
        bundle.id = "Packed";
        packed.push(bundle);
        for (var i = 0; i < this.savebundles.length; i++) {
            testbundle = this.savebundles[i];
            if (bundle.datalength() + testbundle.datalength() <= sizelimit) {
                bundle.merge(testbundle);
                this.savebundles.splice(i, 1);
                i--;
            }
        }         
    }
    
    this.savebundles = packed;
    console.log("PACK:  " + this.savebundles.length);    
}

// Only actually sends the first bundle, but callbacks should keep calling this until
// vgap.savebundles is empty (everything has been attempted)
vgaPlanets.prototype.sendBundles = function() {
    if (this.savebundles.length == 0) {
        this.saveInProgress = 0;
        return;
    }
    this.savebundles[0].save();
}

vgaPlanets.prototype.bundleSave = function () {

    if (this.inHistory)
        return;
    
    if (this.game.status == 3) //finished
        return;
    
    if (this.readOnly) {
        alert("Data will not be saved. This window is read only.");
        return;
    }
    
    //only one save at a time, or we can get them arriving out of order
    if (this.saveInProgress > 0)
        return;
    
    this.saveInProgress = 2;
        
    this.buildBundles();
    this.packBundles();
    this.sendBundles();        

}

//
// END Bundle Save
//


// These Have Changed - commenting out for now
/*
vgapMap.prototype.zoomlevels = [
    0.2,
    0.4,
    0.6,
    0.8,
    1,
    1.4,
    2,
    2.8,
    3.9,
    5.5,
    7.7,
    10.8,
    15.1,
    21.1,
    29.5,
    41.3,
    57.8,
    80.9,
    113.3,
    158.6,
    222.2,
    310.8,
    435.1,
    609.1
];
*/

pluginTemplate = function() {};
pluginTemplate.prototype = {

    isToolkitPlugin: true,
    useOwnContext: true,
    
    saveObjectLocal: function (key, obj, isGameSpecific) {
        var savekey = this.name;
        if (isGameSpecific) savekey += "." + vgap.game.id;
        savekey += "." + key;
        vgap.saveObjectLocal(savekey, obj);
    },
    
    loadObjectLocal: function (key, isGameSpecific) {
        var savekey = this.name;
        if (isGameSpecific) savekey += "." + vgap.game.id;
        savekey += "." + key;
        return vgap.loadObjectLocal(savekey);
    },
    
    saveObjectNote: function (id, object) {
        vgap.saveObjectNote(id, this.notetype, object);
    },
    
    loadObjectNote: function (id) {
        return vgap.loadObjectNote(id, this.notetype);
    }   

}

vgapPluginToolkit = function() {};
vgapPluginToolkit.prototype = {
    version: VERSION,
    makeToolkitPlugin: function (plugin) {
        if (!plugin.isToolkitPlugin)
            plugin.__proto__ = pluginTemplate.prototype;
        if (!plugin.notetype)
            plugin.notetype = -(this.bigintHash(plugin.name));
    },
    registerPlugin: function (plugin) {
        this.makeToolkitPlugin(plugin);
        vgap.registerPlugin(plugin, plugin.name);
    },
    bigintHash: function (string) {
        return parseInt(string.replace(/[_\W]/g, ""), 36) % 2147483648;
    }
    
}   

vgaPlanets.prototype.toolkit = new vgapPluginToolkit();



// Test function to mark everything as changed
// Mainly used for testing bundleSave
vgaPlanets.prototype.testChanged = function (changeState, excludenotes) {

    //set every object which has a change state of saveIndex to changeState 
    for (var i = 0; i < this.myplanets.length; i++) {
            this.myplanets[i].changed = changeState;
    }
    for (var i = 0; i < this.myships.length; i++) {
            this.myships[i].changed = changeState;
    }
    for (var i = 0; i < this.mystarbases.length; i++) {
            this.mystarbases[i].changed = changeState;
    }
    

    this.relationChanged = changeState;

    if (excludenotes) return;  
    for (var i = 0; i < this.stock.length; i++) {
        var item = this.stock[i];
            item.changed = changeState;
    }    
    for (var i = 0; i < this.notes.length; i++) {
            this.notes[i].changed = changeState;
    }
    
}


} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script); 
document.body.removeChild(script); 
    