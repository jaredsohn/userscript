// ==UserScript==
// @name           HC_reloadPageWhenError
// @namespace      http://my.hoopchina.com/358/
// @description    automatically reload current page when there is error prompt that you have refreshed too fast
// @include        http://bbs.hoopchina.com/*
// @copyright     2009, totu
// @version        1.0
// ==/UserScript==

//---------------------------------------------------------------------------------------------------
//== 说明 ==
//目的：	有时正常操作过程中打开新页面时会提示刷新太快导致错误要求返回上一页或首页
//		通过安装此脚本可在上述情况下自动重载目标页面，省去刷新等手工操作
//---------------------------------------------------------------------------------------------------

	
	var hasTip = 0;
	var divTips = document.evaluate(
	"//div[@class='t_tips']",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	//alert("tips snapshotLength:	" + divTips.snapshotLength);
	if(divTips.snapshotLength == 1){
		hasTip = 1;
		//alert("t_tip found");
	}
	
	
	var hasDescr = 0;
	var descrPatrn = ".*\u5237\u65b0.*\u8bf7\u8fd4\u56de\u3002$";	// "刷新"	"请返回。"
	var regDescr = new RegExp(descrPatrn, "g");
	var spans = document.evaluate(
	"//div[@class='t_tips']/h4/span",
	document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
	//alert("spans found:	" + spans.snapshotLength);

	for (var i = 0; i < spans.snapshotLength; i++) {
		var thisSpan = spans.snapshotItem(i);
		//alert(thisSpan.innerHTML);
		if(regDescr.exec(thisSpan.innerHTML)){
		hasDescr = 1;
		//alert("message match");
		}
	}
	
	if(hasTip && hasDescr){
		var curURL = window.location.href;
		window.location.href = curURL;
	}


