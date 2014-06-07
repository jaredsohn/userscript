// ==UserScript==
// @name          YouTube Animated Thumbnails & Preview Videos
// @namespace     http://userscripts.org/users/23652
// @description   On hover, each thumbnail cycles though its 3 thumbnails. Additional feature to view those 3 thumbnails all at once (non-animated)
// @include       http://*.youtube.com/*
// @include       http://youtube.com/*
// @include       https://*.youtube.com/*
// @include       https://youtube.com/*
// @exclude       http://*youtube.com/my_videos_edit*
// @exclude       http://*youtube.com/my_subscribers*
// @exclude       https://*youtube.com/my_videos_edit*
// @exclude       https://*youtube.com/my_subscribers*
// @copyright     JoeSimmons
// @version       1.1.0
// @license       http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require       http://userscripts.org/scripts/source/49700.user.js?name=GM_config
// @require       https://raw.github.com/joesimmons/jsl/master/versions/jsl-1.3.1.js
// @require       https://raw.github.com/joesimmons/jsl/master/jsl.ajax.js
// @require       http://usocheckup.dune.net/40324.js
// @grant         GM_getValue
// @grant         GM_log
// @grant         GM_openInTab
// @grant         GM_registerMenuCommand
// @grant         GM_setValue
// @grant         GM_xmlhttpRequest
// @grant         GM_addStyle
// ==/UserScript==


/* CHANGELOG -------------------------------------------------------------------------------------------

1.1.0 (4/8/2014)
    - fixed thumbnail previews sometimes not displaying the right video's thumbnail

1.0.94 (2/25/2014)
    - fixed problem with thumbnails appearing under the masthead

1.0.93 (11/18/2013)
    - removed fading, too inconsistent & laggy

1.0.92 (10/8/2013)
    - re-write of the entire script for readability and efficiency
    - added some minor fade effects
    - instead of making the video black when hovering over a thumbnail,
        the script will now keep showing the video
    - previews open in the opposite corner of where your mouse is
    - more reliable HQ image getting
    - only the hovered over thumbnail is animated, not all the images now

1.0.91
    - Added a new option that allows animated thumbnails only on hovered images

1.0.90
    - Moved the options button to inside the YouTube dropdown menu

1.0.89
    - Added compatibility for Opera & Chrome

------------------------------------------------------------------------------------------------------ */


