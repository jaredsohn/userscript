// ==UserScript==
// @name           4watch
// @namespace      c355b9a1f72c6c23efc026e10810b0be
// @description    Spam blocker and report queuer for 4chan.  Reports spam to both 4chan and to the 4watch database, and hides posts and threads others have reported.
// @include        http://boards.4chan.org/*
// @include        https://boards.4chan.org/*
// ==/UserScript==

// Thanks to Couchy for some needed fixes

(function() {

var VERSION = 26;
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var DOCUMENT_POSITION_CONTAINS = 0x08;
var DOCUMENT_POSITION_CONTAINED_BY = 0x10;
var CACHE_SIZE = 1000;
var SERVER_ROOT = "http://4watch.org/"
var REPORT_DELAY = 10000;
var REPORT_WAIT = 30000;
var MSG_DELAY = 5000;
var BLUR_DELAY = 1000;
var UPDATE_DELAY = 60000;
var CAPTCHA_EXPIRE = 300000;
var R_URL = 0;
var R_BOARD = 1;
var R_POST = 2;
var R_TYPE = 3;
var R_TIME = 4;
var TYPES = ["phide", "OK", "bad", "vio", "spam", "illegal"];
var TYPE = {
    "phide":   {code: null, color: "gray",    report: false},
    "OK":      {code: 0,    color: "green",   report: false},
    "bad":     {code: 5,    color: "blue",    report: false},
    "vio":     {code: 2,    color: "red",     report: true},
    "spam":    {code: 3,    color: "fuchsia", report: true},
    "illegal": {code: 4,    color: "brown",   report: true}
};
var TYPE_SWITCHES = '[\u202F'
    + '#phide#gray#title="Hide for self only"#x#\u202F'
    + '|\u202F'
    + '#OK#green#title="Normal post"#O#\u202F'
    + '|\u202F'
    + '#bad#blue#title="Bad post, but doesn\'t break any rules"#\u25BC#\u202F'
    + '#vio#red#title="Rule violation"#R#\u202F'
    + '#spam#fuchsia#title="Spam/advertising/flooding"#S#\u202F'
    + '#illegal#brown#title="Illegal content"#C#\u202F'
    + ']';
var DEFAULT_HIDE_TYPES = ["phide", "vio", "spam", "illegal"];
var PUBLIC_KEY = "6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc";
var SHOW_REPORTS = 0;
var HIDE_REPORTS = 1;
var NO_REPORTS = 2;

function has(a, b) {
    return a.indexOf(b) != -1;
}

function $(id) {
    return document.getElementById(id);
}

if (Function.prototype.bind === undefined) Function.prototype.bind = function(thisArg) {
    var Target = this;
    var boundArgs = arguments;
    return function F() {
        var args = [];
        for (var i = 1; i < boundArgs.length; i++) args.push(boundArgs[i]);
        for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);
        return Target.apply(thisArg, args);
    }
}

if (Object.create === undefined) Object.create = function(O) {
    function F() {}
    F.prototype = O;
    return new F();
}

if (typeof(GM_getValue) == "undefined" || (GM_getValue.toString !== undefined && has(GM_getValue.toString(), "not supported"))) GM_getValue = function(key, def) {
    var val = localStorage.getItem(key);
    if (val == null) {
        return def;
    } else {
        try {
            return JSON.parse(val);
        } catch(e) {
            return def;
        }
    }
}

if (typeof(GM_setValue) == "undefined" || (GM_setValue.toString !== undefined && has(GM_setValue.toString(), "not supported"))) GM_setValue = function(key, val) {
    return localStorage.setItem(key, JSON.stringify(val));
}

var namespace = "c355b9a1f72c6c23efc026e10810b0be";

function window_eval(code) {
    if (window_eval.n === undefined) window_eval.n = 0;
    var id = namespace + "window_eval" + window_eval.n;
    window_eval.n++;
    var script = document.createElement("script");
    script.id = id;
    script.innerHTML = code + ';document.body.removeChild(document.getElementById("' + id + '"))';
    document.body.appendChild(script);
}

window_eval('\
   function userscript_callback(id) {\
        return function(data) {\
            if (userscript_callback.argn === undefined) userscript_callback.argn = 1;\
            var detail = 0;\
            if (data != null) {\
                detail = userscript_callback.argn;\
                var key = "' + namespace + '" + "callback_arg" + userscript_callback.argn;\
                userscript_callback.argn++;\
                sessionStorage.setItem(key, JSON.stringify(data));\
            }\
            var e = document.createEvent("UIEvents");\
            e.initUIEvent(id, false, false, window, detail);\
            document.body.dispatchEvent(e);\
        }\
    }\
');

function reg_callback(name, f, persist) {
    if (reg_callback.n === undefined) reg_callback.n = 0;
    var id = namespace + "callback_f" + reg_callback.n;
    reg_callback.n++;
    function listener(e) {
        var data = null;
        if (e.detail != 0) {
            var key = namespace + "callback_arg" + e.detail;
            data = JSON.parse(sessionStorage.getItem(key));
            sessionStorage.removeItem(key);
        }
        setTimeout(function() {
            f(data);
        }, 0);
        if (!persist) document.body.removeEventListener(id, listener, false);
    }
    document.body.addEventListener(id, listener, false);
    window_eval(name + ' = userscript_callback("' + id + '")');
}

function try_GM_xmlhttpRequest(details) {
    if (try_GM_xmlhttpRequest.fails === undefined) {
        var onload = details.onload;
        var onerror = details.onerror;
        details.onload = function(response) {
            onload(response);
            try_GM_xmlhttpRequest.fails = false;
        }
        details.onerror = function() {
            onerror();
            try_GM_xmlhttpRequest.fails = true;
        }
    }
    if (try_GM_xmlhttpRequest.fails) {
        details.onerror();
    } else {
        try {
            GM_xmlhttpRequest(details);
        } catch(e) {
            details.onerror();
        }
    }
}

function load_data(url, handler) {
    if (has(url, "?")) {
        url += "&t=" + new Date().getTime();
    } else {
        url += "?t=" + new Date().getTime();
    }
    try_GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response) {
            var m = response.responseText.match(/data_loaded\((.*)\)/);
            if (m) handler(JSON.parse(m[1]));
        },
        onerror: function() {
            reg_callback("data_loaded", handler);
            var new_script = document.createElement("script");
            new_script.src = url;
            document.body.appendChild(new_script);
        }
    });
}

