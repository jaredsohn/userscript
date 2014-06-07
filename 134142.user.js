// ==UserScript==
// @author         mslliviu 
// @name           YahooAddStop
// @namespace      Yahoo
// @description    Blocheaza reclama din dreapta
// @version        1.1
// @include        http://*.mail.yahoo.com/*
// @include        https://mail.google.com/*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.11/jquery-ui.min.js
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}


addJQuery(Main);

function Main()
{
        // Old yahoo
	//$("#theAd").css("display","none");
	//$("#paneshell").css("width","110%");
	//$("#slot_REC").css("display","none");
	//$("#theMNWAd").css("display","none");
	//$(".col-b").css("display","none");
        //$("#slot_MON").css("display","none");

        //Gmail
        $(".mq").css("height","2px");
}
