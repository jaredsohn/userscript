// ==UserScript==
// @name        TaobaoKe
// @description	淘宝客代码获取(自动转换成你自己的推广链接)
// @namespace   Blueria
// @include		http://item.taobao.com/*
// @include		http://detail.tmall.com/*
// @include		http://www.alimama.com/union/spread/common/allCode.htm*
// @require		http://code.jquery.com/jquery.min.js
// @updateURL	https://userscripts.org/scripts/source/157559.meta.js
// @downloadURL	https://userscripts.org/scripts/source/157559.user.js
// @version     1.5
// @grant       none
// ==/UserScript==

var win = (typeof unsafeWindow != 'undefined') ? unsafeWindow : window;
setTimeout(function(){	//延缓执行
	if ( (/item.taobao.com/i).test(location.hostname) ) {
		p = $("#J_StrPrice .tb-rmb-num").text();
		$("#J_PromoPrice .tb-rmb-num .tb-rmb").remove();	//删除RMB符号
		pp = $("#J_PromoPrice .tb-rmb-num").text();
		p = Number(p);
		pp = Number(pp);
		id = getUrlArg("id");
		f = "tb";
		go = "http://www.alimama.com/union/spread/common/allCode.htm?specialType=cowry&auction_id="+id+"&p="+p+"&f="+f;
		if (pp) go += "&pp="+pp;
		win.location = go;
	} else if ( (/detail.tmall.com/i).test(location.hostname) ) {
		p = $("#J_StrPrice").text();
		pp = $("#J_PromoBox > strong").text();
		p = Number(p);
		pp = Number(pp);
		id = getUrlArg("id");
		f = 'tm';
		go = "http://www.alimama.com/union/spread/common/allCode.htm?specialType=cowry&auction_id="+id+"&p="+p+"&f="+f;
		if (pp) go += "&pp="+pp;
		win.location = go;
	}
},1200);

if ( (/alimama.com/i).test(location.hostname) ) {
	p = getUrlArg("p");
	pp = getUrlArg("pp");
	f = getUrlArg("f");
	id = getUrlArg("auction_id");
	l = $("#J_showSpan label").text();
	$(".med-tip").hide();
	$(".field:first").hide();

	if (pp) $("<li class='field' style='margin-top:40px;'></li>")
	.html("<div class='input'><label class='field-label'>掌柜促销中：</label><div class='field-set'><textarea id='J_codeArea5' class='field-textarea' style='width:440px;height:30px;background-color:#FFE6E6;'>"+pp+"</textarea><div class='blueria' id='pp'>佣金<br /><span>元</span></div></div></div>")
	.prependTo(".ks-switchable-panel");
	$("<li class='field' style='margin-top:40px;'></li>")
	.html("<div class='input'><label class='field-label'>价格：</label><div class='field-set'><textarea id='J_codeArea2' class='field-textarea' style='width:440px;height:30px;'>"+p+"</textarea><div class='blueria' id='p'>佣金<br /><span>元</span></div></div></div>")
	.prependTo(".ks-switchable-panel");
	$("<li class='field'></li>")
	.html("<div class='input'><label class='field-label'>促销语：</label><div class='field-set'><textarea id='J_codeArea3' class='field-textarea' style='width:440px;height:30px;'>"+l+"</textarea></div></div>")
	.prependTo(".ks-switchable-panel");
	$("<li class='field'></li>")
	.html("<div class='input'><label class='field-label'>ID：</label><div class='field-set'><textarea id='J_codeArea4' class='field-textarea' style='width:440px;height:30px;'>"+id+"</textarea></div></div>")
	.prependTo(".ks-switchable-panel");

	win.KISSY.use('pub/back/common/clipboard,med-tip',function(S,Clipboard){	//添加复制到剪切板功能(默认有两个)
		S.ready(function(){
			if(S.one('#J_codeArea3')) new Clipboard(S.one('#J_codeArea3'));
			if(S.one('#J_codeArea4')) new Clipboard(S.one('#J_codeArea4'));
			if(S.one('#J_codeArea5')) new Clipboard(S.one('#J_codeArea5'));
		});
	});

	if (f == 'tb') {
		$("<li class='field'></li>")
		.html("<div class='input'><label class='field-label'>来自：</label><img src='http://img03.taobaocdn.com/tps/i3/T1ogqgXfXeXXXXXXXX-168-42.png' style='vertical-align: middle;' /></div>")
		.prependTo(".ks-switchable-panel");
	} else if (f == 'tm') {
		$("<li class='field'></li>")
		.html("<div class='input'><label class='field-label'>来自：</label><img src='http://img02.taobaocdn.com/tps/i2/T1PuoeXnXXXXXF_7Yi-175-35.png' style='vertical-align: middle;' /></div>")
		.prependTo(".ks-switchable-panel");
	}

	m = 'http://www.alimama.com/union/spread/selfservice/merchandisePromotion.htm?searchType=3&q=id%3D'+id;	//详情页地址
	$("<li class='field' style='width:560px;text-align: right;'></li>")
	.html("<a href='"+m+"' class='btn btn-blue'>查看详情</a><a onclick='window.close();' class='btn btn-blue' style='margin-left:10px;'>关闭本窗口</a>")
	.appendTo(".ks-switchable-panel");

	$("<li class='field' style='border:1px solid #E6E6E6;'></li>")
	.load(m+" .merchandise-promotion", function(){ compute( $(this).find('.ok').parent().prev().text() ); })
	.prependTo(".ks-switchable-panel");

}

function getUrlArg(key) {						//获取地址栏参数的值
	re = new RegExp("^"+key+"=","i");			//创建正则 相当于/^id=/i

	var arg = location.search;
	var tmparr = arg.substr(1, arg.length).split("&");
	for (i in tmparr) {
		n = tmparr[i];							//每一项 如:id=123456789
		if ( re.test(n) ) {						//如果含有key的字符串
			value = n.substr(key.length+1);		//取出key的值(+1是因为等于号)
			return value;
		}
	}

	return 0;
}

function compute(r) {
	if (!r) return false;
	r = Number( r.substr(0, r.length-1) );
	$("#p span").prepend(p*r/100);
	$("#pp span").prepend(pp*r/100);
}

GM_addStyle(".blueria{background-color:#EBFFE1;width:80px;height:38px;padding:0 10px;position:absolute;top:0;right:0;border:1px solid #909090;} .blueria span{color:#129C00;}");