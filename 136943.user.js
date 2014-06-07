// ==UserScript==
// @name           UPC TV Gids Fixer
// @namespace      UPC TV Gids Fixer
// @description    UPC TV Gids Fixer
// @version        2
// @include        *://tvgids.upc.nl/TV/
// @include        *://tvgids.upc.nl/TV/*
// @grant          GM_addStyle
// ==/UserScript==

(function(){
	
	GM_addStyle("							\
											\
/* remove header */							\
#header					 					\
{											\
	display: none !important;				\
}											\
											\
/* clean up */								\
#userpanel									\
{											\
	padding: 2px 7px !important;			\
}											\
											\
/* clean up */								\
#tvguide_toolbox_top						\
{											\
	padding: 5px 0 0 0 !important;			\
}											\
											\
/* fill grid */								\
#slot_container, 							\
#current_time_indicator 					\
{											\
	padding-bottom: 165px !important;		\
}											\
											\
/* remove recording button */				\
#grid_menu_set_booking	 					\
{											\
	display: none !important;				\
}											\
											\
	");
		
	window.setTimeout(function(){
		location.href = location.href;
	}, 25 * 60 * 1000);

})();



//*** STATISTICS ***//
// Chars (exclude spaces): 761
// Chars (include spaces): 1.183
// Chars (Chinese): 0
// Words: 160
// Lines: 61