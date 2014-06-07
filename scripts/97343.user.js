// ==UserScript==
// @name           ncore - torrent-to-utorrent-web-ui
// @namespace      torrent
// @include        http://ncore.cc/torrents.php*
// @include        http://ncore.us/torrents.php*
// @include        http://ncore.nu/torrents.php*
// @include        https://ncore.cc/torrents.php*
// @include        https://ncore.us/torrents.php*
// @include        https://ncore.nu/torrents.php*
// ==/UserScript==
(function(){
    var init = {
        user : '',
        pass : '',
        host : '',
        port : 
    }
    var dirs = {
        xxx:    'C:\\movies\\',
        music:  'C:\\mp3\\',
        movie:  'C:\\movies\\',
        series: 'C:\\movies\\',
        ebook:  'C:\\misc\\',
        game:   'C:\\misc\\',
        misc:   'C:\\misc\\',
        def:    'C:\\'
    }
    var reg = /([0-9]{6})|([0-9]{5})|([0-9]{4})|([0-9]{3})|([0-9]{2})/;
    var i   = 0;
    var obj = new Array;
    var filterDifferences = document.getElementById('main_tartalom').children;
    var dir;
    
    for( child in filterDifferences ) {
        if(filterDifferences[child].className == 'lista_all') {
            var main    = filterDifferences[child].children[2].children;
        }
    }
    for(element in main){
        if(reg.test(main[element].id)){
            var torrent     = document.getElementById(main[element].id).previousElementSibling.previousElementSibling.children[1].children[0];
            var image       = document.createElement('IMG');
            var link        = document.createElement('A');

            link.href           = 'javascript:void(0);';
            
            image.src           = 'http://static.ncore.cc/styles/dark/ie_free.gif';
            image.style.cssText = 'float: left;height: 17px;margin: 7px 4px 0 5px;cursor : pointer;';
            
            link.appendChild(image);
            torrent.insertBefore(link,torrent.children[0]);

            obj[i] = document.getElementById(main[element].id);
            i++;
        }
    }
    obj.map(function(torrent){
        var fullHost    = init.host+':'+init.port;
        var torrentId   = torrent.id;
        var cookie      = escape(document.cookie.replace(" ", ""));
        var torrentType = torrent.previousElementSibling.previousElementSibling.children[0].children[0].search;
        var torrentimg  = torrent.previousElementSibling.previousElementSibling.children[1].children[0].children[0].children[0];

        torrent.previousElementSibling.previousElementSibling.children[1].children[0].children[0].addEventListener('click', function(event){
            GM_xmlhttpRequest({
                method: 'GET',
                url:    'http://'+init.user+':'+init.pass+'@'+fullHost+'/gui/token.html',
                onerror: function() {
                    alert('Hiba');
                },
                onreadystatechange: function() {
                    torrentimg.src = 'https://ncore.cc/styles/ajax.gif';
                },
                onload: function(resp) {        
                    if(resp.status == 200) {
                        var token = resp.responseText.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/g, "");
                        switch(torrentType) {
                            case '?tipus=xxx_dvd':dir = dirs.xxx;break;
                            case '?tipus=xxx_hd':dir = dirs.xxx;break;
                            case '?tipus=xxx_xvid':dir = dirs.xxx;break;
                            case '?tipus=xxx_imageset':dir = dirs.xxx;break;
                                //zene
                            case '?tipus=clip':dir = dirs.music;break;
                            case '?tipus=lossless':dir = dirs.music;break;
                            case '?tipus=lossless_hun':dir = dirs.music;break;
                            case '?tipus=mp3_hun':dir = dirs.music;break;
                            case '?tipus=mp3':dir = dirs.music;break;
                                //filmek
                            case '?tipus=dvd':dir = dirs.movie;break;
                            case '?tipus=dvd_hun':dir = dirs.movie;break;
                            case '?tipus=xvid':dir = dirs.movie;break;
                            case '?tipus=xvid_hun':dir = dirs.movie;break;
                            case '?tipus=hd':dir = dirs.movie;break;
                            case '?tipus=hd_hun':dir = dirs.movie;break;
                            case '?tipus=dvd9_hun':dir = dirs.movie;break;
                            case '?tipus=dvd9':dir = dirs.movie;break;
                                //sorozatok
                            case '?tipus=xvidser':dir = dirs.series;break;
                            case '?tipus=xvidser_hun':dir = dirs.series;break;
                            case '?tipus=dvdser':dir = dirs.series;break;
                            case '?tipus=dvdser_hun':dir = dirs.series;break;
                            case '?tipus=hdser':dir = dirs.series;break;
                            case '?tipus=hdser_hun':dir = dirs.series;break;
                                //ebook
                            case '?tipus=ebook':dir = dirs.ebook;break;
                            case '?tipus=ebook_hun':dir = dirs.ebook;break;
                                //játék
                            case '?tipus=console':dir = dirs.game;break;
                            case '?tipus=game_rip':dir = dirs.game;break;
                            case '?tipus=game_iso':dir = dirs.game;break;
                                //misc
                            case '?tipus=iso':dir = dirs.misc;break;
                            case '?tipus=misc':dir = dirs.misc;break;
                            case '?tipus=vsti':dir = dirs.misc;break;
                            default: dir = dirs.def;break;
                        }
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: 'http://'+init.user+':'+init.pass+'@'+fullHost+'/gui/?token='+token+'&action=setsetting&s=dir_active_download_flag&v=1&s=dir_active_download&v='+escape(dir),
                            onerror: function() {
                                alert('Hiba');
                            },
                            onreadystatechange: function() {
                                torrentimg.src = 'https://ncore.cc/styles/ajax.gif';
                            },
                            onload: function(resp) {        
                                if(resp.status == 200) {
                                    GM_xmlhttpRequest({
                                        method: 'GET',
                                        url:    'http://'+init.user+':'+init.pass+'@'+fullHost+'/gui/token.html',
                                        onerror: function() {
                                            alert('Hiba');
                                        },
                                        onreadystatechange: function() {
                                            torrentimg.src = 'https://ncore.cc/styles/ajax.gif';
                                        },
                                        onload: function(resp) {        
                                            if(resp.status == 200) {
                                                var token = resp.responseText.replace(/<\/?[a-z][a-z0-9]*[^<>]*>/g, "");                                                
                                                GM_xmlhttpRequest({
                                                    method: 'GET',
                                                    url: 'http://'+init.user+':'+init.pass+'@'+fullHost+'/gui/?token='+token+'&action=add-url&s=https%3A//ncore.cc/torrents.php%3Faction%3Ddownload%26id%3D'+torrentId+':COOKIE:'+cookie,
                                                    onerror: function() {
                                                        alert('Hiba');
                                                    },
                                                    onreadystatechange: function() {
                                                    },
                                                    onload: function(resp) {        
                                                        if(resp.status == 200) {
                                                            torrentimg.src = 'http://static.ncore.cc/styles/dark/ico_ok.gif';
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            });
        },false);
    });
})();