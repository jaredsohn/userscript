// ==UserScript==
// @name R+
// @namespace http://plug-dj.xpdev-hosted.com
// @description Rouming (http://rouming.cz) R+ account enhancements on plug.dj (http://plug.dj)
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js
// @include *plug.dj/roumenu-v-pa-tec-ni-jukebox/*
// @version 0.9
// @author Jirka
// ==/UserScript==
var $$ = jQuery.noConflict();
$$(document).ready(function ()
{
    $$.getScript('http://plug-dj.xpdev-hosted.com/js/bgs.js', function ()
    {
        var hidden = false;
        var autochat = false;
        var automsg = null;
        var autowoot = false;
        var dj = null;
        var bgs_index = 0;
        API.addEventListener(API.DJ_ADVANCE, function (obj)
        {
            if (hidden)
            {
                $$('#yt-frame').toggle();
            }

            if (obj == null) return;
            dj = obj.dj.username;
            console.log("DJ: " + dj);
        });
        API.addEventListener(API.USER_JOIN, function (user)
        {
            if (autochat && dj == Models.user.data.username && automsg.length > 0)
            {
                API.sendChat('@' + user.username + ' ' + automsg);
                console.log('@' + user.username + ' ' + automsg);
            }
        });

        $$('#room-wheel').hide();
        $$('body').css('background', '#0A3B69').css('background-image', 'url(' + rouming_bgs[bgs_index] + ')');
        $$('div.frame-background').css('background-color', '#032444');

        var widget = $$('<div id="rouming_widget" style="background-color: #0A3B69;cursor: move; position:absolute; top:auto; left:2em; z-index:999"></div>')
            .draggable()
            .append('<p><strong>Rouming R+ account</strong></p>')
            .append('<input id="rouming_theme_button" type="button" value="Change theme" />')
            .append('<br />')
            .append('<input id="rouming_video_button" type="checkbox" /><label for="rouming_video_button">Hide video</label>')
            .append('<br />')
            .append('<input id="rouming_autochat_button" type="checkbox" /><label for="rouming_autochat_button">Autochat</label>')
            .append('<br />')
            .append('<div id="rouming_autochat_div"><label for="rouming_autochat_input">Msg:</label><input id="rouming_autochat_input" type="text" /></div>')
            .append('<br />');
        //.append('<input id="rouming_autowoot_button" type="checkbox" /><label for="rouming_autowoot_button">Autowoot</label>')
        $$("body").append(widget);
        $$('#rouming_autochat_div').toggle();

        $$('#rouming_theme_button')
            .button()
            .click(function ()
            {
                bgs_index++;
                bgs_index = bgs_index % rouming_bgs.length;
                $$('body').css('background-image', 'url(' + rouming_bgs[bgs_index] + ')');
            });
        $$('#rouming_video_button')
            .button()
            .click(function ()
            {
                hidden = !hidden;
                $$('#yt-frame').toggle();
            });
        $$('#rouming_autochat_button')
            .button()
            .click(function ()
            {
                autochat = !autochat;
                $$('#rouming_autochat_div').toggle();
            });
        $$('#rouming_autochat_input').keyup(function ()
        {
            automsg = $(this).val();
        }).keyup();

        $$('#rouming_autowoot_button')
            .button()
            .click(function ()
            {
                autowoot = !autowoot;
                if (autowoot)
                {
                    $$('#button-vote-positive').click();
                    API.addEventListener(API.DJ_ADVANCE, function ()
                    {
                        $$('#button-vote-positive').click();
                    });
                } else
                {
                    API.removeEventListener(API.DJ_ADVANCE, function ()
                    {
                    });
                }
            });
    });
});
