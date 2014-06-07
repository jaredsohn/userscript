// ==UserScript==
// @name           wa hide entry
// @namespace      wa
// @include        http://www.world-art.ru/animation/*
// ==/UserScript==
    //conf
    var HIDE_WATCH = GM_getValue("hide_watch", false);
// Add jQuery
    GM_log( "nya");
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function get_value( key, _default){
        return GM_getValue(key, _default);
    };
    function set_value(key, value) {
        window.setTimeout(function() {
            GM_setValue(key, value);
      }, 0);
    };
    function values () {
        return GM_listValues();
    }
    function toggle_entry (entry, button, watch) {
        if (watch){
            button.text("[unwatch]");
            button.removeClass("watch_entry");
            button.addClass("unwatch_entry");
            entry.css("text-decoration","line-through");
        }else{
            button.text("[watch]");
            button.removeClass("unwatch_entry");
            button.addClass("watch_entry");
            entry.css("text-decoration","none");
        };

    }
    var watch_items = [];
    function watch_entry(_this){
            var entry = $(_this).siblings();
            toggle_entry(entry, $(_this), true);
            window.setTimeout(function() {
                        watch_items = GM_getValue("watch").split(',');
                        watch_items.push( entry.attr("href").match(/[\d]+/));
                        window.setTimeout(function() {
                                    GM_setValue("watch", watch_items.join(','));
                                  }, 0);
                      }, 0);
    };
    function unwatch_entry(_this){
            var entry = $(_this).siblings();
            toggle_entry(entry, $(_this), false);
            window.setTimeout(function() {
                        watch_items = GM_getValue("watch").split(',');
                        var id = entry.attr("href").match(/[\d]+/);
                        var tmp = [];
                        for (wi in watch_items){
                            if (watch_items[wi] != id){
                                tmp.push(watch_items[wi]);
                            };
                        };
                        window.setTimeout(function() {
                                    GM_setValue("watch", tmp.join(','));
                                  }, 0);
                      }, 0);
    };
    function load_state ($) {
            window.setTimeout(function() {
                        watch_items = GM_getValue("watch").split(',');
                        for (wi in watch_items){
                            entry = $('a[href=animation.php?id=' + watch_items[wi] + ']')
                            toggle_entry(entry, entry.siblings(), true);
                        };
                      }, 0);
        
    }

    function letsJQuery() {
        $('a[href^=animation.php?id=]').after('   <a class=\"watch_entry\" id=\"\" href=\"#\" style="">[watch]</a>');
        $('a[href^=animation.php?id=]:first').parent('td')
            .parent('tr')
            .parent('tbody')
            .parent('table')
            .before('<button id="hide_watch">Toggle_hide</button>');
        
        load_state($);
        $('a.watch_entry').live('click', function () {
                watch_entry(this);
                return false;
        });
        $('a.unwatch_entry').live('click', function () {
                unwatch_entry(this);
                return false;
        });
        $('#hide_watch').live('click', function () {
            $('a.unwatch_entry').parent('td').parent('tr').toggle();
                
        });


    }