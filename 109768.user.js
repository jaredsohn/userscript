// ==UserScript==
// @name			Wowhead - User Reputation
// @namespace			RVCA18 - original concept by Zuo [http://userscripts.org/scripts/review/32564]
// @description			User reputation based on your wowhead contributions
// @include			http://*.wowhead.com/user=*
// @version			1.0.24.1
// ==/UserScript==

function WH_USER_REPUTATION(f) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    //noinspection JSUnusedGlobalSymbols
    script.textContent = '(' + f.toString() + ')(jQuery)';
    document.body.appendChild(script);
}

WH_USER_REPUTATION(function ($) {
    var dataText = [],
        dataValue = [],
        dataExtra = [],
        _ach1, _dat1, _dat2, _com1, _com2, _scr1, _vid1, _for1,
        rep_got, rep_text, rep_stage, rep_full, rep_box, rep_bar_style, rep_total_view,
        _growth, _lang, _val,
        jqueryi, dataDiv;

    //default value if unavailable
    _ach1 = _dat1 = _dat2 = _com1 = _com2 = _scr1 = _vid1 = _for1 = 0;

    //Wowhead Language Library
    function Lang_lib(lang) {
        //build language arrays
        var data_eng = [14, 'Data uploads', 'Comments', 'Screenshots', 'Videos', 'Forum posts', 'Banned', 'Reputation'],
            data_ger = [9, 'Hochladevorgänge', 'Kommentare', 'Screenshots', 'Videos', 'Forenbeiträge', 'Gesperrt', 'Ruf'],
            data_rus = [12, 'Данных загружено', 'Комментарии', 'Скриншоты', 'Видео', 'Сообщений на форумах', 'Заблокирован', 'Репутация'],
            data_spa = [8, 'Datos enviados', 'Comentarios', 'Capturas de pantalla', 'Vídeos', 'Mensajes en los foros', 'Prohibido', 'Reputación'],
            data_fre = [13, 'Envois de données', 'Commentaires', 'Captures d\'écran', 'Vidéos', 'Messages sur le forum', 'Banni(e)', 'Réputation'],
            rep_eng = ['Unfriendly', 'Neutral', 'Friendly', 'Honored', 'Revered', 'Exalted'],
            rep_ger = ['Unfreundlich', 'Neutral', 'Freundlich', 'Wohlwollend', 'Respektvoll', 'Ehrfürchtig'],
            rep_rus = ['Неприязнь', 'Равнодушие', 'Дружелюбие', 'Уважение', 'Почтение', 'Превознесение'],
            rep_spa = ['Adverso', 'Neutral', 'Amistoso', 'Honorable', 'Reverenciado', 'Exaltado'],
            rep_fre = ['Inamical', 'Neutre', 'Amical', 'Honoré', 'Révéré', 'Exalté'],
            data_lang, data_rep;

        //select language
        switch (lang) {
            case 'English':
                data_lang = data_eng;
                data_rep = rep_eng;
                break;
            case 'Español':
                data_lang = data_spa;
                data_rep = rep_spa;
                break;
            case 'Français':
                data_lang = data_fre;
                data_rep = rep_fre;
                break;
            case 'Deutsch':
                data_lang = data_ger;
                data_rep = rep_ger;
                break;
            case 'Русский':
                data_lang = data_rus;
                data_rep = rep_rus;
                break;
            default:
                $('table.infobox tbody').append('<tr><td id="lang-fail"><ul class="first last"><li>User reputation is not available</li></ul></td></tr>');
        }

        //language specific values
        this.achievements = data_lang[0];
        this.data_uploads = data_lang[1];
        this.comments = data_lang[2];
        this.screenshots = data_lang[3];
        this.videos = data_lang[4];
        this.forum_posts = data_lang[5];
        this.user_status = data_lang[6];
        this.reputation_header = data_lang[7];
        this.unfriendly = data_rep[0];
        this.neutral = data_rep[1];
        this.friendly = data_rep[2];
        this.honored = data_rep[3];
        this.revered = data_rep[4];
        this.exalted = data_rep[5];
    }

    //get site language
    _lang = new Lang_lib($('#toplinks-language').text());

    //scrape infobox rep values
    for (var i = 0; i <= $('#sdhafcuvh1 ul li').length - 1; i++) {
        jqueryi = i + 1;
        dataDiv = $('#sdhafcuvh1 ul li:nth-child(' + jqueryi + ') div');
        dataText[i] = $.trim(dataDiv.html().substring(0, dataDiv.html().indexOf(':')));
        dataValue[i] = dataDiv.html().substring(dataDiv.html().indexOf(':') + 2);
        if (dataValue[i].substring(0, dataValue[i].indexOf(' ')) !== '') {
            dataValue[i] = dataValue[i].substring(0, dataValue[i].indexOf(' '));
        }
        dataExtra[i] = $('#sdhafcuvh1 ul li:nth-child(' + jqueryi + ') div small span').html();
    }

    //setting achievement value
    _ach1 = ($('a[href="#achievements"]').length) ? $('a[href="#achievements"] div').text().substring(_lang.achievements, $('a[href="#achievements"] div').text().indexOf(')')) : 0;
    //setting data value
    if ($.inArray(_lang.data_uploads, dataText) != -1) {
        _val = $.inArray(_lang.data_uploads, dataText);
        _dat1 = parseFloat(dataExtra[_val].substring(0, dataExtra[_val].indexOf(' ')));
        _dat2 = (dataExtra[_val].match(/MB/g)) ? 1 : 0;
    }

    //setting comment value
    if ($.inArray(_lang.comments, dataText) != -1) {
        _val = $.inArray(_lang.comments, dataText);
        _com1 = parseFloat(dataValue[_val]);
        _com2 = parseFloat(dataExtra[_val]);
    }

    //setting screenshot value
    if ($.inArray(_lang.screenshots, dataText) != -1) {
        _val = $.inArray(_lang.screenshots, dataText);
        _scr1 = parseFloat(dataValue[_val]);
    }

    //setting video value
    if ($.inArray(_lang.videos, dataText) != -1) {
        _val = $.inArray(_lang.videos, dataText);
        _vid1 = parseFloat(dataValue[_val]);
    }

    //setting forum post value
    if ($.inArray(_lang.forum_posts, dataText) != -1) {
        _val = $.inArray(_lang.forum_posts, dataText);
        _for1 = parseFloat(dataValue[_val]);
    }

    //rep calculations
    _ach1 = _ach1 * 1.75;
    _dat1 = (_dat2 == 1) ? ((_dat1 * 1024) * 1024) / 1275 : (_dat1 * 1024) / 1275;
    _com1 = (_com2 < 0) ? (_com1 * 1.85) + (_com2 * 3.35) : (_com1 * 1.85) + (_com2 * 1.35);
    _scr1 = _scr1 * 3.25;
    _vid1 = _vid1 * 4.45;
    _for1 = _for1 * 0.55;
    rep_got = Math.ceil(0 + (_ach1 + _dat1 + _com1 + _scr1 + _vid1 + _for1));

    //setting level and text
    if ($('#sdhafcuvh0 ul li:nth-child(3) div').html() == _lang.user_status) {
        rep_text = _lang.unfriendly;
        rep_bar_style = 'progressbar-rep2';
        rep_stage = 9999;
        rep_full = 9999;
        rep_total_view = '0 / ' + rep_full;
    } else if (rep_got < 0) {
        rep_text = _lang.unfriendly;
        rep_bar_style = 'progressbar-rep2';
        rep_stage = rep_got + 9999;
        rep_full = 9999;
        rep_total_view = rep_stage + ' / ' + rep_full;
    } else if (rep_got >= 0 && rep_got <= 2999) {
        rep_text = _lang.neutral;
        rep_bar_style = 'progressbar-rep3';
        rep_stage = rep_got;
        rep_full = 3000;
        rep_total_view = rep_stage + ' / ' + rep_full;
    } else if (rep_got >= 3000 && rep_got <= 8999) {
        rep_text = _lang.friendly;
        rep_bar_style = 'progressbar-rep4';
        rep_stage = (rep_got - 3000);
        rep_full = 6000;
        rep_total_view = rep_stage + ' / ' + rep_full;
    } else if (rep_got >= 9000 && rep_got <= 20999) {
        rep_text = _lang.honored;
        rep_bar_style = 'progressbar-rep5';
        rep_stage = (rep_got - 9000);
        rep_full = 12000;
        rep_total_view = rep_stage + ' / ' + rep_full;
    } else if (rep_got >= 21000 && rep_got <= 41999) {
        rep_text = _lang.revered;
        rep_bar_style = 'progressbar-rep6';
        rep_stage = (rep_got - 21000);
        rep_full = 21000;
        rep_total_view = rep_stage + ' / ' + rep_full;
    } else if (rep_got >= 42000) {
        rep_text = _lang.exalted;
        rep_bar_style = 'progressbar-rep7';
        rep_stage = ((rep_got - 42000) > 999) ? 999 : (rep_got - 42000);
        rep_full = 999;
        rep_total_view = rep_stage + ' / ' + rep_full;
    }
    _growth = (100 / rep_full) * rep_stage;

    rep_box = '<tbody><tr><th>' + _lang.reputation_header + '</th></tr>' +
        '<tr><td>' +
        '<ul class="first last"><li><div>' +
        '<table style="border-collapse:collapse; width:100%">' +
        '    <tr>' +
        '        <td style="padding:0;">' +
        '            <a href="javascript:;" class="progressbar">' +
        '            <div class="progressbar-text" style="cursor:pointer"><del>' + rep_text + '</del><ins>' + rep_total_view + '</ins></div>' +
        '            <div class="' + rep_bar_style + '" style="width:' + _growth + '%;height:18px"></div>' +
        '            <div class="progressbar-text progressbar-hidden">' + rep_text + '</div>' +
        '            </a>' +
        '        </td>' +
        '    </tr>' +
        '</table>' +
        '</div></li></ul>' +
        '</td></tr></tbody>';

    if (!$('#lang-fail').length) {
        $(rep_box).insertAfter($('table.infobox tbody'));
    }

    //--------------------------------------------------------------
    //check for updates
    var userscript = '109768',
        version = '10241',
        imagelocation = 'left top';
    $.ajax({
        url : 'http://query.yahooapis.com/v1/public/yql/RVCA18/userscriptVersion?userscript=' + userscript,
        success : function(scriptversion) {
            var _update_table = ''
                + '<div id="userscript-update" style="position: fixed; bottom: 0; left: 50px; border: 1px solid #FF8000; border-bottom: none; border-radius:2px; -webkit-border-radius: 2px; -moz-border-radius: 2px;">'
                + '<table style="border-collapse: collapse;"><tbody></tbody></table>'
                + '</div>',
                _update_btn = ''
                    + '<tr><td style="width: 297px; border-bottom: 1px solid #404040; background: url(\'http://i.imgur.com/3XiBs.png\') ' + imagelocation + '">'
                    + '<a href="http://userscripts.org/scripts/source/' + userscript + '.user.js" target="_self"><img src="http://i.imgur.com/L7wtF.gif" style="margin-bottom:-4px; height:26px; width:100%"/></a>'
                    + '</td></tr>';

            //append update alert
            scriptversion = $.trim($(scriptversion).find('results').text()).replace(/\./g, '');
            if (version < scriptversion) {
                if ($('#userscript-update').length == 0) {
                    $('body').append(_update_table);
                }
                $('#userscript-update table tbody').append(_update_btn)
            }
        }
    })
});