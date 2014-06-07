// ==UserScript==
// @name       new douban
// @namespace  http://ktmud.com/
// @version    0.3.4
// @run-at     document-start
// @include    http*://*.douban.com/*
// @exclude    http://img*.douban.com/*
// @copyright  2012+, Jesse Yang
// ==/UserScript==

function resetNavWidth() {
    var w = document.getElementById('wrapper');
    var nav = w && document.getElementById('db-global-nav');
    var bd = nav && nav.getElementsByClassName('bd', 'div')[0];
    if (!w || !bd) return;
    bd.style.width = w.offsetWidth + w.offsetLeft - 6 + 'px';
}
document.addEventListener('DOMContentLoaded', resetNavWidth);
window.addEventListener('resize', resetNavWidth);

function init() {
    var c = '.global-nav .top-nav-reminder .num { position: static; }' +
        '#db-global-nav > .bd { margin-left: 0; }' +
        'body .global-nav .top-nav-reminder .more-items { width: 300px; box-shadow: 0 1px 5px rgba(0,0,0,0.2); border-color: #aaa; border-top: 0; }' +
        'body .global-nav .top-nav-reminder .more-items li { border-bottom: 1px dotted #ccc; }' +
        '.global-nav .top-nav-reminder .more-items .ft { margin-top: -1px; border-top: 1px solid #d0d0d0; }' +
        'body .global-nav .top-nav-reminder .lnk-remind { background: #444; }' +
        '.global-nav { box-shadow: inset 0 -1px 2px rgba(0,0,0,0.5); }' +
        'body .global-nav .top-nav-reminder .num { position: static; }' +
        '.global-nav .top-nav-reminder .num i { display: none; }' +
        '#db-nav-sns .nav-items a, #db-nav-location .nav-items a,  #db-nav-location .nav-items span { display: inline-block; padding: 2px 10px; border-radius: 2px; }' +
        '#db-nav-sns .nav-items li,  #db-nav-location .nav-items li { margin: 0 20px 0 -10px; }' +
        '#db-nav-sns .nav-items { margin-top: 13px; }' +
        '#db-nav-location .nav-items { margin: 11px 0 0 15px; }';
    
    if (location.pathname == '/' || location.pathname.indexOf('/status/') != -1) {
        c += '.status-item .hd div.text { display: block; left: 0; padding-left: 60px; } ' +
            '.status-item blockquote { color: #333; }' +
            '.status-item .hd .text a.lnk-people:link, .status-item .hd .text a.lnk-people:visited { color: #37a; } .status-item .hd .text a.lnk-people:hover { color: #fff; }' +
            '.status-item .hd div.usr-pic { width: auto; position: absolute; left: 0; }' +
            '.status-item .hd div.text { padding-left: 0; }' +
            '.status-item .bd, .status-item .hd { padding-left: 60px }' +
            '.status-item .hd div.pubtime { left: auto; }' +
            '.status-item div.bd { padding-bottom: 16px; border-bottom-color: #eaeaea; }' +
            '.status-item .mod div.actions, .status-item .mod div.likers, .status-item .mod div.comments, .status-item .mod div.attachments-saying { padding-left: 0 }' +
            '.status-item div.mod { margin-bottom: 16px; }' +
            '.status-item .mod div.actions { margin-top: 10px; }' +
            '.status-item .mod div.block-song { margin: 6px 0 6px 0px }' +
            'div.combined-statuses { margin: 0 0 20px 0; padding-left: 0; }' +
            '.status-item .mod div.attachments-pic { margin-bottom: 0; } .status-item .mod .attachments-pic img { margin-bottom: 12px; }' +
            '.status-item .hd div.usr-pic img { width: 40px; height: 40px; }';
    }
    if (location.pathname.indexOf('/status/') != -1) {
        c += '.status-item .hd div.usr-pic img { width: 48px; height: 48px; }';
    }
    
    var s = document.createElement('style');
    s.textContent = c;
    document.head.appendChild(s);  
}
function updateLogo() {
    var el = document.querySelector('#db-nav-sns div.site-nav-logo a') ||
        document.querySelector('#db-nav-sns div.nav-logo a');
    if (el && el.pathname === '/') el.href = 'http://www.douban.com/update/';
    
    el = document.querySelector('div.global-nav-items a');
    if (el) el.href = 'http://www.douban.com/update/';
}

