// ==UserScript==
// @name           c! Redux - Sidebar Toggle and Toolbar Clean-up
// @namespace      #eh
// @description    Addon for c! Redux stylesheet (http://userstyles.org/styles/43181) 
// @description    Adds sidebar toggle, cleans toolbar links, adds link to pics.cheggit.nl
// @include        http://cheggit.net/*
// ==/UserScript==

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function
function letsJQuery() {

// Rename
  $("#navbar a[href*='cgi-bin/wiki?WikiHome']").text('wiki');
  $("#navbar a[href*='myprofile']").text('edit profile');
  $("#usercontrolbox a[href*='users.php?userid']").text('My profile');
  $("#recentSearchesBox .title").text('Recent Searches');

// Remove links
  $("#usercontrolbox a[href*='babble.cheggit.net']").parent().css("display", "none");
  $("#usercontrolbox a[href*='wiki?Donate']").parent().css("display", "none");

// Add pics.cheggit.nl link
  $("#usercontrolbox a[href*='upload']").after("<span id='chegg_pics'><a href='http://pics.cheggit.nl/' target='_blank' title='Opens in a new tab'>Upload pics</a></span>");
  $("#chegg_pics").css("padding-left", "12px");

// Sidebar toggle
  $("#navbar").after("<div><a id='sidebar_t' href='#'><span><</span></a></div>");
  $("#sidebar_t").toggle( function(event){
          $("#sidebar_t").css("left", "0");
          $("#sidebar_t span").html("");
          $("#cleft").css("display", "none");
          $("#ccenter").css({"left" : "0", "width" : "100%"});
          $("#cright").css("left", "0");
          $("#navbar").css("paddingLeft", "25px");
          $("#torrentcontrols input[type=checkbox]").css("left", "20px");
         	$('a[href*="index.php?action=logout"]').parent().addClass("logout_");
         	$('#torrentcontrols a[href*="index.php?action=logout"]').parent().addClass("logout_");
          $(".logout_").css("right", "0");
          event.preventDefault();
       }, 
       function (event){
          $("#sidebar_t").css("left", "148px");
          $("#sidebar_t span").html("<");
          $("#cleft").css("display", "block");
          $("#ccenter").css({"left" : "155px", "width" : "78%"});
          $("#cright").css("left", "155px");
          $("#navbar").css("paddingLeft", "160px");
          $("#torrentcontrols input[type=checkbox]").css("left", "175px");
         	$('#torrentcontrols a[href*="index.php?action=logout"]').parent().addClass("logout_");
          $(".logout_").css("right", "155px");
          event.preventDefault();
  });

}