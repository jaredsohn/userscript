/*
 *	Name:		Hacker News OnePage
 *	Version:	0.8.2 Beta
 *  Author:		Tim Dupree
 *				http://www.tdupree.com
 *				email: tim AT tdupree DOT com
 * 
 *	License:	Hacker News OnePage is released under the Open Source MIT License
 *				(c) 2008 Tim Dupree
 *
 *	Original Creation Date:		July 24, 2008
 *
 *	Summary:	Provides users with the ability to browse Hacker News articles and comments without leaving the page.
 *
 */

// ==UserScript==
// @name          Hacker News OnePage
// @namespace     http://www.tdupree.com/
// @description   Provides users with the ability to browse Hacker News articles and comments without leaving the page.
// @include       http://news.ycombinator.com/
// @include       http://news.ycombinator.com/x?*
// @include       http://news.ycombinator.com/news
// @include       http://news.ycombinator.com/newest
// @include       http://news.ycombinator.org/
// @include       http://news.ycombinator.org/x?*
// @include       http://news.ycombinator.org/news
// @include       http://news.ycombinator.org/newest
// ==/UserScript==
 
(function() {
	// Change these iFrame defaults if you wish to tweak the height 
	// and width of the article and comments viewports
	var iFrameHeight = "93%";
	var iFrameWidth = "100%";  
	
	// default bg Highlight Color displayed for any visisted articles/comments
	var highlight = "#FFE4CF";
		 
	
	/* remove the co2stats js and html
	 * for some reason, the co2stats js completely breaks HN OnePage
	 * this is a rather crummy fix as we must rely on dom indexes that 
	 * could easily change since we are working with a lack of element ID's
	
	// first we bank on the footer being in the last 'center' tag
	var centers = document.getElementsByTagName('center');
	var children = centers[centers.length - 1].childNodes;
	var cleaned = 0;
	var childrenLength = children.length - 1;
	
	// now we bet that the co2stats will be at the end of the footer
	// thus we itereate from the last element to the first to hit the 
	// co2stat elements and remove them without accidentally removing other elements
	for(var i = childrenLength; i > 0; i--){
		if(children[i].nodeName == "SCRIPT" || children[i].nodeName == "A"){
			centers[centers.length - 1].removeChild(children[i]);
			cleaned++;
			if(cleaned >= childrenLength){
				i = 0; //break from search after removing the co2stats script and anchor elements
			}
		}
	}
	*/

	// Add jQuery
	var GM_JQ = document.createElement('script');
	GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
	GM_JQ.type = 'text/javascript';
	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
	
	// Check if jQuery's loaded
	function GM_wait() {
		if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
	}
	GM_wait();
	
	// Let the Fun Begin
	function letsJQuery() {
		// The following html is left uncondensed so that others may better follow/modify it
		var accordian = '<div id="accordian">' +
					'<h3 id="commentsToggle" class="toggler">Comments</h3><div class="element" id="commentsWrapper"><iframe id="iComments" src="" /></div>' +
					'<h3 id="articleToggle" class="toggler">Article</h3><div class="element" id="articleWrapper"><iframe id="iArticle" src="" /></div>' +
    			'</div>';
		var loginURL = $("a:eq(7)").attr("href");
		var header = '<div id="header">' +
			'<div id="logo">' +
				'<a href="http://ycombinator.com">' +
					'<img src="http://ycombinator.com/images/y18.gif" width=18 height=18 style="border:1px white solid;">' +
				'</a>' +
			'</div>' +
			'<div id="menu_wrapper">' +
				'<div id="menu_head">' +
					'<b><a href="news">Hacker News</a></b>' +
				'</div>' +
				'<div id="menu_links">' +
					'<a href="newest">new</a> | ' +
					'<a href="newcomments">comments</a> | ' +
					'<a href="leaders">leaders</a> | ' +
					'<a href="jobs">jobs</a> | ' +
					'<a href="submit">submit</a>' +
				'</div>' +
			'</div>' +
			'<div id="login">' + $("tr:eq(1) td:eq(2)").html() + '</div>' +
		'</div>';
		
		// avoid modifying the comments and login pages when adding 
		// the new UI by not modifying pages with forms
		var hasForm = $("body").find("form");
		if(hasForm.length <= 1){
			$("center:eq(0)").wrap("<div id='wrapper'><div id='news_column'></div></div>");
			$("center:eq(0)").replaceWith($("center:eq(0)").html());
			//$("tr:eq(1)").replaceWith("<tr>" + header + "</tr>");
			$("table:eq(0)").attr("width", "100%");
			$("#news_column").after(accordian);
			
			// add the co2stats image and link back to the page footer,
			// basically everything is the same as before except that 
			// it opens in new page rather than a popup
			$("center:last").append("<div id='co2statsWrapper'><a href='http://www.co2stats.com/certpro.php?s=1138&ref=http://news.ycombinator.com/' target='_new'><img src='http://www.co2stats.com/prowidget.php?s=1138&ref=http://news.ycombinator.com/' /></a></div>");
		}

		// build object arrays containing the article title links and comments links
		var articleComments = $(".subtext a:last-child");
		var articleURL = $("a:first", ".title");
		
		// add click function to title links to open them in the article pane
		$("a:first", ".title").each(function(i){
			if($(this).text() != "More"){
				$(this).click(function(event){
					event.preventDefault();
					$(this).css("background", highlight);
					$("#iArticle").attr("src", articleURL[i]);
					$("#iComments").attr("src", articleComments[i]);
					$("#commentsToggle.toggler").next().hide(180);
					$("#articleToggle.toggler").next().show(180);
					window.scrollTo(0,0);

				});
			}
		});
		
		// add click function to comments links to open them in the comments pane
		$(".subtext a:last-child").each(function(i){
			$(this).click(function(event){
				event.preventDefault();
				$(this).css("background", highlight);
				$("#iArticle").attr("src", articleURL[i]);
				$("#iComments").attr("src", articleComments[i]);
				$("#articleToggle.toggler").next().hide(180);
				$("#commentsToggle.toggler").next().show(180);
				window.scrollTo(0,0);

			}); 
		});
		
		// enable the toggle properties of the comments and article panes
		$(".toggler").click(function() {
			$(this).next().toggle(180);
		}).next().hide();
		
		// add height and width properties to iFrames
		$("iFrame").css("width", iFrameWidth);
		$("iFrame").css("height", iFrameHeight);	
		

		//add the css
		var css = '<style type="text/css">html, body{height: 99.5%; padding: 2px; margin: 0px;} #header{font-size: 12px;} #logo{float: left;} #menu_wrapper{float: left;	padding-left: 5px;} #menu_head{clear: both; font-size: 14px;} #login{float: right; text-align: right; padding-right: 5px;} #news_column{float: left; width: 35%; padding-bottom: 5px; height: 98%; overflow-x: hidden; overflow-y: scroll;} #accordian{float: left; width: 64%; padding-left: 5px;} h3.toggler{cursor: pointer; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #FF6600; color: #000000; margin-bottom: 1px; margin-top: 0px; margin-right: 0px; margin-left: 0px; padding-top: 1px; padding-right: 0px; padding-bottom: 1px; padding-left: 3px;} h3.toggler:hover{background: #FF9000;} #iComments {width: 100%; height: 93%; border: none;} #iArticle{width: 100%; height: 93%; border: none;} a img{border: none;}  a:visited{background-color: #FFE4CF;}</style>';

		//old css (whole page scrolls vertically as opposed to just the news section)
		//un-comment the line below (and comment the "var css" line above) if you liked the old style of Hacker News OnePage better
		//var css = '<style type="text/css">html, body{height: 100%; padding: 2px; margin: 0px;} #header{font-size: 12px;} #logo{float: left;} #menu_wrapper{float: left;	padding-left: 5px;} #menu_head{clear: both; font-size: 14px;} #login{float: right; text-align: right; padding-right: 5px;} #news_column{float: left; width: 35%; padding-bottom: 5px;} #accordian{float: left; width: 64%; padding-left: 5px;} h3.toggler{cursor: pointer; font-family: Arial, Helvetica, sans-serif; font-size: 12px; background: #FF6600; color: #000000; margin-bottom: 1px; margin-top: 0px; margin-right: 0px; margin-left: 0px; padding-top: 1px; padding-right: 0px; padding-bottom: 1px; padding-left: 3px;} h3.toggler:hover{background: #FF9000;} #iComments {width: 100%; height: 93%; border: none;} #iArticle{width: 100%; height: 93%; border: none;} a img{border: none;} a:visited{background-color: #FFE4CF;}</style>';
		
		$(css).appendTo("head")
	}  
})();