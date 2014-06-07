// ==UserScript==
// @name           Down on Fuzz
// @namespace      http://yoan.dosimple.ch/
// @description    replace buy this mp3, by download this mp3
// @include        http://www.fuzz.com/blip/user/*
// ==/UserScript==

function added(action, args) {
    if(args.length) {
        var anchor = document.getElementById("buy"+args[0].id);
        anchor.innerHTML = "download this mp3";
        anchor.href = args[0].url;
    }
}

unsafeWindow.BlipControl.events.add.subscribe(added);
