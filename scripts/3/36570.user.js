// ==UserScript==
// @name           Get Blip
// @namespace      Blip
// @description    Get musics from blip that makes me happy
// @include        http://blip.fm/lolmaker
// ==/UserScript==

unsafeWindow.BlipControl.events.add.subscribe(added);

//window.addEventListener('submit',
//    submitSelector,
//    false);

//Adicionar logica para adicionar um download quando e feito um search
//Adicionar funcao para pegar musicas que vem do servidor deles

function added(action, args) {
    if (args.length && args[0].url.indexOf('http://') == 0) {
        var playDiv = document.getElementById('playpause' + args[0].id);
        addDownloadButton(args[0].id, args[0].url, playDiv);
    }
}

function addDownloadButton(musicNum, musicUrl, playDiv) {
    var dl_link = document.createElement("a");
    dl_link.appendChild(document.createTextNode("download"));
    dl_link.id = "dl_link" + musicNum;
    dl_link.href = musicUrl;

    var dl_span = document.createElement("span");
    dl_span.appendChild(document.createTextNode(" | "));
    dl_span.appendChild(dl_link);

    playDiv.appendChild(dl_span);
}