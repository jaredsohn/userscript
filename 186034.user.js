// ==UserScript== 
// @name 	MyVideo.Az BetteR LiveTV
// @description 	Better LiveTV pages on MyVideo.Az. Remove advertisements and optimize TV pages
// @include http://*.myvideo.az/c/livetv*
// @include http://myvideo.az/c/livetv*
// @include http://*.myvideo.az/?*act=dvr*
// @include http://myvideo.az/?*act=dvr*
// @version 	1.0
// @author 	Volkan K.
// @run-at 	document-end
// ==/UserScript==

if ('undefined' == typeof __MYVIDEO_AZ_PAGE_SCOPE_RUN__) {
	(function page_scope_runner() {
		// If we're _not_ already running in the page, grab the full source
		// of this script.
		var my_src = "(" + page_scope_runner.caller.toString() + ")();";

		// I need to remove any extras added by Tampermonkey etc.
		var myregexp = /\/\/ ?### ?START_POINT ?###.*([\w\W]*)\/\/ ?### ?FINISH_POINT ?###/i;
		var match = myregexp.exec(my_src);
		if (match != null) {
			result = match[1];
			my_src = result;
		} else {
			result = "";
		}

		// Create a script node holding this script, plus a marker that lets us
		// know we are running in the page scope (not the Greasemonkey sandbox).
		// Note that we are intentionally *not* scope-wrapping here.
		var script = document.createElement('script');
		script.setAttribute("type", "text/javascript");
		script.textContent = "var __MYVIDEO_AZ_PAGE_SCOPE_RUN__ = true;\n" + my_src;

		// Insert the script node into the page, so it will run, and immediately
		// remove it to clean up.  Use setTimeout to force execution "outside" of
		// the user script scope completely.
		setTimeout(function() {
			(document.body || document.head || document.documentElement).appendChild(script);
			(document.body || document.head || document.documentElement).removeChild(script);
		}, 0);
	})();

	// Stop running, because we know Greasemonkey actually runs us in
	// an anonymous wrapper.
	return;
}

// ###START_POINT###  anything before this line will not be executed.

jQuery.fn.isAfter = function(sel){
  return this.prevAll(sel).length !== 0;
}
jQuery.fn.isBefore= function(sel){
  return this.nextAll(sel).length !== 0;
}

if ( window.location.pathname.match('/c/livetv') ) {
// we are in livetv mainpage, remove ads and optimize display.
jQuery("div.vd_main_medium_cont").remove();

current_mainc_width=jQuery("div.vd_main_cont").width();
if (current_mainc_width<990){
	jQuery("div.vd_main_cont").width("1000");
}

jQuery("div.livetv_grid_item_holder.last").removeClass( "last" );

//jQuery("div.livetv_tvs_grid > div.programm_holder_wrapper, div.livetv_tvs_grid > div.clear:not(:last-child)").remove();

jQuery("div.livetv_tvs_grid > div.programm_holder_wrapper, div.livetv_tvs_grid > div.clear")
.each(function(){
	if ($(this).isBefore("div.livetv_grid_item_holder")){ 
		$(this).remove();
	}
});

var myregexp = /T[uü]rkiy/i;
jQuery( "div.mv_videos_container_title" )
.filter(function( index ) {
	return myregexp.test(this.innerHTML);
})
.parents("div.mv_videos_container").each(function(){
	$(this).prependTo($(this).parent());
});

} else if ( window.location.search.match('act=dvr') ) {
// we are in DVR watch page, remove ads.
jQuery("div.mv_dvr_banner_container").remove();
my_flashvars=jQuery("object#dvr_player > param[name='flashvars']")[0];
if (my_flashvars!=null){
	my_flashvars.setAttribute("value", my_flashvars.getAttribute("value").replace(/([?&])vaspAd=[^&]*&?/ig, "$1"));
}
my_dvr_player=jQuery("object#dvr_player")[0];
if (my_dvr_player!=null){
	backup_src=my_dvr_player.getAttribute("data");
	my_dvr_player.setAttribute("data","");
	my_dvr_player.setAttribute("data",backup_src);
}
}

// ###FINISH_POINT###  anything beyond this line will not be executed.
