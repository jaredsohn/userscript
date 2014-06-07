// ==UserScript==
// @name           Go NicoSound Link
// @version        1.0
// @namespace      http://vocaloid.vnsharing.net/
// @source         http://userscripts.org/scripts/show/175847
// @description    Add NicoSound's link into a video page of NicoVideo. The added link is at next to Video Title, in detail-info.
// @include        http://*.nicovideo.jp/watch/*
// @include        http://www.nicovideo.jp/watch/*
// author          jofori89
// ==/UserScript==
$ = unsafeWindow.jQuery;

// Add Nicosound link for current video
$('body').ready(function () {
		// Generate URL of NicoSound
		var url = window.location.href;
		url = url.replace("http://www.nicovideo.jp/watch/", "http://nicosound.anyap.info/sound/");
		if(url.indexOf("?") != -1){
			url = url.substring(0, url.indexOf("?"));
		}	
		var list = '<li style="margin-right:5px;"><a href="' + url + '">NicoSound</a></li>';		
		var title = '</span><br /><span style="margin-left:15px; font-size:16px;"><a target="_blank" href="' + url + '">NicoSound</a></span>';
		$(title).appendTo('h2');		
		$(list).appendTo('.videoStats'); 
        $(list).appendTo('#videoStats');        
});

// Add Nicosound link next to thumbnails videos after clicked View more
$(".open").click(function () {
    $(".contentItemList").ready(function () {
        console.log('loaded thumb');
        $('.contentItemList > li > div').each(function (index) {            
            var link = $(this).find('.thumbnailContainer .link').attr('href');
            console.log(link);
            link = link.replace("http://www.nicovideo.jp/watch/", "http://nicosound.anyap.info/sound/");
            console.log(link);
            link = '<a href="' + link +'" target="_blank" style="color:black; margin-top:5px; margin-bottom:5px; font-weight:bold;" >Nicosound</a>';
            console.log(link);
            console.log('========'); 
            /* ---  Not working*/
            //$(this).append(link);
            $(link).appendTo(this);
        });
    });
});