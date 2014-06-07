// ==UserScript==
// @id             nicosoundAddTagToPlayer
// @name           Nicosound: Add sound to playlist from tag pages
// @version        1.0r17
// @namespace      simon
// @author         Simon Chan
// @description    Add a sound on tag page to Stream Player by just one-click.
// @include        http://nicosound.anyap.info/tag/*
// @run-at         document-end
// ==/UserScript==

var player;
function addSound(root) {
    root = root.target.parentNode;
    soundInfo = {
        fullMovieId: root.getElementsByClassName("title-layout")[0].href.split("/").pop(),
        title: root.getElementsByClassName("title")[0].textContent.slice(1, -1),
        duration: root.getElementsByClassName("playtime")[0].textContent.slice(1, -1),
        convertedTime: "",
        playCount: root.getElementsByClassName("plays")[0].textContent.replace(/,/g, ""),
        thumbnailUrl: root.getElementsByClassName("lazy")[0].dataset["src"]
    };
    if (!player || !player.location || !player.location.href)
        player = open('', 'wStreamingPlayer', 'width=738,height=370,location=yes,resizable=yes,status=yes');
    if (player.location.href == 'about:blank')
        player.location.href = 'http://nicosound.anyap.info/streaming.aspx';
    else if (player.document.readyState == "complete") {
        player.wrappedJSObject.Playlist.insertRangeSound([unsafeWindow.getSoundInfo()]);
        player.wrappedJSObject.Playlist.playSound(soundInfo.fullMovieId);
    }
    player.focus();
}

var soundInfo = null;
unsafeWindow.getSoundInfo = function () {
    return player.eval("JSON.parse('" + JSON.stringify({
        fullMovieId: soundInfo.fullMovieId,
        title: soundInfo.title,
        duration: soundInfo.duration,
        convertedTime: "",
        playCount: soundInfo.playCount,
        thumbnailUrl: soundInfo.thumbnailUrl
    }) + "')");
}

GM_addStyle("\
    .add-button{ \
        position: absolute; \
        left: 120px; \
        bottom: 0.3em; \
        font-size: 0.9em; \
        color: #777; \
        cursor: pointer \
    }");

function buildButton() {
    var span = document.createElement("span");
    span.className = "add-button";
    span.textContent = "Stream";
    span.addEventListener("click", addSound);
    return span;
}

Array.prototype.forEach.call(document.getElementsByClassName("sound-item"), function (ele) {
    ele.childNodes[1].insertBefore(buildButton(), ele.getElementsByClassName("status-conv-layout")[0]);
});