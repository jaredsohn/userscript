// ==UserScript==
// @name        StackOverflow - Add copy button to code blocks
// @namespace   http://userscripts.org/users/23652
// @description Adds a copy button to each of the code blocks in StackOverflow questions+answers
// @include     http://stackoverflow.com/questions/*
// @exclude     http://stackoverflow.com/questions/tagged/*
// @copyright   JoeSimmons
// @version     1.0.0
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     https://raw.github.com/joesimmons/jsl/master/jsl.user.js
// @downloadURL http://userscripts.org/scripts/source/179530.user.js
// @updateURL   http://userscripts.org/scripts/source/179530.meta.js
// @grant       GM_setClipboard
// ==/UserScript==

+function () {

    var idPrefix = 'pre-block-',
        counter = 0,
        copyoverlay;

    var copyIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAIAAABvFaqvAAAABGdBTUEAALGPC/xhBQAAAi1JREFUOE+Vk+9LE3Ecx+1h/0gP+gvqQdCPv8KyGKSVVD6opKBHKVRG1Fw0y2Y64pQIYUJYDMJtzOTmaI411uQaW8cSld2GypSbvD99v7sxb9v3dt2Xz4PjOF58Xve6O0ZED2b/VEuVHoujpRPHT51+5zph9UDjPgPdn1NhfS5dn+mfzl54v82e7HJ6OEgq2IAWNAY6OarYgIb9SndQ39vs2YkNBrp5Q7Ji8Y3u+TJWIF2v9fb7GjMwxTS7ge5414Sg2iG2tJ1YIhlcCvulWY/He+783W6gIbfcCWIv7rYnaTVGATOUq90aCxugM+7fzXGakoMGR742N2I6VR1aFU5TctC1hwEDdFDD7gGV9qBW4DQlB10d/ngI7Ostak5TcpBryM90yvvY2EVeQ3oL8SKcpuSgK4O+0h6pO6RolNokuYhQjoQpubsO5l6sQCkhtQlZJeOb4KC+AW+hjOx2i5owpTkru/6u4lvOBLroGs/UdSIFCioUyGAuJU7J3HNl5k7xv4gWEFQQ+IWjjXovv5BVhPK0uE7zGUhJTP2AMGVDh7nnsajQfJqkpGkjBmIbfs7i00/yJ2hylV7JEKZsU/uwRpPxVhBjtY0wZYTr0ELdfTpBE6s0vmICCf9DYcov66jrwBfHa5leLtPTqB1ImLJN7UmERkJ2IGFKpvMmRu4Vehalx2F6tMTnqJpQTZjSG+M6YxEaDTUo/wXqTPl8mbhOfZHm2G/UmVJ4xwD9A4KQXqlKp76sAAAAAElFTkSuQmCC';
    var calloutIcon = 'data:image/gif;base64,R0lGODlhDAAWAJEAAP/68NK8jv///wAAACH5BAUUAAIALAAAAAAMABYAAAIrlI8SmQF83INyNoBtzPhyXXHb1ylkZp5dSBqs6KrIq6Xw/FG3V+M9DpkVAAA7';

    // function for adding unique IDs to the pre blocks
    function makeID() {
        var id = idPrefix + JSL.random(999);

        if (document.getElementById(id) == null) {
            return id;
        }

        return makeID();
    }

    function copy(event) {
        var preID = this.replace('-button', ''),
            pre = JSL('#' + preID);

        event.preventDefault();

        GM_setClipboard( pre.text() );

        fade('in', copyoverlay);
        center();
        window.setTimeout(function () {
            fade('out', copyoverlay);
        }, 2000);
    }

    function fade(dir, element) {
        var count, intv,
            interval = .05,
            fps = 1000 / 60,
            anim = function () {
                var curOpacity = parseFloat(element.style.opacity);

                if (dir === 'in') {
                    if (curOpacity > 1) {
                        count = 1;
                        JSL.clearInterval(intv);
                    }
                    element.style.opacity = count += interval;
                } else if (dir === 'out') {
                    if (curOpacity < 0) {
                        count = 1;
                        element.style.display = 'none';
                        element.style.opacity = '';
                        JSL.clearInterval(intv);
                    }
                    element.style.opacity = count += interval;
                }
            };

        element.style.display = '';

        if (dir === 'in') {
            element.style.opacity = count = 0;
            intv = JSL.setInterval(anim, fps);
        } else if (dir === 'out') {
            element.style.opacity = count = 1;
            interval = -interval;
            intv = JSL.setInterval(anim, fps);
        }
    }

    function center() {
        var div = JSL('#copy-overlay');
        var newHeight = Math.floor(window.innerHeight / 2) - (parseInt(div[0].offsetHeight, 10) / 2);
        var newWidth = Math.floor(window.innerWidth / 2) - (parseInt(div[0].offsetWidth, 10) / 2);
        div.css('top', newHeight + 'px');
        div.css('left', newWidth + 'px');
    }

    // Make sure the page is not in a frame
    if (window.self !== window.top) { return; }

    if (typeof JSL === 'undefined') {
        throw 'Error: JSL is not defined.';
    }
    if (typeof GM_setClipboard !== 'function') {
        throw 'Error: GM_setClipboard does not exist.\nPlease use the latest Greasemonkey on Firefox.';
    }

    copyoverlay = JSL('html > body').append('<div id="copy-overlay" style="display: none; position: fixed; top: 0; left: 0; ' +
                                            'padding: 20px 60px; font-size: 20pt; font-family: helvetica, verdana, arial, \'times new roman\', sans-serif; ' +
                                            'text-align: center; background-color: #fffAF0; color: #008000; border: 1px solid #DCA;">Copy Successful!</div>')[0];
    JSL.addEvent(window, 'resize', center);
    center();

    JSL('.post-text pre').each(function (block) {
        var id = makeID();

        JSL(this).attribute('id', id).before(
            JSL.create('div', { style : 'display: block; padding-top: 10px;', onclick : copy.bind(id) }, [
                JSL.create('a', {href : '#', id : id + '-button', style : 'float: right;', 'class' : 'tooltip'}, [
                    JSL.create('img', {src : copyIcon}),
                    JSL.create('span', {}, [
                        '<img class="callout" src="' + calloutIcon + '" alt="" />' +
                        '<strong>Click To Copy!</strong>'
                    ])
                ])
            ])
        );
    });

    JSL.addStyle('' +
        'a.tooltip strong { ' +
            'line-height: 30px; ' +
            'display: block; ' +
            'margin-bottom: 4px; ' +
        '}\n\n' +
        'a.tooltip span {' +
            'z-index: 10; '+
            'display: none; ' +
            'padding: 14px 20px; ' +
            'margin-top: -30px; ' +
            'margin-left: 28px; ' +
            'width: 240px; ' +
            'line-height: 16px; ' +
            'position: absolute; ' +
            'color: #111111; ' +
            'border: 1px solid #DCA; ' +
            'background: #fffAF0; ' +
        '}\n\n' +
        'a.tooltip span, #copy-overlay { ' +
            'border-radius: 4px; ' +
            '-moz-border-radius: 4px; ' +
            '-webkit-border-radius: 4px; ' +
            '-moz-box-shadow: 5px 5px 8px #CCC; ' +
            '-webkit-box-shadow: 5px 5px 8px #CCC; ' +
            'box-shadow: 5px 5px 8px #CCC; ' +
        '}\n\n' +
        'a.tooltip:hover span { ' +
            'display: inline; ' +
        '}\n\n' +
        '.callout { '+
            'z-index: 20; '+
            'position: absolute; '+
            'top: 20px; '+
            'border: 0; '+
            'left: -12px; ' +
        '}' +
    '');

}();