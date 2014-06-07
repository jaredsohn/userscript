// ==UserScript==
// @name           Facebook AutoLike
// @namespace      AutoLike
// @description    Auto like-unlike komen dan status, auto konfirm, auto add friend. by Briienth'Blackshadow 
// @include        http://www.facebook.com/*
// @include        http://m.facebook.com/*
// @include        http://www.facebook.com/groups/*
// @include        http://x.facebook.com/*
// ==/UserScript==

// ==Expand==
body = document.body;
if(body != null) {
    div = document.createElement("div");
    div.style.position = "fixed";
    div.style.bottom = "+110px";
    div.style.left = "+9px";
    div.style.backgroundColor = "#FFE4E1";
    div.style.border = "2px solid #800000";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#FF0000\" href=\"JavaScript:AutoExpand()\">Expand Komen</a>"

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
    div.style.bottom = "+82px";
    div.style.left = "+9px";
    div.style.backgroundColor = "#FFE4E1";
    div.style.border = "2px solid #800000";
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
    div.style.bottom = "+138px";
    div.style.left = "+9px";
    div.style.backgroundColor = "#FFE4E1";
    div.style.border = "2px solid #800000";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#D2691E\" href=\"JavaScript:AutoAddFriends()\">Add Friends</a>"

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
    div.style.bottom = "+190px";
    div.style.left = "+9px";
    div.style.backgroundColor = "#FFE4E1";
    div.style.border = "2px solid #800000";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#FF8C00\" href=\"JavaScript:AutoKonfirm()\">Auto Konfirm</a>"

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
    div.style.bottom = "+55px";
    div.style.left = "+9px";
    div.style.backgroundColor = "#FFE4E1";
    div.style.border = "2px solid #800000";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#7B68EE\" href=\"JavaScript:AutoUnLike()\">Unlike semua status</a>"

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
    div.style.bottom = "+30px";
    div.style.left = "+9px";
    div.style.backgroundColor = "#FFE4E1";
    div.style.border = "2px solid #800000";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#EE82EE\" href=\"JavaScript:AutoLikeComments()\">Like semua komen</a>"

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
    div.style.left = "+9px";
    div.style.backgroundColor = "#FFE4E1";
    div.style.border = "2px solid #800000";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#FF100%0\" href=\"JavaScript:AutoUnLikeComments()\">Unlike all comments</a>"

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
    div.style.bottom = "+165px";
    div.style.left = "+9px";
    div.style.backgroundColor = "#FFE4E1";
    div.style.border = "2px solid #800000";
    div.style.padding = "2px";
    div.innerHTML = "<a style=\"font-weight:bold;color:#008000\" href=\"http://www.facebook.com/brint.fendi\">Briienth'Blackshadow </a>"

    body.appendChild(div);
    }