// ==UserScript==
// @name           Gmail from address selector
// @namespace      test123
// @description    Selects the from address of same domain your sending to
// @include        http*://mail.google.tld/mail/*
// ==/UserScript==

//-----------------------------------------------------------
// set this to index of email address you want to use
// index of 1 would select the second email in the drop down list
// index of 2 would select the third email in the drop down list and so on,
//-----------------------------------------------------------
var emailIndex = 2;
//-----------------------------------------------------------
// Check for certain email addresses
// this can be changed
// currently changes from address if emails are sent to a .edu email address
//-----------------------------------------------------------
var email_regex = ".*(.edu).*";

document.addEventListener('click',function(event) {
 	if (event.target.id=='snd') {
		// About to send the message	 	
		var to;
		var cc;
		var bcc;
		var from;
		
		to = document.getElementsByName('to')[0].value
		cc = document.getElementsByName('cc')[0].value
		bcc = document.getElementsByName('bcc')[0].value

		from = document.getElementsByName('from')[0].value
		
		


		//-----------------------------------------------------------
		// Check for certain email addresses
		// this can be changed
		//-----------------------------------------------------------										 
		var myTest=new RegExp(email_regex);
		if(to.match(myTest) || cc.match(myTest) || bcc.match(myTest)){

			var frombox = document.getElementsByName('from')[0]

			//uncomment to figure out the number of the option you want to select
			//or you can figure it out by looking at the drop down list 
			//first address is index 0, next is 1, ...
			/*for (var i=0;i<frombox.options.length; i++) {
				alert(frombox.options[i].value + ' ' + i);	 				
			}*/

			frombox.selectedIndex = emailIndex;
			//following line used for debugging the regular expression
			//alert(frombox.length + ' ' + frombox.multiple + ' ' + frombox.options[2].value);
 		}		
	}
}, true);
