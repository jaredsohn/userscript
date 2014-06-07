// ==UserScript==
// @name           YoutubeLinks for gotv charts
// @namespace      ytGoTv
// @description    YoutubeLinks for gotv charts
// @include        http://gotv.at/charts_detail.php?id=*
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



  function letsJQuery() {

	// Lookup the Title row and get the tbody of the charttable (ct)

	var $ct = $("#admin").children("tbody");

	// Ignore the first row and jump over the dotted lines between the chartlines

	$ct.children("tr").each(function($l){

		var gq= $(this).children("td").eq(3).text() + " - " + $(this).children("td").eq(5).text() + " youtube";

		$(this).append(

			"<td><a href='http://www.google.at/search?rls=ig&hl=de&source=hp&btnI=Auf+gut+Glück!&q=" + gq +

			 "' target='_blank'><img style='border:0px;' src='http://imgur.com/bxwaw.png' ></a></td>");

	});
	

  }




