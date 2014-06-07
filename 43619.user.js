// ==UserScript==
// @name          Plenty of Bigger Fish
// @namespace     http://areyoufromtheinternet.wordpress.com/
// @copyright	None, go to town.
// @description   PlentyOfFish - Bigger thumbnails of users in the search results
// @include       http://www.plentyoffish.com/
// @include       http://www.plentyoffish.com/*.aspx*
// @exclude		http://www.plentyoffish.com/viewmessage.aspx*
// @require	    http://code.jquery.com/jquery-latest.js
// @version 0.0.6
// ==/UserScript==


/*
	====================================
	Enable or Disable Script Features
	- whichever feature you don't want, set the value to "false"
	====================================
*/

var features = {
	"resizeUPFields"	: true,
	"resizeThumbnails"	: true,
	"hideshowProfiles"	: true,
	"hideGifts" : false
};

/*
	====================================
	Don't modify anything below here ...
	====================================
*/

// adds the username to the list of usernames to ignore

if (features.hideshowProfiles)
{
	function hideUsername (username) {

		if (!isHidden(username))
		{
			var ignoreds;
			ignoreds = GM_getValue("usernamesIgnore");

			if (typeof ignoreds != 'undefined' && ignoreds.length > 1)
			{
				ignoreds = ignoreds + ";'" + username + "'";
			} else {
				ignoreds = "'" + username + "'";
			}
			GM_setValue("usernamesIgnore", ignoreds);
		}
	}

	// removes the username from the list of usernames to ignore
	// cleans up the spare semicolons, if any

	function showUsername (username) {

		var ignoreds;
		ignoreds = getHidden();

		if (typeof ignoreds != 'undefined')
		{
			var rx = new RegExp("'" + username + "'");
			while (rx.test(ignoreds)) // multiple replace hack .. couldn't get /g modifier to work
			{
				ignoreds = ignoreds.replace(rx, "");
				ignoreds = ignoreds.replace(";;", ";");
			}
		}

		GM_setValue("usernamesIgnore", ignoreds);
	}

	// returns the list of who is hidden

	function getHidden() {
		return GM_getValue("usernamesIgnore");
	}

	// reset the list of hidden usernames

	function resetHidden() {
		GM_setValue("usernamesIgnore", "");
	}

	// returns true if the username is hidden (present in the list of usernames to ignore)

	function isHidden(username) {
		var ignoreds;
		ignoreds = getHidden();
			
		if (typeof ignoreds != 'undefined' && username.length > 1)
		{
			if(ignoreds.indexOf("'" + username + "'") > -1) { 
				return true;
			}
		}

		return false;
	}
}
// alright, ready to rock

