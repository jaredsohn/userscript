// ==UserScript==
// @name yth4h
// @author 56uyh6
// ==/UserScript==
javascript:
(function(){
	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/m.mafiawars.com/.test(document.location)) {
		window.location.href = document.location+'?iframe=1';
	}
	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
		//Credits to Christopher(?) for this new fix
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
                $('#Loading130120570100946').hide();
                $('#Loadingspacer').hide();
                $('#Loadinghttp://mwfb.static.zgncdn.com/mwfb/graphics/spacer.gif').hide();
		//hack to kill the resizer calls
		iframeResizePipe = function() {};
		
		if ($('#final_wrapper').attr('spocklet_popup') != 'enable_ze_evil_popups_of_doom') {
			if (confirm('Enable workaround to show ingame popups, like bank and hospital?\nYou will not have to rerun Unframe-MW on each pageload to kill the popups.')) {
				$('#content_row').append('<style type="text/css">div.pop_box { display: block; }</style>');
				$('#final_wrapper').attr('spocklet_popup','disable_ze_evil_popups_of_doom');
			}
		}
		
		//kill the new wierd div, effects unknown
		//$('#FB_HiddenContainer').remove();
		$('div[id*="pop_1"]').each(function(){
			$(this).css('display','none');
			//if (/The Bank/.test($(this).html())) {
				//$(this).css('display','block');
				//$(this).find('div').css('display','block');
			//}
		});
		
		// close all popups
		// var popbuttons=document.getElementsByClassName('pop_close');
		// for(i=0;i<popbuttons.length;i++){
			// popbuttons[i].onclick();
		// }	

	}
})()