function updateTimeline() {
    
    function addCSS(css) {
        var s = document.createElement('style');
        s.textContent = css;
        document.head.appendChild(s);
    }
    
    function addJS(cont) {
        var s = document.createElement('script');
        s.textContent = cont;
        document.head.appendChild(s);
    }
    
    if (typeof Do === 'undefined') return;
    
    Do(function() {
        
        var win = $(window);
        
        function ajaxfyStatuses() {
            $('#statuses').delegate('.paginator a', 'click', function(e) {
                var url = this.href;
                var link = $(this);
                e.preventDefault();
                $.get(url, function(res) {
                    var m4 = res.match(/<div class="stream-items">([\s\S]+class="paginator"[\s\S]+?<\/div>)/m);
                    $('.stream-items').html(m4[1]);
                    Do('http://img3.douban.com/js/packed_statuses830596496.js', function(){
                        $(function(){var a=$(".stream-items");a.find(".mod").each(function(c,e){var d=$(this),f=d.attr("data-status-id");var b=new Status($(this),f);b.init()});a.find(".btn[data-action-type=expend-all]").click(function(b){b.preventDefault();$(this).parent().prevAll(".status-item").show().end().remove()});a.delegate(".video-overlay","click",function(b){$(this).next(".video-object").show();$(b.target).hide().prev().hide()}).delegate(".video-object .back","click",function(b){b.preventDefault();$(this).parent().hide().prevAll().show()}).delegate(".bd blockquote a, .comments-items a:not(.btn)","click",function(h){var f=$(h.target).parents(".status-item");var b=f.attr("data-sid");var g=f.attr("data-action");var d=f.attr("data-target-type");var c=f.attr("data-object-kind");moreurl(this,{from:"nmbp-"+b,action:g,target_type:d,object_kind:c})})});
                    });
                    link.parents('.paginator').remove();
                    node.animate({ scrollTop: 0 }, 200);
                });
            });;
        }
        
        var is_p = ($('.paginator a').eq(2).attr('href') || '').split('start=').length === 1;
        var PER_PAGE = $('.stream-items').length;
        function statusAutoLoad() {
            var st = $('.stream-items');
            if (!st.length) return;
            var h = st.height();
            var win = $(window);
            var vh = win.height();
            var n = 1;
            var page_arg = is_p ? 'p' : 'start';
            var tmp = location.search.split(page_arg + '=');
            if (tmp.length == 2) {
                n = parseInt(tmp[1].split(/&(amp;)?/)[0], 10) || 1;
            } 
            var c = 1;
            var loading = false;
            
            
            function load(p){
                p = is_p ? p : p * PER_PAGE;
                var url = location.search || '?' + page_arg + '=' + p;
                if (url.indexOf(page_arg + '=') === -1) {
                    url += '&' + page_arg + '=' + p;
                }
                url = url.replace(new RegExp('(&(amp;)?|\\?)' + page_arg + '=[\\d]*'), '$1' + page_arg + '=' + p);

                $.get(url, function(res) {
                    c++;
                    loading = false;
                    var m = res.match(/<div class="stream-items[^"]*?"[^>]*?>([\s\S]+)<\/div>\s*<div class="paginator"/);
                    var a = $('<div id="p_'+ p +'"></div>');
                    a.html(m[1]);
                    a.find(".mod").each(function(c,e){var d=$(this),f=d.attr("data-status-id");var b=new Status($(this),f);b.init()});a.find(".btn[data-action-type=expend-all]").click(function(b){b.preventDefault();$(this).parent().prevAll(".status-item").show().end().remove()});
                    st.append(a.children());
                });
            }
            
            win.bind('scroll', function(e) {
                if (!loading && c < 15 && window.scrollY + vh + 200 > st.height()) {
                    loading = true;
                    load(n+c);
                }
            });
        }
        var reg_css = /<style type="text\/css">([\s\S]+?)<\/style>/;
        function copyCSS(res, indicator) {
            var m = reg_css.exec(res);
            if (indicator) {
                while (m && m[0].indexOf(indicator) == -1) {
                    m = reg_css.exec(res);
                }
            }
            m && addCSS(m[1]);
        }
        
        var reg_js = /<script(\s+type="text\/javascript")?>([\s\S]+?)<\/script>/g;
        function copyJS(res, indicator) {
            var m = reg_js.exec(res);
            if (indicator) {
                while (m && m[0].indexOf(indicator) == -1) {
                    m = reg_js.exec(res);
                }
            }
            m && addJS(m[2]);
        }
        
        statusAutoLoad();
        
        if (location.pathname == '/') {
        } else if (location.pathname == '/update/') {
            var fix_conf = { marginTop: 10, marginBottom: 10 };
            //var b = document.createElement('base');
            //b.target = 'db-update';
            //document.head.appendChild(b);
            var body = $(document.body);
            win.bind('keydown', function(e){
                if (e.target !== document.body) return;
                // left
                if (e.keyCode == 37) {
                    show_guess();
                } else if (e.keyCode == 39) {
                    hide_guess();
                    //} else if (e.keyCode == 72) { // "h"
                    //toggle_guess();
                }
                    });
            $('div.aside').dblclick(function() {
                toggle_guess();
            });
            
            var st_top = gs_top = 0;
            function toggle_guess() {
                if (guess_shown()) {
                    hide_guess();
                } else {
                    show_guess();        
                }
            }
            function guess_shown() {
                return body.hasClass('right-as-main');
            }
            function hide_guess() {
                gs_top = window.scrollY;
                body.removeClass('right-as-main').animate({scrollTop:st_top},200);
            }
            var loading = false;
            var show_guess = function() {
                if (loading) return;
                loading = true;
                $.get('/', function(res) {
                    copyCSS(res, 'guess');
                    addCSS('.grid-16-8 .article{padding-right:20px;}.grid-16-8 .aside{width:330px;}'+
                           '.guess3-list{display:none;}'+
                           '.right-as-main .ori{display:none;}'+
                           '.right-as-main .guess3-list{display:block;width:880px;}.right-as-main .aside{width:900px;}'+
                           '.right-as-main .article{height:3000px;background:#f9f9f9;border-right:1px solid #eee;width:10px;padding:0;}'+
                           '.right-as-main .article *{display:none;}'+
                           'h1{display:none;}.guess3-list{width:310px;background:#fff;padding-left:10px;}' +
                           '.guess3-list .bd{width:auto;float:none;}.guess3-list .usr-btn{display:none;}' +
                           '.guess3-list .source{white-space:nowrap;}.guess3-list .content{overflow:visible;}'+
                           '.abum-item .pic a *{width:auto;max-width:300px;}'+
                           '.right-as-main .album-item .pic span {width:auto !important;height:auto !important;margin-right:2px;}'+
                           '.right-as-main .album-item .pic a > *{max-width:290px;max-height:190px;}'+
                           '.right-as-main .album-item .pic img {width:auto;max-width:290px;max-height:190px;}'+
                           '.right-as-main .album-item .pic i {display:none;}'+
                           '.guess-more{width:auto;float:none;}'+
                           '.event-item .pic, .subject-item .pic{margin-left:10px;}');
                    var m = res.match(/(<div class="guess3-list">[\s\S]+<\/div>)[\s]*<input.+id="guess-hidden-value"/);
                    if (!m) return;
                    var side = $('.aside');
                    var sh = side.html();
                    side.html(m[1]);
                    side.prepend('<div class="ori">'+sh+'</div>');
                    copyJS(res, 'guess-more');
                    var mo = $('.a_guess_more');
                    Douban.init_guess_more(mo);
                    var node = $('.guess3-list');         
                    var c = 0;
                    win.bind('scroll', function(e) {
                        if (c < 10 && guess_shown() &&
                            window.scrollY + window.innerHeight > node.height()) {
                            c++;
                            mo.click();
                        }
                    });
                    show_guess = function() {
                        st_top = window.scrollY;
                        body.addClass('right-as-main').animate({scrollTop:gs_top}, 200);
                    };
                    show_guess();
                });
            }
            }
            });
}
function contentEval( source, par ) {
    par = par || 'head';
    if(!document[par]) {
        return setTimeout(function() { contentEval(source, par) }, 10);
    }
    if ('function' == typeof source) {
        source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.textContent = source;
    document[par].appendChild(script);
    document[par].removeChild(script);
}
contentEval(init);
contentEval(updateTimeline, 'body');

document.addEventListener('DOMContentLoaded', updateLogo);