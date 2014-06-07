// ==UserScript==
// @name          bizi searcher
// @description   searches using bizi
// @require       http://code.jquery.com/jquery-1.10.2.min.js
// @include       http://www.bizi.si/*
// @version       2014.01.04
// @grant         GM_xmlhttpRequest
// ==/UserScript==

// the guts of this userscript
function main() {
	var that = this;
	
	this.bizi_search_url = 'http://www.bizi.si/iskanje/';
	this.srv_url = 'http://api.afax.si/';
	this.store_method = srv_url + 'catch/';
	this.mode_method = srv_url + 'mode/';
	this.index_method = srv_url + 'last/';
	this.data_method = srv_url + 'data/';
	
	this.data = [];
	this.mode = 'tax_id';
	this.last_index = -1;
	this.search_term = '';
	
    GM_xmlhttpRequest({ method: 'GET', url: that.mode_method, onload: function(response) {
		that.mode = response.responseText;
		GM_xmlhttpRequest({ method: 'GET', url: that.index_method, onload: function(response) {
			that.last_index = +response.responseText;
			that.current_index = that.last_index + 1;
			GM_xmlhttpRequest({ method: 'GET', url: that.data_method, onload: function(response) {
				that.data = JSON.parse(response.responseText)['result'];
				if (that.current_index < that.data.length) {
					that.search_term = that.data[that.current_index];
				};
				do_work(that);
			} });
		} });
	} });
};

function do_work(main) {
    var $searchbox = $('input.query[type=text][id$=tbSearchWhat]');
	
	if ($searchbox.val() != search_term || window.location.href != main.bizi_search_url) {
		search(main, search_term);
	} else {
		store(main);
	};
};

function search(main, search_term) {
	var fn = parametrise_function((function() {
		$search_box = $('input.query[type=text][id$=tbSearchWhat]');
		$searchbutton = $('a.buttonRed[id$=_btnSearch]');
		submitter = $searchbutton[0].id.replace(/_/g, '$');
	
		$search_box.val('__search_term__');
		WebForm_DoPostBackWithOptions(new WebForm_PostBackOptions(submitter, '', true, 'searchQuick', '', false, true));
	}), { search_term: search_term });
	
	exec(fn);
};

function store(main) {
	var $lnk = $('div.results.search a[id$=linkCompany]:first'),
		$txt = $('input.query[type=text][id$=tbSearchWhat]'),
		href = $lnk.prop('href'),
		val = $txt.val(),
		count = $('div.results.search a[id$=linkCompany]').length;
	
	params = {
		tax_id: main.mode === 'tax_id' ? val : '',
		name: main.mode === 'name' ? val : '',
		index: main.current_index,
		url: href,
		count: count
	};
	
	GM_xmlhttpRequest({
		method: 'POST',
		url: main.store_method,
		data: format_post_params(params),
		headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
		onload: function(response) {
			if (main.current_index < main.data.length - 1) {
				search(main, main.data[main.current_index + 1]);
			};
			// var result = JSON.parse(response);
			// console.log(response);
		}
	});
};

function format_post_params(params) {
	var pairs = [];
	
	for (var key in params) {
		pairs.push(key + '=' + params[key]);
	};
	
	return pairs.join('&');
};

function parametrise_function(fn, params) {
	if (typeof(fn) === 'function') {
		fn = fn.toString();
	};
	
	for (var key in params) {
		var xpr = new RegExp('__' + key + '__', 'g');
		fn = fn.replace(xpr, params[key]);
	};
	
	return fn;
};

function exec(fn) {
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script); // run the script
    document.body.removeChild(script); // clean up
};

// execute the main function
main();
