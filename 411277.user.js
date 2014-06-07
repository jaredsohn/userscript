// ==UserScript==
// @name        高亮/屏蔽来自百度知道的贴子
// @include     http://tieba.baidu.com/f*
// @version     1.0.3
// @updateURL      https://userscripts.org/scripts/source/411277.meta.js
// @downloadURL    https://userscripts.org/scripts/source/411277.user.js
// @description  测试版，仅在chrome上通过测试
// @run-at document-end
// ==/UserScript==
var hight_bool=true,//高亮显示，否则屏蔽
	max_thread_types=10000000;//设置检测参数最大值
var BDUSS='',ulist=[],users={},foon=0,unum=0,unum_ok=0,maxdata={post_num:{name:[],num:0},thread_num:{name:[],num:0},repost_num:{name:[],num:0},ok:false};
//BDUSS侦测 from tiebaAllsign
if(document.cookie.match(/BDUSS=(.{192})/)){
	BDUSS = document.cookie.match(/BDUSS=(.{192})/)[1];
}else{
	//此处填入cookie BDUSS 理论上不需要
	BDUSS = "";
}

var lt=[];

//加载css
var stylesheet=".notStarList > span > span.zhidao {background-color: #646464;color: #FFF;font-size: 10px;padding: 0px 5px;border-radius: 11px;}";
var ss=document.createElement('style');
ss.textContent=stylesheet;
document.head.appendChild(ss);

/*====================下边的不要动========================*/

var $ = unsafeWindow.$;
//MD5加密函数 取自网络孤独行客的脚本 from tiebaAllsign
var hexcase=0;var b64pad="";function hex_md5(s){return rstr2hex(rstr_md5(str2rstr_utf8(s)));}function b64_md5(s){return rstr2b64(rstr_md5(str2rstr_utf8(s)));}function any_md5(s,e){return rstr2any(rstr_md5(str2rstr_utf8(s)),e);}function hex_hmac_md5(k,d){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));}function b64_hmac_md5(k,d){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));}function any_hmac_md5(k,d,e){return rstr2any(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)),e);}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72";}function rstr_md5(s){return binl2rstr(binl_md5(rstr2binl(s),s.length*8));}function rstr_hmac_md5(key,data){var bkey=rstr2binl(key);if(bkey.length>16)bkey=binl_md5(bkey,key.length*8);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}var hash=binl_md5(ipad.concat(rstr2binl(data)),512+data.length*8);return binl2rstr(binl_md5(opad.concat(hash),512+128));}function rstr2hex(input){try{hexcase}catch(e){hexcase=0;}var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var output="";var x;for(var i=0;i<input.length;i++){x=input.charCodeAt(i);output+=hex_tab.charAt((x>>>4)&0x0F)+hex_tab.charAt(x&0x0F);}return output;}function rstr2b64(input){try{b64pad}catch(e){b64pad='';}var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var output="";var len=input.length;for(var i=0;i<len;i+=3){var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);for(var j=0;j<4;j++){if(i*8+j*6>input.length*8)output+=b64pad;else output+=tab.charAt((triplet>>>6*(3-j))&0x3F);}}return output;}function rstr2any(input,encoding){var divisor=encoding.length;var i,j,q,x,quotient;var dividend=Array(Math.ceil(input.length/2));for(i=0;i<dividend.length;i++){dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1);}var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));var remainders=Array(full_length);for(j=0;j<full_length;j++){quotient=Array();x=0;for(i=0;i<dividend.length;i++){x=(x<<16)+dividend[i];q=Math.floor(x/divisor);x-=q*divisor;if(quotient.length>0||q>0)quotient[quotient.length]=q;}remainders[j]=x;dividend=quotient;}var output="";for(i=remainders.length-1;i>=0;i--)output+=encoding.charAt(remainders[i]);return output;}function str2rstr_utf8(input){var output="";var i=-1;var x,y;while(++i<input.length){x=input.charCodeAt(i);y=i+1<input.length?input.charCodeAt(i+1):0;if(0xD800<=x&&x<=0xDBFF&&0xDC00<=y&&y<=0xDFFF){x=0x10000+((x&0x03FF)<<10)+(y&0x03FF);i++;}if(x<=0x7F)output+=String.fromCharCode(x);else if(x<=0x7FF)output+=String.fromCharCode(0xC0|((x>>>6)&0x1F),0x80|(x&0x3F));else if(x<=0xFFFF)output+=String.fromCharCode(0xE0|((x>>>12)&0x0F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));else if(x<=0x1FFFFF)output+=String.fromCharCode(0xF0|((x>>>18)&0x07),0x80|((x>>>12)&0x3F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));}return output;}function str2rstr_utf16le(input){var output="";for(var i=0;i<input.length;i++)output+=String.fromCharCode(input.charCodeAt(i)&0xFF,(input.charCodeAt(i)>>>8)&0xFF);return output;}function str2rstr_utf16be(input){var output="";for(var i=0;i<input.length;i++)output+=String.fromCharCode((input.charCodeAt(i)>>>8)&0xFF,input.charCodeAt(i)&0xFF);return output;}function rstr2binl(input){var output=Array(input.length>>2);for(var i=0;i<output.length;i++)output[i]=0;for(var i=0;i<input.length*8;i+=8)output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(i%32);return output;}function binl2rstr(input){var output="";for(var i=0;i<input.length*32;i+=8)output+=String.fromCharCode((input[i>>5]>>>(i%32))&0xFF);return output;}function binl_md5(x,len){x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}return Array(a,b,c,d);}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}

