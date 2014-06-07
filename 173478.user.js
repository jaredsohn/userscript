// ==UserScript==
// @name           Auto-show full size
// @author         PYZ
// @include        http://*.ptclassic.*
// @include        http://ptclassic.*
// @version        1.0
// @description    Auto shows full size galleries
// ==/UserScript==

(function (){
    function log(t){
        console.log("AutoExpX: " + t);
    }

    function reschedule(f){
        log("Not loaded enough, re-scheduling");
        window.setTimeout(f, 200);
    }

    function auto_expand(){
        log("Started");

        var fim_con = document.getElementById('full_size_images');
        if (fim_con != null && fim_con.style.display == 'block') {
            log("Spurious run, de-scheduling");
            return;
        }

        var ctrl_div = document.getElementById('controls_section');
        if (ctrl_div == null) {
            reschedule(auto_expand);
            return;
        }

        var link_list = ctrl_div.getElementsByTagName('a');
        if (link_list.length < 1) {
            reschedule(auto_expand);
            return;
        }

        var link = link_list[0];
        link.click();

        log("Finished!");
    }

    log("Loaded.");
    window.setTimeout(auto_expand, 5);
})();
