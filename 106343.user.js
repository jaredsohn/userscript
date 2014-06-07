// ==UserScript==
// @name           Wishlist Fix
// @namespace      C:\Users\Sean\Documents\Wishlist Fixer\Chrome\Wishlist Fixer Chrome\redirector.js
// @description    Fixes wishlists
// @include        https://*.newegg.com/*
// ==/UserScript==

	
setTimeout(redirector(), 750);	
	
function redirector(){
	var location = window.location.href;
			
	if(location.indexOf("%2fWishList%2fMySavedWishDetail") > -1){
	
		var removeable = location.lastIndexOf("ID%3d");
		var removeablecorrect = removeable + 5;
		var wishlistid = location.substring(removeablecorrect);
		var correctwishlist = "http://secure.newegg.com/WishList/PublicWishDetail.aspx?WishListNumber=" + wishlistid;
		
		window.location = correctwishlist;
	
	}
	
	if(location.indexOf("MySavedWishDetail") > -1 && document.getElementsByClassName('contif') != null ){
			
		var text = document.getElementsByClassName('continf');
							
		if( text[0].innerHTML.indexOf('This wish list is empty.') > -1 ){	
			var removeable = location.lastIndexOf("ID=");
			var removeablecorrect = removeable + 3;
			var wishlistid = location.substring(removeablecorrect);
			var correctwishlist = "http://secure.newegg.com/WishList/PublicWishDetail.aspx?WishListNumber=" + wishlistid;
			
			window.location = correctwishlist; 
		}
	} 
		
}