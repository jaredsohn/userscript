// ==UserScript==
// @name        WeeWar: Web2Notify Notifier
// @namespace   http://jawtek.com
// @description Userscript for WeeWar. Disables email notifications and sends notifications via Web2Notify. Based off of Fluid script by Jesse Newland
// @include     http://*weewar.com*/game*
// @author      Jason Worley
// ==/UserScript==

(function (realWin) {
    var e = document.createElement("script");
    e.id = "JawTek";
    e.type = "text/JavaScript";
    document.getElementsByTagName("head")[0].appendChild(e);
    e.src = "http://localhost:9887/script.js/";
    
	function $(id) {
		return document.getElementById(id);
	}
	
    window.addEventListener("load", function(e) {
        if(realWin.JawTek != null)
        {
            if(realWin.JawTek.Web2Notify != null)
            {
                var W2N = realWin.JawTek.Web2Notify;
                W2N.registerApp("WeeWar","http://weewar.com/images/square3.gif");
                W2N.registerNotifcation("WeeWar", "Config Change", "A configuration change has been made");
                W2N.registerNotifcation("WeeWar", "Your Turn", "Your turn to move on WeeWar");
               
                var title = document.title;
               
                if (title.search("Game:") > -1 ) {
                   
                    var game_name_start = title.search("Game: ");
                    var game_name_end = title.search(" on Weewar.com");
                    var game_name = title.slice(game_name_start+6,game_name_end);
                   
                    if ($('emailNotification').checked) {
                        W2N.notify("Config Change", "WeeWar: " + game_name, "Disabling email notifications", "http://weewar.com/images/weewar200.jpg");
                        $('emailNotification').checked = false;
                    }
                }
               
                if (title.search("Your turn") == 0) {
                    W2N.notify("Your Turn", "WeeWar: " + game_name, "It's your turn!", "http://weewar.com/images/weewar200.jpg");
                }
            }
        }
    }, false);
})((unsafeWindow != null) ? unsafeWindow : window);
