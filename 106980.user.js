// ==UserScript==
// @name           Mafia Wars Auto iFrame
// @namespace      http://userscripts.org/scripts/show/00000
// @description    Mafia Wars auto iframe
// @include        http://facebook.mafiawars.com/mwfb/remote/html_server.php*
// @include        http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include        http://facebook.mafiawars.com/mwfb/xd_receiver.htm
// @include        http://apps.facebook.com/inthemafia/*
// @include        http://apps.new.facebook.com/inthemafia/*
// @include        http://www.facebook.com/connect/uiserver*
// @exclude        http://mwfb.zynga.com/mwfb/*#*
// @exclude        http://facebook.mafiawars.com/mwfb/*#*
// @exclude        http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude		  http://facebook.mafiawars.com/mwfb/iframe_proxy.php*
// @version        17.07.2011
// ==/UserScript==

refresh_timer = false;
javascript:(function(){
	//begin unframe code
	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/m.mafiawars.com/.test(document.location)) {
		window.location.href = document.location+'?iframe=1';
	}
	else if (/apps.facebook.com.inthemafia.$/.test(document.location)) {
		//go to insta-unframed to avoid popup problems
		window.location.href = 'http://facebook.mafiawars.com/mwfb/index2.php?skip_req_frame=1&mwcom=1';
	}
	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
		//Credits to Toenailsin for this new fix
		for (var i = 0; i < document.forms.length; i++) {
			if (/canvas_iframe_post/.test(document.forms[i].id) && document.forms[i].target == "mafiawars") {
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
		}
	}
	else if (document.getElementById('some_mwiframe')) {
		// new mafiawars.com iframe
		window.location.href = document.getElementById('some_mwiframe').src;
		return;
	}
	else {
		document.body.parentNode.style.overflowY = "scroll";
		document.body.style.overflowX = "auto";
		document.body.style.overflowY = "auto";
		try {
			document.evaluate('//div[@id="mw_city_wrapper"]/div', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).style.margin = "auto";
			if (typeof FB != 'undefined') {
				FB.CanvasClient.stopTimerToSizeToContent;
				window.clearInterval(FB.CanvasClient._timer);
				FB.CanvasClient._timer = -1;
			}
			document.getElementById('snapi_zbar').parentNode.parentNode.removeChild(document.getElementById('snapi_zbar').parentNode);

		} catch (fberr) {}
		//Revolving Revolver of Death from Arun, http://arun.keen-computing.co.uk/?page_id=33
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
		
		//fix for the broken popups when unframing FB
		function fix_block() {
			setTimeout(function(){
				//Thanks to Shih-Yuan Hsu for hints on how to optimize this
				$('#popup_fodder div:first').find("div[id^='pop_b']").each(function() {
					if (!$(this).attr('opened')) {
						$(this).css('display','block');
						$(this).attr('opened','yes');
					}
				});
			},500);
		}
		if (/snapi_auth_hash/.test(document.location)) {
			//popups appear to be broken on apps.facebook.com still, fix this
			document.getElementById('popup_fodder').addEventListener('DOMSubtreeModified', fix_block, false);
			//reset FB session
			FB.Connect.forceSessionRefresh();
		}
	}
	
	
		
	iframeResizePipe = function() {};