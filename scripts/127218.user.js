// ==UserScript==
// @name           PropBeg
// @description    P-Begger
// ==/UserScript==

/*
	$Id: property-begger.js,v 1.4 2012-02-28 12:04:22 eike Exp $
	Property link generator
*/
javascript:(function (){
var version='Property Begger v0.01';
var debug=true;
var shortener_url="http://spockon.me/api.php";
var spocklet="propbegger";

var http = 'http://';
if (/https/.test(document.location)) {
	http = 'https://';
}
var preurl = http+'facebook.mafiawars.zynga.com/mwfb/remote/html_server.php?';

//try {
	//<unframe>
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
	//</unframe>

	//hack to kill the resizer calls
	iframeResizePipe = function() {};
  
	function unix_timestamp() {
		return parseInt(new Date().getTime().toString().substring(0, 10))
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

	function shorten(url, handler) {
		$.ajax({
			type: "GET",
			dataType: "jsonp",
			url: shortener_url+'?action=shorturl&format=jsonp&url='+escape(url),
			crossDomain: true,
			success: function (msg){
				handler(msg.shorturl);
			}
		});
	}
		
	function postlink(object) {
		FB.ui({
			method: 'feed',
			name: object.name,
			link: object.link,
			picture: object.picture,
			description: object.description
		});	
	}	
	function postlinkgr(object) {
		FB.ui({
			method: 'send',
			name: object.name,
			link: object.link,
			picture: object.picture,
			description: object.description
		});	
	}
	
	function getBeggingPartAny(){
		// get 5 objects
		var beggingobjects=[];
		var count=parseInt(prompt('How many parts?'));
		getObjects(showObjects);
		
		function getObjects(handler){
			$('#'+spocklet+'_counter').html(beggingobjects.length+'/'+count);
			if(beggingobjects.length<count) {
				request('xw_controller=index&xw_action=view',function(msg){
					var m;
					if (m=/var property_ask_any = ([^\<]*)\</.exec(msg)) {
						//console.log(m[1]);
						eval('window.pp='+m[1]);
						//console.log(window.pp);
						shorten(window.pp.link,function(shortlink){
							window.pp.shortlink=shortlink;
							beggingobjects.push(window.pp);
							getObjects(handler);
						});
					} else {
						alert("No link found, probably not ready to ask for parts yet.");
					}
				});
			} else {
				handler();
			}
		}
		function showObjects(){
			$('#spsm_reply').remove();
			var html="";
			html='Links saved: '+beggingobjects.length+'</br>ATTENTION: YOU NEED TO ACTIVATE EVERY LINK TO MAKE IT WORK!<br />';
			for(var i=0;i<beggingobjects.length;i++){
				html+='Any Part: <a href="'+beggingobjects[i].shortlink+'" taget="_blank">'+beggingobjects[i].shortlink+'</a>';
				//html+=' <a href="#" data-id='+i+' id="'+spocklet+'_activate_'+i+'" class="'+spocklet+'_activate">activate only</a>';
				html+=' <a href="#" data-id='+i+' id="'+spocklet+'_activatepost_'+i+'" class="'+spocklet+'_activatepost">activate</a>';
//				html+=' | <a href="#" data-id='+i+' id="'+spocklet+'_wallpost_'+i+'" class="'+spocklet+'_wallpost">wallpost</a>';
//				html+=' | <a href="#" data-id='+i+' id="'+spocklet+'_grouppost_'+i+'" class="'+spocklet+'_grouppost">grouppost</a>';
				html+='<br />';
			
			}
				
			
			$('#popup_fodder').append('<div id="spsm_reply"><span id="'+spocklet+'_html">'+html+'</span></div>');
			$('#spsm_reply').dialog({ title: "Your Begging-Links", close: function(){ $('#spsm_reply').remove(); }, width: 700, position: ['center',100]} );
			
			$('.'+spocklet+'_activatepost').click(function(){
				var id=parseInt($(this).attr('data-id'));
				MW.Feed(beggingobjects[id]);
				$(this).remove();
				$('#'+spocklet+'_activate_'+id).remove();
			});
			
			$('.'+spocklet+'_activate').click(function(){
				var id=parseInt($(this).attr('data-id'));
				beggingobjects[id].callback({ post_id: 42 });
				$(this).remove();
				$('#'+spocklet+'_activatepost_'+id).remove();
			});			
			$('.'+spocklet+'_wallpost').click(function(){
				var id=parseInt($(this).attr('data-id'));
			});			
			$('.'+spocklet+'_grouppost').click(function(){
				var id=parseInt($(this).attr('data-id'));
				$('#'+spocklet+'_activatepost').remove();
			});
			
			
			
			
		}
		
	}

	function getBeggingPartOther(){
		var beggingobjects=[];
		var count=parseInt(prompt('How many parts (x3)?'));
		getObjectsOther(showObjectsOther);
		
		function getObjectsOther(handler){
			$('#'+spocklet+'_counter').html(beggingobjects.length+'/'+count);
			if(beggingobjects.length<count*3) {
				request('xw_controller=LimitedTimeProperty&xw_action=showProperties&xw_city=1',function(msg){
					var m;
					if (m=/var property_part\d+ = ([^\<]*)\</.exec(msg)) {
						
						eval('window.pp='+m[1]);
						window.remaining=msg.substr(msg.indexOf(m[1]));
						console.log({a:window.remaining,b:'first'});
						
						if(m=/needs more (.*) to/.exec(window.pp.name)) {
							window.pp.itemname = m[1];
						}
						console.log(window.pp);

						shorten(window.pp.link,function(shortlink){
							console.log({a:window.remaining});
							window.pp.shortlink=shortlink;
							beggingobjects.push(window.pp);
							console.log(window.remaining.indexOf("var property_part"));
							if (m=/var property_part\d+ = ([^\<]*)\</.exec(window.remaining)) {
								eval('window.pp='+m[1]);
								window.remaining=window.remaining.substr(window.remaining.indexOf(m[1]));
								console.log(window.pp.name);
								if(m=/needs more (.*) to/.exec(window.pp.name)) {
									window.pp.itemname = m[1];
								}

								shorten(window.pp.link,function(shortlink){
									window.pp.shortlink=shortlink;
									beggingobjects.push(window.pp);
									if (m=/var property_part\d+ = ([^\<]*)\</.exec(window.remaining)) {
										eval('window.pp='+m[1]);
										console.log(window.pp.name);
										if(m=/needs more (.*) to/.exec(window.pp.name)) {
											window.pp.itemname = m[1];
										}


										shorten(window.pp.link,function(shortlink){
											window.pp.shortlink=shortlink;
											beggingobjects.push(window.pp);

											getObjectsOther(handler);
										});
									} else {
										getObjectsOther(handler);
									}	
								});
							} else {
								getObjectsOther(handler);
							}	
						});
					} else {
						alert("No link found, probably not ready to ask for parts yet.");
					}
				});
			} else {
				handler();
			}
		}
		function showObjectsOther(){
			$('#spsm_reply').remove();
			var html="";
			html='Links saved: '+beggingobjects.length+'</br>ATTENTION: YOU NEED TO ACTIVATE EVERY LINK TO MAKE IT WORK!<br />';
			for(var i=0;i<beggingobjects.length;i++){
				html+=beggingobjects[i].itemname+': <a href="'+beggingobjects[i].shortlink+'" taget="_blank">'+beggingobjects[i].shortlink+'</a>';
				//html+=' <a href="#" data-id='+i+' id="'+spocklet+'_activate_'+i+'" class="'+spocklet+'_activate">activate only</a>';
				html+=' <a href="#" data-id='+i+' id="'+spocklet+'_activatepost_'+i+'" class="'+spocklet+'_activatepost">activate</a>';
//				html+=' | <a href="#" data-id='+i+' id="'+spocklet+'_wallpost_'+i+'" class="'+spocklet+'_wallpost">wallpost</a>';
//				html+=' | <a href="#" data-id='+i+' id="'+spocklet+'_grouppost_'+i+'" class="'+spocklet+'_grouppost">grouppost</a>';
				html+='<br />'; //+JSON.stringify(beggingobjects[i]).replace(/\"/g,"'")+"<br />";
			
			}
				
			
			$('#popup_fodder').append('<div id="spsm_reply"><span id="'+spocklet+'_html">'+html+'</span></div>');
			$('#spsm_reply').dialog({ title: "Your Begging-Links", close: function(){ $('#spsm_reply').remove(); }, width: 700, position: ['center',100]} );
			
			$('.'+spocklet+'_activatepost').click(function(){
				var id=parseInt($(this).attr('data-id'));
				MW.Feed(beggingobjects[id]);
				$(this).remove();
				$('#'+spocklet+'_activate_'+id).remove();
			});
			
			$('.'+spocklet+'_activate').click(function(){
				var id=parseInt($(this).attr('data-id'));
				beggingobjects[id].callback({ post_id: 42 });
				$(this).remove();
				$('#'+spocklet+'_activatepost_'+id).remove();
			});			
			$('.'+spocklet+'_wallpost').click(function(){
				var id=parseInt($(this).attr('data-id'));
			});			
			$('.'+spocklet+'_grouppost').click(function(){
				var id=parseInt($(this).attr('data-id'));
				$('#'+spocklet+'_activatepost').remove();
			});
			
			
			
			
		}
		
	}

	
	function start(){
		$('head').append('<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/ui-darkness/jquery-ui.css" type="text/css" />');
	
		$('#popup_fodder').append("<div id='spsm_reply'>This can only be used when Zynga allows it. So only run it when the \"Ask\"-Button is active.'</div>");
		$('#spsm_reply').dialog({ title: version, buttons: { 
			'Any Part':function(){
				$('#spsm_reply').html('Please wait [<span id="'+spocklet+'_counter"></span>]');
				getBeggingPartAny();
			},
			'Other parts':function(){
				$('#spsm_reply').html('Please wait [<span id="'+spocklet+'_counter"></span>]');
				getBeggingPartOther();
			}
		}, width: 500, position: ['center',100]
		} );

	}
	start();
//	} catch (e) {
//		
//	}
	
}())
