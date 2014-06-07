// ==UserScript==
// @name		Sum Of All Fears
// @namespace	http://www.megacoder.com
// @description Show total of price + shipping
// @include		http://www.ebay.com/sch/*
// @include		https://www.ebay.com/sch/*
// @require		http://code.jquery.com/jquery-1.8.0.min.js
// ==/UserScript==

// This works for the list view as of 2012-03-24

$(document).ready(function(){
	var	ship_fees = document.getElementsByClassName( 'ship fee' );
	var n = ship_fees.length;
	// alert( n + ' ship_fees' );
	for( var i = 0; i < n; ++i )	{
		// Get the players
		var	ship_fee = ship_fees[i];
		var gb = ship_fee.parentNode.firstChild;
		var currency = gb.innerHTML.substring(0,1);
		// Do the math
		var fee = parseFloat(ship_fee.innerHTML.substring(2).replace(/,/,''));
		ship_fee.innerHTML = '+' + currency + fee.toFixed(2);
		var	cost = parseFloat(gb.innerHTML.substring(1).replace(/,/,''));
		var total = cost + fee;
		// Append div.total containing a span with sum
		var div = document.createElement( 'div' );
		div.setAttribute( 'class', 'total' );
		div.style.paddingTop = '5px';
		var msg = document.createElement( 'span' );
		msg.style.color = "red";
		msg.style.fontWeight = 'bold';
		msg.appendChild( document.createTextNode( 'Total ' + currency + total.toFixed(2) ) );
		div.appendChild( msg );
		ship_fee.parentNode.appendChild( div );
	}
});
);

// vi: noet sw=4 ts=4
