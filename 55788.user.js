// ==UserScript==
// @name           Twitter Picture Preview
// @namespace      http://twitter.com/BOYPT/
// @description    functioning itweet.net/twitese.appspot.com etc. to show photo-tweets thumbnails from twitpic / flic.kr / yfrog / mobypicture ....
// @include        http://www.itweet.net/web/*
// @include        http://itweet.net/web/*
// @include        http://twitese.appspot.com/* 
// @include        https://twitese.appspot.com/* 
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        http://www.twitiq.com/*
// @include        https://www.twitiq.com/*
// @include        http://oauth.filttr.com/*
// ==/UserScript==

twit_site = '';

img_processor = [
    
    {
        reg: /img\.ly\/([\d\w]+)/,
        func:function (url_key, url_elem) {
            var src = "http://img.ly/show/thumb/" + url_key[1];
            append_image (src, url_elem);
        }
    },


    {
        reg: /ow\.ly\/i\/([\d\w]+)/,
        func:function (url_key, url_elem) {
            var src = "http://static.ow.ly/photos/thumb/" + url_key[1] + ".jpg";
            append_image (src, url_elem);
        }
    },

    {
        reg:/http:\/\/pic\.gd\/([\d\w]+)/,
        func:function (url_key, url_elem) {
            var src = "http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=" + url_key[0];
            append_image (src, url_elem);
        }
    },

    {
        reg:/http:\/\/tweetphoto\.com\/([\d\w]+)/,
        func:function (url_key, url_elem) {
            var src = "http://TweetPhotoAPI.com/api/TPAPI.svc/imagefromurl?size=thumbnail&url=" + url_key[0];
            append_image (src, url_elem);
        }
    },

    {
        reg: /ts1\.in\/(\d+)/,
        func:function (url_key, url_elem) {
            var src = "http://ts1.in/thumb/" + url_key[1];
            append_image (src, url_elem);
        }
    },


    {
        reg: /hellotxt.com\/i\/([\d\w]+)/,
        func:function (url_key, url_elem) {
            var src = "http://hellotxt.com/image/" + url_key[1] + ".s.jpg"
            append_image (src, url_elem);
        }
    },


    {
        reg:/twitxr.com\/[^ ]+\/updates\/([\d]+)/,
        func: function (url_key, url_elem) {
            var src = 'http://twitxr.com/thumbnails/' + url_key[1].substr(-2,2) + '/'+url_key[1] + '_th.jpg';
            append_image (src, url_elem);
        }
    },

    { 
        reg: /twitgoo.com\/([\d\w]+)/,
        func: function (url_key, url_elem) {
            var src = "http://twitgoo.com/show/thumb/" + url_key[1];
            append_image (src, url_elem);
        }
    },


    { 
        reg: /(http:\/\/yfrog.com\/.+)/,
        func: function (url_key, url_elem) {
            var src = url_key[0] + ".th.jpg";
            append_image (src, url_elem);
        }
    },

    {
        reg:/(http:\/\/moby.to\/[A-Za-z0-9]{5,})/,
        func:function (url_key, url_elem) {
            var src = "http://api.mobypicture.com?s=small&format=plain&k=OozRuDDauQlucrZ3&t=" + url_key[0];
            append_image (src, url_elem);
        }
    },

    {
        reg:/twitpic\.com\/([A-Za-z0-9]{5})/,
        func:function (url_key, url_elem) {
            var src = "http://twitpic.com/show/thumb/" + url_key[1];
            append_image(src, url_elem);
        }
    },

    {
        reg: /flic\.kr\/p\/(.+)/,
        func: function (url_key, url_elem) {
            function base58_decode( snipcode ) {
                var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ' ;
                var num = snipcode.length ;
                var decoded = 0 ;
                var multi = 1 ;
                for ( var i = (num-1) ; i >= 0 ; i-- ) {
                    decoded = decoded + multi * alphabet.indexOf( snipcode[i] ) ;
                    multi = multi * alphabet.length ;
                }
                return decoded;
            }
            var id = base58_decode(url_key[1]);
            var apiKey = '4ef2fe2affcdd6e13218f5ddd0e2500d';
            var url = "http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=" + apiKey + "&photo_id=" + id;

            var img_elem = $("<img src=\"images/loading.gif\" style=\"max-heigh:250px; max-width:250px; display:none;\" />");
            img_elem.appendTo(url_elem);
            img_elem.fadeIn("slow");
            $.getJSON(url + "&format=json&jsoncallback=?", function(data) {
                if (data.stat == "ok"){
                    var imgsrc = "http://farm" + data.photo.farm + ".static.flickr.com/"
                        + data.photo.server + "/" + data.photo.id + "_" + data.photo.secret + "_m.jpg";
                    img_elem.attr("src", imgsrc);
                }
            });
        }
    }
];


function main() {
    if (twit_site) {
        $(twit_site).each (function () {
            if (this.childNodes.length == 1) {
                for (i in img_processor) {
                    if ((img_url_key = img_processor[i].reg.exec(this.href)) != null)
                        img_processor[i].func(img_url_key, this);
                }
            }
        });
    }
}

function append_image(src, elem) {
    var img = $("<img>");
    img.attr("src", src);
    img.appendTo(elem);
}

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { 
        window.setTimeout(GM_wait, 100); 
    }
    else { 
        $ = unsafeWindow.jQuery;
        $(document).ready(function() {
            if (location.host.indexOf('itweet.net') != -1){
                twit_site = 'div.twText > a';
                $("#tweets").bind("DOMNodeInserted", main);
            }
            if (location.host.indexOf('twitese.appspot.com') != -1){
                twit_site = 'span.status_word > a';
                $("#allTimeline").bind("DOMSubtreeModified", main);
            }
            if (location.host.indexOf('twitter.com') != -1){
                twit_site = 'span.entry-content > a';
                $("#timeline").bind("DOMSubtreeModified", main);
            }
            if (location.host.indexOf('twitiq.com') != -1){
                twit_site = 'a.a_url';
                $("table.main_t").bind("DOMSubtreeModified", main);
            }            
            if (location.host.indexOf('filttr.com') != -1){
                twit_site = 'span.tweet_text_new > a';
                $("#timeline").bind("DOMSubtreeModified", main);
            }
            main();
        });
    }
}
GM_wait();

