// ==UserScript==
// @name           Twitter AutoLogin
// @namespace      www.twitter.com
// @description    Twitter AutoLogin
// @include        *twitter.com*
// ==/UserScript==



// Milliseconds to wait for form to autofill (necessary in Fx 1.5 - slower computers may need longer wait)
var timer = 1000;
var loginformfound = true;

var timo, maySubmit = true;  // Not currently typing (so we can submit it)

var a = 0;
var form = null;

// Locate form elements; search the Login-form on the page
if (document.forms[0]!=null && 
	document.forms[0].elements.namedItem('remember_me')!=null) form = document.forms[0];
if (document.forms[1]!=null && 
	document.forms[1].elements.namedItem('remember_me')!=null) form = document.forms[1];
if (document.forms[2]!=null && 
	document.forms[2].elements.namedItem('remember_me')!=null) form = document.forms[2];

// If Login-form was found, declare variables, otherwise set loginformfound to FALSE
if (form!=null)
{
	var uid = form.elements.namedItem('session[username_or_email]');
	var pw = form.elements.namedItem('session[password]');
	loginformfound=true;
}
else
{
	loginformfound = false;
}

//only for debugging: //alert('testmsg 1');

// Search for a Loginlink, if there is no form (if already signed in, there is neither form nor Link-to-login)
if (loginformfound == false) 
{
	for (a=0;a<100;a=a+1)
	{
		// Search the Link to the Login-form and ...
		if (document.links[a]!=null && document.links[a].text!=null) 
		{
			if (document.links[a].text=="Login") 
			{
				//only for debugging: //alert(document.links[a].text); //alert('Login-Link found!');
				
				// ... follow the link!			
				self.location.href = document.links[a].href
			}
		}
	};
}

//only for debugging: //alert('testmsg 2');

// is there a login-form?
if(loginformfound==true)
	{
		// Don't submit form as we are typing into it
		pw.addEventListener('keydown', function(e) {
			maySubmit = false;
		
			clearTimeout(timo);
		
			timo = setTimeout(function() {
				maySubmit = true;
				doSignIn();
			}, 2000);
		
		}, true);
	}

function doSignIn() {
	
	// is there a login-form?
	if(loginformfound==true)
	{
		// .. if so, look if firefox already entered account-data
		if(uid.value.length && pw.value.length && maySubmit) {  // Form must be non-empty and not being typed into
			form.elements.namedItem('remember_me').checked = true;
			form.submit();
			//end;
		} 
		//... or wait a while
		else {  // Bide our time...
		window.setTimeout(doSignIn, timer);
		}
	}
}

// Attempt to sign in
if( loginformfound == true) doSignIn();

