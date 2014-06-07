// ==UserScript==
// @name        BitLendingClub Listings (BLC)
// @description Click on "Invest" on the menu bar. Watch out for ROI while investing.

// @author	mandarin_courses

// @namespace   -
// @include     http://bitlendingclub.com/loan*
// @include     https://bitlendingclub.com/loan*
// @version     0.0.1
//
// @grant		none
// ==/UserScript==

window.addEventListener('load', function() {

//----- PREPROCESS
window.disp = function( ) {
	var row = document.getElementById('listing-table').getElementsByTagName('tr');
	window.tr = [];
	for (i = 1; i < row.length - 1; i += 1) { //last row is the footer
		tr.push(row[i]);
		console.log( row[i] );
	};
//----- USER DETAILS END
	window.next_profile = function( user_uri ) {
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
				
				var config = [ { 'interval': 30, 'step': 20, 'min': 2 } ];
				var newDiv = new DOMParser().parseFromString( xmlhttp.responseText , 'text/html');
				var row = newDiv.body.getElementsByTagName('table')[0].getElementsByTagName('tr');
				
				var re_btc = /[0-9]+\.[0-9]+/;
				var user    = window.loan[ window.i_listing ].user;
				
				if ( typeof(window['borrower']) == 'undefined' )
					window.borrower = {};
				
				for (i = 1; i < row.length; i += 1) {
					var btc = row[i].textContent.match( re_btc );
					if (!( user[1] in window.borrower))
				      window.borrower[ user[1] ] = { 'loan': 0, 'min': parseFloat( btc[0] ) };
					if ( window.borrower[ user[1] ].min > parseFloat(btc[0]) )
					  window.borrower[ user[1] ].min = parseFloat( btc[0] );
					if ( row[i].textContent.indexOf( 'repaid/closed' ) == -1 ) //means not found
					  window.borrower[ user[1] ].loan += parseFloat( btc[0] );
				};
				  var the_return = 0;
				  if ( !!(window.loan[ window.i_listing ].rate)
					&& !!(window.loan[ window.i_listing ].expires) ) {
					  the_return = (config[0].interval / 
						(window.loan[ window.i_listing ].interval +
						window.loan[ window.i_listing ].expires ) * 
						window.loan[ window.i_listing ].rate + 100).toFixed(4);
				  } else {
				    the_return = '0 bids'; 
				  };
				var re_identity = /class=\"green\"/;
				var identity = '';
				if ( re_identity.test( 
					newDiv.body.getElementsByClassName('contnet')[0].getElementsByTagName('li')[0].innerHTML
				  ) )
				  identity = '<img alt="Identity verified" src="/images/profile-icon.png" title="Identity verified">';
				var a_loan = ( window.borrower[ user[ 1 ] ].loan ); // -
  			    //  window.loan[ window.i_listing ].size ).toFixed(4);
				if ( !!(window.loan[ window.i_listing ].expires) )
				  document.getElementsByClassName('listing-title')[window.i_listing].innerHTML += 
					 '<br>' + the_return + identity +
					 ' B' + ( a_loan - window.loan[ window.i_listing ].size ).toFixed(4) + 
					 ' (' + (100 / a_loan ).toFixed(0) + '%)';

				window.i_listing  += 1;
				if ( window.i_listing < window.tr.length ) {
				  window.next_user(); //cough cough, next listing				
				}
				else {
				  alert('end');
				};
			}; //end check status
		}; // end onreadystatechange
		xmlhttp.open('GET',  user_uri); 
		xmlhttp.send();		
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
				
				var newDiv = new DOMParser().parseFromString( xmlhttp.responseText , 'text/html');
				var row = [];
				try {
				  row = newDiv.body.getElementsByTagName('table')[0].getElementsByTagName('tr');
				} catch( e ) {
				  ;
				};
				var re_interval = /([0-9]+) day/g;
				var re_expires  = /\+([0-9]+) day/;
				var re_rate = /([0-9]+)\%/;
				var a_rate = null;
				
				for (i = 1; i < row.length; i += 1) {
					if ( !!a_rate 
					  && parseInt( row[i].textContent.match( re_rate )[1] ) < a_rate ) {
					  a_rate = parseInt( row[i].textContent.match( re_rate )[1] );
					}
					else {
					  a_rate = parseInt( row[i].textContent.match( re_rate )[1] );
					};
				};

			    var expires_day = xmlhttp.responseText.match( re_expires );
			    if ( !!expires_day )
				  expires_day = parseInt( expires_day[1] );
				var re_user = /user\/index\/id\/([0-9]+)/;
				var user    = xmlhttp.responseText.match( re_user );
			    var re_btc  = /[0-9]+\.[0-9]+/;
			    if ( typeof(window['loan']) == 'undefined' )
				  window.loan = {};
			    window.loan[ window.i_listing ] = {
					size: 
                      parseFloat( window.tr[ window.i_listing ].textContent.match( re_btc ) ),
					rate:
					  a_rate,
					interval:
					  parseInt( xmlhttp.responseText.match( re_interval )[1].match( /[0-9]+/ )[0] ),
					expires:
					  expires_day,
					user:
					  user
		          };						
				window.next_profile( 'http://bitlendingclub.com/' + user[0] );
			};
		}; // end onreadystatechange
		var re_listing = /loan\/browse\/lid\/([0-9]+)/;
		xmlhttp.open('GET',  'http://bitlendingclub.com/' + window.tr[ window.i_listing ].innerHTML.match( re_listing )[0] 	); 
		xmlhttp.send();
	}; //end function
	
	window.next_user();
//----- LISTING DETAILS END


};

//----- POSTPROCESS
// no summary page for active loans, dammit

window.disp(  );
	
	
});