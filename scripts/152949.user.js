// ==UserScript==
// @name        mijn.ing.nl in English
// @namespace   http://userscripts.org/users/488660
// @include     https://bankieren.mijn.ing.nl/*
// @version     0.1
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {

/*var oldSrc = '/static/contentimages/4925_SOL_logo_ing_v2.gif';
var newSrc = 'https://online.lloydstsb.co.uk/wps/wcm/connect/da3db40041b907e9bbe5ff9f3821e7af/logo-18-1329646262.png?MOD=AJPERES&CACHEID=da3db40041b907e9bbe5ff9f3821e7af';
$('img[src="' + oldSrc + '"]').attr('src', newSrc);*/
  
 		//alert("function main launched");
		
		$("#riaf-header-pagetitle").html($("#riaf-header-pagetitle").html().replace(/Mijn ING Overzicht/,'My ING Overview'));
		
		//Betaalrekeningen
		$(".riaf-content").html($(".riaf-content").html().replace(/Betaalrekeningen/g,'Accounts'));
		
		$(".riaf-content").html($(".riaf-content").html().replace(/Datum/g,'Date'));
		$(".riaf-content").html($(".riaf-content").html().replace(/Af \/ bij Betaalrekening/g,'From\/to account'));
		$(".riaf-content").html($(".riaf-content").html().replace(/Bedrag /g,'Amount'));
		$(".riaf-content").html($(".riaf-content").html().replace(/Direct doen/g,'Quick links'));
		$(".riaf-content").html($(".riaf-content").html().replace(/Betalen/g,'Payments'));
		$(".riaf-content").html($(".riaf-content").html().replace(/Overschrijven/g,'Transfer'));
		
		
		//Alles in Mijn ING
		$("body").html($("body").html().replace(/Alles in Mijn ING/g,'All in My ING'));
		
			//Overviews		
			$("h3:contains('Overzichten')").siblings().html($("h3:contains('Overzichten')").siblings().html().replace(/Mijn ING Overzicht/,'My ING Overview'));
			$("h3:contains('Overzichten')").siblings().html($("h3:contains('Overzichten')").siblings().html().replace(/Overzicht saldo/,'Balance overview'));
			$("h3:contains('Overzichten')").siblings().html($("h3:contains('Overzichten')").siblings().html().replace(/Verzendlijst/,'Pending payments'));
			$("h3:contains('Overzichten')").siblings().html($("h3:contains('Overzichten')").siblings().html().replace(/Mijn berichten/,'Messages'));
			$("h3:contains('Overzichten')").siblings().html($("h3:contains('Overzichten')").siblings().html().replace(/Ingeplande opdrachten/,'Scheduled tasks'));
			$("h3:contains('Overzichten')").siblings().html($("h3:contains('Overzichten')").siblings().html().replace(/Geweigerde opdrachten/,'Refused orders'));
			$("h3:contains('Overzichten')").siblings().html($("h3:contains('Overzichten')").siblings().html().replace(/Afschriften en overzichten/,'Statements and overviews'));
			$("h3:contains('Overzichten')").siblings().html($("h3:contains('Overzichten')").siblings().html().replace(/Jaaroverzichten/,'Yearly overview'));
			$("h3:contains('Overzichten')").siblings().html($("h3:contains('Overzichten')").siblings().html().replace(/Tim - huishoudboekje/,'Tim - household expenses'));
			
				//header (must be the last one)
				$("h3:contains('Overzichten')").html($("h3:contains('Overzichten')").html().replace(/Overzichten/,'Overviews'));
					
			//Payments
			$("h3:contains('Betalen')").siblings().html($("h3:contains('Betalen')").siblings().html().replace(/Saldo bekijken/,'View balance'));

				//header (must be the last one)
				$("h3:contains('Betalen')").html($("h3:contains('Betalen')").html().replace(/Betalen/,'Payments'));
		 

}	
 


// load jQuery and execute the main function
addJQuery(main);