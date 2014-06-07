// ==UserScript==
// @name           WAM
// @namespace      eCitizenScyld
// @description    error
// @include        http://www.erepublik.com/*/economy/myCompanies
// ==/UserScript==

if (document.location.href.match(/http:\/\/www.erepublik.com\/.+\/economy\/myCompanies/)) {

(function(){

    var p = unsafeWindow;
    
    if (window.navigator.vendor.match(/Google/)) {
    
        var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		p = div.onclick();
    
    };
    
    var jQuery = p.jQuery;

    var current_health = Math.floor((parseInt(jQuery('strong#current_health').text()) + parseInt(jQuery('big.tooltip_health_limit').text().split(' ', 1))) / 10);

    var table = jQuery(".area_options:first");
    table.addClass('area_controls');
	table.html('<strong title="Select and Work">S&W</strong>'
					+ '<div>'
					+ '<a href="javascript:;" onclick="jQuery(\'.owner_work.active\').trigger(\'click\');jQuery(\'a[title=Work as Manager].owner_work:not(.active):lt(' + current_health + ')\').trigger(\'click\');jQuery(\'#start_production\').trigger(\'click\');" class="grey_plastic left_pos" title="Select and Work up to ' + current_health + ' time/s"><img src="http://www.erepublik.com/images/modules/manager/add_icon.png" alt=""></a>'
					+ '<a href="javascript:;" onclick="jQuery(\'.owner_work.active\').trigger(\'click\')" class="grey_plastic right_pos" title="Deselect All"><img src="http://www.erepublik.com/images/modules/manager/remove_icon.png" alt=""></a>'
					+ '</div>');

})();

}
