// ==UserScript==
// @name         Classified Ads Ianmags
// @namespace    ffUads
// @include      *
// @author       Ian Jan Maganda
// @description  This userscript is meant to pull ads from ayosdito.ph
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript

function ayosDitoAds()
{

		jQ('.price_date_container .date span').remove();
		var mydate = jQ('.price_date_container .date').text().trim();
		mydate = mydate.substring(0, mydate.length - 1);
		
		if(mydate.indexOf('2 Jan') >= 0){
			console.log('stop');
		}
		else{
			jQ('.subject_row h1 span').remove();
			jQ('.adview_body span').remove();
			jQ('.contact_seller_info strong').remove();
			jQ('.contact_seller_info a').remove();
			
			var title    = jQ('.view-ad-subject').text().trim();
			var category = jQ('.parent_cat').text().trim();
			var budget   = jQ('.view-ad-amount').text().trim();
			var desc     = jQ('.view-ad-body').html();
			var contact  = jQ('.view-ad-phone').html();
			var source   = document.URL;

			desc = desc.replace('&', ' and');
        			jQ.ajax({
        			type: "GET",
        			url: "http://localhost/unemployed_pinoys/auto/add.php",
        			data: {
        				title: title, 
        				budget: budget,
        				desc: desc,
        				contact: contact,
        				source: source,
        				date: mydate
        			},
        			async: false
        		  });
			jQ('.view-ad-next a').click();

		
	}
}


// load jQuery and execute the main function
addJQuery(ayosDitoAds);
