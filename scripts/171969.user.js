// ==UserScript==
// @name        Remove  cyrillic tweets
// @namespace   http://userscripts.org/users/483318
// @include     https://twitter.com/*
// @version     1
// ==/UserScript==
(function (global) {
    var document = global.document,
    cyrillic_pattern = /[АБВГҐДЂЃЕЁЄЖЗЗ́ЅИІЇЙЈКЛЉМНЊОПРСС́ТЋЌУЎФХЦЧЏШЩЪЫЬЭЮЯӀӘҒҘҪҠҚҢӨҮҰҺꙖѤѦѪѨѬѮѰѲѴѶҀѸѠѾѢ]/,

    remover = function (elem) {
        if (!elem.querySelector('.new-tweets-bar') && cyrillic_pattern.test(elem.querySelector('.tweet-text').textContent)) {
            elem.parentElement.removeChild(elem);
        }
    },

    click_handler = function () {
        global.Array.prototype.forEach.call(document.querySelectorAll('.stream-item'), remover);
    },

    init = function () {
        var UI = document.createElement('button');
        UI.textContent = 'Remove cyrillic tweets';
        UI.addEventListener('click', click_handler, false);

        UI.style.position='fixed';
        UI.style.left='80%';
        UI.style.top='20%';

		document.getElementById('page-container').appendChild(UI);
    };

	init();
}(this));