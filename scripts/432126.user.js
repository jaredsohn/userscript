// ==UserScript==
// @name        JDRefilter
// @namespace   JDRefilter
// @description 针对京东商品列表页面中已加载的商品，进行标题和价格的再过滤。
// @include     http://list.jd.com/*
// @include     http://search.jd.com/*
// @updateURL   http://userscripts.org/scripts/source/432126.meta.js
// @downloadURL http://userscripts.org/scripts/source/432126.user.js
// @icon        http://ww4.sinaimg.cn/mw690/640ae9d7gw1dyq002b0ytj.jpg
// @author      OscarGu
// @version     2014.04.04.1
// @grant       none
// ==/UserScript==

//#region /*变量*/
var oscarIsSearchPage = /(http:\/\/)?search\.\w*/i.test(top.location.href);

var oscarPrefix = 'oscar';
var oscarHideShow = oscarPrefix + 'HideShow';
var oscarFilter = oscarPrefix + 'Filter';
var oscarContent = oscarPrefix + 'Content';
var oscarMode = oscarPrefix + 'Mode';
var oscarPrice = oscarPrefix + 'Price';
var oscarPrice2 = oscarPrefix + 'Price2';
var oscarSearch = oscarPrefix + 'Search';
var oscarReset = oscarPrefix + 'Reset';
var oscarMsg = oscarPrefix + 'Msg';
var oscarFloatLeft = oscarPrefix + 'FloatLeft';
var oscarFloatRight = oscarPrefix + 'FloatRight';
var oscarCacheKey = oscarPrefix + 'CacheKey';
var oscarCache = [
    { Key: oscarContent, Type: 'string' },
    { Key: oscarMode, Type: 'boolean' },
    { Key: oscarPrice, Type: 'string' },
    { Key: oscarPrice2, Type: 'string' }
];
//#endregion

//#region /*样式*/
var oscarCss = '';
oscarCss += '.' + oscarFilter + '{position:fixed; top:30px;left:0px;z-index:99999}';
oscarCss += '.' + oscarHideShow + '{width:10px;cursor:pointer;background:#E43C3E;}';
oscarCss += '.' + oscarContent + '{width:161px;opacity:0.5;filter:alpha(opacity=50)}';
oscarCss += '.' + oscarPrice + '{width:71px;opacity:0.5;filter:alpha(opacity=50)}';
oscarCss += '.' + oscarSearch + '{opacity:0.75;filter:alpha(opacity=75)}';
oscarCss += '.' + oscarFloatLeft + '{float:left;}';
oscarCss += '.' + oscarFloatRight + '{float:right;}';
//#endregion

//#region /*Utility*/
var OscarUtility = {
    WriteCache: function(key, value) {
        if (typeof key != 'string' || !key) return;
        if (value != 0 && !value) value = '';
        if (typeof value != 'string') value = value.toString();
        value = escape(value);
        switch (OscarUtility.cacheStatus) {
            case 1:
                OscarUtility.setSession(key, value);
                break;
            case 0:
                OscarUtility.setCookie(key, value);
                break;
            default:
                break;
        }
    },
    ReadCache: function(key) {
        if (typeof key != 'string' || !key) return '';
        var value = '';
        switch (OscarUtility.cacheStatus) {
            case 1:
                value = OscarUtility.getSession(key);
                break;
            case 0:
                value = OscarUtility.GetCookie(key);
                break;
            default:
                break;
        }
        return unescape(value);
    },
    cacheStatus: (sessionStorage ? 1 : (navigator.cookieEnabled || document.cookie ? 0 : -1)),
    setSession: function(key, value) {
        sessionStorage.setItem(key, value);
    },
    getSession: function(key) {
        var value = sessionStorage.getItem(key);
        return value ? value : '';
    },
    setCookie: function(key, value) {
        document.cookie = key + '=' + value;
    },
    getCookie: function(key) {
        var cookie = document.cookie.split('; ');
        var value = '';
        for (var i = 0; i < cookie.length; i++) {
            var arr = cookie[i].split('=');
            if (arr[0] == key) {
                value = (arr[1]);
                break;
            }
        }
        return value ? value : '';
    },

    GetJson: function(jsonString) {
        if (typeof jsonString != 'string' || !jsonString) jsonString = '{}';
        return eval('(' + jsonString + ')');
    },
    GetJsonString: function(json) {
        if (!json) json = {};
        return JSON.stringify(json);
    },

    StringFormat: function(str) {
        if (typeof str != 'string' || !str) return '';
        for (var i = 0; i < arguments.length; i++) {
            var value = arguments[i + 1];
            if (typeof value != 'undefined') {
                var reg = new RegExp('({)' + i + '(})', 'g');
                str = str.replace(reg, value);
            }
        }
        return str;
    },

    AddStyle: function(css) {
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) return;
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
    },

    ToFloat: function(value, defaultValue) {
        var num = parseFloat(value);
        return !isNaN(num)
            ? num
            : (typeof defaultValue != 'number'
                ? 0
                : parseFloat(defaultValue));
    },

    IsEmptyObject: function(obj) {
        if (!obj) return true;
        for (var o in obj) return false;
        return true;
    },
};
//#endregion

