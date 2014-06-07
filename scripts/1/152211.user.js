// ==UserScript==
// @name            douban_book_hrbnu
// @namespace       douban_book_hrbnu
// @version         0.1
// @description     hrbnu library collections in douban books page.
// @match           *://book.douban.com/subject/*
// @match           *://book.douban.com/isbn/*
// @author          stormluke1130@gmail.com
// ==/UserScript==

function dict2QueryStr(dict) {
    var str = '';
    for(var key in dict) {
        str += key+'='+encodeURIComponent(dict[key])+'&';
    }
    return str;
}

function fuckAsp(html) {
    var dict = {};
    var pattern = /<input type="hidden" name="(.*?)" id="\1" value="(.*?)" \/>/g;
    while(pattern.test(html)) {
        dict[RegExp.$1] = RegExp.$2;
    }
    return dict;
}

function build(dict, title, isAbs) {
    dict['ScriptManager1'] = 'UpdatePanel1|Button1';
    dict['Button1'] = '开始检索';
    dict['DropDownList1'] = '所有';
    dict['DropDownList2'] = '馆藏书目库';
    dict['DropDownList3'] = '入藏日期';
    dict['DropDownList4'] = isAbs?'前方一致':'中间一致';
    dict['DropLanguage'] = '不限';
    dict['DrpHouse'] = '所有馆';
    dict['RadioButtonList'] = '列表方式';
    dict['TxtIndex'] = title;
    dict['hidtext'] = '题名';
    dict['hidValue'] = '馆藏书目库';
}

function changeDouban(html, data) {
    var htmlStr = '<ul class="bs">';
    if(/没有检索到任何图书/.test(html)) {
        htmlStr += '<li>没这书啊亲<a target="_blank" href="'+url+'" class="rr">> 你骗我</a></li>';
    } else {
        var total = 0;
        var avaliable = 0;
        var similar = 0;
        var namePattern = /<a.*?>《(.*?)》.*?<\/a>/g;
        var numPattern = /馆藏数:\[(\d+)]\s可外借数:\[(\d+)]/g;
        while(namePattern.test(html)) {
            var title = RegExp.$1.toString();
            numPattern.test(html);
            if(title.toUpperCase() == doubanBookInfo.title.toUpperCase()) {
                total += parseInt(RegExp.$1);
                avaliable += parseInt(RegExp.$2);
            } else {
                similar += 1;
            }
        }
        if(total) {
            htmlStr += '<li>有 '+avaliable+' 本可以外借，馆藏共 '+total+' 本';
        } else {
            htmlStr += '<li>没这书啊亲，不过';
        }
        if(similar) {
            htmlStr += '</li><li>还有 '+similar+' 个相似的<a target="_blank" href="'+url+'?'+dict2QueryStr(data)+'" class="rr">> 去看看</a></li>';
        } else {
            htmlStr += '<a  target="_blank" href="'+url+'?'+dict2QueryStr(data)+'" class="rr">> 去看看</a></li>';
        }
    }
    htmlStr += '</ul>';
    $('#douban_book_hrbnu').html(htmlStr);
}

if(unsafeWindow.jQuery) {
    var jQuery = unsafeWindow.jQuery;
    var $ = jQuery;
}
var url = 'http://lib.hrbnu.edu.cn/gdlisweb/default.aspx';
var doubanBookInfo = {
    'title': $('h1>span').text()
};

var htmlStr = '<h2>在图书馆借这本书  · · · · · ·</h2><div class="indent" id="douban_book_hrbnu"><img src="data:image/gif;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA" /></div>'
$('.aside').prepend(htmlStr);

GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    onload: function(response) {
        var data = fuckAsp(response.responseText);
        build(data, doubanBookInfo.title, true);
        GM_xmlhttpRequest({
            method: 'POST',
            url: url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: dict2QueryStr(data),
            onload: function(response) {
                changeDouban(response.responseText, data);
            }
        });
    }
});