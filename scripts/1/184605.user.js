// ==UserScript==
// @name        ba
// @namespace   baguo
// @description demo
// @include     http://www.baidu.com/*
// @include     http://dynamic.12306.cn/otsweb/*
// @include		https://dynamic.12306.cn/otsweb/*
// @include		https://www.12306.cn/otsweb/*
// @version     1
// ==/UserScript==


function cscript(text) {	
	var cb = document.createElement("script");
	cb.type = "text/javascript";
	cb.textContent = text;
	document.head.appendChild(cb);
}

var fn = function(){
    var t = $('#toStationText');
    if(t.length){
        setTimeout(function(){
        t.val('武汉');
        $('#toStation').val('WHN');
        $('#submitQuery').click();
        console.log('log:', 3,t[0],parent); 
        },1000);
    }
};


cscript('('+fn.toString()+')()');

//});
