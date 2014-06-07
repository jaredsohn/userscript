// ==UserScript==
// @name Raimi Bundle Bookmarklet
// @Author Raimi Syazwan Abdul Rashid
// @description The bookmarlet that personally important to me! Thanks to their Author
// @include     http://facebook.mafiawars.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude     http://facebook.mafiawars.com/mwfb/iframe_proxy.php*
// @version     Raimi Bundle Bookmarklet v1
// ==/UserScript==

javascript:(function(){
	//begin unframe code
	if (navigator.appName == 'Microsoft Internet Explorer') {
		alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
		return;
	}
	if (/m.mafiawars.com/.test(document.location)) {
		window.location.href = document.location+'?iframe=1';
	}
	else if (/apps.facebook.com.inthemafia/.test(document.location)) {
		for (var i = 0; i < document.forms.length; i++) {
			if (/canvas_iframe_post/.test(document.forms[i].id) && document.forms[i].target == "mafiawars") {
				document.forms[i].target = '';
				document.forms[i].submit();
				return;
			}
		}
	}
	else if (document.getElementById('some_mwiframe')) {
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
		$('#LoadingBackground').hide();
		$('#LoadingOverlay').hide();
		$('#LoadingRefresh').hide();
	}
	//end unframe code

	//unresizer calls
	iframeResizePipe = function() {};

	
	//MWH Initial Variables
	
	//var version = 'Raimi Bookmark Bundle';
	//var author = 'Raimi Syazwan Abdul Rashid';

//Warna button bookmarklet	
	var boot1 = '<a id="button" href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22';
	var bootpurple = '%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short purple"><span><span>';
	var bootwhite = '%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short white"><span><span>';
	var bootgreen = '%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short green"><span><span>';
	var bootorange = '%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short orange"><span><span>';
	var boot3 = '</span></span></a>';
	
//Code source bookmarklet dan nama
	
	//Cotoh cara nak set bookmarklet
	//var bmurl1 = 'source script disini'; /* #1 Nama bookmarklet disini */
	
	var bmurl1 = 'http://www.spocklet.com/bookmarklet/property.manager.js';					/* #1 PropManager */
	var bmurl2 = 'http://www.spocklet.com/bookmarklet/checklist-beta.js';				
	/* #2 Checklist */
	var bmurl3 = 'http://www.exellerate.com/mafia/loose_slots.js';						/* #3 LooseSlots */
	var bmurl4 = 'http://www.exellerate.com/mafia/MarketplaceFCPurchase.js';			
	/* #4 FCbuyer */
	var bmurl5 = 'http://www.exellerate.com/mafia/link-a-nator.js';					
	/* #5 Link-A-Nator */
	var bmurl6 = 'http://www.exellerate.com/mafia/free_gift_get_a_nator.js';			
	/* #6 Get-A-Nator */
	var bmurl7 = 'http://www.exellerate.com/mafia/mystery_bagger.js';					/* #7 BagMugger */
	var bmurl8 = 'http://www.spockholm.com/mafia/tournament-o-matic.js';				
	/* #8 oTournament */
	var bmurl9 = 'http://spocklet.com/bookmarklet/zmc-beta.js';						/* #9 ZMC */
	var bmurl10 = 'http://www.spockholm.com/mafia/switch.js';						/* #10 Switch */
	var bmurl11 = 'http://www.spockholm.com/mafia/minipack.js';						/* #11 MiniPack */
	
	//var bmurl30 = 'xxx';		/* #30 Next */
	//var bmurl31 = 'xxx';		/* #31 Next */
	//var bmurl32 = 'xxx';		/* #32 Next */
	//var bmurl33 = 'xxx';		/* #33 Next */
	//var bmurl34 = 'xxx';		/* #34 Next */
	


//Coding frame	

	var gap = '&nbsp;&nbsp;&nbsp;';
	var content = document.getElementById('content_row');
	var mwh_html = 
	'<style type="text/css">' + 
			'.view-mwh-div {margin:3px auto 7px auto; border: 2px solid #fff; width: 98%; height:auto; padding:3px;}'+
			'#button {margin:3px 1px 3px 11px;}'+
	'</style>' + 
	'<div class="view-mwh-div">'+
			'<a href="#" style="float:right;" class="sexy_button_new short red" onclick="javascript:$(\'#mwhdiv\').remove(); return false;"><span><span>Close</span></span></a>'+gap+'<a href="http://www.spockholm.com/mafia/donate.php" target="_blank" style="float:right;" class="sexy_button_new short black" title="Donate To Team Spockholm"><span><span>Donate</span></span></a><br />'+
			'<p align="center">'+
			'<a href="http://www.spockholm.com/mafia/bookmarklets.php" target="_blank"><img src="http://www.mafia-tools.com/uploads/banner-spockholm-mafia-tools.png" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" /></a><br />'+
			'| <font color="purple">Jobbers</font> | '+
			'<font color="white">Others</font> | '+
			'<font color="green">NEW</font> | '+
			'<font color="orange">Fighters</font> |'+
			'</p>'+
//Susunan bookmarklet			
			'<p align="center">'+
			boot1+bmurl1+bootwhite+'PropManager'+boot3+
			boot1+bmurl2+bootwhite+'Checklist'+boot3+
			boot1+bmurl3+bootwhite+'LooseSlots'+boot3+
			boot1+bmurl4+bootwhite+'FCbuyer'+boot3+
			boot1+bmurl5+bootwhite+'Link-A-Nator'+boot3+
			boot1+bmurl6+bootwhite+'Get-A-Nator'+boot3+
			boot1+bmurl7+bootwhite+'BagMugger'+boot3+
			boot1+bmurl8+bootwhite+'oTournament'+boot3+
			boot1+bmurl9+bootwhite+'ZMC'+boot3+
			boot1+bmurl10+bootwhite+'Switch'+boot3+
			boot1+bmurl11+bootwhite+'MiniPack'+boot3+<br /><br />'+
			//
			//boot1+bmurl#+bootwhite+'#'+boot3+
			//boot1+bmurl#+bootwhite+'#'+boot3+'<br />'+
			//boot1+bmurl#+bootwhite+'#'+boot3+
			
//Bahagian city travel			
			'Travel Bar<br />'+
			'| <a title="New York" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&amp;xw_action=travel&amp;destination=1&amp;from=index&amp;nextParams=&amp;menu=travel\', 1, 1, 0, 0)">New York</a> | <a title="Bangkok" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&amp;xw_action=travel&amp;destination=4&amp;from=index&amp;nextParams=&amp;menu=travel\', 1, 1, 0, 0)">Bangkok</a> | <a title="Las Vegas" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&amp;xw_action=travel&amp;destination=5&amp;from=index&amp;nextParams=&amp;menu=travel\', 1, 1, 0, 0)">Las Vegas</a> | <a title="Italy" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&amp;xw_action=travel&amp;destination=6&amp;from=index&amp;nextParams=&amp;menu=travel\', 1, 1, 0, 0)">Italy</a> | <a title="Brazil" onclick="do_ajax(\'inner_page\', \'remote/html_server.php?xw_controller=travel&amp;xw_action=travel&amp;destination=7&amp;from=index&amp;nextParams=&amp;menu=travel\', 1, 1, 0, 0)">Brazil</a> |'+
			'</p>'+
	'</div>';
	
	
	function create_div() {
		if (document.getElementById('mwhdiv')) {
			document.getElementById('mwhdiv').innerHTML = mwh_html;
		}
		else {
			var mwh_div = document.createElement("div");
			mwh_div.id = 'mwhdiv';
			mwh_div.innerHTML = mwh_html;
			content.insertBefore(mwh_div, content.firstChild);
		}
	}
	create_div();

})()