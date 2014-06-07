// ==UserScript==
// @name        DS Beautifier
// @namespace   http://ds-beautifier.de
// @include     http://*.die-staemme.de/game.php*
// @version     1
// @grant       none
// ==/UserScript==

$('#production_table .nowrap td:nth-last-child(1)').each(
	function(index, element) {
	    var $td = $(element);
	    var content = $td.text();
	    var ratio = eval(content) * 100;
	    var color = 0;
	    if (ratio > 90) {
	        color = "rgba(255, 0, 0, 0.20)";
	    } else if (ratio > 75) {
	    	color = "rgba(255, 255, 0, 0.20)";
	    } else {
	        color = "rgba(0, 255, 0, 0.20)";
	    }
	    $td.empty().append("<span>" + content +"</span>").find("span")
	    	.css("width", ratio + "%")
	    	.css("display", "block")
	    	.css("background-color", color);
	}
);

$("<style type='text/css'>.custres { width: 27%; display: inline-block; margin-right:4px;padding-right:19px; border: 1px dotted} </style>").appendTo($("head"));
$('#production_table .nowrap td:nth-last-child(3)').each(
	function(index, element) {
		var storeTotal = $(element).next().text();
		var tempdiv = $('<div></div>');
		$(element).children("span").each(
			function(spanIndex, spanElement) {
				var amount = $(spanElement).text().replace(".", "");
				console.log(amount);
				var ratio = amount / storeTotal * 100;
			    var color = 0;
			    if (ratio > 90) {
			        color = "rgba(255, 0, 0, 0.20)";
			    } else if (ratio > 75) {
			    	color = "rgba(255, 255, 0, 0.20)";
			    } else {
			        color = "rgba(0, 255, 0, 0.20)";
			    }
			    
			    $(spanElement).css("display", "inline-block").css("background-color", color).css("width", ratio + "%");
			    
			    var newSpan = $("<span class='custres'></span>");
			    newSpan.append(spanElement);
				tempdiv.append(newSpan);
			}
		);
		
		$(element).empty().append(tempdiv.children());
	}
);