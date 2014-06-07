// ==UserScript==
// @name           GeenStijl cleanup
// @namespace      geenstijl
// @description    Clean up new geenstijl layout
// @include        http://www.geenstijl.nl/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {
    // Remove ugly parts.
    $('#vaandel').remove();
    $('#topbar').remove();
    $('#topbg').remove();
    $('#pagefooter').remove();
    // Add some extra articles.
    $('.meer').load('/index2.html #content > article');
    // This leaves some strange line.
    $('.geldbakje').remove();
    // No heavy jpegs please.
    $('body').css('background', 'black');
    // And rearrange.
    $('#sidebar-internal').css('top','0px');
    $('#sidebar-extras').css('top','0px');
    $('#sidebar-internal > :first-child').css('padding-top','0px');
    $('.sidebar > section').css('margin',0);
    // Clean up gigabar once it gets inserted. This is needed because the gigabar is inserted manually by geenstijl.js
    $(document).bind('DOMNodeInserted', function(event){
	if (event.target.id == 'gigabar') {
	    // remove annoying gigabar once it gets inserted.
	    $('#gigabar').remove();
	}
	else if (event.target.id == 'gigabarspacer') {
	    $('#gigabarspacer').remove()
	}
    });

})();