// ==UserScript==
// @name          Planets.nu Map Toolkit Plugin Template
// @description   Template for designing toolkit based plugins
// @include       http://*.planets.nu/*
// @include       http://planets.nu/*
// @version 0.1
// ==/UserScript==
 
function wrapper () { // wrapper for injection

    
var pluginName = "ToolkitTemplate";

if (!vgap) return;
if (vgap.version < 3) return;

if (!vgap.toolkit) {
    var html = "<div class=ToolkitWarning style='width: 600px; height: 200px; position: absolute; top: 50%; left: 50%; margin-left: -310px; margin-top: -110px; padding: 20px; background-color: #888888'>";
    html    += "<div style='width: 100%; text-align: right;'><a onclick='$(\"div.ToolkitWarning\").remove(); return false;'><span style='padding: 5px; background-color: #aaaaaa; cursor: pointer;'>X</span></a></div>";
    html    += "WARNING: Toolkit Not Installed<br><br>";
    html    += "The plugin <span style='font-style: italic;'>" + pluginName + "</span> requires the Planets.nu Plugin Toolkit to be installed.<br><br>";
    html    += "To install the latest toolkit, click <a href='http://userscripts.org/scripts/source/179304.user.js' target='_blank'>HERE</a><br><br>";
    html    += "Note: If you have installed the toolkit and are still getting this error, you may need to adjust the script execution order so that the toolkit is run first.</div>";
    $("body").append(html);
    return;
}
    
var plugin = {
    name: pluginName
    
}
vgap.toolkit.registerPlugin(plugin);


    
} //wrapper for injection

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script); 
document.body.removeChild(script); 
