// ==UserScript==
// @name           youtub-eauto-next-enabled
// @include        http://*
// ==/UserScript==

(function() {
    var settingKey = 'youtub-eauto-next-enabled';

    function selectRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
    };

    function jumpNextMovie() {
        var nextItem = selectRandom(document.querySelectorAll('.video-list-item a'));
        location.href = nextItem.href;
    };

    function setSetting(value) {
        localStorage[settingKey] = value;
        return value;
    }
    function getSetting() {
        var value = localStorage[settingKey];
        return value != "false";
    }

    var video = document.querySelector('embed#movie_player');
    if (!video) return;

    var timer = setInterval(function() {
        var state = video.getPlayerState();
        if (state != 0) return;
        if (!getSetting()) return;

        jumpNextMovie();
        clearInterval(timer);
    }, 1000);

    var button = document.createElement('button');
    button.textContent = 'Skip';
    button.className = 'yt-uix-button';
    document.querySelector('#watch-actions').appendChild(button);
    button.addEventListener('click', function() {
        jumpNextMovie();
    });

    var label = document.createElement('label');
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = getSetting();
    var text = document.createTextNode('Auto');
    label.appendChild(checkbox);
    label.appendChild(text);
    label.style.margin = '5px';
    document.querySelector('#watch-actions').appendChild(label);
    checkbox.addEventListener('click', function() {
        var value = checkbox.checked;
        setSetting(value);
    });


})();