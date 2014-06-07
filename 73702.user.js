// ==UserScript==
// @name           PVRCINEMAS Cleanup
// @namespace      AJ
// @description     Cleanup PVRCINEMAS site 
// @include        http://www.pvrcinemas.com/*
// @require	        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://beta.pvrcinemas.com/*
// ==/UserScript==

var badLangList = "TAMIL,KANNADA,TELUGU,MALAYALAM";
var badLangArray = badLangList.split(","); //alert(badLangArray.join("\n"));

$(document).ready(function() {  
        $(".col_a").remove();
        $("#sideBar").remove();
        $(".col_c").remove();
        $(".col_b_a").remove();
        $("#header").remove();
       $("#selected_movie option").each(cleanup);
       $("div .banner_module").remove();
       $("div .nowshowing_nav").remove();
       $("div .nowshowing_nav_content").remove();
       $("div .nowshowing_module").remove();
       $("div .header-strip").remove();
       $("div .logintube > span").remove();

       // Fix body class
      $("body").css("background-image","url()");
      

       // Add an eventlistener to the movie dropdown for the current pvr site
       // so that it's called everytime a movie name is inserted
        var ba = document.getElementById("selectmovie");
        ba.addEventListener("DOMNodeInserted", function(){
            $("#selectmovie option").each(cleanup);
        }, true);


      // Remove the pop-up
      $("#TB_window").remove();
      $("#TB_load").remove();
      $("#TB_overlay").remove();
});

function cleanup(){
      var movieName = $(this).text();
      if(movieName.contains(badLangArray))
         $(this).remove();

}


// Utility function to search whether a movie name contains a language name from the bad language array
String.prototype.contains = function (searchTerms) 
{
     for (var i = 0; i < searchTerms.length; i++) 	
            if (this.indexOf(searchTerms[i])!=-1) 
                    return true;
     return false;
};

