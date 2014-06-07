// ==UserScript==
// @name       TMD Video and Audio Linker
// @namespace  torrentsmd.com
// @version    5.0
// @description  Adauga video de pe Vimeo, Youtube si Audio Player de pe SoundCloud pe TMD
// @include     *torrentsmd.com/*
// @include     *torrentsmd.*/*
// @include     *torrentsmoldova.*/*
// @copyright   drakulaboy & TMD
// @updateURL   https://userscripts.org/scripts/source/145078.meta.js
// @downloadURL https://userscripts.org/scripts/source/145078.user.js
// @icon         http://s017.radikal.ru/i432/1308/7b/34fa18a96812.png
// ==/UserScript==
GM_addStyle(".markItUp .ragesmiles li:hover { background-color: none; border-color: #a79f72 }");
GM_addStyle(".markItUp .ragesmiles ul a { width: 40px; height: 40px; padding: 0; margin: 0; background-image: none }");
GM_addStyle(".markItUp .ragesmiles li { border: 1px solid #ece9d8; width: 40px; height: 40px; overflow: hidden; padding: 0; margin: 0; float: left }");
GM_addStyle(".markItUp .ragesmiles ul { width: 300px; padding: 1 } img { border: 0 }");
GM_addStyle('.youtube a {background-image: url(http://i.imgur.com/vkpW0v4.png) !important;}');
GM_addStyle('.Soundcloud a {background-image: url(http://i.imgur.com/WBIdKiT.jpg) !important;}');
GM_addStyle('.ragesmiles {background-image: url(http://i.imgur.com/kcu6Lzb.gif) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-1 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/aaaeee.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-2 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derpcry.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-3 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derpneutral.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-4 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derpthumb.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-5 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/foreveralone.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-6 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/ilied.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-7 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/mercurywin.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-8 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/pokerface.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-9 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/sweetjesusface.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-10 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/troll.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-11 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/areyoukiddingme.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-12 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derpgop.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-13 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derp.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-14 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derpwhy.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-15 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/fuckthatbitch.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-16 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/jackie.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-17 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/notbad.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-18 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/ragemega.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-19 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/thefuckgirl.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-20 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/truestory.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-21 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/cerealguy2.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-22 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derphappycry.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-23 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derprich.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-24 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/disappoint.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-25 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/likeaboss.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-26 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/numb.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-27 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/rage.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-28 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/thefuck.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-29 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/yuno.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-30 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/cerealguy.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-31 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derphappy.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-32 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derpsad.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-33 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/fap.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-34 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/gasp.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-35 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/megustamucho.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-36 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/ohgod.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-37 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/ragetext.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-38 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/trolldad.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-39 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/challenge.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-40 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derplol.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-41 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derpstare.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-42 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/foreveralonehappy.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-43 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/megusta.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-44 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/okay.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-45 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/stare.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-46 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/trollgirl.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-47 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/allthethings2.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-48 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/badass.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-49 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/cute.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-50 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derpsmile.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-51 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/herpderp.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-52 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/motherofgod.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-53 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/pokerface2.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-54 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/raptor.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-55 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/stoned.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-56 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/youdontsay.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-57 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/allthethings.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-58 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/computerstare.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-59 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/derpno.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-60 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/grin.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-61 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/isee.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-62 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/notokay.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-63 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/question.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-64 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/soclose.png) !important;}');
GM_addStyle('#markItUpPosttext > div > div.markItUpHeader > ul > li.markItUpButton.markItUpButton13.ragesmiles.markItUpDropMenu > ul > li.markItUpButton.markItUpButton13-65 a {background-image: url(http://www.torrentsmd.com/pic/ragesmilies/trollgay.png) !important;}');

