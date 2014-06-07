// ==UserScript==
// @name           sgxin
// @namespace      http://www.upblog.net/kukat
// @include        http://www.sgxin.com/http://www.sgxin.com/*
// ==/UserScript==
function addGlobalStyle(css) {
	try {
		var elmHead, elmStyle;
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
}

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

var bgImage = 'https://addons.mozilla.org/img/amo2009/bg/body.jpg'

// All your GM code must be inside this function
    function letsJQuery() {
        //alert($); // check if the dollar (jquery) function works
	$('*').css({background:"none", color:"#012"});
	$('body').css({background:"url("+bgImage+") repeat-x"});
	$('a').css({color:"#123"});
	$('a>img[src="/logo.gif"]').parent().html("<h1>新新网</h1>");
	$('h1').css('margin-bottom','0').after("<addr>www.sgxin.com</addr>").next('addr').css('margin-bottom', '1em').css('display', 'block');
	$('center>table>tbody>tr>td').first().css('-moz-border-radius', '5px').css('background', '#C8E8F3').css('color', '#444').css('margin-bottom', '1em').css('overflow', 'hidden').css('padding','1em').find('table.buttons,table.links').find('p,a').css('-moz-border-radius', '5px').hover(function(){$(this).css('background','#fff')},function(){$(this).css('background', '')});
	$('b:contains("分类广告:")').parents('table').first().next('table').find('center').eq(1).find('table').find('table').css('-moz-border-radius','5px').css('background','#C8E8F3').css('margin-bottom', '1em').css('overflow', 'hidden').css('padding','1em');
	$('div#schf,div#pstnad').css('-moz-border-radius', '5px').css('background', '#C8E8F3').css('padding','1em').css('margin-left',"8px").css('margin-right',"20px").css('margin-bottom', '1em');
	$('input,select').css('-moz-border-radius', '3px').css('border','1px solid #333').css('background','#fff').css('font-size','14px');
    }
/*
addGlobalStyle('* {background:none; color:#012;}');
addGlobalStyle('body {background: url('+bgImage+') no-repeat;font-family:"雅黑", "Microsoft Yahei", "Yahei","helvetica neue",arial,helvetica,sans-serif; font-size:14px; color:#012;} a{color:#123;}');
*/

