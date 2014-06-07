// ==UserScript==
// @name           TD Clear Filter
// @namespace      http://userscripts.org/users/74722
// @description    Adds a button to clear all filters in advanced search
// @include        http://torrent-damage.net/torrents.php*
// @include        http://www.torrent-damage.net/torrents.php*
// ==/UserScript==

function add_button() {
    var divs = document.evaluate(
        '//div[@class="center"]',
        document,
        null,
        XPathResult.ANY_UNORDERED_NODE_TYPE,
        null);
    var clear_button = document.createElement('input');
    clear_button.className = 'formbutton';
    clear_button.setAttribute('value', 'Clear Current Selection');
    clear_button.setAttribute('type', 'button');
    clear_button.addEventListener('mouseover', function () { this.className = 'formbutton formbuttonhov'; }, false);
    clear_button.addEventListener('mouseout', function () { this.className = 'formbutton'; }, false);
    clear_button.addEventListener('click',
        function () {
            var checkboxes = document.evaluate(
                '//table[@class="cat_list"]//input',
                document,
                null,
                XPathResult.UNORDERED_NODE_ITERATOR_TYPE,
                null);
            try {
                var checkbox = checkboxes.iterateNext();
                while(checkbox) {
                    checkbox.checked = false;
                    checkbox = checkboxes.iterateNext();
                }
            } catch(e) {
                dump('Error: Document tree modified during iteration ' + e);
            }
        }, true);
    divs.singleNodeValue.appendChild(clear_button);
}

add_button();
