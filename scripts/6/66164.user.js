// ==UserScript==
// @name           Highlight QuoteTweets
// @descrption     make a distinction between quote and non-quote in tweets
// @namespace      http://exoego.net/
// @include        http://twitter.com/*
// @version        0.2
// ==/UserScript==

(function($){
    if ($("#timeline").length === 0) return;

    var HighlightQT = {
         name: "GM_highlightQT"
        ,mode: 0 // 0: gray quoted part
                 // 1: make dixit bold
        ,useWithAutoPagerize: true

        ,init: function(){
            var style = "";
            switch(HighlightQT.mode){
                case 0:
                    style = "." + HighlightQT.name + " .quote {color:#999;}";
                    break;
                case 1:
                    style = "." + HighlightQT.name + " .dixit {font-weight:bold;}";
                    break;
            }
            GM_addStyle( style );
        }
    };

    HighlightQT.init();
    $("#more").livequery(function(){ filterTimeline(); });

    if (HighlightQT.useWithAutoPagerize && window.AutoPagerize.addFilter) {
        window.AutoPagerize.addFilter(function(page) { filterTimeline(page); });
    }

    function filterTimeline(context){
        $("#timeline span.entry-content", context).each(function(i,e){
            if (!$(e).hasClass(HighlightQT.name)) {
                var html = e.innerHTML;
                var match = html.match(/(.+?)([QR]T:? @)(.+)/);

                if (match && match[1].search(/^[RQ]T @/) !== 0) {
                    var dixit = '<span class="dixit">' + match[1] + '</span>';
                    var quote = '<span class="quote">' + match[2] + match[3] + '</span>';
                    $(e).html(dixit + quote)
                }
                $(e).addClass(HighlightQT.name);
            }
        })
    }

})(this.unsafeWindow.jQuery)