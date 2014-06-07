// ==UserScript==
// @name           Dribbble Infinite Scroller
// @description    Automatic loading of shots and comments, eliminating paging. Modified version of "Dribbble Lazy Loader"
// @include        http://www.dribbble.com/*
// @include        http://dribbble.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

var pageNumber;
var upButtonSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAz1JREFUeNrsmc9PE0EUgDvTpTZEEGns2kgFCcoBjAQTSY+GhMDBmyH8SppgPBrwwoVTvTca4kWtCScSTf0LGnvz1INGSYRiIIgcaEXR1ANl2/W9slOHtTSR7mzHZF/y0t3Zzfb7dt5MdzvE9ScI5DnIFsjTxr5MoUPmIPcgs8Z+GbLB4/FczufzZ2Bb4dp1SeB5Hg1YfwDrGmwf4AHi9/uvZjIZdteLxom6ZAIsKXIBcw6YP5D29vbA5ubmRePAAWTBJFHPniAmAWR0Y8UgI7B/VgYGBjpBQIOGfUNA4wRkKCNegholjnwNyE58Pt+N3d1dhM5XEJCthJgA9oAH2BVsvG7A8wK6pIOY8AKYinFA41K2u2/uBY3rjbJAUdLZx/w7wD4Zb8nCJWrGWVxc7NzY2JgWJFHaVkwHLYUfGxt7rihKy9bWVmMwGHxsoUSZk4oYrDw87gcCgTvb29v3RJQUtbpQzfAsVFWdFiBhrYAB/9QML1KCCoD3VTvPaglqJ7wICWo3vNUSNQnEYrGOSvDwmJvO5XI7fFs6nX6j63rRaglaC/zU1FSsEvzg4OCDQqGQ59tTqVRyaWnpidUSJxKYnZ09Ww3+IwQh5MhvS2tr669wOPzyOIn19fWwbQK9vb1qNXj2nFIh9o6TgOtds00A3kfdJ4A/IgHxjJfQNM1dl1noH+HLEpOTky/MEicJpQ7wLL6jBG6Mjo7etV0gm81+qgH+L4lQKHTFNoFkMpldWFiIrKys1AJ/RGJiYuKSbQLxePwbfHy1AL4sATNTzs4S0gS8Mh7U/XG6HuEIOAKOgCPgCDgCjkA9QxF14fn5+Uder7eZ7S8vL78X8T1shean63CFpmDhE+YpUw+z61tRNfj6iSs0zYrA3t23ZQyoqqr8r/Xf09PjpTMzM0GRY0Hk+B0fHz9Ph4aGLrgOV/3YIprswTgbhoeH22hfX9/O3NxcBzQ0cifIDI/RiMzITt1u96tIJHILGrrgQJMxexBJ4XHmaUJWZEb2Eqiu6/5isfhwdXX1SyKReAvjYk3G2x+NRrtGRkb6u7u72yil9wkhmfKdBgkcB7chb0L2S1pC7yBf4x8jAF/6E+C3AAMAeCCRr8LE6MIAAAAASUVORK5CYII="
var spinnerSrc = "data:image/png;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="

function getParameterByName(name) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null ) {
        return "";
    } else{
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}

if(getParameterByName("page") == "") {
    pageNumber = 1;
} else {
    pageNumber = getParameterByName("page");
}

// Holder for shots to be dumped into
$("<div id='ajaxHolder' />").css("display","none").appendTo(document.body);

// Spinner/loading message
$(".next_page").parent().append("<div id='ajaxLoader' />");
$("#ajaxLoader").append("<img src='" + spinnerSrc + "' />").append(" Loading").hide();

// "Back to top" button
$("<div />").attr("id","topLink").append("<img src='" + upButtonSrc + "' />").appendTo(document.body);
$("#topLink").css({
	"position": "fixed",
	"right": "10px",
	"top": "10px",
	"cursor": "pointer"
}).hide().click(function() {
	window.scrollTo(0,0);
});

// Hide pagination
$(".prev_page, .next_page").hide();

var loadShots = function() {

	var holder = $("#ajaxHolder").load("?page=" + pageNumber + " ol.dribbbles", function(responseText) {
		$("#ajaxLoader").fadeOut();
		if ( $("#ajaxHolder ol").children().length > 0 ) {
			$("#ajaxHolder ol").appendTo("#main");
			$("#main > .page, #main .rss").appendTo("#main");
			$(window).bind('scroll', function(){
				scrollFunc();
			}); 
		}
	});
};

var loadComments = function() {

	var holder = $("#ajaxHolder").load("?page=" + pageNumber + " ol#comments", function(responseText) {
		$("#ajaxLoader").fadeOut();
		if ( $("#ajaxHolder ol").children().length > 0 ) {
			$("#ajaxHolder ol").children().appendTo("ol#comments");
			$("#main > .page, #main .rss").appendTo("#main");
			$(window).bind('scroll', function(){
				scrollFunc();
			});
		}
	});
};

var loadFunc = function() {
	if ( $('ol.dribbbles').length > 0 ) {
		return loadShots;
	} else if ( $('ol#comments').length > 0 ) {
		return loadComments;
	} else {
		return undefined;
	}
}();

var scrollFunc = function() {
	if  ( ($(document).height() - $(window).height()) - $(window).scrollTop() < 1000 ){
		$(window).unbind('scroll');
		$("#ajaxLoader, #topLink").fadeIn();
		pageNumber++;
		loadFunc();
	}
};

// Lazy load/infinity scrolling
$(window).bind('scroll', function(){
	scrollFunc();
}); 