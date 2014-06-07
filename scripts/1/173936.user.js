// ==UserScript==
// @name        BTCJAM Listings
// @description Click on "Invest :: Browse listings" submenu. Wait while the script finishes, watch out for ROI while investing.

// @author	mandarin_courses

// @namespace   -
// @include     https://btcjam.com/listings
// @version     0.01
//
// @grant	none
// @history	0.01.2	repayment (Active Loan , Loan listing)
// @history 	0.01.1	fixed monthly rate; new interval "every day"
// ==/UserScript==

document.getElementsByName('listings-table_length')[0].onchange = function() {

//----- PREPROCESS
window.disp = function( borrower, badge, listing ) {
	var odd = document.getElementsByClassName('odd');
	var even = document.getElementsByClassName('even');
	window.tr = [];
	for (i = 0; i < even.length; i += 1) {
		tr.push(odd[i]);
		tr.push(even[i]);
	};
//----- LISTING DETAILS
	window.i_listing = 0;
	
	window.next_user = function() {
		xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				(function(DOMParser) {  
					"use strict";  
					var DOMParser_proto = DOMParser.prototype  
					  , real_parseFromString = DOMParser_proto.parseFromString;
				
					// Firefox/Opera/IE throw errors on unsupported types  
					try {  
						// WebKit returns null on unsupported types  
						if ((new DOMParser).parseFromString("", "text/html")) {  
							// text/html parsing is natively supported  
							return;  
						}  
					} catch (ex) {}  
				
					DOMParser_proto.parseFromString = function(markup, type) {  
						if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {  
							var doc = document.implementation.createHTMLDocument("")
							  , doc_elt = doc.documentElement
							  , first_elt;
				
							doc_elt.innerHTML = markup;
							first_elt = doc_elt.firstElementChild;
				
							if (doc_elt.childElementCount === 1
								&& first_elt.localName.toLowerCase() === "html") {  
								doc.replaceChild(first_elt, doc_elt);  
							}  
				
							return doc;  
						} else {  
							return real_parseFromString.apply(this, arguments);  
						}  
					};  
				}(DOMParser));
				
				var re_user = /users\/([0-9]+)/;
				var user    = xmlhttp.responseText.match( re_user );
				var re_btc  = /([0-9]+\.[0-9]+) \@/;
				var active  = parseFloat( window.tr[ window.i_listing ].textContent.match( re_btc )[0] );
				var the_return = window.repayment_percentage( window.tr[ window.i_listing ] ) / 100;
				if ( user[1] in window.borrower ) {
				  var loan = window.borrower[ user[ 1 ] ].loan.toFixed(4);
				  document.getElementsByTagName('dl')[window.i_listing + 2].innerHTML += 
					 ' B' + loan + 
					 ' (' + (100 * 1 / ( active * the_return + window.borrower[ user[ 1 ] ].loan )).toFixed(0) + '%)' //DONE v0.01.2
				} else {
				  document.getElementsByTagName('dl')[window.i_listing + 2].innerHTML += 
					 ' B0.0000' +
					 ' (' + (100 * 1 / active / the_return ).toFixed(0) + '%)' //DONE v0.01.2
				};
				window.i_listing  += 1;
				if ( window.i_listing < window.tr.length ) {
				  window.next_user(); } else {
				  alert('end');
				};
			};
		}; // end onreadystatechange
		var re_listing = /listings\/([0-9]+)/;
		xmlhttp.open('GET',  'https://btcjam.com/' + window.tr[ window.i_listing ].innerHTML.match( re_listing )[0] 	); 
		xmlhttp.send();
	}; //end function
	
	window.next_user();
