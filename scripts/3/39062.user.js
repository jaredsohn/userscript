// ==UserScript==
// @name           Post date, explained
// @namespace      http://userscripts.org/users/26596
// @description    Date of post in textual interpretation
// @include        http://leprosorium.ru/
// @include        http://*.leprosorium.ru/
// @include        http://leprosorium.ru/comments/*
// @include        http://*.leprosorium.ru/comments/*
// @include        http://leprosorium.ru/pages/*
// @include        http://*.leprosorium.ru/pages/*
// @include        http://leprosorium.ru/my/
// @include        http://*.leprosorium.ru/my/
// @include        http://leprosorium.ru/users/*/comments/
// @include        http://leprosorium.ru/users/*/posts/
// @include        http://leprosorium.ru/my/settings/
// @author         http://leprosorium.ru/users/n1313
// ==/UserScript==


var short_mode = 1, // short mode on/off

    storage = unsafeWindow.localStorage,
    settings = JSON.parse(storage.getItem('settings')) || {
        enableShortDate: true,
        enableTimezoneConversion: true,
        timezone: 1,
        showOriginal: false
    },
    serverTimezone = 3,
    h = 3600000, // msecs in 1 hour
    now = new Date(),
    elements = document.querySelectorAll('div.p'),
    onSettingsPage = document.querySelectorAll('#under-tabs form input[name=mindipatlogin]'),
    i, l, div, dateNode, postDateOriginal, day, month, year, hour, minute, delta, deltaDays, text, postDate, originalUTC, localeTimeString, span, form, html, checkShort, checkOriginal, checkTimezone, selectTimezone, fakeDate;

