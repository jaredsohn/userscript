// ==UserScript==
// @name        armySchedule
// @namespace   ir.kingsera.s14
// @include     http://s14.kingsera.ir/buildings.php?*name=army_camp*
// @grant GM_getValue
// @grant GM_setValue
// @grant unsafeWindow
// @version     1.2.2
// ==/UserScript==

//this is to make it easier to edit this code under an IDE with no notion of GreaseMonkey's workings
if (!unsafeWindow) unsafeWindow = {};
if (!GM_setValue) GM_setValue = function (name, value) {};
if (!GM_getValue) GM_getValue = function (name, defaultValue) {};

/**
 * This function will load the indicated jQuery version from the jQuery official website CDN.
 * Note that after calling this method, the callback will see the indicated jQuery version and instance, while
 * the rest of the page and application will not. This is achieved by faking the loading environment to be
 * a Node environment, in which the jQuery module won't be overriding the existing version globally, and
 * rather informs the module loader that it has finished loading.
 *
 * @param version jQuery version
 * @param callback a callback that is executed after jQuery is available. The callback will receive jQuery's
 * core object as its argument
 * @type {Function}
 */
unsafeWindow.loadJQuery = function (version, callback) {
    //we fake the behavior of Node.js module system
    unsafeWindow.module = {
        exports: null
    };
    //we create a Script element and add that to the <head>
    var url = "http://code.jquery.com/jquery-" + version + ".min.js";
    var jQuery = document.createElement("script");
    jQuery.setAttribute("language", "JavaScript");
    jQuery.setAttribute("src", url);
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(jQuery);
    console.log("Fetching jQuery from " + url);
    //we wait until jQuery exports itself unto the fake Node.js module loader
    var interval = setInterval(function () {
        console.log("Waiting for jQuery-" + version);
        if (unsafeWindow.module.exports !== null) {
            console.log("jQuery-" + version + " was loaded.");
            clearInterval(interval);
            callback.call(undefined, unsafeWindow.module.exports);
        }
    }, 300);
};

/**
 * This is a circumventing measure to set preferences through GreaseMonkey while not alerting the GreaseMonkey security
 * unnecessarily inside callbacks
 * @param name the name of the property
 * @param value the value for this property
 * @type {Function}
 */
unsafeWindow.setValue = function (name, value) {
    //we will schedule a value change outside the scope of the current caller
    setTimeout(function () {
        GM_setValue(name, value);
    }, 0);
};

/**
 * This is a function that securely reads preference values and passes them to the callback
 * @param names
 * @param callback
 * @type {Function}
 */
unsafeWindow.getValue = function (names, callback) {
    if (!names.push) {
        if (!names.substring) {
            throw "Variable names must be passed as either a String or an Array";
        }
        names = names.split(",");
    }
    setTimeout(function () {
        var values = [];
        var obj = {};
        for (var i = 0; i < names.length; i++) {
            obj[names[i]] = GM_getValue(names[i], null);
            values[i] = GM_getValue(names[i], null);
        }
        callback.apply(obj, values);
    }, 0);
};

/**
 * This function will call one of the two given callbacks according to the value of the indicated property
 * @param name
 * @param ifTrue
 * @param ifFalse
 */
unsafeWindow.caseValue = function (name, ifTrue, ifFalse) {
    getValue(name, function (value) {
        if (value) {
            ifTrue(value);
        } else if (ifFalse) {
            ifFalse(value);
        }
    });
};

/**
 * This method will run the callback while passing the given jQuery version as its argument. It will avoid using
 * bandwidth if said version of jQuery has already been loaded.
 * @param version jQuery version. null means any version.
 * @param callback
 * @type {Function}
 */
unsafeWindow.withJQuery = function (version, callback) {
    var j = null;
    if (typeof(jQuery) != "undefined") {
        j = jQuery;
    } else if (typeof(unsafeWindow.jQuery) != "undefined") {
        j = unsafeWindow.jQuery;
    }
//    console.log("jQuery: " + (j && j.fn ? j.fn.jquery : "N/A"));
    if (j && j.fn && j.fn.jquery && (version === null || j.fn.jquery == version)) {
        callback.call(undefined, j);
    } else {
        console.log("jQuery-" + version + " not found.");
        loadJQuery(version, function (jQuery) {
            callback.call(undefined, jQuery);
        });
    }
};

