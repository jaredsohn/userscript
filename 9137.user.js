// ==UserScript==
// @name                         deviantFix:WatchFromGallery
// @namespace                com.deviantart.dancewiththesky
// @description                 Watch somebody from their gallery page
// @include                       http://*.deviantart.com/gallery/* 
// ==/UserScript==

/*
  Idea from thespook <http://thespook.deviantart.com/>
  Coded by dancewiththesky <http://dancewiththesky.deviantart.com>
*/  

(function(){

        var deviantName = window.location.host.substring(0, window.location.host.indexOf(".")).toLowerCase();
        
        // Don't watch yourself oO
        if (deviantName == unsafeWindow.deviantART.deviant.username.toLowerCase()){
                return;
        }
    
        var watchForm = document.createElement('form');
        watchForm.id = "__watch-form";
        watchForm.method = "POST";
        watchForm.action = "http://my.deviantart.com/deviants/add";
        watchForm.setAttribute("style", "display:none");
        watchForm.innerHTML = '<input type="hidden" name="username" value="' + deviantName + '"/>';
        document.getElementById("deviantART-v5").appendChild(watchForm);     

        var trigger = document.createElement("img");
        trigger.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH1gELEAARlER4oQAAANBJREFUOMvNkb0OwWAUhh/SxWC3cgfSuoHGYDZbO3RxB0TSxGQXsVoNJoOEG+hnN1osVmnip98xEIr6iwTvdvKdvPme58Cvk7j3YDk9HzCPo/K7FStuL/mg3PRcG8+1iRS9VfBSPi4w7jDHOZHIeHJiRJlb1SJbLSSAbXje91wbERA5WK93xubNDwBW65D5MkAEtBa0QLARwlDYaUFryGVS8QiAanQmFwjlUgGAwci/JlJP5VhOT4bThTT7M7ni//IZ89n0a2eMiaq1T7YVf5s9VHJLC4uyd44AAAAASUVORK5CYII=";
        trigger.setAttribute("style", "cursor: pointer; position: absolute; top: 130px; right: 40px;");
        trigger.addEventListener('click', function(){watchForm.submit()}, false);
        trigger.title = "Add this deviant to your devWatch";
        document.getElementById('deviant').appendChild(trigger);

})();
