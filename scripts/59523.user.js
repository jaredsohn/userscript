// ==UserScript==
// @name           PHP Comment Collapse
// @namespace      www.example.com
// @description    Turns the (sometimes ridiculously long yet useful) comments on php.net and it's mirror sites into an outline. You can then collapse and expand the comments one by one.
// @include        http://*php.net/*
// ==/UserScript==

// jQuery injection from: http://joanpiedra.com/jquery/greasemonkey/

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait()
{
	if(typeof unsafeWindow.jQuery == 'undefined')
	{
		window.setTimeout(GM_wait,100); 
	}
	else 
	{
		$ = unsafeWindow.jQuery; 
		letsJQuery(); 
	}
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	// Add the navigation bar
	$("#allnotes").prepend("<br/>Controls:&nbsp;<strong><a id='gmexpandall' href='javascript: void 0;'>Expand</a>|<a id='gmcollapseall' href='javascript: void 0;'>Collapse</a>|<a id='gmtoggleall' href='javascript: void 0;'>Toggle</a></strong>").after("<br />");
	// Holds the note index
	var i = 1;
	// Iterate through each note
	$("div.note").each(function(){
		// Get the note
		var note = $(this);
		// Get the name of the person
		var name = note.find("strong").text();
		if ($.trim(name)=="")
		{
			// Get the previous note
			var prediv = $("div.note:eq("+(i-2)+")");
			// Get the name of the last note
			name = prediv.prev().text();
			// Add the last note to the current one
			note.prepend(prediv.html());
			// Remove the last note
			prediv.prev().add(prediv.prev().prev()).add(prediv.prev().prev().prev()).remove();
			
		}
		// Add the position attribute
		note.attr("pos",i);
		// Remove the plaintext name and line break that follows
		note.find("strong").add(note.find("strong+br")).remove();
		// Append a link version of the name
		note.before("<br/><br/><a style='padding: 4px; text-decoration: none; color: #000000; font-weight: bold;' class='gmtoggle' href='javascript: void 0;'>"+name);
		// Collapse the note
		note.slideToggle();
		i++;
	});
	$("#gmexpandall").click(function(){
		$("div.note").slideDown('fast');							 
	});
	$("#gmcollapseall").click(function(){
		$("div.note").slideUp('fast');						 
	});
	$("#gmtoggleall").click(function(){
		$("div.note").slideToggle('fast');							 
	});
	$("a.gmtoggle").each(function(){
		$(this).show();
		$(this).click(function(){
			$(this).next().slideToggle('fast');
		});
	});
}