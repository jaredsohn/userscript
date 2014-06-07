// ==UserScript==
// @name              小组首页查看器
// @namespace         http://www.douban.com/people/3928484/
// @description       小组首页
// @include           www.douban.com/group/*
// @author            matt
// @version           1.0
// ==/UserScript==
if (location.href == "http://www.douban.com/group/") {
	$('.aside').prepend("</br>")
    $('.aside').prepend("<select id=\"doubangroup\"></select>")
    $('.aside').prepend("<h2>小组首页查看 &nbsp; &middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;</h2>")
    $('#doubangroup').append("<option value=\"/group/\">我所在的小组的话题更新</option>");
    var indx = GM_getValue("doubangourpIndx") || "";
    $.get("http://www.douban.com/group/mine", function(html){
        $(html).find('dt').each(function(){
            var v = $(this).find('a').attr('href');
            var n = $(this).find('img').attr('alt');
            if (indx.indexOf(v) >= 0 || indx == "") {
                $('#doubangroup').append("<option value=\"" + v + "\">" + n + "</option>");
            }
        })
    })
    $('#doubangroup').change(function(){
        var url = "http://www.douban.com/" + $(this).attr("value");
        var crt = $(this)[0].selectedIndex;
        $('.article').find('h2').html($(this)[0].options[crt].text + " &nbsp; &middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;&middot;&nbsp;")
        $.get(url, function(html){
            $('.olt').replaceWith($(html).find('.olt'))
        })
    })
}

if (location.href == "http://www.douban.com/group/mine") {

    var indx = GM_getValue("doubangourpIndx") || "";
    $('dd').each(function(cnt){
        var gid = $(this).find('a').attr('href');
        if (indx.indexOf(gid) >= 0) {
            $(this).css({
                'background-color': "orange",
            })
        }
    });
    $('dd').click(function(){
        var indx = GM_getValue("doubangourpIndx") || "";
        var gid = $(this).find('a').attr('href');
        if (indx.indexOf(gid) >= 0) {
            $(this).css({
                'background-color': "#fff",
            })
            GM_setValue("doubangourpIndx", indx.replace(gid + ",", ""))
        }
        else {
            $(this).css({
                'background-color': "orange",
            })
            GM_setValue("doubangourpIndx", indx + gid + ",")
        }
    })
}
