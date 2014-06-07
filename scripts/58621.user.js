// ==UserScript==
// @name           Amazon Soka Cross Check
// @namespace      http://monta.ampomtan.com/
// @include        http://www.amazon.co.jp/*
// @include        http://amazon.co.jp/*
// ==/UserScript==

// based on http://d.hatena.ne.jp/drillhands/20080507/1210152335

var SITEINFO = [
	{
		label: '\u5275\u4FA1\u5927\u5B66\u4E2D\u592E\u56F3\u66F8\u9928',
		url: 'http://jweb2.j.soka.ac.jp/scripts/mgwns30.so?MGWLPN=OPAC&NSPACE=SCL&isbn=',
		regxp: /<td>(\u8CB8.*)<\/td>/,
		count: /<td>(\u4E2D\u592E)<\/td>/g,
	},
]

var CONF = [
	{	
		type: 'wishlist',
		urlExp: '/wishlist/',
		insertAfter: '//tbody[@name]/descendant::tbody[1]/tr[last()]',
		asinLink: '//td[@class="small"]/strong/a',
		autoStart: false
	},
	{
		type: 'search',
		urlExp: 'keywords=',
		insertAfter: '//div[@class="productData"]/*[last()]',
		asinLink: '//div[@class="productData"]/div[1]/a',
		autoStart: false
	},
	{
		type: 'bestsell',
		urlExp: '/bestsellers/',
		insertAfter: '//table[@class="priceBox"]/tbody/tr[last()]',
		asinLink: '//strong[@class="sans"]/a',
		autoStart: false
	},
	{
		type: 'recommend',
		urlExp: '/yourstore/',
		insertAfter: '//table[@class="priceBox"]/tbody/tr[last()]',
		asinLink: '//td[@width="100%"]/a',
		autoStart: false
	},
	{
		type: 'listmania',
		urlExp: '/lm/',
		insertAfter: '//td[@class="listItem"]/table/*[last()]',
		asinLink: '//td[@class="listItem"]/a',
		autoStart: false
	},

]

var STYLE = <><![CDATA[
	.ACBC {
		color: #000;
		font-size: 13px;
		display: inline;
		margin-left: 2px;
	}
	.ACBC_found {
		color: #990000 !important;
		font-weight: bold;
		font-family: arial,verdana,helvetica,sans-serif !important;
	}
	.ACBC_notFound {
		color: #666;
	}
	.ACBC_loading {
		color: #39c;
	}
	.parseasinTitle {
		margin-bottom: 5px;
	}
]]></>

function Checker(pageType) {
	this.pageType = pageType;
	this.index = 0;
}

Checker.prototype.run = function() {
	var info = GM_getValue("siteinfo", false);
	if (info) SITEINFO.push(eval(info));
	GM_addStyle(STYLE);
	if (this.pageType == 'detail') {
        var t = document.getElementById('btAsinTitle');
        if (!t) return;
        var target = t.nextSibling;
        var isbn = getISBN(document.location.href);
		var item = new Item(isbn, target);
		item.load();
		GM_registerMenuCommand('ACBC - register', function() {
			var info = prompt("Enter your siteinfo.");
			if (info != null && info.length > 0) GM_setValue("siteinfo", eval("("+info+")").toSource());
		});
	} else {
	    this.setIteration(this.pageType);
	}
}

Checker.prototype.setIteration = function(conf) {
	if (conf.autoStart) {
		this.iterate(conf);
	} else {
		var self = this;
		GM_registerMenuCommand('ACBC - start', function() {
			self.iterate(conf);
		});
	}
}

Checker.prototype.iterate = function(conf) {
	var self = this;
	var f = function() {
		var targets = getElementsByXPath(conf.insertAfter, document);
		var links = getElementsByXPath(conf.asinLink, document);
		for (var i = self.index, len = targets.length; i < len; i++) {
			var isbn = getISBN(links[i].href);
			if (!isbn) continue;
			var item = new Item(isbn, targets[i]);
			item.load();
		}
		self.index = len;
	}
	f();
	if (window.AutoPagerize) window.AutoPagerize.addFilter(f);
}

