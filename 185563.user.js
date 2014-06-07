// ==UserScript==
// @name       Alipay enable paste
// @namespace  https://auth.alipay.com/
// @version    0.1
// @description  enter something useful
// @match      https://auth.alipay.com/login/index.htm*
// @copyright  2012+, Eminarcissus
// ==/UserScript==

loadJquery=function(){
    if(typeof(unsafeWindow.jQuery)!='undefined')
    {
        jQuery=unsafeWindow.jQuery;
        jQuery('input[onpaste*=false]').attr('onpaste','');
    	console.log('Enabled paste on page');
    }
    else
    {
        setTimeout(loadJquery,500);
    }
}

loadJquery()