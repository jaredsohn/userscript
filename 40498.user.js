// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui [cuimingda(at)gmail(dot)com || http://cuimingda.com]
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            Douban Ctrl Enter
// @namespace       http://cuimingda.com
// @description     [douban.com] Press ctrl+tab to post something directly
// @include         http://*.douban.com/*
// @require         http://jqueryjs.googlecode.com/files/jquery-1.3.min.js
// ==/UserScript==
//
// 0.1 @ 2009/01/13 # Initial Release
// 0.2 @ 2009/01/15 # Change method of submit and support most pages on douban.
// --------------------------------------------------------------------------------

;(function() {
    $("textarea").keydown(function(event) {
        if(event.ctrlKey === true && event.keyCode === 13) {
            var submitButton = $(this).parents("form").find(":submit:visible").get(0);
            
            if(submitButton !== undefined) {
                var mouseEvent = document.createEvent('MouseEvents');        
                mouseEvent.initEvent('click', true, true);        
                submitButton.dispatchEvent(mouseEvent);   
            }
            
            return false;
        }
    });
})();