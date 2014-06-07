// ==UserScript==
    // @name           lalala
    // @namespace      lalala
    // @author         stolen_code
    // @description    fcuk you :P
    // @version        0.1
    // @match          http://www.erepublik.com/*
    // @include        http://www.erepublik.com/*
    // ==/UserScript==
    var ResistanceForceInsert = function($, window, undefined) {
            function autoRefresh(interval) {setTimeout('location.reload(true);',interval);};
            $(document).ready(function () {
                    if (parent.document.location.toString()==='http://www.erepublik.com/en') {
                            if ($('#battle_listing > ul.resistance_war > li > a#fundRW_btn').length==1) {
                                   				 var a = document.getElementById("fundRW_btn2");
												a.dispatchEvent(clickEvent);
												return false;
												break;
                            } else {
                                    var vNmax = 6; var vNmin = 2;
                                    var vNum = Math.round(Math.random() * (vNmax - vNmin) + vNmin);
                                    autoRefresh(vNum*1000);
                            };
                    };
            });
    };
    var script = document.createElement('script');
    script.textContent = '(' + ResistanceForceInsert + ')(jQuery, window);';
    document.body.appendChild(script);