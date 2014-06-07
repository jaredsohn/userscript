// ==UserScript==
// @name Profile Favotter Link
// @include http://twitter.com/*
// @include https://twitter.com/*
// @description プロフィールにふぁぼったーへのリンクを表示する
// ==/UserScript==

(function(){
    var ul = document.querySelector("ul#primary_nav");
    var name = document.querySelector('meta[name="page-user-screen_name"]');
    if (name && ul) {
        var li = document.createElement("li"), a = document.createElement("a");
        a.appendChild(document.createTextNode(
            document.documentElement.lang === "ja" ? "ふぁぼったー" : "Favotter"
        ));
        a.href = "http://favotter.net/user/" + name.content;
        li.appendChild(a);
        li.id = "profile_favotter_tab";
        ul.appendChild(li);
    }
})();