//----- LISTING DETAILS END
	var config = [ { 'interval': 30, 'step': 20, 'min': 2 }, { 'interval': 60, 'step': 40, 'min': 10 } ];
	var re_interval = /[0-9]+ day/g;
	var re_profit = /([0-9]+\.[0-9]+)%/; //DONE v0.01.1: fixed float
	var re_ebay     = /ebay\: [0-9]{2,}/;
	var re_day      = /every ([0-9]+)[a-z]+ of the month/;
	var re_week     = /every 7 days/;
	var re_every_day= /every day/;  //DONE v0.01.1: "every day" interval
	var re_identity = /Identity verified/; //arbitration after 90 days
	var re_tor      = /used Tor/;
	var re_btc      = /[0-9]+\.[0-9]+/;
	var re_listing = /listings\/([0-9]+)/;
	var re_pm   = /\+[0-9], \-[0-9]+/;
	var re_badge= /badge[^0-9]+([0-9]+)/;
	var met_criterion = 0;
	var max_asset   = 0;
	for (i = 0; i < tr.length; i += 1) {
		the_return     = window.repayment_percentage( tr[i] );
		var r =          the_return - 100;
		var risk = 3;
		for ( var step = config[0].step; r - step > 0 && step > config[0].min; step /= 2 ) {   //40 , 60, 80, 90
		  r -= step;
		  risk += 2;
		};
		var ebay = tr[i].textContent.match(re_ebay);
		if ( ebay != null ) {
			ebay = "background-color: #CCFFFF\;"; 
		} else {
			ebay = "background-color: #FFFFFF\;";
		};
		var identity = tr[i].innerHTML.match(re_identity);
		if ( !!identity ) {
			identity = '<img alt="Identity verified" src="/assets/id_icon-1df5da9213c560f638c6fb83eda6728e.png" title="Identity verified">';
		} else {
			identity = '';
		};
		var tor = tr[i].innerHTML.match(re_tor);
		if ( !!tor ) {
			tor = 'text-decoration: line-through\;';
		} else {
			tor = '';
		};
		if ( tor == ''
		  && identity != ''
		  && ebay.indexOf( 'CC' ) > -1 ) {
		  met_criterion += 1;
		  var btc = tr[i].textContent.match(re_btc);
		  if ( btc[0] > 1 ) {
			btc = 1 / btc[0];
		  } else {
			btc = 1;
		  };
		  max_asset += btc;
		};
		var pm = tr[i].textContent.match( re_pm );
		var a_badge = tr[i].innerHTML.match( re_badge );
		var loan = '';
		if ( pm + ' ' + a_badge in badge ) {
		  
		  if ( badge[ pm + ' ' + a_badge ].user.length > 1 ) {
			;
		  } else {
			loan = 'B' + borrower[ badge[ pm + ' ' + a_badge ].user[0] ].loan.toFixed(4);
		  };
		};
		document.getElementsByTagName('dl')[i + 2].innerHTML += 
		  ' <b style="color: #' + risk + '0' + ( 12 - risk ) + '000\; ' + ebay + ' ' + tor + '">'
		  + the_return.toFixed(4) + '</b>' + identity;
	};
	document.getElementsByTagName('h1')[0].innerHTML +=
	  ' ' + met_criterion +
	  ' (B' + max_asset.toFixed(4) + ') out of ' + tr.length;
		

};

//----- REPAYMENT

window.repayment_percentage = function( a_row ) {
	var re_interval = /[0-9]+ day/g;
	var re_profit = /([0-9]+\.[0-9]+)%/; //DONE v0.01.1: fixed float
	var re_day      = /every ([0-9]+)[a-z]+ of the month/;
	var re_week     = /every ([0-9]+) days/; //less than a month
	var re_every_day= /every day/;  //DONE v0.01.1: "every day" interval
		var interval = a_row.textContent.match(re_interval);
		if ( interval.length < 2 )
		  interval[1] = 1;
		var d = new Date();
		var target_day = a_row.textContent.match(re_day);
		var week     = a_row.textContent.match(re_week);
		var e_day    = a_row.textContent.match(re_every_day); //DONE v0.01.1: "every day" interval
		var n_o_payment= null;                                //DONE v0.01.1: monthly interval
		if ( !!week 
		  && interval.length < 3 ) {
		  interval[1] = 1;
		  target_day  = null;
		} else if (
			 !!week
		  && interval.length == 3 ) {
		  interval = [ interval[0], interval[2] ];
		  target_day = null;
		};
		if ( !!week )  n_o_payment = Math.floor( parseInt(interval[0]) / week[1] ); //DONE v0.01.1
		if ( !!e_day)  n_o_payment = parseInt(interval[0]);                   //DONE v0.01.1
		if ( !!target_day) n_o_payment = Math.floor( parseInt(interval[0]) / 30); //DONE v0.01.1
		if ( n_o_payment === 0 ) n_o_payment = 1;                             //DONE v0.01.1
		if ( parseInt(interval[0]) > 7
		  && !!target_day && target_day.length > 1
		  && d.getDate() + parseInt(interval[1]) > parseInt(target_day[1]) ) {
		  interval[0] = parseInt(interval[0]) + 30 - d.getDate() - parseInt(interval[1]) + parseInt(target_day[1]);
		} else {
		  interval[0] = parseInt(interval[0]);
		};
	    var limit  = interval[0];
	    if ( interval[0] < 30 )
			limit  = 30; //term is 30 days or less
		var profit = a_row.textContent.match(re_profit);
		if ( profit[1] > 0 )
		profit[1]  = n_o_payment * (
			       parseFloat( profit[1] ) / 100 +
			       parseFloat( profit[1] ) / 100 / (
			         Math.pow( 1 + parseFloat( profit[1] ) / 100, n_o_payment ) - 1
			       )
			     ) * 100 - 100; //DONE v0.01.1: monthly interval; float
		return (limit / (interval[0] + parseInt(interval[1]))
						  * parseFloat(profit[1]) + 100); //DONE v0.01.1: monthly interval; float
	//DONE v0.01.2: repayment
};
	
	
//----- POSTPROCESS
	
