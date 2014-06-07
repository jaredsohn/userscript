// ==UserScript==
// @name           PixivSortFilterAddItem
// @namespace      http://d.hatena.ne.jp/alexam/
// @description    Pixivの検索結果をソートしたりフィルタリングしたり1ページに表示する数を増やしたりできます。
// @version        0.2.5
// @include        http://www.pixiv.net/search.php*
// @include        http://www.pixiv.net/tags.php*
// ==/UserScript==

(function (d, func) {
    var h = d.getElementsByTagName('head')[0];
    var s1 = d.createElement('script');
    s1.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
    s1.addEventListener('load', function() {
        var s2 = d.createElement('script');
        s2.textContent = 'jQuery.noConflict();(' + func.toString() + ')(jQuery);';
        h.appendChild(s2);
    }, false);
    h.appendChild(s1);
})(document, function($) {

    /**
      1ページに作品を通常の何倍表示するか
　　　     Ex) 1なら通常通り, 2なら通常の2倍, ...
              2倍にすると表示されるまでの時間が約1秒多くかかるようになり、
              3倍だと約2秒多くかかるようになる
    **/
    MULTIPLE = 3;
    // ブックマーク数が以下の値未満の場合は表示しない
    FAV_FILTER = 3;
    // リンクを別のタブで開くかどうか true or false
    LINK_BLANK = true;



    function get_images(page) {
        if (page != 1) {
            page++;    
            if (page <= get_image_limit) {
                url = url.replace(/p=\d+/, 'p='+page);
            } else {
                return 0;
            }
        } else {
            page++;    
            if (page <= get_image_limit) {
                url += ('&p='+page);
            } else {
                return 0;
            }
        }
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onload = function (event) {
            
            $(req.responseText).find('.column-search-result').children('.image-items').children('.image-item').each(function() {
                $('.column-search-result').children('ul').append($(this));
            });
            get_count++;
            if (get_count == (MULTIPLE-1)) {
                var show_images = filter_blank_sort();
    
                $('#loading').remove();
                $('.column-search-result').children('ul').empty().append(show_images).show();

            }
            req = null;
        }
        req.onerror = function (event) {
            alert('画像の取得に失敗しました。');
            req = null;
        }
        req.send(null);
        setTimeout(function() {
            get_images(page)
        }, 1000);
    }

    
    function filter_blank_sort() {
        $('.column-search-result').children('.image-items').children('.image-item').each(function() {
            var fav = $(this).children('ul').children('li:first').children('a').text();
            if (fav < FAV_FILTER) {
                $(this).remove();
            } else {
                if (LINK_BLANK) {
                    $(this).children('a').attr('target',  'blank');
                }
            }
        });
        var images = $('.column-search-result').children('.image-items').children('.image-item').map(function() {
            return $(this);
        });
        for (var i=0; i<images.length; i++) {
            for (var j=i+1; j<images.length; j++) {
                var fav1 = $(images[i]).children('ul').children('li:first').children('a').text();
                var fav2 = $(images[j]).children('ul').children('li:first').children('a').text();
                if (fav1 != '') {
                    fav1 = parseInt(fav1);
                } else {
                    fav1 = 0;
                }
                if (fav2 != '') {
                    fav2 = parseInt(fav2);
                } else {
                    fav2 = 0;
                }
                if (fav1 < fav2) {
                    var tmp = images[i];
                    images[i] = images[j];
                    images[j] = tmp;
                }        
            }
        }
        var show_images = "";
        for (var i=0; i<images.length; i++) { 
            show_images += $('<div>').append(images[i]).html();                    
        }
        return show_images;
    }


    var get_count = 0;
    var url = location.href;
    var page = url.match(/p=(\d+)/);
    var get_image_limit;
    if (page !== null) {
        page = parseInt(page[1]);
        get_image_limit = MULTIPLE - 1 + page;
    } else {
        page = 1;
        get_image_limit = MULTIPLE;
    }
    if (MULTIPLE != 1) {
        $('.column-search-result').children('ul').hide();
        $('.column-search-result').prepend(
            '<div id="loading" style="width:50px;margin-left:auto;margin-right:auto;">'+
            '<img src="http://semifo.pa.land.to/loading.gif" /></div>'
        );
        if (page != 1) {
            $('.pager-container').empty().append(
                '<a href="'+url.replace(/&p=\d+/, '')+'" style="margin-right:15px;">&lt;&lt;</a>'+
                '<a href="'+url.replace(/p=\d+/, 'p='+(page-MULTIPLE))+'" style="margin-right:10px;">&lt;</a>'+
                '<a href="'+url.replace(/p=\d+/, 'p='+(page+MULTIPLE))+'" style="margin-right:10px;">&gt;</a>'
            );
        } else {
            $('.pager-container').empty().append(
                '<a href="'+url+'" style="margin-right:15px;">&lt;&lt;</a>'+
                '<a href="'+url+'&p='+(page+MULTIPLE)+'">&gt;</a>'
            );
        }
        get_images(page);
    } else {
        var show_images = filter_blank_sort();
        $('.column-search-result').children('ul').empty().append(show_images);
    }
});
