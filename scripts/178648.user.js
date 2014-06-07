// ==UserScript==
// @name          	Add Phish.in + PhishTracks Links to Phantasy Tour show dates.
// @author       	phracker
// @description    	Adds links to Phish.in and PhishTracks into Phantasy Tour posts, etc.
// @include        	http*://phantasytour.com/bands/1/*
// @include        	http*://*.phantasytour.com/bands/1/*
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//code.jquery.com/jquery-2.0.3.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.$j=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
  
  var css = document.createElement("link");
  css.setAttribute('href', 'https://dl.dropboxusercontent.com/u/2915275/phishinpt.css');
  css.setAttribute('rel', 'stylesheet');
  css.setAttribute('type', 'text/css');
  document.body.appendChild(css);
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
          $j(this).html(date + " <a class='pt-button' href=http://www.phishtracks.com/shows/"+month+"-"+day+"-"+year+"><img src='http://i.imgur.com/pXV0ajH.png'></a><a class='phishin-button' href='http://www.phish.in/" + year + "-" + month + "-" + day + "' target='_blank'><img src='http://i.imgur.com/ZC7qcJc.png' alt='listen on phish.in'></a>");
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