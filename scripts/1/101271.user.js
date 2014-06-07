// ==UserScript==
// @name           ShowLinksOneDDL
// @namespace      ajorpheus
// @description    For each post on OneDDL show the rapidshare links beneath each
// @include        http://www.oneddl.com/*
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
		$(".more-link").each(function(){
			getRapLinks($(this).attr('href'), $(this));
		} );
		 		
 		function getRapLinks(loadUrl,stuff){
			$.ajax({
			   url: loadUrl,
			   context: stuff,
			   success: function ( code )
			   {
			     html = $(code);
			     
			     var divs = $(code).filter(function(){ return $(this).is('div') && $(this).attr("id")=="wrap"});
				 divs.each(function() {
			            var hrefs = $($(this).html()).find("a:contains('linksafe'),a:contains('rapidshare')")
			            
						var rapHrefsArray = new Array();
			            hrefs.each(function()
			            { 
			            	if($(this).parent().html().indexOf("Rapid") != -1){
			            		//allHtml+= $(this).parent().html() ;
			            		//alert($(this).parent().html() + "\n" +$(this).html());
			            		rapHrefsArray.push('<p align="left"><br>' + $(this).parent().html() + '<br></p>');
			            	}
			            });	
			            rapHrefsArray = $.unique(rapHrefsArray).reverse();	    
			            $(stuff).after(rapHrefsArray.join("<br>"));
					    
					    //var rapHrefs = $(allHtml).filter("a");
						
				       	//rapHrefs.each(function()
				        //{ 
				          		//alert($(this).html());
				        //  		rapHrefsArray.push($(this).attr("href"));
				        //});
				        //rapHrefsArray = $.unique(rapHrefsArray).reverse();
						//alert(rapHrefsArray.join("\n"));
						//$(stuff).after('<p align="left"><u>Links</u><br>' + rapHrefsArray.join("<br>") + '<br></p>');
				});// End divs.each
				
			   }// end success function
			 });// end ajax request 			
 		}// ENd of getRapLinks function
	});// End of "document".ready
}

// load jQuery and execute the main function
addJQuery(main);