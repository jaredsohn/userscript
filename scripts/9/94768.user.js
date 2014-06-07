// ==UserScript==
// @name           syn2cat Repage
// @description    Restyles the project site https://source.hacker.lu
// @author         Slopjong
// @version        1.2
// @namespace      lu.hacker.source
// @include        *source.hacker.lu/projects
// @include        *source.hacker.lu/projects/
// @require        http://sizzlemctwizzle.com/updater.php?id=94768
// ==/UserScript==

/**
 * Changelog:
 *
 * 11.11.2011 - 1.2
 *
 *   1. Rearranged some projects. Since March a lot has changed on the projects site.
 *       A fourth column was required to get the view cleaned up.
 *   2. Some projects are not projects or don't contain any useful informatino. This are
 *       hidden by default but still accessible by the select box.
 *   3. The working groups are renamed to circles.
 *
 * 27.03.2011 - 1.1.1
 *
 *   Patch: the project filter plugin http://www.redmine.org/plugins/project-filter 
 *          was installed on March 27th and did some trouble. Now all its stuff is hidden.
 *
 * 05.03.2011 - 1.1
 *
 *   1. Added projects that were created after the first release (hard-coded)
 *   2. Added a menu to disable/enable stars.
 *
 * 17.01.2011 - 1.0
 *
 *   Initial release
 *
 */

if( typeof GM_registerMenuCommand == "function" )
{
	// I must define two menus because I can't interact with
	// Greasemonkey after the script is running in the other scope
	GM_registerMenuCommand( "Activate stars", function(e){
		GM_setValue('showStars', true);
	});
		
	GM_registerMenuCommand( "Deactivate stars", function(e){
		GM_setValue('showStars', false);
	});
}

if( typeof GM_addStyle == "function" )
{
	GM_addStyle("\
		.gm_float_left {\
			float:left;\
		}\
		.gm_col {\
			width: 270px;\
			/*border:solid 1px #888888;*/\
		}\
		.gm_clear {\
			clear: both;\
		}\
		.description {\
			position:absolute !important;\
			width: 250px !important;\
			background-color: #EDF3FE;\
			border: solid 1px #888888;\
			padding: 5px;\
		}"
	);
}

if ('undefined' == typeof __LU_HACKER_SOURCE__) {
  (function page_scope_runner() {
  
    var my_src = "var _projects_show_stars = '"+ GM_getValue('showStars', false) +"'; ("
    		+ page_scope_runner.caller.toString() 
    		+ ")();";
    		
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.setAttribute("src",
        "data:,"+escape("var __LU_HACKER_SOURCE__ = true; \n" + my_src));

    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 0);
  })();

  return;
}

(function() {
	// Add jQuery
	// TODO: 	adding jQuery support by using @require is easier but one could run into snags. 
	// 			Greasemonkey won't execute the script at all if config.xml contains an required tag.
	// 			As soon as this tag is removed the script will be executed properly. DAMN. Why?
	var GM_JQ = document.createElement('script');
	
	GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js";
 	GM_JQ.type = 'text/javascript';
 	document.getElementsByTagName('head')[0].appendChild(GM_JQ);
 	GM_wait();	
})();

// Check if jQuery's loaded
function GM_wait() {
	if(typeof jQuery == 'undefined') {
		window.setTimeout(GM_wait,100);
	} else {
		// TODO	a prototype exception is uncaught as soon as jQuery is loaded.
		//		noConflict() doesn't solve this.
		jQuery.noConflict();
		letsJQuery(jQuery);
	}
}

