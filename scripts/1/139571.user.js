// ==UserScript==
// @name       jc youtube script - save playlist
// @namespace  http://jc.at.home/
// @require    http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.6.4.min.js
// @match      http://www.youtube.com/playlist*
// @include http://www.youtube.com/playlist*
// @downloadURL https://userscripts.org/scripts/source/139571.user.js 
// @updateURL  https://userscripts.org/scripts/source/139571.meta.js
// @description  Save playlist title to browser local storage
// @version    2014.02.23.22h.00m
// @copyright  2011+, You
// ==/UserScript==
//GM_addStyle(".jc_url:visited { color: red !important; }");
GM_addStyle("#divJcSavePlaylistArea {border:1px solid gray; position: fixed; right: 30px; top: 130px; width: 400px;}");
GM_addStyle("#divJcMsg {border:1px solid blue; height:700px; overflow-y:auto;}");
GM_addStyle(".jcItem { border:1px solid gray; margin-bottom:5px; }");
function getJcPlaylistId() {
    // 取得目前的 Playlist Id
    var aurl = location.href;
    var r = new RegExp('list=(.*?)(&|$)' , '');
    var listId = r.exec(aurl)[1];
    
    aurl = null;
    r = null;
    
    return (listId);
}
function doJcLoadVideos() {
    // 載入已儲存的標題
    var listId = getJcPlaylistId();
    
    $('#divJcMsg').html( 'Load Playlist Id = ' + listId + '<hr />' + localStorage.getItem('jc_youtube_playlist_' + listId));
    
    listId = null;
}
function doJcSaveVideos() {
    // 儲存影片標題至 Browser Local Storage
    var yVideos = [];
    $('.pl-video-title-link').each(function() {
        var atitle = $.trim($(this).text());
        yVideos.push(atitle);
    });
    var astr = yVideos.join(',,,,,');
    
    var listId = getJcPlaylistId();
    
    localStorage.setItem('jc_youtube_playlist_' + listId , astr);
    $('#divJcMsg').html( 'Playlist Id = ' + listId + '<hr />' + astr );
    
    listId = null;
    yVideos = null;
    atitle = null;
    astr = null;
}
function doJcCheckVideos() {
    // 檢查哪些影片不存在 或 重複
    var listId = getJcPlaylistId();
    
    var videosStr = localStorage.getItem('jc_youtube_playlist_' + listId);
	var videosStrLen = parseInt(videosStr.length / 1024 , 10) + ' KB';
	$('#spanJcSavePlaylistDataSize').text(videosStrLen);
    var videosArr = videosStr.split(',,,,,');
    
    var atitle;
    var btitle;
    var surl;
    var bArr = [];
    var video_link_class = '.pl-video-title-link';
    
    $(video_link_class).each(function() {
        var atitle = $.trim($(this).text());
        bArr[atitle] = '1';
    });
    
    $('#divJcMsg').html('');
    
    for (video in videosArr) {
        btitle = videosArr[video];
        if (undefined == bArr[btitle]) {
            surl = 'http://www.youtube.com/results?search_query=' + encodeURIComponent(btitle);
            $('#divJcMsg').append('<div class="jcItem">' + btitle + ' : Not Exists! ' + ' <a target="_blank" href="' + surl + '">Search</a>' + '</div>');
        }
    } // for
    video = null;
    
    var cArr = [];
    for (video in videosArr) {
        btitle = videosArr[video];
        cArr[btitle] = '2';
    }
    
    $('#divJcMsg').append('<hr />');
    $(video_link_class).each(function() {
        var atitle = $.trim($(this).text());
        if (undefined == cArr[atitle]) {
            //surl = 'http://www.youtube.com/results?search_query=' + encodeURIComponent(btitle);
            $('#divJcMsg').append('<div class="jcItem">' + atitle + ' : Not Save! </div>');
        }
    });
    
    
    //$('#divJcMsg').html( bArr.join('<br />') );
    
    surl = null;
    atitle = null;
    btitle = null;
    listId = null;
    videosArr = null;
    videosStr = null;
    cArr = null;
    bArr = null;
}
function doJcAddSavePlaylistBtn() {
    $('body').append('<div id="divJcSavePlaylistArea"><div><input type="button" id="btnJcSave" value="Save To Local Storage" />' +
                     '<input type="button" id="btnJcCheck" value="Check deleted videos" /><span id="spanJcSavePlaylistDataSize">--- KB</span></div><div id="divJcMsg"></div></div>');
    
    
    $('#btnJcSave').click(function() {
        // 儲存影片標題至 Browser Local Storage
        doJcSaveVideos();
    });
    
    $('#btnJcCheck').click(function() {
        // 檢查哪些影片不存在 或 重複
        doJcCheckVideos();
    });
    
    
    // 載入已儲存的標題
    doJcLoadVideos();
    
}
$(document).ready(function() {
    
    window.setTimeout(function() {
        doJcAddSavePlaylistBtn();
    } , 200);
    
});