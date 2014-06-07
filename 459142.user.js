// ==UserScript==
// @name       ROBLOX Launcher
// @namespace  http://www.roblox.com/user.aspx?id=3659905
// @version    1.0.0
// @description  Launch ROBLOX games using the ROBLOX Launcher by celliott1997.
// @match      http*://*.roblox.com/*-place?id=*
// @copyright  2014+
// @author     celliott1997
// ==/UserScript==

function LaunchGame(PlaceID){
    window.location.href = "roblox://"+PlaceID;
};

function BindToLauncher(){
    var PlaceID = location.href.match(/-place\?id=(\d+)/i)[1];
    LaunchGame(PlaceID);
};

function MakeControls(){
    if (document.getElementById("ctl00_cphRoblox_NewGamePageControl_VisitButtons_MultiplayerVisitButton") != null){
        var VisitButtons = document.getElementById("ctl00_cphRoblox_NewGamePageControl_VisitButtons_MultiplayerVisitButton").parentNode;
        
        if (!document.getElementById("LauncherInjection")){
            var Inject = document.createElement("meta");
            Inject.setAttribute("id", "LauncherInjection");
                     
            var Launcher = document.createElement("a");
            Launcher.setAttribute("class", "btn-medium btn-neutral");
            Launcher.innerHTML = "Launcher";
            Launcher.onclick = function(){BindToLauncher();};
            VisitButtons.appendChild(Launcher);
            
            document.body.appendChild(Inject);
        };
    };
};

document.body.onload = MakeControls();