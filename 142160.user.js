// ==UserScript==
// @name           Removes boplinks from SHW forum posts
// @version        1.0
// @author         r34ktor
// @namespace      http://userscripts.org/users/104413
// @description    Removes boplinks from SHW forum posts
// @include        http://*svethardware.cz/forum/*
// ==/UserScript==

var clearboplinks = function() {
    var list = document.getElementsByClassName("boplink");
        for (var i = 0; i < list.length; i++) {
            var list_a = list[i].getElementsByTagName("a"); {
                list_a[0].removeAttribute("href");
                list_a[0].style.color = "inherit";
                list_a[0].style.textDecoration = "inherit";
                                                            }
                                              }
}  

clearboplinks();