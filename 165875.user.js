// ==UserScript==
// @name       		BreadfishRP VoteTracker
// @namespace  		http://bensoft.de
// @version    		1.2
// @description  	Neuste Änderungen: Wahlen sind nun dynamisch und es werden zwei Wahlen gleichzeitig unterstützt
// @match      		http://*.breadfish-rp.de/*
// @exclude			*acp*
// @copyright 		2013+, 946ben, Benjamin Hesse, bensoft.de
// @require       	http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant			GM_setValue
// @grant			GM_getValue
// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest
// ==/UserScript==

var old = new Array(7);

$(document).ready(function () {
	var height = document.documentElement.clientHeight;
    height = height - 160;
    var secheight = height + 130;
    GM_addStyle("#voteBox { \
                height: 160px; \
                margin-top: " + height + "px; \
                opacity: 0.5; \
                background-color: #000; \
                width: 50px; \
                position: fixed; \
                z-index: 300; \
                -webkit-border-top-right-radius: 8px; \
                -moz-border-radius-topright: 8px; \
                border-top-right-radius: 8px; \
                }");
    GM_addStyle("#voteHide { \
                height: 24px; \
                margin-top: " + secheight + "px; \
                width: 24px; \
				margin-left: 10px; \
                position: fixed; \
                cursor: pointer; \
                opacity: 0.5; \
                z-index: 305; \
                }");
    GM_addStyle("#voteChange { \
                height: 24px; \
                margin-top: " + secheight + "px; \
                width: 24px; \
				margin-left: 40px; \
                position: fixed; \
                cursor: pointer; \
                opacity: 0.5; \
                z-index: 305; \
                }");
    GM_addStyle("#voteHide:hover { \
				opacity: 1; \
                }");
    GM_addStyle("#voteChange:hover { \
				opacity: 1; \
                }");
    var margin = 10;
    for(var i = 1; i <= 6; i++) {
        var marg = height + margin;
        GM_addStyle("#voteBoxText" + i + " { \
                    height: 150px; \
                    margin-top: " + marg + "px; \
					margin-left: 5px; \
                    width: 30px; \
                    position: fixed; \
                    z-index: 301; \
                    color: #fff; \
                    }");
        margin = margin + 20;
    }
    margin = 12;
    for(var i = 1; i <= 6; i++) {
        var marg = height + margin;
        GM_addStyle("#voteBoxBar" + i + " { \
                    height: 150px; \
                    margin-top: " + marg + "px; \
					margin-left: 50px; \
                    width: 0px; \
                    height: 14px; \
                    position: fixed; \
                    z-index: 301; \
                    color: #fff; \
					background-color: #444444; \
					font-size: 10px; \
					overflow-x: visible; \
                    }");
        margin = margin + 20;
    }
    $("#headerContainer").before("<div id=\"voteBox\"></div>");
    $("#headerContainer").before("<div id=\"voteBoxText1\"></div><div id=\"voteBoxText2\"></div><div id=\"voteBoxText3\"></div><div id=\"voteBoxText4\"></div><div id=\"voteBoxText5\"></div><div id=\"voteBoxText6\"></div>");
    $("#headerContainer").before("<div id=\"voteBoxBar1\"></div><div id=\"voteBoxBar2\"></div><div id=\"voteBoxBar3\"></div><div id=\"voteBoxBar4\"></div><div id=\"voteBoxBar5\"></div><div id=\"voteBoxBar6\"></div>");
    //$("#headerContainer").before("<div id=\"voteHide\"><img src=\"http://bensoft.de/stuff/hide.png\"></div><div id=\"voteChange\"><img src=\"http://bensoft.de/stuff/switch.png\"></div>");
    $("#headerContainer").before("<div id=\"voteHide\"><img src=\"http://bensoft.de/stuff/hide.png\"></div>");
    if(GM_getValue("voteHide") == 1) {
     	$("#voteBox").hide();
        $("#voteChange").hide();
        for(var i = 1; i <= 6; i++) $("#voteBoxText" + i).hide();
        for(var i = 1; i <= 6; i++) $("#voteBoxBar" + i).hide();
    }
    $("#voteHide").click(function() {
        if(GM_getValue("voteHide") == 1) {
            $("#voteBox").fadeIn();
            $("#voteChange").fadeIn();
            for(var i = 1; i <= 6; i++) $("#voteBoxText" + i).fadeIn();
            for(var i = 1; i <= 6; i++) $("#voteBoxBar" + i).fadeIn();  
            GM_setValue("voteHide", 0);
        } else {
         	$("#voteBox").fadeOut();
            $("#voteChange").fadeOut();
            for(var i = 1; i <= 6; i++) $("#voteBoxText" + i).fadeOut();
            for(var i = 1; i <= 6; i++) $("#voteBoxBar" + i).fadeOut();  
            GM_setValue("voteHide", 1);   
        }
    });
    GM_setValue("voteChoose", 1);
    if(!GM_getValue("voteChoose")) GM_setValue("voteChoose", 1);
    $("#voteChange").click(function() {
        if(GM_getValue("voteChoose") == 2) {
            GM_setValue("voteChoose", 1);
            get();
        } else {
         	GM_setValue("voteChoose", 2);
            get();
        }
    });
    get();
    unsafeWindow.setInterval(get, 5000);
});

function get() {
	GM_xmlhttpRequest({
        method: "GET",
        headers: {
            "Cache-Control": "no-cache, must-revalidate",
            "Expires": "Sat, 26 Jul 1997 05:00:00 GMT"
        },
        url: "http://bensoft.de/stuff/get" + GM_getValue("voteChoose") + ".php",
        onload: function(response) {
            response = response.responseText;
            var split = response.split(";");
            var width = new Array(7);
            width[1] = 500 * split[0] / 100;
            width[2] = 500 * split[1] / 100;
            width[3] = 500 * split[2] / 100;
            width[4] = 500 * split[3] / 100;
            width[5] = 500 * split[4] / 100;
            width[6] = 500 * split[5] / 100;
            var max = 0;
            for(var i = 1; i <= 6; i++) {
				if(width[i] > max) max = width[i];
				if(width[i] == old[i]) continue;
				$('#voteBoxBar' + i).animate({
					width: width[i] + 'px'
				}, 2000);
				old[i] = width[i];
			}
			for(var i = 1; i <= 6; i++) {
				$('#voteBoxText' + i).html(split[5 + i]);
			}
			max = max + 60;
			$('#voteBox').animate({
				width: max + 'px'
            }, 2000);
			if(split[12] == 1) {
                var seats = new Array(7);
                seats[1] = Math.round(10 * split[0] / 100);
                seats[2] = Math.round(10 * split[1] / 100);
                seats[3] = Math.round(10 * split[2] / 100);
                seats[4] = Math.round(10 * split[3] / 100);
                seats[5] = Math.round(10 * split[4] / 100);
                seats[6] = Math.round(10 * split[5] / 100);
                for(var i = 1; i <= 6; i++) {
                    if(split[i + 5] != "") $('#voteBoxBar' + i).html("&nbsp;&nbsp;&nbsp;" + seats[i] + "&nbsp;Sitze&nbsp;|&nbsp;" + split[i - 1] + "%");
                    else $('#voteBoxBar' + i).html("&nbsp");
                }
            } else {
               	for(var i = 1; i <= 6; i++) {
                    if(split[i + 5] != "") $('#voteBoxBar' + i).html("&nbsp;&nbsp;&nbsp;" + split[i - 1] + "%");
                    else $('#voteBoxBar' + i).html("&nbsp");
                }
			}
    	}
	});
}