if (onSettingsPage.length > 0) {

    form = document.querySelectorAll('#under-tabs form[name=sf]')[0];
    html = '<table cellspacing="4" cellpadding="4"><tr><td colspan="2"><img src="http://img.dirty.ru/pics/bulet2.gif">Писать дату у комментариев в упрощённом виде?</td></tr><tr><td width="40" align="center"><input type="checkbox" value="1" name="gm_simpledate" class="checkbox"></td><td>Да, к чёрту подробности!</td></tr></table><hr size="1"><table cellspacing="4" cellpadding="4"><tr><td colspan="2"><img src="http://img.dirty.ru/pics/bulet2.gif">Показывать оригинальную дату в тултипе?</td></tr><tr><td width="40" align="center"><input type="checkbox" value="1" name="gm_showoriginal" class="checkbox"></td><td>Да, пожалуйста</td></tr></table><hr size="1"><table cellspacing="4" cellpadding="4"><tr><td colspan="2"><img src="http://img.dirty.ru/pics/bulet2.gif">Может, вы ещё и не в Москве живёте?</td></tr><tr><td width="40" align="center"><input type="checkbox" value="1" name="gm_converttimezone" class="checkbox"></td><td>Да, я живу в <select name="gm_timezoneoffset"><option value="-12">GMT -12</option><option value="-11">GMT -11</option><option value="-10">GMT -10</option><option value="-9">GMT -9</option><option value="-8">GMT -8</option><option value="-7">GMT -7</option><option value="-6">GMT -6</option><option value="-5">GMT -5</option><option value="-4">GMT -4</option><option value="-3">GMT -3</option><option value="-2">GMT -2</option><option value="-1">GMT -1</option><option value="0">GMT 0</option><option value="1">GMT +1</option><option value="2">GMT +2</option><option value="3">GMT +3</option><option value="4">GMT +4</option><option value="5">GMT +5</option><option value="6">GMT +6</option><option value="7">GMT +7</option><option value="8">GMT +8</option><option value="9">GMT +9</option><option value="10">GMT +10</option><option value="11">GMT +11</option><option value="12">GMT +12</option></select></td></tr></table><hr size="1">';

    form.innerHTML = html + form.innerHTML;
    checkShort = document.querySelectorAll('#under-tabs form input[name=gm_simpledate]')[0];
    checkOriginal = document.querySelectorAll('#under-tabs form input[name=gm_showoriginal]')[0];
    checkTimezone = document.querySelectorAll('#under-tabs form input[name=gm_converttimezone]')[0];
    selectTimezone = document.querySelectorAll('#under-tabs form select[name=gm_timezoneoffset]')[0];

    checkShort.checked = settings.enableShortDate;
    checkOriginal.checked = settings.showOriginal;
    checkTimezone.checked = settings.enableTimezoneConversion;
    selectTimezone.value = settings.timezone;

    form.addEventListener('submit', function(e) {
        storage.setItem('settings', JSON.stringify({
            enableShortDate: checkShort.checked,
            enableTimezoneConversion: checkTimezone.checked,
            timezone: selectTimezone.value,
            showOriginal: checkOriginal.checked
        }));
    });

} else {

    if (!settings.enableShortDate && !settings.enableTimezoneConversion) {
        return; // :(
    }

    for (i = 0, l = elements.length; i < l; i++) {

        div = elements[i];
        if (div.childNodes[2].textContent.indexOf('Написал') > 0) {
            dateNode = div.childNodes[4]; // sublepras
        } else {
            dateNode = div.childNodes[2];
        }

        if (dateNode.nodeValue.replace(/\s+/g,"") == 'в') {
        // sub-lepra post in "my things"
            dateNode = div.childNodes[4];
            // change target
        }

        postDateOriginal = dateNode.nodeValue.substr(1).replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,"").replace(/\s+/g," ");
        // trimmed original date of post

        if (postDateOriginal.indexOf('сегодня') === 0) {
            fakeDate = new Date(now.getTime() - serverTimezone * h);
            day = fakeDate.getDate();
            month = fakeDate.getMonth();
            year = fakeDate.getFullYear();
            hour = postDateOriginal.substr(10,2);
            minute = postDateOriginal.substr(13,2);
        } else if (postDateOriginal.indexOf('вчера') === 0) {
            fakeDate = new Date(now.getTime() - serverTimezone * h - 24 * h);
            day = fakeDate.getDate();
            month = fakeDate.getMonth();
            year = fakeDate.getFullYear();
            hour = postDateOriginal.substr(7,2);
            minute = postDateOriginal.substr(10,2);
        } else {
            day = postDateOriginal.substr(0,2);
            month = parseInt(postDateOriginal.substr(3,2)) - 1;
            year = postDateOriginal.substr(6,4);
            hour = postDateOriginal.substr(13,2);
            minute = postDateOriginal.substr(16,2);
        }


        postDate = new Date(year, month, day, hour, minute);

        if (settings.enableTimezoneConversion) {

            originalUTC = postDate.getTime() - serverTimezone * h;
            postDate = new Date(originalUTC + settings.timezone * h);

        }

        if (settings.enableShortDate) {

            delta = now.getTime() - postDate.getTime();
            deltaDays = Math.round(delta/(1000*60*60*24));
            // how many days ago this was posted

            localeTimeString = postDate.toLocaleTimeString().slice(0, -3);
            // strip seconds

            text = 'сегодня в ' + localeTimeString;
            if (deltaDays > 0)
                text = 'вчера в ' + localeTimeString;
            if (deltaDays > 1)
                text = 'позавчера';
            if (deltaDays > 2)
                text = 'несколько дней назад';
            if (deltaDays > 5)
                text = 'почти неделю назад';
            if (deltaDays == 7)
                text = 'неделю назад';
            if (deltaDays > 7)
                text = 'больше недели назад';
            if (deltaDays == 14)
                text = 'две недели назад';
            if (deltaDays > 14)
                text = 'полмесяца назад';
            if (deltaDays > 30)
                text = 'месяц назад';
            if (deltaDays > 33)
                text = 'больше месяца назад';
            if (deltaDays > 50)
                text = 'почти два месяца назад';
            if (deltaDays > 60)
                text = 'два месяца назад';
            if (deltaDays > 65)
                text = 'больше двух месяцев назад';
            if (deltaDays > 80)
                text = 'три месяца назад';
            if (deltaDays > 100)
                text = 'больше трёх месяцев назад';
            if (deltaDays > 125)
                text = 'четыре месяца назад';
            if (deltaDays > 150)
                text = 'почти полгода назад';
            if (deltaDays > 170)
                text = 'полгода назад';
            if (deltaDays > 200)
                text = 'больше полугода назад';
            if (deltaDays > 300)
                text = 'девять месяцев назад';
            if (deltaDays > 320)
                text = 'почти год назад';
            if (deltaDays > 360)
                text = 'год назад';
            if (deltaDays > 380)
                text = 'больше года назад';
            if (deltaDays > 450)
                text = 'полтора года назад';
            if (deltaDays > 600)
                text = 'почти два года назад';
            if (deltaDays > 700)
                text = 'два года назад';
            if (deltaDays > 760)
                text = 'больше двух лет назад';
            if (deltaDays > 1000)
                text = 'очень давно';

                text = text;

        } else {

            text = ', ' + postDate.toLocaleString() + ' в ' + postDate.getHours() + ':' + localeTimeString;

        }

        if (postDateOriginal[postDateOriginal.length - 1] === 'в') {
            postDateOriginal = postDateOriginal.slice(0,-3);
            text = text + ', в'
        }

        if (postDateOriginal.indexOf('|') > 0) {
            text = text + postDateOriginal.slice(postDateOriginal.indexOf('|'));
            postDateOriginal = postDateOriginal.slice(0, postDateOriginal.indexOf('|'));
        }

        span = document.createElement('span');
        span.innerHTML = ' ' + text + ' ';
        if (settings.showOriginal) {
            span.title = postDateOriginal;
        }
        dateNode.parentNode.insertBefore(span, dateNode);
        dateNode.parentNode.removeChild(dateNode);

    }

}