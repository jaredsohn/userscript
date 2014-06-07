// ==UserScript==
// @name       Iku douban site music
// @namespace  http://030927.com/
// @version    0.1
// @description  for my love Yue
// @match      http://site.douban.com/*
// @copyright  2013+, haochong
// ==/UserScript==

function addJs(callback) {
  var script = document.createElement("script");
  script.textContent = "(" + callback.toString() + ")();";
  document.body.appendChild(script);
}

function main() {
  
    var timer;
    var check = function() {
        if($('.playlist_player').length) {
            clearTimeout(timer);
			var url = atob($('.playlist_player param[name="flashvars"]').attr('value').split('&')[0].split('=')[1])
			$('.playlist:first').prepend('<p><a class="lnk-sharing" href="'+url+'">'+url+'</a></p>');

        } else {
            timer = setTimeout(function() {
                check();
            }, 200);
        }
    };
 
    console && console.log('我爱音乐，因为世上所有美好旋律，都能让我想起你');

    check();    
	$('table.playlist tr').each(function() { $(this).find('td.title').next().append('<a class="lnk-sharing" href="'+location.origin+location.pathname+'?s='+$(this).attr('song_id')+'">Iku</a>') });

    
}

addJs(main);