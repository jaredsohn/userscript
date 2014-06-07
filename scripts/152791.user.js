// ==UserScript==
// @name        The Lost Hot Comments for cnbeta
// @namespace   xierch
// @description 找回 cnBeta.COM 定期消失的热门评论
// @include     http://www.cnbeta.com/articles/*
// @include     http://cnbeta.com/articles/*
// @version     0.3
// @grant       GM_xmlhttpRequest
// ==/UserScript==
// Special thanks: @mybeky


var sid = location.href.match(/\d+/)[0];
var n_url = 'http://www.cnbeta.com/comment.htm?op=info&page=1&sid=' + sid;
//var c_url = 'http://py.imorz.tk/tools/cb/comment/' + sid;
var h_url = 'http://py.imorz.tk/tools/cb/hotcomment/' + sid;


function isOldPost() {  // Before the theme changed, 
    var dom = document.getElementsByClassName('title_bar');
    if (dom.length != 1) return true;
    dom = dom[0].getElementsByClassName('date');
    if (dom.length != 1) return true;
    date = dom[0].innerHTML.replace(' ','T')  // To ISO format
    return new Date(date) < new Date('2013-06-20');
}


GM_xmlhttpRequest({
    method: "GET",
    url: n_url,
    onload: function(response) {
        var result = JSON.parse(response.responseText).result;
        if ((result.comment_num > 0 && result.cmntlist.length == 0) || isOldPost()) {
            GM_xmlhttpRequest({
                method: "GET",
                url: h_url,
                onload: function(response) {
                    var title = document.getElementsByClassName('yellow_bar');
                    if (title.length == 1) { 
                        title = title[0].getElementsByTagName('h4');
                        if (title.length == 1) {
                            title[0].innerHTML += '*';
                        }
                    }
                    document.getElementById('J_hotcommt_list').innerHTML = response.responseText;
                }
            });
        }
    }
});
