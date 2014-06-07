// ==UserScript==
    // @name           only for me:D
    // @namespace      eRRFF
    // @author         ._.
    // @description    hi
    // @version        1.0
    // @match          http://www.erepublik.com/*
    // @include        http://www.erepublik.com/*
    // ==/UserScript==
    var ResistanceForceInsert = function($, window, undefined) {
            function autoRefresh(interval) {setTimeout('location.reload(true);',interval);};
            $(document).ready(function () {
                    if (parent.document.location.toString()==='http://www.erepublik.com/en') {
                            if ($('#battle_listing > ul.resistance_war > li > a#fundRW_btn').length==1) {
                                    $('#battle_listing > ul.resistance_war > li > a#fundRW_btn').trigger('click');
                            } else {
                    // ------------------------------------------------------------------
                    // 說明 / README:
                    //
                    //   你可以設定以下二個值: vNmax, vNmin
                    //   來設定關於首頁的自動更新時間及頻率, 這些由你決定.
                    //
                    //   you can set the value: vNmax, vNmin
                    //   to configure your homepage refresh timer, it's up to you.
                    // ------------------------------------------------------------------
                                    var vNmax = 6; var vNmin = 2;
                                    var vNum = Math.round(Math.random() * (vNmax - vNmin) + vNmin);
                                    autoRefresh(vNum*1000);
                            };
                    };
            });
    };
    // Script Insert
    var script = document.createElement('script');
    script.textContent = '(' + ResistanceForceInsert + ')(jQuery, window);';
    document.body.appendChild(script);