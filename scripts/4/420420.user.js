// ==UserScript==
// @name       极客早知道语音播报JAE
// @namespace  http://blog.jaekj.com
// @version    0.1
// @description  极客早知道语音播报 Make By JAE，交流QQ群:123266961
// @match      http://www.geekpark.net/read/view/*
// @copyright  2014-3-20, JAE
// ==/UserScript==

;((function() {
    var gk = {
        getDate: function() {
            var date = $('#date').text();
            date = date.replace(/\//g, "-");
            return date;
        },
        getPageURL: function() {
            var date = this.getDate();
            var pageURL = "http://www.kaolafm.com/MZ_APP_PROVIDERS/getAddress.do?api_sig=c118df1cd02cdfbe59e0baa2fb56fdef&api_key=b332d72a3bac3661136621a98668a572&dateParameter=" + date;
            return pageURL;
        },
        creatPlayer: function(url) {
            var html = '<audio src="' + url + '" controls="controls" autoplay="autoplay"></audio>'
            $('div.feedback-btn').html(html);
            console.log('极客音频加载成功！Make By JAE，交流QQ群:123266961');
        },
        play: function() {
            var pageURL = this.getPageURL();
            GM_xmlhttpRequest({
                method: "GET",
                url: pageURL,
                headers: {
                    "User-Agent": "Mozilla/5.0",
                    "Cache-Control": "max-age=0",
                    "Origin": "hhttp://www.kaolafm.com",
                    "Referer": pageURL,
                    //"Cookie": document.cookies
                },
                onload: function(response) {
                    if (response.responseText != '-1') {
                        gk.creatPlayer(response.responseText);
                    } else {
                        console.log("极客本期没有音频，Make By JAE，交流QQ群:123266961");
                    }
                }
            });
        }
    }
    gk.play();
})());