xmlhttp=new XMLHttpRequest();
xmlhttp.onreadystatechange=function() {
if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		
		(function(DOMParser) {  
			"use strict";  
			var DOMParser_proto = DOMParser.prototype  
			  , real_parseFromString = DOMParser_proto.parseFromString;
		
			// Firefox/Opera/IE throw errors on unsupported types  
			try {  
				// WebKit returns null on unsupported types  
				if ((new DOMParser).parseFromString("", "text/html")) {  
					// text/html parsing is natively supported  
					return;  
				}  
			} catch (ex) {}  
		
			DOMParser_proto.parseFromString = function(markup, type) {  
				if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {  
					var doc = document.implementation.createHTMLDocument("")
					  , doc_elt = doc.documentElement
					  , first_elt;
		
					doc_elt.innerHTML = markup;
					first_elt = doc_elt.firstElementChild;
		
					if (doc_elt.childElementCount === 1
						&& first_elt.localName.toLowerCase() === "html") {  
						doc.replaceChild(first_elt, doc_elt);  
					}  
		
					return doc;  
				} else {  
					return real_parseFromString.apply(this, arguments);  
				}  
			};  
		}(DOMParser));
			
		var newDiv = new DOMParser().parseFromString( xmlhttp.responseText , 'text/html');
		if ( !!newDiv ) {
		} else {
			alert('null: unsupported browser');
		};
		var row = newDiv.body.getElementsByTagName('tr');
		var tr = [];
		for (i = 0; i < row.length; i += 1) {
			tr.push(row[i]);
			};
		var re_user = /users\/([0-9]+)/;
		var re_pm   = /\+[0-9], \-[0-9]+/;
		var re_badge= /badge[^0-9]+([0-9]+)/;
		var re_btc      = /[0-9]+\.[0-9]+/;
		var re_listing = /listings\/([0-9]+)/;
		window.borrower = {};
		window.badge    = {};
		window.listing  = {};
		for (i = 0; i < tr.length; i += 1) {
			var user = tr[i].innerHTML.match( re_user );
			var btc  = tr[i].textContent.match( re_btc );
			var a_listing = tr[i].innerHTML.match( re_listing );
			if ( !!user ) {;} else {
				continue;
			};
			if ( user[1] in window.borrower ) {
				if ( parseFloat(btc[0]) < window.borrower[ user[1] ].min )
					window.borrower[ user[1] ].min = parseFloat(btc[0]);
				window.borrower[ user[1] ].loan += parseFloat(btc[0]) *
					                                 window.repayment_percentage( tr[i] ) / 100; //DONE v0.01.2: repayment
			} else {
				window.borrower[ user[1] ] = { 'loan': parseFloat(btc[0]), 'min': parseFloat(btc[0]) };
				};
			window.listing[ a_listing[1] ] = user[1];
			var pm = tr[i].textContent.match( re_pm );
			var a_badge = tr[i].innerHTML.match( re_badge );
			if ( pm + ' ' + a_badge in window.badge ) {
				window.badge[ pm + ' ' + a_badge ].user.push( user[1] );
				
			} else {
				window.badge[ pm + ' ' + a_badge ] = { user: [ user[1] ] };
				};
			};
		for ( a_b in borrower )
		  console.log( a_b + ':' + borrower[a_b].loan + ' ' + borrower[a_b].min );	
		window.disp( borrower, badge, listing );		
	}; //end check status
};										
xmlhttp.open('GET',  'https://btcjam.com/loans'); 
xmlhttp.send();
	
	
};