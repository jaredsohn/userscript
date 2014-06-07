// ==UserScript==
// @name        DC
// @namespace   1
// @description 1
// @include     http://rus.gamedp.tmc/myequip_rus/main.php
// @version     1
// ==/UserScript==


(function(){
	alter('test');
    var unsafeWindow= this.unsafeWindow;
    (function(){
        var test_scr= document.createElement("script");
        var tid= ("t" + Math.random() + +(new Date())).replace(/\./g, "");
        test_scr.text= "window."+tid+"=true";
        document.querySelector("body").appendChild(test_scr);
        if (typeof(unsafeWindow) == "undefined" || !unsafeWindow[tid]) {
            if (window[tid]) {
                unsafeWindow= window;
            } else {
                var scr= document.createElement("script");
                scr.text= "(" +
                    (function() {
                        var el= document.createElement('unsafeWindow');
                        el.style.display= 'none';
                        el.onclick=function(){return window};
                        document.body.appendChild(el);
                    }).toString() + ")()";
                document.querySelector("body").appendChild(scr);
                this.unsafeWindow= document.querySelector("unsafeWindow").onclick();
                unsafeWindow= window.unsafeWindow;
            };
        }
    })();
    
    
    var already_run = false;
    
    if (! AddCustom()) window.addEventListener ("load", AddCustom, false);

    function exec(fn) {
        var script = document.createElement('script');
        script.setAttribute("type", "application/javascript");
        script.textContent = '(' + fn + ')();';
        document.body.appendChild(script);
        //document.body.removeChild(script);
    }

    function AddCustom() {
        exec(function() {
			alter('test');
            g_chat_pwd = callChatLogin();
            g_player["chat_pwd"] = g_chat_pwd;
            g_player["id"] = 314;
            g_player["nick"] = "1032";
            g_player["talk_enable"] = true;
            //g_player["guild_master"] = 1;
            //g_player["guild_id"] = 1;
             g_channel["union"]["connected"] = true;            
        });
    }
})();