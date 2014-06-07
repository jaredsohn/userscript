// ==UserScript==
// @name rock-banned Live Thread
// @namespace http://www.rock-banned.com
// @version 1.0.3
// @description	Automatically update a thread with new posts
// @include http://www.rock-banned.com/forum/showthread*
// ==/UserScript==

(function() {

    var $;

    var head = document.getElementsByTagName('head')[0];

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.live-button{}' +
        '#live-info{margin:0 auto;padding:3px;width:300px;background-color:#dfdfdf;border:2px solid #bbb;border-radius:5px}' +
        '#live-message{padding:12px;padding-bottom:8px;background-color:#f1f1f1;border-top-right-radius:3px;border-top-left-radius:3px}' +
        '#live-actions{padding:12px;background-color:#f1f1f1;border-bottom-right-radius:3px;border-bottom-left-radius:3px}' +
        '#live-actions a{cursor:pointer;margin-right:1px;padding:6px 18px;background-color:#407caa;color:#fff}' +
        '#live-actions a:hover{background-color:#01518e;color:#fff} #live-result{display:none;padding:6px;border-radius:3px}' +
        '.live-spacer{display:block;margin:0 20px;padding:6px 0 7px 0;text-align:center; background-color:#01518e;border-right:1px solid #000;border-left:1px solid #000}' +
        '.live-spacer a:link,.live-spacer a:visited{color:#fff}' +
        '.live-spacer a:hover{color:#ff8b01}.live-purge{float:right;margin-right:5px}' +
        '.live-purge img{margin-top:-1px;opacity:0.5}.live-purge img:hover{opacity:1}';

    head.appendChild(style);

    var js = document.createElement('script');
    js.setAttribute('type', 'text/javascript');
    js.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js');
    js.addEventListener("load", noConflict, false);

    head.insertBefore(js, head.firstChild)

    function noConflict() {
        if (typeof jQuery === 'undefined') {
            $ = unsafeWindow.jQuery.noConflict(true); // Firefox
        } else {
            $ = jQuery.noConflict(true); // Opera
        }
        go();
    }

    function go() {

        // These can be changed
        var options = {
            "debug": false,
            "delay": 60*1000, // 1 minute
            "img": {
                "on": 'http://i.imgur.com/JexZF.gif',
                "off": 'http://i.imgur.com/TwgIk.gif',
                "on_b": 'http://i.imgur.com/mkKLP.gif',
                "off_b": 'http://i.imgur.com/iT5ab.gif',
                "close": 'http://i.imgur.com/GBCMU.png'
            }
        }

        // The current state of the page and script
        var state = {
            "url": window.location.href,
            "live": false,
            "newpage": false,
            "force": false,
            "pending": false,
            "fail": {
                "count": 0,
                "limit": 5
            }
        }

        function debug(t) {
            if (options.debug) {
                GM_log(t);
            }
        }

        // On/Off state of the button at the top of the page
        var button = function() {

            function on() {
                $('.live-button:first > img').attr('src', options.img.on);
                $('.live-button:last > img').attr('src', options.img.on_b);
            };

            function off() {
                $('.live-button:first > img').attr('src', options.img.off);
                $('.live-button:last > img').attr('src', options.img.off_b);
            };

            return {
                on: on,
                off: off
            }

        }();

        // All the options for the info box at the bottom of the page
        var info = function() {

            function create() {
                debug('## info.create()');

                $('#posts').next().append(
                    '<div id="live-info">' +
                    '<div id="live-message"></div>' +
                    '<div id="live-actions"></div>' +
                    '<div id="live-result"></div>' +
                    '</div>');

                actions();
            };

            function actions() {
                debug('## info.actions()');

                var act = $('#live-actions').empty();

                var button = {

                    start: 	$('<a>Start</a>').click(function() {
                                debug('>> [Start] button click');
                                state.live = true;
                                update.check();
                            }),

                    stop: 	$('<a>Stop</a>').click(function() {
                                debug('>> [Stop] button click');
                                update.stop();
                            }),

                    update:	$('<a>Update</a>').click(function() {
                                debug('>> [Update] button click');
                                update.force();
                            }),

                    close:	$('<a>Close</a>').click(function() {
                                debug('>> [Close] button click');
                                update.stop();
                                hide();
                            })
                }

                if (state.live) {
                    act.append(button.update);
                    act.append(button.stop);
                } else {
                    act.append(button.start);
                    act.append(button.close);
                }
            }

            function show() {
                debug('## info.show()');

                if (!$('#live-info').length) {
                    create();
                }
                $('#live-info').show();
            };

            function hide() {
                debug('## info.hide()');

                $('#live-info').hide();
            };

            function message(t) {
                debug('## info.message(t)');

                $('#live-message').html(t);
            };

            function result(n) {
                debug('## info.result(n)');

                var n = parseInt(n);
                var r = $('#live-result').show();

                if (n > 0) {
                    r.css('background-color', '#9f9');
                    if (n === 1) {
                        r.text(n + ' post added');
                    } else {
                        r.text(n + ' posts added');
                    }
                } else {
                    r.css('background-color', '#ff9');
                    r.text('No new posts');
                }

                r.delay(5000).slideUp('slow');
            };

            function error(t) {
                debug('## info.error(t)');

                var r = $('#live-result').show();
                r.css('background-color', '#f99');
                r.text(t + ' server error');
                r.delay(5000).slideUp('slow');
            };

            var countdown = {

                timeout: undefined,
                delay: 0,

                start: function(ms)  {
                    debug('## info.countdown.start()');

                    if(this.timeout) {
                        debug('>> countdown timer stopped');
                        this.stop(); // this should stop countdown timers from stacking
                    }

                    debug('>> countdown timer started');

                    this.delay = parseInt(ms);
                    this.tick();
                },

                stop: function() {
                    debug('## info.countdown.stop()');

                    clearTimeout(this.timeout);
                },

                tick: function() {
                    debug('## info.countdown.tick()');

                    var d = parseInt(this.delay);

                    if (d < 0) {
                        return;
                    } else {
                        this.delay -= 1000;
                    }

                    var sec = Math.floor((d/1000) % 60);
                    var min = Math.floor(((d/1000)/60) % 60);

                    if (min > 1) {
                        var m = min + ' minutes, ' + sec + ' seconds';
                    } else if (min === 1) {
                        var m = min + ' minute, ' + sec + ' seconds';
                    } else {
                        var m = sec + ' seconds';
                    }

                    if (min === 0 && sec === 0) {
                        m = 'Updating...';
                    }

                    debug('>> ' + m);

                    info.message(m);

                    var self = this; // fixes a weird scoping issue I don't understand

                    this.timeout = setTimeout(function(){ self.tick(); }, 1000);
                }

            };

            return {
                show: show,
                hide: hide,
                actions: actions,
                message: message,
                result: result,
                error: error,
                countdown: countdown
            }

        }();

        // Everything here controls the script
        var update = function() {

            var timeout;

            function check() {

                debug('## update.check()');

                if (!state.live) {
                    debug('>> live thread has stopped');
                    stop();
                    return;
                }

                if (state.fail.count >= state.fail.limit) {
                    debug('>> fail limit reached');
                    stop();
                    return;
                }

                if (state.pending) {
                    debug('>> a request is pending');
                    info.message('Wait...');
                    return;
                }

                var delay = (1 + state.fail.count) * options.delay;

                button.on();
                info.show();
                info.actions();
                info.countdown.start(delay);
                timeout = setTimeout(start, delay);
            };

            function force() {

                debug('## update.force()');

                state.fail.count = 0;

                if (state.pending) {
                    debug('>> a request is pending, force update ignored');
                    info.message('Wait...');
                    return;
                }

                stop();
                state.live = true;
                button.on();
                info.actions();
                info.message('Updating...');
                start();
            };

            function cancel() {
                debug('## update.cancel()');

                stop();
                info.hide();
            };

            function stop() {
                debug('## update.stop()');

                clearTimeout(timeout);
                button.off();
                state.live = false;
                state.fail.count = 0;
                info.actions();
                info.countdown.stop();
                info.message('Stopped');
            };

            function start() {
                debug('## update.state()');

                var curposts = $('#posts > div').not('#lastpost');
                var lastpost = $('a[id^="postcount"]', curposts.last()).text();
                
                try {
                    $.ajax({
                        url: state.url,
                        dataType: 'html',
                        timeout: 20000,
                        beforeSend: function(){
                            debug('>> ajax start');
                            state.pending = true;
                        },
                        error: function(xhr){
                            debug('>> ajax error');
                            info.error(xhr.status);
                            state.fail.count += 1;
                        },
                        success: function(data){
                            debug('>> ajax success');
                            page.update(data, lastpost);
                        },
                        complete: function(){
                            debug('>> ajax complete');
                            // this sets a 5 second hard limit on requests to prevent spam
                            info.message('Wait...');
                            setTimeout(function(){ state.pending = false; check(); }, 5000);
                        }
                    });
                }
                catch(e)
                {
                    debug(e);
                    info.message('Error');
                    state.fail.count += 1;
                    setTimeout(function(){ state.pending = false; check(); }, 5000);
                }
            }

            return {
                check: check,
                force: force,
                stop: stop,
                cancel: cancel
            }

        }();

        // Everything here is used to actually change the DOM
        var page = function() {

            function spacer(pagenum) {
                debug('## page.spacer()');

                var s = $('<div class="live-spacer"><a href="' + state.url + '">' + pagenum + '</a></div>');

                // Link to remove all the posts above it when clicked
                $('<a></a>')
                    .attr('class', 'live-purge')
                    .attr('title', 'Remove posts above this')
                    .attr('href', '#top')
                    .html('<img src="' + options.img.close + '" />')
                    .appendTo(s)
                    .click(function() {
                        $(this).parent().prevAll().remove();
                        $(this).remove();
                        window.scrollTo(0,0); // sometimes #top doesn't work
                    })

                s.appendTo('#posts');
            };

            function pagenav(p) {
                debug('## page.nav()');

                var npn = '<td align="right">' +
                          '<div class="pagenav" align="right">' + p.html() + '</div>' +
                          '</td>';

                if ($('.pagenav').length) {
                    $('.pagenav').html(p.html());
                } else {
                    $('table:eq(2) tr', $('#posts').prev()).append(npn); // top
                    $('table:eq(0) tr', $('#posts').next()).append(npn); // bottom
                }
            };

            function update(data, lastpost) {
                debug('## page.update()')

                // This removes the page number from the thread title above the posts
                $('td.tcat').html($('td.tcat a:last'));

                var newpagenav = $('.pagenav:first', data);
                var newposts = $('#posts > div', data).not('#lastpost');

                if (state.newpage) {
                    state.newpage = false;
                    spacer($('td:first', newpagenav).text());
                    pagenav($(newpagenav));
                }

                if (!isNaN(parseInt(lastpost))) {
                    debug('>> checking for new posts');

                    var postsadded = 0;

                    newposts.each(function() {
                        var n = parseInt($('a[id^="postcount"]', this).text());
                        if(!isNaN(n) && n > lastpost) {
                            $('#posts').append(this);
                            debug('>> new post: ' + n);
                            postsadded += 1;
                        }
                    });

                    if (postsadded) {
                        debug('>> ' + postsadded + ' posts added');
                        info.result(postsadded);
                        state.fail.count = 0;
                    } else {
                        debug('>> no new posts');
                        info.result(postsadded);
                        state.fail.count += 1;
                    }
                }

                if (newpagenav.length) {
                    $('a', newpagenav).each(function() {
                        if ($(this).text() === 'Next >') {
                            state.url = $(this).attr('href');
                            state.newpage = true;
                        }
                    });
                }
            }

            return {
                update: update
            }

        }();

        $(document).ready(function() {
            debug('rock-banned Live Thread');

            if ($('.pagenav:first').length) {
                $('a', $(this)).each(function() {
                    if ($(this).text() === 'Next >') {
                        state.url = $(this).attr('href');
                        state.newpage = true;
                    }
                });
            }

            $('#threadtools').parent().append(
                '<td class="live-button vbmenu_control">' +
                '<img src="' + options.img.off + '" /></td>');

            $('div > div > table:eq(1) tr', $('#posts').next()).append(
                '<td align="right" class="live-button">' +
                '<img src="' + options.img.off_b + '" /></td>');

            $('.live-button').click(function() {
                if (state.live) {
                    state.live = false;
                    update.cancel();
                } else {
                    state.live = true;
                    update.check();
                }
            });

        });

    }

})();