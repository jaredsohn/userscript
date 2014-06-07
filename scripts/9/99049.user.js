 // Copyright (c) 2011, Matthias Ries
// This file is licensed under the terms of the Artistic License 2.0 as
// described at http://www.opensource.org/licenses/artistic-license-2.0.php
//
// Use and/or redistribution under the terms of the GNU Lesser GPL 2.1
// (http://www.opensource.org/licenses/lgpl-2.1.php) is also allowed.
//
// This is a GreaseMonkey user-script. To install and use this, you must first
// have GreaseMonkey installed in your browser: http://greasemonkey.mozdev.org/
//
// ==UserScript==
// @name           xtc Admin RandomEmail 
// @namespace      http://xt-xommerce.com/admin/create_account.php
// @include        http://*/admin/create_account.php
// @include        http://*/admin/customers.php*
// @version        0.0.1  (15. March 2011 )
// @author         Matthias, Ries
// @description    generates unique example.com mail-adresses for new users. I made it for our ServiveCenter and user without email-adress. Yes, they exists. More then you may think :-)
// ==/UserScript==

(
function (){

var inputs = document.getElementsByTagName('input');
var count;
for ( c in inputs )
{
	if (inputs[c].name == "customers_email_address") count = c;
}

	var body    = document.getElementsByTagName("body")[0];
	var e       =  document.createElement('script');
	e.type      =  'text/javascript';
	e.innerHTML = "function setFakeEmail() { \n"
                    + "var d = new Date;"
                    + "InputMail.value = d.getTime() +'@example.com'; "
                    + "};\n"
                    + "var InputMail = document.getElementsByTagName('input')["+count+"];"
		    + "if (InputMail.value == '' ){ setFakeEmail()};";
	body.appendChild(e);

	body   = document.getElementsByTagName('input')[count].parentNode;
	e      = document.createElement('input');
	e.class="button";
	e.type = 'submit';
	e.setAttribute('onClick','setFakeEmail();');
	e.value="Fake Email";
	body.appendChild(e);

})()
