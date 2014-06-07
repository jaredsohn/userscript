// ==UserScript==
// @name          Zoho Guest No More
// @namespace     http://maikumori.com
// @description   Double checks if the user wants to post as a guest on ZOHO.
// @include       http://duck.co/*
// @include       https://duck.co/*
// @include       http://discussions.zoho.com/*
// @include       https://discussions.zoho.com/*
// ==/UserScript==

if (document.getElementById("currentLoggedUser").text == "guest") {
    //Zoho is using some nasty tricks with their form which prevent me from
    //injecting my fix easily hence the nasty solution (for now).
    document.addEventListener("click",function(e){
        var el = e.srcElement;
        if (el.hasOwnProperty("id") && (el.id == "publishResponse")) {
            //I hate myself for using confirm, but this is just a quick hack.
            if (!confirm("Are you sure you want to post this as a guest?")) {
                e.stopPropagation();
            }
        }
    },true);
}