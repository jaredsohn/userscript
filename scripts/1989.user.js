// ==UserScript==
// @name          Categories and Technorati Tags for Blogger 1.0
// @description	  Changes the Edit Post Blogger form to include a tags field.  Also uses Blogger Search to form a make-shift category system for Blogger.
// @include       http://blogger.com/*
// @include       http://www.blogger.com/*
//REMEMBER TO ADD URL DOWN WHERE IT SAYS "*AddBlogURLHere!!!!!*"
//by Tyrantmizar (http://tyrantmizar.blogspot.com/)
//based off of the script by Fabricio Zuardi (http://idomyownstunts.blogspot.com)
// ==/UserScript==

(function() {
	
	var post_options = document.getElementById("postoptions");
	var tags_field = document.createElement("div");
	var tags_field_html = "";
	tags_field_html += "<div style='background-color:rgb(245, 237, 227); width:710px; padding-top:5px; padding-bottom:5px'>Tags: <input type='text' name='tags' id='f-tags' class='text' size='48' /> <input value='Append tags' type='button' onclick='appendTags()'></div>";
	tags_field.innerHTML = tags_field_html;
	post_options.parentNode.insertBefore(tags_field,post_options)
	appendTags = function(){
		var tags_str = document.getElementById('f-tags').value;
		var tags_arr = tags_str.split(' ')
		var tags_html = '<span style=font-size:70%;>Categories: '
		for(var i=0;i<tags_arr.length;i++){
			tags_html += '<a href="http://search.blogger.com/?q=blogurl:*AddBlogURLHere!!!!!*+/'+tags_arr[i]+'" rel="tag">'+tags_arr[i]+'</a> '
		}
		tags_html += '</span>'
		var text_area = document.getElementById('textarea')
		var div_index = text_area.value.indexOf("<div class='tag_list'>");
		if(div_index > 0){
			text_area.value = text_area.value.substr(0,div_index)+tags_html;
		}else{
			text_area.value += tags_html;
		}
	}
	
})();