function Item(isbn, target) {
	this.isbn = isbn;
	this.target = target;
	this.nodes = [];
	this.counter = 0;
}

Item.prototype.load = function() {
	var self = this;
	self.displayMessage();
	
	for (var i = 0, len = SITEINFO.length; i < len; i++) {
		var f = function(n) {
			var info = SITEINFO[n];
			var url = self.buildURL(info);
			GM_xmlhttpRequest({
		        method: 'get',
		        url: url,
		        onload: function(res) {
		    		var content = self.getContent(res, info, url);
		            self.nodes[n] = self.createRow(content);
		            self.counter++;
		            if (self.counter == len) self.insertInfo();
		        }
			})
		}
		f(i);
	}
}

Item.prototype.displayMessage = function() {
	var message = this.createRow("<span class='ACBC_loading'>loading...</span>");
	this.target.parentNode.insertBefore(message, this.target.nextSibling);
}

Item.prototype.buildURL = function(info) {
	var url = (info.isbn13)? info.url + conv2ISBN13(this.isbn) : info.url + this.isbn;
	if (info.afterISBN) url += info.afterISBN;
	return url;
}

Item.prototype.getContent = function(res, info, url) {
	var text = "<br /><span class='ACBC'>" + info.label + ": ";
	if (res.responseText.match(info.regxp)) {
		var price = (RegExp.$1.length > 0)? RegExp.$1 : "Found";
		text += "<a href='" + url + "' title='Found!' class='ACBC_found'>" + price + "</a>";
    } else {
    	text += "<span class='ACBC_notFound'>NotFound</span>";
    }
    
    //��J�E���g�A�Z��Ƃ���J�E���g�������Ă��܂������Ȃ��̂ŕ�u
    var matches = res.responseText.match(info.count);
    if (matches) {
    	var c = matches.length;
    	//alert(c);
		text += c + "\u518A";
    }
	
    //alert(c);
    //text += s;
    text += "</span>";
    return text;
}

Item.prototype.createRow = function(str) {
	//var tr = document.createElement("tr");
	//var td = document.createElement("td");
	//td.innerHTML = str;
	//tr.appendChild(td);
	
	//var tr = document.createElement("br");
	var tr = document.createElement("span");
	tr.innerHTML = str;
	//alert(tr);
	return tr;
}

Item.prototype.insertInfo = function() {
	this.target.parentNode.removeChild(this.target.nextSibling);
	for (var i = this.nodes.length - 1; i >= 0; i--) {
		this.target.parentNode.insertBefore(this.nodes[i], this.target.nextSibling);
	}
}

function getPageType(url) {
	for (var i = 0, len = CONF.length; i < len; i++) {
    	var conf = CONF[i];
    	if (url.indexOf(conf.urlExp) != -1) return conf;
    }
    if (getISBN(url)) return 'detail';
    return false;
}

function getISBN(str) {
	if (str.match(/[\/\=]([\dX]{10})[\/\?\&]/)) return RegExp.$1;
}

//----main----

var pageType = getPageType(document.location.href);
if (pageType) {
	var checker = new Checker(pageType);
	checker.run();
}

//----utility----

function conv2ISBN13(str) {
    var result = "978" + str.substr(0,9);
    var checkDigit = 38;
    for (var i = 0; i < 9; i++) {
        var c = str.charAt(i);
        checkDigit += ( i % 2 == 0 )? c * 3 : c * 1;
    }
    checkDigit = (10 - (checkDigit % 10)) % 10;
    result += checkDigit;
    return result;
}

function getElementsByXPath(xpath, doc) {
    var nodes = doc.evaluate(xpath, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var data = [];
	for (var i = 0, len = nodes.snapshotLength; i < len; i++) {
  		data.push(nodes.snapshotItem(i));
	}
	return data;
}

function log(message) {
    if (typeof console == 'object') console.log(message);
}