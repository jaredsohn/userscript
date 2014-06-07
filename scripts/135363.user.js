// ==UserScript==
// @name        Left Bar
// @namespace   GuardianPony
// @include     http://*.ponychan.net/chan/*/
// @include     http://*.ponychan.net/chan/*.html
// @include     http://*.ponychan.net/chan/*.html#*
// @version     1.0
// ==/UserScript==
function leftBar() {
	$$ = jQuery.noConflict();
	//if (getCookie("vertnavbar") === '1') {
		if (getCookie('vertnavbar') === "") { set_cookie('vertnavbar', '1', 365); }
		if (getCookie('pcstyle') === 'applejack') {
		  $$('div.navbar').css('paddingLeft', '0px');
		  $$('.darkbar a').css({'margin':'auto', 'paddingLeft':'0px', 'paddingRight':'4px'});
		  $$('.navbarboard, .adminbaritem').css('margin', '0 1px');
		}
		$$('#bodywrap1').css('marginTop', '26px');
		$$('.navbar')[0].setAttribute('style', 'position:relative; height: 100%; top: 27px;');
		$$('.navbarboard').css({'float':'left', 'left':'0', 'width':'4.4em', 'height':'1%', 'font-size':'81%'});
		$$('.adminbar, .darkbar, .adminbaritem').css({'left':'0'});
		$$('.adminbar, .adminbaritem').css('background', 'inherit', 'important');
		$$('.adminbar').css('right', 'auto');
		$$('.adminbaritem').css({'height':'9px'});
		$$('#verytopbar').css({'width':'4em', 'height':'100%'});
		$$('#bodywrap1').css('padding-left', '4em');
		
		
		$$('.adminbar').css('width', $$(window).width() + 'px');
	//};
}
function loadjQ(s)
{
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js");
	script.addEventListener('load', function() {
	var script = document.createElement("script");
	script.textContent = "(" + s.toString() + ")();";
	document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}
loadjQ(leftBar);