// ==UserScript==
// @name         		The Old Reader RTL toggle button
// @description  		Allows changing a post direction to RTL and back.
// @include      		http://theoldreader.com/*
// @match      		http://theoldreader.com/*
// @grant        		none
// @version      		0.2
// ==/UserScript==

//This code was only tested on chrome.

function code_to_inject()
{
	function toggle_btn_clicked(event)
	{
		var post = $(this).parent();
		var title = post.children("h3").children("a");
		var content_body = post.children(".content").children(".content-body");
		
		var dir = content_body.css("direction");
		
		if (dir == "ltr")
		{
			content_body.css("direction", "rtl");
			title.attr("dir", "rtl");
		}
		else
		{
			content_body.css("direction", "ltr");
			title.attr("dir", "ltr");
		}
		
		event.stopPropagation();
		return false;
	}

	function add_toggle_buttons()
	{
		var new_posts = $(".post:not([containsRTLToggle=true])");
		
		if (new_posts.length > 0)
		{
			var a = $('<a class="toggle-rtl-btn label pull-right"><span>Toggle Direction</span></a>');
			var space = $('<span class="pull-right">&nbsp;&nbsp;&nbsp;</span>');
			
			var span = $('<span></span>');
			span.append("Toggle Direction");

			new_posts.prepend(space);
			new_posts.prepend(a);
			new_posts.children(".toggle-rtl-btn").click(toggle_btn_clicked);
			
			new_posts.attr("containsRTLToggle", "true");
		}
	}
	
	setInterval(add_toggle_buttons, 1000);
}

// inject JS so we can interact with page javascript on Chrome.
wrapped_code_to_inject = "(" + code_to_inject.toString() + ")();";

var script = document.createElement('script');
script.setAttribute("type", "application/javascript");
script.textContent = wrapped_code_to_inject;
document.body.appendChild(script);
document.body.removeChild(script);
