// ==UserScript==
// @name          Planets.nu map ship display
// @description   new ship display on vga map screen.
// @include       http://planets.nu/*
// @include       http://*.planets.nu/*
// @homepage      http://planets.nu/discussion/utility-script-display-individual-ships-on-map-screen
// @version 1.21
// ==/UserScript==

function wrapper () { // wrapper for injection

	var oldLoadControls = vgapMap.prototype.loadControls; 
	vgapMap.prototype.loadControls = function () {

		oldLoadControls.apply(this, arguments);

		var b = "";
        b += "<li onclick='vgap.map.showShipList();'>Show Ships</li>";
        $("#MapTools li:contains('Measure')").after(b);
        
        b = "<li class='ClearMap' onclick='vgap.deselectAll();'>Clear (x)</li>";		// menu and hotkey called different functions
        $("#MapTools li:contains('Clear')").replaceWith(b);

        vgap.map.shipListMenu();
	};
	
    vgaPlanets.prototype.deselectAll = function() {
		vgap.map.deselect();
        vgap.closeLeft();

	    vgap.map.explosions.remove();
	    vgap.map.explosions = vgap.map.paper.set();
	    
		vgap.map.draw();
	};

	vgapMap.prototype.showShipList = function () {
		var b = vgap.map.genShipList();
		vgap.map.shipListControl = $(b).replaceAll("#shipList");
        vgap.map.shipListMenu = $("#shipList :contains('Ship List')");
		
        vgap.map.shipListControl.css("marginTop", "-" + vgap.map.shipListMenu.height() + "px");
        vgap.map.shipListControl.mouseleave(function() {
            vgap.map.closeShipList();
        });
        vgap.map.shipListControl.mouseenter(function() {
            vgap.map.openShipList();
        });

        vgap.map.shipListControl.show();
        vgap.map.shipListShow = true;
    	vgap.map.shipListOffset = 0;

        b = "<li onclick='vgap.map.hideShipList();'>Hide Ships</li>";
        $("#MapTools li:contains('Show Ships')").replaceWith(b);
	};

	vgapMap.prototype.hideShipList = function () {
		vgap.map.shipListControl.hide();
        vgap.map.shipListShow = false;
        vgap.deselectAll();

        b = "<li onclick='vgap.map.showShipList();'>Show Ships</li>";
        $("#MapTools li:contains('Hide Ships')").replaceWith(b);
	};
	
	vgapMap.prototype.genShipList = function() {
        var b = "<div id='shipList'><ul id='MapTools'>";
        
        for (var i=0; i<nudata.races[vgap.player.raceid].hullids.length; ++i) {
        	var id = nudata.races[vgap.player.raceid].hullids[i];
        	var hull = vgap.getArray(nudata.hulls, id);
        	b += "<li onclick='vgap.map.showShips("+id+");'>"+hull.name+"</li>";
        }

        b += "</ul><div id='MapToolsMenu' class='DownArrow'>Ship List</div></div>";

        return b;
	};

	vgapMap.prototype.shipListMenu = function () {
		var b = "<div id='shipList'></div>";
        vgap.map.shipListControl = $(b).appendTo("#PlanetsContainer");
        vgap.map.shipListControl.hide();
                        
        b = "<style type='text/css'>\n";
        b += "#shipList{right:345px;background-color:#333;border-bottom-left-radius:10px;-moz-border-radius-bottomleft:10px 10px;-webkit-border-bottom-left-radius:10px 10px;top:0;display:none;position:absolute;color:#fff;z-index:5}\n";
        b += "#MapTools li{background-position:100px -136px;background-image:url(./img/game/maptools.png);background-repeat:no-repeat}\n";
        b += "</style>";

        $("head").append(b);

        vgap.map.shipListShow = false;
	};

	vgapMap.prototype.openShipList = function() {
	    this.shipListMenu.removeClass("DownArrow");
	    this.shipListMenu.addClass("UpArrow");
	    if (vgap.animations) {
	        this.shipListControl.animate({marginTop: "0px"}, "fast");
	    } else {
	        this.shipListControl.css("marginTop", "0px");
	    }
	    this.shipListOpen = true;
	};
	
	vgapMap.prototype.closeShipList = function() {
	    this.shipListMenu.removeClass("UpArrow");
	    this.shipListMenu.addClass("DownArrow");
	    var a = "-" + (this.shipListControl.height() - this.shipListMenu.height()) + "px";
	    if (vgap.animations) {
	        this.shipListControl.animate({marginTop: a}, "fast");
	    } else {
	        this.shipListControl.css("marginTop", a);
	    }
	    this.shipListOpen = false;
	};	
	
	vgapMap.prototype.showShips = function(id) {
		var offy = vgap.map.shipListOffset;
		var colors = ["aqua", "fuchsia", "lime", "red", "yellow", "blue", "green", "purple", "silver", "teal", "maroon", "navy", "gray", "olive", "white"];
    	
    	var hull = vgap.getArray(nudata.hulls, id);
		var b = "<li onclick='' style=color:"+colors[offy]+" disabled='disabled'>"+hull.name+"</li>";
    	$("#shipList ul li:contains("+hull.name+")").replaceWith(b);

    	for (var i = 0; i < vgap.myships.length; i++) {
			var ship = vgap.myships[i];
			var ships = vgap.shipsAt(ship.x, ship.y);
			var offx = 2;
			
			for (var j=0; j<ships.length; ++j) {
				if ((ship = ships[j]) != null) {
					if (ship.hullid == id) {
						
						vgap.map.explosions.push(vgap.map.paper.rect(vgap.map.screenX(ship.x + offx * 6), vgap.map.screenY(ship.y + offy * 7), 4, 4).attr({"fill":colors[offy],"opacity":1}));
						++offx;
					}
				}
			}
		}
    	++vgap.map.shipListOffset;
	};
}

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);