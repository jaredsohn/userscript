// ==UserScript==
// @name       golang pkg read
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://golang.org/pkg/*
// @source 	http://userscripts.org/scripts/show/174862
// @identifier 	http://userscripts.org/scripts/show/174862.user.js
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright  2012+, You
// ==/UserScript==


var script = document.createElement('script');
script.setAttribute("type","text/javascript");
script.src = "http://qtip2.com/v/nightly/jquery.qtip.min.js";
(document.body || document.head || document.documentElement).appendChild(script);

var style=document.createElement("link");
style.setAttribute("type","text/css");
style.setAttribute("rel","stylesheet");
style.setAttribute("src","http://qtip2.com/v/nightly/jquery.qtip.min.css");
(document.body || document.head || document.documentElement).appendChild(style);

$('#manual-nav a').each(function() {
	c = $(this).attr('href');
	$(this).qtip({
		content: {
			text: $(c+' + pre + p').html()
		}
	});
});

function loadjscssfile(filename, filetype){
	if (filetype=="js"){ //if filename is a external JavaScript file
		var fileref=document.createElement('script')
			fileref.setAttribute("type","text/javascript")
			fileref.setAttribute("src", filename)
	}
	else if (filetype=="css"){ //if filename is an external CSS file
		var fileref=document.createElement("link")
			fileref.setAttribute("rel", "stylesheet")
			fileref.setAttribute("type", "text/css")
			fileref.setAttribute("href", filename)
	}
	if (typeof fileref!="undefined")
		(document.body || document.head || document.documentElement).appendChild(fileref)
		// document.getElementsByTagName("head")[0].appendChild(fileref)
}

// loadjscssfile("http://qtip2.com/v/nightly/jquery.qtip.min.js",'js')
// loadjscssfile("http://qtip2.com/v/nightly/jquery.qtip.min.css",'css')