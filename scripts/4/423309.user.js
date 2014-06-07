// ==UserScript==
// @name       Delete Enjin Wallposts
// @author     Bilbo Baggins
// @namespace  http://www.thelegendcontinues.org
// @version    0.1
// @description  Helps delete all Enjin wallposts. This is a simple script, and you will still need hit OK on the confirmation dialogue for each post. EDIT THE MATCHES TO MATCH YOUR ENJIN FORUM NAME.
// @match      http://thelegendcontinues.org/profile/*
// @match      http://www.thelegendcontinues.org/profile/*
// @match      http://www.enjin.com/profile/*
// @match      http://enjin.com/profile/*
// ==/UserScript==

var btn=document.createElement("BUTTON");
var t=document.createTextNode("Delete All Wall Posts");
btn.appendChild(t);
btn.setAttribute("style","font-family: Courier; background-color: light-grey;");

btn.onclick=function(){
    var cnf = confirm('Are you sure you want to remove all wall posts? This will be permanent.');
    if(cnf){ deletePosts();}
}

document.getElementById('profile-panel-quote').appendChild(btn);

//Sleep function, uses approximate times to adjust the delete all to the forums AJAX event.
function sleep(millis, callback) {
    setTimeout(function() { callback(); }, millis);
}

//Deletes the forum post
function deletePosts(){
    try {
        document.getElementsByClassName("post-dropdown")[0].click();
        document.getElementsByClassName("menu-link bindref-0")[0].click();
    }
    catch(error) {
        alert("Reached the end of visible posts, the page will now reload.");
        location.reload();
        return;
    }
    
    sleep(300, deletePosts);
}