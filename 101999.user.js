// <![CDATA[
// ==UserScript==
// @name           Tianya Cleaner
// @fullname       Tianya Cleaner
// @description    A Better Tianya.
// @homepage       http://userscripts.org/scripts/show/xxxxxxx
// @author         Amio
// @version        0.1
// @date           2011.04.29
// @namespace      http://www.airmio.com
// @include        http://www.tianya.cn/*
// ==/UserScript==


(function(){

	// Inject Style
	var sty = document.createElement('style');
	sty.type = 'text/css';
	sty.innerHTML =
		// Remove Ads
		'#winpop,' + // 右下角弹出窗
		'#ty_msg_box_w,' + // 右下角乱七八糟
		'#couplet_left_NULL,' + // 侧栏广告
		'div[id^="tianyaBrandSpan"],' + // 广告
		'div[id^="adsp_content"],' + // Ad
                '.fromwap' + // 手机上天涯
		'{ display:none !important }';

	document.querySelector('head').appendChild(sty);




HTMLElement.prototype.parentByTagName = function(str){
    var el = this;
    while(el = el.parentNode){
        if(el.tagName == str) return el;
    }
};

HTMLElement.prototype.nextElement = function(){
    var el = this;
    while(el = el.nextSibling){
        if(el.nodeType == 1) return el;
    }
};

var posters = document.querySelectorAll('.lnkChanged');
var tempWrapper = document.createElement('div');

for(var i = posters.length, user, par, userId, newNode; i--;){
    user = posters[i];
    par = user.parentByTagName('TABLE');
	if(!par) continue;
    userId = user.getAttribute('_userinfo').split(',')[0];

    par.className = 'postby user_' + userId;
    var div = i ? par.nextElement() : document.querySelector('.post');
    div.className += ' postby user_' + userId;

    tempWrapper.innerHTML = '<a href="javascript://" style="margin-left: 5px;text-decoration:none" data-handler="showMine" data-uid=".user_' + userId + '">^_^</a>';
    user.parentNode.insertBefore(tempWrapper.firstChild,user.nextSibling);
}


var sty = document.createElement('style');
document.querySelector('head').appendChild(sty);
function showMine(str){
    str = '.postby{display:none} .postby' + str + ' { display:block }';
    sty.innerHTML = sty.innerHTML == str ? '' : str;
}

window.onclick = function(e){
    switch(e.target.getAttribute('data-handler')){
        case 'showMine':
            showMine(e.target.getAttribute('data-uid'));
    }
}


})();

// ]]>