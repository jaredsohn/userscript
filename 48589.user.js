// ==UserScript==
// @name           KullDox Bugzilla Enchancements
// @namespace      http://kulldox.atwetbpages.com
// @description    Make some enchancements for bugzilla.
// @include        http*://*bugzilla*
// @version        0.6.1
// @date           2009-10-01
// ==/UserScript==

// set up jQuery variable
  var $;

// Add jQuery
    var GM_JQ = document.createElement('script');
//    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
//    GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.min.js';
    GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
    GM_JQ.type = 'text/javascript';
  // Check if jQuery's loaded
  var loadFlag = 0;// a flag to check if the jquery file has been inserted into <head>
  var checker=setInterval(function(){
    $ = unsafeWindow.jQuery;
	if(typeof ($) == "function" ) {
			clearInterval(checker);
          if(loadFlag ==1){
			clearInterval(checker);
			letsJQuery();
			return;
		  }
     } else {
		    if(loadFlag ==0){
				document.getElementsByTagName('head')[0].appendChild(GM_JQ);
				loadFlag = 1;
			}
	 }
   },100);

// All your GM code must be inside this function
    function letsJQuery() {
		$.noConflict();//avoid conflicts with other libraries
		var page = window.location.href,// get the location href to find out what page is loaded
			page_uri = window.location.pathname.substr(10)+window.location.search;//grab the page URI
			$comments = $('#comments'),
			$bz_comment = $('.bz_comment'),
			$bz_comment_table = $('.bz_comment > table'),
			$bz_comment_div_pre = $("#comments > div pre"),
			$bugzilla_body = $('#bugzilla-body'),
			$bz_head = $('head'),
			$bz_head_style = $bz_head.find('style'),
			$ul_links_li = $('#header ul.links li'),
			$saved_links = $('#links-saved ul.links li');
		$ul_links_li.find('span.separator').remove();//remove delimiters from top menu
		$saved_links.find('span.separator').remove();//remove delimiters from saved links
		$('body').css('background','lightgrey');//change document background color to grey
		$('form[action="process_bug.cgi"] td:first,form[action="post_bug.cgi"] td:first').css({'width':'100%'});//make form wider
		$('#comment').css({'width':'1300px'});//make comments block wider
		$('#short_desc').css({'width':'810px'});//make summary input wider
		if($bz_head_style.length <1)//avoid duplicate style insertion
		{
			$bz_head.append('<style/>');
			$bz_head_style = $bz_head.find('style');
		}
		// START: MENU processing
		$bz_head_style.append(''+
		'#header ul.links li a, #links-saved ul.links li a { '+
			'-moz-background-clip: border;'+
			'-moz-background-inline-policy: continuous;'+
			'-moz-background-origin: padding;'+
			'-moz-border-radius-bottomleft: 5px;'+
			'-moz-border-radius-bottomright: 5px;'+
			'-moz-border-radius-topleft: 5px;'+
			'-moz-border-radius-topright: 5px;'+
			'padding: 0px 4px 0px 4px;'+
			'text-decoration: none;'+
			'position: relative;'+
		'}'+
		'#header ul.links li a:hover, #links-saved ul.links li a:hover {'+
			'background-color: #FF9900;'+
		'}'+
		'.nactiveM{'+
			'color: #ffffff; '+
			'background-color: #777777 '+
		'}'+
		'.activeM {'+ 
			'color: #ffffff; '+
			'background-color: #FF9900 '+
		'}'+
		'');
		var flag_m;// flag to show that the saved_links is inserted or not, to avoid duplicates
		if(typeof (flag_m) === "undefined") {
			flag_m = 0;
		}
		$ul_links_li.each(function(i){
			if(i == 3 && flag_m < 1){
				$(this).after($saved_links.clone());// add the saved links to the top menu
				flag_m = 1;
			}
			$(this).find('a').addClass('nactiveM');//set the default style to all the items
		});
		$ul_links_li = $('#header ul.links li');//cache again the menu, now with the inserted saved_links
		$ul_links_li.each(function(){
			$curr_a = $(this).find('a');
			$curr_link = $(this).find('a').attr('href');
			if($curr_link == page_uri){
				$curr_a.removeClass('nactiveM').addClass('activeM');// highlight the ative item in the top menu
			} else {
				$curr_a.removeClass('activeM').addClass('nactiveM');
			}
		});
		$saved_links.each(function(){//the same as above but for saved_links
			$curr_a = $(this).find('a');
			$curr_link = $(this).find('a').attr('href');
			if($curr_link == page_uri){
				$curr_a.removeClass('nactiveM').addClass('activeM');// highlight the ative item in the saved_links menu
			} else {
				$curr_a.removeClass('activeM').addClass('nactiveM');
			}
		});
		// END: MENU processing
		$("a[href='quips.cgi']").parent().remove();// hide the quip on the top
		$bugzilla_body.find('div.tabbed').show();// show the tabs on the top
		$('#knob').show();// show comments block
		$('#page-index').show();// show the info block on home page
		//  START: Comments processing
		if(page.match(/show_bug.cgi/)){//load only on show_bug page
			$('#comments > div:odd').css("background-color", "#F0EFC9");//alternate colors for odd comments
			$('#comments > div:even').css("background-color", "#E5F3F9");//alternate colors for even comments
			$('.bz_comment > table > tbody > tr ').append('<td><a href="#attachment_table">Go2Top</a></td>'); //add a link to top on first comment
			$('.bz_comment_head').append('<span><a href="#attachment_table">Go2Top</a></span>'); //add a link to top on the rest comments
			$bz_comment.append('<span><a href="#attachment_table">Go2Top</a></span>'); //add a link to top on the bottom of every comment		
			//colapsable comments
			var collapseButtons = '<p class="collapse_buttons"><a href="#" class="show_all_message">Show all</a> 	<a href="#" class="collpase_all_message">Collapse all</a></p>';
			$comments.prepend(collapseButtons);//add collapse/show all controls on top of comments block
			$comments.append(collapseButtons);//add collapse/show all controls on bottom of comments block
			$bz_comment_table.css({'background-color':'#E0E0E0'});//color the first comment's header 
			$('.bz_comment > table td:first').css({'width':'0%'});//set the date cell of first comment's header to 0% to make it 1 line height
			//hide comments body exepting the last one
			$bz_comment_div_pre.hide().filter(":last").show();
			//toggle comments body
			$(".bz_comment_head,.bz_first_comment_head").click(function(){
				$(this).next("pre").slideToggle(500)
				return false;
			});
			//toggle comments body first comment
			$bz_comment_table.click(function(){
				$(this).next("pre").slideToggle(500)
				return false;
			});
			//collapse all comments
			$(".collpase_all_message").click(function(){
				$bz_comment_div_pre.slideUp(500)
				return false;
			});
			//show all comments
			$(".show_all_message").click(function(){
				$bz_comment_div_pre.slideDown()
				return false;
			});
		}
		//  END: Comments processing
		// START: Show/Hide bugs depending on status
		if(page.match(/buglist.cgi?/))//load only on buglist page
		{
			//function to create the bugs combo box for show/hide
			function bugsCombo(divClassName, selectClassName, name, defaultValName)
			{
				htmlBugsCombo = '<div class="'+divClassName+'_combo">'+name+': '+
								'<select class="'+selectClassName+'" size="1" name="'+selectClassName+'">'+
									'<option value="NONE">'+defaultValName+'</option>'+
									'<option value="UNCONFIRMED">UNCONFIRMED </option>'+
									'<option value="NEW">NEW </option>'+
									'<option value="ASSIGNED">ASSIGNED </option>'+
									'<option value="REOPENED">REOPENED </option>'+
									'<option value="RESOLVED">RESOLVED </option>'+
									'<option value="VERIFIED">VERIFIED </option>'+
									'<option value="CLOSED">CLOSED </option>'+
								'</select></div>';
				return htmlBugsCombo;
			}

		var $bz_buglist_tr = $(".bz_buglist tbody tr.bz_bugitem"),
				hideBugsCombo = bugsCombo('hide_by_status', 'hide_bug_status', 'Hide', 'NONE'),
				showBugsCombo = bugsCombo('show_by_status', 'show_bug_status', 'Show', 'ALL'),
				$bz_buglist = $(".bz_buglist"),
				$tr_bz_bugitem = $("tr.bz_bugitem");

			if($('.hide_by_status_combo').length <= 1)
			{
				$bugzilla_body.prepend(hideBugsCombo+showBugsCombo);//add Show/Hide bugs combo to top
				$bugzilla_body.append(hideBugsCombo+showBugsCombo);//add Show/Hide bugs combo to top
				$(".hide_by_status_combo, .show_by_status_combo").css({'display':'inline', 'padding':'0px 5px 0px 0px'});
			}
			//hide bugs depending on status 
			$(".hide_bug_status").change(function()
			{
				var selVal = $(this).val();
				if(selVal == 'NONE'){
					$bz_buglist_tr.show();
				} else {
					$bz_buglist_tr.show().filter("tr.bz_"+selVal+"").hide();
				}
				return false;
			});
			//show bugs depending on status 
			$(".show_bug_status").change(function()
			{
				var selVal = $(this).val();
				if(selVal == 'ALL'){
					$bz_buglist_tr.show();
				} else {
					$bz_buglist_tr.hide().filter("tr.bz_"+selVal+"").show();
				}
				return false;
			});
			$($bz_buglist).next().next().find('form').css({'display':'inline'});
			//buglist table row highighting
			$bz_head_style.append(''+
			'.highlight{ background-color: #FF8800 }'+
			'.hl_selected{ background-color: #fcc }'+
			'.hl_selected_hl{ background-color: #FF8800 }'+
			//'tbody td.highlight {background-color:#666; color:#fff}'+
			'');
			$tr_bz_bugitem.mouseover(function(e)
			{
				$(e.target).addClass('highlight').parent().addClass('highlight');
			}).mouseout(function(e)
			{
				$(e.target).removeClass('highlight').parent().removeClass('highlight');
			}); 
			$tr_bz_bugitem.click(function(e)
			{
				$(e.target).toggleClass('hl_selected').parent().toggleClass('hl_selected');
			}); 		
			$bz_buglist.find('tr:first').css({"background-color":"#404D6C"},{"color":"#FFFFFF"});//change buglist table header background color
			$bz_buglist.find('tr:first a').css({"color":"#FFFFFF"});//change buglist table header links color
		}
		// END: Show/Hide bugs depending on status
		// START: Style the New bug page
		if(page.match(/enter_bug.cgi\?/) === null)//load only on enter_bug page, but not on new bug form page
		{
			if(page.match(/enter_bug.cgi/))//load only on enter_bug page
			{
				$bz_head_style.append(''+
				'.highlight{ background-color: #F7F7F7 }'+
				'');
				var 
					win = {'w':$(window).width(),'h':$(window).height()},
					topmenu_h = $('#gap').height()+50,
					header_h = $('#header').height(),
					footer_h = $('#footer').height()
				;
				$bugzilla_body.css({
					'height' : ((win.h-header_h-footer_h-topmenu_h)+'px'),
					'overflow' : 'auto',
					'border' : '1px solid #404D6C'
				});
				$bugzilla_body.find('tr:odd').addClass('highlight');
			}
		}
		// END: Style the New bug page

    }