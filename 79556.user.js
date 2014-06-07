// ==UserScript==
// @name            G0V VKontakte Downloader
// @description     Download music and videos for vk.com and vkontakte.ru. Working as 08.08.2010.
// @namespace       http://userscripts.org/users/dvanon
// @include         http://vk.com/*
// @match           http://vk.com/*
// @include         http://*.vk.com/*
// @match           http://*.vk.com/*
// @include         http://vkontakte.ru/*
// @match           http://vkontakte.ru/*
// @include         http://*.vkontakte.ru/*
// @match           http://*.vkontakte.ru/*
// @version         1.2.0
// ==/UserScript==
(function() {
    function makeAudioLink(song_id, host, user, file) { //link to mp3 file 
        return ('http://cs'+host+'.'+document.domain+'/u'+user+'/audio/'+file+'.mp3');
    }
    
    function makeButton(button, append_loc) {
        append_loc.appendChild(button);
    }
    
    var songs = document.getElementsByClassName('playimg'); //array with all play images
    for (var cur in songs) {
        var is_searchpage = new RegExp(/(search.php)/).exec(document.URL); //checks if we're on gsearch.php
        if (is_searchpage != null) {
            var re = new RegExp(/operate\(([\d]*),([\d]*),([\d]*),'([\w]*)'/),
                cfg = re.exec(songs[cur].parentNode.innerHTML), //gets song_id, host, user, file
                song_id = cfg[1],
                link = makeAudioLink(song_id, cfg[2], cfg[3], cfg[4]),
                append_loc = document.getElementById('actions' + song_id);
        } else {
            var re = new RegExp(/operate\(([\d]*),'(.*)',[\d]*\);/),
                song_id = re.exec(songs[cur].parentNode.innerHTML)[1],
                link = re.exec(songs[cur].parentNode.innerHTML)[2],
                song_div = document.getElementById('audio' + song_id),
                append_loc = song_div.getElementsByClassName('duration')[0];
        }
        
        var dl_button = document.createElement('div');
        dl_button.class = 'addAudioLink';
        dl_button.id = 'download' + song_id;
        dl_button.innerHTML = '<a href="'+link+'">Скачать</a>';
        if (is_searchpage != null) {
            dl_button.style.marginRight = '-15px';
            dl_button.style.paddingLeft = '10px';
        }
        makeButton(dl_button, append_loc);
    }
    
    //checks if we're on video page
    if (document.URL.match(/video-?(\d+)_(\d+)/) {
        var allText = document.documentElement.innerHTML,
            url = '',
            vtag = /"vtag":.(.*?).,/.exec(allText),
            vkid = /"vkid":.(.*?).,/.exec(allText),
            uid = /"uid":.(.*?).,/.exec(allText),
            host = /"host":.(.*?).,/.exec(allText),
            noflv = /"no_flv":(.*?),/.exec(allText);

        if (/-$/.exec(vtag[1])) {
            url = 'http://'+host[1]+'/assets/videos/'+vtag[1]+vkid[1]+'.vk.flv';
        } else {
            host[1]=host[1].replace(/\\/g,'');
            if (/0/.exec(noflv[1])) {
                url = host[1]+'u'+uid[1]+'/video/'+vtag[1]+'.flv';
            } else {
                url = host[1]+'u'+uid[1]+'/video/'+vtag[1]+'.240.mp4';
            }
        }

        var cont = document.createElement('div'),
            addon = document.createElement('a');
        cont.setAttribute('style', 'float:right');
        addon.setAttribute('href', url);
        addon.innerHTML = '<strong>Скачать</strong>'; 
        cont.appendChild(addon);
        document.getElementById('bigSummary').appendChild(cont);
    }
})();