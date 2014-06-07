// ==UserScript==
// @name        VkAudioDown
// @namespace   http://www.meat-loaf.ru/
// @version     0.1
// @description enter something useful
// @include     http://vk.com/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @copyright   2013+, tarasenkoas
// ==/UserScript==

var iter = 0
var count = 0

setInterval(function(){
    if (!$(".audio .play_btn input[VkAudioDown!='processed']").length) {
        return
    }
    iter++
    console.log('VkAudioDown: iteration ' + iter + '..')
    $("#audios_list").css("margin-left", "15px")
    count = 0
    $(".audio .play_btn").each(function(){
        var url = $(this).find("input[VkAudioDown!='processed']").attr('VkAudioDown','processed').attr('value')
        if (url) {
            count++
            url = /^.+mp3/.exec(url)[0]
            $(this).prepend('<a class="VkAudioDown_down_link" href="'+url+'" style="position: absolute; left: -20px; width: 20px; height: 34px; padding: 8px 0 0 0;">[↓]</a>')
            console.log(url)
        }
    })
    console.log('VkAudioDown: processed ' + count + ' new items this iteration..')
},1000)

$('#top_nav').prepend('<div id="VkAudioDown_info" style="position: absolute; left: -30px; top: 10px; width: 20px; height: 20px; cursor: pointer">[...]</div>').find('#VkAudioDown_info').click(function(){
    VkAudioDown_info_box_destroy()
    var urls = '';
    $('.VkAudioDown_down_link').each(function(){
        urls += this.href + "\n"
    })

    $('body').prepend('<div id="VkAudioDown_info_box" style="z-index: 99999; border: 1px silver dashed; padding: 1em; margin: 1em; background: #fff; position: fixed; margin: 2em; box-shadow: 0 0 10px rgba(0,0,0,0.5);"><a href="#" id="VkAudioDown_info_box_close_btn" style="color: #c00; margin: 0 0 1em 0; display: block; float: right;">[close]</a><br/><textarea style="margin: 0px; height: 311px; width: 425px;">'+urls+'</textarea></div>')
    $("#VkAudioDown_info_box_close_btn").click(function(){
        VkAudioDown_info_box_destroy()
    })
})

function VkAudioDown_info_box_destroy() {
    $("#VkAudioDown_info_box").remove()
}
