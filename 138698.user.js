// ==UserScript==
// @name           Unmovable HKGolden 2
// @namespace      http://userscripts.org/users/126938
// @description    An user script for m.hkgolden.com
// @version        2014.03.27-2
// @include        http://m*.hkgolden.com/*
// @updateURL      https://userscripts.org/scripts/source/138698.meta.js
// @downloadURL    https://userscripts.org/scripts/source/138698.user.js
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @grant          none
// @run-at         document-start
// ==/UserScript==

(function() {

var $ = jQuery.noConflict();

function log(data) {
    /*if ($('#mkg').length === 0) {
        GM_addStyle('body { margin-left: 240px; } #mkg { position: fixed; top: 40px; bottom: 0; left: 0; width: 240px; background-color: #D4C5B3; font-size: 11px; }');
        $('body').append('<div id="mkg"><pre id="log"></pre></div>');
    }
    $('#log').append(data + '\n');*/
    console.log(data);
}

if (typeof GM_addStyle === 'undefined') {
    function GM_addStyle(css) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}

/* no-cache */
var noCache = function () {
    if (/\/topics_[a-z]{2}(_\d)?\.htm$/.test(window.location.href)) {
        GM_addStyle('body * { display: none; }');
        window.location.replace(window.location + '?' + Date.now());
        throw '';
    } else if (/\/topics_[a-z]{2}\.htm\?/.test(window.location.href)) {
        history.replaceState('', '', '/topics.aspx?type='+window.location.pathname.match(/^\/topics_([a-z]{2})/)[1].toUpperCase());
    } else if (/\/topics_[a-z]{2}_\d\.htm\?/.test(window.location.href)) {
        history.replaceState('', '', '/topics.aspx?type='+window.location.pathname.match(/^\/topics_([a-z]{2})/)[1].toUpperCase()+'&page='+window.location.pathname.match(/(\d)\.htm$/)[1]);
    };
}();

/* Trim title */
var title = function () {
    if (window.location.pathname === '/error.html') {
        document.title = 'Reload in 10 seconds';
        window.setTimeout(function () {
            window.location.assign('/topics.aspx?type=BW');
        }, 10000);
        throw '';
    } else if (document.title === '- 香港高登') {
        if (window.confirm(':o) 移至桌面版？'))
            window.location.assign(window.location.href.replace(/\/\/m\d*/, '//forum14'));
    } else {
        document.title = document.title.replace(/(香港高登 - | - 香港高登)/, '');
    }
}();

/* Embed */
var unique = [];
var embed = function (a) {
    var x = a.closest('div').width() >= 853 ? [853, 480] : [640, 360];
    var b = a.attr('href').match(/^http:\/\/(forum|m)\d*\.hkgolden\.com\/view\.aspx/);
    if (b) {
        a.attr('href', function() {
            return a.attr('href').replace(/^http:\/\/(forum|m)\d*\.hkgolden\.com\//, '');
        });
        return;
    } else {
        a.attr('target', '_blank');
    }
    /*var b = a.attr('href').match(/https?:\/\/\S+\.(jpg|jpeg|gif|png)$/);
    if (b) {
        a.css('font-style', 'oblique').after('<br><img class="Image" data-src="' + b[0] + '" alt="[img]' + b[0] + '[/img]">');
        return;
    }*/
    if (a.parents('blockquote, .ViewQuote').length > 1) return;
    var b = a.attr('href').match(/^https?:\/\/www\.youtube\.com\/watch\?\S*v=([^\s\/\?\=\&]{11})/) || a.attr('href').match(/^https?:\/\/youtu\.be\/([^\s\/\?\=\&]{11})/);
    if (b) {
        if ($.inArray(b[1], unique) === -1) {
            a.after('<br><iframe width="853" height="480" src="about:blank" data-src="//www.youtube.com/embed/' + b[1] + '?html5=1&rel=0" frameborder="0" allowfullscreen></iframe>');
            unique.push(b[1]);
            return;
        }
    }
    var b = a.attr('href').match(/^https?:\/\/vimeo\.com\/(\d+)/);
    if (b) {
        if ($.inArray(b[1], unique) === -1) {
            a.after('<br><iframe width="640" height="360" src="about:blank" data-src="//player.vimeo.com/video/' + b[1] + '" frameborder="0" allowfullscreen></iframe>');
            unique.push(b[1]);
            return;
        }
    }
    var b = a.attr('href').match(/^https?:\/\/www\.dailymotion\.com\/video\/(\w+)_/);
    if (b) {
        if ($.inArray(b[1], unique) === -1) {
            a.after('<br><iframe width="640" height="360" src="about:blank" data-src="//www.dailymotion.com/embed/video/' + b[1] + '" frameborder="0" allowfullscreen></iframe>');
            unique.push(b[1]);
            return;
        }
    }
    var b = a.attr('href').match(/^https?:\/\/soundcloud\.com\/.+/);
    if (b) {
        if ($.inArray(b, unique) === -1) {
            $.get('http://soundcloud.com/oembed?url=' + a.attr('href') + '&maxwidth=640&maxheight=81&iframe=true', function(data) {
                a.after('<br>' + $(data).find('html').text());
            });
            unique.push(b);
            return;
        }
    }
}

/* Lazy loading */
var lazyload = function () {
    var a = $(window).height() + $(window).scrollTop(),
        b = $(window).scrollTop();
    $('[data-src]').each(function() {
        if (a - $(this).offset().top >= 0 && $(this).offset().top + $(this).height() - b >= 0) {
            $(this).attr('src', $(this).attr('data-src')).removeAttr('data-src');
        }
    })/*.on('error', function () {
        $(this).removeAttr('src')
    })*/;
};

var userStyle = function () {
    //GM_addStyle('.MobileTopPanel, .MobileTopPanel ~ div, .FooterPanel { display: none; }');
    GM_addStyle('#openForumPanel, #forumPanel, span[id^="MsgInLineAd"], .ReplyFunc { display: none; }');
    GM_addStyle('body { padding-top: 40px !important; } .MobileTopPanel { position: fixed; top: 0; left: 0; right: 0; z-index: 1001; } .MobileTopPanel ~ div { margin: auto; max-width: 1280px; }');
    GM_addStyle('#TopicLists div { overflow: visible; } .TopicBox_Details div { display: inline; } .TopicBox_PageSelect { position: relative; bottom: initial; right: initial; padding: 0; float: right; width: 80px; }');
    GM_addStyle('.Image { max-width: 100%; } .ViewQuote .Image { max-height: 240px; }');
    GM_addStyle('.highlight { background-color: #FFFFED; }');
    /* Theme */
    //GM_addStyle('body { font-family: Microsoft YaHei; background-color: #99989B; } .TopicBox, .TopicBox2 { background-color: #f5f4f7; }');
    /* Hide Helianthus.annuus */
    GM_addStyle('#an { display: none; }');
}();

var highlight = function () {
    $('.highlight').removeClass('highlight');
    $('.ViewNameMale, .ViewNameFemale').each(function () {
        if (this.textContent == sessionStorage.getItem('highlight')) {
            $(this).closest('.ReplyBox').addClass('highlight');
        }
    });
};

function main() {
    var t = Date.now();
    /* Global */
    var $select1 = $('<select id="serverSelector"></select>').append('<option>選擇伺服器</option>').on('change', function() {
        if (this.value) location.assign(location.href.replace(/\/\/m\d/, '//' + this.value));
    });
    for (var i = 1; i <= 4; i++) $select1.append($('<option></option>').attr('value', 'm' + i).text('m' + i));
    for (var i = 1; i <= 15; i++) $select1.append($('<option></option>').attr('value', 'forum' + i).text('forum' + i));
    var forums = {'': '請選擇討論區', 'BW': '吹水台', 'ET': '娛樂台', 'CA': '時事台', 'FN': '財經台', 'GM': '遊戲台', 'HW': '硬件台', 'IN': '電訊台', 'SW': '軟件台', 'MP': '手機台', 'AP': 'Apps台', 'SP': '體育台', 'LV': '感情台', 'SY': '講故台', 'ED': '飲食台', 'PT': '寵物台', 'BB': '親子台', 'TR': '旅遊台', 'CO': '潮流台', 'AN': '動漫台', 'TO': '玩具台', 'MU': '音樂台', 'VI': '影視台', 'DC': '攝影台', 'ST': '學術台', 'WK': '上班台', 'TS': '汽車台', 'RA': '電　台', 'MB': '站務台', 'AC': '活動台', 'JT': 'JTV台', 'EP': '創意台'};
    var $select2 = $('<select id="forumSelector"></select>').on('change', function() {
        if (this.value) location.assign('topics.aspx?type=' + this.value);
    });
    $.each(forums, function(key, value) {
        $select2.append($('<option></option>').attr('value', key).text(value));
    });
    $('#openForumPanel').after($select2).after($select1);
    /* index */
    $('span[id^="MsgInLineAd"]').parent().remove();
    /* topics */
    if (window.location.pathname.indexOf('/topics') === 0) {
        $('.TopicAd').remove();
        $('.TopicBox_PageSelect').each(function () {
            $(this).children().first().text(this.length - 1 + ' 頁...');
        });
    }
    /* view */
    if (window.location.pathname === "/view.aspx") {
        $('.ReplyFunc').remove();
        $('.ReplyBox > div:nth-child(2), .ViewQuote').contents().filter(function () {
            return this.nodeType === 3;
        }).each(function () {
            var a = this.nodeValue.match(/(.*)(https?:\/\/[^\s\[\]\<\>\"]+)(.*)/);
            if (a) {
                log(a[2]);
                a[1] && $(this).before(document.createTextNode(a[1]));
                a[3] && $(this).after(document.createTextNode(a[3]));
                $(this).replaceWith('<a href="' + a[2] + '">' + a[2] + '</a>');
            }
        });
        $('.Image').attr('data-src', function () {
            return this.alt.slice(5,-6);
        }).removeAttr('onclick');
        $('.ReplyBox > div:nth-child(2) a').each(function() {
            embed($(this));
        });
        $('<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAADQSURBVDiNY/j//z8DMfjfGbb/IIwuTpTmv5eU/8MMQDeEOM1HRFEMQDYEr+Y/V23+4zIAJIfXAJhmdOfDNH8+FI/bABTNaLaDxe9G/9/RIILdAGI0n1sohN0AmEZc/v71qBpFM4oBKJrRNIJtB9p8Za0DimYUA+AhjkPz7+1mGJoxXQBUCDIIPcSRAw2rAf/eLwD7D90Q5BDHaQBIM9wAoOKnW0XANAyjBxpWA0CaYQaAaFBggfxMSDPYAFCKghkCYsNCGp+zUQxAVkysJmQMADBQ7TSg/aekAAAAAElFTkSuQmCC" />').on('click', function () {
            sessionStorage.setItem("highlight", $(this).prev().text());
            highlight();
        }).insertAfter('.ViewNameMale, .ViewNameFemale');
        highlight();
    }
    /* done */
    //$('.MobileTopPanel, .MobileTopPanel ~ div, .FooterPanel').show();
    $(window).load(lazyload);
    $(window).scroll(lazyload);
    log(Date.now() - t + 'ms');
}

document.addEventListener('beforeload', function (e) {
    /googlesyndication\.com|doubleclick\.net|ads\.yahoo\.com/.test(e.url) && e.preventDefault();
}, true);

document.addEventListener('DOMContentLoaded', main);

})();