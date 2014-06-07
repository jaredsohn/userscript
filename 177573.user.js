// ==UserScript==
// @name       MyScript library
// @description  javascript library
// @namespace  https://www.battlenet.com.cn/
// @include        *
// @copyright  2013+, MZach
// @version    0.6
// ==/UserScript==

//返回大于等于min小于min+max的随机整数
var MZ_rand = function(min, max) {
    if (!MZ_isPositiveInteger(min))
        min = 0;
    if (!MZ_isPositiveInteger(max))
        max = 10;
    return Math.floor(Math.random() * max + min);
}

//随机等待大于等于secondMin小于secondMin+secondMax秒后执行func方法
//死循环
var MZ_randFunc = function(func, secondMin, secondMax) {
    func();
    var millisecond = MZ_rand(secondMin, secondMax) * 1000;
    setTimeout(function() {
        func();
        var millisecond2 = MZ_rand(secondMin, secondMax) * 1000;
        setTimeout(arguments.callee, millisecond2);
    }, millisecond);
}

//是否是正整数
var MZ_isPositiveInteger = function(value) {
    var re = /^[1-9]\d*$/;
    if (!re.test(value)) {
        return false;
    }
    return true;
}
//格式化日期输出。ex:yyyy-MM-dd hh:mm:ss
var MZ_formatDatetime = function(format) {
    if (!format)
        format = 'yyyy-MM-dd HH:mm:ss';
    var localDate = new Date();
    var meridiem = 'AM';
    var hr = localDate.getHours();

    if (hr > 12) {
        hr -= 12;
        meridiem = 'PM'

    } else if (hr === 12) {
        meridiem = 'PM'

    } else if (hr === 0) {
        hr = 12;
    }
    format = format.replace('yyyy', localDate.getFullYear());
    format = format.replace('MM', MZ_zeroFill(localDate.getMonth() + 1, 2));
    format = format.replace('dd', MZ_zeroFill(localDate.getDate(), 2));
    format = format.replace('HH', MZ_zeroFill(localDate.getHours(), 2));
    format = format.replace('hh', MZ_zeroFill(hr, 2));
    format = format.replace('mm', MZ_zeroFill(localDate.getMinutes(), 2));
    format = format.replace('ss', MZ_zeroFill(localDate.getSeconds(), 2));
    return format;
}

/**
 * Zero-fills a number to the specified length (works on floats and negatives, too).
 *
 * @param number
 * @param width
 * @param includeDecimal
 * @return string
 */
var MZ_zeroFill = function(number, width, includeDecimal) {
    if (typeof includeDecimal == 'undefined')
        includeDecimal = false;

    var result = parseFloat(number),
        negative = false,
        length = width - result.toString().length,
        i = length - 1;

    if (result < 0) {
        result = Math.abs(result);
        negative = true;
        length++;
        i = length - 1;
    }

    if (width > 0) {
        if (result.toString().indexOf('.') > 0) {
            if (!includeDecimal)
                length += result.toString().split('.')[1].length;

            length++;
            i = length - 1;
        }

        if (i >= 0) {
            do {
                result = '0' + result;
            } while (i--);
        }
    }

    if (negative)
        return '-' + result;

    return result;
}
/*****************************************************
抛出异常
参数msg:异常消息内容
参数source：异常引发源
*****************************************************/
var MZ_throwException = function(msg, source) {
    throw {
        message: msg,
        sourceObj: source
    };
}
/*****************************************************
解析value返回int型
参数value:被解析对象
参数no：解析失败返回的默认值
*****************************************************/
var MZ_isNumeric = function(value, no) {
    value = parseInt(value, 10);
    if (isNaN(value) || value == null || !isFinite(value))
        value = no || 1;
    return value;
}