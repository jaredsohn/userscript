// ==UserScript==
// @name            YahooTransitSaveSearchCondition
// @namespace       http://henohenomoheji-official.blogspot.com/
// @description     Yahoo路線検索の出発地、経由、目的地を保存します。Suggest機能搭載 (デフォルト6駅まで保存)
// @require         http://code.jquery.com/jquery-latest.min.js
// @include         http://transit.loco.yahoo.co.jp/*
// @downloadURL     https://userscripts.org/scripts/source/82429.user.js
// @updateURL       https://userscripts.org/scripts/source/82429.meta.js
// @grant           GM_getValue
// @grant           GM_setValue
// @version         2.3
// @author          Kocari
// ==/UserScript==

(function() {

    // Patch: Greasemonkey 1.0 + jQuery: Broken, with Workaround
    this.$ = this.jQuery = jQuery.noConflict(true);

    $(function() {

        // ご用達駅保持数
        var suggestStationSum = 6;

        // 出発地
        var sfrom = $("#sfrom");
        // 目的地
        var sto = $("#sto");
        // 経由
        var svia = $("#svia");

        // 保存データをロード
        sfrom.val(GM_getValue("sfrom"));
        sto.val(GM_getValue("sto"));
        svia.val(GM_getValue("svia"));

        // サジェストリスト追加
        sfrom.attr("list", "station");
        sto.attr("list", "station");
        svia.attr("list", "station");
        $("#set-box > div.box-l").append("<datalist id='station'>");
        var stationArray = [];
        if (GM_getValue("suggestStation")) {
            stationArray = GM_getValue("suggestStation").split(",");
        }
        $.each(stationArray, function() {
            $("#station").append("<option value='" + this + "'></option>");
        });

        // 探索にイベントを追加
        $("form[name='search']").submit(function() {
            // 検索条件を保存
            GM_setValue("sfrom", sfrom.val());
            GM_setValue("sto", sto.val());
            GM_setValue("svia", svia.val());
            // Suggest
            pushArray(svia.val(), stationArray);
            pushArray(sto.val(), stationArray);
            pushArray(sfrom.val(), stationArray);
            GM_setValue("suggestStation", stationArray.slice(0, suggestStationSum).toString());
        });

        /**
         * 配列に一意の値を追加します
         *
         * @param value
         *        array
         */
        function pushArray(value, array) {
            if (!array) {
                return [];
            }
            if (value != "") {
                var position = $.inArray(value, array);
                if (position >= 0) {
                    array.splice(position, 1);
                }
                array.unshift(value);
            }
        }
    });
})();
