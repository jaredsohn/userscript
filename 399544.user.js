// ==UserScript==
// @name       DoubanFM-favorlist-tool
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Download myFavorList of DoubanFM
// @match      http://douban.fm/mine
// @copyright  2014 Sayue
// @require http://code.jquery.com/jquery-2.1.0.min.js
// ==/UserScript==

$(document).ready(function(){
	$('#related_artists').append("<input type='submit' id='show_favors' value='显示我的红心歌曲名称'  />");

    $('#show_favors').on("click",function(){
   		var song_sum = $('#nav_liked').html().toString();
        
        //alert(song_sum.match(/\d+/g));
    	show_song();
    });
});

function show_song(){
    var songArr = $('#record_viewer').find('.song_title');
    var performArr = $('#record_viewer').find('.performer');
    for(var i = 0;i < songArr.length,i < performArr.length;i++){
        document.write($(songArr[i]).html() + ' ---- ' + $(performArr[i]).html() + '<br/>');
    }
    
}

