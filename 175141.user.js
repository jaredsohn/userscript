// ==UserScript==
// @name        Dobreprogramy by B.Andy
// @namespace   http://korczynskij.pl
// @version     0.4a
// @description Stylizuje nowy layout dobrychprogramów na dawny styl. Do poprawnego działania poprawny jest ten styl: http://userstyles.org/styles/91439/dobreprogramy-dawny-layout?r=1375738100
// @match       http://www.dobreprogramy.pl/
// @match     http://www.dobreprogramy.pl/Aktualnosci,*
// @match     http://www.dobreprogramy.pl/*News*
// @require     http://codeorigin.jquery.com/jquery-1.10.2.min.js
// @copyright   2013, b.Andy from DP
// ==/UserScript==
var blognr = 1;
$(function () {
    
    //Ekrany <= 1260px
 
    if (  $(window).width() < 1260) {
 
        $("body").addClass("c-small");
       
    }
    
    $("body").prepend('<header id="c-top"><div class="top_1"></div><div class="top_2"><div class="logo">&nbsp;</div><div class="space"></div><div class="rightSpace">&nbsp;</div></div></header>');

    //Logowanie i rejestracja
    if ($("#divAnonymous").length > 0) { //Gość
        $("#c-top .top_1").html('<a href="https://ssl.dobreprogramy.pl/Logowanie.html" data-action="loginbox">Logowanie</a><a href="https://ssl.dobreprogramy.pl/Rejestracja.html">Rejestruj</a>');
    } else {
        var username = $("#divUser a").html();
        $("#c-top .top_1").html('<a href="http://www.dobreprogramy.pl/'+username+'">' + username + '</a> &nbsp;&nbsp;&nbsp; <a href="javascript:__doPostBack(\'ctl00$lnkLogoff\',\'\')">Wyloguj</a>');
    }

    $("#c-top").append('<div class="top_3"><div class="logo"></div> <a href="http://dobreprogramy.pl"> <div class="dp"></div></a> <div class="belka"><div id="scroll"><div scrollamount="1"></div></div>   <form action="szukaj.html" method="get"><input type="input" name="q" placeholder="Szukaj" /></form></div></div>');

    $("#c-top").append('<div class="top_4"><div class="logo"></div><div class="sep"></div><div class="menu"></div><div class="end"></div></div>');


    $("#c-top .menu").append('<ul id="hoz-menu"></ul>');

    var menu = $("#hoz-menu");

    menu.append('<li><a href="http://www.dobreprogramy.pl/Aktualnosci,Najciekawsze,0.html">aktualności</a></li>');
    menu.append('<li><a href="http://www.dobreprogramy.pl/Blog.html">blog</a></li>');
    menu.append('<li><a href="http://www.dobreprogramy.pl/Programy,Windows.html">programy</a></li>');
    menu.append('<li><a href="http://www.dobreprogramy.pl/Lab.html">lab</a></li>');
    menu.append('<li><a href="http://www.dobreprogramy.pl/Gry.html">gry</a></li>');
    menu.append('<li><a href="http://forum.dobreprogramy.pl/">forum</a></li>');
    menu.append('<li><a href="http://www.dobreprogramy.pl/netfix">pomoc</a></li>');


    $("#c-top").append('<div class="top_5"><div class="c-box" data-no="0" data-max="3"><h6>Najciekawsze newsy</h6><div class="przewijanie"><div class="disabled lewo">◄</div><div class="prawo">►</div></div><div class="c-scroll" id="super-news"></div></div></div>');

    $("#c-top .top_5").append('<div class="c-box" id="programtyg"><h6>Programy tygodnia</h6></div><div class="c-box" id="bestprog"><h6>Najpopularniejsze programy</h6></div><div class="c-box" data-no="0" data-max="4"><h6>Ostatnio na blogu</h6><div class="przewijanie"><div class="disabled lewo">◄</div><div class="prawo">►</div></div><div class="c-scroll" id="blog-scroll"></div></div><div class="c-box" id="most-comment"><h6>Najczęściej komentowane</h6></div>');

    //Najciekawsze newsy
    $("#phContent_HomeShowcaseControl_topdiv span.info").each(function () {
        $("#super-news").append('<div class="strona"><p style="width:190px;"><a href="' + $(this).parent().attr("href") + '">' + $(this).justtext() + '</a><small>' + $(this).children("span").text() + ' komentarzy</small></p></div>');

    });

   
    $("article#page-content #phContent_divWideImage").prependTo("#phContent_divText");
    $("article#page-content header").prependTo("#phContent_divText");
 $("article#page-content #phContent_ctl01_sBreadcrumb").prependTo("#phContent_divText");
    
    //Programy tygodnia
    var bestprog = $("#phContent_cMostPopular_repToolsTop_img_0").attr("src");
    var bestprog_title = $("#top-total").children("a").attr("title");
    var bestprog_link = $("#top-total").children("a").attr("href");
    var bestprog2_title = $("#top-total").children("a:nth-child(2)").attr("title");
    var bestprog2_link = $("#top-total").children("a:nth-child(2)").attr("href");
    if (bestprog_title !== undefined) {
        $("#bestprog").append('<img src="' + bestprog + '" />');
        $("#bestprog").append('<p><a href="' + bestprog_link + '">' + bestprog_title + '</a></p>');
        $("#bestprog").append('<p class="c-no1"><a href="' + bestprog2_link + '">' + bestprog2_title + '</a></p>');
    }

    var programtyg = $("#phContent_cMostPopular_repTools7Days_img_0").attr("src");
    var programtyg_title = $("#top-7").children("a").attr("title");
    var programtyg_link = $("#top-7").children("a").attr("href");
    var programtyg2_title = $("#top-7").children("a:nth-child(2)").attr("title");
    var programtyg2_link = $("#top-7").children("a:nth-child(2)").attr("href");
    if (programtyg_title !== undefined) {
        $("#programtyg").append('<p><a href="' + programtyg_link + '">' + programtyg_title + '</a></p>');
        $("#programtyg").append('<p class="c-no1"><a href="' + programtyg2_link + '">' + programtyg2_title + '</a></p>');
        $("#programtyg").append('<img src="' + programtyg + '" />');
    }


    //Blogi
    var temp = 0;
    $("#social-blog a").each(function () {
        if (temp < 5) {
            var link = $(this).attr("href");
            var title = $(this).find("h4").html();
            var autor = $(this).find(".span-3 span").html();
            var img = $(this).find("img").attr("src");
            $("#blog-scroll").append('<div class="strona"><p><a href="' + link + '">' + title + '</a><small>' + autor + '</small></p><img src="' + img + '"/></div>');
        }
        temp++;

    });

    //Najczęściej komentowane
    ////patrz niżej


    //Drugi sidebar
    $("#sidebar").before('<div id="sidebar-2"><ul></ul></div><div id="sidebar-2-po"></div>');

    $("#sidebar section").each(function () {
        var co = $(this).children("div").children("h3").html();
        if (co == "Ostatnio na blogu")
            $(this).remove();
        else if (co == "Subskrypcje")
            $(this).remove();
        else if (co == "Ostatnio na forum") {
            lista = $("#sidebar-2 ul");
            $(this).find("a").each(function () {
                var title = $(this).children("h4").justtext();
                if (title != undefined && title != '') lista.append('<li><a href="' + $(this).attr("href") + '">' + title + '</a></li>');
            });
            $(this).remove();
        } else if (co == "Najczęściej komentowane publikacje") {
            var i = 0;
            $(this).find("li").each(function () {
                var a = $(this).children(".table-row").children("a.text-h4");
                $("#most-comment").append('<p style="width:190px;" class="c-no' + i + '"><a href="' + a.attr("href") + '">' + a.html() + '</a></p>');
                i++;
                if (i == 2) return false;
            });
        }
    });
    $("#sidebar-2").append('<div class="c-t" style="margin-top:0;height:25px;">SUBSKRYBUJ</div><div id="subs"><a href="javascript:$(\'#rssModal\').modal(\'show\')" class="rss">&nbsp;</a><a href="http://www.facebook.com/dobreprogramy" class="fb">&nbsp;</a><a href="http://www.twitter.com/dobreprogramy" class="twitter">&nbsp;</a><a href="javascript:$(\'#newsletterModal\').modal(\'show\')" class="newsletter">&nbsp;</a></div>');



    $("#slide-menu .page-element.center").remove();

    $("#news_ticker li a").each(function () {
        $("#scroll div").append('<a href="' + $(this).attr("href") + '">' + $(this).html() + '</a>');

    });


    //Przy głównej stronie trzeba wszystko przesunąć w górę
    //TODO: trzeba się tego pozbyć stąd :P
    if (document.title == "dobreprogramy - portal nie tylko o oprogramowaniu") {
        $("#sidebar").css("margin-top", "-24px");
        $("#sidebar-2").css("margin-top", "-150px");
        $("#page-content .span-8").css("margin-top", "-40px");
    }

    $(".lewo").click(function () {
        if ($(this).hasClass("disabled")) return;
        var temp = $(this).parent().parent();
        temp.attr("data-no", parseInt(temp.attr("data-no")) - 1);
        temp.find(".c-scroll").css("left", (0 - 210 * temp.attr("data-no")) + "px");
        $(this).parent().find(".prawo").removeClass("disabled");
        if (temp.attr("data-no") == 0) $(this).addClass("disabled");
    });
    $(".prawo").click(function () {
        if ($(this).hasClass("disabled")) return;
        var temp = $(this).parent().parent();
        temp.attr("data-no", parseInt(temp.attr("data-no")) + 1);
        temp.find(".c-scroll").css("left", (0 - 210 * temp.attr("data-no")) + "px");
        $(this).parent().find(".lewo").removeClass("disabled");
        if (temp.attr("data-no") === temp.attr("data-max")) $(this).addClass("disabled");
    });
    window.setInterval(function () {
        $(".c-scroll").each(function () {
            var parent = $(this).parent();
            parent.children(".przewijanie").find("div").removeClass("disabled");
            if (parseInt(parent.attr("data-no")) === parseInt(parent.attr("data-max"))) {
                parent.attr("data-no", -1);
                parent.find(".lewo").addClass("disabled");
            }

            parent.attr("data-no", parseInt(parent.attr("data-no")) + 1);
            $(this).css("left", (0 - 210 * parent.attr("data-no")) + "px");
            if (parseInt(parent.attr("data-no")) === parseInt(parent.attr("data-max"))) {
                parent.find(".prawo").addClass("disabled");
            }
        });
    }, 6000);

    var i = 0;
    $("#page-content .span-8 .clearfix").each(function () {

        var url = $(this).find("h4").children("a").attr("href");
        $.ajax({
            url: url,
            context: $(this)
        }).done(function (data) {
            var full = $("#phContent_divMetaBody", $(data)).html();

            var comments = $(this).find('.comments-counter');
            var count = comments.html();
            comments.remove();
            $(this).find("p").html(full).append('<a href="' + url + '#komentarze">Komentarze (' + count + ')</a>');
        });
        i++;
        $(this).children("header").prepend('<a name="news-' + i + '" href="#news-' + (i + 1) + '"><div class="go-down"></div></a>');
    });


    $('#scroll div').marquee('pointer').mouseover(function () {
        $(this).trigger('stop');
    }).mouseout(function () {
        $(this).trigger('start');
    }).mousemove(function (event) {
        if ($(this).data('drag') == true) {
            this.scrollLeft = $(this).data('scrollX') + ($(this).data('x') - event.clientX);
        }
    }).mousedown(function (event) {
        $(this).data('drag', true).data('x', event.clientX).data('scrollX', this.scrollLeft);
    }).mouseup(function () {
        $(this).data('drag', false);
    });

});



