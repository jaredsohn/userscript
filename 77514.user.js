// ==UserScript==
// @name           Navigable Plurk Mobile with AJAX response list
// @namespace      http://robinbee.blogspot.com/
// @description    A navigable version of Plurk Mobile that you can browse plurk using keyboard shortcuts, and the response list will show in AJAX-way.
// @author         RobinW http://userscripts.org/users/160671
// @author         The code of AJAX response list is improved from Jacky http://userscripts.org/users/29013
// @version        0.9.5.1
// @date           2012-02-21
// @timestamp      201202210037
// @include        http://www.plurk.com/m
// @include        http://www.plurk.com/m#*
// @include        http://www.plurk.com/m?*
// @include        http://www.plurk.com/m/*
// ==/UserScript==

/* Changelog:
0.9.5.1  2012-02-21  fixed the ReP link in RePlurk function

0.9.5    2012-02-14  relocated replurk and like buttons
                     added support for "edit before replurk" (at permanent plurk page)
                     added support for permanent plurk page
                     added animated effects
                     now only toggle mute button, not like button
                     changed to jQuery 1.7.1
                     minor bug fixes

0.9.4    2011-04-19  added floating menu bar
                     improved mark as read counting
                     improved scrolling to highlighted plurk
                     minor bug fixes

0.9.3    2011-04-13  fixed the problem cause by offical Plurk Mobile changing.
                     fixed the unmute function
                     changed to jQuery 1.5

0.9.2    2010-05-30  addoed keyboard shortcut "esc" to blur input field and reset the view
                     added the function to show mute button, like button, and private tag only when the plurk is focused or hovered
                     fixed the function "click to add @user to the reply box"
                     moved loading icon behind the mute button
                     fixed some minor bugs

0.9.1    2010-05-27  disabled the hover highlighting
                     changed the focusing style
                     added color-changing of filter tabs
                     added the function to show mute and like buttom only when the plurk is focused
                       (can be disabled by changing TOGGLE_DISPLAY_MUTE_BUTTON flag to false)
                     fixed several minor bugs

0.9.0    2010-05-24  first release
*/


/* Features
# Ajax-style responses list (implemented by Jacky, improved by RobinW)

# Reply box (implemented by Jacky, improved by RobinW)

# Style twitsted
	* Move the like button to "float right" to avoid the misclicking.
	* ...

# Keyboard shortcuts:
	J   expand next plurk
	K   expand previous plurk
	N   move to next plurk
	P   move to previous plurk
	O   expand/collapse plurk
	M   mute/unmute plurk
	(L   like plurk)
	Y   expand reply box (when the plurk is expanded)
	H   next page
	G   preivous page
	U   update
	R   reload
	V   toggle all/unread
	W   toggle myplurk/(all or unread)
	S   toggle responsed/(all or unread)
	Q   toggle private/(all or unread)
	1~9 open external links at new tab/window (need to allow "pop-up windows")
	
*/

/* Known Issues

*/

/* TODO

# emoticon (built-in?)	

*/

//DEBUG
var DEBUG = false;

//to auto-expand comment or not, default is false
var AUTO_EXPAND = false;
// 
var FIXED_RESPONSELIST = false;
//
var ONLINE_UPDATE_UNREAD_COUNT = false;
//
var ORIGINAL_MENU = false;
//
var TOGGLE_DISPLAY_MUTE_BUTTON = true;
//
var ANIMATED = true;

