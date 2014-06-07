// ==UserScript==
// @name			Wall cleaner
// @namespace		Wall cleaner
// @description		Clean you vall
// @require			http://code.jquery.com/jquery-latest.js
// @include			http://*.facebook.com/*
// @author         	Donatas Kazlauskas
// @version			0.2
// ==/UserScript==

var wc_img = new Object();
var wc_list = new Object();
var wc_app = new Object();

wc_app = {
	"source": "http://userscripts.org/scripts/source/63442.user.js",
	"show": "http://userscripts.org/scripts/review/63442",
	"id": "63442",
	"version": "0.2"
}

wc_img["remove"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGqSURBVDjLlZM7S0JhGMfVox+gqYZuQkMETYZNQmi2+QGKligiCBoalFragoqGzDM41NRQQy4VKDhUSyC0NLR1EeKIt7wePV7/vc/BI97NF36cA+f9/97neQ6vCoCKrVGGgWHswyRDQxkFVU1gkCQpWSqVKuVyGZ1g3+Fyuc5aJYrASOFsNgtRFOukUikkEgmEw2FZEgqFwPN8k4SWmgS0IZ/Po1AoyE8ik8kgmUwiEonIglwuBzrE7XbLkjYBhRVIQIF0Oo1oNNrWUm0m6iYBa6O+gd6pb6WVWCwmVyIIQndBK40SqoTmEY/H/y9olFA7NBMSDSQgisWiPBeSEAMLqIrvWyde1mbgt+jwtDIBfl7D9xRQSCHoOceb3YT8wymq716I17sIbM9WfGbtTl8Blf+8OoUcC8NpAxxDwKEe0eMF+Ba5z75/gaCyq68eNK7EwQj8Zm21UVDtNoPH5XFkL9YBFpLsKvwyglscfFbuR7kLc2zKItvc8TJ93ZwgsDkNwaFHZE+Hjw01/DZtxWvl9hXBGEl6XeXLpWH+zsIJVPa9hQtfmbgjyv4BPlWugike25IAAAAASUVORK5CYII%3D";
wc_img["update"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG8SURBVDjLjZNJS8NAGIarv0PBuzcV/4MHwYMHL/4CPQsexYvoSW2RioiguJ9cigtFKhpxqVtBXGqtVRO62TbJNFMb+zpfNKJVMQMPCWTeZ+YdMi4ALjGqBPWCxn+oEVRSxsb1IajnnGeLxeKraZr4DfEdbrd7sFxiCxoprOs6GGOf5HI5ZDIZxONxS6IoCjwezzcJjQoS0ATDMFAoFKwnoWkastksEomEJcjn86BFvF6vJfkhoLANCSigqiqSyeSPSh9nUvFNIGp8TqB36m1XSaVS1k5kWf5bUM5XCe2EziOdTjsXmGYRgVAMi9I1JrbuMbPzBF/wAS8F5kywfX6PlWAcNwrDXYpj/1bF2mkS/pOYM8G8JOPiUcNBNA8pwrArCMkcs9vR/wXUf9wfRTjBId3q2Anr8F9qCMY4pgKPzgSzovPFE0Pg+j1MHD1wjPqunFUIhBTsh1Uci9Be1MChWH35TIN3cgl97XU95YJSueBZ4zi8ecaCOIu5XRljm3cYmfQhtDYGabidTXfWttl3oUH8fUyE/rxMNpGD1dLReEcpsj4EX28TswXVJHFwnS26mqu6NwdajY3+FrwBN5GpoomTEloAAAAASUVORK5CYII%3D";
wc_img["log"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADoSURBVBgZBcExblNBGAbA2ceegTRBuIKOgiihSZNTcC5LUHAihNJR0kGKCDcYJY6D3/77MdOinTvzAgCw8ysThIvn/VojIyMjIyPP+bS1sUQIV2s95pBDDvmbP/mdkft83tpYguZq5Jh/OeaYh+yzy8hTHvNlaxNNczm+la9OTlar1UdA/+C2A4trRCnD3jS8BB1obq2Gk6GU6QbQAS4BUaYSQAf4bhhKKTFdAzrAOwAxEUAH+KEM01SY3gM6wBsEAQB0gJ+maZoC3gI6iPYaAIBJsiRmHU0AALOeFC3aK2cWAACUXe7+AwO0lc9eTHYTAAAAAElFTkSuQmCC";
wc_img["refresh"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGMSURBVDjLY/j//z8DJZiggtx9Sasyd8Yxk21Axo7YSymbow4QZUDJ8QyHoiNpB/IPJP/P3pPwP3177P+mQ5X/6/aV/o9cFrATrwHFxzIcCg+nnplzacr/TbdW/19/c8X/tTeW/l91bdH/5Vfn/y/ZkvPfb7rbHZwGFBxKnTn9fN//jTdX/W8+XPU/cX34/5iVQf8rtuf/L9mc/d9nqutuvC7I2Zv4AOjf/0D//o9fG3YIJh4wy+OS9xTnQ2699kyO7VacRAUi0L/wUPea5LTGtceW9FgA+ncNyekgfJEfZ9AcTyagfw+59ztcgolbVBsdMi7V/a+Xr/lfK0v1AV4XAP27O2tl0v/UJbH/rRtM/5tVGf6PmB74v/dE0//khdH/VVMUZ+I0AOjflxnLE/5PP9v7f8rprv8TT7X/7zvZ8r/nRON/kLhKssIZxXhZB7wusGu22Bk3N+x/1Mzg//qFWv+1s9X+q6cp/1dOUjigEIeqGWcgAv17AOjfS2RnJt08DWbNTNVVVMmNhDAANau2t3wToKQAAAAASUVORK5CYII%3D";
wc_img["settings"] = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEkSURBVCjPbdE9S0IBGIbhxxobWxP8D8r5I60RLg0NNTS21VBRQwg1aA4VOAWBpBVCFhKUtkVJtPQx9GFFWh49x3P0bvAjjsWzXrzvcAtpREEZfQtoACEkpKBVdpouv7NYi3SJkAynWcXExKTCJ6+4PLPeIZJPhksdmzp1vilTwqVGlWhEgR6wsbGpU+OLt94rGfJ1gIOLi4OFSYV3Sjx5QXdtkiHFx//gjiwlTshyT5LV3T8gwy3HFLnhkCuWmB3qA0Uu2WGOZVIUmN/ru5CiwAsLNLCI8cg+i3hAggMeiNOgwQbXRJnwghoX5DkiTow0OcLJ8HAbtLpkkzwJCuTY4pQppgeFFLJNtxMrzSRFtlnhvDXO6Fk7ll8hb+wZxpChoPzoB6aiXIYcSLDWAAAAAElFTkSuQmCC";
wc_img["loading"] = "data:application/octet-stream;base64,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%3D%3D";
function getArgs(url) {
	var args = new Object();
	if (url == undefined){
		var query = location.search.substring(1);
	}else{
		var url_array = url.split('?');
		var query = url_array[1].replace(/&amp;/g,'&');
	}
	var pairs = query.split("&");
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}
function wc_findAll(){
	all = 0;
	$('.UIStory').each(function(){
		checked = $(this).find('.UIS').attr('checked');
		if (checked) {
			all++;
		}
		var url_array = getArgs($(this).find('.UIStory_Hide > a').attr('href'));
		wc_list[url_array.story_key] = {
			"profile_id":	url_array.profile_id,
			"story_id":		url_array.story_id,
			"story_type":	url_array.story_type,
			"handler":		url_array.handler,
			"fb_dtsg":		$(this).find('#fb_dtsg').val(),
			"post_form_id":	$(this).find('#post_form_id').val(),
			"del": 		checked
		}
	});
	wc_list['settings'] = {
		"all": all,
		"removed": 0,
		"now": all,
	}
}
function wc_addCheckbox(){
	$('.checkDiv').each(function(){
		$(this).remove();
	});
	checked = $('#checkAll').attr('checked');
	if(checked) {
		checked = 'CHECKED';
	}else{
		checked = '';
	}
	$('.UIStory').each(function(){
		var url_array = getArgs($(this).find('.UIStory_Hide > a').attr('href'));
		$(this).append('<div class="checkDiv"><input type="checkbox" '+checked+' class="UIS" story="'+url_array.story_id+'">Remove this</div>');
	});
}
function wc_removeAll(){
	wc_findAll();
	var wc_time = 1000;
	window.setTimeout(function(){
		if(!$('#log'))$('<div id="log">Removed: <span id="info">0 of '+wc_list['settings'].all+'</span><span><img id="loading" src="'+wc_img["loading"]+'"></span></div>').insertAfter($('#menu'));
		else {
			$('#log').remove();
			$('<div id="log">Removed:<span id="info">0 of '+wc_list['settings'].all+'</span><img id="loading" src="'+wc_img["loading"]+'"></span></div>').insertAfter($('#menu'));
		}
		for (var i in wc_list){
			if (i != "settings") {
				if(wc_list[i].del == true) {
					wc_remove(i);
				}
			}
		}
	},wc_time);
}
function wc_remove(wc_arg){
	var wc_link = "http://www.facebook.com/ajax/minifeed.php";
	var wc_data = "__a=1&fb_dtsg="+wc_list[wc_arg].fb_dtsg+"&ministory_key="+wc_arg+"&post_form_id="+wc_list[wc_arg].post_form_id+"&post_form_id_source=AsyncRequest&profile_fbid="+wc_list[wc_arg].profile_id+"&revoke_permission=&story_type="+wc_list[wc_arg].story_type;
	GM_xmlhttpRequest({ url: wc_link, method:'post', data: wc_data,
		onload: function(resp){
			wc_list['settings'].now -=1;
			if(resp.responseText){
				eval('var arr='+resp.responseText.replace(/for \(;;\);/,''));
				if(arr.payload.success){
					$('#'+wc_list[wc_arg].story_id).remove();
					delete wc_list[wc_arg];
					wc_list['settings'].removed +=1;
					$('#info').html(wc_list['settings'].removed + ' of ' + wc_list['settings'].all)
				}
			}
			if(wc_list['settings'].now == 0) {
				$('#loading').remove();
			}
		}
	});
}
function wc_event(){
	$('#removeAll').click(function(){
		wc_removeAll();
	});
	$('#refresh').click(function(){
		window.location.reload(true);
	});
	$('#update').click(function(){
		wc_update();
	});
	GM_addStyle(
		'#menu img { cursor:pointer; }'
	);
	$('.PagerMoreLink').click(function(){
		setTimeout(wc_addCheckbox,1000);
		wc_event();
	});
	$('#checkAll').click(function (){
		checked = $(this).attr('checked');
		$('.UIS').each(function(){
			$(this).attr('checked',checked);
		});
	});
}
function wc_menu(){
	html = '<div id="menu"><img src="'+wc_img["remove"]+'" id="removeAll" title="Remove all wall event"> | <img src="'+wc_img["settings"]+'" id="settings" title="Settings"> | <img src="'+wc_img["refresh"]+'" id="refresh" title="Refresh"> | <img src="'+wc_img["update"]+'" id="update" title="Check for update"></div>';
	html += '<div><input type="checkbox" id="checkAll">Check all/none</div>';
	$(html).insertAfter($('.UIComposer:eq(0)'));	
}
function wc_update(){
	if($("#updating").html() == null) $('<div id="updating">Checkin for update..<img src="' + wc_img["loading"] + '"><div>').insertAfter($('#menu'));
	else {
		$("#updating").show();
		$("#updating").html('<div id="updating">Checkin for update..<img src="' + wc_img["loading"] + '"><div>');
	}
	GM_xmlhttpRequest({ url:wc_app['show'], method:'get',
		onload: function(resp){
			var _version = /@version\s+([\d.]+)/.exec(resp.responseText.toString());
			$('#upLoading').remove();
			if(wc_app['version'] != _version[1]){
				$('#updating').html('New version (' + _version[1] + ') is available click <a href="' + wc_app['show'] + '">here</a> to upgrade.');
			}
			else{
				$('#updating').html('You have latest version.');
				$('#updating').hide(4000);
			}
		}
	});
}
$(document).ready(function(){
	var _link = document.location.href;
	if(_link.indexOf("?ref=profile") != -1){
		wc_menu();
		wc_addCheckbox();
		wc_event();
	}
});
		
