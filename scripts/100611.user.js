// ==UserScript==
// @name           ParamCleaner
// @description    URL から不要なパラメーターを削除し、history.replaceStateでURLを書き換えます
// @namespace      http://efcl.info/
// @include        http://*?*
// @include        http://*#*
// @include        https://*?*
// @include        https://*#*
// @require        https://raw.github.com/gist/434406/wedata.js
// @author         azu
// @contributor    Ussy <http://userscripts.org/scripts/show/70851>
// @homepage       http://efcl.info/
// @run-at document-end
// @noframes
// ==/UserScript==
(function(win) {
    const DATABASE_URL = "http://wedata.net/databases/UrlCleaner/items.json";
    var database = new Wedata.Database(DATABASE_URL);
    GM_registerMenuCommand("UrlCleaner - clear cache", function() {
        database.clearCache();
    });
    var link = document.querySelector("link[rel=canonical]");
    if (link && link.href == location.href) {
        return;
    }
    const SITEINFO = [
        /*
         { // USt
         url: "^http://www\.ustream\.tv/(channel|recorded)/",
         kill: "utm_campaign utm_content utm_medium utm_source utm_term",
         exampleUrl : 'http://www.ustream.tv/channel/fukushima-power-plant-symposium#utm_campaign=unknown&utm_source=7836105&utm_medium=social'
         },
         { // YouTube
         url: "^http://www\.youtube\.com/watch\?",
         live: "v"
         }
         */

    ];

    function getParamsStr(url) {
        var re = /[?#]([^#]+)/
        var matched = url.match(re)
        return matched ? matched[1] : null
    }

    function getParamsReplaceStr(url, str) {
        var re = /[?#]([^#]+)/
        return url.replace(re, str)
    }

    function getParams(url) {
        var r = []
        var paramsStr = getParamsStr(url)
        if (paramsStr) {
            paramsStr.split('&').forEach(function(i) {
                r.push(i.split('='))
            });
        }
        return r
    }

    function paramsJoin(params) {
        return params.map(
                function(i) {
                    return i.join('=')
                }).join('&')
    }

    function removeUtmParams(url, data) {
        /*
         http://wedata.net/databases/UrlCleaner/items
         live
         URL に残しておきたいパラメーター名を指定します。マッチした場合は指定したパラメーター以外は削除します。
         kill
         URL から消し去りたいパラメーター名を指定します。マッチしなかったパラメーターは残ります。
         live と kill を指定していた場合 live のほうが優先されます。
         */
        var rescues = typeof data.live == "string" && data.live.split(" ");
        var killers = typeof data.kill == "string" && data.kill.split(" ");
        var params = getParams(url);
        if (params.length == 0) {
            return url
        } else {
            var filteredParams = [];
            // liveなパラメーターの検査
            if (rescues && rescues.length > 0 && rescues != "") {
                // console.log(rescues + "<< live");
                filteredParams = params.filter(function(val, index, array) {
                    var paramName = val[0];
                    // console.log(paramName + " << Name -live");
                    for (var i = 0, len = rescues.length; i < len; i++) {
                        // パラーメータ名とliveにするものが一致 -falseは省略
                        if (paramName === rescues[i]) {
                            return true;
                        }
                    }
                });
            }
            // live合った場合はkillの処理はしない
            if (filteredParams.length === 0) {
                // killなパラメータの検査
                if (killers && killers.length > 0 && killers != "") {
                    // killなパラメータの検査
                    filteredParams = params.filter(function(val, index, array) {
                        var paramName = val[0];
                        for (var i = 0, len = killers.length; i < len; i++) {
                            // console.log(paramName + " << Name -kill " + killers[i] + " - " + killers.length);
                            // パラーメータ名とkillが違うものは残る
                            if (paramName === killers[i]) {
                                return false;
                            }
                        }
                        return true; // 一個もマッチしなかったら残すパラメーター
                    });
                }
            }
            // console.log(filteredParams + "<< filteredParams");
            if (filteredParams.length == 0) {
                return getParamsReplaceStr(url, '')
            } else {
                return getParamsReplaceStr(url, '?' + paramsJoin(filteredParams))
            }
        }
    }

    function tryReplaceState(data) {
        var nURL = location.href;
        if (!(new RegExp(data.url).test(nURL))) {
            return;
        }
        var cleanURL = removeUtmParams(nURL, data);// paramを取り除く

        if (nURL !== cleanURL) {
            if (win.history) {
                history && history.replaceState(null, document.title, cleanURL);
            } else {
                location.href = cleanURL;
            }
        }
    }

    // Main処理
    SITEINFO && SITEINFO.length > 0 && SITEINFO.forEach(tryReplaceState);
    database.get(function(items) {
        items.forEach(function(item) {
            tryReplaceState(item.data);
        });
    });
})(window || this);