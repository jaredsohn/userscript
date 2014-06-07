// ==UserScript==
// @name          Technorati and Delicious Tags for Blogger 2 
// @description	  Changes the Edit Post Blogger form to include a tags field.
// @namespace     http://www.mamata.com.br/greasemonkey
// @include       http://blogger.com/*
// @include       http://www.blogger.com/*

// by Fabricio Zuardi (http://idomyownstunts.blogspot.com)
// Modified by Bryan Price (http://www.bytehead.org/) to make it conducive to being XHTML compliant
// Modified by John Jewitt (http://blogfresh.blogspot.com) to generate technorati and delicious tags at the same time. Please replace my username jrfj44 with your username in the delicious URL
// Modified by Kevin McMahon (u32dpgn02@sneakemail.com) to work with Greasemonkey 0.6.4 and Firefox 1.5 Replace [XXXX CHANGE ME XXXX] with your username in the delicious URL
// ==/UserScript==

(function() {
	appendTags = function(){
		var tags_str = document.forms.namedItem('tags_in').elements.namedItem('tags').value; 
		var tags_arr = tags_str.split(' ')
		var tags_html = '<div class="tag_list">Filed in: <span>'
		
		for(var i=0;i<tags_arr.length;i++){
			tags_html += '<a href="http://del.icio.us/[XXXX CHANGE ME XXXX]/'+tags_arr[i]+'" rel="tag">'+tags_arr[i]+'</a> '
		}
		
		tags_html += "</span></div>"
		
		var text_area = document.getElementById('textarea')
		var div_index = text_area.value.indexOf("<div class='tag_list'>");
		if(div_index > 0){
			text_area.value = text_area.value.substr(0,div_index)+tags_html;
		}
		else{
			text_area.value += tags_html;
		}
	}
	
	var post_options = document.getElementById("postoptions");
	var tags_field = document.createElement("div");
	var tags_field_html = "";
	
	tags_field_html += "<div style='background-color:rgb(245, 237, 227); width:710px; padding-top:5px; padding-bottom:5px'><form id='tags_in'>Filed in: <input type='text' name='tags' id='f-tags' class='text' size='48' /><input id='button' value='Append tags' name='button' type='button' accesskey='a' onclick='appendTags'></form></div>";
	tags_field.innerHTML = tags_field_html;

	post_options.parentNode.insertBefore(tags_field,post_options)
	document.getElementById('button').addEventListener("click", appendTags, true);
})()
