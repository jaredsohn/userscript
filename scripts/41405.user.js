// ==UserScript==
// @name           Multiply Comment Fix
// @namespace      http://derrickorama.multiply.com/
// @description    Fixes issue with comment not showing after you submit a reply.
// @include        http://*multiply.com/*
// ==/UserScript==

function ajax(url, callback, options) {
// console.log('ajax: url |' + url + '|');
	var method = 'POST';
	if (options && options.method != null) {
	method = options.method;
	}
	
	var data = options && options.params ? make_param_string(options.params) : '';

	var new_callback;
	if (callback) {
// 	console.log('ajax: setting up callback ...');
	new_callback = function(req) {
		if (req.readyState != 4) return null;
		if (req.status != 200) return null;
		return callback(req);
	};
	}

	var req = new_ajax_request(options ? options.name : null);
	var async = true;
	if (options && options.async != null)
	async = options.async;
//     console.log('ajax: async = |' + async + '|');

	if (req) {
	if (new_callback)
		req.onreadystatechange = function() { new_callback(req); };
	req.open(method, url, async);

	if (method == 'POST') {
		req.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		req.setRequestHeader('Content-length', data ? data.length : 0);
		req.setRequestHeader('Connection', 'close');
	}

// 	console.log('ajax: sending ' + method + ' |' + url + '|');
	req.send(data);
	}

	return req;
}

var script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = ajax;
document.getElementsByTagName('head')[0].appendChild(script);