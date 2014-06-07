// ==UserScript==
// @name			Facebook Temizlik Botu
// @description	                Facebook Temizleyici
// @include			http://m.facebook.com/*
// @exclude			http://m.facebook.com/removefriend.php*
// @author			ByFabs
// @version			 1
// @versionnumber	         1
// ==/UserScript==
//
    function getElementsByClassName(classname, node) {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
    if(re.test(els[i].className))a.push(els[i]);
    return a;
    }
setInterval(function(){
element=getElementsByClassName("acw apm");
alert(element);
},0);