// ==UserScript==
// @name        Full screen Virgin TV listings
// @description Stretches the Virgin Media listings at tv.virginmedia.com to use the full browser.
// @namespace   http://userscripts.org/users/wadewomersley
// @include     http://tv.virginmedia.com/vtvapp/epg.do
// @version     2
// @grant       none
// @run-at      document-end
// @require     http://userscripts.org/scripts/source/45988.user.js
// ==/UserScript==

/*USP.theScriptName = 'Full screen Virgin TV listings';
USP.init({theName:'showHD', theText:'Show HD on load?', theDefault:false});
GM_registerMenuCommand('Preferences for ~'+USP.theScriptName+'~', USP.invoke);*/
function reformatPage()
{
	$('.grid_wrapper').height(window.innerHeight - $('.grid_wrapper')[0].offsetTop);
	window.displayAreaHeight = $('.grid_wrapper').height();
	window.displayAreaWidth = window.innerWidth - 200;
	/*if(window.processThreadish)
		processThreadish();*/
}

$('#middle .channels_shade_right, #middle .channels_shade_leftbottom, #middle .channels_shade_rightbottom, #middle .channels_shade_bottom, #VM-header, #VM-header-adwrap, #middle .channel-header, #VM-footer-legal-strip-wrap').remove();
$('#wrap-middle, #middle, #vm_partner_wrapper, #middle .whole, #middle .search_panel, #middle .navigation, #grid_wrapper, #genreTitles').attr('style', 'width: 100% !important;');
$('#grid_wrapper').css('border', '0');
$('#controller').css({'left': 'auto', 'right': '50px'});
$('#loading').css({'height': '100%', 'width': '100%'});
$('#loading_animation').css({'left': '50%', 'margin-left': '-70px'});
$('#loading_message').css({'left': '50%', 'margin-left': '-200px'});
$('#middle .channels_shade_left').css('height', '100%');
$('body').css('margin-top', 0);
document.documentElement.style.overflow = 'hidden';
$('body').attr('onResize', '');
window.addEventListener('resize', reformatPage, true);
reformatPage();

function checkForSiteHeight()
{
    if(window.siteHeight === undefined)
    {
        window.setTimeout(checkForSiteHeight, 100);
		return;
    }
	
	window.siteHeight = function() { return $('.grid_wrapper').height(); };
	
	if(USP.getValue('showHD') === true && document.getElementById('hd_button').className.indexOf('_on') == -1)
		reorderHD();
	
	reformatPage();
}
checkForSiteHeight();