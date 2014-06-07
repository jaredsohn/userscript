// ==UserScript==
// @name       TamperScript
// @namespace  http://tampermonkey.biniok.net/
// @version    1.2
// @description  make UserScripts links one-click installable (links to *.user.js are caught by chrome)
// @include    http://*/*
// @copyright  2010+, Jan Biniok
// @license    GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// ==/UserScript==

(function () {
        var userscript = ".user.js";

        var tamperScriptClickHandler = function(url) {
            var cb = function (req) {
                if (req.readyState == 4 && req.status == 200) {
                    TM_installScript(req.responseText, url);
                }
            };

            var details = {
                method: 'GET',
                url: url,
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                },
                onload: cb,
                onerror: cb
            };

            TM_xmlhttpRequest(details);
        };

        var modifyUserScriptLinks = function() {
            var aarr = document.getElementsByTagName('a');
            for (var k in aarr) {
                var a = aarr[k];
                if (a.href && a.href.search(userscript) != -1) {
                    a.addEventListener('click', function () { tamperScriptClickHandler(this.tamper)});
                    a.tamper = a.href;
                    a.href = 'javascript://nop/';
                }
            }
        }

        modifyUserScriptLinks();
    })();