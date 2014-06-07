// ==UserScript==
// @name           No.iframe.for.YSSY
// @namespace      http://teamo.me
// @description    No.iframe.for.YSSY, trying to provide an iframe alternative. Do not use it, it's ugly.
// @match          https://bbs6.sjtu.edu.cn/*
// @match          https://bbs.sjtu.edu.cn/*
// @match          https://bbs.sjtu.cn/*
// @match          http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

(function(){
	if(!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^\s+|\s+$/g,'');
		};
    }
	function recent(sCurrent){
		var sBase='1.7';
		//$([]).on() works on 1.6 and after
		var aBase=sBase.split('.');
		var aCurrent=sCurrent.split('.');
		for(var i=0;i<aBase.length;++i){
			//console.log([parseInt(aBase[i]||0),parseInt(aCurrent[i]||0)]);
			if(parseInt(aBase[i]||0,10)>parseInt(aCurrent[i]||0,10)){
				return false;
			}
		}
		return true;
	}
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
	function main(){
		jQuery(function ($) {
			if (window.location.pathname !== '/file/bbs/index/index.htm') {
				if (window.location.pathname === '/frame2.html') {
					window.location.pathname = '/php/bbsindex.html';
					return !0;
				}
				var CONSTANTS = {
					links: {
						common: [{
							"url": "/php/bbsindex.html",
							"name": "WEB导读"
						}, {
							"url": "/bbssec",
							"name": "分类讨论区"
						}, {
							"url": "/bbstopb10",
							"name": "热门讨论区"
						}],
						user: [{
							"url": "/bbsshowhome?boardfile=main.hck",
							"name": "个人收藏夹"
						}, {
							"url": "/bbsmail",
							"name": "个人信件"
						}, {
							"url": "/bbsfind",
							"name": "文章查询"
						}, {
							"url": "/bbslogout",
							"name": "退出"
						}]
					},
					nav: {
						start:'<div style="text-align:right;margin:0 10%">',
						guest:'<form action=/bbslogin target=_top method=post style="display:inline">帐号 <input type=text name=id> 密码 <input type=password name=pw> <input type=submit value=登录> <input type="button" onClick=window.open("/bbsreg","","width=620,height=550") value="注册"></form> <form style="display:inline" action=/bbssel>选择讨论区: <input type=text name=board><input type=submit value=go></form> ',
						user:'<div style="text-align:right;margin:0 10%"><form style="display:inline" action=/bbssel>选择讨论区: <input type=text name=board><input type=submit value=go></form>',
						end:'</div>'
					}
				};
				$.get('/bbsfoot', function (data) {
					$('body>:last-child').css('margin-bottom', '30px');
					var navbar, footer, links, footerDom;
					navbar=CONSTANTS.nav.start;
					if (data.indexOf('guest') > 0) {
						links = CONSTANTS.links.common;
						navbar += CONSTANTS.nav.guest;
					} else {
						links = CONSTANTS.links.common.concat(CONSTANTS.links.user);
						navbar += CONSTANTS.nav.user;
					}
					for (var i in links) {
						if (links[i].url && links[i].name) {
							navbar += ' <a href="' + links[i].url + '">' + links[i].name + '</a> ';
						}
					}
					navbar += CONSTANTS.nav.end;
					$('body').prepend(navbar);
					footer = $(data).find('table').css({
						'width': '100%',
						'background': '#F9F',
						'position': 'fixed',
						'bottom': '0'
					}).wrap('<div>').parent().html();
					footer = footer.replace(/href="bbs/g, 'href="/bbs');
					footerDom = $(footer).appendTo($('body'));
				});
			}
		});
	}
	((typeof jQuery!=='undefined')&&recent(jQuery.fn.jquery)&&!jQuery.browser.webkit)?main():addJQuery(main);
})();