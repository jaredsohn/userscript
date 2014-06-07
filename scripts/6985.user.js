// ==UserScript==
// @name           Google Auto Pager
// @namespace      http://ma.la/
// @author         ma.la <timpo@ma.la>
// @include        http://www.google.*/search*
// @description    Autoloads for next page of Google search results.
// ==/UserScript==

// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html

// ver 0.1 @ 2005-06-23
//  experimental release
// ver 0.2 @ 2005-06-23
//  double click to start.
// ver 0.3 @ 2005-12-02 - modified by beerboy <http://beerboy.org/>
//  convert XMLHttpRequest to GM_xmlhttpRequest.
// ver 0.4 @ 2006-01-17 - modified by Takayama Fumihiko <tekezo@tkym.org>
//  - Disable "Double Click enable/disable function".
//  - Change all-links-target to _blank.
//  - Add "New Loading" effect.
// ver 0.5 @ 2006-09-02 - modified by Takayama Fumihiko <tekezo@tkym.org>
//  - fixed unloading-bug when the google-result contains sponsor.
// ver 0.6 @ 2006-10-15 - modified by Takayama Fumihiko <tekezo@tkym.org>
//  - fixed method of search 'Next href'.
//  - add 'End' text when search result was terminated.
// ver 0.7 @ 2006-11-15 - modified by Takayama Fumihiko <tekezo@tkym.org>
//  - Apply new Google HTML Result.
// ver 0.8 @ 2006-12-05 - modified by Takayama Fumihiko <tekezo@tkym.org>
//  - Add Hatena Bookmark Count function by following script.
//       http://d.hatena.ne.jp/kusigahama/20051207#p1
//       http://ukgk.g.hatena.ne.jp/faerie/
// ver 0.9 @ 2007.01.03 - modified by Paul Irish <http://userscripts.org/people/47>
//  - Removed Hatena bookmark count and target="_blank" functionality
// ver 1.0 @ 2007.01.04 - modified by fazibear <http://fazibear.prv.pl#javascript_en>
//  - Wait message changed.
//  - New content appear before footer, and wait message.
//  - Fixed bug with google maps box (for now it's don't display)

(function(){
    var base = "http://"+location.host+"/search";
    var offset;
    var num;
    var query;
    var loadingElemID = 'navbar';

    var Remain = {
        valueOf : function() {
            var sc = document.body.scrollTop;
            var total = (document.body.scrollHeight - document.body.clientHeight);
            var remain = total - sc;
            return total - sc;
        }
    };

    var watch_scroll = function() {
        var self = arguments.callee;
        if (Remain < 500) {
            do_request();
        }
        setTimeout(self,100);
    };

    var appendSearchResult = function(googleResult) {
        var html = '';

        var list = googleResult.getElementsByTagName('div');
        var isNextExist = false;
        var results = Array();
        for (var i = 0; i < list.length; i++) {
            if (list[i].className == 'g') {
              results.push(list[i]);
            }
            if (list[i].id == 'nn') {
                isNextExist = true;
            }
        }
        var elem = document.createElement('div');
        for (var i = 0; i < results.length; i++) {
          scripts = results[i].getElementsByTagName('script');
          if(scripts.length > 0){
            for(var i=0; i<scripts.length; i++){
              scripts[i].parentNode.removeChild(scripts[i]); 
            }
          }
          elem.appendChild(results[i]);
        }

        var wait = document.getElementById(loadingElemID);
        if(wait){
            wait.parentNode.insertBefore(elem, wait);
        }


        if (isNextExist) {
            offset += num;
        } else {
            insertEndText();
        }
    };

    var insertEndText = function() {
        var elem = document.createElement("div");
        elem.innerHTML = "End";
        with (elem.style) {
            padding = "0.3em";
            marginBottom = "5em";
            background = "#00E";
            color = "#FFF";
        };
        document.body.appendChild(elem);
    };

    var insertLoadingText = function() {
        var wait = document.getElementById(loadingElemID)
        if(wait){
          wait.innerHTML = '<div style="margin: 0 auto; width: 176px; height: 63px; background-image: url(http://www.google.com/reader/ui/1368647008-loading.gif)"><p style="margin: 0; padding: 20px 0 0 15px; font-weight: bold; font-size: 130%; color: rgb(34, 34, 34);">Loading</p></div>';
        }
    }

    var do_request = function(){
        if (this.requested == offset) {
            return;
        }

        this.requested = offset;

        document.getElementById(loadingElemID).style.display = 'block';
        GM_xmlhttpRequest({
                method:"GET",
                    url:base + query.replace(/start=\d*/,"start=" + offset),
                    onload:function(details)
                    {
                        var googleResult = document.createElement('div');
                        googleResult.innerHTML += details.responseText;

                        appendSearchResult(googleResult);
                        document.getElementById(loadingElemID).style.display = 'none';
                    }
            });
    };

    var init_autopager = function(){
        var next = document.getElementById('nn').parentNode;
        var href = next.href;
        query = href.substr(href.indexOf("?"));
        offset = (query.match(/start=(\d*)/))[1] - 0;
        var tmp = query.match(/num=(\d*)/);
        num = tmp ? (tmp[1] - 0) : 10;
    };

    if (window.location.href.indexOf(base) != -1) {
        init_autopager();
        insertLoadingText();
        watch_scroll();
    }
})();

