// ==UserScript==
// @name            wykopDeSpoilerator
// @description     Odkrywa spoilery na wykopie
// @version         20130324192831
// @author          opsomh
// @namespace       http://userscripts.org/users/465520/scripts
// @downloadURL     http://userscripts.org/scripts/source/151912.user.js
// @updateURL       http://userscripts.org/scripts/source/151912.meta.js
// @grant           none
// @include         http://www.wykop.pl/link/*
// ==/UserScript==

var main = function (){
    jQuery(function($){
        $('a.showSpoiler', '#comments-list-entry').remove();//do it once
        $('code.dnone', '#comments-list-entry').each(function(){
            $(this).replaceWith(this.childNodes);
        });
    });
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);
