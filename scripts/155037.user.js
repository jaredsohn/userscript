// ==UserScript==
// @name          4chan Post Search
// @namespace     http://www.sebbert.com/
// @description   Lets you search for post numbers on 4chan.
// @include       http://boards.4chan.org/*/res/*
// @include       https://boards.4chan.org/*/res/*
// ==/UserScript==

var hasFocus = false;

// Create the container to hold the search box and results.
var container = document.createElement("div");
container.style.position = "fixed";
container.style.top = "50px";
container.style.right = "10px";
container.style.padding = "5px";
container.style.background = "#FFE url(https://static.4chan.org/image/fade.png) top center repeat-x";
container.style.border = "1px solid #800";
container.style.boxShadow = "0px 1px 10px #800";
container.style.opacity = "0.2";
container.style.WebkitTransition = "opacity 0.2s linear";

// Create the search box.
var textbox = document.createElement("input");
textbox.style.width = "200px";
textbox.style.border = "1px solid #800";

// Focus text field to use.
textbox.addEventListener("focus", function() {
    container.style.opacity = "1.0";
    hasFocus = true;
}, false);

textbox.addEventListener("blur", function() {
    container.style.opacity = "0.2";
    hasFocus = false;
}, false);

// Creates the result list.
var resultlist = document.createElement("ul");
resultlist.style.listStyleType = "none";
resultlist.style.margin = "0px";
resultlist.style.padding = "0px";

// The actual code.
window.addEventListener("keyup", function() {
    if(!hasFocus) return;

    var search = textbox.value;

    while(resultlist.firstChild) {
        resultlist.removeChild(resultlist.firstChild);
    }
    
    if(search == "" || search == null || !search) return;

    var postlinks = document.querySelectorAll(".postInfo .postNum a[href^=javascript]");

    for(var i = 0; i < postlinks.length; i++)
    {
        var postno = postlinks[i].innerText;
        var slice = postno.slice(postno.length - search.length);

        if(slice !== search) continue;

        var li = document.createElement("li");
        li.style.width = "190px";
        li.style.padding = "5px";
        li.style.marginTop = "3px";
        li.style.border = "1px solid #D9BFB7";
        li.style.background = "#F0E0D6";

        var a = document.createElement("a");
        a.style.color = "navy !important";
        a.href = "#p" + postno;
        a.innerText = postno;


        li.appendChild(a);
        resultlist.appendChild(li);
    }
}, false);


container.appendChild(textbox);
container.appendChild(resultlist);

// Add the whole thing to the page.
var body = document.querySelector("body");
body.appendChild(container);