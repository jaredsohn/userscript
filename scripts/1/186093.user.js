// ==UserScript==
// @name         GR-Autologin
// @description  To skip login page on GR

// @version      0.1
// @date    10.12.2013

// @-icon        http://www.planetromeo.com/v1/img/touch-icon.png
// @-downloadURL http://userscripts.org/scripts/source/164943.user.js

// @match       *://*.gayromeo.com/main/login.php
// @match       *://*.planetromeo.com/main/login.php
// @match       *://83.98.143.20/main/login.php

// @exclude     *://*.gayromeo.com/*main/heartbeat.php
// @exclude     *://*.planetromeo.com/*main/heartbeat.php
// @exclude     *://83.98.143.20/*main/heartbeat.php

// ==/UserScript==

addJQuery(function() {

    /////////////////////////////////////
    //     _____                __  _
    //    / ____|              / _|(_)
    //   | |      ___   _ __  | |_  _   __ _
    //   | |     / _ \ | '_ \ |  _|| | / _` |
    //   | |____| (_) || | | || |  | || (_| |
    //    \_____|\___/ |_| |_||_|  |_| \__, |
    //                                  __/ |
    //                                 |___/

    
	config = {
		
		Login : {
        	Name : 'YOUR NAME' ,
		Pass : 'PASSWORT'
            }

	}
    
	$('#id_username').val (config.Login.Name)
    $('#id_password').val (config.Login.Pass)
    $('login').submit()
    $('.button').click()

});

//======================================================================

//         _   ____                              _____              _          _  _
//        | | / __ \                            |_   _|            | |        | || |
//        | || |  | | _   _   ___  _ __  _   _    | |   _ __   ___ | |_  __ _ | || |
//    _   | || |  | || | | | / _ \| '__|| | | |   | |  | '_ \ / __|| __|/ _` || || |
//   | |__| || |__| || |_| ||  __/| |   | |_| |  _| |_ | | | |\__ \| |_| (_| || || |
//    \____/  \___\_\ \__,_| \___||_|    \__, | |_____||_| |_||___/ \__|\__,_||_||_|
//                                        __/ |
//                                       |___/
// from  http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script


function addJQuery(callback) {
    // create a new <_script> element and insert it into the document.body
    // 'callback'  will be the body of the script

    var fn_scriptInject =
        function() {
            var script;
            script = document.createElement("script");
            script.textContent = "(" + callback.toString() + ")();";
           document.body.appendChild(script);
            
//			$('<script>').text("(" + callback.toString() + ")();").appendTo('<body>')
            
        };
    if (typeof $ !== 'undefined') {
        // jQuery is loaded
 
        // Unload jQuery
        jQuery.noConflict();
            
        // $(fn_scriptInject);
        // $(callback);

    } //else {

        // jQuery is not loaded
        // optional TODO: check jQuery Version
        var script;
        script = document.createElement("script");
        script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js");
    
//      script.addEventListener('load', fn_scriptInject, false);
        script.addEventListener('load', callback, false);

        document.body.appendChild(script);
    //}

}
 //======================================================================