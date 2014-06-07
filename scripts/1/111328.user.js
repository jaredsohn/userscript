// ==UserScript==
// @name                MetroidColorRemoval
// @description      Remove colors from MDb posts
// @include             http://www.metroid-database.com/*
// @include             http://metroid-database.com/*
// ==/UserScript== 



//Version 1.3
//By Darth Naner, for the MDb users who hate colored posts.

//1.2: Spoilers are no longer ruined.
//1.3: Text color inside quotes is now the default, slightly darker gray. The code should also execute slightly faster now.

function removeColor() {
    var allDivs = document.getElementsByTagName("div");
    
    for (var i=0; i<allDivs.length; i++) {
        if (allDivs[i].className == "postbody") {
                var postSpans = allDivs[i].getElementsByTagName("span");
                for (var j=0; j<postSpans.length; j++) {
                    if (postSpans[j].className != "spoiler") {
                         postSpans[j].style.color = "#C2C2C2";
                    }
                }
        }
        if (allDivs[i].className == "quotecontent") {
                var postSpans = allDivs[i].getElementsByTagName("span");
                for (var j=0; j<postSpans.length; j++) {
                    if (postSpans[j].className != "spoiler") {
                         postSpans[j].style.color = "#999999";
                    }
                }               
        }
    }    
}

removeColor();