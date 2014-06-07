// ==UserScript==
// @name          Reddit All-Comments Viewer
// @namespace 	  http://linux-junky.blogspot.in/2012/03/chromium-extension-reddit-all-comments.html
// @description	  Adds a button to "Load all comments" in reddit.com
// @author        shadyabhi
// @include       http://www.reddit.com/r/*/comments/*
// ==/UserScript==


/*
Author: Abhijeet Rastogi (shadyabhi)
Email: abhijeet.1989@gmail.com
*/

function runAgain(){
    //Run every one second
    window.setTimeout(addButton,1e3)
    }
    
function addButton(){
    //All buttons have class as "button"
    var first_button = document.getElementsByClassName("button")[0];
    if (first_button == null){
        alert("Sorry, no comments to expand");
        return;
    }

    if (first_button.innerHTML == "loading..."){
        first_button.className = ""; //To fix later
    }
    else{
       var theEvent = document.createEvent("MouseEvent");
       theEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
       first_button.dispatchEvent(theEvent);
    }

    if(first_button.id) 
        runAgain();
    };

//Link created and added as child to "pane"
var pane = document.getElementsByClassName("panestack-title")[0];
var newlink = document.createElement("a");
newlink.appendChild(document.createTextNode("Load all comments"));
newlink.id = "loadmorecomments";
newlink.href = "javascript:void(0)";
newlink.className="title-button ";
newlink.title = 'Opens all "load more comments" link every 1 second';
newlink.addEventListener('click', runAgain, false);
pane.appendChild(newlink);
