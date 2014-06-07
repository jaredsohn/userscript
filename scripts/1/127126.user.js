// ==UserScript==
// @name            Select all Manager
// @namespace       http://userscripts.org/users/424220/scripts
// @author          SUPERGADGET
// @version         1.2
// @uso:version     1.2
// @include         http://www.erepublik.com/*/economy/myCompanies
// @description     Erepublik script to select/deselect all checks "Work as Manager"
// ==/UserScript==

if(document.location.href.match(/http:\/\/www.erepublik.com\/.+\/economy\/myCompanies/)) {
(function(){
	var p;
	if(window.opera || window.navigator.vendor.match(/Google/)) {
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		p = div.onclick();
	}
	else
	{
		p = unsafeWindow;
	}
	var jQuery = p.jQuery;

	var table = jQuery(".area_options:first");
	table.addClass('area_controls');
	table.html('<strong>Man</strong>'
			+ '<div>'
			+ '<a href="javascript:;" onclick="jQuery(\'.owner_work:not(.active)\').trigger(\'click\')" class="grey_plastic left_pos" title="Select All"><img src="http://www.erepublik.com/images/modules/manager/add_icon.png" alt=""></a>'
			+ '<a href="javascript:;" onclick="jQuery(\'.owner_work.active\').trigger(\'click\')" class="grey_plastic right_pos" title="Deselect All"><img src="http://www.erepublik.com/images/modules/manager/remove_icon.png" alt=""></a>'
			+ '</div>');
})();
}