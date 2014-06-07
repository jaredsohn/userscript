// --------------------------------------------------------------------------------
// Copyright (C) 2008  Mingda Cui (cuimingda(at)126(dot)com || http://cuimingda.com)
// Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
// and GPL (http://www.gnu.org/licenses/) licenses.
//
// ==UserScript==
// @name            CCTV TV Space Pager
// @namespace       http://cuimingda.com
// @description     boost up paging function for space.tv.cctv.com
// @include         http://space.tv.cctv.com/act/platform/view/page/composePage.jsp?pageId=PAGE*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==
//
// 0.1 @ 2009/01/01 # Initial Release
// --------------------------------------------------------------------------------

;(function() {
    var settings = {
        offset : 10,     // 向前或者向后大范围翻页，每次的页数
        previousText : "<<",
        nextText : ">>",
        moniterTimeout : 1000
    };

    $(document).ready(function() {
        monitor();
    });
    
    var monitor = function() {
        insertPager();
        setTimeout(function() { monitor(); }, settings.moniterTimeout);
    };
    
    var insertPager = function() {
        $(".turn_page_box").each(function() {
            if($(this).attr("edit") === "true") return;
            
            var total = parseInt($(".total_page", this).text());
            var current = parseInt($(".current_page", this).text());
            
            var pagerId = $(".tpb_right:last", this).html().match(/toPage_(ELEM\d+)/)[1];
            var toPage = new Function("page", "unsafeWindow.toPage_" + pagerId + "(page);");
            
            $(document.createElement("a"))
                .text(settings.previousText)
                .addClass("tpb_btn_previous")
                .css("cursor", "pointer")
                .insertBefore($("span a:first", this))
                .click(function(event) {
                    event.preventDefault();
                    var p = current-settings.offset<1?1:current-settings.offset;
                    toPage(p);
                });
            
            $(document.createElement("a"))
                .text(settings.nextText)
                .addClass("tpb_btn_previous")
                .css("cursor", "pointer")
                .insertAfter($("span a:last", this))
                .click(function(event) {
                    event.preventDefault();
                    var p = current+settings.offset>total?total:current+settings.offset;
                    toPage(p);
                });
            
            $(this).attr("edit", "true");
        });
    };

})();