// ==UserScript==
        // @name            University of Hawaii Wired/Wireless Vernier/RLH Auto-Login
        // @description     Automatically logins in to Vernier/RLH on University of Hawaii wired/wireless if Firefox remembers your password.
        // @include         https://166.122.60.52/logon*
// ==/UserScript==        
        var timer = 1000;
        
        var form = document.forms.namedItem('logonForm');
        var uid = form.elements.namedItem('username');
        var pw = form.elements.namedItem('password');
        var realButton = form.elements.namedItem('logon_action');
        
        function doSignIn() {
        	if(uid.value.length && pw.value.length) {
        		if(realButton){
        		     realButton.click();
        		} else {
        		     form.submit();
        		}
        	} else { 
        		window.setTimeout(doSignIn, timer);
        	}
        }
        
        doSignIn();