/**
 * This is the factory that will generate date-time instances.
 * @type {{months: Array, get: Function}}
 */
unsafeWindow.time = {
    /**
     * This is the lengths of the months in the year. Current setup is for normal Jalali year.
     */
    months: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
    /**
     * This is a factory method that returns an instance of date-time
     * @param text the text representing the date-time
     * @param pattern the pattern for discerning the date
     * @param mapping the mapping for date and time. An array of length 6 that lists the indexes expected from
     *  the regular expression's execution
     * @returns {{year: *, month: *, day: *, hour: *, minute: *, second: *, isDate: Function, date: Function, time: Function, toString: Function, equals: Function, isBefore: Function, isAfter: Function, jump: Function}}
     */
    get: function (text, pattern, mapping) {
        if (!pattern) {
            pattern = /(\d{2,4})\-(\d{1,2})\-(\d{1,2})\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?/;
        }
        if (!pattern.exec) {
            throw "Exepcted regular expression but got " + pattern;
        }
        if (!mapping) {
            mapping = [1, 2, 3, 4, 5, 6];
        }
        if (!mapping.push || mapping.length != 6) {
            throw "Mappings must be arrays of length 6";
        }
        var data = pattern.exec(text);
        var getInt = function (exp, def) {
            exp = parseInt(exp);
            if (exp == NaN || (!exp && exp !== 0)) {
                return def;
            }
            return exp;
        };
        return {
            year: getInt(data[mapping[0]], 1),
            month: getInt(data[mapping[1]], 1),
            day: getInt(data[mapping[2]], 1),
            hour: getInt(data[mapping[3]], 0),
            minute: getInt(data[mapping[4]], 0),
            second: getInt(data[mapping[5]], 0),
            /**
             * Rudimentary function for type detection
             * @returns {boolean}
             */
            isDate: function () {
                return true;
            },
            /**
             * Returns the string representing the date
             * @returns {string}
             */
            date: function () {
                return [this.year, this.month, + this.day].join("-");
            },
            /**
             * Returns the string representing the time
             * @returns {string}
             */
            time: function () {
                return [this.hour >= 10 ? this.hour : "0" + this.hour, this.minute >= 10 ? this.minute : "0" + this.minute, this.second >= 10 ? this.second : "0" + this.second].join(":");
            },
            /**
             * Returns the string representing the complete object. This is expected to be pipe-able to "get"
             * @returns {string}
             */
            toString: function () {
                return [this.date(), this.time()].join(" ");
            },
            /**
             * Equality tester
             * @param date
             * @returns {boolean}
             */
            equals: function (date) {
                return date !== null && date.isDate && date.isDate() && date.year == this.year
                    && date.month == this.month && date.day == this.day && date.hour == this.hour
                    && date.minute == this.minute && date.second == this.second;
            },
            /**
             * True if this date is before the given date
             * @param date
             * @returns {boolean}
             */
            isBefore: function (date) {
                if (date === null || !date.isDate || !date.isDate()) {
                    return false;
                }
                if (date.year > this.year) {
                    return true;
                }
                if (date.year < this.year) {
                    return false;
                }
                if (date.month > this.month) {
                    return true;
                }
                if (date.month < this.month) {
                    return false;
                }
                if (date.day > this.day) {
                    return true;
                }
                if (date.day < this.day) {
                    return false;
                }
                if (date.hour > this.hour) {
                    return true;
                }
                if (date.hour < this.hour) {
                    return false;
                }
                if (date.minute > this.minute) {
                    return true;
                }
                if (date.minute < this.minute) {
                    return false;
                }
                if (date.second > this.second) {
                    return true;
                }
                if (date.second < this.second) {
                    return false;
                }
                return false;
            },
            /**
             * True if this date is after the indicated date
             * @param date
             * @returns {boolean}
             */
            isAfter: function (date) {
                if (date === null || !date.isDate || !date.isDate()) {
                    return false;
                }
                return !this.equals(date) && !this.isBefore(date);
            },
            /**
             * Will jump forward in time by the given interval in minutes
             * @param interval
             */
            jump: function (interval) {
                this.minute += interval % 60;
                this.hour += Math.floor(interval / 60);
                if (this.minute > 59) {
                    this.minute -= 60;
                    this.hour ++;
                }
                if (this.hour > 23) {
                    this.hour -= 24;
                    this.day ++;
                }
                //92-6-32 0:10 +50
                var monthLength = unsafeWindow.time.months[this.month - 1];
                if (this.day > monthLength) {
                    this.day -= monthLength;
                    this.month ++;
                }
                if (this.month > 12) {
                    this.month -= 12;
                    this.year ++;
                }
                return this;
            }
        };
    }
};

