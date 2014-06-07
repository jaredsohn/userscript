// ==UserScript==
// @name        Planets.nu fullscreen
// @namespace   planets.nu
// @include     http://*planets.nu/*
// @version     0.1
// @grant	none
// @description Adds a fullscreen button
// ==/UserScript==


// Just using it to test the new ui plugin system
// Also when playing on my smartphone, I need more space
// Version 0.1 overloads the callPlugins function! So use it carefully in combination with other scripts that use the new UI

function wrapper () { // wrapper for injection

plugin = {
	name: "Fullscreen",
	id: 0, //number in vgap.plugins array
	//helpers (source http://demo.staticfloat.com/fullscreen/fullscreen.php)
	pfx: ["webkit", "moz", "ms", "o", ""],

	RunPrefixMethod: function (obj, method) {
		var p = 0, m, t;
		while (p < this.pfx.length && !obj[m]) {
			m = method;
			if (this.pfx[p] == "") {
				m = m.substr(0,1).toLowerCase() + m.substr(1);
			}
			m = this.pfx[p] + m;
			t = typeof obj[m];
			if (t != "undefined") {
				this.pfx = [this.pfx[p]];
				return (t == "function" ? obj[m]() : obj[m]);
			}
			p++;
		}
	},
		
	//function
	toggleFullscreen: function() {
		//alert("test");
		if (this.RunPrefixMethod(document, "FullScreen") || this.RunPrefixMethod(document, "IsFullScreen")) {
			this.RunPrefixMethod(document, "CancelFullScreen");
			//document.getElementById("SecondMenu").style["background"]="";
			//alert("end fullscreen");
		}
		else {
			this.RunPrefixMethod(document.getElementById("PlanetsContainer"), "RequestFullScreen");
			//document.getElementById("SecondMenu").style["background"]="grey";
			//alert("fullscreen");
		}
	},
	
	//integration
	showsummary: function () {
		vgap.hideSecond();
		vgap.secondMenu.empty();
		vgap.addSecondMenuItem("Fullscreen", function() {vgap.plugins["fullscreen"].toggleFullscreen()});
		vgap.showSecond();
	}
}

//vgap.plugins.push(plugin);
vgap.plugins["fullscreen"]=plugin;

vgap.callPlugins= function(func) {
for (var p in vgap.plugins) {
		var plugin=	vgap.plugins[p];
		if (typeof(plugin[func])=="function") plugin[func].call();
	}
}

} //Wrapper


var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);