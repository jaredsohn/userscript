// ==UserScript==
// @name        vialink22
// @namespace   *vialink22*
// @description vialink22
// @include     *vialink22*
// @version     1
// ==/UserScript==

var logo = document.createElement("div");
logo.innerHTML = '<div style="z-index:9999999;width:100%;height:60px;border-bottom: 2px solid #300000;position:fixed;left:0;top:0;" id="topbiesiada">\
    <iframe src="http://stalowaprojekt.pl/web/terminal/index.php" style="width:100%;height:60px;border:0;overflow:hidden;"></iframe>\
    </div><div style="height:60px;width:100%;visibility:hidden;">123</div>\
    <div style="position:fixed;top:80%;right:10px;width:50px;height:100px;z-index:99999999;">\
    <a href="#" onclick="return false;" onmousedown="jQuery(\'body\').attr(\'sTop\', \'1\');rollTop();" onmouseup="jQuery(\'body\').attr(\'sTop\', \'0\');" style="display:block;width:50px;height:50px;clear:both;"><img src="http://stalowaprojekt.pl/web/terminal/top.png"></a>\
    <a href="#" onclick="return false;" onmousedown="jQuery(\'body\').attr(\'sDown\', \'1\');rollDown();" onmouseup="jQuery(\'body\').attr(\'sDown\', \'0\');" style="display:block;width:50px;height:50px;float:left;"><img src="http://stalowaprojekt.pl/web/terminal/bottom.png"></a>\
    </div>';
document.body.insertBefore(logo, document.body.firstChild);



// ==UserScript==
// @name        Pasek
// @namespace   http://hxv.me/
// @include     *
// @exclude    http://stalowaprojekt.pl/web/terminal/*
// @exclude    http://www.facebook.com/plugins/*
// @exclude    https://www.facebook.com/plugins/*
// @exclude    http://www.youtube.com/embed/*
// @exclude    https://www.youtube.com/embed/*
// @version     1
// ==/UserScript==

function addJQuery(callback){
    var script = document.createElement("script");
    script.setAttribute("src", "http://code.jquery.com/jquery-1.7.2.min.js");
    script.addEventListener('load', function(){
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

/*
if(!document.location.href.match(/^https?:\/\/[^\/]*(karczmabiesiada\.eu|facebook\.[a-z]{2,5}|stalowaprojekt\.pl)\//i)){
    document.location.href = 'http://karczmabiesiada.eu/';
}
*/

if(document.location.href.match(/^https?:\/\/(www\.)?youtube/i)){
    document.location.href = 'http://karczmabiesiada.eu/';
}

setTimeout('document.location.href = "http://karczmabiesiada.eu/";', 1000*60*15);

var jqq = false;

if(typeof(unsafeWindow.jQuery) == 'function' || typeof(window.jQuery) == 'function'){
    if(typeof(unsafeWindow.jQuery) == 'function'){
        jQuery = unsafeWindow.jQuery;
    }else{
        jQuery = window.jQuery;
    }
    jqq = true;
}

function rollDown(){
    if(typeof(unsafeWindow.jQuery) == 'function' || typeof(window.jQuery) == 'function'){
        if(typeof(unsafeWindow.jQuery) == 'function'){
            jQuery = unsafeWindow.jQuery;
        }else{
            jQuery = window.jQuery;
        }
    }
    jQuery('html, body').animate({scrollTop: jQuery('html').scrollTop()+150}, 100);
    if(jQuery('body').attr('sDown') == '1')
        setTimeout('rollDown();', 200);
}
function rollTop(){
    if(typeof(unsafeWindow.jQuery) == 'function' || typeof(window.jQuery) == 'function'){
        if(typeof(unsafeWindow.jQuery) == 'function'){
            jQuery = unsafeWindow.jQuery;
        }else{
            jQuery = window.jQuery;
        }
    }
    jQuery('html, body').animate({scrollTop: jQuery('html').scrollTop()-150}, 100);
    if(jQuery('body').attr('sTop') == '1')
        setTimeout('rollTop();', 200);
}

unsafeWindow.rollDown = rollDown;
unsafeWindow.rollTop = rollTop;

function main(){
    //jQuery.noConflict();
    if(jQuery('#topbiesiada').length > 0) return;
    jQuery('.timelineLoggedOutSignUp').hide();
    var extra = '<div style="z-index:9999999;width:100%;height:60px;border-bottom: 2px solid #300000;position:fixed;left:0;top:0;" id="topbiesiada">\
    <iframe src="http://stalowaprojekt.pl/web/terminal/index.php" style="width:100%;height:60px;border:0;overflow:hidden;"></iframe>\
    </div><div style="height:60px;width:100%;visibility:hidden;">123</div>\
    <div style="position:fixed;top:80%;right:10px;width:50px;height:100px;z-index:99999999;">\
    <a href="#" onclick="return false;" onmousedown="jQuery(\'body\').attr(\'sTop\', \'1\');rollTop();" onmouseup="jQuery(\'body\').attr(\'sTop\', \'0\');" style="display:block;width:50px;height:50px;clear:both;"><img src="http://stalowaprojekt.pl/web/terminal/top.png"></a>\
    <a href="#" onclick="return false;" onmousedown="jQuery(\'body\').attr(\'sDown\', \'1\');rollDown();" onmouseup="jQuery(\'body\').attr(\'sDown\', \'0\');" style="display:block;width:50px;height:50px;float:left;"><img src="http://stalowaprojekt.pl/web/terminal/bottom.png"></a>\
    </div>';

    jQuery('body').html(extra+jQuery('body').html());
    jQuery('a').attr('target', '');
}

if(jqq){
    main();
}else{
    addJQuery(main);
}   