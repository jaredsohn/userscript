// ==UserScript==
// @name          MY YouTube Player
// @description	  Allow watch YouTube videos inside Orkut.
// @namespace     http://orkuttricks.blogspot.com.
// @author	  Indian blogger
// @include       http://www.orkut.com/*


var page_links = document.links;
	for (var i=0; i<page_links.length; i++){ var option = '';
		if (page_links[i].href.match("video.google.com/googleplayer.swf")||page_links[i].href.match("video.google.com/videoplay")) 
		{
			 option = 'google';
			 var link = 'View in Google Videos'
			
			var url = "http://video.google.com/googleplayer.swf" + page_links[i].href.substring(page_links[i].href.toLowerCase().indexOf('?docid='),100)}
		if (page_links[i].href.match(/\.youtube.com\/watch\?v=/i)) 
		{ 
			   option = 'youtube';
			   var link = 'View in YouTube'
			
			var url = "http://www.youtube.com/v/" + page_links[i].href.substring(page_links[i].href.indexOf('?v=')+3,45)}
		if (option != '')
		{	
			var span = document.createElement("span");
			var width = 425
			var height = 350
			code_str = ""
			code_str += '<br><object type=\"application/x-shockwave-flash\"\n"'
			code_str += "data=\""+url+"\" \n"
			code_str += "width=\""+width+"\" height=\""+height+"\">\n"
			code_str += "<param name=\"movie\" \n"
			code_str += "value=\""+url+"\" />\n"
			code_str += "<param name=\"wmode\" \n"
			code_str +=	"value=\"transparent\" />\n"
			code_str += "</object><br>\n"
			span.innerHTML = code_str
			page_links[i].innerHTML = link
			page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling)
		}
		From www.orkuttricks.blogspot.com	
}

	

