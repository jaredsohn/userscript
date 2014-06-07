// ==UserScript==
// @name           justintv InSameWindow
// @namespace      justin.tv
// @description    cleans the window and resizes the player to big size..
// @include        http://justin.tv/*
// @include        http://www.justin.tv/*
// @exclude        http://www.justin.tv/
// @exclude        http://www.justin.tv/directory/*
// @date           2009-07-10
// @version        0.5
// ==/UserScript==

// change for 0.5 - removed the new toolbar
// change for 0.4 - applied freshvp's comments; fixed black background; removed some more elements
// change for 0.3 - rename the play id


function removeMe(x)
{
	var y = document.getElementById(x);
	if (y != null)
		y.parentNode.removeChild(y);
	else
		GM_log('justin: cannot remove ' + x);
}

function setStyle(doc, element, new_style)
{
	element.setAttribute('style', new_style);
};


function main()
{
	var launch=window.document.body.getAttribute('justintvfixelaunch');
	if (launch) { return; }
	window.document.body.setAttribute('justintvfixelaunch','true');

	removeMe('ChanHeader');
	removeMe('ChanHeader_holder');
	removeMe('channel_header');
	removeMe('channel_lists');
	removeMe('channel_stats_container');
	removeMe('channel_tabs_container');
	removeMe('ChanUnderChat');
	removeMe('chat');
	removeMe('companion_ad');
	removeMe('dvr');
	removeMe('footer');
	removeMe('google_ads_iframe_ChanHeader');
	removeMe('google_ads_iframe_ChanUnderChat');
	removeMe('gray_bar');
	removeMe('header');
	removeMe('next_live_channel');
	removeMe('PopUnderChan');
	removeMe('PopUnderChan_holder');
	removeMe('right_column');
	removeMe('site_header');
	removeMe('status');
	removeMe('show_survey');
	removeMe('subplayer_buttons');

	var live_site_player_flash = document.getElementById('live_site_player_flash');
	if (live_site_player_flash != null)
	{
		live_site_player_flash.setAttribute("width", 950);
		live_site_player_flash.setAttribute("height", 535);
	}
	else
	{
		GM_log('no live_site_player_flash');
	}

	GM_addStyle("#page_wrapper {color: #FFFFFF !important; background: #000000 !important; min-width: 500px; padding: 30px 0px; line-height: 22px !important;}");
	GM_addStyle("#left_column {width: 950px;}");
	setStyle(window.document,document.evaluate('/HTML[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: black;background-color: black;",null,null);
	setStyle(window.document,document.getElementById('page_wrapper'),"color: black;background: #000000;",null,null);
	setStyle(window.document,document.getElementById('body_wrapper'),"color: black;background: #000000;",null,null);
	setStyle(window.document,document.getElementById('left_column'),"color: black;background: #000000;width: 950px;",null,null);
	setStyle(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[4]/DIV[7]/DIV[1]/DIV[1]/P[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"color: white;",null,null);

}

main();
