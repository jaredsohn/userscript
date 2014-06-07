// ==UserScript==
// @name       Imgur - Autonext
// @version    0.0	
// @description  Autonext
// @match      http://imgur.com/gallery/*
// @copyright  2014+
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    var autoscroll = getCookie("autoscroll");
    var timeoutLength = 10000;
    
    function getCookie(cname)
    {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) 
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }
        return "";
    }

    var tid    
    if(autoscroll == 1){
        tid = setTimeout(moveAlong, timeoutLength);   
    }
    
    function abortTimer() { // to be called when you want to stop the timer
        clearTimeout(tid);
    }
    
    function moveAlong() {
        autoscroll = getCookie("autoscroll");
        if(autoscroll == 1){
            $('.navNext').click();
            setTimeout(moveAlong, timeoutLength);   
        }else{
            abortTimer();
        }
        
    }
    
    var keys = new Array();
    $( "body" ).keydown(function(e) {
        keys[keys.length] = e.keyCode;
        if((keys[keys.length - 2] == 91) && (keys[keys.length - 1] == 39)){
            if(autoscroll == 1){
                document.cookie = "autoscroll=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }else{
                document.cookie="autoscroll=1";
	            $('.navNext').click();
				tid = setTimeout(moveAlong, timeoutLength);   
            }
        }else if(keys[keys.length - 1] == 37){
            document.cookie = "autoscroll=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    });
    
}

// load jQuery and execute the main function
addJQuery(main);

