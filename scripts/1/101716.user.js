// ==UserScript==
// @name           ShowFileTubeLinks
// @namespace      ajorpheus
// @description    For each result on filetube show the rapidshare links beneath each
// @include        http://www.filestube.com/search.html*
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
		$("a:contains('Download')").each(function(){
			getRapLinks($(this).attr('href'), $(this));
		} );

		//if ($.inArray("sizefrom=200",(window.location+"").split("&"))==-1)
		//	window.location = window.location + "&sizefrom=200&sizeto=500";
		
		function replaceURLWithHTMLLinks(text) {
		    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
		    return text.replace(exp,"<a href='$1'>$1</a>"); 
		}		
		 		
 		function getRapLinks(loadUrl,stuff){
			$.ajax({
			   url: loadUrl,
			   context: stuff,
			   success: function ( code )
			   {
			     html = $(code);
			     
			     var divs = $(code).filter(function(){ return $(this).is('div') && $(this).attr("class")=="content"});
				 divs.each(function() {
				 		if($($(this).html()).find(":contains('File no longer available')").length == 0 ){
				 			var hrefs = $($(this).html()).find("#copy_paste_links");				 			
			            	$(stuff).after("<br>" + replaceURLWithHTMLLinks(hrefs.html()));
				 		}else{
				 			$(stuff).parents("#newresult").hide();
				 		}

				});// End divs.each
				
			   }// end success function
			 });// end ajax request 			
 		}// ENd of getRapLinks function
	});// End of "document".ready
}

// load jQuery and execute the main function
addJQuery(main);