// ==UserScript==
// @name			Bobsoccer.ru enhancements
// @namespace		http://bobsoccer.ru/user/16903/blog/?item=228317
// @version  		0.2
// @description  	Hides posts from specific users. New: added button to scroll to top/go back.
// @match			http://bobsoccer.ru/*
// @match			http://www.bobsoccer.ru/*
// @require			http://code.jquery.com/jquery-latest.js
// @copyright		2014 zee@bobsoccer
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
addGlobalStyle('.closed > .Comment .CommentData, .closed > .Comment .AuthorInfo { display: none; } .closed > .Comment .Utility:before { content: \'Скрытый пост \' } .hide-post-link, .show-post-link, #top-link a { color: #7B7B7B; font-size: 7pt; } #top-link { cursor:pointer;display:none;position:fixed;top:0px;bottom:0px;padding-left:5px;padding-top:5px;z-index:10;width:40px; } #top-link a { display:block; } #top-link:hover { opacity: 0.1, background-color: white; }');

$(document).ready(function() {
    $("body").append('<div id="top-link"><a href="#top">наверх</a></div>');
    if (!localStorage.hiddenusers)
        localStorage.hiddenusers = '{}';
    
    var hidden_data_users = JSON.parse(localStorage.hiddenusers);
    var store_data_users = function() {
        localStorage.hiddenusers = JSON.stringify(hidden_data_users);
    };
    if (!hidden_data_users) {
        hidden_data_users = {}; // id : timestamp
    }
    
    var do_hidepost = function() {
        var post = this;
        var id = $(this).attr('id');
        var user = $(this).find(".ginger > b").text();
        var replacement = $('<a class="hide-post-link" title=\"Скрыть сообщения этого пользователя\" href="javascript:void(0)">скрыть</a>');
        
        replacement.click(function() {
            hidden_data_users[user] = Math.round(Date.now() / 1000);
            store_data_users();
            
            var show_link = $('<a class="show-post-link" title=\"Показать сообщения этого пользователя\" href="javascript:void(0)">показать</a>').click(function() {
                delete hidden_data_users[user];
                store_data_users();
                $(post).removeClass('closed');
                $(this).prev().show();
                $(this).remove();
            });
            
            $(this).hide().after(show_link);
            $(post).addClass('closed');
        });
        
        $(this).find(".Utility").append(replacement);
        
        if (hidden_data_users[user])
            $(this).find('.hide-post-link').click();
    };
    
    $('.CommentAnswer_To').each(do_hidepost);
    
    // http://truemisha.ru/demo/top-down-button-jquery.html
    ;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
    
    jQuery.extend(jQuery.fn, {
        toplinkwidth: function(){
            totalContentWidth = jQuery('#content').outerWidth();
            totalTopLinkWidth = jQuery('#top-link').children('a').outerWidth(true);
            h = jQuery(window).width()/2-totalContentWidth/2-totalTopLinkWidth;
            if(h<0){
                jQuery(this).hide();
            } else {
                if(jQuery(window).scrollTop() >= 1){
                    jQuery(this).show();
                }
                jQuery(this).css({'padding-right': h+'px'});
            }
        }
    });
    
    jQuery(function($){
        var topLink = $('#top-link');
        topLink.css({'padding-bottom': $(window).height()});
        $(window).scroll(function() {
            if($(window).scrollTop() >= 1) {
                topLink.fadeIn(300).children('a').html('наверх').parent().removeClass('bottom_button').addClass('top_button');
            } else {
                topLink.children('a').html('вниз').parent().removeClass('top_button').addClass('bottom_button');
            }
        });
        topLink.click(function(e) {
            if($(this).hasClass('bottom_button')){
                $("body").scrollTo( pos + 'px', 500 );
            } else{
                pos = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
                $("body,html").animate({scrollTop: 0},500);
            }
            return false;
        });
    });
    
});