var OscarRefilter = {
    Create: function() {
        /*初始化*/
        if (!document.getElementById(oscarFilter)) {
            var filter = [];
            filter.push(OscarUtility.StringFormat('<div id="{0}" class="{1}">', oscarFilter, oscarFilter));
            filter.push(OscarUtility.StringFormat('<div id="{0}" class="{1} {2}"></div>', oscarHideShow, oscarHideShow, oscarFloatLeft));
            filter.push(OscarUtility.StringFormat('<div class="{0}">', oscarFloatLeft));
            filter.push(OscarUtility.StringFormat('标题：<input id="{0}" type="text" class="{1}" /> ', oscarContent, oscarContent));
            filter.push(OscarUtility.StringFormat('<input id="{0}" type="checkbox"><label for="{1}">模糊查询</label><br/>', oscarMode, oscarMode));
            filter.push(OscarUtility.StringFormat('价格：<input id="{0}" type="text" class="{1}" /> ~ ', oscarPrice, oscarPrice));
            filter.push(OscarUtility.StringFormat('<input id="{0}" type="text" class="{1}" /> ', oscarPrice2, oscarPrice));
            filter.push(OscarUtility.StringFormat('<input id="{0}" type="button" value="过滤" class="{1}" /> ', oscarSearch, oscarSearch));
            filter.push(OscarUtility.StringFormat('<input id="{0}" type="button" value="重置" class="{1}" /><br/>', oscarReset, oscarSearch));
            filter.push(OscarUtility.StringFormat('<div class="{0}">排序：', oscarFloatLeft));
            filter.push('<a data-priceOrder="asc" href="javascript:void(0)">价格↑</a>&nbsp;&nbsp;&nbsp;&nbsp;');
            filter.push('<a data-priceOrder="desc" href="javascript:void(0)">价格↓</a></div>');
            filter.push(OscarUtility.StringFormat('<div class="{0}">', oscarFloatRight));
            filter.push('<a data-direction="prev" href="javascript:void(0)">上一页</a>&nbsp;&nbsp;&nbsp;&nbsp;');
            filter.push('<a data-direction="next" href="javascript:void(0)">下一页</a>&nbsp;</div><br/>');
            filter.push(OscarUtility.StringFormat('<div id="{0}"></div></div>', oscarMsg));
            filter.push('</div>');
            $('body').append(filter.join(''));

            OscarRefilter.readValues();
            OscarRefilter.bindEvents();
        }
    },

    bindEvents: function() {
        $('#' + oscarHideShow).click(function() {
            $(this).next().toggle();
        });
        $('#' + oscarSearch).click(OscarRefilter.refilter).click();
        $('#' + oscarReset).click(OscarRefilter.reset);
        $('a[data-priceOrder]').click(function() {
            var isAsc = $(this).attr('data-priceOrder') == 'asc';
            var array = $.makeArray($('#plist li'));
            array.sort(function(a, b) {
                var price1 = $(a).find('.p-price strong').html();
                price1 = OscarUtility.ToFloat(price1.substring(1, price1.length - 1));
                var price2 = $(b).find('.p-price strong').html();
                price2 = OscarUtility.ToFloat(price2.substring(1, price2.length - 1));
                return !isAsc ? price2 - price1 : price1 - price2;
            });
            $('#plist ul').html(array);
        });
        $('a[data-direction]').click(function() {
            $('a.' + $(this).attr('data-direction'))[0].click();
        });
        $('#' + oscarFilter).keypress(function(e) {
            switch (e.which) {
                case 13:
                    $('#' + oscarSearch).click();
                    break;
            }
        });
        $(document).ajaxComplete(function(a, b, c) {
            if (/^s.php\?.*keyword=/i.test(c.url)) $('#' + oscarSearch).click();
        });
    },

    refilter: function() {
        try {
            OscarRefilter.writeValues();
            var msg = $('#' + oscarMsg);
            msg.text('');
            var count = 0;
            var value = $('#' + oscarContent).val();
            var regExp = OscarRefilter.getRegExp(value, $('#' + oscarMode).is(':checked'));
            var price1 = OscarUtility.ToFloat($('#' + oscarPrice).val());
            var price2 = OscarUtility.ToFloat($('#' + oscarPrice2).val());
            $('#plist li').each(function() {
                var li = $(this);
                var content = li.find('.p-name a').html();
                var price = li.find('.p-price strong').html();
                price = price ? OscarUtility.ToFloat(price.substring(1, price.length - 1)) : 0;
                var exists = OscarRefilter.isContentMatched(content, regExp)
                    && OscarRefilter.isPriceMatched(price, price1, price2);
                if (!exists) count++;
                li.css('display', exists ? '' : 'none');
            });
            if (count > 0) msg.text(OscarUtility.StringFormat('已过滤掉 {0} 项。', count));
            var hideShow = $('#' + oscarHideShow);
            hideShow.height(hideShow.next().height());
            var offset = $('#filter').offset().top;
            if (document.documentElement.scrollTop > offset || value || price1 || price2) scroll(0, offset);
        } catch (e) {
            console.error(e);
        }
    },
    reset: function() {
        $('#' + oscarContent).val('');
        $('#' + oscarMode).attr('checked', false);
        $('#' + oscarPrice).val('');
        $('#' + oscarPrice2).val('');
        OscarRefilter.writeValues();
    },

    getRegExp: function(value, mode) {
        if (!value || typeof value != 'string') return null;
        mode = Boolean(mode);
        value = value.replace(/\s+/g, ' ').trim().split(' ');

        if (oscarIsSearchPage)
            for (var j = 0; j < value.length; j++)
                value[j] = value[j].split('').join('(</font>)?(<font class="skcolor_ljg">)?');

        value = mode ? value : OscarRefilter.permutation(value, '.*');
        return new RegExp(value.join('|'), 'gi');
    },

    isContentMatched: function(content, reg) {
        if (!content) content = '';
        if (!reg) return true;
        return reg.test(content);
    },
    isPriceMatched: function(price, priceStart, priceEnd) {
        return ((priceStart <= 0 && priceEnd <= 0)
            || (priceStart > 0 && priceEnd <= 0 && price >= priceStart)
            || (priceStart <= 0 && priceEnd > 0 && price <= priceEnd)
            || (priceStart > 0 && priceEnd > 0 && price >= priceStart && price <= priceEnd));
    },

    getKey: function(name) {
        return name.replace(oscarPrefix, '');
    },
    getName: function(key) {
        return oscarPrefix + key;
    },

    writeValues: function() {
        var json = {};
        for (var i = 0; i < oscarCache.length; i++) {
            var cache = oscarCache[i];
            switch (cache.Type) {
                case 'string':
                    json[OscarRefilter.getKey(cache.Key)] = $('#' + cache.Key).val();
                    break;
                case 'boolean':
                    json[OscarRefilter.getKey(cache.Key)] = $('#' + cache.Key).is(':checked');
                default:
            }
        }
        OscarUtility.WriteCache(oscarCacheKey, OscarUtility.GetJsonString(json));
    },
    readValues: function() {
        var json = OscarUtility.GetJson(OscarUtility.ReadCache(oscarCacheKey));
        for (var i = 0; i < oscarCache.length; i++) {
            var cache = oscarCache[i];
            switch (cache.Type) {
                case 'string':
                    $('#' + cache.Key).val(json[OscarRefilter.getKey(cache.Key)]);
                    break;
                case 'boolean':
                    $('#' + cache.Key).attr('checked', Boolean(json[OscarRefilter.getKey(cache.Key)]));
                default:
            }
        }
    },

    permutation: function(array, separator) {
        var result = [];
        if (!array || !array.length) return result;
        if (!separator) separator = '';
        if (array.length == 1) {
            result.push(array[0]);
            return result;
        }
        if (array.length == 2) {
            result.push(array.join(separator));
            result.push(array.concat().reverse().join(separator));
            return result;
        }
        for (var i = 0; i < array.length; i++) {
            var tmp = array.concat();
            tmp.splice(i, 1);
            tmp = OscarRefilter.permutation(tmp, separator);
            for (var j = 0; j < tmp.length; j++)
                result.push(array[i] + separator + tmp[j]);
        }
        return result;
    },
};

OscarUtility.AddStyle(oscarCss);
OscarRefilter.Create();