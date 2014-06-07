// ==UserScript==
// @name        Tieba Client
// @namespace   http://tieba.baidu.com
// @include     http://tieba.baidu.com/*
// @grant		GM_xmlhttpRequest
// @updateURL   https://userscripts.org/scripts/source/177032.meta.js
// @downloadURL https://userscripts.org/scripts/source/177032.user.js
// @grant		unsafeWindow
// @version     0.6.4
// ==/UserScript==


//MD5加密
var hexcase=0;var b64pad="";function hex_md5(s){return rstr2hex(rstr_md5(str2rstr_utf8(s)));}function b64_md5(s){return rstr2b64(rstr_md5(str2rstr_utf8(s)));}function any_md5(s,e){return rstr2any(rstr_md5(str2rstr_utf8(s)),e);}function hex_hmac_md5(k,d){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));}function b64_hmac_md5(k,d){return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)));}function any_hmac_md5(k,d,e){return rstr2any(rstr_hmac_md5(str2rstr_utf8(k),str2rstr_utf8(d)),e);}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72";}function rstr_md5(s){return binl2rstr(binl_md5(rstr2binl(s),s.length*8));}function rstr_hmac_md5(key,data){var bkey=rstr2binl(key);if(bkey.length>16)bkey=binl_md5(bkey,key.length*8);var ipad=Array(16),opad=Array(16);for(var i=0;i<16;i++){ipad[i]=bkey[i]^0x36363636;opad[i]=bkey[i]^0x5C5C5C5C;}var hash=binl_md5(ipad.concat(rstr2binl(data)),512+data.length*8);return binl2rstr(binl_md5(opad.concat(hash),512+128));}function rstr2hex(input){try{hexcase}catch(e){hexcase=0;}var hex_tab=hexcase?"0123456789ABCDEF":"0123456789abcdef";var output="";var x;for(var i=0;i<input.length;i++){x=input.charCodeAt(i);output+=hex_tab.charAt((x>>>4)&0x0F)+hex_tab.charAt(x&0x0F);}return output;}function rstr2b64(input){try{b64pad}catch(e){b64pad='';}var tab="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var output="";var len=input.length;for(var i=0;i<len;i+=3){var triplet=(input.charCodeAt(i)<<16)|(i+1<len?input.charCodeAt(i+1)<<8:0)|(i+2<len?input.charCodeAt(i+2):0);for(var j=0;j<4;j++){if(i*8+j*6>input.length*8)output+=b64pad;else output+=tab.charAt((triplet>>>6*(3-j))&0x3F);}}return output;}function rstr2any(input,encoding){var divisor=encoding.length;var i,j,q,x,quotient;var dividend=Array(Math.ceil(input.length/2));for(i=0;i<dividend.length;i++){dividend[i]=(input.charCodeAt(i*2)<<8)|input.charCodeAt(i*2+1);}var full_length=Math.ceil(input.length*8/(Math.log(encoding.length)/Math.log(2)));var remainders=Array(full_length);for(j=0;j<full_length;j++){quotient=Array();x=0;for(i=0;i<dividend.length;i++){x=(x<<16)+dividend[i];q=Math.floor(x/divisor);x-=q*divisor;if(quotient.length>0||q>0)quotient[quotient.length]=q;}remainders[j]=x;dividend=quotient;}var output="";for(i=remainders.length-1;i>=0;i--)output+=encoding.charAt(remainders[i]);return output;}function str2rstr_utf8(input){var output="";var i=-1;var x,y;while(++i<input.length){x=input.charCodeAt(i);y=i+1<input.length?input.charCodeAt(i+1):0;if(0xD800<=x&&x<=0xDBFF&&0xDC00<=y&&y<=0xDFFF){x=0x10000+((x&0x03FF)<<10)+(y&0x03FF);i++;}if(x<=0x7F)output+=String.fromCharCode(x);else if(x<=0x7FF)output+=String.fromCharCode(0xC0|((x>>>6)&0x1F),0x80|(x&0x3F));else if(x<=0xFFFF)output+=String.fromCharCode(0xE0|((x>>>12)&0x0F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));else if(x<=0x1FFFFF)output+=String.fromCharCode(0xF0|((x>>>18)&0x07),0x80|((x>>>12)&0x3F),0x80|((x>>>6)&0x3F),0x80|(x&0x3F));}return output;}function str2rstr_utf16le(input){var output="";for(var i=0;i<input.length;i++)output+=String.fromCharCode(input.charCodeAt(i)&0xFF,(input.charCodeAt(i)>>>8)&0xFF);return output;}function str2rstr_utf16be(input){var output="";for(var i=0;i<input.length;i++)output+=String.fromCharCode((input.charCodeAt(i)>>>8)&0xFF,input.charCodeAt(i)&0xFF);return output;}function rstr2binl(input){var output=Array(input.length>>2);for(var i=0;i<output.length;i++)output[i]=0;for(var i=0;i<input.length*8;i+=8)output[i>>5]|=(input.charCodeAt(i/8)&0xFF)<<(i%32);return output;}function binl2rstr(input){var output="";for(var i=0;i<input.length*32;i+=8)output+=String.fromCharCode((input[i>>5]>>>(i%32))&0xFF);return output;}function binl_md5(x,len){x[len>>5]|=0x80<<((len)%32);x[(((len+64)>>>9)<<4)+14]=len;var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;a=md5_ff(a,b,c,d,x[i+0],7,-680876936);d=md5_ff(d,a,b,c,x[i+1],12,-389564586);c=md5_ff(c,d,a,b,x[i+2],17,606105819);b=md5_ff(b,c,d,a,x[i+3],22,-1044525330);a=md5_ff(a,b,c,d,x[i+4],7,-176418897);d=md5_ff(d,a,b,c,x[i+5],12,1200080426);c=md5_ff(c,d,a,b,x[i+6],17,-1473231341);b=md5_ff(b,c,d,a,x[i+7],22,-45705983);a=md5_ff(a,b,c,d,x[i+8],7,1770035416);d=md5_ff(d,a,b,c,x[i+9],12,-1958414417);c=md5_ff(c,d,a,b,x[i+10],17,-42063);b=md5_ff(b,c,d,a,x[i+11],22,-1990404162);a=md5_ff(a,b,c,d,x[i+12],7,1804603682);d=md5_ff(d,a,b,c,x[i+13],12,-40341101);c=md5_ff(c,d,a,b,x[i+14],17,-1502002290);b=md5_ff(b,c,d,a,x[i+15],22,1236535329);a=md5_gg(a,b,c,d,x[i+1],5,-165796510);d=md5_gg(d,a,b,c,x[i+6],9,-1069501632);c=md5_gg(c,d,a,b,x[i+11],14,643717713);b=md5_gg(b,c,d,a,x[i+0],20,-373897302);a=md5_gg(a,b,c,d,x[i+5],5,-701558691);d=md5_gg(d,a,b,c,x[i+10],9,38016083);c=md5_gg(c,d,a,b,x[i+15],14,-660478335);b=md5_gg(b,c,d,a,x[i+4],20,-405537848);a=md5_gg(a,b,c,d,x[i+9],5,568446438);d=md5_gg(d,a,b,c,x[i+14],9,-1019803690);c=md5_gg(c,d,a,b,x[i+3],14,-187363961);b=md5_gg(b,c,d,a,x[i+8],20,1163531501);a=md5_gg(a,b,c,d,x[i+13],5,-1444681467);d=md5_gg(d,a,b,c,x[i+2],9,-51403784);c=md5_gg(c,d,a,b,x[i+7],14,1735328473);b=md5_gg(b,c,d,a,x[i+12],20,-1926607734);a=md5_hh(a,b,c,d,x[i+5],4,-378558);d=md5_hh(d,a,b,c,x[i+8],11,-2022574463);c=md5_hh(c,d,a,b,x[i+11],16,1839030562);b=md5_hh(b,c,d,a,x[i+14],23,-35309556);a=md5_hh(a,b,c,d,x[i+1],4,-1530992060);d=md5_hh(d,a,b,c,x[i+4],11,1272893353);c=md5_hh(c,d,a,b,x[i+7],16,-155497632);b=md5_hh(b,c,d,a,x[i+10],23,-1094730640);a=md5_hh(a,b,c,d,x[i+13],4,681279174);d=md5_hh(d,a,b,c,x[i+0],11,-358537222);c=md5_hh(c,d,a,b,x[i+3],16,-722521979);b=md5_hh(b,c,d,a,x[i+6],23,76029189);a=md5_hh(a,b,c,d,x[i+9],4,-640364487);d=md5_hh(d,a,b,c,x[i+12],11,-421815835);c=md5_hh(c,d,a,b,x[i+15],16,530742520);b=md5_hh(b,c,d,a,x[i+2],23,-995338651);a=md5_ii(a,b,c,d,x[i+0],6,-198630844);d=md5_ii(d,a,b,c,x[i+7],10,1126891415);c=md5_ii(c,d,a,b,x[i+14],15,-1416354905);b=md5_ii(b,c,d,a,x[i+5],21,-57434055);a=md5_ii(a,b,c,d,x[i+12],6,1700485571);d=md5_ii(d,a,b,c,x[i+3],10,-1894986606);c=md5_ii(c,d,a,b,x[i+10],15,-1051523);b=md5_ii(b,c,d,a,x[i+1],21,-2054922799);a=md5_ii(a,b,c,d,x[i+8],6,1873313359);d=md5_ii(d,a,b,c,x[i+15],10,-30611744);c=md5_ii(c,d,a,b,x[i+6],15,-1560198380);b=md5_ii(b,c,d,a,x[i+13],21,1309151649);a=md5_ii(a,b,c,d,x[i+4],6,-145523070);d=md5_ii(d,a,b,c,x[i+11],10,-1120210379);c=md5_ii(c,d,a,b,x[i+2],15,718787259);b=md5_ii(b,c,d,a,x[i+9],21,-343485551);a=safe_add(a,olda);b=safe_add(b,oldb);c=safe_add(c,oldc);d=safe_add(d,oldd);}return Array(a,b,c,d);}function md5_cmn(q,a,b,x,s,t){return safe_add(bit_rol(safe_add(safe_add(a,q),safe_add(x,t)),s),b);}function md5_ff(a,b,c,d,x,s,t){return md5_cmn((b&c)|((~b)&d),a,b,x,s,t);}function md5_gg(a,b,c,d,x,s,t){return md5_cmn((b&d)|(c&(~d)),a,b,x,s,t);}function md5_hh(a,b,c,d,x,s,t){return md5_cmn(b^c^d,a,b,x,s,t);}function md5_ii(a,b,c,d,x,s,t){return md5_cmn(c^(b|(~d)),a,b,x,s,t);}function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);}function bit_rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}

