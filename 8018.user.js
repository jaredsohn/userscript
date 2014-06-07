// ==UserScript==
// @name           YouTube Video Original Page
// @namespace      http://www.openjs.com/
// @description    Provides link to the original page of a YouTube video from a page which has an embedded YouTube Video.
// @include        *
// ==/UserScript==

(function() {
	//Get all the object tags
	//Use this page for testing...
	//http://www.joshuakucera.net/2007/03/cute_overload_t.html
	var all_objects = document.getElementsByTagName('object');
	
	for(var i=0; i<all_objects.length; i++) {
		var obj = all_objects[i];
		if(obj.getElementsByTagName("param")) {
			var all_params = obj.getElementsByTagName("param");
			for(var j=0; j<all_params.length; j++) { //Goes thru each 'param' tag to get the movie
				var param = all_params[j];
				if(param.getAttribute("name") == "movie") {
					var movie = param.getAttribute("value");

					if(movie.indexOf('youtube.com') == -1) continue;
					
					var br = document.createElement("br");
					obj.parentNode.insertBefore(br,obj.nextSibling);

					//http://www.youtube.com/v/UjA0mPTxjo0 -> http://www.youtube.com/watch?v=UjA0mPTxjo0
					var url = movie.replace(/\/v\/(.+)$/,"/watch?v=$1");
					var link = document.createElement("a");
					link.setAttribute("href",url);
					link.appendChild(document.createTextNode("YouTube Page"));
					obj.parentNode.insertBefore(link,obj.nextSibling);
				}
			}
		}
	}
})();