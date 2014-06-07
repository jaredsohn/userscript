// ==UserScript==
// @name         bbdl
// @description  Adds download links to Bangbros
// @match        http://new.bangbros.com/*
// @match        http://new.bangbros.com/videos/*.htm
// @match        http://downloads.members.bangbros.com/*
// @match        http://downloads.members.bangbros.com/t1/intro?s=ls12004
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

$(function()
{
    bbdl_add_controls();
    bbdl_add_links();
});

function bbdl_add_links()
{
    if(window.location.href.match(/videos\/.+\.htm/))
    {
        console.log('http://new.bangbros.com/videos/*.htm');
        $('.download-btn').attr('href', bbdl_from_videolink(videoLink));
    }
    else if(window.location.href.match(/t1\/intro\?s=.+/))
    {
        console.log('http://downloads.members.bangbros.com/t1/intro?s=*');
        $('#wholevideo').attr('href', bbdl_from_videolink(jwplayer("player").config.file)).find('b').text('Click here to download this episode');
    }
    else if(window.location.href.match(/new\.bangbros\.com/))
    {
        thumbs = $('.vl-thumb-img');
        $(thumbs).each(function(i, el)
        {
            url = bbdl_from_thumb($(this).find('img').attr('src'));
            if($(this).siblings('.bbdl').length)
            {
                $(this).siblings('.bbdl').find('a').attr('href', url);
            }
            else
            {
                addedon = $(this).siblings('.vl-desc:not(:has(a))');
                addedon.addClass('bbdl');
                $('<a class="download" href="' + url + '" style="float: right;">Download</a>').appendTo(addedon);
            }
        });
    }
    else if(window.location.href.match(/downloads\.members\.bangbros\.com/))
    {
        thumbs = $('.img_href_1');
        $(thumbs).each(function(i, el)
        {
            url = bbdl_from_thumb($(this).attr('src'));
            if($(this).parent().siblings().find('.bbdl').length)
            {
                $(this).parent().siblings().find('.bbdl').find('a').attr('href', url);
            }
            else
            {
                addedon = $(this).parent().siblings().find('.gp2:not(:has(a))');
                addedon.addClass('bbdl').text(addedon.text().substring(7));
                $('<a class="download" href="' + url + '" style="float: right;">Download</a>').appendTo(addedon);
            }
        });
    }
}

function bbdl_from_thumb(url)
{
    matches = bbdl_get_matches(url);
    return 'http://' + GM_getValue('bbdl_pass', 'user:pass') + '@' + matches[1] + '.members.bangbros.com/membercheck?path=' + matches[3] + '/streaming/&fname=' + matches[3] + '_' + GM_getValue('bbdl_quality', '800') + '.mp4';
}

function bbdl_from_videolink(url)
{
    matches = bbdl_get_matches(url);
    return 'http://' + GM_getValue('bbdl_pass', 'user:pass') + '@' + matches[1] + '.members.bangbros.com/membercheck?path=' + matches[2] + '/streaming/&fname=' + matches[2] + '_' + GM_getValue('bbdl_quality', '800') + '.mp4';
}

function bbdl_get_matches(url)
{
    matches = url.match(/\/([^\/]+)/g);
    for(i in matches) matches[i] = matches[i].substring(1);
    return matches;
}

function bbdl_add_controls()
{
    control_container = $('<div style="position: fixed; top: 0; right: 0; z-index: 10000;" />').appendTo('body');

    control_input = $('<input value="' + GM_getValue('bbdl_pass', 'user:pass') + '" />').appendTo(control_container);
    control_input.change(bbdl_save_pass);
    control_input.keyup(bbdl_save_pass);
    control_input.mouseup(bbdl_save_pass);

    control_select = $('<select />').append('<option>3000</option>').append('<option>1500</option>').append('<option>800</option>').appendTo(control_container);
    control_select.find('option:contains(' + GM_getValue('bbdl_quality', '800') + ')').prop('selected', true);
    control_select.change(bbdl_save_quality);
    control_select.keyup(bbdl_save_quality);
    control_select.mouseup(bbdl_save_quality);
}

function bbdl_save_pass()
{
    GM_setValue('bbdl_pass', $(this).val());
    bbdl_add_links();
}

function bbdl_save_quality()
{
    GM_setValue('bbdl_quality', $(this).find('option:selected').text());
    bbdl_add_links();
}