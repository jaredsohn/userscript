// ==UserScript==
// @name          Breadfish Like-Info
// @namespace     maddin.cc
// @description   Likes in der Sidebar
// @include       http://forum.sa-mp.de/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==
$(document).ready(function() {
    if( $('#tplThread').length !== 0 ) {
        $('.message:not(.quickReply )').each(function(i,e) {
            var userId = parseInt($(this).find('.messageAuthor .userName a').attr('href').split("&userID=").pop(), 10),url = 'http://forum.sa-mp.de/index.php?page=UserThankList&userID=' + userId, that = $(this);
            GM_xmlhttpRequest({
              	method: "GET",
                url: url,
                onload: function(resp) {
                    var data = $(resp.responseText);
                    if( data.find('.error').length === 0 ) {
                        var _a = data.find('.pageNavigation ul li:not(.skip):not(.children)').toArray();
                        var pages = parseInt($(_a[_a.length-1]).text(),10), likes = 0;
                        if(isNaN(pages)) {
                            likes = parseInt(data.find('.tableList tbody tr').length, 10);
                            that.find('.userCredits').append('<br /><p><a href="' + url + '"><img src="icon/thankS.png" alt="" />' + likes + '</a></p>');
                        }
                        else {
                            GM_xmlhttpRequest({
                                method: "GET",
                                url: 'http://forum.sa-mp.de/index.php?page=UserThankList&userID=' + userId + '&pageNoGot='+pages,
                                onload: function(resp2) {
                                    var data2 = $(resp2.responseText);
                                    var likes = parseInt(data2.find('.tableList tbody tr').length, 10);
                                    likes += (pages-1)*10;
                                    that.find('.userCredits').append('<br /><p><a href="' + url + '"><img src="icon/thankS.png" alt="" />' + likes + '</a></p>');
                                }
                            });
                        }
                        
                    }
                    
                }
            });
        });
    }
});