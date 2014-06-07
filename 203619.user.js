// ==UserScript==
// @name            DakarCZ
// @namespace       tt
// 
// @version         1.1
// @date            2014-01-05
// 
// @description     Select CZE riders
// 
// @include         http://gaps.dakar.com/*
// @include         https://gaps.dakar.com/*
// 
// @creator         TheTomCZ <weby@tomashejl.cz>
// @homepage        https://userscripts.org/users/417245
// 
// @require http://codeorigin.jquery.com/jquery-1.10.2.min.js
// ==/UserScript==

var DakarCZE = {
    run: function(){
        jQuery("th:contains('CZE')").parent().find("td.p").each(function(){
            if( !$(this).parent().is(".s") ){
            	$(this).click();
            }
        });
    }
};

$(document).ready(function(){
	DakarCZE.run();
});


