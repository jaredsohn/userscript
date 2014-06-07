// ==UserScript==
// @name       Silicon Dioxide
// @namespace  http://userscripts.org/scripts/show/183038
// @author     Throne3d
// @version    0.1
// @description  Automate certain features on the popular game "Sandcastle Builder"
// @match      http://castle.chirpingmustard.com/castle.html
// ==/UserScript==

(function(){
    "use strict";
    var sidi = {
        delay: 1,
        clickBeach: 0,
        clickBeachDelay: NaN,
        clickNum: 0,
        optionsOpen: false,
        optionsMenu: null,
        optionsClick: function(e){
            if (sidi.optionsOpen) {
                sidi.optionsOpen = false;
                sidi.optionsMenu.className = "hidden";
                g('beachAnchor').className = 'unhidden';
				g('beach').className = 'unhidden';
            } else {
                Molpy.showStats = 0;
                Molpy.showOptions = 0;
                Molpy.showExport = 0;
                g('beachAnchor').className = "hidden";
                g('beach').className = "hidden";
                g('options').className = "hidden";
                g('export').className = "hidden";
                g('stats').className = "hidden";
                sidi.optionsOpen = true;
                sidi.optionsMenu.className = "unhidden";
            }
            Molpy.shopRepaint = 1;
            Molpy.boostRepaint = 1;
        },
        log: function(msg){
            if (typeof msg != "string") msg = msg.toString();
            if (typeof console == "undefined") console = {log: function(){}};
            console.log(msg);
        },
        logic: function(){
            if (Molpy.npbONG == 1 && sidi.clickNum >= sidi.clickBeachDelay) { sidi.clickNum-=sidi.clickBeachDelay; Molpy.ClickBeach(); }
            sidi.clickNum++;
        },
        init: function(){
            sidi.clickBeachDelay = 1000 / sidi.clickBeach;
            var prevBtn = document.getElementById("sidioptions");
            if (prevBtn != null) document.removeChild(prevBtn);
            var prevMenu = document.getElementById("sidiopts");
			if (prevMenu != null) document.removeChild(prevMenu);
            var optionsBtn = document.createElement("a");
            optionsBtn.setAttribute("class", "minifloatbox");
            optionsBtn.onclick = sidi.optionsClick;
            optionsBtn.id = "sidioptions";
            var optBtnh = document.createElement("h4");
            optBtnh.innerHTML = "SiO₂ Options";
            optionsBtn.appendChild(optBtnh);
            document.getElementById("sectionControls").appendChild(optionsBtn);
            var optMenu = document.createElement("div");
            optMenu.id = "sidiopts";
            optMenu.setAttribute("style", "height:397px;padding:0 0 0 12px;");
            optMenu.innerHTML = "SiO₂ Options:<br />";
            var optBtn1 = document.createElement("div");
            optBtn1.className = "minifloatbox";
            var optBtn1A = document.createElement("a");
            optBtn1A.innerHTML = "CPS - " + sidi.clickBeach;
            optBtn1A.onclick = function() { 
                var cps = prompt("Number of beach CPS?"); 
                if (parseInt(cps) > 1000 || parseInt(cps) < 0){ alert("Value must be between 0 and 1000!"); return; }
                sidi.clickBeach = parseInt(cps);
                sidi.clickBeachDelay = 1000 / sidi.clickBeach; 
                sidi.optBtn1A.innerHTML = "CPS - " + cps; 
           	};
            optBtn1.appendChild(optBtn1A);
            sidi.optBtn1A = optBtn1A;
            optMenu.appendChild(optBtn1);
            optMenu.className = "hidden";
            sidi.optionsMenu = optMenu;
            document.getElementById("sectionLeft").appendChild(sidi.optionsMenu);
            
            setInterval(sidi.logic, sidi.delay);
            
            Molpy.ExportToggleA = Molpy.ExportToggle;
            Molpy.ExportToggle = function(){ 
                sidi.optionsOpen = false;
                sidi.optionsMenu.className = "hidden"; 
                Molpy.ExportToggleA();
            };
            Molpy.OptionsToggleA = Molpy.OptionsToggle;
            Molpy.OptionsToggle = function(){
                sidi.optionsOpen = false;
                sidi.optionsMenu.className = "hidden";
                Molpy.OptionsToggleA();
            };
            Molpy.StatsToggleA = Molpy.StatsToggle;
            Molpy.StatsToggle = function(){
                sidi.optionsOpen = false;
                sidi.optionsMenu.className = "hidden";
                Molpy.StatsToggleA();
            };
        }
    };
    if (document.body){
        setTimeout(function(){ sidi.init(); }, 300);
    }
}());