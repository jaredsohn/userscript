// ==UserScript==
// @name            Speedy Smilies for Discuz!
// @namespace       http://i.pcbeta.com/space-uid-93460.html
// @description     为 Discuz! 编辑器添加显示常用表情功能
// @author          CONAN影
// @match           http://*/*
// @run-at          document-end
// @grant           none
// @version         0.8.1
// ==/UserScript==

(function (body, $) {

    var SpeedySmilies = (function () {

        var _ = {};

        _.data = localStorage.getItem("SpeedySmilies");
        _.data = _.data ? JSON.parse(_.data) : {};

        for (var src in _.data) {
            var data = _.data[src];
            if (!("firstTime" in data)) data.firstTime = 1388332800000;
            if (!("lastTime" in data)) data.lastTime = Date.now();
        };

        _.map = {
            "pmsml": function (id, code) {
                window.seditor_insertunit("pm", code);
            },
            "postsml": function (id, code) {
                window.seditor_insertunit("post", code);
            },
            "fastpostsml": function (id, code) {
                window.seditor_insertunit("fastpost", code);
            },
            "e_sml": function (id, code) {
                window.insertSmiley(id);
            }
        };

        _.getArrayData = function () {
            var array = [];
            for (var src in _.data) {
                var data = _.data[src];
                array.push({
                    "src": src,
                    "code": data.code,
					"frequency": data.times / Math.max(1, Math.floor((data.lastTime - data.firstTime) / (1000 * 60 * 60 * 24)))
                });
            };

            array.sort(function (a, b) {
                return b.frequency - a.frequency;
            });

            return array;
        };

        _.getMenuData = function () {
            var arrayData = _.getArrayData();

            if (arrayData.length == 0) return arrayData;

            if (arrayData.length < 16) {
                for (var i = arrayData.length; i < 16; i++) {
                    arrayData.push(null);
                };
            };

            return arrayData.slice(0, 16);
        };

        _.getMenuBody = function () {
            var data = _.getMenuData(),
                html = "";

            if (data.length == 0) return "<tr><td><p style='text-align:center;color:gray;cursor:auto'>快使用表情，哼哼哈兮！</p></td></tr>";

            data.forEach(function (smilie, index) {
                if (index % 4 == 0) html += "<tr>";
                html += smilie ? "<td onmouseover=\"smilies_preview('speedysmilies_', 'speedysmiliesdiv', this, 48)\" onclick=\"speedysmilies('ss_" + index + "', '" + smilie.code + "')\"><img id=\"smilie_ss_" + index + "\" width=\"20\" style=\"min-height:20px\" src=\"" + smilie.src + "\" alt=\"" + smilie.code + "\"></td>" : "<td style=\"cursor:auto\" width=\"25%\" style=\"min-height:20px;min-width:20px\"></td>";
                if (index % 4 == 3) html += "</tr>";
            });

            return html;
        };

        _.getMenu = function () {
            var menu = document.createElement("div");
            menu.id = "speedysmilies_menu";
            menu.className = "sllt";
            menu.style.display = "none";
            menu.innerHTML = "<div id='speedysmiliesdiv'><div id='speedysmiliesdiv_data'><table id='speedysmiliesdiv_table' cellpadding='0' cellspacing='0'><tbody>" + _.getMenuBody() + "</tbody></table></div></div>";

            return menu;
        };

        _.update = function (img) {
            var src = img.src,
                code = img.alt;

            if (src in _.data) {
                _.data[src].times++;
                _.data[src].lastTime = Date.now();
            } else {
                _.data[src] = {
                    code: code,
                    times: 1,
                    firstTime: Date.now()
                };
            };

            localStorage.setItem("SpeedySmilies", JSON.stringify(_.data));
        };

        _.show = function (ctrlid) {
            showMenu({
                "ctrlid": ctrlid,
                "menuid": "speedysmilies_menu",
                "pos": "23"
            });
        };

        _.init = function () {
            if (typeof window.smilies_preview == "function") {
                var _smilies_preview = window.smilies_preview;
                window.smilies_preview = function (seditorkey, id, obj, w) {
                    window.lastSS = obj.querySelector("img");
                    _smilies_preview(seditorkey, id, obj, w);
                    if (!obj.onmouseout) {
                        obj.onmouseout = function () {
                            window.lastSS = null;
                        };
                    };
                };
            };

            if (typeof window.seditor_insertunit == "function") {
                var _seditor_insertunit = window.seditor_insertunit;

                function seditor_insertunit_hook() {
                    window.seditor_insertunit = function (key, text, textend, moveend, selappend) {
                        if (window.lastSS) _.update(window.lastSS);
                        _seditor_insertunit(key, text, textend, moveend, selappend);
                    };
                };

                var _showWindow = window.showWindow;
                window.showWindow = function (k, url, mode, cache, menuv) {
                    _showWindow(k, url, mode, cache, menuv);
                    setTimeout(seditor_insertunit_hook, 1e3);
                };

                seditor_insertunit_hook();
            };

            if (typeof window.insertSmiley == "function") {
                var _insertSmiley = window.insertSmiley;
                window.insertSmiley = function (smilieid) {
                    _.update($("smilie_" + smilieid));
                    _insertSmiley(smilieid);
                };
            };

            body.appendChild(_.getMenu());

            body.addEventListener("mouseover", function (e) {
                var target = e.target;
                if (target.id in _.map) {
                    window.speedysmilies = _.map[target.id];
                    if (!target.onmouseover) {
                        target.onmouseover = function () {
                            _.show(target.id);
                        };
                        _.show(target.id);
                    };
                };
            }, false);
        };

        return _;
    })();

    (window.top == window.self && typeof discuz_uid == "string") && setTimeout(SpeedySmilies.init, 500);

})(document.body, function (id) {
    return document.getElementById(id)
});