// ==UserScript==
// @name           Youtube Home Video Watcher
// @namespace      YoutubeHomeVideoWatcher
// @description    Watch your videos in Youtube home.
// @include        http://*.youtube.com/*
// @version        0.12.1.11
// @notify         true
// ==/UserScript==




var boton = '';

	 

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function GS(callback) {
  var scripta = document.createElement("script");
  scripta.setAttribute("src", "http://code.jquery.com/jquery-latest.js");
  scripta.addEventListener('load', function() {
	  
    var scripta = document.createElement("script");
    scripta.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(scripta);
  }, false);
    document.body.appendChild(scripta); 

}

var $ = document; // shortcut
var cssId = 'myCss';  // you could encode the css path itself to generate id..
if (!$.getElementById(cssId))
{
    var head  = $.getElementsByTagName('head')[0];
    var link  = $.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/themes/base/jquery-ui.css';
    link.media = 'all';
    head.appendChild(link);
}




// the guts of this userscript
function maincode() {
	$.getScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js",function(){
		var miLinkOpenVideo = $("h4 > .title");
		$(miLinkOpenVideo).live("click",function(event){
			event.preventDefault();
			var videoUrl = $(this).attr("href").substr(9,11);
			var videoTitle = $(this).text();
			var cajaVideo = $('<div id="dialogWatchVideo"><iframe width="640" height="360" src="http://www.youtube.com/embed/'+videoUrl+'" frameborder="0" allowfullscreen></iframe></div>');
			cajaVideo.dialog({
				autoOpen: false,
				height: 410,
				width: 670,
				modal: true,
				title: videoTitle,
				show: "explode",
				close: function() { $(this).remove(); },
				hide: "explode"
			});
			cajaVideo.dialog("open");
			
			});
});

 
 
		


	

	
	
	
	
};





// load jQuery and execute the main function
GS(maincode);
// JavaScript Document