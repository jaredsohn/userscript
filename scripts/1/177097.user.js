// ==UserScript==
// @name          Planets.nu add info to fleet pics
// @description   Adds who-is-towing-who and ready indicators to fleet pics
// @include       http://planets.nu/*
// @version 0.1
// ==/UserScript==


function wrapper () { // wrapper for injection

    if (vgap.version < 3) return;

    leftContent.prototype.showFleetInfo = function () {
    
            //return;
    
            var ships = vgap.shipsAt(this.obj.x, this.obj.y);
    
            //towing
            
            //Uncomment next 2 lines if wrapping gets screwed up
            //var size = $(".FleetPic").width()-2;
            //$(".FleetPic").css({"width": size + "px", "height": size+ "px"});
    
            $(".FleetPic").css("border", "solid 1px transparent").removeClass("FleetTower");
    		var colors=["#ff00ff", "#ffffff", "#0000ff", "#00ff00", "#00ffff", "#ffff00", "#ff6600", "#ffccff", "#669966", "#666699"];
            var colorindex = 0;
            for (var i = 0; i < ships.length; i++) {
                var color = colors[colorindex];
                var ship = ships[i];
                var tower = vgap.isTowTarget(ship.id);
                if (tower != null) {
                    $(".FleetPic[data-id=" + ship.id + "]").css("border", "dashed 1px " + color);
                    $(".FleetPic[data-id=" + tower.id + "]").css("border", "solid 1px " + color);
                    $(".FleetPic[data-id=" + ship.id + "]").addClass("FleetTower");
                    colorindex++;
                    if (colorindex == colors.length)
                        colorindex = 0;
                }
                var ypos = [16, -34, -2]; 
                var html = "<div style='background-image: url(\"http://play.planets.nu/img/game/threereadycheckspace.png\"); background-repeat: no-repeat; height: 13px; width: 10px; background-position: -3px " + ypos[ship.readystatus] + "px; position: absolute; top: 0px; left 0px;'></div>";
                //$(html).appendTo($("#FleetContainer")).css($(".FleetPic[data-id=" + ship.id + "]").position());
                $(".FleetPic[data-id=" + ship.id + "]").wrap("<div style='float: left; position: relative'/>").after(html);
            }
             $("#FleetContainer > .FleetPic").wrap("<div style='float: left; position: relative'/>");
        };
    
    var old_addFleetView = leftContent.prototype.addFleetView;
    leftContent.prototype.addFleetView = function () {
        old_addFleetView.apply(this, arguments);
        this.showFleetInfo();
    }

} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
document.body.removeChild(script); 
    