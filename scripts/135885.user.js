// ==UserScript==
// @name           eRepublik rw...
// @namespace      Erepublik resistance wars
// @author         I dont know :)
// @description    eRepublik online game script for RW
// @version        1
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
                        // README:
                        //
                        //   you can set the value: vNmax, vNmin
                        //   to configure your homepage refresh timer, it's up to you.
                        // ------------------------------------------------------------------
                                        var vNmax = 1; var vNmin = 1;
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