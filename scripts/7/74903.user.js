// ==UserScript==
// @name           Twitter - Connard Certifié (Prototype)
// @namespace      Twitter
// @description    Change "Compte vérifié" en "Connard certifié"
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

var scripts = [];  
var idx = 0;

var addPrototype = true;  
var scriptTags = document.getElementsByTagName('script'); 

if(addPrototype) {  
    scripts[idx] = 'http://prototypejs.org/assets/2009/8/31/prototype.js';  
    idx++  
}

//Add any missing script tags to the page header  
for (i in scripts) {  
    var script = document.createElement('script');  
    script.src = scripts[i];  
    document.getElementsByTagName('head')[0].appendChild(script);  
}

//Handler for the window load event  
window.addEventListener('load', function(event)
{  	
	//Get handles to the Prototype and Scriptaculous functions we're going to use  
    $ = unsafeWindow['window'].$; 
    $$ = unsafeWindow['window'].$$; 
    
	$$('li.verified-profile').each( function(elem)
	{
		elem.innerHTML = '<a href="/help/verified"><em>Connard Certifié</em></a>';			
    });
	
}, 'false');
