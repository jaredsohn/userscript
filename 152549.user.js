// ==UserScript==
// @name			Mobifone SMS Convert
// @description		Tự động chuyển tiếng việt có dấu thành không dấu trong hộp soạn thảo tin nhắn online của mobifone
// @include			http://www.mobifone.com.vn/*
// @include			https://www.mobifone.com.vn/*
// @author			Mr.CHU (Chu Tiên Sinh)
// @downloadURL     http://userscripts.org/scripts/source/152549.user.js
// @updateURL       http://userscripts.org/scripts/source/152549.meta.js
// @require        http://code.jquery.com/jquery-latest.js
// @version	14.0319.01
// ==/UserScript==

var textarea = $("textarea[name='message']");
function locdau(str) {  
	  //str= str.toLowerCase();  
	  str= str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g,"a");  
	  str= str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g,"e");  
	  str= str.replace(/ì|í|ị|ỉ|ĩ|Ì|Í|Ị|Ỉ|Ĩ/g,"i");  
	  str= str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g,"o");  
	  str= str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g,"u");  
	  str= str.replace(/ỳ|ý|ỵ|ỷ|ỹ|Ỳ|Ý|Ỵ|Ỷ|Ỹ/g,"y");  
	  str= str.replace(/đ|Đ/g,"d"); 
	 // str= str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g,"-"); 
	/* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */ 
	  str= str.replace(/-+-/g,"-"); //thay thế 2- thành 1- 
	  str= str.replace(/^\-+|\-+$/g,"");
	  //var cstr= str.split("(");
	 // str=cstr[0];
	//cắt bỏ ký tự - ở đầu và cuối chuỗi  
	  return str;  
}   
smsMSG = function() {
    var value = textarea.val();
	value = locdau(value);
    textarea.val(value);
};
$(document).ready(function () {
    textarea.change(smsMSG);
    textarea.keydown(smsMSG);
    textarea.keypress(smsMSG);
    textarea.keyup(smsMSG);
    textarea.blur(smsMSG);
    textarea.focus(smsMSG);
    textarea.attr('onfocus')='';
    textarea.attr('onchange')='';
    textarea.attr('onkeyup')='';
});