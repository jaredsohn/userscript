// ==UserScript==
// @name        Popout from Directory Page
// @namespace   PylonPants
// @include     http://www.twitch.tv/directory/*
// @version     1
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;

if (is_chrome) {

	// Chrome Require fix, as explained here http://stackoverflow.com/questions/2588513/why-doesnt-jquery-work-in-chrome-user-scripts-greasemonkey
	var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
	
	loadAndExecute("http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js",go);
	
} else {
	$(go);
}


function go() {

	// Get each channel
	$(".channelname").each(function() {
	
		// Make the popout link (by simply replacing 'video' with 'popout')
		var popout_link = $(this).find("a").attr("href");
		popout_link = popout_link.replace("videos", "popout");
		
		// Add the new A to the page
		$(this).append(
			// Add regular href for middle-click
			$("<a>").text("Popout").attr("href", popout_link).click(function() {
				// Add chromeless for right-click
				window.open("http://twitch.tv/"+popout_link,"_blank","right=50,top=50,width=630,height=381,resizable=yes,scrollbars=no,toolbar=no,location=no,directories=no,status=no,menubar=no,copyhistory=no");
				// This makes sure that middle click doesn't also redirect
				return false;
			})
		);
		
	});
}