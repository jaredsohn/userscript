// ==UserScript==
// @name           buscanet
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @namespace      achmad.abed
// @include        http://busca-usenet.com/
// @include        http://www.busca-usenet.com/
// ==/UserScript==
var max = 250;

setInterval(checkPosts, 200);

function checkPosts() {
    if ($('#postdetail').is(':visible')) {
        var a = $('#post-detail-header li:first-child');

        if (a.find('.detail-post-download').length <= 0) {
          $('#detail-post-title-container').css('width', '570px');

            var fileName = $('#meta-left').find('#SpotFilename span:first-child').html().replace(/\<i\>\<\/i\>/g, "");
            var group = $('#meta-left').find('#SpotGroup span:first-child').html().replace(/\<i\>\<\/i\>/g, "").replace(/a.b/g, "alt.binaries");

            var btn = $('#detail-post-watchlist').clone().appendTo(a);
            btn.find('#detail-post-watchlisttxt').html('Download');
            btn.find('img:first-child').attr('src', '');
            btn.find('img:first-child').attr('src', 'http://cdn3.iconfinder.com/data/icons/ose/Arrow%20Down.png');

            btn.addClass('detail-post-download');
            btn.css('float', 'left');
            btn.css('display', 'absolute');
            btn.attr('onclick', '');

            btn.click(function() {
                window.open('http://binsearch.info/index.php?q='+fileName+'&m=&max=' + max + '&adv_g=' + group + '&adv_age=999&adv_sort=date&minsize=&maxsize=&font=&postdate=', '_blank');
            });
        }
    }
}