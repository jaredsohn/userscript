// ==UserScript==
// @name        IndexFilter
// @namespace   http://userscripts.org/scripts/show/415316
// @include     http://index.hu/
// @version     2.0.1
// @grant       unsafeWindow
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==


// Available sections
var sections = {
    '.index2': 'index|2',
    '.divany-doboz': 'dívány',
    '.totalcar-doboz': 'totalcar',
    '.napi-doboz': 'Napi.hu',
    '.portfolio-doboz': 'Portfolio',
    '.velvet-doboz': 'VELVET',
    '.inforadio-doboz': 'infórádió',
    '.travelo-doboz': 'travelo',
    '#shopline': 'shopline',
    '#porthu': 'Port.hu'
};


// Denied words (regex)
var denied = /(^|[^a-z])(VV|való ?világ|villá\w|farok|sz?elfi)/i;


// jQuery
var $ = unsafeWindow.jQuery;


function main() {
    hideSections();
    removeDeniedArticles();
    addConfigBar();
}



function addConfigBar() {
    var $f = $('<footer class="container border" style="margin-bottom:20px"><ul></ul></footer>'),
        $ul = $f.find('ul'),
        checked,
        i;

    $ul.append('<li><a href="http://userscripts.org/scripts/show/415316" target="_blank" title="IndexFilter szkript honlapjának megnyitása">IFilter</a></li>');

    for (i in sections) {
        checked = GM_getValue('section_' + i, true) ? ' checked="checked" ' : '';
        $ul.append('<li><label title="A kiveszed a pipát, az adott doboz el lesz rejtve."><input type="checkbox" value="section_' + i + '"' + checked + '> ' + sections[i] + '</label></li>');
    }

    checked = GM_getValue('filter_articles', false) ? ' checked="checked" ' : '';
    $ul.append('<li><label title="A bejelölőd ezt a négyzetet, akkor a forráskódban beállított kulcsszavakat (tiltott szavakat) tartalmazó cikkek elrejtésre kerülnek."><input type="checkbox" value="filter_articles"' + checked + '> Cikkek szűrése</label></li>');

    $f.find('input').click(sectionCheckboxChange);

    $('footer').after($f);
}


function sectionCheckboxChange() {
    var val = $(this).val(),
        checked = this.checked;

    setVal(val, checked);

    if (!$('#if_need_refresh_msg').length) {
        $('footer:last ul').after('<div id="if_need_refresh_msg" style="text-align:center;color:red;margin-top:6px">A beállítások érvénybelépéséhez az oldal frissítése szükséges!</div>');
    }
}


function hideSections() {
    var i, visible;

    for (i in sections) {
        visible = GM_getValue('section_' + i, true);
        if (!visible) {
            $(i).remove();
        }
    }
}


function removeDeniedArticles() {
    if (!denied || !GM_getValue('filter_articles', false)) {
        return;
    }
    $('article').each(function() {
        if (denied.test($(this).text())) {
            $(this).remove();
        }
    });
}


function setVal(name, val) {
    setTimeout(function() {
        GM_setValue(name, val);
    });
}


setTimeout(function() {
    main();
}, 0);