jQuery.fn.justtext = function () {

    return $(this).clone()
        .children()
        .remove()
        .end()
        .text();

};


/**
 * author Remy Sharp
 * url http://remysharp.com/tag/marquee
 */

(function ($) {
    $.fn.marquee = function (klass) {
        var newMarquee = [],
            last = this.length;

        // works out the left or right hand reset position, based on scroll
        // behavior, current direction and new direction

        function getReset(newDir, marqueeRedux, marqueeState) {
            var behavior = marqueeState.behavior,
                width = marqueeState.width,
                dir = marqueeState.dir;
            var r = 0;
            if (behavior == 'alternate') {
                r = newDir == 1 ? marqueeRedux[marqueeState.widthAxis] - (width * 2) : width;
            } else if (behavior == 'slide') {
                if (newDir == -1) {
                    r = dir == -1 ? marqueeRedux[marqueeState.widthAxis] : width;
                } else {
                    r = dir == -1 ? marqueeRedux[marqueeState.widthAxis] - (width * 2) : 0;
                }
            } else {
                r = newDir == -1 ? marqueeRedux[marqueeState.widthAxis] : 0;
            }
            return r;
        }

        // single "thread" animation

        function animateMarquee() {
            var i = newMarquee.length,
                marqueeRedux = null,
                $marqueeRedux = null,
                marqueeState = {},
                newMarqueeList = [],
                hitedge = false;

            while (i--) {
                marqueeRedux = newMarquee[i];
                $marqueeRedux = $(marqueeRedux);
                marqueeState = $marqueeRedux.data('marqueeState');

                if ($marqueeRedux.data('paused') !== true) {
                    // TODO read scrollamount, dir, behavior, loops and last from data
                    marqueeRedux[marqueeState.axis] += (marqueeState.scrollamount * marqueeState.dir);

                    // only true if it's hit the end
                    hitedge = marqueeState.dir == -1 ? marqueeRedux[marqueeState.axis] <= getReset(marqueeState.dir * -1, marqueeRedux, marqueeState) : marqueeRedux[marqueeState.axis] >= getReset(marqueeState.dir * -1, marqueeRedux, marqueeState);

                    if ((marqueeState.behavior == 'scroll' && marqueeState.last == marqueeRedux[marqueeState.axis]) || (marqueeState.behavior == 'alternate' && hitedge && marqueeState.last != -1) || (marqueeState.behavior == 'slide' && hitedge && marqueeState.last != -1)) {
                        if (marqueeState.behavior == 'alternate') {
                            marqueeState.dir *= -1; // flip
                        }
                        marqueeState.last = -1;

                        $marqueeRedux.trigger('stop');

                        marqueeState.loops--;
                        if (marqueeState.loops === 0) {
                            if (marqueeState.behavior != 'slide') {
                                marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
                            } else {
                                // corrects the position
                                marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir * -1, marqueeRedux, marqueeState);
                            }

                            $marqueeRedux.trigger('end');
                        } else {
                            // keep this marquee going
                            newMarqueeList.push(marqueeRedux);
                            $marqueeRedux.trigger('start');
                            marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
                        }
                    } else {
                        newMarqueeList.push(marqueeRedux);
                    }
                    marqueeState.last = marqueeRedux[marqueeState.axis];

                    // store updated state only if we ran an animation
                    $marqueeRedux.data('marqueeState', marqueeState);
                } else {
                    // even though it's paused, keep it in the list
                    newMarqueeList.push(marqueeRedux);
                }
            }

            newMarquee = newMarqueeList;

            if (newMarquee.length) {
                setTimeout(animateMarquee, 25);
            }
        }

        // TODO consider whether using .html() in the wrapping process could lead to loosing predefined events...
        this.each(function (i) {
            var $marquee = $(this),
                width = $marquee.attr('width') || $marquee.width(),
                height = $marquee.attr('height') || $marquee.height(),
                $marqueeRedux = $marquee.after('<div ' + (klass ? 'class="' + klass + '" ' : '') + 'style="display: block-inline; width: ' + width + 'px; height: ' + height + 'px; overflow: hidden;"><div style="float: left; white-space: nowrap;">' + $marquee.html() + '</div></div>').next(),
                marqueeRedux = $marqueeRedux.get(0),
                hitedge = 0,
                direction = ($marquee.attr('direction') || 'left').toLowerCase(),
                marqueeState = {
                    dir: /down|right/.test(direction) ? -1 : 1,
                    axis: /left|right/.test(direction) ? 'scrollLeft' : 'scrollTop',
                    widthAxis: /left|right/.test(direction) ? 'scrollWidth' : 'scrollHeight',
                    last: -1,
                    loops: $marquee.attr('loop') || -1,
                    scrollamount: $marquee.attr('scrollamount') || this.scrollAmount || 2,
                    behavior: ($marquee.attr('behavior') || 'scroll').toLowerCase(),
                    width: /left|right/.test(direction) ? width : height
                };

            // corrects a bug in Firefox - the default loops for slide is -1
            if ($marquee.attr('loop') == -1 && marqueeState.behavior == 'slide') {
                marqueeState.loops = 1;
            }

            $marquee.remove();

            // add padding
            if (/left|right/.test(direction)) {
                $marqueeRedux.find('> div').css('padding', '0 ' + width + 'px');
            } else {
                $marqueeRedux.find('> div').css('padding', height + 'px 0');
            }

            // events
            $marqueeRedux.bind('stop', function () {
                $marqueeRedux.data('paused', true);
            }).bind('pause', function () {
                $marqueeRedux.data('paused', true);
            }).bind('start', function () {
                $marqueeRedux.data('paused', false);
            }).bind('unpause', function () {
                $marqueeRedux.data('paused', false);
            }).data('marqueeState', marqueeState); // finally: store the state

            // todo - rerender event allowing us to do an ajax hit and redraw the marquee

            newMarquee.push(marqueeRedux);

            marqueeRedux[marqueeState.axis] = getReset(marqueeState.dir, marqueeRedux, marqueeState);
            $marqueeRedux.trigger('start');

            // on the very last marquee, trigger the animation
            if (i + 1 == last) {
                animateMarquee();
            }
        });

        return $(newMarquee);
    };
}(jQuery));