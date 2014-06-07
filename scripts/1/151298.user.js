// ==UserScript==
// @name        sales
// @namespace   nickmit
// @run-at	document-start
// @include     http://item.taobao.com/item.htm*
// @include     http://all4kiz.taobao.com/*
// @include     http://shop64985614.taobao.com /*
// @include     http://trade.taobao.com/trade/modify_deliver_address.htm?*
// @require	http://code.jquery.com/jquery-1.7.1.min.js
// @require	http://csr.100usa.com//scripts/showhint.js
// @require	http://csr.100usa.com/scripts/sddm.js
// @require	http://csr.100usa.com/scripts/date.js
// @require	http://csr.100usa.com/tiny_mce/tiny_mce.js
// @grant	GM_xmlhttpRequest
// @version     1.1
// ==/UserScript==

var num_iid;
preload();

function remove_junk_url() {
	var tmp = location.href.split('?');
	var base = tmp[0];
	if (tmp.length == 1 || base != 'http://item.taobao.com/item.htm')
		return;

	tmp = tmp[1].split('&');
	tmp.forEach(function(x) {
		var pair = x.split('=');
		if (pair[0] == 'id') {
			var url = base + '?' + x;
			num_iid = pair[1];
			if (url != location.href)
				location.href = url;
		}
	})
}

function preload() {
	remove_junk_url();
	window.onerror = function(msg, url, line) {
		console.log('error : ' + msg + '\nline : ' + line + '\nurl : ' + url);
		console.trace();
		return false;
	}

	jQuery('div#J_TabBarWrap').ready(function() {
		var req = {
			                method : "GET",
			                url : 'http://csr.100usa.com/sales_note.php?action=get&num_iid=' + num_iid,
			                onload : append_sales_note
			}
		GM_xmlhttpRequest(req);
	})
	
	if (location.href == "http://all4kiz.taobao.com/" || location.href == "http://shop64985614.taobao.com") {
		$('div#hd').ready(append_search_bar);
	}
	
	if (location.href.match('http://trade.taobao.com/trade/modify_deliver_address.htm')) {
	   $('#J_Area').css('display', '');
	}
}

function show_search_result(resp) {
	var ret;
	try {
		ret = JSON.parse(resp.responseText);
		console.log(ret);
		if (ret.data.length == 0)
			return;
		
		var w = window.open();
		var doc = w.document;

		ret.data.forEach(function (x) {
			var span = $('<span style="margin: 10px" />');
			var a = $('<a target="_blank" href="http://item.taobao.com/item.htm?id=' + x.num_iid + '" />');
			a.append('<img title="' + x.title + '"src="' + x.picUrl + '_120x120.jpg" />');
			span.append(a);
			doc.write(span[0].outerHTML);
		})
		doc.close();
	} catch (ex) {
		alert();
		console.log(resp.responseText);
		console.log(ex);
	}	
}

function search_csr() {
	var data = {
			month : $('div#search_csr input[name=month]').val(),
			keyword : $('div#search_csr input[name=keyword]').val()
	}
	var req = {
		                method : "POST",
		                url : 'http://csr.100usa.com/sales_note.php?action=search_item',
		                data : $.param(data, true),
		                headers : {
			                "Content-Type" : "application/x-www-form-urlencoded"
		                },
		                onload : show_search_result
		}
	GM_xmlhttpRequest(req);
}

function append_search_bar() {
	var all = $('<div id="search_csr" style="margin: 20px auto; width:950px; color: pink; font: 14px bold msyh;"> \
			<span>月龄:</span><input name="month" /><span>关键字：</span><input name="keyword" /><a href="javascript: void(0)" class="J_TSubmitBtn btn">搜索</a> \
			</span>' );
	$('div#bd').prepend(all);
	$('div#search_csr a').click(search_csr);
}

function append_sales_note(resp) {
	var result = JSON.parse(resp.responseText);
	var data, age = ''
	var note = '<p>暂无销售说明</p>';

	var all = $('<div style="width: 740px; display: inline-block; padding: 5px;margin-bottom:20px; border: 2px solid red" />');
	var form = $('<form name="edit_note" target="_blank" method="post" action="http://csr.100usa.com/sales_note.php" accept-charset="UTF-8"/>');
	form.append('<input type="hidden" name="action" value="edit" />');
	form.append('<input type="hidden" name="num_iid" value="' + num_iid + '" />');
	form.append('<input type="hidden" name="title" value="' + $('div.tb-detail-hd h3').text() + '" />');
	form.append('<input type="hidden" name="pic_path" value="' + $('div.tb-gallery img').attr('src') + '" />');

//	console.log($('div.tb-detail-hd h3').text());
	all.append(form);
	all.append('<div><a id="edit_note" style="float:right; margin: 10px; font: 24px 黑体;" target="_blank" href="javascript: void(0)">编辑</a><a id="hide_note" style="float:right; margin: 10px; font: 24px 黑体;" href="javascript: void(0)">隐藏</a></div>');

//	console.log(result);
	if (result.code == 0 || result.num > 0) {
		data = result.data[0];
		if (data) {
			note = data.sales_note;
			if (data.r_age_min != 0) {
				if (data.r_age_max != 0)
					age = data.r_age_min + ' 至 ' + data.r_age_max + ' 个月';
				else
					age = data.r_age_min + '  个月起 ';
			} else {
				if (data.r_age_max != 0)
					age = data.r_age_max + ' 个月以下';
			}

			if (age)
				age = '<span style="font: bold 20px 微软雅黑; color: red">适用月龄：' + age + '</span><br />';
		}
	}

	all.append('<div id="sales_note" style="display:none" >' + age + note + '</div>');
	$('div#J_TabBarWrap').before(all);
	$('a#hide_note').click(function() {
		if ($('div#sales_note').css('display') == 'inline-block') {
			$('a#hide_note').text('显示');
			$('div#sales_note').css('display', 'none');
		} else {
			$('a#hide_note').text('隐藏');
			$('div#sales_note').css('display', 'inline-block');
		}
	})

	$('a#edit_note').click(function() {
		$('form[name=edit_note]').submit();
		return false;
	})
}

