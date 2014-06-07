// ==UserScript==
// @name           Add Friends Massal
// @namespace      Automatically
// @description    Melakukan invite friends secara massal
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        https://*.facebook.com/*
// @version        1.0
// ==/UserScript==


// ==============
//add friends
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+30px";
    div.style.width = "+125px";
    div.style.left = "+5px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "1px solid #000000";
    div.style.padding = "5px 10px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoAddFriends()\">Add Friends Massal</a>"

    body.appendChild(div);

    unsafeWindow.AutoAddFriends = function() {

        buttons = document.getElementsByTagName("label");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("FriendRequestAdd") >= 0)
                    buttons[i].click();
        }

    };
}
//akhir add friend
//auto confirm
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+5px";
    div.style.width = "+125px";
    div.style.left = "+5px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "1px solid #000000";
    div.style.padding = "5px 10px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoKonfirm()\">Auto Konfirm</a>"

    body.appendChild(div);

    unsafeWindow.AutoKonfirm = function() {

        buttons = document.getElementsByTagName("label");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("uiButtonConfirm") >= 0)
                    buttons[i].click();
        }

    };
}
//akhir auto confirm
// ==============
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+55px";
    div.style.width = "+125px";
    div.style.left = "+5px";
    div.style.backgroundColor = "#006600";
    div.style.border = "1px solid #000000";
    div.style.borderBottom = "0px";
    div.style.padding = "5px 10px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#FFFF00\" href=\"http://www.magelangherba.com/\">MagelangHerba.com</a>"

    body.appendChild(div);
    }
    