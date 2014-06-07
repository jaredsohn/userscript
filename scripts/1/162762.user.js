// ==UserScript==
// @name          	PhishTracks PT Links
// @author       	Burgle
// @description    	Adds links to PhishTracks for tourdates
// @include        	http://phantasytour.com/bands/1/*
// @include        	http://www.phantasytour.com/bands/1/*
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.$j=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
	var current = $j('span.current').html();
	function CheckPageChange(){
		if($j('span.current').html() != current){
				CheckDates();
				clearTimeout(timer);
				current = $j('span.current').html();
			}
			else {
				var timer = setTimeout(CheckPageChange, 500);
			}
	}
	
	function CheckDates(){
		$j('.shows_tooltips').each(function() {
			var date = $j(this).html();
			var month = "";
			var day = "";
			var year = "";
			var dateArray = date.split("-");
			if(dateArray.length != 3) {
				dateArray = date.split("/");
			}
			if(dateArray.length != 3) {
				dateArray = date.split(".");
			}
			if(dateArray[0] <= 12){
				//If month could be the first number, assume it is
				month = dateArray[0];
				day = dateArray[1];
				year = dateArray[2];
			}
			else if(dateArray[0] > 31){
				//If year is 1st number
				year = dateArray[0];
				if (dateArray[1] <= 12 && dateArray[2] > 12){
					day = dateArray[2];
					month = dateArray[1];
				}
				else if(dateArray[1] > 12 && dateArray[2] <= 12){
					day = dateArray[1];
					month = dateArray[2];
				}
			}
			if(year > 0 && year < 100){
				if(year < 30){
					year = "20" + year;
				}
				else if (year > 30){
					year = "19" + year;
				}
			}
			$j(this).html(date + " <b><a style='font-size:small;' href='http://www.phishtracks.com/shows/" + year + "-" + month + "-" + day + "' target='_blank'>[PhishTracks]</a></b>");
		});
		
		$j('.interior_pagination a').click(function(){
			CheckPageChange();
		});
		$j('.posts_footer:nth-child(4)').click(function(){
			CheckPageChange();
		});
	}
	
	
	
	CheckDates();
}



// load jQuery and execute the main function
addJQuery(main);

