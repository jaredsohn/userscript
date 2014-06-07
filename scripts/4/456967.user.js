// ==UserScript==
// @name                Ukrpravda.net phorum theme
// @namespace	        http://github.com/wity/ukrpravda-phorum-theme
// @description	        phorum theme for ukrpravda.net forum
// @include		        http://ukrpravda.net/*
// @include		        http://www.ukrpravda.net/*
// @require             http://code.jquery.com/jquery-1.11.0.min.js
// @require             http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js
// @run-at         		document-start
// @grant       none
// @version       0.2
// ==/UserScript==

/*!
* jQuery Cookie Plugin v1.4.0
* https://github.com/carhartl/jquery-cookie
*
* Copyright 2013 Klaus Hartl
* Released under the MIT license
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch (e) { }
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setTime(+t + days * 864e+5);
            }

            return (document.cookie = [
            encode(key), '=', stringifyCookieValue(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {};

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all. Also prevents odd result when
        // calling $.cookie().
        var cookies = document.cookie ? document.cookie.split('; ') : [];

        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');

            if (key && key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return false;
        }

        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));


/*! WysiBB v1.5.1 2014-03-26 
    Author: Vadim Dobroskok
 */
if (typeof (WBBLANG) == "undefined") { WBBLANG = {}; }
WBBLANG['en'] = CURLANG = {
    bold: "Bold",
    italic: "Italic",
    underline: "Underline",
    strike: "Strike",
    link: "Link",
    img: "Insert image",
    sup: "Superscript",
    sub: "Subscript",
    justifyleft: "Align left",
    justifycenter: "Align center",
    justifyright: "Align right",
    table: "Insert table",
    bullist: "• Unordered list",
    numlist: "1. Ordered list",
    quote: "Quote",
    offtop: "Offtop",
    code: "Code",
    spoiler: "Spoiler",
    fontcolor: "Font color",
    fontsize: "Font size",
    fontfamily: "Font family",
    fs_verysmall: "Very small",
    fs_small: "Small",
    fs_normal: "Normal",
    fs_big: "Big",
    fs_verybig: "Very big",
    smilebox: "Insert emoticon",
    video: "Insert YouTube",
    removeFormat: "Remove Format",

    modal_link_title: "Insert link",
    modal_link_text: "Display text",
    modal_link_url: "URL",
    modal_email_text: "Display email",
    modal_email_url: "Email",
    modal_link_tab1: "Insert URL",

    modal_img_title: "Insert image",
    modal_img_tab1: "Insert URL",
    modal_img_tab2: "Upload image",
    modal_imgsrc_text: "Enter image URL",
    modal_img_btn: "Choose file",
    add_attach: "Add Attachment",

    modal_video_text: "Enter the URL of the video",

    close: "Close",
    save: "Save",
    cancel: "Cancel",
    remove: "Delete",

    validation_err: "The entered data is invalid",
    error_onupload: "Error during file upload",

    fileupload_text1: "Drop file here",
    fileupload_text2: "or",

    loading: "Loading",
    auto: "Auto",
    views: "Views",
    downloads: "Downloads",

    //smiles
    sm1: "Smile",
    sm2: "Laughter",
    sm3: "Wink",
    sm4: "Thank you",
    sm5: "Scold",
    sm6: "Shock",
    sm7: "Angry",
    sm8: "Pain",
    sm9: "Sick"
};
WBBLANG['ua'] = {
    bold: "Напівжирний",
    italic: "Курсив",
    underline: "Підкреслений",
    strike: "Закреслений",
    link: "Посилання",
    img: "Зображення",
    sup: "Надрядковий текст",
    sub: "Підрядковий текст",
    justifyleft: "Текст по лівому краю",
    justifycenter: "Текст по центру",
    justifyright: "Текст по правому краю",
    table: "Вставити таблицу",
    bullist: "Звичайний список",
    numlist: "Нумерований список",
    quote: "Цитата",
    offtop: "Оффтоп",
    code: "Код",
    spoiler: "Текст, який згортається",
    fontcolor: "Колір тексту",
    fontsize: "Розмір тексту",
    fontfamily: "Шрифт тексту",
    fs_verysmall: "Дуже маленький",
    fs_small: "Маленький",
    fs_normal: "Нормальний",
    fs_big: "Великий",
    fs_verybig: "Дуже великий",
    smilebox: "Вставити смайл",
    video: "Вставити відео",
    removeFormat: "Видалити форматування",

    modal_link_title: "Вставити посилання",
    modal_link_text: "Видимий текст",
    modal_link_url: "URL посилання",
    modal_email_text: "Ел. адреса, яка відображатиметься",
    modal_email_url: "Email",
    modal_link_tab1: "Вставити URL",

    modal_img_title: "Вставити зображення",
    modal_img_tab1: "Ввести URL",
    modal_img_tab2: "Завантажити файл",
    modal_imgsrc_text: "Введіть адрес зображення",
    modal_img_btn: "Виберіть файл для завантаження",
    add_attach: "Додати вкладений файл",

    modal_video_text: "Введіть URL відео",

    close: "Закрити",
    save: "Зберегти",
    cancel: "Відміна",
    remove: "Видалити",

    validation_err: "Введенні дані некоректні",
    error_onupload: "Помилка під час завантаження файлу або таке розширення файла не підтримується",

    fileupload_text1: "Перетягніть файл сюди",
    fileupload_text2: "або",

    loading: "Завантаження",
    auto: "Авто",
    views: "Переглядів",
    downloads: "Завантажень",

    //smiles
    sm1: "Посмішка",
    sm2: "Сміх",
    sm3: "Подморгування",
    sm4: "Дякую, клас",
    sm5: "Сварю",
    sm6: "Шок",
    sm7: "Злий",
    sm8: "Засмучення",
    sm9: "Нудить"
};
wbbdebug = true;
(function ($) {
    'use strict';
    $.wysibb = function (txtArea, settings) {
        $(txtArea).data("wbb", this);

        if (settings && settings.deflang && typeof (WBBLANG[settings.deflang]) != "undefined") { CURLANG = WBBLANG[settings.deflang]; }
        if (settings && settings.lang && typeof (WBBLANG[settings.lang]) != "undefined") { CURLANG = WBBLANG[settings.lang]; }
        this.txtArea = txtArea;
        this.$txtArea = $(txtArea);
        var id = this.$txtArea.attr("id") || this.setUID(this.txtArea);
        this.options = {
            bbmode: false,
            onlyBBmode: false,
            themeName: "default",
            bodyClass: "",
            lang: "ru",
            tabInsert: true,
            //			toolbar:			false,
            //img upload config 
            imgupload: false,
            img_uploadurl: "/iupload.php",
            img_maxwidth: 800,
            img_maxheight: 800,
            hotkeys: true,
            showHotkeys: true,
            autoresize: true,
            resize_maxheight: 800,
            loadPageStyles: true,
            traceTextarea: true,
            //			direction:			"ltr",
            smileConversion: true,

            //END img upload config 
            buttons: "bold,italic,underline,strike,sup,sub,|,img,video,link,|,bullist,numlist,|,fontcolor,fontsize,fontfamily,|,justifyleft,justifycenter,justifyright,|,quote,code,table,removeFormat",
            allButtons: {
                bold: {
                    title: CURLANG.bold,
                    buttonHTML: '<span class="fonticon ve-tlb-bold1">\uE018</span>',
                    excmd: 'bold',
                    hotkey: 'ctrl+b',
                    transform: {
                        '<b>{SELTEXT}</b>': "[b]{SELTEXT}[/b]",
                        '<strong>{SELTEXT}</strong>': "[b]{SELTEXT}[/b]"
                    }
                },
                italic: {
                    title: CURLANG.italic,
                    buttonHTML: '<span class="fonticon ve-tlb-italic1">\uE001</span>',
                    excmd: 'italic',
                    hotkey: 'ctrl+i',
                    transform: {
                        '<i>{SELTEXT}</i>': "[i]{SELTEXT}[/i]",
                        '<em>{SELTEXT}</em>': "[i]{SELTEXT}[/i]"
                    }
                },
                underline: {
                    title: CURLANG.underline,
                    buttonHTML: '<span class="fonticon ve-tlb-underline1">\uE002</span>',
                    excmd: 'underline',
                    hotkey: 'ctrl+u',
                    transform: {
                        '<u>{SELTEXT}</u>': "[u]{SELTEXT}[/u]"
                    }
                },
                strike: {
                    title: CURLANG.strike,
                    buttonHTML: '<span class="fonticon fi-stroke1 ve-tlb-strike1">\uE003</span>',
                    excmd: 'strikeThrough',
                    transform: {
                        '<strike>{SELTEXT}</strike>': "[s]{SELTEXT}[/s]",
                        '<s>{SELTEXT}</s>': "[s]{SELTEXT}[/s]"
                    }
                },
                sup: {
                    title: CURLANG.sup,
                    buttonHTML: '<span class="fonticon ve-tlb-sup1">\uE005</span>',
                    excmd: 'superscript',
                    transform: {
                        '<sup>{SELTEXT}</sup>': "[sup]{SELTEXT}[/sup]"
                    }
                },
                sub: {
                    title: CURLANG.sub,
                    buttonHTML: '<span class="fonticon ve-tlb-sub1">\uE004</span>',
                    excmd: 'subscript',
                    transform: {
                        '<sub>{SELTEXT}</sub>': "[sub]{SELTEXT}[/sub]"
                    }
                },
                link: {
                    title: CURLANG.link,
                    buttonHTML: '<span class="fonticon ve-tlb-link1">\uE007</span>',
                    hotkey: 'ctrl+shift+2',
                    modal: {
                        title: CURLANG.modal_link_title,
                        width: "500px",
                        tabs: [
							{
							    input: [
									{ param: "SELTEXT", title: CURLANG.modal_link_text, type: "div" },
									{ param: "URL", title: CURLANG.modal_link_url, validation: '^http(s)?://' }
							    ]
							}
                        ]
                    },
                    transform: {
                        '<a href="{URL}">{SELTEXT}</a>': "[url={URL}]{SELTEXT}[/url]",
                        '<a href="{URL}">{URL}</a>': "[url]{URL}[/url]"
                    }
                },
                img: {
                    title: CURLANG.img,
                    buttonHTML: '<span class="fonticon ve-tlb-img1">\uE006</span>',
                    hotkey: 'ctrl+shift+1',
                    addWrap: true,
                    modal: {
                        title: CURLANG.modal_img_title,
                        width: "600px",
                        tabs: [
							{
							    title: CURLANG.modal_img_tab1,
							    input: [
									{ param: "SRC", title: CURLANG.modal_imgsrc_text, validation: '^http(s)?://.*?\.(jpg|png|gif|jpeg)$' }
							    ]
							}
                        ],
                        onLoad: this.imgLoadModal
                    },
                    transform: {
                        '<img src="{SRC}" />': "[img]{SRC}[/img]",
                        '<img src="{SRC}" width="{WIDTH}" height="{HEIGHT}"/>': "[img width={WIDTH},height={HEIGHT}]{SRC}[/img]"
                    }
                },
                bullist: {
                    title: CURLANG.bullist,
                    buttonHTML: '<span class="fonticon ve-tlb-list1">\uE009</span>',
                    excmd: 'insertUnorderedList',
                    transform: {
                        '<ul>{SELTEXT}</ul>': "[list]{SELTEXT}[/list]",
                        '<li>{SELTEXT}</li>': "[*]{SELTEXT}[/*]"
                    }
                },
                numlist: {
                    title: CURLANG.numlist,
                    buttonHTML: '<span class="fonticon ve-tlb-numlist1">\uE00a</span>',
                    excmd: 'insertOrderedList',
                    transform: {
                        '<ol>{SELTEXT}</ol>': "[list=1]{SELTEXT}[/list]",
                        '<li>{SELTEXT}</li>': "[*]{SELTEXT}[/*]"
                    }
                },
                quote: {
                    title: CURLANG.quote,
                    buttonHTML: '<span class="fonticon ve-tlb-quote1">\uE00c</span>',
                    hotkey: 'ctrl+shift+3',
                    //subInsert: true,
                    transform: {
                        '<blockquote>{SELTEXT}</blockquote>': "[quote]{SELTEXT}[/quote]"
                    }
                },
                code: {
                    title: CURLANG.code,
                    buttonText: '[code]',
                    /* buttonHTML: '<span class="fonticon">\uE00d</span>', */
                    hotkey: 'ctrl+shift+4',
                    onlyClearText: true,
                    transform: {
                        '<code>{SELTEXT}</code>': "[code]{SELTEXT}[/code]"
                    }
                },
                offtop: {
                    title: CURLANG.offtop,
                    buttonText: 'offtop',
                    transform: {
                        '<span style="font-size:10px;color:#ccc">{SELTEXT}</span>': "[offtop]{SELTEXT}[/offtop]"
                    }
                },
                fontcolor: {
                    type: "colorpicker",
                    title: CURLANG.fontcolor,
                    excmd: "foreColor",
                    valueBBname: "color",
                    subInsert: true,
                    colors: "#000000,#444444,#666666,#999999,#b6b6b6,#cccccc,#d8d8d8,#efefef,#f4f4f4,#ffffff,-, \
							 #ff0000,#980000,#ff7700,#ffff00,#00ff00,#00ffff,#1e84cc,#0000ff,#9900ff,#ff00ff,-, \
							 #f4cccc,#dbb0a7,#fce5cd,#fff2cc,#d9ead3,#d0e0e3,#c9daf8,#cfe2f3,#d9d2e9,#ead1dc, \
							 #ea9999,#dd7e6b,#f9cb9c,#ffe599,#b6d7a8,#a2c4c9,#a4c2f4,#9fc5e8,#b4a7d6,#d5a6bd, \
							 #e06666,#cc4125,#f6b26b,#ffd966,#93c47d,#76a5af,#6d9eeb,#6fa8dc,#8e7cc3,#c27ba0, \
							 #cc0000,#a61c00,#e69138,#f1c232,#6aa84f,#45818e,#3c78d8,#3d85c6,#674ea7,#a64d79, \
							 #900000,#85200C,#B45F06,#BF9000,#38761D,#134F5C,#1155Cc,#0B5394,#351C75,#741B47, \
							 #660000,#5B0F00,#783F04,#7F6000,#274E13,#0C343D,#1C4587,#073763,#20124D,#4C1130",
                    transform: {
                        '<font color="{COLOR}">{SELTEXT}</font>': '[color={COLOR}]{SELTEXT}[/color]'
                    }
                },
                table: {
                    type: "table",
                    title: CURLANG.table,
                    cols: 10,
                    rows: 10,
                    cellwidth: 20,
                    transform: {
                        '<td>{SELTEXT}</td>': '[td]{SELTEXT}[/td]',
                        '<tr>{SELTEXT}</tr>': '[tr]{SELTEXT}[/tr]',
                        '<table class="wbb-table">{SELTEXT}</table>': '[table]{SELTEXT}[/table]'
                    },
                    skipRules: true
                },
                fontsize: {
                    type: 'select',
                    title: CURLANG.fontsize,
                    options: "fs_verysmall,fs_small,fs_normal,fs_big,fs_verybig"
                },
                fontfamily: {
                    type: 'select',
                    title: CURLANG.fontfamily,
                    excmd: 'fontName',
                    valueBBname: "font",
                    options: [
						{ title: "Arial", exvalue: "Arial" },
						{ title: "Comic Sans MS", exvalue: "Comic Sans MS" },
						{ title: "Courier New", exvalue: "Courier New" },
						{ title: "Georgia", exvalue: "Georgia" },
						{ title: "Lucida Sans Unicode", exvalue: "Lucida Sans Unicode" },
						{ title: "Tahoma", exvalue: "Tahoma" },
						{ title: "Times New Roman", exvalue: "Times New Roman" },
						{ title: "Trebuchet MS", exvalue: "Trebuchet MS" },
						{ title: "Verdana", exvalue: "Verdana" }
                    ],
                    transform: {
                        '<font face="{FONT}">{SELTEXT}</font>': '[font={FONT}]{SELTEXT}[/font]'
                    }
                },
                smilebox: {
                    type: 'smilebox',
                    title: CURLANG.smilebox,
                    buttonHTML: '<span class="fonticon ve-tlb-smilebox1">\uE00b</span>'
                },
                justifyleft: {
                    title: CURLANG.justifyleft,
                    buttonHTML: '<span class="fonticon ve-tlb-textleft1">\uE015</span>',
                    groupkey: 'align',
                    transform: {
                        '<p style="text-align:left">{SELTEXT}</p>': '[left]{SELTEXT}[/left]'
                    }
                },
                justifyright: {
                    title: CURLANG.justifyright,
                    buttonHTML: '<span class="fonticon ve-tlb-textright1">\uE016</span>',
                    groupkey: 'align',
                    transform: {
                        '<p style="text-align:right">{SELTEXT}</p>': '[right]{SELTEXT}[/right]'
                    }
                },
                justifycenter: {
                    title: CURLANG.justifycenter,
                    buttonHTML: '<span class="fonticon ve-tlb-textcenter1">\uE014</span>',
                    groupkey: 'align',
                    transform: {
                        '<p style="text-align:center">{SELTEXT}</p>': '[center]{SELTEXT}[/center]'
                    }
                },
                video: {
                    title: CURLANG.video,
                    buttonHTML: '<span class="fonticon ve-tlb-video1">\uE008</span>',
                    modal: {
                        title: CURLANG.video,
                        width: "600px",
                        tabs: [
							{
							    title: CURLANG.video,
							    input: [
									{ param: "SRC", title: CURLANG.modal_video_text }
							    ]
							}
                        ],
                        onSubmit: function (cmd, opt, queryState) {
                            var url = this.$modal.find('input[name="SRC"]').val();
                            if (url) {
                                url = url.replace(/^\s+/, "").replace(/\s+$/, "");
                            }
                            var a;
                            if (url.indexOf("youtu.be") != -1) {
                                a = url.match(/^http[s]*:\/\/youtu\.be\/([a-z0-9_-]+)/i);
                            } else {
                                a = url.match(/^http[s]*:\/\/www\.youtube\.com\/watch\?.*?v=([a-z0-9_-]+)/i);
                            }
                            if (a && a.length == 2) {
                                var code = a[1];
                                this.insertAtCursor(this.getCodeByCommand(cmd, { src: code }));
                            }
                            this.closeModal();
                            this.updateUI();
                            return false;
                        }
                    },
                    transform: {
                        '<iframe src="http://www.youtube.com/embed/{SRC}" width="640" height="480" frameborder="0"></iframe>': '[video]{SRC}[/video]'
                    }
                },

                //select options
                fs_verysmall: {
                    title: CURLANG.fs_verysmall,
                    buttonText: "fs1",
                    excmd: 'fontSize',
                    exvalue: "1",
                    transform: {
                        '<font size="1">{SELTEXT}</font>': '[size=50]{SELTEXT}[/size]'
                    }
                },
                fs_small: {
                    title: CURLANG.fs_small,
                    buttonText: "fs2",
                    excmd: 'fontSize',
                    exvalue: "2",
                    transform: {
                        '<font size="2">{SELTEXT}</font>': '[size=85]{SELTEXT}[/size]'
                    }
                },
                fs_normal: {
                    title: CURLANG.fs_normal,
                    buttonText: "fs3",
                    excmd: 'fontSize',
                    exvalue: "3",
                    transform: {
                        '<font size="3">{SELTEXT}</font>': '[size=100]{SELTEXT}[/size]'
                    }
                },
                fs_big: {
                    title: CURLANG.fs_big,
                    buttonText: "fs4",
                    excmd: 'fontSize',
                    exvalue: "4",
                    transform: {
                        '<font size="4">{SELTEXT}</font>': '[size=150]{SELTEXT}[/size]'
                    }
                },
                fs_verybig: {
                    title: CURLANG.fs_verybig,
                    buttonText: "fs5",
                    excmd: 'fontSize',
                    exvalue: "6",
                    transform: {
                        '<font size="6">{SELTEXT}</font>': '[size=200]{SELTEXT}[/size]'
                    }
                },

                removeformat: {
                    title: CURLANG.removeFormat,
                    buttonHTML: '<span class="fonticon ve-tlb-removeformat1">\uE00f</span>',
                    excmd: "removeFormat"
                }
            },
            systr: {
                '<br/>': "\n",
                '<span class="wbbtab">{SELTEXT}</span>': '   {SELTEXT}'
            },
            customRules: {
                td: [["[td]{SELTEXT}[/td]", { seltext: { rgx: false, attr: false, sel: false } }]],
                tr: [["[tr]{SELTEXT}[/tr]", { seltext: { rgx: false, attr: false, sel: false } }]],
                table: [["[table]{SELTEXT}[/table]", { seltext: { rgx: false, attr: false, sel: false } }]]
                //blockquote: [["   {SELTEXT}",{seltext: {rgx:false,attr:false,sel:false}}]]
            },
            smileList: [
				//{title:CURLANG.sm1, img: '<img src="{themePrefix}{themeName}/img/smiles/sm1.png" class="sm">', bbcode:":)"},
            ],
            attrWrap: ['src', 'color', 'href'] //use becouse FF and IE change values for this attr, modify [attr] to _[attr]
        }

        //FIX for Opera. Wait while iframe loaded
        this.inited = this.options.onlyBBmode;
        /*
		//init css prefix, if not set
		if (!this.options.themePrefix) {
			$('link').each($.proxy(function(idx, el) {
				var sriptMatch = $(el).get(0).href.match(/(.*\/)(.*)\/wbbtheme\.css.*$/);
				if (sriptMatch !== null) {
					this.options.themeName = sriptMatch[2];
					this.options.themePrefix = sriptMatch[1];
				}
			},this));
		}
		*/
        //check for preset
        if (typeof (WBBPRESET) != "undefined") {
            if (WBBPRESET.allButtons) {
                //clear transform
                $.each(WBBPRESET.allButtons, $.proxy(function (k, v) {
                    if (v.transform && this.options.allButtons[k]) {
                        delete this.options.allButtons[k].transform;
                    }
                }, this));
            }
            $.extend(true, this.options, WBBPRESET);
        }

        if (settings && settings.allButtons) {
            $.each(settings.allButtons, $.proxy(function (k, v) {
                if (v.transform && this.options.allButtons[k]) {
                    delete this.options.allButtons[k].transform;
                }
            }, this));
        }

        $.extend(true, this.options, settings);
        this.init();
    }

    $.wysibb.prototype = {
        lastid: 1,
        init: function () {
            $.log("Init", this);
            //check for mobile
            this.isMobile = function (a) { (/android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)) }(navigator.userAgent || navigator.vendor || window.opera);

            //use bbmode on mobile devices
            //this.isMobile = true; //TEMP
            if (this.options.onlyBBmode === true) { this.options.bbmode = true; }
            //create array of controls, for queryState
            this.controllers = [];

            //convert button string to array
            this.options.buttons = this.options.buttons.toLowerCase();
            this.options.buttons = this.options.buttons.split(",");

            //init system transforms
            this.options.allButtons["_systr"] = {};
            this.options.allButtons["_systr"]["transform"] = this.options.systr;

            this.smileFind();
            this.initTransforms();
            this.build();
            this.initModal();
            if (this.options.hotkeys === true && !this.isMobile) {
                this.initHotkeys();
            }

            //sort smiles
            if (this.options.smileList && this.options.smileList.length > 0) {
                this.options.smileList.sort(function (a, b) {
                    return (b.bbcode.length - a.bbcode.length);
                })
            }

            this.$txtArea.parents("form").bind("submit", $.proxy(function () {
                this.sync();
                return true;
            }, this));


            //phpbb2
            this.$txtArea.parents("form").find("input[id*='preview'],input[id*='submit'],input[class*='preview'],input[class*='submit'],input[name*='preview'],input[name*='submit']").bind("mousedown", $.proxy(function () {
                this.sync();
                setTimeout($.proxy(function () {
                    if (this.options.bbmode === false) {
                        this.$txtArea.removeAttr("wbbsync").val("");
                    }
                }, this), 1000);
            }, this));
            //end phpbb2

            if (this.options.initCallback) {
                this.options.initCallback.call(this);
            }

            $.log(this);

        },
        initTransforms: function () {
            $.log("Create rules for transform HTML=>BB");
            var o = this.options;
            //need to check for active buttons
            if (!o.rules) { o.rules = {}; }
            if (!o.groups) { o.groups = {}; } //use for groupkey, For example: justifyleft,justifyright,justifycenter. It is must replace each other.
            var btnlist = o.buttons.slice();

            //add system transform
            btnlist.push("_systr");
            for (var bidx = 0; bidx < btnlist.length; bidx++) {
                var ob = o.allButtons[btnlist[bidx]];
                if (!ob) { continue; }
                ob.en = true;

                //check for simplebbcode
                if (ob.simplebbcode && $.isArray(ob.simplebbcode) && ob.simplebbcode.length == 2) {
                    ob.bbcode = ob.html = ob.simplebbcode[0] + "{SELTEXT}" + ob.simplebbcode[1];
                    if (ob.transform) delete ob.transform;
                    if (ob.modal) delete ob.modal;
                }

                //add transforms to option list
                if (ob.type == "select" && typeof (ob.options) == "string") {
                    var olist = ob.options.split(",");
                    $.each(olist, function (i, op) {
                        if ($.inArray(op, btnlist) == -1) {
                            btnlist.push(op);
                        }
                    });
                }
                if (ob.transform && ob.skipRules !== true) {
                    var obtr = $.extend({}, ob.transform);

                    /* if (ob.addWrap) {
						//addWrap
						$.log("needWrap");
						for (var bhtml in obtr) {
							var bbcode = ob.transform[bhtml];
							var newhtml = '<span wbb="'+btnlist[bidx]+'">'+bhtml+'</span>';
							obtr[newhtml] = bbcode;
						}
					} */

                    for (var bhtml in obtr) {
                        var orightml = bhtml;
                        var bbcode = obtr[bhtml];

                        //create root selector for isContain bbmode
                        if (!ob.bbSelector) { ob.bbSelector = []; }
                        if ($.inArray(bbcode, ob.bbSelector) == -1) {
                            ob.bbSelector.push(bbcode);
                        }
                        if (this.options.onlyBBmode === false) {

                            //wrap attributes 
                            bhtml = this.wrapAttrs(bhtml);


                            var $bel = $(document.createElement('DIV')).append($(this.elFromString(bhtml, document)));
                            var rootSelector = this.filterByNode($bel.children());


                            //check if current rootSelector is exist, create unique selector for each transform (1.2.2)
                            if (rootSelector == "div" || typeof (o.rules[rootSelector]) != "undefined") {
                                //create unique selector
                                $.log("create unique selector: " + rootSelector);
                                this.setUID($bel.children());
                                rootSelector = this.filterByNode($bel.children());
                                $.log("New rootSelector: " + rootSelector);
                                //replace transform with unique selector
                                var nhtml2 = $bel.html();
                                nhtml2 = this.unwrapAttrs(nhtml2);
                                var obhtml = this.unwrapAttrs(bhtml);


                                ob.transform[nhtml2] = bbcode;
                                delete ob.transform[obhtml];

                                bhtml = nhtml2;
                                orightml = nhtml2;
                            }

                            //create root selector for isContain
                            if (!ob.excmd) {
                                if (!ob.rootSelector) { ob.rootSelector = []; }
                                ob.rootSelector.push(rootSelector);
                            }

                            //check for rules on this rootSeletor
                            if (typeof (o.rules[rootSelector]) == "undefined") {
                                o.rules[rootSelector] = [];
                            }
                            var crules = {};

                            if (bhtml.match(/\{\S+?\}/)) {
                                $bel.find('*').each($.proxy(function (idx, el) {
                                    //check attributes

                                    var attributes = this.getAttributeList(el);
                                    $.each(attributes, $.proxy(function (i, item) {
                                        var attr = $(el).attr(item);
                                        if (item.substr(0, 1) == '_') {
                                            item = item.substr(1);
                                        }

                                        var r = attr.match(/\{\S+?\}/g);
                                        if (r) {
                                            for (var a = 0; a < r.length; a++) {
                                                var rname = r[a].substr(1, r[a].length - 2);
                                                rname = rname.replace(this.getValidationRGX(rname), "");
                                                var p = this.relFilterByNode(el, rootSelector);
                                                var regRepl = (attr != r[a]) ? this.getRegexpReplace(attr, r[a]) : false;
                                                crules[rname.toLowerCase()] = { sel: (p) ? $.trim(p) : false, attr: item, rgx: regRepl }
                                            }
                                        }
                                    }, this));

                                    //check for text
                                    var sl = [];
                                    if (!$(el).is("iframe")) {
                                        $(el).contents().filter(function () { return this.nodeType === 3 }).each($.proxy(function (i, rel) {
                                            var txt = rel.textContent || rel.data;
                                            if (typeof (txt) == "undefined") { return true; }
                                            var r = txt.match(/\{\S+?\}/g)
                                            if (r) {
                                                for (var a = 0; a < r.length; a++) {
                                                    var rname = r[a].substr(1, r[a].length - 2);
                                                    rname = rname.replace(this.getValidationRGX(rname), "");
                                                    var p = this.relFilterByNode(el, rootSelector);
                                                    var regRepl = (txt != r[a]) ? this.getRegexpReplace(txt, r[a]) : false;
                                                    var sel = (p) ? $.trim(p) : false;
                                                    if ($.inArray(sel, sl) > -1 || $(rel).parent().contents().size() > 1) {
                                                        //has dublicate and not one children, need wrap
                                                        var nel = $("<span>").html("{" + rname + "}");
                                                        this.setUID(nel, "wbb");
                                                        var start = (txt.indexOf(rname) + rname.length) + 1;
                                                        var after_txt = txt.substr(start, txt.length - start);
                                                        //create wrap element
                                                        rel.data = txt.substr(0, txt.indexOf(rname) - 1);
                                                        $(rel).after(this.elFromString(after_txt, document)).after(nel);

                                                        sel = ((sel) ? sel + " " : "") + this.filterByNode(nel);
                                                        regRepl = false;
                                                    }
                                                    crules[rname.toLowerCase()] = { sel: sel, attr: false, rgx: regRepl }
                                                    sl[sl.length] = sel;
                                                }
                                            }
                                        }, this));
                                    }
                                    sl = null;


                                }, this));

                                var nbhtml = $bel.html();
                                //UnWrap attributes 
                                nbhtml = this.unwrapAttrs(nbhtml);
                                if (orightml != nbhtml) {
                                    //if we modify html, replace it
                                    delete ob.transform[orightml];
                                    ob.transform[nbhtml] = bbcode;
                                    bhtml = nbhtml;
                                }

                            }
                            o.rules[rootSelector].push([bbcode, crules]);

                            //check for onlyClearText
                            if (ob.onlyClearText === true) {
                                if (!this.cleartext) { this.cleartext = {}; }
                                this.cleartext[rootSelector] = btnlist[bidx];
                            }

                            //check for groupkey
                            if (ob.groupkey) {
                                if (!o.groups[ob.groupkey]) { o.groups[ob.groupkey] = [] }
                                o.groups[ob.groupkey].push(rootSelector);
                            }
                        }
                    }

                    //sort rootSelector
                    if (ob.rootSelector) {
                        this.sortArray(ob.rootSelector, -1);
                    }

                    var htmll = $.map(ob.transform, function (bb, html) { return html }).sort(function (a, b) {
                        return ((b[0] || "").length - (a[0] || "").length)
                    });
                    ob.bbcode = ob.transform[htmll[0]];
                    ob.html = htmll[0];
                }
            };

            this.options.btnlist = btnlist; //use for transforms, becouse select elements not present in buttons

            //add custom rules, for table,tr,td and other
            $.extend(o.rules, this.options.customRules);

            //smile rules
            o.srules = {};
            if (this.options.smileList) {
                $.each(o.smileList, $.proxy(function (i, sm) {
                    var $sm = $(this.strf(sm.img, o));
                    var f = this.filterByNode($sm);
                    o.srules[f] = [sm.bbcode, sm.img];
                }, this));
            }

            //sort transforms by bbcode length desc
            for (var rootsel in o.rules) {
                this.options.rules[rootsel].sort(function (a, b) {
                    return (b[0].length - a[0].length)
                });
            }

            //create rootsel list
            this.rsellist = [];
            for (var rootsel in this.options.rules) {
                this.rsellist.push(rootsel);
            }
            this.sortArray(this.rsellist, -1);
        },

        //BUILD
        build: function () {
            $.log("Build editor");

            //this.$editor = $('<div class="wysibb">');
            this.$editor = $('<div>').addClass("wysibb");

            if (this.isMobile) {
                this.$editor.addClass("wysibb-mobile");
            }

            //set direction if defined
            if (this.options.direction) { this.$editor.css("direction", this.options.direction) }

            this.$editor.insertAfter(this.txtArea).append(this.txtArea);

            this.startHeight = this.$txtArea.outerHeight();
            this.$txtArea.addClass("wysibb-texarea");
            this.buildToolbar();
            //Build iframe if needed
            this.$txtArea.wrap('<div class="wysibb-text">');

            if (this.options.onlyBBmode === false) {
                var height = this.options.minheight || this.$txtArea.outerHeight();
                var maxheight = this.options.resize_maxheight;
                var mheight = (this.options.autoresize === true) ? this.options.resize_maxheight : height;
                this.$body = $(this.strf('<div class="wysibb-text-editor" style="max-height:{maxheight}px;min-height:{height}px"></div>', { maxheight: mheight, height: height })).insertAfter(this.$txtArea);
                this.body = this.$body[0];
                this.$txtArea.hide();

                if (height > 32) {
                    this.$toolbar.css("max-height", height);
                }

                $.log("WysiBB loaded");

                this.$body.addClass("wysibb-body").addClass(this.options.bodyClass);

                //set direction if defined
                if (this.options.direction) { this.$body.css("direction", this.options.direction) }


                if ('contentEditable' in this.body) {
                    this.body.contentEditable = true;
                    try {
                        //fix for mfirefox
                        //document.execCommand('enableObjectResizing', false, 'false'); //disable image resizing
                        document.execCommand('StyleWithCSS', false, false);
                        //document.designMode = "on";
                        this.$body.append("<span></span>");
                    } catch (e) { }
                } else {
                    //use onlybbmode
                    this.options.onlyBBmode = this.options.bbmode = true;
                }

                //check for exist content in textarea
                if (this.txtArea.value.length > 0) {
                    this.txtAreaInitContent();
                }


                //clear html on paste from external editors
                this.$body.bind('keydown', $.proxy(function (e) {
                    if ((e.which == 86 && (e.ctrlKey == true || e.metaKey == true)) || (e.which == 45 && (e.shiftKey == true || e.metaKey == true))) {
                        if (!this.$pasteBlock) {
                            this.saveRange();
                            this.$pasteBlock = $(this.elFromString('<div style="opacity:0;" contenteditable="true">\uFEFF</div>'));

                            this.$pasteBlock.appendTo(this.body);
                            //if (!$.support.search?type=2) {this.$pasteBlock.focus();} //IE 7,8 FIX
                            setTimeout($.proxy(function () {
                                this.clearPaste(this.$pasteBlock);
                                var rdata = '<span>' + this.$pasteBlock.html() + '</span>';
                                this.$body.attr("contentEditable", "true");
                                this.$pasteBlock.blur().remove();
                                this.body.focus();

                                if (this.cleartext) {
                                    $.log("Check if paste to clearText Block");
                                    if (this.isInClearTextBlock()) {
                                        rdata = this.toBB(rdata).replace(/\n/g, "<br/>").replace(/\s{3}/g, '<span class="wbbtab"></span>');
                                    }
                                }
                                rdata = rdata.replace(/\t/g, '<span class="wbbtab"></span>');
                                this.selectRange(this.lastRange);
                                this.insertAtCursor(rdata, false);
                                this.lastRange = false;
                                this.$pasteBlock = false;
                            }
                            , this), 1);
                            this.selectNode(this.$pasteBlock[0]);
                        }
                        return true;
                    }
                }, this));

                //insert BR on press enter
                this.$body.bind('keydown', $.proxy(function (e) {
                    if (e.which == 13) {
                        var isLi = this.isContain(this.getSelectNode(), 'li');
                        if (!isLi) {
                            if (e.preventDefault) { e.preventDefault(); }
                            this.checkForLastBR(this.getSelectNode());
                            this.insertAtCursor('<br/>', false);
                        }
                    }
                }, this));

                //tabInsert
                if (this.options.tabInsert === true) {
                    this.$body.bind('keydown', $.proxy(this.pressTab, this));
                }

                //add event listeners
                this.$body.bind('mouseup keyup', $.proxy(this.updateUI, this));
                this.$body.bind('mousedown', $.proxy(function (e) { this.clearLastRange(); this.checkForLastBR(e.target) }, this));

                //trace Textarea
                if (this.options.traceTextarea === true) {
                    $(document).bind("mousedown", $.proxy(this.traceTextareaEvent, this));
                    this.$txtArea.val("");
                }

                //attach hotkeys
                if (this.options.hotkeys === true) {
                    this.$body.bind('keydown', $.proxy(this.presskey, this));
                }

                //smileConversion
                if (this.options.smileConversion === true) {
                    this.$body.bind('keyup', $.proxy(this.smileConversion, this));
                }

                this.inited = true;

                //create resize lines
                if (this.options.autoresize === true) {
                    this.$bresize = $(this.elFromString('<div class="bottom-resize-line"></div>')).appendTo(this.$editor)
						.wdrag({
						    scope: this,
						    axisY: true,
						    height: height
						});
                }

                this.imgListeners();
            }


            //this.$editor.append('<span class="powered">Powered by <a href="http://www.wysibb.com" target="_blank">WysiBB<a/></span>');

            //add event listeners to textarea 
            this.$txtArea.bind('mouseup keyup', $.proxy(function () {
                clearTimeout(this.uitimer);
                this.uitimer = setTimeout($.proxy(this.updateUI, this), 100);
            }, this));

            //attach hotkeys
            if (this.options.hotkeys === true) {
                $(document).bind('keydown', $.proxy(this.presskey, this));
            }
        },
        buildToolbar: function () {
            if (this.options.toolbar === false) { return false; }

            //this.$toolbar = $('<div class="wysibb-toolbar">').prependTo(this.$editor);
            this.$toolbar = $('<div>').addClass("wysibb-toolbar").prependTo(this.$editor);

            var $btnContainer;
            $.each(this.options.buttons, $.proxy(function (i, bn) {
                var opt = this.options.allButtons[bn];
                if (i == 0 || bn == "|" || bn == "-") {
                    if (bn == "-") {
                        this.$toolbar.append("<div>");
                    }
                    $btnContainer = $('<div class="wysibb-toolbar-container">').appendTo(this.$toolbar);
                }
                if (opt) {
                    if (opt.type == "colorpicker") {
                        this.buildColorpicker($btnContainer, bn, opt);
                    } else if (opt.type == "table") {
                        this.buildTablepicker($btnContainer, bn, opt);
                    } else if (opt.type == "select") {
                        this.buildSelect($btnContainer, bn, opt);
                    } else if (opt.type == "smilebox") {
                        this.buildSmilebox($btnContainer, bn, opt);
                    } else {
                        this.buildButton($btnContainer, bn, opt);
                    }
                }
            }, this));

            //fix for hide tooltip on quick mouse over
            this.$toolbar.find(".btn-tooltip").hover(function () { $(this).parent().css("overflow", "hidden") }, function () { $(this).parent().css("overflow", "visible") });

            //build bbcode switch button
            //var $bbsw = $('<div class="wysibb-toolbar-container modeSwitch"><div class="wysibb-toolbar-btn" unselectable="on"><span class="btn-inner ve-tlb-bbcode" unselectable="on"></span></div></div>').appendTo(this.$toolbar);
            var $bbsw = $(document.createElement('div')).addClass("wysibb-toolbar-container modeSwitch").html('<div class="wysibb-toolbar-btn mswitch" unselectable="on"><span class="btn-inner modesw" unselectable="on">[bbcode]</span></div>').appendTo(this.$toolbar);
            if (this.options.bbmode == true) { $bbsw.children(".wysibb-toolbar-btn").addClass("on"); }
            if (this.options.onlyBBmode === false) {
                $bbsw.children(".wysibb-toolbar-btn").click($.proxy(function (e) {
                    $(e.currentTarget).toggleClass("on");
                    this.modeSwitch();
                }, this));
            }
        },
        buildButton: function (container, bn, opt) {
            if (typeof (container) != "object") {
                container = this.$toolbar;
            }
            var btnHTML = (opt.buttonHTML) ? $(this.strf(opt.buttonHTML, this.options)).addClass("btn-inner") : this.strf('<span class="btn-inner btn-text">{text}</span>', { text: opt.buttonText.replace(/</g, "&lt;") });
            var hotkey = (this.options.hotkeys === true && this.options.showHotkeys === true && opt.hotkey) ? (' <span class="tthotkey">[' + opt.hotkey + ']</span>') : ""
            var $btn = $('<div class="wysibb-toolbar-btn wbb-' + bn + '">').appendTo(container).append(btnHTML).append(this.strf('<span class="btn-tooltip">{title}<ins/>{hotkey}</span>', { title: opt.title, hotkey: hotkey }));

            //attach events
            this.controllers.push($btn);
            $btn.bind('queryState', $.proxy(function (e) {
                (this.queryState(bn)) ? $(e.currentTarget).addClass("on") : $(e.currentTarget).removeClass("on");
            }, this));
            $btn.mousedown($.proxy(function (e) {
                e.preventDefault();
                this.execCommand(bn, opt.exvalue || false);
                $(e.currentTarget).trigger('queryState');
            }, this));
        },
        buildColorpicker: function (container, bn, opt) {
            var $btn = $('<div class="wysibb-toolbar-btn wbb-dropdown wbb-cp">').appendTo(container).append('<div class="ve-tlb-colorpick"><span class="fonticon">\uE010</span><span class="cp-line"></span></div><ins class="fonticon ar">\uE011</ins>').append(this.strf('<span class="btn-tooltip">{title}<ins/></span>', { title: opt.title }));
            var $cpline = $btn.find(".cp-line");

            var $dropblock = $('<div class="wbb-list">').appendTo($btn);
            $dropblock.append('<div class="nc">' + CURLANG.auto + '</div>');
            var colorlist = (opt.colors) ? opt.colors.split(",") : [];
            for (var j = 0; j < colorlist.length; j++) {
                colorlist[j] = $.trim(colorlist[j]);
                if (colorlist[j] == "-") {
                    //insert padding
                    $dropblock.append('<span class="pl"></span>');
                } else {
                    $dropblock.append(this.strf('<div class="sc" style="background:{color}" title="{color}"></div>', { color: colorlist[j] }));
                }
            }
            var basecolor = $(document.body).css("color");
            //attach events
            this.controllers.push($btn);
            $btn.bind('queryState', $.proxy(function (e) {
                //queryState
                $cpline.css("background-color", basecolor);
                var r = this.queryState(bn, true);
                if (r) {
                    $cpline.css("background-color", (this.options.bbmode) ? r.color : r);
                    $btn.find(".ve-tlb-colorpick span.fonticon").css("color", (this.options.bbmode) ? r.color : r);
                }
            }, this));
            $btn.mousedown($.proxy(function (e) {
                e.preventDefault();
                this.dropdownclick(".wbb-cp", ".wbb-list", e);
            }, this));
            $btn.find(".sc").mousedown($.proxy(function (e) {
                e.preventDefault();
                this.selectLastRange();
                var c = $(e.currentTarget).attr("title");
                this.execCommand(bn, c);
                $btn.trigger('queryState');
            }, this));
            $btn.find(".nc").mousedown($.proxy(function (e) {
                e.preventDefault();
                this.selectLastRange();
                this.execCommand(bn, basecolor);
                $btn.trigger('queryState');
            }, this));
            $btn.mousedown(function (e) {
                if (e.preventDefault) e.preventDefault();
            });
        },
        buildTablepicker: function (container, bn, opt) {
            var $btn = $('<div class="wysibb-toolbar-btn wbb-dropdown wbb-tbl">').appendTo(container).append('<span class="btn-inner fonticon ve-tlb-table1">\uE00e</span><ins class="fonticon ar">\uE011</ins>').append(this.strf('<span class="btn-tooltip">{title}<ins/></span>', { title: opt.title }));

            var $listblock = $('<div class="wbb-list">').appendTo($btn);
            var $dropblock = $('<div>').css({ "position": "relative", "box-sizing": "border-box" }).appendTo($listblock);
            var rows = opt.rows || 10;
            var cols = opt.cols || 10;
            var allcount = rows * cols;
            $dropblock.css("height", (rows * opt.cellwidth + 2) + "px");
            for (var j = 1; j <= cols; j++) {
                for (var h = 1; h <= rows; h++) {
                    //var html = this.strf('<div class="tbl-sel" style="width:{width}px;height:{height}px;z-index:{zindex}" title="{row},{col}"></div>',{width: (j*opt.cellwidth),height: (h*opt.cellwidth),zindex: --allcount,row:h,col:j});
                    var html = '<div class="tbl-sel" style="width:' + (j * 100 / cols) + '%;height:' + (h * 100 / rows) + '%;z-index:' + (--allcount) + '" title="' + h + ',' + j + '"></div>';
                    $dropblock.append(html);
                }
            }
            //this.debug("Attach event on: tbl-sel");
            $btn.find(".tbl-sel").mousedown($.proxy(function (e) {
                e.preventDefault();
                var t = $(e.currentTarget).attr("title");
                var rc = t.split(",");
                var code = (this.options.bbmode) ? '[table]' : '<table class="wbb-table" cellspacing="5" cellpadding="0">';
                for (var i = 1; i <= rc[0]; i++) {
                    code += (this.options.bbmode) ? ' [tr]\n' : '<tr>';
                    for (var j = 1; j <= rc[1]; j++) {
                        code += (this.options.bbmode) ? '  [td][/td]\n' : '<td>\uFEFF</td>';
                    }
                    code += (this.options.bbmode) ? '[/tr]\n' : '</tr>';
                }
                code += (this.options.bbmode) ? '[/table]' : '</table>';
                this.insertAtCursor(code);
            }, this));
            //this.debug("END Attach event on: tbl-sel");
            $btn.mousedown($.proxy(function (e) {
                e.preventDefault();
                this.dropdownclick(".wbb-tbl", ".wbb-list", e);
            }, this));

        },
        buildSelect: function (container, bn, opt) {
            var $btn = $('<div class="wysibb-toolbar-btn wbb-select wbb-' + bn + '">').appendTo(container).append(this.strf('<span class="val">{title}</span><ins class="fonticon sar">\uE012</ins>', opt)).append(this.strf('<span class="btn-tooltip">{title}<ins/></span>', { title: opt.title }));
            var $sblock = $('<div class="wbb-list">').appendTo($btn);
            var $sval = $btn.find("span.val");

            var olist = ($.isArray(opt.options)) ? opt.options : opt.options.split(",");
            var $selectbox = (this.isMobile) ? $("<select>").addClass("wbb-selectbox") : "";
            for (var i = 0; i < olist.length; i++) {
                var oname = olist[i];
                if (typeof (oname) == "string") {
                    var option = this.options.allButtons[oname];
                    if (option) {
                        //$.log("create: "+oname); 
                        if (option.html) {
                            $('<span>').addClass("option").attr("oid", oname).attr("cmdvalue", option.exvalue).appendTo($sblock).append(this.strf(option.html, { seltext: option.title }));
                        } else {
                            $sblock.append(this.strf('<span class="option" oid="' + oname + '" cmdvalue="' + option.exvalue + '">{title}</span>', option));
                        }

                        //SelectBox for mobile devices
                        if (this.isMobile) {
                            $selectbox.append($('<option>').attr("oid", oname).attr("cmdvalue", option.exvalue).append(option.title));
                        }
                    }
                } else {
                    //build option list from array
                    var params = {
                        seltext: oname.title
                    }
                    params[opt.valueBBname] = oname.exvalue;
                    $('<span>').addClass("option").attr("oid", bn).attr("cmdvalue", oname.exvalue).appendTo($sblock).append(this.strf(opt.html, params));

                    if (this.isMobile) { $selectbox.append($('<option>').attr("oid", bn).attr("cmdvalue", oname.exvalue).append(oname.exvalue)) }
                }
            }
            //$sblock.append($selectbox);
            if (this.isMobile) {
                $selectbox.appendTo(container);
                this.controllers.push($selectbox);

                $selectbox.bind('queryState', $.proxy(function (e) {
                    //queryState
                    $selectbox.find("option").each($.proxy(function (i, el) {
                        var $el = $(el);
                        var r = this.queryState($el.attr("oid"), true);
                        var cmdvalue = $el.attr("cmdvalue");
                        if ((cmdvalue && r == $el.attr("cmdvalue")) || (!cmdvalue && r)) {
                            $el.prop("selected", true);
                            return false;
                        }
                    }, this));
                }, this));

                $selectbox.change($.proxy(function (e) {
                    e.preventDefault();
                    var $o = $(e.currentTarget).find(":selected");
                    var oid = $o.attr("oid");
                    var cmdvalue = $o.attr("cmdvalue");
                    var opt = this.options.allButtons[oid];
                    this.execCommand(oid, opt.exvalue || cmdvalue || false);
                    $(e.currentTarget).trigger('queryState');
                }, this));

            }
            this.controllers.push($btn);
            $btn.bind('queryState', $.proxy(function (e) {
                //queryState
                $sval.text(opt.title);
                $btn.find(".option.selected").removeClass("selected");
                $btn.find(".option").each($.proxy(function (i, el) {
                    var $el = $(el);
                    var r = this.queryState($el.attr("oid"), true);
                    var cmdvalue = $el.attr("cmdvalue");
                    if ((cmdvalue && r == $el.attr("cmdvalue")) || (!cmdvalue && r)) {
                        $sval.text($el.text());
                        $el.addClass("selected");
                        return false;
                    }
                }, this));
            }, this));
            $btn.mousedown($.proxy(function (e) {
                e.preventDefault();
                this.dropdownclick(".wbb-select", ".wbb-list", e);
            }, this));
            $btn.find(".option").mousedown($.proxy(function (e) {
                e.preventDefault();
                var oid = $(e.currentTarget).attr("oid");
                var cmdvalue = $(e.currentTarget).attr("cmdvalue");
                var opt = this.options.allButtons[oid];
                this.execCommand(oid, opt.exvalue || cmdvalue || false);
                $(e.currentTarget).trigger('queryState');
            }, this));
        },
        buildSmilebox: function (container, bn, opt) {
            if (this.options.smileList && this.options.smileList.length > 0) {
                var $btnHTML = $(this.strf(opt.buttonHTML, opt)).addClass("btn-inner");
                var $btn = $('<div class="wysibb-toolbar-btn wbb-smilebox wbb-' + bn + '">').appendTo(container).append($btnHTML).append(this.strf('<span class="btn-tooltip">{title}<ins/></span>', { title: opt.title }));
                var $sblock = $('<div class="wbb-list">').appendTo($btn);
                if ($.isArray(this.options.smileList)) {
                    $.each(this.options.smileList, $.proxy(function (i, sm) {
                        $('<span>').addClass("smile").appendTo($sblock).append($(this.strf(sm.img, this.options)).attr("title", sm.title));
                    }, this));
                }
                $btn.mousedown($.proxy(function (e) {
                    e.preventDefault();
                    this.dropdownclick(".wbb-smilebox", ".wbb-list", e);
                }, this));
                $btn.find('.smile').mousedown($.proxy(function (e) {
                    e.preventDefault();
                    //this.selectLastRange();
                    this.insertAtCursor((this.options.bbmode) ? this.toBB($(e.currentTarget).html()) : $($(e.currentTarget).html()));
                }, this))
            }
        },
        updateUI: function (e) {
            if (!e || ((e.which >= 8 && e.which <= 46) || e.which > 90 || e.type == "mouseup")) {
                $.each(this.controllers, $.proxy(function (i, $btn) {
                    $btn.trigger('queryState');
                }, this));
            }

            //check for onlyClearText
            this.disNonActiveButtons();

        },
        initModal: function () {
            this.$modal = $("#wbbmodal");
            if (this.$modal.size() == 0) {
                $.log("Init modal");
                this.$modal = $('<div>').attr("id", "wbbmodal").prependTo(document.body)
					.html('<div class="wbbm"><div class="wbbm-title"><span class="wbbm-title-text"></span><span class="wbbclose" title="' + CURLANG.close + '">×</span></div><div class="wbbm-content"></div><div class="wbbm-bottom"><button id="wbbm-submit" class="wbb-button">' + CURLANG.save + '</button><button id="wbbm-cancel" class="wbb-cancel-button">' + CURLANG.cancel + '</button><button id="wbbm-remove" class="wbb-remove-button">' + CURLANG.remove + '</button></div></div>').hide();

                this.$modal.find('#wbbm-cancel,.wbbclose').click($.proxy(this.closeModal, this));
                this.$modal.bind('click', $.proxy(function (e) {
                    if ($(e.target).parents(".wbbm").size() == 0) {
                        this.closeModal();
                    }
                }, this));

                $(document).bind("keydown", $.proxy(this.escModal, this)); //ESC key close modal
            }
        },
        initHotkeys: function () {
            $.log("initHotkeys");
            this.hotkeys = [];
            var klist = "0123456789       abcdefghijklmnopqrstuvwxyz";
            $.each(this.options.allButtons, $.proxy(function (cmd, opt) {
                if (opt.hotkey) {
                    var keys = opt.hotkey.split("+");
                    if (keys && keys.length >= 2) {
                        var metasum = 0;
                        var key = keys.pop();
                        $.each(keys, function (i, k) {
                            switch ($.trim(k.toLowerCase())) {
                                case "ctrl": { metasum += 1; break; }
                                case "shift": { metasum += 4; break; }
                                case "alt": { metasum += 7; break; }
                            }
                        })
                        //$.log("metasum: "+metasum+" key: "+key+" code: "+(klist.indexOf(key)+48));
                        if (metasum > 0) {
                            if (!this.hotkeys["m" + metasum]) { this.hotkeys["m" + metasum] = []; }
                            this.hotkeys["m" + metasum]["k" + (klist.indexOf(key) + 48)] = cmd;
                        }
                    }
                }
            }, this))
        },
        presskey: function (e) {
            if (e.ctrlKey == true || e.shiftKey == true || e.altKey == true) {
                var metasum = ((e.ctrlKey == true) ? 1 : 0) + ((e.shiftKey == true) ? 4 : 0) + ((e.altKey == true) ? 7 : 0);
                if (this.hotkeys["m" + metasum] && this.hotkeys["m" + metasum]["k" + e.which]) {
                    this.execCommand(this.hotkeys["m" + metasum]["k" + e.which], false);
                    e.preventDefault();
                    return false;
                }
            }
        },

        //COgdfMMAND FUNCTIONS
        execCommand: function (command, value) {
            $.log("execCommand: " + command);
            var opt = this.options.allButtons[command];
            if (opt.en !== true) { return false; }
            var queryState = this.queryState(command, value);

            //check for onlyClearText
            var skipcmd = this.isInClearTextBlock();
            if (skipcmd && skipcmd != command) { return; }


            if (opt.excmd) {
                //use NativeCommand
                if (this.options.bbmode) {
                    $.log("Native command in bbmode: " + command);
                    if (queryState && opt.subInsert != true) {
                        //remove bbcode
                        this.wbbRemoveCallback(command, value);
                    } else {
                        //insert bbcode
                        var v = {};
                        if (opt.valueBBname && value) {
                            v[opt.valueBBname] = value;
                        }
                        this.insertAtCursor(this.getBBCodeByCommand(command, v));
                    }
                } else {
                    this.execNativeCommand(opt.excmd, value || false);
                }
            } else if (!opt.cmd) {
                //wbbCommand
                //this.wbbExecCommand(command,value,queryState,$.proxy(this.wbbInsertCallback,this),$.proxy(this.wbbRemoveCallback,this));
                this.wbbExecCommand.call(this, command, value, queryState);
            } else {
                //user custom command
                opt.cmd.call(this, command, value, queryState);
            }
            this.updateUI();
        },
        queryState: function (command, withvalue) {
            var opt = this.options.allButtons[command];
            if (opt.en !== true) { return false; }
            //if (opt.subInsert===true && opt.type!="colorpicker") {return false;}
            if (this.options.bbmode) {
                //bbmode
                if (opt.bbSelector) {
                    for (var i = 0; i < opt.bbSelector.length; i++) {
                        var b = this.isBBContain(opt.bbSelector[i]);
                        if (b) {
                            return this.getParams(b, opt.bbSelector[i], b[1]);
                        }
                    }
                }
                return false;
            } else {
                if (opt.excmd) {
                    //native command
                    if (withvalue) {
                        try {
                            //Firefox fix
                            var v = (document.queryCommandValue(opt.excmd) + "").replace(/\'/g, "");
                            if (opt.excmd == "foreColor") {
                                v = this.rgbToHex(v);
                            }
                            //return (v==value);
                            return v;
                        } catch (e) { return false; }
                    } else {
                        try { //Firefox fix, exception while get queryState for UnorderedList
                            if ((opt.excmd == "bold" || opt.excmd == "italic" || opt.excmd == "underline" || opt.excmd == "strikeThrough") && $(this.getSelectNode()).is("img")) { //Fix, when img selected
                                return false;
                            } else if (opt.excmd == "underline" && $(this.getSelectNode()).closest("a").size() > 0) { //fix, when link select
                                return false;
                            }
                            return document.queryCommandState(opt.excmd);
                        } catch (e) { return false; }
                    }
                } else {
                    //custom command
                    if ($.isArray(opt.rootSelector)) {
                        for (var i = 0; i < opt.rootSelector.length; i++) {
                            var n = this.isContain(this.getSelectNode(), opt.rootSelector[i]);
                            if (n) {
                                return this.getParams(n, opt.rootSelector[i]);
                            }
                        }
                    }
                    return false;
                }
            }
        },
        wbbExecCommand: function (command, value, queryState) { //default command for custom bbcodes
            $.log("wbbExecCommand");
            var opt = this.options.allButtons[command];
            if (opt) {
                if (opt.modal) {
                    if ($.isFunction(opt.modal)) {
                        //custom modal function
                        //opt.modal(command,opt.modal,queryState,new clbk(this));
                        opt.modal.call(this, command, opt.modal, queryState);
                    } else {
                        this.showModal.call(this, command, opt.modal, queryState);
                    }
                } else {
                    if (queryState && opt.subInsert != true) {
                        //remove formatting
                        //removeCallback(command,value);
                        this.wbbRemoveCallback(command);
                    } else {
                        //insert format
                        if (opt.groupkey) {
                            var groupsel = this.options.groups[opt.groupkey];
                            if (groupsel) {
                                var snode = this.getSelectNode();
                                $.each(groupsel, $.proxy(function (i, sel) {
                                    var is = this.isContain(snode, sel);
                                    if (is) {
                                        var $sp = $('<span>').html(is.innerHTML)
                                        var id = this.setUID($sp);
                                        $(is).replaceWith($sp);
                                        this.selectNode(this.$editor.find("#" + id)[0]);
                                        return false;
                                    }
                                }, this));
                            }
                        }
                        this.wbbInsertCallback(command, value)
                    }
                }
            }
        },
        wbbInsertCallback: function (command, paramobj) {
            if (typeof (paramobj) != "object") { paramobj = {} };
            $.log("wbbInsertCallback: " + command);
            var data = this.getCodeByCommand(command, paramobj);
            this.insertAtCursor(data);

            if (this.seltextID && data.indexOf(this.seltextID) != -1) {
                var snode = this.$body.find("#" + this.seltextID)[0];
                this.selectNode(snode);
                $(snode).removeAttr("id");
                this.seltextID = false;
            }
        },
        wbbRemoveCallback: function (command, clear) {
            $.log("wbbRemoveCallback: " + command);
            var opt = this.options.allButtons[command];
            if (this.options.bbmode) {
                //bbmode
                //REMOVE BBCODE
                var pos = this.getCursorPosBB();
                var stextnum = 0;
                $.each(opt.bbSelector, $.proxy(function (i, bbcode) {
                    var stext = bbcode.match(/\{[\s\S]+?\}/g);
                    $.each(stext, function (n, s) {
                        if (s.toLowerCase() == "{seltext}") { stextnum = n; return false }
                    });
                    var a = this.isBBContain(bbcode);
                    if (a) {
                        this.txtArea.value = this.txtArea.value.substr(0, a[1]) + this.txtArea.value.substr(a[1], this.txtArea.value.length - a[1]).replace(a[0][0], (clear === true) ? '' : a[0][stextnum + 1]);
                        this.setCursorPosBB(a[1]);
                        return false;
                    }
                }, this));
            } else {
                var node = this.getSelectNode();
                $.each(opt.rootSelector, $.proxy(function (i, s) {
                    //$.log("RS: "+s);
                    var root = this.isContain(node, s);
                    if (!root) { return true; }
                    var $root = $(root);
                    var cs = this.options.rules[s][0][1];
                    if ($root.is("span[wbb]") || !$root.is("span,font")) { //remove only blocks
                        if (clear === true || (!cs || !cs["seltext"])) {
                            this.setCursorByEl($root);
                            $root.remove();
                        } else {
                            if (cs && cs["seltext"] && cs["seltext"]["sel"]) {
                                var htmldata = $root.find(cs["seltext"]["sel"]).html();
                                if (opt.onlyClearText === true) {
                                    htmldata = this.getHTML(htmldata, true, true);
                                    htmldata = htmldata.replace(/\&#123;/g, "{").replace(/\&#125;/g, "}");
                                }
                                $root.replaceWith(htmldata);
                            } else {
                                var htmldata = $root.html();
                                if (opt.onlyClearText === true) {
                                    htmldata = this.getHTML(htmldata, true);
                                    htmldata = htmldata.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">").replace(/\&#123;/g, "{").replace(/\&#125;/g, "}");
                                }
                                $root.replaceWith(htmldata);
                            }
                        }
                        return false;
                    } else {
                        //span,font - extract select content from this span,font
                        var rng = this.getRange();
                        var shtml = this.getSelectText();
                        var rnode = this.getSelectNode();
                        if (shtml == "") {
                            shtml = "\uFEFF";
                        } else {
                            shtml = this.clearFromSubInsert(shtml, command);
                        }
                        var ins = this.elFromString(shtml);

                        var before_rng = (window.getSelection) ? rng.cloneRange() : this.body.createTextRange();
                        var after_rng = (window.getSelection) ? rng.cloneRange() : this.body.createTextRange();

                        if (window.getSelection) {
                            this.insertAtCursor('<span id="wbbdivide"></span>');
                            var div = $root.find('span#wbbdivide').get(0);
                            before_rng.setStart(root.firstChild, 0);
                            before_rng.setEndBefore(div);
                            after_rng.setStartAfter(div);
                            after_rng.setEndAfter(root.lastChild);
                        } else {
                            before_rng.moveToElementText(root);
                            after_rng.moveToElementText(root);
                            before_rng.setEndPoint('EndToStart', rng);
                            after_rng.setEndPoint('StartToEnd', rng);
                        }
                        var bf = this.getSelectText(false, before_rng);
                        var af = this.getSelectText(false, after_rng);
                        if (af != "") {
                            var $af = $root.clone().html(af);
                            $root.after($af);
                        }
                        if (clear !== true) $root.after(ins); //insert select html
                        if (window.getSelection) {
                            $root.html(bf);
                            if (clear !== true) this.selectNode(ins);
                        } else {
                            $root.replaceWith(bf);
                        }
                        return false;
                    }
                }, this));
            }
        },
        execNativeCommand: function (cmd, param) {
            //$.log("execNativeCommand: '"+cmd+"' : "+param); 
            this.body.focus(); //set focus to frame body
            if (cmd == "insertHTML" && !window.getSelection) { //IE does't support insertHTML
                var r = (this.lastRange) ? this.lastRange : document.selection.createRange(); //IE 7,8 range lost fix
                r.pasteHTML(param);
                var txt = $('<div>').html(param).text(); //for ie selection inside block
                var brsp = txt.indexOf("\uFEFF");
                if (brsp > -1) {
                    r.moveStart('character', (-1) * (txt.length - brsp));
                    r.select();
                }
                this.lastRange = false;
            } else if (cmd == "insertHTML") { //fix webkit bug with insertHTML
                var sel = this.getSelection();
                var e = this.elFromString(param);
                var rng = (this.lastRange) ? this.lastRange : this.getRange();
                rng.deleteContents();
                rng.insertNode(e);
                rng.collapse(false);
                sel.removeAllRanges();
                sel.addRange(rng);
            } else {
                if (typeof param == "undefined") { param = false; }
                if (this.lastRange) {
                    $.log("Last range select");
                    this.selectLastRange()
                }
                document.execCommand(cmd, false, param);
            }

        },
        getCodeByCommand: function (command, paramobj) {
            return (this.options.bbmode) ? this.getBBCodeByCommand(command, paramobj) : this.getHTMLByCommand(command, paramobj);
        },
        getBBCodeByCommand: function (command, params) {
            if (!this.options.allButtons[command]) { return ""; }
            if (typeof (params) == "undefined") { params = {}; }
            params = this.keysToLower(params);
            if (!params["seltext"]) {
                //get selected text
                params["seltext"] = this.getSelectText(true);
            }

            var bbcode = this.options.allButtons[command].bbcode;
            //bbcode = this.strf(bbcode,params);
            bbcode = bbcode.replace(/\{(.*?)(\[.*?\])*\}/g, function (str, p, vrgx) {
                if (vrgx) {
                    var vrgxp;
                    if (vrgx) {
                        vrgxp = new RegExp(vrgx + "+", "i");
                    }
                    if (typeof (params[p.toLowerCase()]) != "undefined" && params[p.toLowerCase()].toString().match(vrgxp) === null) {
                        //not valid value
                        return "";
                    }
                }
                return (typeof (params[p.toLowerCase()]) == "undefined") ? "" : params[p.toLowerCase()];
            });

            //insert first with max params
            var rbbcode = null, maxpcount = 0;
            if (this.options.allButtons[command].transform) {
                var tr = [];
                $.each(this.options.allButtons[command].transform, function (html, bb) {
                    tr.push(bb);
                });
                tr = this.sortArray(tr, -1);
                $.each(tr, function (i, v) {
                    var valid = true, pcount = 0, pname = {};;
                    v = v.replace(/\{(.*?)(\[.*?\])*\}/g, function (str, p, vrgx) {
                        var vrgxp;
                        p = p.toLowerCase();
                        if (vrgx) {
                            vrgxp = new RegExp(vrgx + "+", "i");
                        }
                        if (typeof (params[p.toLowerCase()]) == "undefined" || (vrgx && params[p.toLowerCase()].toString().match(vrgxp) === null)) { valid = false; };
                        if (typeof (params[p]) != "undefined" && !pname[p]) { pname[p] = 1; pcount++; }
                        return (typeof (params[p.toLowerCase()]) == "undefined") ? "" : params[p.toLowerCase()];
                    });
                    if (valid && (pcount > maxpcount)) { rbbcode = v; maxpcount = pcount; }
                });
            }
            return rbbcode || bbcode;
        },
        getHTMLByCommand: function (command, params) {
            if (!this.options.allButtons[command]) { return ""; }
            params = this.keysToLower(params);
            if (typeof (params) == "undefined") { params = {}; }
            if (!params["seltext"]) {
                //get selected text
                params["seltext"] = this.getSelectText(false);
                //$.log("seltext: '"+params["seltext"]+"'");
                if (params["seltext"] == "") { params["seltext"] = "\uFEFF"; }
                else {
                    //clear selection from current command tags
                    params["seltext"] = this.clearFromSubInsert(params["seltext"], command);

                    //toBB if params onlyClearText=true
                    if (this.options.allButtons[command].onlyClearText === true) {
                        params["seltext"] = this.toBB(params["seltext"]).replace(/\</g, "&lt;").replace(/\n/g, "<br/>").replace(/\s{3}/g, '<span class="wbbtab"></span>');
                    }

                }
            }

            var postsel = "";
            this.seltextID = "wbbid_" + (++this.lastid);
            if (command != "link" && command != "img") {
                params["seltext"] = '<span id="' + this.seltextID + '">' + params["seltext"] + '</span>'; //use for select seltext
            } else {
                postsel = '<span id="' + this.seltextID + '">\uFEFF</span>'
            }
            var html = this.options.allButtons[command].html;
            html = html.replace(/\{(.*?)(\[.*?\])*\}/g, function (str, p, vrgx) {
                if (vrgx) {
                    var vrgxp = new RegExp(vrgx + "+", "i");
                    if (typeof (params[p.toLowerCase()]) != "undefined" && params[p.toLowerCase()].toString().match(vrgxp) === null) {
                        //not valid value
                        return "";
                    }
                }
                return (typeof (params[p.toLowerCase()]) == "undefined") ? "" : params[p.toLowerCase()];
            });

            //insert first with max params
            var rhtml = null, maxpcount = 0;
            if (this.options.allButtons[command].transform) {
                var tr = [];
                $.each(this.options.allButtons[command].transform, function (html, bb) {
                    tr.push(html);
                });
                tr = this.sortArray(tr, -1);
                $.each(tr, function (i, v) {
                    var valid = true, pcount = 0, pname = {};
                    v = v.replace(/\{(.*?)(\[.*?\])*\}/g, function (str, p, vrgx) {
                        var vrgxp;
                        p = p.toLowerCase();
                        if (vrgx) {
                            vrgxp = new RegExp(vrgx + "+", "i");
                        }
                        if (typeof (params[p]) == "undefined" || (vrgx && params[p].toString().match(vrgxp) === null)) { valid = false; };
                        if (typeof (params[p]) != "undefined" && !pname[p]) { pname[p] = 1; pcount++; }
                        return (typeof (params[p]) == "undefined") ? "" : params[p];
                    });
                    if (valid && (pcount > maxpcount)) { rhtml = v; maxpcount = pcount; }
                });
            }
            return (rhtml || html) + postsel;
        },

        //SELECTION FUNCTIONS
        getSelection: function () {
            if (window.getSelection) {
                return window.getSelection();
            } else if (document.selection) {
                return (this.options.bbmode) ? document.selection.createRange() : document.selection.createRange();
            }
        },
        getSelectText: function (fromTxtArea, range) {
            if (fromTxtArea) {
                //return select text from textarea
                this.txtArea.focus();
                if ('selectionStart' in this.txtArea) {
                    var l = this.txtArea.selectionEnd - this.txtArea.selectionStart;
                    return this.txtArea.value.substr(this.txtArea.selectionStart, l);
                } else {
                    //IE
                    var r = document.selection.createRange();
                    return r.text;
                }
            } else {
                //return select html from body
                this.body.focus();
                if (!range) { range = this.getRange() };
                if (window.getSelection) {
                    //w3c
                    if (range) {
                        return $('<div>').append(range.cloneContents()).html();
                    }
                } else {
                    //ie
                    return range.htmlText;
                }
            }
            return "";
        },
        getRange: function () {
            if (window.getSelection) {
                var sel = this.getSelection();
                if (sel.getRangeAt && sel.rangeCount > 0) {
                    return sel.getRangeAt(0);
                } else if (sel.anchorNode) {
                    var range = (this.options.bbmode) ? document.createRange() : document.createRange();
                    range.setStart(sel.anchorNode, sel.anchorOffset);
                    range.setEnd(sel.focusNode, sel.focusOffset);
                    return range;
                }
            } else {
                return (this.options.bbmode === true) ? document.selection.createRange() : document.selection.createRange();
            }
        },
        insertAtCursor: function (code, forceBBMode) {
            if (typeof (code) != "string") { code = $("<div>").append(code).html(); }
            if ((this.options.bbmode && typeof (forceBBMode) == "undefined") || forceBBMode === true) {
                var clbb = code.replace(/.*(\[\/\S+?\])$/, "$1");
                var p = this.getCursorPosBB() + ((code.indexOf(clbb) != -1 && code.match(/\[.*\]/)) ? code.indexOf(clbb) : code.length);
                if (document.selection) {
                    //IE
                    this.txtArea.focus();
                    this.getSelection().text = code;
                } else if (this.txtArea.selectionStart || this.txtArea.selectionStart == '0') {
                    this.txtArea.value = this.txtArea.value.substring(0, this.txtArea.selectionStart) + code + this.txtArea.value.substring(this.txtArea.selectionEnd, this.txtArea.value.length);
                }
                if (p < 0) { p = 0; }
                this.setCursorPosBB(p);
            } else {
                this.execNativeCommand("insertHTML", code);
                var node = this.getSelectNode();
                if (!$(node).closest("table,tr,td")) {
                    this.splitPrevNext(node);
                }
            }
        },
        getSelectNode: function (rng) {
            this.body.focus();
            if (!rng) { rng = this.getRange(); }
            if (!rng) { return this.$body; }
            //return (window.getSelection) ? rng.commonAncestorContainer:rng.parentElement();
            var sn = (window.getSelection) ? rng.commonAncestorContainer : rng.parentElement();
            if ($(sn).is(".imgWrap")) { sn = $(sn).children("img")[0]; }
            return sn;
        },
        getCursorPosBB: function () {
            var pos = 0;
            if ('selectionStart' in this.txtArea) {
                pos = this.txtArea.selectionStart;
            } else {
                this.txtArea.focus();
                var r = this.getRange();
                var rt = document.body.createTextRange();
                rt.moveToElementText(this.txtArea);
                rt.setEndPoint('EndToStart', r);
                pos = rt.text.length;
            }
            return pos;
        },
        setCursorPosBB: function (pos) {
            if (this.options.bbmode) {
                if (window.getSelection) {
                    this.txtArea.selectionStart = pos;
                    this.txtArea.selectionEnd = pos;
                } else {
                    var range = this.txtArea.createTextRange();
                    range.collapse(true);
                    range.move('character', pos);
                    range.select();
                }
            }
        },
        selectNode: function (node, rng) {
            if (!rng) { rng = this.getRange(); }
            if (!rng) { return; }
            if (window.getSelection) {
                var sel = this.getSelection();
                rng.selectNodeContents(node)
                sel.removeAllRanges();
                sel.addRange(rng);
            } else {
                rng.moveToElementText(node);
                rng.select();
            }
        },
        selectRange: function (rng) {
            if (rng) {
                if (!window.getSelection) {
                    rng.select();
                } else {
                    var sel = this.getSelection();
                    sel.removeAllRanges();
                    sel.addRange(rng);
                }
            }
        },
        cloneRange: function (rng) {
            if (rng) {
                if (!window.getSelection) {
                    return rng.duplicate();
                } else {
                    return rng.cloneRange();
                }
            }
        },
        getRangeClone: function () {
            return this.cloneRange(this.getRange());
        },
        saveRange: function () {
            this.setBodyFocus();
            //this.lastRange=(this.options.bbmode) ? this.getCursorPosBB():this.getRangeClone();
            this.lastRange = this.getRangeClone();
        },
        selectLastRange: function () {
            if (this.lastRange) {
                this.body.focus();
                this.selectRange(this.lastRange);
                this.lastRange = false;
            }
        },
        setBodyFocus: function () {
            $.log("Set focus to WysiBB editor");
            if (this.options.bbmode) {
                if (!this.$txtArea.is(":focus")) {
                    this.$txtArea.focus();
                }
            } else {
                if (!this.$body.is(":focus")) {
                    this.$body.focus();
                }
            }
        },
        clearLastRange: function () {
            this.lastRange = false;
        },

        //TRANSFORM FUNCTIONS
        filterByNode: function (node) {
            var $n = $(node);
            var tagName = $n.get(0).tagName.toLowerCase();
            var filter = tagName;
            var attributes = this.getAttributeList($n.get(0));
            $.each(attributes, $.proxy(function (i, item) {
                var v = $n.attr(item);
                /* $.log("v: "+v);
				if ($.inArray(item,this.options.attrWrap)!=-1) {
					item = '_'+item;
				} */
                //$.log(item);
                if (item.substr(0, 1) == "_") { item = item.substr(1, item.length) }
                if (v && !v.match(/\{.*?\}/)) {
                    //$.log("I1: "+item);
                    if (item == "style") {
                        var v = $n.attr(item);
                        var va = v.split(";");
                        $.each(va, function (i, f) {
                            if (f && f.length > 0) {
                                filter += '[' + item + '*="' + $.trim(f) + '"]';
                            }
                        });
                    } else {
                        filter += '[' + item + '="' + v + '"]';
                    }
                } else if (v && item == "style") {
                    //$.log("I2: "+item);
                    var vf = v.substr(0, v.indexOf("{"));
                    if (vf && vf != "") {
                        var v = v.substr(0, v.indexOf("{"));
                        var va = v.split(";");
                        $.each(va, function (i, f) {
                            filter += '[' + item + '*="' + f + '"]';
                        });
                        //filter+='['+item+'*="'+v.substr(0,v.indexOf("{"))+'"]';
                    }
                } else { //1.2.2
                    //$.log("I3: "+item);
                    filter += '[' + item + ']';
                }
            }, this));

            //index
            var idx = $n.parent().children(filter).index($n);
            if (idx > 0) {
                filter += ":eq(" + $n.index() + ")";
            }
            return filter;
        },
        relFilterByNode: function (node, stop) {
            var p = "";
            $.each(this.options.attrWrap, function (i, a) {
                stop = stop.replace('[' + a, '[_' + a);
            });
            while (node && node.tagName != "BODY" && !$(node).is(stop)) {
                p = this.filterByNode(node) + " " + p;
                if (node) { node = node.parentNode; }
            }
            return p;
        },
        getRegexpReplace: function (str, validname) {
            str = str.replace(/(\(|\)|\[|\]|\.|\*|\?|\:|\\)/g, "\\$1")
				.replace(/\s+/g, "\\s+")
				.replace(validname.replace(/(\(|\)|\[|\]|\.|\*|\?|\:|\\)/g, "\\$1"), "(.+)")
				.replace(/\{\S+?\}/g, ".*");
            return (str);
        },
        getBBCode: function () {
            if (!this.options.rules) { return this.$txtArea.val(); }
            if (this.options.bbmode) { return this.$txtArea.val(); }
            this.clearEmpty();
            this.removeLastBodyBR();
            return this.toBB(this.$body.html());
        },
        toBB: function (data) {
            if (!data) { return ""; };
            var $e = (typeof (data) == "string") ? $('<span>').html(data) : $(data);
            //remove last BR
            $e.find("div,blockquote,p").each(function () {
                if (this.nodeType != 3 && this.lastChild && this.lastChild.tagName == "BR") {
                    $(this.lastChild).remove();
                }
            })
            if ($e.is("div,blockquote,p") && $e[0].nodeType != 3 && $e[0].lastChild && $e[0].lastChild.tagName == "BR") {
                $($e[0].lastChild).remove();
            }
            //END remove last BR

            //Remove BR
            $e.find("ul > br, table > br, tr > br").remove();
            //IE

            var outbb = "";

            //transform smiles
            $.each(this.options.srules, $.proxy(function (s, bb) {
                $e.find(s).replaceWith(bb[0]);
            }, this));

            $e.contents().each($.proxy(function (i, el) {
                var $el = $(el);
                if (el.nodeType === 3) {
                    outbb += el.data.replace(/\n+/, "").replace(/\t/g, "   ");
                } else {
                    //process html tag
                    var rpl, processed = false;

                    //for (var rootsel in this.options.rules) {
                    for (var j = 0; j < this.rsellist.length; j++) {
                        var rootsel = this.rsellist[j];
                        if ($el && $el.is(rootsel)) {
                            //it is root sel
                            var rlist = this.options.rules[rootsel];
                            for (var i = 0; i < rlist.length; i++) {
                                var bbcode = rlist[i][0];
                                var crules = rlist[i][1];
                                var skip = false, keepElement = false, keepAttr = false;
                                if (!$el.is("br")) {
                                    bbcode = bbcode.replace(/\n/g, "<br>");
                                }
                                bbcode = bbcode.replace(/\{(.*?)(\[.*?\])*\}/g, $.proxy(function (str, s, vrgx) {
                                    var c = crules[s.toLowerCase()];
                                    //if (typeof(c)=="undefined") {$.log("Param: {"+s+"} not found in HTML representation.");skip=true;return s;}
                                    if (typeof (c) == "undefined") { $.log("Param: {" + s + "} not found in HTML representation."); skip = true; }
                                    var $cel = (c.sel) ? $(el).find(c.sel) : $(el);
                                    if (c.attr && !$cel.attr(c.attr)) { skip = true; return s; } //skip if needed attribute not present, maybe other bbcode
                                    var cont = (c.attr) ? $cel.attr(c.attr) : $cel.html();
                                    if (typeof (cont) == "undefined" || cont == null) { skip = true; return s; }
                                    var regexp = c.rgx;

                                    //style fix 
                                    if (regexp && c.attr == "style" && regexp.substr(regexp.length - 1, 1) != ";") {
                                        regexp += ";";
                                    }
                                    if (c.attr == "style" && cont && cont.substr(cont.length - 1, 1) != ";") { cont += ";" }
                                    //prepare regexp
                                    var rgx = (regexp) ? new RegExp(regexp, "") : false;
                                    if (rgx) {
                                        if (cont.match(rgx)) {
                                            var m = cont.match(rgx);
                                            if (m && m.length == 2) {
                                                cont = m[1];
                                            }
                                        } else {
                                            cont = "";
                                        }
                                    }

                                    //if it is style attr, then keep tag alive, remove this style
                                    if (c.attr && skip === false) {
                                        if (c.attr == "style") {
                                            keepElement = true;
                                            var nstyle = "";
                                            var r = c.rgx.replace(/^\.\*\?/, "").replace(/\.\*$/, "").replace(/;$/, "");
                                            $($cel.attr("style").split(";")).each(function (idx, style) {
                                                if (style && style != "") {
                                                    if (!style.match(r)) {
                                                        nstyle += style + ";";
                                                    }
                                                }
                                            });
                                            if (nstyle == "") {
                                                $cel.removeAttr("style");
                                            } else {
                                                $cel.attr("style", nstyle);
                                            }
                                        } else if (c.rgx === false) {
                                            keepElement = true;
                                            keepAttr = true;
                                            $cel.removeAttr(c.attr);
                                        }
                                    }
                                    if ($el.is('table,tr,td,font')) { keepElement = true; }

                                    return cont || "";
                                }, this));
                                if (skip) { continue; }
                                if ($el.is("img,br,hr")) {
                                    //replace element
                                    outbb += bbcode;
                                    $el = null;
                                    break;
                                } else {
                                    if (keepElement && !$el.attr("notkeep")) {
                                        if ($el.is("table,tr,td")) {
                                            bbcode = this.fixTableTransform(bbcode);
                                            outbb += this.toBB($('<span>').html(bbcode));
                                            $el = null;
                                        } else {
                                            $el.empty().html('<span>' + bbcode + '</span>');
                                        }

                                    } else {
                                        if ($el.is("iframe")) {
                                            outbb += bbcode;
                                        } else {
                                            $el.empty().html(bbcode);
                                            outbb += this.toBB($el);
                                            $el = null;

                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    if (!$el || $el.is("iframe,img")) { return true; }
                    outbb += this.toBB($el);
                }
            }, this));

            outbb.replace(/\uFEFF/g, "");
            return outbb;
        },
        getHTML: function (bbdata, init, skiplt) {
            if (!this.options.bbmode && !init) { return this.$body.html() }

            if (!skiplt) { bbdata = bbdata.replace(/</g, "&lt;").replace(/\{/g, "&#123;").replace(/\}/g, "&#125;"); }
            bbdata = bbdata.replace(/\[code\]([\s\S]*?)\[\/code\]/g, function (s) {
                s = s.substr("[code]".length, s.length - "[code]".length - "[/code]".length).replace(/\[/g, "&#91;").replace(/\]/g, "&#93;");
                return "[code]" + s + "[/code]";
            });


            $.each(this.options.btnlist, $.proxy(function (i, b) {
                if (b != "|" && b != "-") {
                    var find = true;
                    if (!this.options.allButtons[b] || !this.options.allButtons[b].transform) {
                        return true;
                    }

                    $.each(this.options.allButtons[b].transform, $.proxy(function (html, bb) {
                        html = html.replace(/\n/g, ""); //IE 7,8 FIX
                        var a = [];
                        bb = bb.replace(/(\(|\)|\[|\]|\.|\*|\?|\:|\\|\\)/g, "\\$1");
                        //.replace(/\s/g,"\\s");
                        bb = bb.replace(/\{(.*?)(\\\[.*?\\\])*\}/gi, $.proxy(function (str, s, vrgx) {
                            a.push(s);
                            if (vrgx) {
                                //has validation regexp
                                vrgx = vrgx.replace(/\\/g, "");
                                return "(" + vrgx + "*?)";
                            }
                            return "([\\s\\S]*?)";
                        }, this));
                        var n = 0, am;
                        while ((am = (new RegExp(bb, "mgi")).exec(bbdata)) != null) {
                            if (am) {
                                var r = {};
                                $.each(a, $.proxy(function (i, k) {
                                    r[k] = am[i + 1];
                                }, this));
                                var nhtml = html;
                                nhtml = nhtml.replace(/\{(.*?)(\[.*?\])\}/g, "{$1}");
                                nhtml = this.strf(nhtml, r);
                                bbdata = bbdata.replace(am[0], nhtml);
                            }
                        }
                    }, this));
                }
            }, this));

            //transform system codes
            $.each(this.options.systr, function (html, bb) {
                bb = bb.replace(/(\(|\)|\[|\]|\.|\*|\?|\:|\\|\\)/g, "\\$1")
					.replace(" ", "\\s");
                bbdata = bbdata.replace(new RegExp(bb, "g"), html);
            });


            var $wrap = $(this.elFromString("<div>" + bbdata + "</div>"));
            //transform smiles
            /* $wrap.contents().filter(function() {return this.nodeType==3}).each($.proxy(smilerpl,this)).end().find("*").contents().filter(function() {return this.nodeType==3}).each($.proxy(smilerpl,this));
			
			function smilerpl(i,el) {
				var ndata = el.data;
				$.each(this.options.smileList,$.proxy(function(i,row) {
					var fidx = ndata.indexOf(row.bbcode);
					if (fidx!=-1) {
						var afternode_txt = ndata.substring(fidx+row.bbcode.length,ndata.length);
						var afternode = document.createTextNode(afternode_txt);
						el.data = ndata = el.data.substr(0,fidx);
						$(el).after(afternode).after(this.strf(row.img,this.options));
					}
				},this));	
			} */
            this.getHTMLSmiles($wrap);
            //$wrap.contents().filter(function() {return this.nodeType==3}).each($.proxy(this,smileRPL,this));

            return $wrap.html();
        },
        getHTMLSmiles: function (rel) {
            $(rel).contents().filter(function () { return this.nodeType == 3 }).each($.proxy(this.smileRPL, this));
        },
        smileRPL: function (i, el) {
            var ndata = el.data;
            $.each(this.options.smileList, $.proxy(function (i, row) {
                var fidx = ndata.indexOf(row.bbcode);
                if (fidx != -1) {
                    var afternode_txt = ndata.substring(fidx + row.bbcode.length, ndata.length);
                    var afternode = document.createTextNode(afternode_txt);
                    el.data = ndata = el.data.substr(0, fidx);
                    $(el).after(afternode).after(this.strf(row.img, this.options));
                    this.getHTMLSmiles(el.parentNode);
                    return false;
                }
                this.getHTMLSmiles(el);
            }, this));
        },
        //UTILS
        setUID: function (el, attr) {
            var id = "wbbid_" + (++this.lastid);
            if (el) {
                $(el).attr(attr || "id", id);
            }
            return id;
        },
        keysToLower: function (o) {
            $.each(o, function (k, v) {
                if (k != k.toLowerCase()) {
                    delete o[k];
                    o[k.toLowerCase()] = v;
                }
            });
            return o;
        },
        strf: function (str, data) {
            data = this.keysToLower($.extend({}, data));
            return str.replace(/\{([\w\.]*)\}/g, function (str, key) { key = key.toLowerCase(); var keys = key.split("."), value = data[keys.shift().toLowerCase()]; $.each(keys, function () { value = value[this]; }); return (value === null || value === undefined) ? "" : value; });
        },
        elFromString: function (str) {
            if (str.indexOf("<") != -1 && str.indexOf(">") != -1) {
                //create tag
                var wr = document.createElement("SPAN");
                $(wr).html(str);
                this.setUID(wr, "wbb");
                return ($(wr).contents().size() > 1) ? wr : wr.firstChild;
            } else {
                //create text node
                return document.createTextNode(str);
            }
        },
        isContain: function (node, sel) {
            while (node && !$(node).hasClass("wysibb")) {
                if ($(node).is(sel)) { return node };
                if (node) { node = node.parentNode; }
                else { return null; }
            }
        },
        isBBContain: function (bbcode) {
            var pos = this.getCursorPosBB();
            var b = this.prepareRGX(bbcode);
            var bbrgx = new RegExp(b, "g");
            var a;
            var lastindex = 0;
            while ((a = bbrgx.exec(this.txtArea.value)) != null) {
                var p = this.txtArea.value.indexOf(a[0], lastindex);
                if (pos > p && pos < (p + a[0].length)) {
                    return [a, p];
                }
                lastindex = p + 1;
            }
        },
        prepareRGX: function (r) {
            return r.replace(/(\[|\]|\)|\(|\.|\*|\?|\:|\||\\)/g, "\\$1").replace(/\{.*?\}/g, "([\\s\\S]*?)");
            //return r.replace(/([^a-z0-9)/ig,"\\$1").replace(/\{.*?\}/g,"([\\s\\S]*?)");
        },
        checkForLastBR: function (node) {
            if (!node) { $node = this.body; }
            if (node.nodeType == 3) { node = node.parentNode; }
            var $node = $(node);
            if ($node.is("span[id*='wbbid']")) { $node = $node.parent(); }
            if (this.options.bbmode === false && $node.is('div,blockquote,code') && $node.contents().size() > 0) {
                var l = $node[0].lastChild;
                if (!l || (l && l.tagName != "BR")) { $node.append("<br/>"); }
            }
            if (this.$body.contents().size() > 0 && this.body.lastChild.tagName != "BR") {
                this.$body.append('<br/>');
            }
        },
        getAttributeList: function (el) {
            var a = [];
            $.each(el.attributes, function (i, attr) {
                if (attr.specified) {
                    a.push(attr.name);
                }
            });
            return a;
        },
        clearFromSubInsert: function (html, cmd) {
            if (this.options.allButtons[cmd] && this.options.allButtons[cmd].rootSelector) {
                var $wr = $('<div>').html(html);
                $.each(this.options.allButtons[cmd].rootSelector, $.proxy(function (i, s) {
                    var seltext = false;
                    if (typeof (this.options.rules[s][0][1]["seltext"]) != "undefined") {
                        seltext = this.options.rules[s][0][1]["seltext"]["sel"];
                    }
                    var res = true;
                    $wr.find("*").each(function () { //work with find("*") and "is", becouse in ie7-8 find is case sensitive
                        if ($(this).is(s)) {
                            if (seltext && seltext["sel"]) {
                                $(this).replaceWith($(this).find(seltext["sel"].toLowerCase()).html());
                            } else {
                                $(this).replaceWith($(this).html());
                            }
                            res = false;
                        }
                    });
                    return res;
                }, this));
                return $wr.html();
            }
            return html;
        },
        splitPrevNext: function (node) {
            if (node.nodeType == 3) { node = node.parentNode };
            var f = this.filterByNode(node).replace(/\:eq.*$/g, "");
            if ($(node.nextSibling).is(f)) {
                $(node).append($(node.nextSibling).html());
                $(node.nextSibling).remove();
            }
            if ($(node.previousSibling).is(f)) {
                $(node).prepend($(node.previousSibling).html());
                $(node.previousSibling).remove();
            }
        },
        modeSwitch: function () {
            if (this.options.bbmode) {
                //to HTML
                this.$body.html(this.getHTML(this.$txtArea.val()));
                this.$txtArea.hide().removeAttr("wbbsync").val("");
                this.$body.css("min-height", this.$txtArea.height()).show().focus();
            } else {
                //to bbcode
                this.$txtArea.val(this.getBBCode()).css("min-height", this.$body.height());
                this.$body.hide();
                this.$txtArea.show().focus();
            }
            this.options.bbmode = !this.options.bbmode;
        },
        clearEmpty: function () {
            this.$body.children().filter(emptyFilter).remove();
            function emptyFilter() {
                if (!$(this).is("span,font,a,b,i,u,s")) {
                    //clear empty only for span,font
                    return false;
                }
                if (!$(this).hasClass("wbbtab") && $.trim($(this).html()).length == 0) {
                    return true;
                } else if ($(this).children().size() > 0) {
                    $(this).children().filter(emptyFilter).remove();
                    if ($(this).html().length == 0 && this.tagName != "BODY") {
                        return true;
                    }
                }
            }
        },
        dropdownclick: function (bsel, tsel, e) {
            //this.body.focus();
            var $btn = $(e.currentTarget).closest(bsel);
            if ($btn.hasClass("dis")) { return; }
            if ($btn.attr("wbbshow")) {
                //hide dropdown
                $btn.removeAttr("wbbshow");
                $(document).unbind("mousedown", this.dropdownhandler);
                if (document) {
                    $(document).unbind("mousedown", this.dropdownhandler);
                }
                this.lastRange = false;

            } else {
                this.saveRange();
                this.$editor.find("*[wbbshow]").each(function (i, el) {
                    $(el).removeClass("on").find($(el).attr("wbbshow")).hide().end().removeAttr("wbbshow");
                })
                $btn.attr("wbbshow", tsel);
                $(document.body).bind("mousedown", $.proxy(function (evt) { this.dropdownhandler($btn, bsel, tsel, evt) }, this));
                if (this.$body) {
                    this.$body.bind("mousedown", $.proxy(function (evt) { this.dropdownhandler($btn, bsel, tsel, evt) }, this));
                }
            }
            $btn.find(tsel).toggle();
            $btn.toggleClass("on");
        },
        dropdownhandler: function ($btn, bsel, tsel, e) {
            if ($(e.target).parents(bsel).size() == 0) {
                $btn.removeClass("on").find(tsel).hide();
                $(document).unbind('mousedown', this.dropdownhandler);
                if (this.$body) {
                    this.$body.unbind('mousedown', this.dropdownhandler);
                }
            }
        },
        rgbToHex: function (rgb) {
            if (rgb.substr(0, 1) == '#') { return rgb; }
            //if (rgb.indexOf("rgb")==-1) {return rgb;}
            if (rgb.indexOf("rgb") == -1) {
                //IE
                var color = parseInt(rgb);
                color = ((color & 0x0000ff) << 16) | (color & 0x00ff00) | ((color & 0xff0000) >>> 16);
                return '#' + color.toString(16);
            }
            var digits = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/.exec(rgb);
            return "#" + this.dec2hex(parseInt(digits[2])) + this.dec2hex(parseInt(digits[3])) + this.dec2hex(parseInt(digits[4]));
        },
        dec2hex: function (d) {
            if (d > 15) {
                return d.toString(16);
            } else {
                return "0" + d.toString(16);
            }
        },
        sync: function () {
            if (this.options.bbmode) {
                this.$body.html(this.getHTML(this.txtArea.value, true));
            } else {
                this.$txtArea.attr("wbbsync", 1).val(this.getBBCode());
            }
        },
        clearPaste: function (el) {
            var $block = $(el);
            //NEW 
            $.each(this.options.rules, $.proxy(function (s, ar) {
                var $sf = $block.find(s).attr("wbbkeep", 1);
                if ($sf.size() > 0) {
                    var s2 = ar[0][1];
                    $.each(s2, function (i, v) {
                        if (v.sel) {
                            $sf.find(v.sel).attr("wbbkeep", 1);
                        }
                    });
                }
            }, this));
            $block.find("*[wbbkeep!='1']").each($.proxy(function (i, el) {
                var $this = $(el);
                if ($this.is('div,p') && ($this.children().size() == 0 || el.lastChild.tagName != "BR")) {
                    $this.after("<br/>");
                }
            }, this));
            $block.find("*[wbbkeep]").removeAttr("wbbkeep").removeAttr("style");
            $.log($block.html());
            //$.log("BBCODE: "+this.toBB($block.clone(true)));
            $block.html(this.getHTML(this.toBB($block), true));
            $.log($block.html());

            //OLD
            /* $.each(this.options.rules,$.proxy(function(s,bb) {
				$block.find(s).attr("wbbkeep",1);
			},this));
			
			//replace div and p without last br to html()+br
			$block.find("*[wbbkeep!='1']").each($.proxy(function(i,el) {
				var $this = $(el);
				if ($this.is('div,p') && ($this.children().size()==0 || el.lastChild.tagName!="BR")) {
					$this.after("<br/>").after($this.contents()).remove();
				}else{
					$this.after($this.contents()).remove();
				}
			},this));
			$block.find("*[wbbkeep]").removeAttr("wbbkeep").removeAttr("style"); */
        },
        sortArray: function (ar, asc) {
            ar.sort(function (a, b) {
                return (a.length - b.length) * (asc || 1);
            });
            return ar;
        },
        smileFind: function () {
            if (this.options.smilefind) {
                var $smlist = $(this.options.smilefind).find('img[alt]');
                if ($smlist.size() > 0) {
                    this.options.smileList = [];
                    $smlist.each($.proxy(function (i, el) {
                        var $el = $(el);
                        this.options.smileList.push({ title: $el.attr("title"), bbcode: $el.attr("alt"), img: $el.removeAttr("alt").removeAttr("title")[0].outerHTML });
                    }, this));
                }
            }
        },
        destroy: function () {
            this.$editor.replaceWith(this.$txtArea);
            this.$txtArea.removeClass("wysibb-texarea").show();
            this.$modal.remove();
            this.$txtArea.data("wbb", null);
        },
        pressTab: function (e) {
            if (e && e.which == 9) {
                //insert tab
                if (e.preventDefault) { e.preventDefault(); }
                if (this.options.bbmode) {
                    this.insertAtCursor('   ', false);
                } else {
                    this.insertAtCursor('<span class="wbbtab">\uFEFF</span>', false);
                    //this.execNativeCommand("indent",false); 
                }
            }
        },
        removeLastBodyBR: function () {
            if (this.body.lastChild && this.body.lastChild.nodeType != 3 && this.body.lastChild.tagName == "BR") {
                this.body.removeChild(this.body.lastChild);
                this.removeLastBodyBR();
            }
        },
        traceTextareaEvent: function (e) {
            if ($(e.target).closest("div.wysibb").size() == 0) {
                if ($(document.activeElement).is("div.wysibb-body")) {
                    this.saveRange();
                }
                setTimeout($.proxy(function () {
                    var data = this.$txtArea.val();
                    if (this.options.bbmode === false && data != "" && $(e.target).closest("div.wysibb").size() == 0 && !this.$txtArea.attr("wbbsync")) {
                        this.selectLastRange();
                        this.insertAtCursor(this.getHTML(data, true));
                        this.$txtArea.val("");
                    }
                    if ($(document.activeElement).is("div.wysibb-body")) {
                        this.lastRange = false;
                    }
                }, this), 100);
            }
        },
        txtAreaInitContent: function () {
            //$.log(this.txtArea.value);
            this.$body.html(this.getHTML(this.txtArea.value, true));
        },
        getValidationRGX: function (s) {
            if (s.match(/\[\S+\]/)) {
                return s.replace(/.*(\\*\[\S+\]).*/, "$1");
            }
            return "";
        },
        smileConversion: function () {
            if (this.options.smileList && this.options.smileList.length > 0) {
                var snode = this.getSelectNode();
                if (snode.nodeType == 3) {
                    var ndata = snode.data;
                    if (ndata.length >= 2 && !this.isInClearTextBlock(snode) && $(snode).parents("a").size() == 0) {
                        $.each(this.options.srules, $.proxy(function (i, sar) {
                            var smbb = sar[0];
                            var fidx = ndata.indexOf(smbb);
                            if (fidx != -1) {
                                var afternode_txt = ndata.substring(fidx + smbb.length, ndata.length);
                                var afternode = document.createTextNode(afternode_txt);
                                var afternode_cursor = document.createElement("SPAN");
                                snode.data = snode.data.substr(0, fidx);
                                $(snode).after(afternode).after(afternode_cursor).after(this.strf(sar[1], this.options));
                                this.selectNode(afternode_cursor);
                                return false;
                            }
                        }, this));
                    }
                }
            }
        },
        isInClearTextBlock: function () {
            if (this.cleartext) {
                var find = false;
                $.each(this.cleartext, $.proxy(function (sel, command) {
                    if (this.queryState(command)) {
                        find = command;
                        return false;
                    }
                }, this))
                return find;
            }
            return false;
        },
        wrapAttrs: function (html) {
            $.each(this.options.attrWrap, function (i, a) {
                html = html.replace(a + '="', '_' + a + '="');
            });
            return html;
        },
        unwrapAttrs: function (html) {
            $.each(this.options.attrWrap, function (i, a) {
                html = html.replace('_' + a + '="', a + '="');
            });
            return html;
        },
        disNonActiveButtons: function () {
            if (this.isInClearTextBlock()) {
                this.$toolbar.find(".wysibb-toolbar-btn:not(.on,.mswitch)").addClass("dis");
            } else {
                this.$toolbar.find(".wysibb-toolbar-btn.dis").removeClass("dis");
            }
        },
        setCursorByEl: function (el) {
            var sl = document.createTextNode("\uFEFF");
            $(el).after(sl);
            this.selectNode(sl);
        },

        //img listeners
        imgListeners: function () {
            $(document).on("mousedown", $.proxy(this.imgEventHandler, this));
        },
        imgEventHandler: function (e) {
            var $e = $(e.target);
            if (this.hasWrapedImage && ($e.closest(".wbb-img,#wbbmodal").size() == 0 || $e.hasClass("wbb-cancel-button"))) {
                this.$body.find(".imgWrap ").each(function () {
                    $.log("Removed imgWrap block");
                    $(this).replaceWith($(this).find("img"));
                })
                this.hasWrapedImage = false;
                this.updateUI();
            }

            if ($e.is("img") && $e.closest(".wysibb-body").size() > 0) {
                $e.wrap("<span class='imgWrap'></span>");
                this.hasWrapedImage = $e;
                this.$body.focus();
                this.selectNode($e.parent()[0]);
            }
        },

        //MODAL WINDOW
        showModal: function (cmd, opt, queryState) {
            $.log("showModal: " + cmd);
            this.saveRange();
            var $cont = this.$modal.find(".wbbm-content").html("");
            var $wbbm = this.$modal.find(".wbbm").removeClass("hastabs");
            this.$modal.find("span.wbbm-title-text").html(opt.title);
            if (opt.tabs && opt.tabs.length > 1) {
                //has tabs, create
                $wbbm.addClass("hastabs");
                var $ul = $('<div class="wbbm-tablist">').appendTo($cont).append("<ul>").children("ul");
                $.each(opt.tabs, $.proxy(function (i, row) {
                    if (i == 0) { row['on'] = "on" }
                    $ul.append(this.strf('<li class="{on}" onClick="$(this).parent().find(\'.on\').removeClass(\'on\');$(this).addClass(\'on\');$(this).parents(\'.wbbm-content\').find(\'.tab-cont\').hide();$(this).parents(\'.wbbm-content\').find(\'.tab' + i + '\').show()">{title}</li>', row));

                }, this))
            }
            if (opt.width) {
                $wbbm.css("width", opt.width);
            }
            var $cnt = $('<div class="wbbm-cont">').appendTo($cont);
            if (queryState) {
                $wbbm.find('#wbbm-remove').show();
            } else {
                $wbbm.find('#wbbm-remove').hide();
            }
            $.each(opt.tabs, $.proxy(function (i, r) {
                var $c = $('<div>').addClass("tab-cont tab" + i).attr("tid", i).appendTo($cnt);
                if (i > 0) { $c.hide(); }
                if (r.html) {
                    $c.html(this.strf(r.html, this.options));
                } else {
                    $.each(r.input, $.proxy(function (j, inp) {
                        inp["value"] = queryState[inp.param.toLowerCase()];
                        if (inp.param.toLowerCase() == "seltext" && (!inp["value"] || inp["value"] == "")) {
                            inp["value"] = this.getSelectText(this.options.bbmode);
                        }
                        if (inp["value"] && inp["value"].indexOf("<span id='wbbid") == 0 && $(inp["value"]).is("span[id*='wbbid']")) {
                            inp["value"] = $(inp["value"]).html();
                        }
                        if (inp.type && inp.type == "div") {
                            //div input, support wysiwyg input
                            $c.append(this.strf('<div class="wbbm-inp-row"><label>{title}</label><div class="inp-text div-modal-text" contenteditable="true" name="{param}">{value}</div></div>', inp));
                        } else {
                            //default input
                            $c.append(this.strf('<div class="wbbm-inp-row"><label>{title}</label><input class="inp-text modal-text" type="text" name="{param}" value="{value}"/></div>', inp));
                        }


                    }, this));
                }
            }, this));

            //this.lastRange=this.getRange();

            if ($.isFunction(opt.onLoad)) {
                opt.onLoad.call(this, cmd, opt, queryState);
            }

            $wbbm.find('#wbbm-submit').click($.proxy(function () {

                if ($.isFunction(opt.onSubmit)) { //custom submit function, if return false, then don't process our function
                    var r = opt.onSubmit.call(this, cmd, opt, queryState);
                    if (r === false) { return; }
                }
                var params = {};
                var valid = true;
                this.$modal.find(".wbbm-inperr").remove();
                this.$modal.find(".wbbm-brdred").removeClass("wbbm-brdred");
                //$.each(this.$modal.find(".tab-cont:visible input"),$.proxy(function(i,el) {
                $.each(this.$modal.find(".tab-cont:visible .inp-text"), $.proxy(function (i, el) {
                    var tid = $(el).parents(".tab-cont").attr("tid");
                    var pname = $(el).attr("name").toLowerCase();
                    var pval = "";
                    if ($(el).is("input,textrea,select")) {
                        pval = $(el).val();
                    } else {
                        pval = $(el).html();
                    }
                    var validation = opt.tabs[tid]["input"][i]["validation"];
                    if (typeof (validation) != "undefined") {
                        if (!pval.match(new RegExp(validation, "i"))) {
                            valid = false;
                            $(el).after('<span class="wbbm-inperr">' + CURLANG.validation_err + '</span>').addClass("wbbm-brdred");
                        }
                    }
                    params[pname] = pval;
                }, this));
                if (valid) {
                    $.log("Last range: " + this.lastRange);
                    this.selectLastRange();
                    //insert callback
                    if (queryState) {
                        this.wbbRemoveCallback(cmd, true);
                    }
                    this.wbbInsertCallback(cmd, params);
                    //END insert callback

                    this.closeModal();
                    this.updateUI();
                }
            }, this));
            $wbbm.find('#wbbm-remove').click($.proxy(function () {
                //clbk.remove();
                this.selectLastRange();
                this.wbbRemoveCallback(cmd); //remove callback
                this.closeModal();
                this.updateUI();
            }, this));

            $(document.body).css("overflow", "hidden"); //lock the screen, remove scroll on body
            if ($("body").height() > $(window).height()) { //if body has scroll, add padding-right 18px
                $(document.body).css("padding-right", "18px");
            }
            this.$modal.show();
            //if (window.getSelection) 
            if (this.isMobile) {
                $wbbm.css("margin-top", "10px");
            } else {
                $wbbm.css("margin-top", ($(window).height() - $wbbm.outerHeight()) / 3 + "px");
            }
            //setTimeout($.proxy(function() {this.$modal.find("input:visible")[0].focus()},this),10);
            setTimeout($.proxy(function () { this.$modal.find(".inp-text:visible")[0].focus() }, this), 10);
        },
        escModal: function (e) {
            if (e.which == 27) { this.closeModal(); }
        },
        closeModal: function () {
            $(document.body).css("overflow", "auto").css("padding-right", "0").unbind("keyup", this.escModal); //ESC key close modal;
            this.$modal.find('#wbbm-submit,#wbbm-remove').unbind('click');
            this.$modal.hide();
            this.lastRange = false;
            return this;
        },
        getParams: function (src, s, offset) {
            var params = {};
            if (this.options.bbmode) {
                //bbmode
                var stext = s.match(/\{[\s\S]+?\}/g);
                s = this.prepareRGX(s);
                var rgx = new RegExp(s, "g");
                var val = this.txtArea.value;
                if (offset > 0) {
                    val = val.substr(offset, val.length - offset);
                }
                var a = rgx.exec(val);
                if (a) {
                    $.each(stext, function (i, n) {
                        params[n.replace(/\{|\}/g, "").replace(/"/g, "'").toLowerCase()] = a[i + 1];
                    });
                }
            } else {
                var rules = this.options.rules[s][0][1];
                $.each(rules, $.proxy(function (k, v) {
                    var value = "";
                    var $v = (v.sel !== false) ? value = $(src).find(v.sel) : $(src);
                    if (v.attr !== false) {
                        value = $v.attr(v.attr);
                    } else {
                        value = $v.html();
                    }
                    if (value) {
                        if (v.rgx !== false) {
                            var m = value.match(new RegExp(v.rgx));
                            if (m && m.length == 2) {
                                value = m[1];
                            }
                        }
                        params[k] = value.replace(/"/g, "'");
                    }
                }, this))
            }
            return params;
        },


        //imgUploader
        imgLoadModal: function () {
            $.log("imgLoadModal");
            if (this.options.imgupload === true) {
                this.$modal.find("#imguploader").dragfileupload({
                    url: this.strf(this.options.img_uploadurl, this.options),
                    extraParams: {
                        maxwidth: this.options.img_maxwidth,
                        maxheight: this.options.img_maxheight
                    },
                    themePrefix: this.options.themePrefix,
                    themeName: this.options.themeName,
                    success: $.proxy(function (data) {
                        this.$txtArea.insertImage(data.image_link, data.thumb_link);

                        this.closeModal();
                        this.updateUI();
                    }, this)
                });

                this.$modal.find("#fileupl").bind("change", function () {
                    $("#fupform").submit();
                });
                this.$modal.find("#fupform").bind("submit", $.proxy(function (e) {
                    $(e.target).parents("#imguploader").hide().after('<div class="loader"><img src="' + this.options.themePrefix + '/' + this.options.themeName + '/img/loader.gif" /><br/><span>' + CURLANG.loading + '</span></div>').parent().css("text-align", "center");
                }, this))

            } else {
                this.$modal.find(".hastabs").removeClass("hastabs");
                this.$modal.find("#imguploader").parents(".tab-cont").remove();
                this.$modal.find(".wbbm-tablist").remove();
            }
        },
        imgSubmitModal: function () {
            $.log("imgSubmitModal");
        },
        //DEBUG
        printObjectInIE: function (obj) {
            try {
                $.log(JSON.stringify(obj));
            } catch (e) { }
        },
        checkFilter: function (node, filter) {
            $.log("node: " + $(node).get(0).outerHTML + " filter: " + filter + " res: " + $(node).is(filter.toLowerCase()));
        },
        debug: function (msg) {
            if (this.options.debug === true) {
                var time = (new Date()).getTime();
                if (typeof (console) != "undefined") {
                    console.log((time - this.startTime) + " ms: " + msg);
                } else {
                    $("#exlog").append('<p>' + (time - this.startTime) + " ms: " + msg + '</p>');
                }
                this.startTime = time;
            }
        },

        //Browser fixes
        isChrome: function () {
            return (window.chrome) ? true : false;
        },
        fixTableTransform: function (html) {
            if (!html) { return ""; }
            if ($.inArray("table", this.options.buttons) == -1) {
                return html.replace(/\<(\/*?(table|tr|td|tbody))[^>]*\>/ig, "");
            } else {
                return html.replace(/\<(\/*?(table|tr|td))[^>]*\>/ig, "[$1]".toLowerCase()).replace(/\<\/*tbody[^>]*\>/ig, "");
            }
        }
    }

    $.log = function (msg) {
        if (typeof (wbbdebug) != "undefined" && wbbdebug === true) {
            if (typeof (console) != "undefined") {
                console.log(msg);
            } else {
                $("#exlog").append('<p>' + msg + '</p>');
            }
        }
    }
    $.fn.wysibb = function (settings) {
        return this.each(function () {
            var data = $(this).data("wbb");
            if (!data) {
                new $.wysibb(this, settings);
            }
        });
    }
    $.fn.wdrag = function (opt) {
        if (!opt.scope) { opt.scope = this; }
        var start = { x: 0, y: 0, height: 0 };
        var drag;
        opt.scope.drag_mousedown = function (e) {
            e.preventDefault();
            start = {
                x: e.pageX,
                y: e.pageY,
                height: opt.height,
                sheight: opt.scope.$body.height()
            }
            drag = true;
            $(document).bind("mousemove", $.proxy(opt.scope.drag_mousemove, this));
            $(this).addClass("drag");
        };
        opt.scope.drag_mouseup = function (e) {
            if (drag === true) {
                e.preventDefault();
                $(document).unbind("mousemove", opt.scope.drag_mousemove);
                $(this).removeClass("drag");
                drag = false;
            }
        };
        opt.scope.drag_mousemove = function (e) {
            e.preventDefault();
            var axisX = 0, axisY = 0;
            if (opt.axisX) {
                axisX = e.pageX - start.x;
            }
            if (opt.axisY) {
                axisY = e.pageY - start.y;
            }
            if (axisY != 0) {
                var nheight = start.sheight + axisY;
                if (nheight > start.height && nheight <= opt.scope.options.resize_maxheight) {
                    if (opt.scope.options.bbmode == true) {
                        opt.scope.$txtArea.css((opt.scope.options.autoresize === true) ? "min-height" : "height", nheight + "px");
                    } else {
                        opt.scope.$body.css((opt.scope.options.autoresize === true) ? "min-height" : "height", nheight + "px");
                    }
                }
            }
        };


        $(this).bind("mousedown", opt.scope.drag_mousedown);
        $(document).bind("mouseup", $.proxy(opt.scope.drag_mouseup, this));
    },

    //API
	$.fn.getDoc = function () {
	    return this.data('wbb').doc;
	}
    $.fn.getSelectText = function (fromTextArea) {
        return this.data('wbb').getSelectText(fromTextArea);
    }
    $.fn.bbcode = function (data) {
        if (typeof (data) != "undefined") {
            if (this.data('wbb').options.bbmode) {
                this.data('wbb').$txtArea.val(data);
            } else {
                this.data('wbb').$body.html(this.data("wbb").getHTML(data));
            }
            return this;
        } else {
            return this.data('wbb').getBBCode();
        }
    }
    $.fn.htmlcode = function (data) {
        if (!this.data('wbb').options.onlyBBMode && this.data('wbb').inited === true) {
            if (typeof (data) != "undefined") {
                this.data('wbb').$body.html(data);
                return this;
            } else {
                return this.data('wbb').getHTML(this.data('wbb').$txtArea.val());
            }
        }
    }
    $.fn.getBBCode = function () {
        return this.data('wbb').getBBCode();
    }
    $.fn.getHTML = function () {
        var wbb = this.data('wbb');
        return wbb.getHTML(wbb.$txtArea.val());
    }
    $.fn.getHTMLByCommand = function (command, params) {
        return this.data("wbb").getHTMLByCommand(command, params);
    }
    $.fn.getBBCodeByCommand = function (command, params) {
        return this.data("wbb").getBBCodeByCommand(command, params);
    }
    $.fn.insertAtCursor = function (data, forceBBMode) {
        this.data("wbb").insertAtCursor(data, forceBBMode);
        return this.data("wbb");
    }
    $.fn.execCommand = function (command, value) {
        this.data("wbb").execCommand(command, value);
        return this.data("wbb");
    }
    $.fn.insertImage = function (imgurl, thumburl) {
        var editor = this.data("wbb");
        var code = (thumburl) ? editor.getCodeByCommand('link', { url: imgurl, seltext: editor.getCodeByCommand('img', { src: thumburl }) }) : editor.getCodeByCommand('img', { src: imgurl });
        this.insertAtCursor(code);
        return editor;
    }
    $.fn.sync = function () {
        this.data("wbb").sync();
        return this.data("wbb");
    }
    $.fn.destroy = function () {
        this.data("wbb").destroy();
    }


    $.fn.queryState = function (command) {
        return this.data("wbb").queryState(command);
    }
})(jQuery);


//Drag&Drop file uploader
(function ($) {
    'use strict';

    $.fn.dragfileupload = function (options) {
        return this.each(function () {
            var upl = new FileUpload(this, options);
            upl.init();
        });
    };

    function FileUpload(e, options) {
        this.$block = $(e);

        this.opt = $.extend({
            url: false,
            success: false,
            extraParams: false,
            fileParam: 'img',
            validation: '\.(jpg|png|gif|jpeg)$',

            t1: CURLANG.fileupload_text1,
            t2: CURLANG.fileupload_text2
        }, options);
    }

    FileUpload.prototype = {
        init: function () {
            if (window.FormData != null) {
                this.$block.addClass("drag");
                this.$block.prepend('<div class="p2">' + this.opt.t2 + '</div>');
                this.$block.prepend('<div class="p">' + this.opt.t1 + '</div>');

                this.$block.bind('dragover', function () { $(this).addClass('dragover'); return false; });
                this.$block.bind('dragleave', function () { $(this).removeClass('dragover'); return false; });

                //upload progress
                var uploadProgress = $.proxy(function (e) {
                    var p = parseInt(e.loaded / e.total * 100, 10);
                    this.$loader.children("span").text(CURLANG.loading + ': ' + p + '%');

                }, this);
                var xhr = jQuery.ajaxSettings.xhr();
                if (xhr.upload) {
                    xhr.upload.addEventListener('progress', uploadProgress, false);
                }
                this.$block[0].ondrop = $.proxy(function (e) {
                    e.preventDefault();
                    this.$block.removeClass('dragover');
                    var ufile = e.dataTransfer.files[0];
                    if (this.opt.validation && !ufile.name.match(new RegExp(this.opt.validation))) {
                        this.error(CURLANG.validation_err);
                        return false;
                    }
                    var fData = new FormData();
                    fData.append(this.opt.fileParam, ufile);

                    if (this.opt.extraParams) { //check for extraParams to upload
                        $.each(this.opt.extraParams, function (k, v) {
                            fData.append(k, v);
                        });
                    }

                    this.$loader = $('<div class="loader"><img src="' + this.opt.themePrefix + '/' + this.opt.themeName + '/img/loader.gif" /><br/><span>' + CURLANG.loading + '</span></div>');
                    this.$block.html(this.$loader);

                    $.ajax({
                        type: 'POST',
                        url: this.opt.url,
                        data: fData,
                        processData: false,
                        contentType: false,
                        xhr: function () { return xhr },
                        dataType: 'json',
                        success: $.proxy(function (data) {
                            if (data && data.status == 1) {
                                this.opt.success(data);
                            } else {
                                this.error(data.msg || CURLANG.error_onupload);
                            }
                        }, this),
                        error: $.proxy(function (xhr, txt, thr) { this.error(CURLANG.error_onupload) }, this)
                    });
                }, this);

            }
        },
        error: function (msg) {
            this.$block.find(".upl-error").remove().end().append('<span class="upl-error">' + msg + '</span>').addClass("wbbm-brdred");
        }
    }
})(jQuery);

//!!! begin

; (function ($, window, undefined) {
    // outside the scope of the jQuery plugin to
    // keep track of all dropdowns
    var $allDropdowns = $();

    // if instantlyCloseOthers is true, then it will instantly
    // shut other nav items when a new one is hovered over
    $.fn.dropdownHover = function (options) {
        // don't do anything if touch is supported
        // (plugin causes some issues on mobile)
        if ('ontouchstart' in document) return this; // don't want to affect chaining

        // the element we really care about
        // is the dropdown-toggle's parent
        $allDropdowns = $allDropdowns.add(this.parent());

        return this.each(function () {
            var $this = $(this),
                $parent = $this.parent(),
                defaults = {
                    delay: 500,
                    instantlyCloseOthers: true
                },
                data = {
                    delay: $(this).data('delay'),
                    instantlyCloseOthers: $(this).data('close-others')
                },
                showEvent = 'show.bs.dropdown',
                hideEvent = 'hide.bs.dropdown',
                // shownEvent  = 'shown.bs.dropdown',
                // hiddenEvent = 'hidden.bs.dropdown',
                settings = $.extend(true, {}, defaults, options, data),
                timeout;

            $parent.hover(function (event) {
                // so a neighbor can't open the dropdown
                if (!$parent.hasClass('open') && !$this.is(event.target)) {
                    // stop this event, stop executing any code 
                    // in this callback but continue to propagate
                    return true;
                }

                $allDropdowns.find(':focus').blur();

                if (settings.instantlyCloseOthers === true)
                    $allDropdowns.removeClass('open');

                window.clearTimeout(timeout);
                $parent.addClass('open');
                $this.trigger(showEvent);
            }, function () {
                timeout = window.setTimeout(function () {
                    $parent.removeClass('open');
                    $this.trigger(hideEvent);
                }, settings.delay);
            });

            // this helps with button groups!
            $this.hover(function () {
                $allDropdowns.find(':focus').blur();

                if (settings.instantlyCloseOthers === true)
                    $allDropdowns.removeClass('open');

                window.clearTimeout(timeout);
                $parent.addClass('open');
                $this.trigger(showEvent);
            });

            // handle submenus
            $parent.find('.dropdown-submenu').each(function () {
                var $this = $(this);
                var subTimeout;
                $this.hover(function () {
                    window.clearTimeout(subTimeout);
                    $this.children('.dropdown-menu').show();
                    // always close submenu siblings instantly
                    $this.siblings().children('.dropdown-menu').hide();
                }, function () {
                    var $submenu = $this.children('.dropdown-menu');
                    subTimeout = window.setTimeout(function () {
                        $submenu.hide();
                    }, settings.delay);
                });
            });
        });
    };

    $(document).ready(function () {
        // apply dropdownHover to all elements with the data-hover="dropdown" attribute
        $('[data-hover="dropdown"]').dropdownHover();
    });
})(jQuery, this);

; (function ($, window, undefined) {

    $.fn.phorumizeRoute = function () {
        var url = location.href;

        if (url.indexOf("rss") == -1 && url.indexOf("wap") == -1 && url.indexOf("action=") == -1) {
            if (url.indexOf("board=") > -1) {
                return "forum";
            }
            else if (url.indexOf("topic=") > -1) {
                return "topic";
            }
        }
        return null;
    }

    $.fn.phorumize = function (options) {

        var _elem = this,

        frame = $("#content_section > div.frame"),
        body = $("body"),
        allSmiles = [
            { title: 'Ganba', img: '<img src="http://ukrpravda.net/Smileys/default/Ganba.gif" class="sm">', bbcode: ':Ganba:' },
            { title: 'gigi', img: '<img src="http://ukrpravda.net/Smileys/default/gigi.gif" class="sm">', bbcode: ':gigi:' },
            { title: 'hot', img: '<img src="http://ukrpravda.net/Smileys/default/hot.gif" class="sm">', bbcode: ':hot:' },
            { title: 'idea', img: '<img src="http://ukrpravda.net/Smileys/default/idea.gif" class="sm">', bbcode: ':idea:' },
            { title: 'laugh', img: '<img src="http://ukrpravda.net/Smileys/default/laugh.gif" class="sm">', bbcode: ':laugh:' },
            { title: 'lol', img: '<img src="http://ukrpravda.net/Smileys/default/lol.gif" class="sm">', bbcode: ':lol:' },
            { title: 'love', img: '<img src="http://ukrpravda.net/Smileys/default/love.gif" class="sm">', bbcode: ':love:' },
            { title: 'moskali', img: '<img src="http://ukrpravda.net/Smileys/default/moskali.gif" class="sm">', bbcode: ':moskali:' },
            { title: 'Prapor2', img: '<img src="http://ukrpravda.net/Smileys/default/Prapor2.gif" class="sm">', bbcode: ':Prapor2:' },
            { title: 'rotate', img: '<img src="http://ukrpravda.net/Smileys/default/rotate.gif" class="sm">', bbcode: ':rotate:' },
            { title: 'Sho_za', img: '<img src="http://ukrpravda.net/Smileys/default/Sho_za.gif" class="sm">', bbcode: ':Sho_za:' },
            { title: 'shuffle', img: '<img src="http://ukrpravda.net/Smileys/default/shuffle.gif" class="sm">', bbcode: ':shuffle:' },
            { title: 'smiley14', img: '<img src="http://ukrpravda.net/Smileys/default/smiley14.gif" class="sm">', bbcode: ':smiley14:' },
            { title: 'smiley15', img: '<img src="http://ukrpravda.net/Smileys/default/smiley15.gif" class="sm">', bbcode: ':smiley15:' },
            { title: 'smiley16', img: '<img src="http://ukrpravda.net/Smileys/default/smiley16.gif" class="sm">', bbcode: ':smiley16:' },
            { title: 'smiley23', img: '<img src="http://ukrpravda.net/Smileys/default/smiley23.gif" class="sm">', bbcode: ':smiley23:' },
            { title: 'smiley24', img: '<img src="http://ukrpravda.net/Smileys/default/smiley24.gif" class="sm">', bbcode: ':smiley24:' },
            { title: 'smiley25', img: '<img src="http://ukrpravda.net/Smileys/default/smiley25.gif" class="sm">', bbcode: ':smiley25:' },
            { title: 'smilie1', img: '<img src="http://ukrpravda.net/Smileys/default/smilie1.gif" class="sm">', bbcode: ':smilie1:' },
            { title: 'smilie10', img: '<img src="http://ukrpravda.net/Smileys/default/smilie10.gif" class="sm">', bbcode: ':smilie10:' },
            { title: 'smilie11', img: '<img src="http://ukrpravda.net/Smileys/default/smilie11.gif" class="sm">', bbcode: ':smilie11:' },
            { title: 'smilie2', img: '<img src="http://ukrpravda.net/Smileys/default/smilie2.gif" class="sm">', bbcode: ':smilie2:' },
            { title: 'smilie3', img: '<img src="http://ukrpravda.net/Smileys/default/smilie3.gif" class="sm">', bbcode: ':smilie3:' },
            { title: 'smilie5', img: '<img src="http://ukrpravda.net/Smileys/default/smilie5.gif" class="sm">', bbcode: ':smilie5:' },
            { title: 'smilie7', img: '<img src="http://ukrpravda.net/Smileys/default/smilie7.gif" class="sm">', bbcode: ':smilie7:' },
            { title: 'smilie8', img: '<img src="http://ukrpravda.net/Smileys/default/smilie8.gif" class="sm">', bbcode: ':smilie8:' },
            { title: 'smilie9', img: '<img src="http://ukrpravda.net/Smileys/default/smilie9.gif" class="sm">', bbcode: ':smilie9:' },
            { title: 'super', img: '<img src="http://ukrpravda.net/Smileys/default/super.gif" class="sm">', bbcode: ':super:' },
            { title: 'Tyapnycia', img: '<img src="http://ukrpravda.net/Smileys/default/Tyapnycia.gif" class="sm">', bbcode: ':Tyapnycia:' },
            { title: 'Vedy_sebe', img: '<img src="http://ukrpravda.net/Smileys/default/Vedy_sebe.gif" class="sm">', bbcode: ':Vedy_sebe:' },
            { title: 'weep', img: '<img src="http://ukrpravda.net/Smileys/default/weep.gif" class="sm">', bbcode: ':weep:' },
            { title: 'upa', img: '<img src="http://ukrpravda.net/Smileys/default/upa2.jpg" class="sm">', bbcode: ':upa:' },
            { title: 'eyes', img: '<img src="http://ukrpravda.net/Smileys/default/eyes.gif" class="sm">', bbcode: ':eyes:' },
            { title: 'Hochu_pyva', img: '<img src="http://ukrpravda.net/Smileys/default/Hochu_pyva.gif" class="sm">', bbcode: ':Hochu_pyva:' },
            { title: 'Ignor', img: '<img src="http://ukrpravda.net/Smileys/default/Ignor.gif" class="sm">', bbcode: ':Ignor:' },
            { title: 'Razom', img: '<img src="http://ukrpravda.net/Smileys/default/Razom.gif" class="sm">', bbcode: ':Razom:' },

            { title: ':)', img: '<img src="http://ukrpravda.net/Smileys/default/ab.gif" class="sm">', bbcode: '::):' },
            { title: 'aa', img: '<img src="http://ukrpravda.net/Smileys/default/aa.gif" class="sm">', bbcode: ':aa:' },
            { title: 'ac', img: '<img src="http://ukrpravda.net/Smileys/default/ac.gif" class="sm">', bbcode: ':ac:' },
            { title: 'ad', img: '<img src="http://ukrpravda.net/Smileys/default/ad.gif" class="sm">', bbcode: ':ad:' },
            { title: 'ae', img: '<img src="http://ukrpravda.net/Smileys/default/ae.gif" class="sm">', bbcode: ':ae:' },
            { title: 'af', img: '<img src="http://ukrpravda.net/Smileys/default/af.gif" class="sm">', bbcode: ':af:' },
            { title: 'ag', img: '<img src="http://ukrpravda.net/Smileys/default/ag.gif" class="sm">', bbcode: ':ag:' },
            { title: 'ah', img: '<img src="http://ukrpravda.net/Smileys/default/ah.gif" class="sm">', bbcode: ':ah:' },
            { title: 'ai', img: '<img src="http://ukrpravda.net/Smileys/default/ai.gif" class="sm">', bbcode: ':ai:' },
            { title: 'aj', img: '<img src="http://ukrpravda.net/Smileys/default/aj.gif" class="sm">', bbcode: ':aj:' },
            { title: 'ak', img: '<img src="http://ukrpravda.net/Smileys/default/ak.gif" class="sm">', bbcode: ':ak:' },
            { title: 'al', img: '<img src="http://ukrpravda.net/Smileys/default/al.gif" class="sm">', bbcode: ':al:' },
            { title: 'am', img: '<img src="http://ukrpravda.net/Smileys/default/am.gif" class="sm">', bbcode: ':am:' },
            { title: 'an', img: '<img src="http://ukrpravda.net/Smileys/default/an.gif" class="sm">', bbcode: ':an:' },
            { title: 'ao', img: '<img src="http://ukrpravda.net/Smileys/default/ao.gif" class="sm">', bbcode: ':ao:' },
            { title: 'ap', img: '<img src="http://ukrpravda.net/Smileys/default/ap.gif" class="sm">', bbcode: ':ap:' },
            { title: 'aq', img: '<img src="http://ukrpravda.net/Smileys/default/aq.gif" class="sm">', bbcode: ':aq:' },
            { title: 'ar', img: '<img src="http://ukrpravda.net/Smileys/default/ar.gif" class="sm">', bbcode: ':ar:' },
            { title: 'as', img: '<img src="http://ukrpravda.net/Smileys/default/as.gif" class="sm">', bbcode: ':as:' },
            { title: 'at', img: '<img src="http://ukrpravda.net/Smileys/default/at.gif" class="sm">', bbcode: ':at:' },
            { title: 'au', img: '<img src="http://ukrpravda.net/Smileys/default/au.gif" class="sm">', bbcode: ':au:' },
            { title: 'av', img: '<img src="http://ukrpravda.net/Smileys/default/av.gif" class="sm">', bbcode: ':av:' },
            { title: 'aw', img: '<img src="http://ukrpravda.net/Smileys/default/aw.gif" class="sm">', bbcode: ':aw:' },
            { title: 'ax', img: '<img src="http://ukrpravda.net/Smileys/default/ax.gif" class="sm">', bbcode: ':ax:' },
            { title: 'ay', img: '<img src="http://ukrpravda.net/Smileys/default/ay.gif" class="sm">', bbcode: ':ay:' },
            { title: 'az', img: '<img src="http://ukrpravda.net/Smileys/default/az.gif" class="sm">', bbcode: ':az:' },
            { title: 'ba', img: '<img src="http://ukrpravda.net/Smileys/default/ba.gif" class="sm">', bbcode: ':ba:' },
            { title: 'bb', img: '<img src="http://ukrpravda.net/Smileys/default/bb.gif" class="sm">', bbcode: ':bb:' },
            { title: 'bc', img: '<img src="http://ukrpravda.net/Smileys/default/bc.gif" class="sm">', bbcode: ':bc:' },
            { title: 'bd', img: '<img src="http://ukrpravda.net/Smileys/default/bd.gif" class="sm">', bbcode: ':bd:' },
            { title: 'be', img: '<img src="http://ukrpravda.net/Smileys/default/be.gif" class="sm">', bbcode: ':be:' },
            { title: 'bf', img: '<img src="http://ukrpravda.net/Smileys/default/bf.gif" class="sm">', bbcode: ':bf:' },
            { title: 'bg', img: '<img src="http://ukrpravda.net/Smileys/default/bg.gif" class="sm">', bbcode: ':bg:' },
            { title: 'bh', img: '<img src="http://ukrpravda.net/Smileys/default/bh.gif" class="sm">', bbcode: ':bh:' },
            { title: 'bi', img: '<img src="http://ukrpravda.net/Smileys/default/bi.gif" class="sm">', bbcode: ':bi:' },
            { title: 'agree', img: '<img src="http://ukrpravda.net/Smileys/default/agree.gif" class="sm">', bbcode: ':agree:' },
            { title: 'bj', img: '<img src="http://ukrpravda.net/Smileys/default/bj.gif" class="sm">', bbcode: ':bj:' },
            { title: 'bch', img: '<img src="http://ukrpravda.net/Smileys/default/bch.gif" class="sm">', bbcode: ':bch:' },
            { title: 'bk', img: '<img src="http://ukrpravda.net/Smileys/default/bk.gif" class="sm">', bbcode: ':bk:' },
            { title: 'bpj', img: '<img src="http://ukrpravda.net/Smileys/default/bpj.gif" class="sm">', bbcode: ':bpj:' },
            { title: 'bl', img: '<img src="http://ukrpravda.net/Smileys/default/bl.gif" class="sm">', bbcode: ':bl:' },
            { title: 'bpk', img: '<img src="http://ukrpravda.net/Smileys/default/bpk.gif" class="sm">', bbcode: ':bpk:' },
            { title: 'bm', img: '<img src="http://ukrpravda.net/Smileys/default/bm.gif" class="sm">', bbcode: ':bm:' },
            { title: 'bpl', img: '<img src="http://ukrpravda.net/Smileys/default/bpl.gif" class="sm">', bbcode: ':bpl:' },
            { title: 'bn', img: '<img src="http://ukrpravda.net/Smileys/default/bn.gif" class="sm">', bbcode: ':bn:' },
            { title: 'bpm', img: '<img src="http://ukrpravda.net/Smileys/default/bpm.gif" class="sm">', bbcode: ':bpm:' },
            { title: 'bo', img: '<img src="http://ukrpravda.net/Smileys/default/bo.gif" class="sm">', bbcode: ':bo:' },
            { title: 'bpn', img: '<img src="http://ukrpravda.net/Smileys/default/bpn.gif" class="sm">', bbcode: ':bpn:' },
            { title: 'bp', img: '<img src="http://ukrpravda.net/Smileys/default/bp.gif" class="sm">', bbcode: ':bp:' },
            { title: 'bpo', img: '<img src="http://ukrpravda.net/Smileys/default/bpo.gif" class="sm">', bbcode: ':bpo:' },
            { title: 'bq', img: '<img src="http://ukrpravda.net/Smileys/default/bq.gif" class="sm">', bbcode: ':bq:' },
            { title: 'bpp', img: '<img src="http://ukrpravda.net/Smileys/default/bpp.gif" class="sm">', bbcode: ':bpp:' },
            { title: 'br', img: '<img src="http://ukrpravda.net/Smileys/default/br.gif" class="sm">', bbcode: ':br:' },
            { title: 'buba', img: '<img src="http://ukrpravda.net/Smileys/default/buba.gif" class="sm">', bbcode: ':buba:' },
            { title: 'bs', img: '<img src="http://ukrpravda.net/Smileys/default/bs.gif" class="sm">', bbcode: ':bs:' },
            { title: 'by', img: '<img src="http://ukrpravda.net/Smileys/default/by.gif" class="sm">', bbcode: ':by:' },
            { title: 'bt', img: '<img src="http://ukrpravda.net/Smileys/default/bt.gif" class="sm">', bbcode: ':bt:' },
            { title: 'bx', img: '<img src="http://ukrpravda.net/Smileys/default/bx.gif" class="sm">', bbcode: ':bx:' },
            { title: 'bu', img: '<img src="http://ukrpravda.net/Smileys/default/bu.gif" class="sm">', bbcode: ':bu:' },
            { title: 'cm', img: '<img src="http://ukrpravda.net/Smileys/default/cm.gif" class="sm">', bbcode: ':cm:' },
            { title: 'bv', img: '<img src="http://ukrpravda.net/Smileys/default/bv.gif" class="sm">', bbcode: ':bv:' },
            { title: 'cp', img: '<img src="http://ukrpravda.net/Smileys/default/cp.gif" class="sm">', bbcode: ':cp:' },
            { title: 'bw', img: '<img src="http://ukrpravda.net/Smileys/default/bw.gif" class="sm">', bbcode: ':bw:' },
            { title: 'cs', img: '<img src="http://ukrpravda.net/Smileys/default/cs.gif" class="sm">', bbcode: ':cs:' },
            { title: 'dl', img: '<img src="http://ukrpravda.net/Smileys/default/dl.gif" class="sm">', bbcode: ':dl:' },
            { title: 'dn', img: '<img src="http://ukrpravda.net/Smileys/default/dn.gif" class="sm">', bbcode: ':dn:' },
            { title: 'dn2', img: '<img src="http://ukrpravda.net/Smileys/default/dn2.gif" class="sm">', bbcode: ':dn2:' },
            { title: 'Dopovid', img: '<img src="http://ukrpravda.net/Smileys/default/Dopovid.gif" class="sm">', bbcode: ':Dopovid:' },
            { title: 'fl', img: '<img src="http://ukrpravda.net/Smileys/default/fl.gif" class="sm">', bbcode: ':fl:' },
            { title: 'fm', img: '<img src="http://ukrpravda.net/Smileys/default/fm.gif" class="sm">', bbcode: ':fm:' },
            { title: 'fn', img: '<img src="http://ukrpravda.net/Smileys/default/fn.gif" class="sm">', bbcode: ':fn:' },
            { title: 'friends', img: '<img src="http://ukrpravda.net/Smileys/default/friends.gif" class="sm">', bbcode: ':friends:' },
            { title: 'fuck', img: '<img src="http://ukrpravda.net/Smileys/default/fuck.gif" class="sm">', bbcode: ':fuck:' },
            { title: 'gb', img: '<img src="http://ukrpravda.net/Smileys/default/gb.gif" class="sm">', bbcode: ':gb:' },
            { title: 'gw', img: '<img src="http://ukrpravda.net/Smileys/default/gw.gif" class="sm">', bbcode: ':gw:' },
            { title: 'hc', img: '<img src="http://ukrpravda.net/Smileys/default/hc.gif" class="sm">', bbcode: ':hc:' },
            { title: 'jg', img: '<img src="http://ukrpravda.net/Smileys/default/jg.gif" class="sm">', bbcode: ':jg:' },
            { title: 'kg', img: '<img src="http://ukrpravda.net/Smileys/default/kg.gif" class="sm">', bbcode: ':kg:' },
            { title: 'kg2', img: '<img src="http://ukrpravda.net/Smileys/default/kg2.gif" class="sm">', bbcode: ':kg2:' },
            { title: 'kk', img: '<img src="http://ukrpravda.net/Smileys/default/kk.gif" class="sm">', bbcode: ':kk:' },
            { title: 'kz', img: '<img src="http://ukrpravda.net/Smileys/default/kz.gif" class="sm">', bbcode: ':kz:' },
            { title: 'meowth', img: '<img src="http://ukrpravda.net/Smileys/default/meowth.gif" class="sm">', bbcode: ':meowth:' },
            { title: 'no2', img: '<img src="http://ukrpravda.net/Smileys/default/no2.gif" class="sm">', bbcode: ':no2:' },
            { title: 'not_i', img: '<img src="http://ukrpravda.net/Smileys/default/not_i.gif" class="sm">', bbcode: ':not_i:' },
            { title: 'patsak', img: '<img src="http://ukrpravda.net/Smileys/default/patsak.gif" class="sm">', bbcode: ':patsak:' },
            { title: 'pioneer', img: '<img src="http://ukrpravda.net/Smileys/default/pioneer.gif" class="sm">', bbcode: ':pioneer:' },
            { title: 'pleasantry', img: '<img src="http://ukrpravda.net/Smileys/default/pleasantry.gif" class="sm">', bbcode: ':pleasantry:' },
            { title: 'pooh', img: '<img src="http://ukrpravda.net/Smileys/default/pooh.gif" class="sm">', bbcode: ':pooh:' },
            { title: 'pooh_birth_day', img: '<img src="http://ukrpravda.net/Smileys/default/pooh_birth_day.gif" class="sm">', bbcode: ':pooh_birth_day:' },
            { title: 'pooh_door', img: '<img src="http://ukrpravda.net/Smileys/default/pooh_door.gif" class="sm">', bbcode: ':pooh_door:' },
            { title: 'pooh_go', img: '<img src="http://ukrpravda.net/Smileys/default/pooh_go.gif" class="sm">', bbcode: ':pooh_go:' },
            { title: 'pooh_honey', img: '<img src="http://ukrpravda.net/Smileys/default/pooh_honey.gif" class="sm">', bbcode: ':pooh_honey:' },
            { title: 'pooh_lol', img: '<img src="http://ukrpravda.net/Smileys/default/pooh_lol.gif" class="sm">', bbcode: ':pooh_lol:' },
            { title: 'pooh_on_ball', img: '<img src="http://ukrpravda.net/Smileys/default/pooh_on_ball.gif" class="sm">', bbcode: ':pooh_on_ball:' },
            { title: 'punish', img: '<img src="http://ukrpravda.net/Smileys/default/punish.gif" class="sm">', bbcode: ':punish:' },
            { title: 'queen', img: '<img src="http://ukrpravda.net/Smileys/default/queen.gif" class="sm">', bbcode: ':queen:' },
            { title: 'read', img: '<img src="http://ukrpravda.net/Smileys/default/read.gif" class="sm">', bbcode: ':read:' },
            { title: 'russian', img: '<img src="http://ukrpravda.net/Smileys/default/russian.gif" class="sm">', bbcode: ':russian:' },
            { title: 'scenic', img: '<img src="http://ukrpravda.net/Smileys/default/scenic.gif" class="sm">', bbcode: ':scenic:' },
            { title: 'shout', img: '<img src="http://ukrpravda.net/Smileys/default/shout.gif" class="sm">', bbcode: ':shout:' },
            { title: 'snooks', img: '<img src="http://ukrpravda.net/Smileys/default/snooks.gif" class="sm">', bbcode: ':snooks:' },
            { title: 'snoozer_05', img: '<img src="http://ukrpravda.net/Smileys/default/snoozer_05.gif" class="sm">', bbcode: ':snoozer_05:' },
            { title: 'snoozer_09', img: '<img src="http://ukrpravda.net/Smileys/default/snoozer_09.gif" class="sm">', bbcode: ':snoozer_09:' },
            { title: 'spruce_up', img: '<img src="http://ukrpravda.net/Smileys/default/spruce_up.gif" class="sm">', bbcode: ':spruce_up:' },
            { title: 'stink', img: '<img src="http://ukrpravda.net/Smileys/default/stink.gif" class="sm">', bbcode: ':stink:' },
            { title: 'suicide2', img: '<img src="http://ukrpravda.net/Smileys/default/suicide2.gif" class="sm">', bbcode: ':suicide2:' },
            { title: 'superman2', img: '<img src="http://ukrpravda.net/Smileys/default/superman2.gif" class="sm">', bbcode: ':superman2:' },
            { title: 'take_example', img: '<img src="http://ukrpravda.net/Smileys/default/take_example.gif" class="sm">', bbcode: ':take_example:' },
            { title: 'tease', img: '<img src="http://ukrpravda.net/Smileys/default/tease.gif" class="sm">', bbcode: ':tease:' },
            { title: 'telephone', img: '<img src="http://ukrpravda.net/Smileys/default/telephone.gif" class="sm">', bbcode: ':telephone:' },
            { title: 'this', img: '<img src="http://ukrpravda.net/Smileys/default/this.gif" class="sm">', bbcode: ':this:' },
            { title: 'to_keep_order', img: '<img src="http://ukrpravda.net/Smileys/default/to_keep_order.gif" class="sm">', bbcode: ':to_keep_order:' },
            { title: 'tommy', img: '<img src="http://ukrpravda.net/Smileys/default/tommy.gif" class="sm">', bbcode: ':tommy:' },
            { title: 'tongue', img: '<img src="http://ukrpravda.net/Smileys/default/tongue.gif" class="sm">', bbcode: ':tongue:' },
            { title: 'triniti', img: '<img src="http://ukrpravda.net/Smileys/default/triniti.gif" class="sm">', bbcode: ':triniti:' },
            { title: 'umnik', img: '<img src="http://ukrpravda.net/Smileys/default/umnik.gif" class="sm">', bbcode: ':umnik:' },
            { title: 'victory', img: '<img src="http://ukrpravda.net/Smileys/default/victory.gif" class="sm">', bbcode: ':victory:' },
            { title: 'vinsent', img: '<img src="http://ukrpravda.net/Smileys/default/vinsent.gif" class="sm">', bbcode: ':vinsent:' },
            { title: 'warning2', img: '<img src="http://ukrpravda.net/Smileys/default/warning2.gif" class="sm">', bbcode: ':warning2:' },
            { title: 'Zabaneno', img: '<img src="http://ukrpravda.net/Smileys/default/Zabaneno.gif" class="sm">', bbcode: ':Zabaneno:' },
            { title: 'alen', img: '<img src="http://ukrpravda.net/Smileys/default/alen.gif" class="sm">', bbcode: ':alen:' },
            { title: 'consul', img: '<img src="http://ukrpravda.net/Smileys/default/consul.gif" class="sm">', bbcode: ':consul:' },
            { title: 'popcorm1', img: '<img src="http://ukrpravda.net/Smileys/default/popcorm1.gif" class="sm">', bbcode: ':popcorm1:' },
            { title: 'popcorn', img: '<img src="http://ukrpravda.net/Smileys/default/popcorn.gif" class="sm">', bbcode: ':popcorn:' }
        ],
        applyDropdownHover = function () {
            $('[data-hover="dropdown"]').dropdownHover();
        },
        setPageTopOffset = function () {
            $("body").css("margin-top", $("div.top-page-header-container").height());
        },
        getPageSubtitleLinks = function () {
            var items = $('#main_content_section > div.navigate_section:first a').toArray();
            var res = [];
            for (var i = 1; i < items.length - 1; i++) {
                res.push(items[i]);
            }
            return res;
        },
        pageSubtitleLinks = getPageSubtitleLinks(),
	    getDropDown = function (el, dropdown) {
	        return $('<span class="dropdown"></span>')
				    .append($('<span class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true"></span>').append(el))
				    .append($('<div class="dropdown-menu"></div>').append(dropdown));
	    },
        getPagerPages = function (el) {
            var cur = el.find("strong").text();
            var res = [];

            if (cur) {

                var last = el.children().last().text();
                if (last && last != "1") {
                    var a = el.children().toArray();
                    for (var i = 0; i < a.length; i++) {
                        var item = $(a[i]);
                        if (item.prop("tagName") == "A") {
                            res.push($("<a class='navPages'>" + item.text() + "</a>").attr("href", item.attr("href")));
                        } else if (item.prop("tagName") == "STRONG") {
                            res.push($("<strong class='navPages'>" + item.text() + "</strong>"));
                        } else if (item.prop("tagName") == "SPAN") {
                            res.push(item);
                        }
                    };
                }
            }
            return res;
        },
        getPagerPrevPage = function (a) {
            var res = null;
            for (var i = 0; i < a.length; i++) {
                var item = a[i];
                if ($(item).prop("tagName") == "STRONG")
                    return res;
                res = item;
            }
            return null;
        },
        getPagerNextPage = function (a) {
            var res = null;
            for (var i = 0; i < a.length; i++) {
                var item = a[i];
                if (res)
                    return item;

                if ($(item).prop("tagName") == "STRONG")
                    res = item;
            }
            return null;
        },
        getPager = function (pn) {
            var cur = pn.find("strong").text();
            var pages = getPagerPages(pn);

            if (cur) {
                var last = pn.children().last().text();

                if (last && last != "1") {
                    var div = $("<div class='p-pager pull-right'></div>")
                        .append("<span class='p-current'>Сторінка " + cur + " з " + last + "</span><span class='p-pages-caption'> Сторінки: </span>");


                    var pp = getPagerPrevPage(pages);
                    if (pp)
                        div.append($("<a class='navPages pager-prev-page'>Попередня</a>").attr("href", $(pp).attr("href")));

                    div.append(pages);

                    var pn = getPagerNextPage(pages);
                    if (pn) {
                        div.append($("<a class='navPages pager-next-page'>Наступна</a>").attr("href", $(pn).attr("href")));
                    }

                    return div;
                }
            }

            return $(null);
        },

        getNavHeader = function (el, addLink, url) {
            var a = pageSubtitleLinks.length > 0 ? $(pageSubtitleLinks[pageSubtitleLinks.length - 1]) : null;
            var linkUrl = url ? url : (a ? a.attr("href") : null);

            return $("<div class='thread-header'></div>")
                .append(addLink && linkUrl ? $("<a class='goto-list'>" + addLink + "</a>").attr("href", linkUrl) : $())
                .append(el.find("div.buttonlist a"))
                .append(getPager(el.find("div.pagelinks")))
                .append($('<span class="clearfix"></span>'))

        },
        getPageTitle = function () {
            return $("#forumposts > div.cat_bar > h3.catbg").text().substr(22);
        },
        getPageSubtitle = function () {
            var items = $('#main_content_section > div.navigate_section:first a').toArray();
            var res = [];
            for (var i = 1; i < items.length - 1; i++) {
                if (i > 1 && i < items.length - 1)
                    res.push($("<span> &#xbb; </span>"));

                if (i == 1) {
                    var uMenu = getDropDown(items[i], $("div.user > ul.reset"));
                    res.push(uMenu);
                }
                else
                    res.push(items[i]);
            }
            return res;
        },
	    buildPageHeader = function (headers) {
	        var div = $('<div class="top-page-header-container navbar-fixed-top"></div>');
	        $("body").prepend(div);

	        for (var i = 0; i < headers.length; i++) {
	            div.append($("<div class='top-page-header'></div>").append(headers[i]).append($('<div class="clearfix"></div>')));
	        }
	    },

        //----------------

        transformTopic = function () {
            var _topicElem = this,

            transformQuotes = function () {
                $("blockquote.bbc_standard_quote").attr("class", "img-rounded");
                $("blockquote.bbc_alternate_quote").attr("class", "img-rounded");
            },
            transformQuoteAuthor = function (el) {
                var m = el.html().match(/\>\u0426\u0438\u0442\u0430\u0442\u0430\u003a(.+?)\u0432\u0456\u0434\s*/);
                if (m) {
                    el.parent().prepend($("<div>" + m[1] + "</div>"));
                    el.hide();
                }
            },
            transformQuoteAuthors = function () {
                $("div.topslice_quote").each(function () { transformQuoteAuthor($(this)); });
            },
            createPostHeader = function (el) {
                var poster = el.find("div.poster > h4 > a");
                var date = el.find("div.postarea > div.flow_hidden > div.keyinfo > div.smalltext")
                    .text()
                    .replace(/\xbb|\xab|\s:/g, "")
                    .replace(/Reply\s#\d+/g, "")
                    .replace(/^\s+|\s+\z/g, "");

                var p = el.find("div.poster");
                p.find("h4").hide();

                var dd = getDropDown($("<a></a>").attr("href", poster.attr("href")).text(poster.text()), p);
                el.prepend(
                    $("<div class='post-header'></div>")
                        .append(
                            dd
                        )
                        .append($("<div class='pull-right'></span>").text(date))
                );
            },
            createPostFooter = function (el) {
                var q = el.find(".quote_button a");
                var modifyButtons = el.find("img.modifybutton");

                var mlinks = el.find("div.reportlinks a");
                var postId = el.find("div.inner").attr("id");

                if (postId)
                    postId = postId.replace("msg_", "");

                var postNo = el.find("div.keyinfo div.smalltext").text().match(/Reply\s#(\d+)/);
                if (postNo)
                    postNo = postNo[1];

                modifyButtons.hide();
                var mm = modifyButtons.map(function () {
                    return $("<a></a>")
                       .attr("href", "javascript:" + $(this).attr("onclick"))
                       .text($(this).attr("title"))
                }).toArray();

                el.append(
                    $("<div class='post-footer'></div>")
                        .append(q)
                        .append(mm)
                        .append(
                            $("<div class='pull-right'></div>")
                                .append(mlinks)
                                .append(postNo && postId ? $("<a></a>").attr("href", location.href + "#msg" + postId).text("#" + postNo) : $())
                            )
                );

            },
            transformPost = function (el) {
                createPostHeader(el);
                createPostFooter(el);

                var post = el.find("div.postarea");
                el.find("div.moderatorbar > div.modified").appendTo(post);
                el.find("div.moderatorbar > div.signature").appendTo(post);
            },
            transformPosts = function () {
                $("div.post_wrapper").each(function () { transformPost($(this)) });

                $("div.postarea > div.flow_hidden").hide();
                $("div.post_wrapper > div.poster").hide();
                $("div.post_wrapper > div.moderatorbar").hide();
                $("span.topslice").height(0);

                $("span.botslice").each(function () {
                    $("<div class='clearfix'></div>").insertBefore($(this));
                    $(this).hide();
                });
                $("span.topslice").each(function () {
                    $("<div class='clearfix'></div>").insertBefore($(this));
                    $(this).hide();
                });
            },
            transformHeader = function () {

                buildPageHeader([
                    $("<div class='page-header2'></div>")
                        .append($("<div class='thread-subtitle'></div>").append(getPageSubtitle()).addClass("pull-left"))
                        .append($("div#main_menu").attr("class", "pull-right")),

                    $("<div class='thread-title'></div>").text(getPageTitle()),

		            getNavHeader($("div.pagesection:first"), "Список тем")
                ]);

                $("#header").hide();

                $($("#header").children()[3]).insertAfter("<th>Автор</th>");

                frame.find("#main_content_section > div.navigate_section").hide();
                frame.find("#main_content_section > div.pagesection").hide();
                frame.find("#forumposts > div.cat_bar").hide();
                frame.find("#poll > div.cat_bar").hide();
            },
            transformFooter = function () {

                $("#forumposts").append(getNavHeader($("div.pagesection:last"), "Список тем"));
                $("#quickreplybox > div:first").hide();
                $("#quickreplybox").prepend('<a href="javascript:oQuickReply.swap();">Швидка відповідь</a>');
            },
            fixNewAnchor = function () {
                var anew = $("#new");
                if (anew && anew.length) {
                    var _topOffset = $("div.top-page-header-container").height();

                    anew.css("margin-top", _topOffset * -1)
                       .css("height", _topOffset)
                       .css("display", "block")
                       .css("visibility", "hidden");

                    var a = anew.nextAll().toArray();
                    for (var i = 0; i < a.length; i++) {
                        var item = $(a[i]);
                        var postHeader = item.find("div.post-header");
                        if (postHeader && postHeader.length) {
                            postHeader.find("div.pull-right").css("text-align", "right").append("<br/><span class='new-msg'>Нове</span>");
                        }
                    }
                }
            },
            scrollToNewAnchor = function () {
                var anew = $("#new");
                if (anew && anew.length) {
                    $('html,body').animate({
                        scrollTop: anew.offset().top
                    }, 300);
                }
            },
            buildPostEditorSmiles = function () {
                $("#modal_editor_dialog .smile-list").show();

                if ($("#modal_editor_dialog .smile-list img").length > 27)
                    return;

                var insertSmile = function (smile) {
                    $("#modal_editor").insertAtCursor($(smile).attr("alt") + " ");
                }
                var more = $("#modal_editor_dialog .smile-list img").length == 27;
                if (!more)
                    $("#modal_editor_dialog .smile-list-button span").text("Ще смайлів");

                var ss = [];
                var i = 0;
                for (var s in allSmiles) {
                    if (!more) {
                        var el = $(allSmiles[s].img).attr("alt", allSmiles[s].bbcode);
                        el.click(function () { insertSmile($(this)) });
                        ss.push(el);
                    }
                    i++;
                    if (i == 27) {
                        if (!more)
                            break;

                        more = false;
                        $("#modal_editor_dialog .smile-list-button").remove();
                        $("#modal_editor_dialog .smile-list").css("height", 100).css("overflow-y", "scroll");
                    }
                }
                $("#modal_editor_dialog .smile-list").append(ss);

            },
            preparePost = function (mode, iframe) {
                var phpMaxInt = 2147483647;
                var txt = $("#modal_editor").bbcode();
                
                if (txt.replace(" ", "") == ""){
                    alert("Введіть текст повідомлення");
                    return false;
                }
                
                $("#postmodify input[name=last_msg]").val(phpMaxInt);
                $("#postmodify textarea[name=message]").val(txt);

                if (mode == 1) {
                    $("#postmodify").attr("target", "");
                } else if (mode == 2) {
                    $("#postmodify").attr("target", "_blank");
                } else {
                    $("#postmodify").attr("target", iframe.attr("name"));
                }
                
                return true;

            },
            pleaseWaitTimer = null,
            pleaseWait = function (title, onTimeout, timeout) {
                if (title === null || title === false) {
                    $("#please-wait").modal("hide");
                    if (pleaseWaitTimer)
                        clearTimeout(pleaseWaitTimer);
                    pleaseWaitTimer = null;
                }
                var html = ' \
                    <div class="modal hide" id="please_wait_dlg" data-backdrop="static" data-keyboard="false"> \
                        <div class="modal-header"> \
                            <h1>Processing...</h1>\
                        </div> \
                        <div class="modal-body"> \
                            <div class="progress progress-striped active"> \
                                <div class="bar" style="width: 100%;"></div> \
                            </div> \
                        </div> \
                    </div>';
                var dlg = $("#please_wait_dlg");
                if (dlg.length == 0) {
                    $("body").append(html);
                    dlg = $("#please_wait_dlg");
                }

                if (!title)
                    title = "Працюю";

                title += " ...";

                dlg.find("h1").text(title);

                dlg.modal();

                if (typeof (onTimeout) === "function") {
                    setTimeout(function () {
                        pleaseWait(false);
                        onTimeout();
                    }, timeout && parseInt(timeout) > 0 ? parseInt(timeout) : 1000 * 20);
                }
            },
            postingMessageInterval = null;
            showWaitMessagePosted = function (mode) {
                
                if (postingMessageInterval != null)
                    clearInterval(postingMessageInterval);
                postingMessageInterval = null;
                $("#posting_message").hide();
                
                if (mode === false || mode != 'hide'){
                    var html = "<div id='posting_message' style='padding:5px;left:0px;bottom:0px;background:#fff;color:#F00;font-weight2:bold;position:fixed;'>Повідомлення відправляється ...</div>";
                    var div = $("#posting_message");
                    if(div.length==0){
                        $("body").append(html);
                    }

                    $("#posting_message").show();
                    postingMessageInterval = setInterval(function() {
                        $("#posting_message").fadeOut(500);
                        $("#posting_message").fadeIn(500);                    
                    }, 1000);
                }
            },
            sendPostPreview = function () {
                var d = $('#modal_editor_dialog');
                var mode = parseInt(d.find(".post-what-to-do-selected").attr("data-value"));
                if (mode != 1 && mode != 2)
                    mode = 1;
                
                if (!preparePost(mode))
                    return;

                $("#postmodify input[name=preview]").trigger("click");

                d.modal('hide');
            },
            sendPost = function () {
                var d = $('#modal_editor_dialog');
                var mode = parseInt(d.find(".post-what-to-do-selected").attr("data-value"));
                if (mode != 0 && mode != 1 && mode != 2)
                    mode = 0;

                var iframe = null;
                if (mode == 0) {
                    var n = 'post_iframe_' + $("iframe").length + 1;
                    iframe = $('<iframe name="' + n + '" id="' + n + '" style="visibility:hidden"></iframe>');
                    $("body").append(iframe);
                }

                if (!preparePost(mode, iframe))
                    return;

                $('#modal_editor_dialog').modal('hide');   

                $("#postmodify input[name=post]").trigger("click");
                
                if (mode == 0) {
                    //showWaitMessagePosted();
                    
                    $(iframe).ready(function () {
                        //todo: find iframe elements to confirm message is posted
                        //showWaitMessagePosted(flase);
                    });
                }
            },
            buildPostEditor = function () {
                var html = '\
                    <div class="modal fade bs-example-modal-lg" id="modal_editor_dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"> \
                      <div class="modal-dialog modal-lg"> \
                        <div class="modal-content"> \
                          <div class="modal-header"> \
                            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button> \
                            <h4 class="modal-title">Modal title</h4> \
                          </div> \
                          <div class="modal-body"> \
                             <textarea id="modal_editor" style="height:250px"></textarea> \
                             <div class="smile-list" style="text-align:center;border:1px solid #E5E5E5;border-top:0px none;display:none"></div> \
                             <div class="smile-list-button" style="text-align:center;font-weight:normal;padding-top:5px;cursor:default"><span class="badge">Смайли</span></div> \
                          </div> \
                          <div class="modal-footer"> \
                            <div class="dropdown" style="float:left"> \
                              <button type="button" id="post_what_to_do_label" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\
                                <span data-value="0" class="post-what-to-do-selected">Неперезавантажувати сторінку</span> <span class="caret"></span>\
                              </button>\
                              <ul class="dropdown-menu post-what-to-do" role="menu"> \
                                <li><a tabindex="-1" data-toggle="dropdown" data-value="0" data-label="Неперезавантажувати сторінку" href="javascript:void(0)">Відправити та не перезавантажувати цю сторінку</a></li> \
                                <li><a tabindex="-1" data-toggle="dropdown" data-value="1" data-label="Перезавантажити сторінку" href="javascript:void(0)">Відправити та перезавантажити цю сторінку</a></li> \
                                <li><a tabindex="-1" data-toggle="dropdown" data-value="2" data-label="В нове вікно" href="javascript:void(0)">Відправити в нове вікно</a></li> \
                              </ul> \
                            </div> \
                            <a type="button" class="btn btn-default std-editor">Стандартний редактор</a> \
                            <button type="button" class="btn btn-default btn-post-preview">Попередній перегляд</button> \
                            <button type="button" class="btn btn-primary">Відправити</button> \
                          </div> \
                        </div> \
                      </div> \
                    </div>';
                var myfunc = function (command, value, queryState) {
                    // command - BBcode name
                    // value - value
                    // queryState - is currently BBcode active

                    //this.wbbInsertCallback(command,value) // Insert values ​​into the editor, value - to insert the parameters
                    //this.wbbRemoveCallback(command); // delete the current BB code preserving content
                    //this.wbbRemoveCallback(command,true) - BB code deletes the current contents with
                    //this.showModal.call(this,command,opt.modal,queryState); //Show a modal window through WysiBB
                    //opt.modal.call(this,command,opt.modal,queryState); //Display custom modal window

                    //In our example, we insert a quote
                    this.wbbInsertCallback(command, { AUTHOR: "Автор", SELTEXT: "Текст цитати" })
                    //If you do not specify a value seltext - will be taken the currently selected text

                }
                var d = $(html);
                $("body").append(d);

                $("#modal_editor_dialog .smile-list-button").click(function () { buildPostEditorSmiles() });

                d.find(".btn-primary").click(function () { sendPost() });
                
                d.find(".btn-post-preview").click(function () { sendPostPreview() });

                //set what to do on post
                d.find(".post-what-to-do a").each(function () {
                    $(this).click(function (e) {
                        //e.preventDefault();
                        d.find(".post-what-to-do-selected")
                            .text($(this).attr("data-label"))
                            .attr("data-value", $(this).attr("data-value"));
                        $.cookie("post-what-to-do", $(this).attr("data-value"), { expires: 365 });
                        $('[data-toggle="dropdown"]').parent().removeClass('open');
                        return false;
                    })
                });

                var pwtd = parseInt($.cookie("post-what-to-do"));
                if (pwtd > 0 && pwtd < 3) {
                    var pwtds = d.find(".post-what-to-do a:eq(" + pwtd + ")");
                    if (pwtds.length) {
                        d.find(".post-what-to-do-selected")
                            .text(pwtds.attr("data-label"))
                            .attr("data-value", pwtds.attr("data-value"));
                        $.cookie("post-what-to-do", pwtd, { expires: 365 });
                    }
                }

                $("#modal_editor").css("max-height", window.innerHeight * 0.4);

                var options = {
                    lang: "ua",
                    autoresize: false,
                    onlyBBmode: true,
                    buttons: "bold,italic,underline,strike,sup,sub,|,img,video,link,|,fontcolor,fontsize,fontfamily,|,justifyleft,justifycenter,justifyright,|,quote,removeFormat",
                    allButtons: {
                        quote: {
                            title: "Цитата",
                            buttonHTML: '<span class="fonticon ve-tlb-quote1">\uE00c</span>',
                            cmd: myfunc, //Custom handler
                            transform: {
                                '<div style="margin-bottom:10px"><div class="quoteheader">{AUTHOR}:</div><blockquote class="img-rounded" data-topic="{TOPIC}" data-date="{DATE}">{SELTEXT}</blockquote></div>': '[quote author={AUTHOR} link=topic={TOPIC} date={DATE}]{SELTEXT}[/quote]'
                            }
                        }
                    },
                    smileList: allSmiles
                };

                $("#modal_editor").wysibb(options);
                return d;

            },
            showPostEditor = function (a) {
                var d = $("#modal_editor_dialog");
                if (d.length == 0) {
                    d = buildPostEditor();
                }

                var t = $(".thread-title:first").text();
                if (t) {
                    if (t.lastIndexOf("(") > -1)
                        t = t.substr(0, t.lastIndexOf("(") - 1);
                }
                else t = "Тема";
                d.find('.modal-title').text(t);

                var url = a.attr("href");
                if (url) {
                    var hideProgress = function () {

                    };
                    $("#modal_editor").bbcode("");
                    if (url.indexOf(";quote=") > -1) {
                        $("#modal_editor").bbcode("Зачекайте, завантажується цитата ...");
                        var jqxhr = $.get(url, function (data) {
                            var re = /<textarea[^>]+?>([\s\S]+?)<\/textarea>/;
                            var m = re.exec(data);

                            if (m != null) {
                                $("#modal_editor").bbcode(m[1] + "\r\n");
                                $("#modal_editor").focus();
                            }
                        })
                        .fail(function () {
                            hideProgress();
                        })
                        .always(function () {
                            hideProgress();
                        });
                    }
                    d.find(".std-editor").attr("href", url);

                    d.modal();
                }


            },
            embedEditor = function () {
                $("a").each(function () {
                    var a = $(this);
                    if (a && a.length && a.attr("href") && a.attr("href").indexOf("action=post;") > -1) {
                        $(this).attr("onclick", null);
                        $(this).click(function (e) {
                            e.preventDefault();
                            showPostEditor($(this));
                            return false;
                        });
                    }
                });
            },
            buildFooterFromLinks = function (el) {
                if (el) {
                    var links = el.find("a");
                    if (links.length) {
                        el.hide();
                        return $("<div class='thread-header'></div>").append(links).insertBefore(el);

                    }
                }
                return $();
            }

            transformHeader();

            transformFooter();
            transformQuoteAuthors();

            transformQuotes();

            transformPosts();
            embedEditor();
            buildFooterFromLinks($("#pollmoderation")).css("margin-bottom", 10);
            buildFooterFromLinks($("#moderationbuttons")).css("margin-bottom", 10);

            $("<div class='clearfix'></div>").insertBefore($("#main_content_section"));

            setTimeout(function () {
                setPageTopOffset();
                applyDropdownHover();

                fixNewAnchor();
                scrollToNewAnchor();
            }, 500);

        },

        //--------------------

        transformForum = function () {

            var _forumElem = this,

            transformHeader = function () {
                buildPageHeader([
                    $("<div class='page-header2'></div>")
                        .append($("<div class='thread-subtitle'></div>").append(getPageSubtitle()).addClass("pull-left"))
                        .append($("div#main_menu").attr("class", "pull-right")),

		            getNavHeader($("div.pagesection:first"), "Список форумів", "/index.php")
                ]);

                $("#header").hide();

                var trs = $("#messageindex > table > thead > tr:first");
                trs.find("th:first").hide();
                var sec = trs.find("th:nth-child(2)");
                var c1Title = sec.html().split(" / ");
                sec.html(c1Title[0]);

                trs.find("th:nth-child(3)").addClass("replies");
                $("<th class='author'></th>").append(c1Title[1]).insertAfter(trs.find("th:nth-child(3)"));

                frame.find("#main_content_section > div.navigate_section").hide();
                frame.find("#main_content_section > div.pagesection").hide();
                frame.find("#forumposts > div.cat_bar").hide();
            },
            transformFooter = function () {

                getNavHeader($("div.pagesection:last"), "Список форумів", "/index.php").insertAfter($("#messageindex"));
                $("#topic_icons > div.description > p.smalltext").hide();
            },
            formatTitle = function (el, img) {
                if (el) {
                    var prefix = "";
                    if (img.indexOf("sticky") > -1)
                        prefix = "<b>Замітка:</b> ";
                    else if (img.indexOf("poll") > -1)
                        prefix = "Опитування: ";

                    if (prefix) {
                        el.find("a:first").parent().prepend($("<span>" + prefix + " </span>"));
                    }

                    var p = el.find("p");
                    el.find("div").append(p.find("small"));
                    p.remove();

                    var s = el.find("small");
                    s.html(s.html().replace(/\xab/, "<small>(Сторінки: ").replace(/\s*\xbb/, ")</small>"));
                }
            },
            formatReplies = function (el) {
                if (el) {
                    var m = el.text().match(/(\d+)[\s\S]+?(\d+)/);
                    if (m && m[1] && m[2])
                        el.html("<span title='Відповідей / Переглядів'>" + m[1] + " / " + m[2] + "</span>");
                }
            },
            formatLastPost = function (el) {
                if (el) {
                    var html = el.html();
                    var url = $(el.children().first()).attr("href");
                    var idx = html.indexOf("</a>");
                    if (url && idx > -1) {
                        html = html.substr(idx + 4);
                        var s = html.split("<br>");
                        if (s.length == 2)
                            el.html(s[0] + "<br>" + "<a href='" + url + "'>Останнє</a> " + s[1]);
                    }
                }
            },
            extractAuthorHtml = function (el) {
                return el.find("p").find("a:first").html();
            },
            transformThread = function (el) {
                var dd = el.find("td").map(function () { return $(this) });
                if (dd.length >= 5) {

                    dd[0].hide();
                    dd[1].hide();

                    $("<td class='author'></td>").append(dd[2].find("p").find("a:first")).insertAfter($(dd[3]));

                    formatTitle(dd[2], dd[0].find("img").attr("src"));
                    formatReplies(dd[3]);
                    formatLastPost(dd[4]);
                }
            },
            transformNewIcons = function () {
                $("img")
                   .filter(function () { return $(this).attr("src").indexOf("new.gif") > -1 })
                   .each(function () {
                       var a = $(this).closest("a");
                       a.parent().find("a:first").click(function (event) {
                           event.preventDefault();
                           location.href = a.attr("href");
                           return true;
                       });
                       //a.parent().prepend("<span class='new-icon'></span>");
                       a.hide();
                   })
            },
            transformThreads = function () {
                var rows = $("#messageindex > table > tbody > tr");

                rows.each(function (idx) { if ((idx % 2) == 0) $(this).addClass("alt") });
                rows.each(function () { transformThread($(this)) });
            }


            transformHeader();
            transformFooter();
            transformThreads();
            transformNewIcons();


            setTimeout(function () {
                setPageTopOffset();
                applyDropdownHover();
            }, 100);
        },
        addStyle = function (css, base64) {
            var datuURIs = document.createElement("link");
            document.head = document.head || document.getElementsByTagName('head'[0]);
            if (base64)
                datuURIs.href = "data:text/css;base64," + css;
            else
                datuURIs.href = "data:text/css," + css;

            datuURIs.rel = "stylesheet";
            document.head.appendChild(datuURIs);
        },

        addScrollToTop = function () {
            var b = function (c, t) {
                return $('<a type="button" class="btn btn-default glyphicon" data-toggle="tooltip" data-placement="top" style="margin-left:5px;"></a>').addClass("glyphicon-" + c).attr("title", t);
            };

            var buttons = [];

            var bPrev = b("chevron-left", "Попередня");
            buttons.push(bPrev);
            var linkPrev = $("a.pager-prev-page");
            if (linkPrev.length) {
                bPrev.attr("href", linkPrev.attr("href"));
            }
            else bPrev.addClass('disabled');

            var bRefresh = b("refresh", "Перезавантажити");
            buttons.push(bRefresh);
            bRefresh.attr("href", "javascript:location.reload()");

            var bTop = b("chevron-up", "Нагору");
            buttons.push(bTop);
            bTop.click(function (event) {
                event.preventDefault();
                $('html, body').animate({ scrollTop: 0 }, duration);
                return false;
            });

            var bGoToList = b("align-justify", "До списку тем / форумів");
            buttons.push(bGoToList);
            var linkGoTo = $("a.goto-list:first");
            if (linkGoTo.length) {
                bGoToList.attr("href", linkGoTo.attr("href"));
            }
            else bGoToList.addClass('disabled');

            var bNext = b("chevron-right", "Наступна");
            buttons.push(bNext);
            var linkNext = $("a.pager-next-page");
            if (linkNext.length) {
                bNext.attr("href", linkNext.attr("href"));
            }
            else bNext.addClass('disabled');

            var bbt = $('<div class="back-to-top" style="background: #FFF;"></div>').append(buttons);
            $("body").append(bbt);

            var offset = 220;
            var duration = 500;

            $(document).scroll(function () {
                if ($(this).scrollTop() > offset) {
                    bbt.fadeIn(duration);
                } else {
                    bbt.fadeOut(duration);
                }
            });

            $().tooltip();

        }

        var bootstrapCss = "LyohCiAqIEJvb3RzdHJhcCB2My4xLjEgKGh0dHA6Ly9nZXRib290c3RyYXAuY29tKQogKiBDb3B5cmlnaHQgMjAxMS0yMDE0IFR3aXR0ZXIsIEluYy4KICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSkKICovCgovKiEgbm9ybWFsaXplLmNzcyB2My4wLjAgfCBNSVQgTGljZW5zZSB8IGdpdC5pby9ub3JtYWxpemUgKi9odG1se2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWY7LW1zLXRleHQtc2l6ZS1hZGp1c3Q6MTAwJTstd2Via2l0LXRleHQtc2l6ZS1hZGp1c3Q6MTAwJX1ib2R5e21hcmdpbjowfWFydGljbGUsYXNpZGUsZGV0YWlscyxmaWdjYXB0aW9uLGZpZ3VyZSxmb290ZXIsaGVhZGVyLGhncm91cCxtYWluLG5hdixzZWN0aW9uLHN1bW1hcnl7ZGlzcGxheTpibG9ja31hdWRpbyxjYW52YXMscHJvZ3Jlc3MsdmlkZW97ZGlzcGxheTppbmxpbmUtYmxvY2s7dmVydGljYWwtYWxpZ246YmFzZWxpbmV9YXVkaW86bm90KFtjb250cm9sc10pe2Rpc3BsYXk6bm9uZTtoZWlnaHQ6MH1baGlkZGVuXSx0ZW1wbGF0ZXtkaXNwbGF5Om5vbmV9YXtiYWNrZ3JvdW5kOjAgMH1hOmFjdGl2ZSxhOmhvdmVye291dGxpbmU6MH1hYmJyW3RpdGxlXXtib3JkZXItYm90dG9tOjFweCBkb3R0ZWR9YixzdHJvbmd7Zm9udC13ZWlnaHQ6NzAwfWRmbntmb250LXN0eWxlOml0YWxpY31oMXtmb250LXNpemU6MmVtO21hcmdpbjouNjdlbSAwfW1hcmt7YmFja2dyb3VuZDojZmYwO2NvbG9yOiMwMDB9c21hbGx7Zm9udC1zaXplOjgwJX1zdWIsc3Vwe2ZvbnQtc2l6ZTo3NSU7bGluZS1oZWlnaHQ6MDtwb3NpdGlvbjpyZWxhdGl2ZTt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZX1zdXB7dG9wOi0uNWVtfXN1Yntib3R0b206LS4yNWVtfWltZ3tib3JkZXI6MH1zdmc6bm90KDpyb290KXtvdmVyZmxvdzpoaWRkZW59ZmlndXJle21hcmdpbjoxZW0gNDBweH1ocnstbW96LWJveC1zaXppbmc6Y29udGVudC1ib3g7Ym94LXNpemluZzpjb250ZW50LWJveDtoZWlnaHQ6MH1wcmV7b3ZlcmZsb3c6YXV0b31jb2RlLGtiZCxwcmUsc2FtcHtmb250LWZhbWlseTptb25vc3BhY2UsbW9ub3NwYWNlO2ZvbnQtc2l6ZToxZW19YnV0dG9uLGlucHV0LG9wdGdyb3VwLHNlbGVjdCx0ZXh0YXJlYXtjb2xvcjppbmhlcml0O2ZvbnQ6aW5oZXJpdDttYXJnaW46MH1idXR0b257b3ZlcmZsb3c6dmlzaWJsZX1idXR0b24sc2VsZWN0e3RleHQtdHJhbnNmb3JtOm5vbmV9YnV0dG9uLGh0bWwgaW5wdXRbdHlwZT1idXR0b25dLGlucHV0W3R5cGU9cmVzZXRdLGlucHV0W3R5cGU9c3VibWl0XXstd2Via2l0LWFwcGVhcmFuY2U6YnV0dG9uO2N1cnNvcjpwb2ludGVyfWJ1dHRvbltkaXNhYmxlZF0saHRtbCBpbnB1dFtkaXNhYmxlZF17Y3Vyc29yOmRlZmF1bHR9YnV0dG9uOjotbW96LWZvY3VzLWlubmVyLGlucHV0OjotbW96LWZvY3VzLWlubmVye2JvcmRlcjowO3BhZGRpbmc6MH1pbnB1dHtsaW5lLWhlaWdodDpub3JtYWx9aW5wdXRbdHlwZT1jaGVja2JveF0saW5wdXRbdHlwZT1yYWRpb117Ym94LXNpemluZzpib3JkZXItYm94O3BhZGRpbmc6MH1pbnB1dFt0eXBlPW51bWJlcl06Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24saW5wdXRbdHlwZT1udW1iZXJdOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9ue2hlaWdodDphdXRvfWlucHV0W3R5cGU9c2VhcmNoXXstd2Via2l0LWFwcGVhcmFuY2U6dGV4dGZpZWxkOy1tb3otYm94LXNpemluZzpjb250ZW50LWJveDstd2Via2l0LWJveC1zaXppbmc6Y29udGVudC1ib3g7Ym94LXNpemluZzpjb250ZW50LWJveH1pbnB1dFt0eXBlPXNlYXJjaF06Oi13ZWJraXQtc2VhcmNoLWNhbmNlbC1idXR0b24saW5wdXRbdHlwZT1zZWFyY2hdOjotd2Via2l0LXNlYXJjaC1kZWNvcmF0aW9uey13ZWJraXQtYXBwZWFyYW5jZTpub25lfWZpZWxkc2V0e2JvcmRlcjoxcHggc29saWQgc2lsdmVyO21hcmdpbjowIDJweDtwYWRkaW5nOi4zNWVtIC42MjVlbSAuNzVlbX1sZWdlbmR7Ym9yZGVyOjA7cGFkZGluZzowfXRleHRhcmVhe292ZXJmbG93OmF1dG99b3B0Z3JvdXB7Zm9udC13ZWlnaHQ6NzAwfXRhYmxle2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtib3JkZXItc3BhY2luZzowfXRkLHRoe3BhZGRpbmc6MH1AbWVkaWEgcHJpbnR7Knt0ZXh0LXNoYWRvdzpub25lIWltcG9ydGFudDtjb2xvcjojMDAwIWltcG9ydGFudDtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50IWltcG9ydGFudDtib3gtc2hhZG93Om5vbmUhaW1wb3J0YW50fWEsYTp2aXNpdGVke3RleHQtZGVjb3JhdGlvbjp1bmRlcmxpbmV9YVtocmVmXTphZnRlcntjb250ZW50OiIgKCIgYXR0cihocmVmKSAiKSJ9YWJiclt0aXRsZV06YWZ0ZXJ7Y29udGVudDoiICgiIGF0dHIodGl0bGUpICIpIn1hW2hyZWZePSJqYXZhc2NyaXB0OiJdOmFmdGVyLGFbaHJlZl49IiMiXTphZnRlcntjb250ZW50OiIifXByZSxibG9ja3F1b3Rle2JvcmRlcjoxcHggc29saWQgIzk5OTtwYWdlLWJyZWFrLWluc2lkZTphdm9pZH10aGVhZHtkaXNwbGF5OnRhYmxlLWhlYWRlci1ncm91cH10cixpbWd7cGFnZS1icmVhay1pbnNpZGU6YXZvaWR9aW1ne21heC13aWR0aDoxMDAlIWltcG9ydGFudH1wLGgyLGgze29ycGhhbnM6Mzt3aWRvd3M6M31oMixoM3twYWdlLWJyZWFrLWFmdGVyOmF2b2lkfXNlbGVjdHtiYWNrZ3JvdW5kOiNmZmYhaW1wb3J0YW50fS5uYXZiYXJ7ZGlzcGxheTpub25lfS50YWJsZSB0ZCwudGFibGUgdGh7YmFja2dyb3VuZC1jb2xvcjojZmZmIWltcG9ydGFudH0uYnRuPi5jYXJldCwuZHJvcHVwPi5idG4+LmNhcmV0e2JvcmRlci10b3AtY29sb3I6IzAwMCFpbXBvcnRhbnR9LmxhYmVse2JvcmRlcjoxcHggc29saWQgIzAwMH0udGFibGV7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlIWltcG9ydGFudH0udGFibGUtYm9yZGVyZWQgdGgsLnRhYmxlLWJvcmRlcmVkIHRke2JvcmRlcjoxcHggc29saWQgI2RkZCFpbXBvcnRhbnR9fSp7LXdlYmtpdC1ib3gtc2l6aW5nOmJvcmRlci1ib3g7LW1vei1ib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym94LXNpemluZzpib3JkZXItYm94fTpiZWZvcmUsOmFmdGVyey13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94Oy1tb3otYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveH1odG1se2ZvbnQtc2l6ZTo2Mi41JTstd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKX1ib2R5e2ZvbnQtZmFtaWx5OiJIZWx2ZXRpY2EgTmV1ZSIsSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mztjb2xvcjojMzMzO2JhY2tncm91bmQtY29sb3I6I2ZmZn1pbnB1dCxidXR0b24sc2VsZWN0LHRleHRhcmVhe2ZvbnQtZmFtaWx5OmluaGVyaXQ7Zm9udC1zaXplOmluaGVyaXQ7bGluZS1oZWlnaHQ6aW5oZXJpdH1he2NvbG9yOiM0MjhiY2E7dGV4dC1kZWNvcmF0aW9uOm5vbmV9YTpob3ZlcixhOmZvY3Vze2NvbG9yOiMyYTY0OTY7dGV4dC1kZWNvcmF0aW9uOnVuZGVybGluZX1hOmZvY3Vze291dGxpbmU6dGhpbiBkb3R0ZWQ7b3V0bGluZTo1cHggYXV0byAtd2Via2l0LWZvY3VzLXJpbmctY29sb3I7b3V0bGluZS1vZmZzZXQ6LTJweH1maWd1cmV7bWFyZ2luOjB9aW1ne3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uaW1nLXJlc3BvbnNpdmUsLnRodW1ibmFpbD5pbWcsLnRodW1ibmFpbCBhPmltZywuY2Fyb3VzZWwtaW5uZXI+Lml0ZW0+aW1nLC5jYXJvdXNlbC1pbm5lcj4uaXRlbT5hPmltZ3tkaXNwbGF5OmJsb2NrO21heC13aWR0aDoxMDAlO2hlaWdodDphdXRvfS5pbWctcm91bmRlZHtib3JkZXItcmFkaXVzOjZweH0uaW1nLXRodW1ibmFpbHtwYWRkaW5nOjRweDtsaW5lLWhlaWdodDoxLjQyODU3MTQzO2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICNkZGQ7Ym9yZGVyLXJhZGl1czo0cHg7LXdlYmtpdC10cmFuc2l0aW9uOmFsbCAuMnMgZWFzZS1pbi1vdXQ7dHJhbnNpdGlvbjphbGwgLjJzIGVhc2UtaW4tb3V0O2Rpc3BsYXk6aW5saW5lLWJsb2NrO21heC13aWR0aDoxMDAlO2hlaWdodDphdXRvfS5pbWctY2lyY2xle2JvcmRlci1yYWRpdXM6NTAlfWhye21hcmdpbi10b3A6MjBweDttYXJnaW4tYm90dG9tOjIwcHg7Ym9yZGVyOjA7Ym9yZGVyLXRvcDoxcHggc29saWQgI2VlZX0uc3Itb25seXtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7aGVpZ2h0OjFweDttYXJnaW46LTFweDtwYWRkaW5nOjA7b3ZlcmZsb3c6aGlkZGVuO2NsaXA6cmVjdCgwLDAsMCwwKTtib3JkZXI6MH1oMSxoMixoMyxoNCxoNSxoNiwuaDEsLmgyLC5oMywuaDQsLmg1LC5oNntmb250LWZhbWlseTppbmhlcml0O2ZvbnQtd2VpZ2h0OjUwMDtsaW5lLWhlaWdodDoxLjE7Y29sb3I6aW5oZXJpdH1oMSBzbWFsbCxoMiBzbWFsbCxoMyBzbWFsbCxoNCBzbWFsbCxoNSBzbWFsbCxoNiBzbWFsbCwuaDEgc21hbGwsLmgyIHNtYWxsLC5oMyBzbWFsbCwuaDQgc21hbGwsLmg1IHNtYWxsLC5oNiBzbWFsbCxoMSAuc21hbGwsaDIgLnNtYWxsLGgzIC5zbWFsbCxoNCAuc21hbGwsaDUgLnNtYWxsLGg2IC5zbWFsbCwuaDEgLnNtYWxsLC5oMiAuc21hbGwsLmgzIC5zbWFsbCwuaDQgLnNtYWxsLC5oNSAuc21hbGwsLmg2IC5zbWFsbHtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MTtjb2xvcjojOTk5fWgxLC5oMSxoMiwuaDIsaDMsLmgze21hcmdpbi10b3A6MjBweDttYXJnaW4tYm90dG9tOjEwcHh9aDEgc21hbGwsLmgxIHNtYWxsLGgyIHNtYWxsLC5oMiBzbWFsbCxoMyBzbWFsbCwuaDMgc21hbGwsaDEgLnNtYWxsLC5oMSAuc21hbGwsaDIgLnNtYWxsLC5oMiAuc21hbGwsaDMgLnNtYWxsLC5oMyAuc21hbGx7Zm9udC1zaXplOjY1JX1oNCwuaDQsaDUsLmg1LGg2LC5oNnttYXJnaW4tdG9wOjEwcHg7bWFyZ2luLWJvdHRvbToxMHB4fWg0IHNtYWxsLC5oNCBzbWFsbCxoNSBzbWFsbCwuaDUgc21hbGwsaDYgc21hbGwsLmg2IHNtYWxsLGg0IC5zbWFsbCwuaDQgLnNtYWxsLGg1IC5zbWFsbCwuaDUgLnNtYWxsLGg2IC5zbWFsbCwuaDYgLnNtYWxse2ZvbnQtc2l6ZTo3NSV9aDEsLmgxe2ZvbnQtc2l6ZTozNnB4fWgyLC5oMntmb250LXNpemU6MzBweH1oMywuaDN7Zm9udC1zaXplOjI0cHh9aDQsLmg0e2ZvbnQtc2l6ZToxOHB4fWg1LC5oNXtmb250LXNpemU6MTRweH1oNiwuaDZ7Zm9udC1zaXplOjEycHh9cHttYXJnaW46MCAwIDEwcHh9LmxlYWR7bWFyZ2luLWJvdHRvbToyMHB4O2ZvbnQtc2l6ZToxNnB4O2ZvbnQtd2VpZ2h0OjIwMDtsaW5lLWhlaWdodDoxLjR9QG1lZGlhIChtaW4td2lkdGg6NzY4cHgpey5sZWFke2ZvbnQtc2l6ZToyMXB4fX1zbWFsbCwuc21hbGx7Zm9udC1zaXplOjg1JX1jaXRle2ZvbnQtc3R5bGU6bm9ybWFsfS50ZXh0LWxlZnR7dGV4dC1hbGlnbjpsZWZ0fS50ZXh0LXJpZ2h0e3RleHQtYWxpZ246cmlnaHR9LnRleHQtY2VudGVye3RleHQtYWxpZ246Y2VudGVyfS50ZXh0LWp1c3RpZnl7dGV4dC1hbGlnbjpqdXN0aWZ5fS50ZXh0LW11dGVke2NvbG9yOiM5OTl9LnRleHQtcHJpbWFyeXtjb2xvcjojNDI4YmNhfWEudGV4dC1wcmltYXJ5OmhvdmVye2NvbG9yOiMzMDcxYTl9LnRleHQtc3VjY2Vzc3tjb2xvcjojM2M3NjNkfWEudGV4dC1zdWNjZXNzOmhvdmVye2NvbG9yOiMyYjU0MmN9LnRleHQtaW5mb3tjb2xvcjojMzE3MDhmfWEudGV4dC1pbmZvOmhvdmVye2NvbG9yOiMyNDUyNjl9LnRleHQtd2FybmluZ3tjb2xvcjojOGE2ZDNifWEudGV4dC13YXJuaW5nOmhvdmVye2NvbG9yOiM2NjUxMmN9LnRleHQtZGFuZ2Vye2NvbG9yOiNhOTQ0NDJ9YS50ZXh0LWRhbmdlcjpob3Zlcntjb2xvcjojODQzNTM0fS5iZy1wcmltYXJ5e2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjojNDI4YmNhfWEuYmctcHJpbWFyeTpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiMzMDcxYTl9LmJnLXN1Y2Nlc3N7YmFja2dyb3VuZC1jb2xvcjojZGZmMGQ4fWEuYmctc3VjY2Vzczpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNjMWUyYjN9LmJnLWluZm97YmFja2dyb3VuZC1jb2xvcjojZDllZGY3fWEuYmctaW5mbzpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNhZmQ5ZWV9LmJnLXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjojZmNmOGUzfWEuYmctd2FybmluZzpob3ZlcntiYWNrZ3JvdW5kLWNvbG9yOiNmN2VjYjV9LmJnLWRhbmdlcntiYWNrZ3JvdW5kLWNvbG9yOiNmMmRlZGV9YS5iZy1kYW5nZXI6aG92ZXJ7YmFja2dyb3VuZC1jb2xvcjojZTRiOWI5fS5wYWdlLWhlYWRlcntwYWRkaW5nLWJvdHRvbTo5cHg7bWFyZ2luOjQwcHggMCAyMHB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNlZWV9dWwsb2x7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MTBweH11bCB1bCxvbCB1bCx1bCBvbCxvbCBvbHttYXJnaW4tYm90dG9tOjB9Lmxpc3QtdW5zdHlsZWR7cGFkZGluZy1sZWZ0OjA7bGlzdC1zdHlsZTpub25lfS5saXN0LWlubGluZXtwYWRkaW5nLWxlZnQ6MDtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luLWxlZnQ6LTVweH0ubGlzdC1pbmxpbmU+bGl7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZy1sZWZ0OjVweDtwYWRkaW5nLXJpZ2h0OjVweH1kbHttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbToyMHB4fWR0LGRke2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDN9ZHR7Zm9udC13ZWlnaHQ6NzAwfWRke21hcmdpbi1sZWZ0OjB9QG1lZGlhIChtaW4td2lkdGg6NzY4cHgpey5kbC1ob3Jpem9udGFsIGR0e2Zsb2F0OmxlZnQ7d2lkdGg6MTYwcHg7Y2xlYXI6bGVmdDt0ZXh0LWFsaWduOnJpZ2h0O292ZXJmbG93OmhpZGRlbjt0ZXh0LW92ZXJmbG93OmVsbGlwc2lzO3doaXRlLXNwYWNlOm5vd3JhcH0uZGwtaG9yaXpvbnRhbCBkZHttYXJnaW4tbGVmdDoxODBweH19YWJiclt0aXRsZV0sYWJicltkYXRhLW9yaWdpbmFsLXRpdGxlXXtjdXJzb3I6aGVscDtib3JkZXItYm90dG9tOjFweCBkb3R0ZWQgIzk5OX0uaW5pdGlhbGlzbXtmb250LXNpemU6OTAlO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX1ibG9ja3F1b3Rle3BhZGRpbmc6MTBweCAyMHB4O21hcmdpbjowIDAgMjBweDtmb250LXNpemU6MTcuNXB4O2JvcmRlci1sZWZ0OjVweCBzb2xpZCAjZWVlfWJsb2NrcXVvdGUgcDpsYXN0LWNoaWxkLGJsb2NrcXVvdGUgdWw6bGFzdC1jaGlsZCxibG9ja3F1b3RlIG9sOmxhc3QtY2hpbGR7bWFyZ2luLWJvdHRvbTowfWJsb2NrcXVvdGUgZm9vdGVyLGJsb2NrcXVvdGUgc21hbGwsYmxvY2txdW90ZSAuc21hbGx7ZGlzcGxheTpibG9jaztmb250LXNpemU6ODAlO2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDM7Y29sb3I6Izk5OX1ibG9ja3F1b3RlIGZvb3RlcjpiZWZvcmUsYmxvY2txdW90ZSBzbWFsbDpiZWZvcmUsYmxvY2txdW90ZSAuc21hbGw6YmVmb3Jle2NvbnRlbnQ6J1wyMDE0IFwwMEEwJ30uYmxvY2txdW90ZS1yZXZlcnNlLGJsb2NrcXVvdGUucHVsbC1yaWdodHtwYWRkaW5nLXJpZ2h0OjE1cHg7cGFkZGluZy1sZWZ0OjA7Ym9yZGVyLXJpZ2h0OjVweCBzb2xpZCAjZWVlO2JvcmRlci1sZWZ0OjA7dGV4dC1hbGlnbjpyaWdodH0uYmxvY2txdW90ZS1yZXZlcnNlIGZvb3RlcjpiZWZvcmUsYmxvY2txdW90ZS5wdWxsLXJpZ2h0IGZvb3RlcjpiZWZvcmUsLmJsb2NrcXVvdGUtcmV2ZXJzZSBzbWFsbDpiZWZvcmUsYmxvY2txdW90ZS5wdWxsLXJpZ2h0IHNtYWxsOmJlZm9yZSwuYmxvY2txdW90ZS1yZXZlcnNlIC5zbWFsbDpiZWZvcmUsYmxvY2txdW90ZS5wdWxsLXJpZ2h0IC5zbWFsbDpiZWZvcmV7Y29udGVudDonJ30uYmxvY2txdW90ZS1yZXZlcnNlIGZvb3RlcjphZnRlcixibG9ja3F1b3RlLnB1bGwtcmlnaHQgZm9vdGVyOmFmdGVyLC5ibG9ja3F1b3RlLXJldmVyc2Ugc21hbGw6YWZ0ZXIsYmxvY2txdW90ZS5wdWxsLXJpZ2h0IHNtYWxsOmFmdGVyLC5ibG9ja3F1b3RlLXJldmVyc2UgLnNtYWxsOmFmdGVyLGJsb2NrcXVvdGUucHVsbC1yaWdodCAuc21hbGw6YWZ0ZXJ7Y29udGVudDonXDAwQTAgXDIwMTQnfWJsb2NrcXVvdGU6YmVmb3JlLGJsb2NrcXVvdGU6YWZ0ZXJ7Y29udGVudDoiIn1hZGRyZXNze21hcmdpbi1ib3R0b206MjBweDtmb250LXN0eWxlOm5vcm1hbDtsaW5lLWhlaWdodDoxLjQyODU3MTQzfWNvZGUsa2JkLHByZSxzYW1we2ZvbnQtZmFtaWx5Ok1lbmxvLE1vbmFjbyxDb25zb2xhcywiQ291cmllciBOZXciLG1vbm9zcGFjZX1jb2Rle3BhZGRpbmc6MnB4IDRweDtmb250LXNpemU6OTAlO2NvbG9yOiNjNzI1NGU7YmFja2dyb3VuZC1jb2xvcjojZjlmMmY0O3doaXRlLXNwYWNlOm5vd3JhcDtib3JkZXItcmFkaXVzOjRweH1rYmR7cGFkZGluZzoycHggNHB4O2ZvbnQtc2l6ZTo5MCU7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiMzMzM7Ym9yZGVyLXJhZGl1czozcHg7Ym94LXNoYWRvdzppbnNldCAwIC0xcHggMCByZ2JhKDAsMCwwLC4yNSl9cHJle2Rpc3BsYXk6YmxvY2s7cGFkZGluZzo5LjVweDttYXJnaW46MCAwIDEwcHg7Zm9udC1zaXplOjEzcHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mzt3b3JkLWJyZWFrOmJyZWFrLWFsbDt3b3JkLXdyYXA6YnJlYWstd29yZDtjb2xvcjojMzMzO2JhY2tncm91bmQtY29sb3I6I2Y1ZjVmNTtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLXJhZGl1czo0cHh9cHJlIGNvZGV7cGFkZGluZzowO2ZvbnQtc2l6ZTppbmhlcml0O2NvbG9yOmluaGVyaXQ7d2hpdGUtc3BhY2U6cHJlLXdyYXA7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItcmFkaXVzOjB9LnByZS1zY3JvbGxhYmxle21heC1oZWlnaHQ6MzQwcHg7b3ZlcmZsb3cteTpzY3JvbGx9LmNvbnRhaW5lcnttYXJnaW4tcmlnaHQ6YXV0bzttYXJnaW4tbGVmdDphdXRvO3BhZGRpbmctbGVmdDoxNXB4O3BhZGRpbmctcmlnaHQ6MTVweH1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7LmNvbnRhaW5lcnt3aWR0aDo3NTBweH19QG1lZGlhIChtaW4td2lkdGg6OTkycHgpey5jb250YWluZXJ7d2lkdGg6OTcwcHh9fUBtZWRpYSAobWluLXdpZHRoOjEyMDBweCl7LmNvbnRhaW5lcnt3aWR0aDoxMTcwcHh9fS5jb250YWluZXItZmx1aWR7bWFyZ2luLXJpZ2h0OmF1dG87bWFyZ2luLWxlZnQ6YXV0bztwYWRkaW5nLWxlZnQ6MTVweDtwYWRkaW5nLXJpZ2h0OjE1cHh9LnJvd3ttYXJnaW4tbGVmdDotMTVweDttYXJnaW4tcmlnaHQ6LTE1cHh9LmNvbC14cy0xLC5jb2wtc20tMSwuY29sLW1kLTEsLmNvbC1sZy0xLC5jb2wteHMtMiwuY29sLXNtLTIsLmNvbC1tZC0yLC5jb2wtbGctMiwuY29sLXhzLTMsLmNvbC1zbS0zLC5jb2wtbWQtMywuY29sLWxnLTMsLmNvbC14cy00LC5jb2wtc20tNCwuY29sLW1kLTQsLmNvbC1sZy00LC5jb2wteHMtNSwuY29sLXNtLTUsLmNvbC1tZC01LC5jb2wtbGctNSwuY29sLXhzLTYsLmNvbC1zbS02LC5jb2wtbWQtNiwuY29sLWxnLTYsLmNvbC14cy03LC5jb2wtc20tNywuY29sLW1kLTcsLmNvbC1sZy03LC5jb2wteHMtOCwuY29sLXNtLTgsLmNvbC1tZC04LC5jb2wtbGctOCwuY29sLXhzLTksLmNvbC1zbS05LC5jb2wtbWQtOSwuY29sLWxnLTksLmNvbC14cy0xMCwuY29sLXNtLTEwLC5jb2wtbWQtMTAsLmNvbC1sZy0xMCwuY29sLXhzLTExLC5jb2wtc20tMTEsLmNvbC1tZC0xMSwuY29sLWxnLTExLC5jb2wteHMtMTIsLmNvbC1zbS0xMiwuY29sLW1kLTEyLC5jb2wtbGctMTJ7cG9zaXRpb246cmVsYXRpdmU7bWluLWhlaWdodDoxcHg7cGFkZGluZy1sZWZ0OjE1cHg7cGFkZGluZy1yaWdodDoxNXB4fS5jb2wteHMtMSwuY29sLXhzLTIsLmNvbC14cy0zLC5jb2wteHMtNCwuY29sLXhzLTUsLmNvbC14cy02LC5jb2wteHMtNywuY29sLXhzLTgsLmNvbC14cy05LC5jb2wteHMtMTAsLmNvbC14cy0xMSwuY29sLXhzLTEye2Zsb2F0OmxlZnR9LmNvbC14cy0xMnt3aWR0aDoxMDAlfS5jb2wteHMtMTF7d2lkdGg6OTEuNjY2NjY2NjclfS5jb2wteHMtMTB7d2lkdGg6ODMuMzMzMzMzMzMlfS5jb2wteHMtOXt3aWR0aDo3NSV9LmNvbC14cy04e3dpZHRoOjY2LjY2NjY2NjY3JX0uY29sLXhzLTd7d2lkdGg6NTguMzMzMzMzMzMlfS5jb2wteHMtNnt3aWR0aDo1MCV9LmNvbC14cy01e3dpZHRoOjQxLjY2NjY2NjY3JX0uY29sLXhzLTR7d2lkdGg6MzMuMzMzMzMzMzMlfS5jb2wteHMtM3t3aWR0aDoyNSV9LmNvbC14cy0ye3dpZHRoOjE2LjY2NjY2NjY3JX0uY29sLXhzLTF7d2lkdGg6OC4zMzMzMzMzMyV9LmNvbC14cy1wdWxsLTEye3JpZ2h0OjEwMCV9LmNvbC14cy1wdWxsLTExe3JpZ2h0OjkxLjY2NjY2NjY3JX0uY29sLXhzLXB1bGwtMTB7cmlnaHQ6ODMuMzMzMzMzMzMlfS5jb2wteHMtcHVsbC05e3JpZ2h0Ojc1JX0uY29sLXhzLXB1bGwtOHtyaWdodDo2Ni42NjY2NjY2NyV9LmNvbC14cy1wdWxsLTd7cmlnaHQ6NTguMzMzMzMzMzMlfS5jb2wteHMtcHVsbC02e3JpZ2h0OjUwJX0uY29sLXhzLXB1bGwtNXtyaWdodDo0MS42NjY2NjY2NyV9LmNvbC14cy1wdWxsLTR7cmlnaHQ6MzMuMzMzMzMzMzMlfS5jb2wteHMtcHVsbC0ze3JpZ2h0OjI1JX0uY29sLXhzLXB1bGwtMntyaWdodDoxNi42NjY2NjY2NyV9LmNvbC14cy1wdWxsLTF7cmlnaHQ6OC4zMzMzMzMzMyV9LmNvbC14cy1wdWxsLTB7cmlnaHQ6MH0uY29sLXhzLXB1c2gtMTJ7bGVmdDoxMDAlfS5jb2wteHMtcHVzaC0xMXtsZWZ0OjkxLjY2NjY2NjY3JX0uY29sLXhzLXB1c2gtMTB7bGVmdDo4My4zMzMzMzMzMyV9LmNvbC14cy1wdXNoLTl7bGVmdDo3NSV9LmNvbC14cy1wdXNoLTh7bGVmdDo2Ni42NjY2NjY2NyV9LmNvbC14cy1wdXNoLTd7bGVmdDo1OC4zMzMzMzMzMyV9LmNvbC14cy1wdXNoLTZ7bGVmdDo1MCV9LmNvbC14cy1wdXNoLTV7bGVmdDo0MS42NjY2NjY2NyV9LmNvbC14cy1wdXNoLTR7bGVmdDozMy4zMzMzMzMzMyV9LmNvbC14cy1wdXNoLTN7bGVmdDoyNSV9LmNvbC14cy1wdXNoLTJ7bGVmdDoxNi42NjY2NjY2NyV9LmNvbC14cy1wdXNoLTF7bGVmdDo4LjMzMzMzMzMzJX0uY29sLXhzLXB1c2gtMHtsZWZ0OjB9LmNvbC14cy1vZmZzZXQtMTJ7bWFyZ2luLWxlZnQ6MTAwJX0uY29sLXhzLW9mZnNldC0xMXttYXJnaW4tbGVmdDo5MS42NjY2NjY2NyV9LmNvbC14cy1vZmZzZXQtMTB7bWFyZ2luLWxlZnQ6ODMuMzMzMzMzMzMlfS5jb2wteHMtb2Zmc2V0LTl7bWFyZ2luLWxlZnQ6NzUlfS5jb2wteHMtb2Zmc2V0LTh7bWFyZ2luLWxlZnQ6NjYuNjY2NjY2NjclfS5jb2wteHMtb2Zmc2V0LTd7bWFyZ2luLWxlZnQ6NTguMzMzMzMzMzMlfS5jb2wteHMtb2Zmc2V0LTZ7bWFyZ2luLWxlZnQ6NTAlfS5jb2wteHMtb2Zmc2V0LTV7bWFyZ2luLWxlZnQ6NDEuNjY2NjY2NjclfS5jb2wteHMtb2Zmc2V0LTR7bWFyZ2luLWxlZnQ6MzMuMzMzMzMzMzMlfS5jb2wteHMtb2Zmc2V0LTN7bWFyZ2luLWxlZnQ6MjUlfS5jb2wteHMtb2Zmc2V0LTJ7bWFyZ2luLWxlZnQ6MTYuNjY2NjY2NjclfS5jb2wteHMtb2Zmc2V0LTF7bWFyZ2luLWxlZnQ6OC4zMzMzMzMzMyV9LmNvbC14cy1vZmZzZXQtMHttYXJnaW4tbGVmdDowfUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsuY29sLXNtLTEsLmNvbC1zbS0yLC5jb2wtc20tMywuY29sLXNtLTQsLmNvbC1zbS01LC5jb2wtc20tNiwuY29sLXNtLTcsLmNvbC1zbS04LC5jb2wtc20tOSwuY29sLXNtLTEwLC5jb2wtc20tMTEsLmNvbC1zbS0xMntmbG9hdDpsZWZ0fS5jb2wtc20tMTJ7d2lkdGg6MTAwJX0uY29sLXNtLTExe3dpZHRoOjkxLjY2NjY2NjY3JX0uY29sLXNtLTEwe3dpZHRoOjgzLjMzMzMzMzMzJX0uY29sLXNtLTl7d2lkdGg6NzUlfS5jb2wtc20tOHt3aWR0aDo2Ni42NjY2NjY2NyV9LmNvbC1zbS03e3dpZHRoOjU4LjMzMzMzMzMzJX0uY29sLXNtLTZ7d2lkdGg6NTAlfS5jb2wtc20tNXt3aWR0aDo0MS42NjY2NjY2NyV9LmNvbC1zbS00e3dpZHRoOjMzLjMzMzMzMzMzJX0uY29sLXNtLTN7d2lkdGg6MjUlfS5jb2wtc20tMnt3aWR0aDoxNi42NjY2NjY2NyV9LmNvbC1zbS0xe3dpZHRoOjguMzMzMzMzMzMlfS5jb2wtc20tcHVsbC0xMntyaWdodDoxMDAlfS5jb2wtc20tcHVsbC0xMXtyaWdodDo5MS42NjY2NjY2NyV9LmNvbC1zbS1wdWxsLTEwe3JpZ2h0OjgzLjMzMzMzMzMzJX0uY29sLXNtLXB1bGwtOXtyaWdodDo3NSV9LmNvbC1zbS1wdWxsLTh7cmlnaHQ6NjYuNjY2NjY2NjclfS5jb2wtc20tcHVsbC03e3JpZ2h0OjU4LjMzMzMzMzMzJX0uY29sLXNtLXB1bGwtNntyaWdodDo1MCV9LmNvbC1zbS1wdWxsLTV7cmlnaHQ6NDEuNjY2NjY2NjclfS5jb2wtc20tcHVsbC00e3JpZ2h0OjMzLjMzMzMzMzMzJX0uY29sLXNtLXB1bGwtM3tyaWdodDoyNSV9LmNvbC1zbS1wdWxsLTJ7cmlnaHQ6MTYuNjY2NjY2NjclfS5jb2wtc20tcHVsbC0xe3JpZ2h0OjguMzMzMzMzMzMlfS5jb2wtc20tcHVsbC0we3JpZ2h0OjB9LmNvbC1zbS1wdXNoLTEye2xlZnQ6MTAwJX0uY29sLXNtLXB1c2gtMTF7bGVmdDo5MS42NjY2NjY2NyV9LmNvbC1zbS1wdXNoLTEwe2xlZnQ6ODMuMzMzMzMzMzMlfS5jb2wtc20tcHVzaC05e2xlZnQ6NzUlfS5jb2wtc20tcHVzaC04e2xlZnQ6NjYuNjY2NjY2NjclfS5jb2wtc20tcHVzaC03e2xlZnQ6NTguMzMzMzMzMzMlfS5jb2wtc20tcHVzaC02e2xlZnQ6NTAlfS5jb2wtc20tcHVzaC01e2xlZnQ6NDEuNjY2NjY2NjclfS5jb2wtc20tcHVzaC00e2xlZnQ6MzMuMzMzMzMzMzMlfS5jb2wtc20tcHVzaC0ze2xlZnQ6MjUlfS5jb2wtc20tcHVzaC0ye2xlZnQ6MTYuNjY2NjY2NjclfS5jb2wtc20tcHVzaC0xe2xlZnQ6OC4zMzMzMzMzMyV9LmNvbC1zbS1wdXNoLTB7bGVmdDowfS5jb2wtc20tb2Zmc2V0LTEye21hcmdpbi1sZWZ0OjEwMCV9LmNvbC1zbS1vZmZzZXQtMTF7bWFyZ2luLWxlZnQ6OTEuNjY2NjY2NjclfS5jb2wtc20tb2Zmc2V0LTEwe21hcmdpbi1sZWZ0OjgzLjMzMzMzMzMzJX0uY29sLXNtLW9mZnNldC05e21hcmdpbi1sZWZ0Ojc1JX0uY29sLXNtLW9mZnNldC04e21hcmdpbi1sZWZ0OjY2LjY2NjY2NjY3JX0uY29sLXNtLW9mZnNldC03e21hcmdpbi1sZWZ0OjU4LjMzMzMzMzMzJX0uY29sLXNtLW9mZnNldC02e21hcmdpbi1sZWZ0OjUwJX0uY29sLXNtLW9mZnNldC01e21hcmdpbi1sZWZ0OjQxLjY2NjY2NjY3JX0uY29sLXNtLW9mZnNldC00e21hcmdpbi1sZWZ0OjMzLjMzMzMzMzMzJX0uY29sLXNtLW9mZnNldC0ze21hcmdpbi1sZWZ0OjI1JX0uY29sLXNtLW9mZnNldC0ye21hcmdpbi1sZWZ0OjE2LjY2NjY2NjY3JX0uY29sLXNtLW9mZnNldC0xe21hcmdpbi1sZWZ0OjguMzMzMzMzMzMlfS5jb2wtc20tb2Zmc2V0LTB7bWFyZ2luLWxlZnQ6MH19QG1lZGlhIChtaW4td2lkdGg6OTkycHgpey5jb2wtbWQtMSwuY29sLW1kLTIsLmNvbC1tZC0zLC5jb2wtbWQtNCwuY29sLW1kLTUsLmNvbC1tZC02LC5jb2wtbWQtNywuY29sLW1kLTgsLmNvbC1tZC05LC5jb2wtbWQtMTAsLmNvbC1tZC0xMSwuY29sLW1kLTEye2Zsb2F0OmxlZnR9LmNvbC1tZC0xMnt3aWR0aDoxMDAlfS5jb2wtbWQtMTF7d2lkdGg6OTEuNjY2NjY2NjclfS5jb2wtbWQtMTB7d2lkdGg6ODMuMzMzMzMzMzMlfS5jb2wtbWQtOXt3aWR0aDo3NSV9LmNvbC1tZC04e3dpZHRoOjY2LjY2NjY2NjY3JX0uY29sLW1kLTd7d2lkdGg6NTguMzMzMzMzMzMlfS5jb2wtbWQtNnt3aWR0aDo1MCV9LmNvbC1tZC01e3dpZHRoOjQxLjY2NjY2NjY3JX0uY29sLW1kLTR7d2lkdGg6MzMuMzMzMzMzMzMlfS5jb2wtbWQtM3t3aWR0aDoyNSV9LmNvbC1tZC0ye3dpZHRoOjE2LjY2NjY2NjY3JX0uY29sLW1kLTF7d2lkdGg6OC4zMzMzMzMzMyV9LmNvbC1tZC1wdWxsLTEye3JpZ2h0OjEwMCV9LmNvbC1tZC1wdWxsLTExe3JpZ2h0OjkxLjY2NjY2NjY3JX0uY29sLW1kLXB1bGwtMTB7cmlnaHQ6ODMuMzMzMzMzMzMlfS5jb2wtbWQtcHVsbC05e3JpZ2h0Ojc1JX0uY29sLW1kLXB1bGwtOHtyaWdodDo2Ni42NjY2NjY2NyV9LmNvbC1tZC1wdWxsLTd7cmlnaHQ6NTguMzMzMzMzMzMlfS5jb2wtbWQtcHVsbC02e3JpZ2h0OjUwJX0uY29sLW1kLXB1bGwtNXtyaWdodDo0MS42NjY2NjY2NyV9LmNvbC1tZC1wdWxsLTR7cmlnaHQ6MzMuMzMzMzMzMzMlfS5jb2wtbWQtcHVsbC0ze3JpZ2h0OjI1JX0uY29sLW1kLXB1bGwtMntyaWdodDoxNi42NjY2NjY2NyV9LmNvbC1tZC1wdWxsLTF7cmlnaHQ6OC4zMzMzMzMzMyV9LmNvbC1tZC1wdWxsLTB7cmlnaHQ6MH0uY29sLW1kLXB1c2gtMTJ7bGVmdDoxMDAlfS5jb2wtbWQtcHVzaC0xMXtsZWZ0OjkxLjY2NjY2NjY3JX0uY29sLW1kLXB1c2gtMTB7bGVmdDo4My4zMzMzMzMzMyV9LmNvbC1tZC1wdXNoLTl7bGVmdDo3NSV9LmNvbC1tZC1wdXNoLTh7bGVmdDo2Ni42NjY2NjY2NyV9LmNvbC1tZC1wdXNoLTd7bGVmdDo1OC4zMzMzMzMzMyV9LmNvbC1tZC1wdXNoLTZ7bGVmdDo1MCV9LmNvbC1tZC1wdXNoLTV7bGVmdDo0MS42NjY2NjY2NyV9LmNvbC1tZC1wdXNoLTR7bGVmdDozMy4zMzMzMzMzMyV9LmNvbC1tZC1wdXNoLTN7bGVmdDoyNSV9LmNvbC1tZC1wdXNoLTJ7bGVmdDoxNi42NjY2NjY2NyV9LmNvbC1tZC1wdXNoLTF7bGVmdDo4LjMzMzMzMzMzJX0uY29sLW1kLXB1c2gtMHtsZWZ0OjB9LmNvbC1tZC1vZmZzZXQtMTJ7bWFyZ2luLWxlZnQ6MTAwJX0uY29sLW1kLW9mZnNldC0xMXttYXJnaW4tbGVmdDo5MS42NjY2NjY2NyV9LmNvbC1tZC1vZmZzZXQtMTB7bWFyZ2luLWxlZnQ6ODMuMzMzMzMzMzMlfS5jb2wtbWQtb2Zmc2V0LTl7bWFyZ2luLWxlZnQ6NzUlfS5jb2wtbWQtb2Zmc2V0LTh7bWFyZ2luLWxlZnQ6NjYuNjY2NjY2NjclfS5jb2wtbWQtb2Zmc2V0LTd7bWFyZ2luLWxlZnQ6NTguMzMzMzMzMzMlfS5jb2wtbWQtb2Zmc2V0LTZ7bWFyZ2luLWxlZnQ6NTAlfS5jb2wtbWQtb2Zmc2V0LTV7bWFyZ2luLWxlZnQ6NDEuNjY2NjY2NjclfS5jb2wtbWQtb2Zmc2V0LTR7bWFyZ2luLWxlZnQ6MzMuMzMzMzMzMzMlfS5jb2wtbWQtb2Zmc2V0LTN7bWFyZ2luLWxlZnQ6MjUlfS5jb2wtbWQtb2Zmc2V0LTJ7bWFyZ2luLWxlZnQ6MTYuNjY2NjY2NjclfS5jb2wtbWQtb2Zmc2V0LTF7bWFyZ2luLWxlZnQ6OC4zMzMzMzMzMyV9LmNvbC1tZC1vZmZzZXQtMHttYXJnaW4tbGVmdDowfX1AbWVkaWEgKG1pbi13aWR0aDoxMjAwcHgpey5jb2wtbGctMSwuY29sLWxnLTIsLmNvbC1sZy0zLC5jb2wtbGctNCwuY29sLWxnLTUsLmNvbC1sZy02LC5jb2wtbGctNywuY29sLWxnLTgsLmNvbC1sZy05LC5jb2wtbGctMTAsLmNvbC1sZy0xMSwuY29sLWxnLTEye2Zsb2F0OmxlZnR9LmNvbC1sZy0xMnt3aWR0aDoxMDAlfS5jb2wtbGctMTF7d2lkdGg6OTEuNjY2NjY2NjclfS5jb2wtbGctMTB7d2lkdGg6ODMuMzMzMzMzMzMlfS5jb2wtbGctOXt3aWR0aDo3NSV9LmNvbC1sZy04e3dpZHRoOjY2LjY2NjY2NjY3JX0uY29sLWxnLTd7d2lkdGg6NTguMzMzMzMzMzMlfS5jb2wtbGctNnt3aWR0aDo1MCV9LmNvbC1sZy01e3dpZHRoOjQxLjY2NjY2NjY3JX0uY29sLWxnLTR7d2lkdGg6MzMuMzMzMzMzMzMlfS5jb2wtbGctM3t3aWR0aDoyNSV9LmNvbC1sZy0ye3dpZHRoOjE2LjY2NjY2NjY3JX0uY29sLWxnLTF7d2lkdGg6OC4zMzMzMzMzMyV9LmNvbC1sZy1wdWxsLTEye3JpZ2h0OjEwMCV9LmNvbC1sZy1wdWxsLTExe3JpZ2h0OjkxLjY2NjY2NjY3JX0uY29sLWxnLXB1bGwtMTB7cmlnaHQ6ODMuMzMzMzMzMzMlfS5jb2wtbGctcHVsbC05e3JpZ2h0Ojc1JX0uY29sLWxnLXB1bGwtOHtyaWdodDo2Ni42NjY2NjY2NyV9LmNvbC1sZy1wdWxsLTd7cmlnaHQ6NTguMzMzMzMzMzMlfS5jb2wtbGctcHVsbC02e3JpZ2h0OjUwJX0uY29sLWxnLXB1bGwtNXtyaWdodDo0MS42NjY2NjY2NyV9LmNvbC1sZy1wdWxsLTR7cmlnaHQ6MzMuMzMzMzMzMzMlfS5jb2wtbGctcHVsbC0ze3JpZ2h0OjI1JX0uY29sLWxnLXB1bGwtMntyaWdodDoxNi42NjY2NjY2NyV9LmNvbC1sZy1wdWxsLTF7cmlnaHQ6OC4zMzMzMzMzMyV9LmNvbC1sZy1wdWxsLTB7cmlnaHQ6MH0uY29sLWxnLXB1c2gtMTJ7bGVmdDoxMDAlfS5jb2wtbGctcHVzaC0xMXtsZWZ0OjkxLjY2NjY2NjY3JX0uY29sLWxnLXB1c2gtMTB7bGVmdDo4My4zMzMzMzMzMyV9LmNvbC1sZy1wdXNoLTl7bGVmdDo3NSV9LmNvbC1sZy1wdXNoLTh7bGVmdDo2Ni42NjY2NjY2NyV9LmNvbC1sZy1wdXNoLTd7bGVmdDo1OC4zMzMzMzMzMyV9LmNvbC1sZy1wdXNoLTZ7bGVmdDo1MCV9LmNvbC1sZy1wdXNoLTV7bGVmdDo0MS42NjY2NjY2NyV9LmNvbC1sZy1wdXNoLTR7bGVmdDozMy4zMzMzMzMzMyV9LmNvbC1sZy1wdXNoLTN7bGVmdDoyNSV9LmNvbC1sZy1wdXNoLTJ7bGVmdDoxNi42NjY2NjY2NyV9LmNvbC1sZy1wdXNoLTF7bGVmdDo4LjMzMzMzMzMzJX0uY29sLWxnLXB1c2gtMHtsZWZ0OjB9LmNvbC1sZy1vZmZzZXQtMTJ7bWFyZ2luLWxlZnQ6MTAwJX0uY29sLWxnLW9mZnNldC0xMXttYXJnaW4tbGVmdDo5MS42NjY2NjY2NyV9LmNvbC1sZy1vZmZzZXQtMTB7bWFyZ2luLWxlZnQ6ODMuMzMzMzMzMzMlfS5jb2wtbGctb2Zmc2V0LTl7bWFyZ2luLWxlZnQ6NzUlfS5jb2wtbGctb2Zmc2V0LTh7bWFyZ2luLWxlZnQ6NjYuNjY2NjY2NjclfS5jb2wtbGctb2Zmc2V0LTd7bWFyZ2luLWxlZnQ6NTguMzMzMzMzMzMlfS5jb2wtbGctb2Zmc2V0LTZ7bWFyZ2luLWxlZnQ6NTAlfS5jb2wtbGctb2Zmc2V0LTV7bWFyZ2luLWxlZnQ6NDEuNjY2NjY2NjclfS5jb2wtbGctb2Zmc2V0LTR7bWFyZ2luLWxlZnQ6MzMuMzMzMzMzMzMlfS5jb2wtbGctb2Zmc2V0LTN7bWFyZ2luLWxlZnQ6MjUlfS5jb2wtbGctb2Zmc2V0LTJ7bWFyZ2luLWxlZnQ6MTYuNjY2NjY2NjclfS5jb2wtbGctb2Zmc2V0LTF7bWFyZ2luLWxlZnQ6OC4zMzMzMzMzMyV9LmNvbC1sZy1vZmZzZXQtMHttYXJnaW4tbGVmdDowfX10YWJsZXttYXgtd2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fXRoe3RleHQtYWxpZ246bGVmdH0udGFibGV7d2lkdGg6MTAwJTttYXJnaW4tYm90dG9tOjIwcHh9LnRhYmxlPnRoZWFkPnRyPnRoLC50YWJsZT50Ym9keT50cj50aCwudGFibGU+dGZvb3Q+dHI+dGgsLnRhYmxlPnRoZWFkPnRyPnRkLC50YWJsZT50Ym9keT50cj50ZCwudGFibGU+dGZvb3Q+dHI+dGR7cGFkZGluZzo4cHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mzt2ZXJ0aWNhbC1hbGlnbjp0b3A7Ym9yZGVyLXRvcDoxcHggc29saWQgI2RkZH0udGFibGU+dGhlYWQ+dHI+dGh7dmVydGljYWwtYWxpZ246Ym90dG9tO2JvcmRlci1ib3R0b206MnB4IHNvbGlkICNkZGR9LnRhYmxlPmNhcHRpb24rdGhlYWQ+dHI6Zmlyc3QtY2hpbGQ+dGgsLnRhYmxlPmNvbGdyb3VwK3RoZWFkPnRyOmZpcnN0LWNoaWxkPnRoLC50YWJsZT50aGVhZDpmaXJzdC1jaGlsZD50cjpmaXJzdC1jaGlsZD50aCwudGFibGU+Y2FwdGlvbit0aGVhZD50cjpmaXJzdC1jaGlsZD50ZCwudGFibGU+Y29sZ3JvdXArdGhlYWQ+dHI6Zmlyc3QtY2hpbGQ+dGQsLnRhYmxlPnRoZWFkOmZpcnN0LWNoaWxkPnRyOmZpcnN0LWNoaWxkPnRke2JvcmRlci10b3A6MH0udGFibGU+dGJvZHkrdGJvZHl7Ym9yZGVyLXRvcDoycHggc29saWQgI2RkZH0udGFibGUgLnRhYmxle2JhY2tncm91bmQtY29sb3I6I2ZmZn0udGFibGUtY29uZGVuc2VkPnRoZWFkPnRyPnRoLC50YWJsZS1jb25kZW5zZWQ+dGJvZHk+dHI+dGgsLnRhYmxlLWNvbmRlbnNlZD50Zm9vdD50cj50aCwudGFibGUtY29uZGVuc2VkPnRoZWFkPnRyPnRkLC50YWJsZS1jb25kZW5zZWQ+dGJvZHk+dHI+dGQsLnRhYmxlLWNvbmRlbnNlZD50Zm9vdD50cj50ZHtwYWRkaW5nOjVweH0udGFibGUtYm9yZGVyZWR7Ym9yZGVyOjFweCBzb2xpZCAjZGRkfS50YWJsZS1ib3JkZXJlZD50aGVhZD50cj50aCwudGFibGUtYm9yZGVyZWQ+dGJvZHk+dHI+dGgsLnRhYmxlLWJvcmRlcmVkPnRmb290PnRyPnRoLC50YWJsZS1ib3JkZXJlZD50aGVhZD50cj50ZCwudGFibGUtYm9yZGVyZWQ+dGJvZHk+dHI+dGQsLnRhYmxlLWJvcmRlcmVkPnRmb290PnRyPnRke2JvcmRlcjoxcHggc29saWQgI2RkZH0udGFibGUtYm9yZGVyZWQ+dGhlYWQ+dHI+dGgsLnRhYmxlLWJvcmRlcmVkPnRoZWFkPnRyPnRke2JvcmRlci1ib3R0b20td2lkdGg6MnB4fS50YWJsZS1zdHJpcGVkPnRib2R5PnRyOm50aC1jaGlsZChvZGQpPnRkLC50YWJsZS1zdHJpcGVkPnRib2R5PnRyOm50aC1jaGlsZChvZGQpPnRoe2JhY2tncm91bmQtY29sb3I6I2Y5ZjlmOX0udGFibGUtaG92ZXI+dGJvZHk+dHI6aG92ZXI+dGQsLnRhYmxlLWhvdmVyPnRib2R5PnRyOmhvdmVyPnRoe2JhY2tncm91bmQtY29sb3I6I2Y1ZjVmNX10YWJsZSBjb2xbY2xhc3MqPWNvbC1de3Bvc2l0aW9uOnN0YXRpYztmbG9hdDpub25lO2Rpc3BsYXk6dGFibGUtY29sdW1ufXRhYmxlIHRkW2NsYXNzKj1jb2wtXSx0YWJsZSB0aFtjbGFzcyo9Y29sLV17cG9zaXRpb246c3RhdGljO2Zsb2F0Om5vbmU7ZGlzcGxheTp0YWJsZS1jZWxsfS50YWJsZT50aGVhZD50cj50ZC5hY3RpdmUsLnRhYmxlPnRib2R5PnRyPnRkLmFjdGl2ZSwudGFibGU+dGZvb3Q+dHI+dGQuYWN0aXZlLC50YWJsZT50aGVhZD50cj50aC5hY3RpdmUsLnRhYmxlPnRib2R5PnRyPnRoLmFjdGl2ZSwudGFibGU+dGZvb3Q+dHI+dGguYWN0aXZlLC50YWJsZT50aGVhZD50ci5hY3RpdmU+dGQsLnRhYmxlPnRib2R5PnRyLmFjdGl2ZT50ZCwudGFibGU+dGZvb3Q+dHIuYWN0aXZlPnRkLC50YWJsZT50aGVhZD50ci5hY3RpdmU+dGgsLnRhYmxlPnRib2R5PnRyLmFjdGl2ZT50aCwudGFibGU+dGZvb3Q+dHIuYWN0aXZlPnRoe2JhY2tncm91bmQtY29sb3I6I2Y1ZjVmNX0udGFibGUtaG92ZXI+dGJvZHk+dHI+dGQuYWN0aXZlOmhvdmVyLC50YWJsZS1ob3Zlcj50Ym9keT50cj50aC5hY3RpdmU6aG92ZXIsLnRhYmxlLWhvdmVyPnRib2R5PnRyLmFjdGl2ZTpob3Zlcj50ZCwudGFibGUtaG92ZXI+dGJvZHk+dHIuYWN0aXZlOmhvdmVyPnRoe2JhY2tncm91bmQtY29sb3I6I2U4ZThlOH0udGFibGU+dGhlYWQ+dHI+dGQuc3VjY2VzcywudGFibGU+dGJvZHk+dHI+dGQuc3VjY2VzcywudGFibGU+dGZvb3Q+dHI+dGQuc3VjY2VzcywudGFibGU+dGhlYWQ+dHI+dGguc3VjY2VzcywudGFibGU+dGJvZHk+dHI+dGguc3VjY2VzcywudGFibGU+dGZvb3Q+dHI+dGguc3VjY2VzcywudGFibGU+dGhlYWQ+dHIuc3VjY2Vzcz50ZCwudGFibGU+dGJvZHk+dHIuc3VjY2Vzcz50ZCwudGFibGU+dGZvb3Q+dHIuc3VjY2Vzcz50ZCwudGFibGU+dGhlYWQ+dHIuc3VjY2Vzcz50aCwudGFibGU+dGJvZHk+dHIuc3VjY2Vzcz50aCwudGFibGU+dGZvb3Q+dHIuc3VjY2Vzcz50aHtiYWNrZ3JvdW5kLWNvbG9yOiNkZmYwZDh9LnRhYmxlLWhvdmVyPnRib2R5PnRyPnRkLnN1Y2Nlc3M6aG92ZXIsLnRhYmxlLWhvdmVyPnRib2R5PnRyPnRoLnN1Y2Nlc3M6aG92ZXIsLnRhYmxlLWhvdmVyPnRib2R5PnRyLnN1Y2Nlc3M6aG92ZXI+dGQsLnRhYmxlLWhvdmVyPnRib2R5PnRyLnN1Y2Nlc3M6aG92ZXI+dGh7YmFja2dyb3VuZC1jb2xvcjojZDBlOWM2fS50YWJsZT50aGVhZD50cj50ZC5pbmZvLC50YWJsZT50Ym9keT50cj50ZC5pbmZvLC50YWJsZT50Zm9vdD50cj50ZC5pbmZvLC50YWJsZT50aGVhZD50cj50aC5pbmZvLC50YWJsZT50Ym9keT50cj50aC5pbmZvLC50YWJsZT50Zm9vdD50cj50aC5pbmZvLC50YWJsZT50aGVhZD50ci5pbmZvPnRkLC50YWJsZT50Ym9keT50ci5pbmZvPnRkLC50YWJsZT50Zm9vdD50ci5pbmZvPnRkLC50YWJsZT50aGVhZD50ci5pbmZvPnRoLC50YWJsZT50Ym9keT50ci5pbmZvPnRoLC50YWJsZT50Zm9vdD50ci5pbmZvPnRoe2JhY2tncm91bmQtY29sb3I6I2Q5ZWRmN30udGFibGUtaG92ZXI+dGJvZHk+dHI+dGQuaW5mbzpob3ZlciwudGFibGUtaG92ZXI+dGJvZHk+dHI+dGguaW5mbzpob3ZlciwudGFibGUtaG92ZXI+dGJvZHk+dHIuaW5mbzpob3Zlcj50ZCwudGFibGUtaG92ZXI+dGJvZHk+dHIuaW5mbzpob3Zlcj50aHtiYWNrZ3JvdW5kLWNvbG9yOiNjNGUzZjN9LnRhYmxlPnRoZWFkPnRyPnRkLndhcm5pbmcsLnRhYmxlPnRib2R5PnRyPnRkLndhcm5pbmcsLnRhYmxlPnRmb290PnRyPnRkLndhcm5pbmcsLnRhYmxlPnRoZWFkPnRyPnRoLndhcm5pbmcsLnRhYmxlPnRib2R5PnRyPnRoLndhcm5pbmcsLnRhYmxlPnRmb290PnRyPnRoLndhcm5pbmcsLnRhYmxlPnRoZWFkPnRyLndhcm5pbmc+dGQsLnRhYmxlPnRib2R5PnRyLndhcm5pbmc+dGQsLnRhYmxlPnRmb290PnRyLndhcm5pbmc+dGQsLnRhYmxlPnRoZWFkPnRyLndhcm5pbmc+dGgsLnRhYmxlPnRib2R5PnRyLndhcm5pbmc+dGgsLnRhYmxlPnRmb290PnRyLndhcm5pbmc+dGh7YmFja2dyb3VuZC1jb2xvcjojZmNmOGUzfS50YWJsZS1ob3Zlcj50Ym9keT50cj50ZC53YXJuaW5nOmhvdmVyLC50YWJsZS1ob3Zlcj50Ym9keT50cj50aC53YXJuaW5nOmhvdmVyLC50YWJsZS1ob3Zlcj50Ym9keT50ci53YXJuaW5nOmhvdmVyPnRkLC50YWJsZS1ob3Zlcj50Ym9keT50ci53YXJuaW5nOmhvdmVyPnRoe2JhY2tncm91bmQtY29sb3I6I2ZhZjJjY30udGFibGU+dGhlYWQ+dHI+dGQuZGFuZ2VyLC50YWJsZT50Ym9keT50cj50ZC5kYW5nZXIsLnRhYmxlPnRmb290PnRyPnRkLmRhbmdlciwudGFibGU+dGhlYWQ+dHI+dGguZGFuZ2VyLC50YWJsZT50Ym9keT50cj50aC5kYW5nZXIsLnRhYmxlPnRmb290PnRyPnRoLmRhbmdlciwudGFibGU+dGhlYWQ+dHIuZGFuZ2VyPnRkLC50YWJsZT50Ym9keT50ci5kYW5nZXI+dGQsLnRhYmxlPnRmb290PnRyLmRhbmdlcj50ZCwudGFibGU+dGhlYWQ+dHIuZGFuZ2VyPnRoLC50YWJsZT50Ym9keT50ci5kYW5nZXI+dGgsLnRhYmxlPnRmb290PnRyLmRhbmdlcj50aHtiYWNrZ3JvdW5kLWNvbG9yOiNmMmRlZGV9LnRhYmxlLWhvdmVyPnRib2R5PnRyPnRkLmRhbmdlcjpob3ZlciwudGFibGUtaG92ZXI+dGJvZHk+dHI+dGguZGFuZ2VyOmhvdmVyLC50YWJsZS1ob3Zlcj50Ym9keT50ci5kYW5nZXI6aG92ZXI+dGQsLnRhYmxlLWhvdmVyPnRib2R5PnRyLmRhbmdlcjpob3Zlcj50aHtiYWNrZ3JvdW5kLWNvbG9yOiNlYmNjY2N9QG1lZGlhIChtYXgtd2lkdGg6NzY3cHgpey50YWJsZS1yZXNwb25zaXZle3dpZHRoOjEwMCU7bWFyZ2luLWJvdHRvbToxNXB4O292ZXJmbG93LXk6aGlkZGVuO292ZXJmbG93LXg6c2Nyb2xsOy1tcy1vdmVyZmxvdy1zdHlsZTotbXMtYXV0b2hpZGluZy1zY3JvbGxiYXI7Ym9yZGVyOjFweCBzb2xpZCAjZGRkOy13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOnRvdWNofS50YWJsZS1yZXNwb25zaXZlPi50YWJsZXttYXJnaW4tYm90dG9tOjB9LnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlPnRoZWFkPnRyPnRoLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZT50Ym9keT50cj50aCwudGFibGUtcmVzcG9uc2l2ZT4udGFibGU+dGZvb3Q+dHI+dGgsLnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlPnRoZWFkPnRyPnRkLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZT50Ym9keT50cj50ZCwudGFibGUtcmVzcG9uc2l2ZT4udGFibGU+dGZvb3Q+dHI+dGR7d2hpdGUtc3BhY2U6bm93cmFwfS50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZHtib3JkZXI6MH0udGFibGUtcmVzcG9uc2l2ZT4udGFibGUtYm9yZGVyZWQ+dGhlYWQ+dHI+dGg6Zmlyc3QtY2hpbGQsLnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlLWJvcmRlcmVkPnRib2R5PnRyPnRoOmZpcnN0LWNoaWxkLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Zm9vdD50cj50aDpmaXJzdC1jaGlsZCwudGFibGUtcmVzcG9uc2l2ZT4udGFibGUtYm9yZGVyZWQ+dGhlYWQ+dHI+dGQ6Zmlyc3QtY2hpbGQsLnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlLWJvcmRlcmVkPnRib2R5PnRyPnRkOmZpcnN0LWNoaWxkLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Zm9vdD50cj50ZDpmaXJzdC1jaGlsZHtib3JkZXItbGVmdDowfS50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50aGVhZD50cj50aDpsYXN0LWNoaWxkLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Ym9keT50cj50aDpsYXN0LWNoaWxkLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Zm9vdD50cj50aDpsYXN0LWNoaWxkLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50aGVhZD50cj50ZDpsYXN0LWNoaWxkLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Ym9keT50cj50ZDpsYXN0LWNoaWxkLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Zm9vdD50cj50ZDpsYXN0LWNoaWxke2JvcmRlci1yaWdodDowfS50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Ym9keT50cjpsYXN0LWNoaWxkPnRoLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Zm9vdD50cjpsYXN0LWNoaWxkPnRoLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Ym9keT50cjpsYXN0LWNoaWxkPnRkLC50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Zm9vdD50cjpsYXN0LWNoaWxkPnRke2JvcmRlci1ib3R0b206MH19ZmllbGRzZXR7cGFkZGluZzowO21hcmdpbjowO2JvcmRlcjowO21pbi13aWR0aDowfWxlZ2VuZHtkaXNwbGF5OmJsb2NrO3dpZHRoOjEwMCU7cGFkZGluZzowO21hcmdpbi1ib3R0b206MjBweDtmb250LXNpemU6MjFweDtsaW5lLWhlaWdodDppbmhlcml0O2NvbG9yOiMzMzM7Ym9yZGVyOjA7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2U1ZTVlNX1sYWJlbHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tYm90dG9tOjVweDtmb250LXdlaWdodDo3MDB9aW5wdXRbdHlwZT1zZWFyY2hdey13ZWJraXQtYm94LXNpemluZzpib3JkZXItYm94Oy1tb3otYm94LXNpemluZzpib3JkZXItYm94O2JveC1zaXppbmc6Ym9yZGVyLWJveH1pbnB1dFt0eXBlPXJhZGlvXSxpbnB1dFt0eXBlPWNoZWNrYm94XXttYXJnaW46NHB4IDAgMDttYXJnaW4tdG9wOjFweCBcOTtsaW5lLWhlaWdodDpub3JtYWx9aW5wdXRbdHlwZT1maWxlXXtkaXNwbGF5OmJsb2NrfWlucHV0W3R5cGU9cmFuZ2Vde2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJX1zZWxlY3RbbXVsdGlwbGVdLHNlbGVjdFtzaXplXXtoZWlnaHQ6YXV0b31pbnB1dFt0eXBlPWZpbGVdOmZvY3VzLGlucHV0W3R5cGU9cmFkaW9dOmZvY3VzLGlucHV0W3R5cGU9Y2hlY2tib3hdOmZvY3Vze291dGxpbmU6dGhpbiBkb3R0ZWQ7b3V0bGluZTo1cHggYXV0byAtd2Via2l0LWZvY3VzLXJpbmctY29sb3I7b3V0bGluZS1vZmZzZXQ6LTJweH1vdXRwdXR7ZGlzcGxheTpibG9jaztwYWRkaW5nLXRvcDo3cHg7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mztjb2xvcjojNTU1fS5mb3JtLWNvbnRyb2x7ZGlzcGxheTpibG9jazt3aWR0aDoxMDAlO2hlaWdodDozNHB4O3BhZGRpbmc6NnB4IDEycHg7Zm9udC1zaXplOjE0cHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mztjb2xvcjojNTU1O2JhY2tncm91bmQtY29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWltYWdlOm5vbmU7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlci1yYWRpdXM6NHB4Oy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwuMDc1KTtib3gtc2hhZG93Omluc2V0IDAgMXB4IDFweCByZ2JhKDAsMCwwLC4wNzUpOy13ZWJraXQtdHJhbnNpdGlvbjpib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgLjE1cyxib3gtc2hhZG93IGVhc2UtaW4tb3V0IC4xNXM7dHJhbnNpdGlvbjpib3JkZXItY29sb3IgZWFzZS1pbi1vdXQgLjE1cyxib3gtc2hhZG93IGVhc2UtaW4tb3V0IC4xNXN9LmZvcm0tY29udHJvbDpmb2N1c3tib3JkZXItY29sb3I6IzY2YWZlOTtvdXRsaW5lOjA7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgMXB4IDFweCByZ2JhKDAsMCwwLC4wNzUpLDAgMCA4cHggcmdiYSgxMDIsMTc1LDIzMywuNik7Ym94LXNoYWRvdzppbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwuMDc1KSwwIDAgOHB4IHJnYmEoMTAyLDE3NSwyMzMsLjYpfS5mb3JtLWNvbnRyb2w6Oi1tb3otcGxhY2Vob2xkZXJ7Y29sb3I6Izk5OTtvcGFjaXR5OjF9LmZvcm0tY29udHJvbDotbXMtaW5wdXQtcGxhY2Vob2xkZXJ7Y29sb3I6Izk5OX0uZm9ybS1jb250cm9sOjotd2Via2l0LWlucHV0LXBsYWNlaG9sZGVye2NvbG9yOiM5OTl9LmZvcm0tY29udHJvbFtkaXNhYmxlZF0sLmZvcm0tY29udHJvbFtyZWFkb25seV0sZmllbGRzZXRbZGlzYWJsZWRdIC5mb3JtLWNvbnRyb2x7Y3Vyc29yOm5vdC1hbGxvd2VkO2JhY2tncm91bmQtY29sb3I6I2VlZTtvcGFjaXR5OjF9dGV4dGFyZWEuZm9ybS1jb250cm9se2hlaWdodDphdXRvfWlucHV0W3R5cGU9c2VhcmNoXXstd2Via2l0LWFwcGVhcmFuY2U6bm9uZX1pbnB1dFt0eXBlPWRhdGVde2xpbmUtaGVpZ2h0OjM0cHh9LmZvcm0tZ3JvdXB7bWFyZ2luLWJvdHRvbToxNXB4fS5yYWRpbywuY2hlY2tib3h7ZGlzcGxheTpibG9jazttaW4taGVpZ2h0OjIwcHg7bWFyZ2luLXRvcDoxMHB4O21hcmdpbi1ib3R0b206MTBweDtwYWRkaW5nLWxlZnQ6MjBweH0ucmFkaW8gbGFiZWwsLmNoZWNrYm94IGxhYmVse2Rpc3BsYXk6aW5saW5lO2ZvbnQtd2VpZ2h0OjQwMDtjdXJzb3I6cG9pbnRlcn0ucmFkaW8gaW5wdXRbdHlwZT1yYWRpb10sLnJhZGlvLWlubGluZSBpbnB1dFt0eXBlPXJhZGlvXSwuY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF0sLmNoZWNrYm94LWlubGluZSBpbnB1dFt0eXBlPWNoZWNrYm94XXtmbG9hdDpsZWZ0O21hcmdpbi1sZWZ0Oi0yMHB4fS5yYWRpbysucmFkaW8sLmNoZWNrYm94Ky5jaGVja2JveHttYXJnaW4tdG9wOi01cHh9LnJhZGlvLWlubGluZSwuY2hlY2tib3gtaW5saW5le2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmctbGVmdDoyMHB4O21hcmdpbi1ib3R0b206MDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGU7Zm9udC13ZWlnaHQ6NDAwO2N1cnNvcjpwb2ludGVyfS5yYWRpby1pbmxpbmUrLnJhZGlvLWlubGluZSwuY2hlY2tib3gtaW5saW5lKy5jaGVja2JveC1pbmxpbmV7bWFyZ2luLXRvcDowO21hcmdpbi1sZWZ0OjEwcHh9aW5wdXRbdHlwZT1yYWRpb11bZGlzYWJsZWRdLGlucHV0W3R5cGU9Y2hlY2tib3hdW2Rpc2FibGVkXSwucmFkaW9bZGlzYWJsZWRdLC5yYWRpby1pbmxpbmVbZGlzYWJsZWRdLC5jaGVja2JveFtkaXNhYmxlZF0sLmNoZWNrYm94LWlubGluZVtkaXNhYmxlZF0sZmllbGRzZXRbZGlzYWJsZWRdIGlucHV0W3R5cGU9cmFkaW9dLGZpZWxkc2V0W2Rpc2FibGVkXSBpbnB1dFt0eXBlPWNoZWNrYm94XSxmaWVsZHNldFtkaXNhYmxlZF0gLnJhZGlvLGZpZWxkc2V0W2Rpc2FibGVkXSAucmFkaW8taW5saW5lLGZpZWxkc2V0W2Rpc2FibGVkXSAuY2hlY2tib3gsZmllbGRzZXRbZGlzYWJsZWRdIC5jaGVja2JveC1pbmxpbmV7Y3Vyc29yOm5vdC1hbGxvd2VkfS5pbnB1dC1zbXtoZWlnaHQ6MzBweDtwYWRkaW5nOjVweCAxMHB4O2ZvbnQtc2l6ZToxMnB4O2xpbmUtaGVpZ2h0OjEuNTtib3JkZXItcmFkaXVzOjNweH1zZWxlY3QuaW5wdXQtc217aGVpZ2h0OjMwcHg7bGluZS1oZWlnaHQ6MzBweH10ZXh0YXJlYS5pbnB1dC1zbSxzZWxlY3RbbXVsdGlwbGVdLmlucHV0LXNte2hlaWdodDphdXRvfS5pbnB1dC1sZ3toZWlnaHQ6NDZweDtwYWRkaW5nOjEwcHggMTZweDtmb250LXNpemU6MThweDtsaW5lLWhlaWdodDoxLjMzO2JvcmRlci1yYWRpdXM6NnB4fXNlbGVjdC5pbnB1dC1sZ3toZWlnaHQ6NDZweDtsaW5lLWhlaWdodDo0NnB4fXRleHRhcmVhLmlucHV0LWxnLHNlbGVjdFttdWx0aXBsZV0uaW5wdXQtbGd7aGVpZ2h0OmF1dG99Lmhhcy1mZWVkYmFja3twb3NpdGlvbjpyZWxhdGl2ZX0uaGFzLWZlZWRiYWNrIC5mb3JtLWNvbnRyb2x7cGFkZGluZy1yaWdodDo0Mi41cHh9Lmhhcy1mZWVkYmFjayAuZm9ybS1jb250cm9sLWZlZWRiYWNre3Bvc2l0aW9uOmFic29sdXRlO3RvcDoyNXB4O3JpZ2h0OjA7ZGlzcGxheTpibG9jazt3aWR0aDozNHB4O2hlaWdodDozNHB4O2xpbmUtaGVpZ2h0OjM0cHg7dGV4dC1hbGlnbjpjZW50ZXJ9Lmhhcy1zdWNjZXNzIC5oZWxwLWJsb2NrLC5oYXMtc3VjY2VzcyAuY29udHJvbC1sYWJlbCwuaGFzLXN1Y2Nlc3MgLnJhZGlvLC5oYXMtc3VjY2VzcyAuY2hlY2tib3gsLmhhcy1zdWNjZXNzIC5yYWRpby1pbmxpbmUsLmhhcy1zdWNjZXNzIC5jaGVja2JveC1pbmxpbmV7Y29sb3I6IzNjNzYzZH0uaGFzLXN1Y2Nlc3MgLmZvcm0tY29udHJvbHtib3JkZXItY29sb3I6IzNjNzYzZDstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA3NSk7Ym94LXNoYWRvdzppbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwuMDc1KX0uaGFzLXN1Y2Nlc3MgLmZvcm0tY29udHJvbDpmb2N1c3tib3JkZXItY29sb3I6IzJiNTQyYzstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA3NSksMCAwIDZweCAjNjdiMTY4O2JveC1zaGFkb3c6aW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA3NSksMCAwIDZweCAjNjdiMTY4fS5oYXMtc3VjY2VzcyAuaW5wdXQtZ3JvdXAtYWRkb257Y29sb3I6IzNjNzYzZDtib3JkZXItY29sb3I6IzNjNzYzZDtiYWNrZ3JvdW5kLWNvbG9yOiNkZmYwZDh9Lmhhcy1zdWNjZXNzIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2t7Y29sb3I6IzNjNzYzZH0uaGFzLXdhcm5pbmcgLmhlbHAtYmxvY2ssLmhhcy13YXJuaW5nIC5jb250cm9sLWxhYmVsLC5oYXMtd2FybmluZyAucmFkaW8sLmhhcy13YXJuaW5nIC5jaGVja2JveCwuaGFzLXdhcm5pbmcgLnJhZGlvLWlubGluZSwuaGFzLXdhcm5pbmcgLmNoZWNrYm94LWlubGluZXtjb2xvcjojOGE2ZDNifS5oYXMtd2FybmluZyAuZm9ybS1jb250cm9se2JvcmRlci1jb2xvcjojOGE2ZDNiOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwuMDc1KTtib3gtc2hhZG93Omluc2V0IDAgMXB4IDFweCByZ2JhKDAsMCwwLC4wNzUpfS5oYXMtd2FybmluZyAuZm9ybS1jb250cm9sOmZvY3Vze2JvcmRlci1jb2xvcjojNjY1MTJjOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwuMDc1KSwwIDAgNnB4ICNjMGExNmI7Ym94LXNoYWRvdzppbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwuMDc1KSwwIDAgNnB4ICNjMGExNmJ9Lmhhcy13YXJuaW5nIC5pbnB1dC1ncm91cC1hZGRvbntjb2xvcjojOGE2ZDNiO2JvcmRlci1jb2xvcjojOGE2ZDNiO2JhY2tncm91bmQtY29sb3I6I2ZjZjhlM30uaGFzLXdhcm5pbmcgLmZvcm0tY29udHJvbC1mZWVkYmFja3tjb2xvcjojOGE2ZDNifS5oYXMtZXJyb3IgLmhlbHAtYmxvY2ssLmhhcy1lcnJvciAuY29udHJvbC1sYWJlbCwuaGFzLWVycm9yIC5yYWRpbywuaGFzLWVycm9yIC5jaGVja2JveCwuaGFzLWVycm9yIC5yYWRpby1pbmxpbmUsLmhhcy1lcnJvciAuY2hlY2tib3gtaW5saW5le2NvbG9yOiNhOTQ0NDJ9Lmhhcy1lcnJvciAuZm9ybS1jb250cm9se2JvcmRlci1jb2xvcjojYTk0NDQyOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDFweCAxcHggcmdiYSgwLDAsMCwuMDc1KTtib3gtc2hhZG93Omluc2V0IDAgMXB4IDFweCByZ2JhKDAsMCwwLC4wNzUpfS5oYXMtZXJyb3IgLmZvcm0tY29udHJvbDpmb2N1c3tib3JkZXItY29sb3I6Izg0MzUzNDstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA3NSksMCAwIDZweCAjY2U4NDgzO2JveC1zaGFkb3c6aW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA3NSksMCAwIDZweCAjY2U4NDgzfS5oYXMtZXJyb3IgLmlucHV0LWdyb3VwLWFkZG9ue2NvbG9yOiNhOTQ0NDI7Ym9yZGVyLWNvbG9yOiNhOTQ0NDI7YmFja2dyb3VuZC1jb2xvcjojZjJkZWRlfS5oYXMtZXJyb3IgLmZvcm0tY29udHJvbC1mZWVkYmFja3tjb2xvcjojYTk0NDQyfS5mb3JtLWNvbnRyb2wtc3RhdGlje21hcmdpbi1ib3R0b206MH0uaGVscC1ibG9ja3tkaXNwbGF5OmJsb2NrO21hcmdpbi10b3A6NXB4O21hcmdpbi1ib3R0b206MTBweDtjb2xvcjojNzM3MzczfUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsuZm9ybS1pbmxpbmUgLmZvcm0tZ3JvdXB7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLWJvdHRvbTowO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uZm9ybS1pbmxpbmUgLmZvcm0tY29udHJvbHtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDphdXRvO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uZm9ybS1pbmxpbmUgLmlucHV0LWdyb3VwPi5mb3JtLWNvbnRyb2x7d2lkdGg6MTAwJX0uZm9ybS1pbmxpbmUgLmNvbnRyb2wtbGFiZWx7bWFyZ2luLWJvdHRvbTowO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uZm9ybS1pbmxpbmUgLnJhZGlvLC5mb3JtLWlubGluZSAuY2hlY2tib3h7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MDtwYWRkaW5nLWxlZnQ6MDt2ZXJ0aWNhbC1hbGlnbjptaWRkbGV9LmZvcm0taW5saW5lIC5yYWRpbyBpbnB1dFt0eXBlPXJhZGlvXSwuZm9ybS1pbmxpbmUgLmNoZWNrYm94IGlucHV0W3R5cGU9Y2hlY2tib3hde2Zsb2F0Om5vbmU7bWFyZ2luLWxlZnQ6MH0uZm9ybS1pbmxpbmUgLmhhcy1mZWVkYmFjayAuZm9ybS1jb250cm9sLWZlZWRiYWNre3RvcDowfX0uZm9ybS1ob3Jpem9udGFsIC5jb250cm9sLWxhYmVsLC5mb3JtLWhvcml6b250YWwgLnJhZGlvLC5mb3JtLWhvcml6b250YWwgLmNoZWNrYm94LC5mb3JtLWhvcml6b250YWwgLnJhZGlvLWlubGluZSwuZm9ybS1ob3Jpem9udGFsIC5jaGVja2JveC1pbmxpbmV7bWFyZ2luLXRvcDowO21hcmdpbi1ib3R0b206MDtwYWRkaW5nLXRvcDo3cHh9LmZvcm0taG9yaXpvbnRhbCAucmFkaW8sLmZvcm0taG9yaXpvbnRhbCAuY2hlY2tib3h7bWluLWhlaWdodDoyN3B4fS5mb3JtLWhvcml6b250YWwgLmZvcm0tZ3JvdXB7bWFyZ2luLWxlZnQ6LTE1cHg7bWFyZ2luLXJpZ2h0Oi0xNXB4fS5mb3JtLWhvcml6b250YWwgLmZvcm0tY29udHJvbC1zdGF0aWN7cGFkZGluZy10b3A6N3B4fUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsuZm9ybS1ob3Jpem9udGFsIC5jb250cm9sLWxhYmVse3RleHQtYWxpZ246cmlnaHR9fS5mb3JtLWhvcml6b250YWwgLmhhcy1mZWVkYmFjayAuZm9ybS1jb250cm9sLWZlZWRiYWNre3RvcDowO3JpZ2h0OjE1cHh9LmJ0bntkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tYm90dG9tOjA7Zm9udC13ZWlnaHQ6NDAwO3RleHQtYWxpZ246Y2VudGVyO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtjdXJzb3I6cG9pbnRlcjtiYWNrZ3JvdW5kLWltYWdlOm5vbmU7Ym9yZGVyOjFweCBzb2xpZCB0cmFuc3BhcmVudDt3aGl0ZS1zcGFjZTpub3dyYXA7cGFkZGluZzo2cHggMTJweDtmb250LXNpemU6MTRweDtsaW5lLWhlaWdodDoxLjQyODU3MTQzO2JvcmRlci1yYWRpdXM6NHB4Oy13ZWJraXQtdXNlci1zZWxlY3Q6bm9uZTstbW96LXVzZXItc2VsZWN0Om5vbmU7LW1zLXVzZXItc2VsZWN0Om5vbmU7dXNlci1zZWxlY3Q6bm9uZX0uYnRuOmZvY3VzLC5idG46YWN0aXZlOmZvY3VzLC5idG4uYWN0aXZlOmZvY3Vze291dGxpbmU6dGhpbiBkb3R0ZWQ7b3V0bGluZTo1cHggYXV0byAtd2Via2l0LWZvY3VzLXJpbmctY29sb3I7b3V0bGluZS1vZmZzZXQ6LTJweH0uYnRuOmhvdmVyLC5idG46Zm9jdXN7Y29sb3I6IzMzMzt0ZXh0LWRlY29yYXRpb246bm9uZX0uYnRuOmFjdGl2ZSwuYnRuLmFjdGl2ZXtvdXRsaW5lOjA7YmFja2dyb3VuZC1pbWFnZTpub25lOy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDNweCA1cHggcmdiYSgwLDAsMCwuMTI1KTtib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCByZ2JhKDAsMCwwLC4xMjUpfS5idG4uZGlzYWJsZWQsLmJ0bltkaXNhYmxlZF0sZmllbGRzZXRbZGlzYWJsZWRdIC5idG57Y3Vyc29yOm5vdC1hbGxvd2VkO3BvaW50ZXItZXZlbnRzOm5vbmU7b3BhY2l0eTouNjU7ZmlsdGVyOmFscGhhKG9wYWNpdHk9NjUpOy13ZWJraXQtYm94LXNoYWRvdzpub25lO2JveC1zaGFkb3c6bm9uZX0uYnRuLWRlZmF1bHR7Y29sb3I6IzMzMztiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyLWNvbG9yOiNjY2N9LmJ0bi1kZWZhdWx0OmhvdmVyLC5idG4tZGVmYXVsdDpmb2N1cywuYnRuLWRlZmF1bHQ6YWN0aXZlLC5idG4tZGVmYXVsdC5hY3RpdmUsLm9wZW4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tZGVmYXVsdHtjb2xvcjojMzMzO2JhY2tncm91bmQtY29sb3I6I2ViZWJlYjtib3JkZXItY29sb3I6I2FkYWRhZH0uYnRuLWRlZmF1bHQ6YWN0aXZlLC5idG4tZGVmYXVsdC5hY3RpdmUsLm9wZW4gLmRyb3Bkb3duLXRvZ2dsZS5idG4tZGVmYXVsdHtiYWNrZ3JvdW5kLWltYWdlOm5vbmV9LmJ0bi1kZWZhdWx0LmRpc2FibGVkLC5idG4tZGVmYXVsdFtkaXNhYmxlZF0sZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tZGVmYXVsdCwuYnRuLWRlZmF1bHQuZGlzYWJsZWQ6aG92ZXIsLmJ0bi1kZWZhdWx0W2Rpc2FibGVkXTpob3ZlcixmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1kZWZhdWx0OmhvdmVyLC5idG4tZGVmYXVsdC5kaXNhYmxlZDpmb2N1cywuYnRuLWRlZmF1bHRbZGlzYWJsZWRdOmZvY3VzLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRlZmF1bHQ6Zm9jdXMsLmJ0bi1kZWZhdWx0LmRpc2FibGVkOmFjdGl2ZSwuYnRuLWRlZmF1bHRbZGlzYWJsZWRdOmFjdGl2ZSxmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1kZWZhdWx0OmFjdGl2ZSwuYnRuLWRlZmF1bHQuZGlzYWJsZWQuYWN0aXZlLC5idG4tZGVmYXVsdFtkaXNhYmxlZF0uYWN0aXZlLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRlZmF1bHQuYWN0aXZle2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXItY29sb3I6I2NjY30uYnRuLWRlZmF1bHQgLmJhZGdle2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjojMzMzfS5idG4tcHJpbWFyeXtjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6IzQyOGJjYTtib3JkZXItY29sb3I6IzM1N2ViZH0uYnRuLXByaW1hcnk6aG92ZXIsLmJ0bi1wcmltYXJ5OmZvY3VzLC5idG4tcHJpbWFyeTphY3RpdmUsLmJ0bi1wcmltYXJ5LmFjdGl2ZSwub3BlbiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1wcmltYXJ5e2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjojMzI3NmIxO2JvcmRlci1jb2xvcjojMjg1ZThlfS5idG4tcHJpbWFyeTphY3RpdmUsLmJ0bi1wcmltYXJ5LmFjdGl2ZSwub3BlbiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1wcmltYXJ5e2JhY2tncm91bmQtaW1hZ2U6bm9uZX0uYnRuLXByaW1hcnkuZGlzYWJsZWQsLmJ0bi1wcmltYXJ5W2Rpc2FibGVkXSxmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1wcmltYXJ5LC5idG4tcHJpbWFyeS5kaXNhYmxlZDpob3ZlciwuYnRuLXByaW1hcnlbZGlzYWJsZWRdOmhvdmVyLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXByaW1hcnk6aG92ZXIsLmJ0bi1wcmltYXJ5LmRpc2FibGVkOmZvY3VzLC5idG4tcHJpbWFyeVtkaXNhYmxlZF06Zm9jdXMsZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tcHJpbWFyeTpmb2N1cywuYnRuLXByaW1hcnkuZGlzYWJsZWQ6YWN0aXZlLC5idG4tcHJpbWFyeVtkaXNhYmxlZF06YWN0aXZlLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXByaW1hcnk6YWN0aXZlLC5idG4tcHJpbWFyeS5kaXNhYmxlZC5hY3RpdmUsLmJ0bi1wcmltYXJ5W2Rpc2FibGVkXS5hY3RpdmUsZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tcHJpbWFyeS5hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojNDI4YmNhO2JvcmRlci1jb2xvcjojMzU3ZWJkfS5idG4tcHJpbWFyeSAuYmFkZ2V7Y29sb3I6IzQyOGJjYTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmJ0bi1zdWNjZXNze2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjojNWNiODVjO2JvcmRlci1jb2xvcjojNGNhZTRjfS5idG4tc3VjY2Vzczpob3ZlciwuYnRuLXN1Y2Nlc3M6Zm9jdXMsLmJ0bi1zdWNjZXNzOmFjdGl2ZSwuYnRuLXN1Y2Nlc3MuYWN0aXZlLC5vcGVuIC5kcm9wZG93bi10b2dnbGUuYnRuLXN1Y2Nlc3N7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiM0N2E0NDc7Ym9yZGVyLWNvbG9yOiMzOTg0Mzl9LmJ0bi1zdWNjZXNzOmFjdGl2ZSwuYnRuLXN1Y2Nlc3MuYWN0aXZlLC5vcGVuIC5kcm9wZG93bi10b2dnbGUuYnRuLXN1Y2Nlc3N7YmFja2dyb3VuZC1pbWFnZTpub25lfS5idG4tc3VjY2Vzcy5kaXNhYmxlZCwuYnRuLXN1Y2Nlc3NbZGlzYWJsZWRdLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXN1Y2Nlc3MsLmJ0bi1zdWNjZXNzLmRpc2FibGVkOmhvdmVyLC5idG4tc3VjY2Vzc1tkaXNhYmxlZF06aG92ZXIsZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tc3VjY2Vzczpob3ZlciwuYnRuLXN1Y2Nlc3MuZGlzYWJsZWQ6Zm9jdXMsLmJ0bi1zdWNjZXNzW2Rpc2FibGVkXTpmb2N1cyxmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1zdWNjZXNzOmZvY3VzLC5idG4tc3VjY2Vzcy5kaXNhYmxlZDphY3RpdmUsLmJ0bi1zdWNjZXNzW2Rpc2FibGVkXTphY3RpdmUsZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tc3VjY2VzczphY3RpdmUsLmJ0bi1zdWNjZXNzLmRpc2FibGVkLmFjdGl2ZSwuYnRuLXN1Y2Nlc3NbZGlzYWJsZWRdLmFjdGl2ZSxmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1zdWNjZXNzLmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiM1Y2I4NWM7Ym9yZGVyLWNvbG9yOiM0Y2FlNGN9LmJ0bi1zdWNjZXNzIC5iYWRnZXtjb2xvcjojNWNiODVjO2JhY2tncm91bmQtY29sb3I6I2ZmZn0uYnRuLWluZm97Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiM1YmMwZGU7Ym9yZGVyLWNvbG9yOiM0NmI4ZGF9LmJ0bi1pbmZvOmhvdmVyLC5idG4taW5mbzpmb2N1cywuYnRuLWluZm86YWN0aXZlLC5idG4taW5mby5hY3RpdmUsLm9wZW4gLmRyb3Bkb3duLXRvZ2dsZS5idG4taW5mb3tjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6IzM5YjNkNztib3JkZXItY29sb3I6IzI2OWFiY30uYnRuLWluZm86YWN0aXZlLC5idG4taW5mby5hY3RpdmUsLm9wZW4gLmRyb3Bkb3duLXRvZ2dsZS5idG4taW5mb3tiYWNrZ3JvdW5kLWltYWdlOm5vbmV9LmJ0bi1pbmZvLmRpc2FibGVkLC5idG4taW5mb1tkaXNhYmxlZF0sZmllbGRzZXRbZGlzYWJsZWRdIC5idG4taW5mbywuYnRuLWluZm8uZGlzYWJsZWQ6aG92ZXIsLmJ0bi1pbmZvW2Rpc2FibGVkXTpob3ZlcixmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1pbmZvOmhvdmVyLC5idG4taW5mby5kaXNhYmxlZDpmb2N1cywuYnRuLWluZm9bZGlzYWJsZWRdOmZvY3VzLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWluZm86Zm9jdXMsLmJ0bi1pbmZvLmRpc2FibGVkOmFjdGl2ZSwuYnRuLWluZm9bZGlzYWJsZWRdOmFjdGl2ZSxmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1pbmZvOmFjdGl2ZSwuYnRuLWluZm8uZGlzYWJsZWQuYWN0aXZlLC5idG4taW5mb1tkaXNhYmxlZF0uYWN0aXZlLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWluZm8uYWN0aXZle2JhY2tncm91bmQtY29sb3I6IzViYzBkZTtib3JkZXItY29sb3I6IzQ2YjhkYX0uYnRuLWluZm8gLmJhZGdle2NvbG9yOiM1YmMwZGU7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5idG4td2FybmluZ3tjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6I2YwYWQ0ZTtib3JkZXItY29sb3I6I2VlYTIzNn0uYnRuLXdhcm5pbmc6aG92ZXIsLmJ0bi13YXJuaW5nOmZvY3VzLC5idG4td2FybmluZzphY3RpdmUsLmJ0bi13YXJuaW5nLmFjdGl2ZSwub3BlbiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi13YXJuaW5ne2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjojZWQ5YzI4O2JvcmRlci1jb2xvcjojZDU4NTEyfS5idG4td2FybmluZzphY3RpdmUsLmJ0bi13YXJuaW5nLmFjdGl2ZSwub3BlbiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi13YXJuaW5ne2JhY2tncm91bmQtaW1hZ2U6bm9uZX0uYnRuLXdhcm5pbmcuZGlzYWJsZWQsLmJ0bi13YXJuaW5nW2Rpc2FibGVkXSxmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi13YXJuaW5nLC5idG4td2FybmluZy5kaXNhYmxlZDpob3ZlciwuYnRuLXdhcm5pbmdbZGlzYWJsZWRdOmhvdmVyLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXdhcm5pbmc6aG92ZXIsLmJ0bi13YXJuaW5nLmRpc2FibGVkOmZvY3VzLC5idG4td2FybmluZ1tkaXNhYmxlZF06Zm9jdXMsZmllbGRzZXRbZGlzYWJsZWRdIC5idG4td2FybmluZzpmb2N1cywuYnRuLXdhcm5pbmcuZGlzYWJsZWQ6YWN0aXZlLC5idG4td2FybmluZ1tkaXNhYmxlZF06YWN0aXZlLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLXdhcm5pbmc6YWN0aXZlLC5idG4td2FybmluZy5kaXNhYmxlZC5hY3RpdmUsLmJ0bi13YXJuaW5nW2Rpc2FibGVkXS5hY3RpdmUsZmllbGRzZXRbZGlzYWJsZWRdIC5idG4td2FybmluZy5hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojZjBhZDRlO2JvcmRlci1jb2xvcjojZWVhMjM2fS5idG4td2FybmluZyAuYmFkZ2V7Y29sb3I6I2YwYWQ0ZTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmZ9LmJ0bi1kYW5nZXJ7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiNkOTUzNGY7Ym9yZGVyLWNvbG9yOiNkNDNmM2F9LmJ0bi1kYW5nZXI6aG92ZXIsLmJ0bi1kYW5nZXI6Zm9jdXMsLmJ0bi1kYW5nZXI6YWN0aXZlLC5idG4tZGFuZ2VyLmFjdGl2ZSwub3BlbiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1kYW5nZXJ7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiNkMjMyMmQ7Ym9yZGVyLWNvbG9yOiNhYzI5MjV9LmJ0bi1kYW5nZXI6YWN0aXZlLC5idG4tZGFuZ2VyLmFjdGl2ZSwub3BlbiAuZHJvcGRvd24tdG9nZ2xlLmJ0bi1kYW5nZXJ7YmFja2dyb3VuZC1pbWFnZTpub25lfS5idG4tZGFuZ2VyLmRpc2FibGVkLC5idG4tZGFuZ2VyW2Rpc2FibGVkXSxmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1kYW5nZXIsLmJ0bi1kYW5nZXIuZGlzYWJsZWQ6aG92ZXIsLmJ0bi1kYW5nZXJbZGlzYWJsZWRdOmhvdmVyLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRhbmdlcjpob3ZlciwuYnRuLWRhbmdlci5kaXNhYmxlZDpmb2N1cywuYnRuLWRhbmdlcltkaXNhYmxlZF06Zm9jdXMsZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tZGFuZ2VyOmZvY3VzLC5idG4tZGFuZ2VyLmRpc2FibGVkOmFjdGl2ZSwuYnRuLWRhbmdlcltkaXNhYmxlZF06YWN0aXZlLGZpZWxkc2V0W2Rpc2FibGVkXSAuYnRuLWRhbmdlcjphY3RpdmUsLmJ0bi1kYW5nZXIuZGlzYWJsZWQuYWN0aXZlLC5idG4tZGFuZ2VyW2Rpc2FibGVkXS5hY3RpdmUsZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tZGFuZ2VyLmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiNkOTUzNGY7Ym9yZGVyLWNvbG9yOiNkNDNmM2F9LmJ0bi1kYW5nZXIgLmJhZGdle2NvbG9yOiNkOTUzNGY7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5idG4tbGlua3tjb2xvcjojNDI4YmNhO2ZvbnQtd2VpZ2h0OjQwMDtjdXJzb3I6cG9pbnRlcjtib3JkZXItcmFkaXVzOjB9LmJ0bi1saW5rLC5idG4tbGluazphY3RpdmUsLmJ0bi1saW5rW2Rpc2FibGVkXSxmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1saW5re2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7LXdlYmtpdC1ib3gtc2hhZG93Om5vbmU7Ym94LXNoYWRvdzpub25lfS5idG4tbGluaywuYnRuLWxpbms6aG92ZXIsLmJ0bi1saW5rOmZvY3VzLC5idG4tbGluazphY3RpdmV7Ym9yZGVyLWNvbG9yOnRyYW5zcGFyZW50fS5idG4tbGluazpob3ZlciwuYnRuLWxpbms6Zm9jdXN7Y29sb3I6IzJhNjQ5Njt0ZXh0LWRlY29yYXRpb246dW5kZXJsaW5lO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9LmJ0bi1saW5rW2Rpc2FibGVkXTpob3ZlcixmaWVsZHNldFtkaXNhYmxlZF0gLmJ0bi1saW5rOmhvdmVyLC5idG4tbGlua1tkaXNhYmxlZF06Zm9jdXMsZmllbGRzZXRbZGlzYWJsZWRdIC5idG4tbGluazpmb2N1c3tjb2xvcjojOTk5O3RleHQtZGVjb3JhdGlvbjpub25lfS5idG4tbGcsLmJ0bi1ncm91cC1sZz4uYnRue3BhZGRpbmc6MTBweCAxNnB4O2ZvbnQtc2l6ZToxOHB4O2xpbmUtaGVpZ2h0OjEuMzM7Ym9yZGVyLXJhZGl1czo2cHh9LmJ0bi1zbSwuYnRuLWdyb3VwLXNtPi5idG57cGFkZGluZzo1cHggMTBweDtmb250LXNpemU6MTJweDtsaW5lLWhlaWdodDoxLjU7Ym9yZGVyLXJhZGl1czozcHh9LmJ0bi14cywuYnRuLWdyb3VwLXhzPi5idG57cGFkZGluZzoxcHggNXB4O2ZvbnQtc2l6ZToxMnB4O2xpbmUtaGVpZ2h0OjEuNTtib3JkZXItcmFkaXVzOjNweH0uYnRuLWJsb2Nre2Rpc3BsYXk6YmxvY2s7d2lkdGg6MTAwJTtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9LmJ0bi1ibG9jaysuYnRuLWJsb2Nre21hcmdpbi10b3A6NXB4fWlucHV0W3R5cGU9c3VibWl0XS5idG4tYmxvY2ssaW5wdXRbdHlwZT1yZXNldF0uYnRuLWJsb2NrLGlucHV0W3R5cGU9YnV0dG9uXS5idG4tYmxvY2t7d2lkdGg6MTAwJX0uZmFkZXtvcGFjaXR5OjA7LXdlYmtpdC10cmFuc2l0aW9uOm9wYWNpdHkgLjE1cyBsaW5lYXI7dHJhbnNpdGlvbjpvcGFjaXR5IC4xNXMgbGluZWFyfS5mYWRlLmlue29wYWNpdHk6MX0uY29sbGFwc2V7ZGlzcGxheTpub25lfS5jb2xsYXBzZS5pbntkaXNwbGF5OmJsb2NrfS5jb2xsYXBzaW5ne3Bvc2l0aW9uOnJlbGF0aXZlO2hlaWdodDowO292ZXJmbG93OmhpZGRlbjstd2Via2l0LXRyYW5zaXRpb246aGVpZ2h0IC4zNXMgZWFzZTt0cmFuc2l0aW9uOmhlaWdodCAuMzVzIGVhc2V9QGZvbnQtZmFjZXtmb250LWZhbWlseTonR2x5cGhpY29ucyBIYWxmbGluZ3MnO3NyYzp1cmwoLi4vZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci5lb3QpO3NyYzp1cmwoLi4vZm9udHMvZ2x5cGhpY29ucy1oYWxmbGluZ3MtcmVndWxhci5lb3Q/I2llZml4KSBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksdXJsKC4uL2ZvbnRzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIud29mZikgZm9ybWF0KCd3b2ZmJyksdXJsKC4uL2ZvbnRzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIudHRmKSBmb3JtYXQoJ3RydWV0eXBlJyksdXJsKC4uL2ZvbnRzL2dseXBoaWNvbnMtaGFsZmxpbmdzLXJlZ3VsYXIuc3ZnI2dseXBoaWNvbnNfaGFsZmxpbmdzcmVndWxhcikgZm9ybWF0KCdzdmcnKX0uZ2x5cGhpY29ue3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDoxcHg7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1mYW1pbHk6J0dseXBoaWNvbnMgSGFsZmxpbmdzJztmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZX0uZ2x5cGhpY29uLWFzdGVyaXNrOmJlZm9yZXtjb250ZW50OiJcMmEifS5nbHlwaGljb24tcGx1czpiZWZvcmV7Y29udGVudDoiXDJiIn0uZ2x5cGhpY29uLWV1cm86YmVmb3Jle2NvbnRlbnQ6IlwyMGFjIn0uZ2x5cGhpY29uLW1pbnVzOmJlZm9yZXtjb250ZW50OiJcMjIxMiJ9LmdseXBoaWNvbi1jbG91ZDpiZWZvcmV7Y29udGVudDoiXDI2MDEifS5nbHlwaGljb24tZW52ZWxvcGU6YmVmb3Jle2NvbnRlbnQ6IlwyNzA5In0uZ2x5cGhpY29uLXBlbmNpbDpiZWZvcmV7Y29udGVudDoiXDI3MGYifS5nbHlwaGljb24tZ2xhc3M6YmVmb3Jle2NvbnRlbnQ6IlxlMDAxIn0uZ2x5cGhpY29uLW11c2ljOmJlZm9yZXtjb250ZW50OiJcZTAwMiJ9LmdseXBoaWNvbi1zZWFyY2g6YmVmb3Jle2NvbnRlbnQ6IlxlMDAzIn0uZ2x5cGhpY29uLWhlYXJ0OmJlZm9yZXtjb250ZW50OiJcZTAwNSJ9LmdseXBoaWNvbi1zdGFyOmJlZm9yZXtjb250ZW50OiJcZTAwNiJ9LmdseXBoaWNvbi1zdGFyLWVtcHR5OmJlZm9yZXtjb250ZW50OiJcZTAwNyJ9LmdseXBoaWNvbi11c2VyOmJlZm9yZXtjb250ZW50OiJcZTAwOCJ9LmdseXBoaWNvbi1maWxtOmJlZm9yZXtjb250ZW50OiJcZTAwOSJ9LmdseXBoaWNvbi10aC1sYXJnZTpiZWZvcmV7Y29udGVudDoiXGUwMTAifS5nbHlwaGljb24tdGg6YmVmb3Jle2NvbnRlbnQ6IlxlMDExIn0uZ2x5cGhpY29uLXRoLWxpc3Q6YmVmb3Jle2NvbnRlbnQ6IlxlMDEyIn0uZ2x5cGhpY29uLW9rOmJlZm9yZXtjb250ZW50OiJcZTAxMyJ9LmdseXBoaWNvbi1yZW1vdmU6YmVmb3Jle2NvbnRlbnQ6IlxlMDE0In0uZ2x5cGhpY29uLXpvb20taW46YmVmb3Jle2NvbnRlbnQ6IlxlMDE1In0uZ2x5cGhpY29uLXpvb20tb3V0OmJlZm9yZXtjb250ZW50OiJcZTAxNiJ9LmdseXBoaWNvbi1vZmY6YmVmb3Jle2NvbnRlbnQ6IlxlMDE3In0uZ2x5cGhpY29uLXNpZ25hbDpiZWZvcmV7Y29udGVudDoiXGUwMTgifS5nbHlwaGljb24tY29nOmJlZm9yZXtjb250ZW50OiJcZTAxOSJ9LmdseXBoaWNvbi10cmFzaDpiZWZvcmV7Y29udGVudDoiXGUwMjAifS5nbHlwaGljb24taG9tZTpiZWZvcmV7Y29udGVudDoiXGUwMjEifS5nbHlwaGljb24tZmlsZTpiZWZvcmV7Y29udGVudDoiXGUwMjIifS5nbHlwaGljb24tdGltZTpiZWZvcmV7Y29udGVudDoiXGUwMjMifS5nbHlwaGljb24tcm9hZDpiZWZvcmV7Y29udGVudDoiXGUwMjQifS5nbHlwaGljb24tZG93bmxvYWQtYWx0OmJlZm9yZXtjb250ZW50OiJcZTAyNSJ9LmdseXBoaWNvbi1kb3dubG9hZDpiZWZvcmV7Y29udGVudDoiXGUwMjYifS5nbHlwaGljb24tdXBsb2FkOmJlZm9yZXtjb250ZW50OiJcZTAyNyJ9LmdseXBoaWNvbi1pbmJveDpiZWZvcmV7Y29udGVudDoiXGUwMjgifS5nbHlwaGljb24tcGxheS1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6IlxlMDI5In0uZ2x5cGhpY29uLXJlcGVhdDpiZWZvcmV7Y29udGVudDoiXGUwMzAifS5nbHlwaGljb24tcmVmcmVzaDpiZWZvcmV7Y29udGVudDoiXGUwMzEifS5nbHlwaGljb24tbGlzdC1hbHQ6YmVmb3Jle2NvbnRlbnQ6IlxlMDMyIn0uZ2x5cGhpY29uLWxvY2s6YmVmb3Jle2NvbnRlbnQ6IlxlMDMzIn0uZ2x5cGhpY29uLWZsYWc6YmVmb3Jle2NvbnRlbnQ6IlxlMDM0In0uZ2x5cGhpY29uLWhlYWRwaG9uZXM6YmVmb3Jle2NvbnRlbnQ6IlxlMDM1In0uZ2x5cGhpY29uLXZvbHVtZS1vZmY6YmVmb3Jle2NvbnRlbnQ6IlxlMDM2In0uZ2x5cGhpY29uLXZvbHVtZS1kb3duOmJlZm9yZXtjb250ZW50OiJcZTAzNyJ9LmdseXBoaWNvbi12b2x1bWUtdXA6YmVmb3Jle2NvbnRlbnQ6IlxlMDM4In0uZ2x5cGhpY29uLXFyY29kZTpiZWZvcmV7Y29udGVudDoiXGUwMzkifS5nbHlwaGljb24tYmFyY29kZTpiZWZvcmV7Y29udGVudDoiXGUwNDAifS5nbHlwaGljb24tdGFnOmJlZm9yZXtjb250ZW50OiJcZTA0MSJ9LmdseXBoaWNvbi10YWdzOmJlZm9yZXtjb250ZW50OiJcZTA0MiJ9LmdseXBoaWNvbi1ib29rOmJlZm9yZXtjb250ZW50OiJcZTA0MyJ9LmdseXBoaWNvbi1ib29rbWFyazpiZWZvcmV7Y29udGVudDoiXGUwNDQifS5nbHlwaGljb24tcHJpbnQ6YmVmb3Jle2NvbnRlbnQ6IlxlMDQ1In0uZ2x5cGhpY29uLWNhbWVyYTpiZWZvcmV7Y29udGVudDoiXGUwNDYifS5nbHlwaGljb24tZm9udDpiZWZvcmV7Y29udGVudDoiXGUwNDcifS5nbHlwaGljb24tYm9sZDpiZWZvcmV7Y29udGVudDoiXGUwNDgifS5nbHlwaGljb24taXRhbGljOmJlZm9yZXtjb250ZW50OiJcZTA0OSJ9LmdseXBoaWNvbi10ZXh0LWhlaWdodDpiZWZvcmV7Y29udGVudDoiXGUwNTAifS5nbHlwaGljb24tdGV4dC13aWR0aDpiZWZvcmV7Y29udGVudDoiXGUwNTEifS5nbHlwaGljb24tYWxpZ24tbGVmdDpiZWZvcmV7Y29udGVudDoiXGUwNTIifS5nbHlwaGljb24tYWxpZ24tY2VudGVyOmJlZm9yZXtjb250ZW50OiJcZTA1MyJ9LmdseXBoaWNvbi1hbGlnbi1yaWdodDpiZWZvcmV7Y29udGVudDoiXGUwNTQifS5nbHlwaGljb24tYWxpZ24tanVzdGlmeTpiZWZvcmV7Y29udGVudDoiXGUwNTUifS5nbHlwaGljb24tbGlzdDpiZWZvcmV7Y29udGVudDoiXGUwNTYifS5nbHlwaGljb24taW5kZW50LWxlZnQ6YmVmb3Jle2NvbnRlbnQ6IlxlMDU3In0uZ2x5cGhpY29uLWluZGVudC1yaWdodDpiZWZvcmV7Y29udGVudDoiXGUwNTgifS5nbHlwaGljb24tZmFjZXRpbWUtdmlkZW86YmVmb3Jle2NvbnRlbnQ6IlxlMDU5In0uZ2x5cGhpY29uLXBpY3R1cmU6YmVmb3Jle2NvbnRlbnQ6IlxlMDYwIn0uZ2x5cGhpY29uLW1hcC1tYXJrZXI6YmVmb3Jle2NvbnRlbnQ6IlxlMDYyIn0uZ2x5cGhpY29uLWFkanVzdDpiZWZvcmV7Y29udGVudDoiXGUwNjMifS5nbHlwaGljb24tdGludDpiZWZvcmV7Y29udGVudDoiXGUwNjQifS5nbHlwaGljb24tZWRpdDpiZWZvcmV7Y29udGVudDoiXGUwNjUifS5nbHlwaGljb24tc2hhcmU6YmVmb3Jle2NvbnRlbnQ6IlxlMDY2In0uZ2x5cGhpY29uLWNoZWNrOmJlZm9yZXtjb250ZW50OiJcZTA2NyJ9LmdseXBoaWNvbi1tb3ZlOmJlZm9yZXtjb250ZW50OiJcZTA2OCJ9LmdseXBoaWNvbi1zdGVwLWJhY2t3YXJkOmJlZm9yZXtjb250ZW50OiJcZTA2OSJ9LmdseXBoaWNvbi1mYXN0LWJhY2t3YXJkOmJlZm9yZXtjb250ZW50OiJcZTA3MCJ9LmdseXBoaWNvbi1iYWNrd2FyZDpiZWZvcmV7Y29udGVudDoiXGUwNzEifS5nbHlwaGljb24tcGxheTpiZWZvcmV7Y29udGVudDoiXGUwNzIifS5nbHlwaGljb24tcGF1c2U6YmVmb3Jle2NvbnRlbnQ6IlxlMDczIn0uZ2x5cGhpY29uLXN0b3A6YmVmb3Jle2NvbnRlbnQ6IlxlMDc0In0uZ2x5cGhpY29uLWZvcndhcmQ6YmVmb3Jle2NvbnRlbnQ6IlxlMDc1In0uZ2x5cGhpY29uLWZhc3QtZm9yd2FyZDpiZWZvcmV7Y29udGVudDoiXGUwNzYifS5nbHlwaGljb24tc3RlcC1mb3J3YXJkOmJlZm9yZXtjb250ZW50OiJcZTA3NyJ9LmdseXBoaWNvbi1lamVjdDpiZWZvcmV7Y29udGVudDoiXGUwNzgifS5nbHlwaGljb24tY2hldnJvbi1sZWZ0OmJlZm9yZXtjb250ZW50OiJcZTA3OSJ9LmdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0OmJlZm9yZXtjb250ZW50OiJcZTA4MCJ9LmdseXBoaWNvbi1wbHVzLXNpZ246YmVmb3Jle2NvbnRlbnQ6IlxlMDgxIn0uZ2x5cGhpY29uLW1pbnVzLXNpZ246YmVmb3Jle2NvbnRlbnQ6IlxlMDgyIn0uZ2x5cGhpY29uLXJlbW92ZS1zaWduOmJlZm9yZXtjb250ZW50OiJcZTA4MyJ9LmdseXBoaWNvbi1vay1zaWduOmJlZm9yZXtjb250ZW50OiJcZTA4NCJ9LmdseXBoaWNvbi1xdWVzdGlvbi1zaWduOmJlZm9yZXtjb250ZW50OiJcZTA4NSJ9LmdseXBoaWNvbi1pbmZvLXNpZ246YmVmb3Jle2NvbnRlbnQ6IlxlMDg2In0uZ2x5cGhpY29uLXNjcmVlbnNob3Q6YmVmb3Jle2NvbnRlbnQ6IlxlMDg3In0uZ2x5cGhpY29uLXJlbW92ZS1jaXJjbGU6YmVmb3Jle2NvbnRlbnQ6IlxlMDg4In0uZ2x5cGhpY29uLW9rLWNpcmNsZTpiZWZvcmV7Y29udGVudDoiXGUwODkifS5nbHlwaGljb24tYmFuLWNpcmNsZTpiZWZvcmV7Y29udGVudDoiXGUwOTAifS5nbHlwaGljb24tYXJyb3ctbGVmdDpiZWZvcmV7Y29udGVudDoiXGUwOTEifS5nbHlwaGljb24tYXJyb3ctcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6IlxlMDkyIn0uZ2x5cGhpY29uLWFycm93LXVwOmJlZm9yZXtjb250ZW50OiJcZTA5MyJ9LmdseXBoaWNvbi1hcnJvdy1kb3duOmJlZm9yZXtjb250ZW50OiJcZTA5NCJ9LmdseXBoaWNvbi1zaGFyZS1hbHQ6YmVmb3Jle2NvbnRlbnQ6IlxlMDk1In0uZ2x5cGhpY29uLXJlc2l6ZS1mdWxsOmJlZm9yZXtjb250ZW50OiJcZTA5NiJ9LmdseXBoaWNvbi1yZXNpemUtc21hbGw6YmVmb3Jle2NvbnRlbnQ6IlxlMDk3In0uZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ246YmVmb3Jle2NvbnRlbnQ6IlxlMTAxIn0uZ2x5cGhpY29uLWdpZnQ6YmVmb3Jle2NvbnRlbnQ6IlxlMTAyIn0uZ2x5cGhpY29uLWxlYWY6YmVmb3Jle2NvbnRlbnQ6IlxlMTAzIn0uZ2x5cGhpY29uLWZpcmU6YmVmb3Jle2NvbnRlbnQ6IlxlMTA0In0uZ2x5cGhpY29uLWV5ZS1vcGVuOmJlZm9yZXtjb250ZW50OiJcZTEwNSJ9LmdseXBoaWNvbi1leWUtY2xvc2U6YmVmb3Jle2NvbnRlbnQ6IlxlMTA2In0uZ2x5cGhpY29uLXdhcm5pbmctc2lnbjpiZWZvcmV7Y29udGVudDoiXGUxMDcifS5nbHlwaGljb24tcGxhbmU6YmVmb3Jle2NvbnRlbnQ6IlxlMTA4In0uZ2x5cGhpY29uLWNhbGVuZGFyOmJlZm9yZXtjb250ZW50OiJcZTEwOSJ9LmdseXBoaWNvbi1yYW5kb206YmVmb3Jle2NvbnRlbnQ6IlxlMTEwIn0uZ2x5cGhpY29uLWNvbW1lbnQ6YmVmb3Jle2NvbnRlbnQ6IlxlMTExIn0uZ2x5cGhpY29uLW1hZ25ldDpiZWZvcmV7Y29udGVudDoiXGUxMTIifS5nbHlwaGljb24tY2hldnJvbi11cDpiZWZvcmV7Y29udGVudDoiXGUxMTMifS5nbHlwaGljb24tY2hldnJvbi1kb3duOmJlZm9yZXtjb250ZW50OiJcZTExNCJ9LmdseXBoaWNvbi1yZXR3ZWV0OmJlZm9yZXtjb250ZW50OiJcZTExNSJ9LmdseXBoaWNvbi1zaG9wcGluZy1jYXJ0OmJlZm9yZXtjb250ZW50OiJcZTExNiJ9LmdseXBoaWNvbi1mb2xkZXItY2xvc2U6YmVmb3Jle2NvbnRlbnQ6IlxlMTE3In0uZ2x5cGhpY29uLWZvbGRlci1vcGVuOmJlZm9yZXtjb250ZW50OiJcZTExOCJ9LmdseXBoaWNvbi1yZXNpemUtdmVydGljYWw6YmVmb3Jle2NvbnRlbnQ6IlxlMTE5In0uZ2x5cGhpY29uLXJlc2l6ZS1ob3Jpem9udGFsOmJlZm9yZXtjb250ZW50OiJcZTEyMCJ9LmdseXBoaWNvbi1oZGQ6YmVmb3Jle2NvbnRlbnQ6IlxlMTIxIn0uZ2x5cGhpY29uLWJ1bGxob3JuOmJlZm9yZXtjb250ZW50OiJcZTEyMiJ9LmdseXBoaWNvbi1iZWxsOmJlZm9yZXtjb250ZW50OiJcZTEyMyJ9LmdseXBoaWNvbi1jZXJ0aWZpY2F0ZTpiZWZvcmV7Y29udGVudDoiXGUxMjQifS5nbHlwaGljb24tdGh1bWJzLXVwOmJlZm9yZXtjb250ZW50OiJcZTEyNSJ9LmdseXBoaWNvbi10aHVtYnMtZG93bjpiZWZvcmV7Y29udGVudDoiXGUxMjYifS5nbHlwaGljb24taGFuZC1yaWdodDpiZWZvcmV7Y29udGVudDoiXGUxMjcifS5nbHlwaGljb24taGFuZC1sZWZ0OmJlZm9yZXtjb250ZW50OiJcZTEyOCJ9LmdseXBoaWNvbi1oYW5kLXVwOmJlZm9yZXtjb250ZW50OiJcZTEyOSJ9LmdseXBoaWNvbi1oYW5kLWRvd246YmVmb3Jle2NvbnRlbnQ6IlxlMTMwIn0uZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy1yaWdodDpiZWZvcmV7Y29udGVudDoiXGUxMzEifS5nbHlwaGljb24tY2lyY2xlLWFycm93LWxlZnQ6YmVmb3Jle2NvbnRlbnQ6IlxlMTMyIn0uZ2x5cGhpY29uLWNpcmNsZS1hcnJvdy11cDpiZWZvcmV7Y29udGVudDoiXGUxMzMifS5nbHlwaGljb24tY2lyY2xlLWFycm93LWRvd246YmVmb3Jle2NvbnRlbnQ6IlxlMTM0In0uZ2x5cGhpY29uLWdsb2JlOmJlZm9yZXtjb250ZW50OiJcZTEzNSJ9LmdseXBoaWNvbi13cmVuY2g6YmVmb3Jle2NvbnRlbnQ6IlxlMTM2In0uZ2x5cGhpY29uLXRhc2tzOmJlZm9yZXtjb250ZW50OiJcZTEzNyJ9LmdseXBoaWNvbi1maWx0ZXI6YmVmb3Jle2NvbnRlbnQ6IlxlMTM4In0uZ2x5cGhpY29uLWJyaWVmY2FzZTpiZWZvcmV7Y29udGVudDoiXGUxMzkifS5nbHlwaGljb24tZnVsbHNjcmVlbjpiZWZvcmV7Y29udGVudDoiXGUxNDAifS5nbHlwaGljb24tZGFzaGJvYXJkOmJlZm9yZXtjb250ZW50OiJcZTE0MSJ9LmdseXBoaWNvbi1wYXBlcmNsaXA6YmVmb3Jle2NvbnRlbnQ6IlxlMTQyIn0uZ2x5cGhpY29uLWhlYXJ0LWVtcHR5OmJlZm9yZXtjb250ZW50OiJcZTE0MyJ9LmdseXBoaWNvbi1saW5rOmJlZm9yZXtjb250ZW50OiJcZTE0NCJ9LmdseXBoaWNvbi1waG9uZTpiZWZvcmV7Y29udGVudDoiXGUxNDUifS5nbHlwaGljb24tcHVzaHBpbjpiZWZvcmV7Y29udGVudDoiXGUxNDYifS5nbHlwaGljb24tdXNkOmJlZm9yZXtjb250ZW50OiJcZTE0OCJ9LmdseXBoaWNvbi1nYnA6YmVmb3Jle2NvbnRlbnQ6IlxlMTQ5In0uZ2x5cGhpY29uLXNvcnQ6YmVmb3Jle2NvbnRlbnQ6IlxlMTUwIn0uZ2x5cGhpY29uLXNvcnQtYnktYWxwaGFiZXQ6YmVmb3Jle2NvbnRlbnQ6IlxlMTUxIn0uZ2x5cGhpY29uLXNvcnQtYnktYWxwaGFiZXQtYWx0OmJlZm9yZXtjb250ZW50OiJcZTE1MiJ9LmdseXBoaWNvbi1zb3J0LWJ5LW9yZGVyOmJlZm9yZXtjb250ZW50OiJcZTE1MyJ9LmdseXBoaWNvbi1zb3J0LWJ5LW9yZGVyLWFsdDpiZWZvcmV7Y29udGVudDoiXGUxNTQifS5nbHlwaGljb24tc29ydC1ieS1hdHRyaWJ1dGVzOmJlZm9yZXtjb250ZW50OiJcZTE1NSJ9LmdseXBoaWNvbi1zb3J0LWJ5LWF0dHJpYnV0ZXMtYWx0OmJlZm9yZXtjb250ZW50OiJcZTE1NiJ9LmdseXBoaWNvbi11bmNoZWNrZWQ6YmVmb3Jle2NvbnRlbnQ6IlxlMTU3In0uZ2x5cGhpY29uLWV4cGFuZDpiZWZvcmV7Y29udGVudDoiXGUxNTgifS5nbHlwaGljb24tY29sbGFwc2UtZG93bjpiZWZvcmV7Y29udGVudDoiXGUxNTkifS5nbHlwaGljb24tY29sbGFwc2UtdXA6YmVmb3Jle2NvbnRlbnQ6IlxlMTYwIn0uZ2x5cGhpY29uLWxvZy1pbjpiZWZvcmV7Y29udGVudDoiXGUxNjEifS5nbHlwaGljb24tZmxhc2g6YmVmb3Jle2NvbnRlbnQ6IlxlMTYyIn0uZ2x5cGhpY29uLWxvZy1vdXQ6YmVmb3Jle2NvbnRlbnQ6IlxlMTYzIn0uZ2x5cGhpY29uLW5ldy13aW5kb3c6YmVmb3Jle2NvbnRlbnQ6IlxlMTY0In0uZ2x5cGhpY29uLXJlY29yZDpiZWZvcmV7Y29udGVudDoiXGUxNjUifS5nbHlwaGljb24tc2F2ZTpiZWZvcmV7Y29udGVudDoiXGUxNjYifS5nbHlwaGljb24tb3BlbjpiZWZvcmV7Y29udGVudDoiXGUxNjcifS5nbHlwaGljb24tc2F2ZWQ6YmVmb3Jle2NvbnRlbnQ6IlxlMTY4In0uZ2x5cGhpY29uLWltcG9ydDpiZWZvcmV7Y29udGVudDoiXGUxNjkifS5nbHlwaGljb24tZXhwb3J0OmJlZm9yZXtjb250ZW50OiJcZTE3MCJ9LmdseXBoaWNvbi1zZW5kOmJlZm9yZXtjb250ZW50OiJcZTE3MSJ9LmdseXBoaWNvbi1mbG9wcHktZGlzazpiZWZvcmV7Y29udGVudDoiXGUxNzIifS5nbHlwaGljb24tZmxvcHB5LXNhdmVkOmJlZm9yZXtjb250ZW50OiJcZTE3MyJ9LmdseXBoaWNvbi1mbG9wcHktcmVtb3ZlOmJlZm9yZXtjb250ZW50OiJcZTE3NCJ9LmdseXBoaWNvbi1mbG9wcHktc2F2ZTpiZWZvcmV7Y29udGVudDoiXGUxNzUifS5nbHlwaGljb24tZmxvcHB5LW9wZW46YmVmb3Jle2NvbnRlbnQ6IlxlMTc2In0uZ2x5cGhpY29uLWNyZWRpdC1jYXJkOmJlZm9yZXtjb250ZW50OiJcZTE3NyJ9LmdseXBoaWNvbi10cmFuc2ZlcjpiZWZvcmV7Y29udGVudDoiXGUxNzgifS5nbHlwaGljb24tY3V0bGVyeTpiZWZvcmV7Y29udGVudDoiXGUxNzkifS5nbHlwaGljb24taGVhZGVyOmJlZm9yZXtjb250ZW50OiJcZTE4MCJ9LmdseXBoaWNvbi1jb21wcmVzc2VkOmJlZm9yZXtjb250ZW50OiJcZTE4MSJ9LmdseXBoaWNvbi1lYXJwaG9uZTpiZWZvcmV7Y29udGVudDoiXGUxODIifS5nbHlwaGljb24tcGhvbmUtYWx0OmJlZm9yZXtjb250ZW50OiJcZTE4MyJ9LmdseXBoaWNvbi10b3dlcjpiZWZvcmV7Y29udGVudDoiXGUxODQifS5nbHlwaGljb24tc3RhdHM6YmVmb3Jle2NvbnRlbnQ6IlxlMTg1In0uZ2x5cGhpY29uLXNkLXZpZGVvOmJlZm9yZXtjb250ZW50OiJcZTE4NiJ9LmdseXBoaWNvbi1oZC12aWRlbzpiZWZvcmV7Y29udGVudDoiXGUxODcifS5nbHlwaGljb24tc3VidGl0bGVzOmJlZm9yZXtjb250ZW50OiJcZTE4OCJ9LmdseXBoaWNvbi1zb3VuZC1zdGVyZW86YmVmb3Jle2NvbnRlbnQ6IlxlMTg5In0uZ2x5cGhpY29uLXNvdW5kLWRvbGJ5OmJlZm9yZXtjb250ZW50OiJcZTE5MCJ9LmdseXBoaWNvbi1zb3VuZC01LTE6YmVmb3Jle2NvbnRlbnQ6IlxlMTkxIn0uZ2x5cGhpY29uLXNvdW5kLTYtMTpiZWZvcmV7Y29udGVudDoiXGUxOTIifS5nbHlwaGljb24tc291bmQtNy0xOmJlZm9yZXtjb250ZW50OiJcZTE5MyJ9LmdseXBoaWNvbi1jb3B5cmlnaHQtbWFyazpiZWZvcmV7Y29udGVudDoiXGUxOTQifS5nbHlwaGljb24tcmVnaXN0cmF0aW9uLW1hcms6YmVmb3Jle2NvbnRlbnQ6IlxlMTk1In0uZ2x5cGhpY29uLWNsb3VkLWRvd25sb2FkOmJlZm9yZXtjb250ZW50OiJcZTE5NyJ9LmdseXBoaWNvbi1jbG91ZC11cGxvYWQ6YmVmb3Jle2NvbnRlbnQ6IlxlMTk4In0uZ2x5cGhpY29uLXRyZWUtY29uaWZlcjpiZWZvcmV7Y29udGVudDoiXGUxOTkifS5nbHlwaGljb24tdHJlZS1kZWNpZHVvdXM6YmVmb3Jle2NvbnRlbnQ6IlxlMjAwIn0uY2FyZXR7ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MDtoZWlnaHQ6MDttYXJnaW4tbGVmdDoycHg7dmVydGljYWwtYWxpZ246bWlkZGxlO2JvcmRlci10b3A6NHB4IHNvbGlkO2JvcmRlci1yaWdodDo0cHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLWxlZnQ6NHB4IHNvbGlkIHRyYW5zcGFyZW50fS5kcm9wZG93bntwb3NpdGlvbjpyZWxhdGl2ZX0uZHJvcGRvd24tdG9nZ2xlOmZvY3Vze291dGxpbmU6MH0uZHJvcGRvd24tbWVudXtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTAwJTtsZWZ0OjA7ei1pbmRleDoxMDAwO2Rpc3BsYXk6bm9uZTtmbG9hdDpsZWZ0O21pbi13aWR0aDoxNjBweDtwYWRkaW5nOjVweCAwO21hcmdpbjoycHggMCAwO2xpc3Qtc3R5bGU6bm9uZTtmb250LXNpemU6MTRweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwuMTUpO2JvcmRlci1yYWRpdXM6NHB4Oy13ZWJraXQtYm94LXNoYWRvdzowIDZweCAxMnB4IHJnYmEoMCwwLDAsLjE3NSk7Ym94LXNoYWRvdzowIDZweCAxMnB4IHJnYmEoMCwwLDAsLjE3NSk7YmFja2dyb3VuZC1jbGlwOnBhZGRpbmctYm94fS5kcm9wZG93bi1tZW51LnB1bGwtcmlnaHR7cmlnaHQ6MDtsZWZ0OmF1dG99LmRyb3Bkb3duLW1lbnUgLmRpdmlkZXJ7aGVpZ2h0OjFweDttYXJnaW46OXB4IDA7b3ZlcmZsb3c6aGlkZGVuO2JhY2tncm91bmQtY29sb3I6I2U1ZTVlNX0uZHJvcGRvd24tbWVudT5saT5he2Rpc3BsYXk6YmxvY2s7cGFkZGluZzozcHggMjBweDtjbGVhcjpib3RoO2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxLjQyODU3MTQzO2NvbG9yOiMzMzM7d2hpdGUtc3BhY2U6bm93cmFwfS5kcm9wZG93bi1tZW51PmxpPmE6aG92ZXIsLmRyb3Bkb3duLW1lbnU+bGk+YTpmb2N1c3t0ZXh0LWRlY29yYXRpb246bm9uZTtjb2xvcjojMjYyNjI2O2JhY2tncm91bmQtY29sb3I6I2Y1ZjVmNX0uZHJvcGRvd24tbWVudT4uYWN0aXZlPmEsLmRyb3Bkb3duLW1lbnU+LmFjdGl2ZT5hOmhvdmVyLC5kcm9wZG93bi1tZW51Pi5hY3RpdmU+YTpmb2N1c3tjb2xvcjojZmZmO3RleHQtZGVjb3JhdGlvbjpub25lO291dGxpbmU6MDtiYWNrZ3JvdW5kLWNvbG9yOiM0MjhiY2F9LmRyb3Bkb3duLW1lbnU+LmRpc2FibGVkPmEsLmRyb3Bkb3duLW1lbnU+LmRpc2FibGVkPmE6aG92ZXIsLmRyb3Bkb3duLW1lbnU+LmRpc2FibGVkPmE6Zm9jdXN7Y29sb3I6Izk5OX0uZHJvcGRvd24tbWVudT4uZGlzYWJsZWQ+YTpob3ZlciwuZHJvcGRvd24tbWVudT4uZGlzYWJsZWQ+YTpmb2N1c3t0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JhY2tncm91bmQtaW1hZ2U6bm9uZTtmaWx0ZXI6cHJvZ2lkOkRYSW1hZ2VUcmFuc2Zvcm0uTWljcm9zb2Z0LmdyYWRpZW50KGVuYWJsZWQ9ZmFsc2UpO2N1cnNvcjpub3QtYWxsb3dlZH0ub3Blbj4uZHJvcGRvd24tbWVudXtkaXNwbGF5OmJsb2NrfS5vcGVuPmF7b3V0bGluZTowfS5kcm9wZG93bi1tZW51LXJpZ2h0e2xlZnQ6YXV0bztyaWdodDowfS5kcm9wZG93bi1tZW51LWxlZnR7bGVmdDowO3JpZ2h0OmF1dG99LmRyb3Bkb3duLWhlYWRlcntkaXNwbGF5OmJsb2NrO3BhZGRpbmc6M3B4IDIwcHg7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mztjb2xvcjojOTk5fS5kcm9wZG93bi1iYWNrZHJvcHtwb3NpdGlvbjpmaXhlZDtsZWZ0OjA7cmlnaHQ6MDtib3R0b206MDt0b3A6MDt6LWluZGV4Ojk5MH0ucHVsbC1yaWdodD4uZHJvcGRvd24tbWVudXtyaWdodDowO2xlZnQ6YXV0b30uZHJvcHVwIC5jYXJldCwubmF2YmFyLWZpeGVkLWJvdHRvbSAuZHJvcGRvd24gLmNhcmV0e2JvcmRlci10b3A6MDtib3JkZXItYm90dG9tOjRweCBzb2xpZDtjb250ZW50OiIifS5kcm9wdXAgLmRyb3Bkb3duLW1lbnUsLm5hdmJhci1maXhlZC1ib3R0b20gLmRyb3Bkb3duIC5kcm9wZG93bi1tZW51e3RvcDphdXRvO2JvdHRvbToxMDAlO21hcmdpbi1ib3R0b206MXB4fUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2YmFyLXJpZ2h0IC5kcm9wZG93bi1tZW51e2xlZnQ6YXV0bztyaWdodDowfS5uYXZiYXItcmlnaHQgLmRyb3Bkb3duLW1lbnUtbGVmdHtsZWZ0OjA7cmlnaHQ6YXV0b319LmJ0bi1ncm91cCwuYnRuLWdyb3VwLXZlcnRpY2Fse3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uYnRuLWdyb3VwPi5idG4sLmJ0bi1ncm91cC12ZXJ0aWNhbD4uYnRue3Bvc2l0aW9uOnJlbGF0aXZlO2Zsb2F0OmxlZnR9LmJ0bi1ncm91cD4uYnRuOmhvdmVyLC5idG4tZ3JvdXAtdmVydGljYWw+LmJ0bjpob3ZlciwuYnRuLWdyb3VwPi5idG46Zm9jdXMsLmJ0bi1ncm91cC12ZXJ0aWNhbD4uYnRuOmZvY3VzLC5idG4tZ3JvdXA+LmJ0bjphY3RpdmUsLmJ0bi1ncm91cC12ZXJ0aWNhbD4uYnRuOmFjdGl2ZSwuYnRuLWdyb3VwPi5idG4uYWN0aXZlLC5idG4tZ3JvdXAtdmVydGljYWw+LmJ0bi5hY3RpdmV7ei1pbmRleDoyfS5idG4tZ3JvdXA+LmJ0bjpmb2N1cywuYnRuLWdyb3VwLXZlcnRpY2FsPi5idG46Zm9jdXN7b3V0bGluZTowfS5idG4tZ3JvdXAgLmJ0bisuYnRuLC5idG4tZ3JvdXAgLmJ0bisuYnRuLWdyb3VwLC5idG4tZ3JvdXAgLmJ0bi1ncm91cCsuYnRuLC5idG4tZ3JvdXAgLmJ0bi1ncm91cCsuYnRuLWdyb3Vwe21hcmdpbi1sZWZ0Oi0xcHh9LmJ0bi10b29sYmFye21hcmdpbi1sZWZ0Oi01cHh9LmJ0bi10b29sYmFyIC5idG4tZ3JvdXAsLmJ0bi10b29sYmFyIC5pbnB1dC1ncm91cHtmbG9hdDpsZWZ0fS5idG4tdG9vbGJhcj4uYnRuLC5idG4tdG9vbGJhcj4uYnRuLWdyb3VwLC5idG4tdG9vbGJhcj4uaW5wdXQtZ3JvdXB7bWFyZ2luLWxlZnQ6NXB4fS5idG4tZ3JvdXA+LmJ0bjpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpOm5vdCguZHJvcGRvd24tdG9nZ2xlKXtib3JkZXItcmFkaXVzOjB9LmJ0bi1ncm91cD4uYnRuOmZpcnN0LWNoaWxke21hcmdpbi1sZWZ0OjB9LmJ0bi1ncm91cD4uYnRuOmZpcnN0LWNoaWxkOm5vdCg6bGFzdC1jaGlsZCk6bm90KC5kcm9wZG93bi10b2dnbGUpe2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjA7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6MH0uYnRuLWdyb3VwPi5idG46bGFzdC1jaGlsZDpub3QoOmZpcnN0LWNoaWxkKSwuYnRuLWdyb3VwPi5kcm9wZG93bi10b2dnbGU6bm90KDpmaXJzdC1jaGlsZCl7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czowO2JvcmRlci10b3AtbGVmdC1yYWRpdXM6MH0uYnRuLWdyb3VwPi5idG4tZ3JvdXB7ZmxvYXQ6bGVmdH0uYnRuLWdyb3VwPi5idG4tZ3JvdXA6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKT4uYnRue2JvcmRlci1yYWRpdXM6MH0uYnRuLWdyb3VwPi5idG4tZ3JvdXA6Zmlyc3QtY2hpbGQ+LmJ0bjpsYXN0LWNoaWxkLC5idG4tZ3JvdXA+LmJ0bi1ncm91cDpmaXJzdC1jaGlsZD4uZHJvcGRvd24tdG9nZ2xle2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjA7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6MH0uYnRuLWdyb3VwPi5idG4tZ3JvdXA6bGFzdC1jaGlsZD4uYnRuOmZpcnN0LWNoaWxke2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6MDtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjB9LmJ0bi1ncm91cCAuZHJvcGRvd24tdG9nZ2xlOmFjdGl2ZSwuYnRuLWdyb3VwLm9wZW4gLmRyb3Bkb3duLXRvZ2dsZXtvdXRsaW5lOjB9LmJ0bi1ncm91cD4uYnRuKy5kcm9wZG93bi10b2dnbGV7cGFkZGluZy1sZWZ0OjhweDtwYWRkaW5nLXJpZ2h0OjhweH0uYnRuLWdyb3VwPi5idG4tbGcrLmRyb3Bkb3duLXRvZ2dsZXtwYWRkaW5nLWxlZnQ6MTJweDtwYWRkaW5nLXJpZ2h0OjEycHh9LmJ0bi1ncm91cC5vcGVuIC5kcm9wZG93bi10b2dnbGV7LXdlYmtpdC1ib3gtc2hhZG93Omluc2V0IDAgM3B4IDVweCByZ2JhKDAsMCwwLC4xMjUpO2JveC1zaGFkb3c6aW5zZXQgMCAzcHggNXB4IHJnYmEoMCwwLDAsLjEyNSl9LmJ0bi1ncm91cC5vcGVuIC5kcm9wZG93bi10b2dnbGUuYnRuLWxpbmt7LXdlYmtpdC1ib3gtc2hhZG93Om5vbmU7Ym94LXNoYWRvdzpub25lfS5idG4gLmNhcmV0e21hcmdpbi1sZWZ0OjB9LmJ0bi1sZyAuY2FyZXR7Ym9yZGVyLXdpZHRoOjVweCA1cHggMDtib3JkZXItYm90dG9tLXdpZHRoOjB9LmRyb3B1cCAuYnRuLWxnIC5jYXJldHtib3JkZXItd2lkdGg6MCA1cHggNXB4fS5idG4tZ3JvdXAtdmVydGljYWw+LmJ0biwuYnRuLWdyb3VwLXZlcnRpY2FsPi5idG4tZ3JvdXAsLmJ0bi1ncm91cC12ZXJ0aWNhbD4uYnRuLWdyb3VwPi5idG57ZGlzcGxheTpibG9jaztmbG9hdDpub25lO3dpZHRoOjEwMCU7bWF4LXdpZHRoOjEwMCV9LmJ0bi1ncm91cC12ZXJ0aWNhbD4uYnRuLWdyb3VwPi5idG57ZmxvYXQ6bm9uZX0uYnRuLWdyb3VwLXZlcnRpY2FsPi5idG4rLmJ0biwuYnRuLWdyb3VwLXZlcnRpY2FsPi5idG4rLmJ0bi1ncm91cCwuYnRuLWdyb3VwLXZlcnRpY2FsPi5idG4tZ3JvdXArLmJ0biwuYnRuLWdyb3VwLXZlcnRpY2FsPi5idG4tZ3JvdXArLmJ0bi1ncm91cHttYXJnaW4tdG9wOi0xcHg7bWFyZ2luLWxlZnQ6MH0uYnRuLWdyb3VwLXZlcnRpY2FsPi5idG46bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKXtib3JkZXItcmFkaXVzOjB9LmJ0bi1ncm91cC12ZXJ0aWNhbD4uYnRuOmZpcnN0LWNoaWxkOm5vdCg6bGFzdC1jaGlsZCl7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NHB4O2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjA7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czowfS5idG4tZ3JvdXAtdmVydGljYWw+LmJ0bjpsYXN0LWNoaWxkOm5vdCg6Zmlyc3QtY2hpbGQpe2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6NHB4O2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjA7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czowfS5idG4tZ3JvdXAtdmVydGljYWw+LmJ0bi1ncm91cDpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpPi5idG57Ym9yZGVyLXJhZGl1czowfS5idG4tZ3JvdXAtdmVydGljYWw+LmJ0bi1ncm91cDpmaXJzdC1jaGlsZDpub3QoOmxhc3QtY2hpbGQpPi5idG46bGFzdC1jaGlsZCwuYnRuLWdyb3VwLXZlcnRpY2FsPi5idG4tZ3JvdXA6Zmlyc3QtY2hpbGQ6bm90KDpsYXN0LWNoaWxkKT4uZHJvcGRvd24tdG9nZ2xle2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjA7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czowfS5idG4tZ3JvdXAtdmVydGljYWw+LmJ0bi1ncm91cDpsYXN0LWNoaWxkOm5vdCg6Zmlyc3QtY2hpbGQpPi5idG46Zmlyc3QtY2hpbGR7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6MDtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjB9LmJ0bi1ncm91cC1qdXN0aWZpZWR7ZGlzcGxheTp0YWJsZTt3aWR0aDoxMDAlO3RhYmxlLWxheW91dDpmaXhlZDtib3JkZXItY29sbGFwc2U6c2VwYXJhdGV9LmJ0bi1ncm91cC1qdXN0aWZpZWQ+LmJ0biwuYnRuLWdyb3VwLWp1c3RpZmllZD4uYnRuLWdyb3Vwe2Zsb2F0Om5vbmU7ZGlzcGxheTp0YWJsZS1jZWxsO3dpZHRoOjElfS5idG4tZ3JvdXAtanVzdGlmaWVkPi5idG4tZ3JvdXAgLmJ0bnt3aWR0aDoxMDAlfVtkYXRhLXRvZ2dsZT1idXR0b25zXT4uYnRuPmlucHV0W3R5cGU9cmFkaW9dLFtkYXRhLXRvZ2dsZT1idXR0b25zXT4uYnRuPmlucHV0W3R5cGU9Y2hlY2tib3hde2Rpc3BsYXk6bm9uZX0uaW5wdXQtZ3JvdXB7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTp0YWJsZTtib3JkZXItY29sbGFwc2U6c2VwYXJhdGV9LmlucHV0LWdyb3VwW2NsYXNzKj1jb2wtXXtmbG9hdDpub25lO3BhZGRpbmctbGVmdDowO3BhZGRpbmctcmlnaHQ6MH0uaW5wdXQtZ3JvdXAgLmZvcm0tY29udHJvbHtwb3NpdGlvbjpyZWxhdGl2ZTt6LWluZGV4OjI7ZmxvYXQ6bGVmdDt3aWR0aDoxMDAlO21hcmdpbi1ib3R0b206MH0uaW5wdXQtZ3JvdXAtbGc+LmZvcm0tY29udHJvbCwuaW5wdXQtZ3JvdXAtbGc+LmlucHV0LWdyb3VwLWFkZG9uLC5pbnB1dC1ncm91cC1sZz4uaW5wdXQtZ3JvdXAtYnRuPi5idG57aGVpZ2h0OjQ2cHg7cGFkZGluZzoxMHB4IDE2cHg7Zm9udC1zaXplOjE4cHg7bGluZS1oZWlnaHQ6MS4zMztib3JkZXItcmFkaXVzOjZweH1zZWxlY3QuaW5wdXQtZ3JvdXAtbGc+LmZvcm0tY29udHJvbCxzZWxlY3QuaW5wdXQtZ3JvdXAtbGc+LmlucHV0LWdyb3VwLWFkZG9uLHNlbGVjdC5pbnB1dC1ncm91cC1sZz4uaW5wdXQtZ3JvdXAtYnRuPi5idG57aGVpZ2h0OjQ2cHg7bGluZS1oZWlnaHQ6NDZweH10ZXh0YXJlYS5pbnB1dC1ncm91cC1sZz4uZm9ybS1jb250cm9sLHRleHRhcmVhLmlucHV0LWdyb3VwLWxnPi5pbnB1dC1ncm91cC1hZGRvbix0ZXh0YXJlYS5pbnB1dC1ncm91cC1sZz4uaW5wdXQtZ3JvdXAtYnRuPi5idG4sc2VsZWN0W211bHRpcGxlXS5pbnB1dC1ncm91cC1sZz4uZm9ybS1jb250cm9sLHNlbGVjdFttdWx0aXBsZV0uaW5wdXQtZ3JvdXAtbGc+LmlucHV0LWdyb3VwLWFkZG9uLHNlbGVjdFttdWx0aXBsZV0uaW5wdXQtZ3JvdXAtbGc+LmlucHV0LWdyb3VwLWJ0bj4uYnRue2hlaWdodDphdXRvfS5pbnB1dC1ncm91cC1zbT4uZm9ybS1jb250cm9sLC5pbnB1dC1ncm91cC1zbT4uaW5wdXQtZ3JvdXAtYWRkb24sLmlucHV0LWdyb3VwLXNtPi5pbnB1dC1ncm91cC1idG4+LmJ0bntoZWlnaHQ6MzBweDtwYWRkaW5nOjVweCAxMHB4O2ZvbnQtc2l6ZToxMnB4O2xpbmUtaGVpZ2h0OjEuNTtib3JkZXItcmFkaXVzOjNweH1zZWxlY3QuaW5wdXQtZ3JvdXAtc20+LmZvcm0tY29udHJvbCxzZWxlY3QuaW5wdXQtZ3JvdXAtc20+LmlucHV0LWdyb3VwLWFkZG9uLHNlbGVjdC5pbnB1dC1ncm91cC1zbT4uaW5wdXQtZ3JvdXAtYnRuPi5idG57aGVpZ2h0OjMwcHg7bGluZS1oZWlnaHQ6MzBweH10ZXh0YXJlYS5pbnB1dC1ncm91cC1zbT4uZm9ybS1jb250cm9sLHRleHRhcmVhLmlucHV0LWdyb3VwLXNtPi5pbnB1dC1ncm91cC1hZGRvbix0ZXh0YXJlYS5pbnB1dC1ncm91cC1zbT4uaW5wdXQtZ3JvdXAtYnRuPi5idG4sc2VsZWN0W211bHRpcGxlXS5pbnB1dC1ncm91cC1zbT4uZm9ybS1jb250cm9sLHNlbGVjdFttdWx0aXBsZV0uaW5wdXQtZ3JvdXAtc20+LmlucHV0LWdyb3VwLWFkZG9uLHNlbGVjdFttdWx0aXBsZV0uaW5wdXQtZ3JvdXAtc20+LmlucHV0LWdyb3VwLWJ0bj4uYnRue2hlaWdodDphdXRvfS5pbnB1dC1ncm91cC1hZGRvbiwuaW5wdXQtZ3JvdXAtYnRuLC5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9se2Rpc3BsYXk6dGFibGUtY2VsbH0uaW5wdXQtZ3JvdXAtYWRkb246bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKSwuaW5wdXQtZ3JvdXAtYnRuOm5vdCg6Zmlyc3QtY2hpbGQpOm5vdCg6bGFzdC1jaGlsZCksLmlucHV0LWdyb3VwIC5mb3JtLWNvbnRyb2w6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKXtib3JkZXItcmFkaXVzOjB9LmlucHV0LWdyb3VwLWFkZG9uLC5pbnB1dC1ncm91cC1idG57d2lkdGg6MSU7d2hpdGUtc3BhY2U6bm93cmFwO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0uaW5wdXQtZ3JvdXAtYWRkb257cGFkZGluZzo2cHggMTJweDtmb250LXNpemU6MTRweDtmb250LXdlaWdodDo0MDA7bGluZS1oZWlnaHQ6MTtjb2xvcjojNTU1O3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6I2VlZTtib3JkZXI6MXB4IHNvbGlkICNjY2M7Ym9yZGVyLXJhZGl1czo0cHh9LmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LXNte3BhZGRpbmc6NXB4IDEwcHg7Zm9udC1zaXplOjEycHg7Ym9yZGVyLXJhZGl1czozcHh9LmlucHV0LWdyb3VwLWFkZG9uLmlucHV0LWxne3BhZGRpbmc6MTBweCAxNnB4O2ZvbnQtc2l6ZToxOHB4O2JvcmRlci1yYWRpdXM6NnB4fS5pbnB1dC1ncm91cC1hZGRvbiBpbnB1dFt0eXBlPXJhZGlvXSwuaW5wdXQtZ3JvdXAtYWRkb24gaW5wdXRbdHlwZT1jaGVja2JveF17bWFyZ2luLXRvcDowfS5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9sOmZpcnN0LWNoaWxkLC5pbnB1dC1ncm91cC1hZGRvbjpmaXJzdC1jaGlsZCwuaW5wdXQtZ3JvdXAtYnRuOmZpcnN0LWNoaWxkPi5idG4sLmlucHV0LWdyb3VwLWJ0bjpmaXJzdC1jaGlsZD4uYnRuLWdyb3VwPi5idG4sLmlucHV0LWdyb3VwLWJ0bjpmaXJzdC1jaGlsZD4uZHJvcGRvd24tdG9nZ2xlLC5pbnB1dC1ncm91cC1idG46bGFzdC1jaGlsZD4uYnRuOm5vdCg6bGFzdC1jaGlsZCk6bm90KC5kcm9wZG93bi10b2dnbGUpLC5pbnB1dC1ncm91cC1idG46bGFzdC1jaGlsZD4uYnRuLWdyb3VwOm5vdCg6bGFzdC1jaGlsZCk+LmJ0bntib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czowO2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjB9LmlucHV0LWdyb3VwLWFkZG9uOmZpcnN0LWNoaWxke2JvcmRlci1yaWdodDowfS5pbnB1dC1ncm91cCAuZm9ybS1jb250cm9sOmxhc3QtY2hpbGQsLmlucHV0LWdyb3VwLWFkZG9uOmxhc3QtY2hpbGQsLmlucHV0LWdyb3VwLWJ0bjpsYXN0LWNoaWxkPi5idG4sLmlucHV0LWdyb3VwLWJ0bjpsYXN0LWNoaWxkPi5idG4tZ3JvdXA+LmJ0biwuaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQ+LmRyb3Bkb3duLXRvZ2dsZSwuaW5wdXQtZ3JvdXAtYnRuOmZpcnN0LWNoaWxkPi5idG46bm90KDpmaXJzdC1jaGlsZCksLmlucHV0LWdyb3VwLWJ0bjpmaXJzdC1jaGlsZD4uYnRuLWdyb3VwOm5vdCg6Zmlyc3QtY2hpbGQpPi5idG57Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czowO2JvcmRlci10b3AtbGVmdC1yYWRpdXM6MH0uaW5wdXQtZ3JvdXAtYWRkb246bGFzdC1jaGlsZHtib3JkZXItbGVmdDowfS5pbnB1dC1ncm91cC1idG57cG9zaXRpb246cmVsYXRpdmU7Zm9udC1zaXplOjA7d2hpdGUtc3BhY2U6bm93cmFwfS5pbnB1dC1ncm91cC1idG4+LmJ0bntwb3NpdGlvbjpyZWxhdGl2ZX0uaW5wdXQtZ3JvdXAtYnRuPi5idG4rLmJ0bnttYXJnaW4tbGVmdDotMXB4fS5pbnB1dC1ncm91cC1idG4+LmJ0bjpob3ZlciwuaW5wdXQtZ3JvdXAtYnRuPi5idG46Zm9jdXMsLmlucHV0LWdyb3VwLWJ0bj4uYnRuOmFjdGl2ZXt6LWluZGV4OjJ9LmlucHV0LWdyb3VwLWJ0bjpmaXJzdC1jaGlsZD4uYnRuLC5pbnB1dC1ncm91cC1idG46Zmlyc3QtY2hpbGQ+LmJ0bi1ncm91cHttYXJnaW4tcmlnaHQ6LTFweH0uaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQ+LmJ0biwuaW5wdXQtZ3JvdXAtYnRuOmxhc3QtY2hpbGQ+LmJ0bi1ncm91cHttYXJnaW4tbGVmdDotMXB4fS5uYXZ7bWFyZ2luLWJvdHRvbTowO3BhZGRpbmctbGVmdDowO2xpc3Qtc3R5bGU6bm9uZX0ubmF2Pmxpe3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2t9Lm5hdj5saT5he3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6YmxvY2s7cGFkZGluZzoxMHB4IDE1cHh9Lm5hdj5saT5hOmhvdmVyLC5uYXY+bGk+YTpmb2N1c3t0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9Lm5hdj5saS5kaXNhYmxlZD5he2NvbG9yOiM5OTl9Lm5hdj5saS5kaXNhYmxlZD5hOmhvdmVyLC5uYXY+bGkuZGlzYWJsZWQ+YTpmb2N1c3tjb2xvcjojOTk5O3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnQ7Y3Vyc29yOm5vdC1hbGxvd2VkfS5uYXYgLm9wZW4+YSwubmF2IC5vcGVuPmE6aG92ZXIsLm5hdiAub3Blbj5hOmZvY3Vze2JhY2tncm91bmQtY29sb3I6I2VlZTtib3JkZXItY29sb3I6IzQyOGJjYX0ubmF2IC5uYXYtZGl2aWRlcntoZWlnaHQ6MXB4O21hcmdpbjo5cHggMDtvdmVyZmxvdzpoaWRkZW47YmFja2dyb3VuZC1jb2xvcjojZTVlNWU1fS5uYXY+bGk+YT5pbWd7bWF4LXdpZHRoOm5vbmV9Lm5hdi10YWJze2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNkZGR9Lm5hdi10YWJzPmxpe2Zsb2F0OmxlZnQ7bWFyZ2luLWJvdHRvbTotMXB4fS5uYXYtdGFicz5saT5he21hcmdpbi1yaWdodDoycHg7bGluZS1oZWlnaHQ6MS40Mjg1NzE0Mztib3JkZXI6MXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yYWRpdXM6NHB4IDRweCAwIDB9Lm5hdi10YWJzPmxpPmE6aG92ZXJ7Ym9yZGVyLWNvbG9yOiNlZWUgI2VlZSAjZGRkfS5uYXYtdGFicz5saS5hY3RpdmU+YSwubmF2LXRhYnM+bGkuYWN0aXZlPmE6aG92ZXIsLm5hdi10YWJzPmxpLmFjdGl2ZT5hOmZvY3Vze2NvbG9yOiM1NTU7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlcjoxcHggc29saWQgI2RkZDtib3JkZXItYm90dG9tLWNvbG9yOnRyYW5zcGFyZW50O2N1cnNvcjpkZWZhdWx0fS5uYXYtdGFicy5uYXYtanVzdGlmaWVke3dpZHRoOjEwMCU7Ym9yZGVyLWJvdHRvbTowfS5uYXYtdGFicy5uYXYtanVzdGlmaWVkPmxpe2Zsb2F0Om5vbmV9Lm5hdi10YWJzLm5hdi1qdXN0aWZpZWQ+bGk+YXt0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tYm90dG9tOjVweH0ubmF2LXRhYnMubmF2LWp1c3RpZmllZD4uZHJvcGRvd24gLmRyb3Bkb3duLW1lbnV7dG9wOmF1dG87bGVmdDphdXRvfUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2LXRhYnMubmF2LWp1c3RpZmllZD5saXtkaXNwbGF5OnRhYmxlLWNlbGw7d2lkdGg6MSV9Lm5hdi10YWJzLm5hdi1qdXN0aWZpZWQ+bGk+YXttYXJnaW4tYm90dG9tOjB9fS5uYXYtdGFicy5uYXYtanVzdGlmaWVkPmxpPmF7bWFyZ2luLXJpZ2h0OjA7Ym9yZGVyLXJhZGl1czo0cHh9Lm5hdi10YWJzLm5hdi1qdXN0aWZpZWQ+LmFjdGl2ZT5hLC5uYXYtdGFicy5uYXYtanVzdGlmaWVkPi5hY3RpdmU+YTpob3ZlciwubmF2LXRhYnMubmF2LWp1c3RpZmllZD4uYWN0aXZlPmE6Zm9jdXN7Ym9yZGVyOjFweCBzb2xpZCAjZGRkfUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2LXRhYnMubmF2LWp1c3RpZmllZD5saT5he2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNkZGQ7Ym9yZGVyLXJhZGl1czo0cHggNHB4IDAgMH0ubmF2LXRhYnMubmF2LWp1c3RpZmllZD4uYWN0aXZlPmEsLm5hdi10YWJzLm5hdi1qdXN0aWZpZWQ+LmFjdGl2ZT5hOmhvdmVyLC5uYXYtdGFicy5uYXYtanVzdGlmaWVkPi5hY3RpdmU+YTpmb2N1c3tib3JkZXItYm90dG9tLWNvbG9yOiNmZmZ9fS5uYXYtcGlsbHM+bGl7ZmxvYXQ6bGVmdH0ubmF2LXBpbGxzPmxpPmF7Ym9yZGVyLXJhZGl1czo0cHh9Lm5hdi1waWxscz5saStsaXttYXJnaW4tbGVmdDoycHh9Lm5hdi1waWxscz5saS5hY3RpdmU+YSwubmF2LXBpbGxzPmxpLmFjdGl2ZT5hOmhvdmVyLC5uYXYtcGlsbHM+bGkuYWN0aXZlPmE6Zm9jdXN7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiM0MjhiY2F9Lm5hdi1zdGFja2VkPmxpe2Zsb2F0Om5vbmV9Lm5hdi1zdGFja2VkPmxpK2xpe21hcmdpbi10b3A6MnB4O21hcmdpbi1sZWZ0OjB9Lm5hdi1qdXN0aWZpZWR7d2lkdGg6MTAwJX0ubmF2LWp1c3RpZmllZD5saXtmbG9hdDpub25lfS5uYXYtanVzdGlmaWVkPmxpPmF7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLWJvdHRvbTo1cHh9Lm5hdi1qdXN0aWZpZWQ+LmRyb3Bkb3duIC5kcm9wZG93bi1tZW51e3RvcDphdXRvO2xlZnQ6YXV0b31AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7Lm5hdi1qdXN0aWZpZWQ+bGl7ZGlzcGxheTp0YWJsZS1jZWxsO3dpZHRoOjElfS5uYXYtanVzdGlmaWVkPmxpPmF7bWFyZ2luLWJvdHRvbTowfX0ubmF2LXRhYnMtanVzdGlmaWVke2JvcmRlci1ib3R0b206MH0ubmF2LXRhYnMtanVzdGlmaWVkPmxpPmF7bWFyZ2luLXJpZ2h0OjA7Ym9yZGVyLXJhZGl1czo0cHh9Lm5hdi10YWJzLWp1c3RpZmllZD4uYWN0aXZlPmEsLm5hdi10YWJzLWp1c3RpZmllZD4uYWN0aXZlPmE6aG92ZXIsLm5hdi10YWJzLWp1c3RpZmllZD4uYWN0aXZlPmE6Zm9jdXN7Ym9yZGVyOjFweCBzb2xpZCAjZGRkfUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2LXRhYnMtanVzdGlmaWVkPmxpPmF7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2RkZDtib3JkZXItcmFkaXVzOjRweCA0cHggMCAwfS5uYXYtdGFicy1qdXN0aWZpZWQ+LmFjdGl2ZT5hLC5uYXYtdGFicy1qdXN0aWZpZWQ+LmFjdGl2ZT5hOmhvdmVyLC5uYXYtdGFicy1qdXN0aWZpZWQ+LmFjdGl2ZT5hOmZvY3Vze2JvcmRlci1ib3R0b20tY29sb3I6I2ZmZn19LnRhYi1jb250ZW50Pi50YWItcGFuZXtkaXNwbGF5Om5vbmV9LnRhYi1jb250ZW50Pi5hY3RpdmV7ZGlzcGxheTpibG9ja30ubmF2LXRhYnMgLmRyb3Bkb3duLW1lbnV7bWFyZ2luLXRvcDotMXB4O2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjA7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czowfS5uYXZiYXJ7cG9zaXRpb246cmVsYXRpdmU7bWluLWhlaWdodDo1MHB4O21hcmdpbi1ib3R0b206MjBweDtib3JkZXI6MXB4IHNvbGlkIHRyYW5zcGFyZW50fUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2YmFye2JvcmRlci1yYWRpdXM6NHB4fX1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7Lm5hdmJhci1oZWFkZXJ7ZmxvYXQ6bGVmdH19Lm5hdmJhci1jb2xsYXBzZXttYXgtaGVpZ2h0OjM0MHB4O292ZXJmbG93LXg6dmlzaWJsZTtwYWRkaW5nLXJpZ2h0OjE1cHg7cGFkZGluZy1sZWZ0OjE1cHg7Ym9yZGVyLXRvcDoxcHggc29saWQgdHJhbnNwYXJlbnQ7Ym94LXNoYWRvdzppbnNldCAwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjEpOy13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOnRvdWNofS5uYXZiYXItY29sbGFwc2UuaW57b3ZlcmZsb3cteTphdXRvfUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2YmFyLWNvbGxhcHNle3dpZHRoOmF1dG87Ym9yZGVyLXRvcDowO2JveC1zaGFkb3c6bm9uZX0ubmF2YmFyLWNvbGxhcHNlLmNvbGxhcHNle2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50O2hlaWdodDphdXRvIWltcG9ydGFudDtwYWRkaW5nLWJvdHRvbTowO292ZXJmbG93OnZpc2libGUhaW1wb3J0YW50fS5uYXZiYXItY29sbGFwc2UuaW57b3ZlcmZsb3cteTp2aXNpYmxlfS5uYXZiYXItZml4ZWQtdG9wIC5uYXZiYXItY29sbGFwc2UsLm5hdmJhci1zdGF0aWMtdG9wIC5uYXZiYXItY29sbGFwc2UsLm5hdmJhci1maXhlZC1ib3R0b20gLm5hdmJhci1jb2xsYXBzZXtwYWRkaW5nLWxlZnQ6MDtwYWRkaW5nLXJpZ2h0OjB9fS5jb250YWluZXI+Lm5hdmJhci1oZWFkZXIsLmNvbnRhaW5lci1mbHVpZD4ubmF2YmFyLWhlYWRlciwuY29udGFpbmVyPi5uYXZiYXItY29sbGFwc2UsLmNvbnRhaW5lci1mbHVpZD4ubmF2YmFyLWNvbGxhcHNle21hcmdpbi1yaWdodDotMTVweDttYXJnaW4tbGVmdDotMTVweH1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7LmNvbnRhaW5lcj4ubmF2YmFyLWhlYWRlciwuY29udGFpbmVyLWZsdWlkPi5uYXZiYXItaGVhZGVyLC5jb250YWluZXI+Lm5hdmJhci1jb2xsYXBzZSwuY29udGFpbmVyLWZsdWlkPi5uYXZiYXItY29sbGFwc2V7bWFyZ2luLXJpZ2h0OjA7bWFyZ2luLWxlZnQ6MH19Lm5hdmJhci1zdGF0aWMtdG9we3otaW5kZXg6MTAwMDtib3JkZXItd2lkdGg6MCAwIDFweH1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7Lm5hdmJhci1zdGF0aWMtdG9we2JvcmRlci1yYWRpdXM6MH19Lm5hdmJhci1maXhlZC10b3AsLm5hdmJhci1maXhlZC1ib3R0b217cG9zaXRpb246Zml4ZWQ7cmlnaHQ6MDtsZWZ0OjA7ei1pbmRleDoxMDMwfUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2YmFyLWZpeGVkLXRvcCwubmF2YmFyLWZpeGVkLWJvdHRvbXtib3JkZXItcmFkaXVzOjB9fS5uYXZiYXItZml4ZWQtdG9we3RvcDowO2JvcmRlci13aWR0aDowIDAgMXB4fS5uYXZiYXItZml4ZWQtYm90dG9te2JvdHRvbTowO21hcmdpbi1ib3R0b206MDtib3JkZXItd2lkdGg6MXB4IDAgMH0ubmF2YmFyLWJyYW5ke2Zsb2F0OmxlZnQ7cGFkZGluZzoxNXB4O2ZvbnQtc2l6ZToxOHB4O2xpbmUtaGVpZ2h0OjIwcHg7aGVpZ2h0OjUwcHh9Lm5hdmJhci1icmFuZDpob3ZlciwubmF2YmFyLWJyYW5kOmZvY3Vze3RleHQtZGVjb3JhdGlvbjpub25lfUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2YmFyPi5jb250YWluZXIgLm5hdmJhci1icmFuZCwubmF2YmFyPi5jb250YWluZXItZmx1aWQgLm5hdmJhci1icmFuZHttYXJnaW4tbGVmdDotMTVweH19Lm5hdmJhci10b2dnbGV7cG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6cmlnaHQ7bWFyZ2luLXJpZ2h0OjE1cHg7cGFkZGluZzo5cHggMTBweDttYXJnaW4tdG9wOjhweDttYXJnaW4tYm90dG9tOjhweDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JhY2tncm91bmQtaW1hZ2U6bm9uZTtib3JkZXI6MXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yYWRpdXM6NHB4fS5uYXZiYXItdG9nZ2xlOmZvY3Vze291dGxpbmU6MH0ubmF2YmFyLXRvZ2dsZSAuaWNvbi1iYXJ7ZGlzcGxheTpibG9jazt3aWR0aDoyMnB4O2hlaWdodDoycHg7Ym9yZGVyLXJhZGl1czoxcHh9Lm5hdmJhci10b2dnbGUgLmljb24tYmFyKy5pY29uLWJhcnttYXJnaW4tdG9wOjRweH1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7Lm5hdmJhci10b2dnbGV7ZGlzcGxheTpub25lfX0ubmF2YmFyLW5hdnttYXJnaW46Ny41cHggLTE1cHh9Lm5hdmJhci1uYXY+bGk+YXtwYWRkaW5nLXRvcDoxMHB4O3BhZGRpbmctYm90dG9tOjEwcHg7bGluZS1oZWlnaHQ6MjBweH1AbWVkaWEgKG1heC13aWR0aDo3NjdweCl7Lm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnV7cG9zaXRpb246c3RhdGljO2Zsb2F0Om5vbmU7d2lkdGg6YXV0bzttYXJnaW4tdG9wOjA7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXI6MDtib3gtc2hhZG93Om5vbmV9Lm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnU+bGk+YSwubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taGVhZGVye3BhZGRpbmc6NXB4IDE1cHggNXB4IDI1cHh9Lm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnU+bGk+YXtsaW5lLWhlaWdodDoyMHB4fS5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51PmxpPmE6aG92ZXIsLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnU+bGk+YTpmb2N1c3tiYWNrZ3JvdW5kLWltYWdlOm5vbmV9fUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2YmFyLW5hdntmbG9hdDpsZWZ0O21hcmdpbjowfS5uYXZiYXItbmF2Pmxpe2Zsb2F0OmxlZnR9Lm5hdmJhci1uYXY+bGk+YXtwYWRkaW5nLXRvcDoxNXB4O3BhZGRpbmctYm90dG9tOjE1cHh9Lm5hdmJhci1uYXYubmF2YmFyLXJpZ2h0Omxhc3QtY2hpbGR7bWFyZ2luLXJpZ2h0Oi0xNXB4fX1AbWVkaWEgKG1pbi13aWR0aDo3NjhweCl7Lm5hdmJhci1sZWZ0e2Zsb2F0OmxlZnQhaW1wb3J0YW50fS5uYXZiYXItcmlnaHR7ZmxvYXQ6cmlnaHQhaW1wb3J0YW50fX0ubmF2YmFyLWZvcm17bWFyZ2luLWxlZnQ6LTE1cHg7bWFyZ2luLXJpZ2h0Oi0xNXB4O3BhZGRpbmc6MTBweCAxNXB4O2JvcmRlci10b3A6MXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHRyYW5zcGFyZW50Oy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjEpLDAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuMSk7Ym94LXNoYWRvdzppbnNldCAwIDFweCAwIHJnYmEoMjU1LDI1NSwyNTUsLjEpLDAgMXB4IDAgcmdiYSgyNTUsMjU1LDI1NSwuMSk7bWFyZ2luLXRvcDo4cHg7bWFyZ2luLWJvdHRvbTo4cHh9QG1lZGlhIChtaW4td2lkdGg6NzY4cHgpey5uYXZiYXItZm9ybSAuZm9ybS1ncm91cHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tYm90dG9tOjA7dmVydGljYWwtYWxpZ246bWlkZGxlfS5uYXZiYXItZm9ybSAuZm9ybS1jb250cm9se2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOmF1dG87dmVydGljYWwtYWxpZ246bWlkZGxlfS5uYXZiYXItZm9ybSAuaW5wdXQtZ3JvdXA+LmZvcm0tY29udHJvbHt3aWR0aDoxMDAlfS5uYXZiYXItZm9ybSAuY29udHJvbC1sYWJlbHttYXJnaW4tYm90dG9tOjA7dmVydGljYWwtYWxpZ246bWlkZGxlfS5uYXZiYXItZm9ybSAucmFkaW8sLm5hdmJhci1mb3JtIC5jaGVja2JveHtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tdG9wOjA7bWFyZ2luLWJvdHRvbTowO3BhZGRpbmctbGVmdDowO3ZlcnRpY2FsLWFsaWduOm1pZGRsZX0ubmF2YmFyLWZvcm0gLnJhZGlvIGlucHV0W3R5cGU9cmFkaW9dLC5uYXZiYXItZm9ybSAuY2hlY2tib3ggaW5wdXRbdHlwZT1jaGVja2JveF17ZmxvYXQ6bm9uZTttYXJnaW4tbGVmdDowfS5uYXZiYXItZm9ybSAuaGFzLWZlZWRiYWNrIC5mb3JtLWNvbnRyb2wtZmVlZGJhY2t7dG9wOjB9fUBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KXsubmF2YmFyLWZvcm0gLmZvcm0tZ3JvdXB7bWFyZ2luLWJvdHRvbTo1cHh9fUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2YmFyLWZvcm17d2lkdGg6YXV0bztib3JkZXI6MDttYXJnaW4tbGVmdDowO21hcmdpbi1yaWdodDowO3BhZGRpbmctdG9wOjA7cGFkZGluZy1ib3R0b206MDstd2Via2l0LWJveC1zaGFkb3c6bm9uZTtib3gtc2hhZG93Om5vbmV9Lm5hdmJhci1mb3JtLm5hdmJhci1yaWdodDpsYXN0LWNoaWxke21hcmdpbi1yaWdodDotMTVweH19Lm5hdmJhci1uYXY+bGk+LmRyb3Bkb3duLW1lbnV7bWFyZ2luLXRvcDowO2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjA7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czowfS5uYXZiYXItZml4ZWQtYm90dG9tIC5uYXZiYXItbmF2PmxpPi5kcm9wZG93bi1tZW51e2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjA7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czowfS5uYXZiYXItYnRue21hcmdpbi10b3A6OHB4O21hcmdpbi1ib3R0b206OHB4fS5uYXZiYXItYnRuLmJ0bi1zbXttYXJnaW4tdG9wOjEwcHg7bWFyZ2luLWJvdHRvbToxMHB4fS5uYXZiYXItYnRuLmJ0bi14c3ttYXJnaW4tdG9wOjE0cHg7bWFyZ2luLWJvdHRvbToxNHB4fS5uYXZiYXItdGV4dHttYXJnaW4tdG9wOjE1cHg7bWFyZ2luLWJvdHRvbToxNXB4fUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KXsubmF2YmFyLXRleHR7ZmxvYXQ6bGVmdDttYXJnaW4tbGVmdDoxNXB4O21hcmdpbi1yaWdodDoxNXB4fS5uYXZiYXItdGV4dC5uYXZiYXItcmlnaHQ6bGFzdC1jaGlsZHttYXJnaW4tcmlnaHQ6MH19Lm5hdmJhci1kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6I2Y4ZjhmODtib3JkZXItY29sb3I6I2U3ZTdlN30ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1icmFuZHtjb2xvcjojNzc3fS5uYXZiYXItZGVmYXVsdCAubmF2YmFyLWJyYW5kOmhvdmVyLC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLWJyYW5kOmZvY3Vze2NvbG9yOiM1ZTVlNWU7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci10ZXh0e2NvbG9yOiM3Nzd9Lm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2PmxpPmF7Y29sb3I6Izc3N30ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXY+bGk+YTpob3ZlciwubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXY+bGk+YTpmb2N1c3tjb2xvcjojMzMzO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Lm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2Pi5hY3RpdmU+YSwubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXY+LmFjdGl2ZT5hOmhvdmVyLC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdj4uYWN0aXZlPmE6Zm9jdXN7Y29sb3I6IzU1NTtiYWNrZ3JvdW5kLWNvbG9yOiNlN2U3ZTd9Lm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2Pi5kaXNhYmxlZD5hLC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdj4uZGlzYWJsZWQ+YTpob3ZlciwubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXY+LmRpc2FibGVkPmE6Zm9jdXN7Y29sb3I6I2NjYztiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS5uYXZiYXItZGVmYXVsdCAubmF2YmFyLXRvZ2dsZXtib3JkZXItY29sb3I6I2RkZH0ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci10b2dnbGU6aG92ZXIsLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItdG9nZ2xlOmZvY3Vze2JhY2tncm91bmQtY29sb3I6I2RkZH0ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci10b2dnbGUgLmljb24tYmFye2JhY2tncm91bmQtY29sb3I6Izg4OH0ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1jb2xsYXBzZSwubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1mb3Jte2JvcmRlci1jb2xvcjojZTdlN2U3fS5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdj4ub3Blbj5hLC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdj4ub3Blbj5hOmhvdmVyLC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdj4ub3Blbj5hOmZvY3Vze2JhY2tncm91bmQtY29sb3I6I2U3ZTdlNztjb2xvcjojNTU1fUBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KXsubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnU+bGk+YXtjb2xvcjojNzc3fS5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudT5saT5hOmhvdmVyLC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudT5saT5hOmZvY3Vze2NvbG9yOiMzMzM7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnU+LmFjdGl2ZT5hLC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudT4uYWN0aXZlPmE6aG92ZXIsLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51Pi5hY3RpdmU+YTpmb2N1c3tjb2xvcjojNTU1O2JhY2tncm91bmQtY29sb3I6I2U3ZTdlN30ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnU+LmRpc2FibGVkPmEsLm5hdmJhci1kZWZhdWx0IC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51Pi5kaXNhYmxlZD5hOmhvdmVyLC5uYXZiYXItZGVmYXVsdCAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudT4uZGlzYWJsZWQ+YTpmb2N1c3tjb2xvcjojY2NjO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9fS5uYXZiYXItZGVmYXVsdCAubmF2YmFyLWxpbmt7Y29sb3I6Izc3N30ubmF2YmFyLWRlZmF1bHQgLm5hdmJhci1saW5rOmhvdmVye2NvbG9yOiMzMzN9Lm5hdmJhci1pbnZlcnNle2JhY2tncm91bmQtY29sb3I6IzIyMjtib3JkZXItY29sb3I6IzA4MDgwOH0ubmF2YmFyLWludmVyc2UgLm5hdmJhci1icmFuZHtjb2xvcjojOTk5fS5uYXZiYXItaW52ZXJzZSAubmF2YmFyLWJyYW5kOmhvdmVyLC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLWJyYW5kOmZvY3Vze2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH0ubmF2YmFyLWludmVyc2UgLm5hdmJhci10ZXh0e2NvbG9yOiM5OTl9Lm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2PmxpPmF7Y29sb3I6Izk5OX0ubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXY+bGk+YTpob3ZlciwubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXY+bGk+YTpmb2N1c3tjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6dHJhbnNwYXJlbnR9Lm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2Pi5hY3RpdmU+YSwubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXY+LmFjdGl2ZT5hOmhvdmVyLC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdj4uYWN0aXZlPmE6Zm9jdXN7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiMwODA4MDh9Lm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2Pi5kaXNhYmxlZD5hLC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdj4uZGlzYWJsZWQ+YTpob3ZlciwubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXY+LmRpc2FibGVkPmE6Zm9jdXN7Y29sb3I6IzQ0NDtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS5uYXZiYXItaW52ZXJzZSAubmF2YmFyLXRvZ2dsZXtib3JkZXItY29sb3I6IzMzM30ubmF2YmFyLWludmVyc2UgLm5hdmJhci10b2dnbGU6aG92ZXIsLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItdG9nZ2xlOmZvY3Vze2JhY2tncm91bmQtY29sb3I6IzMzM30ubmF2YmFyLWludmVyc2UgLm5hdmJhci10b2dnbGUgLmljb24tYmFye2JhY2tncm91bmQtY29sb3I6I2ZmZn0ubmF2YmFyLWludmVyc2UgLm5hdmJhci1jb2xsYXBzZSwubmF2YmFyLWludmVyc2UgLm5hdmJhci1mb3Jte2JvcmRlci1jb2xvcjojMTAxMDEwfS5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdj4ub3Blbj5hLC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdj4ub3Blbj5hOmhvdmVyLC5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdj4ub3Blbj5hOmZvY3Vze2JhY2tncm91bmQtY29sb3I6IzA4MDgwODtjb2xvcjojZmZmfUBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KXsubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnU+LmRyb3Bkb3duLWhlYWRlcntib3JkZXItY29sb3I6IzA4MDgwOH0ubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnUgLmRpdmlkZXJ7YmFja2dyb3VuZC1jb2xvcjojMDgwODA4fS5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudT5saT5he2NvbG9yOiM5OTl9Lm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51PmxpPmE6aG92ZXIsLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51PmxpPmE6Zm9jdXN7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50fS5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudT4uYWN0aXZlPmEsLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51Pi5hY3RpdmU+YTpob3ZlciwubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnU+LmFjdGl2ZT5hOmZvY3Vze2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjojMDgwODA4fS5uYXZiYXItaW52ZXJzZSAubmF2YmFyLW5hdiAub3BlbiAuZHJvcGRvd24tbWVudT4uZGlzYWJsZWQ+YSwubmF2YmFyLWludmVyc2UgLm5hdmJhci1uYXYgLm9wZW4gLmRyb3Bkb3duLW1lbnU+LmRpc2FibGVkPmE6aG92ZXIsLm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbmF2IC5vcGVuIC5kcm9wZG93bi1tZW51Pi5kaXNhYmxlZD5hOmZvY3Vze2NvbG9yOiM0NDQ7YmFja2dyb3VuZC1jb2xvcjp0cmFuc3BhcmVudH19Lm5hdmJhci1pbnZlcnNlIC5uYXZiYXItbGlua3tjb2xvcjojOTk5fS5uYXZiYXItaW52ZXJzZSAubmF2YmFyLWxpbms6aG92ZXJ7Y29sb3I6I2ZmZn0uYnJlYWRjcnVtYntwYWRkaW5nOjhweCAxNXB4O21hcmdpbi1ib3R0b206MjBweDtsaXN0LXN0eWxlOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2JvcmRlci1yYWRpdXM6NHB4fS5icmVhZGNydW1iPmxpe2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5icmVhZGNydW1iPmxpK2xpOmJlZm9yZXtjb250ZW50OiIvXDAwYTAiO3BhZGRpbmc6MCA1cHg7Y29sb3I6I2NjY30uYnJlYWRjcnVtYj4uYWN0aXZle2NvbG9yOiM5OTl9LnBhZ2luYXRpb257ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZy1sZWZ0OjA7bWFyZ2luOjIwcHggMDtib3JkZXItcmFkaXVzOjRweH0ucGFnaW5hdGlvbj5saXtkaXNwbGF5OmlubGluZX0ucGFnaW5hdGlvbj5saT5hLC5wYWdpbmF0aW9uPmxpPnNwYW57cG9zaXRpb246cmVsYXRpdmU7ZmxvYXQ6bGVmdDtwYWRkaW5nOjZweCAxMnB4O2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDM7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Y29sb3I6IzQyOGJjYTtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjZGRkO21hcmdpbi1sZWZ0Oi0xcHh9LnBhZ2luYXRpb24+bGk6Zmlyc3QtY2hpbGQ+YSwucGFnaW5hdGlvbj5saTpmaXJzdC1jaGlsZD5zcGFue21hcmdpbi1sZWZ0OjA7Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czo0cHg7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czo0cHh9LnBhZ2luYXRpb24+bGk6bGFzdC1jaGlsZD5hLC5wYWdpbmF0aW9uPmxpOmxhc3QtY2hpbGQ+c3Bhbntib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czo0cHg7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NHB4fS5wYWdpbmF0aW9uPmxpPmE6aG92ZXIsLnBhZ2luYXRpb24+bGk+c3Bhbjpob3ZlciwucGFnaW5hdGlvbj5saT5hOmZvY3VzLC5wYWdpbmF0aW9uPmxpPnNwYW46Zm9jdXN7Y29sb3I6IzJhNjQ5NjtiYWNrZ3JvdW5kLWNvbG9yOiNlZWU7Ym9yZGVyLWNvbG9yOiNkZGR9LnBhZ2luYXRpb24+LmFjdGl2ZT5hLC5wYWdpbmF0aW9uPi5hY3RpdmU+c3BhbiwucGFnaW5hdGlvbj4uYWN0aXZlPmE6aG92ZXIsLnBhZ2luYXRpb24+LmFjdGl2ZT5zcGFuOmhvdmVyLC5wYWdpbmF0aW9uPi5hY3RpdmU+YTpmb2N1cywucGFnaW5hdGlvbj4uYWN0aXZlPnNwYW46Zm9jdXN7ei1pbmRleDoyO2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjojNDI4YmNhO2JvcmRlci1jb2xvcjojNDI4YmNhO2N1cnNvcjpkZWZhdWx0fS5wYWdpbmF0aW9uPi5kaXNhYmxlZD5zcGFuLC5wYWdpbmF0aW9uPi5kaXNhYmxlZD5zcGFuOmhvdmVyLC5wYWdpbmF0aW9uPi5kaXNhYmxlZD5zcGFuOmZvY3VzLC5wYWdpbmF0aW9uPi5kaXNhYmxlZD5hLC5wYWdpbmF0aW9uPi5kaXNhYmxlZD5hOmhvdmVyLC5wYWdpbmF0aW9uPi5kaXNhYmxlZD5hOmZvY3Vze2NvbG9yOiM5OTk7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlci1jb2xvcjojZGRkO2N1cnNvcjpub3QtYWxsb3dlZH0ucGFnaW5hdGlvbi1sZz5saT5hLC5wYWdpbmF0aW9uLWxnPmxpPnNwYW57cGFkZGluZzoxMHB4IDE2cHg7Zm9udC1zaXplOjE4cHh9LnBhZ2luYXRpb24tbGc+bGk6Zmlyc3QtY2hpbGQ+YSwucGFnaW5hdGlvbi1sZz5saTpmaXJzdC1jaGlsZD5zcGFue2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6NnB4O2JvcmRlci10b3AtbGVmdC1yYWRpdXM6NnB4fS5wYWdpbmF0aW9uLWxnPmxpOmxhc3QtY2hpbGQ+YSwucGFnaW5hdGlvbi1sZz5saTpsYXN0LWNoaWxkPnNwYW57Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NnB4O2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjZweH0ucGFnaW5hdGlvbi1zbT5saT5hLC5wYWdpbmF0aW9uLXNtPmxpPnNwYW57cGFkZGluZzo1cHggMTBweDtmb250LXNpemU6MTJweH0ucGFnaW5hdGlvbi1zbT5saTpmaXJzdC1jaGlsZD5hLC5wYWdpbmF0aW9uLXNtPmxpOmZpcnN0LWNoaWxkPnNwYW57Ym9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czozcHg7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czozcHh9LnBhZ2luYXRpb24tc20+bGk6bGFzdC1jaGlsZD5hLC5wYWdpbmF0aW9uLXNtPmxpOmxhc3QtY2hpbGQ+c3Bhbntib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czozcHg7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6M3B4fS5wYWdlcntwYWRkaW5nLWxlZnQ6MDttYXJnaW46MjBweCAwO2xpc3Qtc3R5bGU6bm9uZTt0ZXh0LWFsaWduOmNlbnRlcn0ucGFnZXIgbGl7ZGlzcGxheTppbmxpbmV9LnBhZ2VyIGxpPmEsLnBhZ2VyIGxpPnNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzo1cHggMTRweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjZGRkO2JvcmRlci1yYWRpdXM6MTVweH0ucGFnZXIgbGk+YTpob3ZlciwucGFnZXIgbGk+YTpmb2N1c3t0ZXh0LWRlY29yYXRpb246bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9LnBhZ2VyIC5uZXh0PmEsLnBhZ2VyIC5uZXh0PnNwYW57ZmxvYXQ6cmlnaHR9LnBhZ2VyIC5wcmV2aW91cz5hLC5wYWdlciAucHJldmlvdXM+c3BhbntmbG9hdDpsZWZ0fS5wYWdlciAuZGlzYWJsZWQ+YSwucGFnZXIgLmRpc2FibGVkPmE6aG92ZXIsLnBhZ2VyIC5kaXNhYmxlZD5hOmZvY3VzLC5wYWdlciAuZGlzYWJsZWQ+c3Bhbntjb2xvcjojOTk5O2JhY2tncm91bmQtY29sb3I6I2ZmZjtjdXJzb3I6bm90LWFsbG93ZWR9LmxhYmVse2Rpc3BsYXk6aW5saW5lO3BhZGRpbmc6LjJlbSAuNmVtIC4zZW07Zm9udC1zaXplOjc1JTtmb250LXdlaWdodDo3MDA7bGluZS1oZWlnaHQ6MTtjb2xvcjojZmZmO3RleHQtYWxpZ246Y2VudGVyO3doaXRlLXNwYWNlOm5vd3JhcDt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZTtib3JkZXItcmFkaXVzOi4yNWVtfS5sYWJlbFtocmVmXTpob3ZlciwubGFiZWxbaHJlZl06Zm9jdXN7Y29sb3I6I2ZmZjt0ZXh0LWRlY29yYXRpb246bm9uZTtjdXJzb3I6cG9pbnRlcn0ubGFiZWw6ZW1wdHl7ZGlzcGxheTpub25lfS5idG4gLmxhYmVse3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMXB4fS5sYWJlbC1kZWZhdWx0e2JhY2tncm91bmQtY29sb3I6Izk5OX0ubGFiZWwtZGVmYXVsdFtocmVmXTpob3ZlciwubGFiZWwtZGVmYXVsdFtocmVmXTpmb2N1c3tiYWNrZ3JvdW5kLWNvbG9yOmdyYXl9LmxhYmVsLXByaW1hcnl7YmFja2dyb3VuZC1jb2xvcjojNDI4YmNhfS5sYWJlbC1wcmltYXJ5W2hyZWZdOmhvdmVyLC5sYWJlbC1wcmltYXJ5W2hyZWZdOmZvY3Vze2JhY2tncm91bmQtY29sb3I6IzMwNzFhOX0ubGFiZWwtc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOiM1Y2I4NWN9LmxhYmVsLXN1Y2Nlc3NbaHJlZl06aG92ZXIsLmxhYmVsLXN1Y2Nlc3NbaHJlZl06Zm9jdXN7YmFja2dyb3VuZC1jb2xvcjojNDQ5ZDQ0fS5sYWJlbC1pbmZve2JhY2tncm91bmQtY29sb3I6IzViYzBkZX0ubGFiZWwtaW5mb1tocmVmXTpob3ZlciwubGFiZWwtaW5mb1tocmVmXTpmb2N1c3tiYWNrZ3JvdW5kLWNvbG9yOiMzMWIwZDV9LmxhYmVsLXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjojZjBhZDRlfS5sYWJlbC13YXJuaW5nW2hyZWZdOmhvdmVyLC5sYWJlbC13YXJuaW5nW2hyZWZdOmZvY3Vze2JhY2tncm91bmQtY29sb3I6I2VjOTcxZn0ubGFiZWwtZGFuZ2Vye2JhY2tncm91bmQtY29sb3I6I2Q5NTM0Zn0ubGFiZWwtZGFuZ2VyW2hyZWZdOmhvdmVyLC5sYWJlbC1kYW5nZXJbaHJlZl06Zm9jdXN7YmFja2dyb3VuZC1jb2xvcjojYzkzMDJjfS5iYWRnZXtkaXNwbGF5OmlubGluZS1ibG9jazttaW4td2lkdGg6MTBweDtwYWRkaW5nOjNweCA3cHg7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOiNmZmY7bGluZS1oZWlnaHQ6MTt2ZXJ0aWNhbC1hbGlnbjpiYXNlbGluZTt3aGl0ZS1zcGFjZTpub3dyYXA7dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZC1jb2xvcjojOTk5O2JvcmRlci1yYWRpdXM6MTBweH0uYmFkZ2U6ZW1wdHl7ZGlzcGxheTpub25lfS5idG4gLmJhZGdle3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMXB4fS5idG4teHMgLmJhZGdle3RvcDowO3BhZGRpbmc6MXB4IDVweH1hLmJhZGdlOmhvdmVyLGEuYmFkZ2U6Zm9jdXN7Y29sb3I6I2ZmZjt0ZXh0LWRlY29yYXRpb246bm9uZTtjdXJzb3I6cG9pbnRlcn1hLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmU+LmJhZGdlLC5uYXYtcGlsbHM+LmFjdGl2ZT5hPi5iYWRnZXtjb2xvcjojNDI4YmNhO2JhY2tncm91bmQtY29sb3I6I2ZmZn0ubmF2LXBpbGxzPmxpPmE+LmJhZGdle21hcmdpbi1sZWZ0OjNweH0uanVtYm90cm9ue3BhZGRpbmc6MzBweDttYXJnaW4tYm90dG9tOjMwcHg7Y29sb3I6aW5oZXJpdDtiYWNrZ3JvdW5kLWNvbG9yOiNlZWV9Lmp1bWJvdHJvbiBoMSwuanVtYm90cm9uIC5oMXtjb2xvcjppbmhlcml0fS5qdW1ib3Ryb24gcHttYXJnaW4tYm90dG9tOjE1cHg7Zm9udC1zaXplOjIxcHg7Zm9udC13ZWlnaHQ6MjAwfS5jb250YWluZXIgLmp1bWJvdHJvbntib3JkZXItcmFkaXVzOjZweH0uanVtYm90cm9uIC5jb250YWluZXJ7bWF4LXdpZHRoOjEwMCV9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCl7Lmp1bWJvdHJvbntwYWRkaW5nLXRvcDo0OHB4O3BhZGRpbmctYm90dG9tOjQ4cHh9LmNvbnRhaW5lciAuanVtYm90cm9ue3BhZGRpbmctbGVmdDo2MHB4O3BhZGRpbmctcmlnaHQ6NjBweH0uanVtYm90cm9uIGgxLC5qdW1ib3Ryb24gLmgxe2ZvbnQtc2l6ZTo2M3B4fX0udGh1bWJuYWlse2Rpc3BsYXk6YmxvY2s7cGFkZGluZzo0cHg7bWFyZ2luLWJvdHRvbToyMHB4O2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDM7YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlcjoxcHggc29saWQgI2RkZDtib3JkZXItcmFkaXVzOjRweDstd2Via2l0LXRyYW5zaXRpb246YWxsIC4ycyBlYXNlLWluLW91dDt0cmFuc2l0aW9uOmFsbCAuMnMgZWFzZS1pbi1vdXR9LnRodW1ibmFpbD5pbWcsLnRodW1ibmFpbCBhPmltZ3ttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfWEudGh1bWJuYWlsOmhvdmVyLGEudGh1bWJuYWlsOmZvY3VzLGEudGh1bWJuYWlsLmFjdGl2ZXtib3JkZXItY29sb3I6IzQyOGJjYX0udGh1bWJuYWlsIC5jYXB0aW9ue3BhZGRpbmc6OXB4O2NvbG9yOiMzMzN9LmFsZXJ0e3BhZGRpbmc6MTVweDttYXJnaW4tYm90dG9tOjIwcHg7Ym9yZGVyOjFweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmFkaXVzOjRweH0uYWxlcnQgaDR7bWFyZ2luLXRvcDowO2NvbG9yOmluaGVyaXR9LmFsZXJ0IC5hbGVydC1saW5re2ZvbnQtd2VpZ2h0OjcwMH0uYWxlcnQ+cCwuYWxlcnQ+dWx7bWFyZ2luLWJvdHRvbTowfS5hbGVydD5wK3B7bWFyZ2luLXRvcDo1cHh9LmFsZXJ0LWRpc21pc3NhYmxle3BhZGRpbmctcmlnaHQ6MzVweH0uYWxlcnQtZGlzbWlzc2FibGUgLmNsb3Nle3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMnB4O3JpZ2h0Oi0yMXB4O2NvbG9yOmluaGVyaXR9LmFsZXJ0LXN1Y2Nlc3N7YmFja2dyb3VuZC1jb2xvcjojZGZmMGQ4O2JvcmRlci1jb2xvcjojZDZlOWM2O2NvbG9yOiMzYzc2M2R9LmFsZXJ0LXN1Y2Nlc3MgaHJ7Ym9yZGVyLXRvcC1jb2xvcjojYzllMmIzfS5hbGVydC1zdWNjZXNzIC5hbGVydC1saW5re2NvbG9yOiMyYjU0MmN9LmFsZXJ0LWluZm97YmFja2dyb3VuZC1jb2xvcjojZDllZGY3O2JvcmRlci1jb2xvcjojYmNlOGYxO2NvbG9yOiMzMTcwOGZ9LmFsZXJ0LWluZm8gaHJ7Ym9yZGVyLXRvcC1jb2xvcjojYTZlMWVjfS5hbGVydC1pbmZvIC5hbGVydC1saW5re2NvbG9yOiMyNDUyNjl9LmFsZXJ0LXdhcm5pbmd7YmFja2dyb3VuZC1jb2xvcjojZmNmOGUzO2JvcmRlci1jb2xvcjojZmFlYmNjO2NvbG9yOiM4YTZkM2J9LmFsZXJ0LXdhcm5pbmcgaHJ7Ym9yZGVyLXRvcC1jb2xvcjojZjdlMWI1fS5hbGVydC13YXJuaW5nIC5hbGVydC1saW5re2NvbG9yOiM2NjUxMmN9LmFsZXJ0LWRhbmdlcntiYWNrZ3JvdW5kLWNvbG9yOiNmMmRlZGU7Ym9yZGVyLWNvbG9yOiNlYmNjZDE7Y29sb3I6I2E5NDQ0Mn0uYWxlcnQtZGFuZ2VyIGhye2JvcmRlci10b3AtY29sb3I6I2U0YjljMH0uYWxlcnQtZGFuZ2VyIC5hbGVydC1saW5re2NvbG9yOiM4NDM1MzR9QC13ZWJraXQta2V5ZnJhbWVzIHByb2dyZXNzLWJhci1zdHJpcGVze2Zyb217YmFja2dyb3VuZC1wb3NpdGlvbjo0MHB4IDB9dG97YmFja2dyb3VuZC1wb3NpdGlvbjowIDB9fUBrZXlmcmFtZXMgcHJvZ3Jlc3MtYmFyLXN0cmlwZXN7ZnJvbXtiYWNrZ3JvdW5kLXBvc2l0aW9uOjQwcHggMH10b3tiYWNrZ3JvdW5kLXBvc2l0aW9uOjAgMH19LnByb2dyZXNze292ZXJmbG93OmhpZGRlbjtoZWlnaHQ6MjBweDttYXJnaW4tYm90dG9tOjIwcHg7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2JvcmRlci1yYWRpdXM6NHB4Oy13ZWJraXQtYm94LXNoYWRvdzppbnNldCAwIDFweCAycHggcmdiYSgwLDAsMCwuMSk7Ym94LXNoYWRvdzppbnNldCAwIDFweCAycHggcmdiYSgwLDAsMCwuMSl9LnByb2dyZXNzLWJhcntmbG9hdDpsZWZ0O3dpZHRoOjA7aGVpZ2h0OjEwMCU7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MjBweDtjb2xvcjojZmZmO3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQtY29sb3I6IzQyOGJjYTstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAtMXB4IDAgcmdiYSgwLDAsMCwuMTUpO2JveC1zaGFkb3c6aW5zZXQgMCAtMXB4IDAgcmdiYSgwLDAsMCwuMTUpOy13ZWJraXQtdHJhbnNpdGlvbjp3aWR0aCAuNnMgZWFzZTt0cmFuc2l0aW9uOndpZHRoIC42cyBlYXNlfS5wcm9ncmVzcy1zdHJpcGVkIC5wcm9ncmVzcy1iYXJ7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWxpbmVhci1ncmFkaWVudCg0NWRlZyxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgMjUlLHRyYW5zcGFyZW50IDI1JSx0cmFuc3BhcmVudCA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMTUpIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgNzUlLHRyYW5zcGFyZW50IDc1JSx0cmFuc3BhcmVudCk7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoNDVkZWcscmdiYSgyNTUsMjU1LDI1NSwuMTUpIDI1JSx0cmFuc3BhcmVudCAyNSUsdHJhbnNwYXJlbnQgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjE1KSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMTUpIDc1JSx0cmFuc3BhcmVudCA3NSUsdHJhbnNwYXJlbnQpO2JhY2tncm91bmQtc2l6ZTo0MHB4IDQwcHh9LnByb2dyZXNzLmFjdGl2ZSAucHJvZ3Jlc3MtYmFyey13ZWJraXQtYW5pbWF0aW9uOnByb2dyZXNzLWJhci1zdHJpcGVzIDJzIGxpbmVhciBpbmZpbml0ZTthbmltYXRpb246cHJvZ3Jlc3MtYmFyLXN0cmlwZXMgMnMgbGluZWFyIGluZmluaXRlfS5wcm9ncmVzcy1iYXItc3VjY2Vzc3tiYWNrZ3JvdW5kLWNvbG9yOiM1Y2I4NWN9LnByb2dyZXNzLXN0cmlwZWQgLnByb2dyZXNzLWJhci1zdWNjZXNze2JhY2tncm91bmQtaW1hZ2U6LXdlYmtpdC1saW5lYXItZ3JhZGllbnQoNDVkZWcscmdiYSgyNTUsMjU1LDI1NSwuMTUpIDI1JSx0cmFuc3BhcmVudCAyNSUsdHJhbnNwYXJlbnQgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjE1KSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMTUpIDc1JSx0cmFuc3BhcmVudCA3NSUsdHJhbnNwYXJlbnQpO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KDQ1ZGVnLHJnYmEoMjU1LDI1NSwyNTUsLjE1KSAyNSUsdHJhbnNwYXJlbnQgMjUlLHRyYW5zcGFyZW50IDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjE1KSA3NSUsdHJhbnNwYXJlbnQgNzUlLHRyYW5zcGFyZW50KX0ucHJvZ3Jlc3MtYmFyLWluZm97YmFja2dyb3VuZC1jb2xvcjojNWJjMGRlfS5wcm9ncmVzcy1zdHJpcGVkIC5wcm9ncmVzcy1iYXItaW5mb3tiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHJnYmEoMjU1LDI1NSwyNTUsLjE1KSAyNSUsdHJhbnNwYXJlbnQgMjUlLHRyYW5zcGFyZW50IDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjE1KSA3NSUsdHJhbnNwYXJlbnQgNzUlLHRyYW5zcGFyZW50KTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg0NWRlZyxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgMjUlLHRyYW5zcGFyZW50IDI1JSx0cmFuc3BhcmVudCA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMTUpIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgNzUlLHRyYW5zcGFyZW50IDc1JSx0cmFuc3BhcmVudCl9LnByb2dyZXNzLWJhci13YXJuaW5ne2JhY2tncm91bmQtY29sb3I6I2YwYWQ0ZX0ucHJvZ3Jlc3Mtc3RyaXBlZCAucHJvZ3Jlc3MtYmFyLXdhcm5pbmd7YmFja2dyb3VuZC1pbWFnZTotd2Via2l0LWxpbmVhci1ncmFkaWVudCg0NWRlZyxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgMjUlLHRyYW5zcGFyZW50IDI1JSx0cmFuc3BhcmVudCA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMTUpIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgNzUlLHRyYW5zcGFyZW50IDc1JSx0cmFuc3BhcmVudCk7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQoNDVkZWcscmdiYSgyNTUsMjU1LDI1NSwuMTUpIDI1JSx0cmFuc3BhcmVudCAyNSUsdHJhbnNwYXJlbnQgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjE1KSA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMTUpIDc1JSx0cmFuc3BhcmVudCA3NSUsdHJhbnNwYXJlbnQpfS5wcm9ncmVzcy1iYXItZGFuZ2Vye2JhY2tncm91bmQtY29sb3I6I2Q5NTM0Zn0ucHJvZ3Jlc3Mtc3RyaXBlZCAucHJvZ3Jlc3MtYmFyLWRhbmdlcntiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtbGluZWFyLWdyYWRpZW50KDQ1ZGVnLHJnYmEoMjU1LDI1NSwyNTUsLjE1KSAyNSUsdHJhbnNwYXJlbnQgMjUlLHRyYW5zcGFyZW50IDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgNTAlLHJnYmEoMjU1LDI1NSwyNTUsLjE1KSA3NSUsdHJhbnNwYXJlbnQgNzUlLHRyYW5zcGFyZW50KTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCg0NWRlZyxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgMjUlLHRyYW5zcGFyZW50IDI1JSx0cmFuc3BhcmVudCA1MCUscmdiYSgyNTUsMjU1LDI1NSwuMTUpIDUwJSxyZ2JhKDI1NSwyNTUsMjU1LC4xNSkgNzUlLHRyYW5zcGFyZW50IDc1JSx0cmFuc3BhcmVudCl9Lm1lZGlhLC5tZWRpYS1ib2R5e292ZXJmbG93OmhpZGRlbjt6b29tOjF9Lm1lZGlhLC5tZWRpYSAubWVkaWF7bWFyZ2luLXRvcDoxNXB4fS5tZWRpYTpmaXJzdC1jaGlsZHttYXJnaW4tdG9wOjB9Lm1lZGlhLW9iamVjdHtkaXNwbGF5OmJsb2NrfS5tZWRpYS1oZWFkaW5ne21hcmdpbjowIDAgNXB4fS5tZWRpYT4ucHVsbC1sZWZ0e21hcmdpbi1yaWdodDoxMHB4fS5tZWRpYT4ucHVsbC1yaWdodHttYXJnaW4tbGVmdDoxMHB4fS5tZWRpYS1saXN0e3BhZGRpbmctbGVmdDowO2xpc3Qtc3R5bGU6bm9uZX0ubGlzdC1ncm91cHttYXJnaW4tYm90dG9tOjIwcHg7cGFkZGluZy1sZWZ0OjB9Lmxpc3QtZ3JvdXAtaXRlbXtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmJsb2NrO3BhZGRpbmc6MTBweCAxNXB4O21hcmdpbi1ib3R0b206LTFweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjZGRkfS5saXN0LWdyb3VwLWl0ZW06Zmlyc3QtY2hpbGR7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6NHB4O2JvcmRlci10b3AtbGVmdC1yYWRpdXM6NHB4fS5saXN0LWdyb3VwLWl0ZW06bGFzdC1jaGlsZHttYXJnaW4tYm90dG9tOjA7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6NHB4O2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6NHB4fS5saXN0LWdyb3VwLWl0ZW0+LmJhZGdle2Zsb2F0OnJpZ2h0fS5saXN0LWdyb3VwLWl0ZW0+LmJhZGdlKy5iYWRnZXttYXJnaW4tcmlnaHQ6NXB4fWEubGlzdC1ncm91cC1pdGVte2NvbG9yOiM1NTV9YS5saXN0LWdyb3VwLWl0ZW0gLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5ne2NvbG9yOiMzMzN9YS5saXN0LWdyb3VwLWl0ZW06aG92ZXIsYS5saXN0LWdyb3VwLWl0ZW06Zm9jdXN7dGV4dC1kZWNvcmF0aW9uOm5vbmU7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1fWEubGlzdC1ncm91cC1pdGVtLmFjdGl2ZSxhLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmU6aG92ZXIsYS5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlOmZvY3Vze3otaW5kZXg6Mjtjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6IzQyOGJjYTtib3JkZXItY29sb3I6IzQyOGJjYX1hLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmUgLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nLGEubGlzdC1ncm91cC1pdGVtLmFjdGl2ZTpob3ZlciAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmcsYS5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlOmZvY3VzIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZ3tjb2xvcjppbmhlcml0fWEubGlzdC1ncm91cC1pdGVtLmFjdGl2ZSAubGlzdC1ncm91cC1pdGVtLXRleHQsYS5saXN0LWdyb3VwLWl0ZW0uYWN0aXZlOmhvdmVyIC5saXN0LWdyb3VwLWl0ZW0tdGV4dCxhLmxpc3QtZ3JvdXAtaXRlbS5hY3RpdmU6Zm9jdXMgLmxpc3QtZ3JvdXAtaXRlbS10ZXh0e2NvbG9yOiNlMWVkZjd9Lmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNze2NvbG9yOiMzYzc2M2Q7YmFja2dyb3VuZC1jb2xvcjojZGZmMGQ4fWEubGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3N7Y29sb3I6IzNjNzYzZH1hLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZ3tjb2xvcjppbmhlcml0fWEubGlzdC1ncm91cC1pdGVtLXN1Y2Nlc3M6aG92ZXIsYS5saXN0LWdyb3VwLWl0ZW0tc3VjY2Vzczpmb2N1c3tjb2xvcjojM2M3NjNkO2JhY2tncm91bmQtY29sb3I6I2QwZTljNn1hLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzLmFjdGl2ZSxhLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzLmFjdGl2ZTpob3ZlcixhLmxpc3QtZ3JvdXAtaXRlbS1zdWNjZXNzLmFjdGl2ZTpmb2N1c3tjb2xvcjojZmZmO2JhY2tncm91bmQtY29sb3I6IzNjNzYzZDtib3JkZXItY29sb3I6IzNjNzYzZH0ubGlzdC1ncm91cC1pdGVtLWluZm97Y29sb3I6IzMxNzA4ZjtiYWNrZ3JvdW5kLWNvbG9yOiNkOWVkZjd9YS5saXN0LWdyb3VwLWl0ZW0taW5mb3tjb2xvcjojMzE3MDhmfWEubGlzdC1ncm91cC1pdGVtLWluZm8gLmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5ne2NvbG9yOmluaGVyaXR9YS5saXN0LWdyb3VwLWl0ZW0taW5mbzpob3ZlcixhLmxpc3QtZ3JvdXAtaXRlbS1pbmZvOmZvY3Vze2NvbG9yOiMzMTcwOGY7YmFja2dyb3VuZC1jb2xvcjojYzRlM2YzfWEubGlzdC1ncm91cC1pdGVtLWluZm8uYWN0aXZlLGEubGlzdC1ncm91cC1pdGVtLWluZm8uYWN0aXZlOmhvdmVyLGEubGlzdC1ncm91cC1pdGVtLWluZm8uYWN0aXZlOmZvY3Vze2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjojMzE3MDhmO2JvcmRlci1jb2xvcjojMzE3MDhmfS5saXN0LWdyb3VwLWl0ZW0td2FybmluZ3tjb2xvcjojOGE2ZDNiO2JhY2tncm91bmQtY29sb3I6I2ZjZjhlM31hLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5ne2NvbG9yOiM4YTZkM2J9YS5saXN0LWdyb3VwLWl0ZW0td2FybmluZyAubGlzdC1ncm91cC1pdGVtLWhlYWRpbmd7Y29sb3I6aW5oZXJpdH1hLmxpc3QtZ3JvdXAtaXRlbS13YXJuaW5nOmhvdmVyLGEubGlzdC1ncm91cC1pdGVtLXdhcm5pbmc6Zm9jdXN7Y29sb3I6IzhhNmQzYjtiYWNrZ3JvdW5kLWNvbG9yOiNmYWYyY2N9YS5saXN0LWdyb3VwLWl0ZW0td2FybmluZy5hY3RpdmUsYS5saXN0LWdyb3VwLWl0ZW0td2FybmluZy5hY3RpdmU6aG92ZXIsYS5saXN0LWdyb3VwLWl0ZW0td2FybmluZy5hY3RpdmU6Zm9jdXN7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiM4YTZkM2I7Ym9yZGVyLWNvbG9yOiM4YTZkM2J9Lmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXJ7Y29sb3I6I2E5NDQ0MjtiYWNrZ3JvdW5kLWNvbG9yOiNmMmRlZGV9YS5saXN0LWdyb3VwLWl0ZW0tZGFuZ2Vye2NvbG9yOiNhOTQ0NDJ9YS5saXN0LWdyb3VwLWl0ZW0tZGFuZ2VyIC5saXN0LWdyb3VwLWl0ZW0taGVhZGluZ3tjb2xvcjppbmhlcml0fWEubGlzdC1ncm91cC1pdGVtLWRhbmdlcjpob3ZlcixhLmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXI6Zm9jdXN7Y29sb3I6I2E5NDQ0MjtiYWNrZ3JvdW5kLWNvbG9yOiNlYmNjY2N9YS5saXN0LWdyb3VwLWl0ZW0tZGFuZ2VyLmFjdGl2ZSxhLmxpc3QtZ3JvdXAtaXRlbS1kYW5nZXIuYWN0aXZlOmhvdmVyLGEubGlzdC1ncm91cC1pdGVtLWRhbmdlci5hY3RpdmU6Zm9jdXN7Y29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNvbG9yOiNhOTQ0NDI7Ym9yZGVyLWNvbG9yOiNhOTQ0NDJ9Lmxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5ne21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjVweH0ubGlzdC1ncm91cC1pdGVtLXRleHR7bWFyZ2luLWJvdHRvbTowO2xpbmUtaGVpZ2h0OjEuM30ucGFuZWx7bWFyZ2luLWJvdHRvbToyMHB4O2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXI6MXB4IHNvbGlkIHRyYW5zcGFyZW50O2JvcmRlci1yYWRpdXM6NHB4Oy13ZWJraXQtYm94LXNoYWRvdzowIDFweCAxcHggcmdiYSgwLDAsMCwuMDUpO2JveC1zaGFkb3c6MCAxcHggMXB4IHJnYmEoMCwwLDAsLjA1KX0ucGFuZWwtYm9keXtwYWRkaW5nOjE1cHh9LnBhbmVsLWhlYWRpbmd7cGFkZGluZzoxMHB4IDE1cHg7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6M3B4O2JvcmRlci10b3AtbGVmdC1yYWRpdXM6M3B4fS5wYW5lbC1oZWFkaW5nPi5kcm9wZG93biAuZHJvcGRvd24tdG9nZ2xle2NvbG9yOmluaGVyaXR9LnBhbmVsLXRpdGxle21hcmdpbi10b3A6MDttYXJnaW4tYm90dG9tOjA7Zm9udC1zaXplOjE2cHg7Y29sb3I6aW5oZXJpdH0ucGFuZWwtdGl0bGU+YXtjb2xvcjppbmhlcml0fS5wYW5lbC1mb290ZXJ7cGFkZGluZzoxMHB4IDE1cHg7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2JvcmRlci10b3A6MXB4IHNvbGlkICNkZGQ7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6M3B4O2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6M3B4fS5wYW5lbD4ubGlzdC1ncm91cHttYXJnaW4tYm90dG9tOjB9LnBhbmVsPi5saXN0LWdyb3VwIC5saXN0LWdyb3VwLWl0ZW17Ym9yZGVyLXdpZHRoOjFweCAwO2JvcmRlci1yYWRpdXM6MH0ucGFuZWw+Lmxpc3QtZ3JvdXA6Zmlyc3QtY2hpbGQgLmxpc3QtZ3JvdXAtaXRlbTpmaXJzdC1jaGlsZHtib3JkZXItdG9wOjA7Ym9yZGVyLXRvcC1yaWdodC1yYWRpdXM6M3B4O2JvcmRlci10b3AtbGVmdC1yYWRpdXM6M3B4fS5wYW5lbD4ubGlzdC1ncm91cDpsYXN0LWNoaWxkIC5saXN0LWdyb3VwLWl0ZW06bGFzdC1jaGlsZHtib3JkZXItYm90dG9tOjA7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6M3B4O2JvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6M3B4fS5wYW5lbC1oZWFkaW5nKy5saXN0LWdyb3VwIC5saXN0LWdyb3VwLWl0ZW06Zmlyc3QtY2hpbGR7Ym9yZGVyLXRvcC13aWR0aDowfS5wYW5lbD4udGFibGUsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlPi50YWJsZXttYXJnaW4tYm90dG9tOjB9LnBhbmVsPi50YWJsZTpmaXJzdC1jaGlsZCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQ+LnRhYmxlOmZpcnN0LWNoaWxke2JvcmRlci10b3AtcmlnaHQtcmFkaXVzOjNweDtib3JkZXItdG9wLWxlZnQtcmFkaXVzOjNweH0ucGFuZWw+LnRhYmxlOmZpcnN0LWNoaWxkPnRoZWFkOmZpcnN0LWNoaWxkPnRyOmZpcnN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZTpmaXJzdC1jaGlsZD4udGFibGU6Zmlyc3QtY2hpbGQ+dGhlYWQ6Zmlyc3QtY2hpbGQ+dHI6Zmlyc3QtY2hpbGQgdGQ6Zmlyc3QtY2hpbGQsLnBhbmVsPi50YWJsZTpmaXJzdC1jaGlsZD50Ym9keTpmaXJzdC1jaGlsZD50cjpmaXJzdC1jaGlsZCB0ZDpmaXJzdC1jaGlsZCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQ+LnRhYmxlOmZpcnN0LWNoaWxkPnRib2R5OmZpcnN0LWNoaWxkPnRyOmZpcnN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGU6Zmlyc3QtY2hpbGQ+dGhlYWQ6Zmlyc3QtY2hpbGQ+dHI6Zmlyc3QtY2hpbGQgdGg6Zmlyc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlOmZpcnN0LWNoaWxkPi50YWJsZTpmaXJzdC1jaGlsZD50aGVhZDpmaXJzdC1jaGlsZD50cjpmaXJzdC1jaGlsZCB0aDpmaXJzdC1jaGlsZCwucGFuZWw+LnRhYmxlOmZpcnN0LWNoaWxkPnRib2R5OmZpcnN0LWNoaWxkPnRyOmZpcnN0LWNoaWxkIHRoOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZTpmaXJzdC1jaGlsZD4udGFibGU6Zmlyc3QtY2hpbGQ+dGJvZHk6Zmlyc3QtY2hpbGQ+dHI6Zmlyc3QtY2hpbGQgdGg6Zmlyc3QtY2hpbGR7Ym9yZGVyLXRvcC1sZWZ0LXJhZGl1czozcHh9LnBhbmVsPi50YWJsZTpmaXJzdC1jaGlsZD50aGVhZDpmaXJzdC1jaGlsZD50cjpmaXJzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZTpmaXJzdC1jaGlsZD4udGFibGU6Zmlyc3QtY2hpbGQ+dGhlYWQ6Zmlyc3QtY2hpbGQ+dHI6Zmlyc3QtY2hpbGQgdGQ6bGFzdC1jaGlsZCwucGFuZWw+LnRhYmxlOmZpcnN0LWNoaWxkPnRib2R5OmZpcnN0LWNoaWxkPnRyOmZpcnN0LWNoaWxkIHRkOmxhc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlOmZpcnN0LWNoaWxkPi50YWJsZTpmaXJzdC1jaGlsZD50Ym9keTpmaXJzdC1jaGlsZD50cjpmaXJzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLC5wYW5lbD4udGFibGU6Zmlyc3QtY2hpbGQ+dGhlYWQ6Zmlyc3QtY2hpbGQ+dHI6Zmlyc3QtY2hpbGQgdGg6bGFzdC1jaGlsZCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU6Zmlyc3QtY2hpbGQ+LnRhYmxlOmZpcnN0LWNoaWxkPnRoZWFkOmZpcnN0LWNoaWxkPnRyOmZpcnN0LWNoaWxkIHRoOmxhc3QtY2hpbGQsLnBhbmVsPi50YWJsZTpmaXJzdC1jaGlsZD50Ym9keTpmaXJzdC1jaGlsZD50cjpmaXJzdC1jaGlsZCB0aDpsYXN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZTpmaXJzdC1jaGlsZD4udGFibGU6Zmlyc3QtY2hpbGQ+dGJvZHk6Zmlyc3QtY2hpbGQ+dHI6Zmlyc3QtY2hpbGQgdGg6bGFzdC1jaGlsZHtib3JkZXItdG9wLXJpZ2h0LXJhZGl1czozcHh9LnBhbmVsPi50YWJsZTpsYXN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkPi50YWJsZTpsYXN0LWNoaWxke2JvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOjNweDtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjNweH0ucGFuZWw+LnRhYmxlOmxhc3QtY2hpbGQ+dGJvZHk6bGFzdC1jaGlsZD50cjpsYXN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkPi50YWJsZTpsYXN0LWNoaWxkPnRib2R5Omxhc3QtY2hpbGQ+dHI6bGFzdC1jaGlsZCB0ZDpmaXJzdC1jaGlsZCwucGFuZWw+LnRhYmxlOmxhc3QtY2hpbGQ+dGZvb3Q6bGFzdC1jaGlsZD50cjpsYXN0LWNoaWxkIHRkOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkPi50YWJsZTpsYXN0LWNoaWxkPnRmb290Omxhc3QtY2hpbGQ+dHI6bGFzdC1jaGlsZCB0ZDpmaXJzdC1jaGlsZCwucGFuZWw+LnRhYmxlOmxhc3QtY2hpbGQ+dGJvZHk6bGFzdC1jaGlsZD50cjpsYXN0LWNoaWxkIHRoOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkPi50YWJsZTpsYXN0LWNoaWxkPnRib2R5Omxhc3QtY2hpbGQ+dHI6bGFzdC1jaGlsZCB0aDpmaXJzdC1jaGlsZCwucGFuZWw+LnRhYmxlOmxhc3QtY2hpbGQ+dGZvb3Q6bGFzdC1jaGlsZD50cjpsYXN0LWNoaWxkIHRoOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkPi50YWJsZTpsYXN0LWNoaWxkPnRmb290Omxhc3QtY2hpbGQ+dHI6bGFzdC1jaGlsZCB0aDpmaXJzdC1jaGlsZHtib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOjNweH0ucGFuZWw+LnRhYmxlOmxhc3QtY2hpbGQ+dGJvZHk6bGFzdC1jaGlsZD50cjpsYXN0LWNoaWxkIHRkOmxhc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlOmxhc3QtY2hpbGQ+LnRhYmxlOmxhc3QtY2hpbGQ+dGJvZHk6bGFzdC1jaGlsZD50cjpsYXN0LWNoaWxkIHRkOmxhc3QtY2hpbGQsLnBhbmVsPi50YWJsZTpsYXN0LWNoaWxkPnRmb290Omxhc3QtY2hpbGQ+dHI6bGFzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZTpsYXN0LWNoaWxkPi50YWJsZTpsYXN0LWNoaWxkPnRmb290Omxhc3QtY2hpbGQ+dHI6bGFzdC1jaGlsZCB0ZDpsYXN0LWNoaWxkLC5wYW5lbD4udGFibGU6bGFzdC1jaGlsZD50Ym9keTpsYXN0LWNoaWxkPnRyOmxhc3QtY2hpbGQgdGg6bGFzdC1jaGlsZCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU6bGFzdC1jaGlsZD4udGFibGU6bGFzdC1jaGlsZD50Ym9keTpsYXN0LWNoaWxkPnRyOmxhc3QtY2hpbGQgdGg6bGFzdC1jaGlsZCwucGFuZWw+LnRhYmxlOmxhc3QtY2hpbGQ+dGZvb3Q6bGFzdC1jaGlsZD50cjpsYXN0LWNoaWxkIHRoOmxhc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlOmxhc3QtY2hpbGQ+LnRhYmxlOmxhc3QtY2hpbGQ+dGZvb3Q6bGFzdC1jaGlsZD50cjpsYXN0LWNoaWxkIHRoOmxhc3QtY2hpbGR7Ym9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6M3B4fS5wYW5lbD4ucGFuZWwtYm9keSsudGFibGUsLnBhbmVsPi5wYW5lbC1ib2R5Ky50YWJsZS1yZXNwb25zaXZle2JvcmRlci10b3A6MXB4IHNvbGlkICNkZGR9LnBhbmVsPi50YWJsZT50Ym9keTpmaXJzdC1jaGlsZD50cjpmaXJzdC1jaGlsZCB0aCwucGFuZWw+LnRhYmxlPnRib2R5OmZpcnN0LWNoaWxkPnRyOmZpcnN0LWNoaWxkIHRke2JvcmRlci10b3A6MH0ucGFuZWw+LnRhYmxlLWJvcmRlcmVkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZT4udGFibGUtYm9yZGVyZWR7Ym9yZGVyOjB9LnBhbmVsPi50YWJsZS1ib3JkZXJlZD50aGVhZD50cj50aDpmaXJzdC1jaGlsZCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlLWJvcmRlcmVkPnRoZWFkPnRyPnRoOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGUtYm9yZGVyZWQ+dGJvZHk+dHI+dGg6Zmlyc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Ym9keT50cj50aDpmaXJzdC1jaGlsZCwucGFuZWw+LnRhYmxlLWJvcmRlcmVkPnRmb290PnRyPnRoOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZT4udGFibGUtYm9yZGVyZWQ+dGZvb3Q+dHI+dGg6Zmlyc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1ib3JkZXJlZD50aGVhZD50cj50ZDpmaXJzdC1jaGlsZCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlLWJvcmRlcmVkPnRoZWFkPnRyPnRkOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGUtYm9yZGVyZWQ+dGJvZHk+dHI+dGQ6Zmlyc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Ym9keT50cj50ZDpmaXJzdC1jaGlsZCwucGFuZWw+LnRhYmxlLWJvcmRlcmVkPnRmb290PnRyPnRkOmZpcnN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZT4udGFibGUtYm9yZGVyZWQ+dGZvb3Q+dHI+dGQ6Zmlyc3QtY2hpbGR7Ym9yZGVyLWxlZnQ6MH0ucGFuZWw+LnRhYmxlLWJvcmRlcmVkPnRoZWFkPnRyPnRoOmxhc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50aGVhZD50cj50aDpsYXN0LWNoaWxkLC5wYW5lbD4udGFibGUtYm9yZGVyZWQ+dGJvZHk+dHI+dGg6bGFzdC1jaGlsZCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlLWJvcmRlcmVkPnRib2R5PnRyPnRoOmxhc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1ib3JkZXJlZD50Zm9vdD50cj50aDpsYXN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZT4udGFibGUtYm9yZGVyZWQ+dGZvb3Q+dHI+dGg6bGFzdC1jaGlsZCwucGFuZWw+LnRhYmxlLWJvcmRlcmVkPnRoZWFkPnRyPnRkOmxhc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50aGVhZD50cj50ZDpsYXN0LWNoaWxkLC5wYW5lbD4udGFibGUtYm9yZGVyZWQ+dGJvZHk+dHI+dGQ6bGFzdC1jaGlsZCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlLWJvcmRlcmVkPnRib2R5PnRyPnRkOmxhc3QtY2hpbGQsLnBhbmVsPi50YWJsZS1ib3JkZXJlZD50Zm9vdD50cj50ZDpsYXN0LWNoaWxkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZT4udGFibGUtYm9yZGVyZWQ+dGZvb3Q+dHI+dGQ6bGFzdC1jaGlsZHtib3JkZXItcmlnaHQ6MH0ucGFuZWw+LnRhYmxlLWJvcmRlcmVkPnRoZWFkPnRyOmZpcnN0LWNoaWxkPnRkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZT4udGFibGUtYm9yZGVyZWQ+dGhlYWQ+dHI6Zmlyc3QtY2hpbGQ+dGQsLnBhbmVsPi50YWJsZS1ib3JkZXJlZD50Ym9keT50cjpmaXJzdC1jaGlsZD50ZCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlLWJvcmRlcmVkPnRib2R5PnRyOmZpcnN0LWNoaWxkPnRkLC5wYW5lbD4udGFibGUtYm9yZGVyZWQ+dGhlYWQ+dHI6Zmlyc3QtY2hpbGQ+dGgsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50aGVhZD50cjpmaXJzdC1jaGlsZD50aCwucGFuZWw+LnRhYmxlLWJvcmRlcmVkPnRib2R5PnRyOmZpcnN0LWNoaWxkPnRoLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZT4udGFibGUtYm9yZGVyZWQ+dGJvZHk+dHI6Zmlyc3QtY2hpbGQ+dGh7Ym9yZGVyLWJvdHRvbTowfS5wYW5lbD4udGFibGUtYm9yZGVyZWQ+dGJvZHk+dHI6bGFzdC1jaGlsZD50ZCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlLWJvcmRlcmVkPnRib2R5PnRyOmxhc3QtY2hpbGQ+dGQsLnBhbmVsPi50YWJsZS1ib3JkZXJlZD50Zm9vdD50cjpsYXN0LWNoaWxkPnRkLC5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZT4udGFibGUtYm9yZGVyZWQ+dGZvb3Q+dHI6bGFzdC1jaGlsZD50ZCwucGFuZWw+LnRhYmxlLWJvcmRlcmVkPnRib2R5PnRyOmxhc3QtY2hpbGQ+dGgsLnBhbmVsPi50YWJsZS1yZXNwb25zaXZlPi50YWJsZS1ib3JkZXJlZD50Ym9keT50cjpsYXN0LWNoaWxkPnRoLC5wYW5lbD4udGFibGUtYm9yZGVyZWQ+dGZvb3Q+dHI6bGFzdC1jaGlsZD50aCwucGFuZWw+LnRhYmxlLXJlc3BvbnNpdmU+LnRhYmxlLWJvcmRlcmVkPnRmb290PnRyOmxhc3QtY2hpbGQ+dGh7Ym9yZGVyLWJvdHRvbTowfS5wYW5lbD4udGFibGUtcmVzcG9uc2l2ZXtib3JkZXI6MDttYXJnaW4tYm90dG9tOjB9LnBhbmVsLWdyb3Vwe21hcmdpbi1ib3R0b206MjBweH0ucGFuZWwtZ3JvdXAgLnBhbmVse21hcmdpbi1ib3R0b206MDtib3JkZXItcmFkaXVzOjRweDtvdmVyZmxvdzpoaWRkZW59LnBhbmVsLWdyb3VwIC5wYW5lbCsucGFuZWx7bWFyZ2luLXRvcDo1cHh9LnBhbmVsLWdyb3VwIC5wYW5lbC1oZWFkaW5ne2JvcmRlci1ib3R0b206MH0ucGFuZWwtZ3JvdXAgLnBhbmVsLWhlYWRpbmcrLnBhbmVsLWNvbGxhcHNlIC5wYW5lbC1ib2R5e2JvcmRlci10b3A6MXB4IHNvbGlkICNkZGR9LnBhbmVsLWdyb3VwIC5wYW5lbC1mb290ZXJ7Ym9yZGVyLXRvcDowfS5wYW5lbC1ncm91cCAucGFuZWwtZm9vdGVyKy5wYW5lbC1jb2xsYXBzZSAucGFuZWwtYm9keXtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZGRkfS5wYW5lbC1kZWZhdWx0e2JvcmRlci1jb2xvcjojZGRkfS5wYW5lbC1kZWZhdWx0Pi5wYW5lbC1oZWFkaW5ne2NvbG9yOiMzMzM7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2JvcmRlci1jb2xvcjojZGRkfS5wYW5lbC1kZWZhdWx0Pi5wYW5lbC1oZWFkaW5nKy5wYW5lbC1jb2xsYXBzZSAucGFuZWwtYm9keXtib3JkZXItdG9wLWNvbG9yOiNkZGR9LnBhbmVsLWRlZmF1bHQ+LnBhbmVsLWZvb3RlcisucGFuZWwtY29sbGFwc2UgLnBhbmVsLWJvZHl7Ym9yZGVyLWJvdHRvbS1jb2xvcjojZGRkfS5wYW5lbC1wcmltYXJ5e2JvcmRlci1jb2xvcjojNDI4YmNhfS5wYW5lbC1wcmltYXJ5Pi5wYW5lbC1oZWFkaW5ne2NvbG9yOiNmZmY7YmFja2dyb3VuZC1jb2xvcjojNDI4YmNhO2JvcmRlci1jb2xvcjojNDI4YmNhfS5wYW5lbC1wcmltYXJ5Pi5wYW5lbC1oZWFkaW5nKy5wYW5lbC1jb2xsYXBzZSAucGFuZWwtYm9keXtib3JkZXItdG9wLWNvbG9yOiM0MjhiY2F9LnBhbmVsLXByaW1hcnk+LnBhbmVsLWZvb3RlcisucGFuZWwtY29sbGFwc2UgLnBhbmVsLWJvZHl7Ym9yZGVyLWJvdHRvbS1jb2xvcjojNDI4YmNhfS5wYW5lbC1zdWNjZXNze2JvcmRlci1jb2xvcjojZDZlOWM2fS5wYW5lbC1zdWNjZXNzPi5wYW5lbC1oZWFkaW5ne2NvbG9yOiMzYzc2M2Q7YmFja2dyb3VuZC1jb2xvcjojZGZmMGQ4O2JvcmRlci1jb2xvcjojZDZlOWM2fS5wYW5lbC1zdWNjZXNzPi5wYW5lbC1oZWFkaW5nKy5wYW5lbC1jb2xsYXBzZSAucGFuZWwtYm9keXtib3JkZXItdG9wLWNvbG9yOiNkNmU5YzZ9LnBhbmVsLXN1Y2Nlc3M+LnBhbmVsLWZvb3RlcisucGFuZWwtY29sbGFwc2UgLnBhbmVsLWJvZHl7Ym9yZGVyLWJvdHRvbS1jb2xvcjojZDZlOWM2fS5wYW5lbC1pbmZve2JvcmRlci1jb2xvcjojYmNlOGYxfS5wYW5lbC1pbmZvPi5wYW5lbC1oZWFkaW5ne2NvbG9yOiMzMTcwOGY7YmFja2dyb3VuZC1jb2xvcjojZDllZGY3O2JvcmRlci1jb2xvcjojYmNlOGYxfS5wYW5lbC1pbmZvPi5wYW5lbC1oZWFkaW5nKy5wYW5lbC1jb2xsYXBzZSAucGFuZWwtYm9keXtib3JkZXItdG9wLWNvbG9yOiNiY2U4ZjF9LnBhbmVsLWluZm8+LnBhbmVsLWZvb3RlcisucGFuZWwtY29sbGFwc2UgLnBhbmVsLWJvZHl7Ym9yZGVyLWJvdHRvbS1jb2xvcjojYmNlOGYxfS5wYW5lbC13YXJuaW5ne2JvcmRlci1jb2xvcjojZmFlYmNjfS5wYW5lbC13YXJuaW5nPi5wYW5lbC1oZWFkaW5ne2NvbG9yOiM4YTZkM2I7YmFja2dyb3VuZC1jb2xvcjojZmNmOGUzO2JvcmRlci1jb2xvcjojZmFlYmNjfS5wYW5lbC13YXJuaW5nPi5wYW5lbC1oZWFkaW5nKy5wYW5lbC1jb2xsYXBzZSAucGFuZWwtYm9keXtib3JkZXItdG9wLWNvbG9yOiNmYWViY2N9LnBhbmVsLXdhcm5pbmc+LnBhbmVsLWZvb3RlcisucGFuZWwtY29sbGFwc2UgLnBhbmVsLWJvZHl7Ym9yZGVyLWJvdHRvbS1jb2xvcjojZmFlYmNjfS5wYW5lbC1kYW5nZXJ7Ym9yZGVyLWNvbG9yOiNlYmNjZDF9LnBhbmVsLWRhbmdlcj4ucGFuZWwtaGVhZGluZ3tjb2xvcjojYTk0NDQyO2JhY2tncm91bmQtY29sb3I6I2YyZGVkZTtib3JkZXItY29sb3I6I2ViY2NkMX0ucGFuZWwtZGFuZ2VyPi5wYW5lbC1oZWFkaW5nKy5wYW5lbC1jb2xsYXBzZSAucGFuZWwtYm9keXtib3JkZXItdG9wLWNvbG9yOiNlYmNjZDF9LnBhbmVsLWRhbmdlcj4ucGFuZWwtZm9vdGVyKy5wYW5lbC1jb2xsYXBzZSAucGFuZWwtYm9keXtib3JkZXItYm90dG9tLWNvbG9yOiNlYmNjZDF9LndlbGx7bWluLWhlaWdodDoyMHB4O3BhZGRpbmc6MTlweDttYXJnaW4tYm90dG9tOjIwcHg7YmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O2JvcmRlcjoxcHggc29saWQgI2UzZTNlMztib3JkZXItcmFkaXVzOjRweDstd2Via2l0LWJveC1zaGFkb3c6aW5zZXQgMCAxcHggMXB4IHJnYmEoMCwwLDAsLjA1KTtib3gtc2hhZG93Omluc2V0IDAgMXB4IDFweCByZ2JhKDAsMCwwLC4wNSl9LndlbGwgYmxvY2txdW90ZXtib3JkZXItY29sb3I6I2RkZDtib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuMTUpfS53ZWxsLWxne3BhZGRpbmc6MjRweDtib3JkZXItcmFkaXVzOjZweH0ud2VsbC1zbXtwYWRkaW5nOjlweDtib3JkZXItcmFkaXVzOjNweH0uY2xvc2V7ZmxvYXQ6cmlnaHQ7Zm9udC1zaXplOjIxcHg7Zm9udC13ZWlnaHQ6NzAwO2xpbmUtaGVpZ2h0OjE7Y29sb3I6IzAwMDt0ZXh0LXNoYWRvdzowIDFweCAwICNmZmY7b3BhY2l0eTouMjtmaWx0ZXI6YWxwaGEob3BhY2l0eT0yMCl9LmNsb3NlOmhvdmVyLC5jbG9zZTpmb2N1c3tjb2xvcjojMDAwO3RleHQtZGVjb3JhdGlvbjpub25lO2N1cnNvcjpwb2ludGVyO29wYWNpdHk6LjU7ZmlsdGVyOmFscGhhKG9wYWNpdHk9NTApfWJ1dHRvbi5jbG9zZXtwYWRkaW5nOjA7Y3Vyc29yOnBvaW50ZXI7YmFja2dyb3VuZDowIDA7Ym9yZGVyOjA7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmV9Lm1vZGFsLW9wZW57b3ZlcmZsb3c6aGlkZGVufS5tb2RhbHtkaXNwbGF5Om5vbmU7b3ZlcmZsb3c6YXV0bztvdmVyZmxvdy15OnNjcm9sbDtwb3NpdGlvbjpmaXhlZDt0b3A6MDtyaWdodDowO2JvdHRvbTowO2xlZnQ6MDt6LWluZGV4OjEwNTA7LXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6dG91Y2g7b3V0bGluZTowfS5tb2RhbC5mYWRlIC5tb2RhbC1kaWFsb2d7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKDAsLTI1JSk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGUoMCwtMjUlKTt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsLTI1JSk7LXdlYmtpdC10cmFuc2l0aW9uOi13ZWJraXQtdHJhbnNmb3JtIC4zcyBlYXNlLW91dDstbW96LXRyYW5zaXRpb246LW1vei10cmFuc2Zvcm0gLjNzIGVhc2Utb3V0Oy1vLXRyYW5zaXRpb246LW8tdHJhbnNmb3JtIC4zcyBlYXNlLW91dDt0cmFuc2l0aW9uOnRyYW5zZm9ybSAuM3MgZWFzZS1vdXR9Lm1vZGFsLmluIC5tb2RhbC1kaWFsb2d7LXdlYmtpdC10cmFuc2Zvcm06dHJhbnNsYXRlKDAsMCk7LW1zLXRyYW5zZm9ybTp0cmFuc2xhdGUoMCwwKTt0cmFuc2Zvcm06dHJhbnNsYXRlKDAsMCl9Lm1vZGFsLWRpYWxvZ3twb3NpdGlvbjpyZWxhdGl2ZTt3aWR0aDphdXRvO21hcmdpbjoxMHB4fS5tb2RhbC1jb250ZW50e3Bvc2l0aW9uOnJlbGF0aXZlO2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICM5OTk7Ym9yZGVyOjFweCBzb2xpZCByZ2JhKDAsMCwwLC4yKTtib3JkZXItcmFkaXVzOjZweDstd2Via2l0LWJveC1zaGFkb3c6MCAzcHggOXB4IHJnYmEoMCwwLDAsLjUpO2JveC1zaGFkb3c6MCAzcHggOXB4IHJnYmEoMCwwLDAsLjUpO2JhY2tncm91bmQtY2xpcDpwYWRkaW5nLWJveDtvdXRsaW5lOjB9Lm1vZGFsLWJhY2tkcm9we3Bvc2l0aW9uOmZpeGVkO3RvcDowO3JpZ2h0OjA7Ym90dG9tOjA7bGVmdDowO3otaW5kZXg6MTA0MDtiYWNrZ3JvdW5kLWNvbG9yOiMwMDB9Lm1vZGFsLWJhY2tkcm9wLmZhZGV7b3BhY2l0eTowO2ZpbHRlcjphbHBoYShvcGFjaXR5PTApfS5tb2RhbC1iYWNrZHJvcC5pbntvcGFjaXR5Oi41O2ZpbHRlcjphbHBoYShvcGFjaXR5PTUwKX0ubW9kYWwtaGVhZGVye3BhZGRpbmc6MTVweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZTVlNWU1O21pbi1oZWlnaHQ6MTYuNDI4NTcxNDNweH0ubW9kYWwtaGVhZGVyIC5jbG9zZXttYXJnaW4tdG9wOi0ycHh9Lm1vZGFsLXRpdGxle21hcmdpbjowO2xpbmUtaGVpZ2h0OjEuNDI4NTcxNDN9Lm1vZGFsLWJvZHl7cG9zaXRpb246cmVsYXRpdmU7cGFkZGluZzoyMHB4fS5tb2RhbC1mb290ZXJ7bWFyZ2luLXRvcDoxNXB4O3BhZGRpbmc6MTlweCAyMHB4IDIwcHg7dGV4dC1hbGlnbjpyaWdodDtib3JkZXItdG9wOjFweCBzb2xpZCAjZTVlNWU1fS5tb2RhbC1mb290ZXIgLmJ0bisuYnRue21hcmdpbi1sZWZ0OjVweDttYXJnaW4tYm90dG9tOjB9Lm1vZGFsLWZvb3RlciAuYnRuLWdyb3VwIC5idG4rLmJ0bnttYXJnaW4tbGVmdDotMXB4fS5tb2RhbC1mb290ZXIgLmJ0bi1ibG9jaysuYnRuLWJsb2Nre21hcmdpbi1sZWZ0OjB9QG1lZGlhIChtaW4td2lkdGg6NzY4cHgpey5tb2RhbC1kaWFsb2d7d2lkdGg6NjAwcHg7bWFyZ2luOjMwcHggYXV0b30ubW9kYWwtY29udGVudHstd2Via2l0LWJveC1zaGFkb3c6MCA1cHggMTVweCByZ2JhKDAsMCwwLC41KTtib3gtc2hhZG93OjAgNXB4IDE1cHggcmdiYSgwLDAsMCwuNSl9Lm1vZGFsLXNte3dpZHRoOjMwMHB4fX1AbWVkaWEgKG1pbi13aWR0aDo5OTJweCl7Lm1vZGFsLWxne3dpZHRoOjkwMHB4fX0udG9vbHRpcHtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjEwMzA7ZGlzcGxheTpibG9jazt2aXNpYmlsaXR5OnZpc2libGU7Zm9udC1zaXplOjEycHg7bGluZS1oZWlnaHQ6MS40O29wYWNpdHk6MDtmaWx0ZXI6YWxwaGEob3BhY2l0eT0wKX0udG9vbHRpcC5pbntvcGFjaXR5Oi45O2ZpbHRlcjphbHBoYShvcGFjaXR5PTkwKX0udG9vbHRpcC50b3B7bWFyZ2luLXRvcDotM3B4O3BhZGRpbmc6NXB4IDB9LnRvb2x0aXAucmlnaHR7bWFyZ2luLWxlZnQ6M3B4O3BhZGRpbmc6MCA1cHh9LnRvb2x0aXAuYm90dG9te21hcmdpbi10b3A6M3B4O3BhZGRpbmc6NXB4IDB9LnRvb2x0aXAubGVmdHttYXJnaW4tbGVmdDotM3B4O3BhZGRpbmc6MCA1cHh9LnRvb2x0aXAtaW5uZXJ7bWF4LXdpZHRoOjIwMHB4O3BhZGRpbmc6M3B4IDhweDtjb2xvcjojZmZmO3RleHQtYWxpZ246Y2VudGVyO3RleHQtZGVjb3JhdGlvbjpub25lO2JhY2tncm91bmQtY29sb3I6IzAwMDtib3JkZXItcmFkaXVzOjRweH0udG9vbHRpcC1hcnJvd3twb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDowO2hlaWdodDowO2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItc3R5bGU6c29saWR9LnRvb2x0aXAudG9wIC50b29sdGlwLWFycm93e2JvdHRvbTowO2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi01cHg7Ym9yZGVyLXdpZHRoOjVweCA1cHggMDtib3JkZXItdG9wLWNvbG9yOiMwMDB9LnRvb2x0aXAudG9wLWxlZnQgLnRvb2x0aXAtYXJyb3d7Ym90dG9tOjA7bGVmdDo1cHg7Ym9yZGVyLXdpZHRoOjVweCA1cHggMDtib3JkZXItdG9wLWNvbG9yOiMwMDB9LnRvb2x0aXAudG9wLXJpZ2h0IC50b29sdGlwLWFycm93e2JvdHRvbTowO3JpZ2h0OjVweDtib3JkZXItd2lkdGg6NXB4IDVweCAwO2JvcmRlci10b3AtY29sb3I6IzAwMH0udG9vbHRpcC5yaWdodCAudG9vbHRpcC1hcnJvd3t0b3A6NTAlO2xlZnQ6MDttYXJnaW4tdG9wOi01cHg7Ym9yZGVyLXdpZHRoOjVweCA1cHggNXB4IDA7Ym9yZGVyLXJpZ2h0LWNvbG9yOiMwMDB9LnRvb2x0aXAubGVmdCAudG9vbHRpcC1hcnJvd3t0b3A6NTAlO3JpZ2h0OjA7bWFyZ2luLXRvcDotNXB4O2JvcmRlci13aWR0aDo1cHggMCA1cHggNXB4O2JvcmRlci1sZWZ0LWNvbG9yOiMwMDB9LnRvb2x0aXAuYm90dG9tIC50b29sdGlwLWFycm93e3RvcDowO2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi01cHg7Ym9yZGVyLXdpZHRoOjAgNXB4IDVweDtib3JkZXItYm90dG9tLWNvbG9yOiMwMDB9LnRvb2x0aXAuYm90dG9tLWxlZnQgLnRvb2x0aXAtYXJyb3d7dG9wOjA7bGVmdDo1cHg7Ym9yZGVyLXdpZHRoOjAgNXB4IDVweDtib3JkZXItYm90dG9tLWNvbG9yOiMwMDB9LnRvb2x0aXAuYm90dG9tLXJpZ2h0IC50b29sdGlwLWFycm93e3RvcDowO3JpZ2h0OjVweDtib3JkZXItd2lkdGg6MCA1cHggNXB4O2JvcmRlci1ib3R0b20tY29sb3I6IzAwMH0ucG9wb3Zlcntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDtsZWZ0OjA7ei1pbmRleDoxMDEwO2Rpc3BsYXk6bm9uZTttYXgtd2lkdGg6Mjc2cHg7cGFkZGluZzoxcHg7dGV4dC1hbGlnbjpsZWZ0O2JhY2tncm91bmQtY29sb3I6I2ZmZjtiYWNrZ3JvdW5kLWNsaXA6cGFkZGluZy1ib3g7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO2JvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwuMik7Ym9yZGVyLXJhZGl1czo2cHg7LXdlYmtpdC1ib3gtc2hhZG93OjAgNXB4IDEwcHggcmdiYSgwLDAsMCwuMik7Ym94LXNoYWRvdzowIDVweCAxMHB4IHJnYmEoMCwwLDAsLjIpO3doaXRlLXNwYWNlOm5vcm1hbH0ucG9wb3Zlci50b3B7bWFyZ2luLXRvcDotMTBweH0ucG9wb3Zlci5yaWdodHttYXJnaW4tbGVmdDoxMHB4fS5wb3BvdmVyLmJvdHRvbXttYXJnaW4tdG9wOjEwcHh9LnBvcG92ZXIubGVmdHttYXJnaW4tbGVmdDotMTBweH0ucG9wb3Zlci10aXRsZXttYXJnaW46MDtwYWRkaW5nOjhweCAxNHB4O2ZvbnQtc2l6ZToxNHB4O2ZvbnQtd2VpZ2h0OjQwMDtsaW5lLWhlaWdodDoxOHB4O2JhY2tncm91bmQtY29sb3I6I2Y3ZjdmNztib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWJlYmViO2JvcmRlci1yYWRpdXM6NXB4IDVweCAwIDB9LnBvcG92ZXItY29udGVudHtwYWRkaW5nOjlweCAxNHB4fS5wb3BvdmVyPi5hcnJvdywucG9wb3Zlcj4uYXJyb3c6YWZ0ZXJ7cG9zaXRpb246YWJzb2x1dGU7ZGlzcGxheTpibG9jazt3aWR0aDowO2hlaWdodDowO2JvcmRlci1jb2xvcjp0cmFuc3BhcmVudDtib3JkZXItc3R5bGU6c29saWR9LnBvcG92ZXI+LmFycm93e2JvcmRlci13aWR0aDoxMXB4fS5wb3BvdmVyPi5hcnJvdzphZnRlcntib3JkZXItd2lkdGg6MTBweDtjb250ZW50OiIifS5wb3BvdmVyLnRvcD4uYXJyb3d7bGVmdDo1MCU7bWFyZ2luLWxlZnQ6LTExcHg7Ym9yZGVyLWJvdHRvbS13aWR0aDowO2JvcmRlci10b3AtY29sb3I6Izk5OTtib3JkZXItdG9wLWNvbG9yOnJnYmEoMCwwLDAsLjI1KTtib3R0b206LTExcHh9LnBvcG92ZXIudG9wPi5hcnJvdzphZnRlcntjb250ZW50OiIgIjtib3R0b206MXB4O21hcmdpbi1sZWZ0Oi0xMHB4O2JvcmRlci1ib3R0b20td2lkdGg6MDtib3JkZXItdG9wLWNvbG9yOiNmZmZ9LnBvcG92ZXIucmlnaHQ+LmFycm93e3RvcDo1MCU7bGVmdDotMTFweDttYXJnaW4tdG9wOi0xMXB4O2JvcmRlci1sZWZ0LXdpZHRoOjA7Ym9yZGVyLXJpZ2h0LWNvbG9yOiM5OTk7Ym9yZGVyLXJpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsLjI1KX0ucG9wb3Zlci5yaWdodD4uYXJyb3c6YWZ0ZXJ7Y29udGVudDoiICI7bGVmdDoxcHg7Ym90dG9tOi0xMHB4O2JvcmRlci1sZWZ0LXdpZHRoOjA7Ym9yZGVyLXJpZ2h0LWNvbG9yOiNmZmZ9LnBvcG92ZXIuYm90dG9tPi5hcnJvd3tsZWZ0OjUwJTttYXJnaW4tbGVmdDotMTFweDtib3JkZXItdG9wLXdpZHRoOjA7Ym9yZGVyLWJvdHRvbS1jb2xvcjojOTk5O2JvcmRlci1ib3R0b20tY29sb3I6cmdiYSgwLDAsMCwuMjUpO3RvcDotMTFweH0ucG9wb3Zlci5ib3R0b20+LmFycm93OmFmdGVye2NvbnRlbnQ6IiAiO3RvcDoxcHg7bWFyZ2luLWxlZnQ6LTEwcHg7Ym9yZGVyLXRvcC13aWR0aDowO2JvcmRlci1ib3R0b20tY29sb3I6I2ZmZn0ucG9wb3Zlci5sZWZ0Pi5hcnJvd3t0b3A6NTAlO3JpZ2h0Oi0xMXB4O21hcmdpbi10b3A6LTExcHg7Ym9yZGVyLXJpZ2h0LXdpZHRoOjA7Ym9yZGVyLWxlZnQtY29sb3I6Izk5OTtib3JkZXItbGVmdC1jb2xvcjpyZ2JhKDAsMCwwLC4yNSl9LnBvcG92ZXIubGVmdD4uYXJyb3c6YWZ0ZXJ7Y29udGVudDoiICI7cmlnaHQ6MXB4O2JvcmRlci1yaWdodC13aWR0aDowO2JvcmRlci1sZWZ0LWNvbG9yOiNmZmY7Ym90dG9tOi0xMHB4fS5jYXJvdXNlbHtwb3NpdGlvbjpyZWxhdGl2ZX0uY2Fyb3VzZWwtaW5uZXJ7cG9zaXRpb246cmVsYXRpdmU7b3ZlcmZsb3c6aGlkZGVuO3dpZHRoOjEwMCV9LmNhcm91c2VsLWlubmVyPi5pdGVte2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZTstd2Via2l0LXRyYW5zaXRpb246LjZzIGVhc2UtaW4tb3V0IGxlZnQ7dHJhbnNpdGlvbjouNnMgZWFzZS1pbi1vdXQgbGVmdH0uY2Fyb3VzZWwtaW5uZXI+Lml0ZW0+aW1nLC5jYXJvdXNlbC1pbm5lcj4uaXRlbT5hPmltZ3tsaW5lLWhlaWdodDoxfS5jYXJvdXNlbC1pbm5lcj4uYWN0aXZlLC5jYXJvdXNlbC1pbm5lcj4ubmV4dCwuY2Fyb3VzZWwtaW5uZXI+LnByZXZ7ZGlzcGxheTpibG9ja30uY2Fyb3VzZWwtaW5uZXI+LmFjdGl2ZXtsZWZ0OjB9LmNhcm91c2VsLWlubmVyPi5uZXh0LC5jYXJvdXNlbC1pbm5lcj4ucHJldntwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt3aWR0aDoxMDAlfS5jYXJvdXNlbC1pbm5lcj4ubmV4dHtsZWZ0OjEwMCV9LmNhcm91c2VsLWlubmVyPi5wcmV2e2xlZnQ6LTEwMCV9LmNhcm91c2VsLWlubmVyPi5uZXh0LmxlZnQsLmNhcm91c2VsLWlubmVyPi5wcmV2LnJpZ2h0e2xlZnQ6MH0uY2Fyb3VzZWwtaW5uZXI+LmFjdGl2ZS5sZWZ0e2xlZnQ6LTEwMCV9LmNhcm91c2VsLWlubmVyPi5hY3RpdmUucmlnaHR7bGVmdDoxMDAlfS5jYXJvdXNlbC1jb250cm9se3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6MDtib3R0b206MDt3aWR0aDoxNSU7b3BhY2l0eTouNTtmaWx0ZXI6YWxwaGEob3BhY2l0eT01MCk7Zm9udC1zaXplOjIwcHg7Y29sb3I6I2ZmZjt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LXNoYWRvdzowIDFweCAycHggcmdiYSgwLDAsMCwuNil9LmNhcm91c2VsLWNvbnRyb2wubGVmdHtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsY29sb3Itc3RvcChyZ2JhKDAsMCwwLC41KSAwKSxjb2xvci1zdG9wKHJnYmEoMCwwLDAsLjAwMDEpIDEwMCUpKTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0byByaWdodCxyZ2JhKDAsMCwwLC41KSAwLHJnYmEoMCwwLDAsLjAwMDEpIDEwMCUpO2JhY2tncm91bmQtcmVwZWF0OnJlcGVhdC14O2ZpbHRlcjpwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvcnN0cj0nIzgwMDAwMDAwJywgZW5kQ29sb3JzdHI9JyMwMDAwMDAwMCcsIEdyYWRpZW50VHlwZT0xKX0uY2Fyb3VzZWwtY29udHJvbC5yaWdodHtsZWZ0OmF1dG87cmlnaHQ6MDtiYWNrZ3JvdW5kLWltYWdlOi13ZWJraXQtbGluZWFyLWdyYWRpZW50KGxlZnQsY29sb3Itc3RvcChyZ2JhKDAsMCwwLC4wMDAxKSAwKSxjb2xvci1zdG9wKHJnYmEoMCwwLDAsLjUpIDEwMCUpKTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0byByaWdodCxyZ2JhKDAsMCwwLC4wMDAxKSAwLHJnYmEoMCwwLDAsLjUpIDEwMCUpO2JhY2tncm91bmQtcmVwZWF0OnJlcGVhdC14O2ZpbHRlcjpwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvcnN0cj0nIzAwMDAwMDAwJywgZW5kQ29sb3JzdHI9JyM4MDAwMDAwMCcsIEdyYWRpZW50VHlwZT0xKX0uY2Fyb3VzZWwtY29udHJvbDpob3ZlciwuY2Fyb3VzZWwtY29udHJvbDpmb2N1c3tvdXRsaW5lOjA7Y29sb3I6I2ZmZjt0ZXh0LWRlY29yYXRpb246bm9uZTtvcGFjaXR5Oi45O2ZpbHRlcjphbHBoYShvcGFjaXR5PTkwKX0uY2Fyb3VzZWwtY29udHJvbCAuaWNvbi1wcmV2LC5jYXJvdXNlbC1jb250cm9sIC5pY29uLW5leHQsLmNhcm91c2VsLWNvbnRyb2wgLmdseXBoaWNvbi1jaGV2cm9uLWxlZnQsLmNhcm91c2VsLWNvbnRyb2wgLmdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0e3Bvc2l0aW9uOmFic29sdXRlO3RvcDo1MCU7ei1pbmRleDo1O2Rpc3BsYXk6aW5saW5lLWJsb2NrfS5jYXJvdXNlbC1jb250cm9sIC5pY29uLXByZXYsLmNhcm91c2VsLWNvbnRyb2wgLmdseXBoaWNvbi1jaGV2cm9uLWxlZnR7bGVmdDo1MCV9LmNhcm91c2VsLWNvbnRyb2wgLmljb24tbmV4dCwuY2Fyb3VzZWwtY29udHJvbCAuZ2x5cGhpY29uLWNoZXZyb24tcmlnaHR7cmlnaHQ6NTAlfS5jYXJvdXNlbC1jb250cm9sIC5pY29uLXByZXYsLmNhcm91c2VsLWNvbnRyb2wgLmljb24tbmV4dHt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O21hcmdpbi10b3A6LTEwcHg7bWFyZ2luLWxlZnQ6LTEwcHg7Zm9udC1mYW1pbHk6c2VyaWZ9LmNhcm91c2VsLWNvbnRyb2wgLmljb24tcHJldjpiZWZvcmV7Y29udGVudDonXDIwMzknfS5jYXJvdXNlbC1jb250cm9sIC5pY29uLW5leHQ6YmVmb3Jle2NvbnRlbnQ6J1wyMDNhJ30uY2Fyb3VzZWwtaW5kaWNhdG9yc3twb3NpdGlvbjphYnNvbHV0ZTtib3R0b206MTBweDtsZWZ0OjUwJTt6LWluZGV4OjE1O3dpZHRoOjYwJTttYXJnaW4tbGVmdDotMzAlO3BhZGRpbmctbGVmdDowO2xpc3Qtc3R5bGU6bm9uZTt0ZXh0LWFsaWduOmNlbnRlcn0uY2Fyb3VzZWwtaW5kaWNhdG9ycyBsaXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxMHB4O2hlaWdodDoxMHB4O21hcmdpbjoxcHg7dGV4dC1pbmRlbnQ6LTk5OXB4O2JvcmRlcjoxcHggc29saWQgI2ZmZjtib3JkZXItcmFkaXVzOjEwcHg7Y3Vyc29yOnBvaW50ZXI7YmFja2dyb3VuZC1jb2xvcjojMDAwIFw5O2JhY2tncm91bmQtY29sb3I6cmdiYSgwLDAsMCwwKX0uY2Fyb3VzZWwtaW5kaWNhdG9ycyAuYWN0aXZle21hcmdpbjowO3dpZHRoOjEycHg7aGVpZ2h0OjEycHg7YmFja2dyb3VuZC1jb2xvcjojZmZmfS5jYXJvdXNlbC1jYXB0aW9ue3Bvc2l0aW9uOmFic29sdXRlO2xlZnQ6MTUlO3JpZ2h0OjE1JTtib3R0b206MjBweDt6LWluZGV4OjEwO3BhZGRpbmctdG9wOjIwcHg7cGFkZGluZy1ib3R0b206MjBweDtjb2xvcjojZmZmO3RleHQtYWxpZ246Y2VudGVyO3RleHQtc2hhZG93OjAgMXB4IDJweCByZ2JhKDAsMCwwLC42KX0uY2Fyb3VzZWwtY2FwdGlvbiAuYnRue3RleHQtc2hhZG93Om5vbmV9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo3NjhweCl7LmNhcm91c2VsLWNvbnRyb2wgLmdseXBoaWNvbi1jaGV2cm9uLWxlZnQsLmNhcm91c2VsLWNvbnRyb2wgLmdseXBoaWNvbi1jaGV2cm9uLXJpZ2h0LC5jYXJvdXNlbC1jb250cm9sIC5pY29uLXByZXYsLmNhcm91c2VsLWNvbnRyb2wgLmljb24tbmV4dHt3aWR0aDozMHB4O2hlaWdodDozMHB4O21hcmdpbi10b3A6LTE1cHg7bWFyZ2luLWxlZnQ6LTE1cHg7Zm9udC1zaXplOjMwcHh9LmNhcm91c2VsLWNhcHRpb257bGVmdDoyMCU7cmlnaHQ6MjAlO3BhZGRpbmctYm90dG9tOjMwcHh9LmNhcm91c2VsLWluZGljYXRvcnN7Ym90dG9tOjIwcHh9fS5jbGVhcmZpeDpiZWZvcmUsLmNsZWFyZml4OmFmdGVyLC5jb250YWluZXI6YmVmb3JlLC5jb250YWluZXI6YWZ0ZXIsLmNvbnRhaW5lci1mbHVpZDpiZWZvcmUsLmNvbnRhaW5lci1mbHVpZDphZnRlciwucm93OmJlZm9yZSwucm93OmFmdGVyLC5mb3JtLWhvcml6b250YWwgLmZvcm0tZ3JvdXA6YmVmb3JlLC5mb3JtLWhvcml6b250YWwgLmZvcm0tZ3JvdXA6YWZ0ZXIsLmJ0bi10b29sYmFyOmJlZm9yZSwuYnRuLXRvb2xiYXI6YWZ0ZXIsLmJ0bi1ncm91cC12ZXJ0aWNhbD4uYnRuLWdyb3VwOmJlZm9yZSwuYnRuLWdyb3VwLXZlcnRpY2FsPi5idG4tZ3JvdXA6YWZ0ZXIsLm5hdjpiZWZvcmUsLm5hdjphZnRlciwubmF2YmFyOmJlZm9yZSwubmF2YmFyOmFmdGVyLC5uYXZiYXItaGVhZGVyOmJlZm9yZSwubmF2YmFyLWhlYWRlcjphZnRlciwubmF2YmFyLWNvbGxhcHNlOmJlZm9yZSwubmF2YmFyLWNvbGxhcHNlOmFmdGVyLC5wYWdlcjpiZWZvcmUsLnBhZ2VyOmFmdGVyLC5wYW5lbC1ib2R5OmJlZm9yZSwucGFuZWwtYm9keTphZnRlciwubW9kYWwtZm9vdGVyOmJlZm9yZSwubW9kYWwtZm9vdGVyOmFmdGVye2NvbnRlbnQ6IiAiO2Rpc3BsYXk6dGFibGV9LmNsZWFyZml4OmFmdGVyLC5jb250YWluZXI6YWZ0ZXIsLmNvbnRhaW5lci1mbHVpZDphZnRlciwucm93OmFmdGVyLC5mb3JtLWhvcml6b250YWwgLmZvcm0tZ3JvdXA6YWZ0ZXIsLmJ0bi10b29sYmFyOmFmdGVyLC5idG4tZ3JvdXAtdmVydGljYWw+LmJ0bi1ncm91cDphZnRlciwubmF2OmFmdGVyLC5uYXZiYXI6YWZ0ZXIsLm5hdmJhci1oZWFkZXI6YWZ0ZXIsLm5hdmJhci1jb2xsYXBzZTphZnRlciwucGFnZXI6YWZ0ZXIsLnBhbmVsLWJvZHk6YWZ0ZXIsLm1vZGFsLWZvb3RlcjphZnRlcntjbGVhcjpib3RofS5jZW50ZXItYmxvY2t7ZGlzcGxheTpibG9jazttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfS5wdWxsLXJpZ2h0e2Zsb2F0OnJpZ2h0IWltcG9ydGFudH0ucHVsbC1sZWZ0e2Zsb2F0OmxlZnQhaW1wb3J0YW50fS5oaWRle2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9LnNob3d7ZGlzcGxheTpibG9jayFpbXBvcnRhbnR9LmludmlzaWJsZXt2aXNpYmlsaXR5OmhpZGRlbn0udGV4dC1oaWRle2ZvbnQ6MC8wIGE7Y29sb3I6dHJhbnNwYXJlbnQ7dGV4dC1zaGFkb3c6bm9uZTtiYWNrZ3JvdW5kLWNvbG9yOnRyYW5zcGFyZW50O2JvcmRlcjowfS5oaWRkZW57ZGlzcGxheTpub25lIWltcG9ydGFudDt2aXNpYmlsaXR5OmhpZGRlbiFpbXBvcnRhbnR9LmFmZml4e3Bvc2l0aW9uOmZpeGVkfUAtbXMtdmlld3BvcnR7d2lkdGg6ZGV2aWNlLXdpZHRofS52aXNpYmxlLXhzLC52aXNpYmxlLXNtLC52aXNpYmxlLW1kLC52aXNpYmxlLWxne2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9QG1lZGlhIChtYXgtd2lkdGg6NzY3cHgpey52aXNpYmxlLXhze2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50fXRhYmxlLnZpc2libGUteHN7ZGlzcGxheTp0YWJsZX10ci52aXNpYmxlLXhze2Rpc3BsYXk6dGFibGUtcm93IWltcG9ydGFudH10aC52aXNpYmxlLXhzLHRkLnZpc2libGUteHN7ZGlzcGxheTp0YWJsZS1jZWxsIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6NzY4cHgpIGFuZCAobWF4LXdpZHRoOjk5MXB4KXsudmlzaWJsZS1zbXtkaXNwbGF5OmJsb2NrIWltcG9ydGFudH10YWJsZS52aXNpYmxlLXNte2Rpc3BsYXk6dGFibGV9dHIudmlzaWJsZS1zbXtkaXNwbGF5OnRhYmxlLXJvdyFpbXBvcnRhbnR9dGgudmlzaWJsZS1zbSx0ZC52aXNpYmxlLXNte2Rpc3BsYXk6dGFibGUtY2VsbCFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjk5MnB4KSBhbmQgKG1heC13aWR0aDoxMTk5cHgpey52aXNpYmxlLW1ke2Rpc3BsYXk6YmxvY2shaW1wb3J0YW50fXRhYmxlLnZpc2libGUtbWR7ZGlzcGxheTp0YWJsZX10ci52aXNpYmxlLW1ke2Rpc3BsYXk6dGFibGUtcm93IWltcG9ydGFudH10aC52aXNpYmxlLW1kLHRkLnZpc2libGUtbWR7ZGlzcGxheTp0YWJsZS1jZWxsIWltcG9ydGFudH19QG1lZGlhIChtaW4td2lkdGg6MTIwMHB4KXsudmlzaWJsZS1sZ3tkaXNwbGF5OmJsb2NrIWltcG9ydGFudH10YWJsZS52aXNpYmxlLWxne2Rpc3BsYXk6dGFibGV9dHIudmlzaWJsZS1sZ3tkaXNwbGF5OnRhYmxlLXJvdyFpbXBvcnRhbnR9dGgudmlzaWJsZS1sZyx0ZC52aXNpYmxlLWxne2Rpc3BsYXk6dGFibGUtY2VsbCFpbXBvcnRhbnR9fUBtZWRpYSAobWF4LXdpZHRoOjc2N3B4KXsuaGlkZGVuLXhze2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjc2OHB4KSBhbmQgKG1heC13aWR0aDo5OTFweCl7LmhpZGRlbi1zbXtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX1AbWVkaWEgKG1pbi13aWR0aDo5OTJweCkgYW5kIChtYXgtd2lkdGg6MTE5OXB4KXsuaGlkZGVuLW1ke2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fUBtZWRpYSAobWluLXdpZHRoOjEyMDBweCl7LmhpZGRlbi1sZ3tkaXNwbGF5Om5vbmUhaW1wb3J0YW50fX0udmlzaWJsZS1wcmludHtkaXNwbGF5Om5vbmUhaW1wb3J0YW50fUBtZWRpYSBwcmludHsudmlzaWJsZS1wcmludHtkaXNwbGF5OmJsb2NrIWltcG9ydGFudH10YWJsZS52aXNpYmxlLXByaW50e2Rpc3BsYXk6dGFibGV9dHIudmlzaWJsZS1wcmludHtkaXNwbGF5OnRhYmxlLXJvdyFpbXBvcnRhbnR9dGgudmlzaWJsZS1wcmludCx0ZC52aXNpYmxlLXByaW50e2Rpc3BsYXk6dGFibGUtY2VsbCFpbXBvcnRhbnR9fUBtZWRpYSBwcmludHsuaGlkZGVuLXByaW50e2Rpc3BsYXk6bm9uZSFpbXBvcnRhbnR9fQ==";
        var editorCss = "QGZvbnQtZmFjZXtmb250LWZhbWlseTonV3lzaUJCaWNvbkZvbnQnO3NyYzp1cmwoJy4uL2ZvbnRzL3d5c2liYmljb25mb250LXdiLmVvdCcpO31AZm9udC1mYWNle2ZvbnQtZmFtaWx5OidXeXNpQkJpY29uRm9udCc7c3JjOnVybChkYXRhOmFwcGxpY2F0aW9uL3gtZm9udC13b2ZmO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGQwOUdSZ0FCQUFBQUFCSjhBQkVBQUFBQUdtQUFBUUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFCR1JsUk5BQUFCZ0FBQUFCb0FBQUFjWmliRVdrZEVSVVlBQUFHY0FBQUFIUUFBQUNBQVN3QUVUMU12TWdBQUFid0FBQUJHQUFBQVZtTmo3ZVpqYldGd0FBQUNCQUFBQUUwQUFBRmFBRFhVREdOMmRDQUFBQUpVQUFBQUFnQUFBQUlBQUFBQVpuQm5iUUFBQWxnQUFBR3hBQUFDWlZPMEw2ZG5ZWE53QUFBRURBQUFBQWdBQUFBSUFBQUFFR2RzZVdZQUFBUVVBQUFMN0FBQUVMQlVtaHk5YUdWaFpBQUFFQUFBQUFBdkFBQUFOZ0VjYkUxb2FHVmhBQUFRTUFBQUFDQUFBQUFrRHRFQWFHaHRkSGdBQUJCUUFBQUFUd0FBQUhqVjd4OVRiRzlqWVFBQUVLQUFBQUErQUFBQVBqK3lPM0p0WVhod0FBQVE0QUFBQUNBQUFBQWdBVHdCSEc1aGJXVUFBQkVBQUFBQXZ3QUFBWW9kb1RrOWNHOXpkQUFBRWNBQUFBQ0VBQUFCTnRMNER5eHdjbVZ3QUFBU1JBQUFBQzRBQUFBdXNQSXJGSGRsWW1ZQUFCSjBBQUFBQmdBQUFBYmdXMURPZU5wallHQmdaQUNDTTdhTHpvUHBMeE0yUXVtYkFGVzVDS1lBQUhqYVkyQmtZR0RnQTJJSkJoQmdZbUFFUWxrZ1pnSHpHQUFGaVFCUUFBQUFlTnBqWUdTL3pUaUJnWldCaFZXZmRUb0RBNk1jaEdhK3hwRE1KTURBd01UQXlzd0FCd0lJSmtOQW1tc0tnd01EN3djR3RuUC96akVBU2Nhb0JxQUJJRGtBdjE0TGtRQUFlTnBqWUdCZ1pvQmdHUVpHQmhBSUFmSVl3WHdXQmdzZ3pjWEF3Y0FFaEF3TXZBOGtQakQ4L3c5V3hmdUFBY0wrLzAyQlJVQVdxaGNLR05rWTRBS01URkR6VVJRd0RIc0FBSk52Q3c0QUFBQUFBQUFBZU5wZFVidE9XMEVRM1EwUEE0SEUyQ0E1MmhTem1aREdlNkVGQ2NUVmpXSmtPNFhsQ0drM2NwR0xjUUVmUUlGRURkcXZHYUNocEVpYkJpRVhTSHhDUGlFU00ydUlvalE3TzdOenpwa3pTOHFScW5mcGE4OVQ1eVNRd3QwR3pUYjlUa2kxc3dEM3BPdnJqWXkwZ3dkYWJHYjB5blg3L2dzR205R1VPMm9BNVQxdktROFpUVHVCV3JTbi90SDhDb2I3L0Ivek94aTBOTlAwMURvSjZTRUU1cHR4UzRQdkdjMjZ5dy82Z3RYaFlqQXdwSmltNGk0L3BsTCt0elRuYXN1d3RaSFJ2SU16RWZuSk5FQlRhMjBFbXY3VUlkWHpjUlJMa011bXNUYVltTEwrSkJQQmhjbDBWVk8xelBqYXdWMnlzK2hnZ3lyTmdRZll3MVo1REI0T0R5WVUwcmNreWl3TkVmWmlxOFFJRVpNY0NqbmwzTW4rcEVENVNCTEd2RWxLTytPR3RRYkdrZGZBb0RaUHMvODhtMDF0YngzQytGa2N3WGUvR1VzNitNaUcyaGdSWWp0aUtZQUpSRUpHVmZtR0dzKzlMQWJrVXZ2UFFKU0E1ZkdQZjUwSXRPN1lSRHlYdFhVT01WWUllbjdiM1BMTGlydFd1YzZMUW5kdnFtcW8waW5OKzE3T3ZzY0RuaDRMdzBGandadlArLzVLZ2ZvOExLNDBhQTRFUTNvM2V2K2l0ZXFJcTd3WFBySW4wNyt4V2dBQUFBQUJBQUgvL3dBUGVOcTlWMzlzRzlkOWY5ODczbEU4L1RnZWVTUjFsa2o1N2lTZUZFays2eWlTVmlrN0RCekZMWk5GZGsyalVac0ltemtrQ3VxMHNJRTZnNmtoUHhaNWdGUE02NkJnbFZFWXFRMDBHVllQNytodStTTXVKZ09SQnFnNE4wVmJJVzVXRjJtd3pGdlFGdWlQMkkzRTUzMGY1YnBlV25UYlB4UDBlTzk5M3lQZjkrZm44ejBDNUs2L01VSUEzaVUxK2FBa2tpR1NJWFRJcFZKQVRZOTJ1YlFuUitNQjBIdGNmeGlHeWM2eC91eTlVQ2lCVnloQ0lUc01GcTV5UStBbFZaQnhGUVlaOTFUUTdTR0E2eEVwSXFtVjJZSUJHVFZqelJtU0lobFFnd2RVRldkNjVaakRmdXc4VzlYbGlNR2VZYlFtS1k0Nk1pME9sVDExUkZFVVN6Mit1WDVjdDFSQ0JEaDJLeVMvZ2ZxSjVPUGtXZEpBdFllcEdORGRMazBIZEovYjZCcndjcmtjRFFkMDJBUDZDWmZ1WGFkNjBORDNLc01YeTNwSFpMaXhWK2ZUdldKa21JWThxa2Q5QzRicFJOQ1lzTGg4UWtDNTZ6V3NDYjZ5QmlQRGZnV0dmVXZYWWpRelFmeDlhUzNXNkNudW5aaVkyRGttbVFsVHk0OXp1OU9nYzdObGZNYjFWRVlzNUx4aXdSR3p0bVB0aHZHY21idHpJaEVOeTJIWnNaeXNreFcxY1pUQk1lbVRILzZERGtYUVZiVThLMGxLU1I4dE9kUEt5R1FOSkxVd3BpandnSzhycFNsVmt2UjYvWHJqeUZMWmdjS01tcmttWFhFVVpVUXBPeGVlbXJsRlpzcTZJVW5TYUhWQk9EUWxvVnkxMUxKeGczMHc5KzdzTERpbHMxVzg1TGtxeHJtQmNYNEIvWGd2aHAwYUx2cUlidmRveEtYRE9UcUpjUzY3L24wWVp6K0NobDhrWXE3UW41cWdreHJkZzJhRDNBZG9YUkhEcjZFSGt1RWtEem5heDgxMDh0d2taMUxJbTNsVHkzbXBES1NTdWFMblpGM0kyaVk2QUJxU1lpdlMySkdwQ3daN0F5WlI0Y0YwV1ZGQnZhRkRWN2tFTU1uZUdGMHBPUThxaXBSR2s1TkpTZG40amlMWjRzdm9HNldXMXRsZlhWN1JNOVowV2xXczZiSmhIQis3RE1jeTZzT0dpczc0MHQ4WXhnV2VLNnUzbmdodlNHMmtuV3duQjBpamwrZks5b0QydURRYTBKaExFd0ZtQUZEVHBSM3JEYmt0NW5rZTdRMW9iOVNQWWtwMEJ6VHQ4ZVFnZmsrdkZ2TWxjV0xDajBWeEpnczgrQkVoRllGaUJKeUlNQW41WE43ZXVSdk10REFNaVZ3YVRGaUZGOW1KRlRnSko5ZFlIUmJXMkFsMlF2ek81aWFjbVQyN3lSNFA3V0ZmNFBzTHJMNjJkZWdFbk56NG5ER1lucDgrZVBoQ2ZhNHlUVm8ya0xud2hud3YybUNSaHdqdGNHbGZRRE11MVFJYWQxRkhvTFpMTzduNmNhNCtidlpGZlEzVjcrRUI5ZnU1K24wZHFIUWJRZlcxRE03YUl4OVJYN3V0Zng2ZmR5ejR3d2I4WHZVWmhhanUyUFdLVkZacnI5NDJnWVRJVTBRS3IwbC9nalViSmgwa1FRWUlUZkFZQUUyNnRHdWR4Z0xhNGZrcHJtbzBjVWZCb3FtWktSeW9ZeEhJZU1GTEpuVFplaXI4Mk0zelMzTDIxOWVLTUEvVlRXaXdFMCtmUDNyMHZDUTllbjdqWndXeG44WGZiYjRuUEgvdTZhZW5xOGZ4ZnBFY0l5dmhsZERMZUxOQlhQSVlvYUpMUjNLMExhRGJQSzVDS3FDcVM2MGNMNElzSnNST2w4STZiUTlvZTlUUG9DdnZDZnd4eElCTXV4Yjd4M0EwMmIzTnhtSWdmcklOZFlWNzBLMXFDbWRraUdzZGk4WnlKb0tpYVdXeDdnczVjd2RnMHFOZkV4S0tVWVExc0Fmd1NDd3E0RWIyMk9JVGNLaFN6elIvWlJjS3R0Q2VxVmZZMzg5QlFteXl1dEJ1RjRwVzgxY29nK3JjNHVJYyszcGxYbnllSFdidkxNNlhCajl3SnV1THphOWR2WHIwOXB6OXVMWEY4NGJVQ1FsL1dYcWNwRWlhYUtRUng5d0h6QnUvcndYZThVSVJsZWlYdkdRcUpuWkIyREszMnp2QUVhUUNaUHVkdWpKb0hLNEpONFhFOFdQZHM3UEcwZU0yeXplSEszTzFkRVVNejhKeWpTMVZ4Yjk4ZGFFMkxVbXp4NW5Kc3ZVWlNhb2VBZjNjRkJRcm15VWVkNW1NM0hvRjQvNW9LKzd0UkNWeDFLWk1LTUY2eTFFSWFLZEhRNWdIT1U0eW1rZmJFSVZ5TkJMUUJNYWcyNlZrM1ErMVlVNkxnUzhybnVjYkxkVlRtcW5CN1JHL2F6NEM5N0YvM2hvM3BNYy9QTE0xWnJoRTJBVlQ3SFdzVXB4dmZQR2praTFkSyt6RDhKb2NSNlNZSk5Qa0lQa1UrUXk1UkdqVVJkYWorMTE2SUtDQ2Q3SDd3UDYyVm1rZGlISWtxYnIwRVBMajluV043Z291OWgrcTRtWXhvSWVpZElUTG5JQSs0dEp5anM0RTlPR0FUbm4wUVpkK0hOUCtVWmVhNnhlSk52U0ovcFNIWDZYN0Fyb3I2dXM4eVFiUTRvNmdJWTk5RE91NW9YZTBlR3NiMHRCanVMdkxSUGJwN3RtTjdFTjE3V0txOTZFL3dsVDBPL1poL2tYdW44Q2tQTEFmaVNxQ2lWZ1lSd0pPSWlpSCtRY0hhQlRreHgyYlA3M2RZSXQ1THJDdC9EaW44VlRycU14cjM5TnQwSk81VnJyYW1tM3BDUE8yQlhmNXVtSmNOeHpER095K2JoZ3J4aE1HL3E4WTViTXJDTC9mYzNURE1LeFRLNGJCM2xJVlVGV2xjczB3RGg4MmhHMi9EY3RDelU0LzdSaTZVOC9ZdGRJWUhQWWNrTDg5TXplbVdycGhQVHRpR0xYRHdtVTlqYzBCdkZSalZ6YUdmamRxRXJsMDYyQzRqakVMWTI0WnhNU2VaYkZWMjJyQTB3ZFJCWkY5TU1jYmczNlB0cnZZRlBEK2hkYzJKbGtrNnZkZ2JXOEJwbzB6akpZVDlUdHhKZ1c4eC9GN0l1alZhQXhkM2FkOUl5eW8zUXIzdFdOcnNXL0lZbGVxblROaXArYkhFOXp2c1c3a3lWQmJKL0F6YVF6VFJZbDBSSERCSVFHejZxNGg2bmxUeit1aDdmMHhqbW9JYXYyM241ZmdodkFtM0dSdHpaM3NCV2dJZjRybzluRHpLNzc0TCt3OWRvVDllN3BhbjVtcHcrYk0vTUdEODZFZVBOVUdOL2szTmo3M203UHNZV0ViU0JLY1hsMFIrdWFyMWZtWm1kWW41NUl6WkVGK1BQUjUxTUVrWk1DRXZNYlJ5SklUbXA1RTF2MGR3Um5Rd2JZTWR0Q3diZU4xZVBITzByS00xeGZnRjNINE84T3l1OW1uREl2bC85dVN0SEQzTkJrTHZ5S05ZOVZiNUdQa1M0Umo3YTRjRDAvV285WnZtQXlyU1duaGNTaWdIbForaVZjKzdRd2FuWVRuZm1jOHdqL0QySloxUnYxdURJK0pGTjFpT2pQcUQrRzZFRFNHQ3Z6b2tNMlBEcmxZTEpNWXYrNU9qSitpSWo2YmhNZWpQVHZLUXphaytjNEloZ3daUmh0UG1WNDRvYVBOS1Uwdm1yeEhhNkcxbHVlZEhRNEp1enZUYzdSeEZMZjZPQytzOFNPbk04S1RLc1RaT3hsMHlwUnVORi9JQ0g4dTlMRy9oU2R4ZURvOHFFSTMrNkd1Q2s5bUlOMzhDNk1jZWw4QjZZaWliaVoxVUdzS3dESThkL2t5ZTJiNVJrMVZ4WitxeWhFcHNwSEFIbGVDT2V6TnJtQnZwclVZSzkyS0ZyWldaaTZ2N1JiTnRLaWxQb3AvY3cxNGxmOS9lT1lzdk1sMndwdW50aDYxRmJCWE45VHIxOVdOVmZiRE1haXlyOFAzb2N5VzJYQnIvZ01vc1JVZUsvZ1dHWk0vSzMzbE5sYjNFNDdNQ011STFRalVpTXdSckIxc1B0bzRML0lpUWZkeFVydURDdDhLdmJ6eFMvSFBtcjNDZm1IWEJ4ODBmdzJYMlAzaVEwSmY4NTFXSC9NUzJuUk80cit1b0VWVXhwOEtHbTB5RDFzYlJKQ2IybDIvby9XekE1aUlwbU9HNDZZSUw4RWxXSVJ2c21jbTJlSFNLWkFXYW5qTkh5OHZ3Mlc0d0hNTWhCMHdLRWRDZTVEeENINVAyQ0creldLaFBadi9pWGNLTzI0NWNrVCtBdTVKZkRjaWJtMnpPUHdFZmlwTWJyNGZtaEFUbSsvekhnVjlyc2hYUXUvYzRhcCtjdHYyTFQrMFBNQWQwSWwraUxxOHcrS3FjZy9jUGVaK0MzRjhLQ3NyTUxPNkNwOWVXNFBaMWRVL2VFL3J0Mi9mMDdyemYzSFB4cjVReDJhbitEYmVFOUpXVjltNXRUWDJ0Zi9obnYrN1BlTGJtd09oem8xZi9EL1k4MHUwWitEMzJBTXd4OTZUcjhqUGsxR3lrd0RkMGNJSXZBV2lmaTlDQUVLS0d2WGpPRXNHTkJuMXd6akxCcjY3bGFlNXFCUWE2RGRnZkFkMEFjZTJRbDdMYVhvWDdPQ0l0MGZJQ0NnVTVGQi9Wb0M1UlJnRUdRRFVwYXRYbDFaV0YvOTZiZTMwMGRldVhYdnQ2TkxQMlZ2c3JaOHZZVjk4N3NYNndtbllMelJQTFkrT0xwOXFwdXB6VDh3TCs1djAyZGNHQi8vcE9lRS9UbDg3V2l3ZXZYYTZLVjVpMzEyYW1scUMwUlltd285SVJYNUU2aVVPeVpQN3lVeXJFL1lDYmdEaW5oMVFPMG9GZE5VVSttMmREZ2EwNE5IQktEZUViZ3RvbVhjVmZZSC9BS0piZVJDSjNwdWdydWFuZXprRGxUd0V1VzNwb1VLTGRFQXY1ckM3UTFhUGhyc0EyVCtWd05lejdkajI1YU1EK2Y3aU9MNStEcUVVTkh4REU3Q3p0cTBzd3Q1NGNieklYOWtTMkFzNDhLT3V5WUtEcjF4U2VyQ3NRMXhJd09qSmNwVjlGUlE0TlhNZHZmR3ZLc0RsMDlWU3lUdFpueTVKMHdzbFIzOWtxaEg2TnhYc3FlclZOZmJLZlNNWjFUTEttYk1WZ0lQUzlOcjV5Z2lvbTU4Qk8yMmtxL2N0UGpKOUhPWVhscEgrQnpQTzJFeGxVaVZBQ0x2U1J1UXJ2S1lOZ0xiVzhpWjMzMzhCSjMyYmgzamFZMkJrWUdBQTRoUG56SFhpK1cyK01zaHpNSURBbVM4VGJpSG9mK2M0R05qT0Fia2NERXdnVVFCZy9neklBSGphWTJCa1lHQTc5MjhaQXdQbllnYUdId3djREF4QUVSUWdCd0J4ZndSRmVOcmpZSUFBeHZrTURFd3JHUmc0RnpNd2NEQXdQZ2JpSWlEZUJNVEhJSmdoRjRpTE9GZ1lxb0cwRGhCN0FmRWVvTndzSU4wUHBET0ErRFFRVCtWZ1lOS0RZTEFZT3I0UHNnOEFuOXNQS2dBQUFBQUFBQUFBQUFBQUFBZ0FXQUQ4QVc0QjBBSXlBbklDN0FNdUE0UUVYZ1QyQlM0RnlnWUVCalFHWUFadUJvUUd1QWJzQnlBSFZBZTRDRW9JV0FBQUFBRUFBQUFlQUZ3QUJnQUFBQUFBQWdBQkFBSUFGZ0FBQVFBQXZBQUFBQUI0Mm4yUXZRNEJRUlNGdjJVSmpWS2wyRm9RRnBFb1JYUWFCVFdDU0lSa1VlZzhrS2RROFJLZXdnTTRzM3RKTkp2SjNEbjM1NXc1TTBDQk5Wazh2NGhIQlF4bktDbExjSllwVmNNK05hNkdjNVM1R2M1cittNzRvZnJMOEpNbWIyWmNPTEpsb0xWbHlZRTlvemllbUxCaXc1a2RjNkpmMVoyUjZpc0NRaHBTQ2VocnB5a2xFeTE2MUJWRHhWQThoOUpaL3c2bXlxSjQydldkbnJzOVRXRW14a0svK05WTEdHUGpEOVZkbXE5QTlZNWNOdWtxdHVOWG1jY1BRbWcyL3dCNDJuM1BPUTdDUUF4RzRYbkRFdlo5QjNHR2NTQUJTcGJrTGpSMDNKOEJmbG9zV1orN0p6dnYvczgyTHM3anFWQ2xScDJFQmsxYXRPblFwVWVmQVVOR2pKa3daY2FjQlV0V3JOa2t6OGM5aEhCN1c4UkRta3psVHU1bEpuTjVrRWQ1a21kNWtWZjU2eFd5L0dycW0vcW12cWx2NnB2NnByNnBiNTkrR2Y5NEFiNEdQTnU0QWYrRnNBR05BRXV3Q0ZCWXNRRUJqbG14UmdZcldDR3dFRmxMc0JSU1dDR3dnRmtkc0FZclhGaFpzQlFyQUFBQUFWRE80Rm9BQUE9PSkgZm9ybWF0KCd3b2ZmJyksdXJsKCcuLi9mb250cy93eXNpYmJpY29uZm9udC13Yi50dGYnKSBmb3JtYXQoJ3RydWV0eXBlJyk7Zm9udC13ZWlnaHQ6bm9ybWFsO2ZvbnQtc3R5bGU6bm9ybWFsO31odG1se2hlaWdodDoxMDAlIWltcG9ydGFudDt9Lnd5c2liYntib3JkZXI6MXB4IHNvbGlkICNkZGQ7cG9zaXRpb246cmVsYXRpdmU7YmFja2dyb3VuZDojZmZmO2ZvbnQtc2l6ZToxMnB4O30ud3lzaWJiIGJ1dHRvbjpmb2N1cywud3lzaWJiIGJ1dHRvbjphY3RpdmUsI3diYm1vZGFsIGJ1dHRvbjpmb2N1cywjd2JibW9kYWwgYnV0dG9uOmFjdGl2ZXtvdXRsaW5lOjA7fS53eXNpYmItYm9keXtvdmVyZmxvdy14OmF1dG8haW1wb3J0YW50O30ud3lzaWJiLWJvZHkgdWwsLnd5c2liYi1ib2R5IG9se3BhZGRpbmc6MCAwIDAgMzBweH0ud3lzaWJiLXRleGFyZWEsLnd5c2liYi10ZXhhcmVhOmFjdGl2ZXtib3JkZXI6bm9uZSFpbXBvcnRhbnQ7bWFyZ2luOjAhaW1wb3J0YW50O291dGxpbmU6bm9uZSFpbXBvcnRhbnQ7cGFkZGluZzowIWltcG9ydGFudDt3aWR0aDoxMDAlIWltcG9ydGFudDt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXJ7ZmxvYXQ6bGVmdDt3aWR0aDo3MHB4O2hlaWdodDoxMDAlO292ZXJmbG93LXk6YXV0bztvdmVyZmxvdy14OmhpZGRlbjtwYWRkaW5nOjA7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjY2NjO30ud3lzaWJiIC53eXNpYmItdGV4dHttYXJnaW46MCAwIDAgNzBweDt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLm1vZGVTd2l0Y2h7ZGlzcGxheTpibG9jaztwb3NpdGlvbjpyZWxhdGl2ZTtyaWdodDowO3RvcDowO2JvcmRlcjowO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVye2JvcmRlcjowO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4sLnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1zZWxlY3R7d2lkdGg6NjBweDttYXgtd2lkdGg6OTYlO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIHNlbGVjdC53YmItc2VsZWN0Ym94e2hlaWdodDozMHB4O21heC13aWR0aDo5NiU7bWFyZ2luOjFweCAwO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Ym9yZGVyOjA7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bi53YmItc2VsZWN0e2Rpc3BsYXk6bm9uZTt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRue2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDozMnB4O3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwYWRkaW5nOjBweCAxcHg7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjAgMCAwIDFweDtmb250LXNpemU6MTJweDtib3JkZXI6MXB4IHNvbGlkIHRyYW5zcGFyZW50O2JveC1zaXppbmc6Ym9yZGVyLWJveDt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuOmhvdmVyIHNwYW4uYnRuLXRvb2x0aXB7ZGlzcGxheTpub25lO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC5kaXMsLnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLmRpczpob3ZlcntvcGFjaXR5OjAuMztjdXJzb3I6ZGVmYXVsdDtvdmVyZmxvdzpoaWRkZW47Ym9yZGVyOjA7cGFkZGluZzoxcHggMnB4O2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bi5vbiwud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4ub246aG92ZXIsLnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuOmFjdGl2ZXtiYWNrZ3JvdW5kOiNjY2M7cGFkZGluZzowcHggMXB4O2JveC1zaGFkb3c6aW5zZXQgMHB4IDBweCAzcHggI2FhYTtib3JkZXI6MXB4IHNvbGlkICNhYWE7Ym9yZGVyLXJhZGl1czowcHg7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0biBzcGFuLmJ0bi1pbm5lcntkaXNwbGF5OmJsb2NrO2hlaWdodDoyNnB4O21pbi13aWR0aDoyNnB4O21hcmdpbjoycHg7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0biBzcGFuLmJ0bi10b29sdGlwe2Rpc3BsYXk6bm9uZTtiYWNrZ3JvdW5kOiMzMzM7Ym9yZGVyOjFweCBzb2xpZCAjZmZmO3Bvc2l0aW9uOmFic29sdXRlO2xpbmUtaGVpZ2h0OjIwcHg7Zm9udC1zaXplOjExcHg7cGFkZGluZzozcHggMTBweDtib3R0b206MzVweDtsZWZ0OjA7Y29sb3I6I2ZmZjtib3JkZXItcmFkaXVzOjBweDt3aGl0ZS1zcGFjZTpub3dyYXA7ei1pbmRleDoxMDAwMDt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuIHNwYW4uYnRuLXRvb2x0aXAgaW5ze3dpZHRoOjA7aGVpZ2h0OjA7Ym9yZGVyLWxlZnQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItcmlnaHQ6MTBweCBzb2xpZCB0cmFuc3BhcmVudDtib3JkZXItdG9wOjEwcHggc29saWQgIzMzMztwb3NpdGlvbjphYnNvbHV0ZTtib3R0b206LTVweDtsZWZ0OjNweDt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuIHNwYW4uYnRuLXRleHR7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtZmFtaWx5OnNhbnMtc2VyaWYsVmVyZGFuYSxUYWhvbWE7Zm9udC13ZWlnaHQ6Ym9sZDtsaW5lLWhlaWdodDoyOHB4O3RleHQtYWxpZ246Y2VudGVyO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG46aG92ZXJ7cGFkZGluZzowcHggMXB4O2JvcmRlcjoxcHggc29saWQgdHJhbnNwYXJlbnQ7Ym9yZGVyLXJhZGl1czowcHg7YmFja2dyb3VuZDojZWVlO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4gLmZvbnRpY29ue2NvbG9yOiMzMzM7Zm9udC1mYW1pbHk6J1d5c2lCQmljb25Gb250Jztmb250LXNpemU6MThweDtsaW5lLWhlaWdodDoyOHB4O3RleHQtc2hhZG93OjBweCAxcHggMHB4ICNmZmY7dGV4dC1hbGlnbjpjZW50ZXI7c3BlYWs6bm9uZTt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuOmhvdmVyIC5mb250aWNvbntjb2xvcjojMDAwO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4ub24gLmZvbnRpY29ue3RleHQtc2hhZG93Om5vbmU7Y29sb3I6IzAwMDt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLm1vZGVTd2l0Y2ggLnd5c2liYi10b29sYmFyLWJ0bnsKfS5tb2Rlc3d7Zm9udC13ZWlnaHQ6Ym9sZDtmb250LXNpemU6MWVtO2xpbmUtaGVpZ2h0OjI4cHg7dGV4dC1hbGlnbjpjZW50ZXI7ZGlzcGxheTpibG9jazt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7fS52ZS10bGItYm9sZHtiYWNrZ3JvdW5kOnVybCguL2ltZy9pY29ucy5wbmcpIDAgMCBuby1yZXBlYXQ7d2lkdGg6MjBweDt9LnZlLXRsYi1pdGFsaWN7YmFja2dyb3VuZDp1cmwoLi9pbWcvaWNvbnMucG5nKSAwIC00MHB4IG5vLXJlcGVhdDt3aWR0aDoyMHB4O30udmUtdGxiLXVuZGVybGluZXtiYWNrZ3JvdW5kOnVybCguL2ltZy9pY29ucy5wbmcpIDAgLTIwcHggbm8tcmVwZWF0O3dpZHRoOjIwcHg7fS52ZS10bGItc3RyaWtle2JhY2tncm91bmQ6dXJsKC4vaW1nL2ljb25zLnBuZykgMCAtMTIwcHggbm8tcmVwZWF0O3dpZHRoOjIwcHg7fS52ZS10bGItbGlua3tiYWNrZ3JvdW5kOnVybCguL2ltZy9pY29ucy5wbmcpIDAgLTgwcHggbm8tcmVwZWF0O3dpZHRoOjIwcHg7fS52ZS10bGItdW5saW5re2JhY2tncm91bmQ6dXJsKC4vaW1nL2ljb25zLnBuZykgMCAtMTAwcHggbm8tcmVwZWF0O3dpZHRoOjIwcHg7fS52ZS10bGItaW1ne2JhY2tncm91bmQ6dXJsKC4vaW1nL2ljb25zLnBuZykgMCAtNjBweCBuby1yZXBlYXQ7d2lkdGg6MjBweDt9LnZlLXRsYi1xdW90ZXtiYWNrZ3JvdW5kOnVybCguL2ltZy9pY29ucy5wbmcpIDAgLTE0MHB4IG5vLXJlcGVhdDt3aWR0aDoyMHB4O30udmUtdGxiLXNwb2lsZXJ7YmFja2dyb3VuZDp1cmwoLi9pbWcvaWNvbnMucG5nKSAwIC0xNjBweCBuby1yZXBlYXQ7d2lkdGg6MjBweDt9LnZlLXRsYi1saXN0e2JhY2tncm91bmQ6dXJsKC4vaW1nL2ljb25zLnBuZykgMCAtMTgwcHggbm8tcmVwZWF0O3dpZHRoOjIwcHg7fS52ZS10bGItYmJjb2Rle2JhY2tncm91bmQ6dXJsKC4vaW1nL2ljb25zLnBuZykgMCAtMjAwcHggbm8tcmVwZWF0O3dpZHRoOjQwcHghaW1wb3J0YW50O21hcmdpbjoxcHggYXV0byFpbXBvcnRhbnQ7aGVpZ2h0OjIwcHg7fS52ZS10bGItbnVtbGlzdHtiYWNrZ3JvdW5kOnVybCguL2ltZy9pY29ucy5wbmcpIDAgLTIyMHB4IG5vLXJlcGVhdDt3aWR0aDoyMHB4O30udmUtdGxiLXRleHRsZWZ0e2JhY2tncm91bmQ6dXJsKC4vaW1nL2ljb25zLnBuZykgMCAtMjQwcHggbm8tcmVwZWF0O3dpZHRoOjIwcHg7fS52ZS10bGItdGV4dGNlbnRlcntiYWNrZ3JvdW5kOnVybCguL2ltZy9pY29ucy5wbmcpIDAgLTI2MHB4IG5vLXJlcGVhdDt3aWR0aDoyMHB4O30udmUtdGxiLXRleHRyaWdodHtiYWNrZ3JvdW5kOnVybCguL2ltZy9pY29ucy5wbmcpIDAgLTI4MHB4IG5vLXJlcGVhdDt3aWR0aDoyMHB4O30udmUtdGxiLW9mZnRvcGlje2JhY2tncm91bmQ6dXJsKC4vaW1nL2ljb25zLnBuZykgMCAtMzAwcHggbm8tcmVwZWF0O3dpZHRoOjIwcHg7fS52ZS10bGItY29kZXtiYWNrZ3JvdW5kOnVybCguL2ltZy9pY29ucy5wbmcpIDAgLTMyMHB4IG5vLXJlcGVhdDt3aWR0aDoyMHB4O30udmUtdGxiLXNwb2lsZXJ7YmFja2dyb3VuZDp1cmwoLi9pbWcvaWNvbnMucG5nKSAwIC0zNDBweCBuby1yZXBlYXQ7d2lkdGg6MjBweDt9LnZlLXRsYi1zdWJ7YmFja2dyb3VuZDp1cmwoLi9pbWcvaWNvbnMucG5nKSAwIC0zNjBweCBuby1yZXBlYXQ7d2lkdGg6MjBweDt9LnZlLXRsYi1zdXB7YmFja2dyb3VuZDp1cmwoLi9pbWcvaWNvbnMucG5nKSAwIC0zODBweCBuby1yZXBlYXQ7d2lkdGg6MjBweDt9LnZlLXRsYi1jb2xvcnBpY2t7d2lkdGg6NTBweDtoZWlnaHQ6MjRweDtsaW5lLWhlaWdodDoyNHB4O3RleHQtYWxpZ246Y2VudGVyO30udmUtdGxiLXRhYmxle2JhY2tncm91bmQ6dXJsKC4vaW1nL2ljb25zLnBuZykgMCAtNDYwcHg7d2lkdGg6MjBweDt9LnZlLXRsYi1zbWlsZWJveHtiYWNrZ3JvdW5kOnVybCguL2ltZy9pY29ucy5wbmcpIDAgLTQ4MHB4O3dpZHRoOjIwcHg7fS52ZS10bGItdmlkZW97YmFja2dyb3VuZDp1cmwoLi9pbWcvaWNvbnMucG5nKSAwIC01MDBweDt3aWR0aDoyMHB4O30udmUtdGxiLXJlbW92ZWZvcm1hdHtiYWNrZ3JvdW5kOnVybCguL2ltZy9pY29ucy5wbmcpIDAgLTU0MHB4O3dpZHRoOjIwcHg7fS50dGhvdGtleXtjb2xvcjojZGRkO2ZvbnQtc2l6ZTo5cHg7fS53eXNpYmItdGV4dC1lZGl0b3J7b3V0bGluZTpub25lfS5ib3R0b20tcmVzaXplLWxpbmV7ZGlzcGxheTpub25lO2hlaWdodDo1cHg7Y3Vyc29yOm5zLXJlc2l6ZTt9LmJvdHRvbS1yZXNpemUtbGluZTpob3ZlciwuYm90dG9tLXJlc2l6ZS1saW5lLmRyYWd7YmFja2dyb3VuZDojZWVlfS53YmJ0YWJ7bWFyZ2luLWxlZnQ6MzBweDt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1kcm9wZG93biwud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4ud2JiLWRyb3Bkb3duOmFjdGl2ZXtwYWRkaW5nLXJpZ2h0OjEwcHg7YmFja2dyb3VuZDp0cmFuc3BhcmVudDtib3JkZXI6MXB4IHNvbGlkIHRyYW5zcGFyZW50O2JveC1zaGFkb3c6bm9uZTtwb3NpdGlvbjpyZWxhdGl2ZTt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1kcm9wZG93bjpob3ZlcntiYWNrZ3JvdW5kOiNlZWU7Ym9yZGVyOjFweCBzb2xpZCB0cmFuc3BhcmVudDt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1kcm9wZG93bi5vbiwud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4ud2JiLWRyb3Bkb3duLm9uOmFjdGl2ZXtib3JkZXI6MXB4IHNvbGlkICNhYWE7YmFja2dyb3VuZDojY2NjO2JveC1zaGFkb3c6aW5zZXQgMHB4IDBweCAzcHggI2FhYTt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1kcm9wZG93biBpbnMuYXJ7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTtyaWdodDoxMCU7dG9wOjBweDt3aWR0aDo5cHg7aGVpZ2h0OjI0cHg7Y3Vyc29yOmRlZmF1bHQ7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Zm9udC1zaXplOjE0cHg7cGFkZGluZzowIDJweDtsaW5lLWhlaWdodDoyNHB4O30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4ud2JiLWRyb3Bkb3duOmhvdmVyLC53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bi53YmItZHJvcGRvd24ub257cGFkZGluZy1yaWdodDoxMHB4Owp9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1kcm9wZG93bi5kaXMsLnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1kcm9wZG93bi5kaXM6aG92ZXJ7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0biAud2JiLWxpc3R7ZGlzcGxheTpub25lO3Bvc2l0aW9uOmZpeGVkO3RvcDoxMHB4O2xlZnQ6MyU7Ym9yZGVyOjFweCBzb2xpZCAjYmJiO2JveC1zaGFkb3c6MHB4IDBweCAzcHggI2FhYTt3aWR0aDo5MCU7cGFkZGluZzo1cHg7YmFja2dyb3VuZDojZmZmO21heC1oZWlnaHQ6OTAlO292ZXJmbG93OmF1dG87ei1pbmRleDoxMDAwO30udmUtdGxiLWNvbG9ycGljayAuY3AtbGluZXtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOjYwJTtoZWlnaHQ6M3B4O2JhY2tncm91bmQ6YmxhY2s7Ym90dG9tOjNweDtsZWZ0OjIwJTt9LndiYi1saXN0IC5zY3t3aWR0aDoyMyU7aGVpZ2h0OjMwcHg7bWFyZ2luOjAgMCAxJSAxJTtkaXNwbGF5OmlubGluZS1ibG9jazsqZGlzcGxheTppbmxpbmU7em9vbToxO2N1cnNvcjpwb2ludGVyO2JvcmRlcjoxcHggc29saWQgI2ZmZjt9LndiYi1saXN0IC5zYzpob3Zlcntib3JkZXI6MXB4IHNvbGlkICMzMzM7fS53YmItbGlzdCAubmN7aGVpZ2h0OjI0cHg7bGluZS1oZWlnaHQ6MjRweDt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojNjY2O21hcmdpbjowIDFweCA1cHggMXB4O30ud2JiLWxpc3QgLm5jOmhvdmVye2JhY2tncm91bmQ6I2VlZTt9LndiYi1saXN0IC5wbHtkaXNwbGF5OmJsb2NrO2hlaWdodDo1cHg7fS50Ymwtc2Vse2JvcmRlcjoxcHggc29saWQgI2RkZDtwb3NpdGlvbjphYnNvbHV0ZTtjdXJzb3I6cG9pbnRlcjtib3gtc2l6aW5nOmJvcmRlci1ib3g7fS50Ymwtc2VsOmhvdmVye2JhY2tncm91bmQ6I2VlZTt9LndiYi10YWJsZSB0ZHtib3JkZXI6MXB4IGRhc2hlZCAjREREO3BhZGRpbmc6M3B4O21hcmdpbjo1cHg7bWluLXdpZHRoOjVweDttaW4taGVpZ2h0OjE1cHg7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bi53YmItc2VsZWN0LC53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bi53YmItc2VsZWN0LmRpczpob3Zlciwud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4ud2JiLXNlbGVjdDphY3RpdmV7d2lkdGg6MTAwcHg7cGFkZGluZzoxcHggMXB4IDFweCA1cHg7Ym9yZGVyOjFweCBzb2xpZCB0cmFuc3BhcmVudDtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O2JveC1zaGFkb3c6bm9uZTt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1zZWxlY3Q6aG92ZXJ7YmFja2dyb3VuZDojZWVlO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4ud2JiLXNlbGVjdC5vbiwud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4ud2JiLXNlbGVjdC5vbjphY3RpdmV7cGFkZGluZzoxcHggMXB4IDFweCA1cHg7Ym9yZGVyOjFweCBzb2xpZCAjYWFhO2JhY2tncm91bmQ6I2NjYztib3gtc2hhZG93Omluc2V0IDBweCAwcHggM3B4ICNhYWE7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bi53YmItc2VsZWN0IC53YmItbGlzdHt3aWR0aDoyODBweDtwYWRkaW5nOjA7bWF4LWhlaWdodDoyNTBweDt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1zZWxlY3QgLnNhcntkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjNweDt0b3A6M3B4O3dpZHRoOjEwcHg7aGVpZ2h0OjIycHg7Y3Vyc29yOmRlZmF1bHQ7Zm9udC1zaXplOjE0cHg7dGV4dC1kZWNvcmF0aW9uOm5vbmU7fS53YmItc2VsZWN0IC52YWx7aGVpZ2h0OjI4cHg7bGluZS1oZWlnaHQ6MzBweDtmb250LXdlaWdodDpib2xkO2ZvbnQtc2l6ZToxMXB4O2Rpc3BsYXk6YmxvY2s7b3ZlcmZsb3c6aGlkZGVuO3RleHQtb3ZlcmZsb3c6ZWxsaXBzaXM7d2hpdGUtc3BhY2U6bm93cmFwO21hcmdpbi1yaWdodDoxMHB4O30ud2JiLXNlbGVjdCAub3B0aW9ue2Rpc3BsYXk6YmxvY2s7cGFkZGluZzo2cHggMTBweDt3aGl0ZS1zcGFjZTpub3dyYXA7Y3Vyc29yOnBvaW50ZXI7fS53YmItc2VsZWN0IC5vcHRpb246aG92ZXJ7YmFja2dyb3VuZDojZWVlO30ud2JiLXNlbGVjdCAub3B0aW9uLnNlbGVjdGVke2JhY2tncm91bmQ6IzQyOGJjYTtjb2xvcjojZmZmO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4ud2JiLXNtaWxlYm94e2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Ym9yZGVyOjFweCBzb2xpZCB0cmFuc3BhcmVudDtib3gtc2hhZG93Om5vbmU7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bi53YmItc21pbGVib3gub24sLnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1zbWlsZWJveC5vbjphY3RpdmV7Ym9yZGVyOjFweCBzb2xpZCAjYWFhO2JhY2tncm91bmQ6I2NjYztib3gtc2hhZG93Omluc2V0IDBweCAwcHggM3B4ICNhYWE7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bi53YmItc21pbGVib3ggLndiYi1saXN0e3dpZHRoOjE1NnB4O30uc21pbGV7d2lkdGg6MTZweDtoZWlnaHQ6MTZweDtsaW5lLWhlaWdodDoyMHB4O3BhZGRpbmc6NXB4O2Rpc3BsYXk6aW5saW5lLWJsb2NrOypkaXNwbGF5OmlubGluZTt6b29tOjE7Y3Vyc29yOnBvaW50ZXI7dmVydGljYWwtYWxpZ246bWlkZGxlO30uc21pbGUgaW1ne21heC13aWR0aDoxNnB4O21heC1oZWlnaHQ6MTZweDt9I3diYm1vZGFse2ZvbnQ6MTJweC8xLjIgQXJpYWwsVmVyZGFuYTtwb3NpdGlvbjpmaXhlZDt0ZXh0LWFsaWduOmNlbnRlcjtib3R0b206MDtsZWZ0OjA7dG9wOjA7cmlnaHQ6MDtvdmVyZmxvdzphdXRvOy13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOnRvdWNoO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwwLjUpO2ZpbHRlcjpwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvcnN0cj0jN0ZmZmZmZmYsZW5kQ29sb3JzdHI9IzdGZmZmZmZmKTt6b29tOjE7ei1pbmRleDoxMTAwO30jd2JibW9kYWwgLndiYm17YmFja2dyb3VuZDojZmZmO3RleHQtYWxpZ246bGVmdDttYXgtd2lkdGg6OTAlO21heC1oZWlnaHQ6OTAlO21hcmdpbjozMHB4IGF1dG87Ym9yZGVyOjFweCBzb2xpZCAjYmJiO2JveC1zaGFkb3c6MHB4IDBweCA1cHggIzMzMztvdmVyZmxvdzphdXRvO30jd2JibW9kYWwgLndiYm0tdGl0bGV7Y29sb3I6IzMzMztwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjVweCAxMHB4O2JvcmRlci1ib3R0b206MXB4IHNvbGlkICNjY2M7fSN3YmJtb2RhbCAud2JibS10aXRsZSAud2JibS10aXRsZS10ZXh0e2ZvbnQtc2l6ZToxLjZlbTtsaW5lLWhlaWdodDoyZW07bWFyZ2luOjA7cGFkZGluZzowO30jd2JibW9kYWwgLndiYm0tdGl0bGUgLndiYmNsb3Nle2Rpc3BsYXk6YmxvY2s7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjE1cHg7dG9wOjE1cHg7Zm9udC1zaXplOjIxcHg7Zm9udC13ZWlnaHQ6Ym9sZDtjdXJzb3I6cG9pbnRlcjtjb2xvcjojODg4O30jd2JibW9kYWwgLndiYm0tdGl0bGUgLndiYmNsb3NlOmhvdmVye2NvbG9yOnJlZDt9I3diYm1vZGFsIC53YmJtIC53YmJtLXRhYmxpc3R7cGFkZGluZzoxMHB4IDIwcHg7fSN3YmJtb2RhbCAud2JibSAud2JibS10YWJsaXN0IHVse2xpc3Qtc3R5bGUtdHlwZTpub25lO3BhZGRpbmc6MDttYXJnaW46MDt9I3diYm1vZGFsIC53YmJtIC53YmJtLXRhYmxpc3QgdWwgbGl7cGFkZGluZzoxMHB4O2N1cnNvcjpwb2ludGVyO21hcmdpbjo1cHggMDtwb3NpdGlvbjpyZWxhdGl2ZTtib3JkZXItcmFkaXVzOjBweDtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW46MCAxMHB4IDVweCAwO30jd2JibW9kYWwgLndiYm0gLndiYm0tdGFibGlzdCB1bCBsaS5vbiwjd2JibW9kYWwgLndiYm0gLndiYm0tdGFibGlzdCB1bCBsaS5vbjpob3ZlcntiYWNrZ3JvdW5kOiM0MjhiY2E7Y29sb3I6I2ZmZjtjdXJzb3I6ZGVmYXVsdDt9I3diYm1vZGFsIC53YmJtIC53YmJtLXRhYmxpc3QgdWwgbGk6aG92ZXJ7YmFja2dyb3VuZDojZWVlO30jd2JibW9kYWwgLndiYm0tY29udHtwYWRkaW5nOjEwcHggMjBweDt9I3diYm1vZGFsIC53YmJtLWNvbnRlbnR7bWluLWhlaWdodDo1MHB4O21heC1oZWlnaHQ6MTAwJTt9I3diYm1vZGFsIC5kaXYtbW9kYWwtdGV4dHtib3JkZXI6MXB4IHNvbGlkICNhYWE7cGFkZGluZzoycHggNXB4O2xpbmUtaGVpZ2h0OjI4cHg7bWF4LWhlaWdodDoxMDBweDtvdmVyZmxvdzphdXRvO2ZvbnQtc2l6ZToxNHB4O30jd2JibW9kYWwgLndiYm0tYm90dG9te2JvcmRlci10b3A6MXB4IHNvbGlkICNjY2M7cGFkZGluZzoxMHB4O2JhY2tncm91bmQ6I2YxZjFmMTt9I3diYm1vZGFsIGJ1dHRvbntkaXNwbGF5OmlubGluZS1ibG9jazsqZGlzcGxheTppbmxpbmU7em9vbToxO2ZvbnQtc2l6ZToxNHB4O3BhZGRpbmc6M3B4IDE1cHg7fSN3YmJtb2RhbCAud2JiLWJ1dHRvbntiYWNrZ3JvdW5kOiM0MjhiY2E7Y29sb3I6I2ZmZjtsaW5lLWhlaWdodDoyNnB4O2JvcmRlcjoxcHggc29saWQgIzM1N2ViZDtib3JkZXItcmFkaXVzOjBweDtjdXJzb3I6cG9pbnRlcjt9I3diYm1vZGFsIC53YmItYnV0dG9uOmhvdmVye2JhY2tncm91bmQ6IzMyNzZiMTtib3JkZXI6MXB4IHNvbGlkICMyODVlOGU7fSN3YmJtb2RhbCAud2JiLWNhbmNlbC1idXR0b257YmFja2dyb3VuZDojZjVmNWY1O2NvbG9yOiMzMzM7bGluZS1oZWlnaHQ6MjZweDtib3JkZXI6MXB4IHNvbGlkICNkZGQ7Ym9yZGVyLXJhZGl1czowcHg7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luLWxlZnQ6MTVweDt9I3diYm1vZGFsIC53YmItY2FuY2VsLWJ1dHRvbjpob3ZlcntiYWNrZ3JvdW5kOiNmZmY7Ym9yZGVyOjFweCBzb2xpZCAjY2NjO30jd2JibW9kYWwgLndiYi1yZW1vdmUtYnV0dG9ue2JhY2tncm91bmQ6I2Q5NTM0Zjtjb2xvcjojZmZmO2xpbmUtaGVpZ2h0OjI2cHg7Ym9yZGVyOjFweCBzb2xpZCAjZDQzZjNhO2JvcmRlci1yYWRpdXM6MHB4O2N1cnNvcjpwb2ludGVyO2Zsb2F0OnJpZ2h0O30jd2JibW9kYWwgLndiYi1yZW1vdmUtYnV0dG9uOmhvdmVye2JhY2tncm91bmQ6I2QyMzIyZDtib3JkZXI6MXB4IHNvbGlkICNhYzI5MjU7fSN3YmJtb2RhbCAud2JibS1pbnAtcm93e21hcmdpbi1ib3R0b206MTVweDt9I3diYm1vZGFsIC53YmJtLWlucC1yb3cgbGFiZWx7ZGlzcGxheTpibG9jaztmb250LXdlaWdodDpib2xkO21hcmdpbi1ib3R0b206M3B4O30jd2JibW9kYWwgLndiYm0taW5wLXJvdyBpbnB1dHtkaXNwbGF5OmJsb2NrO2hlaWdodDozNHB4O3BhZGRpbmc6MnB4IDVweDtsaW5lLWhlaWdodDoxLjQyODU3MTQzO2ZvbnQtc2l6ZToxNHB4O3dpZHRoOjEwMCU7Ym9yZGVyOjFweCBzb2xpZCAjYWFhO291dGxpbmU6bm9uZTtib3gtc2l6aW5nOmJvcmRlci1ib3g7Ym9yZGVyLXJhZGl1czowO30jd2JibW9kYWwgLndiYm0taW5wZXJye2NvbG9yOnJlZDtmb250LXNpemU6MTBweDtkaXNwbGF5OmJsb2NrO30jd2JibW9kYWwgLndiYm0tYnJkcmVke2JvcmRlci1jb2xvcjpyZWQhaW1wb3J0YW50O30jd2JibW9kYWwgI2ltZ3VwbG9hZGVye3RleHQtYWxpZ246Y2VudGVyO30jd2JibW9kYWwgI2ltZ3VwbG9hZGVyLmRyYWd7Ym9yZGVyOjNweCBkYXNoZWQgI2NjYzt9I3diYm1vZGFsICNpbWd1cGxvYWRlci5kcmFnLmRyYWdvdmVye2JhY2tncm91bmQ6I2ZlZmZlNDt9I3diYm1vZGFsICNpbWd1cGxvYWRlci5kcmFnLndiYi1sb2FkaW5ne3BhZGRpbmc6NDBweCAwO30jd2JibW9kYWwgI2ltZ3VwbG9hZGVyLmRyYWcgLnB7Zm9udC1zaXplOjJlbTtjb2xvcjojYWFhO21hcmdpbi10b3A6MTVweDt9I3diYm1vZGFsICNpbWd1cGxvYWRlci5kcmFnIC5wMntjb2xvcjojQUFBO30jd2JibW9kYWwgI2ltZ3VwbG9hZGVyLmRyYWcgLmZpbGV1cGxvYWR7bWFyZ2luOjE1cHggMDt9I3diYm1vZGFsIC5maWxldXBsb2Fke21hcmdpbjo0MHB4IDA7cG9zaXRpb246cmVsYXRpdmU7fSN3YmJtb2RhbCAuZHJhZ3VwbG9hZHttYXJnaW46MTBweCAwIDE1cHggMDtwb3NpdGlvbjpyZWxhdGl2ZTt9I3diYm1vZGFsIC5maWxldXBsb2FkIGlucHV0LmZpbGV7b3BhY2l0eTowO2ZpbHRlcjphbHBoYShvcGFjaXR5PTApO3dpZHRoOjIzMHB4O2hlaWdodDozMnB4IWltcG9ydGFudDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MnB4O2xlZnQ6NTAlO21hcmdpbi1sZWZ0Oi0xMTVweDtkaXNwbGF5OmJsb2NrO30ubG9hZGVye21hcmdpbjozMHB4IDA7fS51cGwtZXJyb3J7Y29sb3I6cmVkO2Rpc3BsYXk6YmxvY2s7fS5wb3dlcmVke2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7Ym90dG9tOi0xOHB4O3JpZ2h0OjVweDtmb250LXNpemU6MTBweDt9Lnd5c2liYiAud3lzaWJiLWJvZHkgLmltZ1dyYXB7cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7fS53eXNpYmIgLnd5c2liYi1ib2R5IC5pbWdXcmFwIGltZ3tvcGFjaXR5OjAuNTt9LmNvbnRlbnQtcGhwYmIze2ZvbnQtc2l6ZToxM3B4O2xpbmUtaGVpZ2h0Om5vcm1hbCFpbXBvcnRhbnQ7fS5jb250ZW50LXBocGJiMyAuY29kZWJveCBkdHtmbG9hdDpub25lO3dpZHRoOjEwMCU7fS5jb250ZW50LXBocGJiMyAuY29kZWJveCBkZHttYXJnaW46MCFpbXBvcnRhbnQ7fUBtZWRpYSAobWluLXdpZHRoOiA5OTJweCkgey53eXNpYmIgLnd5c2liYi10ZXh0e3BhZGRpbmc6NXB4O21hcmdpbjowO30ud3lzaWJiIC53eXNpYmItdG9vbGJhcntmbG9hdDpub25lO3dpZHRoOmF1dG87b3ZlcmZsb3c6dmlzaWJsZTtib3JkZXItcmlnaHQ6MDt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXJ7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgI2RkZDtwb3NpdGlvbjpyZWxhdGl2ZTtwYWRkaW5nOjAgNjBweCAwIDA7aGVpZ2h0OmF1dG87fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXJ7bWFyZ2luOjA7Ym9yZGVyLXJpZ2h0OjFweCBzb2xpZCAjZGRkO3BhZGRpbmc6MDtkaXNwbGF5OmlubGluZS1ibG9jazt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRue2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDozMnB4O21pbi13aWR0aDoyOHB4O3Bvc2l0aW9uOnJlbGF0aXZlO3ZlcnRpY2FsLWFsaWduOm1pZGRsZTtwYWRkaW5nOjBweCAxcHg7Y3Vyc29yOnBvaW50ZXI7bWFyZ2luOjAgMCAwIDFweDtmb250LXNpemU6MTJweDtib3JkZXI6MXB4IHNvbGlkIHRyYW5zcGFyZW50O3dpZHRoOmF1dG87fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bjpob3ZlciBzcGFuLmJ0bi10b29sdGlwe2Rpc3BsYXk6YmxvY2s7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC5tb2RlU3dpdGNoe3RleHQtYWxpZ246Y2VudGVyO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0OjBweDt0b3A6MHB4O2JvcmRlcjowO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIHNlbGVjdC53YmItc2VsZWN0Ym94e2Rpc3BsYXk6bm9uZTt9Lnd5c2liYiAud3lzaWJiLXRvb2xiYXIgLnd5c2liYi10b29sYmFyLWNvbnRhaW5lciAud3lzaWJiLXRvb2xiYXItYnRuLndiYi1zZWxlY3R7ZGlzcGxheTppbmxpbmUtYmxvY2s7fS53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bi53YmItc2VsZWN0IHNwYW4udmFsLC53eXNpYmIgLnd5c2liYi10b29sYmFyIC53eXNpYmItdG9vbGJhci1jb250YWluZXIgLnd5c2liYi10b29sYmFyLWJ0bi53YmItc2VsZWN0IGluc3tkaXNwbGF5OmJsb2NrO30ud3lzaWJiIC53eXNpYmItdG9vbGJhciAud3lzaWJiLXRvb2xiYXItY29udGFpbmVyIC53eXNpYmItdG9vbGJhci1idG4gLndiYi1saXN0e2Rpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MzJweDtsZWZ0Oi0xcHg7Ym9yZGVyOjFweCBzb2xpZCAjYmJiO2JveC1zaGFkb3c6MHB4IDBweCAzcHggI2FhYTt3aWR0aDoxOTBweDtiYWNrZ3JvdW5kOiNmZmY7bWF4LWhlaWdodDoyMjBweDtvdmVyZmxvdzphdXRvO3otaW5kZXg6MTAwMDt9LndiYi1saXN0IC5zY3t3aWR0aDoxNnB4O2hlaWdodDoxNnB4O21hcmdpbjowIDAgMXB4IDFweDtkaXNwbGF5OmlubGluZS1ibG9jazsqZGlzcGxheTppbmxpbmU7em9vbToxO2N1cnNvcjpwb2ludGVyO2JvcmRlcjoxcHggc29saWQgI2ZmZjt9LnZlLXRsYi1jb2xvcnBpY2t7d2lkdGg6MjRweDtoZWlnaHQ6MjRweDtsaW5lLWhlaWdodDoyNHB4O3RleHQtYWxpZ246cmlnaHQ7fS53eXNpYmIgLmJvdHRvbS1yZXNpemUtbGluZXtkaXNwbGF5OmJsb2NrO2hlaWdodDo1cHg7Y3Vyc29yOm5zLXJlc2l6ZTt9fQ==";
        var css = "Ym9keSwgdHIsIHRoLCB0ZCB7CiAgICBjb2xvcjogIzAwMDsKfQoKYm9keSB7CiAgICBwYWRkaW5nOiAwcHg7CiAgICBiYWNrZ3JvdW5kOiAjY2NjOwogICAgZm9udC1zaXplOiAxMHB0OwogICAgZm9udC1mYW1pbHk6IFZlcmRhbmEsQXJpYWwsQ2xlYW4sSGVsdmV0aWNhLHNhbnMtc2VyaWYsTHVjaWRhIFNhbnMgVW5pY29kZSxMdWNpZGEgR3JhbmRlLEFyaWFsLFZlcmRhbmEsVGFob21hOwp9CgoucG9zdF93cmFwcGVyIC5wb3N0YXJlYSAucG9zdCAuaW5uZXIgewogICAgYm9yZGVyLXRvcDogMHB4IG5vbmU7Cn0KCi5wb3N0X3dyYXBwZXIgLnBvc3RhcmVhLCAucG9zdF93cmFwcGVyIC5tb2RlcmF0b3JiYXIgewogICAgbWFyZ2luOiAwcHg7Cn0KCi8qcGFnZSBtYXJnaW5zKi8KYm9keSAjd3JhcHBlciAjY29udGVudF9zZWN0aW9uIHsKICAgIGJhY2tncm91bmQ6ICNjY2M7CiAgICBwYWRkaW5nOiAwcHg7CiAgICBwYWRkaW5nLWxlZnQ6IDVweDsKICAgIHBhZGRpbmctcmlnaHQ6IDVweDsKfQoKI2Zvb3Rlcl9zZWN0aW9uIHsKICAgIG1hcmdpbi1sZWZ0OiA1cHg7CiAgICBtYXJnaW4tcmlnaHQ6IDVweDsKICAgIGJhY2tncm91bmQ6IG5vbmU7Cn0KCiNmb290ZXJfc2VjdGlvbiBkaXYuZnJhbWUgewogICAgYmFja2dyb3VuZDogI2NjYzsKICAgIHBhZGRpbmc6IDEwcHggMHB4IDBweCAwcHggIWltcG9ydGFudDsKfQoKYm9keSAjd3JhcHBlciAjY29udGVudF9zZWN0aW9uIC5mcmFtZSB7CiAgICBwYWRkaW5nOiAwcHg7CiAgICBiYWNrZ3JvdW5kOiAjY2NjOwp9CgouYm90c2xpY2UsIC50b3BzbGljZSB7CiAgICBkaXNwbGF5OiBub25lOwp9CgouYm90c2xpY2UyIHsKICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKfQoKLmlubmVyIHtwYWRkaW5nOiAwcHggMHB4IDEwcHggMHB4O30KCiNmb3J1bXBvc3RzIC5tb2RpZmllZCB7ZmxvYXQ6bm9uZTt9Cgoud2luZG93YmcsIC53aW5kb3diZzIgewogICAgYm9yZGVyOiAxcHggc29saWQgIzgwODA4MDsKICAgIG1hcmdpbjogMnB4OwogICAgYmFja2dyb3VuZDogI2ZmZjsKICAgIHBhZGRpbmc6IDBweDsKfQoKLnBvc3Rfd3JhcHBlciB7CiAgICBtYXJnaW46IDBweDsKfQoKYm9keSAjd3JhcHBlciB7CiAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50Owp9Cgp0YWJsZS50YWJsZV9ncmlkIHRkIGEsIC5wb3N0IC5pbm5lciBhIHsKICAgIGNvbG9yOiAjRDAwOwogICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOwp9Cgp0YWJsZS50YWJsZV9ncmlkIHRkIGE6aG92ZXIsIC5wb3N0IC5pbm5lciBhOmhvdmVyIHsKICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOwp9Cgp0YWJsZS50YWJsZV9ncmlkIHRkIGE6dmlzaXRlZCwgLnBvc3QgLmlubmVyIGE6dmlzaXRlZCB7CiAgICBjb2xvcjogIzc3MDAwMDsKICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKfQoKLnBvc3QtaGVhZGVyIGEsIC5wb3N0LWhlYWRlciBhOnZpc2l0ZWQgewogICAgY29sb3I6ICNEMDAgIWltcG9ydGFudDsKICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICAgIGZvbnQtd2VpZ2h0OiBib2xkOwogICAgZm9udC1zaXplOiAxMnB4Owp9CgoucG9zdC1oZWFkZXIgewogICAgcGFkZGluZy1sZWZ0OiA1cHg7CiAgICBwYWRkaW5nLXJpZ2h0OiA1cHg7CiAgICBwYWRkaW5nLXRvcDogNXB4Owp9CgoucG9zdGFyZWEgewogICAgcGFkZGluZzogNXB4Owp9CgoucG9zdC1oZWFkZXIgZGl2IHsKICAgIGZvbnQtc2l6ZTogMTFweDsKfQoKLnBvc3QtZm9vdGVyIHsKICAgIGhlaWdodDogMTVweDsKICAgIGJhY2tncm91bmQ6ICNlZWU7CiAgICBmb250LXNpemU6IDExcHg7Cn0KCi5wb3N0LWZvb3RlciBhLCAucG9zdC1mb290ZXIgYTp2aXNpdGVkIHsKICAgIGNvbG9yOiAjMDAwICFpbXBvcnRhbnQ7CiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7CiAgICBtYXJnaW4tbGVmdDogNXB4OwogICAgbWFyZ2luLXJpZ2h0OiA1cHg7Cn0KCi5wb3N0LWZvb3RlciBhOmhvdmVyIHsKICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOwp9CgpibG9ja3F1b3RlIHsKICAgIGZvbnQtc2l6ZTogMTFweDsKfQoKLmJiY19zdGFuZGFyZF9xdW90ZSwgLmJiY19hbHRlcm5hdGVfcXVvdGUgewp9CgouYmJjX3N0YW5kYXJkX3F1b3RlIHsKfQoKLmJiY19hbHRlcm5hdGVfcXVvdGUgewp9CgoucGFnZS1oZWFkZXIyIHsKICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7Cn0KCi5wYWdlLWhlYWRlcjIgI21haW5fbWVudSAjbWVudV9uYXYgewogICAgd2hpdGUtc3BhY2U6IG5vd3JhcDsKfQoKI21haW5fbWVudSB7CiAgICB3aWR0aDogYXV0bzsKfQoKLmRyb3Bkb3duLW1lbnUgewogICAgcGFkZGluZzogMTBweDsKfQoKLmRyb3Bkb3duLW1lbnUsIC5kcm9wZG93biB7CiAgICBjdXJzb3I6IGRlZmF1bHQ7Cn0KLnRocmVhZC1oZWFkZXIgewogICAgYmFja2dyb3VuZDogI0YwRjBGMDsKICAgIGJvcmRlcjogMXB4IHNvbGlkICM4MDgwODA7CiAgICBwYWRkaW5nOiAwcHg7CiAgICBtYXJnaW46IDJweDsKICAgIGZvbnQtc2l6ZTogMTFweDsKfQoKLnRocmVhZC1oZWFkZXIgYSwgLnRocmVhZC1oZWFkZXIgYTp2aXNpdGVkIHsKICAgIGNvbG9yOiAjMDAwICFpbXBvcnRhbnQ7CiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7CiAgICBtYXJnaW4tbGVmdDogNXB4OwogICAgbWFyZ2luLXJpZ2h0OiA1cHg7Cn0KCi5wLXBhZ2VzLWNhcHRpb24gewogICAgbWFyZ2luLWxlZnQ6IDEwcHg7CiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7CiAgICBmb250LXdlaWdodDogYm9sZDsKfQoKLnRocmVhZC1oZWFkZXIgLm5hdlBhZ2VzIHsKICAgIG1hcmdpbi1sZWZ0OiA1cHg7CiAgICBtYXJnaW4tcmlnaHQ6IDVweDsKfQoKLnRocmVhZC1oZWFkZXIgYTpob3ZlciB7CiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsKfQoKLnRocmVhZC10aXRsZSB7CiAgICBmb250LXNpemU6IDE2cHg7CiAgICBmb250LXdlaWdodDogYm9sZDsKICAgIHBhZGRpbmctdG9wOiAxMHB4OwogICAgcGFkZGluZy1ib3R0b206IDEwcHg7Cn0KCi50aHJlYWQtc3VidGl0bGUgewogICAgbWFyZ2luLWJvdHRvbTogNXB4Owp9CgojbWFpbl9tZW51IGEuZmlyc3RsZXZlbCwgLnRocmVhZC1zdWJ0aXRsZSBhLCAudGhyZWFkLXN1YnRpdGxlIGE6dmlzaXRlZCB7CiAgICBjb2xvcjogIzAwMCAhaW1wb3J0YW50OwogICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOwogICAgZm9udC1zaXplOiAxMXB4Owp9CgouZHJvcG1lbnUgbGkgYS5maXJzdGxldmVsOmhvdmVyIHNwYW4uZmlyc3RsZXZlbCwgLmRyb3BtZW51IGxpOmhvdmVyIGEuZmlyc3RsZXZlbCBzcGFuLmZpcnN0bGV2ZWwsIC5kcm9wbWVudSBsaSBhLmZpcnN0bGV2ZWw6aG92ZXIsIC5kcm9wbWVudSBsaTpob3ZlciBhLmZpcnN0bGV2ZWwgeyBiYWNrZ3JvdW5kOiBub25lICFpbXBvcnRhbnQ7fQouZHJvcG1lbnUgbGkgYS5hY3RpdmUgc3Bhbi5maXJzdGxldmVsLCAuZHJvcG1lbnUgbGkgYS5hY3RpdmUgewogICAgYmFja2dyb3VuZDogbm9uZSAhaW1wb3J0YW50Owp9CgoKI21haW5fbWVudSBhLmZpcnN0bGV2ZWw6aG92ZXIsIC50aHJlYWQtc3VidGl0bGUgYTpob3ZlciB7CiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTsKfQoKI3F1aWNrcmVwbHlib3ggLmNhdGJnIHsKICAgIG1hcmdpbi10b3A6IDBweCAhaW1wb3J0YW50Owp9CgojcXVpY2tyZXBseWJveCAuY2F0X2JhciB7CiAgICBiYWNrZ3JvdW5kOiAjRjBGMEYwOwp9CgojcXVpY2tyZXBseWJveCAuY2F0X2JhciBhIHsKICAgIGNvbG9yOiAjMDAwOwogICAgdGV4dC10cmFuc2Zvcm06IG5vbmU7Cn0KCi8qcGFnZSBtYXJnaW5zKi8KLnRvcC1wYWdlLWhlYWRlciB7CiAgICBtYXJnaW4tbGVmdDogNXB4OwogICAgbWFyZ2luLXJpZ2h0OiA1cHg7Cn0KCi50b3AtcGFnZS1oZWFkZXItY29udGFpbmVyIHsKICAgIGJhY2tncm91bmQ6ICNjY2M7Cn0KCnRhYmxlLnRhYmxlX2dyaWQgdGQgewogICAgYm9yZGVyOiAwcHggbm9uZTsKfQoKdGFibGUudGFibGVfZ3JpZCB0ZCBhIHsKICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7Cn0KCnRhYmxlLnRhYmxlX2dyaWQgdHIgdGQgewogICAgYmFja2dyb3VuZDogI0ZGRiAhaW1wb3J0YW50Owp9Cgp0YWJsZS50YWJsZV9ncmlkIHRyLmFsdCB0ZCB7CiAgICBiYWNrZ3JvdW5kOiAjRUVFICFpbXBvcnRhbnQ7Cn0KCi50YWJsZV9ncmlkIHRyLnRpdGxlYmcgdGQgewogICAgYmFja2dyb3VuZDogI2NjYyAhaW1wb3J0YW50OwogICAgYm9yZGVyLXRvcDogMXB4ICM4MDgwODAgc29saWQ7CiAgICBib3JkZXItYm90dG9tOiAxcHggIzgwODA4MCBzb2xpZDsKfQoKLnRhYmxlX2dyaWQgewogICAgYm9yZGVyOiAxcHggIzgwODA4MCBzb2xpZDsKfQoKLnRhYmxlX2dyaWQgdGggYSB7CiAgICBjb2xvcjogIzAwMCAhaW1wb3J0YW50Owp9CgoudGFibGVfZ3JpZCB0aCB7CiAgICBjb2xvcjogIzAwMCAhaW1wb3J0YW50OwogICAgZm9udC13ZWlnaHQ6IGJvbGQgIWltcG9ydGFudDsKICAgIGJhY2tncm91bmQ6ICNjY2MgIWltcG9ydGFudDsKICAgIGZvbnQtc2l6ZTogMTFweCAhaW1wb3J0YW50OwogICAgYm9yZGVyLWJvdHRvbTogMXB4ICM4MDgwODAgc29saWQ7Cn0KCiNtZXNzYWdlaW5kZXggewogICAgcGFkZGluZy1sZWZ0OiAycHg7CiAgICBwYWRkaW5nLXJpZ2h0OiAycHg7Cn0KCmlucHV0W3R5cGU9YnV0dG9uXSwgLmJ1dHRvbl9zdWJtaXQgewogICAgcGFkZGluZzoycHggNXB4IDJweCA1cHggIWltcG9ydGFudDsKICAgIGZvbnQtc2l6ZToxMXB4ICFpbXBvcnRhbnQ7CiAgICBiYWNrZ3JvdW5kOiNjY2M7CiAgICBib3JkZXI6MXB4IHNvbGlkICMwMDA7CiAgICBoZWlnaHQ6MjNweDsKICAgIGNvbG9yOiMwMDA7Cn0KCmlucHV0W3R5cGU9YnV0dG9uXTpob3ZlciwgLmJ1dHRvbl9zdWJtaXQ6aG92ZXIgewogICAgYmFja2dyb3VuZDojRjBGMEYwOwogICAgYm9yZGVyOjFweCBzb2xpZCAjODA4MDgwOwp9CiNxdWlja1JlcGx5T3B0aW9ucyAudXBwZXJmcmFtZSwgI3F1aWNrUmVwbHlPcHRpb25zIC5sb3dlcmZyYW1lIHsKICAgIGRpc3BsYXk6bm9uZTsKfQojcXVpY2tSZXBseU9wdGlvbnMgLnJvdW5kZnJhbWUgewogICAgYm9yZGVyOiAwcHggbm9uZTsKICAgIGJhY2tncm91bmQ6I0YwRjBGMDsKfQojZGlzcGxheV9qdW1wX3RvLCAjcXVpY2tyZXBseWJveHsKICAgIGJhY2tncm91bmQ6I0YwRjBGMDsKICAgIGJvcmRlcjoxcHggc29saWQgIzgwODA4MDsKfQojcXVpY2tyZXBseWJveCBhIHsKICAgIGZvbnQtd2VpZ2h0OmJvbGQ7CiAgICBjb2xvcjojMDAwOwogICAgbWFyZ2luOiA1cHg7Cn0KdGQubGFzdHBvc3QgYiB7CiAgICBmb250LXdlaWdodDpub3JtYWw7Cn0KdGQuYXV0aG9yLCB0aC5hdXRob3IsIHRoLnJlcGxpZXMgewogICAgdGV4dC1hbGlnbjpjZW50ZXI7CiAgICBmb250LXNpemU6MTFweDsKfQp0ZC5zdWJqZWN0IHsKICAgIHBhZGRpbmctbGVmdDo1cHggIWltcG9ydGFudDsKfQoubmV3LWljb24gewogICAgcG9zaXRpb246YWJzb2x1dGU7CiAgICBtYXJnaW4tbGVmdDotNHB4OwogICAgbWFyZ2luLXRvcDotN3B4OwogICAgdmVydGljYWwtYWxpZ246dG9wOwogICAgaGVpZ2h0OjRweDsKICAgIHdpZHRoOjRweDsKICAgIGJhY2tncm91bmQ6I2ZmYTdhNzsKfQoubmV3LW1zZ3sKICAgIGZvbnQtc2l6ZTo5cHg7CiAgICBjb2xvcjojODA4MDgwOwp9CkBmb250LWZhY2UgewogICAgZm9udC1mYW1pbHk6ICdHbHlwaGljb25zIEhhbGZsaW5ncyc7CiAgICBzcmM6IHVybCgnZGF0YTphcHBsaWNhdGlvbi9mb250LXdvZmY7Y2hhcnNldD11dGYtODtiYXNlNjQsZDA5R1JnQUJBQUFBQUZzWUFCRUFBQUFBb1VBQUFRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUJHUmxSTkFBQUJnQUFBQUJ3QUFBQWNhbFhDOEVkRVJVWUFBQUdjQUFBQUhnQUFBQ0FCQ0FBRVQxTXZNZ0FBQWJ3QUFBQkRBQUFBWUdlblM0UmpiV0Z3QUFBQ0FBQUFBUnNBQUFKeVN2QUptbU4yZENBQUFBTWNBQUFBQ0FBQUFBZ0FLQU9IWm5CbmJRQUFBeVFBQUFHeEFBQUNaVk8wTDZkbllYTndBQUFFMkFBQUFBZ0FBQUFJQUFBQUVHZHNlV1lBQUFUZ0FBQk9EQUFBaVR3ZUhqTWhhR1ZoWkFBQVV1d0FBQUEwQUFBQU5nSmlXUDVvYUdWaEFBQlRJQUFBQUJ3QUFBQWtDaklFRDJodGRIZ0FBRk04QUFBQkZBQUFBdlRCd1JHT2JHOWpZUUFBVkZBQUFBR3JBQUFCdURTUFZrNXRZWGh3QUFCVi9BQUFBQ0FBQUFBZ0FnUUJvRzVoYldVQUFGWWNBQUFCZ2dBQUEzelVyNW50Y0c5emRBQUFWNkFBQUFOQUFBQUloTGxHcG1sd2NtVndBQUJhNEFBQUFDNEFBQUF1c1BJckZIZGxZbVlBQUZzUUFBQUFCZ0FBQUFaWXIxTG1BQUFBQVFBQUFBRE1QYUxQQUFBQUFNOE1GdklBQUFBQXp3d0pMbmphWTJCa1lHRGdBMklKQmhCZ1ltQUV3bHRBekFMbU1RQUFEYWdCRFFBQWVOcGpZR1pwWkp6QXdNckF3c3pEZElHQmdTRUtRak11WVRCaTJnSGtBNld3ZzFEdmNEOEdCd2JlUnd6TUIvNExBTlZKTU5RQWhSbVJsQ2d3TUFJQUMyRUoxZ0I0MnMyUlAwdkRZQkRHNzIzYVNJclNVRVNzaUhjSVdxcURYYnZGUmUwZ0JKdzZ0VGdVQ3gyS2s5MjZkdXNpeGMwUDRPaVhhUVp6angyY25OUkZoUGlhZ0VOZEhCeDg0UDY5M1AwTzdpVWloekxiSkdNOW1iNnRURnJuVFdoalNBRVZ5TGZaQ2dudDA2MFU1VURhY3JkZDN2bllOVld2V2xKSFBhMW9UUnZhMUpaMnRLZERIZXNVSGlxb29ZRWpOTkZDRDBPTWNZMmJSMHFTcjEwcGNjOFM2UWZSYUVGOUZhMXJvS0VsbnV0QVJ6cUJnUTlCSFFGT0VLS0RBVWFZWUpvU1RmS1d6Sk1vNmVwU1BJL3Y0NHNISjlxSTFtYWxXVkVxc2k1bFdSWlhpTi81bFYvNG1aOFlmTVdYM09jdWQ3ak5MVDdqVXo3bVF3NjJvdXdhZnl2ajBqZlc1S3pMTFRaa1g1RXBYNkIvTFhmeFlmVTNVNStQZzJpV0FBQUFBSThBS0FMNGVOcGRVYnRPVzBFUTNRMFBBNEhFMkNBNTJoU3ptWkRHZTZFRkNjVFZqV0prTzRYbENHazNjcEdMY1FFZlFJRkVEZHF2R2FDaHBFaWJCaUVYU0h4Q1BpRVNNMnVJb2pRN083Tnp6cGt6UzhxUnFuZnBhODlUNXlTUXd0MEd6VGI5VGtpMXN3RDNwT3Zyall5MGd3ZGFiR2IweW5YNy9nc0dtOUdVTzJvQTVUMXZLUThaVFR1QldyU24vdEg4Q29iNy9CL3pPeGkwTk5QMDFEb0o2U0VFNXB0eFM0UHZHYzI2eXcvNmd0WGhZakF3cEppbTRpNC9wbEwrdHpUbmFzdXd0WkhSdklNekVmbkpORUJUYTIwRW12N1VJZFh6Y1JSTGtNdW1zVGFZbUxMK0pCUEJoY2wwVlZPMXpQamF3VjJ5cytoZ2d5ck5nUWZZdzFaNURCNE9EeVlVMHJja3lpd05FZlppcThRSUVaTWNDam5sM01uK3BFRDVTQkxHdkVsS08rT0d0UWJHa2RmQW9EWlBzLzg4bTAxdGJ4M0MrRmtjd1hlL0dVczYrTWlHMmhnUllqdGlLWUFKUkVKR1ZmbUdHcys5TEFia1V2dlBRSlNBNWZHUGY1MEl0TzdZUkR5WHRYVU9NVllJZW43YjNQTExpcnRXdWM2TFFuZHZxbXFvMGluTisxN092c2NEbmg0THcwRmp3WnZQKy81S2dmbzhMSzQwYUE0RVEzbzNlditpdGVxSXE3d1hQckluMDcreFdnQUFBQUFCQUFILy93QVBlTnE5dlFsZ0crV1ZBRHpmekVpald4cEpvNUZrUzdJa1MvSXB4WkpseGZHUjROeDN5TTJkZ0lCQ09NSVZyaEFnaFhLMENZWkNLQTB0S1N5UWNvNlVVTnB1MkczcHdvcTI2aG5TUXJjc3ZWaGFqbTBodTkwbThmQy85ODFJbHUwRXl1Ny8vM0VrelNYTmUrOTczL3ZlUFF6THRERU0rUXpYd25DTXdLUkxoTWtNbGdXZWZTOWJNaHIrYmJETXNiREpsRGc4Yk1ERFpjSElIUnNzRXp5ZUU2TmlJaWZHMjhnczllMC8vNWxyT2ZabUcvc1RoakJGcHNndjRaY3dNdFBLS0V4R3NlY1VVbFdzV2FMNE00cm5rR0xJS3U2cUltUkxBZExKVE92eDVLT3BnaXpteElJc1JLV29MS1RFdUNpa0NrWENQYi9qK1FxOENLZU8xVFlQVHpxZ2p0SExBQTBHL3RIN1dwbEZUTm5DTUoxNGM0SGUzSkF0RThiU3VXOFc0Y3lkUkxGbEZNc2hoYzBxNXFyQ1o4dG1DNTR5QytiT3NzV01teGJHM0ZteVUrZ0NKQ3JXL3NnbzZTS2o2bWIxNFBpV3VwbU1VcHdOL0JmNFo1Z0NzNFZSc2htbHJWcHV5K0pQdGFYTkZJNG9oU09TVlF3WnBUbW5HS3RLTUt0SUdjVmFMVXRXdkZCeUlXVFRNMHFCUWhhcmxrS1JMSHk2U3Qya1UzRmxsWFJWY1daTC9hU3pGQ3VJYmtYb1Y3ckZzclVsMjkvZmoxUXM1SG9MOFVLdXI5Q1h5OG8rT2Q2Ylp1TXhCeXRFaGFoUmdyY3duOHNPcy9tY1VUREdZNmswU1JXTGx4bGVMOTZXV0h6Vi9nODJEeHFmeXkxWkZQYjN6NW5wSWRjWDFZTkdzZ3ZlemRQNlorZWswS0lsdVdjaUd6YzlYcjI2ZGNSR0RoY3orZUxqcCs1NDRmd0xDK3VuQmJ4ZHB3NFgwMzNGUlZlT2REcUQwOWJsbjdyd3FxK21uN3lHd1RHcGtGRitDWHNBK010TmVZR3JFb1hQbEF6YXlBTlJLOXd0eDdZaU9SbEdIOFBhdng3WS8rZ0Qwc1cveUovRVNFeUVVYmlNNHFqQ21CSEZseW5KOEJNbE15ZTZTMWF4djM5YUQrZjE1YUxadnQ1a1BDYWtTVHhtbEx5eWd6Z3VXODYrZjgwVFQxeVQ3dXA2N3BJdi9aSWRXVVBlWDNINTB4ODg1ZGg0OVM4ZUNOZ2NtNUJ0NEZYa0ZlQWRIdWFCaGJFelRKN0lCWklRelFZWTlRcGdjWFFGNlZJUHN1dlo5VEQ2WFVVOHFHNnUwTDNEWTQreXA2azIwalcyRjM2SCsrakRqejdrWCtCZllGakd5TGdZUmtnQWV4TjRGZnA2TXlRWkUreGs2YitmZW9nOTc5RGFRK2ZZN1E4NFc1MzJ6Zjkrc25iZ2RIdks4WURkWHFNRndLUXdaaWJIbEkzSXowSlY0V0FhV1RLSzZSQ1Fzc3laa0hNNEF6Q3VpY05Oa3hFWTEwcUpLMGFKQ05NcEh4VjVCWUU3OWlhUVVobDdmZXoxWXBGTjR1ODdHQlBNbDJlWkZvWkpoa2xobU9URmhKZ1VIRVRXOTNxVGdzRkJKRGhtNUZ0dlgzNFNJRDlyMGZKMWJ2ZnR5K2V0Y2xqR1hCWUg3SC8ra3ZhZ3RLR0RQWFAzMkY5ZGN2RHl2a0o3UUQ2NXdGMW1zWExmNVR5V3NlV2lQOEFBTmVTUDN1WC9oWCtBOFRCTnpDbE0yWUVZdVRPS1hGV2FOTVpvemlqa2tDSlZGY21Gc2tFeHdCd0FkZzlJb25zZng3cmNyWEsvWWhDQjg1bVMyd0ZUd055dnlLTGk2bGVhM1BzSUl4amcvTFFldHdzUWtyd0M4WG1keEJoTEVXQjMxdVZyNlhNbFcyVFNES3pXdkl4MENjTEZKcTlKUFhqMXpzcG5YeVR1NzM1WGZaKzhoK2ZVMzFkMlhxMGVoSk1YQ3dMcFdzWmVwUDc1eGUvQ0ZScC9GcG4xL0xQOEhDWUFIRW1VWUVaaERpRlBPcXFsSm8ybGU0ZlpNSkhoalpXOERrNUk4OFhwcDE1OTliVmQwNjYvNXFyMWZiT3Z2V1h2OFBEanQxdzdtM1BOMnJLcW0xODRaKzRDdm52VmxsbjkxOTUwWTNuTm12S05OMTBMdFByb204eDgvajRZZXd0akE1YUtlbktlS1BHWWlZY3JMQ0QvZmc5N0QvbWx1djF1OVNaMSt6MzNzbHdMRlVWL1VtY1NqL29lK1dmNHBIelkrQnMreHM4b2RoQy9WQXp4d0VSeXB1U25JRS80ZFk4c0ZPUlVJWjRTcHQ1bjlyOHMvTTczRm4zM25hWExqbk5IOXNxZHYvM0Nqajk4NGVjL244QzdIcGpIZVpLUEpZZEliMS9XRnlKZVkxd2lFaGxOekZUK1I1bVpJS04zRVZLOEwxZlpxaWhiSzduN2l1cEhkekU0LytqM2w5QjF5Y280NFhkazRKb0lFMmRTVENlVGdSbWhNR1VHT1lpdmx2d3RJQ2lGakJMTEthYXEwcHBWckJrbG1WTnNWYVV0cXpnelNrZE9jVldWcnF6aXlTanBuT0t0S3RPeWlIODRtME55RUtXWGppTmYzV2V5dWJ5dGNsYmhYU2lpOXBudG9vUzcvcXJTRE84YVY0YXlTa3QxWDJ0YjF6UTgxZUlxUmVIS1JIdDNEKzV5MVZJZUJaUE5Db0lwMk5UZnJ6akZVbk1JQlZRUFhTL3o4ZnlrRjBwQm1LVlJjcHh6dkhKMGY3SCtEOFROMkY3Nk9qQitrRi9TZUFuS1VoQk94N2JXanpDNmZOUFdSaWZRTU1QTVpFYVlzaDJwMTVVRHRKRmtvWXd5U0VuVEM3d3hpOUxEUmRkSFA3eTdTaTJBT0JDdHZhcE16NVpPb253RDhxRVBKSzVQRW1GTW83RmtnRXpjSjU5d1BnUmNJSVZDa3JvWjM4ZTMyZlVuT3BOdE9NeGUzTEF6OXNLSnpqQWdQU2ZqdnB3NWk3bVV1Wkc1QzlacVNvWFM0RVU1cEVPcHQ1aEZTcFNXYk0waExVcHpyb1Q5N2t6cDlDL0FmbXUxdFBxV0xGQm5GS2xUY2lIVG1ZSDUycktVUXROQVVzMWFBZHY5MWRLQzlmanBLbTJBWTV0dmd1MExxcVZyYnM5bVMzZFR5dUZjR0NEYWJPZ2tzYVNZLy9oOWt2Ly85dnFRVkVHQ25lQ05qUDdmem1mcmUrVFI0MjBlKzYvLzZ3V3d6dGJrUmVNWXI5VjVmSkR5ZUMrZC9rdHlTbk5WbVlPanFweU9ZNnFzaGhIZE1HRkU1Uk9NYUduajhVZlA2NFBkUGppY2hGMmpOUGs4amdieVBaVjlVWTM2SDdmL3lkUm1EK0RPMkJ4OFAvNTJJODNIdi8wcEtJb3lQTVRFK0EvNERzYkFNTEE0cEVncVJCN2hzZ2ZIdnZZajhySjZPdGNMV3ovRzZ5NWtMdVRuOGZOQVR1TjFCVE9SelVRd2t3dEpVSDNySUFtUzRFSDFMZm9HSDhNVDl3L2lOYkJXVGRBTlVzenpFN1FEVUF2aU9TVlVWYUxaY25NSTFaem1KR2c4b1diY0RFVkF2OWIxaDdZRy9TRUpBaXVjVlJKVnBTVmJUaVR4MGtRY3ZwVk00R2F5R2I2VnFHc1o3VERTU2RBeXlxd1BSSGEva2hBVmQ3OFNBSzFEZGdVYnRBN1pEVnFIcTc4VUF1MWpIMk9RL0hpdVNTeDdBNlMvL3hOMER3N2tlVTdLU1hFcG52OVlQV1Jlc1FLaS9oTzBFZlVVdkFpbGU0MTJYNmEwaXpCbkhFK3phcG1xV1VWMXplbzUxS3lhUXgrald6Mkh1bFZ6K0JPMUt3NldzWS9IRExVRzhyNk8ySTVyMVZjRkgxeGxxaUgySW5HOUNJaFJYWkdSK1FkQWYyaUMxWDR1ZzRhakJkRG9vdXVTVUMwTDFKZ1R3SmhUQkZmSkJoaDVxbVdiQncvYXdJNUNrNmxrRTJDUVpIOXpIQUNubXBtN0lJRTI2d1ZnODczSlZON25CZzJOamFWWm9rMWcxSGZwQkpaLzl2ajVXNCtRczQ5c1BmL3huNTIyKzlWM1g5MTlHdmwxU0NyaTdDamlBdlU4YVJ0K3JGQzVwblRrU09tYVN1R3hZZldYejIrQnErQmlZaHRmczJEZExUSUU1RktwcnNkTVk4bzhyamdtV3k1SEZGZEc0UkVmUk1JRVNGakJUTmJRY1ZaTElwVTJCYkN3Q1JqSHRiOGlHQ05kRlJqNkNrR0RoQnhXYldoNWc2S3dBdWtXWkpyNFhmd3VaajV6TW5NMmcweXdvcW9zemloOVFMMlZsSG9McXNvQ1Yya3AzQU1XdEZWQXB3VU0ybEJEd1BaTHhYMU9LZGVQck5EcUxnVXlZRmlXVmdETGx3UlFZSlRGNGo0dW1wcUxaL3ZjcGM2VGtPRTkzZ2pyaXhEQkp4ZGtIMnptc2pQWnZwbEU3aXVrQ24yd21lL05zTWtNS1NSVFFpb0ptL0dZa3pVNlNjb295SUlSTmcyb0ZFcGVZeXdaTk43UE92emNpdTdCV3czZFBZWmtXNndwa3pTbU00YlBUWisyZ3ZNN3laY01oaThSbDh5dDZCcjhuS0Y3bWxHN3dwRHRNdHc2a0Y3QkJlenMvVVp5L3JieU52alBuaEp0VHhwN3VneWZHMGlmekFYaGxNRndQMnNQY2lkM0RYM08wTldEWDI3dVRocHpIWWJQemNpY3pBVWMyczg3QXR6Sm1SbWZNMlRTeHVTMHdQcHQyOWFmc20wYnlFS0JLWDcwRWE4WXZLRDNqMnVnQmVZT3BoekZ1ZFlLMXY2MDNpd3NGYWxNdVNQYmx3TjFvYWtLS2lZcUZZNHVPSjdKVUxzVnpQdmdJVngxV2wybEJNN0RyTktHbW1rNTBVWWxGQU1NM2VaQ2VhUk1BeTNWVmVxQnJlNnMwbHRWN05seWJ3OWUxT3VCaTNwZHFHZUNVRVNIQUhXaTRDSlNYMGthbGhNUHFKM2FGcktTQjE2b2JucjA3YUxUUWp3RDdhU3JmWUI0TEU2SDllaGJWa2VSdTJXZ2ZXeE8rMENSeWhqa00wM2E4Q1JyY1JiYkJ3YmE0WHRacThOeDdCSmt2dmJCd1hiMndOZ2M5Z0JZeGtmM2E1dWF2UVIvQm9uL05kZ2dYVXpaVFBWMTRIdlF6ODJIVUZjM1VUMGJxUVJNWHpLWVFQQVFPbG5OSkY1enVyQ2o3QzBWOVNEK3NhZXd0NHh0SGR1TGNvUmRqL3lPQXZCdGtCTU9SbVJpVEJtTXBVNkNYQS9TemxndEd3a1N6R2dDaWVEUlpoUFZTZXNVSVNJcE9xemtWMlRVWVQzMmpOWEJyaWRkQVg2YjFhSGF4czRBOURnMzRvNHlsbWQ0L2luK0taakRIdUNCN1F6YTRNNnE0a1VoVzVhOWVCdFpnbkh4NEpCVHd4QWdzTU9vdVVwZVFIRDhvZ0JjSkx0d2NzTzhSNk94NUxXRG5MSndEZy9NckpJb3c0NlpkNkt0eTVTOFR0Z1RHTHNMVDNud2xKR0lObDBRdTF0YmVMZUw1VnRhM2JvQTlxQ0VrUGc5eEUzbUVQZWVQZXI3NmdIMWZkK0haTzJISDZwUHpBZVI4WTNHRTN2MnNHZXBUM3lJcDhkVUlPbEJhaXV3SHozSU1BWXYwQlRsVlZxM3NvUWNZZ3dXbFROREhROU82bmdnWm1SaGxHTzZ0SXFUSEFkL0pNckZPVStPaXhmSnN6K1ZIdmIraER3NzlsYjdCMjA5YnpZOXdTdm9RRG02Z3E0Rmh6Vy9ENnZyNk5vOUZ6RmxLOTVUdXh1WUlDUTdMaXJMdklDMzVobE45TnVCamhZcUswc0NENUtLTllPa3Nvc2dYNmxYREwwZzZLY0VpS2p0UmY2a3ZvSHlVMzBEdG43ejdMUFVqd2NpRlAxNGxTS01NL0FyMlBmUEFoUXlFMmJPMFRWSUQ1M0xCaGpZQ0IxWXNhcUkya0lLeW1TenF5VEJGaWlPTGJpa2lxSjd2NTEzeTFRM2FCYVZjTDhpdWZmYkRCNWZpSTZwN0lFMWw1ak1URkJmVVh1SDJXeVlwVXNScVkwa1I0VTlSODdhODhiaE4vYWNwWDJjL2dGWi9jRUg2bE1yZGxWMkhTRU5KK0NEWmRXblBzRHpLcDJ1d0xRVGVUYkliS3p4ck02aVRRMHNpcGlBamV1djgyVXpZZ0o4dVIvNTBvdVkrRVZGNmxmZ0NES25qMkxpY1NJbVJvR2hldER4V1pKcmdva2NGMC9Fazh1UEhObDFZcTVVejlad29VekMxbjBLaUUrN0xrMkFSMXhVc1djQkpXOEdSd0tNYnpPb2NqeHhVSjBzTDNxaVRUVlptSk9qaFJ3WHJYQXQvMHBBMW0yM09pcVZMT25LVmphT1BSd2d2MExKcFNaZzRwTzNZSms5UElHR0V1Tm41alhNZTZSaGdOSVFZTERWS1JjRXlvazJJQXh2dG5BK2YzMGFVMEw1NUNtRTh1ajZTQXZNYk1PSnlQUWhtVUhhSjVPSjdJY1JmK3BKT0g4bnVic0NuRnZUbVpxWlZReTZtV0ZzeFl3U0FEaERGRTZBMitrcVdUUmVEUU9jRm9UTHdIdThjZ0NIMkN5V0pCK3UrU0tPUEdITVhna1BCMFNGQXUwTnMraEFqbnVOTFVrWE9wbUZxQ2pBaXU0Z3NxNGs3VHFpZmhVMG90c3Z1WWVNM3YyVmwwRWpZbi8wcnFZV2JRRlZDVFNxay9ITWRhZnRaalFkajZId3VwZ29jeDFURm5FOFlYNzVxbVZmQk9lNEx3aHozSTd6cm13MzRBRTdneTd5bU9hY2dJSFhHRGRZTGNVQkdSZXFNYUs3SHdGK1hqQllMYUNiUkJIK29MdGtOaUZhdmdnc0wxRXFIc3g0blFHZDZKckxEckFwaU5GQ0V0M0duQmdWUUpIcHkrZGdUc1pqS2NSdXk4dGZ1VnZkL01YTnQ1V09MQ1NqOUhPWGRwaGRqNHJmZFhoMnhaRVNMazM0U1k4eHNPb1ZkWjQ5bmg5ckJhT1lNb28vaHlJdW1NV2dSSE1PQnkyVVJXblhra014RTgwaXI3WG1VSGRQWkttSll6cFV0cm04cUd4WXEyV0gyd2RicURDQXRNT1ZEWmY3QkJnYXFZYVhCeGI4SVJLVkVubnRwZm1NdUZ1T3ZWbHpFcUVNSEgraDF3bmQ4dHJ5ci8wZjIxdXM3emJJYTlTSFFGN0xPSFl0bW83VENpTjJDRWFsYkFqaW9CbFFVZ2RkdU5RcERnQzRDUTg2UUlkQkJZZ3B0ZUNxeGpzTVFUb3owS2MwTUc0dzV4cThTYURjYU9vNUtCOWJWcEt1bFZ1b0luSnNLMmd1SU1XcDNWcGsxN2NQVkZadTJiS3lBZ3JNWGpqUC9tRVgxY1IxWFlINmdUaVl5N0sycm1Fa0FibUpxOUo0QXBBUTVLNW5tSVRaWVZJUUhTVE5HUVZBZS9DMmE3WmVmbUd4dmUzNlcwWnZ1L0pVTDlLUGpBNU9zMGViRE10UEpvZFBubXRwYTdQTVBSbkp3dWx5Nm43ZzZoN21KT1o4cHB4QjZnem5sR1JWNmFQakhBSXlqZWkyREs1aU1hQk5aMVhwZEpXeXNEVlFWUVpjSlJkVkcwcXpnYld6blVBam16WFVUS1ZKTWdPelUzQjV2Qnh5dHczV09pZktPYkZ1eFF5VGxqQ1J4dmZUYk16QlNoNVJjMHNnUWRFdGtaaTA3N0NDUXJmajk4VDQreDEwODV4SDNuajdqVWZPcWRoTWUwdzIrc2F1SDk4bUhwQ1NWdEoxNDA4dnYveW5ONm9IdGIwcjRRdnd2U3ZIWGlVL3hBdlZYbnh2Mk5ibGVJVmZ6NzNOR0VCblk4U29RVFJFU1FIakl6SllCU2t3Y3pXcHp5bzdkc3l2L1NlaklMTXI2cE1OaDJxL3hXMm12K1ZrM0F4VkV4eUhVTDZKZWhBRWZ6MVJBQnREU0lHWXJmLzJnYm1YWGpoN3JmYXIvZm5ibnYzNnJYMlgzSGxQYmZ5K3paL04vWlgrWm9nWnBIRXI5QktIOWQ5RzM1QkhFendSR0IwUHJEYjdYRDVaVzk0Smd3cWN3NlB4YzRCRUUyS0MxTzhQVnBJRWhyTmNRTXVJYU5DUWV5Z3Nad3JYWHkyY2JOdzVhaVIzQTF6SDNxeVFWd0N3SjI0dFhITG4zVlhUL2Q5OVlaZHB4RlQrM1Z0bFU5MC9yb0JVRVlHYkF3Qm5sTm9rTTVuWllQc3RacFlUb25GNGFkb2NNRWJjMVhKN3oxeVVHY0ZNT2RXNVJETlF5b251cFhnc2xpbXhSamdTQjRVOEMyaVdIQXRnTDFvdDlTNUVmK2NLTkZwS2hqRDZScXNsRHFPU0ljMDdaa2ZUSmxkVjh2RHVLcVd0blVvSGRibk15cGJUMU0rU2pwazd5OFRxeExza1hLVUNmR2ZPQXRnZXFKYVNpL0RUVlZvQ2xCekpLc3VyNWY2aGVTakxUb2FMcG9WZ1pmSksva0R2VEZSOUN3bFkwTnZhcDJPb3N4UnJBZ3A3dk5PcG5Sb1h5L3lNQWZUWmhOMnp6QVpmb0s4d09EUnJOaVYrVDFTTTU5SGRrc3RIMFptdUNVY0NMdzZFSW9mcVlCNVVRK3FSd1l1MG95QUFvcmlyWGMyQnVDUW9RdUZGRHFQZFRVYUxSZFZHdFN3MHhGRjRkbWtXdWVhamgrM0syRjc4d0V1b2JOVmxiQmNJRFl3aEhzQjNsS2ZzQWZ3bGVsR3hBbHRGN20xa3pncUs0ODE0RVFwbzdoWVF2bk0wUDc2NVB1NVQxNVBObXZWVDVyM05PTHIyYWtrS1piUDBHTlZjVzJuUVVQTXdvR3l4WlZHdFJYMFFUQlFyeWhxMFMveXdCWlpyaytieGoxZFJTSmRjR013UWpQMzlwU2FRMWpTY2dmNS9OQ0dCUENtZ21Jd3JEWHhLOEpuWFAzR2ZvbDJwcnlLVkN2ZjIwUld3eGIxOXpGODU3YlRqZms3UTlRUk4xeE4wanhaUHRUeFVabUNLVTEzUExRQnJNRVlyMWZWRUQ2NGNac0o0WlYrMjBOZWJTc1lFQWhidTYrd0JzT2grR1FxdkNvZndEWWJnVnhZbjZIbzI3bmVyUStGd0NOL28zQ2RnKy94YXYyOEE1TGQyWnptbjNWenhabXUyblZtTCtOSDc3NGY3K3dLVTU1cklWQWdTT2ZTZUVsQTRkVUIrb2QwUTNsaHJFWTlreVlzSWt0VXhDU1FGOStGa0xmYW8wY1FDczF5M3lqUzkxMHFYRWt0VnNVd3dweTBNZWpRRkU1MDFBdTRRM2tEcGxCTUxvTHVCbmhNVmk4OXlYeW1PdVl2cyt6eDU5cGdmV0xCSWh3Qmo5M1M5TE1IOUdNQkE3RTNDT215VUt1UkY4bUpJT3ZhbUZDSUgxTG44Tm04NDdHMVk5MUEvbDBHN09ZVXBKeEJHc0pBczFHYTBjTFhVQ2tYSWxqbkxCQXV5amFJQTNNbG1rVUZObW05RTBGeXpKaXV1Zjg1VVRQUGtBWU9oR2crVE95cDVZSXRMRTRSTTRBckRCUFdHQ1BGUmxhRUM2Z0N3M0xFMzgyM3NpdUV6V1pkRkhiYTQySkVrNjdHUXd4WVBtMlN0bHJHOUZod0RtTE56S2hYMnRhMWJ5YW00bGgyOStVc1doOE9DYnhQeUEwSk1ndWtHdnJpVVppT0FxR3ZQS04yZ3BtVmdNaEZNL0FBc0l0VnloUG9uSXhuQUx1SXFwZWp5WHNvQktoRVlCaVhRWCtwTUFVclIxa1FMWFRTNjIyRXZFb3VqUmFoRXhWSzZCd1NheDczZkdnaG1wbW1La1piZG9Qa28wendzMkE3V1NiTWNHSFNoZVkweDF1dkQ3SWNZS244RDdkemJxQnp0NHAyNXdxcU9TdnZLR1dtcmJSZG9Tc1hSeXVob3hUaThmbmg0UFFIcTRGV29OSm1hNXVZN1lVZnlEclNES1F6WGpKSVd2R2o0VEtydjVlbllQZ3MyY1F4ZUd2ZlpjMHE0V21adEtOMkpFcytVV25VdE5BK1c3RXdTbFdFWXBHZyttVW9UV092aVlBQTVpSk1Rait6Sms0dmJoMXM5cDVQYlZybzY4K1Jyc1RaMzJHaFVienhEdmN6ZmJPdHdPc21tY3ZyS0VWOWYxNS9lNkY0M01rSTZQR21Iblh2cm1IdGFreTBvQ09SZnlTdGZVTDhIUElmK24rOEJ6N1dBbE9oaHptWEtMUWhadEtwOUVqbytIVldsSjZOWnVzQmhkSlQ0UTNBTkxsWlJXTFl3dlFhMDY1WkRJakFySGFWRUdrYkpCd1BUSG9XTjVuNmxRNFJkcFFlZC80QmduaVpIcExsVTNvRGVTeHlKTUErZkpKNUN1d0dIS0s5dHhFRkhaYzIrMWdqNXhUWGZscU14cXcwSTNkdTU1YkhsbGErZGN0TU5aejcwK1NVWDdkMTlpcEJyNHdhYTVaRGRLY3dueWhjS1p4VGFUQUpueTUyMFpkN3F1NWRXTnE0KzllYmk5VXRYYnF6UFMrNVNxbnUzNkNOQmFKZ1d4SUFEbzk0b292UjBCQVMxNE9uRElVamxvN0tEY3hMTzZKT2x5dElyVEU5YjJ1WWJ6UWJ5ZFRZNkl4WXdHRzZ5VEp2Zkw4ek9jQ2RQYi9VUWp2VDNtK0twaE0xMjdGOTdCNDM5RFB2UmM3cGZ5QXh6WUJ0VGJ0THN0VEpyOE9HQ1l3T3V0MUd1ZHdIWFc0QWprbFJRYWhvdVdwMHdXMEFIQ0ZGZlE5bFBBem4rSUFaeS9EU1Ewd1JmODJ0cms3T0tjNlprQWRsYU1sRGJMZEtreFNSc29zTERFS1JnOWhma3VKZ1RQR0l1Q2pzd0dwMUVsSUhkQ2lLWXBKeTBlUEhpRzI2QTE1RmQ3SUZkV1plVWpzWXFSWFZ6c1JLTFpyd2lxSDJQUDM3c3pjZTVjM0NaRGFVa00zdnNtV3l4bU9WV3NtWXBGYUpyVVBTamIvQjNnZnhEZk85Z1FPMENmTmtxTlZFYjBiVUEzRTROWGN1aFQ0OWtDSFNiZmF6SlRGRFJjZm5SR2dKUlJzVUNhd0w4R1JEWlNrUUUyUjJrc25zbUFTUmxBV1FmZHdMVW80OXIyQlUxMUwyWmNkVFRraXQzZzBZWjdzZDExTWUySU9yc25UWFU5WHlCeG5ncW93c2dqSExTWmVEVDdvY2tmZ2xhWWtmMzR6dlhndSs0aHNEMjIzVGJUeU9ZNjJrRWN5K29McmlzMEloTDVXTzMvaDVZeFVuN25rODRQeEhXOGUzS0NjT3RkWERJNGZxbXV2bDRSNDhEYjFMM01vSiswWjNCNEVBb2c0a1lReG1sdDRxNUdIcSt4UkNaR0NmMjVEL2RmaU1teFVheVZ4ckhvekpoRUxTUUZ3RFBYbFRmVk44KzN0R1B4MHZEU01QdWsvQVNQM1c4L1BpamRhTHRjYVRJckUvWVJKUk14ODB0d1B5UmxUcCtTMmgrd1J5YVEzTTZ6YUZaVGZNTExxTDVCY1VzWXJ3MWh6R2NLMEZNM0lRNlF0blZNaTFMc3czSy9yYnBhUFhjL0wvS0REbGU1c2YvalphMUlPZkh2NkcvWmNJYy9zVHRUMEgxWTZPZlpvU01IKzNXeDhjSW1tcVE2V0JtTUl0Z1pVU3JQVW16M2RKQTljVVpORFExODV5dUlCaU9CeWxLNDJDZlhyUk5TUGc0OTVYSEhrUHpCbWNPem5PY09URG51M0JiUFRnKy8xVmJEV29VQldBV29oeFdiZnlTbzIvOXZjSU8vaG1walNJMThPTnN3RmRteXJPb1AydHhScGwxU0psZHBlaE82eW44SDNIRDBMTkhwdWxvNU5QaHg3VVVvNDlYS24rdkhELzZGanJWMk9RTmk0dUxkUitSd3IxTnZUcmROSE1ScGhoYWZ4NnFZb1AxNVlXMTA4elFmQXlteE50MTV5KzZYQ2FtbVlIbDBoVmgzNDkwZFVYRzNKRXU3aFl3MXozc25YUi9DN3lUb3BhNHl6WE1jeGtvZTRvK3UyRzVyNFZ5YVI3RkJOOXpxSXF1RUQzOGd4a1ZvUUJBSlBZcmtsanl1S25pQXBDVlhSNEpYUlJOb3VMdG41bzRONU1ZVXNRalJ0MjZKaDkwOCtzOWdZRG42RjUzc1BoWDByR0lKTjQ5NXI5bzJlWmx5elozY1lmZHdhRDdtQTNlMy92R1p4OGt3K3FiNUxENkl6eTNET2gyNzBjZjhzMzhDNHdYdFBRaEhZT1FCbnVFd3E3bGdLQXoxcVFGckpva0lKMmRSMWhEQ0t2QStLbWU0ZWtGYXlvYkpsNnF0YWY1VkJKNWlab1l4bnV2L2VsMTEvL2syb1VMLzdHLzN4STc1NHdyT21lK2VQK0ZtKzYvLzlBdTlvOWJmM0h6dGxmLys3N0wvM3RreEJ6YmRPbWV4Wi9mUmMvY2p6clZlSHhOWWhhT1I5ZThXblROMXhCZDgyaEVsZEhESnVvZ1lvakNnSkc5a3RjRGloSkcwWTRiUTh1SnNZbWhzNlZIRldWeXhNeXNmdlVJdHhaZ3Vvcmh1WDgzT0JrZjZIa01vTTBWd2tiVTZvVTBXd2dUdVpCbVU4bSttY1JCcnBwejhSVlhoS1dGeTljdG5abFl0dTNMeXkvLzNrM2JIS2VkNWhKOGFZdVROWnRQTDVCZFozN3phMTk1YWNQOHU3WmNmY1ZWbjV0N3lnUEZBZDU0NWplM3Jid29lTGJSdDZodDRZN2UzQ1c3NnZieVMveG5tR1ltQ212bE9xWWNSR280cXhnVndBRkwwUUhUb2t0SURWKzExSWJVc0dFY09CUkcwMUh4aWFWSURBbGl3bEN4Rk5KQ0hyeTRyeVVXVCtndVNPQTJYaFltS0RvRlNXTzlSSUdreklCaWhyenpLTGtrOG0zMUZUUUl5ZUgyZ2NvN2o2b0hIMzJIN1A4YWVmQnlkUlA1MjJXWFNhZWpvLzNSZDR5bWI0T1JhTU1yYjZqODV0RjMzcmt3U3g2OERLNzVuOHN1VzlNOEhzKzlEK1pTTTVObUZ1aVl3YlNKWlpSVVZURnJzOW1sR0FITERNWFNYa1dISWxPS3VZQUZwVkFyc0dESkhJUzVsT2d2OFViNFROYW50bXdVNHVPNDVHdW9rR0V1UWlRemtXSU9BeUJqWUc5ZGMvZGtaQjRQbjMvK1dlRVErWXo2Z09CZk1IdnQ3SDROb3hVdDYyc1lQWkFIaEVnMDJlc3hFL0pUTW9jTS81SjF5TG5aRjQvanRaZjZBZUs0L2pmcGVKbTFFV3ZWY1JrUCsxUC9HWTN3QytFSStpOHdxeW9LNDJVR1JQZjV3T2JYeHF2VUVtMFFYaWNZTFRPYklpbkFyV3RvcEt3K01obTV0YVNKTGR5aHJyeEh3MGt1MVZDYVcvazY0clJEL1QyZVAvbUxXbjYybHBja00zT1pzaHV4OEZIckVld2JzMWFvNHoya2NGbkV6VVFMZFVvdUwweENJNVZwUHN3SnNzc3dIMW14eE5pbzU0MUlzRWFZU1J3K3pDUVBIMmJNWjViUUd3b0NOL1U5NmcydGZFOTlEZDRyN0dtazdXWHR5TXZxTDlXREwxZW9NL1hsY2Z2MkZxQ3hCNmlzUlFXdE9lcjIwMmdMOEVqMVpBNHRna0hnVDFPQUtwcDZjbGkxMFkyc3B1V3FpOGwvSE4xUDNsWVgxWEliYTdJZUpYMVpRais1M1lrWldYNTZGN0dHTlZNTFNkWHVNbjRuL1VZMGUyREt6ZFNBZmtOLy9hYUV1YjJ1cDNqMWVnN01oUkV5Nk8zQ25CZnQxMjluZS9FMzJTU2JIUCtWQm4vY0V1UkNvQzR0bk1HcktGOVdtQ0ozQzEwdkl3eFRtSlRRTmpuQnJYTDg1TjFkeDlmZTlIc1grU1gwOTVuQ3VDdEtjd2cyZm1rWEx1Z04zME02dDlWd3ByNEtReVBPd0RjaUxORGtNTnM3OWtOK0NTS01GU3JrN1NsalJHTVpJTmx6TmVia3N5ZzBBdldmSVpQaVdYazhCc016cnJTaXFvVjNnTmR6NHlZbitRWU9FdHdQc3d5NHQydDhSMkYxYUh6bnBoVloxcXJPZDlIajNhdXI4VTcwUGhQdW9jVWZRYWZoMjZoTzQ5WjFHbFJvVUZRZ08wL1d6YU5rZ3BuR0x4bDcvVWhkQ3lkT3RoZG85QzFHNFA3R2Y1M202R0xxYmVwYjdJby9xdytSalg5bTE0MHBmeVliWVF0eGMzMzBNMzRsZnlWYU13a3pLUkJaa09BZzJhZys5QmQyVUNKanlvdjAwckdYZklTTWxUUlp4ekVjL3pUL05QWG5qdERNQjBjVlM5WVFhdi9VekllQW52bXdEek1mcVA5Q3dqUlp6SHVZbXZXUUF6bUJTbVZjaW5ON2lBZmtyR2ZQSHZVOTlZRDYzaDBWK28rbU85UVA3dGxEVHFhSEo4RGxCQjFpUEM4SjRYSTF3R1hYNE1MY0lQc0V1R3dXakdjd3NNVHdzR3FXaUxGL01ualJmSFFLV0ZoNGNSeWdwdElxUzJIUzlWVi8zUW1tVVVnZ2NFZWJDOFVvajJEWXBTazNsd3R5SVZWSUNTbEJuZ3pFcWxkMzdIaDE1MDU0UDdoakNpeHR0VFB3UGhFbWNTSk03Z2FZUEhXWUhPTXdPYWZBQkp3bHBDWkRzNGw0eWU1bjN6MXZDaVMzcU8rUTNjKzhlNTRXVHgySFl6b3p5RnhFSWVtdktvTlVGNGhTOWJwWEc3MGhPdGZDVlNXc3VXVUJ2bUdBTDR6clRiUVgxcHUwdU4vTXQ4MFlvTU9ZR3RTSFVZbUtTZ2RtS3BkdHpqUXEycjFpeVVpbTRKRExvb2Q4MkRDRDVoVjRqWUtEbDNQRGZMNDN6V0dscEFmNGNUS0dyOXpGT3dVamEyRE52SVAzY0I2ZlNUWTRVeUUvcVJqYzNiSG1lTStjbnFic3lYT1R0MC9sVnpiQUdtMFd3Y0N4eE92eTJWeUVseU5EU2M3U25sMmZ6UzFwOHh2OStRMXF1amlCUGhqSkhhaHh0RVFYWkRkTjR2RlZNZGVJSDNmdGx0eFNqWWQ5cUIxUFJiY1F4WWduSnB3ZkQ3SDN5S2dXZUp3SytCMWdFQlVyY0w0eER1Y0hTL01DcHV6VjQzQVJXaERGWk1xT1FEUkhpNmpLdG5nM2pRTk1RK2xjTmpTM28zL0RVeTBMNFJUNk4zcFFjd1VWWWw4c25zN1E0WFBEbmlMMWx4aE15d24xSzBRc2g5dmF0VGhlUGpkTUN2bWNGR1psUU1CQkJDbWVUNU5VRHRSeE9OcFhpT2R6c0FzSDRWUk8rbDdrdHM5WCtyWnNjdi9nQjRIblQ2bDg0ZmJ3QnYrbGl5djM5YjVTQ1p5N3FMTDRFdjlQeWVIS0RmY0ZLeFh2aXMvT3JaeTNOL3JTUzAzMzM3RHdZditQZmpUdHE1VkZGL3AvK0FQNW9nVVZqVjhiOCtZaTR6bGZucm9KV00rYjB5VWZHbjZZTTBWenZyekJpY2x4TkMvZ0JNbHhEVmtQSjByOVduamJiUmZYL3A4NGZmTlhEVmN4VS9OVkorTVFuSXBEMHdRYy9KTndDSHdNRG9BQk9SSDBtM2FzKytGTzliRVRaL2pGZDZ5cjdsUWZud0p6a3c2emo3SS9YeThPMVNSN1FJT1pGb2ZXY3UyY1hncXo2Tk5oZGpRZEo5ZE9KcGppNWFIcFhiMnBLVkFQczlPTFZ6NzVZWFhqNWljL0hKaWFiM2RGa1MwTWZ6ajJ3Y0NIVDI3ZVdLdFhQb2Y2S1l4TWtPYmNZVGhXMTI1S3JBRVltNkhLTWMxa3h1TGhzYjFzbkx4RXM1bC9QdVg3ZXA1SjdmdDFYeFhXb0lPV3BIMmZwcXgycVFQcUxOS3R3ZkJEbUtPTFlJNGFVVTh5VUMrUVFIT3crQ3IrVUlrM05LUlZJeUEvSkMrU0Erb2hyWng1YkMvV0ZPTHZmQVlHNGEzYTd4aHJ2MFBHZndlV0NjWFlyeGR1ZzNyeUdkSUdzSFNvTTJ1L1U2UEp2MUs5RGF1b3daaEcwQjJjY2Q0ZC8vRWdYbldXOGcvYks3ZTgrdlQ1SnVMVXNHQmI1MXpWS0d1TThFMnhscC9seUpTY3VvNG5FL2p6d0V1TXlqZVQ1RTcxOVp2ZjJVbVNONnViYnlhaitnSE9qRWRnRjM0dnhzVDVuZnhPK25zTUdMcFJFV3hkN1ZkaUpJVVhxYStSdlRlVDFFNzF0WnNWT0tKdTNxNit4dWJ4eDFJNzFOZTJZMjBOemFsOGdPclZjV1k1MWRwYXFrcWMrck5EbVZwbUJXbDBDcGsxcXkvZ3d1eEttNTJQeHJVczBEaklhVE11VnlFUjZOay8yVzlCUEdHQ2Fqckc2MUJOUjdGZHk2elVQc2phR1h6YzIrZU44ek40di9mSGtuOGFTTy9manArSEQzYWUrak52S09RbGFYZ2Zld2xrdUtGTzF5VFR3VXhqZW1HRjZXWEtLWlRrUFRrTWpxTFVoc1c0aDNabTZLV2RHWVlBL3Q0ZTBiM2ZhdlBrWjJoaGR6RW5SV2x5RE1EVjE1dk1FS3l5ZDhKVWcwMmNWVTdpSUY2SmxyTjZZbGdFUXJOdENtSE1BaC9GOWVSU3dyRXg2MUNxSmZTZlByZEhlajhhU2cxWjRpeDdhUkZ6d1l0Y3pPTis5VmV3ZWRmM0RZNFdOOHUxYUJaaWtWZzlwcWRTMDhSUnU4OXZHM1dua3lXVDEwSm8xNERERzZabC9obTMxTTNjTFMvWjJ0ZjFJeDk5OUNmK1dWbzdsQjNQODh1QnRvRXBzS1ZleWsxU3ZwREdITDloUThITE92ZzBHeGY2ZklXK3hEQW1FYVNTTVMxV3pRdS9OSnM0YVhvNmM4RzVYNzdqN2M5MExmck1aWis5NXZyVFZ6blBjYWRtRjhqMGVSczNuZGJ1NDAyQ055ckd2ekkwcE41MWl1K3U3K1lIYnpwNys4RGdtbHgzdUQvOGd2ckRuK3hla3pNYlBjN0NqZlpWSTN1VE04KzZhWFhXYXphRUFya3JXbHBlK2lIT21Vc1pHeitIL3c5bUFYQVpVUlpTanBwYlZlYTZTb013Rkl2Z05UZ1gyR2RHSDAyOWNYdGxXQWw5R3JCaEFyQ0NMaE1taUE5ZjZHTlRQdG1YU3FiU2JBRTBuRERuNEFVamJwTkxEZVo1OHlJak02YTNPVnNjM3VWclJVUEVaekU3T2M3a0NMVDYrK2RzbWozTG1YejBIM3hTYXI3VHZYeVZJV2Z2T0g5UjJzbmFlQk1oVmxmUW5ad2hDNDdlbWVSYkkrSHBOM1pMbHNUd1VIamt2ZFNLdmNYb3dpNlB0OFVwbTZ5RU4zcWJoMlpmTXZzcHN1cmlyalVQR1ZnaCtyblg3ak5GenJ2NDhWVzJnYWJlcGpZNTRPSXQ2YVZyVzlLWFlKMzY5NWdiK1BmNEhCTmxaakx6bWRrTUxrL3RWV1dHbGs2NklLTU1IbElLMWRKQ0lFSUJWTDVaRm5NZ2FHcHZ5dy9UUEMrbVpKNGh1cDlueE5aMGZuaGtQaFg2UUJkak5teUlBRm1Nc2JRaFZRZ2Jza0NaTkovU2lvM3l2UVdqN0pNTG1KZ3dGRFEyejF0K3haWXZqbjV4eXhYTDV6VWJnNU1QN0JabWQ1KzIrcnFicmw1NVN0Y0NLeW1FWnZTSGU1VC9VZExuM2RwendRV0pKUjR2dTc3TjByWnU5WWI1bWN6OERhdlh0V0UyNk1SOXk0YWhNNmQzdHVWT0gvaU1neXhNekowUldIUUtscnl2V2JqdWlxMnpML0J2YUczRmFRcTBZSUFXQ3VPakdRMG5NVjlqeXM2YUpUcVN3V3hRcFMvNDdhSC8vTTlmTTFLblJYR21IWXJ0TzRhU2cvek5vZGkvb3poZCs2eE9tNmR6bjR1K0IraDdrTDYzMHZjRXZwZmhiTXVkTFhmR2pXQ2c5U3VCZmlYWXI3VDJLNGwreGRyUFBHKzEyVjJCWUdzaXJmOGpzeXh3eU9HY2NEQ2RWbVlGQ2FQUkd0T25jeVNPQkM2NGthdzZnV2NTbXZvQlZ4U1NNQWdzRGdoZkovaUNvY0hFdmVyTDl5WldQbmI1QlNuTDdwODluOWgwRnlWcVJnN1BjRHBJVzlMWG5ZbE44MlRJeHM3VTdKdlQ5bUJRU0p4NjdoZkh5UzN1UExyaUx1bmM4NitkN214VDMrcmI0WDc4RW8yaW1YWE5LNXVDWTQvZjdVeG1relA5czlnYnA5M1RkOWNzYjF1YnJYZlQyZWZSL2doZkJlSG9wdnFHRzNQUms5U3RrUUtRQmJTa1FYMld4Q2FTajEvYWxEQTRFazNTMkRidmRPL1l0djhpTDVBWDFNY3g0RE5uenZ3V3ZpVm1hRGw2cU1qK2ZLeTdpSUlNdTRQVThyVWtLbmZiWVZaajhpaHljMGRHU1ZBNTY4T09PR1VmelpMMCtjMmQ1WVN2VnFOYTZnUk85eVZndW9mQ2FKT1p3N0RwUzFDbmZMNjNyNERlQitxUENoUDBGYVFTSXZVWlpFaGNNR0tmaFlKb01DYUxQaWZadEg3cmVyTEo2Zk9MNmdQRm9PZk1OODcwQkl2cUE2S2ZHTnU5UFE0eWw2d2FYcjkrV0gxYS9VZEhqN2ZkYTdmOVRmM2JhYjVaWHRHOGJKbFo5TTd5blVhRXY5bHdOYTdsZTVzbmRXRW93R3BTenpsbFZqSHI2dEgzUEphWmFia3dtQVVFaGo1RzNodXowai9sdHVZTE9icWZYeEtTZG1IaTVDNHBWUHpZZnpUMnhMNWZ1ekFrSFZ0VVMyR0g5ZWJ2MnRMODlKemhHdjRaeHNLNFFKYytpZXBwZmhwWjlOQ2tHeE50TDhGbHg0MHpRbXNSZkxEVVc4VjlndDFONnloY1lLVTVjQkNIQ1BaNlFDOHBjQm1ZK2xGU2tMVjlXQ0RYL3dVWHZZZkc5cXBQRXU2NkhjK3BUN0tQN2JqdUlUejRsMHFGWGY4eWVsQmZRcFh0dXAzN3grN2JlYjEyb05GZjVnWmRVcXNCZG9FaG1adm9aWm9ZSGlOaVBKYXNaWXVOUGFYK3BJalo5SmdRcHVYUEl6Y1BNRnFlRlIzL0JIQnpON09CS1Vmdzk4M1ZzcG1XYXBneGowL0tZZzVNUnc3TitrNmdScHI2VXBQWUZBTWJjWEN1a3B2UURHRVpTeDVMR2VCeURsVmNrRHh1c1JTT0FMbGtUSTdUZWtKSlhoQWdvS2dQRzFPOVdMemdkUmhBbE5mYU1ZR05haFRYcFBLSmdmYUlhQVViRy9iOXFhWG5mdVU3WHpsM2FjcHZ4UFpNcEl0ZFh6bHlXY3ZwQWF2VjJ4eHY2MHI3UmRPUlNzZktiUmRldGlLWFczSFpoZHRXa3JWYUlpOVcrV0cvb2Q4eTMrUS93NzJCV2hNbm82TXMvRHV5Z1d6ODdkZy9rZDIvUTNmWjc5alpTT3Q1ek92OEQzbW1WaHR2SnZQWU9lekliOVdIMUQxY2FPd0ZkdmJ2MEFtbjFkUE5ZSXFHTGFEam0yQWV0VEdvVSt0T0dJR3ExdWlCNFFWTlJkYzJITGlFMFFwSUdUUW9lS0ZqWFh5WmRKS3VINUNiZjNIc1RYTHZMOGdOdU45WllRK1FKdlVQdEJVUjFyVnRWdjlBbWxDZEJ4amRNR1pQd0pobEFkcHlETWNya0ZPNmdQWXVKYWxsQjJQd2hhOGltNkJzQWhXcEZiTVhNV1d4V1l0ZWdMSlVrcHNCcEc0Nktza0M4QTdvSE9qN1JNOG41MkE3Q1YxUjZRalJ6emd1cjNoWk5KWk11UTFPUjRDN0tXbG9Fcy9FeWRqM0Ntc0t1eU9oanBCNkVONnlOSTFHbmpaMlcwdTNnWHZTNy9ZOExFcHcvTmhNM3U2anN6ZXJ2WWU5VXFqUzRXTWFjb094anNQWm1BSEhvemF1MkxNVWwzcEZJblpkSWZtY3p2UlJDUXVsSzNyQjYyRXNYdVZ1MFFwYXRkL1c4bi94dDEwd1Z2WGZkdEw4UVlQMjIySUdHYm5CUHN1UktCZ1c0L2VJRW15MXBCNXN1Tk14UDlhVzFhWVdPaG9JU1FPUGJhY3lOYXBWczlIT1R0UXpoejJjTkxjY2I2WWFIOGxwVEpDRHI3MzhNdWtnSFMrL3JCNUNEdGVTeVhYK2hmOFpzQ2UzdzI4MjArb2l0RWN0R2RvU2FqeWRqSVpyb2loeG90TDRUOEFuL1ZIMUZ5KzkxSkFEcGdDVnRmcUNoVnFHdVJLc1ltZUZFQzFSTWxEdThWWnBXVlpUelhjWG9WWlFPVUticVVXd21ScFdhSmtqb2o2OUo2ZjhOQkV0YzFmMllOQUloR0c4SnBPTytkc0hJazhaV3Izc0hrL0M4SlI2VjFGTHRLZERCbTlrRGZzN1g2cGJIbXVsM2l5NnJ1L1djM1d0SUtzS1lQWFFzbXNHQzRJVm82dlVBYkJsYWRsMHFjT0lmczhnSlRBSFREdVRTR2xlemc5eXc0WUJraEFUY1kvUEFmeU1IdjRVUzl2WjZISXpsanczR3dqd2psalE5d3BoV2Q0ZzhCWDJrYkV6a2huV1luTWF1RlhlRUYvZzNnNUp5THpZTUNEcno5cnRSMWhCOGtYWEhBRjkyc0lMbklFbFI0NDlVMUhmdFZsSnMwUk9Wbi9McmFTKy9tZG9YZ3ZMTEFMNm53ZjA3NFIxTnE5WEVlVm9SbXNraHpMVm55MjMwNXpxOWdUV3hmVm10TlpEN1RuQXFxdEhpK0gzRFpDQ0IreUNWSklHTEFTakZFWWJ1dTRBQlZUUWtET0UwZkEweGhZMWVkMVh6WFJldDhwdGRIdlA5TUw3cXV1Y003ZUkzcWFnMnhRdVh2alE4aHYrTW1PR08wZ2V0MDJmTjkwNjdTSnlwaFI2bXN4ZnVzM2I0Z2xLbmxiaXVYR3ArcTJuQWZNMmdiT0dKSGU3MXl1MC8xdlAwRkNQRWZsVEFwM29RZjVCMUxkb3F5bjhTNkczdXlDZ3d6c2xDN0wweDJWdmR1L2UzZjNtc2ovdDMvK24ydllmOTVFWDZNYytldnJCcnQ4cysrUCsvWDljOXB1dUI3VTF1cWpYUmNTWU5LeC9OSzdjZGdoajVsaW80bXNEMXZQV3FoYUlkNEJnUkF3c2JTM3hwWjd2NG1SQlJ4Rm5rcHdrUkNVdW5zTGdaWEZvcS9OSU92RithQ2lsZnJONUtKVnRtdWJZY0xlM3VLc0lodk9MUnc3ZGptMlpQbHhjN0Nmckk1M0ZycE8zQ0x1NlRtNXJmdmxmZ2duMURuTDFxd2VmL2MwTjZoM0Z4dHF3SlRxY201bHlNNDVxZ25wN21SdzJBNEJWVThDU1oyeDJZYW5IeDJHNFlmM2thVTJHRXRmYW0yZ1Z1OWdyUU5Td1RNWkZkOW5VMW9VdWNLMWV0OTJ0ZE1LcWtrWVIza0U5U1RteElQWU9FT1FHMmFOUHdIcjZXSVpORmlJd0JWUFJQQmNYNGpEVFBnbjNJb3Ewc2IwM2tGRWdnTHAzTWdFT3ZncklrNnZwdklUMXIyaVErRFVVOTVPWWF4bDBwYmJTRmlYdE5FUGJpMmlYZTJpZGZBOHQ5Unc1THU3ZFduSnROODJvN1I0RTZZSkZjdDJBL0g2YjJPU2RTWTNDcGxaQU9RNFVFQlYvZjhuYkE1U1JCMCtpM3VXQ1NJa0EwejBCTXpwQ2FFbFd0TGFpRWRvcVFZNTY2REpIazdpakhTem12K1RCOGswWlRKVmlzOE5CTG5SWVJkdkZEdXNha2w2ejZlTFZtN1lMVFU3MVNlRXhzQUVTbnpVMk9YL2djcnRkYW9GWWVUTW44RHhyc0h4eHJmbzA3ZUMxbUxXTENZdjVMYU50czhQcmRseTdaSFNaK3JRdjlYRFRLV1NWMUJhV3ZDRkNXTTdBMlV3TysvT3IzdFZsMnJuQU4ydVpNSTJoWEVzN29taVpvckJlVDhmNkNtVkd0anlkaW9QcC9VaTdJYnFVWUMwQ2JZSVE2ZEpxRVpCeGdOQmVGMHBBWlZBTHNDUWpXRkpvYStiYktlMUNyVFRoUW9tSUN0TmY0cVpqNVVpcWk5S09CU0ZvMEVpQkpjQ0dNRnZMWWtweDhWZ3Foekk4V2hBVEFoYTZDUTVEQjBFbE15ZWVleEVTeXVxNDJPNnlPc2pGZ2pmNmxFbDkwdFZrM0w1cHRlVU5aNVB4c3lTeFNmMzZ1cnN0Qm1JQWdwbDVLMUZidVQ5VzJObWpTOGkxTHBka3Y4eG1mSXUzcDhTeEQreGZhNVBJcW1LN1YzMzZGUExmNzYzNnB0VnBOWE1ZYVNHcURTbXN6YldOcUxNYUhHQ3g5REV6d0VJcEYzQ3VUWWM1TlpCUnBFTktBZnVabGRzbEtrSm5BSGx5Y01DRmVpbjI4ME8vU3pzR1dkeDkvZjBsUjRibWRURlk0Uk5tYS9IdlZDS1A2VkNTbUVvYW5jU0lUVkFLdzRaQnJBN293MG5sa3cyaUVNVWFzbzBVZE5adWY3aE5VcDllTnJya1dtZkNzZGwzMnFybmZRRU44bXdXa1RwRk5adlk5ZXlQMWZ1TW5zaGpBbG1McExsdzlTV2IxcWcvVzIwajlrdDgxclgzdU8xMUdwRUt1dEsrajRSVVh3ZTdwYUxITUZqR3dyMW44TU82M1FzY001ZFI4bG9QbUg2YXBKN1BLcDNWY2ljdHdlbWNEcGhIczFoOG10S3kwbWNBNXAwWUI3U0JTbDV5cGdCek8xWC9qQkV3T1dlQ3JKQ3cxbVNJSkxRbWtaZ0Y0Q1NjSnlxTEJnYzFTWk41Y1JCV2xWVFNTVkNUWjEyK3pmYWs4MXF5ZEhRWldlVnRmOWcrOWlITUFNdVgzeVYvUFVWOXl0dVd6WEtDMGUvNzVqMkErc0tJN3hJN3NhN0pWZE9yTDdwazlZVTRtY2hhNGJGbWgxUGREcU91dnI3ZDJPejh2cy90OXBHS1ZYQ1pPTHY3SHZZeWlqaUwrampNa3ljWkI2dzBNM1I5eFVYMU56Mi9qS2J2YWMxRFhUWjB5THExSG4yTWgxYUVsMHplL25wTnVCNDJZRUVGRjh4RU1weTE1OWZYUFZ3UGxiMjdoeVJZVUovSVBlb2w3SnJyZnIzbnJEM3F1M29BMUVNc3I3eElrcVRqSlYxZmZSSmdjc0dxTjEyM3pHQUsralNZdEd3R2k1YktVUEppN3lVMzVuV1ZMWXpZcjFXcG8wdExwQkJoVjBrS0VycXpDOUU4UUhSdDQ1MHI1QjRFU1Qyb0FVUUIxZ0I2VkgzOXhWZGVta0tqWVoxR1lwMDZXdmFkZXp6N1RrUmoxdWJzcDFhYVFjSXNQSGZKNnRXNnprNmdVNEoyclNCVDZRVHJhS1VHVXdPUkhrWExpNHhPaG1tcERwTzNjZEMwdk1VR3NLUUpZTGwwc0VTYUhHakRkWkJ4OVU4ZHlvU1o5cU00RG9pMGlyTnlIQmczb3lXcDZkZDhIVTRYY3p2ekplYkx6Rlo5UER1cXl2S004b1VNVVhaVGNEVVJ1MTdyVHZJZzVvQXgyc0N1RjJjNUhBWlBOTjQ2dUdqTk5iZmNlc2U5NkJ1d3VHZFo3TEhrdElGVHo5L3l3SmVwRUY3ZUlicWY5MDNyRzV5M1lNMDZ2T1lMNGl5emhmR3V2K2pXSFR2dnBXNU96MFNlOEJoOWd0Y25aTkUxTElmWmdnOWRjRjRIUWFIRUZtQTZ3bi9zQ0d3RVpSQ2pxWDFwZ3R1RnZrS1lsY01rQWtvNW5Da01jNFZrQVVQbGhUU1g2a3ZoakljclU4YVVBeVlwdG9jVjRENE9uUHdGWHhiZXZENHB6UlZ5bEtUWFV1SnBKUDJicWNrWUl6YWYzK1JmN1J2dUQ1blNYRWUza1JnK2MxVTRGdWNjYWJ0am5tZ2Vha203c2k2ZUdOdDUxaFFJeWg2UDFlZ3l0alVaYlcwT2g0Zm5FN3pCSXZoOVJwY3A0cGJObHZiNFRKdlZIT216V1lYTVNxZkg3ZXdNRHB1Y1EwNXBtT004aE9zaEhCZmtMS0xWTGNUTVhjMnRENU1wODRDY0VyMjYyVHd2WVBYd3RyQXBFK2JkaTd6enpVYVB4Y1pkRVdvZGpwaUpJTGlzaExWYTR6S2JZZTBtenBkMGh3S2g1ckRMU0loZzhTVE1KbTZoSkhkYUhCM2VnTm50NGN4V09TVzFDQ21EblRQd3JYR2ZqZU5zYnFPRkFMV0VsTk1xQzdITExyTzFDaGFieVB2WEVOYkkyODZxeGNsWS9sbitWc2JMTUlPa1FJRDBmYkpCTG9DU25pTEdXSVk0MmZYUlpSditZYWM2ZHZkUit6OWN2MzNzS1dlbjg5SzdPbDNzdW5OZjZUdjkzRHZmM3ZiczZmTXlZMCs1WEpjd3RBZmlCdUROcC9TOGNNMDN0NExCZmdPOVZhVkFyZVBtRFBhVkFrTWZwaFBvbDlPcnVCUW1xalQra3o5VTZ1a2Y3MmxaemxQckxZL1dHM1pHeEpqUS82SmFnMkN6S2Rwd2FxSlJkNkp0c0VJUHF6YXRkcnBTK1pkeFErOWJ4OXRVSDBCSElIdWdPTjdmQVcwQXJOalM2clgwa0tyV01WbXpxNWtTWTlJTmQxeWNES0NmQ0dLUmUvdllJdTRXOWVFS3Y2U0lCZDdxUVd3QXd6VGFGbWluSjVnTjFJTkRhRlZyS0llYWdqK0cxZTFhQldneW96Z1BLVEhhZGRBWlF3S0NhZ0pnMEViZWNhMG5JUmFHeFdsaEdIWWhaTE80N2pJbEI2eTRTa1J6RDBxTkhWUHJKUjdVYTBmZDByUXpiSTEycEd1Z3ZkSStnSDRHSUJ6OVJ3MWpNdG8rb0JFS1N6cHBIVG96d2E3SHVLZ1h0S05hWnA0N2gxRjJqS3ByNFZiTVRDQTBGd2s5bE5nZmhTdGdFRlc0dWJLemdsRlg3WU45VGQrcllFaTFnaTg0d0xYUWoyTVBhQ2ZadDdSckdMMVg1MTUrTDgxM2lZQ05Qc0lzWVg2bWQyeDNWdEZUdmlpbkJLckszQ3lXQmZmVHZnUzkyWElicFZuYlNlYk9XdnVkcFEwcEFiQWs2SVhyVVdzbmR0cElhcWIrY0ZVWmR0RzR5WUxxdnNLQzJhWk9wWWRhR3dYYUIwL1BmbGlHU2pEMkZiQTRhRnVOMGpCSTMxTDNJT2cvQlRBZG5qTTdQWHhHeXpvS2F6MjViS0xXRzJkZlIvZmdNRzYyYVVrNFNsd3NaUVp3NGZHVDQzWDU4ZWtkNytLeFB1cFB3QzBaYkJHV2VzMjAvWlNnaGFrU1drRUEyT2duNmd0MGNTVGQwaUw3bHNLcnBjVW5yMnlQWEVmTTJvN0RDWGJPZ2h3SnQ2UWpjS3FGbEUvUVB1ZzI3Znp2dTZJdDZaWnZ0L1FZdGhHSHc0YzdscnQ5b2RaY2JxV3ZCVzlEL2FPL1pBYjRid1B2TEFmdEN2TWRVbFcwNGtDYTlNR29WYkZYQlBadllFb3B6RG1ZMmErMGlQdXR6bUJURDFKSWNwZXlPV3BFR0dHNXlXVnhWZW9yRUl5M3BqQ0FMQkRnTjcxL3ZZQ05KZUd3ZmdrMjZBbkR3Z05xWm9UZ04xQzVqTWRBd3BLbTRMVDRsbmt6cDBkbnRhZmFSSEpuM085c090VnJUcDhVVjY4WDVwSnJ2UjY1S2VsMHRZNzl1bmRoNFZTendUbXROZW4za3RON2h6YjFCZVN6dHBpRTA0Nk5DWE5adyt6cG91dTg1WE5YYlRxMWJiN0trRVAvdEt4L1ZyT3JwNk96QzMvMTdNdzZrWTNHMVN1RjJlUXFuMHR1VGVFdmpzeU1EODlxYlpYdzl3cDVYdHg5OXJtbi9lMGpSaGdrSDgzZWY4YTZ6N1ZHQzM3NE1jMjN1SUxwNDcvSHI0Y1psMmVHR0pUQzNkU1BJMlFKa2crMEJxMmJXSWVtTldDempJNW1iSDB1T0xWOEhDNEhSRFZvZmgwZ0NIVkhZWjBDZGxSTXN5bFloYjI0alB0a01HMkhXYlJjWTA1S0orT0tsMjY1Nit6ejc3cjV4Zmk2MmZOZjJpQzZPaStmTnpKLzlycjRFMFBEczN4bmJGeDVtVzNXN09FTi9ZdG1iTGs4dDJEd0hNNzEyWmR1dnZtbHo2WlB2V2ordkgvK3JDelB1SG5lU2ZQbVgzUnF1bW50U2NPK1V5ODkvVkxiOEx6MXpmTTNybnJ5bVJYbmFQajFmL1FCZnpYL1Q0d2YxaDdHNHdWQVlJd0piWHFmRXJBRFBveXpZS1FuUUtnUWtDN3dDU1pFTDgwZmdCSHZIOWt4NTdRelJralR5TWdPay9XQ2crcjFmejNMblE0VlJnNk83QkJzRnh3a3Q4SitKaHlLRjBaMmpKeHgxaXoxRHlOazQxbXpkbzdnVjc0OXNzTnN3dS84ejFudTd1bUZFY0tmQWQreTBHOXRFSHR5b2ZpRm5YQmtaRVQ5d3l4TnJsZjAzb0hZUVNXRWVmQTAwaHFnVnJXYmVtU01XdGNYR0JuWWQydFZHTFNEQmhVMUdkcitwY2tOeXFiUjROTWV3MUFRdFpTT21sVmNpSXBSdDE2Wlh4azg3OEVudmx5Y29ZVldpbWlvL3N2UTJxR2h0VVh1VzFJMkhRNm5zOUt4K1NDeC84SWVPUFlhbmhpYTBFdmRQNTRWRThoZ296RVUwd1RqUjZsa2I2RXZLeE9mVjBERmdZQ01KcGtmL3d4VVdtdmM2WFIwT0VnVC9XaFYvM2p3SjJUclR3NFN1UlYyblU3MUxTZCt4TlgvVWcvKzdNY01SMUtNRyt6SzN6QTl3S0d6bWZzWnJHUHNvUFdOdzlseU4wODlMdWhKR0tCT1NIZTE3QjdBWTI0UHVoem0wQVk1c05abHE3aEFabDJsTHRKWjV0MHpNQlVRREU1dlpKaHV1VXF6Z0pBZ09wcXg1cjZwV3BxTFRZNHd1NGp0VjdwRXhZeUJrRzdZYmU5WEJzUnZNSTZtMUF3YTYxZmNtREdJM25EUWNjVTBpYWY1ZksrZUtjakxjUkFLb295VitFYk1GOFNpZDQ4M3pBR1hpUTdpb1UxZlNlcnpobldMakI0MlBiSXNFMTIvZlhreE9YZmxZQ2Yza0tsdjBhelk0SXBDVzNsMzhVdHIyZ0o3WFdLSHQxbmdoeGIrNlluMUswbHA2VGxPc3B3WUhZRk0vL3JDNmJmTkZwWXQ1ejFkTXk4WVdiRFlybFlkZ3FkcjhOemh6ejloWGJwTVhOZTJpUTJIdXZ5U1VRQ3ozbTBhR090MDN6cHJma0NQQ1ovSDNjcy9EYlRkd2VBcUJIWURxQ2hoR2sxc3BvM3NyTld5aHo0UXhPUFFhU29jVXZwcEQvcldiTmxQdXgvNncrYk9za0Q5WHdLalZaUTdOYThGVXRLUGpXL1o2U09VWWs3eE9XdWtwYU1uaHpzT3Q5SUZ0TzNvd2NVTmpVdEdMSFVOYW9IbEhOSUxhRW1sU3J5WFBrSkRBRXNmS0oyVDRqN1lGb1pKcmcvbnRJeDkwWkkwUXlZMWJNQWNsT0pqZnEvRnpHVzZOejUyOC9jZm1MT2lOYkhhMng2VnczOTV5U1JKN1RQaVowdlJMMFNYREdiYmw2YzY1SjlsVTJ0bGY4RW9XVVNiYUo1bWEyWFhGM3NLd1lHMVo3YXRMMS9kdTdnNUpIWDFONi9xeUJXejIwTURmVllIaVlXL0dKQzVFWjRQMnF4Mzh3NmozU3BhQ25mTkI1a0Qxalgvaks3TFJHcjlQeDBaeFliTlJKQW9KU3NZZzRxcDNsUTBMcHBaZkdkcERBWHNaZjJUUmdGcFNRVU5oeHpieXQyQzBUMVdseEZHK2d3RjdIN3htTjRUeHBnRElhMXRtbWhpcGJkYVluaGdienZOazZlZXVYS0lSa2RETXJaQXd6NUxPSW9zYlphaDVkWGhnd1l3dGM0dXd4Y3QraU5mTExTaXNOU0U3Y2hkb0xJR3N0bDlicGRrb3BWeUhwUk4yR21qbG82bm1FUllFOERvTmRGYVNNVXVLaUlPcUdhTFIyblBhUXowYUkyUU9GRnJpbFFBRlpKOXVZSXhwTkVpcmI0NXAzZ09PcnVMQkZ2MklDRm8wMWM4cTdVNE9vd05paXFWQ1RSeDBEckRHTE5IeXhjc0NSYnNQRVI5a29DcmlmcGRRSEs2cUpPM21ZcFUzMVFDQ0lDTVV3SmtnWDlGSklERFJlTmZvUmFOS0I0Z3pyNmd4V3JTTkx3TU50NXFKSUNnRVNBV3dXb0Qzb0RWQnFWbUY1enpZeDJtRW1pZ2hvNDlONWtxRGRSQUdoVHJKRGxubkJvYUJkZ0Q0MVE1dGhWTGNpZ1BMdEY1eEExY3Nxbld2eFJOQW5SZkFDRW9VNVR0RHRyR1VNU0pMV2NVRVgxUit6d3UwVVFmN1NMUVJ5VjVhQjRoZG1TeVV1enhJUjIwQTg1K2h1V010RXVFQTZ0ZERUeWR0N28vZ3lMR1lYQkRSRXRMNTI3a1pSZ3piVXhyREE0YU9pREN2UTFHRGo0b29zSjhIQTRDaGQ2Tm1KVGR0TCsyRzl0N1lMRllsZUpnUmQvVlBnOGRIVHZGVTZBNFdEUWNSTXJDRkFmUFJCeDhrM0ZJVU9nMUJrMDE0a0JiRUJmUGFjU2hTSUhIUDhxVnVFUlN2dFR0R2d0d0ptS3hrdEVSc05acVJGejZWS1d3T3crVkJhc0hseVJnVW13N1NidmEraXhtZkFmcHE4RnROYUU0NVl4YUZVdU40TFF2V08yVmsycmloTmFEMGRhMm1McllRSFRhdHJ2Kyt0L0Jhd1Y0blJSZUVEQWdmQ3gwbmJDNEVWNkw3eFBnelVsY0E4eDFlQ3Nha0hvejNoT0RXKy81cU5XZGQ0elg3alpQTFkyVzZ3WFJ6TlNDN01uMVkxalErUEQ3N3oyQ1JZd1ZyYVJScTF6VTZoaTFFKytjVkN0M0hHaXZ4ZEZxc01UUWl6a0ptdmhVYUZCa3lDQVdhS2tsVTJyMjRHYnNlQ1hqa3lIMGRKUDNIMFpZc05MeWtmY21BRmtoUzlWOUNPa2o3MmwxbUkyUXFyWWpSOGJqZnY5cmVHUGo4RWIvSG5qbEppem5yVU0wQWQ3aWtTTWF0TzgvUEJuYUlpQ3k5UDkzMmtZNWhMVTJ6aE5oSlllUGFFeUFpQUNQekd3ZzdXYUFsZktrd1V2ckM0UE1JRk5manFuYkJ5c0gzRnFuWTFBSFpOclZHRVNwUUkyb1d2YUdJb29LcCtYWVkwS0VKMThITGwrRFdudlVXNlVHRnhsRmVCQ3VpdnF3K2pBK0JteENJUzdWODE0RFFYZUkveW9UeFl3ZmgrWWJnaVd4bVVha01SbkMxNndsUTVRODZQRjM0a3dGd29BdEYwSEx1SS9KOVlIaFp1aHpGL295b0ltQnJzVUl4dGRNTWtudk5oak1aclBEWm1XZHhHRTJ5ZXJQeVpkWlZqQ2JuUmIrZ1ByaFloY3JlTlJGWHNscWN0clpDenlpU0hqeXJNMXBNN3VNUDFkL3V0WlRuOHVVYm40WTQ1bE1tZFBwWnNLYWJDdzFDdEs4RGhDTDN2clV0bW9UdWhUazlNeEV4U1VxelZyblVSalNRajZLaFpEVVk0VlpuN1I1QktVcGptOG1yOVVpazhPT3lobG5QUG9Pcmt4VTZBQXhuZC9TNlBjdFhtRFpkMmhRUUtOc1EwMUFpR2xsVnV0d091bWlHZ1RBRWcyMm1WWHo1Q1JSNVFPVDdEbC9JQnhwYVVXdEYvU0RPRll0WXpXTHlSeU94ZW5Sb0VpOWJmVWk2NVNnZTkyMGd0OUNDdk1WRTdScVFKOU55NjZyVlZRL3VHVlI4ZEYzeUovSnh2dkk0ZnZVSnpTV09Idmg5ZmZXR1BTNlplODhhaVpyNzFOdDk2a1BUYWx0T2JWV2o5TkVIOUxoYWF4dzBhcHlzS1VFV0tLQnVvZXE5aUMwNTNtenhlRjBlN1JLUnJrSmpoQ2pZTE83Uk9hRU5UcXMzbGppUkZVNjh1VjdMcjk4ejRtTGROeDQrdklHT1lhK1VCZm9mbW05Qzdlb2QzQ2dEM21VYUJHZkNmUUYrblE2TnpxUWZicFBzU1lMekN4dDdRK3J2TVBLKzYydVkzN3lBbmtSTXhteFd5WTJsM1ZhMVBlNEZ1eEdqR3d5dGlYTEhPZituWlB1Ly9mZFhFc2hORSs0ZXhjV3FhdXp5Wm5qZDJjUDBQRFU0YU52VGJqM2pYQnY3THRadzExYm9RMWFZMHJRNkd4WnZMMUlieS9pN2FVcHVJTVpPdUhtUGV6cUw2dnpkckczTnR6OHUrcVAyZFc3MVhuM2o4M0kxcC9maFhpano5WmZ4MXlxWWdEUm9QVWk5MUhNZmZUV1ByeDFjRExtY2lIRkpUeFlXZG9Jd01hREd6ZXozK0tPM0hmd1B2S2pCdkwvMjltdmJqejJKbUgvOFQvaGpHby9IaHpwRThEaHlmNGRvSGhrUVM3STFnWlF0aDQ4KzFVTzcvWTNjazRETVlvSE54NGs3d0I4OTc3SGZ1dm9IN09hREpQeG1SejhzNkJKbWJET2c2ZTJuNWxXUGhtcjJIRk9LNnJIbWg4emtma0gxSVQ2L2VYc25yRU41Q0hPZGZRVjRsS3ZKbnVxM0JOajAyc3lzVWh4d3lyTXBReXVIa1lZU0NNZFNIem1oaU5iTm9yMGdSSTg3Sm15dGVmL2dmd3hVaEhrcE80aFdrcm5OSXJ1c3RrbmExNGhUYVRnY3doa1dqR09PbTRzaVhpSHBDUEE4Wld3ZDlmWW5GMllLVllzN3VMZTlvYXBFRHoyREJib3E1dEQzUGtWeW4vRHRQK2VoK2JqeldKUVB3UUluUlJDSnhnVlphTnpBbmpoMmtKdHBKMkttWklSUkdEWkt2djF4dmgxb0NTUWZoU2tSQUhMbzdoeHdOUjNyOW1tZmc0aG0zdjlOV1RqOVdyaU40MFF2cTYrZDgyTkFHQUpUbTY0WG0zbG5xalU1b3JSNEtDd3lreWNQaXV4dFFHWVJFTm5CWTBxUW9yVWFlSnBLSXZVd1RqL0NmV1ErcnhPb09JVFQ5eFkrejhPaXZvaHZZZ1M2K2lyOU9STlg4ZjNDYjFKM1pSMkY5RTFHV2pub0xSem9FbGpkS0hLSGNSeTVCSnZ5dGJKNXdRS00rT0JITHBBT2wzSXo5ajl4NWFsVHNBZ3RpanhZR2s1ck9ZbEpMQjJ5REtSenZoQVRrcG1UU25uYUZhN1J1Zk5xbzJpcDRXaEt3MDBCanNDc0hxU0NpUGFQcmhTWVk2RDAybkh3ZWw0MkV5QXZ4RjRKU1JpbmtjSmkwTEtWbHNBL1VPd1NFNUdRUjhvTGRadkp1TW9WSUQ2bDFBY2FMUmZQZGlJd3lVVk9qWTZGdmowMUJvT0Zab1BaNmFjTXJsMlFOTVF3VnpSK3JjZFhjRXJldjg2TW5xRTVnNG5pN1JyeFppYi9pREdsczZEMzN0R3Q2bTB6dGczWTZTaTVBdm1zTDFKU1c2bUQ0c3NXWjA1ZkZ4a3llYlNxU1BVV3VoYXFTc052UkErdWdwVElsa3RhRlVaTk9QVmg0ME5lTTdwMG1OQWJxOGthaDBidFpKUFVEbEt4QXYwTXlGaHRYUmIrS051Qi9xaWVoSHVEbURXdjZaZjBoN1JvM3JUYUxvSkJ0ckw3TGRwUkEvemNnKzlUT043OVY3MnRicnNHVnBkTmkyOVptcE9GZG1LUzlNK3MwczJZZjluak5XWXFjWnVzVkpIWVk4bUhrWDl5Y3ZhbTFEdlo1SHdZclhPZUE5NTdVbXd4V3hXLzA4Ymh0QkdnVllMM1c0TnF1OEdFdXdCMmg0YmEyQnE3NXQvb0o1RWUyRDhjekdVai9xTkJ2VUsybzl2WmNRalhpbk9qVFQyTmw3QzVEQkRoa1lqYlRrbFZ5MnpWZ2ZhdTIyWnNyODVnWlhtS1h4V3duaXlheHNtdXhwYmFGUGphQjRocDgvMmtiQUhMWmVuU1g3QVBqUndpa3NQYm9jNTFPcWRCQ2k4T0VBT0J4YVRVWnJKbXcwRTFNMkxBNm90c0ZqZFhEc3kzWllrZDZwYmtyYnAwNG5CTERtNGEzd0J3azZIdytvV2NtZjk4TEhiOGJBZTI5UnNKei9UekxTQW5aeG1za3pacjJzS3ZnejFtZE5TSDdjWDNVQ1pqTmI0eU8yaUxCVm9wbHFjT01WS0t1UVMySys1YnNOSFpTa0I2S1NpSkorUXRDeHowRTRQb3RFMFdya0FkSmwxUmZXT1lxMjRBUXN3VXhmUVk2aFFhVmRyQnMzWW5Nclo2cUZpM2R3ZnJaeDlkcVU0TnUrUld4K0JjWEV4THY0aC9pRjhSckE3ek1saExqZVQ5R0hCSnhBd1RWS0ZZWUxwdzA3aUlwSGhlODQ3LzZmM1h4K0pQQ0lLbnU5NGVsMWJkaDQ3ZDR0b2RIemUwZTErbVB0OTV4MTNIVHp2L0h1R291UmhkOXB4dTRNWHQ1eDdiT2NXc2NmN29zY29Qand4dHgvWHQ0emVYd21mNDVxaGVYc25aVW9qOUFFdlRXaGZabUNDdFluN2t1M1pXWlJvbUpwUUlQbmVZUzZMekN2cDlWRTBLOEhybTBtR3lSRHBhNUVsTDNhSUJvMC96Y2RqRHQ1SkpBZTVtUFVsVjI1ZW1mUVJRaTUyU0Noa3ZPR1E5L3ZlMEE0eXZJTnVHSVBGcmE5dk8vMnhxNG96dTh6bTdFRnZ6a0V5V2Q3ZUVwQzhUYzBXUzFiOXFTUG54WFo0N0pOU2dJL3lNZWtldi84ZUtRYWJBYWxpQ3B6VTB5NUYyOXFpVmt0OS9tSWVjS0FlZnljVE8vZEdwVVEwaFQxZEphMkxQWDJKTW4xNngwZmNOMjZnaitQUXVzNVhkaDJoVDZUR2Yrcm1vdTV6cU4zRFREdmF0T29SZG0rT1NqdkxJZXBOMXZwVWFRdUI5Z1NSZXVPL1dvdWJYSDJyaUtrR3RFS0lmaFQxSGMwY3I2VndzQWMwcnFJbUpqNUxTdStwaDcwVXNHcHNnZTVQY05YdG5xNEdmNEtvK1JQdytYMmlpejREb0NYZTFxRjFJNkQ3d1paa1c3dFc1RG1walI2RzJqem9QTXhwWGYwTk9YUW9nanFCZmVpVnJld0JyTGNjbTdOVm9aMlRLTU5qTHlxZ20vNlVNM0lZcjFCdDhJN1ZHbnMxSVVhOTMwWE5vZmYvRWs2QlQ0Y1RYVEkwTmlBZmo1UCtvSUVUWWxTaERqLzY5SUk2UnZ3RWZKcEFXNXN6Qlp2V3FkZ2tkR3oyZWFYbVVCMlhmZDVnYyt4alJnY1lHRWFINko4bkhCWHFYS2xvNXRkRURDamtGSDRxS2liQTdvTzVOQlgyNEZUWW04WmhsLzNqc0VzK3ZjL0ZjV0UzaUo1dWNseUlkU2s3RVZUMTRWMTRlTmV1cVR3alU2NDVkUnhTTDQwTHhiUFlvakZCSC9Xanc5N1dBTHUzbnZHUHRWblJLcll1YnlXMTV6Ym9tR25QQVRvdS9QVHAweGlIN2lROEx1dWd4QjBIRzZUeDl2YSsvdVIyNHVscjM3NDllWnhwZ1hHUTFkdlhydDIrR2x0bVRaNFBjVnJ2T25rVU9xYU9RbWZESEkrMnBpYk1oMWl5N2UrZDQzRWEyNGwvM0F5L3U0alJnOHJIem5EMGZ6UEdDYmhvVlU4cFpza1ViTnFtWXRPdVkvTzhWd28yaHlPeFJCMmY1NzMrWUZPNHBUWDU4UmpGc2RaVi9nUjhpdWZpeEQ0Qk1xTTAvN3VPRE9yREUvQUowZnkxVG1iM09EN2hUQ25XRGxwVmhMSWZOUmVRRzVPVUNWUFo0MG16TUJZUVpIVUcxTW9FOXdYa1poT3RDd3ZpODhhUUgyUDFmdStZemRKZVZkcGROQ2tyZ3huMjR3S1JLVFZoVVJobzBWNnMwemcrZVdRWWF6MU9CeVNLMGtnR2hvcU9TNkp6aXVmOEs1MlRsU255cjBMSEdoZElLaVJwQ0dseTM1a1ExbFpvdnJrUTlZSUdhTWhTcDBONDBtTWRFZU82aDQ2YVVsN2dYNHZEdzlHSC9TbWkrSnpaeWJ2bEpzb013UkJXV2RoZGpGZC9ySnJVci9qYys0dzJrWnk0dlU2K0VLVzJRL1JFenJ2UXVKSjM0cWM3MGdWQnkvM2orYjA2cmkyZ0UreXBZUnZOZ0dhQWlZdE5tUVlCbEppRWNBdWN6NVpiYUlsT1N4Z3N6QllYT29XVlFCYXJVZVFzUHRkVUhIZkV0bmhwU2gxMVZtS1RMaDgrV0hhZjJlbm1LVUZpVVowZ1lmMDV5ckkvZ2xhbjFFQ1V4aXk2T2xHQUo2aENoTS91d2RYeEJLUUo0UHhHbmFoNFl0SjhHUTBXN1IvVzZuN3cwWVA4aS94SjlOa0tsOU1NTitwZFZ1eVlxV0xTcXJ5akRXWVdOdExWYWg0Rnpma1R3OEEwUG10RmtyRmZmeW1NcXFvYkRKU1NGWjltNEl4Z2ZBUWZkTHFQc1doUFhiYUwrNnhPU1hzeUlFY2xNNGcyRk5UeG1FQ3pNQ1N2N0NCRWkyQTdMbHYrQmhtOTZab25ucmdtM2RYMTNDVmYraVU3c29iTW9CWTNlWC9GNWNnSFQzL3dsR1BqMWI5NElHQnpiRkx2MHg4SDJZQWIrdnpEREhYcmh3K2g3a2NiRjRjQlpqRm8wQnhXRkE0endlU3NpV0JveVJNQWhZbDhsWHp4ekdzbmdxRTVMeWdjWDFVdkRuNmxlTTNUVXlEQk5ZUG91Ym9YZzMzQkFJTUxvT2hHU1k1ZzAxQ1NROE9NbkFsbW1mckJFL2dmdm9TZmxkM2QzYnVwOTJDcHVxOVc3M290L0U2QjN3MXJEdVB4K21Tc1RNbGxDeUw4b0tnM2VhSTRwSFFNZkJKbXcxM2JuK0V2V0RTOUMrK1M3bHQwZ1RrN2NQMHB3UytlZWVVanJNTzg2QUwyUUg2OTVQSXR1aUNzL3FpN20yVERGeXp5UjFyT0d6cjFzOFpUTG52a1N0N0pzeGN3L3c4dW40a1NlTnBqWUdSZ1lHQmtjRno2LzFOUFBML05Wd1o1bGcxQUVZYnpQSng2TVBxLzFmODVySGRaSllCY0RnWW1rQ2dBYURNTDJYamFZMkJrWUdDVitOOENKcTMrWFdhOXl3QVVRUUh6QVlrN0JrdDQybVBjd2FEQnNvR0JBUW1ud05oTVBRd01yQklJbW5FVEVMc3hNRERjaE9MRlFENExrUGFBMENBNXFQNFRqRjlBN1ArZklHYjkvd3cxa3crSXhTRnEvdStBWUJTN1lWZ1dpTE9nYXNVUmVoaWtvRFFqbEdZQm1qRUhxb2NSd2dleldkRDBvZmdMQjRhWmVRSkp6QlFoOW44cmtGYkVydmYvYktoK21OZ1VLTDhVaTNxWStSMVE5Z2xVT3hsMW9IYnVCTElGZ0RRekRnenpKd3VTdjBINERCQm5JUEdWb09FQTQrY0QzWHNZaXVkakNSZFEzRHdDMG01QTJncElDeUhDaDFFUHpjOWVRQ3lLcEpjREtwNEl4RXhBekFvVlowWENEQ3hISVBZd2dNSC9Hd3dCREpZTUo0RHBSeDBveG9RQ0VlQW1tR1JCRWhGblFBVXBZQk1GSUt6L2MxQWhTT2YvVC84L0FlVXFBVklhcm54NDJtTmdZTkNDd2pTR0pmZ2dvd0dqQjJNQVl3dmpLc1p6alArWXpKaG1NSjFoZXNlc3crekQvSVdsaURXRmpZOU5pYzJGN1JHN0Qvc0c5aGNjVXpnTk9CTTRwM0J4Y2Jsd2RYQzk0dzdqbnNEOWpNZU9ad092REc4Wjd5bytLNzRFdmk2K08vdzNCSHdFT2dTdUNmSUpxZ2xPRVJJUlNoQzZKU3dtM0NmQ0k1SWtza3RVVFhTU1dKTFlMWEVmOFRieEZ4SVdFazBTK3lSMUpHZEkvcEh5a3FxUjJpWjFUZXFKdElpMGdiU2ZkSnYwTnVrSDBsOWsrR1NpWkpiSXZKTTFrajBrSnlEWEpmZEczazErZ2Z3QitVY0tiQXBhQ200S2VRb1RGRDRwWmlrZVVYSlNPcUZjcDd4T1JVUmxrc296VlJIVkR0VTVxcHRVMzZsRnFYV283Vk43b2M2bm5xVitUc05DSTBWamg2YVo1aFd0UEswMzJobmFtN1IvNmJqb3pORGRwL3RNTDAxdmt0NHZmU3NEQ1lOdGhtcUdkWWFYakRpTWRoZ25HRTh3a1RKWlpNcGltbWE2ejB6TUxNWnNpem1YZVlMNUd2TS9GZ0VXV3l3bExDTXNwMWxlc1pLd2lyTnFzN3BtcldOZFluM1B4c0VtdythT3JZdnRDanNCT3crN1BYYnY3QTNzWnprd09TUTRiSEZVY3V4dy9PRFU1UFREdWNQNW00dU5TNExMUEFCUndvanRBQUFCQUFBQTJ3Q2JBQkVBQUFBQUFBSUFBUUFDQUJZQUFBRUFBUUVBQUFBQWVOcXRVczFPd2tBWW5CWTBFbzBhU1RqMzRNR0xEU0Fpd3NsNEVQK0pSdEdqVkNpVlFvbXRWQktmd21mdzRzV0RSNTlBMzhPbjhHQ2NYUllreU1FWWFYWjM5dXQ4czdOVEFNemhCUnJFTDQ0RnpoRm8wUmpYSys1NldNTVM3aFRXTVlzSGhTUFl3N1BDVWVUd3FmQUVicldzd3BQSWFrOEtUeUdodlNzY0kvNVFlQnFMK3J6Q004UVpoZVBFWndxL0lxSDNQYndocWQrSFlXamFicmRkZHl5djVadVcxOFFtUExUUnhUVWMyS2dqZ0lGSGpqU1NTR0dGcU1LM0JuWndnUmJYWGZJN3hJTGZnTW5LQmx3K3hwQ0NMM2RWcmxXdUhjNlhaRzd4NXVjb29ZaHRubnFJQXh5VFY2U1dpeHFIUTMyYlBVZmsyN2hoUlp5U1ltZFNlaW5naEtlWDJWY1lxL1ZUYVhsRTY3Y09qSkcrVTNrUG4rODltY0d3cDVMVTZPMitxM1V5QTFpUzN4bDBtRmpqWEVDVHFnMXFDazZOVlhGeWhZbWJXSlVqeDl6VFdQL2pMY2QvcWZIVlVENG11MTErNVRaOU84cTF6NnBBelgvamxPbXlRdWVpR2d3eTJWZVo5djJsbVpISU00ZTh6RExQTERLRC8yUG1DNDNKaUlVQUFIamFiZFZWMTVSbEFFYmgyWUJnZ2QzZHJYTy84OWJZQ1BQWjNkMENpb0FvS25aM2QzZDNZWGQzeDRFL3dwK2crTTMyelBma1hqTnJaai9Qd1RWck9tTTZvOC9mQ3pwRjUvK2VQenNkeGpDMk03WXpzVE9KY1N6Q2VDYXdLSXV4T0V1d0pCT1p4RklzelRJczIvbUw1VmllRlZpUmxWaVpWVmlWMVZpZE5WaVR0VmliZFZpWDlWaWZEZGlRamRpWVRkaVV6ZGljTGRpU3JlZ1NDbnFVVk5RMHRQVFptbTNZbHUzWW5oM1lrY25zeEJTbU1tQ0VuZG1GWGRtTjNkbURQZG1MdmRtSGZkbVAvVG1BQXptSWd6bUVRem1Nd3ptQ0l6bUtvem1HWXptTzR6bUJFem1KYVV4bkJpZHpDak01bFZuTVpnNm5NWmZUT1lONW5NbFpuTTE4enVGY3p1TjhMdUJDTHVKaUx1RlNMdU55cnVCS3J1SnFydUZhcnVONmJ1QkdidUptYnVGV2J1TjI3dUJPN3VKdTd1RmU3dU4rSHVCQkh1SmhIdUZSSHVOeG51QkpudUpwbnVGWm51TjVYdUJGWHVKbFh1RlZYbU1Cci9NR2IvSVdiL01PNy9JZTcvTUJIL0lSSC9NSm4vSVpuL01GWC9JVlgvTU4zL0lkMy9NRFAvSVRQL01Mdi9JYnYvUEgrR2t6NTgrWm5nbnpaczNvZHJ0VGh6dTUrKzhXQzk5dzR4WnV6eTNkeXEzZHhtM2R2anQ1dU1YSWNLdVJjWU41YzJlUHZxaEdwb3h1N1dHTlgycTZveDhlZUltQmx4aDRpWUdIRHp4ODRPRUREeDk0K0tDYnJtc25kbUlucFdzdjltSXY5bUt2c0ZmWUsrd1Y5Z3A3aGIzQ1htR3ZzRmZZNjlucjJldlo2OW5yMmV2WjY5bnIyZXZaNjlrcjdaWDJTbnVsdmRKZWFhKzBWOW9yN1pYMktudVZ2Y3BlWmEreVY5bXI3RlgyS251VnZkcGViYWUyVTl1cDdkUjJhanUxbmRwT1k2ZnhYbzI5eGw1anI3SFgyR3ZzTmZZYWU2MjkxbDVycjdYWDJtdnR0ZlphZTYyOTFsN2ZYdDllMzE3Zlh0OWUzMTdmWG4vWWkrNmorK2crd3gvZndxM2MydjN2ZTYwN3ZFZjBILzFILzlGLzlCLzlSLy9SZi9RZi9VZi8wWC8wSC8xSC85Ri85Qi85Ui8vUmYvUWYvVWYvMFgvMEgvMUgvOUYvOUIvOVIvL1JmL1FmL1VmLzBYLzBIOTFIOTlGOWRCL2RSL2ZSZlhRZjNVZjMwWDEwSDkybnRxZi82RC82ai82ai8rZy8rby8rby8vb1AvcVAvcVAvNkQvNmovNmovK2cvK28vK28vL29QL3FQL3FQLzZELzZqLzZqLytnLytvLytvLy9vUC8rNTc5dnBEenNML3ozK0FjeGRNMEM0QWYrRnNBR05BRXV3Q0ZCWXNRRUJqbG14UmdZcldDR3dFRmxMc0JSU1dDR3dnRmtkc0FZclhGaFpzQlFyQUFBQUFWTG1XSzRBQUE9PScpOwp9CgouYmFjay10by10b3AgeyAKCXBvc2l0aW9uOiBmaXhlZDsKCWJvdHRvbTogNXB4OwoJcmlnaHQ6IDVweDsKCXRleHQtZGVjb3JhdGlvbjogbm9uZTsKCXBhZGRpbmc6IDFweDsKCWRpc3BsYXk6IG5vbmU7Cn0KLmJhY2stdG8tdG9wIGJ1dHRvbiB7CiAgICB3aWR0aDogMzVweDsKCWNvbG9yOiM4MDgwODA7CiAgICBtYXJnaW46IDFweDsKfQo=";

        var route = $().phorumizeRoute();
        var f = null;

        if (route == "forum") {
            f = transformForum;
        } else if (route == "topic") {
            f = transformTopic;
        }

        if (f != null) {
            addStyle(bootstrapCss, true);
            addStyle(editorCss, true);
            addStyle(css, true);

            f();
            addScrollToTop();
        }

    };
})(jQuery, this);

if ($().phorumizeRoute()) {
    $("html").hide();

    $(document).ready(function () {

        setTimeout(function () {
            try {
                $().phorumize();
            }
            finally {
                $("html").fadeIn(300);
            }
        }, 1000);

    });
}
