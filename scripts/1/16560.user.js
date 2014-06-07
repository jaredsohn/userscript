// ==UserScript==
// @name           LDR - show item height
// @namespace      http://d.hatena.ne.jp/swdyh/
// @include        http://reader.livedoor.com/reader/
// ==/UserScript==
//
// version: 0.0.2 2007-12-16T22:20:29+09:00
//
// based on reader_main.0.3.4.js
//
with (unsafeWindow) {
    Control.next_item_offset = function() {
        var container = $("right_container");
        var sc = container.scrollTop;
        var top_offset = $("right_body").offsetTop;
        var divs = $("right_body").getElementsByTagName("h2");
        var active = (sc == 0) ? -1 : get_active_item();
        if (active != null && active != -1 &&
            divs[active].offsetTop - top_offset > sc) {
            return active;
        }
        var can_scroll = divs[active + 1] || null;

        // add below
        var line_color = {item: '#A5C5FF', window: '#E4F2FF'}
        if (can_scroll && can_scroll.parentNode &&
            can_scroll.parentNode.parentNode) {
            var item = can_scroll.parentNode.parentNode;
            if (!item.add_show_length) {
                var line_item = document.createElement('div');
                line_item.style.backgroundColor = line_color.item;
                line_item.style.height = (item.offsetHeight / 5) + 'px';
                line_item.style.width = '3px';
                line_item.style.position = 'absolute';
                line_item.style.top = item.offsetTop;
                line_item.style.left = '8px';
                item.insertBefore(line_item, item.childNodes[0]);

                var line_window = line_item.cloneNode(true);
                line_window.style.backgroundColor = line_color.window;
                line_window.style.height = (window.innerHeight / 5) + 'px';
                line_window.style.left = '5px';
                item.insertBefore(line_window, item.childNodes[0]);
                item.add_show_length = true;
            }
        }
        // end
        return (can_scroll) ? active + 1 : null;
    }
}
