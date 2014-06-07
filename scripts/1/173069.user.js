// ==UserScript==
// @id             cc98_qianglou
// @name           cc98 qianglou
// @version        1.0
// @namespace      soda@cc98.org
// @author         soda <sodazju@gmail.com>
// @description    cc98抢楼脚本
// @include        http://www.cc98.org/*
// @require        http://file.cc98.org/uploadfile/2013/7/7/1444331657.txt
// @run-at         document-end
// ==/UserScript==

// use sessionStorage to keep working during a browser session

$(function() {
    // helper functions

    function getItem (key) {
        return sessionStorage.getItem(key);
    }

    function setItem (key, value) {
        return sessionStorage.setItem(key, value);
    }

    function removeItem (key) {
        sessionStorage.removeItem(key);
    }

    // parse the url get parameters
    function qs(url) {
        url = url.toLowerCase().split("#")[0];
        var t = url.indexOf("?");
        var hash = {};
        if (t > 0) {
            var params = url.substring(t+1).split("&");
        } else {
            var params = url.split("&");
        }
        for (var i = 0; i < params.length; ++i) {
            var val = params[i].split("=");
            hash[decodeURIComponent(val[0])] = decodeURIComponent(val[1]);
        }
        return hash;
    };

    // from https://www.inkling.com/read/javascript-definitive-guide-david-flanagan-6th/chapter-20/parsing-the-document-cookies
    // Return the document's cookies as an object of name/value pairs.
    // Assume that cookie values are encoded with encodeURIComponent().
    function getCookies() {
        var cookies = {};           // The object we will return
        var all = document.cookie;  // Get all cookies in one big string
        if (all === "")             // If the property is the empty string
            return cookies;         // return an empty object
        var list = all.split("; "); // Split into individual name=value pairs
        for(var i = 0; i < list.length; i++) {  // For each cookie
            var cookie = list[i];
            var p = cookie.indexOf("=");        // Find the first = sign
            var name = cookie.substring(0,p);   // Get cookie name
            var value = cookie.substring(p+1);  // Get cookie value
            value = decodeURIComponent(value);  // Decode the value
            cookies[name] = value;              // Store name and value in object
        }
        return cookies;
    }

    // post a reply in cc98
    function post (url, content, expression, subject, callback) {
        var params = qs(url);
        var postAddr = "http://www.cc98.org/SaveReAnnounce.asp?method=fastreply&BoardID=" + params["boardid"];
        var cookies = getCookies()["aspsky"];
        var aspsky = qs(cookies)
        var reply = {
            "Content": content,
            "Expression": expression,
            "Subject": subject || "",
            "followup": params["id"],
            "RootID": params["id"],
            "UserName": aspsky["username"],
            "passwd": aspsky["password"],
            "signflag": "yes",
            "star": params["star"] ||   1
        };
        $.ajax({
            "type": "POST",
            "url": postAddr,
            "data": reply,
            "success": callback,
        })
    }


    // UI
    function view () {
        var editRow = $("#EditArea").parent().parent();
        editRow.before('\n\
            <tr>\n\
                <td class="tablebody1"><b>抢楼选项</b></td>\n\
                <td class="tablebody1">第\
                    <input id="qianglou-target" type="text" style="width: 50px;">\
                    楼；\n\
                    刷新间隔：\
                    <input id="qianglou-interval" type="text" value="1" style="width: 30px;">\
                    秒；\n\
                    <input id="start-qianglou" type="button" value="开始抢楼">\n\
                    <span id="qianglou-msg" style="display: inline-block; padding-left: 5px;"></span>\n\
            ');

        $("#start-qianglou").click(storeOptions);
    }

    // show error messages and status messages
    function showMsg (msg, color) {
        color = color || "red";
        $("#qianglou-msg").text(msg);
        $("#qianglou-msg").css("color", color);
    }

    // checks and stores the options and calls qianglou()
    function storeOptions () {
        // check and store qianglou options in session storage
        var url = window.location.href;

        var content = $("#content").val();
        if (!content) {
            showMsg("内容不能为空！");
            return;
        }

        var expression = $("input[name='Expression']:checked").val();
        var subject = $("input[name='subject']").val() || "";

        var target = $("#qianglou-target").val();
        if (!target || !parseInt(target) || parseInt(target) <= 0) {
            showMsg("目标楼层必须为正整数！");
            return;
        }

        var interval = $("#qianglou-interval").val();
        if (!interval || !parseFloat(interval) || parseFloat(interval) <= 0) {
            showMsg("刷新间隔必须是正整数或正浮点数！");
            return;
        }

        setItem("qianglou", "true");
        setItem("qianglou-url", url);
        setItem("qianglou-content", content);
        setItem("qianglou-expression", expression);
        setItem("qianglou-subject", subject);
        setItem("qianglou-target", target);
        setItem("qianglou-interval", parseFloat(interval) * 1000);

        // clear the textarea
        $("#content").val("");

        // stop the previous routine and start again
        var intervalID = parseInt(getItem("qianglou-intervalid"));
        if (intervalID) {
            clearInterval(intervalID);
        }
        qianglou();
    }

    // starts
    function qianglou () {
        // get the options from sessionStorage
        if (getItem("qianglou")) {
            var intervalID = setInterval(function() {
                $.ajax({
                    type: "GET",
                    dataType: "text",
                    success: function(text) {
                        monitor(text, parseInt(getItem("qianglou-target")), end);
                    }
                });
            }, parseInt(getItem("qianglou-interval")));

            setItem("qianglou-intervalid", intervalID);

            showMsg("目标楼层：" + getItem("qianglou-target") + "；刷新间隔：" +
                parseInt(getItem("qianglou-interval")) / 1000 + "s；正在抢楼……");
        }
    }

    // monitor the current post num
    function monitor (html, target, callback) {
        var re = /<span id="topicPagesNavigation">本主题贴数 <b>(\d+)<\/b>/g;
        var num = parseInt((html.match(re))[0].replace(re, "$1"));
        if (num === target - 1) {
            callback();
        }
    }

    // post and then clear up the sessionStorage and the messages
    function end () {
        var url = getItem("qianglou-url");
        var content = getItem("qianglou-content");
        var expression = getItem("qianglou-expression");
        var subject = getItem("qianglou-subject");
        console.log('here')
        post (url, content, expression, subject, clear);
    }

    function clear () {
        alert("完成抢楼！");

        var intervalID = parseInt(getItem("qianglou-intervalid"));
        clearInterval(intervalID);

        removeItem("qianglou");

        removeItem("qianglou-url");
        removeItem("qianglou-content");
        removeItem("qianglou-expression");
        removeItem("qianglou-subject");

        removeItem("qianglou-target");
        removeItem("qianglou-interval");

        removeItem("qianglou-intervalid");

        showMsg("");

    }

    view();
    qianglou();
})
