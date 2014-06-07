// ==UserScript==
// @name         TimeTracker
// @namespace  
// @version      1.6
// @description  Modal window to track projects worked on by date     
// @match        http://tampermonkey.net/index.php?version=3.5.3630.14&ext=dhdg&updated=true
// @copyright    2014+, Shaun Bristow
// @include      *
// @noframes
// ==/UserScript==
//
//

// Create an iFrame in the document to house the time tracker app

var iframe = document.createElement("iframe");
iframe.scrolling = "no";
iframe.src = "https://timetrackerstatic.s3.amazonaws.com/index.html";
iframe.id = "time_tracker_app";
iframe.style.display = "none";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.left = "0px";
iframe.style.width = "100%";
iframe.style.height = "100%";
iframe.style.zIndex = "9999";

var expand_button = document.createElement("button");
expand_button.innerHTML = "+";
expand_button.style.position = "fixed";
expand_button.style.top = "0px";
expand_button.style.right = "0px";
expand_button.style.zIndex = "10000";

expand_button.onclick = function() {
    if (iframe.style.display == "none") {
    	iframe.style.display = "block";   
    } else {
        iframe.style.display = "none";
    }
}

document.body.appendChild(expand_button);
document.body.appendChild(iframe);
