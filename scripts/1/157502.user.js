// ==UserScript==
// @name		ElevPresens++
// @description	Makes ElevPresens BETTER!
// @version		Alpha1.0
// @author		WildN00b, Ylar
// @namespace	me.wildn00b_ylar.elevpresenspp
// @include		http://*elevpresens.se/
// @include		http://*elevpresens.se/jsp/main.jsp
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
// @history		Alpha1.0 Launch of the script
// @grant		none
// ==/UserScript==

function startsWith(str, suffix) {
    return str.indexOf(suffix, 0) !== -1;
}
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function fix() {
	$("a").removeAttr("target");
	$("a").click(function() {
		if (endsWith($(this).attr("href"),".se") ||endsWith($(this).attr("href"),".uk"))
			return true;
			
		if (!startsWith($(this).attr("href"), "../") && !startsWith($(this).attr("href"), "/jsp/") && !startsWith($(this).attr("href"), "/"))
			$(this).attr("href", "/jsp/" + $(this).attr("href"));
		
		if (!endsWith($(this).attr("href"), "/") && !endsWith($(this).attr("href"), ".jsp")) {
			$("#main").html("<iframe id=\"frame\" src=\"" + $(this).attr("href") + "\" />");
			$($("#frame")[0].contentWindow.document).ready(function() {
				$("#main #frame").css({"width" : "100%",
						   "height" : "100%",
						   "border" : "0px",
						   "top" : "0",
						   "left" : "0",
						   "background" : "transparent"});
				$("#main #frame #food").remove();
				$("#main #frame").css("float", "left");
				$("#main #frame #block").css("width", "200px");
				$("#main #frame").css("font-family", "arial !important");
				fix();
			});
		} else {
			$("#main").load($(this).attr("href"), function() {
				$("#main #food").remove();
				$("#main").css("float", "left");
				$("#main #block").css("width", "200px");
				$("#main").css("font-family", "arial !important");
				fix();
			});
		}
		return false;
	});
	
	$("#copyright").css({"text-align" : "center",
				"font-family" : "arial",
				"font-size" : "10px",
				"margin-top" : $("#main").css("height")});
}

$(function(){
	if (document.URL === "http://www.elevpresens.se/" ||
		document.URL === "http://www.elevpresens.se/jsp/main.jsp" ||
		document.URL === "http://elevpresens.se/jsp/main.jsp")
		window.location.href = "http://elevpresens.se/";
	
	$("html").html("<html>\
						<head>\
							<title>ElevPresens++</title>\
							<link rel=\"shortcut icon\" href=\"http://elevpresens.se/press.png\" />\
							<link href=\"http://elevpresens.se/stilar/style.css\" type=\"text/css\" rel=\"stylesheet\"/>\
						</head>\
						<body>\
							<div id=\"body\">\
								<div id=\"top\"></div>\
								<div id=\"menu\"></div>\
								<div id=\"main\"></div>\
								<div id=\"copyright\">\
									All trademarks and copyrights held by respective owners.<br/>\
									Copyright &copy; 2013 Dan \"WildN00b\" Printzell. All Rights Reserved.\
								</div>\
							</div>\
						</body>\
					</html>");
	$("body").css("background-color", "#112");
	
	$("#body").css({"width" : "1000px",
					"margin-left" : "auto",
					"margin-right" : "auto",
					"margin-top" : "0px",
					"font-family" : "arial !important"});
	
	$("#top").html("<a href=\"http://www.it-gymnasiet.se\"><img id=\"itlogo\" alt=\"IT-Gymnasiet\" src=\"http://www.it-gymnasiet.se/wp-content/themes/itg2012/frameimages/itgymnasiet_logotype.png\"/></a>\
					<div id=\"foodbox\"></div>");
	$("#top").css({"height" : "100px",
				   "width" : "1000px",
				   "background" : "url(http://elevpresens.se/jsp/Presens.png) center center no-repeat"});
	
	$("#top #itlogo").css({"position" : "absolute",
						  "margin-top" : "4px",
						  "margin-left" : "200px"});

	$("#top #foodbox").load("http://elevpresens.se/jsp/main.jsp #food", function() {
		$("#top #food").css({"background-color" : "#334",
							"color" : "white",
							"position" : "absolute",
							"margin-top" : "0px",
							"margin-left" : "620px",
							"width" : "380px",
							"padding" : "0px 5px 5px 5px",
							"boader" : "1px solid #FFF",
							"box-shadow" : "0px 0px 3px #FFF"});
	});
	
	$("#menu").load("http://elevpresens.se/jsp/meny.jsp #meny", function() {
		$("#menu img, #menu h4, #menu br").remove();
		
		var menu = $("#menu");
		var menulist = $("a", menu);
		
		menulist.sort(function(a, b){
			var keyA = $(a).text();
			var keyB = $(b).text();
			$(a).attr("class", "menu-item");
			$(b).attr("class", "menu-item");
			return (keyA > keyB) ? 1 : 0;
		});
		
		$("#menu #meny").remove();
		
		for (i = 0; i < menulist.length; i++) {
			$("#menu").append(menulist[i]);
			$("#menu").append("<br />");
		}
		
		$("#menu").css({"width" : "175px",
							"float" : "left",
							"text-align" : "rigth"});
		$(".menu-item").css({"background-color" : "#4169E1",
							"color" : "white",
							"width" : "380px",
							"padding" : "0px 5px 0px 5px",
							"margin-bottom" : "10px",
							"boader" : "1px solid #FFF",
							"box-shadow" : "0px 0px 4px 1px #3A5FCD",
							"line-height" : "22px",
							"border-radius" : "3px"});
		fix();
	});
	
	$("#main").css("width", "800px");
	
	$("#main").load("http://elevpresens.se/jsp/main.jsp #holder", function() {
		$("#main #food").remove();
		//$("#main #holder #row:first #column:first").remove()
		$("#main").css("float", "left");
		$("#main").css("font-family", "arial !important");
		fix();
	});
});
