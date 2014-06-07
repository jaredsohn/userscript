// ==UserScript==
// @name        TapScroll
// @namespace   http://chum54.blog103.fc2.com/
// @include     *
// @exclude     http://mail.google.com/*
// @version     0.0.2
// ==/UserScript==

(function () {
    var scroll = {
        'h'   : function() { scrollBy(-50, 0) }, // scroll left
        'l'   : function() { scrollBy( 50, 0) }, // scroll right
        'j'   : function() { scrollBy(0,  40) }, // scroll down
        'k'   : function() { scrollBy(0, -40) }, // scroll up
        'n'   : function() { scrollBy(0,  150) }, // scroll down more
        'p'   : function() { scrollBy(0, -150) }, // scroll up more

        'g'   : function() { scrollTo(0, 0) }, // move to page top
        'f'   : function() { history.forward() }, // move to page top
        'b'   : function() { history.back() }, // move to page top
        't'   : function() { toggle_bar() }, // toggle bar

        'd'   : function() { scrollBy(0,  window.innerHeight / 2) },  // scroll half down
        'u'   : function() { scrollBy(0, -window.innerHeight / 2) },  // scroll half up
    };

    var formElement = { 'input':true, 'button':true, 'select':true, 'textarea':true };

    window.addEventListener('keypress',
        function(e) {
            if (e.metaKey || e.ctrlKey || e.altKey ||
                formElement[e.target.tagName.toLowerCase()]) {
                return;
            }
            var key = (e.shiftKey? 'S-' : '') + String.fromCharCode(e.charCode);
            if (scroll[key]) {
                scroll[key]();
                e.preventDefault();
                e.stopPropagation();
            }
        }, false);

    function toggle_bar() {
        if(document.getElementById("tapscroll_bar_down").style.display == "table"){
            //hide("tapscroll_bar_up");
            hide("tapscroll_bar_down");
        }else {
            //show("tapscroll_bar_up");
            show("tapscroll_bar_down");
        }
    }

    function hide(id){
        document.getElementById(id).style.display = "none";
    }
    function show(id){
        document.getElementById(id).style.display = "table";
    }

    // ignore inner frame
    if (String(window.frameElement).indexOf('HTMLIFrameElement') < 0){
        focus();

        // Page up
        //pageup=document.createElement("div");
        //pageup.innerHTML="<table id=\"tapscroll_bar_up\" style=\"display:table;width:120%;position:fixed;top:0px;left:-8%;background-color:#e0e0e0;opacity:0.3;text-align:center;border-collapse:collapse;z-index:100;\"><tr><td style=\"text-align:center;padding:1.5em 0em;width:40%;\" onMouseDown=\"scrollBy(0,-150);\">UP</td></tr></table>";
        //document.body.appendChild(pageup);

        // Page down and top
        pagedown=document.createElement("div");
        pagedown.innerHTML="<table id=\"tapscroll_bar_down\" style=\"display:table;width:120%;position:fixed;bottom:0px;left:-8%;background-color:#e0e0e0;opacity:0.3;text-align:center;border-collapse:collapse;z-index:100;\"><tr><td style=\"text-align:center;padding:1.5em 0em;width:40%;\" onMouseDown=\"scrollBy(0,150);\">DOWN</td><td style=\"width:10%; background-color:#5d8eff;\" onMouseDown=\"scrollTo(0,0);\">TOP</td><td style=\"text-align:center;width:40%;\" onMouseDown=\"scrollBy(0,150);\">DOWN</td></tr></table>";
        document.body.appendChild(pagedown);
    }

})();
