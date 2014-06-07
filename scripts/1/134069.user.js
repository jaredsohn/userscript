// ==UserScript==
// @name           知了
// @namespace      ZHI
// @description    Beautify zhihu anwser.
// @version        0.4
// @author         dlutcat ( pat.inside@gmail.com )
// @include        *.zhihu.com/question/*
// ==/UserScript==

GM_info = { 'scriptWillUpdate': true };

GM_addStyle('\
    #ZHI {position: fixed; height: 130px; top: 257px; left:0; width:30px; opacity:0.3, font-family: courier; font-size:16px;} \
    #ZHI:hover { opacity: 1; } \
    #ZHI span {padding: 3px 5px; font-size:14px; background:#eee; border-bottom:1px solid #ddd; display:block; text-align:center;}\
    #ZHI span:hover {cursor: pointer; background:#ddd;} \
    .ZHIday {background:#EDEBE8; color:#2C2D32; padding:20px; line-height:2em;} \
    .ZHInight {background:#343a3f; color:#999; padding:20px; line-height:2em;} \
');

function addJQuery(callback) {
    var script = document.createElement('script');
    script.src = 'http://img3.douban.com/js/packed_jquery.min6301986802.js';
    script.type = 'text/javascript';
    script.addEventListener('load', function () {
        //callback();
        var uscript = document.createElement('script');
        uscript.type = 'text/javascript';
        uscript.textContent = '(' + callback.toString() + ')();';
        document.head.appendChild(uscript);
    }, false);
    document.head.appendChild(script);
}


function main() {

    var bar = [ '<div id="ZHI">',
                    '<span id="ZHI-prev" title="上一个(J)">&and;</span>',
                    '<span id="ZHI-day" title="白天模式(D)">D</span>',
                    '<span id="ZHI-night" title="夜间模式(N)">N</span>',
                    '<span id="ZHI-origin" title="恢复(X)">X</span>',
                    '<span id="ZHI-next" title="下一个(K)">&or;</span>',
                '</div>' ].join(''),

        $body = $('body'),
        $entries = $('.xco'),
        $contents = $('.xwkw.xnf'),
        count = $entries.length,
        index = 0,
        $curEntry,
        $prevEntry,
        $nextEntry,

        currentEntry = function ($entries) {
            var $cur = false;
            $entries.each(function() {
                var $this = $(this),
                    offsetTop = $this.offset().top,
                    scrollY = window.scrollY;
                if ( offsetTop - scrollY <= 0 && scrollY <= offsetTop + $this.height() ) {
                    $cur = $this;
                    return;
                }
            });
            return $cur;
        },

        next = function () {
            $curEntry = currentEntry($entries);
            if ($curEntry === false) {
                window.scrollTo(0, $entries.first().offset().top);
                return;
            }

            $nextEntry = $curEntry.next('.xco');
            if ($nextEntry.length != 0) {
                window.scrollTo(0, $nextEntry.offset().top);
            } else {
                window.scrollTo(0, $entries.first().offset().top);
            }
        },

        prev = function () {
            $curEntry = currentEntry($entries);
            $prevEntry = $curEntry.prev('.xco');
            if ($prevEntry.length != 0) {
                window.scrollTo(0, $prevEntry.offset().top);
            } else {
                window.scrollTo(0, 0);
            }
        },

        changeTheme = function (theme) {
            if (theme === 'day') {
                $contents.removeClass('ZHIday').removeClass('ZHInight').addClass('ZHIday');
                localStorage.setItem('_ZHI_setting_theme', 'ZHIday');
            }
            else if (theme === 'night') {
                $contents.removeClass('ZHIday').removeClass('ZHInight').addClass('ZHInight');
                localStorage.setItem('_ZHI_setting_theme', 'ZHInight');
            }
            else if (theme === 'origin') {
                $contents.removeClass('ZHIday').removeClass('ZHInight');
                localStorage.setItem('_ZHI_setting_theme', '');
            }
        };


    try {

        $body.prepend(bar);

        $contents.addClass(localStorage.getItem('_ZHI_setting_theme'))

        $body.delegate('#ZHI-prev', 'click', function() {
            prev();
        });
        $body.delegate('#ZHI-day', 'click', function() {
            changeTheme('day');
        });
        $body.delegate('#ZHI-night', 'click', function() {
            changeTheme('night');
        });
        $body.delegate('#ZHI-origin', 'click', function() {
            changeTheme('origin');
        });
        $body.delegate('#ZHI-next', 'click', function() {
            next();
        });

        $(document).keydown(function(e) {
            if(/input|textarea/.test(e.target.tagName.toLowerCase()) || $(e.target).attr('contenteditable') === 'true'){
                if (e.keyCode === 27) {
                    e.target.blur();
                }
                return;
            }

            switch (e.keyCode) {
                case 74:
                    next()
                    break
                case 75:
                    prev()
                    break
                case 78:
                    changeTheme('night')
                    break
                case 68:
                    changeTheme('day')
                    break
                case 88:
                    changeTheme('origin')
                    break
            }

        });
        
    }
    catch (e) {}
}


addJQuery(main);
