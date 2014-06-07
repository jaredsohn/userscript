// ==UserScript==
// @name       Fanfou Add jumpbox
// @namespace  http://fanfou.com/
// @version    0.1
// @description  enter something useful
// @match      http://fanfou.com/*
// @copyright  2012+, http://fanfou.com/Singularity
// ==/UserScript==

(function(){
    var last = jQuery(".paginator li:last");
    var form = jQuery("<input type='text' />");
    form.css({
    	padding:"3px 6px 4px",
        width: "50px"
    });
    
    form.keypress(function(e){
        if (e.keyCode == 13){
            var v = form.val();
            if (parseInt(v,10) >= 1){
                if (location.href.split("/").length < 5){
                    location.href = location.href + "/p." + v;
                }else{
                    location.href = location.href.substring(0,location.href.lastIndexOf("/")) + "/p." + v;
                }
            }
        }
    });

    last.before(form);    

})();