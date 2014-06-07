// ==UserScript==
// @name        anti_app
// @namespace   no_app
// @include     http://vk.com/*
// @version     1
// ==/UserScript==

setInterval(function(){
	var del_text = "http://vk.com/app"
	var wall_post_text_array = document.getElementsByClassName("wall_post_text")

	for (wall_post_text of wall_post_text_array){
		if (wall_post_text.textContent.indexOf(del_text) >=0){


			var post_parent = wall_post_text.parentNode.parentNode.parentNode.parentNode

			var del_button = post_parent.getElementsByClassName("post_delete_button")[0]
			
			del_button.onclick()
		}
	}
}, 1000)