// ==UserScript==



// @name           IdenticArt

// @namespace      http://userscripts.org/users/409410

// @autor          Teles

// @include        http://devianteles.deviantart.com/#/d4wddl7

// @date           22/04/2012

// @version        0.1

// @require  	   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js





// ==/UserScript==



$(function(){
	$('a.share-button.facebook').hide();
	bt_identica=$('a.share-button.twitter').clone();
	$(bt_identica).css('background','red url("http://3birds.com.br/teles/userscripts/identica.png")');
	$(bt_identica).prependTo($('a.share-button.twitter').parent());		

})