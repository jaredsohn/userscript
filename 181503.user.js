// ==UserScript==
// @name       V2EX daily mission
// @namespace  http://uedsky.com/
// @version    0.2.1
// @description  V2EX daily mission
// @updateURL  http://userscripts.org/scripts/source/181503.user.js
// @match      http://www.v2ex.com/
// @noframes
// @copyright  2013, Brook Yang
// ==/UserScript==


(function() {
    function ajax(config, callback) {
        if(typeof config == 'string') {
            config = { url: config, success: callback };
        }
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                config.success(xhr.responseText);
            }
        };
        xhr.open('GET', config.url, true);
        if(config.headers) {
            for(var h in config.headers) {
                xhr.setRequestHeader(h, config.headers[h]);
            }
        }
        xhr.send(null);
    }

    function mission(daily) {
        daily.href = '/balance';
        daily.innerHTML = '正在领取今日奖励...';
        ajax('/mission/daily', function(html) {
            var mat = html.match(/onclick="location.href = '(\/mission\/daily\/redeem\?[^']*)';"/);
            if(mat) {
                ajax({
                    url: mat[1],
                    success:function(html2) {
                        var days = html2.match(/已连续登录 (\d+) 天/)[1];
                        ajax('/balance', function(html3) {
                            var today = html3.match(/每日登录奖励 (\d+ 铜币)/)[1];
                            daily.innerHTML = '已连续领取 ' + days + ' 天，今天领到' + today;
                        });
                    },
                    headers: {Referer: "http://www.v2ex.com/mission/daily"}
                });
            }
        });
    }

    var daily = document.querySelector('.icon-gift ~ a');
    daily && mission(daily);
})();
