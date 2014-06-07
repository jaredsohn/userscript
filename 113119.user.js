// ==UserScript==
//
// 	If you like this script and would like to make a donation, 
// 	please follow this link to do so on Paypal. Thank you!
// 	http://bit.ly/q1BzDO
//
// @name	    Shirt Woot Image Preview
// @namespace	    http://www.mikevision.com/
// @description	    Preview Images without having to go to page
// @version	    1.4
// @include	    http://shirt.woot.com/derby
// @include	    http://shirt.woot.com/derby?sort=date
// @include	    http://shirt.woot.com/derby?sort=votes
// @include	    http://shirt.woot.com/derby?sort=random
// @exclude	    http://shirt.woot.com/Forums/
// @require	    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @grant           none
// @updateURL	    https://userscripts.org/scripts/source/113119.user.js
// @downloadURL	    https://userscripts.org/scripts/source/113119.user.js
// ==/UserScript==

function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
}

function main() {
    $(document).ready(function() {

        function imagePreview(css) {
            var head, style;
            head = document.getElementsByTagName('head')[0];
            if (!head) {
                return;
            }
            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = css;
            head.appendChild(style);
        }

        imagePreview('#preview{position:fixed;top:0;right:0;z-index:999999;border:1px solid #ccc;background:#333;padding:5px 5px 0 5px;display:visible;color:#fff;height:606px;width:580px;} #preview img{max-width:580px;max-height:580px;} #previewTitle{padding:5px;display:visible;color:#fff !important;font-size:14px;text-transform:capitalize;font-weight:bold;}');

        var prevHov = false;
        var thumbHov = false;

        $('.entries .content').bind('mouseover', function() {
            var shirtTitle = ($(this).find('img').attr('title'));
            var loadUrl = ('http://shirt.woot.com' + $(this).find('a').attr('href'));
            var largeImg = 'div.content img'
            thumbHov = true;

            $('body').append('<div id="preview"></div>');
            $('#preview').html('<img src="http://d3eiloi9duvkcu.cloudfront.net/areas/shirt.woot/Images/loading.gif" width="580" height="580" /><div id="previewTitle"></div>');

            $.get(loadUrl, function(data) {
                lazysrc = $(data).find(largeImg).attr('lazysrc');
                artist = $(data).find('.byline span').text();

                $('#preview img').attr('src', lazysrc).fadeIn('fast');
                $('#previewTitle').html(shirtTitle + ' ' + '<span style="font-weight:normall;font-size:10px;color:#ccc;padding-left:10px;">' + artist + '</span>');
            });

            $('#preview').mouseenter(function() {
                prevHov = true;
            }).mouseleave(function() {
                prevHov = false;
                setTimeout(function() {
                    if (thumbHov == false && prevHov == false) {
                        removePrev();
                    }
                }, 10);
            });
        });

        $('.entries .content').mouseleave(function() {
            thumbHov = false;
            setTimeout(function() {
                if (thumbHov == false && prevHov == false) {
                    removePrev();
                }
            }, 10);
        });

        function removePrev() {
            $('#preview, #previewTitle').remove();
        }
    });
}

// Load jquery and excute main function
addJQuery(main);