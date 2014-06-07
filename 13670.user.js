// ==UserScript==
// @name           Dynamic Item Search
// @namespace      wowhead
// @description    Wieners();
// @include        http://www.wowhead.com/?dsearch*
// ==/UserScript==

var wut = unsafeWindow.ge('main-contents');
var h1 = unsafeWindow.ce('h1');
var div = unsafeWindow.ce('div');
var divSearch = unsafeWindow.ce('div');
var divWrapper = unsafeWindow.ce('div');
var divSearchForm = unsafeWindow.ce('form');
var divSearchInputText = unsafeWindow.ce('input');

wut.innerHTML = '';
document.title='Dynamic Item Search';
h1.innerHTML = 'Dynamic Item Search';

div.className = 'text';
div.id = 'text';

divSearchForm.action = "javascript:;";
divSearchInputText.addEventListener('keyup', function(){ CheckDelay.process(document.getElementById('testing').value);}, false);
divSearchInputText.type = 'text';
divSearchInputText.id = 'testing';
divSearchInputText.size = '30';
divSearchInputText.maxLength = '30';

divSearch.style.paddingLeft = '20px';
divSearch.style.paddingBottom = '20px';

divWrapper.id = 'lv-items';

unsafeWindow.ae(divSearchForm, divSearchInputText)
unsafeWindow.ae(divSearch, divSearchForm)
unsafeWindow.ae(div, h1);
unsafeWindow.ae(div, divSearch);
unsafeWindow.ae(div, divWrapper);
unsafeWindow.ae(wut, div);

function Success(query, data, data2) {
	if(data.length == 1) { 
		PullSingleDataFromPage(data[0].id);
		return; 
	}
	var _ = unsafeWindow.g_items;
	var divWrapper = unsafeWindow.ge('lv-items');

	divWrapper.className ='listview';
	divWrapper.style.width = '';
	divWrapper.innerHTML = '';
	
	eval(data2)
	
	new unsafeWindow.Listview({template: 'item', id: 'items', data: data})
}

function Success2(data) {
	var divWrapper = unsafeWindow.ge('lv-items');
	divWrapper.className ='';
	divWrapper.innerHTML = '';
	divWrapper.style.width = '300px';
	divWrapper.innerHTML = data;
	divWrapper.getElementsByTagName('div')[0].style.visibility = 'visible';
}

function Fail() {
	var divWrapper = unsafeWindow.ge('lv-items');
	divWrapper.className ='listview';
	divWrapper.style.width = '';
	divWrapper.innerHTML = 'Not Found.';
}

function PullDataFromPage(item) {
	if(item.match(/id: [0-9]+/)) { PullSingleDataFromPage(item.match(/id: ([0-9]+)/)[1]); return; }
	GM_xmlhttpRequest({
		query: item,
		method: 'GET',
		url: "http://www.wowhead.com/?search="+item+"",
		onload: function(responseDetails) {
			var page = responseDetails.responseText
			if(page.match(/<div id="tt.*".*>\n(.*?)\n<\/div>/)) {
				Success2(page.match(/<div id="tt.*".*>\n(.*)\n<\/div>/)[0]);
			} else if(page.match(/new Listview\({template: 'item', .*data:(.*?)}\);/)) {
				var items = eval(page.match(/new Listview\({template: 'item', .*data:(.*?)}\);/)[1]);
				var item_info = page.match(/var _ = g_items;\n(.*?)\n/)[1];
				Success(this.query, items, item_info);
			} else {
				Fail()
			}
		}
	});
}

function PullSingleDataFromPage(item) {
	GM_xmlhttpRequest({
		query: item,
		method: 'GET',
		url: "http://www.wowhead.com/?item="+item+"",
		onload: function(responseDetails) {
			var page = responseDetails.responseText
			if(page.match(/<div id="tt.*".*>\n(.*?)\n<\/div>/)) {
				Success2(page.match(/<div id="tt.*".*>\n(.*)\n<\/div>/)[0]);
			} else {
				Fail()
			}
		}
	});
}


var CheckDelay = { 
	_timeoutId: 0,
	_process: function (params) { PullDataFromPage(params) },
	process: function (params) { 
		clearTimeout(this._timeoutId); 
		var me = this; 
		this._timeoutId = setTimeout(function(){ me._process(params); }, 750);
	} 
};