window.addEventListener("load", function(e) {
       var title = document.title;

         var vidURL = document.location + ' ';
         var vidURLarray = vidURL.split("/");
         if (vidURLarray[3] == "user") {
             var vidID = vidURLarray[6];
         }else{
             var vidID = vidURLarray[5];
         }



         var ddLink = '<li><a href="http://www.stagex.net/videos/testrun/' + vidID + '" class="vid-channel function">Add to Stagex.net</a></li>';
         var codeSnip = document.getElementById("share-video").innerHTML;
         codeSnip = codeSnip + ddLink;
         document.getElementById("share-video").innerHTML = codeSnip;
 }, false);



 // Script by iQ-
 // Credits goto defrex for practically laying the ground work for the entire script.  I just edited and tested it a bit to make it work with Stagex.net.
 // 

 // ==UserScript==

 // @name          Stage6 to Stagex.net

 // @description   A script to send movies from Stage6 to Stagex.net.net

 // @include       http://stage6.divx.com/*
 // @include       shttp://video-akamai.stage6.com/*

 // ==/UserScript==