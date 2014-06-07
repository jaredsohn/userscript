// ==UserScript==
// @name        GoogleResultLinkCleaner
// @namespace   http://weibo.com/qiangtoutou
// @description 移除google搜索结果中的google重定向链接，直接访问结果网站,节省时间
// @include     *www.google.com*
// @version     1
// ==/UserScript==

 var resultElement=byClass('r','h3',function(elem){
	var a=elem.firstChild;	
	a.removeAttribute("onmousedown");
 }); 

 function byClass(name,type,callback) {
    var r = [];
	if(typeof type==="function"){
		callback=type;
		type="*";
	}
    var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
    var e = document.getElementsByTagName(type);
    for ( var j =e.length; j--; )       
        if ( re.test(e[j].className) ) {
			r.push( e[j] );
			callback&&callback(e[j]);
		}
    return r;
}