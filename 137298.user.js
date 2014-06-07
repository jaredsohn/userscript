// ==UserScript==
// @name       	Toolbar.[Agent]
// @namespace   Mafiawars by Zynga
// @description Easy way to access a few bookmarklets without unframing, Contains autoheal, repeatjob, en2xp etc etc
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     http://mwfb.zynga.com/mwfb/remote/html_server.php*
// @include     http://facebook.mafiawars.zynga.com/mwfb/xd_receiver.htm
// @include     http://apps.facebook.com/inthemafia/*
// @include     http://apps.new.facebook.com/inthemafia/*
// @include     http://www.facebook.com/connect/uiserver*
// @exclude     http://mwfb.zynga.com/mwfb/*#*
// @exclude     http://facebook.mafiawars.zynga.com/mwfb/*#*
// @exclude     http://apps.facebook.com/inthemafia/sk_updater.php*
// @exclude		http://facebook.mafiawars.zynga.com/mwfb/iframe_proxy.php*
// @version     0.01
// ==/UserScript==

javascript:(function (){
	var rev=/,v \d+\.(\d+)\s201/.exec("$Id: getgiftlinks.js,v 1.3 2011-12-02 21:38:16 eike Exp $")[1],
	version='Giftlink-Getter v0.'+rev;
	var spocklet='giftget';

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
	}
	//end unframe code

	//hack to kill the resizer calls
	iframeResizePipe = function() {};

	
	var http = 'http://';
	if (/https/.test(document.location)) {
		http = 'https://';
	}
	var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';

	//setup the initial html
	var style = '<style type="text/css">'+
		'.messages {border: 1px solid #888888; margin-bottom: 5px; -moz-border-radius: 5px; border-radius: 5px; -webkit-border-radius: 5px;}'+
		'.messages img{margin:0 3px;vertical-align:middle}'+
		'.messages input {border: 1px solid #888888; -moz-border-radius: 3px; border-radius: 3px; -webkit-border-radius: 2px;padding 0;background: #000; color: #FFF; width: 32px;}'+
	'</style>';

	var logo = '<a href="http://www.spockholm.com/mafia/testing.php#" target="_blank"><img src="http://www.mafia-tools.com/uploads/banner-spockholm-mafia-tools.png#" alt="Spockholm Mafia Tools" title="Spockholm Mafia Tools" width="425" height="60" style="margin-bottom: 5px;" /></a>';

	var spocklet_html =
	'<div id="'+spocklet+'_main">'+
		style+
		'<table class="messages">'+
		'<tr><td colspan="3" align="center" style="text-align:center;">'+logo+'<br />'+
			'<a href="http://www.spockholm.com/mafia/donate.php#" id="'+spocklet+'_donate" class="sexy_button_new short white" target="_blank" title="Like what we do? Donate to Team Spockholm" alt="Like what we do? Donate to Team Spockholm"><span><span>Donate</span></span></a>'+
//			'&nbsp;<a href="http://www.spockholm.com/mafia/help.php#" id="'+spocklet+'_help" class="sexy_button_new short" target="_blank" title="Get help" alt="Get help"><span><span>Help</span></span></a>'+
			'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;<span class="good">'+version+'</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;'+
//			'<a href="#" id="'+spocklet+'_start" class="sexy_button_new short green" title="Start" alt="Start"><span><span>Start</span></span></a>'+
			'&nbsp;<a href="#" id="'+spocklet+'_close" class="sexy_button_new short red" title="Close" alt="Close"><span><span>Close</span></span></a>'+
		'</td></tr>'+
		'<tr><td colspan="3"><hr /></td></tr>'+
		'<tr><td colspan="3"><span id="'+spocklet+'_gifts">Loading...</span></td></tr>'+
		'</table>'+
	'</div>';

	
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10));
	}
	function cmp(v1,v2){
		return (v1>v2?-1:(v1<v2?1:0));
	}
	
	function create_div() {
		//setup the spockdiv
		if ($('#'+spocklet+'_main').length == 0) {
			$('#inner_page').before(spocklet_html);
		}
		else {
			$('#'+spocklet+'_log').html();
		}
	}
	create_div();
	read_zmc();
	
	function read_zmc(){
		request('xw_controller=messageCenter&xw_action=view&xw_city=1&tmp=&cb=&xw_person='+User.id.substr(2)+'&mwcom=1&xw_client_id=8',function(msg){
			$msg=$(msg);
			var giftlinks=[],sorted={};
			$msg.find('.gift').each(function(){
				
				var data={name:''};
				var m;
				try {
					data.link=/html_server.php.([^\"]*)\"/.exec($(this).find('.state_accept>a:first').attr('onclick'))[1];
				} catch(e) {}
				data.text=$(this).find('p[id*=zmc_bodytext]').text().trim();
				if (m=/sent you a (.*) to help/.exec(data.text)) {
					data.name=m[1];
				}
				if(data.link && data.text) {
					var params = data.link.split('&');
					
					data.params={};
					for(var i=0;i<params.length;i++){
						var pair=params[i].split('=');
						data.params[pair[0]]=pair[1];
					}
					giftlinks.push(data);
				}
				
			});
			
			
			
			var html='Raw Links:<br /><textarea class="instructions" rows="10" cols="60">';
			for(var i=0;i<giftlinks.length;i++) {
				var data=giftlinks[i];
				html+=preurl+data.link+"\r\n";
			}
			html+='</textarea><hr /><br />';
			giftlinks=giftlinks.sort(function(a,b){ return cmp(a.name,b.name); });
			for(var i=0;i<giftlinks.length;i++) {
				var data=giftlinks[i];
				html+='<div><a href="'+preurl+data.link+'">'+data.name+'</a></div>';
			}
			$('#'+spocklet+'_gifts').html(html);
		});
	}

	function request(url, handler, errorhandler) {
		var timestamp = parseInt(new Date().getTime().toString().substring(0, 10));
		if (url.indexOf('cb=') == -1) {
			url += '&cb='+User.id+timestamp;
		}
		if (url.indexOf('tmp=') == -1) {
			url += '&tmp='+timestamp;
		}
		User.clicks++;
		var params = {
			'ajax': 1,
			'liteload': 1,
			'sf_xw_user_id': User.id,
			'sf_xw_sig': local_xw_sig,
			'xw_client_id': 8,
			'skip_req_frame': 1,
			'clicks': User.clicks
		};
		$.ajax({
			type: "POST",
			url: preurl+url,
			data: params,
			cache: false,
			success: handler,
			error: errorhandler
		});
	}	
	

	
	$('#'+spocklet+'_close').click(function() {
		$('#'+spocklet+'_main').remove();
	});
	

	//add analytics
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
		if(scriptTag) head.removeChild(scriptTag);
			script = document.createElement('script');
			script.src = file;
			script.type = 'text/javascript';
			script.id = 'loadScript';
			head.appendChild(script);
	}
	loadContent('http://www.google-analytics.com/ga.js');
	try {
		var pageTracker = _gat._getTracker("UA-8435065-3");
		pageTracker._trackPageview();
		pageTracker._trackPageview("/script/GiftGet");
	}
	catch(err) {}
	//end analytics
})()