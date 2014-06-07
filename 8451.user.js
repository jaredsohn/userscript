// ==UserScript==
// @name           googleImagesAutoPager
// @namespace      googleImagesAutoPager
// @description    googleImagesAutoPager
// @include        http://images.google.*/images*
// @include        http://www.google.*/images*
// ==/UserScript==

// Released under the GPL license
//  http://www.gnu.org/copyleft/gpl.html

// ver 0.1 @ 2007-04-10
//  experimental release


(function(){
    var base = "http://"+location.host+"/images";
    var offset;
    var num;
    var query;
    var loadingElemID = 'ggap_loadingElem';

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
        var disp = offset + 1;
//      var html = "<hr /><a href="#" onclick="document.body.scrollTop=0">" + disp + " to " + (offset + num) + '</a><br /><br />';
        var html = "<hr /><a href=#>TOP</a><br />" + disp + " to " + (offset + num) + "<br /><br />";
        var list = googleResult.getElementsByTagName('*');
        var isNextExist = false;
        for (var i = 0; i < list.length; ++i) {
            if (list[i].id == 'ImgContent') {
                setLinkTarget(list[i]);
            }
            if (list[i].id == 'navbar' || list[i].id == 'guser' || list[i].nodeName == 'CENTER') {
                list[i].style.display = 'none';
            }
            if (list[i].id == 'nn') {
                isNextExist = true;
            }
        }
        
        html += googleResult.innerHTML;

        var elem = document.createElement('div');
        elem.innerHTML = html;
        document.body.appendChild(elem);

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
        var elem = document.createElement("div");
        elem.id = loadingElemID;
        elem.innerHTML = "Now Loading";
        with(elem.style){
            position = "fixed";
            top = "4px";
            right = "4px";
            padding = "0.3em";
            background = "#E00";
            color = "#FFF";
            display = "none";
        };
        document.body.appendChild(elem);
    }

    var do_request = function(){
        if (this.requested == offset) {
            return;
        }

        this.requested = offset;

        document.getElementById(loadingElemID).style.display = 'inline';
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

    var setLinkTarget = function(elem) {
        // all-link-target set _blank
        var listLink = elem.getElementsByTagName('a');
        for (var i = 0; i < listLink.length; ++i) {
            listLink[i].setAttribute('target', '_blank');
        }
    };

    var init_autopager = function(){
        var next = document.getElementById('nn').parentNode;
        var href = next.href;
        query = href.substr(href.indexOf("?"));
        offset = (query.match(/start=(\d*)/))[1] - 0;
        var tmp = query.match(/ndsp=(\d*)/);
        num = tmp ? (tmp[1] - 0) : 18;

        setLinkTarget(document);
    };


    // init
    if (window.location.href.indexOf(base) != -1) {
        init_autopager();
        insertLoadingText();
        watch_scroll();
    }
})();
