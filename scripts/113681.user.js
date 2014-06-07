// ==UserScript==
// @name    pixiv_bookmark_with_star
// @description    ブックマークするときに同時に10点評価する Requirement: Chrome or Firefox
// @version    1.1
// @namespace    http://www1.icnet.ne.jp/a7v83w2r/
// @include    http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @include    http://www.pixiv.net/novel/show.php?id=*
// @match    http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @match    http://www.pixiv.net/novel/show.php?id=*
// ==/UserScript==

(function(){

/*Main Logic
if(!$('.rating').hasClass('rated')) {
    pixiv.rating.rate = 10;
    $('.rating').click();
}
*/

var isRated = function() {
    document.querySelector('.rated') != null
};

if(isRated()) {
    return;
}


var bookmark = document.querySelector('.bookmark a.ui-button');
var href = bookmark.href;
bookmark.href = 'javascript:void 0';

var addHandler = function() {
    bookmark.addEventListener('click', function(){
        var timeout = 50;
        
        if(!isRated()) {
            var countup = 'javascript:pixiv.rating.rate = 10;$(".rating").click();';
            location.href = countup;
            var timer = setInterval(function(){
                if(!isRated()) {
                    clearInterval(timer);
                    location.href = href;
                }
            }, timeout);
        } else {
            location.href = href;
        }
    },false);
};

addHandler();

})();