(function () {

    'use strict';

    var rVi = /[a-z0-9-]+\.ytimg\.com\/vi\/([^\/]+)\//i,
        rYtimgUrl = /[a-z0-9-]+\.ytimg\.com\/vi\//i,
        rWhichImage = /(vi\/[a-z0-9-_]+\/)(1|3|mqdefault)(\.jpg)/i,
        x = 0, y = 0,
        isHoverEnabled, thumbSize, isAnimationEnabled, animationSpeed,
        menulist, __preview_timeout, __animation_interval, stillOnThumb;

    var preview = {
        // clears the timeout and hides the hover preview
        hide : function () {
            window.clearInterval(__preview_timeout);
            JSL('#hover_img').hide().find('img').attribute('src', '');
        },
        show : function () {
            // sets the timeout to show the hover preview
            __preview_timeout = window.setTimeout(function () {
                JSL('#hover_img').show('block');
            }, 400);
        }
    };

    function getNextImage(currentImage) {
        var imagesInOrder = ['1', 'mqdefault', '3'],
            indexOfNextImage = imagesInOrder.indexOf(currentImage) + 1;

        if ( indexOfNextImage > (imagesInOrder.length - 1) ) {
            // if it's on the last one, go back to the first
            return imagesInOrder[0];
        } else {
            // if it's not on the last one, show the next one
            return imagesInOrder[indexOfNextImage];
        }
    }

    function handleHoverLogic(urlIdPrefix) {
        var box = JSL('#hover_img'),
            hori, vert;

        preview.hide();

        // set the previews for this thumbnail
        JSL('#hover_img_1').attribute('src', urlIdPrefix + '1.jpg');
        JSL('#hover_img_2').attribute('src', urlIdPrefix + 'mqdefault.jpg');
        JSL('#hover_img_3').attribute('src', urlIdPrefix + '3.jpg');

        // check for a higher quality preview while we
        // wait for the image to display
        JSL.ajax([
            urlIdPrefix + 'maxresdefault.jpg',
            urlIdPrefix + 'hqdefault.jpg'
        ], {
            method : 'HEAD',
            onload : function (resp) {
                var img2 = JSL('#hover_img_2');

                // check for a 200 (OK) status
                // & that we're showing the correct thumbnail
                if ( resp.status === 200 && resp.url.getMatch(rVi, 1) === img2.attribute('src').getMatch(rVi, 1) ) {
                    img2.attribute('src', resp.url);
                    JSL.ajaxClear();
                }
            }
        });

        vert = !(y < (window.innerHeight / 2) ) ? 'top' : 'bottom'; // should the preview be on the top or bottom
        hori = !(x < ( (window.innerWidth - 15) / 2) ) ? 'left' : 'right'; // should the preview be on the left or right

        // set the vertical align style property of each of the 3 preview images
        JSL('#hover_img img').css('vertical-align', vert);

        // reset the position of the hover box
        box.css('top', 'auto').css('right', 'auto').css('bottom', 'auto').css('left', 'auto');

        // set the corner it will appear in
        box.css(vert, '0').css(hori, '0');

        // set a delay for the previews to show
        preview.show();
    }

    function handleAnimationLogic(elem) {
        __animation_interval = JSL.setInterval(function () {
            var currentImage = elem.attribute('src').getMatch(rWhichImage, 2),
                nextImage = getNextImage(currentImage);

            elem.attribute( 'src', elem.attribute('src').replace(rWhichImage, '$1' + nextImage + '$3') );
        }, animationSpeed);
    }

    function show(event) {
        var elem = JSL(event.target),
            id = elem.attribute('src').getMatch(rVi, 1),
            urlIdPrefix = 'http://' + elem.attribute('src').getMatch(rYtimgUrl) + id + '/';

        // filter out non-thumbnails
        if ( elem.is('img') && elem.isnt('#hover_img, img[id^="hover_img_"]') && urlIdPrefix.getMatch(rVi) ) {
            if (isHoverEnabled) {
                handleHoverLogic(urlIdPrefix);
            }
            
            if (isAnimationEnabled) {
                handleAnimationLogic(elem);
            }
        }
    }

    function hide(event) {
        var elem = JSL(event.target),
            id = elem.attribute('src').getMatch(rVi, 1),
            urlIdPrefix = 'http://' + elem.attribute('src').getMatch(rYtimgUrl) + id + '/';

        // clear the last HQ thumbnail request
        JSL.ajaxClear();

        // don't hide the preview if the mouse goes over it
        if ( elem.isnt('#hover_img, img[id^="hover_img_"]') ) {
            preview.hide();
        }

        // stop animating the current thumbnail
        if ( elem.is('img') && elem.isnt('#hover_img, img[id^="hover_img_"]') && elem.attribute('src').getMatch(rWhichImage) ) {
            JSL.clearInterval(__animation_interval); // stop the animation
            elem.attribute( 'src', elem.attribute('src').replace(rWhichImage, '$1mqdefault$3') ); // reset the thumbnail
        }
    }

    function trackMouse(event) {
        x = event.pageX - window.pageXOffset;
        y = event.pageY - window.pageYOffset;
    }

    function GM_config_open() {
        GM_config.open();
    }

    // Make sure the page is not in a frame
    if (window.self !== window.top) { return; }

    // String.prototype.getMatch by JoeSimmons
    // e.g., 'foobar'.getMatch(/foo(bar)/, 1) ==> 'bar'
    Object.defineProperty(String.prototype, 'getMatch', {
        value : function (regex, index) {
            var match = this.match(regex) || ['', '', '', '', '', '', '', '', '', ''];

            if (typeof index === 'number' && index > -1) {
                return match[index];
            }

            return match[0];
        }
    });

    GM_config.init('YouTube Animated Thumbnails Options', {
        hoverimages : {
            section : ['Hover Options'],
            label : 'Enable Hover Images?',
            type : 'checkbox',
            'default' : true,
            title : 'Hovering over a thumbnail shows 3 preview images.'
        },
        thumbSize : {
            label : 'Hover Thumbnail Size',
            type : 'select',
            options : {
                '90' : 'Small',
                '216' : 'Medium',
                '432' : 'Large'
            },
            'default' : '432',
            'title' : 'Choose the size of the hovering thumbnails'
        },
        animatedthumbnails : {
            section : ['Animated Thumbs Options'],
            label : 'Enable Animated Thumbnails?',
            type : 'checkbox',
            'default' : true,
            title : 'Thumbnails cycle through the 3 images while hovering.'
        },
        animationspeed : {
            label : 'Animation (Cycle) Speed',
            type : 'select',
            options : {
                '1200' : 'Super Slow',
                '800' : 'Slow',
                '600' : 'Medium',
                '400' : 'Fast',
                '200' : 'Super Fast'
            },
            'default' : '600',
            title : 'Set the speed of the cycled images'
        }
    });

    JSL.runAt('interactive', function () {
        isHoverEnabled = GM_config.get('hoverimages') === true;
        thumbSize = GM_config.get('thumbSize');
        isAnimationEnabled = GM_config.get('animatedthumbnails') === true;
        animationSpeed = parseInt(GM_config.get('animationspeed'), 10);

        JSL.addStyle('' +
            '#hover_img { ' +
                'position: fixed; ' +
                'z-index: 999999999999; ' +
                'background: #000000; ' +
                'border: 1px solid #000000; ' +
                'outline: 1px solid #CCCCCC; ' +
            '}' +
            '#hover_img img { ' +
                'max-height: ' + thumbSize + 'px; ' +
            '}' +

            // fix for images showing under the youtube player
            '#hover_img img { ' +
                'background-color: #000000; ' +
            '}' +
            '#yt_at_ops { ' +
                'display: inline-block; ' +
                'padding: 6px; ' +
            '}' +
            '#GM_config { ' +
                'z-index: 999999999999 !important; ' + // 999,999,999,999
            '}' +
        '');

        JSL(document.body).append('' +
            '<div id="hover_img" style="display: none;">' +
                '<img src="" alt="" id="hover_img_1" />' +
                '<img src="" alt="" id="hover_img_2" />' +
                '<img src="" alt="" id="hover_img_3" />' +
            '</div>' +
        '');
        
        // Add a user script command for the options menu
        if (typeof GM_registerMenuCommand === 'function') {
            GM_registerMenuCommand('YouTube Animated Thumbnails Options', GM_config.open);
        }

        // Add an options button to the page
        JSL('#masthead-expanded-menu-list, #footer-main').append('' +
            '<li id="yt_at_ops" class="masthead-expanded-menu-item">' +
                '<a href="javascript: void(0);" class="yt-uix-sessionlink">Animated Thumbnails Options</a>' +
            '</li>' +
        '');
        JSL('#yt_at_ops a').addEvent('click', GM_config.open);

        if (isHoverEnabled) {
            JSL.addEvent(window, 'mousemove', trackMouse);
            JSL.addEvent(window, 'click', preview.hide);
        }
        JSL.addEvent(window, 'mouseover', show);
        JSL.addEvent(window, 'mouseout', hide);
    });

})();