//Exporting functions as local scope variable so that they are available throughout the rest of the script
var loadJQuery = unsafeWindow.loadJQuery;
var getValue = unsafeWindow.getValue;
var caseValue = unsafeWindow.caseValue;
var setValue = unsafeWindow.setValue;
var withJQuery = unsafeWindow.withJQuery;
var time = unsafeWindow.time;

withJQuery(null, function ($) {
    caseValue("autoScheduled", function () {
        $("form#send_army div.send_army .table_armys input[type=text]").each(function () {
            var element = this;
            getValue("army-" + this.name, function (value) {
                element.value = value;
            }, 0);
        });
        //attacks were scheduled on some target
        getValue("count,map_x,map_y,next,interval", function (count, x, y, next, interval) {
            if (count <= 0) {
                setValue("autoScheduled", false);
                console.log("No more attacks for @[" + x +"," + y + "]");
                window.location.reload();
                return;
            }
            var current = time.get(next);
            console.log("[#" + count + "] Scheduling attack on @[" + x + "," + y + "] for " + next);
            $("#map_x").val(x);
            $("#map_y").val(y);
            $("#time_delay input[name=year]").val(current.year);
            $("#time_delay input[name=month]").val(current.month);
            $("#time_delay input[name=day]").val(current.day);
            $("#time_delay input[name=hour]").val(current.hour);
            $("#time_delay input[name=minute]").val(current.minute);
            $(".campaign_types input[name=sendType][value=raid]").get(0).checked = true;
            $("#time_send_div input[name=time_send][value=select_time]").click();
            $("#send_army").submit();
            setValue("count", count - 1);
            setValue("next", current.jump(interval).toString());
            var loop = setInterval(function () {
                if ($(".confirm input").length == 2) {
                    clearInterval(loop);
                    $($(".confirm input").get(0)).click();
                }
            }, 1000);
        });
    }, function () {
        unsafeWindow.autoSchedule = function () {
            var names = [];
            var total = 0;
            $("form#send_army div.send_army .table_armys input[type=text]").each(function () {
                names.push(this.name);
                if (this.value === null || this.value == "" || !parseInt(this.value)) {
                    this.value = 0;
                }
                total += parseInt(this.value);
                var name = this.name;
                var value = this.value;
                setValue("army-" + name, value);
            });
            if (total == 0) {
                alert("No troops selected for scheduling");
                return;
            }
            var x = parseInt($("#map_x").val());
            var y = parseInt($("#map_y").val());
            if ((!x || !y) && (x !== 0 && y !== 0)) {
                alert("No destination selected");
                return;
            }
            var designatedTime = time.get($("#server_time").html(), /(\d+):(\d+):(\d+) (\d+)\/(\d+)\/(\d+)/, [4, 5, 6, 1, 2, 3]);
            designatedTime = prompt("Start attacking from:", designatedTime.toString());
            if (!designatedTime) {
                return;
            }
            var interval = prompt("Enter attacking interval in minutes", 15);
            if (!interval) {
                return;
            }
            var count = prompt("How many attacks should be scheduled?", 10);
            if (!count) {
                return;
            }
            setValue("map_x", x);
            setValue("map_y", y);
            setValue("next", designatedTime);
            setValue("interval", interval);
            setValue("count", count);
            setValue("autoScheduled", true);
            console.log("Scheduling first attack for: " + designatedTime);
            window.location.reload();
        };
        $($(".botton_send_troops").get(0).parentNode).attr("width", "*");
        $(".botton_send_troops input").after("<input type='button' class='button' id='auto-scheduler' onclick='autoSchedule();' value='Schedule'/>");
    });
});
