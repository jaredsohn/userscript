// ==UserScript==
// @name        Associative context menu for Wikipedia
// @include     *wikipedia.org/wiki/*
// @grant       none
// ==/UserScript==

var hook = [
    [
        "Discography",
        "Diskografia"
    ]
]

hook_index = -1;

hook_loop:
    for ( var i = 0 ; i < hook.length ; i ++ ) {
        for ( var j = 0 ; j < hook[i].length ; j ++ ) {
            if ( document.getElementById(hook[i][j]) != null ) {
                hook_index = i;
                break hook_loop;
            }
        }
    }

if ( hook_index >= 0 ) {   

     function goto(url) {
       url = url.replace(/(\$0)/g, contextmenu.title)
                .replace(/(\$1)/g, contextmenu.link);
       var win = window.open(url, '_blank');
       win.focus();
    }
    
    function Engine(title, icon_url, url) {
        var icon = document.createElement("img");
        icon.setAttribute("title", title);
        icon.setAttribute("src", icon_url);
        icon.style.cursor = "pointer";
        icon.style.margin = "3px";
        icon.url = url;
        icon.onclick = function() { goto(url); }
        return icon;
    }

    /*
    * $0: Title
    * $1: Link
    */
    var engines;
    if ( hook_index == 0 ) {
        engines = [
            Engine(
               "Spotify", 
               "https://play.spotify.com/favicon.ico", 
               "https://play.spotify.com/search/$0 $1"
            ),
            Engine(
               "YouTube", 
               "http://www.youtube.com/favicon.ico", 
               "http://www.youtube.com/results?search_query=$0 $1"
            ),
            Engine(
               "Torrentz", 
               "http://www.torrentz.eu/favicon.ico", 
               "http://torrentz.eu/search?f=$0 $1"
            ),
            Engine(
               "Google", 
               "http://www.google.com/favicon.ico", 
               "http://www.google.com/#q=$0 $1"
            )
        ];
    }
    
    var contextmenu = document.createElement("div");
    contextmenu.style.cssText = "position:absolute;left:0px;top:0px;background:#fff;border:1px #888 solid;box-shadow:3px 3px 3px rgba(0,0,0,.5);";
    contextmenu.style.display = "none";
    for ( var i = 0 ; i < engines.length ; i ++ ) {
        contextmenu.appendChild(engines[i]);
    }

    var title = document.getElementById("firstHeading")
                        .childNodes[0]
                        .childNodes[0]
                        .nodeValue;
    
    if ( title.lastIndexOf(")") == title.length - 1 ) {        
        title = title.substring(0, title.lastIndexOf("(") - 1 );
    }

    contextmenu.title = title;
            
    document.oncontextmenu = function(e) {
        var contextmenu_link = null;
        var window_selection = window.getSelection();
        if ( e.target.tagName == "A" ) { 
            contextmenu_link = e.target
            .childNodes[0]
            .nodeValue;
        } else if ( window_selection != "" ) contextmenu_link = window_selection;
        if ( contextmenu_link != null && contextmenu_link != contextmenu.link ) {
            contextmenu.link = contextmenu_link;
            contextmenu.style.left = e.clientX + "px";
            contextmenu.style.top = e.clientY + pageYOffset + "px";
            contextmenu.style.display = "block";
            return false;
        } else {
           contextmenu.link = null;
           return true;
        }
    }
    
    document.onclick = function() {
        if ( contextmenu.style.display != "none" ) {
            contextmenu.style.display = "none";
        }
    }
    
    document.body.appendChild(contextmenu);
    
}