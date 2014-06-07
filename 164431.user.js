// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://studentweb.ntnu.no/cgi-bin/WebObjects/studentweb2.woa/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==
String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
$(document).ready(function() {
 	var header = $("h1").text().trim();
    if (header === "Resultater") {
        var karMap = {'A': 6, 'B': 5, 'C': 4, 'D': 3, 'E': 2, 'F': 1};
		var sum = 0;
		var count = 0;
     	$("table").find("tr[class^=pysj]").each(function() {
			var tds = $(this).find("td");
			dataExtract(tds);
		});
	
		function dataExtract(tds) {
			var res = karMap[$(tds[7]).html()];
			var imp = parseFloat($(tds[8]).html().replace(",","."));
			if (typeof res !== 'undefined') {
				sum += res*imp;
				count += imp;
			}
		}
        
        
        $("body").append('<div class="average fixedtopright hidden" style="position: absolute; top: 0px; width: 50px; height: 20px; right: 0px; background-color: #FFF; padding: 10px; border: 2px solid black;"><div class="data"></div><div class="button"></div></div>');
        var div = $(".average");
        var button = $(".button");
        var data = $(".data");
    	//d.append('Sum: '+sum+'<br />');
    	//d.append('Count: '+count+'<br />');
    	//d.append('Average: '+(sum/count)+'<br />');
        button.append('<button class="closeaverage">Open</button>');
        
        $(".closeaverage").click(function() {
            var t = $(this);
            if (div.hasClass("hidden")) {
                data.html('');
                data.append('Sum: '+sum+'<br />');
    			data.append('Count: '+count+'<br />');
    			data.append('Average: '+(sum/count)+'<br />');
                div.removeClass("hidden");
        		t.html("Close");
                div.css('width', '300px');
				div.css('height', '200px');
            }else {
                data.html('');
                div.addClass("hidden");
                t.html("Open");
                div.css('width', '50px');
                div.css('height', '20px');
            }
        });
    }
    
});