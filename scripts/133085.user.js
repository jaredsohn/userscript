// ==UserScript==
    // @name           eRepublik Resistance Force Founder
    // @namespace      eRRFF
    // @author         blackca
    // @description    if you get RH Achievements, please donate some gold to me :P
    // @version        0.1
    // @match          http://www.erepublik.com/en/main/region/*
    // @include        http://www.erepublik.com/en/main/region/*
    // ==/UserScript==
    var ResistanceForceInsert = function($, window, undefined) {
            function autoRefresh(interval) {setTimeout('location.reload(true);',interval);};
            $(document).ready(function () {
                    if (parent.document.location.toString()==='http://www.erepublik.com/en/main/region/*') {
                            if ($('#battle_listing > ul.resistance_war > li > a#fundRW_btn').length==1) {
                                    $('#battle_listing > ul.resistance_war > li > a#fundRW_btn').trigger('click');
                            } else {
                    // ------------------------------------------------------------------
                    // ?? / README:
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