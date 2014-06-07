// ==UserScript==
// @name			AMG Dynamic Auto Like Facebook
// @namespace		        AMG Dynamic Auto Like Facebook
// @description		        AMG Dynamic Auto Like Facebook
// @author			Derek Norrbom 
// @authorURL		        http://www.angelmg.com/
// @homepage		        http://www.angelmg.com/
// @include			htt*://www.facebook.com/*
// @icon            http://angelmg.com/like-widget/images/amg_logo.png
// @version			v.1 AMG Dynamic Auto Like Facebook 
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude         htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @grant       none
// ==/UserScript==
// ==============
body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "170px";
    div.style.opacity = 0.90;
    div.style.bottom = "+8px";
    div.style.left = "+8px";
    div.style.height = "+130px";
    div.style.backgroundColor = "#000";
    div.style.padding = "3px";
    div.setAttribute('id', 'like_wrapper');
    div.innerHTML = "<img src='https://files.venuedriver.com/apps/facebook/amg/images/amg_gray.png' style='width: 100px; position: absolute; left: 40px; bottom: 100px;' /><style>#like_wrapper{ -webkit-box-shadow: 6px -6px 22px rgba(0, 0, 0, 0.5);-moz-box-shadow: 6px -6px 22px rgba(0, 0, 0, 0.5);box-shadow: 6px -6px 22px rgba(0, 0, 0, 0.5);}</style>";
    body.appendChild(div);
};

body = document.body;
if (body != null) {
    div = document.createElement("label");
    div.setAttribute('id', 'inputLabel');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.opacity = 0.90;
    div.style.bottom = "+75px";
    div.style.left = "+23px";
    div.style.fontSize = "9px";
    div.style.color = "#fff";
    div.style.padding = "3px";
    div.innerHTML = "Like Delay Seconds:"
    body.appendChild(div);
};


body = document.body;
if (body != null) {
    div = document.createElement("input");
    div.type = "text";
    div.name = "liketimer";
    div.setAttribute('id', 'timerInput');
    div.value = "3";
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "28px";
    div.style.opacity = 0.90;
    div.style.bottom = "+72px";
    div.style.left = "+131px";
    div.style.backgroundColor = "#ddd";
    div.style.padding = "3px";
    body.appendChild(div);
};

body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.setAttribute('id', 'like2');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "140px";
    div.style.opacity = 0.90;
    div.style.bottom = "+45px";
    div.style.left = "+23px";
    div.style.backgroundColor = "#5F646A";
    div.style.padding = "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#57D6F6; font-size:14px;' onclick='AutoLike()'><center>Like Everything</center></a>"
    body.appendChild(div);
    
    unsafeWindow.AutoLike = function () {
        var BounceCounterLike = 0;
        var Counter = 0;
        var prepare = document.getElementsByTagName('a');
        var buttons = new Array();

        for (var i = 0; i < prepare.length; i++)
            
            
            if ( prepare[i].getAttribute("id") != null && prepare[i].title != "Like this comment" && prepare[i].getAttribute("id").indexOf(".reactRoot") >= 0 && (prepare[i].innerHTML == "Me gusta" || prepare

            [i].innerHTML == "Like" || prepare[i].innerHTML == "Suka" || prepare[i].innerHTML == "Begen" || prepare[i].innerHTML == "??????" || prepare[i].innerHTML == "Seneng" || prepare

            [i].innerHTML == "Jâ€™aime")) {
                buttons[Counter] = prepare[i];
                Counter++;
            }

        function check_link(linknumber) {
            buttons[linknumber].click();
            var message = "<a style='font-weight:bold;color:#57D6F6; font-size:14px;' onclick='Autolike()'><center>Likes: " + (linknumber + 1) + "/" + buttons.length

            + "</center></a>";
            document.getElementById('like2').innerHTML = message;
        };

        function like_timer(timex) {
            window.setTimeout(bouncer_like, timex);
        };

        function check_warning() {
            var warning = document.getElementsByTagName("label");
            var checkwarning = false;

            for (var i = 0; i < warning.length; i++) {
                var myClass = warning[i].getAttribute("class");
                if (myClass != null && myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) {
                    alert("Warning from Facebook");
                    checkwarning = true;
                }
            }
            var timeValueRaw = document.getElementById("timerInput");
            var timeValueAdjusted = timeValueRaw.value * 1000;
            if (!checkwarning) like_timer(timeValueAdjusted);
        };

        function warning_timer(timex) {
            window.setTimeout(check_warning, timex);
        };

        function bouncer_like() {
            if (BounceCounterLike < buttons.length) {
                check_link(BounceCounterLike);
                warning_timer(0);
                BounceCounterLike++;
            }
        };

        bouncer_like();

    };
}