var ajax = typeof GM_xmlhttpRequest != 'undefined' ? GM_xmlhttpRequest : function(d) {
	var x = new XMLHttpRequest();
	x.open(d.method, d.url);
	x.onload = function() {
		if (x.readyState == 4) d.onload(x)
	};
	x.send();
};
function getPostData(data){
	var a = {
		BDUSS:BDUSS,
		_client_id:"04-00-DA-69-15-00-73-97-08-00-02-00-06-00-3C-43-01-00-34-F4-22-00-BC-35-19-01-5E-46",
		_client_type:'2',
		_client_version:"5.6.3",
		_phone_imei:"642b43b58d21b7a5814e1fd41b08e2a6",
		from:'tieba'
	}
	data = $.extend(a,data);
	console.log(data);
	return data;
}
//POST数据加密处理函数 取自网络孤独行客的脚本  from tiebaAllsign
function decodeURI_post(postData) {
	var SIGN_KEY = "tiebaclient!!!";
	var s = "";
	for (var i in postData) {
		s += i + "=" + postData[i];
	}
	var sign = hex_md5(decodeURIComponent(s) + SIGN_KEY);
	var data = "";
	for (var i in postData) {
		data += "&" + i + "=" + postData[i];
	}
	data += "&sign=" + sign;
	return data.replace("&", "");
}
function getList(kw,pn,rn){
	//bool=bool?true:false;
	ajax({
		method:'POST',
		url:'http://c.tieba.baidu.com/c/f/frs/page',
		synchronous:true,
        async:false,
		data:decodeURI_post(getPostData({
            kw:kw,
            pn:pn,
            q_type:2,
            rn:rn,
            with_group:1
		})),
		headers:{
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload:function(response) {
			var msg=response.responseText;
			msg=eval('('+msg+')');
			//console.log(msg.thread_list);
            var th=msg.thread_list,tl=th.length;
            lt=[];
            for(var i=0;i<tl;i++){
                if(th[i].thread_types>max_thread_types){
                    console.log(th[i]);
                    lt.push(th[i].id);
                }
            }
            if(lt.length>0)addSpan(lt);
		}
	});
}
function addSpan(list){
	var i=0;
	$('.j_thread_list.clearfix').each(function(){
		if(list[i]==$(this).data('field').id){
			test17(list[i],$(this));
			i++;
		}
	});
}
function addSpan2(e){
	if(hight_bool)e.find('.notStarList span').append('<span class="zhidao">知道</span>');
	else e.hide();
}
var m=JSON.parse(localStorage.huhu_hhzhidao||'{}');
function test17(id,e){
	var b=m[id];
	//JSON.stringifytest17(th[i].id);
	if(typeof b=="undefined"){
		ajax({
		method:'POST',
		url:'http://c.tieba.baidu.com/c/f/pb/page',
		synchronous:true,
        async:false,
		data:decodeURI_post(getPostData({
            kz:id,
            pn:1,
            q_type:2,
            rn:2,
            with_floor:1
		})),
		headers:{
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload:function(response) {
			var msg=response.responseText;
			msg=eval('('+msg+')');
			console.log(msg);
			if(msg.thread.thread_type==17){
				m[id]=true;
				addSpan2(e);
			}else m[id]=false;
			localStorage.huhu_hhzhidao=JSON.stringify(m);
		}
	});
	}
	else if(b) addSpan2(e);
}
var hook_ajax_bool=false;
function hook_ajax(){
	if(hook_ajax_bool)return;
	else hook_ajax_bool=true;
	var hook_ajax=$.ajax;
	$.ajax=function(e,n){
		if(e.type!='get'||e.url.indexOf('/f?kw=')<0)return hook_ajax(e,n);
		console.log(e,n,e.url.indexOf('/f?kw=')<0);
        var _es=e.success,pn=e.url.match(/&pn=(\w+)/)[1]/50+1;
        e.success=function(t){_es(t);getList(PageData.forum.forum_name,pn,50);}
		return hook_ajax(e,n);
	}
}
(function addDate(){
    //PageData.forum.forum_name
    //document.getElementsByClassName('cur')[0].innerHTML
    //50
    hook_ajax();
    getList(PageData.forum.forum_name,document.getElementsByClassName('cur')[0].innerHTML,50);
})();