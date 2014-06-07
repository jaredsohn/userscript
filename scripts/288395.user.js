// ==UserScript==
// @name        vimwrite
// @namespace   null
// @include     *
// @version     1
// @grant       GM_xmlhttpRequest
// @grant	GM_addStyle
// @grant	GM_getResourceText
// @require	http://libs.baidu.com/jquery/1.9.0/jquery.js
// @require	http://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.min.js
// @resource	yCSS http://cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/css/toastr.min.css
// ==/UserScript==
var yCSS = GM_getResourceText("yCSS");
GM_addStyle(yCSS);
//有道翻译API申请成功
//API key：144411316
//keyfrom：urioworjkl

//创建时间：2014-01-17
//网站名称：urioworjkl
//网站地址：http://www.jlfuiowo.com
var text='';
var t = jQuery.noConflict();
toastr.options={
	"closeButton": false,
	"debug": false,
	"positionClass": "toast-bottom-left",
	"onclick": null,
	"showDuration": "100",
	"hideDuration": "1000",
	"timeOut": "0",
	"extendedTimeOut": "1000",
	"showEasing": "swing",
	"hideEasing": "linear",
	"showMethod": "fadeIn",
	"hideMethod": "fadeOut"
};

//t(document).ready(function(){alert('ready');});
t(document).on("keypress",function(e){
	if( e.ctrlKey && e.which == 122 ){
		GM_xmlhttpRequest({
			method: "GET",
			url: "http://fanyi.youdao.com/openapi.do?keyfrom=urioworjkl&key=144411316&type=data&doctype=json&version=1.1&q="+text,
			onload: function(response) {
				//alert(response.responseText);
				var json = t.parseJSON(response.responseText);
				//toastr.info(response.responseText);
				toastr.success(json.translation+'<br>'+json.basic.explains+'<br>'+'+---------------------------&gt;<br>'+json.web[0].key+'-->'+json.web[0].value+'<br>'+'+---------------------------&gt;<br>'+json.web[1].key+'-->'+json.web[1].value+'<br>'+'+---------------------------&gt;<br>'+json.web[2].key+'-->'+json.web[2].value+'<br>');
			}
		});
	}
});
t(document).on('mouseup',getSelectedText);
function getSelectedText() {
	text = window.getSelection();
}
