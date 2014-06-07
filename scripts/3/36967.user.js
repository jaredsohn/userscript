// ==UserScript==
// @name           myBigCity
// @description    adds a button to view your 'myMiniCity' in a large box
// @namespace      myBigCity
// @author         da.dub
// @version        1.1
// @include       *.myminicity.com*
// ==/UserScript==

window.addEventListener('DOMContentLoaded', main, false);
if (document.body) main();

function main() {
	
	var dom = DOMUtils();
	
	var insertPoint = dom.xs('//div[@class="menu"]');
	
	var link = dom.cn("a");
		link.className = 'button largeBtn';
		link.href = 'javascript:void(0)';
		link.addEventListener(	'click', bigClient, false);
	
	var txt = dom.ct("Big City");
	link.appendChild(txt);
	
	insertPoint.appendChild(link);

}

function bigClient() {

	var dom = DOMUtils();
	
	
	var cl = dom.cn('div');
		cl.id = 'bigCity';
		cl.style.position = 'absolute';
		cl.style.top = '0px';
		cl.style.left = '0px';
		cl.style.width = document.width - 20;
		cl.style.textAlign = 'right';
		cl.style.backgroundColor = '#BCD7FE';
		cl.style.padding = '10px';
		
	var bt = dom.cn('a');
		bt.style.color = '#457DCF';
		bt.href = 'javascript:void(0)';
		bt.addEventListener('click', closeBigClient, false);
	
	var txt  = dom.ct("CLOSE");
	
		bt.appendChild(txt);
	
	var bigCl = dom.id('client').cloneNode(false);
		bigCl.height = screen.height-40;
		bigCl.width = document.width - 20;
		
		
		cl.appendChild(bt);
		cl.appendChild(bigCl);
		
	dom.id('global').style.display = 'none';
	dom.xs('//body').appendChild(cl);

}

function closeBigClient() {

	var dom = DOMUtils();
	dom.id('global').style.display = 'block';
	dom.xs('//body').removeChild(dom.id('bigCity'));
}

function DOMUtils() {
	var obj = new Object();

	obj.document = document;
	obj.context = document;

	obj.initDocument = initDocument;
	obj.initResponse = initResponse;

	obj.cn = cn;
	obj.ct = ct;
	
	obj.id = id;
	obj.xs = xs;
	obj.xa = xa;

	return obj;
	
	function initDocument(document, context) {
		if (!context) context = document;
		this.document = document;
		this.context = context;
	}

	function initResponse(response) {
		var ans = this.document.createElement('div');
		ans.innerHTML = response;
		var ansDoc = this.document.implementation.createDocument('', '', null);
		ansDoc.appendChild(ans);
		this.initDocument(ansDoc, ans);
	}

	function cn(tag, content) {
		var elem = this.document.createElement(tag);
		if (content) elem.innerHTML(content);
		return elem;
	}

	function ct(text) {
		return this.document.createTextNode(text);
	}

	function id(name) {
		return this.document.getElementById(name);
	}

	function xs(expr) {
		var res = this.document.evaluate(expr, this.context, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return res.singleNodeValue;
	}
	
	function xa(expr) {
		var arr = [];
		var xpr = this.document.evaluate(expr, this.context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; item = xpr.snapshotItem(i); i++)
			arr.push(item);
		return arr.length == 0? null: arr;
	}
}
