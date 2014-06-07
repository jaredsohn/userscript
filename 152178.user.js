// ==UserScript==
// @name           VK.com always HD
// @namespace      meh
// @description    Watch vk.com video in HD (default)
// @include        http://vk.com/*
// @include        http://*.vk.com/*
// @include        https://vk.com/*
// @include        https://*.vk.com/*
// @require     http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==


function append_control_element(){
    if (window.location.pathname == '/settings'){
        if (window.location.search==''){
            if ($(".always_hd_settings:visible").length <= 0){
                $("#settings_appearance").parent().after('<div class="settings_section clear_fix always_hd_settings"><h2>Настройки модуля AlwaysHD</h2><div class="settings_row_wrap clear_fix">' +
                    '<div class="settings_label fl_l ta_r">Качество</div><div class="settings_labeled fl_l">' +
                    '<select class="alwayshd_def_quality">' +
                    '<option value="3" '+ ((localStorage.getItem('alwayshd_quality')==3) ? 'selected' : '') +'>720</option>' +
                    '<option value="2" '+ ((localStorage.getItem('alwayshd_quality')==2) ? 'selected' : '') +'>480</option>' +
                    '<option value="1" '+ ((localStorage.getItem('alwayshd_quality')==1) ? 'selected' : '') +'>360</option>' +
                    '</select>' +
                    '</div></div>' +
                    '<div class="settings_label fl_l ta_r">Кнопка скачки песен</div><div class="settings_labeled fl_l">' +
                    '<select class="alwayshd_download_audio_button">' +
                    '<option value="1" '+ ((localStorage.getItem('alwayshd_download_audio')==1) ? 'selected' : '') +'>Вкл</option>' +
                    '<option value="0" '+ ((localStorage.getItem('alwayshd_download_audio')<1) ? 'selected' : '') +'>Выкл</option>' +
                    '</select>' +
                    '</div></div>' +
                    '</div>')
                $( ".alwayshd_def_quality" ).change(function() {
                    localStorage.setItem('alwayshd_quality', ($(this).val()));
                });
                $( ".alwayshd_download_audio_button" ).change(function() {
                    localStorage.setItem('alwayshd_download_audio', ($(this).val()));
                });
            }
        }
    }
}


$(document).ready(function () {

    setInterval(function(){append_control_element()},500);

    $(document).on("mouseenter", ".audio", function () {
        if (localStorage.getItem("alwayshd_download_audio") > 0) {
            audio = $(this).find(".play_btn_wrap");
            var the_url=audio.parent().find("input").val().split(/[?,]/)[0];
            var the_nam=audio.parent().parent().find('.title_wrap').text()+".mp3";

            $(this).append('<div the_url="'+the_url+'" the_nam="'+the_nam+'" class="download_audio" style="z-index:999; position: absolute; color: white; font-weight: bolder; background-color: #5f7e9d; right:4px; top:4px; cursor: pointer; width: 55px; border-radius: 4px; padding: 4px;">СКАЧАТЬ</div>');
            $('.download_audio').on("click", function () {
                $('body').append('<a id="fucking_url" href="'+$(this).attr('the_url')+'" download="'+$(this).attr('the_nam')+'">D</a>')
                document.getElementById('fucking_url').click();
                document.getElementById('fucking_url').remove();
                return false;
            })
        }
    })

    $(document).on("mouseleave", ".audio", function () {
        $(this).find(".download_audio").remove();
    })





    $(document).on("mouseover", "a[onclick*='showVideo'], a[onclick*='showInlineVideo'], a[onclick*='Video.show']", function () {
        if (!($(this).hasClass('already_done'))) {
            $(this).addClass('already_done')
            var my_attrs = $(this).attr('onclick')
            var video_arr = my_attrs.split("'")
            var video_id = video_arr[1]

            var block = $(this)
            str = "act=show&al=1&autoplay=0&module=&video=" + video_id
            $.ajax({
                type:"POST",
                url:'al_video.php',
                data:str,
                success:function (msg) {
                    var lines = msg.split("\n");
                    var numLines = lines.length;
                    for (i = 0; i < numLines; i++) {
                        var line = lines[i];
                        // hello
                        if ((line.indexOf("var vars") != -1)) {
                            arr = line.split(',')
                            for (y = 0; y < arr.length; y++) {
                                if ((arr[y].indexOf("\"hd\":") != -1)) {
                                    var hd = (parseInt(arr[y][5]))
                                    if (localStorage.getItem("alwayshd_quality") !== null) {
                                        hd = ((localStorage.getItem('alwayshd_quality')<=hd) ? localStorage.getItem('alwayshd_quality') : hd)
                                    }
                                    var new_onclick = "return showVideo('" + video_id + "', 0, {params: {act: 'show', video: '" + video_id + "', list: 0, autoplay: 1, module: cur.module, force_hd: '" + hd + "'}, hideInfo: 0}, event);"
                                    block.attr('onclick', new_onclick)
                                    block.addClass('already_done')
                                    ////DEBUGING
                                }
                            }
                        }
                    }
                }
            });
        }

    })
})