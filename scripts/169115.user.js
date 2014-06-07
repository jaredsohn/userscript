// ==UserScript==
// @name PirateReverse ADF.LY Redirect
// @description Automatic redirect of adf.ly on the Piratereverse TPB proxy.	
// @include http://adf.ly/*
// @run-at document-start
// ==/UserScript== 

function check() {
	//Get Page URL
	var url = window.location.href;
	
	//Check if the adf.ly redirect is related to PirateReverse
	if(url.indexOf("http://piratereverse.info/s/") > -1) {
		//Remove the adf.ly part of the URL.
		//(The page that adf.ly redrects to is at the end of the adf.ly URL!)
		var redirect = url.replace("http://adf.ly/2471324/", "");
		
		//Beam me up, Scotty!
		window.location.replace(redirect);
	}
}

//Run the script!
check();