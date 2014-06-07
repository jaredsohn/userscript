// ==UserScript==
// @name           DJ Charts Austria Youtubelinks
// @namespace      dca
// @include        http://www.wdjc.de/dca/*
// ==/UserScript==
  // set up jQuery variable
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
  var $ct;
  function letsJQuery() {
	// Lookup the Title row and get the tbody of the charttable (ct)
	$ct = $(".txt_mini:contains('pos')").parent().parent();
	
	// Ignore the first row and jump over the dotted lines between the chartlines 

	$ct.children("tr:gt(0)").each(function($l){
		var gq= $(this).find(".txt_chart_artist").text() + " - " + $(this).find("td .txt_chart_titel").text() + " youtube";
		$(this).append(
			"<td><a href='http://www.google.at/search?rls=ig&hl=de&source=hp&btnI=Auf+gut+Glück!&q=" + gq +
			 "' target='_blank'><img style='border:0px;' src='http://imgur.com/bxwaw.png' ></a></td>");
	});

  }