(function(){
	//在下面双引号内输入您的BDUSS
    var BDUSS="";
    var SIGN_KEY = "tiebaclient!!!";
	var kw=document.querySelectorAll('meta')[1].getAttribute("fname");
	var fid=unsafeWindow.PageData.forum.id;	
	var tbs=unsafeWindow.PageData.tbs;	
	function getTid(tid) {
		var reg = new RegExp("(^|&)" + tid + "=([^&]*)(&|$)","i");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null) return unescape(r[2]);
		return null;
	}
	var tid=window.location.pathname;
	tid=tid.substring(3)
	if(getTid("z")){tid=getTid("z")}
	tid = tid < 2100000000 ? tid : tid - 4294967295;

	//表情君(*￣▽￣)y 
	var smiley={
		"i_f01.png":"#(呵呵)","i_f02.png":"#(哈哈)","i_f03.png":"#(吐舌)","i_f04.png":"#(啊)","i_f05.png":"#(酷)",
		"i_f06.png":"#(怒)","i_f07.png":"#(开心)","i_f08.png":"#(汗)","i_f09.png":"#(泪)","i_f10.png":"#(黑线)",
		"i_f11.png":"#(鄙视)","i_f12.png":"#(不高兴)","i_f13.png":"#(真棒)","i_f14.png":"#(钱)","i_f15.png":"#(疑问)",
		"i_f16.png":"#(阴险)","i_f17.png":"#(吐)","i_f18.png":"#(咦)","i_f19.png":"#(委屈)","i_f20.png":"#(花心)",
		"i_f21.png":"#(呼~)","i_f22.png":"#(笑眼)","i_f23.png":"#(冷)","i_f24.png":"#(太开心)","i_f25.png":"#(滑稽)",
		"i_f26.png":"#(勉强)","i_f27.png":"#(狂汗)","i_f28.png":"#(乖)","i_f29.png":"#(睡觉)","i_f30.png":"#(惊哭)",
		"i_f31.png":"#(升起)","i_f32.png":"#(惊讶)","i_f33.png":"#(喷)","i_f34.png":"#(爱心)","i_f35.png":"#(心碎)",
		"i_f36.png":"#(玫瑰)","i_f37.png":"#(礼物)","i_f38.png":"#(彩虹)","i_f39.png":"#(星星月亮)","i_f40.png":"#(太阳)",
		"i_f41.png":"#(钱币)","i_f42.png":"#(灯泡)","i_f43.png":"#(茶杯)","i_f44.png":"#(蛋糕)","i_f45.png":"#(音乐)",
		"i_f46.png":"#(haha)","i_f47.png":"#(胜利)","i_f48.png":"#(大拇指)","i_f49.png":"#(弱)","i_f50.png":"#(OK)"
	}
	    
	function GM_wait(){
		if(typeof unsafeWindow.jQuery == 'undefined') { 
			window.setTimeout(GM_wait,100); 
		}
		else { 
			$ = unsafeWindow.jQuery; 
			init(); 
		}
	}
	
	function gui(){
		$("#tb_rich_poster .poster_submit:first").before("<select id='os'></select><a id='win8' class='ui_btn ui_btn_m j_submit poster_submit'><span class='poster_submit'><em>客户端</em></span></a>");
		var win8=document.querySelector("#win8");	
		var os=document.querySelector("#os");
		$("#os").css("float","left");		
		var osSel =["iPhone","Android","WindowsPhone","Windows 8"]
		for(var i=0;i<osSel.length;i++){
			$("#os").append("<option value='"+i+"'>"+osSel[i]+"</option>");
		}	
		if(tid){
			os.addEventListener("change",replyPost,false);  //帖子内页
			win8.addEventListener("click",replyPost,false);
			lzl();					
		}
		else{
			$("#os").val(2); 								//吧内主页,缺省WindowsPhone
			os.addEventListener("change",threadPost,false);
			win8.addEventListener("click",threadPost,false); 
		}	
	}
	
	function init(){
		var target = document.querySelector("#tb_rich_poster_container");
		if($("#tb_rich_poster .poster_submit").length){
			gui();
		}
		else{
			var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
			var observer = new MutationObserver(function(mutations) {
				mutations.forEach(function(mutation) {
					if(!$("#os").length){
						gui();
					}
				});    
			});
			var config = { attributes: true, childList: true, characterData: true };
			observer.observe(target, config);
		}
	}
	
	function decodeURI(postData){
		var s = ""
		for (var i in postData)
			s += i+"="+postData[i]
		var sign = hex_md5(decodeURIComponent(s)+SIGN_KEY);

		var data = ""
		for (var i in postData)
			data += "&"+i+"="+postData[i]
		data += "&sign="+sign
		return data.replace("&","")
	}		
	
	function format(content){
		content=content.replace(/<br>/g, "\n");      
		content=content.replace(/&nbsp;/g, " ");      
		content=content.replace(/([^/]+?)\.png/ig,function($1) {return ">"+smiley[$1]+"<";}) //萌萌的表情君(*￣▽￣)y 
		content=content.replace(/<.*?>/g,"");		
		return content;
	}
	
	function imgFormat(){
		$("#ueditor_replace .BDE_Image").each(function(){
			var width=$(this).width();
			var height=$(this).height();
			var src=$(this).attr("src");
			src=src.match(/\/(\w+)\.jpg/i)[1];
			if(src.length!=40){return;} // 过滤网络图片
			pic="#(pic,"+src+","+width+","+height+")";
			$(this).replaceWith(pic);
		})
	}
	
	function tipsAndClear(){
		$(".edui-editor-body").append('<div class="tb_poster_info poster_success"><strong>发表成功！</strong><br>三倍经验，妥妥的<span style="color:#CF2525; font-size:16px; font-weight: bold;"><(￣︶￣)></span>呢！</div>');
		$("#ueditor_replace").html("");
		$(".poster_draft_delete").click();
	}
	
	function threadPost(client_type){
		if($("#ueditor_replace").html()=="<p><br></p>" || $("#ueditor_replace").html()==""){return;}
		imgFormat();
		var content=$("#ueditor_replace").html();		
		content=format(content);
		var title=$(".editor_title").val();
		var os=document.querySelector("#os");
		var client_type=parseInt(os.options[os.selectedIndex].value)+1;				

		var postData={
			BDUSS:BDUSS,
			_client_id:"04-00-DA-69-15-00-73-97-08-00-02-00-06-00-3C-43-01-00-34-F4-22-00-BC-35-19-01-5E-46",
			_client_type:client_type,
			_client_version:"1.2.1.17",
			_phone_imei:"642b43b58d21b7a5814e1fd41b08e2a6",
			anonymous:0,
			content:content,
			fid:fid,
			kw:kw,
			net_type:3,
			tbs:tbs,
			title:title	
		}
		var data=decodeURI(postData);
		addThread(data);
	}
	
	function addThread(data){
		GM_xmlhttpRequest({
			method:"POST",
			url:"http://c.tieba.baidu.com/c/c/thread/add",
			data:data,
			headers:{
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload:function(response) {
				var msg=response.responseText;
				msg=eval('('+msg+')');
				if(msg.error_code==0){
					tipsAndClear();
					location.reload();
				}
				else{
					alert(msg.error_msg);
				}
			}
		});
	}	
	
	function replyPost(){
		if($("#ueditor_replace").html()=="<p><br></p>" || $("#ueditor_replace").html()==""){return;}
		imgFormat();
		var content=$("#ueditor_replace").html();	
		content=format(content);	
		var os=document.querySelector("#os");
		var client_type=parseInt(os.options[os.selectedIndex].value)+1;	
				
		var addData={
			BDUSS:BDUSS,
			_client_id:"04-00-DA-69-15-00-73-97-08-00-02-00-06-00-3C-43-01-00-34-F4-22-00-BC-35-19-01-5E-46",
			_client_type:client_type,
			_client_version:"1.2.1.17",
			_phone_imei:"642b43b58d21b7a5814e1fd41b08e2a6",
			anonymous:0,
			content:content,
			fid:fid,
			kw:kw,
			net_type:3,
			tbs:tbs,
			tid:tid,
			title:""	
		}
		var data=decodeURI(addData);
		addReply(data);		
	}
	
	function addReply(data){
		GM_xmlhttpRequest({
			method:"POST",
			url:"http://c.tieba.baidu.com/c/c/post/add",
			data:data,
			headers:{
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload:function(response) {
				var msg=response.responseText;
				msg=eval('('+msg+')');
				if(msg.error_code==0){
					tipsAndClear();
					location.reload();
				}
				else{
					alert(msg.error_msg);
				}
			}
		});		
	}
	
	function lzl(){
		$(".lzl_link_unfold,.j_lzl_p,.lzl_s_r").bind("click",function(){
			if(!$(this).parents(".d_post_content_main").find("#lzl_cliend").length){		
				var lzlWrapper=$(this).parents('.core_reply.j_lzl_wrapper').find(".j_lzl_container.core_reply_wrapper");
				lzlWrapper.find(".core_reply_border_bottom").before('<span id="lzl_cliend" class="lzl_panel_submit j_lzl_p_sb">客户端</span>');		
				var floor_num=lzlWrapper.data("field").floor_num;
				var quote_id=lzlWrapper.data("field").pid;		
				$("#lzl_cliend").bind("click",function(){lzlPost(floor_num,quote_id)});
			}
		});
	}
	
	function lzlPost(floor_num,quote_id){
		var content=$(".lzl_simple_wrapper .tb-editor-editarea").html();
		content=format(content);		
		
		var addData={
			BDUSS:BDUSS,
			_client_id:"04-00-DA-69-15-00-73-97-08-00-02-00-06-00-3C-43-01-00-34-F4-22-00-BC-35-19-01-5E-46",
			_client_type:1,  //楼中楼客户端,直接iPhone
			_client_version:"1.2.1.17",
			_phone_imei:"642b43b58d21b7a5814e1fd41b08e2a6",
			anonymous:0,
			content:content,
			fid:fid,
			floor_num:floor_num,
			kw:kw,
			net_type:3,
			quote_id:quote_id,
			tbs:tbs,
			tid:tid,
			title:""	
		}
		var data=decodeURI(addData);
		setTimeout(function(){addLzl(data);}, 0);		
	}

	function addLzl(data){
		GM_xmlhttpRequest({
			method:"POST",
			url:"http://c.tieba.baidu.com/c/c/post/add",
			data:data,
			headers:{
				"Content-Type": "application/x-www-form-urlencoded"
			},
			onload:function(response) {
				var msg=response.responseText;
				msg=eval('('+msg+')');
				if(msg.error_code==0){
					unsafeWindow.LzlPostor._appendNew();
					$(".lzl_simple_wrapper .tb-editor-editarea").html("");
				}
				else{
					alert(msg.error_msg);
				}
			}
		});		
	}
	
	GM_wait();
})()