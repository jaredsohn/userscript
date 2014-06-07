// ==UserScript==
// @name           Shacknews Comment Search Condenser
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @namespace      http://www.indosauros.com
// @description    Condenses the extra linebreaks in the Newshack comment search screen
// @version	0.1
// @include		   http://*.shacknews.com/search?*&type=4*
// @include		   http://*.shacknews.com/user/*/posts

// ==/UserScript==
/*

Version history:
0.1 2011-2-26:
Condensed search output to look like Chatty threads
Added invisible "submit" button to search form so Enter key works

*/

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
	$('<link>').attr({ 'rel': 'stylesheet', 'href': '/css/chatview.css' }).appendTo('head');
	
	//Main content box
	content = $("#content");
	content.css("padding", "0 20px");
	content.css("background-color", "#000");
	content.find(".search-nav").css("background-color", "#000");
	content.find(".search-nav").css("display", "inline");
	content.find(".search-nav").css("float", "left");
	content.find(".search-nav").css("margin-bottom", "30px");
	content.find("#leaderboards").remove();
	content.find(".border-grd.hotspt").css("display", "none");
	content.find("#side").detach().insertBefore("#chatty_search_wrap");
	
	
	//Resize search box
	searchBox = $("#chatty_search_wrap");
	searchBox.css("margin-bottom", "0");
	searchBox.width(600);
	searchBox.find("#chatty_term").width(223);
	searchBox.find("#chatty_user").width(138);
	searchBox.find("#chatty_author").width(138);
	searchBox.find(".input-wrap").css("margin-right", "15px");
	searchBox.find("#chatty_search_submit").css("margin-bottom", "10px");
	searchBox.find("#chatty_search").append("<input type='submit' style='width: 0px;height: 0px;border: none'>");
	$("#chatty_search").append(content.find("#chatty_sort").detach());
	$("#chatty_search").css("margin-bottom", "0");
	
	
	//Format results table
	//newtable = $("<table></table>");
	//newtable.width("100%");
	mainelem = $("#main");

	/*
	author = $("<ul class='results'><li class='results chatty'></li></ul>")
	author.find("li").css("padding-bottom", "0");
	author.find("li").append(mainelem.find(".chatty-author:first"));
	mainelem.before(author);
	*/
	
	mainelem.width("100%")
	mainelem.find(".results").css("font-size", "12px");
	
	posts = $("<ul></ul>");

	mainelem.find(".result.chatty").each(
	function() 
	{
		newpost = $("<div class='oneline oneline9 olmod_ontopic'></div>");
		
		postlink = $(this).find("a");
		posttext = postlink.html();
		if (posttext.length > 103) {
			posttext = posttext.substring(0,100) + "...";
		}
		postlink.html(posttext);
		postlink.addClass("shackmsg");
		postlink.wrapInner("<span class='oneline_body' />");
		postlink.append(" : ");
		
		newpost.append(postlink);
		
		author = $(this).find(".chatty-author").html();
		author = author.substring(0, author.length - 1);
		authorspan = $("<span class='oneline_user'></span>");
		authorspan.append(author);

		newpost.append(authorspan);
		
		date = $("<div class='postdate'></div>");
		date.css("position", "relative");
		date.css("display", "inline");
		date.css("float", "right");
		date.css("height", "0");
		date.css("width", "auto");
		date.append($(this).find(".chatty-posted").html().substring(7));
		newpost.append(date);
		
		newpost = newpost.wrap("<li></li>").parent();
		
		posts.append(newpost);
		
	});
	
	posts.find("li:last").addClass("last");
	
	posts = posts.wrap("<div class='capcontainer' />").parent();
	posts = posts.wrap("<li class='sel last' />").parent();
	posts = posts.wrap("<ul />").parent();
	posts = posts.wrap("<div class='root' />").parent();
	posts = posts.wrap("<div class='threads' />").parent();
	posts = posts.wrap("<div class='commentsblock' />").parent();
	posts.css("padding", "0px");
	
	$("#main").find(".results").replaceWith(posts);
	
	//Move hot files div
	hotfiles = $("#side").find(".module.hotfiles").detach();
	hotfiles.after(mainelem);
	

}

// load jQuery and execute the main function
addJQuery(main);