// ==UserScript==
// @name           csfd vrat www a imdb zpet
// @namespace      deamonicky script
// @description    csfd vrati www a imdb zpet
// @include        http://www.csfd.cz/film/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

	var barva_ikonek_bude = "dle hodnoceni"; // vyber si mezi "cervena", "modra", "seda" a "dle hodnoceni"
	// pozn. uprav mapu m kdyz se zmeni jmeno	
	

// 0 ... 100 ?
function CSFD_FilmRating() {
		// there is a class containing this information
		var rating_with_percents = $('[class=average]').html();
		var rating = rating_with_percents.split("%")[0]; // 50% -> 50, %
		return rating;	
}
// seda, modra, cervena
function CSFD_RatingToColor(rating) {
		if (rating < 30)
			return "seda";
		else if (rating < 70)
			return "modra";
		else
			return "cervena";
}




// 1. get back the link	
	/*
	$("[class=links]").each(function () {
		alert(': ' + $(this).html());  
	});//.append($("[class^=links]").get()[1]);//.get().reverse());
	// OK
	*/
	// http://api.jquery.com/category/selectors/
	original = $("[class=links]:lt(1)").html();
	www_and_imdb = $("[class=links]:gt(0)").html()
	// OK
	// DEBUG alert(original);alert(www_and_imdb);
	$("[class=links]:lt(1)").html(original + www_and_imdb);

// 2. get back the images
	// found at archive.org
	// tried if it is still on csfd and it is
	var imdb_icon = "http://img.csfd.cz/images/new/film/imdb1.gif"
	var www_icon = "http://img.csfd.cz/images/new/film/ikona_www1.gif"
	

	// barva -> id in image	
	var m = {"cervena":1,"modra":2,"seda":3};
	if (barva_ikonek_bude == "dle hodnoceni") {
		var rating = CSFD_FilmRating();
		barva_ikonek_bude = CSFD_RatingToColor(rating);
		// alert(rating + "->" + barva_ikonek_bude);
	} else {
		// user sets it	
		// TODO: solve invalid value !!!
	}
	var vyber_kterou_barvu = m[barva_ikonek_bude];
	
	
	// parts of image atlas, image sprites
	// http://www.w3schools.com/css/css_image_sprites.asp
		var image_properties = { "www": {
									"width":"82px",
									"height":"42px",
									// MUST have http://
									//
									"background":"url(http://img.csfd.cz/sites/web/images/profile/links-"+vyber_kterou_barvu+".png) -476px -6px"
									},
								"imdb": {
									"width":"82px",
									"height":"42px",
									// MUST have http://
									//
									"background":"url(http://img.csfd.cz/sites/web/images/profile/links-"+vyber_kterou_barvu+".png) -570px -6px"
									}
								};	
	
	
	// alert(h1+h2);
	// OK
	/*
				<li>
	
					<a href="http://thedarkknight.warnerbros.com/" class="www" title="oficiální web">
						<img src="http://img.csfd.cz/sites/web/images/common/blank.gif" class="www" alt="oficiální web">
					</a>
				</li>
				<li>
	
					<a href="http://www.imdb.com/title/tt0468569/combined" title="profil na IMDb.com">
						<img src="http://img.csfd.cz/sites/web/images/common/blank.gif" class="imdb" alt="IMDb">
					</a>
				</li>
	*/
	// all images 
	// $("img").each(function () { y+=$(this).attr("src");});
	//var y = "@";
	//alert(y);
	
	// pro obrazky ... img
	// ktere maji tridu www ... [class=www]
	// pro prvni ... :tl(1)
	$("img[class=www]:lt(1)").each(function () {
		$(this).css(image_properties["www"]);
		// toto je puvodni verze		
		// CHYBA .... nechal jsem tam y+=;
		//$(this).attr("src","");//www_icon);
		});
	$("img[class=imdb]:lt(1)").each(function () { 
		$(this).css(image_properties["imdb"]);		
		//$(this).attr("src",imdb_icon);
		});
