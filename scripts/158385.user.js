// ==UserScript==
// @name       GamezAion Auto-Voter
// @namespace  http://gaav.tk/
// @version    3.7
// @description  The name says it all!
// @match      http://*gamezaion.com/*
// @match      http://www.xtremetop100.com/*
// @match      http://topofgames.com/*
// @match      http://www.rpg-paradize.com/*
// @match      http://www.gtop100.com/*
// @match      http://www.aionlist.com/*
// @copyright  2013+, @Gir #PCA
// ==/UserScript==

window.onload = function(){
    var redirect = function(loc){
        window.location = loc;
    }
    
    var clearCookies = function() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        
        //alert('Yan clear ya iyo kunel cookies. Login ya lang ka dayun.');
        window.location.reload(true);
    }

    switch(window.location.href){
        case "http://gamezaion.com/index.php?page=vote&vote=5":
            clearCookies();
        break;
        case "http://www.xtremetop100.com/aion-online":
            redirect("http://www.xtremetop100.com/out.php?site=1132303709");
        break;
        case "http://topofgames.com/":
            redirect("http://topofgames.com/tracker.php?do=out&id=19242");
        break;
        case "http://www.rpg-paradize.com/site-Gamez+AION+-+FULL+3.0+SUPPORT-18621":
            redirect("http://www.rpg-paradize.com/out.php?num=18621");
        break;
        case "http://www.gtop100.com/aiononline":
            redirect("http://www.gtop100.com/out.php?id=46329");
        break;
        case "http://www.aionlist.com/":
            redirect("http://gamezaion.com/");
        break;
    }
}