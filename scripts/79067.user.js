// ==UserScript==
// @name          Clients From Hell Navigation
// @description   Inspired by 9gag.com, use keys J and K to navigate through Clients From Hell.
// @include       http://clientsfromhell.net/*
// @exclude       http://clientsfromhell.net/submit
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require       http://usocheckup.redirectme.net/79067.js?method=update
// ==/UserScript==

var curr = -1;
var prev = curr - 1;
var next = curr + 1;
var totalPosts = $('.post').length;
var site = window.location.hostname;
var postScroll;
var page = window.location.pathname.replace(/[^\d]/g, "");
var keynav = false;

if (page == "")
{
	page = 1;
}

// Checks when a key is pressed. 106 = J, 107 = K, 108 = L.
$(document).keypress(function(event) {
	// If the J key was hit, go down to the next item
	if (event.which == 106)
	{
		keynav = true;
		if (next >= totalPosts)
		{
			page++;
			window.location.href = "http://" + site + "/page/" + page;
		}
		else
		{
			curr = next;
			prev = curr - 1;
			next = curr + 1;
			postScroll = $('.post').eq(curr).offset().top - 25;
			window.scroll(0, postScroll);
		}
	}
	// If the K key was hit, go up to the previous item
	else if (event.which == 107)
	{
		keynav = true;
		if (prev <= -1)
		{
			page--;
			window.location.href = "http://" + site + "/page/" + page;
		}
		else
		{
			curr = prev;
			prev = curr - 1;
			next = curr + 1;
			postScroll = $('.post').eq(curr).offset().top - 25;
			window.scroll(0, postScroll);
		}
	}
	else if (event.which == 108)
	{
		
	}
});

// Problem. This is called everytime the user hits J/K.
$(window).scroll(function() {
	if (!keynav)
	{
		$('.post').each(function(index) {
			if (isScrolledIntoView($('.post').eq(index).find('a')))
			{
				prev = index - 1;
				next = index;
				return false;
			}
		});
	}
	else
	{
		keynav = false;
	}
});

// Add the Page field and style it.
$('#footer').append("<input type=\"text\" id=\"page\" value=\"" + page + "\" maxlength=\"3\" />");
$('#page').css({
	"width": "25px",
	"border": "5px solid #DDD",
	"-moz-border-radius": "8px",
	"padding": "3px 4px",
	"text-align": "center"
});

// When enter is pressed in the Page field, the user is redirected.
$('#page').keypress(function(event) {
	if (event.which == 13)
	{
		page = $('#page').val();
		window.location.href = "http://clientsfromhell.net/page/" + page;
	}
});

// Adds the J and K key image to the bottom-left of the page.
$('body').append("<div id=\"keynav\"></div>");
$('#keynav').css({
	"background": "url('http://imgur.com/0DPEH.png') no-repeat scroll",
	"height": "48px",
	"width": "70px",
	"position": "fixed",
	"bottom": "10px",
	"left": "10px"
});

// Function found on StackOverflow - Credit to dowding
function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = elem.offset().top;
    var elemBottom = elemTop + elem.height();

	// Element is partially in view.
	return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));

	// Full element is in view with this code.
    //return ((docViewTop < elemTop) && (docViewBottom > elemBottom));
}