// ==UserScript==
// @name          豆瓣电子书插件 
// @namespace     com.douban.book
// @version       1.0
// @include       http://book.douban.com/subject/*
// @exclude       http://movie.douban.com/
// @exclude       http://music.douban.com/
// @exclude       http://book.douban.com/
// @exclude       http://www.douban.com/*
// @exclude       http://9.douban.com/*
// @exclude       http://*.douban.com/subject/*/edit
// @exclude       http://*.douban.com/subject/*/update_image
// @exclude       http://*.douban.com/subject/*/edit?mine
// @exclude       http://*.douban.com/subject/*/new_version
// @exclude       http://*.douban.com/subject/*/offers
// @exclude       http://*.douban.com/subject/*/new_offer
// @exclude       http://*.douban.com/subject/offer/*/
// @exclude       http://*.douban.com/subject/*/cinema?view=ticket
// @exclude       http://*.douban.com/subject/*/doulists
// @exclude       http://*.douban.com/subject/*/all_photos
// @exclude       http://*.douban.com/subject/*/mupload
// @exclude       http://*.douban.com/subject/*/comments
// @exclude       http://*.douban.com/subject/*/reviews
// @exclude       http://*.douban.com/subject/*/new_review
// @exclude       http://*.douban.com/subject/*/group_collectors
// @exclude       http://*.douban.com/subject/*/discussion/
// @exclude       http://*.douban.com/subject/*/wishes
// @exclude       http://*.douban.com/subject/*/doings
// @exclude       http://*.douban.com/subject/*/collections
// ==/UserScript==

function init(){
    var WRAPPER_TMPL =  
        '<div class="gray_ad">'+
            '<h2>购买电子书</h2>' +
            '<ul class="bs noline more-after ">'+
                '<li>'+
                    '<a target="_blank" href="" class="">'+
                        '<span class="">亚马逊中国</span>'+
                        '<span class="buylink-price">'+
                            '(RMB 28.30)'+
                        '</span>'+
                    '</a>'+
                '</li>'+
            '</ul>'+
        '</div>';

    window.processRelatedResult = function (results) {
        var element = $(WRAPPER_TMPL);
        var cnt=0;
        list = element.find("ul");
        $.each(results, function (idx, value) {
            var item=$(ITEM_TMPL_RELATED.replace("{{=url }}",value.url)
                   .replace("{{=title }}",value.title)
                   .replace("{{=rating }}",value.rating)
                   .replace("{{=author }}",value.author)
                   .replace("{{=related }}", value.related));
            element.find("ul").append(item);
            cnt=cnt+1;
            });
        $(".aside").prepend(element);
        //if (!cnt){
            //element.find(".msg").show();
        //}
    }

    var title = $('#wrapper h1 span').html();
    var subjectId = document.location.href.match(/(\d+)/)[1];
    var matchUrl = "http://localhost:8000/api/" + subjectId + "/" + title;
    $.getScript(matchUrl);
}


function contentEval( source ) {
    if ('function' == typeof source) {
        source = '(' + source + ')();';
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}
contentEval( init );
