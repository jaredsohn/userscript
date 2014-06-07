// ==UserScript==
// @name           tumblr easily modify publishing(mod)
// @description    Easily modify publishing option(publish/private) in dashboard for tumblr. tumblr用:ダッシュボードでの公開オプション(publish/private)を簡単に変更
// @version        0.1.1
// @namespace      http://iyouneta.blog49.fc2.com/
// @author         iyoupapa
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/tumblelog/*
// original author     Shark++ / sharkpp
// original namespace  http://www.sharkpp.net/
// original script     http://userscripts.org/scripts/show/54020
// mod description     work with AutoPagerize, status change in async.
// ==/UserScript==

// These three function come from ReblogCommand.user.js.
// ReblogCommand script http://userscripts.org/scripts/show/23365
// author snj14.

function convertToHTMLDocument(html) {
	var xsl = (new DOMParser()).parseFromString(
		'<?xml version="1.0"?>\
		<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">\
		<output method="html"/>\
		</stylesheet>', "text/xml");
	var xsltp = new XSLTProcessor();
	xsltp.importStylesheet(xsl);
	var doc = xsltp.transformToDocument(document.implementation.createDocument("", "", null));
	doc.appendChild(doc.createElement("html"));
	var range = doc.createRange();
	range.selectNodeContents(doc.documentElement);
	doc.documentElement.appendChild(range.createContextualFragment(html));
	return doc;
}

function parseParams(doc) {
	var $X = window.Minibuffer.$X;
	var elms = $X('id("edit_post")//*[name()="INPUT" or name()="TEXTAREA" or name()="SELECT"]', doc);
	var params = {};
	elms.forEach(function(elm) {
		params[elm.name] = elm.value;
	});
	return params;
}

function createPostData(params, change_state) {
	var arr = [];
	for (var param in params) {
		if (param == "post[state]") {
			arr.push(encodeURIComponent(param));
			arr.push("=");
			arr.push(encodeURIComponent(change_state));
			arr.push("&");
		} else
		if (param != "preview_post" && param != "send_to_twitter") {
			arr.push(encodeURIComponent(param));
			arr.push("=");
			arr.push(encodeURIComponent(params[param]));
			arr.push("&");
		}
	}
	return arr.join('');
}

// these two function come from original script amd modified.
function onModifyPublishState(e)
{
	var D  = window.Minibuffer.D;

	var id = this.parentNode.parentNode.id.replace('post', '');
	var change_state = {"private":"private","publish":"0"}[this.innerHTML];
	var prompt = this.innerHTML.substr(0, 1).toUpperCase() +
	             this.innerHTML.substr(1) + ' this post?';

	if (change_state == 'private' || confirm(prompt))
	{
		var d;
		d = D();
		var url = 'http://www.tumblr.com/edit/'+id+'?redirect_to='+location.pathname;
		d.xhttp.get(url).
		next(function(res) {
			var hd = convertToHTMLDocument(res.responseText);
			var pa = parseParams(hd);
			var pd = createPostData(pa, change_state)
			return d.xhttp.post(url, pd);
		}).
		next(function() {
			window.Minibuffer.status('Change '+id, 'status ... done.', 100);
			d.call();
		});
		with (D()) {
			wait(0).next(function() { d.call(); });
		}
	}

	e.preventDefault();
	e.stopPropagation();
}

(function(){
	var fnc = function(doc) {
		var page = doc;
		if (! page) {
			page = document;
		}

		var item, items;

		items
			= document.evaluate(
				".//div[@class='post_controls']",
				page,
				null,
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
				null);

		for (var i = 0; i < items.snapshotLength; i++) {
			item = items.snapshotItem(i);
			item.class = 'oed post_controls';
			var link = item.appendChild(document.createElement('a'));
			link.href = '#';
			link.addEventListener('click', onModifyPublishState, false);
			if( document.evaluate(
					"div[@class='post_info']/span[@class='private_label']",
					item.parentNode, null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null).snapshotLength )
				link.innerHTML = 'publish';
			else
				link.innerHTML = 'private';
		}
	}

	fnc(document);
	if (window.AutoPagerize) {
		boot();
	} else {
		window.addEventListener('GM_AutoPagerizeLoaded',boot,false);
	}

	function boot(){
		window.AutoPagerize.addFilter(function(docs){
			docs.forEach(fnc);
		});
	}

})();

//===============================================================


var win = unsafeWindow;
var doc = document;
var $X = window.Minibuffer.$X;
var D  = window.Minibuffer.D;
[
	// Tombloo Reblog
	{
		name    : 'TumblrModify::Modify',
		command : function(stdin){
			stdin.forEach(function(node){
				var items = $X(".//div[@class='post_controls']/a[last()]", node);
				items.forEach(function(item) {
					var id = item.parentNode.parentNode.id.replace('post', '');
					var change_state = {"private":"private","publish":"0"}[item.innerHTML];
					var prompt = item.innerHTML.substr(0, 1).toUpperCase()
					           + item.innerHTML.substr(1) + ' this post?';
					if (change_state == 'private' || confirm(prompt)) {
						var d;
						d = D();
						var url = 'http://www.tumblr.com/edit/'+id+'?redirect_to='+location.pathname;
						d.xhttp.get(url).
						next(function(res) {
							var hd = convertToHTMLDocument(res.responseText);
							var pa = parseParams(hd);
							var pd = createPostData(pa, change_state)
							return d.xhttp.post(url, pd);
						}).
						next(function() {
							window.Minibuffer.status('Change '+id, 'status ... done.', 100);
							d.call();
						});
						with (D()) {
							wait(0).next(function() { d.call(); });
						}
					}
				});
			});
			return stdin;
		}
	},
].forEach(window.Minibuffer.addCommand);

[
	{
		key : 'y',
		description : 'Tumblr modify',
		command : function(){
			try { var stdin = window.Minibuffer.execute('pinned-or-current-node') }catch(e) {}
			window.Minibuffer.execute('TumblrModify::Modify|clear-pin',stdin);
		}
	},
].forEach(window.Minibuffer.addShortcutkey);
