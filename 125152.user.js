// ==UserScript==
// @name           vk.com hide banners
// @namespace      *vk.com*
// @description    hides vk.com banner
// @include        *vk.com*
// ==/UserScript==
window.hideBanners = function() {
	var i = 0; 
	var test = '';
	for (i = 0; i <= ban_mass.length-1; i++) {
		test = document.getElementById(ban_mass[i]);
		if ((test != null) && (test.style.display != 'none')) test.style.display = 'none';
	}
	
	for (i = 0; i <= divs.length-1; i++) {
		var za = document.getElementById(divs[i]);
		if (za != null) za = za.getElementsByTagName('a');
		if (za != null) {
			for (i = 0; i <= za.length-1; i++) {
				if (((za[i].className == 'ad_box') || (za[i].className == 'ad_box_new')) && (za[i].style.display != 'none')) za[i].style.display = 'none';
			}
		}
	}
	
	setTimeout(function() { hideBanners(); },500);
}

window.ban_mass = new Array('left_ads','banner1','banner2',/*'left_blocks',*/'ad_help_link','ad_help_link_new');
window.divs = new Array('sideBar','side_bar','left_blocks');

