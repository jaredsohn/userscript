// ==UserScript==
// @name           LDR Visual Bell
// @namespace      http://d.hatena.ne.jp/bannyan/
// @include        http://reader.livedoor.com/reader/*
// ==/UserScript==

GM_addStyle(<><![CDATA[

    #visual_bell {
        position : absolute;
        top      : 0;
        left     : 0;
        width    : 100%;
        height   : 100%;
    }

    #visual_bell.show {
        visibility : visible;
        z-index    : 2147483647;
    }

    #visual_bell.hide {
        visibility : hidden;
        z-index    : -9999;
    }

]]></>);

(function(w) {

    var cfg = {
        color   : '#19425d',
        opacity : 3.5,
        time    : 90
    }

    var visualBell = {
        init: function() {
            w.document.body.appendChild(update(document.createElement('div'), {
                'id'    : 'visual_bell',
                'style' : 'background:' + cfg.color + ';filter:alpha(opacity=' + (cfg.opacity * 10) + ');-moz-opacity:' + cfg.opacity / 10 + ';opacity:' + cfg.opacity / 10 + ';'
            }))
        },
        show: function() { w.$('visual_bell').className = 'show'; },
        hide: function() { w.$('visual_bell').className = 'hide'; }
    }

    w.register_hook('after_init', function() {
        visualBell.init();
        visualBell.hide();
    });

    addAfter(w.Control, 'scroll_next_item', function() {
        if (w.get_active_item(true).offset === w.get_active_feed().items.length) {
            visualBell.show();
            w.setTimeout(function() { visualBell.hide(); }, cfg.time);
        }
    })

    // THX! addAfter & update (LDR - Signal: http://userscripts.org/scripts/review/12781) written by brasil
    function addAfter(target, name, after) {
        var original = target[name];
        target[name] = function() {
            var ret = original.apply(this, arguments);
            after.apply(this, arguments);
            return ret;
        }
    }

    function update(obj, params) {
        if(obj.setAttribute){
            for(var key in params)
                obj.setAttribute(key, params[key]);
        } else {
            for(var key in params)
                obj[key] = params[key];
        }
        return obj;
    }

}) (this.unsafeWindow || this);
