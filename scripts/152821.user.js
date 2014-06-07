// ==UserScript==
// @name           user
// @description    user
// @downloadURL    https://ajax.googleapis.com/ajax/libs/jquery/1.4.0/jquery.min.js
// @include        http*
// ==/UserScript==

function withjQuery(callback, safe) {
	if(typeof(jQuery)=='undefined') {
		var script=document.createElement('script');
		script.type='text/javascript';
		//script.src='http://code.jquery.com/jquery-latest.pack.js';
		script.src='https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js';
		if(safe) {
			var cb=document.createElement('script');
			cb.type='text/javascript';
			cb.textContent='jQuery.noConflict();('+callback.toString()+')(jQuery);';
			script.addEventListener('load', function() {
				document.head.appendChild(cb);
			});
		} else {
			var dollar=undefined;
			if(typeof($)!='undefined') dollar=$;
			script.addEventListener('load', function() {
				jQuery.noConflict();
				$=dollar;
				callback(jQuery);
			});
		}
		document.head.appendChild(script);
	} else callback(jQuery);
}

withjQuery(function($){
$('div.wrap2').css({"background":"url('http://t3.qpic.cn/mblogpic/8d78fa076eafe135c81a/2000.jpg')","background-repeat":"repeat-y","background-position":"50% 50%","background-attachment":"fixed","background-color":"no"});
$(document).ready(function(){
//替换百度logo和按钮
$('.btn_wr').html('<input type="image" src="http://t2.qpic.cn/mblogpic/9d975d64956d9fca1478/2000.gif">');
$('.s_btn_wr').html('<input type="image" src="http://t2.qpic.cn/mblogpic/9d975d64956d9fca1478/2000.gif">');
$('#lg').html("<img src='http://t2.qpic.cn/mblogpic/20c879d8db33c34b93b0/2000.gif'>");
$('body').css({"background":"url('http://t2.qpic.cn/mblogpic/628e7a1dcea838f6b46c/2000.jpg')","background-repeat":"repeat-y","background-position":"50% 50%","background-attachment":"fixed","background-color":"no"});
$('div.s-container').css({"background-color":"rgba(255,255,255,0.2)","border":"0px"});
$('.s-nplus').css({"border":"0px"});
$('.s-ncf-nav').css({"border":"0px"});
$('.main').css({"border-bottom":"0px","background-image":"url('http://t3.qpic.cn/mblogpic/52a7156138b62955e67a/2000.jpg')"});
$('.s-title').css({"background-color":"rgba(255,255,255,0.2)","border-bottom":"0px","background-image":"url('http://t3.qpic.cn/mblogpic/52a7156138b62955e67a/2000.jpg')"});
$('#s_wrap').css({"border-bottom":"0px","background-image":"url('http://t3.qpic.cn/mblogpic/52a7156138b62955e67a/2000.jpg')"});

//自动签到
$('.j_cansign').trigger('click');
//贴吧繁体字功能
$('td.pt_submit').click(
function(){
var str=rich_postor._editor.getHtml();
var out="";
for(var i=0;i<str.length;i++)
{
if(str.charCodeAt(i)<128){out+=str.charAt(i);}
else{out+="&#"+str.charCodeAt(i)+";";}}rich_postor._editor.getHtml=function(){return out;};
rich_postor._submit();
});


});

},true);
