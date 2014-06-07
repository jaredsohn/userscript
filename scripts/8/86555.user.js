// ==UserScript==
// @name           FBSelectAll
// @namespace      fb.select.all
// @description    A grease-monkey script that enables users to select all friends in their facebook account.
// @runat		   document-end
// @match        http://www.facebook.com/social_graph.php*
// @match        https://www.facebook.com/social_graph.php*
// @match        http://www.facebook.com/groups/edit.php*
// @match        https://www.facebook.com/groups/edit.php*
// @version 1.1
// ==/UserScript==

function loadJquery(callback)
{
	var jquery = document.createElement("script");
	jquery.setAttribute("type", "text/javascript");
	jquery.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js");
	document.body.appendChild(jquery);

	jquery.addEventListener('load', function () {	
        var script = document.createElement("script");
		
        script.textContent = callback;
        document.body.appendChild(script);
    }, false);
}

function init_main()
{
	window.fb_jQuery = $.noConflict();
	fb_jQuery('#filters').append('<a id="fb_select_all_prn" style="display: block;margin: -1px;padding: 6px 8px 6px;position: relative;">Select All Friends</a>');	
	fb_jQuery('#fb_select_all_prn').toggle(
		function ()
		{
			fb_jQuery('#fb_select_all_prn').text("Deselect All Friends");
			fb_jQuery("#all_friends li:not(.selected) a").click();
		},
		function ()
		{
			fb_jQuery('#fb_select_all_prn').text("Select All Friends");
			fb_jQuery("#all_friends li.selected a").click();
		}
	);
}
loadJquery(init_main + "init_main();");