// ==UserScript==
// @id             www.imdb.com-5763720c-0524-4b86-af79-87e6136cb253@scriptish
// @name           IMDb kat.ph and Torrentz Links
// @version        1.1
// @namespace      
// @author         xpdite
// @description    
// @include        http://www.imdb.com/title/*
// @run-at         document-end
// ==/UserScript==

var movie_name = getTitle();
var search_str = movie_name;
var search_str_tz = search_str.replace(/ /g,"+");

var header = document.getElementById("img_primary");

var container = document.createElement("div");
container.id = "kat_search_container";
container.setAttribute("style","padding:10px;padding-bottom:0px;");
header.appendChild(container);

var img = document.createElement("img");
img.src = "http://kastatic.com/images/favicon.ico";
img.setAttribute("style","border: none !important;");
img.id = "kat_search_img";
container.appendChild(img);


var link = document.createElement("a")
link.href = "http://kat.ph/usearch/" + search_str + "/";
link.target = "_blank";
link.innerHTML = "Search kat.ph";
link.id = "kat_search_link";
link.setAttribute("style","padding-left:5px;text-decoration:none;");
container.appendChild(link);

var container = document.createElement("div");
container.id = "tz_search_container";
container.setAttribute("style","padding:10px;padding-top:0px;");
header.appendChild(container);

var img = document.createElement("img");
img.src = "http://torrentz.eu/favicon.ico";
img.setAttribute("style","border: none !important;");
img.id = "tz_search_img";
container.appendChild(img);


var link = document.createElement("a")
link.href = "http://torrentz.eu/search?f=" + search_str_tz;
link.target = "_blank";
link.innerHTML = "Search Torrentz";
link.id = "tz_search_link";
link.setAttribute("style","padding-left:5px;text-decoration:none;");
container.appendChild(link);

function getTitle() {
    var elements = document.getElementsByClassName("itemprop");
    
    var i;
    for(i=0;i<elements.length;i++) {
        if(elements[i].getAttribute("itemprop") == "name") {
            return elements[i].innerHTML;
        }
    }
}
