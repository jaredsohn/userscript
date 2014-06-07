// ==UserScript==
// @name		163 gmail 收件人检查
// @namespace	http://cattailseed.com/163/gmail/check
// @description	163 gmail 收件人检查
// @include *://mail.163.com/*
// @include *://*.mail.163.com/*
// @include *://mail.google.com/*
// @include *://*.mail.google.com/*
// @require http://libs.baidu.com/jquery/1.9.1/jquery.min.js
// @icon	https://www.google.com/favicon.ico
// @run-at	document-end
// @grant	GM_addStyle
// @grant	unsafeWindow
// @version	1.1.3
// @author	cattailseed
// @date	2013-10-11 12:20:03
// ==/UserScript==

!function(){

	// 需要提醒的邮箱
	var domainList = "@qq.com @test.com";
	domainList = domainList.split(' ');

	// 在163中提醒
	function checkInNtes(){

		// 对单个邮箱进行检查
		function processAddr(target){
			target = $(target);
			if (target.hasClass('nui-editableAddr-err'))
				return;
			var showTip = domainList.some(function(domain, i, list){
				return target.attr('title').slice(-domain.length) === domain
			});
			if (showTip){
				target.addClass('nui-editableAddr-waring');
				target.hasClass('nui-addr-hasAdd') && target.find('.nui-addr-add').addClass('nui-editableAddr-waring');
			}
			else {
				target.removeClass('nui-editableAddr-waring');
				target.hasClass('nui-addr-hasAdd') && target.find('.nui-addr-add').removeClass('nui-editableAddr-waring');
			}
		}

		// 添加提醒样式
		!function addCss(){
			GM_addStyle('.nui-editableAddr-waring{ background-color: #FAF2DA; border-color: #ECCF34; color: #FF7F08!important; }');
		}();
		
		// 监听邮箱地址
		!function addMutationObserver(){
			setTimeout(function(){
				if ($('div.js-component-emailcontainer.nui-multiLineIpt.nui-ipt[title^="发给"]').length === 0){
					addMutationObserver();
					return false;
				}
				var target = $('div.js-component-emailcontainer.nui-multiLineIpt.nui-ipt[title^="发给"]')[0];
				var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
				var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
					console.log(mutation.addedNodes[0])
						processAddr(mutation.addedNodes[0]);
					});
				});
				var config = { childList: true};
				observer.observe(target, config);
			}, 1500);
		}();
		
	}

	// 在gmail中提醒
	function checkInGmail (){
	
		// 对单个邮箱进行检查
		function processAddr(target){
			target = target.tagName === 'SPAN' ? $(target) : $(target).find('span[email]');
			var showTip = domainList.some(function(domain, i, list){
				return target.attr('email').slice(-domain.length) === domain
			});
			if (showTip){
				target.addClass('gmail-editableAddr-waring');
				target.find('div:first').length && target.find('div:first').addClass('gmail-editableAddr-waring-color');
			}
			else {
				target.removeClass('gmail-editableAddr-waring');
				target.find('div:first').length && target.find('div:first').removeClass('gmail-editableAddr-waring-color');
			}
		}

		// 添加提醒样式
		!function addCss(){
			GM_addStyle('.gmail-editableAddr-waring{ background-color: #FAF2DA !important; border: 1px solid #ECCF34 !important; border-radius: 3px; color: #FF7F08!important; } .gmail-editableAddr-waring-color{color: #FF7F08!important;}');
		}();
		
		// 监听邮箱地址
		!function addMutationObserver(){
			setTimeout(function(){
				var target = xfind('//form[@enctype="multipart/form-data"]/div[1]//td[2]//textarea/..');
				if (target === null){
					addMutationObserver();
					return false;
				}
				var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
				var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if(mutation.addedNodes && mutation.addedNodes.length && mutation.addedNodes[0].tagName==='DIV'){
							processAddr(mutation.addedNodes[0]);
						}
					});
				});
				var config = { childList: true, subtree: true};
				observer.observe(target, config);
			}, 1500);
		}();
		// 监听邮箱地址
		!function addMutationObserverAddr(){
			setTimeout(function(){
				var target = xfind('//form[@enctype="multipart/form-data"]/div[2]');
				if (target === null){
					addMutationObserverAddr();
					return false;
				}
				var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
				var observer = new MutationObserver(function(mutations) {
					mutations.forEach(function(mutation) {
						if(mutation.addedNodes && mutation.addedNodes.length && mutation.addedNodes[0].tagName==='SPAN'){
							processAddr(mutation.addedNodes[0]);
						}
					});
				});
				var config = { childList: true, subtree: true};
				observer.observe(target, config);
			}, 1500);
		}();
		
	}

	// xpath 查询参数
    var XPath_FIRST = XPathResult.FIRST_ORDERED_NODE_TYPE;
    var XPath_ALL  = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

    // 通过xpath查询节点
    function xfind(xpath, xpres) {
		xpres = xpres || XPath_FIRST;
        var result = document.evaluate(xpath, document, null, xpres, null);
        if (xpres == XPath_FIRST) { return result.singleNodeValue; }
        else if (xpres == XPath_ALL && result.snapshotLength > 0) { return result; }
        else { return false; }
    }
	
	!function(){
		if (location.host.indexOf('mail.163.com') !== -1)
			checkInNtes();
		if (location.host.indexOf('mail.google.com') !== -1)
			checkInGmail();
	}();

}();