//Custom CSS
var CUSTOM_CSS = "div.response { border-left: 5px solid #EEE;  padding-left: 3px;} "
               + "form.replyBox{ margin-left: 2em; font-size:0.7em;} "
               + "a.replyLink, a.RePLink {font-size:0.7em; padding-left: 2em;} "
               + "span.meta a.like, span.meta a.replurk {float: right;} "
               + "span.meta a.r {float:none;} "
               + "span.loading {float:none; display:inline-block; margin-left: .5em; width:16px; height:16px; text-indent:-9999px; background:url(data:image/gif;base64,R0lGODlhEAAQAPMAAP///7ZSF7ZSF9qqjdaffuXDr+vRwfDd0vTo4N+2nffv6dOYdQAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAAEKxDISau9OE/Bu//cQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqPlAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv/XJEMxIFg4VieV0qaqCC+rOWu8Yy3sgrzoCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/9xhFMlAYOFYnldKmqggvqzlrvGMt7IK86AgR0MsGo+UCAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+cghxGkQyEFY7lmVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/nKUgh1EkAxFWY3mmK9WaqCqIJA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xymIIexEOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEJhDISau9OE/Bu/+cthBDEmZjeWKpKYikC6svGq9XC+6e5v/AICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+ctRBDUhgHElZjeaYr1ZqoKogkDd9s/to4Vy02mf1ASI9myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/HLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nLQQQ1IYB0KFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA=) no-repeat 0 0px} "
               //+ "div.keyFocused {background: #E7C185 /*#E7A885*/ /*#E9F4C3*/} "
               + "div.keyFocused {border-color: #E7A885 !important; border-bottom: 1px solid #E7A885 !important; /*background: #E9F4C3*/} "
               //+ "div.cursorFocused {background: #FFFCCC} "
               + "a.pageFocused {color: #CF682F /*#B65217*/} "
               + ".exLinkNumber {font-size: x-small; color: red; vertical-align: bottom;} "
               + "div.plurk{margin: .1em 0 0 -.1em; padding: .4em 0 .2em .2em; border: 2px solid white; border-bottom: 1px dotted #6f6f6f;} "
               + ".muted a.mute, .liked a.like {color: #ccc} "
               + "ul.unread_menu {font-size: x-small} "
               + "li.unread_new {font-size: small} "
               + "a.maar_new {float: right !important} "
               + ".fixed {position: fixed; top: 0} "
               + ".menu_new {width: 100%} "
               + ".menu_new .pagination {margin: 5px; float: right; position: absolute; right: 40%; text-align: right; } "
               + ".menu_new .pagination a {border: 0;} "
               ;
                 
if (FIXED_RESPONSELIST) 
	CUSTOM_CSS += "div.responseList{background: white; width: 400px; position: fixed; border: 1px; top: 50px; left: 500px;}";
if (ORIGINAL_MENU==false)
	CUSTOM_CSS += "li.unread {display: none} ";
               
var prevPid = "";
var keyPid = "";
var canNav = true;
var isModifierKey = false;
var topInput;
var focusedInput = "";
var focusedCursorPosition = 0;
var isSubmitted = false;
var currentUser = "";

