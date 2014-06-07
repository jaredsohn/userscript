// ==UserScript==
// @id             0000002
// @name           video_inserter_jQuery
// @version        2.0.0
// @history        2.0.0 Убрал рекламу, лишние кнопки, рекомендацию и рекламную заставку перед видео.
// @history        1.1.0 Теперь есть версия скрипта, добавил некоторую историю, добавил синхронный аякс запрос, убрал необходимость отключать блокировку всплывающих окон.
// @history        1.0.3 Добавил проверку на hitech.vesti.ru (при обнаружении hitech.vesti.ru скрипт теперт не препятствуйет окрытию сайта)
// @history        1.0.2 Добавил анимацию ожидания открытия окна
// @history        1.0.1 Ajax вызов в синглтоне
// @history        1.0.0 Релиз
// @namespace      http://userscripts.org/scripts/show/102873
// @author         Black_Sunlight
// @include        http://www.vesti.ru/news*
// @include        http://www.vesti.ru/only_video.htm*
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js?ver=1.6
// ==/UserScript==

var getVideo = {
    grab: function () {
        $('.video_ico_s').live('click', function (ev) {
        var hitech=$(this).parent().parent().parent().find('h3>a').attr('href');
if(hitech.indexOf('hitech.vesti.ru')==-1){
            $(this).css({
                'background-image': 'url(data:image/gif;base64,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%3D)'
            });
            ev.preventDefault();
            ev.stopPropagation();

$.ajax({
url:$(this).parent().attr('href'),
dataType:'html',
data:{},
async:false,
success:function (a1) {
                var vid = $('.doc_photo_block', a1).find('a').data('vid');
                $.when(getVideo.open(vid)).done($('.video_ico_s').css({'background-image': 'url("http://www.vesti.ru/i/vid_ico_s.png")'}));
             }
        });
        }
      });
    },
    open: function (vid) {
        var leftvar = (screen.width - 800) / 2;
        var topvar = (screen.height - 700) / 2;
       window.open("http://www.vesti.ru/only_video.html?vid=" + vid, "\"" + vid + "\"", "width=770,height=600,left=" + leftvar + ",top=" + topvar + ",status=no,toolbar=no,menubar=no,resizable=1,autosize=1");
},
	replacer:function(){
		if(location.href.search(/only_video/ig)!=-1){
			var ifr=$('#big_video_wrap').find('iframe').eq(0).attr('src')
			location.href=ifr
			
		}
	}
}

if(location.href.search(/only_video/ig)!=-1){
$('#big_video_wrap').find('iframe').contents().find('body').ready(getVideo.replacer);
} else {$('document').ready(getVideo.grab);}