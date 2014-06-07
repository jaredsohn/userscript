// ==UserScript==
// @name           FilterPVR
// @namespace      ajorpheus
// @description    Filter the listing on the PVR site to remove non-hindi/english movies
// @include        http://www.pvrcinemas.com/home_details*
// @require	   	   http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// @version		   1.0
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {		
      $("document").ready(function(){		
      	var badLangList = "TAMIL,KANNADA,TELUGU,MALAYALAM";
		var badLangArray = badLangList.split(","); //alert(badLangArray.join("\n"));

      	
		// Add the case-insensitive selector
		$.expr[":"].containsNoCase = function(el, i, m) {
		    var search = m[3];
		    if (!search) return false;
		    return eval("/" + search + "/i").test($(el).text());
		};
			
		for(var i=0; i< badLangArray.length; i++)	
			$("p:containsNoCase('"+ badLangArray[i] + "')").parents(".vm_content_main").hide();
		 		
 		$(".bk_content_middle").after('<u><a id="cleanMovies" href="#" style="font-size: 14px; color:yellow;"> Clean Movies</a></u>');
 		$("#cleanMovies").click(function(){
			for(var i=0; i< badLangArray.length; i++)	
				$("p:containsNoCase('"+ badLangArray[i] + "')").parents(".vm_content_main").hide();
 		});
	});// End of "document".ready
}

// load jQuery and execute the main function
addJQuery(main);

/*
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
});*/