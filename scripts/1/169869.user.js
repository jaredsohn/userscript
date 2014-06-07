// ==UserScript==
// @name       Planets.nu - Smooth(er) zoom.
// @version    1.0
// @description  Change the behavior of scrollwheel zoom to better fit Apple trackpad usage.
// @match      http://planets.nu
// @match      http://play.planets.nu
// @match      http://test.planets.nu
// @copyright  2013, Jérôme Tremblay (DeathStroke)
// ==/UserScript==


// 1.0 Initial release

function wrapper () { // wrapper for injection
    
    vgapMap.prototype.incZoom = function (delta) {

        if (vgap.map.zoom <= 0.2 && delta < 0)
            return;

        if (vgap.map.zoom >= 500 && delta > 0)
            return;

        if (delta > 0) {
                vgap.map.zoom *= 1.05;
        }
        else {
                vgap.map.zoom /= 1.05;
        }
        this.setZoom(parseFloat(vgap.map.zoom.toFixed(1)));
    }

} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);
