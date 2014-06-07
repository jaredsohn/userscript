// ==UserScript==
// @name        douban （高品质）
// @namespace   http://userscripts.org/scripts/show/398711
// @include     http://douban.fm/
// @version     1
// @grant       none
// ==/UserScript==


@@ -19,9 +19,10 @@

             var song = request.song;

             console.log('Playing mp3 from external: ' + song.mp3Url);

             play_mp3(song.mp3Url)

-            $('#player-info').attr('title', '* 正在播放: ' + song.artists[0].name +

+            $('#player-info').attr('title', '* 正在播放网易源: ' + song.artists[0].name +

                 '<' + song.album.name + '> - ' + song.name);

             $('#fmx163-player-icon img').attr('src', icon_default_url);

+            $('#fmx163-player-icon a').attr('href', 'http://music.163.com/#/song?id=' + song.id);

         }

         else if (request.type === 'fm_play_raw_mp3') {

             // Play low quality douban's mp3 file

@@ -30,6 +31,7 @@

                 play_mp3(current_song.url);

                 $('#player-info').attr('title', '正在播放豆瓣源');

                 $('#fmx163-player-icon img').attr('src', icon_douban_url);

+                $('#fmx163-player-icon a').attr('href', 'javascript:void(0)');

             }

         }

     });

@@ -85,7 +87,7 @@

                                  '| <a href="http://www.zlovezl.cn/articles/fmx163-released/" target="_blank">联系作者</a></div>');

         $("#fm-section").append('<div id="fmx163-player">' + 

                                 '<audio id="fmx163-player-audio" type="audio/mpeg" controls></audio></div>' + 

-                                '<div id="fmx163-player-icon"><a href="javascript:void(0)" style="background: transparent" id="player-info">' +

+                                '<div id="fmx163-player-icon"><a target="_blank" href="javascript:void(0)" style="background: transparent" id="player-info">' +

                                 '<img src="' + icon_default_url + '" /></a></div>' + 

                                 '<div id="fmx163-player-blocker"></div>');

 

