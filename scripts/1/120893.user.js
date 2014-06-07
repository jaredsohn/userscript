// ==UserScript==
// @name           Get top comment(s) in Reddit thread
// @namespace      thealchemist
// @description    Gets top comment(s) in Reddit thread, based on your comment sort settings
// @include		   http://*.reddit.com/*
// @include		   http://*.reddit.com/r/*
// @exclude 	   http://*.reddit.com/r/*/comments/*
// @exclude       http://*.reddit.com/user/*
// @require  	  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var nr_of_comments = 3; // set the number of top comments here

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
	var script = document.createElement("script");	
	script.textContent = "(" + callback.toString() + ")(" + nr_of_comments + ");";		
	document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function mainTopComment(nr_of_comments) {	
	jQuery.noConflict();
	$('ul.flat-list.buttons').each(function() {		
		var threadurl = $(this).find('a.comments').attr('href');
		$(this).append('<li><a class="topcomment" href="javascript:void(0);" title="' + threadurl + '">top comment(s)</a></li>');
	});
	
	$('a.topcomment').click(function() {	
		var curr_el = $(this);
		var curr_el_parent = curr_el.parent();
		var hidebtn = curr_el.text().indexOf('hide');
		curr_el.text('Loading...'); // loading notice	
		var prev_color = curr_el.css("color"); // save text color		
		if (hidebtn == -1) {		
			curr_el.css("color", "#ff0000"); // change text color to red
			var geturl = $(this).attr('title');
			$.get(geturl, function(data){
				curr_el.parent().append('<div class="rdt_topcomment"></div>');
				var parents = $(data).find('div.sitetable.nestedlisting > div.thing.comment').each(function(index, element) {					
					var comment = $(element).find('.entry .noncollapsed:first').html();		
					var curr_children = curr_el_parent.children('.rdt_topcomment');
					curr_children.append("<br/>" + comment);				
					curr_children.find('a.expand').remove();
					curr_children.find("a:contains('reply')").remove();	
					curr_children.find("p").css("white-space", "normal");	
					if (index == nr_of_comments - 1) {						
						return false;
					}
				});
							
				curr_el.text("hide top comment(s)");
				curr_el.css("color", prev_color);
			});
		} else {
			curr_el_parent.children('.rdt_topcomment').hide();
			curr_el.text("top comment(s)");
		}
	});
}

if (document.URL.indexOf('reddit.com') != -1) {
	// load jQuery and execute the main function
	addJQuery(mainTopComment);
}