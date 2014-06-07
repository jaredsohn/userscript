// ==UserScript==
// @name         epdAsueircRuEpdinfo
// @namespace    http://userscripts.org/scripts/show/292585
// @homepage     http://userscripts.org/scripts/show/292585
// @version      0.112
// @author       carwyn
// @description  Makes thinks faster for http://epd.asueirc.ru/epdinfo/
// @match        http://epd.asueirc.ru/epdinfo/*
// @copyright    2014+, carwyn
// @run-at       document-end
// @updateURL    https://userscripts.org/scripts/source/292585.meta.js
// @downloadURL  https://userscripts.org/scripts/source/292585.user.js
// ==/UserScript==

var jq = document.createElement('script');
jq.src = "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
setTimeout(function(){
    // ... give time for script to load, then type.
    jQuery.noConflict();
    jQuery('document').ready(function(){
        if(jQuery('#loginForm').length>0){
            jQuery('#district').val('svao');
            jQuery('input[type="submit"][name="submit"]').click();
        }else{
            if(window.location=='http://epd.asueirc.ru/epdinfo/j_security_check')
            setTimeout(function(){
                jQuery('img[title="Горячая вода"]').click();
            },500);
        }
    });
},500);
