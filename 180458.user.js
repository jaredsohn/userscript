// ==UserScript==
// @author mediawot.com | mediawot@gmail.com
// @name StatistWoT_MW
// @updateURL http://userscripts.org/scripts/source/180458.meta.js
// @downloadURL http://userscripts.org/scripts/source/180458.user.js
// @namespace http://mediawot.com
// @version 0.8.8.2.1
// @description Efficiency rating in a profile on the site "World of Tanks"  
// @match http://challenge.worldoftanks.ru/uc/accounts/*
// @match http://worldoftanks.com/uc/accounts/*
// @match http://worldoftanks.ru/uc/accounts/*
// @match http://worldoftanks.ru/community/accounts/*
// @match http://worldoftanks.com/community/accounts/*
// @match http://uc.worldoftanks.eu/uc/accounts/*
// @match http://worldoftanks.eu/uc/accounts/*
// @match http://worldoftanks.eu/community/accounts/*
// @include http://challenge.worldoftanks.ru/uc/accounts/*
// @include http://worldoftanks.com/uc/accounts/*
// @include http://worldoftanks.ru/uc/accounts/*
// @include http://worldoftanks.ru/community/accounts/*
// @include http://worldoftanks.com/community/accounts/*
// @include http://uc.worldoftanks.eu/uc/accounts/*
// @include http://worldoftanks.eu/uc/accounts/*
// @include http://worldoftanks.eu/community/accounts/*
// ==/UserScript==
var lang,
        scriptVersion = '0.8.8.2.1',
        tanksarr = [],
        OldWinPerc = 999;

var rangD = ['Виртуоз (>99%)', 'Мастер-танкист (>95%)',
    'Танкист 1-го класса (>80%)', 'Танкист 2-го класса (>60%)',
    'Танкист 3-го класса (>45%)', 'Оленевод 3-го класса (>30%)',
    'Оленевод 2-го класса (>20%)', 'Оленевод 1-го класса (>10%)',
    'Мастер-оленевод (>10%)'],
        rangDE = ['>99%', '>95%', '>80%', '>60%', '>45%', '>30%', '>20%',
    '>10%', '>10%'],
        rangA = ['cv', 'cm', 'c1', 'c2', 'c3', 'd3', 'd2', 'd1', 'dm'];

/* Requires _opera-xdr-engine.js to handle script-based requests in Opera*/
var xdr = {
    reqId: 0,
    req: {},
    prepareUrl: function(url) {
        return url;
    },
    xget: function(url, onDone) {
        url = this.prepareUrl(url);
        if (window.opera && window.opera.defineMagicVariable) {
            this.scriptTransport(url, onDone);
        } else if (GM_xmlhttpRequest) {
            this.GMTransport(url, onDone);
        } else if (chrome && chrome.extension) {
            this.xhrTransport(url, onDone);
        } else {
            var currentReqId = this.reqId++;
            this.req[currentReqId].handleJSONP = onDone;

            this.JSONPTransport(url, "xdr.req[" + currentReqId
                    + "].handleJSONP");
        }
    },
    scriptTransport: function(url, onDone) {
        var t = document.createElement("script");
        t.src = url;
        t._callback = onDone;
        document.body.appendChild(t);
    },
    xhrTransport: function(url, onDone) {
        chrome.extension.sendRequest({'action': 'xget', 'url': url}, onDone);
    },
    GMTransport: function(url, onDone) {
        setTimeout(function() {
            GM_xmlhttpRequest({
                method: "GET",
                url: url,
                onload: function(x) {
                    var o = x.responseText;
                    if (onDone) {
                        onDone(o);
                    }
                }
            });
        }, 0);

    },
    JSONPTransport: function(url, callbackName) {
        if (callbackName && typeof callbackName === "string") {
            url += "&callback=" + callbackName;
        }
        var t = document.createElement("script");
        t.src = url;
        document.body.appendChild(t);
    }
};


if (document.title.indexOf("Профиль игрока") > -1)
    lang = "ru";
if (window.location.host.indexOf("worldoftanks") > -1
        && window.location.href.indexOf("accounts") > -1) {
    var scr = localStorage.getItem("flot");
    if (scr) {
        addScript(scr);
    } else {
        xdr.xget("http://www.flotcharts.org/flot/jquery.flot.js", addScript);
    }
}

function addScript(response) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = response;
    document.body.appendChild(script);
    if (!localStorage.getItem("flot"))
        localStorage.setItem("flot", response);
    var scr = localStorage.getItem("flot_time");
    if (scr) {
        addScript2(scr);
    } else {
        xdr.xget("http://www.flotcharts.org/flot/jquery.flot.time.js",
                addScript2);
    }
}

function addScript2(response) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = response;
    document.body.appendChild(script);
    if (!localStorage.getItem("flot_time"))
        localStorage.setItem("flot_time", response);
    main();
}

