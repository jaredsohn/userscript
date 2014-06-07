// ==UserScript==
// @name          iKindle
// @namespace     com.douban.book
// @version	      v0.1
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
    var WRAPPER_TMPL =  '<div class="ikindle" style="' +
                            'background: #F1FFF1;' +
                            'margin: 5px auto;' +
                            'width: 310px;' +
                            'font-size: 14px;' +
                            'border-radius: 6px;' +
                        '">' +
                            '<p style="' +
                                'border-radius: 6px;' +
                                'padding-left: 5px;' +
                                'padding-top: 5px;' +
                                'margin-bottom: 5px;' +
                                'color: #555;' +
                                'background: #DDD;' +
                                'border-bottom: 1px solid #CCC;' +
                                '">ikindle电子书下载</p>' +
                            '<ul style="' +
                                'padding-left: 5px;' +
                                '"></ul>' +
                            '<p class="msg" style="' +
                                'text-align: center;' +
                                'display: none;' +
                            '">唉 ikindle找不到这本书 :(</p>' +
                        '</div>',
        ITEM_TMPL = '<li style="' +
                        'padding: 3px 12px;' +
                    '">' +
                        '<a target="_blank" href="{{=url }}" style="' +
                            'color: #353;' +
                            'background: #F1FFF1;' +
                        '">' +
                            '{{=title }}' +
                            '<span style="' +
                                'position: relative;' +
                                'display: inline-block;' +
                                'margin-left: 5px;' +
                                'border-color: transparent transparent transparent rgb(51, 85, 51);' + 
                                'border-width: 5px 0 5px 5px;' +
                                'height: 0;' +
                                'line-height: 0;' +
                                'width: 0;' +
                                'top: -1px;' + 
                                'border-style: dashed dashed dashed solid;' +
                            '"></span>'
                        '</a>' +
                    '</li>';

    window.processMatchResult = function (result) {
        var element = $(WRAPPER_TMPL);
        if (result.success) {
            var item =$(ITEM_TMPL.replace("{{=url }}", result.url)
                .replace("{{=title }}", result.title));
            element.find("ul").append(item);

            element.delegate("a", "mouseenter", function (e) {
                $(this).css("color", "green");
            }).delegate("a", "mouseleave", function (e) {
                $(this).css("color", "#353");
            });


            if (element.is(":first")) {
                element.css("position", "relative").css("top", "-18px");
            }
            $(".aside").prepend(element);
        } else {
            var keyword = encodeURIComponent($("#header+h1 span").text()),
                searchUrl = "http://www.google.com/uds/GwebSearch?callback=processSearchResult&rsz=filtered_cse&hl=en&source=gcsc&gss=.com&sig=35a6b5cbb7ddbc2bce816880d53df1f2&cx=011397888887957286187:j5zd9qxmh8g&gl=www.google.com&qid=1369fe1b618633b4&context=0&key=notsupplied&v=1.0&nocache=" + Math.random() + "&q=" + keyword;

            $.getScript(searchUrl);
        }
    };

    window.processSearchResult = function (_, object) {
        var element = $(WRAPPER_TMPL);
        if (object.results.length) {
                list = element.find("ul");
            $.each(object.results.slice(0, 5), function () {
                var item =$(ITEM_TMPL.replace("{{=url }}", this.url)
                    .replace("{{=title }}", this.titleNoFormatting));
                list.append(item);
            });

            element.delegate("a", "mouseenter", function (e) {
                $(this).css("color", "green");
            }).delegate("a", "mouseleave", function (e) {
                $(this).css("color", "#353");
            });


            if (element.is(":first")) {
                element.css("position", "relative").css("top", "-18px");
            }
        } else {
            element.find(".msg").show();
        }
        $(".aside").prepend(element);
    }

    var subjectId = document.location.href.match(/(\d+)/)[1];
    var matchUrl = "http://ikandou.com/api/search?callback=processMatchResult&bookid=" + subjectId;

    $.getScript(matchUrl);

}

function contentEval( source ) {
	if ('function' == typeof source) {
		source = '(' + source + ')();'
	}
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;
	document.body.appendChild(script);
	document.body.removeChild(script);
}
contentEval( init );

