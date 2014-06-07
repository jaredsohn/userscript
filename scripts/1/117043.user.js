// ==UserScript==
// @name          Erepublik unsubscribe for all newspaper
// @include       http://www.erepublik.com/en/news/subscriptions
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js
// @copyright     Botherlong
// @version       1.0
// ==/UserScript==

$(document).ready(function(){
	var taken = $('#award_token').attr('value');
	var id = $('#filters > .rightfilters > .asubs > ul > li').map(function(){ return (this.id==undefined) ? null : this.id.split('newspaper_')[1];}).get();
	jQuery.post('/subscribe', {
		_token: taken,
		type: 'unsubscribe',
		n: id
	});
});