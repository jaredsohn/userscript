// ==UserScript==

// @name           Website randomizer

// @namespace      jarblewiki.tiddlyspot.com/



// @description    Redirects any site on a list to another random site on the same list.

// ==/UserScript==





//redirect to a random site from a list

sites = new Array();


//Edit this list.

sites[0] = "http://www.facebook.com/";

sites[1] = "http://www.gmail.com/";

sites[2] = "http://tutorial.math.lamar.edu/";

sites[3] = "http://www.google.com;

sites[3] = "http://socrates.berkeley.edu/~ancgreek/verbdrillU/vdrill_mainU.html";

sites[4] = "http://www.analyzemath.com/calculus/Differential_Equations/separable.html";

sites[5] = "http://download.oracle.com/javase/tutorial/index.html";



for(i = 0; i < sites.length; i++){

	if(sites[i] == window.location.href){

		//alert(sites.length);

		//return a random integer between 0 and 10

		num1 = Math.floor(Math.random()*(sites.length));

		determine = Math.random();

		if(determine > 0.5){

			location.replace(sites[num1]);

		}

	//location.replace

	}

}