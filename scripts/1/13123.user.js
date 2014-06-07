// ==UserScript==
// @name           LDR Pin Hack
// @namespace      http://shinten.info/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==

var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
var _onload = w.onload;

var feed = {
    subscribe_id: '00000000',
    channel: {
        title: 'My Pin',
        description: 'ピンをたてたエントリをまとめて表示',
        subscribers_count: '1'
    },
    items: []
};

var onload = function () { with (w) {
    add_button($N('li', {
        id: 'mypin',
        style: 'text-align:right;font-weight:bold;background-image:url(/img/icon/pin.gif);',
        class: 'button icon'
    }));

    var MyPin = Class.base(Pin).extend({
        add: function (item) {
            if (this.has(item.link)) return;
            this.hash[item.link] = true;

            this.pins.unshift(item);

            this.update_view();
        },
        remove: function (item) {
            if (!this.has(item.link)) return;
            this.hash[item.link] = false;

            this.pins = this.pins.select(function (v) {
                return v.link != item.link;
            });

            this.update_view();
        },
        update_view: function () {
            $('mypin').style.width = '29px';
            $('mypin').innerHTML = this.pins.length;
        },
        print_feed: function () {
            feed.items = this.pins;
            print_feed(feed);
            this.clear();
        },
        clear: function () {
            this.pins = [];
            this.hash = {};
            this.update_view();
        }
    });
    var p = new MyPin;

    Keybind.add('P', function () {
        var item = get_active_item(true);
        if (!item) return;

        if (p.has(item.link)) {
            p.remove(item);
        }
        else {
            p.add(item);
        }
    });
    Keybind.add('O', function () {
        if (!p.pins.length) return;
        p.print_feed();
    });
    Keybind.add('Q', function () {
        p.clear();
    });
}};

w.onload = function () {
    _onload();
    onload();
};
