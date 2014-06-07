// ==UserScript==
// @name           Quake Live Advanced Server Filter
// @version        1.2.0
// @namespace      http://userscripts.org/scripts/show/43943
// @description    blacklist undesired servers; fade out empty ones
// @include        http://www.quakelive.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=43943&show
// ==/UserScript==

// You don't have to edit this code anymore, use the User Script Commands menu!
function get_blacklist() { return GM_getValue("blacklist", "^(Antarctica|Mars)\\b"); }

var blacklist = new RegExp( get_blacklist() );

GM_registerMenuCommand("QLASF: edit blacklist", function () {
   input = prompt( 'Enter blacklist Regular Expression (no "/" at ends):', get_blacklist() );
   if ( typeof input == "string" ) {
      GM_setValue("blacklist", input);
      blacklist = new RegExp(input);
   }
});       


log = ( typeof console == "object" && typeof console.log == "function" && console.log ) ||
   ( typeof GM_log == "function" && GM_log ) ||
   function (){};


function get_jQuery() {
   if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(get_jQuery,100); }
   else { $ = unsafeWindow.jQuery; main(); }
}
get_jQuery();



function main() {
   $(document).bind('DOMNodeInserted', function(e) {
      t = $(e.target);
      if ( t.hasClass("qlv_pls_box") || t.hasClass("qlv_pls_bestpick_box") ) {
         if ( $("#ctrl_filter_location").val() == "any" ) {
            loc = t.find(".location_text").text();
            if ( loc.match(blacklist) ) { t.remove(); return; }
         }
         t.bind("DOMSubtreeModified", match_changed).trigger("DOMSubtreeModified");
      }
   });
}



function match_changed() {
   playerstext = $(this).find(".players").text();
   gametypetext = $(this).find(".gametype").text();
   currentplayers = Number(playerstext.split("/")[0]);
   maxplayers = Number(playerstext.split("/")[1]);
   if ( currentplayers == 0 ) { op = 0.333; }
   else {
      if ( currentplayers >= maxplayers ) { op = 0.666; }
      else {
         if ( ( gametypetext == "Duel" ) && ( currentplayers >= 2 ) ) {
            op = 0.667;
         }
         else { op = 1.0; }
      }
   }
   $(this).css("opacity", op);
}
