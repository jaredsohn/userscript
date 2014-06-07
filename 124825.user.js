// ==UserScript==
// @name		gisToSugarParser
// @namespace	sugarcrm
// @description	Добавлятор фирм в sugarcrm
// @include		http://maps.2gis.ru/*
// ==/UserScript==
if (typeof GM_GP_log == 'undefined') function GM_GP_log(str) {
	if (typeof console != 'undefined' && typeof console.log != 'undefined') {
		console.log(str);
	}
}
var pint = window.setInterval(GM_GP_init_links, 3000);

function GM_GP_init_links(scope) {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		return;
	}
	
	if (unsafeWindow.jQuery('.dg-firm-bullet:not(.gisinited)').length) unsafeWindow.jQuery('.dg-firm-bullet:not(.gisinited)').each(function() {
		var link;
		link = unsafeWindow.jQuery('<a href="javascript:void(0)" title="Добавить в Шугу"><span style="text-decoration:none;color:#98C01F;display:inline-block;width:20px;height:24px;font-size:20px;font-weight:bold;text-indent:-2px;" class="gisplus">+</span></a>');
		link.css({display:'inline-block',padding:'0',textDecoration:'none',margin:'6px 0 0 0'});
		link.bind('click', GM_GP_add_firm);
		unsafeWindow.jQuery(this).addClass('gisinited');
		unsafeWindow.jQuery(this).append(link);
	});
	
	if (unsafeWindow.jQuery('.dg-firm-popup h2 a:not(.gisinited)').length) unsafeWindow.jQuery('.dg-firm-popup h2 a:not(.gisinited)').addClass('gisinited').attr('title', 'Добавить в Шугу').bind('click', GM_GP_add_firm).prepend('<span style="color:#98C01F;display:inline-block;width:14px;height:14px;font-size:14px;font-weight:bold;text-decoration:none;" class="gisplus">+</span>');
	
}
function GM_GP_alert(text) {
	if (!unsafeWindow.jQuery('.dg-popup .dg-popup-gm_gp_mess').length) {
		unsafeWindow.jQuery('.dg-popup').append('<div class="dg-popup-gm_gp_mess" style="color:#FF0805">'+text+'</div>');
	}
	window.vm.lightbox.show(".dg-popup-gm_gp_mess", 400);
}
GM_GP_cur_link = false;
function GM_GP_add_firm() {
	var link, firma, data;
	data = {};
	GM_GP_cur_link = unsafeWindow.jQuery(this);
	firma = GM_GP_cur_link.parents('.dg-firm:eq(0)');
	if (!firma.html()) {
		firma = GM_GP_cur_link.parents('.dg-firm-popup:eq(0)');
	}
	
	data.city		= unsafeWindow.jQuery.trim(unsafeWindow.jQuery('.dg-location:eq(0)').text());
	data.name		= unsafeWindow.jQuery.trim(unsafeWindow.jQuery('.dg-firm-title:eq(0)',		firma).text());
	data.address	= unsafeWindow.jQuery.trim(unsafeWindow.jQuery('.dg-firm-address:eq(0)',		firma).text());
	data.rubrics	= [];
	unsafeWindow.jQuery('.dg-firm-subcats li',	firma).each(function() {data.rubrics.push(unsafeWindow.jQuery.trim(unsafeWindow.jQuery(this).text()).replace(/^,/,'').replace(/,$/,''));});
	data.rubrics	= data.rubrics.join(',');
	data.phone		= [];
	unsafeWindow.jQuery('.dg-row-phone',			firma).each(function() {data.phone.push(unsafeWindow.jQuery.trim(unsafeWindow.jQuery(this).text()));});
	data.phone		= data.phone.join(',');
	data.site		= unsafeWindow.jQuery.trim(unsafeWindow.jQuery('.dg-row-website:eq(0)',		firma).text());
	data.fax		= unsafeWindow.jQuery.trim(unsafeWindow.jQuery('.dg-row-fax:eq(0)',			firma).text());
	data.mail		= unsafeWindow.jQuery.trim(unsafeWindow.jQuery('.dg-row-email:eq(0)',			firma).text());
	data.worktime	= unsafeWindow.jQuery.trim(unsafeWindow.jQuery('.dg-work-time:visible:eq(0)',	firma).text()).replace('Сегодня','');
	unsafeWindow.jQuery('.gisplus', GM_GP_cur_link).css('background', 'url("http://crm.adlaim.ru/modules/gp_tasks/ajax-loader.gif") no-repeat 50% 50%');
	try {
		unsafeWindow.jQuery.getJSON('http://crm.adlaim.ru/index.php?module=gp_tasks&action=prelim_contact&to_pdf=1&json&callback=?', data, GM_GP_add_firm_answer)
		.error(function() {GM_GP_alert('Вам необходимо <a href="http://crm.adlaim.ru/index.php" target="_blank">войти в шугу</a>, чтобы можно было добавлять фирмы.');});
		unsafeWindow.jQuery('.gisplus', GM_GP_cur_link).css('background-image','');
	} catch (e) {
		
	}
	return false;
}
function GM_GP_add_firm_answer(data) {
	if (typeof data.error != 'undefined') GM_GP_alert(data.error);
	else {
		unsafeWindow.jQuery('.gisplus', GM_GP_cur_link).html('&nbsp;').css('background-image','url("http://crm.adlaim.ru/modules/gp_tasks/ok.gif")');
	}
	
}