$(document).ready(function() {

	/*
		======================================
		functionality to resize the username and password fields
		======================================
	*/
	
	if(features.resizeUPFields) {

		if ($("div.tsbheader5b").length > 0) {
			$("div.tsbheader5a").width(700);
			$("div.tsbheader5b").width(240);	
		}
		$("input[name=username], input[name=password]").width(150);
	}

	/*
		======================================
		functionality to hide gifts on the send message page
		======================================		
	*/

	if (features.hideGifts || /sendmessage/.test(location.href))
	{
		$("table input[type=radio]").parent().hide();
	}

	/*
		======================================
		functionality to hide/show some profiles
		======================================
	*/

	if (features.hideshowProfiles)
	{

		var profiles = $(".lc");
		if (profiles.length > 0)
		{
			for (var i = 0; i < profiles.length; i++)
			{
				// a lot of this works because the "profile" is the .lc, not the containing div .. lame, but functional
				profile = profiles.slice(i,i+1);

				// add an id to the username link
				if (profile.children("a").length > 0)
					profile.children("a").attr("id", "username" + i);
				else
					profile.find("a").attr("id", "username" + i);
				
				// add an id to the profile div
				profile.parent().attr("id", "profile" + i);

				// get the username from the profile
				var username = $("#username" + i).text();

				// hide it if is should be hidden
				if (isHidden(username)) {
					$("#profile" + i + " .rc, #profile" + i + " .mc,  #profile" + i + " .lc p, #profile" + i + " .rcb").hide();
				}

				// add the hide/show links
				profile.append(" <a href='#' class='hideLink' id='hide" + i +"'>Hide</a> | <a class='showLink' id='show" + i +"' href='#'>Show</a>");
			}
		}

		// add the link to reset the hidden profiles

		$("td.topnav center").append("| <a href='' id='resetLink'>Show Hidden</a>");

		// hide link functionality

		$(".hideLink").click(function(event) {

			event.preventDefault();		
			var pageid = $(this).attr("id").substr(4);		
			if (pageid.length > 0)
			{
				$("#profile" + pageid + " .rc, #profile" + pageid + " .mc,  #profile" + pageid + " .lc p, #profile" + pageid + " .rcb").slideUp("slow");
				var username = $("#username" + pageid).attr("text");
				hideUsername(username);

			}
			return true;
		});

		// show link functionality

		$(".showLink").click(function(event) {

			event.preventDefault();		
			var pageid = $(this).attr("id").substr(4);	
			if (pageid.length > 0)
			{
				// ignoreUsername(username, false);
				$("#profile" + pageid + " .rc, #profile" + pageid + " .mc,  #profile" + pageid + " .lc p, #profile" + pageid + " .rcb").slideDown("slow");
				var username = $("#username" + pageid).attr("text");
				showUsername(username);
			}
			return false;
		});


		$("#resetLink").click(function(event) {
			var who = getHidden();
			who = who.replace(/;/g, ", ");
			who = who.replace(/\'/g, "");
			
			// if there's someone to reset ..
			if(who.length > 0) {
				if (confirm("So far you've hidden: " + who + "\n\nYou sure you want to show these profiles?"))
				{
					resetHidden();
				} else {
					event.preventDefault();
				}
			// otherwise, nothing
			} else {
				event.preventDefault();
				alert("You haven't hidden anyone yet.");
			}
		});
	}

	/*
		======================================
		functionality to resize the thumbnails
		======================================
	*/

	if (features.resizeThumbnails)
	{

		// if we have the detailed display ..

		if ($(".tsb, .tsbalt, .tsbaltgold").length > 0)
		{
			// remove the float:right from the images
			$(".tsb .mi, .tsbalt .mi, .tsbaltgold .mi").css("float", "left");

			// resize the clearing bar
			$("div.clear").text("");
			$("div.clear").height(0);

			// resize the padding, margin, and the widths
			$(".rc").css({width: "300", padding:"0", margin:"5"});
			$(".lc").width(190);
			$(".mc").width(400);

			// resize and recolor the bounding boxes
			$(".tsb").css({backgroundImage:"url()", backgroundColor:"#cde3ee"});
			$(".tsbalt").css({backgroundImage:"url()", backgroundColor:"#ffffff"});
			$(".tsbaltgold").css({backgroundImage:"url()", backgroundColor:"#FFFF99"});

			// find all of the images within the mi class
			var imgs = $("a.mi img");
			var len = imgs.length;
			var src, img;

			// replace the image with its bigger versions
			for (var i = 0; i < len; i++)
			{
				img = imgs.slice(i,i+1);
				if (/thumbnails/i.test(img.attr("src")))
				{
					src = img.attr("src").replace("thumbnails", "dating");
					img.attr("src", src);
					img.parent("a").removeClass("mi");
				}
			}

			// resize the bounding boxes
			$(".tsb, .tsbalt, .tsbaltgold").height("auto");	
		}

		// if we have a gallery display ..

		if ($(".tsbnew").length > 0) {

			var w = 170; // the new width of the image
			
			$(".tsbnew .tsbsub").css({backgroundImage:"url()"});
			$(".tsbnew .tsbsub").parent("td").css({backgroundColor:"#cde3ee", margin: "0"});
			$(".tsbnew .tsbsubb").css({backgroundImage:"url()", backgroundColor:"#ffffff"});
			$(".tsbnew .rcb").css({width: "auto", height: "auto", padding: "0"});		

			// find all of the images within the mi class
			var imgs = $(".tsbnew img");
			var len = imgs.length;
			var src, img;

			// replace the image with its bigger versions
			for (var i = 0; i < len; i++)
			{
				img = imgs.slice(i,i+1);
				if (/thumbnails/i.test(img.attr("src")))
				{
					src = img.attr("src").replace("thumbnails", "dating");
					img.attr("src", src);
					img.attr("width", w);
					img.parent("a").removeClass("mi");
				}
			}
		}
	} // if resize thumbnails
	
});