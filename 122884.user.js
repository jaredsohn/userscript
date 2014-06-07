// ==UserScript==
// @name         ReadItLater
// @namespace    com.readitlaterlist
// @version      0.1
// @description  keyboard shortcuts, click workflow optimizations
// @include      http://readitlaterlist.com/*
// @copyright    2011+, peng@pengxwang.com
// ==/UserScript==

(function(window){
    
    //
    // Declare.
    var // 1. Procedures.
        loadScripts, bindKeys, bindClicks, setElements,
        // 2. Dev tools, globals.
        log, config, mode,
        // 3. Behaviors.
        select,
        // 4. jQuery.
        $, $header, $list, $search, $sort, $previous, $next, $back, $pages, $permalink;
    
    //
    // Define.
    loadScripts = function(scripts, callback, checker){
        var head, script, i, setPoller;
        head = document.getElementsByTagName('head')[0];
        for (i = scripts.length; i-- ; ) {
            script = document.createElement('script'); 
            script.src = scripts[i];
            head.appendChild(script);
        }
        setPoller = function(){
            setTimeout(function(){
                log('Polling...');
                if (checker()) {
                    callback();
                } else {
                    setPoller();
                }
            }, 500);
        };
        setPoller();
    };
    
    bindKeys = function(){
        $(document)
            .bind('keydown', 'alt', function(){
                mode.alt = true;
            })
            .bind('keyup', 'alt', function(){
                mode.alt = false;
            })
            .bind('keydown', 'a', function(){
                if (mode() === mode.NAV) {
                    if ($previous.is('.active')) {
                        $previous.click();
                    } else {
                        $pages.removeAttr('selected')
                            .filter(':last-child').attr('selected', true)
                            .parent().change();
                    }
                }
                if (mode() === mode.READ) {
                    document.location = $back.attr('href');
                }
            })
            .bind('keydown', 'd', function(){
                if (mode() === mode.NAV) {
                    if ($next.is('.active')) {
                        $next.click();
                    } else {
                        $pages.removeAttr('selected')
                            .filter(':first-child').attr('selected', true)
                            .parent().change();
                    }
                }
            })
            .bind('keydown', 'w', function(event){
                if (mode() === mode.NAV) {
                    $sort.focus();
                    event.preventDefault();
                }
            })
            .bind('keydown', 's', function(event){
                if (mode() === mode.NAV) {
                    $search.focus();
                    event.preventDefault();
                }
            })
            .bind('keydown', 'h', function(){
                if (mode() === mode.NAV) {
                    document.location = 'http://readitlaterlist.com/unread';
                }
            })
            .bind('keydown', '1', function(){
                if (mode() === mode.NAV) {
                    document.location = 'http://readitlaterlist.com/read';
                }
                if (mode() === mode.READ) {
                    $permalink.click();
                }
            });
    };
    
    bindClicks = function(){
         $list.on('click', 'li', function(event){
            var $a;
            if ($(event.target).is('a')) {
                return;
            }
            if (mode() === mode.NAV) {
                if (mode.alt === true) {
                    $a = $(this).find('a.check:first');
                    if ($a.length) { $a.click(); }
                } else {
                    $a = $(this).find('a.text:first');
                    document.location = $a.attr('href');
                }
            } 
        });
    };
    
    setElements = function(){
        $header    = $('#RIL_header');
        $list      = $('#content>#list');
        $search    = $('#options>#filter');
        $sort      = $('#options>#sort_by');
        $previous  = $('#pages>#previous');
        $next      = $('#pages>#next');
        $pages     = $('#pages>#page>option');
        $back      = $('#return', $header);
        $permalink = $('>cite>a[href][target="_blank"]', $header);
        if (config.debug) {
            window.$list = $list;
        }
        if (!!$list.length) {
            mode(mode.NAV);
        } else {
            mode(mode.READ);
            if (!$('#RIL_container').children().length) { 
                window.location.reload(true); 
            }
        }
    };
    
    select = function(){
        // TODO
    };
    
    mode = function(constant){
        if (typeof constant != 'undefined' && constant != mode.mode) {
           mode.mode = constant;
           $(document).trigger(constant);
           log('Mode changed:', constant);
        }
        return mode.mode;
    };
    mode.NAV = 'nav.mode.tm';
    mode.READ = 'read.mode.tm';
    mode.mode = mode.NAV;
    mode.alt = false;
    window.mode = mode;
    
    config = { 
        debug: true
    };
    
    log = function(label, value){
        if (config.debug) {
            log.log.apply(this, arguments);
        }
    };
    log.log = console.log.bind ? console.log.bind(console) : console.log;
    
    //
    // Run.
    loadScripts([
        'https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js'
    ], function(){
        loadScripts([
            'http://files.pengxwang.com/js/jquery.hotkeys.min.js'
        ], function(){
            $ = window.jQuery.noConflict();
            if ($('head meta[name="keywords"][content]').length) {
                return;
            }
            setElements();
            bindKeys();
            bindClicks();
            // Ready notice.
            $('body').css('border-top', '1px solid #40A700');
        }, function(){ 
            log('Checking l2 dependencies...', window.jQuery.hotkeys);
            return !!window.jQuery.hotkeys; 
        });
    }, function(){ 
        log('Checking l1 dependencies...', window.jQuery);
        return !!window.jQuery; 
    });
    
}(unsafeWindow));
