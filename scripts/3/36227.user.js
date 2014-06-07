// ==UserScript==
// @name           Productivity Enhancer
// @namespace      http://www.cogulus.com/
// @description    Reminds you to get back to work.
// @include        http://*.nytimes.com*
// @include        http://*.huffingtonpost.com*
// @include        http://*.slate.com*
// @include        http://*.washingtonpost.com*
// ==/UserScript==

// Updates:
// 2008-11-14
// - Added stricter redirect after 5 minute grace period
//
// 2008-10-29
// - Script Created


( function() {

	/* -- Begin Preferences ----------------------------------------- */

	// How many minutes should you be allowed to procrastinate?
	var time_in = 10;
	
	// How many minutes before you should be allowed to return?
	var time_out = 60;
	
	// Where should you go to be more productive?
	var work_web = 'http://library.williams.edu/';
	
	/* -- End Preferences ------------------------------------------- */
	
	
	

	// Cookie Functions  ////////////////////  (:)
	
	// Set the cookie.
	// SetCookie('your_cookie_name', 'your_cookie_value', expire);
	
	// Get the cookie.
	// var someVariable = GetCookie('your_cookie_name');
	
	// set cookie to expire after time_out mins
	var expire = new Date(); 
	expire.setTime(expire.getTime() + ((time_in + time_out)*60*1000)); 
	
	function getCookieVal (offset) {  
		var endstr = document.cookie.indexOf (";", offset);  
		if (endstr == -1) { endstr = document.cookie.length; }
		return unescape(document.cookie.substring(offset, endstr));
	}
	
	function GetCookie (name) {  
		var arg = name + "=";  
		var alen = arg.length;  
		var clen = document.cookie.length;  
		var i = 0;  
		while (i < clen) {    
			var j = i + alen;    
			if (document.cookie.substring(i, j) == arg) return getCookieVal (j);    
			i = document.cookie.indexOf(" ", i) + 1;    
			if (i == 0) break;   
		}  
		return null;
	}
	
	function SetCookie (name, value) {  
		var argv = SetCookie.arguments;  
		var argc = SetCookie.arguments.length;  
		var expires = (argc > 2) ? argv[2] : null;  
		var path = (argc > 3) ? argv[3] : null;  
		var domain = (argc > 4) ? argv[4] : null;  
		var secure = (argc > 5) ? argv[5] : false;  
		//GM_log(document.cookie);
		document.cookie = name + "=" + escape (value) + 
		((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + 
		((path == null) ? "" : ("; path=" + path)) +  
		((domain == null) ? "" : ("; domain=" + domain)) +    
		((secure == true) ? "; secure" : "");
		//GM_log(document.cookie);
	}
	
	function DeleteCookie (name) {  
		var expires = new Date();  
		expires.setTime (expires.getTime() - 1);  
		var cval = GetCookie (name);  
		document.cookie = name + "=" + cval + "; expires=" + expires.toGMTString();
	}


	// Get the time now
	var now = new Date();

	// Figure out when we started procrastinating
	var start_time = GetCookie('p_start_time');
	if(start_time == null) {
		start_time = now.getTime().toString();
		//GM_log('setting cookie ' + start_time);
		SetCookie('p_start_time', start_time, expire);
	} else {
		//GM_log('from cookie ' + start_time);
	}
	
	// Figure out when we must get back to work
	var end_time = 1 * start_time + (time_in*60*1000);
	//GM_log("\nstart:" + start_time + "\n  end:" + end_time + "\n  now:" + now.getTime().toString());

	// If it's past our time to be procrastinating, back to work!
	// If we've overshot our limit by five minutes, give no quarter
	if(end_time + (5*60*1000) < now.getTime()) { 
		location.href = work_web; 
	} else if(end_time < now.getTime() && confirm('Back to work!')) {
		location.href = work_web;
	}

	//DeleteCookie('p_start_time');

})();
