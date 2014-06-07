// ==UserScript==
// @id             staging.episodecalendar.com-eaad96d3-9653-4dad-8f8a-f1f43d2e803e@scriptish
// @name           Episode Calendar Kat.ph Links
// @version        1.0
// @namespace      
// @author         xpdite
// @description    Puts Kat.ph search buttons next to episode numbers on Episode Calendar show pages.
// @include        http://staging.episodecalendar.com/show/*/*/*
// @include        http://staging.episodecalendar.com/show/*
// @run-at         document-end
// ==/UserScript==

var showName = document.getElementById("show_info").getElementsByClassName('hidden')[0].innerHTML;
var strongs = document.getElementsByTagName('strong');
var matches;

for(i = 0; i < strongs.length; i++) {
    matches = strongs[i].innerHTML.match(/s\d\de\d\d/gi);
    
    if(matches != null) {
        var search_str = showName + " " + strongs[i].innerHTML;
        var link = document.createElement("a")
        link.href = "http://kat.ph/usearch/" + search_str + "/";
        link.target = "_blank";
        link.id = "kat_search_link_" + strongs[i].innerHTML;
        link.setAttribute("style","text-decoration:none;");
        link = strongs[i].appendChild(link);

        var img = document.createElement("img");
        img.src = "http://kastatic.com/images/favicon.ico";
        img.setAttribute("style","border: none !important;");
        img.id = "kat_search_img_" + strongs[i].innerHTML;
        link.appendChild(img);
    }
}