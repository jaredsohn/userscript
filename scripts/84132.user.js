// ==UserScript==
// @name SoundCloud HTML5
// @namespace http://www.red-bean.com/decklin/userscripts/
// @description Replace SoundCloud SWF player with HTML5 <audio>
// @include http://soundcloud.com/*
// ==/UserScript==

function xPath(path, fn) {
    var s = document.evaluate(path, document, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < s.snapshotLength; i++)
        fn.call(null, s.snapshotItem(i));
}

function parseJSON(text) {
    try {
        return JSON.parse(text);
    } catch (err) {
        return;
    }
}

xPath('//script', function(script) {
    var m = script.text.match(/window\.SC\.bufferTracks\.push\((\{.*?\})\);/);
    if (m) {
        var trackInfo = parseJSON(m[1])
        if (trackInfo)
            addAudioElement(trackInfo);
    }
});

function addAudioElement(trackInfo) {
    var path = '//div[@data-sc-track="'+trackInfo.id+'" and ' +
        'contains(@class, "player")]/div[@class="container"]/' +
        'div[@class="controls"]/a[@href="#play"]';
    xPath(path, function(a) {
        a.onclick = function() {
            var audio = document.createElement('audio');
            audio.setAttribute("controls", "controls");
            audio.setAttribute("autoplay", "true");
            audio.src = trackInfo.streamUrl;
            a.parentNode.parentNode.parentNode.appendChild(audio);
            return false;
        };
    });
}
