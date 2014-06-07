// ==UserScript==
// @name           Clean Up OneDDL
// @namespace      ajorpheus
// @description    Hides posts the title of which does not contain words from a specific list. Add a 'Next Page' Link
// @include        http://www.oneddl.*/category/tv-shows/*
// @require	   	   http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
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

	   var serials= new Array("bang","Mentalist","modern","fringe","clone","notice","terriers","party","dexter","stargate","anatomy","desperate","thrones","mad");
		
      $("document").ready(function(){	
      	
      	// Add the case-insensitive selector
		$.expr[":"].containsNoCase = function(el, i, m) {
		    var search = m[3];
		    if (!search) return false;
		    return eval("/" + search + "/i").test($(el).text());
		};
			
		// Add the regex selector
		$.expr[':'].regex = function(a, i, m, r) {
		   var r = new RegExp(m[3], 'i');
		   return r.test($(a).text());
		};
		    
		// Search for the location of the next page. This must be done before the actual post clean up is done since that removes all the page links
		if(typeof $("span.pages") != "undefined"){
			var newloc = $("span.pages").nextAll("span.current").next().attr("href");
			//alert(newloc);
			var $nextPage= $("<a href='"+newloc+"'>Next Page</a>");		
			$("div#crumbs").append($nextPage);
			$("a:contains('Next Page')").focus();
		
			// Bind the enter key to a window location change
			$('body').keyup(function(e) {
				e.preventDefault();
				if(e.keyCode == 13) {
					window.location = newloc;
				}
				return false;
			});
		}
		
		// Highlight all desirable posts with red
		for(var i=0; i<serials.length; i++){
				//$("h1.entry-title:containsNoCase('"+serials[i]+"')").nextUntil("div.posttitle").andSelf().css("background-color","gray");
				$("div.article-inside").has("h1.entry-title:containsNoCase('"+serials[i]+"')").css("background-color", "red");
		}
		

		
		// Remove all undesired posts from the page
		$("div.article-inside").each(function(){
			var thisText = $(this).find("a").text();
			var foundWantedSerial=false;
			console.log(thisText);
			for(var i=0; i<serials.length; i++){
				console.log(serials[i]);
				var r = new RegExp(".*"+serials[i]+".*", 'i');
				if(r.test(thisText)){
					foundWantedSerial=true;
					break;
				}
			}
			console.log(foundWantedSerial);
			
			if(!foundWantedSerial) 
				$(this).nextUntil("div.posttitle").andSelf().remove();
		});
		
		//if after cleanup nothing is left move to the next page
		if($("div.article-inside").length == 0 )
			window.location = newloc;
		
});
}

// load jQuery and execute the main function
addJQuery(main);

