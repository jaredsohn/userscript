// ==UserScript==
// @name           gan
// @namespace      ronmi@rmi.twbbs.org
// @description    http://www.facebook.com/group.php?gid=110966252276669 我整天都在罵幹
// @include     http://facebook.com/*
// @include     http://*.facebook.com/*
// @include     https://facebook.com/*
// @include     https://*.facebook.com/*
// @author      Ronmi Ren
// @version     0.0.2
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
	setInterval(function(){
	    if(String(location.href).search(/group\.php\?gid=110966252276669$/)>=0 || String(location.href).search(/&oid=110966252276669&/)>=0)
		gan();
	}, 500);
    }

    function gan() {
	var img="http://lh5.ggpht.com/_zauZLufdPI0/S9ppcilMAHI/AAAAAAAABf8/w0wXe4hXIdY/s800/gan.jpg";
	$('span.default_message').each(function(i,e){
	    if($(e).text()=='讚') $(e).text('幹');
	});
	$('span.saving_message').each(function(i,e){
	    if($(e).text()=='讚') $(e).text('幹');
	});
	$('i').each(function(i,e){
	    if($(e).attr('title').search('擊這裡讚')>0)$(e).attr('title', '點擊這裡罵幹!');
	    if($(e).css('backgroundPosition') == '0px -192px'){
		$(e).css('backgroundPosition', '0px 0px').css('backgroundImage', 'url("' + img + '")');
	    }
	});
	$('button.like_link').each(function(i,e){
	    if($(e).attr('title').search('讚')>0)$(e).attr('title', '點擊這裡罵幹!');
	});
	$('div.UIImageBlock_ICON_Content').each(function(i,e){
	    if($(e).text().search('讚')>0)$(e).text(
		$(e).text().replace('讚', '幹').replace('幹這好', '覺得幹'));
	});
    }
