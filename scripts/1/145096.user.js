// ==UserScript==
// @name       jc youtube script - auto play
// @namespace  http://jc.at.home/
// @include    http://www.youtube.com/*
// @require        http://192.168.10.15/files/jquery-1.6.1.min.js
// @downloadURL https://userscripts.org/scripts/source/145096.user.js 
// @updateURL  https://userscripts.org/scripts/source/145096.meta.js
// @copyright  2011+, jc
// @grant       GM_addStyle
// @grant       GM_log
// @grant       GM_openInTab
// @version     2012.12.07.00h:00m
// @description  When "auto play button" not pressed , reload this page.
// ==/UserScript==
//GM_addStyle(".jc_url:visited { color: red !important; }");
//GM_addStyle("#search-base-div a:visited, #search-base-div .sidebar-ads a, #search-base-div .result-item-main-content, #search-base-div .result-item a {color: red !important;}");
GM_addStyle("#jcYoutubeInfoArea {background-color:gray; color:white; border:1px solid blue; position:fixed; right:100px; top:100px; min-height:100px; height:auto; min-width:150px; max-width:390px; width:auto; z-index:10;}");
function doJcAutoPlay() {
    /*
    if ($('button#playlist-bar-autoplay-button:visible').length > 0) {
        if (!$('#playlist-bar-autoplay-button').hasClass('yt-uix-button-toggled')) {
            //alert('Press Auto Play Button');
            //$('button#playlist-bar-autoplay-button').click();
            $('body').prepend('<div style="background-color:red;">No Auto Play , will reload this video.</div>');
            location.reload();
        }
    }
*/
}
// X-Browser isArray(), including Safari
/*
function isArray(obj) {
return obj.constructor == Array;
}
*/
function isArray(obj) {
    return ( Object.prototype.toString.call( obj) === '[object Array]' );
}
function jcYoutubeGetNextUrl(url , arrPlaylist) {
    // 取得下一個要播放的 video id
    if (undefined != arrPlaylist) {
        
        // http://www.youtube.com/watch?v=EH7gt4aJJjo&list=PLD3425BFE0FE2AD4F&index=2&feature=plpp_video
        var flags   = '';
        var regex   = new RegExp('(feature=(.*?))(&|$)' , flags);
        var matches = regex.exec(url);
        var feature = (matches==undefined)?"":"&"+matches[1];
        
        regex   = new RegExp('(list=(.*?))(&|$)' , flags);
        matches = regex.exec(url);
        var list = (matches==undefined)?"":"&"+matches[1];
        
        regex   = new RegExp('(shuffle=(.*?))(&|$)' , flags);
        matches = regex.exec(url);
        var shuffle = (matches==undefined)?"":"&"+matches[1];
        
        regex   = new RegExp('(v=(.*?))(&|$)' , flags);
        matches = regex.exec(url);
        var nowVideoId = (matches==undefined)?"":matches[2];
        
        /*
// 新增 陣列 的功能 exists
if (undefined == Array.prototype.exists) {
Array.prototype.exists = function(search){
for (var i=0; i<this.length; i++)
if (this[i] == search) return true;
return false;
}
}
*/
        
        // 使用 HTML5 session Storage
        var arrPlaylist2 = arrPlaylist;
        if (undefined != window.sessionStorage) {
            if (undefined == window.sessionStorage['jc_youtube_playlist']) {
                window.sessionStorage['jc_youtube_playlist'] = arrPlaylist.join(",");
            } else {
                arrPlaylist2 = window.sessionStorage['jc_youtube_playlist'].split(",");
                if ( (undefined == arrPlaylist2) || (2 >= arrPlaylist2.length) ) {
                    arrPlaylist2 = arrPlaylist;
                }
            }
        }
        
        // 移除目前在播的 VideoId
        if ('' != nowVideoId) {
            for (var i = 0 ; i < arrPlaylist2.length ; i++) {
                var id = arrPlaylist2[i];
                if (id == nowVideoId) {
                    arrPlaylist2.splice(i,1);
                    break;
                }
            } // foreach
        }
        
        var idx = (parseInt(Math.floor(Math.random()*arrPlaylist2.length))+1);
        idx = (idx % arrPlaylist2.length);
        if (idx >= arrPlaylist2.length) {
            idx = 0;
        }
        var nextVideoId = arrPlaylist2[idx];
        arrPlaylist2.splice(idx,1);
        if ( 0 == arrPlaylist2.length ) {
            arrPlaylist2 = arrPlaylist;
        }
        window.sessionStorage['jc_youtube_playlist'] = arrPlaylist2.join(",");
        
        sNewUrl = "http://www.youtube.com/watch?v=" + nextVideoId;
        if (feature !== undefined) {
            sNewUrl += feature;
        }
        if (list !== undefined) {
            sNewUrl += list;
        }
        if (shuffle !== undefined) {
            sNewUrl += shuffle;
        }
        
        return sNewUrl;
    } else {
        return null;
    }
}
function qualifyURL(url){
    var img = document.createElement('img');
    img.src = url; // set string url
    url = img.src; // get qualified url
    img.src = null; // no server request
    return url;
}
function jcYoutubeGetNextUrl_V2() {
    // 取得下一個要播放的 video id
    // class == playlist-bar-item yt-uix-slider-slide-unit playlist-bar-item-playing
    var ret;
    var nextObj = $('ol.video-list').find('.playlist-bar-item-playing').next();
    if (nextObj.length > 0) {
        ret = qualifyURL(nextObj.find('a').attr('href'));
    } else {
        ret = qualifyURL($('ol.video-list').find('.playlist-bar-item').eq(0).find('a').attr('href'));
    }
    
    if (ret == 'http://www.youtube.com/undefined') {
        ret = null;
    }
    
    return ret;
}
var ytplayer_notfound_count = 0;
var ytplayer_ps_is_zero_count = 0;
var ytplayer_last_currentTime = 0;
var jump_to_next_url = false;
var newTabTime = new Date();
function doJcViewYoutubeInfo() {
    // Show Youtube video Info
    //   API : https://developers.google.com/youtube/js_api_reference?hl=zh-TW
    ytplayer_2 = document.getElementById("movie_player");
    //ytplayer_2 = $('#watch-player #movie_player');
    if (ytplayer_2 != undefined) {
        
        //ytplayer_2.setLoop(true); // loopPlaylists:Boolean
        
        var ps = ytplayer_2.getPlayerState(); //Returns the state number of the player. Possible values are unstarted (-1), ended (0), playing (1), paused (2), buffering (3), video cued (5).
        if (ps>=0) {
            var ct = ytplayer_2.getCurrentTime(); // Returns the elapsed time in seconds since the video started playing.
            var vlf = ytplayer_2.getVideoLoadedFraction(); // Returns a number between 0 and 1 that specifies the percentage of the video that the player shows as buffered.
            var pq = ytplayer_2.getPlaybackQuality();      //This function retrieves the actual video quality of the current video. It returns undefined if there is no current video. Possible return values are highres, hd1080, hd720, large, medium and small.
            var dur = ytplayer_2.getDuration();  //Returns the duration in seconds of the currently playing video. Note that getDuration() will return 0 until the video's metadata is loaded, which normally happens just after the video starts playing.
            if ((1 == ps) && (ct > 0) && ((dur - ct)<1) && (ytplayer_last_currentTime > 0)) {
                if (ct == ytplayer_last_currentTime) {
                    // stoped , so Play Next Video
                    var newUrl = jcYoutubeGetNextUrl_V2();
                    if (newUrl != undefined) {
                        jump_to_next_url = true;
                        window.setTimeout(function() {
                            location.href = newUrl;
                        } , 3000);
                        return;
                    }
                }
            }
            ytplayer_last_currentTime = ct;
            try {
                var pl = ytplayer_2.getPlaylist();
                
                if ((pl != undefined) && (isArray(pl)) && (pl.length==0) ) {
                    // 要先執行此行， ytplayer_2.getPlaylist() 才能有值，怪哉!
                    ytplayer_2.nextVideo();
                    /*
window.setTimeout(function() {
pl = ytplayer_2.getPlaylist();
} , 3000);
*/
                }
                
                var pli = ytplayer_2.getPlaylistIndex();
            } catch(e) {
                alert('ERROR:' + e.message);
            }
            
            var psStr = "";
            if (ps == -1) {
                psStr = "unstarted (-1)";
            } else if (ps == 0) {
                psStr = "ended (0)";
            } else if (ps == 1) {
                psStr = "playing (1)";
            } else if (ps == 2) {
                psStr = "paused (2)";
            } else if (ps == 3) {
                psStr = "buffering (3)";
            } else if (ps == 4) {
                psStr = "unknown (4)";
            } else if (ps == 5) {
                psStr = "video cued (5)";
            } 
            
            var s = '<li>CurrentTime: ' + ct + '</li>' + 
                '<li>Duration: ' + dur + '</li>' + 
                '<li>Play State: ' + ps + '</li>' +
                '<li>Play State Text: ' + psStr + '</li>' +
                '<li>Video Loaded Fraction: ' + vlf + '</li>' +
                '<li>Playback Quality: ' + pq + '</li>' +
                '<li>Playlist Index: ' + pli + '</li>' +
                '<li>Playlist is Array: ' + isArray(pl) + '</li>';
            if ( (undefined != window.sessionStorage) && (undefined != window.sessionStorage['jc_youtube_playlist']) ) {
                try {
                    var s_tmp = '<li>session Playlist Len: ' + window.sessionStorage['jc_youtube_playlist'].split(",").length + '</li>';
                    s += s_tmp;
                } catch (e) {
                }
            }
            if ( (pl != undefined) && (isArray(pl)) ) {
                s += '<li>Playlist Len: ' + pl.length + '</li>';
                //s += '<li>Playlist: ' + pl.join(" , ") + '</li>';
            }
            $('#jcYoutubeInfoArea ul li').remove();
            $('#jcYoutubeInfoArea ul').append(s);
            
            if (0 == ps) { // play ended
                window.setTimeout(function() {
                    try {
                        
                        //ytplayer_2 = document.getElementById("movie_player");
                        //ytplayer_2.nextVideo();
                        //ytplayer_2.playVideoAt(parseInt(pli) + 1);
                        //alert('Click');
                        
                        //var newUrl = jcYoutubeGetNextUrl(location.href , pl);
                        var newUrl = jcYoutubeGetNextUrl_V2();
                        if (newUrl != undefined) {
                            jump_to_next_url = true;
                            ytplayer_2 = null;
                            
                            window.setTimeout(function() {
                                //location.href = newUrl;
                                
                                
                                var time3 = new Date();
                                if ((time3 - newTabTime) >= 10000) {
                                    newTabTime = new Date();
                                    //window.open( newUrl );
                                    window.localStorage['jc_youtube_opener_url'] = location.href;
                                    GM_openInTab(newUrl);
                                    
                                    //$('*').remove();
                                    window.setTimeout(function() {
                                        //alert("CLOSE: " + location.href);
                                    } , 3000);
                                }
                                
                                
                            } , 3000);
                            return;
                        }
                        
                        
                    } catch(e) {
                        alert('ERROR:' + e.message);
                    }
                } , 2000);
            } else if (2 == ps) { // paused
                
                if ((dur - ct) <= 10.0) {  // Maybe except stop
                    window.setTimeout(function() {
                        try {
                            //var newUrl = jcYoutubeGetNextUrl(location.href , pl);
                            var newUrl = jcYoutubeGetNextUrl_V2();
                            if (newUrl != undefined) {
                                jump_to_next_url = true;
                                //ytplayer_2 = null;
                                //$('*').remove();
                                window.setTimeout(function() {
                                    location.href = newUrl;
                                } , 3000);
                                return;
                            }
                            
                        } catch(e) {
                            alert('ERROR:' + e.message);
                        }
                    } , 10000);
                }
                
            }
        } else {
            var s = '<li>Play State: ' + ps + '</li>' + 
                '<li>Try count: ' + ytplayer_ps_is_zero_count + '</li>';
            $('#jcYoutubeInfoArea ul li').remove();
            $('#jcYoutubeInfoArea ul').append(s);
            ytplayer_ps_is_zero_count++;
            if (ytplayer_ps_is_zero_count >= 10) {
                //location.reload();
                var newUrl = jcYoutubeGetNextUrl_V2();
                if (newUrl != undefined) {
                    jump_to_next_url = true;
                    ytplayer_2 = null;
                    
                    window.setTimeout(function() {
                        //location.href = newUrl;
                        
                        
                        var time3 = new Date();
                        if ((time3 - newTabTime) >= 10000) {
                            newTabTime = new Date();
                            //window.open( newUrl );
                            window.localStorage['jc_youtube_opener_url'] = location.href;
                            GM_openInTab(newUrl);
                            
                            //$('*').remove();
                            window.setTimeout(function() {
                                //alert("CLOSE: " + location.href);
                            } , 3000);
                        }
                        
                        
                    } , 3000);
                    return;
                }
            }
        }
    } else {
        ytplayer_notfound_count++;
        var s = '<li>ytplayer not found count: ' + ytplayer_notfound_count + '</li>' + 
                '<li>if ytplayer not found count > 10 , will goto Next Video! </li>';
        $('#jcYoutubeInfoArea ul li').remove();
        $('#jcYoutubeInfoArea ul').append(s);
        
        if (ytplayer_notfound_count > 10) {
            var newUrl = jcYoutubeGetNextUrl_V2();
            if (newUrl != undefined) {
                jump_to_next_url = true;
                window.setTimeout(function() {
                    location.href = newUrl;
                } , 3000);
                return;
            }
        }
    }
    
    if (!jump_to_next_url) {
        window.setTimeout(function() {
            doJcViewYoutubeInfo();
        } , 3000);
    }
}
$(document).ready(function() {
    
    window.setTimeout(function() {
        doJcAutoPlay();
    } , 2000);
    
    if (true) {
        if (location.href.indexOf('watch')!=-1) {
            window.setTimeout(function() {
                $('body').append('<div id="jcYoutubeInfoArea"><div><button type="button" class="jcYoutubeTest">Test</button> &nbsp;<button type="button" class="jcYoutubeSmall">Small</button> &nbsp;<button type="button" class="jcYoutubeMedium">Medium</button></div><ul></ul></div>');
                $('.jcYoutubeSmall').click(function() {
                    $('#watch-video').removeClass('medium');
                    //$('#watch-video #watch-player').css('height' , '390px').css('width' , '640px');
                    $('#baseDiv').removeClass('watch-wide-mode');
                    $('#page').removeClass('watch-wide');
                });
                $('.jcYoutubeMedium').click(function() {
                    $('#watch-video').addClass('medium');
                    //$('#watch-video #watch-player').css('height' , '510px').css('width' , '854px');
                    $('#baseDiv').addClass('watch-wide-mode');
                    $('#page').addClass('watch-wide');
                });
                
                // Test
                $('.jcYoutubeTest').click(function() {
                    jcYoutubeGetNextUrl_V2();
                });
                
                $('#jcYoutubeInfoArea button').css('border' , '1px solid black');
                doJcViewYoutubeInfo();
            } , 1000);
        }
    }
    
    if (window.opener != undefined) {
        window.setTimeout(function() {
            window.opener.close();
        } , 5000);
        
    }
    
    window.setInterval(function() {
        if (undefined != window.localStorage['jc_youtube_opener_url']) {
            if (window.localStorage['jc_youtube_opener_url'] == location.href) {
                window.setTimeout(function() {
                    //alert('CLOSE');
                    //window.close();
                    //window.opener = null; 
                    //window.open("","_self","");  
                    //window.close(); 
                    window.self.close();
                } , 5000);
            }
        }
    } , 10000);
    
});
