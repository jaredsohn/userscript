// ==UserScript==
// @name           douban live
// @namespace      www.douban.com
// @description    豆瓣小组话题只看楼主的帖子 
// @include        http://www.douban.com/group/topic/*
// @author         viking
// ==/UserScript==
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://img3.douban.com/js/packed_jquery.min1.js';
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
        letsJQuery(unsafeWindow.jQuery);
    }
}

// All your GM code must be inside this function
function letsJQuery($) {
    $(function(){
        //cookie functions
        function getCookie( name ) {    
            var start = document.cookie.indexOf( name + "=" );
            var len = start + name.length + 1;
            if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
                return null;
            }
            if ( start == -1 ) return null;
            var end = document.cookie.indexOf( ';', len );
            if ( end == -1 ) end = document.cookie.length;
            return unescape( document.cookie.substring( len, end ) );
        }



        function setCookie( name, value, expires, path, domain, secure ) {
            var today = new Date();
            today.setTime( today.getTime() );
            if ( expires ) {
                expires = expires * 1000 * 60 * 60 * 24;
            }
            var expires_date = new Date( today.getTime() + (expires) );
            document.cookie = name+'='+escape( value ) +
                ( ( expires ) ? ';expires='+expires_date.toGMTString() : '' ) + //expires.toGMTString()
                ( ( path ) ? ';path=' + path : '' ) + 
                ( ( domain ) ? ';domain=' + domain : '' ) +
                ( ( secure ) ? ';secure' : '' );
        }



        function deleteCookie( name, path, domain ) {
            if ( getCookie( name ) ) document.cookie = name + '=' +
                    ( ( path ) ? ';path=' + path : '') +
                    ( ( domain ) ? ';domain=' + domain : '' ) +
                    ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
        }

        //cache jquery object
        var reply = $('.topic-reply li');
        var pagnation = $('.paginator a');

         //add the button
        var live = $('<div class="closelive"><input type="button" value="开启直播"/></div><p style="clear:both"></p>');
        var css = {'padding':'3px','border':'1px solid #4F946E','color':'#4F946E','background':'#fff','border-radius':'2px','font-size':'13px','cursor':'pointer'};
        var oncss = {'padding':'3px','border':'1px solid #FF7676','color':'#fff','background':'#ff9494','border-radius':'2px','font-size':'13px','cursor':'pointer'};
        live.css({'float':'left'});
        var button = live.find('input');
        button.css(css);
        $('#content h1').css({'float':'left'}).after(live);
        
        //get the topid
        var url = window.location.href;
        var topid = getTopid();
        var tophref = 'http://www.douban.com/people/' + topid + '/';
        function getTopid(){
            if(url.indexOf('?') == -1 || url.indexOf('?start=0') != -1){
                var tophref = $('.topic-content .user-face a').attr('href');
                var topid = tophref.replace(/http:\/\//g,'');
                var temp = topid.split('/');
                topid = temp[2];
            }else{
                var topid = url.split('?')[1].split('&')[1].split('=')[1];
            }
            return topid;
        }
        //fix elevator 
        (function fixEle(){
            var links = $('.topic-doc p a');
            links.each(function(i){
                var self = $(this);
                var href = self.attr('href');
                if(href.indexOf('?start=') != -1){
                    var temp = href.split('&')[0];
                    var extra = "&user=" + topid;
                    temp += extra;
                    self.attr('href',temp);
                }
            })
        })();
        //add Pagnation
        (function addPagnation(topid){
            pagnation.each(function(i){

                if($(this).html() == 1){
                    this.href = this.href.split('?')[0];
                }else{
                    var extra = "&user=" + topid;
                    this.href += extra;
                }
            })
        })(topid);

        //checking the cookie
        var cookie = getCookie('live_status');
        if(cookie == ''){
            
        }else if(cookie == 'on'){
            open();
        }else{
            close();
        }
        //get the url
        //setCookie('douban_status',status);



        function open(){
            live.removeClass('closelive').addClass('openlive');
            button.val('关闭直播').css(oncss);
            reply.each(function(i){
                var self = $(this);
                var href = self.find('.user-face a').attr('href');
                if(href != tophref){
                    self.hide();
                }
            })
        }
        function close(){
            live.removeClass('openlive').addClass('closelive');
            button.val('开启直播').css(css);
            reply.show();
        }
        live.bind('click',function(){
            if($(this).attr('class') == 'closelive'){
                open();
                setCookie('live_status','on');
            }else{
                close();
                setCookie('live_status','off');
            }
        })
        
    });
}