// ==UserScript==
// @name          Planets.nu Random FC
// @description   Set random friendly codes for ships and planets
// @include       http://planets.nu/home
// @include       http://*.planets.nu/*
// @grant none
// @version 0.2
// ==/UserScript==

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
        };
        vgaPlanets.prototype.addOns[addOnName].current = {};
    };
    
vgaPlanets.prototype.setupAddOn("randomFC");

// END Add-On Header



vgaPlanets.prototype.addOns.randomFC.save=function(){
	this.settings.characters=$("#randomCharacters").val();
	this.saveSettings();
	vgap.dash.showSettings();
};

vgaPlanets.prototype.addOns.randomFC.oldShowSettings = vgapDashboard.prototype.showSettings;

vgapDashboard.prototype.showSettings = function () {
	vgaPlanets.prototype.addOns.randomFC.oldShowSettings.apply(this,arguments);
	if (!vgap.addOns.randomFC.settings.characters) vgap.addOns.randomFC.settings.characters="qwertzuiop+#lkjhgfdsa<yxcvbnm,.->YXCVBNM;:_LKJHGFDSAQWERTZUIOP*=)(/&%$§^°!1234567890 ";
	var characters=vgap.addOns.randomFC.settings.characters;
	var html="<br /><br /><h3>Settings for Random Friendly code</h3>"
	html += "<div id='ShipListModTable'><table>";
        html += "<td><input id='randomCharacters' type='text' value='"+characters+"' maxlength='100' size='100'/></td>";
	html+="<td><div id='LaunchSim' onclick='vgap.addOns.randomFC.save();' title='Save characters'>Set characters to choose from</div></td></tr></table><hr />";
	$('[onclick="vgap.resetTurn();"]').after(html);
        this.pane.jScrollPane();
};



//randomFC
vgaPlanets.prototype.addOns.randomFC.characters="qwertzuiop+#lkjhgfdsa<yxcvbnm,.->YXCVBNM;:_LKJHGFDSAQWERTZUIOP*=)(/%$§^°!1234567890 ";

vgaPlanets.prototype.addOns.randomFC.getRandomFC= function () {
	var r; 
	var FC="";
	var characters=this.settings.characters;
	if (!characters) characters=this.characters;
	
	var anz=characters.length;
	for (var i=0;i<3;i++)
	{
		do {
			r = Math.random();
		}
		while(r == 1.0);
		FC+=characters.charAt(parseInt(r * anz));
	}
	return FC;
};

vgaPlanets.prototype.addOns.randomFC.old_getPlanetCodes=vgaPlanets.prototype.getPlanetCodes;

vgaPlanets.prototype.getPlanetCodes= function (hasBase) {
        var fcodes = new Array();
	fcodes=this.addOns.randomFC.old_getPlanetCodes.apply(this, arguments);
        fcodes.push({ title: "Random FC", desc: "Set random friendly code.", code: this.addOns.randomFC.getRandomFC() });
        return fcodes;
    };

vgapShipScreen.prototype.old_load=vgapShipScreen.prototype.load;

vgapShipScreen.prototype.load=function(ship)
{
	this.old_load.apply(this, arguments);
	this.fcodes.push({ title: "Random FC", desc: "Set random friendly code.", code: vgap.addOns.randomFC.getRandomFC() });
};

}
var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = "(" + wrapper + ")();";

document.body.appendChild(script);