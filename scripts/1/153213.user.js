// ==UserScript==
// @name           deerhunter for www.hotukdeals.com
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @description    hunt those pesky deer in the HUKD 2012 competition
// @include        http://www.hotukdeals.com/*
// @version        1.1
// ==/UserScript==

if ($(".label-filter-topics").length){
  

//------ ALL PAGES
// Get reference element for where you want to place the iframe element
var getRef = document.getElementById("userbar-search");
// Create new iframe
var makeIframe = document.createElement("iframe");
// Set the height with .setAttribute method
makeIframe.setAttribute("height", "150px");
// Set the width with .setAttribute method
makeIframe.setAttribute("width", "325px");
// Set the source location of iframe with .setAttribute method
makeIframe.setAttribute("src", "..");
// Use .insertBefore method to put newly created iframe above/before the reference element
var parentDiv = getRef.parentNode;
parentDiv.insertBefore(makeIframe, getRef);

                   
// Delete comments on the page by opening link in iframe
count = $(".td-thread-starter .new-link").length;
var nextpage = $("a:contains('next')").attr("href");
    
         $(".td-thread-starter .new-link").each ( function (index) {
   
             var myurl = $(this).attr("href");
             
      
             setTimeout(function(){    
             
        makeIframe.setAttribute( "src", myurl  );
                 
              
                 
                  if (!--count) window.location.href = nextpage;
                
                          
  
         },index*((Math.random()*12900)+5000));  
           
      });
}