// ==UserScript==
// @name           4chan Image expander
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @namespace      achmad.abed
// @include        http://boards.4chan.org/*
// @include        http://www.boards.4chan.org/*
// ==/UserScript==

var numLoadingImages = 0;

$(function() {
    $('.postarea').append('<img id="expandAll" src="http://www.processdash.com/static/teamhelp/Images/icon-expand-all.png" style="top:5px;position:fixed;cursor:pointer;width:22px;height:22px;"></img>').click(function() {
        $('.reply').each(function() {
            var relpy = $(this);
            relpy.find('a[target="_blank"]').each(function() {
                var a = $(this);
                var img = relpy.find('img');

                toggleImageSize(img, a);
            });
        });
    });

     $('.postarea').append('<span id="imageStatus" style="color:#000;font-weight:bold;top:10px;padding-left:25px;position:fixed"></span>');
});

$(function() {
    $('.reply').each(function() {
        var relpy = $(this);
        relpy.find('a[target="_blank"]').each(function() {
            $(this).click(function(e) {
                e.preventDefault();
                var a = $(this);
                var img = relpy.find('img');

                toggleImageSize(img, a);
            });
        });
    });
});

function toggleImageSize(img, parent) {
    numLoadingImages++;
    if (img.data('big') == true) {
        img.data('big', false);
        img.attr('src', img.data('pu'));
        img.attr('width', img.data('pw'));
        img.attr('height', img.data('ph'));
    } else {
        img.data('pu', img.attr('src'));
        img.data('pw', img.attr('width'));
        img.data('ph', img.attr('height'));
        img.attr('width', '99%');
        img.attr('height', '99%');
        img.attr('src', parent.attr('href'));
        img.load(function() {
            img.data('big', true);
            img.attr('width', '100%');
            img.attr('height', '100%');
            img.unbind();
            numLoadingImages--;
            updateLoadingImages();
        });
    }

    updateLoadingImages();
}

function updateLoadingImages() {
    if(numLoadingImages <= 0){
        $('#imageStatus').html('');
        return;
    }    
    $('#imageStatus').html(numLoadingImages);
}