function main() {
    if (!getCookie("usScriptVer"))
        xdr.xget("http://userscripts.org/scripts/show/180458",
                getNewScriptVersion);
    var UserId = window.location.href.match(/\/(\d+)/)[1];
    var uskeys = [];
    for (var key in localStorage) {
        if (key.indexOf('daystat') !== -1) {
            var uskey = key.split('_')[1];
            if (uskeys.indexOf(uskey) === -1)
                uskeys.push(uskey);
        }
    }
    var dtext =
            '<style>#us-set-table td{border: 1px dashed; text-align: center;' +
            ' padding: 3px;} #us-set-table{width: 100%;} #us-set-table ' +
            ' th{color: white;}</style>' +
            '<div id="us-settings-block" class="ui-dialog ui-draggable no-jquery-buttons" tabindex="-1" style="display:none; z-index: 1004; top: 10%; left: 30%; position: fixed;">' +
            '<div class="ui-dialog-titlebar ui-widget-header ui-corner-all" tabindex="-1"><span class="ui-dialog-title">' + (lang === "ru" ? "Настройте скрипт по вашим требованиям" : "Extended statistic script settings ") + '</span>' +
            '<a href="#" class="ui-dialog-titlebar-close ui-corner-all us-close-settings" tabindex="-1"><span class="ui-icon ui-icon-closethick">close</span></a></div>' +
            '<div class="ui-dialog-content ui-widget-content" style="display: block; width: auto; height: auto;"><div class="js-dialog-content b-dialog-content"><div class="h-popup-content" style="background: rgb(31, 31, 31);">' +
            '<div style="border: 1px solid; border-radius: 10px; -webkit-border-radius: 10px; padding: 5px;"><h5 style="text-align: center; margin: 0; color: #f25322;">' + (lang === "ru" ? "Включить / отключить раздел" : "Block settings") + '</h5><br><table id="us-set-table"><thead><tr><th width="60%">' + (lang === "ru" ? 'Раздел' : 'Block') + '</th><th width="20%">' + (lang === "ru" ? 'Показывать' : 'Collapse') + '</th><th width="20%">' + (lang === "ru" ? 'Скрыть' : 'Remove') + '</th></tr></thead><tbody>' +
            '<tr class="us-set-block" btype="efRat"><td>' + (lang === "ru" ? 'Эффективность по XVM' : 'Eff. ratings') + '</td><td><input type="checkbox"></td><td><input type="checkbox"></td></tr>' +
            '<tr class="us-set-block" btype="newBat"><td>' + (lang === "ru" ? 'Последние бои' : 'New battles') + '</td><td><input type="checkbox"></td><td><input type="checkbox"></td></tr>' +
            '<tr class="us-set-block" btype="plComp"><td>' + (lang === "ru" ? 'Сравнить танкистов' : 'Players compare') + '</td><td><input type="checkbox"></td><td><input type="checkbox"></td></tr>' +
            '<tr class="us-set-block" btype="pers"><td>' + (lang === "ru" ? 'Личные данные' : 'Personal') + '</td><td><input type="checkbox"></td><td><input type="checkbox"></td></tr>' +
            '<tr class="us-set-block" btype="speed"><td>' + (lang === "ru" ? 'Спидометры' : 'speedometers') + '</td><td><input type="checkbox"></td><td><input type="checkbox"></td></tr>' +
            '<tr class="us-set-block" btype="achiev"><td>' + (lang === "ru" ? 'Достижения' : 'Achievements') + '</td><td><input type="checkbox"></td><td><input type="checkbox"></td></tr>' +
            '<tr class="us-set-block" btype="common"><td>' + (lang === "ru" ? 'Общее' : 'Common') + '</td><td><input type="checkbox"></td><td><input type="checkbox"></td></tr>' +
            '<tr class="us-set-block" btype="diagr"><td>' + (lang === "ru" ? 'Диаграммы' : 'diargams') + '</td><td><input type="checkbox"></td><td><input type="checkbox"></td></tr>' +
            '<tr style="display:none;" class="us-set-block" btype="rat"><td>' + (lang === "ru" ? 'Рейтинги' : 'Ratings') + '</td><td><input type="checkbox"></td><td><input type="checkbox"></td></tr>' +
            '<tr class="us-set-block" btype="veh"><td>' + (lang === "ru" ? 'Техника' : 'Vehicles') + '</td><td><input type="checkbox"></td><td><input type="checkbox"></td></tr>' +
            '</tbody></table></div>' +
            '<div style="border: 1px solid; border-radius: 10px; -webkit-border-radius: 10px; padding: 5px; margin-top: 5px;"><h5 style="text-align: center; margin: 0; color: #f25322;">' + (lang === "ru" ? 'Построение графиков' : 'Graphs') + '</h5><br>' +
            '<label for="all" style="padding-left: 20px;">' + (lang === "ru" ? 'Все' : 'All') + '</label><input type="radio" name="gtype" id="all" value="all" checked/>' +
            '<label for="date" style="padding-left: 20px;">' + (lang === "ru" ? 'Дата' : 'Date') + '</label><input type="radio" name="gtype" id="date" value="date" />' +
            '<label for="bat" style="padding-left: 20px;">' + (lang === "ru" ? 'Бои' : 'Battles') + '</label><input type="radio" name="gtype" id="bat" value="bat" />' +
            '<label for="no" style="padding-left: 20px;">' + (lang === "ru" ? 'Не отображать' : 'Dont show') + '</label><input type="radio" name="gtype" id="no" value="no" />' +
            '</div>' +
            '<div style="border: 1px solid; border-radius: 10px; -webkit-border-radius: 10px; padding: 5px; margin-top: 5px;max-height: 100px;overflow-y: auto;width: 98%;"><h5 style="text-align: center; margin: 0; color: #f25322;">' + 'Названия ссылок' + '</h5><br><table>';
    for (var i = 0; i < uskeys.length; i++) {
        dtext += '<tr id="ustr' + uskeys[i] + '"><td><label for="us' + uskeys[i] + '" style="padding-left: 20px;"><a href="http://worldoftanks.ru/community/accounts/' + uskeys[i] + '/">Игрок ' + uskeys[i] + '</a></label></td><td><input style="margin-left: 45px;width: 145%;" type="text" id="us' + uskeys[i] + '" uid="' + uskeys[i] + '" name="us' + uskeys[i] + '" class="us_st_name" value="Игрок ' + uskeys[i] + '" /></td></tr>';
    }
    dtext +=
            '</table></div>' +
            '<div style="border: 1px solid; border-radius: 10px; -webkit-border-radius: 10px; padding: 5px; margin-top: 5px;"><h5 style="text-align: center; margin: 0; color: #f25322;">' + (lang === "ru" ? 'Сравнить танкистов' : 'Players compare') + '</h5><br><input type="checkbox" id="us-settings-compare">' + (lang === "ru" ? 'Сравнивать других танкистов с "моими" данными' : 'Compare any players with "my" stat.') + '<br><br><div id="us-my-compare-block" style="display: none;">' + (lang === "ru" ? 'Адрес моей страницы' : 'Address of my page') + ':  ' +
            '<input type="text" style="width: 100%;" id="us-settings-compare-page"><br><input type="checkbox" id="us-settings-current-page">' + (lang === "ru" ? 'Текущая страница' : 'Current page') + '</div></div>' +
            '</div><fieldset class="g-nopadding"><div class="b-popupbotton"><span class="b-button b-button__colored"><span class="b-button_right b-button-wrap"><input type="button" value="' + (lang === "ru" ? 'Сохранить' : 'Save') + '" tabindex="1003" id="us-settings-save">' +
            '</span></span><div class="b-cancel"><a href="#" class="us-close-settings" tabindex="1004">' + (lang === "ru" ? 'Отмена' : 'Cancel') + '</a></div></div></fieldset></div></div></div><div id="us-settings-overlay" class="ui-widget-overlay" style="display:none; width: 5000px; height: 20000px; min-height: 2000px; z-index: 1003;"></div>';
    var fake_div = document.createElement("div");
    fake_div.innerHTML = dtext;
    document.getElementsByClassName("b-portalmenu")[0].appendChild(fake_div);
    var avtemp = CalcAvgLev(tanksarr),
            AllAvgLev = avtemp[0], tnaSum = avtemp[1],
            AllWins = GetBattleStat(4),
            AllDamag = GetBattleStat(7),
            AllFrags = GetBattleStat(9),
            AllSpotted = GetBattleStat(10),
            AllCaps = GetBattleStat(6),
            AllDefs = GetBattleStat(8),
            AllXp = GetBattleStat(11),
            AllBattles = GetBattleStat(5),
            AllGold = document.getElementsByClassName("b-userblock-wrpr")[0].getElementsByClassName("currency-gold")[0],
            AllCredit = document.getElementsByClassName("b-userblock-wrpr")[0].getElementsByClassName("currency-credit")[0],
            AllExp = document.getElementsByClassName("b-userblock-wrpr")[0].getElementsByClassName("currency-experience")[0],
            playerNick = document.getElementById("js-profile-name").innerHTML,
            daypassed = (new Date() - new Date(document.getElementsByClassName("js-date-format")[0].getAttribute("data-timestamp") * 1000)) / 1000 / 60 / 60 / 24,
            timeDiv = document.getElementsByClassName("b-profile-name")[0],
            dayArray = [],
            comparedayArray = [],
            blockArray = [],
            statTooltip = '',
            clanDiv = document.getElementsByClassName("b-profile-clan")[0],
            oxeff = 0,
            oxwn = 0;

    setup_script(toFl);
    setup_script(WriteStat);
    setup_script(setCookie);
    setup_script(getCookie);
    setup_script(SetLSData);
    setup_script(GetLSData);
    setup_script(GetBattleStat);
    setup_script(WriteCompareStat);

    if (window.location.href.indexOf('#USCompareStat') !== -1)
        SaveCompareStatData();

    xdr.xget("http://api." + document.location.host + "/uc/accounts/" + UserId + "/api/1.9/?source_token=Intellect_Soft-WoT_Mobile-site", fixStatData);

    document.getElementById("js-profile-name").setAttribute('style', "max-width: 100%;");
    var stats = document.getElementsByClassName("b-statistic_item");
    for (var i = 0; i < stats.length; i++)
        stats[i].setAttribute('style', "max-width: 100%;");
    document.getElementsByClassName("b-userblock-wrpr")[0].style.margin = '0';

    if (!clanDiv) {
        clanDiv = document.getElementsByClassName("b-profile-noclan")[0];
    } else {
        document.getElementsByClassName("b-statistic_item")[0].setAttribute('style', "max-width: 100%;");
    }
    if (!clanDiv)
        clanDiv = timeDiv;
    clanDiv.setAttribute('style', "width: 50%; max-width: 100%;");

    timeDiv.setAttribute('style', "width: 40%; max-width: 100%;");
    var fake_div = document.createElement("div");
    fake_div.innerHTML = "<p>" + (lang === "ru" ? "Текущая версия <a href='http://mediawot.com'>скрипта</a> " : " <a href='http://mediawot.com'>Script</a> version ")
            + scriptVersion + " <br>"
            + "</p>"
            + "<p><a href='#' id='us-settings-a'>" + (lang === "ru" ? "Настроить скрипт под себя" : "Script settings") + "</a></p>"
            + "<style>"
            + ".spoiler span.close,"
            + ".spoiler span.open{"
            + "    padding-left:22px;"
            + "    color: #F25322 !important;"
            + "    border-bottom: 1px dashed #F25322;"
            + "}"
            + ".spoiler blockquote,"
            + ".spoiler{"
            + "    padding:0.5em;"
            + "    border-radius:15px;"
            + "    -webkit-border-radius:15px;"
            + "    -khtml-border-radius:15px;"
            + "    -moz-border-radius:15px;"
            + "    -o-border-radius:15px;"
            + "    -ms-border-radius:15px;"
            + "}"
            + ".spoiler {"
            + "    overflow-x:hidden;"
            + "    overflow-y:hidden;"
            + "    box-shadow: 0px 1px 8px #F2534A;"
            + "    border:#f25322 solid 1px;"
            + "    -webkit-box-shadow:0px 1px 8px #F2534A;"
            + "    -khtml-box-shadow:0px 3px 8px #F2534A;"
            + "    -moz-box-shadow:0px 1px 8px #F2534A;"
            + "    -ms-box-shadow:0px 1px 8px #F2534A;"
            + "}"
            + ".spoiler blockquote {"
            + "   margin-top:12px;"
            + "   min-height: 23px;"
            + "   border:#CDCDCD 2px dashed;"
            + "}"
            + " </style>"
            + '<div class="spoiler" style="border: #f25322 dashed 1px; margin-bottom: 10px;">'
            + ' 	<div class="box" style="text-align: center;"><a href="#" id="autor-pay" class="b-vertical-arrow"><span class="b-fake-link">' + (lang === "ru" ? 'Материальная помощь автору (по желанию)' : 'Please, give some money to support the author') + '</span></a><blockquote class="Untext" style="display:none">'
            + '         <span style="color: green;">WebMoney:</span><br><br>'
            + '         WMR: R315459808319<br>'
            + '         WMZ: Z369950673873<br>'
            + '         WME: E267617112206<br>'
            + '         WMU: U348418656968<br>'
            + '     </blockquote>'
+ '</span></a><blockquote class="Untext" style="display:none">'
            + '         <span style="color: green;">Яндекс Деньги:</span><br><br>'
            + '         № кошелька: 410011968990835<br>'
            + '         Спасибо всем за поддержку, благодарен вам за каждую копейку <br>'
            + '     </blockquote>'
            + (lang === "ru" ? '<blockquote class="Untext" style="display:none">'
            + '     <span style="color: green;">Рассказать друзьям:</span><br><br>'
            + '		<a onclick="window.open(\'http://vkontakte.ru/share.php?url=http://userscripts.org/scripts/show/169225&title=Расширенная статистика на сайте http://worldoftanks.ru&description=Скрипт добавляет расширенную статистику(рейтинги, статистика по сохраненным данным и т.д.) на сайт worldoftanks&image=http://wiki.worldoftanks.ru/uploads/thumb/3/30/Wot_logo_metal.png/223px-Wot_logo_metal.png\', \'vkontakte\', \'width=626, height=436\'); return false;" rel="nofollow" href="http://vkontakte.ru/share.php?url=http://userscripts.org/scripts/show/169225"><img src="http://vk.com/images/vk32.png" width="32" height="32" title="Поделиться с друзьями ВКонтакте"></a>'
            + '</blockquote>' : '')
            + "</div></div>";
    timeDiv.appendChild(fake_div);

    var server = document.location.host.match(/\.([^\.]+)$/)[1].toUpperCase();
    server = server === "COM" ? "NAm" : server;
    var fake_div = document.createElement("div");
    fake_div.innerHTML = "<p><a class='b-orange-arrow' href='http://td82.ru/wotka?nickname=" + playerNick + "&server=" + server + "'>"
            + ((lang === "ru") ? "История кланов" : "Clan history") + "</a></p>";
    clanDiv.appendChild(fake_div);

    if (!AllBattles || AllBattles < 100)
        return false;

    var effres = CalcEff(0, AllAvgLev, AllBattles, AllWins, AllDamag, AllFrags, AllSpotted, AllCaps, AllDefs, AllXp);

    var UsSettings = getCookie("usSettings"),
            settings = new Object();

    if (UsSettings) {
        var setArr = UsSettings.split("|"),
                blSetArr = setArr[0].split("/");
        for (var i = 0; i < blSetArr.length; i++) {
            var bsVals = blSetArr[i].split(';');
            if (toFl(bsVals[1]) === 1)
                document.querySelector('[btype="' + bsVals[0] + '"]').cells[1].getElementsByTagName('input')[0].checked = true;
            if (toFl(bsVals[2]) === 1)
                document.querySelector('[btype="' + bsVals[0] + '"]').cells[2].getElementsByTagName('input')[0].checked = true;
            settings[bsVals[0]] = [bsVals[1], bsVals[2]];
        }
        bsVals = setArr[1].split(';');
        settings.compare = toFl(bsVals[0]);
        if (settings.compare === 1) {
            document.getElementById('us-settings-compare').checked = true;
            document.getElementById('us-my-compare-block').style.display = "block";
        }
        settings.compareAdr = bsVals[1];
        document.getElementById('us-settings-compare-page').value = settings.compareAdr;
        var suid = settings.compareAdr.match(/\/(\d+)/);
        settings.UserID = settings.compare && suid ? suid[1] : false;
        if (settings.UserID && document.getElementById("ustr" + settings.UserID))
            document.getElementById("ustr" + settings.UserID).style.display = "none";
        if (setArr.length > 2) {
            settings.gtype = setArr[2];
        } else {
            settings.gtype = "all";
        }
        if (setArr.length > 3) {
            var us_strs = setArr[3].split("/");
            for (i = 0; i < us_strs.length; i++) {
                var us_vals = us_strs[i].split(";");
                if (us_vals.length > 1 && document.getElementById('us' + us_vals[0])) {
                    settings[us_vals[0]] = us_vals[1];
                    document.getElementById('us' + us_vals[0]).value = us_vals[1];
                }
            }
        }
        document.getElementById(settings.gtype).click();
    }

    daystat = GetStat();

    if (daystat) {
        var dsArr = daystat.split("|"),
                strArray = dsArr[0].split("/"),
                str = strArray[0].split(";"),
                oldMedals = [],
                timeStat = new Date(str[0]),
                olddaypassed = (timeStat - new Date(document.getElementsByClassName("js-date-format")[0].getAttribute("data-timestamp") * 1000)) / 1000 / 60 / 60 / 24;

        if (timeStat.toLocaleFormat)
            var oldTime = timeStat.toLocaleFormat("%d.%m.%Y %H:%M");
        else
            oldTime = timeStat.toLocaleString().substr(0, timeStat.toLocaleString().lastIndexOf(":"));

        var statText = '<span style="font-weight: bold; color: white;">' + (lang === "ru" ? 'Статистика c ' + oldTime : 'Stat. from ' + oldTime) + '</span><br>';

        if (dsArr.length > 1) {
            var MedArr = dsArr[1].split("/");
            for (var i = 0; i < MedArr.length; i++) {
                var MedStr = MedArr[i].split(";");
                oldMedals[MedStr[0]] = toFl(MedStr[1]);
            }
        }

        if (str.length > 3) {
            var OldBattles = toFl(str[12]),
                    NewBattles = AllBattles - OldBattles,
                    OldWins = toFl(str[10]),
                    NewWins = AllWins - OldWins,
                    OldXp = toFl(str[24]),
                    NewXp = AllXp - OldXp,
                    OldDamag = toFl(str[16]),
                    NewDamag = AllDamag - OldDamag,
                    OldFrags = toFl(str[20]),
                    NewFrags = AllFrags - OldFrags,
                    OldSpotted = toFl(str[22]),
                    NewSpotted = AllSpotted - OldSpotted,
                    OldCaps = toFl(str[14]),
                    NewCaps = AllCaps - OldCaps,
                    OldDefs = toFl(str[18]),
                    NewDefs = AllDefs - OldDefs,
                    OldGold = toFl(str[1]),
                    OldCredit = toFl(str[2]),
                    OldExp = toFl(str[3]);
            OldWinPerc = toFl(str[6]);
        }
        if (AllGold) {
            var NewGold = toFl(AllGold.innerHTML) - OldGold;
            if (NewGold) {
                AllGold.innerHTML = AllGold.innerHTML + " (" + (NewGold > 0 ? "+" + NewGold : NewGold) + ")";
                statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Золото: ' : 'Gold: ') + '</div><span class="currency-gold" style="float:right">' + (NewGold > 0 ? "+" + NewGold : NewGold) + "</span><br>";
            }
        }
        if (AllCredit) {
            var NewCredit = toFl(AllCredit.innerHTML) - OldCredit;
            if (NewCredit) {
                AllCredit.innerHTML = AllCredit.innerHTML + " (" + (NewCredit > 0 ? "+" + NewCredit : NewCredit) + ")";
                statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Кредиты: ' : 'Credits: ') + '</div><span class="currency-credit" style="float:right">' + (NewCredit > 0 ? "+" + NewCredit : NewCredit) + "</span><br>";
            }
        }
        if (AllExp) {
            var NewExp = toFl(AllExp.innerHTML) - OldExp;
            if (NewExp) {
                AllExp.innerHTML = AllExp.innerHTML + " (" + (NewExp > 0 ? "+" + NewExp : NewExp) + ")";
                statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Свободный опыт: ' : 'Free experience: ') + '</div><span class="currency-experience" style="float:right">' + (NewExp > 0 ? "+" + NewExp : NewExp) + "</span><br>";
            }
        }
        for (var i = 1; i < strArray.length; i++) {
            str = strArray[i].split(";");
            var tName = str[0].toLowerCase();
            dayArray[tName] = new Object();
            dayArray[tName].b = toFl(str[1]);
            dayArray[tName].w = str.length > 3 ? str[3] : -1;
        }
        var cav = CalcOldAvgLev(dayArray, tanksarr),
                OldAvgLev = cav[0],
                NewAvgLev = cav[1],
                neffs = CalcEff(1, NewAvgLev, NewBattles, NewWins, NewDamag, NewFrags, NewSpotted, NewCaps, NewDefs, NewXp),
                oeffs = CalcEff(0, OldAvgLev, OldBattles, OldWins, OldDamag, OldFrags, OldSpotted, OldCaps, OldDefs, OldXp);
        if (effres[0] < 440)
            oxeff = 0;
        else
            oxeff = Math.max(Math.min(oeffs[0] * (oeffs[0] * (oeffs[0] * (oeffs[0] * (oeffs[0] * (0.000000000000000045254 * oeffs[0] - 0.00000000000033131) + 0.00000000094164) - 0.0000013227) + 0.00095664) - 0.2598) + 13.23, 100), 0).toFixed(2);
        if (oeffs[2] > 2140)
            oxwn = 100;
        else
            oxwn = Math.max(Math.min(oeffs[2] * (oeffs[2] * (oeffs[2] * (-0.00000000001268 * oeffs[2] + 0.00000005147) - 0.00006418) + 0.07576) - 7.25, 100), 0).toFixed(2);
    }

    xdr.xget("http://api." + document.location.host + "/2.0/account/info/?application_id=895d3dafdd87af03e1e515befcd83882&account_id=" + UserId, batCompanyClan);

    //<-Блок Новые бои
    if (NewBattles) {
        var NBtresulttable = document.getElementsByClassName("b-user-block")[0],
                NBmainDiv = document.createElement('div'),
                NBsDiv = document.createElement('div'),
                NBsDivH3 = document.createElement('h3'),
                NBMedalsA = document.createElement('div'),
                NBMedalsDiv = document.createElement("div"),
                NBMedalsDivUl = document.createElement("ul"),
                NBthDiv = document.createElement('div'),
                NBretbodytrtd1table = document.createElement('table'),
                NBretbodytrtd2table = document.createElement('table'),
                NBretbodytrtd3table = document.createElement('table'),
                NBretbodytrtd1tabletbody = document.createElement('tbody'),
                NBretbodytrtd2tabletbody = document.createElement('tbody'),
                NBretbodytrtd3tabletbody = document.createElement('tbody'),
                NBh31 = document.createElement('h3'),
                NBh32 = document.createElement('h3'),
                NBh33 = document.createElement('h3'),
                NBdiv1 = document.createElement('div'),
                NBdiv2 = document.createElement('div'),
                NBdiv3 = document.createElement('div'),
                spDiv1 = document.createElement('div'),
                spA1 = document.createElement('a'),
                spSp1 = document.createElement('span');

        document.getElementsByClassName("b-userblock-wrpr")[0].insertBefore(NBmainDiv, NBtresulttable);
        NBmainDiv.className = "b-user-block";
        NBsDiv.className = "b-head-block";
        NBsDivH3.innerHTML = lang === "ru" ? "Новые бои" : "New battles";
        NBthDiv.setAttribute('class', "b-user-info clearfix");

        NBh31.innerHTML = lang === "ru" ? "Новые" : "New";
        NBh32.innerHTML = lang === "ru" ? "Сохр. данные" : "Saved";
        NBh32.setAttribute('style', 'float: right;');
        NBh33.innerHTML = lang === "ru" ? "Тек. данные" : "Current";
        NBh33.setAttribute('style', 'float: right;');

        NBretbodytrtd1table.setAttribute('class', 't-table-dotted');
        NBretbodytrtd1table.appendChild(NBretbodytrtd1tabletbody);
        NBretbodytrtd2table.setAttribute('class', 't-table-dotted');
        NBretbodytrtd2table.appendChild(NBretbodytrtd2tabletbody);
        NBretbodytrtd3table.setAttribute('class', 't-table-dotted');
        NBretbodytrtd3table.appendChild(NBretbodytrtd3tabletbody);

        NBdiv1.setAttribute('style', 'float: left; width: 45%; margin-left: 25px;');
        NBdiv2.setAttribute('style', 'float: left; width: 24%;');
        NBdiv3.setAttribute('style', 'float: left; width: 24%;');

        NBMedalsA.setAttribute('style', 'padding-left: 27px; padding-top: 10px;');
        NBMedalsDiv.setAttribute('style', 'padding-left: 20px; display: none;');
        NBMedalsA.innerHTML = '<a class="b-vertical-arrow us-show-medals" href="#"><span class="b-fake-link">' + (lang === "ru" ? "Медали" : "Medals") + '</span></a>';

        NBdiv1.appendChild(NBh31);
        NBdiv1.appendChild(NBretbodytrtd1table);
        NBdiv2.appendChild(NBh32);
        NBdiv2.appendChild(NBretbodytrtd2table);
        NBdiv3.appendChild(NBh33);
        NBdiv3.appendChild(NBretbodytrtd3table);
        NBsDiv.appendChild(NBsDivH3);
        NBmainDiv.appendChild(NBsDiv);
        NBMedalsDiv.appendChild(NBMedalsDivUl);
        NBmainDiv.appendChild(NBMedalsA);
        NBmainDiv.appendChild(NBMedalsDiv);
        NBthDiv.appendChild(NBdiv1);
        NBthDiv.appendChild(NBdiv2);
        NBthDiv.appendChild(NBdiv3);
        NBmainDiv.appendChild(NBthDiv);

        var hrIn = statTooltip.length === 0;

        var medals = document.getElementsByClassName("js-full-achievements")[0].getElementsByClassName("b-achivements_item");
        for (i = 0; i < medals.length; i++) {
            if ((" " + medals[i].className + " ").replace(/[\n\t]/g, " ").indexOf(" b-achivements_item__empty ") === -1) {
                var count = medals[i].getElementsByTagName('div')[0];
                if (count) {
                    count = count.getElementsByTagName('span')[0].getElementsByTagName('span')[0];
                    if (count) {
                        count = toFl(count.innerHTML);
                    } else {
                        count = 1;
                    }
                } else {
                    count = 1;
                }
                var oldMCount = oldMedals[medals[i].id.split("-")[2]];
                if (!oldMCount)
                    oldMCount = 0;
                if (count !== oldMCount) {
                    var node = medals[i].cloneNode(true),
                            node2 = document.getElementById("js-achivement-" + medals[i].id.split("-")[2] + "_tooltip").cloneNode(true);
                    node.className = "js-tooltip";
                    node.id = "nb-achivement-" + medals[i].id.split("-")[2];
                    node2.id = "nb-achivement-" + medals[i].id.split("-")[2] + "_tooltip";
                    node.setAttribute("style", "float: left; margin: 27px 10px 0 0; position: relative;");
                    if (count !== 1)
                        node.getElementsByTagName('div')[0].getElementsByTagName('span')[0].getElementsByTagName('span')[0].innerHTML = (count - oldMCount);
                    NBMedalsDivUl.appendChild(node);
                    NBMedalsDivUl.appendChild(node2);
                    if (!hrIn && statTooltip.length !== 0) {
                        statTooltip += '<hr>';
                        hrIn = true;
                    }
                    statTooltip += "<div style='float:left'>" + node2.getElementsByTagName('p')[0].innerHTML + ':</div><span style="float:right">+' + (count - oldMCount) + "</span><br>";
                }
            }
        }

        hrIn = statTooltip.length === 0;

        insertNewTr(NBretbodytrtd1tabletbody, (lang === "ru") ? "Боев|Побед (%Побед)" : "Battles|Wins (%Wins):", (NewBattles) + "|" + (NewWins) + " (" + col(NewWins / NewBattles * 100, 2) + ")", "", "Nbw1");
        statText += "<br><div style='float:left;'>" + (lang === "ru" ? "Боев: " : "Battles: ") + NewBattles + "</div><div style='float:right;'>" + (lang === "ru" ? "Побед: " : "Wins: ") + NewWins + " (" + col(NewWins / NewBattles * 100, 2) + ")</div>";
        if ((AllWins / AllBattles * 100 - OldWins / OldBattles * 100).toFixed(2) * 1 !== 0) {
            if (!hrIn && statTooltip.length !== 0) {
                statTooltip += '<hr>';
                hrIn = true;
            }
            statTooltip += "<div style='float:left'>" + (lang === "ru" ? '% побед: ' : 'Win %: ') + "</div><div style='float:right'>" + (AllWins / AllBattles * 100 - OldWins / OldBattles * 100 > 0 ? "<font color='green'>+" + (AllWins / AllBattles * 100 - OldWins / OldBattles * 100).toFixed(2) : "<font color='red'>" + (AllWins / AllBattles * 100 - OldWins / OldBattles * 100).toFixed(2)) + "</font></div><br>";
        }
        var deltaWin = ((NewWins / NewBattles * 100).toFixed(2) - (OldWins / OldBattles * 100).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd2tabletbody, "", col(OldWins / OldBattles * 100, 2) + (deltaWin * 1 !== 0 ? (deltaWin > 0) ? "<font color='green'> (+" + deltaWin + "%)</font>" : "<font color='red'> (" + deltaWin + "%)</font>" : ""), "", "Nbw2");
        deltaWin = ((AllWins / AllBattles * 100).toFixed(2) - (OldWins / OldBattles * 100).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd3tabletbody, "", col(AllWins / AllBattles * 100, 2) + (deltaWin * 1 !== 0 ? (deltaWin > 0) ? "<font color='green'> (+" + deltaWin + "%)</font>" : "<font color='red'> (" + deltaWin + "%)</font>" : ""), "", "Nbw3");

        insertNewTr(NBretbodytrtd1tabletbody, (lang === "ru") ? "Опыт за бой" : "Exp per battle", (NewXp / NewBattles).toFixed(2), "", "Nbe1");
        if ((AllXp / AllBattles - OldXp / OldBattles).toFixed(2) * 1 !== 0) {
            if (!hrIn && statTooltip.length !== 0) {
                statTooltip += '<hr>';
                hrIn = true;
            }
            statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Опыт за бой: ' : 'Exp per battle: ') + "</div><div style='float:right'>" + (AllXp / AllBattles - OldXp / OldBattles > 0 ? "<font color='green'>+" + (AllXp / AllBattles - OldXp / OldBattles).toFixed(2) : "<font color='red'>" + (AllXp / AllBattles - OldXp / OldBattles).toFixed(2)) + "</font></div><br>";
        }
        var deltaExp = ((NewXp / NewBattles).toFixed(2) - (OldXp / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd2tabletbody, "", (OldXp / OldBattles).toFixed(2) + (deltaExp * 1 !== 0 ? (deltaExp > 0) ? "<font color='green'> (+" + deltaExp + ")</font>" : "<font color='red'> (" + deltaExp + ")</font>" : ""), "", "Nbe2");
        deltaExp = ((AllXp / AllBattles).toFixed(2) - (OldXp / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd3tabletbody, "", (AllXp / AllBattles).toFixed(2) + (deltaExp * 1 !== 0 ? (deltaExp > 0) ? "<font color='green'> (+" + deltaExp + ")</font>" : "<font color='red'> (" + deltaExp + ")</font>" : ""), "", "Nbe3");

        insertNewTr(NBretbodytrtd1tabletbody, (lang === "ru") ? "Средний уровень танков" : "Average level of tanks", NewAvgLev.toFixed(2), "", "Nbav1");
        if ((AllAvgLev.toFixed(2) - OldAvgLev.toFixed(2)).toFixed(2) * 1 !== 0) {
            if (!hrIn && statTooltip.length !== 0) {
                statTooltip += '<hr>';
                hrIn = true;
            }
            statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Средний уровень танков: ' : 'Average level of tanks: ') + "</div><div style='float:right'>" + (AllAvgLev.toFixed(2) - OldAvgLev.toFixed(2) > 0 ? "<font color='green'>+" + (AllAvgLev.toFixed(2) - OldAvgLev.toFixed(2)).toFixed(2) : "<font color='red'>" + (AllAvgLev.toFixed(2) - OldAvgLev.toFixed(2)).toFixed(2)) + "</font></div><br>";
        }
        var deltaAvg = (NewAvgLev.toFixed(2) - OldAvgLev.toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd2tabletbody, "", OldAvgLev.toFixed(2) + (deltaAvg * 1 !== 0 ? (deltaAvg > 0) ? "<font color='green'> (+" + deltaAvg + ")</font>" : "<font color='red'> (" + deltaAvg + ")</font>" : ""), "", "Nbav2");
        deltaAvg = (AllAvgLev.toFixed(2) - OldAvgLev.toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd3tabletbody, "", AllAvgLev.toFixed(2) + (deltaAvg * 1 !== 0 ? (deltaAvg > 0) ? "<font color='green'> (+" + deltaAvg + ")</font>" : "<font color='red'> (" + deltaAvg + ")</font>" : ""), "", "Nbav3");

        insertNewTr(NBretbodytrtd1tabletbody, (lang === "ru") ? "Повреждений за бой" : "Damage per battle", (NewDamag / NewBattles).toFixed(2), EffTooltip("damage", NewDamag, neffs, NewBattles, NewAvgLev, lang), "Nbd1");
        if (((AllDamag / AllBattles).toFixed(2) - (OldDamag / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0) {
            if (!hrIn && statTooltip.length !== 0) {
                statTooltip += '<hr>';
                hrIn = true;
            }
            statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Повреждений за бой: ' : 'Damage per battle: ') + "</div><div style='float:right'>" + ((AllDamag / AllBattles).toFixed(2) - (OldDamag / OldBattles).toFixed(2) > 0 ? "<font color='green'>+" + ((AllDamag / AllBattles).toFixed(2) - (OldDamag / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'>" + ((AllDamag / AllBattles).toFixed(2) - (OldDamag / OldBattles).toFixed(2)).toFixed(2)) + "</font></div><br>";
        }
        var deltaDmg = ((NewDamag / NewBattles).toFixed(2) - (OldDamag / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd2tabletbody, "", (OldDamag / OldBattles).toFixed(2) + (deltaDmg * 1 !== 0 ? (deltaDmg > 0) ? "<font color='green'> (+" + deltaDmg + ")</font>" : "<font color='red'> (" + deltaDmg + ")</font>" : ""), EffTooltip("damage", OldDamag, oeffs, OldBattles, OldAvgLev, lang), "Nbd2");
        deltaDmg = ((AllDamag / AllBattles).toFixed(2) - (OldDamag / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd3tabletbody, "", (AllDamag / AllBattles).toFixed(2) + (deltaDmg * 1 !== 0 ? (deltaDmg > 0) ? "<font color='green'> (+" + deltaDmg + ")</font>" : "<font color='red'> (" + deltaDmg + ")</font>" : ""), EffTooltip("damage", AllDamag, effres, AllBattles, AllAvgLev, lang), "Nbd3");


        insertNewTr(NBretbodytrtd1tabletbody, (lang === "ru") ? "Фрагов за бой" : "Frags per battle", (NewFrags / NewBattles).toFixed(2), EffTooltip("frags", NewFrags, neffs, NewBattles, NewAvgLev, lang), "Nbf1");
        if (((AllFrags / AllBattles).toFixed(2) - (OldFrags / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0) {
            if (!hrIn && statTooltip.length !== 0) {
                statTooltip += '<hr>';
                hrIn = true;
            }
            statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Фрагов за бой: ' : 'Frags per battle: ') + "</div><div style='float:right'>" + ((AllFrags / AllBattles).toFixed(2) - (OldFrags / OldBattles).toFixed(2) > 0 ? "<font color='green'>+" + ((AllFrags / AllBattles).toFixed(2) - (OldFrags / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'>" + ((AllFrags / AllBattles).toFixed(2) - (OldFrags / OldBattles).toFixed(2)).toFixed(2)) + "</font></div><br>";
        }
        var deltaFr = ((NewFrags / NewBattles).toFixed(2) - (OldFrags / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd2tabletbody, "", (OldFrags / OldBattles).toFixed(2) + (deltaFr * 1 !== 0 ? (deltaFr > 0) ? "<font color='green'> (+" + deltaFr + ")</font>" : "<font color='red'> (" + deltaFr + ")</font>" : ""), EffTooltip("frags", OldFrags, oeffs, OldBattles, OldAvgLev, lang), "Nbf2");
        deltaFr = ((AllFrags / AllBattles).toFixed(2) - (OldFrags / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd3tabletbody, "", (AllFrags / AllBattles).toFixed(2) + (deltaFr * 1 !== 0 ? (deltaFr > 0) ? "<font color='green'> (+" + deltaFr + ")</font>" : "<font color='red'> (" + deltaFr + ")</font>" : ""), EffTooltip("frags", AllFrags, effres, AllBattles, AllAvgLev, lang), "Nbf3");


        insertNewTr(NBretbodytrtd1tabletbody, (lang === "ru") ? "Обнаружено за бой" : "Spotted per battle", (NewSpotted / NewBattles).toFixed(2), EffTooltip("spotted", NewSpotted, neffs, NewBattles, NewAvgLev, lang), "Nbs1");
        if (((AllSpotted / AllBattles).toFixed(2) - (OldSpotted / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0) {
            if (!hrIn && statTooltip.length !== 0) {
                statTooltip += '<hr>';
                hrIn = true;
            }
            statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Обнаружено за бой: ' : 'Spotted per battle: ') + "</div><div style='float:right'>" + ((AllSpotted / AllBattles).toFixed(2) - (OldSpotted / OldBattles).toFixed(2) > 0 ? "<font color='green'>+" + ((AllSpotted / AllBattles).toFixed(2) - (OldSpotted / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'>" + ((AllSpotted / AllBattles).toFixed(2) - (OldSpotted / OldBattles).toFixed(2)).toFixed(2)) + "</font></div><br>";
        }
        var deltaSp = ((NewSpotted / NewBattles).toFixed(2) - (OldSpotted / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd2tabletbody, "", (OldSpotted / OldBattles).toFixed(2) + (deltaSp * 1 !== 0 ? (deltaSp > 0) ? "<font color='green'> (+" + deltaSp + ")</font>" : "<font color='red'> (" + deltaSp + ")</font>" : ""), EffTooltip("spotted", OldSpotted, oeffs, OldBattles, OldAvgLev, lang), "Nbs2");
        deltaSp = ((AllSpotted / AllBattles).toFixed(2) - (OldSpotted / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd3tabletbody, "", (AllSpotted / AllBattles).toFixed(2) + (deltaSp * 1 !== 0 ? (deltaSp > 0) ? "<font color='green'> (+" + deltaSp + ")</font>" : "<font color='red'> (" + deltaSp + ")</font>" : ""), EffTooltip("spotted", AllSpotted, effres, AllBattles, AllAvgLev, lang), "Nbs3");

        insertNewTr(NBretbodytrtd1tabletbody, (lang === "ru") ? "Очков захвата за бой" : "Caps per battle", (NewCaps / NewBattles).toFixed(2), EffTooltip("caps", NewCaps, neffs, NewBattles, NewAvgLev, lang), "Nbc1");
        if (((AllCaps / AllBattles).toFixed(2) - (OldCaps / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0) {
            if (!hrIn && statTooltip.length !== 0) {
                statTooltip += '<hr>';
                hrIn = true;
            }
            statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Очков захвата за бой: ' : 'Caps per battle: ') + "</div><div style='float:right'>" + ((AllCaps / AllBattles).toFixed(2) - (OldCaps / OldBattles).toFixed(2) > 0 ? "<font color='green'>+" + ((AllCaps / AllBattles).toFixed(2) - (OldCaps / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'>" + ((AllCaps / AllBattles).toFixed(2) - (OldCaps / OldBattles).toFixed(2)).toFixed(2)) + "</font></div><br>";
        }
        var deltaCap = ((NewCaps / NewBattles).toFixed(2) - (OldCaps / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd2tabletbody, "", (OldCaps / OldBattles).toFixed(2) + (deltaCap * 1 !== 0 ? (deltaCap > 0) ? "<font color='green'> (+" + deltaCap + ")</font>" : "<font color='red'> (" + deltaCap + ")</font>" : ""), EffTooltip("caps", OldCaps, oeffs, OldBattles, OldAvgLev, lang), "Nbc2");
        deltaCap = (AllCaps / AllBattles - OldCaps / OldBattles).toFixed(2);
        insertNewTr(NBretbodytrtd3tabletbody, "", (AllCaps / AllBattles).toFixed(2) + (deltaCap * 1 !== 0 ? (deltaCap > 0) ? "<font color='green'> (+" + deltaCap + ")</font>" : "<font color='red'> (" + deltaCap + ")</font>" : ""), EffTooltip("caps", AllCaps, effres, AllBattles, AllAvgLev, lang), "Nbc3");

        insertNewTr(NBretbodytrtd1tabletbody, (lang === "ru") ? "Очков защиты за бой" : "Defs per battle", (NewDefs / NewBattles).toFixed(2), EffTooltip("defs", NewDefs, neffs, NewBattles, NewAvgLev, lang), "Nbde1");
        if (((AllDefs / AllBattles).toFixed(2) - (OldDefs / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0) {
            if (!hrIn && statTooltip.length !== 0) {
                statTooltip += '<hr>';
                hrIn = true;
            }
            statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Очков защиты за бой: ' : 'Defs per battle: ') + "</div><div style='float:right'>" + ((AllDefs / AllBattles).toFixed(2) - (OldDefs / OldBattles).toFixed(2) > 0 ? "<font color='green'>+" + ((AllDefs / AllBattles).toFixed(2) - (OldDefs / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'>" + ((AllDefs / AllBattles).toFixed(2) - (OldDefs / OldBattles).toFixed(2)).toFixed(2)) + "</font></div><br>";
        }
        var deltaDef = ((NewDefs / NewBattles).toFixed(2) - (OldDefs / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd2tabletbody, "", (OldDefs / OldBattles).toFixed(2) + (deltaDef * 1 !== 0 ? (deltaDef > 0) ? "<font color='green'> (+" + deltaDef + ")</font>" : "<font color='red'> (" + deltaDef + ")</font>" : ""), EffTooltip("defs", OldDefs, oeffs, OldBattles, OldAvgLev, lang), "Nbde2");
        deltaDef = ((AllDefs / AllBattles).toFixed(2) - (OldDefs / OldBattles).toFixed(2)).toFixed(2);
        insertNewTr(NBretbodytrtd3tabletbody, "", (AllDefs / AllBattles).toFixed(2) + (deltaDef * 1 !== 0 ? (deltaDef > 0) ? "<font color='green'> (+" + deltaDef + ")</font>" : "<font color='red'> (" + deltaDef + ")</font>" : ""), EffTooltip("defs", AllDefs, effres, AllBattles, AllAvgLev, lang), "Nbde3");

        insertNewTr(NBretbodytrtd1tabletbody, (lang === "ru") ? " Эффективность" : "Eff. rating", "<font color='" + CalcEffColor(Number(neffs[0]), "eff")[0] + "'>" + neffs[0] + "</font>", CalcEffColor(Number(neffs[0]), "eff")[1], "Nbef1");
        var delta = neffs[0] - oeffs[0];
        insertNewTr(NBretbodytrtd2tabletbody, "", "<font color='" + CalcEffColor(Number(oeffs[0]), "eff")[0] + "'>" + oeffs[0] + (delta * 1 !== 0 ? (delta > 0) ? "<font color='green'> (+" + delta.toFixed(2) + ")</font>" : "<font color='red'> (" + delta.toFixed(2) + ")</font>" : "") + "</font>", CalcEffColor(Number(oeffs[0]), "eff")[1], "Nbef2");
        delta = effres[0] - oeffs[0];
        insertNewTr(NBretbodytrtd3tabletbody, "", "<font color='" + CalcEffColor(Number(effres[0]), "eff")[0] + "'>" + effres[0] + (delta * 1 !== 0 ? (delta > 0) ? "<font color='green'> (+" + delta.toFixed(2) + ")</font>" : "<font color='red'> (" + delta.toFixed(2) + ")</font>" : "") + "</font>", CalcEffColor(Number(effres[0]), "eff")[1], "Nbef3");

        insertNewTr(NBretbodytrtd1tabletbody, (lang === "ru") ? " WN6 Рейтинг" : "WN6 Rating", "<font color='" + CalcEffColor(Number(neffs[2]), "wn6")[0] + "'>" + neffs[2] + "</font>", CalcEffColor(Number(neffs[2]), "wn6")[1], "Nbwn1");
        var delta = neffs[2] - oeffs[2];
        insertNewTr(NBretbodytrtd2tabletbody, "", "<font color='" + CalcEffColor(Number(oeffs[2]), "wn6")[0] + "'>" + oeffs[2] + (delta * 1 !== 0 ? (delta > 0) ? "<font color='green'> (+" + delta.toFixed(2) + ")</font>" : "<font color='red'> (" + delta.toFixed(2) + ")</font>" : "") + "</font>", CalcEffColor(Number(oeffs[2]), "wn6")[1], "Nbwn2");
        delta = effres[2] - oeffs[2];
        insertNewTr(NBretbodytrtd3tabletbody, "", "<font color='" + CalcEffColor(Number(effres[2]), "wn6")[0] + "'>" + effres[2] + (delta * 1 !== 0 ? (delta > 0) ? "<font color='green'> (+" + delta.toFixed(2) + ")</font>" : "<font color='red'> (" + delta.toFixed(2) + ")</font>" : "") + "</font>", CalcEffColor(Number(effres[2]), "wn6")[1], "Nbwn3");

        var blBool = settings.newBat && (toFl(settings.newBat[1]) !== 0 || toFl(settings.newBat[0]) !== 0);

        spSp1.className = "b-fake-link";
        spSp1.innerHTML = blBool ? (lang === "ru" ? 'Развернуть блок "Новые бои"' : 'Expand "New battles"') : (lang === "ru" ? 'Свернуть блок "Новые бои"' : 'Collapse "New battles"');
        spA1.appendChild(spSp1);
        spA1.className = "b-vertical-arrow sh-speedometr" + (blBool ? "" : " b-vertical-arrow__open");
        spA1.setAttribute('curSt', blBool ? 1 : 0);
        spA1.setAttribute('curStText', (lang === "ru" ? '"Новые бои"' : '"New battles"'));
        spA1.href = "#";
        spDiv1.setAttribute('style', 'text-align: right; margin-right: 15px;' + (blBool ? "padding-top: 10px; padding-bottom: 10px;" : ""));
        spDiv1.appendChild(spA1);
    }
    //->Блок Новые бои

    //<-Блок сравнение игроков
    var comparestat = GetLSData("compareStat");
    if (comparestat && settings.compare === 1 && AllBattles && window.location.href.indexOf(settings.UserID) === -1) {
        var mArr = comparestat.split("|"),
                strArray = mArr[0].split("/"),
                str = strArray[0].split(";"),
                timeStat = new Date(str[0]),
                compareMedals = [];
        if (timeStat) {
            if (timeStat.toLocaleFormat)
                var compareTime = timeStat.toLocaleFormat("%d.%m.%Y %H:%M");
            else
                compareTime = timeStat.toLocaleString().substr(0, timeStat.toLocaleString().lastIndexOf(":"));

            if (mArr.length > 2) {
                var MedArr = mArr[2].split("/");
                for (var i = 0; i < MedArr.length; i++) {
                    var MedStr = MedArr[i].split(";");
                    compareMedals[MedStr[0]] = toFl(MedStr[1]);
                }
            }

            if (str.length > 3) {
                var compareBattles = toFl(str[12]),
                        compareWins = toFl(str[10]),
                        compareXp = toFl(str[24]),
                        compareDamag = toFl(str[16]),
                        compareFrags = toFl(str[20]),
                        compareSpotted = toFl(str[22]),
                        compareCaps = toFl(str[14]),
                        compareDefs = toFl(str[18]),
                        compareAvgLev = parseFloat(mArr[1]);
            }

            for (var i = 1; i < strArray.length; i++) {
                str = strArray[i].split(";");
                var tName = str[0].toLowerCase();
                comparedayArray[tName] = new Object();
                comparedayArray[tName].b = toFl(str[1]);
                comparedayArray[tName].w = toFl(str[2]);
            }

            var Cmptresulttable = document.getElementsByClassName("b-user-block")[0],
                    CmpmainDiv = document.createElement('div'),
                    CmpsDiv = document.createElement('div'),
                    CmpsDivH3 = document.createElement('h3'),
                    CmpthDiv = document.createElement('div'),
                    CmpMedalsA = document.createElement("div"),
                    CmpMedalsDiv = document.createElement("div"),
                    CmpMedalsDivUl = document.createElement("ul"),
                    Cmpretbodytrtd1table = document.createElement('table'),
                    Cmpretbodytrtd2table = document.createElement('table'),
                    Cmpretbodytrtd3table = document.createElement('table'),
                    Cmpretbodytrtd1tabletbody = document.createElement('tbody'),
                    Cmpretbodytrtd2tabletbody = document.createElement('tbody'),
                    Cmpretbodytrtd3tabletbody = document.createElement('tbody'),
                    Cmph31 = document.createElement('h5'),
                    Cmph32 = document.createElement('h5'),
                    Cmph33 = document.createElement('h5'),
                    Cmpdiv1 = document.createElement('div'),
                    Cmpdiv2 = document.createElement('div'),
                    Cmpdiv3 = document.createElement('div'),
                    CmpspDiv1 = document.createElement('div'),
                    CmpspA1 = document.createElement('a'),
                    CmpspSp1 = document.createElement('span');

            document.getElementsByClassName("b-userblock-wrpr")[0].insertBefore(CmpmainDiv, Cmptresulttable);
            CmpmainDiv.className = "b-user-block";
            CmpsDiv.className = "b-head-block";
            CmpsDivH3.innerHTML = lang === "ru" ? "Сравнение игрока со мной" : "Compare player with me";
            CmpthDiv.setAttribute('class', "b-user-info clearfix");

            Cmph31.innerHTML = lang === "ru" ? "Мои данные от <span style='color:green;'>" + compareTime + '</span>' : "My stat. from <span style='color:green;'>" + compareTime + '</span>';
            Cmph32.innerHTML = lang === "ru" ? "Данные игрока" : "Player stat.";
            Cmph32.setAttribute('style', 'float: right;');
            Cmph33.innerHTML = lang === "ru" ? "Дельта" : "Delta";
            Cmph33.setAttribute('style', 'float: right;');

            Cmpretbodytrtd1table.setAttribute('class', 't-table-dotted');
            Cmpretbodytrtd1table.appendChild(Cmpretbodytrtd1tabletbody);
            Cmpretbodytrtd2table.setAttribute('class', 't-table-dotted');
            Cmpretbodytrtd2table.appendChild(Cmpretbodytrtd2tabletbody);
            Cmpretbodytrtd3table.setAttribute('class', 't-table-dotted');
            Cmpretbodytrtd3table.appendChild(Cmpretbodytrtd3tabletbody);

            Cmpdiv1.setAttribute('style', 'float: left; width: 45%; margin-left: 25px;');
            Cmpdiv2.setAttribute('style', 'float: left; width: 24%;');
            Cmpdiv3.setAttribute('style', 'float: left; width: 24%;');

            CmpMedalsA.setAttribute('style', 'padding-left: 27px; padding-top: 10px;');
            CmpMedalsDiv.setAttribute('style', 'padding-left: 20px; display: none;');
            CmpMedalsA.innerHTML = '<a class="b-vertical-arrow us-show-medals" href="#"><span class="b-fake-link">' + (lang === "ru" ? "Медали" : "Medals") + '</span></a>';

            Cmpdiv1.appendChild(Cmph31);
            Cmpdiv1.appendChild(Cmpretbodytrtd1table);
            Cmpdiv2.appendChild(Cmph32);
            Cmpdiv2.appendChild(Cmpretbodytrtd2table);
            Cmpdiv3.appendChild(Cmph33);
            Cmpdiv3.appendChild(Cmpretbodytrtd3table);
            CmpsDiv.appendChild(CmpsDivH3);
            CmpmainDiv.appendChild(CmpsDiv);
            CmpMedalsDiv.appendChild(CmpMedalsDivUl);
            CmpmainDiv.appendChild(CmpMedalsA);
            CmpmainDiv.appendChild(CmpMedalsDiv);
            CmpthDiv.appendChild(Cmpdiv1);
            CmpthDiv.appendChild(Cmpdiv2);
            CmpthDiv.appendChild(Cmpdiv3);
            CmpmainDiv.appendChild(CmpthDiv);

            medals = document.getElementsByClassName("js-full-achievements")[0].getElementsByClassName("b-achivements_item");
            for (i = 0; i < medals.length; i++) {
                if ((" " + medals[i].className + " ").replace(/[\n\t]/g, " ").indexOf(" b-achivements_item__empty ") === -1) {
                    var count = medals[i].getElementsByTagName('div')[0];
                    if (count) {
                        count = count.getElementsByTagName('span')[0].getElementsByTagName('span')[0];
                        if (count) {
                            count = toFl(count.innerHTML);
                        } else {
                            count = 1;
                        }
                    } else {
                        count = 1;
                    }
                } else
                    count = 0;
                var CmpMCount = compareMedals[medals[i].id.split("-")[2]];
                if (!CmpMCount)
                    CmpMCount = 0;
                if (count !== CmpMCount) {
                    var node = medals[i].cloneNode(true),
                            node2 = document.getElementById("js-achivement-" + medals[i].id.split("-")[2] + "_tooltip").cloneNode(true);
                    node.className = "js-tooltip";
                    node.id = "cmp-achivement-" + medals[i].id.split("-")[2];
                    node2.id = "cmp-achivement-" + medals[i].id.split("-")[2] + "_tooltip";
                    node.setAttribute("style", "float: left; margin: 27px 10px 0 0; position: relative;");
                    var mC = node.getElementsByTagName('div')[0];
                    if (mC) {
                        var McS = mC.getElementsByTagName('span')[0];
                    } else {
                        node.innerHTML += '<div class="b-achivements_wrpr"><span class="b-achivements_num"><span>' + (CmpMCount - count) + '</span></span></div>';
                    }
                    if (McS) {
                        var McS2 = McS.getElementsByTagName('span')[0];
                    } else {
                        mC.innerHTML += '<span class="b-achivements_num"><span>' + (CmpMCount - count) + '</span></span>';
                    }
                    if (McS2) {
                        McS2.innerHTML = CmpMCount - count;
                    } else {
                        McS.innerHTML += '<span>' + (CmpMCount - count) + '</span>';
                    }
                    ;
                    CmpMedalsDivUl.appendChild(node);
                    CmpMedalsDivUl.appendChild(node2);
                }
            }

            var compareeffs = CalcEff(0, compareAvgLev, compareBattles, compareWins, compareDamag, compareFrags, compareSpotted, compareCaps, compareDefs, compareXp);

            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? "Боев|Побед (%Побед)" : "Battles|Wins (%Wins):", (compareBattles) + "|" + (compareWins) + " (" + col(compareWins / compareBattles * 100, 2) + ")", "", "comparew1");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", (AllBattles) + "|" + (AllWins) + " (" + col(AllWins / AllBattles * 100, 2) + ")", "", "comparew2");
            var deltaWin = ((compareWins / compareBattles * 100) - (AllWins / AllBattles * 100)).toFixed(2),
                    deltaBattles = compareBattles - AllBattles,
                    deltaWins = compareWins - AllWins,
                    dstr = '';
            if (deltaBattles > 0) {
                dstr += "<font color='green'>+" + deltaBattles + "</font>|";
            } else {
                dstr += "<font color='red'>" + deltaBattles + "</font>|";
            }
            if (deltaWins > 0) {
                dstr += "<font color='green'>+" + deltaWins + "</font>(";
            } else {
                dstr += "<font color='red'>" + deltaWins + "</font> (";
            }
            if (deltaWin > 0) {
                dstr += "<font color='green'>+" + deltaWin + "%</font>)";
            } else {
                dstr += "<font color='red'>" + deltaWin + "%</font>)";
            }
            insertNewTr(Cmpretbodytrtd3tabletbody, "", dstr, "", "comparew3");

            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? "Средний уровень танков" : "Average level of tanks", compareAvgLev.toFixed(2), "", "compareav1");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", AllAvgLev.toFixed(2), "", "compareav2");
            var deltaAvg = (compareAvgLev - AllAvgLev).toFixed(2);
            insertNewTr(Cmpretbodytrtd3tabletbody, "", (deltaAvg > 0) ? "<font color='green'>+" + deltaAvg + "</font>" : "<font color='red'>" + deltaAvg + "</font>", "", "compareav3");

            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? "Опыт за бой" : "Exp per battle", (compareXp / compareBattles).toFixed(2), "", "comparee1");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", (AllXp / AllBattles).toFixed(2), "", "comparee2");
            var deltaExp = (compareXp / compareBattles - AllXp / AllBattles).toFixed(2);
            insertNewTr(Cmpretbodytrtd3tabletbody, "", (deltaExp > 0) ? "<font color='green'>+" + deltaExp + "</font>" : "<font color='red'>" + deltaExp + "</font>", "", "comparee3");

            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? "Повреждений за бой" : "Damage per battle", (compareDamag / compareBattles).toFixed(2), EffTooltip("damage", compareDamag, compareeffs, compareBattles, compareAvgLev, lang), "compared1");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", (AllDamag / AllBattles).toFixed(2), EffTooltip("damage", AllDamag, effres, AllBattles, AllAvgLev, lang), "compared2");
            var deltaDmg = (compareDamag / compareBattles - AllDamag / AllBattles).toFixed(2);
            insertNewTr(Cmpretbodytrtd3tabletbody, "", (deltaDmg > 0) ? "<font color='green'>+" + deltaDmg + "</font>" : "<font color='red'>" + deltaDmg + "</font>", "", "compared3");


            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? "Фрагов за бой" : "Frags per battle", (compareFrags / compareBattles).toFixed(2), EffTooltip("frags", compareFrags, compareeffs, compareBattles, compareAvgLev, lang), "comparef1");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", (AllFrags / AllBattles).toFixed(2), EffTooltip("frags", AllFrags, effres, AllBattles, AllAvgLev, lang), "comparef2");
            var deltaFr = (compareFrags / compareBattles - AllFrags / AllBattles).toFixed(2);
            insertNewTr(Cmpretbodytrtd3tabletbody, "", (deltaFr > 0) ? "<font color='green'>+" + deltaFr + "</font>" : "<font color='red'>" + deltaFr + "</font>", "", "comparef3");


            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? "Обнаружено за бой" : "Spotted per battle", (compareSpotted / compareBattles).toFixed(2), EffTooltip("spotted", compareSpotted, compareeffs, compareBattles, compareAvgLev, lang), "compares1");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", (AllSpotted / AllBattles).toFixed(2), EffTooltip("spotted", AllSpotted, effres, AllBattles, AllAvgLev, lang), "compares2");
            var deltaSp = (compareSpotted / compareBattles - AllSpotted / AllBattles).toFixed(2);
            insertNewTr(Cmpretbodytrtd3tabletbody, "", (deltaSp > 0) ? "<font color='green'>+" + deltaSp + "</font>" : "<font color='red'>" + deltaSp + "</font>", "", "compares3");

            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? "Очков захвата за бой" : "Caps per battle", (compareCaps / compareBattles).toFixed(2), EffTooltip("caps", compareCaps, compareeffs, compareBattles, compareAvgLev, lang), "comparec1");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", (AllCaps / AllBattles).toFixed(2), EffTooltip("caps", AllCaps, effres, AllBattles, AllAvgLev, lang), "comparec2");
            var deltaCap = (compareCaps / compareBattles - AllCaps / AllBattles).toFixed(2);
            insertNewTr(Cmpretbodytrtd3tabletbody, "", (deltaCap > 0) ? "<font color='green'>+" + deltaCap + "</font>" : "<font color='red'>" + deltaCap + "</font>", "", "comparec3");

            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? "Очков защиты за бой" : "Defs per battle", (compareDefs / compareBattles).toFixed(2), EffTooltip("defs", compareDefs, compareeffs, compareBattles, compareAvgLev, lang), "comparede1");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", (AllDefs / AllBattles).toFixed(2), EffTooltip("defs", AllDefs, effres, AllBattles, AllAvgLev, lang), "comparede2");
            var deltaDef = (compareDefs / compareBattles - AllDefs / AllBattles).toFixed(2);
            insertNewTr(Cmpretbodytrtd3tabletbody, "", (deltaDef > 0) ? "<font color='green'>+" + deltaDef + "</font>" : "<font color='red'>" + deltaDef + "</font>", "", "comparede3");

            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? " Эффективность" : "Eff. rating", "<font color='" + CalcEffColor(Number(compareeffs[0]), "eff")[0] + "'>" + compareeffs[0] + "</font>", CalcEffColor(Number(compareeffs[0]), "eff")[1], "compareef1");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", "<font color='" + CalcEffColor(Number(effres[0]), "eff")[0] + "'>" + effres[0] + "</font>", CalcEffColor(Number(effres[0]), "eff")[1], "compareef2");
            var delta = compareeffs[0] - effres[0];
            insertNewTr(Cmpretbodytrtd3tabletbody, "", (delta > 0) ? "<font color='green'>+" + delta.toFixed(2) + "</font>" : "<font color='red'>" + delta.toFixed(2) + "</font>", "", "compareef3");

            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? " WN6 Рейтинг" : "WN6 Rating", "<font color='" + CalcEffColor(Number(compareeffs[2]), "wn6")[0] + "'>" + compareeffs[2] + "</font>", CalcEffColor(Number(compareeffs[2]), "wn6")[1], "comparewn1");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", "<font color='" + CalcEffColor(Number(effres[2]), "wn6")[0] + "'>" + effres[2] + "</font>", CalcEffColor(Number(effres[2]), "wn6")[1], "comparewn2");
            var delta = compareeffs[2] - effres[2];
            insertNewTr(Cmpretbodytrtd3tabletbody, "", (delta > 0) ? "<font color='green'>+" + delta.toFixed(2) + "</font>" : "<font color='red'>" + delta.toFixed(2) + "</font>", "", "comparewn3");

            insertNewTr(Cmpretbodytrtd1tabletbody, (lang === "ru") ? 'Эффективность БС' : 'Eff. rating of BS', compareeffs[3], "");
            insertNewTr(Cmpretbodytrtd2tabletbody, "", effres[3], "");
            var delta = compareeffs[3] - effres[3];
            insertNewTr(Cmpretbodytrtd3tabletbody, "", (delta > 0) ? "<font color='green'>+" + delta.toFixed(2) + "</font>" : "<font color='red'>" + delta.toFixed(2) + "</font>", "");

            var blBool = settings.plComp && (toFl(settings.plComp[1]) !== 0 || toFl(settings.plComp[0]) !== 0);

            CmpspSp1.className = "b-fake-link";
            CmpspSp1.innerHTML = blBool ? (lang === "ru" ? 'Развернуть блок "Сравнение игроков"' : 'Expand "Players compare"') : (lang === "ru" ? 'Свернуть блок "Сравнение игроков"' : 'Collapse "Players compare"');
            CmpspA1.appendChild(CmpspSp1);
            CmpspA1.className = "b-vertical-arrow sh-speedometr" + (blBool ? "" : " b-vertical-arrow__open");
            CmpspA1.setAttribute('curSt', blBool ? 1 : 0);
            CmpspA1.setAttribute('curStText', (lang === "ru" ? '"Сравнение игроков"' : '"Players compare"'));
            CmpspA1.href = "#";
            CmpspDiv1.setAttribute('style', 'text-align: right; margin-right: 15px;' + (blBool ? "padding-top: 10px; padding-bottom: 10px;" : ""));
            CmpspDiv1.appendChild(CmpspA1);
        }
    }

    //->Блок сравнение игроков



    //<-Блок рейтинга эффективности
    var tresulttable = document.getElementsByClassName("b-user-block")[0],
            mainDiv = document.createElement('div'),
            sDiv = document.createElement('div'),
            sDivH3 = document.createElement('h3'),
            thDiv = document.createElement('div'),
            lDiv = document.createElement('div'),
            lhr = document.createElement('hr'),
            rhr = document.createElement('hr'),
            companyTable = document.createElement('table'),
            companyH4 = document.createElement('h4'),
            clanTable = document.createElement('table'),
            clanH4 = document.createElement('h4'),
            clanTabletbody = document.createElement('tbody'),
            companyTabletbody = document.createElement('tbody'),
            rDiv = document.createElement('div'),
            NB7div = document.createElement('div'),
            NB7div2 = document.createElement('div'),
            NB7Tdiv = document.createElement('div'),
            NB7Tdiv2 = document.createElement('div'),
            retbodytrtd1table = document.createElement('table'),
            retbodytrtd2table = document.createElement('table'),
            retbodytrtd1tabletbody = document.createElement('tbody'),
            retbodytrtd2tabletbody = document.createElement('tbody'),
            spDiv = document.createElement('div'),
            spA = document.createElement('a'),
            spSp = document.createElement('span');

    if (NBmainDiv)
        tresulttable = document.getElementsByClassName("b-user-block")[1];

    document.getElementsByClassName("b-userblock-wrpr")[0].insertBefore(mainDiv, tresulttable);
    mainDiv.className = "b-user-block";
    sDiv.className = "b-head-block";
    sDivH3.innerHTML = lang === "ru" ? "Эффективность" : "Efficiency";
    companyH4.innerHTML = lang === "ru" ? "Ротные бои" : "Company battles";
    companyTabletbody.setAttribute('id', 'company-battles');
    companyTable.setAttribute('class', 't-table-dotted');
    clanTabletbody.setAttribute('id', 'clan-battles');
    clanTable.setAttribute('class', 't-table-dotted');
    clanH4.innerHTML = lang === "ru" ? "Глобальная карта" : "Clan battles";
    thDiv.setAttribute('class', "b-user-info clearfix");
    lDiv.className = "b-user-block_left-column";
    lDiv.setAttribute('style', 'margin-left:25px;');
    rDiv.className = "b-user-block_right-column";
    rDiv.setAttribute('style', 'margin-right:25px;');
    NB7div.setAttribute('style', 'padding-left: 27px; padding-top: 5px; padding-bottom: 5px;');
    NB7Tdiv.setAttribute('style', 'padding-left: 27px; padding-top: 5px; padding-bottom: 5px;');
    NB7div2.setAttribute('style', 'padding-left: 5px; padding-right: 5px; display: none; padding-bottom: 5px;');
    NB7Tdiv2.setAttribute('style', 'padding-left: 5px; padding-right: 5px; display: none; padding-bottom: 5px;');
    NB7div2.innerHTML =
            '<h3 style="text-align: center;">' + (lang === "ru" ? "Тип графика" : "Graph type") + '</h3>' +
            '<div style="text-align: center;"><label for="gall" style="padding-left: 50px;">' + (lang === "ru" ? 'Все' : 'All') + '</label><input type="radio" name="ggtype" id="gall" value="all" checked/>' +
            '<label for="gdate" style="padding-left: 50px;">' + (lang === "ru" ? 'Дата' : 'Date') + '</label><input type="radio" name="ggtype" id="gdate" value="date" />' +
            '<label for="gbat" style="padding-left: 50px;">' + (lang === "ru" ? 'Бои' : 'Battles') + '</label><input type="radio" name="ggtype" id="gbat" value="bat" /></div>' +
            '<hr><h4 style="text-align: center;">' + (lang === "ru" ? "% побед" : "Win %") + '</h4><div id="percStr" style="width:600px;height:100px;" gtype="date"></div><br><div id="percStrB" style="width:600px;height:100px;" gtype="bat"></div><br>' +
            '<h4 style="text-align: center;">' + (lang === "ru" ? "Опыт за бой" : "Exp per battle") + '</h4><div id="exp7" style="width:600px;height:100px;" gtype="date"></div><br><div id="xpStrB" style="width:600px;height:100px;" gtype="bat"></div><br>' +
            '<h4 style="text-align: center;">' + (lang === "ru" ? "Повреждений за бой" : "Damage per battle") + '</h4><div id="damagStr" style="width:600px;height:100px;" gtype="date"></div><br><div id="damagStrB" style="width:600px;height:100px;" gtype="bat"></div><br>' +
            '<h4 style="text-align: center;">' + (lang === "ru" ? "Фрагов за бой" : "Frags per battle") + '</h4><div id="FragsStr" style="width:600px;height:100px;" gtype="date"></div><br><div id="FragsStrB" style="width:600px;height:100px;" gtype="bat"></div><br>' +
            '<h4 style="text-align: center;">' + (lang === "ru" ? "Обнаружено за бой" : "Spotted per battle") + '</h4><div id="SpottedStr" style="width:600px;height:100px;" gtype="date"></div><br><div id="SpottedStrB" style="width:600px;height:100px;" gtype="bat"></div><br>' +
            '<h4 style="text-align: center;">' + (lang === "ru" ? "Очков захвата за бой" : "Caps per battle") + '</h4><div id="CapsStr" style="width:600px;height:100px;" gtype="date"></div><br><div id="CapsStrB" style="width:600px;height:100px;" gtype="bat"></div><br>' +
            '<h4 style="text-align: center;">' + (lang === "ru" ? "Очков защиты за бой" : "Defs per battle") + '</h4><div id="DefsStr" style="width:600px;height:100px;" gtype="date"></div><br><div id="DefsStrB" style="width:600px;height:100px;" gtype="bat"></div><br>' +
            '<h4 style="text-align: center;">' + (lang === "ru" ? "Эффективность" : "Eff. rating") + '</h4><div id="EffStr" style="width:600px;height:100px;" gtype="date"></div><br><div id="EffStrB" style="width:600px;height:100px;" gtype="bat"></div><br>' +
            '<h4 style="text-align: center;">' + (lang === "ru" ? "WN6 Рейтинг" : "WN6 Rating") + '</h4><div id="WN6Str" style="width:600px;height:100px;" gtype="date"></div><br><div id="WN6StrB" style="width:600px;height:100px;" gtype="bat"></div><br><hr>';
    NB7div.innerHTML = '<a class="b-vertical-arrow us-show-medals" href="#"><span class="b-fake-link">' + (lang === "ru" ? "Последние 7 сохранений (графики)" : "Last 7 savepoints (graphs)") + '</span></a>';
    NB7Tdiv.innerHTML = '<a class="b-vertical-arrow us-show-medals" href="#"><span class="b-fake-link">' + (lang === "ru" ? "Последние 7 сохранений танки (графики)" : "Last 7 savepoints tanks (graphs)") + '</span></a>';

    retbodytrtd1table.setAttribute('class', 't-table-dotted');
    retbodytrtd1table.appendChild(retbodytrtd1tabletbody);

    retbodytrtd2table.setAttribute('class', 't-table-dotted');
    retbodytrtd2table.appendChild(retbodytrtd2tabletbody);

    companyTable.appendChild(companyTabletbody);
    clanTable.appendChild(clanTabletbody);

    lDiv.appendChild(companyH4);
    lDiv.appendChild(companyTable);
    lDiv.appendChild(lhr);
    rDiv.appendChild(clanH4);
    rDiv.appendChild(clanTable);
    rDiv.appendChild(rhr);

    lDiv.appendChild(retbodytrtd1table);
    rDiv.appendChild(retbodytrtd2table);
    sDiv.appendChild(sDivH3);
    mainDiv.appendChild(sDiv);
    if (daystat && settings.gtype !== "no") {
        mainDiv.appendChild(NB7div);
        mainDiv.appendChild(NB7div2);
    }
    thDiv.appendChild(rDiv);
    thDiv.appendChild(lDiv);
    mainDiv.appendChild(thDiv);
    if (daystat && settings.gtype !== "no") {
        mainDiv.appendChild(NB7Tdiv);
        mainDiv.appendChild(NB7Tdiv2);
    }

    blBool = settings.efRat && (toFl(settings.efRat[1]) !== 0 || toFl(settings.efRat[0]) !== 0);

    spSp.className = "b-fake-link";
    spSp.innerHTML = blBool ? (lang === "ru" ? 'Развернуть блок "Рейтинги эффективности"' : 'Expand "Eff. ratings"') : (lang === "ru" ? 'Свернуть блок "Рейтинги эффективности"' : 'Collapse "Eff. ratings"');
    spA.appendChild(spSp);
    spA.className = "b-vertical-arrow sh-speedometr" + (blBool ? "" : " b-vertical-arrow__open");
    spA.setAttribute('curSt', blBool ? 1 : 0);
    spA.setAttribute('curStText', (lang === "ru" ? '"Рейтинги эффективности"' : '"Eff. ratings"'));
    spA.href = "#";
    spDiv.appendChild(spA);
    spDiv.setAttribute('style', 'text-align: right; margin-right: 15px;' + (blBool ? "padding-top: 10px; padding-bottom: 10px;" : ""));
    mainDiv.parentNode.insertBefore(spDiv, mainDiv);
    if (blBool)
        spDiv.nextElementSibling.setAttribute('style', 'display:none;');
    if (settings.efRat && toFl(settings.efRat[1]) === 1)
        spDiv.setAttribute('style', 'display:none;');

    if (CmpmainDiv && settings.compare && window.location.href.indexOf(settings.UserID) === -1) {
        blBool = settings.plComp && (toFl(settings.plComp[1]) !== 0 || toFl(settings.plComp[0]) !== 0);
        CmpmainDiv.parentNode.insertBefore(CmpspDiv1, CmpmainDiv);
        if (settings.plComp && toFl(settings.plComp[1]) === 1)
            CmpspDiv1.setAttribute('style', 'display:none;');
        if (blBool)
            CmpspDiv1.nextElementSibling.setAttribute('style', 'display:none;');
    }

    if (NBmainDiv) {
        blBool = settings.newBat && (toFl(settings.newBat[1]) !== 0 || toFl(settings.newBat[0]) !== 0);
        NBmainDiv.parentNode.insertBefore(spDiv1, NBmainDiv);
        if (settings.newBat && toFl(settings.newBat[1]) === 1)
            spDiv1.setAttribute('style', 'display:none;');
        if (blBool)
            spDiv1.nextElementSibling.setAttribute('style', 'display:none;');
    }

    if (effres[0] < 440)
        var xeff = 0;
    else
        xeff = Math.max(Math.min(effres[0] * (effres[0] * (effres[0] * (effres[0] * (effres[0] * (0.000000000000000045254 * effres[0] - 0.00000000000033131) + 0.00000000094164) - 0.0000013227) + 0.00095664) - 0.2598) + 13.23, 100), 0).toFixed(2);
    if (effres[2] > 2140)
        var xwn = 100;
    else
        xwn = Math.max(Math.min(effres[2] * (effres[2] * (effres[2] * (-0.00000000001268 * effres[2] + 0.00000005147) - 0.00006418) + 0.07576) - 7.25, 100), 0).toFixed(2);

    insertNewTr(retbodytrtd1tabletbody, (lang === "ru") ? " <a href='http://wot-news.com/index.php/stat/calc/ru/ru' target='_blank'>Эффективность</a>" : "<a href='http://wot-news.com/index.php' target='_blank'>Eff. rating</a>", "<font color='"
            + CalcEffColor(Number(effres[0]), "eff")[0] + "'>" + effres[0] + "</font>" + (NewBattles && (effres[0] - oeffs[0]).toFixed(2) * 1 !== 0 ? (effres[0] - oeffs[0] > 0 ? "<font color='green'> (+" + (effres[0] - oeffs[0]).toFixed(2) : "<font color='red'> (" + (effres[0] - oeffs[0]).toFixed(2)) + ")</font>" : ""), CalcEffColor(Number(effres[0]), "eff")[1], "eff-rating");
    hrIn = statTooltip.length === 0;
    if (NewBattles && (effres[0] - oeffs[0]).toFixed(2) * 1 !== 0) {
        if (!hrIn && statTooltip.length !== 0) {
            statTooltip += '<hr>';
            hrIn = true;
        }
        statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Эффективность: ' : 'Eff. rating: ') + "</div><div style='float:right'>" + (effres[0] - oeffs[0] > 0 ? "<font color='green'>+" + (effres[0] - oeffs[0]).toFixed(2) : "<font color='red'>" + (effres[0] - oeffs[0]).toFixed(2)) + "</font></div><br>";
    }

    insertNewTr(retbodytrtd1tabletbody, (lang === "ru") ? " <a href='http://wot-news.com/index.php/stat/calc/ru/ru' target='_blank'>WN6 Рейтинг</a>" : "<a href='http://wot-news.com/index.php' target='_blank'>WN6 Rating</a>", "<font color='"
            + CalcEffColor(Number(effres[2]), "wn6")[0] + "'>" + effres[2] + "</font>" + (NewBattles && (effres[2] - oeffs[2]).toFixed(2) * 1 !== 0 ? (effres[2] - oeffs[2] > 0 ? "<font color='green'> (+" + (effres[2] - oeffs[2]).toFixed(2) : "<font color='red'> (" + (effres[2] - oeffs[2]).toFixed(2)) + ")</font>" : ""), CalcEffColor(Number(effres[2]), "wn6")[1], "wn6-rating");

    if (NewBattles && (effres[2] - oeffs[2]).toFixed(2) * 1 !== 0) {
        if (!hrIn && statTooltip.length !== 0) {
            statTooltip += '<hr>';
            hrIn = true;
        }
        statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'WN6 Рейтинг: ' : 'WN6 Rating: ') + "</div><div style='float:right'>" + (effres[2] - oeffs[2] > 0 ? "<font color='green'>+" + (effres[2] - oeffs[2]).toFixed(2) : "<font color='red'>" + (effres[2] - oeffs[2]).toFixed(2)) + "</font></div><br>";
    }

    insertNewTr(retbodytrtd2tabletbody, (lang === "ru") ? "<a href='http://wot-news.com/index.php/stat/calc/ru/ru' target='_blank'>Эффективность xvm</a>" : "<a href='http://wot-news.com/index.php' target='_blank'>Eff. rating xwm</a>", "<font color='" + CalcEffColor(Number(xeff), "xvm")[0] + "'>" + xeff + "</font>" + (NewBattles && oxeff !== 0 && (xeff - oxeff).toFixed(2) * 1 !== 0 ? (xeff - oxeff > 0 ? "<font color='green'> (+" + (xeff - oxeff).toFixed(2) : "<font color='red'> (" + (xeff - oxeff).toFixed(2)) + ")</font>" : ""), CalcEffColor(Number(xeff), "xvm")[1], "xeff-rating");

    if (NewBattles && oxeff !== 0 && (xeff - oxeff).toFixed(2) * 1 !== 0) {
        if (!hrIn && statTooltip.length !== 0) {
            statTooltip += '<hr>';
            hrIn = true;
        }
        statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'Эффективность xvm: ' : 'Eff. rating xwm: ') + "</div><div style='float:right'>" + (xeff - oxeff > 0 ? "<font color='green'>+" + (xeff - oxeff).toFixed(2) : "<font color='red'>" + (xeff - oxeff).toFixed(2)) + "</font></div><br>";
    }

    insertNewTr(retbodytrtd2tabletbody, (lang === "ru") ? "<a href='http://wot-news.com/index.php/stat/calc/ru/ru' target='_blank'>WN6 Рейтинг xvm</a>" : "<a href='http://wot-news.com/index.php' target='_blank'>WN6 Rating xwm</a>", "<font color='" + CalcEffColor(Number(xwn), "xvm")[0] + "'>" + xwn + "</font>" + (NewBattles && oxwn !== 0 && (xwn - oxwn).toFixed(2) * 1 !== 0 ? (xwn - oxwn > 0 ? "<font color='green'> (+" + (xwn - oxwn).toFixed(2) : "<font color='red'> (" + (xwn - oxwn).toFixed(2)) + ")</font>" : ""), CalcEffColor(Number(xwn), "xvm")[1], "xwn-rating");

    if (NewBattles && oxwn !== 0 && (xwn - oxwn).toFixed(2) * 1 !== 0) {
        if (!hrIn && statTooltip.length !== 0) {
            statTooltip += '<hr>';
            hrIn = true;
        }
        statTooltip += "<div style='float:left'>" + (lang === "ru" ? 'WN6 Рейтинг xvm: ' : 'WN6 Rating xwm: ') + "</div><div style='float:right'>" + (xwn - oxwn > 0 ? "<font color='green'>+" + (xwn - oxwn).toFixed(2) : "<font color='red'>" + (xwn - oxwn).toFixed(2)) + "</font></div><br>";
    }

    var PR = (500 * (AllWins / AllBattles) / 0.4856) + (1000 * AllDamag / (tnaSum * 0.975));
    var clearedFromPenalties1 = 1500,
            expectedMinBattles1 = 500,
            expectedMinAvgTier1 = 6,
            clearedFromPenalties2 = 1900,
            expectedMinBattles2 = 2000,
            expectedMinAvgTier2 = 7;
    if (PR > clearedFromPenalties1)
        PR = PR - (PR - clearedFromPenalties1) * Math.pow(Math.max(0, 1 - (AllAvgLev / expectedMinAvgTier1), 1 - (AllBattles / expectedMinBattles1)), 0.5);
    if (PR > clearedFromPenalties2)
        PR = PR - (PR - clearedFromPenalties2) * Math.pow(Math.max(0, 1 - (AllAvgLev / expectedMinAvgTier2), 1 - (AllBattles / expectedMinBattles2)), 0.5);

    if (PR >= 2180) {
        var XPR = 100;
    } else {
        XPR = Math.max(PR * (PR * (PR * (-0.00000000008567 * PR + 0.0000004071) - 0.000689) + 0.5677) - 183, PR * (-0.0002002 * PR + 0.8732) - 852.30);
    }

    insertNewTr(retbodytrtd1tabletbody, "<a href='http://www.noobmeter.com/player/ru/" + playerNick + "/" + UserId + "/' target='_blank'>Рейтинг нагиба</a>",
            "<font color='" + CalcEffColor(PR, "pr")[0] + "'>" + PR.toFixed(2) + "</font>", CalcEffColor(PR, "pr")[1], "noobmeter-rating");
    insertNewTr(retbodytrtd2tabletbody, "<a href='http://www.noobmeter.com/player/ru/" + playerNick + "/" + UserId + "/' target='_blank'>Рейтинг нагиба xvm</a>",
            "<font color='" + CalcEffColor(PR, "pr")[0] + "'>" + XPR.toFixed(2) + "</font>", "", "noobmeter-rating-xvm");
    insertNewTr(retbodytrtd1tabletbody, (lang === "ru") ? "<a href='http://armor.kiev.ua/wot/gamerstat/" + playerNick + "' target='_blank'>Эффективность БС</a>" : "<a href='http://armor.kiev.ua/wot/' target='_blank'>Eff. rating of BS</a>", "x", "x", "bs-rating");

    insertNewTr(retbodytrtd2tabletbody, (lang === "ru") ? " <a href='http://wot-noobs.ru/nubomer/?nick=" + playerNick + "' target='_blank'>Нубо-Рейтинг</a>" : "<a href='http://wot-noobs.ru/nubomer/?nick=" + playerNick + "' target='_blank'>Wot-noobs rating</a>", "", "x", "us-NoobStat");

    insertNewTr(retbodytrtd2tabletbody, (lang === "ru") ? "Опыт за бой" : "Exp per battle", (AllXp / AllBattles).toFixed(2) + (NewBattles && ((AllXp / AllBattles).toFixed(2) - (OldXp / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0 ? (((AllXp / AllBattles).toFixed(2) - (OldXp / OldBattles).toFixed(2)).toFixed(2) > 0 ? "<font color='green'> (+" + ((AllXp / AllBattles).toFixed(2) - (OldXp / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'> (" + ((AllXp / AllBattles).toFixed(2) - (OldXp / OldBattles).toFixed(2)).toFixed(2)) + ")<font>" : ""), AllXp + " <font color='red'>/</font> <font color='green'>" + AllBattles + "</font>", "us-xp");
    insertNewTr(retbodytrtd2tabletbody, (lang === "ru") ? "Повреждений за бой" : "Damage per battle", (AllDamag / AllBattles).toFixed(2) + (NewBattles && ((AllDamag / AllBattles).toFixed(2) - (OldDamag / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0.0 ? (((AllDamag / AllBattles).toFixed(2) - (OldDamag / OldBattles).toFixed(2)).toFixed(2) > 0 ? "<font color='green'> (+" + ((AllDamag / AllBattles).toFixed(2) - (OldDamag / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'> (" + ((AllDamag / AllBattles).toFixed(2) - (OldDamag / OldBattles).toFixed(2)).toFixed(2)) + ")<font>" : ""), EffTooltip("damage", AllDamag, effres, AllBattles, AllAvgLev, lang), "us-damag");
    insertNewTr(retbodytrtd2tabletbody, (lang === "ru") ? "Фрагов за бой" : "Frags per battle", (AllFrags / AllBattles).toFixed(2) + (NewBattles && ((AllFrags / AllBattles).toFixed(2) - (OldFrags / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0.0 ? (((AllFrags / AllBattles).toFixed(2) - (OldFrags / OldBattles).toFixed(2)).toFixed(2) > 0 ? "<font color='green'> (+" + ((AllFrags / AllBattles).toFixed(2) - (OldFrags / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'> (" + ((AllFrags / AllBattles).toFixed(2) - (OldFrags / OldBattles).toFixed(2)).toFixed(2)) + ")<font>" : ""), EffTooltip("frags", AllFrags, effres, AllBattles, AllAvgLev, lang), "us-frags");
    insertNewTr(retbodytrtd2tabletbody, (lang === "ru") ? "Обнаружено за бой" : "Spotted per battle", (AllSpotted / AllBattles).toFixed(2) + (NewBattles && ((AllSpotted / AllBattles).toFixed(2) - (OldSpotted / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0.0 ? (((AllSpotted / AllBattles).toFixed(2) - (OldSpotted / OldBattles).toFixed(2)).toFixed(2) > 0 ? "<font color='green'> (+" + ((AllSpotted / AllBattles).toFixed(2) - (OldSpotted / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'> (" + ((AllSpotted / AllBattles).toFixed(2) - (OldSpotted / OldBattles).toFixed(2)).toFixed(2)) + ")<font>" : ""), EffTooltip("spotted", AllSpotted, effres, AllBattles, AllAvgLev, lang), "us-spotted");
    insertNewTr(retbodytrtd2tabletbody, (lang === "ru") ? "Очков захвата за бой" : "Caps per battle", (AllCaps / AllBattles).toFixed(2) + (NewBattles && ((AllCaps / AllBattles).toFixed(2) - (OldCaps / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0.0 ? (((AllCaps / AllBattles).toFixed(2) - (OldCaps / OldBattles).toFixed(2)).toFixed(2) > 0 ? "<font color='green'> (+" + ((AllCaps / AllBattles).toFixed(2) - (OldCaps / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'> (" + ((AllCaps / AllBattles).toFixed(2) - (OldCaps / OldBattles).toFixed(2)).toFixed(2)) + ")<font>" : ""), EffTooltip("caps", AllCaps, effres, AllBattles, AllAvgLev, lang), "us-caps");
    insertNewTr(retbodytrtd2tabletbody, (lang === "ru") ? "Очков защиты за бой" : "Defs per battle", (AllDefs / AllBattles).toFixed(2) + (NewBattles && ((AllDefs / AllBattles).toFixed(2) - (OldDefs / OldBattles).toFixed(2)).toFixed(2) * 1 !== 0.0 ? (((AllDefs / AllBattles).toFixed(2) - (OldDefs / OldBattles).toFixed(2)).toFixed(2) > 0 ? "<font color='green'> (+" + ((AllDefs / AllBattles).toFixed(2) - (OldDefs / OldBattles).toFixed(2)).toFixed(2) : "<font color='red'> (" + ((AllDefs / AllBattles).toFixed(2) - (OldDefs / OldBattles).toFixed(2)).toFixed(2)) + ")<font>" : ""), EffTooltip("defs", AllDefs, effres, AllBattles, AllAvgLev, lang), "us-defs");

    if (daypassed !== 0)
        insertNewTr(retbodytrtd1tabletbody, (lang === "ru") ? " Боев в день" : "Battles per day", (AllBattles / daypassed).toFixed(2) + (NewBattles && ((AllBattles / daypassed).toFixed(2) - (OldBattles / olddaypassed).toFixed(2)).toFixed(2) * 1 !== 0.0 ? (((AllBattles / daypassed).toFixed(2) - (OldBattles / olddaypassed).toFixed(2)).toFixed(2) > 0 ? "<font color='green'> (+" + ((AllBattles / daypassed).toFixed(2) - (OldBattles / olddaypassed).toFixed(2)).toFixed(2) : "<font color='red'> (" + ((AllBattles / daypassed).toFixed(2) - (OldBattles / olddaypassed).toFixed(2)).toFixed(2)) + ")</font>" : ""), ((lang === "ru") ? "дней" : "days") + ": " + daypassed.toFixed(), "us-daypassed");
    insertNewTr(retbodytrtd1tabletbody, (lang === "ru") ? "Средний уровень танков" : "Average level of tanks", AllAvgLev.toFixed(2) + (NewBattles && (AllAvgLev.toFixed(2) - OldAvgLev.toFixed(2)).toFixed(2) * 1 !== 0.0 ? ((AllAvgLev.toFixed(2) - OldAvgLev.toFixed(2)).toFixed(2) > 0 ? "<font color='green'> (+" + (AllAvgLev.toFixed(2) - OldAvgLev.toFixed(2)).toFixed(2) : "<font color='red'> (" + (AllAvgLev.toFixed(2) - OldAvgLev.toFixed(2)).toFixed(2)) + ")<font>" : ""), "", "");
    insertNewTr(retbodytrtd1tabletbody, (lang === "ru") ? "% побед" : "Win %", col(AllWins / AllBattles * 100, 2) + (NewBattles && ((AllWins / AllBattles * 100).toFixed(2) - (OldWins / OldBattles * 100).toFixed(2)).toFixed(2) * 1 !== 0.0 ? (((AllWins / AllBattles * 100).toFixed(2) - (OldWins / OldBattles * 100).toFixed(2)).toFixed(2) > 0 ? "<font color='green'> (+" + ((AllWins / AllBattles * 100).toFixed(2) - (OldWins / OldBattles * 100).toFixed(2)).toFixed(2) : "<font color='red'> (" + ((AllWins / AllBattles * 100).toFixed(2) - (OldWins / OldBattles * 100).toFixed(2)).toFixed(2)) + ")</font>" : ""), FoundProc(AllWins, AllBattles), "us-winperc");
    var AllDefeat = toFl(document.getElementsByClassName("b-result")[0].getElementsByClassName("t-table-dotted")[0].rows[2].cells[1].innerHTML.split("(")[0]);
    insertNewTr(retbodytrtd1tabletbody, (lang === "ru") ? "% поражений" : "Defeat %", col(AllDefeat / AllBattles * 100, 2, true), FoundProc(AllDefeat, AllBattles), "us-defeat");
    var AllSurvived = toFl(document.getElementsByClassName("b-result")[0].getElementsByClassName("t-table-dotted")[0].rows[3].cells[1].innerHTML.split("(")[0]);
    insertNewTr(retbodytrtd1tabletbody, (lang === "ru") ? "% выживания" : "Survived %", (AllSurvived / AllBattles * 100).toFixed(2) + "%", FoundProc(AllSurvived, AllBattles), "us-surv");
    var AllHR = toFl(document.getElementsByClassName("b-result")[1].getElementsByClassName("t-table-dotted")[0].rows[2].cells[1].innerHTML);
    insertNewTr(retbodytrtd1tabletbody, (lang === "ru") ? "% попадания" : "Hit Ratio", col(AllHR), "x", "hit-ratio");

    if (daystat && settings.gtype !== "no") {
        var plotScript = document.createElement("script"),
                xpStr = '[{ color: 0, data: [',
                xpStrB = '[{ color: 0, data: [',
                percStrB = '[{ color: 1, data: [',
                percStr = '[{ color: 1, data: [',
                damagStr = '[{ color: 2, data: [',
                FragsStr = '[{ color: 3, data: [',
                SpottedStr = '[{ color: 4, data: [',
                CapsStr = '[{ color: 5, data: [',
                DefsStr = '[{ color: 6, data: [',
                EffStr = '[{ color: 7, data: [',
                WN6Str = '[{ color: 8, data: [',
                damagStrB = '[{ color: 2, data: [',
                FragsStrB = '[{ color: 3, data: [',
                SpottedStrB = '[{ color: 4, data: [',
                CapsStrB = '[{ color: 5, data: [',
                DefsStrB = '[{ color: 6, data: [',
                EffStrB = '[{ color: 7, data: [',
                WN6StrB = '[{ color: 8, data: [',
                firstSt = true;
        plotScript.type = "text/javascript";

        var grTanks = [], grtindex = [];

        for (var k = 0; k < 7; k++) {
            var statData = GetLSData("daystat_" + UserId + "_" + k);
            if (statData) {
                var dsArr = statData.split("|"),
                        strArray = dsArr[0].split("/"),
                        str = strArray[0].split(";"),
                        timeStat = (new Date(str[0])).getTime(),
                        gOldBattles = toFl(str[12]),
                        gOldWins = toFl(str[10]),
                        gOldXp = toFl(str[24]),
                        gOldDamag = toFl(str[16]),
                        gOldFrags = toFl(str[20]),
                        gOldSpotted = toFl(str[22]),
                        gOldCaps = toFl(str[14]),
                        gOldDefs = toFl(str[18]);
                if (firstSt) {
                    firstSt = false;
                } else if (timeStat) {
                    xpStr += ', ';
                    xpStrB += ', ';
                    percStr += ', ';
                    percStrB += ', ';
                    damagStr += ', ';
                    FragsStr += ', ';
                    SpottedStr += ', ';
                    CapsStr += ', ';
                    DefsStr += ', ';
                    EffStr += ', ';
                    WN6Str += ', ';
                    damagStrB += ', ';
                    FragsStrB += ', ';
                    SpottedStrB += ', ';
                    CapsStrB += ', ';
                    DefsStrB += ', ';
                    EffStrB += ', ';
                    WN6StrB += ', ';
                }
                if (timeStat) {
                    xpStr += '[' + timeStat + ', ' + (gOldXp / gOldBattles).toFixed(2) + ']';
                    xpStrB += '[' + gOldBattles + ', ' + (gOldXp / gOldBattles).toFixed(2) + ']';
                    percStr += '[' + timeStat + ', ' + (gOldWins / gOldBattles * 100).toFixed(2) + ']';
                    percStrB += '[' + gOldBattles + ', ' + (gOldWins / gOldBattles * 100).toFixed(2) + ']';
                    damagStr += '[' + timeStat + ', ' + (gOldDamag / gOldBattles).toFixed(2) + ']';
                    FragsStr += '[' + timeStat + ', ' + (gOldFrags / gOldBattles).toFixed(2) + ']';
                    SpottedStr += '[' + timeStat + ', ' + (gOldSpotted / gOldBattles).toFixed(2) + ']';
                    CapsStr += '[' + timeStat + ', ' + (gOldCaps / gOldBattles).toFixed(2) + ']';
                    DefsStr += '[' + timeStat + ', ' + (gOldDefs / gOldBattles).toFixed(2) + ']';
                    damagStrB += '[' + gOldBattles + ', ' + (gOldDamag / gOldBattles).toFixed(2) + ']';
                    FragsStrB += '[' + gOldBattles + ', ' + (gOldFrags / gOldBattles).toFixed(2) + ']';
                    SpottedStrB += '[' + gOldBattles + ', ' + (gOldSpotted / gOldBattles).toFixed(2) + ']';
                    CapsStrB += '[' + gOldBattles + ', ' + (gOldCaps / gOldBattles).toFixed(2) + ']';
                    DefsStrB += '[' + gOldBattles + ', ' + (gOldDefs / gOldBattles).toFixed(2) + ']';
                    var odayArray = [];

                    for (var p = 1; p < strArray.length; p++) {
                        str = strArray[p].split(";");
                        var tName = str[0].toLowerCase();
                        odayArray[tName] = new Object();
                        odayArray[tName].b = toFl(str[1]);
                        odayArray[tName].w = str.length > 3 ? toFl(str[3]) : -1;
                        if (tanksarr[tName] && tanksarr[tName].bcount !== odayArray[tName].b) {
                            if (!grTanks[tName]) {
                                grTanks[tName] = [];
                                grtindex[tName] = [];
                            }
                            if (grtindex[tName].indexOf(odayArray[tName].b) === -1) {
                                grTanks[tName].push({'bcount': odayArray[tName].b, 'wcount': odayArray[tName].w});
                                grtindex[tName].push(odayArray[tName].b);
                            }
                        }
                    }
                    var cav = CalcgOldAvgLev(odayArray),
                            gAvgLev = cav[0],
                            ogeff = CalcEff(0, gAvgLev, gOldBattles, gOldWins, gOldDamag, gOldFrags, gOldSpotted, gOldCaps, gOldDefs, gOldXp);
                    EffStr += '[' + timeStat + ', ' + ogeff[0] + ']';
                    WN6Str += '[' + timeStat + ', ' + ogeff[2] + ']';
                    EffStrB += '[' + gOldBattles + ', ' + ogeff[0] + ']';
                    WN6StrB += '[' + gOldBattles + ', ' + ogeff[2] + ']';
                }
            }
            ;
        }
        plotScript.textContent = ' var plot_conf = { series: {lines: {show: true, lineWidth: 2 }}, xaxis: { mode: "time", timeformat: "%d.%m.%y",}}; '
                + ' var plot_confB = { series: {lines: {show: true, lineWidth: 2 }}}; ';

        for (var gtank in grTanks) {
            if (grTanks[gtank].length > 1) {
                NB7Tdiv2.innerHTML += '<div style="margin-top: 15px;' + (tanksarr[gtank]['prem'] ? ' color: #ffc363 !important;"' : '"') + '><img src="' + tanksarr[gtank]['img'] + '"> ' + tanksarr[gtank]['name'] + '  <strong>' + tanksarr[gtank]['ttype'] + tanksarr[gtank]['tlev'] + '</strong></div><br><div style="width:600px;height:100px;" id="tgr' + gtank + '">';
                plotScript.textContent += 'var tgrdata' + gtank.replace('-', '_') + ' = [{ color: 0, data: [';
                var fst = true;
                for (var grc in grTanks[gtank]) {
                    if (fst) {
                        fst = false;
                    } else {
                        plotScript.textContent += ', ';
                    }
                    plotScript.textContent += '[' + grTanks[gtank][grc]['bcount'] + ', ' + (grTanks[gtank][grc]['wcount'] / grTanks[gtank][grc]['bcount'] * 100).toFixed(2) + ']';
                }
                plotScript.textContent += ']}]; ' + ' $.plot($("#tgr' + gtank + '"), tgrdata' + gtank.replace('-', '_') + ', plot_confB); ';
            }
        }
        xpStr += ']}]';
        xpStrB += ']}]';
        percStr += ']}]';
        percStrB += ']}]';
        damagStr += ']}]';
        FragsStr += ']}]';
        SpottedStr += ']}]';
        CapsStr += ']}]';
        DefsStr += ']}]';
        EffStr += ']}]';
        WN6Str += ']}]';
        damagStrB += ']}]';
        FragsStrB += ']}]';
        SpottedStrB += ']}]';
        CapsStrB += ']}]';
        DefsStrB += ']}]';
        EffStrB += ']}]';
        WN6StrB += ']}]';
        plotScript.textContent +=
                " var xp_data = " + xpStr + ","
                + " xpStrB_data = " + xpStrB + ","
                + " damagStr_data = " + damagStr + ","
                + " FragsStr_data = " + FragsStr + ","
                + " SpottedStr_data = " + SpottedStr + ","
                + " CapsStr_data = " + CapsStr + ","
                + " DefsStr_data = " + DefsStr + ","
                + " EffStr_data = " + EffStr + ","
                + " WN6Str_data = " + WN6Str + ","
                + " damagStrB_data = " + damagStrB + ","
                + " FragsStrB_data = " + FragsStrB + ","
                + " SpottedStrB_data = " + SpottedStrB + ","
                + " CapsStrB_data = " + CapsStrB + ","
                + " DefsStrB_data = " + DefsStrB + ","
                + " EffStrB_data = " + EffStrB + ","
                + " WN6StrB_data = " + WN6StrB + ","
                + " percStr_data = " + percStr + ";"
                + " percStrB_data = " + percStrB + ";"
                + ' $.plot($("#percStr"), percStr_data, plot_conf);'
                + ' $.plot($("#percStrB"), percStrB_data, plot_confB);'
                + ' $.plot($("#exp7"), xp_data, plot_conf);'
                + ' $.plot($("#xpStrB"), xpStrB_data, plot_confB);'
                + ' $.plot($("#damagStr"), damagStr_data, plot_conf);'
                + ' $.plot($("#damagStrB"), damagStrB_data, plot_confB);'
                + ' $.plot($("#FragsStr"), FragsStr_data, plot_conf);'
                + ' $.plot($("#FragsStrB"), FragsStrB_data, plot_confB);'
                + ' $.plot($("#SpottedStr"), SpottedStr_data, plot_conf);'
                + ' $.plot($("#SpottedStrB"), SpottedStrB_data, plot_confB);'
                + ' $.plot($("#CapsStr"), CapsStr_data, plot_conf);'
                + ' $.plot($("#CapsStrB"), CapsStrB_data, plot_confB);'
                + ' $.plot($("#DefsStr"), DefsStr_data, plot_conf);'
                + ' $.plot($("#DefsStrB"), DefsStrB_data, plot_confB);'
                + ' $.plot($("#EffStr"), EffStr_data, plot_conf);'
                + ' $.plot($("#EffStrB"), EffStrB_data, plot_confB);'
                + ' $.plot($("#WN6Str"), WN6Str_data, plot_conf);'
                + ' $.plot($("#WN6StrB"), WN6StrB_data, plot_confB);';
        document.body.appendChild(plotScript);
    }
    //->Блок рейтинга эффективности

    var mtext = "<li><a id='WriteStat' style='cursor: pointer;'>" + ((lang === "ru") ? "Сохранить статистику" : "Save statistic") + "</a></li>";
    if (uskeys.length > 0) {
        mtext += "<br>";
        for (var i = 0; i < uskeys.length; i++)
            if (settings.UserID !== uskeys[i])
                mtext += '<li><a href="http://worldoftanks.ru/community/accounts/' + uskeys[i] + '">' + (settings[uskeys[i]] ? (uskeys[i] === UserId ? "<span style='color:green;'>" + settings[uskeys[i]] + "</span>" : settings[uskeys[i]]) : 'Игрок ' + uskeys[i]) + '</a></li>';
    }
    if (UserId !== settings.UserID) {
        mtext += "<br>";
        if (uskeys.indexOf(UserId) !== -1)
            mtext += '<li><a class="us-remove-stat" href="#" uid="' + UserId + '">Удалить статистику</a></li>';
    }
    var fake_div = document.createElement("div");
    fake_div.innerHTML = mtext;
    document.getElementsByClassName("b-context-menu-list__bottomindent")[0].appendChild(fake_div);
    create_expanders(blockArray, lang, settings);
    var statDiv = document.createElement("div"),
            statDiv2 = document.createElement('div'),
            statDiv3 = document.createElement('div');
    statDiv2.innerHTML = statText;
    statDiv2.setAttribute('style', 'text-align: center;');
    statDiv.appendChild(statDiv2);
    if (statTooltip.length > 0)
        statDiv.setAttribute("id", "js-stat-div");
    statDiv.className = (statTooltip.length > 0 ? "js-tooltip " : "") + "spoiler";
    statDiv3.innerHTML = statTooltip;
    statDiv3.setAttribute("id", "js-stat-div_tooltip");
    statDiv3.className = "b-tooltip-main";
    statDiv.setAttribute("style", "position: fixed; bottom: 1%; right: 1%; background-color: black; z-index: 1000;");
    statDiv.style.border = "#f25322 dashed 1px";
    if (statTooltip.length > 0)
        statDiv.appendChild(statDiv3);

    if (daystat)
        document.body.appendChild(statDiv);

    xdr.xget("http://wot-noobs.ru/nubomer/?nick=" + playerNick, outWotNoobStat);
    document.getElementsByClassName("t-profile__vehicle")[0].style.width = '140%';

    function EffTooltip(ttype, tval, effsArr, allB, tAvgL, lang) {
        var retStr = tval + " <font color='red'>/</font> <font color='green'>" + allB + "</font><br>",
                tPval;
        if (ttype === "damage") {
            tPval = tval / allB * (10 / (tAvgL + 2)) * (0.23 + 2 * tAvgL / 100);
            retStr += "<font color='" + CalcEffColor(effsArr[0], 'eff')[0] + "'>" + (tPval / effsArr[0] * 100).toFixed(2) + "%" + (lang === "ru" ? " от эффективности" : " of eff. rating") + " (" + tPval.toFixed(2) + ")</font><br>";
            tPval = tval / allB * 530 / (184 * Math.pow(Math.E, 0.24 * tAvgL) + 130) + (6 - Math.min(tAvgL, 6)) * -60;
            retStr += "<font color='" + CalcEffColor(effsArr[2], 'wn6')[0] + "'>" + (tPval / effsArr[2] * 100).toFixed(2) + "%" + (lang === "ru" ? " от рейтинга WN6" : " of WN6 rating") + " (" + tPval.toFixed(2) + ")</font>";
        } else if (ttype === "frags") {
            tPval = tval / allB * 250;
            retStr += "<font color='" + CalcEffColor(effsArr[0], 'eff')[0] + "'>" + (tPval / effsArr[0] * 100).toFixed(2) + "%" + (lang === "ru" ? " от эффективности" : " of eff. rating") + " (" + tPval.toFixed(2) + ")</font><br>";
            tPval = (1240 - 1040 / Math.pow(Math.min(tAvgL, 6), 0.164)) * tval / allB + (6 - Math.min(tAvgL, 6)) * -60;
            retStr += "<font color='" + CalcEffColor(effsArr[2], 'wn6')[0] + "'>" + (tPval / effsArr[2] * 100).toFixed(2) + "%" + (lang === "ru" ? " от рейтинга WN6" : " of WN6 rating") + " (" + tPval.toFixed(2) + ")</font>";
        } else if (ttype === "spotted") {
            tPval = tval / allB * 150;
            retStr += "<font color='" + CalcEffColor(effsArr[0], 'eff')[0] + "'>" + (tPval / effsArr[0] * 100).toFixed(2) + "%" + (lang === "ru" ? " от эффективности" : " of eff. rating") + " (" + tPval.toFixed(2) + ")</font><br>";
            tPval = tval / allB * 125 + (6 - Math.min(tAvgL, 6)) * -60;
            retStr += "<font color='" + CalcEffColor(effsArr[2], 'wn6')[0] + "'>" + (tPval / effsArr[2] * 100).toFixed(2) + "%" + (lang === "ru" ? " от рейтинга WN6" : " of WN6 rating") + " (" + tPval.toFixed(2) + ")</font>";
        } else if (ttype === "caps") {
            tPval = Math.log((tval / allB) + 1) / Math.log(1.732) * 150;
            retStr += "<font color='" + CalcEffColor(effsArr[0], 'eff')[0] + "'>" + (tPval / effsArr[0] * 100).toFixed(2) + "%" + (lang === "ru" ? " от эффективности" : " of eff. rating") + " (" + tPval.toFixed(2) + ")</font><br>";
            tPval = 0;
            retStr += "<font color='" + CalcEffColor(effsArr[2], 'wn6')[0] + "'>" + (tPval / effsArr[2] * 100).toFixed(2) + "%" + (lang === "ru" ? " от рейтинга WN6" : " of WN6 rating") + " (" + tPval.toFixed(2) + ")</font>";
        } else if (ttype === "defs") {
            tPval = tval / allB * 150;
            retStr += "<font color='" + CalcEffColor(effsArr[0], 'eff')[0] + "'>" + (tPval / effsArr[0] * 100).toFixed(2) + "%" + (lang === "ru" ? " от эффективности" : " of eff. rating") + " (" + tPval.toFixed(2) + ")</font><br>";
            tPval = Math.min(tval / allB, 2.2) * 100 + (6 - Math.min(tAvgL, 6)) * -60;
            retStr += "<font color='" + CalcEffColor(effsArr[2], 'wn6')[0] + "'>" + (tPval / effsArr[2] * 100).toFixed(2) + "%" + (lang === "ru" ? " от рейтинга WN6" : " of WN6 rating") + " (" + tPval.toFixed(2) + ")</font>";
        }
        return retStr;
    }

    function getNewScriptVersion(response) {
        var regexp = /<b>Version:<\/b>[^0-9\.]+([0-9\.]+)[^0-9\.]+<\/p>/gi,
                res = regexp.exec(response);
        if (res.length > 0) {
            if (res[1] !== scriptVersion)
                alert(lang === "ru" ? "Вышла новая версия скрипта " + res[1] + ".\nПожалуйста, обновите скрипт." : "New script version " + res[1] + " enable.\nPlease upgrade script.");
            var now = new Date();
            var time = now.getTime();
            time += 3600 * 6 * 1000;
            now.setTime(time);
            document.cookie = 'usScriptVer=0' + '; expires=' + now.toGMTString() + '; domain=.' + window.location.host.toString() + '; path=/community/;';
        }
    }

    function create_expanders(bA, lang, settings) {
        var spMet = document.getElementsByClassName("b-speedometer-wrpr")[0],
                spDiv = document.createElement('div'),
                spA = document.createElement('a'),
                spSp = document.createElement('span');
        var blBool = settings.speed && (toFl(settings.speed[1]) !== 0 || toFl(settings.speed[0]) !== 0);
        spSp.className = "b-fake-link";
        spSp.innerHTML = blBool ? (lang === "ru" ? 'Развернуть блок спидометров' : 'Expand speedometers') : (lang === "ru" ? 'Свернуть блок спидометров' : 'Collapse speedometers');
        spA.appendChild(spSp);
        spA.className = "b-vertical-arrow sh-speedometr" + (blBool ? "" : " b-vertical-arrow__open");
        spA.setAttribute('curSt', blBool ? 1 : 0);
        spA.setAttribute('curStText', (lang === "ru" ? 'спидометров' : 'speedometers'));
        spA.href = "#";
        spDiv.appendChild(spA);
        spDiv.setAttribute('style', 'text-align: right; margin-right: 15px;' + (blBool ? "padding-top: 10px; padding-bottom: 10px;" : ""));
        spMet.parentNode.insertBefore(spDiv, spMet);
        if (settings.speed && toFl(settings.speed[1]) !== 0)
            spDiv.setAttribute('style', 'display:none;');
        if (blBool)
            spDiv.nextElementSibling.setAttribute('style', 'display:none;');

        var pLink = document.getElementsByClassName("b-personal-link")[0];

        if (pLink) {
            var plDiv = pLink.parentNode.parentNode,
                    spDiv1 = document.createElement('div'),
                    spA1 = document.createElement('a'),
                    spSp1 = document.createElement('span');
            blBool = settings.pers && (toFl(settings.pers[1]) !== 0 || toFl(settings.pers[0]) !== 0);
            spSp1.className = "b-fake-link";
            spSp1.innerHTML = blBool ? (lang === "ru" ? 'Развернуть блок "Личные данные"' : 'Expand "Personal"') : (lang === "ru" ? 'Свернуть блок "Личные данные"' : 'Collapse "Personal"');
            spA1.appendChild(spSp1);
            spA1.className = "b-vertical-arrow sh-speedometr" + (blBool ? "" : " b-vertical-arrow__open");
            spA1.setAttribute('curSt', blBool ? 1 : 0);
            spA1.setAttribute('curStText', (lang === "ru" ? '"Личные данные"' : '"Personal"'));
            spA1.href = "#";
            spDiv1.appendChild(spA1);
            spDiv1.setAttribute('style', 'text-align: right; margin-right: 15px;' + (blBool ? "padding-top: 10px; padding-bottom: 10px;" : ""));
            plDiv.parentNode.insertBefore(spDiv1, plDiv);
            if (settings.pers && toFl(settings.pers[1]) !== 0)
                spDiv1.setAttribute('style', 'display:none;');
            if (blBool)
                spDiv1.nextElementSibling.setAttribute('style', 'display:none;');
        }

        var spMet2 = document.getElementsByClassName("b-diagrams-sector")[0],
                spDiv2 = document.createElement('div'),
                spA2 = document.createElement('a'),
                spSp2 = document.createElement('span');
        blBool = settings.diagr && (toFl(settings.diagr[1]) !== 0 || toFl(settings.diagr[0]) !== 0);
        spSp2.className = "b-fake-link";
        spSp2.innerHTML = blBool ? (lang === "ru" ? 'Развернуть блок диаграм' : 'Expand diargams') : (lang === "ru" ? 'Свернуть блок диаграм' : 'Collapse diargams');
        spA2.appendChild(spSp2);
        spA2.className = "b-vertical-arrow sh-speedometr" + (blBool ? "" : " b-vertical-arrow__open");
        spA2.setAttribute('curSt', blBool ? 1 : 0);
        spA2.setAttribute('curStText', (lang === "ru" ? 'диаграм' : 'diargams'));
        spA2.href = "#";
        spDiv2.appendChild(spA2);
        spDiv2.setAttribute('style', 'text-align: right; margin-right: 15px;' + (blBool ? "padding-top: 10px; padding-bottom: 10px;" : ""));
        spMet2.parentNode.insertBefore(spDiv2, spMet2);
        if (settings.diagr && toFl(settings.diagr[1]) !== 0)
            spDiv2.setAttribute('style', 'display:none;');
        if (blBool) {
            spDiv2.nextElementSibling.setAttribute('style', 'display:none;');
            spDiv2.previousElementSibling.setAttribute('style', 'display:none;');
        }

        var spMet3 = document.getElementsByClassName("b-result-classes")[0].parentNode,
                spDiv3 = document.createElement('div'),
                spA3 = document.createElement('a'),
                spSp3 = document.createElement('span');
        blBool = settings.common && (toFl(settings.common[1]) !== 0 || toFl(settings.common[0]) !== 0);
        spSp3.className = "b-fake-link";
        spSp3.innerHTML = blBool ? (lang === "ru" ? 'Развернуть блок "Общее"' : 'Expand "Common"') : (lang === "ru" ? 'Свернуть блок "Общее"' : 'Collapse "Common"');
        spA3.appendChild(spSp3);
        spA3.className = "b-vertical-arrow sh-speedometr" + (blBool ? "" : " b-vertical-arrow__open");
        spA3.setAttribute('curSt', blBool ? 1 : 0);
        spA3.setAttribute('curStText', (lang === "ru" ? '"Общее"' : '"Common"'));
        spA3.href = "#";
        spDiv3.appendChild(spA3);
        spDiv3.setAttribute('style', 'text-align: right; margin-right: 15px;' + (blBool ? "padding-top: 10px; padding-bottom: 10px;" : ""));
        spMet3.parentNode.insertBefore(spDiv3, spMet3);
        if (settings.common && toFl(settings.common[1]) !== 0)
            spDiv3.setAttribute('style', 'display:none;');
        if (blBool) {
            spDiv3.nextElementSibling.setAttribute('style', 'display:none;');
            spDiv3.previousElementSibling.setAttribute('style', 'display:none;');
        }
        var spMet5 = document.getElementsByClassName("t-profile")[0],
                spDiv5 = document.createElement('div'),
                spA5 = document.createElement('a'),
                spSp5 = document.createElement('span');
        blBool = settings.veh && (toFl(settings.veh[1]) !== 0 || toFl(settings.veh[0]) !== 0);
        spSp5.className = "b-fake-link";
        spSp5.innerHTML = blBool ? (lang === "ru" ? 'Развернуть блок "Техника"' : 'Expand "Vehicles"') : (lang === "ru" ? 'Свернуть блок "Техника"' : 'Collapse "Vehicles"');
        spA5.appendChild(spSp5);
        spA5.className = "b-vertical-arrow sh-speedometr" + (blBool ? "" : " b-vertical-arrow__open");
        spA5.setAttribute('curSt', blBool ? 1 : 0);
        spA5.setAttribute('curStText', (lang === "ru" ? '"Техника"' : '"Vehicles"'));
        spA5.href = "#";
        spDiv5.appendChild(spA5);
        spDiv5.setAttribute('style', 'text-align: right; margin-right: 15px;' + (blBool ? "padding-top: 10px; padding-bottom: 10px;" : ""));
        spMet5.parentNode.insertBefore(spDiv5, spMet5);
        if (settings.veh && toFl(settings.veh[1]) !== 0)
            spDiv5.setAttribute('style', 'display:none;');
        var onb = document.createElement('div');
        onb.innerHTML = "<input type='checkbox' name='new' id='js-nb-ch'> " + ((lang === "ru") ? "только новые бои" : "only new battles");
        var sttab = document.getElementsByClassName("t-profile__vehicle")[0];
        sttab.parentNode.insertBefore(onb, sttab);
        var onbst = "padding-bottom: 10px; padding-left: 10px;";
        if (blBool) {
            onbst += "display:none;";
            spDiv5.nextElementSibling.setAttribute('style', 'display:none;');
            spDiv5.previousElementSibling.setAttribute('style', 'display:none;');
            spDiv5.previousElementSibling.previousElementSibling.setAttribute('style', 'display:none;');
            document.getElementsByClassName('t-profile__vehicle')[0].setAttribute('style', 'display:none;');
        }
        onb.setAttribute('style', onbst);

        var spMet6 = document.getElementsByClassName("js-short-achievements")[0],
                spDiv6 = document.createElement('div'),
                spA6 = document.createElement('a'),
                spSp6 = document.createElement('span');
        blBool = settings.achiev && (toFl(settings.achiev[1]) !== 0 || toFl(settings.achiev[0]) !== 0);
        spSp6.className = "b-fake-link";
        spSp6.innerHTML = blBool ? (lang === "ru" ? 'Развернуть блок "Достижения"' : 'Expand "Achievements"') : (lang === "ru" ? 'Свернуть блок "Достижения"' : 'Collapse "Achievements"');
        spA6.appendChild(spSp6);
        spA6.className = "b-vertical-arrow sh-speedometr" + (blBool ? "" : " b-vertical-arrow__open");
        spA6.setAttribute('curSt', blBool ? 1 : 0);
        spA6.setAttribute('curStText', (lang === "ru" ? '"Достижения"' : '"Achievements"'));
        spA6.href = "#";
        spDiv6.appendChild(spA6);
        spDiv6.setAttribute('style', 'text-align: right; margin-right: 15px;' + (blBool ? "padding-top: 10px; padding-bottom: 10px;" : ""));
        spMet6.parentNode.insertBefore(spDiv6, spMet6);
        if (settings.achiev && toFl(settings.achiev[1]) !== 0)
            spDiv6.setAttribute('style', 'display:none;');
        if (blBool) {
            spDiv6.nextElementSibling.setAttribute('style', 'display:none;');
            spDiv6.previousElementSibling.setAttribute('style', 'display:none;');
            document.getElementsByClassName("js-achivements-showhide")[0].setAttribute('style', 'display:none;');
        }

        if (settings.compare && window.location.href.indexOf(settings.UserID) === -1) {
            var fake_div = document.createElement("div");
            fake_div.innerHTML = "<li><a onclick='WriteCompareStat();' style='cursor: pointer;'>" + ((lang === "ru") ? 'Обновить "мои" данные' : 'Refresh "my" stat.') + "</a></li>";
            document.getElementsByClassName("b-context-menu-list__bottomindent")[0].appendChild(fake_div);
        }

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.textContent =
                "jQuery(document).ready(function() {"
                + "	$('.sh-speedometr').click(function(event) {event.preventDefault();"
                + " if ($(this).attr('curStText') === '\"Достижения\"' || $(this).attr('curStText') === '\"Achievements\"') {"
                + " if ($('.js-achivements-showhide').hasClass('b-vertical-arrow__open')) {var achDiv = $('.js-full-achievements')} else {achDiv = $('.js-short-achievements');}"
                + " if (parseInt($(this).attr('curSt')) === 0) {achDiv.slideUp('slow'); $(this).attr('curSt', 1); $(this).removeClass('b-vertical-arrow__open'); $(this).children()[0].innerHTML =(document.title.indexOf('Профиль игрока')>-1 ? 'Развернуть блок ' : 'Expand ') + $(this).attr('curStText'); $('.js-achivements-showhide').hide(); $(this).parent().css('padding-top', '10px'); $(this).parent().css('padding-bottom', '10px'); $(this).parent().prev().hide();"
                + " } else { achDiv.slideDown('slow'); $(this).attr('curSt', 0); $(this).addClass('b-vertical-arrow__open'); $(this).children()[0].innerHTML =(document.title.indexOf('Профиль игрока')>-1 ? 'Свернуть блок ' : 'Collapse ') + $(this).attr('curStText'); $('.js-achivements-showhide').show(); $(this).parent().css('padding-top', '0'); $(this).parent().css('padding-bottom', '0'); $(this).parent().prev().show();}"
                + " } else { if (parseInt($(this).attr('curSt')) === 0) {"
                + " if ($(this).attr('curStText') === '\"Общее\"' || $(this).attr('curStText') === 'диаграм' || $(this).attr('curStText') === '\"Common\"' || $(this).attr('curStText') === 'diargams') $(this).parent().prev().hide();"
                + " $(this).parent().css('padding-top', '10px');"
                + " $(this).parent().css('padding-bottom', '10px');"
                + " if ($(this).attr('curStText') === '\"Техника\"') {$(this).parent().prev().hide();$(this).parent().prev().prev().hide(); $('.t-profile__vehicle').hide();}"
                + " if ($(this).attr('curStText') === '\"Рейтинги\"' || $(this).attr('curStText') === '\"Ratings\"' || $(this).attr('curStText') === '\"Vehicles\"') {$(this).parent().prev().hide();$(this).parent().prev().prev().hide();}"
                + " $(this).parent().next().slideUp('slow'); $(this).attr('curSt', 1); $(this).removeClass('b-vertical-arrow__open'); $(this).children()[0].innerHTML =(document.title.indexOf('Профиль игрока')>-1 ? 'Развернуть блок ' : 'Expand ') + $(this).attr('curStText');} "
                + " else {"
                + " $(this).parent().css('padding-top', '0');"
                + " $(this).parent().css('padding-bottom', '0');"
                + " if ($(this).attr('curStText') === '\"Общее\"' || $(this).attr('curStText') === 'диаграм' || $(this).attr('curStText') === '\"Common\"' || $(this).attr('curStText') === 'diargams') $(this).parent().prev().show();"
                + " if ($(this).attr('curStText') === '\"Техника\"') {$(this).parent().prev().show();$(this).parent().prev().prev().show(); $('.t-profile__vehicle').show();}"
                + " if ($(this).attr('curStText') === '\"Рейтинги\"' || $(this).attr('curStText') === '\"Ratings\"' || $(this).attr('curStText') === '\"Vehicles\"') {$(this).parent().prev().show();$(this).parent().prev().prev().show();}"
                + " $(this).parent().next().slideDown('slow'); $(this).attr('curSt', 0); $(this).addClass('b-vertical-arrow__open'); $(this).children()[0].innerHTML = (document.title.indexOf('Профиль игрока')>-1 ? 'Свернуть блок ' : 'Collapse ')+ $(this).attr('curStText');} }});"
                + " $('#autor-pay').click(function(event) {event.preventDefault(); if ($(this).hasClass('b-vertical-arrow__open')) {$(this).removeClass('b-vertical-arrow__open'); $('.Untext').slideUp();} else {$(this).addClass('b-vertical-arrow__open'); $('.Untext').slideDown();}});"
                + " $('#js-nb-ch').change(function() {if($(this).is(':checked')) {$('.js-tank-head-row').hide(); $('.js-tank-row').hide(); $('.js-nb-tank-row').show();} else {$('.js-tank-head-row').show(); $('.js-tank-row').show()} });"
                + " $('.us-close-settings').click(function(event) {event.preventDefault(); $('#us-settings-overlay').hide(); $('#us-settings-block').hide(); });"
                + " $('#us-settings-a').click(function(event) {event.preventDefault(); $('#us-settings-overlay').show(); $('#us-settings-block').show(); });"
                + " $('#us-settings-current-page').change(function(event) {event.preventDefault(); if ($(this).is(':checked')) {$('#us-settings-compare-page').val(window.location.href)} else {$('#us-settings-compare-page').val('');}});"
                + " $('#us-settings-compare').change(function(event) {if ($(this).is(':checked')) {$('#us-my-compare-block').show()} else {$('#us-my-compare-block').hide()}});"
                + " $('#us-settings-save').click(function(event) {event.preventDefault(); var uBls = $('.us-set-block'), saveC = ''; for (var i=0; i<uBls.length; i++) {saveC += uBls[i].getAttribute('btype') + ';' + (uBls[i].cells[1].getElementsByTagName('input')[0].checked ? '1' : '0') + ';' + (uBls[i].cells[2].getElementsByTagName('input')[0].checked ? '1' : '0') + '/';}"
                + " var padr=$('#us-settings-compare-page').val(), cmpD = $('#us-settings-compare')[0].checked; if(!padr) padr='x'; if (cmpD && padr.length === 0) return false; saveC += '|'; saveC += (cmpD ? '1' : '0') + ';' + padr; var gtype = $('input[name=gtype]:checked').val(); saveC += '|'; saveC += gtype; saveC += '|'; $('.us_st_name').each(function() {saveC += $(this).attr('uid') + ';' + $(this).val() + '/';}); setCookie('usSettings', saveC, '; expires=Mon, 01-Jan-2031 00:00:00 GMT' +'; domain=.' + window.location.host.toString() + '; path=/community;'); $('#us-settings-overlay').hide(); $('#us-settings-block').hide(); window.location.reload();});"
                + " $('.us-show-medals').click(function(event) {event.preventDefault(); if ($(this).hasClass('b-vertical-arrow__open')) {$(this).removeClass('b-vertical-arrow__open'); $(this).parent().next().slideUp('slow');} else {$(this).addClass('b-vertical-arrow__open'); $(this).parent().next().slideDown('slow');}});"
                + " $('#WriteStat').click(function(event) {event.preventDefault(); WriteStat();});"
                + " $('input[name=ggtype]').change(function(event) {var gtype = $('input[name=ggtype]:checked').val(); $('div[gtype=bat]').show(); $('div[gtype=date]').show(); if (gtype === 'bat') $('div[gtype=date]').hide(); if (gtype === 'date') $('div[gtype=bat]').hide();});"
                + " $('.us-remove-stat').click(function(event) {event.preventDefault(); if (confirm('Вы действительно хотите удалить сохраненную статистику данного игрока?')) {var uid = $(this).attr('uid'); for (var i=0; i<8; i++) {localStorage.removeItem('daystat_'+uid+'_'+i)} window.location.reload();} });"
                + ' $("#g' + settings.gtype + '").click(); ' + "$('div[gtype=bat]').show(); $('div[gtype=date]').show(); var ggtype = '" + settings.gtype + "'; if (ggtype === 'bat') $('div[gtype=date]').hide(); if (ggtype === 'date') $('div[gtype=bat]').hide();"
                + "}); ";
        document.body.appendChild(script);
    }

    function setup_script(script_name) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.textContent = script_name.toString();
        document.body.appendChild(script);
    }

    function CalcAvgLev(tanksarr) {
        var avgL = 0,
                totalB = 0,
                tnaSum = 0,
                tanks = document.getElementsByClassName("t-profile_tankstype__item"),
                tbcount,
                tlev,
                imgName,
                tankLevs = {
            "I": 1,
            "II": 2,
            "III": 3,
            "IV": 4,
            "V": 5,
            "VI": 6,
            "VII": 7,
            "VIII": 8,
            "IX": 9,
            "X": 10
        },
        prem = ['tetrarch_ll', 'm3_stuart_ll', 'bt-sv', 't-127', 'valentine_ll', 'a-32', 'churchill_ll', 'matilda_ii_ll', 'gb68_matilda_black_prince', 'kv-220_action', 'kv-220', 'kv-5', 'object252', 't26_e4_superpershing', 'jagdtiger_sdkfz_185', 't34_hvy', 'h39_captured', 'pzii_j', 's35_captured', 't-15', 'b-1bis_captured', 't-25', 'pzv_pziv', 'pzv_pziv_ausf_alfa', 'lowe', 't2_lt', 'mtls-1g14', 'm22_locust', 'm4a2e4', 'ram-ii', 't14', 'm6a2e1', 'su_85i', 'pziv_hydro', '_105_lefh18b2', 'fcm_36pak40', 'dickermax', 'ch02_type62', 'ch01_type59', 'su122_44', 'panther_m10', 'pziv_schmalturm', 'gb63_tog_ii', 'gb71_at_15a', 'fcm_50t', 'su100y', 't1_e6', 'm60', 'e-25', 'ltp'];

        var nominalDamage = GetLSData("nominalDamage"),
                nominalDamageArr = [];
        if (nominalDamage) {
            nominalDamage = eval(nominalDamage);
            for (i = 0; i < nominalDamage.length; i++) {
                nominalDamageArr[(nominalDamage[i].id).toLowerCase()] = nominalDamage[i].nominalDamage;
            }
        } else {
            xdr.xget("http://www.noobmeter.com/tankListJson/elfx_133054", savenominalDamage);
        }

        for (var i = 0; i < tanks.length; i++) {
            imgName = (tanks[i].cells[0].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1]).toLowerCase();
            if (tanksarr.indexOf(imgName) === -1)
                tanksarr[imgName] = {};
            tbcount = toFl(tanks[i].cells[1].innerHTML);
            if (nominalDamageArr[imgName])
                tnaSum += tbcount * nominalDamageArr[imgName];
            if (prem.indexOf(imgName) >= 0) {
                tanksarr[imgName]['prem'] = true;
                tanks[i].cells[0].getElementsByTagName('a')[0].setAttribute('style', 'color: #ffc363 !important;');
            } else {
                tanksarr[imgName]['prem'] = false;
            }
            tlev = tankLevs[tanks[i].cells[0].getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML];
            tanksarr[imgName]['tlev'] = tlev;
            tanksarr[imgName]['img'] = tanks[i].cells[0].getElementsByTagName('img')[0].src;
            tanksarr[imgName]['name'] = tanks[i].cells[0].getElementsByTagName('a')[0].innerHTML;
            var tcl = tanks[i].parentNode.previousElementSibling.getElementsByTagName('span')[0].getAttribute('class');

            tanksarr[imgName]['bcount'] = tbcount;

            if (tcl.indexOf('lighttank') !== -1) {
                tanksarr[imgName]['ttype'] = 'ЛТ';
            }

            if (tcl.indexOf('mediumtank') !== -1) {
                tanksarr[imgName]['ttype'] = 'СТ';
            }

            if (tcl.indexOf('heavytank') !== -1) {
                tanksarr[imgName]['ttype'] = 'ТТ';
            }

            if (tcl.indexOf('at-spg') !== -1) {
                tanksarr[imgName]['ttype'] = 'ПТ';
            }

            if (tcl.indexOf('_spg') !== -1) {
                tanksarr[imgName]['ttype'] = 'САУ';
            }

            totalB += tbcount;
            avgL += tlev * tbcount;
        }

        return [avgL / totalB, tnaSum];
    }

    function CalcgOldAvgLev(ds) {
        var avgL = 0,
                totalB = 0,
                tanks = document.getElementsByClassName("t-profile_tankstype__item"),
                tbcount,
                twcount,
                tlev,
                imgName,
                tankLevs = {
            "I": 1,
            "II": 2,
            "III": 3,
            "IV": 4,
            "V": 5,
            "VI": 6,
            "VII": 7,
            "VIII": 8,
            "IX": 9,
            "X": 10
        };

        for (i = 0; i < tanks.length; i++) {
            imgName = tanks[i].cells[0].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
            if (ds[imgName]) {
                tbcount = toFl(ds[imgName].b);
                twcount = toFl(ds[imgName].w);
            } else {
                tbcount = 0;
                twcount = 0;
            }
            tlev = tankLevs[tanks[i].cells[0].getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML];
            totalB += tbcount;
            avgL += tlev * tbcount;

        }
        return [avgL / totalB];
    }

    function FoundProc(Wins, Battles) {
        nextD3 = Math.ceil(Wins / Battles * 100 + 0.5) - 0.5;
        nextD1 = nextD3 - 1;
        nextD2 = nextD3 - 0.5;
        need_b1 = Math.floor(Battles - Wins * 100 / nextD1);
        if (100 * Wins / Battles > nextD2)
            need_b2 = Math.floor(Battles - Wins * 100 / nextD2);
        else
            need_b2 = Math.ceil((nextD2 * Battles - Wins * 100) / (100 - nextD2));
        need_b3 = Math.ceil((nextD3 * Battles - Wins * 100) / (100 - nextD3));
        return Wins + "<font color='red'>/</font> <font color='green'>" + Battles + "</font><br>" + nextD1 + "% (" + need_b1 + ")<br>" + nextD2 + "% (" + need_b2 + ")<br>" + nextD3 + "% (" + need_b3 + ")";
    }

    function CalcEffColor(effval, type) {
        var lang;
        if (document.title.indexOf("Профиль игрока") > -1) {
            lang = "ru";
        }
        if (type === "eff") {
            if (effval < 635)
                return ['FE0E00', (635 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 860)
                return ['FE7903', (860 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 1140)
                return ['F8F400', (1140 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 1460)
                return ['60FF00', (1460 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 1735)
                return ['02C9B3', (1735 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 99999)
                return ['D042F3', (lang === "ru" ? 'Максимальный уровень. Круче только вареные яйца.' : 'Max. level')];
        } else if (type === "wn6") {
            if (effval < 425)
                return ['FE0E00', (425 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 795)
                return ['FE7903', (795 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 1175)
                return ['F8F400', (1175 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 1570)
                return ['60FF00', (1570 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 1885)
                return ['02C9B3', (1885 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 99999)
                return ['D042F3', (lang === "ru" ? 'Максимальный уровень. Круче только вареные яйца.' : 'Max. level')];
        } else if (type === "xvm") {
            if (effval < 16.5)
                return ['FE0E00', (16.5 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 33.5)
                return ['FE7903', (33.5 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 52.5)
                return ['F8F400', (52.5 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 75.5)
                return ['60FF00', (75.5 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 92.5)
                return ['02C9B3', (92.5 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 101)
                return ['D042F3', (lang === "ru" ? 'Максимальный уровень. Круче только вареные яйца.' : 'Max. level')];
        } else if (type === "pr") {
            if (effval < 999)
                return ['FE0E00', (999 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 1214)
                return ['FE7903', (1214 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 1444)
                return ['F8F400', (1444 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 1684)
                return ['60FF00', (1684 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 1989)
                return ['02C9B3', (1989 - effval).toFixed(2) + (lang === "ru" ? ' баллов до следующего ранга' : ' balls to next level')];
            if (effval < 99999)
                return ['D042F3', (lang === "ru" ? 'Максимальный уровень. Круче только вареные яйца.' : 'Max. level')];
        }
        return ['white', ''];
    }

    function outWotNoobStatColor(nr) {
        if (0 <= nr && nr < 60)
            return '992323';
        if (60 <= nr && nr < 80)
            return 'c4595e';
        if (80 <= nr && nr < 110)
            return 'dad858';
        if (110 <= nr && nr < 190)
            return '00aa40';
        if (190 <= nr)
            return 'c270ae';
    }

    function outWotNoobStatTitle(nr) {
        if (0 <= nr && nr < 40)
            return "оДНОклеточное\nподающая надежды бОльшая половина сервера";
        if (40 <= nr && nr < 45)
            return "донышко\nподающая надежды бОльшая половина сервера";
        if (45 <= nr && nr < 50)
            return "ИЛита\nподающая надежды бОльшая половина сервера";
        if (50 <= nr && nr < 55)
            return "НЛДнище\nподающая надежды бОльшая половина сервера";
        if (55 <= nr && nr < 60)
            return "неМОЩный\nподающая надежды бОльшая половина сервера";

        if (60 <= nr && nr < 65)
            return "Мистер Крабс\n~46,26%";
        if (65 <= nr && nr < 70)
            return "обуза\n~40,34%";
        if (70 <= nr && nr < 75)
            return "РАКетмэн\n~34,91%";
        if (75 <= nr && nr < 80)
            return "оЛОЛошка\n~29,94%";

        if (80 <= nr && nr < 85)
            return "агроЛЕНЬ\n~25,41%";
        if (85 <= nr && nr < 90)
            return "драчун-забияка\n~21,37%";
        if (90 <= nr && nr < 95)
            return "го в треньку!\n~17,76%";
        if (95 <= nr && nr < 100)
            return "небезнадежный\n~14,56%";
        if (100 <= nr && nr < 110)
            return "всё ровно\n~11,80%";

        if (110 <= nr && nr < 120)
            return "закаленный\n~7,44%";
        if (120 <= nr && nr < 130)
            return "раСЧЕТливый\n~4,40%";
        if (130 <= nr && nr < 140)
            return "пользАдел\n~2,43%";
        if (140 <= nr && nr < 150)
            return "PRO.думанный\~1,26%";
        if (150 <= nr && nr < 160)
            return "вездесуЮщий\n~0,61%";
        if (160 <= nr && nr < 170)
            return "УМелец\n~0,29%";
        if (170 <= nr && nr < 180)
            return "УМникум\n~0,13%";
        if (180 <= nr && nr < 190)
            return "нинзя-мастер\n~0,06%";

        if (190 <= nr && nr < 200)
            return "Джоkер\n~0,0287%";
        if (200 <= nr && nr < 210)
            return "игра пройдена\n~0,0141%";
        if (210 <= nr && nr < 220)
            return "маньяк\n~0,0077%";
        if (220 <= nr && nr < 250)
            return "директор зоопарка\n~0,0039%";
        if (250 <= nr)
            return "убийца ВБРа\n~0,0007%";
    }

    function outWotNoobStat(response) {
        var regexp = /<div class="kpd">(\d*\.*\d*)+<\/div>/gi,
                res = regexp.exec(response);
        if (res.length > 0) {
            document.getElementById("js-us-NoobStat").innerHTML = "<font color='" + outWotNoobStatColor(Number(res[1])) + "'>" + res[1] + "</font>";
            document.getElementById("js-us-NoobStat_tooltip").innerHTML = outWotNoobStatTitle(Number(res[1]));
        }
    }
}//////////////////////////main

function CalcEff(New, AvgLev, battles, wins, damag, frags, spotted, caps, defs, summaryxp) {
    var effs = [];
    effs[0] = (damag / battles * (10 / (AvgLev + 2)) * (0.23 + 2 * AvgLev / 100) +
            frags / battles * 250 +
            spotted / battles * 150 +
            Math.log((caps / battles) + 1) / Math.log(1.732) * 150 +
            defs / battles * 150).toFixed(2); //eff
    effs[1] = (damag / battles * (10 / AvgLev) * (0.15 + 2 * AvgLev / 100) +
            frags / battles * (0.35 - 2 * AvgLev / 100) * 1000 +
            spotted / battles * 200 +
            caps / battles * 150 +
            defs / battles * 150).toFixed(2); //old eff
    effs[2] = ((1240 - 1040 / Math.pow(Math.min(AvgLev, 6), 0.164)) * frags / battles +
            damag / battles * 530 / (184 * Math.pow(Math.E, 0.24 * AvgLev) + 130) +
            spotted / battles * 125 +
            Math.min(defs / battles, 2.2) * 100 +
            ((185 / (0.17 + Math.pow(Math.E, (wins / battles * 100 - 35) * -0.134))) - 500) * 0.45 +
            (6 - Math.min(AvgLev, 6)) * -60).toFixed(2);
    if (New === 0)
        effs[3] = (Math.log(battles) / 10 * (summaryxp / battles * 1 +
                damag / battles * (wins / battles * 2.0 + frags / battles * 0.9 + spotted / battles * 0.5 + caps / battles * 0.5 + defs / battles * 0.5))).toFixed(2);
    return effs;
}

function insertNewTr(NewTrParent, text, val, title, tid) {
    var trNew = document.createElement('tr');
    var tdNewName = document.createElement('td'),
            div1 = document.createElement('div'),
            div2 = document.createElement('div');
    tdNewName.className = "td-minor";
    tdNewName.innerHTML = text;
    var tdNew = document.createElement('td');
    div1.innerHTML = val;
    tdNew.className = "td-value";
    tdNew.appendChild(div1);
    if (title && title.length) {
        div1.setAttribute("id", "js-" + tid);
        div1.className = "js-tooltip";
        div2.innerHTML = title;
        div2.setAttribute("id", "js-" + tid + "_tooltip");
        div2.className = "b-tooltip-main";
        tdNew.appendChild(div2);
    }
    NewTrParent.parentNode.appendChild(trNew);
    trNew.appendChild(tdNewName);
    trNew.appendChild(tdNew);
    return trNew;
}

function fixStatData(response) {
    var lang;
    if (document.title.indexOf("Профиль игрока") > -1)
        lang = "ru";
    eval("var resp =" + response);

    var tStat = [];
    for (var i = 0; i < resp.data.vehicles.length; i++) {
        var tName = resp.data.vehicles[i].image_url.match(/\/[^-]+-([^\/]*)\.png/)[1];
        tStat[tName] = {"win": resp.data.vehicles[i].win_count, "battles": resp.data.vehicles[i].battle_count, "damageDealt": resp.data.vehicles[i].damageDealt, "survivedBattles": resp.data.vehicles[i].survivedBattles,
            "frags": resp.data.vehicles[i].frags, "spotted": resp.data.vehicles[i].spotted};
    }
    var tanks = document.getElementsByClassName("t-profile_tankstype__item");
    for (i = 0; i < tanks.length; i++) {
        var t = tanks[i].cells,
                imgName = t[0].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
        tanks[i].className += " js-tooltip";
        tanks[i].id = "us-t-" + imgName;
        var div = document.createElement('div');
        if (imgName in tStat)
            div.innerHTML = "<div style='float:left;'>" + (lang === "ru" ? "Боев|Побед (%Побед)" : "Battles|Wins (%Wins)") + "</div><div style='float:right; padding-left:10px;'>" + tStat[imgName].battles + "|" + tStat[imgName].win + " (" + col(tStat[imgName].win / tStat[imgName].battles * 100, 2) + ")</div>";
        div.setAttribute("id", "us-t-" + imgName + "_tooltip");
        div.className = "b-tooltip-main";
        tanks[i].appendChild(div);
        if (imgName in tStat)
            t[2].innerHTML = col(tStat[imgName].win / tStat[imgName].battles * 100, 2);
        if (imgName in tStat)
            t[2].setAttribute("wcount", tStat[imgName].win);
    }
    OutUnoffStat();
}

function batCompanyClan(response) {
    eval("var resp =" + response);
    var UserId = window.location.href.match(/\/(\d+)/)[1],
            companyTable = document.getElementById('company-battles'),
            clanTable = document.getElementById('clan-battles');

    insertNewTr(companyTable, "Боев", resp.data[UserId].statistics.company.battles + " (" + (resp.data[UserId].statistics.company.battles / resp.data[UserId].statistics.all.battles * 100).toFixed(2) + "%)", resp.data[UserId].statistics.company.battles + " <font color='red'>/</font> <font color='green'>" + resp.data[UserId].statistics.all.battles + "</font>", "cpbat");
    insertNewTr(companyTable, "Побед", resp.data[UserId].statistics.company.wins + " (" + (resp.data[UserId].statistics.company.wins / resp.data[UserId].statistics.all.wins * 100).toFixed(2) + "%)", resp.data[UserId].statistics.company.wins + " <font color='red'>/</font> <font color='green'>" + resp.data[UserId].statistics.all.wins + "</font>", "cpwin");
    insertNewTr(companyTable, "% побед", resp.data[UserId].statistics.company.battles > 0 ? col((resp.data[UserId].statistics.company.wins / resp.data[UserId].statistics.company.battles * 100).toFixed(2)) : '-', "");

    insertNewTr(clanTable, "Боев", resp.data[UserId].statistics.clan.battles + " (" + (resp.data[UserId].statistics.clan.battles / resp.data[UserId].statistics.all.battles * 100).toFixed(2) + "%)", resp.data[UserId].statistics.clan.battles + " <font color='red'>/</font> <font color='green'>" + resp.data[UserId].statistics.all.battles + "</font>", "clbat");
    insertNewTr(clanTable, "Побед", resp.data[UserId].statistics.clan.wins + " (" + (resp.data[UserId].statistics.clan.wins / resp.data[UserId].statistics.all.wins * 100).toFixed(2) + "%)", resp.data[UserId].statistics.clan.wins + " <font color='red'>/</font> <font color='green'>" + resp.data[UserId].statistics.all.wins + "</font>", "clwin");
    insertNewTr(clanTable, "% побед", resp.data[UserId].statistics.clan.battles > 0 ? col((resp.data[UserId].statistics.clan.wins / resp.data[UserId].statistics.clan.battles * 100).toFixed(2)) : '-', "");

    var effres = CalcEff(0, 6,
            resp.data[UserId].statistics.all.battles - resp.data[UserId].statistics.company.battles - resp.data[UserId].statistics.clan.battles,
            resp.data[UserId].statistics.all.wins - resp.data[UserId].statistics.company.wins - resp.data[UserId].statistics.clan.wins,
            resp.data[UserId].statistics.all.damage_dealt - resp.data[UserId].statistics.company.damage_dealt - resp.data[UserId].statistics.clan.damage_dealt,
            resp.data[UserId].statistics.all.frags - resp.data[UserId].statistics.company.frags - resp.data[UserId].statistics.clan.frags,
            resp.data[UserId].statistics.all.spotted - resp.data[UserId].statistics.company.spotted - resp.data[UserId].statistics.clan.spotted,
            resp.data[UserId].statistics.all.capture_points - resp.data[UserId].statistics.company.capture_points - resp.data[UserId].statistics.clan.capture_points,
            resp.data[UserId].statistics.all.dropped_capture_points - resp.data[UserId].statistics.company.dropped_capture_points - resp.data[UserId].statistics.clan.dropped_capture_points,
            resp.data[UserId].statistics.all.xp - resp.data[UserId].statistics.company.xp - resp.data[UserId].statistics.clan.xp);
    var bsr = document.getElementById("js-bs-rating"),
            hitrat = document.getElementById("js-hit-ratio"),
            hitratt = document.getElementById("js-hit-ratio_tooltip"),
            winperc = document.getElementsByClassName("t-profile")[0].rows[2].cells[2];
    bsr.innerHTML = effres[3];
    hitrat.innerHTML = col((resp.data[UserId].statistics.all.hits / resp.data[UserId].statistics.all.shots * 100).toFixed(2));
    hitratt.innerHTML = resp.data[UserId].statistics.all.hits + " <font color='red'>/</font> <font color='green'>" + resp.data[UserId].statistics.all.shots + "</font>";
    var newwp = (resp.data[UserId].statistics.all.wins / resp.data[UserId].statistics.all.battles * 100).toFixed(0);
    winperc.innerHTML = newwp + (OldWinPerc !== 999 ? (((newwp - OldWinPerc) > 0 ? "<font color='green'> (+" + (newwp - OldWinPerc) : "<font color='red'> (" + (newwp - OldWinPerc)) + ")</font>") : "");
    GetStatData(effres);
}

function savenominalDamage(response) {
    var now = new Date(),
            time = now.getTime();
    time += 3600 * 24 * 1000;
    now.setTime(time);
    SetLSData("nominalDamage", response, now.toGMTString());
    window.location.reload();
}

function GetBattleStat(col) {
    switch (col)
    {
        case 4:
            return toFl(document.getElementsByClassName("b-result")[0].getElementsByClassName("td-value")[1].innerHTML);
            break;
        case 7:
            return toFl(document.getElementsByClassName("b-result")[1].getElementsByClassName("td-value")[3].innerHTML);
            break;
        case 9:
            return toFl(document.getElementsByClassName("b-result")[1].getElementsByClassName("td-value")[0].innerHTML);
            break;
        case 10:
            return toFl(document.getElementsByClassName("b-result")[1].getElementsByClassName("td-value")[1].innerHTML);
            break;
        case 6:
            return toFl(document.getElementsByClassName("b-result")[1].getElementsByClassName("td-value")[5].innerHTML);
            break;
        case 8:
            return toFl(document.getElementsByClassName("b-result")[1].getElementsByClassName("td-value")[6].innerHTML);
            break;
        case 11:
            return toFl(document.getElementsByClassName("b-result")[0].getElementsByClassName("td-value")[4].innerHTML);
            break;
        case 5:
            return toFl(document.getElementsByClassName("b-result")[0].getElementsByClassName("td-value")[0].innerHTML);
            break;
        default:
            return 0;
            break;
            break;
    }
}

function toFl(s) {
    var a = "" + s;
    a = a.indexOf(">") > 0 ? a.substr(0, a.indexOf(">")) : a;
    return (parseFloat(a.replace(/[\D\.]/g, "")));
}

function getCookie(name) {
    var start = document.cookie.indexOf(name + '=');
    var len = start + name.length + 1;
    if ((!start) && (name !== document.cookie.substring(0, name.length))) {
        return null;
    }
    if (start === -1)
        return undefined;
    var end = document.cookie.indexOf(';', len);
    if (end === -1)
        end = document.cookie.length;

    var resval = document.cookie.substring(len, end);

    name = name + "__2";
    start = document.cookie.indexOf(name + '=');
    len = start + name.length + 1;
    if ((!start) && (name !== document.cookie.substring(0, name.length))) {
        return unescape(resval);
    }
    if (start === -1)
        return unescape(resval);
    end = document.cookie.indexOf(';', len);
    if (end === -1)
        end = document.cookie.length;

    resval += document.cookie.substring(len, end);

    return unescape(resval);
}

function setCookie(name, value, endstr) {
    var savestr = escape(value),
            savestr2 = false;
    if (savestr.length > 3900) {
        savestr2 = savestr.slice(3900);
        savestr = savestr.slice(0, 3900);
    }
    if (!endstr)
        endstr = "; expires=Mon, 01-Jan-2031 00:00:00 GMT";
    document.cookie = name + "=" + savestr + endstr;
    if (savestr2) {
        document.cookie = name + "__2" + "=" + savestr2 + endstr;
    }
}

function GetStat() {
    var UserId = window.location.href.match(/\/(\d+)/)[1],
            day = 0;
    // Перенос старого формата данных
    if (GetLSData("daystat_" + UserId)) {
        var daystat = GetLSData("daystat_" + UserId);
        SetLSData("daystat_" + UserId + "_" + 0, daystat, '01-Jan-2031 00:00:00 GMT');
        localStorage.removeItem("daystat_" + UserId);
    }
    for (var i = 1; i < 7; i++) {
        if (GetLSData("daystat_" + UserId + "_" + i))
            day += 1;
    }
    return GetLSData("daystat_" + UserId + "_" + day);
}

function WriteStat() {
    var UserId = window.location.href.match(/\/(\d+)/)[1];
    var timeStamp = new Date();
    var cookie = "" + timeStamp + ";",
            AllGold = document.getElementsByClassName("b-userblock-wrpr")[0].getElementsByClassName("currency-gold")[0],
            AllCredit = document.getElementsByClassName("b-userblock-wrpr")[0].getElementsByClassName("currency-credit")[0],
            AllExp = document.getElementsByClassName("b-userblock-wrpr")[0].getElementsByClassName("currency-experience")[0];

    if (AllGold) {
        cookie += "" + toFl(AllGold.innerHTML.split("(")[0]) + ";";
    } else
        cookie += "NaN;";
    if (AllCredit) {
        cookie += "" + toFl(AllCredit.innerHTML.split("(")[0]) + ";";
    } else
        cookie += "NaN;";
    if (AllExp) {
        cookie += "" + toFl(AllExp.innerHTML.split("(")[0]) + ";";
    } else
        cookie += "NaN;";

    for (var i = 1; i < 12; i++) {
        cookie += GetBattleStat(i) + ";";
        cookie += "0;";
    }

    var tanks = document.getElementsByClassName("t-profile_tankstype__item");
    for (var i = 0; i < tanks.length; i++) {
        var t = tanks[i].cells,
                imgName = t[0].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
        cookie += "/" + imgName + ";" + toFl(t[1].innerHTML.split("(")[0]) + ";" + toFl(t[2].innerHTML.split("(")[0]) + ";" + t[2].getAttribute("wcount");
    }

    cookie += "|";

    var medals = document.getElementsByClassName("js-full-achievements")[0].getElementsByClassName("b-achivements_item");
    for (i = 0; i < medals.length; i++) {
        if ((" " + medals[i].className + " ").replace(/[\n\t]/g, " ").indexOf(" b-achivements_item__empty ") === -1) {
            var count = medals[i].getElementsByTagName('div')[0];
            if (count) {
                count = count.getElementsByTagName('span')[0].getElementsByTagName('span')[0];
                if (count) {
                    count = toFl(count.innerHTML);
                } else {
                    count = 1;
                }
            } else {
                count = 1;
            }
            cookie += "/" + medals[i].id.split("-")[2] + ";" + count;
        }
    }

    var day = 0;
    for (i = 0; i < 7; i++) {
        if (!GetLSData("daystat_" + UserId + "_" + i)) {
            day = i;
            break;
        }
        day = 7;
    }
    if (day === 0) {
        SetLSData("daystat_" + UserId + "_0", cookie, '01-Jan-2031 00:00:00 GMT');
        if (document.title.indexOf("Профиль игрока") > -1) {
            alert("Статистика сохранена");
        } else {
            alert("Stat. saved");
        }
        ;
    } else {
        var daystat = GetLSData("daystat_" + UserId + "_" + (day - 1)),
                dsArr = daystat.split("|"),
                strArray = dsArr[0].split("/"),
                str = strArray[0].split(";"),
                OldBattles = toFl(str[12]);
        if (parseInt(OldBattles) === parseInt(GetBattleStat(5))) {
            if (document.title.indexOf("Профиль игрока") > -1) {
                alert("Нет новых боев");
            } else {
                alert("No new battles");
            }
            ;
        } else {
            if (day === 7) {
                for (i = 1; i < 7; i++) {
                    daystat = GetLSData("daystat_" + UserId + "_" + (i));
                    SetLSData("daystat_" + UserId + "_" + (i - 1), daystat, '01-Jan-2031 00:00:00 GMT');
                }
                day = 6;
            }
            SetLSData("daystat_" + UserId + "_" + day, cookie, '01-Jan-2031 00:00:00 GMT');
            if (document.title.indexOf("Профиль игрока") > -1) {
                alert("Статистика сохранена");
            } else {
                alert("Stat. saved");
            }
            ;
        }
    }
}

function col(v1, digit, inv) {
    if (isNaN(v1))
        return "x";
    var color = "90ffff";
    if (inv) {
        var v = 100 - v1;
    } else {
        v = v1;
    }
    if (digit)
        v1 = v1.toFixed(digit);
    if (v < 101)
        color = "D042F3";
    if (v < 63.9)
        color = "02C9B3";
    if (v < 56.7)
        color = "60FF00";
    if (v < 51.9)
        color = "F8F400";
    if (v < 48.8)
        color = "FE7903";
    if (v < 46.3)
        color = "FE0E00";

    return "<font color='" + color + "'>" + v1 + "%</font>";
}

function col2(v) {
    if (isNaN(v))
        v = 0;
    var color = "D042F3";
    if (v < 15)
        color = "02C9B3";
    if (v < 10)
        color = "60FF00";
    if (v < 5)
        color = "F8F400";
    if (v < 0)
        color = "FE7903";
    if (v < -5)
        color = "FE0E00";     //красный
    v = v.toFixed(2);
    if (v >= 0)
        v = "+" + v;
    return "<font color='" + color + "'>" + v + "</font>";
}

function SaveCompareStatData() {
    var timeStamp = new Date();
    var cookie = "" + timeStamp + ";",
            AllGold = document.getElementsByClassName("b-userblock-wrpr")[0].getElementsByClassName("currency-gold")[0],
            AllCredit = document.getElementsByClassName("b-userblock-wrpr")[0].getElementsByClassName("currency-credit")[0],
            AllExp = document.getElementsByClassName("b-userblock-wrpr")[0].getElementsByClassName("currency-experience")[0];

    if (AllGold) {
        cookie += "" + toFl(AllGold.innerHTML.split("(")[0]) + ";";
    } else
        cookie += "NaN;";
    if (AllCredit) {
        cookie += "" + toFl(AllCredit.innerHTML.split("(")[0]) + ";";
    } else
        cookie += "NaN;";
    if (AllExp) {
        cookie += "" + toFl(AllExp.innerHTML.split("(")[0]) + ";";
    } else
        cookie += "NaN;";

    for (var i = 1; i < 12; i++) {
        cookie += GetBattleStat(i) + ";";
        cookie += "0;";
    }

    var tanks = document.getElementsByClassName("t-profile_tankstype__item"),
            tlev, totalB = 0, avgL = 0, tbcount, tankLevs = {
        "I": 1,
        "II": 2,
        "III": 3,
        "IV": 4,
        "V": 5,
        "VI": 6,
        "VII": 7,
        "VIII": 8,
        "IX": 9,
        "X": 10
    };

    for (var i = 0; i < tanks.length; i++) {
        var t = tanks[i].cells,
                imgName = t[0].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
        tbcount = toFl(tanks[i].cells[1].innerHTML);
        tlev = tankLevs[tanks[i].cells[0].getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML];
        totalB += tbcount;
        avgL += tlev * tbcount;
        cookie += "/" + imgName + ";" + toFl(t[1].innerHTML.split("(")[0]) + ";" + toFl(t[2].innerHTML.split("(")[0]);
    }

    cookie += "|" + (avgL / totalB).toFixed(4);
    cookie += "|";

    var medals = document.getElementsByClassName("js-full-achievements")[0].getElementsByClassName("b-achivements_item");
    for (i = 0; i < medals.length; i++) {
        if ((" " + medals[i].className + " ").replace(/[\n\t]/g, " ").indexOf(" b-achivements_item__empty ") === -1) {
            var count = medals[i].getElementsByTagName('div')[0];
            if (count) {
                count = count.getElementsByTagName('span')[0].getElementsByTagName('span')[0];
                if (count) {
                    count = toFl(count.innerHTML);
                } else {
                    count = 1;
                }
            } else {
                count = 1;
            }
            cookie += "/" + medals[i].id.split("-")[2] + ";" + count;
        }
    }
    SetLSData("compareStat", cookie, '01-Jan-2031 00:00:00 GMT');
    window.close();
}

function WriteCompareStat() {
    var set = getCookie("usSettings").split('|')[1].split(';');
    if (toFl(set[0]) === 1 && set[1].match(/\/(\d+)/)[1] !== window.location.href.match(/\/(\d+)/)[1]) {
        window.open(set[1] + '#USCompareStat', 'usCompare', 'width=100, height=100');
        return false;
    }
}

function GetLSData(name) {
    var stVal = localStorage.getItem(name);
    if (stVal && new Date(stVal.split("||")[0]) <= new Date()) {
        localStorage.removeItem(name);
        stVal = null;
    }
    if (stVal) {
        return stVal.split("||")[1];
    } else
        return null;
}

function SetLSData(name, value, expire) {
    var stval = expire + "||" + value;
    localStorage.setItem(name, stval);
}

function outStatData2(response) {
    eval("var resp =" + response);
    var sStat = resp.veh_stat,
            arstr = '';
    for (var sc in sStat) {
        arstr += "/" + sc.toLowerCase() + ";" + (sStat[sc]["win"] / sStat[sc]["total"] * 100).toFixed(2);
    }
    var now = new Date(),
            time = now.getTime();
    time += 3600 * 24 * 1000;
    now.setTime(time);
    SetLSData("UsUnOfStat", arstr, now.toGMTString());
    OutUnoffStat();
}

function CalcOldAvgLev(ds, tankarr) {
    var avgL = 0,
            totalB = 0,
            NavgL = 0,
            NtotalB = 0;

    for (var tank in ds) {
        if (tankarr[tank]) {
            totalB += tankarr[tank].bcount;
            avgL += tankarr[tank].tlev * tankarr[tank].bcount;
            if (ds[tank].b !== tankarr[tank].bcount) {
                NtotalB += (tankarr[tank].bcount - ds[tank].b);
                NavgL += tankarr[tank].tlev * (tankarr[tank].bcount - ds[tank].b);
            }
        }
    }
    return [avgL / totalB, NavgL / NtotalB];
}

function PaintOldAvgLev(ds) {
    var avgL = 0,
            totalB = 0,
            NavgL = 0,
            NtotalB = 0,
            tanks = document.getElementsByClassName("t-profile_tankstype__item"),
            tbcount,
            twcount,
            tlev,
            imgName,
            tHd,
            newBat,
            tankLevs = {
        "I": 1,
        "II": 2,
        "III": 3,
        "IV": 4,
        "V": 5,
        "VI": 6,
        "VII": 7,
        "VIII": 8,
        "IX": 9,
        "X": 10
    };

    var theads = document.getElementsByClassName("t-profile__vehicle")[0].getElementsByTagName('tbody');
    for (var i = 0; i < theads.length; i++) {
        if (theads[i].style.display !== 'none')
            theads[i].setAttribute('class', 'js-tank-head-row');
    }

    for (i = 0; i < tanks.length; i++) {
        if (tanks[i].parentNode.previousElementSibling.style.display !== 'none')
            tanks[i].setAttribute('class', tanks[i].getAttribute('class') + ' js-tank-row');
        imgName = tanks[i].cells[0].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1];
        if (ds[imgName]) {
            tbcount = toFl(ds[imgName].b);
            twcount = ds[imgName].w;
        } else {
            tbcount = 0;
            twcount = 0;
        }
        tlev = tankLevs[tanks[i].cells[0].getElementsByTagName('div')[0].getElementsByTagName('span')[0].innerHTML];
        totalB += tbcount;
        avgL += tlev * tbcount;
        if (toFl(tanks[i].cells[1].innerHTML) !== tbcount) {
            NtotalB += toFl(tanks[i].cells[1].innerHTML.split("(")[0]) - tbcount;
            tHd = tanks[i].parentNode.previousElementSibling;
            newBat = toFl(tHd.getAttribute('newbat'));
            if (newBat) {
                newBat += toFl(tanks[i].cells[1].innerHTML.split("(")[0]) - tbcount;
            } else {
                newBat = toFl(tanks[i].cells[1].innerHTML.split("(")[0]) - tbcount;
            }
            tHd.setAttribute("style", "background-color: Darkslategray;");
            tHd.setAttribute("newBat", newBat);
            tHd.rows[0].cells[1].innerHTML = tHd.rows[0].cells[1].innerHTML.split("(")[0] + " (+" + newBat + ")";
            tanks[i].setAttribute("style", "background-color: Darkslategray;");
            tanks[i].setAttribute('class', tanks[i].getAttribute('class') + ' js-nb-tank-row');
            if (!tHd.getAttribute('class') || tHd.getAttribute('class').indexOf('js-nb-tank-row') === -1)
                tHd.setAttribute('class', (tHd.getAttribute('class') ? tHd.getAttribute('class') + ' js-nb-tank-row' : 'js-nb-tank-row'));
            tanks[i].cells[1].innerHTML = tanks[i].cells[1].innerHTML + " (+" + (toFl(tanks[i].cells[1].innerHTML.split("(")[0]) - tbcount) + ")";
            if (twcount !== -1 && tbcount !== 0) {
                var windelta = ((tanks[i].cells[2].getAttribute('wcount') / toFl(tanks[i].cells[1].innerHTML.split("(")[0]) * 100).toFixed(2) - (twcount / tbcount * 100).toFixed(2)).toFixed(2);
                tanks[i].cells[2].innerHTML = tanks[i].cells[2].innerHTML + " (" + (windelta > 0 ? "<font color='green'>+" + windelta + "</font>" : "<font color='red'>" + windelta + "</font>") + ")";
            }
            NavgL += tlev * (toFl(tanks[i].cells[1].innerHTML.split("(")[0]) - tbcount);
        }

    }
}

function outStatData(response) {
    eval("var resp =" + response);
    var sStat = resp.classRatings,
            arstr = '';
    for (var i = 0; i < rangA.length; i++) {
        arstr += sStat[rangA[i]] + ';';
    }
    var now = new Date(),
            time = now.getTime();
    time += 3600 * 24 * 1000;
    now.setTime(time);
    SetLSData("UsBsRangs", arstr, now.toGMTString());
    GetStatData();
}

function OutUnoffStat() {
    var stData = GetLSData("UsUnOfStat");
    if (stData) {
        var UnOffStat = stData.split("/");
        if (UnOffStat) {
            var unOffStatArr = [];
            for (i = 0; i < UnOffStat.length; i++) {
                var uoss = UnOffStat[i].split(";");
                unOffStatArr[uoss[0]] = uoss[1];
            }
            var vTh = document.getElementsByClassName("t-profile__vehicle")[0].getElementsByTagName('th')[4],
                    nTh = document.createElement('th');
            document.getElementsByClassName("t-profile__vehicle")[0].getElementsByTagName('th')[0].width = "288";
            nTh.innerHTML = '<span class="t-vehicle-head t-vehicle-head__fix"><span>' + (lang === "ru" ? "ср % побед по серверу" : "avg win %") + "</span></span>";
            nTh.className = "t-profile_center";
            vTh.parentNode.insertBefore(nTh, vTh);
            var tTypes = document.getElementsByClassName("js-tank-head-row");
            for (i = 0; i < tTypes.length; i++) {
                var nrth = tTypes[i].rows[0].getElementsByClassName('t-profile_center');
                if (nrth.length) {
                    nrth[0].width = "288";
                    var fTh = document.createElement('td');
                    fTh.innerHTML = '-';
                    fTh.className = "t-profile_center";
                    tTypes[i].rows[0].cells[4].parentNode.insertBefore(fTh, tTypes[i].rows[0].cells[4]);
                }
            }
            var tanks = document.getElementsByClassName("t-profile_tankstype__item");
            for (i = 0; i < tanks.length; i++) {
                var t = tanks[i].cells,
                        imgName = t[0].getElementsByTagName('img')[0].src.match(/\/[^-]+-([^\/]*)\.png/)[1].toLowerCase();
                var sTd = document.createElement('td');
                sTd.className = "t-profile_right";
                var med = unOffStatArr[imgName];
                if (med && t[2].getElementsByTagName('font')[0]) {
                    sTd.innerHTML = col(med) + " (" + col2(parseFloat(t[2].getElementsByTagName('font')[0].innerHTML) - med) + ")";
                } else {
                    sTd.innerHTML = "x";
                }
                t[4].parentNode.insertBefore(sTd, t[4]);
                var rItem = t[4].parentNode.getElementsByClassName("t-profile_ico-dropdown")[0];
                t[4].parentNode.removeChild(rItem);
            }
        }
        var daystat = GetStat();
        if (daystat) {
            var dayArray = [],
                    dsArr = daystat.split("|"),
                    strArray = dsArr[0].split("/");
            for (var i = 1; i < strArray.length; i++) {
                str = strArray[i].split(";");
                var tName = str[0].toLowerCase();
                dayArray[tName] = new Object();
                dayArray[tName].b = toFl(str[1]);
                dayArray[tName].w = str.length > 3 ? str[3] : -1;
            }
            PaintOldAvgLev(dayArray);
        }
    } else {
        xdr.xget("http://wot-crabe.ru/api/server_stats.json", outStatData2);
    }
}

function GetStatData() {
    var stData = GetLSData("UsBsRangs");
    var lang;
    var bsrat = document.getElementById("js-bs-rating").innerHTML.split("(")[0].split("<")[0];
    if (document.title.indexOf("Профиль игрока") > -1)
        lang = "ru";
    if (stData) {
        var bsRangs = stData.split(";");
        if (bsRangs) {
            var rcr = 0,
                    rcrv = 0;
            for (var i = bsRangs.length - 1; i > -1; i--) {
                if (Number(bsrat) > Number(bsRangs[i])) {
                    rcr = i;
                    if (i > 0) {
                        rcrv = (Number(bsRangs[i - 1]) - Number(bsrat)).toFixed(2) + (lang === "ru" ? " баллов до следующего ранга" : " balls to next level");
                    } else {
                        rcrv = (lang === "ru" ? 'Максимальный уровень. Круче только вареные яйца.' : 'Max. level');
                    }
                }
            }
            document.getElementById("js-bs-rating_tooltip").innerHTML = (lang === "ru" ? rangD[rcr] : rangDE[rcr]) + "<br>" + rcrv;
        }
    } else {
        xdr.xget("http://armor.kiev.ua/wot/api.php", outStatData);
    }
}