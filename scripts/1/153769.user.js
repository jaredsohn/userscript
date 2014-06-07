(function ()
{
var fileMETA=new Array(); 
// ==UserScript==
// @name                   gifyo enhanced
fileMETA["name"] =        'gifyo enhanced';
// @description            enhances gifyo by changing the live layout, allowing more images, and auto animates them
fileMETA["description"] = 'enhances gifyo by changing the live layout, allowing more images, and auto animates them';
// @details                enhances gifyo by changing the live layout, allowing more images, and auto animates them
fileMETA["details"] =     'enhances gifyo by changing the live layout, allowing more images, and auto animates them';
// @namespace              fake://gifyo/tools/gmscripts/
fileMETA["@namespace"]=    'fake://gifyo/tools/gmscripts/';
// @version                20121210
fileMETA["version"]=      '20121210';
// @license                GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)
fileMETA["license"] =     'GPL version 3 or any later version (http://www.gnu.org/copyleft/gpl.html)';
fileMETA["author"] = 'Ellipsis (fake://gifyo/tools/gmscripts/)';
// @contributor            Ellipsis (fake://gifyo/tools/gmscripts/)
fileMETA["contributor"] = 'Ellipsis (fake://gifyo/tools/gmscripts/)';
// @updatemetaurl              fake://gifyo/tools/gmscripts/gifyo_enhanced.meta.js
fileMETA["@updatemetaurl"] =  'fake://gifyo/tools/gmscripts/gifyo_enhanced.meta.js';
// @updateurl                  fake://gifyo/tools/gmscripts/gifyo_enhanced.user.js
fileMETA["@updateurl"] =       'fake://gifyo/tools/gmscripts/gifyo_enhanced.user.js';

// @include        http://gifyo.com/*
// @include        http://www.gifyo.com/*
// @include        https://gifyo.com/*
// @include        https://www.gifyo.com/*
// @exclude        *phpMyAdmin*
// ==/UserScript==


$urldata = String(window.location).match(/https?:\/\/(?:www\.)?gifyo\.com\/([^\/]*)\/?/i);
if($urldata)
{
    if ($urldata[1].toLowerCase() != 'live')
    {
        var script = document.createElement('script'); 
        script.type = "text/javascript"; 
        script.innerHTML = "function animateImages() {\n   $(\"#list\").stop(true,true);\n   $('.gif-link img').each(function(index) {\n       if (this.src.match(/_s.gif$/))\n       {\n         this.setAttribute(\"onmouseout\", \"\");\n         $(this).mouseover();\n       }\n    });\n    window.setTimeout('animateImages()', 1500);\n}\nanimateImages();";
        document.getElementsByTagName('body')[0].appendChild(script);
    }
    else
    {
        var script = document.createElement('script'); 
        script.type = "text/javascript"; 
        script.innerHTML = "function refreshLiveList(changeLayout) {\n\tif (xhr) xhr.abort();\n\tclearTimeout(timeoutVar);\n    $(\"#list\").stop(true,true);\n    \n    $('#list').find('.gif-link img').each(function(index) {\n       if (this.src.match(/_s.gif$/))\n       {\n         this.setAttribute(\"onmouseout\", \"\");\n         $(this).mouseover();\n       }\n    });    \n    \n\tif ($('#list').data('state') == 'Pause' && changeLayout != 1) {\n\t\ttimeoutVar = window.setTimeout('refreshLiveList()', 1500);\n\t\treturn false;\n\t}\n \n\t$.each($('#list .before'), function(){\n\n\t\t$(this).attr(\"data-sec\",( parseInt($(this).attr(\"data-sec\"))+3));\n\t\ttime = secondsToTime($(this).attr(\"data-sec\"));\n\t\tif (time.h)\n\t\t\t$(this).text(time.h+'hr ago');\n\t\telse if (time.m)\n\t\t    $(this).text(time.m+'min ago');\n\t\telse\n\t\t    $(this).text(time.s+'sec ago');\n\t\t\n\t});\n\t\n\txhr = $.post('/live/', {cmd:'refreshLiveData', changeLayout: changeLayout, lastId:$('#list .action').eq(0).attr(\"id\"), layout: $('#list').data('layout')}, function(data) {\n\n\t\ttimeoutVar = window.setTimeout('refreshLiveList()', 1500);\n\t\tif (data)\n\t\t{\n\t\t\tif (changeLayout) {\n\t\t\t\t\n\t\t\t\t$('#list').find('.action').remove();\n\t\t\t\t$('#list').removeClass(\"grid\");\n\t\t\t\tif ($('#list').data('layout') == 'grid') $('#list').addClass('grid');\n\t\t\t\t\n\t\t\t\t$('#list').prepend(data).find('.action').hide().fadeIn('slow');\n\t\t\t}\n\t\t\telse {\n\n    \t\t\t$('#list').prepend(data);\n                $('#list').find('.gif-link img').eq('0').attr(\"onmouseout\", \"\");\n                $('#list').find('.gif-link img').eq('0').mouseover();\n                $('#countDiv').html('(' + $('#list').find('.action').length.toString() + ' gifs)');\n                $(document).attr(\"title\", \"GIFYO \" + $('#countDiv').html());\n    \t\t\t$('#list').find('.action').eq('499').remove();\n\t\t\t}\n\t\t\tbindPause()\n\t\t}\n\t});\n}\n$('#sidebar').hide();\n$('#footer').hide();\n$('#content .container').css(\"position\", \"absolute\"); \n$('#content .container').css(\"width\", \"100%\"); \n$('.shell').css(\"width\", \"100%\"); \n$('#main').css(\"width\", \"95%\"); \n$('#content .profile.grid').css(\"width\", \"100%\"); \n\n\n\nvar countDiv = window.document.createElement( 'span' ); \ncountDiv.innerHTML = '';\ncountDiv.style.opacity = '0.9';\ncountDiv.style.marginLeft = '10px';\ncountDiv.id = 'countDiv';\ncountDiv.style.font = '10px Arial, Helvetica, sans-serif';\n$('#content .header h2').append(countDiv);\n$('#countDiv').html('(' + $('#list').find('.action').length.toString() + ' gifs)');";
        document.getElementsByTagName('body')[0].appendChild(script);
    }
}


})();