// ==UserScript==
// @name           Add RD banner (All RT)
// @namespace      trey_allen@hotmail.com
// @description    Adds Radial Designs banner on all RT pages
// @include        http://*.roosterteeth.com/*
// @include        https://*.roosterteeth.com/*
// ==/UserScript==

(function() {
    var editor = document.getElementById("Make a Journal Entry");
    if(editor != null)
        editor = editor.childNodes[0].childNodes[1].childNodes[5].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[3];
    else {
        editor = document.getElementById("Make a News Entry");
        if(editor !=null) {
            editor = editor.childNodes[0].childNodes[1].childNodes[4].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[3];
        }
        else {
            editor = document.getElementById("Post");
            if(editor == null)
                editor = document.getElementById("Add a Comment");
            if(editor == null)
                editor = document.getElementById("Edit Post");
            editor = editor.childNodes[0].childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[3];
        }
    }
    if(editor != null) {
        var newnode1 = document.createTextNode(" ");
        var newnode2 = document.createTextNode(" ");
        var newnode3 = document.createTextNode(" ");
        var quotebutton = document.createElement("input");
        
        quotebutton.className = "button";
        quotebutton.type = "button";
        quotebutton.value = "Radial Designs";
        quotebutton.style.width = "100px";
        quotebutton.id = "true";
        quotebutton.addEventListener("click", addquote, true);
        
        editor.insertBefore(newnode1, editor.childNodes[17]);
        editor.insertBefore(newnode2, editor.childNodes[17]);
        editor.insertBefore(newnode3, editor.childNodes[17]);
        editor.insertBefore(quotebutton, editor.childNodes[17]);
    }
})();

function addquote() {
    var toggle = this.id;
    var holder = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    var text = holder.getElementsByTagName("textarea");
    if(this.value == "Radial Designs") {
        text[0].value += "[link=http://radialdesigns.webs.com/][img]http://img.photobucket.com/albums/v289/TreyAllen/RadialBanner.jpg[/img][/link]";
        this.value = "Radial Designs";
    }
    
    
    var element = document.getElementById("Post");
    if(!element)
        element = document.getElementById("Add a Comment");
    if(!element)
        element = document.getElementById("Edit Post");
    if(!element)
        element = document.getElementById("Make a News Entry");
    if(!element)
        element = document.getElementById("Make a Journal Entry");
    var text = element.getElementsByTagName("textarea");
    text[0].focus();
}