// ==UserScript==
// @name       Remove price info on Amazon packing slip
// @namespace  com.sweetkiddy.userscript
// @version    1.0
// @description  移除亚马逊默认的发货单(Packing slip)上有价格信息.
// @match      https://sellercentral.amazon.co.uk/*/*/packing-slip/*
// @match      https://sellercentral.amazon.com/*/*/packing-slip/*
// @match      https://mai.amazon.cn/*/*/packing-slip/*
// @grant unsafeWindow
// @copyright  2013, Rex
// ==/UserScript==

(function(document) {
    var $;
    function log(){
      unsafeWindow.console.debug.apply(unsafeWindow.console,arguments);   
    }
    function main(){
        log("RPIAPS");
        //$=unsafeWindow.jQuery;
        
        var totalRow=document.getElementsByClassName("shippeditem")[1];
        totalRow.remove();
        var t = document.getElementsByClassName("printedtable")[0];
        for(var b=0;b<t.tBodies.length;b++){
            var tbody=t.tBodies[b];
            for(var r=0;r<tbody.rows.length;r++){
                var row=tbody.rows[r];
                for(var c=row.cells.length-1;c>=2;c--){
                    row.cells[c].remove();
                }
            }
        }
    }
    function addjQuery() {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = main;
        script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);
    }
    //addjQuery();
    main();

})(window.document);