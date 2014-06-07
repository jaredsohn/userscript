// ==UserScript==
// @name           Echo Bazaar Clay Man Fix
// @namespace      http://www.erepublik.com/en/newspaper/freedom-post-180922/1
// @include        http://echobazaar.failbettergames.com/*
// ==/UserScript==

// test if clay man
var test = document.getElementById("area_hdr_name");
if(test.innerHTML == "A PLACE WHERE THERE IS VERY LITTLE SCREAMING"){

document.addEventListener('DOMNodeInserted', function(event) {
	
if(event.target.className == "you_top_lhs"){
var you = document.getElementsByClassName("you_mid_lhs")[0];
	
	// Cameo
	you.getElementsByTagName("img")[0].src = "http://images.echobazaar.failbettergames.com.s3.amazonaws.com/avatars_framable/clay/clayman3.png"; 
	you.getElementsByTagName("img")[0].alt = "YOU";

	// lodginings
	you.getElementsByTagName("img")[2].src = "http://images.echobazaar.failbettergames.com.s3.amazonaws.com/icons/placeholder4.png"; 
	you.getElementsByTagName("img")[2].width = "170";
	you.getElementsByTagName("img")[2].width = "170";
	you.getElementsByTagName("img")[2].alt = "A PLACE WHERE THERE IS VERY LITTLE SCREAMING";


}

		if(event.target.className == "you_top_lhs"){
			document.getElementsByClassName("you_top_lhs")[0].innerHTML = '<h2>YOUR LODGINGS</h2><p><strong>A PLACE WHERE THERE IS VERY LITTLE SCREAMING</strong>: I WORK HERE. IT IS QUIET. I AM PAID. <strong>This address allows you to keep 1 Opportunity card in your hand.</strong></p>';
		}


	}, false);

}
