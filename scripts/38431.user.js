// ==UserScript==
// @name           Google Reader - Expanded per Feed
// @namespace      http://kossib.foxnet.pl
// @description    Remembers expanded or list view on per feed basis.
// @include        http*://www.google.tld/reader/view/*
// ==/UserScript==

/*

 Change log :
--------------

v0.0.1: Increased the time event waits to fire. (this partially solves the duplicate items bug)
v0.0.0: First release.

*/

var kfp_grepf_current_feed = '';

function kfp_grepf_init() 
{
	// loaded ?
	kfp_grepf_body = document.getElementsByTagName('body')[0];
	if(/\bloaded\b/.test(kfp_grepf_body.className)) 
	{
		kfp_grepf_id_expanded_view = 'view-cards';
		kfp_grepf_id_list_view = 'view-list';
		kfp_grepf_id_chrome_title = 'chrome-title';

		document.getElementById(kfp_grepf_id_expanded_view).addEventListener('click', kfp_grepf_save, false);
		document.getElementById(kfp_grepf_id_list_view).addEventListener('click', kfp_grepf_save, false);

		document.getElementById(kfp_grepf_id_chrome_title).addEventListener('DOMNodeInserted', kfp_grepf_nodeinserted, false);

		kfp_grepf_load();
	}
   	else
	{
		// not loaded try later
		setTimeout(kfp_grepf_init,100);
	}
}
function kfp_grepf_nodeinserted() 
{
	if (kfp_grepf_current_feed == document.location.href)
		return;
	kfp_grepf_current_feed = document.location.href;
	//must be done using timer, GM_getValue is not working inside this event
	setTimeout(kfp_grepf_load, 500);
}

function kfp_grepf_load() 
{
	kfp_grepf_saved = GM_getValue(document.location, '');
	if (kfp_grepf_saved != ''
		&& kfp_grepf_saved != kpf_grepf_selected()) 
	{
		kfp_grepf_exp = document.getElementById(kfp_grepf_saved);
		kfp_grepf_evt = document.createEvent('MouseEvents');
		kfp_grepf_evt.initEvent( 'click', true, true );
		kfp_grepf_exp.dispatchEvent(kfp_grepf_evt);
	}
	else 
	{
		kfp_grepf_save();
	}
}

function kfp_grepf_save() 
{
   GM_setValue(document.location, kpf_grepf_selected());
}

function kpf_grepf_selected()
{
	kfp_grepf_exp = document.getElementById(kfp_grepf_id_expanded_view);
	return (/\blink-selected\b/.test(kfp_grepf_exp.className)) 
				? kfp_grepf_id_expanded_view 
				: kfp_grepf_id_list_view;
}

kfp_grepf_init();
