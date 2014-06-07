// ==UserScript==
// @name        Drowned In Sound front page ratings
// @namespace   userscript.org
// @description Shows the ratings of recently reviewed albums in a small color coded block of text in the top left corner
// @include     http://drownedinsound.com/records
// @include     http://drownedinsound.com/releases/reviewed
// @version     1
// ==/UserScript==

(function() {
    $ = unsafeWindow['window'].$;
    $$ = unsafeWindow['window'].$$;
    Ajax = unsafeWindow['window'].Ajax;

    $$("div.release_teasers div.release_teaser a").each(function(e) {
        var extraStyles = 'top:4px; left:4px;';
        makeRequest(e, extraStyles);
    });

    $$(".post.review > a").each(function(e) {
        var extraStyles = 'top:17px; left:15px;';
        makeRequest(e, extraStyles);
    });

    function makeRequest(e, extraStyles) {
        var thisElem = $(e);

        new Ajax.Request(e.href, {
          method:'get',
          onSuccess: function(transport) {
            var response = transport.responseText || "no response text";
            var rating = response.match(/\<strong class="value"\>(\d+)/)[1];
            if (rating > 4.0 && rating < 7.9) {
                color = "orange";
            } 
            else if (rating  >= 8 ) {
                color = "green";
            } 
            else {
                color = "red";
            }
            thisElem.insert({before:"<span style='background:#fff; display:block; width:15px; height:18px; color:" +
                                    color +"; font-size:12px; line-height:15px; " + extraStyles +
                                    " text-align:center; display:block; z-index:10; position:absolute;'>" + 
                                    rating + "</span>"});
          },
          onFailure: function() { console.log('Something went wrong...'); }
        });
    }
})();