jQuery(document).ready(function($){
    (function(){
        $.tmdBBCodes = function (o) {
            if (o && o.lang) message.lang = o.lang;
            var smiliesURL = 'pic/smilies/';
            var temp = [],
                i = 0,
                p = 0;
            temp[i] = '';
            var allTextAreas = "#posttext, form[action*='editpost'] textarea, form[action*='edit'] textarea, textarea[name='test'], textarea[name='msg'], textarea[name='body'], textarea[name='descr'], textarea.message";

            function init() {
                var fontsDropMenu = [],
                    fonts = ['Arial', 'Comic Sans MS', 'Courier New', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana', 'Symbol'];
                for (var i = 0; i < fonts.length; i++) {
                    fontsDropMenu.push({
                        name: fonts[i],
                        openWith: '[font=' + fonts[i] + ']',
                        closeWith: '[/font]'
                    });
                }
                tmdBbCodes = {
                    markupSet: [
                        {
                            name: 'Bold',
                            key: 'B',
                            className: 'bold',
                            openWith: '[b]',
                            closeWith: '[/b]'
                        },
                        {
                            name: 'Italic',
                            key: 'I',
                            className: 'italic',
                            openWith: '[i]',
                            closeWith: '[/i]'
                        },
                        {
                            name: 'Underline',
                            key: 'U',
                            className: 'underline',
                            openWith: '[u]',
                            closeWith: '[/u]'
                        },
                        {
                            name: 'Stroke',
                            className: 'stroke',
                            openWith: '[s]',
                            closeWith: '[/s]'
                        },
                        {
                            name: 'Font',
                            className: 'font',
                            openWith: '[font=[![Font]!]]',
                            closeWith: '[/font]',
                            dropMenu: fontsDropMenu
                        },
                        {
                            separator: ' '
                        },
                        {
                            name: 'Center Alignment',
                            className: 'center',
                            openWith: '[center]',
                            closeWith: '[/center]'
                        },
                        {
                            name: 'Right Alignment',
                            className: 'right',
                            openWith: '[right]',
                            closeWith: '[/right]'
                        },
                        {
                            name: 'Preformed text',
                            className: 'pre',
                            openWith: '[pre]',
                            closeWith: '[/pre]'
                        },
                        {
                            separator: ' '
                        },
                        {
                            name: 'Size',
                            key: 'S',
                            className: 'fonts',
                            openWith: '[size=[![' + message('size') + ']!]]',
                            closeWith: '[/size]',
                            dropMenu: [
                                {
                                    name: 'Size 1',
                                    openWith: '[size=1]',
                                    closeWith: '[/size]'
                                },
                                {
                                    name: 'Size 2',
                                    openWith: '[size=2]',
                                    closeWith: '[/size]'
                                },
                                {
                                    name: 'Size 3',
                                    openWith: '[size=3]',
                                    closeWith: '[/size]'
                                },
                                {
                                    name: 'Size 4',
                                    openWith: '[size=4]',
                                    closeWith: '[/size]'
                                },
                                {
                                    name: 'Size 5',
                                    openWith: '[size=5]',
                                    closeWith: '[/size]'
                                },
                                {
                                    name: 'Size 6',
                                    openWith: '[size=6]',
                                    closeWith: '[/size]'
                                },
                                {
                                    name: 'Size 7',
                                    openWith: '[size=7]',
                                    closeWith: '[/size]'
                                }
                            ]
                        },
                        {
                            name: 'Colors',
                            key: 'K',
                            className: 'colors',
                            openWith: '[color=[![Color]!]]',
                            closeWith: '[/color]',
                            dropMenu: [
                                {
                                    openWith: '[color=#FFFFFF]',
                                    closeWith: '[/color]',
                                    className: "col1-1"
                                },
                                {
                                    openWith: '[color=#CCCCCC]',
                                    closeWith: '[/color]',
                                    className: "col1-2"
                                },
                                {
                                    openWith: '[color=#999999]',
                                    closeWith: '[/color]',
                                    className: "col1-3"
                                },
                                {
                                    openWith: '[color=#666666]',
                                    closeWith: '[/color]',
                                    className: "col1-4"
                                },
                                {
                                    openWith: '[color=#333333]',
                                    closeWith: '[/color]',
                                    className: "col1-5"
                                },
                                {
                                    openWith: '[color=#000000]',
                                    closeWith: '[/color]',
                                    className: "col1-6"
                                },
                                {
                                    openWith: '[color=#FF3333]',
                                    closeWith: '[/color]',
                                    className: "col2-1"
                                },
                                {
                                    openWith: '[color=#FF0000]',
                                    closeWith: '[/color]',
                                    className: "col2-2"
                                },
                                {
                                    openWith: '[color=#CC0000]',
                                    closeWith: '[/color]',
                                    className: "col2-3"
                                },
                                {
                                    openWith: '[color=#990000]',
                                    closeWith: '[/color]',
                                    className: "col2-4"
                                },
                                {
                                    openWith: '[color=#660000]',
                                    closeWith: '[/color]',
                                    className: "col2-5"
                                },
                                {
                                    openWith: '[color=#330000]',
                                    closeWith: '[/color]',
                                    className: "col2-6"
                                },
                                {
                                    openWith: '[color=#FFFF99]',
                                    closeWith: '[/color]',
                                    className: "col3-1"
                                },
                                {
                                    openWith: '[color=#FFFF66]',
                                    closeWith: '[/color]',
                                    className: "col3-2"
                                },
                                {
                                    openWith: '[color=#FFCC33]',
                                    closeWith: '[/color]',
                                    className: "col3-3"
                                },
                                {
                                    openWith: '[color=#CC9933]',
                                    closeWith: '[/color]',
                                    className: "col3-4"
                                },
                                {
                                    openWith: '[color=#996633]',
                                    closeWith: '[/color]',
                                    className: "col3-5"
                                },
                                {
                                    openWith: '[color=#663333]',
                                    closeWith: '[/color]',
                                    className: "col3-6"
                                },
                                {
                                    openWith: '[color=#66FF66]',
                                    closeWith: '[/color]',
                                    className: "col4-1"
                                },
                                {
                                    openWith: '[color=#00FF00]',
                                    closeWith: '[/color]',
                                    className: "col4-2"
                                },
                                {
                                    openWith: '[color=#00CC00]',
                                    closeWith: '[/color]',
                                    className: "col4-3"
                                },
                                {
                                    openWith: '[color=#009900]',
                                    closeWith: '[/color]',
                                    className: "col4-4"
                                },
                                {
                                    openWith: '[color=#006600]',
                                    closeWith: '[/color]',
                                    className: "col4-5"
                                },
                                {
                                    openWith: '[color=#003300]',
                                    closeWith: '[/color]',
                                    className: "col4-6"
                                },
                                {
                                    openWith: '[color=#6666FF]',
                                    closeWith: '[/color]',
                                    className: "col5-1"
                                },
                                {
                                    openWith: '[color=#0000FF]',
                                    closeWith: '[/color]',
                                    className: "col5-2"
                                },
                                {
                                    openWith: '[color=#0000CC]',
                                    closeWith: '[/color]',
                                    className: "col5-3"
                                },
                                {
                                    openWith: '[color=#000099]',
                                    closeWith: '[/color]',
                                    className: "col5-4"
                                },
                                {
                                    openWith: '[color=#000066]',
                                    closeWith: '[/color]',
                                    className: "col5-5"
                                },
                                {
                                    openWith: '[color=#000033]',
                                    closeWith: '[/color]',
                                    className: "col5-6"
                                },
                                {
                                    openWith: '[color=#FF66FF]',
                                    closeWith: '[/color]',
                                    className: "col6-1"
                                },
                                {
                                    openWith: '[color=#FF33FF]',
                                    closeWith: '[/color]',
                                    className: "col6-2"
                                },
                                {
                                    openWith: '[color=#CC33CC]',
                                    closeWith: '[/color]',
                                    className: "col6-3"
                                },
                                {
                                    openWith: '[color=#993399]',
                                    closeWith: '[/color]',
                                    className: "col6-4"
                                },
                                {
                                    openWith: '[color=#663366]',
                                    closeWith: '[/color]',
                                    className: "col6-5"
                                },
                                {
                                    openWith: '[color=#330033]',
                                    closeWith: '[/color]',
                                    className: "col6-6"
                                }
                            ]
                        },
                        {
                            name: 'List item',
                            className: 'list',
                            openWith: '[*] ',
                            multilineSupport: true
                        },
						{
                            name: 'Smiles',
                            className: 'smiles',
                            openWith: function (h) {
                                h.textarea.id = h.textarea.id || h.textarea.name;
                                BBsmiles(h.textarea.id)
                            },
                            closeWith: '',
                            dropMenu: [
                                {
                                    name: 'smile',
                                    openWith: ':)'
                                },
                                {
                                    name: 'cry',
                                    openWith: ":'-("
                                },
                                {
                                    name: 'sad',
                                    openWith: ':('
                                },
                                {
                                    name: 'grin',
                                    openWith: ':D'
                                },
                                {
                                    name: 'confused',
                                    openWith: ':-/'
                                },
                                {
                                    name: 'w00t',
                                    openWith: ':w00t:'
                                },
                                {
                                    name: 'noexpression',
                                    openWith: ":|"
                                },
                                {
                                    name: 'acute',
                                    openWith: ':acute:'
                                },
                                {
                                    name: 'annoyed',
                                    openWith: ':annoyed:'
                                },
                                {
                                    name: 'look',
                                    openWith: ':look:'
                                },
                                {
                                    name: 'airkiss',
                                    openWith: ':airkiss:'
                                },
                                {
                                    name: 'alien',
                                    openWith: ":alien:"
                                },
                                {
                                    name: 'angel',
                                    openWith: ':angel:'
                                },
                                {
                                    name: 'beee',
                                    openWith: ':beee:'
                                },
                                {
                                    name: 'ras',
                                    openWith: ':ras:'
                                },
                                {
                                    name: 'blink',
                                    openWith: ':blink:'
                                },
                                {
                                    name: 'blush',
                                    openWith: ":blush:"
                                },
                                {
                                    name: 'boxing',
                                    openWith: ':boxing:'
                                },
                                {
                                    name: 'bye',
                                    openWith: ':bye:'
                                },
                                {
                                    name: 'down',
                                    openWith: ':down:'
                                },
                                {
                                    name: 'fie',
                                    openWith: ':fie:'
                                },
                                {
                                    name: 'fist',
                                    openWith: ":fist:"
                                },
                                {
                                    name: 'fun',
                                    openWith: ':fun:'
                                },
                                {
                                    name: 'geek',
                                    openWith: ':geek:'
                                },
                                {
                                    name: 'giveheart2',
                                    openWith: ':giveheart2:'
                                },
                                {
                                    name: 'heartbeat',
                                    openWith: ':heartbeat:'
                                },
                                {
                                    name: 'hmm',
                                    openWith: ":hmm:"
                                },
                                {
                                    name: 'hmmm',
                                    openWith: ':hmmm:'
                                },
                                {
                                    name: 'huh',
                                    openWith: ':huh:'
                                },
                                {
                                    name: 'ike',
                                    openWith: ':ike:'
                                }
                            ]
                        },
                        {
                            name: 'RageSmiles',
                            className: 'ragesmiles',
                            openWith: function (h) {
                                h.textarea.id = h.textarea.id || h.textarea.name;
                                BBsmiles(h.textarea.id)
                            },
                            closeWith: '',
                            dropMenu: [
                                {
                                    name: '',
                                    openWith: ':aaaeee:'
                                },
                                {
                                    name: '',
                                    openWith: ':derpcry:'
                                },
                                {
                                    name: '',
                                    openWith: ':derpneutral:'
                                },
                                {
                                    name: '',
                                    openWith: ':derpthumb:'
                                },
                                {
                                    name: '',
                                    openWith: ':foreveralone:'
                                },
                                {
                                    name: '',
                                    openWith: ':ilied:'
                                },
                                {
                                    name: '',
                                    openWith: ":mercurywin:"
                                },
                                {
                                    name: '',
                                    openWith: ':pokerface:'
                                },
                                {
                                    name: '',
                                    openWith: ':sweetjesusface:'
                                },
                                {
                                    name: '',
                                    openWith: ':troll:'
                                },
                                {
                                    name: '',
                                    openWith: ':areyoukiddingme:'
                                },
                                {
                                    name: '',
                                    openWith: ":derpgop:"
                                },
                                {
                                    name: '',
                                    openWith: ':derp:'
                                },
                                {
                                    name: '',
                                    openWith: ':derpwhy:'
                                },
                                {
                                    name: '',
                                    openWith: ':fuckthatbitch:'
                                },
                                {
                                    name: '',
                                    openWith: ':jackie:'
                                },
                                {
                                    name: '',
                                    openWith: ":notbad:"
                                },
                                {
                                    name: '',
                                    openWith: ':ragemega:'
                                },
                                {
                                    name: '',
                                    openWith: ':thefuckgirl:'
                                },
                                {
                                    name: '',
                                    openWith: ':truestory:'
                                },
                                {
                                    name: '',
                                    openWith: ':cerealguy2:'
                                },
                                {
                                    name: '',
                                    openWith: ":derphappycry:"
                                },
                                {
                                    name: '',
                                    openWith: ':derprich:'
                                },
                                {
                                    name: '',
                                    openWith: ':disappoint:'
                                },
                                {
                                    name: '',
                                    openWith: ':likeaboss:'
                                },
                                {
                                    name: '',
                                    openWith: ':numb:'
                                },
                                {
                                    name: '',
                                    openWith: ":rage:"
                                },
                                {
                                    name: '',
                                    openWith: ':thefuck:'
                                },
                                {
                                    name: '',
                                    openWith: ':yuno:'
                                },
                                {
                                    name: '',
                                    openWith: ':cerealguy:'
                                },
                                 {
                                    name: '',
                                    openWith: ':derphappy:'
                                },
                                 {
                                    name: '',
                                    openWith: ':derpsad:'
                                },
                                 {
                                    name: '',
                                    openWith: ':fap:'
                                },
                                 {
                                    name: '',
                                    openWith: ':gasp:'
                                },
                                 {
                                    name: '',
                                    openWith: ':megustamucho:'
                                },
                                {
                                    name: '',
                                    openWith: ':ohgod:'
                                },
                                    {
                                    name: '',
                                    openWith: ':ragetext:'
                                },
                                    {
                                    name: '',
                                    openWith: ':trolldad:'
                                },
                                    {
                                    name: '',
                                    openWith: ':challenge:'
                                },
                                    {
                                    name: '',
                                    openWith: ':derplol:'
                                },
                                    {
                                    name: '',
                                    openWith: ':derpstare:'
                                },
                                    {
                                    name: '',
                                    openWith: ':foreveralonehappy:'
                                },
                                    {
                                    name: '',
                                    openWith: ':megusta:'
                                },
                                    {
                                    name: '',
                                    openWith: ':okay:'
                                },
                                    {
                                    name: '',
                                    openWith: ':stare:'
                                },
                                    {
                                    name: '',
                                    openWith: ':trollgirl:'
                                },
                                    {
                                    name: '',
                                    openWith: ':allthethings2:'
                                },
                                    {
                                    name: '',
                                    openWith: ':badass:'
                                },
                                    {
                                    name: '',
                                    openWith: ':cute:'
                                },
                                    {
                                    name: '',
                                    openWith: ':derpsmile:'
                                },
                                    {
                                    name: '',
                                    openWith: ':herpderp:'
                                },
                                    {
                                    name: '',
                                    openWith: ':motherofgod:'
                                },
                                    {
                                    name: '',
                                    openWith: ':pokerface2:'
                                },
                                    {
                                    name: '',
                                    openWith: ':raptor:'
                                },
                                    {
                                    name: '',
                                    openWith: ':stoned:'
                                },
                                    {
                                    name: '',
                                    openWith: ':youdontsay:'
                                },
                                    {
                                    name: '',
                                    openWith: ':allthethings:'
                                },
                                    {
                                    name: '',
                                    openWith: ':computerstare:'
                                },
                                    {
                                    name: '',
                                    openWith: ':derpno:'
                                },
                                    {
                                    name: '',
                                    openWith: ':grin:'
                                },
                                    {
                                    name: '',
                                    openWith: ':isee:'
                                },
                                    {
                                    name: '',
                                    openWith: ':notokay:'
                                },
                                    {
                                    name: '',
                                    openWith: ':question:'
                                },
                                {
                                    name: '',
                                    openWith: ':soclose:'
                                },
                                {
                                    name: '',
                                    openWith: ':trollgay:'
                                },
                            ]
                        },
                        {
                            separator: ' '
                        },
                        {
                            name: 'Picture',
                            replaceWith: function (h) {
                                makeStaticMdPopup(h.textarea);
                                return '';
                            },
                            className: "picture", dropMenu: [
                            {
                                name: 'Upload',
                                replaceWith: function (h) {
                                    makeStaticMdPopup(h.textarea);
                                    return '';
                                },
                                className: "picture-upload"
                            },
                            {
                                name: 'Url',
                                key: 'P',
                                replaceWith: '[img][![Url]!][/img]',
                                className: "picture-url"
                            }
                        ]},
                        {
                            name: 'Iurl',
                            className: 'iurl',
                            openWith: '[iurl=[![Url]!]]{}',
                            closeWith: '[/iurl]',
                            placeHolder: 'TEXT'
                        },
                        {
                            name: 'Link',
                            key: 'L',
                            className: 'link',
                            openWith: '[url=[![Url]!]]',
                            closeWith: '[/url]',
                            placeHolder: message('link')
                        },
                        {
                            name: 'Anchor',
                            className: 'anchor',
                            openWith: '[anchor][![' + message('anchor') + ':]!][/anchor]'
                        },
                        {
                            name: 'Anchor Link',
                            className: 'anchor_lnk',
                            openWith: '[url=#[![' + message('anchor') + ':]!]]',
                            closeWith: '[/url]',
                            placeHolder: 'Numele linkului'
                        },
                        {
                            name: 'Youtube',
                            className: 'youtube',
                            openWith: '[video][![Link la video de pe Youtube sau Vimeo:]!]',
                            closeWith: '[/video]'
                        },
                        {
                            name: 'Soundcloud',
                            className: 'Soundcloud',
                            openWith: '[audio][![Soundcloud link:]!]',
                            closeWith: '[/audio]'
                        },
                        {
                            separator: ' '
                        },
                        {
                            name: 'Quotes',
                            openWith: '[quote]',
                            className: 'quote',
                            closeWith: '[/quote]'
                        },
                        {
                            name: 'Code',
                            openWith: '[code]',
                            className: 'code',
                            closeWith: '[/code]'
                        },
                        {
                            name: 'Spoiler',
                            openWith: '[spoiler=[![Spoiler name:]!]]',
                            className: 'spoiler',
                            closeWith: '[/spoiler]',
                            placeHolder: message('spoiler')
                        },
                        {
                            separator: ' '
                        },
                        {
                            name: 'Clean',
                            className: "clean",
                            replaceWith: function (markitup) {
                                return markitup.selection.replace(/\[(.*?)\]/g, "")
                            }
                        },
                        {
                            name: 'Undo',
                            key: 'Z',
                            className: "undo",
                            replaceWith: function (h) {
                                h.textarea.value = wLogBack(h.textarea.value)
                            }
                        },
                        {
                            name: 'Redo',
                            key: 'Y',
                            className: "redo",
                            replaceWith: function (h) {
                                h.textarea.value = wLogNext(h.textarea.value)
                            }
                        },
                        {
                            name: 'Preview',
                            className: "preview"
                        }
                    ]
                };

                $(allTextAreas).livequery(function () {
                    var $this = $(this);

                    // Distruge markItUp initiliazat anterior
                    if ($this.closest('.markItUp').length) {
                        $this.removeClass('markItUpEditor');
                        $this.closest('.markItUp').replaceWith($this);
                    }

                    $this.not('.markItUpEditor').markItUp(tmdBbCodes).show(1, function(){
                        markItUpStart();
                    });
                });
            }

            function myPreview(v, e) {
                var $t = $('textarea.markItUpEditor');
                if ($('#prv').length > 0 || $t.val().replace(/\[(.*?)\]/g, "").length < 1) return;
                var $dInfo, $ldngDiv;
                var t = $t.map(function () {
                    return {
                        w: $(this).width(),
                        h: $(this).height(),
                        c: $(this).offset()
                    }
                }).get(0);
                $(v).hide();
                $ldngDiv = $('<img/>', {
                    'src': 'pic/loading2.gif'
                }).css({
                        'margin-top': '3px'
                    }).insertAfter($(v));
                var val = $t.val();
                $.post("tags.php", {
                    'test': val
                }).then(function (data) {
                        var html = data.replace(/\n/g, '').replace(/.*<p><hr>/g, '').replace(new RegExp("<hr></p>.*", "g"), '');
                        html = '<td style="border: 0px; width: ' + t.w + 'px;">' + html + '</td>';
                        $prv = $('<div>', {
                            'id': 'prv'
                        }).css({
                                'width': t.w,
                                'height': t.h,
                                'left': t.c.left,
                                'top': t.c.top,
                                'text-align': 'left',
                                'position': 'absolute',
                                'z-index': '88',
                                'background-color': '#ece9d8',
                                'border': 'solid #A79F72 1px',
                                'display': 'none',
                                'padding': '5px',
                                'overflow-y': 'auto'
                            }).insertBefore($t.parents('div.markItUp')).fadeIn(300).html(html);
                        $ldngDiv.fadeOut(300, function () {
                            $dInfo = $('<div/>').html('<b>&nbsp;&nbsp;&nbsp;' + message('infopreview') + '</b>').hide();
                            $pUl = $(this).parents('ul').fadeOut(290).after($dInfo);
                            $dInfo.delay(300).fadeIn(600).delay(5000).fadeOut(300, hideHeader)
                        });
                        $prv.append('<script>initSpoilers(); initIurl(); </script>');
                        var hideHeader = function hideHeader() {
                            $ldngDiv.remove();
                            $dInfo.remove();
                            $pUl.fadeIn(300)
                        };
                        var hideAll = function hideAll() {
                            $prv.remove();
                            hideHeader();
                            $(v).show()
                        };
                        var hidePrv = function () {
                            $(document).one("click", function (e) {
                                if ($(e.target).parents('#prv').length > 0) {
                                    hidePrv()
                                } else {
                                    $prv.fadeOut(300, hideAll)
                                }
                            });
                            $(document).one("contextmenu", function (e) {
                                $prv.fadeOut(300, hideAll);
                                e.preventDefault()
                            })
                        };
                        hidePrv()
                    })
            }

            function BBsmiles(here) {
                $smilies = $('#smilies');
                if ($smilies.length) {
                    $smilies.show();
                    $(document).one('click', function () {
                        $smilies.hide()
                    });
                    return
                }
                var h = $('textarea.markItUpEditor').height();
                $iframe = $('<iframe>', {
                    'frameborder': '0',
                    'width': '180',
                    'height': (h + 11),
                    'src': './smilies_popup.php?text=&container=bbIframeSmilies&lang=ro'
                });
                $smilies = $('<div>', {
                    'id': 'smilies',
                    'style': 'position: absolute; z-index: 10001;top: 22px; right: -12px;'
                }).insertAfter($('.markItUpHeader')).append($iframe);
                $iframe.load(function () {
                    $iframe.contents().find("div, br, table tr:eq(0)").remove();
                    $iframe.contents().find("a").each(function () {
                        $img = $('img', this);
                        $img.attr('width', ($img.attr('width') > 40) ? 40 : $img.attr('width'));
                        $img.attr('height', ($img.attr('height') > 40) ? 40 : $img.attr('height'))
                    }).click(function (e) {
                            $.markItUp({
                                replaceWith: $(this).attr('href').replace(/.+IT\(\"/, '').replace(/\"\);/, '')
                            });
                            e.preventDefault();
                            $smilies.hide()
                        });
                    $(document).one('click', function () {
                        $smilies.hide()
                    })
                })
            }

            function wLogAdd(h) {
                if (temp[i] != h && h != "") {
                    i = i + 1;
                    p = i;
                    temp[i] = h
                }
            }

            function wLogBack(h) {
                if (p > 0) {
                    if (p == i) {
                        wLogAdd(h)
                    }
                    p = p - 1;
                    return temp[p]
                }
                if (p == 0) return temp[p];
                return ''
            }

            function wLogNext(h) {
                if (p + 1 <= i) {
                    p = p + 1;
                    return temp[p]
                }
                return h
            }

            function markItUpStart() {
                $(".markItUpEditor").keypress(function (e) {
                    wLogAdd(this.value)
                }).keydown(function (e) {
                        if (e.keyCode == 8 || e.keyCode == 46) {
                            wLogAdd(this.value)
                        }
                        if ((e.ctrlKey) && (e.keyCode == 86)) {
                            wLogAdd(this.value)
                        }
                    });
                $(".markItUpContainer ul li.preview a").click(function (e) {
                    myPreview($(this), e)
                });
                $(".markItUpContainer ul li.smiles ul li a").each(function () {
                    var sName = $(this).attr('title');
                    $(this).attr("style", 'background:url(' + smiliesURL + sName + '.gif)  no-repeat center center !important; padding: 0px;').text('').attr('title', '')
                });
                $('.markItUpContainer li.font ul li a').each(function (i, v) {
                    $(v).css('font-family', $(v).attr('title'))
                })
            }

            init();
        };

        $.tmdBBCodes();
    })();

    /**
     * Static.md
     */
    var makeStaticMdPopup = function(){};
    (function(){
        // Include required scripts
        if (window.StaticMdPopup === undefined) {
            $(document.getElementsByTagName('head')[0]).append('<script type="text/javascript" src="http://static.md/popup/popup.min.js"></script>');
        }

        // Add css
        if (!$('#static-md-css').length) {
            $(document.body).append("<style type=\"text/css\" id=\"static-md-css\">.markItUp .picture ul a {background-image:none} .static-md-popup{position:fixed;z-index:5000;-webkit-box-shadow:0 0 7px 3px #666;box-shadow:0 0 7px 3px #666}.static-md-popup .handle{padding:20px;background-color:#fff;cursor:move;position:relative}.static-md-popup .handle .handle-cover{position:absolute;top:0;right:0;bottom:0;left:0;background:rgba(255,255,255,0.2)}.static-md-popup .handle .close{display:block;position:absolute;right:2px;top:2px;height:16px;width:16px;background:url('http://static.md/b47afd340c463c6d09e574d7421f21ca.gif') no-repeat 0 0}.static-md-popup .static-md-popup-iframe{height:110px;width:350px}.static-md-popup .link-format{background-color:#eeebe3;border:1px solid #fff;padding:10px;text-align:center}.static-md-popup .link-format a{margin:0 15px;font-family:monospace;font-size:12px;color:#0C8AC8;text-decoration:none;padding:3px 5px}.static-md-popup .link-format a:hover{text-decoration:none}.static-md-popup .link-format a.selected{color:#ffffff;background-color:#0C8AC8}</style>")
        }

        // Păstrează toate instanțele popup-urilor
        var staticMdPopups = {};

        makeStaticMdPopup = function(textareaElement) {
            $textarea = $(textareaElement);

            var id = $textarea.attr('id');
            if (!id) { // genereaza unul nou daca textarea nu are id
                id = 'static-md-'+ (new Date()).getTime();
                $textarea.attr('id', id);
            }

            var proxyUrl    = 'http://torrentsmd.com/popup/proxy/'; // html5 functioneaza fara asta, pentru IE trebuie
            var defaultTop  = 25;
            var popupHeight = 150;
            var popupWidth  = 390;

            var getPopupTop = function(){
                var topExtra = $textarea.offset().top - $(window).scrollTop() + popupHeight;
                if (topExtra > 0 && topExtra < $(window).height() && topExtra > popupHeight) {
                    return defaultTop + topExtra - popupHeight;
                }
                return defaultTop;
            };

            if (staticMdPopups[id]) {
                staticMdPopups[id].getPopupElement().css({
                    top: getPopupTop()+'px',
                    left: parseInt($(window).width() / 2 - popupWidth / 2)+'px'
                })
            } else {
                staticMdPopups[id] = new StaticMdPopup({
                    textareaElement: $textarea,
                    proxyUrl: proxyUrl,
                    callbacks: {
                        changePopupHtml: function(html) {
                            var left = parseInt($(window).width() / 2 - popupWidth / 2);

                            html =
                                '<div class="static-md-popup" style="top: '+ defaultTop +'px; left: '+ left +'px;">'+
                                    '<div class="handle" title="Mișcă popup-ul">'+
                                        '<a href="#" class="close" title="Închide" onclick="return false;"></a>'+
                                        '<div class="handle-cover" style="display: none;"></div>'+
                                        '<div class="static-md-popup-iframe">{iframe}</div>'+
                                    '</div>'+
                                    '<div class="link-format" title="Format">'+
                                        '<input type="hidden" value="{link}"/>'+
                                        '<a href="#" data-link-format="[img]{link}[/img]\n" title="[img]{url}[/img]" onclick="return false;">[img]</a>'+
                                        '<a href="#" data-link-format="[url={link}][img]{link}[/img][/url]\n" title="[url={url}][img]{url}[/img][/url]" onclick="return false;">[url][img]</a>'+
                                        '<a href="#" data-link-format="{link}\n" title="{url}" onclick="return false;">url</a>'+
                                    '</div>'+
                                '</div>';
                            return html;
                        },
                        openPopup: function(instance) {
                            var el = instance.getPopupElement();

                            // prepare close button
                            $('.close:first', el).on('click', function(e){
                                e.preventDefault();
                                instance.close();
                            });
                            // fix top position
                            el.css('top', getPopupTop()+'px');

                            $(document.body).prepend(el);

                            // init change format
                            el.find('.link-format a').on('click', function(){
                                var $this = $(this);
                                var $container = $this.closest('.link-format');

                                $container.find('a').removeClass('selected');
                                $this.addClass('selected');
                                $container.find('input:first').val($this.attr('data-link-format'));
                            });
                            el.find('.link-format a:first').trigger('click');

                            // make dragable
                            (function(el){
                                var $element = el.closest('.static-md-popup');
                                var $handle  = el;
                                var shift = {
                                    x: 0,
                                    y: 0
                                };

                                function elementMove(e) {
                                    $('.handle-cover', $element).show();

                                    $element.css('left', e.clientX + shift.x + 'px');
                                    $element.css('top', e.clientY + shift.y + 'px');
                                }

                                function mouseUp() {
                                    $(window).off('mousemove', elementMove);
                                    $('.handle-cover', $element).hide();
                                }

                                function mouseDown(e) {
                                    shift.x = parseInt($element.css('left')) - e.clientX;
                                    shift.y = parseInt($element.css('top')) - e.clientY;

                                    mouseUp();
                                    $(window).on('mousemove', elementMove);

                                    e.preventDefault();
                                }

                                $handle.on('mousedown', mouseDown);
                                $(window).on('mouseup', mouseUp);
                            })(el.find('.handle:first'));
                        },
                        closePopup: function(instance) {
                            instance.getPopupElement().remove();
                            try {
                                delete staticMdPopups[id];
                            } catch (e) {};
                            staticMdPopups[id] = undefined;
                        },
                        changeImageLink: function(link) {
                            return staticMdPopups[id].getPopupElement().find('.link-format input').val().split('{link}').join(link);
                        }
                    }
                });
                staticMdPopups[id].open();
            }
        };
    })();
});