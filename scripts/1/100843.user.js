// ==UserScript==
// @name           OneDDL Highlight Today
// @namespace      ajorpheus
// @description    OneDDL Highlight Today's posts with green and yesterday's post in gray
// @include        http://www.oneddl.*/category*
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
	function ord(n) {
		var sfx = ["th","st","nd","rd"];
		var val = n%100;
		return n;//n + (sfx[(val-20)%10] || sfx[val] || sfx[0]);
}

var m_names = new Array("January", "February", "March",
			"April", "May", "June", "July", "August", "September",
			"October", "November", "December");
			
function getDateString(d){
		var curr_date = d.getDate();
		var curr_month = d.getMonth();
		var curr_year = d.getFullYear();
		return (m_names[curr_month] + " " + ord(curr_date) + ", " + curr_year);

}	
	
      $("document").ready(function(){ 
			var today=new Date();
			var ddlDate = getDateString(today);
			
			var yest = new Date();
            yest.setDate(yest.getDate() - 1);			
			var ddlDateYest =  getDateString(yest);
			
			console.log("Today : " + ddlDate);
			console.log("Yest : " +ddlDateYest);
			$("div.article-inside").has("time.entry-date:contains('"+ddlDate+"')").css("background-color", "green");
            $("div.article-inside").has("time.entry-date:contains('"+ddlDateYest+"')").css("background-color", "gray");
			// $("time.entry-date:contains('"+ddlDate+"')").prevUntil("div.posttitle").prev().nextUntil("div.posttitle").andSelf().css("background-color", "green");
			// $("time.entry-date:contains('"+ddlDateYest+"')").prevUntil("div.posttitle").prev().nextUntil("div.posttitle").andSelf().css("background-color", "gray");
      });
}

// load jQuery and execute the main function
addJQuery(main);
