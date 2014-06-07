// ==UserScript==
// @name           doumail
// @namespace      doumail
// @description    Send doumail like crazy
// @resource       jqueryuicss http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/themes/ui-lightness/jquery-ui.css
// @include        http://www.douban.com/group/*/members
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js
// ==/UserScript==

function addJQuery(callback) {
	var cssTxt = GM_getResourceText("jqueryuicss");
	GM_addStyle(cssTxt);
	GM_addStyle("a:hover { color: white; background-color: #0099CC; }");
	
	callback();
}

/**
 * Crawl users listed on the page and store them into local storage
 * 
 */
function crawlUsers(groupUrl, page)
{
	
}

// the guts of this userscript
function main() {
	var mainPanel = $('<div/>');
	mainPanel.html(' \
		<div><a class="menu-link" href="#settings"><span class="status" id="settings-status">-</span> 设置</a></div> \
		<div id="settings"> \
			<input id="groupUrl" style="width:320px;" type="text" name="group_url" placeholder="小组链接" value="" /> \
			<p style="margin-top:4px;"><input id="page_from" style="width:40px;" type="text" name="from" value="1" /> <input id="page_to" style="width:40px;" type="text" name="to" placeholder="页数" value="5" /> \
			<button id="crawlBtn">抓取用户</button></p> \
		</div> \
	');
	mainPanel.attr('title', '发豆邮 V0.01');
	mainPanel.dialog({ autoOpen:true, width:'360px' }); // show first or not attached to DOM
	
	$('#groupUrl').val(window.location.href);
	
	$('.menu-link').click(function(e){
		var link = $(this);
		$($(this).attr('href')).toggle(100, function(){
			var statusEl = link.find('.status');
			statusEl.text(statusEl.text() == '-' ? '+' : '-');
		});
		return false;
	});
	
	$('#crawlBtn').click(function(e){
		var groupUrl = $('#groupUrl').val();
		if (groupUrl == '') return;
		
		window.localStorage.removeItem('users');
		
		if ($('#progressbar').length == 0) {
			mainPanel.append('<div id="progressbar"><span id="current_page">' + $('#page_from').val() + '</span>/<span id="end_page">' + $('#page_to').val() + '</span></div>');
		} else {
			$('#current_page').html($('#page_from').val());
			$('#end_page').html($('#page_to').val());
		}
		
		// $('#crawlBtn').text('暂停');
		var pageFrom = parseInt($('#page_from').val());
		var pageTo = parseInt($('#page_to').val());
		var step = 0;
		var when = $.when({});
		for (var i=pageFrom-1; i<pageTo; ++i) {
			
			when = when.pipe(function(){
			
				var currentPage = pageFrom + step - 1;
				var pageUrl = currentPage == 0 ? groupUrl : groupUrl + '?start=' + 35*currentPage;
				
				var jqxhr = $.get(pageUrl, function(data){
					var members = $('<div/>');
					var bodyLoc = '<div class="article">';
					var bodyStart = data.indexOf(bodyLoc);
					var bodyEnd = data.indexOf('<div class="paginator">');
					var body = data.substr(bodyStart + bodyLoc.length, bodyEnd - bodyStart - bodyLoc.length);
					members.html(body);
					
					var peopleLinks = members.find('a[href*="people"]:has("img")');
					var peopleIds = {};
					
					peopleLinks.each(function(index, link){
						link = $(link);
	
						// first, try to get user id from user's avatar
						var imgsrc = $('img', link).attr('src');
						var imgarr = imgsrc.split('icon/u');
						var userid = imgarr[1].split('-')[0];
						var nickname = $('img', link).attr('alt');
						if (nickname == '[已注销]') return;
	
						var idPattern = /\d+/;
						if (!idPattern.test(userid)) {
							// try to get user id from user's link
							var href = link.attr('href');
							var hrefarr = href.split('people/');
							userid = hrefarr[1].substr(0, hrefarr[1].length - 1);
						}
						if (!idPattern.test(userid)) return;
						if (!peopleIds[userid]) {
							peopleIds[userid] = nickname;
						}
					});
					
					var users = window.localStorage.getItem('users');
					if (!users) {
						users = {};
					} else {
						users = JSON.parse(users);
					}
					users = $.extend({}, users, peopleIds);
					window.localStorage.setItem('users', JSON.stringify(users));
					
					$('#current_page').text(pageFrom+step);
					++step;
				});
				return jqxhr;
			});
		}
		
		when.done(function(e){
			var users = JSON.parse(window.localStorage.getItem('users'));
			if (confirm('用户已获取，现在前往收件箱开始发送？')) {
				window.location.href = 'http://www.douban.com/doumail/';
			}
		});
	}); // done with click
}

// load jQuery and execute the main function
addJQuery(main);