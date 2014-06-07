// ==UserScript==
// @name           iranled_ads_remover
// @namespace      iranled_ads_remove
// @include        http://*iranled.com/forum/*
// @include        http://*forum.iranled.com/*
// ==/UserScript==

div_content = document.getElementById("content");
div_content.removeAttribute("style");

div_container = document.getElementById("container");
div_container_div_elements = div_container.getElementsByTagName("div");
for (k in div_container_div_elements){
    if (div_container_div_elements[k].id.indexOf("ads") == 0){
        div_container_div_elements[k].style.display = "none";
    }
}

