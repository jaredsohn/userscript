// ==UserScript==
// @name           fogbugz-timestampformat
// @version        1.1
// @namespace      ohnopub.net
// @description    Reformat timestamps
// @include        http://*.fogbugz.com/*
// @include        https://*.fogbugz.com/*
// @require        https://code.jquery.com/jquery-1.10.2.min.js
// @require        https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.5.1/moment.min.js
// ==/UserScript==

(function (jQuery) {
    jQuery(document).ready(function () {
        var isUTC = !unsafeWindow.g_ctznOffsetOnServerStandardTime && !unsafeWindow.g_ctznOffsetOnServerDaylightTime;

        var dstOffset = -unsafeWindow.g_ctznOffsetOnServerDaylightTime / 60;
        if (dstOffset > -20 && dstOffset < 20) dstOffset = 0;
        var dstStart = moment(unsafeWindow.g_ctzrgDaylightStart);
        var stdOffset = -unsafeWindow.g_ctznOffsetOnServerStandardTime / 60;
        if (stdOffset > -20 && stdOffset < 20) stdOffset = 0;
        var stdStart = moment(unsafeWindow.g_ctzrgStandardStart);
        var needDst = !dstStart.isSame(stdStart);
        var dstFirst = dstStart.isBefore(stdStart);

        var localeDate = unsafeWindow.GetLocaleDate().toUpperCase();
        var localeTime = unsafeWindow.GetLocaleTime().replace('AM', 'A');
        var formats = [localeDate + ' ' + localeTime, localeTime + ' ' + localeDate];
        jQuery('.date').each(function () {
            var obj = jQuery(this).find('*').last();
            if (!obj.length)
                obj = jQuery(this);
            var m;
            if (isUTC)
                m = moment.utc(obj.text(), formats);
            else
            {
                m = moment(obj.text(), formats);
                if (needDst
                    && (dstFirst
                        ? m.isAfter(moment(dstStart).year(m.year())) && m.isBefore(moment(stdStart).year(m.year()))
                        : m.isBefore(moment(stdStart).year(m.year())) || m.isAfter(moment(dstStart).year(m.year()))))
                    /* Do DST offset. */
                    m.zone(dstOffset);
                else
                    /* Do STD offset */
                    m.zone(stdOffset);
            }
            if (m.isValid())
                obj.text(m.format());
        });
    });
})(jQuery.noConflict(true));
