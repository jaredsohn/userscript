// ==UserScript==
// @name       xiami auto checkin
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  xiami auto checkin if user has been loginto the website
// @match      http://*.xiami.com/*
// @copyright  2012+, LanQ
// ==/UserScript==

/*
Refer: http://www.cnblogs.com/snandy/archive/2011/08/02/2122496.html
Desc: 触发元素点击事件
*/
function triggerClick( el ) {
    if(el.click) {
        el.click();
    }else{
        try{
            var evt = document.createEvent('Event');
            evt.initEvent('click',true,true);
            el.dispatchEvent(evt);
        }catch(e){alert(e)};        
    }
}

//判断元素是否存在
if(document.getElementById('check_in')) {
    GM_log('check_in exist');
    triggerClick(document.getElementById('check_in'));
}
else{
    GM_log('check_in not exist on source page');
}

