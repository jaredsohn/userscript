// JIRA UE Enhancements
// Copyright (c) 2009, Chris Sharp
//
// ==UserScript==
// @name           JIRA UE Enhancements
// @namespace      http://cjsharp.com/
// @include        http://jira.*.com/jira/browse/*
// @include        https://jira.*.com/jira/browse/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
	
	// ======================================================= // Simple tweaks
	// Hide the annoying alert header
	$('.alertHeader').hide();
	// Hide the footer
	$('.footer').hide();
	// Make external links to go a new window
	$("a[href^='http:']:not([href*='" + window.location.host + "'][target='_blank'])").live('click', function(){
		$(this).attr('target','_blank');
	});

	
	
	// ======================================================= // Header and menu tweaks
	// Hide the top header
	$('#header-top').hide();
	// Copy the account options nav
	$('#menu').append($('#account-options'));
	var $menuBGColor = $('#menu').css('background-color');
	$('#menu').css('padding', '5px');
	// Update some CSS
	$('#account-options').css({
		backgroundColor:	$menuBGColor,
		padding:			'0px',
		marginRight:		'50px'
	});
	$('#account-options a').css({
		backgroundColor:	$menuBGColor
	});
	
	
	// ======================================================= // Left column slider
	$('body table:first td:first').remove().appendTo('body')
		.wrap("<div id='leftColumn'><table cellpadding='0' cellspacing='0' border='0'><tr></tr></table></div>");
	$('#leftColumn > table').css({
		borderRight: '1px solid #333333',
		borderBottom: '1px solid #333333',
	});
	$('#leftColumn').css({
		backgroundColor:	'#F0F0F0',
		left:				'-203px',
		position:			'absolute',
		top:				'30px',
		width:				'213px'
	}).hover(function(){
		$(this).animate({
			left: '0px',
			width: '200px'
		}, "fast");
	}, function(){
		$(this).animate({
			left: '-203px',
			width: '213px'
		}, "fast");
	});
	$('#leftColumn table table table#issuedetails').hide();
	$('#leftColumn table table table:first').css("cursor", "pointer").click(function(){
		$('#leftColumn table table table#issuedetails').toggle();
	});
	$('#leftColumn table table #workflowactions table#available_workflow_actions').hide();
	$('#leftColumn table table #workflowactions table:first').css("cursor", "pointer").click(function(){
		$('#leftColumn table table #workflowactions table#available_workflow_actions').toggle();
	});
	//$('#leftColumn table table .operations table#operationsSection').hide();
	$('#leftColumn table table .operations table:first').css("cursor", "pointer").click(function(){
		$('#leftColumn table table .operations table#operationsSection').toggle();
	});
	
	$(window).scroll(function(){
		var scrollTop = $(this).scrollTop();
		if (scrollTop > 30) {
			$('#leftColumn').css("top", scrollTop + "px");
		} else {
			$('#leftColumn').css("top", "30px");
		}
	});
	
	// ====================================================== // Image attachment lightbox
	var $curtain 	= $('<div id="curtain"></div>')
		.css({ 
			backgroundColor: '#000000', 
			opacity: '0.5', 
			width: $(document).width() + 'px', 
			height: $(document).height() + 'px', 
			position: 'absolute', 
			top: '0px',
			left: '0px', 
			zIndex: '8000' 
		});
	var $lightbox 	= $('<div id="lightbox"></div>')
		.css({ 
			display: 'none', 
			backgroundColor: '#FFFFFF', 
			zIndex: '8080', 
			padding: '5px' 
		});
	var $loading 	= $('<div id="loading">loading...</div>')
		.css({ 
			fontSize: '28px', 
			fontWeight: 'bold', 
			textAlign: 'center', 
			backgroundColor: '#FFFFFF', 
			zIndex: '8080', 
			padding: '10px', 
			width: '200px' 
		});
	
	// Make the image attachments popup in a lightbox
	// For each image thumbnail
	$('#issueDetailsTable img').each(function(e){
		// Traverse to the parent anchor tag
		$(this).parents('a').click(function(){
			// Store the HREF
			var $src = $(this).attr('href');
			// Append the curtain to the body
			$('body').append($curtain).append($lightbox).append($loading);
			// Center the loading text
			$loading.centerInWindow();
			// Add the image to the lightbox
			$('<img />').attr('src', $src).load(function(){
				$loading.remove();
    			$lightbox.append($(this).fitImageInWindow()).centerInWindow().show();
			});
			// Curtain click to remove the lightbox
			$curtain.click(function(){
				$lightbox.hide().children('img').remove();
				$lightbox.remove();
				$loading.remove();
				$curtain.remove();
			});
			// Prevent the click
			return false;
		});
	});
	
	$.fn.fitImageInWindow = function() {
		// Window dimensions, with padding
		var windowWidth 	= $(window).width() - 100;
		var windowHeight 	= $(window).height() - 100;
		// Check to see if the width of the resized image is wider than the window
		if (Math.round(this.attr("width") * (windowHeight / this.attr("height"))) > windowWidth) {
			// Since <img> only need one dimension attribute to size, just set the width
			this.attr("width", windowWidth);
		} else {
			// Otherwise, just set the height
			this.attr("height", windowHeight);
		}
		return this;
	};
	
	$.fn.centerInWindow = function(){
		this.css("position", "absolute");
		this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
		this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
		return this;
	};
}