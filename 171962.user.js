// ==UserScript==
// @name	GoodCast.tv - wyciagarka RTMP
// @namespace	http://userscripts.org/scripts/show/171962
// @author	kasper93
// @description	Umieszcza na stronie gotowa komende dla rtmpdump. 
// @include	http://goodcast.tv/*
// @downloadURL	https://userscripts.org/scripts/source/171962.user.js
// @updateURL	https://userscripts.org/scripts/source/171962.meta.js
// @version	1.0.0
// @grant	none
// @run-at	document-end
// ==/UserScript==

function main() {
    $('iframe[name="www.goodcast.tv"]').load(function () {
        var title = $('title').text().slice(0, -13).trim();
        var url = $('iframe[name="www.goodcast.tv"]').contents().find('iframe').attr('src');

        if (url.match(/goodcast.org/)) {
            var match = url.match(/stream.php\?id=(\d+)/);
            if (match) {
                $('iframe[name="www.goodcast.tv"]').parent().prepend('<div>rtmpdump -v -i rtmp://213.163.64.207:1935/liverepeater/_definst_/' + match[1] + ' -o ' + title + '_' + Number(new Date() / 1000).toFixed(0) + '.flv</div>');
            }
        } else if (url.match(/stream4.tv/)) {
            var match = url.match(/player.php\?id=(\d+)/);
            if (match) {
                $('iframe[name="www.goodcast.tv"]').parent().prepend('<div>rtmpdump -v -i rtmp://rtmp2.stream4.tv:1935/liverepeater/_definst_/' + match[1] + ' -o ' + title + '_' + Number(new Date() / 1000).toFixed(0) + '.flv</div>');
            }
        }
    });
}

if (typeof $ == 'undefined') {
    if (typeof unsafeWindow !== 'undefined' && unsafeWindow.jQuery) {
        // Firefox
        var $ = unsafeWindow.jQuery;
        main();
    } else {
        // Chrome
        addJQuery(main);
    }
} else {
    // Opera
    main();
}

function addJQuery(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
