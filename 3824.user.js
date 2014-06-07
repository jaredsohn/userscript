
/*
 print_r javascript functionaility extension
 version 0.1 BETA
 04-05-2006
 Copyright (c) 2006, Chris McKeever
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 I try to monitor the Grease Monkey Mail List.
 http://www.mozdev.org/mailman/listinfo/greasemonkey
 Please post questions/comments and suggestions.



 This is based on the print_r.js work done by Jason Patterson, http://www.cableaz.com/print_r.php
 This Grease Monkey script is very tempermental - as it has been known to interfere with 
 page rendering (GMAIL) when active.  It is suggested to only initialize this script
 when you are interested in browsing the pages javascript object model.

 Please see the print_r.jss file (referenced directly below) for known bugs


 You will be prompted for your print_r.js and print_r.css.
 I would apprecitate it if you put both these files on a server under your own control
 http://www.r2unit.com/greasemonkey/print_r.js or http://www.cableaz.com/print_r.js (maintained)
 http://www.r2unit.com/greasemonkey/print_r.css

 Once installed properly - a 'PRINT_R Evaluate' and 'PRINT_R Load' Grease Monkey user script menu item will appear
 
 'PRINT_R Load'
 Loads the print_r.js remote script file into the head of the page, allowing full access to the 
 js object browsing. 

 'PRINT_R Evaluate' 
 ** needs to be run after the print_r.js has been loaded via 'PRINT_R Load' **
 It will prompt you for the parent and sub object (can be the same).
 You must know at least one object within the page you want to investigate.
 From there you can navigate the objects via the pop-up window.


 --------------------------------------------------------------------

 This is a Greasemonkey user script.

 To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
 Then restart Firefox and revisit this script.
 Under Tools, there will be a new menu item to "Install User Script".
 Accept the default configuration and install.

 To uninstall, go to Tools/Manage User Scripts,
 select "Google Local View Based Refresh", and click Uninstall.

 --------------------------------------------------------------------

*/

// ==UserScript==
// @name            Javascript print_r
// @namespace       http://r2unit.com/greasemonkey
// @description     Provides javascript object browsing
// @include         http*
// ==/UserScript==


GM_registerMenuCommand('PRINT_R Evaluate',print_r);

function print_r(){

	window.location.href = "javascript:(function(){ "
		+ " var prnt_obj=prompt('Please enter a document object','document');"
		+ " var sub_obj=prompt('Please enter a sub object','document');"
                + " if (!document.eval(prnt_obj).print_r) { alert('PRINT_R not loaded\n or \"' + prnt_obj + '\" is not a valid object reference');return;}  "
		+ " sub_obj = '\"' + sub_obj + '\"'; scroll(0,0);"
		+ " document.eval(prnt_obj).print_r(sub_obj);"
		//+ " gApplication.print_r('getMarker');"
	+ "  })();";

}

GM_registerMenuCommand('PRINT_R Load',load_print_r);
function load_print_r(){

	window.location.href = "javascript:(function(){ "
                + " var oStyle = document.createElement('LINK');"
                + " oStyle.id = 'pr_style';"
                + " oStyle.rel = 'stylesheet';"
                + " oStyle.href = '" + loc_css  + "';"
                + " document.documentElement.firstChild.appendChild(oStyle);"

                + " var linkJS = document.createElement(\"script\");"
                + " linkJS.setAttribute(\"type\",\"text/javascript\"); "
                + " linkJS.src = '" + loc_js  + "';"
                + " document.getElementsByTagName('head').item(0).appendChild(linkJS);"

                + "  })();";

	print_r();

}


// allow the modification of the css and js locations
// should only run the first time
// I would rather not have these files pulled from my server -
var loc_js = GM_getValue('loc_js');
var loc_css=GM_getValue('loc_css');

if (!loc_js || !loc_css) alert('You will be prompted once to set the print_r support files\n\n' 
			+ 'Please be curteous and host these files on your own resources.');

if (!loc_js) {
        loc_js=prompt('What is the print_r javascript location','http://www.r2unit.com/greasemonkey/print_r.js');
	GM_setValue('loc_js',loc_js);
	window.location.reload;
}

if (!loc_css) {
        loc_css=prompt('What is the print_r css location','http://www.r2unit.com/greasemonkey/print_r.css');
	GM_setValue('loc_css',loc_css);
	window.location.reload;
}
