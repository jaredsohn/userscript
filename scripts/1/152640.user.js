// ==UserScript==
// @name           opscrabla
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @description    search,junk,cashback,pricecomparison,merchant,comments
// @include        http://www.hotukdeals.com/*
// @version        1

var newDescription = "....";
var newTitle = "...";

if($(".description").text() != newDescription ){
     
     
     
if ($(".edit a:contains('Edit')").length){
var editpage = $(".edit a:contains('Edit')").attr("href");
window.location.href = editpage;
    }
    
    }

if ($(".m-form-edit-thread").length){

    //change text
$("input#title").val(newTitle);
$("textarea#description").val(newDescription);
//document.getElementById('edit-thread').submit();

$(".input-submit input").click(); 
}


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
count = $(".new-link").length;
var nextpage = $("a:contains('Next')").attr("href");
    
         $(".new-link").each ( function (index) {
   
             var myurlmod = $(this).attr("href");

             
            
                         setTimeout(function(){    
             
        makeIframe.setAttribute( "src", myurlmod  );
                 
                 
                  if (!--count) window.location.href = nextpage;
                
                          
 },index*15000);  
           
           
      });
}
