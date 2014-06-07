// ==UserScript==
// @name           Persistenz
// @namespace      http://userscripts.org/users/87140
// @description    Keeps Yahoo! Stores from kicking you out of what you're doing by removing a certain URL variable.
// ==/UserScript==

// Persistenz v1.0
// Gabriel Nahmias © May 19th, 2011

// NOTES: For some reason, I can't get the @include metatag to function properly.  Although, I doubt anyone but
// Yahoo! uses a variable as esoteric as ".ynsctx".

// Mimics PHP's str_replace function

function str_replace(search, replace, subject, count) {
	
    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
    
	s = [].concat(s);
    
	if (count)
        this.window[count] = 0;

    for (i = 0, sl = s.length; i < sl; i++) {
		
        if (s[i] === '')
            continue;
		
        for (j = 0, fl = f.length; j < fl; j++) {

            temp = s[i] + '';

            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];

            s[i] = (temp).split(f[j]).join(repl);

            if (count && s[i] !== temp)
                this.window[count] += (temp.length - s[i].length) / f[j].length;
			
	    }
    	
	}
    
	return sa ? s : s[0];
	
}

// Puts URL variables into an associative array

function get_url_vars(){
	
	var data = [];
	var nvp = [];
	
	var urlSplit = window.location.href.split('?')[1].split('&');
	
	for(i = 0; i < urlSplit.length; i++) {
	
		nvp = urlSplit[i].split('='); // split into key value pair
	
		data.push(nvp[0]); // push key onto base of array
	
		data[nvp[0]] = nvp[1]; // add value to key
	}
	
	return data;
}

function in_array(needle, haystack, argStrict) {

    var key = '',
        strict = !! argStrict;

    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    }

    return false;

}

arrVars = get_url_vars();

strVar = ".ynsctx";

if ( arrVars == strVar || in_array(strVar, arrVars) ) {										// if the only URL variable is ".ynsctx" or that is an index in the array...
	
	strToFind = strVar + ( ( arrVars[strVar] != null ) ? "=" + arrVars[strVar] : "");		// this takes into account that ".ynsctx" might have no value, but if it does, account for that as well
	
	strNewURL = str_replace(strToFind, "", window.location);								// comprise the new URL
	
	location.replace(strNewURL);															// set it and forget it
		
}