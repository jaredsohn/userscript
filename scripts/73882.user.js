// ==UserScript==
// @name           HN Troll Swat
// @namespace      jodrellblank.com.org.apple.java.sun.stupidlyoverbearingnamespaces.oxtagon
// @description    Bash HN Troll(s)
// @include        http://news.ycombinator.com/*
// ==/UserScript==

 var trollNames = ["putusernamehere"];


function swatTrollAt(trollLocationTag) {
    // It's not just a bridge anymore, it's a known troll location (tm)
 
    trollLocationTag.innerHTML = "{troll}";


                                  // span      . div      . td
    var commentTD = trollLocationTag.parentNode.parentNode.parentNode;

    var spans = commentTD.getElementsByTagName('span');
    for (var i=0; i<spans.length; i++) {
        if (spans[i].className == "comment") {
            spans[i].innerHTML = "{Troll Defense}";
        }
    }
}

function seekTrollAt(bridge){
    // All this code for a string == test.
    // Javascript 1.7 has Generator Expressions, I saw the hyperlink in the Mozilla docs
    // but I was afraid to look in case it was either ugly or Opera only.

    // Technically, the troll detection algorithm is "look for the troll's name"
    // YMMV on how good this is, but for my original use case it's almost always
    // accurate with negligible false positives.

    for (var i=0; i<trollNames.length; i++) {
        if (bridge.href.indexOf("user?id=" + trollNames[i])>=0) {
            swatTrollAt(bridge);
        }
    }
}


var bridges = document.getElementsByTagName('a');  //Trolls live near bridges.
                                                   //Spot them by hyperlinks to their profile pages

for (var i=0; i<bridges.length; i++) {    //Horrid ugly unPythonic javascript iteration
    seekTrollAt(bridges[i]);               //(Trolls love this)
}

