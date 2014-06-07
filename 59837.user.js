// ==UserScript==
// @name           Facebook Annoyances
// @namespace      http://userscripts.org/users/104953
// @description    Removes Facebook Annoyances
// @include        http://www.facebook.com/*
// ==/UserScript==

//removes common annoyances
function remove_annoyances(){
	var stories = document.getElementsByClassName("UIIntentionalStory");
	var count = stories.length;
	
	//Loop through all stories in feed
	for (var i = count - 1; i >= 0; i--){
		//Extract story id
		var story_id = stories[i].id;
		var raw_data_format = stories[i].getAttribute("data-ft");
		
		//Extract format "sty" attribute i.e ("sty":"46")
		var beg_index = raw_data_format.indexOf('"sty":')+7;
		var end_index = raw_data_format.indexOf('"', beg_index);
		var sty_val = parseInt(raw_data_format.substring(beg_index, end_index));
		
		//Define selector for sty
		var acceptable_format = (sty_val == 80 || sty_val == 46 || sty_val == 56 || sty_val == 247);
		
		//Define selector for quizes
		var quiz_pos =  parseInt(stories[i].innerHTML.indexOf("quiz"));
		
		//External apps
		var app_pos = parseInt(stories[i].innerHTML.indexOf("app_id"));
		
		//Hide anything annoying
		if (quiz_pos >= 0 || !acceptable_format){
			//Select the associated story, hide it.
			var annoying_story = document.getElementById(story_id);
			annoying_story.style.display = "none";
		}
	}
}

//Hook into page load
window.addEventListener("load", remove_annoyances, false);
