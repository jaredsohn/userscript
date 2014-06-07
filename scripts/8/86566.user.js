// ==UserScript==
// @name           CIS folding
// @namespace      inda
// @description    Content folding for the CIS teaching material page
// @include        http://local.cis.strath.ac.uk/teaching/ug/classes/index.html
// ==/UserScript==

GM_xmlhttpRequest({
   method: "GET",
   url: "http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js",
   onload: run
});

function run(code) {
    eval(code.responseText);
    $ = jQuery;

    var t_elems = [[],[]];
    var t_first = true;
    var content = document.getElementsByName("U1")[0].parentNode;
    var number_of_years = 5;
    var slide_delay_ms = 150;
    
    for (var i = 0; i < content.children.length; ++i) {
        if (content.children[i].tagName.toUpperCase() == "TABLE"){
            if (t_first) {
                t_elems[0].push(content.children[i]);
            } else {
                /*
                  jQuery doesn't support effects on tables, or any element which requires
                  its CSS "display" property set to something other than "block".
                */
                var table_wrapper = document.createElement("div");
                var insert_before = content.children[i].nextSibling;
                table_wrapper.appendChild(content.children[i].parentNode.removeChild(content.children[i]));
                t_elems[0][0].parentNode.insertBefore(table_wrapper, insert_before);
                t_elems[1].push(table_wrapper);
            }
            t_first = !t_first;
        } else if (content.children[i].tagName.toUpperCase() == "A") {
            content.children[i].style.display = "none";
        }
    }
    if (t_elems[0].length != t_elems[1].length || t_elems[1].length != number_of_years)
        return;
    for (var i = 0; i < t_elems[0].length; ++i) {
        if (GM_getValue("hidden" + i, true))
            t_elems[1][i].style.display = "none";
        t_elems[0][i].name = i;
        $(t_elems[0][i]).click(function(event){
                var idx = parseInt(this.name, 10);
                if ($(t_elems[1][idx]).is(":hidden")){
                    $(t_elems[1][idx]).slideDown(slide_delay_ms);
                    window.setTimeout(GM_setValue, 0, "hidden" + idx, false);
                } else {
                    $(t_elems[1][idx]).slideUp(slide_delay_ms);
                    window.setTimeout(GM_setValue, 0, "hidden" + idx, true);
                }
            });
    }
}

