// ==UserScript==
// @name         Fix 4chan /a/
// @namespace    71f8f12556abe601d230ac099af2e207
// @description  Remove Naruto video from 4chan /a/ and restore original field names.  This should make the inline Quick Reply work again.
// @match        *://boards.4chan.org/a/*
// @grant        none
// ==/UserScript==

(function() {
    if (location.hostname != "boards.4chan.org" || !/^\/a\//.test(location.pathname)) return;

    document.title = "/a/ - Anime & Manga";

    var boardTitle = document.querySelector(".boardTitle");
    var boardSubtitle = document.querySelector(".boardSubtitle");
    if (boardTitle != null) boardTitle.textContent = "/a/ - Anime & Manga";
    if (boardSubtitle != null) boardSubtitle.innerHTML = 'Text Board: /<a href="//dis.4chan.org/anime/" title="Anime & Manga">anime</a>/';

    var labels = document.querySelectorAll("#postForm > tbody > tr > td:first-child");
    var correctText = ["Name", "Email", "Subject", "Spoilers", "Comment", "Verification", "File", "Password"];
    for (var i = 0; i < labels.length && i < correctText.length; i++) {
        labels[i].textContent = correctText[i];
    }

    var checkboxes = document.querySelectorAll("#postForm input[type=checkbox]");
    for (var i = 0; i < checkboxes.length; i++) {
        while (checkboxes[i].nextSibling != null) {
            checkboxes[i].parentNode.removeChild(checkboxes[i].nextSibling);
        }
        checkboxes[i].parentNode.appendChild(document.createTextNode("Spoiler Image?"));
    }

    var passwordText = document.querySelector(".password");
    if (passwordText != null) passwordText.textContent = "(Password used for deletion)";

    var annoyingVideo = document.querySelector("body > center");
    if (annoyingVideo != null) document.body.removeChild(annoyingVideo);
})();