body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "auto";
    div.style.height = "17px";
    div.style.opacity =

    0.90;
    div.style.bottom = "+127px";
    div.style.left = "+165px";
    div.style.backgroundColor = "#000";
    div.style.padding = "0";
    div.innerHTML = "<a style='font-weight:bold;color:#fff; font-size:16px;' href='' title='Refresh'><blink><center>âŸ³</center></blink></a>"
    body.appendChild(div);
};

body = document.body;
if (body != null) {
    div = document.createElement("div");
    div.setAttribute('id', 'like4');
    div.style.position = "fixed";
    div.style.display = "block";
    div.style.width = "140px";
    div.style.opacity =

    0.90;
    div.style.bottom = "+20px";
    div.style.left = "+23px";
    div.style.backgroundColor = "rgb(95, 100, 106)";
    div.style.padding =

    "3px";
    div.innerHTML = "<a style='font-weight:bold;color:#57D6F6;font-size:14px;' title='Unlike' onclick='AutoUnlike()'><blink><center>Unlike Everything</center></blink></a>"
    body.appendChild(div);
    unsafeWindow.AutoUnlike = function () {
        var BounceCounterUnlike = 0;
        var Counter = 0;
        var prepare = document.getElementsByTagName("a");
        var buttons = new Array();

        for (var i = 0; i < prepare.length; i++)
            if (prepare[i].getAttribute("id") != null && prepare[i].getAttribute("id").indexOf(".reactRoot") >= 0 && (prepare[i].innerHTML == "Me gusta" || prepare

            [i].innerHTML == "Unlike" || prepare[i].innerHTML == "Suka" || prepare[i].innerHTML == "Begen" || prepare[i].innerHTML == "??????" || prepare[i].innerHTML == "Seneng" || prepare

            [i].innerHTML == "Jâ€™aime")) {
                buttons[Counter] = prepare[i];
                Counter++;
            }

        function check_unlike_link(unlike_linknumber) {
            buttons[unlike_linknumber].click();
            var message = "<a style='font-weight:bold;color:#57D6F6;font-size:14px;' onclick='AutoUnlike()'><center>Unlikes: " + (unlike_linknumber + 1) + "/" + buttons.length

            + "</center></a>";
            document.getElementById('like4').innerHTML = message;
        };

        function like_timer(timex) {
            window.setTimeout(bouncer_like, timex);
        };

        function check_warning() {
            var warning = document.getElementsByTagName("label");
            var checkwarning = false;

            for (var i = 0; i < warning.length; i++) {
                var myClass = warning[i].getAttribute("class");
                if (myClass != null && myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm") >= 0) {
                    alert("Warning from Facebook");
                    checkwarning = true;
                }
            }

            if (!checkwarning) like_timer(1500);
        };

        function warning_timer(timex) {
            window.setTimeout(check_warning, timex);
        };

        function bouncer_like() {
            if (BounceCounterUnlike < buttons.length) {
                check_unlike_link(BounceCounterUnlike);
                warning_timer(0);
                BounceCounterUnlike++;
            }
        };
        bouncer_like();
    };
};