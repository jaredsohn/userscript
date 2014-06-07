// ==UserScript==
// @name           commentDeleter
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @description    hotukdeals, automatically delete all user comments, hackukdeals
// @include        http://www.hotukdeals.com/*
// @version        1
// ==/UserScript==

if ($(".s-search-results").length){



//------ ALL PAGES
// Get reference element for where you want to place the iframe element
var getRef = document.getElementById("logo-container");
// Create new iframe
var makeIframe = document.createElement("iframe");
// Set the height with .setAttribute method
makeIframe.setAttribute("height", "150px");
// Set the width with .setAttribute method
makeIframe.setAttribute("width", "325px");
// Set the source location of iframe with .setAttribute method
makeIframe.setAttribute("src", "http://www.hotukdeals.com/");
// Use .insertBefore method to put newly created iframe above/before the reference element
var parentDiv = getRef.parentNode;
parentDiv.insertBefore(makeIframe, getRef);



                   

// Delete comments on the page by opening link in iframe
count = $(".user-search-listing .title").length;
var nextpage = $("a:contains('Next')").attr("href");

    
         $(".user-search-listing .title").each ( function (index) {
   
             var myurl = $(this).attr("href");
             var myurlmod = myurl.replace("p=","dc="); 
             
      

             setTimeout(function(){    
             
        makeIframe.setAttribute( "src", myurlmod  );
                 
            
                 
                  if (!--count) window.location.href = nextpage;

                
                          
 },index*8000);  
        
           
      });



}
