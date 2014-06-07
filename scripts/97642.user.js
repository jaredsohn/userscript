// ==UserScript==
// @name           sapoopoo
// @version        0.23
// @author         Rüdiger Diedrich (http://www.rdiedrich.org)
// @namespace      http://rdiedrich.org/userscripts
// @description    A frontend modification to make the SA forums prettier and accessiblier
// @include        http://forums.somethingawful.com/showthread.php*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @grant          none
// @bookmarklet    javascript:var%20s=document.createElement('script');s.setAttribute('src','http://userscripts.org/scripts/source/97642.user.js');document.body.appendChild(s);void(s);
// ==/UserScript==


(function sapoopoo($) {

    if (/FYAD/.test($('.breadcrumbs:first a').eq(2).text()) ||
        /YOSPOS/.test($('.breadcrumbs:first a').eq(3).text()))
        return true;

    $.fn.blink = function(){
        var oldopa = $(this).css('opacity'),
            $this = $(this);
            $(this).css('opacity','0');

        window.setTimeout(function(){
            $this.css('opacity',oldopa);
        },400);
    };

    $.fn.image_popup = function () {
        // :(
        $('body').css({overflow:'hidden'})            
        var $div = $('<div id="image_popup" />').css({
            position:'fixed',top:0,left:0,
            background:'#222',zIndex:'100',
            width: $(window).width()+'px',
            height: $(window).height()+'px'
        });
        var $img = $(this).clone();
        $('body').prepend($div);
        if ($div.width() / $div.height() < $(this).width() / $(this).height()) {
            $img.css({width:'100%'});
        }
        else {
            $img.css({height:'100%'});
        }
        $img.appendTo($div).css({
            position:'absolute',margin:'auto',
            top:'0',right:'0',bottom:'0',left:'0'
        });
        $div.click(function(){$(this).remove();$('body').css({overflow:'auto'})});
        return $(this);
    };

    $.fn.flash = function(onoff){
        var interval = 900,
            $this = $(this);

        if (onoff=="off") {
            $this.data('flash','off');
        }
        else {
            $this.data('flash','on');
            $this.animate(
                {'opacity':'0.01'},
                {'duration':interval/2,'complete':function(){
                    $this.animate(
                        {'opacity':'1'},
                        {'duration':interval/2,'complete':function(){
                            if ($this.data('flash')=="on") {
                                $this.flash()}}})}});
        }

        return $this;
    };

    var version = GM_info ? GM_info.script.version : "";
    var $breadcrumbs = $('div.breadcrumbs:first a').not('.pages a').clone();

    var showthread = (function(){
        var query_dict = {};
        var query_re = /[\?&](\w+)=([\w\d]+)/g;
        var result_array;
        while ((result_array = query_re.exec(location.href)) != null) {
            query_dict[result_array[1]] = result_array[2];
        }
        return query_dict;
    })();

    var pageUrl = 'showthread.php?threadid='+showthread.threadid+
        (showthread.userid ? "&userid="+showthread.userid : "")+
        '&pagenumber=';
    var rapSheetUrl = 'banlist.php?userid=';
    var loading = false;
    var maxPage = 1;
    var currentPage = 1;
    if ($('div.pages').text().replace(' ','').length > 0) {
        maxPage = parseInt(/Pages \((\d+)\)/.exec($('div.pages').html())[1]);
        currentPage = parseInt(/<span class="curpage">(\d+)/.exec($('div.pages').html())[1]);
    }

    var $button_bookmark = $('#button_bookmark').clone(true).css({'float':'left','margin-right':'3px'});
    var $link_bookmark = $('#bookmark_link').clone(true);

    function extractPosts (html) {
        var $posts = $('table.post',html);
        var $extractposts = $posts.filter(':not(.ignored)');

        if ($('div.pages',html).text().replace(' ','').length > 0) {
            maxPage = parseInt(/Pages \((\d+)\)/.exec($('div.pages',html).html())[1]);
        }

        $extractposts
            .css({
                'table-layout':'fixed',
                'width':'90%',
                'margin':'1em auto 0',
                'border-width':'0',
                'box-shadow':'0 0 5px #999'
            })

            .find('td')
            .css({
                'border-width':'0',
                'background':'#eee',
            }).end()

            .find('td,.userinfo dt,.userinfo dd')
            .css({
                'font-family':'sans-serif'
            }).end()

            .find('.cancerous')
            .removeClass('cancerous')
            .end()

            .find('.postbody')
            .css({'padding':'0.7em 1em'})
            .end()

            .find('dl.userinfo')
            .css({'padding-top':'0.7em'})
            .end()

            .find('.postbody img.timg')
            .removeClass('timg')
            .css({
                'visibility':'visible',
                'max-width':'100%'
            })
            .click(function(){$(this).image_popup()})
            .end()

            .find('.postbody img.img,.postbody .attachment img')
            .css({
                'max-width':'100%'
            })
            .click(function(){$(this).image_popup()})
            .end()

            .find('code').css({'overflow-x':'auto'}).end()

            .find('.bbc-block').css({
                'border':'0',
                'margin':'1em 0',
                'border-left':'#999 1px dotted',
                'padding':'0 0 0.5em 1.5em'
            })
            .find('h4,h5').css({
                'border':'0',
                'padding':'0',
                'margin':'0 0 1em -0.5em'
            }).end()
            .end()

        if ($posts.length == 40) {
            $extractposts.push($('<div />').addClass('page-break').css({
                'width':'517px','height':'150px',
                'background':'url(http://i.imgur.com/XBSjj.png) no-repeat 0 0',
                'margin':'3em auto'
            }));
        }

        return $extractposts;
    };

    $.fn.appendRapSheets = function () {
        return $(this).find('.profilelinks').each(function(){
            var userid = $(this).find('a:last').attr('href')
                .match(/userid=(\d+)/)[1];

            $(this).append('<li><a href="'+rapSheetUrl+userid+'">Rap Sheet</a></li>');
        }).end();
    };

    var $thisPagesPosts = extractPosts($('body').html());
    $('body').empty();
    $('<div id="thread" />')
        .css({'width':'100%'})
        .appendTo('body');
    $thisPagesPosts.each(function(){$(this).appendTo('#thread');});

    $link_bookmark.appendTo('body');

    var $tooba = $('<div id="tooba" />')
        .css({
            position:'fixed',top:'0', width:'100%',height:'1.25em',zIndex:'10',
            background:'#006699',color:'white',opacity:'1',
            fontFamily:'sans-serif',padding:'0.1em 0.2em'
        })
        .appendTo('body')
        .append($button_bookmark)
        .append($breadcrumbs);
    $('a',$tooba).css({'color':'#fff','text-decoration':'none'}).not(':last').after(' &gt; ');

    var $debug = $('<div id="debug" />')
        .css({
            cssDisplay:'none',
            position:'fixed',top:'0',right:'0',zIndex:'11',
            background:'#006699',color:'#ccf',
            fontFamily:'monospace',fontWeight:'bold',padding:'0.1em 0.2em'
        })
        .appendTo('body');

    $(window).scroll(function(e){
        var threshold = $('table.post').length-5 >= 1 ? $('table.post').length-5 : 1;
        var threshold_post = $('table.post')[threshold];
        var threshold_post_top = parseInt(threshold_post.getBoundingClientRect().top);
        var screen_bottom = window.innerHeight;
        var nextPage = currentPage + 1;

        $debug.text(
            threshold_post_top+' '+
                screen_bottom +' '+$('table.post').length+' '+currentPage+' ('+maxPage+')'+' '+
                version);


        if (currentPage < maxPage && !loading &&
            screen_bottom > threshold_post_top) {
            
            loading = true;
            $(".page-break:last").flash("on");
            $link_bookmark.hide();

            $.ajax({
                url:pageUrl+nextPage,
                async:true,
                dataType:'html',
                success:function(html){
                    $('#debug').blink();
                    $(".page-break:last").flash("off");

                    var posts = extractPosts(html).appendRapSheets();
                    for (var i=0; i<posts.length; i++) {
                        $('#thread').append(posts[i]);
                    }
                    loading = false;
                    $link_bookmark.show();
                    currentPage += 1;
                    maxPage = parseInt(/Pages \((\d+)\)/.exec(html)[1]);
                    if (window.history.pushState) {
                        window.history.pushState({},document.title,pageUrl+currentPage);
                    }
                },
                error:function(jqXHR, textStatus, errorThrown){
                    loading = false;
                    $(".page-break:last").flash("off");
                    $link_bookmark.show();
                }
            });
        }
    });
})(jQuery);
