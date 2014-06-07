// ==UserScript==
// @name           OE3.orf.at Youtube Links
// @namespace      ytOE3
// @include        http://charts.orf.at/oe3/hoerercharts/*
// ==/UserScript==
  var $;



  // Add jQuery

  var GM_JQ = document.createElement("script");

      GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";

      GM_JQ.type = "text/javascript";



  document.body.appendChild(GM_JQ);



  // Check if jQuery's loaded

  var checker=setInterval(function(){

    if(typeof ($ = unsafeWindow.jQuery) != "undefined") {

          clearInterval(checker);

          letsJQuery();

     }

   },100);



  function letsJQuery() {

	// Lookup the Title row and get the tbody of the charttable (ct)

	var $ct = $(".charttable_center").children("table").children("tbody");
	

	// Ignore the first row and jump over the dotted lines between the chartlines

	$ct.children(".chartRow").each(function($l){

		var gq= $(this).children(".chartTitle").text() + " - " + $(this).children(".chartArtist").text() + " youtube";

		$(this).append(

			"<td><a href='http://www.google.at/search?rls=ig&hl=de&source=hp&btnI=Auf+gut+Glück!&q=" + gq +

			 "' target='_blank'><img style='border:0px;' src='http://imgur.com/bxwaw.png' ></a></td>");

	});
	

  }

