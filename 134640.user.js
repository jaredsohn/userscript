// ==UserScript==
// @name           msg
// @namespace      doumail
// @description    Send doumail like crazy
// @resource       jqueryuicss http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/themes/ui-lightness/jquery-ui.css
// @include        http://www.douban.com/doumail/
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @require        http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js
// ==/UserScript==

function addJQuery(callback) {
	var cssTxt = GM_getResourceText("jqueryuicss");
	GM_addStyle(cssTxt);
	GM_addStyle("a:hover { color: white !important; background-color: #0099CC; }");
	
	callback();
}

// the guts of this userscript
function main() {
	var mainPanel = $('<div/>');
	mainPanel.html(' \
		<div><a class="menu-link" id="template-link" href="#template"><span class="status" id="template-status">-</span> 私信模板</a></div> \
		<div id="template"> \
			<p style="margin:4px 0;">使用{{u}}会被替换成用户昵称</p> \
			<input id="templateTitle" style="width:240px;" type="text" name="template_title" placeholder="豆邮标题" value="" /> \
			<textarea id="templateBody" style="width:240px; height:100px; margin-top:5px;" name="template_body" placeholder="豆邮内容" value="" /> \
			<button id="saveBtn">保存</button> \
		</div> \
		<div><a class="menu-link" id="template-link" href="#targets"><span class="status">-</span> 目标用户</a></div> \
		<div id="targets"> \
			<div style="margin:4px 0;">当前用户<a id="current_target" style="color:#0099CC;" href="#"></a>，还剩<span style="color:#0099CC;" id="targets_left">0</span>个</div> \
		</div> \
		<div style=" margin: 10px 0 10px 100px;"><button id="launchBtn">发射！</button><div> \
	');
	mainPanel.attr('title', '发豆邮 V0.01');
	mainPanel.dialog({ autoOpen:true }); // show first or not attached to DOM
	
	var templateTitle = window.localStorage.getItem('templateTitle');
	var templateBody = window.localStorage.getItem('templateBody');
	$('#templateTitle').val(templateTitle);
	$('#templateBody').val(templateBody);
	if (templateTitle) {
		$('#template').toggle();
		$('#template-status').text('+');
		// mainPanel.dialog('option', 'height', 160);
	}
	
	$('.menu-link').click(function(e){
		var link = $(this);
		$($(this).attr('href')).toggle(100, function(){
			var statusEl = link.find('.status');
			statusEl.text(statusEl.text() == '-' ? '+' : '-');
			// mainPanel.dialog('option', 'height', 160);
		});
		return false;
	});
	
	var users = JSON.parse(window.localStorage.getItem('users'));
	$('#targets_left').text(Object.keys(users).length);
	var nickname = null;
	for (var userid in users) {
		nickname = users[userid];
		break;
	}
	$('#current_target').text(nickname);
	
	$('#saveBtn').click(function(e){
		window.localStorage.setItem('templateTitle', $('#templateTitle').val());
		window.localStorage.setItem('templateBody', $('#templateBody').val());
		$('#template').effect('highlight', {}, 300);
	});
	
	var launched = window.localStorage.getItem('launched');
	$('#launchBtn').click(function(e){
		window.localStorage.setItem('launched', true);
		
		var jqxhr = $.get('http://www.douban.com/doumail/write?to=' + userid, function(data){
			if (data.indexOf('书写豆邮') == -1) {
				// user is forbidden
				delete users[userid];
				window.localStorage.setItem('users', JSON.stringify(users));
				window.location.href = 'http://www.douban.com/doumail/';
				return;
			}
			
			var contentLoc = '<div id="content">';
			var contentStart = data.indexOf(contentLoc);
			var contentEnd = data.indexOf('<div id="footer">');
			var contentHTML = data.substr(contentStart + contentLoc.length, contentEnd - contentStart - contentLoc.length);
			var lzform = $('<div/>').html(contentHTML).find('#lzform');
			var formWrapper = $('<div/>');
			formWrapper.append(lzform);
			formWrapper.css({
				'width': '10px',
				'height': '10px',
				'overflow': 'hidden'
			});
			mainPanel.append(formWrapper).append('获取发信表单成功');
			
			var msubject = lzform.find('input[name="m_subject"]');
			var mtext = lzform.find('textarea[name="m_text"]');
			// msubject.css('width', '200px');
			// mtext.css('width', '200px').css('height', '100px');
			templateTitle = templateTitle.replace('{{u}}', nickname);
			templateBody = templateBody.replace('{{u}}', nickname);
			msubject.val(templateTitle);
			mtext.val(templateBody);
			
			var captcha = formWrapper.find('img[alt="captcha"]');
			if (captcha.length > 0) {
				mainPanel.append(captcha.clone());
				var captchaInput = $('<input type="text" id="mycaptcha" />');
				mainPanel.append(captchaInput);
				var captchaGo = $('<button/>');
				captchaGo.text('输入验证码并发送');
				mainPanel.append(captchaGo);
				mainPanel.dialog('option', 'width', 420);
				captchaGo.click(function(e){
					$('input[name="captcha-solution"]').val($('#mycaptcha').val());
					
					// @todo DRY
					delete users[userid];
					window.localStorage.setItem('users', JSON.stringify(users));
					lzform.find('input[name="m_submit"]').click();
				});
			} else {
				// remove current target user
				delete users[userid];
				window.localStorage.setItem('users', JSON.stringify(users));
				lzform.find('input[name="m_submit"]').click();
			}
		});
	});
	
	if (launched) {
		
	}
}

// load jQuery and execute the main function
addJQuery(main);