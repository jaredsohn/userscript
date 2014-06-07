// ==UserScript==
// @name           taobao_confirm_goods
// @namespace      taobao
// @description    淘宝确认收货脚本
// @include        http://trade.taobao.com/trade/confirm_goods.htm*
// ==/UserScript==

var iframe=document.getElementById('alipay-iframe');
GM_xmlhttpRequest({
	method: "GET",
	url: iframe.src,
	onload: function(response) {
		if(response.status==200){
			var output=response.responseText.replace(/<embed[^>]*>/ig,'').replace(/<object[^>]*>/ig,'').replace(/<\/object>/ig,'');
			output=output.replace(/<input type="hidden" id="pwd"[^>]*>/i,'').replace(/<input type="hidden" id="pwd"[^>]*>/i,'');
			var position=output.indexOf('<param name="cm5ts"');
			var first=output.substring(1,position-1);
			var last=output.substring(position);
			var password="<input type='password' id='pwd' name='password' value='' />\n";
			output=first+password+last;
			document.getElementById('pay-box').appendChild(output);
		}else{
			alert(response.status+'无法连接支付宝确认支付页面');
		}
	}
});
iframe.parentNode.removeChild(iframe);
