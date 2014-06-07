// ==UserScript==
// @name          gmail-wavplay
// @description   Adds an embedded player within Gmail messsages containing audio files in the WAV format (e.g. Vonage voicemails).
// @author        Evan Grim
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// ==/UserScript==

unsafeWindow.addEventListener('load', wavPlay, true);

function wavPlay(){
    //GM_log('loading gmonkey')
    if (unsafeWindow.gmonkey){
        unsafeWindow.gmonkey.load('1.0', onGLoaded);
    }
}

function onGLoaded(gmail){
    //GM_log('gmonkey loaded');
    unsafeWindow.gmail = gmail
    
    gmail.registerViewChangeCallback(scheduleSearchAndEmbed);
    scheduleSearchAndEmbed();
}

function scheduleSearchAndEmbed(){
    unsafeWindow.setTimeout(searchAndEmbed, 300);
}


function searchAndEmbed(){
    //GM_log('searching and embedding');
    if (unsafeWindow.gmail.getActiveViewType() == 'cv'){
        //GM_log('in conversation thread');
        var ave = unsafeWindow.gmail.getActiveViewElement();
        var imgs = ave.getElementsByTagName('IMG');
        
        for (var i=0; i<imgs.length; i++){
            var img = imgs[i];
            var imgParent = img.parentNode;
            //GM_log('parent: ' + imgParent.nodeName + '/src: ' + img.src);
            if (imgParent.nodeName == 'A' &&
                img.src.search('sound.gif') != -1){
                    //GM_log('Linked sound.gif image found, embedding');
                    tableRow = findTableRow(img)
                    if (tableRow != null){
                        var embed = document.createElement('TD');
                        embed.innerHTML = '<div><embed src=' + img.parentNode.href + ' autostart="false" loop="false" height="25" width="144"><noembed>This browser does not support embedded multimedia</noembed></embed></div>';
                        tableRow.appendChild(embed);
                    }
            }
        }
    }
}

function findTableRow(element){
    while (element != null){
        if (element.nodeName == 'TR'){
            break;
        }
        element = element.parentNode;
    }
    return element;
}