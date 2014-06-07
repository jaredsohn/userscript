// ==UserScript==
// @name           Wetdreams BM Bundle
// @namespace      Mafia Wars
// @description    Spockholm Bundle Bookmarklet
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

	//hack to kill the resizer calls
	iframeResizePipe = function() {};

	
	//MWH Initial Variables
	
	//var version = 'Wetdreams BM Bundle';
	//var author = 'Wetdreamer';
	var boot1 = '<a id="button" href="javascript:%28function%28%29%7Bvar%20a%3Ddocument.createElement%28%22script%22%29%3Ba.type%3D%22text%2Fjavascript%22%3Ba.src%3D%22';
	var bootpurple = '%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short purple"><span><span>';
	var bootwhite = '%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short white"><span><span>';
	var bootgreen = '%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short green"><span><span>';
	var bootorange = '%3F%22%2BMath.random%28%29%3Bdocument.getElementsByTagName%28%22head%22%29%5B0%5D.appendChild%28a%29%7D%29%28%29%3B" class="sexy_button_new short orange"><span><span>';
	var boot3 = '</span></span></a>';
	
	//Spocklet URL's (bmurl1 - bmurl40) 
	var bmurl1 = 'http://spocklet.com/bookmarklet/assassin-a-nator.js';					/* #1 Assassin-a-Nator */
	var bmurl2 = 'http://www.spockholm.com/mafia/tournament-o-matic.js';						/* #2 Tournament-o-Matic */
	
	var bmurl3 = 'http://spocklet.com/bookmarklet/property.manager.js';						/* #3 Property manager */
	var bmurl4 = 'http://www.exellerate.com/mafia/loose_slots.js';					/* #4 Loose slots */
	var bmurl5 = 'http://spocklet.com/bookmarklet/inventorygroup.js'; 			/* #5 Inventory group */
	var bmurl6 = 'http://www.spockholm.com/mafia/inventory.analyzer.js';						/* #6 Inventory analyzer */
	
	var bmurl7 = 'http://www.exellerate.com/mafia/link-a-nator.js';				/* #17 Link-a-nator */
	var bmurl8 = 'http://www.exellerate.com/mafia/free_gift_get_a_nator.js';					/* #8 Get-a-nator */
	var bmurl9 = 'http://www.exellerate.com/mafia/mystery_bagger.js';  				/* #9 Mugger */
	var bmurl10 = 'http://www.spockholm.com/mafia/stream-helper.js';					/* #10 Stream helper */
	var bmurl11 = 'http://www.spockholm.com/mafia/brutus_helper.js';			/* #11 Brutus helper */
	
	var bmurl12 = 'http://www.spockholm.com/mafia/switch.js';							/* #12 Switch */
	var bmurl13 = 'http://www.spockholm.com/mafia/minipack.js';							/* #13 MiniPack */
	
	//var bmurl24 = 'xxx';		/* #31 Next */
	//var bmurl25 = 'xxx';		/* #32 Next */
	//var bmurl26 = 'xxx';		/* #33 Next */
	//var bmurl27 = 'xxx';		/* #34 Next */
	//var bmurl28 = 'xxx';		/* #35 Next */
	
	//var bmurl36 = 'xxx';		/* #36 Next */
	//var bmurl37 = 'xxx';		/* #37 Next */
	//var bmurl38 = 'xxx';		/* #38 Next */
	//var bmurl39 = 'xxx';		/* #39 Next */
	//var bmurl40 = 'xxx';		/* #40 Next */
	
	//var bmurl101 = '';			/* #101 Next*/
	//var bmurl102 = '';			/* #102 Next*/
	//var bmurl103 = '';			/* #103 Next */
	//var bmurl104 = '';			/* #104 Next */
	//var bmurl105 = '';			/* #105 Next */
	
	var gap = '&nbsp;&nbsp;&nbsp;';
	var content = document.getElementById('content_row');
	var mwh_html = 
	'<style type="text/css">' + 
			'.view-mwh-div {margin:3px auto 7px auto; border: 2px solid #fff; width: 98%; height:auto; padding:3px;}'+
			'#button {margin:3px 1px 3px 11px;}'+
	'</style>' + 
	'<div class="view-mwh-div">'+
			'<a href="#" style="float:right;" class="sexy_button_new short red" onclick="javascript:$(\'#mwhdiv\').remove(); return false;"><span><span>Close</span></span></a>'+gap+'<a href="http://www.facebook.com/pages/Eyes-of-Destruction-Infernal-Field/185052951542167" target="_blank" style="float:right;" class="sexy_button_new short black" title="Wetdreams"><span><span>Donate</span></span></a><br />'+
			'<p align="center">'+
			'<a href="http://www.facebook.com/pages/Eyes-of-Destruction-Infernal-Field/185052951542167" target="_blank"><img src="" alt="Wetdreams BM Bundle" title="Wetdreams BM Bundle" width="425" height="60" /></a><br />'+
                        '|<font color="white">Others</font> | '+
			'<font color="green">Helper</font> | '+
			'<font color="orange">Fighters</font> |'+
			'</p>'+
			'<p align="center">'+
			boot1+bmurl1+bootorange+'Assassin-a-Nator'+boot3+
			boot1+bmurl2+bootorange+'Tournament-o-Matic'+boot3+'<br />'+
			boot1+bmurl3+bootgreen+'Property manager'+boot3+
			boot1+bmurl4+bootgreen+'Loose slots'+boot3+
			boot1+bmurl5+bootgreen+'Inventory group'+boot3+
			boot1+bmurl6+bootgreen+'Inventory analyzer'+boot3+'<br />'+
			boot1+bmurl7+bootgreen+'Link-a-nator'+boot3+
			boot1+bmurl8+bootgreen+'Get-a-nator'+boot3+
			boot1+bmurl9+bootgreen+'Mugger'+boot3+
			boot1+bmurl10+bootgreen+'Stream helper'+boot3+
			boot1+bmurl11+bootgreen+'Brutus helper'+boot3+'<br />'+
			boot1+bmurl12+bootwhite+'Switch'+boot3+
			boot1+bmurl13+bootwhite+'MiniPack'+boot3+'<br /><br />'+
			'Dreams To<br />'+
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