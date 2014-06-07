// ==UserScript==
// @name            Greasemonkey Tools For Developers
// @namespace       kkhweb
// @author          empty_soul
// @homepage        http://userscripts.org/scripts/show/72585
// @version         1.9.1
// @description     My GreaseMonkey function wrapping Object
// @homepage        http://kkhweb.com/
// @include         http://*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

if (!GM) var GM = {};

GM = {
    version : '1.9.1',
    uw : unsafeWindow,
    log : function(msg) {
        GM_log(msg);
    },
    resTxt : function(resName){
        return GM_getResourceText(resName);
    },
    resUrl : function(resName){
        return GM_getResourceURL(resName);
    },
    css : function (s) {
        GM_addStyle(s);
    },
    ajax : function (o) {
        GM_xmlhttpRequest(o);
    },
    newTab : function(url) {
        return GM_openInTab(url);
    },
    menuReg : function(caption, commandFunc, accelKey, accelModifiers, accessKey) {
        GM_registerMenuCommand(caption, commandFunc, accelKey, accelModifiers, accessKey);
    },
    ajaxHeaders : {
        "Content-type" : "application/x-www-form-urlencoded",
        "User-Agent" : "Mozilla/5.0",
        "Accept" : "text/xml"
    },
    ajaxLoadGif : '<img src="http://i43.tinypic.com/16krmf4.gif" class="ajaxLoadGif" />',
    obj2url : function(obj) {
        var string = '';
        for(var a in obj) {string += a + '=' + obj[a] + '&';}
        return string.slice(0,string.length-1);
    },
    url2obj : function(str) {
        if(this.typeCheck(str, 'string')) {
           var obj = {};
           var url = str;
           var string = url.split('?')[1];
           var pairs = string.split('&');
           for(var key in pairs){
               var data = pairs[key].split('=');
               obj[data[0]] = data[1];
           }
           return obj;
        } else {
           return false;
        }
    },
    typeCheck : function(val, type) {
        return (typeof(val) == type);
    },
    addCommas : function(number)  {
        if(this.typeCheck(number, 'number')) {
            number += '';
            x = number.split('.');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return (x1 + x2);
        } else {
            return number;
        }
    },
    array : {
        removeIndex : function(array, index){
          return array.splice(index, 1, array);
        }
    },
    math : {
        round : function(num, dec) {
            var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
            return result;
        }
    },
    timer : {
        duration : 0,
        startUTC : 0,
        stopUTC : 0,
        start : function() {
            GM.timer.startUTC = new Date().getTime();
        },
        stop : function() {
            GM.timer.stopUTC = new Date().getTime();
            var tmp = (GM.timer.stopUTC - GM.timer.startUTC);
                tmp = (tmp / 1000);
            GM.timer.duration = GM.math.round(tmp,3);
        }
    },
    value : {
        set : function(key, val) {
            GM_setValue(key, val);
        },
        get : function(key, def) {
            if(GM.typeCheck(key, 'string') && GM.typeCheck(def, 'undefined')) {
                if(GM.typeCheck(GM_getValue(key), 'undefined')) {
                    return false;
                } else {
                    return GM_getValue(key);
                }
            } else {
                return GM_getValue(key, def)
            }
        },
        del : function(key) {
            GM_delValue(key);
        },
        list : function() {
            return GM_listValues();
        }
    },
    check : {
        patterns : {
            username : /\W/,
            email : /(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})/,
            phoneNum : /^(\(?\d\d\d\)?)?( |-|\.)?\d\d\d( |-|\.)?\d{4,4}(( |-|\.)?[ext\.]+ ?\d+)?$/,
            ip : /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
        },
        isUsername : function(str) {
            return this.patterns.username.test(str);
        },
        isEmail : function(str) {
            return this.patterns.email.test(str);
        },
        isIP : function(str) {
            return this.patterns.ip.test(str);
        },
        inURL : function(str) {
           var regex = new RegExp(str, 'g');
           return regex.test(document.location);
        },
        isPhoneNum : function(str) {
            return this.patterns.phoneNum.test(str);
        },
        type : function(a,b) {
            GM.checkType(a,b);
        }
    },
    parseFloatTime : function(time, respect) {
        this.input = time;
        this.weeks = 0;
        this.days = 0;
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        switch (respect) {
        default:
            break;
        case 'weeks':
            this.weeks = parseInt(time);
            time -= parseInt(time);
            time *= 7;
            this.days = parseInt(time);
            time -= parseInt(time);
            time *= 24;
            this.hours = parseInt(time);
            time -= parseInt(time);
            time *= 60;
            this.minutes = parseInt(time);
            time -= parseInt(time);
            time *= 60;
            this.seconds = parseInt(time);
            break;
        case 'days':
            if (time > 7) {
                this.weeks = parseInt(time / 7);
                time -= (this.weeks * 7)
            }
            this.days = parseInt(time);
            time -= parseInt(time);
            time *= 24;
            this.hours = parseInt(time);
            time -= parseInt(time);
            time *= 60;
            this.minutes = parseInt(time);
            time -= parseInt(time);
            time *= 60;
            this.seconds = parseInt(time);
            break;
        case 'hours':
            if ((time > 24 && time < (24 * 7))) {
                this.days = parseInt(time / 24);
                time -= (this.days * 24)
            } else if (time > (24 * 7)) {
                this.weeks = parseInt(time / 7);
                time -= (this.weeks * 7);
                this.days = parseInt(time / 24);
                time -= (this.days * 24)
            }
            this.hours = parseInt(time);
            time -= parseInt(time);
            time *= 60;
            this.minutes = parseInt(time);
            time -= parseInt(time);
            time *= 60;
            this.seconds = parseInt(time);
            break;
        case 'minutes':
            if (time > (60 * 24 * 7)) {
                this.weeks = parseInt(time / (60 * 24 * 7));
                time -= (this.weeks * (60 * 24 * 7));
                this.days = parseInt(time / (60 * 24));
                time -= (this.days * (60 * 24));
                this.hours = parseInt(time / 60);
                time -= (this.hours * 60);
                this.minutes = parseInt(time);
                time -= parseInt(time);
                time *= 60;
                this.seconds = parseInt(time)
            } else if (time > (60 * 24)) {
                this.days = parseInt(time / (60 * 24));
                time -= (this.days * (60 * 24));
                this.hours = parseInt(time / 60);
                time -= (this.hours * 60);
                this.minutes = parseInt(time);
                time -= (this.minutes);
                time *= 60;
                this.seconds = parseInt(time)
            } else if (time > 60) {
                this.hours = parseInt(time / 60);
                time -= (this.hours * (60 * 60));
                this.minutes = parseInt(time);
                time -= parseInt(time);
                time *= 60;
                this.seconds = parseInt(time)
            } else {
                this.minutes = parseInt(time);
                time -= parseInt(time);
                time *= 60;
                this.seconds = parseInt(time)
            }
            break;
        case 'seconds':
            if (time > (60 * 60 * 24 * 7)) {
                this.weeks = parseInt(time / (60 * 60 * 24 * 7));
                time -= (this.weeks * (60 * 60 * 24 * 7));
                this.days = parseInt(time / (60 * 60 * 24));
                time -= (this.days * (60 * 60 * 24));
                this.hours = parseInt(time / (60 * 60));
                time -= (this.hours * (60 * 60));
                this.minutes = parseInt(time / 60);
                time -= (this.minutes * 60);
                this.seconds = parseInt(time)
            } else if (time > (60 * 60 * 24)) {
                this.days = parseInt(time / (60 * 60 * 24));
                time -= (this.days * (60 * 60 * 24));
                this.hours = parseInt(time / (60 * 60));
                time -= (this.hours * (60 * 60));
                this.minutes = parseInt(time / 60);
                time -= (this.minutes * 60);
                this.seconds = parseInt(time)
            } else if (time > (60 * 60)) {
                this.hours = parseInt(time / (60 * 60));
                time -= (this.hours * (60 * 60));
                this.minutes = parseInt(time / 60);
                time -= (this.minutes * 60);
                this.seconds = parseInt(time)
            } else if (time > 60) {
                this.minutes = parseInt(time / 60);
                time -= (this.minutes * 60);
                this.seconds = parseInt(time)
            }
            break
        }
    }
};

//var log = function(m) {GM.uw.console.log(m)};