// ==UserScript==
// @name           Facebook AutoLike
// @namespace      AutoLike
// @description    Auto like-unlike komen dan status, auto konfirm, auto add friend. by amy sidra
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==Expand==
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+102px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "2px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoExpand()\">Expand Komen</a>"

    body.appendChild(div);

    unsafeWindow.AutoExpand = function() {

        buttons = document.getElementsByTagName("input");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("") >= 0)
                if(buttons[i].getAttribute("name") == "view_all[1]")
                    buttons[i].click();
        }

    };
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+72px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "2px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Like semua status</a>"

    body.appendChild(div);

    unsafeWindow.AutoLike = function() {

        buttons = document.getElementsByTagName("button");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("like_link") >= 0)
                if(buttons[i].getAttribute("name") == "like")
                    buttons[i].click();
        }

    };
}
// ==============
//add friends
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+122px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "2px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoAddFriends()\">Add Friends</a>"

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
    div.style.bottom = "+172px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "2px solid #94a3c4";
    div.style.padding = "2px";
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
// ==Unlike Statuses==
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+52px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "2px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">Unlike semua status</a>"

    body.appendChild(div);

    unsafeWindow.AutoUnLike = function() {

        buttons = document.getElementsByTagName("button");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("like_link") >= 0)
                if(buttons[i].getAttribute("name") == "unlike")
                    buttons[i].click();
        }

    };
}
// ==============
// ==Comments==
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+22px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "2px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLikeComments()\">Like semua komen</a>"

    body.appendChild(div);

    unsafeWindow.AutoLikeComments = function() {

        buttons = document.getElementsByTagName("button");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("cmnt_like_link") >= 0)
                    buttons[i].click();            

        }

    };
}
// ==============
// ==Unlike Comments==
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+2px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "2px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLikeComments()\">Unlike all comments</a>"

    body.appendChild(div);

    unsafeWindow.AutoUnLikeComments = function() {

        buttons = document.getElementsByTagName("button");
        for(i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute("class");
            if(myClass != null && myClass.indexOf("") >= 0)
                if(buttons[i].getAttribute("title") == "Unlike this comment")
                    buttons[i].click();
        }

    };
}
// ==============
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+142px";
    div.style.left = "+6px";
    div.style.backgroundColor = "#eceff5";
    div.style.border = "2px solid #94a3c4";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://maherzen.com/\">MaherZen</a>"

    body.appendChild(div);
    }