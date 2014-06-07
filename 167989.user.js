// ==UserScript==
// @name        Steam Community: Background Preview
// @description Preview Profile Background 
// @include     http://steamcommunity.com/sharedfiles/filedetails/*
// @include     http://steamcommunity.com/market/listings/753/*
// @include     http://steamcommunity.com/id/*
// @include     http://steamcommunity.com/profile/*
// @version     0.2.0
// ==/UserScript==

(function() {

function main () {

$J.bgps = {};

$J.bgps.applyBg = function(bg){
	$J('.profile_background_holder').remove();
	$J('.profile_background_holder_content').remove();
	$J('.no_header').removeClass('has_profile_background');
	$J('.profile_content').removeClass('has_profile_background');

	if (bg !== '') {
		$J('.no_header').addClass('has_profile_background');
		$J('.profile_content').addClass('has_profile_background');
		$J('.no_header').prepend('<div class="profile_background_holder"><div class="profile_background_image" style="background-image: url('+ bg +');"></div></div>');
		$J('.profile_content').prepend('<div class="profile_background_holder_content"><div class="profile_background_overlay_content"></div><div class="profile_background_image_content " style="background-image: url('+ bg +');"></div></div>');
	}
};

$J.bgps.setBG = function(){
	if ($J('.market_listing_largeimage img').length === 0) {
		return false;
	}

	var bg = $J($J('.market_listing_largeimage img')[0]).attr('src').replace('/360fx360f','');

	if ($J('#headerUserAvatarIcon').length === 0) {
		return false;
	}
	var profile = $J('#headerUserAvatarIcon').parent().attr('href');

	localStorage.setItem(profile, bg);

	window.location.href = profile;
};
$J.bgps.setBGWS = function(){
	if ($J('#ActualMedia').length === 0) {
		return false;
	}

	var bg = $J('#ActualMedia').parent().attr('href');

	if ($J('#headerUserAvatarIcon').length === 0) {
		return false;
	}
	var profile = $J('#headerUserAvatarIcon').parent().attr('href');

	localStorage.setItem(profile, bg);

	window.location.href = profile;
};

$J.bgps.clearBG = function () {
	var profile = $J('#headerUserAvatarIcon').parent().attr('href');
	localStorage.removeItem(profile);
	window.location.reload();
};

if ($J('.btn_profile_action').length > 0 && $J('.btn_profile_action').attr('href').split('/').pop() === "edit") {
	var profile = $J('#headerUserAvatarIcon').parent().attr('href');
	var bg = localStorage.getItem(profile);

	if(bg !== null){
		$J('.profile_header_actions').append('<span class="btn_profile_action btn_medium" onclick="$J.bgps.clearBG();"><span>Clear Preview</span></span>');
		$J.bgps.applyBg(bg);
	}
}

if ($J('#largeiteminfo_item_type').length > 0 && $J('#largeiteminfo_item_type').html().split(' ').pop() == 'Background') {
	$J('.item_desc_description').append('<a href="javascript:$J.bgps.setBG();" class="item_market_action_button item_market_action_button_green"><span class="item_market_action_button_edge item_market_action_button_left"></span><span class="item_market_action_button_contents">	Preview	</span><span class="item_market_action_button_edge item_market_action_button_right"></span><span class="item_market_action_button_preload"></span></a>');
}

if ($J('.apphub_sectionTabs .active').length > 0) {
	(function() {
		var url_arr = $J('.apphub_sectionTabs .active').attr('href').split('/');
		url_arr.pop();
		var section = url_arr.pop();
		if (section == 'images' || section == 'screenshots') {
			$J('.workshopItemTitle').append(' <a href="javascript:$J.bgps.setBGWS();" class="general_btn" style="width: 167px; font-size: 12px; display: inline-block;">Preview as Profile Background</a>');
		}
	})();
}

}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ main +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

})();