function letsJQuery($){

	// hiding the stuff of the project filter plugin http://www.redmine.org/plugins/project-filter
        $(".filter_fields, #project_filtering").hide();

	// rearrange/reformat the site
	$("#content h2").after('<div class="gm_clear"></div>');
	$("#content h2").after('<div id="gm_col4" class="gm_col gm_projects gm_float_left"></div>');
	$("#content h2").after('<div id="gm_col3" class="gm_col gm_projects gm_float_left"></div>');
	$("#content h2").after('<div id="gm_col2" class="gm_col gm_projects gm_float_left"></div>');
	$("#content h2").after('<div id="gm_col1" class="gm_col gm_projects gm_float_left"></div>');
	$("#content h2").after('<div style="display:none;" id="gm_wgs" class="gm_col gm_wgs gm_float_left"></div>');
	
	$("a:contains('Events')").closest("li").appendTo("#gm_col4");
	$("a:contains('Infrastructure')").closest("li").appendTo("#gm_col4");
	
	$("a:contains('Artsy')").closest("li").appendTo("#gm_col3");
	$("a:contains('Smartphone')").closest("li").appendTo("#gm_col3");
	
	$("a:contains('Hardware Projects')").closest("li").appendTo("#gm_col1");
	$("a:contains('Pure Code')").closest("li").appendTo("#gm_col2");
	$("a:contains('Pure Code')").text("Software Projects");
	

	$("a:contains('Openduino')").closest("li[class*='child']").appendTo("#gm_col1 ul");
	$("a:contains('SYN2cat BBB Kit')").closest("li[class*='child']").appendTo("#gm_col1 ul");
	// Fix: Openduino & SYN2cat BBB Kit are appended to Picotux too and are hidden by the
	//        following two lines
	// Update: none of these lines works properly. why?
	/*
	$("a:contains('Openduino')").eq(1).closest('li').hide();
	$("a:contains('SYN2cat BBB Kit')").eq(1).closest('li').hide();
	$("a:contains('Openduino')").hide();
	$("a:contains('SYN2cat BBB Kit')").hide();
	*/
	$("a:contains('Arduino')").closest("li").hide();

	// TODO: this is hard-coded. Use the original list items and change the classes instead.
	$("a:contains('BookOwners')").hide();//closest("li").appendTo("#gm_col3");
	$("a:contains('IT Admins')").hide();//.closest("li").appendTo("#gm_col3");
	var misc = '	<li class="root"><div class="root"><a class="project" href="#">Misc</a><div class="wiki description" style="display: none;"><p>Misc</p></div></div>\
						<ul class="projects ">\
						<li class="child"><div class="child"><a class="project " href="/projects/bookowners">BookOwners</a><div class="wiki description" style="display: none;"><p>To document who brought which book to the library, to be lent to the space.</p></div></div></li>\
						<li class="child"><div class="child"><a class="project " href="/projects/syn2catitadmins">syn2cat IT Admins</a><div class="wiki description" style="display: none;"><p>Report your issues and suggestions regarding the syn2cat IT infrastructure here</p></div></div></li>\
						<li class="child"><div class="child"><a class="project " href="/projects/cortana">Cortana</a><div class="wiki description" style="display: none;"><p>The Cortana project.</p></div></div></li>\
						<li class="child"><div class="child"><a class="project " href="/projects/radioshow">Lët\'z hack</a><div class="wiki description" style="display: none;"><p>The radio show project site. It contains information about how to organize and produce the show. Guidelines can be found how the technique works and what must be done in the studio to go on air or to prerecord a show.</p></div></div></li>\
						</ul>\
					</li>';
					
	$("#gm_col3").append(misc);
	
	// move the CleanSpace project
	var miscList = $("ul", $("a:contains('Misc')").closest("li"));
	$("a:contains('CleanSpace')").closest("li[class*='child']").appendTo(miscList);

	$("a:contains('Education Projects')")
		.parent() // div
		.removeClass("root")
		.addClass("child")
		.parent() // li
		.removeClass("root")
		.addClass("child")
		.appendTo(miscList);

	$("a:contains('CoI')").closest('li').appendTo("#gm_wgs");
	$("a:contains('Public relations and events')").text("CoI: PR & Events");

	$(".gm_col").wrapInner('<ul class="projects root"></ul>');

	// create the menu
	$("#content h2")
		.wrapInner('<a id="gm_btn_projects" href="#"/>')
		.append(' | <a id="gm_btn_wgs" href="#">Circles</a>');

	$("#content h2 a")
		.css("cursor", "pointer")
		//.css("text-decoration", "none")
		;
	
	$("#gm_btn_projects").click(function(event){
		event.preventDefault();
		$(".gm_col").hide();
		$(".gm_projects").show();		
	});
	$("#gm_btn_wgs").click(function(event){
		event.preventDefault();
		$(".gm_col").hide();
		$(".gm_wgs").show();
	});
	
	// clean up
	if( _projects_show_stars == 'true' )
		$("a[class*='my-project']")
			.removeClass("my-project")
			.append(" *");
	else
		$("a[class*='my-project']")
			.removeClass("my-project");
	
	$("a:contains('Toolset')").closest('li').hide();
	$("a:contains('Hackerspace general')").closest('li').hide();
	// doesn't work
	//$("li[class*='root'] a:contains('Cortana')").closest('li').hide();
	// does work
	$("a:contains('Cortana')").eq(1).closest('li').hide();
	$("a:contains('Lët'z hack')").eq(1).closest('li').hide();
	$("a:contains('p2s')").closest('li').hide();
	$("a:contains('simple tp_smapi frontend')").closest('li').hide();
	
	$("#content > ul").remove();
	
	// show/hide description
	$("a.project")
		.mouseenter(function(event){
				var desc = $(this).siblings(".description");
				desc.show();
				position_description(jQuery, desc, event);
			})		
		.mouseleave(function(event){
				$(this).siblings(".description").hide();
			})
		.mousemove(function(event){
				var desc = $(this).siblings(".description");
				position_description(jQuery, desc, event);
			})
		;
	$(".description").hide();

}

function position_description($, $tooltip, e){
	var x = e.pageX + 20; 
	var y = e.pageY + 8;
	
	$tooltip.css({left:x, top:y});
}