var board = location.pathname.split("/")[1];
var posts = {};
var in_index = (location.href.replace(/\/+/g, "/").split("/").length == 4);
var page_thread = (location.pathname.match(/\/res\/(\d+)/) || [null, null])[1];
var hide_posts, hide_types, reports_mode, autorefresh, controls_position, message;
var mouse_down = false;
var window_id = GM_getValue("top_window_id", 0) + 1;
GM_setValue("top_window_id", window_id);

function encode(fields) {
    var eqs = [];
    for (var f in fields) {
        var enc = encodeURIComponent(fields[f]).replace(/%20/g, "+");
        eqs.push(f + "=" + enc);
    }
    return eqs.join("&");
}

var switch_setters = {};
window_eval('function fw_click(x, e) {\
    e2 = {};\
    for(i in e) if(typeof(e[i]) != "object") e2[i] = e[i];\
    fw_set([x.previousSibling.name, x.previousSibling.value, e2])};\
');
reg_callback("fw_set", function(x) {
    switch_setters[x[0]](x[1], x[2]);
}, true);
function mk_switch(name, value, color, attr, txt) {
    return '<input type="checkbox" name="' + name + '" value="' + value + '">'
        + '<span onclick="fw_click(this,event)" style="color:' + color + '"><span ' + attr + '>' + txt + '</span></span>';
}
function mk_switches(name, options) {
    return options.replace(/#(.*?)#(.*?)#(.*?)#(.*?)#/g, function(m,w,x,y,z) {return mk_switch(name,w,x,y,z)});
}
function set_switch(name, values) {
    var switches = document.getElementsByName(name);
    for (var i = 0; i < switches.length; i++) {
        if (has(values, switches[i].value)) {
            switches[i].setAttribute("checked", "checked");
        } else {
            switches[i].removeAttribute("checked");
        }
    }
}

function Queue(name) {
    var this_queue = this;

    this.get = function() {
        var raw_queue = GM_getValue(name, "");
        if (raw_queue == "") {
            return [];
        } else {
            return raw_queue.split("\n");
        }
    }

    this.set = function(arr) {
        GM_setValue(name, arr.join("\n"));
    }

    this.pop = function() {
        var arr = this_queue.get();
        var x = arr.splice(0, 1)[0];
        this_queue.set(arr);
        return x;
    }

    this.requeue = function(entry) {
        var arr = this_queue.get();
        arr.splice(0, 0, entry);
        this_queue.set(arr);
    }

    this.push = function(entry) {
        var arr = this_queue.get();
        arr.push(entry);
        this_queue.set(arr);
    }

    this.size = function() {
        return this_queue.get().length;
    }
}
var report_queue = new Queue("report_queue");
var captcha_queue = new Queue("captcha_queue");

function Post(num, pc) {
    this.num = num;
    this.thread = pc.parentNode.id.match(/\d+/)[0];
    this.op = (this.num == this.thread);
    this.hidden = false;
    this.type = null;
    this.refresh_type();
    this.refresh_hidden();
}

Post.prototype.refresh_hidden = function() {
    var hidden = (hide_posts && has(hide_types, this.type) && (!this.op || in_index));
    if (this.hidden == hidden) return;
    this.hidden = hidden;
    if (this.op) {
        var node = $("t" + this.num);
        node.style.display = hidden ? "none" : "";
        node = node.nextSibling;
        while (node != null && node.nodeType != ELEMENT_NODE) node = node.nextSibling;
        if (node != null && node.tagName == "HR") node.style.display = hidden ? "none" : "";
    } else {
        $("pc" + this.num).style.display = hidden ? "none" : "";
    }
}

Post.prototype.set_type = function(type) {
    if (type == this.type) return;
    var cache = get_cache();
    for (var i = 0; i < TYPES.length; i++) if (TYPES[i] != "OK") {
        var n = cache[TYPES[i]].indexOf(this.num);
        if (n != -1) cache[TYPES[i]].splice(n, 1);
        if (type == TYPES[i]) cache[TYPES[i]].push(this.num);
        if (cache[TYPES[i]].length > 2 * CACHE_SIZE) cache[TYPES[i]].splice(0, CACHE_SIZE);
        GM_setValue(TYPES[i] + "_cache_" + board, cache[TYPES[i]].join(" "));
    }
    this.type = type;
    set_switch("fw_post" + this.num, [type]);
    this.refresh_hidden();
    refresh_spam_count();
}

Post.prototype.refresh_type = function() {
    var type = "OK";
    var cache = get_cache();
    for (var i = 0; i < TYPES.length; i++) if (TYPES[i] != "OK") {
        if (has(cache[TYPES[i]], this.num)) {
            type = TYPES[i];
            break;
        }
    }
    if (type == this.type) return;
    this.type = type;
    set_switch("fw_post" + this.num, [type]);
}

Post.prototype.queue_report = function() {
    cancel_report(board, this.num);
    var report_url = document.getElementsByName("delform")[0].action + "?mode=report&no=" + this.num;
    report_queue.push(report_url + "\t" + board + "\t" + this.num + "\t" + this.type + "\t" + new Date().getTime());
    refresh_reports();
    if (report_queue.size() > captcha_queue.size()) {
        add_captcha();
    } else {
        wait_to_report();
    }
}

Post.prototype.flag = function(type, flag_e, captcha_data) {
    var this_post = this;
    var data = {
        board: board,
        post: this.num,
        spam: TYPE[type].code,
        thread: this.thread,
        version: VERSION
    };
    data = encode(data);
    if (captcha_data) {
        data += "&" + captcha_data;
    }
    load_data(
        SERVER_ROOT + "flag.py?" + data,
        function(response) {
            if (response == "OK") {
                if (TYPE[this_post.type].report && reports_mode != NO_REPORTS && !flag_e.ctrlKey) this_post.queue_report();
            } else {
                this_post.show_captcha(response, type, flag_e);
            }
        }
    );
}

Post.prototype.show_captcha = function(html, type, flag_e) {
    var this_post = this;
    var old_cancel = $("captcha_cancel");
    if (old_cancel) {
        var e = document.createEvent("MouseEvent");
        e.initEvent("click", true, true);
        old_cancel.dispatchEvent(e);
    }
    setTimeout(function() {
        var captcha = document.createElement("span");
        captcha.innerHTML = html;
        captcha.id = "captcha_popup";

        captcha.style.position = "absolute";
        captcha.style.backgroundColor = "white";
        captcha.style.border = "1px solid black";
        function captcha_pos() {
            var max_left = document.body.offsetWidth - captcha.offsetWidth;
            captcha.style.left = Math.min(flag_e.pageX, max_left) + "px";
            captcha.style.top = flag_e.pageY + "px";
        }
        captcha_pos();
        captcha.addEventListener("DOMNodeInserted", captcha_pos, false);

        document.body.appendChild(captcha);

        if ($("captcha_cancel") == null) {
            captcha.innerHTML += '<center><input id="captcha_cancel" type="button" value="Cancel"></center>';
        }
        $("captcha_cancel").addEventListener("click", function(e) {
            setTimeout(function() {
                document.body.removeChild($("captcha_popup"));
            }, 0);
        }, false);

        var captcha_form = $("captcha_form");
        if (captcha_form) {
            $("captcha_form").addEventListener("submit", function(e) {
                setTimeout(function() {
                    var captcha_data = $("captcha_data");
                    if (captcha_data) {
                        this_post.flag(type, flag_e, captcha_data.value);
                        document.body.removeChild($("captcha_popup"));
                    }
                }, 0);
            }, false);
        }
    }, 0);
}

Post.prototype.comment = function() {
    var parts = document.evaluate(".//node()[self::text() or self::br]", $("m" + this.num), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var s = "";
    for (var i = 0; i < parts.snapshotLength; i++) {
        if (parts.snapshotItem(i).nodeType == ELEMENT_NODE) {
            s += "\n";
        } else {
            s += parts.snapshotItem(i).textContent;
        }
    }
    return s;
}

// Placement of spam switches is slow, so don't do them all at once
var next_spam_switch_ID = null;
var spam_switch_queue = [];
function next_spam_switch() {
    var t1 = new Date().getTime();
    clearTimeout(next_spam_switch_ID);
    var num = spam_switch_queue.splice(0, 1)[0];
    var info_lines = document.evaluate('.//div[@id="pi' + num + '"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if ($("pc" + num) != null) {
        for (var i = 0; i < info_lines.snapshotLength; i++) {
            var info_line = info_lines.snapshotItem(i);
            if (info_line.getElementsByClassName("fwatch").length == 0) {
                var qlinks = document.evaluate('.//a[@title="Quote this post"]', info_line, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
                if (qlinks != null) {
                    // Generate spam switch
                    var name = "fw_post" + num;
                    var element = document.createElement("span");
                    element.setAttribute("class", "fwatch");
                    element.innerHTML = mk_switches(name, "&nbsp; " + TYPE_SWITCHES);
                    switch_setters[name] = function(new_type, e) {
                        if (!TYPE[new_type].report) {
                            cancel_report(board, num);
                        }
                        posts[num].set_type(new_type);
                        if (new_type != "phide") {
                            posts[num].flag(new_type, e);
                        }
                    }
                    var qlink = qlinks.snapshotItem(qlinks.snapshotLength - 1);
                    qlink.parentNode.insertBefore(element, qlink.nextSibling);
                    set_switch(name, [posts[num].type]);
                }
            }
        }
    }
    if (spam_switch_queue.length > 0) {
        var t2 = new Date().getTime();
        next_spam_switch_ID = setTimeout(next_spam_switch, t2-t1+1);
    } else {
        next_spam_switch_ID = null;
    }
}

function refresh_spam_count() {
    var thread_count = 0;
    var reply_count = 0;
    for (var num in posts) {
        if (has(hide_types, posts[num].type)) {
            if (posts[num].op) {
                thread_count++;
            } else {
                reply_count++;
            }
        }
    }
    $("fw_spam_count").innerHTML = " " + thread_count + ", " + reply_count;
    $("fw_spam_count").title = thread_count + (thread_count == 1 ? " thread, " : " threads, ") + reply_count + (reply_count == 1 ? " reply" : " replies");
}

function wait_to_report(next_report) {
    if (GM_getValue("current_window", -1) != window_id) return;

    var time = new Date().getTime();
    if (next_report === undefined) {
        next_report = parseInt(GM_getValue("next_report", time + ""));
    } else {
        GM_setValue("next_report", next_report + "");
    }
    if (next_report > time + REPORT_WAIT) {
        next_report = time + REPORT_WAIT;
        GM_setValue("next_report", next_report + "");
    }

    if (!(wait_to_report.timeoutID === undefined)) clearTimeout(wait_to_report.timeoutID);
    if (next_report > time) {
        wait_to_report.timeoutID = setTimeout(function() {wait_to_report();}, next_report - time);
        return;
    } else {
        wait_to_report.timeoutID = setTimeout(function() {wait_to_report();}, REPORT_WAIT);
    }

    if (reports_mode == NO_REPORTS) return;
    if (report_queue.size() == 0) return;
    if (captcha_queue.size() == 0) return;

    var delay_until = parseInt(report_queue.get()[0].split("\t")[R_TIME]) + REPORT_DELAY;
    if (delay_until > time) {
        wait_to_report(delay_until);
        return;
    }

    var entry = report_queue.pop().split("\t");
    var captcha = captcha_queue.pop();
    refresh_reports();

    report(entry[0], entry[1], entry[2], entry[3], captcha);
}

function report_fields(r_url, r_board, r_post, r_type, captcha) {
    var time = new Date().getTime();
    var captcha_fields = captcha.split(" ");
    if (!(parseInt(captcha_fields[2]) > time - CAPTCHA_EXPIRE)) {
        // CAPTCHA too old
        report_queue.requeue(r_url + "\t" + r_board + "\t" + r_post + "\t" + r_type + "\t" + time);
        refresh_reports();
        wait_to_report(time);
        return;
    }
    return {
        cat: r_type,
        recaptcha_challenge_field: unescape(captcha_fields[0]),
        recaptcha_response_field: unescape(captcha_fields[1]),
        board: r_board,
        no: r_post
    };
}

function report(r_url, r_board, r_post, r_type, captcha) {
    try_GM_xmlhttpRequest({
        method: "GET",
        url: r_url,
        onload: function(response) {
            var t = response.responseText;
            if (has(t, "You are reporting post")) {
                // Report window OK, submit report
                var fields = report_fields(r_url, r_board, r_post, r_type, captcha);
                GM_xmlhttpRequest({
                    method: "POST",
                    url: r_url,
                    headers: {"Content-type": "application/x-www-form-urlencoded"},
                    data: encode(fields),
                    onload: function(response2) {
                        // Response from submitting report
                        var t2 = response2.responseText;
                        var time2 = new Date().getTime();
                        show_msg(t2, r_board, r_post);
                        if (has(t2, "mistyped the verification")) {
                            report_queue.requeue(r_url + "\t" + r_board + "\t" + r_post + "\t" + r_type + "\t" + time2);
                            refresh_reports();
                            wait_to_report(time2);
                        } else if (has(t, "You have to wait a while") || has(t, "You've already reported enough posts")) {
                            report_queue.requeue(r_url + "\t" + r_board + "\t" + r_post + "\t" + r_type + "\t" + time2);
                            refresh_reports();
                            wait_to_report(time2 + REPORT_WAIT);
                        } else {
                            wait_to_report(time2 + REPORT_WAIT);
                        }
                    }
                });
            } else {
                // Error message when opening report window (haven't submitted yet)
                var time = new Date().getTime();
                show_msg(t, r_board, r_post);
                captcha_queue.requeue(captcha);
                if (has(t, "You have already reported this post") || has(t, "That post doesn't exist anymore.")) {
                    wait_to_report(time);
                } else if (has(t, "You have to wait a while") || has(t, "You've already reported enough posts")) {
                    report_queue.requeue(r_url + "\t" + r_board + "\t" + r_post + "\t" + r_type + "\t" + time);
                    wait_to_report(time + REPORT_WAIT);
                }
                refresh_reports();
            }
        },
        onerror: function() {
            var frame = document.createElement("iframe");
            frame.style.display = "none";
            frame.src = 'javascript:\'<form id=report action="' + r_url + '" method=POST>';
            var fields = report_fields(r_url, r_board, r_post, r_type, captcha);
            for (var name in fields) {
                frame.src += '<input name="' + html_escape(name) + '" value="' + html_escape(fields[name]) + '">';
            }
            frame.src += '</form><script>setTimeout(function(){document.getElementById("report").submit()}, 0)</script>\'';
            document.body.appendChild(frame);
        }
    });
}

function html_escape(s) {
    s2 = "";
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (has(" 0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", c)) {
            s2 += c;
        } else {
            s2 += "&#" + s.charCodeAt(i) + ";";
        }
    }
    return s2;
}

function show_msg(msg, board, post) {
    var msg2 = msg.match(/<h3>.*?<\/h3>/);
    if (!msg2) return;
    msg2 = msg2[0].replace(/<.*?>/g, "");
    var msg_line = document.createElement("div");
    msg_line.style.width = "160pt";
    msg_line.innerHTML = '/' + board + '/' + post + ': <span style="color: red;">' + msg2 + '</span><br>';
    $("fw_msg_div").appendChild(msg_line);
    setTimeout(function() {
        if (msg_line.parentNode) msg_line.parentNode.removeChild(msg_line);
    }, MSG_DELAY);
}

function cancel_report(r_board, r_post) {
    var queue = report_queue.get();
    for (var i = 0; i < queue.length; i++) {
        var entry = queue[i].split("\t");
        if (entry[R_BOARD] == r_board && entry[R_POST] == r_post) {
            queue.splice(i, 1);
            i--;
        }
    }
    report_queue.set(queue);
    refresh_reports();
}

function refresh_reports() {
    while (captcha_queue.size() > 0) {
        var captcha_time = parseInt(captcha_queue.get()[0].split(" ")[2]);
        if (captcha_time > new Date().getTime() - CAPTCHA_EXPIRE) {
            break;
        } else {
            captcha_queue.pop();
        }
    }

    $("fw_num_captchas").innerHTML = captcha_queue.size();
    if (reports_mode == SHOW_REPORTS) {
        $("fw_msg_div").style.display = "block";
        $("fw_reporting_div1").style.display = "block";
        $("fw_reporting_div2").style.display = "block";
    } else if (reports_mode == HIDE_REPORTS) {
        $("fw_msg_div").style.display = "none";
        $("fw_reporting_div1").style.display = "none";
        $("fw_reporting_div2").style.display = "none";
    } else {
        $("fw_msg_div").style.display = "none";
        $("fw_reporting_div1").style.display = "none";
        $("fw_need_div").style.display = "none";
        $("fw_reporting_div2").style.display = "none";
    }
    var needed = report_queue.size() - captcha_queue.size();
    if (needed > 0 && (reports_mode == SHOW_REPORTS || reports_mode == HIDE_REPORTS)) {
        $("fw_need_div").style.display = "block";
        $("fw_need_span").innerHTML = needed;
    } else {
        $("fw_need_div").style.display = "none";
    }

    if (reports_mode == HIDE_REPORTS) return;
    var queue = report_queue.get();
    var ncaptchas = captcha_queue.size();
    if (queue.join("\n") == refresh_reports.queue_cache && ncaptchas == refresh_reports.captcha_cache) return;

    var reporting_div = [$("fw_reporting_div1"), $("fw_reporting_div2")];
    var rdih = ["", ""];
    for (var i = 0; i < queue.length; i++) {
        var entry = queue[i].split("\t");
        if (i < ncaptchas) {
            rdih[0] += '<span style="color: ' + TYPE[entry[R_TYPE]].color + '">[<a href=javascript:void(0)>x</a>] reporting ' + entry[R_POST] + ' on /' + entry[R_BOARD] + '/...</span><br>';
        } else {
            rdih[1] += '<span style="color: ' + TYPE[entry[R_TYPE]].color + '">[<a href=javascript:void(0)>x</a>] to be reported: ' + entry[R_POST] + ' on /' + entry[R_BOARD] + '/</span><br>';
        }
    }
    reporting_div[0].innerHTML = rdih[0];
    reporting_div[1].innerHTML = rdih[1];

    var links1 = document.evaluate(".//a", reporting_div[0], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var links2 = document.evaluate(".//a", reporting_div[1], null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < queue.length; i++) {
        var entry = queue[i].split("\t");
        var link = (i < ncaptchas) ? links1.snapshotItem(i) : links2.snapshotItem(i - ncaptchas);
        link.addEventListener("click", cancel_report.bind(null, entry[R_BOARD], entry[R_POST]), false);
    }

    refresh_reports.queue_cache = queue.join("\n");
    refresh_reports.captcha_cache = ncaptchas;
}
refresh_reports.queue_cache = "";
refresh_reports.captcha_cache = 0;

var return_captcha_timeoutID = null;
function add_captcha() {
    document.body.removeEventListener("mouseup", return_captcha, true);
    if (return_captcha_timeoutID != null) clearTimeout(return_captcha_timeoutID);
    $("fw_r_captcha_div").style.display = "block";
    reg_callback("setup_captcha", function() {
        window_eval('Recaptcha.focus_response_field()');
        $("recaptcha_response_field").addEventListener("blur", function(e) {
            if (mouse_down) {
                document.body.addEventListener("mouseup", return_captcha, true);
                return_captcha_timeoutID = setTimeout(return_captcha, BLUR_DELAY);
            } else {
                return_captcha();
            }
        }, false);
        $("recaptcha_response_field").addEventListener("keypress", function(e) {
            if (e.keyCode == 13) {
                var challenge = $("recaptcha_challenge_field").value;
                var response = $("recaptcha_response_field").value;
                captcha_queue.push(escape(challenge) + " " + escape(response) + " " + new Date().getTime());
                refresh_reports();
                wait_to_report();
                if (report_queue.size() > captcha_queue.size()) {
                    window_eval('Recaptcha.reload()');
                } else {
                    return_captcha();
                }
            } else if (e.keyCode == 8 && $("recaptcha_response_field").value == "") {
                window_eval('Recaptcha.reload()');
            }
        }, false);
    });
    if ($("recaptcha_area")) $("recaptcha_area").parentNode.removeChild($("recaptcha_area"));
    window_eval('Recaptcha.create("' + PUBLIC_KEY + '", "fw_r_captcha_div", {theme: "clean", callback: setup_captcha})');
}

function return_captcha() {
    document.body.removeEventListener("mouseup", return_captcha, true);
    if (return_captcha_timeoutID != null) clearTimeout(return_captcha_timeoutID);
    $("fw_r_captcha_div").style.display = "none";
    if (showing_captcha() && $("recaptcha_widget_div")) {
        window_eval('Recaptcha.create("' + PUBLIC_KEY + '", "recaptcha_widget_div", {theme: "clean"})');
    }
}

function showing_captcha() {
    return $("recaptcha_response_field") && ($("recaptcha_response_field").compareDocumentPosition($("fw_r_captcha_div")) & DOCUMENT_POSITION_CONTAINS);
}

function refresh_settings() {
    hide_posts = GM_getValue("hide_spam_" + board, false);
    reports_mode = GM_getValue("reports_mode", SHOW_REPORTS);
    hide_types = GM_getValue("hide_types", DEFAULT_HIDE_TYPES.join(" ")).split(" ");
    autorefresh = GM_getValue("autorefresh", false);
    controls_position = GM_getValue("controls_position", "T");
    set_switch("fw_show_hide", [hide_posts + ""]);
    set_switch("fw_hide_reports", [reports_mode + ""]);
    set_switch("fw_hide_types", hide_types);
    set_switch("fw_autorefresh", [autorefresh + ""]);
    set_switch("fw_position", [controls_position]);
}

function get_cache() {
    var cache = {};
    for (var i = 0; i < TYPES.length; i++) if (TYPES[i] != "OK") {
        cache[TYPES[i]] = GM_getValue(TYPES[i] + "_cache_" + board, "").split(" ");
    }
    return cache;
}

function read_posts(root_node) {
    if (root_node.nodeType == ELEMENT_NODE) {
        var new_posts = root_node.getElementsByClassName("postContainer");
        for (var i = 0; i < new_posts.length; i++) {
            var num = new_posts[i].id.match(/\d+/)[0];
            if (!(num in posts)) posts[num] = new Post(num, new_posts[i]);
        }
        var new_switches = root_node.getElementsByClassName("postInfo");
        for (var i = 0; i < new_switches.length; i++) {
            var num = new_switches[i].id.match(/\d+/)[0];
            if (new_switches[i].getElementsByClassName("fwatch").length == 0) spam_switch_queue.push(num);
        }
        if (spam_switch_queue.length != 0 && next_spam_switch_ID == null) next_spam_switch_ID = setTimeout(next_spam_switch, 0);
    }
}

function query_spam() {
    var spam_params = {board: board, version: VERSION};
    if (in_index) {
        var post_list = [];
        for (var num in posts) post_list.push(num);
        if (post_list.length > 0) spam_params.posts = post_list.join(" ");
    } else {
        spam_params.thread = page_thread;
    }
    if ("posts" in spam_params || "thread" in spam_params) {
        load_data(
            SERVER_ROOT + "spam.py?" + encode(spam_params),
            function(response) {
                for (var num in posts) {
                    if (posts[num].type != "phide") {
                        posts[num].set_type(response.spam_list[num] || "OK");
                    }
                }
                if (response.message) {
                    message = response.message;
                    if ($("fw_update_div")) {
                        $("fw_update_div").innerHTML = response.message;
                        $("fw_update_div").style.display = "block";
                    }
                }
            }
        );
    }
}

function position_controls() {
    $("fw_controls").style.top    = has(controls_position, "B") ? "auto" : "35px";
    $("fw_controls").style.bottom = has(controls_position, "T") ? "auto" : "15px";
    $("fw_controls").style.left   = "auto";
    $("fw_controls").style.right  = "15px";
}

if (document.title == "4chan - 404" && page_thread != null) {
    load_data(SERVER_ROOT + "gone.py?" + encode({board: board, thread: page_thread}));
} else if (in_index || page_thread != null) {
    refresh_settings();

    // Add CSS
    var ss = document.createElement("style");
    ss.type = "text/css";
    ss.textContent = '\
        .fwatch input[type="checkbox"] {\
            display: none;\
        }\
        .fwatch input[type="checkbox"] + span > span {\
            color: black;\
        }\
        .fwatch input[type="checkbox"] + span > span:hover {\
            color: inherit;\
        }\
        .fwatch input[type="checkbox"]:checked + span > span {\
            color: inherit;\
            font-weight: bold;\
        }\
        #fw_controls {\
            position: fixed;\
        }\
        #fw_options_div {\
            display: none;\
        }\
        #fw_top:hover > #fw_options_div {\
            display: block;\
        }\
        #settingsBox {\
            z-index: 1;\
        }\
    ';
    document.head.appendChild(ss);

    // Add reCAPTCHA if not present
    window_eval('\
        if (typeof(Recaptcha) == "undefined") {\
            var rs = document.createElement("script");\
            rs.src = "http://api.recaptcha.net/js/recaptcha_ajax.js";\
            document.body.appendChild(rs);\
        }\
    ');

    // Track mouse state
    document.body.addEventListener("mousedown", function(e) {
        mouse_down = true;
    }, true);
    document.body.addEventListener("mouseup", function(e) {
        mouse_down = false;
    }, true);

    // Read posts, query database which posts are spam
    read_posts(document.body);
    query_spam();

    // Handle thread updates
    document.body.addEventListener("DOMNodeInserted", function(e) {
        setTimeout(function() {
            read_posts(e.target);
        }, 0);
    }, false);
    var last_query = new Date().getTime();
    document.body.addEventListener("mousemove", function(e) {
        if (autorefresh && new Date().getTime() > last_query + UPDATE_DELAY) {
            last_query = new Date().getTime();
            query_spam();
        }
    }, false);

    // Create upper right corner controls
    var controls = document.createElement("div");
    controls.id = "fw_controls";
    controls.setAttribute("class", "fwatch");
    controls.innerHTML
        = '<div id="fw_top">'
            + '<div id="fw_top_line" style="text-align: right;">'
                + '<img src="'
                    + 'data:image/gif;base64,R0lGODlhDQARAPECAAAAAMDAwP%2F%2F%2FwAAACH5BAEAAAMALAAAAAANABEAAAIxnBGZYD2oAnM'
                    + 'P2Euf2Hs2wIHdxwnieHalmZqr9b4tG86qqa0hqXvHm7kIgxEJMeIpAAA7'
                + '">'
                + '<span id="fw_spam_count" style="font-style: italic; font-weight: bold;"></span>'
            + '</div>'
            + '<div id="fw_update_div" style="display: none; text-align: center;"></div>'
            + '<div id="fw_options_div" style="text-align: center;">'
                + '<hr>'
                + mk_switches('fw_show_hide', '<div>[#false#green##show# | #true#red##hide#] spam</div>')
                + mk_switches('fw_hide_reports', '<div>[#0#green##show# | #1#red##hide# | #2#black##no#] reports</div>')
                + mk_switches('fw_hide_types', TYPE_SWITCHES)
                + mk_switches('fw_autorefresh', '<div>autorefresh [#true#green##on# | #false#red##off#]</div>')
                + mk_switches('fw_controls_position', '<div>position [#T#black##top# | #B#black##bottom#]</div>')
                + '<div><span id="fw_num_captchas"></span> captchas [<span id="fw_captcha_add"><a>add</a></span>] [<span id="fw_captcha_clear"><a>clear</a></span>]</div>'
                + '<hr>'
            + '</div>'
        + '</div>'
        + '<div id="fw_msg_div"></div>'
        + '<div id="fw_reporting_div1"></div>'
        + '<div id="fw_need_div" style="text-align: center;">'
            + 'need <span id="fw_need_span"></span> captchas [<span id="fw_captcha_add2"><a>add</a></span>]'
        + '</div>'
        + '<div id="fw_r_captcha_div" style="display: none;"></div>'
        + '<div id="fw_reporting_div2"></div>';
    document.body.appendChild(controls);
    position_controls();

    if (message) {
        $("fw_update_div").innerHTML = response.message;
        $("fw_update_div").style.display = "block";
    }

    refresh_spam_count();

    switch_setters["fw_show_hide"] = function(new_value) {
        hide_posts = (new_value == "true");
        GM_setValue("hide_spam_" + board, hide_posts);
        for (var num in posts) posts[num].refresh_hidden();
        set_switch("fw_show_hide", [hide_posts + ""]);
    }
    set_switch("fw_show_hide", [hide_posts + ""]);

    switch_setters["fw_hide_reports"] = function(new_value) {
        var old_value = reports_mode;
        reports_mode = parseInt(new_value);
        if (old_value == NO_REPORTS && new_value != NO_REPORTS) {
            wait_to_report(new Date().getTime() + REPORT_DELAY);
        }
        GM_setValue("reports_mode", reports_mode);
        refresh_reports();
        set_switch("fw_hide_reports", [reports_mode + ""]);
    }
    set_switch("fw_hide_reports", [reports_mode + ""]);

    switch_setters["fw_hide_types"] = function(toggle_value) {
        var n = hide_types.indexOf(toggle_value);
        if (n == -1) {
            hide_types.push(toggle_value);
        } else {
            hide_types.splice(n, 1);
        }
        GM_setValue("hide_types", hide_types.join(" "));
        for (var num in posts) posts[num].refresh_hidden();
        refresh_spam_count();
        set_switch("fw_hide_types", hide_types);
    }
    set_switch("fw_hide_types", hide_types);

    switch_setters["fw_autorefresh"] = function(new_value) {
        autorefresh = (new_value == "true");
        GM_setValue("autorefresh", autorefresh);
        set_switch("fw_autorefresh", [autorefresh + ""]);
    }
    set_switch("fw_autorefresh", [autorefresh + ""]);

    switch_setters["fw_controls_position"] = function(new_value) {
        controls_position = new_value;
        GM_setValue("controls_position", controls_position);
        position_controls();
        set_switch("fw_controls_position", [controls_position]);
    }
    set_switch("fw_controls_position", [controls_position]);

    $("fw_captcha_add").addEventListener("click", add_captcha, false);
    $("fw_captcha_add2").addEventListener("click", add_captcha, false);
    $("fw_captcha_clear").addEventListener("click", function() {
        if (confirm("Are you sure you want to clear all stored CAPTCHAs?")) {
            captcha_queue.set([]);
            refresh_reports();
        }
    }, false);

    refresh_reports();

    // Track window changes
    document.addEventListener("focus", function(e) {
        var prev_window = GM_getValue("current_window", -1);
        if (prev_window == window_id) return;
        GM_setValue("current_window", window_id);
        $("fw_msg_div").innerHTML = "";
        refresh_settings();
        for (var num in posts) {
            posts[num].refresh_type();
            posts[num].refresh_hidden();
        }
        refresh_spam_count();
        refresh_reports();
        wait_to_report();
    }, false);
    GM_setValue("current_window", window_id);

    // Start post reporter
    wait_to_report();
}

})();
