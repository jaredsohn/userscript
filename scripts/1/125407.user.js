// NHLTORRENTS
// version 1
// 22.9.2011
// Copyright (c) 2011, borec
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Hodnotenie YOUTUBE
// @description   hodnotenie youtube
// @include		  http://youtube.com/*
// @include		  http://www.youtube.com/*
// @include       http://www.nhltorrents.co.uk/*
// @include		  http://nhltorrents.co.uk/*
// ==/UserScript==


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://code.jquery.com/jquery-1.6.2.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript

function main() {

$('li[class*="video-list-item"]').mouseover(function () { 

var f= $(this).find('a').attr('href');
var a=0;
if ($('span[id*="'+f+'"]').length == 0) {
var lol=$(this);
var jqxhr = $.get("http://www.youtube.com"+ f, function(data) {
		
				var z= $(data).find('span.watch-likes-dislikes');
				var y =$(data).find('div.watch-sparkbars');
				$(y).attr('id',f);
				
				
		$(lol).find('span[class="stat"]').html(y.html()+z.html());
	




  });



}
});
}

					


// load jQuery and execute the main function
addJQuery(main);