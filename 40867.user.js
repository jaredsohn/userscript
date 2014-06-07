// ==UserScript==
// @name           Douban 9taps Hotkeys
// @namespace      http://sakinijino.blogbus.com
// @include        http://9.douban.com/reader/
// @include        http://9.douban.com/reader/#/*
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         Saki
// @version        0.9
// ==/UserScript==

var thisScript = {
	name: "Douban 9taps Hotkeys",
	id: "40867",
	version:"0.9"
}
var updater = new Updater(thisScript);
updater.check();

var $ = unsafeWindow.$
var items = function(i){
	if (i==null) return $("#zblog_main div.zblog_item")
	else return $($("#zblog_main div.zblog_item")[i])
}
items.addfun = function(n, f){
	items().each(function(index, uwitem){
		var item = $(uwitem);
		item.data(n, (function(i){return function(){return f.call($(i))}})(uwitem));
	})
}

var current_item = null;

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('#zblog_main .current-entry {border:#6688EE solid 2px;}');

function init_hotkey(){
	if (items(0) == null) return;
	items.addfun("hk_focus", function(){
		this.addClass('current-entry');
	});
	items.addfun("hk_unfocus", function(){
		this.removeClass('current-entry');
	});
	items.addfun("hk_expand", function(){
		var is_expanded = this.find("div.blog_item_content").css("display") == "block";
		if (!is_expanded) this.find("a.zblog_item_title").click()
	});
	items.addfun("hk_unexpand", function(){
		var is_expanded = this.find("div.blog_item_content").css("display") == "block";
		if (is_expanded) this.find("a.zblog_item_title").click()
	});
	items.addfun("hk_toggle_expand", function(){
		this.find("a.zblog_item_title").click()
	});
	items.addfun("hk_next", function(){
		var _next = this.next();
		return (_next.get()!="" && _next.hasClass('zblog_item')) ? _next : this;
	});
	items.addfun("hk_prev", function(){
		var _prev = this.prev();
		return (_prev.get()!="" && _prev.hasClass('zblog_item')) ? _prev : this;
	});
	items.addfun("hk_get_view_url", function(){
		var id = this.find("b.hide:first b").attr("id").split('_')[1];
		return "http://9.douban.com/site/entry/"+id+"/view"
	});
	items.addfun("hk_get_recs_url", function(){
		var id = this.find("b.hide:first b").attr("id").split('_')[1];
		return '/reader/rec_article?article='+id
	});
	current_item = items(0);
	current_item.data("hk_focus")();
}

function clear_hotkey(){
	current_item = null;
}

unsafeWindow._read = unsafeWindow.read;
unsafeWindow.read = function(e, id, type) {
	unsafeWindow._read(e, id, type);
	clear_hotkey();
}
unsafeWindow.read_load = function(url, data) { 
	data = data || {}; 
	loading_url = url; 
	$.ajax({
		url: url, 
		data: data, 
		success: function (d) {
			unsafeWindow.tip.hide();
			if (loading_url != url) {return;}
			$("#read_content").html(d);
			init_hotkey();
		}
	}); 
}

unsafeWindow.page = function(begin) {
	var url = "/reader/j_read_" + unsafeWindow.session.read_type + "_content"
	var data = {begin: begin}, opt = $("#now_read_opt"), ztip = $(unsafeWindow.loading_tip), rc = $("#read_content"); 
	opt.hide();
	rc.prepend(ztip);
	if (unsafeWindow.session.id) { data.id = unsafeWindow.session.id; } 
	unsafeWindow.loading_url = url; 
	document.documentElement.scrollTop = 100; 
	$.ajax({
		url: url, 
		data: data, 
		success: function (data) {
			if (unsafeWindow.loading_url != url) {return;}
			$("#zblog_main").replaceWith($(data));
			if (1 == unsafeWindow.session.page_stack.length) {$("#pre_page").remove();}
			ztip.remove();
			opt.show();
			init_hotkey();
		}
	}); 
}

$(document).keypress(function(e){
	if (current_item == null) return;
	if (e.which == 'n'.charCodeAt(0)) {
		current_item.data('hk_unfocus')();
		current_item = current_item.data('hk_next')()
		current_item.data('hk_focus')();
	}
	else if (e.which == 'p'.charCodeAt(0)) {
		current_item.data('hk_unfocus')();
		current_item = current_item.data('hk_prev')()
		current_item.data('hk_focus')();
	}
	else if (e.which == 'j'.charCodeAt(0)) {
		current_item.data('hk_unfocus')();
		current_item.data('hk_unexpand')();
		current_item = current_item.data('hk_next')()
		current_item.data('hk_focus')();
		current_item.data('hk_expand')();
	}
	else if (e.which == 'k'.charCodeAt(0)) {
		current_item.data('hk_unfocus')();
		current_item.data('hk_unexpand')();
		current_item = current_item.data('hk_prev')()
		current_item.data('hk_focus')();
		current_item.data('hk_expand')();
	}
	else if (e.which == 'o'.charCodeAt(0) || e.which == 13) {
		current_item.data('hk_toggle_expand')();
	}
	else if (e.which == 'v'.charCodeAt(0)) {
		window.open(current_item.data('hk_get_view_url')());
	}
	else if (e.which == 's'.charCodeAt(0)) {
		unsafeWindow.pop_win.load(current_item.data('hk_get_recs_url')());
	}
	else if (e.which == 'N'.charCodeAt(0)) {
		$("#next_page").click();
	}
	else if (e.which == 'P'.charCodeAt(0)) {
		$("#pre_page").click();
	}
})

if (unsafeWindow.location.href.match(/http:\/\/9.douban.com\/reader\/#\/tag_\d+/)) init_hotkey();
