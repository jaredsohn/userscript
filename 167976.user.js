// ==UserScript==
// @name            ServiceNow De-ugh-ifier
// @description     Redirects after you log in
// @version         1
// @include         https://liberty.service-now.com/*
// @author          Matthias Dailey <matthias@zeroriginal.com>
// ==/UserScript==

(function () {
	
	var base_domain = 'https://liberty.service-now.com/';
	// also modify the @include line
	
	// time to wait before redirecting
	var wait_ms = 1000;
	
	// if on the stupid page
	if (location.pathname == '/ess/home.do') {
		
		// if topmost frame
		if (self === top) {
			
			// if the login form is not present
			if (!document.getElementById('sign_in_block')) {
				// redirect
				setTimeout(function() {
					//debugger;
					location = base_domain;
				}, wait_ms);
			}
		}
		else {
			
			// redirect to home.do
			setTimeout(function() {
				//debugger;
				location = base_domain + 'home.do';
			}, wait_ms);
			
		}
		
	}
	
	// welcome page -- shut up and be useful!
	if (location.pathname == '/welcome.do') {
		
		// redirect to home.do
		setTimeout(function() {
			//debugger;
			location = base_domain + 'home.do';
		}, wait_ms);
		
	}
	
}())