//Loading jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
	else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery(){
	if (DEBUG) {
		CUSTOM_CSS += ".debug {color: black; position: fixed; top: 0; left: 50%; z-index: 100; } ";
		
		$("<div></div>").addClass("debug")
			.append( $('<div></div>').text("Debugging...") )
			.insertAfter("#plurkbox");
	}
	
	//a little bit styling
	addCSS(CUSTOM_CSS);
	
	if (location.href.indexOf('/m/p/')>=0) {
		var plurk_id = location.href.replace('http://www.plurk.com/m/p/');
		var owner_id = $('div.bigplurk').find('a').first().attr('href').replace('/m/u/','');
		var plurk_content = $('div.bigplurk').clone(true)
			.removeClass('bigplurk').addClass('cloneplurk').hide()
			.appendTo('div.bigplurk');
		
		$(plurk_content).find('div.meta').remove();
		document.title = $(plurk_content).text();// + "";
		
		$(plurk_content).find('a[href^="\/m\/u\/"]').first().remove().end().end()
				.find('span.qualifier').first().remove();
		
		var newUrl = location.href.replace('/m', '').replace(/#.*$/, '');
		$('h3.menu').first()
			.prepend('<span class="la">|</span>').prepend('<a class="la" href="" id="replurk" title="click to edit before replurk">RePlurk</a>')
			.prepend('<span class="la">|</span>').prepend('<a class="la" href="'+newUrl+'">Standard View</a>');
		
		var main_form;
		$('a#replurk').click(function(){
			if ($('form#mainbox').length>0) { main_form.toggle(); }
			else {
				$(plurk_content).find('a').replaceWith(function(){
					var href = $(this).attr('href').replace('plurk.com/m/u/', 'plurk.com/');
					if ($(this).hasClass('pictureservices'))
						return href;
					return href + " (" + $(this).text() + ")";
				});
				main_form = $('<div class="plurkbox_div"></div>').insertAfter($(this).parent('h3'))
					.append( $('form#plurkbox').clone(true).removeClass('plurk_only').attr({id: 'mainbox', action: '/m/'}) );
				
				var maininput;
				$('form#mainbox').find('input#input_content').each(function(){maininput= this});
				//$(maininput).val( $(plurk_content).text().trim() + " via " + newUrl + " ("+owner_id+")" );
				$(maininput).val( "@"+owner_id+": " + $(plurk_content).text().trim() +"["+ newUrl + " (ReP)]");
				maininput.focus();
				maininput.setSelectionRange(0, 0);
			}
			return false;
		});
		
		$('div.cloneplurk').remove();
	}
	
	floatingMenu();
	
	// http://api.jquery.com/contents/
	currentUser = $.trim( $("#plurkbox > p:first").contents().filter(function(){return this.nodeType == 3;}).text() );
	
	$('span.meta') // TODO
		.find('a[href*="\/m?u"]').addClass("mute").end()
		.find('a[href*="\/f?v"]').addClass("like").end()
		.find('a[href*="\/r?r"]').addClass("replurk").end();
	$("div.plurk") // TODO
		.find("a[id]").addClass("owner").end()
		.has('span.meta i:contains("private")').addClass("private").end()
		.has('a.mute:contains("unmute")').addClass('muted').end()
		.has('a.like:contains("unlike")').addClass('liked').end()
		.has('a.replurk:contains("unreplurk")').addClass('replurked').end()
		.hover(
			function() {$(this).addClass("cursorFocused"); updateDisplay();}, 
			function() {$(this).removeClass("cursorFocused"); updateDisplay();} )
		//.click(function(){getResponse($(this).find("span.meta a.r")[0]);})
		.click(function(){keyPid = this.id; highlightPlurk(this);})
		.each(function(){
				$(this).attr("id", "p"+$(this).find("a").attr("id"));
				//swap($(this).find("i"), $(this).find("a.mute"));
			});
	
	renewFilters(true);
	updateDisplay();
	
	topInput = $("input:text")[0];
	$(topInput).focus(function(e){
		canNav = false;
		focusedInput=this;
	}).blur(function(e){
		canNav=true;
		//focusedCursorPosition = this.selectionStart;
	});
	
	$(document).focus(function(){isModifierKey = false;});
	
	$(document).keyup(function(event){
			switch (event.which)
			{
			case 224: // command (apple)
			case 17: // control
			case 18: // option (alt)
			case 91: // windows
			case 16: // shift
				isModifierKey = false;
				break;
			}
		});
	
	$(document).keydown(function(event){
			switch (event.which)
			{
			case 224: // command (apple)
			case 17: // control
			case 18: // option (alt)
			case 91: // windows
			case 16: // shift
				isModifierKey = true;
				break;
			case 27: //esc
				if (canNav) { // TODO
					keyPid = "";
					prevPid = "";
					$("div.plurk").removeClass("keyFocused");
					$("a.ex_link .exLinkNumber, a.user_link .at_symbol").remove();
					$("div.responseList").remove();
					updateDisplay();
				} else {
					focusedInput.blur();
					canNav = true;
				}
				break;
			}
			
			if (canNav /* && !isModifierKey */) {
				var key ="none";
				
				if (event.which>=49 && event.which<=57) {
					var n = event.which-49;
					var exLinks = $("#"+keyPid).find("a.ex_link");
					
					if (n<exLinks.length)
						open(exLinks.get(n).href);
				}
				
				switch (event.which)
				{
				case 74: // j
					keyPid = nextKeyPid(keyPid);
					scrollToPlurk($("#"+keyPid));
					getResponse($("#"+keyPid).find("span.meta a.r")[0]);
					key = "j";
					break;
				case 75: // k
					keyPid = prevKeyPid(keyPid);
					scrollToPlurk($("#"+keyPid));
					getResponse($("#"+keyPid).find("span.meta a.r")[0]);
					key = "k";
					break;
				case 79: // o
					getResponse($("#"+keyPid).find("span.meta a.r")[0]);
					key = "o";
					break;
				case 77: // m
					getResponse($("#"+keyPid).find("span.meta a.mute")[0]);
					key = "m";
					break;
				/*case 76: // l
					getResponse($("#"+keyPid).find("span.meta a.like")[0]);
					key = "l";
					break;*/
				case 89: // y
					//var formf = $("#"+keyPid).find("form.replyBox").toggle().find("input.input").focus();
					$("#"+keyPid).find("a.replyLink").click();
					event.preventDefault();
					key = "y";
					break;
				case 78: // n
					keyPid = nextKeyPid(keyPid);
					scrollToPlurk($("#"+keyPid));
					key = "n";
					break;
				case 80: // p
					keyPid = prevKeyPid(keyPid);
					scrollToPlurk($("#"+keyPid));
					key = "p";
					break;
				case 72: // h
					$("a.orange-but:contains('next')").each(function(){
						location.href=$(this).attr("href"); });
					key = "h";
					break;
				case 71: // g
					$("a.orange-but:contains('back')").each(function(){
						location.href=$(this).attr("href"); });
					key = "g";
					break;
				case 82: // r
					location.reload();
					key = "r";
					break;
				case 85: // u
					location.href = "/m/";
					key = "u";
					break;
				case 86: // v
					if (location.href.indexOf("mode=unread")>=0)
						location.href="/m/?mode=";
					else
						location.href="/m/?mode=unread";
					key = "v";
					break;
				case 87: // w
					if (location.href.indexOf("mode=unread_my")>=0)
						location.href = "/m/?mode=unread";
					else if (location.href.indexOf("mode=unread")>=0)
						location.href = "/m/?mode=unread_my";
					else if (location.href.indexOf("mode=my")>=0)
						location.href = "/m/?mode=";
					else
						location.href = "/m/?mode=my";
					key = "w";
					break;
				case 83: // s
					if (location.href.indexOf("mode=unread_responded")>=0)
						location.href = "/m/?mode=unread";
					else if (location.href.indexOf("mode=unread")>=0)
						location.href = "/m/?mode=unread_responded";
					else if (location.href.indexOf("mode=responded")>=0)
						location.href = "/m/?mode=";
					else
						location.href = "/m/?mode=responded";
					key = "s";
					break;
				case 81: // q
					if (location.href.indexOf("mode=unread_private")>=0)
						location.href = "/m/?mode=unread";
					else if (location.href.indexOf("mode=unread")>=0)
						location.href = "/m/?mode=unread_private";
					else if (location.href.indexOf("mode=private")>=0)
						location.href = "/m/?mode=";
					else
						location.href = "/m/?mode=private";
					key = "q";
					break;
				}
				
				if (keyPid)
					highlightPlurk($("#"+keyPid));
				
				//return false;
			} else {
				//$(topInput).val("cannot nav");
			}
		});
	
	//attach event
	$("span.meta a").each(function(){
			$(this).click(function(){
					if (!isModifierKey){
						getResponse(this);
						return false;
					}
				});
			if(AUTO_EXPAND) getResponse(this);
		});
}

function getResponse(obj, nonMobile){
	var plurk = $(obj).parents("div.plurk");
	
	//plurk.find("div.responseList").remove();
	var rl = $("div.responseList");
	if (rl.length==0) {
		prevPid="";
	}
	if ($(obj).hasClass("r")) { // TODO
		if (ANIMATED)
			rl.hide(200, function(){$(this).remove()});
		else 
			rl.remove();
		
		$(".owner").attr("title", "").unbind("click");
	}
		
	if (isSubmitted) {
		canNav = true;
		isSubmitted = false;
	} else {
		var currentPid = $(plurk).attr("id");
		
		if (currentPid == prevPid) {
			prevPid = "";
			
			if ($(obj).hasClass("r")) {
				return false;
			} else { // TODO
				if (ANIMATED)
					rl.hide(200, function(){$(this).remove()});
				else
					rl.remove();
				
				$(".owner").attr("title", "").unbind("click");
			}
		} else {
			if ($(obj).hasClass("r")) {
				keyPid = prevPid = currentPid;
				
				highlightPlurk($("#"+keyPid));
			} else {
				// prevPid won't change
			}
		}
	}
	
	//var div = $("<div></div>").addClass("responseList").appendTo(plurk);
	var div = $("<div></div>").addClass("responseList").hide().appendTo(plurk);
	
	if(!nonMobile){ //try to load from mobile version
		var url = obj.href;
		$.ajax({
			url:url,
			cache:false,
			success:function(data, status){
				if ($(obj).hasClass("mute")) {
					toggleButton(obj, "mute", "m?u=2", "m?u=0");
					
				} else if ($(obj).hasClass("like")) {
					toggleButton(obj, "like", "f?v=1", "f?v=0");
					
				} else if ($(obj).hasClass("replurk")) {
					toggleButton(obj, "replurk", "r?r=1", "r?r=0");
					
				} else {
					$(data).find("div.response").appendTo(div).end();
					var replyLink = $("<a href='#' class='replyLink' title='click to reply plurk'>[reply]</a>").appendTo(div);
					//var RePLink = $("<a href='#' class='RePLink' title='click to edit before replurk'>[RePlurk]</a>").appendTo(div);
					var form = $(data).find("form.plurkbox")
							.attr("action",obj.href).attr("id", "p"+$(plurk).attr("id"))
							.removeClass("plurkbox").addClass('replyBox')
							.find("p.submit").remove().end()
							.find("br").remove().end()
							.find("input.input").focus(function(e){
									canNav = false;
									focusedInput=this;
								}).blur(function(e){
									canNav = true;
									focusedCursorPosition = this.selectionStart;
								})/*.after("<input type='submit' value='Plurk!'/>")*/.end()
							.appendTo(div)
							.submit(function(){
								isSubmitted = true;
								setLoading(plurk);
								
								var params = {};
								var array = $(this).serializeArray();
								$.each(array, function(i, field){
										params[field.name] = field.value;
									});
								$.post(obj.href, params, function(data){
										removeLoading(plurk);
										getResponse(obj);
									});
								return false;
							})
							.hide();
					
					replyLink.click(function(){
						if (ANIMATED)
							form.toggle(200, function(){$(this).find("input.input").focus()});
						else {
							form.toggle();
							form.find("input.input").focus()
						}
						return false;
					});
					/*RePLink.click(function(){
						if (ANIMATED)
							form.toggle(200, function(){$(this).find("input.input").focus()});
						else {
							form.toggle();
							form.find("input.input").focus()
						}
						return false;
					});*/
					
					$('div.response a[href^="\/m\/u\/"]').addClass("user");
					
					// click user in the responsed list to insert user name in the input field
					$(plurk).find(".owner, .user").attr("title", "click to add @user to reply box").click(function(){
							var user = "@" + this.href.match(/(\w+)$/)[1];
							
							if ( $(focusedInput).parent(".replyBox").length==0 )
								focusedInput = $(plurk).find("input.input")[0];
							
							if ( $(focusedInput).is(":hidden") ) {
								if (ANIMATED)
									form.show(200);
								else
									form.show();
							}
							
							var string = $(focusedInput).val();
							
							if (focusedCursorPosition==0) {
								user += ": ";
							} else if ( !string.substr(focusedCursorPosition-1, 1).match(/[：；、，。？！ ]/)/*.search( new RegExp( "^.{" + (focusedCursorPosition-1) + "}[：；、，。？！ ]" ) )*/ ) {
								user = " "+user;
							}
							
							var newPos = focusedCursorPosition + user.length;
							
							// http://stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area
							// http://plugins.jquery.com/project/caret-range
							$(focusedInput).val( string.substr(0, focusedCursorPosition) + user + string.substr(focusedCursorPosition) );
							focusedInput.focus();
							focusedInput.setSelectionRange(newPos, newPos);
							return false;
						});
				}
				
				// mark as read
				var b = $(plurk).find(".r").parent("b");
				if ( $("div.menu_new").length && b.text() ) {
					//renewFilters(false, plurk);
					if (ONLINE_UPDATE_UNREAD_COUNT) {
						renewFilters();
					} else {
						updateUnreadCount( $('div.menu_new a[href$="unread"]') );
						
						if ( currentUser && $(plurk).find(".owner").text().indexOf(currentUser)>=0 )
							updateUnreadCount( $('div.menu_new a[href$="unread_my"]') );
						if ( $(plurk).has(".user:contains("+currentUser+")").length  )
							updateUnreadCount( $('div.menu_new a[href$="unread_responded"]') );
						if ( $(plurk).hasClass("private") )
							updateUnreadCount( $('div.menu_new a[href$="unread_private"]') );
					}
				}
				// http://api.jquery.com/unwrap/#comment-35503276
				$(b).replaceWith($(b).contents());
				
				// show responses
				if (ANIMATED)
					div.show(200, function(){scrollToPlurk(plurk)});
				else {
					div.show();
					// scroll to the plurk
					scrollToPlurk(plurk);
				}
			},
			error: function(){
				getResponse(obj, true);
			},
			beforeSend: function(){
				setLoading(plurk);
			},
			complete: function(){
				removeLoading(plurk);
				if ($(obj).hasClass("r")) {
					updateResponseCount(plurk);
					numberLinks(plurk);
				}
			}
		});
	}
	else{ //try to load from normal plurk page
		var url = obj.href.replace("/m","");
		$.ajax({ 
			url: url,
			cache:false,
			success: function(data,status){
				$(data).find("div.message")
					.find("span.time").remove().end()
					.find("a.user").each(function(){
						this.href = this.href.replace("/user","/m/u");
					}).end()
					.addClass("response").appendTo(div);
				
				var q = ["asks","feels","gives","has","hates","hopes",
						"is","likes","loves","needs","says","shares","thinks",
						"want","was","will","wishes","wonders"];

				var select = $("<select/>")
								.attr("name","qualifier")
								.append("<option>:</option>");
								
				$.each(q, function(i,d){
					var o = $("<option/>").addClass("qualifier").addClass("q_" + d)
						.val(d).text(d);
					select.append(o);
				});
				
				var replyLink = $("<a href='#' class='replyLink'>[reply]</a>").appendTo(div);
				var form = $("<form/>")
					.attr("action", url)
					.addClass('replyBox')
					.append("jackysee")
					.append(select)
					.append("<input type='text' size='30' name='content' class='input'/>")
					.append("<input type='submit' value='Plurk!'/>")
					.appendTo(div)
					.submit(function(){
						var params = {};
						var array = $(this).serializeArray();
						$.each(array, function(i, field){
							params[field.name] = field.value;
						});
						$.post(retryUrl, params, function(data){
							getResponse(obj, true);
						});
						return false;
					})
					.hide();
					
				replyLink.click(function(){
					form.toggle();
					return false;
				});
			},
			error: function(){
				div.html("error occurs!");
			}
		});
	}	
}

function addCSS(newcss){
	if ($.browser.msie) {
		document.createStyleSheet().cssText = newcss;
	} else {
		var tag = document.createElement('style'); tag.type = 'text/css'; document.getElementsByTagName('head')[0].appendChild(tag); 
		tag[ $.browser.safari ? 'innerText' : 'innerHTML'] = newcss; 
	}
}

function highlightPlurk(plurk) {
	$("div.plurk").removeClass("keyFocused");
	$(plurk).addClass("keyFocused");
	numberLinks(plurk);
	updateDisplay();
}

function numberLinks(plurk) {
	$("a.ex_link .exLinkNumber, a.user_link .at_symbol").remove();
	
	$(plurk).find("a.ex_link[href^=http://www.plurk.com/], a.user_link").each(function(){
			if ( this.href.indexOf("/m/u/")>=0 || (/*this.href.indexOf("images.plurk.com")<0 && */this.href.match(/\/(www.)?plurk\.com\/[^\/]{2,}\/?$/)) ) {
				$(this).addClass("user_link").removeClass("ex_link");
				$(this).text( "" + this.href.match(/[^\/]+$/)  );
				$("<span></span>").addClass("at_symbol").text("@").prependTo(this);
			}
			this.href = this.href.replace("com/p/", "com/m/p/");
		});
	$(plurk).find("a.ex_link").each(function(index){
			if (index<9)
				$("<span></span>").addClass("exLinkNumber").text(index+1).appendTo(this);
		});
}

function scrollToPlurk(plurk) {
	var pos = $(plurk).offset().top;
	var st = $(document).scrollTop();
	
	if (pos<st) {
		if (ANIMATED)
			$('html,body').animate({scrollTop: pos -$('div.menu_new').outerHeight(true) }, 200);
		else 
			$(document).scrollTop(pos -$('div.menu_new').outerHeight(true) );
	} else if ($(plurk).height()> $(window).height()) {
		if (ANIMATED)
			$('html,body').animate({scrollTop: pos -$('div.menu_new').outerHeight(true) }, 200);
		else 
			$(document).scrollTop(pos -$('div.menu_new').outerHeight(true) );
	} else if (pos+ $(plurk).height()> $(window).height()+st) {
		if (ANIMATED)
			$('html,body').animate({scrollTop: pos +$(plurk).outerHeight(true) -$(window).height() }, 200);
		else 
			$(document).scrollTop(pos +$(plurk).outerHeight(true) -$(window).height()); //TODO
	}
}

function floatingMenu() {
	// http://jqueryfordesigners.com/fixed-floating-elements/
	if ($('div.menu_new').length==0)
		return false;
	
	$('<div class="menu_space"></div>').height( $('div.menu_new').outerHeight(true) ).insertBefore('div.menu_new').hide();
	var menuTop = $('div.menu_new').parent('div').offset().top;
	
	if ($('div.menu_new').offset().top<$(document).scrollTop()) {
		$('div.menu_new').addClass('fixed');
		$('div.menu_space').show();
	}
	
	$(window).scroll(function (event) {
		// what the y position of the scroll is
		var y = $(this).scrollTop();
		
		// whether that's below the form
		if (y >= menuTop) {
			// if so, ad the fixed class
			$('div.menu_new').addClass('fixed');
			$('div.menu_space').show();
		} else {
			// otherwise remove it
			$('div.menu_new').removeClass('fixed');
			$('div.menu_space').hide();
		}
	});
}

function setLoading(plurk) {
	$("<span>loading</span>").addClass("loading").appendTo($(plurk).find("span.meta"));
}
function removeLoading(plurk) {
	$(plurk).find("span.loading").remove();
}

function nextKeyPid(keyPid) {
	if (keyPid == "") {
		return $("div.plurk").first().attr("id");
	} else if ($("#"+keyPid).nextAll("div.plurk").length > 0) {
		return $("#"+keyPid).next("div.plurk").attr("id");
	} else {
		return keyPid;
	}
}
function prevKeyPid(keyPid) {
	if (keyPid == "") {
		return $("div.plurk").last().attr("id");
	} else if ($("#"+keyPid).prevAll("div.plurk").length > 0) {
		return $("#"+keyPid).prev("div.plurk").attr("id");
	} else {
		return keyPid;
	}
}

function renewFilters(f, p) {
	var first = f ? true : false;
	var plurk = p;
	
	if (ORIGINAL_MENU==true) {
		
		if (first)
			return false;
		
		//TODO
		
		return false;
	}
	
	if ( document.location.href.indexOf("mode=unread")>=0) {
		$('div.menu_new ul').addClass('unread_menu').find('li')
			.has('a[href$="unread"]').addClass('unread_new').find('a').each(function(){ $(this).text( $(this).text().replace(/all/, 'unread') ) }).end().end()
			.has('a[href="/m"]').remove();
		
		$('<ul></ul>').addClass('dummy').append('<li class="unread_page"></li>').appendTo('div.menu_new');
		$('ul.unread_menu').appendTo('li.unread_page');
		
		$('<li></li>').addClass('all_page')
			.append('<ul class="all_menu"> <li><a href="/m">all</a></li> <li><a href="/m/?mode=my">my</a></li> <li><a href="/m/?mode=responded">responded</a></li> <li><a href="/m/?mode=private">private</a></li> <li><a href="/m/?mode=favorite">liked</a></li> </ul>')
			.appendTo('div.menu_new ul.dummy');
		/* // online
		$('<li></li>').addClass('all_page').appendTo('div.menu_new ul.dummy');
		$('div.menu_new li.all_page').load('/m/ div.menu_new ul', null, function(){
				$(this).find('ul').addClass('all_menu').find('li').has('a[href="/m"]').removeClass('active');
			});*/
		
		//mark all as read
		$('<li></li>').append( $('a.maar').removeClass('maar').addClass('maar_new') ).appendTo('div.menu_new ul.dummy');
	} else if ($("div.menu_new li.unread").length>0) {
		if ($('div.menu_new li.unread_page').length == 0) {
			$("<li></li>").addClass("unread_page").append('<ul class="unread_menu"><span></span></ul>').prependTo("div.menu_new ul");
			
			$('li.unread').prependTo('ul.unread_menu').addClass('unread_new').removeClass('unread').find('a').each(function(){
					$(this).text( 'unread('+ $(this).text().match(/(\d+)/)[1] +')' )
				});
		}
		
		$('ul.unread_menu span').load('/m/?mode=unread div.menu_new ul li', null, function(){ 
				$(this).find('li').has('a[href="/m"]').remove();
				$(this).find('li').has('a[href$="unread"]').remove();
			});
	}
	
	// pagination
	$('div.pagination').clone(true).appendTo('div.menu_new')
		.find('a').removeClass('orange-but').end()
		.each(function(){
			if ( $(this).find('a:contains(back)').length==0 ) {
				$(this).prepend('« back   |   ');
			} else if ( $(this).find('a:contains(next)').length==0 ) {
				$(this).append('   |   next »');
			}
		});
}

function updateUnreadCount(a) {
	var count = 0;
	$(a).each(function(){
		$(this).text( $(this).text().replace(/\d+/, function(word){count = parseInt(word)-1; return count;}) );
	});
	
	return count;
}

function updateResponseCount(plurk) {
	$(plurk).find("a.r").contents().remove();
	$(plurk).find("a.r").append( $(plurk).find("div.response").length +" <span>responses</span>");
}

function updateDisplay() {
	
	if (TOGGLE_DISPLAY_MUTE_BUTTON) {
		// a.like, a.replurk, 
		$("div.plurk").find("a.mute, i:contains(private)").hide();
		$("div.cursorFocused, div.keyFocused").find("a.mute, i:contains(private)").show();
	}
}

// http://stackoverflow.com/questions/698301/is-there-a-native-jquery-function-to-switch-elements
function swap(from, to) {
    return $(from).each(function() {
        var copy_to = $(to).clone(true);
        var copy_from = $(from).clone(true);
        $(to).replaceWith(copy_from);
        $(from).replaceWith(copy_to);
    });
}

function toggleButton(obj, button, from, to) {
	var btext = $(obj).text();
	var bstatus = (button+"ed").replace("ee", "e");
	if (btext.indexOf("un"+button)<0) {
		obj.href = obj.href.replace(from, to);
		$(obj).text( btext.replace(button, "un"+button) ).parents('div.plurk').addClass(bstatus);
	} else {
		obj.href = obj.href.replace(to, from);
		$(obj).text( btext.replace("un", "") ).parents('div.plurk').removeClass(bstatus);
	}
}

function editBeforeReplurk (form) {	
}
