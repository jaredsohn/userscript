// ==UserScript==
// @name          Mafia War Wall Help in New Windows
// @description This script is not perfect as Mafia War Wall Auto Help but it fixes the Server Error in Mafia War Wall Auto Help. You can use it temporary while waiting for new version of Mafia War Wall Auto Help
// @namespace     http://greasetest
// @include       http://www.facebook.com/home.php?*
// @include       http://mwfb.zynga.com/*
// @author         Bang Nguyen nkbangct@yahoo.com
// ==/UserScript==
var href = window.location.href;
var window_names = [];
var limit = 3; // number of windows open at a moment
if (href.match(/^http:\/\/mwfb\.zynga\.com/)) {
	var message = xpath("//td[@class='message_body']");
	if (message) {
		if (message.snapshotItem(0)) {
			GM_setValue('log', '<div style="padding-bottom:5px;">' + now() + ' - ' + message.snapshotItem(0).innerHTML + '<div style="clear:both;"></div></div>' + GM_getValue('log'));
		}
	}
	GM_setValue('count', GM_getValue('count') + 1);
} else {
	main();
}

function main() {
	//GM_setValue('last_time', 0);
	GM_setValue('log', '');
	GM_setValue('count', 0);
	var now = new Date().getTime()
	var millisecond = now % 1000;
	var second = ( now - millisecond ) / 1000;
	if (GM_getValue('last_time') == undefined || GM_getValue('last_time') == 0) {
		GM_setValue('last_time', second - 20 * 60);
	}
	
	// add styles
	addGlobalStyle('.good { color:#00FF00;} .bad { color:#FF0000;}');
	
	// inject log container
	var pagelet_stream_header = document.getElementById('pagelet_stream_header');
	var log = document.createElement('div');
	log.id = 'log_container';
	log.style.display = 'block';
	log.style.paddingBottom = '20px';
	pagelet_stream_header.parentNode.insertBefore(log, pagelet_stream_header);
	
	doit();
	setInterval(doit, 10 * 1000);
}

function doit() {
	var log = document.getElementById('log_container');
	GM_log('count ' + GM_getValue('count') + ' window_name.length ' + window_names.length);
	if (GM_getValue('count') == window_names.length) {
		while (window_names.length > 0) {
			var w = window_names.shift();
			if (w) {
				w.close();
			}
		}
		GM_setValue('count', 0);
		if (GM_getValue('log')) {
			log.innerHTML =  GM_getValue('log') + log.innerHTML;
			GM_setValue('log', '');
		}
	}
	if (window_names.length >= limit) {
		return;
	}
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://www.facebook.com/ajax/intent.php?filter=app_10979261223&newest=&hidden_count=1&ignore_self=true&load_newer=true&request_type=4&__a=1',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			eval('var wall_response_array = ' + responseDetails.responseText.split('for (;;);')[1] + ';');
			if (wall_response_array != undefined){
				if (wall_response_array.payload != undefined){
					var wall_events_obj = mwwah_createElement('div',null,null);
					wall_events_obj.innerHTML = wall_response_array.payload.html;
					var wall_events_array = getChildElementsByClassName(wall_events_obj,'UIStory');
					var count = 0;
					for ( var i = wall_events_array.length - 1; i >= 0 && count < limit; i-- ){
						//GM_log('i ' + i);
						var action_links = getChildElementsByClassName(wall_events_array[i],'UIActionLinks_bottom');
						if (action_links) {
							var links = action_links[0].getElementsByTagName('a');
							if (links) {
								for(var j in links){
									if (links[j].href.match(/give_help/) || links[j].href.match(/collect_loot/) || links[j].href.match(/iced_boost_claim/)) {
										var send_time_expression = new RegExp('sendtime=(\\d+)');
										send_time = parseInt(send_time_expression.exec(links[j].href)[1]);
										if (send_time > GM_getValue('last_time')) {
											GM_log(links[j].href);
											GM_setValue('last_time', send_time);
											window_names.push(window.open(links[j].href)); 
											count++;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	});
}

function mwwah_createElement(type,append,attr){
	var element = document.createElement(type);
	if (attr != null){
		for (var i in attr){
			element.setAttribute(i,attr[i]);
		}
	}
	if (append){
		append.appendChild(element);
	}
	return element;
}
function getChildElementsByClassName(parentElement, className){
	var i, childElements, pattern, result;
	result = new Array();
	pattern = new RegExp('\\b'+className+'\\b');
	childElements = parentElement.getElementsByTagName('*');
	for(i = 0; i < childElements.length; i++){
		if(childElements[i].className.search(pattern) != -1){
			result[result.length] = childElements[i];
		}
	}
	return result;
}
function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
function now() {
	var d = new Date();
	var hours = '' + d.getHours();
	var minute = '' + d.getMinutes();
	var second = '' + d.getSeconds();
	if (hours.length == 1) hours = '0' + hours;
	if (minute.length == 1) minute = '0' + minute;
	if (second.length == 1) second = '0' + second;
	return hours + ":" + minute + ":" + second;
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}