// ==UserScript==
// @name        Yandex.Music playlist creator
// @namespace   sergli.yamusic.tool.playlistCreator
// @description Yandex.Music playlist export tool
// @grant       none
// @include     http://music.yandex.ru/#!/users/lsapost/playlists/
// @version     1
// @require     http://xnet-chrome.googlecode.com/svn-history/r2/trunk/md5-min.js
// ==/UserScript==
var timestamp = +new Date();
var controlJS = '<button onclick="window.SLI_EXPORT(window.SLI_getPlsKindByLink($(this).parent()[0]),window.SLI_getPlsNameByLink($(this).parent()[0]));">Export playlist</button>';
window.SLIDBG = true;
function debug(s){
if(window.SLIDBG){console.log(s);}
}

//entry point
window.SLI_EXPORT = function (plsKind,plsName){
    debug("Going to export ["+plsName+"], kind="+plsKind);
    plsInfo = window.SLI_getPlsInfo(plsKind,plsName);
    for(var i=0;i<plsInfo.playlists.length;i++) {
        var pls = plsInfo.playlists[i];
        
        if(pls.kind==3){debug("Processing playlist [I like]");}else{
        debug("Processing playlist ["+pls.title+"]");
        }
        
        if((pls.title==plsName && pls.kind==plsKind) ||  //либо это просто плейлист
            (pls.title=="" && pls.kind==3 && plsKind==3)){ //либо kind=3 и тогда это "мне нравится"
            debug("Got target playlist info, tracks param = "+pls.tracks);
            targetPlaylist = pls;
        }
    }
    //now targetPlaylist contains needed data. Or it is undefined
    if(targetPlaylist==undefined){debug("CRASH: requested playlist was not found"); return;}
    if(targetPlaylist.tracks.length==0){debug("STOP: empty playlist");return;}
    //collect playlist's tracks
    targetTracks = new Array();
    for(var i=0;i<plsInfo.tracks.length;i++) {
        var currentTrack = plsInfo.tracks[i];
        if(targetPlaylist.tracks.indexOf(currentTrack.id)>-1){
            debug("Catched track ["+currentTrack.title+"]");
            targetTracks[targetTracks.length] = currentTrack;
        }
    }
    debug("Catched "+(targetTracks.length)+" tracks");
    //now we have a list of tracks.
    window.SLI_getDownloadData(targetTracks);    
};

window.SLI_getPlsKindByLink = function (link){
    debug("Got playlist link, it must be .b-subtitle__count div: "+link)
    arr = link.parentElement.children[0].children[0].href.split('/');
    return arr[arr.length-1];
}

window.SLI_getPlsNameByLink = function (link){
    return link.parentElement.children[0].children[0].innerHTML;
}

window.SLI_getPlsInfo = function(plsKind,plsName){
    //http://music.yandex.ru/get/playlist2.xml?kinds=1000&r=1375464836371
    url = "http://music.yandex.ru/get/playlist2.xml?kinds="+plsKind+"&r="+timestamp;
    debug("Going to load playlist info via GET AJAX, data: ["+url+"]");
    window.info = null;
    $.ajax({
        dataType: "json",
        url: url,
        async:false,
        success: function(data){window.info = data;}
    });
    return window.info;
}

function pushTrackInfo(track,current,len){
    return function(data){
                window.SLI_pushTrackInfo(data,track);
                if(current==len){
                    debug("Data collected");
                }
            }
}

window.SLI_getDownloadData = function(targetTracks){
    debug("Going to load download links");
    window.SLI_PLS = new Array();
    for(var i=0;i<targetTracks.length;i++){
    var url = 'http://music.yandex.ru/xml/storage-proxy.xml?p='+encodeURIComponent('download-info/'+encodeURIComponent(targetTracks[i].storage_dir)+'/2.mp3');
    debug("Loading download link via GET AJAX ["+url+"]");
        $.ajax({
            dataType: "xml",
            url: url,
            data:{nc:Math.random()},
            xhrFields: {
                withCredentials: true
            },
            success: pushTrackInfo(targetTracks[i],i,targetTracks.length),
            error: function(a,b,c){debug("ERR["+c+"]: failed to load link for "+url);}
        });
    
    }

}

window.SLI_pushTrackInfo = function(xmlDoc,track){
    var link="http://";
    xmlDoc = $(xmlDoc);
    host = xmlDoc.find('regional-host');
    link+=host.first().text()+'/get-mp3/';
    path = xmlDoc.find('path').first().text(); //<path> - heavy shit from XML
    if (path.substr(0,1) == '/'){
			path = path.substr(1);
	}
	s = xmlDoc.find('s').first().text(); 
    var key1 = hex_md5('XGRlBW9FXlekgbPrRHuSiA'+path+s);
    debug("Key1 generated = "+key1);
    var key2 = xmlDoc.find('ts').first().text();
    debug("Key2 got = "+key2);
    link+=key1+'/'+key2+'/'+path;
    link+="?track-id="+track.id+"&from=service-10-search-track&similarities-experiment=default";
    track.link = link;
    window.SLI_PLS[window.SLI_PLS.length] = track;
    $('.l-dpage__center-i').prepend('<a href="'+link+'">'+track.title+'</a><div sryle="width:100%; clear:both; height:1px;"></div>');
    
}


//init
$(window).load(function(){
var controlElm = $('.b-subtitle__count');
controlElm.append(controlJS);
debug('Playlist creator by LSA init OK');
});